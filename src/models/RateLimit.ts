import mongoose from "mongoose";

// A tiny fixed-window rate limiter backed by Mongo instead of in-memory state,
// since serverless invocations don't share memory across requests. The TTL
// index cleans up expired windows automatically — no manual pruning needed.
const RateLimitSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
  expiresAt: { type: Date, required: true },
});

RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema);
