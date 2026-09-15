import { splitWords } from './util.js';

/** Reveals an element's words in step with scroll position: all hidden at the bottom of the screen, all shown by the middle. */
export function scrubWords(el, ScrollTrigger, { start = 'top 88%', end = 'bottom 62%' } = {}) {
  const words = splitWords(el);
  el.classList.add('is-scrubbed');
  let shown = -1;
  ScrollTrigger.create({
    trigger: el,
    start,
    end,
    onUpdate: ({ progress }) => {
      const n = Math.round(progress * words.length);
      if (n === shown) return;
      shown = n;
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    },
    onRefresh: ({ progress }) => {
      const n = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    },
  });
}
