'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (data.user) {
        toast.success('Welcome back!')
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login')
      toast.error(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⛽</span>
            </div>
            <h1 className="text-2xl font-bold text-white">National Fuel Pass</h1>
            <p className="text-sm text-slate-400">Ceylon Petroleum Corporation</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
            <Shield size={14} className="text-green-400" />
            <span>🔒 Secure Connection</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>https://fuelpass.gov.lk</span>
          </div>

          <form id="loginForm" onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-slate-900 text-white p-4 rounded-lg border ${error ? 'border-red-500' : 'border-slate-600'} focus:border-yellow-500 outline-none`}
                required
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-900 text-white p-4 rounded-lg border ${error ? 'border-red-500' : 'border-slate-600'} focus:border-yellow-500 outline-none`}
                required
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-lg transition-all disabled:opacity-50 mt-4"
            >
              {loading ? 'Verifying...' : 'Login →'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account? <a href="/register" className="text-yellow-400 hover:underline">Register here</a>
          </div>
        </div>
      </div>
    </main>
  )
}
