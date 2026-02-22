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
  },
  {
    id: "lessons-from-chess-project",
    slug: "lessons-from-chess-project",
    title: "Lessons from building a chess app (logic + security)",
    publishedAt: "2026-01-12",
    readTime: "6 min",
    summary:
      "What I learned from combining authentication, UI state, and non-trivial game logic in one application.",
    tags: ["Java", "Spring", "Frontend", "Pet Project"],
    keyTakeaways: [
      "Complex domain logic deserves isolated tests early",
      "Authentication UX affects product feel more than expected",
      "Feature scope control is critical on solo projects",
    ],
    status: "published",
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
  },
];

export const getPublishedNotes = () => notes.filter((note) => note.status === "published");
export const getNoteBySlug = (slug: string) => notes.find((note) => note.slug === slug);
