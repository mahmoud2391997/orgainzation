import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="page-hero"><div className="shell"><div className="breadcrumb"><Link href="/projects">Projects</Link><span>/</span><span>{project.industry}</span></div><div style={{ marginTop: 35 }}><span className="eyebrow">Case study</span><h1 className="h1">{project.title}</h1><p className="lede">{project.description}</p></div></div></section>
      <section className="section"><div className="shell detail-grid"><div className="detail-copy"><img className="detail-image" src={project.image} alt="" /><div style={{ marginTop: 38 }}><h2 className="h2">The useful version of ambitious.</h2><p style={{ marginTop: 23 }}>{project.fullDescription}</p><p>We worked alongside the client team from the first framing conversation through launch and iteration. The goal was not to add another system to the landscape—it was to make the important work feel more direct.</p><div className="dark-panel" style={{ marginTop: 36, padding: 28 }}><span className="eyebrow" style={{ color: "var(--cyan)" }}>What changed</span><div className="capability-list">{project.results.map((result) => <div className="capability" key={result}><span className="check"><Check size={13} /></span>{result}</div>)}</div></div></div></div><aside className="detail-side"><div className="surface side-card"><h4>Industry</h4><p style={{ margin: "13px 0 0", color: "var(--muted)", fontSize: 14 }}>{project.industry}</p><h4 style={{ marginTop: 25 }}>Capabilities</h4><div className="tag-row">{project.services.map((service) => <span className="tag" key={service}>{service}</span>)}</div><h4 style={{ marginTop: 25 }}>Technology</h4><div className="tag-row">{project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div></div><div className="dark-panel side-card" style={{ color: "white" }}><h4 style={{ color: "var(--cyan)" }}>Have a similar problem?</h4><p style={{ margin: "16px 0 20px", color: "#aabac8", fontSize: 14, lineHeight: 1.6 }}>We can help you find the smallest useful next step.</p><Link href="/appointment" className="button primary">Start a conversation <ArrowRight size={14} /></Link></div></aside></div></section>
      <section className="section-tight"><div className="shell"><Link className="card-link" href="/projects"><ArrowLeft size={14} /> Back to all work</Link></div></section>
    </>
  );
}
