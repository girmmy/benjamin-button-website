import { MEMORY_TEXT, STAGES } from '../content/stages.js';
import { ARTIFACTS } from '../art/artifacts.js';

// Every memory button in every era opens the same <dialog>. Its frame restyles itself
// for the era it was opened from: a Windows 95 window, an XP pop-up, a 2007 lightbox,
// a Material dialog, and a soft 2026 sheet.

const eraOf = (id) => STAGES.find((s) => s.memories.includes(id))?.era ?? '1995';

const FOOT = {
  1995: 'OK',
  2001: 'Close window',
  2007: 'Close',
  2015: 'Done',
  2026: 'Close',
};

export function initMemories(dialog) {
  let opener = null;

  const close = () => {
    dialog.close();
  };

  const open = (id, trigger) => {
    const text = MEMORY_TEXT[id];
    const art = ARTIFACTS[id];
    if (!text || !art) return;
    const era = eraOf(id);
    const stage = STAGES.find((s) => s.era === era);
    const index = stage.memories.indexOf(id) + 1;
    const title = text.title || 'A memory he can’t name';
    opener = trigger;

    dialog.dataset.era = era;
    dialog.dataset.memory = id;
    dialog.innerHTML = `
      <div class="memory__frame">
        <div class="memory__bar">
          <span class="memory__icon" aria-hidden="true"></span>
          <h2 class="memory__title" id="memory-title">${title}</h2>
          <button class="memory__x" type="button" data-close aria-label="Close">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>
          </button>
        </div>
        <div class="memory__art">${art}</div>
        <div class="memory__foot">
          <p class="memory__caption">${text.caption || '&nbsp;'}</p>
          <span class="memory__count">${index} of ${stage.memories.length}</span>
          <button class="memory__ok" type="button" data-close>${FOOT[era]}</button>
        </div>
      </div>
    `;
    dialog.showModal();
    dialog.querySelector('.memory__ok').focus({ preventScroll: true });
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-memory]');
    if (trigger && !dialog.contains(trigger)) {
      e.preventDefault();
      open(trigger.dataset.memory, trigger);
      return;
    }
    if (e.target.closest('[data-close]')) close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.open) {
      e.preventDefault();
      close();
    }
  });

  // Clicking the dimmed backdrop closes it too.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });

  dialog.addEventListener('close', () => {
    opener?.focus({ preventScroll: true });
  });
}
