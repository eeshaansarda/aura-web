export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-5 py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,#eef2ff_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative flex max-w-md flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Aura" className="rise rise-1 size-16 rounded-xl shadow-sm" />

        <h1 className="rise rise-2 mt-8 text-3xl font-bold tracking-tight text-foreground">
          Aura remembers how you met.
        </h1>

        <p className="rise rise-3 mt-4 text-sm leading-relaxed text-muted-foreground">
          Digital business cards with the context that makes connections
          memorable — who, where, and why you connected.
        </p>

        <p className="rise rise-4 mt-10 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
          Coming soon to iOS and Android
        </p>
      </div>
    </main>
  );
}
