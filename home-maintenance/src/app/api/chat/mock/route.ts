import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';
import type { CustomerType } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'customer' | 'bot';
  text: string;
}

interface ParsedOrder {
  items: Array<{ name: string; qty: number; unit: string; price: number }>;
  total: number;
  location?: string;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  const message: string = body.message;
  const history: ChatMessage[] = body.history ?? [];
  const customerType: CustomerType = body.customerType ?? 'retail';
  const messageCount = history.length;

  // Fast path: greeting
  if (messageCount <= 1 && /^(مرحبا|السلام|اهلا|هلو|hello|hi|مرحب|مساء|صباح)/i.test(message)) {
    return NextResponse.json({
      reply: 'وعليكم السلام! اهلاً بك في خدمات كهرباء وسباكة المنزل 🔧\nهل تطلب لمنزلك أم لعمارة أم كمقاول؟',
      intent: 'greeting', orderData: null,
    });
  }

  // Fast path: classification
  if (messageCount === 2) {
    let detectedType = customerType;
    let reply = '';
    if (/لنفسي|شخصي|فردي|retail|myself|personal|منزل|بيتي|homeowner/i.test(message)) {
      detectedType = 'retail';
      reply = 'ممتاز! سعيد بخدمتك. أرسل لنا عنوان المنزل أو تصفح الخدمات من قائمة سلة:\n📱 /menu';
    } else if (/عمارة|عقار|compound|building|إدارة|shop|store/i.test(message)) {
      detectedType = 'shop';
      reply = 'رائع! ستحصل على أسعار العمارات وإدارة العقارات. أرسل العنوان أو تصفح القائمة:\n📱 /menu';
    } else if (/مقاول|contractor|restaurant|ورشة/i.test(message)) {
      detectedType = 'restaurant';
      reply = 'ممتاز! ستحصل على أسعار المقاولين. أرسل موقع العمل أو تصفح القائمة:\n📱 /menu';
    } else {
      reply = 'عذراً، هل أنت مالك منزل أم تطلب لعمارة أم مقاول؟';
    }
    return NextResponse.json({ reply, intent: 'classification', orderData: null, customerType: detectedType });
  }

  // Fast path: location — echo the customer's exact address (no fabrication)
  if (messageCount >= 3 && isLocationMessage(message)) {
    const location = message.trim();
    return NextResponse.json({
      reply: `شكراً! تم تسجيل موقعك: ${location} ✅\nهل تريد تأكيد طلبك الحالي أم إضافة منتجات أخرى؟\n📱 /menu`,
      intent: 'location', orderData: null, location,
    });
  }

  // Call Mistral AI
  const mistralApiKey = process.env.MISTRAL_API_KEY;
  if (!mistralApiKey) return fallbackReply(message, customerType, history);

  const mapped = await getProducts();
  const products = mapped.map(p => ({
    name: p.name,
    nameAr: p.name_ar,
    unit: p.unit,
    retailPrice: p.retail_price,
    shopPrice: p.shop_price,
    wholesalePrice: p.wholesale_price,
  }));

  const productContext = products
    .map(p => `${p.name} (${p.nameAr}): retail=${p.retailPrice}, shop=${p.shopPrice}, restaurant=${p.wholesalePrice} per ${p.unit}`)
    .join('\n');

  const priceKey = customerType === 'shop' ? 'shopPrice' : customerType === 'restaurant' ? 'wholesalePrice' : 'retailPrice';

  const conversationContext = history.map(m => `${m.role === 'bot' ? 'Bot' : 'Customer'}: ${m.text}`).join('\n');

  const prompt = `You are an AI assistant for a home electrical and plumbing WhatsApp ordering system based in Egypt.

All prices are in Egyptian pounds (EGP / جنيه مصري). NEVER use riyal/SAR or any other currency — always say "جنيه" or "EGP" when mentioning prices or totals.

Available products and prices:
${productContext}

Customer type: ${customerType} (use ${priceKey} pricing)

Conversation so far:
${conversationContext}

Customer latest message: "${message}"

Your tasks:
1. Determine the intent: greeting | classification | location | order | confirm | payment_choice | menu_link | browse | other
2. If the message contains a product order (in Arabic or English), extract:
   - items: array of {name, qty, unit, price} using the correct price tier
   - total: sum of all items
   - location: only if the customer mentions it, and ONLY using the customer's exact words — never invent an address
3. Generate a helpful Arabic reply that matches the conversation flow.
4. If it's a confirmation and there's an existing order being discussed, acknowledge.
5. If payment is being chosen: COD → acknowledge cash on delivery; online → send mock payment link.
6. If the customer wants to browse products or mentions the menu/list, respond with the menu link /menu.
7. If the customer sends what looks like an address (street, building, district, city), treat it as a location and repeat back ONLY the exact address the customer wrote. DO NOT add, guess, or fabricate any city, district, or landmark that the customer did not say.
8. Follow this order workflow strictly: after receiving products, collect the delivery address, then ask for payment method (cash on delivery or online), then show the final summary and ask for confirmation. Never confirm or say the order is registered when either the address or payment method is missing.

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "intent": "order",
  "reply": "Arabic bot reply here",
  "orderData": {
    "items": [{"name": "Outlet Repair", "qty": 5, "unit": "kg", "price": 15}],
    "total": 75,
    "location": "exact customer text here"
  }
}
If no order, set "orderData": null.
Always include a clickable menu link /menu in your reply when relevant.`;

