import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

type NavItem =
  | { type: "route"; label: string; to: string; end?: boolean; group?: "primary" | "secondary" }
  | { type: "anchor"; label: string; href: string; group?: "primary" | "secondary" };

const navItemsConfig: NavItem[] = [
  { type: "anchor", label: "Services", href: "/#services" },
  { type: "route", label: "Projects", to: "/projects" },
  { type: "anchor", label: "Skills", href: "/#skills" },
  { type: "route", label: "About", to: "/about" },
  { type: "anchor", label: "Contact", href: "/#contact" },
  { type: "route", label: "Notes", to: "/notes", group: "secondary" },
  { type: "route", label: "Now", to: "/now", group: "secondary" },
];

const primaryNavItems = navItemsConfig.filter((item) => item.group !== "secondary");
const secondaryNavItems = navItemsConfig.filter((item) => item.group === "secondary");

const desktopItemClass =
  "group flex items-center font-mono text-sm text-muted-foreground transition-colors hover:text-foreground";
const desktopSecondaryItemClass =
  "rounded-md px-2.5 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary";
const mobileItemClass =
  "flex items-center py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const renderDesktopItem = (item: NavItem, variant: "primary" | "secondary" = "primary") => {
    const itemClass = variant === "secondary" ? desktopSecondaryItemClass : desktopItemClass;

    if (item.type === "anchor") {
      return (
        <a key={item.label} href={item.href} className={itemClass}>
          <span className="transition-colors group-hover:text-primary">{item.label}</span>
        </a>
      );
    }

    return (
      <NavLink
        key={item.label}
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
          cn(
            itemClass,
            variant === "primary" && isActive && "text-foreground",
            variant === "primary" && isActive && "[&_span:last-child]:text-primary",
            variant === "secondary" && isActive && "bg-primary/10 text-primary",
          )
        }
      >
        <span className="transition-colors group-hover:text-primary">{item.label}</span>
      </NavLink>
    );
  };

  const renderMobileItem = (item: NavItem) => {
    if (item.type === "anchor") {
      return (
        <a
          key={item.label}
          href={item.href}
          onClick={() => setIsOpen(false)}
          className={mobileItemClass}
          role="menuitem"
        >
          <span>{item.label}</span>
        </a>
      );
    }

    return (
      <NavLink
        key={item.label}
        to={item.to}
        end={item.end}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) => cn(mobileItemClass, isActive && "text-foreground")}
        role="menuitem"
      >
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-lg" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-mono text-lg font-semibold">
            <Terminal className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-foreground">azizkhan</span>
            <span className="text-primary">.dev</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-6">
              {primaryNavItems.map((item) => renderDesktopItem(item))}
            </div>

            {secondaryNavItems.length > 0 && (
              <>
                <div className="h-5 w-px bg-border/80" aria-hidden="true" />
                <div className="flex items-center gap-1 rounded-full border border-border/80 bg-card/60 p-1">
                  {secondaryNavItems.map((item) => renderDesktopItem(item, "secondary"))}
                </div>
              </>
            )}

            <div className="h-5 w-px bg-border/80" aria-hidden="true" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            id="mobile-menu"
            className="animate-fade-in border-t border-border py-4 md:hidden"
            role="menu"
          >
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-mono text-xs text-primary/80">// navigation</p>
                <div className="flex flex-col gap-2">
                  {primaryNavItems.map((item) => renderMobileItem(item))}
                </div>
              </div>

              {secondaryNavItems.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="mb-2 font-mono text-xs text-primary/80">// pages</p>
                  <div className="flex flex-col gap-2">
                    {secondaryNavItems.map((item) => renderMobileItem(item))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
