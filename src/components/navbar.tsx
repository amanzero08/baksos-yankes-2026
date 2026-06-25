'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, FileText, CheckCircle, BarChart3, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <>
      {/* Desktop Top Nav */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-slate-100 text-xl flex items-center gap-3">
             <img src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" alt="Yankes Logo" className="h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
             <div className="flex flex-col">
               <span className="leading-tight tracking-tight text-glow">Lintas Sinodal</span>
               <span className="text-[10px] text-amber-500 font-medium tracking-widest uppercase">Bakti Sosial 2026</span>
             </div>
          </Link>
          <nav className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className={`text-sm font-semibold transition-colors hover:text-amber-400 ${pathname === '/' ? 'text-amber-400' : 'text-slate-400'}`}>Beranda</Link>
            <Link href="/proposal" className={`text-sm font-semibold transition-colors hover:text-amber-400 ${pathname === '/proposal' ? 'text-amber-400' : 'text-slate-400'}`}>Proposal</Link>
            <Link href="/konfirmasi" className={`text-sm font-semibold transition-colors hover:text-amber-400 ${pathname === '/konfirmasi' ? 'text-amber-400' : 'text-slate-400'}`}>Konfirmasi</Link>
            <Link href="/dashboard" className={`text-sm font-semibold transition-colors hover:text-amber-400 ${pathname === '/dashboard' ? 'text-amber-400' : 'text-slate-400'}`}>Dasbor</Link>
            <Link href="/admin" className={`text-sm font-semibold transition-colors hover:text-amber-400 ${pathname === '/admin' ? 'text-amber-400' : 'text-slate-400'}`}>Admin</Link>
            <div className="w-px h-6 bg-white/10 mx-1"></div>
            <Link href="/proposal">
              <Button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-900 rounded-full px-6 lg:px-8 h-10 shadow-[0_0_15px_rgba(253,224,71,0.3)] font-bold tracking-wide transition-all hover:scale-105">
                Beri Dukungan
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-xl h-16 flex items-center px-4 justify-center shadow-sm">
        <Link href="/" className="font-heading font-bold text-slate-100 text-lg flex items-center gap-2">
           <img src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" alt="Yankes Logo" className="h-7 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
           <span className="tracking-tight text-glow">Lintas Sinodal 26</span>
        </Link>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-white/10 pb-5 pt-3 px-4 sm:px-8 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.4)] rounded-t-3xl">
        <Link href="/" className="flex flex-col items-center gap-1 p-2 relative flex-1">
          <Home className={`w-5 h-5 transition-all duration-300 ${pathname === '/' ? 'text-amber-400 scale-110' : 'text-slate-500 scale-100'}`} />
          <span className={`text-[10px] font-medium mt-0.5 ${pathname === '/' ? 'text-amber-400' : 'text-slate-500'}`}>Beranda</span>
          {pathname === '/' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          )}
        </Link>
        <Link href="/proposal" className="flex flex-col items-center gap-1 p-2 relative flex-1">
          <FileText className={`w-5 h-5 transition-all duration-300 ${pathname === '/proposal' ? 'text-amber-400 scale-110' : 'text-slate-500 scale-100'}`} />
          <span className={`text-[10px] font-medium mt-0.5 ${pathname === '/proposal' ? 'text-amber-400' : 'text-slate-500'}`}>Proposal</span>
          {pathname === '/proposal' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          )}
        </Link>
        <Link href="/konfirmasi" className="flex flex-col items-center gap-1 p-2 relative flex-1">
          <CheckCircle className={`w-5 h-5 transition-all duration-300 ${pathname === '/konfirmasi' ? 'text-amber-400 scale-110' : 'text-slate-500 scale-100'}`} />
          <span className={`text-[10px] font-medium mt-0.5 ${pathname === '/konfirmasi' ? 'text-amber-400' : 'text-slate-500'}`}>Konfirmasi</span>
          {pathname === '/konfirmasi' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          )}
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 relative flex-1">
          <BarChart3 className={`w-5 h-5 transition-all duration-300 ${pathname === '/dashboard' ? 'text-amber-400 scale-110' : 'text-slate-500 scale-100'}`} />
          <span className={`text-[10px] font-medium mt-0.5 ${pathname === '/dashboard' ? 'text-amber-400' : 'text-slate-500'}`}>Dasbor</span>
          {pathname === '/dashboard' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          )}
        </Link>
        <Link href="/admin" className="flex flex-col items-center gap-1 p-2 relative flex-1">
          <Settings className={`w-5 h-5 transition-all duration-300 ${pathname === '/admin' ? 'text-amber-400 scale-110' : 'text-slate-500 scale-100'}`} />
          <span className={`text-[10px] font-medium mt-0.5 ${pathname === '/admin' ? 'text-amber-400' : 'text-slate-500'}`}>Admin</span>
          {pathname === '/admin' && (
            <motion.div layoutId="bottom-nav-indicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          )}
        </Link>
      </div>
    </>
  )
}
