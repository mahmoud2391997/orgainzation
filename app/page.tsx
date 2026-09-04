import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { HeroContent, LocaleText, ProofRail, SectionHeader } from "@/components/site";
import { ServicesCarousel } from "@/components/services-carousel";
import { ConsultationForm } from "@/components/consultation-form";
import { HeroVisual } from "@/components/hero-visual";
import { Radar } from "@/components/radar";
import { TechnologiesGrid } from "@/components/technologies-grid";
import { SolutionsGrid } from "@/components/solutions-grid";
import { HomeExamplesShowcase } from "@/components/home-examples-showcase";

export default async function HomePage() {
  const { services, solutions, technologies } = await getCmsContent();
  const catalogServiceIds = ["s10", "s8", "s11", "s12", "s5"];
  const catalogServices = catalogServiceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is (typeof services)[number] => Boolean(service));

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
          <SectionHeader
            eyebrow="What we do"
            title="A sharp team for the messy middle."
            description="Five focused offers take work from useful question to dependable outcome."
            action={
              <Link key="services-action" className="button secondary" href="/services">
                <span><LocaleText>Explore services</LocaleText> <ArrowRight size={14} /></span>
              </Link>
            }
          />
          <ServicesCarousel services={catalogServices} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeader
            eyebrow="What we build with"
            title="The stack is a means, not the strategy."
            description="Technologies support the service outcome: intelligence, products, connected systems, and resilient operations."
            action={
              <Link key="tech-action" className="button secondary" href="/technologies">
                <span><LocaleText>Explore technologies</LocaleText> <ArrowRight size={14} /></span>
              </Link>
            }
          />
          <Radar services={services} technologies={technologies} solutions={solutions} />
          <TechnologiesGrid technologies={technologies} />
        </div>
      </section>

      {/* Real Apps Showcase from Examples Library */}
      <HomeExamplesShowcase />

      <section className="section-tight">
        <div className="shell">
          <SectionHeader
            eyebrow="Industry perspective"
            title="Context changes the answer."
            description="Technology becomes more useful when it respects the decisions, controls, and human moments in your industry."
            action={
              <Link key="solutions-action" className="button secondary" href="/solutions">
                <span><LocaleText>Explore solutions</LocaleText> <ArrowRight size={14} /></span>
              </Link>
            }
          />
          <SolutionsGrid solutions={solutions} isCompact />
        </div>
      </section>

      <ConsultationForm />
    </>
  );
}
