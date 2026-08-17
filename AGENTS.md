<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Brand — Ranjana Jewellers

- **Colors**: brand values given as CMYK(0, 28.21, 41.03, 84.71) / HEX `271C17` / RGB(39, 28, 23) all decode to the same color — a deep brown-black. Defined in `app/globals.css` as `--color-ink: #271c17`. Theme is built around shades of pink derived from it (`--color-pink-50` through `--color-pink-950`, light blush to a dark rose blended toward `--color-ink`). Single light theme — no dark-mode variant.
- **Fonts**: Fraunces (headings, `h1`-`h6`) + IBM Plex Sans (body/UI). Loaded via `next/font/google` in `app/layout.tsx` as `--font-fraunces` / `--font-ibm-plex-sans`, wired into Tailwind as `font-serif` / `font-sans` in `app/globals.css`.
- **Animation**: Framer Motion + GSAP for interactive/scroll animations. Not installed yet — add with `npm install framer-motion gsap` when the first animated component needs them.
