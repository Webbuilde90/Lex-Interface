import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { escapeHtml, sendTransactionalEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.full_name || !data.email || !data.phone) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return NextResponse.json({ error: "Backend not configured" }, { status: 503 });
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await supabase.from("inquiries").insert({ full_name: String(data.full_name).slice(0, 120), email: String(data.email).slice(0, 160), phone: String(data.phone).slice(0, 50), nature: String(data.nature || "Other / Not sure").slice(0, 100), message: String(data.message || "").slice(0, 4000) });
    if (error) { console.error("Inquiry insert failed", error); return NextResponse.json({ error: "Could not save enquiry" }, { status: 500 }); }
    const fullName = String(data.full_name).slice(0, 120);
    const email = String(data.email).slice(0, 160);
    const phone = String(data.phone).slice(0, 50);
    const nature = String(data.nature || "Other / Not sure").slice(0, 100);
    const message = String(data.message || "").slice(0, 4000);
    const officeEmail = process.env.LEX_OFFICE_EMAIL || "connect@lexlawoffices.com";
    const notificationSent = await sendTransactionalEmail({ to: officeEmail, replyTo: email, subject: `New enquiry — ${fullName}`, html: `<h2>New Lex Interface enquiry</h2><p><strong>Name:</strong> ${escapeHtml(fullName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Nature:</strong> ${escapeHtml(nature)}</p><p><strong>Message:</strong> ${escapeHtml(message || "Not provided")}</p>` });
    return NextResponse.json({ ok: true, notificationSent });
  } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
}

