# Plan de Desarrollo — RECLAIM

## Roadmap resumido

```
Fase 0 ──► Fase 1 ──► Fase 2 ──► Fase 3 ──► Fase 4 ──► Fase 5 ──► Fase 6
Setup      Stripe    Recovery   Portal +   Dashboard   Billing     Deploy
           OAuth     Engine     Tracking
           + Brand
```

---

## Fase 1: Módulo Workspace + Conexión Stripe OAuth + Webhooks base

**Objetivo:** El creador puede registrarse, crear una marca, conectar su Stripe via OAuth y la app comienza a recibir eventos.

### 1.2 — Conexión Stripe OAuth

Status: Pendiente

| Tarea                                          | Detalle                                                                                             |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Crear `src/modules/stripe/services/connect.ts` | Intercambio `code` → `access_token` + `stripe_user_id`                                              |
| Crear `src/modules/stripe/services/webhook.ts` | Registro automático de webhook endpoint en cuenta del cliente                                       |
| Crear `src/modules/stripe/helpers/crypto.ts`   | Encriptar/desencriptar `accessToken`, `refreshToken`, `webhookSecret`                               |
| Crear `src/modules/stripe/router.ts`           | `connectStripe` mutation, `disconnectStripe` mutation, `getConnectionStatus` query                  |
| Crear página "Conectar Stripe"                 | `src/app/[lang]/tenant/[tenant]/m/settings/stripe/page.tsx`                                         |
| Implementar flujo OAuth                        | Botón → `stripe.com/oauth/authorize` → callback `/api/stripe/callback` → guarda `GatewayConnection` |

### 1.3 — Webhook handler base de Stripe

Status: Pendiente

| Tarea                                                              | Detalle                                                                |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Crear `src/app/api/webhooks/stripe/route.ts`                       | Edge-compatible, raw body, firma con `stripe.webhooks.constructEvent`  |
| Implementar deduplicación con Redis                                | `event.id` como idempotency key, TTL 7 días                            |
| Manejar `payment_intent.payment_failed` / `invoice.payment_failed` | Extraer `userId`, `subscriberId`, crear `PaymentFailedEvent` inmutable |
| Verificar unicidad de secuencia                                    | `@@unique([userId, gatewayInvoiceId])` — no crear duplicados           |
| Crear `Subscriber` si no existe                                    | Por `stripeCustomerId`                                                 |
| Crear `RecoverySequence` con `status = ACTIVE`                     | Incluye `cardUpdateToken` único                                        |
| Disparar Trigger.dev job                                           | `task.run("startRecoverySequence", { sequenceId })`                    |

### Criterio de aceptación

- Un usuario puede crear una marca y conectar su cuenta Stripe.
- Al simular un `payment_failed` desde Stripe CLI, la app recibe el webhook, crea `PaymentFailedEvent` + `RecoverySequence` y dispara el job.
- No se crean duplicados si Stripe reenvía el mismo evento.
- Los tokens de Stripe van encriptados en DB. Nunca expuestos en tRPC.

---

## Fase 2: Motor de recuperación (Trigger.dev + IA + Email)

**Objetivo:** El workflow D+1 → D+3 → D+7 funciona end-to-end, genera emails con IA y los envía por Resend.

### 2.1 — Trigger.dev setup

Status: Pendiente

| Tarea                                        | Detalle                                                        |
| -------------------------------------------- | -------------------------------------------------------------- |
| Crear `trigger.config.ts`                    | Configurar proyecto, endpoint, secret key                      |
| Crear `src/jobs/recovery.ts`                 | Job `startRecoverySequence` con 10 steps (ver product-flow.md) |
| Integrar `wait` nativo de Trigger.dev        | `await wait("2d")`, `await wait("4d")`, etc.                   |
| Guardar `triggerRunId` en `RecoverySequence` | Para poder cancelar si llega `invoice.paid`                    |

### 2.2 — Generación de emails con IA

Status: Pendiente

