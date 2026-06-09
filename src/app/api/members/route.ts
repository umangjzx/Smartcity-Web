import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Member from "@/models/Member";

export async function GET() {
  try {
    await dbConnect();
    const members = await Member.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: members });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const member = await Member.create(body);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create member" }, { status: 500 });
  }
}
