import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf';
const data = new Uint8Array(readFileSync(PDF_PATH));
const doc  = await getDocument({ data, verbosity: 0 }).promise;

// Mostrar TODO el texto de página 1, ordenado por y descendente (de arriba a abajo)
const page1 = await doc.getPage(1);
const content = await page1.getTextContent({ includeMarkedContent: false });

const items = content.items
  .filter(i => i.str && i.str.trim())
  .map(i => ({ x: i.transform[4], y: i.transform[5], str: i.str }))
  .sort((a, b) => b.y - a.y);

console.log('\n══ PÁGINA 1 completa (orden descendente y) ══');
items.forEach(i => console.log(`  y=${i.y.toFixed(1).padStart(6)}  x=${i.x.toFixed(1).padStart(6)}  "${i.str}"`));

// También ver lo que hay alrededor de y=100-150 (zona inferior donde está la pregunta)
console.log('\n══ Detalle zona y=60–180 (pregunta patrimonios) ══');
items.filter(i => i.y >= 60 && i.y <= 180)
  .forEach(i => console.log(`  y=${i.y.toFixed(1).padStart(6)}  x=${i.x.toFixed(1).padStart(6)}  "${i.str}"`));

// Y zona y=600-700 donde están los widgets
console.log('\n══ Detalle zona y=600–720 (donde están los widgets) ══');
items.filter(i => i.y >= 600 && i.y <= 720)
  .forEach(i => console.log(`  y=${i.y.toFixed(1).padStart(6)}  x=${i.x.toFixed(1).padStart(6)}  "${i.str}"`));
