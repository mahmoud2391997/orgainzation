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
  offerings?: string[];
  caseStudy?: string;
  caseMetric?: string;
};

export type Technology = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: IconName;
  image: string;
  caseStudy?: string;
  caseMetric?: string;
};

export type Solution = {
  id: string;
  title: string;
  description: string;
  industry: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "s8",
    name: "Software & web development",
    slug: "software-web-development",
    description: "Modern, scalable web applications tailored to the way your business works.",
    detailedDescription: "From customer-facing platforms and internal dashboards to complex business systems, we build reliable digital solutions from idea to deployment.",
    icon: "code",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    offerings: ["Custom web application development", "Frontend and full-stack development", "SaaS and MVP development", "Admin dashboards and CRM systems", "ERP-style and multi-tenant platforms", "Customer portals and e-commerce", "Appointment and booking systems", "Database and backend development"],
    image: "/images/service-software.png",
    caseStudy: "Multi-tenant operations platform",
    caseMetric: "40–60% lower licensing overhead",
  },
  {
    id: "s9",
    name: "Mobile app development",
    slug: "mobile-app-development",
    description: "Practical mobile applications that connect customers, teams, and everyday operations.",
    detailedDescription: "From business apps and customer portals to booking and management applications, we build mobile solutions around real user needs.",
    icon: "globe",
    technologies: ["React Native", "TypeScript", "API integration", "Push notifications"],
    offerings: ["Cross-platform mobile applications", "Customer and client apps", "Business management apps", "Booking and appointment apps", "E-commerce mobile apps", "Employee and internal apps", "API and backend integration"],
    image: "/images/service-software.png",
    caseStudy: "Customer self-service mobile app",
    caseMetric: "One experience across iOS and Android",
  },
  {
    id: "s10",
    name: "AI & intelligent automation",
    slug: "ai-intelligent-automation",
    description: "AI-powered applications and workflows that help teams work smarter and reduce repetition.",
    detailedDescription: "We integrate modern AI models with existing systems, APIs, and workflows to create practical assistants and intelligent tools for real operations.",
    icon: "spark",
    technologies: ["OpenAI", "Python", "RAG", "Workflow automation"],
    offerings: ["AI-powered applications", "Chatbots and conversational assistants", "AI agents and workflow automation", "AI API integration", "Knowledge assistants and semantic search", "Document and data processing", "Voice-enabled AI applications", "Business process automation"],
    image: "/images/service-ai.png",
    caseStudy: "Grounded AI assistant for service teams",
    caseMetric: "75% of routine requests automated",
  },
  {
    id: "s11",
    name: "API & systems integration",
    slug: "api-systems-integration",
    description: "Connect the systems your business depends on and make work flow between them.",
    detailedDescription: "We design dependable integrations across internal tools, third-party platforms, payments, messaging, and automation workflows.",
    icon: "network",
    technologies: ["REST APIs", "Webhooks", "OAuth", "Event-driven systems"],
    offerings: ["API development", "Third-party API integration", "Systems integration", "Payment gateway integration", "Telegram, email, and messaging integrations", "Automation workflows"],
    image: "/images/service-cloud.png",
    caseStudy: "Connected operations workflow",
    caseMetric: "One reliable flow across business systems",
  },
  {
    id: "s12",
    name: "Cloud, deployment & DevOps",
    slug: "cloud-deployment-devops",
    description: "Ship reliably with infrastructure, environments, and deployment practices built for momentum.",
    detailedDescription: "We take applications from local development to stable production with secure hosting, repeatable deployments, and operational visibility.",
    icon: "cloud",
    technologies: ["Docker", "CI/CD", "VPS", "SSL and DNS"],
    offerings: ["Application deployment", "VPS and cloud server setup", "Docker containerization", "CI/CD setup", "Domain and SSL configuration", "Hosting and environment management"],
    image: "/images/service-cloud.png",
    caseStudy: "Repeatable production deployment",
    caseMetric: "Faster releases with fewer manual steps",
  },
  {
    id: "s1",
    name: "AI & machine learning",
    slug: "ai-machine-learning",
    description: "Turn complex data into decisions your teams can trust.",
    detailedDescription:
      "We design practical AI systems that move from prototype to production with clear guardrails, measurable outcomes, and a human point of view. From retrieval systems to predictive models, every engagement starts with the business signal.",
    icon: "spark",
    technologies: ["Python", "OpenAI", "PyTorch", "Azure AI"],
    image: "/images/service-ai.png",
    caseStudy: "Grounded AI assistant for service teams",
    caseMetric: "75% of routine requests automated",
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
    image: "/images/service-software.png",
    caseStudy: "Multi-tenant operations platform",
    caseMetric: "40–60% lower licensing overhead",
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
    image: "/images/service-cloud.png",
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
    image: "/images/service-transformation.png",
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
    image: "/images/service-quality.png",
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
    image: "/images/service-consulting.png",
  },
  {
    id: "s7",
    name: "Product engineering",
    slug: "product-engineering",
    description: "Move from an important idea to a product people can depend on.",
    detailedDescription:
      "We take products from ambiguous first brief to production scale, combining product strategy, human-centered design, and disciplined engineering. Each increment makes the next decision clearer and the product more useful.",
    icon: "globe",
    technologies: ["Product strategy", "React", "TypeScript", "Design systems"],
    image: "/images/service-software.png",
  },
];

