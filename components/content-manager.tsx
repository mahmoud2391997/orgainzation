"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ImagePlus, LoaderCircle, Plus, Save, Trash2, Upload } from "lucide-react";
import type { IconName, Service, Solution, Technology } from "@/lib/content";
import type { Example, ExampleCategory } from "@/lib/examples";

type ContentKind = "services" | "technologies" | "solutions" | "examples";
type ContentState = {
  services: Service[];
  technologies: Technology[];
  solutions: Solution[];
  examples: Example[];
  source?: "database" | "json";
};

type MediaAsset = {
  id: string;
  path: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  alt: string;
  createdAt: string;
};

const labels: Record<ContentKind, string> = {
  services: "Services",
  technologies: "Technologies",
  solutions: "Solutions",
  examples: "Examples",
};

const iconOptions: IconName[] = ["spark", "code", "cloud", "layers", "shield", "radar", "database", "globe", "network"];
const exampleCategories: ExampleCategory[] = ["Services", "Solutions", "Technologies"];

function listField(value: string[] | undefined) {
  return (value ?? []).join("\n");
}

function parseList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createBlank(kind: ContentKind): Service | Technology | Solution | Example {
  const stamp = Date.now().toString(36);
  if (kind === "services") {
    return {
      id: `s_${stamp}`,
      name: "New service",
      slug: `new-service-${stamp}`,
      description: "",
      detailedDescription: "",
      icon: "spark",
      technologies: [],
      image: "",
      offerings: [],
      caseStudy: "",
      caseMetric: "",
    };
  }
  if (kind === "technologies") {
    return {
      id: `t_${stamp}`,
      name: "New technology",
      description: "",
      category: "",
      icon: "spark",
      image: "",
      caseStudy: "",
      caseMetric: "",
    };
  }
  if (kind === "solutions") {
    return {
      id: `so_${stamp}`,
      title: "New solution",
      description: "",
      industry: "",
      image: "",
    };
  }
  return {
    id: `ex_${stamp}`,
    title: "New example",
    eyebrow: "",
    category: "Services",
    description: "",
    capabilities: [],
    stack: [],
    timeline: "",
    media: "",
    metric: "",
  };
}

