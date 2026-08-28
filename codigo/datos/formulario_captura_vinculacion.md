# 📝 Formulario de captura — Vinculación (lo que el broker SÍ escribe/selecciona)

> Cada fila = una casilla que verá el broker en NUESTRA herramienta. El valor se traslada
> automáticamente a la casilla del PDF indicada en "Campo PDF".
> Los campos 🟢 fijos, 🏦 radicador y ⬜ en blanco NO aparecen aquí (se llenan solos).
> Fuente de confirmación: revisión con el usuario sobre el PDF diagnóstico (2026-08-03).

## Sección 2 — Datos personales del cliente

> ⚠️ **Se re-verifica TODO leyendo el PDF visual** (`VINCULACION_nombres_de_campos.pdf`),
> porque las hipótesis por coordenada resultaron poco fiables (ej.: `Texto7`/`Texto8` NO eran
> los apellidos como se supuso, sino País/Departamento del lugar de nacimiento).

### ✅ Confirmado con el visual (2026-08-03)
| Campo PDF | Casilla / dato | Tipo |
|-----------|----------------|------|
| `Texto4` | Nombres | Escritura |
| `Texto5` | Primer apellido | Escritura |
| `Texto6` | Segundo apellido | Escritura (opcional) |
| `genero` | Género — Hombre / Mujer / Otro | Selección |
| `Día_2` / `Mes_2` / `Año_2` | Fecha de nacimiento (Día / Mes / Año) | Escritura |
| `Texto7` | Lugar de nacimiento — **País** | Escritura |
| `Texto8` | Lugar de nacimiento — **Departamento** | Escritura |
| `Texto9` | Lugar de nacimiento — **Ciudad** | Escritura |
| `tipo` | Tipo de identificación — CC / CE / TI / Pasaporte / Otro | Selección |
| `Texto10` | ¿Cuál? (solo si tipo id = **Otro**) | Escritura (condicional) |
| `Texto11` | Número de identificación | Escritura (números) |
| `grupo` | Grupo étnico (7 opciones) | Selección (desplegable) |
| `estado civil` | Estado civil — Soltero/Casado/Viudo/Divorciado/Separado/Unión Libre | Selección |
| `nivel estudios` | Nivel de estudios (6 opciones) | Selección |
| `tipo vivienda` | Tipo de vivienda (5 opciones) | Selección |
| `Cuál_2` | ¿Cuál? (solo si tipo vivienda = **Otro**) | Escritura (condicional) |
| `economica` | Situación laboral (5 opciones) | Selección |
| `Cuál_5` | ¿Cuál? (solo si situación laboral = **Otro**) | Escritura (condicional) |
| `pc` | ¿Persona con discapacidad (PcD)? — No / Sí | Selección |
| `Cuál` | ¿Cuál? PcD (solo si PcD = **Sí**) | Escritura (condicional) |
| `Texto13` | Título profesional | Escritura |
| `Texto14` | Correo electrónico | Escritura |
| `Texto15` | Dirección de residencia | Escritura |
| `Texto16` | Residencia — País | Escritura |
| `Texto17` | Residencia — Departamento | Escritura |
| `Texto18` | Residencia — Ciudad | Escritura |
| `Texto19` | Residencia — Estrato | Escritura |
| `Texto20` | N° de personas a cargo (0 si no tiene) | Escritura |
| `Texto21` | Antigüedad en la ciudad | Escritura |
| `Texto22` | Valor de la vivienda propia (🔀 solo si tipo vivienda = propia con/sin hipoteca) | Escritura (condicional) |
| `Texto25` | Teléfono celular | Escritura |
| `Texto26` | Nacionalidad 1 | Escritura |

### Sección 3 — Cónyuge (🔀 CONDICIONAL)
> ⚠️ **REGLA:** toda esta sección **solo se habilita/llena si el broker selecciona estado civil
> = Casado o Unión Libre**. En cualquier otro estado civil → TODA la sección va en blanco.

