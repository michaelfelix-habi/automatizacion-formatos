import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/FORMATO CONOCIMIENTO DE CLIENTE APROBADO.docx.pdf';
const OUT_PATH = './CONOCIMIENTO_test_FINAL.pdf';

const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const font  = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const BLACK = rgb(0, 0, 0);

// Igual que en Index.html: sz=8 por defecto, bold usa fontB
const d = (page, text, x, y, sz = 8, bold = false) =>
  page.drawText(String(text || ''), { x, y, size: sz, font: bold ? fontB : font, color: BLACK });

// ── Datos de ejemplo ──
const hoyStr        = '21/08/2026';
const nombreCliente = 'Juan Carlos Pérez García';
const numId         = '1234567890';
const ciudadSel     = 'BOGOTÁ';
const ciudadRes     = 'BOGOTÁ';
const coordinador   = 'María Laura Ríos';
const brokerN       = 'Carlos Mora López';
const brokerC       = '80123456';
const analistaN     = 'José Iván Motivar';
const analistaC     = '1018454647';

// ── Opciones seleccionadas en el formulario (cambiar para probar) ──
const visVal   = 'VIS';            // 'VIS' o 'NO_VIS'
const tipoC    = 'hipotecario';    // 'hipotecario', 'leasing_familiar', 'leasing_no_familiar'
const lineaC   = 'tradicional';   // 'tradicional', 'remodelacion', 'const_individual', 'cesion'

// ══════════════════════════════════════
// PÁGINA 1
// ══════════════════════════════════════
const p1 = pdfDoc.getPage(0);
d(p1, hoyStr,         137.5, 639.4);
d(p1, 'HABICREDIT',   139.4, 621.8);
d(p1, '9010054701',   116.5, 599.5);
d(p1, ciudadSel,      396.7, 600.8);
d(p1, nombreCliente,  137.5, 526.9);
d(p1, numId,          391.4, 526.9);
d(p1, coordinador,    218.0, 505.9);
d(p1, ciudadRes,      392.1, 505.9);
d(p1, 'X', 157.1, 339.7, 10, true);   // Sí validación identidad

// ══════════════════════════════════════
// PÁGINA 2
// ══════════════════════════════════════
const p2 = pdfDoc.getPage(1);
d(p2, 'FAVORABLE', 71.3, 658.4, 9, true);
d(p2, 'X', 386.2, 377.0, 10, true);   // NO proyecto financiado banco

if (visVal === 'VIS')    d(p2, 'X', 158.4, 298.4, 10, true);
if (visVal === 'NO_VIS') d(p2, 'X', 379.0, 295.2, 10, true);

const tipoCoords = {
  hipotecario:        [157.7, 211.4],
  leasing_familiar:   [346.3, 210.1],
  leasing_no_familiar:[243.5, 170.8],
};
if (tipoCoords[tipoC]) {
  const [tx, ty] = tipoCoords[tipoC];
  d(p2, 'X', tx, ty, 10, true);
}

// ══════════════════════════════════════
// PÁGINA 3
// ══════════════════════════════════════
const p3 = pdfDoc.getPage(2);

const lineaCoords = {
  tradicional:     [158.4, 678.1],
  remodelacion:    [157.7, 654.5],
  const_individual:[350.8, 678.1],
  cesion:          [350.8, 655.8],
};
if (lineaCoords[lineaC]) {
  const [lx, ly] = lineaCoords[lineaC];
  d(p3, 'X', lx, ly, 10, true);
}

// Firmas
d(p3, brokerN,   91.0, 502.0, 8, true);
d(p3, brokerN,  132.2, 464.0);
d(p3, brokerC,  128.9, 445.7);
d(p3, analistaN, 75.9, 348.8, 8, true);
d(p3, analistaN,125.0, 319.4);
d(p3, analistaC,130.3, 304.3);
d(p3, nombreCliente, 367.9, 469.9, 8, true);
d(p3, numId,    365.9, 450.9);

const out = await pdfDoc.save();
writeFileSync(OUT_PATH, out);
console.log('Guardado:', OUT_PATH);
console.log(`Escenario: ${visVal} | ${tipoC} | ${lineaC}`);
