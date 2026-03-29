# CLAUDE.md - CSS Architecture

This file covers all styling for the site. Single file: `assets/css/style.css` (~1710 lines).

## Rules (inherited)

- Always use `| relative_url` on internal links and asset paths
- No em-dashes in any content (including CSS content strings)
- Never push to remote

## Section Map

The CSS file is organized into 18 sections with comment markers:

1. Design Tokens (Custom Properties)
2. CSS Reset / Normalize
3. Typography
4. Layout Utilities
5. Skip Navigation
6. Site Header & Navigation
7. Site Footer
8. Hero Sections
9. Card Components
10. CTA Blocks
11. Blog Post Styles
12. Landing Page Styles
13. Status Badges
14. Social Links
15. Buttons
16. Page Layout
17. Accessibility & Motion
18. Responsive Breakpoints

When adding styles, place them in the correct section. Never append to the end of the file without checking where the style belongs.

## Design Tokens (key values)

### Colors

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-plum` | `#2e1a2e` | Primary brand color |
| `--color-gold` | `#c9a833` | **CTA buttons and accents ONLY** |
| `--color-olive` | `#6b7a3a` | Secondary accent |
| `--color-terracotta` | `#c48a78` | Warm accent |
| `--color-bg-page` | `#f5f0e2` | Page background |
| `--color-bg-card` | `#faf7ee` | Card backgrounds |
| `--color-text-heading` | `#1a1418` | Heading text |
| `--color-text-body` | `#4a4240` | Body text |
| `--color-text-muted` | `#8a8280` | Secondary/muted text |

### Typography

| Token | Value |
|-------|-------|
| `--font-heading` | `'Playfair Display', Georgia, serif` |
| `--font-body` | `'Source Sans Pro', -apple-system, sans-serif` |
| `--font-size-base` | `1rem` (18px) |

### Spacing

Scale: `--space-xs` (0.25rem) through `--space-3xl` (4rem).

### Layout

| Token | Value |
|-------|-------|
| `--max-width` | `1392px` (.container) |
| `--max-width-narrow` | `720px` (.container--narrow) |
| `--max-width-wide` | `960px` (.container--wide) |

## Color Constraint

**`--color-gold` (#c9a833) is for CTA buttons with white text ONLY.** It passes WCAG AA at that size. Never use accent colors for body text or small text.

## Naming Convention

BEM-influenced: `.block__element--modifier`

Examples: `.post__title`, `.cta-block--primary`, `.course-card__status--active`

## Responsive Breakpoints

Mobile-first. Base styles apply to all screens.

| Breakpoint | Triggers |
|-----------|----------|
| `600px` | 2-column grids |
| `768px` | Nav visible (hamburger hidden), h1/h2 scale up |
| `1024px` | 3-column grids, full desktop layout |

## Accessibility

- Skip-nav link (`.skip-nav`) for keyboard users
- `:focus-visible` outlines on interactive elements
- `prefers-reduced-motion` -- disables transitions/animations

## Growth Threshold

If the file approaches ~2000 lines, split into SASS `@import` partials following the section map above. This is a planned migration, not urgent.

## Skills to Invoke

- **Any CSS change:** Run `/code-review` before output (mandatory) -- use the `css-less-sass` reference guide
- **Design token or color changes:** Invoke `ui-ux-pro-max` for palette recommendations and accessibility compliance
- **New component or layout styling:** Invoke `frontend-design` for distinctive aesthetics, `ui-ux-pro-max` for spacing/typography rules
- **Performance work (file size, render-blocking):** Invoke `perf`
- **Accessibility audit:** Invoke `ui-ux-pro-max` (accessibility rules are CRITICAL priority in that skill)

## Deep-Dive Reference

- [css-architecture.md](../../.claude/documentation/css-architecture.md) -- full token table, component class inventory, responsive strategy details
