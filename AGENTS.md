# Instrucciones Para Futuros Agentes/LLMs

Este proyecto es la web profesional de Lucia Diez. Mantener el tono clinico, editorial, calido y profesional.

## Antes de Cambiar

- Leer `README.md`.
- Revisar `api/ARCHITECTURE.md` si el cambio toca pagos, ebooks, descargas o backend.
- Buscar el texto en `index.html` y tambien en `scripts.js`, porque muchas copias existen en las traducciones ES/EN.
- No modificar el diseno global si el pedido es puntual.
- No borrar cambios de usuario ni assets sin confirmacion.

## Despues de Cambios Importantes

Actualizar `README.md` en la misma tanda del cambio.

Agregar o corregir:

- Fecha/descripcion breve del cambio si afecta historial.
- Precios, servicios o condiciones.
- Assets nuevos o reemplazados.
- Version de cache (`design###`) si fue incrementada.
- Pendientes o decisiones que requieren confirmacion de Lucia.

## Checklist Antes de Entregar

- Confirmar que no quedaron valores viejos con `rg`.
- Si se cambia contenido visible en la home, revisar tambien traducciones en `scripts.js`.
- Si se cambia CSS/JS, incrementar el parametro `?v=design###` en todos los HTML afectados.
- Probar localmente con `python3 -m http.server 8000`.
- Si el usuario pide `pushealo`, commitear y pushear a `origin main`.

## SEO

Aplicar estas reglas como criterio permanente de SEO, AEO y GEO, únicamente cuando correspondan al tipo de sitio y al alcance solicitado. No inventar información, ubicaciones, servicios, experiencia, certificaciones, precios, disponibilidad, reseñas ni datos del negocio. No agregar schemas que no correspondan al contenido visible y real.

### Contenido de cada página

- Cada página debe responder a una búsqueda o intención concreta.
- Usar un título SEO único, claro y descriptivo, relacionado con el servicio, producto o tema principal.
- Crear una meta description única, atractiva y coherente con el contenido real.
- Usar URLs cortas y descriptivas.
- Mantener un `H1` principal claro y una jerarquía ordenada de `H2` y `H3`.
- Incluir textos visibles que expliquen qué se ofrece, para quién, dónde y cómo contratar, comprar o consultar.
- Crear contenido original, útil y escrito para personas, sin repetir palabras clave artificialmente.
- Explicar beneficios, características, opciones, proceso de trabajo y motivos para confiar.
- Incluir preguntas frecuentes reales cuando aporten información útil.
- Incorporar llamados a la acción claros: consultar, comprar, reservar o contactar.
- No crear páginas casi iguales cambiando solo una palabra, servicio o localidad.
- No generar contenido de relleno para intentar posicionar.

### Imágenes

- Priorizar fotografías reales y de buena calidad cuando estén disponibles.
- Usar nombres de archivo descriptivos y ALT descriptivo cuando la imagen aporte información.
- Usar ALT vacío en imágenes puramente decorativas.
- Optimizar copias en WebP o AVIF cuando sea compatible, conservando los originales.
- Mantener buena calidad con el menor peso posible.
- Definir ancho y alto para evitar movimientos durante la carga.
- Aplicar carga diferida a imágenes fuera de la primera pantalla.
- No cambiar, recortar ni comprimir originales sin necesidad.

### Navegación y enlaces

- Mantener un menú claro, simple y fácil de usar.
- Crear enlaces internos entre páginas relacionadas con textos descriptivos.
- Incorporar breadcrumbs cuando existan varias categorías o niveles.
- Mantener contacto fácilmente accesible y el logo enlazado al inicio.
- Usar enlaces HTML rastreables y evitar enlaces rotos.
- Verificar que los botones importantes funcionen.

### Información y confianza

- Mostrar el nombre real del negocio, marca o profesional y medios de contacto reales.
- Incluir una sección o página sobre la profesional.
- Incluir políticas de privacidad, cookies, cambios, devoluciones, envíos o condiciones cuando sean necesarias.
- Mostrar autoría, formación, experiencia y fuentes en contenido psicológico o profesional.
- Usar únicamente reseñas reales y verificables.
- No inventar clientes, trabajos, testimonios, premios ni resultados.

### SEO técnico

