import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { account } from '@/lib/appwrite'
import { Card, Shell, buttonClass, inputClass } from '@/components/shell'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : '/',
  }),
  component: Login,
})

function Login() {
  const { redirect } = Route.useSearch()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setBusy(true)
    setError(null)
    try {
      await account.createEmailPasswordSession({
        email: String(form.get('email')),
        password: String(form.get('password')),
      })
      navigate({ href: redirect })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Shell>
      <Card title="Sign in">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-1 text-sm">
            <span className="text-zinc-400">Email</span>
            <input name="email" type="email" autoComplete="username" required className={inputClass} />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="text-zinc-400">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={busy} className={buttonClass}>
            Sign in
          </button>
        </form>
      </Card>
    </Shell>
  )
}
