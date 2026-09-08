'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Printer, Send, Shield } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import toast from 'react-hot-toast'

export default function QRViewerPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeVehicle, setActiveVehicle] = useState<any>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem('fuelPassUser')
    if (!loggedIn) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(loggedIn)
    setUser(userData)
    const active = userData.vehicles.find((v: any) => v.isActive)
    setActiveVehicle(active)
  }, [router])

  if (!user || !activeVehicle) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    )
  }

  const qrData = JSON.stringify({
    vehicle: activeVehicle.number,
    nic: user.nic,
    type: activeVehicle.type,
    timestamp: new Date().toISOString(),
  })

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">📱 QR Code</h1>
            <p className="text-sm text-slate-400">Show this QR code at the pump</p>
          </div>
        </div>

        {/* QR Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto"
        >
          <div className="bg-white p-4 rounded-xl inline-block">
            <QRCodeSVG
              value={qrData}
              size={200}
              level="H"
              includeMargin
            />
          </div>
          <p className="text-slate-900 font-bold text-xl mt-4">{activeVehicle.number}</p>
          <p className="text-slate-600 text-sm">{activeVehicle.type} • {activeVehicle.fuelType}</p>
          <p className="text-slate-600 text-sm mt-1">Remaining: {activeVehicle.remaining}L</p>
          <p className="text-slate-400 text-xs mt-2">Valid until: {new Date().toISOString().split('T')[0]}</p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 justify-center">
            <button className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all">
              <Download size={16} />
              Download
            </button>
            <button className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all">
              <Printer size={16} />
              Print
            </button>
          </div>
        </motion.div>

        {/* SMS Fallback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-slate-800 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="text-sm font-medium mb-2">📱 SMS Fallback</h3>
          <p className="text-xs text-slate-400">
            If you can't scan the QR code, send an SMS:
          </p>
          <div className="mt-3 bg-slate-900 rounded-lg p-4 font-mono text-sm text-yellow-400">
            FUEL QR {activeVehicle.number}
          </div>
          <p className="text-xs text-slate-500 mt-2">Send to: 076 622 0000</p>
        </motion.div>

        {/* Security Notice */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield size={14} className="text-green-400" />
          <span>🔒 Secure QR Code • Valid for one-time use</span>
        </div>
      </div>
    </div>
  )
}