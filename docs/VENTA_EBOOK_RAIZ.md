# Venta del e-book R.A.I.Z.

## Estado actual

- PDF final preparado en `.private/ebooks/Ebook_RAIZ_FINAL.pdf`.
- El archivo privado queda excluido de Git y no se publica con la web.
- El PDF final está cargado en un bucket R2 privado de Cloudflare.
- El backend de staging está desplegado con la venta y la descarga desactivadas.
- Precio de referencia: ARS 20.000 / USD 25.
- Email de Lucía: `luciaadiez@gmail.com`.

## Flujo seguro recomendado

1. La persona elige Mercado Pago o PayPal.
2. El proveedor procesa el pago.
3. Un webhook llega al Cloudflare Worker seguro.
4. El backend verifica que el pago esté aprobado o completado.
5. Se crea un token privado con vencimiento de 7 días y hasta 3 descargas.
6. Brevo envía el enlace por email.

Una redirección a una página de agradecimiento nunca debe habilitar por sí sola la descarga.

## Qué necesitamos de Lucía

### Brevo

- Crear y verificar la cuenta con Lucía presente para recibir códigos.
- Verificar `luciaadiez@gmail.com` como remitente.
- Generar una clave de API transaccional.
- Aprobar nombre del remitente, asunto y texto del email de entrega.

### Mercado Pago

- Cuenta verificada.
- Credenciales de producción y secreto de webhook, o link de pago definitivo.
- Confirmar el precio en ARS y el concepto que verá la persona al pagar.

### PayPal

- Cuenta PayPal Business. Una cuenta personal común no alcanza para automatizar de forma segura la confirmación y entrega.
- Client ID, Client Secret y Webhook ID de producción.
- Confirmar el precio en USD y la moneda de cobro.
- El webhook procesa `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.PENDING`, `PAYMENT.CAPTURE.DECLINED`, `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.CAPTURE.REVERSED` y `CHECKOUT.PAYMENT-APPROVAL.REVERSED`.

Las claves y secretos nunca deben escribirse en HTML, JavaScript público, GitHub ni mensajes compartidos. Se cargan como variables secretas en el backend.

## Próximos pasos

1. Abrir y verificar Brevo con Lucía.
2. Recibir las credenciales de Mercado Pago y PayPal Business.
3. Cargar los secretos privados directamente en Cloudflare.
4. Configurar los webhooks con la URL técnica del Worker.
5. Probar compras completas en modo de prueba.
6. Activar `SALE_ENABLED=true` únicamente después de verificar ambos recorridos.

### 2026-08-20

- Se creó el Worker `lucia-diez-ebook-api` con D1 y R2 privados.
- Se subió el PDF final al objeto `ebooks/Ebook_RAIZ_FINAL.pdf`.
- Se creó el esquema de compras, estados, tokens temporales y eventos.
- Se prepararon Mercado Pago, PayPal, verificación de webhooks, entrega por Brevo y descarga con límite.
- La API está en staging y la venta continúa apagada hasta cargar secretos y completar pruebas.
- Se fijó la política definitiva del enlace en 7 días y un máximo de 3 descargas.

## Registro

### 2026-08-03

- Se preparó el PDF final sin habilitar acceso público.
- Se dejó una configuración de ejemplo con venta y descarga bloqueadas.
- Se definió una política inicial de 72 horas y 2 descargas, reemplazada el 2026-08-20.

## Recordatorio de documentación

Después de cambios importantes de contenido, precios, pagos, emails, publicación o recursos visuales, actualizar este documento y el historial del proyecto antes de hacer push.
