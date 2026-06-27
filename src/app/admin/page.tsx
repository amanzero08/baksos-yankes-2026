import { supabaseAdmin } from "@/lib/supabase-admin";
import { AdminDashboardClient } from "./admin-client";

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
    .select("*, kartu_sahabat_payments(*)")
    .order("collected_amount", { ascending: false })
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
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight mt-6">Daftar Proposal & Kartu Sahabat</h1>
          <p className="text-slate-400 mt-3 text-lg max-w-2xl">Dashboard eksklusif pemantauan seluruh proposal dan perolehan kartu sahabat panitia.</p>
        </div>

        <AdminDashboardClient
          proposals={proposals || []}
          kartuSahabatData={kartuSahabatData || []}
        />
      </div>
    </main>
  );
}
