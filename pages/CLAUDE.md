# CLAUDE.md - Pages

This file covers static pages and course landing pages in `pages/`.

## Rules (inherited)

- Always use `| relative_url` on internal links and asset paths
- No em-dashes in any content
- Never push to remote

## Two Page Types

### Static pages (layout: page)

Standard content pages. Layout wraps content in `<article class="page">` with an `<h1>`.

Current pages: about, blog, contact, courses.

```yaml
---
layout: page
title: "Page Title"
permalink: /slug/
---
```

### Landing pages (layout: landing)

Course sales pages with hero sections. Layout renders a hero from frontmatter, sets `body_class: landing-page`.

Current pages: structured-hiring.

```yaml
---
layout: landing
title: "Course Title - Full Name"
permalink: /courses/slug/
hero_headline: "Compelling Headline"
hero_subheadline: "Supporting text"
hero_cta_text: "Enroll Now"
hero_cta_url: "https://kajabi-url.com"
---
```

## Permalink Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Static | `/slug/` | `/about/`, `/contact/` |
| Landing | `/courses/slug/` | `/courses/structured-hiring/` |

Trailing slashes are required for consistency.

## Landing Page Rules

- **Course data comes from `_data/courses.yml`** -- do not hardcode course metadata in the page
- Keep `permalink` in page frontmatter in sync with `landing_page` in courses.yml
- Hero frontmatter fields (`hero_headline`, `hero_subheadline`, `hero_cta_text`, `hero_cta_url`) are all optional -- the layout handles missing values gracefully
- Recommended content sections: The Problem, What You Will Learn, Who This Course Is For, About the Instructor, CTA

## Content Format

Pages use **HTML**, not Markdown. Write content directly in HTML tags.

Use available includes for reusable components:

```liquid
{% include cta-block.html headline="Ready to start?" button_text="Enroll Now" button_url="/courses/structured-hiring/" style="primary" %}

{% include course-card.html course=course %}
```

## Adding a New Page

1. Create `pages/slug.html` with frontmatter (layout, title, permalink)
2. If it's a landing page, add/update the course entry in `_data/courses.yml`
3. If it should appear in nav, add an entry to `_data/navigation.yml`
4. **Update README.md** to reflect the new page

## Skills to Invoke

- **Any code change:** Run `/code-review` before output (mandatory)
- **New page or landing page:** Invoke `superpowers:brainstorming` → `ui-ux-pro-max` (design system, palette, typography) → `frontend-design` (distinctive aesthetics)
- **Redesigning an existing page:** Invoke `ui-ux-pro-max` for accessibility audit, `frontend-design` for visual polish
- **Performance concerns:** Invoke `perf` (image loading, CSS delivery, Core Web Vitals)
- **Multi-file changes (page + data + includes):** Use `superpowers:writing-plans` before starting

## Deep-Dive References

- [course-landing-pages.md](../.claude/documentation/course-landing-pages.md) -- full landing page guide, status workflow, checklist
- [layouts-and-includes.md](../.claude/documentation/layouts-and-includes.md) -- available includes with parameters
