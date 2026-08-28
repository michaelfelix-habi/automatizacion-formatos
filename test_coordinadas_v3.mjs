// Test PDF con posiciones CONFIRMADAS (pdfjs) + círculos ESTIMADOS (marcadores azules)
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/CONOCIMIENTO PRUEBA EN ROJO.pdf';
const OUT_PATH = './CONOCIMIENTO_test_v3.pdf';

const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const font  = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

const BLACK = rgb(0,0,0);
const BLUE  = rgb(0,0.2,0.8);
const RED   = rgb(0.85,0,0);

// ── Helper dibujar texto ──
const d = (page, text, x, y, sz=8, color=BLACK, f=font) =>
  page.drawText(String(text||''), { x, y, size: sz, font: f, color });

// ── Helper marcador numerado azul para círculos estimados ──
const marker = (page, num, x, y) => {
  page.drawCircle({ x: x+4, y: y+4, size: 7, color: BLUE, opacity: 0.4 });
  d(page, String(num), x, y, 7, BLUE, fontB);
};

// ══════════════════════════════════════
// PÁGINA 1
// ══════════════════════════════════════
const p1 = pdfDoc.getPage(0);

// Datos Prescriptor (CONFIRMADOS por pdfjs)
d(p1, '20/08/2026',      137.5, 639.4);  // Fecha
d(p1, 'HABICREDIT',      139.4, 621.8);  // Nombre empresa
d(p1, '9010054701',      116.5, 599.5);  // NIT
d(p1, 'BOGOTÁ',          396.7, 600.8);  // Ciudad radicación

// Datos Cliente (CONFIRMADOS)
d(p1, 'Juan Carlos Pérez García', 137.5, 526.9); // Nombre cliente
d(p1, '1234567890',      391.4, 526.9);  // Cédula cliente
d(p1, 'María Laura Ríos', 218.0, 505.9); // Nombre coordinador
d(p1, 'BOGOTÁ',          392.1, 505.9);  // Ciudad residencia

// X en Sí — Validación identidad (CONFIRMADO)
d(p1, 'X', 157.1, 339.7, 10, RED, fontB);

// ══════════════════════════════════════
// PÁGINA 2
// ══════════════════════════════════════
const p2 = pdfDoc.getPage(1);

// FAVORABLE (CONFIRMADO)
d(p2, 'FAVORABLE', 71.3, 658.4, 9, BLACK, fontB);

// ── Círculos estimados — marcadores azules ──
// ¿Proyecto financiado? → siempre NO
marker(p2, 1, 390, 390);  // NO proyecto financiado

// Rango inmueble — VIS / NO VIS
marker(p2, 2, 107, 302);  // VIS
marker(p2, 3, 390, 302);  // NO VIS

// Tipo de crédito
marker(p2, 4, 107, 215);  // Hipotecario Tradicional
marker(p2, 5, 390, 215);  // Leasing Familiar
marker(p2, 6, 215, 170);  // Leasing No Familiar

// ══════════════════════════════════════
// PÁGINA 3
// ══════════════════════════════════════
const p3 = pdfDoc.getPage(2);

// Línea del crédito — círculos estimados
marker(p3, 7,  107, 670);  // TRADICIONAL (izq)
marker(p3, 8,  107, 646);  // REMODELACIÓN
marker(p3, 9,  107, 622);  // CXI
marker(p3, 10, 107, 598);  // TRAE TU LEASING
marker(p3, 11, 107, 574);  // SOBRE PLANOS
marker(p3, 12, 390, 670);  // CONST. INDIVIDUAL (der)
marker(p3, 13, 390, 646);  // CESIÓN
marker(p3, 14, 390, 622);  // SOSTENIBLE
marker(p3, 15, 390, 598);  // LEASEBACK

// Firma Prescriptor (CONFIRMADOS por pdfjs)
d(p3, 'NOMBRE BROKER',  91.0,  502.0, 8, RED, fontB);  // sobre línea
d(p3, 'NOMBRE BROKER',  132.2, 464.0);                  // campo nombre
d(p3, 'CEDULA BROKER',  128.9, 445.7);                  // cédula

// Firma Analista (CONFIRMADOS)
d(p3, 'NOMBRE ANALISTA', 75.9, 348.8, 8, RED, fontB);  // sobre línea
d(p3, 'NOMBRE ANALISTA', 125.0, 319.4);                 // campo nombre
d(p3, 'CEDULA ANALISTA', 130.3, 304.3);                 // cédula

// Firma Cliente (CONFIRMADOS)
d(p3, 'NOMBRE CLIENTE', 367.9, 469.9, 8, RED, fontB);  // campo nombre
d(p3, 'CEDULA CLIENTE', 365.9, 450.9);                  // cédula

const out = await pdfDoc.save();
writeFileSync(OUT_PATH, out);
console.log('Guardado:', OUT_PATH);
console.log('\nLeyenda marcadores azules (círculos estimados — confirmar posición):');
console.log('  1 = NO proyecto financiado banco  (pág 2)');
console.log('  2 = VIS                           (pág 2)');
console.log('  3 = NO VIS                        (pág 2)');
console.log('  4 = Hipotecario Tradicional       (pág 2)');
console.log('  5 = Leasing Familiar              (pág 2)');
console.log('  6 = Leasing No Familiar           (pág 2)');
console.log('  7 = TRADICIONAL                   (pág 3)');
console.log('  8 = REMODELACIÓN                  (pág 3)');
console.log('  9 = CXI                           (pág 3)');
console.log(' 10 = TRAE TU LEASING               (pág 3)');
console.log(' 11 = SOBRE PLANOS                  (pág 3)');
console.log(' 12 = CONST. INDIVIDUAL             (pág 3)');
console.log(' 13 = CESIÓN                        (pág 3)');
console.log(' 14 = SOSTENIBLE                    (pág 3)');
console.log(' 15 = LEASEBACK                     (pág 3)');
