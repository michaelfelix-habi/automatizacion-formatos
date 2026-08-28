# 🏦 BBVA · Mapa técnico-funcional completo — Formato "Vinculación Persona Natural"

> Documento generado por ingeniería a partir del **PDF editable (AcroForm)**
> `formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf`.
> Es el **mapa completo de los 397 campos** del formulario: nombre técnico interno (`/T`),
> tipo, significado humano (deducido del `/TU` o cruzando coordenadas con el texto visible
> de cada página) y el **origen sugerido** de cada dato para la automatización.

## ⚠️ Dos hallazgos importantes (leer antes de usar el mapa)

1. **El orden de páginas por número de objeto NO coincide con el orden visual.**
   El árbol de páginas del PDF (`392 0 <</Count 3/Kids[396 0 R 1 0 R 4 0 R]/Type/Pages>>`)
   define el orden real. Por tanto:

   | Página VISUAL | Objeto PDF | Contenido | # widgets |
   |---------------|-----------|-----------|-----------|
   | **Página 1** | **obj 396** | Encabezado · 1 Productos · 2 Datos personales · 3 Cónyuge · 4 Apoderado · 5 Actividad económica/PEP · tabla familiares PEP | 219 |
   | **Página 2** | **obj 1** | 6 Información financiera · 7 Operaciones internacionales · 8 Referencias · 9 Créditos/Leasing · 10 Compra de cartera · 11 Tarjeta · 12 BBVA Valores · 13 Fiduciaria · 14 Seguros | 118 |
   | **Página 3** | **obj 4** | 15 Autorización tratamiento de datos · 16 Canal de comunicación · Firmas · **Espacio exclusivo BBVA** | 27 |

   > Es decir, el objeto **396** (que por orden numérico ascendente parecía la "página 3")
   > es en realidad la **página 1 visual**. El inventario previo (`inventory.tsv`) numeró las
   > páginas por orden ascendente de objeto (1→pág1, 4→pág2, 396→pág3); **eso está invertido**
   > respecto a lo visual y aquí queda corregido.

2. **La página 1 (obj 396) tiene sus campos DUPLICADOS.**
   El PDF trae dos juegos de anotaciones para la página 1 (dos revisiones/versiones con
   coordenadas ligeramente distintas). De los **219 widgets** de obj 396 solo hay **112 nombres
   de campo únicos**: **107 son duplicados exactos** (mismo `/T`, otra posición). Reconciliación:

   - Campos únicos reales del formulario ≈ **290** (112 obj396 + 118 obj1 + 27 obj4 + 33 grupos de selección).
   - Total de **widgets** contabilizados = **397** (= 290 + 107 duplicados de la página 1).

   Las tablas de abajo listan **cada campo único una sola vez** (para que el mapa sea usable);
   el bloque final "Chequeo de cobertura" reconcilia el 397 exacto.

## Leyenda de origen

| Símbolo | Significado |
|---------|-------------|
| 🧍 | **Cliente** — lo aporta el cliente |
| 👤 | **Broker** — lo aporta/decide el asesor |
| 🟢 | **Fijo / por defecto** — valor constante que ponemos siempre |
| ☑️ | **Marcar opción** (casilla/radio) |
| 🔽 | **Selección** de una lista corta |
| 🔀 | **Condicional** — solo si aplica cierta condición |
| ⬜ | **En blanco** — no se diligencia |
| 🏦 | **Banco/ciudad (radicador)** — lo llenamos **nosotros** con la tabla Ciudad→Director→Analista/Coordinador |
| ❓ | **Por confirmar** — identidad del campo no confirmada por coordenadas |

> Reglas fijas ya confirmadas por el usuario (fuente: `codigo/datos/valores_fijos_vinculacion.md`)
> están aplicadas en la columna "Origen sugerido".

---

# 📄 PÁGINA 1 (obj 396) — Encabezado + Datos del cliente

> Recordatorio: cada campo de esta página existe **por duplicado** en el PDF (dos revisiones).
> Se lista una sola vez por su nombre `/T`.

