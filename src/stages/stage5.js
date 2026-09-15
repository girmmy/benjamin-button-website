import { MEMORY_TEXT } from '../content/stages.js';
import { createFigure } from '../components/figure.js';
import { $, $$, range, lerp } from '../lib/util.js';
import { scrubWords } from '../lib/scroll.js';

// 2026. Soft glass tiles and a variable typeface. It is the most modern page on the site,
// and it forgets: blocks fall off the word BENJAMIN, sentences turn into loading skeletons,
// the type thins out, and the night comes in until the page is dark.

const LETTERS = 'BENJAMIN'.split('');
const BLOCK_TINTS = ['#ffcbb6', '#d7d1ff', '#c6ecfa', '#ffe3a6', '#ffcbb6', '#d7d1ff', '#c6ecfa', '#ffe3a6'];

const CHIP_ICON = {
  blocks: '<rect x="3" y="11" width="8" height="8" rx="2"/><rect x="13" y="11" width="8" height="8" rx="2"/><rect x="8" y="3" width="8" height="8" rx="2"/>',
  nana: '<path d="M12 3a6 6 0 0 1 6 6c0 5-6 12-6 12S6 14 6 9a6 6 0 0 1 6-6z"/>',
  milk: '<path d="M9 2h6v3l2 3v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8l2-3z"/>',
  crib: '<path d="M4 8v12M20 8v12M4 11h16M4 18h16M8 11v7M12 11v7M16 11v7" stroke="currentColor" stroke-width="1.6" fill="none"/>',
};

const LAST = ['He did not remember San Juan Hill.', 'Or Hildegarde.', 'Only the crib, and Nana, and warm milk.', 'Then it was all dark.'];

export function markup(s) {
  return `
  <section class="stage s5" id="stage-5" aria-labelledby="s5-title">
    <div class="scene s5-sceneA">
      <div class="scene__sticky s5-stickyA">
        <div class="s5-ambient" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="s5-bento">
          <div class="s5-tile s5-tile--title">
            <h1 class="s5-title" id="s5-title">${s.title}</h1>
            <p class="s5-forget"><span class="s5-text">Kindergarten, 1920. He sits next to Roscoe’s boy.</span><span class="s5-skel" aria-hidden="true"></span></p>
          </div>
          <div class="s5-tile s5-tile--fig"><div class="s5-actor"></div></div>
          <div class="s5-tile s5-tile--blocks">
            <div class="s5-blocks" role="img" aria-label="Alphabet blocks spelling BENJAMIN, falling away one by one">
              ${LETTERS.map((l, i) => `<span class="s5-block" style="--tint:${BLOCK_TINTS[i]}">${l}</span>`).join('')}
            </div>
          </div>
          <div class="s5-tile s5-tile--milk">
            <svg class="s5-bottle" viewBox="0 0 80 140" aria-hidden="true">
              <defs><clipPath id="s5-bottle-clip"><path d="M30 26h20v14q14 6 14 22v62q0 10-10 10H26q-10 0-10-10V62q0-16 14-22z"/></clipPath></defs>
              <rect x="27" y="6" width="26" height="20" rx="8" fill="#f2a7a0"/>
              <g clip-path="url(#s5-bottle-clip)">
                <rect width="80" height="140" fill="rgba(255,255,255,.5)"/>
                <rect class="s5-milk" x="0" y="0" width="80" height="140" fill="#fffdf7"/>
              </g>
              <path d="M30 26h20v14q14 6 14 22v62q0 10-10 10H26q-10 0-10-10V62q0-16 14-22z" fill="none" stroke="#fff" stroke-width="2.5"/>
              <path d="M23 66v52" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
            </svg>
            <p class="s5-forget s5-forget--small"><span class="s5-text">Nana warms it.</span><span class="s5-skel" aria-hidden="true"></span></p>
          </div>
          <div class="s5-tile s5-tile--note">
            <p class="s5-forget"><span class="s5-text">Miss Bailey says his tower is very good.</span><span class="s5-skel" aria-hidden="true"></span></p>
            <p class="s5-forget"><span class="s5-text">He cannot remember what the letters spell.</span><span class="s5-skel" aria-hidden="true"></span></p>
          </div>
          <div class="s5-tile s5-tile--year"><span data-s5-year>1920</span></div>
        </div>
      </div>
    </div>

    <div class="s5-site">
      <section class="s5-glass s5-notes" aria-labelledby="s5-notes-h">
        <h2 class="s5-h" id="s5-notes-h">Notes</h2>
        <ol class="s5-notes__list">
          ${s.diary
            .map(
              (d, i) => `
            <li class="s5-note" style="--fade:${1 - i * 0.22}">
              <span class="s5-note__day">${d.date || '&nbsp;'}</span>
              ${d.body ? `<p class="s5-note__body" data-scrub-words>${d.body}</p>` : `<p class="s5-note__body s5-note__body--empty"><span class="sr-only">An empty note.</span><i class="s5-caret" aria-hidden="true"></i></p>`}
            </li>`,
            )
            .join('')}
        </ol>
      </section>

      <section class="s5-glass s5-memo" data-player aria-labelledby="s5-memo-h">
        <audio preload="metadata" src="${s.audio.src}"></audio>
        <h2 class="s5-h" id="s5-memo-h">${s.audio.file}</h2>
        <div class="s5-memo__row">
          <button type="button" class="s5-memo__play" data-play aria-label="Play or pause Benjamin's recording">
            <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z"/></svg>
            <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>
          </button>
          <canvas class="s5-memo__viz" data-viz="mirror" aria-hidden="true"></canvas>
          <span class="s5-memo__time"><span data-time>0:00</span></span>
        </div>
        <div class="s5-memo__track" data-seek aria-hidden="true"><i></i></div>
        <details class="s5-transcript"><summary>Transcript</summary><p>${s.audio.transcript}</p></details>
      </section>

      <section class="s5-glass s5-chips" aria-labelledby="s5-chips-h">
        <h2 class="s5-h" id="s5-chips-h">What he still has</h2>
        <div class="s5-chips__row">
          ${s.memories
            .map((id, i) => {
              const title = MEMORY_TEXT[id].title;
              return `<button type="button" class="s5-chip" data-memory="${id}" style="--fade:${1 - i * 0.2}" ${title ? '' : 'aria-label="A memory he can’t name"'}>
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${CHIP_ICON[id]}</svg>${title ? `<span>${title}</span>` : '<span class="s5-chip__blank" aria-hidden="true"></span>'}
              </button>`;
            })
            .join('')}
        </div>
      </section>
    </div>

    <div class="scene s5-sceneB">
      <div class="scene__sticky s5-stickyB">
        <div class="s5-dusk" aria-hidden="true"></div>
        <div class="s5-lamp" aria-hidden="true"></div>
        <div class="s5-infant"></div>
        <div class="s5-last" aria-live="off">
          ${LAST.map((l, i) => `<p class="s5-last__line" data-line="${i}">${l}</p>`).join('')}
        </div>
      </div>
    </div>

    <div class="s5-end">
      <div class="s5-end__inner">
        <p class="s5-end__facts">Born in 1860, looking seventy.<br />Gone around 1930, a few days old.</p>
        <p class="s5-end__swap" aria-label="The beginning was the end.">
          <span class="s5-end__was">The Beginning</span>
          <span class="s5-end__is">The End</span>
        </p>
        <a class="s5-end__again" href="#stage-1">Start again at the end</a>
      </div>
    </div>
  </section>`;
}

