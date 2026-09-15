/*
# Seed BaytFix service catalog

Populates the products table with electrical, plumbing, and inspection jobs
with Arabic names, tiered pricing (homeowner, building, contractor), and stock levels.
*/

-- Clear existing products (if any)
DELETE FROM products;

INSERT INTO products (name, name_ar, category, unit, retail_price, shop_price, wholesale_price, stock, image_url)
VALUES
  ('Outlet Repair', 'إصلاح فيش', 'electrical', 'visit', 150, 130, 110, 40, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400'),
  ('Light Fixture Install', 'تركيب إضاءة', 'electrical', 'visit', 220, 190, 160, 35, 'https://images.unsplash.com/photo-1507473880760-e6d0cedf4938?w=400'),
  ('Circuit Breaker Replacement', 'تغيير القاطع', 'electrical', 'visit', 280, 240, 200, 28, 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400'),
  ('Wiring Fault Diagnosis', 'كشف عطل كهرباء', 'electrical', 'visit', 180, 150, 120, 50, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400'),
  ('Ceiling Fan Install', 'تركيب مروحة سقف', 'electrical', 'visit', 250, 210, 180, 22, 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400'),
  ('Electrical Inspection', 'فحص كهرباء المنزل', 'electrical', 'visit', 300, 260, 220, 18, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400'),
  ('Water Heater Connection', 'توصيل سخان كهرباء', 'electrical', 'visit', 320, 280, 240, 16, 'https://images.unsplash.com/photo-1584622781564-1d987f85968a?w=400'),
  ('Emergency Electrical Callout', 'نجدة كهرباء', 'electrical', 'visit', 450, 400, 350, 12, 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400'),
  ('Faucet Repair', 'إصلاح حنفية', 'plumbing', 'visit', 140, 120, 100, 38, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400'),
  ('Leak Repair', 'إصلاح تسريب', 'plumbing', 'visit', 200, 170, 140, 30, 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400'),
  ('Drain Unclogging', 'تسليك مجاري', 'plumbing', 'visit', 180, 150, 120, 42, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'),
  ('Toilet Repair', 'إصلاح مرحاض', 'plumbing', 'visit', 210, 180, 150, 26, 'https://images.unsplash.com/photo-1584622781564-1d987f85968a?w=400'),
  ('Pipe Replacement', 'تغيير مواسير', 'plumbing', 'visit', 350, 300, 250, 14, 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400'),
  ('Home Inspection', 'فحص شامل للمنزل', 'inspection', 'visit', 400, 340, 280, 20, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'),
  ('Preventive Maintenance Visit', 'زيارة صيانة دورية', 'inspection', 'visit', 280, 240, 200, 24, 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400'),
  ('Annual Service Contract', 'عقد صيانة سنوي', 'inspection', 'year', 2400, 2100, 1800, 8, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400');
