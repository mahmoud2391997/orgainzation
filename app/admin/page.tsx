import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin-dashboard";
import { getAdminPassword } from "@/lib/env";
import { readLeads } from "@/lib/leads";

export const metadata = { title: "Client portal" };

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("antitude-admin")?.value;
  const expected = getAdminPassword();
  if (!session || session !== expected) redirect("/admin/login");
  const initialLeads = await readLeads().catch(() => []);
  return <AdminDashboard initialLeads={initialLeads} />;
}
