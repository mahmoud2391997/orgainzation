import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { LocaleText, PageHero } from "@/components/site";
import { ServicesCatalog } from "@/components/services-catalog";
import { ExamplesTeaserGrid } from "@/components/examples-teaser-grid";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const { services } = await getCmsContent();
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="A partner for the parts that matter."
        description="From the first useful question to the last mile of adoption, we bring the people and practices required to make change stick."
      />
      <section className="section">
        <ServicesCatalog services={services} />
      </section>
      <section className="section-tight">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="kicker"><LocaleText>Examples</LocaleText></p>
              <h2 className="h2"><LocaleText>Outcomes in the wild.</LocaleText></h2>
              <p className="section-subhead"><LocaleText>A few ways these offers become useful products, systems, and workflows.</LocaleText></p>
            </div>
            <Link href="/examples" className="button secondary">
              <LocaleText>View all examples</LocaleText> <ArrowRight size={14} />
            </Link>
          </div>
          <ExamplesTeaserGrid />
        </div>
      </section>
      <section className="section-tight">
        <div className="shell dark-panel" style={{ padding: "45px 48px" }}>
          <div className="split" style={{ gap: 32 }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--cyan)" }}>
                <LocaleText>Not sure where to start?</LocaleText>
              </span>
              <h2 className="h2" style={{ color: "white" }}>
                <LocaleText>Bring the messy version.</LocaleText>
              </h2>
            </div>
            <div>
              <p className="lede" style={{ color: "#aabac8", marginTop: 0 }}>
                <LocaleText>We will help you find the right first move and make the trade-offs visible.</LocaleText>
              </p>
              <Link href="/appointment" className="button primary" style={{ marginTop: 19 }}>
                <LocaleText>Talk to an expert</LocaleText> <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
