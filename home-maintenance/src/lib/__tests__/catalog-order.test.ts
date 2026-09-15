import { describe, it, expect } from 'vitest';
import { parseCatalogOrder, matchCatalogProduct, formatOrderSummary } from '@/lib/catalog-order';
import type { SallaCatalogProduct } from '@/lib/salla';

const catalog: SallaCatalogProduct[] = [
  { id: '1', name: 'Outlet Repair', nameAr: 'إصلاح فيش', category: 'electrical', unit: 'visit', price: 15, stock: 40, imageUrl: '', purchasable: true },
  { id: '2', name: 'Faucet Repair', nameAr: 'إصلاح حنفية', category: 'plumbing', unit: 'visit', price: 12, stock: 20, imageUrl: '', purchasable: true },
  { id: '3', name: 'Leak Repair', nameAr: 'إصلاح تسريب', category: 'plumbing', unit: 'visit', price: 35, stock: 0, imageUrl: '', purchasable: false },
];

describe('matchCatalogProduct', () => {
  it('matches Arabic and English names from the Salla catalog', () => {
    expect(matchCatalogProduct('إصلاح فيش', catalog)?.id).toBe('1');
    expect(matchCatalogProduct('faucet', catalog)?.id).toBe('2');
  });
});

describe('parseCatalogOrder', () => {
  it('parses a typed WhatsApp order against Salla products', () => {
    const parsed = parseCatalogOrder('2 إصلاح فيش و 3 إصلاح حنفية', catalog);
    expect(parsed?.items).toEqual([
      expect.objectContaining({ id: '1', qty: 2, price: 15 }),
      expect.objectContaining({ id: '2', qty: 3, price: 12 }),
    ]);
    expect(parsed?.total).toBe(2 * 15 + 3 * 12);
  });

  it('returns unmatched fragments and null when nothing matches', () => {
    expect(parseCatalogOrder('فستان أحمر', catalog)).toBeNull();
    expect(parseCatalogOrder('2 إصلاح فيش و فستان', catalog)?.unmatched).toContain('فستان');
  });
});

describe('formatOrderSummary', () => {
  it('includes Arabic names and a total', () => {
    const parsed = parseCatalogOrder('2 إصلاح فيش', catalog)!;
    const text = formatOrderSummary(parsed);
    expect(text).toContain('إصلاح فيش');
    expect(text).toContain('30.00');
  });
});
