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

function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return <button className="button ghost language-toggle" type="button" onClick={() => setLocale(locale === "en" ? "ar" : "en")} aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}>{locale === "en" ? "AR" : "EN"}</button>;
}

function ThemeToggle() {
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
          <Link href="/admin/login" className="button secondary" style={{ minHeight: 40, padding: "0 12px" }}>Admin</Link>
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
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Brand light />
          <p className="footer-copy">The technology partner for ambitious teams building what matters next.</p>
          <div className="nav-actions" style={{ marginTop: 23 }}>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="button ghost" style={{ border: "1px solid rgba(255,255,255,.12)", color: "#aabac8", padding: "0 12px" }} aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="mailto:hello@antitude.ai" className="button ghost" style={{ border: "1px solid rgba(255,255,255,.12)", color: "#aabac8", padding: "0 12px" }} aria-label="Email Antitude"><Send size={16} /></a>
          </div>
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <div className="footer-links">
            <Link href="/services">Services</Link>
            <Link href="/technologies">Technologies</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/examples">Examples</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact us</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Company</p>
          <div className="footer-links">
            <Link href="/appointment">Talk to an expert</Link>
            <Link href="/admin/login">Client portal</Link>
            <a href="mailto:hello@antitude.ai">hello@antitude.ai</a>
            <span>New York · London · Remote</span>
          </div>
        </div>
        <div>
          <p className="footer-title">Built for the next move</p>
          <p className="footer-note">We bring strategy, engineering, and responsible AI together—without the black-box handoff.</p>
          <Link href="/appointment" className="button primary" style={{ marginTop: 17 }}>Start a conversation <ArrowRight size={14} /></Link>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Antitude Systems</span><span>Human judgment · Useful technology</span></div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-hero">
      <div className="shell reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h1">{title}</h1>
        <p className="lede">{description}</p>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
        {description && <p className="lede">{description}</p>}
      </div>
      {action}
    </div>
  );
}
