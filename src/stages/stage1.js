import { MEMORY_TEXT } from '../content/stages.js';
import { createFigure } from '../components/figure.js';
import { $, $$, range, splitWords } from '../lib/util.js';
import { scrubWords } from '../lib/scroll.js';

// 1995. A gray Netscape homepage titled "The End". The portrait downloads line by line as you
// scroll, and the caption slowly admits that this old man was photographed the day he was born.

const px = (d, fill = '#000') => `<svg viewBox="0 0 16 16" width="16" height="16" shape-rendering="crispEdges" aria-hidden="true"><path d="${d}" fill="${fill}"/></svg>`;

const ICONS = {
  rattle: px('M6 1h4v1h1v1h1v4h-1v1h-1v1H9v5h1v2H6v-2h1V9H6V8H5V7H4V3h1V2h1z'),
  cigar: px('M1 7h12v3H1zM13 7h2v3h-2zM3 2h1v1H3zM4 3h1v2H4zM3 5h1v1H3z'),
  encyclopaedia: px('M2 2h3v12H2zM6 2h3v12H6zM10 3h1v-1h2v1h1v11h-4z'),
  yale: px('M1 3h14v10H1zM2 4v1l6 4 6-4V4l-6 4z'),
};

export function markup(s) {
  return `
  <section class="stage s1" id="stage-1" aria-labelledby="s1-title">
    <div class="scene s1-scene">
      <div class="scene__sticky s1-sticky">
        <div class="s1-hero">
          <h1 class="s1-title" id="s1-title">${s.title}</h1>
          <p class="s1-byline"><i>The Curious Case of Benjamin Button</i>, after F. Scott Fitzgerald (1922)</p>
          <hr class="s1-hr" />
          <table class="s1-photo" cellspacing="0">
            <tr>
              <td class="s1-photo__cell">
                <div class="s1-frame">
                  <svg class="s1-backdrop" viewBox="0 0 240 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true" shape-rendering="crispEdges">
                    <defs>
                      <pattern id="s1d12" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#fff"/><rect width="1" height="1"/></pattern>
                      <pattern id="s1d25" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#fff"/><rect width="1" height="1"/><rect x="2" y="2" width="1" height="1"/></pattern>
                      <pattern id="s1d50" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#fff"/><rect width="1" height="1"/><rect x="1" y="1" width="1" height="1"/></pattern>
                    </defs>
                    <rect width="240" height="320" fill="url(#s1d12)"/>
                    <rect y="0" width="240" height="60" fill="url(#s1d25)"/>
                    <rect y="296" width="240" height="24" fill="url(#s1d50)"/>
                    <path d="M0 296H240" stroke="#000" stroke-width="2"/>
                    <g class="s1-crib" fill="none" stroke="#000" stroke-width="2">
                      <path d="M14 232V298M84 232V298M14 246H84M14 284H84"/>
                      <path d="M24 246V284M34 246V284M44 246V284M54 246V284M64 246V284M74 246V284" stroke-width="1"/>
                      <rect x="16" y="226" width="12" height="6" fill="url(#s1d50)"/>
                    </g>
                    <g class="s1-window">
                      <rect x="176" y="22" width="48" height="64" fill="#fff" stroke="#000" stroke-width="2"/>
                      <path d="M200 22V86M176 54H224" stroke="#000" stroke-width="2"/>
                      <rect x="178" y="56" width="21" height="28" fill="url(#s1d25)"/>
                    </g>
                  </svg>
                  <div class="s1-img s1-img--coarse"></div>
                  <div class="s1-img s1-img--fine"></div>
                  <div class="s1-scan" aria-hidden="true"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="s1-caption">
                <b>Benjamin Button</b>, age 70.
                <span class="s1-truth">Photographed at the Maryland Private Hospital for Ladies and Gentlemen, Baltimore, September 1860, <u>the day he was born</u>.</span>
              </td>
            </tr>
          </table>
          <p class="s1-status" aria-hidden="true"><span data-s1-status>Contacting host: www.buttonhardware.com</span><span class="s1-bar"><i></i></span></p>
        </div>
        <div class="s1-marquee" aria-hidden="true">
          <span>Born at the Maryland Private Hospital, 1860 &nbsp;&nbsp;&#9733;&nbsp;&nbsp; Father: Mr. Roger Button, wholesale hardware &nbsp;&nbsp;&#9733;&nbsp;&nbsp; Weight at birth: that of a grown man &nbsp;&nbsp;&#9733;&nbsp;&nbsp; First words: "Are you my father?" &nbsp;&nbsp;&#9733;&nbsp;&nbsp; This page is best read slowly</span>
        </div>
      </div>
    </div>

    <div class="s1-site">
      <table class="s1-layout" cellspacing="0" cellpadding="0">
        <tr>
          <td class="s1-nav">
            <h2 class="s1-h2">Memories</h2>
            <p class="s1-small">Click a button to open a picture.</p>
            <div class="s1-buttons">
              ${s.memories
                .map(
                  (id) => `<button type="button" class="s1-btn" data-memory="${id}">${ICONS[id]}<span>${MEMORY_TEXT[id].title}</span></button>`,
                )
                .join('')}
            </div>
            <hr />
            <table class="s1-ring" cellspacing="0">
              <tr><td colspan="2" class="s1-ring__name">The Fitzgerald Web Ring</td></tr>
              <tr><td><a href="#stage-1">&lt;&lt; Prev</a></td><td align="right"><a href="#stage-2">Next &gt;&gt;</a></td></tr>
            </table>
            <p class="s1-small s1-new"><img alt="" width="28" height="11" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 11'%3E%3Crect width='28' height='11' fill='%23c00'/%3E%3Ctext x='14' y='9' font-family='Arial' font-size='9' font-weight='700' fill='%23ff0' text-anchor='middle'%3ENEW%3C/text%3E%3C/svg%3E" /> Yale letter added</p>
          </td>
          <td class="s1-main">
            <h2 class="s1-h2">From my diary</h2>
            ${s.diary
              .map(
                (d) => `
              <h3 class="s1-date">${d.date}</h3>
              <pre class="s1-pre" data-scrub-words>${d.body}</pre>`,
              )
              .join('')}
            <hr />
            <h2 class="s1-h2">Hear Benjamin</h2>
            <div class="s1-player" data-player>
              <audio preload="metadata" src="${s.audio.src}"></audio>
              <div class="s1-player__menu" aria-hidden="true"><span><u>F</u>ile</span><span><u>V</u>iew</span><span><u>C</u>lip</span><span><u>H</u>elp</span></div>
              <div class="s1-player__body">
                <div class="s1-player__screen">
                  <canvas class="s1-player__viz" data-viz="blocks" aria-hidden="true"></canvas>
                  <div class="s1-player__info">
                    <b>${s.audio.file}</b>
                    <span>Benjamin, on being born old</span>
                    <span class="s1-player__state"></span>
                  </div>
                </div>
                <div class="s1-player__controls">
                  <button type="button" class="s1-bev s1-player__play" data-play aria-label="Play or pause Benjamin's recording">
                    <svg class="i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l10 6-10 6z"/></svg>
                    <svg class="i-pause" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h4v12H3zM9 2h4v12H9z"/></svg>
                  </button>
                  <button type="button" class="s1-bev" data-stop aria-label="Stop"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3h10v10H3z"/></svg></button>
                  <div class="s1-player__seek" data-seek><span class="s1-player__thumb"></span></div>
                  <span class="s1-player__time"><span data-time>0:00</span>/<span data-duration>0:00</span></span>
                </div>
              </div>
              <details class="s1-transcript">
                <summary>Read the transcript</summary>
                <p>${s.audio.transcript}</p>
              </details>
            </div>
            <hr />
            <address class="s1-address">
              Last modified: September 1880<br />
              Best viewed with a browser at 640 &times; 480. You are reading this page backward.
            </address>
          </td>
        </tr>
      </table>
    </div>
  </section>`;
}

