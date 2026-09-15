import { NextRequest, NextResponse } from 'next/server';
import { getSallaAuthorization, sallaFetch } from '@/lib/salla';
import { ensureSallaCategory, fetchSallaCategories } from '@/lib/salla-sync';

const ELECTRICAL_KEYWORDS = ['كهرباء', 'كهربائي', 'فيش', 'قاطع', 'إضاءة', 'مروحة', 'سخان كهرباء', 'نجدة كهرباء', 'outlet', 'breaker', 'wiring', 'electrical', 'electric', 'light fixture', 'ceiling fan'];
const PLUMBING_KEYWORDS = ['سباكة', 'سباك', 'حنفية', 'تسريب', 'مجاري', 'مرحاض', 'مواسير', 'صنبور', 'faucet', 'leak', 'drain', 'toilet', 'pipe', 'plumbing', 'plumb'];
const INSPECTION_KEYWORDS = ['فحص', 'صيانة دورية', 'عقد صيانة', 'inspection', 'maintenance visit', 'annual service', 'preventive'];

function classifyProduct(name: string): 'electrical' | 'plumbing' | 'inspection' | 'unknown' {
  const n = String(name ?? '').toLowerCase();
  const hits = (list: string[]) => list.filter((k) => n.includes(k.toLowerCase()));
  if (hits(INSPECTION_KEYWORDS).length) return 'inspection';
  if (hits(PLUMBING_KEYWORDS).length) return 'plumbing';
  if (hits(ELECTRICAL_KEYWORDS).length) return 'electrical';
  return 'unknown';
}

export async function POST(req: NextRequest) {
  const auth = await getSallaAuthorization();
  if (!auth) return NextResponse.json({ error: 'Salla is not connected' }, { status: 503 });
  const apply = req.nextUrl.searchParams.get('apply') === '1';
  const diagnostics = { merchantId: auth.merchantId, scopes: auth.scopes, updatedAt: auth.updatedAt, status: auth.status };
  try {
    let page = 1;
    const sallaCategories = await fetchSallaCategories(auth);
    const categoryCache: Record<string, string> = {};
    const report: Array<{ id: string; name: string; currentCategory: string; classified: string; action: string }> = [];
    const unknown: string[] = [];
    let total = 0;
    while (page <= 100) {
      const result = await sallaFetch<{ data?: Array<Record<string, unknown>>; pagination?: { currentPage?: number; totalPages?: number }; total?: number }>(`/admin/v2/products?page=${page}&per_page=100`, {}, auth);
      const items = result.data ?? [];
      if (!items.length) break;
      total += items.length;
      for (const item of items) {
        const id = String(item.id ?? '');
        if (!id) continue;
        const name = String(item.name ?? item.name_en ?? item.name_ar ?? 'Salla product');
        const current = String((item.category as Record<string, unknown>)?.name ?? (Array.isArray(item.categories) ? (item.categories as Array<Record<string, unknown>>).map((c) => c.name ?? c.name_ar ?? '').join(', ') : ''));
        const classified = classifyProduct(name);
        if (classified === 'unknown') {
          unknown.push(name);
          report.push({ id, name, currentCategory: current, classified, action: 'skip' });
          continue;
        }
        if (apply) {
          if (!categoryCache[classified]) {
            categoryCache[classified] = await ensureSallaCategory(classified, sallaCategories, auth);
          }
          const categories = [Number(categoryCache[classified])];
          await sallaFetch(`/admin/v2/products/${id}`, { method: 'PUT', body: JSON.stringify({ categories }) }, auth);
          report.push({ id, name, currentCategory: current, classified, action: 'updated' });
        } else {
          report.push({ id, name, currentCategory: current, classified, action: 'would-update' });
        }
      }
      const totalPages = result.pagination?.totalPages ?? page;
      if (page >= totalPages) break;
      page++;
    }
    return NextResponse.json({ ok: true, dryRun: !apply, total, classified: report.length - unknown.length, unknown, report, diagnostics });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Salla categorize failed';
    return NextResponse.json({ error: message, diagnostics }, { status: 502 });
  }
}