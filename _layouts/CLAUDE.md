# CLAUDE.md - Layouts & Includes

This file covers `_layouts/` and `_includes/`. These directories are always co-edited -- layouts consume includes, and include changes affect layout rendering.

## Rules (inherited)

- Always use `| relative_url` on internal links and asset paths
- No em-dashes in any content
- Never push to remote

## Layout Inheritance

```
default.html (master shell)
├── page.html      Static pages (about, blog listing, courses, contact)
├── post.html      Blog posts from _posts/
└── landing.html   Course landing/sales pages
```

All layouts extend default. **Never create a layout that doesn't extend default** unless you have an explicit reason (e.g., a bare-bones email template).

### default.html (the shell contract)

Every page gets:
- `<!DOCTYPE html>`, `<html lang="en">`
- `{% include head.html %}` -- meta, SEO, CSS, feed
- `{% include header.html %}` -- site header with skip-nav
- `<main id="main-content">{{ content }}</main>`
- `{% include footer.html %}` -- footer with social links
- `{% include json-ld.html %}` -- structured data (conditional by layout)
- `<script src="{{ '/assets/js/main.js' | relative_url }}" defer></script>`
- Supports `body_class` variable from child layouts

### page.html
Wraps content in `<article class="page">` with `<header>` and `<h1>{{ page.title }}</h1>`.

### post.html
Wraps content in `<article class="post">` with header (title, meta with date/author), content in `.post__content`. Renders hero image via `responsive-image.html` if frontmatter provides `image_landscape`/`image_portrait`.

### landing.html
Renders a hero section from frontmatter (`hero_headline`, `hero_subheadline`, `hero_cta_text`, `hero_cta_url`). Sets `body_class: landing-page`.

## Include Inventory

| Include | Parameters | Notes |
|---------|-----------|-------|
| head.html | (none) | Auto-included by default |
| header.html | (none) | Auto-included; contains skip-nav link |
| nav.html | (none) | Included by header; reads `_data/navigation.yml`; active state via `page.url == item.url` |
| footer.html | (none) | Auto-included; includes social-links.html |
| social-links.html | (none) | Reads `_data/social.yml`; `target="_blank" rel="noopener noreferrer"` |
| json-ld.html | (none) | Auto-included; renders BlogPosting/Course/Person conditionally by `page.layout` |
| cta-block.html | headline, description, button_text, button_url, style (primary/secondary) | Defaults to primary style |
| course-card.html | course (object) | Reads title/status/subtitle/description/features/price/kajabi_url/landing_page |
| post-card.html | post (object) | Renders url/title/date/excerpt (stripped, truncated 30 words) |
| react-mount.html | (none) | Loads React 18 CDN; discovers `[data-component]` elements; guard prevents double-load |
| responsive-image.html | landscape, portrait, alt, loading, css_class, width_l, height_l, width_p, height_p | Art-directed `<picture>` with mobile/desktop sources |
| analytics.html | (none) | Placeholder (HTML comment only, not auto-included) |

### Include parameter caveat

Liquid variables containing curly braces cannot be passed directly to includes. Use `{% capture %}` first:

```liquid
{% capture my_url %}{{ page.url | relative_url }}{% endcapture %}
{% include cta-block.html button_url=my_url %}
```

## Responsive Image Include Quick Reference

- **Hero/header images:** Use `responsive-image.html` with both landscape + portrait for art-directed mobile/desktop
- **Inline images:** Plain `<img>` tag -- no `<picture>` needed
- `loading="eager"` for above-fold, `lazy` (default) for everything else
- Alt text and width/height are mandatory on all images

## Skills to Invoke

- **Any code change:** Run `/code-review` before output (mandatory)
- **Adding/redesigning a layout or include:** Invoke `frontend-design` for visual structure, `ui-ux-pro-max` for design tokens and accessibility
- **Performance concerns (render-blocking, asset loading):** Invoke `perf`
- **Multi-file changes:** Use `superpowers:writing-plans` before starting
- **Creative/feature work:** Use `superpowers:brainstorming` first

## Deep-Dive References

- [layouts-and-includes.md](../.claude/documentation/layouts-and-includes.md) -- full include params, code examples, dependency graph
- [architecture-overview.md](../.claude/documentation/architecture-overview.md) -- system design, request flow, build pipeline
