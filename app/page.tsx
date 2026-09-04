import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { Icon, SectionHeader } from "@/components/site";
import { ServicesCarousel } from "@/components/services-carousel";
import { ConsultationForm } from "@/components/consultation-form";
import { HeroVisual } from "@/components/hero-visual";

export default async function HomePage() {
  const { services, solutions, technologies } = await getCmsContent();
  return (
    <>
      <section className="hero">
        <div className="shell hero-layout">
          <div className="hero-content">
            <span className="eyebrow" style={{ color: "var(--cyan)" }}>Technology partner · since 2014</span>
            <h1 className="display reveal">Make complex <span className="text-gradient">useful.</span></h1>
            <p className="lede reveal-2">Antitude helps CTOs, enterprise leaders, and founders turn difficult technology into clear, measurable momentum. Strategy, engineering, and responsible AI—working as one.</p>
            <div className="hero-meta reveal-2"><span className="hero-bullet">Senior teams only</span><span className="hero-bullet">Outcome-led</span><span className="hero-bullet">No black boxes</span></div>
            <div className="hero-actions reveal-3"><Link href="/appointment" className="button primary large">Tell us what matters <ArrowRight size={16} /></Link><Link href="/about" className="button secondary large">About Antitude <ArrowRight size={16} /></Link></div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <div className="shell proof-rail" aria-label="Antitude proof points"><div><strong>10+</strong><span>years making hard work clearer</span></div><div><strong>3</strong><span>disciplines, one senior team</span></div><div><strong>∞</strong><span>curiosity for what comes next</span></div></div>

      <section className="section" id="services">
        <div className="shell">
          <SectionHeader eyebrow="Core services" title="A sharp team for the messy middle." description="From custom platforms and AI systems to cloud foundations, quality, and product delivery, we make difficult work executable." action={<Link className="button secondary" href="/services">Explore capabilities <ArrowRight size={14} /></Link>} />
          <ServicesCarousel services={services} />
          <div className="case-strip" aria-label="Featured service cases">{services.slice(0, 3).map((service) => <Link className="case-chip" href={`/services/${service.slug}`} key={service.id}><span>Case in point</span><strong>{service.caseStudy ?? service.name}</strong><small>{service.caseMetric ?? service.description}</small><ArrowRight size={14} /></Link>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeader eyebrow="Technology radar" title="The stack is a means, not the strategy." description="We choose practical technologies for durable products, grounded intelligence, secure integrations, and resilient operations." action={<Link className="button secondary" href="/technologies">Explore technologies <ArrowRight size={14} /></Link>} />
          <div className="technology-grid">
            {technologies.map((technology) => (
              <article className="surface technology-card" key={technology.id}>
                <img className="technology-image" src={technology.image} alt={`${technology.name} technology`} />
                <div className="technology-body"><div className="card-icon"><Icon name={technology.icon} size={19} /></div><div><h3 className="h3">{technology.name}</h3><p>{technology.description}</p></div><Link className="card-link" href="/technologies">Explore <ArrowRight size={14} /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHeader eyebrow="Industry perspective" title="Context changes the answer." description="Technology becomes more useful when it respects the decisions, controls, and human moments in your industry." action={<Link className="button secondary" href="/solutions">Explore solutions <ArrowRight size={14} /></Link>} />
          <div className="grid-2">
            {solutions.map((solution) => (
              <Link href="/solutions" className="project-card" key={solution.id}>
                <img src={solution.image} alt={`${solution.title} industry`} />
                <div className="project-overlay"><span className="project-industry">{solution.industry}</span><h3>{solution.title}</h3><p>{solution.description}</p><div className="card-footer"><span className="card-link">Explore the opportunity <ArrowRight size={14} /></span></div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationForm />
    </>
  );
}
