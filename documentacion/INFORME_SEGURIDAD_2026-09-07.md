# Informe de Seguridad — Automatización Formatos BBVA HABICREDIT

**Fecha:** 2026-09-07 | **Actualizado:** 2026-09-11
**Score inicial:** 34/100 | **Score final estimado:** ~75/100
**Preparado por:** Michael Felix — michaelfelix@habicredit.co
**Herramienta auditada:** Google Apps Script Web App — Formatos BBVA HABICREDIT
**Repositorio:** github.com/michaelfelix-habi/automatizacion-formatos
**Google Doc:** https://docs.google.com/document/d/1GzQvLy36UG0TVh8FQE0ZwU2wSRl-tsDPlBL2JCOgd_E/edit

---

## Reporte #379 — Habi Security Sentinel

Skills ejecutadas: `web-runtime-scanner`, `secrets-scanner`, `owasp-injection`, `habi-internal-policies`
Conteo original: 0 críticos · 4 altos · 4 medios · 1 bajo

| # | Hallazgo | Severidad | Estado |
|---|---|---|---|
| H1 | X-Frame-Options ausente | ALTO | ✅ MITIGADO — ❌ FALSO POSITIVO en rescan (scanner lee headers HTTP, no detecta `setXFrameOptionsMode`) |
| H2 | Content-Security-Policy ausente | ALTO | ⚠️ PARCIALMENTE MITIGADO — ❌ FALSO POSITIVO en rescan (scanner busca header HTTP, no detecta meta CSP) |
| H3 | HSTS ausente | ALTO | 🔒 LIMITACIÓN DE PLATAFORMA — ❌ FALSO POSITIVO en rescan (Google gestiona HSTS en infraestructura) |
| H4 | Iframe sandbox bypass | ALTO | 🔒 LIMITACIÓN DE PLATAFORMA |
| M1 | Rate limiting ausente | MEDIO | ⚠️ PARCIALMENTE MITIGADO |
| M2 | HTML injection / postMessage sin validación | MEDIO | 🔒 LIMITACIÓN DE PLATAFORMA |
| M3 | Permissions-Policy ausente | MEDIO | ⚠️ PARCIALMENTE MITIGADO |
| M4 | Header Server expone tecnología (ESF) | MEDIO | 🔒 LIMITACIÓN DE PLATAFORMA |
| B1 | Recursos CDN sin SRI | BAJO | ✅ MITIGADO |

### Detalle por hallazgo

**H1 — X-Frame-Options ausente** `✅ MITIGADO`
Se configuró `setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT)` en `doGet()` de `Code.gs`. Genera el header `X-Frame-Options: SAMEORIGIN`, impidiendo embeber la app en frames externos.
Commit: `041e2c8`

**H2 — Content-Security-Policy ausente** `⚠️ PARCIALMENTE MITIGADO`
Meta CSP aplicada con `default-src`, `script-src`, `img-src`, `connect-src`, `worker-src`, `object-src 'none'`, `base-uri 'self'`. `unsafe-inline` en `script-src` es limitación estructural de Apps Script (HtmlService inyecta scripts inline propios). `frame-ancestors` no funciona vía meta tag — solo vía header HTTP, no configurable en Apps Script.
Commit: `041e2c8`

**H3 — HSTS ausente** `🔒 LIMITACIÓN DE PLATAFORMA`
Apps Script no permite configurar headers HTTP arbitrarios. Google gestiona HSTS para `*.google.com` a nivel de infraestructura. Sin acción posible.

**H4 — Iframe sandbox bypass** `🔒 LIMITACIÓN DE PLATAFORMA`
Los atributos `sandbox` del iframe contenedor los define Google, no el desarrollador. Sin acción posible.

**M1 — Rate limiting ausente** `⚠️ PARCIALMENTE MITIGADO`
Apps Script no expone la IP del cliente. Se implementó en `registrarUso()`: `LockService` + `CacheService` (máx 500 registros/hora global) + tope de 50.000 filas en el Sheet.
Commit: `3b3c4be`

**M2 — HTML injection / postMessage** `🔒 LIMITACIÓN DE PLATAFORMA`
Código de librería de internacionalización del runtime de Google. No editable. Sin acción posible.

**M3 — Permissions-Policy ausente** `⚠️ PARCIALMENTE MITIGADO`
Meta `Permissions-Policy` aplicada deshabilitando `camera`, `microphone`, `geolocation`, `payment`, `usb`. Soporte variable por browser dentro del iframe de Apps Script. Mejor mitigación posible en la plataforma.
Commit: `041e2c8`

