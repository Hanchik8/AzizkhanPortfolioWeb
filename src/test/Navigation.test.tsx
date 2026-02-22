import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../components/Navigation";

// Mock ThemeToggle to simplify tests
vi.mock("../components/ThemeToggle", () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

describe("Navigation", () => {
  const renderNavigation = (route = "/") =>
    render(
      <MemoryRouter initialEntries={[route]}>
        <Navigation />
      </MemoryRouter>,
    );

  it("renders the logo", () => {
    renderNavigation();
    expect(screen.getByText("azizkhan")).toBeInTheDocument();
    expect(screen.getByText(".dev")).toBeInTheDocument();
  });

  it("renders all navigation items on desktop", () => {
    renderNavigation();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("has correct navigation links", () => {
    renderNavigation();
    const servicesLinks = screen.getAllByText("Services");
    expect(servicesLinks[0].closest("a")).toHaveAttribute("href", "#services");
  });

  it("has accessible navigation role", () => {
    renderNavigation();
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Main navigation");
  });

  it("toggles mobile menu on button click", () => {
    renderNavigation();
    const menuButton = screen.getByLabelText("Open menu");

    fireEvent.click(menuButton);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes mobile menu on Escape key", () => {
    renderNavigation();
    const menuButton = screen.getByLabelText("Open menu");

    fireEvent.click(menuButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders theme toggle", () => {
    renderNavigation();
    expect(screen.getAllByTestId("theme-toggle").length).toBeGreaterThan(0);
  });
});
