import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles/base.css';
import './styles/chrome.css';
import './styles/rail.css';
import './styles/memory.css';
import './styles/era-1995.css';
import './styles/era-2001.css';
import './styles/era-2007.css';
import './styles/era-2015.css';
import './styles/era-2026.css';
import './styles/transitions.css';

import { STAGES } from './content/stages.js';
import { createChrome } from './components/chrome.js';
import { createRail } from './components/rail.js';
import { initMemories } from './components/memory.js';
import { initPlayers } from './components/audio.js';
import { TRANSITIONS } from './transitions/transitions.js';
import { $, clamp, lerp } from './lib/util.js';

import * as stage1 from './stages/stage1.js';
import * as stage2 from './stages/stage2.js';
import * as stage3 from './stages/stage3.js';
import * as stage4 from './stages/stage4.js';
import * as stage5 from './stages/stage5.js';

gsap.registerPlugin(ScrollTrigger);

const STAGE_MODULES = [stage1, stage2, stage3, stage4, stage5];
const ERAS = STAGES.map((s) => s.era);

const story = $('#story');
story.innerHTML = STAGE_MODULES.map((m, i) => m.markup(STAGES[i]) + (TRANSITIONS[i]?.markup() ?? '')).join('');

createChrome($('#chrome'));
const rail = createRail($('#rail'));
initMemories($('#memory'));
initPlayers(story);

const ctx = { gsap, ScrollTrigger };
STAGE_MODULES.forEach((m) => m.init(ctx));
TRANSITIONS.forEach((t) => t.init(ctx));

// One scroll listener drives the dials and decides which era's styling the fixed UI wears.
// A stage's "block" runs from its own top to the next stage's top, so it includes the transition after it.
let blocks = [];
let eraSwitches = [];
const measure = () => {
  const stages = STAGES.map((s) => document.getElementById(`stage-${s.id}`));
  const max = document.documentElement.scrollHeight - innerHeight;
  blocks = stages.map((el, i) => [el.offsetTop, stages[i + 1] ? stages[i + 1].offsetTop : max]);
  eraSwitches = TRANSITIONS.map((_, i) => {
    const tr = document.getElementById(`tr-${i + 1}`);
    return tr.offsetTop + (tr.offsetHeight - innerHeight) * 0.5;
  });
};

let era = -1;
const update = () => {
  if (!blocks.length) return;
  const y = scrollY;
  let stage = blocks.findIndex(([, b]) => y < b);
  if (stage === -1) stage = blocks.length - 1;
  const [a, b] = blocks[stage];
  const t = clamp((y - a) / Math.max(1, b - a));
  const s = STAGES[stage];
  rail.update({ year: lerp(s.years[0], s.years[1], t), pose: stage + t, stage });

  const nextEra = eraSwitches.filter((m) => y >= m).length;
  if (nextEra !== era) {
    era = nextEra;
    document.body.dataset.era = ERAS[era];
  }
};

ScrollTrigger.addEventListener('refresh', () => {
  measure();
  update();
});
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update });
measure();
update();

document.fonts?.ready.then(() => ScrollTrigger.refresh());
