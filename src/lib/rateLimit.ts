import dbConnect from "@/lib/mongoose";
import RateLimit from "@/models/RateLimit";

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Atomic fixed-window increment: a doc only exists while its window is live
// (the TTL index removes it once expiresAt passes), so an upsert against a
// query that excludes expired docs naturally starts a fresh window when the
// old one is gone, and just increments the counter while it's still live.
export async function isRateLimited(key: string, max: number, windowMs: number): Promise<boolean> {
  await dbConnect();
  const now = new Date();
  const doc = await RateLimit.findOneAndUpdate(
    { key, expiresAt: { $gt: now } },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(now.getTime() + windowMs) } },
    { upsert: true, new: true }
  );
  return doc.count > max;
}
