import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin-dashboard";
import { readLeads } from "@/lib/leads";

export const metadata = { title: "Client portal" };

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("antitude-admin")?.value;
  const expected = process.env.ADMIN_PASSWORD ?? "antitude-demo";
  if (!session || session !== expected) redirect("/admin/login");
  const initialLeads = await readLeads();
  return <AdminDashboard initialLeads={initialLeads} />;
}
