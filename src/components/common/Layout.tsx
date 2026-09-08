'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './NavBar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  
  // Hide navbar on login, register, and admin pages
  const hideNavbar = ['/login', '/register'].includes(pathname) || pathname?.startsWith('/admin')
  
  // Admin pages use their own layout
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  )
}