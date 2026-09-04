"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Locale = "en" | "ar";

const translations: Record<string, string> = {
  // ── Navigation ──────────────────────────────────────────────────────────────
  "Services": "الخدمات",
  "Technologies": "التقنيات",
  "Solutions": "الحلول",
  "Examples": "أمثلة",
  "About us": "من نحن",
  "Contact us": "تواصل معنا",
  "Book consultation": "احجز استشارة",
  "Admin": "الإدارة",
  "Client portal": "بوابة العملاء",
  "Talk to an expert": "تحدث مع خبير",
  "Start a conversation": "ابدأ محادثة",
  "Technology partner · since 2014": "شريك تقني · منذ 2014",

  // ── Hero ────────────────────────────────────────────────────────────────────
  "Make complex": "حوّل التعقيد",
  "useful.": "إلى قيمة.",
  "Antitude helps CTOs, enterprise leaders, and founders turn difficult technology into clear, measurable momentum. Strategy, engineering, and responsible AI—working as one.":
    "تساعد أنتيتيود المديرين التقنيين وقادة المؤسسات والمؤسسين على تحويل التقنية الصعبة إلى زخم واضح وقابل للقياس. استراتيجية وهندسة وذكاء اصطناعي مسؤول — تعمل كفريق واحد.",
  "Senior teams only": "فرق أولى فقط",
  "Outcome-led": "مدفوع بالنتائج",
  "No black boxes": "بلا صناديق سوداء",
  "Tell us what matters": "أخبرنا بما يهمك",
  "About Antitude": "عن أنتيتيود",

  // ── Hero Visual ─────────────────────────────────────────────────────────────
  "AI systems": "أنظمة الذكاء الاصطناعي",
  "Cloud foundations": "أسس السحابة",
  "Data platforms": "منصات البيانات",
  "Responsible AI": "الذكاء الاصطناعي المسؤول",
  "Turn intelligence into decisions.": "حوّل الذكاء إلى قرارات.",
  "Build systems that keep moving.": "ابنِ أنظمة تواصل التقدم.",
  "Make signal easier to find.": "اجعل الوصول إلى الإشارة أسهل.",
  "Grounded copilots and evaluation": "مساعدات ذكية موثوقة وتقييم مستمر",
  "Resilient platforms and automation": "منصات مرنة وأتمتة عملية",
  "Pipelines and semantic layers": "خطوط بيانات وطبقات دلالية",
  "Explore": "استكشف",
  "Live radar": "الرادار المباشر",
  "See the system": "اكتشف المنظومة",
  "Useful": "زخم",
  "momentum": "مفيد",

  // ── Proof Rail ──────────────────────────────────────────────────────────────
  "years making hard work clearer": "سنوات من توضيح العمل الصعب",
  "disciplines, one senior team": "مجالات معرفية، فريق أول واحد",
  "curiosity for what comes next": "فضول تجاه ما هو قادم",

  // ── Section Headers ─────────────────────────────────────────────────────────
  "What we do": "ما نقدمه",
  "What we build with": "ما نبني به",
  "A sharp team for the messy middle.": "فريق حاسم للمراحل المعقدة.",
  "Five focused offers take work from useful question to dependable outcome.":
    "خمسة عروض مركزة تنقل العمل من سؤال مفيد إلى نتيجة موثوقة.",
  "The stack is a means, not the strategy.": "التقنية وسيلة وليست استراتيجية.",
  "Technologies support the service outcome: intelligence, products, connected systems, and resilient operations.":
    "تدعم التقنيات نتيجة الخدمة: الذكاء والمنتجات والأنظمة المتصلة والعمليات المرنة.",
  "Industry perspective": "منظور القطاعات",
  "Context changes the answer.": "السياق يغير الإجابة.",
  "Technology becomes more useful when it respects the decisions, controls, and human moments in your industry.":
    "تصبح التقنية أكثر فائدة عندما تحترم القرارات والضوابط واللحظات الإنسانية في قطاعك.",
  "Explore services": "استكشف الخدمات",
  "Explore technologies": "استكشف التقنيات",
  "Explore solutions": "استكشف الحلول",
  "Explore examples": "استكشف الأمثلة",
  "Explore the opportunity": "استكشف الفرصة",

  // ── Services Page ────────────────────────────────────────────────────────────
  "Capabilities": "القدرات",
  "A partner for the parts that matter.": "شريك للأجزاء التي تصنع الفرق.",
  "From the first useful question to the last mile of adoption, we bring the people and practices required to make change stick.":
    "من أول سؤال مفيد إلى آخر خطوة في التبني، نوفر الخبرات والممارسات اللازمة لترسيخ التغيير.",
  "Outcomes in the wild.": "نتائج حقيقية.",
  "A few ways these offers become useful products, systems, and workflows.":
    "بعض الطرق التي تتحول بها عروضنا إلى منتجات وأنظمة وسير عمل مفيدة.",
  "View all examples": "عرض كل الأمثلة",
  "Not sure where to start?": "لست متأكداً من أين تبدأ؟",
  "Bring the messy version.": "احضر النسخة غير المنسقة.",
  "We will help you find the right first move and make the trade-offs visible.":
    "سنساعدك في إيجاد الخطوة الأولى الصحيحة وإظهار الخيارات بوضوح.",

  // ── Radar ────────────────────────────────────────────────────────────────────
  "Technology radar": "رادار التقنية",
  "Click a dot to explore": "اضغط على نقطة للاستكشاف",
  "Selected capability": "القدرة المختارة",
  "Related examples": "أمثلة ذات صلة",
  "Core capabilities": "القدرات الأساسية",
  "Explore capabilities": "استكشف القدرات",
  "All": "الكل",
  "Core services": "الخدمات الأساسية",


  // ── Examples ─────────────────────────────────────────────────────────────────
  "Search examples": "ابحث في الأمثلة",
  "Search by capability or stack": "ابحث حسب القدرة أو التقنية",
  "Preview case": "معاينة الحالة",
  "View capabilities": "عرض القدرات",
  "No matching examples": "لا توجد أمثلة مطابقة",
  "Keep exploring": "تابع الاستكشاف",
  "Add to brief": "أضف إلى الطلب",
  "Try a different capability, industry, or technology.": "جرّب قدرة أو قطاعاً أو تقنية مختلفة.",
  "Clear search": "مسح البحث",
  "Close example details": "إغلاق تفاصيل المثال",
  "delivery window": "فترة التنفيذ",
  "Case in point": "حالة في الصميم",
  "Example outcome": "مثال على النتيجة",
  "Explore this capability": "استكشف هذه القدرة",

  // ── Services Catalog / Cards ──────────────────────────────────────────────────
  "Product delivery": "تطوير المنتجات",
  "Connected systems": "الأنظمة المتصلة",
  "Confidence": "الثقة",
  "Platform": "المنصة",
  "Intelligence": "الذكاء",

  // ── About Page ───────────────────────────────────────────────────────────────
  "Useful technology starts with understanding.": "التقنية المفيدة تبدأ بالفهم.",
  "We are a senior technology partner for CTOs, enterprise leaders, and founders navigating consequential decisions, complex systems, and meaningful change.":
    "نحن شريك تقني أول للمديرين التقنيين وقادة المؤسسات والمؤسسين الذين يواجهون قرارات مصيرية وأنظمة معقدة وتغييراً جوهرياً.",
  "What we believe": "ما نؤمن به",
  "Technology should accelerate ambition, not anchor it.": "يجب أن تسرّع التقنية الطموح، لا أن تكبّله.",
  "Antitude brings strategy, engineering, and responsible AI together around the problem in front of you. We make trade-offs visible, build with care, and stay close through adoption.":
    "تجمع أنتيتيود الاستراتيجية والهندسة والذكاء الاصطناعي المسؤول حول المشكلة التي تواجهها. نجعل الخيارات واضحة، ونبني بعناية، ونظل قريبين حتى التبني الكامل.",
  "\u201cThe best technology partner makes the next decision easier.\u201d": "\"أفضل شريك تقني هو من يجعل القرار التالي أيسر.\"",
  "Antitude principles": "مبادئ أنتيتيود",
  "Our principles": "مبادئنا",
  "Built for the next move.": "مصمم للخطوة القادمة.",
  "Senior practitioners from day one": "خبراء من اليوم الأول",
  "A clear point of view without lock-in": "رؤية واضحة بلا قيود",
  "Quality, security, and adoption by design": "الجودة والأمان والتبني بالتصميم",
  "Find your next move.": "اكتشف خطوتك التالية.",
  "Discuss your version": "ناقش نسختك",

  // ── Consultation Form ─────────────────────────────────────────────────────────
  "Bring us the hard question.": "اطرح علينا السؤال الصعب.",
  "Less pitch. More signal.": "عرض أقل، إشارة أكثر.",
  "The first 30 minutes": "أول 30 دقيقة",
  "First name": "الاسم الأول",
  "Last name": "اسم العائلة",
  "Work email": "البريد الإلكتروني الوظيفي",
  "Phone": "الهاتف",
  "Company": "الشركة",
  "Preferred date": "التاريخ المفضل",
  "What are you working through?": "ما الذي تعمل عليه حالياً؟",
  "Send your note": "أرسل ملاحظتك",
  "Sending...": "جارٍ الإرسال...",
  "(optional)": "(اختياري)",
  "We respond within one business day": "نرد خلال يوم عمل واحد",
  "A senior practitioner joins the call": "خبير أول ينضم إلى المكالمة",
  "No obligation, no generic deck": "بلا التزام وبلا عرض تقديمي عام",
  "By submitting, you agree that we can use this information to respond to your request.":
    "بإرسالك، فأنت توافق على استخدام هذه المعلومات للرد على طلبك.",
  "A sentence, a paragraph, or the messy version is perfect.": "جملة أو فقرة، أو حتى نسخة غير منسقة، كلها مقبولة.",
  "Tell us what is changing, what is stuck, or what you are trying to make possible. We will come prepared to be useful.":
    "أخبرنا ما الذي يتغير، أو ما الذي تتعثر فيه، أو ما الذي تحاول تحقيقه. سنأتي مستعدين لنكون مفيدين.",
  "You do not need a perfect brief. A little context is enough for us to understand the shape of the decision and bring the right perspective.":
    "لست بحاجة إلى مخطط مثالي، فسياق بسيط يكفي لفهم طبيعة القرار واختيار المنظور الصحيح.",
  "Thanks—we have your note and will be in touch shortly.": "شكراً لك، وصلتنا ملاحظتك وسنتواصل معك قريباً.",
  "Book a consultation": "احجز استشارة",

  // ── Footer ────────────────────────────────────────────────────────────────────
  "The technology partner for ambitious teams building what matters next.":
    "الشريك التقني للفرق الطموحة التي تبني ما يهم للمرحلة القادمة.",
  "Built for the next move": "مصمم للخطوة القادمة",
  "We bring strategy, engineering, and responsible AI together—without the black-box handoff.":
    "نجمع الاستراتيجية والهندسة والذكاء الاصطناعي المسؤول، دون تسليم غامض.",
  "Human judgment · Useful technology": "حكم بشري · تقنية مفيدة",
  "New York · London · Remote": "نيويورك · لندن · عن بُعد",

  // ── Solutions-specific ───────────────────────────────────────────────────────
  "We pair technology fluency with a working understanding of the environments where the stakes are highest.":
    "نجمع الإتقان التقني مع فهم عملي للبيئات التي تكون فيها المخاطر في أعلاها.",
  "Your constraints are where the value is.": "قيودك هي مصدر القيمة.",
  "We do not force every industry into the same transformation story. We learn the decisions, controls, and human moments that make yours distinct.":
    "لا نُكره كل قطاع على قصة تحول واحدة. بل نتعلم القرارات والضوابط واللحظات الإنسانية التي تميز قطاعك.",
  "Connected care, clearer operations": "رعاية متصلة وعمليات أوضح",
  "Trusted decisions at digital speed": "قرارات موثوقة بسرعة رقمية",
  "Signals turned into customer moments": "إشارات تتحول إلى لحظات عملاء",
  "Intelligence for critical assets": "ذكاء للأصول الحيوية",

  // ── Examples Library & Service Details ───────────────────────────────────────
  "Examples library": "مكتبة الأمثلة",
  "See what useful looks like.": "شاهد كيف تبدو الحلول العملية.",
  "A field guide to the products, platforms, and intelligent systems we help ambitious teams bring to life.":
    "دليل ميداني للمنتجات والمنصات والأنظمة الذكية التي نساعد الفرق الطموحة على إحيائها وإطلاقها.",
  "From first brief to useful outcome": "من المخطط الأولي إلى نتيجة عملية ملموسة",
  "Choose a direction.": "اختر اتجاهاً.",
  "Useful by design.": "مفيدة بالتصميم.",
  "What we can build": "ما يمكننا بناؤه",
  "Typical toolkit": "الأدوات والتقنيات",
  "Make a move": "ابدأ خطوتك القادمة",
  "Bring us the current state. We will help map the next useful step.":
    "اطرح علينا الوضع الحالي، وسنساعدك في تحديد الخطوة الأولى الأكثر فائدة.",
  "Back to all capabilities": "العودة إلى جميع القدرات",
  "Supports": "يدعم",
  "Talk about your stack": "ناقش بنيتك التقنية",

  // ── Misc ──────────────────────────────────────────────────────────────────────
  "See how we help": "اكتشف كيف نساعد",
  "Case lens": "عدسة الحالة",
  "A point of view, not a template": "رؤية مخصصة وليست قالباً",
  "Share your context": "شارك سياقك",
  "Capability deep dive": "غوص في القدرة",

  // ── Admin & Portal ────────────────────────────────────────────────────────────
  "Admin Console": "لوحة تحكم الإدارة",
  "View live site": "عرض الموقع",
  "Keep the signal moving.": "استمرارية الزخم والعمليات.",
  "Manage public content and the conversations waiting for a thoughtful next step.":
    "إدارة المحتوى العام والطلبات والمحادثات قيد المتابعة.",
  "Refresh": "تحديث",
  "Sign out": "تسجيل الخروج",
  "Content": "المحتوى",
  "Leads": "الطلبات",
  "Content management": "إدارة المحتوى",
  "Keep the site current.": "إبقاء المحتوى محدثاً.",
  "Edit public services, technologies, and solutions.":
    "تعديل وتحديث الخدمات والتقنيات والحلول المعروضة في الموقع.",
  "Save changes": "حفظ التغييرات",
  "Save": "حفظ",
  "Saving...": "جارِ الحفظ...",
  "Loading content...": "جارِ تحميل المحتوى...",
  "CRM": "إدارة العملاء والطلبات",
  "Consultation requests.": "طلبات الاستشارة.",
  "Track conversations and move each lead to its next step.":
    "متابعة المحادثات ونقل كل طلب إلى المرحلة المناسبة.",
  "new requests": "طلبات جديدة",
  "in progress": "قيد المتابعة",
  "total conversations": "إجمالي المحادثات",
  "Lead status updated.": "تم تحديث حالة الطلب بنجاح.",
  "Contact": "جهة الاتصال",
  "Company": "الشركة",
  "Request": "الطلب",
  "Date": "التاريخ",
  "Status": "الحالة",
  "Search leads...": "البحث في الطلبات (الاسم، الشركة، البريد)...",
  "All": "الكل",
  "new": "جديد",
  "contacted": "تم التواصل",
  "qualified": "مؤهل",
  "lost": "ملغي",
  "Welcome back.": "مرحباً بعودتك.",
  "Sign in to review consultation requests and keep the conversation moving.":
    "سجل الدخول لمراجعة طلبات الاستشارة ومتابعة سير العمليات.",
  "Portal password": "كلمة مرور البوابة",
  "Sign in": "تسجيل الدخول",
  "Checking…": "جارِ التحقق…",
  "Set ADMIN_PASSWORD in your environment before deploying.":
    "اضبط متغير ADMIN_PASSWORD في بيئة العمل قبل النشر.",
  "Back to website": "العودة إلى الموقع الرئيسي",
  "Password": "كلمة المرور",
  "Show password": "إظهار كلمة المرور",
  "Hide password": "إخفاء كلمة المرور",
  "No leads found": "لا توجد طلبات مطابقة",
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

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        setLocaleState(next);
        window.localStorage.setItem("antitude-locale", next);
      },
      t: (value: string) => (locale === "ar" ? (translations[value] ?? value) : value),
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export type { Locale };
