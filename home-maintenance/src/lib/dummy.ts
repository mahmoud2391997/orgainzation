// ─── Dummy / Demo Data ──────────────────────────────────────────────
// Used whenever the database is unreachable so the UI still renders
// realistic sample data across every entity (products, customers,
// orders, conversations, menu pages, transactions, logs, etc.).

import type { Product, Customer, Order, Conversation, MenuPage } from './types';

const img = (id: string) => `https://images.unsplash.com/${id}?w=400&auto=format`;

export const DUMMY_PRODUCTS: Product[] = [
  { id: 'demo-outlet',     name: 'Outlet Repair',              name_ar: 'إصلاح فيش',           category: 'electrical', unit: 'visit', retail_price: 150, shop_price: 130, wholesale_price: 110, stock: 40, image_url: img('photo-1558618666-fcd25c85f82e') },
  { id: 'demo-light',      name: 'Light Fixture Install',      name_ar: 'تركيب إضاءة',          category: 'electrical', unit: 'visit', retail_price: 220, shop_price: 190, wholesale_price: 160, stock: 35, image_url: img('photo-1507473880760-e6d0cedf4938') },
  { id: 'demo-breaker',    name: 'Circuit Breaker Replacement', name_ar: 'تغيير القاطع',         category: 'electrical', unit: 'visit', retail_price: 280, shop_price: 240, wholesale_price: 200, stock: 28, image_url: img('photo-1473341304170-971dccb5ac1e') },
  { id: 'demo-wiring',     name: 'Wiring Fault Diagnosis',     name_ar: 'كشف عطل كهرباء',       category: 'electrical', unit: 'visit', retail_price: 180, shop_price: 150, wholesale_price: 120, stock: 50, image_url: img('photo-1621905251189-08b45d6a269e') },
  { id: 'demo-fan',        name: 'Ceiling Fan Install',        name_ar: 'تركيب مروحة سقف',      category: 'electrical', unit: 'visit', retail_price: 250, shop_price: 210, wholesale_price: 180, stock: 22, image_url: img('photo-1565538810643-b5bdb714032a') },
  { id: 'demo-e-inspect',  name: 'Electrical Inspection',      name_ar: 'فحص كهرباء المنزل',    category: 'electrical', unit: 'visit', retail_price: 300, shop_price: 260, wholesale_price: 220, stock: 18, image_url: img('photo-1581092160562-40aa08e78837') },
  { id: 'demo-heater-e',   name: 'Water Heater Connection',    name_ar: 'توصيل سخان كهرباء',    category: 'electrical', unit: 'visit', retail_price: 320, shop_price: 280, wholesale_price: 240, stock: 16, image_url: img('photo-1584622781564-1d987f85968a') },
  { id: 'demo-e-emergency',name: 'Emergency Electrical Callout', name_ar: 'نجدة كهرباء',        category: 'electrical', unit: 'visit', retail_price: 450, shop_price: 400, wholesale_price: 350, stock: 12, image_url: img('photo-1513828583688-c52646db42da') },
  { id: 'demo-faucet',     name: 'Faucet Repair',              name_ar: 'إصلاح حنفية',          category: 'plumbing',   unit: 'visit', retail_price: 140, shop_price: 120, wholesale_price: 100, stock: 38, image_url: img('photo-1584622650111-993a426fbf0a') },
  { id: 'demo-leak',       name: 'Leak Repair',                name_ar: 'إصلاح تسريب',          category: 'plumbing',   unit: 'visit', retail_price: 200, shop_price: 170, wholesale_price: 140, stock: 30, image_url: img('photo-1585704032915-c3400ca199e7') },
  { id: 'demo-drain',      name: 'Drain Unclogging',           name_ar: 'تسليك مجاري',          category: 'plumbing',   unit: 'visit', retail_price: 180, shop_price: 150, wholesale_price: 120, stock: 42, image_url: img('photo-1581578731548-c64695cc6952') },
  { id: 'demo-toilet',     name: 'Toilet Repair',              name_ar: 'إصلاح مرحاض',          category: 'plumbing',   unit: 'visit', retail_price: 210, shop_price: 180, wholesale_price: 150, stock: 26, image_url: img('photo-1584622781867-1d987fa85968') },
  { id: 'demo-pipe',       name: 'Pipe Replacement',           name_ar: 'تغيير مواسير',         category: 'plumbing',   unit: 'visit', retail_price: 350, shop_price: 300, wholesale_price: 250, stock: 14, image_url: img('photo-1504328345606-18bbc8c9d7d1') },
  { id: 'demo-inspect',    name: 'Home Inspection',            name_ar: 'فحص شامل للمنزل',      category: 'inspection', unit: 'visit', retail_price: 400, shop_price: 340, wholesale_price: 280, stock: 20, image_url: img('photo-1484154218962-a197022b5858') },
  { id: 'demo-preventive', name: 'Preventive Maintenance Visit', name_ar: 'زيارة صيانة دورية', category: 'inspection', unit: 'visit', retail_price: 280, shop_price: 240, wholesale_price: 200, stock: 24, image_url: img('photo-1504148455328-c376907d081c') },
  { id: 'demo-annual',     name: 'Annual Service Contract',    name_ar: 'عقد صيانة سنوي',       category: 'inspection', unit: 'year',  retail_price: 2400, shop_price: 2100, wholesale_price: 1800, stock: 8, image_url: img('photo-1454165804606-c3d57bc86b40') },
];

