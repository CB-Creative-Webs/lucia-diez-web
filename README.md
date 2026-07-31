# Lucia Diez Web

Sitio profesional para Lucia Diez, psicologa, con identidad visual editorial, paleta suave y foco en psicoterapia integrativa, trauma, regulacion emocional y recursos digitales.

## Estado Actual

- Tipo de proyecto: sitio estatico con HTML, CSS y JavaScript.
- Dominio previsto/publicado: `https://www.luciadiez.com/`.
- Repositorio remoto configurado: `https://github.com/CB-Creative-Webs/lucia-diez-web.git`.
- Rama objetivo: `main`.
- Version de cache actual en HTML: `design135`.
- Idiomas: Espanol e ingles mediante `scripts.js`.
- La navegacion principal incluye: Inicio, Sobre mi, Como puedo acompanarte, Reserva tu sesion, E-books, Preguntas y Contacto.
- La firma de autoria al pie es minimal: `Design by CB` con logo y link externo.

## Identidad Visual

- Paleta usada:
  - Marfil: `#F7F2ED`
  - Azul humo: `#7893AA`
  - Rosa empolvado: `#D7A6B4`
  - Verde salvia: `#A7B4A0`
  - Azul tinta: `#31495D`
- Tipografias:
  - Titulos: `Playfair Display`.
  - Texto, navegacion y formularios: `DM Sans`.
- Estilo general: editorial, delicado, clinico, profesional, calido y sobrio.
- Evitar: bloques pesados, tarjetas repetidas sin jerarquia, textos demasiado grandes, decoracion recargada y footer tradicional con muchos links.

## Archivos Principales

- `index.html`: pagina principal completa.
- `styles.css`: sistema visual, layout responsive, animaciones y componentes.
- `scripts.js`: traducciones ES/EN, menu, scroll, formulario WhatsApp, comportamiento del header y flip del e-book.
- `pages/programa-raiz.html`: landing del Programa R.A.I.Z.
- `pages/ebook-primer-recurso.html`: pagina de compra/preview del e-book.
- `legal/privacidad.html`, `legal/terminos.html`, `legal/compra-descarga.html`: paginas legales en borrador.
- `api/ARCHITECTURE.md`: arquitectura propuesta para pagos y entrega automatica.
- `supabase/schema.sql`: esquema inicial para compras digitales.

## Assets Importantes

- `assets/logo-lucia-diez-raiz-rosa-editorial.png`: logo principal de Lucia.
- `assets/lucia-diez-foto-principal.jpeg`: foto actual de portada.
- `assets/og-lucia-diez.jpg`: imagen para previsualizacion social/WhatsApp.
- `assets/tapa-ebook-raiz-lucia-diez.png`: tapa del e-book R.A.I.Z.
- `assets/contratapa-ebook-raiz-lucia-diez-ajustada.png`: contratapa ajustada del e-book.
- `assets/cb-creative-logo-principal.png`: logo usado en el credito `Design by CB`.

## Contenido Clinico y Comercial Actual

- Servicios:
  - Programa R.A.I.Z. de 12 semanas.
  - Psicoterapia individual.
  - Terapia grupal.
- Precios actuales:
  - Programa R.A.I.Z.: Argentina `$240.000 ARS`; exterior `USD 260`.
  - Psicoterapia individual: Argentina `$60.000 ARS`; exterior `USD 65`.
  - Terapia grupal: Argentina `$40.000 ARS`; exterior `USD 50`.
  - E-book R.A.I.Z.: Argentina `$20.000 ARS`; exterior `USD 25`.
- Encuadre:
  - Pago anticipado.
  - Tolerancia de 15 minutos.
  - Cancelacion con menos de 48 horas: se cobra igualmente.
  - Sesion online: espacio privado y auriculares en lo posible.

## Funcionalidades Implementadas

- Header fijo con comportamiento de aparicion/desaparicion segun scroll.
- Logo con link a inicio.
- Navegacion por anclas con offset personalizado para que las secciones no queden tapadas.
- Switch ES/EN que reemplaza textos de la home y preguntas frecuentes.
- Formulario de contacto que arma mensaje para WhatsApp.
- Boton flotante de WhatsApp.
- E-book interactivo: clic/toque sobre la tapa para alternar tapa y contratapa.
- Version mobile responsive con menu hamburguesa.
- Metadata Open Graph/Twitter para compartir en WhatsApp y redes.

## Historial Resumido de Decisiones

1. Se partio de la firma/logo de Lucia y una paleta definida: marfil, azul humo, rosa empolvado, verde salvia y azul tinta.
2. Se construyo una home profesional con tono clinico, calido y editorial.
3. Se redujo la repeticion del logo/nombre y se ajusto el header para que no tape contenido.
4. Se separaron servicios, R.A.I.Z. y e-books para que la lectura sea mas clara.
5. El programa inicialmente se trabajo como R.E.S.T.A.U.R.A.R.; luego se corrigio a R.A.I.Z. en todas las secciones.
6. Se ajusto la cancelacion de 24 a 48 horas.
7. Se agrego idioma ingles.
8. Se cambio la foto principal de Lucia y se actualizo la imagen social.
9. Se incorporo tapa y contratapa del e-book R.A.I.Z. con animacion de flip.
10. Se agrego credito minimal de autoria: `Design by CB`.
11. Se cambio el precio de sesion individual de `$70.000 ARS` a `$60.000 ARS`.
12. Se actualizaron los valores vigentes: sesion individual exterior a `USD 65` y Programa R.A.I.Z. a `$240.000 ARS` / `USD 260`.

## Pendientes Antes de Produccion Final

- Confirmar URL exacta de Cecilia Barra Creative para el credito.
- Confirmar si el precio del e-book y programa siguen vigentes.
- Confirmar medios de pago reales y links finales de Mercado Pago / PayPal.
- Reemplazar textos legales en borrador por version revisada legalmente.
- Conectar backend de compra, webhooks, Supabase Storage y Resend.
- Validar que `og-lucia-diez.jpg` sea la imagen final deseada para WhatsApp.
- Revisar mobile real en 360, 375, 390 y 430 px.
- Revisar accesibilidad basica: foco, contraste, labels y navegacion por teclado.

## Como Levantar Localmente

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Abrir:

```text
http://localhost:8000/index.html?v=design135
```

Si se hacen cambios en CSS o JS, subir el numero de version en los HTML para evitar cache del navegador.

## Como Publicar en GitHub

Si el repositorio local esta correctamente sincronizado:

```bash
git status --short
git add .
git commit -m "Describe el cambio"
git push origin main
```

Si la copia local aparece como rama sin commits, clonar nuevamente desde GitHub o verificar que se este trabajando en la carpeta correcta antes de commitear.

## Regla de Documentacion

Despues de cada cambio importante en la pagina, actualizar esta documentacion antes de pushear.

Cambios que obligan a documentar:

- Cambios de precios, servicios, condiciones o textos clinicos.
- Cambios de identidad visual, logo, paleta, fotografia o imagen social.
- Cambios en navegacion, idioma, estructura o paginas nuevas.
- Cambios en pagos, descargas, formularios, WhatsApp o backend.
- Cambios que afecten mobile, accesibilidad o SEO/social preview.
