import { MEMORY_TEXT } from '../content/stages.js';
import { createFigure } from '../components/figure.js';
import { $, $$, range, pad, lerp, seeded } from '../lib/util.js';
import { scrubWords } from '../lib/scroll.js';

// 2001. A family homepage built around a Flash movie. Scroll plays the movie frame by frame:
// the Shevlins' dance, the wedding, the store, and a baby. Below it, a framed page with a
// LiveJournal-style diary, a skinned audio player and a guestbook.

const PX = 'shape-rendering="crispEdges"';

const ballroom = `
<svg class="s2-set s2-set--ball" viewBox="0 0 160 120" preserveAspectRatio="xMidYMax slice" ${PX} aria-hidden="true">
  <rect width="160" height="120" fill="#3b2a5c"/>
  ${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 10 + 4}" y="0" width="2" height="72" fill="#45336a"/>`).join('')}
  ${[16, 68, 120]
    .map(
      (x) => `
    <rect x="${x}" y="24" width="24" height="40" fill="#1c1433"/>
    <rect x="${x + 2}" y="26" width="20" height="36" fill="#6d8fd6"/>
    <rect x="${x + 4}" y="22" width="16" height="4" fill="#1c1433"/>
    <rect x="${x + 4}" y="24" width="16" height="2" fill="#6d8fd6"/>
    <rect x="${x + 2}" y="26" width="20" height="10" fill="#8fb0e8"/>
    <rect x="${x + 11}" y="22" width="2" height="42" fill="#1c1433"/>
    <rect x="${x + 2}" y="42" width="20" height="2" fill="#1c1433"/>
    <rect x="${x + 4}" y="28" width="3" height="3" fill="#fff"/>`,
    )
    .join('')}
  <rect x="0" y="72" width="160" height="12" fill="#2c1f47"/>
  <rect x="0" y="72" width="160" height="1" fill="#5b4785"/>
  ${Array.from({ length: 20 }, (_, i) => `<rect x="${i * 8}" y="84" width="8" height="36" fill="${i % 2 ? '#8a552e' : '#a0673a'}"/>`).join('')}
  ${Array.from({ length: 20 }, (_, i) => `<rect x="${i * 8}" y="${i % 2 ? 96 : 108}" width="8" height="1" fill="#6b3f1f"/>`).join('')}
  <rect x="0" y="84" width="160" height="1" fill="#c78a52"/>
  <polygon points="72,16 88,16 118,120 42,120" fill="#ffe9a8" opacity=".12"/>
  <rect x="79" y="0" width="2" height="9" fill="#c9a24a"/>
  <rect x="68" y="9" width="24" height="3" fill="#f2c14e"/>
  <rect x="64" y="12" width="32" height="2" fill="#c9a24a"/>
  <rect x="72" y="14" width="16" height="2" fill="#f2c14e"/>
  ${[66, 72, 78, 84, 90].map((x) => `<rect x="${x}" y="6" width="2" height="3" fill="#fff"/><rect x="${x}" y="4" width="2" height="2" fill="#ffd36b"/>`).join('')}
  <rect x="62" y="2" width="1" height="1" fill="#fff"/><rect x="98" y="5" width="1" height="1" fill="#fff"/><rect x="58" y="11" width="1" height="1" fill="#ffe9a8"/>
