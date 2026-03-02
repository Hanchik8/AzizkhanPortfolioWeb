import { Github, Linkedin, Send, Heart, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { getSiteConfig } from "@/content/siteConfig";
import { useLanguage } from "@/i18n/LanguageProvider";

const Footer = () => {
  const { language } = useLanguage();
  const siteConfig = getSiteConfig(language);
  const footerLinks =
    language === "ru"
      ? [
          { label: "Проекты", to: "/projects" },
          { label: "Обо мне", to: "/about" },
          { label: "Заметки", to: "/notes" },
          { label: "Сейчас", to: "/now" },
        ]
      : [
          { label: "Projects", to: "/projects" },
          { label: "About", to: "/about" },
          { label: "Notes", to: "/notes" },
          { label: "Now", to: "/now" },
        ];

  return (
    <footer className="border-t border-border">
      <div className="container py-10">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="mb-3 flex items-center gap-2 font-mono text-base font-semibold">
              <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-foreground">azizkhan</span>
              <span className="text-primary">.dev</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "ru"
                ? `${siteConfig.title} из ${siteConfig.location}. Разрабатываю Java/Spring backend-системы с чистой и поддерживаемой архитектурой.`
                : `${siteConfig.title} based in ${siteConfig.location}. Building Java/Spring backend systems with clean, maintainable code.`}
            </p>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-primary">
              {language === "ru" ? "// страницы" : "// pages"}
            </p>
            <nav aria-label={language === "ru" ? "Навигация в футере" : "Footer navigation"}>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-primary">
              {language === "ru" ? "// контакты" : "// connect"}
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border p-2 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border p-2 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border p-2 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">{siteConfig.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 md:flex-row">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="font-mono text-sm">{language === "ru" ? "Сделано" : "Built with"}</span>
            <Heart className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
            <span className="font-mono text-sm">
              {language === "ru" ? `автор: ${siteConfig.name}` : `by ${siteConfig.name}`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground/60">
              Java | Spring Boot | PostgreSQL | Kafka
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              (c) {new Date().getFullYear()} azizkhan.dev
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
