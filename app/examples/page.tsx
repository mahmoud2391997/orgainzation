import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ExamplesBrowser } from "@/components/examples-browser";
import { PageHero } from "@/components/site";

export const metadata = { title: "Examples | Antitude", description: "Explore practical examples across Antitude services, solutions, and technologies." };

export default function ExamplesPage() {
  return <main><PageHero eyebrow="Examples library" title="See what useful looks like." description="A field guide to the products, platforms, and intelligent systems we help ambitious teams bring to life." /><section className="section-tight"><div className="shell"><div className="examples-intro"><div><p className="kicker">From first brief to useful outcome</p><h2 className="h2">Choose a direction.<br /><span className="text-gradient">Find your next move.</span></h2></div><Link href="/appointment" className="button dark">Discuss your version <ArrowRight size={14} /></Link></div><ExamplesBrowser /></div></section></main>;
}