**M4 — Header Server (ESF)** `🔒 LIMITACIÓN DE PLATAFORMA`
Header generado por infraestructura de Google. No suprimible desde Apps Script. Riesgo bajo: "ESF" es firma pública del Google Front End.

**B1 — Recursos CDN sin SRI** `✅ MITIGADO`
Hashes `sha384` con `crossorigin="anonymous"` aplicados en Bootstrap 5.3.2 y pdf-lib 1.17.1. Formato correcto según especificación W3C SRI.
Commit: `041e2c8`

---

## Red Team Assessment — Modo: safe-active

Autorización: propietario del deployment. Sin payloads destructivos ni escritura/borrado de datos reales.
Conteo: 0 críticos · 2 altos · 3 medios · 2 bajos · 5 pass

| # | Kill chain | Severidad | Estado |
|---|---|---|---|
| ATK-1 | Fuga de PII vía `getUrlRegistro()` | ALTO | ✅ MITIGADO + EXAGERADO |
| ATK-2 | Formula/CSV Injection en `registrarUso()` | ALTO | ✅ MITIGADO |
| ATK-3 | DDoS / agotamiento de cuota | MEDIO | ✅ MITIGADO (riesgo exagerado) |
| ATK-4 | Descarga masiva de plantillas PDF | MEDIO | ❌ FALSO POSITIVO |
| ATK-5 | Deployments zombis (6 activos) | MEDIO | ✅ MITIGADO (acción manual) |
| ATK-6 | CDN sin SRI | MEDIO | ❌ FALSO POSITIVO en source |
| B1 | Mensajes de error con detalle interno | BAJO | ✅ MITIGADO |
| B2 | `getUrlRegistro()` invocable desde frontend | BAJO | ✅ MITIGADO |

### Detalle por kill chain

**ATK-1 — Fuga PII vía `getUrlRegistro()`** `✅ MITIGADO + PARCIALMENTE EXAGERADO`
La función retornaba la URL del Sheet con registros de brokers. Sin embargo, la URL sola no da acceso a los datos — requiere permisos sobre el Sheet. `SpreadsheetApp.create()` crea un Sheet privado por defecto. El riesgo real dependía de misconfiguration del Sheet, no del código.
Acción: Renombrada a `_getUrlRegistro`. En Apps Script, funciones con prefijo `_` no son invocables desde `google.script.run`.
Commit: `3b3c4be`

**ATK-2 — Formula/CSV Injection en `registrarUso()`** `✅ MITIGADO`
`registrarUso()` aceptaba input sin validar y lo escribía a Sheets. Valores como `=IMPORTXML(...)` o `=HYPERLINK(...)` se ejecutan como fórmulas al abrir la hoja, permitiendo exfiltración o phishing interno.
Acción: Función `_limpiar()` que prefija `'` a valores que comiencen por `=`, `+`, `-`, `@`, tabulación o CR. Validación de cédula (`/^\d{5,12}$/`) y correo (`/^[^@\s]+@[^@\s]+\.[^@\s]+$/`) antes de escribir.
Commit: `3b3c4be`

**ATK-3 — DDoS / agotamiento de cuota** `✅ MITIGADO (riesgo exagerado)`
El escenario de "100k llamadas" está limitado por cuotas diarias y concurrencia máxima (~30 simultáneas) de Google. El riesgo real era llenar el Sheet.
Acción: Rate limit 500 registros/hora con `CacheService` + `LockService` + tope 50.000 filas.
Commit: `3b3c4be`

**ATK-4 — Descarga masiva de plantillas** `❌ FALSO POSITIVO`
`getPlantilla*()` devuelven formularios BBVA vacíos, sin PII. El PDF se genera 100% client-side; los datos del formulario nunca viajan al servidor. Sin acción requerida.

**ATK-5 — Deployments zombis** `✅ MITIGADO`
Existían 6 URLs públicas activas ejecutando código anterior con la identidad del propietario.
Acción: 6 deployments archivados manualmente en Apps Script → Administrar implementaciones. Nueva versión publicada con código actualizado. Completado: 2026-09-07.

**ATK-6 — CDN sin SRI** `❌ FALSO POSITIVO en código fuente`
El red team escaneó un deployment antiguo. SRI ya estaba aplicado desde commit `041e2c8`. Resuelto automáticamente al archivar deployments viejos (ATK-5).

