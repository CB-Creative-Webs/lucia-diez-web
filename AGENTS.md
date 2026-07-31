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

