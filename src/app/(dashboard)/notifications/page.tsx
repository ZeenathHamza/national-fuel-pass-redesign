'use client'

import { useState } from 'react'
import { Bell, Fuel, CheckCheck, Trash2, ShieldAlert } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/utils/translations'
import toast from 'react-hot-toast'

export default function NotificationsPage() {
  const { language } = useLanguage()
  const t = translations[language]?.notifications || translations.en.notifications

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: t.fuelDispensed,
      desc: '8 Liters of Petrol 92 pumped at CICO Station Colombo 03.',
      time: '10:30 AM',
      type: 'fuel',
      unread: true,
    },
    {
      id: '2',
      title: t.quotaReset,
      desc: 'Your weekly fuel quota of 20L has been renewed.',
      time: 'Sunday Midnight',
      type: 'system',
      unread: false,
    },
    {
      id: '3',
      title: t.systemAlert,
      desc: 'Successful login detected from new device.',
      time: '2 days ago',
      type: 'alert',
      unread: false,
    }
  ])

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })))
    toast.success('All marked as read')
  }

  const clearAll = () => {
    setNotifications([])
    toast.success('Notifications cleared')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t.title}</h1>
            <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
          </div>
          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              <button 
                onClick={markAllRead}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl text-xs text-slate-300 flex items-center gap-1.5 transition-all"
              >
                <CheckCheck size={14} /> {t.markAllRead}
              </button>
              <button 
                onClick={clearAll}
                className="px-3 py-2 bg-slate-900 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-1.5 transition-all"
              >
                <Trash2 size={14} /> {t.clearAll}
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Bell size={48} className="mx-auto mb-3 opacity-30" />
              <p>{t.noNotifications}</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-5 flex items-start gap-4 transition-colors ${
                    n.unread ? 'bg-yellow-500/5' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    n.type === 'fuel' 
                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' 
                      : n.type === 'alert'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {n.type === 'fuel' ? <Fuel size={18} /> : n.type === 'alert' ? <ShieldAlert size={18} /> : <Bell size={18} />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">{n.title}</h3>
                      <span className="text-[11px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{n.desc}</p>
                  </div>

                  {n.unread && (
                    <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}