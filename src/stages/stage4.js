import { MEMORY_TEXT } from '../content/stages.js';
import { createFigure } from '../components/figure.js';
import { $, $$, range, lerp, seeded } from '../lib/util.js';
import { scrubWords } from '../lib/scroll.js';

// 2015. Material Design, flat illustration, long shadows. Scroll runs Benjamin down the field
// against Yale, opens a chat where his son asks to be called Uncle, then walks through a
// stepper that ends with him sent home from the war.

const ICON = {
  program: '<ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-35 12 12)"/><path d="M9 12h6M11 10.5v3M13 10.5v3" stroke="#a51c30" stroke-width="1.2" stroke-linecap="round" transform="rotate(-35 12 12)"/>',
  uncle: '<path d="M4 6h16v12H4z"/><path d="M4 6l8 7 8-7" fill="none" stroke="#ffa000" stroke-width="1.6"/>',
  commission: '<path d="M12 3l2.6 5.4 5.9.9-4.3 4.1 1 5.9L12 16.5l-5.2 2.8 1-5.9L3.5 9.3l5.9-.9z"/>',
  uniform: '<path d="M8 4l4 3 4-3 4 3-2 4h-2v9H8v-9H6L4 7z"/>',
};
const ICON_BG = { program: '#a51c30', uncle: '#ffc107', commission: '#546e7a', uniform: '#827717' };

const STEPS = [
  ['Commission received', 'Brigadier general, by letter from the War Department'],
  ['Reported to camp', 'In the uniform from 1898, taken in twice'],
  ['Turned away at the gate', 'The sentry saw a boy of about thirteen'],
  ['Sent home', 'Roscoe drove down to collect him'],
];

