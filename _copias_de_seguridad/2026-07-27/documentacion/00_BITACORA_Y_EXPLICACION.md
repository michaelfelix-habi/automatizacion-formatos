# 📖 Bitácora y explicación del proyecto
## Automatización de diligenciamiento de formatos — Crédito Hipotecario

> Este documento se actualiza cada vez que avanzamos. Está escrito en lenguaje sencillo
> para que cualquier persona del negocio (no técnica) pueda entenderlo.

---

## 🎯 ¿Qué queremos lograr?

Automatizar el llenado de los formatos que se radican en los bancos para crédito
hipotecario, con dos objetivos:

1. **Optimizar la radicación** → llenar los formatos más rápido.
2. **Reducir las devoluciones** → menos errores humanos = menos formatos devueltos.

**La idea central:** el broker captura los datos del cliente **una sola vez**, el sistema
**valida** que estén completos y correctos, y **genera automáticamente** todos los
formatos del banco elegido, ya diligenciados y listos para firmar.

---

## 🧭 Cómo funciona el proceso del negocio (hoy)

1. El **broker/asesor** le pide los datos al cliente.
2. Se llenan los formatos del/los banco(s) elegido(s).
3. Algunos se **firman**.
4. Se **envían al banco** correspondiente (radicación).
5. No siempre se radican todos los bancos → se **eligen** uno o varios.

---

## 🔢 Orden del auto-llenado (definido con el usuario)

```
PASO 1  →  🏦 BANCO (uno o varios)
PASO 2  →  💼 ACTIVIDAD ECONÓMICA
   ⚙️  Con esos 2 datos el sistema sabe QUÉ formatos llenar.
PASO 3  →  🏙️ CIUDAD DE RADICACIÓN (importante para BBVA: define el radicador asignado)
PASO 4  →  👤 DATOS DEL CLIENTE (una sola vez, solo lo necesario)
PASO 5  →  ✅ GENERA los formatos diligenciados
```

> Nota BBVA: cada ciudad tiene un **radicador asignado**, por eso la ciudad se pide desde
> el inicio.

---

## 💼 Actividades económicas (7 confirmadas, puede crecer)

1. Empleados
2. Pensionados
3. Prestadores de servicios
4. Comerciantes
5. Transportadores
6. Rentistas de capital
7. No aportantes

---

## 🏦 Bancos y formatos

- Aproximadamente **7 bancos**.
- Formatos en **Word, PDF y Excel** (cada banco con su propio diseño).
- Por radicación: **mínimo 2** formatos, **máximo hasta 7**.
- Qué formatos se llenan depende de: **Banco + Actividad económica** (+ ciudad para datos
  del banco).

---

## 🗂️ De dónde sale cada dato

| Tipo de dato | Origen | Frecuencia |
|--------------|--------|------------|
| 🏢 Compañía (CSF) | Fijo, configurado una vez | Aparece en la mayoría de formatos |
| 👤 Broker/asesor | Del asesor que radica | Aparece en pocos formatos |
| 🏦 Banco (por ciudad) | Tabla ciudad → radicador | Según la ciudad de radicación |
| 👤 Cliente | Lo captura el broker cada vez | En cada radicación |

---

## 🧱 Estructura del proyecto (carpetas)

```
Automatizacion_diligenciamiento_formatos/
├── formatos/                        Formatos originales subidos por el usuario
├── _respaldo_formatos_originales/   Copia de seguridad (NUNCA se modifica)
├── documentacion/                   Este documento y análisis detallados
├── codigo/                          El programa que construimos
└── salidas_generadas/               Formatos ya diligenciados (resultado final)
```

---

## 🔧 Decisiones técnicas

- **Lenguaje:** Python (maneja Word, Excel y PDF).
- **Hay 2 tipos de formato en BBVA:**
  - **Editables** (Nómina y Vinculación) → se llenan **directamente en su mismo formato**
    (mejor calidad). Se generan en el mismo formato editable.
  - **Planos** (Conocimiento de Cliente) → se llenan **escribiendo texto encima** en
    coordenadas exactas (técnica de "overlay").