## Encabezado

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Día` | Tx | Fecha de solicitud — Día | 🟢 fecha del día |
| `Mes` | Tx | Fecha de solicitud — Mes | 🟢 fecha del día |
| `Año` | Tx | Fecha de solicitud — Año | 🟢 fecha del día |
| `Texto1` | Tx | Sucursal | 🟢 fijo = **"FVE"** |
| `Vinculación inicial` | Btn | Tipo de solicitud: Vinculación inicial / Actualización de datos | ☑️ 🟢 Vinculación inicial |
| `tipo de vinculo` | Btn | Tipo de vínculo: Titular/Avalista/Apoderado/Firma Aut./Representante/Tutor | 🔽 Titular / Avalista |
| `undefined_4` | Tx | ❓ campo de texto suelto en encabezado (Y≈612) | ❓ |

## 1. Productos a contratar (casillas)

> Se marca **Crédito de Vivienda** (Hipotecario) **o** **Leasing** (Leasing) según el desplegable
> "Tipo de operación". El resto normalmente en blanco.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Check Box1` | Btn | Portafolio (casilla) | ☑️ 👤 |
| `Texto2` | Tx | Especifique el tipo de portafolio | 🔀 👤 |
| `Cuanta Corriente` | Btn | Cuenta Corriente | ☑️ 👤 |
| `Cuenta de Ahorros` | Btn | Cuenta de Ahorros | ☑️ 👤 |
| `undefined` | Btn | CDT (casilla, sin `/T` descriptivo) ❓ | ☑️ 👤 ❓ |
| `Fondo de Inversión` | Btn | Fondo de Inversión | ☑️ 👤 |
| `Cuenta BBVA Valores` | Btn | Cuenta BBVA Valores | ☑️ 👤 |
| `Fideicomisos` | Btn | Fideicomisos | ☑️ 👤 |
| `Crédito de Consumo` | Btn | Crédito de Consumo | ☑️ 👤 |
| `Crédito de Libranza` | Btn | Crédito de Libranza | ☑️ 👤 |
| `Crédito de Vehículo` | Btn | Crédito de Vehículo | ☑️ 👤 |
| `Crédito de Vivienda` | Btn | Crédito de Vivienda (**Hipotecario**) | ☑️ según Tipo de operación |
| `Cupo Rotativo` | Btn | Cupo Rotativo | ☑️ 👤 |
| `Tarjeta de Crédito` | Btn | Tarjeta de Crédito | ☑️ 👤 |
| `seguros` | Btn | Seguro | ☑️ 👤 |
| `Texto4` / `fideicomisis` | Btn | Leasing (casilla) ❓ | ☑️ según Tipo de operación ❓ |
| `Texto5` | Btn | ❓ casilla producto sin etiqueta (col. derecha) | ☑️ ❓ |

## 2. Datos personales

> Sección del **cliente** (🧍). Las opciones (género, grupo étnico, estado civil, nivel de
> estudios, tipo de vivienda, PcD, tipo de identificación) son **grupos de selección** cuyos
> parents están en la sección "Grupos de selección" al final (sin página propia).
> Varios campos de texto llevan nombre genérico `TextoNN`; su significado se dedujo por banda de
> coordenada Y y columna X contra el texto visible. Los marcados ❓ no pudieron confirmarse.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Texto6` | Tx | Nombres | 🧍 |
| `Texto7` | Tx | Primer apellido (banda nombres, col. der.) ❓ | 🧍 ❓ |
| `Texto8` | Tx | Segundo apellido (banda nombres, col. der.) ❓ | 🧍 ❓ |
| `Día_2` | Tx | Fecha de nacimiento — Día | 🧍 |
| `Mes_2` | Tx | Fecha de nacimiento — Mes | 🧍 |
| `Año_2` | Tx | Fecha de nacimiento — Año | 🧍 |
| `Texto9` | Tx | Lugar de nacimiento (País/Ciudad) | 🧍 |
| `Texto10` | Tx | Tipo/Número de identificación (área) ❓ | 🧍 ❓ |
| `Texto11` | Tx | Número de identificación ❓ | 🧍 ❓ |
| `Texto14` | Tx | Datos personales — texto (Y≈511) ❓ | 🧍 ❓ |
| `Texto15` | Tx | Datos personales — texto (Y≈511) ❓ | 🧍 ❓ |
| `Texto13` | Tx | ¿Cuál? (grupo étnico / otro) | 🧍 |
| `Cuál` | Tx | ¿Cuál? (grupo étnico / otro) | 🧍 |
| `Texto20` | Tx | Datos personales — texto (Y≈482) ❓ | 🧍 ❓ |
| `Texto21` | Tx | Datos personales — texto (Y≈482) ❓ | 🧍 ❓ |
| `Texto16` | Tx | Dirección de residencia (País) | 🧍 |
| `Texto17` | Tx | Dirección de residencia (Departamento/Ciudad) | 🧍 |
| `Texto18` | Tx | Dirección de residencia (Ciudad) | 🧍 |
| `Texto19` | Tx | Dirección de residencia (Estrato) | 🧍 |
| `Texto60` | Tx | Correo electrónico / dirección (col. der.) ❓ | 🧍 ❓ |
| `Texto61` | Tx | Número de personas a cargo ❓ | 🧍 ❓ |
| `Cuál_2` | Tx | ¿Cuál? (tipo de vivienda "Otro") | 🧍 |
| `Texto22` | Tx | Antigüedad en la ciudad / vivienda ❓ | 🧍 ❓ |
| `Texto23` | Tx | Valor de la vivienda propia ($) ❓ | 🧍 ❓ |
| `Texto24` | Tx | Valor de la vivienda propia ($) ❓ | 🧍 ❓ |
| `Texto25` | Tx | Teléfono residencia ❓ | 🧍 ❓ |
| `Texto26` | Tx | Teléfono / dato de contacto ❓ | 🧍 ❓ |
| `Texto27` | Tx | Correo electrónico ❓ | 🧍 ❓ |
| `Texto28` | Tx | Contacto ❓ | 🧍 ❓ |
| `Texto29` | Tx | Contacto ❓ | 🧍 ❓ |
| `Texto30` | Tx | Contacto ❓ | 🧍 ❓ |
| `Texto31` | Tx | Contacto ❓ | 🧍 ❓ |
| `Texto32` | Tx | Nacionalidad 1 | 🧍 |
| `Texto33` | Tx | Nacionalidad 2 | 🧍 |
| `Texto34` | Tx | Nacionalidad 3 | 🧍 |
| `Texto35` | Tx | Nacionalidad 4 | 🧍 |
| `Texto36` | Tx | País de obligación fiscal 1 | 🟢 Colombia |
| `Texto37` | Tx | País de obligación fiscal 2 | ⬜ blanco |
| `Texto38` | Tx | País de obligación fiscal 3 | ⬜ blanco |
| `Texto39` | Tx | País de obligación fiscal 4 | ⬜ blanco |
| `Texto40` | Tx | Número de identificación fiscal 1 | 🧍 cédula del cliente |
| `Texto41` | Tx | Número de identificación fiscal 2 | ⬜ blanco |
| `Texto42` | Tx | Número de identificación fiscal 3 | ⬜ blanco |
| `Texto43` | Tx | Número de identificación fiscal 4 | ⬜ blanco |
| `Cuál_3` | Tx | ¿Cuál? (dato personal) ❓ | 🧍 ❓ |
| `Texto62` | Tx | Título profesional / dato personal (Y≈137) ❓ | 🧍 ❓ |

## 3. Datos del cónyuge y/o compañero permanente

> 🔀 **Condicional**: solo se diligencia si el estado civil = **casado** o **unión libre**.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Texto44` | Tx | Cónyuge — Nombres | 🔀 🧍 |
| `Texto45` | Tx | Cónyuge — Primer/Segundo apellido ❓ | 🔀 🧍 ❓ |
| `Cuál_4` | Tx | Cónyuge — Tipo de identificación "¿Cuál?" | 🔀 🧍 |
| `identificacion` | Btn | Cónyuge — Tipo de identificación (CC/CE/TI/Pasaporte) | 🔀 ☑️ |
| `Texto48` | Tx | Cónyuge — Número de identificación ❓ | 🔀 🧍 ❓ |
| `Texto49` | Tx | Cónyuge — apellido/nombre ❓ | 🔀 🧍 ❓ |
| `Cuál_5` | Tx | Cónyuge/Apoderado — "¿Cuál?" ❓ | 🔀 🧍 ❓ |

