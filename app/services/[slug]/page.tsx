import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { Icon } from "@/components/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return { title: service?.name ?? "Service" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <>
      <section className="page-hero"><div className="shell"><div className="breadcrumb"><Link href="/services">Services</Link><span>/</span><span>{service.name}</span></div><div style={{ marginTop: 35 }}><span className="eyebrow">Capability deep dive</span><h1 className="h1">{service.name}</h1><p className="lede">{service.description}</p></div></div></section>
      <section className="section"><div className="shell detail-grid"><div className="detail-copy"><img className="detail-image" src={service.image} alt="" /><div style={{ marginTop: 38 }}><h2 className="h2">Useful by design.</h2><p style={{ marginTop: 23 }}>{service.detailedDescription}</p><p>We bring an experienced, cross-functional team around the actual shape of your problem. That means the work is grounded in your operating context, not a generic playbook.</p><div className="capability-list" style={{ marginTop: 27 }}>{["A focused discovery that creates momentum", "A delivery plan with visible trade-offs", "Quality, security, and adoption built in"].map((item) => <div className="capability" style={{ color: "var(--muted)" }} key={item}><span className="check"><Check size={13} /></span>{item}</div>)}</div></div></div><aside className="detail-side"><div className="surface side-card"><div className="card-icon"><Icon name={service.icon} size={19} /></div><h4>Typical toolkit</h4><div className="tag-row">{service.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div></div><div className="dark-panel side-card" style={{ color: "white" }}><h4 style={{ color: "var(--cyan)" }}>Make a move</h4><p style={{ margin: "16px 0 20px", color: "#aabac8", fontSize: 14, lineHeight: 1.6 }}>Bring us the current state. We will help map the next useful step.</p><Link href="/appointment" className="button primary">Book a consultation <ArrowRight size={14} /></Link></div></aside></div></section>
      <section className="section-tight"><div className="shell"><Link className="card-link" href="/services"><ArrowLeft size={14} /> Back to all capabilities</Link></div></section>
    </>
  );
}
