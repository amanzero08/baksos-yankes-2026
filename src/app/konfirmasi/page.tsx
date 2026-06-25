import { getPendingProposals } from '@/app/actions'
import { KonfirmasiForm } from './konfirmasi-form'

export const revalidate = 0; // Disable cache for this page

export default async function KonfirmasiPage() {
  const pendingProposals = await getPendingProposals()

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center pt-20 px-4 pb-24">
      {/* Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <KonfirmasiForm pendingProposals={pendingProposals} />
    </div>
  )
}
