import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-20">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Aura" className="rise rise-1 size-16 rounded-xl shadow-sm" />

        <h1 className="rise rise-2 mt-8 text-2xl font-bold tracking-tight text-foreground">
          This card doesn&apos;t exist
        </h1>

        <p className="rise rise-3 mt-3 text-sm leading-relaxed text-muted-foreground">
          The link may be mistyped, or the card was removed by its owner.
        </p>

        <Link
          href="/"
          className="rise rise-4 mt-8 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-primary-pressed"
        >
          Get Aura
        </Link>
      </div>
    </main>
  );
}
