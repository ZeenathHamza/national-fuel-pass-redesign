'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Trash2, CheckCircle, AlertCircle, History, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function VehiclesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const showHistory = searchParams.get('history') === 'true'
  
  const [user, setUser] = useState<any>(null)
  const [activeVehicle, setActiveVehicle] = useState<any>(null)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [formData, setFormData] = useState({
    number: '',
    type: 'Car',
    chassis: '',
    fuelType: 'Petrol',
  })
  const [loading, setLoading] = useState(false)

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

  const vehicleTypes = [
    { value: 'Car', label: 'Motor Car', quota: 25 },
    { value: 'Motorcycle', label: 'Motorcycle', quota: 8 },
    { value: 'Three-Wheeler', label: 'Three-Wheeler', quota: 20 },
    { value: 'Van', label: 'Van', quota: 50 },
    { value: 'Bus', label: 'Bus', quota: 100 },
    { value: 'Lorry', label: 'Motor Lorry', quota: 200 },
  ]

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create new vehicle (active)
      const newVehicle = {
        id: `v${Date.now()}`,
        number: formData.number.toUpperCase(),
        type: formData.type,
        quota: vehicleTypes.find(v => v.value === formData.type)?.quota || 25,
        used: 0,
        remaining: vehicleTypes.find(v => v.value === formData.type)?.quota || 25,
        fuelType: formData.fuelType,
        isActive: true,
        registeredDate: new Date().toISOString().split('T')[0],
      }

      // Disable old vehicle, add new vehicle
      const updatedVehicles = user.vehicles.map((v: any) => ({
        ...v,
        isActive: false,
        deactivatedDate: new Date().toISOString().split('T')[0],
      }))
      updatedVehicles.push(newVehicle)

      const updatedUser = { ...user, vehicles: updatedVehicles }
      setUser(updatedUser)
      localStorage.setItem('fuelPassUser', JSON.stringify(updatedUser))
      
      toast.success(`✅ ${newVehicle.number} registered successfully! Old vehicle disabled.`)
      setShowRegisterForm(false)
      setFormData({ number: '', type: 'Car', chassis: '', fuelType: 'Petrol' })
      
      // Refresh active vehicle
      const active = updatedVehicles.find((v: any) => v.isActive)
      setActiveVehicle(active)
      
    } catch (err: any) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    )
  }

  const inactiveVehicles = user.vehicles.filter((v: any) => !v.isActive)

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 pb-20">
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
            <h1 className="text-2xl font-bold">🚗 Vehicle Management</h1>
            <p className="text-sm text-slate-400">Manage your active vehicle</p>
          </div>
        </div>

        {/* Active Vehicle */}
        {activeVehicle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-green-400" />
              <span className="text-sm font-medium text-green-400">Active Vehicle</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{activeVehicle.number}</p>
                <p className="text-sm text-slate-400">{activeVehicle.type} • {activeVehicle.fuelType}</p>
                <p className="text-sm text-slate-400 mt-1">Quota: {activeVehicle.quota}L • Remaining: {activeVehicle.remaining}L</p>
              </div>
              <button
                onClick={() => router.push('/qr-viewer')}
                className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-2 px-4 rounded-lg text-sm transition-all"
              >
                Show QR
              </button>
            </div>
          </motion.div>
        )}

        {/* Register New Vehicle Button */}
        {!showRegisterForm && (
          <button
            onClick={() => setShowRegisterForm(true)}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl p-6 text-center transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Register New Vehicle
          </button>
        )}

        {/* Register Form */}
        {showRegisterForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mt-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Register New Vehicle</h2>
              <button
                onClick={() => setShowRegisterForm(false)}
                className="p-1 rounded-full hover:bg-slate-700 transition-colors"
              >
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            {/* Warning */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-400">⚠️ Important</p>
                  <p className="text-xs text-slate-400">
                    Your current vehicle <span className="text-white font-medium">{activeVehicle?.number}</span> will be 
                    <span className="text-red-400 font-medium"> automatically disabled</span> when you register this new vehicle.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Vehicle Number</label>
                <input
                  type="text"
                  placeholder="e.g. ABC-5678"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Vehicle Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none transition-all appearance-none"
                    required
                  >
                    {vehicleTypes.map((vt) => (
                      <option key={vt.value} value={vt.value}>
                        {vt.label} ({vt.quota}L)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Chassis Number</label>
                <input
                  type="text"
                  placeholder="e.g. JF1GJ8A"
                  value={formData.chassis}
                  onChange={(e) => setFormData({ ...formData, chassis: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none transition-all uppercase"
                  required
                />
                <p className="text-[10px] text-slate-500 mt-1">⚠️ Case sensitive</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register Vehicle'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Vehicle History */}
        {inactiveVehicles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <History size={18} className="text-slate-400" />
              <h3 className="text-sm font-medium text-slate-400">Vehicle History</h3>
            </div>
            <div className="space-y-2">
              {inactiveVehicles.map((vehicle: any) => (
                <div
                  key={vehicle.id}
                  className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-400 line-through">{vehicle.number}</p>
                    <p className="text-xs text-slate-500">{vehicle.type} • {vehicle.fuelType}</p>
                    <p className="text-xs text-slate-500">
                      Registered: {vehicle.registeredDate} • Deactivated: {vehicle.deactivatedDate || 'N/A'}
                    </p>
                  </div>
                  <Trash2 size={16} className="text-slate-500" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}