/* ==================================================================
   Interações gerais: navegação, revelação no scroll, rabiscos que se
   desenham com a rolagem, fitas, galerias, visualizador, gráfico KNN
   e a rolagem horizontal da seção "Fora do código".
   ================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const motion = root.classList.contains('motion');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // ---------- Navegação ----------
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Fechar menu' : 'Abrir menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // Recarregar a página sempre abre no hero: o navegador não restaura a rolagem
  // e a âncora (#sobre, #projetos…) é descartada. Link direto com âncora
  // (navegação normal, não reload) continua indo para a seção.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const nav0 = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  const isReload = (nav0 && nav0.type === 'reload') ||
    (!nav0 && performance.navigation && performance.navigation.type === 1);
  if (isReload) {
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);
  }

  // #sobre mora dentro do palco do zoom: com o zoom ligado, a âncora levaria ao hero.
  // Leva ao fim da pista, onde o portal já está todo aberto.
  document.querySelectorAll('a[href="#sobre"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const zoom = document.querySelector('[data-zoom]');
      if (!root.classList.contains('zoom-on') || !zoom) return;
      e.preventDefault();
      const top = zoom.getBoundingClientRect().top + window.scrollY + zoom.offsetHeight - window.innerHeight;
      window.scrollTo({ top, behavior: motion ? 'smooth' : 'auto' });
    });
  });
  if (location.hash === '#sobre') {
    window.addEventListener('load', () => {
      const zoom = document.querySelector('[data-zoom]');
      if (!root.classList.contains('zoom-on') || !zoom) return;
      window.scrollTo(0, zoom.offsetTop + zoom.offsetHeight - window.innerHeight);
    });
  }

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.nav__menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // ---------- Revelação ----------
  const revealables = document.querySelectorAll('[data-reveal]');
  if (motion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  // ---------- Ferramentas: adesivos presos numa fita com laços ----------
  // A fita serpenteia em 4 fileiras (ida e volta), dando um laço em cada
  // virada, como as fitas do hero. A rolagem desenha a fita e cada adesivo
  // "gruda" quando o traço passa por ele.
  const belt = document.querySelector('[data-toolbelt]');
  const beltPaths = belt ? Array.from(belt.querySelectorAll('[data-toolbelt-path]')) : [];
  const beltTools = belt ? Array.from(belt.querySelectorAll('.tool')) : [];
  let beltMarks = []; // em que fração da fita cada adesivo fica

  // Virada com laço: o traço sai na horizontal, gira 540° (meia-volta + um
  // laço completo) e volta na horizontal, na direção oposta. A direção é
  // integrada passo a passo; depois as pontas são ajustadas para sair em
  // (0, 0) e chegar em (0, 1) — y em fração da distância entre as fileiras.
  function loopTurn(width) {
    const N = 48;
    const raw = [[0, 0]];
    let x = 0, y = 0;
    for (let i = 1; i <= N; i++) {
      const s = (i - 0.5) / N;
      // gira mais devagar nas pontas e mais rápido no meio: o laço fica no meio
      const phi = Math.PI * 3 * (s - Math.sin(Math.PI * 2 * s) / (Math.PI * 2) * 0.55);
      x += Math.cos(phi);
      y += Math.sin(phi);
      raw.push([x, y]);
    }
    const [ex, ey] = raw[N];
    const fixed = raw.map(([px, py], i) => [px - (ex * i) / N, py / ey]);
    const maxX = Math.max(...fixed.map((p) => Math.abs(p[0]))) || 1;
    return fixed.slice(1).map(([px, py]) => [(px / maxX) * width, py]);
  }

  function buildBelt() {
    if (!belt) return;
    const COLS = 4, ROWS = Math.ceil(beltTools.length / COLS);
    const W = belt.clientWidth;
    const R = Math.min(36, (W / COLS) * 0.36);   // raio do adesivo
    const padX = R + 10;
    const rowGap = R * 2 + Math.max(26, R);
    const top = R + 18;
    const H = top + (ROWS - 1) * rowGap + R + 18;
    const span = (W - padX * 2) / COLS;
    const wave = (x, r) => Math.sin((x / W) * Math.PI * 3 + r * 1.7) * R * 0.28;

    const pts = [];
    const marks = [];
    let cum = 0;
    const push = (x, y) => {
      const last = pts[pts.length - 1];
      if (last) cum += Math.hypot(x - last[0], y - last[1]);
      pts.push([x, y]);
    };

    for (let r = 0; r < ROWS; r++) {
      const y = top + r * rowGap;
      const ltr = r % 2 === 0;
      const x0 = ltr ? padX * 0.4 : W - padX * 0.4;
      const x1 = ltr ? W - padX * 0.4 : padX * 0.4;
      const steps = 28;
      const order = [];
      for (let c = 0; c < COLS; c++) order.push(ltr ? c : COLS - 1 - c);
      for (let k = 0; k <= steps; k++) {
        const x = x0 + ((x1 - x0) * k) / steps;
        push(x, y + wave(x, r));
        // registra a posição dos adesivos desta fileira quando o traço passa por eles
        order.forEach((c) => {
          const cx = padX + span * (c + 0.5);
          const idx = r * COLS + c;
          if (idx < beltTools.length && marks[idx] === undefined && (ltr ? x >= cx : x <= cx)) {
            marks[idx] = { cum, x: cx, y: y + wave(cx, r) };
          }
        });
      }
      // laço na virada para a próxima fileira
      if (r < ROWS - 1) {
        const yN = top + (r + 1) * rowGap;
        const sy = y + wave(x1, r), ey = yN + wave(x1, r + 1);
        const out = ltr ? 1 : -1;
        loopTurn(Math.min(rowGap * 0.62, padX + 14))  // o laço cabe na margem.forEach(([lx, ly]) => push(x1 + out * lx, sy + ly * (ey - sy)));
      }
    }

    belt.style.height = `${H}px`;
    belt.style.setProperty('--r', `${R}px`);
    const svg = belt.querySelector('svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const d = Squiggle.toPath(pts);
    beltPaths.forEach((path) => { path.setAttribute('d', d); path.setAttribute('pathLength', '1'); });

    beltMarks = marks.map((m) => m.cum / cum);
    beltTools.forEach((tool, i) => {
      tool.style.left = `${marks[i].x}px`;
      tool.style.top = `${marks[i].y}px`;
      tool.style.setProperty('--rot', `${((i * 37) % 24) - 12}deg`); // inclinação "à mão"
    });
  }

  // ---------- Fitas das seções (Projetos à esquerda, Trajetória à direita) ----------
  // Cada [data-trail-section] tem uma fita que desce pela margem com laços
  // (uma trocoide vertical), é desenhada até a altura da rolagem e, se a
  // seção tiver projetos, assume a cor (--accent) do projeto na tela.
  // data-trail-side="right" espelha a fita para a margem direita.
  function makeTrail(section) {
    const svg = section.querySelector('[data-trail]');
    const paths = Array.from(svg.querySelectorAll('[data-trail-path]'));
    const tip = svg.querySelector('[data-trail-tip]');
    const content = section.querySelector('[data-trail-content]');
    const stop = section.querySelector('[data-trail-stop]');
    const projects = Array.from(section.querySelectorAll('.project'));
    const right = section.dataset.trailSide === 'right';
    let pts = [], cum = [], maxY = [], total = 1;

    function build() {
      const W = section.clientWidth;
      const H = section.clientHeight - (stop ? stop.offsetHeight : 0); // não invade a prévia da próxima seção
      const cs = getComputedStyle(content);
      // margem livre do lado da fita
      const margin = right
        ? W - (content.offsetLeft + content.offsetWidth - parseFloat(cs.paddingRight))
        : content.offsetLeft + parseFloat(cs.paddingLeft);
      const thin = margin < 90; // telas estreitas: fita fina, só ondulada, colada na borda
      section.classList.toggle('is-thin-trail', thin);

      const railW = thin ? 34 : Math.min(margin - 16, 420);
      // a fita corre perto do conteúdo, como no protótipo
      const near = thin ? railW / 2 + 4 : margin - 16 - railW / 2;
      const cx = right ? W - near : near;
      const b = thin ? 9 : railW * 0.4;               // meia largura dos laços
      const a = thin ? 70 : b / 1.35;                 // b > a → a curva faz laços
      const rnd = Squiggle.random(right ? 31 : 13);
      const phase = rnd() * 6.28;
      const dir = right ? -1 : 1;

      // data-trail-start="cap": a fita começa dentro da seção, com a ponta
      // arredondada visível (sem "nascer" de uma linha preta, como em Projetos)
      const cap = section.dataset.trailStart === 'cap';
      pts = [];
      for (let t = 0; ; t += 0.08) {
        // trocoide vertical com variação "à mão" no tamanho de cada laço
        const k = thin ? 1 : 0.82 + 0.25 * Math.sin(t * 0.37 + phase);
        const y = a * t - (thin ? 0 : b * k * Math.sin(t)) + 2;
        const x = cx - dir * (b * k * Math.cos(t) - Math.sin(t * 0.21 + phase) * (thin ? 0 : railW * 0.06));
        pts.push([x, y]);
        if (y > H - 30) break;
      }
      if (cap) {
        // começa no ponto mais alto do primeiro laço (onde a curva já desce)
        let top = 0;
        for (let i = 1; i < Math.min(pts.length, 90); i++) if (pts[i][1] < pts[top][1]) top = i;
        const dy = 36 - pts[top][1];
        pts = pts.slice(top).map(([x, y]) => [x, y + dy]).filter(([, y]) => y <= H - 30);
      }
      cum = [0];
      maxY = [pts[0][1]];
      for (let i = 1; i < pts.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
        maxY.push(Math.max(maxY[i - 1], pts[i][1]));
      }
      total = cum[cum.length - 1] || 1;

      svg.setAttribute('viewBox', `0 0 ${W} ${section.clientHeight}`);
      const d = Squiggle.toPath(pts);
      paths.forEach((path) => { path.setAttribute('d', d); path.setAttribute('pathLength', '1'); });
      section.style.setProperty('--trail-w', `${thin ? 10 : Math.max(14, Math.min(30, railW * 0.11))}px`);
    }

    function draw() {
      if (!pts.length) return;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // até onde desenhar: a "ponta" acompanha uma linha a 78% da tela
      let i = pts.length - 1;
      if (motion) {
        const targetY = vh * 0.78 - r.top;
        let lo = 0, hi = pts.length - 1;
        while (lo < hi) { // último ponto cuja altura máxima até ali não passa da linha
          const mid = (lo + hi + 1) >> 1;
          if (maxY[mid] <= targetY) lo = mid; else hi = mid - 1;
        }
        i = targetY <= 0 ? 0 : lo;
      }
      const p = cum[i] / total;
      paths.forEach((path) => Squiggle.setDraw(path, p));
      if (tip) {
        tip.setAttribute('cx', pts[i][0].toFixed(1));
        tip.setAttribute('cy', pts[i][1].toFixed(1));
        tip.style.visibility = p > 0.002 && p < 0.998 ? '' : 'hidden';
      }

      // cor: o projeto que cruza a linha de 55% da tela (antes do 1º: o 1º; depois do último: o último)
      if (!projects.length) return;
      let active = projects[0];
      projects.forEach((proj) => { if (proj.getBoundingClientRect().top < vh * 0.55) active = proj; });
      if (active !== section._active) {
        section._active = active;
        section.style.setProperty('--trail', getComputedStyle(active).getPropertyValue('--accent').trim());
      }
    }

    return { section, build, draw };
  }

  const trails = Array.from(document.querySelectorAll('[data-trail-section]')).map(makeTrail);
  const buildTrails = () => trails.forEach((t) => t.build());
  const drawTrails = () => trails.forEach((t) => t.draw());

  function drawBelt() {
    if (!belt) return;
    let p = 1;
    if (motion) {
      const r = belt.getBoundingClientRect();
      const vh = window.innerHeight;
      p = clamp((vh * 0.88 - r.top) / (r.height * 0.95));
    }
    beltPaths.forEach((path) => Squiggle.setDraw(path, p));
    beltTools.forEach((tool, i) => tool.classList.toggle('is-on', p >= beltMarks[i] - 0.01));
  }

  // ---------- Rabiscos desenhados pela rolagem ----------
  // "scroll": desenha enquanto entra na tela; "long": acompanha a seção inteira;
  // data-draw-span="section": acompanha a seção inteira e fica completo quando ela
  // encosta no topo da tela (seções no fim da página, que não rolam muito);
  // "portal": igual a "scroll" quando o zoom está desligado (senão o eye-zoom cuida).
  const drawn = Array.from(document.querySelectorAll('path[data-draw]'));

  function drawOnScroll() {
    const vh = window.innerHeight;
    const zoomOn = root.classList.contains('zoom-on');
    // no fim da página não dá mais para rolar: o que estiver visível se completa
    const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
    drawn.forEach((path) => {
      if (path.dataset.draw === 'portal' && zoomOn) return;
      const svg = path.ownerSVGElement;
      const r = svg.getBoundingClientRect();
      let p;
      if (atBottom && r.top < vh) {
        p = 1;
      } else if (path.dataset.drawSpan === 'long') {
        p = (vh * 0.75 - r.top) / Math.max(r.height, 1);
      } else if (path.dataset.drawSpan === 'section') {
        const sec = path.closest('section').getBoundingClientRect();
        p = 1 - sec.top / (vh * 0.7);
      } else {
        p = (vh - r.top) / (vh * 0.55);
      }
      Squiggle.setDraw(path, clamp(p));
    });
  }

  // ---------- Barra sólida após o topo ----------
  function navState() {
    nav.classList.toggle('is-solid', window.scrollY > 24);
  }

  // ---------- Rolagem horizontal (Fora do código) ----------
  const hs = document.querySelector('[data-hscroll]');
  const hsTrack = hs && hs.querySelector('[data-hscroll-track]');
  const wide = window.matchMedia('(min-width: 900px)');
  let hsDistance = 0;

  function setupHScroll() {
    const on = motion && wide.matches && window.innerHeight >= 480;
    root.classList.toggle('hscroll-on', on);
    hsTrack.style.transform = '';
    if (!on) {
      hs.style.height = '';
      return;
    }
    hsDistance = Math.max(0, hsTrack.scrollWidth - window.innerWidth);
    hs.style.height = `${window.innerHeight + hsDistance}px`;
  }

  function hscroll() {
    if (!root.classList.contains('hscroll-on')) return;
    const r = hs.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(r.height - window.innerHeight, 1));
    hsTrack.style.transform = `translate3d(${-p * hsDistance}px, 0, 0)`;
  }

  // ---------- Loop de rolagem único ----------
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      navState();
      if (motion) drawOnScroll();
      drawBelt();
      drawTrails();
      hscroll();
    });
  }

  if (!motion) drawn.forEach((path) => Squiggle.setDraw(path, 1));
  if (hs) setupHScroll();
  buildBelt();
  buildTrails();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (hs) setupHScroll();
    buildBelt();
    buildTrails();
    onScroll();
  });
  window.addEventListener('load', () => {
    if (hs) setupHScroll();
    // fontes e imagens já carregadas: alturas definitivas para a fita e os rabiscos
    trails.forEach((t) => Squiggle.build(t.section));
    buildBelt();
    buildTrails();
    onScroll();
  });

  // ---------- Visualizador (imagens e vídeos) ----------
  const viewer = document.querySelector('[data-viewer]');
  const viewerContent = viewer.querySelector('[data-viewer-content]');

  function openViewer(node) {
    viewerContent.replaceChildren(node);
    if (typeof viewer.showModal === 'function') viewer.showModal();
    else viewer.setAttribute('open', '');
  }

  function openImage(src, alt) {
    const img = new Image();
    img.src = src;
    img.alt = alt || '';
    openViewer(img);
  }

  function openVideo(id, title) {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    frame.title = title || 'Vídeo';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    openViewer(frame);
  }

  viewer.querySelector('[data-viewer-close]').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });
  // parar o vídeo ao fechar
  viewer.addEventListener('close', () => viewerContent.replaceChildren());

  document.querySelectorAll('[data-play]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.closest('.project').querySelector('.project__title').textContent;
      openVideo(btn.dataset.play, `Vídeo pitch — ${title}`);
    });
  });

  // ---------- Galerias ----------
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('[data-gallery-main]');
    const mainImg = main.querySelector('img');
    const panel = gallery.querySelector('[data-panel]');
    const thumbs = gallery.querySelectorAll('.gallery__thumbs button');

    function activate(btn) {
      thumbs.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
    }

    thumbs.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.video) {
          const title = gallery.closest('.project').querySelector('.project__title').textContent;
          openVideo(btn.dataset.video, `Vídeo pitch — ${title}`);
          return;
        }
        activate(btn);
        if (btn.dataset.panelTarget) {
          main.hidden = true;
          if (panel) panel.classList.add('is-active');
          return;
        }
        if (panel) panel.classList.remove('is-active');
        main.hidden = false;
        mainImg.src = btn.dataset.src;
        mainImg.alt = btn.dataset.alt || '';
      });
    });

    main.addEventListener('click', () => openImage(mainImg.currentSrc || mainImg.src, mainImg.alt));
  });

  // ---------- Gráfico KNN: acurácia × k (saída da célula 46 do notebook) ----------
  const KNN = [
    [3, 0.7383], [5, 0.7150], [7, 0.7570], [9, 0.7477], [11, 0.7664], [13, 0.7710],
    [15, 0.7477], [17, 0.7383], [19, 0.7664], [21, 0.7757], [23, 0.7897], [25, 0.7757],
    [27, 0.7757], [29, 0.7710], [31, 0.7804], [33, 0.7757], [35, 0.7757], [37, 0.7757],
    [39, 0.7664], [41, 0.7710], [43, 0.7710], [45, 0.7757], [47, 0.7757], [49, 0.7757]
  ];
  const pct = (v) => `${(v * 100).toFixed(1).replace('.', ',')}%`;

  const plot = document.querySelector('[data-knn-plot]');
  const table = document.querySelector('[data-knn-table] tbody');

  if (table) {
    table.innerHTML = KNN.map(([k, a]) => `<tr><td>${k}</td><td>${pct(a)}</td></tr>`).join('');
  }

  function drawKnn() {
    if (!plot || !plot.clientWidth) return;
    const W = plot.clientWidth, H = plot.clientHeight;
    const m = { t: 28, r: 16, b: 36, l: 44 };
    const yMin = 0.70, yMax = 0.80;
    const x = (k) => m.l + ((k - 3) / (49 - 3)) * (W - m.l - m.r);
    const y = (a) => m.t + (1 - (a - yMin) / (yMax - yMin)) * (H - m.t - m.b);

    const grid = [0.70, 0.72, 0.74, 0.76, 0.78, 0.80].map((v) =>
      `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}"/>`).join('');
    const yLabels = [0.70, 0.74, 0.78].map((v) =>
      `<text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${Math.round(v * 100)}%</text>`).join('');
    const xTicks = [3, 11, 19, 27, 35, 43, 49].map((k) =>
      `<text x="${x(k)}" y="${H - m.b + 18}" text-anchor="middle">${k}</text>`).join('');
    const line = KNN.map(([k, a], i) => `${i ? 'L' : 'M'}${x(k).toFixed(1)},${y(a).toFixed(1)}`).join('');
    const area = `${line}L${x(49)},${y(yMin)}L${x(3)},${y(yMin)}Z`;

    const best = KNN.find(([k]) => k === 23);
    const chosen = KNN.find(([k]) => k === 27);
    const narrow = W < 420;

    plot.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Linha da acurácia do KNN para k de 3 a 49; pico de 79,0% em k = 23 e 77,6% em k = 27.">
        <g class="grid">${grid}</g>
        <g class="axis">${yLabels}${xTicks}</g>
        <text class="axis-title" x="${W - m.r}" y="${H - 4}" text-anchor="end">k (vizinhos)</text>
        <path class="area" d="${area}"/>
        <path class="line" d="${line}"/>
        <line class="crosshair" y1="${m.t}" y2="${H - m.b}"/>
        <circle class="mark" cx="${x(best[0])}" cy="${y(best[1])}" r="5"/>
        <circle class="mark" cx="${x(chosen[0])}" cy="${y(chosen[1])}" r="5"/>
        <text class="mark-label" x="${x(best[0])}" y="${y(best[1]) - 12}" text-anchor="middle">pico: ${pct(best[1])} (k=23)</text>
        <text class="mark-label" x="${x(chosen[0]) + (narrow ? 0 : 10)}" y="${y(chosen[1]) + 22}" text-anchor="${narrow ? 'middle' : 'start'}">k=27 (≈√n): ${pct(chosen[1])}</text>
        <circle class="hover-dot" r="5"/>
      </svg>
      <div class="knn-chart__tip" aria-hidden="true"></div>`;

    const svg = plot.querySelector('svg');
    const cross = svg.querySelector('.crosshair');
    const dot = svg.querySelector('.hover-dot');
    const tip = plot.querySelector('.knn-chart__tip');

    function showAt(clientX) {
      const r = svg.getBoundingClientRect();
      const px = ((clientX - r.left) / r.width) * W;
      let nearest = KNN[0];
      KNN.forEach((d) => { if (Math.abs(x(d[0]) - px) < Math.abs(x(nearest[0]) - px)) nearest = d; });
      const cx = x(nearest[0]), cy = y(nearest[1]);
      cross.setAttribute('x1', cx); cross.setAttribute('x2', cx);
      dot.setAttribute('cx', cx); dot.setAttribute('cy', cy);
      tip.textContent = `k = ${nearest[0]} · ${pct(nearest[1])}`;
      tip.style.left = `${(cx / W) * 100}%`;
      tip.style.top = `${(cy / H) * 100}%`;
      plot.classList.add('is-hover');
    }

    svg.addEventListener('pointermove', (e) => showAt(e.clientX));
    svg.addEventListener('pointerdown', (e) => showAt(e.clientX));
    svg.addEventListener('pointerleave', () => plot.classList.remove('is-hover'));
  }

  if (plot) {
    drawKnn();
    if ('ResizeObserver' in window) {
      let lastW = 0;
      new ResizeObserver(() => {
        if (plot.clientWidth !== lastW) { lastW = plot.clientWidth; drawKnn(); }
      }).observe(plot);
    }
  }
})();
