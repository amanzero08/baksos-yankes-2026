import { supabaseAdmin } from "@/lib/supabase-admin";
import { Award, AlertTriangle, User, Building2, Calendar, ShieldCheck, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ number: string }>;
}

export default async function VerifyCertificatePage({ params }: PageProps) {
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

  return (
    <main className="flex-1 py-12 pb-28 md:pb-16 px-4 relative flex items-center justify-center min-h-[85vh] bg-slate-950">
      {/* Background Orbs with gold and emerald hues */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[15%] w-[35%] h-[35%] bg-amber-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[20%] left-[15%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {proposal && verifiedDonation ? (
          <div className="glass-panel border-t-4 border-t-amber-500 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-xl bg-slate-900/40">
            {/* Header Status - Golden Theme */}
            <div className="p-8 sm:p-10 border-b border-white/5 bg-slate-950/40 text-center flex flex-col items-center relative">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-bold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                Aktif & Sah
              </div>
              
              <div className="w-20 h-20 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mb-4 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.25)] relative">
                <Award className="w-11 h-11" />
                <div className="absolute inset-0 rounded-full border border-amber-400/20 scale-110 animate-ping duration-[3000ms]"></div>
              </div>
              
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">Otentikasi Sertifikat Digital</h1>
              <p className="text-amber-500 text-xs sm:text-sm font-bold tracking-widest uppercase mt-2 flex items-center gap-1.5 justify-center">
                <Heart className="w-4 h-4 fill-amber-500/20 text-amber-500" />
                Apresiasi Pelayanan Kasih
              </p>
            </div>

            {/* Certificate Details */}
            <div className="p-8 sm:p-10 space-y-6">
              <div className="space-y-4">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Identitas Sertifikat</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/50 p-6 rounded-2xl border border-white/5">
                  <div className="sm:col-span-1 flex flex-col justify-center">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">No. Sertifikat</span>
                    <span className="text-amber-500 font-extrabold font-mono tracking-wide text-xs mt-1">CERT-TY-{proposal.proposal_number}</span>
                  </div>
                  <div className="sm:col-span-2 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-6">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Tanggal Terbit</span>
                    <span className="text-slate-300 font-semibold text-sm mt-1">
                      {new Date(verifiedDonation.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recipient details */}
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Diberikan Kepada (Donatur)</h3>
                
                <div className="space-y-4 bg-slate-950/30 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-start gap-4">
                    <User className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-200 font-extrabold text-lg block leading-snug">{proposal.donor_name}</span>
                      {proposal.institution && (
                        <span className="text-slate-400 text-sm font-semibold flex items-center gap-1.5 mt-1.5">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          {proposal.institution}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Amount */}
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Kontribusi Dana Pelayanan</h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Nilai Donasi Terverifikasi</span>
                    <span className="text-3xl font-extrabold text-emerald-400 tracking-tight block mt-1">{formatIDR(verifiedDonation.amount)}</span>
                  </div>
                  <div className="text-slate-400 text-xs sm:max-w-[280px] leading-relaxed border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-6">
                    Dana ini telah terakumulasi dalam pencapaian program Bakti Sosial Lintas Sinodal 2026.
                  </div>
                </div>
              </div>

              {/* PIC Info */}
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">PIC Pendamping Dana</h3>
                <div className="bg-slate-950/30 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-200 font-bold text-sm block">{proposal.committee_name || "Panitia Pelaksana"}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5 block">Yayasan Kesehatan GPIB</span>
                  </div>
                  <span className="text-slate-500 text-xs italic">Otoritas Valid</span>
                </div>
              </div>
            </div>

            {/* Gratitude Message */}
            <div className="px-8 sm:px-10 py-6 bg-amber-500/5 border-t border-white/5 text-center">
              <p className="text-xs text-amber-400/90 font-medium leading-relaxed italic">
                &quot;Sebagai ungkapan penghargaan yang mendalam atas partisipasi kemanusiaan pelayanan kesehatan gratis bagi masyarakat Touluaan, Likupang, dan Lolah, Sulawesi Utara. Dukungan Anda telah menghadirkan pemulihan dan harapan baru.&quot;
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
              Sertifikat Belum Aktif / Tidak Valid
            </p>
            
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 my-6 text-left space-y-3">
              <p className="text-slate-300 text-sm leading-relaxed">
                Sertifikat dengan nomor proposal <strong className="text-amber-500 font-mono">{number}</strong> tidak valid atau tidak memiliki donasi yang terverifikasi.
              </p>
              {proposal && !verifiedDonation && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-400 text-xs leading-relaxed">
                  <strong>Status Proposal Ditemukan:</strong> Laporan donasi untuk proposal ini telah terdaftar, namun belum diverifikasi secara keuangan oleh panitia pelaksana. Sertifikat akan terbit otomatis setelah verifikasi selesai.
                </div>
              )}
              <p className="text-slate-400 text-xs leading-relaxed">
                Silakan pastikan bahwa data transfer donasi telah dikirimkan dan diverifikasi, atau hubungi panitia pendamping Anda.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/konfirmasi" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 h-12 rounded-xl transition-all text-sm font-bold w-full sm:w-auto shadow-lg shadow-amber-500/15">
                Konfirmasi Donasi
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-6 h-12 rounded-xl border border-white/5 transition-all text-sm font-semibold w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
