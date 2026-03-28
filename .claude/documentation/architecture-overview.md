# Architecture Overview

## System Summary

GitHub Pages site running Jekyll 3.10.0. HTML-first (no Markdown content files). Single CSS file with custom properties. React 18 via CDN for interactive blog components. 10 courses across 2 verticals (employer, job-seeker) hosted on Kajabi; this site serves as the blog, course catalog, and landing page funnel.

## How GitHub Pages + Jekyll Works

1. Developer pushes to `main` branch
2. GitHub Actions detects the push and runs a Jekyll build
3. Jekyll processes Liquid templates, data files, and layouts into static HTML
4. Static HTML is deployed to GitHub Pages CDN
5. Browser requests URL, receives pre-built HTML

There is no server-side runtime. Everything is static after build.

## Layout Inheritance

```
default.html            <-- full HTML shell (doctype, head, header, main, footer, json-ld, main.js)
  ├── page.html         <-- static pages (about, blog listing, courses, contact)
  ├── post.html         <-- blog posts from _posts/
  └── landing.html      <-- course sales/landing pages
```

All three child layouts declare `layout: default` in frontmatter. Default wraps their content in `<main id="main-content">`.

## Data Flow

```
_data/*.yml  -->  Liquid loops in templates  -->  rendered HTML

Example:
  _data/courses.yml
    --> {% for course in site.data.courses %}
      --> {% include course-card.html course=course %}
        --> rendered <div class="course-card">...</div>
```

Data files are accessed as `site.data.FILENAME` (without extension). Arrays are looped with `{% for %}`. Filtering uses `{% if item.field == "value" %}`.

## Include (Snippet) System

Includes live in `_includes/`. Called with `{% include name.html %}`. Parameters passed inline:

```liquid
{% include cta-block.html headline="Title" button_text="Click" button_url="/page/" style="primary" %}
```

Inside the include, parameters are accessed as `include.headline`, `include.button_text`, etc. Object parameters (like `course`) pass the full object.

## Asset Pipeline

| Type | Location | Notes |
|------|----------|-------|
| CSS | `assets/css/style.css` | Single file, loaded by head.html |
| JS (global) | `assets/js/main.js` | Loaded with `defer` by default.html |
| JS (React components) | `assets/js/components/*.js` | Loaded on-demand by react-mount.html |
| Images | `assets/images/` | Referenced with `relative_url` filter |
| Favicon | `assets/favicon.ico` | Linked in head.html |

All asset paths use the `| relative_url` Liquid filter to prepend `baseurl`.

## SEO Infrastructure

| Feature | Source |
|---------|--------|
| Open Graph + Twitter Cards | `jekyll-seo-tag` plugin (auto from `{% seo %}` in head.html) |
| Canonical URLs | `jekyll-seo-tag` |
| Sitemap | `jekyll-sitemap` plugin (auto-generates /sitemap.xml) |
| RSS Feed | `jekyll-feed` plugin (auto-generates /feed.xml, meta tag via `{% feed_meta %}`) |
| JSON-LD structured data | Custom `json-ld.html` include (BlogPosting, Course, Person by layout type) |
| robots.txt | Manual file with Sitemap URL using Liquid |
| OG default image | `og_image` in _config.yml |
| Twitter card type | `twitter.card: summary_large_image` in _config.yml |

## Build Exclusions

In `_config.yml`:
```yaml
exclude: [README.md, LICENSE, CLAUDE.md, .claude, "*.code-workspace"]
```

These files exist in the repo but are not included in the built site.

## Request Flow

```
Browser requests URL
  --> GitHub Pages CDN serves static HTML
    --> HTML loads style.css (single file)
    --> HTML loads main.js (deferred)
    --> If post includes react-mount.html:
        --> React 18 CDN scripts load
        --> Mount script discovers [data-component] elements
        --> Component JS files load from /assets/js/components/
        --> Components render into their mount points
```

## Key Config Values (_config.yml)

| Key | Value | Purpose |
|-----|-------|---------|
| `url` | `https://christopher-at-loom.github.io` | Site origin |
| `baseurl` | `/skills-github-pages` | Path prefix for all URLs |
| `permalink` | `/blog/:year/:month/:title/` | Blog post URL structure |
| `markdown` | `kramdown` | Markdown processor (rarely used; content is HTML) |

## Directory Structure

```
skills-github-pages/
├── _config.yml          # Jekyll config
├── _layouts/            # 4 layouts (default, page, post, landing)
├── _includes/           # 11 includes (reusable components)
├── _data/               # 3 YAML data files (courses, navigation, social)
├── _posts/              # Blog posts (YYYY-MM-DD-slug.html)
├── pages/               # Static pages with permalinks
├── assets/              # CSS, JS, images
├── index.html           # Homepage
├── 404.html             # Custom 404
├── robots.txt           # Crawler directives
└── .claude/             # Agent workspace (excluded from build)
```
