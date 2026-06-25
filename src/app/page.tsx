'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, HeartPulse, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white selection:bg-[var(--color-primary-blue)] selection:text-white pb-24 sm:pb-0">
      
      {/* Hero Section */}
      <section className="relative w-full pt-16 sm:pt-28 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh] bg-[#fafafa]">
        {/* Modern SaaS Mesh/Blur Background */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-300/20 rounded-full blur-[120px]"></div>
        </div>

        <motion.div 
          initial="hidden" animate="visible" variants={stagger}
          className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center mt-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-slate-200/60 bg-white/50 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-slate-600 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Pelayanan Kasih 14 - 18 September 2026
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
              Kesehatan untuk Semua, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-blue)] to-blue-400">Dimanapun Berada.</span>
            </h1>
          </motion.div>
          
          <motion.p variants={fadeUp} className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Yayasan Kesehatan GPIB dan GMIM bersinergi menghadirkan akses layanan medis premium ke pelosok Sulawesi Utara melalui Bakti Sosial Lintas Sinodal 2026.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link href="/proposal" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[var(--color-primary-blue)] hover:bg-[var(--color-primary-blue-light)] text-white font-semibold text-lg px-8 py-6 rounded-full shadow-lg shadow-blue-500/25 transition-transform hover:-translate-y-0.5">
                Mulai Donasi
              </Button>
            </Link>
            <Link href="#lokasi" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-600 hover:bg-slate-50 px-8 py-6 rounded-full transition-transform hover:-translate-y-0.5 font-semibold">
                Lihat Lokasi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Trusted By / Logos & Summaries */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-32 w-full max-w-5xl mx-auto px-4 z-10"
        >
          <p className="text-center text-sm font-bold text-[var(--color-primary-blue)] mb-12 uppercase tracking-widest">Diselenggarakan Bersama Oleh</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
            {/* GPIB */}
            <div className="flex flex-col items-center group">
              <div className="h-32 md:h-40 w-full mb-6 flex items-center justify-center p-6 rounded-[2rem] bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:-translate-y-2">
                <img src="/logo-gpib.png" alt="GPIB" className="h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <h4 className="font-extrabold text-xl text-slate-900 mb-3 tracking-tight">GPIB</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Membangun jemaat misioner pembawa damai sejahtera bagi seluruh lapisan masyarakat di wilayah pelayanannya.
              </p>
            </div>

            {/* Yankes GPIB */}
            <div className="flex flex-col items-center group">
              <div className="h-32 md:h-40 w-full mb-6 flex items-center justify-center p-6 rounded-[2rem] bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:-translate-y-2">
                <img src="/logo-yankes.png" alt="Yayasan Kesehatan GPIB" className="h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <h4 className="font-extrabold text-xl text-slate-900 mb-3 tracking-tight">Yayasan Kesehatan GPIB</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Perpanjangan tangan gereja yang berkomitmen penuh dalam menghadirkan layanan medis inklusif, berkualitas, dan profesional.
              </p>
            </div>

            {/* GMIM */}
            <div className="flex flex-col items-center group">
              <div className="h-32 md:h-40 w-full mb-6 flex items-center justify-center p-6 rounded-[2rem] bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:-translate-y-2">
                <img src="/logo-gmim.png" alt="GMIM" className="h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <h4 className="font-extrabold text-xl text-slate-900 mb-3 tracking-tight">GMIM</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Gereja yang global, mandiri, dan misioner dalam melayani masyarakat secara menyeluruh di tanah Minahasa.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid (SaaS style) */}
      <section className="py-28 bg-white relative z-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Pelayanan Tanpa Batas</h2>
            <p className="text-slate-500 text-lg">Membangun masyarakat yang sehat dan kuat melalui pendekatan medis yang komprehensif dan transparan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
              <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                <HeartPulse className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Medis Menyeluruh</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Pengobatan gratis, pemeriksaan umum, dan penyuluhan gizi bagi masyarakat di daerah terpencil.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ delay: 0.1 }} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
              <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transparansi Dana</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Setiap donasi dicatat secara digital. Proposal dan bukti konfirmasi dapat diverifikasi secara *real-time*.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ delay: 0.2 }} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
              <div className="h-14 w-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 shadow-sm">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tepat Sasaran</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Dilaksanakan pada 14-18 September 2026, bertepatan dengan momentum sinodal strategis.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Peta Lokasi - SaaS Tabs */}
      <section id="lokasi" className="py-28 bg-slate-50 rounded-t-[3rem] border-t border-slate-200/60 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-[var(--color-primary-blue)] font-bold tracking-widest uppercase text-xs mb-3 block">Jangkauan Geografis</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">3 Titik Pusat Pelayanan</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Menjangkau yang tak terjangkau. Fokus pelayanan terbagi di tiga wilayah utama Sulawesi Utara.</p>
          </motion.div>

          <Tabs defaultValue="tondanouw" className="w-full max-w-5xl mx-auto">
            <div className="flex justify-center mb-10 overflow-x-auto pb-4 hide-scrollbar">
              <TabsList className="bg-white p-1.5 rounded-full border border-slate-200/60 shadow-sm w-full sm:w-auto flex flex-nowrap min-w-max">
                <TabsTrigger value="tondanouw" className="rounded-full px-6 py-3 text-sm font-semibold text-slate-500 data-[state=active]:bg-[var(--color-primary-blue)] data-[state=active]:text-white transition-all shadow-none">
                  Desa Tondanouw
                </TabsTrigger>
                <TabsTrigger value="likupang" className="rounded-full px-6 py-3 text-sm font-semibold text-slate-500 data-[state=active]:bg-[var(--color-primary-blue)] data-[state=active]:text-white transition-all shadow-none">
                  Likupang
                </TabsTrigger>
                <TabsTrigger value="lolah" className="rounded-full px-6 py-3 text-sm font-semibold text-slate-500 data-[state=active]:bg-[var(--color-primary-blue)] data-[state=active]:text-white transition-all shadow-none">
                  Desa Lolah
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
              {/* Tabs Content */}
              {[{
                val: "tondanouw", 
                title: "Desa Tondanouw", 
                subtitle: "Kec. Touluaan, Kab. Mitra", 
                desc: "Wilayah Minahasa Tenggara memiliki tantangan aksesibilitas pelayanan medis di daerah pelosok. Desa Tondanouw akan menjadi titik sentral pelayanan medis intensif.",
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.756260278784!2d124.6970425!3d1.037497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876b54133b6697%3A0xc3f7a4e7f3c64c12!2sTondanou%2C%20Touluaan%2C%20Southeast%20Minahasa%20Regency%2C%20North%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              }, {
                val: "likupang",
                title: "Likupang",
                subtitle: "Kab. Minahasa Utara",
                desc: "Sebagai kawasan pariwisata prioritas, kami berkomitmen menjaga kesehatan masyarakat pesisir Likupang, khususnya keluarga nelayan yang rentan.",
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127581.4243685511!2d125.0069502!3d1.6787342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870ad46b3846cd%3A0x86bd7dcf3607775!2sLikupang%2C%20North%20Minahasa%20Regency%2C%20North%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              }, {
                val: "lolah",
                title: "Desa Lolah",
                subtitle: "Kec. Tombariri Timur",
                desc: "Pelayanan bagi masyarakat perbukitan Minahasa, mencakup edukasi gizi holistik bagi keluarga dan pengobatan penyakit degeneratif.",
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15953.595085600984!2d124.7876801!3d1.341852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3287140e695d13ef%3A0x1d4ffbc4242ec674!2sLolah%2C%20East%20Tombariri%2C%20Minahasa%20Regency%2C%20North%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              }].map(loc => (
                <TabsContent key={loc.val} value={loc.val} className="mt-0 focus-visible:outline-none">
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                      <div className="inline-flex w-12 h-12 rounded-full bg-slate-50 border border-slate-100 shadow-sm text-blue-600 items-center justify-center mb-6">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <h3 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{loc.title}</h3>
                      <p className="text-[var(--color-primary-blue)] font-semibold mb-6 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                        {loc.subtitle}
                      </p>
                      <p className="text-slate-500 leading-relaxed font-medium">{loc.desc}</p>
                    </div>
                    <div className="w-full lg:w-7/12 h-[350px] md:h-[400px] rounded-[1.5rem] overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner group">
                      <iframe 
                        title={`Peta ${loc.title}`}
                        src={loc.mapSrc} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[25%] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      ></iframe>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Modern SaaS Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-12 pb-24 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo-yankes.png" alt="Yankes Logo" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
            <span className="font-bold text-slate-900 tracking-tight">Baksos 2026</span>
          </div>
          <p className="text-slate-400 text-sm text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} Yayasan Kesehatan GPIB & GMIM. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
