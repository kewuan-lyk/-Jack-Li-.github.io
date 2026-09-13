// =========================================================================
//  Cyber Crossy 2077 - 双重维度切换版 (Dual-Dimension Edition)
//  • 全荧光绿赛博黑客：高光霓虹材质，彻底与环境反差凸显
//  • 炫彩霓虹摩天楼：多层青、粉、黄、紫高楼灯带与全息广告牌
//  • 拓宽密集车道与红色“防火墙车辆”：超高速拦截飞艇 + 重型堡垒
//  • 核心新玩法：[空格键] 双重维度切换
//      - 维度 A (物理网络)：深黑底色，满街致命红色防火墙车流
//      - 维度 B (深层数据)：粉紫世界，车辆虚化无碰撞，但地面撕裂出“代码断层”黑洞！
//      - 维度 B 时间压迫：逗留时间越长，代码断层生成率越高
//  • 河流芯片浮木大幅加密，跳跃横渡更爽快
// =========================================================================

// ── 1. 双语语言包 (I18N Dictionary) ──────────────────────────────
const I18N = {
  en: {
    scoreLabel: "NODES",
    bestLabel: "TOP",
    controlsTip: "⌨️ WASD to Move · [SPACE] Dimension Shift · [ESC] Pause",
    startTitle: "<span>CYBER</span> CROSSY",
    startDesc: "Infiltrate the sprawl as a neon green hacker! Press [SPACE] to shift between Physical Net (evade Firewall trucks) and Deep Data (ghost through cars, avoid Glitch Voids)!",
    btnStart: "JACK IN",
    btnRestart: "RETRY LINK",
    pauseTitle: "⏸️ <span>SYSTEM</span> PAUSED",
    pauseDesc: "Data uplink suspended. Press [ESC] or click below to resume infiltration.",
    btnResume: "RESUME",
    btnPauseRestart: "RESTART RUN",
    scoreSummaryCur: "Transferred Nodes",
    scoreSummaryBest: "Top Infiltration",
    langBtn: "🌐 EN",
    soundBtnTitle: "Toggle Cyber Audio",
    langBtnTitle: "Switch Language",
    pauseBtnTitle: "Pause Run (ESC)",
    dimBtnA: "🔴 DIM A: NET",
    dimBtnB: "🟣 DIM B: DATA",
    deathTitles: {
      hit: "💥 CRUSHED BY FIREWALL TRUCK!",
      drown: "⚡ DISSOLVED IN DATA STREAM!",
      train: "🚄 DISINTEGRATED BY MAGLEV!",
      eagle: "🚨 ARASAKA DRONE NEUTRALIZED!",
      out: "🪵 PACKET DRIFTED OUT OF BOUNDS!",
      void: "🕳️ PLUMMETED INTO CODE FAULT!"
    },
    deathReasons: {
      hit: "Heavy Firewall vehicle collision in Dimension A! Shift into Dimension B [SPACE] to ghost through heavy traffic!",
      drown: "Fell into the high-voltage cyber plasma! Always align with holographic data pads!",
      train: "Hyperloop transit moves at mach speeds! Pay heed to the flashing holographic alarms!",
      eagle: "Stayed in one terminal too long! Corporate hunter gunships traced your IP!",
      out: "You drifted beyond network perimeter! Maintain positioning within the grid!",
      void: "You stepped into a Glitch Void in Dimension B! Staying in Deep Data too long multiplies Code Fault density!"
    }
  },
  zh: {
    scoreLabel: "数据节点",
    bestLabel: "最高记录",
    controlsTip: "⌨️ WASD 移动 · [空格键] 维度切换 · [ESC] 暂停游戏",
    startTitle: "<span>CYBER</span> CROSSY",
    startDesc: "化身荧光绿黑客入侵赛博都市！按 [空格键] 在物理网络（避让红色防火墙大军）与深层数据（虚化穿车，但需防范代码断层黑洞）间随时切换！",
    btnStart: "接入网络",
    btnRestart: "重新接入",
    pauseTitle: "⏸️ <span>系统</span> 挂起暂停",
    pauseDesc: "数据链路已暂停。按 [ESC] 键或点击下方按钮继续潜行。",
    btnResume: "继续潜行",
    btnPauseRestart: "重新开始",
    scoreSummaryCur: "本次上传节点",
    scoreSummaryBest: "最高入侵记录",
    langBtn: "🌐 中文",
    soundBtnTitle: "切换赛博音效",
    langBtnTitle: "切换语言",
    pauseBtnTitle: "暂停游戏 (ESC)",
    dimBtnA: "🔴 维度A: 网络",
    dimBtnB: "🟣 维度B: 数据",
    deathTitles: {
      hit: "💥 被红色防火墙车碾碎！",
      drown: "⚡ 跌入离子流融解！",
      train: "🚄 磁悬浮列车湮灭！",
      eagle: "🚨 被企业巡逻机捕获！",
      out: "🪵 数据包漂出网络边界！",
      void: "🕳️ 坠入深层代码断层黑洞！"
    },
    deathReasons: {
      hit: "在物理网络(维度A)遭遇防火墙重击！按 [空格键] 切换至深层数据(维度B)可虚化穿透车辆！",
      drown: "坠入高压等离子赛博数据流！起跳必须精准踩中全息芯片！",
      train: "磁悬浮超回路列车以极速呼啸穿梭！红灯闪烁切勿强行翻轨！",
      eagle: "在终端停留过久！企业安全巡逻武装无人机已锁定并消除你的IP！",
      out: "随芯片漂流超出网络防线！请时刻保持在网格视界内！",
      void: "在深层数据(维度B)踩中代码断层黑洞！停留越久断层生成率越高，必须及时切回物理网络！"
    }
  }
};

let currentLang = localStorage.getItem('crossy_lang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('crossy_lang', lang);
  const t = I18N[lang] || I18N.en;

  // HUD
  const scoreLabelEl = document.querySelector('#score-wrap .label');
  if (scoreLabelEl) scoreLabelEl.textContent = t.scoreLabel;

  const bestWrapEl = document.getElementById('best-wrap');
  const bestVal = document.getElementById('best-val') ? document.getElementById('best-val').textContent : '0';
  if (bestWrapEl) bestWrapEl.innerHTML = `${t.bestLabel} <span id="best-val">${bestVal}</span>`;

  const tipEl = document.getElementById('controls-tip');
  if (tipEl) tipEl.textContent = t.controlsTip;

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.textContent = t.langBtn;
    langBtn.title = t.langBtnTitle;
  }

  const soundBtn = document.getElementById('sound-btn');
  if (soundBtn) soundBtn.title = t.soundBtnTitle;

  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) pauseBtn.title = t.pauseBtnTitle;

  // Start Screen
  const startBox = document.querySelector('#start-screen .modal-box');
  if (startBox) {
    const h1 = startBox.querySelector('h1');
    const p = startBox.querySelector('p');
    const btn = document.getElementById('btn-start');
    if (h1) h1.innerHTML = t.startTitle;
    if (p) p.textContent = t.startDesc;
    if (btn) btn.textContent = t.btnStart;
  }

  // Pause Screen
  const pauseScreen = document.getElementById('pause-screen');
  if (pauseScreen) {
    const pTitle = document.getElementById('pause-title');
    const pDesc  = document.getElementById('pause-desc');
    const bResume = document.getElementById('btn-resume');
    const bRestart = document.getElementById('btn-pause-restart');
    if (pTitle) pTitle.innerHTML = t.pauseTitle;
    if (pDesc)  pDesc.textContent = t.pauseDesc;
    if (bResume) bResume.textContent = t.btnResume;
    if (bRestart) bRestart.textContent = t.btnPauseRestart;
  }

  // Game Over Screen
  const overBox = document.querySelector('#gameover-screen .modal-box');
  if (overBox) {
    const descEls = overBox.querySelectorAll('.summary-item .desc');
    if (descEls[0]) descEls[0].textContent = t.scoreSummaryCur;
    if (descEls[1]) descEls[1].textContent = t.scoreSummaryBest;
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) btnRestart.textContent = t.btnRestart;
  }
}

