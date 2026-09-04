import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { PageHero } from "@/components/site";

export const metadata = { title: "Solutions" };

export default async function SolutionsPage() {
  const { solutions } = await getCmsContent();
  return (
    <>
      <PageHero eyebrow="Industry perspective" title="Context changes the answer." description="We pair technology fluency with a working understanding of the environments where the stakes are highest." />
      <section className="section"><div className="shell grid-2">{solutions.map((solution) => <Link href="/appointment" className="project-card" key={solution.id}><img src={solution.image} alt={`${solution.title} industry`} /><div className="project-overlay"><span className="project-industry">{solution.industry}</span><h2>{solution.title}</h2><p>{solution.description}</p><div className="case-result"><span>Case lens</span><strong>{solution.industry === "Healthcare" ? "Connected care, clearer operations" : solution.industry === "Financial services" ? "Trusted decisions at digital speed" : solution.industry === "Retail" ? "Signals turned into customer moments" : "Intelligence for critical assets"}</strong></div><div className="card-footer"><span className="card-link">Explore the opportunity <ArrowRight size={14} /></span></div></div></Link>)}</div></section>
      <section className="section-tight"><div className="shell split"><div><span className="eyebrow">A point of view, not a template</span><h2 className="h2">Your constraints are where the value is.</h2></div><div><p className="lede" style={{ marginTop: 0 }}>We do not force every industry into the same transformation story. We learn the decisions, controls, and human moments that make yours distinct.</p><Link href="/appointment" className="button dark" style={{ marginTop: 22 }}>Share your context <ArrowRight size={14} /></Link></div></div></section>
    </>
  );
}
