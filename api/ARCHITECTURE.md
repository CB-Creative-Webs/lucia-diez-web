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
8. El servidor genera un enlace firmado temporal de Supabase Storage.
9. Resend envía el email de descarga.
10. La compra pasa a `delivered` sin duplicar emails ni enlaces.

## Endpoints propuestos

- `POST /api/checkout/mercadopago`: crea preferencia Checkout Pro en ARS.
- `POST /api/checkout/paypal`: crea orden PayPal en USD.
- `POST /api/webhooks/mercadopago`: valida firma y actualiza compra.
- `POST /api/webhooks/paypal`: valida evento con PayPal y actualiza compra.
- `GET /api/download/:token`: valida vencimiento y redirige a URL firmada.

## Datos pendientes

- SVG original del logo, si existe.
- Email de contacto y dominio final.
- Ebook real, tapa, precio ARS, precio USD y descripción aprobada.
- Credenciales de Mercado Pago, PayPal, Supabase y Resend.
- Revisión legal de privacidad, términos y política de compra.

## Seguridad mínima

- Nunca guardar ebooks pagos en `assets` ni en carpeta pública.
- Nunca exponer service role key, access tokens ni client secrets al navegador.
- Validar webhooks con firma o endpoint oficial del proveedor.
- Usar idempotencia por `gateway_payment_id` y `idempotency_key`.
- Registrar auditoría de estado y fecha.
- Aplicar rate limit a checkout, webhooks y descarga.
