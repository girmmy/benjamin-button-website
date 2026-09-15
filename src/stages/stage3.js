import { MEMORY_TEXT } from '../content/stages.js';
import { createFigure } from '../components/figure.js';
import { $, $$, range, lerp } from '../lib/util.js';
import { scrubWords } from '../lib/scroll.js';

// 2007. Glossy, reflective, beta. Benjamin and Hildegarde stand on a shiny floor and drift
// apart as you scroll, one getting younger and bluer, the other older and grayer.
// A map pin drops on San Juan Hill; a chart shows their energy crossing.

const BEN_GLOSS = [
  [0, '#9ad4ff'],
  [0.45, '#2b8ae0'],
  [1, '#0b4a8f'],
];
const HIL_GLOSS = [
  [0, '#ffc9e0'],
  [0.45, '#e0569b'],
  [1, '#8e1f59'],
];

const YEARS = [1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910];
const benLine = YEARS.map((_, i) => [40 + i * 30, 170 - i * 9 - Math.sin(i * 1.3) * 6]);
const hilLine = YEARS.map((_, i) => [40 + i * 30, 70 + i * 8.4 + Math.cos(i * 1.1) * 5]);
const path = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
const area = (pts) => `${path(pts)}L${pts.at(-1)[0]} 200L${pts[0][0]} 200Z`;

const mapSvg = `
<svg class="s3-map__svg" viewBox="0 0 320 200" aria-hidden="true">
  <defs>
    <linearGradient id="s3-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3d1f2"/><stop offset="1" stop-color="#99c0ea"/></linearGradient>
    <radialGradient id="s3-pin" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9a8a"/><stop offset=".5" stop-color="#e0281b"/><stop offset="1" stop-color="#8f140b"/></radialGradient>
  </defs>
  <rect width="320" height="200" fill="url(#s3-sea)"/>
  <path d="M0 50H320M0 100H320M0 150H320M80 0V200M160 0V200M240 0V200" stroke="#fff" stroke-opacity=".25"/>
  <path d="M-10 92 C30 70 70 76 104 88 C140 100 170 96 204 110 C236 122 262 118 290 132 C306 140 316 150 330 152 L330 176 C300 170 270 162 238 158 C204 154 170 142 138 136 C100 128 62 122 30 124 C10 126 -4 116 -10 112Z" fill="#f2efe6" stroke="#d2cbb6" stroke-width="1.5"/>
  <path d="M40 106 C90 108 130 116 170 124 C210 132 250 138 300 148" fill="none" stroke="#f7d774" stroke-width="3"/>
  <path d="M110 92 C120 110 126 124 128 134M220 116 C214 128 214 140 218 154" fill="none" stroke="#fff" stroke-width="2"/>
  <text x="54" y="148" font-family="Arial, sans-serif" font-size="9" fill="#7a735f">Cuba</text>
  <text x="250" y="176" font-family="Arial, sans-serif" font-size="8" fill="#7a735f">Santiago</text>
  <circle cx="246" cy="164" r="2.5" fill="#7a735f"/>
  <g class="s3-map__controls">
    <rect x="10" y="10" width="22" height="46" rx="4" fill="#fff" stroke="#9fb3c8"/>
    <path d="M16 22h10M21 17v10M16 43h10" stroke="#556" stroke-width="2"/>
    <path d="M10 33h22" stroke="#9fb3c8"/>
  </g>
  <g class="s3-map__pin">
    <ellipse class="s3-map__shadow" cx="236" cy="152" rx="7" ry="2.5" fill="#000" opacity=".3"/>
    <g class="s3-map__drop">
      <path d="M236 152 C230 140 224 134 224 126 a12 12 0 0 1 24 0 C248 134 242 140 236 152Z" fill="url(#s3-pin)"/>
      <circle cx="236" cy="126" r="4" fill="#fff" opacity=".9"/>
    </g>
  </g>
</svg>`;

