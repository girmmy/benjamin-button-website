import { STAGES } from '../content/stages.js';

// One fake browser bar per era, stacked. Each later bar wipes in over the one before it
// as its transition scrubs, driven by the --chrome-N custom properties on :root.

const pix = (rects, size = 16) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;

const ICON_95 = {
  back: pix('<path d="M9 3h1v10H9zM8 4h1v8H8zM7 5h1v6H7zM6 6h1v4H6zM5 7h1v2H5z" fill="#000"/><path d="M10 7h2v2h-2z" fill="#000"/>'),
  forward: pix('<path d="M6 3h1v10H6zM7 4h1v8H7zM8 5h1v6H8zM9 6h1v4H9zM10 7h1v2h-1z" fill="#000"/><path d="M4 7h2v2H4z" fill="#000"/>'),
  home: pix('<path d="M8 2h1v1H8zM6 4h5v1H6zM4 6h9v1H4zM5 7h1v6H5zM11 7h1v6h-1zM5 13h7v1H5zM7 9h3v4H7z" fill="#000"/><path d="M7 3h3v1H7zM5 5h7v1H5z" fill="#800000"/>'),
  reload: pix('<path d="M5 4h6v1H5zM4 5h1v6H4zM11 5h1v2h-1zM5 11h6v1H5zM11 9h1v2h-1zM10 7h3v1h-3zM11 8h1v1h-1z" fill="#000"/>'),
  stop: pix('<path d="M5 3h6v1H5zM4 4h8v8H4zM5 12h6v1H5z" fill="#c00000"/><path d="M6 7h4v2H6z" fill="#fff"/>'),
};

const url = (i) => STAGES[i].url;

export function createChrome(el) {
  el.innerHTML = `
    <div class="chrome__v c95" data-v="0">
      <div class="c95__tools">
        ${['back', 'forward', 'home', 'reload', 'stop']
          .map((k) => `<span class="c95__btn c95__btn--${k}">${ICON_95[k]}</span>`)
          .join('')}
      </div>
      <div class="c95__loc"><span class="c95__label">Location:</span><span class="c95__field">${url(0)}</span></div>
      <span class="c95__throbber"><i class="c95__star"></i><i class="c95__meteor"></i></span>
    </div>

    <div class="chrome__v c01" data-v="1">
      <span class="c01__round c01__round--back"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M11 5 6 10l5 5M6 10h9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span class="c01__round c01__round--fwd"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m9 5 5 5-5 5M14 10H5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span class="c01__sep"></span>
      <div class="c01__loc"><span class="c01__label">Address</span><span class="c01__field"><i class="c01__page"></i>${url(1)}</span><span class="c01__go"><i></i>Go</span></div>
      <span class="c01__globe"><i></i></span>
    </div>

    <div class="chrome__v c07" data-v="2">
      <span class="c07__lights"><i></i><i></i><i></i></span>
      <span class="c07__seg"><i>&#9664;</i><i>&#9654;</i></span>
      <div class="c07__field"><span class="c07__progress"></span><span class="c07__url">${url(2)}</span><span class="c07__rss">RSS</span></div>
      <div class="c07__search">Search</div>
    </div>

    <div class="chrome__v c15" data-v="3">
      <span class="c15__nav"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l-1.4 1.4 5.6 5.6H4v2h12.2l-5.6 5.6L12 20l8-8z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.6 6.4A8 8 0 1 0 19.7 14h-2.1A6 6 0 1 1 12 6c1.7 0 3.1.7 4.2 1.8L13 11h7V4z"/></svg></span>
      <div class="c15__omni"><svg class="c15__lock" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9z"/></svg><span class="c15__https">https://</span><span class="c15__url">${url(3).replace('https://', '')}</span><svg class="c15__star" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21 12 17.3l6.2 3.7-1.6-7.1z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></div>
      <span class="c15__menu"><i></i><i></i><i></i></span>
    </div>

    <div class="chrome__v c26" data-v="4">
      <div class="c26__pill"><span class="c26__dot"></span>${url(4)}</div>
    </div>
  `;
}