</svg>`;

const chapel = `
<svg class="s2-set s2-set--chapel" viewBox="0 0 160 120" preserveAspectRatio="xMidYMax slice" ${PX} aria-hidden="true">
  <rect width="160" height="120" fill="#e8dcc8"/>
  ${Array.from({ length: 8 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<rect x="${c * 20 - (r % 2) * 10}" y="${r * 10}" width="19" height="9" fill="#efe5d4"/>`).join('')).join('')}
  <rect x="52" y="6" width="56" height="60" fill="#b89b5e"/>
  <rect x="56" y="10" width="48" height="56" fill="#3c2f5c"/>
  ${(() => {
    const colors = ['#d26a8f', '#6c8cd5', '#f2c14e', '#7cc47c'];
    let out = '';
    for (let y = 0; y < 13; y++) {
      for (let x = 0; x < 11; x++) {
        const dx = x - 5;
        const dy = y - 6;
        if (dx * dx + dy * dy > 30) continue;
        const c = colors[(Math.abs(dx) + Math.abs(dy) * 2 + (dx * dy > 0 ? 1 : 0)) % 4];
        out += `<rect x="${60 + x * 4}" y="${12 + y * 4}" width="3" height="3" fill="${c}"/>`;
      }
    }
    return out;
  })()}
  <rect x="56" y="66" width="48" height="4" fill="#b89b5e"/>
  ${[14, 134]
    .map(
      (x) => `
    <rect x="${x + 4}" y="14" width="4" height="2" fill="#8a6d2f"/>
    <rect x="${x + 2}" y="16" width="8" height="6" fill="#f2c14e"/>
    <rect x="${x}" y="22" width="12" height="4" fill="#f2c14e"/>
    <rect x="${x + 5}" y="26" width="2" height="2" fill="#8a6d2f"/>
    <rect x="${x + 3}" y="17" width="2" height="4" fill="#fff4c2"/>`,
    )
    .join('')}
  <rect x="0" y="80" width="160" height="40" fill="#cbb894"/>
  <polygon points="72,80 88,80 104,120 56,120" fill="#b0304f"/>
  <polygon points="76,80 84,80 92,120 68,120" fill="#c84466"/>
  ${[0, 1, 2].map((i) => `<rect x="${4 + i * 6}" y="${86 + i * 11}" width="${42 - i * 6}" height="6" fill="#7a4a2a"/><rect x="${114 + i * 0}" y="${86 + i * 11}" width="${42 - i * 6}" height="6" fill="#7a4a2a"/>`).join('')}
  <rect x="0" y="80" width="160" height="1" fill="#a8946c"/>
</svg>`;

const store = `
<svg class="s2-set s2-set--store" viewBox="0 0 160 120" preserveAspectRatio="xMidYMax slice" ${PX} aria-hidden="true">
  <rect width="160" height="120" fill="#9fc4f0"/>
  <rect x="0" y="0" width="160" height="30" fill="#b7d3f5"/>
  <rect x="120" y="8" width="16" height="4" fill="#fff"/><rect x="116" y="10" width="26" height="4" fill="#fff"/>
  <rect x="8" y="6" width="148" height="86" fill="#7a3b2e"/>
  ${Array.from({ length: 9 }, (_, r) => Array.from({ length: 13 }, (_, c) => `<rect x="${8 + c * 12 - (r % 2) * 6}" y="${6 + r * 10}" width="1" height="10" fill="#6a3024"/>`).join('') + `<rect x="8" y="${6 + r * 10}" width="148" height="1" fill="#6a3024"/>`).join('')}
  <rect x="16" y="12" width="132" height="18" fill="#1f2a6b"/>
  <rect x="17" y="13" width="130" height="1" fill="#3f4c9b"/>
  <text x="82" y="25" text-anchor="middle" font-family="Silkscreen, monospace" font-size="8" fill="#f2c14e">ROGER BUTTON &amp; CO.</text>
  ${Array.from({ length: 11 }, (_, i) => `<rect x="${12 + i * 12}" y="34" width="12" height="10" fill="${i % 2 ? '#fff' : '#2f7d4f'}"/><rect x="${14 + i * 12}" y="44" width="8" height="2" fill="${i % 2 ? '#fff' : '#2f7d4f'}"/>`).join('')}
  ${[18, 104]
    .map(
      (x) => `
    <rect x="${x}" y="50" width="42" height="36" fill="#2b1a14"/>
    <rect x="${x + 2}" y="52" width="38" height="32" fill="#cfe3f0"/>
    <rect x="${x + 2}" y="52" width="10" height="3" fill="#fff"/>
    <rect x="${x + 6}" y="64" width="12" height="3" fill="#555"/><rect x="${x + 10}" y="67" width="3" height="14" fill="#8a552e"/>
    <rect x="${x + 22}" y="62" width="4" height="4" fill="#555"/><rect x="${x + 21}" y="66" width="14" height="10" fill="#777"/><rect x="${x + 24}" y="70" width="2" height="3" fill="#333"/>`,
    )
    .join('')}
  <rect x="68" y="50" width="28" height="42" fill="#2b1a14"/>
  <rect x="70" y="52" width="24" height="40" fill="#4a2c1e"/>
  <rect x="72" y="56" width="20" height="14" fill="#cfe3f0"/>
  <rect x="88" y="74" width="2" height="4" fill="#f2c14e"/>
  <rect x="0" y="92" width="160" height="28" fill="#b9b1a2"/>
  <rect x="0" y="92" width="160" height="2" fill="#d6cfc2"/>
  ${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 20 + 10}" y="94" width="1" height="26" fill="#a39b8c"/>`).join('')}
</svg>`;

const smiley = `<svg viewBox="0 0 12 12" width="14" height="14" ${PX} aria-hidden="true"><rect x="3" y="0" width="6" height="12" fill="#ffcc00"/><rect x="0" y="3" width="12" height="6" fill="#ffcc00"/><rect x="1" y="1" width="10" height="10" fill="#ffcc00"/><rect x="3" y="3" width="2" height="2" fill="#000"/><rect x="7" y="3" width="2" height="2" fill="#000"/><rect x="3" y="7" width="6" height="1" fill="#000"/><rect x="2" y="6" width="1" height="1" fill="#000"/><rect x="9" y="6" width="1" height="1" fill="#000"/></svg>`;

const ICONS = {
  dancecard: '#d26a8f',
  invitation: '#b89b5e',
  catalog: '#1f2a6b',
  roscoe: '#7c93d6',
};

export function markup(s) {
  const rand = seeded(7);
  return `
  <section class="stage s2" id="stage-2" aria-labelledby="s2-title">
    <div class="scene s2-scene">
      <div class="scene__sticky s2-sticky">
        <div class="s2-center">
          <div class="s2-movie">
            <div class="s2-movie__bar" aria-hidden="true">
              <span class="s2-movie__lights"><i></i><i></i><i></i></span>
              <span class="s2-movie__file">button_family.swf</span>
              <span class="s2-movie__frame">frame <b data-s2-frame>001</b></span>
            </div>
            <div class="s2-screen">
              ${ballroom}${chapel}${store}
              <div class="s2-confetti" aria-hidden="true">
                ${Array.from({ length: 36 }, (_, i) => `<i style="--x:${(rand() * 100).toFixed(1)}%;--d:${(0.6 + rand() * 0.9).toFixed(2)};--c:${['#d26a8f', '#f2c14e', '#fff', '#8fb0e8'][i % 4]}"></i>`).join('')}
              </div>
              <div class="s2-actor s2-actor--ben"></div>
              <div class="s2-actor s2-actor--hil"></div>
              <div class="s2-actor s2-actor--baby"></div>
              <div class="s2-titlecard">
                <h1 class="s2-title" id="s2-title">${s.title}</h1>
                <p class="s2-year" data-s2-year>1880</p>
              </div>
              <p class="s2-lower" aria-live="off"><span data-s2-lower>the Shevlins’ country house, august 1880</span></p>
              <a class="s2-skip" href="#s2-site">skip intro &raquo;</a>
            </div>
            <div class="s2-movie__nav" aria-hidden="true">
              <span>home</span><span>our story</span><span>the store</span><span>guestbook</span><span>baby</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="s2-site" id="s2-site">
      <div class="s2-window">
        <div class="s2-window__bar">
          <span class="s2-window__icon" aria-hidden="true"></span>
          <span>Ben &amp; Hildegarde’s family page</span>
          <span class="s2-window__btns" aria-hidden="true"><i></i><i></i><i></i></span>
        </div>
        <div class="s2-frames">
          <aside class="s2-left">
            <div class="s2-panel">
              <h2 class="s2-h">memories</h2>
              <div class="s2-btns">
                ${s.memories
                  .map(
                    (id) => `<button type="button" class="s2-btn" data-memory="${id}" style="--dot:${ICONS[id]}"><span class="s2-btn__dot"></span>${MEMORY_TEXT[id].title}</button>`,
                  )
                  .join('')}
              </div>
            </div>

            <div class="s2-amp" data-player>
              <audio preload="metadata" src="${s.audio.src}"></audio>
              <div class="s2-amp__title" aria-hidden="true"><span class="s2-amp__grip"></span><span>family player</span><span class="s2-amp__grip"></span></div>
              <div class="s2-amp__main">
                <div class="s2-amp__lcd">
                  <span class="s2-amp__state" aria-hidden="true"></span>
                  <span class="s2-amp__time" data-time>0:00</span>
                  <canvas class="s2-amp__viz" data-viz="blocks" aria-hidden="true"></canvas>
                </div>
                <div class="s2-amp__info">
                  <div class="s2-amp__marquee"><span>1. ${s.audio.file} &nbsp;*** &nbsp;1. ${s.audio.file} &nbsp;*** &nbsp;</span></div>
                  <div class="s2-amp__kbps" aria-hidden="true"><b>64</b>kbps <b>22</b>khz <em>mono</em></div>
                </div>
              </div>
              <div class="s2-amp__seek" data-seek aria-hidden="true"><i></i></div>
              <div class="s2-amp__buttons">
                <span class="s2-amp__b" aria-hidden="true">&#9198;</span>
                <button type="button" class="s2-amp__b s2-amp__play" data-play aria-label="Play or pause Benjamin's recording"><span class="i-play">&#9654;</span><span class="i-pause">&#10074;&#10074;</span></button>
                <button type="button" class="s2-amp__b" data-stop aria-label="Stop">&#9632;</button>
                <span class="s2-amp__b" aria-hidden="true">&#9197;</span>
              </div>
              <details class="s2-transcript"><summary>transcript</summary><p>${s.audio.transcript}</p></details>
            </div>
          </aside>

          <div class="s2-right">
            ${s.diary
              .map(
                (d, i) => `
              <article class="s2-lj">
                <header class="s2-lj__head">
                  <div class="s2-lj__pic" data-s2-userpic="${i}"></div>
                  <div class="s2-lj__who">
                    <span class="s2-lj__user"><svg viewBox="0 0 10 12" width="10" height="12" ${PX} aria-hidden="true"><rect x="3" y="0" width="4" height="4" fill="#1f2a6b"/><rect x="1" y="5" width="8" height="7" fill="#1f2a6b"/></svg>benjamin_b</span>
                    <time>${d.date}</time>
                  </div>
                </header>
                <h3 class="s2-lj__subject">${d.subject}</h3>
                <dl class="s2-lj__meta">
                  <div><dt>Current mood:</dt><dd>${smiley} ${d.mood}</dd></div>
                  <div><dt>Current music:</dt><dd>${d.music}</dd></div>
                </dl>
                <p class="s2-lj__body" data-scrub-words>${d.body}</p>
                <footer class="s2-lj__foot">( <a href="#s2-guestbook">${i + 2} comments</a> | <a href="#s2-guestbook">Leave a comment</a> )</footer>
              </article>`,
              )
              .join('')}

            <section class="s2-guestbook" id="s2-guestbook" aria-labelledby="s2-gb">
              <h2 class="s2-h" id="s2-gb">guestbook</h2>
              ${s.guestbook
                .map(
                  (g, i) => `
                <div class="s2-gb">
                  <span class="s2-gb__num">#${pad(s.guestbook.length - i, 3)}</span>
                  <b>${g.name}</b>
                  <p>${g.text}</p>
                </div>`,
                )
                .join('')}
              <p class="s2-gb__sign">sign my guestbook! <span class="s2-gb__arrow" aria-hidden="true">&#9664;</span></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

const LOWER = [
  [0, 'the Shevlins’ country house, august 1880'],
  [0.36, 'married, and Baltimore never quite recovered'],
  [0.68, 'a son, and a family fortune that doubled'],
];

export function init({ ScrollTrigger }) {
  const root = $('#stage-2');
  const screen = $('.s2-screen', root);
  const outline = '#fff';
  const ben = createFigure($('.s2-actor--ben', root), { mode: 'canvas', paint: '#1f2a6b', beard: '#dfe4ff', pixel: 6, outline, label: 'Benjamin, in pixels' });
  const hil = createFigure($('.s2-actor--hil', root), { cast: 'hildegarde', mode: 'canvas', paint: '#c2477a', pixel: 6, outline, label: 'Hildegarde, in pixels' });
  const baby = createFigure($('.s2-actor--baby', root), { mode: 'canvas', paint: '#5b6fb8', pixel: 6, outline });

  $$('[data-s2-userpic]', root).forEach((el, i) => {
    createFigure(el, { mode: 'canvas', paint: '#1f2a6b', beard: '#dfe4ff', pixel: 8, outline: '#fff' }).set(1 + i * 0.4);
  });

  const frameEl = $('[data-s2-frame]', root);
  const yearEl = $('[data-s2-year]', root);
  const lowerEl = $('[data-s2-lower]', root);
  let lastLower = '';
  let lastYear = 0;

  ScrollTrigger.create({
    trigger: $('.s2-scene', root),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress: p }) => {
      screen.style.setProperty('--p', p.toFixed(4));
      screen.style.setProperty('--intro', range(p, 0, 0.1).toFixed(3));
      screen.style.setProperty('--chapel', range(p, 0.33, 0.39).toFixed(3));
      screen.style.setProperty('--store', range(p, 0.65, 0.71).toFixed(3));
      screen.style.setProperty('--confetti', range(p, 0.38, 0.66).toFixed(3));
      screen.style.setProperty('--hil-x', lerp(112, 56, range(p, 0.05, 0.3)).toFixed(2));
      screen.style.setProperty('--ben-x', lerp(18, 30, range(p, 0.2, 0.36)).toFixed(2));
      screen.style.setProperty('--baby', range(p, 0.72, 0.8).toFixed(3));
      screen.style.setProperty('--title', (1 - range(p, 0.12, 0.2)).toFixed(3));

      ben.set(1 + p * 0.8);
      hil.set(range(p, 0.1, 1) * 0.9);
      baby.set(5);

      frameEl.textContent = pad(1 + Math.round(p * 359), 3);
      const year = Math.round(lerp(1880, 1897, range(p, 0.35, 1)));
      if (year !== lastYear) {
        yearEl.textContent = year;
        lastYear = year;
      }
      const lower = [...LOWER].reverse().find(([at]) => p >= at)[1];
      if (lower !== lastLower) {
        lowerEl.textContent = lower;
        lastLower = lower;
      }
    },
  });

  $$('[data-scrub-words]', root).forEach((el) => scrubWords(el, ScrollTrigger));
}
