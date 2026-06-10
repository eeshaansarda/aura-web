import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfile } from "@/lib/profile";
import { ProfileCard } from "@/components/profile-card";
import { TrackVisit } from "@/components/track-visit";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const { sub } = await searchParams;
  const data = await getProfile(slug, sub);

  if (!data) return { title: "Card not found — Aura" };

  const { profile } = data;
  const subtitle = [profile.title, profile.company].filter(Boolean).join(", ");
  return {
    title: `${profile.name} — Aura`,
    description: subtitle
      ? `${profile.name} · ${subtitle}`
      : `${profile.name}'s card on Aura`,
    openGraph: {
      title: profile.name,
      description: subtitle || "Digital business card on Aura",
      ...(profile.avatar_url ? { images: [profile.avatar_url] } : {}),
    },
  };
}

export default async function CardPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sub } = await searchParams;
  const data = await getProfile(slug, sub);

  if (!data) notFound();

  const { profile, userSlug } = data;
  const vcfHref = `/u/${userSlug}/vcf${sub ? `?sub=${encodeURIComponent(sub)}` : ""}`;
  // Vercel system env (e.g. "aura-web-xi.vercel.app"); aura.bio once the domain is attached
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "aura.bio";

  return (
    <main className="relative flex flex-1 flex-col items-center px-5 py-12 sm:py-20">
      {/* Quiet violet atmosphere behind the card — tonal, not decorative. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,#eef2ff_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <TrackVisit slug={userSlug} sub={sub} />
        <ProfileCard profile={profile} vcfHref={vcfHref} />

        <footer className="rise rise-3 mt-10 flex flex-col items-center gap-3">
          <p className="font-mono text-[13px] text-muted-foreground">
            {host}/u/{userSlug}
          </p>
          <Link
            href="/"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Get Aura — remember how you met
          </Link>
        </footer>
      </div>
    </main>
  );
}
