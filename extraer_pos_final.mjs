// Usa pdfjs para obtener los operadores completos de cada página
// y rastrea los Do con sus matrices acumuladas
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

  // Acumular CTM manualmente con multiplicación correcta
  const ctmStack = [[1,0,0,1,0,0]];
  let ctm = [1,0,0,1,0,0];

  function mul([a,b,c,d,e,f], [a2,b2,c2,d2,e2,f2]) {
    return [a*a2+b*c2, a*b2+b*d2, c*a2+d*c2, c*b2+d*d2, e*a2+f*c2+e2, e*b2+f*d2+f2];
  }

  let doCount = 0;
  const opNames = {};
  // Invertir el mapa OPS para tener nombre → número
  for (const [k,v] of Object.entries(OPS)) opNames[v] = k;

  for (let i = 0; i < fnArray.length; i++) {
    const fn   = fnArray[i];
    const args = argsArray[i] || [];
    const name = opNames[fn] || fn;

    if (fn === OPS.save) {
      ctmStack.push([...ctm]);
    } else if (fn === OPS.restore) {
      ctm = ctmStack.length > 1 ? ctmStack.pop() : [1,0,0,1,0,0];
    } else if (fn === OPS.transform) {
      // args = [a,b,c,d,e,f]
      if (args.length >= 6) ctm = mul(ctm, [args[0],args[1],args[2],args[3],args[4],args[5]]);
    } else if (fn === OPS.paintFormXObjectBegin) {
      doCount++;
      const tx = ctm[4], ty = ctm[5];
      const sx = ctm[0], sy = ctm[3];
      if (Math.abs(tx) > 0.5 || Math.abs(ty) > 0.5) {
        console.log(`  [XObj #${doCount}]  x=${tx.toFixed(1)}, y=${ty.toFixed(1)}  sx=${sx.toFixed(2)} sy=${sy.toFixed(2)}`);
      } else {
        // Puede tener sus propias coords internas; mostrar matrix completa
        console.log(`  [XObj #${doCount}]  (en origen 0,0)  matrix=[${ctm.map(v=>v.toFixed(1)).join(',')}]`);
      }
      // Empujar la matrix del propio XObject (args[0] si es array de 6)
      if (args[0] && Array.isArray(args[0]) && args[0].length === 6) {
        ctmStack.push([...ctm]);
        ctm = mul(ctm, args[0]);
      } else {
        ctmStack.push([...ctm]);
      }
    } else if (fn === OPS.paintFormXObjectEnd) {
      ctm = ctmStack.length > 1 ? ctmStack.pop() : [1,0,0,1,0,0];
    }
  }
  console.log(`  Total XObjects invocados: ${doCount}`);
}
