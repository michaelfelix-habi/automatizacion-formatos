import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';

const PDF_PATH = './formatos/formatos BBVA/Formato Vinculacion Persona Natural.pdf';
const bytes = readFileSync(PDF_PATH);
const pdfDoc = await PDFDocument.load(bytes.buffer);
const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const BLACK = rgb(0, 0, 0);

const p0 = pdfDoc.getPage(0);

// Campo real: "FIDUCIA" — Sí: Widget[0] x=210.3 y=115.1, No: Widget[1] x=232.1 y=115.1
p0.drawText('X', { x: 210.5, y: 115.5, size: 6, font: fontB, color: BLACK }); // Sí
p0.drawText('X', { x: 232.3, y: 115.5, size: 6, font: fontB, color: BLACK }); // No

// Marcar bordes en rojo para verificar alineación
p0.drawRectangle({ x: 210.3, y: 115.1, width: 8.8, height: 7.7, borderColor: rgb(1,0,0), borderWidth: 0.5 });
p0.drawRectangle({ x: 232.1, y: 115.1, width: 8.6, height: 7.7, borderColor: rgb(1,0,0), borderWidth: 0.5 });

const out = await pdfDoc.save();
writeFileSync('./VINC_patrimonios_test.pdf', out);
console.log('Guardado: VINC_patrimonios_test.pdf');
console.log('Casilla Sí: x=210.3 y=115.1 w=8.8 h=7.7');
console.log('Casilla No: x=232.1 y=115.1 w=8.6 h=7.7');