| Campo PDF | Casilla / dato | Tipo |
|-----------|----------------|------|
| `Texto38` | Cónyuge — Nombres | Escritura |
| `Texto39` | Cónyuge — Primer apellido | Escritura |
| `Texto40` | Cónyuge — Segundo apellido | Escritura |
| `identificacion` | Cónyuge — Tipo de documento (CC/CE/TI/Pasaporte/Otro, igual que el titular) | Selección |
| `Cuál_4` | ¿Cuál? (solo si tipo de doc = **Otro**) | Escritura (condicional) |
| `Texto41` | Cónyuge — Número de identificación (cédula) | Escritura |

### ✅ Sección 2 (Datos personales) CERRADA
- `Texto60`, `Texto61`, `Texto62` → ⬜ van en blanco (no se diligencian).

### Sección 5 — Actividad económica del solicitante

| Campo PDF | Casilla / dato | Tipo |
|-----------|----------------|------|
| `economica` | Situación laboral (5 opciones) | Selección |
| `Cuál_5` | ¿Cuál? (si situación laboral = Otro) | Escritura (condicional) |
| `Texto48` | Nombre de la empresa | Escritura |
| `Texto49` | Cargo / Ocupación / Oficio | Escritura |
| `Texto52` | Actividad económica de la empresa | Escritura |
| `empresa` | ¿Es socio de la empresa donde trabaja? — Sí / No | Selección |
| `dia3` / `mes3` / `Año_3` | Fecha de ingreso o inicio de actividad | Escritura |

**Preguntas PEP (normalmente "No"; el broker las selecciona):**

| Campo PDF | Pregunta | Tipo |
|-----------|----------|------|
| `pep` | ¿Persona Políticamente Expuesta (PEP)? — Sí / No | Selección |
| casilla Nacional/Extranjera + `Texto53` | 🔀 Solo si PEP = **Sí**: nacional/extranjera + detalle | Selección + Escritura (condicional) |
| Fecha **vinculación** al cargo (`dia5`/`mes4`/`Año_4` — confirmar) | 🔀 Solo si PEP = Sí; si no, en blanco | Escritura (condicional) |
| Fecha **desvinculación** al cargo (`mes5`/`Año_5` — confirmar) | 🔀 Solo si PEP = Sí; si no, en blanco | Escritura (condicional) |
| `Sí_2` | ¿Asociado a un PEP? — Sí / No | Selección |
| `familiar` | ¿Es usted familiar de una PEP? — Sí / No | Selección |
| `Nacional` | ¿Los recursos corresponden a campaña política? — Sí / No | Selección |
| `cuentas` | ¿Tiene una cuenta financiera en algún país extranjero? — Sí / No | Selección |
| `Texto58` / `Texto59` / `Texto60` | 🔀 Detalle cuenta extranjera — solo si `cuentas` = **Sí**; si no, en blanco | Escritura (condicional) |

> Nota: `Texto60` aparece aquí como detalle de cuenta extranjera; como esa respuesta normalmente
> es "No", queda en blanco (coherente con lo dicho en la sección 2).

---

## Sección 6 — Información financiera

> ✅ Confirmado con el usuario (2026-08-10)

| Campo PDF | Casilla / dato | Tipo | Regla/notas |
|-----------|----------------|------|-------------|
| `undefined_4` | Ingresos mensuales (salario / pensión / prestación de servicios) | Escritura numérica | Especificar en el formulario que incluye salario, pensión y prestación de servicios |
| `undefined_5` | Otros ingresos (arriendos / actividad independiente / otra fuente) | Escritura numérica | Especificar en el formulario que incluye arriendos y otras actividades |
| `undefined_6` | Total ingresos mensuales | Escritura numérica | = suma de `undefined_4` + `undefined_5`; se puede calcular automáticamente en nuestra herramienta |
| `undefined_7` | Canon de arriendo / cuota hipotecaria vigente | Escritura numérica (🔀 condicional) | **Solo si** tipo de vivienda = Arriendo **o** tiene crédito hipotecario vigente; en cualquier otro caso → **0** |
| `undefined_8` | Total egresos mensuales | Escritura numérica | Sumatoria de todos los egresos |
| `undefined_9` | Total pasivos | Escritura numérica | Total de obligaciones/deudas del cliente |
| `Valor de sus bienes` | Total activos (valor de sus bienes) | Escritura numérica | Valor total de los bienes del cliente |
| `Texto63` | Valor ventas anuales | Escritura numérica (🔀 condicional) | **Solo si** situación laboral = Independiente **o** Propietario de establecimiento; si no → en blanco |
| `Texto64` | ¿A qué corresponden los otros ingresos? | Escritura | Descripción libre de la fuente de otros ingresos |
| `Texto65` | Procedencia de recursos adicionales | Escritura | Describe de dónde provienen los recursos adicionales que relaciona |
| `declara` | ¿Declara renta? — Sí / No | Selección | El broker selecciona según corresponda al cliente |

