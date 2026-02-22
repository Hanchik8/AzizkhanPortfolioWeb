import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, FileText, Tag } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import NotFound from "@/pages/NotFound";
import { getNoteBySlug, notes } from "@/content/notes";

const NoteDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const note = slug ? getNoteBySlug(slug) : undefined;

  if (!note) {
    return <NotFound />;
  }

  const relatedNotes = notes
    .filter((candidate) => candidate.slug !== note.slug)
    .filter((candidate) => candidate.tags.some((tag) => note.tags.includes(tag)))
    .slice(0, 3);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pb-20 pt-28">
        <div className="grid-pattern absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-background" />

        <div className="container relative">
          <div className="mb-6">
            <Link
              to="/notes"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to notes
            </Link>
          </div>

          <div className="mb-8 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="font-mono text-sm text-primary">/notes/{note.slug}</p>
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

            <h1 className="mb-4 max-w-4xl font-mono text-3xl font-bold md:text-4xl">{note.title}</h1>
            <p className="max-w-3xl leading-relaxed text-muted-foreground">{note.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {note.publishedAt}
              </span>
              <span className="text-primary">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {note.readTime}
              </span>
              <span className="text-primary">|</span>
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Technical note
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">01.</span>
                  <h2 className="font-mono text-xl font-semibold">Key Takeaways</h2>
                </div>
                <ul className="space-y-2">
                  {note.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">02.</span>
                  <h2 className="font-mono text-xl font-semibold">Article Body</h2>
                </div>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  This page is already wired for detailed note content, but the full article text is
                  intentionally left for later. For now, this acts as a structured note detail page
                  with summary + takeaways + related topics.
                </p>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="mb-2 font-mono text-xs text-primary">// ready for future content</p>
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    When you are ready, expand the corresponding entry in
                    <code className="mx-1 rounded bg-background px-1.5 py-0.5 text-xs">
                      src/content/notes.ts
                    </code>
                    (or move notes into markdown/MDX later).
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>Problem / context</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>What you tried / decision made</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>Tradeoffs / mistakes / lessons</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 font-mono text-xs text-primary">{">"}</span>
                      <span>Reference links or code snippets</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">03.</span>
                  <h2 className="font-mono text-xl font-semibold">Why This Note Matters</h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Short notes make the portfolio look active and engineering-focused. They also show
                  how you think, not just what you built. Even compact notes like this are useful
                  when recruiters or engineers want to assess your technical maturity quickly.
                </p>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Tag className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-mono text-lg font-semibold">Metadata</h2>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-3">
                    <span>Status</span>
                    <span className="font-mono text-foreground">{note.status}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Published</span>
                    <span className="font-mono text-foreground">{note.publishedAt}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Read Time</span>
                    <span className="font-mono text-foreground">{note.readTime}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span>Slug</span>
                    <code className="rounded bg-background px-2 py-1 font-mono text-xs text-foreground">
                      {note.slug}
                    </code>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">04.</span>
                  <h2 className="font-mono text-lg font-semibold">Related Notes</h2>
                </div>

                {relatedNotes.length > 0 ? (
                  <div className="space-y-3">
                    {relatedNotes.map((related) => (
                      <Link
                        key={related.slug}
                        to={`/notes/${related.slug}`}
                        className="block rounded-lg border border-border bg-background/40 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <p className="mb-1 font-mono text-sm text-foreground">{related.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {related.publishedAt} | {related.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Add more notes with overlapping tags to populate related entries here.
                  </p>
                )}
              </section>

              <section className="rounded-xl border border-border bg-card/70 p-6">
                <p className="mb-2 font-mono text-xs text-primary">// next improvement</p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Later, this page can render markdown/MDX notes while keeping the same shell and
                  metadata blocks.
                </p>
                <Link
                  to="/notes"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary/10"
                >
                  Back to all notes
                  <span aria-hidden="true">{">"}</span>
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NoteDetailsPage;
