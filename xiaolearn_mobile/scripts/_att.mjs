import fs from 'node:fs';
function lit(f,n){const s=fs.readFileSync(f,'utf8');const st=s.indexOf('{',s.indexOf('= {',s.indexOf(n)));
let d=0,i=st,q=null,e=false;for(;i<s.length;i++){const c=s[i];if(e){e=false;continue}if(c==='\\'){e=true;continue}
if(q){if(c===q)q=null;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='{'||c==='[')d++;else if(c==='}'||c===']'){d--;if(!d){i++;break}}}return s.slice(st,i)}
const now=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('data/cecrExercises.ts','EXERCISES')};`).toString('base64'))).default;
const before=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('/tmp/before-trad.ts','EXERCISES')};`).toString('base64'))).default;
const idx=o=>{const m=new Map();for(const l of Object.values(o))for(const e of l)m.set(e.id,e);return m};
const A=idx(before), B=idx(now);
const ids=['cecr-b11-conv-m4-mcq1','cecr-b11-emo-m3-mcq-1','cecr-b11-emo-m3-mcq-2','cecr-a1-hello-m4-trans-zh2fr','cecr-a2-conversation-m1-gen2','cecr-c11-chengyu-basic-m2-gen3','cecr-b11-nuances-m1-gen2'];
for(const id of ids){
  const a=A.get(id), b=B.get(id);
  const touched = JSON.stringify(a?.choicesEn)!==JSON.stringify(b?.choicesEn);
  console.log(`\n▸ ${id}   ${touched?'*** MODIFIÉ par la traduction ***':'inchangé (préexistant)'}`);
  console.log('  choicesEn AVANT : '+JSON.stringify(a?.choicesEn));
  console.log('  choicesEn APRÈS : '+JSON.stringify(b?.choicesEn));
}