export const DUMMY_CUSTOMERS: Customer[] = [
  { id: 'demo-cust-1', name: 'Ahmed Hassan',            phone: '+20 100 123 4567', type: 'retail',     location: 'Nasr City, Cairo',        total_orders: 24, joined_at: '2026-01-12T00:00:00.000Z' },
  { id: 'demo-cust-2', name: 'Sara Mostafa',            phone: '+20 111 234 5678', type: 'retail',     location: 'Maadi, Cairo',            total_orders: 12, joined_at: '2026-02-03T00:00:00.000Z' },
  { id: 'demo-cust-3', name: 'Al Noor Compound',        phone: '+20 122 345 6789', type: 'shop',       location: 'Dokki, Giza',             total_orders: 8,  joined_at: '2026-02-21T00:00:00.000Z' },
  { id: 'demo-cust-4', name: 'Cairo Trades Co.',        phone: '+20 100 987 6543', type: 'restaurant', location: 'Zamalek, Cairo',          total_orders: 15, joined_at: '2025-11-18T00:00:00.000Z' },
  { id: 'demo-cust-5', name: 'Nile Towers Management',  phone: '+20 115 556 6778', type: 'shop',       location: 'New Cairo',               total_orders: 5,  joined_at: '2026-04-09T00:00:00.000Z' },
  { id: 'demo-cust-6', name: 'Omar Farouk',             phone: '+20 106 789 0123', type: 'retail',     location: 'Heliopolis, Cairo',       total_orders: 3,  joined_at: '2026-05-30T00:00:00.000Z' },
];

const d = (daysAgo: number, hour = 10, min = 0) => {
  const t = new Date();
  t.setDate(t.getDate() - daysAgo);
  t.setHours(hour, min, 0, 0);
  return t.toISOString();
};

