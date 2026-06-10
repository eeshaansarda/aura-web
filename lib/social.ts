// Web-URL counterpart of constants/socialPlatforms.ts in the mobile repo.
// The same five curated platforms; handles map to public profile URLs.

export interface SocialPlatformConfig {
  id: string;
  label: string;
  webUrl: (handle: string) => string;
}

export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    id: "instagram",
    label: "Instagram",
    webUrl: (h) => `https://instagram.com/${h}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    webUrl: (h) => `https://linkedin.com/in/${h}`,
  },
  {
    id: "x",
    label: "X (Twitter)",
    webUrl: (h) => `https://x.com/${h}`,
  },
  {
    id: "github",
    label: "GitHub",
    webUrl: (h) => `https://github.com/${h}`,
  },
  {
    id: "tiktok",
    label: "TikTok",
    webUrl: (h) => `https://tiktok.com/@${h}`,
  },
];

export function socialWebUrl(platform: string, handle: string): string | null {
  const config = SOCIAL_PLATFORMS.find((p) => p.id === platform);
  return config ? config.webUrl(handle.replace(/^@/, "")) : null;
}

export function socialLabel(platform: string): string {
  return SOCIAL_PLATFORMS.find((p) => p.id === platform)?.label ?? platform;
}
