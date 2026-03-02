import { services } from "@/content/services";
import { useLanguage } from "@/i18n/LanguageProvider";

const servicesRuById: Record<string, { title: string; description: string; features: string[] }> = {
  "backend-development": {
    title: "Backend-разработка",
    description:
      "Разработка надежных и масштабируемых backend-систем на Java и Spring Boot: REST API, аутентификация, авторизация и бизнес-логика.",
    features: [
      "Проектирование REST API",
      "Приложения на Spring Boot",
      "Аутентификация и авторизация",
      "Реализация бизнес-логики",
    ],
  },
  microservices: {
    title: "Микросервисная архитектура",
    description:
      "Проектирование и реализация распределенных систем с микросервисными паттернами, event-driven архитектурой и межсервисным взаимодействием.",
    features: [
      "Декомпозиция сервисов",
      "Event-Driven архитектура",
      "Паттерны API Gateway",
      "Service Discovery",
    ],
  },
  "database-design": {
    title: "Проектирование БД",
    description:
      "Проектирование эффективных схем БД, оптимизация запросов и внедрение стратегий кэширования для высоконагруженных приложений.",
    features: ["Дизайн схемы БД", "Оптимизация запросов", "Кэширование Redis", "Миграции данных"],
  },
  security: {
    title: "Безопасность",
    description:
      "Реализация безопасной аутентификации и авторизации с использованием JWT, OAuth2 и практик Spring Security.",
    features: [
      "JWT-аутентификация",
      "Интеграция OAuth2",
      "Конфигурация Spring Security",
      "Security-аудит",
    ],
  },
};

const Services = () => {
  const { language } = useLanguage();

  return (
    <section id="services" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container relative">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-sm text-primary">01.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">
              {language === "ru" ? "Чем я занимаюсь" : "What I Do"}
            </h2>
          </div>
          <div className="h-px max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            const localized = servicesRuById[service.id];
            const title = language === "ru" ? localized?.title ?? service.title : service.title;
            const description =
              language === "ru" ? localized?.description ?? service.description : service.description;
            const features =
              language === "ru" ? localized?.features ?? service.features : service.features;

            return (
              <div
                key={service.id}
                className="card-hover group relative animate-fade-in overflow-hidden rounded-lg border border-border bg-card p-6 opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="mb-4 block font-mono text-xs text-primary/50">
                  {String(index + 1).padStart(2, "0")}.
                </span>

                <div className="mb-4 w-fit rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 font-mono text-xl font-semibold transition-colors group-hover:text-primary">
                  {title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">{">"}</span>
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
