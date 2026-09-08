'use client'

import { Headphones, Mail, Phone, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'

export default function SupportPage() {
  const { language } = useLanguage()
  const t = translations[language]?.support || translations.en.support

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Quick Contact Info */}
          <div className="space-y-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">{t.hotline}</p>
                <p className="text-sm font-bold text-white mt-0.5">1919</p>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">{t.emailUs}</p>
                <p className="text-sm font-bold text-white mt-0.5">info@fuelpass.gov.lk</p>
              </div>
            </div>
          </div>

          {/* Ticket/Complaint Form */}
          <div className="md:col-span-2 bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white">{t.submitTicket}</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-slate-400 font-medium">{t.name}</label>
                <input 
                  type="text" 
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">{t.email}</label>
                <input 
                  type="email" 
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">{t.message}</label>
                <textarea 
                  rows={4}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-500"
                  placeholder="..."
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/20"
              >
                <Send size={16} /> {t.send}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}