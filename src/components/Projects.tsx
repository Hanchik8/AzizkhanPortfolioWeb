import { Link } from "react-router-dom";
import { ExternalLink, Github, Star } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ProjectsProps {
  sectionId?: string;
  numberLabel?: string;
  title?: string;
  description?: string;
  items?: Project[];
  showViewAllLink?: boolean;
}

const Projects = ({
  sectionId = "projects",
  numberLabel = "02.",
  title = "Featured Projects",
  description,
  items = projects,
  showViewAllLink = false,
}: ProjectsProps) => {
  const { language } = useLanguage();

  return (
    <section id={sectionId} className="relative py-24">
      <div className="container">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-sm text-primary">{numberLabel}</span>
              <h2 className="font-mono text-3xl font-bold md:text-4xl">{title}</h2>
            </div>
            <div className="h-px max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
            {description && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {description}
              </p>
            )}
          </div>

          {showViewAllLink && (
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-sm text-primary transition-colors hover:border-primary/60 hover:bg-primary/10"
            >
              {language === "ru" ? "Смотреть все проекты" : "View all projects"}
              <span aria-hidden="true">{">"}</span>
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const Icon = project.icon;
  const { language } = useLanguage();

  return (
    <div
      className="card-hover group relative flex flex-col animate-fade-in rounded-lg border border-border bg-card p-6 opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5">
          <Star className="h-3 w-3 fill-primary text-primary" aria-hidden="true" />
          <span className="font-mono text-[10px] text-primary">
            {language === "ru" ? "избранный" : "featured"}
          </span>
        </div>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex gap-2 pr-20">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              aria-label={
                language === "ru"
                  ? `Открыть ${project.title} на GitHub`
                  : `View ${project.title} on GitHub`
              }
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              aria-label={
                language === "ru" ? `Открыть демо ${project.title}` : `View ${project.title} demo`
              }
            >
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <h3 className="mb-2 font-mono text-xl font-semibold transition-colors group-hover:text-primary">
        {project.title}
      </h3>

      <p className="mb-3 font-mono text-sm text-primary">{project.subtitle}</p>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mb-4 max-h-0 space-y-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-48 group-hover:opacity-100">
        {project.highlights.slice(0, 4).map((highlight) => (
          <div key={highlight} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-primary" aria-hidden="true">
              {">"}
            </span>
            {highlight}
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-border pt-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-xs text-primary/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 font-mono text-sm text-primary transition-all hover:border-primary/50 hover:bg-primary/5"
          aria-label={
            language === "ru"
              ? `Открыть кейс по проекту ${project.title}`
              : `Open ${project.title} case study`
          }
        >
          {language === "ru" ? "Открыть кейс" : "Open case study"}
          <span aria-hidden="true">{">"}</span>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
