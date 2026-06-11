"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

// Captures the fifth core-loop event ("web card visited") — the only
// client-side JS on the card. No-ops when NEXT_PUBLIC_POSTHOG_KEY is unset.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function TrackVisit({ profileId }: { profileId: string }) {
  useEffect(() => {
    if (!KEY) return;
    try {
      if (!posthog.__loaded) {
        posthog.init(KEY, {
          api_host: HOST,
          autocapture: false,
          capture_pageview: false,
        });
      }
      posthog.capture("web_card_visited", { profile_id: profileId });
    } catch {
      // analytics must never break the card
    }
  }, [profileId]);

  return null;
}
