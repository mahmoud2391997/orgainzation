"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Service } from "@/lib/content";
import { Icon } from "@/components/site";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedService } from "@/lib/translations-data";

export function ServiceDetailView({ service: rawService }: { service: Service }) {
  const { locale, t } = useLanguage();
  const service = getLocalizedService(rawService, locale);
  const isRTL = locale === "ar";

  const defaultOfferings = [
    "Custom architecture & workflows",
    "End-to-end delivery & testing",
    "Operational monitoring & handoff",
  ];

  const valuePoints = locale === "ar" ? [
    "اكتشاف مركز يصنع زخماً حقيقياً",
    "خطة تسليم مع خيارات وبدائل واضحة",
    "الجودة والأمان والتبني مدمجة في التصميم",
  ] : [
    "A focused discovery that creates momentum",
    "A delivery plan with visible trade-offs",
    "Quality, security, and adoption built in",
  ];

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <div className="breadcrumb">
            <Link href="/services">{t("Services")}</Link>
            <span>/</span>
            <span>{service.name}</span>
          </div>
          <div style={{ marginTop: 35 }}>
            <span className="eyebrow">{t("Capability deep dive")}</span>
            <h1 className="h1">{service.name}</h1>
            <p className="lede">{service.description}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell detail-grid">
          <div className="detail-copy">
            <img className="detail-image" src={service.image} alt={service.name} />
            <div style={{ marginTop: 38 }}>
              <h2 className="h2">{locale === "ar" ? "مفيدة بالتصميم." : "Useful by design."}</h2>
              <p style={{ marginTop: 23 }}>{service.detailedDescription}</p>
              <p>
                {locale === "ar"
                  ? "نجمع فريقاً أول متعدد التخصصات حول الطبيعة الفعلية لتحديك. وهذا يعني أن عملنا ينطلق من واقعك التشغيلي الحقيقي، لا من كتيبات عامة."
                  : "We bring an experienced, cross-functional team around the actual shape of your problem. That means the work is grounded in your operating context, not a generic playbook."}
              </p>

              {(service.offerings && service.offerings.length > 0 ? service.offerings : defaultOfferings).length > 0 && (
                <>
                  <h3 className="h3 offerings-heading">{locale === "ar" ? "ما يمكننا بناؤه" : "What we can build"}</h3>
                  <ul className="offering-list offering-list-detail">
                    {(service.offerings && service.offerings.length > 0 ? service.offerings : defaultOfferings).map((offering) => (
                      <li key={offering}>{offering}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="capability-list" style={{ marginTop: 27 }}>
                {valuePoints.map((item) => (
                  <div className="capability" style={{ color: "var(--muted)" }} key={item}>
                    <span className="check"><Check size={13} /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="detail-side">
            <div className="surface side-card">
              <div className="card-icon">
                <Icon name={service.icon} size={19} />
              </div>
              <h4>{locale === "ar" ? "الأدوات والتقنيات" : "Typical toolkit"}</h4>
              <div className="tag-row">
                {service.technologies.map((technology) => (
                  <span className="tag" key={technology}>{technology}</span>
                ))}
              </div>
            </div>

            {service.caseStudy ? (
              <div className="surface side-card case-proof">
                <h4>{t("Example outcome")}</h4>
                <strong>{service.caseStudy}</strong>
                <p>{service.caseMetric}</p>
              </div>
            ) : null}

            <div className="dark-panel side-card" style={{ color: "white" }}>
              <h4 style={{ color: "var(--cyan)" }}>{locale === "ar" ? "ابدأ خطوتك القادمة" : "Make a move"}</h4>
              <p style={{ margin: "16px 0 20px", color: "#aabac8", fontSize: 14, lineHeight: 1.6 }}>
                {locale === "ar"
                  ? "اطرح علينا الوضع الحالي، وسنساعدك في تحديد الخطوة الأولى الأكثر فائدة."
                  : "Bring us the current state. We will help map the next useful step."}
              </p>
              <Link href="/appointment" className="button primary">
                {t("Book consultation")} <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <Link className="card-link" href="/services">
            {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {locale === "ar" ? "العودة إلى جميع القدرات" : "Back to all capabilities"}
          </Link>
        </div>
      </section>
    </>
  );
}
