/* Academic portfolio — Bijaya Hatuwal */

(function () {
  'use strict';

  // ---------- Publications data ----------
  // type: "conference" | "journal";  first: true if first-authored
  const ME = ['B. Hatuwal'];
  const PUBLICATIONS = [
    { year: 2026, type: 'conference', title: 'Generative AI video evaluation: Survey of metrics, benchmarks, and trustworthiness',
      authors: 'K. Safavigerdini, B. Hatuwal, A. Daghighi, and K. Palaniappan',
      venue: 'Proc. IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pp. 5189–5200', tags: ['CVPR'] },
    { year: 2026, type: 'conference', title: 'Shape fidelity: Measuring a digital model’s trueness to form',
      authors: 'C. Algire, A. Kalukin, H. Theiss, B. Hatuwal, T. Krock, S. Israel, and K. Palaniappan',
      venue: 'Proc. SPIE, vol. 14032, p. 140320Q' },
    { year: 2025, type: 'conference', first: true, title: 'HE3D-Net: Hypoxic Ischemic Encephalopathy diagnosis and lesion segmentation using 3D heterogenous ensemble models',
      authors: 'B. Hatuwal, R. Bao, M.-L. Ho, and K. Palaniappan',
      venue: 'Applied Imagery Pattern Recognition Workshop (AIPR), Springer, pp. 495–507', tags: ['Oral'] },
    { year: 2024, type: 'conference', title: 'The second visual object tracking segmentation VOTS2024 challenge results',
      authors: 'M. Kristan, J. Matas, P. Tokmakov, M. Felsberg, L. Č. Zajc, A. Lukežič, et al. (incl. B. Hatuwal)',
      venue: 'European Conference on Computer Vision (ECCV) Workshops, Springer, pp. 357–383' },
    { year: 2023, type: 'conference', title: 'Real-time helmet violation detection in AI City Challenge 2023 with genetic algorithm-enhanced YOLOv5',
      authors: 'E. Soltanikazemi, A. Dhakal, B. Hatuwal, I. E. Toubal, A. Aboah, and K. Palaniappan',
      venue: 'IEEE Applied Imagery Pattern Recognition Workshop (AIPR)' },
    { year: 2025, type: 'journal', title: 'Ecological drivers of evolution of swine Influenza in the United States: A review',
      authors: 'V. Goel, J. Ding, B. Hatuwal, E. Giri, T. J. DeLiberto, J. Lowe, R. Webby, M. Emch, and X.-F. Wan',
      venue: 'Emerging Microbes & Infections, vol. 14, no. 1, p. 2455598' },
    { year: 2025, type: 'journal', title: 'Evaluation of spatial variation in chronic wasting disease risk with Bayesian Poisson log-Gaussian model',
      authors: 'R. K. Raghavan, F. B. Osei, A. Stein, S. Hesting, L. Jaster, B. Hatuwal, J. E. Mosley, and A. Raghavan',
      venue: 'Frontiers in Veterinary Science, vol. 12, p. 1568468' },
    { year: 2024, type: 'journal', first: true, title: 'Spatial patterns of Influenza A virus spread across compartments in commercial swine farms in the United States',
      authors: 'B. Hatuwal, V. Goel, T. J. DeLiberto, J. Lowe, M. Emch, R. J. Webby, and X.-F. Wan',
      venue: 'Emerging Microbes & Infections, vol. 13, no. 1, p. 2400530' },
    { year: 2024, type: 'journal', title: 'MAIVeSS: Streamlined selection of antigenically matched, high-yield viruses for seasonal Influenza vaccine production',
      authors: 'C. Gao, F. Wen, M. Guan, B. Hatuwal, L. Li, B. Praena, C. Y. Tang, J. Zhang, F. Luo, H. Xie, et al.',
      venue: 'Nature Communications, vol. 15, no. 1, p. 1128', tags: ['Nature Comms'] },
    { year: 2020, type: 'journal', first: true, title: 'Plant leaf disease recognition using random forest, KNN, SVM and CNN',
      authors: 'B. Hatuwal, A. Shakya, and B. Joshi',
      venue: 'Polibits, vol. 62, pp. 13–19' },
    { year: 2020, type: 'journal', first: true, title: 'Lung cancer detection using convolutional neural network on histopathological images',
      authors: 'B. Hatuwal and H. C. Thapa',
      venue: 'International Journal of Computer Trends and Technology, vol. 68, no. 10, pp. 21–24' }
  ];

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function boldMe(authors) {
    let html = esc(authors);
    ME.forEach((name) => { html = html.split(esc(name)).join('<span class="me">' + esc(name) + '</span>'); });
    return html;
  }

  const list = document.getElementById('pub-list');
  const empty = document.getElementById('pub-empty');
  const search = document.getElementById('pub-search');
  let activeFilter = 'all';

  function renderPubs() {
    if (!list) return;
    const q = (search && search.value || '').trim().toLowerCase();
    const items = PUBLICATIONS
      .slice()
      .sort((a, b) => b.year - a.year)
      .filter((p) => activeFilter === 'all' || (activeFilter === 'first' ? p.first : p.type === activeFilter))
      .filter((p) => !q || [p.title, p.authors, p.venue, p.year].join(' ').toLowerCase().includes(q));

    list.innerHTML = items.map((p) => {
      const badges = [p.type === 'journal' ? 'Journal' : 'Conference / Workshop']
        .concat(p.first ? ['First author'] : [])
        .map((b) => '<span>' + esc(b) + '</span>')
        .concat((p.tags || []).map((t) => '<span class="hl">' + esc(t) + '</span>'))
        .join('');
      return '<li class="pub">' +
        '<div class="pub-year">' + p.year + '</div>' +
        '<div><p class="pub-title">' + esc(p.title) + '</p>' +
        '<p class="pub-authors">' + boldMe(p.authors) + '</p>' +
        '<p class="pub-venue">' + esc(p.venue) + '</p>' +
        '<div class="pub-badges">' + badges + '</div></div></li>';
    }).join('');
    if (empty) empty.hidden = items.length > 0;
  }

  document.querySelectorAll('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderPubs();
    });
  });
  if (search) search.addEventListener('input', renderPubs);
  renderPubs();

  // ---------- Mobile nav ----------
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---------- Theme toggle ----------
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const root = document.documentElement;
      const current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ---------- Expandable project details ----------
  document.querySelectorAll('.expand').forEach((btn) => {
    btn.addEventListener('click', () => {
      const more = btn.nextElementSibling;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? 'Show details' : 'Hide details';
      if (more) more.hidden = open;
    });
  });

  // ---------- Research thrust tabs ----------
  const tabs = Array.from(document.querySelectorAll('.tab'));
  function selectTab(tab) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(next); next.focus();
      }
    });
  });

  // ---------- Email: assembled only on click (deters scrapers) ----------
  const reveal = document.getElementById('reveal-email');
  if (reveal) {
    reveal.addEventListener('click', () => {
      const user = 'bkhcty';
      const domain = ['missouri', 'edu'].join('.');
      const addr = user + '@' + domain;
      const a = document.createElement('a');
      a.href = 'mailto:' + addr;
      a.textContent = addr;
      a.className = 'btn btn-small';
      reveal.replaceWith(a);
    });
  }

  // ---------- Active nav link on scroll ----------
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));

    // Reveal-on-scroll for cards
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); revealIO.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.card, .stat').forEach((el) => { el.classList.add('reveal'); revealIO.observe(el); });
  }

  // ---------- Footer year ----------
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