export function init({ ScrollTrigger }) {
  const root = $('#stage-5');
  const stickyA = $('.s5-stickyA', root);
  const stickyB = $('.s5-stickyB', root);
  const child = createFigure($('.s5-actor', root), { paint: [[0, '#8f86d9'], [0.6, '#5c5596'], [1, '#3a3563']], label: 'Benjamin as a small child' });
  const infant = createFigure($('.s5-infant', root), { paint: [[0, '#ffe6d6'], [1, '#f2b49c']], label: 'Benjamin as a newborn' });
  const blocks = $$('.s5-block', root);
  const forget = $$('.s5-forget', root);
  const lines = $$('.s5-last__line', root);
  const yearEl = $('[data-s5-year]', root);
  const docStyle = document.documentElement.style;
  let lastYear = 0;

  ScrollTrigger.create({
    trigger: $('.s5-sceneA', root),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress: p }) => {
      blocks.forEach((b, i) => {
        const inn = range(p, i * 0.022, i * 0.022 + 0.07);
        const out = i === 0 ? 0 : range(p, 0.42 + (7 - i) * 0.055, 0.47 + (7 - i) * 0.055);
        b.style.setProperty('--in', inn.toFixed(3));
        b.style.setProperty('--out', out.toFixed(3));
      });
      forget.forEach((el, i) => el.style.setProperty('--gone', range(p, 0.4 + i * 0.1, 0.5 + i * 0.1).toFixed(3)));
      stickyA.style.setProperty('--wght', lerp(760, 220, range(p, 0.25, 1)).toFixed(0));
      stickyA.style.setProperty('--milk', range(p, 0.1, 0.5).toFixed(3));
      stickyA.style.setProperty('--hush', range(p, 0.8, 1).toFixed(3));
      child.set(4 + p * 0.5);
      const year = Math.round(lerp(1920, 1925, p));
      if (year !== lastYear) {
        yearEl.textContent = year;
        lastYear = year;
      }
    },
  });

  ScrollTrigger.create({
    trigger: $('.s5-sceneB', root),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress: p }) => {
      stickyB.style.setProperty('--dusk', range(p, 0, 0.4).toFixed(3));
      stickyB.style.setProperty('--lamp', (range(p, 0.08, 0.28) * (1 - range(p, 0.78, 0.94))).toFixed(3));
      stickyB.style.setProperty('--baby', range(p, 0.1, 0.3).toFixed(3));
      stickyB.style.setProperty('--dark', range(p, 0.86, 0.98).toFixed(3));
      infant.set(4.5 + range(p, 0, 0.5) * 0.5);
      lines.forEach((l, i) => {
        const a = 0.3 + i * 0.13;
        const vis = range(p, a, a + 0.04) * (i === lines.length - 1 ? 1 : 1 - range(p, a + 0.11, a + 0.13));
        l.style.opacity = vis.toFixed(3);
      });
      docStyle.setProperty('--chrome-fade', (1 - range(p, 0, 0.2)).toFixed(3));
      docStyle.setProperty('--rail-fade', (1 - range(p, 0.55, 0.75)).toFixed(3));
    },
    onLeaveBack: () => {
      docStyle.setProperty('--chrome-fade', 1);
      docStyle.setProperty('--rail-fade', 1);
    },
  });

  $$('[data-scrub-words]', root).forEach((el) => scrubWords(el, ScrollTrigger));
}
