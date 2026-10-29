# Portfolio update — DirectorMind (October 2026)

This update converts the original single-project homepage into a two-project portfolio.

## Included files
- `index.html` — new portfolio homepage with DirectorMind and Breast Ultrasound project cards.
- `directormind.html` — new DirectorMind case-study page with real UI screenshots and architecture diagram.
- `breast-ultrasound.html` — your original `index(1).html`, moved to a dedicated page with only navigation changes.
- `about.html` — refreshed to mention agentic AI and updated Projects navigation.
- `style.css` — your original stylesheet plus scoped responsive styles for the new pages.
- `script.js` — original language-switch/viewer JavaScript, unchanged.
- `assets/directormind-*.png` — selected real project screenshots/architecture slide.

## IMPORTANT: Existing assets not included
Your original site's `assets/` directory was not among the uploaded website files. Keep all existing files in your GitHub repository's `assets/` folder, including your CV PDFs, portrait, and breast ultrasound viewer images. **Do not delete or replace your existing assets folder.** Upload the three new `directormind-*.png` images into that same folder.

## GitHub Pages update steps
1. Open your `qwqtw.github.io` repository (or the actual GitHub Pages source repository).
2. Back up your current `index.html`, `about.html`, `style.css`, and `script.js`.
3. Upload `index.html`, `directormind.html`, `breast-ultrasound.html`, `about.html`, `style.css`, `script.js` to the repository root. Replace the existing root files of the same names.
4. Add `assets/directormind-character.png`, `assets/directormind-script.png`, and `assets/directormind-architecture.png` to the **existing** `assets/` directory.
5. Commit the changes, then check the published site and the EN/中文 switch on all pages.

## Optional next improvements
- If you publish the DirectorMind GitHub repository or a live demo, add its **real URL** to `directormind.html` (none has been invented).
- Replace screenshots with newer screenshots when ready.
- Check the `assets/Autumn_Wang_CV.pdf` and `assets/Autumn_Wang_CV_CN.pdf` files in your repository to ensure the About page resume links work.

Notes: This is a static presentation of the working DirectorMind application, **not an online hosted instance** of the application itself. The technical description avoids claiming a full H-MEM implementation or image-pixel comparison.

## 2026-10-28 button contrast and repository update
- Explicit text colors were added for `.btn-light` and `.btn-dark` (including links and dark backgrounds).
- DirectorMind source button points to `https://github.com/qwqtw/ai-manju-studio` on the homepage and the project detail page.
- If the repository is private, visitors will need access before the GitHub link will work.
