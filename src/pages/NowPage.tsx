import { Briefcase, Compass, Gauge, Goal, Layers3, Rocket } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { nowContent } from "@/content/now";
import { useLanguage } from "@/i18n/LanguageProvider";

const statusStyles = {
  active: "border border-primary/30 bg-primary/10 text-primary",
  next: "border border-border bg-secondary text-muted-foreground",
} as const;

const NowPage = () => {
  const { language } = useLanguage();

  const localized =
    language === "ru"
      ? {
          updatedLabel: "Обновлено",
          pageTitle: "Сейчас / Обучение",
          headline: "Сфокусирован на backend-развитии и системном дизайне.",
          summary:
            "Сейчас усиливаю backend-навыки (Spring Boot, безопасность, распределенные системы), а frontend использую как поддерживающий слой для портфолио и демо.",
          currentFocusTitle: "Текущий фокус",
          learningQueueTitle: "Очередь обучения",
          buildingNowTitle: "Что делаю сейчас",
          internshipGoalsTitle: "Цели стажировки",
          notDoingNowTitle: "Чего избегаю",
          whyTitle: "Зачем нужна эта страница",
          whyText:
            "Эта страница показывает, что я изучаю и строю прямо сейчас, а не только уже завершенные задачи. Так портфолио остается живым.",
          statusActive: "активно",
          statusNext: "следом",
          currentFocus: [
            "Углубляюсь в Spring Security и более чистую архитектуру авторизации",
            "Изучаю Kafka-паттерны для event-driven потоков и обработки сбоев",
            "Прокачиваю системный дизайн: trade-off'ы, узкие места, консистентность",
            "Улучшаю технические кейсы и заметки по проектам",
          ],
          learningQueue: [
            {
              title: "Базовая observability для микросервисов",
              why: "Хочу, чтобы демо показывали не только фичи, но и операционное мышление (трейсы, метрики, логи).",
              status: "next" as const,
            },
            {
              title: "Стратегия тестирования распределенных систем",
              why: "Нужна уверенность не только в unit-тестах: integration, contract и e2e проверки.",
              status: "active" as const,
            },
            {
              title: "Профилирование производительности Java-сервисов",
              why: "Хочу объяснять медленные эндпоинты на основе данных, а не предположений.",
              status: "next" as const,
            },
          ],
          buildingNow: [
            "Развиваю это портфолио в полноценный многостраничный сайт с кейсами проектов",
            "Улучшаю документацию проектов для понятной передачи архитектурных решений",
            "Пишу короткие технические заметки на основе реальных уроков из проектов",
          ],
          internshipGoals: [
            "Попасть в команду, где серьезно относятся к code review и инженерным стандартам",
            "Работать над backend API, моделями данных и интеграционными сценариями",
            "Учиться production-подходам к дебагу и деплою",
          ],
          notDoingNow: [
            "Не распыляюсь на слишком много фреймворков одновременно",
            "Не переусложняю pet-проекты до релиза рабочей версии",
            "Не откладываю публикацию из-за желания писать только длинные статьи",
          ],
        }
      : {
          updatedLabel: "Updated",
          pageTitle: "Now / Learning",
          headline: nowContent.headline,
          summary: nowContent.summary,
          currentFocusTitle: "Current Focus",
          learningQueueTitle: "Learning Queue",
          buildingNowTitle: "Building Right Now",
          internshipGoalsTitle: "Internship Goals",
          notDoingNowTitle: "What I Avoid",
          whyTitle: "Why This Page Exists",
          whyText:
            "This page helps visitors see what I am actively learning and building right now, not only what I already finished. It keeps the portfolio feeling alive.",
          statusActive: "active",
          statusNext: "next",
          currentFocus: nowContent.currentFocus,
          learningQueue: nowContent.learningQueue,
          buildingNow: nowContent.buildingNow,
          internshipGoals: nowContent.internshipGoals,
          notDoingNow: nowContent.notDoingNow,
        };

  return (
    <SiteLayout>
      <>
        <section className="relative overflow-hidden pb-12 pt-28">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-background" />

          <div className="container relative">
            <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-8">
              <p className="mb-4 font-mono text-sm text-primary">/now</p>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h1 className="font-mono text-4xl font-bold md:text-5xl">{localized.pageTitle}</h1>
                <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
                  {localized.updatedLabel}: {nowContent.updatedAt}
                </span>
              </div>
              <p className="mb-4 text-lg text-foreground">{localized.headline}</p>
              <p className="max-w-3xl leading-relaxed text-muted-foreground">{localized.summary}</p>
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-6">
                <Panel
                  number="01."
                  title={localized.currentFocusTitle}
                  icon={Compass}
                  items={localized.currentFocus}
                />

                <section className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-sm text-primary">02.</span>
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Layers3 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-mono text-xl font-semibold">{localized.learningQueueTitle}</h2>
                  </div>

                  <div className="space-y-4">
                    {localized.learningQueue.map((item) => (
                      <div key={item.title} className="rounded-lg border border-border/80 bg-background/40 p-4">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-mono text-sm font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-1 font-mono text-xs ${statusStyles[item.status]}`}
                          >
                            {item.status === "active" ? localized.statusActive : localized.statusNext}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <Panel
                  number="03."
                  title={localized.buildingNowTitle}
                  icon={Rocket}
                  items={localized.buildingNow}
                />
              </div>

              <aside className="space-y-6">
                <Panel
                  number="04."
                  title={localized.internshipGoalsTitle}
                  icon={Briefcase}
                  items={localized.internshipGoals}
                />

                <Panel
                  number="05."
                  title={localized.notDoingNowTitle}
                  icon={Gauge}
                  items={localized.notDoingNow}
                />

                <section className="rounded-xl border border-border bg-card/70 p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Goal className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-mono text-lg font-semibold">{localized.whyTitle}</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{localized.whyText}</p>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </>
    </SiteLayout>
  );
};

const Panel = ({
  number,
  title,
  icon: Icon,
  items,
}: {
  number: string;
  title: string;
  icon: typeof Compass;
  items: readonly string[];
}) => {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-sm text-primary">{number}</span>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="font-mono text-xl font-semibold">{title}</h2>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground">
            <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NowPage;
