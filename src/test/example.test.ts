import { describe, it, expect } from "vitest";
import { projects, getFeaturedProjects, getProjectById } from "../content/projects";
import { notes, getPublishedNotes, getNoteBySlug } from "../content/notes";

describe("projects content", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.techStack.length).toBeGreaterThan(0);
      expect(project.caseStudy).toBeDefined();
    }
  });

  it("getFeaturedProjects returns only featured projects", () => {
    const featured = getFeaturedProjects();
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it("getProjectById returns correct project", () => {
    const first = projects[0];
    expect(getProjectById(first.id)).toEqual(first);
  });

  it("getProjectById returns undefined for unknown id", () => {
    expect(getProjectById("non-existent-id")).toBeUndefined();
  });
});

describe("notes content", () => {
  it("has at least one note", () => {
    expect(notes.length).toBeGreaterThan(0);
  });

  it("each note has required fields", () => {
    for (const note of notes) {
      expect(note.id).toBeTruthy();
      expect(note.slug).toBeTruthy();
      expect(note.title).toBeTruthy();
      expect(note.tags.length).toBeGreaterThan(0);
    }
  });

  it("getPublishedNotes returns only published notes", () => {
    const published = getPublishedNotes();
    expect(published.every((n) => n.status === "published")).toBe(true);
  });

  it("getNoteBySlug returns correct note", () => {
    const first = notes[0];
    expect(getNoteBySlug(first.slug)).toEqual(first);
  });

  it("note slug matches id for consistent routing", () => {
    for (const note of notes) {
      expect(note.slug).toBe(note.id);
    }
  });
});
