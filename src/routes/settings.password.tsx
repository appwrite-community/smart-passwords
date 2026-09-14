import { useEffect, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { account } from '@/lib/appwrite'
import { Card, Shell, buttonClass, inputClass } from '@/components/shell'

export const Route = createFileRoute('/settings/password')({ component: ChangePassword })

function ChangePassword() {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState<{ ok?: string; error?: string }>({})
  const [busy, setBusy] = useState(false)

  // Password managers open this page cold, so send visitors without a
  // session to sign in and bring them straight back here afterwards.
  useEffect(() => {
    account.get().then(
      () => setReady(true),
      () => navigate({ to: '/login', search: { redirect: '/settings/password' } }),
    )
  }, [navigate])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setBusy(true)
    setStatus({})
    try {
      await account.updatePassword({
        password: String(data.get('new-password')),
        oldPassword: String(data.get('current-password')),
      })
      form.reset()
      setStatus({ ok: 'Your password has been updated.' })
    } catch (err) {
      setStatus({ error: err instanceof Error ? err.message : 'Update failed' })
    } finally {
      setBusy(false)
    }
  }

  if (!ready) return <Shell>{null}</Shell>

  return (
    <Shell>
      <Card title="Change password">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-1 text-sm">
            <span className="text-zinc-400">Current password</span>
            <input
              name="current-password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="text-zinc-400">New password</span>
            <input
              name="new-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className={inputClass}
            />
          </label>
          {status.error && <p className="text-sm text-red-400">{status.error}</p>}
          {status.ok && <p className="text-sm text-emerald-400">{status.ok}</p>}
          <button type="submit" disabled={busy} className={buttonClass}>
            Update password
          </button>
        </form>
      </Card>
    </Shell>
  )
}
