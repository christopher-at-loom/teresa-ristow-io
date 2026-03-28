# Data Files

All data files live in `_data/` and are accessed in Liquid as `site.data.FILENAME`.

## courses.yml

**Access:** `site.data.courses` (returns an array)

**Used by:** `course-card.html`, `pages/courses.html`, `index.html`

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | string | Yes | Unique identifier (kebab-case) |
| `title` | string | Yes | Course display name |
| `subtitle` | string | Yes | One-line description shown in italics |
| `vertical` | string | Yes | `employer` or `job-seeker` |
| `price_display` | string | Yes | Price range or fixed price (e.g., `"$197-297"`) |
| `status` | string | Yes | `future`, `coming-soon`, or `active` |
| `kajabi_url` | string | Yes | Kajabi enrollment URL (empty string if not active) |
| `landing_page` | string | Yes | Permalink to landing page (empty string if none) |
| `description` | string | Yes | Full description paragraph |
| `features` | string[] | Yes | Array of feature/benefit strings (shown as checklist) |

### Valid Values

- **vertical:** `employer`, `job-seeker`
- **status:** `future`, `coming-soon`, `active`

### Example Entry

```yaml
- key: structured-hiring
  title: "Structured Hiring That Works"
  subtitle: "Evidence-based selection that reduces bias and improves quality of hire"
  vertical: employer
  price_display: "$197-297"
  status: coming-soon
  kajabi_url: ""
  landing_page: /courses/structured-hiring/
  description: "Learn to design and implement structured interview systems..."
  features:
    - "15-component structured interview framework"
    - "Adverse impact analysis tools"
    - "Legal compliance checklists"
```

### Current Course Count

- 7 employer vertical courses
- 3 job-seeker vertical courses
- 10 total

### Looping and Filtering

```liquid
<!-- All courses -->
{% for course in site.data.courses %}
  {% include course-card.html course=course %}
{% endfor %}

<!-- Filter by vertical -->
{% for course in site.data.courses %}
  {% if course.vertical == "employer" %}
    {% include course-card.html course=course %}
  {% endif %}
{% endfor %}

<!-- Exclude future courses -->
{% for course in site.data.courses %}
  {% unless course.status == "future" %}
    {% include course-card.html course=course %}
  {% endunless %}
{% endfor %}
```

---

## navigation.yml

**Access:** `site.data.navigation.main` (returns an array)

**Used by:** `nav.html`

### Schema

The file has a top-level `main` key containing an array of navigation items.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Display text for the nav link |
| `url` | string | Yes | URL path (passed through `relative_url` filter) |

### Current Content

```yaml
main:
  - title: Home
    url: /
  - title: About
    url: /about/
  - title: Courses
    url: /courses/
  - title: Blog
    url: /blog/
  - title: Contact
    url: /contact/
```

### Adding/Removing/Reordering

- **Add:** Append a new `- title: / url:` entry under `main:`
- **Remove:** Delete the entry
- **Reorder:** Move entries up/down in the array

Changes take effect on next build. The nav renders in array order.

### Active State

`nav.html` compares `page.url` to `item.url` to apply the active class. Ensure URLs match exactly (including trailing slashes).

---

## social.yml

**Access:** `site.data.social` (returns an array)

**Used by:** `social-links.html`, `pages/contact.html`

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `platform` | string | Yes | Platform identifier (e.g., `linkedin`, `twitter`) |
| `url` | string | Yes | Full URL to profile |
| `label` | string | Yes | Accessible display text (e.g., `LinkedIn`, `Twitter`) |

### Current Content

```yaml
- platform: linkedin
  url: https://linkedin.com/in/teresaristow
  label: LinkedIn

- platform: twitter
  url: https://twitter.com/teresaristow
  label: Twitter
```

### Adding a Platform

```yaml
- platform: github
  url: https://github.com/username
  label: GitHub
```

---

## YAML Formatting Rules

- **Indentation:** 2 spaces (never tabs)
- **Strings:** Quote strings that contain special YAML characters (`:`, `#`, `{`, `}`, `[`, `]`, `,`, `&`, `*`, `?`, `|`, `-`, `<`, `>`, `=`, `!`, `%`, `@`, backtick)
- **Empty strings:** Use `""` (not blank/null)
- **Arrays:** Use `- item` syntax, indented under the parent key
- **Booleans:** Use `true`/`false` (lowercase)
- **No trailing whitespace**
