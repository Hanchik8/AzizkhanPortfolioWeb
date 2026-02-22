import { Server, Crown, Folder, type LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
  icon: LucideIcon;
  github?: string;
  demo?: string;
  featured: boolean;
  caseStudy: {
    problem: string;
    solution: string;
    architectureNotes: string[];
    engineeringDecisions: string[];
    nextSteps: string[];
  };
}

export const projects: Project[] = [
  {
    id: "megasegashop",
    title: "MegaSegaShop",
    subtitle: "Microservices E-Commerce Platform",
    description:
      "Full-featured e-commerce platform built on microservices architecture with Spring Boot 3 and Spring Cloud. Demonstrates modern approaches to distributed systems development.",
    techStack: [
      "Java 21",
      "Spring Boot 3.3",
      "Spring Cloud",
      "PostgreSQL",
      "Redis",
      "Apache Kafka",
      "Docker",
    ],
    highlights: [
      "9 Microservices Architecture",
      "Saga Pattern with Compensating Transactions",
      "Event-Driven Architecture via Kafka",
      "CQRS Pattern Implementation",
      "Pessimistic Locking for Race Conditions",
      "JWT Authentication via API Gateway",
    ],
    icon: Server,
    github: "https://github.com/Hanchik8/MegaSegaShop_MicroServices",
    featured: true,
    caseStudy: {
      problem:
        "Build an e-commerce platform that can grow in complexity without turning into a monolith, while handling orders, inventory, and payments as separate concerns.",
      solution:
        "Implemented a Spring Boot + Spring Cloud microservices system with event-driven communication via Kafka, API Gateway for entry, and distributed transaction coordination using Saga-style compensations.",
      architectureNotes: [
        "9 services split by business domain responsibilities",
        "API Gateway as a single public entry point",
        "Kafka topics for async domain events and state propagation",
        "PostgreSQL per service boundary to reduce coupling",
        "Redis used for caching and performance-sensitive reads",
      ],
      engineeringDecisions: [
        "Used CQRS in read-heavy flows to keep write models simple",
        "Applied pessimistic locking to reduce race conditions around stock/order updates",
        "JWT auth centralized through gateway to avoid duplicated auth logic",
        "Used compensating actions for failure recovery in distributed order flows",
      ],
      nextSteps: [
        "Add observability stack (tracing, metrics, centralized logs)",
        "Introduce contract tests between services",
        "Add load testing scenarios for checkout peaks",
      ],
    },
  },
  {
    id: "web-chess",
    title: "Web Chess",
    subtitle: "Full-Stack Chess Application",
    description:
      "Full-featured web application for playing chess with registration, authorization, and user statistics. Backend on Java Spring Boot with Spring Security, frontend on HTML/CSS/Vanilla JS.",
    techStack: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "JavaScript", "HTML/CSS"],
    highlights: [
      "Custom Remember Me Implementation",
      "HttpOnly Cookie Security",
      "JWT Token Authentication",
      "Full Chess Game Logic",
      "Move Validation & Check/Checkmate",
      "Interactive Board with Highlights",
    ],
    icon: Crown,
    github: "https://github.com/Hanchik8/FSD_Project",
    featured: true,
    caseStudy: {
      problem:
        "Create a full chess web app with secure authentication and correct game mechanics, including move validation and check/checkmate logic.",
      solution:
        "Built a Spring Boot backend with Spring Security and PostgreSQL, then implemented an interactive frontend for board rendering, move highlighting, and player interactions.",
      architectureNotes: [
        "Spring Boot backend for auth, users, and game state operations",
        "Spring Security for authentication/authorization flows",
        "PostgreSQL persistence for users and match-related data",
        "Vanilla JS frontend for board interaction and move visualization",
      ],
      engineeringDecisions: [
        "Implemented custom Remember Me behavior to control session UX",
        "Used HttpOnly cookies to reduce token exposure in the browser",
        "Separated move validation logic from UI interactions",
        "Handled check/checkmate validation to ensure game rules integrity",
      ],
      nextSteps: [
        "Add real-time multiplayer via WebSocket",
        "Improve game history and replay UX",
        "Introduce ELO/ranking progression and matchmaking",
      ],
    },
  },
  {
    id: "file-explorer",
    title: "Desktop File Explorer",
    subtitle: "MVC-Based System Tool",
    description:
      "Desktop application for file management built with Java Swing/AWT following MVC architecture pattern.",
    techStack: ["Java", "Swing", "AWT", "MVC Pattern"],
    highlights: [
      "Recursive File Search",
      "File Manipulation Logic",
      "MVC Architecture",
      "Cross-Platform Desktop App",
    ],
    icon: Folder,
    github: "https://github.com/Hanchik8/File_Explorer_Java",
    featured: false,
    caseStudy: {
      problem:
        "Build a desktop file management tool that is easy to maintain and extend while keeping UI behavior separate from file-system logic.",
      solution:
        "Implemented a Java Swing/AWT desktop app using MVC, with recursive file search and reusable file manipulation operations organized by responsibility.",
      architectureNotes: [
        "MVC separation between UI views, controllers, and file logic",
        "Java Swing/AWT desktop interface for cross-platform usage",
        "Recursive traversal for search across nested directories",
      ],
      engineeringDecisions: [
        "Kept file operations independent from UI widgets to improve testability",
        "Structured controllers around user actions (search, browse, manipulate)",
        "Used MVC to make future UI changes safer",
      ],
      nextSteps: [
        "Add file previews and bulk operations",
        "Improve error handling around permissions and locked files",
        "Add keyboard shortcuts for power-user workflows",
      ],
    },
  },
];

export const getFeaturedProjects = (): Project[] => projects.filter((p) => p.featured);
export const getAllProjects = (): Project[] => projects;
export const getProjectById = (id: string): Project | undefined => projects.find((p) => p.id === id);
