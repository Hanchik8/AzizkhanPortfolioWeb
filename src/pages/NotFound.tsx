import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { useLanguage } from "@/i18n/LanguageProvider";

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <SiteLayout>
      <section className="flex min-h-[70vh] items-center justify-center px-4 pt-28">
        <div className="text-center">
          <h1 className="mb-4 font-mono text-6xl font-bold text-primary">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            {language === "ru" ? "Упс! Страница не найдена" : "Oops! Page not found"}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary underline transition-colors hover:text-primary/90"
          >
            {language === "ru" ? "Вернуться на главную" : "Return to Home"}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
