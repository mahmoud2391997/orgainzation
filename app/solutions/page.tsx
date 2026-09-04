import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { LocaleText, PageHero } from "@/components/site";
import { SolutionsGrid } from "@/components/solutions-grid";

export const metadata = { title: "Solutions" };

export default async function SolutionsPage() {
  const { solutions } = await getCmsContent();
  return (
    <>
      <PageHero
        eyebrow="Industry perspective"
        title="Context changes the answer."
        description="We pair technology fluency with a working understanding of the environments where the stakes are highest."
      />
      <section className="section">
        <div className="shell">
          <SolutionsGrid solutions={solutions} />
        </div>
      </section>
      <section className="section-tight">
        <div className="shell split">
          <div>
            <span className="eyebrow">
              <LocaleText>A point of view, not a template</LocaleText>
            </span>
            <h2 className="h2"><LocaleText>Your constraints are where the value is.</LocaleText></h2>
          </div>
          <div>
            <p className="lede" style={{ marginTop: 0 }}>
              <LocaleText>We do not force every industry into the same transformation story. We learn the decisions, controls, and human moments that make yours distinct.</LocaleText>
            </p>
            <Link href="/appointment" className="button dark" style={{ marginTop: 22 }}>
              <LocaleText>Share your context</LocaleText> <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
