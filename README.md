# ISHQCRAFT · Engagement Anniversary Surprise
A mobile-first romantic surprise website: velvet curtains → circular reveal → love story → gallery → real canvas scratch card → anniversary screen → final surprise. Pure HTML/CSS/JS, no backend.

## Files
```
index.html
css/style.css
js/script.js          <- all text/photos/names live in surpriseConfig at the top
assets/images/        <- YOU add: ring-surprise.jpg, couple-1.jpg, couple-2.jpg
assets/audio/         <- YOU add (optional): romantic-music.mp3
```
**Included:** the ring photo (`ring-surprise.jpg`), velvet curtain photo, rose bouquet (`roses.png`) and rose petal (`petal.png`).
**Also included:** 4 couple photos (`couple-1..4.jpg`). **Not included:** music — until you add it, no music plays; everything still works.

## Change the ring photo (hero)
Replace `assets/images/ring-surprise.jpg` (or change `heroImage` in the config).

## Add couple photos
Search for `📸` in `js/script.js` — there are 3 marked places (story photos, memory-card film strip, hero photo) with step-by-step comments.

Put photos in `assets/images/` (e.g. `couple-1.jpg`), then set the path in `story[].photo` and `gallery[].src` inside `js/script.js`. Add more gallery items by copying a line. Tip: resize photos to ~1200px wide so it loads fast on WhatsApp links.

## Add music
Put a royalty-free / licensed file at `assets/audio/romantic-music.mp3`. It starts only after Aisha taps "Open your surprise"; the ♪ button pauses/resumes. Don't use copyrighted songs without permission.

## Change messages, names, year
Edit `surpriseConfig` in `js/script.js`: `senderName`, `recipientName`, `anniversaryDate`, `anniversaryYear` (blank = hidden), `story`, `gallery`, `scratchMessage`, `finalMessage`, `endingText`.

## Test locally
Open `index.html` in Chrome, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`. Use browser DevTools device mode (360px, 390px, 768px) and test the scratch card with touch emulation. Always test once on a real phone.

## Deploy on GitHub Pages
1. Create a GitHub repo and upload all files (keep the folder structure).
2. Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)` → Save.
3. After ~1 minute your link is `https://<username>.github.io/<repo>/` — send it on WhatsApp.

## Heart scratch card
The card is heart-shaped. The short text inside the heart is `heartMessage`; the full letter (`scratchMessage`) slides in below once ~45% is scratched.
