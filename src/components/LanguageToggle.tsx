import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/types";

const LANGUAGES: Language[] = ["en", "ru"];

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-full border border-border/80 bg-card/60 p-1"
      role="group"
      aria-label={language === "ru" ? "Переключатель языка" : "Language switcher"}
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={cn(
            "rounded-md px-2.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
            language === lang
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
          )}
          aria-pressed={language === lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
