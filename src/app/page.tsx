'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, HeartPulse, ArrowRight, CheckCircle2, Sparkles, Clock, Stethoscope, Droplet, Eye, Scissors, Activity } from "lucide-react";
import { motion, Variants } from "framer-motion";
import CountdownTimer from "@/components/countdown-timer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = +new Date("2026-09-14T00:00:00+07:00") - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30 selection:text-amber-200 pb-24 sm:pb-0 overflow-hidden relative">
      
      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-20 sm:pt-32 pb-32 flex flex-col items-center justify-center min-h-[90vh]">
        <motion.div 
          initial="hidden" animate="visible" variants={stagger}
          className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center mt-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-amber-200 mb-8 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
            <span className="tracking-wide">Pelayanan Kasih 14 - 18 September 2026</span>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <h1 className="font-heading text-5xl md:text-8xl font-extrabold tracking-tight mb-6 text-slate-100 leading-[1.1] drop-shadow-2xl">
              Kesehatan untuk Semua, <br className="hidden md:block" />
              <span className="gold-gradient-text text-glow">Dimanapun Berada.</span>
            </h1>
          </motion.div>
          
          <motion.p variants={fadeUp} className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Yayasan Kesehatan GPIB dan GMIM bersinergi menghadirkan akses layanan medis premium ke pelosok Sulawesi Utara melalui Bakti Sosial Lintas Sinodal 2026.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
            <Link href="/proposal" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-900 font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_30px_rgba(253,224,71,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(253,224,71,0.5)] border border-yellow-300/50">
                Mulai Donasi
              </Button>
            </Link>
            <Link href="#lokasi" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-slate-200 hover:bg-white/10 hover:text-white px-10 py-7 rounded-full transition-all hover:scale-105 font-semibold backdrop-blur-md">
                Lihat Lokasi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Premium Countdown Component */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="w-full max-w-5xl px-4 mx-auto z-10 mt-16"
        >
          <CountdownTimer />
        </motion.div>

        {/* Trusted By / Logos */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="mt-20 w-full max-w-5xl mx-auto px-4 z-10"
        >
          <p className="text-center text-xs font-bold text-slate-500 mb-14 uppercase tracking-[0.3em]">Diselenggarakan Bersama Oleh</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
            {/* GPIB */}
            <div className="flex flex-col items-center group">
              <div className="h-40 md:h-48 w-full mb-8 flex items-center justify-center p-2 rounded-[2rem] glass-panel transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:-translate-y-2 group-hover:bg-slate-800/50">
                <img src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gpib.png" alt="GPIB" className="h-28 md:h-36 w-auto object-contain transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </div>
              <h4 className="font-heading font-bold text-2xl text-slate-100 mb-3 tracking-tight">GPIB</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Membangun jemaat misioner pembawa damai sejahtera bagi seluruh lapisan masyarakat di wilayah pelayanannya.
              </p>
            </div>

            {/* Yankes GPIB */}
            <div className="flex flex-col items-center group">
              <div className="h-40 md:h-48 w-full mb-8 flex items-center justify-center p-2 rounded-[2rem] glass-panel transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:-translate-y-2 group-hover:bg-slate-800/50">
                <img src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" alt="Yayasan Kesehatan GPIB" className="h-28 md:h-36 w-auto object-contain transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </div>
              <h4 className="font-heading font-bold text-2xl text-slate-100 mb-3 tracking-tight">Yayasan Kesehatan GPIB</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Perpanjangan tangan gereja yang berkomitmen penuh dalam menghadirkan layanan medis inklusif, berkualitas, dan profesional.
              </p>
            </div>

            {/* GMIM */}
            <div className="flex flex-col items-center group">
              <div className="h-40 md:h-48 w-full mb-8 flex items-center justify-center p-2 rounded-[2rem] glass-panel transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:-translate-y-2 group-hover:bg-slate-800/50">
                <img src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gmim.png" alt="GMIM" className="h-24 md:h-32 w-auto object-contain transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </div>
              <h4 className="font-heading font-bold text-2xl text-slate-100 mb-3 tracking-tight">GMIM</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Gereja yang global, mandiri, dan misioner dalam melayani masyarakat secara menyeluruh di tanah Minahasa.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 relative z-20 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900/50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-100 mb-6 tracking-tight">Pelayanan Tanpa Batas</h2>
            <p className="text-slate-400 text-lg leading-relaxed">Membangun masyarakat yang sehat dan kuat melalui pendekatan medis yang komprehensif, eksklusif, dan transparan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="glass-panel rounded-[2rem] p-10 hover:bg-slate-800/60 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 rounded-2xl bg-blue-900/40 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-500">
                <HeartPulse className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-100 mb-4">Medis Menyeluruh</h3>
              <p className="text-slate-400 leading-relaxed font-medium">Pengobatan gratis, pemeriksaan umum, dan penyuluhan gizi bagi masyarakat di daerah terpencil dengan fasilitas setara klinik premium.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ delay: 0.1 }} className="glass-panel rounded-[2rem] p-10 hover:bg-slate-800/60 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 rounded-2xl bg-amber-900/40 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-100 mb-4">Transparansi Mutlak</h3>
              <p className="text-slate-400 leading-relaxed font-medium">Setiap donasi dicatat secara digital. Proposal dan bukti konfirmasi dapat diverifikasi secara <span className="italic">real-time</span> melalui dasbor terenkripsi.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ delay: 0.2 }} className="glass-panel rounded-[2rem] p-10 hover:bg-slate-800/60 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-500">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-100 mb-4">Tepat Sasaran</h3>
              <p className="text-slate-400 leading-relaxed font-medium">Dilaksanakan pada 14-18 September 2026, bertepatan dengan momentum sinodal strategis untuk dampak yang maksimal.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Jenis Pelayanan Section */}
      <section className="py-32 relative z-20 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp} 
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Bentuk Kegiatan</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-100 mb-6 tracking-tight">Jenis Pelayanan Medis</h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              Pelayanan kesehatan cuma-cuma yang disiapkan untuk membantu meningkatkan derajat kesehatan masyarakat di lokasi pelayanan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pemeriksaan & Pengobatan Umum",
                desc: "Layanan konsultasi dokter, pemeriksaan fisik, diagnosis keluhan penyakit umum, serta pemberian obat-obatan dasar gratis sesuai indikasi medis.",
                icon: Stethoscope,
                color: "from-blue-500/10 to-blue-500/5 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
              },
              {
                title: "Pengobatan Gigi",
                desc: "Tindakan pemeriksaan kesehatan mulut dasar, penambalan berlubang, pembersihan karang gigi (scaling), dan pencabutan gigi.",
                icon: Activity,
                color: "from-amber-500/10 to-amber-500/5 text-amber-400 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
              },
              {
                title: "Bedah Minor",
                desc: "Tindakan bedah skala kecil gratis untuk mengatasi kista epitel, lipoma, clavus (mata ikan), abses luar, atau penjahitan luka dengan bius lokal.",
                icon: Scissors,
                color: "from-red-500/10 to-red-500/5 text-red-400 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]",
              },
              {
                title: "Pemeriksaan Darah",
                desc: "Skrining kesehatan berkala melalui pemeriksaan parameter darah krusial, meliputi kadar Gula Darah, Asam Urat, serta Kolesterol.",
                icon: Droplet,
                color: "from-rose-500/10 to-rose-500/5 text-rose-400 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]",
              },
              {
                title: "Pemberian Kacamata Baca",
                desc: "Pengujian visus/ketajaman penglihatan sederhana dan pemberian kacamata baca secara gratis guna menunjang produktivitas harian warga lansia.",
                icon: Eye,
                color: "from-emerald-500/10 to-emerald-500/5 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
              },
              {
                title: "Sunatan massal",
                desc: "Bakti sosial khitanan massal gratis bagi anak-anak usia sekolah, dilaksanakan secara higienis dan terstandar khusus di wilayah Likupang.",
                icon: Sparkles,
                color: "from-indigo-500/10 to-indigo-500/5 text-indigo-400 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]",
              },
            ].map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <motion.div 
                  key={idx}
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={fadeUp} 
                  transition={{ delay: idx * 0.05 }}
                  className={`glass-panel bg-gradient-to-br ${srv.color} rounded-[2rem] p-8 border hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div className="h-14 w-14 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-500">
                    <IconComp className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-100 mb-4">{srv.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-medium">{srv.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Peta Lokasi */}
      <section id="lokasi" className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Jangkauan Geografis</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-100 mb-6 tracking-tight">3 Titik Pelayanan</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">Menjangkau yang tak terjangkau. Fokus pelayanan terbagi di tiga wilayah utama Sulawesi Utara.</p>
          </motion.div>

          <Tabs defaultValue="tondanouw" className="w-full max-w-5xl mx-auto">
            <div className="flex justify-center mb-10 md:mb-12 px-4 md:px-0">
              <TabsList className="glass-panel p-1 rounded-full w-full max-w-md grid grid-cols-3 gap-1 h-auto min-h-11 items-center">
                <TabsTrigger 
                  value="tondanouw" 
                  className="rounded-full py-2 px-3 text-xs md:text-sm font-bold text-slate-400 hover:text-slate-200 transition-all data-[active]:bg-amber-500 data-[active]:text-slate-950 dark:data-[active]:bg-amber-500 dark:data-[active]:text-slate-950 dark:data-[active]:border-transparent dark:data-[active]:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                >
                  Tondanouw
                </TabsTrigger>
                <TabsTrigger 
                  value="likupang" 
                  className="rounded-full py-2 px-3 text-xs md:text-sm font-bold text-slate-400 hover:text-slate-200 transition-all data-[active]:bg-amber-500 data-[active]:text-slate-950 dark:data-[active]:bg-amber-500 dark:data-[active]:text-slate-950 dark:data-[active]:border-transparent dark:data-[active]:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                >
                  Likupang
                </TabsTrigger>
                <TabsTrigger 
                  value="lolah" 
                  className="rounded-full py-2 px-3 text-xs md:text-sm font-bold text-slate-400 hover:text-slate-200 transition-all data-[active]:bg-amber-500 data-[active]:text-slate-950 dark:data-[active]:bg-amber-500 dark:data-[active]:text-slate-950 dark:data-[active]:border-transparent dark:data-[active]:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                >
                  Lolah
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
              {/* Tabs Content */}
              {[{
                val: "tondanouw", 
                title: "Desa Tondanouw", 
                subtitle: "Kec. Touluaan, Kab. Mitra", 
                desc: (
                  <div className="text-sm space-y-4 mt-6 text-slate-300 text-left leading-relaxed">
                    <p>Desa Tondanouw adalah salah satu desa yang berada di wilayah Kecamatan Touluaan, bagian dari Kabupaten Minahasa Tenggara di Provinsi Sulawesi Utara, Indonesia. Desa ini merupakan wilayah pedesaan yang kehidupan masyarakatnya banyak bergantung pada sektor pertanian dan kegiatan sosial kemasyarakatan khas daerah Minahasa.</p>
                    <p><strong className="text-amber-400">1. Letak Geografis</strong><br/>Desa Tondanouw berada di kawasan Kecamatan Touluaan yang terdiri dari beberapa desa lain seperti Lobu, Ranoketang Atas, dan Tondanouw Satu. Wilayah ini termasuk daerah dataran dengan ketinggian sekitar ±272 meter di atas permukaan laut dan memiliki kode pos 95981.</p>
                    <p><strong className="text-amber-400">2. Kondisi Penduduk</strong><br/>Jumlah penduduk desa ini sekitar ±1.500 jiwa dengan masyarakat yang hidup dalam suasana kekeluargaan dan gotong royong yang kuat. Struktur wilayah desa biasanya dibagi dalam beberapa jaga (lingkungan) untuk memudahkan pelayanan pemerintahan dan koordinasi masyarakat.</p>
                    <p><strong className="text-amber-400">3. Mata Pencaharian dan Potensi Desa</strong><br/>Sebagian besar masyarakat Desa Tondanouw bekerja di bidang pertanian dan perkebunan, terutama:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400">
                      <li>Pertanian padi sawah (desa ini dikenal sebagai salah satu sentra produksi padi di wilayah tersebut)</li>
                      <li>Perkebunan tanaman pangan dan hortikultura</li>
                      <li>Usaha kecil dan perdagangan lokal</li>
                    </ul>
                  </div>
                ),
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.756260278784!2d124.6970425!3d1.037497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876b54133b6697%3A0xc3f7a4e7f3c64c12!2sTondanou%2C%20Touluaan%2C%20Southeast%20Minahasa%20Regency%2C%20North%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              }, {
                val: "likupang",
                title: "Likupang",
                subtitle: "Kab. Minahasa Utara",
                desc: (
                  <div className="text-sm space-y-4 mt-6 text-slate-300 text-left leading-relaxed">
                    <p>Likupang adalah kawasan yang terletak di Kabupaten Minahasa Utara, Provinsi Sulawesi Utara. Wilayah ini berada di bagian utara Pulau Sulawesi dan berjarak sekitar 60 km dari Kota Manado.</p>
                    <p>Secara administratif, kawasan Likupang terbagi menjadi beberapa kecamatan:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400">
                      <li>Likupang Barat</li>
                      <li>Likupang Timur</li>
                      <li>Likupang Selatan</li>
                    </ul>
                    <p><strong className="text-amber-400">Data Populasi</strong><br/>Data populasi Likupang biasanya dihitung per kecamatan. Berdasarkan data BPS (sekitar sensus 2010):</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400">
                      <li>Likupang Barat: ±16.988 jiwa</li>
                      <li>Likupang Timur: ±16.519 jiwa</li>
                      <li>Likupang Selatan: ±4.958 jiwa</li>
                    </ul>
                    <p>Jadi, total perkiraan populasi kawasan Likupang (gabungan tiga kecamatan) sekitar ±38.000 jiwa.</p>
                  </div>
                ),
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127581.4243685511!2d125.0069502!3d1.6787342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870ad46b3846cd%3A0x86bd7dcf3607775!2sLikupang%2C%20North%20Minahasa%20Regency%2C%20North%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              }, {
                val: "lolah",
                title: "Desa Lolah",
                subtitle: "Kec. Tombariri Timur",
                desc: (
                  <div className="text-sm space-y-4 mt-6 text-slate-300 text-left leading-relaxed">
                    <p>Lolah Satu adalah sebuah desa administratif yang terletak di Kecamatan Tombariri Timur, Kabupaten Minahasa, Provinsi Sulawesi Utara, Indonesia. Desa ini memadukan potensi agraris, warisan budaya megalitik, dan panorama pesisir di ujung utara Pulau Sulawesi.</p>
                    <p>Rincian profil dan karakteristik wilayah Lolah Satu meliputi:</p>
                    <ul className="list-disc pl-5 space-y-3 text-slate-400">
                      <li><strong className="text-amber-400">Geografi dan Aksesibilitas:</strong> Berada di wilayah administrasi Kabupaten Minahasa, desa ini berdekatan secara geografis dengan Kota Tomohon dan ibu kota provinsi, Kota Manado. Wilayah ini dihubungkan oleh jaringan jalan darat yang memberikan akses menuju pusat ekonomi dan wisata di pesisir barat Minahasa.</li>
                      <li><strong className="text-amber-400">Potensi Ekonomi:</strong> Mayoritas penduduknya menggantungkan hidup pada sektor pertanian, perkebunan, dan perikanan (untuk wilayah yang dekat dengan pesisir). Desa ini juga dikenal memiliki infrastruktur pendukung pertanian skala kecil seperti mesin perontok padi dan jagung.</li>
                      <li><strong className="text-amber-400">Warisan Budaya:</strong> Lolah Satu dan sekitarnya (Situs Lolah) termasuk wilayah yang kaya akan peninggalan budaya megalitik. Di kawasan ini terdapat temuan sejarah arkeologis seperti waruga dan menhir.</li>
                      <li><strong className="text-amber-400">Demografi:</strong> Desa ini dihuni oleh ratusan kepala keluarga dengan jumlah penduduk mencapai sekitar seribu jiwa, dengan mayoritas masyarakat yang hidup dalam nuansa adat dan budaya Minahasa yang kental.</li>
                    </ul>
                  </div>
                ),
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15953.595085600984!2d124.7876801!3d1.341852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3287140e695d13ef%3A0x1d4ffbc4242ec674!2sLolah%2C%20East%20Tombariri%2C%20Minahasa%20Regency%2C%20North%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              }].map(loc => (
                <TabsContent key={loc.val} value={loc.val} className="mt-0 focus-visible:outline-none">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start pt-4">
                    <div className="w-full lg:w-5/12 flex flex-col justify-start">
                      <div className="inline-flex w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 items-center justify-center mb-8 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                        <MapPin className="h-7 w-7" />
                      </div>
                      <h3 className="font-heading text-4xl font-bold text-slate-100 mb-3 tracking-tight">{loc.title}</h3>
                      <p className="text-amber-400 font-semibold mb-4 flex items-center text-lg">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mr-3 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                        {loc.subtitle}
                      </p>
                      {loc.desc}
                    </div>
                    <div className="w-full lg:w-7/12 flex flex-col gap-6">
                      {/* Peta Sulawesi Utara (Overview) */}
                      <div className="w-full h-[220px] lg:h-[260px] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group relative">
                        <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none z-10"></div>
                        <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 z-20 text-[10px] font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          📍 Peta Sulawesi Utara (Ikhtisar)
                        </div>
                        <iframe 
                          title="Peta Ikhtisar Sulawesi Utara"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2037703.1118128362!2d123.6338573!3d1.2464735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x327df58d60dfb13f%3A0x1030bfbca7c7e40!2sNorth%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full grayscale-[50%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
                        ></iframe>
                      </div>

                      {/* Peta Detail Lokasi */}
                      <div className="w-full h-[220px] lg:h-[260px] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group relative">
                        <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none z-10"></div>
                        <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 z-20 text-[10px] font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          🔍 Detail Lokasi: {loc.title}
                        </div>
                        <iframe 
                          title={`Peta Detail ${loc.title}`}
                          src={loc.mapSrc} 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full grayscale-[50%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
                        ></iframe>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 pb-24 sm:pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" alt="Yankes Logo" className="h-10 transition-all duration-500" />
            <span className="font-heading font-bold text-slate-300 tracking-wider text-xl">BAKSOS <span className="text-amber-500">2026</span></span>
          </div>
          <p className="text-slate-500 text-sm text-center md:text-left font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Yayasan Kesehatan GPIB & GMIM. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
