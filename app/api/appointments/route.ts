import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { escapeHtml, sendTransactionalEmail } from "@/lib/resend";

const timeSlots = ["Morning (10:00–12:00)", "Afternoon (12:00–15:00)", "Evening (15:00–18:00)"];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fullName = String(data.full_name || "").trim();
    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    const preferredDate = String(data.preferred_date || "").trim();
    const preferredTime = String(data.preferred_time || "").trim();
    if (!fullName || !email || !phone || !preferredDate || !preferredTime) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 160) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || preferredDate < new Date().toISOString().slice(0, 10)) return NextResponse.json({ error: "Choose a future date" }, { status: 400 });
    if (!timeSlots.includes(preferredTime)) return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return NextResponse.json({ error: "Backend not configured" }, { status: 503 });
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const appointment = {
      full_name: fullName.slice(0, 120),
      email: email.slice(0, 160),
      phone: phone.slice(0, 50),
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      nature: String(data.nature || "Other / Not sure").slice(0, 100),
      message: String(data.message || "").slice(0, 4000),
    };
    const { error } = await supabase.from("appointments").insert(appointment);
    if (error) { console.error("Appointment insert failed", error); return NextResponse.json({ error: "Could not save appointment request" }, { status: 500 }); }

    const officeEmail = process.env.LEX_OFFICE_EMAIL || "connect@lexlawoffices.com";
    const detailRows = `<p><strong>Name:</strong> ${escapeHtml(appointment.full_name)}</p><p><strong>Email:</strong> ${escapeHtml(appointment.email)}</p><p><strong>Phone:</strong> ${escapeHtml(appointment.phone)}</p><p><strong>Preferred date:</strong> ${escapeHtml(appointment.preferred_date)}</p><p><strong>Preferred time:</strong> ${escapeHtml(appointment.preferred_time)}</p><p><strong>Nature:</strong> ${escapeHtml(appointment.nature)}</p><p><strong>Brief context:</strong> ${escapeHtml(appointment.message || "Not provided")}</p>`;
    const officeNotified = await sendTransactionalEmail({ to: officeEmail, replyTo: appointment.email, subject: `Appointment request — ${appointment.full_name}`, html: `<h2>New appointment request</h2>${detailRows}<p>This request is pending confirmation in the Lex Interface admin dashboard.</p>` });
    await sendTransactionalEmail({ to: appointment.email, subject: "Lex Interface — appointment request received", html: `<h2>We received your request</h2><p>Thank you for contacting Lex Interface. The team will review availability and confirm the next conversation by email or phone.</p><p><strong>Preferred date:</strong> ${escapeHtml(appointment.preferred_date)}<br /><strong>Preferred time:</strong> ${escapeHtml(appointment.preferred_time)}</p><p>Please do not reply with confidential legal details until an attorney-client relationship has been established.</p>` });
    return NextResponse.json({ ok: true, notificationSent: officeNotified });
  } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
}

