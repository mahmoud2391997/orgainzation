export type IconName =
  | "spark"
  | "code"
  | "cloud"
  | "layers"
  | "shield"
  | "radar"
  | "database"
  | "globe"
  | "network";

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  detailedDescription: string;
  icon: IconName;
  technologies: string[];
  image: string;
};

export type Technology = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: IconName;
  image: string;
};

export type Solution = {
  id: string;
  title: string;
  description: string;
  industry: string;
  image: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  services: string[];
  image: string;
  industry: string;
  projectUrl: string;
  results: string[];
};

export const services: Service[] = [
  {
    id: "s1",
    name: "AI & machine learning",
    slug: "ai-machine-learning",
    description: "Turn complex data into decisions your teams can trust.",
    detailedDescription:
      "We design practical AI systems that move from prototype to production with clear guardrails, measurable outcomes, and a human point of view. From retrieval systems to predictive models, every engagement starts with the business signal.",
    icon: "spark",
    technologies: ["Python", "OpenAI", "PyTorch", "Azure AI"],
    image: "/images/service-ai.jpg",
  },
  {
    id: "s2",
    name: "Custom software development",
    slug: "custom-software-development",
    description: "Digital products engineered for the way your business actually works.",
    detailedDescription:
      "Product-minded engineering teams for ambitious software. We map the real workflow, simplify the hard parts, and ship reliable web and mobile experiences that compound in value.",
    icon: "code",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    image: "/images/service-software.jpg",
  },
  {
    id: "s3",
    name: "Cloud & platform engineering",
    slug: "cloud-platform-engineering",
    description: "Resilient platforms that make scale feel uneventful.",
    detailedDescription:
      "We modernize infrastructure around your risk profile, from cloud foundations and observability to platform automation. The result is faster delivery without sacrificing security or operational control.",
    icon: "cloud",
    technologies: ["AWS", "Kubernetes", "Terraform", "Datadog"],
    image: "/images/service-cloud.jpg",
  },
  {
    id: "s4",
    name: "Digital transformation",
    slug: "digital-transformation",
    description: "Make change tangible across systems, teams, and customer moments.",
    detailedDescription:
      "Transformation only matters when it changes the day-to-day. We align leadership, operating models, and technology to make your next chapter executable—not just presentable.",
    icon: "layers",
    technologies: ["Discovery", "Product strategy", "Change design", "Systems thinking"],
    image: "/images/service-transformation.jpg",
  },
  {
    id: "s5",
    name: "Quality engineering",
    slug: "quality-engineering",
    description: "Ship with confidence, not crossed fingers.",
    detailedDescription:
      "Quality is designed in. Our engineers build test strategy, automation, and release intelligence into the product lifecycle so your teams can move quickly and sleep well.",
    icon: "shield",
    technologies: ["Playwright", "Cypress", "k6", "CI/CD"],
    image: "/images/service-quality.jpg",
  },
  {
    id: "s6",
    name: "Technology consulting",
    slug: "technology-consulting",
    description: "Clarity for decisions with a long shadow.",
    detailedDescription:
      "Independent technical perspective for moments that matter: architecture reviews, build-versus-buy decisions, operating model design, and a pragmatic path from current state to future state.",
    icon: "radar",
    technologies: ["Architecture", "Roadmaps", "Due diligence", "Advisory"],
    image: "/images/service-consulting.jpg",
  },
];

export const technologies: Technology[] = [
  { id: "t1", name: "Generative AI", description: "Grounded copilots, retrieval systems, evaluation, and responsible model integration.", category: "Artificial intelligence", icon: "spark", image: "/images/technology-generative-ai.jpg" },
  { id: "t2", name: "Cloud native", description: "Composable cloud foundations engineered for velocity and resilience.", category: "Cloud & infrastructure", icon: "cloud", image: "/images/technology-cloud-native.jpg" },
  { id: "t3", name: "Data platforms", description: "Modern pipelines and semantic layers that make data useful at the moment of need.", category: "Data & analytics", icon: "database", image: "/images/technology-data-platforms.jpg" },
  { id: "t4", name: "Web applications", description: "Fast, accessible products with a considered interface and durable architecture.", category: "Product engineering", icon: "globe", image: "/images/technology-web-applications.jpg" },
  { id: "t5", name: "Intelligent automation", description: "Connect systems, orchestrate work, and remove the expensive repetition.", category: "Artificial intelligence", icon: "network", image: "/images/technology-automation.jpg" },
  { id: "t6", name: "Cyber resilience", description: "Security posture, identity, and observable operations woven into delivery.", category: "Cloud & infrastructure", icon: "shield", image: "/images/technology-cyber-resilience.jpg" },
];