const time = (h: number, m: number) =>
  `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

export const DUMMY_ORDERS: Order[] = [
  {
    id: 'ORD-852114', customer_id: 'demo-cust-1', customer_name: 'Ahmed Hassan', customer_type: 'retail',
    total: 470, status: 'pending', payment_status: 'cod', location: 'Nasr City, Cairo',
    created_at: d(0, 10, 24),
    order_items: [
      { id: 'demo-oi-1', order_id: 'ORD-852114', product_id: 'demo-outlet', product_name: 'Outlet Repair', qty: 1, unit: 'visit', unit_price: 150 },
      { id: 'demo-oi-2', order_id: 'ORD-852114', product_id: 'demo-faucet', product_name: 'Faucet Repair', qty: 1, unit: 'visit', unit_price: 140 },
      { id: 'demo-oi-3', order_id: 'ORD-852114', product_id: 'demo-drain',  product_name: 'Drain Unclogging', qty: 1, unit: 'visit', unit_price: 180 },
    ],
  },
  {
    id: 'ORD-852099', customer_id: 'demo-cust-4', customer_name: 'Cairo Trades Co.', customer_type: 'restaurant',
    total: 1320, status: 'confirmed', payment_status: 'unpaid', location: 'Zamalek, Cairo',
    created_at: d(0, 9, 5),
    order_items: [
      { id: 'demo-oi-4', order_id: 'ORD-852099', product_id: 'demo-breaker', product_name: 'Circuit Breaker Replacement', qty: 3, unit: 'visit', unit_price: 200 },
      { id: 'demo-oi-5', order_id: 'ORD-852099', product_id: 'demo-pipe',    product_name: 'Pipe Replacement', qty: 2, unit: 'visit', unit_price: 250 },
      { id: 'demo-oi-6', order_id: 'ORD-852099', product_id: 'demo-wiring',  product_name: 'Wiring Fault Diagnosis', qty: 1, unit: 'visit', unit_price: 120 },
    ],
  },
  {
    id: 'ORD-852031', customer_id: 'demo-cust-3', customer_name: 'Al Noor Compound', customer_type: 'shop',
    total: 680, status: 'out_for_delivery', payment_status: 'paid', location: 'Dokki, Giza',
    created_at: d(1, 16, 42),
    order_items: [
      { id: 'demo-oi-8', order_id: 'ORD-852031', product_id: 'demo-inspect', product_name: 'Home Inspection', qty: 2, unit: 'visit', unit_price: 340 },
    ],
  },
  {
    id: 'ORD-851998', customer_id: 'demo-cust-2', customer_name: 'Sara Mostafa', customer_type: 'retail',
    total: 400, status: 'delivered', payment_status: 'cod', location: 'Maadi, Cairo',
    created_at: d(2, 13, 18),
    order_items: [
      { id: 'demo-oi-10', order_id: 'ORD-851998', product_id: 'demo-leak',  product_name: 'Leak Repair', qty: 1, unit: 'visit', unit_price: 200 },
      { id: 'demo-oi-11', order_id: 'ORD-851998', product_id: 'demo-light', product_name: 'Light Fixture Install', qty: 1, unit: 'visit', unit_price: 220 },
    ],
  },
  {
    id: 'ORD-851870', customer_id: 'demo-cust-5', customer_name: 'Nile Towers Management', customer_type: 'shop',
    total: 720, status: 'completed', payment_status: 'paid', location: 'New Cairo',
    created_at: d(4, 11, 2),
    order_items: [
      { id: 'demo-oi-13', order_id: 'ORD-851870', product_id: 'demo-preventive', product_name: 'Preventive Maintenance Visit', qty: 3, unit: 'visit', unit_price: 240 },
    ],
  },
  {
    id: 'ORD-851644', customer_id: 'demo-cust-6', customer_name: 'Omar Farouk', customer_type: 'retail',
    total: 450, status: 'cancelled', payment_status: 'unpaid', location: 'Heliopolis, Cairo',
    created_at: d(6, 18, 33),
    order_items: [
      { id: 'demo-oi-15', order_id: 'ORD-851644', product_id: 'demo-e-emergency', product_name: 'Emergency Electrical Callout', qty: 1, unit: 'visit', unit_price: 450 },
    ],
  },
];

export const DUMMY_CONVERSATIONS: Conversation[] = [
  {
    id: 'demo-conv-1', customer_name: 'Ahmed Hassan', phone: '+20 100 123 4567', customer_type: 'retail',
    status: 'active', order_id: 'ORD-852114', last_activity: time(10, 30),
    messages: [
      { id: 'demo-msg-1', conversation_id: 'demo-conv-1', sender: 'customer', text: 'مرحباً، فيش المطبخ عطلان والحنفية بتسرب', time: time(10, 12), type: 'text' },
      { id: 'demo-msg-2', conversation_id: 'demo-conv-1', sender: 'bot', text: 'وعليكم السلام! نعم، إصلاح فيش 150 جنيه للزيارة وإصلاح حنفية 140 جنيه. 🔧', time: time(10, 13), type: 'text' },
      { id: 'demo-msg-3', conversation_id: 'demo-conv-1', sender: 'customer', text: 'تمام، إصلاح فيش وإصلاح حنفية وتسليك مجاري.', time: time(10, 20), type: 'text' },
      { id: 'demo-msg-4', conversation_id: 'demo-conv-1', sender: 'bot', text: 'تم استلام طلبك! 🔧\n\n• إصلاح فيش × 1 visit = 150.00 EGP\n• إصلاح حنفية × 1 visit = 140.00 EGP\n• تسليك مجاري × 1 visit = 180.00 EGP\n\nالمجموع: 470.00 EGP\n\nهل تريد تأكيد الطلب؟ (نعم/لا)', time: time(10, 24), type: 'order' },
    ],
  },
  {
    id: 'demo-conv-2', customer_name: 'Cairo Trades Co.', phone: '+20 100 987 6543', customer_type: 'restaurant',
    status: 'active', order_id: 'ORD-852099', last_activity: time(9, 12),
    messages: [
      { id: 'demo-msg-5', conversation_id: 'demo-conv-2', sender: 'customer', text: 'صباح الخير، محتاج صيانة جملة لعمارة اليوم.', time: time(9, 2), type: 'text' },
      { id: 'demo-msg-6', conversation_id: 'demo-conv-2', sender: 'bot', text: 'صباح الخير! بالتأكيد، ستحصل على أسعار المقاول. أرسل تفاصيل الأعمال.', time: time(9, 3), type: 'text' },
      { id: 'demo-msg-7', conversation_id: 'demo-conv-2', sender: 'customer', text: '3 تغيير قاطع، 2 تغيير مواسير، وكشف عطل كهرباء.', time: time(9, 6), type: 'text' },
      { id: 'demo-msg-8', conversation_id: 'demo-conv-2', sender: 'bot', text: 'تم استلام طلبك! المجموع: 1320.00 EGP. سنقوم بتأكيد الموعد ووصول الفني.', time: time(9, 8), type: 'order' },
    ],
  },
  {
    id: 'demo-conv-3', customer_name: 'Al Noor Compound', phone: '+20 122 345 6789', customer_type: 'shop',
    status: 'waiting', order_id: null, last_activity: time(17, 45),
    messages: [
      { id: 'demo-msg-9', conversation_id: 'demo-conv-3', sender: 'customer', text: 'بعتلي أسعار الفحص والصيانة للعمارة؟', time: time(17, 40), type: 'text' },
      { id: 'demo-msg-10', conversation_id: 'demo-conv-3', sender: 'bot', text: 'أكيد! أسعار العمارات: فحص شامل 340، زيارة دورية 240 للزيارة. تصفح القائمة:\n/menu', time: time(17, 41), type: 'link' },
    ],
  },
  {
    id: 'demo-conv-4', customer_name: 'Sara Mostafa', phone: '+20 111 234 5678', customer_type: 'retail',
    status: 'completed', order_id: 'ORD-851998', last_activity: time(13, 30),
    messages: [
      { id: 'demo-msg-11', conversation_id: 'demo-conv-4', sender: 'customer', text: 'شكراً على الزيارة! الفني وصل بسرعة.', time: time(13, 25), type: 'text' },
      { id: 'demo-msg-12', conversation_id: 'demo-conv-4', sender: 'bot', text: 'نشكرك جزيلاً! يسعدنا خدمتك دائماً 🔧', time: time(13, 26), type: 'text' },
    ],
  },
  {
    id: 'demo-conv-5', customer_name: 'Omar Farouk', phone: '+20 106 789 0123', customer_type: 'retail',
    status: 'completed', order_id: 'ORD-851644', last_activity: time(18, 45),
    messages: [
      { id: 'demo-msg-13', conversation_id: 'demo-conv-5', sender: 'customer', text: 'هو الموعد اتأكد؟', time: time(18, 30), type: 'text' },
      { id: 'demo-msg-14', conversation_id: 'demo-conv-5', sender: 'bot', text: 'تم إلغاء طلب النجدة الكهربائية. يمكنك فتح قائمة سلة لحجز زيارة جديدة:\n/menu', time: time(18, 32), type: 'text' },
    ],
  },
];

export const DUMMY_MENU_PAGES: MenuPage[] = [
  { id: 'demo-menu-1', slug: 'ahmed-hassan', customer_name: 'Ahmed Hassan', phone: '+20 100 123 4567', customer_type: 'retail', created_at: d(30, 9, 0) },
  { id: 'demo-menu-2', slug: 'cairo-trades', customer_name: 'Cairo Trades Co.', phone: '+20 100 987 6543', customer_type: 'restaurant', created_at: d(20, 10, 0) },
  { id: 'demo-menu-3', slug: 'al-noor-compound', customer_name: 'Al Noor Compound', phone: '+20 122 345 6789', customer_type: 'shop', created_at: d(10, 11, 0) },
];

export const DUMMY_TRANSACTIONS = [
  { id: 'demo-txn-1', orderId: 'ORD-852031', amount: 680, currency: 'EGP', status: 'success', paymentMethod: 'online', providerId: 'hy-7839201', createdAt: new Date(d(1, 17, 0)), updatedAt: new Date(d(1, 17, 5)) },
  { id: 'demo-txn-2', orderId: 'ORD-851870', amount: 720, currency: 'EGP', status: 'success', paymentMethod: 'online', providerId: 'hy-7738100', createdAt: new Date(d(4, 11, 30)), updatedAt: new Date(d(4, 11, 35)) },
];

export const DUMMY_WEBHOOK_EVENTS = [
  { id: 'demo-wbh-1', source: 'whatsapp', eventType: 'message_received', payload: {}, processed: true, createdAt: new Date(d(0, 10, 30)) },
  { id: 'demo-wbh-2', source: 'hyperpay', eventType: 'payment_succeeded', payload: {}, processed: true, createdAt: new Date(d(1, 17, 5)) },
  { id: 'demo-wbh-3', source: 'whatsapp', eventType: 'message_received', payload: {}, processed: true, createdAt: new Date(d(2, 9, 15)) },
];

export const DUMMY_SYSTEM_LOGS = [
  { id: 'demo-log-1', level: 'info', service: 'whatsapp', message: 'Webhook message received', createdAt: new Date(d(0, 10, 30)) },
  { id: 'demo-log-2', level: 'info', service: 'checkout', message: 'Order ORD-852114 created', createdAt: new Date(d(0, 10, 24)) },
  { id: 'demo-log-3', level: 'warn', service: 'mistral', message: 'Low confidence order parse, used fallback', createdAt: new Date(d(0, 9, 40)) },
  { id: 'demo-log-4', level: 'info', service: 'hyperpay', message: 'Payment succeeded for ORD-852031', createdAt: new Date(d(1, 17, 5)) },
];
