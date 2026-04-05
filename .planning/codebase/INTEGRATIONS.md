# External Integrations

**Analysis Date:** 2026-04-04

## APIs & External Services

**Course Enrollment:**
- Kajabi - Online course hosting and enrollment platform
  - Used for: Course hosting, student management, content delivery
  - Integration: Enrollment URLs stored in `_data/courses.yml` under `kajabi_url` field
  - Link pattern: Each course has optional `kajabi_url` entry (empty string if course is not yet active)
  - Location: `D:/Documents/GitHub/teresa-ristow-io/_data/courses.yml`

**Fonts:**
- Google Fonts API - Typography delivery
  - Service: Google Fonts
  - Loaded: Inter typeface (weights 300, 400, 500, 700)
  - Preconnect: `https://fonts.googleapis.com` and `https://fonts.gstatic.com`
  - Implementation: Link tag in `_includes/head.html` (line 7)

**Content Distribution:**
- unpkg.com CDN - React library distribution
  - Service: unpkg (open source CDN for npm packages)
  - React version: 18 (production builds)
  - URLs:
    - `https://unpkg.com/react@18/umd/react.production.min.js`
    - `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`
  - Loaded on: Pages with `{% include react-mount.html %}` only
  - Implementation: `_includes/react-mount.html` (lines 2-3)
  - Strategy: Deferred loading, conditional based on `page.react_loaded` flag

## Data Storage

**Databases:**
- Not applicable - static site with no backend database

**File Storage:**
- GitHub repository - Source code and static assets
- Cloudinary - Image hosting and transformation service
  - Account ID: `du8tl7x4m`
  - Base URL: `https://res.cloudinary.com/du8tl7x4m/image/upload`
  - Used for: Responsive image delivery with on-demand resizing and format conversion
  - Implementation: URLs constructed in `_config.yml` with `cloudinary_base` variable
  - Example usage: `{{ site.cloudinary_base }}/w_440,h_660,c_fit,f_auto,q_auto/[image-id]`
  - Used in: `pages/about.html` for hero images with multiple resolution variants

**Local Assets:**
- `assets/images/` - Local image directory for site images (JPG, PNG, favicon)
- `assets/css/style.css` - Single global stylesheet (no CDN)
- `assets/js/main.js` - Global JavaScript (no CDN, served locally)
- `assets/js/components/*.js` - React components (served locally)

**Caching:**
- Not applicable - GitHub Pages handles HTTP caching headers

## Authentication & Identity

**Auth Provider:**
- None - Static site with no user authentication
- Kajabi handles course enrollment authentication independently

**Identity:**
- No user accounts or identity system on this site
- Kajabi manages student authentication for enrolled courses

## Monitoring & Observability

**Error Tracking:**
- None configured - analytics placeholder exists but is not implemented
  - File: `_includes/analytics.html` (placeholder only)

**Logs:**
- GitHub Actions build logs available in repository Actions tab
- Browser console logs for React component debugging

**SEO Monitoring:**
- jekyll-seo-tag plugin adds:
  - Open Graph meta tags
  - Twitter Card meta tags
  - Schema.org structured data (via `_includes/json-ld.html`)
- Google Search Console integration (manual setup required by user)

## CI/CD & Deployment

**Hosting:**
- Platform: GitHub Pages (free tier)
- Repository: christopher-at-loom.github.io
- Site URL: `https://christopher-at-loom.github.io/teresa-ristow-io`
- Custom domain ready: Requires CNAME file + DNS configuration + `_config.yml` update

**CI Pipeline:**
- GitHub Actions (automatic) - Builds and deploys on push to main
- Build time: 1-3 minutes
- Trigger: Push to repository
- No manual deployment step required

**GitHub Actions Workflows:**
- Excluded from editing: `.github/workflows/*` are GitHub Skills exercise files (do not modify)

## Environment Configuration

**Required env vars:**
- None required - all configuration is in `_config.yml` and data files

**Configuration in _config.yml:**
- `title` - Site title ("Teresa Ristow")
- `description` - Meta description
- `url` - Canonical domain URL
- `baseurl` - Path within domain (e.g., "/teresa-ristow-io")
- `markdown` - Markdown processor (kramdown)
- `cloudinary_base` - Cloudinary image base URL

**Secrets location:**
- No secrets stored in repository (GitHub Pages does not require API keys)
- Kajabi URLs are public enrollment links (not sensitive)
- Cloudinary account ID is public (embedded in image URLs)

## Webhooks & Callbacks

**Incoming:**
- None - Static site receives no webhooks

**Outgoing:**
- None - Static site makes no outgoing HTTP requests
- (Analytics placeholder is unused)

## External Links & Metadata

**Social Media:**
- Social links stored in `_data/social.yml`
- Used in `_includes/social-links.html` for footer rendering
- Platforms: LinkedIn (currently configured)
- URL: `https://www.linkedin.com/in/teresa-ristow-io/`

**Course Enrollment Links:**
- Kajabi URLs stored in `_data/courses.yml`
- Populated in course cards when course status is "active"
- Button text: "Enroll Now" (when kajabi_url is set)

## Build & Plugin Dependencies

**GitHub Pages Whitelisted Plugins:**
All three plugins are approved for GitHub Pages:
1. jekyll-feed - RSS feed generation
2. jekyll-seo-tag - SEO meta tag insertion
3. jekyll-sitemap - XML sitemap generation

**Non-Whitelisted:**
- None used (this ensures builds work on GitHub Pages without custom build process)

## Structural Data

**JSON-LD Implementation:**
- File: `_includes/json-ld.html`
- Schemas supported:
  - Person - Teresa Ristow profile information
  - Course - Individual course metadata
  - BlogPosting - Blog post metadata
- Used in: Layout inheritance via `default.html`

---

*Integration audit: 2026-04-04*
