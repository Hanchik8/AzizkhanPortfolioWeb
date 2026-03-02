import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Terminal from "@/components/Terminal";
import SiteLayout from "@/components/SiteLayout";
import { getFeaturedProjects } from "@/content/projects";
import { useLanguage } from "@/i18n/LanguageProvider";

const Index = () => {
  const { language } = useLanguage();

  return (
    <SiteLayout>
      <>
        <Hero />
        <Services />
        <Projects
          items={getFeaturedProjects()}
          showViewAllLink
          title={language === "ru" ? "Избранные проекты" : "Featured Projects"}
          description={
            language === "ru"
              ? "Избранные Java/Spring backend-проекты. Откройте кейс, чтобы посмотреть архитектурные решения, trade-off'ы и следующие шаги."
              : "Selected Java/Spring backend projects. Open a case study for architecture decisions, tradeoffs, and next steps."
          }
        />
        <Skills />
        <About />
        <Contact />
        <Terminal />
      </>
    </SiteLayout>
  );
};

export default Index;