// ── 2. 赛博朋克科幻音效合成器 ──────────────────────────────────
class CyberAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  toggle() {
    this.muted = !this.muted;
    return !this.muted;
  }
  playHop() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.09);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.11);
    } catch(e) {}
  }
  playDimShift(toDimB) {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      if (toDimB) {
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      } else {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.2);
      }
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.23);
    } catch(e) {}
  }
  playCarHonk() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [320, 480].forEach(f => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now); osc.stop(now + 0.23);
      });
    } catch(e) {}
  }
  playSplash() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.33);
    } catch(e) {}
  }
  playVoidFall() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.45);
      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.48);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.5);
    } catch(e) {}
  }
  playTrainBell() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1040, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.17);
    } catch(e) {}
  }
  playSquash() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.29);
    } catch(e) {}
  }
  playEagle() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.5);
      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.52);
    } catch(e) {}
  }
}
const sfx = new CyberAudio();

// ── 3. 基础配置与赛博调色板 ─────────────────────────────────────
const LANE_WIDTH   = 36;
const GRID_SIZE    = 1.0;
const HALF_COLS    = 7;

const PALETTE = {
  // 维度 A 主色调 (深黑钛金)
  cyberPlazaA:     0x121424,
  cyberPlazaADark: 0x0c0e1a,
  cyberRoadA:      0x10131e,
  // 维度 B 主色调 (深洋红/深粉紫)
  cyberPlazaB:     0x2c0934,
  cyberPlazaBDark: 0x200628,
  cyberRoadB:      0x24072b,
  // 霓虹元素
  neonGreenHacker: 0x00ff66, // 主角高亮荧光绿
  neonGreenCore:   0x39ff14,
  neonCyan:        0x00f3ff,
  neonMagenta:     0xff007f,
  neonYellow:      0xffe600,
  neonPurple:      0x9d00ff,
  // 防火墙红车系列 (深浅不一的红色 Firewall 战车)
  firewallCars: [
    0xff0033, 0xee1122, 0xd00028, 0xff2a44, 0xb80020, 0xff0055
  ]
};

