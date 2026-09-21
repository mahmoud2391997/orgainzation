import { Brand } from "@/components/site";
import { DEFAULT_ADMIN_PASSWORD } from "@/lib/env";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  const customPassword = process.env.ADMIN_PASSWORD?.trim();

  return (
    <div className="login-wrap">
      <div className="surface login-card">
        <Brand />
        <div style={{ marginTop: 38 }}>
          <span className="eyebrow">Client portal</span>
          <h1 className="h2" style={{ fontSize: "2.5rem" }}>Welcome back.</h1>
          <p className="lede" style={{ fontSize: ".95rem" }}>Sign in to review consultation requests and keep the conversation moving.</p>
        </div>
        <LoginForm />
        <p className="form-note" style={{ marginTop: 20 }}>
          {customPassword
            ? <>This portal uses the <code>ADMIN_PASSWORD</code> set in the environment.</>
            : <>Default password: <code>{DEFAULT_ADMIN_PASSWORD}</code>. Set <code>ADMIN_PASSWORD</code> to replace it.</>}
        </p>
      </div>
    </div>
  );
}
