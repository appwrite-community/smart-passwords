import { createFileRoute } from '@tanstack/react-router'

// https://www.w3.org/TR/change-password-url/
// Password managers open this URL. It must only redirect to the real form.
export const Route = createFileRoute('/.well-known/change-password')({
  server: {
    handlers: {
      GET: () =>
        new Response(null, {
          status: 302,
          headers: { Location: '/settings/password' },
        }),
    },
  },
})
