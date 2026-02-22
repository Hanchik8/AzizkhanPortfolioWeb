import { Briefcase, Compass, Gauge, Goal, Layers3, Rocket } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { nowContent } from "@/content/now";

const statusStyles = {
  active: "border border-primary/30 bg-primary/10 text-primary",
  next: "border border-border bg-secondary text-muted-foreground",
} as const;

const NowPage = () => {
  return (
    <SiteLayout>
      <>
        <section className="relative overflow-hidden pb-12 pt-28">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-background" />

          <div className="container relative">
            <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-8">
              <p className="mb-4 font-mono text-sm text-primary">/now</p>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h1 className="font-mono text-4xl font-bold md:text-5xl">Now / Learning</h1>
                <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
                  Updated: {nowContent.updatedAt}
                </span>
              </div>
              <p className="mb-4 text-lg text-foreground">{nowContent.headline}</p>
              <p className="max-w-3xl leading-relaxed text-muted-foreground">{nowContent.summary}</p>
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-6">
                <Panel
                  number="01."
                  title="Current Focus"
                  icon={Compass}
                  items={nowContent.currentFocus}
                />

                <section className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-sm text-primary">02.</span>
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Layers3 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-mono text-xl font-semibold">Learning Queue</h2>
                  </div>

                  <div className="space-y-4">
                    {nowContent.learningQueue.map((item) => (
                      <div key={item.title} className="rounded-lg border border-border/80 bg-background/40 p-4">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-mono text-sm font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-1 font-mono text-xs ${statusStyles[item.status]}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <Panel
                  number="03."
                  title="Building Right Now"
                  icon={Rocket}
                  items={nowContent.buildingNow}
                />
              </div>

              <aside className="space-y-6">
                <Panel
                  number="04."
                  title="Internship Goals"
                  icon={Briefcase}
                  items={nowContent.internshipGoals}
                />

                <Panel
                  number="05."
                  title="What I Avoid"
                  icon={Gauge}
                  items={nowContent.notDoingNow}
                />

                <section className="rounded-xl border border-border bg-card/70 p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Goal className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-mono text-lg font-semibold">Why This Page Exists</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    This page helps visitors see what I am actively learning and building right now,
                    not only what I already finished. It keeps the portfolio feeling alive.
                  </p>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </>
    </SiteLayout>
  );
};

const Panel = ({
  number,
  title,
  icon: Icon,
  items,
}: {
  number: string;
  title: string;
  icon: typeof Compass;
  items: readonly string[];
}) => {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-sm text-primary">{number}</span>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="font-mono text-xl font-semibold">{title}</h2>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground">
            <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NowPage;