## 4. Datos del apoderado / representante

> ⬜ **En blanco** por defecto (solo si el cliente requiere apoderado).

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Texto52` | Tx | Apoderado — Nombres ❓ | ⬜ blanco |
| `Texto53` | Tx | Apoderado — apellidos ❓ | ⬜ blanco |
| `dia4` | Tx | Apoderado — dato (col. der.) ❓ | ⬜ blanco |
| `identificacion3` | Btn | Apoderado — Tipo de identificación (CC/CE/TI/Pasaporte) | ⬜ blanco |
| `Texto58` | Tx | Apoderado — Número de identificación ❓ | ⬜ blanco |
| `Texto59` | Tx | Apoderado — Número de identificación ❓ | ⬜ blanco |

## 5. Actividad económica del solicitante + PEP

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `economica` | Btn | Situación laboral (Asalariado indefinido/temporal/Pensionado/Independiente/Otro) | 🔽 🧍 |
| `empresa` | Btn | ¿Es socio de la empresa donde trabaja? (Sí/No) | ☑️ 🧍 |
| `pe` | Btn | Situación laboral — opción "Otro" ❓ | ☑️ 🧍 ❓ |
| `pep` | Btn | ¿Persona Políticamente Expuesta (PEP)? (Sí/No) | ☑️ 🧍 (normalmente No) |
| `familiar` | Btn | ¿Es usted familiar de un PEP? (Sí/No) | ☑️ 🧍 (normalmente No) |
| `Sí_2` | Btn | ¿Asociado a un PEP? (Sí/No) | ☑️ 🧍 (normalmente No) |
| `Nacional` | Btn | ¿Recursos de campaña política? / Nacional-Extranjera ❓ | ☑️ 🧍 ❓ |
| `cuentas` | Btn | ¿Tiene una cuenta financiera en algún país extranjero? (Sí/No) | ☑️ 🧍 (normalmente No) |
| `dia3` | Tx | Fecha de ingreso o inicio de actividad — Día | 🧍 |
| `mes3` | Tx | Fecha de ingreso o inicio de actividad — Mes | 🧍 |
| `A�o_3` (`Año_3`) | Tx | Fecha de ingreso o inicio de actividad — Año | 🧍 |
| `mes4` | Tx | Fecha vinculación al cargo (si PEP) — Mes | 🔀 🧍 |
| `dia5` | Tx | Fecha vinculación al cargo (si PEP) — Día | 🔀 🧍 |
| `A�o_4` (`Año_4`) | Tx | Fecha vinculación al cargo (si PEP) — Año | 🔀 🧍 |
| `mes5` | Tx | Fecha desvinculación al cargo (si PEP) — Mes | 🔀 🧍 |
| `A�o_5` (`Año_5`) | Tx | Fecha desvinculación al cargo (si PEP) — Año | 🔀 🧍 |

### 5.b Patrimonios autónomos / fiducias (parte inferior sección 5)

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `tiene` | Btn | ¿Tiene constituidos patrimonios autónomos o fiducias? (Sí/No) | ☑️ 🟢 **NO** |
| `FIDUCIA` | Btn | Fiducia — casilla asociada ❓ | ☑️ 🟢 NO ❓ |

## Tabla de familiares PEP (parte inferior de la página 1)

> 🔀 **Condicional**: solo si el cliente es PEP o asociado a PEP. Por defecto **en blanco**.
> Son 6 filas × 4 columnas (Tipo de identificación · Número de identificación · Nombres y
> apellidos · Tipo de relación/parentesco).

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Tipo de identificación CC TI CE PASAPORTE OTRORow1..6` | Tx | Familiar PEP fila 1..6 — Tipo de identificación | 🔀 ⬜ |
| `Número de IdentificaciónRow1..6` | Tx | Familiar PEP fila 1..6 — Número de identificación | 🔀 ⬜ |
| `Nombres y apellidosRow1..6` | Tx | Familiar PEP fila 1..6 — Nombres y apellidos | 🔀 ⬜ |
| `Tipo de relaciónparentescoRow1..6` | Tx | Familiar PEP fila 1..6 — Tipo de relación/parentesco | 🔀 ⬜ |

