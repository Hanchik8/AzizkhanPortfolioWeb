import Projects from "@/components/Projects";
import SiteLayout from "@/components/SiteLayout";
import { getAllProjects, getFeaturedProjects } from "@/content/projects";

const ProjectsPage = () => {
  const allProjects = getAllProjects();
  const featuredCount = getFeaturedProjects().length;

  return (
    <SiteLayout>
      <>
        <section className="relative overflow-hidden pb-12 pt-28">
          <div className="grid-pattern absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />

          <div className="container relative">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/60 p-8 backdrop-blur">
              <p className="mb-4 font-mono text-sm text-primary">/projects</p>
              <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">Project Archive</h1>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                A deeper look at the systems and applications I have built. Each project includes
                stack choices, technical highlights, and a dedicated case study page.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-lg border border-border bg-background/60 px-4 py-2">
                  <span className="font-mono text-xs text-muted-foreground">Total Projects</span>
                  <p className="font-mono text-lg text-foreground">{allProjects.length}</p>
                </div>
                <div className="rounded-lg border border-border bg-background/60 px-4 py-2">
                  <span className="font-mono text-xs text-muted-foreground">Featured</span>
                  <p className="font-mono text-lg text-primary">{featuredCount}</p>
                </div>
                <div className="rounded-lg border border-border bg-background/60 px-4 py-2">
                  <span className="font-mono text-xs text-muted-foreground">Focus</span>
                  <p className="font-mono text-lg text-foreground">Java / Spring / Systems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Projects
          sectionId="projects-archive"
          numberLabel="01."
          title="All Projects"
          description="Open any card to view the case study page with architecture notes, engineering decisions, and future improvements."
          items={allProjects}
        />
      </>
    </SiteLayout>
  );
};

export default ProjectsPage;
