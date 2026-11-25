---
name: alfatta.dev
description: A retro-workstation portfolio of windowed panels, hard offset shadows, pixel display type and cool navy ink on cream paper.
colors:
  accent: "#315f8d"
  paper: "#f8f6ef"
  surface: "#fffdf7"
  ink: "#193756"
  muted: "#536b80"
  blue: "#d6e5f3"
  blue-deep: "#b4cfe7"
  line: "#8d9eac"
  shadow: "#a3bdd3"
  accent-dark: "#a8cdeb"
  paper-dark: "#111e30"
  surface-dark: "#17283d"
  ink-dark: "#deebfa"
  muted-dark: "#a4bad1"
  blue-dark: "#263f5c"
  blue-deep-dark: "#365779"
  line-dark: "#647e99"
  shadow-dark: "#080f1b"
typography:
  display:
    fontFamily: "VT323, monospace"
    fontSize: "clamp(64px, 9vw, 90px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.01em"
  headline:
    fontFamily: "VT323, monospace"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.01em"
  title:
    fontFamily: "Maple Mono, monospace"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Maple Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Maple Mono, monospace"
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "1.3px"
rounded:
  none: "0px"
spacing:
  section: "40px"
  section-mobile: "30px"
  panel: "22px"
  panel-mobile: "18px"
  gutter: "24px"
components:
  button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
    height: "43px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  window:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "22px"
  window-bar:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.ink}"
    padding: "8px 13px"
  label-chip:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "2px 9px"
---

# Design System: alfatta.dev

## Overview

**Creative North Star: "The Retro Workstation"**

The site is an 8-bit workbench for a working developer. Content sits in windows with title bars and window controls, and the display type is pixel VT323. Everything else is set in Maple Mono, a coding font. The palette is cream paper with navy ink and one steel-blue accent, a drafting-sheet look rather than a neon-terminal one. Depth is hard, offset and unblurred, like a window dropped on a desktop. The personality is a tidy desk with real work on it, not a joke costume.

Density is compact and fixed. Body copy is 14px monospace, panel padding is 22px, and sections are 40px apart. Motion is mechanical: stepped easings for screens booting and layers assembling, and `power3.out` for entrances and hovers. Nothing is soft, rounded or glossy.

**Key Characteristics:**
- Content lives in bordered windows with a tinted title bar.
- Hard offset shadows, never blurred.
- Pixel display type over monospace body; uppercase micro-labels.
- Zero border radius everywhere.
- A single steel-blue accent; the rest is navy ink on cream.
- Light and dark themes with the same structure. Dark is a deep navy, not black.

## Colors

Cool navy and steel blue on warm cream. The warmth lives only in the paper, so the page reads as drafting stock under blue ink. Dark theme keeps the hues and swaps light for dark. Values below are the light theme; dark counterparts are the `-dark` tokens in the frontmatter.