// ── 4. 赛博朋克体素工厂 (Cyber Voxel Factory) ───────────────────
function createBox(w, h, d, color, castShadow = true, receiveShadow = true, emissive = 0x000000, emissiveIntensity = 0.0) {
  const geom = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshLambertMaterial({
    color,
    emissive,
    emissiveIntensity
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  return mesh;
}

// 全荧光绿赛博黑客主角 (The Fluorescent Matrix Hacker)
function buildHacker() {
  const hacker = new THREE.Group();
  const green = PALETTE.neonGreenHacker;

  // 1. 荧光绿身体主体 (高亮自发光，与深色/粉色完全对比反差)
  const coat = createBox(0.66, 0.72, 0.62, green, true, true, green, 0.85);
  coat.position.y = 0.52;
  hacker.add(coat);

  // 2. 内部超亮超能脉冲芯片 (纯白亮绿)
  const core = createBox(0.22, 0.26, 0.08, 0xffffff, false, false, green, 1.0);
  core.position.set(0, 0.56, 0.32);
  hacker.add(core);

  // 3. 荧光绿兜帽头部
  const head = createBox(0.56, 0.44, 0.54, green, true, true, green, 0.9);
  head.position.set(0, 0.88, 0);
  hacker.add(head);

  // 4. 超亮白绿矩阵目镜 (Matrix Visor)
  const visor = createBox(0.5, 0.16, 0.14, 0xffffff, false, false, 0xffffff, 1.0);
  visor.position.set(0, 0.88, 0.26);
  hacker.add(visor);

  // 5. 荧光绿机械手臂与发光数据手套
  const armL = createBox(0.14, 0.38, 0.22, green, true, true, green, 0.75);
  armL.position.set(-0.38, 0.5, 0.02);
  const gloveL = createBox(0.12, 0.12, 0.14, 0xffffff, false, false, green, 1.0);
  gloveL.position.set(-0.38, 0.32, 0.08);

  const armR = createBox(0.14, 0.38, 0.22, green, true, true, green, 0.75);
  armR.position.set(0.38, 0.5, 0.02);
  const gloveR = createBox(0.12, 0.12, 0.14, 0xffffff, false, false, green, 1.0);
  gloveR.position.set(0.38, 0.32, 0.08);
  hacker.add(armL, gloveL, armR, gloveR);

  // 6. 荧光绿动力外骨骼双腿与战靴 (带深暗底座反衬)
  const legL = createBox(0.16, 0.24, 0.24, green, true, true, green, 0.8);
  legL.position.set(-0.18, 0.12, 0.04);
  const legR = createBox(0.16, 0.24, 0.24, green, true, true, green, 0.8);
  legR.position.set(0.18, 0.12, 0.04);
  hacker.add(legL, legR);

  // 7. 伴随自转的荧光绿数据方块 (Orbiting Data Cube)
  const dataCore = createBox(0.14, 0.14, 0.14, 0xffffff, false, false, green, 1.0);
  dataCore.position.set(0.38, 1.12, -0.22);
  hacker.add(dataCore);
  hacker.dataCore = dataCore;

  hacker.scale.set(0.9, 0.9, 0.9);
  return hacker;
}

// 花哨炫彩霓虹摩天楼 (Fancy Colorful Cyber Skyscrapers)
function buildCyberTower(variant = 0) {
  const tower = new THREE.Group();
  const height = 1.6 + Math.random() * 1.2;
  const w = 0.92, d = 0.92;

  // 大楼深蓝紫科技外墙
  const wallCol = (variant % 2 === 0) ? 0x141829 : 0x1e1633;
  const main = createBox(w, height, d, wallCol);
  main.position.y = height / 2;
  tower.add(main);

  // 极度花哨的多彩霓虹光带 (青、洋红、明黄、电紫)
  const colors = [PALETTE.neonCyan, PALETTE.neonMagenta, PALETTE.neonYellow, PALETTE.neonPurple];
  const neonC1 = colors[Math.floor(Math.random() * colors.length)];
  const neonC2 = colors[Math.floor(Math.random() * colors.length)];

  // 1. 竖向全通式霓虹灯带
  const stripe = createBox(0.08, height * 0.95, 0.08, neonC1, false, false, neonC1, 1.0);
  stripe.position.set(-w/2 - 0.02, height/2, d/2 + 0.02);
  const stripe2 = createBox(0.08, height * 0.85, 0.08, neonC2, false, false, neonC2, 1.0);
  stripe2.position.set(w/2 + 0.02, height * 0.45, -d/2 - 0.02);
  tower.add(stripe, stripe2);

  // 2. 楼体大型多色全息广告招牌
  const billboard = createBox(w * 0.85, 0.32, 0.06, neonC2, false, false, neonC2, 0.9);
  billboard.position.set(0, height * 0.72, d/2 + 0.02);
  tower.add(billboard);

  // 3. 楼层发光窗格矩阵
  const winCount = 3;
  for (let i = 0; i < winCount; i++) {
    const winY = (i + 1) * (height / (winCount + 1));
    const winC = (i % 2 === 0) ? neonC1 : PALETTE.neonYellow;
    const win = createBox(w * 0.65, 0.08, 0.04, winC, false, false, winC, 0.8);
    win.position.set(0, winY, d/2 + 0.02);
    tower.add(win);
  }

  // 4. 楼顶全息光环与天线
  const ring = createBox(w * 0.75, 0.06, d * 0.75, neonC1, false, false, neonC1, 0.9);
  ring.position.set(0, height + 0.05, 0);
  const pole = createBox(0.08, 0.55, 0.08, 0x475569);
  pole.position.set(0, height + 0.3, 0);
  const beacon = createBox(0.18, 0.18, 0.18, 0xff0055, false, false, 0xff0055, 1.0);
  beacon.position.set(0, height + 0.62, 0);
  tower.add(ring, pole, beacon);

  return tower;
}

// 红色“防火墙”反重力悬浮车 (Red Firewall Hovercars - 维度 A 致命实体，维度 B 虚化幽灵)
function buildFirewallVehicle(color, kind = 'car') {
  const group = new THREE.Group();
  group.isFirewall = true;

  function addFirewallThrusters(w, d) {
    const ww = 0.22, hh = 0.12, dd = 0.22;
    const positions = [
      [-w/2 + 0.35, -d/2 + 0.12],
      [ w/2 - 0.35, -d/2 + 0.12],
      [-w/2 + 0.35,  d/2 - 0.12],
      [ w/2 - 0.35,  d/2 - 0.12],
    ];
    positions.forEach(([x, z]) => {
      const emitter = createBox(ww, hh, dd, 0x22050b);
      emitter.position.set(x, 0.08, z);
      const glow = createBox(ww * 0.75, 0.06, dd * 0.75, 0xff0044, false, false, 0xff0044, 1.0);
      glow.position.set(x, 0.03, z);
      group.add(emitter, glow);
    });

    const underglow = createBox(w * 0.7, 0.02, d * 0.6, 0xff0033, false, false, 0xff0033, 0.7);
    underglow.position.set(0, 0.04, 0);
    group.add(underglow);
  }

  if (kind === 'truck') {
    // 慢速超重型装甲防火墙堡垒
    const len = 3.3, wid = 1.3;
    const chassis = createBox(len, 0.38, wid, 0x1f060b);
    chassis.position.y = 0.32;
    const cab = createBox(0.9, 0.75, wid, color, true, true, 0x550011, 0.4);
    cab.position.set(len/2 - 0.45, 0.72, 0);

    // 红色防火墙高能隔离舱
    const cargo = createBox(len - 1.05, 0.95, wid, 0x2a040d);
    cargo.position.set(-0.48, 0.88, 0);
    const lightStripe = createBox(len - 1.1, 0.16, wid + 0.04, 0xff0044, false, false, 0xff0044, 1.0);
    lightStripe.position.set(-0.48, 0.88, 0);

    group.add(chassis, cab, cargo, lightStripe);
    addFirewallThrusters(len, wid);
    group.vehicleWidth = len;
  } else if (kind === 'fast') {
    // 超高速防火墙拦截飞艇 (Sleek Interceptor)
    const len = 1.85, wid = 0.95;
    const body = createBox(len, 0.32, wid, color, true, true, 0x770011, 0.5);
    body.position.y = 0.3;
    const cabin = createBox(0.95, 0.3, wid * 0.78, 0x110205);
    cabin.position.set(-0.06, 0.58, 0);

    // 警示激光排气
    const exhaust = createBox(0.08, 0.14, wid * 0.8, 0xff0055, false, false, 0xff0055, 1.0);
    exhaust.position.set(-len/2 - 0.02, 0.3, 0);
    group.add(body, cabin, exhaust);
    addFirewallThrusters(len, wid);
    group.vehicleWidth = len;
  } else {
    // 标准防火墙巡航巡逻车
    const len = 1.95, wid = 1.08;
    const body = createBox(len, 0.36, wid, color, true, true, 0x550011, 0.3);
    body.position.y = 0.3;
    const cabin = createBox(0.98, 0.34, wid * 0.8, 0x160307);
    cabin.position.set(-0.08, 0.62, 0);

    // 红色防火墙长条警灯
    const siren = createBox(0.8, 0.1, 0.25, 0xff0044, false, false, 0xff0044, 1.0);
    siren.position.set(-0.08, 0.82, 0);

    const headlight = createBox(0.06, 0.1, wid * 0.75, 0xff6666, false, false, 0xff6666, 1.0);
    headlight.position.set(len/2 + 0.02, 0.3, 0);

    group.add(body, cabin, siren, headlight);
    addFirewallThrusters(len, wid);
    group.vehicleWidth = len;
  }

  group.position.y = 0.18;
  return group;
}

// 赛博全息芯片数据平台 (河流浮板)
function buildDataPad(length = 2.6) {
  const group = new THREE.Group();
  const d = 0.8, h = 0.28;

  const deck = createBox(length, h, d, 0x121728);
  deck.position.y = h / 2;

  const trace = createBox(length * 0.85, 0.02, d * 0.55, 0x00f3ff, false, false, 0x00f3ff, 0.85);
  trace.position.set(0, h + 0.01, 0);

  const glowL = createBox(0.12, h * 0.6, d * 0.8, 0x00f3ff, false, false, 0x00f3ff, 0.9);
  glowL.position.set(-length/2 + 0.06, h/2, 0);
  const glowR = createBox(0.12, h * 0.6, d * 0.8, 0x00f3ff, false, false, 0x00f3ff, 0.9);
  glowR.position.set(length/2 - 0.06, h/2, 0);

  group.add(deck, trace, glowL, glowR);
  group.logWidth = length;
  return group;
}

// 磁悬浮超回路列车
function buildMaglevTrain() {
  const group = new THREE.Group();
  const len = 12.0, wid = 1.15, h = 1.25;

  const body = createBox(len, h, wid, 0x0f1320);
  body.position.y = h / 2 + 0.18;

  const neonStripe = createBox(len + 0.04, 0.18, wid + 0.04, 0xff0055, false, false, 0xff0055, 1.0);
  neonStripe.position.set(0, h * 0.65, 0);

  const roof = createBox(len * 0.95, 0.15, wid * 0.85, 0x1e273d);
  roof.position.y = h + 0.22;

  const headLight = createBox(0.2, 0.28, wid * 0.6, 0x00f3ff, false, false, 0x00f3ff, 1.0);
  headLight.position.set(len/2 + 0.02, 0.65, 0);

  group.add(body, neonStripe, roof, headLight);
  group.vehicleWidth = len;
  return group;
}

function buildRailSignal() {
  const group = new THREE.Group();
  const pole = createBox(0.16, 2.2, 0.16, 0x121728);
  pole.position.y = 1.1;

  const holoBox = createBox(0.55, 0.9, 0.35, 0x080c16);
  holoBox.position.set(0, 1.9, 0);

  const lightTop = createBox(0.28, 0.26, 0.38, 0x550011, false, false, 0x550011, 0.2);
  lightTop.position.set(0, 2.05, 0);
  const lightBottom = createBox(0.28, 0.26, 0.38, 0x550011, false, false, 0x550011, 0.2);
  lightBottom.position.set(0, 1.72, 0);

  group.add(pole, holoBox, lightTop, lightBottom);
  group.lightTop = lightTop;
  group.lightBottom = lightBottom;
  return group;
}

// 维度 B: “代码断层”黑洞/空洞几何模型 (Code Fault Void Mesh)
function buildCodeFaultMesh() {
  const group = new THREE.Group();
  // 凹陷下去的纯黑深渊底
  const abyss = createBox(0.96, 0.4, 0.96, 0x000000, false, false);
  abyss.position.y = -0.42;

  // 表面边缘的洋红/紫粉发光故障线框 (Glitch Wireframe)
  const border = createBox(0.98, 0.04, 0.98, 0xff00bf, false, false, 0xff00bf, 1.0);
  border.position.y = 0.01;

  // 中心漂浮的洋红数据噪点粒子
  const glitch = createBox(0.3, 0.06, 0.3, 0xff3df0, false, false, 0xff3df0, 0.9);
  glitch.position.y = -0.1;

  group.add(abyss, border, glitch);
  return group;
}

// 企业安保侦察无人机
function buildSecurityDrone() {
  const drone = new THREE.Group();
  const body = createBox(0.85, 0.36, 0.85, 0x121622);
  drone.add(body);

  const eye = createBox(0.25, 0.18, 0.25, 0xff0055, false, false, 0xff0055, 1.0);
  eye.position.set(0, -0.12, 0.35);
  drone.add(eye);

  const thrusters = [
    [-0.7, 0.08, -0.5], [ 0.7, 0.08, -0.5],
    [-0.7, 0.08,  0.5], [ 0.7, 0.08,  0.5]
  ];
  thrusters.forEach(([x, y, z]) => {
    const pod = createBox(0.3, 0.14, 0.3, 0x1c2234);
    pod.position.set(x, y, z);
    const ring = createBox(0.24, 0.04, 0.24, 0x00f3ff, false, false, 0x00f3ff, 0.9);
    ring.position.set(x, y - 0.08, z);
    drone.add(pod, ring);
  });

  const beam = createBox(0.2, 1.2, 0.2, 0xff0055, false, false, 0xff0055, 0.6);
  beam.position.set(0, -0.7, 0);
  drone.add(beam);

  drone.scale.set(1.5, 1.5, 1.5);
  return drone;
}


// ── 5. 赛博主游戏引擎 ──────────────────────────────────────────
class CrossyGame {
  constructor() {
    this.container = document.getElementById('game-container');
    this.scoreValEl = document.getElementById('score-val');
    this.bestValEl  = document.getElementById('best-val');
    this.timerText  = document.getElementById('timer-text');
    this.timerBadge = document.getElementById('timer-badge');
    this.dimBtn     = document.getElementById('dim-btn');
    this.dimLabel   = document.getElementById('dim-label');
    this.dimFlash   = document.getElementById('dim-flash');

    this.startScreen= document.getElementById('start-screen');
    this.overScreen = document.getElementById('gameover-screen');
    this.pauseScreen= document.getElementById('pause-screen');

    this.score = 0;
    this.bestScore = parseInt(localStorage.getItem('crossy_best') || '0', 10);
    this.bestValEl.textContent = this.bestScore;

    this.state = 'start'; // 'start' | 'play' | 'pause' | 'dead'
    this.idleTime = 10.0;
    this.IDLE_MAX = 10.0;

    // ── 双重维度状态 ──────────────────────────────────────────
    this.currentDimension = 'A'; // 'A': 物理网络 | 'B': 深层数据
    this.dimBTime = 0.0; // 在维度 B 的持续时间

    this.lanes = new Map();
    this.lanePool = new THREE.Group();

    this.player = null;
    this.playerPos = { x: 0, z: 0 };
    this.targetPos = { x: 0, z: 0 };
    this.isJumping = false;
    this.jumpProgress = 0;
    this.jumpDuration = 0.18;
    this.currentLog = null;

    this.drone = null;
    this.droneActive = false;

    this.particles = [];

    this.initScene();
    this.initPlayer();
    this.initInput();
    this.initEvents();

    this.animate = this.animate.bind(this);
    this.lastTime = performance.now();
    requestAnimationFrame(this.animate);
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060810);
    this.scene.fog = new THREE.FogExp2(0x090c1a, 0.016);

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 18;
    this.camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,
       frustumSize * aspect / 2,
       frustumSize / 2,
      -frustumSize / 2,
      -100, 500
    );

    this.camOffset = new THREE.Vector3(-14, 18, -14);
    this.camera.position.copy(this.camOffset);
    this.camera.lookAt(0, 0.5, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference:'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 环境光与双方向光
    this.ambientLight = new THREE.AmbientLight(0x222c44, 0.95);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xa5f3fc, 0.85);
    this.dirLight.position.set(-20, 35, -15);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 0.5;
    this.dirLight.shadow.camera.far = 120;
    const d = 20;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0008;
    this.scene.add(this.dirLight);

    this.rimLight = new THREE.DirectionalLight(0xff007f, 0.4);
    this.rimLight.position.set(20, 15, 20);
    this.scene.add(this.rimLight);

    this.lightTarget = new THREE.Object3D();
    this.scene.add(this.lightTarget);
    this.dirLight.target = this.lightTarget;

    this.scene.add(this.lanePool);

    this.drone = buildSecurityDrone();
    this.drone.visible = false;
    this.scene.add(this.drone);

    window.addEventListener('resize', () => {
      const asp = window.innerWidth / window.innerHeight;
      this.camera.left   = -frustumSize * asp / 2;
      this.camera.right  =  frustumSize * asp / 2;
      this.camera.top    =  frustumSize / 2;
      this.camera.bottom = -frustumSize / 2;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  initPlayer() {
    this.player = buildHacker();
    this.scene.add(this.player);
    this.resetPlayerState();
  }

  resetPlayerState() {
    this.playerPos = { x: 0, z: 0 };
    this.targetPos = { x: 0, z: 0 };
    this.player.position.set(0, 0, 0);
    this.player.rotation.set(0, 0, 0);
    this.player.scale.set(0.9, 0.9, 0.9);
    this.player.visible = true;
    this.isJumping = false;
    this.jumpProgress = 0;
    this.currentLog = null;
    this.droneActive = false;
    this.drone.visible = false;
  }

  // ── 6. 赛博车道生成（拓宽连续马路 + 密集红车） ──────────────────
  getLaneType(z) {
    if (z <= 1) return 'grass'; // 出生安全街区
    // 拓宽马路：连续 3~5 行公路，增加防火墙车流压迫感！
    const pattern = [
      'grass', 'road', 'road', 'road', 'grass',
      'water', 'water', 'grass',
      'road', 'road', 'road', 'road', 'grass',
      'rail', 'grass',
      'road', 'road', 'road', 'road', 'road', 'grass',
      'water', 'water', 'water', 'grass',
      'road', 'road', 'road', 'grass'
    ];
    return pattern[(z - 2) % pattern.length];
  }

  createLane(z) {
    const type = this.getLaneType(z);
    const laneGroup = new THREE.Group();
    laneGroup.position.set(0, 0, z);

    let ground;
    const laneData = {
      type,
      z,
      group: laneGroup,
      groundMesh: null,
      obstacles: [],
      vehicles: [],
      train: null,
      signal: null,
      trainTimer: 0,
      trainComing: false,
      speed: 0,
      direction: Math.random() < 0.5 ? 1 : -1,
      codeFaults: new Set(), // 存放代码断层的 X 坐标
      faultMeshes: new Map() // x -> Fault Mesh Group
    };

    if (type === 'grass') {
      const c = (Math.abs(z) % 2 === 0) ? PALETTE.cyberPlazaA : PALETTE.cyberPlazaADark;
      ground = createBox(LANE_WIDTH, 0.8, 1.0, c, false, true);
      ground.position.y = -0.4;
      laneGroup.add(ground);
      laneData.groundMesh = ground;

      const neonEdge = createBox(LANE_WIDTH, 0.04, 0.08, PALETTE.neonMagenta, false, false, PALETTE.neonMagenta, 0.8);
      neonEdge.position.set(0, 0.01, 0.46);
      laneGroup.add(neonEdge);

      // 炫彩摩天楼障碍 (确保通道畅通)
      const openCol = -2 + Math.floor(Math.random() * 4);
      for (let x = -HALF_COLS - 3; x <= HALF_COLS + 3; x++) {
        const isBorder = (x < -HALF_COLS || x > HALF_COLS);
        const isCenterSpawn = (z <= 2 && Math.abs(x) <= 1);
        const isGuaranteedPass = (x === openCol || x === openCol + 1);
        const shouldPlaceTower = isBorder || (!isCenterSpawn && !isGuaranteedPass && Math.random() < 0.16);

        if (shouldPlaceTower) {
          const tower = buildCyberTower(Math.abs(x * 3 + z));
          tower.position.set(x, 0, 0);
          laneGroup.add(tower);
          laneData.obstacles.push(x);
        }
      }
    } else if (type === 'road') {
      ground = createBox(LANE_WIDTH, 0.8, 1.0, PALETTE.cyberRoadA, false, true);
      ground.position.y = -0.4;
      laneGroup.add(ground);
      laneData.groundMesh = ground;

      for (let x = -HALF_COLS - 2; x <= HALF_COLS + 2; x += 2.5) {
        const dash = createBox(1.2, 0.02, 0.12, PALETTE.neonCyan, false, false, PALETTE.neonCyan, 0.8);
        dash.position.set(x, 0.01, 0);
        laneGroup.add(dash);
      }

      // 密集红色防火墙车队 (有快有慢，形成迫使切换维度的压力)
      const speedVariant = Math.random();
      if (speedVariant < 0.3) {
        // 慢速超重型防火墙堡垒
        laneData.speed = 2.4 + Math.random() * 0.8;
      } else if (speedVariant > 0.7) {
        // 极速拦截飞艇
        laneData.speed = 7.5 + Math.random() * 2.5;
      } else {
        // 标准防火墙巡逻车
        laneData.speed = 4.2 + Math.random() * 1.6;
      }

      const carCount = Math.floor(2 + Math.random() * 2); // 2~3 辆车
      const spacing = (LANE_WIDTH - 6) / carCount;

      for (let i = 0; i < carCount; i++) {
        const color = PALETTE.firewallCars[Math.floor(Math.random() * PALETTE.firewallCars.length)];
        const kind = (speedVariant < 0.3) ? 'truck' : (speedVariant > 0.7 ? 'fast' : 'car');
        const veh = buildFirewallVehicle(color, kind);

        let initX = -LANE_WIDTH / 2 + i * spacing + Math.random() * 3.0;
        veh.position.set(initX, 0.18, 0);
        if (laneData.direction < 0) veh.rotation.y = Math.PI;
        laneGroup.add(veh);
        laneData.vehicles.push(veh);
      }

      // 仅在当前为维度 B 时生成断层；维度 A 无论如何绝不生成任何空洞
      if (this.currentDimension === 'B') {
        this.generateCodeFaultsForLane(laneData);
      }
    } else if (type === 'water') {
      ground = createBox(LANE_WIDTH, 0.6, 1.0, 0x0a0c20, false, true);
      ground.position.y = -0.55;
      laneGroup.add(ground);
      laneData.groundMesh = ground;

      const streamLight = createBox(LANE_WIDTH, 0.02, 0.6, 0x00f3ff, false, false, 0x00f3ff, 0.25);
      streamLight.position.set(0, -0.24, 0);
      laneGroup.add(streamLight);

      // 大幅增加芯片浮板数量 (每排水道 4~5 块，保障连续跳跃)
      laneData.speed = 1.6 + Math.random() * 1.5;
      const logCount = 4 + Math.floor(Math.random() * 2); // 4~5 块
      const spacing = (LANE_WIDTH - 4) / logCount;

      for (let i = 0; i < logCount; i++) {
        const logLen = 2.2 + Math.random() * 1.4;
        const padMesh = buildDataPad(logLen);
        const initX = -LANE_WIDTH / 2 + i * spacing + Math.random() * 1.5;
        padMesh.position.set(initX, 0, 0);
        laneGroup.add(padMesh);
        laneData.vehicles.push(padMesh);
      }
    } else if (type === 'rail') {
      ground = createBox(LANE_WIDTH, 0.75, 1.0, 0x151828, false, true);
      ground.position.y = -0.42;
      laneGroup.add(ground);
      laneData.groundMesh = ground;

      const rail1 = createBox(LANE_WIDTH, 0.06, 0.1, 0xff0055, false, false, 0xff0055, 0.9);
      rail1.position.set(0, 0.02, -0.28);
      const rail2 = createBox(LANE_WIDTH, 0.06, 0.1, 0xff0055, false, false, 0xff0055, 0.9);
      rail2.position.set(0, 0.02, 0.28);
      laneGroup.add(rail1, rail2);

      const signal = buildRailSignal();
      signal.position.set(HALF_COLS + 1.2, 0, 0);
      laneGroup.add(signal);
      laneData.signal = signal;

      const train = buildMaglevTrain();
      const startX = (laneData.direction > 0) ? -(LANE_WIDTH + 8) : (LANE_WIDTH + 8);
      train.position.set(startX, 0, 0);
      if (laneData.direction < 0) train.rotation.y = Math.PI;
      laneGroup.add(train);
      laneData.train = train;
      laneData.trainTimer = 4.0 + Math.random() * 5.0;
      laneData.speed = 26.0;
    }

    this.lanePool.add(laneGroup);
    this.lanes.set(z, laneData);
    return laneData;
  }

  // 计算维度 B 代码断层生成概率：初始仅 6% (极少空洞友好)，每 30 分梯度提升 7% (在 5%~10% 区间)
  getFaultProbability() {
    const tier = Math.floor(this.score / 30);
    const scoreBonus = Math.min(tier * 0.07, 0.40); // 0分:+0%, 30分:+7%, 60分:+14%, 90分:+21%...
    const timeBonus = Math.min(this.dimBTime * 0.012, 0.16); // 维度 B 停留时间微调
    return Math.min(0.06 + scoreBonus + timeBonus, 0.58);
  }

  // 彻底清除指定车道内的所有代码断层模型与数据
  clearCodeFaultsForLane(laneData) {
    if (!laneData || !laneData.faultMeshes) return;
    for (const mesh of laneData.faultMeshes.values()) {
      laneData.group.remove(mesh);
    }
    laneData.faultMeshes.clear();
    laneData.codeFaults.clear();
  }

  // 维度 B: 随机生成代码断层 (仅在维度 B 下激活)
  generateCodeFaultsForLane(laneData) {
    if (laneData.type !== 'road') return;
    // 维度 A 无论如何不生成且不保留空洞
    if (this.currentDimension === 'A') {
      this.clearCodeFaultsForLane(laneData);
      return;
    }

    const faultProb = this.getFaultProbability();
    // 随机预留至少 2 列畅通无阻的通道，避免出现绝对死局
    const safeCol = -2 + Math.floor(Math.random() * 4);

    for (let x = -HALF_COLS; x <= HALF_COLS; x++) {
      if (x === safeCol || x === safeCol + 1) continue;
      // 避免重复生成相同位置的 mesh
      if (laneData.codeFaults.has(x)) continue;

      if (Math.random() < faultProb) {
        laneData.codeFaults.add(x);
        const faultMesh = buildCodeFaultMesh();
        faultMesh.position.set(x, 0, 0);
        faultMesh.visible = true; // 仅在维度 B 下可见
        laneData.group.add(faultMesh);
        laneData.faultMeshes.set(x, faultMesh);
      }
    }
  }

  ensureWorld() {
    const currentZ = Math.round(this.playerPos.z);
    const minZ = currentZ - 8;
    const maxZ = currentZ + 26;

    for (let z = minZ; z <= maxZ; z++) {
      if (!this.lanes.has(z)) this.createLane(z);
    }

    for (const [z, lane] of this.lanes.entries()) {
      if (z < minZ - 5) {
        this.lanePool.remove(lane.group);
        this.lanes.delete(z);
      }
    }
  }

  // ── 7. 双重维度切换核心逻辑 (SPACE 触发) ────────────────────────
  toggleDimension() {
    if (this.state !== 'play') return;

    const toDimB = (this.currentDimension === 'A');
    this.currentDimension = toDimB ? 'B' : 'A';
    sfx.playDimShift(toDimB);

    // 全屏色彩闪烁动效
    if (this.dimFlash) {
      this.dimFlash.className = toDimB ? 'flash-to-b' : 'flash-to-a';
      setTimeout(() => {
        if (this.dimFlash) this.dimFlash.className = '';
      }, 160);
    }

    // 顶栏 HUD 徽章切换
    const t = I18N[currentLang] || I18N.en;
    if (this.dimBtn && this.dimLabel) {
      if (toDimB) {
        this.dimBtn.className = 'dim-btn-b';
        this.dimLabel.textContent = t.dimBtnB;
      } else {
        this.dimBtn.className = 'dim-btn-a';
        this.dimLabel.textContent = t.dimBtnA;
      }
    }

    // 切换世界光影与材质
    if (toDimB) {
      // 维度 B: 洋红粉紫深空
      this.scene.background = new THREE.Color(0x20052b);
      this.scene.fog.color = new THREE.Color(0x2c0738);
      this.dirLight.color.setHex(0xff00bf);
      this.ambientLight.color.setHex(0x401048);

      // 防火墙车辆退化为虚化半透明幽灵态 (Ghost mode)
      this.setVehiclesGhostMode(true);

      // 依据当前分数梯度生成并展示代码断层黑洞
      for (const lane of this.lanes.values()) {
        this.generateCodeFaultsForLane(lane);
      }
      this.setCodeFaultsVisibility(true);
    } else {
      // 维度 A: 无论如何不应该出现空洞
      this.dimBTime = 0.0; // 重置维度 B 计时器
      this.scene.background = new THREE.Color(0x060810);
      this.scene.fog.color = new THREE.Color(0x090c1a);
      this.dirLight.color.setHex(0xa5f3fc);
      this.ambientLight.color.setHex(0x222c44);

      this.setVehiclesGhostMode(false);
      // 维度 A 彻底移除并隐藏所有车道内的代码断层
      for (const lane of this.lanes.values()) {
        this.clearCodeFaultsForLane(lane);
      }
      this.setCodeFaultsVisibility(false);
    }
  }

  setVehiclesGhostMode(isGhost) {
    for (const lane of this.lanes.values()) {
      if (lane.type === 'road') {
        for (const veh of lane.vehicles) {
          veh.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.transparent = isGhost;
              child.material.opacity = isGhost ? 0.22 : 1.0;
            }
          });
        }
      }
    }
  }

  setCodeFaultsVisibility(visible) {
    for (const lane of this.lanes.values()) {
      if (lane.faultMeshes) {
        for (const mesh of lane.faultMeshes.values()) {
          mesh.visible = visible;
        }
      }
    }
  }

  // ── 8. 控制交互与 ESC 暂停 ────────────────────────────────────
  initInput() {
    const handleAction = (dir) => {
      sfx.init();
      if (this.state === 'start') {
        this.startGame();
        return;
      }
      if (this.state === 'dead') {
        this.restartGame();
        return;
      }
      if (this.state === 'pause') {
        return;
      }
      this.tryMove(dir);
    };

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        this.togglePause();
        return;
      }

      // 空格键触发维度切换
      if (e.code === 'Space') {
        e.preventDefault();
        sfx.init();
        if (this.state === 'play') {
          this.toggleDimension();
        } else if (this.state === 'start') {
          this.startGame();
        } else if (this.state === 'dead') {
          this.restartGame();
        }
        return;
      }

      const keyMap = {
        ArrowUp: 'up', KeyW: 'up',
        ArrowDown: 'down', KeyS: 'down',
        ArrowLeft: 'left', KeyA: 'left',
        ArrowRight: 'right', KeyD: 'right'
      };
      if (keyMap[e.code]) {
        e.preventDefault();
        handleAction(keyMap[e.code]);
      }
    });

    // 移动端控制
    document.getElementById('btn-up').addEventListener('touchstart', (e) => { e.preventDefault(); handleAction('up'); });
    document.getElementById('btn-down').addEventListener('touchstart', (e) => { e.preventDefault(); handleAction('down'); });
    document.getElementById('btn-left').addEventListener('touchstart', (e) => { e.preventDefault(); handleAction('left'); });
    document.getElementById('btn-right').addEventListener('touchstart', (e) => { e.preventDefault(); handleAction('right'); });
    document.getElementById('btn-dim-mobile').addEventListener('touchstart', (e) => { e.preventDefault(); this.toggleDimension(); });

    document.getElementById('btn-up').addEventListener('click', () => handleAction('up'));
    document.getElementById('btn-down').addEventListener('click', () => handleAction('down'));
    document.getElementById('btn-left').addEventListener('click', () => handleAction('left'));
    document.getElementById('btn-right').addEventListener('click', () => handleAction('right'));
    document.getElementById('btn-dim-mobile').addEventListener('click', () => this.toggleDimension());

    // 滑动手势
    let touchStartX = 0, touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('#touch-nav') || e.target.closest('.modal-box') || e.target.closest('#hud')) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (e.target.closest('#touch-nav') || e.target.closest('.modal-box') || e.target.closest('#hud')) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
        handleAction('up');
        return;
      }
      if (Math.abs(dx) > Math.abs(dy)) {
        handleAction(dx > 0 ? 'right' : 'left');
      } else {
        handleAction(dy > 0 ? 'down' : 'up');
      }
    }, { passive: true });
  }

  initEvents() {
    document.getElementById('btn-start').addEventListener('click', () => { sfx.init(); this.startGame(); });
    document.getElementById('btn-restart').addEventListener('click', () => { sfx.init(); this.restartGame(); });

    // 维度切换按钮点击
    if (this.dimBtn) this.dimBtn.addEventListener('click', () => this.toggleDimension());

    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.togglePause());

    const btnResume = document.getElementById('btn-resume');
    if (btnResume) btnResume.addEventListener('click', () => this.resumeGame());

    const btnPauseRestart = document.getElementById('btn-pause-restart');
    if (btnPauseRestart) btnPauseRestart.addEventListener('click', () => this.restartGame());

    const soundBtn = document.getElementById('sound-btn');
    soundBtn.addEventListener('click', () => {
      sfx.init();
      const on = sfx.toggle();
      soundBtn.textContent = on ? '🔊' : '🔇';
    });

    const langBtn = document.getElementById('lang-btn');
    langBtn.addEventListener('click', () => {
      const nextLang = (currentLang === 'en') ? 'zh' : 'en';
      applyLanguage(nextLang);
      const t = I18N[nextLang];
      if (this.dimLabel) {
        this.dimLabel.textContent = (this.currentDimension === 'A') ? t.dimBtnA : t.dimBtnB;
      }
    });
  }

  togglePause() {
    if (this.state === 'play') {
      this.pauseGame();
    } else if (this.state === 'pause') {
      this.resumeGame();
    }
  }

  pauseGame() {
    if (this.state !== 'play') return;
    this.state = 'pause';
    this.pauseScreen.style.display = 'flex';
  }

  resumeGame() {
    if (this.state !== 'pause') return;
    this.state = 'play';
    this.pauseScreen.style.display = 'none';
    this.lastTime = performance.now();
  }

  tryMove(direction) {
    if (this.isJumping || this.state !== 'play') return;

    let nextX = this.playerPos.x;
    let nextZ = this.playerPos.z;
    let rotY = 0;

    if (direction === 'up') {
      nextZ += GRID_SIZE;
      rotY = 0;
    } else if (direction === 'down') {
      nextZ -= GRID_SIZE;
      rotY = Math.PI;
    } else if (direction === 'left') {
      nextX += GRID_SIZE;
      rotY = Math.PI / 2;
    } else if (direction === 'right') {
      nextX -= GRID_SIZE;
      rotY = -Math.PI / 2;
    }

    if (nextX < -HALF_COLS || nextX > HALF_COLS) return;
    if (nextZ < this.score - 4) return;

    const targetLane = this.lanes.get(Math.round(nextZ));
    if (targetLane && targetLane.type !== 'water') {
      nextX = Math.round(nextX);
    }

    if (targetLane && targetLane.obstacles.includes(Math.round(nextX))) {
      this.bumpObstacle();
      return;
    }

    this.player.rotation.y = rotY;
    this.targetPos = { x: nextX, z: nextZ };
    this.isJumping = true;
    this.jumpProgress = 0;
    this.currentLog = null;

    sfx.playHop();

    if (nextZ > this.score) {
      this.score = Math.round(nextZ);
      this.scoreValEl.textContent = this.score;
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        this.bestValEl.textContent = this.bestScore;
        localStorage.setItem('crossy_best', this.bestScore);
      }
    }
    this.idleTime = this.IDLE_MAX;
  }

  bumpObstacle() {
    this.player.scale.set(1.05, 0.75, 1.05);
    setTimeout(() => {
      if (this.player) this.player.scale.set(0.9, 0.9, 0.9);
    }, 120);
  }

  // ── 9. 游戏主循环更新 ──────────────────────────────────────────
  startGame() {
    this.state = 'play';
    this.currentDimension = 'A';
    this.dimBTime = 0.0;
    this.startScreen.style.display = 'none';
    this.overScreen.style.display = 'none';
    this.pauseScreen.style.display = 'none';
    this.score = 0;
    this.scoreValEl.textContent = 0;
    this.idleTime = this.IDLE_MAX;
    this.resetPlayerState();

    // 恢复维度 A 场景
    this.scene.background = new THREE.Color(0x060810);
    this.scene.fog.color = new THREE.Color(0x090c1a);
    this.dirLight.color.setHex(0xa5f3fc);
    this.ambientLight.color.setHex(0x222c44);
    if (this.dimBtn && this.dimLabel) {
      const t = I18N[currentLang] || I18N.en;
      this.dimBtn.className = 'dim-btn-a';
      this.dimLabel.textContent = t.dimBtnA;
    }

    for (const lane of this.lanes.values()) {
      this.clearCodeFaultsForLane(lane);
      this.lanePool.remove(lane.group);
    }
    this.lanes.clear();
    this.ensureWorld();
  }

  restartGame() {
    this.startGame();
  }

  die(reason = 'hit') {
    if (this.state === 'dead') return;
    this.state = 'dead';

    const t = I18N[currentLang] || I18N.en;

    if (reason === 'hit' || reason === 'train') {
      sfx.playSquash();
      this.player.scale.set(1.6, 0.08, 1.6);
      this.player.position.y = 0.05;
      this.spawnParticles(this.player.position, PALETTE.neonGreenHacker, 18);
    } else if (reason === 'drown') {
      sfx.playSplash();
      this.player.position.y = -0.6;
      this.spawnParticles(this.player.position, 0x00f3ff, 20);
    } else if (reason === 'void') {
      sfx.playVoidFall();
      this.player.position.y = -0.8;
      this.player.scale.set(0.2, 0.2, 0.2);
      this.spawnParticles(this.player.position, 0xff00bf, 22);
    } else if (reason === 'eagle') {
      sfx.playEagle();
    }

    document.getElementById('death-title').textContent = t.deathTitles[reason] || '💥 LINK TERMINATED';
    document.getElementById('death-reason').textContent = t.deathReasons[reason] || '';
    document.getElementById('final-score').textContent = this.score;
    document.getElementById('final-best').textContent = this.bestScore;

    setTimeout(() => {
      this.overScreen.style.display = 'flex';
    }, 700);
  }

  spawnParticles(pos, color, count = 14) {
    for (let i = 0; i < count; i++) {
      const p = createBox(0.14, 0.14, 0.14, color, false, false, color, 0.9);
      p.position.copy(pos);
      p.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 5
      );
      this.scene.add(p);
      this.particles.push(p);
    }
  }

  updateParticles(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.position.addScaledVector(p.velocity, dt);
      p.velocity.y -= 14 * dt;
      p.scale.multiplyScalar(0.93);
      if (p.position.y < -1 || p.scale.x < 0.02) {
        this.scene.remove(p);
        this.particles.splice(i, 1);
      }
    }
  }

  update(dt) {
    if (this.state === 'pause') return;
    if (this.state === 'start') {
      this.ensureWorld();
      return;
    }

    this.updateParticles(dt);

    // 维度 B 时间恶化机制：越久代码断层生成率越高
    if (this.state === 'play' && this.currentDimension === 'B') {
      this.dimBTime += dt;
      // 随着在维度 B 停留，动态撕裂更多黑洞空洞
      if (Math.floor((this.dimBTime - dt) / 2.5) !== Math.floor(this.dimBTime / 2.5)) {
        for (const lane of this.lanes.values()) {
          this.generateCodeFaultsForLane(lane);
        }
      }
    }

    // 荧光绿伴随数据方块自转
    if (this.player && this.player.dataCore) {
      this.player.dataCore.rotation.y += dt * 3.5;
      this.player.dataCore.rotation.x += dt * 2.2;
    }

    // 企业巡逻机倒计时
    if (this.state === 'play' && !this.droneActive) {
      this.idleTime -= dt;
      const sec = Math.max(0, Math.ceil(this.idleTime));
      this.timerText.textContent = `${sec}s`;

      if (this.idleTime <= 3.0) {
        this.timerBadge.className = 'timer-danger';
      } else if (this.idleTime <= 6.0) {
        this.timerBadge.className = 'timer-warn';
      } else {
        this.timerBadge.className = 'timer-normal';
      }

      if (this.idleTime <= 0) {
        this.droneActive = true;
        this.drone.visible = true;
        this.drone.position.set(
          this.player.position.x,
          this.player.position.y + 12,
          this.player.position.z - 15
        );
        sfx.playEagle();
      }
    }

    if (this.droneActive) {
      const targetPos = new THREE.Vector3(this.player.position.x, this.player.position.y, this.player.position.z);
      this.drone.position.lerp(targetPos, dt * 10);
      if (this.drone.position.distanceTo(targetPos) < 1.0) {
        this.player.visible = false;
        this.die('eagle');
      }
      this.drone.position.z += 18 * dt;
    }

    // 起跳物理弧度 (防晃动平稳跟踪)
    if (this.isJumping) {
      this.jumpProgress += dt / this.jumpDuration;
      const t = Math.min(1.0, this.jumpProgress);

      this.player.position.x = THREE.MathUtils.lerp(this.playerPos.x, this.targetPos.x, t);
      this.player.position.z = THREE.MathUtils.lerp(this.playerPos.z, this.targetPos.z, t);

      const arc = Math.sin(t * Math.PI);
      this.player.position.y = arc * 0.75;

      const stretch = 1.0 + arc * 0.25;
      const squash  = 1.0 - arc * 0.15;
      this.player.scale.set(0.9 * squash, 0.9 * stretch, 0.9 * squash);

      if (t >= 1.0) {
        this.player.position.x = this.targetPos.x;
        this.player.position.z = this.targetPos.z;
        this.player.position.y = 0;
        this.player.scale.set(0.9, 0.9, 0.9);
        this.playerPos = { ...this.targetPos };
        this.isJumping = false;
        this.jumpProgress = 0;

        this.checkLandingStatus();
      }
    }

    // 随全息芯片平台平移
    if (!this.isJumping && this.currentLog && this.state === 'play') {
      const lane = this.lanes.get(Math.round(this.playerPos.z));
      if (lane) {
        const drift = lane.speed * lane.direction * dt;
        this.player.position.x += drift;
        this.playerPos.x = this.player.position.x;

        const logHalf = (this.currentLog.logWidth || 2.5) / 2;
        const dist = Math.abs(this.player.position.x - this.currentLog.position.x);
        if (dist > logHalf + 0.15) {
          this.currentLog = null;
          this.die('drown');
          return;
        }

        if (Math.abs(this.player.position.x) > HALF_COLS + 1.8) {
          this.die('out');
          return;
        }
      }
    }

    this.updateLanes(dt);

    if (this.state === 'play') {
      this.checkCollisions();
    }

    this.updateCamera(dt);
    this.ensureWorld();
  }

  checkLandingStatus() {
    const curZ = Math.round(this.playerPos.z);
    const lane = this.lanes.get(curZ);
    if (!lane) return;

    // ── 核心判定：维度 B 下是否踩中代码断层黑洞 ──────────────
    if (this.currentDimension === 'B' && lane.codeFaults) {
      const curX = Math.round(this.playerPos.x);
      if (lane.codeFaults.has(curX)) {
        this.die('void');
        return;
      }
    }

    if (lane.type === 'water') {
      let landedOnLog = null;
      for (const log of lane.vehicles) {
        const halfW = (log.logWidth || 2.5) / 2;
        if (Math.abs(this.player.position.x - log.position.x) <= halfW + 0.25) {
          landedOnLog = log;
          break;
        }
      }
      if (landedOnLog) {
        this.currentLog = landedOnLog;
      } else {
        this.die('drown');
      }
    }
  }

  updateLanes(dt) {
    const currentZ = Math.round(this.playerPos.z);
    const minZ = currentZ - 6;
    const maxZ = currentZ + 18;
    const now = performance.now() * 0.005;

    for (let z = minZ; z <= maxZ; z++) {
      const lane = this.lanes.get(z);
      if (!lane) continue;

      if (lane.type === 'road' || lane.type === 'water') {
        const bound = LANE_WIDTH / 2 + 3;
        for (const veh of lane.vehicles) {
          veh.position.x += lane.speed * lane.direction * dt;

          if (lane.type === 'road') {
            veh.position.y = 0.2 + Math.sin(now + veh.position.x * 1.5) * 0.05;
          }

          if (lane.direction > 0 && veh.position.x > bound) {
            veh.position.x = -bound;
          } else if (lane.direction < 0 && veh.position.x < -bound) {
            veh.position.x = bound;
          }
        }
      } else if (lane.type === 'rail') {
        lane.trainTimer -= dt;

        if (lane.trainTimer <= 1.8 && lane.trainTimer > 0) {
          lane.trainComing = true;
          const blink = Math.floor(performance.now() / 180) % 2 === 0;
          if (lane.signal) {
            lane.signal.lightTop.material.color.setHex(blink ? 0xff0055 : 0x330011);
            lane.signal.lightBottom.material.color.setHex(blink ? 0x330011 : 0xff0055);
          }
          if (Math.random() < 0.03) sfx.playTrainBell();
        }

        if (lane.trainTimer <= 0) {
          const train = lane.train;
          train.position.x += lane.speed * lane.direction * dt;

          const exitBound = LANE_WIDTH + 8;
          if ((lane.direction > 0 && train.position.x > exitBound) ||
              (lane.direction < 0 && train.position.x < -exitBound)) {
            train.position.x = (lane.direction > 0) ? -exitBound : exitBound;
            lane.trainTimer = 5.0 + Math.random() * 6.0;
            lane.trainComing = false;
            if (lane.signal) {
              lane.signal.lightTop.material.color.setHex(0x330011);
              lane.signal.lightBottom.material.color.setHex(0x330011);
            }
          }
        }
      }
    }
  }

  checkCollisions() {
    const checkZ = Math.round(this.player.position.z);
    const lane = this.lanes.get(checkZ);
    if (!lane) return;

    const px = this.player.position.x;
    const py = this.player.position.y;
    const pz = this.player.position.z;

    if (Math.abs(pz - checkZ) < 0.45) {
      // ── 核心判定：若处于维度 A，防火墙车辆拥有致命碰撞；维度 B 下虚化无碰撞 ──
      if (lane.type === 'road' && this.currentDimension === 'A') {
        for (const veh of lane.vehicles) {
          const halfW = (veh.vehicleWidth || 1.8) / 2;
          if (Math.abs(px - veh.position.x) < halfW + 0.32 && py < 0.9) {
            sfx.playCarHonk();
            this.die('hit');
            return;
          }
        }
      } else if (lane.type === 'rail') {
        // 磁悬浮列车双维度均具备绝对物理毁灭性
        const train = lane.train;
        if (train) {
          const halfW = (train.vehicleWidth || 12.0) / 2;
          if (Math.abs(px - train.position.x) < halfW + 0.35 && py < 1.3) {
            this.die('train');
            return;
          }
        }
      }
    }
  }

  updateCamera(dt) {
    const targetCamX = this.player.position.x + this.camOffset.x;
    const targetCamY = this.camOffset.y; // 恒定基准面高度，绝不跟随跳跃上下震动
    const targetCamZ = this.player.position.z + this.camOffset.z;

    this.camera.position.x += (targetCamX - this.camera.position.x) * dt * 5.0;
    this.camera.position.y += (targetCamY - this.camera.position.y) * dt * 5.0;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * dt * 5.0;

    const lookTarget = new THREE.Vector3(
      this.player.position.x,
      0.5,
      this.player.position.z
    );
    this.camera.lookAt(lookTarget);

    this.lightTarget.position.copy(lookTarget);
    this.dirLight.position.set(
      lookTarget.x - 20,
      lookTarget.y + 35,
      lookTarget.z - 15
    );
  }

  animate(now) {
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    this.update(dt);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }
}

// 页面装载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  new CrossyGame();
});