| Tarea                           | Detalle                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------- |
| Crear `src/lib/ai/claude.ts`    | Cliente Anthropic SDK, función `generateRecoveryCopies()`                     |
| Implementar prompt del producto | Incluye `Brand.name`, `Brand.voice`, `subscriber.name`                        |
| Parsear JSON de respuesta       | Guardar 3 copias (day1, day3, day7) en `RecoveryEmailCopy`                    |
| Tracking de tokens              | `promptTokens`, `outputTokens` para costos                                    |
| Manejar fallos de IA            | Si Claude falla, usar copias de fallback (estáticas, generic pero en español) |

### 2.3 — Renderizado y envío de emails

Status: Pendiente

| Tarea                                                  | Detalle                                                               |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| Crear `src/modules/email/templates/recovery-day-1.tsx` | React Email template                                                  |
| Crear `src/modules/email/templates/recovery-day-3.tsx` | React Email template                                                  |
| Crear `src/modules/email/templates/recovery-day-7.tsx` | React Email template                                                  |
| Crear `src/modules/email/services/resend.ts`           | Envío vía Resend API, registro en `RecoveryEmail`                     |
| Incluir link de portal                                 | `{{UPDATE_CARD_LINK}}` → reemplazar por URL pública `/portal/[token]` |
| Manejar bounces                                        | Webhook de Resend (ver Fase 3)                                        |

### 2.4 — Webhook `invoice.paid` (cancelación temprana)

Status: Pendiente

| Tarea                                                   | Detalle                                                          |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| Extender webhook handler de Stripe                      | Manejar `invoice.paid` y `invoice.payment_succeeded`             |
| Buscar `RecoverySequence` activa por `gatewayInvoiceId` | Cancelar job en Trigger.dev (`client.runs.cancel(triggerRunId)`) |
| Actualizar estado                                       | `status = RECOVERED`, `recoveredAt = now()`                      |

### Criterio de aceptación

- Simulando un pago fallido, en menos de 1 minuto se generan los 3 emails con IA.
- El email D+1 se envía inmediatamente.
- Si se simula un `invoice.paid` antes del D+3, la secuencia se cancela y no se envían más emails.
- Todo trackeado en DB (`RecoveryEmail`, `RecoveryEmailCopy`).

---

## Fase 3: Portal público + Tracking de emails

**Objetivo:** El suscriptor puede actualizar su tarjeta sin login, y el creador ve métricas de apertura/click.

### 3.1 — Portal de actualización de tarjeta

Status: Pendiente

| Tarea                                            | Detalle                                                      |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Crear `src/app/portal/[token]/page.tsx`          | Ruta pública, no requiere auth                               |
| Validar `cardUpdateToken`                        | Buscar `RecoverySequence` por token                          |
| Generar `cardUpdateUrl` de Stripe Billing Portal | API `stripe.billingPortal.sessions.create()` (expira en 24h) |
| Redirigir al suscriptor                          | A la URL del Billing Portal de Stripe                        |
| Registrar `cardUpdateClickedAt`                  | En `RecoverySequence`                                        |
| Pantalla de "link expirado/inválido"             | Si el token no existe                                        |

### 3.2 — Webhook de Resend (tracking)

Status: Pendiente

| Tarea                                        | Detalle                                                          |
| -------------------------------------------- | ---------------------------------------------------------------- |
| Crear `src/app/api/webhooks/resend/route.ts` | Recibe eventos: `email.opened`, `email.clicked`, `email.bounced` |
| Actualizar `RecoveryEmail`                   | `openedAt`, `clickedAt`, `bounced`, `bouncedAt`, `bouncedReason` |
| Correlacionar por `resendId`                 | Que se guarda al enviar el email                                 |

### Criterio de aceptación

- Un suscriptor recibe el email, hace click en "Actualizar tarjeta", llega al portal de Stripe.
- El creador puede ver en el dashboard que el email fue abierto y que hicieron click.
- Los bounces se registran correctamente.

---

## Fase 4: Dashboard del creador (UI completa)

**Objetivo:** El creador tiene una interfaz para gestionar marcas, ver secuencias, métricas y configurar su voz de marca.

