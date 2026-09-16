import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import ContactMessage from "@/models/ContactMessage";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    await ContactMessage.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
