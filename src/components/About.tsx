import { GraduationCap, MapPin, Calendar, Heart, Coffee } from "lucide-react";
import { siteConfig } from "@/content/siteConfig";

const About = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="container">
        {/* Section header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-sm text-primary">04.</span>
            <h2 className="font-mono text-3xl font-bold md:text-4xl">About Me</h2>
          </div>
          <div className="h-px max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bio */}
          <div className="space-y-6">
            <p className="leading-relaxed text-muted-foreground">
              Hi! I'm <span className="font-medium text-foreground">{siteConfig.name}</span>, a 2nd
              year Computer Engineering student at International Ataturk-Alatoo University in{" "}
              {siteConfig.location}. I'm passionate about building full-stack web applications.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              My journey in software development started with curiosity about how websites work.
              Today, I work with React and TypeScript on the frontend, and Java with Spring Boot on
              the backend — creating clean, maintainable code that solves real-world problems.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              I'm actively seeking internship opportunities to apply my skills in a professional
              environment. When I'm not coding, I explore new technologies and work on personal
              projects to continuously improve.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{siteConfig.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-medium text-primary">{siteConfig.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Interests */}
          <div className="space-y-6">
            {/* Education card */}
            <div className="card-hover rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-mono text-lg font-semibold">Education</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">International Ataturk-Alatoo University</p>
                  <p className="text-sm text-muted-foreground">Computer Engineering • 2nd Year</p>
                  <p className="font-mono text-xs text-primary">2024 - 2028</p>
                </div>
              </div>
            </div>

            {/* Interests card */}
            <div className="card-hover rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-mono text-lg font-semibold">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Distributed Systems",
                  "Clean Architecture",
                  "Open Source",
                  "System Design",
                  "Performance Optimization",
                  "Tech Blogs",
                ].map((interest) => (
                  <span
                    key={interest}
                    className="rounded-lg border border-border px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Fun fact */}
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4">
              <Coffee className="h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Fun fact:</span> I prefer caffeine
                pills over coffee — easier to control the dosage for those late-night coding
                sessions 💊
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
