"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Technology } from "@/lib/content";
import { Icon } from "@/components/site";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedTechnology } from "@/lib/translations-data";

const categoryTranslations: Record<string, { kicker: string; title: string }> = {
  "Artificial intelligence": {
    kicker: "الذكاء الاصطناعي",
    title: "اجعل الذكاء قابلاً للتنفيذ العملي.",
  },
  "Cloud & infrastructure": {
    kicker: "السحابة والبنية التحتية",
    title: "اجعل التوسع والنمو أمراً هادئاً وموثوقاً.",
  },
  "Data & analytics": {
    kicker: "البيانات والتحليلات",
    title: "اجعل الإشارات واضحة وقابلة للقياس.",
  },
  "Product engineering": {
    kicker: "هندسة المنتجات",
    title: "ابنِ منتجات مصممة لتدوم وتتطور.",
  },
};

export function TechnologiesCatalog({ technologies }: { technologies: Technology[] }) {
  const { locale, t } = useLanguage();
  const categories = [...new Set(technologies.map((technology) => technology.category))];

  return (
    <div className="shell">
      {categories.map((category) => {
        const trans = categoryTranslations[category];
        const kicker = locale === "ar" && trans ? trans.kicker : category;
        const heading =
          locale === "ar" && trans
            ? trans.title
            : category === "Artificial intelligence"
            ? "Make intelligence actionable."
            : category === "Cloud & infrastructure"
            ? "Make scale uneventful."
            : category === "Data & analytics"
            ? "Make signal visible."
            : "Make products last.";

        return (
          <div key={category} style={{ marginBottom: 58 }}>
            <div className="section-head" style={{ marginBottom: 22 }}>
              <div>
                <p className="kicker">{kicker}</p>
                <h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.7rem)" }}>
                  {heading}
                </h2>
                <p className="section-subhead">
                  {locale === "ar" ? "الأدوات التي تدعم هذه النتيجة." : "The tools that support this outcome."}
                </p>
              </div>
            </div>
            <div className="grid-3">
              {technologies
                .filter((tech) => tech.category === category)
                .map((rawTech) => {
                  const tech = getLocalizedTechnology(rawTech, locale);
                  return (
                    <article className="surface service-card" key={rawTech.id}>
                      <img className="card-image" src={tech.image} alt={tech.name} />
                      <div className="card-body">
                        <div className="card-icon">
                          <Icon name={tech.icon} size={19} />
                        </div>
                        <h3 className="h3">{tech.name}</h3>
                        <p>{tech.description}</p>
                        {tech.support && tech.support.length > 0 ? (
                          <div className="technology-support">
                            <small>{locale === "ar" ? "يدعم" : "Supports"}</small>
                            {tech.support.map((service) => (
                              <span key={service}>{service}</span>
                            ))}
                          </div>
                        ) : null}
                        <div className="card-footer">
                          <Link href="/appointment" className="card-link">
                            {locale === "ar" ? "ناقش بنيتك التقنية" : "Talk about your stack"}{" "}
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
