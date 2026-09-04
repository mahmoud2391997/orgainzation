"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Service, Solution, Technology } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

type Props = { services: Service[]; technologies: Technology[]; solutions: Solution[] };
const pointPositions = [
  [23, 27], [38, 18], [60, 22], [77, 31], [83, 52], [72, 74], [54, 83], [31, 77], [17, 62], [26, 47], [49, 34], [63, 63],
  [44, 12], [68, 42], [37, 61], [51, 72], [22, 40], [58, 12], [88, 38], [78, 63], [42, 90], [12, 42],
];
const arabicNames: Record<string, string> = {
  s1: "الذكاء الاصطناعي وتعلم الآلة", s2: "تطوير البرمجيات المخصصة", s3: "هندسة السحابة والمنصات", s4: "التحول الرقمي", s5: "هندسة الجودة", s6: "الاستشارات التقنية", s7: "هندسة المنتجات",
  t1: "الذكاء الاصطناعي التوليدي", t2: "السحابة الأصلية", t3: "منصات البيانات", t4: "تطبيقات الويب", t5: "الأتمتة الذكية", t6: "المرونة السيبرانية",
  so1: "الرعاية الصحية وعلوم الحياة", so2: "الخدمات المالية", so3: "التجزئة والمستهلك", so4: "الطاقة والصناعة",
};
const arabicExamples: Record<string, string[]> = {
  s1: ["مساعد ذكي لفرق الخدمة", "أتمتة 75٪ من الطلبات المتكررة"], s2: ["منصة تشغيل متعددة المستأجرين", "خفض تكاليف التراخيص بنسبة 40–60٪"], s3: ["أسس سحابية مرنة", "أتمتة المنصات والمراقبة"], s4: ["تحديث سير العمل", "مواءمة الفرق والأنظمة"], s5: ["اختبارات آلية", "إصدارات أكثر ثقة"], s6: ["مراجعة معمارية", "قرارات بناء أو شراء"], s7: ["منتج رقمي قابل للتوسع", "استراتيجية وهندسة متكاملة"],
  t1: ["مساعدات ذكية موثوقة", "تقييم النماذج"], t2: ["أسس سحابية قابلة للتوسع", "مرونة التشغيل"], t3: ["خطوط بيانات حديثة", "طبقات دلالية"], t4: ["تطبيقات سريعة وميسّرة", "معمارية مستدامة"], t5: ["تنسيق سير العمل", "أتمتة التكرار المكلف"], t6: ["هوية وأمن", "عمليات قابلة للرصد"],
  so1: ["رعاية صحية أكثر ترابطاً", "قياس أفضل للنتائج"], so2: ["تجارب مالية موثوقة", "قرارات رقمية آمنة"], so3: ["تجارب متعددة القنوات", "إشارات عملاء مفيدة"], so4: ["أصول وعمليات ذكية", "بنية تحتية مرنة"],
};
const arabicDetails: Record<string, string> = {
  s1: "حوّل البيانات المعقدة إلى قرارات تثق بها فرقك.", s2: "منتجات رقمية مصممة لتناسب طريقة عمل مؤسستك.", s3: "منصات مرنة تجعل التوسع أمراً هادئاً.", s4: "اجعل التغيير ملموساً عبر الأنظمة والفرق وتجارب العملاء.", s5: "أطلق منتجاتك بثقة، لا بالتخمين.", s6: "وضوح للقرارات التي تترك أثراً طويل المدى.", s7: "حوّل الفكرة المهمة إلى منتج يعتمد عليه الناس.",
  t1: "مساعدات موثوقة وأنظمة استرجاع وتقييم للنماذج.", t2: "أسس سحابية مرنة مصممة للسرعة والاستمرارية.", t3: "خطوط بيانات وطبقات دلالية تجعل البيانات مفيدة عند الحاجة.", t4: "منتجات سريعة وميسّرة بمعمارية مستدامة.", t5: "اربط الأنظمة وأتمت العمل وأزل التكرار المكلف.", t6: "الأمن والهوية والعمليات القابلة للرصد ضمن دورة التسليم.",
  so1: "رعاية أكثر ترابطاً ونتائج قابلة للقياس وعمليات أقل يدوية.", so2: "تجارب رقمية موثوقة لقطاع تحمل قراراته وزناً كبيراً.", so3: "حوّل إشارات العملاء إلى تجارب مفيدة وفي الوقت المناسب.", so4: "أضف الذكاء إلى الأصول المعقدة والفرق الميدانية والبنية الحيوية.",
};

