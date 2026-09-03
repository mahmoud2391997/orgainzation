"use client";

import { useEffect, useState } from "react";
import { Check, LoaderCircle, Save } from "lucide-react";

type ContentKind = "services" | "technologies" | "solutions";
type ContentItem = { id: string; name?: string; title?: string; description: string; detailedDescription?: string; [key: string]: unknown };
type ContentState = Record<ContentKind, ContentItem[]>;
const labels: Record<ContentKind, string> = { services: "Services", technologies: "Technologies", solutions: "Solutions" };

export default function ContentManager() {
  const [kind, setKind] = useState<ContentKind>("services");
  const [content, setContent] = useState<ContentState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" }).then(async (response) => {
      if (response.status === 401) return (window.location.href = "/admin/login");
      setContent(await response.json() as ContentState);
    }).finally(() => setLoading(false));
  }, []);

  function updateItem(id: string, field: "name" | "title" | "description" | "detailedDescription", value: string) {
    setContent((current) => current ? { ...current, [kind]: current[kind].map((item) => item.id === id ? { ...item, [field]: value } : item) } : current);
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setNotice("");
    const response = await fetch("/api/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, items: content[kind] }) });
    setSaving(false);
    setNotice(response.ok ? `${labels[kind]} saved.` : "Unable to save content.");
  }

  return <section className="cms-panel"><div className="admin-header"><div><span className="eyebrow">Content management</span><h2 className="h2" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Keep the site current.</h2><p className="lede">Edit public services, technologies, and solutions.</p></div><button className="button primary" onClick={() => void save()} disabled={saving || loading}>{saving ? <LoaderCircle size={14} /> : <Save size={14} />} Save {labels[kind]}</button></div><div className="filter-row" role="tablist" aria-label="Content types">{(Object.keys(labels) as ContentKind[]).map((item) => <button className={`filter ${kind === item ? "active" : ""}`} role="tab" aria-selected={kind === item} onClick={() => setKind(item)} key={item}>{labels[item]}</button>)}</div>{notice && <div className="form-message success" role="status"><Check size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />{notice}</div>}{loading ? <p className="form-note">Loading content...</p> : <div className="cms-list">{content?.[kind].map((item) => <article className="surface cms-item" key={item.id}><div className="cms-item-heading"><span className="kicker">{item.id}</span><strong>{item.name ?? item.title}</strong></div><div className="form-grid"><div className="field"><label htmlFor={`${item.id}-title`}>{kind === "solutions" ? "Title" : "Name"}</label><input id={`${item.id}-title`} value={item.name ?? item.title ?? ""} onChange={(event) => updateItem(item.id, item.name ? "name" : "title", event.target.value)} /></div><div className="field"><label htmlFor={`${item.id}-description`}>Description</label><input id={`${item.id}-description`} value={item.description} onChange={(event) => updateItem(item.id, "description", event.target.value)} /></div>{kind === "services" && <div className="field full"><label htmlFor={`${item.id}-details`}>Detailed description</label><textarea id={`${item.id}-details`} value={item.detailedDescription ?? ""} onChange={(event) => updateItem(item.id, "detailedDescription", event.target.value)} /></div>}</div></article>)}</div>}</section>;
}