export const solutions: Solution[] = [
  { id: "so1", title: "Healthcare & life sciences", description: "Make care more connected, outcomes more measurable, and operations less manual.", industry: "Healthcare", image: "/images/solution-healthcare.jpg" },
  { id: "so2", title: "Financial services", description: "Build trusted digital experiences for a sector where every decision carries weight.", industry: "Financial services", image: "/images/solution-finance.jpg" },
  { id: "so3", title: "Retail & consumer", description: "Turn customer signals into useful, timely experiences across every channel.", industry: "Retail", image: "/images/solution-retail.jpg" },
  { id: "so4", title: "Energy & industrials", description: "Bring intelligence to complex assets, field teams, and critical infrastructure.", industry: "Energy", image: "/images/solution-energy.jpg" },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Northstar Clinical Intelligence",
    slug: "northstar-clinical-intelligence",
    description: "A clinical evidence platform that gives care teams signal before noise.",
    fullDescription: "Northstar brought fragmented clinical evidence into one calm, searchable workspace. Antitude shaped the product strategy, built the retrieval layer, and created a secure workflow for review and feedback.",
    technologies: ["Generative AI", "React", "Python"],
    services: ["AI & machine learning", "Custom software development"],
    image: "/images/project-clinical.jpg",
    industry: "Healthcare",
    projectUrl: "https://example.com",
    results: ["42% faster evidence review", "3.1× more weekly active users", "Audit-ready feedback loops"],
  },
  {
    id: "p2",
    title: "Lumen Operations Cloud",
    slug: "lumen-operations-cloud",
    description: "Real-time visibility for a distributed energy network.",
    fullDescription: "Lumen helps operations teams see the system as it moves. We unified field data, alerts, and work orders into a platform designed around decisive moments—not dashboards for their own sake.",
    technologies: ["Cloud native", "Data platforms", "TypeScript"],
    services: ["Cloud & platform engineering", "Digital transformation"],
    image: "/images/project-lumen.jpg",
    industry: "Energy",
    projectUrl: "https://example.com",
    results: ["18 min saved per incident", "99.95% platform availability", "One source of operational truth"],
  },
  {
    id: "p3",
    title: "Arcway Member Experience",
    slug: "arcway-member-experience",
    description: "A more personal digital front door for a national financial institution.",
    fullDescription: "Arcway replaced disconnected member journeys with a fast, accessible experience that makes the next best action feel natural. A modular platform supports the next five years of growth.",
    technologies: ["Web applications", "Intelligent automation", "React"],
    services: ["Custom software development", "Quality engineering"],
    image: "/images/project-arcway.jpg",
    industry: "Financial services",
    projectUrl: "https://example.com",
    results: ["31% conversion lift", "2.4 s faster first interaction", "WCAG AA accessibility"],
  },
];

export const stats = [
  { value: "41", label: "engagements shipped" },
  { value: "9.4/10", label: "partner satisfaction" },
  { value: "18", label: "markets reached" },
  { value: "0", label: "black-box handoffs" },
];

export type LeadStatus = "new" | "contacted" | "qualified" | "lost";

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  preferredDate: string;
  status: LeadStatus;
  submittedAt: string;
};

export const seedLeads: Lead[] = [
  { id: "l1", firstName: "Mira", lastName: "Patel", email: "mira.patel@northshore.co", phone: "+1 415 555 0182", company: "Northshore", message: "We are exploring a grounded AI assistant for our service teams.", preferredDate: "2026-09-17", status: "new", submittedAt: "2026-09-10T09:12:00Z" },
  { id: "l2", firstName: "Jonas", lastName: "Berg", email: "jonas@lumenenergy.io", phone: "+46 70 555 4402", company: "Lumen Energy", message: "Looking for a platform partner for our operations modernization.", preferredDate: "2026-09-19", status: "contacted", submittedAt: "2026-09-08T15:36:00Z" },
  { id: "l3", firstName: "Eli", lastName: "Morgan", email: "eli.morgan@arcway.com", phone: "+1 212 555 0129", company: "Arcway", message: "We need an architecture review before the next investment round.", preferredDate: "2026-09-24", status: "qualified", submittedAt: "2026-09-05T11:08:00Z" },
];

export const content = { services, technologies, solutions, projects, stats };
