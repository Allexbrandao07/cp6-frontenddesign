/* ==================================================================
   Preferências: tema (claro/escuro) e idioma (PT-BR/EN).

   Tema: html[data-theme] (o <head> já aplica o salvo antes do paint);
   as cores trocam via variáveis CSS (ver _base.scss).

   Idioma: o HTML é escrito em português. O dicionário EN abaixo aponta
   cada texto por seletor CSS; na primeira troca, o texto original (PT)
   de cada alvo é guardado, então voltar para PT é exato. Textos gerados
   por JS usam window.I18N.t('texto em PT').
   ================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modo privado: só não salva */ } }
  };

  // ---------------- Dicionário EN: [seletor, propriedade, texto] ----------------
  // propriedade: "html" (mantém marcação interna), "text" ou nome de atributo.
  const EN = [
    // <head>
    ['title', 'text', 'Állex Brandão — Portfolio'],
    ['meta[name="description"]', 'content', 'Portfolio of Állex Brandão: AI Engineer with a degree in Data Science, studying Software Engineering. Projects, journey and what keeps me going outside of code.'],

    // preloader, skip link, nav
    ['[data-loader-label]', 'text', 'Loading the portfolio…'],
    ['.skip-link', 'text', 'Skip to content'],
    ['.nav__brand', 'aria-label', 'Állex Brandão, portfolio 2026 — back to top'],
    ['.nav__brand-text strong', 'text', 'Portfolio'],
    ['.nav__menu', 'aria-label', 'Sections'],
    ['.nav__menu a[href="#sobre"]', 'text', 'About'],
    ['.nav__menu a[href="#projetos"]', 'text', 'Projects'],
    ['.nav__menu a[href="#trajetoria"]', 'text', 'Journey'],
    ['.nav__menu a[href="#fora-do-codigo"]', 'text', 'Off the code'],
    ['.nav__menu .nav__cta', 'text', 'Let’s talk?'],

    // hero
    ['.hero', 'aria-label', 'Introduction'],
    ['.hero__photo img', 'alt', 'Portrait of Állex Brandão in a black shirt with arms crossed, looking at the camera.'],
    ['.hero__lead', 'text', 'AI Engineer. I turn data into decisions and ideas into products — with code, curiosity and a bit of rhythm.'],
    ['.hero__actions a[href="#projetos"]', 'text', 'See projects'],
    ['.hero__actions a[href="#contato"]', 'text', 'Get in touch'],

    // sobre — parte 1
    ['.portal .kicker', 'text', '01 — About'],
    ['#sobre-titulo .display', 'text', 'What do I do?'],
    ['.portal__lead', 'html', 'I’m an <strong class="hl hl--blue">AI Engineer</strong> with a degree in <strong class="hl hl--lilac">Data Science</strong>, currently studying <strong class="hl hl--orange">Software Engineering</strong>. In practice: I take messy data and turn it into something useful — a model that gets it right, a dashboard that helps decide, a product someone actually uses.'],
    ['.portal__photo img', 'alt', 'Desk with a monitor showing code and a computer with colorful lighting.'],

    // sobre — parte 2
    ['.about', 'aria-label', 'More about me'],
    ['.about__bio p:nth-child(1)', 'html', 'I’m a <strong>Junior AI Engineer at NTT DATA Europe &amp; Latam</strong>, with advanced English and hands-on experience in Python, SQL, predictive modeling and analytics, data engineering, statistics, Machine Learning and Deep Learning.'],
    ['.about__bio p:nth-child(2)', 'text', 'I work with classification algorithms (SVM, Random Forest, Gradient Boosting, MLP, CNN), regression (Linear Regression, Random Forest Regressor, Gradient Boosting Regressor) and clustering (DBSCAN, GMM, Hierarchical Clustering, Autoencoders).'],
    ['.about__bio p:nth-child(3)', 'text', 'I have knowledge of Cloud Computing and good project practices, including version control, critical data analysis, AI ethics and clear technical communication.'],
    ['.about__bio p:nth-child(4)', 'text', 'I’m looking to keep growing and contribute data-driven solutions, exploring challenges that bring together technology, innovation and real impact.'],
    ['.about__stack .label', 'text', 'Tools'],
    ['.certs__title', 'html', 'Certifications: <span class="script">(and counting)</span>'],
    ['.cert--lilac .cert__date', 'text', 'Issued Aug 2026 · expires Aug 2027'],
    ['.cert--lilac .cert__skills li:nth-child(2)', 'text', 'Generative AI'],
    ['.cert--blue .cert__name', 'text', 'Flash Skills: process automation with n8n and AI'],
    ['.cert--blue .cert__date', 'text', 'Issued Sep 2025'],
    ['.cert--blue .cert__skills li:nth-child(2)', 'text', 'Process automation'],
    ['.cert--red .cert__date', 'text', 'Issued May 2025'],
    ['.certs__more', 'html', 'See credentials on LinkedIn <span aria-hidden="true">↗</span>'],

    // projetos
    ['.projects .section-head .kicker', 'text', '02 — Projects'],
    ['#projetos-titulo .display', 'text', 'Projects'],
    ['#projetos-titulo .script', 'text', '(a few)'],
    ['[data-gallery-main]', 'aria-label', 'Enlarge image'],
    ['.project__team .label', 'text', 'Built as a team with'],
    ['[data-play]', 'text', '▶ Watch pitch'],

    // revi
    ['#revi .kicker', 'text', 'Product · team of 5 · 2026'],
    ['#revi .project__tagline', 'text', 'Snap your notebook, study what’s in it'],
    ['#revi .project__body > p:not([class])', 'html', 'A study platform that turns photos of class material — notebooks, whiteboards, handouts — into AI-generated <strong>flash cards, summaries, mock exams and mind maps</strong>, tracking consistency (Ascensão) and performance (Trilha). It reads content aloud, has shared classrooms, rankings and even Spotify playing during focus sessions.'],
    ['#revi .project__links a', 'html', 'Open the app <span aria-hidden="true">↗</span>'],
    ['#revi [data-gallery-main] img', 'alt', 'Revi home page: “Snap your notebook. Study what’s in it.” with folders colored by subject.'],
    ['#revi .gallery__thumbs li:nth-child(1) button', 'data-alt', 'Revi home page: “Snap your notebook. Study what’s in it.” with folders colored by subject.'],
    ['#revi .gallery__thumbs li:nth-child(1) .sr-only', 'text', 'Home page'],
    ['#revi .gallery__thumbs li:nth-child(2) button', 'data-alt', '“Four ways to study the same photo” section: flash cards, summary and mock exam.'],
    ['#revi .gallery__thumbs li:nth-child(2) .sr-only', 'text', 'Study modes'],
    ['#revi .gallery__thumbs li:nth-child(3) button', 'data-alt', 'Revi mind map about cubic equations, with branches that open one by one.'],
    ['#revi .gallery__thumbs li:nth-child(3) .sr-only', 'text', 'Mind map'],
    ['#revi .gallery__thumbs li:nth-child(4) button', 'data-alt', 'The Revi team: five members sitting side by side in the project’s blue T-shirts.'],
    ['#revi .gallery__thumbs li:nth-child(4) .sr-only', 'text', 'Team'],
    ['#revi .gallery__thumbs li:nth-child(5) button', 'data-alt', 'Revi pitch video'],
    ['#revi .gallery__thumbs li:nth-child(5) .sr-only', 'text', 'Pitch video'],

    // data hive
    ['#datahive .kicker', 'text', 'FIAP × TOTVS Challenge · team Beekeepers · 2025'],
    ['#datahive .project__tagline', 'text', 'Smart clustering in the cloud'],
    ['#datahive .project__body > p:not([class])', 'html', 'An <strong>end-to-end data pipeline on Azure</strong> that segments TOTVS’s 40,000+ customers. A Blob Storage trigger fires Data Factory, which runs the notebooks on Databricks: data preparation, <strong>K-Means</strong> (with the elbow method) and a recommendation system that suggests the right action for each cluster — engagement, upsell or retention — delivered in a Power BI dashboard with churn, MRR and NPS.'],
    ['#datahive .project__links a', 'html', 'Open dashboard <span aria-hidden="true">↗</span>'],
    ['#datahive [data-gallery-main] img', 'alt', 'Data Hive architecture on Azure: Blob Storage, Data Factory, Databricks, Azure SQL and Power BI.'],
    ['#datahive .gallery__thumbs li:nth-child(1) button', 'data-alt', 'Data Hive architecture on Azure: Blob Storage, Data Factory, Databricks, Azure SQL and Power BI.'],
    ['#datahive .gallery__thumbs li:nth-child(1) .sr-only', 'text', 'Architecture'],
    ['#datahive .gallery__thumbs li:nth-child(2) button', 'data-alt', '3D scatter plot (PCA) with the five customer clusters found by K-Means.'],
    ['#datahive .gallery__thumbs li:nth-child(3) button', 'data-alt', '2D scatter plot (PCA) with the customer clusters.'],
    ['#datahive .gallery__thumbs li:nth-child(4) button', 'data-alt', 'Elbow method used to choose the number of clusters.'],
    ['#datahive .gallery__thumbs li:nth-child(4) .sr-only', 'text', 'Elbow method'],
    ['#datahive .gallery__thumbs li:nth-child(5) button', 'data-alt', 'Data Hive pitch video'],
    ['#datahive .gallery__thumbs li:nth-child(5) .sr-only', 'text', 'Pitch video'],

    // tama
    ['#tama .kicker', 'text', 'Multi-page website · 2026'],
    ['#tama .project__tagline', 'text', 'The strongest name in drums'],
    ['#tama .project__body > p:not([class])', 'html', 'A website concept for TAMA in Brazil, in <strong>pure HTML, CSS and JavaScript</strong>: a catalog of 475 products in 12 categories (filter, search and progressive loading), 835 artists from 60 countries, a timeline from 1908 to 2024 and a <strong>playable drum kit</strong> built with SVG and Web Audio, using real samples from a Starclassic.'],
    ['#tama .project__links a', 'html', 'Visit the website <span aria-hidden="true">↗</span>'],
    ['#tama [data-gallery-main] img', 'alt', 'Hero of the TAMA Drums Brasil website: “The strongest name in drums” over a dark background with a TAMA bass drum.'],
    ['#tama .gallery__thumbs li:nth-child(1) button', 'data-alt', 'Hero of the TAMA Drums Brasil website: “The strongest name in drums” over a dark background with a TAMA bass drum.'],
    ['#tama .gallery__thumbs li:nth-child(1) .sr-only', 'text', 'Home'],
    ['#tama .gallery__thumbs li:nth-child(2) button', 'data-alt', '“Choose your weapon” section with the product lines in horizontal scroll.'],
    ['#tama .gallery__thumbs li:nth-child(2) .sr-only', 'text', 'Product lines'],
    ['#tama .gallery__thumbs li:nth-child(3) button', 'data-alt', 'Product catalog with filters by category, line and search.'],
    ['#tama .gallery__thumbs li:nth-child(3) .sr-only', 'text', 'Products'],
    ['#tama .gallery__thumbs li:nth-child(4) button', 'data-alt', 'Artists page: 835 artists from 60 countries.'],
    ['#tama .gallery__thumbs li:nth-child(4) .sr-only', 'text', 'Artists'],

    // titanic
    ['#titanic .kicker', 'text', 'Machine Learning · 2025'],
    ['#titanic .project__tagline', 'text', 'Who would survive?'],
    ['#titanic .project__body > p:not([class])', 'html', 'A complete classification workflow to predict passenger survival: cleaning (712 valid records), a <strong>Shapiro-Wilk test</strong> to choose between normalizing or standardizing, one-hot encoding and KNN with a hand-written Euclidean distance. With k = 27 (≈ √n) the model reaches <strong>77.6%</strong>; sweeping odd values of k finds a peak of <strong>79.0% at k = 23</strong>.'],
    ['#titanic .project__links a', 'html', 'View on GitHub <span aria-hidden="true">↗</span>'],
    ['.knn-chart__title', 'text', 'Accuracy by number of neighbors (k)'],
    ['.knn-chart__sub', 'text', 'Test set (30%) · recreated from the notebook output'],
    ['.knn-chart__table summary', 'text', 'View data as a table'],
    ['[data-knn-table] th:nth-child(2)', 'text', 'Accuracy'],
    ['#titanic [data-gallery-main] img', 'alt', 'Notebook pairplot: age, siblings, parents and fare, colored by survival.'],
    ['#titanic .gallery__chart-thumb .sr-only', 'text', 'Accuracy by k chart'],
    ['#titanic .gallery__thumbs li:nth-child(2) button', 'data-alt', 'Notebook pairplot: age, siblings, parents and fare, colored by survival.'],

    // trajetória
    ['.journey .section-head .kicker', 'text', '03 — Journey'],
    ['#trajetoria-titulo .display', 'text', 'Journey'],
    ['#trajetoria-titulo .script', 'text', '(so far)'],
    ['.step:nth-child(1) .step__kind', 'text', 'Education'],
    ['.step:nth-child(1) .step__title', 'text', 'Data Science'],
    ['.step:nth-child(1) .step__org span', 'text', '· Associate degree in Technology (CST)'],
    ['.step:nth-child(2) .step__when', 'html', '<span class="step__kind">Internship</span> Sep 2025 – Apr 2026'],
    ['.step:nth-child(2) .step__title', 'text', 'Data Integration & AI Intern'],
    ['.step:nth-child(2) .step__org span', 'text', '· Internship · São Paulo · on-site'],
    ['.step:nth-child(3) .step__when', 'html', '<span class="step__kind">Education</span> Jan 2026 – Dec 2029 <span class="step__now">In progress</span>'],
    ['.step:nth-child(3) .step__title', 'text', 'Software Engineering'],
    ['.step:nth-child(3) .step__org span', 'text', '· Bachelor’s degree · expected graduation Dec 2029'],
    ['.step:nth-child(4) .step__when', 'html', '<span class="step__kind">Experience</span> Apr 2026 – present <span class="step__now">Now</span>'],
    ['.step:nth-child(4) .step__title', 'text', 'Junior AI Engineer'],
    ['.step:nth-child(4) .step__org span', 'text', '· Full-time · São Paulo'],

    // fora do código
    ['.hobbies__intro .kicker', 'text', '04 — Off the code'],
    ['#hobbies-titulo .display', 'text', 'Off the code'],
    ['#hobbies-titulo .script', 'text', '(what I love doing)'],
    ['.hobbies__lead', 'text', 'When I close the laptop, the rhythm changes: I sing, play the drums and follow Palmeiras whenever I can — ideally from the stands. That’s when I recharge the energy (and the creativity) I bring back to code.'],
    ['.hobby--blue img', 'alt', 'Állex singing on stage, eyes closed and smiling, under blue light.'],
    ['.hobby--blue figcaption .display', 'text', 'Vocals'],
    ['.hobby--blue figcaption .script', 'text', 'singing live'],
    ['.hobby--orange img', 'alt', 'Állex playing the drums at a show, wearing a cap and in-ear monitors.'],
    ['.hobby--orange figcaption .display', 'text', 'Drums'],
    ['.hobby--orange figcaption .script', 'text', 'in the groove'],
    ['.hobby--lilac img', 'alt', 'Állex with open arms in the stands of the Palmeiras stadium, wearing the team’s jersey.'],
    ['.hobby--lilac figcaption .script', 'text', 'from the stands'],

    // contato
    ['.contact .kicker', 'text', '05 — Let’s talk?'],
    ['#contato-titulo .display', 'text', 'Where to find me'],
    ['.social--linkedin a', 'aria-label', 'LinkedIn: in/állex-brandão (opens in a new tab)'],
    ['.social--github a', 'aria-label', 'GitHub: Allexbrandao07 (opens in a new tab)'],
    ['.social--instagram a', 'aria-label', 'Instagram: @allex__brandao (opens in a new tab)'],
    ['.contact__photo img', 'alt', 'Állex in a cap, sitting in an audience of green seats, looking at the camera.'],

    // rodapé e visualizador
    ['.footer p', 'text', '© 2026 Állex Brandão · AI Engineer · All rights reserved.'],
    ['.footer a[href="#topo"]', 'html', 'Back to top <span aria-hidden="true">↑</span>'],
    ['[data-viewer]', 'aria-label', 'Media viewer'],
    ['[data-viewer-close] .sr-only', 'text', 'Close']
  ];

  // Textos montados por JS (main.js, loader.js): chave = o texto em português
  const JS_EN = {
    'Abrir menu': 'Open menu',
    'Fechar menu': 'Close menu',
    'Vídeo pitch': 'Pitch video',
    'Vídeo': 'Video',
    'Portfólio carregado': 'Portfolio loaded',
    'Carregando o portfólio…': 'Loading the portfolio…',
    'pico': 'peak',
    'k (vizinhos)': 'k (neighbors)',
    'Linha da acurácia do KNN para k de 3 a 49; pico de 79,0% em k = 23 e 77,6% em k = 27.':
      'Line of KNN accuracy for k from 3 to 49; peak of 79.0% at k = 23 and 77.6% at k = 27.',
    'Ativar modo escuro': 'Turn on dark mode',
    'Ativar modo claro': 'Turn on light mode'
  };

  let lang = root.lang === 'en' ? 'en' : 'pt';
  const originals = new Map(); // elemento → { prop: texto PT }

  function read(el, prop) {
    if (prop === 'html') return el.innerHTML;
    if (prop === 'text') return el.textContent;
    return el.getAttribute(prop);
  }
  function write(el, prop, value) {
    if (value == null) return;
    if (prop === 'html') el.innerHTML = value;
    else if (prop === 'text') el.textContent = value;
    else el.setAttribute(prop, value);
  }

  function applyLang(next) {
    EN.forEach(([sel, prop, en]) => {
      document.querySelectorAll(sel).forEach((el) => {
        let saved = originals.get(el);
        if (!saved) { saved = {}; originals.set(el, saved); }
        if (!(prop in saved)) saved[prop] = read(el, prop);
        write(el, prop, next === 'en' ? en : saved[prop]);
      });
    });
    lang = next;
    root.lang = next === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('.lang__btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    syncThemeLabel();
  }

  function setLang(next, save) {
    if (next === lang && save) return;
    applyLang(next);
    if (save) store.set('lang', next);
    // outros scripts redesenham o que depende de texto (gráfico, fitas, etc.)
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: next } }));
  }

  window.I18N = {
    get lang() { return lang; },
    t(pt) { return lang === 'en' && JS_EN[pt] ? JS_EN[pt] : pt; },
    // número com a vírgula/ponto do idioma
    num(n, digits) { return n.toFixed(digits).replace('.', lang === 'en' ? '.' : ','); }
  };

  // ---------------- Tema ----------------
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function syncThemeLabel() {
    if (!themeBtn) return;
    const dark = root.dataset.theme === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', window.I18N.t(dark ? 'Ativar modo claro' : 'Ativar modo escuro'));
    if (themeColor) themeColor.setAttribute('content', dark ? '#121212' : '#FFFFFF');
  }

  function setTheme(next) {
    root.dataset.theme = next;
    store.set('theme', next);
    syncThemeLabel();
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
  }

  if (themeBtn) themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  document.querySelectorAll('.lang__btn').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang, true)));

  // estado inicial (o <head> já aplicou tema e lang salvos)
  if (lang === 'en') applyLang('en');
  syncThemeLabel();
})();
