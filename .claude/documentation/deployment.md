# Deployment

## GitHub Pages Setup

1. Go to repository Settings > Pages
2. Under "Source", select the branch to deploy (typically `main`)
3. Save -- GitHub Actions will build and deploy on each push

The site is currently deployed at: `https://christopher-at-loom.github.io/teresa-ristow-io/`

## How Builds Work

```
Push to main
  --> GitHub Actions triggers Jekyll build
    --> Jekyll processes Liquid templates, data files, layouts
      --> Static HTML output deployed to GitHub Pages CDN
```

Build logs are visible in the repository's Actions tab.

## Custom Domain Setup

**This is a 3-step process. All three steps must happen simultaneously to avoid broken links and mixed content.**

### Step 1: Create CNAME file

Create a file named `CNAME` in the repository root containing only the domain:

```
www.example.com
```

### Step 2: Update _config.yml

Change both `url` and `baseurl`:

```yaml
# BEFORE (GitHub Pages subdirectory)
url: "https://christopher-at-loom.github.io"
baseurl: "/teresa-ristow-io"

# AFTER (custom domain)
url: "https://www.example.com"
baseurl: ""
```

**Both values must change.** If `baseurl` stays as `/teresa-ristow-io`, all asset and link paths will break.

### Step 3: Configure DNS

**Option A -- CNAME record (for www subdomain):**
```
Type: CNAME
Host: www
Value: christopher-at-loom.github.io
```

**Option B -- A records (for apex domain):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

After DNS propagates (can take up to 48 hours), enable "Enforce HTTPS" in Settings > Pages.

## HTTPS

GitHub Pages provides free HTTPS via Let's Encrypt. After DNS is configured and propagated:

1. Go to Settings > Pages
2. Check "Enforce HTTPS"
3. Certificate provisioning takes a few minutes

## Build Debugging

### Check the Actions tab

Every push triggers a build. Failed builds show error details in the Actions tab.

### Common Liquid errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Liquid syntax error` | Malformed `{% %}` or `{{ }}` | Check for unclosed tags, missing `end` tags |
| `Could not locate the included file` | Typo in `{% include %}` | Verify filename matches exactly |
| `Liquid Exception: undefined method` | Using Jekyll 4.x feature | Stick to Jekyll 3.10.0 compatible syntax |
| `Invalid date` | Bad date in post filename | Use `YYYY-MM-DD` format |

### Local preview

```bash
bundle exec jekyll serve
# Site available at http://localhost:4000/teresa-ristow-io/
```

## Google Search Console

Add verification to `_config.yml`:

```yaml
google_site_verification: "your-verification-string"
```

`jekyll-seo-tag` will output the corresponding meta tag automatically.

## robots.txt

The `robots.txt` file uses Liquid to generate the sitemap URL:

```
User-agent: *
Allow: /

Sitemap: {{ site.url }}{{ site.baseurl }}/sitemap.xml
```

This auto-updates when `url` or `baseurl` changes.

## Performance

### Image optimization
- Optimize images before committing (use squoosh.app or tinypng.com)
- Keep hero images under 200KB
- Use appropriate formats: JPEG for photos, PNG for graphics, SVG for icons

### CSS
- Single file loads in one request (no render-blocking cascade of imports)
- Custom properties are computed at parse time (no runtime cost)

### JavaScript
- `main.js` loaded with `defer` (non-blocking)
- React loaded only on pages with `{% include react-mount.html %}`
- Component scripts loaded on-demand per `[data-component]` element

### General
- GitHub Pages CDN handles caching and compression
- `jekyll-sitemap` helps search engines crawl efficiently
- Keep total page weight under 500KB where possible

## Troubleshooting

### Site shows 404

- Check Settings > Pages to confirm the source branch is set
- Verify `_config.yml` has correct `baseurl`
- Confirm the page has a valid `permalink` or is at the expected path

### Styles/assets not loading

- Ensure all asset paths use `| relative_url` filter
- After custom domain change, verify `baseurl` is set to `""`
- Clear browser cache (or use incognito)

### Changes not appearing

- Check Actions tab for build status
- GitHub Pages can take 1-2 minutes to propagate after a successful build
- Hard refresh browser (`Ctrl+Shift+R`)

### baseurl issues after custom domain

If you connect a custom domain but leave `baseurl: "/teresa-ristow-io"`, all links and assets will point to `https://www.example.com/teresa-ristow-io/...` which does not exist. Set `baseurl: ""` when using a custom domain.

### Build succeeds but page is wrong

- Check for Liquid logic errors (if/unless conditions)
- Verify data files parse correctly (valid YAML)
- Check frontmatter (must have `---` delimiters, valid YAML between them)
