// Draw ticks & numbers
const ticksG = document.getElementById('ticks');
const numsG  = document.getElementById('hour-nums');
const cx = 120, cy = 120, r = 118;

for (let i = 0; i < 60; i++) {
  const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
  const major = i % 5 === 0;
  const outer = r - 2;
  const inner = major ? outer - 12 : outer - 6;
  const x1 = cx + Math.cos(angle) * outer;
  const y1 = cy + Math.sin(angle) * outer;
  const x2 = cx + Math.cos(angle) * inner;
  const y2 = cy + Math.sin(angle) * inner;

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1); line.setAttribute('y1', y1);
  line.setAttribute('x2', x2); line.setAttribute('y2', y2);
  line.setAttribute('class', 'tick ' + (major ? 'tick-major' : 'tick-minor'));
  ticksG.appendChild(line);
}

const hourLabels = [12,1,2,3,4,5,6,7,8,9,10,11];
hourLabels.forEach((h, i) => {
  const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
  const nr = r - 26;
  const x = cx + Math.cos(angle) * nr;
  const y = cy + Math.sin(angle) * nr;
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', x); text.setAttribute('y', y);
  text.setAttribute('class', 'hour-num');
  text.textContent = h;
  numsG.appendChild(text);
});

// Toggle dark/light mode
const toggleBtn = document.getElementById('toggleBtn');
const html = document.documentElement;
toggleBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  toggleBtn.textContent = isDark ? 'Mode sombre' : 'Mode clair';
});

// Clock hands & display
const handH = document.getElementById('handH');
const handM = document.getElementById('handM');
const handS = document.getElementById('handS');
const timeD = document.getElementById('timeDisp');
const secD  = document.getElementById('secDisp');
const dateD = document.getElementById('dateDisp');

const jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
const mois  = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function pad(n) { return n < 10 ? '0' + n : n; }

function tick() {
  const now = new Date();
  const h  = now.getHours();
  const m  = now.getMinutes();
  const s  = now.getSeconds();
  const ms = now.getMilliseconds();

  // Smooth continuous rotation
  const hDeg = ((h % 12) + m / 60 + s / 3600) * 30;
  const mDeg = (m + s / 60) * 6;
  const sDeg = (s + ms / 1000) * 6;

  handH.style.transform = `rotate(${hDeg}deg)`;
  handM.style.transform = `rotate(${mDeg}deg)`;
  handS.style.transform = `rotate(${sDeg}deg)`;

  // Digital display
  timeD.innerHTML = `${pad(h)}<span class="sep">:</span>${pad(m)}`;
  secD.textContent = `${pad(s)} s`;

  // Date
  const jour = jours[now.getDay()];
  const num  = now.getDate();
  const mo   = mois[now.getMonth()];
  dateD.textContent = `${jour} ${num} ${mo}`;
}

tick();
setInterval(tick, 50);