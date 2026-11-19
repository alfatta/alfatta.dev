# alfattarezqa.com

My personal website, portfolio, and blog — a place to share the software I work on, my experience, and things I learn along the way.

I'm **Alfatta Rezqa**, a software developer with a frontend focus and a full-stack toolkit.

**[Visit alfattarezqa.com](https://alfattarezqa.com)**

## What's here

- **[Home](https://alfattarezqa.com/)** — an introduction, current work, experience highlights, featured professional work, and recent writing.
- **[About](https://alfattarezqa.com/about/)** — my engineering background, teaching and mentoring experience, toolkit, and side projects.
- **[Blog](https://alfattarezqa.com/blog/)** — notes on frontend development, Vue, personal tooling, and lessons from building software. Also available via [RSS](https://alfattarezqa.com/rss.xml).
- **[Contact](https://alfattarezqa.com/contact/)** — ways to reach me and connect elsewhere online.

The portfolio includes my contributions to **Ajaib Terminal**, a desktop stock trading application built with the Ajaib team, and **PixRelay**, an image processing service.

## A little personality

The site takes inspiration from retro desktops: window-style panels, pixel-art illustrations, and monospace typography. It's a personal corner of the web for both the work and the person behind it.

Motion uses **GSAP + ScrollTrigger**: masked hero-title lines, a layered workstation assembly and screen-boot sequence, window-opening reveals, staggered cards, and scroll-linked project artwork. Fine-pointer desktop layouts also get layered parallax, artwork tilt, and lightly magnetic buttons; touch layouts omit pointer-following effects. The shared choreography lives in `src/scripts/site-motion.ts`, imported by `SiteLayout.astro`. `data-reveal` opts elements into entrances; `data-depth` enables pointer depth on artwork, and `data-scroll-art` marks its separate scroll-motion wrapper. Content remains visible without JavaScript, keyboard focus completes an entrance immediately, and GSAP's media contexts revert animations and remove pointer listeners when reduced motion is enabled. Scrolling stays native; no pinning or scroll hijacking.

The workstation assembles over roughly 2.2 seconds (1.05 seconds per layer, staggered by 0.14 seconds), then the screen boots and code appears.

Built with Astro and Tailwind CSS, with Markdown and MDX for writing.

## Inside the site

- `src/pages/` composes the pages; `src/layouts/` provides the shared site and article layouts.
- `src/data/profile.ts` holds profile details, typed contact links, and portfolio projects. `src/data/experience.ts` holds career history and the selectors that preserve its curated order.
- `src/components/` contains the reusable UI, including the shared window bar and theme toggle. Theme initialization stays in the document head so the saved preference is applied before the page appears.
- `src/content/blog/` contains the writing; shared colors, typography, and layout styles live in `src/styles/global.css`.
