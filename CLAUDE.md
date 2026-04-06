# CLAUDE.md - Teresa Ristow GitHub Pages Site

This is the public-facing blog, course funnel, and landing page site for Dr. Teresa Ristow, built on GitHub Pages with Jekyll.

## Safety Rules

- **Never push to remote** -- user handles deployment via GitHub Desktop
- **Never modify .github/workflows/** -- these are GitHub Skills exercise files, leave them alone
- **Always use `| relative_url` filter** on internal links and asset paths
- **README.md is the admin guide** -- any agent that adds/removes/renames layouts, includes, data files, or pages MUST update README.md to reflect the change

## Project Identity

- **Purpose:** Public-facing blog + course landing pages + funnel entry for Teresa Ristow's I/O Psychology courses (hosted on Kajabi)
- **Platform:** GitHub Pages (Jekyll 3.10.0)
- **Tier:** T2 (single-phase, external reads/writes via GitHub Pages deployment)
- **Owner:** Christopher Pierce (developer), Dr. Teresa Ristow (content owner)

## Tech Stack

- **Templating:** Jekyll 3.10.0 / Liquid
- **Content:** HTML (not Markdown -- all content files use .html)
- **Styling:** Single CSS file with custom properties (assets/css/style.css)
- **JavaScript:** Vanilla JS (main.js) + React 18 via CDN for interactive blog components
- **Plugins:** jekyll-feed, jekyll-seo-tag, jekyll-sitemap (all GitHub Pages whitelisted)
- **Data:** YAML files in _data/ (courses, navigation, social)

## Architecture Map

```
teresa-ristow-io/
├── _config.yml                    # Jekyll configuration
├── _layouts/
│   ├── default.html               # Master shell (all pages inherit)
│   ├── page.html                  # Static pages (extends default)
│   ├── post.html                  # Blog posts (extends default)
│   └── landing.html               # Course landing pages (extends default)
├── _includes/                     # Reusable snippets (like Shopify snippets)
│   ├── head.html                  # <head> block: meta, SEO, CSS, feed
│   ├── header.html                # Site header with skip-nav
│   ├── nav.html                   # Navigation (reads _data/navigation.yml)
│   ├── footer.html                # Site footer
│   ├── social-links.html          # Social icons (reads _data/social.yml)
│   ├── cta-block.html             # Call-to-action component (parameterized)
│   ├── course-card.html           # Course preview card (parameterized)
│   ├── post-card.html             # Blog post preview card (parameterized)
│   ├── json-ld.html               # Structured data (Person, Course, BlogPosting)
│   ├── react-mount.html           # React CDN loader (conditional)
│   └── analytics.html             # Tracking placeholder
├── _posts/                        # Blog posts (HTML, not MD)
├── _data/
│   ├── courses.yml                # All 10 courses (SSOT)
│   ├── navigation.yml             # Nav menu structure
│   └── social.yml                 # Social media links
├── assets/
│   ├── css/style.css              # Single global stylesheet
│   ├── js/main.js                 # Global JS (nav toggle)
│   ├── js/components/             # React components for blog posts
│   └── images/                    # Site images
├── pages/                         # Static pages with permalinks
├── index.html                     # Homepage
├── 404.html                       # Custom 404 page
├── robots.txt                     # Crawler directives
├── CLAUDE.md                      # This file (agent routing)
├── .claude/                       # Agent workspace (excluded from build)
│   ├── documentation/             # Architecture specs
│   ├── skills/                    # Agent skills
│   └── hooks/                     # Agent hooks
└── README.md                      # Human admin guide for Dr. Ristow
```

## Layout Inheritance

All layouts extend `default.html`. See `_layouts/CLAUDE.md` for the full inheritance chain, include inventory, and image rules.

## Subdirectory Context Routing

Agents working in a subdirectory should read that directory's CLAUDE.md first:

| Directory | CLAUDE.md Scope |
|-----------|----------------|
| `_layouts/` | Layout inheritance, includes inventory, Liquid patterns (also covers `_includes/`) |
| `_posts/` | Blog post authoring, frontmatter, images, React embedding |
| `_data/` | YAML schemas, enum values, SSOT rules |
| `pages/` | Static pages + landing pages, permalink conventions |
| `assets/css/` | Design tokens, BEM naming, responsive breakpoints |
| `assets/js/` | Global JS + React component pattern, CDN strategy |

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| HTML pages | kebab-case | structured-hiring.html |
| Blog posts | YYYY-MM-DD-slug.html | 2026-03-28-welcome.html |
| Includes | kebab-case.html | cta-block.html |
| Layouts | kebab-case.html | landing.html |
| CSS classes | BEM-influenced | .post__title, .cta-block--primary |
| Data files | kebab-case.yml | courses.yml |
| JS files | kebab-case.js | sample-chart.js |
| Images | {context}-{slug}-{orientation}.{ext} | post-hiring-bias-landscape.jpg |
| Documentation | kebab-case.md | css-architecture.md |

## Key Constraints

- **Jekyll 3.10.0** -- GitHub Pages version; do not use Jekyll 4.x features
- **Plugin whitelist** -- Only jekyll-feed, jekyll-seo-tag, jekyll-sitemap (all GH Pages whitelisted)
- **Include parameter caveat** -- Liquid variables with curly braces cannot be passed directly to includes; use `{% capture %}` first
- **No em-dashes** in any content (inherited from parent workspace)
- **baseurl trap** -- When connecting a custom domain, url, baseurl, and CNAME must all change simultaneously. See .claude/documentation/deployment.md

## Key Decisions

| Decision | Rationale | Status |
|----------|-----------|--------|
| No theme (fully custom) | User wants HTML-first control | Active |
| HTML for posts, not MD | User prefers HTML; Jekyll processes .html identically | Active |
| Single CSS file, no preprocessor | No build step on GH Pages; CSS custom properties for variables | Active |
| React via CDN, not bundled | No build tooling; createElement avoids JSX; loads only when needed | Active |
| Custom JSON-LD via include | jekyll-seo-tag only does WebSite/WebPage; need Course, Person, BlogPosting | Active |
| _data/courses.yml as SSOT | Course metadata centralized; rendered by multiple pages and includes | Active |
| README.md as admin guide | Dr. Ristow is site admin; must be human-readable with SOPs | Active |
| Responsive images via `<picture>` art direction | `srcset` multi-resolution requires build pipeline we don't have; `<picture>` gives mobile/desktop art direction with zero tooling | Active |

## Active Risks

| Risk | Mitigation |
|------|------------|
| baseurl trap on custom domain | Documented in config + deployment.md; 3-step simultaneous change |
| React CDN (unpkg) availability | If down, bundle locally in assets/js/vendor/ |
| Single CSS file growth | Section markers + threshold (~1500 lines) to split via SASS @import |
| #A65971 contrast | Restricted to buttons with white text (passes WCAG AA); never for body text |

## Skill & Plugin Routing

### Universal Rules

1. **Superpowers for all code work:** Use `superpowers:brainstorming` before creating features or modifying behavior. Use `superpowers:writing-plans` before multi-step implementations. Use `superpowers:verification-before-completion` before claiming work is done.
2. **GSD for project-scoped work:** Use `/gsd:plan-phase` or `/gsd:discuss-phase` for planning. Use `/gsd:execute-phase` for execution. Use `/gsd:debug` for systematic debugging.
3. **Code review is mandatory:** Run `/code-review` (or dispatch a `superpowers:requesting-code-review` subagent) over ALL code additions or changes before presenting output to the user. No exceptions.

### Local Skills (`.claude/skills/`)

| Skill | Invoke When | Trigger Examples |
|-------|-------------|-----------------|
| `code-review` | Any code change before output | Editing HTML/CSS/JS/Liquid, adding components, modifying layouts |
| `frontend-design` | Building or restyling UI | New pages, visual redesigns, component creation |
| `perf` | Performance-related work | Asset optimization, Core Web Vitals, page load speed, image/font loading |
| `ui-ux-pro-max` | Design decisions | Color palette, typography, layout style, accessibility audit, landing page design |

### Superpowers & GSD (System Plugins)

| Plugin | Invoke When |
|--------|-------------|
| `superpowers:brainstorming` | Before any creative/feature work -- new pages, components, visual changes |
| `superpowers:writing-plans` | Before multi-file or multi-step implementation |
| `superpowers:executing-plans` | When executing a written plan |
| `superpowers:systematic-debugging` | Any bug, test failure, or unexpected behavior |
| `superpowers:verification-before-completion` | Before claiming work is complete |
| `superpowers:requesting-code-review` | After completing code changes (supplements mandatory `/code-review`) |
| `/gsd:plan-phase`, `/gsd:discuss-phase` | Planning scoped work |
| `/gsd:execute-phase` | Executing planned phases |
| `/gsd:debug` | Persistent debugging across context resets |

### Routing by Task Type

| Task | Skills to Invoke (in order) |
|------|-----------------------------|
| New page or landing page | `superpowers:brainstorming` → `ui-ux-pro-max` → `frontend-design` → implement → `code-review` |
| New blog post with components | `superpowers:brainstorming` → implement → `code-review` |
| CSS changes (tokens, layout, responsive) | `ui-ux-pro-max` → `perf` → implement → `code-review` |
| New React component | `superpowers:brainstorming` → implement → `code-review` → `perf` |
| Performance optimization | `perf` → implement → `code-review` → `superpowers:verification-before-completion` |
| Bug fix | `superpowers:systematic-debugging` → implement → `code-review` |
| Multi-file feature | `superpowers:writing-plans` → `superpowers:executing-plans` → `code-review` |

## Documentation Routing

Detailed specs live in `.claude/documentation/`:
- `architecture-overview.md` -- system design, layout inheritance
- `layouts-and-includes.md` -- all layouts/includes with params and examples
- `css-architecture.md` -- token system, naming, responsive strategy
- `js-and-react-components.md` -- React mount pattern, adding components
- `blog-posts.md` -- creating posts, frontmatter, embedding components
- `course-landing-pages.md` -- creating/editing landing pages
- `data-files.md` -- _data/ file schemas
- `deployment.md` -- GitHub Pages config, custom domain, troubleshooting

## Inherited Constraints

From parent workspace (D:/Documents/GitHub/CLAUDE.md):
- Read before writing; understand existing code before changing it
- No em-dashes in customer-facing content
- Humanizer skill required for customer-facing copy
- Post-task protocol: update ERRORS_AND_LESSONS.md if bugs found

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Teresa Ristow Site**

Public-facing blog, course funnel, and landing page site for Dr. Teresa Ristow's I/O Psychology practice. Built on GitHub Pages with Jekyll 3.10.0. Serves as the primary discovery and conversion path to Kajabi-hosted courses.

**Core Value:** Drive qualified traffic from blog content to course landing pages, converting readers into Kajabi course enrollees.

### Constraints

- **Platform**: GitHub Pages (Jekyll 3.10.0) -- no server-side runtime, whitelisted plugins only
- **Deployment**: User pushes via GitHub Desktop; Claude never pushes
- **Content format**: HTML only (no Markdown) -- established convention
- **JS baseline**: ES5 -- no transpiler available
- **Workflows**: `.github/workflows/` files are GitHub Skills exercises, never modify
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- HTML5 - All content pages (no Markdown)
- Liquid - Jekyll template language for layouts, includes, and data rendering
- CSS3 - Single global stylesheet with custom properties (`assets/css/style.css`)
- JavaScript (ES5) - Global behavior and React components
- YAML - Data files and configuration
- JSON - React component props (data-props attributes)
## Runtime
- GitHub Pages (Jekyll 3.10.0)
- Node runtime: Not required; Jekyll 3.10.0 is hosted on GitHub Pages
- GitHub Pages static site hosting
- Automatic rebuilding on push to repository
## Frameworks
- Jekyll 3.10.0 - Static site generator (GitHub Pages whitelisted version)
- Liquid - Template engine (part of Jekyll)
- jekyll-feed (v0.15+) - Generates RSS feed
- jekyll-seo-tag (v2.7+) - Adds SEO meta tags and structured data
- jekyll-sitemap (v1.4+) - Generates XML sitemap
- React 18 - Loaded via CDN (unpkg) for interactive blog components
- ReactDOM 18 - React DOM rendering (CDN delivery)
- No build pipeline - CSS/JS delivered as-is (GitHub Pages limitation)
- No transpiler - ES5 JavaScript only
- No bundler - React components are standalone files
## Key Dependencies
- React 18 (`https://unpkg.com/react@18/umd/react.production.min.js`) - Interactive components framework
- ReactDOM 18 (`https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`) - DOM mounting for React
- Google Fonts API (`fonts.googleapis.com`) - Loads Inter typeface (weights 300, 400, 500, 700)
- Cloudinary (`res.cloudinary.com/du8tl7x4m`) - Image hosting and on-demand transformation (responsive sizing, format optimization)
- unpkg.com CDN - Hosts React and ReactDOM production builds
## Configuration
- GitHub Pages default: `site.url` resolves to `https://christopher-at-loom.github.io`
- Custom domain ready: baseurl and url configured in `_config.yml` for migration to custom domain
- `_config.yml` - Jekyll configuration file (source: `D:/Documents/GitHub/teresa-ristow-io/_config.yml`)
## Platform Requirements
- Git (for repository management)
- Text editor (VS Code recommended)
- No Node.js or build tools required
- GitHub Desktop or git CLI for commits/pushes
- Deployment target: GitHub Pages
- Automatic deployment on push to main branch
- Build time: 1-3 minutes after push
- Hosting: Free with GitHub repository
- Modern browsers with ES5 JavaScript support (React 18 requirement)
- CSS Grid and Flexbox support
- Responsive design via CSS media queries
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- HTML pages: `kebab-case.html` (e.g., `structured-hiring.html`, `about.html`)
- Blog posts: `YYYY-MM-DD-slug.html` (e.g., `2026-03-28-welcome.html`)
- Includes: `kebab-case.html` (e.g., `cta-block.html`, `course-card.html`)
- Layouts: `kebab-case.html` (e.g., `default.html`, `landing.html`)
- Data files: `kebab-case.yml` (e.g., `navigation.yml`, `courses.yml`)
- JS files: `kebab-case.js` (e.g., `main.js`, `sample-chart.js`)
- Images: `{context}-{slug}-{orientation}.{ext}` (e.g., `post-hiring-landscape.jpg`)
- Documentation: `kebab-case.md` (e.g., `css-architecture.md`)
- BEM-influenced notation: `.block__element--modifier`
- Examples: `.post__title`, `.cta-block--primary`, `.course-card__features`, `.site-header__toggle`, `.sample-chart__bar`
- Meaningful names tied to component purpose, not visual properties
- Element IDs: lowercase with hyphens (e.g., `id="main-content"`)
- Data attributes: `data-component="sample-chart"`, `data-props='{"label":"Test"}'`
- ARIA attributes: lowercase (e.g., `aria-expanded`, `aria-label`)
- Variables: `camelCase` (e.g., `toggle`, `nav`, `expanded`, `maxVal`)
- Functions: `camelCase` (e.g., `SampleChart`, `MyComponent`)
- Constants: uppercase with underscores (implicit; not used in codebase)
## Code Style
- Indentation: 2 spaces (HTML, CSS, Liquid)
- Line length: No hard limit enforced
- No trailing whitespace (inherited constraint)
- No em-dashes in any content including CSS strings
- No automated linting (Prettier, ESLint, etc.)
- Manual code review via `/code-review` skill before any code output (mandatory per CLAUDE.md)
- Always use `| relative_url` filter on internal links and asset paths
- Template variables: lowercase (e.g., `{{ page.title }}`, `{{ site.title }}`)
- Include parameters: lowercase (e.g., `include.headline`, `include.style`)
- Use `{% unless condition %}` for negative conditionals
- Guard clauses: check for nil/undefined (e.g., `{% if include.headline %}`)
- Semantic elements preferred (e.g., `<main>`, `<article>`, `<section>`)
- Data attributes for JS hooks: `data-component`, `data-props`, `data-*`
- Alt text on all images (mandatory)
- Width/height on all images to prevent layout shift (mandatory)
- Loading: `eager` for above-fold, `lazy` for below-fold images
- Responsive images use `<picture>` element via `responsive-image.html` include for art-directed mobile/desktop
- Boolean attributes written without value (e.g., `defer`, not `defer="defer"`)
## Import Organization
- No path aliases used (Jekyll lacks built-in aliasing)
- All paths use `| relative_url` filter for portability
- Asset paths: `{{ '/assets/...' | relative_url }}`
- Page URLs: `{{ page.url | relative_url }}`
## Error Handling
- Guard clauses check for element existence before using: `if (toggle && nav) { ... }`
- React component guard: check `typeof React === 'undefined'` with `console.warn()` fallback
- JSON parsing wrapped in try-catch with `console.warn()` on error
- No silent failures; always log warnings via `console.warn()`
- No explicit error throwing (static generation phase)
- Defensive conditionals: `{% if variable %}`
- Default filters: `{{ include.style | default: 'primary' }}`
## Logging
- `console.warn()` for non-fatal issues and guards
- Used in React components to signal missing dependencies or bad data
- Used in JavaScript to signal guard clause activation
- No info/log/error levels; all issues logged as warnings
- React/DOM dependencies missing
- Invalid JSON in data attributes
- User interaction guards firing (rare)
## Comments
- Significant behavioral blocks (mobile nav toggle, event handlers)
- Complex Liquid logic (none observed in codebase)
- Explaining why, not what (code should be self-documenting)
- Not used (no TypeScript; JavaScript is minimal)
- Inline comments for clarity where needed
- Liquid templates are self-documenting via include parameter names
## Function Design
- `main.js` functions: inline within event listeners (2-3 lines each)
- React components: single responsibility (one chart, one card, etc.)
- React component props passed via `data-props` JSON string
- Include parameters via Liquid: `{{ include.headline }}`
- Event handlers receive event object: `function(e) { ... }`
- React components return `React.createElement()` nodes
- Event handlers return void (side effects only)
- Helper functions (none observed) would return computed values
## Module Design
- No module exports (IIFE pattern; everything scoped to function)
- React components mounted by selector within their own IIFE
- Global JS (main.js) uses IIFE to avoid polluting global scope
- Not used (Jekyll doesn't support barrel exports)
- Single responsibility per file
- Includes are parameterized via `include.*` variables
- No nested include parameter passing (use `{% capture %}` if curly braces needed)
- Includes are reusable across layouts and pages
## Design Tokens
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
- `--font-heading: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- `--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- `--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace`
- `--text-2xs: 0.5625rem`, `--text-xs: 0.6875rem`, `--text-sm: 0.8125rem`, `--text-base: 1rem`
- `--text-lg: 1.125rem`, `--text-xl: 1.25rem`, `--text-2xl: 1.5rem`, `--text-3xl: 1.875rem`
- `--text-4xl: 2.25rem`, `--text-5xl: 3rem`
- `--space-1: 0.25rem` (4px), `--space-2: 0.5rem` (8px), `--space-3: 0.75rem` (12px), `--space-4: 1rem` (16px)
- Continues through `--space-24: 6rem` (96px)
- `--max-width: 1392px` (container)
- `--max-width-content: 720px` (narrow content)
- `--max-width-wide: 960px` (wide content)
## Accessibility
- `aria-expanded="true|false"` on toggles (e.g., mobile nav button)
- `aria-label` on icon buttons without visible text
- Skip navigation link included in all pages
- `:focus-visible` outline applied to all interactive elements
- On mobile nav close, focus returned to toggle button: `toggle.focus()`
- Escape key closes mobile nav
- All interactive elements keyboard-accessible
- `prefers-reduced-motion: reduce` respected (CSS section 20)
- Transitions/animations disabled when user requests reduced motion
## Responsive Breakpoints
- `600px`: 2-column grids, layout shifts
- `768px`: Navigation becomes visible (hamburger hidden), heading font scales
- `1024px`: 3-column grids, full desktop layout
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- **No build tooling** -- GitHub Pages constraints mandate no preprocessing; CSS custom properties replace SASS, Liquid templating handles logic
- **Liquid-driven data rendering** -- YAML files in `_data/` are the single source of truth; layouts and includes loop over data to generate HTML
- **Layout inheritance** -- All pages descend from `_layouts/default.html`; child layouts add semantic structure
- **Progressive React integration** -- React 18 loads conditionally via CDN; components mount into named DOM elements via attribute-based discovery
## Layers
- Purpose: Static HTML generation from Liquid templates and content files
- Location: `_layouts/`, `_includes/`, content files (`index.html`, `pages/`, `_posts/`)
- Contains: Layout files (HTML with Liquid), reusable includes (components), content (HTML with Liquid)
- Depends on: `_config.yml`, `_data/` files
- Used by: GitHub Actions Jekyll build → GitHub Pages CDN
- Purpose: Centralized configuration and content metadata
- Location: `_data/` (courses.yml, navigation.yml, social.yml)
- Contains: YAML files defining courses, navigation structure, social media links
- Depends on: YAML syntax, schema validation (informal)
- Used by: Layouts, includes (via `site.data.*` namespace)
- Purpose: Design system and responsive layout
- Location: `assets/css/style.css` (single file)
- Contains: Custom properties (design tokens), layout utilities, component styles, responsive breakpoints
- Depends on: CSS custom properties, CSS Grid/Flexbox
- Used by: All HTML templates via `<link rel="stylesheet">`
- Purpose: Interactivity, client-side state, and runtime component mounting
- Location: `assets/js/main.js` (global), `assets/js/components/` (React components)
- Contains: Global nav toggle script, React component definitions
- Depends on: React 18 CDN (optional, lazy-loaded), DOM API
- Used by: Pages that include `react-mount.html` or defer-loaded `main.js`
- Purpose: Static resources and media
- Location: `assets/images/`, `assets/favicon.ico`
- Contains: Images, favicon
- Depends on: Cloudinary CDN (configured in `_config.yml`)
- Used by: Layouts and content files via `relative_url` filter
## Data Flow
```
```
```
```
```
```
- **Build-time:** Jekyll processes all Liquid at build time; no runtime state beyond what's in HTML
- **Client-side:** React components manage state via `useState`; main.js manages nav toggle state via `aria-expanded` attribute
- **Persistence:** Browser's IndexedDB or localStorage could be used (not currently implemented) for client-only state
## Key Abstractions
- Purpose: Reusable page structure with shared shell
- Examples: `_layouts/default.html` (master), `_layouts/page.html` (static pages), `_layouts/post.html` (blog), `_layouts/landing.html` (course sales)
- Pattern: YAML frontmatter declares `layout: name`; Jekyll chains layouts (e.g., post → default); `{{ content }}` placeholder for child content
- Purpose: Reusable components with parameterization
- Examples: `_includes/course-card.html`, `_includes/cta-block.html`, `_includes/json-ld.html`
- Pattern: `{% include name.html param1=value param2=value %}`; parameters accessed as `include.param1` inside the include
- Purpose: Single source of truth for content that appears in multiple places
- Examples: Courses (appear on homepage, courses listing page, course cards); navigation (appears on every page)
- Pattern: Define in `_data/`, access via `site.data.FILENAME`, loop with `{% for %}`
- Purpose: Interactive features without client-side routing or bundling
- Examples: `sample-chart.js` (bar chart visualization)
- Pattern: Include `{% include react-mount.html %}` in page; mount script queries `[data-component]` elements; component files define IIFE that mounts into matching elements
## Entry Points
- Location: `index.html` (root)
- Triggers: User visits `/teresa-ristow-io/`
- Responsibilities: Renders hero section, featured courses, featured blog posts, course catalog structure
- Location: `_posts/YYYY-MM-DD-slug.html`
- Triggers: User visits `/teresa-ristow-io/blog/{year}/{month}/{slug}/` (via `_config.yml` permalink)
- Responsibilities: Renders post content, date/author metadata, optional hero image, optional React components (if `react-mount.html` included)
- Location: `pages/*.html` with `layout: landing` (e.g., `pages/structured-hiring.html`)
- Triggers: User visits `/teresa-ristow-io/courses/{slug}/` (via permalink in frontmatter)
- Responsibilities: Renders course hero section, course description, call-to-action blocks, enrollment button (points to Kajabi)
- Location: `pages/*.html` with `layout: page` (e.g., `pages/about.html`, `pages/contact.html`)
- Triggers: User visits `/teresa-ristow-io/{slug}/` (via permalink in frontmatter)
- Responsibilities: Renders page content with standard header/footer
## Error Handling
- **Missing data:** Liquid `{% if %}` guards prevent rendering broken includes (e.g., `{% if course.kajabi_url %}<a href="{{ course.kajabi_url }}">Enroll</a>{% endif %}`)
- **Missing frontmatter:** Defaults provided in `_config.yml` defaults (e.g., `author: "Teresa Ristow"` for posts without explicit author)
- **React load failure:** `react-mount.html` guards with `typeof React === 'undefined'` check; noscript fallback displays "Interactive components require JavaScript"
- **CDN failure (React, unpkg):** Fallback path documented in `js-and-react-components.md` -- bundle React locally at `assets/js/vendor/`
## Cross-Cutting Concerns
- **Frontmatter validation:** Informal; schema documented in CLAUDE.md and `.claude/documentation/`. Jekyll silently ignores unknown fields.
- **Data file validation:** YAML syntax checked at build time; schema validation (e.g., `status` enum: `active|coming-soon|future`) is informal and relies on human review.
- **Input validation:** None at input layer; all user input (forms, search) handled outside this site (Kajabi, email services).
- **jekyll-seo-tag plugin:** Auto-generates `<meta name="description">`, `<meta property="og:*">`, `<link rel="canonical">`, Twitter Card meta
- **jekyll-sitemap plugin:** Auto-generates `/sitemap.xml`
- **jekyll-feed plugin:** Auto-generates `/feed.xml` (RSS)
- **Custom JSON-LD:** `_includes/json-ld.html` renders structured data (Schema.org) for BlogPosting, Course, Person based on `page.layout`
- **Robots.txt:** Manual file with `Sitemap:` directive using Liquid `relative_url`
- **Skip nav:** `.skip-nav` link jumps to `#main-content`; visually hidden until focused
- **ARIA attributes:** `aria-expanded` on nav toggle, `aria-current="page"` on active nav link, `aria-label` on social links
- **Focus styles:** 2px solid gold outline with 2px offset; removed for mouse users via `:focus:not(:focus-visible)`
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` removes all animations/transitions
- **Color contrast:** All text passes WCAG AA; `--color-gold` (#c9a833) restricted to buttons with white text
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| code-review-excellence | \| Provides comprehensive code review guidance for React 19, Vue 3, Rust, TypeScript, Java, Python, and C/C++. Helps catch bugs, improve code quality, and give constructive feedback. Use when: reviewing pull requests, conducting PR reviews, code review, reviewing code changes, establishing review standards, mentoring developers, architecture reviews, security audits, checking code quality, finding bugs, giving feedback on code. | `.claude/skills/code-review/SKILL.md` |
| frontend-design | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics. | `.claude/skills/frontend-design/SKILL.md` |
| humanizer2 | \| Remove signs of AI-generated writing using multi-pass semantic entropy restoration. Detects 39 patterns across 6 categories via a three-pass compartmentalized audit: Structural Extraction, Lexical Substitution, Syntactic Asymmetry. Context-routes to category reference files per pass. | `.claude/skills/humanizer2/SKILL.md` |
| perf | "Page load performance specialist: Core Web Vitals, asset optimization, and critical rendering path" | `.claude/skills/perf/SKILL.md` |
| ui-ux-pro-max | "UI/UX design intelligence. 67 styles, 96 palettes, 57 font pairings, 25 charts, 13 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient. Integrations: shadcn/ui MCP for component search and examples." | `.claude/skills/ui-ux-pro-max/SKILL.md` |
| clarify | UX copy, labels, error messages, microcopy improvement | `.claude/skills/clarify/SKILL.md` |
| critique | Design evaluation with scoring, heuristics audit, persona testing | `.claude/skills/critique/SKILL.md` |
| polish | Final quality pass — alignment, spacing, consistency, micro-details | `.claude/skills/polish/SKILL.md` |
| typeset | Typography hierarchy, font sizing, weight, readability | `.claude/skills/typeset/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
