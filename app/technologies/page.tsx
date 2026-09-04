import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { Icon, PageHero } from "@/components/site";

export const metadata = { title: "Technologies" };

const technologyServices: Record<string, Array<{ label: string; slug: string }>> = {
  t1: [{ label: "AI & intelligent automation", slug: "ai-intelligent-automation" }],
  t2: [{ label: "Cloud, deployment & DevOps", slug: "cloud-deployment-devops" }],
  t3: [{ label: "AI & intelligent automation", slug: "ai-intelligent-automation" }, { label: "Software & product development", slug: "software-web-development" }],
  t4: [{ label: "Software & product development", slug: "software-web-development" }],
  t5: [{ label: "AI & intelligent automation", slug: "ai-intelligent-automation" }, { label: "API & systems integration", slug: "api-systems-integration" }],
  t6: [{ label: "Cloud, deployment & DevOps", slug: "cloud-deployment-devops" }, { label: "Quality engineering & advisory", slug: "quality-engineering" }],
};

export default async function TechnologiesPage() {
  const { technologies } = await getCmsContent();
  const categories = [...new Set(technologies.map((technology) => technology.category))];
  return (
    <>
      <PageHero eyebrow="What we build with" title="The stack is a means, not the strategy." description="Technologies are the building materials. Explore how each one supports a focused service outcome." />
      <section className="section"><div className="shell">{categories.map((category) => <div key={category} style={{ marginBottom: 58 }}><div className="section-head" style={{ marginBottom: 22 }}><div><p className="kicker">{category}</p><h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.7rem)" }}>{category === "Artificial intelligence" ? "Make intelligence actionable." : category === "Cloud & infrastructure" ? "Make scale uneventful." : category === "Data & analytics" ? "Make signal visible." : "Make products last."}</h2><p className="section-subhead">The tools that support this outcome.</p></div></div><div className="grid-3">{technologies.filter((technology) => technology.category === category).map((technology) => <article className="surface service-card" key={technology.id}><img className="card-image" src={technology.image} alt="" /><div className="card-body"><div className="card-icon"><Icon name={technology.icon} size={19} /></div><h3 className="h3">{technology.name}</h3><p>{technology.description}</p><div className="technology-support"><small>Supports</small>{(technologyServices[technology.id] ?? []).map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.label}<ArrowRight size={12} /></Link>)}</div><div className="card-footer"><Link href="/appointment" className="card-link">Talk about your stack <ArrowRight size={14} /></Link></div></div></article>)}</div></div>)}</div></section>
    </>
  );
}
