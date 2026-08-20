type Env = Cloudflare.Env;

type Gateway = "mercadopago" | "paypal";

interface CheckoutBody {
  name?: unknown;
  email?: unknown;
}

interface Purchase {
  id: string;
  customer_name: string;
  customer_email: string;
  gateway: Gateway;
  currency: "ARS" | "USD";
  amount_cents: number;
  status: string;
  gateway_order_id: string | null;
  download_count: number;
  download_expires_at: string | null;
}

const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  Response.json(data, { status, headers });

const corsHeaders = (env: Env) => ({
  "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  Vary: "Origin",
});

const errorResponse = (env: Env, message: string, status = 400) =>
  json({ ok: false, error: message }, status, corsHeaders(env));

const normalizeEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const normalizeName = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const validEmail = (email: string) =>
  email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const randomToken = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
};

const sha256 = async (value: string) => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const safeEqual = async (left: string, right: string) => {
  const leftHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(left));
  const rightHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(right));
  const a = new Uint8Array(leftHash);
  const b = new Uint8Array(rightHash);
  if (a.byteLength !== b.byteLength) return false;
  let result = 0;
  for (let index = 0; index < a.byteLength; index += 1) result |= a[index]! ^ b[index]!;
  return result === 0;
};

const parseCheckout = async (request: Request) => {
  const body = (await request.json()) as CheckoutBody;
  const name = normalizeName(body.name);
  const email = normalizeEmail(body.email);
  if (name.length < 2 || name.length > 100) throw new Error("Ingresá un nombre válido.");
  if (!validEmail(email)) throw new Error("Ingresá un email válido.");
  return { name, email };
};

const saleEnabled = (env: Env) => String(env.SALE_ENABLED) === "true";

const ensureAllowedOrigin = (request: Request, env: Env) => {
  const origin = request.headers.get("Origin");
  if (origin && origin !== env.ALLOWED_ORIGIN) throw new Error("Origen no autorizado.");
};

