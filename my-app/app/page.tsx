import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl bg-gradient-to-r from-pink-100 to-purple-500 bg-clip-text text-transparent">
            In&nbsp;Sync
          </h1>

          <p className="text-lg text-text-muted">
            Design formations, plan transitions, and collaborate seamlessly
            with your choreography team.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/app/sign-in"
              className="rounded-xl bg-accent px-6 py-3 text-white transition hover:bg-accent-hover"
            >
              Get Started
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-border bg-surface px-6 py-3 text-foreground transition hover:bg-surface-muted"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted/60 to-transparent" />
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <h2 className="mb-12 text-center text-3xl font-semibold">
          Choreography, without friction
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            title="Visual Formations"
            description="Lay dancers out spatially, explore spacing, and refine formations intuitively."
          />

          <FeatureCard
            title="Counts & Transitions"
            description="Track formations across counts and sections with clarity and continuity."
          />

          <FeatureCard
            title="Collaborative Editing"
            description="Work together in real time and keep your entire team aligned."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:shadow-md">
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-text-muted">{description}</p>
    </div>
  );
}
