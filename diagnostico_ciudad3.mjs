import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf';
const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const form  = pdfDoc.getForm();
const pages = pdfDoc.getPages();

// Construir mapa página → índice
const pageMap = new Map();
pages.forEach((p, i) => pageMap.set(p.ref.toString(), i + 1));

// Mostrar todos los campos que contienen "ciudad" en el nombre
const fields = form.getFields();
for (const f of fields) {
  if (!f.getName().toLowerCase().includes('ciudad')) continue;
  const widgets = f.acroField.getWidgets();
  console.log(`\nCampo: "${f.getName()}" (${widgets.length} widget(s))`);
  widgets.forEach((w, i) => {
    const rect = w.getRectangle();
    const pageRef = w.P();
    const pageNum = pageRef ? pageMap.get(pageRef.toString()) : '?';
    console.log(`  Widget[${i}]  página ${pageNum}  x=${rect.x.toFixed(0)} y=${rect.y.toFixed(0)} w=${rect.width.toFixed(0)} h=${rect.height.toFixed(0)}`);
  });
}
