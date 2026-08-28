import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';

// PDF ORIGINAL en blanco (sin el rojo)
const PDF_PATH = './formatos/formatos BBVA/FORMATO CONOCIMIENTO DE CLIENTE APROBADO.docx.pdf';
const OUT_PATH = './CONOCIMIENTO_test_v4.pdf';

const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const font  = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

const BLACK = rgb(0, 0, 0);
const BLUE  = rgb(0, 0.2, 0.9);
const RED   = rgb(0.85, 0, 0);

const d = (page, text, x, y, sz=8, color=BLACK, f=font) =>
  page.drawText(String(text||''), { x, y, size: sz, font: f, color });

// Marcador numerado azul para círculos estimados
const marker = (page, num, x, y) => {
  page.drawCircle({ x: x+5, y: y+5, size: 8, color: BLUE, opacity: 0.5 });
  d(page, String(num), x+1, y+1, 7, rgb(1,1,1), fontB);
};

// ══════════════════════════════════════
// PÁGINA 1
// ══════════════════════════════════════
const p1 = pdfDoc.getPage(0);

// Datos Prescriptor — posiciones CONFIRMADAS
d(p1, '21/08/2026',              137.5, 639.4);
d(p1, 'HABICREDIT',              139.4, 621.8);
d(p1, '9010054701',              116.5, 599.5);
d(p1, 'BOGOTÁ',                  396.7, 600.8);

// Datos Cliente — posiciones CONFIRMADAS
d(p1, 'Juan Carlos Pérez García', 137.5, 526.9);
d(p1, '1234567890',              391.4, 526.9);
d(p1, 'María Laura Ríos',        218.0, 505.9);
d(p1, 'BOGOTÁ',                  392.1, 505.9);

// X en Sí — posición CONFIRMADA
d(p1, 'X', 157.1, 339.7, 10, RED, fontB);

// ══════════════════════════════════════
// PÁGINA 2
// ══════════════════════════════════════
const p2 = pdfDoc.getPage(1);

// FAVORABLE — posición CONFIRMADA
d(p2, 'FAVORABLE', 71.3, 658.4, 9, BLACK, fontB);

// Marcadores azules — posiciones ESTIMADAS para confirmar
marker(p2,  1, 390, 390);   // NO proyecto financiado banco
marker(p2,  2, 107, 302);   // VIS
marker(p2,  3, 390, 302);   // NO VIS
marker(p2,  4, 107, 215);   // Hipotecario Tradicional
marker(p2,  5, 390, 215);   // Leasing Familiar
marker(p2,  6, 215, 170);   // Leasing No Familiar

// ══════════════════════════════════════
// PÁGINA 3
// ══════════════════════════════════════
const p3 = pdfDoc.getPage(2);

// Línea del crédito — círculos estimados
marker(p3,  7, 107, 670);   // TRADICIONAL
marker(p3,  8, 107, 646);   // REMODELACIÓN
marker(p3,  9, 107, 622);   // CXI
marker(p3, 10, 107, 598);   // TRAE TU LEASING
marker(p3, 11, 107, 574);   // SOBRE PLANOS
marker(p3, 12, 390, 670);   // CONST. INDIVIDUAL
marker(p3, 13, 390, 646);   // CESIÓN
marker(p3, 14, 390, 622);   // SOSTENIBLE
marker(p3, 15, 390, 598);   // LEASEBACK

// Firma Prescriptor — posiciones CONFIRMADAS
d(p3, 'Carlos Mora López',  91.0,  502.0, 8, RED, fontB);  // sobre línea
d(p3, 'Carlos Mora López', 132.2,  464.0);
d(p3, '80123456',          128.9,  445.7);

// Firma Analista — posiciones CONFIRMADAS
d(p3, 'José Iván Motivar',  75.9,  348.8, 8, RED, fontB);  // sobre línea
d(p3, 'José Iván Motivar', 125.0,  319.4);
d(p3, '1018454647',        130.3,  304.3);

// Firma Cliente — posiciones CONFIRMADAS
d(p3, 'Juan Carlos Pérez', 367.9,  469.9, 8, RED, fontB);
d(p3, '1234567890',        365.9,  450.9);

const out = await pdfDoc.save();
writeFileSync(OUT_PATH, out);
console.log('Guardado:', OUT_PATH);
