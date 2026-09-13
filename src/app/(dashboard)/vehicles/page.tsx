'use client'

import { useState, useEffect } from 'react'
import { Car, Plus, Fuel, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'
import { createClient } from '@/lib/supabase/client'

export default function VehiclesPage() {
  const { language } = useLanguage()
  const t = translations[language]?.vehicles || translations.en.vehicles
  const supabase = createClient()

  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data: userVehicles } = await supabase
            .from('vehicles')
            .select('*')
            .eq('profile_id', user.id)

          if (userVehicles) {
            // Map db fields to component fields
            const mappedVehicles = userVehicles.map((v, index) => {
              let defaultAllocated = 20
              if (v.vehicle_type === 'MOTORCYCLE') defaultAllocated = 8
              else if (v.vehicle_type === 'THREE_WHEELER') defaultAllocated = 20
              else if (v.vehicle_type === 'VAN') defaultAllocated = 50
              else if (v.vehicle_type === 'BUS') defaultAllocated = 100
              else if (v.vehicle_type === 'LORRY') defaultAllocated = 200

              return {
                id: v.id,
                number: v.registration_number,
                type: v.vehicle_type,
                fuelType: v.fuel_type,
                quota: defaultAllocated,
                isActive: index === 0 // Making first vehicle active for now
              }
            })
            setVehicles(mappedVehicles)
          }
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t.title}</h1>
            <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
          </div>
          <button className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20">
            <Plus size={18} /> {t.addVehicle}
          </button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.length === 0 ? (
             <div className="col-span-1 md:col-span-2 text-center py-10 border border-white/5 bg-slate-900 rounded-3xl">
                <p className="text-slate-400">No vehicles registered yet.</p>
             </div>
          ) : (
            vehicles.map((v) => (
              <div 
                key={v.id} 
                className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  v.isActive 
                    ? 'bg-slate-900 border-yellow-500/40 shadow-xl shadow-yellow-500/5' 
                    : 'bg-slate-900/60 border-white/10 opacity-80'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                      <Car size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{v.number}</h3>
                      <p className="text-xs text-slate-400">{v.type}</p>
                    </div>
                  </div>
                  {v.isActive ? (
                    <span className="inline-flex items-center gap-1 text-green-400 font-medium text-xs bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                      <CheckCircle2 size={12} /> {t.active}
                    </span>
                  ) : (
                    <button className="text-xs text-slate-400 hover:text-white underline">
                      {t.selectActive}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">{t.fuel}</p>
                    <p className="font-semibold text-slate-200 mt-0.5">{v.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{t.quota}</p>
                    <p className="font-semibold text-yellow-400 mt-0.5">{v.quota} Liters/Week</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}