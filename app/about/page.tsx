import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { LocaleText, PageHero } from "@/components/site";

export const metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Antitude" title="Useful technology starts with understanding." description="We are a senior technology partner for CTOs, enterprise leaders, and founders navigating consequential decisions, complex systems, and meaningful change." />
      <section className="section"><div className="shell split"><div><span className="eyebrow"><LocaleText>What we believe</LocaleText></span><h2 className="h2"><LocaleText>Technology should accelerate ambition, not anchor it.</LocaleText></h2><p className="lede">Antitude brings strategy, engineering, and responsible AI together around the problem in front of you. We make trade-offs visible, build with care, and stay close through adoption.</p></div><div className="dark-panel quote"><p>“The best technology partner makes the next decision easier.”</p><cite>Antitude principles</cite></div></div></section>
      <section className="section-tight"><div className="shell"><div className="section-head"><div><span className="eyebrow"><LocaleText>Our principles</LocaleText></span><h2 className="h2"><LocaleText>Built for the next move.</LocaleText></h2></div></div><div className="grid-3">{["Senior practitioners from day one", "A clear point of view without lock-in", "Quality, security, and adoption by design"].map((principle) => <div className="surface card-body" key={principle}><span className="check"><Check size={13} /></span><h3 className="h3" style={{ marginTop: 20 }}>{principle}</h3></div>)}</div><Link href="/contact" className="button dark" style={{ marginTop: 32 }}><LocaleText>Start a conversation</LocaleText> <ArrowRight size={14} /></Link></div></section>
    </>
  );
}