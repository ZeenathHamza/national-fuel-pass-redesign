'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, LayoutDashboard, QrCode, Headphones, FileText, 
  Car, Bell, User, LogOut, ChevronDown, Settings, Users, Globe
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useLanguage, Language } from '@/context/LanguageContext'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [activeVehicle, setActiveVehicle] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('fuelPassUser')
    if (loggedIn) {
      const userData = JSON.parse(loggedIn)
      setUser(userData)
      const active = userData.vehicles?.find((v: any) => v.isActive)
      setActiveVehicle(active)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: QrCode, label: 'QR Code', href: '/qr-viewer' },
    { icon: Headphones, label: 'Support', href: '/support' },
    { icon: FileText, label: 'Complaints', href: '/complaints' },
    { icon: Car, label: 'Vehicles', href: '/vehicles' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
  ]

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    localStorage.removeItem('fuelPassUser')
    toast.success('Logged out successfully')
    router.push('/login')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <nav
        className={`
          sticky top-4 z-50 mx-4 transition-all duration-300
          ${scrolled 
            ? 'bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-900/50' 
            : 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-slate-900/30'
          }
          rounded-2xl border border-white/10
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-yellow-500/20">
                <span className="text-xl">⛽</span>
              </div>
              <span className="text-lg font-bold text-white hidden sm:block bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Fuel Pass
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    flex items-center gap-2
                    ${isActive(item.href)
                      ? 'bg-yellow-500/15 text-yellow-400 shadow-lg shadow-yellow-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:shadow-lg hover:shadow-slate-800/30'
                    }
                  `}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Language Switcher Buttons */}
              <div className="flex items-center gap-1 bg-slate-800/80 border border-white/10 p-1 rounded-xl">
                {(['en', 'si', 'ta'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                      language === lang
                        ? 'bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'si' ? 'සිං' : 'தமிழ்'}
                  </button>
                ))}
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 hover:shadow-lg hover:shadow-slate-800/30">
                <Bell size={20} className="text-slate-400 hover:text-white transition-colors" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-slate-900 animate-pulse" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 hover:shadow-lg hover:shadow-slate-800/30"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    <span className="text-sm font-bold text-yellow-400">
                      {user ? getInitials(user.name) : 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-white hidden sm:block font-medium">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 hidden sm:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 bg-slate-800/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-slate-900/50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/5">
                        <p className="font-bold text-white">{user?.name || 'User'}</p>
                        <p className="text-sm text-slate-400">
                          {activeVehicle?.number || 'No vehicle'} • {activeVehicle?.type || 'N/A'}
                        </p>
                      </div>

                      <div className="p-2 space-y-1">
                        <ProfileLink href="/profile" icon={User} label="My Profile" />
                        <ProfileLink href="/vehicles" icon={Car} label="My Vehicles" />
                        <ProfileLink href="/settings" icon={Settings} label="Settings" />
                        {user?.isAdmin && (
                          <ProfileLink href="/admin" icon={Users} label="Admin Panel" />
                        )}
                        <div className="border-t border-white/5 pt-1 mt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
                          >
                            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200 hover:shadow-lg hover:shadow-slate-800/30"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Menu size={24} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200
                      ${isActive(item.href)
                        ? 'bg-yellow-500/15 text-yellow-400 shadow-lg shadow-yellow-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:shadow-lg hover:shadow-slate-800/30'
                      }
                    `}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}

                <div className="border-t border-white/5 pt-2 mt-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleLogout()
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from hiding behind the navbar */}
      <div className="h-4" />
    </>
  )
}

// Profile Link Component
function ProfileLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(href)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-slate-700/50 transition-all duration-200 group"
    >
      <Icon size={18} className="group-hover:scale-110 transition-transform" />
      {label}
    </button>
  )
}