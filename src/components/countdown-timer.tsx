'use client'

import { useState, useEffect } from "react";
import { Clock, Calendar, MapPin } from "lucide-react";

export default function CountdownTimer() {
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full z-10">
      {/* Left Card: Countdown to Event */}
      <div className="lg:col-span-8 bg-[#0c0c0e]/90 backdrop-blur-md border border-white/5 rounded-[1.5rem] p-6 md:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5 mb-6">
          <Clock className="w-5 h-5 text-amber-500" />
          <span className="text-slate-100 font-bold text-base md:text-lg tracking-wide">Countdown Pelayanan Kasih</span>
        </div>

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "HARI", value: mounted ? timeLeft.days : 0 },
            { label: "JAM", value: mounted ? timeLeft.hours : 0 },
            { label: "MENIT", value: mounted ? timeLeft.minutes : 0 },
            { label: "DETIK", value: mounted ? timeLeft.seconds : 0 },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#141416] border border-white/5 rounded-2xl py-4 md:py-6 px-2 flex flex-col items-center justify-center transition-all duration-300 hover:border-amber-500/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            >
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f59e0b] tracking-tight mb-2 min-w-[2ch] text-center">
                {mounted ? String(item.value).padStart(2, '0') : "00"}
              </span>
              <span className="text-[9px] md:text-xs font-bold text-[#7c7c82] tracking-widest uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card: Event Metadata */}
      <div className="lg:col-span-4 bg-[#0c0c0e]/90 backdrop-blur-md border border-white/5 rounded-[1.5rem] p-6 md:p-8 flex flex-col justify-center space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[#56565c] text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-1.5">Tanggal Pelaksanaan</span>
          <div className="flex items-center gap-3">
            <Calendar className="w-4.5 h-4.5 text-amber-500 shrink-0" />
            <span className="font-bold text-slate-200 text-sm md:text-base">Senin, 14 September 2026</span>
          </div>
        </div>

        <div>
          <span className="text-[#56565c] text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-1.5">Waktu / Durasi</span>
          <div className="flex items-center gap-3">
            <Clock className="w-4.5 h-4.5 text-amber-500 shrink-0" />
            <span className="font-bold text-slate-200 text-sm md:text-base">14 - 18 September 2026</span>
          </div>
        </div>

        <div>
          <span className="text-[#56565c] text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-1.5">Lokasi Pelayanan</span>
          <div className="flex items-start gap-3">
            <MapPin className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-bold text-slate-200 text-sm md:text-base">3 Titik Wilayah</span>
              <span className="text-[#7c7c82] text-[10px] md:text-xs font-medium mt-0.5">Tondanouw, Likupang, & Lolah</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
