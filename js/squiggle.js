/* ==================================================================
   Squiggle — gera os rabiscos com laços da identidade visual.

   Cada <path data-sq="loops:4;ratio:2;wave:.3;seed:7"> vira uma
   trocoide prolata (a curva de um ponto fora de uma roda que gira):
   quando o raio do ponto é maior que o da roda, a curva faz laços —
   exatamente o desenho das fitas da referência.

   Atributos:
     data-sq      parâmetros da curva
     data-box     "x y w h" onde a curva é encaixada (no viewBox do SVG).
                  Se o <svg> tem data-responsive, os valores são frações
                  do tamanho real do SVG e o viewBox acompanha o layout.
     data-box-sm  mesmo que data-box, para telas < 900px
     data-rot     rotação em graus
     data-fit     "contain" (padrão) ou "fill" (estica para o box)
   ================================================================== */
(function () {
  'use strict';

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function parseSpec(str) {
    const spec = { loops: 4, ratio: 2, wave: 0.3, seed: 1 };
    (str || '').split(';').forEach((pair) => {
      const [k, v] = pair.split(':');
      if (k && v !== undefined) spec[k.trim()] = parseFloat(v);
    });
    return spec;
  }

  // Pontos da trocoide com variação "à mão" no tamanho dos laços e uma onda lenta
  function trochoid({ loops, ratio, wave, seed }) {
    const rnd = mulberry32(seed * 9973 + 17);
    const phase = rnd() * Math.PI * 2;
    const freq = 0.5 + rnd() * 0.8;
    const t0 = -Math.PI * 0.7;
    const t1 = loops * Math.PI * 2 + Math.PI * 0.7;
    const steps = Math.round(loops * 26 + 10);
    const pts = [];

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const t = t0 + (t1 - t0) * u;
      const b = ratio * (0.78 + 0.32 * Math.sin(u * Math.PI * 2 * freq + phase));
      const x = t - b * Math.sin(t);
      const y = -b * Math.cos(t) + wave * ratio * 3 * Math.sin(u * Math.PI * 2 * freq * 0.6 + phase * 1.3);
      pts.push([x, y]);
    }
    return pts;
  }

  function rotate(pts, deg) {
    const r = (deg * Math.PI) / 180;
    const c = Math.cos(r), s = Math.sin(r);
    return pts.map(([x, y]) => [x * c - y * s, x * s + y * c]);
  }

  function fit(pts, box, mode) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(([x, y]) => {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    });
    const w = maxX - minX || 1, h = maxY - minY || 1;
    let sx = box.w / w, sy = box.h / h;
    if (mode !== 'fill') sx = sy = Math.min(sx, sy);
    const ox = box.x + (box.w - w * sx) / 2;
    const oy = box.y + (box.h - h * sy) / 2;
    return pts.map(([x, y]) => [ox + (x - minX) * sx, oy + (y - minY) * sy]);
  }

  // Catmull-Rom -> Bézier cúbica: curva suave passando por todos os pontos
  function toPath(pts) {
    const f = (n) => Math.round(n * 10) / 10;
    let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += `C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  }

  const small = window.matchMedia('(max-width: 899.98px)');

  function readBox(path, svg) {
    const raw = (small.matches && path.dataset.boxSm) || path.dataset.box || '0 0 100 100';
    let [x, y, w, h] = raw.trim().split(/\s+/).map(Number);
    if (svg.hasAttribute('data-responsive')) {
      const W = svg.clientWidth || 1, H = svg.clientHeight || 1;
      x *= W; w *= W; y *= H; h *= H;
    }
    return { x, y, w, h };
  }

  function buildPath(path) {
    const svg = path.ownerSVGElement;
    if (!svg) return;
    if (svg.hasAttribute('data-responsive')) {
      svg.setAttribute('viewBox', `0 0 ${svg.clientWidth || 1} ${svg.clientHeight || 1}`);
    }
    const pts = fit(
      rotate(trochoid(parseSpec(path.dataset.sq)), parseFloat(path.dataset.rot) || 0),
      readBox(path, svg),
      path.dataset.fit
    );
    path.setAttribute('d', toPath(pts));
    path.setAttribute('pathLength', '1');
  }

  function build(root) {
    (root || document).querySelectorAll('path[data-sq]').forEach(buildPath);
  }

  // 0 = escondido, 1 = desenhado por completo
  function setDraw(path, p) {
    const v = Math.max(0, Math.min(1, p));
    path.style.strokeDashoffset = String(1 - v);
    // um traço de comprimento zero ainda desenha a ponta arredondada: esconde
    path.style.visibility = v < 0.002 ? 'hidden' : '';
  }

  // Caminho fechado e "tremido" (para os anéis do túnel e a íris)
  function wobblyCircle(r, seed, amount) {
    const rnd = mulberry32(seed * 7919 + 3);
    const k1 = 3 + Math.floor(rnd() * 4), k2 = 7 + Math.floor(rnd() * 5);
    const p1 = rnd() * 6.28, p2 = rnd() * 6.28;
    const n = 72, pts = [];
    for (let i = 0; i <= n + 2; i++) {
      const a = (i / n) * Math.PI * 2;
      const rr = r * (1 + amount * (0.6 * Math.sin(k1 * a + p1) + 0.4 * Math.sin(k2 * a + p2)));
      pts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
    }
    return toPath(pts);
  }

  window.Squiggle = { build, buildPath, setDraw, toPath, wobblyCircle, random: mulberry32 };

  build();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.querySelectorAll('svg[data-responsive] path[data-sq]').forEach(buildPath);
      document.querySelectorAll('path[data-sq][data-box-sm]').forEach(buildPath);
    }, 150);
  });
})();
