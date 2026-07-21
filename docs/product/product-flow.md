### Flujo de recuperación (el flujo más importante de toda la app)

```
Stripe/MP emite evento payment_failed
        │
        ▼
POST /api/webhooks/stripe  (Edge Function, Next.js)
  1. Verifica firma del webhook (stripe.webhooks.constructEvent)
  2. Extrae idempotency_key = event.id
  3. Comprueba en Upstash Redis: ¿ya procesamos este evento?
     └─ Sí → responde 200 y retorna (deduplicación)
     └─ No → guarda key con TTL 7 días, continúa
  4. Busca el User (dueño de la cuenta Stripe conectada)
  5. Busca o crea el Subscriber en DB
  6. Verifica que NO haya ya una RecoverySequence activa para este invoice
     └─ Si hay una activa → responde 200 y retorna (evita duplicados)
  7. Crea registro PaymentFailedEvent en DB
  8. Crea registro RecoverySequence con status = "active"
  9. Dispara Trigger.dev job: startRecoverySequence({ sequenceId })
 10. Responde 200 a Stripe
        │
        ▼
Trigger.dev: startRecoverySequence (durable workflow)
  step 1: generateEmailCopy(sequenceId)
    └─ Llama IA API con contexto del creador → genera 3 versiones de email
    └─ Guarda copies en DB (RecoveryEmailCopy)
  step 2: sendEmail(sequenceId, day: 1)
    └─ Renderiza React Email template con copy generado
    └─ Envía vía Resend
    └─ Registra RecoveryEmail enviado en DB
    └─ Actualiza RecoverySequence.lastEmailSentAt
  step 3: wait 2 días (trigger.dev nativo: await wait("2d"))
  step 4: ¿payment recuperado? checkPaymentStatus(sequenceId)
    └─ Sí → cancela secuencia, status = "recovered", fin
    └─ No → continúa
  step 5: sendEmail(sequenceId, day: 3)
  step 6: wait 4 días
  step 7: checkPaymentStatus(sequenceId)
    └─ Sí → cancela secuencia, status = "recovered", fin
    └─ No → continúa
  step 8: sendEmail(sequenceId, day: 7)  ← último aviso
  step 9: wait 3 días
  step 10: checkPaymentStatus(sequenceId)
    └─ Sí → status = "recovered"
    └─ No → status = "failed", cancela suscripción en Stripe si configurado
```

### Flujo de onboarding del cliente

```
Registro (Auth)
  └─ Crea User en DB (webhook → POST /api/auth/stripe/webhook)
        │
        ▼
Dashboard → "Conectar Stripe"
  └─ Redirige a Stripe OAuth (stripe.com/oauth/authorize)
  └─ Stripe redirige a GET /api/stripe/callback?code=...
  └─ Intercambia code por access_token + stripe_user_id
  └─ Crea StripeConnection en DB
  └─ Registra webhook endpoint en la cuenta Stripe del cliente
        │
        ▼
App operativa — empieza a recibir eventos en tiempo real
```
