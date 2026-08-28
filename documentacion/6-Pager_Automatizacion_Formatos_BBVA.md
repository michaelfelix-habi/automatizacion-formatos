# 6-Pager: Automatización de Diligenciamiento de Formatos BBVA
**Proyecto:** Automatización de formatos hipotecarios BBVA  
**Área:** Crédito Hipotecario — HABICREDIT  
**Autor:** Michael Felix  
**Fecha:** 2026-08-28  
**Estado:** ✅ Piloto BBVA completo y funcionando

---

## Recursos del proyecto

| Recurso | Enlace / Ubicación |
|---|---|
| **Repositorio de código** | https://github.com/michaelfelix-habi/automatizacion-formatos |
| **Aplicación web (Apps Script)** | Google Apps Script — proyecto vinculado con `.clasp.json` |
| **Plantillas PDF — Drive** | Vinculación: `1fEK_DdjoPGc8qIeLibXBCvilN7sAPL6G` · Nómina: `1UkZniPngtIKZjOrYBnYYEx4sQjEP8aJ4` · Conocimiento: `1_N1py3FX-CtzN_gVdFhPOuItbYJ_90z6` |
| **Documentación técnica** | `/documentacion/` en el repositorio |
| **Evidencia de funcionamiento** | ⏳ pendiente (video/capturas por añadir) |

---

## 1. Resumen

### ¿Qué problema resolviste?

El proceso de radicación de crédito hipotecario ante el BBVA requería que los asesores (brokers) diligenciaran manualmente hasta 3 formatos por cliente: **Vinculación Persona Natural**, **Certificado de Nómina** y **Conocimiento de Cliente**. Este proceso era lento, propenso a errores y generaba devoluciones por parte del banco.

### ¿Cuál fue la solución?

Se construyó una **aplicación web** (Google Apps Script + pdf-lib) que permite al broker capturar los datos del cliente una sola vez en un formulario y generar automáticamente los 3 PDFs del banco —ya diligenciados, con los datos del radicador asignado según la ciudad— listos para descargar y firmar.

### ¿Qué impacto genera para el negocio?

- Reducción del tiempo de diligenciamiento de formatos de ~30 minutos a menos de 2 minutos por radicación.
- Eliminación de errores de transcripción (datos del radicador, NIT de la compañía, fechas, valores fijos).
- Sin costo de herramientas adicionales (100% sobre Google Workspace).
- Escalable a otros bancos replicando el mismo patrón.

---

## 2. Problema identificado

### Proceso actual (antes de la automatización)

1. El broker solicita los datos al cliente.
2. Abre cada formato en PDF o Word y los diligencia uno a uno, copiando los mismos datos repetidamente.
3. Consulta manualmente la tabla de radicadores por ciudad (coordinador, analista, director comercial) para saber qué datos colocar en los campos del banco.
4. Genera el PDF final, verifica y descarga.
5. Radica ante el banco.

### ¿Quiénes son los afectados?

- **Brokers / asesores comerciales** de HABICREDIT en Bogotá, Cali, Medellín y Barranquilla.
- **Coordinadores y analistas** cuyos datos debían buscarse y escribirse manualmente en cada radicación.
- **Área de crédito hipotecario**, que recibe el impacto de las devoluciones por errores en los formatos.

### ¿Por qué era importante resolverlo?

- Los formatos del BBVA son extensos (el de Vinculación tiene 397 campos).
- Los errores en campos del banco (radicador equivocado, datos de la compañía incorrectos) generan devoluciones que retrasan la aprobación del crédito.
- El proceso se repite en cada radicación — el ahorro de tiempo se acumula por cada cliente.

---

## 3. Solución construida

### ¿Qué se desarrolló?

Una **aplicación web** accesible desde el navegador (sin instalación), que:

1. Presenta un formulario único donde el broker ingresa los datos del cliente.
2. Al hacer clic en "Generar todos los PDFs", el sistema genera automáticamente los 3 formatos de BBVA ya diligenciados.
3. Cada PDF se descarga directamente en el computador del broker, listo para imprimir o firmar.

### ¿Cómo funciona?

