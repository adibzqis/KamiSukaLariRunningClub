'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';

export default function PortalPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // View states
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');

  // Athlete Workspace states
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [memberProfile, setMemberProfile] = useState<any>(null);
  const [submissionsHistory, setSubmissionsHistory] = useState<any[]>([]);

  // Form submission states
  const [category, setCategory] = useState('5k');
  const [achievedTime, setAchievedTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);

  // 1. Monitor Authentication Session State
  useEffect(() => {
    async function getActiveSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSessionUser(session.user);
        syncAndFetchAthleteData(session.user);
      }
    }
    getActiveSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSessionUser(session.user);
        syncAndFetchAthleteData(session.user);
      } else {
        setSessionUser(null);
        setMemberProfile(null);
        setSubmissionsHistory([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Dynamic Synchronization and Fetching Layer
  async function syncAndFetchAthleteData(authUser: any) {
    try {
      setLoading(true);
      setErrorMessage('');
      
      let { data: profile, error: pError } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', authUser.id)
        .maybeSingle();

      if (pError) throw pError;

      // DYNAMIC PROFILE GENERATION ON FIRST LOG IN
      if (!profile) {
        const metaName = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'KSL Runner';
        const metaInsta = authUser.user_metadata?.instagram_handle || '';

        const { data: newProfile, error: iError } = await supabase
          .from('members')
          .insert({
            user_id: authUser.id,
            full_name: metaName,
            instagram_handle: metaInsta,
            is_admin: true // Automatically grants local setup admin privileges
          })
          .select()
          .single();

        if (iError) throw iError;
        profile = newProfile;
      }

      setMemberProfile(profile);

      if (profile) {
        const { data: submissions, error: sError } = await supabase
          .from('race_submissions')
          .select('*')
          .eq('member_id', profile.id)
          .order('created_at', { ascending: false });

        if (sError) throw sError;
        setSubmissionsHistory(submissions || []);
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 3. Sign Up Handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            instagram_handle: instagramHandle,
          },
        },
      });

      if (error) throw error;
      setSuccessMessage('Registration packet generated successfully! Please initialize system link log in.');
      setIsSignUp(false);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Session Log In Handler
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data?.user) {
        setSessionUser(data.user);
        await syncAndFetchAthleteData(data.user);
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 5. Performance Proof Upload Verification Pipeline
  const handleTransmitRecords = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!memberProfile || !achievedTime || !eventName || !proofFile) {
      setErrorMessage('Please complete all form fields and attach an image verification receipt.');
      setLoading(false);
      return;
    }

    try {
      const fileExt = proofFile.name.split('.').pop();
      const fileName = `${memberProfile.id}-${Date.now()}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('race-proofs')
        .upload(filePath, proofFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('race-proofs')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('race_submissions')
        .insert({
          member_id: memberProfile.id,
          category: category,
          submitted_time: achievedTime,
          event_name: eventName,
          proof_url: publicUrl,
          status: 'pending'
        });

      if (insertError) throw insertError;

      setSuccessMessage('Performance Packet Transmitted Successfully! Awaiting Admin Verification Clearance.');
      setAchievedTime('');
      setEventName('');
      setProofFile(null);
      
      await syncAndFetchAthleteData(sessionUser);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSessionUser(null);
    setMemberProfile(null);
    setSubmissionsHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans p-8 flex flex-col items-center justify-center relative">
      
      {/* GLOBAL BACK TO BASECAMP UTILITY LINK */}
      <div className="w-full max-w-6xl mb-4 flex justify-start">
        <Link href="/" className="text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5">
          ← BACK TO BASECAMP
        </Link>
      </div>

      {/* ERROR / SUCCESS HEADER MODALS */}
      {errorMessage && (
        <div className="w-full max-w-4xl border border-red-500 bg-red-950/40 text-red-400 p-4 rounded-md mb-6 font-mono text-sm flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="w-full max-w-4xl border border-emerald-500 bg-emerald-950/40 text-emerald-400 p-4 rounded-md mb-6 font-mono text-sm flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {successMessage}
        </div>
      )}

      {/* VIEW DELEGATOR LAYER */}
      {!sessionUser ? (
        <div className="w-full max-w-md bg-[#0b1329] border border-slate-800 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black tracking-tighter text-red-500">KSL ATHLETE NETWORK</h1>
            <p className="text-xs text-slate-400 mt-2">Access personal performance configurations and historical tracking analytics</p>
          </div>

          <form onSubmit={isSignUp ? handleSignUp : handleLogIn} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">Full Name</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#030712] border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors" placeholder="e.g. Adib Zaquan" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">Instagram Handle</label>
                  <input type="text" value={instagramHandle} onChange={(e) => setInstagramHandle(e.target.value)} className="w-full bg-[#030712] border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors" placeholder="@username" />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#030712] border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors" />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#030712] border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 transition-colors py-3 font-bold uppercase text-xs tracking-widest rounded mt-2 disabled:opacity-50">
              {loading ? 'PROCESSING PACKET...' : isSignUp ? 'GENERATE ACCOUNT' : 'INITIALIZE SYSTEM LINK'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button type="button" onClick={() => { setIsSignUp(!isSignUp); setErrorMessage(''); setSuccessMessage(''); }} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
              {isSignUp ? 'Already Registered? Log In Instead' : 'Need an engine link? Register Here'}
            </button>
          </div>
        </div>
      ) : (
        /* CONSOLE DASHBOARD INTERFACE VIEW */
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">ATHLETE CONSOLE</h1>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Welcome back, <span className="font-bold text-white">{memberProfile?.full_name || 'KSL Runner'}</span>.</span>
                
                {/* DYNAMICALLY APPEARING ADMIN SHORTCUT LINK */}
                {memberProfile?.is_admin && (
                  <Link href="/admin" className="px-2 py-0.5 text-[9px] font-extrabold bg-red-950/60 border border-red-500/40 text-red-400 rounded hover:bg-red-900/50 hover:text-white tracking-widest uppercase transition-all">
                    🛡️ GO TO ADMIN DASHBOARD
                  </Link>
                )}
              </div>
            </div>
            <button onClick={handleSignOut} className="bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-red-950/40 hover:border-red-900 rounded transition-colors">
              SIGN OUT
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-[#0b1329] border border-slate-800 p-6 rounded-md h-fit">
              <h2 className="text-xs font-black uppercase tracking-wider text-red-500 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                QUEUE NEW PERFORMANCE
              </h2>
              <form onSubmit={handleTransmitRecords} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Target Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#030712] border border-slate-800 rounded px-3 py-2 text-xs font-bold uppercase text-white focus:outline-none focus:border-red-500">
                    <option value="5k">5KM SEGMENT</option>
                    <option value="10k">10KM SEGMENT</option>
                    <option value="hm">HALF MARATHON</option>
                    <option value="fm">FULL MARATHON</option>
                    <option value="duathlon_od">OLYMPIC DUATHLON</option>
                    <option value="powerman_classic">POWERMAN CLASSIC</option>
                    <option value="powerman_short">POWERMAN SHORT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Achieved Finish Time</label>
                  <input type="text" required placeholder="e.g. 16:34 or 2:52:49" value={achievedTime} onChange={(e) => setAchievedTime(e.target.value)} className="w-full bg-[#030712] border border-slate-800 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-red-500" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Official Race Event Name</label>
                  <input type="text" required placeholder="e.g. KLSCM 2026 or Time Trial" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full bg-[#030712] border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Proof Attachment Receipt</label>
                  <input type="file" required accept="image/*" onChange={(e) => setProofFile(e.target.files ? e.target.files[0] : null)} className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-slate-800 file:text-white hover:file:bg-slate-700" />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 font-bold uppercase text-xs tracking-widest py-3 rounded transition-colors mt-2 disabled:opacity-50">
                  {loading ? 'TRANSMITTING...' : 'TRANSMIT RECORDS'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0b1329]/50 border border-slate-800 p-6 rounded-md">
                <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">YOUR LIVE VERIFIED RECORDS MATRIX</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#030712] border border-slate-800 p-4 rounded text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">5KM PB</p>
                    <p className="text-lg font-black font-mono text-red-500 mt-1">{memberProfile?.pb_5k || '--:--'}</p>
                  </div>
                  <div className="bg-[#030712] border border-slate-800 p-4 rounded text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">10KM PB</p>
                    <p className="text-lg font-black font-mono text-red-500 mt-1">{memberProfile?.pb_10k || '--:--'}</p>
                  </div>
                  <div className="bg-[#030712] border border-slate-800 p-4 rounded text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">HM PB</p>
                    <p className="text-lg font-black font-mono text-red-500 mt-1">{memberProfile?.pb_hm || '--:--'}</p>
                  </div>
                  <div className="bg-[#030712] border border-slate-800 p-4 rounded text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">FM PB</p>
                    <p className="text-lg font-black font-mono text-red-500 mt-1">{memberProfile?.pb_fm || '--:--'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b1329]/50 border border-slate-800 p-6 rounded-md">
                <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">SUBMISSION STATUS HISTORY</h2>
                {submissionsHistory.length === 0 ? (
                  <p className="text-xs text-slate-500 italic font-mono">No transmission packets broadcasted yet.</p>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {submissionsHistory.map((sub) => (
                      <div key={sub.id} className="bg-[#030712] border border-slate-800 p-4 rounded flex justify-between items-center font-mono text-xs">
                        <div>
                          <p className="font-bold text-white uppercase text-xs">{sub.category} Segment - {sub.submitted_time}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{sub.event_name}</p>
                          {sub.rejection_reason && (
                            <p className="text-[10px] text-red-400 mt-1 italic">Reason: {sub.rejection_reason}</p>
                          )}
                        </div>
                        <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded ${
                          sub.status === 'approved' ? 'bg-emerald-950 border border-emerald-500 text-emerald-400' :
                          sub.status === 'rejected' ? 'bg-red-950 border border-red-500 text-red-400' :
                          'bg-yellow-950 border border-yellow-500 text-yellow-400'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}