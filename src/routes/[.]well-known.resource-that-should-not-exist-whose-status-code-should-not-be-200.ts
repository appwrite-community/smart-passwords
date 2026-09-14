import { createFileRoute } from '@tanstack/react-router'

// Clients request this path to confirm that unknown URLs on this origin do not
// return 200. If it did, they would ignore /.well-known/change-password.
export const Route = createFileRoute(
  '/.well-known/resource-that-should-not-exist-whose-status-code-should-not-be-200',
)({
  server: {
    handlers: {
      GET: () => new Response('Not Found', { status: 404 }),
    },
  },
})
