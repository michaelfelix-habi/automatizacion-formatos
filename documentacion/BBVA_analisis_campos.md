# 🏦 BBVA — Análisis detallado de campos

> Los 3 formatos son **PDF planos**: los campos NO son casillas rellenables internas,
> sino **espacios donde se escribe texto encima** (overlay). Algunos campos son de texto
> libre y se agregan según la información solicitada al cliente.

Formatos analizados:
1. `FORMATO CONOCIMIENTO DE CLIENTE APROBADO.docx.pdf` (3 páginas)
2. `Formato Vinculacion Persona Natural.pdf` (3 páginas)
3. `FORMATO NOMINA ACTUALIZADO ABRIL.pdf` (1 página)

Leyenda de **Origen**:
🏢 Compañía (fijo) · 👤 Broker · 🏦 Banco/ciudad · 🧍 Cliente · ✍️ Firma · ☑️ Marcar opción

---

## 1️⃣ FORMATO CONOCIMIENTO DE CLIENTE (CSF) — revisión completa

### Sección 1 — Datos Generales del Prescriptor
| Campo | Tipo | Origen |
|-------|------|--------|
| Fecha (de entrega de documentos) | Texto | 🏢/automática |
| Nombre (quien tiene activo el código / hace la visita) | Texto | 👤 Broker |
| Cédula | Texto | 👤 Broker |
| NIT | Texto | 🏢 Compañía |
| Ciudad (donde autorizado a gestión comercial) | Texto | 🏢/👤 |

### Sección 2 — Datos Generales del Cliente
| Campo | Tipo | Origen |
|-------|------|--------|
| Nombre | Texto | 🧍 Cliente |
| Cédula | Texto | 🧍 Cliente |
| Nombre del Coordinador | Texto | 🏦 **Según CIUDAD** |
| Ciudad | Texto | 🧍/🏙️ |

### Sección 3 — Validación de identidad y firmas
| Campo | Tipo | Origen | Valor por defecto |
|-------|------|--------|-------------------|
| Certifico haber tomado fotocopia... (SI / NO) | ☑️ Selección | 👤 Broker | **Siempre SI** (fijo) |

> 💡 Siempre se marca **SI**, porque el broker certifica que tomó las firmas presencialmente.
> Se marca automáticamente, el broker no lo elige.

### Sección 4 — Conclusiones de la visita
| Campo | Tipo | Origen | Valor por defecto |
|-------|------|--------|-------------------|
| Conclusiones de la visita | Texto | 👤 Broker | **"Favorable"** (casi siempre) |

> 💡 Este campo se rellena automáticamente con **"Favorable"** por defecto. El broker solo
> lo cambia en el caso excepcional que la visita no sea favorable.

### Sección 5 — Información del inmueble
> 💡 **REGLA CONFIRMADA:**
> - **Campos de TEXTO:** constructora y proyecto se dejan **en blanco**. Solo se llena
>   **"Ciudad o municipio de compra"**.
> - **Campos de SELECCIÓN:** los 4 son **OBLIGATORIOS** → el broker SIEMPRE los selecciona.

| Campo | Tipo | Origen | ¿Se llena? |
|-------|------|--------|-----------|
| Nombre constructora | Texto | — | ❌ En blanco |
| Nombre del Proyecto | Texto | — | ❌ En blanco |
| **Ciudad o municipio de compra** | Texto | 🧍 Cliente | ✅ **Ciudad donde se compra** |
| **¿Proyecto financiado por el banco?** (SI / NO) | ☑️ Selección | 👤 Broker | ✅ **Obligatorio** |
| **Rango del inmueble** (VIS / NO VIS) | ☑️ Selección | 👤 Broker | ✅ **Obligatorio** |
| **Tipo del crédito** (HIPOTECARIO TRADICIONAL / LEASING FAMILIAR / LEASING NO FAMILIAR) | ☑️ Selección | 👤 Broker | ✅ **Obligatorio** |
| **Línea del crédito** (9 opciones) | ☑️ Selección | 👤 Broker | ✅ **Obligatorio** |

### Firmas (página 3)
> 💡 **REGLA CONFIRMADA — dos grupos de firmas:**
> - **A puño y letra** (las hace la persona físicamente, el sistema NO las pone):
>   solo **Cliente 1** y **Cliente 2**.
> - **Automáticas según CIUDAD** (el sistema coloca firma + nombre + cédula):
>   **Prescriptor** y **Gestor/Analista** (se necesita la **imagen de la firma** de cada
>   radicador por ciudad).

| Bloque de firma | ¿Firma la pone el sistema? | Nombre + Cédula | Origen |
|-----------------|----------------------------|-----------------|--------|
| Firma Prescriptor | ✅ Sí (imagen según ciudad) | ✅ Sí | 🏦 Radicador según CIUDAD |
| Firma Gestor y/o Analista | ✅ Sí (imagen según ciudad) | ✅ Sí | 🏦 Radicador según CIUDAD |
| Firma Cliente 1 | ❌ No — a puño y letra | ✅ Sí | 🧍 Cliente (titular 1) |
| Firma Cliente 2 | ❌ No — a puño y letra | ✅ Solo si hay **2 titulares** | 🧍 Cliente (titular 2) |

