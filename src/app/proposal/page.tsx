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
    <div className="container max-w-3xl mx-auto py-12 px-4">
      {!proposalData ? (
        <Card className="shadow-lg border-t-4 border-t-[var(--color-primary-blue)]">
          <CardHeader>
            <CardTitle className="text-2xl text-[var(--color-primary-blue)]">Generator Proposal Donasi</CardTitle>
            <CardDescription>
              Isi form di bawah ini untuk membuat proposal resmi secara otomatis untuk calon donatur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="donorName">Nama Calon Donatur <span className="text-red-500">*</span></Label>
                <Input id="donorName" placeholder="Contoh: Bpk. Yohanes" {...register('donorName')} />
                {errors.donorName && <p className="text-sm text-red-500">{errors.donorName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institusi / Perusahaan (Opsional)</Label>
                <Input id="institution" placeholder="Contoh: PT. Maju Bersama" {...register('institution')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="committeeName">Nama Panitia (Anda) <span className="text-red-500">*</span></Label>
                <Input id="committeeName" placeholder="Nama Anda sebagai perwakilan panitia" {...register('committeeName')} />
                {errors.committeeName && <p className="text-sm text-red-500">{errors.committeeName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan Khusus (Opsional)</Label>
                <Input id="message" placeholder="Pesan pengantar khusus untuk donatur" {...register('message')} />
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

              <Button type="submit" className="w-full bg-[var(--color-primary-blue)] hover:bg-[var(--color-primary-blue-light)] text-white" disabled={isSubmitting}>
                {isSubmitting ? 'Membuat Proposal...' : 'Generate Proposal PDF'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg border-t-4 border-t-[var(--color-accent-green)]">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Proposal Berhasil Dibuat!
            </CardTitle>
            <CardDescription>
              Nomor Proposal: <strong className="text-[var(--color-primary-blue)]">{proposalData.proposal_number}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-slate-600">
              Dokumen PDF telah selesai digenerate. Silakan unduh dokumen di bawah ini dan kirimkan ke Bapak/Ibu {proposalData.donor_name}.
            </p>
            
            <div className="flex flex-col gap-4">
              {/* Note: In a real app, PDFDownloadLink renders an a tag. We wrap it nicely. */}
              <PDFDownloadLink
                document={<ProposalPDF data={proposalData} />}
                fileName={`${proposalData.proposal_number}_${proposalData.donor_name.replace(/\s+/g, '_')}.pdf`}
                className="w-full"
              >
                {/* @ts-ignore */}
                {({ loading }) => (
                  <Button className="w-full bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-light)] text-navy font-semibold h-12" disabled={loading}>
                    {loading ? 'Menyiapkan PDF...' : 'Unduh File PDF'}
                  </Button>
                )}
              </PDFDownloadLink>

              <Button variant="outline" onClick={() => setProposalData(null)} className="w-full border-slate-300">
                Buat Proposal Baru
              </Button>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mt-6">
              <h4 className="font-semibold text-sm mb-2 text-slate-700">Contoh Pengantar WhatsApp:</h4>
              <p className="text-xs text-slate-600 whitespace-pre-wrap">
                Syalom {proposalData.donor_name},{'\n'}
                Bersama pesan ini, kami dari Panitia Baksos Lintas Sinodal 2026 bermaksud menyampaikan proposal permohonan donasi. Mohon berkenan untuk meninjau dokumen PDF terlampir.{'\n\n'}
                Terima kasih atas perhatiannya. Tuhan Yesus memberkati.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
