# Testing Patterns

**Analysis Date:** 2026-04-04

## Test Framework

**Status:** Not applicable — no automated tests detected

**Why:** Static site generation (Jekyll on GitHub Pages)
- No runtime environment per se; site is pre-built HTML/CSS/JS
- Testing happens via manual review and browser inspection
- User handles visual QA in GitHub Pages preview before pushing to remote
- Code review via `/code-review` skill (mandatory before all code output)

## Test Organization

**Code review is the primary quality gate:**
- **When:** Before any code changes are presented to user (mandatory per CLAUDE.md)
- **How:** Via `/code-review` skill with language-specific reference guides (React, CSS, Liquid)
- **Checklist:** Syntax, accessibility, performance, naming consistency, component reuse

**Manual verification patterns:**
- Liquid/HTML: Preview in GitHub Pages theme editor or local Jekyll serve
- CSS: Visual inspection in browser; browser DevTools for responsive testing
- JavaScript: Browser console for errors; test interactivity in different browsers
- React components: Mount in test post, verify data-props JSON parsing and rendering

## JavaScript Testing

**Pattern: Guard-based validation**

No test framework (Jest, Vitest, etc.). JavaScript validation relies on defensive programming:

```javascript
// Guard: check element exists before using
var toggle = document.querySelector('.site-header__toggle');
var nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', function() {
    // Only runs if both elements exist
  });
}

// Guard: check React dependencies
if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
  console.warn('React not loaded. Skipping sample-chart component.');
  return;
}

// Guard: JSON parsing with fallback
var props = {};
try {
  props = JSON.parse(el.getAttribute('data-props') || '{}');
} catch(e) {
  console.warn('Invalid data-props JSON:', e);
  // props stays as {}
}
```

**Browser Console Verification:**
- Open browser DevTools console
- Check for `console.warn()` messages
- Verify no `Uncaught` errors
- Test interactivity: toggle mobile nav, interact with React components

**Files to test:**
- `assets/js/main.js` — Mobile nav toggle, Escape key handler
- `assets/js/components/*.js` — React component rendering with various data-props

## React Component Testing

**Manual Testing Pattern:**

1. **Create a test post:** Add post with component include and `data-component` div
2. **Verify in browser:**
   - Component renders without errors
   - Props are correctly parsed from JSON
   - Component responds to interactions (if applicable)
   - Browser console shows no errors
3. **Check edge cases:**
   - Missing `data-props` attribute (should use `{}` default)
   - Malformed JSON in `data-props` (should log warning and use `{}`)
   - React not loaded (should log warning and skip mount)

**Sample React Component Test:**
```html
---
layout: post
title: "Test Sample Chart"
date: 2026-04-04
react_loaded: false
---

{% include react-mount.html %}

<h2>Chart with Valid Props</h2>
<div data-component="sample-chart" data-props='{"label":"Test Data","values":[10,20,30,40,50]}'></div>

<h2>Chart with Missing Props</h2>
<div data-component="sample-chart"></div>

<h2>Chart with Malformed JSON</h2>
<div data-component="sample-chart" data-props='{"invalid json}'></div>
```

Expected behavior:
- First chart renders with custom label and values
- Second chart renders with defaults
- Third chart shows console warning and renders with defaults
- No Uncaught errors in console

## Liquid/HTML Testing

**Pattern: Manual inspection + code review**

No test framework. Verification via:

1. **Syntax check:** `/code-review` skill (mandatory)
2. **Local preview:** `jekyll serve` on developer machine
3. **GitHub Pages preview:** User previews in GitHub before pushing to remote
4. **Visual regression:** User compares old vs. new rendering in browser

**Test cases for includes:**

**`cta-block.html`:**
```liquid
<!-- Test: all parameters -->
{% include cta-block.html 
  headline="Call to Action"
  description="Learn more about our courses"
  button_text="Enroll Now"
  button_url="/courses"
  style="primary"
%}

<!-- Test: minimal parameters -->
{% include cta-block.html 
  button_text="Learn More"
  button_url="/about"
%}

<!-- Test: secondary style -->
{% include cta-block.html 
  headline="Secondary Button"
  button_text="Explore"
  button_url="/blog"
  style="secondary"
%}
```

**`course-card.html`:**
```liquid
<!-- For each course in _data/courses.yml, verify rendering -->
{% for course in site.data.courses %}
  {% include course-card.html course=course %}
{% endfor %}
```

Checks:
- Card displays title, subtitle, status badge, description, features list
- Price displays correctly (or "Coming Soon" if not set)
- CTA button links to Kajabi or landing page

