## 9. Prompt de Claude (contexto para IA)

Al generar el copy de emails, el prompt debe incluir:

```typescript
const prompt = `
Eres un asistente que escribe emails en nombre de creadores de contenido.

CONTEXTO DEL CREADOR:
- Nombre del negocio/comunidad: ${workspace.Name}
- Tono de marca: ${workspace.voice ?? "profesional pero cercano"}
- Nombre del suscriptor: ${subscriber.name ?? "el suscriptor"}

TAREA:
Escribe 3 versiones de email para recuperar un pago fallido de una suscripción.
- Email día 1: tono informativo, no alarmante. El problema puede ser un error bancario.
- Email día 3: tono más directo, incluye link para actualizar tarjeta. Expresa que valoras su membresía.
- Email día 7: último aviso, tono urgente pero respetuoso. Si no se resuelve, perderá el acceso.

REGLAS:
- Escribe en español
- Máximo 150 palabras por email
- Incluir siempre {{UPDATE_CARD_LINK}} como placeholder del link de actualización
- No mencionar montos específicos
- Sonar como si lo escribiera el propio creador, no un sistema automatizado

Responde SOLO en JSON con esta estructura exacta:
{
  "day1": { "subject": "...", "body": "..." },
  "day3": { "subject": "...", "body": "..." },
  "day7": { "subject": "...", "body": "..." }
}
`;
```
