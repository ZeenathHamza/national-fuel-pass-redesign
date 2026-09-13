'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, ArrowLeft, Info, Check, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const { language } = useLanguage()
  const t = translations[language].homepage

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
  const [showNotes, setShowNotes] = useState(false)

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

          {/* Things to note prior to Registration */}
          <div className="mb-8 bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden">
            <button 
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Info size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Things to note prior to Registration</h3>
                  <p className="text-xs text-slate-400">Please read these important instructions carefully</p>
                </div>
              </div>
              {showNotes ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>

            {showNotes && (
              <div className="p-4 pt-0 border-t border-slate-700/50 text-sm text-slate-300 space-y-4 max-h-96 overflow-y-auto mt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{t.note1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{t.note2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{t.note3}</span>
                  </li>
                </ul>

                <div className="overflow-x-auto rounded-lg border border-slate-700">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-800 text-slate-300">
                      <tr>
                        <th className="px-3 py-2 font-semibold">{t.catHeader1 || 'Category'}</th>
                        <th className="px-3 py-2 font-semibold">{t.catHeader2 || 'Includes'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 bg-slate-900/50">
                      <tr>
                        <td className="px-3 py-2 font-medium">BIKE</td>
                        <td className="px-3 py-2 text-slate-400">MOTOR CYCLE / LIGHT MOTOR CYCLE</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">3WHEEL</td>
                        <td className="px-3 py-2 text-slate-400">MOTOR TRICYCLE / MOTOR TRICYCLE VAN / INVALID CARRIAGE</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">QUADRICYCLE</td>
                        <td className="px-3 py-2 text-slate-400">QUADRICYCLE</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">CAR</td>
                        <td className="px-3 py-2 text-slate-400">MOTOR CAR / INVALID CARRIAGE</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">VAN</td>
                        <td className="px-3 py-2 text-slate-400">DUAL PURPOSE VEHICLE</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">BUS</td>
                        <td className="px-3 py-2 text-slate-400">MOTOR COACH / PRIVATE COACH / OMINI BUS / LIGHT MOTOR COACH</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">LORRY</td>
                        <td className="px-3 py-2 text-slate-400">MOTOR LORRY / DUAL PURPOSE / LIGHT MOTOR LORRY / PRIME MOVER / AMBULANCE / HEARSE / HEAVY MOTOR LORRY</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">SPECIAL PURPOSE</td>
                        <td className="px-3 py-2 text-slate-400">LAND VEHICLE / SPECIAL PURPOSE VEHICLE / NON AGRICULTURE LAND VEHICLE</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">LAND VEHICLE</td>
                        <td className="px-3 py-2 text-slate-400">HAND TRACTOR / AGRICULTURE LAND VEHICLE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <ul className="space-y-2 mt-4">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{t.note4}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{t.note5}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <span>{t.note6}</span>
                      <ul className="ml-6 mt-2 space-y-1 list-disc text-slate-400">
                        <li>{t.note6_1}</li>
                        <li>{t.note6_2}</li>
                        <li>{t.note6_3}</li>
                        <li>{t.note6_4}</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{t.note7}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{t.note8}</span>
                  </li>
                </ul>
              </div>
            )}
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
                  <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
                    Pay attention to number 0 vs letter O, number 5 vs letter S and number 8 vs letter S.
                  </p>
                  <input value={chassis} onChange={e => setChassis(e.target.value)} placeholder="Ex: N786543322" className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none uppercase" required />
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
            Already have an account? <Link href="/login" className="text-yellow-400 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
