"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Service, Solution, Technology } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

type Props = { services: Service[]; technologies: Technology[]; solutions: Solution[] };
export function Radar({ services, technologies, solutions }: Props) {
  const { t } = useLanguage();
  const points = useMemo(() => [
    ...services.map((item) => ({ id: item.id, name: item.name, group: "Services", detail: item.description })),
    ...technologies.map((item) => ({ id: item.id, name: item.name, group: "Technologies", detail: item.description })),
    ...solutions.map((item) => ({ id: item.id, name: item.title, group: "Solutions", detail: item.description })),
  ], [services, technologies, solutions]);
  const [active, setActive] = useState(points[0]?.id);
  const current = points.find((point) => point.id === active) ?? points[0];
  return <div className="radar-system" aria-label={t("Technology radar")}>
    <div className="radar-stage" role="img" aria-label={current ? `${current.name}: ${current.detail}` : t("Technology radar")}>
      <div className="radar-ring ring-a" /><div className="radar-ring ring-b" /><div className="radar-ring ring-c" /><div className="radar-axis axis-x" /><div className="radar-axis axis-y" />
      <div className="radar-core"><span>ANTITUDE</span><strong>Useful<br />momentum</strong></div>
      {points.map((point, index) => <button key={point.id} type="button" className={`radar-point radar-point-${index % 12} ${active === point.id ? "is-active" : ""}`} onMouseEnter={() => setActive(point.id)} onFocus={() => setActive(point.id)} onClick={() => setActive(point.id)} aria-label={`${point.name}, ${t(point.group)}`} aria-pressed={active === point.id}><span /></button>)}
    </div>
    <div className="radar-list" role="list" aria-label={t("Explore capabilities")}>
      {points.map((point) => <button role="listitem" key={point.id} type="button" className={`radar-list-item ${active === point.id ? "is-active" : ""}`} onMouseEnter={() => setActive(point.id)} onFocus={() => setActive(point.id)} onClick={() => setActive(point.id)}><span className={`radar-dot ${point.group.toLowerCase()}`} /><span><small>{t(point.group)}</small><strong>{point.name}</strong></span><ArrowRight size={14} /></button>)}
    </div>
    <div className="radar-detail" aria-live="polite"><span className="eyebrow">{current ? t(current.group) : t("Technology radar")}</span><strong>{current?.name}</strong><p>{current?.detail}</p></div>
  </div>;
}
