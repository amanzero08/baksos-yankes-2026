'use client'

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { createKartuSahabat, updateKartuSahabatAmount, deleteKartuSahabat } from "@/app/actions"

export function KartuSahabatManager({ initialData }: { initialData: any[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedKartu, setSelectedKartu] = useState<any>(null)
  
  const [committeeName, setCommitteeName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [collectedAmount, setCollectedAmount] = useState("")
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const targetNum = targetAmount ? parseFloat(targetAmount.replace(/[^0-9.-]+/g,"")) : 0;
    
    const res = await createKartuSahabat({ committeeName, targetAmount: targetNum }, passcode)
    if (res.success) {
      setIsAddOpen(false)
      setCommitteeName("")
      setTargetAmount("")
      setPasscode("")
    } else {
      setError(res.error || "Gagal menambah kartu sahabat")
    }
    setLoading(false)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const collectedNum = collectedAmount ? parseFloat(collectedAmount.replace(/[^0-9.-]+/g,"")) : 0;
    
    const res = await updateKartuSahabatAmount(selectedKartu.id, collectedNum, passcode)
    if (res.success) {
      setIsEditOpen(false)
      setCollectedAmount("")
      setPasscode("")
    } else {
      setError(res.error || "Gagal mengupdate dana")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const code = prompt("Masukkan passcode untuk menghapus Kartu Sahabat:")
    if (!code) return
    
    const res = await deleteKartuSahabat(id, code)
    if (!res.success) {
      alert(res.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="font-heading text-xl font-bold text-slate-100 tracking-wide">Daftar Kartu Sahabat</h3>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full" onClick={() => setIsAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Tambah Panitia
          </Button>
          <DialogContent className="glass-panel border-white/10 text-slate-200 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl text-blue-400">Tambah Kartu Sahabat</DialogTitle>
              <DialogDescription className="text-slate-400">
                Daftarkan panitia baru untuk dilacak capaian Kartu Sahabat-nya.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nama Panitia</Label>
                <Input required value={committeeName} onChange={e => setCommitteeName(e.target.value)} className="bg-slate-900/50 border-white/10" placeholder="Contoh: Pnt. Andreas" />
              </div>
              <div className="space-y-2">
                <Label>Target Pribadi (Opsional)</Label>
                <Input value={targetAmount} onChange={e => setTargetAmount(e.target.value)} className="bg-slate-900/50 border-white/10" placeholder="Contoh: 5000000" />
              </div>
              <div className="space-y-2">
                <Label>Passcode Admin</Label>
                <Input required type="password" value={passcode} onChange={e => setPasscode(e.target.value)} className="bg-slate-900/50 border-white/10" />
              </div>
              {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500">
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto hide-scrollbar">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-slate-900/60 hover:bg-slate-900/60 border-b border-white/10">
              <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest px-6 py-4">Panitia</TableHead>
              <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest py-4 text-right">Terkumpul</TableHead>
              <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest py-4 text-right">Target</TableHead>
              <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest px-6 py-4 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData && initialData.length > 0 ? (
              initialData.map((kartu: any) => (
                <TableRow key={kartu.id} className="border-b border-white/5 hover:bg-white/5">
                  <TableCell className="px-6 py-4 font-bold text-slate-200">{kartu.committee_name}</TableCell>
                  <TableCell className="py-4 text-emerald-400 font-bold text-right">{formatIDR(kartu.collected_amount || 0)}</TableCell>
                  <TableCell className="py-4 text-slate-400 font-medium text-right">{kartu.target_amount ? formatIDR(kartu.target_amount) : '-'}</TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent border-white/10 hover:bg-white/10 text-slate-300" onClick={() => { setSelectedKartu(kartu); setCollectedAmount(kartu.collected_amount?.toString() || ""); setIsEditOpen(true); }}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent border-red-500/20 hover:bg-red-500/20 text-red-400" onClick={() => handleDelete(kartu.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">Belum ada panitia yang terdaftar.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="glass-panel border-white/10 text-slate-200 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-emerald-400">Update Dana Terkumpul</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update nominal Kartu Sahabat untuk {selectedKartu?.committee_name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Nominal Terkumpul (Angka Saja)</Label>
              <Input required type="text" value={collectedAmount} onChange={e => setCollectedAmount(e.target.value)} className="bg-slate-900/50 border-white/10" placeholder="Misal: 1500000" />
            </div>
            <div className="space-y-2">
              <Label>Passcode Admin</Label>
              <Input required type="password" value={passcode} onChange={e => setPasscode(e.target.value)} className="bg-slate-900/50 border-white/10" />
            </div>
            {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500">
              {loading ? "Mengupdate..." : "Update Dana"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
