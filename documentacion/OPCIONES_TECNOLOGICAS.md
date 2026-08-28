# 🛠️ Opciones tecnológicas — cómo construir la herramienta

> Investigación realizada el 2026-07-27 sobre cómo llenar los PDF del banco manteniendo el
> formato IDÉNTICO al oficial (objetivo #1: reducir devoluciones), entregándolo a brokers
> externos (sin dominio Habi) por un link.

---

## 🔑 Regla de oro (lo más importante)

Para que el formato salga **idéntico** al del banco, hay que **RELLENAR el PDF original**
del banco:
- Si es **editable** (con casillas internas) → se llenan esas casillas.
- Si es **plano** → se escribe texto encima en coordenadas exactas (overlay).

❌ **NO** se debe "recrear" el formato en una plantilla nueva (Google Docs), porque el
diseño queda distinto → riesgo de devolución.

---

## 📊 Comparación de opciones

| Opción | ¿Formato idéntico? | Link para externos | Firmas | Costo | Instalar en PC |
|--------|--------------------|--------------------|--------|-------|----------------|
| **App web con Python** (Cloud Run/Streamlit) | ✅ Sí | ✅ Sí | ✅ | Bajo (~US$0–20/mes) | ❌ No (corre en nube) |
| **Apps Script + pdf-lib** | ✅ Sí | ✅ Sí (anónimo) | ✅ | ~US$0 | ❌ No (nube de Google) |
| **AppSheet** | ❌ No garantizado (lossy) | ✅ pero paga por broker | ✅ | ~US$5/broker/mes | ❌ No |
| **Looker Studio + Apps Script** | Depende de Apps Script | ✅ | vía script | ~US$0 | ❌ No |

---

## 🔎 Hallazgos por herramienta

### AppSheet → ❌ Descartado como motor
- NO rellena el PDF del banco; genera un documento NUEVO desde plantilla.
- Proceso Docs → HTML → PDF es "lossy" (Google lo advierte): márgenes/paginación pueden no
  coincidir → riesgo de devolución.
- Firmas: sí las soporta (columna Signature).
- Externos: TODOS requieren licencia. Las licencias "External User" se eliminaron el
  10-abr-2025. Reemplazo: "AppSheet User Pass" ~US$5 por usuario único por mes.

### Apps Script → ✅ SÍ puede (recomendado como MVP)
- Rellena campos de PDF editable (AcroForm) usando la librería **pdf-lib** (soporta texto,
  checkbox, dropdown, radio button).
- Escribe texto encima de PDF plano por coordenadas (overlay) e inserta imágenes (firmas).
- Se publica como **Web App** accesible por link para usuarios **anónimos** (sin login Google):
  configuración "Ejecutar como: yo" + "Acceso: cualquiera, incluso anónimos".
- Crea su propia interfaz HTML (la "cara bonita").
- Costo ~US$0. **No requiere instalar nada ni permisos de administrador** (corre en la nube).
- Límites: 6 minutos por ejecución; cuotas diarias; la carga de pdf-lib por CDN es un punto
  a mantener con cuidado.

### Looker Studio → ❌ No sirve como interfaz de captura
- Es de **solo lectura** (muestra tableros). No captura formularios ni genera documentos.
- No puede "disparar" la generación de un documento de forma nativa.
- ✅ SÍ sirve para lo suyo: **tablero de monitoreo interno** (radicaciones, devoluciones por
  banco/ciudad). Se puede compartir con externos por link.

### App web con Python → ✅ La más robusta (largo plazo)
- Rellena AcroForm (pypdf/PyMuPDF) y hace overlay (reportlab/PyMuPDF): formato idéntico.
- Interfaz a la medida, link público, firmas, escalable.
- Corre en la nube (Cloud Run) → no requiere instalar en PC. Requiere desarrollo + hosting.

---

## ✅ Recomendación

**Arquitectura elegida (a validar con el usuario):**

```
Broker externo → 🔗 Link → Interfaz web (Apps Script HTML o app Python)
                              ↓ rellena los PDF OFICIALES del banco
                           📄 Formatos idénticos al oficial (descarga)
                              ↓ registra la radicación
                        📊 Google Sheets → Looker Studio (monitoreo interno)
```

- **Para empezar (MVP/piloto):** **Apps Script + pdf-lib** → costo ~US$0, sin instalar nada,
  link para externos, formato idéntico. Ideal para arrancar con BBVA.
- **Para largo plazo / mayor volumen:** migrar a **app web con Python** (Cloud Run) si se
  necesita más robustez, mejor interfaz o más volumen.
- **Looker Studio:** se reserva para el **tablero de monitoreo interno**.

> Ventaja clave: Apps Script elimina la necesidad de instalar Python y de permisos de
> administrador, que era el bloqueo actual.

---

## ❓ Pendiente de decidir con el usuario
- ¿Arrancamos el piloto BBVA con **Apps Script** (gratis, sin instalar nada)?
- ¿O se prefiere la **app web con Python** desde el inicio (más robusta, requiere hosting)?
