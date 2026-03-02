import { GraduationCap, MapPin, Calendar, Heart, Coffee } from "lucide-react";
import { getSiteConfig } from "@/content/siteConfig";
import { useLanguage } from "@/i18n/LanguageProvider";

const About = () => {
  const { language } = useLanguage();
  const siteConfig = getSiteConfig(language);

  const interests =
    language === "ru"
      ? [
          "Распределенные системы",
          "Чистая архитектура",
          "Open Source",
          "System Design",
          "Оптимизация производительности",
          "Технические блоги",
        ]
      : [
          "Distributed Systems",
          "Clean Architecture",
          "Open Source",
          "System Design",
          "Performance Optimization",
          "Tech Blogs",
        ];

  return (
    <section id="about" className="relative py-24">
      <div className="container">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-sm text-primary">04.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">
              {language === "ru" ? "Обо мне" : "About Me"}
            </h2>
          </div>
          <div className="h-px max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            {language === "ru" ? (
              <>
                <p className="leading-relaxed text-muted-foreground">
                  Привет! Я <span className="font-medium text-foreground">{siteConfig.name}</span>,
                  студент 2 курса по направлению {siteConfig.education.degree} в {siteConfig.education.university} (
                  {siteConfig.location}). Мой основной фокус - Java и Spring backend-разработка.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Путь в разработке начался с интереса к тому, как работают продукты "под капотом".
                  Сейчас я в первую очередь строю backend-сервисы на Java и Spring Boot: проектирую
                  API, безопасность и бизнес-логику. React/TypeScript использую как поддерживающий
                  слой для UI.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Ищу стажировку, где смогу работать с production backend-системами, расти в
                  инженерной среде с сильным code review и развиваться как Java/Spring инженер.
                </p>
              </>
            ) : (
              <>
                <p className="leading-relaxed text-muted-foreground">
                  Hi! I&apos;m <span className="font-medium text-foreground">{siteConfig.name}</span>, a
                  2nd year Computer Engineering student at {siteConfig.education.university} in{" "}
                  {siteConfig.location}. I am focused on Java and Spring backend development.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  My journey in software development started with curiosity about how products work
                  behind the scenes. Today, I mainly build backend services with Java and Spring
                  Boot: API design, security, and business logic. I still use React and TypeScript
                  when a project needs a clear UI.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  I am actively seeking internship opportunities where I can contribute to production
                  backend systems, learn from strong code review culture, and keep improving as a
                  Java/Spring engineer.
                </p>
              </>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === "ru" ? "Локация" : "Location"}
                  </p>
                  <p className="text-sm font-medium">{siteConfig.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === "ru" ? "Статус" : "Status"}
                  </p>
                  <p className="text-sm font-medium text-primary">{siteConfig.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-hover rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-mono text-lg font-semibold">
                  {language === "ru" ? "Образование" : "Education"}
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">{siteConfig.education.university}</p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.education.degree} -{" "}
                    {language === "ru" ? "2 курс" : "2nd Year"}
                  </p>
                  <p className="font-mono text-xs text-primary">{siteConfig.education.years}</p>
                </div>
              </div>
            </div>

            <div className="card-hover rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-mono text-lg font-semibold">
                  {language === "ru" ? "Интересы" : "Interests"}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-lg border border-border px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4">
              <Coffee className="h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {language === "ru" ? "Факт:" : "Fun fact:"}
                </span>{" "}
                {language === "ru"
                  ? "предпочитаю кофеиновый шот вместо кофе, потому что так проще контролировать дозировку во время длительных сессий отладки."
                  : "I prefer caffeine pills over coffee because dosage is easier to control during long debugging sessions."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
