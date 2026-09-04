"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Clock3, Sparkles, X } from "lucide-react";
import { examples, type ExampleCategory } from "@/lib/examples";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedExample } from "@/lib/translations-data";

const categories: Array<"All" | ExampleCategory> = ["All", "Services", "Solutions", "Technologies"];

export function HomeExamplesShowcase() {
  const { locale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const localizedExamples = useMemo(
    () => examples.map((ex) => getLocalizedExample(ex, locale)),
    [locale]
  );

  const displayedExamples = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? localizedExamples
        : localizedExamples.filter((ex) => ex.category === selectedCategory);
    return filtered.slice(0, 6);
  }, [selectedCategory, localizedExamples]);

  const activeExample = activePreviewId
    ? localizedExamples.find((ex) => ex.id === activePreviewId)
    : null;

  return (
    <section className="section" id="examples-showcase" style={{ background: "rgba(10, 168, 197, 0.02)" }}>
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("Examples")}</span>
            <h2 className="h2">{locale === "ar" ? "تطبيقات ومنظومات حقيقية تعمل على أرض الواقع." : "Real products & intelligent systems in the wild."}</h2>
            <p className="lede">
              {locale === "ar"
                ? "استكشف نماذج مختارة من تطبيقات الويب، ومنصات SaaS، وأنظمة الذكاء الاصطناعي، والبرمجيات التشغيلية التي قمنا بإنجازها."
                : "Explore a curated showcase of web apps, SaaS platforms, AI copilots, and operational platforms we build for ambitious teams."}
            </p>
          </div>
          <Link href="/examples" className="button secondary">
            <span>{t("View all examples")} <ArrowRight size={14} /></span>
          </Link>
        </div>

        {/* Category filter tabs */}
        <div className="example-tabs" style={{ marginBottom: 28 }} role="tablist" aria-label={t("Examples")}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`example-tab ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {t(cat)}
              <span>
                {cat === "All"
                  ? examples.length
                  : examples.filter((item) => item.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="examples-grid">
          {displayedExamples.map((example) => (
            <article className="example-card" key={example.id}>
              <button
                type="button"
                className="example-media"
                onClick={() => setActivePreviewId(example.id)}
                aria-label={`${t("Preview case")}: ${example.title}`}
              >
                <img src={example.media} alt="" />
                <span className="example-media-label">
                  {t("Preview case")} <ArrowRight size={14} />
                </span>
              </button>
              <div className="example-body">
                <div className="example-meta">
                  <span>{t(example.category)}</span>
                  <span>
                    <Clock3 size={12} /> {example.timeline}
                  </span>
                </div>
                <p className="kicker">{example.eyebrow}</p>
                <h2>{example.title}</h2>
                <p>{example.description}</p>
                <div className="example-stack">
                  {example.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    type="button"
                    className="example-link"
                    onClick={() => setActivePreviewId(example.id)}
                  >
                    {t("View capabilities")} <ArrowRight size={14} />
                  </button>
                  <small style={{ color: "var(--cyan-deep)", fontWeight: 600, fontSize: 11 }}>
                    {example.metric}
                  </small>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div style={{ marginTop: 42, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            {locale === "ar"
              ? `عرض ${displayedExamples.length} من أصل ${examples.length} مشروعاً وتطبيقاً مكتملاً في المكتبة.`
              : `Showing ${displayedExamples.length} of ${examples.length} real-world applications in our library.`}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/examples" className="button primary">
              <Sparkles size={15} /> {t("View all examples")} <ArrowRight size={14} />
            </Link>
            <Link href="/appointment" className="button secondary">
              {locale === "ar" ? "ناقش فكرة تطبيقك" : "Discuss your application"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Modal Drawer Preview */}
      {activeExample && (
        <div
          className="example-panel-backdrop"
          role="presentation"
          onClick={() => setActivePreviewId(null)}
        >
          <aside
            className="example-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-example-panel-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="example-panel-close"
              type="button"
              aria-label={t("Close example details")}
              onClick={() => setActivePreviewId(null)}
            >
              <X size={18} />
            </button>
            <img src={activeExample.media} alt="" />
            <div className="example-panel-content">
              <span className="eyebrow">
                {t(activeExample.category)} · {activeExample.eyebrow}
              </span>
              <h2 id="home-example-panel-title">{activeExample.title}</h2>
              <p>{activeExample.description}</p>
              <div className="panel-metric">
                <strong>{activeExample.metric}</strong>
                <span>
                  {activeExample.timeline} {t("delivery window")}
                </span>
              </div>
              <h3>{t("Core capabilities")}</h3>
              <ul>
                {activeExample.capabilities.map((cap) => (
                  <li key={cap}>
                    <Check size={15} />
                    {cap}
                  </li>
                ))}
              </ul>
              <div className="panel-actions">
                <Link
                  href="/appointment"
                  className="button primary"
                  onClick={() => setActivePreviewId(null)}
                >
                  {t("Add to brief")} <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setActivePreviewId(null)}
                >
                  {t("Keep exploring")}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
