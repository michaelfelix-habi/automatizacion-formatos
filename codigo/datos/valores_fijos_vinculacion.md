# 🟢 Valores fijos — Formato "Vinculación Persona Natural" (BBVA)

> Campos que **siempre llevan el mismo valor** y se llenan automáticamente (el broker no
> los diligencia). El usuario los dicta una vez y quedan aquí como fuente oficial.

## Espacio exclusivo para el banco (página 3)
> ✅ Confirmado con el usuario (2026-08-11)
> Esta sección la llenamos NOSOTROS automáticamente. Combina valores fijos, datos automáticos y datos de la tabla radicadores.

| Campo PDF | Valor / Regla |
|-----------|--------------|
| `Código Nombre del funcionario` | 🏦 **Nombre del analista/gestor** según director comercial (tabla radicadores) |
| `identificacion` *(campo junto a Texto122)* | 🏦 **Cédula del analista/gestor** según director comercial (tabla radicadores) |
| `Texto122` | 🏦 **Código del analista/gestor** según director comercial (tabla radicadores) |
| `Texto123` | ⬜ En **blanco** |
| `Identificación_2` | ⬜ En **blanco** |
| `Fuerza de Ventas Interna FAST` | ⬜ En **blanco** |
| `Nombre_2` | 🟢 Siempre **HABICREDIT** |
| `Identificación_3` | ⬜ En **blanco** |
| `Coordinador Comercial` | ⬜ En **blanco** |
| `Nombre_3` | 🏦 **Nombre del coordinador** fijo por ciudad (tabla radicadores) |
| `Identificación_4` | 🏦 **Cédula del coordinador** fija por ciudad (tabla radicadores) |
| `Texto124` | 🟢 **Ciudad** de radicación — la misma seleccionada al inicio del formulario |
| `Texto125` | 🟢 **Fecha** — automática (igual que el encabezado del formato) |
| `Texto126` | 🟢 **Hora** — automática (hora en que se llena el formato) |
| `Lugar` | 🟢 Siempre X en **Sede cliente** |
| `resultado` | 🟢 Siempre X en **Satisfactorio** |
| `Texto127` | 🟢 Siempre **HABICREDIT** |
| `Texto128` | 🟢 Siempre **901005470-1** *(NIT de HABICREDIT)* |
| `Fuerza de Ventas Externa` | ⬜ En **blanco** |
| `Nombre` | ⬜ En **blanco** |
| `Texto129` | ⬜ En **blanco** |
| `Texto130` | ⬜ En **blanco** |

> ✅ **Espacio exclusivo BBVA — CERRADO** (2026-08-11)

---

## 🔽 Campos que dependen de una selección en la herramienta

### Tipo de operación (desplegable en nuestra herramienta)
- Opciones: **Hipotecario** o **Leasing** (SOLO estas dos; no hay más).
- Según lo elegido, el sistema marca/llena los campos en DOS lugares de la Vinculación:

  **1) Sección 1 "Productos a contratar"** → siempre se marca UNO de los dos:
  | Selección | Casilla que se marca |
  |-----------|----------------------|
  | Hipotecario | ☑️ Crédito de Vivienda |
  | Leasing | ☑️ Leasing |

  **2) Campo `destino`** → se selecciona según el caso del broker (5 opciones reales del PDF):
  - Compra de vivienda
  - Construcción individual
  - Remodelación de Vivienda
  - Compra de cartera
  - **Leasing habitacional** → al elegir esta, se activa el % de opción de compra

- **Conocimiento de Cliente → Sección 5 "Tipo del crédito":** también se marca según la línea elegida.

---

## 🟢 Valores fijos y reglas confirmadas por el usuario (2026-08-02)

### Encabezado
| Campo | Regla |
|-------|-------|
| **Fecha de solicitud** (Día/Mes/Año) | 🟢 Automática = la **fecha del día** en que se llena el formato |
| **Sucursal** | 🟢 Siempre **FVE** |
| **Tipo de vínculo** | 🔽 Selección en la herramienta: solo **Titular** o **Avalista** (nada más) |

