import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 1. Grab keys directly inside the component execution block
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // 2. Initialize the client right here
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // 3. Fetch the rows
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .order('full_name', { ascending: true });

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen">
      
      {/* HEADER / NAV */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-red-600">KAMI SUKA LARI</div>
        <nav className="hidden md:flex space-x-8 font-semibold text-sm tracking-wide uppercase">
          <a href="#roster" className="hover:text-red-600 transition">Roster</a>
          <a href="#schedule" className="hover:text-red-600 transition">Schedule</a>
          <a href="#faq" className="hover:text-red-600 transition text-slate-500">FAQ</a>
        </nav>
        <a href="#schedule" className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition">
          Join Next Run
        </a>
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
        </div>
      </section>

      {/* 2. MEMBER ROSTER & STATS SECTION */}
      <section id="roster" className="py-20 px-6 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">The KSL Roster</h2>
            <p className="text-slate-500">Our athletes, their personal bests, and social links.</p>
          </div>
        </div>

        {/* Local ENV Variable Check */}
        {(!supabaseUrl || !supabaseAnonKey) && (
          <div className="border-2 border-amber-500 bg-amber-50 p-4 mb-6 rounded text-amber-950 text-sm font-medium">
            ⚠️ Attention: Environment keys are missing from process.env! Check your .env.local file layout.
          </div>
        )}

        {/* Fallback Display */}
        {(!members || members.length === 0) && (
          <div className="border-2 border-dashed border-slate-200 p-12 text-center rounded-lg mb-8">
            <p className="text-red-500 font-semibold">
              Connected to endpoint successfully, but the `members` table row count returned 0 entries.
            </p>
          </div>
        )}

        {/* Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members && members.map((member) => (
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

      {/* 3. SCHEDULE SECTION */}
      <section id="schedule" className="bg-slate-50 py-20 px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Weekly Training blocks</h2>
            <p className="text-slate-500">We train hard. Rain or shine, meet us at the starting line.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 border-l-4 border-red-600 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Tuesday • 5:30 PM</span>
              <h3 className="text-xl font-bold uppercase mt-1">Interval Track Session</h3>
              <p className="text-slate-600 text-sm mt-2">Focus on VO2 max and pure speed endurance.</p>
              <span className="inline-block mt-4 text-xs font-mono bg-slate-100 px-2 py-1 rounded">UPM Stadium Track</span>
            </div>
            <div className="bg-white p-6 border-l-4 border-slate-900 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Saturday • 6:45 AM</span>
              <h3 className="text-xl font-bold uppercase mt-1">Tempo / Long Run</h3>
              <p className="text-slate-600 text-sm mt-2">Aerobic capacity building. Distances range from 12km to 21km.</p>
              <span className="inline-block mt-4 text-xs font-mono bg-slate-100 px-2 py-1 rounded">UPM Campus Loop</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-slate-600 text-xs py-8 text-center border-t border-slate-900">
        <p>© 2026 Kami Suka Lari (KSL) UPM. All rights reserved.</p>
      </footer>

    </div>
  );
}