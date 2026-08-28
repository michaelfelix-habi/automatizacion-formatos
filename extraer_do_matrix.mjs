// Extrae cada invocación "Do" (Form XObject) en las páginas y la posición donde se colocan
import { readFileSync } from 'fs';
import { getDocument, OPS } from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = './formatos/formatos BBVA/CONOCIMIENTO PRUEBA EN ROJO.pdf';
const data = new Uint8Array(readFileSync(PDF_PATH));
const doc  = await getDocument({ data, verbosity: 0 }).promise;

for (let p = 1; p <= doc.numPages; p++) {
  const page   = await doc.getPage(p);
  const opList = await page.getOperatorList();
  const { fnArray, argsArray } = opList;
  console.log(`\n══ PÁGINA ${p} ══`);

  // Rastrear CTM acumulado
  let ctmStack = [[1,0,0,1,0,0]];
  let ctm = [1,0,0,1,0,0];

  function multiply(a, b) {
    return [
      a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3],
      a[2]*b[0]+a[3]*b[2], a[2]*b[1]+a[3]*b[3],
      a[4]*b[0]+a[5]*b[2]+b[4], a[4]*b[1]+a[5]*b[3]+b[5],
    ];
  }

  for (let i = 0; i < fnArray.length; i++) {
    const fn = fnArray[i];
    const args = argsArray[i];
    if (fn === OPS.save)      ctmStack.push([...ctm]);
    else if (fn === OPS.restore) ctm = ctmStack.pop() || [1,0,0,1,0,0];
    else if (fn === OPS.transform) ctm = multiply(ctm, args);
    else if (fn === OPS.paintFormXObjectBegin) {
      // args[0] = matrix del XObject propio
      // La posición de traslación del XObject en la página = CTM[4], CTM[5]
      const tx = ctm[4].toFixed(1);
      const ty = ctm[5].toFixed(1);
      const sx = ctm[0].toFixed(3);  // escala x
      const sy = ctm[3].toFixed(3);  // escala y
      console.log(`  XObj → traslación: x=${tx}, y=${ty}  escala: sx=${sx}, sy=${sy}`);
    }
  }
}
