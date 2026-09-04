"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";
import { Icon } from "@/components/site";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedService } from "@/lib/translations-data";

const groups = [
  {
    number: "01",
    eyebrow: "Intelligence",
    title: "AI & intelligent automation",
    description: "Practical assistants and workflows that turn information into action.",
    ids: ["s10"],
  },
  {
    number: "02",
    eyebrow: "Product delivery",
    title: "Software & product development",
    description: "Customer-facing products and internal systems designed around real workflows.",
    ids: ["s8"],
  },
  {
    number: "03",
    eyebrow: "Connected systems",
    title: "API & systems integration",
    description: "Reliable connections between the tools, data, and services your business depends on.",
    ids: ["s11"],
  },
  {
    number: "04",
    eyebrow: "Platform",
    title: "Cloud, deployment & DevOps",
    description: "Infrastructure and release practices that make shipping repeatable.",
    ids: ["s12"],
  },
  {
    number: "05",
    eyebrow: "Confidence",
    title: "Quality engineering & advisory",
    description: "Quality, architecture, and technical perspective for decisions that matter.",
    ids: ["s5"],
  },
];

export function ServicesCatalog({ services }: { services: Service[] }) {
  const { locale, t } = useLanguage();
  const getService = (id: string) => services.find((service) => service.id === id);

  return (
    <div className="shell">
      {groups.map((group) => {
        const rawService = getService(group.ids[0]);
        if (!rawService) return null;
        const service = getLocalizedService(rawService, locale);

        return (
          <div className="service-group" key={group.number}>
            <div className="service-group-head">
              <div className="service-group-index">{group.number}</div>
              <div>
                <span className="eyebrow">{t(group.eyebrow)}</span>
                <h2 className="h2">{service.name}</h2>
                <p className="lede">{service.description}</p>
              </div>
            </div>
            <div className="grid-2">
              <article className="surface service-card">
                <img className="card-image" src={service.image} alt={service.name} style={{ height: 220 }} />
                <div className="card-body">
                  <div className="card-icon">
                    <Icon name={service.icon} size={19} />
                  </div>
                  <h2 className="h3">{service.name}</h2>
                  <p>{service.detailedDescription}</p>
                  {service.offerings && service.offerings.length > 0 && (
                    <ul className="offering-list">
                      {service.offerings.slice(0, 5).map((offering) => (
                        <li key={offering}>{offering}</li>
                      ))}
                    </ul>
                  )}
                  <div className="tag-row">
                    {service.technologies.map((technology) => (
                      <span className="tag" key={technology}>{technology}</span>
                    ))}
                  </div>
                  {service.caseStudy && (
                    <div className="case-result">
                      <span>{t("Example outcome")}</span>
                      <strong>{service.caseStudy}</strong>
                      {service.caseMetric && <small>{service.caseMetric}</small>}
                    </div>
                  )}
                  <div className="card-footer">
                    <Link className="card-link" href={`/services/${service.slug}`}>
                      {t("Explore this capability")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
