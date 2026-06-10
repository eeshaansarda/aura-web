@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public web card for Aura (digital business card app). When someone scans an Aura QR code (`https://aura.bio/u/{slug}`) without the app installed, they land here. Companion to the mobile repo at `../aura`.

## Commands

```bash
npm run dev      # Next.js dev server (needs .env.local — copy .env.example)
npm run build    # Production build — also the typecheck; run before committing
```

No test framework — verify by loading `/u/<real-slug>` against production data.

## Architecture

Next.js App Router + TypeScript + Tailwind v4 (CSS-based config in `app/globals.css` via `@theme`). No UI library, no client-side data fetching — everything is server-rendered.

- `app/u/[slug]/page.tsx` — the card. Server component; `params`/`searchParams` are Promises (Next 16). `?sub={profileId}` renders a subprofile. `generateMetadata` emits og tags. Unknown slug → `notFound()`.
- `app/u/[slug]/vcf/route.ts` — vCard 3.0 download (honours `?sub=`).
- `app/page.tsx` / `app/not-found.tsx` — landing and branded 404.
- `components/profile-card.tsx` — card UI. `components/icons.tsx` — inlined Lucide stroke icons.
- `lib/profile.ts` — the ONLY data path: POST to the `get-profile` Supabase Edge Function with the anon key (`revalidate: 60`). No direct database access, no service-role key anywhere in this repo.
- `lib/types.ts` — mirrors `../aura/types/cloud.ts` (the Edge Function contract). Coordinate profile schema changes across both repos.
- `lib/vcf.ts` — port of `../aura/utils/vcf.ts`, adapted to the `DbProfile` shape.
- `lib/social.ts` — web-URL counterpart of `../aura/constants/socialPlatforms.ts` (same 5 platforms).

## Design system

Follow `../aura/DESIGN.md` exactly — tokens are defined as CSS variables in `app/globals.css` (`--color-primary` = Aura Violet `#6366f1`, `--color-background` = Morning Canvas `#f8fafc`, etc.). Inter for UI, JetBrains Mono only for technical strings (the slug URL). One Aura Violet element per screen (the Save Contact CTA). Flat-first: `shadow-sm` max, 12px card radius, hairline borders. The `.rise`/`.rise-N` classes provide the staggered load reveal (respects `prefers-reduced-motion`).

## Environment

`SUPABASE_URL`, `SUPABASE_ANON_KEY` (server-only; same values as the mobile app's `EXPO_PUBLIC_*` vars), `NEXT_PUBLIC_SITE_URL`. See `.env.example`. Deployment: Vercel free tier + `aura.bio` domain — steps in README.md.
