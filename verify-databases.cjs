const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes={},storage=new Map();
const drawing=new Proxy({},{get:()=>()=>{}});
function element(selector){return nodes[selector]??=(selector==='#map'?{getContext:()=>drawing}:selector==='#modal'?{showModal(){this.open=true},close(){this.open=false}}:{style:{},value:'',innerHTML:'',textContent:'',checked:true,setAttribute(){},insertAdjacentHTML(){}})}
const sandbox={document:{querySelector:element,querySelectorAll:()=>[],addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},stopMovement(){},console};
vm.createContext(sandbox);
for(const file of ['src/app.js','src/databases.js'])vm.runInContext(fs.readFileSync(file,'utf8'),sandbox);
vm.runInContext(`
for(const engine of Object.keys(DB_ROUTES)){
  chooseDatabase(engine);
  if(state.account!==currentDB().admin)throw Error(engine+' admin mismatch');
  openTerminal();$('#install').onclick();$('#start').onclick();
  if(state.ep!==1||!state.server)throw Error(engine+' install failed');
  for(let i=1;i<10;i++){
    if(i===4&&currentDB().dialect==='mysql'){
      openTerminal();$('#sql').value="CREATE USER professor WITH PASSWORD 'wrong';";run();
      if(state.ep!==i)throw Error(engine+' accepted incorrect dialect');
    }
    openTerminal();$('#sql').value=episodes[i][5];run();
    if(state.ep!==i+1)throw Error(engine+' episode '+(i+1)+' failed: '+$('#result').textContent+' '+$('#result').innerHTML);
  }
  if(engine==='timescale'&&!state.timescale)throw Error('Timescale extension not enabled');
  if(state.students.find(s=>s.student_id===1001).major!=='데이터사이언스')throw Error('Update missing');
  if(state.enrollments.some(e=>e.enrollment_id===301))throw Error('Cancellation missing');
  state.account='professor';openTerminal();$('#sql').value="SELECT * FROM students; UPDATE students SET major = '경영학' WHERE student_id = 1001;";run();
  if(!$('#result').textContent.includes('permission denied'))throw Error('Multi-statement permission bypass');
}
chooseDatabase('mysql');if(state.ep!==10||state.account!=='professor')throw Error('Saved MySQL progress missing');
chooseDatabase('postgres');if(state.ep!==10)throw Error('Saved PostgreSQL progress missing');
$('#settings').onclick();$('#resetAll').onclick();$('#yesReset').onclick();
if(state.ep!==0||state.students.length)throw Error('Current route reset failed');
chooseDatabase('mysql');if(state.ep!==10)throw Error('Reset erased another route');
`,sandbox);
for(const name of ['postgres','mysql','mariadb','timescale'])assert(storage.has('query-campus-route-'+name));
const html=fs.readFileSync('index.html','utf8');
assert(!/\?\?|\uFFFD/.test(html),'no corrupted UI labels');
for(const [,source] of html.matchAll(/(?:src|href)="(src\/assets\/[^"]+)"/g))assert(fs.existsSync(source),'image exists: '+source);
console.log('PASS: all 4 DB routes through episodes 01–10, dialects, extension, permissions, independent saves/reset, image references, UTF-8 labels');
