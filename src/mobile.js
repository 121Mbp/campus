// A cover-sized camera follows the player, leaving room for the lower HUD.
const worldElement = document.querySelector('.world');
window.updateCamera = function () {
  const width = worldElement.clientWidth;
  const height = worldElement.clientHeight;
  const scale = Math.max(width / canvas.width, height / canvas.height, width < 600 ? height / 460 : 1);
  const renderedWidth = canvas.width * scale;
  const renderedHeight = canvas.height * scale;
  const targetY = height * (width < 600 ? 0.49 : 0.48);
  const left = Math.max(width - renderedWidth, Math.min(0, width * 0.5 - player.x * scale));
  const top = Math.max(height - renderedHeight, Math.min(0, targetY - player.y * scale));
  Object.assign(canvas.style, {width: `${renderedWidth}px`, height: `${renderedHeight}px`, left: `${left}px`, top: `${top}px`});
  // The prompt belongs to Hana in the world, rather than a fixed point on screen.
  const bubbleX = left + 582 * scale;
  const bubbleY = top + (426 - 66) * scale;
  Object.assign($('#interact').style, {
    left: `${Math.max(90, Math.min(width - 90, bubbleX))}px`,
    top: `${Math.max(80, bubbleY)}px`
  });
};
new ResizeObserver(window.updateCamera).observe(worldElement);
window.updateCamera();

// Pointer capture keeps held movement reliable when a finger leaves a button.
const heldDirections = new Map();
const directionButtons = [...document.querySelectorAll('[data-direction]')];
function stopMovement() {
  heldDirections.clear();
  directionButtons.forEach(button => button.classList.remove('pressed'));
}
function moveDirection(direction) {
  if (!$('#modal').open) document.dispatchEvent(new KeyboardEvent('keydown', {key: direction, bubbles: true, cancelable: true}));
}
directionButtons.forEach(button => {
  button.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    heldDirections.set(event.pointerId, button.dataset.direction);
    button.classList.add('pressed');
    moveDirection(button.dataset.direction);
  });
  const release = event => {
    heldDirections.delete(event.pointerId);
    if (![...heldDirections.values()].includes(button.dataset.direction)) button.classList.remove('pressed');
  };
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', release);
  button.addEventListener('contextmenu', event => event.preventDefault());
});
let previousMove = 0;
function movementFrame(time) {
  if ($('#modal').open) stopMovement();
  if (time - previousMove >= 55) {
    new Set(heldDirections.values()).forEach(moveDirection);
    previousMove = time;
  }
  requestAnimationFrame(movementFrame);
}
requestAnimationFrame(movementFrame);
window.addEventListener('blur', stopMovement);
document.addEventListener('visibilitychange', stopMovement);
$('#modal').addEventListener('close', stopMovement);
const dialoguePanel = document.querySelector('.dialogue');
$('#dialogueToggle').setAttribute('aria-expanded', 'true');
$('#dialogueToggle').onclick = () => {
  dialoguePanel.classList.add('collapsed');
  $('#dialogueToggle').setAttribute('aria-expanded', 'false');
};
const baseSpeak = speak;
speak = function () {
  dialoguePanel.classList.remove('collapsed');
  $('#dialogueToggle').setAttribute('aria-expanded', 'true');
  baseSpeak();
};
$('#touchUse').onclick = () => moveDirection('e');
$('#touchComputer').onclick = () => {stopMovement(); openTerminal();};
$('#questToggle').onclick = () => {
  const expanded = document.querySelector('.mission').classList.toggle('expanded');
  $('#questToggle').setAttribute('aria-expanded', String(expanded));
  $('#questToggle').setAttribute('aria-label', expanded ? '미션 접기' : '미션 펼치기');
};
$('#fullscreen').onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else modal('전체 화면 안내', '<p class="modalcopy">현재 브라우저는 전체 화면 전환을 지원하지 않아요. 모바일에서는 브라우저 메뉴의 “홈 화면에 추가”로 더 넓게 즐길 수 있어요.</p>', 'DISPLAY');
  } catch {
    modal('전체 화면 안내', '<p class="modalcopy">이 환경에서는 전체 화면 전환이 제한돼요. 게임은 현재 화면 크기에 맞춰 계속 플레이할 수 있어요.</p>', 'DISPLAY');
  }
};
document.addEventListener('fullscreenchange', () => {
  $('#fullscreen').setAttribute('aria-label', document.fullscreenElement ? '전체 화면 종료' : '전체 화면 전환');
  window.updateCamera();
});
