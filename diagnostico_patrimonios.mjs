import { PDFDocument, PDFName } from 'pdf-lib';
import { readFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf';
const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const form  = pdfDoc.getForm();
const pages = pdfDoc.getPages();

const pageMap = new Map();
pages.forEach((p, i) => pageMap.set(p.ref.toString(), i + 1));

const fields = form.getFields();
console.log('\n═══ Todos los campos que contienen "fideico" o "patrimonio" (insensible a mayúsculas) ═══\n');
for (const f of fields) {
  const name = f.getName().toLowerCase();
  if (!name.includes('fideico') && !name.includes('patrimonio')) continue;
  const type = f.constructor.name;
  const widgets = f.acroField.getWidgets();
  console.log(`Campo: "${f.getName()}"  [${type}]  (${widgets.length} widget(s))`);
  widgets.forEach((w, i) => {
    const rect = w.getRectangle();
    const pageRef = w.P();
    const pageNum = pageRef ? pageMap.get(pageRef.toString()) : '?';
    const onVal = w.dict.get(PDFName.of('AS'))?.toString?.() ?? '—';
    console.log(`  Widget[${i}]  pag ${pageNum}  x=${rect.x.toFixed(1)} y=${rect.y.toFixed(1)} w=${rect.width.toFixed(1)} h=${rect.height.toFixed(1)}  AS=${onVal}`);
  });
}

// También mostrar el estado actual del campo si existe
console.log('\n═══ Intentando leer los checkboxes ═══\n');
['Fideicomisos', 'fideicomisis', 'fideicomisos', 'Fideicomisis', 'FIDEICOMISOS'].forEach(n => {
  try {
    const cb = form.getCheckBox(n);
    console.log(`getCheckBox("${n}") → OK, isChecked=${cb.isChecked()}`);
  } catch(e) {
    console.log(`getCheckBox("${n}") → ERROR: ${e.message}`);
  }
});

// Listar todos los checkboxes de la página donde debería estar (página con declaración)
console.log('\n═══ Todos los campos de tipo checkbox ═══\n');
for (const f of fields) {
  if (f.constructor.name !== 'PDFCheckBox') continue;
  const widgets = f.acroField.getWidgets();
  widgets.forEach((w, i) => {
    const rect = w.getRectangle();
    const pageRef = w.P();
    const pageNum = pageRef ? pageMap.get(pageRef.toString()) : '?';
    // Solo mostrar campos en páginas 4-6 (donde suele estar patrimonios)
    if (pageNum < 4) return;
    console.log(`"${f.getName()}"  pag ${pageNum}  x=${rect.x.toFixed(1)} y=${rect.y.toFixed(1)}`);
  });
}
