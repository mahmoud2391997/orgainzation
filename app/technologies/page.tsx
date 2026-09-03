import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { technologies } from "@/lib/content";
import { Icon, PageHero } from "@/components/site";

export const metadata = { title: "Technologies" };

export default function TechnologiesPage() {
  const categories = [...new Set(technologies.map((technology) => technology.category))];
  return (
    <>
      <PageHero eyebrow="Technology radar" title="The stack is a means, not the strategy." description="We choose tools for the job in front of you: durable enough for tomorrow, pragmatic enough for today, and always explained in plain language." />
      <section className="section"><div className="shell">{categories.map((category) => <div key={category} style={{ marginBottom: 58 }}><div className="section-head" style={{ marginBottom: 22 }}><div><p className="kicker">{category}</p><h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.7rem)" }}>{category === "Artificial intelligence" ? "Make intelligence actionable." : category === "Cloud & infrastructure" ? "Make scale uneventful." : category === "Data & analytics" ? "Make signal visible." : "Make products last."}</h2></div></div><div className="grid-3">{technologies.filter((technology) => technology.category === category).map((technology) => <article className="surface service-card" key={technology.id}><img className="card-image" src={technology.image} alt="" /><div className="card-body"><div className="card-icon"><Icon name={technology.icon} size={19} /></div><h3 className="h3">{technology.name}</h3><p>{technology.description}</p><div className="card-footer"><Link href="/appointment" className="card-link">Talk about your stack <ArrowRight size={14} /></Link></div></div></article>)}</div></div>)}</div></section>
    </>
  );
}
