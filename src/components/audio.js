import { $$, formatTime } from '../lib/util.js';

// Shared behavior for all five era-skinned players. Each skin only needs:
//   [data-player] root with an <audio> inside
//   [data-play] toggle, optional [data-stop], [data-seek] track, [data-time], [data-viz] <canvas>
// Progress is exposed as --progress (0..1) and state as data-state for the CSS to use.

let ctx = null;
const players = [];

function ensureAnalyser(player) {
  if (player.analyser || !player.viz) return;
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)();
    const source = ctx.createMediaElementSource(player.audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.72;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    player.analyser = analyser;
    player.bins = new Uint8Array(analyser.frequencyBinCount);
  } catch {
    player.analyser = null;
  }
}

function drawViz(player) {
  const { viz, analyser, bins, root } = player;
  if (!viz) return;
  const c = viz.getContext('2d');
  const w = (viz.width = viz.clientWidth * devicePixelRatio);
  const h = (viz.height = viz.clientHeight * devicePixelRatio);
  c.clearRect(0, 0, w, h);
  if (!analyser) return;
  analyser.getByteFrequencyData(bins);
  const style = getComputedStyle(root);
  const color = style.getPropertyValue('--viz').trim() || '#0f0';
  const peak = style.getPropertyValue('--viz-peak').trim() || color;
  const mode = viz.dataset.viz;
  const count = mode === 'mirror' ? 48 : 20;
  const gap = mode === 'blocks' ? 2 * devicePixelRatio : 1 * devicePixelRatio;
  const bw = (w - gap * (count - 1)) / count;
  for (let i = 0; i < count; i++) {
    const v = bins[Math.floor((i / count) * bins.length * 0.8)] / 255;
    const x = i * (bw + gap);
    if (mode === 'mirror') {
      const bh = Math.max(2 * devicePixelRatio, v * h * 0.9);
      c.fillStyle = color;
      c.beginPath();
      c.roundRect?.(x, (h - bh) / 2, bw, bh, bw / 2) ?? c.rect(x, (h - bh) / 2, bw, bh);
      c.fill();
    } else {
      const bh = v * h;
      const cell = 3 * devicePixelRatio;
      for (let y = h; y > h - bh; y -= cell) {
        c.fillStyle = y < h * 0.35 ? peak : color;
        c.fillRect(x, y - cell + devicePixelRatio, bw, cell - devicePixelRatio);
      }
    }
  }
}

function loop() {
  const active = players.filter((p) => !p.audio.paused);
  active.forEach(drawViz);
  if (active.length) requestAnimationFrame(loop);
}

export function initPlayers(root = document) {
  $$('[data-player]', root).forEach((el) => {
    const audio = el.querySelector('audio');
    const player = {
      root: el,
      audio,
      viz: el.querySelector('[data-viz]'),
      time: el.querySelectorAll('[data-time]'),
      duration: el.querySelectorAll('[data-duration]'),
    };
    players.push(player);
    el.dataset.state = 'idle';

    const sync = () => {
      const d = audio.duration || 0;
      el.style.setProperty('--progress', d ? audio.currentTime / d : 0);
      player.time.forEach((t) => (t.textContent = formatTime(audio.currentTime)));
      player.duration.forEach((t) => (t.textContent = formatTime(d)));
    };

    const toggle = async () => {
      if (audio.paused) {
        players.forEach((p) => p !== player && p.audio.pause());
        ensureAnalyser(player);
        if (ctx?.state === 'suspended') await ctx.resume();
        try {
          await audio.play();
        } catch {
          el.dataset.state = 'error';
        }
      } else {
        audio.pause();
      }
    };

    el.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', toggle));
    el.querySelectorAll('[data-stop]').forEach((b) =>
      b.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        sync();
      }),
    );
    el.querySelectorAll('[data-seek]').forEach((track) => {
      track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect();
        const f = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        if (audio.duration) {
          audio.currentTime = f * audio.duration;
          sync();
        }
      });
    });

    audio.addEventListener('play', () => {
      el.dataset.state = 'playing';
      requestAnimationFrame(loop);
    });
    audio.addEventListener('pause', () => (el.dataset.state = audio.currentTime ? 'paused' : 'idle'));
    audio.addEventListener('ended', () => {
      el.dataset.state = 'idle';
      audio.currentTime = 0;
      sync();
    });
    audio.addEventListener('timeupdate', sync);
    audio.addEventListener('loadedmetadata', sync);
    audio.addEventListener('error', () => (el.dataset.state = 'error'));
  });
}
