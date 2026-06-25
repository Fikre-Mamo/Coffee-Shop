# Website Review Report — Great Vibes Coffee Shop

## Overall Assessment

**Score: 5.5/10**

The site has a clear visual direction, working mobile nav, and a functional menu filter. Under that polish are invalid HTML, broken navigation targets, severe image bloat, duplicated markup, accessibility gaps, and CSS/animation bugs that would block a production launch.

---

### Strengths

- Consistent brand palette via CSS custom properties (`--primary-color`, `--secondary-color`, etc.)
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`
- Menu filters use `aria-label="Menu categories"` and add buttons have `aria-label`
- Mobile nav overlay with backdrop blur
- Menu filter logic in `app.js` is small and correct
- Responsive breakpoints exist for hero, about, menu grid, and filters
- GitHub Pages deploy workflow is configured

### Weaknesses

- ~1,100 lines of HTML with heavy menu duplication (~700+ lines repeated)
- Invalid HTML (extra `</p>`, duplicate attributes, `<button>` inside `<ul>`)
- Broken `#contact` nav link (section commented out)
- Hero image ~9 MB; about splash ~3.5 MB
- Font Awesome loaded twice; Poppins loaded with all weights
- Many wrong `alt` texts and copy-pasted descriptions
- Testimonial carousel animation is incomplete/broken
- No focus styles, skip link, or `prefers-reduced-motion` handling
- `.hintrc` disables accessibility hints

---

## Critical Issues

### 1. Broken Contact Navigation Link

**Severity:** Critical  
**File:** `index.html`

**Description:** Nav links to `#contact`, but the contact section is commented out.

**Impact:** Users get a dead link; hurts UX and accessibility (broken in-page navigation).

**Current Code:**

```52:54:index.html
            <li class="nave-item">
              <a class="nav-link" href="#contact">Contact</a>
            </li>
```

```1092:1093:index.html
        <!-- Contact-section -->
        <!-- <section class="contact-section" id="contact"></section> -->
```

**Recommended Fix:** Restore a real contact section, or remove/update the nav link and hero “Contact Us” button to point to a valid target (e.g. `#about` or `mailto:`).

---

### 2. Massive Unoptimized Hero Image (~9 MB)

**Severity:** Critical  
**File:** `img/delicious coffee to go cup.png`, referenced in `index.html`

**Description:** Hero image is ~9 MB PNG.

**Impact:** Very slow LCP, poor mobile performance, higher bounce rate, bad Core Web Vitals.

**Current Code:**

```87:92:index.html
              <img
                class="hero-image"
                src="img/delicious coffee to go cup.png"
                alt=""
                class="hero-image"
              />
```

**Recommended Fix:**

```html
<img
  class="hero-image"
  src="img/hero-cup.webp"
  alt="Delicious coffee in a to-go cup"
  width="500"
  height="500"
  loading="eager"
  fetchpriority="high"
/>
```

Compress to WebP/AVIF (~80–150 KB), add descriptive `alt`, remove duplicate `class`, add explicit dimensions to reduce layout shift.

---

### 3. Invalid HTML — Extra Closing `</p>` Tag

**Severity:** High  
**File:** `index.html` (lines 890–892)

**Description:** Stray closing `</p>` breaks document structure.

**Impact:** Unpredictable parsing, accessibility tree errors, validator failures.

**Current Code:**

```890:892:index.html
            <p class="description">
              Real people, real stories, real <span class="span-great-coffee">great Coffee</span></p>
            </p>
```

**Recommended Fix:**

```html
<p class="description">
  Real people, real stories, real
  <span class="span-great-coffee">great Coffee</span>
</p>
```

---

### 4. CSS Syntax Error in Mobile Media Query

**Severity:** High  
**File:** `style.css` (line 562)

**Description:** Missing semicolon; `--font-size-s` set to `3rem` (likely meant `0.9rem`).

**Impact:** Broken or unintended typography at ≤850px.

**Current Code:**

