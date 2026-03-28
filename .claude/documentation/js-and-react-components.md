# JavaScript and React Components

## Global JS

**File:** `assets/js/main.js`

Loaded on every page via `default.html` with `defer`.

**Behavior:**
1. **Mobile nav toggle** -- Clicking `.site-header__toggle` toggles `aria-expanded` attribute and adds/removes `site-nav--open` class on `.site-nav`
2. **Escape key handler** -- Pressing Escape while mobile nav is open closes it and returns focus to the toggle button

**Pattern:** IIFE with `'use strict'`. No dependencies. No global exports.

## React Integration Pattern

React is used for interactive components embedded in blog posts (charts, visualizations). It is NOT loaded globally -- only on pages that explicitly include the mount script.

### How It Works

1. A post (or page) includes `{% include react-mount.html %}` in its content
2. This loads React 18 and ReactDOM 18 from unpkg CDN with `defer`
3. On `DOMContentLoaded`, the mount script:
   - Sets `window.__REACT_LOADED = true`
   - Queries all elements with `[data-component]` attribute
   - For each, creates a `<script>` tag pointing to `/assets/js/components/{component-name}.js`
4. Each component script self-mounts into its target elements

### Loading Guard

`react-mount.html` uses `{% unless page.react_loaded %}` to prevent double-loading. If you need to load React manually, set `react_loaded: true` in the page's frontmatter.

### Noscript Fallback

A `<noscript>` tag displays "Interactive components require JavaScript to be enabled."

## How to Create a New React Component

### Step 1: Create the component file

```
assets/js/components/my-component.js
```

### Step 2: Use the IIFE pattern

```javascript
(function() {
  'use strict';

  // Guard: skip if React not loaded
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.warn('React not loaded. Skipping my-component.');
    return;
  }

  // Define the component using React.createElement (no JSX)
  function MyComponent(props) {
    var title = props.title || 'Default Title';

    return React.createElement('div', { className: 'my-component' },
      React.createElement('h3', null, title)
    );
  }

  // Mount into all matching elements
  document.querySelectorAll('[data-component="my-component"]').forEach(function(el) {
    var props = {};
    try {
      props = JSON.parse(el.getAttribute('data-props') || '{}');
    } catch(e) {
      console.warn('Invalid data-props JSON:', e);
    }
    var root = ReactDOM.createRoot(el);
    root.render(React.createElement(MyComponent, props));
  });
})();
```

### Step 3: Use in a post or page

```html
{% include react-mount.html %}

<div data-component="my-component" data-props='{"title": "My Chart"}'></div>
```

The `data-component` value must match the filename (without `.js`). Props are passed as a JSON string in `data-props`.

## Sample Component Walkthrough: sample-chart.js

**File:** `assets/js/components/sample-chart.js`

**What it does:** Renders a simple bar chart from an array of numeric values.

**Props:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | `"Sample Data"` | Chart title |
| `values` | number[] | `[65, 78, 90, 82, 95]` | Bar values |

**How it renders:**
1. Finds the max value in the array
2. Creates a container div with class `sample-chart`
3. Renders an h3 title
4. Renders bars with heights as percentages of max value
5. Each bar has a `title` attribute showing its numeric value

**Usage:**
```html
{% include react-mount.html %}
<div data-component="sample-chart" data-props='{"label": "Interview Scores", "values": [72, 85, 91, 68, 88]}'></div>
```

## CDN Details

React is loaded from unpkg:
- `https://unpkg.com/react@18/umd/react.production.min.js`
- `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`

Both use `crossorigin="anonymous"` and `defer`.

**Fallback strategy:** If unpkg goes down, bundle React locally at `assets/js/vendor/react.production.min.js` and `assets/js/vendor/react-dom.production.min.js`, then update the script `src` attributes in `react-mount.html`.

## Limitations

- **No JSX** -- all components use `React.createElement`. No build step, no transpilation.
- **No hooks that need transpilation** -- `useState`, `useEffect`, `useRef` all work fine in createElement syntax. Hooks that require JSX syntax (custom hooks with JSX return) are not usable.
- **No module imports** -- components are plain script files, not ES modules. Share utilities via `window` if needed.
- **No SRI hashes currently** -- CDN scripts load without subresource integrity. Add `integrity` attributes if security hardening is needed.
- **Component files load sequentially** -- each `[data-component]` triggers a new script load. For many components on one page, consider a bundle.
