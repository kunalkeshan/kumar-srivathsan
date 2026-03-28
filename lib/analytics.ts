/**
 * Centralised analytics ID constants read from environment variables.
 *
 * Both values fall back to an empty string when the env var is absent,
 * which causes the respective analytics integrations to be silently skipped
 * (Google Analytics and Microsoft Clarity both no-op on an empty ID).
 *
 * Set the corresponding env vars in `.env.local` for local development
 * (copy `.env.example` as a starting point). For deployed environments,
 * configure them in your hosting provider's environment variable settings
 * (e.g. Vercel project env vars):
 * - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` — Google Analytics measurement ID (`G-XXXXXXXXXX`)
 * - `NEXT_PUBLIC_CLARITY_PROJECT_ID`  — Microsoft Clarity project ID
 */
export const ANALYTICS_IDS = {
  GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "",
  CLARITY_PROJECT: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
} as const
