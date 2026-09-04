"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Locale = "en" | "ar";
const translations: Record<string, string> = {
  "Services": "الخدمات", "Technologies": "التقنيات", "Solutions": "الحلول", "Examples": "أمثلة", "About us": "من نحن", "Contact us": "تواصل معنا", "Book consultation": "احجز استشارة", "Admin": "الإدارة", "Explore": "استكشف", "Company": "الشركة", "Talk to an expert": "تحدث مع خبير", "Client portal": "بوابة العملاء", "Start a conversation": "ابدأ محادثة", "Technology partner · since 2014": "شريك تقني · منذ 2014", "Make complex": "حوّل التعقيد", "useful.": "إلى قيمة.", "Tell us what matters": "أخبرنا بما يهمك", "About Antitude": "عن أنتيتيود", "Senior teams only": "فرق أولى فقط", "Outcome-led": "مدفوع بالنتائج", "No black boxes": "بلا صناديق سوداء", "Core services": "الخدمات الأساسية", "A sharp team for the messy middle.": "فريق حاسم للمراحل المعقدة.", "Technology radar": "رادار التقنية", "The stack is a means, not the strategy.": "التقنية وسيلة وليست استراتيجية.", "Industry perspective": "منظور القطاعات", "Context changes the answer.": "السياق يغير الإجابة.", "Search examples": "ابحث في الأمثلة", "Search by capability or stack": "ابحث حسب القدرة أو التقنية", "Preview case": "معاينة الحالة", "View capabilities": "عرض القدرات", "No matching examples": "لا توجد أمثلة مطابقة", "Keep exploring": "تابع الاستكشاف", "Add to brief": "أضف إلى الطلب", "Core capabilities": "القدرات الأساسية", "All": "الكل", "Live radar": "الرادار المباشر", "Explore capabilities": "استكشف القدرات", "Explore technologies": "استكشف التقنيات", "Explore solutions": "استكشف الحلول"
};

type LanguageContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (value: string) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("antitude-locale") as Locale | null;
    if (saved === "ar" || saved === "en") setLocaleState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.locale = locale;
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale: (next: Locale) => { setLocaleState(next); window.localStorage.setItem("antitude-locale", next); }, t: (value: string) => locale === "ar" ? translations[value] ?? value : value }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export type { Locale };
