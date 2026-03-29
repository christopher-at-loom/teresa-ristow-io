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
