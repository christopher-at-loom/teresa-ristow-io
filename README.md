# Teresa Ristow - Site Admin Guide

Welcome to your website! This guide covers everything you need to know to manage, update, and customize your site.

## Table of Contents

- [How This Site Works](#how-this-site-works)
- [Quick Start](#quick-start)
- [How to Create a New Blog Post](#how-to-create-a-new-blog-post)
- [Adding Images to Blog Posts](#adding-images-to-blog-posts)
- [How to Create a New Page](#how-to-create-a-new-page)
- [How to Create a New Course Landing Page](#how-to-create-a-new-course-landing-page)
- [Sections (Layouts)](#sections-layouts)
- [Snippets (Includes)](#snippets-includes)
- [How to Add a New Snippet](#how-to-add-a-new-snippet)
- [Embedding Interactive Components](#embedding-interactive-components)
- [Adding a Custom React Component](#adding-a-custom-react-component)
- [Common Component Ideas for Blog Posts](#common-component-ideas-for-blog-posts)
- [Updating Course Data](#updating-course-data)
- [Updating Navigation](#updating-navigation)
- [Styling](#styling)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)
- [File Map](#file-map)

---

## How This Site Works

Your site is built with **GitHub Pages**, a free hosting service from GitHub. When you push changes to the repository, GitHub automatically rebuilds and publishes your site. There is no separate deploy step -- commit and push, and the site updates within a few minutes.

The site uses **Jekyll**, a static site generator that processes your HTML files and assembles them into complete pages. Jekyll handles things like:
- Wrapping your content in consistent headers and footers
- Generating your blog feed (RSS)
- Building your sitemap for Google
- Inserting page titles and meta tags automatically

You write HTML. Jekyll handles the plumbing.

## Quick Start

### Edit existing page content
1. Open any `.html` file in the `pages/` directory (or `index.html` for the homepage)
2. Edit the HTML between the `---` frontmatter block and the end of the file
3. Commit and push -- the site rebuilds automatically

### Change navigation links
1. Open `_data/navigation.yml`
2. Edit the `title` and `url` entries
3. Commit and push

### Update course information
1. Open `_data/courses.yml`
2. Find the course by its `key` field
3. Edit any fields (title, description, price, status, etc.)
4. Commit and push

---

## How to Create a New Blog Post

### Step-by-step

1. **Create a new file** in `_posts/` named with this exact pattern:
   ```
   YYYY-MM-DD-your-post-slug.html
   ```
   Example: `2026-04-15-hiring-bias-research.html`

2. **Add frontmatter** at the very top of the file (these three-line blocks tell Jekyll how to process the page):
   ```yaml
   ---
   layout: post
   title: "Your Post Title Here"
   date: 2026-04-15
   author: "Teresa Ristow"
   excerpt: "A brief summary that appears in blog listings and social shares."
   ---
   ```

3. **Write your content** in HTML below the frontmatter:
   ```html
   <p>Your blog post content goes here. Use standard HTML tags.</p>

   <h2>Section Heading</h2>
   <p>More content...</p>
   ```

4. **Commit and push** -- the post appears on the blog automatically.

### Important rules
- The filename date and frontmatter date should match
- Use `.html` extension, not `.md`
- The slug (part after the date) becomes part of the URL
- Posts are automatically sorted newest-first

---

## Adding Images to Blog Posts

### Hero images (the big image at the top of a post)

You can add a featured image that automatically adapts between mobile (portrait) and desktop (landscape) views:

1. **Prepare two versions** of your image:
   - **Landscape** (horizontal) -- approximately 1200 x 675 pixels -- for desktop
   - **Portrait** (vertical) -- approximately 600 x 800 pixels -- for mobile

2. **Name them** following this pattern and place in `assets/images/`:
   ```
   post-your-slug-landscape.jpg
   post-your-slug-portrait.jpg
   ```
   Example: `post-hiring-bias-landscape.jpg` and `post-hiring-bias-portrait.jpg`

3. **Add these fields** to your post's frontmatter:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2026-04-15
   author: "Teresa Ristow"
   excerpt: "Brief summary for listings and social shares."
   image_landscape: /assets/images/post-hiring-bias-landscape.jpg
   image_portrait: /assets/images/post-hiring-bias-portrait.jpg
   image_alt: "A chart showing structured interview validity compared to unstructured"
   ---
   ```

All three image fields are optional. If you skip them, the post displays without a hero image (the same as before). You can also provide just one version if you don't need mobile/desktop switching.

### Inline images (inside the post body)

For images within the text (charts, diagrams, photos), use a simple `<img>` tag:

```html
<img
  src="{{ '/assets/images/post-hiring-bias-chart.png' | relative_url }}"
  alt="Bar chart comparing interview validity across four methods"
  width="720"
  height="405"
  loading="lazy">
```

### Image tips

- **Keep file size under 500KB** -- compress photos before uploading
- **Always write alt text** -- describe what the image shows, not the filename
- **Use .jpg for photos**, .png for screenshots and diagrams
- **The site handles responsive behavior automatically** -- you just provide the images

---

## How to Create a New Page

1. **Create a new file** in `pages/` named in kebab-case:
   ```
   pages/your-page-name.html
   ```

2. **Add frontmatter:**
   ```yaml
   ---
   layout: page
   title: "Your Page Title"
   permalink: /your-page-name/
   ---
   ```

3. **Write HTML content** below the frontmatter.

4. **Add to navigation** (optional): edit `_data/navigation.yml` to add a new entry.

---

## How to Create a New Course Landing Page

1. **Create a new file** in `pages/`:
   ```
   pages/course-name.html
   ```

2. **Add landing page frontmatter:**
   ```yaml
   ---
   layout: landing
   title: "Course Name"
   permalink: /courses/course-name/
   hero_headline: "Your Main Headline"
   hero_subheadline: "A supporting line that expands on the headline."
   hero_cta_text: "Button Text"
   hero_cta_url: "#section-or-url"
   ---
   ```

3. **Write the page content** in HTML sections.

4. **Add the course to `_data/courses.yml`** if it's not already there.

---

## Sections (Layouts)

Layouts are the page shells that wrap your content. You choose one via the `layout` field in frontmatter.

| Layout | Use For | What It Adds |
|--------|---------|-------------|
| `default` | Rarely used directly | Base HTML shell, header, footer, nav, CSS/JS |
| `page` | Static pages (about, contact, etc.) | Adds page title as h1, wraps in article tag |
| `post` | Blog posts | Adds title, date, author, wraps in article tag |
| `landing` | Course sales/landing pages | Adds hero section with headline, subheadline, CTA button |

**How they connect:**
```
default (base shell)
├── page (static pages)
├── post (blog posts)
└── landing (course pages)
```

All layouts automatically include the site header, navigation, footer, and global stylesheet.

---

## Snippets (Includes)

Snippets are reusable HTML components you can insert into any page. Think of them like building blocks.

### How to use a snippet

Add this line anywhere in your HTML content:
```html
{% include snippet-name.html %}
```

### Available snippets

#### Call-to-Action Block
```html
{% include cta-block.html
  headline="Ready to transform your hiring?"
  description="Join hundreds of HR professionals using evidence-based methods."
  button_text="View Courses"
  button_url="/courses/"
  style="primary"
%}
```
Parameters:
- `headline` -- the main text (optional)
- `description` -- supporting text (optional)
- `button_text` -- button label
- `button_url` -- where the button links
- `style` -- "primary" (accent color) or "secondary" (subtle)

#### Course Card
Used in loops. Renders a card for one course from the data file:
```html
{% for course in site.data.courses %}
  {% include course-card.html course=course %}
{% endfor %}
```

#### Post Card
Used in loops. Renders a preview card for one blog post:
```html
{% for post in site.posts limit:5 %}
  {% include post-card.html post=post %}
{% endfor %}
```

#### Responsive Image
Display an image that switches between portrait (mobile) and landscape (desktop):
```html
{% include responsive-image.html
  landscape="/assets/images/hero-homepage-landscape.jpg"
  portrait="/assets/images/hero-homepage-portrait.jpg"
  alt="Description of the image"
  loading="eager"
%}
```
Parameters:
- `landscape` -- path to the desktop (horizontal) image
- `portrait` -- path to the mobile (vertical) image
- `alt` -- description of the image (required)
- `loading` -- "eager" (loads immediately) or "lazy" (loads when scrolled to, default)
- `css_class` -- optional CSS class for styling

You can provide just one of landscape/portrait if you don't need mobile/desktop switching.

#### React Component Mount
Add interactive components to a blog post:
```html
{% include react-mount.html %}
<div data-component="sample-chart" data-props='{"label":"Interview Validity","values":[35,51,62,78,85]}'></div>
```

---

## How to Add a New Snippet

1. **Create a new file** in `_includes/`:
   ```
   _includes/your-snippet-name.html
   ```

2. **Write the HTML.** Use `{{ include.param_name }}` to accept parameters:
   ```html
   <div class="testimonial">
     <blockquote>{{ include.quote }}</blockquote>
     <cite>{{ include.author }}</cite>
   </div>
   ```

3. **Use it in any page:**
   ```html
   {% include your-snippet-name.html quote="This changed how I hire." author="HR Director" %}
   ```

---

## Embedding Interactive Components

Blog posts can include interactive React components (charts, calculators, toggles):

1. Add `{% include react-mount.html %}` once in the post
2. Add a `<div>` with `data-component` pointing to the component name
3. Pass data via `data-props` as JSON

The component JavaScript file must exist at `assets/js/components/[component-name].js`.

---

## Adding a Custom React Component

If you have built a component in VS Code and want to add it to the site, here is the full walkthrough. Claude can guide you through each step if you get stuck.

### The rules

- **No build step.** The site does not use npm, Webpack, or any bundler. Your component is a plain `.js` file that runs directly in the browser.
- **No JSX.** Write `React.createElement(...)` instead of `<div>`. Claude can convert JSX to createElement for you.
- **Naming matters.** The filename must match the `data-component` attribute exactly. A file named `score-comparison.js` is embedded with `data-component="score-comparison"`.

### Step 1: Save your file in the right place

Your component file goes in:
```
assets/js/components/your-component-name.js
```

Use kebab-case for the filename (lowercase, words separated by hyphens).

### Step 2: Wrap it in the required pattern

Every component needs this wrapper structure. If your file does not already follow this pattern, restructure it to match:

```javascript
(function() {
  'use strict';

  // Guard: skip if React is not loaded
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.warn('React not loaded. Skipping your-component-name.');
    return;
  }

  // Your component
  function YourComponent(props) {
    var title = props.title || 'Default Title';

    return React.createElement('div', { className: 'your-component' },
      React.createElement('h3', null, title)
      // ... more elements here
    );
  }

  // Mount into all matching elements on the page
  document.querySelectorAll('[data-component="your-component-name"]').forEach(function(el) {
    var props = {};
    try {
      props = JSON.parse(el.getAttribute('data-props') || '{}');
    } catch(e) {
      console.warn('Invalid data-props JSON:', e);
    }
    var root = ReactDOM.createRoot(el);
    root.render(React.createElement(YourComponent, props));
  });
})();
```

**Key parts:**
- The `if (typeof React === 'undefined')` guard prevents errors on pages where React is not loaded
- `data-component="your-component-name"` in the querySelector must match your filename (without `.js`)
- Props come from the `data-props` JSON attribute in the HTML

### Step 3: Embed it in a blog post

In your post's HTML, add two things:

```html
<!-- Load React (only needed once per post, place before any components) -->
{% include react-mount.html %}

<!-- Your component mount point -->
<div data-component="your-component-name" data-props='{"title": "My Data"}'></div>
```

You can place multiple components in the same post. The `{% include react-mount.html %}` line only needs to appear once.

### Step 4: Commit and push

Save your files, commit in GitHub Desktop, and push. The component will be live once the site rebuilds (1-3 minutes).

### Quick checklist

- [ ] File is saved at `assets/js/components/your-name.js`
- [ ] File uses the `(function() { ... })();` wrapper
- [ ] File has the React/ReactDOM guard at the top
- [ ] querySelector string matches the filename
- [ ] Blog post includes `{% include react-mount.html %}` before the component div
- [ ] `data-component` value matches the filename (without `.js`)
- [ ] `data-props` is valid JSON (use single quotes around the attribute, double quotes inside)

---

## Common Component Ideas for Blog Posts

These are types of interactive elements that work well in I/O Psychology content. You do not need to build these from scratch. Describe what you want to Claude, and it can generate the component file for you.

### Bar Chart
Compare values across categories. Good for showing validity coefficients, survey results, or score distributions.
```html
<div data-component="sample-chart" data-props='{"label": "Interview Validity by Method", "values": [35, 51, 62, 78]}'></div>
```
*Already available as `sample-chart.js`.*

### Before/After Comparison
Show two states side by side -- for example, unstructured vs. structured interview outcomes, or pre-training vs. post-training metrics. Pass labels and values for each side.
```html
<div data-component="before-after" data-props='{"before": {"label": "Unstructured", "values": [42, 38, 55]}, "after": {"label": "Structured", "values": [78, 82, 71]}}'></div>
```

### Stat Counter
Display a few key numbers prominently -- effect sizes, sample sizes, percentages. Numbers can animate on scroll to draw attention.
```html
<div data-component="stat-counter" data-props='{"stats": [{"value": 81, "unit": "%", "label": "Improvement in prediction"}, {"value": 2.4, "unit": "x", "label": "Reduction in bias"}]}'></div>
```

### Likert Scale / Survey Visualization
Show response distributions for survey items. Common in training evaluation, job satisfaction research, and employee engagement data.
```html
<div data-component="likert-scale" data-props='{"question": "Training improved my confidence in interviewing", "responses": {"Strongly Disagree": 2, "Disagree": 5, "Neutral": 12, "Agree": 34, "Strongly Agree": 47}}'></div>
```

### Process / Timeline Diagram
Walk through a multi-step process -- selection pipeline stages, training program phases, or research methodology steps.
```html
<div data-component="process-steps" data-props='{"steps": [{"title": "Job Analysis", "description": "Define the role requirements"}, {"title": "Criteria Development", "description": "Build the scoring rubric"}, {"title": "Structured Interview", "description": "Consistent questions for every candidate"}]}'></div>
```

### Comparison Table (Interactive)
Let readers toggle or highlight rows across methods, tools, or approaches. More engaging than a static HTML table for dense comparisons.
```html
<div data-component="comparison-table" data-props='{"columns": ["Method", "Validity", "Cost", "Training Required"], "rows": [["Structured Interview", "High", "Low", "Moderate"], ["Assessment Center", "High", "High", "Extensive"], ["Unstructured Interview", "Low", "Low", "None"]]}'></div>
```

### Scatter Plot
Show relationships between two variables -- predictor vs. outcome, pre-test vs. post-test, or any correlation you want to illustrate.
```html
<div data-component="scatter-plot" data-props='{"xLabel": "Conscientiousness Score", "yLabel": "Job Performance", "points": [[3.2, 4.1], [4.5, 4.8], [2.1, 2.9], [3.8, 3.7], [4.9, 4.6]]}'></div>
```

**Note:** These components (except `sample-chart`) do not exist yet. When you are ready to use one, describe what you need to Claude and it will generate the `.js` file for you, following the pattern above.

---

## Updating Course Data

All course information lives in `_data/courses.yml`. Each course has these fields:

| Field | What It Is | Example |
|-------|-----------|---------|
| `key` | Unique identifier (kebab-case) | `structured-hiring` |
| `title` | Display name | `"Structured Hiring That Works"` |
| `subtitle` | Short tagline | `"Evidence-based selection..."` |
| `vertical` | Audience segment | `employer` or `job-seeker` |
| `price_display` | Price shown on cards | `"$197-297"` |
| `status` | Availability | `active`, `coming-soon`, or `future` |
| `kajabi_url` | Enrollment link (when live) | `"https://..."` |
| `landing_page` | On-site landing page URL | `/courses/structured-hiring/` |
| `description` | Card description (1-2 sentences) | `"Learn to design..."` |
| `features` | Bullet point list | (YAML array) |

To change a course's status from "coming-soon" to "active", find it in the file and change the `status` field.

---

## Updating Navigation

Edit `_data/navigation.yml`:

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

Add, remove, or reorder entries. The nav updates on every page automatically.

---

## Styling

All styles live in `assets/css/style.css`. The file uses CSS custom properties (variables) at the top for easy customization:

```css
:root {
  --color-plum: #2e1a2e;        /* Primary brand color */
  --color-gold: #c9a833;        /* CTA buttons and accents */
  --color-olive: #6b7a3a;       /* Secondary accent */
  --color-terracotta: #c48a78;  /* Warm accent */
  --color-bg-page: #f5f0e2;     /* Page background */
  --color-bg-card: #faf7ee;     /* Card backgrounds */
  --font-heading: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

To change colors or fonts, edit these variables at the top of the file. The changes cascade throughout the entire site.

**Responsive images:** When you provide both landscape and portrait versions of an image, the site automatically switches between them based on screen size. Desktop visitors see the landscape version, mobile visitors see the portrait version.

---

## Custom Domain Setup

When you're ready to connect a custom domain (e.g., teresaristow.com):

1. **Create a `CNAME` file** at the repository root containing just the domain name:
   ```
   teresaristow.com
   ```

2. **Update `_config.yml`** -- change these two lines:
   ```yaml
   url: "https://teresaristow.com"
   baseurl: ""
   ```

3. **Configure DNS** with your domain registrar:
   - Add a CNAME record pointing to `christopher-at-loom.github.io`
   - Or add A records pointing to GitHub's IP addresses

All three steps must happen together. If you change the domain but not the config, internal links will break.

---

## Troubleshooting

### Site not updating after push
- Check the Actions tab in GitHub for build errors
- Jekyll builds can take 1-3 minutes
- Clear your browser cache

### Broken links or missing styles
- Make sure all internal links use the correct path (check `_data/navigation.yml`)
- Verify `baseurl` in `_config.yml` matches your setup

### Blog post not appearing
- Check the filename follows `YYYY-MM-DD-slug.html` exactly
- Verify the frontmatter has `layout: post` and a valid `date`
- Future-dated posts won't appear until that date

### Page shows raw Liquid tags
- The file is missing the `---` frontmatter block at the top
- Even empty frontmatter (`---` followed by `---`) is required for Jekyll to process the file

---

## File Map

| Path | What It Is |
|------|-----------|
| `index.html` | Homepage |
| `404.html` | Custom "page not found" error page |
| `robots.txt` | Search engine crawler instructions |
| `_config.yml` | Site-wide Jekyll configuration |
| `_layouts/*.html` | Page templates (default, page, post, landing) |
| `_includes/*.html` | Reusable HTML snippets |
| `_posts/*.html` | Blog posts (date-prefixed filenames) |
| `_data/*.yml` | Structured data (courses, navigation, social links) |
| `pages/*.html` | Static pages (about, blog, courses, contact, landing pages) |
| `assets/css/style.css` | Global stylesheet |
| `assets/js/main.js` | Global JavaScript |
| `assets/js/components/` | React components for blog posts |
| `assets/images/` | Site images |
| `CLAUDE.md` | Developer/agent documentation |
| `.claude/` | Agent workspace (not part of published site) |
| `README.md` | This file |
