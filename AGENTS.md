<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — RECLAIM APP

## Core Philosophy

- Respect existing architecture
- Follow screaming architecture
- Prefer Server Components
- Use centralized typed routes
- Strong typing everywhere
- Reuse shared abstractions
- Avoid unnecessary client-side logic
- Never bypass multi-tenant isolation

---

## Architecture

Read:

- /docs/architecture/folder-structure.md
- /docs/architecture/module-boundaries.md
- /docs/architecture/enviroments-keys.md

---

## Patterns

Read:

- /docs/patterns/forms.md
- /docs/patterns/imports-and-naming.md
- /docs/patterns/server-components.md
- /docs/patterns/trpc.md

---

## UI

Read:

- /docs/ui/entity-grouping.md
- /docs/ui/forms-and-modals.md
- /docs/ui/states-and-responsiveness.md

---

## Product Context

Read:

- /docs/product/ai-capabilities.md
- /docs/product/product-flow.md
- /docs/product/rules.md
- /docs/product/structure.md
- /docs/product/vision.md

---

## Examples

Use:

- /docs/examples/module-example.md
- /docs/examples/trpc-router-example.md
- /docs/examples/trpc-router-global.md
- /docs/examples/server-component-example.md

---

## Critical Rules

- Never use relative imports
- Never hardcode routes
- Always use i18n keys
- Always validate with Zod
- Never expose raw backend errors
- Prefer Server Components first
- Never mix entity responsibilities
- Never create duplicate abstractions

---

## Anti Patterns

❌ Business logic inside components
❌ Fetching unnecessarily in Client Components
❌ Forms larger than 3 fields inside modals
❌ Inline translations
❌ Duplicate schemas
❌ Using any in TypeScript

---

## Workflow

1. Read existing implementation
2. Analyze architecture impact
3. Reuse existing patterns
4. Implement with strong typing
5. Validate consistency with the project
