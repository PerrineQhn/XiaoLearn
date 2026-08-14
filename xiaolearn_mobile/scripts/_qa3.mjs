import fs from 'node:fs';
function lit(f,n){const s=fs.readFileSync(f,'utf8');const st=s.indexOf('{',s.indexOf('= {',s.indexOf(n)));
let d=0,i=st,q=null,e=false;for(;i<s.length;i++){const c=s[i];if(e){e=false;continue}if(c==='\\'){e=true;continue}
if(q){if(c===q)q=null;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='{'||c==='[')d++;else if(c==='}'||c===']'){d--;if(!d){i++;break}}}return s.slice(st,i)}
const E=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('data/cecrExercises.ts','EXERCISES')};`).toString('base64'))).default;
const norm=s=>String(s).toLowerCase().replace(/[\s.,;:!?'"«»()\[\]—–-]/g,'');
const near=[];
for(const list of Object.values(E)) for(const e of list){
  if(!e.choicesEn?.length||e.choicesEn.length!==e.choices.length) continue;
  const en=e.choicesEn.map(norm), fr=e.choices.map(norm);
  for(let i=0;i<en.length;i++) for(let j=i+1;j<en.length;j++){
    if(!en[i]||!en[j]) continue;
    // une option contenue dans l'autre : « be willing » vs « be willing to help »
    const incl = en[i].includes(en[j])||en[j].includes(en[i]);
    const frIncl = fr[i].includes(fr[j])||fr[j].includes(fr[i]);
    // ne signaler que si le français, lui, distinguait bien les deux
    if(incl && !frIncl) near.push({id:e.id,a:e.choices[i],b:e.choices[j],ea:e.choicesEn[i],eb:e.choicesEn[j],correct:e.correctIndex,i,j});
  }
}
console.log('QUASI-COLLISIONS (une option anglaise contenue dans une autre, alors que le français les distinguait) :',near.length);
near.slice(0,20).forEach(x=>{
  const touche = x.correct===x.i||x.correct===x.j ? '  ⚠ concerne la bonne réponse' : '';
  console.log(`   ${x.id}${touche}`);
  console.log(`     FR « ${x.a} » | « ${x.b} »`);
  console.log(`     EN « ${x.ea} » | « ${x.eb} »`);
});
