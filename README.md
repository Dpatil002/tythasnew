# Tythas Digital website

Marketing site for Tythas Digital: homepage, 7 service pages with pricing, and a 4-step contact form.

Built with Next.js 15 (App Router), React 19, Tailwind CSS 4 and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage: canvas hero, services grid, process, team, work, CTA |
| `/services/[slug]` | One template for all 7 services, fed by `src/lib/services.ts` |
| `/contact` | 4-step contact form (services, budget, timeline, contact) |
| `/api/contact` | Receives form leads and forwards them to a webhook |

Service slugs: `websites-and-apps`, `ui-ux-design`, `seo`, `google-ads`, `chatgpt-ads`, `nfc-cards`, `ai-automation`.

## Where to edit things

- **Prices, plans, benefits, FAQs:** `src/lib/services.ts`. Every service page, the nav dropdown, the homepage grid and the footer read from it.
- **Email, WhatsApp, location, reply time:** `src/lib/site.ts`.
- **Brand colours and font:** `src/app/globals.css` (`@theme` block). Ink `#141E26`, Tythas blue `#1457CB`.
- **Logo files:** `public/brand/`.

## Before launch

1. Set the real WhatsApp number in `src/lib/site.ts` (`whatsappNumber`, `whatsappDisplay`).
2. Replace every `[bracketed]` placeholder (delivery times, results on the work cards, reply time). Search the code for `[`.
3. Add real project images to the work cards on the homepage.
4. Get each client's okay before showing their name on the site.
5. Set `CONTACT_WEBHOOK_URL` (see `.env.example`) so form leads reach you. Without it they only appear in the server logs.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Add `CONTACT_WEBHOOK_URL` under Project → Settings → Environment Variables, then point `tythas.com` at the project.

## Blog (Keystatic)

Editors write posts at `/keystatic`. Posts live in `content/posts/*.mdoc`, images in `public/images/blog`.

- Locally: `npm run dev`, open http://localhost:3000/keystatic. Saves go straight to the files.
- Live site: set these in Vercel → Settings → Environment Variables, then redeploy:
  `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
  Editors sign in with GitHub (they need write access to this repo). Every save is a commit, and Vercel redeploys in about a minute.

## Deploying on Netlify

`netlify.toml` is included. In Netlify: Add new site → Import from GitHub → `Dpatil002/tythasnew` → Deploy.
Add the same environment variables as on Vercel (`CONTACT_WEBHOOK_URL`, the four `KEYSTATIC_*` ones),
and add `https://<your-site>.netlify.app/api/keystatic/github/oauth/callback` as a callback URL on the Keystatic GitHub App.
