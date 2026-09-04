"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, MoveUpRight, Radio, Database } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const scenes = [
  {
    image: "/images/technology-generative-ai.jpg",
    label: "Responsible AI",
    detail: "Turn intelligence into decisions.",
    example: "Grounded copilots and evaluation",
  },
  {
    image: "/images/technology-cloud-native.jpg",
    label: "Cloud foundations",
    detail: "Build systems that keep moving.",
    example: "Resilient platforms and automation",
  },
  {
    image: "/images/technology-data-platforms.jpg",
    label: "Data platforms",
    detail: "Make signal easier to find.",
    example: "Pipelines and semantic layers",
  },
];

export function HeroVisual() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      node.style.setProperty("--tilt-x", `${y}deg`);
      node.style.setProperty("--tilt-y", `${x}deg`);
    };
    const leave = () => {
      node.style.setProperty("--tilt-x", "0deg");
      node.style.setProperty("--tilt-y", "0deg");
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  const scene = scenes[active];

  return (
    <div className="hero-visual" ref={ref} aria-label="Interactive Antitude technology imagery">
      <img className="hero-scene-image" src={scene.image} alt={t(scene.label)} key={scene.image} />
      <div className="hero-scene-overlay" />
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />

      {/* Top caption badge */}
      <div className="visual-caption">
        <span>{t("Live radar")}</span>
        <span>0{active + 1} / 03</span>
      </div>

      {/* Center core */}
      <div className="visual-core">
        <span />
        <strong>{t("Useful")}<br />{t("momentum")}</strong>
      </div>

      {/* Interactive radar node 1 — AI systems */}
      <button
        className={`visual-node node-one ${active === 0 ? "is-active" : ""}`}
        type="button"
        onClick={() => setActive(0)}
        aria-label={t("AI systems")}
      >
        <Radio size={13} /> {t("AI systems")}
      </button>

      {/* Interactive radar node 2 — Cloud foundations */}
      <button
        className={`visual-node node-two ${active === 1 ? "is-active" : ""}`}
        type="button"
        onClick={() => setActive(1)}
        aria-label={t("Cloud foundations")}
      >
        {t("Cloud foundations")} <MoveUpRight size={13} />
      </button>

      {/* Interactive radar node 3 — Data platforms */}
      <button
        className={`visual-node node-three ${active === 2 ? "is-active" : ""}`}
        type="button"
        onClick={() => setActive(2)}
        aria-label={t("Data platforms")}
      >
        <Database size={13} /> {t("Data platforms")}
      </button>

      {/* Floating details glass card: positioned to never overwrite radar nodes or core */}
      <div className="visual-story">
        <span className="visual-story-badge">{t(scene.label)}</span>
        <strong>{t(scene.detail)}</strong>
        <small>{t(scene.example)}</small>
        <a href="#services">
          {t("Explore")} <ArrowRight size={13} />
        </a>
      </div>

      {/* Bottom corner scroll anchor */}
      <a className="visual-scroll" href="#services">
        <ArrowDown size={14} /> {t("See the system")}
      </a>
    </div>
  );
}
