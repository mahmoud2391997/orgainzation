"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";
import { Icon } from "@/components/site";
import { useLanguage } from "@/components/language-provider";

const groups = [
  { number: "01", eyebrow: "Intelligence", title: "AI & intelligent automation", description: "Practical assistants and workflows that turn information into action.", ids: ["s10"] },
  { number: "02", eyebrow: "Product delivery", title: "Software & product development", description: "Customer-facing products and internal systems designed around real workflows.", ids: ["s8"] },
  { number: "03", eyebrow: "Connected systems", title: "API & systems integration", description: "Reliable connections between the tools, data, and services your business depends on.", ids: ["s11"] },
  { number: "04", eyebrow: "Platform", title: "Cloud, deployment & DevOps", description: "Infrastructure and release practices that make shipping repeatable.", ids: ["s12"] },
  { number: "05", eyebrow: "Confidence", title: "Quality engineering & advisory", description: "Quality, architecture, and technical perspective for decisions that matter.", ids: ["s5"] },
];

const arabic: Record<string, { name: string; description: string; detailed: string; offerings: string[] }> = {
  s10: { name: "الذكاء الاصطناعي والأتمتة الذكية", description: "مساعدات وسير عمل عملية تحول المعلومات إلى أفعال.", detailed: "نربط نماذج الذكاء الاصطناعي الحديثة بالأنظمة وواجهات البرمجة وسير العمل لإنشاء أدوات ذكية تخدم العمليات الحقيقية.", offerings: ["تطوير تطبيقات مدعومة بالذكاء الاصطناعي", "روبوتات المحادثة والمساعدات الذكية", "الوكلاء الذكيون وأتمتة سير العمل", "دمج واجهات الذكاء الاصطناعي", "البحث الدلالي ومساعدات المعرفة"] },
  s8: { name: "تطوير البرمجيات والمنتجات", description: "منتجات وأنظمة داخلية مصممة حول سير العمل الحقيقي.", detailed: "من المنصات الموجهة للعملاء ولوحات التحكم الداخلية إلى أنظمة الأعمال المعقدة، نبني حلولاً رقمية موثوقة من الفكرة إلى الإطلاق.", offerings: ["تطوير تطبيقات الويب المخصصة", "تطوير الواجهات الأمامية والكاملة", "تطوير منصات SaaS والمنتجات الأولية", "لوحات التحكم وأنظمة إدارة العملاء", "منصات المؤسسات ومتعددة المستأجرين"] },
  s11: { name: "تكامل واجهات البرمجة والأنظمة", description: "روابط موثوقة بين الأدوات والبيانات والخدمات التي يعتمد عليها عملك.", detailed: "نصمم تكاملات ثابتة بين الأدوات الداخلية والمنصات الخارجية والمدفوعات والرسائل وسير العمل الآلي.", offerings: ["تطوير واجهات البرمجة", "دمج واجهات الأطراف الخارجية", "تكامل الأنظمة", "دمج بوابات الدفع", "تكاملات تيليغرام والبريد والرسائل", "سير العمل الآلي"] },
  s12: { name: "السحابة والنشر وDevOps", description: "بنية تحتية وممارسات إصدار تجعل الشحن متكرراً وموثوقاً.", detailed: "ننقل التطبيقات من التطوير المحلي إلى الإنتاج المستقر عبر استضافة آمنة ونشرات قابلة للتكرار ورؤية تشغيلية واضحة.", offerings: ["نشر التطبيقات", "إعداد خوادم VPS والسحابة", "حاويات Docker", "إعداد CI/CD", "إعداد النطاقات وشهادات SSL", "إدارة الاستضافة والبيئات"] },
  s5: { name: "هندسة الجودة والاستشارات التقنية", description: "جودة ومعمارية ورؤية تقنية للقرارات المهمة.", detailed: "نبني استراتيجية الاختبار والأتمتة وذكاء الإصدارات داخل دورة حياة المنتج، مع منظور تقني مستقل عند الحاجة.", offerings: ["استراتيجية اختبار واضحة", "اختبارات آلية", "تحسين موثوقية الإصدارات", "مراجعات المعمارية", "قرارات البناء أو الشراء"] },
};

export function ServicesCatalog({ services }: { services: Service[] }) {
  const { locale } = useLanguage();
  const getService = (id: string) => services.find((service) => service.id === id);
  return <div className="shell">{groups.map((group) => {
    const service = getService(group.ids[0]);
    if (!service) return null;
    const copy = locale === "ar" ? arabic[service.id] : { name: service.name, description: service.description, detailed: service.detailedDescription, offerings: service.offerings?.slice(0, 5) ?? [] };
    return <div className="service-group" key={group.number}>
      <div className="service-group-head"><div className="service-group-index">{group.number}</div><div><span className="eyebrow">{locale === "ar" ? ({ Intelligence: "الذكاء", "Product delivery": "تطوير المنتجات", "Connected systems": "الأنظمة المتصلة", Platform: "المنصة", Confidence: "الثقة" } as Record<string, string>)[group.eyebrow] : group.eyebrow}</span><h2 className="h2">{locale === "ar" ? copy.name : group.title}</h2><p className="lede">{locale === "ar" ? copy.description : group.description}</p></div></div>
      <div className="grid-2"><article className="surface service-card">
        <img className="card-image" src={service.image} alt="" style={{ height: 220 }} />
        <div className="card-body"><div className="card-icon"><Icon name={service.icon} size={19} /></div><h2 className="h3">{copy.name}</h2><p>{copy.detailed}</p><ul className="offering-list">{copy.offerings.map((offering) => <li key={offering}>{offering}</li>)}</ul><div className="tag-row">{service.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>{service.caseStudy ? <div className="case-result"><span>{locale === "ar" ? "مثال على النتيجة" : "Example outcome"}</span><strong>{service.caseStudy}</strong><small>{service.caseMetric}</small></div> : null}<div className="card-footer"><Link className="card-link" href={`/services/${service.slug}`}>{locale === "ar" ? "استكشف هذه القدرة" : "Explore this capability"} <ArrowRight size={14} /></Link></div></div>
      </article></div>
    </div>;
  })}</div>;
}
