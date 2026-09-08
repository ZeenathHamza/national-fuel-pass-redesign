'use client'

import Link from 'next/link'

export default function Homepage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⛽</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
          National Fuel Pass
        </h1>
        <p className="text-lg text-slate-400 mb-8">
          Manage your fuel quota, generate QR codes, and track your vehicles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-all">
              Get Started →
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-8 rounded-lg transition-all border border-slate-600">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
