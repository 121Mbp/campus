// Each learning route has its own browser-local progress; switching never erases a semester.
function freshSemester(engine) {
  return {engine,ep:0,server:false,db:false,connected:false,table:false,account:DB_ROUTES[engine].admin,user:false,grant:false,students:[],enrollments:[{enrollment_id:301,student_id:1002,course_id:201},{enrollment_id:302,student_id:1001,course_id:201}],notes:[],decor:0,timescale:false};
}
function chooseDatabase(engine) {
  if (!DB_ROUTES[engine]) return;
  if (state.engine !== engine) {
    save();
    const stored = localStorage.getItem('query-campus-route-'+engine);
    state = stored ? JSON.parse(stored) : freshSemester(engine);
    state.engine = engine;
    installed = false;
    terminalDone = false;
    hint = 0;
    update();
    draw();
    $('#dialogue').textContent = currentDB().name+' 캠퍼스에 도착했어요! 이 경로의 첫 학기를 함께 준비해요.';
  }
}
function refreshDatabaseChip() {
  $('#hudLevel').textContent='Lv. '+(1+Math.floor(state.ep/2));
  $('#hudXP').style.width=(state.ep===10?100:state.ep%2*50+8)+'%';
  $('#dbName').textContent=currentDB().name;
  $('#dbIcon').src='src/assets/'+currentDB().icon+'.svg';
  $('#dbPicker').setAttribute('aria-label','학습 DB 선택 · 현재 '+currentDB().name);
}
const baseUpdate=update;
update=function(){baseUpdate();refreshDatabaseChip()};
function showDatabasePicker() {
  modal('어떤 DB와 함께할까요?',`<p class="modalcopy">나에게 맞는 학습 친구를 골라요. 각 DB의 미션과 배움 수첩은 따로 저장돼요.</p><div class="db-grid">${Object.entries(DB_ROUTES).map(([key,db])=>`<button class="db-card ${state.engine===key?'selected':''}" data-engine="${key}" aria-pressed="${state.engine===key}"><img src="src/assets/${db.icon}.svg" alt=""><span><strong>${db.name}</strong><small>${db.description}<br>localhost:${db.port} · ${db.admin}</small></span>${state.engine===key?'<span class="selected-badge">선택 중</span>':''}</button>`).join('')}</div><p class="db-note">네 가지 경로 모두 게임 속 시뮬레이션이에요. 실제 DB를 설치하거나 연결하지 않아요.<br>TimescaleDB는 PostgreSQL 기반으로, 확장 활성화 체험 후 공통 SQL 미션을 진행해요.</p><div class="db-actions"><span class="modalcopy">${currentDB().name} · ${state.ep} / 10 미션 완료</span><button id="startRoute" class="primary">${state.ep===0?'이 친구와 시작하기':'이 경로 이어하기'}</button></div>`,'CHOOSE YOUR DATABASE');
  document.querySelectorAll('[data-engine]').forEach(button=>button.onclick=()=>{chooseDatabase(button.dataset.engine);showDatabasePicker()});
  $('#startRoute').onclick=()=>openTerminal();
}
const baseOpenTerminal=openTerminal;
openTerminal=function(){
  baseOpenTerminal();
  const db=currentDB();
  $('#modalBody').insertAdjacentHTML('afterbegin',`<div class="db-path-info"><img src="src/assets/${db.icon}.svg" alt=""><div><b>${db.name} 학습 캠퍼스</b><small>나만의 첫 학기 · 게임 속 시뮬레이션</small></div><button id="changeRoute" class="option" style="margin-left:auto">DB 바꾸기</button></div>`);
  $('#changeRoute').onclick=showDatabasePicker;
};
$('#dbPicker').onclick=showDatabasePicker;
// These two handlers were assigned before the terminal decorator was installed.
$('#touchComputer').onclick=()=>{stopMovement();openTerminal()};
$('#talk').onclick=()=>speak();
$('#settings').onclick=()=>{
  modal('조금 더 편안하게',`<div class="db-path-info"><img src="src/assets/${currentDB().icon}.svg" alt=""><div><b>${currentDB().name}</b><small>${state.ep} / 10 미션 완료 · 자동 저장 중</small></div></div><p class="modalcopy">DB마다 첫 학기를 따로 이어갈 수 있어요. 다른 DB로 바꿔도 지금까지의 배움은 남아 있어요.</p><button id="settingsDB" class="option">학습 DB 바꾸기</button><button id="resetAll" class="option">현재 DB 학기 다시 시작</button><div id="resetAsk"></div>`,'MY CAMPUS');
  $('#settingsDB').onclick=showDatabasePicker;
  $('#resetAll').onclick=()=>{
    $('#resetAsk').innerHTML='<p class="modalcopy">'+currentDB().name+'의 진행과 배움 수첩을 지우고 다시 시작할까요? 다른 DB의 기록은 유지돼요.</p><button class="option" id="yesReset">이 학기 초기화하기</button>';
    $('#yesReset').onclick=()=>{state=freshSemester(state.engine);installed=false;terminalDone=false;update();draw();$('#modal').close()};
  };
};
refreshDatabaseChip();
