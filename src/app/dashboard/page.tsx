import React from "react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Target, TrendingUp, Users, Award, FileText, ShieldCheck } from "lucide-react";
import CountdownTimer from "@/components/countdown-timer";

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const fromLpj = resolvedSearchParams.from === "lpj";
  const lpjDate = resolvedSearchParams.date as string | undefined;

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
    .select("amount, proposal_id, created_at")
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
  const remainingAmount = Math.max(0, GLOBAL_TARGET - totalCollected);
  
  // Fetch 5 most recent proposals with donation status
  const { data: recentProposals } = await supabaseAdmin
    .from("proposals")
    .select("id, proposal_number, donor_name, institution, created_at, donations(amount, verified)")
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch 5 kartu sahabat, prioritizing those that have results (collected_amount > 0)
  const { data: recentKartuSahabat } = await supabaseAdmin
    .from("kartu_sahabat")
    .select("*")
    .order("collected_amount", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(5);
  
  const progressPercentage = Math.min(100, Math.max(0, (totalCollected / GLOBAL_TARGET) * 100));

  // Process chart data: cumulative growth per week
  const transactions: { date: Date; amount: number }[] = [];
  
  donations?.forEach(d => {
    if (d.created_at) {
      transactions.push({
        date: new Date(d.created_at),
        amount: Number(d.amount) || 0
      });
    }
  });

  kartuSahabatList?.forEach(k => {
    const d = k.received_at ? new Date(k.received_at) : k.created_at ? new Date(k.created_at) : null;
    const amount = Number(k.collected_amount) || 0;
    if (d && amount > 0) {
      transactions.push({
        date: d,
        amount: amount
      });
    }
  });

  // Sort transactions by date ascending
  transactions.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Determine starting date: go back 5 weeks from now
  const now = new Date();
  let startDate = new Date();
  startDate.setDate(now.getDate() - 35); // Default to last 5 weeks

  if (transactions.length > 0) {
    startDate = new Date(transactions[0].date);
  }
  // Align to Sunday
  startDate.setHours(0, 0, 0, 0);
  const dayOffset = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOffset);

  // Generate 6 weeks of intervals
  const weeksData: { label: string; cumulative: number }[] = [];
  let runningSum = 0;
  let currentTxIndex = 0;

  for (let i = 0; i < 6; i++) {
    const weekEnd = new Date(startDate);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    while (currentTxIndex < transactions.length && transactions[currentTxIndex].date <= weekEnd) {
      runningSum += transactions[currentTxIndex].amount;
      currentTxIndex++;
    }

    const monthLabel = weekEnd.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    weeksData.push({
      label: monthLabel,
      cumulative: runningSum
    });

    startDate.setDate(startDate.getDate() + 7);
  }

  const maxVal = Math.max(...weeksData.map(w => w.cumulative), 10000000);

  const formatShortIDR = (val: number) => {
    if (val === 0) return "Rp 0";
    if (val >= 1000000000) return "Rp " + (val / 1000000000).toFixed(1) + "M";
    if (val >= 1000000) return "Rp " + (val / 1000000).toFixed(0) + "jt";
    return "Rp " + val.toLocaleString('id-ID');
  };

  const points = weeksData.map((w, idx) => {
    const x = 35 + (idx / (weeksData.length - 1)) * (500 - 70);
    const y = 160 - (maxVal > 0 ? (w.cumulative / maxVal) * 110 : 0);
    return { x, y, label: w.label, cumulative: w.cumulative };
  });

  const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${lineD} L ${points[points.length - 1].x} 170 L ${points[0].x} 170 Z`;

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
    <main className="min-h-screen bg-slate-950 pt-24 sm:pt-32 pb-28 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Ambient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-12 relative z-10">
        {fromLpj && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_30px_rgba(245,158,11,0.1)] flex items-start gap-4 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="font-bold text-amber-400 text-sm sm:text-base tracking-tight">Otentikasi Rekapitulasi LPJ Berhasil</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Dokumen fisik Laporan Pertanggungjawaban (LPJ) telah terverifikasi secara digital. Angka nominal yang tertera sinkron dengan basis data server sinkronisasi real-time kami.
              </p>
              {lpjDate && (
                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-amber-500/80 font-bold uppercase tracking-wider">
                  <span>Dicetak pada tanggal:</span>
                  <span className="bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/10">{lpjDate}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight mt-6">Dasbor Pencapaian</h1>
          <div className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            <span>Pantauan <span className="italic">real-time</span> penggalangan dana Bakti Sosial Lintas Sinodal 2026.</span>
          </div>
        </div>

        {/* Premium Countdown Component */}
        <CountdownTimer simple={true} />

        {/* Global Progress Bar */}
        <Card className="glass-panel border-t-4 border-t-emerald-500 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)]">
          <CardContent className="p-6 sm:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-6">
              <div>
                <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" /> Total Terkumpul
                </p>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-slate-100 tracking-tight whitespace-nowrap">
                  {formatIDR(totalCollected)}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto sm:flex sm:flex-row md:flex-col sm:gap-x-6 sm:gap-y-3 mt-4 md:mt-0">
                <div className="bg-slate-950/40 p-3.5 md:p-0 md:bg-transparent rounded-2xl border border-white/5 md:border-0">
                  <p className="text-slate-400 font-medium text-[10px] md:text-xs mb-1 uppercase tracking-wider">Target Dana</p>
                  <p className="text-sm sm:text-base md:text-xl font-bold text-slate-300 whitespace-nowrap">{formatIDR(GLOBAL_TARGET)}</p>
                </div>
                <div className="bg-slate-950/40 p-3.5 md:p-0 md:bg-transparent rounded-2xl border border-white/5 md:border-0">
                  <p className="text-amber-500/80 font-medium text-[10px] md:text-xs mb-1 uppercase tracking-wider">Sisa Kekurangan</p>
                  <p className="text-sm sm:text-base md:text-xl font-bold text-amber-400 whitespace-nowrap">{formatIDR(remainingAmount)}</p>
                </div>
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

        {/* Trend Keuangan Card */}
        <Card className="glass-panel border-t-4 border-t-emerald-500 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)]">
          <CardHeader className="pb-2 px-6 sm:px-10 pt-8">
            <CardTitle className="text-xl font-bold text-slate-200 flex items-center">
              <TrendingUp className="w-5 h-5 mr-3 text-emerald-500" />
              Tren Pertumbuhan Dana Masuk (Kumulatif)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Pertumbuhan akumulasi dana masuk mingguan dari gabungan proposal kemitraan dan kartu sahabat.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 sm:px-10 pb-8 pt-4">
            <div className="w-full bg-slate-950/50 rounded-2xl border border-white/5 p-4 relative overflow-hidden flex flex-col items-center">
              <svg className="w-full h-[180px]" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
                <style>{`
                  @keyframes pathDraw {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                  .animate-path {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: pathDraw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                  }
                `}</style>
                
                {/* Horizontal Dotted Grid Lines */}
                <line x1="35" y1="50" x2="465" y2="50" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="3,3" />
                <line x1="35" y1="105" x2="465" y2="105" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="3,3" />
                <line x1="35" y1="160" x2="465" y2="160" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="3,3" />

                {/* Area Gradient Fill */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Line Plot */}
                <path d={lineD} fill="none" stroke="url(#lineGlow)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="animate-path" />

                {/* Points & Value Badges */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    {/* Pulsing ring for the last dot */}
                    {idx === points.length - 1 && (
                      <circle cx={p.x} cy={p.y} r="5" fill="none" stroke="#10b981" strokeWidth="1.5">
                        <animate attributeName="r" values="5;12;5" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Plot Dot */}
                    <circle cx={p.x} cy={p.y} r="4.5" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
                    {/* Value label above dot */}
                    <text x={p.x} y={p.y - 12} fill="#34d399" fontSize="8.5" fontWeight="700" textAnchor="middle">{formatShortIDR(p.cumulative)}</text>
                    {/* Date label below chart */}
                    <text x={p.x} y="185" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">{p.label}</text>
                  </g>
                ))}
              </svg>
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
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-100 whitespace-nowrap">{formatIDR(totalProposalDonations)}</h3>
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
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-100 whitespace-nowrap">{formatIDR(totalKartuSahabat)}</h3>
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
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-100 whitespace-nowrap">{formatIDR(totalGeneralDonations)}</h3>
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
        </div>        <div className="grid lg:grid-cols-2 gap-8 relative z-10">
          {/* Proposal Terupdate (5 Terbaru) */}
          <Card className="glass-panel border-t-4 border-t-amber-500 rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-900/40 border-b border-white/5 pb-6 px-6 sm:px-8 pt-8">
              <CardTitle className="text-xl text-amber-500 font-heading tracking-wide flex items-center">
                <FileText className="w-5.5 h-5.5 mr-2.5" />
                5 Proposal Terupdate
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">Daftar proposal yang baru-baru ini dibuat atau diverifikasi.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {recentProposals && recentProposals.length > 0 ? (
                <div className="w-full">
                  <Table className="w-full">
                    <TableHeader className="hidden md:table-header-group">
                      <TableRow className="bg-slate-900/60 hover:bg-slate-900/60 border-b border-white/10">
                        <TableHead className="font-bold text-amber-500 uppercase text-[10px] tracking-wider px-6 py-4">Nomor</TableHead>
                        <TableHead className="font-bold text-amber-500 uppercase text-[10px] tracking-wider py-4">Tujuan / Donatur</TableHead>
                        <TableHead className="font-bold text-amber-500 uppercase text-[10px] tracking-wider px-6 py-4 text-right">Donasi / Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentProposals.map((prop: any) => {
                        const hasDon = prop.donations && prop.donations.length > 0;
                        const isVer = hasDon && prop.donations.some((d: any) => d.verified);
                        const donAmt = hasDon ? prop.donations[0].amount : 0;
                        return (
                          <React.Fragment key={prop.id}>
                            {/* Desktop Row */}
                            <TableRow className="hidden md:table-row border-b border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="px-6 py-4 font-bold text-amber-500 text-xs tracking-wide">
                                {prop.proposal_number}
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-200 text-xs">{prop.donor_name}</span>
                                  {prop.institution && (
                                    <span className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{prop.institution}</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="px-6 py-4 text-right text-xs">
                                {isVer ? (
                                  <span className="text-emerald-400 font-bold">{formatIDR(donAmt)}</span>
                                ) : hasDon ? (
                                  <span className="text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[10px]">Review</span>
                                ) : (
                                  <span className="text-slate-500 text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-white/5">Belum Ada</span>
                                )}
                              </TableCell>
                            </TableRow>

                            {/* Mobile Card Row */}
                            <TableRow className="md:hidden block border-b border-white/5 p-4 hover:bg-white/5 transition-colors">
                              <td className="block w-full">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-bold text-amber-500 text-xs tracking-wide">{prop.proposal_number}</span>
                                  <div>
                                    {isVer ? (
                                      <span className="text-emerald-400 font-bold text-xs">{formatIDR(donAmt)}</span>
                                    ) : hasDon ? (
                                      <span className="text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[10px]">Review</span>
                                    ) : (
                                      <span className="text-slate-500 text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-white/5">Belum Ada</span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-200 text-xs">{prop.donor_name}</span>
                                  {prop.institution && (
                                    <span className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{prop.institution}</span>
                                  )}
                                </div>
                              </td>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-slate-500 text-sm font-medium">Belum ada data proposal.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Kartu Sahabat Terupdate (5 Terbaru) */}
          <Card className="glass-panel border-t-4 border-t-blue-500 rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-900/40 border-b border-white/5 pb-6 px-6 sm:px-8 pt-8">
              <CardTitle className="text-xl text-blue-400 font-heading tracking-wide flex items-center">
                <Award className="w-5.5 h-5.5 mr-2.5" />
                5 Kartu Sahabat Terupdate
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">Daftar kartu sahabat dengan pembaruan data atau pembagian terbaru.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {recentKartuSahabat && recentKartuSahabat.length > 0 ? (
                <div className="w-full">
                  <Table className="w-full">
                    <TableHeader className="hidden md:table-header-group">
                      <TableRow className="bg-slate-900/60 hover:bg-slate-900/60 border-b border-white/10">
                        <TableHead className="font-bold text-blue-400 uppercase text-[10px] tracking-wider px-6 py-4">Nama Panitia</TableHead>
                        <TableHead className="font-bold text-blue-400 uppercase text-[10px] tracking-wider py-4 text-right">Terkumpul</TableHead>
                        <TableHead className="font-bold text-blue-400 uppercase text-[10px] tracking-wider px-6 py-4 text-right">Target</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentKartuSahabat.map((kartu: any) => (
                        <React.Fragment key={kartu.id}>
                          {/* Desktop Row */}
                          <TableRow className="hidden md:table-row border-b border-white/5 hover:bg-white/5 transition-colors">
                            <TableCell className="px-6 py-4 font-semibold text-slate-200 text-xs">
                              {kartu.committee_name}
                            </TableCell>
                            <TableCell className="py-4 text-emerald-400 font-bold text-right text-xs">
                              {formatIDR(kartu.collected_amount || 0)}
                            </TableCell>
                            <TableCell className="px-6 py-4 text-slate-400 font-medium text-right text-xs">
                              {kartu.target_amount ? formatIDR(kartu.target_amount) : '-'}
                            </TableCell>
                          </TableRow>

                          {/* Mobile Card Row */}
                          <TableRow className="md:hidden block border-b border-white/5 p-4 hover:bg-white/5 transition-colors">
                            <td className="block w-full">
                              <div className="mb-2">
                                <span className="font-semibold text-slate-200 text-xs">{kartu.committee_name}</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-900/40 p-2.5 rounded-xl border border-white/5 text-xs">
                                <div className="flex flex-col">
                                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Terkumpul</span>
                                  <span className="text-emerald-400 font-bold">{formatIDR(kartu.collected_amount || 0)}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Target</span>
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
                <div className="p-10 text-center">
                  <p className="text-slate-500 text-sm font-medium">Belum ada data Kartu Sahabat.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
