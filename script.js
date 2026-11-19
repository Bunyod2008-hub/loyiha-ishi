const time = document.getElementById('time');
const start = document.getElementById('start');
const laps = document.getElementById('laps');

let elapsed = 0, last = 0, timer = null;

const fmt = ms => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor(ms % 60000 / 1000);
  const c = Math.floor(ms % 1000 / 10);
  return [m, s].map(n => String(n).padStart(2, '0')).join(':') + '.' + String(c).padStart(2, '0');
};

start.onclick = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    start.textContent = 'Davom etish';
  } else {
    last = Date.now();
    timer = setInterval(() => {
      const n = Date.now();
      elapsed += n - last;
      last = n;
      time.textContent = fmt(elapsed);
    }, 30);
    start.textContent = "To'xtatish";
  }
};

document.getElementById('lap').onclick = () => {
  if (!elapsed) return;
  const li = document.createElement('li');
  li.textContent = fmt(elapsed);
  laps.prepend(li);
};

document.getElementById('reset').onclick = () => {
  clearInterval(timer);
  timer = null;
  elapsed = 0;
  time.textContent = '00:00.00';
  laps.innerHTML = '';
  start.textContent = 'Boshlash';
};