```559:566:style.css
@media (max-width: 850px) {
  :root {
    /* Font Size */
    --font-size-s: 3rem --font-size-m: 1rem;
    --font-size-l: 1.2rem;
    --font-size-xl: 1.5rem;
    --font-size-xxl: 2.5rem;
  }
```

**Recommended Fix:**

```css
@media (max-width: 850px) {
  :root {
    --font-size-s: 0.9rem;
    --font-size-m: 1rem;
    --font-size-l: 1.2rem;
    --font-size-xl: 1.5rem;
    --font-size-xxl: 2.5rem;
  }
```

---

### 5. Invalid HTML — `<button>` Direct Child of `<ul>`

**Severity:** High  
**File:** `index.html` (lines 34–39)

**Description:** Close button is a direct child of `<ul>`; only `<li>` is allowed.

**Impact:** Invalid markup, inconsistent screen reader behavior.

**Current Code:**

```34:39:index.html
          <ul class="nav-menu">
            <button
              id="menu-close-button"
              type="button"
              class="fas fa-times"
            ></button>
```

**Recommended Fix:**

```html
<ul class="nav-menu">
  <li class="nav-menu-close">
    <button
      id="menu-close-button"
      type="button"
      aria-label="Close menu"
    >
      <i class="fas fa-times" aria-hidden="true"></i>
    </button>
  </li>
  <!-- nav items -->
</ul>
```

---

### 6. Duplicate Font Awesome Stylesheet

**Severity:** High  
**File:** `index.html` (lines 12–22)

**Description:** Font Awesome 7.0.1 is loaded twice.

**Impact:** Duplicate network requests and parsing.

**Recommended Fix:** Keep one link (prefer the one with `integrity`):

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
  integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

---

## Bugs Found

| File | Issue | Severity |
|------|-------|----------|
| `index.html` | Nav `#contact` points to removed section | Critical |
| `index.html` | Duplicate `class="hero-image"` on same element | Medium |
| `index.html` | Extra `</p>` in testimonials header | High |
| `index.html` | Cards 7 & 8 use `card-6` instead of `card-7` / `card-8` | Medium |
| `index.html` | Iced grid lists Mocha (hot drink) under Iced Coffee | Medium |
| `style.css` | `.coffee-cup { height: 40; }` — missing unit | Medium |
| `style.css` | `--font-size-s: 3rem` typo breaks mobile typography | High |
| `style.css` | `body.close-mobile-menu` never applied in JS | Low |
| `style.css` | Testimonial `animation-delay` on cards but animation is on parent `.section-grid` | High |
| `style.css` | `scrollleft` only moves `left` to `-400px` — far too short for 8 × 450px cards | High |
| `app.js` | Close menu calls `menuOpenButton.click()` (toggle) instead of removing class | Medium |
| `app.js` | Nav links don’t close mobile menu after click | Medium |
| `app.js` | No null checks if DOM elements missing | Low |
| `app.js` | `.card-add` buttons have no behavior | Medium |

---

## HTML Improvements

| File | Problem | Recommendation |
|------|---------|----------------|
| `index.html` | Empty `href=""` on logo, Order Now, Contact Us | Use `#hero`, `#menu`, `#contact` or real URLs |
| `index.html` | `h1` subtitle after `h2` title in testimonials | Use one `h1` per page; keep logical order (`h1` → `h2` → `h3`) |
| `index.html` | `h2` inside `<a>` for logo | Use `<span>` or styled text; one main `h1` on page |
| `index.html` | ~700 lines of duplicated menu markup | Single grid + `data-category` filter, or JS-render from JSON |
| `index.html` | Wrong `alt` on many images (e.g. all users `alt="user-1"`) | Match alt to person/item name |
| `index.html` | Copy-pasted descriptions (juice items describe espresso) | Unique copy per item |
| `index.html` | Typos: `nave-item`, `user-deteils`, `Vanila`, `Coctile`, `Nitro colde berw` | Fix class names and visible text |
| `index.html` | Decorative images with empty `alt` | Use `alt=""` + `aria-hidden="true"` where decorative |
| `index.html` | No meta description, OG tags, favicon | Add SEO/social meta and favicon |
| `index.html` | `<title>Great Vibes</title>` only | e.g. `Great Vibes \| Specialty Coffee in Addis Ababa` |
| `index.html` | `<br />` in menu intro for line break | Use CSS `max-width` instead |
| `index.html` | No `<footer>` | Add footer with hours, address, social, copyright |

