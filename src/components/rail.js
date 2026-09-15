import { STAGES } from '../content/stages.js';
import { createFigure } from './figure.js';
import { pad } from '../lib/util.js';

// The fixed dials: how old he looks, how old he is, and the year.
// Looks + Is always equals 70, which is the whole twist in two numbers.

const digits = (value) =>
  value
    .split('')
    .map((d) => `<span class="rail__digit">${d}</span>`)
    .join('');

export function createRail(el) {
  el.innerHTML = `
    <div class="rail__inner">
      <div class="rail__fig"></div>
      <dl class="rail__dials">
        <div class="rail__dial rail__dial--looks"><dt>Looks</dt><dd data-looks></dd></div>
        <div class="rail__dial rail__dial--is"><dt>Is</dt><dd data-is></dd></div>
        <div class="rail__dial rail__dial--year"><dt>Year</dt><dd data-year></dd></div>
      </dl>
      <nav class="rail__nav" aria-label="Stages of his life">
        <span class="rail__current" data-current>${STAGES[0].title}</span>
        <ol class="rail__ticks">
          ${STAGES.map(
            (s, i) => `<li><a href="#stage-${s.id}" data-tick="${i}" aria-label="Stage ${s.id}: ${s.title}"><span></span></a></li>`,
          ).join('')}
        </ol>
      </nav>
    </div>
  `;

  const looksEl = el.querySelector('[data-looks]');
  const isEl = el.querySelector('[data-is]');
  const yearEl = el.querySelector('[data-year]');
  const currentEl = el.querySelector('[data-current]');
  const ticks = [...el.querySelectorAll('[data-tick]')];
  const figure = createFigure(el.querySelector('.rail__fig'), { cast: 'benjamin' });

  let prev = {};

  return {
    update({ year, pose, stage }) {
      const y = Math.floor(year);
      const looks = Math.max(0, 70 - (y - 1860));
      const is = Math.min(70, y - 1860);
      if (y !== prev.year) {
        looksEl.innerHTML = digits(pad(looks, 2));
        isEl.innerHTML = digits(pad(is, 2));
        yearEl.innerHTML = digits(String(y));
        looksEl.setAttribute('aria-label', `${looks} years old`);
        isEl.setAttribute('aria-label', `${is} years old`);
      }
      if (stage !== prev.stage) {
        currentEl.textContent = STAGES[stage].title;
        ticks.forEach((t, i) => {
          if (i === stage) t.setAttribute('aria-current', 'step');
          else t.removeAttribute('aria-current');
        });
      }
      figure.set(Math.round(pose * 200) / 200);
      prev = { year: y, stage };
    },
  };
}
