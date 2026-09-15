"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type Inquiry = { id: string; created_at: string; full_name: string; email: string; phone: string; nature: string; message: string; status?: string };
type Appointment = { id: string; created_at: string; full_name: string; email: string; phone: string; preferred_date: string; preferred_time: string; nature: string; message: string; status: "pending" | "confirmed" | "declined" | "completed" };
const adminEmail = "connect@lexlawoffices.com";

export default function AdminPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function loadDashboard() {
    if (!supabase) return;
    setBusy(true);
    const [inquiryResult, appointmentResult] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("appointments").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    if (inquiryResult.error || appointmentResult.error) setMessage("This account is not authorised for the Lex Interface dashboard.");
    else { setInquiries((inquiryResult.data || []) as Inquiry[]); setAppointments((appointmentResult.data || []) as Appointment[]); setMessage(""); }
    setBusy(false);
  }

  useEffect(() => {
    if (!supabase) { setMessage("Admin backend is not configured yet."); return; }
    supabase.auth.getSession().then(({ data }) => {
      const nextEmail = data.session?.user.email?.toLowerCase() || null;
      if (nextEmail === adminEmail) { setSessionEmail(nextEmail); void loadDashboard(); }
      else if (nextEmail) { void supabase.auth.signOut(); setMessage("This account is not authorised for the Lex Interface dashboard."); }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      const nextEmail = nextSession?.user.email?.toLowerCase() || null;
      setSessionEmail(nextEmail === adminEmail ? nextEmail : null);
      if (nextEmail === adminEmail) void loadDashboard();
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setMessage("Sign in could not be completed. Check the account details.");
    setBusy(false);
  }

  async function signOut() { if (supabase) await supabase.auth.signOut(); setSessionEmail(null); setInquiries([]); setAppointments([]); }

  async function updateAppointment(id: string, status: Appointment["status"]) {
    if (!supabase) return;
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (!error) setAppointments((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  }

  if (!sessionEmail) return <main className="admin-page"><div className="admin-login"><ShieldCheck size={28} /><p className="section-label">Private office dashboard</p><h1>Lex Interface admin</h1><p>Sign in with the authorised office account to view enquiries and appointment requests.</p><form onSubmit={signIn}><label htmlFor="admin-email">Office email</label><input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /><button className="btn dark" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form>{message && <p className="form-status error">{message}</p>}</div></main>;

  return <main className="admin-page"><div className="page-wrap"><div className="admin-header"><div><p className="section-label">Private office dashboard</p><h1>Incoming matters.</h1><p className="lede">Signed in as {sessionEmail}</p></div><div className="admin-actions"><button className="btn secondary" onClick={() => void loadDashboard()} disabled={busy}><RefreshCw size={16} /> Refresh</button><button className="btn dark" onClick={() => void signOut()}><LogOut size={16} /> Sign out</button></div></div><section className="admin-section"><div className="admin-section-title"><h2>Appointment requests</h2><span>{appointments.length}</span></div>{appointments.length === 0 ? <p className="admin-empty">No appointment requests yet.</p> : <div className="admin-list">{appointments.map((item) => <article className="admin-card" key={item.id}><div><p className="admin-card-meta">{new Date(item.created_at).toLocaleString("en-IN")} · {item.nature}</p><h3>{item.full_name}</h3><p>{item.email} · {item.phone}</p><p>Preferred: {item.preferred_date} · {item.preferred_time}</p>{item.message && <p className="admin-message">{item.message}</p>}</div><select aria-label={`Status for ${item.full_name}`} value={item.status} onChange={(event) => void updateAppointment(item.id, event.target.value as Appointment["status"])}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="declined">Declined</option><option value="completed">Completed</option></select></article>)}</div>}</section><section className="admin-section"><div className="admin-section-title"><h2>Client enquiries</h2><span>{inquiries.length}</span></div>{inquiries.length === 0 ? <p className="admin-empty">No enquiries yet.</p> : <div className="admin-list">{inquiries.map((item) => <article className="admin-card" key={item.id}><div><p className="admin-card-meta">{new Date(item.created_at).toLocaleString("en-IN")} · {item.nature}</p><h3>{item.full_name}</h3><p>{item.email} · {item.phone}</p>{item.message && <p className="admin-message">{item.message}</p>}</div><span className="admin-status">{item.status || "new"}</span></article>)}</div>}</section></div></main>;
}