- Diseñar y probar primero para celular y mantener diseño responsive.
- Optimizar velocidad y Core Web Vitals.
- Usar HTTPS, HTML semántico y accesible.
- Mantener `sitemap.xml` y `robots.txt` actualizados.
- Agregar canonical cuando corresponda.
- Permitir indexar páginas importantes y usar `noindex` en páginas privadas, internas, duplicadas o sin valor.
- Aplicar redirecciones 301 cuando se eliminen o cambien URLs.
- Mantener una página 404 útil.
- Evitar errores de carga, enlaces rotos y contenido duplicado.
- Asegurar que el contenido principal sea legible por buscadores y use respuestas HTTP correctas.
- Definir el idioma y usar `hreflang` solo si existen versiones reales por idioma o país.
- No ocultar texto o enlaces para manipular buscadores.

### Apariencia al compartir

- Configurar título, descripción, Open Graph, favicon e imagen `og:image` representativa.
- Mantener el nombre de marca escrito de forma consistente.
- Verificar la vista previa al compartir la URL.

### Datos estructurados

Usar únicamente los tipos que correspondan al contenido visible y real:

- `Organization` para empresas o marcas.
- `LocalBusiness` solo para negocios con ubicación o zona de atención confirmada.
- `Product` y `Offer` para productos, precios y disponibilidad reales.
- `Article` para notas o publicaciones.
- `BreadcrumbList` para navegación jerárquica.
- `WebSite` para información general del sitio.
- `FAQPage` solo cuando las preguntas y respuestas sean visibles y reales.

No agregar todos los schemas automáticamente ni incluir datos no respaldados en la web. No inventar direcciones, precios, disponibilidad, calificaciones o reseñas. Validar con Rich Results Test y corregir errores críticos antes de publicar.

### Negocios locales

Cuando corresponda:

- Mantener Google Business Profile con nombre, teléfono, email y datos coherentes con la web.
- Cargar dirección o zona, categorías, horarios, fotos, servicios y productos reales.
- Incentivar reseñas genuinas sin comprarlas ni inventarlas y responderlas.
- Verificar enlaces a web, teléfono y WhatsApp.
- Crear páginas por servicio o zona solo si tienen contenido propio, útil y diferente.

### Productos y tienda

- Crear una URL propia por producto, con título y descripción originales.
- Mostrar precio, disponibilidad, variantes y condiciones reales.
- Incluir imágenes optimizadas y representativas.
- Agregar `Product` y `Offer` cuando correspondan.
- Informar entrega, cambios y devoluciones.
- Gestionar productos agotados o eliminados y redirecciones de URLs.
- Evitar páginas vacías y verificar botones y proceso de compra.
- Considerar Google Merchant Center cuando corresponda.

### Estructura de páginas

Crear páginas separadas para servicios, productos, preguntas, perfil y contacto solo cuando exista contenido suficiente, real, útil y diferente. No crear páginas vacías, repetidas o generadas únicamente para posicionar.

### Configuración y medición

- Conectar Google Search Console y enviar el sitemap cuando el cliente lo autorice.
- Revisar el dominio y páginas principales con Inspección de URLs.
- Conectar Analytics u otra herramienta únicamente con autorización.
- Configurar conversiones relevantes, como formularios, WhatsApp, compras o reservas.
- Validar datos estructurados, PageSpeed, indexación, errores 404 y enlaces rotos.
- No agregar seguimiento sin autorización.
- No afirmar que Search Console, Analytics o Google Business Profile están configurados sin comprobarlo.

### Antes de publicar

- Verificar títulos, descriptions, encabezados, URLs e información real.
- Revisar enlaces internos, formularios, teléfonos, emails, WhatsApp y botones.
- Comprobar celular, tablet y computadora.
- Confirmar indexación, sitemap, robots y canonical.
- Revisar imágenes, ALT y peso.
- Ejecutar el build una sola vez cuando corresponda.
- No realizar auditorías generales ni cambios fuera del pedido.
- No abrir el navegador para verificaciones extensas salvo pedido expreso.

### Después de publicar

- Confirmar de forma concisa que la publicación terminó correctamente.
- No hacer verificaciones largas con navegador salvo que se soliciten.
- Revisar posteriormente rastreo, indexación, consultas, clics, posiciones y conversiones mediante herramientas conectadas.
- Actualizar datos, precios, imágenes y contenido cuando cambien.
- Corregir errores o información desactualizada y crear contenido nuevo solo si aporta valor.

### Principio principal

Cada página debe explicar claramente qué ofrece, a quién está dirigida, dónde atiende o entrega, qué opciones existen, cómo consultar, comprar o reservar, por qué confiar y cuál es el siguiente paso. El SEO debe producir una web útil, clara, rápida, accesible, confiable y fácil de navegar; no limitarse a agregar palabras clave.
