import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExamplesBrowser } from "@/components/examples-browser";
import { LocaleText, PageHero } from "@/components/site";

export const metadata = {
  title: "Examples",
  description: "Explore practical examples across Antitude services, solutions, and technologies.",
};

export default function ExamplesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Examples library"
        title="See what useful looks like."
        description="A field guide to the products, platforms, and intelligent systems we help ambitious teams bring to life."
      />
      <section className="section-tight">
        <div className="shell">
          <div className="examples-intro">
            <div>
              <p className="kicker">
                <LocaleText>From first brief to useful outcome</LocaleText>
              </p>
              <h2 className="h2">
                <LocaleText>Choose a direction.</LocaleText>
                <br />
                <span className="text-gradient">
                  <LocaleText>Find your next move.</LocaleText>
                </span>
              </h2>
            </div>
            <Link href="/appointment" className="button dark">
              <LocaleText>Discuss your version</LocaleText> <ArrowRight size={14} />
            </Link>
          </div>
          <ExamplesBrowser />
        </div>
      </section>
    </main>
  );
}
