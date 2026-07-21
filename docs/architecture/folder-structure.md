# Screaming Architecture

## Structure

```
src/
  modules/
  shared/
  lib/
  routes/
  trpc/
```

## Rules

- Every business entity belongs to modules
- Shared code must never depend on modules
- Modules can depend on shared
- Routes are centralized and typed
- Shared components must be reusable and generic
- Business logic must stay inside the module
