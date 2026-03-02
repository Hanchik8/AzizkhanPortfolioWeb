import type { Language } from "@/i18n/types";
import { notesRuTranslations } from "@/content/notesTranslations";

export type NoteBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; code: string; caption?: string }
  | { type: "quote"; text: string };

export interface NotePost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  tags: string[];
  keyTakeaways: string[];
  status: "published" | "draft";
  content: NoteBlock[];
}

export const notes: NotePost[] = [
  {
    id: "spring-security-jwt-flow",
    slug: "spring-security-jwt-flow",
    title: "Spring Security + JWT: clean auth flow for small projects",
    publishedAt: "2026-02-10",
    readTime: "4 min",
    summary:
      "A compact checklist for implementing JWT auth in Spring Boot without overengineering the first version.",
    tags: ["Spring Security", "JWT", "Backend"],
    keyTakeaways: [
      "Keep token issuing and validation responsibilities separate",
      "Prefer HttpOnly cookies when possible for browser apps",
      "Write one integration test for the protected endpoint flow",
    ],
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "When I build a smaller Spring Boot project, the fastest way to create auth-related bugs is to mix token creation, validation, user lookup, and exception handling inside one huge filter. The project still 'works', but it becomes hard to reason about and hard to test.",
      },
      { type: "heading", text: "Minimal auth flow I try to keep" },
      {
        type: "list",
        items: [
          "Login endpoint authenticates credentials and issues token only",
          "JWT utility validates signature/expiration only",
          "Filter extracts token and sets SecurityContext when valid",
          "Controllers/services assume auth is already resolved",
        ],
      },
      {
        type: "paragraph",
        text: "This separation keeps each layer smaller. It also makes it easier to replace storage or token transport later without rewriting the whole flow.",
      },
      { type: "heading", text: "Small filter example" },
      {
        type: "code",
        language: "java",
        caption: "JWT validation stays focused on request auth context",
        code: `@Override\nprotected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)\n    throws ServletException, IOException {\n  String token = tokenResolver.resolve(request);\n\n  if (token != null && jwtService.isValid(token)) {\n    Authentication auth = authFactory.fromToken(token);\n    SecurityContextHolder.getContext().setAuthentication(auth);\n  }\n\n  chain.doFilter(request, response);\n}`,
      },
      {
        type: "quote",
        text: "If the filter is hard to explain in one minute, it is probably doing too much.",
      },
      {
        type: "paragraph",
        text: "I also like adding one integration test that covers login -> protected endpoint. It catches the most important breakages when auth configuration changes later.",
      },
    ],
  },
  {
    id: "kafka-events-naming",
    slug: "kafka-events-naming",
    title: "Kafka event naming mistakes I want to avoid",
    publishedAt: "2026-02-05",
    readTime: "3 min",
    summary:
      "Notes on topic names, event versioning, and payload discipline from building microservices pet projects.",
    tags: ["Kafka", "Microservices", "Event-Driven"],
    keyTakeaways: [
      "Use domain-focused topic names, not service names",
      "Version event schemas early if the system will grow",
      "Distinguish command-like messages from facts/events",
    ],
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "My first instinct was naming topics after services (for example, payment-service-topic). That looked convenient at first but made the system harder to understand as business flows grew.",
      },
      { type: "heading", text: "Naming rule that reads better later" },
      {
        type: "list",
        items: [
          "Prefer domain events such as order.created, order.cancelled, payment.confirmed",
          "Let producers publish facts, not internal implementation details",
          "Avoid vague names like updates or data-sync",
        ],
      },
      {
        type: "heading",
        text: "Why versioning early is worth it",
      },
      {
        type: "paragraph",
        text: "Even in pet projects, payloads change quickly while experimenting. Adding a simple version field or versioned schema naming early reduces painful migrations when multiple consumers depend on the same event.",
      },
      {
        type: "code",
        language: "json",
        caption: "A simple event payload shape I prefer",
        code: `{"eventType":"order.created","version":1,"occurredAt":"2026-02-05T18:42:00Z","payload":{"orderId":"123","userId":"42"}}`,
      },
      {
        type: "quote",
        text: "A good topic name should make sense to a new teammate without opening producer code first.",
      },
    ],
  },
  {
    id: "docker-compose-dev-stack",
    slug: "docker-compose-dev-stack",
    title: "Docker Compose setup for local backend stacks",
    publishedAt: "2026-01-28",
    readTime: "5 min",
    summary:
      "A practical baseline for spinning up PostgreSQL, Redis, Kafka, and app services locally with fewer surprises.",
    tags: ["Docker", "Docker Compose", "Dev Environment"],
    keyTakeaways: [
      "Use explicit healthchecks when service startup order matters",
      "Name volumes consistently to avoid accidental data loss",
      "Keep `.env.example` synced with compose defaults",
    ],
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "Compose helps me start complex local stacks quickly, but the default 'depends_on' behavior is often misunderstood. It does not mean the dependency is ready to accept real connections.",
      },
      { type: "heading", text: "Baseline habits that save time" },
      {
        type: "list",
        items: [
          "Add healthchecks for databases and brokers",
          "Use clear service names that match app configuration",
          "Separate persistent volumes from throwaway local caches",
          "Document ports and credentials in `.env.example`",
        ],
      },
      {
        type: "heading",
        text: "Example healthcheck pattern",
      },
      {
        type: "code",
        language: "yaml",
        caption: "Compose snippet for PostgreSQL readiness",
        code: `postgres:\n  image: postgres:16\n  healthcheck:\n    test: ["CMD-SHELL", "pg_isready -U postgres"]\n    interval: 5s\n    timeout: 3s\n    retries: 10`,
      },
      {
        type: "paragraph",
        text: "I also keep the compose file practical. If a service is not needed for the task I am working on, I would rather disable it than make local startup slower and noisier.",
      },
    ],
  },
  {
    id: "spring-boot-error-handling",
    slug: "spring-boot-error-handling",
    title: "Consistent API error responses in Spring Boot",
    publishedAt: "2026-01-21",
    readTime: "4 min",
    summary:
      "A small structure for validation errors and business errors so the frontend receives predictable responses.",
    tags: ["Spring Boot", "REST API", "Validation"],
    keyTakeaways: [
      "Use a single envelope shape for API errors",
      "Separate validation failures from domain rule violations",
      "Log internal context, but return clean messages",
    ],
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "Client-side work becomes slower when every endpoint returns a different error shape. Even simple projects benefit from one predictable API error envelope.",
      },
      { type: "heading", text: "What I try to standardize" },
      {
        type: "list",
        items: [
          "HTTP status code",
          "Machine-readable error code",
          "Human-readable message",
          "Optional field-level validation details",
          "Request trace identifier (when available)",
        ],
      },
      {
        type: "code",
        language: "json",
        caption: "Validation error example",
        code: `{"code":"VALIDATION_FAILED","message":"Request validation failed","fieldErrors":[{"field":"email","message":"must be a valid email"}]}`,
      },
      {
        type: "paragraph",
        text: "This also improves logging strategy: detailed exceptions stay in logs, while client-facing messages remain stable and safe.",
      },
    ],
  },
  {
    id: "lessons-from-chess-project",
    slug: "lessons-from-chess-project",
    title: "Lessons from building a chess app (logic + security)",
    publishedAt: "2026-01-12",
    readTime: "6 min",
    summary:
      "What I learned from combining authentication, UI state, and non-trivial game logic in one application.",
    tags: ["Java", "Spring", "Architecture", "Pet Project"],
    keyTakeaways: [
      "Complex domain logic deserves isolated tests early",
      "Authentication UX affects product feel more than expected",
      "Feature scope control is critical on solo projects",
    ],
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "The chess project taught me that a product can be 'feature complete' and still feel unstable if domain logic and UI interactions are too tightly coupled.",
      },
      { type: "heading", text: "What got complicated fast" },
      {
        type: "list",
        items: [
          "Move validation rules and edge cases",
          "Board highlighting and UI state synchronization",
          "Authentication/session behavior during game actions",
          "Keeping feature scope realistic while still shipping",
        ],
      },
      {
        type: "paragraph",
        text: "If I rebuild the project, I would define domain tests for move legality earlier and treat the UI as a rendering/client interaction layer instead of the place where rules are inferred.",
      },
      {
        type: "quote",
        text: "The hardest bugs were not visual. They were state and rule consistency bugs hiding behind visual behavior.",
      },
      {
        type: "heading",
        text: "Practical lesson for portfolio projects",
      },
      {
        type: "paragraph",
        text: "Pet projects become much stronger portfolio material when they include a short explanation of the hardest engineering decision, not only screenshots and stack badges.",
      },
    ],
  },
  {
    id: "observability-next-step",
    slug: "observability-next-step",
    title: "Next thing I want to add: observability for microservices",
    publishedAt: "2026-02-18",
    readTime: "2 min",
    summary:
      "Draft outline for adding tracing, metrics, and centralized logs to my e-commerce microservices project.",
    tags: ["Observability", "Microservices", "Draft"],
    keyTakeaways: [
      "Start with request tracing before chasing every metric",
      "Define key business flows to observe end-to-end",
      "Keep dashboards useful, not just crowded",
    ],
    status: "draft",
    content: [
      {
        type: "paragraph",
        text: "This is a draft note. I want to document an observability setup for my microservices project once I complete the first implementation pass.",
      },
      { type: "heading", text: "Draft outline" },
      {
        type: "list",
        items: [
          "Choose tracing + metrics + log stack for local/dev setup",
          "Instrument one checkout flow end-to-end",
          "Add correlation/request id propagation between services",
          "Create a minimal dashboard that answers one real question",
        ],
      },
      {
        type: "heading",
        text: "What I will measure first",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Checkout request latency by endpoint",
          "Error rate for payment/order event flows",
          "Consumer lag / retry behavior for critical topics",
        ],
      },
      {
        type: "quote",
        text: "I want observability in the portfolio to show operational thinking, not just another tool list.",
      },
    ],
  },
];

export const getPublishedNotes = () => notes.filter((note) => note.status === "published");
export const getNoteBySlug = (slug: string) => notes.find((note) => note.slug === slug);

const localizeNote = (note: NotePost, language: Language): NotePost => {
  if (language !== "ru") {
    return note;
  }

  const translation = notesRuTranslations[note.slug];
  if (!translation) {
    return note;
  }

  return {
    ...note,
    title: translation.title,
    readTime: translation.readTime,
    summary: translation.summary,
    tags: translation.tags,
    keyTakeaways: translation.keyTakeaways,
    content: translation.content,
  };
};

export const getLocalizedNotes = (language: Language): NotePost[] =>
  notes.map((note) => localizeNote(note, language));

export const getLocalizedNoteBySlug = (slug: string, language: Language): NotePost | undefined => {
  const note = getNoteBySlug(slug);
  return note ? localizeNote(note, language) : undefined;
};
