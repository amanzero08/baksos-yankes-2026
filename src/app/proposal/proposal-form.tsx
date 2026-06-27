'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createProposal } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchableSelect } from '@/components/searchable-select'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)
import { ProposalPDF } from '@/components/proposal-pdf'

const schema = z.object({
  donorName: z.string().min(2, 'Nama donatur harus diisi (min. 2 karakter)'),
  institution: z.string().optional(),
  committeeName: z.string().min(2, 'Pilih nama panitia dari daftar'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ProposalForm({ panitiaList }: { panitiaList: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [proposalData, setProposalData] = useState<any>(null)
  const [error, setError] = useState('')
  const [waLang, setWaLang] = useState<'id' | 'en'>('id')
  const [successToast, setSuccessToast] = useState('')

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError('')
    try {
      const res = await createProposal({
        donorName: data.donorName,
        institution: data.institution || '',
        committeeName: data.committeeName,
        message: data.message || '',
      })
      if (res.success) {
        setProposalData(res.data)
        setSuccessToast("Proposal Kemitraan berhasil dibuat!")
        setTimeout(() => setSuccessToast(""), 4000)
      } else {
        setError(res.error || 'Terjadi kesalahan saat membuat proposal')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // WhatsApp Messages
  const waMessages = {
    id: `Syalom ${proposalData?.donor_name},\n\n` +
        `Salam sejahtera dalam kasih Tuhan Yesus Kristus.\n\n` +
        `Kami sangat bersyukur atas ketulusan hati dan kepedulian yang senantiasa Bapak/Ibu tunjukkan bagi sesama. Keteladanan Bapak/Ibu senantiasa menjadi inspirasi nyata bagi kami.\n\n` +
        `Dalam rangka mewujudkan pelayanan kasih, kami dari Panitia Bakti Sosial Lintas Sinodal 2026 (Yankes GPIB & GMIM) bermaksud menyampaikan proposal permohonan donasi untuk pelayanan kesehatan gratis di Likupang, Touluaan, dan Lolah, Sulawesi Utara. Rincian program pelayanan ini dapat dilihat pada dokumen PDF terlampir.\n\n` +
        `Merupakan suatu kehormatan dan sukacita besar bagi kami apabila Bapak/Ibu berkenan untuk melangkah bersama kami, menjadi perpanjangan tangan kasih Tuhan bagi saudara-saudara kita yang membutuhkan.\n\n` +
        `Terima kasih yang mendalam atas perhatian dan kemurahan hati Bapak/Ibu. Tuhan Yesus senantiasa memberkati kesehatan, keluarga, serta segala usaha dan karya Bapak/Ibu. Amin.`,
    en: `Shalom ${proposalData?.donor_name},\n\n` +
        `Warm greetings in the love of our Lord Jesus Christ.\n\n` +
        `We are deeply grateful for the sincerity of heart and care that you have always shown to others. Your exemplary life continues to be a true inspiration for us.\n\n` +
        `In order to realize our love ministry, we, the Committee of the 2026 Cross-Synodal Social Mission (Healthcare Services by GPIB & GMIM), intend to submit a partnership donation proposal for free healthcare services in Likupang, Touluaan, and Lolah, North Sulawesi. The details of this service program can be found in the attached PDF document.\n\n` +
        `It would be a great honor and joy for us if you would walk with us as an extension of God's hand of love for our brothers and sisters in need.\n\n` +
        `Thank you very much for your attention and generosity. May the Lord Jesus always bless your health, family, and all your work and efforts. Amen.`
  };

  return (
    <div className="space-y-8 w-full max-w-3xl relative z-10">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-900/50 rounded-xl text-red-300 text-sm font-semibold">
          {error}
        </div>
      )}

      {!proposalData ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-panel border-t-4 border-t-amber-500 rounded-2xl overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="font-heading text-3xl text-slate-100 font-bold">Buat Proposal Kemitraan</CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Lengkapi formulir di bawah ini untuk meng-generate dokumen proposal digital premium.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="donorName" className="text-slate-300 font-semibold">Nama Calon Donatur</Label>
                    <Input
                      id="donorName"
                      placeholder="Contoh: Bpk. John Doe"
                      className="bg-slate-900 border-white/10 text-slate-100 focus-visible:ring-amber-500 h-12 rounded-lg text-base"
                      {...register('donorName')}
                    />
                    {errors.donorName && <p className="text-red-400 text-sm font-medium mt-1">{errors.donorName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-slate-300 font-semibold">Institusi / Perusahaan (Opsional)</Label>
                    <Input
                      id="institution"
                      placeholder="Contoh: PT. Mulia Jaya"
                      className="bg-slate-900 border-white/10 text-slate-100 focus-visible:ring-amber-500 h-12 rounded-lg text-base"
                      {...register('institution')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="committeeName" className="text-slate-300 font-semibold">Nama Panitia Pengusul (PIC)</Label>
                  <SearchableSelect
                    options={panitiaList.map((p: any) => ({ value: p.committee_name, label: p.committee_name }))}
                    value={watch('committeeName') || ''}
                    onChange={(val) => setValue('committeeName', val, { shouldValidate: true })}
                    placeholder="Ketik untuk mencari nama panitia..."
                  />
                  {errors.committeeName && <p className="text-red-400 text-sm font-medium mt-1">{errors.committeeName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-300 font-semibold">Pesan Khusus Halaman Depan (Opsional)</Label>
                  <Input
                    id="message"
                    placeholder="Contoh: 'Tuhan Yesus memberkati pelayanan kasih Bapak/Ibu.'"
                    className="bg-slate-900 border-white/10 text-slate-100 focus-visible:ring-amber-500 h-12 rounded-lg text-base"
                    {...register('message')}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-lg h-14 rounded-xl shadow-lg transition-all hover:scale-[1.01] mt-4" disabled={isSubmitting}>
                  {isSubmitting ? 'Memproses Dokumen Premium...' : 'Generate Proposal Kemitraan'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
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
                Dokumen PDF kelas premium telah selesai digenerate dalam 2 pilihan bahasa. Silakan unduh versi dokumen yang dibutuhkan di bawah ini:
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PDFDownloadLink
                    document={<ProposalPDF data={proposalData} lang="id" />}
                    fileName={`${proposalData.proposal_number}_${proposalData.donor_name.replace(/\s+/g, '_')}_ID.pdf`}
                    className="w-full"
                  >
                    {/* @ts-ignore */}
                    {({ loading }) => (
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-slate-950 font-bold text-base h-14 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02]" disabled={loading}>
                        {loading ? 'Menyiapkan Versi ID...' : 'Unduh Versi Indonesia'}
                      </Button>
                    )}
                  </PDFDownloadLink>

                  <PDFDownloadLink
                    document={<ProposalPDF data={proposalData} lang="en" />}
                    fileName={`${proposalData.proposal_number}_${proposalData.donor_name.replace(/\s+/g, '_')}_EN.pdf`}
                    className="w-full"
                  >
                    {/* @ts-ignore */}
                    {({ loading }) => (
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-bold text-base h-14 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all hover:scale-[1.02]" disabled={loading}>
                        {loading ? 'Preparing Versi EN...' : 'Download English Version'}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </div>

                <Button variant="outline" onClick={() => { setProposalData(null); setWaLang('id'); }} className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white h-14 rounded-xl font-semibold bg-transparent">
                  Buat Proposal Baru
                </Button>
              </div>
              
              <div className="bg-slate-900/60 p-5 rounded-xl border border-white/5 mt-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-amber-500 text-sm tracking-wide uppercase">Contoh Pengantar WhatsApp</h4>
                    <p className="text-[11px] text-slate-400">Pilih bahasa untuk menyesuaikan teks pengantar.</p>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/5">
                    <button
                      onClick={() => setWaLang('id')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${waLang === 'id' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      Indonesia
                    </button>
                    <button
                      onClick={() => setWaLang('en')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${waLang === 'en' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      English
                    </button>
                  </div>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waMessages[waLang])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-[1.02]">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.101-2.879-6.958C16.6 1.924 14.129.9 11.504.9 6.072.9 1.646 5.321 1.643 10.765c0 1.701.447 3.361 1.294 4.803l-.973 3.556 3.649-.957zm11.597-4.815c-.325-.163-1.926-.95-2.222-1.058-.297-.11-.513-.163-.73.163-.216.325-.838 1.058-1.027 1.275-.19.217-.379.244-.704.082-.325-.162-1.372-.507-2.614-1.613-.966-.862-1.618-1.927-1.807-2.253-.19-.325-.02-.5-.183-.661-.147-.146-.325-.379-.487-.57-.162-.19-.216-.324-.325-.541-.108-.217-.053-.407-.026-.57.027-.162.216-.515.325-.677.108-.162.162-.271.243-.459.082-.19.041-.353-.021-.515-.062-.163-.513-1.246-.704-1.708-.186-.447-.37-.387-.513-.394-.132-.007-.284-.007-.437-.007s-.403.058-.613.285c-.21.228-.802.787-.802 1.918s.82 2.222.934 2.373c.115.151 1.613 2.463 3.908 3.45.546.235.973.376 1.306.482.548.173 1.047.149 1.443.09.44-.066 1.413-.578 1.61-1.139.198-.56.198-1.042.139-1.139-.059-.098-.216-.163-.542-.326z" />
                      </svg>
                      Kirim via WhatsApp
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed font-mono bg-slate-950/40 p-4 rounded-lg border border-white/5">
                  {waMessages[waLang]}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {successToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 w-[calc(100%-2.5rem)] sm:w-auto max-w-sm z-50 bg-emerald-950/90 text-emerald-400 border border-emerald-500/20 px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold tracking-wide">{successToast}</span>
        </div>
      )}
    </div>
  )
}
