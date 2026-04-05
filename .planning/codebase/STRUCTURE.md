# Codebase Structure

**Analysis Date:** 2026-04-04

## Directory Layout

```
teresa-ristow-io/
├── _config.yml                    # Jekyll configuration (build, plugins, defaults, tokens)
├── _layouts/                      # Layout templates (extend each other)
│   ├── CLAUDE.md
│   ├── default.html               # Master shell (all pages inherit this)
│   ├── page.html                  # Static pages
│   ├── post.html                  # Blog posts
│   └── landing.html               # Course landing/sales pages
├── _includes/                     # Reusable components (like Shopify snippets)
│   ├── head.html                  # <head> block: meta, SEO, CSS, feed meta
│   ├── header.html                # Site header with skip-nav link
│   ├── nav.html                   # Navigation (data-driven from _data/navigation.yml)
│   ├── footer.html                # Site footer
│   ├── social-links.html          # Social media icons (data-driven from _data/social.yml)
│   ├── cta-block.html             # Call-to-action banner (parameterized)
│   ├── course-card.html           # Course preview card (parameterized)
│   ├── post-card.html             # Blog post preview card (parameterized)
│   ├── json-ld.html               # Structured data (Person, Course, BlogPosting schemas)
│   ├── react-mount.html           # React 18 CDN loader with component discovery
│   ├── responsive-image.html      # Art-directed <picture> for mobile/desktop
│   └── analytics.html             # Placeholder for tracking code
├── _posts/                        # Blog posts (HTML, not Markdown)
│   ├── CLAUDE.md
│   ├── YYYY-MM-DD-slug.html       # One post per file; Jekyll auto-applies post.html layout
│   └── ...
├── _data/                         # Data files (YAML, SSOT for repeatable content)
│   ├── CLAUDE.md
│   ├── courses.yml                # 10 courses (employer + job-seeker verticals)
│   ├── navigation.yml             # Main navigation menu structure
│   └── social.yml                 # Social media links
├── assets/
│   ├── css/
│   │   ├── CLAUDE.md
│   │   └── style.css              # Single global stylesheet (~1710 lines)
│   ├── js/
│   │   ├── CLAUDE.md
│   │   ├── main.js                # Global JS (nav toggle, escape key handler)
│   │   └── components/
│   │       ├── sample-chart.js    # Example React component (bar chart)
│   │       └── ...                # Additional React components (lazy-loaded)
│   ├── images/                    # Site images, favicons
│   └── favicon.ico
├── pages/                         # Static pages with custom permalinks
│   ├── CLAUDE.md
│   ├── about.html                 # About Teresa
│   ├── blog.html                  # Blog listing page
│   ├── courses.html               # Course catalog page
│   ├── contact.html               # Contact page
│   ├── structured-hiring.html     # Example course landing page
│   └── ...
├── index.html                     # Homepage (root; special Jekyll file)
├── 404.html                       # Custom 404 error page
├── robots.txt                     # Crawler directives (uses Liquid for sitemap URL)
├── _config.yml (config values)    # Listed separately above
├── CLAUDE.md                      # Agent routing guide (local context)
├── README.md                      # Human admin guide for site management
├── LICENSE
├── .gitignore
├── .claude/                       # Agent workspace (excluded from build)
│   ├── documentation/             # Detailed specs
│   │   ├── architecture-overview.md
│   │   ├── layouts-and-includes.md
│   │   ├── css-architecture.md
│   │   ├── js-and-react-components.md
│   │   ├── blog-posts.md
│   │   ├── course-landing-pages.md
│   │   ├── data-files.md
│   │   └── deployment.md
│   └── skills/                    # Agent skills (code review, design, perf, humanizer)
└── .planning/                     # GSD codebase maps (excluded from build)
    └── codebase/
        ├── ARCHITECTURE.md        # This analysis
        ├── STRUCTURE.md           # This file
        └── ...
```

