import type { DbProfile, LabelledValue } from "@/lib/types";
import { socialLabel, socialWebUrl } from "@/lib/social";
import {
  ArrowUpRightIcon,
  ContactIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ContactRow({
  icon,
  value,
  label,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <span className="text-sm text-foreground min-w-0 break-words">
        {value}
      </span>
      <span className="ml-auto shrink-0 text-xs font-medium tracking-wide text-muted-foreground">
        {label}
      </span>
    </>
  );
  const rowClass = "flex items-center gap-3 px-6 py-3";

  if (href) {
    return (
      <a href={href} className={`${rowClass} hover:bg-muted transition-colors`}>
        {body}
      </a>
    );
  }
  return <div className={rowClass}>{body}</div>;
}

export function ProfileCard({
  profile,
  vcfHref,
}: {
  profile: DbProfile;
  vcfHref: string;
}) {
  const phones = profile.phones ?? [];
  const emails = profile.emails ?? [];
  const websites = profile.websites ?? [];
  const addresses = profile.addresses ?? [];
  const socials = (profile.social_links ?? []).filter((s) =>
    socialWebUrl(s.platform, s.value),
  );
  const hasRows =
    phones.length + emails.length + websites.length + addresses.length > 0;

  return (
    <div className="rise rise-1 w-full rounded-xl border border-border bg-surface shadow-sm">
      {/* Identity block */}
      <div className="flex items-center gap-4 px-6 py-6">
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar_url}
            alt=""
            className="size-16 shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent-tint text-lg font-semibold text-primary">
            {initials(profile.name)}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground">
            {profile.name}
          </h1>
          {(profile.title || profile.company) && (
            <p className="mt-1 text-xs font-semibold text-primary">
              {[profile.title, profile.company].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>

      {hasRows && (
        <div className="border-t border-border py-2">
          {phones.map((p: LabelledValue) => (
            <ContactRow
              key={p.id}
              icon={<PhoneIcon />}
              value={p.value}
              label={p.label}
              href={`tel:${p.value.replace(/[^\d+]/g, "")}`}
            />
          ))}
          {emails.map((e: LabelledValue) => (
            <ContactRow
              key={e.id}
              icon={<MailIcon />}
              value={e.value}
              label={e.label}
              href={`mailto:${e.value}`}
            />
          ))}
          {websites.map((w: LabelledValue) => (
            <ContactRow
              key={w.id}
              icon={<GlobeIcon />}
              value={w.value.replace(/^https?:\/\//, "")}
              label={w.label}
              href={w.value.startsWith("http") ? w.value : `https://${w.value}`}
            />
          ))}
          {addresses.map((a: LabelledValue) => (
            <ContactRow
              key={a.id}
              icon={<MapPinIcon />}
              value={a.value}
              label={a.label}
            />
          ))}
        </div>
      )}

      {socials.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-border px-6 py-4">
          {socials.map((s) => (
            <a
              key={`${s.platform}-${s.value}`}
              href={socialWebUrl(s.platform, s.value)!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              {socialLabel(s.platform)}
              <ArrowUpRightIcon className="size-3 text-muted-foreground" />
            </a>
          ))}
        </div>
      )}

      <div className="border-t border-border p-4">
        <a
          href={vcfHref}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-primary-pressed"
        >
          <ContactIcon className="size-4" />
          Save Contact
        </a>
      </div>
    </div>
  );
}