### Primary
- **Steel Ink Blue** (#315f8d; dark #a8cdeb): the only accent. Primary button fill, link hover, focus ring, active nav underline, and the pixel grid tint at 7% opacity.

### Neutral
- **Drafting Paper** (#f8f6ef; dark #111e30): page ground.
- **Bright Sheet** (#fffdf7; dark #17283d): window and button surface, lifted slightly off the paper.
- **Navy Ink** (#193756; dark #deebfa): body text and button borders.
- **Slate Muted** (#536b80; dark #a4bad1): captions, eyebrows, secondary copy.
- **Pale Window Blue** (#d6e5f3; dark #263f5c): title bars and label chips.
- **Pressed Window Blue** (#b4cfe7; dark #365779): text selection.
- **Hairline Slate** (#8d9eac; dark #647e99): window borders and dashed link underlines.
- **Dropped Shadow Blue** (#a3bdd3; dark #080f1b): hard offset shadows only.

### Named Rules
**The One Accent Rule.** Steel Ink Blue is the only accent. Do not add a second hue; hierarchy comes from ink, muted, and blue tints.

**The Paper-Not-White Rule.** Grounds are warm cream (#f8f6ef, #fffdf7), never pure white. Text is navy ink, never pure black.

## Typography

**Display Font:** VT323 (with monospace)
**Body Font:** Maple Mono (with monospace)
**Label/Mono Font:** Maple Mono, small and uppercase

**Character:** A pixel screen face for headings paired with a friendly coding font for everything you read. The contrast between the two is the whole typographic idea.

### Hierarchy
- **Display** (400, clamp(64px, 9vw, 90px), 1.1): page `h1`, uppercase, VT323.
- **Headline** (400, 42px, 36px on mobile, 1.1): section titles, uppercase, VT323.
- **Title** (700, 16px, 1.1): card and item headings, Maple Mono.
- **Body** (400, 14px, 1.75): all running text. Page-heading paragraphs cap at 620px.
- **Label** (700, 9-10px, 0.7-1.3px tracking, uppercase): eyebrows, chips, buttons, text links. Window-bar titles use 11px bold, not uppercase.

### Named Rules
**The Pixel Is For Headings Rule.** VT323 appears only on `h1` and section `h2`, always uppercase. Window titles and everything else stay in Maple Mono.

**The No Synthesis Rule.** VT323 ships one weight (400), so `font-synthesis: none` stays on and display type is never bolded.

## Layout

A single centered column capped at 1200px (`min(1200px, 100% - 48px)`), with 20px gutters at 900px and 16px at 600px. Sections stack with 40px between them (30px on mobile). Panels use 22px internal padding (18px on mobile). Card groups are grids with 16px gaps: three columns for posts, collapsing to one at 600px. Page headings sit in a narrow block (max 750px) above content windows. Article reading widths are constrained independently of the 1200px cap. The header is 72px tall (80px on mobile, where it wraps) with a 1px bottom border and the nav on one line.

## Elevation & Depth

Depth is flat-graphic. Windows and buttons carry a hard offset shadow with no blur, in a pale blue on light and near-black on dark. Hover lifts a button (the shadow grows and the button shifts up-left); active presses it (the button shifts down-right and the shadow shrinks to 1px). Fine-pointer desktops get artwork parallax and slight magnetic pull on buttons; none of this appears on touch.

### Shadow Vocabulary
- **Window** (`box-shadow: 4px 4px 0 var(--shadow)`): windows and large panels.
- **Button rest** (`3px 3px 0 var(--shadow)`): buttons.
- **Button hover** (`4px 5px 0 var(--shadow)`) with `translate(-1px, -2px)`.
- **Button pressed** (`1px 1px 0 var(--shadow)`) with `translate(2px, 2px)`.

### Named Rules
**The No-Blur Rule.** Shadows have zero blur and zero spread. If it softens, it isn't this system.

## Shapes

Square, always. Zero radius on windows, buttons, chips and window controls. Structure comes from 1px hairline borders (Hairline Slate on windows and chips, Navy Ink on buttons). Window controls are 15px boxed squares. Section text links use a dashed hairline underline. The grid texture (1px lines at 7% accent) appears on illustrated artwork panels as a graph-paper motif.

## Components

### Buttons
- **Shape:** Square, 1px Navy Ink border, min-height 43px.
- **Default:** Bright Sheet fill, navy ink, 10px uppercase bold, 10px 20px padding, 3px hard shadow.
- **Primary:** Steel Ink Blue fill with paper-colored text.
- **Hover / Active:** Lifts up-left with a larger shadow on hover; presses down-right with a 1px shadow on active. Transitions run 0.15s. Magnetic pull applies on fine pointers.

### Windows (signature)
- **Structure:** 1px Hairline Slate border, Bright Sheet fill, 4px hard shadow.
- **Title bar:** 8px 13px padding, Pale Window Blue fill, 1px bottom border, 11px bold filename-style title (e.g. `ajaib-terminal.app`) beside three 15px window-control squares.
- **Content:** 22px padding (18px mobile).

### Chips / Labels
- Pale Window Blue fill, 1px Hairline Slate border, 2px 9px padding, 9px bold uppercase, 0.7px tracking.

### Links
- **Text link:** 10px uppercase bold, dashed hairline underline, trailing arrow that moves 3px on hover or focus, color shifts to accent.
- **Inline link:** inherits color, underline offset 5px.

### Navigation
- Pixel monitor icon plus `alfatta.rezqa` wordmark (16px bold, tight tracking) with a 9px tracked "SOFTWARE DEVELOPER" sublabel. Nav links are 12px; hover, focus and the current page show a 2px accent underline that scales in from the left over 0.2s. The theme toggle sits last. On mobile the header wraps and links drop to 10px.

## Do's and Don'ts

### Do:
- **Do** put grouped content in a window with a title bar, 1px hairline border and 4px hard shadow.
- **Do** use VT323 uppercase only for `h1` and section `h2`; set everything else in Maple Mono.
- **Do** keep corners square (0 radius) and shadows unblurred.
- **Do** use `--accent` as the sole accent and read all colors from the CSS custom properties so both themes work.
- **Do** use the 3px solid accent focus ring with 5px offset on every interactive element.
- **Do** keep content visible without JavaScript, and respect `prefers-reduced-motion`.

### Don't:
- **Don't** use border radius, blurred or soft shadows, gradients as fills, or glass effects.
- **Don't** bold VT323 or use it for body or UI text.
- **Don't** introduce a second accent hue, pure white, or pure black.
- **Don't** apply pointer-following motion on touch layouts.
