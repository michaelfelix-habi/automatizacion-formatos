import { readFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = './formatos/formatos BBVA/CONOCIMIENTO PRUEBA EN ROJO.pdf';

const data = new Uint8Array(readFileSync(PDF_PATH));
const doc  = await getDocument({ data, verbosity: 0 }).promise;

console.log(`Páginas: ${doc.numPages}\n`);

for (let p = 1; p <= doc.numPages; p++) {
  const page    = await doc.getPage(p);
  const vp      = page.getViewport({ scale: 1 });
  const content = await page.getTextContent({ includeMarkedContent: false });
  const ops     = await page.getOperatorList();

  console.log(`\n══ PÁGINA ${p} (${vp.width.toFixed(0)} x ${vp.height.toFixed(0)} pts — y desde abajo) ══`);

  for (const item of content.items) {
    if (!item.str || !item.str.trim()) continue;
    const x = item.transform[4];
    const y = item.transform[5];
    console.log(`  x=${x.toFixed(1)}, y=${y.toFixed(1)}  →  "${item.str}"`);
  }
}
