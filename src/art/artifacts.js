// Illustrations for the memory dialog. Each era draws its objects the way that era drew things:
// 1995 in dithered black and white, 2001 as low-color clip art, 2007 glossy, 2015 flat with
// long shadows, 2026 soft and luminous, ending with a crib that is barely there.

const dither = (p) => `
  <pattern id="${p}25" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#fff"/><rect width="1" height="1"/><rect x="2" y="2" width="1" height="1"/></pattern>
  <pattern id="${p}50" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#fff"/><rect width="1" height="1"/><rect x="1" y="1" width="1" height="1"/></pattern>
  <pattern id="${p}75" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2"/><rect width="1" height="1" fill="#fff"/></pattern>
`;

const FELL = `font-family="'IM Fell English', Georgia, serif"`;
const SCRIPT = `font-family="'Pinyon Script', cursive"`;
const TYPE = `font-family="'Special Elite', 'Courier New', monospace"`;
const ROBOTO = `font-family="Roboto, Arial, sans-serif"`;
const SOFT = `font-family="'Bricolage Grotesque', system-ui, sans-serif"`;

export const ARTIFACTS = {
  /* 1995 ---------------------------------------------------------------- */
  rattle: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A silver baby rattle, drawn in dithered black and white">
    <defs>${dither('ra')}</defs>
    <rect width="480" height="360" fill="url(#ra25)"/>
    <rect x="0" y="286" width="480" height="74" fill="url(#ra50)"/>
    <ellipse cx="250" cy="300" rx="170" ry="16" fill="#000" opacity=".85"/>
    <g transform="rotate(-32 240 180)">
      <circle cx="240" cy="330" r="30" fill="none" stroke="#000" stroke-width="16"/>
      <circle cx="240" cy="330" r="30" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="20 70"/>
      <rect x="226" y="168" width="28" height="136" fill="url(#ra50)" stroke="#000" stroke-width="4"/>
      <rect x="232" y="176" width="6" height="120" fill="#fff"/>
      <rect x="218" y="206" width="44" height="12" fill="#000"/>
      <rect x="218" y="250" width="44" height="12" fill="#000"/>
      <rect x="214" y="158" width="52" height="16" fill="#000"/>
      <circle cx="240" cy="96" r="74" fill="#fff" stroke="#000" stroke-width="5"/>
      <path d="M240 22a74 74 0 0 1 0 148a92 92 0 0 0 0-148z" fill="url(#ra50)"/>
      <path d="M272 30a74 74 0 0 1 10 128a86 86 0 0 0-10-128z" fill="#000"/>
      <ellipse cx="240" cy="96" rx="74" ry="16" fill="none" stroke="#000" stroke-width="4"/>
      <ellipse cx="240" cy="96" rx="74" ry="16" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 6"/>
      <circle cx="210" cy="62" r="16" fill="#fff"/>
      <circle cx="204" cy="58" r="6" fill="url(#ra25)"/>
      ${[0, 60, 120, 180, 240, 300]
        .map((a) => {
          const x = 240 + Math.cos((a * Math.PI) / 180) * 88;
          const y = 96 + Math.sin((a * Math.PI) / 180) * 22;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="url(#ra75)" stroke="#000" stroke-width="3"/>`;
        })
        .join('')}
    </g>
    <text x="24" y="340" font-family="'Courier New', monospace" font-size="13">rattle.gif  (1-bit, 480x360)</text>
  </svg>`,

  cigar: `
  <svg viewBox="0 0 480 360" role="img" aria-label="An open box of Havana cigars, dithered">
    <defs>${dither('ci')}</defs>
    <rect width="480" height="360" fill="#fff"/>
    <path d="M60 150 L130 40 H430 L360 150Z" fill="url(#ci75)" stroke="#000" stroke-width="4"/>
    <path d="M86 138 L144 54 H410 L352 138Z" fill="#fff" stroke="#000" stroke-width="2"/>
    <text x="250" y="96" text-anchor="middle" font-family="'Times New Roman', serif" font-weight="700" font-size="30" transform="skewX(-28) translate(52 0)">HAVANA</text>
    <text x="250" y="122" text-anchor="middle" font-family="'Times New Roman', serif" font-style="italic" font-size="15" transform="skewX(-28) translate(64 0)">Roger Button, his box</text>
    <path d="M60 150 H360 V300 H60Z" fill="url(#ci50)" stroke="#000" stroke-width="4"/>
    <path d="M360 150 L430 40 V190 L360 300Z" fill="url(#ci75)" stroke="#000" stroke-width="4"/>
    <path d="M76 162 H344 V250 H76Z" fill="#fff" stroke="#000" stroke-width="3"/>
    ${[0, 1, 2, 3, 4]
      .map(
        (i) => `
      <rect x="84" y="${170 + i * 16}" width="${i === 2 ? 200 : 252}" height="13" rx="6.5" fill="url(#ci75)" stroke="#000" stroke-width="2"/>
      <rect x="${i === 2 ? 240 : 290}" y="${170 + i * 16}" width="22" height="13" fill="#fff" stroke="#000" stroke-width="2"/>`,
      )
      .join('')}
    <g transform="rotate(-8 360 300)">
      <rect x="250" y="300" width="190" height="20" rx="10" fill="url(#ci75)" stroke="#000" stroke-width="3"/>
      <rect x="400" y="300" width="18" height="20" fill="#fff" stroke="#000" stroke-width="3"/>
      <circle cx="252" cy="310" r="9" fill="#fff" stroke="#000" stroke-width="3"/>
    </g>
    <path d="M238 296 C220 270 250 256 232 232 C216 212 242 196 226 176" fill="none" stroke="#000" stroke-width="3" stroke-dasharray="2 5" stroke-linecap="round"/>
  </svg>`,

  encyclopaedia: `
  <svg viewBox="0 0 480 360" role="img" aria-label="Volumes of the Encyclopaedia Britannica, one lying open">
    <defs>${dither('en')}</defs>
    <rect width="480" height="360" fill="url(#en25)"/>
    ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
      .map(
        (v, i) => `
      <g transform="translate(${36 + i * 42} 40)">
        <rect width="40" height="200" fill="${i % 2 ? 'url(#en75)' : '#000'}" stroke="#000" stroke-width="2"/>
        <rect x="4" y="16" width="32" height="4" fill="#fff"/>
        <rect x="4" y="178" width="32" height="4" fill="#fff"/>
        <rect x="6" y="34" width="28" height="44" fill="#fff" stroke="#000"/>
        <text x="20" y="54" text-anchor="middle" font-family="'Times New Roman', serif" font-size="9" font-weight="700">BRIT.</text>
        <text x="20" y="70" text-anchor="middle" font-family="'Times New Roman', serif" font-size="13">${v}</text>
      </g>`,
      )
      .join('')}
    <g transform="translate(206 186) rotate(-6)">
      <path d="M0 20 Q60 -6 124 16 Q188 -6 248 20 V150 Q188 128 124 150 Q60 128 0 150Z" fill="#fff" stroke="#000" stroke-width="4"/>
      <path d="M124 16 V150" stroke="#000" stroke-width="3"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8]
        .map(
          (l) => `<rect x="14" y="${36 + l * 11}" width="${88 - (l % 3) * 12}" height="4" fill="url(#en50)"/><rect x="138" y="${36 + l * 11}" width="${92 - ((l + 1) % 4) * 10}" height="4" fill="url(#en50)"/>`,
        )
        .join('')}
      <text x="62" y="30" text-anchor="middle" font-family="'Times New Roman', serif" font-size="10" font-style="italic">Longevity</text>
      <text x="186" y="30" text-anchor="middle" font-family="'Times New Roman', serif" font-size="10" font-style="italic">Lord Byron</text>
    </g>
  </svg>`,

  yale: `
  <svg viewBox="0 0 400 480" role="img" aria-label="A letter from the registrar of Yale College, September 1878">
    <defs>${dither('ya')}</defs>
    <rect width="400" height="480" fill="url(#ya25)"/>
    <path d="M34 24 H372 L366 460 H28Z" fill="#fff" stroke="#000" stroke-width="2"/>
    <circle cx="200" cy="74" r="30" fill="none" stroke="#000" stroke-width="3"/>
    <circle cx="200" cy="74" r="22" fill="url(#ya50)"/>
    <text x="200" y="80" text-anchor="middle" ${FELL} font-size="18">Y</text>
    <text x="200" y="130" text-anchor="middle" ${FELL} font-size="18">Yale College</text>
    <text x="200" y="148" text-anchor="middle" ${FELL} font-size="12" font-style="italic">Office of the Registrar, New Haven</text>
    <path d="M70 162 H330" stroke="#000"/>
    <text ${FELL} font-size="14">
      <tspan x="60" y="192">September, 1878</tspan>
      <tspan x="60" y="226">Mr. Benjamin Button,</tspan>
      <tspan x="72" y="250">Our card gives your age as eighteen. Surely you</tspan>
      <tspan x="60" y="272">do not expect this office to believe that. Get out</tspan>
      <tspan x="60" y="294">of college and get out of town. You have eighteen</tspan>
      <tspan x="60" y="316">minutes, which is one for every year you claim.</tspan>
      <tspan x="60" y="338">You are a dangerous lunatic.</tspan>
      <tspan x="220" y="384">Respectfully,</tspan>
    </text>
    <text x="220" y="420" ${SCRIPT} font-size="30">Mr. Hart</text>
    <rect x="46" y="400" width="70" height="42" fill="url(#ya50)" transform="rotate(-12 80 420)"/>
  </svg>`,

  /* 2001 ---------------------------------------------------------------- */
  dancecard: `
  <svg viewBox="0 0 480 360" role="img" aria-label="Hildegarde's dance card from the Shevlins' dance, every waltz given to B. Button">
    <rect width="480" height="360" fill="#b9c4e8"/>
    <path d="M0 0h480v360H0z" fill="url(#dc-grid)"/>
    <defs><pattern id="dc-grid" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="#a7b3de"/></pattern></defs>
    <rect x="98" y="30" width="290" height="310" fill="#1f2a6b" opacity=".35" transform="translate(8 8)"/>
    <rect x="98" y="30" width="290" height="310" fill="#fff8f2" stroke="#1f2a6b" stroke-width="2"/>
    <rect x="110" y="42" width="266" height="286" fill="none" stroke="#d26a8f" stroke-width="1.5" stroke-dasharray="4 3"/>
    <path d="M243 30 C238 12 222 8 214 16 M243 30 C250 10 268 8 272 18" fill="none" stroke="#d26a8f" stroke-width="3"/>
    <circle cx="243" cy="30" r="5" fill="#d26a8f"/>
    <text x="243" y="80" text-anchor="middle" ${SCRIPT} font-size="30" fill="#1f2a6b">The Shevlins</text>
    <text x="243" y="100" text-anchor="middle" ${FELL} font-size="13" fill="#1f2a6b" font-style="italic">a dance, June 1880</text>
    ${['Waltz', 'Lancers', 'Waltz', 'Polka', 'Waltz', 'Galop', 'Waltz']
      .map(
        (d, i) => `
      <text x="128" y="${134 + i * 27}" ${FELL} font-size="14" fill="#1f2a6b">${i + 1}. ${d}</text>
      <path d="M200 ${137 + i * 27} H300" stroke="#1f2a6b" stroke-dasharray="1 3"/>
      ${d === 'Waltz' ? `<text x="304" y="${136 + i * 27}" ${SCRIPT} font-size="19" fill="#3a3f7a">B. Button</text>` : ''}`,
      )
      .join('')}
  </svg>`,

  invitation: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A wedding invitation from General and Mrs. Moncrief">
    <defs>
      <pattern id="in-dot" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#d9ccf0"/><rect width="3" height="3" fill="#cbbbe8"/></pattern>
    </defs>
    <rect width="480" height="360" fill="url(#in-dot)"/>
    <rect x="66" y="26" width="348" height="310" fill="#5d4f86" transform="translate(6 6)"/>
    <rect x="66" y="26" width="348" height="310" fill="#fffdf6"/>
    <rect x="80" y="40" width="320" height="282" fill="none" stroke="#b89b5e" stroke-width="3"/>
    <rect x="86" y="46" width="308" height="270" fill="none" stroke="#b89b5e"/>
    <path d="M240 58 l8 10 -8 10 -8 -10z" fill="#b89b5e"/>
    <text text-anchor="middle" fill="#3c2f5c">
      <tspan x="240" y="104" ${FELL} font-size="14">General and Mrs. Moncrief</tspan>
      <tspan x="240" y="126" ${FELL} font-size="12" font-style="italic">request the honour of your presence</tspan>
      <tspan x="240" y="144" ${FELL} font-size="12" font-style="italic">at the marriage of their daughter</tspan>
    </text>
    <text x="240" y="190" text-anchor="middle" ${SCRIPT} font-size="42" fill="#5d4f86">Hildegarde</text>
    <text x="240" y="214" text-anchor="middle" ${FELL} font-size="12" font-style="italic" fill="#3c2f5c">to</text>
    <text x="240" y="250" text-anchor="middle" ${SCRIPT} font-size="32" fill="#5d4f86">Mr. Benjamin Button</text>
    <text x="240" y="288" text-anchor="middle" ${FELL} font-size="12" fill="#3c2f5c">Baltimore, in the year eighteen hundred and eighty</text>
  </svg>`,

  catalog: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A page from the Roger Button and Company wholesale hardware catalog: hammer, hinge, padlock and nails">
    <rect width="480" height="360" fill="#f3efe2"/>
    <rect x="16" y="14" width="448" height="332" fill="none" stroke="#1f2a6b" stroke-width="3"/>
    <text x="240" y="50" text-anchor="middle" ${FELL} font-size="26" fill="#1f2a6b">Roger Button &amp; Co.</text>
    <text x="240" y="70" text-anchor="middle" ${FELL} font-size="12" letter-spacing="3" fill="#1f2a6b">Wholesale Hardware, Baltimore, Md.</text>
    <path d="M40 82 H440" stroke="#1f2a6b" stroke-width="1.5"/>
    <g fill="none" stroke="#1f2a6b" stroke-width="3" stroke-linejoin="round">
      <g transform="translate(66 110)">
        <path d="M34 0 H70 Q84 6 82 18 H34Z" fill="#9aa4cf"/>
        <path d="M34 4 Q10 0 0 16 Q18 12 34 16" fill="#9aa4cf"/>
        <rect x="50" y="18" width="14" height="100" rx="4" fill="#d8b37a"/>
      </g>
      <g transform="translate(200 116)">
        <rect x="0" y="0" width="34" height="96" fill="#9aa4cf"/>
        <rect x="46" y="0" width="34" height="96" fill="#9aa4cf"/>
        <rect x="34" y="0" width="12" height="96" fill="#5d6798"/>
        ${[16, 48, 80].map((y) => `<circle cx="17" cy="${y}" r="4"/><circle cx="63" cy="${y}" r="4"/>`).join('')}
      </g>
      <g transform="translate(340 108)">
        <path d="M14 46 V28 a26 26 0 0 1 52 0 V46" stroke-width="9"/>
        <rect x="0" y="44" width="80" height="62" rx="6" fill="#d8b37a"/>
        <circle cx="40" cy="70" r="7" fill="#1f2a6b"/>
        <path d="M40 76 V92" stroke-width="5"/>
      </g>
    </g>
    <g stroke="#1f2a6b" stroke-width="2.5" stroke-linecap="round">
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${200 + i * 12} 262 l${i % 2 ? 4 : -3} 44"/><path d="M${196 + i * 12} 262 h8"/>`).join('')}
    </g>
    <g ${FELL} font-size="13" fill="#1f2a6b" text-anchor="middle">
      <text x="106" y="252">Claw Hammer</text><text x="106" y="270" font-style="italic">$4.50 the dozen</text>
      <text x="240" y="236">Brass Hinge</text><text x="240" y="254" font-style="italic" font-size="11">$1.20 the dozen</text>
      <text x="380" y="236">Lever Padlock</text><text x="380" y="254" font-style="italic">$6.00 the dozen</text>
      <text x="380" y="300">Cut Nails</text><text x="380" y="318" font-style="italic">3¢ the pound</text>
    </g>
  </svg>`,

  roscoe: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A birth announcement for Roscoe with a pair of knitted baby booties in pixel art" shape-rendering="crispEdges">
    <rect width="480" height="360" fill="#dfe8ff"/>
    ${Array.from({ length: 16 }, (_, i) => `<rect x="${(i * 97) % 470}" y="${(i * 61) % 350}" width="6" height="6" fill="#fff"/>`).join('')}
    <rect x="70" y="40" width="340" height="280" fill="#1f2a6b" transform="translate(8 8)"/>
    <rect x="70" y="40" width="340" height="280" fill="#fff"/>
    <rect x="70" y="40" width="340" height="28" fill="#7c93d6"/>
    <text x="84" y="59" font-family="Silkscreen, monospace" font-size="12" fill="#fff">new_arrival.gif</text>
    <g transform="translate(150 96)">
      ${[
        '....XXXXXX......XXXXXX....',
        '...XWWWWWWX....XWWWWWWX...',
        '...XWPWWPWX....XWPWWPWX...',
        '...XWWWWWWX....XWWWWWWX...',
        '...XPPPPPPX....XPPPPPPX...',
        '...XWWWWWWX....XWWWWWWX...',
        '..XWWWWWWWWX..XWWWWWWWWX..',
        '.XWWWWWWWWWWXXWWWWWWWWWWX.',
        '.XWWWWWWWWWWXXWWWWWWWWWWX.',
        '..XXXXXXXXXX..XXXXXXXXXX..',
      ]
        .map((row, y) =>
          row
            .split('')
            .map((c, x) =>
              c === '.' ? '' : `<rect x="${x * 7}" y="${y * 7}" width="7" height="7" fill="${c === 'X' ? '#1f2a6b' : c === 'P' ? '#9fb6ff' : '#fff'}"/>`,
            )
            .join(''),
        )
        .join('')}
    </g>
    <text x="240" y="214" text-anchor="middle" font-family="Verdana, sans-serif" font-weight="700" font-size="24" fill="#1f2a6b">It's a boy!</text>
    <text x="240" y="252" text-anchor="middle" ${SCRIPT} font-size="40" fill="#5b6fb8">Roscoe Button</text>
    <text x="240" y="290" text-anchor="middle" font-family="Verdana, sans-serif" font-size="11" fill="#5d6484">Mr. &amp; Mrs. Benjamin Button, Baltimore</text>
  </svg>`,

  /* 2007 ---------------------------------------------------------------- */
  medal: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A glossy bronze campaign medal on a striped ribbon">
    <defs>
      <linearGradient id="me-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e4ebf3"/></linearGradient>
      <linearGradient id="me-bronze" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe0a3"/><stop offset=".45" stop-color="#c98a3b"/><stop offset="1" stop-color="#7a4a18"/></linearGradient>
      <linearGradient id="me-gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="me-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".6" stop-color="#fff" stop-opacity="1"/></linearGradient>
      <clipPath id="me-rib"><path d="M190 20 H290 L270 150 H210Z"/></clipPath>
    </defs>
    <rect width="480" height="360" fill="url(#me-floor)"/>
    <g id="me-medal">
      <g clip-path="url(#me-rib)">
        <rect x="180" y="10" width="120" height="150" fill="#c8102e"/>
        <rect x="206" y="10" width="14" height="150" fill="#ffd23f"/>
        <rect x="233" y="10" width="14" height="150" fill="#1d4fb8"/>
        <rect x="260" y="10" width="14" height="150" fill="#ffd23f"/>
        <rect x="180" y="10" width="120" height="70" fill="url(#me-gloss)"/>
      </g>
      <rect x="206" y="146" width="68" height="16" rx="8" fill="url(#me-bronze)"/>
      <circle cx="240" cy="222" r="66" fill="url(#me-bronze)" stroke="#6b3f12" stroke-width="2"/>
      <circle cx="240" cy="222" r="52" fill="none" stroke="#ffe7b8" stroke-width="2" opacity=".7"/>
      <path d="M240 178 l12.3 25.1 27.7 4 -20 19.5 4.7 27.6 -24.7-13 -24.7 13 4.7-27.6 -20-19.5 27.7-4z" fill="#8a5520" stroke="#ffe0a3" stroke-width="1.5"/>
      <path d="M180 206 a66 66 0 0 1 120 0 a70 40 0 0 0 -120 0z" fill="url(#me-gloss)"/>
    </g>
    <g transform="translate(0 580) scale(1 -1)" opacity=".35"><use href="#me-medal"/></g>
    <rect x="0" y="290" width="480" height="70" fill="url(#me-fade)"/>
  </svg>`,

  motorcar: `
  <svg viewBox="0 0 480 360" role="img" aria-label="An early motorcar with brass lamps, parked on a shiny floor">
    <defs>
      <linearGradient id="mo-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".72" stop-color="#e3ebf4"/><stop offset=".72" stop-color="#d7e1ec"/><stop offset="1" stop-color="#f2f6fa"/></linearGradient>
      <linearGradient id="mo-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f2338"/><stop offset=".38" stop-color="#5d1524"/><stop offset=".39" stop-color="#4a0f1c"/><stop offset="1" stop-color="#7a1e2f"/></linearGradient>
      <linearGradient id="mo-brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3bf"/><stop offset=".5" stop-color="#d7a63c"/><stop offset="1" stop-color="#8a6415"/></linearGradient>
      <linearGradient id="mo-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="mo-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef3f8" stop-opacity=".3"/><stop offset=".7" stop-color="#eef3f8"/></linearGradient>
    </defs>
    <rect width="480" height="360" fill="url(#mo-bg)"/>
    <g id="mo-car">
      <path d="M78 196 h50 l18-44 h96 l10 44 h108 q26 0 30 20 v22 q0 10-12 10 H70 q-14 0-14-14 v-18 q0-20 22-20z" fill="url(#mo-body)"/>
      <path d="M146 152 h96 l10 44 h-120z" fill="#2f3b52"/>
      <path d="M150 158 h86 l7 32 h-104z" fill="#9db6d2"/>
      <path d="M78 198 q90-14 300-2" fill="none" stroke="url(#mo-shine)" stroke-width="6" stroke-linecap="round"/>
      <rect x="96" y="150" width="46" height="8" rx="4" fill="url(#mo-brass)"/>
      <circle cx="372" cy="182" r="18" fill="url(#mo-brass)"/>
      <circle cx="372" cy="182" r="11" fill="#fff8d8"/>
      <circle cx="368" cy="178" r="4" fill="#fff"/>
      <rect x="352" y="196" width="36" height="8" rx="4" fill="url(#mo-brass)"/>
      <path d="M262 150 q22 6 30 22" fill="none" stroke="url(#mo-brass)" stroke-width="5" stroke-linecap="round"/>
      <circle cx="262" cy="148" r="14" fill="none" stroke="url(#mo-brass)" stroke-width="5"/>
      <g fill="#1a1a1f">
        <circle cx="140" cy="262" r="46"/><circle cx="356" cy="262" r="46"/>
      </g>
      <g fill="#f2f4f7">
        <circle cx="140" cy="262" r="30"/><circle cx="356" cy="262" r="30"/>
      </g>
      <g stroke="#b9c2cc" stroke-width="2">
        ${Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          const dx = Math.cos(a) * 28;
          const dy = Math.sin(a) * 28;
          return `<path d="M${(140 - dx).toFixed(1)} ${(262 - dy).toFixed(1)}L${(140 + dx).toFixed(1)} ${(262 + dy).toFixed(1)}"/><path d="M${(356 - dx).toFixed(1)} ${(262 - dy).toFixed(1)}L${(356 + dx).toFixed(1)} ${(262 + dy).toFixed(1)}"/>`;
        }).join('')}
      </g>
      <g fill="url(#mo-brass)">
        <circle cx="140" cy="262" r="9"/><circle cx="356" cy="262" r="9"/>
      </g>
    </g>
    <g transform="translate(0 620) scale(1 -1)" opacity=".22"><use href="#mo-car"/></g>
    <rect x="0" y="312" width="480" height="48" fill="url(#mo-fade)"/>
  </svg>`,

  mirror: `
  <svg viewBox="0 0 480 360" role="img" aria-label="Hildegarde's silver hand mirror, reflecting her graying hair">
    <defs>
      <linearGradient id="mi-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbeef3"/><stop offset="1" stop-color="#e6d7f2"/></linearGradient>
      <linearGradient id="mi-silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#b8bcc7"/><stop offset=".65" stop-color="#eef0f4"/><stop offset="1" stop-color="#7d8290"/></linearGradient>
      <linearGradient id="mi-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5f1fb"/><stop offset="1" stop-color="#9fb8cf"/></linearGradient>
      <linearGradient id="mi-gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <clipPath id="mi-clip"><ellipse cx="200" cy="150" rx="94" ry="118"/></clipPath>
    </defs>
    <rect width="480" height="360" fill="url(#mi-bg)"/>
    <g transform="rotate(-18 240 180)">
      <rect x="186" y="270" width="28" height="110" rx="14" fill="url(#mi-silver)" stroke="#8d92a0"/>
      <ellipse cx="200" cy="150" rx="110" ry="134" fill="url(#mi-silver)" stroke="#8d92a0" stroke-width="2"/>
      <ellipse cx="200" cy="150" rx="94" ry="118" fill="url(#mi-glass)"/>
      <g clip-path="url(#mi-clip)">
        <circle cx="210" cy="160" r="44" fill="#6c7f95"/>
        <circle cx="168" cy="140" r="26" fill="#8f98a4"/>
        <path d="M170 124 Q196 104 232 118" stroke="#dfe4ea" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M152 132 Q162 120 178 122" stroke="#e8ecf0" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M150 268 Q210 180 290 268Z" fill="#6c7f95"/>
        <path d="M106 40 H300 V120 Q200 90 106 130Z" fill="url(#mi-gloss)" opacity=".8"/>
      </g>
    </g>
  </svg>`,

  keys: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A ring of brass keys with a tag reading Roger Button and Company">
    <defs>
      <linearGradient id="ke-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe9f3"/></linearGradient>
      <linearGradient id="ke-brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b8"/><stop offset=".5" stop-color="#d9a441"/><stop offset="1" stop-color="#8a5f14"/></linearGradient>
      <linearGradient id="ke-tag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ee0ff"/><stop offset=".5" stop-color="#36a4e6"/><stop offset=".51" stop-color="#1f8ad0"/><stop offset="1" stop-color="#4db3ee"/></linearGradient>
    </defs>
    <rect width="480" height="360" fill="url(#ke-bg)"/>
    <circle cx="240" cy="96" r="46" fill="none" stroke="url(#ke-brass)" stroke-width="9"/>
    <circle cx="240" cy="96" r="46" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="30 260" opacity=".8"/>
    ${[
      [-40, 0],
      [-8, 1],
      [28, 2],
    ]
      .map(
        ([rot, i]) => `
      <g transform="rotate(${rot} 240 140)">
        <circle cx="240" cy="166" r="${24 - i * 2}" fill="url(#ke-brass)" stroke="#7a5310" stroke-width="2"/>
        <circle cx="240" cy="166" r="${9 - i}" fill="#eef3f9"/>
        <rect x="233" y="188" width="14" height="${112 - i * 8}" fill="url(#ke-brass)" stroke="#7a5310" stroke-width="2"/>
        <path d="M247 ${270 - i * 8} h14 v8 h-8 v8 h10 v10 h-16Z" fill="url(#ke-brass)" stroke="#7a5310" stroke-width="2"/>
      </g>`,
      )
      .join('')}
    <g transform="rotate(14 330 150)">
      <path d="M286 130 L380 130 Q392 130 392 142 V192 Q392 204 380 204 H286 L262 167Z" fill="url(#ke-tag)" stroke="#1668a8" stroke-width="2"/>
      <circle cx="282" cy="167" r="6" fill="#fff" stroke="#1668a8"/>
      <text x="336" y="162" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-weight="700" font-size="13" fill="#fff">Roger Button</text>
      <text x="336" y="182" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" fill="#e8f6ff">&amp; Co. since 1860</text>
    </g>
    <path d="M280 104 Q300 120 290 134" stroke="url(#ke-brass)" stroke-width="3" fill="none"/>
  </svg>`,

  /* 2015 ---------------------------------------------------------------- */
  program: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A flat-style Harvard versus Yale game program with a football">
    <defs><clipPath id="pr-c"><rect width="480" height="360"/></clipPath><clipPath id="pr-ball"><circle cx="240" cy="150" r="84"/></clipPath></defs>
    <g clip-path="url(#pr-c)">
      <rect width="480" height="360" fill="#a51c30"/>
      <circle cx="240" cy="150" r="84" fill="#ffc107"/>
      <g clip-path="url(#pr-ball)"><path d="M240 150 L500 410 L400 410 L170 180Z" fill="#000" opacity=".16"/></g>
      <path d="M222 150 L520 448 L660 448 L318 106Z" fill="#000" opacity=".12"/>
      <g transform="rotate(-35 240 150)">
        <ellipse cx="240" cy="150" rx="62" ry="36" fill="#8d4e2b"/>
        <path d="M204 150 H276" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        ${[-24, -12, 0, 12, 24].map((x) => `<path d="M${240 + x} 142 V158" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`).join('')}
        <path d="M188 138 Q196 150 188 162 M292 138 Q284 150 292 162" stroke="#fff" stroke-width="4" fill="none"/>
      </g>
      <text x="240" y="276" text-anchor="middle" ${ROBOTO} font-weight="700" font-size="34" fill="#fff">Harvard vs. Yale</text>
      <text x="240" y="306" text-anchor="middle" ${ROBOTO} font-weight="300" font-size="17" fill="#ffe3e8">Cambridge, November 1912</text>
      <rect x="150" y="322" width="180" height="26" rx="2" fill="#7a1323"/>
      <text x="240" y="340" text-anchor="middle" ${ROBOTO} font-weight="500" font-size="13" fill="#fff">7 touchdowns, 14 field goals</text>
    </g>
  </svg>`,

  uncle: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A card from Roscoe that reads: call me Uncle">
    <defs><clipPath id="un-c"><rect width="480" height="360"/></clipPath></defs>
    <g clip-path="url(#un-c)">
      <rect width="480" height="360" fill="#eceff1"/>
      <path d="M90 300 L300 510 H700 L450 260Z" fill="#000" opacity=".06"/>
      <rect x="90" y="60" width="300" height="240" rx="2" fill="#fff"/>
      <path d="M90 60 L240 180 L390 60Z" fill="#cfd8dc"/>
      <path d="M90 60 L240 180 L390 60" fill="none" stroke="#b0bec5" stroke-width="2"/>
      <circle cx="240" cy="180" r="26" fill="#a51c30"/>
      <text x="240" y="189" text-anchor="middle" ${ROBOTO} font-weight="700" font-size="24" fill="#fff">R</text>
      <text x="120" y="244" ${TYPE} font-size="22" fill="#263238">Call me Uncle.</text>
      <text x="120" y="274" ${TYPE} font-size="15" fill="#546e7a">Not Father. Not Roscoe.</text>
    </g>
  </svg>`,

  commission: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A 1917 War Department commission naming Benjamin Button a brigadier general">
    <defs><clipPath id="co-c"><rect width="480" height="360"/></clipPath><clipPath id="co-seal"><circle cx="360" cy="252" r="46"/></clipPath></defs>
    <g clip-path="url(#co-c)">
      <rect width="480" height="360" fill="#607d8b"/>
      <path d="M70 320 L110 360 H500 V330 L420 250Z" fill="#000" opacity=".12"/>
      <rect x="70" y="36" width="340" height="284" rx="2" fill="#fafafa"/>
      <rect x="70" y="36" width="340" height="56" fill="#37474f"/>
      <text x="96" y="70" ${ROBOTO} font-weight="500" font-size="18" fill="#fff">War Department</text>
      <text x="384" y="70" text-anchor="end" ${ROBOTO} font-size="13" fill="#b0bec5">April 1917</text>
      <text ${ROBOTO} font-size="15" fill="#37474f">
        <tspan x="96" y="128">Benjamin Button is hereby</tspan>
        <tspan x="96" y="150">commissioned</tspan>
      </text>
      <text x="96" y="190" ${ROBOTO} font-weight="700" font-size="24" fill="#263238">Brigadier General</text>
      <rect x="96" y="208" width="170" height="4" fill="#cfd8dc"/>
      <rect x="96" y="222" width="130" height="4" fill="#cfd8dc"/>
      <rect x="96" y="236" width="150" height="4" fill="#cfd8dc"/>
      <path d="M360 252 L520 412 H600 L420 222Z" fill="#000" opacity=".14"/>
      <circle cx="360" cy="252" r="46" fill="#ffc107"/>
      <g clip-path="url(#co-seal)"><path d="M360 252 L460 352 L420 380 L330 290Z" fill="#000" opacity=".12"/></g>
      <path d="M360 222 l8.8 18 19.8 2.9 -14.3 14 3.4 19.7 -17.7-9.3 -17.7 9.3 3.4-19.7 -14.3-14 19.8-2.9z" fill="#fff"/>
    </g>
  </svg>`,

  uniform: `
  <svg viewBox="0 0 480 360" role="img" aria-label="An oversized officer's coat on a hanger, far too big for a boy">
    <defs><clipPath id="uf-c"><rect width="480" height="360"/></clipPath></defs>
    <g clip-path="url(#uf-c)">
      <rect width="480" height="360" fill="#ffecb3"/>
      <path d="M130 60 L430 360 H600 L340 100Z" fill="#000" opacity=".07"/>
      <path d="M240 40 q0 -14 12 -14 q12 0 12 12 q0 10 -24 20" fill="none" stroke="#5d4037" stroke-width="5" stroke-linecap="round"/>
      <path d="M240 58 L120 100 H360Z" fill="none" stroke="#5d4037" stroke-width="6" stroke-linejoin="round"/>
      <path d="M126 98 Q180 86 240 86 Q300 86 354 98 L380 340 H100Z" fill="#827717"/>
      <path d="M126 98 L70 290 L104 300 L148 170Z" fill="#6e6612"/>
      <path d="M354 98 L410 290 L376 300 L332 170Z" fill="#6e6612"/>
      <path d="M204 88 L240 170 L276 88" fill="#9e9d24"/>
      <path d="M240 170 V340" stroke="#5a5410" stroke-width="3"/>
      ${[196, 232, 268, 304].map((y) => `<circle cx="252" cy="${y}" r="6" fill="#ffc107"/>`).join('')}
      <rect x="140" y="98" width="50" height="14" rx="2" fill="#5a5410"/>
      <rect x="290" y="98" width="50" height="14" rx="2" fill="#5a5410"/>
      <path d="M315 99 l3 6 6.5 1 -4.7 4.6 1.1 6.4 -5.9-3 -5.9 3 1.1-6.4 -4.7-4.6 6.5-1z" fill="#fff"/>
      <path d="M165 99 l3 6 6.5 1 -4.7 4.6 1.1 6.4 -5.9-3 -5.9 3 1.1-6.4 -4.7-4.6 6.5-1z" fill="#fff"/>
      <rect x="150" y="220" width="60" height="40" rx="2" fill="#6e6612"/>
      <rect x="270" y="220" width="60" height="40" rx="2" fill="#6e6612"/>
    </g>
  </svg>`,

  /* 2026 ---------------------------------------------------------------- */
  paper: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A woven mat of coloured paper strips with a paper chain above it">
    <defs>
      <radialGradient id="pa-bg" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ece9fb"/></radialGradient>
      <filter id="pa-sh" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#6b6883" flood-opacity=".22"/></filter>
    </defs>
    <rect width="480" height="360" fill="url(#pa-bg)"/>
    <g filter="url(#pa-sh)">
      <g transform="rotate(-4 240 244)">
        ${['#ffcbb6', '#d7d1ff', '#c6ecfa', '#ffe3a6', '#ffb7c8', '#cfe9c8']
          .map((c, i) => `<rect x="${126 + i * 34}" y="156" width="28" height="176" rx="4" fill="${c}"/>`)
          .join('')}
        ${['#ffe3a6', '#c6ecfa', '#d7d1ff', '#ffcbb6', '#cfe9c8']
          .map(
            (c, i) => `<rect x="120" y="${170 + i * 34}" width="216" height="26" rx="4" fill="${c}" opacity=".95"/>
            <rect x="${126 + ((i + 1) % 2) * 34}" y="${170 + i * 34}" width="28" height="26" fill="${['#ffcbb6', '#d7d1ff', '#c6ecfa', '#ffe3a6', '#ffb7c8', '#cfe9c8'][((i + 1) % 2) ? 1 : 0]}"/>
            <rect x="${194 + ((i + 1) % 2) * 34}" y="${170 + i * 34}" width="28" height="26" fill="${['#c6ecfa', '#ffe3a6'][i % 2]}"/>
            <rect x="${262 + ((i + 1) % 2) * 34}" y="${170 + i * 34}" width="28" height="26" fill="${['#ffb7c8', '#cfe9c8'][i % 2]}"/>`,
          )
          .join('')}
      </g>
    </g>
    <g fill="none" stroke-width="12" stroke-linecap="round">
      ${['#ffcbb6', '#d7d1ff', '#c6ecfa', '#ffe3a6', '#ffb7c8', '#cfe9c8', '#ffcbb6']
        .map((c, i) => `<ellipse cx="${72 + i * 56}" cy="${72 + (i % 2) * 14}" rx="26" ry="17" stroke="${c}" transform="rotate(${i % 2 ? 12 : -12} ${72 + i * 56} ${72 + (i % 2) * 14})"/>`)
        .join('')}
    </g>
  </svg>`,

  nana: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A nursery lamp glowing warmly in a dim room">
    <defs>
      <radialGradient id="na-glow" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#ffe2c4"/><stop offset=".45" stop-color="#e8b9a6"/><stop offset="1" stop-color="#4b4468"/></radialGradient>
      <linearGradient id="na-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4e6"/><stop offset="1" stop-color="#ffc9a6"/></linearGradient>
      <filter id="na-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <rect width="480" height="360" fill="url(#na-glow)"/>
    <ellipse cx="240" cy="150" rx="130" ry="100" fill="#fff1dc" opacity=".55" filter="url(#na-blur)"/>
    <path d="M186 80 H294 L330 176 H150Z" fill="url(#na-shade)"/>
    <path d="M150 176 H330" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="232" y="176" width="16" height="80" rx="8" fill="#3b3556" opacity=".7"/>
    <ellipse cx="240" cy="268" rx="62" ry="16" fill="#3b3556" opacity=".75"/>
    <text x="240" y="330" text-anchor="middle" ${SOFT} font-size="15" fill="#fff" opacity=".7">Nana</text>
  </svg>`,

  milk: `
  <svg viewBox="0 0 480 360" role="img" aria-label="A small glass bottle of warm milk">
    <defs>
      <radialGradient id="mk-bg" cx=".5" cy=".6" r=".8"><stop offset="0" stop-color="#fff5ee"/><stop offset="1" stop-color="#dcd8f4"/></radialGradient>
      <linearGradient id="mk-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".6"/></linearGradient>
      <linearGradient id="mk-milk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#f1e6dc"/></linearGradient>
      <filter id="mk-b"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <rect width="480" height="360" fill="url(#mk-bg)"/>
    <path d="M226 42 C214 22 238 14 228 -4 M254 44 C244 26 266 18 256 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8" filter="url(#mk-b)"/>
    <rect x="212" y="54" width="56" height="22" rx="8" fill="#f2a7a0"/>
    <path d="M218 76 H262 V104 Q300 118 300 160 V288 Q300 314 274 314 H206 Q180 314 180 288 V160 Q180 118 218 104Z" fill="url(#mk-milk)"/>
    <path d="M218 76 H262 V104 Q300 118 300 160 V288 Q300 314 274 314 H206 Q180 314 180 288 V160 Q180 118 218 104Z" fill="url(#mk-glass)" stroke="#fff" stroke-width="3"/>
    <path d="M196 170 V290" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".85"/>
    ${[190, 220, 250].map((y) => `<path d="M270 ${y} h16" stroke="#c9bfd8" stroke-width="3" stroke-linecap="round"/>`).join('')}
  </svg>`,

  crib: `
  <svg viewBox="0 0 480 360" role="img" aria-label="The faint outline of a crib, almost gone">
    <defs>
      <linearGradient id="cr-fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#23213a" stop-opacity=".35"/><stop offset=".6" stop-color="#23213a" stop-opacity=".12"/><stop offset="1" stop-color="#23213a" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="480" height="360" fill="#f6f7fb"/>
    <g fill="none" stroke="url(#cr-fade)" stroke-width="4" stroke-linecap="round">
      <path d="M100 120 V300 M380 120 V300 M100 150 H380 M100 270 H380"/>
      ${Array.from({ length: 11 }, (_, i) => `<path d="M${124 + i * 22} 150 V270"/>`).join('')}
      <path d="M240 40 V80 M200 80 H280"/>
      <circle cx="206" cy="98" r="8"/><circle cx="240" cy="104" r="8"/><circle cx="274" cy="98" r="8"/>
    </g>
  </svg>`,
};
