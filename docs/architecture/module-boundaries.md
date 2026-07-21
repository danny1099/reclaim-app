# Module Boundaries

## Each module owns:

- components
- hooks
- schemas
- services
- types
- helpers
- router

## Rules

- Modules cannot directly manipulate another module internals
- Shared abstractions live in shared/
- Cross-module communication should happen through contracts or services
- Keep entities isolated and scalable
