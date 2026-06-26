"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, MessageCircle, ExternalLink, Trophy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export default function HomePage() {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  
  // Database States
  const [members, setMembers] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase inside useEffect for Client Component stability
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function fetchMembers() {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('full_name', { ascending: true });
        
        if (error) setError(error);
        else setMembers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen">
      
      {/* HEADER / NAV */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        
        {/* LOGO & BRAND AREA */}
        <a href="/" className="flex items-center gap-3 group">
          <Image 
            src="/ksl-logo.png" 
            alt="Kami Suka Lari Logo" 
            width={50} 
            height={50} 
            className="object-contain"
            priority 
          />
          <span className="text-xl font-black tracking-tighter text-slate-950 group-hover:text-red-600 transition">
            KAMI SUKA LARI
          </span>
        </a>

        {/* PAGE ANCHOR LINKS */}
        <nav className="hidden md:flex space-x-8 font-semibold text-sm tracking-wide uppercase ml-26">
          <a href="#roster" className="hover:text-red-600 transition">Roster</a>
          <a href="/achievements" className="hover:text-red-600 transition text-black-500 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-red-600" />
            <span>Achievements</span>
          </a>
          <a href="#schedule" className="hover:text-red-600 transition">Schedule</a>
        </nav>
        
        {/* RIGHT SIDE ALIGNED ACTION AREA */}
        <div className="flex items-center gap-6">
          
          {/* HEADER INLINE SOCIAL MEDIA ICON PIPELINE */}
          <div className="flex items-center gap-3.5 border-r border-slate-200 pr-5">
            
            {/* WhatsApp Link */}
            <a 
              href="https://wa.me/60162040217" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-emerald-600 transition-colors"
              title="WhatsApp PIC"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Instagram Link */}
            <a 
              href="https://instagram.com/kamisukalari" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-pink-600 transition-colors flex items-center"
              title="Instagram Feed"
            >
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* TikTok Link */}
            <a 
              href="https://www.tiktok.com/@kamisukalari" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-black transition-colors flex items-center"
              title="TikTok Channel"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.17 1.22 1.43 3.02 2.22 4.9 2.27v3.91c-1.6-.08-3.15-.65-4.41-1.63-.33-.25-.63-.53-.9-.84v6.08c0 4.13-2.9 8.04-7.18 8.04-4.57.2-8.62-3.32-8.43-7.91C1.84 9.53 5.56 5.86 10 6.06c.04 1.33.02 2.65.02 3.98-2.33-.22-4.51 1.25-5.07 3.51-.7 2.83 1.22 5.71 4.12 5.81 2.92.1 5.48-1.99 5.48-4.92V.02z"/>
              </svg>
            </a>

            {/* Threads Link */}
            <a 
              href="https://www.threads.net/@kamisukalari" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-slate-900 transition-colors flex items-center"
              title="Threads Community"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.35 22.25c-5.4 0-9.75-4.35-9.75-9.75s4.35-9.75 9.75-9.75 9.75 4.35 9.75 9.75v1.07c0 1.25-.9 2.27-2.14 2.27-1.02 0-1.74-.63-1.92-1.42a5.418 5.418 0 0 1-4.63 1.93c-2.87 0-5.18-2.31-5.18-5.18s2.31-5.18 5.18-5.18c1.9 0 3.56 1.02 4.45 2.55h.06V8.02h2.23v5.6c0 2.27 1.63 3.96 3.96 3.96 2.37 0 4.13-1.84 4.13-4.51v-1.07c0-6.63-5.37-12-12-12s-12 5.37-12 12 5.37 12 12 12c2.4 0 4.67-.7 6.63-2.03l1.29 1.8c-2.31 1.57-4.99 2.41-7.92 2.41zm-1.06-7.85c1.65 0 2.98-1.33 2.98-2.98s-1.33-2.98-2.98-2.98-2.98 1.33-2.98 2.98 1.33 2.98 2.98 2.98z"/>
              </svg>
            </a>

          </div>

          {/* Core Call to Action Button */}
          <button 
            onClick={() => setIsOpen(true)} 
            className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition cursor-pointer"
          >
            Join Next Run
          </button>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white py-24 px-6 text-center md:text-left md:flex md:items-center md:justify-between min-h-[70vh]">
        <div className="max-w-3xl space-y-6">
          <span className="text-red-500 font-bold tracking-widest uppercase text-sm border-l-4 border-red-600 pl-3">
            Universiti Putra Malaysia
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-none">
            PAIN IS TEMPORARY.<br/><span className="text-red-600">PR IS FOREVER.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl">
            We are UPM’s premier high-performance running collective. No gimmicks. Just pure pace. 
          </p>
          <div className="pt-4">
            {/* Secondary Trigger Button */}
            <button 
              onClick={() => setIsOpen(true)}
              className="bg-red-600 text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition cursor-pointer"
            >
              Connect with Crew
            </button>
          </div>
        </div>
      </section>

      {/* 2. MEMBER ROSTER & STATS SECTION */}
      <section id="roster" className="py-20 px-6 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">The KSL Roster</h2>
            <p className="text-slate-500">Our core active athletes, their personal bests, and social links.</p>
          </div>
        </div>

        {loading && <p className="text-slate-500 font-mono text-sm animate-pulse">Loading core engine analytics...</p>}

        {/* Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="border-2 border-slate-900 bg-white text-slate-900 p-6 hover:bg-red-600 hover:text-white transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold uppercase">{member.full_name}</h3>
                  {member.instagram_handle && (
                    <a 
                      href={`https://instagram.com/${member.instagram_handle.replace('@','')}`} 
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-red-600 group-hover:text-white flex items-center gap-1 mt-1"
                    >
                      {/* Native SVG Instagram Icon for Roster Cards */}
                      <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      {member.instagram_handle}
                    </a>
                  )}
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-700 text-sm group-hover:bg-white group-hover:text-red-600">
                  {member.full_name ? member.full_name.charAt(0) : 'K'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t pt-4 border-slate-200 group-hover:border-red-500">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-red-200 font-bold">5KM PB</span>
                  <span className="text-lg font-black">{member.pb_5k || '--:--'}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-red-200 font-bold">10KM PB</span>
                  <span className="text-lg font-black">{member.pb_10k || '--:--'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= NEW ACHIEVEMENT SECTION LAYER ================= */}
      <section className="bg-slate-950 text-white py-14 px-6 border-y-4 border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left flex flex-col md:flex-row items-center gap-4">
            
            {/* Trophy Icon Badge */}
            <div className="bg-red-600/10 p-3 border-2 border-red-600 rounded-none text-red-600 hidden md:block">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="bg-red-600 text-white text-[10px] uppercase font-black tracking-widest px-2 py-0.5 inline-block">
                Live Hall of Fame
              </span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
                <Trophy className="w-6 h-6 text-red-600 md:hidden" />
                KSL PERFORMANCE ARCHIVES
              </h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Check out the top 5 fastest records across 5K, 10K, HM, FM, Duathlon OD, and the heavy volume ultra-endurance distance charts.
              </p>
            </div>

          </div>
          <div className="w-full md:w-auto">
            <a 
              href="/achievements" 
              className="block text-center bg-red-600 hover:bg-white text-white hover:text-slate-950 transition-all font-black uppercase tracking-widest text-xs px-8 py-4 border-2 border-red-600"
            >
              View All Achievements →
            </a>
          </div>
        </div>
      </section>
      {/* ================================================================= */}

      {/* 3. SCHEDULE SECTION */}
      <section id="schedule" className="bg-slate-50 py-20 px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Weekly Training blocks</h2>
            <p className="text-slate-500">We train hard. Rain or shine, meet us at the starting line.</p>
          </div>
          
          {/* Focused Single Session Layout with Image Integration */}
          <div className="max-w-4xl mx-auto bg-white border-2 border-slate-900 grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Left Column: Session Analytics Details */}
            <div className="p-8 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-slate-900">
              <div className="space-y-3">
                <span className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                  Tuesday • 5:30 PM
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950">
                  Interval Track Session
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Focus on VO2 max developments and pure speed endurance constraints. Open to anyone looking to test their thresholds with the core engine crew.
                </p>
              </div>
              
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 text-slate-700 uppercase tracking-wider">
                  UPM Stadium Track
                </span>
              </div>
            </div>

            {/* Right Column: Visual Stadium Display Frame */}
            <div className="relative h-64 md:h-auto min-h-[240px] bg-slate-900">
              <Image 
                src="/upm-stadium.jpg" 
                alt="UPM Stadium Track Facility" 
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-slate-600 text-xs py-8 text-center border-t border-slate-900">
        <p>© 2026 Kami Suka Lari (KSL) UPM. All rights reserved.</p>
      </footer>

      {/* MODAL OVERLAY BACKDROP */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          
          {/* MODAL CONTAINER */}
          <div className="bg-white border-2 border-slate-950 w-full max-w-md p-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Close Button Cross */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-black font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            {/* Header Text */}
            <div className="mb-6">
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Pull Up To KSL</h3>
              <p className="text-sm text-slate-500 mt-1">Drop a message or follow our ecosystem feeds below.</p>
            </div>

            {/* SOCIAL LINKS PIPELINE LIST */}
            <div className="space-y-3">
              
              {/* WhatsApp Connection */}
              <a 
                href="https://wa.me/60162040217" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-600 text-emerald-950 hover:text-white border-2 border-emerald-500 transition font-bold text-sm group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                  <span>WhatsApp Person-In-Charge</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>

              {/* Instagram Feed */}
              <a 
                href="https://instagram.com/kamisukalari" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-pink-50 hover:bg-pink-600 text-pink-950 hover:text-white border-2 border-pink-400 transition font-bold text-sm group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 fill-none stroke-current text-pink-600 group-hover:text-white" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram (@kamisukalari)</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>

              {/* TikTok Channel */}
              <a 
                href="https://www.tiktok.com/@kamisukalari" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-cyan-50 hover:bg-black text-slate-950 hover:text-white border-2 border-cyan-400 transition font-bold text-sm group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 fill-current text-cyan-600 group-hover:text-white" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.17 1.22 1.43 3.02 2.22 4.9 2.27v3.91c-1.6-.08-3.15-.65-4.41-1.63-.33-.25-.63-.53-.9-.84v6.08c0 4.13-2.9 8.04-7.18 8.04-4.57.2-8.62-3.32-8.43-7.91C1.84 9.53 5.56 5.86 10 6.06c.04 1.33.02 2.65.02 3.98-2.33-.22-4.51 1.25-5.07 3.51-.7 2.83 1.22 5.71 4.12 5.81 2.92.1 5.48-1.99 5.48-4.92V.02z"/>
                  </svg>
                  <span>TikTok (@kamisukalari)</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>

              {/* Threads Feed */}
              <a 
                href="https://www.threads.net/@kamisukalari" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-900 text-slate-950 hover:text-white border-2 border-slate-300 transition font-bold text-sm group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 fill-current text-slate-700 group-hover:text-white" viewBox="0 0 24 24">
                    <path d="M12.35 22.25c-5.4 0-9.75-4.35-9.75-9.75s4.35-9.75 9.75-9.75 9.75 4.35 9.75 9.75v1.07c0 1.25-.9 2.27-2.14 2.27-1.02 0-1.74-.63-1.92-1.42a5.418 5.418 0 0 1-4.63 1.93c-2.87 0-5.18-2.31-5.18-5.18s2.31-5.18 5.18-5.18c1.9 0 3.56 1.02 4.45 2.55h.06V8.02h2.23v5.6c0 2.27 1.63 3.96 3.96 3.96 2.37 0 4.13-1.84 4.13-4.51v-1.07c0-6.63-5.37-12-12-12s-12 5.37-12 12 5.37 12 12 12c2.4 0 4.67-.7 6.63-2.03l1.29 1.8c-2.31 1.57-4.99 2.41-7.92 2.41zm-1.06-7.85c1.65 0 2.98-1.33 2.98-2.98s-1.33-2.98-2.98-2.98-2.98 1.33-2.98 2.98 1.33 2.98 2.98 2.98z"/>
                  </svg>
                  <span>Threads (@kamisukalari)</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}