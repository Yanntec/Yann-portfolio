# Yann — portfolio

Personal portfolio of Yann, software engineer and IT systems specialist in Kigali, Rwanda.

A 3D clone turns 360° as you scroll while the résumé types itself in, followed by a clone reel, skills, projects and contact.

## Structure

```
index.html        the whole site (HTML, CSS and JS in one file)
frames/           120 WebP frames of the 360° turn (000–119)
clone.mp4         clone reel (muted, loops when visible)
clone-poster.jpg  reel poster frame
vercel.json       caching and security headers
```

No build step and no dependencies. Fonts load from Google Fonts.

## Deploy on Vercel

- **From GitHub:** Vercel → Add New → Project → import this repo → Framework preset **Other** → Deploy.
- **From your computer:** in this folder run `npx vercel --prod`.

## Run locally

```
npx serve .
```

Opening `index.html` directly from disk also works.
