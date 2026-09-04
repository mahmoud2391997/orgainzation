"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Technology } from "@/lib/content";
import { Icon } from "@/components/site";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedTechnology } from "@/lib/translations-data";

export function TechnologiesGrid({ technologies }: { technologies: Technology[] }) {
  const { locale, t } = useLanguage();

  return (
    <div className="technology-grid">
      {technologies.map((tech) => {
        const item = getLocalizedTechnology(tech, locale);
        return (
          <article className="surface technology-card" key={tech.id}>
            <img className="technology-image" src={tech.image} alt={`${item.name} technology`} />
            <div className="technology-body">
              <div className="card-icon">
                <Icon name={tech.icon} size={19} />
              </div>
              <div>
                <h3 className="h3">{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <Link className="card-link" href="/technologies">
                <span>{t("Explore")} <ArrowRight size={14} /></span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
