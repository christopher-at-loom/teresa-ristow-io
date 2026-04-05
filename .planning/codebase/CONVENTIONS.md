# Coding Conventions

**Analysis Date:** 2026-04-04

## Naming Patterns

**Files:**
- HTML pages: `kebab-case.html` (e.g., `structured-hiring.html`, `about.html`)
- Blog posts: `YYYY-MM-DD-slug.html` (e.g., `2026-03-28-welcome.html`)
- Includes: `kebab-case.html` (e.g., `cta-block.html`, `course-card.html`)
- Layouts: `kebab-case.html` (e.g., `default.html`, `landing.html`)
- Data files: `kebab-case.yml` (e.g., `navigation.yml`, `courses.yml`)
- JS files: `kebab-case.js` (e.g., `main.js`, `sample-chart.js`)
- Images: `{context}-{slug}-{orientation}.{ext}` (e.g., `post-hiring-landscape.jpg`)
- Documentation: `kebab-case.md` (e.g., `css-architecture.md`)

**CSS Classes:**
- BEM-influenced notation: `.block__element--modifier`
- Examples: `.post__title`, `.cta-block--primary`, `.course-card__features`, `.site-header__toggle`, `.sample-chart__bar`
- Meaningful names tied to component purpose, not visual properties

**Liquid/HTML:**
- Element IDs: lowercase with hyphens (e.g., `id="main-content"`)
- Data attributes: `data-component="sample-chart"`, `data-props='{"label":"Test"}'`
- ARIA attributes: lowercase (e.g., `aria-expanded`, `aria-label`)

**JavaScript:**
- Variables: `camelCase` (e.g., `toggle`, `nav`, `expanded`, `maxVal`)
- Functions: `camelCase` (e.g., `SampleChart`, `MyComponent`)
- Constants: uppercase with underscores (implicit; not used in codebase)

## Code Style

**Formatting:**
- Indentation: 2 spaces (HTML, CSS, Liquid)
- Line length: No hard limit enforced
- No trailing whitespace (inherited constraint)
- No em-dashes in any content including CSS strings

**Linting:**
- No automated linting (Prettier, ESLint, etc.)
- Manual code review via `/code-review` skill before any code output (mandatory per CLAUDE.md)

**Liquid Conventions:**
- Always use `| relative_url` filter on internal links and asset paths
- Template variables: lowercase (e.g., `{{ page.title }}`, `{{ site.title }}`)
- Include parameters: lowercase (e.g., `include.headline`, `include.style`)
- Use `{% unless condition %}` for negative conditionals
- Guard clauses: check for nil/undefined (e.g., `{% if include.headline %}`)

**HTML Conventions:**
- Semantic elements preferred (e.g., `<main>`, `<article>`, `<section>`)
- Data attributes for JS hooks: `data-component`, `data-props`, `data-*`
- Alt text on all images (mandatory)
- Width/height on all images to prevent layout shift (mandatory)
- Loading: `eager` for above-fold, `lazy` for below-fold images
- Responsive images use `<picture>` element via `responsive-image.html` include for art-directed mobile/desktop
- Boolean attributes written without value (e.g., `defer`, not `defer="defer"`)

## Import Organization

**Liquid includes order (in templates/layouts):**
1. System includes (head, header)
2. Component includes (content, cards)
3. Footer and meta includes

**Example from `default.html`:**
```html
{% include head.html %}
{% include header.html %}
<main id="main-content" class="site-main">
  {{ content }}
</main>
{% include footer.html %}
{% include json-ld.html %}
<script src="{{ '/assets/js/main.js' | relative_url }}" defer></script>
```

**Path aliases:**
- No path aliases used (Jekyll lacks built-in aliasing)
- All paths use `| relative_url` filter for portability
- Asset paths: `{{ '/assets/...' | relative_url }}`
- Page URLs: `{{ page.url | relative_url }}`

## Error Handling

**JavaScript Pattern:**
- Guard clauses check for element existence before using: `if (toggle && nav) { ... }`
- React component guard: check `typeof React === 'undefined'` with `console.warn()` fallback
- JSON parsing wrapped in try-catch with `console.warn()` on error
- No silent failures; always log warnings via `console.warn()`

**Examples from codebase:**
```javascript
// main.js - guard clause
var toggle = document.querySelector('.site-header__toggle');
var nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', function() { ... });
}

// sample-chart.js - React guard
if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
  console.warn('React not loaded. Skipping sample-chart component.');
  return;
}

// sample-chart.js - JSON parsing
try {
  props = JSON.parse(el.getAttribute('data-props') || '{}');
} catch(e) {
  console.warn('Invalid data-props JSON:', e);
}
```

**Liquid error handling:**
- No explicit error throwing (static generation phase)
- Defensive conditionals: `{% if variable %}`
- Default filters: `{{ include.style | default: 'primary' }}`