## Directory Purposes

**`_layouts/`:**
- Purpose: Layout templates that define page structure and inheritance chains
- Contains: HTML templates with Liquid, frontmatter declaring parent layouts, `{{ content }}` placeholders
- Key files: `default.html` (master shell), `page.html` (static pages), `post.html` (blog), `landing.html` (course sales)
- Inheritance: All layouts extend `default.html` via `layout: default` in frontmatter

**`_includes/`:**
- Purpose: Reusable components (like Shopify snippets) with parameters
- Contains: HTML templates with Liquid, parameterized via `include.varname` syntax
- Key files: `head.html`, `header.html`, `nav.html`, `footer.html` (structural); `course-card.html`, `post-card.html`, `cta-block.html` (content components); `json-ld.html` (SEO); `react-mount.html` (interactive)
- Usage: Included with `{% include name.html param1=value %}`

**`_posts/`:**
- Purpose: Blog post content
- Contains: HTML files (not Markdown) with YAML frontmatter
- Naming: `YYYY-MM-DD-slug.html` (Jekyll auto-detects and orders by date)
- Auto-layout: Jekyll applies `post.html` layout via `_config.yml` defaults
- Permalink: Generated by `_config.yml` permalink rule: `/blog/:year/:month/:title/`

**`_data/`:**
- Purpose: Centralized content metadata and configuration (single source of truth)
- Contains: YAML files accessed as `site.data.FILENAME` in Liquid
- Files: `courses.yml` (10 course definitions), `navigation.yml` (nav menu), `social.yml` (social links)
- Used by: Layouts, includes (via loops and conditionals)

**`assets/css/`:**
- Purpose: Styling
- Contains: Single CSS file with design tokens (custom properties), layout utilities, component styles, responsive breakpoints
- Sections: Design tokens, reset/normalize, typography, layout, skip-nav, header/nav, footer, hero, cards, CTA, blog, landing, badges, social, buttons, accessibility, responsive
- Scale: ~1710 lines; split to SASS partials if exceeds 2000 lines

**`assets/js/`:**
- Purpose: Interactivity and component mounting
- Contains: Global script (`main.js`) and React component definitions (`components/`)
- `main.js`: Nav toggle, escape key handler; loaded on every page with `defer`
- `components/`: React components (IIFE pattern, no JSX, lazy-loaded); `sample-chart.js` included as example

**`pages/`:**
- Purpose: Static pages with custom permalinks
- Contains: HTML files with YAML frontmatter
- Auto-layout: Jekyll applies `page.html` layout via `_config.yml` defaults
- Examples: `about.html`, `blog.html`, `courses.html`, `contact.html`, `structured-hiring.html` (course landing)
- Permalink: Declared in frontmatter (e.g., `permalink: /about/`)

**`assets/images/`:**
- Purpose: Static image assets
- Contains: JPG, PNG, SVG (responsive images, favicons, OG images)
- Cloudinary: Configured in `_config.yml` as `cloudinary_base` for potential CDN delivery
- Naming: `{context}-{slug}-{orientation}.{ext}` (e.g., `post-hiring-bias-landscape.jpg`)

**`.claude/`:**
- Purpose: Agent workspace (excluded from build by `exclude:` in `_config.yml`)
- Contains: Documentation specs and agent skills
- Subdirs: `documentation/` (deep-dive guides), `skills/` (code review, design, perf, humanizer)

**`.planning/`:**
- Purpose: GSD codebase maps (excluded from build)
- Contains: ARCHITECTURE.md, STRUCTURE.md, and future analysis documents

## Key File Locations

