import { $, $$, range, seeded, reducedMotion } from '../lib/util.js';

// The four moments where one era of the web turns into the next. Each is a sticky screen
// scrubbed by scroll, and each wipes the next era's browser bar in over the last one.

const doc = document.documentElement.style;

const replica1995 = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" preserveAspectRatio="xMidYMid slice">
  <rect width="1280" height="800" fill="#c0c0c0"/>
  <text x="640" y="170" text-anchor="middle" font-family="Times New Roman, Times, serif" font-weight="700" font-size="104">The End</text>
  <text x="640" y="214" text-anchor="middle" font-family="Times New Roman, Times, serif" font-style="italic" font-size="18">The Curious Case of Benjamin Button</text>
  <rect x="330" y="236" width="620" height="3" fill="#808080"/><rect x="330" y="239" width="620" height="1" fill="#fff"/>
  <rect x="490" y="262" width="300" height="400" fill="#fff" stroke="#404040" stroke-width="3"/>
  <rect x="500" y="272" width="280" height="380" fill="#e6e6e6"/>
  <path d="M640 330 a26 26 0 1 1 0 .1z M600 380 h70 l20 170 h-40 l-10 -90 -10 90 h-40z" fill="#000"/>
  <rect x="0" y="770" width="1280" height="30" fill="#000080"/>