### 4.1 — Layout del dashboard

Status: Pendiente

| Tarea                                               | Detalle                                                     |
| --------------------------------------------------- | ----------------------------------------------------------- |
| Crear `src/app/[lang]/tenant/[tenant]/m/layout.tsx` | Sidebar, navbar, selector de marca                          |
| Middleware de tenant                                | Verificar que el usuario tiene acceso a la marca (`userId`) |
| Guardar marca activa en URL                         | `/tenant/[tenant]/m/...`                                    |

### 4.2 — Páginas del dashboard

Status: Pendiente

| Página               | Contenido                                                                         |
| -------------------- | --------------------------------------------------------------------------------- |
| `/m/overview`        | KPIs: $ recuperado, tasa de recuperación, secuencias activas, emails enviados hoy |
| `/m/sequences`       | Tabla de `RecoverySequence` con filtros (activas, recuperadas, fallidas)          |
| `/m/sequences/[id]`  | Detalle de una secuencia: timeline, copias de emails, estado de envíos            |
| `/m/subscribers`     | Tabla de `Subscriber` (buscable, paginable)                                       |
| `/m/settings/brand`  | Editar `Brand.name`, `Brand.voice`, `Brand.email`, `Brand.logo`                   |
| `/m/settings/stripe` | Conectar/desconectar Stripe, ver estado de conexión                               |

### 4.3 — Queries tRPC

Status: Pendiente

| Router                 | Endpoints                                        |
| ---------------------- | ------------------------------------------------ |
| `sequence.router.ts`   | `list`, `getById`, `cancel` (manual), `getStats` |
| `subscriber.router.ts` | `list`, `getById`, `search`                      |
| `dashboard.router.ts`  | `getOverviewStats`, `getRecoveryRate`            |

### Criterio de aceptación

- El dashboard carga datos reales de la base de datos.
- Las tablas son paginables y buscables.
- Las métricas de overview reflejan el estado real del creador.

---

## Fase 5: Billing de la plataforma (planes de suscripción)

**Objetivo:** RECLAIM cobra a los creadores por usar la plataforma (Starter $29, Growth $79, Scale $199).

### 5.1 — Checkout y suscripción

Status: Pendiente

| Tarea                                      | Detalle                                                           |
| ------------------------------------------ | ----------------------------------------------------------------- |
| Crear productos/planes en Stripe Dashboard | (manual, no por código)                                           |
| Crear `src/modules/billing/services.ts`    | Crear customer, crear subscription, manejar portal de facturación |
| Crear página de planes                     | `src/app/[lang]/tenant/[tenant]/m/settings/billing/page.tsx`      |
| Implementar Stripe Checkout                | `stripe.checkout.sessions.create()` para suscribirse a un plan    |
| Webhook `checkout.session.completed`       | Activar plan del usuario en DB                                    |

### 5.2 — Límites de plan

Status: Pendiente

| Plan    | Límite                     | Lógica                                              |
| ------- | -------------------------- | --------------------------------------------------- |
| FREE    | 0 suscriptores             | Solo onboarding, no recibe webhooks de pago fallido |
| STARTER | 500 suscriptores activos   | Verificar antes de crear nueva `RecoverySequence`   |
| GROWTH  | 2,000 suscriptores activos | Verificar antes de crear nueva `RecoverySequence`   |
| SCALE   | Ilimitado                  | Sin verificación                                    |

| Tarea                                         | Detalle                                                   |
| --------------------------------------------- | --------------------------------------------------------- |
| Crear `src/modules/billing/helpers/limits.ts` | Verificar si el usuario puede iniciar una nueva secuencia |
| Enforce en webhook handler                    | Si excede límite, loguear y retornar 200 (no procesar)    |

### 5.3 — Webhooks de billing

Status: Pendiente

| Tarea                                           | Detalle                                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Extender webhook handler                        | Manejar `customer.subscription.updated`, `.deleted`, `invoice.payment_failed` (de la plataforma) |
| Actualizar `User.plan`, `User.currentPeriodEnd` | En DB                                                                                            |

### Criterio de aceptación

