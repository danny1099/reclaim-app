# tRPC Patterns

## Rules

- Validate every input with Zod
- Use APIResult<T>
- Wrap risky operations with tryCatch
- Never expose raw errors
- Use i18n keys for messages

## Example Flow

Input → Validation → Business Logic → Safe Response