const createPurchase = async (
  env: Env,
  gateway: Gateway,
  name: string,
  email: string,
) => {
  const id = crypto.randomUUID();
  const currency = gateway === "mercadopago" ? "ARS" : "USD";
  const amount = gateway === "mercadopago" ? Number(env.PRODUCT_ARS) : Number(env.PRODUCT_USD);
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Precio inválido en el servidor.");
  await env.DB.prepare(
    `INSERT INTO purchases
      (id, product_id, customer_name, customer_email, gateway, currency, amount_cents)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, env.PRODUCT_ID, name, email, gateway, currency, Math.round(amount * 100))
    .run();
  return { id, currency, amount };
};

const mercadoPagoCheckout = async (request: Request, env: Env) => {
  if (!saleEnabled(env)) return errorResponse(env, "La venta todavía está en preparación.", 503);
  ensureAllowedOrigin(request, env);
  const { name, email } = await parseCheckout(request);
  const purchase = await createPurchase(env, "mercadopago", name, email);
  const apiUrl = new URL(request.url).origin;
  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.MERCADOPAGO_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": purchase.id,
    },
    body: JSON.stringify({
      items: [
        {
          id: env.PRODUCT_ID,
          title: env.PRODUCT_TITLE,
          quantity: 1,
          currency_id: "ARS",
          unit_price: purchase.amount,
        },
      ],
      payer: { name, email },
      external_reference: purchase.id,
      notification_url: `${apiUrl}/api/webhooks/mercadopago`,
      back_urls: {
        success: `${env.SITE_URL}/pages/pago-aprobado.html`,
        pending: `${env.SITE_URL}/pages/pago-pendiente.html`,
        failure: `${env.SITE_URL}/pages/pago-rechazado.html`,
      },
      auto_return: "approved",
      statement_descriptor: "LUCIA DIEZ",
    }),
  });
  const payload = (await response.json()) as { id?: string; init_point?: string; message?: string };
  if (!response.ok || !payload.id || !payload.init_point) {
    console.error(JSON.stringify({ event: "mercadopago_preference_failed", status: response.status }));
    throw new Error(payload.message || "Mercado Pago no pudo iniciar el pago.");
  }
  await env.DB.prepare(
    "UPDATE purchases SET gateway_order_id = ?, status = 'pending', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  )
    .bind(payload.id, purchase.id)
    .run();
  return json({ ok: true, redirectUrl: payload.init_point }, 200, corsHeaders(env));
};

const paypalAccessToken = async (env: Env) => {
  const credentials = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);
  const response = await fetch(`${env.PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const payload = (await response.json()) as { access_token?: string };
  if (!response.ok || !payload.access_token) throw new Error("PayPal no pudo autenticar la operación.");
  return payload.access_token;
};

const paypalCheckout = async (request: Request, env: Env) => {
  if (!saleEnabled(env)) return errorResponse(env, "La venta todavía está en preparación.", 503);
  ensureAllowedOrigin(request, env);
  const { name, email } = await parseCheckout(request);
  const purchase = await createPurchase(env, "paypal", name, email);
  const accessToken = await paypalAccessToken(env);
  const apiUrl = new URL(request.url).origin;
  const response = await fetch(`${env.PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": purchase.id,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: purchase.id,
          custom_id: purchase.id,
          description: env.PRODUCT_TITLE,
          amount: { currency_code: "USD", value: purchase.amount.toFixed(2) },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: "Lucía Diez",
            user_action: "PAY_NOW",
            return_url: `${apiUrl}/api/paypal/capture`,
            cancel_url: `${env.SITE_URL}/pages/pago-cancelado.html`,
          },
        },
      },
    }),
  });
  const payload = (await response.json()) as {
    id?: string;
    links?: Array<{ rel?: string; href?: string }>;
  };
  const approval = payload.links?.find((link) => link.rel === "payer-action" || link.rel === "approve")?.href;
  if (!response.ok || !payload.id || !approval) throw new Error("PayPal no pudo iniciar el pago.");
  await env.DB.prepare(
    "UPDATE purchases SET gateway_order_id = ?, status = 'pending', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  )
    .bind(payload.id, purchase.id)
    .run();
  return json({ ok: true, redirectUrl: approval }, 200, corsHeaders(env));
};

const sendDelivery = async (env: Env, purchase: Purchase) => {
  if (purchase.status === "delivered") return;
  const token = randomToken();
  const tokenHash = await sha256(token);
  const ttlHours = Number(env.DOWNLOAD_TTL_HOURS);
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();
  const expiryLabel = ttlHours % 24 === 0 ? `${ttlHours / 24} días` : `${ttlHours} horas`;
  const result = await env.DB.prepare(
    `UPDATE purchases
     SET status = 'delivered', download_token_hash = ?, download_expires_at = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND status = 'approved' AND delivered_at IS NULL`,
  )
    .bind(tokenHash, expiresAt, purchase.id)
    .run();
  if (!result.meta.changes) return;
  const apiUrl = env.API_PUBLIC_URL;
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: env.BREVO_SENDER_NAME, email: env.BREVO_SENDER_EMAIL },
      replyTo: { name: env.BREVO_SENDER_NAME, email: env.BREVO_SENDER_EMAIL },
      to: [{ name: purchase.customer_name, email: purchase.customer_email }],
      subject: "Tu E-book R.A.Í.Z. ya está disponible",
      htmlContent: `<p>Hola ${escapeHtml(purchase.customer_name)},</p><p>Gracias por tu compra. Podés descargar el E-book R.A.Í.Z. desde este enlace privado:</p><p><a href="${apiUrl}/api/download/${token}">Descargar E-book R.A.Í.Z.</a></p><p>El enlace vence en ${expiryLabel} y permite hasta ${env.MAX_DOWNLOADS} descargas.</p><p>Lucía Diez</p>`,
      tags: ["ebook-raiz", "compra-aprobada"],
    }),
  });
  if (!response.ok) {
    await env.DB.prepare(
      "UPDATE purchases SET status = 'approved', download_token_hash = NULL, download_expires_at = NULL WHERE id = ? AND delivered_at IS NULL",
    )
      .bind(purchase.id)
      .run();
    throw new Error("Brevo no pudo enviar el email.");
  }
  await env.DB.prepare(
    "UPDATE purchases SET delivered_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  )
    .bind(purchase.id)
    .run();
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]!);

const mercadoPagoSignatureValid = async (request: Request, env: Env, paymentId: string) => {
  const signature = request.headers.get("x-signature") || "";
  const requestId = request.headers.get("x-request-id") || "";
  const parts = Object.fromEntries(
    signature.split(",").map((part) => {
      const [key, value] = part.trim().split("=", 2);
      return [key, value];
    }),
  );
  const ts = parts.ts;
  const received = parts.v1;
  if (!ts || !received || !requestId) return false;
  const manifest = `id:${paymentId};request-id:${requestId};ts:${ts};`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.MERCADOPAGO_WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signatureBytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(manifest));
  const expected = Array.from(new Uint8Array(signatureBytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return safeEqual(expected, received);
};

const mercadoPagoWebhook = async (request: Request, env: Env) => {
  const url = new URL(request.url);
  const body = (await request.json().catch(() => ({}))) as {
    id?: string | number;
    type?: string;
    data?: { id?: string | number };
  };
  if (body.type && body.type !== "payment") return json({ ok: true });
  const paymentId = String(body.data?.id || url.searchParams.get("data.id") || "");
  if (!paymentId || !(await mercadoPagoSignatureValid(request, env, paymentId))) {
    return errorResponse(env, "Firma inválida.", 401);
  }
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${env.MERCADOPAGO_ACCESS_TOKEN}` },
  });
  const payment = (await response.json()) as {
    id?: number;
    status?: string;
    external_reference?: string;
    transaction_amount?: number;
    currency_id?: string;
  };
  if (!response.ok || !payment.external_reference) return errorResponse(env, "Pago no verificable.", 400);
  const purchase = await env.DB.prepare("SELECT * FROM purchases WHERE id = ? AND gateway = 'mercadopago'")
    .bind(payment.external_reference)
    .first<Purchase>();
  if (!purchase) return errorResponse(env, "Compra inexistente.", 404);
  const expectedAmount = purchase.amount_cents / 100;
  if (payment.currency_id !== purchase.currency || payment.transaction_amount !== expectedAmount) {
    return errorResponse(env, "Importe no válido.", 400);
  }
  await env.DB.prepare(
    "UPDATE purchases SET gateway_payment_id = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  )
    .bind(String(payment.id), payment.status === "approved" ? "approved" : "pending", purchase.id)
    .run();
  if (payment.status === "approved") await sendDelivery(env, { ...purchase, status: "approved" });
  return json({ ok: true });
};

const paypalCapture = async (request: Request, env: Env) => {
  const orderId = new URL(request.url).searchParams.get("token") || "";
  const purchase = await env.DB.prepare("SELECT * FROM purchases WHERE gateway_order_id = ? AND gateway = 'paypal'")
    .bind(orderId)
    .first<Purchase>();
  if (!purchase) return Response.redirect(`${env.SITE_URL}/pages/pago-rechazado.html`, 303);
  const accessToken = await paypalAccessToken(env);
  const response = await fetch(`${env.PAYPAL_API_BASE}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `capture-${purchase.id}`,
    },
  });
  const capture = (await response.json()) as {
    status?: string;
    purchase_units?: Array<{
      payments?: { captures?: Array<{ id?: string; status?: string; amount?: { value?: string; currency_code?: string } }> };
    }>;
  };
  const payment = capture.purchase_units?.[0]?.payments?.captures?.[0];
  const valid =
    response.ok &&
    capture.status === "COMPLETED" &&
    payment?.status === "COMPLETED" &&
    payment.amount?.currency_code === purchase.currency &&
    Number(payment.amount.value) === purchase.amount_cents / 100;
  if (!valid) return Response.redirect(`${env.SITE_URL}/pages/pago-pendiente.html`, 303);
  await env.DB.prepare(
    "UPDATE purchases SET gateway_payment_id = ?, status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  )
    .bind(payment.id, purchase.id)
    .run();
  await sendDelivery(env, { ...purchase, status: "approved" });
  return Response.redirect(`${env.SITE_URL}/pages/pago-aprobado.html`, 303);
};

const paypalWebhook = async (request: Request, env: Env) => {
  const bodyText = await request.text();
  const event = JSON.parse(bodyText) as {
    id?: string;
    event_type?: string;
    resource?: {
      id?: string;
      status?: string;
      custom_id?: string;
      amount?: { value?: string; currency_code?: string };
      supplementary_data?: { related_ids?: { order_id?: string; capture_id?: string } };
    };
  };
  const accessToken = await paypalAccessToken(env);
  const verification = await fetch(`${env.PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_algo: request.headers.get("paypal-auth-algo"),
      cert_url: request.headers.get("paypal-cert-url"),
      transmission_id: request.headers.get("paypal-transmission-id"),
      transmission_sig: request.headers.get("paypal-transmission-sig"),
      transmission_time: request.headers.get("paypal-transmission-time"),
      webhook_id: env.PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(bodyText),
    }),
  });
  const result = (await verification.json()) as { verification_status?: string };
  if (!verification.ok || result.verification_status !== "SUCCESS") return errorResponse(env, "Firma inválida.", 401);

  const eventType = event.event_type || "unknown";
  const orderId = event.resource?.supplementary_data?.related_ids?.order_id || "";
  const captureId = event.resource?.supplementary_data?.related_ids?.capture_id || event.resource?.id || "";
  let purchase: Purchase | null = null;
  if (event.event_type === "CHECKOUT.PAYMENT-APPROVAL.REVERSED" && event.resource?.id) {
    purchase = await env.DB.prepare("SELECT * FROM purchases WHERE gateway_order_id = ? AND gateway = 'paypal'")
      .bind(event.resource.id)
      .first<Purchase>();
  } else if (orderId) {
    purchase = await env.DB.prepare("SELECT * FROM purchases WHERE gateway_order_id = ? AND gateway = 'paypal'")
      .bind(orderId)
      .first<Purchase>();
  } else if (captureId) {
    purchase = await env.DB.prepare("SELECT * FROM purchases WHERE gateway_payment_id = ? AND gateway = 'paypal'")
      .bind(captureId)
      .first<Purchase>();
  }

  if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
    if (!purchase) return errorResponse(env, "Compra inexistente.", 404);
    const amountValid =
      event.resource?.status === "COMPLETED" &&
      event.resource.amount?.currency_code === purchase.currency &&
      Number(event.resource.amount.value) === purchase.amount_cents / 100 &&
      (!event.resource.custom_id || event.resource.custom_id === purchase.id);
    if (!amountValid) return errorResponse(env, "Importe no válido.", 400);
    await env.DB.prepare(
      "UPDATE purchases SET gateway_payment_id = ?, status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    )
      .bind(event.resource?.id, purchase.id)
      .run();
    await sendDelivery(env, { ...purchase, status: "approved" });
  } else if (eventType === "PAYMENT.CAPTURE.PENDING" && purchase) {
    await env.DB.prepare("UPDATE purchases SET status = 'pending', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(purchase.id)
      .run();
  } else if (eventType === "PAYMENT.CAPTURE.DECLINED" && purchase) {
    await env.DB.prepare("UPDATE purchases SET status = 'rejected', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(purchase.id)
      .run();
  } else if ((eventType === "PAYMENT.CAPTURE.REFUNDED" || eventType === "PAYMENT.CAPTURE.REVERSED") && purchase) {
    await env.DB.prepare(
      `UPDATE purchases
       SET status = 'refunded', download_token_hash = NULL, download_expires_at = NULL, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
    )
      .bind(purchase.id)
      .run();
  } else if (eventType === "CHECKOUT.PAYMENT-APPROVAL.REVERSED" && purchase) {
    await env.DB.prepare("UPDATE purchases SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(purchase.id)
      .run();
  }

  await env.DB.prepare(
    "INSERT OR IGNORE INTO payment_events (id, gateway, event_type, gateway_event_id, purchase_id) VALUES (?, 'paypal', ?, ?, ?)",
  )
    .bind(event.id || crypto.randomUUID(), eventType, event.id || null, purchase?.id || null)
    .run();
  return json({ ok: true });
};

const download = async (request: Request, env: Env, token: string) => {
  const tokenHash = await sha256(token);
  const purchase = await env.DB.prepare(
    "SELECT * FROM purchases WHERE download_token_hash = ? AND status = 'delivered'",
  )
    .bind(tokenHash)
    .first<Purchase>();
  if (!purchase || !purchase.download_expires_at || new Date(purchase.download_expires_at) <= new Date()) {
    return new Response("El enlace venció o no es válido.", { status: 410 });
  }
  if (purchase.download_count >= Number(env.MAX_DOWNLOADS)) {
    return new Response("El enlace alcanzó el máximo de descargas.", { status: 410 });
  }
  const object = await env.EBOOKS.get(env.EBOOK_OBJECT_KEY);
  if (!object?.body) return new Response("Archivo no disponible.", { status: 503 });
  const update = await env.DB.prepare(
    "UPDATE purchases SET download_count = download_count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND download_count < ?",
  )
    .bind(purchase.id, Number(env.MAX_DOWNLOADS))
    .run();
  if (!update.meta.changes) return new Response("El enlace alcanzó el máximo de descargas.", { status: 410 });
  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="Ebook_RAIZ_Lucia_Diez.pdf"',
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (object.size) headers.set("Content-Length", String(object.size));
  return new Response(object.body, { headers });
};

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    try {
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(env) });
      if (request.method === "GET" && url.pathname === "/health") {
        return json({ ok: true, saleEnabled: String(env.SALE_ENABLED) === "true", environment: env.ENVIRONMENT });
      }
      if (request.method === "POST" && url.pathname === "/api/checkout/mercadopago") return await mercadoPagoCheckout(request, env);
      if (request.method === "POST" && url.pathname === "/api/checkout/paypal") return await paypalCheckout(request, env);
      if (request.method === "POST" && url.pathname === "/api/webhooks/mercadopago") return await mercadoPagoWebhook(request, env);
      if (request.method === "POST" && url.pathname === "/api/webhooks/paypal") return await paypalWebhook(request, env);
      if (request.method === "GET" && url.pathname === "/api/paypal/capture") return await paypalCapture(request, env);
      if (request.method === "GET" && url.pathname.startsWith("/api/download/")) {
        return await download(request, env, url.pathname.slice("/api/download/".length));
      }
      return errorResponse(env, "Ruta inexistente.", 404);
    } catch (error) {
      console.error(JSON.stringify({ event: "request_failed", path: url.pathname, message: error instanceof Error ? error.message : "unknown" }));
      return errorResponse(env, error instanceof Error ? error.message : "Error inesperado.", 500);
    }
  },
} satisfies ExportedHandler<Env>;
