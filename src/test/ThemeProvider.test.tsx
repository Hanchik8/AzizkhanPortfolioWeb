import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../components/ThemeProvider";
import { useTheme } from "../components/theme-context";

// Test component to access theme context
const TestComponent = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  it("provides default system theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    // Default is "system" when no localStorage value
    expect(screen.getByTestId("current-theme")).toHaveTextContent("system");
  });

  it("can set light theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Set Light"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  it("can set dark theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Set Dark"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("applies theme class to document root", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Set to light
    fireEvent.click(screen.getByText("Set Light"));
    expect(document.documentElement.classList.contains("light")).toBe(true);

    // Set to dark
    fireEvent.click(screen.getByText("Set Dark"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("falls back to system theme when localStorage access fails", () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage access denied");
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("system");
    getItemSpy.mockRestore();
  });

  it("supports legacy matchMedia listeners", () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();

    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener,
        removeListener,
        dispatchEvent: () => true,
      }),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(addListener).toHaveBeenCalledTimes(1);

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
  });
});
