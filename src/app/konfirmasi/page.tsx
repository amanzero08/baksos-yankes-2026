'use client'

import { useState, useRef } from 'react'
import { submitDonation } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, UploadCloud } from 'lucide-react'

export default function KonfirmasiPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    const result = await submitDonation(formData)
    
    if (result.success) {
      setIsSuccess(true)
    } else {
      setError(result.error || 'Terjadi kesalahan saat mengunggah konfirmasi')
    }
    
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <div className="container max-w-xl mx-auto py-16 px-4">
        <Card className="text-center shadow-lg border-t-4 border-t-emerald-500">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-20 w-20 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-primary-blue)]">Konfirmasi Berhasil!</h2>
            <p className="text-slate-600">
              Terima kasih atas donasi Anda. Bukti transfer telah kami terima dan akan segera diverifikasi oleh tim panitia kami.
            </p>
            <p className="text-slate-600">
              Pesan ucapan terima kasih resmi akan dikirimkan kepada Anda melalui WhatsApp setelah verifikasi selesai.
            </p>
            <div className="pt-6">
              <Button onClick={() => setIsSuccess(false)} variant="outline">
                Kembali
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card className="shadow-lg border-t-4 border-t-[var(--color-primary-blue)]">
        <CardHeader>
          <CardTitle className="text-2xl text-[var(--color-primary-blue)]">Konfirmasi Donasi</CardTitle>
          <CardDescription>
            Silakan unggah bukti transfer donasi Anda di bawah ini agar kami dapat melakukan verifikasi dan mencatat partisipasi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="donorName">Nama Donatur / Instansi <span className="text-red-500">*</span></Label>
              <Input id="donorName" name="donorName" placeholder="Sesuai dengan nama yang digunakan saat transfer" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposalNumber">Nomor Proposal (Opsional)</Label>
              <Input id="proposalNumber" name="proposalNumber" placeholder="Contoh: BAKSOS-GPIB-2026-0001" />
              <p className="text-xs text-slate-500">Jika Anda menerima proposal resmi dari panitia, masukkan nomornya di sini.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan / Pesan (Opsional)</Label>
              <Input id="notes" name="notes" placeholder="Pesan untuk panitia" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Bukti Transfer <span className="text-red-500">*</span></Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors">
                <UploadCloud className="h-10 w-10 text-slate-400 mb-2" />
                <p className="text-sm text-slate-600 mb-2">Pilih file gambar atau PDF bukti transfer</p>
                <Input 
                  id="receipt" 
                  name="receipt" 
                  type="file" 
                  accept="image/*,.pdf" 
                  className="max-w-[250px]"
                  required
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name)
                    }
                  }}
                />
              </div>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

            <Button type="submit" className="w-full bg-[var(--color-primary-blue)] hover:bg-[var(--color-primary-blue-light)] text-white h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Mengunggah Bukti Transfer...' : 'Kirim Konfirmasi'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
