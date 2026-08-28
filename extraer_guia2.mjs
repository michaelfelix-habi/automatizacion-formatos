import { readFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = './formatos/formatos BBVA/FORMATO CONOCIMIENTO DE CLIENTE GUIA 2.pdf';
const data = new Uint8Array(readFileSync(PDF_PATH));
const doc  = await getDocument({ data, verbosity: 0 }).promise;

console.log(`Páginas: ${doc.numPages}\n`);

for (let p = 1; p <= doc.numPages; p++) {
  const page    = await doc.getPage(p);
  const content = await page.getTextContent({ includeMarkedContent: false });
  const { width, height } = page.getViewport({ scale: 1 });

  console.log(`\n══ PÁGINA ${p} (${width.toFixed(0)} x ${height.toFixed(0)}) ══`);

  for (const item of content.items) {
    if (!item.str || !item.str.trim()) continue;
    const x = item.transform[4];
    const y = item.transform[5];
    console.log(`  x=${x.toFixed(1)}, y=${y.toFixed(1)}  →  "${item.str}"`);
  }
}
