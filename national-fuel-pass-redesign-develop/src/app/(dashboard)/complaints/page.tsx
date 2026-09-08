'use client'

import { useState } from 'react'
import { FileText, Plus, AlertCircle, CheckCircle2, Clock, MessageSquare, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'
import toast from 'react-hot-toast'

export default function ComplaintsPage() {
  const { language } = useLanguage()
  const t = translations[language]?.complaints || translations.en.complaints

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP-1042',
      category: t.fuelStation,
      subject: 'Fuel shed operator refused quota scan',
      status: 'Pending',
      date: '2026-03-01',
    },
    {
      id: 'CMP-0981',
      category: t.quotaMismatch,
      subject: 'Quota deducted but fuel not dispensed',
      status: 'Resolved',
      date: '2026-02-20',
    }
  ])

  const [formData, setFormData] = useState({
    category: 'fuelStation',
    subject: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.subject || !formData.description) {
      toast.error('Please fill out all fields')
      return
    }

    const newCmp = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      category: formData.category === 'fuelStation' ? t.fuelStation : t.quotaMismatch,
      subject: formData.subject,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    }

    setComplaints([newCmp, ...complaints])
    setIsModalOpen(false)
    setFormData({ category: 'fuelStation', subject: '', description: '' })
    toast.success('Complaint submitted successfully!')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-500/20">
            <CheckCircle2 size={12} /> {t.resolved}
          </span>
        )
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full text-xs font-semibold border border-yellow-500/20">
            <Clock size={12} /> {t.pending}
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t.title}</h1>
            <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20"
          >
            <Plus size={18} /> {t.newComplaint}
          </button>
        </div>

        {/* Complaints List */}
        <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {complaints.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <FileText size={48} className="mx-auto mb-3 opacity-30" />
              <p>{t.noComplaints}</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {complaints.map((c) => (
                <div key={c.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-yellow-400 shrink-0 mt-1 sm:mt-0">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-yellow-400/80 font-bold">{c.id}</span>
                        <span className="text-xs text-slate-400">• {c.category}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-0.5">{c.subject}</h3>
                      <p className="text-xs text-slate-500 mt-1">{t.date}: {c.date}</p>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(c.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* New Complaint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertCircle size={20} className="text-yellow-400" />
              {t.formTitle}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs text-slate-400 font-medium">{t.category}</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="fuelStation">{t.fuelStation}</option>
                  <option value="quotaMismatch">{t.quotaMismatch}</option>
                  <option value="qrScanning">{t.qrScanning}</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">{t.subject}</label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="..."
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium">{t.description}</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="..."
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-yellow-500/20"
                >
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}