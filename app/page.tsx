'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Users, Fuel, Clock, MessageCircle } from 'lucide-react'

export default function Homepage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* 🟢 Status Bar */}
      <div className="sticky top-0 z-50 bg-background-primary/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 safe-top">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">🔒 Secure</span>
            <span className="w-px h-3 bg-slate-700" />
            <span className="text-xs text-slate-500">fuelpass.gov.lk</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="status-dot-green" />
            <span className="text-xs text-slate-400">System Online</span>
          </div>
        </div>
      </div>

      {/* 🎯 Hero Section */}
      <section className="relative px-6 pt-16 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cpc-yellow/5 via-transparent to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-6">
            <span className="status-dot-green" />
            <span className="text-xs text-slate-400">All Systems Operational</span>
          </div>

          <div className="w-20 h-20 rounded-full bg-cpc-yellow/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⛽</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            National Fuel Pass
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Manage your fuel quota, generate QR codes, and track your vehicles — all in one secure platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2 text-lg px-8"
              >
                Get Started
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link href="/support">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary inline-flex items-center gap-2 text-lg px-8"
              >
                <MessageCircle size={20} />
                Need Help?
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 📊 Stats Section */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-lg p-6 text-center"
            >
              <Users className="w-8 h-8 text-cpc-yellow mx-auto mb-2" />
              <p className="text-2xl font-bold">800K+</p>
              <p className="text-sm text-slate-400">Registered Users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-lg p-6 text-center"
            >
              <Fuel className="w-8 h-8 text-cpc-yellow mx-auto mb-2" />
              <p className="text-2xl font-bold">10M+</p>
              <p className="text-sm text-slate-400">Liters Dispensed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-lg p-6 text-center"
            >
              <Shield className="w-8 h-8 text-cpc-yellow mx-auto mb-2" />
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-slate-400">Uptime</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-lg p-6 text-center"
            >
              <Clock className="w-8 h-8 text-cpc-yellow mx-auto mb-2" />
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-slate-400">Support Available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📖 How It Works */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Register', desc: 'Sign up with your NIC and vehicle number' },
              { step: '2', title: 'Get QR', desc: 'Generate your unique QR code instantly' },
              { step: '3', title: 'Fuel Up', desc: 'Show QR at the pump and get your fuel' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-cpc-yellow/20 text-cpc-yellow text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📝 Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <span>© 2026 Ceylon Petroleum Corporation</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="/support" className="hover:text-slate-300 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </main>
  )
}