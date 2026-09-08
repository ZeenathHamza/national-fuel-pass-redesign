'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  QrCode, Car, Fuel, ArrowRight, Clock, 
  CheckCircle2, ChevronRight, Headphones, ShieldCheck 
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'

export default function DashboardPage() {
  const { language } = useLanguage()
  const t = translations[language]?.dashboard || translations.en.dashboard

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

  // Dummy fallback display values if user data doesn't exist
  const vehicleNo = activeVehicle?.number || 'CAD-1234'
  const vehicleType = activeVehicle?.type || 'Car'
  const fuelType = activeVehicle?.fuelType || 'Petrol 92'
  const allocated = activeVehicle?.allocatedQuota || 20
  const remaining = activeVehicle?.remainingQuota || 12
  const used = allocated - remaining

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900 p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.welcome}, <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">{user?.name || 'User'}</span> 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/80 border border-white/10 px-4 py-2.5 rounded-2xl w-fit">
            <Car className="text-yellow-400" size={20} />
            <div>
              <p className="text-xs text-slate-400">{t.activeVehicle}</p>
              <p className="text-sm font-bold text-white">{vehicleNo} <span className="text-xs text-slate-400 font-normal">({vehicleType})</span></p>
            </div>
          </div>
        </div>

        {/* Quota Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Remaining Quota Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 text-sm font-medium">{t.remainingQuota}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-black text-yellow-400">{remaining}</span>
                  <span className="text-lg text-slate-300 font-semibold">/ {allocated} {t.liters}</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <Fuel size={28} />
              </div>
            </div>

            {/* Quota Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${(remaining / allocated) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-medium pt-1">
                <span>{t.usedQuota}: {used} {t.liters}</span>
                <span>{t.allocatedQuota}: {allocated} {t.liters}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
              <Clock size={16} className="text-yellow-400" />
              <span>{t.nextReset}: <strong className="text-slate-200">Sunday Midnight (12:00 AM)</strong></span>
            </div>
          </div>

          {/* Quick Vehicle Info Card */}
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="text-green-400" size={20} />
                {t.activeVehicle}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">{t.fuelType}</span>
                  <span className="font-semibold text-white">{fuelType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">{t.chassisNumber}</span>
                  <span className="font-mono text-slate-300">****5892</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">{t.status}</span>
                  <span className="inline-flex items-center gap-1 text-green-400 font-medium text-xs bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
                    <CheckCircle2 size={12} /> Active
                  </span>
                </div>
              </div>
            </div>

            <Link 
              href="/vehicles"
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all"
            >
              {t.myVehicles} <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <Link href="/qr-viewer" className="group">
              <div className="bg-slate-900/80 hover:bg-slate-800/80 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <QrCode size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{t.viewQr}</h3>
                    <p className="text-xs text-slate-400">{t.viewQrDesc}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link href="/vehicles" className="group">
              <div className="bg-slate-900/80 hover:bg-slate-800/80 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Car size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{t.myVehicles}</h3>
                    <p className="text-xs text-slate-400">{t.myVehiclesDesc}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link href="/support" className="group">
              <div className="bg-slate-900/80 hover:bg-slate-800/80 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Headphones size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{t.support}</h3>
                    <p className="text-xs text-slate-400">{t.supportDesc}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">{t.recentActivity}</h2>
          <div className="divide-y divide-white/5">
            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-yellow-400">
                  <Fuel size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">CICO Shed - Colombo 03</p>
                  <p className="text-xs text-slate-400">2026-03-01 • 10:30 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-yellow-400">-8 L</p>
                <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full font-medium">
                  {t.completed}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}