> 🔑 **REGLA CLAVE — Prescriptor = Radicador de la ciudad:**
> El **Prescriptor** (tanto los datos de la Sección 1 como el Nombre + Cédula bajo la firma)
> **depende de la CIUDAD** elegida al inicio. Cada ciudad tiene un radicador asignado, y ese
> radicador es quien firma como Prescriptor. Sus datos (Nombre, Cédula, NIT, Ciudad) salen de
> la **tabla Ciudad → Radicador** (ver abajo).

### 🗺️ Datos que dependen de la CIUDAD (POR COMPLETAR con el usuario)
> Al elegir la ciudad al inicio, el sistema llena automáticamente TODO lo siguiente.
> Por cada ciudad se necesita:

**Por cada ciudad:**
- 🏙️ **Ciudad**
- 👤 **Prescriptor:** Nombre · Cédula · NIT · 📸 imagen de firma
- 👤 **Gestor/Analista:** Nombre · Cédula · 📸 imagen de firma
- 👤 **Coordinador:** Nombre

Ejemplo de cómo quedará (pendiente de llenar):

| Ciudad | Prescriptor | Gestor/Analista | Coordinador |
|--------|-------------|-----------------|-------------|
| _Bogotá_ | _nombre + cédula + NIT + firma_ | _nombre + cédula + firma_ | _nombre_ |
| _Medellín_ | _..._ | _..._ | _..._ |

> ❓ Falta confirmar si Prescriptor, Gestor/Analista y Coordinador son la **misma persona**
> o **personas distintas** para cada ciudad.
>
> 📸 Las imágenes de firma se guardarán en `codigo/datos/firmas/` y el sistema las coloca
> automáticamente sobre cada línea de firma.

> ⚠️ **Pendiente de confirmar con el usuario:** este formato suele llevar **campos de texto
> adicionales** que se agregan según la información solicitada al cliente. Falta listarlos.

---

## 2️⃣ FORMATO VINCULACIÓN PERSONA NATURAL (BBVA) — el formulario "grande"

### Encabezado
- Fecha de solicitud (Día/Mes/Año) · Sucursal
- Tipo de solicitud: ☑️ Vinculación inicial / Actualización de datos
- Tipo de vínculo: ☑️ Titular / Avalista / Apoderado / Firma Autorizada / Representante / Tutor

### 1. Productos a contratar (marcar los que apliquen)
☑️ Portafolio (especificar tipo) · Cuenta Corriente · Cuenta de Ahorros · CDT · Fondo de
Inversión · Crédito de Consumo · Crédito de Libranza · Crédito de Vehículo · Crédito de
Vivienda · Cupo Rotativo · Tarjeta de Crédito · Leasing · Seguro · Cuenta BBVA Valores ·
Fideicomisos

### 2. Datos personales (🧍 Cliente)
Nombres · Primer apellido · Segundo apellido · Género (H/M/Otro) · Fecha de nacimiento ·
Lugar de nacimiento (País/Departamento/Ciudad) · Tipo de identificación (CC/CE/TI/Pasaporte/
Otro) · Número de identificación · Grupo étnico · Estado civil · Nivel de estudios · Título
profesional · ¿Persona con discapacidad? · Correo electrónico · Dirección residencia (País/
Departamento/Ciudad/Estrato) · Antigüedad en la ciudad · Tipo de vivienda (propia sin
hipoteca/con hipoteca/familiar/arriendo/otro) · Valor de la vivienda propia · N° de personas
a cargo · ¿Dónde recibir correspondencia? · Medio para info comercial · Teléfonos
(residencia/oficina/celular) · Nacionalidades 1-4 · País obligación fiscal 1-4 · N°
identificación fiscal 1-4

### 3. Datos del cónyuge y/o compañero permanente (🧍)
Nombres · Primer apellido · Segundo apellido · Tipo y número de identificación

### 4. Datos del apoderado / representante (solo si aplica)
Nombres · Apellidos · Tipo y número de identificación

### 5. Actividad económica del solicitante (🧍 — conecta con las 7 actividades)
Situación laboral: ☑️ Asalariado indefinido / Asalariado temporal / Pensionado /
Independiente / Otro · Nombre de la empresa · Cargo/Ocupación/Oficio · Actividad económica
de la empresa · ¿Es socio? · Fecha de ingreso o inicio de actividad · PEP (varios campos) ·
¿Familiar de PEP? · ¿Asociado a PEP? · ¿Recursos de campaña política? · ¿Cuenta en país
extranjero? · Patrimonios autónomos/fiducias · (tabla de familiares PEP)

