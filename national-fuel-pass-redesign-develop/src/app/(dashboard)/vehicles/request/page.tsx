'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, CheckCircle, AlertCircle, X, FileText, Image, File } from 'lucide-react'
import toast from 'react-hot-toast'

export default function VehicleRequestPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    number: '',
    type: 'Car',
    chassis: '',
    fuelType: 'Petrol',
  })
  const [documents, setDocuments] = useState({
    nic: null as File | null,
    cr: null as File | null,
    insurance: null as File | null,
  })
  const [uploadStatus, setUploadStatus] = useState({
    nic: false,
    cr: false,
    insurance: false,
  })
  const [uploadedFiles, setUploadedFiles] = useState({
    nic: '',
    cr: '',
    insurance: '',
  })

  const vehicleTypes = [
    { value: 'Car', label: 'Motor Car', quota: 25 },
    { value: 'Motorcycle', label: 'Motorcycle', quota: 8 },
    { value: 'Three-Wheeler', label: 'Three-Wheeler', quota: 20 },
    { value: 'Van', label: 'Van', quota: 50 },
    { value: 'Bus', label: 'Bus', quota: 100 },
    { value: 'Lorry', label: 'Motor Lorry', quota: 200 },
  ]

  const handleFileUpload = (type: 'nic' | 'cr' | 'insurance', file: File) => {
    setDocuments({ ...documents, [type]: file })
    setUploadStatus({ ...uploadStatus, [type]: true })
    setUploadedFiles({ ...uploadedFiles, [type]: file.name })
    toast.success(`${getDocumentLabel(type)} uploaded successfully!`)
  }

  const getDocumentLabel = (type: string) => {
    switch (type) {
      case 'nic': return 'NIC Copy'
      case 'cr': return 'CR Copy'
      case 'insurance': return 'Insurance'
      default: return ''
    }
  }

  const getDocumentIcon = (type: string) => {
    const file = documents[type as keyof typeof documents]
    if (!file) return <File size={18} />
    if (file.type.startsWith('image/')) return <Image size={18} />
    return <FileText size={18} />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Save request to localStorage (mock)
      const requestData = {
        id: `REQ-${Date.now()}`,
        vehicle: formData.number,
        type: formData.type,
        chassis: formData.chassis,
        fuelType: formData.fuelType,
        documents: uploadStatus,
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0],
        notes: 'Waiting for admin verification',
      }
      localStorage.setItem('pendingVehicleRequest', JSON.stringify(requestData))
      
      toast.success('✅ Request submitted successfully! Admin will verify your documents.')
      router.push('/vehicles/status')
    } catch (err: any) {
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
            <h1 className="text-2xl font-bold">📝 Request New Vehicle</h1>
            <p className="text-sm text-slate-400">Submit for admin verification</p>
          </div>
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-400">⚠️ Important Notice</p>
              <p className="text-xs text-slate-400 mt-1">
                Your current vehicle will be <span className="text-yellow-400 font-medium">automatically disabled</span> 
                once your request is <span className="text-green-400 font-medium">approved</span> by an admin. 
                This process may take <span className="text-white font-medium">2-3 business days</span>.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                You can only have <span className="text-white font-medium">one active vehicle</span> at a time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4">
            {/* Vehicle Number */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">
                Vehicle Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. ABC-5678"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value.toUpperCase() })}
                className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none transition-all uppercase"
                required
              />
            </div>

            {/* Vehicle Type & Fuel Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">
                  Vehicle Type <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none appearance-none"
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
                <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">
                  Fuel Type <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                  className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none appearance-none"
                  required
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
            </div>

            {/* Chassis Number */}
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">
                Chassis Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. JF1GJ8A"
                value={formData.chassis}
                onChange={(e) => setFormData({ ...formData, chassis: e.target.value.toUpperCase() })}
                className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-600 focus:border-yellow-500 outline-none transition-all uppercase"
                required
              />
              <p className="text-[10px] text-slate-500 mt-1">⚠️ Case sensitive — Must match CR copy</p>
            </div>

            {/* Document Upload */}
            <div className="border-t border-slate-700 pt-4 mt-2">
              <h3 className="text-sm font-semibold mb-4">📎 Upload Documents</h3>
              <div className="space-y-3">
                {[
                  { key: 'nic', label: 'NIC Copy' },
                  { key: 'cr', label: 'CR Copy' },
                  { key: 'insurance', label: 'Insurance' },
                ].map((doc) => (
                  <div key={doc.key} className="flex items-center gap-3">
                    <label className="flex-1 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded-lg p-3 text-center cursor-pointer transition-all group">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(doc.key as 'nic' | 'cr' | 'insurance', file)
                        }}
                      />
                      <div className="flex items-center justify-center gap-2 text-sm">
                        {uploadStatus[doc.key as keyof typeof uploadStatus] ? (
                          <>
                            <CheckCircle size={16} className="text-green-400" />
                            <span className="text-green-400">{doc.label} uploaded</span>
                            <span className="text-xs text-slate-500 ml-1">({uploadedFiles[doc.key as keyof typeof uploadedFiles]})</span>
                          </>
                        ) : (
                          <>
                            <Upload size={16} className="text-slate-400 group-hover:text-yellow-400 transition-colors" />
                            <span className="text-slate-400 group-hover:text-white transition-colors">Upload {doc.label}</span>
                            <span className="text-xs text-slate-500">(JPG, PNG, PDF)</span>
                          </>
                        )}
                      </div>
                    </label>
                    {uploadStatus[doc.key as keyof typeof uploadStatus] && (
                      <button
                        type="button"
                        onClick={() => {
                          setUploadStatus({ ...uploadStatus, [doc.key]: false })
                          setDocuments({ ...documents, [doc.key]: null })
                          setUploadedFiles({ ...uploadedFiles, [doc.key]: '' })
                          toast.info(`${doc.label} removed`)
                        }}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !uploadStatus.nic || !uploadStatus.cr || !uploadStatus.insurance}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Request'
              )}
            </button>

            {/* Document Required Notice */}
            {(!uploadStatus.nic || !uploadStatus.cr || !uploadStatus.insurance) && (
              <p className="text-xs text-yellow-400/70 text-center">
                ⚠️ Please upload all required documents (NIC, CR, Insurance) before submitting.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}