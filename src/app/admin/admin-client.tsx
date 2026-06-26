'use client'

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, Users, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { ProposalRow } from "./proposal-row"
import { KartuSahabatManager } from "./kartu-sahabat-manager"

interface AdminDashboardClientProps {
  proposals: any[]
  kartuSahabatData: any[]
}

export function AdminDashboardClient({ proposals, kartuSahabatData }: AdminDashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllProposals, setShowAllProposals] = useState(false)
  const [showAllKartu, setShowAllKartu] = useState(false)

  // 1. Filter Proposals
  const filteredProposals = proposals.filter((prop) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true

    const propNum = (prop.proposal_number || "").toLowerCase()
    const donor = (prop.donor_name || "").toLowerCase()
    const inst = (prop.institution || "").toLowerCase()
    const comm = (prop.committee_name || "").toLowerCase()
    const msg = (prop.message || "").toLowerCase()

    return (
      propNum.includes(query) ||
      donor.includes(query) ||
      inst.includes(query) ||
      comm.includes(query) ||
      msg.includes(query)
    )
  })

  // 2. Filter Kartu Sahabat
  const filteredKartu = kartuSahabatData.filter((kartu) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true

    const comm = (kartu.committee_name || "").toLowerCase()
    return comm.includes(query)
  })

  // 3. Slice according to Limit (5 items initially)
  const displayedProposals = showAllProposals ? filteredProposals : filteredProposals.slice(0, 5)
  const displayedKartu = showAllKartu ? filteredKartu : filteredKartu.slice(0, 5)

  return (
    <div className="space-y-10">
      {/* Search Bar Card */}
      <Card className="glass-panel border-white/5 rounded-3xl overflow-hidden shadow-lg">
        <CardContent className="p-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Cari proposal atau panitia (Nama donatur, nomor proposal, institusi, PIC panitia)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-500 focus-visible:ring-amber-500 rounded-2xl w-full text-base transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white px-2.5 py-1 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-slate-400 mt-3 pl-2">
              Menampilkan hasil pencarian untuk &quot;<span className="text-amber-400 font-bold">{searchQuery}</span>&quot;: ditemukan {filteredProposals.length} proposal & {filteredKartu.length} panitia.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Proposals Section */}
      <Card className="glass-panel border-t-4 border-t-amber-500 rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-slate-900/40 border-b border-white/5 pb-6 px-6 sm:px-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl text-amber-400 font-heading tracking-wide flex items-center">
                <FileText className="w-6 h-6 mr-3 text-amber-500" />
                Proposal Terbaru
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                {searchQuery ? "Daftar proposal tersaring." : "Menampilkan proposal yang paling baru dibuat."}
              </CardDescription>
            </div>
            {filteredProposals.length > 5 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllProposals(!showAllProposals)}
                className="bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full font-semibold transition-all flex items-center gap-1.5"
              >
                {showAllProposals ? (
                  <>
                    Tampilkan Lebih Sedikit <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Tampilkan Semua ({filteredProposals.length}) <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {displayedProposals.length > 0 ? (
            <div className="overflow-x-auto hide-scrollbar">
              <Table className="w-full md:min-w-[800px]">
                <TableHeader className="hidden md:table-header-group">
                  <TableRow className="bg-slate-900/60 hover:bg-slate-900/60 border-b border-white/10">
                    <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest px-6 sm:px-10 py-6">Nomor Proposal</TableHead>
                    <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest py-6">Donatur / Institusi</TableHead>
                    <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest py-6">Tanggal Dibuat</TableHead>
                    <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest py-6">Status Donasi</TableHead>
                    <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest px-6 sm:px-10 py-6">Pesan Singkat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedProposals.map((prop: any) => (
                    <ProposalRow key={prop.id} prop={prop} />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-20 text-center flex flex-col items-center bg-slate-900/20">
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-white/5">
                <MapPin className="w-10 h-10 text-amber-500/50" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-3 font-heading">Tidak Ditemukan</h3>
              <p className="text-slate-500 max-w-md leading-relaxed font-medium">
                {searchQuery ? "Tidak ada proposal yang cocok dengan kriteria pencarian Anda." : "Daftar proposal kosong."}
              </p>
            </div>
          )}

          {/* Bottom Expand Button for Mobile/Sleek view if not expanded */}
          {!showAllProposals && filteredProposals.length > 5 && (
            <div className="p-4 border-t border-white/5 flex justify-center bg-slate-900/10">
              <Button
                variant="ghost"
                onClick={() => setShowAllProposals(true)}
                className="text-amber-400 hover:text-amber-300 font-bold text-sm w-full py-3 flex items-center justify-center gap-1.5"
              >
                Tampilkan Semua List Proposal ({filteredProposals.length} data) <ChevronDown className="w-4.5 h-4.5 animate-bounce mt-1" />
              </Button>
            </div>
          )}
          {showAllProposals && filteredProposals.length > 5 && (
            <div className="p-4 border-t border-white/5 flex justify-center bg-slate-900/10">
              <Button
                variant="ghost"
                onClick={() => setShowAllProposals(false)}
                className="text-slate-400 hover:text-slate-300 font-semibold text-sm w-full py-3 flex items-center justify-center gap-1.5"
              >
                Tampilkan Lebih Sedikit <ChevronUp className="w-4.5 h-4.5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Kartu Sahabat Section */}
      <Card className="glass-panel border-t-4 border-t-blue-500 rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-slate-900/40 border-b border-white/5 pb-6 px-6 sm:px-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl text-blue-400 font-heading tracking-wide flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-500" />
                Manajemen Kartu Sahabat
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                {searchQuery ? "Daftar Kartu Sahabat tersaring." : "Kelola data perolehan dana dari Kartu Sahabat masing-masing panitia."}
              </CardDescription>
            </div>
            {filteredKartu.length > 5 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllKartu(!showAllKartu)}
                className="bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full font-semibold transition-all flex items-center gap-1.5"
              >
                {showAllKartu ? (
                  <>
                    Tampilkan Lebih Sedikit <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Tampilkan Semua ({filteredKartu.length}) <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-10">
          <KartuSahabatManager initialData={displayedKartu} />

          {/* Bottom Expand Button for Kartu Sahabat */}
          {!showAllKartu && filteredKartu.length > 5 && (
            <div className="mt-6 pt-6 border-t border-white/5 flex justify-center">
              <Button
                variant="ghost"
                onClick={() => setShowAllKartu(true)}
                className="text-blue-400 hover:text-blue-300 font-bold text-sm w-full py-3 flex items-center justify-center gap-1.5"
              >
                Tampilkan Semua List Kartu Sahabat ({filteredKartu.length} data) <ChevronDown className="w-4.5 h-4.5 animate-bounce mt-1" />
              </Button>
            </div>
          )}
          {showAllKartu && filteredKartu.length > 5 && (
            <div className="mt-6 pt-6 border-t border-white/5 flex justify-center">
              <Button
                variant="ghost"
                onClick={() => setShowAllKartu(false)}
                className="text-slate-400 hover:text-slate-300 font-semibold text-sm w-full py-3 flex items-center justify-center gap-1.5"
              >
                Tampilkan Lebih Sedikit <ChevronUp className="w-4.5 h-4.5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