**Entry Points:**
- `index.html`: Homepage, root of site (`/teresa-ristow-io/`)
- `pages/blog.html`: Blog listing page (`/teresa-ristow-io/blog/`)
- `pages/courses.html`: Course catalog page (`/teresa-ristow-io/courses/`)
- `pages/about.html`: About Teresa page (`/teresa-ristow-io/about/`)
- `pages/contact.html`: Contact page (`/teresa-ristow-io/contact/`)
- `_posts/*.html`: Individual blog posts (URL: `/teresa-ristow-io/blog/{year}/{month}/{title}/`)
- `pages/structured-hiring.html`: Example course landing page (`/teresa-ristow-io/courses/structured-hiring/`)

**Configuration:**
- `_config.yml`: Jekyll build config (title, url, baseurl, plugins, defaults, permalinks, excluded files)
- `.gitignore`: Git exclusions
- `robots.txt`: Crawler directives (Liquid template)
- `404.html`: Custom 404 page (Liquid template)

**Core Logic:**
- `_layouts/default.html`: Master page shell (includes head, header, footer, json-ld, main.js)
- `_layouts/post.html`: Blog post wrapper (extends default; renders title, date, author, hero image, content)
- `_layouts/page.html`: Static page wrapper (extends default; renders title, content)
- `_layouts/landing.html`: Course landing page wrapper (extends default; renders hero section, landing-specific content)
- `_includes/nav.html`: Navigation menu (data-driven from `_data/navigation.yml`; active state logic)
- `_includes/course-card.html`: Course preview card (parameterized; button logic based on `status` and `kajabi_url`)
- `_includes/json-ld.html`: Structured data (conditional schemas: BlogPosting, Course, Person)

**Data (SSOT):**
- `_data/courses.yml`: All 10 courses (title, subtitle, price, status, kajabi_url, landing_page, description, features)
- `_data/navigation.yml`: Main nav menu (title, url pairs)
- `_data/social.yml`: Social media links (platform, url, label)

**Styling:**
- `assets/css/style.css`: Single stylesheet with design tokens, layout system, component styles, responsive breakpoints
- Design tokens: Colors (plum, gold, olive, terracotta, backgrounds, text), typography, spacing scale, border radius, shadows, transitions
- Layout: `.container` (1392px), `.container--narrow` (720px), `.container--wide` (960px); grid and flex utilities
- Components: `.site-header`, `.site-nav`, `.site-footer`, `.post`, `.post-card`, `.page`, `.course-card`, `.cta-block`, `.landing-*`, `.btn`, `.badge`

**JavaScript:**
- `assets/js/main.js`: Global interactivity (nav toggle on mobile, escape key to close nav)
- `assets/js/components/sample-chart.js`: Example React component (bar chart visualization)

**Testing:**
- Not applicable (static site; no automated tests; manual review only)

## Naming Conventions

**Files:**
- HTML pages (static): `kebab-case.html` (e.g., `about.html`, `structured-hiring.html`)
- Blog posts: `YYYY-MM-DD-slug.html` (Jekyll date-based naming, e.g., `2026-03-28-welcome.html`)
- Layouts: `kebab-case.html` (e.g., `default.html`, `landing.html`)
- Includes: `kebab-case.html` (e.g., `cta-block.html`, `course-card.html`)
- Data files: `kebab-case.yml` (e.g., `courses.yml`, `navigation.yml`)
- CSS: Single file `style.css`; sections marked with `/* ======= N. Section Name ======= */` comments
- JavaScript: `kebab-case.js` (e.g., `main.js`, `sample-chart.js`)
- Images: `{context}-{slug}-{orientation}.{ext}` (e.g., `post-hiring-bias-landscape.jpg`)
- Documentation: `kebab-case.md` (e.g., `architecture-overview.md`)

**Directories:**
- Jekyll special dirs: `_` prefix (`_layouts`, `_includes`, `_posts`, `_data`)
- Public asset dirs: `assets/` (css, js, images)
- Content dirs: `pages/` (static pages)
- Agent workspace: `.claude/` (excluded from build)
- GSD planning: `.planning/codebase/` (excluded from build)

## Where to Add New Code

