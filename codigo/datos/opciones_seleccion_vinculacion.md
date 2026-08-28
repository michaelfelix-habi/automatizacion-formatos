# 🔽 Opciones de las casillas de selección — Vinculación

> ⚙️ **Hallazgo técnico:** en este PDF las selecciones son **casillas (checkbox) agrupadas**.
> Internamente cada opción se guarda como un **número** (1, 2, 3…) — NO como texto. El texto de
> cada opción está **impreso en el formato**. Para armar los desplegables necesitamos leer del
> formato qué etiqueta corresponde a cada número.
> Al construir: para marcar una opción, el sistema pone el valor numérico correspondiente.

| Campo PDF | Significado | # opciones | Valores internos | Etiquetas (leer del formato) |
|-----------|-------------|-----------:|------------------|------------------------------|
| `genero` | Género | 3 | 1, 2, 3 | ✅ Hombre / Mujer / Otro |
| `tipo` | Tipo de identificación | 5 | 1–5 | ✅ CC / CE / TI / Pasaporte / Otro → si **Otro**, escribir en `Texto10` "¿Cuál?" |
| `grupo` | Grupo étnico | 7 | 1–7 | ✅ ver lista abajo |
| `estado civil` | Estado civil | 6 | 1–6 | ✅ Soltero / Casado / Viudo / Divorciado / Separado / Unión Libre |
| `nivel estudios` | Nivel de estudios | 6 | 1–6 | ✅ Ninguno / Primaria / Bachillerato / Tecnólogo / Universitario / Especialización |
| `tipo vivienda` | Tipo de vivienda | 5 | 1–5 | ✅ Propia sin hipoteca / Propia con hipoteca / Familiar / Arriendo / Otro → si **Otro**, escribir en `Cuál_2` |
| `economica` | Situación laboral | 5 | 1–5 | ✅ Asalariado término indefinido / Pensionado / Independiente / Asalariado temporal / Otro → si **Otro**, escribir en `Cuál_5` |
| `destino` | Destino del crédito | 5 | 1–5 | ✅ Compra de vivienda / Construcción individual / Remodelación de Vivienda / Compra de cartera / **Leasing habitacional** → al elegir esta última se activa el campo % de opción de compra |
| `pc` | ¿Persona con discapacidad (PcD)? | 2 | 1, 2 | No / Sí → si **Sí**, escribir en el campo "¿Cuál?" (nombre por identificar) |
| `correspondencia` | ¿Dónde recibir correspondencia? | 3 | 1–3 | 🟢 fijo = Correo electrónico |
| `banco` | Medio info comercial | 4 | 1–4 | 🟢 fijo = Correo electrónico |

## Lista completa — Grupo étnico (`grupo`, 7 opciones)
1. Indígena
2. Gitano(a) o Rrom
3. Raizal del Archipiélago de San Andrés, Providencia y Santa Catalina
4. Palenquero(a) de San Basilio
5. Negro(a), Mulato(a), Afrodescendiente, Afrocolombiano(a)
6. Ningún grupo étnico
7. Sin información

> ⚠️ El orden numérico interno (1–7) puede no coincidir con el orden impreso; se verifica al
> construir/probar el llenado. Estas son las **etiquetas** para el desplegable.

## Estado civil (`estado civil`) → regla del cónyuge
- Opciones: Soltero · Casado · Viudo · Divorciado · Separado · Unión Libre.
- 🔀 **Si es Casado o Unión Libre**, se habilitan (obligatorios) los datos del cónyuge:
  `Texto38` = Nombres, `Texto39` = Primer apellido, `Texto40` = Segundo apellido.
  En los demás estados civiles → cónyuge en blanco.

> Nota: hay más selecciones (PEP, operaciones internacionales, etc.) pero son 🟢 fijas o ⬜ en
> blanco, así que no necesitan desplegable para el broker.
