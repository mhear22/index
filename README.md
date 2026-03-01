# Site Index

A Vue 3 + TypeScript site that lists all the projects you host.

## Quick start

```bash
npm install
npm run dev
```

## Edit your site list

Update project entries in:

- `src/data/projects.ts`

Each item includes:

- `name`
- `url`
- `description`
- `stack`
- `status`
- `tags`

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in Vercel.
3. Keep defaults (`Build Command: npm run build`, `Output Directory: dist`) and deploy.

You can also deploy from terminal:

```bash
npx vercel
npx vercel --prod
```