> (Son 24 campos: 4 columnas × 6 filas. Todos con `/TU` descriptivo, etiqueta clara.)

---

# 📄 PÁGINA 2 (obj 1) — Financiera, referencias y créditos

## 6. Información financiera

> 🧍 Cliente. Los campos de esta franja tienen `/T` genérico (`undefined_N`); el significado se
> infiere por posición contra las etiquetas visibles (Ingresos, Otros ingresos, Total ingresos,
> Canon arriendo/hipoteca, Total egresos, Total activo, Total pasivo, Valor ventas anuales).

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `undefined_5` | Tx | Ingresos mensuales (salario/pensión) ❓ | 🧍 ❓ |
| `undefined_6` | Tx | Otros ingresos (arriendos/utilidades) ❓ | 🧍 ❓ |
| `undefined_8` | Tx | Total ingresos mensuales ❓ | 🧍 ❓ |
| `undefined_9` | Tx | Canon de arriendo y/o hipoteca ❓ | 🧍 ❓ |
| `Valor de sus bienes` | Tx | Total activo (valor de sus bienes) | 🧍 |
| `undefined_7` | Tx | Total pasivo ❓ | 🧍 ❓ |
| `verbal` | Tx | Indique a qué corresponden los otros ingresos ❓ | 🧍 ❓ |
| `Texto101` | Tx | Procedencia de los recursos que relaciona ❓ | 🧍 ❓ |
| `declara` | Btn | ¿Declara renta? (Sí/No) | ☑️ 🧍 |
| `Texto90` | Tx | Valor ventas anuales $ (independientes) ❓ | 🧍 ❓ |
| `Texto91` | Tx | Valor ventas anuales / dato financiero ❓ | 🧍 ❓ |
| `Texto98` | Tx | Dato financiero ❓ | 🧍 ❓ |
| `Texto99` | Tx | Dato financiero ❓ | 🧍 ❓ |
| `Texto100` | Tx | Dato financiero ❓ | 🧍 ❓ |

## 7. Operaciones internacionales

> ☑️ **Regla fija: se marca NO.** Los campos de detalle quedan **en blanco**.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `moneda` | Btn | ¿Realiza operaciones en moneda extranjera? (Sí/No) | ☑️ 🟢 **NO** |
| `posee` | Btn | ¿Posee productos en moneda extranjera? (Sí/No) | ☑️ 🟢 **NO** |
| `Indique cuales Importaciones` | Btn | Indique cuál(es): Importaciones | ⬜ blanco |
| `Exportaciones` | Btn | Indique cuál(es): Exportaciones | ⬜ blanco |
| `Inversiones` | Btn | Indique cuál(es): Inversiones | ⬜ blanco |
| `Pagos de servicios` | Btn | Indique cuál(es): Pagos de servicios | ⬜ blanco |
| `Préstamos` | Btn | Indique cuál(es): Préstamos | ⬜ blanco |
| `otrass` | Btn | Indique cuál(es): Otras | ⬜ blanco |
| `Texto3` | Tx | Op. internacionales — Entidad ❓ | ⬜ blanco |
| `Texto12` | Tx | Op. internacionales — N° de producto/contrato | ⬜ blanco |
| `Ciudad` | Tx | Op. internacionales — Ciudad | ⬜ blanco |
| `Pa�s` (`País`) | Tx | Op. internacionales — País | ⬜ blanco |
| `Moneda_2` | Tx | Op. internacionales — Moneda | ⬜ blanco |
| `Texto1191` | Tx | Op. internacionales — Monto (No. de cuenta) | ⬜ blanco |
| `Tipo de producto cuenta` | Tx | Tipo de producto (cuenta, préstamo, inversión) | ⬜ blanco |
| `Texto106` | Tx | Op. internacionales — "Otras" (detalle) | ⬜ blanco |
| `Texto112` | Tx | Op. internacionales — "Otras" (detalle) | ⬜ blanco |

## 8. Referencias (familiares y personales/comerciales)

