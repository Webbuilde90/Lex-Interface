import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
}