  try {
    const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${mistralApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: 'You are an AI assistant for a home electrical and plumbing WhatsApp ordering system. Always respond with valid JSON only, no markdown formatting. Reply in Arabic.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3, max_tokens: 1024,
        response_format: { type: 'json_object' },
      }),
    });

    if (!mistralRes.ok) return fallbackReply(message, customerType, history);

    const mistralData = await mistralRes.json();
    const rawText = mistralData?.choices?.[0]?.message?.content ?? '{}';

    let parsed: { intent?: string; reply?: string; orderData?: ParsedOrder | null } = {};
    try { parsed = JSON.parse(rawText); } catch { parsed = { intent: 'other', reply: rawText, orderData: null }; }

    const workflowReply = enforceWorkflow(message, history, parsed);
    if (workflowReply) return workflowReply;

    return NextResponse.json({
      reply: parsed.reply ?? 'شكراً! سنتواصل معك قريباً.',
      intent: parsed.intent ?? 'other',
      orderData: parsed.orderData ?? null,
    });
  } catch {
    return fallbackReply(message, customerType, history);
  }
}

function enforceWorkflow(
  message: string,
  history: ChatMessage[],
  parsed: { intent?: string; reply?: string; orderData?: ParsedOrder | null },
) {
  const isConfirmation = /نعم|اكد|تأكيد|confirm|yes|موافق|اوكي|ok/i.test(message);
  const hasOrder = !!parsed.orderData || history.some(m => m.role === 'bot' && /طلب|خدمة|زيارة|مجموع|إجمالي|total/i.test(m.text));
  if (!hasOrder) return null;

  const hasLocation = history.some(m => m.role === 'customer' && isLocationMessage(m.text));
  const hasPayment = history.some(m => m.role === 'customer' && /استلام|cod|كاش|نقد|cash|اونلاين|online|بطاقة|فيزا|دفع/i.test(m.text));

  if ((isConfirmation || parsed.intent === 'confirm') && !hasLocation) {
    return NextResponse.json({ reply: 'قبل تأكيد الطلب، من فضلك أرسل عنوان التوصيل بالتفصيل (المنطقة، الشارع، ورقم المبنى).', intent: 'location', orderData: null });
  }
  if ((isConfirmation || parsed.intent === 'confirm') && !hasPayment) {
    return NextResponse.json({ reply: 'كيف تفضل الدفع؟ الدفع عند الاستلام أم الدفع الإلكتروني؟', intent: 'payment_choice', orderData: null });
  }
  if (parsed.intent === 'payment_choice' && hasLocation && !isConfirmation) {
    return NextResponse.json({ reply: 'تم اختيار طريقة الدفع ✅\nهل تؤكد الطلب بهذه التفاصيل؟ (نعم/لا)', intent: 'payment_choice', orderData: null });
  }
  return null;
}

