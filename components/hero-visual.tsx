"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MoveUpRight, Radio } from "lucide-react";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      node.style.setProperty("--tilt-x", `${y}deg`);
      node.style.setProperty("--tilt-y", `${x}deg`);
    };
    node.addEventListener("pointermove", move);
    return () => node.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="hero-visual" ref={ref} aria-label="Antitude technology radar visualization">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-core"><span /><strong>Useful<br />momentum</strong></div>
      <div className="visual-node node-one"><Radio size={14} /> AI systems</div>
      <div className="visual-node node-two">Cloud foundations <MoveUpRight size={14} /></div>
      <div className="visual-node node-three">Human judgment</div>
      <div className="visual-caption"><span>Live radar</span><span>01 / 04</span></div>
      <a className="visual-scroll" href="#services"><ArrowDown size={14} /> See the system</a>
    </div>
  );
}
