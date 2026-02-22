import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Projects from "../components/Projects";

describe("Projects", () => {
  const renderProjects = () =>
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );

  it("renders the section heading", () => {
    renderProjects();
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
  });

  it("renders all project cards", () => {
    renderProjects();
    expect(screen.getByText("MegaSegaShop")).toBeInTheDocument();
    expect(screen.getByText("Web Chess")).toBeInTheDocument();
    expect(screen.getByText("Desktop File Explorer")).toBeInTheDocument();
  });

  it("has project descriptions", () => {
    renderProjects();
    expect(screen.getByText(/Microservices E-Commerce/i)).toBeInTheDocument();
  });

  it("has projects section with id", () => {
    renderProjects();
    const section = document.getElementById("projects");
    expect(section).toBeInTheDocument();
  });

  it("renders GitHub links for projects", () => {
    renderProjects();
    const githubLinks = screen.getAllByLabelText(/view.*on github/i);
    expect(githubLinks.length).toBeGreaterThan(0);
  });
});