export const serviceOffers: Service[] = services.slice(0, 5).map((service) => ({
  ...service,
  name: service.id === "s8" ? "Software & product development" : service.id === "s9" ? "Mobile experiences" : service.id === "s10" ? "AI & intelligent automation" : service.id === "s11" ? "API & systems integration" : "Cloud, deployment & DevOps",
  description: service.id === "s8" ? "Digital products and operational software shaped around the way your business works." : service.description,
  offerings: service.id === "s8" ? ["Web and SaaS products", "Mobile applications", "Customer portals", "Operational dashboards", "Backend and database systems"] : service.offerings,
}));

export const technologies: Technology[] = [
  { id: "t1", name: "Generative AI", description: "Grounded copilots, retrieval systems, evaluation, and responsible model integration.", category: "Artificial intelligence", icon: "spark", image: "/images/technology-generative-ai.png" },
  { id: "t2", name: "Cloud native", description: "Composable cloud foundations engineered for velocity and resilience.", category: "Cloud & infrastructure", icon: "cloud", image: "/images/technology-cloud-native.png" },
  { id: "t3", name: "Data platforms", description: "Modern pipelines and semantic layers that make data useful at the moment of need.", category: "Data & analytics", icon: "database", image: "/images/technology-data-platforms.png" },
  { id: "t4", name: "Web applications", description: "Fast, accessible products with a considered interface and durable architecture.", category: "Product engineering", icon: "globe", image: "/images/technology-web-applications.png" },
  { id: "t5", name: "Intelligent automation", description: "Connect systems, orchestrate work, and remove the expensive repetition.", category: "Artificial intelligence", icon: "network", image: "/images/technology-automation.png" },
  { id: "t6", name: "Cyber resilience", description: "Security posture, identity, and observable operations woven into delivery.", category: "Cloud & infrastructure", icon: "shield", image: "/images/technology-cyber-resilience.png" },
];

export const solutions: Solution[] = [
  { id: "so1", title: "Healthcare & life sciences", description: "Make care more connected, outcomes more measurable, and operations less manual.", industry: "Healthcare", image: "/images/solution-healthcare.png" },
  { id: "so2", title: "Financial services", description: "Build trusted digital experiences for a sector where every decision carries weight.", industry: "Financial services", image: "/images/solution-finance.png" },
  { id: "so3", title: "Retail & consumer", description: "Turn customer signals into useful, timely experiences across every channel.", industry: "Retail", image: "/images/solution-retail.png" },
  { id: "so4", title: "Energy & industrials", description: "Bring intelligence to complex assets, field teams, and critical infrastructure.", industry: "Energy", image: "/images/solution-energy.png" },
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

export const content = { services: serviceOffers, technologies, solutions };

export function enrichCmsContent<T extends Service | Technology | Solution>(items: T[]): T[] {
  return items.map((item) => item);
}
