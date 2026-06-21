const card = document.getElementById('card');
const stage = card.parentElement;

let mouse = { x: 0, y: 0 };
let size = { w: stage.clientWidth, h: stage.clientHeight };
let state = { rx: 0, ry: 0, tx: 0, ty: 0 };

function onMove(e){
  const rect = stage.getBoundingClientRect();
  const px = ((e.clientX ?? e.touches?.[0]?.clientX) - rect.left) / rect.width;
  const py = ((e.clientY ?? e.touches?.[0]?.clientY) - rect.top) / rect.height;
  // 中心を0、範囲 -0.5 .. +0.5 にする
  mouse.x = (px - 0.5) * 2;
  mouse.y = (py - 0.5) * 2;
}
function onLeave(){
  // マウスが離れたらゆっくり元に戻す
  mouse.x = 0;
  mouse.y = 0;
}

stage.addEventListener('mousemove', onMove);
stage.addEventListener('touchmove', onMove, {passive:true});
stage.addEventListener('mouseleave', onLeave);
stage.addEventListener('touchend', onLeave);

function animate(){
  // 反応の強さ
  const maxRotate = 12; // deg
  const maxTranslate = 20; // px (レイヤーの平行移動量)
  // ターゲット回転（Yは左右、Xは上下）
  const targetRy = mouse.x * maxRotate;
  const targetRx = -mouse.y * maxRotate;
  // 線形補間（イージング）
  const lerp = (a,b,t)=> a + (b-a)*t;
  state.rx = lerp(state.rx, targetRx, 0.12);
  state.ry = lerp(state.ry, targetRy, 0.12);

  // カード全体を回転
  card.style.transform = `rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;

  // 各レイヤーに深度ごとのわずかな平行移動（パララックス）
  const layers = card.querySelectorAll('.layer');
  layers.forEach(layer=>{
    const depth = parseFloat(getComputedStyle(layer).transform.split(',')[14]) || 0; // not reliable cross-browser; we set by class instead
    // クラスで手動に深度設定
    let z = 0;
    if (layer.classList.contains('layer-back')) z = -40;
    if (layer.classList.contains('layer-mid')) z = 0;
    if (layer.classList.contains('layer-front')) z = 40;
    const tx = state.ry / maxRotate * (z>0 ? -1 : 1) * (Math.abs(z)/20) *  maxTranslate;
    const ty = state.rx / maxRotate * (z>0 ? 1 : -1) * (Math.abs(z)/20) *  maxTranslate;
    layer.style.transform = `translate(-50%,-50%) translateZ(${z}px) translate(${tx}px, ${ty}px)`;
  });

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);