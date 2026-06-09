import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Member from "@/models/Member";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const member = await Member.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!member) return NextResponse.json({ success: false, error: "Member not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: member });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    await Member.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 });
  }
}