</svg>`);

const TR = [
  {
    markup: () => {
      const rand = seeded(3);
      const cols = 12;
      const rows = 8;
      return `
      <section class="transition tr tr1" id="tr-1" aria-hidden="true">
        <div class="transition__sticky tr1-sticky">
          <div class="tr1-tiles" style="--cols:${cols};--rows:${rows}">
            ${Array.from({ length: cols * rows }, (_, i) => {
              const x = i % cols;
              const y = Math.floor(i / cols);
              return `<i style="--x:${x};--y:${y};--o:${rand().toFixed(3)};background-image:url(&quot;data:image/svg+xml,${replica1995}&quot;)"></i>`;
            }).join('')}
          </div>
          <div class="tr1-loader">
            <div class="tr1-ring">${Array.from({ length: 12 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
            <p class="tr1-pct">loading <b data-tr1-pct>0</b>%</p>
            <div class="tr1-bar"><i></i></div>
            <p class="tr1-file">button_family.swf</p>
          </div>
        </div>
      </section>`;
    },
    init: ({ ScrollTrigger }) => {
      const root = $('#tr-1');
      const sticky = $('.tr1-sticky', root);
      const tiles = $$('.tr1-tiles i', root).map((el) => ({ el, o: parseFloat(el.style.getPropertyValue('--o')) }));
      const pct = $('[data-tr1-pct]', root);
      let lastPct = -1;
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress: p }) => {
          const flip = range(p, 0.02, 0.36);
          tiles.forEach(({ el, o }) => {
            const t = range(flip, o * 0.75, o * 0.75 + 0.25);
            el.style.setProperty('--f', t.toFixed(3));
          });
          const load = range(p, 0.38, 0.82);
          sticky.style.setProperty('--loader', (range(p, 0.3, 0.4) * (1 - range(p, 0.86, 0.96))).toFixed(3));
          sticky.style.setProperty('--load', load.toFixed(3));
          sticky.style.setProperty('--spin', Math.floor(load * 36) % 12);
          const n = Math.round(load * 100);
          if (n !== lastPct) {
            pct.textContent = n;
            lastPct = n;
          }
          doc.setProperty('--chrome-1', range(p, 0.28, 0.62).toFixed(4));
          doc.setProperty('--load', load < 1 ? load : 0);
        },
      });
    },
  },

  {
    markup: () => `
      <section class="transition tr tr2" id="tr-2" aria-hidden="true">
        <div class="transition__sticky tr2-sticky">
          <div class="tr2-new-bg"></div>
          <div class="tr2-spec">
            <div class="tr2-panel">
              <div class="tr2-panel__bar">
                <span class="tr2-old">family player</span><span class="tr2-new">benjamin</span>
              </div>
              <div class="tr2-panel__body">
                <p class="tr2-word"><span class="tr2-old">our family</span><span class="tr2-new">The Height of Life</span></p>
                <span class="tr2-btn"><span class="tr2-old">enter &raquo;</span><span class="tr2-new">Sign up. It’s free!</span></span>
              </div>
            </div>
            <span class="tr2-badge">beta</span>
          </div>
        </div>
      </section>`,
    init: ({ ScrollTrigger }) => {
      const root = $('#tr-2');
      const sticky = $('.tr2-sticky', root);
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress: p }) => {
          sticky.style.setProperty('--in', range(p, 0, 0.12).toFixed(3));
          sticky.style.setProperty('--g', range(p, 0.14, 0.6).toFixed(4));
          sticky.style.setProperty('--bg', range(p, 0.3, 0.7).toFixed(4));
          sticky.style.setProperty('--badge', range(p, 0.6, 0.78).toFixed(3));
          sticky.style.setProperty('--out', range(p, 0.84, 1).toFixed(3));
          doc.setProperty('--chrome-2', range(p, 0.3, 0.64).toFixed(4));
          doc.setProperty('--load', range(p, 0.3, 0.64) % 1);
        },
      });
    },
  },

  {
    markup: () => `
      <section class="transition tr tr3" id="tr-3" aria-hidden="true">
        <div class="transition__sticky tr3-sticky">
          <div class="tr3-appbar"></div>
          <div class="tr3-spec">
            <div class="tr3-orb">
              <span class="tr3-orb__shadow"></span>
              <svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-35 12 12)" fill="#fff"/><path d="M9 12h6M11 10.5v3M13 10.5v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" transform="rotate(-35 12 12)"/></svg>
              <span class="tr3-gloss"></span>
            </div>
            <span class="tr3-pill">
              <span class="tr3-pill__label">Play</span>
              <span class="tr3-gloss"></span>
              <span class="tr3-drips"><i></i><i></i><i></i></span>
            </span>
          </div>
        </div>
      </section>`,
    init: ({ ScrollTrigger }) => {
      const root = $('#tr-3');
      const sticky = $('.tr3-sticky', root);
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress: p }) => {
          sticky.style.setProperty('--in', range(p, 0, 0.12).toFixed(3));
          sticky.style.setProperty('--melt', range(p, 0.14, 0.5).toFixed(4));
          sticky.style.setProperty('--drip', (range(p, 0.2, 0.46) * (1 - range(p, 0.5, 0.6))).toFixed(4));
          sticky.style.setProperty('--flat', range(p, 0.4, 0.62).toFixed(4));
          sticky.style.setProperty('--ls', range(p, 0.56, 0.8).toFixed(4));
          sticky.style.setProperty('--bar', range(p, 0.7, 0.9).toFixed(4));
          sticky.style.setProperty('--out', range(p, 0.9, 1).toFixed(3));
          doc.setProperty('--chrome-3', range(p, 0.34, 0.66).toFixed(4));
          doc.setProperty('--load', range(p, 0.34, 0.66) % 1);
        },
      });
    },
  },

  {
    markup: () => `
      <section class="transition tr tr4" id="tr-4" aria-hidden="true">
        <div class="transition__sticky tr4-sticky">
          <div class="tr4-appbar"></div>
          <div class="tr4-blobs"><i></i><i></i><i></i></div>
          <div class="tr4-card">
            <div class="tr4-card__icon"><span></span></div>
            <p class="tr4-card__text"><span class="tr4-old">The beginning of youth</span><span class="tr4-new">The Beginning</span></p>
            <span class="tr4-card__line"></span>
            <span class="tr4-card__line tr4-card__line--short"></span>
          </div>
        </div>
      </section>`,
    init: ({ ScrollTrigger }) => {
      const root = $('#tr-4');
      const sticky = $('.tr4-sticky', root);
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress: p }) => {
          sticky.style.setProperty('--in', range(p, 0, 0.12).toFixed(3));
          sticky.style.setProperty('--d', range(p, 0.16, 0.7).toFixed(4));
          sticky.style.setProperty('--blobs', range(p, 0.24, 0.72).toFixed(4));
          sticky.style.setProperty('--type', range(p, 0.42, 0.62).toFixed(4));
          sticky.style.setProperty('--out', range(p, 0.86, 1).toFixed(3));
          doc.setProperty('--chrome-4', range(p, 0.36, 0.7).toFixed(4));
        },
      });
    },
  },
];

export const TRANSITIONS = TR;
export const prefersReduced = reducedMotion;
