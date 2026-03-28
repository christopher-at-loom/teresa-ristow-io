# Teresa Ristow - Site Admin Guide

Welcome to your website! This guide covers everything you need to know to manage, update, and customize your site.

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
  --color-primary: #2D3E50;      /* Main text and headings */
  --color-accent: #A65971;       /* CTA buttons */
  --color-bg: #FFFFFF;           /* Page background */
  --color-bg-warm: #F9F6F3;      /* Warm section backgrounds */
  --color-bg-cool: #F5F7F6;      /* Cool section backgrounds */
  --font-heading: 'Georgia', serif;
  --font-body: -apple-system, sans-serif;
}
```

To change colors or fonts, edit these variables at the top of the file. The changes cascade throughout the entire site.

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