- Un usuario FREE no puede tener secuencias de recuperación activas.
- Un usuario en STARTER con 500 suscriptores, la secuencia 501 no se crea.
- El billing usa la cuenta Stripe de la plataforma (no la del cliente).

---

## Fase 6: Infraestructura, testing y deployment

**Objetivo:** La app está en producción, monitoreada y documentada.

### 6.1 — Testing

Status: Pendiente

| Tarea                              | Detalle                                                           |
| ---------------------------------- | ----------------------------------------------------------------- |
| Tests unitarios de servicios       | Jest/Vitest para `crypto.ts`, `stripe/services/*`, `ai/claude.ts` |
| Tests de integración para webhooks | Simular payloads de Stripe, verificar DB state                    |
| Tests de flujo completo            | Stripe CLI + Trigger.dev local + Resend sandbox                   |

### 6.2 — Monitoreo y logging

Status: Pendiente

| Tarea                | Detalle                                               |
| -------------------- | ----------------------------------------------------- |
| Integrar log service | Vercel Logs o Logtail                                 |
| Alertas              | Trigger.dev fallos, webhooks 500, tasa de bounce alta |
| Health checks        | Endpoint `/api/health` ya existe (tRPC health)        |

### 6.3 — Deployment

Status: Pendiente

| Tarea                               | Detalle                               |
| ----------------------------------- | ------------------------------------- |
| Configurar Vercel                   | Proyecto, env vars, dominio           |
| Configurar base de datos PostgreSQL | Neon o Supabase                       |
| Migraciones Prisma en CI            | `prisma migrate deploy` en build step |
| Documentar proceso de deploy        | En `docs/ops/deployment.md`           |

### Criterio de aceptación

- `git push` → Vercel deploy automático.
- Migraciones aplicadas sin errores.
- Health check responde 200.

---

## Resumen de módulos a crear

```
src/modules/
  auth/              ✅ Ya existe
  brand/             ✅ Hecho
  stripe/            🆕 Fase 1
  email/             🆕 Fase 2
  recovery/          🆕 Fase 2 (tRPC router para secuencias)
  subscriber/        🆕 Fase 4
  billing/           🆕 Fase 5
  dashboard/         🆕 Fase 4 (stats, KPIs)

src/lib/
  ai/claude.ts       🆕 Fase 2
  crypto.ts          🆕 Fase 0
  email/resend.ts    🆕 Fase 2

src/jobs/
  recovery.ts        🆕 Fase 2

src/app/api/webhooks/
  stripe/route.ts    🆕 Fase 1
  resend/route.ts    🆕 Fase 3
```

---

## Dependencias entre fases

```
Fase 0 ───────────────────────────────►
   │                                    │
   ▼                                    ▼
Fase 1 (Brand + Stripe OAuth) ───────► Fase 2 (Recovery Engine)
   │                                    │
   ▼                                    ▼
Fase 3 (Portal + Tracking) ◄───────────┘
   │
   ▼
Fase 4 (Dashboard UI)
   │
   ▼
Fase 5 (Billing)
   │
   ▼
Fase 6 (Deploy)
```

> **Nota:** Las fases 1-3 son el core del producto y deben completarse en orden. La 4 puede empezar cuando la 2 tenga datos reales. La 5 es independiente del recovery pero bloquea el uso en producción.

---

## Convenciones durante el desarrollo

| Convención                    | Aplicación                                             |
| ----------------------------- | ------------------------------------------------------ |
| Server Components first       | Dashboard pages, tablas, detalles                      |
| Client Components solo cuando | Forms, interacción local, modales                      |
| No relative imports           | Siempre `@/modules/...`, `@/shared/...`                |
| Rutas centralizadas           | `src/routes/config/index.ts`                           |
| i18n keys obligatorios        | Todo texto en `messages/es.json`                       |
| Zod en todos los inputs       | tRPC + React Hook Form                                 |
| No `any`                      | Strict TypeScript                                      |
| Nunca exponer tokens          | `GatewayConnection.accessToken` nunca en tRPC response |
