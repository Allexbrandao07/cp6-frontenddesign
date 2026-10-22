/* ==================================================================
   Eye zoom — do hero até a seção Sobre, passando pela pupila.

   Linha do tempo (p = progresso da rolagem enquanto o palco está preso):
     0.00–0.10  textos do hero saem, as fitas "desenrolam"
     0.04–0.50  o retrato amplia na direção da pupila (escala exponencial);
                uma íris minimalista, com as cores e o reflexo do meu olho
                na foto, assume quando a imagem real já estaria borrada
     0.50–0.95  túnel de anéis rabiscados vindo na direção da tela;
                o portal no centro abre e revela a seção Sobre
     0.95–1.00  pausa com o portal aberto; depois a página segue normal
   ================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const zoom = document.querySelector('[data-zoom]');
  if (!zoom || !window.Squiggle) return;

  const NS = 'http://www.w3.org/2000/svg';
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

  // Olho esquerdo (da foto) em pixels da imagem retrato.webp (1080 × 1080):
  // posição e proporção íris/pupila medidas na foto
  const EYE = { x: 512, y: 322, iris: 10.5, pupil: 4.4 };
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
  paintHeroSquiggles();
  if (!reduceMotion.matches) {
    // começa quando o preloader sai (js/loader.js), junto com a queda das letras
    (window.pageReady || Promise.resolve()).then(() => {
      const start = performance.now();
      (function tick(now) {
        intro = clamp((now - start) / 2200);
        paintHeroSquiggles();
        if (intro < 1) requestAnimationFrame(tick);
      })(start);
    });
  }

  // O efeito precisa de movimento liberado e de uma tela com altura mínima
  function canZoom() {
    return !reduceMotion.matches && window.innerHeight >= 480;
  }
  if (reduceMotion.matches) return;

  const make = (parent, tag, attrs) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
    parent.appendChild(el);
    return el;
  };

  // =================================================================
  // ÍRIS — minimalista, desenhada a partir do meu olho na foto
  // (viewBox -100 -100 200 200; raio 98 = borda da íris)
  // =================================================================
  // Círculos concêntricos chapados, um por cor da paleta, de fora para dentro.
  // A pupila (preta, .zoom__pupil) ocupa o centro: raio ≈ 41 = 98 × 4.4 / 10.5.
  (function buildIris() {
    const IRIS_RINGS = [
      { r: 98, fill: '#367FBE' }, // azul
      { r: 83, fill: '#DF98F2' }, // lilás
      { r: 68, fill: '#F1913D' }, // laranja
      { r: 54, fill: '#F2380F' }  // vermelho-alaranjado
    ];
    IRIS_RINGS.forEach(({ r, fill }) => make(iris, 'circle', { r, fill }));
    // contorno preto, como o da foto e das letras
    make(iris, 'circle', { r: 98, fill: 'none', stroke: '#000000', 'stroke-width': 2 });
  })();

  // ---------- Túnel: anéis rabiscados (cada anel = 3 traços) ----------
  const RINGS = 9;
  const rings = [];
  (function buildTunnel() {
    for (let i = 0; i < RINGS; i++) {
      const g = make(tunnel, 'g');
      for (let k = 0; k < 3; k++) {
        make(g, 'path', {
          d: Squiggle.wobblyCircle(40 + k * 2.2, i * 7 + k, 0.05 + k * 0.015),
          stroke: PALETTE[(i + k) % 4],
          'stroke-width': k === 0 ? 2.4 : 1.2,
          opacity: k === 0 ? 1 : 0.7
        });
      }
      rings.push(g);
    }
  })();

  // ---------- Medidas ----------
  // vw/vh: área visível. fxTop: quanto o palco é mais alto que a tela (só
  // acontece com zoom no navegador); o palco rola isso antes de prender.
  let vw, vh, diag, box, P, irisR, pupilR, sMax, fxTop, pinLength;

  function parsePosition(value) {
    const parts = (value || '50% 50%').split(' ');
    const pct = (v) => (v && v.endsWith('%') ? parseFloat(v) / 100 : 0.5);
    return [pct(parts[0]), pct(parts[1])];
  }

  function measure() {
    photo.style.transform = '';
    vw = document.documentElement.clientWidth;
    vh = window.innerHeight;
    diag = Math.hypot(vw, vh);

    // pista = altura do palco + a travessia; o palco prende alinhado pela base
    const stageH = stage.offsetHeight;
    fxTop = Math.max(0, stageH - vh);
    pinLength = vh * 3.2;
    stage.style.top = `${-fxTop}px`;
    zoom.style.height = `${stageH + pinLength}px`;

    const sr = stage.getBoundingClientRect();
    const fr = photo.getBoundingClientRect();
    const ir = img.getBoundingClientRect();
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
    const p = clamp((-r.top - fxTop) / pinLength);
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
    const Ty = lerp(box.y + P.y, fxTop + vh / 2, m); // centro da área visível
    const fy = Ty - fxTop; // o mesmo ponto nas coordenadas da camada de efeitos
    photo.style.transform = z > 0
      ? `translate3d(${Tx - box.x - P.x * s}px, ${Ty - box.y - P.y * s}px, 0) scale(${s})`
      : '';
    photo.style.visibility = z >= 1 ? 'hidden' : '';
    photo.style.boxShadow = z > 0.02 ? 'none' : '';

    // a íris assume quando a foto ampliada começaria a borrar (sem girar:
    // o reflexo de luz fica parado, como num olho de verdade)
    const irisScale = (irisR * s) / 98;
    iris.style.opacity = irisR * s > diag * 4 ? '0' : String(range(0.22, 0.42, z));
    iris.style.transform = `translate3d(${Tx}px, ${fy}px, 0) scale(${irisScale})`;

    pupil.style.opacity = String(range(0.2, 0.38, z));
    pupil.style.transform = `translate3d(${Tx}px, ${fy}px, 0) scale(${(pupilR * s) / 50})`;

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

  // Liga/desliga o efeito conforme a tela (o zoom do navegador muda a altura
  // útil: com muito zoom a cena volta ao fluxo normal, e volta ao tirar o zoom)
  let on = false;
  function enable() {
    on = true;
    root.classList.add('zoom-on');
    window.addEventListener('scroll', onScroll, { passive: true });
    refresh();
  }
  function disable() {
    on = false;
    root.classList.remove('zoom-on');
    [zoom, stage, photo, iris, pupil, tunnel, portal, ...fades].forEach((el) => el.removeAttribute('style'));
    window.removeEventListener('scroll', onScroll);
    if (nav) nav.classList.remove('is-hidden');
    unwind = 0;
    paintHeroSquiggles();
  }

  if (canZoom()) enable();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!canZoom()) { if (on) disable(); return; }
      if (!on) enable(); else refresh();
    }, 100);
  });
  if (!img.complete) img.addEventListener('load', () => on && refresh(), { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => on && refresh());
})();