> 🧍 Cliente. Dos bloques: **Familiares** (que no vivan con usted) y **Personales/Comerciales**,
> cada uno con columnas Nombres y apellidos · Parentesco/Relación · Ciudad · Teléfonos.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Nombres y apellidos1` | Tx | Familiar ref. 1 — Nombres y apellidos | 🧍 |
| `Parentesco` | Tx | Familiar ref. 1 — Parentesco | 🧍 |
| `Ciudad_2` | Tx | Familiar ref. 1 — Ciudad | 🧍 |
| `Tel�fonos de contacto` (`Teléfonos de contacto`) | Tx | Familiar ref. 1 — Teléfonos | 🧍 |
| `Texto69` | Tx | Familiar ref. 1 — dato adicional ❓ | 🧍 ❓ |
| `Nombres y apellidos` | Tx | Familiar ref. 2 — Nombres y apellidos | 🧍 |
| `Parentesco1` | Tx | Familiar ref. 2 — Parentesco | 🧍 |
| `Ciudad` (ref.) / `Texto3` | Tx | Familiar ref. 2 — Ciudad ❓ | 🧍 ❓ |
| `Texto73` | Tx | Familiar ref. 2 — Teléfonos ❓ | 🧍 ❓ |
| `Texto75` | Tx | Familiar ref. — Nombres y apellidos (TU) | 🧍 |
| `Texto70` | Tx | Referencia — dato ❓ | 🧍 ❓ |
| `Texto71` | Tx | Personal/comercial ref. — Nombres y apellidos (TU) | 🧍 |
| `Texto72` | Tx | Personal/comercial ref. — dato ❓ | 🧍 ❓ |
| `Relación` | Tx | Personal/comercial ref. 1 — Relación | 🧍 |
| `Nombres y apellidos_2` | Tx | Personal/comercial ref. 1 — Nombres y apellidos | 🧍 |
| `Ciudad1` | Tx | Personal/comercial ref. 1 — Ciudad | 🧍 |
| `Tel�fonos de contacto1` (`Teléfonos de contacto1`) | Tx | Personal/comercial ref. 1 — Teléfonos | 🧍 |
| `Nombres y apellidos_3` | Tx | Personal/comercial ref. 2 — Nombres y apellidos | 🧍 |
| `Relación3` | Tx | Personal/comercial ref. 2 — Relación | 🧍 |
| `Texto63` | Tx | Personal/comercial ref. 2 — Ciudad ❓ | 🧍 ❓ |
| `Tel�fonos de contacto_2` (`Teléfonos de contacto_2`) | Tx | Personal/comercial ref. 2 — Teléfonos | 🧍 |
| `Texto76` | Tx | Personal/comercial ref. 3 — Nombres/Ciudad ❓ | 🧍 ❓ |
| `Tel�fonos de contacto_3` (`Teléfonos de contacto_3`) | Tx | Personal/comercial ref. 3 — Teléfonos | 🧍 |

## 9. Créditos y/o Leasing (clave para hipotecario)

> 🧍 Cliente / 🏦 datos del crédito. Incluye la **tabla de obligaciones vigentes**
> (columnas Hipotecario · Consumo · Vehículo · Libranza · Tarjeta · Valor · Plazo · Entidad
> financiera · Tarjeta Crédito, filas 1-4) y los datos del crédito solicitado.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Monto` | Tx | Monto solicitado | 🧍 / 🏦 crédito |
| `Texto74` | Tx | Monto solicitado / Cupo (col. der.) ❓ | 🧍 ❓ |
| `PlazoValor` | Tx | Plan de amortización anual / Plazo | 🧍 / 🏦 |
| `bbva` | Btn | ¿Recibe el pago de su nómina a través de BBVA? (Sí/No) | ☑️ 🧍 |
| `destino` | Btn | Destino del crédito (Compra Vivienda/Leasing Habitacional/Remodelación/Construcción/Compra Cartera/Libre Inversión/Cupo Rotativo/Compra Vehículo/Leasing Vehículo) | 🔽 según Tipo de operación |
| `Pesos` | Btn | Crédito Hipotecario: Pesos / UVR | ☑️ 🧍/🏦 |
| `Estado veh�culo Nuevo` (`Estado vehículo Nuevo`) | Btn | Estado del vehículo: Nuevo/Usado | ☑️ 🔀 |
| `Nuevo` | Btn | Estado del inmueble: Nuevo/Usado | ☑️ 🔀 |
| `Casa` | Btn | Tipo de inmueble a hipotecar: Casa/Apartamento/Otro | ☑️ 🔀 |
| `cuotas` | Btn | Día de pago: 12 cuotas / 14 cuotas | ☑️ 🔀 |
| `Habitacional` | Tx | % compra Leasing Habitacional | 🔀 🧍 |
| `Texto83` | Tx | % / Leasing Habitacional (TU Habitacional) | 🔀 🧍 |
| `compra Leasing` | Tx | % compra Leasing Habitacional | 🔀 🧍 |
| `Texto81` | Tx | Compra Leasing (detalle) | 🔀 🧍 |
| `Texto77` | Tx | Consumo (fila tabla) ❓ | 🧍 ❓ |
| `Texto78` | Tx | Crédito/Leasing Vehículo — Clase ❓ | 🔀 🧍 ❓ |
| `Texto79` | Tx | Crédito/Leasing Vehículo — Modelo ❓ | 🔀 🧍 ❓ |
| `Texto80` | Tx | Crédito/Leasing Vehículo — Valor comercial ❓ | 🔀 🧍 ❓ |
| `Texto64` | Tx | Subproducto / Marca ❓ | 🔀 🧍 ❓ |
| `Texto65` | Tx | Dirección del inmueble ❓ | 🔀 🧍 ❓ |
| `Texto82` | Tx | Valor comercial / Día de pago ❓ | 🔀 🧍 ❓ |
| `Texto88` | Tx | Entidad financiera (fila 4) ❓ | 🧍 ❓ |
| `Texto89` | Tx | Crédito — dato (Y≈393) ❓ | 🧍 ❓ |
| `undefined_10` | Tx | Crédito — dato ❓ | 🧍 ❓ |
| `HipotecarioRow1..4` | Tx | Obligaciones vigentes — col. Hipotecario, filas 1-4 | 🧍 |
| `consumoRow1..4` | Tx | Obligaciones vigentes — col. Consumo, filas 1-4 | 🧍 |
| `Veh�culoRow1..4` (`VehículoRow1..4`) | Tx | Obligaciones vigentes — col. Vehículo, filas 1-4 | 🧍 |
| `libranzaRow1..4` | Tx | Obligaciones vigentes — col. Libranza, filas 1-4 | 🧍 |
| `tarjetaRow1..4` | Tx | Obligaciones vigentes — col. Tarjeta, filas 1-4 | 🧍 |
| `ValorRow1..4` | Tx | Obligaciones vigentes — col. Valor, filas 1-4 | 🧍 |
| `PlazoValor_2..4` | Tx | Obligaciones vigentes — col. Plazo, filas 2-4 | 🧍 |
| `Entidad financieraRow1..4` | Tx | Obligaciones vigentes — col. Entidad financiera, filas 1-4 | 🧍 |
| `Tarjeta Cr�ditoRow1..4` (`Tarjeta CréditoRow1..4`) | Tx | Obligaciones vigentes — col. Tarjeta Crédito, filas 1-4 | 🧍 |

