"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles, Cpu } from "lucide-react";
import type { Service, Solution, Technology } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";
import {
  arabicServices,
  arabicTechnologies,
  arabicSolutions,
} from "@/lib/translations-data";

type Props = {
  services: Service[];
  technologies: Technology[];
  solutions: Solution[];
};

type RadarViewMode = "services" | "technologies" | "all";

// 12 distributed coordinates for Services Radar (spread cleanly around concentric circles)
const servicesPositions: [number, number][] = [
  [18, 22], [42, 14], [68, 16], [85, 26],
  [89, 52], [80, 75], [56, 85], [32, 82],
  [14, 66], [12, 44], [34, 38], [64, 58],
];

// 10 distributed coordinates for Technologies & Solutions Radar
const techPositions: [number, number][] = [
  [22, 26], [50, 16], [78, 24], [86, 52],
  [74, 76], [48, 84], [22, 74], [14, 50],
  [36, 40], [64, 60],
];

// 22 distributed coordinates for Complete System Radar
const allPositions: [number, number][] = [
  // Outer Ring
  [15, 22], [38, 12], [64, 14], [85, 22],
  [90, 48], [84, 74], [64, 86], [38, 86],
  [15, 72], [11, 46],
  // Middle Ring
  [26, 32], [50, 24], [74, 34], [78, 62],
  [52, 74], [26, 66], [20, 50],
  // Inner Ring
  [35, 40], [65, 40], [66, 62], [36, 62], [50, 32],
];