---

## CSS Improvements

| File | Problem | Recommendation |
|------|---------|----------------|
| `style.css` | Poppins via HTML + Great Vibes via `@import` | One combined Google Fonts request |
| `style.css` | Poppins loads all weights (100–900) | Load only used weights (400, 500, 600, 700) |
| `style.css` | Duplicate `.menu-filters` blocks (lines 316–322, 391–398) | Merge into one rule |
| `style.css` | Nested `@media` inside `@media` (line 700) | Flatten for maintainability |
| `style.css` | Conflicting mobile menu card rules at ≤650px | Consolidate; test 320px–650px |
| `style.css` | `.section-title::after { color: var(--border-radius-s); }` | Use `border-radius`, not `color` |
| `style.css` | `transition: all 0.4 ease` missing `s` | `transition: all 0.4s ease` |
| `style.css` | Global `* { font-family, text-decoration, list-style }` | Scope to base/reset; don’t strip list semantics site-wide |
| `style.css` | No `:focus-visible` styles | Visible focus for keyboard users |
| `style.css` | `.testimonials-section { height: 100dvh }` fixed | Use `min-height`; allow content to grow |
| `style.css` | Unused assets not referenced | Remove or use `Menu background.png`, filter icons, etc. |
| `style.css` | `.card-add { height: 100% }` | Fixed width/height (e.g. 32×32px) |
| `style.css` | Star `.active` class in HTML, no `.rating .active` styles | Style gold stars explicitly |
| `style.css` | `.container` in HTML has no CSS | Remove wrapper or style it |

---

## JavaScript Improvements

| File | Problem | Recommendation |
|------|---------|----------------|
| `app.js` | Close button toggles via open button | `document.body.classList.remove('show-mobile-menu')` |
| `app.js` | Menu stays open after nav click | Close on `.nav-link` click |
| `app.js` | No Escape / overlay click to close | Add listeners |
| `app.js` | No `card-add` handlers | Cart feedback, toast, or disable until implemented |
| `app.js` | No error handling for missing elements | Guard before `addEventListener` |
| `app.js` | Filter logic duplicated in HTML (`active-grid` on 4 grids) | Rely on JS initial state only |

**Recommended close-menu fix:**

```javascript
menuCloseButton.addEventListener("click", () => {
  document.body.classList.remove("show-mobile-menu");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.body.classList.remove("show-mobile-menu");
  }
});
```

---

## Accessibility Improvements

| Issue | Fix |
|-------|-----|
| Icon-only menu open/close buttons | `aria-label="Open menu"` / `"Close menu"` |
| Font Awesome icons on buttons | Put icons in `<i aria-hidden="true">`; label the button |
| Empty `alt` on meaningful hero/coffee images | Descriptive alt text |
| All testimonial avatars `alt="user-1"` | `alt="Photo of Sara"` etc. |
| Star ratings are icons only | `aria-label="4.5 out of 5 stars"` on `.rating` |
| Quote icon decorative | `aria-hidden="true"` |
| No skip link | `<a href="#main" class="skip-link">Skip to content</a>` |
| No visible focus indicators | `:focus-visible` outline styles |
| Infinite testimonial animation | `@media (prefers-reduced-motion: reduce) { animation: none; }` |
| `href="#"` social links | Real URLs or `aria-disabled` if placeholders |
| Heading hierarchy skips / multiple implied h1s | Single page `h1`, then nested headings |
| `.hintrc` disables `axe/name-role-value` | Re-enable and fix reported issues |
| Fixed header covers content | `scroll-margin-top` exists — verify on all sections |
| Color contrast on `.about-menu` (40% white opacity) | Test WCAG; increase contrast |

---

## Responsive Design Issues

