'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Info, Check, ChevronDown, ChevronUp } from 'lucide-react'

export default function Homepage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [showNotes, setShowNotes] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace('/dashboard')
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 pt-20">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl mt-10">
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⛽</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
          National Fuel Pass
        </h1>
        <p className="text-lg text-slate-400 mb-8">
          Manage your fuel quota, generate QR codes, and track your vehicles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/login">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-all">
              Login to Account &rarr;
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-8 rounded-lg transition-all border border-slate-600">
              Register New Vehicle
            </button>
          </Link>
        </div>
      </div>

      {/* Things to note section on Homepage (like original site) */}
      <div className="w-full max-w-3xl bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden mb-20 shadow-xl">
        <button 
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Info size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200">Things to note prior to Registration</h3>
              <p className="text-sm text-slate-400">Click to view instructions and vehicle categories</p>
            </div>
          </div>
          {showNotes ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
        </button>

        {showNotes && (
          <div className="p-6 pt-0 border-t border-slate-700/50 text-sm text-slate-300 space-y-6 mt-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <span>Enter the Chassis number precisely as per the Certificate of Registration of Motor Vehicles (Case Sensitive)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <span>Vehicle registrations with Sri - to only enter the vehicle number in columns Ex: 3 Sri -1234 &rarr; <b className="text-white bg-slate-800 px-2 py-0.5 rounded">3 1234</b></span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <span>Vehicle category to be selected as per Certificate of Registration of Motor Vehicle. Applicable categories:</span>
              </li>
            </ul>

            <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-inner">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-800 text-slate-300">
                  <tr>
                    <th className="px-4 py-3 font-bold border-b border-slate-700">Category</th>
                    <th className="px-4 py-3 font-bold border-b border-slate-700">Includes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">BIKE</td>
                    <td className="px-4 py-3 text-slate-400">MOTOR CYCLE / LIGHT MOTOR CYCLE</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">3WHEEL</td>
                    <td className="px-4 py-3 text-slate-400">MOTOR TRICYCLE / MOTOR TRICYCLE VAN / INVALID CARRIAGE</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">QUADRICYCLE</td>
                    <td className="px-4 py-3 text-slate-400">QUADRICYCLE</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">CAR</td>
                    <td className="px-4 py-3 text-slate-400">MOTOR CAR / INVALID CARRIAGE</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">VAN</td>
                    <td className="px-4 py-3 text-slate-400">DUAL PURPOSE VEHICLE</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">BUS</td>
                    <td className="px-4 py-3 text-slate-400">MOTOR COACH / PRIVATE COACH / OMINI BUS / LIGHT MOTOR COACH</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">LORRY</td>
                    <td className="px-4 py-3 text-slate-400">MOTOR LORRY / DUAL PURPOSE / LIGHT MOTOR LORRY / PRIME MOVER / AMBULANCE / HEARSE / HEAVY MOTOR LORRY</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">SPECIAL PURPOSE</td>
                    <td className="px-4 py-3 text-slate-400">LAND VEHICLE / SPECIAL PURPOSE VEHICLE / NON AGRICULTURE LAND VEHICLE</td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">LAND VEHICLE</td>
                    <td className="px-4 py-3 text-slate-400">HAND TRACTOR / AGRICULTURE LAND VEHICLE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="space-y-3 mt-6">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <span>Only one NIC/PP is allowed per vehicle and per mobile no</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <span>At registration NIC/Name/Address does not require to match Certificate of registration ownership details</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white">Company and Gov vehicles/bikes can be registered under BRN category. If require to register multiple vehicles follow below instructions:</span>
                  <ul className="ml-8 mt-3 space-y-2 list-disc text-slate-400">
                    <li>Under Nic number create a Unique code for your Institute (Numeric or Alphabetical) and this should be consistent for every vehicle profile.</li>
                    <li>Any Commercial/Government ministry or Institution/NGO/ Clubs etc to register under BRN category.</li>
                    <li>Select BRN and follow the registration process.</li>
                    <li>Multiple vehicles can be registered under a single mobile number.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <span>Fuel Liter allocation will be based on vehicle category. Allocation will be announced by Ministry of Power & Energy</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                <span>Call <b className="text-yellow-400 text-lg">1919</b> for any registration related assistance</span>
              </li>
            </ul>
          </div>
        )}
      </div>

    </div>
  )
}
