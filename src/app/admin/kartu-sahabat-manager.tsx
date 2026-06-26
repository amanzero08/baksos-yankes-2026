'use client'

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2, Users } from "lucide-react"
import { createKartuSahabat, updateKartuSahabatAmount, deleteKartuSahabat } from "@/app/actions"

export function KartuSahabatManager({ initialData }: { initialData: any[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedKartu, setSelectedKartu] = useState<any>(null)
  
  const [committeeName, setCommitteeName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [collectedAmount, setCollectedAmount] = useState("")
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "")
    const formattedValue = rawValue ? new Intl.NumberFormat("id-ID").format(Number(rawValue)) : ""
    setTargetAmount(formattedValue)
  }

  const handleCollectedAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "")
    const formattedValue = rawValue ? new Intl.NumberFormat("id-ID").format(Number(rawValue)) : ""
    setCollectedAmount(formattedValue)
  }

  const formatIDR = (amount: number) => {
    return "Rp " + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const targetNum = targetAmount ? parseFloat(targetAmount.replace(/\D/g,"")) : 0;
    
    const res = await createKartuSahabat({ committeeName, targetAmount: targetNum })
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
    
    const collectedNum = collectedAmount ? parseFloat(collectedAmount.replace(/\D/g,"")) : 0;
    
    const res = await updateKartuSahabatAmount(selectedKartu.id, collectedNum, passcode)
    if (res.success) {
      setIsDetailsOpen(false)
      setCollectedAmount("")
      setPasscode("")
    } else {
      setError(res.error || "Gagal mengupdate dana")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const code = passcode || prompt("Masukkan passcode untuk menghapus Kartu Sahabat:")
    if (!code) return
    
    setLoading(true)
    const res = await deleteKartuSahabat(id, code)
    if (res.success) {
      setIsDetailsOpen(false)
      setPasscode("")
    } else {
      alert(res.error || "Gagal menghapus kartu sahabat")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center px-2">
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
                <Input value={targetAmount} onChange={handleTargetAmountChange} className="bg-slate-900/50 border-white/10" placeholder="Contoh: 5.000.000" />
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
        <Table className="w-full md:min-w-[600px]">
          <TableHeader className="hidden md:table-header-group">
            <TableRow className="bg-slate-900/60 hover:bg-slate-900/60 border-b border-white/10">
              <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest px-6 py-4">Panitia</TableHead>
              <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest py-4 text-right">Terkumpul</TableHead>
              <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest px-6 py-4 text-right">Target</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData && initialData.length > 0 ? (
              initialData.map((kartu: any) => (
                <React.Fragment key={kartu.id}>
                  {/* Desktop View */}
                  <TableRow 
                    onClick={() => {
                      setSelectedKartu(kartu);
                      const rawVal = kartu.collected_amount?.toString() || "";
                      setCollectedAmount(rawVal ? new Intl.NumberFormat("id-ID").format(Number(rawVal)) : "");
                      setPasscode("");
                      setError("");
                      setIsDetailsOpen(true);
                    }}
                    className="hidden md:table-row border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <TableCell className="px-6 py-4 font-bold text-slate-200">{kartu.committee_name}</TableCell>
                    <TableCell className="py-4 text-emerald-400 font-bold text-right">{formatIDR(kartu.collected_amount || 0)}</TableCell>
                    <TableCell className="px-6 py-4 text-slate-400 font-medium text-right">{kartu.target_amount ? formatIDR(kartu.target_amount) : '-'}</TableCell>
                  </TableRow>

                  {/* Mobile Card View */}
                  <TableRow 
                    onClick={() => {
                      setSelectedKartu(kartu);
                      const rawVal = kartu.collected_amount?.toString() || "";
                      setCollectedAmount(rawVal ? new Intl.NumberFormat("id-ID").format(Number(rawVal)) : "");
                      setPasscode("");
                      setError("");
                      setIsDetailsOpen(true);
                    }}
                    className="md:hidden block border-b border-white/5 p-4 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="block w-full">
                      <div className="mb-2">
                        <span className="font-bold text-slate-200 text-base">{kartu.committee_name}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Terkumpul</span>
                          <span className="text-emerald-400 font-bold">{formatIDR(kartu.collected_amount || 0)}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Target</span>
                          <span className="text-slate-400 font-medium">{kartu.target_amount ? formatIDR(kartu.target_amount) : '-'}</span>
                        </div>
                      </div>
                    </td>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-slate-500">Belum ada panitia yang terdaftar.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="glass-panel border-white/10 text-slate-200 sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-blue-400 flex items-center gap-2">
              <Users className="w-6 h-6" /> Detail Kartu Sahabat
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Informasi pencapaian panitia dan panel tindakan admin.
            </DialogDescription>
          </DialogHeader>

          {selectedKartu && (
            <div className="space-y-6 pt-4">
              {/* Info Cards */}
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 space-y-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Nama Panitia</span>
                  <span className="text-base font-bold text-slate-200">{selectedKartu.committee_name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Terkumpul</span>
                    <span className="text-lg font-bold text-emerald-400">{formatIDR(selectedKartu.collected_amount || 0)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Target Pribadi</span>
                    <span className="text-lg font-bold text-slate-300">
                      {selectedKartu.target_amount ? formatIDR(selectedKartu.target_amount) : "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Update Dana */}
              <form onSubmit={handleEdit} className="space-y-4 border-t border-white/5 pt-5">
                <h4 className="text-sm font-bold text-blue-400 tracking-wide">Update Dana Terkumpul</h4>
                
                <div className="space-y-2">
                  <Label className="text-xs text-slate-400">Nominal Terkumpul (Akan Diformat Otomatis)</Label>
                  <Input 
                    required 
                    type="text" 
                    value={collectedAmount} 
                    onChange={handleCollectedAmountChange} 
                    className="bg-slate-900/50 border-white/10 text-slate-100" 
                    placeholder="Misal: 1.500.000" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-slate-400">Passcode Admin</Label>
                  <Input 
                    required 
                    type="password" 
                    value={passcode} 
                    onChange={e => setPasscode(e.target.value)} 
                    className="bg-slate-900/50 border-white/10 text-slate-100" 
                  />
                </div>

                {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold"
                  >
                    {loading ? "Mengupdate..." : "Update Dana"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="border-red-500/30 hover:bg-red-500/10 hover:text-red-400 text-red-500 rounded-full font-semibold px-4"
                    onClick={() => handleDelete(selectedKartu.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
