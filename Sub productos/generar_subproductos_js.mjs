// Genera el bloque JS de subproductos que se incrusta en codigo/apps_script/Index.html
// a partir de "Sub productos/subproductos_fuvex.csv" y "municipios_aglomerados.csv".
//
// Uso (desde la raíz del proyecto):
//   node "Sub productos/generar_subproductos_js.mjs"            -> reescribe el bloque en Index.html
//   node "Sub productos/generar_subproductos_js.mjs" --migrar   -> aplica además las correcciones/altas de la
//                                                                  norma 14/10/2026 al CSV (solo la primera vez)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const csvSub = path.join(aqui, 'subproductos_fuvex.csv');
const csvMun = path.join(aqui, 'municipios_aglomerados.csv');
const html = path.join(aqui, '..', 'codigo', 'apps_script', 'Index.html');
const SMMLV = 1750905; // hoja "Topes VIS" del Excel

// ── CSV simple con comillas ──────────────────────────────
function parseCSV(txt) {
  txt = txt.replace(/^﻿/, '');
  const filas = []; let fila = [], cel = '', q = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (q) {
      if (c === '"' && txt[i + 1] === '"') { cel += '"'; i++; }
      else if (c === '"') q = false;
      else cel += c;
    } else if (c === '"') q = true;
    else if (c === ',') { fila.push(cel); cel = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && txt[i + 1] === '\n') i++;
      fila.push(cel); cel = ''; if (fila.length > 1 || fila[0] !== '') filas.push(fila); fila = [];
    } else cel += c;
  }
  if (cel !== '' || fila.length) { fila.push(cel); filas.push(fila); }
  const cab = filas.shift();
  return { cab, filas: filas.map(f => Object.fromEntries(cab.map((k, i) => [k, f[i] ?? '']))) };
}
function escCSV(v) { v = String(v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
function toCSV(cab, filas) {
  return '﻿' + [cab.join(','), ...filas.map(f => cab.map(k => escCSV(f[k] ?? '')).join(','))].join('\n') + '\n';
}
const r2 = n => (Math.round(n * 100) / 100).toFixed(2);
const r4 = n => (Math.round(n * 10000) / 10000).toFixed(4);
const mv = ea => (Math.pow(1 + ea / 100, 1 / 12) - 1) * 100;

let { cab, filas } = parseCSV(fs.readFileSync(csvSub, 'utf8'));

// ── Migración (norma de tasas vigente desde 14/10/2026) — idempotente ─────────────
if (process.argv.includes('--migrar')) {
  // 1) Remodelación leasing VIS (7167): la nota visible de la tabla dice Nómina 150 PB (se deja la tasa bonificada de la norma).
  for (const f of filas) {
    if (f.subproducto_fuvex === '7167') {
      f.pb_nomina = '150';
      const ea = parseFloat(f.tasa_max_ea_pct) - 1.50;
      f.tasa_con_nomina_ea_pct = r2(ea); f.tasa_con_nomina_mv_pct = r4(mv(ea));
      f.nota = 'Nómina: 150 PB (nota al pie de la tabla de Remodelación, norma 14/10/2026).';
    }
    // 2) Remodelación No VIS (5396/5397): el negocio confirmó 150 PB.
    if (f.subproducto_fuvex === '5397') f.nota = 'La remodelación en UVR es capital constante. Nómina 150 PB (confirmado por el negocio).';
    if (/Por confirmar/.test(f.nota)) f.nota = f.nota.replace(/s*Por confirmar[^.]*.?/, '').trim();
  }
  const nuevaFila = (ctx, linea, seg, zona, viv, mod, cod, ea, desc, nota, pb = 0, con = null) => {
    const f = {
      contexto: ctx, linea, producto_base: 'N/A', segmento: seg, zona_vis: zona, moneda: 'Pesos', vivienda: viv,
      modalidad_leasing: mod, tipo_cuota: 'N/A', sostenible: 'No', rango_ingresos: 'N/A',
      subproducto_fuvex: cod, descripcion: desc, tasa_max_ea_pct: r2(ea), tasa_max_mv_pct: r4(mv(ea)), pb_nomina: String(pb),
      tasa_con_nomina_ea_pct: con === null ? 'No aplica' : r2(con), tasa_con_nomina_mv_pct: con === null ? 'No aplica' : r4(mv(con)), nota
    };
    f.llave = [ctx, linea, 'N/A', seg, zona, 'Pesos', viv, mod, 'N/A', 'No', 'N/A'].join('|');
    return f;
  };
  // Se reconstruyen las filas COLEX de proyectos aliados y financiados (se pueden regenerar sin duplicar)
  filas = filas.filter(f => !['Colex aliada', 'Colex financiado'].includes(f.contexto));
  const NOTA_ALIADA = 'Constructora aliada no financiado (solo COLEX), vivienda nueva y usada. La bonificación de nómina no aplica.';
  const NOTA_FIN = 'Proyecto financiado / subrogación (solo COLEX), vivienda nueva y usada. La bonificación de nómina no aplica.';
  const aliadas = [
    // linea, segmento, zona, modalidad, código, tasa EA, descripción
    ['Hipotecario', 'VIS', 'Resto del país', 'N/A', '5378', 14.50, 'Hipotecario VIS, resto del país (135 SMMLV), pesos'],
    ['Hipotecario', 'VIS', 'Aglomeración', 'N/A', '5230', 14.50, 'Hipotecario VIS, aglomeración (150 SMMLV), pesos'],
    ['Hipotecario', 'VIS', 'Renovación urbana', 'N/A', '5116', 14.50, 'Hipotecario VIS, renovación urbana (175 SMMLV), pesos'],
    ['Hipotecario', 'No VIS', 'N/A', 'N/A', '5111', 15.00, 'Hipotecario No VIS, pesos'],
    ['Leasing habitacional', 'No VIS', 'N/A', 'No familiar', '7262', 14.70, 'Leasing habitacional No VIS, pesos, no familiar'],
    ['Leasing habitacional', 'VIS', 'Aglomeración', 'No familiar', '7168', 13.00, 'Leasing habitacional VIS, aglomeración (150 SMMLV), pesos, no familiar'],
    ['Leasing habitacional', 'VIS', 'Renovación urbana', 'No familiar', '7200', 13.00, 'Leasing habitacional VIS, renovación urbana (175 SMMLV), pesos, no familiar'],
  ];
  const financiados = [
    ['Hipotecario', 'VIS', 'Resto del país', 'N/A', '5773', 14.50, 'Hipotecario VIS, resto del país (135 SMMLV), pesos'],
    ['Hipotecario', 'VIS', 'Aglomeración', 'N/A', '5014', 14.50, 'Hipotecario VIS, aglomeración (150 SMMLV), pesos'],
    ['Hipotecario', 'No VIS', 'N/A', 'N/A', '5774', 15.00, 'Hipotecario No VIS, pesos'],
    ['Leasing habitacional', 'No VIS', 'N/A', 'No familiar', '5775', 14.70, 'Leasing habitacional No VIS, pesos, no familiar'],
  ];
  for (const [ctx, lista, prefijo, nota] of [['Colex aliada', aliadas, 'Colex aliada', NOTA_ALIADA], ['Colex financiado', financiados, 'Colex proyecto financiado (subrogación)', NOTA_FIN]])
    for (const [linea, seg, zona, mod, cod, ea, desc] of lista)
      for (const viv of ['Nueva', 'Usada'])
        filas.push(nuevaFila(ctx, linea, seg, zona, viv, mod, cod, ea, prefijo + ': ' + desc + ', vivienda ' + viv.toLowerCase(), nota));
  // 3) Uso mixto — Leasing habitacional VIS: la norma lo trae para vivienda nueva y usada
  for (const f of [...filas]) {
    if (f.contexto === 'Uso mixto' && f.linea === 'Leasing habitacional' && f.segmento === 'VIS' && f.vivienda === 'Nueva') {
      const u = { ...f, vivienda: 'Usada', descripcion: f.descripcion.replace('vivienda nueva', 'vivienda usada') };
      u.llave = [u.contexto, u.linea, u.producto_base, u.segmento, u.zona_vis, u.moneda, u.vivienda, u.modalidad_leasing, u.tipo_cuota, u.sostenible, u.rango_ingresos].join('|');
      if (!filas.some(x => x.llave === u.llave)) filas.push(u);
    }
  }
  // 4) Hipotecario sostenible VIS (Nacional) — norma pág. 7: Campaña VIS Sostenible, vivienda nueva; nómina 150 PB en pesos y 100 PB en UVR
  const sostenibles = [
    ['Resto del país', 'Pesos', '5924', 14.30, 150, 'Hipotecario sostenible VIS, resto del país (135 SMMLV), pesos, vivienda nueva'],
    ['Aglomeración', 'Pesos', '5795', 14.30, 150, 'Hipotecario sostenible VIS, aglomeración (150 SMMLV), pesos, vivienda nueva'],
    ['Aglomeración', 'UVR', '5797', 7.45, 100, 'Hipotecario sostenible VIS, aglomeración (150 SMMLV), UVR, vivienda nueva'],
  ];
  for (const [zona, mon, cod, ea, pb, desc] of sostenibles) {
    const con = ea - pb / 100;
    const f = {
      contexto: 'Normal', linea: 'Hipotecario', producto_base: 'N/A', segmento: 'VIS', zona_vis: zona, moneda: mon, vivienda: 'Nueva',
      modalidad_leasing: 'N/A', tipo_cuota: 'N/A', sostenible: 'Sí', rango_ingresos: 'N/A',
      subproducto_fuvex: cod, descripcion: desc, tasa_max_ea_pct: r2(ea), tasa_max_mv_pct: r4(mv(ea)), pb_nomina: String(pb),
      tasa_con_nomina_ea_pct: r2(con), tasa_con_nomina_mv_pct: r4(mv(con)),
      nota: 'Tomado de la sección Campañas (norma pág. 7, Campaña VIS Sostenible). Nómina 150 PB en pesos y 100 PB en UVR.'
    };
    f.llave = ['Normal', 'Hipotecario', 'N/A', 'VIS', zona, mon, 'Nueva', 'N/A', 'N/A', 'Sí', 'N/A'].join('|');
    const i = filas.findIndex(x => x.llave === f.llave);
    if (i >= 0) filas[i] = f; else filas.push(f);
  }
  fs.writeFileSync(csvSub, toCSV(cab, filas), 'utf8');
  console.log('CSV migrado:', filas.length, 'filas');
}

// ── Validaciones de consistencia ─────────────────────────
const porCodigo = {};
for (const f of filas) {
  const k = f.subproducto_fuvex;
  const t = [f.tasa_max_ea_pct, f.pb_nomina, f.tasa_con_nomina_ea_pct].join('|');
  if (porCodigo[k] && porCodigo[k] !== t) console.warn('⚠ El código', k, 'tiene tasas distintas entre filas:', porCodigo[k], 'vs', t);
  porCodigo[k] = t;
}
const llaves = new Set();
for (const f of filas) { if (llaves.has(f.llave)) console.warn('⚠ llave duplicada', f.llave); llaves.add(f.llave); }

// ── Bloque JS ────────────────────────────────────────────
const num = v => (v === '' || isNaN(parseFloat(v))) ? null : parseFloat(v);
const SUB = filas.map(f => ({
  ctx: f.contexto, lin: f.linea, base: f.producto_base, seg: f.segmento, zona: f.zona_vis, mon: f.moneda, viv: f.vivienda,
  mod: f.modalidad_leasing, cuota: f.tipo_cuota, sost: f.sostenible, ing: f.rango_ingresos,
  cod: f.subproducto_fuvex, desc: f.descripcion, max: num(f.tasa_max_ea_pct), pb: num(f.pb_nomina), con: num(f.tasa_con_nomina_ea_pct)
}));
const mun = parseCSV(fs.readFileSync(csvMun, 'utf8')).filas.map(m => m.municipio);

const bloque =
`/*SUBPRODUCTOS:INICIO — generado por "Sub productos/generar_subproductos_js.mjs"; no editar a mano*/
const SMMLV_2026 = ${SMMLV};
const MUNICIPIOS_AGLOMERADOS = ${JSON.stringify(mun)};
const SUBPRODUCTOS = ${JSON.stringify(SUB)};
/*SUBPRODUCTOS:FIN*/`;

let h = fs.readFileSync(html, 'utf8');
if (/\/\*SUBPRODUCTOS:INICIO[\s\S]*?\/\*SUBPRODUCTOS:FIN\*\//.test(h)) {
  h = h.replace(/\/\*SUBPRODUCTOS:INICIO[\s\S]*?\/\*SUBPRODUCTOS:FIN\*\//, () => bloque);
  fs.writeFileSync(html, h, 'utf8');
  console.log('Index.html actualizado:', SUB.length, 'subproductos,', mun.length, 'municipios');
} else {
  fs.writeFileSync(path.join(aqui, 'bloque_subproductos.js'), bloque, 'utf8');
  console.log('Index.html aún no tiene los marcadores; bloque guardado en bloque_subproductos.js');
}
