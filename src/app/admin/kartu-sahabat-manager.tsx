'use client'

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2, Users, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { createKartuSahabat, updateKartuSahabat, deleteKartuSahabat } from "@/app/actions"

export function KartuSahabatManager({ initialData }: { initialData: any[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedKartu, setSelectedKartu] = useState<any>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletePasscode, setDeletePasscode] = useState("")
  const [deleteError, setDeleteError] = useState("")
  
  const [committeeName, setCommitteeName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [collectedAmount, setCollectedAmount] = useState("")
  const [receivedAt, setReceivedAt] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [sortField, setSortField] = useState<'committee_name' | 'collected_amount' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: 'committee_name' | 'collected_amount') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const renderSortIcon = (field: 'committee_name' | 'collected_amount') => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 ml-1.5 inline-block opacity-40 group-hover:opacity-75 transition-opacity" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 ml-1.5 inline-block text-blue-400" />
      : <ArrowDown className="w-3.5 h-3.5 ml-1.5 inline-block text-blue-400" />;
  }

  const sortedData = React.useMemo(() => {
    if (!sortField) return initialData;

    return [...initialData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle nulls / undefineds
      if (valA === null || valA === undefined) valA = sortField === 'committee_name' ? '' : 0;
      if (valB === null || valB === undefined) valB = sortField === 'committee_name' ? '' : 0;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      } else {
        // numbers
        return sortDirection === 'asc' 
          ? (valA as number) - (valB as number) 
          : (valB as number) - (valA as number);
      }
    });
  }, [initialData, sortField, sortDirection]);

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
    
    const res = await createKartuSahabat({ committeeName, cardNumber })
    if (res.success) {
      setIsAddOpen(false)
      setCommitteeName("")
      setCardNumber("")
      setPasscode("")
    } else {
      setError(res.error || "Gagal menambah kartu sahabat")
    }
    setLoading(false)
  }

  const handleOpenDetails = (kartu: any) => {
    setSelectedKartu(kartu)
    const rawVal = kartu.collected_amount?.toString() || ""
    setCollectedAmount(rawVal ? new Intl.NumberFormat("id-ID").format(Number(rawVal)) : "")
    setReceivedAt(kartu.received_at || "")
    setCardNumber(kartu.card_number || "")
    setPhotoFile(null)
    setPasscode("")
    setError("")
    setIsDetailsOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const formData = new FormData()
      formData.append("id", selectedKartu.id)
      formData.append("collectedAmount", collectedAmount)
      formData.append("receivedAt", receivedAt)
      formData.append("passcode", passcode)
      formData.append("cardNumber", cardNumber)
      if (photoFile) {
        formData.append("photo", photoFile)
      }
      
      const res = await updateKartuSahabat(formData)
      if (res.success) {
        setIsDetailsOpen(false)
        setCollectedAmount("")
        setReceivedAt("")
        setCardNumber("")
        setPhotoFile(null)
        setPasscode("")
      } else {
        setError(res.error || "Gagal mengupdate data")
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const triggerDelete = () => {
    setDeletePasscode("")
    setDeleteError("")
    setIsDeleteOpen(true)
  }

  const handleDelete = async () => {
    if (!deletePasscode) {
      setDeleteError("Passcode wajib diisi")
      return
    }
    
    setLoading(true)
    setDeleteError("")
    const res = await deleteKartuSahabat(selectedKartu.id, deletePasscode)
    if (res.success) {
      setIsDeleteOpen(false)
      setIsDetailsOpen(false)
      setDeletePasscode("")
    } else {
      setDeleteError(res.error || "Gagal menghapus kartu sahabat")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center px-2">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full" onClick={() => { setCardNumber(""); setCommitteeName(""); setError(""); setIsAddOpen(true); }}>
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
                <Input required value={committeeName} onChange={e => setCommitteeName(e.target.value)} className="bg-slate-900/50 border-white/10 text-slate-100" placeholder="Contoh: Bpk. Edward Kanter" />
              </div>
              <div className="space-y-2">
                <Label>Nomor Kartu (Format: XXX-KS-2026)</Label>
                <Input required value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="bg-slate-900/50 border-white/10 text-slate-100" placeholder="Contoh: 045 atau 045-KS-2026" />
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
              <TableHead 
                onClick={() => handleSort('committee_name')}
                className="font-bold text-blue-400 uppercase text-xs tracking-widest px-6 py-4 cursor-pointer select-none group hover:text-blue-300 transition-colors animate-none"
              >
                <span className="flex items-center">
                  Panitia
                  {renderSortIcon('committee_name')}
                </span>
              </TableHead>
              <TableHead 
                onClick={() => handleSort('collected_amount')}
                className="font-bold text-blue-400 uppercase text-xs tracking-widest py-4 text-right cursor-pointer select-none group hover:text-blue-300 transition-colors animate-none"
              >
                <span className="flex items-center justify-end">
                  Terkumpul
                  {renderSortIcon('collected_amount')}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData && sortedData.length > 0 ? (
              sortedData.map((kartu: any) => (
                <React.Fragment key={kartu.id}>
                  {/* Desktop View */}
                  <TableRow 
                    onClick={() => handleOpenDetails(kartu)}
                    className="hidden md:table-row border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <TableCell className="px-6 py-4 font-bold text-slate-200">
                      <div>{kartu.committee_name}</div>
                      {kartu.card_number && (
                        <div className="text-[10px] text-slate-500 font-bold mt-0.5 tracking-wider uppercase">No: {kartu.card_number}</div>
                      )}
                    </TableCell>
                    <TableCell className="py-4 text-emerald-400 font-bold text-right">{formatIDR(kartu.collected_amount || 0)}</TableCell>
                  </TableRow>

                  {/* Mobile Card View */}
                  <TableRow 
                    onClick={() => handleOpenDetails(kartu)}
                    className="md:hidden block border-b border-white/5 p-4 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="block w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-200 text-base">{kartu.committee_name}</span>
                        {kartu.card_number && (
                          <span className="text-[9px] text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                            {kartu.card_number}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Terkumpul</span>
                          <span className="text-emerald-400 font-bold">{formatIDR(kartu.collected_amount || 0)}</span>
                        </div>
                      </div>
                    </td>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-slate-500">Belum ada panitia yang terdaftar.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="glass-panel border-white/10 text-slate-200 sm:max-w-md max-h-[95vh] overflow-y-auto p-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="font-heading text-xl text-blue-400 flex items-center gap-2">
              <Users className="w-5 h-5" /> Detail Kartu Sahabat
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Pencapaian & pembaruan data panitia.
            </DialogDescription>
          </DialogHeader>

          {selectedKartu && (
            <div className="space-y-4 pt-2">
              {/* Info Panel */}
              <div className="bg-slate-900/40 border border-white/5 rounded-xl p-4 space-y-3">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Nama Panitia</span>
                  <span className="text-sm font-bold text-slate-200">{selectedKartu.committee_name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/5 pt-3">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Nomor Kartu</span>
                    <span className="text-xs font-bold text-amber-500 uppercase">{selectedKartu.card_number || "-"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Terkumpul</span>
                    <span className="text-base font-bold text-emerald-400">{formatIDR(selectedKartu.collected_amount || 0)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Tanggal Terima</span>
                    <span className="text-xs font-semibold text-slate-200">
                      {selectedKartu.received_at 
                        ? new Date(selectedKartu.received_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : "Belum"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Lampiran</span>
                    {selectedKartu.photo_url ? (
                      <span className="text-xs font-semibold text-blue-400">Tersedia</span>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Belum ada</span>
                    )}
                  </div>
                </div>

                {selectedKartu.photo_url && (
                  <div className="pt-2 border-t border-white/5">
                    <div className="relative group overflow-hidden rounded-lg border border-white/5 bg-slate-950/40">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${selectedKartu.photo_url}`} 
                        alt="Lampiran Kartu Sahabat" 
                        className="w-full max-h-32 object-contain transition-all duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a 
                          href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${selectedKartu.photo_url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-[10px] font-bold transition-all shadow"
                        >
                          Buka Lampiran
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Update */}
              <form onSubmit={handleEdit} className="space-y-3.5 border-t border-white/5 pt-4">
                <h4 className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">Pembaruan Data</h4>
                
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Dana Terkumpul</Label>
                  <Input 
                    required 
                    type="text" 
                    value={collectedAmount} 
                    onChange={handleCollectedAmountChange} 
                    className="bg-slate-900/50 border-white/10 text-slate-100 h-9 text-sm" 
                    placeholder="Contoh: 1.500.000" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Tanggal Terima</Label>
                    <Input 
                      type="date" 
                      value={receivedAt} 
                      onChange={e => setReceivedAt(e.target.value)} 
                      className="bg-slate-900/50 border-white/10 text-slate-100 text-xs h-9" 
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Unggah Foto Kartu</Label>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setPhotoFile(e.target.files[0])
                        }
                      }}
                      className="bg-slate-900/50 border-white/10 text-slate-300 file:bg-white/10 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 text-[10px] h-9 flex items-center" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Nomor Kartu (Format: XXX-KS-2026)</Label>
                  <Input 
                    required 
                    type="text" 
                    value={cardNumber} 
                    onChange={e => setCardNumber(e.target.value)} 
                    className="bg-slate-900/50 border-white/10 text-slate-100 h-9 text-sm" 
                    placeholder="Contoh: 045 atau 045-KS-2026" 
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Passcode Admin</Label>
                  <Input 
                    required 
                    type="password" 
                    value={passcode} 
                    onChange={e => setPasscode(e.target.value)} 
                    className="bg-slate-900/50 border-white/10 text-slate-100 h-9 text-sm" 
                  />
                </div>

                {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
                
                <div className="flex gap-2.5 pt-2">
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold h-9 text-xs"
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="border-red-500/30 hover:bg-red-500/10 hover:text-red-400 text-red-500 rounded-full font-semibold px-4 h-9 text-xs"
                    onClick={triggerDelete}
                  >
                    Hapus
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Delete Passcode Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-950 border-white/10 text-slate-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-amber-400">
              Hapus Kartu Sahabat
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Tindakan ini tidak dapat dibatalkan. Masukkan passcode otorisasi untuk menghapus permanen.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            <div className="space-y-2">
              <Label htmlFor="deletePasscode" className="text-slate-300">Passcode Otorisasi</Label>
              <Input 
                id="deletePasscode" 
                type="password" 
                value={deletePasscode} 
                onChange={(e) => setDeletePasscode(e.target.value)} 
                className="bg-slate-900 border-white/10 text-slate-100" 
              />
            </div>
            {deleteError && (
              <p className="text-red-400 text-xs font-medium">{deleteError}</p>
            )}
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsDeleteOpen(false)}
              className="text-slate-400 hover:text-slate-300 font-semibold"
            >
              Batal
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold px-4 shadow-[0_4px_20px_rgba(239,68,68,0.25)]"
            >
              {loading ? "Menghapus..." : "Hapus Permanen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
