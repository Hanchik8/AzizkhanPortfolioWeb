import type { NoteBlock } from "@/content/notes";

export interface NoteTranslation {
  title: string;
  readTime: string;
  summary: string;
  tags: string[];
  keyTakeaways: string[];
  content: NoteBlock[];
}

export const notesRuTranslations: Record<string, NoteTranslation> = {
  "spring-security-jwt-flow": {
    title: "Spring Security + JWT: чистый auth flow для небольших проектов",
    readTime: "4 мин",
    summary:
      "Короткий чеклист по внедрению JWT-аутентификации в Spring Boot без лишнего усложнения первой версии.",
    tags: ["Spring Security", "JWT", "Backend"],
    keyTakeaways: [
      "Разделяйте ответственность за выдачу и валидацию токенов",
      "Для браузерных приложений по возможности используйте HttpOnly cookie",
      "Добавьте хотя бы один интеграционный тест полного защищенного флоу",
    ],
    content: [
      {
        type: "paragraph",
        text: "Когда я делаю небольшой проект на Spring Boot, самый быстрый способ получить ошибки в auth-модуле - смешать создание токена, валидацию, загрузку пользователя и обработку исключений в одном огромном фильтре. Формально приложение будет работать, но его станет трудно понимать и тестировать.",
      },
      { type: "heading", text: "Минимальный auth flow, которого я придерживаюсь" },
      {
        type: "list",
        items: [
          "Эндпоинт логина проверяет credentials и только выдает токен",
          "JWT utility отвечает только за подпись и expiration",
          "Фильтр извлекает токен и выставляет SecurityContext, если токен валидный",
          "Контроллеры и сервисы работают с уже разрешенной аутентификацией",
        ],
      },
      {
        type: "paragraph",
        text: "Такое разделение уменьшает сложность каждого слоя. Также в будущем легче заменить хранилище или способ передачи токена, не переписывая весь auth-пайплайн.",
      },
      { type: "heading", text: "Небольшой пример фильтра" },
      {
        type: "code",
        language: "java",
        caption: "Валидация JWT должна быть сфокусирована на контексте аутентификации",
        code: `@Override\nprotected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)\n    throws ServletException, IOException {\n  String token = tokenResolver.resolve(request);\n\n  if (token != null && jwtService.isValid(token)) {\n    Authentication auth = authFactory.fromToken(token);\n    SecurityContextHolder.getContext().setAuthentication(auth);\n  }\n\n  chain.doFilter(request, response);\n}`,
      },
      {
        type: "quote",
        text: "Если фильтр нельзя объяснить за одну минуту, скорее всего, он делает слишком много.",
      },
      {
        type: "paragraph",
        text: "Еще я всегда стараюсь добавить хотя бы один интеграционный тест на связку login -> protected endpoint. Он ловит самые важные поломки, когда позже меняется конфигурация безопасности.",
      },
    ],
  },
  "kafka-events-naming": {
    title: "Ошибки в именовании Kafka событий, которых я стараюсь избегать",
    readTime: "3 мин",
    summary:
      "Заметки об именовании топиков, версионировании событий и дисциплине payload на основе микросервисных pet-проектов.",
    tags: ["Kafka", "Microservices", "Event-Driven"],
    keyTakeaways: [
      "Называйте топики по доменной области, а не по сервису",
      "Если система будет расти, вводите версионирование событий заранее",
      "Разделяйте command-подобные сообщения и события-факты",
    ],
    content: [
      {
        type: "paragraph",
        text: "Сначала мне казалось удобным называть топики по сервисам (например, payment-service-topic). На старте это выглядело нормально, но с ростом бизнес-флоу система стала менее читаемой.",
      },
      { type: "heading", text: "Правило именования, которое лучше работает со временем" },
      {
        type: "list",
        items: [
          "Предпочитайте доменные события: order.created, order.cancelled, payment.confirmed",
          "Паблишер должен отправлять факты, а не детали внутренней реализации",
          "Избегайте расплывчатых названий вроде updates или data-sync",
        ],
      },
      {
        type: "heading",
        text: "Почему стоит рано ввести версионирование",
      },
      {
        type: "paragraph",
        text: "Даже в pet-проектах payload быстро меняется по ходу экспериментов. Если заранее добавить версию события или версионированную схему, миграции будут намного спокойнее при нескольких consumers.",
      },
      {
        type: "code",
        language: "json",
        caption: "Пример простого формата события",
        code: `{"eventType":"order.created","version":1,"occurredAt":"2026-02-05T18:42:00Z","payload":{"orderId":"123","userId":"42"}}`,
      },
      {
        type: "quote",
        text: "Хорошее имя топика должно быть понятно новому участнику команды без просмотра кода продьюсера.",
      },
    ],
  },
  "docker-compose-dev-stack": {
    title: "Docker Compose для локального backend-стека",
    readTime: "5 мин",
    summary:
      "Практичный базовый подход к запуску PostgreSQL, Redis, Kafka и сервисов локально с минимальным количеством сюрпризов.",
    tags: ["Docker", "Docker Compose", "Dev Environment"],
    keyTakeaways: [
      "Когда важен порядок запуска, используйте явные healthcheck",
      "Именуйте volume последовательно, чтобы не потерять данные случайно",
      "Держите `.env.example` синхронизированным с compose-конфигом",
    ],
    content: [
      {
        type: "paragraph",
        text: "Compose помогает быстро поднимать сложные локальные стеки, но поведение `depends_on` часто понимают неправильно. Оно не гарантирует, что зависимость уже готова принимать реальные соединения.",
      },
      { type: "heading", text: "Базовые привычки, которые экономят время" },
      {
        type: "list",
        items: [
          "Добавляйте healthcheck для баз и брокеров",
          "Используйте понятные имена сервисов, совпадающие с настройками приложения",
          "Разделяйте постоянные volume и временные локальные кэши",
          "Документируйте порты и credentials в `.env.example`",
        ],
      },
      {
        type: "heading",
        text: "Пример паттерна с healthcheck",
      },
      {
        type: "code",
        language: "yaml",
        caption: "Фрагмент Compose для readiness PostgreSQL",
        code: `postgres:\n  image: postgres:16\n  healthcheck:\n    test: ["CMD-SHELL", "pg_isready -U postgres"]\n    interval: 5s\n    timeout: 3s\n    retries: 10`,
      },
      {
        type: "paragraph",
        text: "Я также стараюсь держать compose-файл практичным. Если какой-то сервис не нужен для текущей задачи, лучше временно отключить его, чем замедлять локальный старт и усложнять логи.",
      },
    ],
  },
  "spring-boot-error-handling": {
    title: "Единый формат API-ошибок в Spring Boot",
    readTime: "4 мин",
    summary:
      "Небольшая структура для validation и business errors, чтобы клиент всегда получал предсказуемый ответ.",
    tags: ["Spring Boot", "REST API", "Validation"],
    keyTakeaways: [
      "Используйте единый envelope для всех API-ошибок",
      "Разделяйте ошибки валидации и нарушения бизнес-правил",
      "Технические детали логируйте внутри, наружу отдавайте чистые сообщения",
    ],
    content: [
      {
        type: "paragraph",
        text: "Клиентская разработка замедляется, когда каждый эндпоинт возвращает свою структуру ошибки. Даже в небольших проектах стоит сразу ввести единый API error envelope.",
      },
      { type: "heading", text: "Что я стараюсь стандартизировать" },
      {
        type: "list",
        items: [
          "HTTP status code",
          "Машиночитаемый error code",
          "Понятное сообщение для человека",
          "Опциональные field-level детали валидации",
          "Идентификатор запроса/трейса (если доступен)",
        ],
      },
      {
        type: "code",
        language: "json",
        caption: "Пример ответа при ошибке валидации",
        code: `{"code":"VALIDATION_FAILED","message":"Request validation failed","fieldErrors":[{"field":"email","message":"must be a valid email"}]}`,
      },
      {
        type: "paragraph",
        text: "Это также улучшает стратегию логирования: подробные исключения остаются во внутренних логах, а внешний формат ошибок остается стабильным и безопасным.",
      },
    ],
  },
  "lessons-from-chess-project": {
    title: "Уроки из разработки шахматного приложения (логика + безопасность)",
    readTime: "6 мин",
    summary:
      "Что я понял, когда в одном приложении пришлось соединить аутентификацию, UI-состояние и нетривиальную доменную логику.",
    tags: ["Java", "Spring", "Architecture", "Pet Project"],
    keyTakeaways: [
      "Сложную доменную логику нужно покрывать изолированными тестами как можно раньше",
      "UX аутентификации влияет на ощущение продукта сильнее, чем кажется",
      "Контроль скоупа критичен для сольных проектов",
    ],
    content: [
      {
        type: "paragraph",
        text: "Шахматный проект показал мне: приложение может быть «функционально полным», но при этом ощущаться нестабильным, если доменная логика и UI слишком связаны.",
      },
      { type: "heading", text: "Что усложнилось быстрее всего" },
      {
        type: "list",
        items: [
          "Правила валидации ходов и нестандартные edge-case",
          "Синхронизация подсветки доски и UI-состояния",
          "Поведение аутентификации/сессии во время игровых действий",
          "Сдерживание функционального скоупа при необходимости все-таки релизнуть",
        ],
      },
      {
        type: "paragraph",
        text: "Если бы я переписывал проект, я бы раньше выделил доменные тесты на корректность ходов и держал UI как слой отображения и взаимодействия, а не место, где выводятся правила.",
      },
      {
        type: "quote",
        text: "Самые сложные баги были не визуальными. Это были баги консистентности состояния и правил, спрятанные за визуальным поведением.",
      },
      {
        type: "heading",
        text: "Практический вывод для портфолио-проектов",
      },
      {
        type: "paragraph",
        text: "Pet-проект становится гораздо сильнее как портфолио-материал, когда в нем описано самое сложное инженерное решение, а не только скриншоты и бейджи стека.",
      },
    ],
  },
  "observability-next-step": {
    title: "Следующий шаг: observability для микросервисов",
    readTime: "2 мин",
    summary:
      "Черновой план по добавлению трейсов, метрик и централизованных логов в мой e-commerce микросервисный проект.",
    tags: ["Observability", "Microservices", "Draft"],
    keyTakeaways: [
      "Начинайте с request tracing, а не с погони за всеми метриками сразу",
      "Сначала определите ключевые бизнес-флоу для end-to-end наблюдения",
      "Дашборды должны отвечать на вопросы, а не быть перегруженными",
    ],
    content: [
      {
        type: "paragraph",
        text: "Это черновик. Я хочу описать observability-setup для микросервисного проекта после завершения первого полноценного этапа внедрения.",
      },
      { type: "heading", text: "Черновой план" },
      {
        type: "list",
        items: [
          "Выбрать стек для tracing + metrics + logs в локальной/dev среде",
          "Проинструментировать один checkout-флоу end-to-end",
          "Добавить propagation correlation/request id между сервисами",
          "Собрать минимальный дашборд, который отвечает на один реальный вопрос",
        ],
      },
      {
        type: "heading",
        text: "Что измерю в первую очередь",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Latency checkout-запросов по эндпоинтам",
          "Error rate в payment/order event-флоу",
          "Consumer lag и retry-поведение для критичных топиков",
        ],
      },
      {
        type: "quote",
        text: "Я хочу, чтобы observability в портфолио показывала операционное мышление, а не просто список инструментов.",
      },
    ],
  },
};
