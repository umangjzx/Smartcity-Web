export const ADMIN_COOKIE_NAME = "admin_session";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export const ADMIN_SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_DURATION_MS / 1000);

// Web Crypto API only (no Buffer) so this works in both the Edge middleware
// runtime and Node API routes.
function b64urlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): Uint8Array<ArrayBuffer> {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Please define the ADMIN_SESSION_SECRET environment variable inside .env.local");
  return secret;
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  const exp = Date.now() + SESSION_DURATION_MS;
  const payload = b64urlEncode(new TextEncoder().encode(JSON.stringify({ exp })));
  const key = await getKey(secret);
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const sig = b64urlEncode(new Uint8Array(sigBuf));
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;

  try {
    const key = await getKey(secret);
    const valid = await crypto.subtle.verify("HMAC", key, b64urlDecode(sig), new TextEncoder().encode(payload));
    if (!valid) return false;

    const data = JSON.parse(new TextDecoder().decode(b64urlDecode(payload)));
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}
