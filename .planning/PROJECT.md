# Teresa Ristow Site

## What This Is

Public-facing blog, course funnel, and landing page site for Dr. Teresa Ristow's I/O Psychology practice. Built on GitHub Pages with Jekyll 3.10.0. Serves as the primary discovery and conversion path to Kajabi-hosted courses.

## Core Value

Drive qualified traffic from blog content to course landing pages, converting readers into Kajabi course enrollees.

## Requirements

### Validated

- ✓ Blog publishing with HTML posts and Jekyll templating -- existing
- ✓ Course landing pages with parameterized CTA blocks -- existing
- ✓ Data-driven course catalog from _data/courses.yml (10 courses) -- existing
- ✓ SEO infrastructure (jekyll-seo-tag, sitemap, structured data) -- existing
- ✓ Responsive design with CSS custom properties design system -- existing
- ✓ Progressive React 18 integration for interactive blog components -- existing
- ✓ Accessible navigation with skip-nav and keyboard support -- existing
- ✓ RSS feed generation via jekyll-feed -- existing

### Active

(No active requirements -- initialize with `/gsd-new-milestone` when ready)

### Out of Scope

- Server-side processing -- GitHub Pages is static-only
- Markdown content files -- all content is HTML by convention
- Non-whitelisted Jekyll plugins -- GitHub Pages constraint
- Course hosting -- handled by Kajabi

## Context

- Site is deployed via GitHub Pages with automatic rebuild on push
- Christopher Pierce develops; Dr. Teresa Ristow owns content
- React 18 loads conditionally via CDN only on pages that need interactivity
- Single CSS file with custom properties serves as the design system
- No build pipeline -- CSS/JS delivered as-is per GitHub Pages constraints
- Codebase map exists at `.planning/codebase/`

## Constraints

- **Platform**: GitHub Pages (Jekyll 3.10.0) -- no server-side runtime, whitelisted plugins only
- **Deployment**: User pushes via GitHub Desktop; Claude never pushes
- **Content format**: HTML only (no Markdown) -- established convention
- **JS baseline**: ES5 -- no transpiler available
- **Workflows**: `.github/workflows/` files are GitHub Skills exercises, never modify

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| HTML over Markdown for content | Greater layout control within GitHub Pages constraints | ✓ Good |
| React 18 via CDN | Interactive components without build tooling | ✓ Good |
| Single CSS file with custom properties | Design system without SASS (GitHub Pages limitation) | ✓ Good |
| YAML data files as SSOT | Centralized course/nav/social data, Liquid renders | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check -- still the right priority?
3. Audit Out of Scope -- reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-04 after initialization*
