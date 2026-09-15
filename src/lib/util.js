export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const clamp = (v, min = 0, max = 1) => Math.min(Math.max(v, min), max);
export const lerp = (a, b, t) => a + (b - a) * t;

/** Maps t from [a, b] onto [0, 1], clamped. Used to carve one scrubbed progress value into beats. */
export const range = (t, a, b) => clamp((t - a) / (b - a));

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Deterministic pseudo-random numbers so waveforms and confetti look the same on every load. */
export function seeded(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Wraps each word of an element in a span so scroll position can reveal it.
 * Returns the word spans. Keeps inline markup like <em> intact.
 */
export function splitWords(el) {
  const words = [];
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.className = 'w';
            span.textContent = part;
            words.push(span);
            frag.appendChild(span);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  return words;
}

export const pad = (n, len) => String(Math.max(0, Math.round(n))).padStart(len, '0');

export const formatTime = (sec) => {
  if (!Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};
