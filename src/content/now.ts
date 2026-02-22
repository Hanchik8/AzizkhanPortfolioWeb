export const nowContent = {
  updatedAt: "2026-02-22",
  headline: "Backend-focused learning phase with stronger system design fundamentals.",
  summary:
    "Right now I am focused on improving backend engineering depth (Spring Boot, security, distributed systems) while keeping enough frontend skill to ship polished full-stack portfolio and pet projects.",
  currentFocus: [
    "Spring Security internals and cleaner auth architecture",
    "Kafka patterns for event-driven flows and failure handling",
    "System design fundamentals: tradeoffs, bottlenecks, consistency",
    "Writing clearer project case studies and technical notes",
  ],
  learningQueue: [
    {
      title: "Observability basics for microservices",
      why: "I want project demos to show not only features, but also operational thinking (traces, metrics, logs).",
      status: "next",
    },
    {
      title: "Testing strategy for distributed systems",
      why: "I want better confidence beyond unit tests: integration, contract, and end-to-end flow checks.",
      status: "active",
    },
    {
      title: "Performance profiling for Java services",
      why: "I want to reason about slow endpoints with data, not guesses.",
      status: "next",
    },
  ] as const,
  buildingNow: [
    "Expanding this portfolio into a multi-page site with project case studies",
    "Improving project documentation to better communicate architecture decisions",
    "Creating short notes/blog entries from real project lessons",
  ],
  internshipGoals: [
    "Join a team where code reviews and engineering standards are taken seriously",
    "Work on backend APIs, data models, and integration-heavy features",
    "Learn from production-grade debugging and deployment practices",
  ],
  notDoingNow: [
    "Chasing too many frameworks at once",
    "Over-designing pet projects before shipping a usable version",
    "Writing long blog posts when a short technical note is enough",
  ],
} as const;
