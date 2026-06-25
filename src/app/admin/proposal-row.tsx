'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, User, Calendar, MessageSquare, Edit, Trash2, Download, Eye, FileText, CheckCircle } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProposal, deleteProposal, verifyDonation } from '@/app/actions'
import dynamic from 'next/dynamic'

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)
import { ProposalPDF } from '@/components/proposal-pdf'
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
  
  // Action state
  const [isOpen, setIsOpen] = useState(false)
  const [actionType, setActionType] = useState<'edit' | 'delete' | 'verify' | null>(null)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Edit form state
  const [donorName, setDonorName] = useState(prop.donor_name)
  const [institution, setInstitution] = useState(prop.institution || '')
  const [committeeName, setCommitteeName] = useState(prop.committee_name || '')
  const [message, setMessage] = useState(prop.message || '')
  
  // Verification state
  const [verificationAmount, setVerificationAmount] = useState('')

  const hasDonation = prop.donations && prop.donations.length > 0;
  const isVerified = hasDonation && prop.donations.some((d: any) => d.verified);

  const handleOpenAction = (type: 'edit' | 'delete' | 'verify') => {
    setActionType(type)
    setPasscode('')
    setError('')
    // reset form
    setDonorName(prop.donor_name)
    setInstitution(prop.institution || '')
    setCommitteeName(prop.committee_name || '')
    setMessage(prop.message || '')
    if (type === 'verify' && hasDonation) {
      // pre-fill amount if the donation already has one
      const donation = prop.donations[0]
      setVerificationAmount(donation.amount ? donation.amount.toString() : '')
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
        const result = await updateProposal(prop.id, {
          donorName,
          institution,
          committeeName,
          message,
        }, passcode)
        if (result.success) {
          setIsOpen(false)
          router.refresh()
        } else {
          setError(result.error || 'Gagal mengupdate proposal')
        }
      } else if (actionType === 'verify' && hasDonation) {
        const amountNum = verificationAmount ? parseFloat(verificationAmount.replace(/[^0-9.-]+/g,"")) : 0;
        const result = await verifyDonation(prop.donations[0].id, amountNum, passcode)
        if (result.success) {
          setIsOpen(false)
          setDetailsOpen(false)
          router.refresh()
        } else {
          setError(result.error || 'Gagal memverifikasi donasi')
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <TableRow 
        onClick={() => setDetailsOpen(true)}
        className="hover:bg-slate-800/40 transition-colors border-b border-white/5 cursor-pointer"
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

      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px] bg-slate-950 border-white/10 text-slate-200">
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
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <PDFDownloadLink
              document={<ProposalPDF data={prop} />}
              fileName={`${prop.proposal_number}_${prop.donor_name.replace(/\s+/g, '_')}.pdf`}
            >
              {/* @ts-ignore */}
              {({ loading }) => (
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border-none" disabled={loading}>
                  <Download className="w-4 h-4 mr-2" />
                  {loading ? 'Menyiapkan Dokumen...' : 'Unduh Proposal PDF'}
                </Button>
              )}
            </PDFDownloadLink>
            
            <div className="flex gap-3 pt-2">
              {hasDonation && !isVerified && (
                <Button variant="outline" className="flex-1 text-emerald-400 border-emerald-900/50 hover:bg-emerald-900/30 hover:text-emerald-300 bg-slate-900" onClick={() => handleOpenAction('verify')}>
                  <CheckCircle className="w-4 h-4 mr-2" /> Verifikasi
                </Button>
              )}
              <Button variant="outline" className="flex-1 text-blue-400 border-blue-900/50 hover:bg-blue-900/30 hover:text-blue-300 bg-slate-900" onClick={() => handleOpenAction('edit')}>
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button variant="outline" className="flex-1 text-red-400 border-red-900/50 hover:bg-red-900/30 hover:text-red-300 bg-slate-900" onClick={() => handleOpenAction('delete')}>
                <Trash2 className="w-4 h-4 mr-2" /> Hapus
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
              {actionType === 'edit' ? 'Edit Proposal' : actionType === 'verify' ? 'Verifikasi Donasi' : 'Hapus Proposal'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {actionType === 'edit' 
                ? 'Ubah data proposal di bawah ini. Masukkan passcode otoritas untuk menyimpan.' 
                : actionType === 'verify'
                ? 'Konfirmasi nominal donasi yang ditransfer. Nominal ini akan tercatat di Dasbor.'
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
              </>
            )}
            {actionType === 'verify' && (
              <div className="space-y-2">
                <Label htmlFor="verificationAmount" className="text-slate-300">Nominal Donasi (Angka)</Label>
                <Input 
                  id="verificationAmount" 
                  value={verificationAmount} 
                  onChange={(e) => setVerificationAmount(e.target.value)} 
                  className="bg-slate-900 border-white/10 text-slate-100" 
                  placeholder="Contoh: 1500000"
                />
              </div>
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
              className={actionType === 'delete' ? 'bg-red-600 hover:bg-red-500 text-white' : actionType === 'verify' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-amber-600 hover:bg-amber-500 text-slate-900 font-bold'}
            >
              {isSubmitting ? 'Memproses...' : actionType === 'edit' ? 'Simpan Perubahan' : actionType === 'verify' ? 'Verifikasi Sekarang' : 'Hapus Permanen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
