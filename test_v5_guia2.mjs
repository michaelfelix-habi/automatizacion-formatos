import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/FORMATO CONOCIMIENTO DE CLIENTE APROBADO.docx.pdf';
const OUT_PATH = './CONOCIMIENTO_test_v5.pdf';

const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const font  = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const BLACK = rgb(0,0,0);

const d = (page, text, x, y, sz=8, f=font) =>
  page.drawText(String(text||''), { x, y, size: sz, font: f, color: BLACK });

// ══════════════════════════════════════
// PÁGINA 1 — todas las posiciones CONFIRMADAS
// ══════════════════════════════════════
const p1 = pdfDoc.getPage(0);
d(p1, '21/08/2026',              137.5, 639.4);   // Fecha
d(p1, 'HABICREDIT',              139.4, 621.8);   // Nombre empresa
d(p1, '9010054701',              116.5, 599.5);   // NIT
d(p1, 'BOGOTÁ',                  396.7, 600.8);   // Ciudad radicación
d(p1, 'Juan Carlos Pérez García', 137.5, 526.9);  // Nombre cliente
d(p1, '1234567890',              391.4, 526.9);   // Cédula cliente
d(p1, 'María Laura Ríos',        218.0, 505.9);   // Nombre coordinador
d(p1, 'BOGOTÁ',                  392.1, 505.9);   // Ciudad residencia
d(p1, 'X',                       157.1, 339.7, 10, fontB); // Sí validación identidad

// ══════════════════════════════════════
// PÁGINA 2 — CONFIRMADAS desde GUIA 2
// ══════════════════════════════════════
const p2 = pdfDoc.getPage(1);
d(p2, 'FAVORABLE',  71.3, 658.4,  9, fontB);  // conclusiones visita

d(p2, 'X', 386.2, 377.0, 10, fontB);  // NO proyecto financiado banco
// d(p2,'X',155.1, 382.2,10,fontB);   // SI (no se usa — siempre va NO)

d(p2, 'X', 158.4, 298.4, 10, fontB);  // VIS
// d(p2,'X',379.0, 295.2,10,fontB);   // NO VIS (alternativa)

d(p2, 'X', 157.7, 211.4, 10, fontB);  // Hipotecario Tradicional
// d(p2,'X',346.3, 210.1,10,fontB);   // Leasing Familiar
// d(p2,'X',243.5, 170.8,10,fontB);   // Leasing No Familiar

// ══════════════════════════════════════
// PÁGINA 3
// ══════════════════════════════════════
const p3 = pdfDoc.getPage(2);

// Línea del crédito — CONFIRMADAS (Guia 2 marcó las 2 primeras de cada columna)
// Espaciado izq ≈ 23.6 pts, der ≈ 22.3 pts → uso 24 pts para las intermedias
d(p3, 'X', 158.4, 678.1, 10, fontB);   // TRADICIONAL
d(p3, 'X', 157.7, 654.5, 10, fontB);   // REMODELACIÓN
d(p3, 'X', 158.0, 630.5, 10, fontB);   // CXI           ← extrapolado
d(p3, 'X', 158.0, 606.5, 10, fontB);   // TRAE TU LEASING ← extrapolado
d(p3, 'X', 158.0, 582.5, 10, fontB);   // SOBRE PLANOS  ← extrapolado
d(p3, 'X', 350.8, 678.1, 10, fontB);   // CONST. INDIVIDUAL
d(p3, 'X', 350.8, 655.8, 10, fontB);   // CESIÓN
d(p3, 'X', 350.8, 631.8, 10, fontB);   // SOSTENIBLE    ← extrapolado
d(p3, 'X', 350.8, 607.8, 10, fontB);   // LEASEBACK     ← extrapolado

// Firmas — CONFIRMADAS desde GUIA original
d(p3, 'Carlos Mora López',  91.0,  502.0, 8);  // broker sobre línea
d(p3, 'Carlos Mora López', 132.2,  464.0, 8);  // broker nombre campo
d(p3, '80123456',          128.9,  445.7, 8);  // broker cédula
d(p3, 'José Iván Motivar',  75.9,  348.8, 8);  // analista sobre línea
d(p3, 'José Iván Motivar', 125.0,  319.4, 8);  // analista nombre campo
d(p3, '1018454647',        130.3,  304.3, 8);  // analista cédula
d(p3, 'Juan Carlos Pérez', 367.9,  469.9, 8);  // cliente nombre
d(p3, '1234567890',        365.9,  450.9, 8);  // cliente cédula

const out = await pdfDoc.save();
writeFileSync(OUT_PATH, out);
console.log('Guardado:', OUT_PATH);
console.log('\n⚠ Marcados en prueba: VIS + Hipotecario Tradicional + Tradicional (col izq)');
console.log('   CXI, Trae Tu Leasing, Sobre Planos, Sostenible, Leaseback = extrapolados');
