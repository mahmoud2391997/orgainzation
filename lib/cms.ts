import "server-only";

import { asc } from "drizzle-orm";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import {
  cmsExamples,
  cmsServices,
  cmsSolutions,
  cmsTechnologies,
  type CmsExampleRow,
  type CmsServiceRow,
  type CmsSolutionRow,
  type CmsTechnologyRow,
} from "@/db/schema";
import { content, type IconName, type Service, type Solution, type Technology } from "@/lib/content";
import { getDb } from "@/lib/db";
import { allowJsonFallback } from "@/lib/env";
import { examples as seedExamples, type Example, type ExampleCategory } from "@/lib/examples";

export type CmsKind = "services" | "technologies" | "solutions" | "examples";
export type CmsItem = Service | Technology | Solution | Example;
export type CmsContent = {
  services: Service[];
  technologies: Technology[];
  solutions: Solution[];
  examples: Example[];
  source: "database" | "json";
};

type CmsOverrides = Partial<Record<CmsKind, CmsItem[]>>;

const cmsPath = path.join(process.cwd(), "data/cms.json");
const iconNames = new Set<IconName>(["spark", "code", "cloud", "layers", "shield", "radar", "database", "globe", "network"]);
const exampleCategories = new Set<ExampleCategory>(["Services", "Solutions", "Technologies"]);

async function readOverrides(): Promise<CmsOverrides> {
  try {
    return JSON.parse(await readFile(cmsPath, "utf8")) as CmsOverrides;
  } catch {
    return {};
  }
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function asIcon(value: unknown): IconName {
  const icon = String(value ?? "spark") as IconName;
  return iconNames.has(icon) ? icon : "spark";
}

function asExampleCategory(value: unknown): ExampleCategory {
  const category = String(value ?? "Services") as ExampleCategory;
  return exampleCategories.has(category) ? category : "Services";
}

function optionalText(value: unknown) {
  const text = String(value ?? "").trim();
  return text || undefined;
}

function toService(row: CmsServiceRow): Service {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    detailedDescription: row.detailedDescription,
    icon: asIcon(row.icon),
    technologies: asStringArray(row.technologies),
    image: row.image,
    offerings: asStringArray(row.offerings),
    caseStudy: optionalText(row.caseStudy),
    caseMetric: optionalText(row.caseMetric),
  };
}

function toTechnology(row: CmsTechnologyRow): Technology {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    icon: asIcon(row.icon),
    image: row.image,
    caseStudy: optionalText(row.caseStudy),
    caseMetric: optionalText(row.caseMetric),
  };
}

function toSolution(row: CmsSolutionRow): Solution {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    industry: row.industry,
    image: row.image,
  };
}

function toExample(row: CmsExampleRow): Example {
  return {
    id: row.id,
    title: row.title,
    eyebrow: row.eyebrow,
    category: asExampleCategory(row.category),
    description: row.description,
    capabilities: asStringArray(row.capabilities),
    stack: asStringArray(row.stack),
    timeline: row.timeline,
    media: row.media,
    metric: row.metric,
  };
}

function normalizeService(item: Partial<Service>, index: number): Service {
  const id = String(item.id ?? `s_${index + 1}`).trim() || `s_${index + 1}`;
  const name = String(item.name ?? "Untitled service").trim() || "Untitled service";
  const slugBase = String(item.slug ?? name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    id,
    name,
    slug: slugBase || id,
    description: String(item.description ?? "").trim(),
    detailedDescription: String(item.detailedDescription ?? "").trim(),
    icon: asIcon(item.icon),
    technologies: asStringArray(item.technologies),
    image: String(item.image ?? "").trim(),
    offerings: asStringArray(item.offerings),
    caseStudy: optionalText(item.caseStudy),
    caseMetric: optionalText(item.caseMetric),
  };
}

function normalizeTechnology(item: Partial<Technology>, index: number): Technology {
  return {
    id: String(item.id ?? `t_${index + 1}`).trim() || `t_${index + 1}`,
    name: String(item.name ?? "Untitled technology").trim() || "Untitled technology",
    description: String(item.description ?? "").trim(),
    category: String(item.category ?? "").trim(),
    icon: asIcon(item.icon),
    image: String(item.image ?? "").trim(),
    caseStudy: optionalText(item.caseStudy),
    caseMetric: optionalText(item.caseMetric),
  };
}

function normalizeSolution(item: Partial<Solution>, index: number): Solution {
  return {
    id: String(item.id ?? `so_${index + 1}`).trim() || `so_${index + 1}`,
    title: String(item.title ?? "Untitled solution").trim() || "Untitled solution",
    description: String(item.description ?? "").trim(),
    industry: String(item.industry ?? "").trim(),
    image: String(item.image ?? "").trim(),
  };
}

function normalizeExample(item: Partial<Example>, index: number): Example {
  return {
    id: String(item.id ?? `ex_${index + 1}`).trim() || `ex_${index + 1}`,
    title: String(item.title ?? "Untitled example").trim() || "Untitled example",
    eyebrow: String(item.eyebrow ?? "").trim(),
    category: asExampleCategory(item.category),
    description: String(item.description ?? "").trim(),
    capabilities: asStringArray(item.capabilities),
    stack: asStringArray(item.stack),
    timeline: String(item.timeline ?? "").trim(),
    media: String(item.media ?? "").trim(),
    metric: String(item.metric ?? "").trim(),
  };
}

