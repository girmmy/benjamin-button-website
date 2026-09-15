// A jointed silhouette drawn from hand-placed poses. Every stage asks for a
// pose number and gets a smooth in-between, so Benjamin can un-age continuously
// with scroll instead of swapping between fixed drawings.
//
// Coordinates live in a 240 × 320 box, ground line at y = 300, figure faces right.

const GROUND = 300;

const DEFAULTS = { beard: 0, hat: 0, cane: 0, ball: 0, coat: 0, skirt: 0, bun: 0, rattle: 0 };

// Benjamin: 0 = looks 70 (born, 1860) … 5 = a newborn (dies, c. 1930)
const BENJAMIN = [
  { // looks 70: stooped, beard to his chest, leaning on a cane
    head: [150, 98], r: 13, neck: [140, 110], sh: [132, 120], hip: [116, 192],
    eb: [124, 156], hb: [126, 190], ef: [150, 152], hf: [166, 176],
    kb: [108, 246], fb: [100, 298], kf: [128, 244], ff: [134, 298],
    torso: 30, arm: 10, leg: 12, beard: 1, cane: 1, coat: 1,
  },
  { // looks 50: upright, portly, top hat, frock coat
    head: [126, 60], r: 14, neck: [125, 76], sh: [123, 88], hip: [120, 176],
    eb: [110, 130], hb: [108, 170], ef: [134, 130], hf: [140, 168],
    kb: [112, 238], fb: [106, 298], kf: [130, 238], ff: [134, 298],
    torso: 40, arm: 11, leg: 13, beard: 0.35, hat: 1, coat: 0.85,
  },
  { // looks 33: the officer, one hand on his hip, the other raised
    head: [120, 50], r: 14, neck: [120, 66], sh: [120, 78], hip: [120, 168],
    eb: [100, 116], hb: [106, 150], ef: [146, 72], hf: [150, 40],
    kb: [106, 232], fb: [94, 298], kf: [136, 232], ff: [148, 298],
    torso: 34, arm: 11, leg: 13, beard: 0.12, coat: 0.45,
  },
  { // looks 20: mid-stride with a football
    head: [136, 66], r: 14.5, neck: [131, 82], sh: [128, 94], hip: [114, 176],
    eb: [104, 124], hb: [88, 108], ef: [150, 122], hf: [152, 146],
    kb: [94, 226], fb: [66, 262], kf: [146, 218], ff: [150, 298],
    torso: 30, arm: 10.5, leg: 12.5, ball: 1,
  },
  { // looks 10: a boy
    head: [124, 178], r: 15, neck: [123, 194], sh: [122, 203], hip: [120, 250],
    eb: [109, 226], hb: [104, 246], ef: [135, 224], hf: [146, 236],
    kb: [114, 274], fb: [111, 298], kf: [127, 274], ff: [131, 298],
    torso: 24, arm: 8, leg: 9.5,
  },
  { // a newborn, sitting up with the rattle
    head: [126, 242], r: 17, neck: [123, 258], sh: [122, 262], hip: [116, 288],
    eb: [108, 276], hb: [112, 290], ef: [138, 272], hf: [150, 262],
    kb: [132, 288], fb: [148, 298], kf: [136, 286], ff: [152, 294],
    torso: 26, arm: 8, leg: 9, rattle: 1,
  },
];

// Hildegarde ages forward: 0 = twenty at the Shevlins' dance, 2 = fifty and tired
const HILDEGARDE = [
  {
    head: [120, 70], r: 12.5, neck: [120, 85], sh: [120, 96], hip: [120, 168],
    eb: [108, 128], hb: [116, 158], ef: [132, 128], hf: [124, 158],
    kb: [116, 234], fb: [114, 298], kf: [124, 234], ff: [128, 298],
    torso: 26, arm: 8.5, leg: 10, skirt: 1, bun: 1,
  },
  {
    head: [121, 70], r: 13, neck: [121, 86], sh: [120, 97], hip: [120, 170],
    eb: [108, 128], hb: [110, 164], ef: [134, 126], hf: [140, 160],
    kb: [116, 234], fb: [114, 298], kf: [124, 234], ff: [128, 298],
    torso: 31, arm: 9, leg: 10, skirt: 1, bun: 1,
  },
  {
    head: [132, 88], r: 13, neck: [126, 101], sh: [122, 110], hip: [116, 180],
    eb: [110, 144], hb: [112, 178], ef: [130, 144], hf: [136, 176],
    kb: [114, 238], fb: [112, 298], kf: [122, 238], ff: [126, 298],
    torso: 37, arm: 9.5, leg: 10, skirt: 1, bun: 1,
  },
];

// Roscoe as a grown man, arms folded
const ROSCOE = [
  {
    head: [122, 56], r: 14, neck: [122, 72], sh: [122, 84], hip: [120, 172],
    eb: [106, 124], hb: [136, 118], ef: [140, 126], hf: [108, 120],
    kb: [112, 236], fb: [108, 298], kf: [130, 236], ff: [136, 298],
    torso: 38, arm: 11, leg: 13, coat: 0.6,
  },
];