---

## Sección 7 — Operaciones internacionales

> ✅ Confirmado con el usuario (2026-08-10)
> Si el broker responde **No** en ambas preguntas → campos de detalle en blanco.
> Si responde **Sí** en alguna → `Texto69`–`Texto75` se abren para que el broker los diligencie.

| Campo PDF | Casilla / dato | Tipo | Regla/notas |
|-----------|----------------|------|-------------|
| `moneda` | ¿Realiza operaciones en moneda extranjera? — Sí / No | Selección | Broker selecciona; usualmente No |
| `posee` | ¿Posee productos en moneda extranjera? — Sí / No | Selección | Broker selecciona; usualmente No |
| `Texto69`–`Texto75` | Detalle de operaciones / productos en moneda extranjera | Escritura (🔀 condicional) | **Solo si** `moneda` o `posee` = **Sí**; si No → **en blanco** |

---

## Sección 8 — Referencias

> ✅ Confirmado con el usuario (2026-08-10)
> **Todas las referencias son obligatorias** (el broker siempre las diligencia).
> 2 referencias familiares + 2 referencias personales/comerciales.

### Referencias familiares (que no convivan con el solicitante)

| Campo PDF | Casilla / dato | Tipo |
|-----------|----------------|------|
| `Nombres y apellidos` | Familiar ref. 1 — Nombres y apellidos | Escritura |
| `Parentesco` | Familiar ref. 1 — Parentesco | Escritura |
| `Ciudad` | Familiar ref. 1 — Ciudad | Escritura |
| `Teléfonos de contacto` | Familiar ref. 1 — Teléfono de contacto | Escritura |
| `Nombres y apellidos1` | Familiar ref. 2 — Nombres y apellidos | Escritura |
| `Parentesco1` | Familiar ref. 2 — Parentesco | Escritura |
| `Ciudad1` | Familiar ref. 2 — Ciudad | Escritura |
| `Teléfonos de contacto1` | Familiar ref. 2 — Teléfono de contacto | Escritura |

### Referencias personales / comerciales

| Campo PDF | Casilla / dato | Tipo |
|-----------|----------------|------|
| `Nombres y apellidos_2` | Personal ref. 1 — Nombres y apellidos | Escritura |
| `Relación` | Personal ref. 1 — Relación | Escritura |
| `Ciudad_2` | Personal ref. 1 — Ciudad | Escritura |
| `Teléfonos de contacto_2` | Personal ref. 1 — Teléfono de contacto | Escritura |
| `Nombres y apellidos_3` | Personal ref. 2 — Nombres y apellidos | Escritura |
| `Relación3` | Personal ref. 2 — Relación | Escritura |
| `Ciudad_3` | Personal ref. 2 — Ciudad | Escritura |
| `Teléfonos de contacto_3` | Personal ref. 2 — Teléfono de contacto | Escritura |

> ✅ Sección 8 CERRADA — las 4 referencias (2 familiares + 2 personales) son obligatorias.

---

## Sección 9 — Créditos y/o Leasing (el crédito solicitado)

> ✅ Confirmado con el usuario (2026-08-10)

