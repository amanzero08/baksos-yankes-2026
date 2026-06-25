'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createProposal } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)
import { ProposalPDF } from '@/components/proposal-pdf'

const schema = z.object({
  donorName: z.string().min(2, 'Nama donatur harus diisi (min. 2 karakter)'),
  institution: z.string().optional(),
  committeeName: z.string().min(2, 'Nama panitia pembuat harus diisi'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function ProposalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [proposalData, setProposalData] = useState<any>(null)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError('')
    try {
      const result = await createProposal(data)
      if (result.success) {
        setProposalData(result.data)
      } else {
        setError(result.error || 'Terjadi kesalahan saat membuat proposal')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center pt-20 px-4 pb-24">
      {/* Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl relative z-10"
      >
        {!proposalData ? (
          <Card className="glass-panel border-t-4 border-t-amber-500 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <CardHeader className="border-b border-white/5 pb-6 bg-slate-900/30">
              <CardTitle className="font-heading text-3xl text-amber-400 font-bold">Generator Proposal Donasi</CardTitle>
              <CardDescription className="text-slate-400 text-base mt-2">
                Isi form di bawah ini untuk membuat proposal resmi secara otomatis untuk calon donatur eksklusif Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="donorName" className="text-slate-300 font-semibold">Nama Calon Donatur <span className="text-amber-500">*</span></Label>
                  <Input 
                    id="donorName" 
                    placeholder="Contoh: Bpk. Yohanes" 
                    {...register('donorName')} 
                    className="bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-amber-500 h-12"
                  />
                  {errors.donorName && <p className="text-sm text-red-400 font-medium">{errors.donorName.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="institution" className="text-slate-300 font-semibold">Institusi / Perusahaan (Opsional)</Label>
                  <Input 
                    id="institution" 
                    placeholder="Contoh: PT. Maju Bersama" 
                    {...register('institution')} 
                    className="bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-amber-500 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="committeeName" className="text-slate-300 font-semibold">Nama Panitia (Anda) <span className="text-amber-500">*</span></Label>
                  <Input 
                    id="committeeName" 
                    placeholder="Nama Anda sebagai perwakilan panitia" 
                    {...register('committeeName')} 
                    className="bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-amber-500 h-12"
                  />
                  {errors.committeeName && <p className="text-sm text-red-400 font-medium">{errors.committeeName.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-slate-300 font-semibold">Pesan Khusus (Opsional)</Label>
                  <Input 
                    id="message" 
                    placeholder="Pesan pengantar khusus untuk donatur" 
                    {...register('message')} 
                    className="bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-amber-500 h-12"
                  />
                </div>

                {error && <div className="p-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium">{error}</div>}

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-900 font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_rgba(253,224,71,0.2)] transition-all hover:scale-[1.02]" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Membuat Proposal...' : 'Generate Proposal PDF'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="glass-panel border-t-4 border-t-emerald-500 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CardHeader className="border-b border-white/5 pb-6 bg-slate-900/30">
                <CardTitle className="font-heading text-3xl text-emerald-400 font-bold flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Proposal Berhasil Dibuat!
                </CardTitle>
                <CardDescription className="text-slate-400 text-base mt-2">
                  Nomor Proposal: <strong className="text-amber-400 text-lg tracking-wider ml-1">{proposalData.proposal_number}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 pb-8 space-y-8">
                <p className="text-slate-300 text-lg">
                  Dokumen PDF kelas premium telah selesai digenerate. Silakan unduh dokumen di bawah ini dan kirimkan ke donatur Anda.
                </p>
                
                <div className="flex flex-col gap-4">
                  <PDFDownloadLink
                    document={<ProposalPDF data={proposalData} />}
                    fileName={`${proposalData.proposal_number}_${proposalData.donor_name.replace(/\s+/g, '_')}.pdf`}
                    className="w-full"
                  >
                    {/* @ts-ignore */}
                    {({ loading }) => (
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-slate-900 font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02]" disabled={loading}>
                        {loading ? 'Menyiapkan Dokumen...' : 'Unduh File PDF Resmi'}
                      </Button>
                    )}
                  </PDFDownloadLink>

                  <Button variant="outline" onClick={() => setProposalData(null)} className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white h-14 rounded-xl font-semibold bg-transparent">
                    Buat Proposal Baru
                  </Button>
                </div>
                
                <div className="bg-slate-900/60 p-5 rounded-xl border border-white/5 mt-4">
                  <h4 className="font-bold text-amber-500 mb-3 text-sm tracking-wide uppercase">Contoh Pengantar WhatsApp</h4>
                  <p className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed">
                    Syalom {proposalData.donor_name},{'\n\n'}
                    Bersama pesan ini, kami dari Panitia Baksos Lintas Sinodal 2026 bermaksud menyampaikan proposal permohonan donasi. Mohon berkenan untuk meninjau dokumen PDF terlampir.{'\n\n'}
                    Terima kasih atas perhatiannya. Tuhan Yesus memberkati.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