export const CAST = { benjamin: BENJAMIN, hildegarde: HILDEGARDE, roscoe: ROSCOE };
Object.values(CAST).forEach((frames) => frames.forEach((f, i) => (frames[i] = { ...DEFAULTS, ...f })));

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const at = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

export function samplePose(frames, p) {
  const n = frames.length - 1;
  if (n === 0) return frames[0];
  const c = Math.min(Math.max(p, 0), n);
  const i = Math.min(Math.floor(c), n - 1);
  const t = smooth(c - i);
  const a = frames[i];
  const b = frames[i + 1];
  const out = {};
  for (const k in a) out[k] = Array.isArray(a[k]) ? at(a[k], b[k], t) : lerp(a[k], b[k], t);
  return out;
}

const n = (v) => Math.round(v * 10) / 10;
const pt = ([x, y]) => `${n(x)} ${n(y)}`;
const circle = (x, y, r) => `M${n(x - r)} ${n(y)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0`;
const poly = (...pts) => `M${pts.map(pt).join('L')}Z`;

/** Turns a pose into a fixed-order list of strokes and fills. The order never changes, so SVG nodes can be reused. */
export function buildShapes(q) {
  const [hx, hy] = q.head;
  const r = q.r;
  const shoe = (foot, w) => ({ k: 's', d: `M${pt(foot)}L${pt([foot[0] + w * 0.8, foot[1]])}`, w: w * 0.9, o: 1 });
  const waist = at(q.sh, q.hip, 0.7);
  const groundY = Math.max(q.fb[1], q.ff[1]);
  const hemX = (q.fb[0] + q.ff[0]) / 2;
  const hemW = 34 + q.skirt * 46;
  const tw = q.torso * 0.9;

  const beardTip = [hx + r * 0.3 + q.beard * 4, hy + r * (0.55 + q.beard * 2.7)];
  const brimY = hy - r * 0.72;

  return [
    { k: 's', cls: 'arm', d: `M${pt(q.sh)}L${pt(q.eb)}L${pt(q.hb)}`, w: q.arm, o: 1 },
    { k: 's', cls: 'leg', d: `M${pt(q.hip)}L${pt(q.kb)}L${pt(q.fb)}`, w: q.leg, o: 1 },
    shoe(q.fb, q.leg),
    {
      k: 'f', cls: 'dress',
      d: `M${pt([waist[0] - tw / 2, waist[1]])}L${pt([waist[0] + tw / 2, waist[1]])}L${pt([hemX + hemW / 2, groundY])}Q${pt([hemX, groundY + 6])} ${pt([hemX - hemW / 2, groundY])}Z`,
      o: q.skirt,
    },
    {
      k: 'f', cls: 'coat',
      d: poly(
        [q.hip[0] - q.torso / 2, q.hip[1] - 22],
        [q.hip[0] + q.torso / 2, q.hip[1] - 22],
        [q.hip[0] + q.torso / 2 + 3, q.hip[1] + q.coat * 42],
        [q.hip[0] - q.torso / 2 - q.coat * 8, q.hip[1] + q.coat * 60],
      ),
      o: Math.min(1, q.coat * 1.4),
    },
    { k: 's', cls: 'torso', d: `M${pt(at(q.sh, q.hip, 0.12))}L${pt(at(q.hip, q.sh, 0.1))}`, w: q.torso, o: 1 },
    { k: 's', cls: 'neck', d: `M${pt([hx - r * 0.2, hy])}L${pt(q.sh)}`, w: r * 0.8, o: 1 },
    { k: 's', cls: 'leg', d: `M${pt(q.hip)}L${pt(q.kf)}L${pt(q.ff)}`, w: q.leg, o: 1 },
    shoe(q.ff, q.leg),
    { k: 's', cls: 'arm', d: `M${pt(q.sh)}L${pt(q.ef)}L${pt(q.hf)}`, w: q.arm, o: 1 },
    { k: 'f', cls: 'head', d: circle(hx, hy, r), o: 1 },
    { k: 'f', cls: 'bun', d: circle(hx - r * 0.85, hy - r * 0.25, r * 0.55), o: q.bun },
    {
      k: 'f', cls: 'beard',
      d: `M${pt([hx - r * 0.55, hy + r * 0.2])}Q${pt([hx - r * 0.45, beardTip[1] - r * 0.5])} ${pt(beardTip)}Q${pt([hx + r * 1.15, beardTip[1] - r * 0.9])} ${pt([hx + r * 0.95, hy + r * 0.15])}Z`,
      o: q.beard > 0.02 ? Math.min(1, q.beard * 3) : 0,
    },
    {
      k: 'f', cls: 'hat',
      d: `M${pt([hx - r * 1.35, brimY])}h${n(r * 2.7)}v${n(r * 0.3)}h${n(-r * 2.7)}Z M${pt([hx - r * 0.8, brimY])}v${n(-r * 1.6 * q.hat)}h${n(r * 1.6)}v${n(r * 1.6 * q.hat)}Z`,
      o: q.hat,
    },
    {
      k: 's', cls: 'cane',
      d: `M${pt(q.hf)}L${pt([q.hf[0] + 12, GROUND])}M${pt([q.hf[0] - 9, q.hf[1] + 4])}Q${pt([q.hf[0] - 6, q.hf[1] - 8])} ${pt([q.hf[0] + 2, q.hf[1] - 2])}`,
      w: 4, o: q.cane,
    },
    {
      k: 'f', cls: 'ball',
      d: `M${pt([q.hf[0] - 10, q.hf[1] + 2])}Q${pt([q.hf[0] + 2, q.hf[1] - 12])} ${pt([q.hf[0] + 16, q.hf[1] - 6])}Q${pt([q.hf[0] + 4, q.hf[1] + 10])} ${pt([q.hf[0] - 10, q.hf[1] + 2])}Z`,
      o: q.ball,
    },
    {
      k: 'f', cls: 'rattle',
      d: `${circle(q.hf[0] + 7, q.hf[1] - 14, 6.5)}M${pt([q.hf[0] - 1, q.hf[1] + 2])}L${pt([q.hf[0] + 5, q.hf[1] - 8])}L${pt([q.hf[0] + 8, q.hf[1] - 6])}L${pt([q.hf[0] + 2, q.hf[1] + 4])}Z`,
      o: q.rattle,
    },
  ];
}