| Campo PDF | Casilla / dato | Tipo | Regla/notas |
|-----------|----------------|------|-------------|
| `Texto76` | Monto del crédito solicitado | Escritura numérica | |
| `Texto77` | Plazo en meses | Escritura | |
| `destino` | Destino del crédito | Selección (desplegable) | 4 opciones exactas — ver `opciones_seleccion_vinculacion.md` |
| `bbva` | ¿Recibe el pago de nómina a través de BBVA? — Sí / No | Selección | Broker selecciona |
| `Pesos` | Crédito hipotecario en **Pesos** o **UVR** | Selección | Broker selecciona |
| `Nuevo` (estado inmueble) | Estado del inmueble — **Nuevo** / **Usado** | Selección | Broker selecciona |
| `Casa` (tipo inmueble) | Tipo de inmueble — **Casa** / **Apartamento** | Selección | Solo esas dos opciones |
| `Texto82` | Dirección del inmueble | Escritura | Campo abierto |
| `Texto83` | Valor del inmueble | Escritura | Campo abierto |
| % opción de compra | % de opción de compra | Escritura numérica (🔀 condicional) | **Solo si** línea = Leasing; si no → en blanco |
| `Texto3` | Subproducto | Escritura numérica (obligatorio) | El broker lo escribe |
| `Texto12` | Día de pago | Escritura numérica | |
| `Habitacional` | % de opción de compra (Leasing habitacional) | Escritura numérica (🔀 condicional) | **Solo si** `destino` = **Leasing habitacional** |

> ✅ Sección 9 CERRADA.

---

## Sección 10 — Compra de cartera

> ✅ Confirmado con el usuario (2026-08-10)
> **CONDICIONAL:** esta sección se diligencia **solo si** `destino` = **Compra de cartera**.
> Si `destino` = Compra de vivienda, Leasing habitacional, Construcción o Remodelación → **toda la sección va en blanco**.
> Solo se llena la **fila 1** (Row1). Las filas 2, 3 y 4 siempre van en blanco.

| Campo PDF | Casilla / dato | Tipo | Regla/notas |
|-----------|----------------|------|-------------|
| `Entidad financieraRow1` | Nombre de la entidad a la que se le compra la cartera | Escritura | Solo fila 1 |
| `HipotecarioRow1` | Hipotecario (crédito que se va a comprar) | Escritura | Solo fila 1 |
| `tarjetaRow1` | Número del crédito a comprar | Escritura | Solo fila 1 |
| `ValorRow1` | Valor de la deuda actual en el otro banco | Escritura numérica | Solo fila 1 |
| `PlazoValor` | Plazo actual de la deuda | Escritura | Solo fila 1 |

> ✅ Sección 10 CERRADA.

### Campos siempre en blanco en sección 9
- `Texto78`–`Texto81`: Crédito/Leasing de vehículo — no aplica para esta línea → **⬜ siempre en blanco**

---

## Campos del ENCABEZADO e inicio (ya clasificados como fijos/selección — no son de captura)
| Campo PDF | Qué es | Origen |
|-----------|--------|--------|
| `Día` `Mes` `Año` | Fecha de solicitud | 🟢 fecha del día |
| `Texto1` | Sucursal | 🟢 fijo "FVE" |
| `Vinculación inicial` | Tipo de solicitud | 🟢 fijo "Vinculación inicial" |
| `tipo de vinculo` | Tipo de vínculo | 🔽 Titular / Avalista |
| `genero` | Género | ☑️ selección cliente |
| `tipo` | Tipo de identificación (grupo) | ☑️ selección cliente |
| `estado civil` | Estado civil | ☑️ selección cliente |
| `nivel estudios` | Nivel de estudios | ☑️ selección cliente |
| `pc` | ¿Persona con discapacidad? | ☑️ selección cliente |
| `tipo vivienda` | Tipo de vivienda | ☑️ selección cliente |
| `correspondencia` | ¿Dónde recibir correspondencia? | 🟢 Correo electrónico |
| `banco` | Medio info comercial | 🟢 Correo electrónico |