## 10. Compra de cartera

> Se diligencia solo si aplica (tabla: Entidad financiera · Tarjeta Crédito · Hipotecario ·
> Libranza · Vehículo · Consumo · No. obligación · Valor · Plazo).

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Pr�stamos` (`Préstamos`) | Btn | Compra de cartera — casilla ❓ | 🔀 ❓ |
| `Otras_2` | Tx | Compra de cartera — dato "Otras" ❓ | 🔀 ❓ |

> Nota: la mayoría de columnas de la tabla de "compra de cartera" reutilizan los mismos
> nombres `*Row2/3/4` listados en la sección 9 (la tabla es compartida visualmente).

## 11. Detalle Tarjeta de Crédito · 12. BBVA Valores · 13. Fiduciaria · 14. Seguros

> Reglas fijas: **Tarjeta de Crédito, BBVA Valores y BBVA Fiduciaria → en blanco (⬜)**.
> **BBVA Seguros → marcar "Seguro de Vida Vital" (🟢 fijo).**

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `TI_4` | Tx | Tarjeta Crédito amparada — Tipo id "TI" ❓ | ⬜ blanco |
| `Cu�l_6` (`Cuál_6`) | Tx | Tarjeta Crédito amparada — ¿Cuál? | ⬜ blanco |
| `visa` | Btn | Cupo solicitado Visa / Master | ⬜ blanco |
| `verbal` (BBVA Valores) / `escrota` / `Texto104` / `Texto105` | Btn | BBVA Valores — Impartición de órdenes: Verbal / Escrita | ⬜ blanco |
| `Cu�l_7` (`Cuál_7`) | Tx | BBVA Valores / Fiduciaria — ¿Cuál? | ⬜ blanco |
| `No de cuenta` | Tx | BBVA Fiduciaria — No. de cuenta | ⬜ blanco |
| `No de cuenta1` | Tx | BBVA Fiduciaria — No. de cuenta | ⬜ blanco |
| `Texto119` | Tx | BBVA Fiduciaria — No. de cuenta (detalle) | ⬜ blanco |
| `Texto120` | Tx | BBVA Fiduciaria — Ciudad/dato | ⬜ blanco |
| `Texto121` | Tx | BBVA Fiduciaria — dato | ⬜ blanco |
| `Pa�s1` (`País1`) | Tx | BBVA Fiduciaria — País | ⬜ blanco |
| `Moneda` | Tx | BBVA Fiduciaria/Valores — Moneda | ⬜ blanco |
| `Moneda_3` | Tx | BBVA Fiduciaria — Moneda | ⬜ blanco |
| `Ciudad_4` | Tx | BBVA Fiduciaria — Ciudad | ⬜ blanco |
| `FIDUCIA` (grupo) | Btn | (ver grupos de selección) | ⬜ blanco |

---

# 📄 PÁGINA 3 (obj 4) — Autorizaciones, firmas y Espacio exclusivo BBVA

## 15. Autorización tratamiento de datos · 16. Canal de comunicación

> El texto legal es fijo. En la sección 16 se marca **con una X el canal por el que NO desea
> ser contactado**. Regla fija: **marcar "Cartas"**.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Casilla de verificación8` | Btn | (a) Llamadas telefónicas — no contactar | ☑️ ⬜ |
| `Casilla de verificación9` | Btn | (b) Correo electrónico — no contactar | ☑️ ⬜ |
| `Casilla de verificación10` | Btn | (c) Cartas — no contactar | ☑️ 🟢 **marcar (Cartas)** |
| `Casilla de verificación11` | Btn | (d) Mensajes de voz y texto (SMS) — no contactar | ☑️ ⬜ |
| `Casilla de verificación12` | Btn | (e) Whatsapp — no contactar | ☑️ ⬜ |
| `Texto131` / `Texto132` | Btn | Canal de comunicación — casilla adicional ❓ | ☑️ ❓ |

