# Codebase Concerns

**Analysis Date:** 2026-04-04

## External Dependency at Risk

**React CDN (unpkg.com):**
- Issue: `react-mount.html` loads React 18 from unpkg.com. If CDN is unavailable, all interactive components fail silently with only a console warning
- Files: `_includes/react-mount.html`, `assets/js/components/sample-chart.js`
- Impact: Blog posts with embedded React components (charts, visualizations) show no content to users if unpkg goes down; no fallback rendering
- Current mitigation: Console warning logged; graceful no-op in component files
- Fix approach: Fallback strategy documented in CLAUDE.md but not implemented. Download React production builds to `assets/js/vendor/react.min.js` and `react-dom.min.js`; add conditional logic to `react-mount.html` to try local files first, then fall back to CDN

## CSS File Growth Risk

**Single CSS file approaching breakpoint:**
- Issue: `assets/css/style.css` is 1816 lines. Threshold for split is ~2000 lines
- Files: `assets/css/style.css`
- Impact: File is organized into 21 well-marked sections, but unmaintainable as single file beyond ~2000 lines; makes targeted edits and code review harder
- Current mitigation: Section comment markers in place; documented growth threshold in `assets/css/CLAUDE.md`
- Fix approach: Migrate to SASS with `@import` partials following section map (Design Tokens, Reset, Typography, Header, Footer, Hero, Cards, Blog, Landing, etc.); requires build step or pre-processing before push

## Custom Domain Coordination Risk

**Three-step change not atomically enforced:**
- Issue: Custom domain setup requires simultaneous changes to CNAME file + `_config.yml` (both `url` and `baseurl`) + DNS records. If done out of order or incompletely, site breaks
- Files: `CNAME`, `_config.yml` (lines 1, 4), deployment docs
- Impact: Internal links, asset paths, and SEO URLs will be broken if baseurl is not cleared or url is not updated together
- Current mitigation: Documented in `deployment.md` with 3-step walkthrough and explicit warnings
- Fix approach: Add pre-push hook to validate that `url`, `baseurl`, and (if CNAME exists) domain in CNAME are consistent; abort push if mismatch detected

## Incomplete Analytics Placeholder

**Analytics code slot empty:**
- Issue: `_includes/analytics.html` contains only an HTML comment placeholder; no tracking configured
- Files: `_includes/analytics.html`
- Impact: Site has no instrumentation for user behavior, traffic, or engagement; impossible to measure course landing page conversion or blog reach
- Current mitigation: Include is not auto-included in layouts (would need manual add to `_layouts/default.html`)
- Fix approach: Decide on analytics provider (Google Analytics, Fathom, Plausible, or other); add implementation when site goes live with custom domain; until then, create draft template with placeholder vars (tracking_id, event_names) so integration is straightforward

## Fragile React Component Mount Pattern

**Silent failures on malformed JSON props:**
- Issue: Component data-props attribute expects valid JSON; if malformed, component receives empty `{}` with only console warning
- Files: `assets/js/components/sample-chart.js` (line 36), all future components using same pattern
- Impact: Typos in data-props JSON (unquoted keys, trailing commas) fail silently; no visual indication that data failed to parse
- Current mitigation: try-catch block logs warning to console
- Fix approach: Add validation to display user-facing error message instead of silent no-op; component should render "Invalid component data" message or fallback content when props parse fails

## Missing Image Optimization Guidance

**Hero images not validated for file size:**
- Issue: README.md recommends "under 500KB" for inline images but no enforcement for hero images in frontmatter (image_landscape, image_portrait). Landscape/portrait pairs could easily exceed 1MB total
- Files: `README.md` (line 149), `_posts/` files with image_landscape/image_portrait frontmatter
- Impact: Hero images can bloat page load time significantly; GitHub Pages has no image optimization middleware
- Current mitigation: Documentation recommendation (not enforced)
- Fix approach: Add build-time validation script to check image sizes in `assets/images/` and warn if landscape + portrait pair exceeds 400KB combined; document target sizes in README.md and CLAUDE.md for blog post authoring

## Unverified JSON-LD Schema Validity

**Structured data may not validate:**
- Issue: `_includes/json-ld.html` uses Liquid `jsonify` filter and inline string concatenation; no schema validation
- Files: `_includes/json-ld.html` (lines 1-64)
- Impact: If markup is malformed, search engines silently ignore it; SEO benefit lost without visible error
- Current mitigation: None; schema.org context is correct, but field presence/types not validated
- Fix approach: Use schema.org JSON-LD validator (search.google.com/test/rich-results or schema.org/validator) as part of pre-launch checklist; add comments documenting which fields are required vs optional per schema.org spec

## Future-Dated Posts Won't Appear

**Jekyll default behavior, not obvious to user:**
- Issue: If a blog post has a date in the future, Jekyll excludes it from `site.posts` collection; won't appear on blog page or RSS feed
- Files: `_posts/*.html`, `pages/blog.html` (uses `site.posts` loop)
- Impact: Content creator may publish a post and wonder why it doesn't appear; no error message or warning
- Current mitigation: Documented in `README.md` troubleshooting (line 577)
- Fix approach: Add frontmatter check to `_posts/CLAUDE.md`; add "Draft" or "Scheduled" status fields to optional frontmatter schema to handle scheduled posts explicitly

## No Draft/Unpublished Post Support

**All HTML files in _posts/ are published:**
- Issue: No way to save a post in-progress without it appearing live; deleting accidental files requires git undo
- Files: `_posts/` directory, `_config.yml` (no drafts config)
- Impact: Content creators must be careful not to commit unfinished posts; no staging environment for review
- Current mitigation: None; rely on GitHub Desktop discipline
- Fix approach: Add `_drafts/` directory (Jekyll convention) or use frontmatter status field (`status: draft` in YAML); update blog.html to filter `site.posts` by status

