# CLAUDE.md - Blog Posts

This file covers blog post creation and editing in `_posts/`.

## Rules (inherited)

- Always use `| relative_url` on internal links and asset paths
- No em-dashes in any content
- Never push to remote

## File Naming

```
YYYY-MM-DD-slug.html
```

Example: `2026-03-28-welcome.html`

The date determines publication date and URL. The slug becomes the URL-friendly title.

## Permalink Structure

```
/blog/:year/:month/:title/
```

Example: `/blog/2026/03/welcome/`

## Frontmatter

### Required

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Appears in h1, meta, feeds |
| `date` | date | YYYY-MM-DD format |

### Defaults (from _config.yml -- can be omitted)

- `layout: post`
- `author: "Teresa Ristow"`

### Optional

| Field | Type | Description |
|-------|------|-------------|
| `excerpt` | string | Custom excerpt for meta and post cards (auto-generated if omitted) |
| `categories` | list | Post categories |
| `tags` | list | Post tags |
| `image` | string | Featured image for OG meta (jekyll-seo-tag) |
| `image_landscape` | string | Desktop hero image path (16:9, ~1200x675) |
| `image_portrait` | string | Mobile hero image path (3:4, ~600x800) |
| `image_alt` | string | Alt text for hero image (required if either image field is set) |

## Content Format

Posts use **HTML**, not Markdown. Write content directly in HTML tags:

```html
<p>First paragraph of the post.</p>

<h2>Section heading</h2>
<p>Section content here.</p>
```

## Images

### Hero images (via frontmatter)

```yaml
image_landscape: /assets/images/post-my-slug-landscape.jpg
image_portrait: /assets/images/post-my-slug-portrait.jpg
image_alt: "Descriptive alt text"
```

All three fields are optional. The post layout renders a `<picture>` element with art direction when both orientations are provided.

### Inline images

```html
<img
  src="{{ '/assets/images/post-slug-chart.png' | relative_url }}"
  alt="Bar chart comparing interview validity across methods"
  width="720"
  height="405"
  loading="lazy">
```

- **Alt text is mandatory** -- describe the content, not the filename
- **Width and height are mandatory** -- prevents layout shift
- **Loading:** `eager` for above-fold, `lazy` for everything else
- **File naming:** `{context}-{slug}-{orientation}.{ext}` (e.g., `post-hiring-bias-landscape.jpg`)

## Embedding React Components

For interactive elements (charts, visualizations):

1. Add `{% include react-mount.html %}` before the component div
2. Add the component div: `<div data-component="my-chart" data-props='{"label":"Test"}'></div>`
3. Create the component file at `assets/js/components/my-chart.js`

React loads via CDN only on pages that use the include.

## Where Posts Appear

- `/blog/` page (all posts)
- Homepage (top 3 most recent)
- RSS feed (jekyll-feed)
- Sitemap (jekyll-sitemap)

## Skills to Invoke

- **Any code change (HTML, embedded JS/React):** Run `/code-review` before output (mandatory)
- **Adding a React component:** Invoke `superpowers:brainstorming` first, then `code-review` + `perf` after
- **Post with visual design work:** Invoke `frontend-design` for layout, `ui-ux-pro-max` for accessibility
- **Bug in post rendering:** Use `superpowers:systematic-debugging`

## Deep-Dive References

- [blog-posts.md](../.claude/documentation/blog-posts.md) -- full frontmatter table, SEO details, drafts, checklist
- [js-and-react-components.md](../.claude/documentation/js-and-react-components.md) -- React mount pattern, component template
