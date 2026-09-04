"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Technology } from "@/lib/content";
import { Icon } from "@/components/site";
import { useLanguage } from "@/components/language-provider";

const ar: Record<string, { name: string; category: string; description: string; support: string[] }> = {
  t1: { name: "الذكاء الاصطناعي التوليدي", category: "الذكاء الاصطناعي", description: "مساعدات موثوقة وأنظمة استرجاع وتقييم للنماذج ودمج مسؤول للذكاء الاصطناعي.", support: ["الذكاء الاصطناعي والأتمتة الذكية"] },
  t2: { name: "السحابة الأصلية", category: "السحابة والبنية التحتية", description: "أسس سحابية مرنة مصممة للسرعة والاستمرارية.", support: ["السحابة والنشر وDevOps"] },
  t3: { name: "منصات البيانات", category: "البيانات والتحليلات", description: "خطوط بيانات وطبقات دلالية تجعل البيانات مفيدة عند الحاجة.", support: ["الذكاء الاصطناعي والأتمتة الذكية", "تطوير البرمجيات والمنتجات"] },
  t4: { name: "تطبيقات الويب", category: "هندسة المنتجات", description: "منتجات سريعة وميسّرة بواجهة مدروسة ومعمارية مستدامة.", support: ["تطوير البرمجيات والمنتجات"] },
  t5: { name: "الأتمتة الذكية", category: "الذكاء الاصطناعي", description: "اربط الأنظمة وأتمت العمل وأزل التكرار المكلف.", support: ["الذكاء الاصطناعي والأتمتة الذكية", "تكامل واجهات البرمجة والأنظمة"] },
  t6: { name: "المرونة السيبرانية", category: "السحابة والبنية التحتية", description: "الأمن والهوية والعمليات القابلة للرصد ضمن دورة التسليم.", support: ["السحابة والنشر وDevOps", "هندسة الجودة والاستشارات التقنية"] },
};

export function TechnologiesCatalog({ technologies }: { technologies: Technology[] }) {
  const { locale } = useLanguage();
  const categories = [...new Set(technologies.map((technology) => technology.category))];
  return <div className="shell">{categories.map((category) => <div key={category} style={{ marginBottom: 58 }}><div className="section-head" style={{ marginBottom: 22 }}><div><p className="kicker">{locale === "ar" ? (ar[technologies.find((technology) => technology.category === category)?.id ?? ""]?.category ?? category) : category}</p><h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.7rem)" }}>{category === "Artificial intelligence" ? "Make intelligence actionable." : category === "Cloud & infrastructure" ? "Make scale uneventful." : category === "Data & analytics" ? "Make signal visible." : "Make products last."}</h2><p className="section-subhead">{locale === "ar" ? "الأدوات التي تدعم هذه النتيجة." : "The tools that support this outcome."}</p></div></div><div className="grid-3">{technologies.filter((technology) => technology.category === category).map((technology) => { const copy = locale === "ar" ? ar[technology.id] : { name: technology.name, description: technology.description, support: [] }; return <article className="surface service-card" key={technology.id}><img className="card-image" src={technology.image} alt="" /><div className="card-body"><div className="card-icon"><Icon name={technology.icon} size={19} /></div><h3 className="h3">{copy.name}</h3><p>{copy.description}</p>{copy.support.length ? <div className="technology-support"><small>يدعم</small>{copy.support.map((service) => <span key={service}>{service}</span>)}</div> : null}<div className="card-footer"><Link href="/appointment" className="card-link">{locale === "ar" ? "ناقش تقنيتك" : "Talk about your stack"} <ArrowRight size={14} /></Link></div></div></article>; })}</div></div>)}</div>;
}
