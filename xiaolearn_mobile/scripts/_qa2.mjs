import fs from 'node:fs';
function lit(f,n){const s=fs.readFileSync(f,'utf8');const st=s.indexOf('{',s.indexOf('= {',s.indexOf(n)));
let d=0,i=st,q=null,e=false;for(;i<s.length;i++){const c=s[i];if(e){e=false;continue}if(c==='\\'){e=true;continue}
if(q){if(c===q)q=null;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='{'||c==='[')d++;else if(c==='}'||c===']'){d--;if(!d){i++;break}}}return s.slice(st,i)}
const E=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('data/cecrExercises.ts','EXERCISES')};`).toString('base64'))).default;

// Vrai pinyin : au moins un diacritique EXCLUSIF au pinyin (macron/caron),
// ou une syllabe suivie d'un ton entre parenthèses. Les accents partagés avec
// le français (é è à ù) ne suffisent pas à identifier du pinyin.
const PY_STRICT=/[a-zü]*[āēīōūǖǎěǐǒǔǚńňǹ][a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]*/g;
const seen=new Map(); let alt=[], lenOut=[];
for(const list of Object.values(E)) for(const e of list){
  if(!e.choicesEn?.length||e.choicesEn.length!==e.choices.length) continue;
  for(let i=0;i<e.choices.length;i++){
    const fr=String(e.choices[i]), en=String(e.choicesEn[i]);
    if(fr===en) continue;
    const a=(fr.match(PY_STRICT)||[]).join(' '), b=(en.match(PY_STRICT)||[]).join(' ');
    if(a!==b) alt.push({id:e.id,fr,en,a,b});
    const r=en.length/Math.max(1,fr.length);
    if((r>2.6||r<0.38)&&fr.length>6&&!seen.has(fr)){seen.set(fr,1);lenOut.push({fr,en,r:+r.toFixed(2)});}
  }
}
console.log('PINYIN (strict) altéré :',alt.length);
alt.slice(0,12).forEach(x=>console.log(`   « ${x.fr} » → « ${x.en} »   [${x.a} ≠ ${x.b}]`));
console.log('\nRATIOS ABERRANTS, chaînes distinctes :',lenOut.length);
lenOut.sort((x,y)=>x.r-y.r);
lenOut.forEach(x=>console.log(`   [${x.r}] « ${x.fr} » → « ${x.en} »`));