- Librerías previstas: `pypdf` / `reportlab` (PDF), `openpyxl` (Excel), `docxtpl` (Word).
- **Looker Studio** se usará después, solo para **monitorear** radicaciones y devoluciones
  (no para llenar formatos).

---

## 🛣️ Estrategia

1. **Piloto con BBVA** (banco elegido para empezar).
2. Montar el flujo completo: captura → validación → generación.
3. Validar con el negocio.
4. Replicar a los demás bancos.

---

## 📌 Estado actual y próximos pasos

- [x] Definir flujo, actividades económicas y lógica general.
- [x] Crear estructura de carpetas + respaldo.
- [x] Analizar los 3 formatos de BBVA (ver `BBVA_analisis_campos.md`).
- [ ] Conseguir el **Word original** del "Conocimiento de Cliente" (opcional, mejora calidad).
- [ ] Instalar **Python** para empezar la construcción. ⏳ PENDIENTE: requiere permisos de
  administrador (el usuario los gestionará). Se instalará con `winget install Python.Python.3.12`.
- [ ] Definir la lista final de campos del cliente.
- [ ] Construir el piloto de generación para BBVA.

---

## 🕘 Registro de avances (bitácora)

- **2026-07-27** — Arranque del proyecto. Definido el flujo, las 7 actividades económicas,
  la lógica banco+actividad+ciudad. Creada la estructura de carpetas y el respaldo.
  Analizados los 3 formatos de BBVA. Documentación inicial creada.
- **2026-07-27** — Mapeo detallado del "Conocimiento de Cliente" (BBVA):
  - Conclusiones de la visita → "Favorable" (fijo).
  - Sección 5: constructora y proyecto en blanco; solo "Ciudad de compra" se llena;
    los 4 campos de selección (financiado, rango, tipo, línea) son obligatorios (los marca el broker).
  - Sección 3 (validación SI/NO) → siempre SI (fijo).
  - Firmas: Cliente 1 y 2 a puño y letra; Prescriptor y Gestor/Analista automáticos según ciudad
    (firma + nombre + cédula). Coordinador también según ciudad.
  - Soporte para 1 o 2 titulares.
  - PENDIENTE (usuario dará antes del desarrollo): datos por ciudad (Prescriptor, Gestor,
    Coordinador: nombres, cédulas, NIT e imágenes de firma).
  - Analizado el formato de Nómina (campos listados). Nombre/teléfono/correo son del BROKER
    (no del cliente). Recuadros llevan plazo del crédito y tasas CON y SIN nómina (dato clave).
- **2026-07-27** — Investigación de opciones tecnológicas (ver `OPCIONES_TECNOLOGICAS.md`):
  - Nómina y Vinculación son PDF EDITABLES; Conocimiento de Cliente es plano.
  - AppSheet descartado (no rellena el PDF oficial, resultado "lossy" → riesgo devolución;
    además cobra por broker).
  - Looker Studio NO sirve como interfaz de captura (solo lectura); se reserva para el
    tablero de monitoreo interno.
  - **DECISIÓN TÉCNICA RECOMENDADA:** motor que rellena los PDF ORIGINALES (formato idéntico).
    Para el piloto: **Apps Script + pdf-lib** (gratis, en la nube, sin instalar Python ni
    permisos de admin, link para externos). Largo plazo: posible migración a app web Python.
  - La herramienta para brokers será una **app web con link**, NO Looker Studio.
  - ✅ **DECISIÓN CONFIRMADA POR EL USUARIO: se arranca el piloto BBVA con Apps Script.**
  - Próximos pasos al retomar: (1) mapear la Vinculación, (2) definir el formulario de captura,
    (3) construir interfaz + llenado en Apps Script. Requisito: una cuenta de Google (puede ser
    gratuita @gmail.com, sin permisos de admin).
