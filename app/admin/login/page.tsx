"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Brand } from "@/components/site";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (!response.ok) throw new Error((await response.json()).error ?? "Unable to sign in");
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
      setLoading(false);
    }
  }

  return <div className="login-wrap"><div className="surface login-card"><Brand /><div style={{ marginTop: 38 }}><span className="eyebrow">Client portal</span><h1 className="h2" style={{ fontSize: "2.5rem" }}>Welcome back.</h1><p className="lede" style={{ fontSize: ".95rem" }}>Sign in to review consultation requests and keep the conversation moving.</p></div><form onSubmit={submit} style={{ marginTop: 28 }}><div className="field"><label htmlFor="password">Portal password</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus /></div><button className="button primary" style={{ width: "100%", marginTop: 18 }} disabled={loading}>{loading ? <><LoaderCircle size={15} /> Checking…</> : <>Sign in <ArrowRight size={14} /></>}</button>{error && <div className="form-message error" role="alert">{error}</div>}</form><p className="form-note" style={{ marginTop: 20 }}>Set <code>ADMIN_PASSWORD</code> in your environment before deploying.</p></div></div>;
}
