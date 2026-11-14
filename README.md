# Restnaa website

The public landing page for [Restnaa](https://github.com/restnaa/restnaa): a quiet Windows desktop app that reminds you to rest your eyes, move, and take an optional water break.

## Local development

```bash
npm ci
npm run dev
```

Build the production site with `npm run build`. The Vite build uses a relative base so it works from the GitHub Pages project URL (`/restnaa-website/`) as well as a custom domain.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it with GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
