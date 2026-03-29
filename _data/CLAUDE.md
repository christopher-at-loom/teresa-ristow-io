# CLAUDE.md - Data Files

This file covers the YAML data files in `_data/` that drive the site.

## Rules (inherited)

- Always use `| relative_url` on internal links and asset paths
- No em-dashes in any content
- Never push to remote

## File Inventory

| File | Access | Purpose |
|------|--------|---------|
| `courses.yml` | `site.data.courses` | All 10 courses (SSOT) -- consumed by course-card, courses page, index |
| `navigation.yml` | `site.data.navigation.main` | Nav menu structure -- consumed by nav.html include |
| `social.yml` | `site.data.social` | Social media links -- consumed by social-links.html include |

## courses.yml

**This is the single source of truth for all course data.** Never duplicate course metadata elsewhere.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | string | Yes | Unique identifier (kebab-case) |
| `title` | string | Yes | Display title |
| `subtitle` | string | No | Tagline |
| `vertical` | string | Yes | `employer` or `job-seeker` |
| `price_display` | string | Yes | Price text (e.g., "$297") |
| `status` | string | Yes | `future`, `coming-soon`, or `active` |
| `kajabi_url` | string | No | Enrollment link (required when status is active) |
| `landing_page` | string | No | Permalink to landing page (e.g., `/courses/structured-hiring/`) |
| `description` | string | Yes | Short description |
| `features` | array | Yes | List of feature strings |

### Status workflow

- `future` -- grey badge, no button
- `coming-soon` -- yellow badge, no button
- `active` + `kajabi_url` -- green badge, "Enroll Now" button
- `active` + `landing_page` (no kajabi_url) -- "Learn More" button

### Key rule

When adding a landing page, keep `landing_page` in courses.yml in sync with the page's `permalink` frontmatter.

## navigation.yml

Array of `{title, url}` objects under a `main` key:

```yaml
main:
  - title: "Home"
    url: "/"
  - title: "About"
    url: "/about/"
```

All URLs pass through `| relative_url` in nav.html.

## social.yml

Array of `{platform, url, label}` objects:

```yaml
- platform: "LinkedIn"
  url: "https://linkedin.com/in/example"
  label: "Connect on LinkedIn"
```

## YAML Formatting Rules

- 2-space indentation (no tabs)
- Quote strings with special characters (`&`, `:`, `#`, `{`, `}`)
- Empty strings: `""`
- Arrays: dash syntax with space after dash
- Booleans: lowercase (`true`/`false`)
- No trailing whitespace

## Skills to Invoke

- **Any schema change:** Run `/code-review` before output (mandatory) -- data changes ripple to templates
- **Multi-file changes (data + templates):** Use `superpowers:writing-plans` before starting
- **Bug in data rendering:** Use `superpowers:systematic-debugging`

## Deep-Dive Reference

- [data-files.md](../.claude/documentation/data-files.md) -- full schemas, looping/filtering examples, validation rules
