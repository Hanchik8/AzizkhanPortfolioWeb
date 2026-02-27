import { services } from "@/content/services";

const Services = () => {
  return (
    <section id="services" className="relative py-24">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container relative">
        {/* Section header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-sm text-primary">01.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">What I Do</h2>
          </div>
          <div className="h-px max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="card-hover group relative animate-fade-in overflow-hidden rounded-lg border border-border bg-card p-6 opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Top accent line on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Number badge */}
                <span className="mb-4 block font-mono text-xs text-primary/50">
                  {String(index + 1).padStart(2, "0")}.
                </span>

                {/* Icon */}
                <div className="mb-4 w-fit rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-mono text-xl font-semibold transition-colors group-hover:text-primary">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
