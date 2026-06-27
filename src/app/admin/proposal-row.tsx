'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, User, Calendar, MessageSquare, Edit, Trash2, Download, Eye, FileText, CheckCircle } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProposal, deleteProposal, verifyDonation, recordInternalPayment } from '@/app/actions'
import dynamic from 'next/dynamic'

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)
import { ProposalPDF } from '@/components/proposal-pdf'
import { ThankYouPDF } from '@/components/thank-you-pdf'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ProposalRow({ prop }: { prop: any }) {
  const router = useRouter()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [waLang, setWaLang] = useState<'id' | 'en'>('id')
  const [certLang, setCertLang] = useState<'id' | 'en'>('id')
  
  // Action state
  const [isOpen, setIsOpen] = useState(false)
  const [actionType, setActionType] = useState<'edit' | 'delete' | 'verify' | 'record_payment' | null>(null)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Edit form state
  const [donorName, setDonorName] = useState(prop.donor_name)
  const [institution, setInstitution] = useState(prop.institution || '')
  const [committeeName, setCommitteeName] = useState(prop.committee_name || '')
  const [message, setMessage] = useState(prop.message || '')
  
  // Verification / Recording payment state
  const [verificationAmount, setVerificationAmount] = useState('')
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().substring(0, 10))
  const [receiptFile, setReceiptFile] = useState<File | null>(null)

  const handleVerificationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "")
    const formattedValue = rawValue ? new Intl.NumberFormat("id-ID").format(Number(rawValue)) : ""
    setVerificationAmount(formattedValue)
  }

  const formatIDR = (amount: number) => {
    return "Rp " + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const hasDonation = prop.donations && prop.donations.length > 0;
  const isVerified = hasDonation && prop.donations.some((d: any) => d.verified);

  const handleOpenAction = (type: 'edit' | 'delete' | 'verify' | 'record_payment') => {
    setActionType(type)
    setPasscode('')
    setError('')
    setReceiptFile(null)
    setPaymentDate(new Date().toISOString().substring(0, 10))
    // reset form
    setDonorName(prop.donor_name)
    setInstitution(prop.institution || '')
    setCommitteeName(prop.committee_name || '')
    setMessage(prop.message || '')
    if (type === 'verify' && hasDonation) {
      // pre-fill amount if the donation already has one
      const donation = prop.donations[0]
      const rawVal = donation.amount ? donation.amount.toString() : ''
      setVerificationAmount(rawVal ? new Intl.NumberFormat("id-ID").format(Number(rawVal)) : '')
    } else if (type === 'record_payment') {
      setVerificationAmount('')
    }
    setIsOpen(true)
  }

  const handleSubmitAction = async () => {
    if (!passcode) {
      setError('Passcode wajib diisi')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      if (actionType === 'delete') {
        const result = await deleteProposal(prop.id, passcode)
        if (result.success) {
          setIsOpen(false)
          setDetailsOpen(false)
          router.refresh()
        } else {
          setError(result.error || 'Gagal menghapus proposal')
        }
      } else if (actionType === 'edit') {
        const formData = new FormData()
        formData.append('id', prop.id)
        formData.append('donorName', donorName)
        formData.append('institution', institution)
        formData.append('committeeName', committeeName)
        formData.append('message', message)
        formData.append('passcode', passcode)
        if (receiptFile) {
          formData.append('receipt', receiptFile)
        }

        const result = await updateProposal(formData)
        if (result.success) {
          setIsOpen(false)
          router.refresh()
        } else {
          setError(result.error || 'Gagal mengupdate proposal')
        }
      } else if (actionType === 'verify' && hasDonation) {
        const amountNum = parseFloat(verificationAmount.replace(/\D/g,"")) || 0;
        const result = await verifyDonation(prop.donations[0].id, amountNum, passcode)
        if (result.success) {
          setIsOpen(false)
          setDetailsOpen(false)
          router.refresh()
        } else {
          setError(result.error || 'Gagal memverifikasi donasi')
        }
      } else if (actionType === 'record_payment') {
        const amountNum = parseFloat(verificationAmount.replace(/\D/g,"")) || 0;
        if (amountNum <= 0) {
          setError('Nominal donasi harus lebih dari 0')
          setIsSubmitting(false)
          return
        }

        const formData = new FormData()
        formData.append('proposalId', prop.id)
        formData.append('amount', verificationAmount)
        formData.append('paymentDate', paymentDate)
        formData.append('passcode', passcode)
        if (receiptFile) {
          formData.append('receipt', receiptFile)
        }

        const result = await recordInternalPayment(formData)
        if (result.success) {
          setIsOpen(false)
          setDetailsOpen(false)
          router.refresh()
        } else {
          setError(result.error || 'Gagal merekam pembayaran')
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const waMessages = {
    id: `Syalom ${prop.donor_name},\n\n` +
        `Salam sejahtera dalam kasih Tuhan Yesus Kristus.\n\n` +
        `Kami sangat bersyukur atas ketulusan hati dan kepedulian yang senantiasa Bapak/Ibu tunjukkan bagi sesama. Keteladanan Bapak/Ibu senantiasa menjadi inspirasi nyata bagi kami.\n\n` +
        `Dalam rangka mewujudkan pelayanan kasih, kami dari Panitia Bakti Sosial Lintas Sinodal 2026 (Yankes GPIB & GMIM) bermaksud menyampaikan proposal permohonan donasi untuk pelayanan kesehatan gratis di Likupang, Touluaan, dan Lolah, Sulawesi Utara. Rincian program pelayanan ini dapat dilihat pada dokumen PDF terlampir.\n\n` +
        `Merupakan suatu kehormatan dan sukacita besar bagi kami apabila Bapak/Ibu berkenan untuk melangkah bersama kami, menjadi perpanjangan tangan kasih Tuhan bagi saudara-saudara kita yang membutuhkan.\n\n` +
        `Terima kasih yang mendalam atas perhatian dan kemurahan hati Bapak/Ibu. Tuhan Yesus senantiasa memberkati kesehatan, keluarga, serta segala usaha dan karya Bapak/Ibu. Amin.`,
    en: `Shalom ${prop.donor_name},\n\n` +
        `Warm greetings in the love of our Lord Jesus Christ.\n\n` +
        `We are deeply grateful for the sincerity of heart and care that you have always shown to others. Your exemplary life continues to be a true inspiration for us.\n\n` +
        `In order to realize our love ministry, we, the Committee of the 2026 Cross-Synodal Social Mission (Healthcare Services by GPIB & GMIM), intend to submit a partnership donation proposal for free healthcare services in Likupang, Touluaan, and Lolah, North Sulawesi. The details of this service program can be found in the attached PDF document.\n\n` +
        `It would be a great honor and joy for us if you would walk with us as an extension of God's hand of love for our brothers and sisters in need.\n\n` +
        `Thank you very much for your attention and generosity. May the Lord Jesus always bless your health, family, and all your work and efforts. Amen.`
  };

  const donationAmount = prop.donations && prop.donations.length > 0 ? prop.donations[0].amount : 0;
  const formattedAmountID = "Rp " + Math.round(donationAmount).toLocaleString('id-ID');
  const formattedAmountEN = "Rp " + Math.round(donationAmount).toLocaleString('en-US');

  const waCertMessages = {
    id: `Syalom ${prop.donor_name},\n\n` +
        `Salam sejahtera dalam kasih Tuhan Yesus Kristus.\n\n` +
        `Dengan penuh rasa hormat dan sukacita, kami segenap Panitia Bakti Sosial Lintas Sinodal 2026 menyampaikan ucapan terima kasih yang mendalam atas donasi pelayanan kasih sebesar ${formattedAmountID} yang telah kami terima dan verifikasi.\n\n` +
        `Keberadaan dukungan Bapak/Ibu adalah bukti nyata kepedulian yang menghidupkan harapan baru bagi saudara-saudara kita yang membutuhkan layanan kesehatan di pelosok Sulawesi Utara. Kami bersyukur atas ketulusan hati Bapak/Ibu.\n\n` +
        `Sebagai bentuk apresiasi resmi dan pertanggungjawaban kami, bersama pesan ini kami lampirkan dokumen digital Sertifikat Penghargaan resmi (silakan unduh file PDF yang kami bagikan ini).\n\n` +
        `Doa kami senantiasa, kiranya Tuhan Yesus Kristus melimpahkan kesehatan, damai sejahtera, serta memberkati seluruh karya, usaha, dan keluarga Bapak/Ibu. Amin.`,
    en: `Shalom ${prop.donor_name},\n\n` +
        `Warm greetings in the love of our Lord Jesus Christ.\n\n` +
        `With deep respect and joy, the entire Committee of the 2026 Cross-Synodal Social Mission expresses our heartfelt gratitude for your generous donation of ${formattedAmountEN} which has been received and verified.\n\n` +
        `Your support is a tangible proof of care that brings new hope and healing to our brothers and sisters in need of healthcare services in remote areas of North Sulawesi. We are truly grateful for your generosity.\n\n` +
        `As a token of our official appreciation and accountability, we attach herewith the digital document of the official Certificate of Appreciation (please download the PDF file we shared).\n\n` +
        `Our prayer is always that the Lord Jesus Christ blesses your health, peace, and all your work, endeavors, and family. Amen.`
  };

  return (
    <>
      <TableRow 
        onClick={() => setDetailsOpen(true)}
        className="hidden md:table-row hover:bg-slate-800/40 transition-colors border-b border-white/5 cursor-pointer"
      >
        <TableCell className="font-bold text-amber-500 whitespace-nowrap px-6 sm:px-10 py-5">
          {prop.proposal_number}
        </TableCell>
        <TableCell className="py-5">
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-slate-200 flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-slate-500 shrink-0" />
              {prop.donor_name}
            </span>
            {prop.institution && (
              <span className="text-xs text-slate-400 flex items-center gap-2 font-medium">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                {prop.institution}
              </span>
            )}
          </div>
        </TableCell>
        <TableCell className="text-slate-400 whitespace-nowrap font-medium text-sm py-5">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
            {new Date(prop.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </TableCell>
        <TableCell className="py-5">
          {isVerified ? (
            <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 font-semibold shadow-none px-3 py-1">Terkonfirmasi</Badge>
          ) : hasDonation ? (
            <Badge className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 font-semibold shadow-none px-3 py-1">Review</Badge>
          ) : (
            <Badge className="bg-slate-800 text-slate-400 hover:bg-slate-700 border border-white/5 font-semibold shadow-none px-3 py-1">Belum Ada</Badge>
          )}
        </TableCell>
        <TableCell className="max-w-[200px] px-6 sm:px-10 py-5">
          {prop.message ? (
            <p className="text-sm text-slate-400 truncate flex items-center gap-2 font-medium" title={prop.message}>
              <MessageSquare className="w-4 h-4 text-slate-500 shrink-0" />
              {prop.message}
            </p>
          ) : (
            <span className="text-slate-600 text-sm italic font-medium ml-6">-</span>
          )}
        </TableCell>
      </TableRow>

      {/* Mobile Card View */}
      <TableRow 
        onClick={() => setDetailsOpen(true)}
        className="md:hidden block border-b border-white/5 p-5 cursor-pointer hover:bg-slate-800/40 transition-colors"
      >
        <td className="block w-full">
          <div className="flex justify-between items-start mb-3">
            <span className="font-bold text-amber-500 text-sm tracking-wide">{prop.proposal_number}</span>
            {isVerified ? (
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5">Terkonfirmasi</Badge>
            ) : hasDonation ? (
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5">Review</Badge>
            ) : (
              <Badge className="bg-slate-800 text-slate-400 border border-white/5 text-[10px] px-2 py-0.5">Belum Ada</Badge>
            )}
          </div>
          
          <div className="flex flex-col gap-1.5 mb-4">
            <span className="font-semibold text-slate-100 flex items-center gap-2 text-base">
              <User className="w-4 h-4 text-slate-400" />
              {prop.donor_name}
            </span>
            {prop.institution && (
              <span className="text-sm text-slate-400 flex items-center gap-2 font-medium">
                <Building2 className="w-4 h-4 text-slate-500" />
                {prop.institution}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(prop.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            {prop.message && (
              <span className="text-xs text-slate-400 flex items-center gap-1.5 truncate max-w-[120px]">
                <MessageSquare className="w-3.5 h-3.5" /> {prop.message}
              </span>
            )}
          </div>
        </td>
      </TableRow>

      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-slate-950 border-white/10 text-slate-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-heading text-2xl text-amber-400">
              <FileText className="w-6 h-6 text-amber-500" />
              Detail Proposal
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Informasi lengkap proposal dan aksi manajemen.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-6">
            <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
              <span className="text-sm font-semibold text-slate-500">Nomor</span>
              <span className="col-span-2 font-bold text-amber-400">{prop.proposal_number}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
              <span className="text-sm font-semibold text-slate-500">Tujuan</span>
              <span className="col-span-2 text-slate-200 font-medium">
                {prop.donor_name} {prop.institution && <span className="text-slate-400">({prop.institution})</span>}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
              <span className="text-sm font-semibold text-slate-500">PIC Panitia</span>
              <span className="col-span-2 text-slate-200 font-medium">{prop.committee_name || '-'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
              <span className="text-sm font-semibold text-slate-500">Pesan Khusus</span>
              <span className="col-span-2 text-slate-300 italic">{prop.message || '-'}</span>
            </div>
            {hasDonation && prop.donations[0].receipt_url && (
              <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                <span className="text-sm font-semibold text-slate-500">Bukti Transfer</span>
                <div className="relative group overflow-hidden rounded-lg border border-white/5 bg-slate-950/40 mt-1 max-w-[200px]">
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${prop.donations[0].receipt_url}`} 
                    alt="Bukti Transfer Donatur" 
                    className="w-full max-h-32 object-contain transition-all duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${prop.donations[0].receipt_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-[10px] font-bold transition-all shadow"
                    >
                      Buka Bukti
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {/* Opsi Unduh Versi ID / EN */}
            <div className="grid grid-cols-2 gap-3">
              <PDFDownloadLink
                document={<ProposalPDF data={prop} lang="id" />}
                fileName={`${prop.proposal_number}_${prop.donor_name.replace(/\s+/g, '_')}_ID.pdf`}
              >
                {/* @ts-ignore */}
                {({ loading }) => (
                  <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:text-white hover:bg-white/5 bg-transparent text-xs flex items-center justify-center gap-1.5 h-9 animate-fade-in" disabled={loading}>
                    <Download className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    {loading ? '...' : 'Proposal (ID)'}
                  </Button>
                )}
              </PDFDownloadLink>

              <PDFDownloadLink
                document={<ProposalPDF data={prop} lang="en" />}
                fileName={`${prop.proposal_number}_${prop.donor_name.replace(/\s+/g, '_')}_EN.pdf`}
              >
                {/* @ts-ignore */}
                {({ loading }) => (
                  <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:text-white hover:bg-white/5 bg-transparent text-xs flex items-center justify-center gap-1.5 h-9 animate-fade-in" disabled={loading}>
                    <Download className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    {loading ? '...' : 'Proposal (EN)'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>

            {!isVerified ? (
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-3 mt-1">
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[11px] text-slate-400 font-semibold">Teks Pengantar WA</span>
                    <span className="text-[9px] text-slate-500">Pilih bahasa untuk pengantar WA</span>
                  </div>
                  <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded-lg border border-white/10 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setWaLang('id'); }}
                      className={`px-2 py-0.5 text-[9px] font-bold roundedtransition-all ${waLang === 'id' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      ID
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setWaLang('en'); }}
                      className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all ${waLang === 'en' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waMessages[waLang])}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold border-none transition-all hover:scale-[1.01] h-9 text-xs flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.101-2.879-6.958C16.6 1.924 14.129.9 11.504.9 6.072.9 1.646 5.321 1.643 10.765c0 1.701.447 3.361 1.294 4.803l-.973 3.556 3.649-.957zm11.597-4.815c-.325-.163-1.926-.95-2.222-1.058-.297-.11-.513-.163-.73.163-.216.325-.838 1.058-1.027 1.275-.19.217-.379.244-.704.082-.325-.162-1.372-.507-2.614-1.613-.966-.862-1.618-1.927-1.807-2.253-.19-.325-.02-.5-.183-.661-.147-.146-.325-.379-.487-.57-.162-.19-.216-.324-.325-.541-.108-.217-.053-.407-.026-.57.027-.162.216-.515.325-.677.108-.162.162-.271.243-.459.082-.19.041-.353-.021-.515-.062-.163-.513-1.246-.704-1.708-.186-.447-.37-.387-.513-.394-.132-.007-.284-.007-.437-.007s-.403.058-.613.285c-.21.228-.802.787-.802 1.918s.82 2.222.934 2.373c.115.151 1.613 2.463 3.908 3.45.546.235.973.376 1.306.482.548.173 1.047.149 1.443.09.44-.066 1.413-.578 1.61-1.139.198-.56.198-1.042.139-1.139-.059-.098-.216-.163-.542-.326z" />
                    </svg>
                    Kirim via WA
                  </Button>
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-emerald-900/50 bg-emerald-950/20 space-y-3 mt-2 text-left">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-bold text-emerald-400 tracking-wide uppercase flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Ucapkan Terima Kasih
                  </h4>
                  <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded-lg border border-white/10 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setCertLang('id'); }}
                      className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all ${certLang === 'id' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      ID
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setCertLang('en'); }}
                      className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all ${certLang === 'en' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      EN
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {certLang === 'en'
                    ? 'Donation verified. Download the official PDF certificate of appreciation and share our warm appreciation with the donor.'
                    : 'Donasi telah diverifikasi. Unduh sertifikat penghargaan resmi PDF dan bagikan apresiasi hangat kepada donatur.'}
                </p>
                
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <PDFDownloadLink
                    document={<ThankYouPDF data={prop} lang={certLang} />}
                    fileName={`SERTIFIKAT_PENGHARGAAN_${prop.proposal_number}_${prop.donor_name.replace(/\s+/g, '_')}_${certLang.toUpperCase()}.pdf`}
                    className="w-full"
                  >
                    {/* @ts-ignore */}
                    {({ loading }) => (
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9" disabled={loading}>
                        <Download className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        {loading 
                          ? '...' 
                          : (certLang === 'en' ? 'Download PDF' : 'Unduh PDF')}
                      </Button>
                    )}
                  </PDFDownloadLink>
 
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waCertMessages[certLang])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold border-none transition-all hover:scale-[1.01] h-9 text-xs flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.101-2.879-6.958C16.6 1.924 14.129.9 11.504.9 6.072.9 1.646 5.321 1.643 10.765c0 1.701.447 3.361 1.294 4.803l-.973 3.556 3.649-.957zm11.597-4.815c-.325-.163-1.926-.95-2.222-1.058-.297-.11-.513-.163-.73.163-.216.325-.838 1.058-1.027 1.275-.19.217-.379.244-.704.082-.325-.162-1.372-.507-2.614-1.613-.966-.862-1.618-1.927-1.807-2.253-.19-.325-.02-.5-.183-.661-.147-.146-.325-.379-.487-.57-.162-.19-.216-.324-.325-.541-.108-.217-.053-.407-.026-.57.027-.162.216-.515.325-.677.108-.162.162-.271.243-.459.082-.19.041-.353-.021-.515-.062-.163-.513-1.246-.704-1.708-.186-.447-.37-.387-.513-.394-.132-.007-.284-.007-.437-.007s-.403.058-.613.285c-.21.228-.802.787-.802 1.918s.82 2.222.934 2.373c.115.151 1.613 2.463 3.908 3.45.546.235.973.376 1.306.482.548.173 1.047.149 1.443.09.44-.066 1.413-.578 1.61-1.139.198-.56.198-1.042.139-1.139-.059-.098-.216-.163-.542-.326z" />
                      </svg>
                      Kirim WA
                    </Button>
                  </a>
                </div>
 
                {/* Panduan Pengiriman */}
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-white/5 space-y-2 mt-2">
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block">
                    {certLang === 'en' ? '💡 Send Certificate Guide (For Committee)' : '💡 Panduan Kirim Sertifikat (Untuk Panitia)'}
                  </span>
                  <div className="space-y-1.5 text-[11px] text-slate-400">
                    {certLang === 'en' ? (
                      <>
                        <span className="block">1. Click the <span className="text-emerald-400 font-semibold">"Download PDF"</span> button above to download the donor's certificate.</span>
                        <span className="block">2. Click the <span className="text-[#25D366] font-semibold">"Send WA"</span> button to open WhatsApp with the automated message template.</span>
                        <span className="block">3. In the donor's WhatsApp chat, send the message and <span className="text-slate-200 font-semibold">attach the downloaded PDF</span> certificate.</span>
                      </>
                    ) : (
                      <>
                        <span className="block">1. Klik tombol <span className="text-emerald-400 font-semibold">"Unduh PDF"</span> di atas untuk mengunduh berkas sertifikat donatur.</span>
                        <span className="block">2. Klik tombol <span className="text-[#25D366] font-semibold">"Kirim WA"</span> untuk membuka WhatsApp donatur dengan teks template yang sudah disiapkan otomatis.</span>
                        <span className="block">3. Di chat WhatsApp donatur, kirimkan teks tersebut dan <span className="text-slate-200 font-semibold">lampirkan berkas PDF</span> sertifikat yang baru Anda unduh.</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            
            <div className="flex justify-end gap-2.5 pt-2">
              {!hasDonation && (
                <Button variant="outline" className="h-9 text-xs text-emerald-400 border-emerald-900/50 hover:bg-emerald-900/30 hover:text-emerald-300 bg-slate-900 font-semibold" onClick={() => handleOpenAction('record_payment')}>
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Rekam Bayar
                </Button>
              )}
              {hasDonation && !isVerified && (
                <Button variant="outline" className="h-9 text-xs text-emerald-400 border-emerald-900/50 hover:bg-emerald-900/30 hover:text-emerald-300 bg-slate-900 font-semibold" onClick={() => handleOpenAction('verify')}>
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Verifikasi
                </Button>
              )}
              <Button variant="outline" className="h-9 text-xs text-blue-400 border-blue-900/50 hover:bg-blue-900/30 hover:text-blue-300 bg-slate-900 font-semibold" onClick={() => handleOpenAction('edit')}>
                <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
              </Button>
              <Button variant="outline" className="h-9 text-xs text-red-400 border-red-900/50 hover:bg-red-900/30 hover:text-red-300 bg-slate-900 font-semibold" onClick={() => handleOpenAction('delete')}>
                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Hapus
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action (Edit/Delete) Passcode Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-950 border-white/10 text-slate-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-amber-400">
              {actionType === 'edit' 
                ? 'Edit Proposal' 
                : actionType === 'verify' 
                ? 'Verifikasi Donasi' 
                : actionType === 'record_payment'
                ? 'Rekam Pembayaran'
                : 'Hapus Proposal'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {actionType === 'edit' 
                ? 'Ubah data proposal di bawah ini. Masukkan passcode otoritas untuk menyimpan.' 
                : actionType === 'verify'
                ? 'Konfirmasi nominal donasi yang ditransfer. Nominal ini akan tercatat di Dasbor.'
                : actionType === 'record_payment'
                ? 'Rekam pembayaran donatur secara internal. Donasi akan langsung diverifikasi.'
                : 'Tindakan ini tidak dapat dibatalkan. Masukkan passcode otoritas untuk menghapus permanen.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            {actionType === 'edit' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="donorName" className="text-slate-300">Nama Calon Donatur</Label>
                  <Input id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="bg-slate-900 border-white/10 text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution" className="text-slate-300">Institusi / Perusahaan (Opsional)</Label>
                  <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} className="bg-slate-900 border-white/10 text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="committeeName" className="text-slate-300">Nama Panitia</Label>
                  <Input id="committeeName" value={committeeName} onChange={(e) => setCommitteeName(e.target.value)} className="bg-slate-900 border-white/10 text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-300">Pesan Khusus (Opsional)</Label>
                  <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="bg-slate-900 border-white/10 text-slate-100" />
                </div>
                {/* Existing Transfer Proof */}
                {hasDonation && prop.donations[0].receipt_url && (
                  <div className="space-y-2 border border-white/5 bg-slate-900/40 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-xs font-semibold text-slate-400 block self-start">Bukti Transfer Saat Ini</span>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${prop.donations[0].receipt_url}`} 
                      alt="Bukti Transfer Saat Ini" 
                      className="w-full max-h-32 object-contain rounded-lg border border-white/10"
                    />
                  </div>
                )}
                {/* Ganti Transfer Proof */}
                <div className="space-y-2">
                  <Label htmlFor="editReceiptFile" className="text-slate-300 font-semibold">
                    {hasDonation && prop.donations[0].receipt_url ? 'Ganti Bukti Transfer (Opsional)' : 'Unggah Bukti Transfer (Opsional)'}
                  </Label>
                  <Input 
                    id="editReceiptFile" 
                    type="file" 
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setReceiptFile(e.target.files[0])
                      }
                    }} 
                    className="bg-slate-900 border-white/10 text-slate-300 file:bg-white/10 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 text-xs h-9 flex items-center" 
                  />
                </div>
                {receiptFile && receiptFile.type.startsWith('image/') && (
                  <div className="space-y-2 border border-white/5 bg-slate-900/40 p-3 rounded-xl flex flex-col items-center animate-fade-in">
                    <span className="text-xs font-semibold text-slate-400 block self-start">Preview Bukti Baru</span>
                    <img 
                      src={URL.createObjectURL(receiptFile)} 
                      alt="Preview Bukti Baru" 
                      className="w-full max-h-32 object-contain rounded-lg border border-white/10"
                    />
                  </div>
                )}
              </>
            )}
            {(actionType === 'verify' || actionType === 'record_payment') && (
              <div className="space-y-2">
                <Label htmlFor="verificationAmount" className="text-slate-300">Nominal Donasi (Angka)</Label>
                <Input 
                  id="verificationAmount" 
                  value={verificationAmount} 
                  onChange={handleVerificationAmountChange} 
                  className="bg-slate-900 border-white/10 text-slate-100" 
                  placeholder="Contoh: 1.500.000"
                />
              </div>
            )}
            {actionType === 'verify' && hasDonation && prop.donations[0].receipt_url && (
              <div className="space-y-2 border border-white/5 bg-slate-900/40 p-3 rounded-xl flex flex-col items-center animate-fade-in">
                <span className="text-xs font-semibold text-slate-400 block self-start">Bukti Transfer Donatur</span>
                <img 
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${prop.donations[0].receipt_url}`} 
                  alt="Bukti Transfer Donatur" 
                  className="w-full max-h-48 object-contain rounded-lg border border-white/10"
                />
              </div>
            )}
            {actionType === 'record_payment' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="paymentDate" className="text-slate-300">Tanggal Bayar / Transfer</Label>
                  <Input 
                    id="paymentDate" 
                    type="date"
                    value={paymentDate} 
                    onChange={(e) => setPaymentDate(e.target.value)} 
                    className="bg-slate-900 border-white/10 text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiptFile" className="text-slate-300 font-semibold">Bukti Transfer (Opsional)</Label>
                  <Input 
                    id="receiptFile" 
                    type="file" 
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setReceiptFile(e.target.files[0])
                      }
                    }} 
                    className="bg-slate-900 border-white/10 text-slate-300 file:bg-white/10 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3" 
                  />
                </div>
                {receiptFile && receiptFile.type.startsWith('image/') && (
                  <div className="space-y-2 border border-white/5 bg-slate-900/40 p-3 rounded-xl flex flex-col items-center animate-fade-in">
                    <span className="text-xs font-semibold text-slate-400 block self-start">Preview Bukti Baru</span>
                    <img 
                      src={URL.createObjectURL(receiptFile)} 
                      alt="Preview Bukti Baru" 
                      className="w-full max-h-48 object-contain rounded-lg border border-white/10"
                    />
                  </div>
                )}
              </>
            )}
            <div className="space-y-2 mt-2">
              <Label htmlFor="passcode" className="text-red-400 font-semibold tracking-wide">Passcode Otorisasi</Label>
              <Input 
                id="passcode" 
                type="password" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
                placeholder="Masukkan passcode"
                className="bg-slate-900 border-red-900/50 focus-visible:ring-red-500 text-slate-100"
              />
            </div>
            {error && <div className="text-sm text-red-400 font-medium p-3 bg-red-900/20 rounded-md border border-red-900/50">{error}</div>}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting} className="border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white">Batal</Button>
            <Button 
              onClick={handleSubmitAction} 
              disabled={isSubmitting}
              className={actionType === 'delete' ? 'bg-red-600 hover:bg-red-500 text-white' : (actionType === 'verify' || actionType === 'record_payment') ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-amber-600 hover:bg-amber-500 text-slate-900 font-bold'}
            >
              {isSubmitting 
                ? 'Memproses...' 
                : actionType === 'edit' 
                ? 'Simpan Perubahan' 
                : actionType === 'verify' 
                ? 'Verifikasi Sekarang' 
                : actionType === 'record_payment'
                ? 'Rekam & Verifikasi'
                : 'Hapus Permanen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
