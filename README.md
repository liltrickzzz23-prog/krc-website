# Knowledge Reach Connections — Website

A complete, multi-page marketing website for the Knowledge Reach Connections
used-phone donation drive. Built as static files (HTML/CSS/JS) — no build step,
no server code, no database. It runs anywhere.

---

## 1. What's included

```
index.html        Home — hero, how it works, security, programs, calculator, video, CTA
about.html        About — mission, values, fund allocation, leadership
impact.html       Programs & Impact — education / food / medical + impact calculator
partners.html     For Companies — benefits, onboarding, partnership tiers, FAQ
contact.html      Become a Partner — contact details + partnership inquiry form
privacy.html      Privacy Policy (starter template — have counsel review)
assets/
  styles.css      All site styling (one shared file)
  script.js       All interactivity (nav, calculator, FAQ, form, animations)
  favicon.svg     Site icon
```

---

## 2. View it locally

Just double-click `index.html` — it opens in any browser. Everything works
offline except Google Fonts (which need internet) and the live form submit.

To preview exactly as deployed, run a tiny local server from this folder:

```bash
# Python (already on Mac/most systems)
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 3. Deploy it (pick one — all free)

**Netlify Drop (easiest):** go to https://app.netlify.com/drop and drag this
whole folder in. Done — you get a live URL in seconds.

**GitHub Pages:** push the folder to a repo, then Settings → Pages → deploy from
`main` / root.

**Cloudflare Pages / Vercel:** connect the repo or drag-drop the folder.

Because it's plain static files, hosting costs nothing on any of these.

---

## 4. Make the contact form actually send (5 minutes)

The form is pre-built for **Formspree** (free tier, no backend needed):

1. Create a free account at https://formspree.io
2. Make a new form — it gives you an endpoint like `https://formspree.io/f/abcdwxyz`
3. Open `contact.html`, find this line near the form:
   ```html
   <form class="kform" id="partnerForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with the real ID (e.g. `.../f/abcdwxyz`).

That's it. Submissions land in the email you set up in Formspree, and visitors
see an inline "thank you" without leaving the page.

> Until you add a real endpoint, the form shows the success message for
> demo/preview purposes but does **not** send anywhere.

Prefer a different provider? Basin, FormSubmit, and Getform all work the same
way — just swap the `action` URL.

---

## 5. Drop in the 30-second video

In `index.html`, find the block marked `id="videoSlot"` inside the video section.
Replace the whole placeholder `<div class="video-placeholder">…</div>` with either:

```html
<!-- self-hosted file: put impact.mp4 in /assets -->
<video controls playsinline poster="assets/video-poster.jpg">
  <source src="assets/impact.mp4" type="video/mp4">
</video>
```

or a YouTube/Vimeo embed:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
```

The container is already styled and responsive (16:9).

---

## 6. Swap in the real logo

The current logo is a clean SVG version of the green/gold KRC mark, used inline
in every page header and footer (search for `logo-mark`). To use an image file
instead, replace each `<svg class="logo-mark">…</svg>` with:

```html
<img class="logo-mark" src="assets/logo.png" alt="Knowledge Reach Connections">
```

Same for `assets/favicon.svg` if they have a favicon they prefer.

---

## 7. Editing content

- **Text:** open any `.html` file and edit the words between the tags. No coding
  needed for copy changes.
- **Colors:** all colors live at the top of `assets/styles.css` under `:root`
  (e.g. `--green-800`, `--gold`). Change them once, the whole site updates.
- **Impact calculator math:** the three estimate constants are at the top of the
  calculator section in `assets/script.js` (`CO2_PER_PHONE`, `KG_PER_PHONE`,
  `PEOPLE_PER_PHONE`) — easy to adjust if the client has firmer figures.

---

## 8. Before going live — checklist for the client

- [ ] Confirm the contact **email address** (the source letter shows
      `rsears.KRCglobal.org`, which is missing an `@` — the site currently uses
      `rsears@KRCglobal.org`).
- [ ] Wire the contact form to Formspree (section 4).
- [ ] Add the impact video (section 5).
- [ ] Have a lawyer review `privacy.html` and the tax-deduction language; update
      to match actual data practices.
- [ ] Verify all impact figures and the fund-allocation percentages reflect the
      organization's real plans (they're currently labeled as estimates/targets).
- [ ] Decide on the public-facing partner names. The site uses **categories**
      ("Retailers," "Wireless Carriers") rather than naming Goodwill/Walmart/
      Best Buy directly, since publishing another company's name as a partner
      before an agreement exists can create legal/branding issues. Direct
      outreach to those companies belongs in emails, not on the public page.

---

Built with care. Questions on anything above — happy to walk through it.
