import type { ProfileResponse } from "./types";

// Profiles are addressed by their opaque UUID — master and subprofiles look
// identical from the URL, so a subprofile link can't be edited into the master.
export async function getProfile(profileId: string): Promise<ProfileResponse | null> {
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
    body: JSON.stringify({ profileId }),
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`get-profile failed: ${res.status}`);
  }

  return (await res.json()) as ProfileResponse;
}
