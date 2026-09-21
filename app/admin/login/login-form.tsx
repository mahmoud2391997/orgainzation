"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export function LoginForm() {
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

  return (
    <form onSubmit={submit} style={{ marginTop: 28 }}>
      <div className="field">
        <label htmlFor="password">Portal password</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus />
      </div>
      <button className="button primary" style={{ width: "100%", marginTop: 18 }} disabled={loading}>
        {loading ? <><LoaderCircle size={15} /> Checking…</> : <>Sign in <ArrowRight size={14} /></>}
      </button>
      {error && <div className="form-message error" role="alert">{error}</div>}
    </form>
  );
}
