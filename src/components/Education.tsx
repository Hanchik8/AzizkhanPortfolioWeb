import { GraduationCap, Globe, MapPin, Calendar } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="relative py-24">
      <div className="container">
        {/* Section header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-sm text-primary">04.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">Education & Info</h2>
          </div>
          <div className="h-px max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Education card */}
          <div className="card-hover animate-fade-in rounded-lg border border-border bg-card p-6 opacity-0 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-mono text-xl font-semibold">
                  IAU
                </h3>
                <p className="mb-2 font-mono text-sm text-primary">Computer Engineering</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>2024 - 2028 (2nd year)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>Bishkek, Kyrgyzstan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages card */}
          <div className="card-hover animate-fade-in rounded-lg border border-border bg-card p-6 opacity-0 delay-100">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="font-mono text-lg font-semibold">Languages</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Russian</span>
                <span className="rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                  Native
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">English</span>
                <span className="rounded bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">
                  B1 - Technical Docs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