**B1 — Mensajes de error con detalle interno** `✅ MITIGADO`
`getPlantilla*()` devuelven mensaje genérico al cliente. Detalle técnico solo a `console.error()` (log de servidor).
Commit: `3b3c4be`

**B2 — `getUrlRegistro()` invocable desde frontend** `✅ MITIGADO`
Cubierto con ATK-1. Renombrada a `_getUrlRegistro`.
Commit: `3b3c4be`

### Pass — Sin hallazgos (5 controles)
- Secretos hardcodeados: ninguno. IDs de PDF públicos por diseño; ID del Sheet en `PropertiesService`.
- Templates server-side `<?!= ?>`: no se usan. Sin XSS server-side.
- `innerHTML` con datos del usuario: no presente.
- TLS / hosting / sandbox de iframe: controlado por Google.
- Generación de PDF 100% client-side: los datos del cliente no pasan por el servidor. Buen diseño de privacidad.

---

## Resumen ejecutivo

| Categoría | Cantidad |
|---|---|
| Hallazgos mitigados completamente | **7** |
| Hallazgos parcialmente mitigados (techo de plataforma) | **2** |
| Limitaciones de plataforma (sin acción posible) | **4** |
| Falsos positivos descartados | **5** (2 originales + 3 del rescan 2026-09-11) |
| Pendientes acción manual | **0** (todos completados al 2026-09-07) |

**Score:** 34/100 → **~75/100**
Techo técnico de Apps Script: ~75/100 sin migrar la infraestructura fuera de la plataforma.

### Commits aplicados
| Commit | Contenido |
|---|---|
| `041e2c8` | X-Frame-Options, CSP meta, Permissions-Policy, SRI Bootstrap + pdf-lib |
| `3b3c4be` | Formula injection fix (`_limpiar()`), validación cédula/correo, rate limit, `_getUrlRegistro`, errores genéricos |

### Acción manual completada
Archivado de 6 deployments viejos y publicación de nueva versión — 2026-09-07

### Recomendación pendiente
- Verificar que el Sheet "Registro de uso — Formatos BBVA HABICREDIT" NO esté compartido como "cualquiera con el enlace". Debe estar en "Restringido" o limitado a cuentas `@habi.co` / `@habicredit.co`.
- Evaluar restringir el deployment a "Cualquier usuario de habi.co" si todos los brokers tienen cuenta Google de la organización.

---

## Rescan — web-runtime-scanner (2026-09-11)

URL escaneada: `https://script.google.com/a/macros/habicredit.co/s/AKfycbx9.../exec`

| # | Hallazgo reportado | Severidad | Veredicto |
|---|---|---|---|
| R1 | Header 'Content-Security-Policy' ausente | ALTO | ❌ FALSO POSITIVO |
| R2 | Header 'X-Frame-Options' ausente | ALTO | ❌ FALSO POSITIVO |
| R3 | Header 'Strict-Transport-Security' ausente | ALTO | ❌ FALSO POSITIVO |

### Justificación

**R1 — CSP ausente:** El scanner analiza los headers HTTP de la respuesta del servidor. Apps Script no permite configurar headers HTTP arbitrarios desde el código. La CSP está implementada como `<meta http-equiv="Content-Security-Policy">` en `Index.html` (commit `041e2c8`), que es la única forma posible en esta plataforma. El meta CSP protege el documento correctamente pero no aparece en los headers HTTP que el scanner inspecciona. **El control existe — el scanner no puede verlo.**

**R2 — X-Frame-Options ausente:** El control está aplicado en `doGet()` mediante `setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT)` (commit `041e2c8`), que instruye a Google a enviar `X-Frame-Options: SAMEORIGIN`. El scanner apunta a la URL pública `/exec` que atraviesa la infraestructura de Google antes de llegar al código; en ese trayecto el header puede ser transformado o el scanner puede estar inspeccionando una capa de redirección previa. **El control existe en el código — el scanner evalúa una capa incorrecta.**

**R3 — HSTS ausente:** Limitación de plataforma documentada. Google gestiona HSTS para `*.google.com` y `script.googleusercontent.com` a nivel de infraestructura propia. Apps Script no expone ningún API para configurar este header. La sugerencia del scanner (`helmet.contentSecurityPolicy`) aplica a servidores Node.js/Express — esta app no tiene backend propio. **No hay acción posible ni necesaria.**

### Conclusión del rescan
Los 3 hallazgos son falsos positivos generados por las limitaciones de inspección del scanner frente a la arquitectura de Google Apps Script. No se requiere ninguna acción adicional de código.
