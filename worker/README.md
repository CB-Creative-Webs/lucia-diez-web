# Backend de venta del E-book R.A.Í.Z.

Cloudflare Worker con D1 para compras, R2 privado para el PDF, Mercado Pago, PayPal y entrega por Brevo.

## Estado seguro

- `SALE_ENABLED` debe permanecer en `false` durante configuración y pruebas iniciales.
- El PDF no se incluye en Git; vive en `lucia-diez-ebooks-private/ebooks/Ebook_RAIZ_FINAL.pdf`.
- El enlace vence a los 7 días (`DOWNLOAD_TTL_HOURS=168`) y permite 3 descargas (`MAX_DOWNLOADS=3`).
- `/health` solo devuelve `ok`, `saleEnabled` y `environment`. No devuelve bindings, tokens, IDs de compra ni secretos.

## Precios y remitente

- Mercado Pago: ARS 20.000 (`PRODUCT_ARS=20000`).
- PayPal: USD 25 (`PRODUCT_USD=25`).
- Brevo From/Reply-To: `Lucía Diez <luciaadiez@gmail.com>`.

## Secretos requeridos

- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_WEBHOOK_SECRET`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `BREVO_API_KEY`

Se cargan con Cloudflare Secrets. Nunca deben escribirse en Git, HTML, JavaScript público ni `wrangler.jsonc`.

## Webhook de PayPal

URL:

`https://lucia-diez-ebook-api.cbcreative10.workers.dev/api/webhooks/paypal`

Eventos configurados y procesados:

- `PAYMENT.CAPTURE.COMPLETED`: valida importe y moneda, aprueba la compra y dispara una sola entrega.
- `PAYMENT.CAPTURE.PENDING`: mantiene la compra pendiente.
- `PAYMENT.CAPTURE.DECLINED`: marca la compra rechazada.
- `PAYMENT.CAPTURE.REFUNDED`: marca la compra reembolsada y revoca el enlace.
- `PAYMENT.CAPTURE.REVERSED`: marca la compra reembolsada/revertida y revoca el enlace.
- `CHECKOUT.PAYMENT-APPROVAL.REVERSED`: cancela una aprobación que no pudo capturarse.

Todos los eventos se aceptan únicamente después de verificar la firma mediante la API oficial de PayPal.

## Pasar PayPal de Sandbox a Live

1. Mantener `SALE_ENABLED=false`.
2. Crear o abrir la aplicación **Live** de Lucía en PayPal Developer.
3. Reemplazar `PAYPAL_CLIENT_ID` y `PAYPAL_CLIENT_SECRET` por los secretos Live.
4. Crear el webhook en la aplicación Live con la misma URL y los seis eventos indicados.
5. Reemplazar `PAYPAL_WEBHOOK_ID` por el ID Live.
6. Cambiar `PAYPAL_API_BASE` de `https://api-m.sandbox.paypal.com` a `https://api-m.paypal.com`.
7. Desplegar, realizar una compra real controlada y comprobar captura, email y descarga.
8. Activar la venta general únicamente después de esa verificación.
