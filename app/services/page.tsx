import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { PageHero } from "@/components/site";
import { ServicesCatalog } from "@/components/services-catalog";
import { examples } from "@/lib/examples";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const { services } = await getCmsContent();
  return (
    <>
      <PageHero eyebrow="Capabilities" title="A partner for the parts that matter." description="From the first useful question to the last mile of adoption, we bring the people and practices required to make change stick." />
      <section className="section">
        <ServicesCatalog services={services} />
      </section>
      <section className="section-tight"><div className="shell"><div className="section-head"><div><p className="kicker">Examples</p><h2 className="h2">Outcomes in the wild.</h2><p className="section-subhead">A few ways these offers become useful products, systems, and workflows.</p></div><Link href="/examples" className="button secondary">View all examples <ArrowRight size={14} /></Link></div><div className="grid-3">{examples.filter((example) => example.category === "Services" || example.category === "Solutions").slice(0, 3).map((example) => <Link href="/examples" className="surface service-card" key={example.id}><img className="card-image" src={example.media} alt="" /><div className="card-body"><p className="kicker">{example.eyebrow}</p><h3 className="h3">{example.title}</h3><p>{example.description}</p><strong className="case-metric">{example.metric}</strong></div></Link>)}</div></div></section>
      <section className="section-tight"><div className="shell dark-panel" style={{ padding: "45px 48px" }}><div className="split" style={{ gap: 32 }}><div><span className="eyebrow" style={{ color: "var(--cyan)" }}>Not sure where to start?</span><h2 className="h2" style={{ color: "white" }}>Bring the messy version.</h2></div><div><p className="lede" style={{ color: "#aabac8", marginTop: 0 }}>We will help you find the right first move and make the trade-offs visible.</p><Link href="/appointment" className="button primary" style={{ marginTop: 19 }}>Talk to an expert <ArrowRight size={14} /></Link></div></div></div></section>
    </>
  );
}