- El broker selecciona la ciudad de radicación → el sistema asigna automáticamente el coordinador fijo y muestra el desplegable de directores comerciales de esa ciudad.
- Al seleccionar el director comercial, el sistema asigna automáticamente el analista correspondiente.
- Los datos fijos de HABICREDIT (NIT, nombre, sucursal, valores reglamentarios) se insertan sin intervención del broker.
- Los PDFs editables (Vinculación y Nómina) se llenan usando la API AcroForm del PDF.
- El PDF plano (Conocimiento de Cliente) se llena con la técnica de superposición de texto en coordenadas exactas (confirmadas por diagnóstico visual).

### ¿Qué tecnologías e IA se utilizaron?

| Herramienta | Rol |
|---|---|
| **Google Apps Script** | Backend y hosting de la aplicación web |
| **pdf-lib 1.17.1** (JavaScript) | Llenado de PDFs (AcroForm + drawText) |
| **Google Drive** | Almacenamiento de las plantillas PDF originales |
| **Claude (Anthropic)** | Diseño de arquitectura, diagnóstico de campos PDF, generación de código, validación de coordenadas y documentación |
| **Node.js + scripts .mjs** | Herramientas de diagnóstico para mapear coordenadas exactas en el PDF plano |

---

## 4. Metodología utilizada

### Etapas del proyecto

**Etapa 1 — Análisis (2026-07-27)**
- Levantamiento del proceso actual con el usuario.
- Definición del flujo: banco → actividad económica → ciudad → datos del cliente → generación.
- Análisis de los 3 formatos BBVA: tipo de PDF (editable vs. plano), número de campos, lógica de datos.
- Decisión técnica: piloto con Apps Script + pdf-lib (sin instalaciones, gratis, en la nube).

**Etapa 2 — Diseño y mapeo**
- Mapeo completo de los 397 campos del formulario de Vinculación (AcroForm).
- Mapeo de los 18 campos del formulario de Nómina.
- Análisis del PDF plano "Conocimiento de Cliente": extracción de coordenadas por diagnóstico visual con scripts Node.js.
- Definición de la tabla de radicadores: 4 ciudades, 12 directores comerciales, 7 analistas.

**Etapa 3 — Construcción**
- Implementación del formulario web (`Index.html`).
- Implementación de las 3 funciones de generación de PDF (`Code.gs`).
- Configuración de la tabla de radicadores en JavaScript.
- Pruebas iterativas de coordenadas en el PDF plano (múltiples rondas de ajuste fino).

**Etapa 4 — Validación**
- Verificación visual de los 3 PDFs generados con datos reales.
- Confirmación de coordenadas en las 3 páginas del "Conocimiento de Cliente".
- Despliegue con `clasp push`.

**Herramientas de diagnóstico utilizadas**
- Scripts `.mjs` para extraer coordenadas exactas del PDF plano por color, posición y tipo de elemento.
- `diagnostico_vinc.mjs`, `diagnostico_patrimonios.mjs`, `extraer_pos_final.mjs`, entre otros.

---

## 5. Stakeholders involucrados

| Rol | Participación |
|---|---|
| **Michael Felix (Líder del proyecto)** | Diseño, construcción, pruebas y documentación |
| **Brokers / asesores comerciales** | Usuarios finales — validan que los PDFs generados sean correctos |
| **Coordinadores por ciudad** (María Laura Ríos, María del Mar García, Yalila Sáenz, Juan Carlos Contreras) | Datos fijos que se insertan automáticamente según la ciudad |
| **Analistas por ciudad** (Juan Felipe Pinilla, Adriana Carolina Cortés, Laura Stephania Guzmán, Michel Daniela Rodríguez Jurado, Eurley Yajaira Murillo, Nayelis de Jesús Toscano) | Datos que se asignan automáticamente según el director comercial seleccionado |
| **Área de crédito hipotecario** | Área beneficiaria directa — reducción de errores y devoluciones |

---

## 6. Personas impactadas

| Equipo / Área | Personas aprox. | Tipo de impacto |
|---|---|---|
| **Brokers / asesores comerciales** | ~15–20 | Reduce el tiempo de diligenciamiento de ~30 min a <2 min por radicación |
| **Área de crédito hipotecario** | ~5 | Reduce las devoluciones por errores en formatos; menos retrabajo |
| **Coordinadores y analistas BBVA** | ~10 | Sus datos se ingresan correctamente sin depender de búsqueda manual |
| **Clientes finales** | Indirecto | Proceso de radicación más rápido → menor tiempo de respuesta del banco |

