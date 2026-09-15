"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, Check, Clock3 } from "lucide-react";

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error();
      form.reset();
      setStatus("success");
      setMessage("Your request has been received. The Lex Interface team will confirm availability by email or phone.");
    } catch {
      setStatus("error");
      setMessage("We could not submit the request. Please call the office directly.");
    }
  }

  return <form className="contact-form appointment-form" onSubmit={submit}>
    <p className="section-label">Request a conversation</p>
    <h3>Choose a preferred time.</h3>
    <div className="form-grid">
      <div className="field"><label htmlFor="appointment_name">Full name *</label><input id="appointment_name" name="full_name" required autoComplete="name" /></div>
      <div className="field"><label htmlFor="appointment_email">Email *</label><input id="appointment_email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="appointment_phone">Telephone *</label><input id="appointment_phone" name="phone" required autoComplete="tel" /></div>
      <div className="field"><label htmlFor="appointment_nature">Nature of matter</label><select id="appointment_nature" name="nature" defaultValue="Dispute Resolution"><option>Dispute Resolution</option><option>Corporate &amp; Strategic Advisory</option><option>Finance &amp; Restructuring</option><option>Regulatory, Compliance &amp; Tax</option><option>Technology, IP &amp; Privacy</option><option>Real Estate, Infrastructure &amp; Employment</option><option>Other / Not sure</option></select></div>
      <div className="field"><label htmlFor="appointment_date">Preferred date *</label><div className="input-with-icon"><CalendarDays size={17} aria-hidden="true" /><input id="appointment_date" name="preferred_date" type="date" min={today} required /></div></div>
      <div className="field"><label htmlFor="appointment_time">Preferred time *</label><div className="input-with-icon"><Clock3 size={17} aria-hidden="true" /><select id="appointment_time" name="preferred_time" defaultValue="Morning (10:00–12:00)" required><option>Morning (10:00–12:00)</option><option>Afternoon (12:00–15:00)</option><option>Evening (15:00–18:00)</option></select></div></div>
      <div className="field full"><label htmlFor="appointment_message">Brief context</label><textarea id="appointment_message" name="message" placeholder="Please share only a broad, non-confidential context." /></div>
    </div>
    <p className="form-note">This is a request, not an instant confirmation. Please avoid sharing confidential details. Submitting a request does not create an attorney-client relationship.</p>
    <button className="btn dark" type="submit" disabled={status === "loading"}>{status === "loading" ? "Requesting…" : status === "success" ? <>Request received <Check size={16} /></> : <>Request appointment <CalendarDays size={16} /></>}</button>
    {message && <p className={`form-status ${status}`}>{message}</p>}
  </form>;
}