**New Blog Post:**
- File: `_posts/YYYY-MM-DD-slug.html`
- Frontmatter: `layout: post`, `title`, `date`, `author` (optional, defaults to "Teresa Ristow"), `image_landscape`, `image_portrait` (optional), `excerpt` (optional)
- Content: Plain HTML or HTML with Liquid (can include `{% include react-mount.html %}` and `[data-component]` divs for interactive elements)
- Permalink: Auto-generated by `_config.yml` rule `/blog/:year/:month/:title/`; no need to declare

**New Static Page (about, contact, etc.):**
- File: `pages/slug.html`
- Frontmatter: `layout: page`, `title`, `permalink: /slug/`
- Content: Plain HTML or HTML with Liquid
- Auto-layout: Jekyll applies `page.html` layout

**New Course Landing Page:**
- File: `pages/course-slug.html`
- Frontmatter: `layout: landing`, `title`, `permalink: /courses/course-slug/`, `hero_headline`, `hero_subheadline`, `hero_cta_text`, `hero_cta_url`
- Content: Plain HTML or HTML with Liquid
- Auto-layout: Jekyll applies `landing.html` layout; sets `body_class: landing-page`
- Add course to `_data/courses.yml`: Declare title, subtitle, price, status, kajabi_url, landing_page (permalink), description, features

**New Reusable Component:**
- File: `_includes/component-name.html`
- Pattern: HTML with Liquid; parameters accessed as `include.param_name`
- Usage: `{% include component-name.html param1=value1 param2=value2 %}`
- Example: `_includes/cta-block.html` (headline, description, button_text, button_url, style)

**New React Component:**
- File: `assets/js/components/component-name.js`
- Pattern: IIFE with React.createElement (no JSX, no build step)
- Mount discovery: Include `{% include react-mount.html %}` in post/page; mount script queries `[data-component="component-name"]`
- Example: `assets/js/components/sample-chart.js` (bar chart with props `label`, `values`)

**New Navigation Item:**
- File: `_data/navigation.yml`
- Add entry: `- title: "Label" \n  url: /path/` under `main:` array
- Active state: Automatically applied when `page.url == item.url`

**New Course (add to catalog):**
- File: `_data/courses.yml`
- Add entry with: `key`, `title`, `subtitle`, `vertical` (employer/job-seeker), `price_display`, `status` (future/coming-soon/active), `kajabi_url` (empty if not active), `landing_page` (empty if none), `description`, `features` (array)
- Used by: `course-card.html` on homepage, courses listing, and course catalog pages

**Styling for New Component:**
- File: `assets/css/style.css`
- Location: Add to appropriate section (or new section if not 300+ lines)
- Pattern: BEM naming (`--color-*` custom properties for colors, `--space-*` for spacing, `--text-*` for font sizes)
- Mobile-first: Base styles for mobile (<600px), then breakpoints (@media (min-width: 600px), 768px, 1024px)
- Responsive images: Use `_includes/responsive-image.html` with landscape/portrait art direction

## Special Directories

**`.github/workflows/`:**
- Purpose: GitHub Actions CI/CD (GitHub Pages deployment)
- Generated: Yes (GitHub-managed)
- Committed: Yes (part of repo)
- Note: Do not modify; these are GitHub Skills exercise files

**`_site/`:**
- Purpose: Build output (generated by Jekyll)
- Generated: Yes (build artifact)
- Committed: No (in .gitignore)
- Note: Created during `jekyll build`; serves as the deployed site to GitHub Pages

**`.claude/`:**
- Purpose: Agent workspace
- Generated: No (manually maintained)
- Committed: Yes (part of repo)
- Note: Excluded from build by `_config.yml` exclude list; contains documentation and skills

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents
- Generated: Yes (by GSD agents)
- Committed: Yes (part of repo)
- Note: Excluded from build by `_config.yml` exclude list; generated by `/gsd-map-codebase`

---

*Structure analysis: 2026-04-04*
