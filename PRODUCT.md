# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Visitors who want to know who Alfatta Rezqa is and what he can do:
- Recruiters and hiring managers evaluating him.
- Prospective clients and collaborators.
- Developers reading the blog or the Uses page.
- Peers and the wider developer community.

All four audiences were confirmed. The primary one was not ranked.

## Product Purpose
Personal website, portfolio and blog of Alfatta Rezqa, a software developer with a frontend focus and a full-stack toolkit (8+ years of experience). It shows the software he works on, his experience and what he learns along the way. The action that matters most is that a visitor contacts him.

## Positioning
Open decision: the user did not state a distinguishing claim. The repo supplies a hypothesis, not confirmed fact: a personal site with real professional work (Ajaib Terminal, PixRelay), writing on frontend and Vue, and a retro-desktop personality.

## Operating Context
- Pages: Home, About, Blog (with RSS), Uses (illustrated gear and tool inventory), Contact.
- Content lives in `src/data/profile.ts`, `src/data/experience.ts` and `src/content/blog/` (Markdown and MDX).
- Analytics: Umami and Ahrefs Analytics. Conversion events are tracked per README, e.g. `cta_click` and `email_click`.

## Capabilities and Constraints
- Stack: Astro 6, Tailwind CSS 4, MDX, GSAP and ScrollTrigger, deployed at https://alfatta.dev. The stack is existing and settled.
- Layout contract (README): 1200px content cap, 40px section spacing (30px on mobile), reading widths for articles constrained independently.
- Motion contract (README): content stays visible without JavaScript, keyboard focus completes an entrance immediately, and pointer-following effects are omitted on touch.
- Theme preference is applied in the document head before first paint.
- Direct email links live only on `/contact/`; the footer links to that page (Cloudflare email obfuscation).

## Evidence on Hand
- Real work: Ajaib Terminal (desktop trading app built with the Ajaib team; React, Tauri, Rust, WebSocket), PixRelay (image processing service), a career history, four blog posts, and a Uses page.
- No testimonials, client logos, metrics or availability statement exist in the repo. Do not fabricate them.

## Product Principles
- Contact is the conversion; every page should make reaching him obvious.
- Show real work and real writing, never invented proof.
- Stay legible and usable without JavaScript, with keyboard access and reduced motion.
- One person's voice: first-person, plain and specific.

## Brand Commitments
Name: Alfatta Rezqa. The existing retro-desktop identity (window-style panels, pixel-art illustration, monospace type) is incumbent. The user did not state whether it is binding, so it is not recorded as a commitment.
