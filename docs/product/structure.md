## Modelos de dominio (Prisma)

Schema completo en `prisma/schema.prisma`. Esta sección explica las decisiones de diseño y las relaciones entre modelos.

### Mapa de relaciones

```
User ──────────────── StripeConnection      (1:1 — un creador, una cuenta Stripe)
     └─────────────── MercadoPagoConnection (1:1 — un creador, una cuenta MP)
     └─────────────── Subscriber[]          (1:N — los suscriptores del creador)
     └─────────────── RecoverySequence[]    (1:N — todas las secuencias del creador)
     └─────────────── PaymentFailedEvent[]  (1:N — log de eventos recibidos)

Subscriber ──────────── RecoverySequence[] (1:N — un suscriptor puede tener varias secuencias históricas)

PaymentFailedEvent ──── RecoverySequence   (1:1 — cada evento puede originar una secuencia)

RecoverySequence ─────── RecoveryEmailCopy[] (1:3 — copies D+1, D+3, D+7 generados por IA)
                 └─────── RecoveryEmail[]     (1:3 — registro de envíos efectivos con tracking)
```

### Notas de diseño importantes

- **`PaymentFailedEvent`** es inmutable. Registra el evento raw del gateway con su `rawPayload`. Se usa para auditoría y debugging. Nunca actualizar.

- **`RecoverySequence.gatewayInvoiceId`** es la clave de negocio. El `@@unique([userId, gatewayInvoiceId])` garantiza que no existan dos secuencias para el mismo invoice. Verificar también en código antes de crear.

- **`RecoveryEmailCopy`** se genera al inicio de la secuencia (paso 1 del workflow). Los 3 emails se crean de una vez llamando Claude API una sola vez, antes de que se envíe el primero.

- **`RecoverySequence.cardUpdateToken`** es el identificador de la URL pública del portal (`/portal/[token]`). Es inmutable, nunca regenerar. La `cardUpdateUrl` (Stripe Billing Portal URL) sí expira y se regenera cada vez que alguien accede al portal.

- **`accessToken` y `webhookSecret`** en las conexiones van encriptados.

### Schema completo

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Status {
  ACTIVE
  INACTIVE
  PENDING
  REJECTED
  COMPLETED
}

enum Plan {
  FREE
  STARTER  // $29/mes — hasta 500 suscriptores activos
  GROWTH   // $79/mes — hasta 2,000 suscriptores
  SCALE    // $199/mes — ilimitado + A/B testing
}

model User {
  id               String    @id @default(cuid())
  name             String?
  image            String?
  email            String
  emailVerified    Boolean   @default(false)
  withOnboarding   Boolean   @default(false)
  status           Status    @default(ACTIVE)
  role             String?
  plan             Plan      @default(FREE)
  stripeCustomerId String?   @unique // Billing de la propia plataforma (nosotros le cobramos al creador), stripeCustomerId es el ID del creador en NUESTRA cuenta de Stripe, no en la suya
  currentPeriodEnd DateTime?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  sessions              Session[]
  accounts              Account[]
  brand                 Brand[]
  stripeConnections     StripeConnection[]
  mercadoPagoConnection MercadoPagoConnection?
  subscribers           Subscriber[]
  paymentFailedEvents   PaymentFailedEvent[]
  recoverySequences     RecoverySequence[]

  @@unique([email])
  @@map("user")
}

model Session {
  id        String   @id @default(cuid())
  expiresAt DateTime
  token     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@index([userId])
  @@map("session")
}

model Account {
  id                    String    @id @default(cuid())
  accountId             String
  providerId            String
  userId                String
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("account")
}

model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier])
  @@map("verification")
}

// MARCAS: Un usuario que se registra en nuestra plataforma
// puede crear diferentes marcas asociadas con su respectivo voice para la generacion de los ia emails
// cada marca tiene su StripeConnection o MercadoPagoConnection unico

