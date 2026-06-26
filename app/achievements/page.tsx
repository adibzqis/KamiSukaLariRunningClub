"use client";

import React, { useState } from 'react';
import { ArrowLeft, Trophy, Zap, Activity, Award } from 'lucide-react';

export default function AchievementsPage() {
  // Hardcoded elite performance hall of fame data based on your core categories
  const records = {
    pb5k: [
      { rank: 1, name: "Speed", time: "15:58", date: "June 2026" },
      { rank: 2, name: "Jose", time: "16:45", date: "May 2026" },
      { rank: 3, name: "Adib Zaquan", time: "17:20", date: "April 2026" },
      { rank: 4, name: "Runner Delta", time: "18:10", date: "2026" },
      { rank: 5, name: "Runner Echo", time: "18:55", date: "2026" },
    ],
    pb10k: [
      { rank: 1, name: "Speed", time: "33:12", date: "2026" },
      { rank: 2, name: "Jose", time: "34:50", date: "2026" },
      { rank: 3, name: "Adib Zaquan", time: "36:15", date: "2026" },
      { rank: 4, name: "Runner Charlie", time: "38:40", date: "2025" },
      { rank: 5, name: "Runner Echo", time: "39:55", date: "2026" },
    ],
    hm: [
      { rank: 1, name: "Speed", time: "1:14:22", date: "2026" },
      { rank: 2, name: "Jose", time: "1:18:05", date: "2026" },
      { rank: 3, name: "Adib Zaquan", time: "1:22:40", date: "2026" },
    ],
    fm: [
      { rank: 1, name: "Jose", time: "4:36:09", date: "2026" },
    ],
    duathlonOD: [
      { rank: 1, name: "Adib Zaquan", time: "2:38:10", details: "10k Run / 40k Bike / 5k Run", date: "2026" },
    ],
    powermanClassic: [
      { rank: 1, name: "Adib Zaquan", time: "4:38:10", details: "10k Run / 60k Bike / 10k Run", date: "2025" },
    ],
    powermanShort: [
      { rank: 1, name: "Athlete Y", time: "1:28:45", details: "5k Run / 30k Bike / 5k Run", date: "2026" },
    ],
    specialStats: {
      longestRun: { name: "Jose", distance: "60 KM", description: "Ultra campus loop endurance test" },
      mostParticipation: [
        { name: "Adib Zaquan", count: "2 Races", category: "Multisport" },
        { name: "Rashid", count: "3 Races", category: "Ultramarathon" },
        { name: "Jose", count: "3 Races", category: "Full Marathon" }
      ]
    }
  };

  return (
    <div className="bg-slate-950 text-white font-sans antialiased min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Back navigation */}
        <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition mb-8 font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Basecamp
        </a>

        {/* Title Header */}
        <div className="border-b-4 border-red-600 pb-6 mb-12">
          <span className="text-red-500 font-black tracking-widest uppercase text-sm">
            KSL Hall of Fame
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1">
            PERFORMANCE <span className="text-red-600">ARCHIVES</span>
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
            The fastest historical segments, multi-sport execution records, and ultimate mileage markers set by core KSL active athletes.
          </p>
        </div>

        {/* 1. RUNNING PB LEADERBOARDS */}
        <h2 className="text-2xl font-black uppercase tracking-tight text-red-500 mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6" /> Pure Speed Leaderboards (Top 5)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 5KM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-6 shadow-xl">
            <h3 className="text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">5KM Track / Road</h3>
            <div className="space-y-3">
              {records.pb5k.map((r) => (
                <div key={r.rank} className="flex justify-between items-center text-sm font-mono bg-slate-950/50 p-2 border-l-2 border-red-600">
                  <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                  <span className="text-red-500 font-black text-base">{r.time} </span>
                </div>
              ))}
            </div>
          </div>

          {/* 10KM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-6 shadow-xl">
            <h3 className="text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">10KM Road Segment</h3>
            <div className="space-y-3">
              {records.pb10k.map((r) => (
                <div key={r.rank} className="flex justify-between items-center text-sm font-mono bg-slate-950/50 p-2 border-l-2 border-red-600">
                  <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                  <span className="text-red-500 font-black text-base">{r.time} </span>
                </div>
              ))}
            </div>
          </div>

          {/* HM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-6 shadow-xl">
            <h3 className="text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">Half Marathon (21.1KM)</h3>
            <div className="space-y-3">
              {records.hm.map((r) => (
                <div key={r.rank} className="flex justify-between items-center text-sm font-mono bg-slate-950/50 p-2 border-l-2 border-red-600">
                  <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                  <span className="text-red-500 font-black text-base">{r.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FM Block */}
          <div className="bg-slate-900 border-2 border-slate-800 p-6 shadow-xl">
            <h3 className="text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">Full Marathon (42.2KM)</h3>
            <div className="space-y-3">
              {records.fm.map((r) => (
                <div key={r.rank} className="flex justify-between items-center text-sm font-mono bg-slate-950/50 p-2 border-l-2 border-red-600">
                  <span>{r.rank}. <strong className="text-white uppercase font-sans font-bold">{r.name}</strong></span>
                  <span className="text-red-500 font-black text-base">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. DUATHLON & MULTI-SPORT SECTION */}
        <h2 className="text-2xl font-black uppercase tracking-tight text-red-500 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6" /> Multi-Sport Endurance Blocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Duathlon OD */}
          <div className="bg-slate-900 p-6 border-t-4 border-red-600 shadow-xl">
            <span className="text-xs font-mono text-slate-500 tracking-wider">Olympic Distance</span>
            <h3 className="text-lg font-black uppercase text-white mt-0.5 mb-4">Duathlon OD</h3>
            <div className="space-y-3">
              {records.duathlonOD.map((r) => (
                <div key={r.rank} className="text-sm bg-slate-950/50 p-3 rounded">
                  <div className="flex justify-between font-bold">
                    <span>{r.rank}. {r.name}</span>
                    <span className="text-red-500 font-mono">{r.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{r.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Powerman Classic */}
          <div className="bg-slate-900 p-6 border-t-4 border-red-600 shadow-xl">
            <span className="text-xs font-mono text-slate-500 tracking-wider">Major Tier Endurance</span>
            <h3 className="text-lg font-black uppercase text-white mt-0.5 mb-4">Powerman Classic</h3>
            <div className="space-y-3">
              {records.powermanClassic.map((r) => (
                <div key={r.rank} className="text-sm bg-slate-950/50 p-3 rounded">
                  <div className="flex justify-between font-bold">
                    <span>{r.rank}. {r.name}</span>
                    <span className="text-red-500 font-mono">{r.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{r.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Powerman Short */}
          <div className="bg-slate-900 p-6 border-t-4 border-red-600 shadow-xl">
            <span className="text-xs font-mono text-slate-500 tracking-wider">Sprint Speed Endurance</span>
            <h3 className="text-lg font-black uppercase text-white mt-0.5 mb-4">Powerman Short</h3>
            <div className="space-y-3">
              {records.powermanShort.map((r) => (
                <div key={r.rank} className="text-sm bg-slate-950/50 p-3 rounded">
                  <div className="flex justify-between font-bold">
                    <span>{r.rank}. {r.name}</span>
                    <span className="text-red-500 font-mono">{r.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{r.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. ULTIMATE MILEAGE & PARTICIPATION INSIGHTS */}
        <h2 className="text-2xl font-black uppercase tracking-tight text-red-500 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" /> Heavyweight Volume Markers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Longest Run */}
          <div className="bg-gradient-to-br from-slate-900 to-red-950/40 p-8 border-2 border-red-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Max Single Session Mileage</span>
              <h3 className="text-3xl font-black uppercase mt-1 mb-2">Longest Recorded Run</h3>
              <p className="text-sm text-slate-400 mb-6">{records.specialStats.longestRun.description}</p>
            </div>
            <div className="flex justify-between items-baseline border-t border-red-900/40 pt-4">
              <span className="text-xl font-bold uppercase text-white">{records.specialStats.longestRun.name}</span>
              <span className="text-4xl font-black text-red-500 font-mono tracking-tighter">{records.specialStats.longestRun.distance}</span>
            </div>
          </div>

          {/* Most Race Participation */}
          <div className="bg-slate-900 p-6 border-2 border-slate-800">
            <h3 className="text-lg font-black uppercase text-white border-b border-slate-800 pb-2 mb-4">Most Race Participation (HM, FM, Ultra)</h3>
            <div className="space-y-4">
              {records.specialStats.mostParticipation.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/50 border-l-4 border-slate-700">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white">{p.name}</h4>
                    <p className="text-xs text-slate-500">{p.category}</p>
                  </div>
                  <span className="text-xl font-black text-red-500 font-mono">{p.count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}