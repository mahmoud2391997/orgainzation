"use client";

import Link from "next/link";
import { examples } from "@/lib/examples";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedExample } from "@/lib/translations-data";

export function ExamplesTeaserGrid() {
  const { locale } = useLanguage();

  const items = examples
    .filter((example) => example.category === "Services" || example.category === "Solutions")
    .slice(0, 3)
    .map((item) => getLocalizedExample(item, locale));

  return (
    <div className="grid-3">
      {items.map((example) => (
        <Link href="/examples" className="surface service-card" key={example.id}>
          <img className="card-image" src={example.media} alt="" />
          <div className="card-body">
            <p className="kicker">{example.eyebrow}</p>
            <h3 className="h3">{example.title}</h3>
            <p>{example.description}</p>
            <strong className="case-metric">{example.metric}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}