function seedContent(): CmsContent {
  return {
    services: content.services,
    technologies: content.technologies,
    solutions: content.solutions,
    examples: seedExamples,
    source: "json",
  };
}

async function readFromJson(): Promise<CmsContent> {
  const overrides = await readOverrides();
  const defaults = seedContent();
  return {
    services: ((overrides.services as Service[] | undefined) ?? defaults.services).map((item, index) => normalizeService(item, index)),
    technologies: ((overrides.technologies as Technology[] | undefined) ?? defaults.technologies).map((item, index) => normalizeTechnology(item, index)),
    solutions: ((overrides.solutions as Solution[] | undefined) ?? defaults.solutions).map((item, index) => normalizeSolution(item, index)),
    examples: ((overrides.examples as Example[] | undefined) ?? defaults.examples).map((item, index) => normalizeExample(item, index)),
    source: "json",
  };
}

async function readFromDatabase(): Promise<CmsContent | null> {
  const db = getDb();
  const [serviceRows, technologyRows, solutionRows, exampleRows] = await Promise.all([
    db.select().from(cmsServices).orderBy(asc(cmsServices.sortOrder), asc(cmsServices.id)),
    db.select().from(cmsTechnologies).orderBy(asc(cmsTechnologies.sortOrder), asc(cmsTechnologies.id)),
    db.select().from(cmsSolutions).orderBy(asc(cmsSolutions.sortOrder), asc(cmsSolutions.id)),
    db.select().from(cmsExamples).orderBy(asc(cmsExamples.sortOrder), asc(cmsExamples.id)),
  ]);

  // Empty tables mean migrate/seed has not run yet — fall through to defaults.
  if (!serviceRows.length && !technologyRows.length && !solutionRows.length && !exampleRows.length) {
    return null;
  }

  return {
    services: serviceRows.map(toService),
    technologies: technologyRows.map(toTechnology),
    solutions: solutionRows.map(toSolution),
    examples: exampleRows.map(toExample),
    source: "database",
  };
}

async function writeToDatabase(kind: CmsKind, items: CmsItem[]) {
  const db = getDb();
  const now = new Date();

  if (kind === "services") {
    const services = (items as Service[]).map((item, index) => normalizeService(item, index));
    await db.delete(cmsServices);
    if (services.length) {
      await db.insert(cmsServices).values(
        services.map((item, index) => ({
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
          updatedAt: now,
        })),
      );
    }
    return;
  }

  if (kind === "technologies") {
    const technologies = (items as Technology[]).map((item, index) => normalizeTechnology(item, index));
    await db.delete(cmsTechnologies);
    if (technologies.length) {
      await db.insert(cmsTechnologies).values(
        technologies.map((item, index) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          icon: item.icon,
          image: item.image,
          caseStudy: item.caseStudy ?? "",
          caseMetric: item.caseMetric ?? "",
          sortOrder: index,
          updatedAt: now,
        })),
      );
    }
    return;
  }

  if (kind === "solutions") {
    const solutions = (items as Solution[]).map((item, index) => normalizeSolution(item, index));
    await db.delete(cmsSolutions);
    if (solutions.length) {
      await db.insert(cmsSolutions).values(
        solutions.map((item, index) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          industry: item.industry,
          image: item.image,
          sortOrder: index,
          updatedAt: now,
        })),
      );
    }
    return;
  }

  const examples = (items as Example[]).map((item, index) => normalizeExample(item, index));
  await db.delete(cmsExamples);
  if (examples.length) {
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
        updatedAt: now,
      })),
    );
  }
}

async function writeToJson(kind: CmsKind, items: CmsItem[]) {
  const overrides = await readOverrides();
  if (kind === "services") overrides.services = (items as Service[]).map((item, index) => normalizeService(item, index));
  if (kind === "technologies") overrides.technologies = (items as Technology[]).map((item, index) => normalizeTechnology(item, index));
  if (kind === "solutions") overrides.solutions = (items as Solution[]).map((item, index) => normalizeSolution(item, index));
  if (kind === "examples") overrides.examples = (items as Example[]).map((item, index) => normalizeExample(item, index));
  await writeFile(cmsPath, JSON.stringify(overrides, null, 2));
}

export async function getCmsContent(): Promise<CmsContent> {
  noStore();
  try {
    const fromDb = await readFromDatabase();
    if (fromDb) return fromDb;
  } catch (error) {
    console.log("Database unavailable, using JSON/seed fallback for CMS content");
    if (!allowJsonFallback()) throw error;
  }
  return readFromJson();
}

export async function updateCmsContent(kind: CmsKind, items: CmsItem[]) {
  try {
    await writeToDatabase(kind, items);
    return getCmsContent();
  } catch (error) {
    console.log("Database unavailable, using JSON fallback for CMS writes");
    if (!allowJsonFallback()) throw error;
    await writeToJson(kind, items);
    return getCmsContent();
  }
}

export function normalizeCmsItems(kind: CmsKind, items: unknown[]): CmsItem[] {
  if (kind === "services") return (items as Partial<Service>[]).map((item, index) => normalizeService(item, index));
  if (kind === "technologies") return (items as Partial<Technology>[]).map((item, index) => normalizeTechnology(item, index));
  if (kind === "solutions") return (items as Partial<Solution>[]).map((item, index) => normalizeSolution(item, index));
  return (items as Partial<Example>[]).map((item, index) => normalizeExample(item, index));
}
