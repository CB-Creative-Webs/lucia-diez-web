# Arquitectura de pagos y entrega automática

Primera versión preparada para conectar cuando Lucía tenga cuentas y productos finales.

## Flujo

1. La persona entra a la página del ebook.
2. Completa nombre y email.
3. Elige Mercado Pago para Argentina o PayPal para exterior.
4. El servidor crea una compra en estado `created` o `pending`.
5. El proveedor procesa el pago.
6. El webhook valida autenticidad y confirma estado.
7. Si el pago está aprobado, se actualiza la compra con clave idempotente.
8. El servidor genera un token de descarga privado y temporal.
9. Brevo envía el email de descarga.
10. La compra pasa a `delivered` sin duplicar emails ni enlaces.

## Endpoints propuestos

- `POST /api/checkout/mercadopago`: crea preferencia Checkout Pro en ARS.
- `POST /api/checkout/paypal`: crea orden PayPal en USD.
- `POST /api/webhooks/mercadopago`: valida firma y actualiza compra.
- `POST /api/webhooks/paypal`: valida evento con PayPal y actualiza compra.
- `GET /api/download/:token`: valida vencimiento y contador, y transmite el PDF desde R2 privado.

## Infraestructura creada

- Cloudflare Worker: `lucia-diez-ebook-api`.
- URL técnica: `https://lucia-diez-ebook-api.cbcreative10.workers.dev`.
- D1: `lucia-diez-ebook-sales` para compras y eventos.
- R2 privado: `lucia-diez-ebooks-private` para el PDF final.
- La venta permanece bloqueada mediante `SALE_ENABLED=false`.
- Cada enlace vence a los 7 días y admite como máximo 3 descargas.

## Datos pendientes

- SVG original del logo, si existe.
- Email de contacto y dominio final.
- Ebook real, tapa, precio ARS, precio USD y descripción aprobada.
- Credenciales renovadas de Mercado Pago, PayPal y Brevo.
- Secretos de webhook de Mercado Pago y PayPal.
- Revisión legal de privacidad, términos y política de compra.

## Seguridad mínima

- Nunca guardar ebooks pagos en `assets` ni en carpeta pública.
- Nunca exponer access tokens, API keys ni client secrets al navegador.
- Validar webhooks con firma o endpoint oficial del proveedor.
- Usar idempotencia por `gateway_payment_id` y `idempotency_key`.
- Registrar auditoría de estado y fecha.
- Aplicar rate limit a checkout, webhooks y descarga.