export function init({ gsap, ScrollTrigger }) {
  const root = $('#stage-1');
  const sticky = $('.s1-sticky', root);
  const coarse = createFigure($('.s1-img--coarse', root), { mode: 'canvas', paint: '#000', pixel: 12 });
  const fine = createFigure($('.s1-img--fine', root), {
    paint: '#000',
    beard: '#fff',
    label: 'A dithered photograph of Benjamin Button as a stooped old man with a long beard and a cane, standing beside a crib',
  });
  coarse.set(0);
  fine.set(0);

  const status = $('[data-s1-status]', root);
  const truth = splitWords($('.s1-truth', root));
  const marquee = $('.s1-marquee span', root);

  let lastStatus = '';
  ScrollTrigger.create({
    trigger: $('.s1-scene', root),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress: p }) => {
      const coarseLoad = range(p, 0, 0.14);
      const fineLoad = range(p, 0.03, 0.34);
      sticky.style.setProperty('--coarse', coarseLoad);
      sticky.style.setProperty('--fine', fineLoad);
      document.documentElement.style.setProperty('--load', fineLoad < 1 ? fineLoad : 0);

      const kb = Math.round(fineLoad * 58);
      const text =
        p < 0.015
          ? 'Contacting host: www.buttonhardware.com'
          : fineLoad < 1
            ? `Transferring data: ${kb}K of 58K (portrait.gif)`
            : 'Document: Done.';
      if (text !== lastStatus) {
        status.textContent = text;
        lastStatus = text;
      }

      const shown = Math.round(range(p, 0.38, 0.62) * truth.length);
      truth.forEach((w, i) => w.classList.toggle('on', i < shown));

      const pose = range(p, 0.62, 1) * 0.35;
      fine.set(pose);
      coarse.set(pose);

      marquee.style.transform = `translateX(${(-p * 62).toFixed(2)}%)`;
    },
  });

  $$('[data-scrub-words]', root).forEach((el) => scrubWords(el, ScrollTrigger));
}
