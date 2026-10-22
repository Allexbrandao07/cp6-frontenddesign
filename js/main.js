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

  // #sobre mora dentro do palco do zoom: com o zoom ligado, a âncora levaria ao hero.
  // Leva ao fim da pista, onde o portal já está todo aberto.
  document.querySelectorAll('a[href="#sobre"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const zoom = document.querySelector('[data-zoom]');
      if (!root.classList.contains('zoom-on') || !zoom) return;
      e.preventDefault();
      const top = zoom.getBoundingClientRect().top + window.scrollY + zoom.offsetHeight - window.innerHeight;
      window.scrollTo({ top, behavior: motion ? 'smooth' : 'auto' });
      history.replaceState(null, '', '#sobre');
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

  // ---------- Fitas: duplica o conteúdo para o loop não ter emenda ----------
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  // ---------- Rabiscos desenhados pela rolagem ----------
  // "scroll": desenha enquanto entra na tela; "long": acompanha a seção inteira;
  // "portal": igual a "scroll" quando o zoom está desligado (senão o eye-zoom cuida).
  const drawn = Array.from(document.querySelectorAll('path[data-draw]'));

  function drawOnScroll() {
    const vh = window.innerHeight;
    const zoomOn = root.classList.contains('zoom-on');
    drawn.forEach((path) => {
      if (path.dataset.draw === 'portal' && zoomOn) return;
      const svg = path.ownerSVGElement;
      const r = svg.getBoundingClientRect();
      let p;
      if (path.dataset.drawSpan === 'long') {
        p = (vh * 0.75 - r.top) / Math.max(r.height, 1);
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
      hscroll();
    });
  }

  if (!motion) drawn.forEach((path) => Squiggle.setDraw(path, 1));
  if (hs) setupHScroll();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (hs) setupHScroll();
    onScroll();
  });
  window.addEventListener('load', () => {
    if (hs) setupHScroll();
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
