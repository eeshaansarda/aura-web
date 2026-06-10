// Ported from utils/vcf.ts in the Aura mobile repo, adapted to take the
// DbProfile shape returned by the get-profile Edge Function.

import type { DbProfile } from "./types";
import { socialWebUrl } from "./social";

export function generateVCF(profile: DbProfile): string {
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  lines.push(`FN:${vcfEscape(profile.name)}`);

  const parts = profile.name.trim().split(/\s+/);
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  const first = parts.length > 1 ? parts.slice(0, -1).join(" ") : parts[0];
  lines.push(`N:${vcfEscape(last)};${vcfEscape(first)};;;`);

  if (profile.company) lines.push(`ORG:${vcfEscape(profile.company)}`);
  if (profile.title) lines.push(`TITLE:${vcfEscape(profile.title)}`);

  for (const p of profile.phones ?? []) {
    lines.push(`TEL;TYPE=${phoneType(p.label)}:${p.value}`);
  }

  for (const e of profile.emails ?? []) {
    lines.push(`EMAIL;TYPE=${emailType(e.label)}:${e.value}`);
  }

  for (const w of profile.websites ?? []) {
    lines.push(`URL:${w.value}`);
  }

  for (const s of profile.social_links ?? []) {
    const url = socialWebUrl(s.platform, s.value);
    if (url) lines.push(`URL:${url}`);
  }

  for (const a of profile.addresses ?? []) {
    lines.push(`ADR;TYPE=HOME:;;${vcfEscape(a.value)};;;;`);
  }

  if (profile.avatar_url) {
    lines.push(`PHOTO;VALUE=URI:${profile.avatar_url}`);
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function vcfEscape(s: string): string {
  return s.replace(/[,;\\]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

function phoneType(label: string): string {
  if (label === "mobile") return "CELL";
  if (label === "work") return "WORK";
  if (label === "home") return "HOME";
  return "VOICE";
}

function emailType(label: string): string {
  if (label === "work") return "WORK";
  if (label === "home") return "HOME";
  return "INTERNET";
}
