"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, MoveUpRight, Radio } from "lucide-react";

const scenes = [
  { image: "/images/technology-generative-ai.jpg", label: "Responsible AI", detail: "Turn intelligence into decisions." },
  { image: "/images/technology-cloud-native.jpg", label: "Cloud foundations", detail: "Build systems that keep moving." },
  { image: "/images/technology-data-platforms.jpg", label: "Data platforms", detail: "Make signal easier to find." },
];

export function HeroVisual() {
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
      <img className="hero-scene-image" src={scene.image} alt={scene.label} key={scene.image} />
      <div className="hero-scene-overlay" />
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-core"><span /><strong>Useful<br />momentum</strong></div>
      <button className="visual-node node-one" type="button" onClick={() => setActive(0)} aria-label="Show responsible AI image"><Radio size={14} /> AI systems</button>
      <button className="visual-node node-two" type="button" onClick={() => setActive(1)} aria-label="Show cloud foundations image">Cloud foundations <MoveUpRight size={14} /></button>
      <button className="visual-node node-three" type="button" onClick={() => setActive(2)} aria-label="Show data platforms image">Data platforms</button>
      <div className="visual-story"><span>{scene.label}</span><strong>{scene.detail}</strong><a href="#services">Explore the approach <ArrowRight size={13} /></a></div>
      <div className="visual-caption"><span>Live radar</span><span>0{active + 1} / 03</span></div>
      <a className="visual-scroll" href="#services"><ArrowDown size={14} /> See the system</a>
    </div>
  );
}