| Breakpoint | Issue |
|------------|-------|
| ≤850px | Broken `--font-size-s` may inflate small text |
| ≤850px | Mobile menu `padding: 100px` — tight on small screens |
| ≤850px | `left: -300` missing `px` on close state (line 614) |
| 650px–850px | Menu grid 3 columns may be tight |
| ≤650px | Nested + outer media rules conflict on card layout |
| ≤650px | `gap: 3rem` on `.card-content` creates huge spacing |
| ≤650px | Conflicting `.card-image` width (50% vs 90px) |
| ≤600px | Single column grid — OK, but overlaps prior 2-column rules |
| Testimonials | Fixed `100dvh` clips content on short viewports |
| Testimonials | Horizontal scroll animation not usable on touch; no pause control |
| Hero mobile | `flex-direction: column-reverse` — text below image; confirm intent |
| Filters ≤768px | Horizontal scroll works; no scroll hint for users |

---

## Code Cleanup Opportunities

### Dead code
- Commented contact section in `index.html`
- `body.close-mobile-menu` CSS (never used)
- Unused images: `all-coffee.png`, `hot-drink.png`, `iced-coffee.png`, `juice.png`, `tea.png`, `Menu background.png`, `realistic-coffee-cup.png`, `coffee.png`
- `test.html` in git status but not in repo

### Duplicate code
- 5 nearly identical menu grids (~35 cards duplicated across filters)
- Duplicate Font Awesome `<link>`
- Duplicate `.menu-filters` CSS
- Duplicate `.hero-image` class attribute

### Unused CSS
- `.card-7`, `.card-8` animation delays (wrong classes in HTML)
- `body.close-mobile-menu` rule

### Unused JavaScript
- None significant; script is minimal but incomplete (no cart, no menu close on nav)

### Unnecessary HTML
- Repeated menu cards per category (maintain one source of truth)
- Wrapper `<div class="container">` with no styles
- Duplicate Font Awesome link

---

## Refactoring Priorities

### High Priority
1. Compress and optimize hero/about images (WebP, dimensions)
2. Fix invalid HTML (extra `</p>`, button in `<ul>`, duplicate attributes)
3. Restore or remove `#contact` navigation
4. Fix CSS `--font-size-s` typo
5. Add `aria-label`s to menu buttons
6. Fix testimonial carousel (animation target, distance, card classes)
7. Remove duplicate Font Awesome load

### Medium Priority
8. Deduplicate menu HTML (data-driven rendering)
9. Correct alt text and product descriptions
10. Close mobile menu on nav click / Escape
11. Add focus styles and `prefers-reduced-motion`
12. Add meta description, favicon, footer
13. Implement or remove “Add to cart” (+) buttons
14. Fix heading hierarchy (single `h1`)
15. Consolidate conflicting mobile menu CSS

### Low Priority
16. Rename `nave-item` → `nav-item`, `user-deteils` → `user-details`
17. Use kebab-case image paths (no spaces): `coffee-cup.png`
18. Trim Poppins to used weights
19. Expand README beyond `# Coffee-Shop`
20. Deploy only site files in GitHub Actions (exclude `.vscode`, config)
21. Re-enable `.hintrc` accessibility hints

---

## Final Verdict

| Metric | Assessment |
|--------|------------|
| **Production readiness** | **4/10** — visually presentable locally, not ready for public launch |
| **Biggest issue** | Unoptimized assets (~9 MB hero) plus broken `#contact` link |
| **Most important improvement** | Image optimization + valid, deduplicated HTML with working navigation |
| **Recommended next steps** | 1) Compress images 2) Fix invalid HTML and CSS typo 3) Restore contact or fix nav 4) Accessibility pass (labels, focus, headings) 5) Refactor menu to single data source 6) Fix testimonial carousel 7) Run Lighthouse and axe before deploy |

---

**Summary:** The project reads as a strong learning/portfolio build with good visual intent. Before production, treat performance, HTML validity, accessibility, and content accuracy as blockers. The menu filter and mobile nav are solid foundations; the largest wins are image optimization, removing duplicated markup, and closing the gap between what the UI promises (contact, add-to-cart) and what actually works.