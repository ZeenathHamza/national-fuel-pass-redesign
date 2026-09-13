'use client'

import { useState, useEffect } from 'react'
import { Download, Share2, ShieldCheck, Car } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'
import { createClient } from '@/lib/supabase/client'
import { QRCodeSVG } from 'qrcode.react'

export default function QRViewerPage() {
  const { language } = useLanguage()
  const t = translations[language]?.qrViewer || translations.en.qrViewer
  const supabase = createClient()

  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Fetch Vehicles
          const { data: userVehicles } = await supabase
            .from('vehicles')
            .select('*')
            .eq('profile_id', user.id)
            .order('created_at', { ascending: false })

          if (userVehicles && userVehicles.length > 0) {
            const mappedVehicles = await Promise.all(userVehicles.map(async (v) => {
              // Calculate default quota
              let defaultAllocated = 20
              if (v.vehicle_type === 'MOTORCYCLE') defaultAllocated = 8
              else if (v.vehicle_type === 'THREE_WHEELER') defaultAllocated = 20
              else if (v.vehicle_type === 'VAN') defaultAllocated = 50
              else if (v.vehicle_type === 'BUS') defaultAllocated = 100
              else if (v.vehicle_type === 'LORRY') defaultAllocated = 200

              // Fetch quota for this vehicle
              const { data: quotaData } = await supabase
                .from('fuel_quotas')
                .select('*')
                .eq('vehicle_id', v.id)
                .single()
              
              const allocated = quotaData ? Number(quotaData.allocated_quota) : defaultAllocated
              const used = quotaData ? Number(quotaData.used_quota) : 0
              const remaining = allocated - used

              return {
                id: v.id,
                number: v.registration_number,
                type: v.vehicle_type,
                qrHash: v.qr_code_hash || v.registration_number,
                allocated,
                used,
                remaining
              }
            }))
            
            setVehicles(mappedVehicles)
          }
        }
      } catch (error) {
        console.error('Error fetching QR data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-6 text-center mt-10">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-3xl border border-white/10 text-center">
            <Car size={48} className="mx-auto text-slate-500 mb-4" />
            <p className="text-slate-400">You haven't registered any vehicles yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-bold">
                  <ShieldCheck size={14} /> {t.activePass}
                </div>

                {/* Real QR Container */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center mx-auto w-fit border-4 border-yellow-500/30">
                  <QRCodeSVG 
                    value={vehicle.qrHash} 
                    size={180} 
                    level="H" 
                    includeMargin={false}
                  />
                  <p className="text-[10px] font-mono text-slate-500 mt-3 font-bold tracking-widest">{vehicle.number}-PASS</p>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                  <div className="text-center border-r border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{t.vehicleNo}</p>
                    <p className="text-sm font-bold text-white mt-1">{vehicle.number}</p>
                  </div>
                  <div className="text-center border-r border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Used</p>
                    <p className="text-sm font-bold text-slate-300 mt-1">{vehicle.used} L</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Remain</p>
                    <p className="text-sm font-bold text-yellow-400 mt-1">{vehicle.remaining} L</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500">{t.scanNotice}</p>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/20">
                    <Download size={18} /> {t.download}
                  </button>
                  <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all border border-white/10">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}