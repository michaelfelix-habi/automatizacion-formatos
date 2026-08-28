// Lee el stream de contenido de cada página y extrae los cm+Do con posición
import { readFileSync } from 'fs';
import zlib from 'zlib';

const PDF_PATH = './formatos/formatos BBVA/CONOCIMIENTO PRUEBA EN ROJO.pdf';
const raw = readFileSync(PDF_PATH, 'binary');

// ── helpers ──
function decompress(str) {
  try { return zlib.inflateSync(Buffer.from(str,'binary')).toString('binary'); }
  catch(e) { return str; }
}

function tokenize(str) {
  const toks = [];
  const re = /(\((?:[^\\()]|\\.)*\)|<<[\s\S]*?>>|\/[\w.]+|\[[\s\S]*?\]|[^\s\[\]<>()/]+)/g;
  let m;
  while ((m = re.exec(str)) !== null) toks.push(m[1]);
  return toks;
}

// Encontrar objetos PDF por número
const objOffsets = {};
{
  const re = /(\d+)\s+\d+\s+obj\b/g;
  let m;
  while ((m = re.exec(raw)) !== null) objOffsets[m[1]] = m.index;
}

// Leer el stream de un objeto (decomprimido)
function getStream(objNum) {
  const off = objOffsets[objNum];
  if (!off) return null;
  const slice = raw.slice(off, off + 16000);
  const sm = slice.indexOf('stream');
  if (sm < 0) return null;
  let s = sm + 6;
  if (slice[s] === '\r') s++;
  if (slice[s] === '\n') s++;
  const em = slice.indexOf('endstream', s);
  if (em < 0) return null;
  return decompress(slice.slice(s, em));
}

// Encontrar objetos Page y sus /Contents
const pages = [];
for (const [num, off] of Object.entries(objOffsets)) {
  const sl = raw.slice(off, off + 2000);
  if (sl.includes('/Type /Page') && !sl.includes('/Type /Pages')) {
    const cm = sl.match(/\/Contents\s+(\d+)\s+\d+\s+R/);
    if (cm) pages.push({ pageNum: num, contentsNum: cm[1] });
    // Array de contents
    const ca = sl.match(/\/Contents\s*\[([\s\S]*?)\]/);
    if (ca && !cm) {
      const nums = [...ca[1].matchAll(/(\d+)\s+\d+\s+R/g)].map(x=>x[1]);
      if (nums.length) pages.push({ pageNum: num, contentsNum: nums[0], extra: nums.slice(1) });
    }
  }
}

console.log(`Páginas encontradas: ${pages.length}\n`);

for (let pi = 0; pi < pages.length; pi++) {
  const pg = pages[pi];
  const stream = getStream(pg.contentsNum);
  if (!stream) { console.log(`Página ${pi+1}: sin stream`); continue; }

  console.log(`\n══ PÁGINA ${pi+1} (obj ${pg.pageNum}, contents obj ${pg.contentsNum}) ══`);

  const toks = tokenize(stream);
  const ops = [];
  const stack = [];

  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    const known = ['q','Q','cm','Do','BT','ET','Tj','TJ','Tm','Td','TD','rg','RG','g','G',
                   'w','m','l','c','v','y','h','re','S','s','f','F','n','W','Tf','Tr'];
    if (known.includes(t)) {
      ops.push({ op: t, args: [...stack] });
      stack.length = 0;
    } else {
      stack.push(t);
    }
  }

  // Recorrer ops y rastrear CTM + Do
  let ctmStk = [[1,0,0,1,0,0]];
  let ctm = [1,0,0,1,0,0];

  function mul(a,b){
    return [a[0]*b[0]+a[1]*b[2],a[0]*b[1]+a[1]*b[3],
            a[2]*b[0]+a[3]*b[2],a[2]*b[1]+a[3]*b[3],
            a[4]*b[0]+a[5]*b[2]+b[4],a[4]*b[1]+a[5]*b[3]+b[5]];
  }

  for (const {op, args} of ops) {
    if (op==='q') ctmStk.push([...ctm]);
    else if (op==='Q') ctm = ctmStk.pop()||[1,0,0,1,0,0];
    else if (op==='cm') {
      const n = args.slice(-6).map(Number);
      if (n.length===6) ctm = mul(ctm, n);
    }
    else if (op==='Do') {
      const name = args[args.length-1]||'?';
      const tx = ctm[4], ty = ctm[5];
      console.log(`  Do ${name}  →  x=${tx.toFixed(1)}, y=${ty.toFixed(1)}  matrix=[${ctm.map(v=>v.toFixed(2)).join(',')}]`);
    }
  }
}
