import "./load-env";
import { content, seedLeads } from "@/lib/content";
import { examples } from "@/lib/examples";
import { closeDb, getDb } from "@/lib/db";
import { cmsExamples, cmsServices, cmsSolutions, cmsTechnologies, leads } from "@/db/schema";

async function main() {
  const db = getDb();

  await db.insert(leads).values(seedLeads.map((lead) => ({ ...lead, submittedAt: new Date(lead.submittedAt) }))).onConflictDoNothing();
  console.log(`Seeded ${seedLeads.length} consultation leads (existing rows were preserved).`);

  const serviceCount = await db.select().from(cmsServices).then((rows) => rows.length);
  if (!serviceCount) {
    await db.insert(cmsServices).values(
      content.services.map((item, index) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        detailedDescription: item.detailedDescription,
        icon: item.icon,
        technologies: item.technologies,
        image: item.image,
        offerings: item.offerings ?? [],
        caseStudy: item.caseStudy ?? "",
        caseMetric: item.caseMetric ?? "",
        sortOrder: index,
      })),
    );
    console.log(`Seeded ${content.services.length} services.`);
  } else {
    console.log(`Skipped services seed (${serviceCount} rows already present).`);
  }

  const technologyCount = await db.select().from(cmsTechnologies).then((rows) => rows.length);
  if (!technologyCount) {
    await db.insert(cmsTechnologies).values(
      content.technologies.map((item, index) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        icon: item.icon,
        image: item.image,
        caseStudy: item.caseStudy ?? "",
        caseMetric: item.caseMetric ?? "",
        sortOrder: index,
      })),
    );
    console.log(`Seeded ${content.technologies.length} technologies.`);
  } else {
    console.log(`Skipped technologies seed (${technologyCount} rows already present).`);
  }

  const solutionCount = await db.select().from(cmsSolutions).then((rows) => rows.length);
  if (!solutionCount) {
    await db.insert(cmsSolutions).values(
      content.solutions.map((item, index) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        industry: item.industry,
        image: item.image,
        sortOrder: index,
      })),
    );
    console.log(`Seeded ${content.solutions.length} solutions.`);
  } else {
    console.log(`Skipped solutions seed (${solutionCount} rows already present).`);
  }

  const exampleCount = await db.select().from(cmsExamples).then((rows) => rows.length);
  if (!exampleCount) {
    await db.insert(cmsExamples).values(
      examples.map((item, index) => ({
        id: item.id,
        title: item.title,
        eyebrow: item.eyebrow,
        category: item.category,
        description: item.description,
        capabilities: item.capabilities,
        stack: item.stack,
        timeline: item.timeline,
        media: item.media,
        metric: item.metric,
        sortOrder: index,
      })),
    );
    console.log(`Seeded ${examples.length} examples.`);
  } else {
    console.log(`Skipped examples seed (${exampleCount} rows already present).`);
  }

  await closeDb();
}

main().catch(async (error) => {
  console.error("Seed failed:", error);
  await closeDb();
  process.exitCode = 1;
});
