import type { Language } from "@/i18n/types";

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    telegram: string;
  };
  status: string;
  education: {
    university: string;
    degree: string;
    years: string;
    currentYear: number;
  };
}

const sharedConfig = {
  name: "Azizkhan Nurlanov",
  url: "https://azizkhan.dev",
  email: "Azizkhan1232281@gmail.com",
  social: {
    github: "https://github.com/Hanchik8",
    linkedin: "https://www.linkedin.com/in/azizkhan-nurlanov-382135345/",
    telegram: "https://t.me/Hanchik_8",
  },
  education: {
    years: "2024 - 2028",
    currentYear: 2,
  },
} as const;

const localizedSiteConfig: Record<Language, SiteConfig> = {
  en: {
    ...sharedConfig,
    title: "Java / Spring Developer",
    tagline: "Backend Engineering Focus",
    description:
      "Java/Spring Developer and 2nd year Computer Engineering student at IAU. I build backend services, secure APIs, and microservice systems with Spring Boot.",
    location: "Bishkek, Kyrgyzstan",
    status: "2nd Year Student - Open to Java/Spring Internships",
    education: {
      ...sharedConfig.education,
      university: "IAU",
      degree: "Computer Engineering",
    },
  },
  ru: {
    ...sharedConfig,
    name: "Нурланов Азизхан",
    title: "Java / Spring разработчик",
    tagline: "Фокус на backend-разработке",
    description:
      "Java/Spring разработчик и студент 2 курса по направлению Компьютерная инженерия в Международном Университете Ала-Тоо. Разрабатываю backend-сервисы, безопасные API и микросервисные системы на Spring Boot.",
    location: "Бишкек, Кыргызстан",
    status: "Студент 2 курса - открыт к Java/Spring стажировкам",
    education: {
      ...sharedConfig.education,
      university: "Международный Университет Ала-Тоо",
      degree: "Компьютерная инженерия",
    },
  },
};

export const getSiteConfig = (language: Language): SiteConfig => localizedSiteConfig[language];

export const siteConfig = localizedSiteConfig.en;