### Sección 2 — Datos personales
| Campo | Regla |
|-------|-------|
| ¿Dónde recibir su **correspondencia**? (`correspondencia`) | ☑️ Siempre marcado **Correo electrónico** |
| ¿Por cuál **medio** recibir información comercial del banco? (`banco`) | ☑️ Siempre marcado **Correo electrónico** |
| **¿Reside en Colombia?** | ⬜ Se deja en **blanco** |
| Teléfono de **residencia** (`Texto23`) | ⬜ En blanco (no se diligencia) |
| Teléfono de **oficina** (`Texto24`) | ⬜ En blanco (no se diligencia) |
| **Nacionalidad 1** (`Texto26`) | 🧍 Escritura (nacionalidad del cliente) |
| Nacionalidad 2 / 3 / 4 (`Texto27` / `Texto28` / `Texto29`) | ⬜ En blanco |
| **País de Obligación Fiscal 1** (`Texto30`) | 🟢 Siempre **Colombia** |
| País de Obligación Fiscal 2 / 3 / 4 (`Texto31` / `Texto32` / `Texto33`) | ⬜ En blanco |
| **Número de Identificación Fiscal 1** (`Texto34`) | 🧍 = la **cédula del cliente** (misma de `Texto11`) |
| Número de Identificación Fiscal 2 / 3 / 4 (`Texto35` / `Texto36` / `Texto37`) | ⬜ En blanco |

### Sección 3 — Datos del cónyuge / compañero permanente
- 🔀 **Condicional:** solo se llena si el **estado civil** del cliente es **Casado** o **Unión libre**.
  Si no, se deja en blanco.

### Sección 4 — Datos del apoderado / representante
- ⬜ Siempre en **blanco** (no aplica). Incluye: `Texto42` (Nombres), `Texto43` (Primer
  apellido), `Texto44` (Segundo apellido), `Texto45` (N° identificación) y `identificacion3`
  (tipo de documento). Todos en blanco.

### Sección 5 — Actividad económica
| Campo | Regla |
|-------|-------|
| ¿Tiene constituidos **patrimonios autónomos o fiducias**? (`tiene`) | ☑️ Siempre **NO** |
| Detalle patrimonios/fiducias (`Texto61`, `Texto62`) | ⬜ En blanco (porque la respuesta es NO) |
| **Tabla de familiares PEP** (6 filas × 4 columnas: `Tipo de identificación...Row1-6`, `Número de IdentificaciónRow1-6`, `Nombres y apellidosRow1-6`, `Tipo de relaciónparentescoRow1-6`) | ⬜ **Todas en blanco siempre** |

### Sección 7 — Operaciones internacionales
- `moneda` y `posee`: el **broker selecciona Sí o No** según el caso del cliente (usualmente No).
- Si ambos = **No** → todos los campos de detalle (`Texto69`–`Texto75` y los demás) quedan **en blanco**.
- Si alguno = **Sí** → el broker diligencia los campos de detalle correspondientes.

### Sección 9 — Créditos y/o Leasing
| Campo | Regla |
|-------|-------|
| Plan de amortización (`cuotas`) | 🟢 Siempre **12 cuotas** |
| `Texto78`–`Texto81` (crédito/leasing vehículo) | ⬜ Siempre en **blanco** (no aplica para línea hipotecaria) |

### Sección 10 — Compra de cartera
- Solo aplica si `destino` = **Compra de cartera**. De lo contrario toda la sección va en blanco.
- Solo se llena la **fila 1** (`Row1`). Las filas `Row2`–`Row4` → **⬜ siempre en blanco**.

### Productos específicos (secciones 11-14)
> ✅ Confirmado con el usuario (2026-08-10)

| Sección | Regla |
|---------|-------|
| **11 — Tarjeta de Crédito** | ⬜ Siempre en **blanco** |
| **12 — BBVA Valores** | ⬜ Siempre en **blanco** |
| **13 — BBVA Fiduciaria** | ⬜ Siempre en **blanco** |
| **14 — BBVA Seguros** | ☑️ Siempre marcado **Seguro de Vida Vital** |

Campos de texto específicos confirmados en blanco (secciones 11–14):
`Texto90`, `Texto91`, `Texto98`, `Texto99`, `Texto100`, `Texto101`, `Texto104`, `Texto105`, `Texto106`, `Texto112`, `Texto119`, `Texto120`, `Texto121`

### Canal de comunicación (página 3)
> ✅ Confirmado con el usuario (2026-08-10)

| Campo | Regla |
|-------|-------|
| "Elige el canal para comunicarte sobre tus pagos" | ☑️ Siempre marcado **WhatsApp** |
| `Texto131` | 🧍 Cédula del **cliente** (se copia automáticamente del campo de identificación) |
| `Texto132` | ⬜ En **blanco** |

---

## ⏳ Otros valores fijos (por completar)
Se irán agregando a medida que el usuario los dicte.