### 6. Información financiera (🧍)
Ingresos mensuales · Otros ingresos · Total ingresos · Canon arriendo/hipoteca · Total
egresos · Total activo · Total pasivo · Valor ventas anuales (independientes) · Procedencia
de recursos · ¿Declara renta?

### 7. Operaciones internacionales (🧍, si aplica)
¿Opera en moneda extranjera? · ¿Posee productos en moneda extranjera? · Entidad · N°
producto · País · Ciudad · Tipo de producto · Moneda · Monto · Tipo de operación

### 8. Referencias (🧍)
Familiares (que no vivan con usted): Nombres · Parentesco · Ciudad · Teléfonos ·
Personales/Comerciales: Nombres · Relación · Ciudad · Teléfonos

### 9. Créditos y/o Leasing (🧍, si solicita crédito) — ¡clave para hipotecario!
Monto solicitado · Plazo · Destino (Compra Vivienda / Leasing Habitacional / Remodelación /
Construcción Individual / Compra de Cartera / Libre Inversión / Cupo Rotativo / Compra
Vehículo / Leasing Vehículo) · ¿Recibe nómina por BBVA? · Plan amortización · Crédito
Hipotecario (Pesos/UVR) · Estado del inmueble · Tipo de inmueble a hipotecar (Casa/Apto/
Otro) · Dirección del inmueble · % compra Leasing Habitacional · Subproducto · Día de pago ·
Valor comercial · (Datos de vehículo si aplica)

### 10-14. Compra de cartera / Tarjeta de crédito / BBVA Valores / Fiduciaria / Seguros
(Se diligencian solo si el cliente solicita esos productos.)

### 15-16. Autorización tratamiento de datos + Canal de comunicación
Texto legal fijo + ☑️ canales por los que NO desea ser contactado.

### Firmas
Firma del Solicitante + Identificación · Firma del Representante/Apoderado + Identificación

### Espacio exclusivo del banco → LO LLENAMOS NOSOTROS con la tabla por director/ciudad
> ⚠️ **CORREGIDO (2026-08-01):** a pesar del título "espacio exclusivo del banco", esta
> sección **la diligenciamos nosotros** con los datos del **radicador** según la tabla
> Ciudad→Director→Analista/Coordinador (la misma de `radicadores_conocimiento_cliente.md`,
> más el **código** del analista que aplica solo a este formato). Gestión comercial ·
> Entrevista personal · Aprobación, etc. → origen 🏦 Banco/ciudad (automático).

---

## 3️⃣ FORMATO NÓMINA (volante BBVA) — muy sencillo · **EDITABLE**
> ⚙️ **Este formato es EDITABLE** → se llena directamente en su mismo formato (no por overlay).

| Campo | Qué va | Origen |
|-------|--------|--------|
| **Valor solicitado** | Valor del crédito solicitado | 🧍 Cliente/crédito |
| **Con Cuenta de Nómina BBVA ahorra hasta** | Valor del ahorro | 🏦 Cálculo/simulación |
| Recuadro debajo de "ahorra hasta" | **Plazo del crédito** + **Tasa CON nómina** | 🏦 Crédito |
| Recuadro debajo de "Sin cuenta de Nómina" | **Plazo del crédito** + **Tasa SIN nómina** | 🏦 Crédito |
| **¿Quieres contratar nómina?** (Sí / No / Ya cuento con la nómina) | Una **X** según elija el broker | 👤 Broker |
| **Nombre** | Nombre del **BROKER** | 👤 Broker |
| **Teléfono** | Teléfono del **BROKER** | 👤 Broker |
| **Correo** | Correo del **BROKER** | 👤 Broker |
| **Firma (Recibí información)** | A puño y letra | 🧍 Cliente |

> 🔑 **DATO CLAVE:** los recuadros llevan el **plazo del crédito** y **dos tasas** (CON y SIN
> cuenta de nómina). Estos datos vienen del **estudio/simulación del crédito**. El "ahorro"
> es la diferencia entre pagar con la tasa sin nómina vs. con nómina.
> ⚠️ IMPORTANTE: Nombre / Teléfono / Correo son del **BROKER**, NO del cliente.

---

## 🔁 Campos que se repiten entre los 3 formatos (se capturan UNA vez)
- Nombre del cliente
- Cédula del cliente
- Teléfono, Correo
- Ciudad
- Valor del crédito / inmueble
- Datos del inmueble (proyecto, constructora, dirección)
- Datos del broker/prescriptor

> Estos campos comunes son la base del **formulario único de captura**.

---

## ❓ Pendientes para el usuario
1. Confirmar los **campos de texto adicionales** del "Conocimiento de Cliente".
2. ¿Tiene el **Word original** del "Conocimiento de Cliente"?
3. Definir la **tabla ciudad → radicador** de BBVA.
4. Confirmar qué **productos/secciones** de la Vinculación se llenan siempre para hipotecario
   (para no pedir datos que no se usan).
