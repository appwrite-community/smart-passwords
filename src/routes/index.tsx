import { useEffect, useState } from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Models } from 'appwrite'
import { account } from '@/lib/appwrite'
import { Card, Shell, buttonClass } from '@/components/shell'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    account.get().then(setUser, () => setUser(null))
  }, [])

  async function logout() {
    await account.deleteSession({ sessionId: 'current' })
    setUser(null)
  }

  if (user === undefined) return <Shell>{null}</Shell>

  return (
    <Shell>
      <Card title={user ? `Signed in as ${user.email}` : 'Welcome'}>
        {user ? (
          <div className="space-y-3">
            <Link to="/settings/password" className={`${buttonClass} block text-center`}>
              Change password
            </Link>
            <button onClick={logout} className="w-full text-sm text-zinc-400 hover:text-zinc-100">
              Sign out
            </button>
          </div>
        ) : (
          <button onClick={() => navigate({ to: '/login' })} className={buttonClass}>
            Sign in
          </button>
        )}
      </Card>
    </Shell>
  )
}
