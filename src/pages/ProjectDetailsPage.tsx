import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import NotFound from "@/pages/NotFound";
import { getProjectById } from "@/content/projects";
import { useLanguage } from "@/i18n/LanguageProvider";

const ProjectDetailsPage = () => {
  const { language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return <NotFound />;
  }

  const Icon = project.icon;

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pb-20 pt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-background" />

        <div className="container relative">
          <div className="mb-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {language === "ru" ? "Назад к проектам" : "Back to projects"}
            </Link>
          </div>

          <div className="mb-8 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-2 font-mono text-sm text-primary">/projects/{project.id}</p>
                  <h1 className="font-mono text-3xl font-bold md:text-4xl">{project.title}</h1>
                  <p className="mt-2 font-mono text-sm text-primary">{project.subtitle}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {language === "ru" ? "Демо" : "Demo"}
                  </a>
                )}
              </div>
            </div>

            <p className="max-w-3xl leading-relaxed text-muted-foreground">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-6">
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">01.</span>
                  <h2 className="font-mono text-xl font-semibold">
                    {language === "ru" ? "Проблема" : "Problem"}
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">{project.caseStudy.problem}</p>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">02.</span>
                  <h2 className="font-mono text-xl font-semibold">
                    {language === "ru" ? "Решение" : "Solution"}
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  {project.caseStudy.solution}
                </p>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">03.</span>
                  <h2 className="font-mono text-xl font-semibold">
                    {language === "ru" ? "Архитектурные заметки" : "Architecture Notes"}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {project.caseStudy.architectureNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">04.</span>
                  <h2 className="font-mono text-xl font-semibold">
                    {language === "ru" ? "Инженерные решения" : "Engineering Decisions"}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {project.caseStudy.engineeringDecisions.map((decision) => (
                    <li key={decision} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">05.</span>
                  <h2 className="font-mono text-lg font-semibold">
                    {language === "ru" ? "Ключевые моменты" : "Highlights"}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">06.</span>
                  <h2 className="font-mono text-lg font-semibold">
                    {language === "ru" ? "Следующие шаги" : "Next Steps"}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {project.caseStudy.nextSteps.map((step) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card/70 p-6">
                <p className="mb-3 font-mono text-sm text-primary">
                  {language === "ru" ? "// Нужны детали?" : "// Want more details?"}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {language === "ru"
                    ? "На интервью или звонке могу подробно разобрать архитектурные trade-off'ы, границы сервисов и принятые решения."
                    : "I can walk through architecture tradeoffs, service boundaries, and implementation decisions during an interview or call."}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary/10"
                  >
                    {language === "ru" ? "Связаться" : "Contact me"}
                  </a>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    {language === "ru" ? "Посмотреть другие проекты" : "Browse more projects"}
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ProjectDetailsPage;