## Firmas

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Identificación` | Tx | Identificación bajo la firma del Solicitante | 🧍 cédula del cliente |
| `Identificación_4` | Tx | Identificación (firma del Representante/Apoderado) | ⬜ blanco |

## Espacio exclusivo BBVA

> ✅ **Esta sección SÍ la diligenciamos nosotros** con los datos del **radicador** según la
> tabla **Ciudad → Director → Analista/Coordinador** definida para el proyecto
> (origen 🏦 Banco/ciudad). El subcampo **"Realizado por"** es fijo:
> **Nombre = HABICREDIT · Código = 901005470-1** (NIT de la compañía) → 🟢 fijo.

| Nombre técnico (/T) | Tipo | Etiqueta/Significado | Origen sugerido |
|---------------------|------|----------------------|-----------------|
| `Texto123` | Tx | Gestión Comercial — Código/Nombre del funcionario | 🏦 radicador |
| `Código Nombre del funcionario` | Tx | Nombre del funcionario (Gestión Comercial) | 🏦 radicador |
| `Texto122` | Tx | Fuerza de Ventas Externa — Nombre | 🏦 radicador |
| `Fuerza de Ventas Externa` | Tx | Fuerza de Ventas Externa — Identificación | 🏦 radicador |
| `Identificación_2` | Tx | Fuerza de Ventas Externa — Identificación | 🏦 radicador |
| `Nombre` | Tx | Fuerza de Ventas Externa — Nombre | 🏦 radicador |
| `Fuerza de Ventas Interna  FAST` | Tx | Fuerza de Ventas Interna (FAST) — Identificación | 🏦 radicador |
| `Identificación_3` | Tx | Coordinador Comercial — Identificación | 🏦 radicador |
| `Coordinador Comercial` | Tx | Coordinador Comercial — Nombre/Identificación | 🏦 radicador |
| `Nombre_2` | Tx | FAST/Coordinador — Nombre | 🏦 radicador |
| `Nombre_3` | Tx | Coordinador Comercial — Nombre | 🏦 radicador |
| `Texto124` | Tx | Espacio BBVA — Nombre/Identificación funcionario ❓ | 🏦 radicador |
| `Texto125` | Tx | Espacio BBVA — Nombre funcionario ❓ | 🏦 radicador |
| `Texto126` | Tx | Realizado por — **Nombre = HABICREDIT** | 🟢 fijo (HABICREDIT) |
| `Texto127` | Tx | Realizado por — **Código = 901005470-1** ❓ | 🟢 fijo (901005470-1) |
| `Texto128` | Tx | Realizado por — Código/dato ❓ | 🟢 fijo (901005470-1) ❓ |
| `Texto129` | Tx | Entrevista personal — Identificación ❓ | 🏦 radicador |
| `Texto130` | Tx | Aprobación gerente — Identificación ❓ | 🏦 radicador |

---

# 🔘 Grupos de selección (33 campos sin página propia)

> Estos son los **parents de los grupos de radio-button / casillas agrupadas**. En el PDF no
> tienen `/P` (página) ni `/Rect` propios porque el valor lo guarda el *field parent* y sus
> *widgets* (las opciones visibles) están repartidos en las páginas. Se listan aparte y por eso
> **suman 33 al total pero no cuentan en el conteo por página (118/27/219)**.

| Nombre técnico (/T) | Página lógica | Etiqueta/Significado | Origen sugerido |
|---------------------|---------------|----------------------|-----------------|
| `Vinculación inicial` | 1 | Tipo de solicitud (Vinculación inicial / Actualización) | ☑️ 🟢 Vinculación inicial |
| `tipo de vinculo` | 1 | Tipo de vínculo (Titular/Avalista/...) | 🔽 Titular/Avalista |
| `genero` | 1 | Género (Hombre/Mujer/Otro) | ☑️ 🧍 |
| `tipo` | 1 | Tipo de identificación del titular (CC/CE/TI/Pasaporte/Otro) | ☑️ 🧍 |
| `estado civil` | 1 | Estado civil (Soltero/Casado/Unión libre/...) | ☑️ 🧍 |
| `nivel estudios` | 1 | Nivel de estudios | ☑️ 🧍 |
| `pc` | 1 | ¿Persona con discapacidad (PcD)? | ☑️ 🧍 |
| `tipo vivienda` | 1 | Tipo de vivienda (propia/hipoteca/familiar/arriendo/otro) | ☑️ 🧍 |
| `correspondencia` | 1 | ¿Dónde recibir correspondencia? | ☑️ 🟢 Correo electrónico |
| `banco` | 1 | Medio para info comercial del Banco | ☑️ 🟢 Correo electrónico |
| `identificacion` | 1 | Tipo de identificación del cónyuge | 🔀 ☑️ |
| `identificacion3` | 1 | Tipo de identificación del apoderado | ⬜ blanco |
| `economica` | 1 | Situación laboral (asalariado/pensionado/independiente/otro) | 🔽 🧍 |
| `empresa` | 1 | ¿Es socio de la empresa donde trabaja? | ☑️ 🧍 |
| `pe` | 1 | Situación laboral — opción "Otro" ❓ | ☑️ 🧍 ❓ |
| `pep` | 1 | ¿Persona Políticamente Expuesta? | ☑️ 🧍 (No) |
| `familiar` | 1 | ¿Familiar de un PEP? | ☑️ 🧍 (No) |
| `Sí_2` | 1 | ¿Asociado a un PEP? | ☑️ 🧍 (No) |
| `Nacional` | 1 | Recursos ¿campaña política? / Nacional-Extranjera ❓ | ☑️ 🧍 ❓ |
| `cuentas` | 1 | ¿Cuenta financiera en país extranjero? | ☑️ 🧍 (No) |
| `tiene` | 1 | ¿Patrimonios autónomos o fiducias? | ☑️ 🟢 **NO** |
| `FIDUCIA` | 1/2 | Fiducia — casilla asociada ❓ | ☑️ ❓ |
| `declara` | 2 | ¿Declara renta? | ☑️ 🧍 |
| `moneda` | 2 | ¿Realiza operaciones en moneda extranjera? | ☑️ 🟢 **NO** |
| `posee` | 2 | ¿Posee productos en moneda extranjera? | ☑️ 🟢 **NO** |
| `destino` | 2 | Destino del crédito | 🔽 según Tipo de operación |
| `bbva` | 2 | ¿Recibe el pago de su nómina a través de BBVA? | ☑️ 🧍 |
| `cuotas` | 2 | Día de pago (12/14 cuotas) | ☑️ 🔀 |
| `Estado vehículo Nuevo` | 2 | Estado del vehículo (Nuevo/Usado) | ☑️ 🔀 |
| `Pesos` | 2 | Crédito Hipotecario (Pesos/UVR) | ☑️ 🔀 |
| `Nuevo` | 2 | Estado del inmueble (Nuevo/Usado) | ☑️ 🔀 |
| `Casa` | 2 | Tipo de inmueble a hipotecar (Casa/Apto/Otro) | ☑️ 🔀 |
| `visa` | 2 | Tarjeta amparada (Visa/Master) | ⬜ blanco |

---

# ✅ Chequeo de cobertura

### Conteo de widgets (coincide con el total declarado = 397)

| Página visual | Objeto | Widgets | Nombres únicos | Duplicados |
|---------------|--------|--------:|---------------:|-----------:|
| Página 1 | obj 396 | **219** | 112 | **107** |
| Página 2 | obj 1 | **118** | 118 | 0 |
| Página 3 | obj 4 | **27** | 27 | 0 |
| Grupos de selección (sin página) | — | **33** | 33 | 0 |
| **TOTAL** | | **397** | **290** | **107** |

- **219 + 118 + 27 = 364** widgets con página asignada → coincide con el desglose **118 / 27 / 219**
  del inventario (aquí re-etiquetado a su página **visual** correcta).
- **364 + 33 (grupos de selección sin `/P`) = 397** ✅ total confirmado.
- Por tipo: **312 `/Tx` (texto) + 85 `/Btn` (casillas/botones) = 397** ✅.

### Etiqueta clara vs. por confirmar (sobre los 290 campos únicos mapeados)

| Estado | Cantidad aprox. | Detalle |
|--------|-----------------|---------|
| ✅ **Etiqueta clara** | **≈ 235** | Tienen `/TU` descriptivo o nombre `/T` autoexplicativo (tablas de obligaciones, referencias, familiares PEP, productos, fechas, cónyuge, apoderado, operaciones int'l, espacio BBVA, grupos de selección). |
| ❓ **Por confirmar** | **≈ 55** | Campos `TextoNN` / `undefined_N` genéricos (sobre todo en *Datos personales* de la pág. 1 y en *Información financiera* de la pág. 2) cuyo significado exacto se **infirió por coordenada** pero no se pudo cruzar 1-a-1 con una etiqueta visible. Van marcados con **❓** en la columna "Etiqueta/Significado". |

> Los ❓ se concentran en: datos personales de la página 1 (bandas de dirección, contacto,
> vivienda) y en los importes de la sección 6 (Información financiera), donde los `/T` son
> `undefined_N`. Se recomienda **abrir el PDF y hacer clic sobre esos campos** para confirmar el
> `/T` exacto de cada casilla, ya que el texto visible de esas franjas usa ligaduras y kerning
> que dificultan el cruce automático por coordenadas.

## Discrepancias detectadas (resumen para el equipo)

1. **Orden de páginas invertido** respecto al inventario: el orden visual real es
   **obj 396 → obj 1 → obj 4** (no 1 → 4 → 396). Corregido en este mapa.
2. **107 campos duplicados** en la página 1 (obj 396): el PDF conserva dos juegos de
   anotaciones (dos revisiones). Al automatizar, **rellenar un `/T` pintará el valor en las dos
   posiciones**; conviene depurar el PDF o verificar cuál juego de widgets está activo antes de
   producción.
3. **Sección "Espacio exclusivo BBVA"**: NO se deja en blanco — se diligencia con el **radicador
   por ciudad** (🏦) y el subcampo "Realizado por" es fijo (**HABICREDIT / 901005470-1**).