const chartSvg = `
<svg class="s3-chart__svg" viewBox="0 0 440 220" aria-hidden="true">
  <defs>
    <linearGradient id="s3-ben-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b8ae0" stop-opacity=".35"/><stop offset="1" stop-color="#2b8ae0" stop-opacity="0"/></linearGradient>
    <linearGradient id="s3-hil-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0569b" stop-opacity=".3"/><stop offset="1" stop-color="#e0569b" stop-opacity="0"/></linearGradient>
    <clipPath id="s3-reveal"><rect class="s3-chart__clip" x="0" y="0" width="440" height="220"/></clipPath>
  </defs>
  ${[50, 90, 130, 170].map((y) => `<path d="M40 ${y}H430" stroke="#e3eaf2"/>`).join('')}
  <path d="M40 200H430" stroke="#b8c6d6"/>
  ${YEARS.filter((_, i) => i % 3 === 0).map((y, j) => `<text x="${40 + j * 90}" y="214" font-size="10" fill="#8898ab" font-family="'Lucida Grande', Arial, sans-serif">${y}</text>`).join('')}
  <g clip-path="url(#s3-reveal)">
    <path d="${area(hilLine)}" fill="url(#s3-hil-area)"/>
    <path d="${area(benLine)}" fill="url(#s3-ben-area)"/>
    <path d="${path(hilLine)}" fill="none" stroke="#e0569b" stroke-width="3" stroke-linejoin="round"/>
    <path d="${path(benLine)}" fill="none" stroke="#2b8ae0" stroke-width="3" stroke-linejoin="round"/>
    ${benLine.map(([x, y]) => `<circle cx="${x}" cy="${y.toFixed(1)}" r="3.5" fill="#fff" stroke="#2b8ae0" stroke-width="2"/>`).join('')}
    ${hilLine.map(([x, y]) => `<circle cx="${x}" cy="${y.toFixed(1)}" r="3.5" fill="#fff" stroke="#e0569b" stroke-width="2"/>`).join('')}
  </g>
  <g class="s3-chart__cross">
    <circle cx="160" cy="118" r="11" fill="#ffb300" opacity=".25"/>
    <circle cx="160" cy="118" r="5" fill="#ffb300" stroke="#fff" stroke-width="2"/>
  </g>
</svg>`;

