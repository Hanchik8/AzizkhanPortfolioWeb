import { Link } from "react-router-dom";
import { BookOpen, Clock3, FileText, Tag } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { notes } from "@/content/notes";

const NotesPage = () => {
  const publishedCount = notes.filter((note) => note.status === "published").length;
  const draftCount = notes.length - publishedCount;
  const uniqueTags = new Set(notes.flatMap((note) => note.tags)).size;

  return (
    <SiteLayout>
      <>
        <section className="relative overflow-hidden pb-12 pt-28">
          <div className="grid-pattern absolute inset-0 opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-background" />

          <div className="container relative">
            <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card/70 p-8 backdrop-blur">
              <p className="mb-4 font-mono text-sm text-primary">/notes</p>
              <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">Notes / Blog</h1>
              <p className="max-w-3xl leading-relaxed text-muted-foreground">
                Short technical notes from projects, experiments, and lessons learned. The goal is
                to document engineering thinking in small, useful pieces instead of waiting for a
                perfect long-form article.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Notes" value={String(notes.length)} icon={FileText} />
                <StatCard label="Published" value={String(publishedCount)} icon={BookOpen} />
                <StatCard label="Drafts" value={String(draftCount)} icon={Clock3} />
                <StatCard label="Topics" value={String(uniqueTags)} icon={Tag} />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="container">
            <div className="mb-10 flex items-center gap-3">
              <span className="font-mono text-sm text-primary">01.</span>
              <h2 className="font-mono text-2xl font-bold md:text-3xl">Recent Notes</h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {notes.map((note, index) => (
                <article
                  key={note.id}
                  className="card-hover animate-fade-in rounded-xl border border-border bg-card p-6 opacity-0"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-xs text-primary/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-xs ${
                        note.status === "published"
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "border border-border bg-secondary text-muted-foreground"
                      }`}
                    >
                      {note.status}
                    </span>
                  </div>

                  <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">
                    {note.title}
                  </h3>

                  <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                    <span>{note.publishedAt}</span>
                    <span className="text-primary">|</span>
                    <span>{note.readTime}</span>
                  </div>

                  <p className="mb-4 leading-relaxed text-muted-foreground">{note.summary}</p>

                  <div className="rounded-lg border border-border/80 bg-background/40 p-4">
                    <p className="mb-2 font-mono text-xs text-primary">// key takeaways</p>
                    <ul className="space-y-2">
                      {note.keyTakeaways.map((takeaway) => (
                        <li key={takeaway} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <Link
                      to={`/notes/${note.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-primary/80"
                      aria-label={`Open note: ${note.title}`}
                    >
                      Open note
                      <span aria-hidden="true">{">"}</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </>
    </SiteLayout>
  );
};

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof FileText;
}) => {
  return (
    <div className="rounded-xl border border-border bg-background/50 p-4">
      <div className="mb-2 flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="font-mono text-xs">{label}</span>
      </div>
      <p className="font-mono text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default NotesPage;
