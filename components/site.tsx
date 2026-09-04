"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Cloud,
  Code2,
  Database,
  Globe2,
  Layers3,
  Linkedin,
  Menu,
  Moon,
  Network,
  Radar,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import type { IconName } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const props = { size, strokeWidth: 1.8 };
  const icons: Record<IconName, ReactNode> = {
    spark: <Sparkles {...props} />,
    code: <Code2 {...props} />,
    cloud: <Cloud {...props} />,
    layers: <Layers3 {...props} />,
    shield: <ShieldCheck {...props} />,
    radar: <Radar {...props} />,
    database: <Database {...props} />,
    globe: <Globe2 {...props} />,
    network: <Network {...props} />,
  };
  return icons[name];
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Antitude home">
      <span className="brand-mark"><Sparkles size={18} /></span>
      <span className="brand-copy">
        <strong style={light ? { color: "white" } : undefined}>Antitude</strong>
        <small>Enterprise partner</small>
      </span>
    </Link>
  );
}

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="lang-pill" role="group" aria-label="Language selector">
      <button
        className={`lang-pill-option${locale === "en" ? " active" : ""}`}
        type="button"
        onClick={() => setLocale("en")}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        className={`lang-pill-option${locale === "ar" ? " active" : ""}`}
        type="button"
        onClick={() => setLocale("ar")}
        aria-label="Switch to Arabic"
        aria-pressed={locale === "ar"}
      >
        AR
      </button>
    </div>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("antitude-theme") === "dark";
    setDark(saved);
    document.documentElement.dataset.theme = saved ? "dark" : "light";
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("antitude-theme", next ? "dark" : "light");
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }

  return (
    <button className="button ghost" onClick={toggle} aria-label="Toggle color theme" style={{ minHeight: 40, padding: "0 10px" }}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname.startsWith("/admin")) return null;
  const links = [
    ["Services", "/services"],
    ["Technologies", "/technologies"],
    ["Solutions", "/solutions"],
    ["Examples", "/examples"],
    ["About us", "/about"],
    ["Contact us", "/contact"],
  ];

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="shell navbar">
        <Brand />
        <nav className="main-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={`nav-link ${pathname.startsWith(href) ? "active" : ""}`}>{t(label)}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/admin/login" className="button secondary" style={{ minHeight: 40, padding: "0 12px" }}>{t("Admin")}</Link>
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/appointment" className="button primary">{t("Book consultation")} <ArrowRight size={14} /></Link>
          <button className="mobile-nav-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-nav shell">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={`nav-link ${pathname.startsWith(href) ? "active" : ""}`} onClick={() => setOpen(false)}>{t(label)}</Link>
          ))}
          <Link href="/appointment" className="button primary" onClick={() => setOpen(false)}>{t("Book consultation")} <ArrowRight size={14} /></Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const exploreLinks = [
    ["Services", "/services"],
    ["Technologies", "/technologies"],
    ["Solutions", "/solutions"],
    ["Examples", "/examples"],
    ["About us", "/about"],
    ["Contact us", "/contact"],
  ];
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Brand light />
          <p className="footer-copy">{t("The technology partner for ambitious teams building what matters next.")}</p>
          <div className="nav-actions" style={{ marginTop: 23 }}>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="button ghost" style={{ border: "1px solid rgba(255,255,255,.12)", color: "#aabac8", padding: "0 12px" }} aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="mailto:hello@antitude.ai" className="button ghost" style={{ border: "1px solid rgba(255,255,255,.12)", color: "#aabac8", padding: "0 12px" }} aria-label="Email Antitude"><Send size={16} /></a>
          </div>
        </div>
        <div>
          <p className="footer-title">{t("Explore")}</p>
          <div className="footer-links">
            {exploreLinks.map(([label, href]) => (
              <Link key={href} href={href}>{t(label)}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-title">{t("Company")}</p>
          <div className="footer-links">
            <Link href="/appointment">{t("Talk to an expert")}</Link>
            <Link href="/admin/login">{t("Client portal")}</Link>
            <a href="mailto:hello@antitude.ai">hello@antitude.ai</a>
            <span>{t("New York · London · Remote")}</span>
          </div>
        </div>
        <div>
          <p className="footer-title">{t("Built for the next move")}</p>
          <p className="footer-note">{t("We bring strategy, engineering, and responsible AI together—without the black-box handoff.")}</p>
          <Link href="/appointment" className="button primary" style={{ marginTop: 17 }}>{t("Start a conversation")} <ArrowRight size={14} /></Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Antitude Systems</span>
        <span>{t("Human judgment · Useful technology")}</span>
      </div>
    </footer>
  );
}

export function HeroContent() {
  const { t } = useLanguage();
  return (
    <div className="hero-content">
      <span className="eyebrow" style={{ color: "var(--cyan)" }}>{t("Technology partner · since 2014")}</span>
      <h1 className="display reveal">{t("Make complex")} <span className="text-gradient">{t("useful.")}</span></h1>
      <p className="lede reveal-2">{t("Antitude helps CTOs, enterprise leaders, and founders turn difficult technology into clear, measurable momentum. Strategy, engineering, and responsible AI—working as one.")}</p>
      <div className="hero-meta reveal-2">
        <span className="hero-bullet">{t("Senior teams only")}</span>
        <span className="hero-bullet">{t("Outcome-led")}</span>
        <span className="hero-bullet">{t("No black boxes")}</span>
      </div>
      <div className="hero-actions reveal-3">
        <Link href="/appointment" className="button primary large">{t("Tell us what matters")} <ArrowRight size={16} /></Link>
        <Link href="/about" className="button secondary large">{t("About Antitude")} <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const { t } = useLanguage();
  return (
    <section className="page-hero">
      <div className="shell reveal">
        <span className="eyebrow">{t(eyebrow)}</span>
        <h1 className="h1">{t(title)}</h1>
        <p className="lede">{t(description)}</p>
      </div>
    </section>
  );
}

export function ProofRail() {
  const { t } = useLanguage();
  return (
    <div className="shell proof-rail" aria-label="Antitude proof points">
      <div><strong>10+</strong><span>{t("years making hard work clearer")}</span></div>
      <div><strong>3</strong><span>{t("disciplines, one senior team")}</span></div>
      <div><strong>∞</strong><span>{t("curiosity for what comes next")}</span></div>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string | ReactNode; title: string | ReactNode; description?: string | ReactNode; action?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{typeof eyebrow === "string" ? t(eyebrow) : eyebrow}</span>
        <h2 className="h2">{typeof title === "string" ? t(title) : title}</h2>
        {description && <p className="lede">{typeof description === "string" ? t(description) : description}</p>}
      </div>
      {action}
    </div>
  );
}

export function LocaleText({ children }: { children: string }) {
  const { t } = useLanguage();
  return <>{t(children)}</>;
}
