# Server Components First

## Priority

1. Server Components
2. Server Actions or trpc server call
3. Client Components only if necessary

## Use Client Components When

- Browser APIs are required
- Local interaction exists
- Realtime local state is needed
- Animations depend on client state

## Avoid

- Fetching data in client unnecessarily
- Passing huge props trees
