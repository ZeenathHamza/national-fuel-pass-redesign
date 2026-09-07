'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem('fuelPassUser')
    if (!loggedIn) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(loggedIn))
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white">Welcome, {user.name}!</h1>
        <p className="text-slate-400">Vehicle: {user.vehicle}</p>
        <p className="text-slate-400">Quota: {user.remaining}L remaining</p>
        <button
          onClick={() => {
            localStorage.removeItem('fuelPassUser')
            router.push('/login')
          }}
          className="mt-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  )
}