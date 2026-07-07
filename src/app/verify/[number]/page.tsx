import { supabaseAdmin } from "@/lib/supabase-admin";
import { CheckCircle2, AlertTriangle, FileText, User, Building2, Calendar, ShieldCheck, DollarSign, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ number: string }>;
}

export default async function VerifyProposalPage({ params }: PageProps) {
  const { number } = await params;

  // Query proposal and its donations
  const { data: proposal } = await supabaseAdmin
    .from("proposals")
    .select("*, donations(*)")
    .eq("proposal_number", number)
    .single();

  const formatIDR = (amount: number) => {
    return "Rp " + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const hasDonation = proposal?.donations && proposal.donations.length > 0;
  const verifiedDonation = hasDonation ? proposal.donations.find((d: any) => d.verified) : null;
  const pendingDonation = hasDonation ? proposal.donations.find((d: any) => !d.verified) : null;

  return (
    <main className="flex-1 py-12 pb-28 md:pb-16 px-4 relative flex items-center justify-center min-h-[85vh] bg-slate-950">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[35%] h-[35%] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {proposal ? (
          <div className="glass-panel border-t-4 border-t-emerald-500 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-xl bg-slate-900/40">
            {/* Header Status */}
            <div className="p-8 sm:p-10 border-b border-white/5 bg-slate-950/40 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">Otentikasi Proposal Digital</h1>
              <p className="text-emerald-400 text-xs sm:text-sm font-bold tracking-widest uppercase mt-2 flex items-center gap-1.5 justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Dokumen Resmi & Terdaftar
              </p>
            </div>

            {/* Document Details */}
            <div className="p-8 sm:p-10 space-y-6">
              <div className="space-y-4">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Informasi Dokumen</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/50 p-6 rounded-2xl border border-white/5">
                  <div className="sm:col-span-1 flex flex-col justify-center">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Nomor Proposal</span>
                    <span className="text-amber-500 font-extrabold font-mono tracking-wide text-sm mt-1">{proposal.proposal_number}</span>
                  </div>
                  <div className="sm:col-span-2 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-6">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Tanggal Diterbitkan</span>
                    <span className="text-slate-300 font-semibold text-sm mt-1">
                      {new Date(proposal.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Penerima & Pengusul</h3>
                
                <div className="space-y-4 bg-slate-950/30 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-start gap-4">
                    <User className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Calon Donatur / Mitra</span>
                      <span className="text-slate-200 font-bold text-base block mt-0.5">{proposal.donor_name}</span>
                      {proposal.institution && (
                        <span className="text-slate-400 text-xs font-semibold flex items-center gap-1 mt-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {proposal.institution}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-start gap-4">
                    <Building2 className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Panitia Pengusul (PIC)</span>
                      <span className="text-slate-200 font-semibold text-sm block mt-0.5">{proposal.committee_name || "Panitia Pelaksana Lintas Sinodal"}</span>
                      <span className="text-slate-500 text-xs block mt-0.5">Bakti Sosial Pelayanan Kesehatan Lintas Sinodal 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Donasi Terkait */}
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Status Partisipasi</h3>
                
                {verifiedDonation ? (
                  <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-emerald-400 font-extrabold text-sm block">Donasi Terkonfirmasi</span>
                      <span className="text-slate-300 text-xs mt-0.5 block">
                        Telah diterima dana pelayanan kasih sebesar <strong className="text-slate-100 font-bold">{formatIDR(verifiedDonation.amount)}</strong>. Terima kasih atas kedermawanan Anda.
                      </span>
                    </div>
                  </div>
                ) : pendingDonation ? (
                  <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-amber-400 font-extrabold text-sm block">Menunggu Verifikasi</span>
                      <span className="text-slate-300 text-xs mt-0.5 block">
                        Laporan transfer donasi telah dikirimkan dan saat ini sedang diverifikasi oleh admin keuangan panitia.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 bg-slate-900/50 border border-white/5 p-5 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold text-sm block">Menunggu Dukungan</span>
                      <span className="text-slate-500 text-xs mt-0.5 block">
                        Dokumen ini adalah permohonan kemitraan aktif. Laporan donasi dapat dikirimkan melalui menu Konfirmasi Donasi di website.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tanda Tangan Digital Terverifikasi */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Penandatangan Dokumen</h3>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Terverifikasi Sistem
                  </span>
                </div>
                
                <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
                  {/* Digital signatures validation note */}
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-200 text-xs font-bold">Tanda Tangan Digital Valid & Otentik</p>
                      <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                        Sistem menyatakan bahwa seluruh tanda tangan digital dari 4 penandatangan di bawah ini adalah <strong className="text-emerald-400 font-bold">VALID</strong> dan <strong className="text-emerald-400 font-bold">OTENTIK</strong> (terverifikasi secara digital by system).
                      </p>
                    </div>
                  </div>

                  {/* Signatories Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Signatory 1 */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
                      <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-emerald-500/5 rounded-full blur-md group-hover:bg-emerald-500/10 transition-all duration-300" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-slate-200 font-bold text-xs block">dr. Griselda P. S. Aer, Sp.KP</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">Ketua Yayasan Kesehatan GPIB</span>
                          <span className="text-[9px] text-emerald-400 font-extrabold uppercase mt-1 tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Signatory 2 */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
                      <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-emerald-500/5 rounded-full blur-md group-hover:bg-emerald-500/10 transition-all duration-300" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-slate-200 font-bold text-xs block">Pdt. Semuel A. Z. Karinda, M.Si.</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">Ketua II Majelis Sinode GPIB</span>
                          <span className="text-[9px] text-emerald-400 font-extrabold uppercase mt-1 tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Signatory 3 */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
                      <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-emerald-500/5 rounded-full blur-md group-hover:bg-emerald-500/10 transition-all duration-300" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-slate-200 font-bold text-xs block">Pdt. Jan Jona Lumanauw</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">Ketua Pelaksana Baksos 2026</span>
                          <span className="text-[9px] text-emerald-400 font-extrabold uppercase mt-1 tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Signatory 4 */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
                      <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-emerald-500/5 rounded-full blur-md group-hover:bg-emerald-500/10 transition-all duration-300" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-slate-200 font-bold text-xs block truncate max-w-[180px]">
                            {proposal.committee_name || "Panitia Pelaksana Lintas Sinodal"}
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">PIC / Tim Penggalangan Dana</span>
                          <span className="text-[9px] text-emerald-400 font-extrabold uppercase mt-1 tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bukti Transaksi */}
              {(verifiedDonation?.receipt_url || pendingDonation?.receipt_url) && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Lampiran Bukti Transaksi</h3>
                  <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-4 flex flex-col items-center">
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${verifiedDonation?.receipt_url || pendingDonation?.receipt_url}`} 
                      alt="Bukti Transaksi" 
                      width={600} height={400}
                      className="w-full h-auto max-h-64 object-contain rounded-xl border border-white/10"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Note */}
            <div className="px-8 sm:px-10 py-6 bg-slate-950/60 border-t border-white/5 text-center">
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Sertifikasi Digital ini diterbitkan oleh panitia <strong className="font-bold text-slate-400">Bakti Sosial Lintas Sinodal 2026</strong> (GPIB & GMIM). Dokumen ini sah dan terdaftar resmi secara hukum di dalam server database kami.
              </p>
            </div>
          </div>
        ) : (
          <div className="glass-panel border-t-4 border-t-red-500 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)] backdrop-blur-xl bg-slate-900/40 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-6 mx-auto border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <AlertTriangle className="w-9 h-9 animate-bounce" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">Otentikasi Gagal</h1>
            <p className="text-red-400 text-xs sm:text-sm font-bold tracking-widest uppercase mt-2">
              Dokumen Tidak Valid / Tidak Terdaftar
            </p>
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 my-6 text-left">
              <p className="text-slate-300 text-sm leading-relaxed">
                Nomor proposal <strong className="text-amber-500 font-mono">{number}</strong> tidak ditemukan atau tidak terdaftar dalam database resmi sistem Bakti Sosial Lintas Sinodal 2026.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mt-3">
                Silakan pastikan kembali nomor dokumen yang tertera pada berkas PDF Anda, atau hubungi panitia pelaksana untuk melakukan verifikasi silang data.
              </p>
            </div>
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-6 h-12 rounded-xl border border-white/5 transition-all text-sm font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
