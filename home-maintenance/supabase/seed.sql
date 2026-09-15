-- Sample BaytFix services for local development / demo.
INSERT INTO products (name, name_ar, category, unit, retail_price, shop_price, wholesale_price, stock, image_url) VALUES
  ('Outlet Repair', 'إصلاح فيش', 'electrical', 'visit', 150, 130, 110, 40, 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Light Fixture Install', 'تركيب إضاءة', 'electrical', 'visit', 220, 190, 160, 35, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Circuit Breaker Replacement', 'تغيير القاطع', 'electrical', 'visit', 280, 240, 200, 28, 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Faucet Repair', 'إصلاح حنفية', 'plumbing', 'visit', 140, 120, 100, 38, 'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Leak Repair', 'إصلاح تسريب', 'plumbing', 'visit', 200, 170, 140, 30, 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Drain Unclogging', 'تسليك مجاري', 'plumbing', 'visit', 180, 150, 120, 42, 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Home Inspection', 'فحص شامل للمنزل', 'inspection', 'visit', 400, 340, 280, 20, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Preventive Maintenance Visit', 'زيارة صيانة دورية', 'inspection', 'visit', 280, 240, 200, 24, 'https://images.pexels.com/photos/5691630/pexels-photo-5691630.jpeg?auto=compress&cs=tinysrgb&w=600')
ON CONFLICT DO NOTHING;