export function markup(s) {
  const rand = seeded(19);
  const crowd = Array.from({ length: 120 }, (_, i) => {
    const row = i % 4;
    const x = ((i * 37) % 1200) + rand() * 10;
    const y = 214 + row * 26 + (Math.floor(i / 4) % 2) * 6;
    const c = ['#ffcdd2', '#ffffff', '#ffc107', '#f8bbd0'][Math.floor(rand() * 4)];
    return `<circle cx="${x.toFixed(0)}" cy="${y}" r="5" fill="${c}"/>`;
  }).join('');

  return `
  <section class="stage s4" id="stage-4" aria-labelledby="s4-title">
    <div class="scene s4-scene">
      <div class="scene__sticky s4-sticky">
        <header class="s4-appbar">
          <span class="s4-burger" aria-hidden="true"><i></i><i></i><i></i></span>
          <h1 class="s4-appbar__title" id="s4-title">${s.title}</h1>
          <span class="s4-appbar__year" data-s4-year>1910</span>
        </header>

        <div class="s4-field">
          <svg class="s4-illo" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs><clipPath id="s4-sky-clip"><rect width="1200" height="640"/></clipPath></defs>
            <g clip-path="url(#s4-sky-clip)">
              <rect width="1200" height="640" fill="#b3e5fc"/>
              <circle cx="930" cy="120" r="64" fill="#fff59d"/>
              <path d="M930 120 L1300 490 L1300 380 L975 75Z" fill="#000" opacity=".04"/>
              <g fill="#fff">
                <rect x="150" y="80" width="160" height="34" rx="17"/><rect x="200" y="58" width="80" height="40" rx="20"/>
                <rect x="620" y="130" width="130" height="28" rx="14"/><rect x="650" y="112" width="60" height="34" rx="17"/>
              </g>
              <path d="M0 200 H1200 V380 H0Z" fill="#a51c30"/>
              <path d="M0 200 L180 380 H0Z M300 200 L480 380 H300Z M600 200 L780 380 H600Z M900 200 L1080 380 H900Z" fill="#000" opacity=".08"/>
              ${crowd}
              <path d="M0 196 H1200 V206 H0Z" fill="#7a1323"/>
              ${[60, 360, 660, 960].map((x) => `<path d="M${x} 150 V200" stroke="#fff" stroke-width="4"/><path d="M${x + 2} 150 l40 12 -40 12Z" fill="${x % 600 === 60 ? '#ffc107' : '#fff'}"/>`).join('')}
              <path d="M0 380 H1200 V640 H0Z" fill="#43a047"/>
              ${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 100} 380 H${i * 100 + 50} L${i * 100 + 10} 640 H${i * 100 - 40}Z" fill="#4caf50"/>`).join('')}
              ${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 100 - 2} 380 L${i * 100 - 52} 640" stroke="#fff" stroke-width="4" opacity=".75"/>`).join('')}
              <path d="M1050 250 V470 M1130 250 V470 M1050 400 H1130 M1090 400 V520" stroke="#ffc107" stroke-width="10" stroke-linecap="round"/>
              <path d="M1095 520 L1240 665 L1260 645 L1115 500Z M1135 250 L1280 395 L1300 375 L1140 235Z" fill="#000" opacity=".1"/>
            </g>
          </svg>
          <div class="s4-runner"><div class="s4-actor"></div></div>
        </div>

        <div class="s4-board">
          <div class="s4-board__row"><span class="s4-board__team s4-board__team--h">H</span><span>Harvard</span><b data-s4-td>0</b><small>TD</small><b data-s4-fg>0</b><small>FG</small></div>
          <div class="s4-board__row"><span class="s4-board__team s4-board__team--y">Y</span><span>Yale</span><b>0</b><small>TD</small><b>0</b><small>FG</small></div>
        </div>

        <div class="s4-sheet" role="group" aria-label="A conversation between Benjamin and his son Roscoe">
          <div class="s4-sheet__handle" aria-hidden="true"></div>
          <div class="s4-sheet__head">
            <div class="s4-pair" aria-hidden="true">
              <div class="s4-pair__fig s4-pair__fig--roscoe"></div>
              <div class="s4-pair__fig s4-pair__fig--ben"></div>
            </div>
            <div class="s4-sheet__who"><b>Roscoe</b><span>his son, now taller than he is</span></div>
          </div>
          <ol class="s4-chat">
            ${s.chat.map((m, i) => `<li class="s4-msg s4-msg--${m.from}" style="--i:${i}">${m.text}</li>`).join('')}
            <li class="s4-typing" aria-hidden="true"><i></i><i></i><i></i></li>
          </ol>
        </div>

        <div class="s4-stepper" role="group" aria-labelledby="s4-step-h">
          <h2 class="s4-stepper__h" id="s4-step-h">Reporting for duty, 1917</h2>
          <ol>
            ${STEPS.map(
              ([title, sub], i) => `
              <li class="s4-step ${i === 2 ? 's4-step--error' : ''}" data-step="${i}">
                <span class="s4-step__dot">${i === 2 ? '!' : i + 1}</span>
                <div><b>${title}</b><span>${sub}</span></div>
              </li>`,
            ).join('')}
          </ol>
        </div>

        <button type="button" class="s4-fab" data-memory="program" aria-label="Open the Harvard vs. Yale program">
          <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-35 12 12)" fill="#3e2723"/><path d="M9 12h6M11 10.5v3M13 10.5v3" stroke="#fff" stroke-width="1.2" stroke-linecap="round" transform="rotate(-35 12 12)"/></svg>
        </button>
      </div>
    </div>

    <div class="s4-site">
      <article class="s4-article">
        <header class="s4-author">
          <div class="s4-avatar" aria-hidden="true"></div>
          <div class="s4-author__who"><b>Benjamin Button</b><span>Harvard, class of 1914</span></div>
          <span class="s4-read">4 min read</span>
        </header>
        <h2 class="s4-article__title">Notes from the beginning of youth</h2>
        ${s.diary
          .map(
            (d) => `
          <h3 class="s4-kicker">${d.date}</h3>
          <p class="s4-body" data-scrub-words>${d.body}</p>`,
          )
          .join('')}
      </article>

      <aside class="s4-aside">
        <div class="s4-card s4-sc" data-player>
          <audio preload="metadata" src="${s.audio.src}"></audio>
          <div class="s4-sc__top">
            <button type="button" class="s4-sc__play" data-play aria-label="Play or pause Benjamin's recording">
              <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
              <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
            </button>
            <div class="s4-sc__who"><span>benjamin_button</span><b>${s.audio.file}</b></div>
            <span class="s4-sc__tag">reflection</span>
          </div>
          <div class="s4-sc__wave" data-seek aria-hidden="true">
            <div class="s4-sc__bars">${Array.from({ length: 64 }, (_, i) => `<i style="--h:${(0.25 + Math.abs(Math.sin(i * 0.37) * 0.55) + rand() * 0.2).toFixed(2)}"></i>`).join('')}</div>
            <div class="s4-sc__bars s4-sc__bars--played">${Array.from({ length: 64 }, (_, i) => `<i style="--h:${(0.25 + Math.abs(Math.sin(i * 0.37) * 0.55) + seeded(19 + i)() * 0.2).toFixed(2)}"></i>`).join('')}</div>
          </div>
          <div class="s4-sc__times"><span data-time>0:00</span><span data-duration>0:00</span></div>
          <details class="s4-transcript"><summary>Transcript</summary><p>${s.audio.transcript}</p></details>
        </div>

        <div class="s4-card s4-mem">
          <h3 class="s4-card__h">Memories</h3>
          <div class="s4-icons">
            ${s.memories
              .map(
                (id) => `
              <button type="button" class="s4-icon" data-memory="${id}" style="--bg:${ICON_BG[id]}">
                <span class="s4-icon__disc"><svg viewBox="0 0 24 24" aria-hidden="true" fill="#fff">${ICON[id]}</svg></span>
                <span class="s4-icon__label">${MEMORY_TEXT[id].title}</span>
              </button>`,
              )
              .join('')}
          </div>
        </div>
      </aside>
    </div>
  </section>`;
}

export function init({ ScrollTrigger }) {
  const root = $('#stage-4');
  const sticky = $('.s4-sticky', root);
  const runner = createFigure($('.s4-actor', root), { paint: '#7a1323', label: 'Benjamin running with a football' });
  const roscoe = createFigure($('.s4-pair__fig--roscoe', root), { cast: 'roscoe', paint: '#37474f' });
  const young = createFigure($('.s4-pair__fig--ben', root), { paint: '#a51c30' });
  roscoe.set(0);
  createFigure($('.s4-avatar', root), { paint: '#fff' }).set(3);

  const td = $('[data-s4-td]', root);
  const fg = $('[data-s4-fg]', root);
  const yearEl = $('[data-s4-year]', root);
  const msgs = $$('.s4-msg', root);
  const typing = $('.s4-typing', root);
  const steps = $$('.s4-step', root);
  let last = {};

  ScrollTrigger.create({
    trigger: $('.s4-scene', root),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress: p }) => {
      const run = range(p, 0.02, 0.36);
      sticky.style.setProperty('--run', run.toFixed(4));
      sticky.style.setProperty('--board', range(p, 0.04, 0.1).toFixed(3));
      sticky.style.setProperty('--sheet', range(p, 0.38, 0.46).toFixed(3));
      sticky.style.setProperty('--sheet-out', range(p, 0.66, 0.72).toFixed(3));
      sticky.style.setProperty('--stepper', range(p, 0.7, 0.78).toFixed(3));

      runner.set(3 + p * 0.25);
      young.set(3.3 + range(p, 0.38, 0.7) * 0.4);

      const t = Math.floor(run * 7.99);
      const f = Math.floor(run * 14.99);
      const y = Math.round(lerp(1910, 1920, p));
      if (t !== last.t) td.textContent = t;
      if (f !== last.f) fg.textContent = f;
      if (y !== last.y) yearEl.textContent = y;
      last = { t, f, y };

      const chat = range(p, 0.44, 0.64);
      msgs.forEach((m, i) => m.classList.toggle('on', chat > (i + 0.35) / msgs.length));
      typing.classList.toggle('on', chat > 0.05 && chat < 0.98 && !msgs.every((m) => m.classList.contains('on')));

      const stepP = range(p, 0.76, 0.98);
      steps.forEach((el, i) => el.classList.toggle('on', stepP > i / steps.length));
    },
  });

  $$('[data-scrub-words]', root).forEach((el) => scrubWords(el, ScrollTrigger));
}
