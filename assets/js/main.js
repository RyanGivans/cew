async function loadComponent(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load ${path}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

async function initComponents() {
  await loadComponent('[data-include="header"]', '/assets/components/header.html');
  await loadComponent('[data-include="footer"]', '/assets/components/footer.html');

  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

initComponents();
