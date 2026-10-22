/* ==================================================================
   Preloader — logo + quatro blocos da paleta como barra de progresso.

   O progresso é real: cada etapa (fontes, retrato do hero, logo e o
   "load" da janela) vale uma fração. A barra exibida persegue esse
   valor com suavização, então nunca "pula" nem volta. Ao chegar a
   100%, o preloader sai e libera as animações de entrada do hero
   (window.pageReady é a promessa que os outros scripts esperam).
   ================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const loader = document.querySelector('[data-loader]');

  let markReady;
  window.pageReady = new Promise((resolve) => { markReady = resolve; });

  if (!loader) {
    root.classList.remove('is-loading');
    markReady();
    return;
  }

  const fills = loader.querySelectorAll('[data-loader-fill]');
  const label = loader.querySelector('[data-loader-label]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MIN_TIME = reduceMotion ? 0 : 1100; // tempo mínimo para a barra não "piscar"
  const MAX_TIME = 8000;                    // se algo travar, o site abre assim mesmo
  const start = performance.now();

  // ---------- Etapas de carregamento ----------
  function imageReady(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = resolve;
      img.src = src;
      if (img.complete) resolve();
    });
  }

  const heroImg = document.querySelector('[data-zoom-photo] img');
  const tasks = [
    document.fonts ? document.fonts.ready : Promise.resolve(),
    heroImg ? imageReady(heroImg.currentSrc || heroImg.src) : Promise.resolve(),
    imageReady('assets/img/logo-allex.png'),
    new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    })
  ];

  let done = 0;
  tasks.forEach((t) => t.then(() => { done += 1; }));

  // ---------- Barra ----------
  let shown = 0;
  let finished = false;

  function paint(progress) {
    // cada bloco é 1/4 da barra: o bloco i enche entre i/4 e (i+1)/4
    fills.forEach((fill, i) => {
      const local = Math.min(1, Math.max(0, progress * fills.length - i));
      fill.style.transform = `scaleX(${local})`;
    });
  }

  function tick(now) {
    const elapsed = now - start;
    const real = done / tasks.length;
    // o tempo mínimo funciona como um teto: a barra não passa de onde o relógio permite
    const cap = MIN_TIME ? Math.min(1, elapsed / MIN_TIME) : 1;
    const target = Math.min(real, cap);
    shown += (target - shown) * (reduceMotion ? 1 : 0.12);
    if (target - shown < 0.002) shown = target;
    paint(shown);

    if ((shown >= 1 || elapsed > MAX_TIME) && !finished) {
      finished = true;
      paint(1);
      exit();
      return;
    }
    requestAnimationFrame(tick);
  }

  function exit() {
    label.textContent = 'Portfólio carregado';
    loader.classList.add('is-done');
    root.classList.remove('is-loading');
    markReady();

    const remove = () => loader.remove();
    if (reduceMotion) {
      remove();
    } else {
      loader.addEventListener('transitionend', (e) => {
        if (e.target === loader) remove();
      });
      setTimeout(remove, 1600); // garantia caso o transitionend não dispare
    }
  }

  requestAnimationFrame(tick);
})();
