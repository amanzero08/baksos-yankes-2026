import React from "react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Target, TrendingUp, Users, Award, FileText } from "lucide-react";

export const revalidate = 0;

export default async function DashboardPage() {
  const GLOBAL_TARGET = 774500000;

  // Fetch proposals with donations
  const { data: proposalsList } = await supabaseAdmin
    .from("proposals")
    .select("id, donations(amount, verified)");

  // Fetch Kartu Sahabat
  const { data: kartuSahabatList } = await supabaseAdmin
    .from("kartu_sahabat")
    .select("*")
    .order("collected_amount", { ascending: false });

  // Fetch all verified donations
  const { data: donations } = await supabaseAdmin
    .from("donations")
    .select("amount, proposal_id")
    .eq("verified", true);

  // Total collected from verified donations that are linked to a proposal
  const totalProposalDonations = donations
    ?.filter(d => d.proposal_id)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

  // Total collected from Kartu Sahabat
  const totalKartuSahabat = kartuSahabatList?.reduce((sum, item) => sum + (Number(item.collected_amount) || 0), 0) || 0;

  // Standalone verified donations (donations with no proposal_id, if any)
  const totalGeneralDonations = donations
    ?.filter(d => !d.proposal_id)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

  // Total Collected overall
  const totalCollected = totalProposalDonations + totalKartuSahabat + totalGeneralDonations;
  
  const progressPercentage = Math.min(100, Math.max(0, (totalCollected / GLOBAL_TARGET) * 100));

  // Proposal counts
  const totalProposalsCount = proposalsList?.length || 0;
  const verifiedProposalIds = new Set(
    donations?.filter(d => d.proposal_id).map(d => d.proposal_id) || []
  );
  const confirmedProposalsCount = verifiedProposalIds.size;

  // Kartu Sahabat counts
  const totalKartuCount = kartuSahabatList?.length || 0;
  const confirmedKartuCount = kartuSahabatList?.filter(k => (Number(k.collected_amount) || 0) > 0).length || 0;

  // Format currency
  const formatIDR = (amount: number) => {
    return "Rp " + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Ambient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight mt-6">Dasbor Pencapaian</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">Pantauan *real-time* penggalangan dana Bakti Sosial Lintas Sinodal 2026 melalui Proposal dan Kartu Sahabat.</p>
        </div>

        {/* Global Progress Bar */}
        <Card className="glass-panel border-t-4 border-t-emerald-500 rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)]">
          <CardContent className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-6">
              <div>
                <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" /> Total Terkumpul
                </p>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-slate-100 tracking-tight">
                  {formatIDR(totalCollected)}
                </h2>
              </div>
              <div className="text-left md:text-right">
                <p className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Target Dana</p>
                <p className="text-xl md:text-2xl font-bold text-slate-300">{formatIDR(GLOBAL_TARGET)}</p>
              </div>
            </div>
            
            <div className="relative h-6 md:h-8 bg-slate-900/80 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm font-bold">
              <span className="text-slate-400">0%</span>
              <span className="text-emerald-400 text-base">{progressPercentage.toFixed(1)}% Tercapai</span>
              <span className="text-slate-400">100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className={`grid gap-6 ${totalGeneralDonations > 0 ? "lg:grid-cols-3 md:grid-cols-2" : "md:grid-cols-2"}`}>
          <Card className="glass-panel rounded-[2rem] border-t-4 border-t-amber-500 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-300 flex items-center">
                <FileText className="w-5 h-5 mr-3 text-amber-500" />
                Donasi via Proposal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Dana Masuk</span>
                <h3 className="text-4xl font-heading font-bold text-slate-100">{formatIDR(totalProposalDonations)}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1 uppercase tracking-wider">Proposal Keluar</span>
                  <span className="text-2xl font-bold text-slate-200">{totalProposalsCount}</span>
                </div>
                <div className="bg-emerald-950/20 p-3.5 rounded-2xl border border-emerald-900/20">
                  <span className="text-[10px] text-emerald-500/80 font-semibold block mb-1 uppercase tracking-wider">Terkonfirmasi</span>
                  <span className="text-2xl font-bold text-emerald-400">{confirmedProposalsCount}</span>
                </div>
              </div>

              {/* Progress/Ratio Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Rasio Konfirmasi</span>
                  <span className="text-amber-400">
                    {totalProposalsCount > 0 
                      ? `${((confirmedProposalsCount / totalProposalsCount) * 100).toFixed(1)}%` 
                      : '0%'}
                  </span>
                </div>
                <div className="h-2 bg-slate-900/80 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${totalProposalsCount > 0 ? (confirmedProposalsCount / totalProposalsCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel rounded-[2rem] border-t-4 border-t-blue-500 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-300 flex items-center">
                <Users className="w-5 h-5 mr-3 text-blue-500" />
                Kartu Sahabat Panitia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Dana Masuk</span>
                <h3 className="text-4xl font-heading font-bold text-slate-100">{formatIDR(totalKartuSahabat)}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1 uppercase tracking-wider">Kartu Keluar</span>
                  <span className="text-2xl font-bold text-slate-200">{totalKartuCount}</span>
                </div>
                <div className="bg-emerald-950/20 p-3.5 rounded-2xl border border-emerald-900/20">
                  <span className="text-[10px] text-emerald-500/80 font-semibold block mb-1 uppercase tracking-wider">Terkonfirmasi</span>
                  <span className="text-2xl font-bold text-emerald-400">{confirmedKartuCount}</span>
                </div>
              </div>

              {/* Progress/Ratio Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Rasio Partisipasi Aktif</span>
                  <span className="text-blue-400">
                    {totalKartuCount > 0 
                      ? `${((confirmedKartuCount / totalKartuCount) * 100).toFixed(1)}%` 
                      : '0%'}
                  </span>
                </div>
                <div className="h-2 bg-slate-900/80 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${totalKartuCount > 0 ? (confirmedKartuCount / totalKartuCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {totalGeneralDonations > 0 && (
            <Card className="glass-panel rounded-[2rem] border-t-4 border-t-emerald-500 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none"></div>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-300 flex items-center">
                  <Award className="w-5 h-5 mr-3 text-emerald-500" />
                  Donasi Umum (Mandiri)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Dana Masuk</span>
                  <h3 className="text-4xl font-heading font-bold text-slate-100">{formatIDR(totalGeneralDonations)}</h3>
                </div>
                
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1 uppercase tracking-wider">Donatur Umum</span>
                  <span className="text-2xl font-bold text-slate-200">
                    {donations?.filter(d => !d.proposal_id).length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Kartu Sahabat Leaderboard / List */}
        <Card className="glass-panel border-t-4 border-t-blue-500 rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-slate-900/40 border-b border-white/5 pb-6 px-6 sm:px-10 pt-8">
            <CardTitle className="text-2xl text-blue-400 font-heading tracking-wide flex items-center">
              <Award className="w-6 h-6 mr-3" />
              Pencapaian Kartu Sahabat
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">Daftar panitia beserta dana yang telah terkumpul melalui Kartu Sahabat masing-masing.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {kartuSahabatList && kartuSahabatList.length > 0 ? (
              <div className="overflow-x-auto hide-scrollbar">
                <Table className="w-full md:min-w-[600px]">
                  <TableHeader className="hidden md:table-header-group">
                    <TableRow className="bg-slate-900/60 hover:bg-slate-900/60 border-b border-white/10">
                      <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest px-6 sm:px-10 py-6">Peringkat</TableHead>
                      <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest py-6">Nama Panitia</TableHead>
                      <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest py-6 text-right">Terkumpul</TableHead>
                      <TableHead className="font-bold text-blue-400 uppercase text-xs tracking-widest px-6 sm:px-10 py-6 text-right">Target Pribadi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kartuSahabatList.map((kartu: any, idx: number) => (
                      <React.Fragment key={kartu.id}>
                        {/* Desktop View */}
                        <TableRow className="hidden md:table-row border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <TableCell className="px-6 sm:px-10 py-5 font-bold text-slate-400 group-hover:text-amber-400">
                            #{idx + 1}
                          </TableCell>
                          <TableCell className="py-5 font-bold text-slate-200">
                            {kartu.committee_name}
                          </TableCell>
                          <TableCell className="py-5 text-emerald-400 font-bold text-right text-lg">
                            {formatIDR(kartu.collected_amount || 0)}
                          </TableCell>
                          <TableCell className="px-6 sm:px-10 py-5 text-slate-400 font-medium text-right">
                            {kartu.target_amount ? formatIDR(kartu.target_amount) : '-'}
                          </TableCell>
                        </TableRow>

                        {/* Mobile Card View */}
                        <TableRow className="md:hidden block border-b border-white/5 p-5 hover:bg-white/5 transition-colors group">
                          <td className="block w-full">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-bold text-slate-200 text-lg flex items-center gap-3">
                                <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md text-sm">#{idx + 1}</span>
                                {kartu.committee_name}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-white/5">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Terkumpul</span>
                                <span className="text-emerald-400 font-bold text-lg">{formatIDR(kartu.collected_amount || 0)}</span>
                              </div>
                              <div className="flex flex-col text-right">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Target Pribadi</span>
                                <span className="text-slate-400 font-medium">{kartu.target_amount ? formatIDR(kartu.target_amount) : '-'}</span>
                              </div>
                            </div>
                          </td>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-16 text-center">
                <p className="text-slate-500 font-medium">Belum ada data Kartu Sahabat.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
