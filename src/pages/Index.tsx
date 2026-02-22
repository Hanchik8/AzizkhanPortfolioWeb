import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Terminal from "@/components/Terminal";
import SiteLayout from "@/components/SiteLayout";
import { getFeaturedProjects } from "@/content/projects";

const Index = () => {
  return (
    <SiteLayout>
      <>
        <Hero />
        <Services />
        <Projects
          items={getFeaturedProjects()}
          showViewAllLink
          description="Selected backend and full-stack projects. Open a case study for architecture decisions, challenges, and next steps."
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
