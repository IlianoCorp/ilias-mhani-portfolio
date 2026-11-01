# Mhani Ilias — Engineering e-portfolio

A bilingual lifelong academic and professional portfolio for ENSEEIHT / Toulouse INP. Built with HTML5, CSS3 and vanilla JavaScript, without packages, external fonts, frameworks or a build step. English is the default; French is available throughout. All content remains readable when JavaScript is unavailable.

## Files

- `index.html`: Welcome, selected projects, elevator pitch
- `engineering.html`: pathway, illustrated skills, compact projects and visual progression
- `mobility.html`: international background, potential destinations at UPC, TUM and EPFL, and languages
- `sustainability.html`: civic experiences and sustainability reflection
- `activities.html`: sports, guitar, editing, travel
- `career.html`: career directions, career project, professional experiences, CV/LinkedIn/pitch resources, three role models
- `projects/abs.html`, `projects/guessing-game.html`, `projects/ebay-clone.html`: project documentation
- `css/style.css`: shared responsive design
- `js/translations.js`: English/French text dictionary
- `js/main.js`: language persistence, mobile menu, optional assets, current year
- `assets/images/`, `assets/documents/`, `assets/video/`: your approved media
- `TODO.md`: remaining content checklist

## Preview

Open `index.html` directly in a browser. All pages use relative paths and work without a server. Alternatively, run `python3 -m http.server 8000` from this directory and visit `http://localhost:8000`. Stop the server with Ctrl+C.

## Editing content and translations

Each text element has a `data-i18n` key. Find its key in `js/translations.js` and edit **both** the `en` and `fr` entries. Update the corresponding English text in HTML too, so the no-JavaScript fallback remains useful. Dictionary values are plain text, never executable HTML. Language preference is saved in localStorage under `portfolio-language`; storage denial is handled gracefully.

Page titles and descriptions start in English; the language switch updates them. For substantive changes, update each HTML file's metadata too. Keep one h1 per page and use h2 for sections and h3 for cards.

Edit the existing HTML, CSS and translation files directly. Obsolete one-off authoring scripts have been removed so they cannot restore outdated content.

## Add your photograph, CVs and pitch

Place real files at:

- `assets/images/profile.png`
- `assets/documents/cv-ilias-mhani-en.pdf`
- `assets/documents/cv-ilias-mhani-fr.pdf`

Then set the `assets` object in `js/main.js`:

```js
const assets = window.portfolioAssets || {
  profile: 'assets/images/profile.png',
  cvEn: 'assets/documents/cv-ilias-mhani-en.pdf',
  cvFr: 'assets/documents/cv-ilias-mhani-fr.pdf',
  github: ''
};
```

Only set keys for files that actually exist. The final English and French CV PDFs are already included and linked from the static HTML, so they also work without JavaScript. An empty GitHub value keeps that optional profile hidden. Your original portrait is already included as `assets/images/profile.png` in static HTML on every page, with alt text “Mhani Ilias”. It is cropped visually using CSS object-fit and object-position; the image file is unmodified. The completed pitch uses a vertical 9:16 YouTube iframe on Welcome, with no autoplay or custom video controls. A future GitHub profile can be enabled using `github`; it stays hidden until configured. No fake PDFs, videos or stock profile images are included.

## Project evidence and future projects

Optional material is omitted until real assets are provided. Both final CVs are available. The completed Elevator Pitch is embedded on Welcome; Career links to that section. Keep the required Three Role Models section in future simplification passes. Its three concise profiles use the supplied backgrounds of Simon Demessance, Danaël Christophe and Yassair Abdel Talla Fopa, with personal takeaways. No TIPE PDF, graphs, code, circuit photographs or diagrams are planned. If adding other approved media later, use descriptive relative links or semantic image/video elements in `assets/documents/`, `assets/images/` or `assets/video/`. Supply alt text for informative images. Reusable components include `.project-card`, `.media-card`, `.document-card`, `.timeline`, `.skill-tag`, `.reflection-card`, `.role-model-card`, `.placeholder-card`. Private content can use `.private-project` and the label “Private project — details available on request.”

To add a project, copy an existing project HTML file, keep `../` for its shared CSS/JS/assets/navigation, update metadata and headings, add new translation keys in both languages, and add a link to the engineering page. Keep project documentation concise: title, context, what I did, tools and what I learned. Recruiters and professors should be able to scan it in 20–30 seconds. Distinguish confirmed facts, plans and personal reflections that still need completion. Do not invent outcomes.

## Academic integrity and privacy

The Guessing Game was an academic assignment whose original brief prohibited AI-assisted implementation. Its portfolio page only documents the project at a high level. No AI-generated assignment solution should be added to this repository. Any future program or code link must come from the student's own original work and be permitted by the school. Do not publish a confidential assignment brief or a complete solution without authorization.

GitHub Pages is a static **public website**. It cannot securely protect confidential documents. Never upload NDA documents, private company files, confidential reports or sensitive personal information. A hidden link or disabled button does not make an uploaded file private. Keep private documents outside the repository and site archive.

## Deploy on GitHub Pages

1. Create a GitHub repository and upload the six root HTML pages, `projects/`, `css/`, `js/` and `assets/`. `README.md` and `TODO.md` can also be included. No GitHub profile is assumed by this portfolio.
2. In the repository, select **Settings → Pages → Deploy from a branch**.
3. Choose your branch (usually `main`) and the `/ (root)` folder, then save.
4. Open the URL GitHub provides after deployment. Relative paths support both user and project Pages sites.

No package installation, build command or server routing is required. Do not upload `work/`, `outputs/`, `dist/`, credentials or local publishing state. `.openai/hosting.json` is Sites hosting metadata and is unnecessary for GitHub Pages. For local verification, check all pages at desktop and 320px, both languages, keyboard focus, navigation and any real assets you later enable.

## Local SVG icons

Brand icons are vendored from [Devicon](https://github.com/devicons/devicon), under its MIT license (`assets/icons/DEVICON-LICENSE.txt`). Brand marks belong to their respective owners. The concept and activity line icons are local SVG drawings. No icon library or third-party request is needed at runtime. Icons are decorative (`alt=""`, `aria-hidden="true"`) and sit outside the translatable text spans, so switching languages preserves them.

## Project Back navigation

Every dedicated project has a bilingual Back link. With meaningful same-tab portfolio history it calls `window.history.back()`, preserving the origin page and its browser scroll position. Direct project visits and new tabs use the relative `../index.html` fallback; language is preserved. The fallback remains a working homepage link without JavaScript.

## Layout and portfolio content

The sidebar portrait becomes a compact photo/name/school row on mobile. Role-model cards contain the name, role, professional context, short summary and personal takeaway in both languages. Destination cards present UPC as preferred, TUM as an alternative and EPFL as another potential option, with links to official academic information. They do not imply admission or an exchange agreement. The pitch is hosted on YouTube with video ID `8dX2oJsddDE`; change the iframe URL in `index.html` if the video is replaced.

## Elevator Pitch and awareness experiences

Welcome contains the single 9:16 iframe (`https://www.youtube.com/embed/8dX2oJsddDE`) with the title “Ilias Mhani — Elevator Pitch”. The Career resource card links to `index.html#elevator-pitch`, and the Welcome action scrolls to the same section. YouTube supplies keyboard-accessible controls; autoplay is not enabled. The civic page separates community engagement from the Climate Fresk workshop and circular-economy conference, using concise EN/FR experience and reflection cards.