**`responsive-image.html`:**
```liquid
<!-- Test: both landscape and portrait -->
{% include responsive-image.html
  landscape="/assets/images/post-slug-landscape.jpg"
  portrait="/assets/images/post-slug-portrait.jpg"
  alt="Descriptive alt text"
  width_l="1200"
  height_l="675"
  width_p="600"
  height_p="800"
  loading="eager"
%}
```

Checks:
- Picture element renders on desktop
- Portrait variant shows on mobile (DevTools responsive mode)
- Alt text is present and meaningful
- No layout shift (width/height set correctly)

## CSS Testing

**Pattern: Visual inspection + browser DevTools**

No CSS tests or linting. Verification via:

1. **Code review:** `/code-review` skill with `css-less-sass` reference
2. **Visual QA:**
   - Browser rendering at multiple breakpoints (600px, 768px, 1024px+)
   - Color contrast check with browser DevTools (WCAG AA minimum)
   - Focus styles visible for all interactive elements
3. **Performance:** No render-blocking; CSS loaded in `<head>` with no media queries on root

**Test breakpoints:**
- Mobile (360px): Full width, hamburger nav, single column
- Tablet (768px): Navigation visible, 2-column grids
- Desktop (1024px+): Full layout, 3-column grids

**Color contrast verification:**
- Use browser DevTools Accessibility tab
- `--color-gold` (#C44A2F) requires white text (WCAG AA pass)
- Body text colors (plum, text-body) on light backgrounds (mint, cream)
- Heading contrast adequate on all backgrounds

**Motion testing:**
- Disable animations in browser DevTools (Rendering > Animations)
- Set `prefers-reduced-motion: reduce` in DevTools
- Verify transitions/animations still respect preference

## Data Files Testing

**Pattern: Manual validation via preview**

`_data/` files (YAML) are validated by Jekyll build.

**`_data/courses.yml`:**
- Each course has required fields: `key`, `title`, `status`
- Optional fields have sensible defaults in includes
- Check course status badge renders correctly (colors match CSS tokens)
- Verify Kajabi URLs and landing page links are correct

**`_data/navigation.yml`:**
- Check active state highlights correctly (Jekyll checks `page.url`)
- All URLs are valid and reachable
- No broken links

**`_data/social.yml`:**
- Social media URLs are current and valid
- Icons and links render correctly in footer

## Performance Testing

**Pattern: Browser DevTools + manual inspection**

**Core Web Vitals (lighthouse):**
- Use Lighthouse in Chrome DevTools
- Target: Green scores (90+)
- Key metrics: LCP, FID, CLS

**Asset optimization:**
- CSS: Single file, no render-blocking
- JS: Deferred (main.js), loaded on demand (React)
- Images: Lazy-loaded (except above-fold), srcset for responsive, WebP if available
- Fonts: Google Fonts with preconnect

**Bundle size:**
- `style.css`: ~1710 lines (threshold before SASS split is ~2000 lines)
- `main.js`: Minimal (25 lines IIFE)
- React component size: Measure with browser DevTools Network tab

## Accessibility Testing

**Pattern: Browser DevTools Accessibility + manual keyboard navigation**

**Keyboard navigation:**
- Tab through all interactive elements
- Escape closes mobile nav
- Focus indicators visible everywhere
- Skip-nav link is first focusable element

**Screen reader testing (if applicable):**
- Semantic HTML (main, article, nav) provides landmark navigation
- ARIA labels on icon buttons
- Image alt text is descriptive (not "image" or "photo")
- Form elements (if added) have associated labels

**Color contrast:**
- Use DevTools Accessibility tab
- All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- Never use `--color-gold` for body text (fails contrast)

**Responsive images:**
- Verify alt text is present and meaningful
- Verify width/height prevent layout shift
- Test at multiple viewport sizes

## No Continuous Integration

**CI/CD Status:** GitHub Actions not part of development workflow

- User handles deployment via GitHub Desktop
- Claude Code does not run tests or deploy
- Code review happens before presenting code to user
- All verification is manual

## Testing Checklist (Pre-Commit)

Before pushing code changes:

- [ ] Run `/code-review` (mandatory)
- [ ] Manual code syntax check (HTML, CSS, JS valid)
- [ ] Preview in GitHub Pages theme editor or local `jekyll serve`
- [ ] Test responsive at 600px, 768px, 1024px+ (DevTools)
- [ ] Check browser console for errors/warnings
- [ ] Test keyboard navigation (Tab, Escape)
- [ ] Verify color contrast (DevTools Accessibility)
- [ ] Check alt text on images (meaningful, not filename)
- [ ] Verify `| relative_url` on all internal links
- [ ] No em-dashes in content
- [ ] Update README.md if adding/removing layouts/includes/data files

---

*Testing analysis: 2026-04-04*
