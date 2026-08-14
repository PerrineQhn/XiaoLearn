import fs from 'node:fs';
function lit(f,n){const s=fs.readFileSync(f,'utf8');const st=s.indexOf('{',s.indexOf('= {',s.indexOf(n)));
let d=0,i=st,q=null,e=false;for(;i<s.length;i++){const c=s[i];if(e){e=false;continue}if(c==='\\'){e=true;continue}
if(q){if(c===q)q=null;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='{'||c==='[')d++;else if(c==='}'||c===']'){d--;if(!d){i++;break}}}return s.slice(st,i)}
const E=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('data/cecrExercises.ts','EXERCISES')};`).toString('base64'))).default;

const norm=s=>String(s).toLowerCase().replace(/[\s.,;:!?'"«»()\[\]—–-]/g,'');
let coll=[], collFrOk=0, lenOut=[], pyChanged=[], n=0;

// pinyin présent dans le français : doit se retrouver identique en anglais
const PY=/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ][a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]*/g;

for(const [lesson,list] of Object.entries(E)) for(const e of list){
  if(!e.choicesEn?.length || e.choicesEn.length!==e.choices.length) continue;
  n++;
  // 1. collisions : deux propositions anglaises identiques
  const setEn=new Set(e.choicesEn.map(norm));
  const setFr=new Set(e.choices.map(norm));
  if(setEn.size<e.choicesEn.length){
    coll.push({lesson,id:e.id,fr:e.choices,en:e.choicesEn});
    if(setFr.size===e.choices.length) collFrOk++;
  }
  for(let i=0;i<e.choices.length;i++){
    const fr=String(e.choices[i]), en=String(e.choicesEn[i]);
    if(fr===en) continue;
    // 2. ratio de longueur aberrant
    const r=en.length/Math.max(1,fr.length);
    if((r>2.6||r<0.38) && fr.length>6) lenOut.push({id:e.id,fr,en,r:r.toFixed(2)});
    // 3. pinyin altéré
    const a=(fr.match(PY)||[]).join(' '), b=(en.match(PY)||[]).join(' ');
    if(a && a!==b) pyChanged.push({id:e.id,fr,en});
  }
}
console.log('exercices bilingues contrôlés :',n);
console.log('\n1. COLLISIONS (deux réponses anglaises identiques) :',coll.length,'— dont',collFrOk,'où le français était distinct');
coll.slice(0,8).forEach(c=>{console.log('   '+c.id);console.log('     FR '+JSON.stringify(c.fr));console.log('     EN '+JSON.stringify(c.en));});
console.log('\n2. RATIOS DE LONGUEUR ABERRANTS :',lenOut.length);
lenOut.slice(0,10).forEach(x=>console.log(`   [${x.r}] « ${x.fr} » → « ${x.en} »`));
console.log('\n3. PINYIN ALTÉRÉ :',pyChanged.length);
pyChanged.slice(0,10).forEach(x=>console.log(`   « ${x.fr} » → « ${x.en} »`));
