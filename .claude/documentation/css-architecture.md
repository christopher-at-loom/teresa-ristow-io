# CSS Architecture

**File:** `assets/css/style.css` (single file, ~1035 lines)

## Table of Contents (mirrors file sections)

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

## Design Tokens

### Colors

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-primary` | `#2D3E50` | Headings, header text, dark backgrounds |
| `--color-cta` | `#A65971` | CTA buttons only (not body text) |
| `--color-cta-hover` | `#8f4c62` | CTA button hover state |
| `--color-bg-warm` | `#F9F6F3` | Warm background sections |
| `--color-bg-cool` | `#F5F7F6` | Cool background sections, code bg |
| `--color-white` | `#ffffff` | Page background |
| `--color-text` | `#2D3E50` | Body text (same as primary) |
| `--color-text-light` | `#5A6B7A` | Secondary text, meta, captions |
| `--color-border` | `#E2E6EA` | Borders, dividers |
| `--color-black` | `#1a1a1a` | Reserved |

**Constraint:** `#A65971` is CTA-only. Never use for body text or decorative elements. White text on `#A65971` passes WCAG AA.

### Typography

| Token | Value | Purpose |
|-------|-------|---------|
| `--font-heading` | `Georgia, "Times New Roman", serif` | All headings (h1-h6) |
| `--font-body` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | Body text |
| `--font-mono` | `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace` | Code blocks |

### Font Size Scale

| Token | Value |
|-------|-------|
| `--text-xs` | `0.75rem` |
| `--text-sm` | `0.875rem` |
| `--text-base` | `1rem` |
| `--text-lg` | `1.125rem` |
| `--text-xl` | `1.25rem` |
| `--text-2xl` | `1.5rem` |
| `--text-3xl` | `1.875rem` |
| `--text-4xl` | `2.25rem` |
| `--text-5xl` | `3rem` |

### Spacing Scale (4px base)

| Token | Value |
|-------|-------|
| `--space-1` | `0.25rem` (4px) |
| `--space-2` | `0.5rem` (8px) |
| `--space-3` | `0.75rem` (12px) |
| `--space-4` | `1rem` (16px) |
| `--space-5` | `1.25rem` (20px) |
| `--space-6` | `1.5rem` (24px) |
| `--space-8` | `2rem` (32px) |
| `--space-10` | `2.5rem` (40px) |
| `--space-12` | `3rem` (48px) |
| `--space-16` | `4rem` (64px) |
| `--space-20` | `5rem` (80px) |
| `--space-24` | `6rem` (96px) |

### Layout

| Token | Value | Purpose |
|-------|-------|---------|
| `--max-width` | `1200px` | `.container` default |
| `--max-width-content` | `720px` | `.container--narrow`, post/page content |
| `--max-width-wide` | `960px` | `.container--wide` |

### Other Tokens

| Token | Value |
|-------|-------|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `12px` |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` |
| `--transition-fast` | `150ms ease` |
| `--transition-base` | `250ms ease` |

## Layout System

- `.container` -- max-width 1200px, auto margins, horizontal padding
- `.container--narrow` -- max-width 720px (for content)
- `.container--wide` -- max-width 960px
- `.grid` -- CSS Grid with `--space-6` gap
- `.grid--2` -- 1 col mobile, 2 cols at 600px
- `.grid--3` -- 1 col mobile, 3 cols at 1024px
- `.flex`, `.flex--center`, `.flex--between`, `.flex--wrap` -- Flexbox utilities

## Component Class Inventory

| Block | Elements | Modifiers |
|-------|----------|-----------|
| `.site-header` | `__title`, `__toggle`, `__toggle-bar` | `[aria-expanded="true"]` |
| `.site-nav` | `__list`, `__item`, `__link` | `--open`, `__link--active` |
| `.site-footer` | `__content`, `__copyright` | - |
| `.post` | `__header`, `__title`, `__meta`, `__date`, `__author`, `__content` | - |
| `.post-card` | `__title`, `__date`, `__excerpt`, `__link` | - |
| `.page` | `__header`, `__title`, `__content` | - |
| `.course-card` | `__header`, `__title`, `__subtitle`, `__description`, `__features`, `__footer`, `__price` | - |
| `.cta-block` | `__headline`, `__description` | `--primary`, `--secondary` |
| `.landing-hero` | `__headline`, `__subheadline` | - |
| `.landing` | `__content` | - |
| `.landing-features` | `__grid` | - |
| `.landing-feature` | `__title`, `__description` | - |
| `.landing-testimonials` | `__grid` | - |
| `.testimonial` | `__quote`, `__author` | - |
| `.social-links` | `__link` | - |
| `.btn` | - | `--primary`, `--secondary`, `--large` |
| `.badge` | - | `--active`, `--coming-soon`, `--future` |
| `.skip-nav` | - | - |

## Responsive Breakpoints (mobile-first)

| Breakpoint | What changes |
|------------|-------------|
| Base (< 600px) | Single column grids, collapsed nav, column footer |
| 600px | 2-col grids, 2-col features/testimonials, larger container padding |
| 768px | Nav always visible (toggle hidden), row footer, h1 scales to `--text-5xl`, h2 to `--text-4xl`, hero padding increases |
| 1024px | 3-col grids, 3-col features, largest container padding |

## Accessibility Features

- `.skip-nav` -- visually hidden until focused, jumps to `#main-content`
- `:focus-visible` -- 2px solid `--color-cta` outline with 2px offset
- `:focus:not(:focus-visible)` -- removes outline for mouse users
- `@media (prefers-reduced-motion: reduce)` -- kills all animations/transitions, removes hover transforms

## Scaling Strategy

- Section markers as CSS comments (`/* ======= N. Section Name ======= */`)
- Current size: ~1035 lines
- Threshold: ~1500 lines triggers split to SASS `@import` partials
- When splitting: one partial per section, `_sass/` directory, `style.scss` as entry point
