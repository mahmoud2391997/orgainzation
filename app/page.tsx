import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { HeroContent, Icon, LocaleText, ProofRail, SectionHeader } from "@/components/site";
import { ServicesCarousel } from "@/components/services-carousel";
import { ConsultationForm } from "@/components/consultation-form";
import { HeroVisual } from "@/components/hero-visual";
import { Radar } from "@/components/radar";

export default async function HomePage() {
  const { services, solutions, technologies } = await getCmsContent();
  const catalogServiceIds = ["s10", "s8", "s11", "s12", "s5"];
  const catalogServices = catalogServiceIds.map((id) => services.find((service) => service.id === id)).filter((service): service is (typeof services)[number] => Boolean(service));
  const featuredCases = ["s1", "s2", "s3"].map((id) => services.find((service) => service.id === id)).filter((service): service is (typeof services)[number] => Boolean(service));
  return (
    <>
      <section className="hero">
        <div className="shell hero-layout">
          <HeroContent />
          <HeroVisual />
        </div>
      </section>

      <ProofRail />

      <section className="section" id="services">
        <div className="shell">
          <SectionHeader eyebrow="What we do" title="A sharp team for the messy middle." description="Five focused offers take work from useful question to dependable outcome." action={<Link className="button secondary" href="/services"><LocaleText>Explore services</LocaleText> <ArrowRight size={14} /></Link>} />
          <ServicesCarousel services={catalogServices} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeader eyebrow="What we build with" title="The stack is a means, not the strategy." description="Technologies support the service outcome: intelligence, products, connected systems, and resilient operations." action={<Link className="button secondary" href="/technologies"><LocaleText>Explore technologies</LocaleText> <ArrowRight size={14} /></Link>} />
          <Radar services={services} technologies={technologies} solutions={solutions} />
          <div className="technology-grid">
            {technologies.map((technology) => (
              <article className="surface technology-card" key={technology.id}>
                <img className="technology-image" src={technology.image} alt={`${technology.name} technology`} />
                <div className="technology-body"><div className="card-icon"><Icon name={technology.icon} size={19} /></div><div><h3 className="h3">{technology.name}</h3><p>{technology.description}</p></div><Link className="card-link" href="/technologies"><LocaleText>Explore</LocaleText> <ArrowRight size={14} /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeader eyebrow="Examples" title="Proof, not promises." description="Three case studies show the outcomes behind our services." action={<Link className="button secondary" href="/examples"><LocaleText>Explore examples</LocaleText> <ArrowRight size={14} /></Link>} />
          <div className="home-examples-grid">{featuredCases.map((service) => <Link href={`/services/${service.slug}`} className="home-example-card" key={service.id}><img src={service.image} alt="" /><div><span className="kicker"><LocaleText>Case in point</LocaleText></span><h3>{service.caseStudy ?? service.name}</h3><p>{service.caseMetric ?? service.description}</p><small>{service.description}</small><ArrowRight size={15} /></div></Link>)}</div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHeader eyebrow="Industry perspective" title="Context changes the answer." description="Technology becomes more useful when it respects the decisions, controls, and human moments in your industry." action={<Link className="button secondary" href="/solutions"><LocaleText>Explore solutions</LocaleText> <ArrowRight size={14} /></Link>} />
          <div className="grid-2">
            {solutions.map((solution) => (
              <Link href="/solutions" className="project-card" key={solution.id}>
                <img src={solution.image} alt={`${solution.title} industry`} />
                <div className="project-overlay"><span className="project-industry">{solution.industry}</span><h3>{solution.title}</h3><p>{solution.description}</p><div className="card-footer"><span className="card-link"><LocaleText>Explore the opportunity</LocaleText> <ArrowRight size={14} /></span></div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationForm />
    </>
  );
}
