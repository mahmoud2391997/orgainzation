import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="section"><div className="shell" style={{ textAlign: "center", padding: "90px 0" }}><span className="eyebrow">404 · Signal lost</span><h1 className="h1">That page moved on.</h1><p className="lede" style={{ margin: "24px auto 0" }}>The route you are looking for is not here, but the useful next step probably is.</p><Link className="button dark" href="/" style={{ marginTop: 28 }}><ArrowLeft size={14} /> Back home</Link></div></section>;
}