export default function ContentManager() {
  const [kind, setKind] = useState<ContentKind>("services");
  const [content, setContent] = useState<ContentState | null>(null);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");

  async function load() {
    setLoading(true);
    try {
      const [contentResponse, mediaResponse] = await Promise.all([
        fetch("/api/content", { cache: "no-store" }),
        fetch("/api/media", { cache: "no-store" }),
      ]);
      if (contentResponse.status === 401 || mediaResponse.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      setContent(await contentResponse.json() as ContentState);
      const mediaJson = await mediaResponse.json() as { media?: MediaAsset[] };
      setMedia(mediaJson.media ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const items = useMemo(() => content?.[kind] ?? [], [content, kind]);

  function updateItem(id: string, patch: Record<string, unknown>) {
    setContent((current) => {
      if (!current) return current;
      return {
        ...current,
        [kind]: current[kind].map((item) => (item.id === id ? { ...item, ...patch } : item)),
      };
    });
  }

  function addItem() {
    setContent((current) => {
      if (!current) return current;
      return { ...current, [kind]: [...current[kind], createBlank(kind)] };
    });
  }

  function removeItem(id: string) {
    setContent((current) => {
      if (!current) return current;
      return { ...current, [kind]: current[kind].filter((item) => item.id !== id) };
    });
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setNotice("");
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, items: content[kind] }),
    });
    setSaving(false);
    if (!response.ok) {
      setNotice("Unable to save content.");
      return;
    }
    const next = await response.json() as ContentState;
    setContent(next);
    setNotice(`${labels[kind]} saved to ${next.source === "database" ? "PostgreSQL" : "local JSON"}.`);
  }

  async function uploadImage(file: File, target?: { id: string; field: "image" | "media" }) {
    setUploading(true);
    setNotice("");
    const form = new FormData();
    form.set("file", file);
    const response = await fetch("/api/media", { method: "POST", body: form });
    setUploading(false);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Upload failed." })) as { error?: string };
      setNotice(error.error ?? "Upload failed.");
      return;
    }
    const result = await response.json() as { asset: MediaAsset };
    setMedia((current) => [result.asset, ...current]);
    if (target) updateItem(target.id, { [target.field]: result.asset.path });
    setNotice(`Image uploaded: ${result.asset.path}`);
  }

  function ImageField({
    id,
    field,
    value,
  }: {
    id: string;
    field: "image" | "media";
    value: string;
  }) {
    return (
      <div className="field full">
        <label htmlFor={`${id}-${field}`}>Image</label>
        <div className="cms-media-row">
          <input
            id={`${id}-${field}`}
            value={value}
            onChange={(event) => updateItem(id, { [field]: event.target.value })}
            placeholder="/images/example.png or /uploads/..."
          />
          <label className="button secondary cms-upload">
            <Upload size={14} />
            Upload
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadImage(file, { id, field });
                event.currentTarget.value = "";
              }}
            />
          </label>
        </div>
        {value ? <img className="cms-preview" src={value} alt="" /> : null}
        {media.length > 0 ? (
          <div className="cms-media-picker">
            <span className="kicker">Recent uploads</span>
            <div className="cms-media-thumbs">
              {media.slice(0, 8).map((asset) => (
                <button
                  type="button"
                  className={`cms-thumb ${value === asset.path ? "active" : ""}`}
                  key={asset.id}
                  onClick={() => updateItem(id, { [field]: asset.path })}
                  title={asset.originalName}
                >
                  <img src={asset.path} alt="" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <section className="cms-panel">
      <div className="admin-header">
        <div>
          <span className="eyebrow">Content management</span>
          <h2 className="h2" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>One source of truth.</h2>
          <p className="lede">
            Edit services, technologies, solutions, examples, and images.
            {content?.source ? ` Active source: ${content.source === "database" ? "PostgreSQL" : "JSON fallback"}.` : ""}
          </p>
        </div>
        <div className="nav-actions">
          <label className="button secondary cms-upload">
            <ImagePlus size={14} />
            {uploading ? "Uploading..." : "Upload image"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              hidden
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadImage(file);
                event.currentTarget.value = "";
              }}
            />
          </label>
          <button className="button secondary" onClick={addItem} disabled={loading}>
            <Plus size={14} /> Add {labels[kind].slice(0, -1)}
          </button>
          <button className="button primary" onClick={() => void save()} disabled={saving || loading}>
            {saving ? <LoaderCircle size={14} /> : <Save size={14} />} Save {labels[kind]}
          </button>
        </div>
      </div>

      <div className="filter-row" role="tablist" aria-label="Content types">
        {(Object.keys(labels) as ContentKind[]).map((item) => (
          <button
            className={`filter ${kind === item ? "active" : ""}`}
            role="tab"
            aria-selected={kind === item}
            onClick={() => setKind(item)}
            key={item}
          >
            {labels[item]}
          </button>
        ))}
      </div>

      {notice ? (
        <div className="form-message success" role="status">
          <Check size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          {notice}
        </div>
      ) : null}

      {loading ? (
        <p className="form-note">Loading content...</p>
      ) : (
        <div className="cms-list">
          {items.map((item) => {
            if (kind === "services") {
              const service = item as Service;
              return (
                <article className="surface cms-item" key={service.id}>
                  <div className="cms-item-heading">
                    <span className="kicker">{service.id}</span>
                    <strong>{service.name}</strong>
                    <button className="button secondary cms-delete" onClick={() => removeItem(service.id)} type="button">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor={`${service.id}-name`}>Name</label>
                      <input id={`${service.id}-name`} value={service.name} onChange={(event) => updateItem(service.id, { name: event.target.value })} />
                    </div>
                    <div className="field">
                      <label htmlFor={`${service.id}-slug`}>Slug</label>
                      <input id={`${service.id}-slug`} value={service.slug} onChange={(event) => updateItem(service.id, { slug: event.target.value })} />
                    </div>
                    <div className="field">
                      <label htmlFor={`${service.id}-icon`}>Icon</label>
                      <select id={`${service.id}-icon`} value={service.icon} onChange={(event) => updateItem(service.id, { icon: event.target.value })}>
                        {iconOptions.map((icon) => <option value={icon} key={icon}>{icon}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor={`${service.id}-metric`}>Case metric</label>
                      <input id={`${service.id}-metric`} value={service.caseMetric ?? ""} onChange={(event) => updateItem(service.id, { caseMetric: event.target.value })} />
                    </div>
                    <div className="field full">
                      <label htmlFor={`${service.id}-description`}>Description</label>
                      <input id={`${service.id}-description`} value={service.description} onChange={(event) => updateItem(service.id, { description: event.target.value })} />
                    </div>
                    <div className="field full">
                      <label htmlFor={`${service.id}-details`}>Detailed description</label>
                      <textarea id={`${service.id}-details`} value={service.detailedDescription} onChange={(event) => updateItem(service.id, { detailedDescription: event.target.value })} />
                    </div>
                    <div className="field">
                      <label htmlFor={`${service.id}-tech`}>Technologies (one per line)</label>
                      <textarea id={`${service.id}-tech`} value={listField(service.technologies)} onChange={(event) => updateItem(service.id, { technologies: parseList(event.target.value) })} />
                    </div>
                    <div className="field">
                      <label htmlFor={`${service.id}-offerings`}>Offerings (one per line)</label>
                      <textarea id={`${service.id}-offerings`} value={listField(service.offerings)} onChange={(event) => updateItem(service.id, { offerings: parseList(event.target.value) })} />
                    </div>
                    <div className="field full">
                      <label htmlFor={`${service.id}-case`}>Case study</label>
                      <input id={`${service.id}-case`} value={service.caseStudy ?? ""} onChange={(event) => updateItem(service.id, { caseStudy: event.target.value })} />
                    </div>
                    <ImageField id={service.id} field="image" value={service.image} />
                  </div>
                </article>
              );
            }

            if (kind === "technologies") {
              const technology = item as Technology;
              return (
                <article className="surface cms-item" key={technology.id}>
                  <div className="cms-item-heading">
                    <span className="kicker">{technology.id}</span>
                    <strong>{technology.name}</strong>
                    <button className="button secondary cms-delete" onClick={() => removeItem(technology.id)} type="button">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor={`${technology.id}-name`}>Name</label>
                      <input id={`${technology.id}-name`} value={technology.name} onChange={(event) => updateItem(technology.id, { name: event.target.value })} />
                    </div>
                    <div className="field">
                      <label htmlFor={`${technology.id}-category`}>Category</label>
                      <input id={`${technology.id}-category`} value={technology.category} onChange={(event) => updateItem(technology.id, { category: event.target.value })} />
                    </div>
                    <div className="field">
                      <label htmlFor={`${technology.id}-icon`}>Icon</label>
                      <select id={`${technology.id}-icon`} value={technology.icon} onChange={(event) => updateItem(technology.id, { icon: event.target.value })}>
                        {iconOptions.map((icon) => <option value={icon} key={icon}>{icon}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor={`${technology.id}-metric`}>Case metric</label>
                      <input id={`${technology.id}-metric`} value={technology.caseMetric ?? ""} onChange={(event) => updateItem(technology.id, { caseMetric: event.target.value })} />
                    </div>
                    <div className="field full">
                      <label htmlFor={`${technology.id}-description`}>Description</label>
                      <textarea id={`${technology.id}-description`} value={technology.description} onChange={(event) => updateItem(technology.id, { description: event.target.value })} />
                    </div>
                    <div className="field full">
                      <label htmlFor={`${technology.id}-case`}>Case study</label>
                      <input id={`${technology.id}-case`} value={technology.caseStudy ?? ""} onChange={(event) => updateItem(technology.id, { caseStudy: event.target.value })} />
                    </div>
                    <ImageField id={technology.id} field="image" value={technology.image} />
                  </div>
                </article>
              );
            }

            if (kind === "solutions") {
              const solution = item as Solution;
              return (
                <article className="surface cms-item" key={solution.id}>
                  <div className="cms-item-heading">
                    <span className="kicker">{solution.id}</span>
                    <strong>{solution.title}</strong>
                    <button className="button secondary cms-delete" onClick={() => removeItem(solution.id)} type="button">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor={`${solution.id}-title`}>Title</label>
                      <input id={`${solution.id}-title`} value={solution.title} onChange={(event) => updateItem(solution.id, { title: event.target.value })} />
                    </div>
                    <div className="field">
                      <label htmlFor={`${solution.id}-industry`}>Industry</label>
                      <input id={`${solution.id}-industry`} value={solution.industry} onChange={(event) => updateItem(solution.id, { industry: event.target.value })} />
                    </div>
                    <div className="field full">
                      <label htmlFor={`${solution.id}-description`}>Description</label>
                      <textarea id={`${solution.id}-description`} value={solution.description} onChange={(event) => updateItem(solution.id, { description: event.target.value })} />
                    </div>
                    <ImageField id={solution.id} field="image" value={solution.image} />
                  </div>
                </article>
              );
            }

            const example = item as Example;
            return (
              <article className="surface cms-item" key={example.id}>
                <div className="cms-item-heading">
                  <span className="kicker">{example.id}</span>
                  <strong>{example.title}</strong>
                  <button className="button secondary cms-delete" onClick={() => removeItem(example.id)} type="button">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor={`${example.id}-title`}>Title</label>
                    <input id={`${example.id}-title`} value={example.title} onChange={(event) => updateItem(example.id, { title: event.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor={`${example.id}-eyebrow`}>Eyebrow</label>
                    <input id={`${example.id}-eyebrow`} value={example.eyebrow} onChange={(event) => updateItem(example.id, { eyebrow: event.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor={`${example.id}-category`}>Category</label>
                    <select id={`${example.id}-category`} value={example.category} onChange={(event) => updateItem(example.id, { category: event.target.value })}>
                      {exampleCategories.map((category) => <option value={category} key={category}>{category}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor={`${example.id}-timeline`}>Timeline</label>
                    <input id={`${example.id}-timeline`} value={example.timeline} onChange={(event) => updateItem(example.id, { timeline: event.target.value })} />
                  </div>
                  <div className="field full">
                    <label htmlFor={`${example.id}-description`}>Description</label>
                    <textarea id={`${example.id}-description`} value={example.description} onChange={(event) => updateItem(example.id, { description: event.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor={`${example.id}-capabilities`}>Capabilities (one per line)</label>
                    <textarea id={`${example.id}-capabilities`} value={listField(example.capabilities)} onChange={(event) => updateItem(example.id, { capabilities: parseList(event.target.value) })} />
                  </div>
                  <div className="field">
                    <label htmlFor={`${example.id}-stack`}>Stack (one per line)</label>
                    <textarea id={`${example.id}-stack`} value={listField(example.stack)} onChange={(event) => updateItem(example.id, { stack: parseList(event.target.value) })} />
                  </div>
                  <div className="field full">
                    <label htmlFor={`${example.id}-metric`}>Metric</label>
                    <input id={`${example.id}-metric`} value={example.metric} onChange={(event) => updateItem(example.id, { metric: event.target.value })} />
                  </div>
                  <ImageField id={example.id} field="media" value={example.media} />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
