const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function element() {
  const classes = new Set();
  return {style:{}, handlers:{}, attrs:{}, classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c),toggle(c){if(classes.has(c)){classes.delete(c);return false}classes.add(c);return true}},addEventListener(name,fn){this.handlers[name]=fn},setPointerCapture(){},setAttribute(k,v){this.attrs[k]=v}};
}
const elements = Object.fromEntries(['.world','#modal','#touchUse','#touchComputer','#questToggle','.mission','#fullscreen','#interact','.dialogue','#dialogueToggle'].map(key=>[key,element()]));
Object.assign(elements['.world'], {clientWidth:390,clientHeight:844});
const buttons = ['w','a','s','d'].map(direction=>Object.assign(element(),{dataset:{direction}}));
const events = [];
let frame;
const sandbox = {window:{addEventListener(){}},document:{querySelector:key=>elements[key],querySelectorAll:()=>buttons,addEventListener(){},dispatchEvent:event=>events.push(event),documentElement:{}},canvas:{width:1056,height:640,style:{}},player:{x:532,y:438},ResizeObserver:class{observe(){}},requestAnimationFrame:fn=>{frame=fn},KeyboardEvent:class{constructor(type,args){this.type=type;Object.assign(this,args)}},$:key=>elements[key],openTerminal(){},speak(){},modal(){}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('src/mobile.js','utf8'),sandbox);
for(const [width,height] of [[390,844],[844,390],[1440,900]]) {
  Object.assign(elements['.world'],{clientWidth:width,clientHeight:height});
  sandbox.window.updateCamera();
  const s=sandbox.canvas.style,w=parseFloat(s.width),h=parseFloat(s.height),x=parseFloat(s.left),y=parseFloat(s.top);
  assert(w>=width && h>=height, 'camera fills viewport');
  assert(x<=0 && y<=0 && x+w>=width-0.01 && y+h>=height-0.01,'no blank map edges');
}
const up=buttons[0];
up.handlers.pointerdown({pointerType:'touch',pointerId:1,preventDefault(){}});
assert.equal(events.at(-1).key,'w');
frame(100);
assert.equal(events.length,2,'held touch repeats movement');
up.handlers.pointercancel({pointerId:1});
frame(200);
assert.equal(events.length,2,'cancelled touch stops movement');
up.handlers.pointerdown({pointerType:'touch',pointerId:2,preventDefault(){}});
elements['#modal'].open=true;
frame(300);
assert.equal(up.classList.contains('pressed'),false,'dialog clears held touch');
elements['#questToggle'].onclick();
assert.equal(elements['#questToggle'].attrs['aria-expanded'],'true');
elements['#dialogueToggle'].onclick();
assert(elements['.dialogue'].classList.contains('collapsed'),'dialogue can collapse');
sandbox.speak();
assert(!elements['.dialogue'].classList.contains('collapsed'),'talk restores dialogue');
console.log('PASS: portrait/landscape/desktop camera, held touch, pointer cancellation, dialog stop, mission toggle');
