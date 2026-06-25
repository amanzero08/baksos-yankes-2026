import { supabaseAdmin } from "@/lib/supabase-admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building2, User, Calendar, MessageSquare } from "lucide-react";
import { ProposalActions } from "./proposal-actions";

export const revalidate = 0; // Disable cache for this page to always fetch latest

export default async function AdminDashboard() {
  // Fetch proposals
  const { data: proposals, error } = await supabaseAdmin
    .from("proposals")
    .select("*, donations(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching proposals:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-24 sm:pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-6">Daftar Proposal</h1>
          <p className="text-slate-500 mt-3 text-lg max-w-2xl">Dashboard pemantauan seluruh proposal yang telah di-generate oleh sistem dan status donasinya.</p>
        </div>

        <Card className="border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-5 px-6 sm:px-8 pt-8">
            <CardTitle className="text-xl text-slate-800">Proposal Terbaru</CardTitle>
            <CardDescription className="text-sm">Diurutkan berdasarkan proposal yang paling baru dibuat.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {proposals && proposals.length > 0 ? (
              <div className="overflow-x-auto hide-scrollbar">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow className="bg-slate-50/30 hover:bg-slate-50/30 border-b border-slate-100">
                      <TableHead className="font-bold text-slate-600 uppercase text-xs tracking-wider px-6 sm:px-8 py-5">Nomor Proposal</TableHead>
                      <TableHead className="font-bold text-slate-600 uppercase text-xs tracking-wider py-5">Donatur / Institusi</TableHead>
                      <TableHead className="font-bold text-slate-600 uppercase text-xs tracking-wider py-5">Tanggal Dibuat</TableHead>
                      <TableHead className="font-bold text-slate-600 uppercase text-xs tracking-wider py-5">Status Donasi</TableHead>
                      <TableHead className="font-bold text-slate-600 uppercase text-xs tracking-wider px-6 sm:px-8 py-5">Pesan Singkat</TableHead>
                      <TableHead className="font-bold text-slate-600 uppercase text-xs tracking-wider px-6 sm:px-8 py-5 text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposals.map((prop: any) => {
                      const hasDonation = prop.donations && prop.donations.length > 0;
                      const isVerified = hasDonation && prop.donations.some((d: any) => d.verified);
                      
                      return (
                        <TableRow key={prop.id} className="hover:bg-blue-50/50 transition-colors border-b border-slate-50">
                          <TableCell className="font-bold text-[var(--color-primary-blue)] whitespace-nowrap px-6 sm:px-8 py-4">
                            {prop.proposal_number}
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-slate-900 flex items-center gap-1.5 text-sm">
                                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                {prop.donor_name}
                              </span>
                              {prop.institution && (
                                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                                  {prop.institution}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-500 whitespace-nowrap font-medium text-sm py-4">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              {new Date(prop.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            {isVerified ? (
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none font-semibold shadow-none">Terkonfirmasi</Badge>
                            ) : hasDonation ? (
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none font-semibold shadow-none">Review</Badge>
                            ) : (
                              <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none font-semibold shadow-none">Belum Ada</Badge>
                            )}
                          </TableCell>
                          <TableCell className="max-w-[200px] px-6 sm:px-8 py-4">
                            {prop.message ? (
                              <p className="text-sm text-slate-600 truncate flex items-center gap-1.5 font-medium" title={prop.message}>
                                <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                {prop.message}
                              </p>
                            ) : (
                              <span className="text-slate-400 text-sm italic font-medium ml-5">-</span>
                            )}
                          </TableCell>
                          <TableCell className="px-6 sm:px-8 py-4 text-right">
                            <ProposalActions proposal={prop} />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-16 text-center flex flex-col items-center bg-slate-50/30">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <MapPin className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Belum Ada Proposal</h3>
                <p className="text-slate-500 max-w-sm leading-relaxed font-medium">Daftar proposal kosong. Jika Anda sudah menjalankan seed.sql, harap refresh halaman ini.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
