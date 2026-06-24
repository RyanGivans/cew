function getBasePath() {
  const scripts = Array.from(document.scripts);
  const thisScript = scripts.find((script) => script.src && script.src.includes('/assets/js/main.js'));
  if (!thisScript) return './';
  const url = new URL(thisScript.src);
  return url.pathname.replace('assets/js/main.js', '');
}

const CEW_BASE_PATH = getBasePath();

function withBase(path) {
  return `${CEW_BASE_PATH}${path || ''}`;
}

async function loadComponent(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;

  try {
    const response = await fetch(withBase(path));
    if (!response.ok) throw new Error(`Could not load ${path}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function hydrateBaseLinks() {
  document.querySelectorAll('[data-path]').forEach((link) => {
    link.setAttribute('href', withBase(link.getAttribute('data-path')));
  });
}

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function initBeforeAfterSliders() {
  document.querySelectorAll('[data-before-after]').forEach((slider) => {
    const range = slider.querySelector('input[type="range"]');
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    if (!range || !after || !handle) return;

    const update = () => {
      const value = range.value;
      after.style.clipPath = `inset(0 0 0 ${value}%)`;
      handle.style.left = `${value}%`;
      slider.style.setProperty('--position', `${value}%`);
    };

    range.addEventListener('input', update);
    range.addEventListener('change', update);
    update();
  });
}

function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

async function initSite() {
  await loadComponent('[data-include="header"]', 'assets/components/header.html');
  await loadComponent('[data-include="footer"]', 'assets/components/footer.html');
  hydrateBaseLinks();
  initMobileNav();
  initBeforeAfterSliders();
  initYear();
}

initSite();