import { type ReactNode } from "react";
import { Code2, Layers, Database, Lightbulb, Monitor } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: string[];
  size: "large" | "medium" | "small";
}

const skillCategoriesEn: SkillCategory[] = [
  {
    title: "Languages",
    icon: <Code2 className="h-5 w-5" />,
    skills: ["Java 17/21", "Core Java", "Stream API", "Multithreading", "TypeScript", "JavaScript"],
    size: "large",
  },
  {
    title: "Backend Frameworks",
    icon: <Layers className="h-5 w-5" />,
    skills: [
      "Spring Boot 3.3",
      "Spring Security",
      "Spring Data JPA",
      "Spring Cloud",
      "Spring MVC",
    ],
    size: "large",
  },
  {
    title: "Supporting Frontend",
    icon: <Monitor className="h-5 w-5" />,
    skills: ["React 18", "TypeScript", "Tailwind CSS", "React Router", "React Hook Form", "Vite"],
    size: "medium",
  },
  {
    title: "Infrastructure",
    icon: <Database className="h-5 w-5" />,
    skills: ["Docker", "PostgreSQL", "Apache Kafka", "Redis", "Maven", "Docker Compose"],
    size: "medium",
  },
  {
    title: "Concepts",
    icon: <Lightbulb className="h-5 w-5" />,
    skills: ["REST API", "SOLID", "JWT", "Microservices", "CQRS", "Event-Driven"],
    size: "medium",
  },
];

const skillCategoriesRu: SkillCategory[] = [
  { ...skillCategoriesEn[0], title: "Языки" },
  { ...skillCategoriesEn[1], title: "Backend-фреймворки" },
  { ...skillCategoriesEn[2], title: "Поддерживающий frontend" },
  { ...skillCategoriesEn[3], title: "Инфраструктура" },
  { ...skillCategoriesEn[4], title: "Концепции" },
];

const Skills = () => {
  const { language } = useLanguage();
  const skillCategories = language === "ru" ? skillCategoriesRu : skillCategoriesEn;

  return (
    <section id="skills" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container relative">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-sm text-primary">03.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">
              {language === "ru" ? "Навыки и технологии" : "Skills & Technologies"}
            </h2>
          </div>
          <div className="h-px max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card/50 p-6">
          <h4 className="mb-4 font-mono text-sm text-primary">
            {language === "ru" ? "// Дополнительно работал с" : "// Also experienced with"}
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              "Netflix Eureka",
              "Spring Cloud Gateway",
              "Feign Client",
              "Saga Pattern",
              "Pessimistic Locking",
              "JWT Authentication",
              "Event-Driven Architecture",
              "Docker Compose",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const sizeClasses: Record<SkillCategory["size"], string> = {
  large: "lg:col-span-2 lg:row-span-2",
  medium: "lg:col-span-2",
  small: "",
};

const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  return (
    <div
      className={`card-hover animate-fade-in rounded-lg border border-border bg-card p-6 opacity-0 ${sizeClasses[category.size]}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">{category.icon}</div>
        <h3 className="font-mono text-lg font-semibold">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <div
            key={skill}
            className="group relative cursor-default rounded-lg border border-border bg-secondary px-3 py-2 transition-all hover:border-primary/50"
          >
            <span className="font-mono text-sm text-foreground transition-colors group-hover:text-primary">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
