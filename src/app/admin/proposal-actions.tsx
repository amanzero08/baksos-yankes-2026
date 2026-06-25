'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2 } from 'lucide-react'
import { updateProposal, deleteProposal } from '@/app/actions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ProposalActions({ proposal }: { proposal: any }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [actionType, setActionType] = useState<'edit' | 'delete' | null>(null)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Edit form state
  const [donorName, setDonorName] = useState(proposal.donor_name)
  const [institution, setInstitution] = useState(proposal.institution || '')
  const [committeeName, setCommitteeName] = useState(proposal.committee_name || '')
  const [message, setMessage] = useState(proposal.message || '')

  const handleOpen = (type: 'edit' | 'delete') => {
    setActionType(type)
    setPasscode('')
    setError('')
    // reset form
    setDonorName(proposal.donor_name)
    setInstitution(proposal.institution || '')
    setCommitteeName(proposal.committee_name || '')
    setMessage(proposal.message || '')
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    if (!passcode) {
      setError('Passcode wajib diisi')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      if (actionType === 'delete') {
        const result = await deleteProposal(proposal.id, passcode)
        if (result.success) {
          setIsOpen(false)
          router.refresh()
        } else {
          setError(result.error || 'Gagal menghapus proposal')
        }
      } else if (actionType === 'edit') {
        const result = await updateProposal(proposal.id, {
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
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => handleOpen('edit')} className="h-8 w-8 p-0 text-blue-600 border-blue-200 hover:bg-blue-50">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleOpen('delete')} className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{actionType === 'edit' ? 'Edit Proposal' : 'Hapus Proposal'}</DialogTitle>
            <DialogDescription>
              {actionType === 'edit' 
                ? 'Ubah data proposal di bawah ini. Masukkan passcode untuk menyimpan perubahan.' 
                : 'Tindakan ini tidak dapat dibatalkan. Masukkan passcode untuk menghapus proposal ini secara permanen.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {actionType === 'edit' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="donorName">Nama Calon Donatur</Label>
                  <Input id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institusi / Perusahaan (Opsional)</Label>
                  <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="committeeName">Nama Panitia</Label>
                  <Input id="committeeName" value={committeeName} onChange={(e) => setCommitteeName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan Khusus (Opsional)</Label>
                  <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-red-600 font-semibold">Passcode Otorisasi</Label>
              <Input 
                id="passcode" 
                type="password" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
                placeholder="Masukkan passcode"
              />
            </div>
            {error && <div className="text-sm text-red-500 font-medium">{error}</div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>Batal</Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className={actionType === 'delete' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
            >
              {isSubmitting ? 'Memproses...' : actionType === 'edit' ? 'Simpan Perubahan' : 'Hapus Permanen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
