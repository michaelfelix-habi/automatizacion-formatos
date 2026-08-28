import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf';
const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const form  = pdfDoc.getForm();
const pages = pdfDoc.getPages();

const pageMap = new Map();
pages.forEach((p, i) => pageMap.set(p.ref.toString(), i + 1));

// 1. Buscar todos los campos "identificacion" (nombre exacto)
console.log('\n=== CAMPOS QUE CONTIENEN "identificacion" ===');
form.getFields().forEach(f => {
  if (!f.getName().toLowerCase().includes('identif')) return;
  const widgets = f.acroField.getWidgets();
  console.log(`\nCampo: "${f.getName()}" tipo=${f.constructor.name} (${widgets.length} widget(s))`);
  widgets.forEach((w, i) => {
    const rect = w.getRectangle();
    const pageRef = w.P();
    const pageNum = pageRef ? pageMap.get(pageRef.toString()) : '?';
    console.log(`  Widget[${i}]  pág ${pageNum}  x=${rect.x.toFixed(0)} y=${rect.y.toFixed(0)} w=${rect.width.toFixed(0)} h=${rect.height.toFixed(0)}`);
  });
});

// 2. Buscar campos relacionados con patrimonios / fideicomisos
console.log('\n=== CAMPOS QUE CONTIENEN "patrim", "fidei", "autonom", "constitu" ===');
form.getFields().forEach(f => {
  const n = f.getName().toLowerCase();
  if (!n.includes('patrim') && !n.includes('fidei') && !n.includes('autonom') && !n.includes('constitu')) return;
  const widgets = f.acroField.getWidgets();
  console.log(`\nCampo: "${f.getName()}" tipo=${f.constructor.name} (${widgets.length} widget(s))`);
  widgets.forEach((w, i) => {
    const rect = w.getRectangle();
    const pageRef = w.P();
    const pageNum = pageRef ? pageMap.get(pageRef.toString()) : '?';
    console.log(`  Widget[${i}]  pág ${pageNum}  x=${rect.x.toFixed(0)} y=${rect.y.toFixed(0)} w=${rect.width.toFixed(0)} h=${rect.height.toFixed(0)}`);
  });
});

// 3. Listar TODOS los campos de la página 3 y 4 (para encontrar patrimonios)
console.log('\n=== TODOS LOS CAMPOS DE PÁGINAS 3 Y 4 ===');
form.getFields().forEach(f => {
  const widgets = f.acroField.getWidgets();
  widgets.forEach((w, i) => {
    const pageRef = w.P();
    const pageNum = pageRef ? pageMap.get(pageRef.toString()) : 0;
    if (pageNum < 3) return;
    const rect = w.getRectangle();
    console.log(`  "${f.getName()}"  tipo=${f.constructor.name}  pág ${pageNum}  x=${rect.x.toFixed(0)} y=${rect.y.toFixed(0)} w=${rect.width.toFixed(0)}`);
  });
});
