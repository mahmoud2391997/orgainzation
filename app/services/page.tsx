import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { Icon, PageHero } from "@/components/site";

export const metadata = { title: "Services" };

const serviceGroups = [
  { number: "01", eyebrow: "Product delivery", title: "Build the experience", description: "Customer-facing products and internal systems designed around real workflows.", ids: ["s8", "s2", "s7", "s9"] },
  { number: "02", eyebrow: "Intelligence & connection", title: "Make work smarter", description: "AI, automation, and integrations that turn disconnected tools into useful momentum.", ids: ["s1", "s10", "s11", "s6"] },
  { number: "03", eyebrow: "Platform & confidence", title: "Scale without the drama", description: "Cloud foundations, quality, and transformation practices that make change durable.", ids: ["s3", "s12", "s4", "s5"] },
];

export default async function ServicesPage() {
  const { services } = await getCmsContent();
  return (
    <>
      <PageHero eyebrow="Capabilities" title="A partner for the parts that matter." description="From the first useful question to the last mile of adoption, we bring the people and practices required to make change stick." />
      <section className="section">
        <div className="shell">
          {serviceGroups.map((group) => {
            const groupedServices = group.ids.map((id) => services.find((service) => service.id === id)).filter((service): service is (typeof services)[number] => Boolean(service));
            return <div className="service-group" key={group.number}>
              <div className="service-group-head"><div className="service-group-index">{group.number}</div><div><span className="eyebrow">{group.eyebrow}</span><h2 className="h2">{group.title}</h2><p className="lede">{group.description}</p></div></div>
              <div className="grid-2">
          {groupedServices.map((service) => (
            <article className="surface service-card" key={service.id}>
              <img className="card-image" src={service.image} alt="" style={{ height: 220 }} />
              <div className="card-body"><div className="card-icon"><Icon name={service.icon} size={19} /></div><h2 className="h3">{service.name}</h2><p>{service.detailedDescription}</p>{service.offerings?.length ? <ul className="offering-list">{service.offerings.slice(0, 5).map((offering) => <li key={offering}>{offering}</li>)}</ul> : null}<div className="tag-row">{service.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>{service.caseStudy ? <div className="case-result"><span>Example outcome</span><strong>{service.caseStudy}</strong><small>{service.caseMetric}</small></div> : null}<div className="card-footer"><Link className="card-link" href={`/services/${service.slug}`}>Explore this capability <ArrowRight size={14} /></Link></div></div>
            </article>
          ))}
              </div>
            </div>;
          })}
        </div>
      </section>
      <section className="section-tight"><div className="shell dark-panel" style={{ padding: "45px 48px" }}><div className="split" style={{ gap: 32 }}><div><span className="eyebrow" style={{ color: "var(--cyan)" }}>Not sure where to start?</span><h2 className="h2" style={{ color: "white" }}>Bring the messy version.</h2></div><div><p className="lede" style={{ color: "#aabac8", marginTop: 0 }}>We will help you find the right first move and make the trade-offs visible.</p><Link href="/appointment" className="button primary" style={{ marginTop: 19 }}>Talk to an expert <ArrowRight size={14} /></Link></div></div></div></section>
    </>
  );
}
