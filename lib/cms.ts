import "server-only";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { content, type Service, type Solution, type Technology } from "@/lib/content";

export type CmsKind = "services" | "technologies" | "solutions";
type CmsItem = Service | Technology | Solution;
type CmsOverrides = Partial<Record<CmsKind, CmsItem[]>>;

const cmsPath = path.join(process.cwd(), "data/cms.json");

async function readOverrides(): Promise<CmsOverrides> {
  try {
    return JSON.parse(await readFile(cmsPath, "utf8")) as CmsOverrides;
  } catch {
    return {};
  }
}

export async function getCmsContent() {
  noStore();
  const overrides = await readOverrides();
  return {
    services: (overrides.services ?? content.services).map((item) => ({ ...item, caseStudy: "caseStudy" in item ? item.caseStudy : undefined, caseMetric: "caseMetric" in item ? item.caseMetric : undefined })) as Service[],
    technologies: (overrides.technologies ?? content.technologies) as Technology[],
    solutions: (overrides.solutions ?? content.solutions) as Solution[],
  };
}

export async function updateCmsContent(kind: CmsKind, items: CmsItem[]) {
  const overrides = await readOverrides();
  overrides[kind] = items;
  await writeFile(cmsPath, JSON.stringify(overrides, null, 2));
  return getCmsContent();
}
