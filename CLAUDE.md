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
skills-github-pages/
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

```
default.html
├── page.html      (static pages: about, blog listing, courses, contact)
├── post.html      (blog posts in _posts/)
└── landing.html   (course landing/sales pages)
```

All layouts extend default. Default provides: doctype, `<html lang="en">`, head include, header include, `<main id="main-content">`, footer include, json-ld include, main.js script.

## Include (Snippet) Inventory

| Include | Parameters | Usage |
|---------|-----------|-------|
| head.html | (none) | Auto-included by default layout |
| header.html | (none) | Auto-included by default layout |
| nav.html | (none) | Included by header.html |
| footer.html | (none) | Auto-included by default layout |
| social-links.html | (none) | Included by footer.html |
| json-ld.html | (none) | Auto-included by default layout; renders conditionally by page.layout |
| cta-block.html | headline, description, button_text, button_url, style (primary/secondary) | `{% include cta-block.html headline="..." button_text="..." button_url="/courses/" style="primary" %}` |
| course-card.html | course (object) | `{% include course-card.html course=course %}` |
| post-card.html | post (object) | `{% include post-card.html post=post %}` |
| react-mount.html | (none) | `{% include react-mount.html %}` -- add before [data-component] divs |
| responsive-image.html | landscape, portrait, alt, loading (default: lazy), css_class, width_l, height_l, width_p, height_p | `{% include responsive-image.html landscape="/assets/images/hero-landscape.jpg" portrait="/assets/images/hero-portrait.jpg" alt="Description" loading="eager" %}` |
| analytics.html | (none) | Placeholder for tracking code |

## CSS Architecture

Single file: `assets/css/style.css`

- Design tokens in `:root` custom properties
- Color palette: #2D3E50 (primary/text), #A65971 (CTA buttons only -- not body text), #F9F6F3/#F5F7F6 (backgrounds)
- BEM-influenced naming: `.block__element--modifier`
- Mobile-first responsive (breakpoints: 600px, 768px, 1024px)
- Section markers as CSS comments
- Scaling strategy: split to SASS @import if file exceeds ~1500 lines

## Responsive Image Rules

When generating HTML that includes images, follow these rules:

1. **Hero and header images** use the `responsive-image.html` include with both `landscape` and `portrait` versions for art-directed mobile/desktop switching
2. **Inline blog images** (charts, diagrams, screenshots) use a plain `<img>` tag -- no `<picture>` needed
3. **File naming:** `{context}-{slug}-{orientation}.{ext}` where context is `hero`/`post`/`course`/`page`, orientation is `landscape` (16:9, ~1200x675) or `portrait` (3:4, ~600x800). Omit orientation suffix for inline-only images.
4. **Loading:** `eager` for above-fold images, `lazy` (default) for everything else
5. **Alt text is mandatory** -- describe the content, not the filename
6. **Width and height attributes are mandatory** on all `<img>` tags to prevent layout shift
7. **Only use `<picture>`** (via the include) when genuinely art-directing different crops for mobile vs desktop

### Post hero images via frontmatter

```yaml
image_landscape: /assets/images/post-my-slug-landscape.jpg
image_portrait: /assets/images/post-my-slug-portrait.jpg
image_alt: "Descriptive alt text"
```

All three fields are optional. The post layout renders a `<picture>` element with art direction when both orientations are provided.

### Inline images in blog posts

```html
<img
  src="{{ '/assets/images/post-slug-chart.png' | relative_url }}"
  alt="Bar chart comparing interview validity across methods"
  width="720"
  height="405"
  loading="lazy">
```

## JS Architecture

- `assets/js/main.js` -- Global behavior (mobile nav toggle, escape key handler)
- `assets/js/components/*.js` -- React components mounted via [data-component] pattern
- React loaded via CDN only on pages that use `{% include react-mount.html %}`
- Components use `React.createElement` (no JSX, no build step)

## Data File Schemas

### courses.yml
Fields: key, title, subtitle, vertical (employer/job-seeker), price_display, status (active/coming-soon/future), kajabi_url, landing_page, description, features (array)

### navigation.yml
Fields: main (array of {title, url})

### social.yml
Fields: platform, url, label

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
