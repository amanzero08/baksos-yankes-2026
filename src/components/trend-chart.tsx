"use client";

import React, { useState } from "react";
import { TrendingUp, FileText, Award } from "lucide-react";

interface Transaction {
  date: string;
  amount: number;
  label: string;
}

interface TrendChartProps {
  initialTransactions: Transaction[];
}

export default function TrendChart({ initialTransactions }: TrendChartProps) {
  const [showProposal, setShowProposal] = useState(true);
  const [showKartuSahabat, setShowKartuSahabat] = useState(true);

  // Filter transactions based on selected filters
  const filteredTxs = initialTransactions.filter((t) => {
    if (t.label === "Proposal" && !showProposal) return false;
    if (t.label === "Kartu Sahabat" && !showKartuSahabat) return false;
    return true;
  });

  // Sort transactions chronologically
  const sortedTxs = [...filteredTxs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Compute accumulated running sum for each transaction
  let runningSum = 0;
  const allMilestones: { label: string; cumulative: number }[] = [];

  if (sortedTxs.length > 0) {
    // Add a starting point (0 cumulative) one day before the first transaction
    const firstTxDate = new Date(sortedTxs[0].date);
    const prevDate = new Date(firstTxDate);
    prevDate.setDate(prevDate.getDate() - 1);
    allMilestones.push({
      label: prevDate.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      cumulative: 0,
    });

    sortedTxs.forEach((t) => {
      runningSum += t.amount;
      const txDate = new Date(t.date);
      allMilestones.push({
        label: txDate.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
        cumulative: runningSum,
      });
    });

    // Automatically append today's date as a final milestone if it's not already there
    const today = new Date();
    const todayStr = today.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    if (allMilestones[allMilestones.length - 1].label !== todayStr) {
      allMilestones.push({
        label: todayStr,
        cumulative: runningSum,
      });
    }
  } else {
    // If no transactions are active, generate starting 0 and today's date with 0 cumulative
    const today = new Date();
    const todayStr = today.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    const prevDate = new Date(today);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevStr = prevDate.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

    allMilestones.push({
      label: prevStr,
      cumulative: 0,
    });
    allMilestones.push({
      label: todayStr,
      cumulative: 0,
    });
  }

  // Construct final milestones to be exactly 7 points for a uniform look
  const milestones: { label: string; cumulative: number }[] = [];
  if (allMilestones.length < 7) {
    const padCount = 7 - allMilestones.length;
    for (let i = 0; i < padCount; i++) {
      milestones.push({ label: "-", cumulative: 0 });
    }
    milestones.push(...allMilestones);
  } else {
    milestones.push(...allMilestones.slice(-7));
  }

  const maxVal = Math.max(...milestones.map((m) => m.cumulative), 10000000);

  const formatShortIDR = (val: number) => {
    if (val === 0) return "Rp 0";
    if (val >= 1000000000) return "Rp " + (val / 1000000000).toFixed(1) + "M";
    if (val >= 1000000) return "Rp " + (val / 1000000).toFixed(0) + "jt";
    return "Rp " + val.toLocaleString("id-ID");
  };

  const formatIDR = (amount: number) => {
    return "Rp " + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const points = milestones.map((m, idx) => {
    const x = (idx / (milestones.length - 1)) * 100;
    const y = 80 - (maxVal > 0 ? (m.cumulative / maxVal) * 60 : 0);
    return { x, y, label: m.label, cumulative: m.cumulative };
  });

  const lineD = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${lineD} L 100 100 L 0 100 Z`;

  // Calculated accumulation for selected filters
  const filteredAccumulation = runningSum;

  // Use state combination as key so path animation re-runs on filter changes
  const chartAnimationKey = `${showProposal}-${showKartuSahabat}`;

  return (
    <div className="space-y-6">
      {/* Filters & Accumulation Info Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/30 p-4 sm:p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div className="space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            Filter Sumber Dana
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowProposal(!showProposal)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                showProposal
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:bg-amber-500/30"
                  : "bg-slate-950/40 text-slate-500 border-white/5 hover:border-white/10 hover:text-slate-400"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Proposal
            </button>
            <button
              onClick={() => setShowKartuSahabat(!showKartuSahabat)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                showKartuSahabat
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:bg-blue-500/30"
                  : "bg-slate-950/40 text-slate-500 border-white/5 hover:border-white/10 hover:text-slate-400"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Kartu Sahabat
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">
            Akumulasi Terfilter
          </span>
          <span className="text-xl sm:text-2xl font-bold font-heading text-emerald-400 tracking-tight transition-all duration-300">
            {formatIDR(filteredAccumulation)}
          </span>
        </div>
      </div>

      {/* SVG Trend Line Chart */}
      <div className="w-full bg-slate-950/50 rounded-2xl border border-white/5 p-6 pb-12 relative overflow-hidden flex flex-col items-center">
        <div className="relative w-full h-[140px]">
          {/* SVG Line and Area */}
          <svg
            className="absolute inset-x-6 top-0 w-[calc(100%-3rem)] h-[110px]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
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
              .animate-path-${chartAnimationKey} {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: pathDraw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
            `}</style>

            {/* Horizontal Grid Lines */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="3,3" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="3,3" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="3,3" />

            {/* Area Gradient Fill */}
            <path key={`area-${chartAnimationKey}`} d={areaD} fill="url(#chartGradient)" />

            {/* Line Plot */}
            <path
              key={`line-${chartAnimationKey}`}
              d={lineD}
              fill="none"
              stroke="url(#lineGlow)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`animate-path-${chartAnimationKey}`}
            />
          </svg>

          {/* HTML Overlay: Dots & Value Badges */}
          <div className="absolute inset-x-6 top-0 w-[calc(100%-3rem)] h-[110px] pointer-events-none">
            {points.map((p, idx) => {
              const leftPct = (idx / (points.length - 1)) * 100;
              const topPct = p.y;

              return (
                <div
                  key={idx}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  {/* Value Label above dot */}
                  <div
                    className={`absolute bottom-3.5 text-[10px] sm:text-xs font-extrabold text-emerald-400 whitespace-nowrap bg-slate-950/90 px-2 py-0.5 rounded-md border border-emerald-500/20 shadow-lg backdrop-blur-sm ${
                      idx === 0 || idx === points.length - 1 ? "block" : "hidden sm:block"
                    }`}
                  >
                    {formatShortIDR(p.cumulative)}
                  </div>

                  {/* Circular Dot */}
                  <div className="relative w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md">
                    {/* Pulsing ring for the last dot */}
                    {idx === points.length - 1 && (
                      <div className="absolute -inset-1 rounded-full border border-emerald-400 animate-ping"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* HTML Overlay: Dates row aligned perfectly at the bottom */}
          <div className="absolute inset-x-6 bottom-0 w-[calc(100%-3rem)] h-6 pointer-events-none">
            {points.map((p, idx) => {
              const leftPct = (idx / (points.length - 1)) * 100;
              const isKeyLabel =
                idx === 0 || idx === Math.floor(points.length / 2) || idx === points.length - 1;
              return (
                <div
                  key={idx}
                  className={`absolute -translate-x-1/2 text-[10px] sm:text-xs font-bold text-slate-100 whitespace-nowrap ${
                    isKeyLabel ? "block" : "hidden sm:block"
                  }`}
                  style={{ left: `${leftPct}%` }}
                >
                  {p.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
