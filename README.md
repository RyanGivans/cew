# CEW Landscape Website

GitHub Pages-ready static website for CEW Landscape.

## Replace these items

- Formspree endpoint in `/contact/index.html`
- Phone number in `/assets/components/footer.html` and `/contact/index.html`
- Email address in `/assets/components/footer.html` and `/contact/index.html`
- Logo/name in `/assets/components/header.html`
- Placeholder project/service images
- About page copy

## Shared Header/Footer

Header and footer are stored here:

- `/assets/components/header.html`
- `/assets/components/footer.html`

They are loaded on every page using `/assets/js/main.js`.

## Important GitHub Pages note

Because the header/footer use `fetch()`, open the site through GitHub Pages or a local server. Opening `index.html` directly from Finder may not load the shared components.
