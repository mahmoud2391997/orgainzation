"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { PageHero } from "@/components/site";
import { useLanguage } from "@/components/language-provider";

export default function AppointmentPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Something went wrong.");
      setState("success");
      setMessage(t("Thanks—we have your note and will be in touch shortly."));
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <PageHero eyebrow="Start a conversation" title="Bring us the hard question." description="Tell us what is changing, what is stuck, or what you are trying to make possible. We will come prepared to be useful." />
      <section className="section"><div className="shell form-shell"><div><span className="eyebrow">{t("The first 30 minutes")}</span><h2 className="h2">{t("Less pitch. More signal.")}</h2><p className="lede">{t("You do not need a perfect brief. A little context is enough for us to understand the shape of the decision and bring the right perspective.")}</p><div className="capability-list">{[t("We respond within one business day"), t("A senior practitioner joins the call"), t("No obligation, no generic deck")].map((item) => <div className="capability" style={{ color: "var(--muted)" }} key={item}><span className="check"><Check size={13} /></span>{item}</div>)}</div></div><form className="surface form-card" onSubmit={submit}><div className="form-grid"><div className="field"><label htmlFor="firstName">{t("First name")}</label><input id="firstName" name="firstName" required /></div><div className="field"><label htmlFor="lastName">{t("Last name")}</label><input id="lastName" name="lastName" required /></div><div className="field"><label htmlFor="email">{t("Work email")}</label><input id="email" name="email" type="email" required /></div><div className="field"><label htmlFor="company">{t("Company")}</label><input id="company" name="company" required /></div><div className="field"><label htmlFor="phone">{t("Phone")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{t("(optional)")}</span></label><input id="phone" name="phone" type="tel" /></div><div className="field"><label htmlFor="preferredDate">{t("Preferred date")}</label><input id="preferredDate" name="preferredDate" type="date" /></div><div className="field full"><label htmlFor="message">{t("What are you working through?")}</label><textarea id="message" name="message" required placeholder={t("A sentence, a paragraph, or the messy version is perfect.")} /></div></div><div className="form-actions"><span className="form-note">{t("By submitting, you agree that we can use this information to respond to your request.")}</span><button className="button primary" type="submit" disabled={state === "loading"}>{state === "loading" ? <><LoaderCircle size={14} className="spin" /> {t("Sending...")}</> : <>{t("Send your note")} <ArrowRight size={14} /></>}</button></div>{message && <p className={`form-message ${state}`}>{message}</p>}</form></div></section>
    </>
  );
}
