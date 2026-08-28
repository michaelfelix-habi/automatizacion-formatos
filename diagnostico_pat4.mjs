import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf';
const pdfDoc = await PDFDocument.load(readFileSync(PDF_PATH).buffer);
const form  = pdfDoc.getForm();
const pages = pdfDoc.getPages();

const pageMap = new Map();
pages.forEach((p, i) => pageMap.set(p.ref.objectNumber + '_' + p.ref.generationNumber, i + 1));

const getPage = w => {
  try {
    const r = w.P();
    return r ? pageMap.get(r.objectNumber + '_' + r.generationNumber) ?? '?' : '?';
  } catch { return '?'; }
};

// Mostrar TODOS los campos de página 1 con y < 200 (zona patrimonios)
console.log('\n═══ Todos los campos AcroForm en pag 1 con y < 200 ═══\n');
for (const f of form.getFields()) {
  for (const w of f.acroField.getWidgets()) {
    const pn = getPage(w);
    if (pn !== 1) continue;
    const r = w.getRectangle();
    if (r.y > 200) continue;
    console.log(`"${f.getName()}"  [${f.constructor.name}]  x=${r.x.toFixed(1)} y=${r.y.toFixed(1)} w=${r.width.toFixed(1)} h=${r.height.toFixed(1)}`);
  }
}

// También listar TODOS los checkboxes de TODAS las páginas
console.log('\n═══ Todos los PDFCheckBox del PDF ═══\n');
for (const f of form.getFields()) {
  if (f.constructor.name !== 'PDFCheckBox') continue;
  for (const w of f.acroField.getWidgets()) {
    const pn = getPage(w);
    const r = w.getRectangle();
    console.log(`pag${pn}  x=${r.x.toFixed(1)} y=${r.y.toFixed(1)}  "${f.getName()}"`);
  }
}
