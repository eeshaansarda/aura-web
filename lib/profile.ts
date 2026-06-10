import type { ProfileResponse } from "./types";

export async function getProfile(
  slug: string,
  subId?: string,
): Promise<ProfileResponse | null> {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
  }

  const res = await fetch(`${url}/functions/v1/get-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify(subId ? { slug, subId } : { slug }),
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`get-profile failed: ${res.status}`);
  }

  return (await res.json()) as ProfileResponse;
}
