'use client'

import { useState, useRef } from 'react'
import { submitDonation } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, UploadCloud } from 'lucide-react'
import { motion } from 'framer-motion'

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

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center pt-20 px-4 pb-24">
      {/* Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        {isSuccess ? (
          <Card className="glass-panel text-center border-t-4 border-t-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] rounded-[2rem] overflow-hidden">
            <CardContent className="pt-16 pb-12 px-6 space-y-8">
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
                className="flex justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                </div>
              </motion.div>
              <div>
                <h2 className="font-heading text-4xl font-bold text-slate-100 mb-4">Konfirmasi Berhasil!</h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
                  Terima kasih atas partisipasi eksklusif Anda. Bukti transfer telah kami amankan dalam sistem dan akan segera diverifikasi oleh panitia inti.
                </p>
                <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">
                  Tanda terima donasi resmi akan dikirimkan kepada Anda melalui WhatsApp setelah proses validasi selesai.
                </p>
              </div>
              <div className="pt-6">
                <Button 
                  onClick={() => setIsSuccess(false)} 
                  variant="outline" 
                  className="bg-transparent border-white/20 text-slate-300 hover:bg-white/10 hover:text-white rounded-full px-8 h-12"
                >
                  Kirim Konfirmasi Lainnya
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass-panel shadow-[0_0_30px_rgba(0,0,0,0.3)] border-t-4 border-t-amber-500 rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-8 pt-10 px-8 sm:px-12 bg-slate-900/30 text-center">
              <CardTitle className="font-heading text-3xl sm:text-4xl text-amber-400 font-bold mb-3 tracking-tight">Konfirmasi Donasi</CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Unggah bukti transfer donasi Anda di bawah ini agar sistem kami dapat memverifikasi dan mencatat partisipasi Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-10 pb-10 px-8 sm:px-12">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="donorName" className="text-slate-300 font-semibold">Nama Donatur / Instansi <span className="text-amber-500">*</span></Label>
                  <Input 
                    id="donorName" 
                    name="donorName" 
                    placeholder="Sesuai dengan nama pengirim pada bukti transfer" 
                    required 
                    className="bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-amber-500 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="proposalNumber" className="text-slate-300 font-semibold">Nomor Proposal (Opsional)</Label>
                  <Input 
                    id="proposalNumber" 
                    name="proposalNumber" 
                    placeholder="Contoh: BAKSOS-GPIB-2026-0001" 
                    className="bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-amber-500 h-12"
                  />
                  <p className="text-xs text-slate-500 ml-1">Bagi donatur yang menerima proposal resmi sebelumnya.</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-slate-300 font-semibold">Catatan Khusus (Opsional)</Label>
                  <Input 
                    id="notes" 
                    name="notes" 
                    placeholder="Pesan, doa, atau harapan Anda" 
                    className="bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:ring-amber-500 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="receipt" className="text-slate-300 font-semibold">Unggah Bukti Transfer <span className="text-amber-500">*</span></Label>
                  <div className="border-2 border-dashed border-white/20 bg-slate-900/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors group relative overflow-hidden">
                    <UploadCloud className="h-12 w-12 text-slate-500 mb-4 group-hover:text-amber-400 transition-colors" />
                    <p className="text-sm text-slate-400 mb-4 font-medium">Klik untuk memilih file gambar (.jpg, .png) atau .pdf</p>
                    <Input 
                      id="receipt" 
                      name="receipt" 
                      type="file" 
                      accept="image/*,.pdf" 
                      className="max-w-[280px] file:bg-amber-500/20 file:text-amber-400 file:border-0 file:rounded-full file:px-4 file:mr-4 file:font-semibold text-slate-300"
                      required
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name)
                        }
                      }}
                    />
                  </div>
                </div>

                {error && <div className="p-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium text-center">{error}</div>}

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-900 font-bold text-lg h-14 rounded-full shadow-[0_0_20px_rgba(253,224,71,0.2)] transition-all hover:scale-[1.02]" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Mengamankan Dokumen...' : 'Kirim Konfirmasi'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
