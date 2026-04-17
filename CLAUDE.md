# CLAUDE.md - Teresa Ristow GitHub Pages Site

Public-facing blog, course funnel, and landing page site for Dr. Teresa Ristow's I/O Psychology courses (hosted on Kajabi). Built on GitHub Pages with Jekyll 3.10.0.

## Safety Rules

- **Never push to remote** -- user handles deployment via GitHub Desktop
- **Never modify .github/workflows/** -- these are GitHub Skills exercise files
- **Always use `| relative_url` filter** on internal links and asset paths
- **README.md is the admin guide** -- any agent that adds/removes/renames layouts, includes, data files, or pages MUST update README.md

## Tech Stack

- **Templating:** Jekyll 3.10.0 / Liquid
- **Content:** HTML (not Markdown -- all content files use .html)
- **Styling:** Single CSS file with custom properties (assets/css/style.css)
- **JavaScript:** Vanilla JS (main.js) + React 18 via CDN for interactive blog components
- **Plugins:** jekyll-feed, jekyll-seo-tag, jekyll-sitemap (all GitHub Pages whitelisted)
- **Data:** YAML files in _data/ (courses, navigation, social)

## Key Constraints

- **Jekyll 3.10.0** -- GitHub Pages version; do not use Jekyll 4.x features
- **Plugin whitelist** -- Only jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- **ES5 only** -- no transpiler available
- **Include parameter caveat** -- Liquid variables with curly braces cannot be passed directly to includes; use `{% capture %}` first
- **No em-dashes** in any content (inherited from parent workspace)
- **baseurl trap** -- url, baseurl, and CNAME must change simultaneously for custom domain. See .claude/documentation/deployment.md

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| No theme (fully custom) | HTML-first control |
| HTML for posts, not MD | User preference; Jekyll processes .html identically |
| Single CSS file, no preprocessor | No build step on GH Pages; CSS custom properties for variables |
| React via CDN, not bundled | No build tooling; createElement avoids JSX; loads only when needed |
| Custom JSON-LD via include | jekyll-seo-tag only does WebSite/WebPage; need Course, Person, BlogPosting |
| _data/courses.yml as SSOT | Course metadata centralized; rendered by multiple pages and includes |
| Responsive images via `<picture>` | Art direction without build pipeline |

## Active Risks

| Risk | Mitigation |
|------|------------|
| baseurl trap on custom domain | Documented in deployment.md; 3-step simultaneous change |
| React CDN (unpkg) availability | Bundle locally in assets/js/vendor/ if down |
| Single CSS file growth | Split via SASS @import at ~1500 lines |

## Documentation

Detailed specs live in `.claude/documentation/` -- read on-demand, not preloaded:
- `architecture-overview.md` -- system design, layout inheritance
- `layouts-and-includes.md` -- all layouts/includes with params and examples
- `css-architecture.md` -- token system, naming, responsive strategy
- `js-and-react-components.md` -- React mount pattern, adding components
- `blog-posts.md` -- creating posts, frontmatter, embedding components
- `course-landing-pages.md` -- creating/editing landing pages
- `data-files.md` -- _data/ file schemas
- `deployment.md` -- GitHub Pages config, custom domain, troubleshooting

Subdirectory CLAUDE.md files exist in: `_layouts/`, `_posts/`, `_data/`, `pages/`, `assets/css/`, `assets/js/`

## Inherited Constraints

From parent workspace:
- Read before writing; understand existing code before changing it
- No em-dashes in customer-facing content
- Humanizer skill required for customer-facing copy

## Skill Routing

**Code review is mandatory** on all code changes -- run `/code-review` before presenting output.

| Task | Skills (in order) |
|------|--------------------|
| New page / landing page | `superpowers:brainstorming` > `ui-ux-pro-max` > `frontend-design` > implement > `code-review` |
| CSS changes | `ui-ux-pro-max` > `perf` > implement > `code-review` |
| New React component | `superpowers:brainstorming` > implement > `code-review` > `perf` |
| Performance work | `perf` > implement > `code-review` > `superpowers:verification-before-completion` |
| Bug fix | `superpowers:systematic-debugging` > implement > `code-review` |
| Multi-file feature | `superpowers:writing-plans` > `superpowers:executing-plans` > `code-review` |

## GSD Workflow

Use `/gsd-quick` for small fixes, `/gsd-debug` for bugs, `/gsd-execute-phase` for planned work. Do not make direct repo edits outside GSD unless user explicitly bypasses.
