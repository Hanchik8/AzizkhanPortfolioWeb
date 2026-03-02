import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero";

describe("Hero", () => {
  it("renders the name", () => {
    render(<Hero />);
    expect(screen.getByText(/Azizkhan/i)).toBeInTheDocument();
    expect(screen.getByText(/Nurlanov/i)).toBeInTheDocument();
  });

  it("renders the title/tagline", () => {
    render(<Hero />);
    const elements = screen.getAllByText(/Java\s*\/\s*Spring Developer/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it("has social links", () => {
    render(<Hero />);
    const githubLink = screen.getByLabelText(/github/i);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", expect.stringContaining("github.com"));
  });

  it("displays location", () => {
    render(<Hero />);
    expect(screen.getByText(/Bishkek/i)).toBeInTheDocument();
  });

  it("displays student status", () => {
    render(<Hero />);
    expect(screen.getByText(/2nd Year Student/i)).toBeInTheDocument();
  });
});
