import { getCmsContent } from "@/lib/cms";
import { PageHero } from "@/components/site";
import { TechnologiesCatalog } from "@/components/technologies-catalog";

export const metadata = { title: "Technologies" };

export default async function TechnologiesPage() {
  const { technologies } = await getCmsContent();
  return <>
      <PageHero eyebrow="What we build with" title="The stack is a means, not the strategy." description="Technologies are the building materials. Explore how each one supports a focused service outcome." />
      <section className="section"><TechnologiesCatalog technologies={technologies} /></section>
    </>;
}
