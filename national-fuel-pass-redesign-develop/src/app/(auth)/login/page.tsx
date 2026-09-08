'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, ArrowRight, Car, Bike, Truck, UserCog } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (identifier.trim().length > 0) {
        localStorage.setItem('fuelPassUser', JSON.stringify({ 
          name: 'Kasun Perera', 
          vehicle: identifier,
          vehicleType: 'Car',
          quota: 25,
          used: 7,
          remaining: 18,
        }))
        toast.success('Welcome back!')
        router.push('/dashboard')
      } else {
        throw new Error('Please enter your NIC or Vehicle Number')
      }
    } catch (err: any) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const quickLogin = (vehicle: string) => {
    setIdentifier(vehicle)
    setTimeout(() => {
      const form = document.getElementById('loginForm') as HTMLFormElement
      if (form) form.requestSubmit()
    }, 100)
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
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">NIC or Vehicle Number</label>
              <input
                type="text"
                placeholder="e.g. 198765432V or ABC-1234"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                className={`w-full bg-slate-900 text-white p-4 rounded-lg border ${error ? 'border-red-500' : 'border-slate-600'} focus:border-yellow-500 outline-none`}
                required
                autoFocus
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Continue →'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-xs text-slate-500 mb-3">🚀 Quick Demo — Board Presentation</p>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => quickLogin('ABC-1234')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 text-center">
                <Car size={20} className="mx-auto text-slate-400" />
                <span className="text-[10px] text-slate-500 block mt-1">Car</span>
              </button>
              <button onClick={() => quickLogin('BIKE-001')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 text-center">
                <Bike size={20} className="mx-auto text-slate-400" />
                <span className="text-[10px] text-slate-500 block mt-1">Bike</span>
              </button>
              <button onClick={() => quickLogin('VAN-999')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 text-center">
                <Truck size={20} className="mx-auto text-slate-400" />
                <span className="text-[10px] text-slate-500 block mt-1">Van</span>
              </button>
              <button onClick={() => quickLogin('ADMIN-001')} className="bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-500/20">
                <UserCog size={20} className="mx-auto text-yellow-400" />
                <span className="text-[10px] text-yellow-400 block mt-1">Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account? <a href="/register" className="text-yellow-400 hover:underline">Register here</a>
          </div>
        </div>
      </div>
    </main>
  )
}