export function Radar({ services, technologies, solutions }: Props) {
  const { locale, t } = useLanguage();
  const points = useMemo(() => [
    ...services.map((item) => ({ id: item.id, name: item.name, group: "Services", detail: item.description, examples: [item.caseStudy ?? item.name, item.caseMetric ?? item.description] })),
    ...technologies.map((item) => ({ id: item.id, name: item.name, group: "Technologies", detail: item.description, examples: [item.caseStudy ?? item.name, item.caseMetric ?? item.description] })),
    ...solutions.map((item) => ({ id: item.id, name: item.title, group: "Solutions", detail: item.description, examples: [item.industry, item.title].filter(Boolean) })),
  ], [services, technologies, solutions]);
  const [active, setActive] = useState(points[0]?.id);
  const current = points.find((point) => point.id === active) ?? points[0];
  const localize = (point: (typeof points)[number]) => locale === "ar" ? { ...point, name: arabicNames[point.id] ?? point.name, detail: arabicDetails[point.id] ?? point.detail, examples: arabicExamples[point.id] ?? point.examples } : point;
  const displayedCurrent = current ? localize(current) : undefined;
  return <div className="radar-system" aria-label={t("Technology radar")}>
    <div className="radar-stage" role="img" aria-label={displayedCurrent ? `${displayedCurrent.name}: ${displayedCurrent.detail}` : t("Technology radar")}>
      <div className="radar-ring ring-a" /><div className="radar-ring ring-b" /><div className="radar-ring ring-c" /><div className="radar-axis axis-x" /><div className="radar-axis axis-y" />
      <div className="radar-core"><span>ANTITUDE</span><strong>Useful<br />momentum</strong></div>
      {points.map((point, index) => { const displayedPoint = localize(point); const [left, top] = pointPositions[index] ?? [50, 50]; return <button key={point.id} type="button" className={`radar-point ${active === point.id ? "is-active" : ""}`} style={{ left: `${left}%`, top: `${top}%` }} onMouseEnter={() => setActive(point.id)} onFocus={() => setActive(point.id)} onClick={() => setActive(point.id)} aria-label={`${displayedPoint.name}, ${t(point.group)}`} aria-pressed={active === point.id}><span /><b>{index + 1}</b></button>; })}
    </div>
    <div className="radar-list" role="list" aria-label={t("Explore capabilities")}>
      {points.map((point) => { const displayedPoint = localize(point); return <button role="listitem" key={point.id} type="button" className={`radar-list-item ${active === point.id ? "is-active" : ""}`} onMouseEnter={() => setActive(point.id)} onFocus={() => setActive(point.id)} onClick={() => setActive(point.id)}><span className={`radar-dot ${point.group.toLowerCase()}`} /><span><small>{t(point.group)}</small><strong>{displayedPoint.name}</strong></span><ArrowRight size={14} /></button>; })}
    </div>
    <div className="radar-detail" aria-live="polite"><span className="eyebrow">{t("Selected capability")} · {displayedCurrent ? t(displayedCurrent.group) : t("Technology radar")}</span><strong>{displayedCurrent?.name}</strong><p>{displayedCurrent?.detail}</p>{displayedCurrent?.examples.length ? <div className="radar-examples"><small>{t("Related examples")}</small><div>{displayedCurrent.examples.map((example) => <span key={example}>{example}</span>)}</div></div> : null}</div>
  </div>;
}
