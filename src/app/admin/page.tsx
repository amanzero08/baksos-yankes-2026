import { supabaseAdmin } from "@/lib/supabase-admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { ProposalRow } from "./proposal-row";
import { KartuSahabatManager } from "./kartu-sahabat-manager";

export const revalidate = 0; // Disable cache for this page to always fetch latest

export default async function AdminDashboard() {
  // Fetch proposals
  const { data: proposals, error } = await supabaseAdmin
    .from("proposals")
    .select("*, donations(*)")
    .order("created_at", { ascending: false });

  // Fetch Kartu Sahabat
  const { data: kartuSahabatData } = await supabaseAdmin
    .from("kartu_sahabat")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching proposals:", error);
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 sm:pt-32 pb-24 sm:pb-12 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Ambient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight mt-6">Daftar Proposal</h1>
          <p className="text-slate-400 mt-3 text-lg max-w-2xl">Dashboard eksklusif pemantauan seluruh proposal yang telah di-generate oleh sistem dan status konfirmasi donasinya.</p>
        </div>

        <Card className="glass-panel border-t-4 border-t-amber-500 rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-slate-900/40 border-b border-white/5 pb-6 px-6 sm:px-10 pt-8">
            <CardTitle className="text-2xl text-amber-400 font-heading tracking-wide">Proposal Terbaru</CardTitle>
            <CardDescription className="text-slate-400 mt-1">Diurutkan berdasarkan proposal yang paling baru dibuat.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {proposals && proposals.length > 0 ? (
              <div className="overflow-x-auto hide-scrollbar">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow className="bg-slate-900/60 hover:bg-slate-900/60 border-b border-white/10">
                      <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest px-6 sm:px-10 py-6">Nomor Proposal</TableHead>
                      <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest py-6">Donatur / Institusi</TableHead>
                      <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest py-6">Tanggal Dibuat</TableHead>
                      <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest py-6">Status Donasi</TableHead>
                      <TableHead className="font-bold text-amber-500 uppercase text-xs tracking-widest px-6 sm:px-10 py-6">Pesan Singkat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposals.map((prop: any) => (
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
                <h3 className="text-2xl font-bold text-slate-300 mb-3 font-heading">Belum Ada Proposal</h3>
                <p className="text-slate-500 max-w-md leading-relaxed font-medium">Daftar proposal kosong. Silakan generate proposal baru untuk melihatnya muncul di sini.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel border-t-4 border-t-blue-500 rounded-[2rem] overflow-hidden mt-10">
          <CardHeader className="bg-slate-900/40 border-b border-white/5 pb-6 px-6 sm:px-10 pt-8">
            <CardTitle className="text-2xl text-blue-400 font-heading tracking-wide">Manajemen Kartu Sahabat</CardTitle>
            <CardDescription className="text-slate-400 mt-1">Kelola data perolehan dana dari Kartu Sahabat masing-masing panitia.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-10">
            <KartuSahabatManager initialData={kartuSahabatData || []} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