function fallbackReply(message: string, customerType: CustomerType, history: ChatMessage[]) {
  if (/نعم|اكد|تأكيد|confirm|yes|موافق|اوكي|ok/i.test(message) && history.length > 2) {
    const hasLocation = history.some(m => m.role === 'customer' && isLocationMessage(m.text));
    const hasPayment = history.some(m => m.role === 'customer' && /استلام|cod|كاش|نقد|cash|اونلاين|online|بطاقة|فيزا|دفع/i.test(m.text));
    if (!hasLocation) {
      return NextResponse.json({ reply: 'قبل تأكيد الطلب، من فضلك أرسل عنوان التوصيل بالتفصيل (المنطقة، الشارع، ورقم المبنى).', intent: 'location', orderData: null });
    }
    if (!hasPayment) {
      return NextResponse.json({ reply: 'كيف تفضل الدفع؟ الدفع عند الاستلام أم الدفع الإلكتروني؟', intent: 'payment_choice', orderData: null });
    }
    return NextResponse.json({ reply: 'تم تأكيد طلبك! سنبدأ بتجهيزه فوراً. شكراً لك 🙏', intent: 'confirm', orderData: null });
  }
  if (/استلام|cod|كاش|نقد|cash/i.test(message)) {
    const hasOrder = history.some(m => m.role === 'bot' && /طلب|مجموع|إجمالي|total/i.test(m.text));
    return NextResponse.json({
      reply: hasOrder ? 'ممتاز، الدفع عند الاستلام ✅\nهل تؤكد الطلب بهذه التفاصيل؟ (نعم/لا)' : 'ممتاز، الدفع عند الاستلام ✅',
      intent: 'payment_choice', orderData: null,
    });
  }
  if (isLocationMessage(message)) {
    return NextResponse.json({
      reply: `شكراً! تم تسجيل موقعك: ${message.trim()} ✅\nكيف تفضل الدفع؟ الدفع عند الاستلام أم الدفع الإلكتروني؟`,
      intent: 'location', orderData: null, location: message.trim(),
    });
  }
  if (/استعراض|عرض|منيو|menu|products|المنتجات|القائمة|القايمة|قائمة|قايمة/i.test(message)) {
    return NextResponse.json({
      reply: '🔧 اختر الخدمات المطلوبة من القائمة:\n\n📱 افتح القائمة:\n/menu\n\nأو اكتب طلبك مباشرة مثل: "2 إصلاح فيش و 1 إصلاح حنفية"',
      intent: 'menu_link', orderData: null,
    });
  }

  const orderData = parseOrderFromText(message, customerType);
  if (orderData) {
    const itemsList = orderData.items.map(i => `• ${i.name} × ${i.qty} ${i.unit} = ${(i.price * i.qty).toFixed(2)} EGP`).join('\n');
    return NextResponse.json({
      reply: `تم استلام طلبك! 🛒\n\n${itemsList}\n\nالمجموع: ${orderData.total.toFixed(2)} EGP\n\nأرسل عنوان التوصيل بالتفصيل أولاً، ثم نختار طريقة الدفع ونؤكد الطلب.`,
      intent: 'order', orderData,
    });
  }

  return NextResponse.json({
    reply: 'يمكنك تصفح جميع الخدمات والأسعار من القائمة:\n📱 /menu\n\nأو اكتب طلبك مباشرة مثل: "2 إصلاح فيش و 1 إصلاح حنفية"',
    intent: 'other', orderData: null,
  });
}

const PRODUCTS: Record<string, { name: string; nameAr: string; unit: string; prices: { retail: number; shop: number; restaurant: number } }> = {
  outlet:    { name: 'Outlet Repair', nameAr: 'إصلاح فيش', unit: 'visit', prices: { retail: 150, shop: 130, restaurant: 110 } },
  faucet:    { name: 'Faucet Repair', nameAr: 'إصلاح حنفية', unit: 'visit', prices: { retail: 140, shop: 120, restaurant: 100 } },
  leak:      { name: 'Leak Repair', nameAr: 'إصلاح تسريب', unit: 'visit', prices: { retail: 200, shop: 170, restaurant: 140 } },
  drain:     { name: 'Drain Unclogging', nameAr: 'تسليك مجاري', unit: 'visit', prices: { retail: 180, shop: 150, restaurant: 120 } },
  breaker:   { name: 'Circuit Breaker Replacement', nameAr: 'تغيير القاطع', unit: 'visit', prices: { retail: 280, shop: 240, restaurant: 200 } },
  light:     { name: 'Light Fixture Install', nameAr: 'تركيب إضاءة', unit: 'visit', prices: { retail: 220, shop: 190, restaurant: 160 } },
  inspect:   { name: 'Home Inspection', nameAr: 'فحص شامل للمنزل', unit: 'visit', prices: { retail: 400, shop: 340, restaurant: 280 } },
};

function isLocationMessage(text: string): boolean {
  const locationMarkers = /حي|شارع|مدينة|محافظة|منطقة|جزيرة|قرية|ميدان|المعادي|القاهرة|الاسكندرية|الإسكندرية|المنصورة|الاسماعيلية|الإسماعيلية|طنطا|أسيوط|أسوان|الفيوم|بورسعيد|السويس|دمنهور|بنها|الزقازيق|المنوفية|الغربية|الشرقية|الدقهلية|البحيرة|كفر الشيخ|دمياط|street|district|city|zone|st\./i;
  if (!locationMarkers.test(text)) return false;

  const productWords = /فيش|حنفية|تسريب|مجاري|قاطع|إضاءة|سباكة|كهرباء|صيانة|فحص|outlet|faucet|leak|drain|breaker|plumb|electric/i;
  return !productWords.test(text);
}

function parseOrderFromText(text: string, customerType: CustomerType): ParsedOrder | null {
  const items: ParsedOrder['items'] = [];
  const priceKey = customerType as 'retail' | 'shop' | 'restaurant';
  const segments = text.split(/\s+(?:و|and)\s+|[,،]/i);

  for (const segment of segments) {
    const numMatch = segment.match(/(\d+)/);
    const qty = numMatch ? parseInt(numMatch[1]) : 1;
    for (const [, product] of Object.entries(PRODUCTS)) {
      const nameRegex = new RegExp(`(${product.name}|${product.nameAr})`, 'i');
      if (!nameRegex.test(segment)) continue;
      items.push({ name: product.name, qty, unit: product.unit, price: product.prices[priceKey] });
      break;
    }
  }

  if (items.length === 0) return null;
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  return { items, total };
}