model Brand {
  id                 String   @id @default(cuid())
  // nombre de su comunidad o producto (ej: "Tribu Fitness Pro")
  name               String
  slug               String   @unique
  email              String   @unique
  logo               String?
  // subdomain utilizado para rescribir la ruta de la plataforma
  subdomain          String?
  // Contexto para generación de emails con IA, descripción del tono/estilo del creador, máx ~500 chars
  voice              String?
  userId             String
  paymentConnectionId String // account para relacionar los pagos por gateway (stripe, mp, etc.)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  user        User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  paymentConn GatewayConnection? @relation(fields: [paymentConnectionId], references: [id])

  @@index([userId])
  @@map("brand")
}

// Conexiones OAuth con gateways de pago
// IMPORTANTE: accessToken, refreshToken y webhookSecret se guardan ENCRIPTADOS. para leer y escribir. Nunca exponer estos campos en tRPC routes del dashboard.

model GatewayConnection {
  id                String    @id @default(cuid())
  userId            String
  paymentAccountId  String    @unique // stripe_user_id or mpAccountId retornado por OAuth (acct_...)
  gateway           Gateway
  accessToken       String // Encriptado
  refreshToken      String? // Encriptado
  webhookEndpointId String? // Webhook registrado en la cuenta del cliente para recibir sus eventos. Guardar el ID permite eliminarlo al desconectar (stripe.webhookEndpoints.del).
  webhookSecret     String? // Encriptado — whsec_... único por cuenta conectada
  isActive          Boolean   @default(true)
  connectedAt       DateTime  @default(now())
  disconnectedAt    DateTime?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  brands Brand[]

  @@index([paymentAccountId, gateway])
}

// Suscriptores (clientes finales del creador)
// Un Subscriber representa al usuario final que tiene la suscripción activa. Se crea automáticamente al procesar el primer pago fallido del suscriptor. Puede tener ID de Stripe, de MercadoPago, o ambos.

model Subscriber {
  id               String   @id @default(cuid())
  userId           String
  stripeCustomerId String? // Al menos uno de los dos IDs de gateway es requerido.
  mpPayerId        String?
  email            String
  name             String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  sequences RecoverySequence[]

  @@unique([userId, stripeCustomerId])
  @@unique([userId, mpPayerId])
  @@index([userId])
}

enum Gateway {
  STRIPE
  MERCADOPAGO
}

enum SequenceStatus {
  ACTIVE      // Secuencia en curso
  RECOVERED   // Pago recuperado exitosamente
  FAILED      // Agotó los 3 emails sin recuperar
  CANCELLED   // Cancelada manualmente por el creador o la plataforma
}

enum FailureReason {
  CARD_DECLINED
  INSUFFICIENT_FUNDS
  EXPIRED_CARD
  INCORRECT_CVC
  PROCESSING_ERROR
  DO_NOT_HONOR
  UNKNOWN
}

// Eventos de pago fallido (log inmutable)
// Registro crudo de cada evento recibido del gateway.
// Inmutable: nunca actualizar, solo insertar.
// gatewayEventId se usa como idempotency key en Redis (TTL 7 días) Y en DB.

model PaymentFailedEvent {
  id             String        @id @default(cuid())
  userId         String
  subscriberId   String?
  gateway        Gateway
  gatewayEventId String        @unique // event.id de Stripe — clave de deduplicación
  invoiceId      String // stripe invoice_id o mp payment_id
  amount         Int // En centavos / unidad mínima de la moneda
  currency       String // "usd", "ars", "mxn", "cop", "clp", etc.
  failureReason  FailureReason @default(UNKNOWN)
  failureMessage String? // Mensaje raw del gateway para debugging
  rawPayload     Json // Payload completo del evento — para auditoría y debugging
  processedAt    DateTime      @default(now())

  user     User              @relation(fields: [userId], references: [id])
  sequence RecoverySequence?

  @@index([userId])
  @@index([invoiceId])
}

// Secuencias de recuperación
// Cada RecoverySequence es el workflow completo para un pago fallido específico.
// INVARIANTE CRÍTICA: solo puede existir una secuencia por (userId, gatewayInvoiceId).
// Esto se garantiza con @@unique y se verifica en el webhook handler antes de crear.

