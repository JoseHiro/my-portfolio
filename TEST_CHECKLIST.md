# Production readiness test checklist

Run through these before deploying.

## Functionality
- [ ] Dark mode works perfectly (toggle in header)
- [ ] Language toggle switches all content (EN | JP)
- [ ] All links work (nav, CTAs, project cards, social, footer)
- [ ] Filter tabs in Projects section filter correctly
- [ ] Smooth scroll to sections with correct offset below fixed header

## Performance & UX
- [ ] All animations are smooth (60fps)
- [ ] Images load with blur placeholder (Projects grid)
- [ ] Fast load time (< 2s on typical connection)
- [ ] No layout shift when sections lazy load

## Responsive
- [ ] Mobile responsive on all sections
- [ ] Touch targets at least 44×44px (buttons, links, toggles)
- [ ] Mobile menu: smooth slide-in animation
- [ ] Text sizes scale appropriately across breakpoints

## Accessibility
- [ ] Keyboard navigation works (Tab through all interactive elements)
- [ ] Focus states visible (blue ring)
- [ ] Skip to main content link appears on first Tab
- [ ] Proper heading hierarchy (single h1 in Hero, then h2 per section)
- [ ] No console errors

## SEO & Metadata
- [ ] Page title and description correct
- [ ] `/sitemap.xml` and `/robots.txt` load
- [ ] Open Graph tags present (inspect in dev tools or social debuggers)

## Optional / Easter egg
- [ ] Custom cursor (desktop only): dot follows mouse
- [ ] Konami code: ↑↑↓↓←→←→BA shows toast
- [ ] Tooltips on tech stack tags (hover)
