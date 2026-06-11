import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfile } from "@/lib/profile";
import { ProfileCard } from "@/components/profile-card";
import { TrackVisit } from "@/components/track-visit";

interface Props {
  params: Promise<{ id: string }>;
  // Legacy ?sub= links carried the profile id in the query — honour it.
  searchParams: Promise<{ sub?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const { sub } = await searchParams;
  const data = await getProfile(sub ?? id);

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
  const { id } = await params;
  const { sub } = await searchParams;
  const profileId = sub ?? id;
  const data = await getProfile(profileId);

  if (!data) notFound();

  const { profile } = data;
  const vcfHref = `/u/${profileId}/vcf`;

  return (
    <main className="relative flex flex-1 flex-col items-center px-5 py-12 sm:py-20">
      {/* Quiet violet atmosphere behind the card — tonal, not decorative. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,#eef2ff_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <TrackVisit profileId={profileId} />
        <ProfileCard profile={profile} vcfHref={vcfHref} />

        <footer className="rise rise-3 mt-10 flex flex-col items-center gap-3">
          <p className="font-mono text-[13px] text-muted-foreground tracking-wide">
            aura.bio
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
