# Layouts and Includes Reference

## Layouts

### default.html

The master shell. All other layouts extend this.

**Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>{% include head.html %}</head>
<body class="{{ page.body_class }}">
  {% include header.html %}
  <main id="main-content" class="site-main">
    {{ content }}
  </main>
  {% include footer.html %}
  {% include json-ld.html %}
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```

**Features:**
- `page.body_class` support (used by landing.html to add `landing-page` class)
- Includes: head.html, header.html, footer.html, json-ld.html
- Loads main.js with `defer`

---

### page.html

Extends `default`. Used for static pages (about, blog listing, courses, contact).

**Structure:**
```html
<article class="page">
  <header class="page__header">
    <h1 class="page__title">{{ page.title }}</h1>
  </header>
  <div class="page__content">{{ content }}</div>
</article>
```

**Applied automatically** to files in `pages/` via `_config.yml` defaults.

---

### post.html

Extends `default`. Used for blog posts in `_posts/`.

**Structure:**
```html
<article class="post">
  <header class="post__header">
    <h1 class="post__title">{{ page.title }}</h1>
    <div class="post__meta">
      <time class="post__date">{{ page.date formatted }}</time>
      <span class="post__author">by {{ page.author }}</span>  (if set)
    </div>
  </header>
  <div class="post__content">{{ content }}</div>
</article>
```

**Applied automatically** to files in `_posts/` via `_config.yml` defaults. Default author: "Teresa Ristow".

---

### landing.html

Extends `default`. Used for course sales/landing pages.

**Frontmatter fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hero_headline` | string | No | Large hero heading |
| `hero_subheadline` | string | No | Supporting text below headline |
| `hero_cta_text` | string | No | Button text |
| `hero_cta_url` | string | No | Button URL |

**Structure:**
```html
<div class="landing">
  <section class="landing-hero"> (if hero_headline set)
    <div class="container">
      <h1>{{ page.hero_headline }}</h1>
      <p>{{ page.hero_subheadline }}</p>  (if set)
      <a href="{{ page.hero_cta_url }}" class="btn btn--primary">{{ page.hero_cta_text }}</a>  (if set)
    </div>
  </section>
  <div class="landing__content">{{ content }}</div>
</div>
```

**Sets** `body_class: landing-page` in its own frontmatter (inherited by default.html).

---

## Includes

### head.html

**Purpose:** `<head>` block with meta tags, SEO, CSS, and feed meta.

**Parameters:** None

**Includes/outputs:**
- charset and viewport meta
- Title tag: `page.title | site.title` or just `site.title`
- `{% seo %}` (jekyll-seo-tag)
- CSS stylesheet link
- `{% feed_meta %}` (jekyll-feed)
- Favicon link

---

### header.html

**Purpose:** Site header with skip-nav link and navigation.

**Parameters:** None

**Includes:** nav.html

**Structure:** Skip-nav link, site title link, hamburger toggle button, nav include.

---

### nav.html

**Purpose:** Main navigation menu, data-driven from `_data/navigation.yml`.

**Parameters:** None

**Data source:** `site.data.navigation.main`

**Features:**
- Active state: adds `site-nav__link--active` class when `page.url == item.url`
- Accessibility: `aria-current="page"` on active link
- All URLs passed through `| relative_url`

---

### footer.html

**Purpose:** Site footer with copyright and social links.

**Parameters:** None

**Includes:** social-links.html

**Features:** Dynamic year via `site.time | date: '%Y'`

---

### social-links.html

**Purpose:** Social media links in footer.

**Parameters:** None

**Data source:** `site.data.social`

**Renders** a link for each entry with `target="_blank" rel="noopener noreferrer"` and `aria-label`.

---

### json-ld.html

**Purpose:** Structured data (Schema.org) for SEO. Renders different schemas based on layout.

**Parameters:** None

**Conditional output:**

| Condition | Schema Type | Key Fields |
|-----------|-------------|------------|
| `page.layout == "post"` | BlogPosting | headline, datePublished, author, description, url |
| `page.layout == "landing"` | Course | name, description, provider, offers (if price_display) |
| about page | Person | name, jobTitle, alumniOf, description, url |
| homepage (`page.url == "/"`) | Person | Same as about |

---

### course-card.html

**Purpose:** Renders a single course preview card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `course` | object | Yes | A course object from `site.data.courses` |

**Usage:** `{% include course-card.html course=course %}`

**Reads from course object:** title, status, subtitle, description, features, price_display, kajabi_url, landing_page.

**Button logic:**
- `status == "active"` AND `kajabi_url` not empty: "Enroll Now" (primary)
- `landing_page` not empty: "Learn More" (secondary)
- Otherwise: no button

---

### post-card.html

**Purpose:** Renders a blog post preview card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `post` | object | Yes | A post object from `site.posts` |

**Usage:** `{% include post-card.html post=post %}`

**Reads from post object:** url, title, date, excerpt. Excerpt is stripped of HTML and truncated to 30 words.

---

### cta-block.html

**Purpose:** Call-to-action banner section.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headline` | string | No | - | Section heading |
| `description` | string | No | - | Supporting text |
| `button_text` | string | No | - | Button label |
| `button_url` | string | No | - | Button destination |
| `style` | string | No | `primary` | `primary` (dark bg) or `secondary` (warm bg) |

**Usage:**
```liquid
{% include cta-block.html headline="Ready?" description="Browse courses." button_text="View Courses" button_url="/courses/" style="primary" %}
```

---

### react-mount.html

**Purpose:** Loads React 18 via CDN and discovers/mounts `[data-component]` elements.

**Parameters:** None

**Usage:** `{% include react-mount.html %}` -- add in any post/page before `[data-component]` divs.

**Guard:** Uses `{% unless page.react_loaded %}` to prevent double-loading. Set `react_loaded: true` in frontmatter if manually loading React.

**Behavior:** On DOMContentLoaded, queries all `[data-component]` elements, creates a `<script>` tag for each pointing to `/assets/js/components/{name}.js`.

---

### analytics.html

**Purpose:** Placeholder for future analytics/tracking code.

**Parameters:** None

**Current content:** HTML comment only. Not included by any layout (available for manual inclusion).

---

## Include Dependency Graph

```
default.html
  ├── head.html
  ├── header.html
  │     └── nav.html          (reads _data/navigation.yml)
  ├── footer.html
  │     └── social-links.html (reads _data/social.yml)
  └── json-ld.html
```
