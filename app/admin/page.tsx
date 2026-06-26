"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Check, X, ShieldAlert, Image as ImageIcon, AlertCircle } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboardPage() {
  // Auth & Access Control States
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Queue Ledger States
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
  const [activeProofUrl, setActiveProofUrl] = useState<string | null>(null);

  // Modal Control States for Rejections
  const [rejectionTargetId, setRejectionTargetId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAdminPrivileges() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Verify the user profile record contains admin clearance flags
        const { data: member, error } = await supabase
          .from('members')
          .select('is_admin')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error || !member?.is_admin) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
          fetchPendingQueue();
        }
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }

    checkAdminPrivileges();
  }, []);

  // Fetch all pending entries joined cleanly against the athletes' names
  async function fetchPendingQueue() {
    const { data, error } = await supabase
      .from('race_submissions')
      .select(`
        *,
        members (
          full_name,
          instagram_handle
        )
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (!error) {
      setPendingSubmissions(data || []);
    }
  }

  // Execute Approval Hook (Option A Database Trigger auto-fires here)
  const handleApprove = async (id: string) => {
    try {
      setProcessingId(id);
      
      const { error } = await supabase
        .from('race_submissions')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;
      
      // Auto-refresh layout queue entries
      setPendingSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (err: any) {
      alert(`Approval error: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  // Execute Rejection Status Updates with Reason text attachments
  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionTargetId || !rejectionReason.trim()) return;

    try {
      setProcessingId(rejectionTargetId);

      const { error } = await supabase
        .from('race_submissions')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason
        })
        .eq('id', rejectionTargetId);

      if (error) throw error;

      // Close structural layout state modals
      setPendingSubmissions(prev => prev.filter(sub => sub.id !== rejectionTargetId));
      setRejectionTargetId(null);
      setRejectionReason('');
    } catch (err: any) {
      alert(`Rejection error: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center font-mono text-sm animate-pulse">
        Polling secure credential verification lines...
      </div>
    );
  }

  // Access Blocked UI Fallback Guard
  if (isAdmin === false) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-red-600 mb-4 animate-bounce" />
        <h1 className="text-2xl font-black uppercase tracking-tight">Access Denied</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-sm">Your active account signature lacks administrative clearance tokens for this operations grid.</p>
        <a href="/" className="mt-6 bg-slate-900 border border-slate-800 hover:border-red-600 px-4 py-2 text-xs font-bold uppercase tracking-widest transition">
          Return to Basecamp
        </a>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white font-sans antialiased min-h-screen p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Back navigation */}
        <a href="/portal" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 transition mb-6 md:mb-8 font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Exit Verification Grid
        </a>

        {/* Header Banner */}
        <div className="border-b-4 border-red-600 pb-6 mb-10">
          <span className="text-red-500 font-black tracking-widest uppercase text-xs md:text-sm">
            KSL Operations Engine
          </span>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight mt-1">
            VERIFICATION <span className="text-red-600">QUEUE</span>
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl text-xs md:text-base leading-relaxed">
            Review submitted athlete race records. Approving an item will automatically invoke database triggers to synchronize live speed records.
          </p>
        </div>

        {/* MAIN DISPLAY WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: SUBMISSIONS QUEUE LIST */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">Incoming Logs ({pendingSubmissions.length})</h2>
            
            {pendingSubmissions.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-8 text-center text-xs font-mono text-slate-500 italic">
                Clean radar. No pending verification entries queued.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingSubmissions.map((sub) => (
                  <div key={sub.id} className="bg-slate-900 border-2 border-slate-800 p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                          {sub.category}
                        </span>
                        <h3 className="font-black text-base uppercase text-white tracking-tight">{sub.members?.full_name}</h3>
                        {sub.members?.instagram_handle && (
                          <span className="text-xs text-slate-500 font-medium">{sub.members.instagram_handle}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium">Event: <span className="text-slate-200">{sub.event_name}</span></p>
                      <p className="text-xs font-mono text-slate-400">Claimed PB: <span className="text-red-500 font-black text-sm">{sub.submitted_time}</span></p>
                    </div>

                    {/* ACTION PACK CONTROL PANEL BUTTONS */}
                    <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                      <button 
                        onClick={() => setActiveProofUrl(sub.proof_url)}
                        className="bg-slate-950 border border-slate-800 hover:border-slate-500 text-slate-300 p-2 text-xs font-bold uppercase flex items-center gap-1 w-full sm:w-auto justify-center transition"
                        title="View Document Proof"
                      >
                        <ImageIcon className="w-4 h-4" /> <span className="sm:hidden">Proof</span>
                      </button>
                      <button 
                        onClick={() => handleApprove(sub.id)}
                        disabled={processingId !== null}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 text-xs font-bold uppercase flex items-center gap-1 w-full sm:w-auto justify-center transition disabled:opacity-40"
                        title="Approve Entry"
                      >
                        <Check className="w-4 h-4" /> <span className="sm:hidden">Approve</span>
                      </button>
                      <button 
                        onClick={() => setRejectionTargetId(sub.id)}
                        disabled={processingId !== null}
                        className="bg-red-600 hover:bg-red-500 text-white p-2 text-xs font-bold uppercase flex items-center gap-1 w-full sm:w-auto justify-center transition disabled:opacity-40"
                        title="Reject Entry"
                      >
                        <X className="w-4 h-4" /> <span className="sm:hidden">Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: LIVE INTERACTIVE PREVIEW MONITOR FRAME */}
          <div className="lg:col-span-1 sticky top-24">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4">Verification Preview Panel</h2>
            <div className="bg-slate-900 border-2 border-slate-800 p-4 aspect-[3/4] flex flex-col items-center justify-center relative overflow-hidden shadow-xl group">
              {activeProofUrl ? (
                <>
                  <img 
                    src={activeProofUrl} 
                    alt="Uploaded receipt proof view" 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    <a href={activeProofUrl} target="_blank" rel="noreferrer" className="bg-black/80 text-white font-mono text-[9px] uppercase px-2 py-1 tracking-wider border border-slate-700">Open Full Window ↗</a>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-600 space-y-2 p-6">
                  <ImageIcon className="w-10 h-10 mx-auto opacity-30 animate-pulse" />
                  <p className="text-xs font-mono italic">Click the image icon button on any queue card row to stream verification attachments here.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* MODAL WINDOW INTERFACE: REJECTION REASON CONFIGURATOR */}
        {rejectionTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border-2 border-slate-800 w-full max-w-md p-6 relative shadow-2xl">
              <div className="mb-4 flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-lg font-black uppercase tracking-tight">Confirm Rejection Reason</h3>
              </div>
              <form onSubmit={handleRejectSubmit} className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provide an onboarding feedback explanation. This string parameter pushes directly onto the athlete's screen context log so they know what to fix.
                </p>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Rejection Message</label>
                  <textarea 
                    required 
                    rows={3}
                    value={rejectionReason} 
                    onChange={(e) => setRejectionReason(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-xs focus:border-red-600 outline-none font-sans font-medium text-slate-200 resize-none" 
                    placeholder="e.g. Image resolution blurry, please capture full dashboard screen." 
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2 border-t border-slate-800/60">
                  <button 
                    type="button" 
                    onClick={() => { setRejectionTargetId(null); setRejectionReason(''); }}
                    className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase px-3 py-2 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-red-600 text-white text-[10px] font-black uppercase px-4 py-2 hover:bg-white hover:text-slate-950 transition"
                  >
                    Execute Rejection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}