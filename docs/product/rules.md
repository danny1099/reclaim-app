## Reglas de negocio — NO romper

Estas reglas son invariantes del negocio. Si algo las viola, hay un bug.

1. **Una sola secuencia activa por invoice.** Nunca crear dos `RecoverySequence` con el mismo `gatewayInvoiceId`. Check en `@@unique([userId, gatewayInvoiceId])` y en el webhook handler antes de crear.

2. **Deduplicar webhooks siempre.** Usar `event.id` de Stripe como idempotency key en Redis con TTL 7 días. Stripe puede reenviar el mismo evento múltiples veces.

3. **Cancelar secuencia si pago entra.** Si Stripe emite `invoice.paid` o `invoice.payment_succeeded`, buscar la secuencia activa del invoice y cancelarla inmediatamente (cancelar job en Trigger.dev + `status = CANCELLED`).

4. **Máximo 3 emails por secuencia.** Nunca enviar más de los emails D+1, D+3, D+7. Respetar el `emailsSent` counter.

5. **Los access tokens de clientes van encriptados en DB.** Nunca guardar `accessToken` o `refreshToken` en plain text. Usar un helper `src/lib/crypto.ts`.

6. **El webhook endpoint de Stripe es público, pero verificado.** El route `/api/webhooks/stripe` no requiere auth, pero DEBE verificar la firma con `stripe.webhooks.constructEvent(body, sig, secret)`. Si la firma falla → responder 400.

7. **Respetar el webhook secret por cuenta.** En Stripe Connect, cada cuenta conectada tiene su propio webhook secret (`webhookSecret`). No usar el webhook secret de la cuenta principal.

8. **No exponer access tokens del cliente en el frontend.** Los tRPC routes del dashboard nunca retornan `accessToken` ni `webhookSecret`.

## 10. Convenciones de código

### TypeScript

- Strict mode activado (`strict: true` en `tsconfig.json`)
- No usar `any` — usar `unknown` y narrowing si es necesario
- Los tipos de Stripe se importan de `stripe` (el SDK ya los provee)
- Los tipos del dominio se derivan de Prisma: `import type { RecoverySequence } from "@prisma/client"`

### Webhook handlers

- Siempre retornar `Response` (no `NextResponse`) para máxima compatibilidad con Edge
- El body del request debe leerse como raw text para verificar firma de Stripe: `await request.text()`
- Nunca usar `request.json()` en el webhook handler de Stripe (rompe la verificación de firma)

- Toda interacción con DB, Stripe, Claude, Redis → server-only sin `"use client"`

---

### Trigger.dev

- Los jobs van en `src/jobs/` y se registran en `trigger.config.ts`
- Guardar el `triggerJobId` en `RecoverySequence` para poder cancelarlo si el pago entra
- Usar `task.run()` para disparar desde el webhook handler (no importar jobs directamente)

---

### Errores

- Los errores de Stripe se loggean con contexto (`userId`, `eventId`) y se retorna 500 solo en errores inesperados
- Los webhooks SIEMPRE retornan 200 si el evento fue recibido (incluso si se decide ignorarlo) — Stripe reintenta en 400/500

---

## Qué NO hacer

- ❌ No usar `setTimeout` para programar emails — siempre Trigger.dev
- ❌ No guardar el Stripe `access_token` del cliente en plain text
- ❌ No leer el body del webhook con `.json()` — rompe la verificación de firma
- ❌ No iniciar dos secuencias para el mismo invoice
- ❌ No hardcodear idioma — todos los textos del sistema en español, los emails generados por IA también
- ❌ No exponer el `STRIPE_SECRET_KEY` principal (el de la plataforma) en webhooks de clientes conectados — usar el secret de la `StripeConnection` específica
- ❌ No usar cron jobs de Vercel para la lógica de secuencias — no son durables
