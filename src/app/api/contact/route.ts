import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import ContactMessage from "@/models/ContactMessage";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: a field real visitors never see or fill (styled off-screen in
    // the form), so anything that fills it is almost certainly a bot. Report
    // fake success rather than an error, so scripted submitters don't learn
    // to adapt and just move on.
    if (String(body.website ?? "").trim() !== "") {
      return NextResponse.json({ success: true, data: { id: "ok" } }, { status: 201 });
    }

    const ip = getClientIp(request);
    if (await isRateLimited(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json(
        { success: false, error: "Too many messages sent — please try again in a few minutes." },
        { status: 429 }
      );
    }

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 });
    }

    await dbConnect();
    const doc = await ContactMessage.create({ firstName, lastName, email, subject, message });
    return NextResponse.json({ success: true, data: { id: doc._id } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}

// Admin-only — proxy.ts specifically requires auth for GET on this route,
// since it lists visitor-submitted names/emails/messages.
export async function GET() {
  try {
    await dbConnect();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}
