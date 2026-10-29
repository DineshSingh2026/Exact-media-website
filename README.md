# Exact Media — website

One-page marketing site for Exact Media (IT Services & Online Advertising).

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide icons.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-check + lint)
npm start          # serve the production build
```

## Editing content

- **All copy** lives in `lib/content.ts`. Components only import from it.
- **Images** live in `public/images/` (`hero-bg.png`, `about.png`, `service-*.png`, `og-image.png`). A missing file falls back to a gradient placeholder.
- **Logo** is `components/ui/LogoMark.tsx`. Standalone files are in `public/brand/`.

## Colour themes

Three palettes (Electric, Noir & Gold, Aurora) are defined as CSS variables in `app/globals.css` and listed in `lib/themes.ts`. A floating switcher on the page lets you preview them live.

When a palette is chosen:

1. Set `DEFAULT_THEME` in `lib/themes.ts` to its id.
2. Set `SHOW_THEME_SWITCHER = false` to hide the switcher.

## Before launch

- Replace the placeholder support email in `lib/content.ts` (`contact.email.address`).
- `app/api/contact/route.ts` currently only logs submissions. Connect an email provider (e.g. Resend, Postmark) to receive messages.
- Update `site.url` in `lib/content.ts` if the production domain differs from `https://exactmedia.net`.

## Deploy to Vercel

1. Go to <https://vercel.com/new> and import this GitHub repository.
2. Vercel detects Next.js automatically. Keep the defaults (build: `next build`, output: `.next`).
3. Click **Deploy**. Every push to `main` redeploys automatically.
4. Add your custom domain under **Project → Settings → Domains**.

No environment variables are required.