## Logging

**Framework:** Vanilla `console` (no logger library)

**Patterns:**
- `console.warn()` for non-fatal issues and guards
- Used in React components to signal missing dependencies or bad data
- Used in JavaScript to signal guard clause activation
- No info/log/error levels; all issues logged as warnings

**When to log:**
- React/DOM dependencies missing
- Invalid JSON in data attributes
- User interaction guards firing (rare)

## Comments

**When to Comment:**
- Significant behavioral blocks (mobile nav toggle, event handlers)
- Complex Liquid logic (none observed in codebase)
- Explaining why, not what (code should be self-documenting)

**JSDoc/TSDoc:**
- Not used (no TypeScript; JavaScript is minimal)
- Inline comments for clarity where needed
- Liquid templates are self-documenting via include parameter names

## Function Design

**Size:** Small, focused functions
- `main.js` functions: inline within event listeners (2-3 lines each)
- React components: single responsibility (one chart, one card, etc.)

**Parameters:**
- React component props passed via `data-props` JSON string
- Include parameters via Liquid: `{{ include.headline }}`
- Event handlers receive event object: `function(e) { ... }`

**Return Values:**
- React components return `React.createElement()` nodes
- Event handlers return void (side effects only)
- Helper functions (none observed) would return computed values

## Module Design

**Exports:**
- No module exports (IIFE pattern; everything scoped to function)
- React components mounted by selector within their own IIFE
- Global JS (main.js) uses IIFE to avoid polluting global scope

**Barrel Files:**
- Not used (Jekyll doesn't support barrel exports)
- Single responsibility per file

**Include Pattern (Shopify-like):**
```liquid
{% include cta-block.html 
  headline="Get Started"
  description="Learn more about our courses"
  button_text="Enroll"
  button_url="/courses"
  style="primary"
%}
```

- Includes are parameterized via `include.*` variables
- No nested include parameter passing (use `{% capture %}` if curly braces needed)
- Includes are reusable across layouts and pages

## Design Tokens

**CSS Custom Properties (located in `assets/css/style.css` `:root`):**

**Colors:**
- `--color-plum: #2A2A2A` (primary dark/charcoal)
- `--color-gold: #C44A2F` (CTA accent — **NEVER for body text**, 4.6:1 contrast on white)
- `--color-olive: #5E6E30` (secondary accent)
- `--color-terracotta: #D98B6E` (warm accent)
- `--color-purple-muted: #7E7EB0` (muted lavender)
- `--color-bg-page: #EBF5ED` (soft mint page background)
- `--color-bg-card: #F5F0EA` (warm cream card background)
- `--color-text-heading: #2A2A2A` (charcoal headings)
- `--color-text-body: #3A3A3A` (dark gray body text)
- `--color-text-muted: #555555` (medium gray secondary text)

**Typography:**
- `--font-heading: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- `--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- `--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace`

**Font Size Scale (rem-based, 4px unit):**
- `--text-2xs: 0.5625rem`, `--text-xs: 0.6875rem`, `--text-sm: 0.8125rem`, `--text-base: 1rem`
- `--text-lg: 1.125rem`, `--text-xl: 1.25rem`, `--text-2xl: 1.5rem`, `--text-3xl: 1.875rem`
- `--text-4xl: 2.25rem`, `--text-5xl: 3rem`

**Spacing Scale (4px base):**
- `--space-1: 0.25rem` (4px), `--space-2: 0.5rem` (8px), `--space-3: 0.75rem` (12px), `--space-4: 1rem` (16px)
- Continues through `--space-24: 6rem` (96px)

**Layout:**
- `--max-width: 1392px` (container)
- `--max-width-content: 720px` (narrow content)
- `--max-width-wide: 960px` (wide content)

## Accessibility

**ARIA:**
- `aria-expanded="true|false"` on toggles (e.g., mobile nav button)
- `aria-label` on icon buttons without visible text
- Skip navigation link included in all pages

**Focus Management:**
- `:focus-visible` outline applied to all interactive elements
- On mobile nav close, focus returned to toggle button: `toggle.focus()`

**Keyboard Navigation:**
- Escape key closes mobile nav
- All interactive elements keyboard-accessible

**Motion:**
- `prefers-reduced-motion: reduce` respected (CSS section 20)
- Transitions/animations disabled when user requests reduced motion

## Responsive Breakpoints

Mobile-first approach. Base styles apply to all screens.

**Breakpoints (CSS section 21):**
- `600px`: 2-column grids, layout shifts
- `768px`: Navigation becomes visible (hamburger hidden), heading font scales
- `1024px`: 3-column grids, full desktop layout

All media queries use `@media (min-width: XXpx)`

---

*Convention analysis: 2026-04-04*
