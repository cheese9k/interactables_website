# Interactables marketing site

A static site for `interactables.app`: one page, no build step and no dependencies.

```
index.html
assets/css/site.css    brand tokens (from the app's index.css), layout, the themed demo slides
assets/js/site.js      the live demo and the smaller interactive pieces
assets/brand/          logos and icons, copied from ai_workshops/app/public/brand
assets/fonts/          Inter, Manrope and Fraunces (self-hosted, as in the app)
```

## Preview

Fonts don't load from `file://`, so serve the folder:

```
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173/.

## Before it goes live

- **Contact address.** Every "Request access" button is `mailto:hello@interactables.app`, which is a placeholder. Find and replace it in `index.html` and `assets/js/site.js`.
- **Pricing.** The plans are the proposed design-partner plans from `INTERACTABLES_PLAN.md` section 5. Confirm the prices and what each plan includes.
- **QR code.** The code on the demo's Vote slide opens `https://interactables.app/#demo`. If the site lives somewhere else, regenerate the path in `QR_PATH` (`site.js`).
- **Demo data.** The client names (Calder & Row, Northfold, Juniper Legal) are made up, and the other votes in the demo are simulated. The page says so.
