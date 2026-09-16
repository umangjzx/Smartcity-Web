// Vercel injects VERCEL_PROJECT_PRODUCTION_URL with the project's actual
// stable production domain — using it means we never have to hardcode or
// guess a URL. NEXT_PUBLIC_SITE_URL lets that be overridden (e.g. a custom
// domain), and localhost is the fallback for local development.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Rotaract Club of Coimbatore Smartcity";
