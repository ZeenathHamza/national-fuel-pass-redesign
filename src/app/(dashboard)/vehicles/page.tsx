'use client'

import { useState, useEffect } from 'react'
import { Car, Plus, Fuel, ShieldCheck, CheckCircle2, X, Bike, Truck, Bus } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function VehiclesPage() {
  const { language } = useLanguage()
  const t = translations[language]?.vehicles || translations.en.vehicles
  const supabase = createClient()

  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vehicleNo, setVehicleNo] = useState('')
  const [vehicleType, setVehicleType] = useState('CAR')
  const [fuelType, setFuelType] = useState('Petrol')
  const [chassis, setChassis] = useState('')

  const getVehicleIcon = (type: string, props: any = {}) => {
    switch (type) {
      case 'MOTORCYCLE': return <Bike {...props} />;
      case 'BUS': return <Bus {...props} />;
      case 'LORRY': return <Truck {...props} />;
      case 'VAN': return <Truck {...props} />;
      case 'THREE_WHEELER': return <Car {...props} />;
      default: return <Car {...props} />;
    }
  }

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUserProfile(user)
        const { data: userVehicles } = await supabase
          .from('vehicles')
          .select('*')
          .eq('profile_id', user.id)
          .order('created_at', { ascending: false })

        if (userVehicles) {
          // Map db fields to component fields
          const mappedVehicles = userVehicles.map((v) => {
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
              quota: defaultAllocated
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

  useEffect(() => {
    fetchVehicles()
  }, [supabase])

  const handleRegisterVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userProfile) return

    setIsSubmitting(true)
    try {
      // Create a unique hash for the QR code
      const qrHash = btoa(`${vehicleNo}-${Date.now()}`)

      const { error } = await supabase.from('vehicles').insert({
        profile_id: userProfile.id,
        registration_number: vehicleNo,
        vehicle_type: vehicleType,
        fuel_type: fuelType,
        qr_code_hash: qrHash
      })

      if (error) {
        throw error
      }

      toast.success('Vehicle registered successfully!')
      setIsModalOpen(false)
      
      // Reset form
      setVehicleNo('')
      setVehicleType('CAR')
      setFuelType('Petrol')
      setChassis('')
      
      // Refresh the list
      fetchVehicles()

    } catch (error: any) {
      console.error('Error registering vehicle:', error)
      toast.error(error.message || 'Failed to register vehicle. Make sure the vehicle number is unique.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading && vehicles.length === 0) {
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20"
          >
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
                className="p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden bg-slate-900 border-yellow-500/40 shadow-xl shadow-yellow-500/5"
              >
                {/* Background Silhouette (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] text-white pointer-events-none">
                  {getVehicleIcon(v.type, { size: 180 })}
                </div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                      {getVehicleIcon(v.type, { size: 24 })}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{v.number}</h3>
                      <p className="text-xs text-slate-400">{v.type}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-green-400 font-medium text-xs bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <CheckCircle2 size={12} /> {t.active}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-sm relative z-10">
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

      {/* Register New Vehicle Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Register New Vehicle</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleRegisterVehicle} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Vehicle Number</label>
                  <input 
                    value={vehicleNo} 
                    onChange={e => setVehicleNo(e.target.value)} 
                    placeholder="e.g. ABC-1234" 
                    className="w-full bg-slate-950 text-white p-3 sm:p-4 rounded-xl border border-slate-700 focus:border-yellow-500 outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Vehicle Type</label>
                  <select 
                    value={vehicleType} 
                    onChange={e => setVehicleType(e.target.value)} 
                    className="w-full bg-slate-950 text-white p-3 sm:p-4 rounded-xl border border-slate-700 focus:border-yellow-500 outline-none appearance-none" 
                    required
                  >
                    <option value="CAR">Motor Car (25L)</option>
                    <option value="MOTORCYCLE">Motorcycle (8L)</option>
                    <option value="THREE_WHEELER">Three-Wheeler (20L)</option>
                    <option value="VAN">Van (50L)</option>
                    <option value="BUS">Bus (100L)</option>
                    <option value="LORRY">Motor Lorry (200L)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Chassis Number</label>
                  <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
                    Pay attention to number 0 vs letter O, number 5 vs letter S and number 8 vs letter S.
                  </p>
                  <input 
                    value={chassis} 
                    onChange={e => setChassis(e.target.value)} 
                    placeholder="Ex: N786543322" 
                    className="w-full bg-slate-950 text-white p-3 sm:p-4 rounded-xl border border-slate-700 focus:border-yellow-500 outline-none uppercase" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Fuel Type</label>
                  <select 
                    value={fuelType} 
                    onChange={e => setFuelType(e.target.value)} 
                    className="w-full bg-slate-950 text-white p-3 sm:p-4 rounded-xl border border-slate-700 focus:border-yellow-500 outline-none appearance-none" 
                    required
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Register Vehicle'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}