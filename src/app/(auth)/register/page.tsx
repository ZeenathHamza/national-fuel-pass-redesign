'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nic, setNic] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [vehicleNo, setVehicleNo] = useState('')
  const [vehicleType, setVehicleType] = useState('CAR')
  const [chassis, setChassis] = useState('')
  const [fuelType, setFuelType] = useState('Petrol')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // 1. Sign up the user in Supabase Auth and pass ALL data in metadata
      // This allows our secure Postgres database trigger to handle the inserts
      // bypassing the RLS error when the user doesn't have an active session yet!
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            nic_number: nic,
            phone_number: mobile,
            vehicle_no: vehicleNo,
            vehicle_type: vehicleType,
            fuel_type: fuelType,
            qr_hash: btoa(`${vehicleNo}-${Date.now()}`)
          },
          // URL to redirect to after clicking the email confirmation link
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (authError) throw authError
      
      // If email confirmation is required, Supabase will not log them in immediately
      if (authData.user?.identities?.length === 0 || !authData.session) {
         toast.success('Registered successfully! Please check your email.')
         router.push('/login')
      } else {
         toast.success('Registered successfully!')
         router.push('/dashboard')
      }
      
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push('/login')}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Register</h1>
              <p className="text-sm text-slate-400">Create your Fuel Pass account</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
            <Shield size={14} className="text-green-400" />
            <span>🔒 Secure Connection</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>https://fuelpass.gov.lk</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="border-b border-slate-700 pb-4 mb-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">🔐 Account Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none" required />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none" required minLength={6} />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-slate-300 mb-4 mt-2">👤 Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">NIC Number</label>
                <input value={nic} onChange={e => setNic(e.target.value)} placeholder="e.g. 198765432V" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none" required />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Full Name</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. Kasun Perera" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none" required />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Address</label>
              <input value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. 123 Main Street, Colombo 01" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none" required />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Mobile Number</label>
              <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="e.g. 0771234567" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none" required />
            </div>

            <div className="border-t border-slate-700 pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">🚗 Vehicle Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Vehicle Number</label>
                  <input value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} placeholder="e.g. ABC-1234" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none" required />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Vehicle Type</label>
                  <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none appearance-none" required>
                    <option value="CAR">Motor Car (25L)</option>
                    <option value="MOTORCYCLE">Motorcycle (8L)</option>
                    <option value="THREE_WHEELER">Three-Wheeler (20L)</option>
                    <option value="VAN">Van (50L)</option>
                    <option value="BUS">Bus (100L)</option>
                    <option value="LORRY">Motor Lorry (200L)</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Chassis Number</label>
                  <input value={chassis} onChange={e => setChassis(e.target.value)} placeholder="e.g. JF1GJ8A" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none uppercase" required />
                  <p className="text-[10px] text-slate-500 mt-1">⚠️ Case sensitive</p>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Fuel Type</label>
                  <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none appearance-none" required>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-yellow-500" required />
                <div>
                  <p className="text-sm text-slate-300">I am the legal owner of this vehicle</p>
                  <p className="text-xs text-slate-500">If you purchased this vehicle second-hand, you may need to transfer ownership</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            Already have an account? <a href="/login" className="text-yellow-400 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </main>
  )
}
