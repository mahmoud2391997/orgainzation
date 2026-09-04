"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedSolution, arabicSolutions } from "@/lib/translations-data";

export function SolutionsGrid({ solutions, isCompact = false }: { solutions: Solution[]; isCompact?: boolean }) {
  const { locale, t } = useLanguage();

  return (
    <div className="grid-2">
      {solutions.map((sol) => {
        const item = getLocalizedSolution(sol, locale);
        const caseLens = locale === "ar" ? arabicSolutions[sol.id]?.caseLens : (
          sol.industry === "Healthcare"
            ? "Connected care, clearer operations"
            : sol.industry === "Financial services"
            ? "Trusted decisions at digital speed"
            : sol.industry === "Retail"
            ? "Signals turned into customer moments"
            : "Intelligence for critical assets"
        );

        return (
          <Link href="/appointment" className="project-card" key={sol.id}>
            <img src={sol.image} alt={`${item.title} industry`} />
            <div className="project-overlay">
              <span className="project-industry">{item.industry}</span>
              <h3 className={isCompact ? undefined : "h2"}>{item.title}</h3>
              <p>{item.description}</p>
              {!isCompact && caseLens && (
                <div className="case-result">
                  <span>{t("Case lens")}</span>
                  <strong>{caseLens}</strong>
                </div>
              )}
              <div className="card-footer">
                <span className="card-link">
                  {t("Explore the opportunity")} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
