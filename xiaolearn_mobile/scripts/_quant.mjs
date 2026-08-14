import fs from 'node:fs';
function lit(f,n){const s=fs.readFileSync(f,'utf8');const st=s.indexOf('{',s.indexOf('= {',s.indexOf(n)));
let d=0,i=st,q=null,e=false;for(;i<s.length;i++){const c=s[i];if(e){e=false;continue}if(c==='\\'){e=true;continue}
if(q){if(c===q)q=null;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='{'||c==='[')d++;else if(c==='}'||c===']'){d--;if(!d){i++;break}}}return s.slice(st,i)}
const N=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('data/cecrExercises.ts','EXERCISES')};`).toString('base64'))).default;
const B=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('/tmp/before-trad.ts','EXERCISES')};`).toString('base64'))).default;
const idx=o=>{const m=new Map();for(const l of Object.values(o))for(const e of l)m.set(e.id,e);return m};
const A=idx(B), C=idx(N);

// mots français courts ou nets, y compris ceux que mon filtre a manqués
const FR=/(^|[^a-zà-ÿ])(où|ça|çà|là|et|ou|le|la|les|un|une|des|du|de|au|aux|est|sont|ce|cette|qui|que|pour|avec|sans|dans|sur|très|tout|tous|toute|pas|ne|il|elle|nous|vous|leur|mon|ma|ton|ta|son|sa|par|en|se|si|mais|donc|car|quand|comme|aussi|même|entre|vers|chez|après|avant|depuis|être|avoir|faire|dire|aller|voir|peut|doit|faut|vas|es-tu|né)([^a-zà-ÿ]|$)/i;
const FRACC=/[âçêëîïôûœæ]/;

let frResiduel=[], frResiduelMien=0;
for(const [id,e] of C){
  if(!e.choicesEn?.length) continue;
  for(let i=0;i<e.choicesEn.length;i++){
    const en=String(e.choicesEn[i]).replace(/[一-鿿]/g,' ');
    if(!/[a-zà-ÿ]/i.test(en)) continue;
    if(FR.test(en)||FRACC.test(en)){
      const mien = JSON.stringify(A.get(id)?.choicesEn)!==JSON.stringify(e.choicesEn);
      frResiduel.push({id,en:e.choicesEn[i],mien,correct:e.correctIndex===i});
      if(mien) frResiduelMien++;
    }
  }
}
console.log('── FRANÇAIS RÉSIDUEL dans choicesEn ──');
console.log('total :',frResiduel.length,'· introduits par la traduction :',frResiduelMien,'· préexistants :',frResiduel.length-frResiduelMien);
console.log('dont sur la BONNE réponse :',frResiduel.filter(x=>x.correct).length);
frResiduel.filter(x=>x.mien).slice(0,20).forEach(x=>console.log(`   ${x.id}${x.correct?' ⚠bonne réponse':''} : « ${x.en} »`));

// promptEn où le chinois a été traduit (préexistant, hors de mon périmètre)
let promptZh=0, promptIds=[];
for(const [id,e] of C){
  const zhP=(String(e.prompt).match(/[一-鿿]/g)||[]).length;
  const zhE=(String(e.promptEn??'').match(/[一-鿿]/g)||[]).length;
  if(zhP>=4 && zhE<zhP*0.4){promptZh++; promptIds.push(id);}
}
console.log('\n── promptEn dont le chinois a disparu (préexistant) ──');
console.log('total :',promptZh);
console.log('  '+promptIds.slice(0,12).join('\n  '));

// explanationEn identique au français
let explFr=0;
for(const [,e] of C) if(e.explanation && e.explanationEn && e.explanation===e.explanationEn) explFr++;
console.log('\n── explanationEn strictement identique au français ──');
console.log('total :',explFr);

// exercices pairError générés par moi
let pe=0; for(const [id,e] of C) if(id.includes('-gen') && /Une seule de ces traductions/.test(e.prompt)) pe++;
console.log('\n── exercices « une seule traduction fausse » que j\'ai générés ──', pe);