const SVG_NS = 'http://www.w3.org/2000/svg';
let gradientId = 0;

/**
 * Mounts a figure into `host`.
 * options.mode: 'svg' (default) or 'canvas' (low-res and pixelated, for the 2001 Flash era)
 * options.paint: a CSS color, or an array of [offset, color] stops for a vertical gradient
 */
export function createFigure(host, { cast = 'benjamin', mode = 'svg', paint = 'currentColor', beard, pixel = 3, label, outline } = {}) {
  const frames = CAST[cast];
  let last = null;

  if (mode === 'canvas') {
    const canvas = document.createElement('canvas');
    canvas.className = 'fig fig--pixel';
    canvas.width = Math.round(240 / pixel);
    canvas.height = Math.round(320 / pixel);
    if (label) canvas.setAttribute('aria-label', label);
    else canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    return {
      el: canvas,
      set(p) {
        if (p === last) return;
        last = p;
        const color = paint === 'currentColor' ? getComputedStyle(host).color : paint;
        const beardColor = beard || color;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(1 / pixel, 0, 0, 1 / pixel, 0, 0);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const shapes = buildShapes(samplePose(frames, p));
        if (outline) {
          // A sprite-style outline: every shape stroked fat in the outline color first.
          ctx.strokeStyle = outline;
          ctx.fillStyle = outline;
          shapes.forEach((s) => {
            if (s.o <= 0.5) return;
            const path = new Path2D(s.d);
            ctx.lineWidth = (s.k === 's' ? s.w : 0) + pixel * 2;
            ctx.stroke(path);
            if (s.k === 'f') ctx.fill(path);
          });
        }
        shapes.forEach((s) => {
          if (s.o <= 0.01) return;
          ctx.globalAlpha = Math.min(1, s.o);
          const path = new Path2D(s.d);
          const c = s.cls === 'beard' ? beardColor : color;
          if (s.k === 's') {
            ctx.strokeStyle = c;
            ctx.lineWidth = s.w;
            ctx.stroke(path);
          } else {
            ctx.fillStyle = c;
            ctx.fill(path);
          }
        });
        ctx.globalAlpha = 1;
      },
    };
  }

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 240 320');
  svg.setAttribute('class', 'fig');
  if (label) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }

  let fill = paint;
  if (Array.isArray(paint)) {
    const id = `fig-grad-${++gradientId}`;
    const defs = document.createElementNS(SVG_NS, 'defs');
    const grad = document.createElementNS(SVG_NS, 'linearGradient');
    grad.setAttribute('id', id);
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    grad.setAttribute('x1', '0');
    grad.setAttribute('y1', '20');
    grad.setAttribute('x2', '60');
    grad.setAttribute('y2', '310');
    paint.forEach(([offset, color]) => {
      const stop = document.createElementNS(SVG_NS, 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', color);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
    svg.appendChild(defs);
    fill = `url(#${id})`;
  }

  const group = document.createElementNS(SVG_NS, 'g');
  group.setAttribute('stroke-linecap', 'round');
  group.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(group);

  const nodes = buildShapes(samplePose(frames, 0)).map((s) => {
    const node = document.createElementNS(SVG_NS, 'path');
    node.setAttribute('class', `fig__${s.cls || 'part'}`);
    const c = s.cls === 'beard' && beard ? beard : fill;
    if (s.k === 's') {
      node.setAttribute('fill', 'none');
      node.setAttribute('stroke', c);
    } else {
      node.setAttribute('fill', c);
    }
    group.appendChild(node);
    return node;
  });

  host.appendChild(svg);

  return {
    el: svg,
    set(p) {
      if (p === last) return;
      last = p;
      buildShapes(samplePose(frames, p)).forEach((s, i) => {
        const node = nodes[i];
        node.setAttribute('d', s.d);
        if (s.w) node.setAttribute('stroke-width', n(s.w));
        node.setAttribute('opacity', n(Math.min(1, s.o)));
      });
    },
  };
}
