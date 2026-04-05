# Technology Stack

**Analysis Date:** 2026-04-04

## Languages

**Primary:**
- HTML5 - All content pages (no Markdown)
- Liquid - Jekyll template language for layouts, includes, and data rendering
- CSS3 - Single global stylesheet with custom properties (`assets/css/style.css`)
- JavaScript (ES5) - Global behavior and React components
- YAML - Data files and configuration

**Secondary:**
- JSON - React component props (data-props attributes)

## Runtime

**Environment:**
- GitHub Pages (Jekyll 3.10.0)
- Node runtime: Not required; Jekyll 3.10.0 is hosted on GitHub Pages

**Deployment:**
- GitHub Pages static site hosting
- Automatic rebuilding on push to repository

## Frameworks

**Core:**
- Jekyll 3.10.0 - Static site generator (GitHub Pages whitelisted version)
- Liquid - Template engine (part of Jekyll)

**Plugins (Jekyll, GitHub Pages whitelisted):**
- jekyll-feed (v0.15+) - Generates RSS feed
- jekyll-seo-tag (v2.7+) - Adds SEO meta tags and structured data
- jekyll-sitemap (v1.4+) - Generates XML sitemap

**Frontend:**
- React 18 - Loaded via CDN (unpkg) for interactive blog components
- ReactDOM 18 - React DOM rendering (CDN delivery)

**Build/Dev:**
- No build pipeline - CSS/JS delivered as-is (GitHub Pages limitation)
- No transpiler - ES5 JavaScript only
- No bundler - React components are standalone files

## Key Dependencies

**Critical:**
- React 18 (`https://unpkg.com/react@18/umd/react.production.min.js`) - Interactive components framework
- ReactDOM 18 (`https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`) - DOM mounting for React

**Infrastructure:**
- Google Fonts API (`fonts.googleapis.com`) - Loads Inter typeface (weights 300, 400, 500, 700)
- Cloudinary (`res.cloudinary.com/du8tl7x4m`) - Image hosting and on-demand transformation (responsive sizing, format optimization)
- unpkg.com CDN - Hosts React and ReactDOM production builds

## Configuration

**Environment:**
- GitHub Pages default: `site.url` resolves to `https://christopher-at-loom.github.io`
- Custom domain ready: baseurl and url configured in `_config.yml` for migration to custom domain

**Build:**
- `_config.yml` - Jekyll configuration file (source: `D:/Documents/GitHub/teresa-ristow-io/_config.yml`)
  - Markdown engine: kramdown
  - Permalink structure: `/blog/:year/:month/:title/`
  - Plugins: jekyll-feed, jekyll-seo-tag, jekyll-sitemap
  - Cloudinary base URL configured for responsive image delivery

**Key Configuration Values:**
```yaml
title: "Teresa Ristow"
description: "I/O Psychology researcher and educator..."
url: "https://christopher-at-loom.github.io"
baseurl: "/teresa-ristow-io"
markdown: kramdown
permalink: /blog/:year/:month/:title/
cloudinary_base: "https://res.cloudinary.com/du8tl7x4m/image/upload"
```

## Platform Requirements

**Development:**
- Git (for repository management)
- Text editor (VS Code recommended)
- No Node.js or build tools required
- GitHub Desktop or git CLI for commits/pushes

**Production:**
- Deployment target: GitHub Pages
- Automatic deployment on push to main branch
- Build time: 1-3 minutes after push
- Hosting: Free with GitHub repository

**Browser Support:**
- Modern browsers with ES5 JavaScript support (React 18 requirement)
- CSS Grid and Flexbox support
- Responsive design via CSS media queries

---

*Stack analysis: 2026-04-04*
