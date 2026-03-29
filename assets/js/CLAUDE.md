# CLAUDE.md - JavaScript & React Components

This file covers global JS and React components in `assets/js/`.

## Rules (inherited)

- Always use `| relative_url` on internal links and asset paths
- No em-dashes in any content
- Never push to remote

## Two Concerns

| File | Loaded | Purpose |
|------|--------|---------|
| `main.js` | Every page (deferred) | Global behavior: mobile nav toggle, escape key handler |
| `components/*.js` | On-demand via CDN | React components for blog posts (charts, visualizations) |

## main.js

IIFE pattern with `'use strict'`. No dependencies, no global exports.

Behavior:
1. **Mobile nav toggle** -- `.site-header__toggle` toggles `aria-expanded` and `site-nav--open` class
2. **Escape key handler** -- closes open mobile nav and returns focus to toggle button

## React Component Pattern

React is NOT loaded globally. Only pages that include `{% include react-mount.html %}` get React.

### How it works

1. Post includes `{% include react-mount.html %}`
2. React 18 + ReactDOM 18 load from unpkg CDN (deferred)
3. On `DOMContentLoaded`, mount script discovers all `[data-component]` elements
4. For each, loads `/assets/js/components/{component-name}.js`
5. Component self-mounts into its target element

### Loading guard

`react-mount.html` uses `{% unless page.react_loaded %}` to prevent double-loading. Set `react_loaded: true` in frontmatter to skip the include's loading.

## Adding a New Component

1. **Create file:** `assets/js/components/my-component.js`
2. **Use IIFE pattern:**
   ```javascript
   (function() {
     'use strict';
     var e = React.createElement;
     document.querySelectorAll('[data-component="my-component"]').forEach(function(el) {
       var props = JSON.parse(el.getAttribute('data-props') || '{}');
       ReactDOM.createRoot(el).render(e(MyComponent, props));
     });
     function MyComponent(props) {
       return e('div', null, 'Hello');
     }
   })();
   ```
3. **Use in a post:**
   ```html
   {% include react-mount.html %}
   <div data-component="my-component" data-props='{"label":"Test"}'></div>
   ```

## Constraints

- **React.createElement only** -- no JSX (no build step)
- **No module imports** -- each component is a standalone IIFE
- **No SRI hashes** on CDN scripts (unpkg doesn't guarantee hash stability)
- `useState` and `useEffect` work without transpilation; other hooks that need JSX do not

## CDN Risk

React loads from unpkg.com. If unpkg is down, components won't render.

**Fallback plan:** Download React production builds to `assets/js/vendor/` and update `react-mount.html` to reference local files.

## Skills to Invoke

- **Any JS change:** Run `/code-review` before output (mandatory) -- use the `react` reference guide for components
- **New React component:** Invoke `superpowers:brainstorming` first, then `code-review` + `perf` after implementation
- **Performance work (bundle size, loading strategy):** Invoke `perf`
- **Component with visual output:** Invoke `frontend-design` for aesthetics, `ui-ux-pro-max` for accessibility (focus states, aria, keyboard nav)
- **Bug in component rendering:** Use `superpowers:systematic-debugging`

## Deep-Dive Reference

- [js-and-react-components.md](../../.claude/documentation/js-and-react-components.md) -- full mount pattern walkthrough, sample component, CDN details, limitations
