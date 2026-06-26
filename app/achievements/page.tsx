"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Trophy, Zap, Activity } from 'lucide-react';

export default function AchievementsPage() {
  // Official elite performance data matching all provided club records
  const records = {
    // Official 5KM records matching image guidelines
    pb5k: [
      { rank: 1, name: "Mathan Raj", time: "16:34", event: "Varsity Track & Field 2024 - 2", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 2, name: "Harresh Kumar", time: "16:37", event: "Varsity Track & Field 2025 - Grand Final", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 3, name: "Rishe", time: "17:03", event: "Malaysia Sarong Music Run 2025", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 4, name: "Yusri Bahari", time: "18:19", event: "Time Trial", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 5, name: "Aiman Hafiz", time: "18:47", event: "Time Trial", avatar: "/ksl-athletes/test.jpeg" },
    ],
    // Official 10KM records matching image guidelines
    pb10k: [
      { rank: 1, name: "Mathan Raj", time: "34:42", event: "XStep 10KM Time Trial Kuala Lumpur", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 2, name: "Harresh Kumar", time: "34:57", event: "Varsity Track & Field - Grand Final", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 3, name: "Yusri Bahari", time: "36:39", event: "Time Trial", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 4, name: "Rishe", time: "36:58", event: "HTM Ipoh 7 Bridge Marathon", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 5, name: "Aiman Hafiz", time: "39:23", event: "Time Trial", avatar: "/ksl-athletes/test.jpeg" },
    ],
    // Official Half Marathon records matching image guidelines
    hm: [
      { rank: 1, name: "Harresh Kumar", time: "1:16:13", event: "RH Half Marathon 2025", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 2, name: "Mathan Raj", time: "1:20:23", event: "Twincity Marathon 2026", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 3, name: "Yusri Bahari", time: "1:24:09", event: "Yamaha Gen Blu Carnival Run 2025", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 4, name: "Na'im Hanif", time: "1:29:26", event: "Time Trial", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 5, name: "Rishe", time: "1:25:43", event: "KLSCM 2023", avatar: "/ksl-athletes/test.jpeg" },
    ],
    // Official Full Marathon records matching image guidelines
    fm: [
      { rank: 1, name: "Mathan Raj", time: "2:52:49", event: "Terengganu Marathon 2026", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 2, name: "Harresh Kumar", time: "3:10:26", event: "Kuala Lumpur Standard Chartered Marathon 2025", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 3, name: "Adib Fakhree", time: "4:01:12", event: "Twincity Marathon 2026", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 4, name: "Rasyad Hakimi", time: "4:15:59", event: "Score Marathon 2025", avatar: "/ksl-athletes/test.jpeg" },
      { rank: 5, name: "Jose Daniel Ingom", time: "4:34:31", event: "Kuching Marathon 2025", avatar: "/ksl-athletes/test.jpeg" },
    ],
    duathlonOD: [
      { rank: 1, name: "Adib Zaquan", time: "2:38:10", details: "10k Run / 40k Bike / 5k Run", date: "2026", avatar: "/ksl-athletes/test.jpeg" },
    ],
    powermanClassic: [
      { rank: 1, name: "Adib Zaquan", time: "4:38:10", details: "10k Run / 60k Bike / 10k Run", date: "2025", avatar: "/ksl-athletes/test.jpeg" },
    ],
    powermanShort: [
      { rank: 1, name: "Athlete Y", time: "1:28:45", details: "5k Run / 30k Bike / 5k Run", date: "2026", avatar: "/ksl-athletes/test.jpeg" },
    ],
    specialStats: {
      longestRun: { name: "Jose", distance: "60 KM", description: "Ultra campus loop endurance test", avatar: "/ksl-athletes/test.jpeg" },
      mostParticipation: [
        { name: "Adib Zaquan", count: "2 Races", category: "Multisport", avatar: "/ksl-athletes/test.jpeg" },
        { name: "Rashid", count: "3 Races", category: "Ultramarathon", avatar: "/ksl-athletes/test.jpeg" },
        { name: "Jose", count: "3 Races", category: "Full Marathon", avatar: "/ksl-athletes/test.jpeg" }
      ]
    }
  };

  return (
    <div className="bg-slate-950 text-white font-sans antialiased min-h-screen p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Back navigation */}
        <a href="/" className="inline-flex items-center gap-2 text-xs md:text-sm text-slate-400 hover:text-red-500 transition mb-6 md:mb-8 font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Basecamp
        </a>

        {/* Title Header */}
        <div className="border-b-4 border-red-600 pb-6 mb-10 md:mb-12">
          <span className="text-red-500 font-black tracking-widest uppercase text-xs md:text-sm">
            KSL Hall of Fame
          </span>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight mt-1">
            PERFORMANCE <span className="text-red-600">ARCHIVES</span>
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl text-xs md:text-base leading-relaxed">
            The fastest race performance for each distance and category. Only finishing times from official races are eligible excluding 5KM and 10KM.
          </p>
        </div>

        {/* 1. RUNNING PB LEADERBOARDS */}
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-red-500 mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 md:w-6 md:h-6" /> Pure Speed Leaderboards (Top 5)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          
          {/* 5KM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-5 md:p-6 shadow-xl">
            <h3 className="text-base md:text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">5KM Track / Road</h3>
            <div className="space-y-3">
              {records.pb5k.map((r) => (
                <div key={r.rank} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-red-600 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {r.avatar ? (
                      <Image src={r.avatar} alt={`${r.name} Profile`} fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{r.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                      <span className="text-red-500 font-black text-sm md:text-base font-mono">{r.time}</span>
                    </div>
                    <span className="text-[10px] md:text-[11px] text-slate-500 font-medium uppercase tracking-tight italic">
                      {r.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10KM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-5 md:p-6 shadow-xl">
            <h3 className="text-base md:text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">10KM Road Segment</h3>
            <div className="space-y-3">
              {records.pb10k.map((r) => (
                <div key={r.rank} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-red-600 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {r.avatar ? (
                      <Image src={r.avatar} alt={`${r.name} Profile`} fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{r.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                      <span className="text-red-500 font-black text-sm md:text-base font-mono">{r.time}</span>
                    </div>
                    <span className="text-[10px] md:text-[11px] text-slate-500 font-medium uppercase tracking-tight italic">
                      {r.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-5 md:p-6 shadow-xl">
            <h3 className="text-base md:text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">Half Marathon (21.1KM)</h3>
            <div className="space-y-3">
              {records.hm.map((r) => (
                <div key={r.rank} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-red-600 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {r.avatar ? (
                      <Image src={r.avatar} alt={`${r.name} Profile`} fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{r.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                      <span className="text-red-500 font-black text-sm md:text-base font-mono">{r.time}</span>
                    </div>
                    <span className="text-[10px] md:text-[11px] text-slate-500 font-medium uppercase tracking-tight italic">
                      {r.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-5 md:p-6 shadow-xl">
            <h3 className="text-base md:text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">Full Marathon (42.2KM)</h3>
            <div className="space-y-3">
              {records.fm.map((r) => (
                <div key={r.rank} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-red-600 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {r.avatar ? (
                      <Image src={r.avatar} alt={`${r.name} Profile`} fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{r.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                      <span className="text-red-500 font-black text-sm md:text-base font-mono">{r.time}</span>
                    </div>
                    <span className="text-[10px] md:text-[11px] text-slate-500 font-medium uppercase tracking-tight italic">
                      {r.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 2. DUATHLON & MULTI-SPORT SECTION */}
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-red-500 mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 md:w-6 md:h-6" /> Multi-Sport Endurance Blocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          
          {/* Duathlon OD */}
          <div className="bg-slate-900 p-5 border-t-4 border-red-600 shadow-xl">
            <span className="text-[10px] font-mono text-slate-500 tracking-wider">Olympic Distance</span>
            <h3 className="text-base md:text-lg font-black uppercase text-white mt-0.5 mb-4">Duathlon OD</h3>
            <div className="space-y-3">
              {records.duathlonOD.map((r) => (
                <div key={r.rank} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-red-600 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {r.avatar ? (
                      <Image src={r.avatar} alt={`${r.name} Profile`} fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{r.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                      <span className="text-red-500 font-black text-sm font-mono">{r.time}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium font-sans uppercase tracking-tight">
                      {r.details} ({r.date})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Powerman Classic */}
          <div className="bg-slate-900 p-5 border-t-4 border-red-600 shadow-xl">
            <span className="text-[10px] font-mono text-slate-500 tracking-wider">Major Tier Endurance</span>
            <h3 className="text-base md:text-lg font-black uppercase text-white mt-0.5 mb-4">Powerman Classic</h3>
            <div className="space-y-3">
              {records.powermanClassic.map((r) => (
                <div key={r.rank} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-red-600 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {r.avatar ? (
                      <Image src={r.avatar} alt={`${r.name} Profile`} fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{r.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                      <span className="text-red-500 font-black text-sm font-mono">{r.time}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium font-sans uppercase tracking-tight">
                      {r.details} ({r.date})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Powerman Short */}
          <div className="bg-slate-900 p-5 border-t-4 border-red-600 shadow-xl">
            <span className="text-[10px] font-mono text-slate-500 tracking-wider">Sprint Speed Endurance</span>
            <h3 className="text-base md:text-lg font-black uppercase text-white mt-0.5 mb-4">Powerman Short</h3>
            <div className="space-y-3">
              {records.powermanShort.map((r) => (
                <div key={r.rank} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-red-600 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {r.avatar ? (
                      <Image src={r.avatar} alt={`${r.name} Profile`} fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{r.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                      <span className="text-red-500 font-black text-sm font-mono">{r.time}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium font-sans uppercase tracking-tight">
                      {r.details} ({r.date})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. ULTIMATE MILEAGE & PARTICIPATION INSIGHTS - Upgraded to match Profile layouts */}
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-red-500 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 md:w-6 md:h-6" /> Heavyweight Volume Markers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Longest Run Block */}
          <div className="bg-gradient-to-br from-slate-900 to-red-950/40 p-5 md:p-6 border-2 border-red-900/50 shadow-xl">
            <h3 className="text-base md:text-lg font-black uppercase text-white border-b border-red-800/40 pb-2 mb-4">Longest Recorded Run</h3>
            <div className="text-xs md:text-sm bg-slate-950/50 p-3 border-l-2 border-red-600 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                {records.specialStats.longestRun.avatar ? (
                  <Image src={records.specialStats.longestRun.avatar} alt="Profile" fill className="object-cover" sizes="48px" />
                ) : (
                  <span>JO</span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <span><strong className="text-white uppercase font-sans font-bold">{records.specialStats.longestRun.name}</strong></span>
                  <span className="text-red-500 font-black text-lg md:text-2xl font-mono tracking-tighter">{records.specialStats.longestRun.distance}</span>
                </div>
                <span className="text-[10px] md:text-[11px] text-slate-400 font-medium uppercase tracking-tight">
                  {records.specialStats.longestRun.description}
                </span>
              </div>
            </div>
          </div>

          {/* Most Race Participation Block */}
          <div className="bg-slate-900 p-5 md:p-6 border-2 border-slate-800 shadow-xl">
            <h3 className="text-base md:text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">Most Race Participation (HM, FM, Ultra)</h3>
            <div className="space-y-3">
              {records.specialStats.mostParticipation.map((p, idx) => (
                <div key={idx} className="text-xs md:text-sm bg-slate-950/50 p-2.5 border-l-2 border-slate-700 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex-shrink-0 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-400 font-sans uppercase">
                    {p.avatar ? (
                      <Image src={p.avatar} alt="Profile" fill className="object-cover" sizes="48px" />
                    ) : (
                      <span>{p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span><strong className="text-white uppercase font-sans font-bold">{p.name}</strong></span>
                      <span className="text-red-500 font-black text-sm md:text-base font-mono">{p.count}</span>
                    </div>
                    <span className="text-[10px] md:text-[11px] text-slate-500 font-medium uppercase tracking-tight">
                      {p.category} Specialist
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}