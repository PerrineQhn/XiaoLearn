import fs from 'node:fs';
function lit(f,n){const s=fs.readFileSync(f,'utf8');const st=s.indexOf('{',s.indexOf('= {',s.indexOf(n)));
let d=0,i=st,q=null,e=false;for(;i<s.length;i++){const c=s[i];if(e){e=false;continue}if(c==='\\'){e=true;continue}
if(q){if(c===q)q=null;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}
if(c==='{'||c==='[')d++;else if(c==='}'||c===']'){d--;if(!d){i++;break}}}return s.slice(st,i)}
const E=(await import('data:text/javascript;base64,'+Buffer.from(`export default ${lit('data/cecrExercises.ts','EXERCISES')};`).toString('base64'))).default;
const FRENCH_ONLY=/[âçêëîïôûœæ]/i, PINYIN_ONLY=/[āēīōūǎěǐǒǔǖǘǚǜńňǹ]/;
const FRENCH_MARKERS=/\b(le|la|les|un|une|des|du|de|au|aux|et|ou|est|sont|ce|cette|ces|qui|que|quoi|pour|avec|sans|dans|sur|plus|moins|très|tout|tous|toute|pas|ne|on|il|elle|nous|vous|ils|elles|son|sa|ses|leur|mon|ma|mes|ton|ta|tes|par|en|se|si|mais|donc|car|quand|comme|aussi|même|entre|vers|chez|après|avant|depuis|jusqu|faire|dire|aller|voir|avoir|être|peut|doit|faut|oral|écrit|formel|familier|sens|verbe|nom|action|état)\b/i;
const FRENCH_SHORT=/(^|[^a-zà-ÿ])(où|ça|çà|là|il|ils|elle|ou|et|un|une|le|la|les|de|du|des|au|ne|se|si|ma|ta|sa|mon|ton|son|en|par|sur|pas|que|qui|est|ai|as|va|vas|es)([^a-zà-ÿ]|$)/i;
const HANZI_PINYIN=/^[一-鿿…\s]+[—–-]\s*[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ\s'·]+$/i;
function need(c){const s=String(c??'').trim();if(!s)return false;if(HANZI_PINYIN.test(s))return false;
const l=s.replace(/[一-鿿]/g,' ').trim();if(!l||!/[a-zA-ZÀ-ÿ]/.test(l))return false;
if(FRENCH_ONLY.test(l)||FRENCH_MARKERS.test(l)||FRENCH_SHORT.test(l))return true;
if(!/[a-zA-ZÀ-ÿ]{3,}/.test(l))return false; if(PINYIN_ONLY.test(l))return false;
return /[a-zA-ZÀ-ÿ]{4,}/.test(l);}
const todo=new Set(); const ex=[];
for(const l of Object.values(E)) for(const e of l){
  if(!e.choicesEn?.length||e.choicesEn.length!==e.choices.length) continue;
  const hit=[];
  for(let i=0;i<e.choices.length;i++)
    if(String(e.choices[i])===String(e.choicesEn[i]) && need(e.choices[i])) {todo.add(String(e.choices[i]).trim()); hit.push(i);}
  if(hit.length) ex.push({id:e.id,hit,choices:e.choices,correct:e.correctIndex});
}
console.log('exercices à réparer :',ex.length,'· chaînes distinctes :',todo.size);
console.log('dont touchant la bonne réponse :',ex.filter(x=>x.hit.includes(x.correct)).length);
fs.writeFileSync('scripts/repair-todo.json',JSON.stringify([...todo].sort((a,b)=>a.localeCompare(b,'fr')),null,1));
console.log('\n'+[...todo].sort((a,b)=>a.localeCompare(b,'fr')).map(s=>'  '+s).join('\n'));
