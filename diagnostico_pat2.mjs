import { PDFDocument, PDFName } from 'pdf-lib';
import { readFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = './formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf';
const rawBytes = readFileSync(PDF_PATH);

// ─── pdf-lib: encontrar en qué página real están los widgets ───
const pdfDoc = await PDFDocument.load(rawBytes.buffer);
const pages  = pdfDoc.getPages();
console.log(`\nTotal páginas (pdf-lib): ${pages.length}`);

const pageMap = new Map();
pages.forEach((p, i) => {
  pageMap.set(p.ref.objectNumber + '_' + p.ref.generationNumber, i + 1);
});

const form = pdfDoc.getForm();
for (const fname of ['Fideicomisos', 'fideicomisis']) {
  try {
    const f = form.getCheckBox(fname);
    const widgets = f.acroField.getWidgets();
    widgets.forEach((w, i) => {
      const rect = w.getRectangle();
      // Intentar obtener número de página de varias formas
      let pageNum = '?';
      try {
        const pRef = w.P();
        if (pRef) {
          const key = pRef.objectNumber + '_' + pRef.generationNumber;
          pageNum = pageMap.get(key) ?? `ref=${pRef.objectNumber}`;
        }
      } catch(e) {}
      console.log(`"${fname}" Widget[${i}]: pag=${pageNum}  x=${rect.x.toFixed(1)} y=${rect.y.toFixed(1)} w=${rect.width.toFixed(1)} h=${rect.height.toFixed(1)}`);
    });
  } catch(e) { console.log(`"${fname}" → ${e.message}`); }
}

// ─── pdfjs: buscar texto "patrimonio" o "fideicomi" en cada página ───
const data = new Uint8Array(rawBytes);
const doc  = await getDocument({ data, verbosity: 0 }).promise;
console.log(`\nTotal páginas (pdfjs): ${doc.numPages}`);

for (let p = 1; p <= doc.numPages; p++) {
  const page    = await doc.getPage(p);
  const content = await page.getTextContent({ includeMarkedContent: false });
  const { height } = page.getViewport({ scale: 1 });

  for (const item of content.items) {
    const s = (item.str || '').toLowerCase();
    if (s.includes('patrimonio') || s.includes('fideicomi') || s.includes('constituido')) {
      const x = item.transform[4];
      const y = item.transform[5];
      console.log(`Pag ${p}: x=${x.toFixed(1)} y=${y.toFixed(1)}  → "${item.str}"`);
    }
  }
}
