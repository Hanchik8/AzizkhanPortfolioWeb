import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Target } from "lucide-react";
import About from "@/components/About";
import Skills from "@/components/Skills";
import SiteLayout from "@/components/SiteLayout";
import { getSiteConfig } from "@/content/siteConfig";
import { useLanguage } from "@/i18n/LanguageProvider";

const AboutPage = () => {
  const { language } = useLanguage();
  const siteConfig = getSiteConfig(language);

  const resumeCards =
    language === "ru"
      ? [
          {
            title: "Текущий фокус",
            icon: Target,
            text: "Backend-инженерия на Java и Spring Boot, а также системный дизайн и паттерны распределенных систем.",
          },
          {
            title: "Образование",
            icon: GraduationCap,
            text: `${siteConfig.education.degree} в ${siteConfig.education.university} (${siteConfig.education.years}).`,
          },
          {
            title: "Цель",
            icon: Briefcase,
            text: "Ищу стажировку, где смогу приносить пользу реальному продукту и расти как Java/Spring backend-инженер.",
          },
        ]
      : [
          {
            title: "Current Focus",
            icon: Target,
            text: "Backend engineering with Java and Spring Boot, plus system design fundamentals and distributed systems patterns.",
          },
          {
            title: "Education",
            icon: GraduationCap,
            text: `${siteConfig.education.degree} at ${siteConfig.education.university} (${siteConfig.education.years}).`,
          },
          {
            title: "Opportunity Goal",
            icon: Briefcase,
            text: "Seeking internship opportunities where I can contribute to real products and grow in Java/Spring backend engineering.",
          },
        ];

  return (
    <SiteLayout>
      <>
        <section className="relative overflow-hidden pb-10 pt-28">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-background" />

          <div className="container relative">
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 font-mono text-sm text-primary">/about</p>
              <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">
                {language === "ru" ? "Обо мне / Резюме" : "About / Resume"}
              </h1>
              <p className="max-w-3xl leading-relaxed text-muted-foreground">
                {language === "ru"
                  ? "Подробный обзор: кто я, какие системы разрабатываю и в каком направлении хочу расти как инженер. Сохранил тот же терминальный стиль, что и на главной, но в формате отдельной страницы."
                  : "A more detailed overview of who I am, what I build, and what kind of engineering work I want to grow into. I kept the same terminal-inspired visual style as the homepage, but structured it as a dedicated page."}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {resumeCards.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.title}
                      className="animate-fade-in rounded-xl border border-border bg-card p-5 opacity-0"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h2 className="font-mono text-sm font-semibold">{card.title}</h2>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Skills />
        <About />

        <section className="relative py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-sm text-primary">05.</span>
                <h2 className="font-mono text-2xl font-bold">
                  {language === "ru" ? "Следующий шаг" : "Next Step"}
                </h2>
              </div>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {language === "ru"
                  ? "Если хотите быстро оценить мой инженерный подход, начните с кейсов проектов. Там показаны архитектурные решения, trade-off'ы и детали реализации."
                  : "If you want to evaluate my work faster, start with the project case studies. They show how I think about architecture, tradeoffs, and implementation details."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary/10"
                >
                  {language === "ru" ? "Открыть архив проектов" : "Open project archive"}
                </Link>
                <a
                  href="/#contact"
                  className="inline-flex items-center rounded-lg border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {language === "ru" ? "Связаться" : "Contact me"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    </SiteLayout>
  );
};

export default AboutPage;
