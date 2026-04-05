# Architecture

**Analysis Date:** 2026-04-04

## Pattern Overview

**Overall:** Static site generator (Jekyll 3.10.0) with progressive enhancement. The site is built once during GitHub Actions and served as pure HTML via GitHub Pages CDN. No server-side runtime. Interactive components use React 18 via CDN, loaded only on pages that explicitly request it.

**Key Characteristics:**
- **No build tooling** -- GitHub Pages constraints mandate no preprocessing; CSS custom properties replace SASS, Liquid templating handles logic
- **Liquid-driven data rendering** -- YAML files in `_data/` are the single source of truth; layouts and includes loop over data to generate HTML
- **Layout inheritance** -- All pages descend from `_layouts/default.html`; child layouts add semantic structure
- **Progressive React integration** -- React 18 loads conditionally via CDN; components mount into named DOM elements via attribute-based discovery

## Layers

**Templating Layer:**
- Purpose: Static HTML generation from Liquid templates and content files
- Location: `_layouts/`, `_includes/`, content files (`index.html`, `pages/`, `_posts/`)
- Contains: Layout files (HTML with Liquid), reusable includes (components), content (HTML with Liquid)
- Depends on: `_config.yml`, `_data/` files
- Used by: GitHub Actions Jekyll build → GitHub Pages CDN

**Data Layer:**
- Purpose: Centralized configuration and content metadata
- Location: `_data/` (courses.yml, navigation.yml, social.yml)
- Contains: YAML files defining courses, navigation structure, social media links
- Depends on: YAML syntax, schema validation (informal)
- Used by: Layouts, includes (via `site.data.*` namespace)

**Styling Layer:**
- Purpose: Design system and responsive layout
- Location: `assets/css/style.css` (single file)
- Contains: Custom properties (design tokens), layout utilities, component styles, responsive breakpoints
- Depends on: CSS custom properties, CSS Grid/Flexbox
- Used by: All HTML templates via `<link rel="stylesheet">`

**JavaScript Layer:**
- Purpose: Interactivity, client-side state, and runtime component mounting
- Location: `assets/js/main.js` (global), `assets/js/components/` (React components)
- Contains: Global nav toggle script, React component definitions
- Depends on: React 18 CDN (optional, lazy-loaded), DOM API
- Used by: Pages that include `react-mount.html` or defer-loaded `main.js`

**Asset Layer:**
- Purpose: Static resources and media
- Location: `assets/images/`, `assets/favicon.ico`
- Contains: Images, favicon
- Depends on: Cloudinary CDN (configured in `_config.yml`)
- Used by: Layouts and content files via `relative_url` filter

## Data Flow

**Homepage and Listing Pages:**
```
_data/courses.yml
  → Liquid loop in pages/courses.html
    → {% include course-card.html course=course %}
      → Renders: <div class="course-card">...</div>
```

**Blog Posts:**
```
_posts/*.html (with frontmatter)
  → Jekyll detects + applies post.html layout
    → post.html extends default.html
      → {% include post.html %}
        → Renders: <article class="post">{{ content }}</article>
      → Responsive images via {% include responsive-image.html %}
```

**Navigation:**
```
_data/navigation.yml
  → Included by default.html via header.html
    → {% include nav.html %}
      → Loops: {% for item in site.data.navigation.main %}
        → Checks active state: {% if page.url == item.url %}
```

**State Management:**
- **Build-time:** Jekyll processes all Liquid at build time; no runtime state beyond what's in HTML
- **Client-side:** React components manage state via `useState`; main.js manages nav toggle state via `aria-expanded` attribute
- **Persistence:** Browser's IndexedDB or localStorage could be used (not currently implemented) for client-only state

## Key Abstractions

**Layout Pattern:**
- Purpose: Reusable page structure with shared shell
- Examples: `_layouts/default.html` (master), `_layouts/page.html` (static pages), `_layouts/post.html` (blog), `_layouts/landing.html` (course sales)
- Pattern: YAML frontmatter declares `layout: name`; Jekyll chains layouts (e.g., post → default); `{{ content }}` placeholder for child content

**Include (Snippet) Pattern:**
- Purpose: Reusable components with parameterization
- Examples: `_includes/course-card.html`, `_includes/cta-block.html`, `_includes/json-ld.html`
- Pattern: `{% include name.html param1=value param2=value %}`; parameters accessed as `include.param1` inside the include

