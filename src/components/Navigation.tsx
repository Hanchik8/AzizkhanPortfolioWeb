import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

type NavItem =
  | { type: "route"; label: string; to: string; end?: boolean }
  | { type: "anchor"; label: string; href: string };

const homeNavItems: NavItem[] = [
  { type: "anchor", label: "Services", href: "#services" },
  { type: "route", label: "Projects", to: "/projects" },
  { type: "route", label: "Notes", to: "/notes" },
  { type: "route", label: "Now", to: "/now" },
  { type: "anchor", label: "Skills", href: "#skills" },
  { type: "route", label: "About", to: "/about" },
  { type: "anchor", label: "Contact", href: "#contact" },
];

const innerPageNavItems: NavItem[] = [
  { type: "route", label: "Home", to: "/", end: true },
  { type: "route", label: "Projects", to: "/projects" },
  { type: "route", label: "Notes", to: "/notes" },
  { type: "route", label: "Now", to: "/now" },
  { type: "route", label: "About", to: "/about" },
  { type: "anchor", label: "Contact", href: "/#contact" },
];

const desktopItemClass =
  "group flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground";
const mobileItemClass =
  "flex items-center gap-2 py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = useMemo(
    () => (location.pathname === "/" ? homeNavItems : innerPageNavItems),
    [location.pathname],
  );

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

  const renderDesktopItem = (item: NavItem, index: number) => {
    if (item.type === "anchor") {
      return (
        <a key={item.label} href={item.href} className={desktopItemClass}>
          <span className="text-xs text-primary">0{index + 1}.</span>
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
          cn(desktopItemClass, isActive && "text-foreground", isActive && "[&_span:last-child]:text-primary")
        }
      >
        <span className="text-xs text-primary">0{index + 1}.</span>
        <span className="transition-colors group-hover:text-primary">{item.label}</span>
      </NavLink>
    );
  };

  const renderMobileItem = (item: NavItem, index: number) => {
    if (item.type === "anchor") {
      return (
        <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className={mobileItemClass} role="menuitem">
          <span className="text-xs text-primary">0{index + 1}.</span>
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
        <span className="text-xs text-primary">0{index + 1}.</span>
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
            {navItems.map((item, index) => renderDesktopItem(item, index))}
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
          <div id="mobile-menu" className="animate-fade-in border-t border-border py-4 md:hidden" role="menu">
            <div className="flex flex-col gap-4">{navItems.map((item, index) => renderMobileItem(item, index))}</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
