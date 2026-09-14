import { Link } from '@tanstack/react-router'

export const inputClass =
  'w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-400 focus:outline-none'
export const buttonClass =
  'w-full rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50'

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-semibold tracking-tight">
            Smart Passwords
          </Link>
          <nav className="flex gap-4 text-sm text-zinc-400">
            <Link to="/settings/password" className="hover:text-zinc-100">
              Change password
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">{children}</main>
    </div>
  )
}

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h1 className="mb-6 text-xl font-semibold">{title}</h1>
      {children}
    </section>
  )
}
