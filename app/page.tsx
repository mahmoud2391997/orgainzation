import Link from "next/link";
import { ArrowRight, Check, Quote } from "lucide-react";
import { projects, services, stats } from "@/lib/content";
import { Icon, SectionHeader } from "@/components/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-content">
          <span className="eyebrow" style={{ color: "var(--cyan)" }}>Technology partner · since 2014</span>
          <h1 className="display reveal">Make complex <span className="text-gradient">useful.</span></h1>
          <p className="lede reveal-2">Antitude helps ambitious teams turn difficult technology into clear, measurable momentum. Strategy, engineering, and responsible AI—working as one.</p>
          <div className="hero-meta reveal-2">
            <span className="hero-bullet">Senior teams only</span>
            <span className="hero-bullet">Outcome-led</span>
            <span className="hero-bullet">No black boxes</span>
          </div>
          <div className="hero-actions reveal-3">
            <Link href="/appointment" className="button primary large">Tell us what matters <ArrowRight size={16} /></Link>
            <Link href="/projects" className="button secondary large">See the work <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="shell" aria-label="Antitude at a glance">
        <div className="stat-strip">
          {stats.map((stat) => <div className="stat" key={stat.label}><div className="stat-value">{stat.value}</div><div className="stat-label">{stat.label}</div></div>)}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeader eyebrow="What we do" title="The right kind of help, at the right moment." description="We make the hard parts legible, then build the thing that changes the outcome." action={<Link className="button secondary" href="/services">Explore capabilities <ArrowRight size={14} /></Link>} />
          <div className="grid-3">
            {services.slice(0, 3).map((service) => (
              <article className="surface service-card" key={service.id}>
                <img className="card-image" src={service.image} alt="" />
                <div className="card-body"><div className="card-icon"><Icon name={service.icon} size={19} /></div><h3 className="h3">{service.name}</h3><p>{service.description}</p><div className="card-footer"><Link className="card-link" href={`/services/${service.slug}`}>See how we help <ArrowRight size={14} /></Link></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell split">
          <div>
            <span className="eyebrow">A better operating model</span>
            <h2 className="h2">Technology should feel like <span className="text-gradient">leverage.</span></h2>
            <p className="lede">The best partner is not the loudest voice in the room. It is the one that can see around corners, explain the trade-offs, and stay close enough to make the work real.</p>
            <div className="capability-list">
              {["Senior practitioners from day one", "A clear point of view, without lock-in", "Built-in quality, security, and adoption"].map((item) => <div className="capability" key={item}><span className="check"><Check size={13} /></span>{item}</div>)}
            </div>
            <Link href="/appointment" className="button dark" style={{ marginTop: 29 }}>Meet your next partner <ArrowRight size={14} /></Link>
          </div>
          <div className="dark-panel quote"><div className="quote-mark"><Quote size={43} fill="currentColor" /></div><p>“Antitude gave us enough clarity to make the call—and enough capability to make it stick.”</p><cite>— Chief Digital Officer, global healthcare group</cite></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeader eyebrow="Selected work" title="Useful looks different in every industry." description="A few examples of the problems we have helped teams make smaller, clearer, and more solvable." action={<Link className="button secondary" href="/projects">View all work <ArrowRight size={14} /></Link>} />
          <div className="grid-3">
            {projects.map((project) => <Link href={`/projects/${project.slug}`} className="project-card" key={project.id}><img src={project.image} alt="" /><div className="project-overlay"><span className="project-industry">{project.industry}</span><h3>{project.title}</h3><p>{project.description}</p><div className="card-footer"><span className="card-link">Read the story <ArrowRight size={14} /></span></div></div></Link>)}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell dark-panel" style={{ padding: "55px 48px" }}>
          <div className="split" style={{ gap: 35 }}>
            <div><span className="eyebrow" style={{ color: "var(--cyan)" }}>Ready when you are</span><h2 className="h2" style={{ color: "white" }}>Bring us the hard question.</h2></div>
            <div><p className="lede" style={{ color: "#aabac8", marginTop: 0 }}>Start with a 30-minute conversation about the decision in front of you. No pitch deck required.</p><Link href="/appointment" className="button primary" style={{ marginTop: 22 }}>Book a consultation <ArrowRight size={14} /></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