**Data-Driven Rendering:**
- Purpose: Single source of truth for content that appears in multiple places
- Examples: Courses (appear on homepage, courses listing page, course cards); navigation (appears on every page)
- Pattern: Define in `_data/`, access via `site.data.FILENAME`, loop with `{% for %}`

**React Component Mount Pattern:**
- Purpose: Interactive features without client-side routing or bundling
- Examples: `sample-chart.js` (bar chart visualization)
- Pattern: Include `{% include react-mount.html %}` in page; mount script queries `[data-component]` elements; component files define IIFE that mounts into matching elements

## Entry Points

**Homepage (`index.html`):**
- Location: `index.html` (root)
- Triggers: User visits `/teresa-ristow-io/`
- Responsibilities: Renders hero section, featured courses, featured blog posts, course catalog structure

**Blog Post (`_posts/*.html`):**
- Location: `_posts/YYYY-MM-DD-slug.html`
- Triggers: User visits `/teresa-ristow-io/blog/{year}/{month}/{slug}/` (via `_config.yml` permalink)
- Responsibilities: Renders post content, date/author metadata, optional hero image, optional React components (if `react-mount.html` included)

**Course Landing Page (`pages/*.html`):**
- Location: `pages/*.html` with `layout: landing` (e.g., `pages/structured-hiring.html`)
- Triggers: User visits `/teresa-ristow-io/courses/{slug}/` (via permalink in frontmatter)
- Responsibilities: Renders course hero section, course description, call-to-action blocks, enrollment button (points to Kajabi)

**Static Pages (`pages/*.html`):**
- Location: `pages/*.html` with `layout: page` (e.g., `pages/about.html`, `pages/contact.html`)
- Triggers: User visits `/teresa-ristow-io/{slug}/` (via permalink in frontmatter)
- Responsibilities: Renders page content with standard header/footer

## Error Handling

**Strategy:** Fail-safe degradation. No try/catch needed at template level because Jekyll compiles offline; errors surface at build time (GitHub Actions logs) or as broken links (404).

**Patterns:**
- **Missing data:** Liquid `{% if %}` guards prevent rendering broken includes (e.g., `{% if course.kajabi_url %}<a href="{{ course.kajabi_url }}">Enroll</a>{% endif %}`)
- **Missing frontmatter:** Defaults provided in `_config.yml` defaults (e.g., `author: "Teresa Ristow"` for posts without explicit author)
- **React load failure:** `react-mount.html` guards with `typeof React === 'undefined'` check; noscript fallback displays "Interactive components require JavaScript"
- **CDN failure (React, unpkg):** Fallback path documented in `js-and-react-components.md` -- bundle React locally at `assets/js/vendor/`

## Cross-Cutting Concerns

**Logging:** No server-side logging. Client-side: `console.warn()` in React components and `main.js` for debugging (no analytics currently integrated).

**Validation:** 
- **Frontmatter validation:** Informal; schema documented in CLAUDE.md and `.claude/documentation/`. Jekyll silently ignores unknown fields.
- **Data file validation:** YAML syntax checked at build time; schema validation (e.g., `status` enum: `active|coming-soon|future`) is informal and relies on human review.
- **Input validation:** None at input layer; all user input (forms, search) handled outside this site (Kajabi, email services).

**Authentication:** None. Site is public. Course enrollment redirects to Kajabi (off-site) for auth and payment.

**SEO:**
- **jekyll-seo-tag plugin:** Auto-generates `<meta name="description">`, `<meta property="og:*">`, `<link rel="canonical">`, Twitter Card meta
- **jekyll-sitemap plugin:** Auto-generates `/sitemap.xml`
- **jekyll-feed plugin:** Auto-generates `/feed.xml` (RSS)
- **Custom JSON-LD:** `_includes/json-ld.html` renders structured data (Schema.org) for BlogPosting, Course, Person based on `page.layout`
- **Robots.txt:** Manual file with `Sitemap:` directive using Liquid `relative_url`

**Accessibility:**
- **Skip nav:** `.skip-nav` link jumps to `#main-content`; visually hidden until focused
- **ARIA attributes:** `aria-expanded` on nav toggle, `aria-current="page"` on active nav link, `aria-label` on social links
- **Focus styles:** 2px solid gold outline with 2px offset; removed for mouse users via `:focus:not(:focus-visible)`
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` removes all animations/transitions
- **Color contrast:** All text passes WCAG AA; `--color-gold` (#c9a833) restricted to buttons with white text

---

*Architecture analysis: 2026-04-04*
