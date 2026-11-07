/* ISHQCRAFT · Engagement Anniversary Surprise
   ------------------------------------------------------------
   EDIT ONLY THIS CONFIG to personalise everything.
   Leave a photo as "" to show a pretty "Add photo" placeholder. */
const surpriseConfig = {
  senderName: "Mayur",
  recipientName: "Aisha",
  occasion: "Engagement Anniversary",
  anniversaryDate: "November 9",
  anniversaryYear: "",                       // e.g. "2025" (optional)
  // 📸 PLACE 3 - HERO PHOTO: the big first-page background (currently the ring photo)
  heroImage: "assets/images/ring-surprise.jpg",
  flowerImage: "assets/images/pink-rose.png",    // replaces the drawn lily in the memory card (set "" to use the drawing)
  backgroundMusic: "assets/audio/romantic-music.mp3",

  /* ==============================================================
     📸 WHERE TO ADD THEIR PHOTOS  (3 places below)
     1) Copy the photo files into the folder  assets/images/
        (e.g. assets/images/couple-1.jpg, couple-2.jpg, couple-3.jpg ...)
     2) Type the same file name in the "photo" / "src" fields below.
     3) Leave "" to keep a pretty "Add photo" placeholder.
     Tip: resize photos to about 1200px wide so the link opens fast on WhatsApp.
     ============================================================== */

  // 📸 PLACE 1 - STORY PHOTOS: one "photo" per chapter (timeline cards)
  // Example chapters - replace with Mayur's real story
  story: [
    { title: "Chapter 1 — The Beginning", photo: "assets/images/couple-2.jpg", pos: "50% 52%", text: "Every beautiful story begins with a special moment. And mine became beautiful when you became a part of it." },
    { title: "Chapter 2 — My Favorite Person", photo: "assets/images/couple-4.jpg", pos: "45% 45%", text: "Somehow, your smile became my favorite thing, and your happiness became something I always want to protect." },
    { title: "Chapter 3 — Our Engagement", photo: "assets/images/couple-3.jpg", pos: "50% 35%", text: "The day we promised to build a future together became one of the most special memories of my life." },
    { title: "Chapter 4 — Forever With You", photo: "assets/images/couple-1.jpg", pos: "50% 40%", text: "Today, I celebrate the beautiful bond we share and all the wonderful moments still waiting for us." }
  ],

  // 📸 PLACE 2 - MEMORY CARD PHOTOS: the FIRST 3 "src" go on the black & white film strip,
  // any extra items (4th, 5th...) appear below as small polaroid photos.
  // "pos" = which part of the photo stays visible when cropped (x% y%) - set it on the face.
  // Add more photos by copying one { ... } line.
  gallery: [
    { src: "assets/images/couple-1.jpg", pos: "50% 38%", caption: "My Favorite Smile ❤️", date: "" },
    { src: "assets/images/couple-3.jpg", pos: "50% 30%", caption: "Every Moment With You", date: "" },
    { src: "assets/images/couple-2.jpg", pos: "50% 45%", caption: "Our Beautiful Beginning", date: "" },
    { src: "assets/images/couple-4.jpg", pos: "45% 45%", caption: "Forever My Favorite Person", date: "" }
  ],

  // Short lines shown INSIDE the heart once it is scratched (keep it short so it fits the heart)
  heartMessage: [
    "My Dearest Aisha ❤️",
    "Happy Engagement Anniversary, My Love.",
    "I love you more than words can express.",
    "Forever yours,<br>Your Mayur ❤️"
  ],

  // Full letter: appears below the heart after the card is scratched. Each string = one paragraph
  scratchMessage: [
    "My Dearest Aisha ❤️",
    "Happy Engagement Anniversary, My Love.",
    "Every day with you makes my life more beautiful.",
    "You are my happiness, my favorite person, and the most precious part of my journey.",
    "Thank you for being the beautiful person who makes my heart smile.",
    "I feel lucky to have you in my life.",
    "No matter how many anniversaries come, I will always be grateful for the day our journey began.",
    "I love you more than words can express.",
    "Forever yours,<br>Your Mayur ❤️"
  ],

  scrapText: "Every day with you feels like a gift. You are my favorite person, my happiness, and my calm. Here's to us.",

  finalMessage: [
    "Hey Aisha ❤️",
    "I just want you to know that you mean so much to me.",
    "You make my ordinary days feel special.",
    "Thank you for being part of my life and for sharing this beautiful journey with me.",
    "I hope this little surprise brings a smile to your face.",
    "Happy Engagement Anniversary, My Love.",
    "Forever yours,<br>Mayur ❤️"
  ],

  endingTitle: "Our Forever Begins Here ❤️",
  endingText: "Happy Engagement Anniversary, Aisha. Here's to every beautiful day still waiting for us."
};

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const cfg = surpriseConfig;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHTML(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

// Builds a photo box; falls back to a placeholder if the file is missing
function photoBox(src, alt, extra = "", pos = "") {
  const box = document.createElement("div");
  box.className = "photo " + extra;
  if (!src) { box.classList.add("empty"); return box; }
  const img = new Image();
  img.alt = alt; img.loading = "lazy";
  if (pos) img.style.objectPosition = pos;   // keeps faces in frame when the photo is cropped
  img.onerror = () => { img.remove(); box.classList.add("empty"); };
  img.src = src;
  box.appendChild(img);
  return box;
}

/* ---------- fill the page from config ---------- */
function build() {
  document.querySelectorAll("[data-cfg]").forEach(el => el.textContent = cfg[el.dataset.cfg]);
  document.title = `A Little Surprise for ${cfg.recipientName} · ISHQCRAFT`;
  $("#annivDate").textContent = cfg.anniversaryDate + (cfg.anniversaryYear ? ", " + cfg.anniversaryYear : "");

  // Hero image (gradient background shows if the file is missing)
  const hi = $("#heroImg");
  hi.onerror = () => hi.remove();
  hi.src = cfg.heroImage;

  // Story timeline
  const tl = $("#timeline");
  cfg.story.forEach(ch => {
    const card = document.createElement("article");
    card.className = "chapter reveal";
    card.appendChild(photoBox(ch.photo, ch.title, "", ch.pos));
    card.insertAdjacentHTML("beforeend", `<h3>${escapeHTML(ch.title)}</h3><p>${escapeHTML(ch.text)}</p>`);
    tl.appendChild(card);
  });

  // Gallery: first 3 photos go on the black & white film strip, the rest become polaroids
  const strip = $("#strip"), gg = $("#galleryGrid");
  cfg.gallery.forEach((g, i) => {
    if (i < 3) { strip.appendChild(photoBox(g.src, g.caption, "frame-ph", g.pos)); return; }
    const item = document.createElement("figure");
    item.className = "g-item reveal";
    item.appendChild(photoBox(g.src, g.caption, "sq", g.pos));
    item.insertAdjacentHTML("beforeend", `<p>${escapeHTML(g.caption)}${g.date ? `<small>${escapeHTML(g.date)}</small>` : ""}</p>`);
    item.addEventListener("click", () => item.classList.toggle("tap"));
    gg.appendChild(item);
  });
  $("#scrapDate").textContent = cfg.anniversaryDate + (cfg.anniversaryYear ? ", " + cfg.anniversaryYear : "");
  $("#scrapText").textContent = cfg.scrapText;
  // Optional real flower PNG replaces the drawn lily if the file exists
  const fl = new Image(); fl.className = "lily"; fl.alt = "";
  fl.onload = () => { $(".lily").replaceWith(fl); };
  fl.src = cfg.flowerImage;
  $("#noteNames").textContent = cfg.senderName + " & " + cfg.recipientName;

  // Messages (<br> allowed for sign-offs)
  $("#scratchLetter").innerHTML = cfg.scratchMessage.map(t => `<p>${t}</p>`).join("");
  $("#cardMsg").innerHTML = '<i class="fl l"></i><i class="fl r"></i>' + cfg.heartMessage.map((t, i, a) => `<p${i === a.length - 1 ? ' class="sign"' : ""}>${t}</p>`).join("");
  $("#finalLetter").innerHTML = cfg.finalMessage.map(t => `<p>${t}</p>`).join("");
  $("#endTitle").textContent = cfg.endingTitle;
  $("#endText").textContent = cfg.endingText;
}

/* ---------- falling petals & floating hearts ---------- */
const fx = $("#fx");
function spawn(kind, rise) {
  if (reduceMotion) return;
  const el = document.createElement("div");
  el.className = "fx " + (kind === "petal" ? "petal" : "heart") + (rise ? " rise" : "");
  if (kind !== "petal") { el.textContent = Math.random() > .5 ? "❤" : "♥"; el.style.color = Math.random() > .5 ? "#e8758f" : "#c3173f"; el.style.fontSize = (12 + Math.random() * 16) + "px"; }
  const dur = 6 + Math.random() * 6;
  el.style.left = Math.random() * 100 + "vw";
  el.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
  el.style.setProperty("--rot", (Math.random() * 540 - 270) + "deg");
  el.style.animationDuration = dur + "s";
  fx.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}
let fxTimer;
function startAmbient() {            // lightweight: one element every ~600ms
  if (fxTimer) return;
  fxTimer = setInterval(() => { if (!document.hidden && fx.childElementCount < 30) { spawn("petal"); if (Math.random() > .6) spawn("heart", true); } }, 600);
}
function burst(n = 24) { for (let i = 0; i < n; i++) setTimeout(() => spawn(i % 3 ? "petal" : "heart", i % 3 === 0), i * 70); }

/* ---------- CURTAIN + CIRCULAR REVEAL ----------
   1) .open on #curtains slides the two velvet panels apart (translateX).
   2) #reveal (fixed, under the curtains) expands with clip-path: circle(0 -> 150%)
      from the centre while a golden ring scales outward.
   3) When finished the real page fades in and the helper layers are removed. */
let opened = false;
function openCurtains() {
  if (opened) return; opened = true;
  const curtains = $("#curtains"), reveal = $("#reveal"), ring = $("#revealRing");
  curtains.classList.add("open");
  reveal.classList.add("go"); ring.classList.add("go");
  startMusic();
  setTimeout(() => { startAmbient(); burst(18); }, 700);
  const total = reduceMotion ? 100 : 3300;
  setTimeout(() => {
    $("#stage").classList.add("show");
    document.body.classList.remove("locked");
    $("#musicBtn").hidden = false;
    setTimeout(() => { curtains.classList.add("done"); reveal.classList.add("hide"); ring.classList.add("hide"); }, 1000);
  }, total);
}

/* ---------- MUSIC (starts only after a tap; fails silently if file missing) ---------- */

/* ---------- MUSIC ---------- */

let audio = null;
let musicOn = false;

function syncMusicBtn() {
  const btn = $("#musicBtn");
  btn.classList.toggle("off", !musicOn);
  btn.textContent = musicOn ? "♫" : "♪";
}

function startMusic() {
  if (!audio) {
    audio = new Audio(cfg.backgroundMusic);
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";

    audio.addEventListener("error", () => {
      musicOn = false;
      syncMusicBtn();
      console.error("Music file could not load:", cfg.backgroundMusic);
    });
  }

  audio.play()
    .then(() => {
      musicOn = true;
      syncMusicBtn();
    })
    .catch(error => {
      musicOn = false;
      syncMusicBtn();
      console.error("Music playback failed:", error);
    });
}

$("#musicBtn").addEventListener("click", async () => {
  if (!audio) return;

  if (musicOn) {
    audio.pause();
    musicOn = false;
    syncMusicBtn();
    return;
  }

  try {
    await audio.play();
    musicOn = true;
  } catch (error) {
    musicOn = false;
    console.error("Unable to play music:", error);
  }

  syncMusicBtn();
});


/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ---------- SCRATCH CARD (real <canvas>) ----------
   Gold foil is painted on the canvas; pointer moves erase it with
   destination-out. Every ~150ms we sample the pixels; once ~45% is
   cleared the foil fades away and the message is fully revealed. */
const canvas = $("#scratchCanvas"), ctx = canvas.getContext("2d", { willReadFrequently: true });
let scratching = false, revealed = false, lastCheck = 0, W = 0, H = 0, dpr = 1;

let foilTotal = 1;
function heartPath(w, h) {           // same outline as the SVG clipPath, scaled to the canvas
  const P = new Path2D(), X = v => v * w, Y = v => v * h;
  P.moveTo(X(.5), Y(.95));
  P.bezierCurveTo(X(.5), Y(.95), X(.02), Y(.62), X(.02), Y(.3));
  P.bezierCurveTo(X(.02), Y(.12), X(.16), Y(.03), X(.3), Y(.03));
  P.bezierCurveTo(X(.41), Y(.03), X(.5), Y(.1), X(.5), Y(.2));
  P.bezierCurveTo(X(.5), Y(.1), X(.59), Y(.03), X(.7), Y(.03));
  P.bezierCurveTo(X(.84), Y(.03), X(.98), Y(.12), X(.98), Y(.3));
  P.bezierCurveTo(X(.98), Y(.62), X(.5), Y(.95), X(.5), Y(.95));
  P.closePath(); return P;
}
function opaqueCount() {             // sampled count of foil pixels still covering the card
  const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let n = 0; for (let i = 3; i < d.length; i += 4 * 40) if (d[i] >= 128) n++;
  return n;
}
// Shrinks the message text until it fits inside the heart (script fonts are wide)
function fitMessage() {
  const card = $("#card"), msg = $("#cardMsg"), h = card.clientHeight, last = msg.lastElementChild;  // (first two children are the shape floats)
  if (!h || !last) return;
  for (let s = card.clientWidth * .072; s >= card.clientWidth * .035; s -= .5) {
    msg.style.fontSize = s + "px";
    if (last.offsetTop + last.offsetHeight <= h * .74) break;
  }
}
function paintFoil() {
  const card = $("#card");
  fitMessage();
  W = card.clientWidth; H = card.clientHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.save(); ctx.clip(heartPath(W, H));
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#b8923f"); g.addColorStop(.3, "#f3dfa8"); g.addColorStop(.55, "#d4af6a"); g.addColorStop(.8, "#f6e7b8"); g.addColorStop(1, "#b8923f");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,.18)";
  for (let i = 0; i < 260; i++) ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2); // sparkle texture
  ctx.restore();
  ctx.fillStyle = "#7a5a1a"; ctx.textAlign = "center";
  ctx.font = "600 " + Math.round(W * .07) + "px 'Playfair Display',serif"; ctx.fillText("Made With Love", W / 2, H * .42);
  ctx.font = Math.round(W * .08) + "px serif"; ctx.fillText("❤ ❤ ❤", W / 2, H * .53);
  ctx.font = "italic " + Math.round(W * .038) + "px 'Cormorant Garamond',serif"; ctx.fillText("scratch here", W / 2, H * .61);
  foilTotal = Math.max(1, opaqueCount());
}
function pos(e) { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
function scratchAt(p) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath(); ctx.arc(p.x, p.y, 24, 0, Math.PI * 2); ctx.fill();
}
function checkProgress() {
  const now = performance.now();
  if (now - lastCheck < 150 || revealed) return;
  lastCheck = now;
  if (opaqueCount() / foilTotal < .55) finishScratch();   // ~45% of the heart scratched away
}
function finishScratch() {
  revealed = true;
  canvas.classList.add("gone");
  $("#hint").textContent = "💌 Your full letter is below, " + cfg.recipientName;
  $("#replayBtn").hidden = false;
  const letter = $("#scratchLetter");              // full letter slides in under the heart
  letter.hidden = false; letter.classList.add("in");
  setTimeout(() => letter.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }), 1100);
  burst(30);
}
let prev = null;
canvas.addEventListener("pointerdown", e => { if (revealed) return; scratching = true; canvas.setPointerCapture(e.pointerId); prev = pos(e); scratchAt(prev); e.preventDefault(); });
canvas.addEventListener("pointermove", e => {
  if (!scratching || revealed) return;
  const p = pos(e);
  // interpolate so fast swipes leave a continuous line
  const dx = p.x - prev.x, dy = p.y - prev.y, steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 8));
  for (let i = 1; i <= steps; i++) scratchAt({ x: prev.x + dx * i / steps, y: prev.y + dy * i / steps });
  prev = p; checkProgress(); e.preventDefault();
});
["pointerup", "pointercancel"].forEach(t => canvas.addEventListener(t, () => { scratching = false; checkProgress(); }));
$("#replayBtn").addEventListener("click", () => {
  revealed = false; canvas.classList.remove("gone"); paintFoil();
  $("#hint").textContent = "Use your finger to scratch the golden surface";
  $("#replayBtn").hidden = true; $("#scratchLetter").hidden = true; $("#scratchLetter").classList.remove("in");
});
let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if (!revealed && !scratching) paintFoil(); }, 250); });

/* ---------- FINAL BUTTON ---------- */
$("#foreverBtn").addEventListener("click", () => { $("#ending").hidden = false; burst(50); });
$("#closeEnd").addEventListener("click", () => { $("#ending").hidden = true; });

/* ---------- smooth in-page link ---------- */
document.querySelectorAll("[data-scroll]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault(); $(a.getAttribute("href")).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}));

/* ---------- init ---------- */
build();
initScrollReveal();
$("#openBtn").addEventListener("click", openCurtains);
$("#curtains").addEventListener("click", e => { if (e.target.closest(".curtain, .curtain-center")) openCurtains(); }); // tap anywhere on curtain
document.fonts && document.fonts.addEventListener && document.fonts.addEventListener("loadingdone", () => { if (!revealed && !scratching) paintFoil(); });
// Paint the foil once the stage is visible & fonts are ready (card needs real size)
const prepFoil = () => { paintFoil(); };
document.fonts && document.fonts.ready ? document.fonts.ready.then(() => setTimeout(prepFoil, 3400)) : setTimeout(prepFoil, 3400);
// Safety: also paint when the card scrolls into view the first time
new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting && !revealed && !scratching) { paintFoil(); o.disconnect(); } }), { threshold: .2 }).observe($("#card"));
