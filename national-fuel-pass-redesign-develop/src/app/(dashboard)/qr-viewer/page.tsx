'use client'

import { useState, useEffect } from 'react'
import { QrCode, Download, Share2, ShieldCheck, Fuel } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'

export default function QRViewerPage() {
  const { language } = useLanguage()
  const t = translations[language]?.qrViewer || translations.en.qrViewer

  const [user, setUser] = useState<any>(null)
  const [activeVehicle, setActiveVehicle] = useState<any>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem('fuelPassUser')
    if (loggedIn) {
      const userData = JSON.parse(loggedIn)
      setUser(userData)
      const active = userData.vehicles?.find((v: any) => v.isActive) || userData.vehicles?.[0]
      setActiveVehicle(active)
    }
  }, [])

  const vehicleNo = activeVehicle?.number || 'CAD-1234'
  const remaining = activeVehicle?.remainingQuota || 12

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-6 text-center">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
        </div>

        {/* QR Pass Card */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-bold">
            <ShieldCheck size={14} /> {t.activePass}
          </div>

          {/* QR Container */}
          <div className="bg-white p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center mx-auto w-64 h-64 border-4 border-yellow-500/30">
            <QrCode size={180} className="text-slate-900" />
            <p className="text-[10px] font-mono text-slate-500 mt-2 font-bold tracking-widest">{vehicleNo}-PASS</p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-white/5">
            <div>
              <p className="text-xs text-slate-400">{t.vehicleNo}</p>
              <p className="text-base font-bold text-white mt-0.5">{vehicleNo}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">{t.fuelQuota}</p>
              <p className="text-base font-bold text-yellow-400 mt-0.5">{remaining} L Remaining</p>
            </div>
          </div>

          <p className="text-xs text-slate-500">{t.scanNotice}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/20">
            <Download size={18} /> {t.download}
          </button>
          <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all border border-white/10">
            <Share2 size={18} />
          </button>
        </div>

      </div>
    </div>
  )
}