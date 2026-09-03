"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/content";
import { PageHero } from "@/components/site";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const industries = ["All", ...new Set(projects.map((project) => project.industry))];
  const filtered = filter === "All" ? projects : projects.filter((project) => project.industry === filter);

  return (
    <>
      <PageHero eyebrow="Selected work" title="Proof over promises." description="The work changes shape, but the principle stays constant: make the important thing easier to understand, operate, and improve." />
      <section className="section"><div className="shell"><div className="filter-row" aria-label="Filter projects">{industries.map((industry) => <button className={`filter ${filter === industry ? "active" : ""}`} onClick={() => setFilter(industry)} key={industry}>{industry}</button>)}</div><div className="grid-3">{filtered.map((project) => <Link href={`/projects/${project.slug}`} className="project-card" key={project.id}><img src={project.image} alt="" /><div className="project-overlay"><span className="project-industry">{project.industry}</span><h2>{project.title}</h2><p>{project.description}</p><div className="card-footer"><span className="card-link">Read the story <ArrowRight size={14} /></span></div></div></Link>)}</div></div></section>
    </>
  );
}