export function Radar({ services, technologies, solutions }: Props) {
  const { locale, t } = useLanguage();
  const [viewMode, setViewMode] = useState<RadarViewMode>("services");

  // All 12 services mapped
  const servicePoints = useMemo(
    () =>
      services.map((item) => {
        const ar = arabicServices[item.id];
        return {
          id: item.id,
          name: locale === "ar" && ar ? ar.name : item.name,
          group: "Services",
          groupKey: "services",
          detail: locale === "ar" && ar ? ar.description : item.description,
          link: `/services/${item.slug}`,
          examples: [
            locale === "ar" && ar?.caseStudy ? ar.caseStudy : item.caseStudy ?? item.name,
            locale === "ar" && ar?.caseMetric ? ar.caseMetric : item.caseMetric ?? item.description,
          ],
        };
      }),
    [services, locale]
  );

  // All 6 technologies mapped
  const techPoints = useMemo(
    () =>
      technologies.map((item) => {
        const ar = arabicTechnologies[item.id];
        return {
          id: item.id,
          name: locale === "ar" && ar ? ar.name : item.name,
          group: "Technologies",
          groupKey: "technologies",
          detail: locale === "ar" && ar ? ar.description : item.description,
          link: "/technologies",
          examples: [
            locale === "ar" && ar?.category ? ar.category : item.category,
            locale === "ar" ? "جاهز للإنتاج" : "Production-ready",
          ],
        };
      }),
    [technologies, locale]
  );

  // All 4 solutions mapped
  const solutionPoints = useMemo(
    () =>
      solutions.map((item) => {
        const ar = arabicSolutions[item.id];
        return {
          id: item.id,
          name: locale === "ar" && ar ? ar.title : item.title,
          group: "Solutions",
          groupKey: "solutions",
          detail: locale === "ar" && ar ? ar.description : item.description,
          link: "/solutions",
          examples: [
            locale === "ar" && ar?.industry ? ar.industry : item.industry,
            locale === "ar" && ar?.caseLens ? ar.caseLens : item.title,
          ],
        };
      }),
    [solutions, locale]
  );

  // Active points based on view mode
  const activePoints = useMemo(() => {
    if (viewMode === "services") return servicePoints;
    if (viewMode === "technologies") return [...techPoints, ...solutionPoints];
    return [...servicePoints, ...techPoints, ...solutionPoints];
  }, [viewMode, servicePoints, techPoints, solutionPoints]);

  const activePositions = useMemo(() => {
    if (viewMode === "services") return servicesPositions;
    if (viewMode === "technologies") return techPositions;
    return allPositions;
  }, [viewMode]);

  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? "s8");

  // Keep active point in sync
  const current = activePoints.find((p) => p.id === activeId) ?? activePoints[0];

  return (
    <div className="radar-system" aria-label={t("Technology radar")}>
      {/* Radar Mode Switcher Tabs */}
      <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "inline-flex", padding: 3, border: "1px solid var(--line)", borderRadius: 999, background: "var(--paper)" }}>
          <button
            type="button"
            className={`example-tab ${viewMode === "services" ? "active" : ""}`}
            style={{ border: "none", margin: 0 }}
            onClick={() => {
              setViewMode("services");
              setActiveId(services[0]?.id ?? "s8");
            }}
          >
            <Layers size={13} />
            <span>{locale === "ar" ? "رادار الخدمات (12 خدمة)" : "Services Radar (All 12)"}</span>
          </button>
          <button
            type="button"
            className={`example-tab ${viewMode === "technologies" ? "active" : ""}`}
            style={{ border: "none", margin: 0 }}
            onClick={() => {
              setViewMode("technologies");
              setActiveId(technologies[0]?.id ?? "t1");
            }}
          >
            <Cpu size={13} />
            <span>{locale === "ar" ? "رادار التقنيات والحلول (10)" : "Technologies & Solutions (10)"}</span>
          </button>
          <button
            type="button"
            className={`example-tab ${viewMode === "all" ? "active" : ""}`}
            style={{ border: "none", margin: 0 }}
            onClick={() => {
              setViewMode("all");
              setActiveId(services[0]?.id ?? "s8");
            }}
          >
            <Sparkles size={13} />
            <span>{locale === "ar" ? "المنظومة المتكاملة (22 قدرة)" : "Full System (All 22)"}</span>
          </button>
        </div>

        <small style={{ color: "var(--muted)", fontStyle: "italic", fontSize: 11 }}>
          {locale === "ar" ? "اضغط أو مرر على أي نقطة للاستكشاف" : "Hover or click any dot to explore capability"}
        </small>
      </div>

      {/* Radar Canvas / Stage */}
      <div
        className="radar-stage"
        role="img"
        aria-label={current ? `${current.name}: ${current.detail}` : t("Technology radar")}
      >
        <div className="radar-ring ring-a" />
        <div className="radar-ring ring-b" />
        <div className="radar-ring ring-c" />
        <div className="radar-axis axis-x" />
        <div className="radar-axis axis-y" />

        {/* Center Glowing Core */}
        <div className="radar-core">
          <span>ANTITUDE</span>
          <strong>Useful<br />momentum</strong>
        </div>

        {/* Radar Points with Titles Directly On Each Dot */}
        {activePoints.map((point, index) => {
          const [left, top] = activePositions[index] ?? [50, 50];
          const isCurrent = current?.id === point.id;

          return (
            <button
              key={point.id}
              type="button"
              className={`radar-point ${isCurrent ? "is-active" : ""}`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onMouseEnter={() => setActiveId(point.id)}
              onFocus={() => setActiveId(point.id)}
              onClick={() => setActiveId(point.id)}
              aria-label={`${point.name}, ${t(point.group)}`}
              aria-pressed={isCurrent}
            >
              <span className={`radar-point-dot ${point.groupKey}`} />
              <span className="radar-point-label">
                {point.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Side List */}
      <div className="radar-list" role="list" aria-label={t("Explore capabilities")}>
        {activePoints.map((point) => {
          const isCurrent = current?.id === point.id;
          return (
            <button
              role="listitem"
              key={point.id}
              type="button"
              className={`radar-list-item ${isCurrent ? "is-active" : ""}`}
              onMouseEnter={() => setActiveId(point.id)}
              onFocus={() => setActiveId(point.id)}
              onClick={() => setActiveId(point.id)}
            >
              <span className={`radar-dot ${point.group.toLowerCase()}`} />
              <span>
                <small>{t(point.group)}</small>
                <strong>{point.name}</strong>
              </span>
              <ArrowRight size={14} />
            </button>
          );
        })}
      </div>

      {/* Selected Capability Details Bar */}
      <div className="radar-detail" aria-live="polite">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="eyebrow">
              {t("Selected capability")} · {current ? t(current.group) : t("Technology radar")}
            </span>
            <strong style={{ display: "block", marginTop: 4 }}>{current?.name}</strong>
            <p style={{ marginTop: 6, maxWidth: 680 }}>{current?.detail}</p>
          </div>

          {current?.link && (
            <Link href={current.link} className="button secondary" style={{ alignSelf: "center" }}>
              <span>{locale === "ar" ? "استكشف هذه القدرة" : "Explore this capability"} <ArrowRight size={14} /></span>
            </Link>
          )}
        </div>

        {current?.examples.length ? (
          <div className="radar-examples" style={{ marginTop: 16 }}>
            <small>{t("Related examples")}</small>
            <div>
              {current.examples.map((example) => (
                <span key={example}>{example}</span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
