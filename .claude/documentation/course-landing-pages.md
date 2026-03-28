# Course Landing Pages

## File Location

Landing pages live in `pages/` with a descriptive filename:

```
pages/course-name.html
```

Example: `pages/structured-hiring.html`

## Required Frontmatter

```yaml
---
layout: landing
title: "Course Title"
permalink: /courses/course-name/
---
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `layout` | string | Yes | Must be `landing` |
| `title` | string | Yes | Course title (used in `<title>` tag and SEO) |
| `permalink` | string | Yes | URL path (use `/courses/slug/` pattern) |

## Hero Frontmatter

The landing layout renders a hero section when `hero_headline` is present.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hero_headline` | string | No | Large hero heading (renders as h1) |
| `hero_subheadline` | string | No | Supporting text below headline |
| `hero_cta_text` | string | No | Button text (renders as `btn btn--primary`) |
| `hero_cta_url` | string | No | Button destination URL |

**Example:**
```yaml
---
layout: landing
title: "Structured Hiring That Works"
permalink: /courses/structured-hiring/
hero_headline: "Stop Guessing. Start Hiring."
hero_subheadline: "A research-backed framework for structured interviews."
hero_cta_text: "Join the Waitlist"
hero_cta_url: "#waitlist"
---
```

## Additional Frontmatter for JSON-LD

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Course description for JSON-LD (falls back to `hero_subheadline`) |
| `price_display` | string | Price for JSON-LD Course schema offers |
| `course_key` | string | Key matching the course in `_data/courses.yml` |

## Recommended Content Sections

Structure the page body with semantic sections:

```html
<section class="landing-section">
  <h2>The Problem</h2>
  <p>What pain point does this course address?</p>
</section>

<section class="landing-section">
  <h2>What You Will Learn</h2>
  <ul class="feature-list">
    <li>Key outcome 1</li>
    <li>Key outcome 2</li>
  </ul>
</section>

<section class="landing-section">
  <h2>Who This Course Is For</h2>
  <ul>
    <li><strong>Role</strong> -- description</li>
  </ul>
</section>

<section class="landing-section">
  <h2>About the Instructor</h2>
  <p>Teresa Ristow bio paragraph.</p>
</section>

<div id="waitlist">
  {% include cta-block.html headline="Be the first to know" description="Join the waitlist." button_text="Join" button_url="#waitlist" style="primary" %}
</div>
```

## Connection to _data/courses.yml

Each course has a record in `_data/courses.yml` with a `landing_page` field pointing to the permalink. Keep these in sync:

- The `landing_page` field in courses.yml should match the `permalink` in the landing page frontmatter
- The `course_key` field in the landing page frontmatter should match the `key` in courses.yml
- Content on the landing page should be consistent with the course description and features in courses.yml

**courses.yml is the single source of truth** for course metadata (title, price, status, features). The landing page expands on this with full sales copy.

## How course-card.html Renders Courses

The `course-card.html` include renders courses on the catalog page (`pages/courses.html`):

```liquid
{% for course in site.data.courses %}
  {% if course.vertical == "employer" %}
    {% include course-card.html course=course %}
  {% endif %}
{% endfor %}
```

**Card contents:** title, status badge, subtitle, description, features list (with checkmarks), price, action button.

**Button logic in the card:**
- Status `active` + `kajabi_url` not empty: "Enroll Now" button linking to Kajabi
- `landing_page` not empty: "Learn More" button linking to landing page
- Neither: no button shown

## Homepage Display

The homepage shows non-future courses:

```liquid
{% for course in site.data.courses %}
  {% unless course.status == "future" %}
    {% include course-card.html course=course %}
  {% endunless %}
{% endfor %}
```

## Status Workflow

Update the `status` field in `_data/courses.yml` as the course progresses:

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| `future` | Grey | Not yet announced; hidden from homepage |
| `coming-soon` | Yellow | Announced but not enrollable; shows on homepage |
| `active` | Green | Open for enrollment; "Enroll Now" button appears |

When changing to `active`, also populate `kajabi_url` with the Kajabi enrollment link.

## Checklist for New Landing Pages

1. Add course record to `_data/courses.yml` with `landing_page` set to the permalink
2. Create `pages/course-name.html` with landing layout and hero frontmatter
3. Write content sections (problem, solution, audience, instructor, CTA)
4. Verify the course card on `/courses/` links to the new landing page
5. Verify JSON-LD structured data renders (check page source for `application/ld+json`)
6. Update README.md if adding a new page
