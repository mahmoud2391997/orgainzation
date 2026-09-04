import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { PageHero } from "@/components/site";
import { ServicesCatalog } from "@/components/services-catalog";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const { services } = await getCmsContent();
  return (
    <>
      <PageHero eyebrow="Capabilities" title="A partner for the parts that matter." description="From the first useful question to the last mile of adoption, we bring the people and practices required to make change stick." />
      <section className="section">
        <ServicesCatalog services={services} />
      </section>
      <section className="section-tight"><div className="shell dark-panel" style={{ padding: "45px 48px" }}><div className="split" style={{ gap: 32 }}><div><span className="eyebrow" style={{ color: "var(--cyan)" }}>Not sure where to start?</span><h2 className="h2" style={{ color: "white" }}>Bring the messy version.</h2></div><div><p className="lede" style={{ color: "#aabac8", marginTop: 0 }}>We will help you find the right first move and make the trade-offs visible.</p><Link href="/appointment" className="button primary" style={{ marginTop: 19 }}>Talk to an expert <ArrowRight size={14} /></Link></div></div></div></section>
    </>
  );
}
