# alfatta.dev

My personal website, portfolio, and blog — a place to share the software I work on, my experience, and things I learn along the way.

I'm **Alfatta Rezqa**, a software developer with a frontend focus and a full-stack toolkit.

**[Visit alfatta.dev](https://alfatta.dev)**

## What's here

- **[Home](https://alfatta.dev/)** — an introduction, current work, experience highlights, featured professional work, and recent writing.
- **[About](https://alfatta.dev/about/)** — my engineering background, teaching and mentoring experience, toolkit, and side projects.
- **[Blog](https://alfatta.dev/blog/)** — notes on frontend development, Vue, personal tooling, and lessons from building software. Also available via [RSS](https://alfatta.dev/rss.xml).
- **[Uses](https://alfatta.dev/uses/)** — an illustrated inventory of my daily-driver gear, development tools, and favorite coding font.
- **[Contact](https://alfatta.dev/contact/)** — ways to reach me and connect elsewhere online.

The portfolio includes my contributions to **Ajaib Terminal**, a desktop stock trading application built with the Ajaib team, and **PixRelay**, an image processing service.

## A little personality

The site takes inspiration from retro desktops: window-style panels, pixel-art illustrations, and monospace typography. It's a personal corner of the web for both the work and the person behind it.

Layouts use a 1200px content cap, compact panel padding, and 40px section spacing (30px on mobile). Article reading widths stay constrained independently.

Motion uses **GSAP + ScrollTrigger**: masked hero-title lines, a layered workstation assembly and screen-boot sequence, window-opening reveals, staggered cards, and scroll-linked project artwork. Fine-pointer desktop layouts also get layered parallax, artwork tilt, and lightly magnetic buttons; touch layouts omit pointer-following effects. The shared choreography lives in `src/scripts/site-motion.ts`, imported by `SiteLayout.astro`. `data-reveal` opts elements into entrances; `data-depth` enables pointer depth on artwork, and `data-scroll-art` marks its separate scroll-motion wrapper. Content remains visible without JavaScript, keyboard focus completes an entrance immediately, and GSAP's media contexts revert animations and remove pointer listeners when reduced motion is enabled. Scrolling stays native; no pinning or scroll hijacking.

The workstation assembles over roughly 2.2 seconds (1.05 seconds per layer, staggered by 0.14 seconds), then the screen boots and code appears.

Built with Astro and Tailwind CSS, with Markdown and MDX for writing.

## Inside the site

- `src/pages/` composes the pages; `src/layouts/` provides the shared site and article layouts.
- `src/data/profile.ts` holds profile details, typed contact links, and portfolio projects. `src/data/experience.ts` holds career history and the selectors that preserve its curated order.
- `src/components/` contains the reusable UI, including the shared window bar and theme toggle. Theme initialization stays in the document head so the saved preference is applied before the page appears.
- `src/content/blog/` contains the writing; shared colors, typography, and layout styles live in `src/styles/global.css`.
- `src/components/BaseHead.astro` loads the deferred Umami Cloud tracker and the asynchronous Ahrefs Analytics script on every page.
- Direct email links live on `/contact/`; the shared footer links to that page so Cloudflare's email obfuscation URL is not repeated across the site.

## Analytics

The shared document head includes the Ahrefs Analytics bootstrap, which appends `https://analytics.ahrefs.com/analytics.js` asynchronously using the configured public site key. It runs alongside Umami without changing Umami's event tracking.

Umami keeps its automatic pageviews. `src/scripts/analytics.ts` additionally sends `page_load` once after each document's `load` event, including individual blog articles.

| Event | Interaction |
| --- | --- |
| `navigation_click` | Logo, main navigation, skip-to-content, footer Contact |
| `theme_change` | Theme toggle; records the applied theme |
| `cta_click` | Hero, About/Experience previews, experience rows, All posts, Contact banners, Contact signoff |
| `project_link_click` | Project destinations, including Ajaib Terminal and PixRelay |
| `experience_link_click` | Work/teaching links and LinkedIn experience |
| `post_click` | Article cards on Home and Blog, Manjaro guide link in the About toolkit |
| `article_link_click` | Article body links, author, and back-to-blog |
| `email_click` | Email address and email CTA on Contact |
| `social_click` | Social profiles on About, Contact, and the footer |
| `rss_click` | Blog and footer RSS links |
| `affiliate_link_click` | Shopee gear links in Uses (`uses-hardware`) |
| `software_link_click` | Development tool and font links in Uses (`uses-software`) |

Every custom event includes `page_path` and `page_type`; article pages also include `post_slug`. Click events add `location`, `element_id`, and, for links, `destination`. Relevant events also include `project_id`, `platform`, `theme`, or the clicked article's `post_slug`. Destinations omit query values; non-HTTP destinations record only their protocol, such as `mailto:`.

Mark new links/buttons with `data-track-event` and a stable `data-track-id`; set `data-track-location` on the control or a surrounding region. Optional `data-track-post-slug`, `data-track-project-id`, and `data-track-platform` attach event-specific data. Article body links are handled automatically through `data-track-article`.

A single delegated handler records primary/keyboard clicks and middle-clicked links without delaying navigation. It reads the theme after the toggle's handler runs and waits for the Umami script when necessary. Do not also add `data-umami-event` to these controls: that would record the same click twice. Decorative areas are not tracked.
