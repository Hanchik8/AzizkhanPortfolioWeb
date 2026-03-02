import { Github, Linkedin, Send, MapPin, ChevronDown } from "lucide-react";
import { getSiteConfig } from "@/content/siteConfig";
import { useLanguage } from "@/i18n/LanguageProvider";

const Hero = () => {
  const { language } = useLanguage();
  const siteConfig = getSiteConfig(language);
  const [firstName, ...rest] = siteConfig.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="grid-pattern absolute inset-0 opacity-50" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Radial glow behind content */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="mx-auto max-w-4xl">
          {/* Status badge */}
          <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-sm text-primary">
              {language === "ru" ? "Статус:" : "Status:"} {siteConfig.status}
            </span>
          </div>

          {/* Name */}
          <h1 className="mb-4 animate-fade-in font-mono text-5xl font-bold opacity-0 delay-100 md:text-7xl">
            <span className="text-foreground">{firstName}</span>
            <span className="text-primary"> {lastName}</span>
          </h1>

          {/* Title */}
          <h2 className="mb-6 animate-fade-in font-mono text-xl text-muted-foreground opacity-0 delay-200 md:text-2xl">
            <span className="text-primary">&gt;</span> {siteConfig.title}{" "}
            <span className="text-primary">|</span> {siteConfig.tagline}
          </h2>

          {/* Brief */}
          <p className="mb-8 max-w-2xl animate-fade-in text-lg leading-relaxed text-muted-foreground opacity-0 delay-300 md:text-xl">
            {siteConfig.description}
          </p>

          {/* Location */}
          <div className="delay-400 mb-8 flex animate-fade-in items-center gap-2 text-muted-foreground opacity-0">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-mono text-sm">{siteConfig.location}</span>
          </div>

          {/* CTA + Social links */}
          <div className="flex animate-fade-in flex-wrap gap-4 opacity-0 delay-500">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-primary/25"
            >
              {language === "ru" ? "Связаться" : "Get in touch"}
              <span aria-hidden="true">{">"}</span>
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
              aria-label={language === "ru" ? "Открыть профиль GitHub" : "Visit GitHub profile"}
            >
              <Github
                className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
              <span className="font-mono text-sm">GitHub</span>
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
              aria-label={language === "ru" ? "Открыть профиль LinkedIn" : "Visit LinkedIn profile"}
            >
              <Linkedin
                className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
              <span className="font-mono text-sm">LinkedIn</span>
            </a>
            <a
              href={siteConfig.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-5 py-3 transition-all duration-300 hover:bg-primary/20"
              aria-label={language === "ru" ? "Написать в Telegram" : "Contact via Telegram"}
            >
              <Send className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="font-mono text-sm text-primary">Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Scroll indicator */}
      <a
        href="/#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60 transition-colors hover:text-primary"
        aria-label={language === "ru" ? "Прокрутить к следующей секции" : "Scroll to next section"}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          {language === "ru" ? "вниз" : "scroll"}
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