## CSS Color Contrast Incomplete Documentation

**Token usage rules not explicit everywhere:**
- Issue: `--color-gold: #C44A2F` (CTA-only, restricted to white text) but constraint only documented in `assets/css/CLAUDE.md` (line 133) and token comment
- Files: `assets/css/style.css` (line 35), `assets/css/CLAUDE.md`
- Impact: Future editors may use --color-gold for body text or small elements; would fail WCAG AA contrast test
- Current mitigation: Comment in CSS and CLAUDE.md file
- Fix approach: Add accessibility comment next to token definition in CSS; add explicit rule to CONVENTIONS.md: "Never use --color-gold except for buttons with white text"

## SVG/Icon System Not Documented

**No icon strategy or asset location guidance:**
- Issue: Site references social links, status badges, buttons (which may need icons) but no guidance on SVG handling, fallback, or optimization
- Files: `_includes/social-links.html`, `_includes/course-card.html` (status badges)
- Impact: Future icons will be added ad-hoc without consistent approach (inline SVG, <img>, `<i>` class, font-icons); maintenance debt accumulates
- Current mitigation: None; no icons currently used
- Fix approach: Create `assets/icons/` directory with SVG sprites or individual SVGs; document icon naming convention (kebab-case); decide on optimization (SVGO for production)

## Responsive Image Path Not Type-Safe

**Landscape/portrait image paths accepted as strings, no validation:**
- Issue: `responsive-image.html` include accepts `landscape` and `portrait` parameters as strings with no validation that files exist
- Files: `_includes/responsive-image.html`
- Impact: Typos in image paths fail silently; browsers show broken image placeholder on one or both breakpoints
- Current mitigation: None
- Fix approach: Add path validation to `responsive-image.html` or generate build-time warnings; document required file naming pattern in README.md (already done at line 111-112 but not enforced)

## No Build Preview Before Push

**Changes must be committed and pushed to see them live:**
- Issue: User cannot run Jekyll locally to preview changes before pushing to GitHub; must use GitHub Actions build output to debug
- Files: `_config.yml` mentions `bundle exec jekyll serve` in deployment.md but not part of normal workflow
- Impact: Fast feedback loop unavailable; debugging CSS/layout issues requires push-and-wait cycle
- Current mitigation: Local preview instructions documented in deployment.md (line 92-96)
- Fix approach: Add `.ruby-version` and `Gemfile` to project; document `bundle install && bundle exec jekyll serve` as pre-commit step in README.md

## baseurl Trap Remains Dangerous

**Switching to custom domain is error-prone despite documentation:**
- Issue: Changing domain requires updating BOTH `url` AND `baseurl` in `_config.yml` simultaneously; if only one changes, all assets and internal links break
- Files: `_config.yml` (lines 1, 4), `deployment.md` (lines 36-47)
- Impact: User could accidentally commit a half-way change that breaks site; site becomes unusable until both fields are corrected
- Current mitigation: 3-step process documented; warning added to deployment.md
- Fix approach: Extract domain validation to a reusable script or pre-push hook that checks `url`/`baseurl` consistency and CNAME agreement; prevents bad commits

## Cloudinary Integration Incomplete

**cloudinary_base config exists but not used:**
- Issue: `_config.yml` line 33 defines `cloudinary_base: "https://res.cloudinary.com/du8tl7x4m/image/upload"` but no templates or posts reference it
- Files: `_config.yml` (line 33)
- Impact: Dead config value suggests incomplete image CDN strategy; future editors don't know if/how to use Cloudinary
- Current mitigation: None
- Fix approach: Either remove config if Cloudinary is not planned, or document intended use case (image optimization, responsive image generation); if using, create example in blog post authoring guide

## No Form Validation in Contact/Signup

**No frontend validation on contact.html:**
- Issue: If contact page has a form, no client-side validation or CAPTCHA to prevent spam
- Files: `pages/contact.html` (not yet examined)
- Impact: Spam submissions through contact form; no backend processing, so submissions may be lost
- Current mitigation: Unknown; depends on contact page implementation
- Fix approach: Add client-side validation (HTML5 required, email pattern); consider CAPTCHA (hCaptcha, Cloudflare Turnstile) if contact form receives high spam; document submission handling in README.md

## Course Data Status Workflow Undocumented

**Status transitions from future -> coming-soon -> active not explicit:**
- Issue: `_data/courses.yml` uses `status` field with values `future`, `coming-soon`, `active` but transition rules and kajabi_url requirement not documented
- Files: `_data/courses.yml`, `_includes/course-card.html`
- Impact: When changing a course status, user must know to also fill kajabi_url if moving to active; incomplete transitions could show broken buttons or wrong badge colors
- Current mitigation: Referenced in README.md (line 493) and `_data/CLAUDE.md`
- Fix approach: Add explicit state machine documentation to `_data/CLAUDE.md` with examples; add validation to course-card.html to log console error if active course has no kajabi_url

## No SEO Metadata for Blog Posts

**Posts lack canonical URL and structured data completeness:**
- Issue: `json-ld.html` generates BlogPosting schema but missing `image`, `publisher`, `keywords` fields that improve SEO
- Files: `_includes/json-ld.html` (lines 1-14)
- Impact: Blog posts won't show rich snippets in Google results; missed SEO opportunity
- Current mitigation: Basic BlogPosting schema in place
- Fix approach: Extend schema with image (from frontmatter `image_landscape`), publisher (Teresa Ristow organization object), and keywords (from frontmatter tags field if added); add frontmatter schema to blog posts documentation

---

*Concerns audit: 2026-04-04*
