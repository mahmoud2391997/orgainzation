"use client";

import { useEffect, useState } from "react";
import { Check, LoaderCircle, LogOut, RefreshCw } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/content";

const statuses: LeadStatus[] = ["new", "contacted", "qualified", "lost"];

export default function AdminDashboard({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function refresh() {
    setLoading(true);
    try {
      const response = await fetch("/api/leads", { cache: "no-store" });
      if (response.status === 401) return (window.location.href = "/admin/login");
      const result = await response.json();
      setLeads(result.leads ?? []);
    } finally { setLoading(false); }
  }

  useEffect(() => { void refresh(); }, []);

  async function updateStatus(id: string, status: LeadStatus) {
    const response = await fetch("/api/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (response.ok) { setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, status } : lead)); setNotice("Lead status updated."); setTimeout(() => setNotice(""), 2200); }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  const counts = { new: leads.filter((lead) => lead.status === "new").length, active: leads.filter((lead) => lead.status === "contacted" || lead.status === "qualified").length, total: leads.length };
  return <div className="admin-shell"><div className="shell"><div className="admin-header"><div><span className="eyebrow">Client portal</span><h1 className="h1" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>Keep the signal moving.</h1><p className="lede">A simple view of the conversations waiting for a thoughtful next step.</p></div><div className="nav-actions"><button className="button secondary" onClick={() => void refresh()} disabled={loading}>{loading ? <LoaderCircle size={14} /> : <RefreshCw size={14} />} Refresh</button><button className="button dark" onClick={() => void logout()}><LogOut size={14} /> Sign out</button></div></div><div className="admin-stats"><div className="surface admin-stat"><div className="stat-value">{counts.new}</div><div className="stat-label">new requests</div></div><div className="surface admin-stat"><div className="stat-value">{counts.active}</div><div className="stat-label">in progress</div></div><div className="surface admin-stat"><div className="stat-value">{counts.total}</div><div className="stat-label">total conversations</div></div></div>{notice && <div className="form-message success" role="status"><Check size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />{notice}</div>}<div className="surface table-wrap"><table><thead><tr><th>Contact</th><th>Company</th><th>Request</th><th>Date</th><th>Status</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id}><td><strong>{lead.firstName} {lead.lastName}</strong><br /><span style={{ color: "var(--muted)", fontSize: 12 }}>{lead.email}<br />{lead.phone}</span></td><td>{lead.company}</td><td style={{ maxWidth: 330, lineHeight: 1.55 }}>{lead.message}</td><td>{lead.preferredDate || "—"}<br /><span style={{ color: "var(--muted)", fontSize: 11 }}>{new Date(lead.submittedAt).toLocaleDateString()}</span></td><td><select className="status" value={lead.status} onChange={(event) => void updateStatus(lead.id, event.target.value as LeadStatus)} aria-label={`Update status for ${lead.firstName} ${lead.lastName}`}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td></tr>)}</tbody></table>{leads.length === 0 && <p style={{ padding: 30, color: "var(--muted)" }}>No consultation requests yet.</p>}</div></div></div>;
}