export function markup(s) {
  return `
  <section class="stage s3" id="stage-3" aria-labelledby="s3-title">
    <div class="scene s3-scene">
      <div class="scene__sticky s3-sticky">
        <div class="s3-disco" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="s3-hero">
          <h1 class="s3-title" id="s3-title">${s.title}</h1>
          <p class="s3-sub"><span data-s3-year>1897</span></p>
        </div>
        <div class="s3-floor">
          <div class="s3-actor s3-actor--hil"></div>
          <div class="s3-actor s3-actor--ben"></div>
          <div class="s3-apart" aria-hidden="true"><span></span></div>
        </div>

        <figure class="s3-card s3-map">
          <div class="s3-card__bar"><span class="s3-card__title">San Juan Hill, Cuba</span><span class="s3-card__pill">Map</span></div>
          <div class="s3-map__body">
            ${mapSvg}
            <div class="s3-bubble">
              <b>July 1, 1898</b>
              <span>Lt. Col. Button leads the charge. Slightly wounded. Awarded a medal.</span>
            </div>
          </div>
          <figcaption class="sr-only">A map of Cuba with a pin on San Juan Hill, where Benjamin fought in 1898.</figcaption>
        </figure>

        <figure class="s3-card s3-chart">
          <div class="s3-card__bar">
            <span class="s3-card__title">Who wants to go out tonight?</span>
            <span class="s3-legend"><i class="s3-legend__ben"></i>Benjamin <i class="s3-legend__hil"></i>Hildegarde</span>
          </div>
          ${chartSvg}
          <figcaption class="sr-only">A chart from 1897 to 1910: Benjamin's energy rises every year while Hildegarde's falls. The lines cross around 1901.</figcaption>
        </figure>
      </div>
    </div>

    <div class="s3-site">
      <div class="s3-shell">
        <header class="s3-bloghead">
          <div class="s3-logo" aria-label="benjamin, beta">benjamin<span class="s3-beta" aria-hidden="true">beta</span></div>
          <nav class="s3-tabs" aria-label="Blog sections (decorative)">
            <span class="is-on">Diary</span><span>Photos</span><span>Friends <b>2</b></span><span>About</span>
          </nav>
        </header>
        <div class="s3-cols">
          <div class="s3-posts">
            ${s.diary
              .map((d) => {
                const [month, year] = d.date.split(/[ ,]+/);
                return `
              <article class="s3-post">
                <div class="s3-cal" aria-hidden="true"><b>${month.slice(0, 3)}</b><i>${year}</i></div>
                <div class="s3-post__main">
                  <h2 class="s3-post__title">${d.title}</h2>
                  <p class="s3-post__by">Posted by Benjamin on ${d.date}</p>
                  <p class="s3-post__body" data-scrub-words>${d.body}</p>
                  <ul class="s3-tags" aria-label="Tags">${d.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
                  <section class="s3-comments" aria-label="Comments">
                    <h3>${d.comments.length} comment${d.comments.length > 1 ? 's' : ''}</h3>
                    ${d.comments
                      .map(
                        (c) => `
                      <div class="s3-comment s3-comment--${c.name.toLowerCase()}">
                        <span class="s3-avatar" aria-hidden="true">${c.name[0]}</span>
                        <div><b>${c.name}</b> said&hellip;<p>${c.text}</p></div>
                      </div>`,
                      )
                      .join('')}
                  </section>
                </div>
              </article>`;
              })
              .join('')}
          </div>

          <aside class="s3-side">
            <section class="s3-box">
              <h3 class="s3-box__h">Memories</h3>
              <div class="s3-pills">
                ${s.memories.map((id) => `<button type="button" class="s3-pill" data-memory="${id}">${MEMORY_TEXT[id].title}</button>`).join('')}
              </div>
            </section>

            <section class="s3-box">
              <h3 class="s3-box__h">Listen</h3>
              <div class="s3-pod" data-player>
                <audio preload="metadata" src="${s.audio.src}"></audio>
                <div class="s3-pod__screen">
                  <div class="s3-pod__bar"><span>Now Playing</span><span class="s3-pod__batt" aria-hidden="true"></span></div>
                  <div class="s3-pod__track">
                    <div class="s3-pod__art" aria-hidden="true"></div>
                    <div class="s3-pod__meta"><b>${s.audio.file}</b><span>Benjamin Button</span><span>3 of 5</span></div>
                  </div>
                  <div class="s3-pod__progress" data-seek><i></i></div>
                  <div class="s3-pod__times"><span data-time>0:00</span><span data-duration>0:00</span></div>
                </div>
                <div class="s3-pod__wheel">
                  <span class="s3-pod__label s3-pod__label--top" aria-hidden="true">MENU</span>
                  <span class="s3-pod__label s3-pod__label--left" aria-hidden="true">&#9198;</span>
                  <span class="s3-pod__label s3-pod__label--right" aria-hidden="true">&#9197;</span>
                  <span class="s3-pod__label s3-pod__label--bottom" aria-hidden="true">&#9654;&#10074;&#10074;</span>
                  <button type="button" class="s3-pod__center" data-play aria-label="Play or pause Benjamin's recording"></button>
                </div>
                <details class="s3-transcript"><summary>Transcript</summary><p>${s.audio.transcript}</p></details>
              </div>
            </section>

            <section class="s3-box">
              <h3 class="s3-box__h">Tags</h3>
              <p class="s3-cloud">
                <span style="--s:1.9">dancing</span> <span style="--s:1.1">hardware</span> <span style="--s:1.5">san juan hill</span>
                <span style="--s:0.9">cotillion</span> <span style="--s:1.3">hildegarde</span> <span style="--s:0.8">medals</span>
                <span style="--s:1.7">getting younger</span> <span style="--s:1">roscoe</span> <span style="--s:0.85">gray hair</span>
              </p>
            </section>

            <div class="s3-badges" aria-hidden="true">
              <span class="s3-badge"><b>RSS</b>feed</span>
              <span class="s3-badge s3-badge--g"><b>XHTML</b>valid</span>
              <span class="s3-badge s3-badge--o"><b>2.0</b>web</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>`;
}

export function init({ ScrollTrigger }) {
  const root = $('#stage-3');
  const sticky = $('.s3-sticky', root);
  const ben = createFigure($('.s3-actor--ben', root), { paint: BEN_GLOSS, beard: '#d7ecff', label: 'Benjamin, glossy blue, getting younger' });
  const hil = createFigure($('.s3-actor--hil', root), { cast: 'hildegarde', paint: HIL_GLOSS, label: 'Hildegarde, glossy pink, getting older' });
  createFigure($('.s3-pod__art', root), { paint: BEN_GLOSS }).set(2.5);
  const yearEl = $('[data-s3-year]', root);
  let lastYear = 0;

  ScrollTrigger.create({
    trigger: $('.s3-scene', root),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress: p }) => {
      const drift = range(p, 0.05, 0.95);
      sticky.style.setProperty('--drift', drift.toFixed(4));
      sticky.style.setProperty('--disco', range(p, 0.45, 0.9).toFixed(3));
      sticky.style.setProperty('--map-in', range(p, 0.18, 0.28).toFixed(3));
      sticky.style.setProperty('--map-out', range(p, 0.5, 0.58).toFixed(3));
      sticky.style.setProperty('--pin', range(p, 0.26, 0.36).toFixed(3));
      sticky.style.setProperty('--bubble', range(p, 0.36, 0.42).toFixed(3));
      sticky.style.setProperty('--chart-in', range(p, 0.58, 0.66).toFixed(3));
      sticky.style.setProperty('--chart-draw', range(p, 0.62, 0.9).toFixed(3));
      sticky.style.setProperty('--cross', range(p, 0.72, 0.76).toFixed(3));
      sticky.style.setProperty('--hero', (1 - range(p, 0.12, 0.2) * 0.75).toFixed(3));
      ben.set(2 + drift * 0.9);
      hil.set(1 + drift);
      hil.el.style.filter = `saturate(${(1 - drift * 0.85).toFixed(3)})`;
      const year = Math.round(lerp(1897, 1910, p));
      if (year !== lastYear) {
        yearEl.textContent = year;
        lastYear = year;
      }
    },
  });

  $$('[data-scrub-words]', root).forEach((el) => scrubWords(el, ScrollTrigger));
}
