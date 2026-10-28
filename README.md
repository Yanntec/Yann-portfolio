# Yann — portfolio

Personal portfolio of Yann, IT specialist and Software developer in Hamburg, .

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

i changed 000.webp to 000.jpg and i renamed the frame folder to framess instead of frames for now to be changed later once i've done my 360 clone.
