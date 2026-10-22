/* ==================================================================
   Eye zoom — do hero até a seção Sobre, passando pela pupila.

   Linha do tempo (p = progresso da rolagem dentro de .zoom, 0 → 1):
     0.00–0.10  textos do hero saem, rabiscos "desenrolam"
     0.04–0.50  o retrato amplia na direção da pupila (escala exponencial);
                uma íris estilizada (rabiscos na paleta) e a pupila assumem
     0.50–0.95  túnel de anéis rabiscados vindo na direção da tela;
                o portal no centro abre e revela a seção Sobre
     0.95–1.00  pausa com o portal aberto; depois a página segue normal
   ================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const zoom = document.querySelector('[data-zoom]');
  if (!zoom || !window.Squiggle) return;

  const stage = zoom.querySelector('[data-zoom-stage]');
  const photo = zoom.querySelector('[data-zoom-photo]');
  const img = photo.querySelector('img');
  const iris = zoom.querySelector('[data-zoom-iris]');
  const pupil = zoom.querySelector('[data-zoom-pupil]');
  const tunnel = zoom.querySelector('[data-zoom-tunnel]');
  const portal = zoom.querySelector('[data-zoom-portal]');
  const portalSquiggles = portal.querySelectorAll('[data-draw="portal"]');
  const fades = zoom.querySelectorAll('[data-hero-fade]');
  const nav = document.querySelector('[data-nav]');

  // Cada fita colorida ganha uma cópia branca e mais grossa por baixo:
  // é a "borda" que separa as fitas dos rabiscos fantasma, como no protótipo.
  // Fita e borda compartilham o mesmo índice para se desenharem juntas.
  const heroPaths = [];
  zoom.querySelectorAll('[data-hero-squiggles]').forEach((svg) => {
    svg.querySelectorAll('path.rb').forEach((path, i) => {
      path.dataset.order = i;
      if (!path.classList.contains('rb--ghost')) {
        const halo = path.cloneNode(false);
        halo.setAttribute('class', 'rb rb--halo');
        path.before(halo);
        heroPaths.push(halo);
      }
      heroPaths.push(path);
    });
  });

  // Olho esquerdo (da foto) em pixels da imagem original retrato.webp (1080 × 1080)
  const EYE = { x: 512, y: 322, iris: 13, pupil: 5.2 };

  const PALETTE = ['#F1913D', '#DF98F2', '#367FBE', '#F2380F', '#F2D6BE'];

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const range = (a, b, v) => clamp((v - a) / (b - a));
  const smooth = (v) => v * v * (3 - 2 * v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = (v) => 1 - Math.pow(1 - v, 3);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- Desenho de entrada dos rabiscos do hero ----------
  // Roda mesmo sem o zoom; o zoom só multiplica pelo "desenrolar".
  let intro = reduceMotion.matches ? 1 : 0;
  let unwind = 0;
  const STAGGER = 0.08;
  const lastOrder = Math.max(0, ...heroPaths.map((p) => +p.dataset.order));
  function paintHeroSquiggles() {
    heroPaths.forEach((path) => {
      const local = clamp(intro * (1 + lastOrder * STAGGER) - path.dataset.order * STAGGER);
      Squiggle.setDraw(path, easeOut(local) * (1 - unwind));
    });
  }
  if (!reduceMotion.matches) {
    const start = performance.now();
    (function tick(now) {
      intro = clamp((now - start) / 2200);
      paintHeroSquiggles();
      if (intro < 1) requestAnimationFrame(tick);
    })(start);
  } else {
    paintHeroSquiggles();
  }

  // O zoom precisa de movimento liberado e de uma tela com altura mínima
  function canZoom() {
    return !reduceMotion.matches && window.innerHeight >= 480;
  }
  if (!canZoom()) return;

  // ---------- Íris: fibras radiais rabiscadas na paleta ----------
  (function buildIris() {
    const NS = 'http://www.w3.org/2000/svg';
    const rnd = Squiggle.random(42);
    const make = (tag, attrs) => {
      const el = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      iris.appendChild(el);
      return el;
    };
    make('circle', { r: 99, fill: '#367FBE' });
    make('circle', { r: 70, fill: '#F1913D', opacity: 0.85 });
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2 + rnd() * 0.05;
      const pts = [];
      for (let j = 0; j <= 8; j++) {
        const r = 40 + (58 * j) / 8;
        const wob = Math.sin(j * 1.7 + i) * 0.06 + (rnd() - 0.5) * 0.04;
        pts.push([Math.cos(a + wob) * r, Math.sin(a + wob) * r]);
      }
      make('path', {
        d: Squiggle.toPath(pts),
        fill: 'none',
        stroke: PALETTE[i % 4 === 0 ? 4 : i % 3 === 0 ? 1 : i % 2 === 0 ? 3 : 0],
        'stroke-width': 1.6 + rnd() * 1.4,
        'stroke-linecap': 'round',
        opacity: 0.9
      });
    }
    make('path', { d: Squiggle.wobblyCircle(98, 5, 0.015), fill: 'none', stroke: '#1C1714', 'stroke-width': 3 });
    make('path', { d: Squiggle.wobblyCircle(44, 9, 0.04), fill: 'none', stroke: '#F2380F', 'stroke-width': 3 });
  })();

  // ---------- Túnel: anéis rabiscados (cada anel = 3 traços) ----------
  const RINGS = 9;
  const rings = [];
  (function buildTunnel() {
    const NS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < RINGS; i++) {
      const g = document.createElementNS(NS, 'g');
      for (let s = 0; s < 3; s++) {
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', Squiggle.wobblyCircle(40 + s * 2.2, i * 7 + s, 0.05 + s * 0.015));
        p.setAttribute('stroke', PALETTE[(i + s) % 4]);
        p.setAttribute('stroke-width', s === 0 ? 2.4 : 1.2);
        p.setAttribute('opacity', s === 0 ? 1 : 0.7);
        g.appendChild(p);
      }
      tunnel.appendChild(g);
      rings.push(g);
    }
  })();

  root.classList.add('zoom-on');

  // ---------- Medidas ----------
  let vw, vh, diag, box, P, irisR, pupilR, sMax;

  function parsePosition(value) {
    const parts = (value || '50% 50%').split(' ');
    const pct = (s) => (s && s.endsWith('%') ? parseFloat(s) / 100 : 0.5);
    return [pct(parts[0]), pct(parts[1])];
  }

  function measure() {
    photo.style.transform = '';
    const sr = stage.getBoundingClientRect();
    const fr = photo.getBoundingClientRect();
    const ir = img.getBoundingClientRect();
    vw = sr.width;
    vh = sr.height;
    diag = Math.hypot(vw, vh);
    box = { x: fr.left - sr.left, y: fr.top - sr.top };

    // object-fit: cover → onde a pupila cai dentro da caixa da imagem
    const natW = img.naturalWidth || 1080, natH = img.naturalHeight || 1080;
    const k = Math.max(ir.width / natW, ir.height / natH);
    const [px, py] = parsePosition(getComputedStyle(img).objectPosition);
    const ox = (ir.width - natW * k) * px + (ir.left - fr.left);
    const oy = (ir.height - natH * k) * py + (ir.top - fr.top);
    P = { x: ox + EYE.x * k, y: oy + EYE.y * k };
    irisR = EYE.iris * k;
    pupilR = EYE.pupil * k;
    sMax = ((diag / 2) * 1.1) / pupilR; // a pupila cobre a tela inteira
  }

  // ---------- Quadro a quadro ----------
  let lastP = -1;

  function update() {
    const r = zoom.getBoundingClientRect();
    const total = r.height - vh;
    const p = clamp(-r.top / total);
    if (p === lastP) return;
    lastP = p;

    // 1) textos e rabiscos do hero
    const fade = smooth(range(0, 0.09, p));
    fades.forEach((el, i) => {
      el.style.opacity = String(1 - fade);
      el.style.transform = fade ? `translate3d(0, ${-fade * (30 + i * 12)}px, 0)` : '';
    });
    unwind = smooth(range(0, 0.14, p));
    paintHeroSquiggles();

    // 2) zoom no retrato, mirando a pupila
    const z = smooth(range(0.04, 0.5, p));
    const s = Math.exp(Math.log(sMax) * z);
    const m = easeOut(range(0, 0.5, z));
    const Tx = lerp(box.x + P.x, vw / 2, m);
    const Ty = lerp(box.y + P.y, vh / 2, m);
    const done = z >= 1;
    photo.style.transform = z > 0
      ? `translate3d(${Tx - box.x - P.x * s}px, ${Ty - box.y - P.y * s}px, 0) scale(${s})`
      : '';
    photo.style.visibility = done ? 'hidden' : '';
    photo.style.boxShadow = z > 0.02 ? 'none' : '';

    const irisScale = (irisR * s) / 98;
    const irisAlpha = range(0.26, 0.5, z);
    iris.style.opacity = irisR * s > diag * 4 ? '0' : String(irisAlpha);
    iris.style.transform = `translate3d(${Tx}px, ${Ty}px, 0) scale(${irisScale}) rotate(${z * 70}deg)`;

    pupil.style.opacity = String(range(0.22, 0.42, z));
    pupil.style.transform = `translate3d(${Tx}px, ${Ty}px, 0) scale(${(pupilR * s) / 50})`;

    // 3) túnel de anéis + portal
    const t = range(0.5, 0.95, p);
    const tunnelAlpha = smooth(range(0, 0.1, t)) * (1 - smooth(range(0.82, 1, t)));
    tunnel.style.opacity = String(tunnelAlpha);
    if (tunnelAlpha > 0) {
      rings.forEach((g, i) => {
        const u = (i / RINGS + t * 1.5) % 1;
        const scale = 0.03 * Math.pow(140, u);
        const alpha = smooth(range(0, 0.18, u)) * (1 - smooth(range(0.82, 1, u)));
        const rot = (i % 2 ? 1 : -1) * (t * 220 + i * 37);
        g.setAttribute('transform', `rotate(${rot.toFixed(2)}) scale(${scale.toFixed(4)})`);
        g.setAttribute('opacity', alpha.toFixed(3));
      });
    }

    const open = smooth(range(0.22, 0.9, t));
    if (open <= 0) {
      portal.style.visibility = 'hidden';
    } else {
      portal.style.visibility = 'visible';
      portal.style.clipPath = open >= 1 ? 'none' : `circle(${(open * (diag / 2 + 8)).toFixed(1)}px at 50% 50%)`;
    }
    portalSquiggles.forEach((path) => Squiggle.setDraw(path, range(0.75, 1, t)));

    // a navegação some durante a travessia
    if (nav) nav.classList.toggle('is-hidden', p > 0.03 && p < 0.97);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  }

  function refresh() {
    measure();
    lastP = -1;
    update();
  }

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (!canZoom()) {
      // a tela ficou baixa demais: volta para o fluxo normal
      root.classList.remove('zoom-on');
      [photo, iris, pupil, portal, ...fades].forEach((el) => el.removeAttribute('style'));
      window.removeEventListener('scroll', onScroll);
      unwind = 0;
      paintHeroSquiggles();
      return;
    }
    refresh();
  });
  if (!img.complete) img.addEventListener('load', refresh, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
})();