---

## 7. Recursos del proyecto

### Repositorio

- **URL:** https://github.com/michaelfelix-habi/automatizacion-formatos
- **Rama principal:** `main`
- **Acceso:** público
- **README:** disponible en `/codigo/README.md`

### Arquitectura

```
Automatizacion_diligenciamiento_formatos/
├── codigo/
│   ├── apps_script/
│   │   ├── Index.html          ← Formulario web + lógica JS (generarTodos, generarPDF)
│   │   ├── Code.gs             ← Backend: getPlantillaVinculacion(), getNomina(), getConocimiento()
│   │   ├── appsscript.json     ← Manifiesto Apps Script
│   │   └── .clasp.json         ← Configuración de despliegue
│   └── datos/
│       ├── formulario_captura_vinculacion.md
│       ├── radicadores_conocimiento_cliente.md
│       ├── valores_fijos_vinculacion.md
│       └── opciones_seleccion_vinculacion.md
├── documentacion/
│   ├── 00_BITACORA_Y_EXPLICACION.md
│   ├── BBVA_analisis_campos.md
│   ├── VINCULACION_mapa_campos.md
│   └── OPCIONES_TECNOLOGICAS.md
├── _copias_de_seguridad/       ← Respaldos con fecha
└── .gitignore
```

### Flujo de datos

```
[Broker ingresa datos en formulario web]
         ↓
[Apps Script: getPlantilla*() descarga PDF desde Drive]
         ↓
[pdf-lib: llena campos AcroForm (Vinculación, Nómina)
          y dibuja texto en coordenadas (Conocimiento)]
         ↓
[PDF generado → descarga automática en el navegador]
```

### Variables de configuración

| Variable | Valor | Dónde |
|---|---|---|
| Drive ID — Vinculación | `1fEK_DdjoPGc8qIeLibXBCvilN7sAPL6G` | `Code.gs` |
| Drive ID — Nómina | `1UkZniPngtIKZjOrYBnYYEx4sQjEP8aJ4` | `Code.gs` |
| Drive ID — Conocimiento | `1_N1py3FX-CtzN_gVdFhPOuItbYJ_90z6` | `Code.gs` |
| NIT HABICREDIT | `9010054701` | `Index.html` (constante fija) |
| Sucursal BBVA | `FVE` | `Index.html` (campo Texto1) |

### Prompts de IA utilizados

La construcción del proyecto se hizo con Claude (Anthropic) como asistente principal. Los prompts clave cubrieron:
- Diagnóstico y mapeo de campos de PDFs AcroForm (extracción de `/T`, `/TU`, coordenadas).
- Generación de scripts Node.js para extraer coordenadas exactas en PDFs planos.
- Implementación de la lógica de llenado con `pdf-lib` en Apps Script.
- Ajuste fino iterativo de coordenadas (técnica de diagnóstico visual por color/posición).
- Estructuración de la tabla de radicadores y lógica ciudad → director → analista.

### Instrucciones de instalación (para otro AI Builder)

1. Clonar el repositorio: `git clone https://github.com/michaelfelix-habi/automatizacion-formatos.git`
2. Instalar dependencias de diagnóstico: `npm install` (solo necesario para los scripts `.mjs` de análisis, no para la app en producción).
3. La app en producción corre 100% en Google Apps Script — no requiere instalación local.
4. Para desplegar: instalar `clasp` (`npm install -g @google/clasp`), autenticarse con `clasp login` y ejecutar `clasp push` desde `/codigo/apps_script/`.

### Evidencia de funcionamiento

📹 **Videos demostrativos:** https://drive.google.com/drive/folders/15P0WLPjg7gOlT5IJXpLeVHqyQm5PchZv

---

> Este documento fue generado con Claude Code (claude-sonnet-4-6) el 2026-08-28.
> Otro AI Builder puede retomar el proyecto desde el repositorio sin contexto adicional — toda la lógica técnica está documentada en `/documentacion/` y en los archivos de datos de `/codigo/datos/`.