model RecoverySequence {
  id                   String         @id @default(cuid())
  userId               String
  subscriberId         String
  paymentFailedEventId String?        @unique // Evento que originó esta secuencia.
  gateway              Gateway // Identificación del pago.
  gatewayInvoiceId     String // Clave de unicidad — nunca dos secuencias para el mismo invoice
  amountFailed         Int
  currency             String
  status               SequenceStatus @default(ACTIVE) // Estado de la secuencia.
  emailsSent           Int            @default(0) // 0 a 3 — incrementar al enviar cada email
  lastEmailSentAt      DateTime?
  recoveredAt          DateTime? // Se rellena cuando llega invoice.paid
  failedAt             DateTime? // Se rellena al agotar los 3 emails sin recuperar
  cancelledAt          DateTime? // Cancelación manual
  // Trigger.dev — ID del run para poder cancelarlo si el pago entra antes del siguiente step. Usar: client.runs.cancel(triggerRunId)
  triggerRunId         String?

  // Portal de actualización de tarjeta.
  // cardUpdateToken: token único en la URL pública /portal/[cardUpdateToken] — INMUTABLE.
  // cardUpdateUrl: URL de Stripe Billing Portal (expira en 24h, regenerar en cada acceso).
  cardUpdateToken      String         @unique @default(cuid())
  cardUpdateUrl        String?
  cardUpdateClickedAt  DateTime?
  createdAt            DateTime       @default(now())
  updatedAt            DateTime       @updatedAt

  user               User                @relation(fields: [userId], references: [id])
  subscriber         Subscriber          @relation(fields: [subscriberId], references: [id])
  paymentFailedEvent PaymentFailedEvent? @relation(fields: [paymentFailedEventId], references: [id])

  emails      RecoveryEmail[]
  emailCopies RecoveryEmailCopy[]

  @@unique([userId, gatewayInvoiceId])
  @@index([userId, status])
  @@index([subscriberId])
  @@index([cardUpdateToken])
}

// Copias de emails generadas por IA
// ia genera los 3 emails (D+1, D+3, D+7) de una vez al inicio de la secuencia. Se guardan antes de enviar para poder previsualizarlos en el dashboard.
model RecoveryEmailCopy {
  id            String           @id @default(cuid())
  sequenceId    String
  dayVariant    Int // 1, 3, o 7 — debe coincidir exactamente con los días de la secuencia
  subject       String
  bodyHtml      String           @db.Text // HTML renderizado por React Email con el copy de Claude
  bodyText      String           @db.Text // Versión plain text para clientes sin soporte HTML
  generatedByAI Boolean          @default(true)
  promptTokens  Int? // Input tokens de ia — para tracking de costos
  outputTokens  Int? // Output tokens de ia
  createdAt     DateTime         @default(now())
  sequence      RecoverySequence @relation(fields: [sequenceId], references: [id], onDelete: Cascade)

  @@unique([sequenceId, dayVariant])
}

// Emails enviados (tracking de envíos)
// Registro de cada email efectivamente enviado vía Resend.
// Los eventos de apertura y click llegan por webhook de Resend a /api/webhooks/resend.
model RecoveryEmail {
  id            String    @id @default(cuid())
  sequenceId    String
  dayVariant    Int
  resendId      String?   @unique // ID de mensaje de Resend para correlacionar sus webhooks
  sentAt        DateTime  @default(now())
  openedAt      DateTime? // Primer open registrado
  clickedAt     DateTime? // Click en el link de actualización de tarjeta
  bounced       Boolean   @default(false)
  bouncedAt     DateTime?
  bouncedReason String? // "hard_bounce" | "soft_bounce" | "complaint"

  sequence RecoverySequence @relation(fields: [sequenceId], references: [id], onDelete: Cascade)

  @@unique([sequenceId, dayVariant])
  @@index([resendId])
}
```

---
