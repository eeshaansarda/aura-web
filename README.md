# aura-web

The public web card for Aura — when someone scans an Aura QR code (`https://aura.bio/u/{slug}`) without the app installed, they land here: a browser-rendered business card with a one-tap **Save Contact** (vCard download).

Companion repo to the Aura mobile app. Reads profile data from the same Supabase backend via the `get-profile` Edge Function — no direct database access, no service-role key.

## Routes

| Route | Purpose |
|-------|---------|
| `/u/{slug}` | Master profile card. `?sub={profileId}` renders a subprofile. |
| `/u/{slug}/vcf` | vCard 3.0 download (honours `?sub=`). |
| `/` | Minimal landing ("Get Aura" CTA target). |

Unknown slugs return a branded 404.

## Development

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

Open `http://localhost:3000/u/<slug>` with a real slug from the `users` table.

### Environment variables

| Var | Value |
|-----|-------|
| `SUPABASE_URL` | The Supabase project URL (same as the mobile app's `EXPO_PUBLIC_SUPABASE_URL`) |
| `SUPABASE_ANON_KEY` | The publishable/anon key (same as the mobile app's `EXPO_PUBLIC_SUPABASE_ANON_KEY`) |

Both vars are server-only — nothing is exposed to the client bundle.

## Deploying to Vercel (free tier)

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo. Framework auto-detects as Next.js; no build settings needed.
3. Add the two environment variables above.
4. Deploy, then sanity-check `https://<project>.vercel.app/u/<slug>`.
5. Project → Settings → Domains → add `aura.bio`, and point DNS at Vercel (A record `76.76.21.21` or the CNAME Vercel shows). Once DNS propagates, every QR code already in the wild starts resolving — no app release required.

## Backend contract

`POST {SUPABASE_URL}/functions/v1/get-profile` with `{ slug, subId? }` → `{ profile, userSlug }` or 404. The profile shape is mirrored in [`lib/types.ts`](lib/types.ts) from the mobile repo's `types/cloud.ts` — coordinate schema changes across both repos.
