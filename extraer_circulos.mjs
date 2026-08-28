// Extrae posiciones de los círculos (m l c re paths) por página
import { readFileSync } from 'fs';
import { getDocument, OPS } from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = './formatos/formatos BBVA/CONOCIMIENTO PRUEBA EN ROJO.pdf';

const data = new Uint8Array(readFileSync(PDF_PATH));
const doc  = await getDocument({ data, verbosity: 0 }).promise;

for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const opList = await page.getOperatorList();
  const { fnArray, argsArray } = opList;

  console.log(`\n══ PÁGINA ${p} ══`);

  // Recorrer los operadores buscando moveTo (m) seguidos de curvas bezier (c) que forman círculos
  // OPS.moveTo=13, OPS.curveTo=15, OPS.closePath=17, OPS.stroke=19
  // También buscamos: save(q)/restore(Q) y transform(cm) para saber la CTM

  let ctmStack = [[1,0,0,1,0,0]];
  let ctm = [1,0,0,1,0,0];
  const circles = [];

  function applyMatrix(m1, m2) {
    return [
      m1[0]*m2[0]+m1[1]*m2[2], m1[0]*m2[1]+m1[1]*m2[3],
      m1[2]*m2[0]+m1[3]*m2[2], m1[2]*m2[1]+m1[3]*m2[3],
      m1[4]*m2[0]+m1[5]*m2[2]+m2[4], m1[4]*m2[1]+m1[5]*m2[3]+m2[5],
    ];
  }

  function transformPt(m, x, y) {
    return [m[0]*x+m[2]*y+m[4], m[1]*x+m[3]*y+m[5]];
  }

  let inPath = false;
  let pathStart = {x:0, y:0};
  let curveCount = 0;
  let pathPoints = [];

  for (let i = 0; i < fnArray.length; i++) {
    const fn = fnArray[i];
    const args = argsArray[i];

    if (fn === OPS.save) {
      ctmStack.push([...ctm]);
    } else if (fn === OPS.restore) {
      ctm = ctmStack.pop() || [1,0,0,1,0,0];
    } else if (fn === OPS.transform) {
      const [a,b,c,d,e,f] = args;
      ctm = applyMatrix([a,b,c,d,e,f], ctm);
    } else if (fn === OPS.moveTo) {
      inPath = true;
      curveCount = 0;
      pathPoints = [];
      const [px, py] = transformPt(ctm, args[0], args[1]);
      pathStart = {x:px, y:py};
      pathPoints.push({x:px, y:py});
    } else if (fn === OPS.curveTo || fn === OPS.curveTo2 || fn === OPS.curveTo3) {
      curveCount++;
      if (args.length >= 6) {
        const [px, py] = transformPt(ctm, args[4], args[5]);
        pathPoints.push({x:px, y:py});
      }
    } else if (fn === OPS.closePath || fn === OPS.stroke || fn === OPS.fill || fn === OPS.eoFill || fn === OPS.fillStroke || fn === OPS.eoFillStroke) {
      // Si tuvimos 4 curvas bezier → probablemente un círculo
      if (curveCount === 4 && pathPoints.length >= 4) {
        // Centro aproximado: promedio de los puntos extremos
        const xs = pathPoints.map(p => p.x);
        const ys = pathPoints.map(p => p.y);
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
        const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
        const r  = (Math.max(...xs) - Math.min(...xs)) / 2;
        circles.push({cx: cx.toFixed(1), cy: cy.toFixed(1), r: r.toFixed(1)});
      }
      inPath = false;
      curveCount = 0;
      pathPoints = [];
    }
  }

  if (circles.length === 0) {
    console.log('  No se encontraron círculos Bezier (4 curvas).');
  } else {
    console.log(`  ${circles.length} círculos encontrados:`);
    circles.forEach((c, idx) => {
      console.log(`  [${idx}] centro x=${c.cx}, y=${c.cy}, radio≈${c.r}`);
    });
  }
}
