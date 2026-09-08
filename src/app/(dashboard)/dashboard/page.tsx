'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Fuel, Calendar, History, QrCode, ChevronRight, 
  Bell, LogOut, Settings, AlertCircle, Plus 
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeVehicle, setActiveVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [dispenseAmount, setDispenseAmount] = useState(5)
  const [requestStatus, setRequestStatus] = useState<string | null>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem('fuelPassUser')
    if (!loggedIn) {
      router.push('/login')
      return
    }
    
    const userData = JSON.parse(loggedIn)
    setUser(userData)
    
    // Check if vehicles exists
    if (!userData.vehicles || !Array.isArray(userData.vehicles) || userData.vehicles.length === 0) {
      const defaultVehicle = {
        id: 'v1',
        number: userData.vehicle || 'ABC-1234',
        type: userData.vehicleType || 'Car',
        quota: userData.quota || 25,
        used: userData.used || 7,
        remaining: userData.remaining || 18,
        fuelType: userData.fuelType || 'Petrol',
        isActive: true,
        registeredDate: new Date().toISOString().split('T')[0],
      }
      userData.vehicles = [defaultVehicle]
      localStorage.setItem('fuelPassUser', JSON.stringify(userData))
    }
    
    // Check for pending request status
    const pendingRequest = localStorage.getItem('pendingVehicleRequest')
    if (pendingRequest) {
      setRequestStatus(JSON.parse(pendingRequest).status)
    }
    
    const active = userData.vehicles.find((v: any) => v.isActive === true)
    setActiveVehicle(active || userData.vehicles[0])
    
  }, [router])

  if (!user || !activeVehicle) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    )
  }

  const percent = ((activeVehicle.remaining / activeVehicle.quota) * 100)
  const color = percent > 50 ? 'bg-green-500' : percent > 20 ? 'bg-yellow-500' : 'bg-red-500'

  const handleDispense = () => {
    setLoading(true)
    setTimeout(() => {
      if (dispenseAmount > activeVehicle.remaining) {
        toast.error(`Insufficient quota. You have ${activeVehicle.remaining}L remaining.`)
        setLoading(false)
        return
      }
      
      const updatedVehicles = user.vehicles.map((v: any) => {
        if (v.isActive) {
          return { ...v, remaining: v.remaining - dispenseAmount, used: v.used + dispenseAmount }
        }
        return v
      })
      
      const updatedUser = { ...user, vehicles: updatedVehicles }
      setUser(updatedUser)
      localStorage.setItem('fuelPassUser', JSON.stringify(updatedUser))
      
      const updatedActive = updatedVehicles.find((v: any) => v.isActive)
      setActiveVehicle(updatedActive)
      
      toast.success(`${dispenseAmount}L dispensed successfully!`)
      setLoading(false)
    }, 800)
  }

  const handleLogout = () => {
    localStorage.removeItem('fuelPassUser')
    toast.success('Logged out successfully')
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Fuel size={20} className="text-yellow-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Fuel Pass</h1>
              <p className="text-xs text-slate-400">{activeVehicle.number}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Bell size={20} className="text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              <LogOut size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, {user.name} 👋</h2>
            <p className="text-sm text-slate-400">One active vehicle • {activeVehicle.type}</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg px-4 py-2 text-xs text-slate-400 inline-flex items-center gap-2 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Quota resets in 5 days
          </div>
        </motion.div>

        {/* Request Status Banner (if pending) */}
        {requestStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-yellow-400">Vehicle Request Pending</p>
                <p className="text-xs text-slate-400">Your request is under review by an admin. You will be notified once approved.</p>
              </div>
              <button
                onClick={() => router.push('/vehicles/status')}
                className="ml-auto text-yellow-400 text-sm hover:underline"
              >
                View Status
              </button>
            </div>
          </motion.div>
        )}

        {/* Active Vehicle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500/20 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-green-400 font-medium">Active</span>
            </div>
            <span className="text-xl font-bold text-white">{activeVehicle.number}</span>
            <span className="text-sm text-slate-400">({activeVehicle.type})</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Remaining Quota</p>
              <p className="text-5xl font-bold text-white tracking-tight">
                {activeVehicle.remaining}
                <span className="text-2xl font-normal text-slate-400 ml-1">L</span>
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Used {activeVehicle.used}L of {activeVehicle.quota}L
              </p>
            </div>
            <div className="text-sm text-slate-400">
              <span className="block">{Math.round(percent)}% available</span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-slate-700 rounded-full mt-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${color} rounded-full transition-all`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-slate-400">Fuel Type</p>
              <p className="text-white font-medium">{activeVehicle.fuelType}</p>
            </div>
            <div>
              <p className="text-slate-400">Registered</p>
              <p className="text-white font-medium">{activeVehicle.registeredDate}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: QrCode, label: 'Show QR', onClick: () => router.push('/qr-viewer'), color: 'bg-yellow-500/10 text-yellow-500' },
            { icon: Calendar, label: 'Eligibility', onClick: () => {}, color: 'bg-blue-500/10 text-blue-500' },
            { icon: History, label: 'History', onClick: () => {}, color: 'bg-green-500/10 text-green-500' },
            { icon: Settings, label: 'Settings', onClick: () => {}, color: 'bg-purple-500/10 text-purple-500' },
          ].map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
              className="bg-slate-800 rounded-lg p-4 text-center hover:border-slate-600 transition-all border border-slate-700"
            >
              <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mx-auto mb-2`}>
                <item.icon size={20} />
              </div>
              <span className="text-xs text-slate-300">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Eligibility Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-yellow-500" />
              <h3 className="font-semibold text-white">Eligibility Calendar</h3>
            </div>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
              ✅ Eligible Today
            </span>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-slate-500">{day}</p>
                <div className={`mt-1 w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs transition-all ${
                  i < 5 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {i < 5 ? '✅' : '❌'}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-slate-400 mt-4">
            Vehicle number ends in {activeVehicle.number.slice(-1)} — 
            {parseInt(activeVehicle.number.slice(-1)) % 2 === 0 ? ' Even numbers → Even dates' : ' Odd numbers → Odd dates'}
          </p>
        </motion.div>

        {/* Fuel Dispenser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
        >
          <h3 className="font-semibold text-white mb-4">⛽ Fuel Dispenser Simulation</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              value={dispenseAmount}
              onChange={(e) => setDispenseAmount(parseFloat(e.target.value) || 0)}
              className="flex-1 bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none"
              min="0.5"
              max="20"
              step="0.5"
            />
            <button
              onClick={handleDispense}
              disabled={loading || dispenseAmount <= 0}
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-lg transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? '⏳' : 'Dispense'}
            </button>
          </div>
        </motion.div>

        {/* Request New Vehicle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-yellow-400">Request New Vehicle</h4>
              <p className="text-xs text-slate-400 mt-1">
                You can only have <span className="text-white font-medium">one active vehicle</span> at a time. 
                When you submit a request for a new vehicle, your current vehicle ({activeVehicle.number}) will be 
                <span className="text-yellow-400 font-medium"> automatically disabled once approved</span> by an admin.
              </p>
              <button 
                onClick={() => router.push('/vehicles/request')}
                className="mt-3 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-medium text-sm py-2 px-4 rounded-lg transition-all"
              >
                <Plus size={16} />
                Request New Vehicle
              </button>
            </div>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History size={18} className="text-yellow-500" />
              <h3 className="font-semibold text-white">Recent Transactions</h3>
            </div>
            <button className="text-xs text-slate-400 hover:text-white transition-colors">
              View All
              <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, station: 'CPC Kolonnawa', liters: 12, date: '2026-09-05', time: '10:30 AM' },
              { id: 2, station: 'CPC Galle Face', liters: 10, date: '2026-09-01', time: '3:15 PM' },
            ].map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm text-white">{tx.station}</p>
                  <p className="text-xs text-slate-500">{tx.date} • {tx.time}</p>
                </div>
                <span className="font-mono text-red-400">-{tx.liters}L</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vehicle History Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <button 
            onClick={() => router.push('/vehicles?history=true')}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            📜 View Vehicle History
          </button>
        </motion.div>
      </div>
    </main>
  )
}