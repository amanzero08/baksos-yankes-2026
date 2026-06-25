'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, FileText, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <>
      {/* Desktop Top Nav */}
      <header className="hidden sm:block sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="font-bold text-[var(--color-primary-blue)] text-xl flex items-center gap-3">
             <img src="/logo-yankes.png" alt="Yankes Logo" className="h-10 object-contain drop-shadow-sm" />
             <div className="flex flex-col">
               <span className="leading-tight tracking-tight">Lintas Sinodal</span>
               <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Bakti Sosial 2026</span>
             </div>
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/" className={`text-sm font-semibold transition-colors hover:text-[var(--color-primary-blue)] ${pathname === '/' ? 'text-[var(--color-primary-blue)]' : 'text-slate-500'}`}>Beranda</Link>
            <Link href="/proposal" className={`text-sm font-semibold transition-colors hover:text-[var(--color-primary-blue)] ${pathname === '/proposal' ? 'text-[var(--color-primary-blue)]' : 'text-slate-500'}`}>Proposal Donasi</Link>
            <Link href="/konfirmasi" className={`text-sm font-semibold transition-colors hover:text-[var(--color-primary-blue)] ${pathname === '/konfirmasi' ? 'text-[var(--color-primary-blue)]' : 'text-slate-500'}`}>Konfirmasi</Link>
            <Link href="/admin" className={`text-sm font-semibold transition-colors hover:text-[var(--color-primary-blue)] ${pathname === '/admin' ? 'text-[var(--color-primary-blue)]' : 'text-slate-500'}`}>Daftar Proposal</Link>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <Link href="/proposal">
              <Button className="bg-[var(--color-primary-blue)] hover:bg-[var(--color-primary-blue-light)] text-white rounded-full px-8 h-10 shadow-md shadow-blue-500/20 font-semibold tracking-wide">
                Beri Dukungan
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="sm:hidden sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-xl h-16 flex items-center px-4 justify-center shadow-sm">
        <Link href="/" className="font-bold text-[var(--color-primary-blue)] text-lg flex items-center gap-2">
           <img src="/logo-yankes.png" alt="Yankes Logo" className="h-7" />
           <span className="tracking-tight">Lintas Sinodal 26</span>
        </Link>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-5 pt-3 px-8 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.06)] rounded-t-3xl">
        <Link href="/" className="flex flex-col items-center gap-1.5 p-2 relative">
          <Home className={`w-6 h-6 transition-all duration-300 ${pathname === '/' ? 'text-[var(--color-primary-blue)] scale-110' : 'text-slate-400 scale-100'}`} />
          {pathname === '/' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary-blue)]" />
          )}
        </Link>
        <Link href="/proposal" className="flex flex-col items-center gap-1.5 p-2 relative">
          <FileText className={`w-6 h-6 transition-all duration-300 ${pathname === '/proposal' ? 'text-[var(--color-primary-blue)] scale-110' : 'text-slate-400 scale-100'}`} />
          {pathname === '/proposal' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary-blue)]" />
          )}
        </Link>
        <Link href="/konfirmasi" className="flex flex-col items-center gap-1.5 p-2 relative">
          <CheckCircle className={`w-6 h-6 transition-all duration-300 ${pathname === '/konfirmasi' ? 'text-[var(--color-primary-blue)] scale-110' : 'text-slate-400 scale-100'}`} />
          {pathname === '/konfirmasi' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary-blue)]" />
          )}
        </Link>
      </div>
    </>
  )
}
