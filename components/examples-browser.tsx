"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Clock3, Search, X } from "lucide-react";
import { examples, type ExampleCategory } from "@/lib/examples";
import { useLanguage } from "@/components/language-provider";

const categories: Array<"All" | ExampleCategory> = ["All", "Services", "Solutions", "Technologies"];

export function ExamplesBrowser() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = useMemo(() => examples.filter((example) => {
    const matchesCategory = category === "All" || example.category === category;
    const haystack = [example.title, example.description, example.eyebrow, ...example.stack].join(" ").toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);

  return <>
    <div className="examples-toolbar">
      <div className="example-tabs" role="tablist" aria-label={t("Examples")}>{categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} className={`example-tab ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{t(item)}<span>{item === "All" ? examples.length : examples.filter((example) => example.category === item).length}</span></button>)}</div>
      <label className="example-search"><Search size={16} /><span className="sr-only">{t("Search examples")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search by capability or stack")} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={14} /></button>}</label>
    </div>
    <div className="examples-grid">{filtered.map((example) => <article className="example-card" key={example.id}>
      <button type="button" className="example-media" onClick={() => setSelected(example.id)} aria-label={`Preview ${example.title}`}><img src={example.media} alt="" /><span className="example-media-label">{t("Preview case")} <ArrowRight size={14} /></span></button>
      <div className="example-body"><div className="example-meta"><span>{example.category}</span><span><Clock3 size={12} /> {example.timeline}</span></div><p className="kicker">{example.eyebrow}</p><h2>{example.title}</h2><p>{example.description}</p><div className="example-stack">{example.stack.map((item) => <span key={item}>{item}</span>)}</div><button type="button" className="example-link" onClick={() => setSelected(example.id)}>{t("View capabilities")} <ArrowRight size={14} /></button></div>
    </article>)}</div>
    {filtered.length === 0 && <div className="examples-empty"><h2>{t("No matching examples")}</h2><p>{t("Try a different capability, industry, or technology.")}</p></div>}
    {selected && <ExamplePanel example={examples.find((example) => example.id === selected)!} onClose={() => setSelected(null)} />}
  </>;
}

function ExamplePanel({ example, onClose }: { example: (typeof examples)[number]; onClose: () => void }) {
  return <div className="example-panel-backdrop" role="presentation" onClick={onClose}><aside className="example-panel" role="dialog" aria-modal="true" aria-labelledby="example-panel-title" onClick={(event) => event.stopPropagation()}><button className="example-panel-close" type="button" aria-label="Close example details" onClick={onClose}><X size={18} /></button><img src={example.media} alt="" /><div className="example-panel-content"><span className="eyebrow">{example.category} · {example.eyebrow}</span><h2 id="example-panel-title">{example.title}</h2><p>{example.description}</p><div className="panel-metric"><strong>{example.metric}</strong><span>{example.timeline} delivery window</span></div><h3>Core capabilities</h3><ul>{example.capabilities.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><div className="panel-actions"><Link href="/appointment" className="button primary" onClick={onClose}>Add to brief <ArrowRight size={14} /></Link><button type="button" className="button secondary" onClick={onClose}>Keep exploring</button></div></div></aside></div>;
}
