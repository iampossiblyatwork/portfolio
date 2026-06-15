/* =========================================================
   James Costello — Portfolio
   Project data + interactions
   =========================================================

   EDIT YOUR PROJECTS HERE.
   - status:    "live" | "public" | "private"
   - strength:  "technical" | "business" | "data"
                (which résumé strength the project leans on — drives the chip)
   - image:     screenshot path for LIVE apps shown in the showcase. Drop the
                file in /assets and reference it here. Falls back to a labeled
                placeholder if the file is missing.
   - links:     array of { label, url }.  Omit/empty for none.
   - For private repos, leave the GitHub link out (visitors get a 404).
*/

const STRENGTHS = {
  technical: "Technical & Metrology",
  business:  "Business & Finance",
  data:      "Data & Automation",
};

const projects = [
  {
    title: "Gate Time",
    status: "live",
    strength: "data",
    image: "assets/gate-time.png",
    desc: "A free web tool that tells you exactly when to leave for the airport — working backward from boarding time through drive, parking, check-in, security, and a personal buffer. Real road routing via OpenRouteService, calendar (.ics) export, and shareable links. No signup, runs in-browser.",
    tags: ["JavaScript", "OpenRouteService", "Geolocation", ".ics Export"],
    links: [
      { label: "Visit gate-time.net", url: "https://gate-time.net", cold: false }
    ]
  },
  {
    title: "Surface Finish — Pocket Dictionary",
    status: "live",
    strength: "technical",
    image: "assets/surface-finish.png",
    desc: "An interactive reference tool for machined surface finishes — covering 12 standard roughness parameters (Ra, Rz, Rq, and more), 13 manufacturing processes with real-time trace visualization, side-by-side comparisons, and unit conversion between µm and µin. Grounded in ISO 4287, ASME B46.1, and ISO 1302.",
    tags: ["React", "TypeScript", "Vite", "Canvas", "Metrology"],
    links: [
      { label: "Visit surfacefinish.onrender.com", url: "https://surfacefinish.onrender.com/" }
    ]
  },
  {
    title: "EMBA ROI Calculator",
    status: "live",
    strength: "business",
    image: "assets/emba-roi.png",
    desc: "An interactive calculator that models the return on investment of the Michigan State Executive MBA — tuition, opportunity cost, and projected salary lift over time.",
    tags: ["JavaScript", "Finance", "Modeling"],
    links: [
      { label: "Visit emba-roi.onrender.com", url: "https://emba-roi.onrender.com" },
      { label: "GitHub", url: "https://github.com/iampossiblyatwork/EMBA_ROI" }
    ]
  },
  {
    title: "Dividend Optimizer",
    status: "private",
    strength: "business",
    desc: "A portfolio tool that optimizes a dividend-income strategy — balancing yield, growth, and concentration risk across holdings to maximize sustainable cash flow.",
    tags: ["Python", "pandas", "Optimization"],
    links: [] // private repo — add a Live link if/when deployed
  },
  {
    title: "Real-Estate Market Analyzer",
    status: "public",
    strength: "data",
    desc: "A Flask web app powered by the RentCast API. Runs market analysis, geofence-based property search, rent/price heat maps, and SMS alerts when a listing matches your criteria.",
    tags: ["Python", "Flask", "RentCast API", "Geospatial", "Twilio"],
    links: [
      { label: "GitHub", url: "https://github.com/iampossiblyatwork/housing-analyzer" }
      // { label: "Live", url: "https://your-app.onrender.com" }  // add when deployed
    ]
  },
  {
    title: "RentCast Analyzer",
    status: "private",
    strength: "data",
    desc: "An analysis toolkit built on RentCast data — the data-crunching companion to the Market Analyzer, for deeper offline modeling of rental markets.",
    tags: ["Python", "RentCast API", "Analytics"],
    links: []
  },
];

/* ---------- shared bits ---------- */
// A link is "cold" (free-tier, may need ~1 min to wake) UNLESS it's a GitHub
// repo link or explicitly marked always-on with `cold: false` (e.g. gate-time.net).
const isGitHub = (l) => /github\.com/i.test(l.url || "") || /github/i.test(l.label || "");
const isCold = (l) => l.cold !== false && !isGitHub(l);
const badgeLabel = (p) => ({ live: "Live", public: "Public", private: "Private" }[p.status] || p.status);
const tagsHtml = (p) => p.tags.map(t => `<span class="tag">${t}</span>`).join("");
const strengthChip = (p) => `<span class="strength ${p.strength}">${STRENGTHS[p.strength]}</span>`;
const linksHtml = (p) => (p.links && p.links.length)
  ? p.links.map(l => {
      const tip = isCold(l) ? ' title="Hosted on Render&rsquo;s free tier — first load can take ~1 min to wake up."' : "";
      return `<a class="card-link" href="${l.url}" target="_blank" rel="noopener"${tip}>${l.label}<span class="arrow">↗</span></a>`;
    }).join("")
  : `<span class="card-link muted">Private repository</span>`;
const coldNoteHtml = (p) => (p.links || []).some(isCold)
  ? `<p class="cold-note">↻ Free hosting — the live app may take ~1&nbsp;min to wake on first load.</p>`
  : "";

/* ---------- showcase: live, deployed apps ---------- */
const live = projects.filter(p => p.status === "live");
document.getElementById("showcase").innerHTML = live.map((p, i) => `
  <article class="showcase${i % 2 ? " flip" : ""}" data-reveal>
    <div class="showcase-media" data-label="${p.title}">
      <span class="live-pill"><span class="live-dot"></span> Live</span>
      ${p.image ? `<img src="${p.image}" alt="Screenshot of ${p.title}" loading="lazy" onerror="this.remove()" />` : ""}
    </div>
    <div class="showcase-body">
      ${strengthChip(p)}
      <h3 class="showcase-title">${p.title}</h3>
      <p class="showcase-desc">${p.desc}</p>
      <div class="tags">${tagsHtml(p)}</div>
      <div class="card-links">${linksHtml(p)}</div>
      ${coldNoteHtml(p)}
    </div>
  </article>`).join("");

/* ---------- list: everything else, grouped by strength ---------- */
const order = { business: 0, data: 1, technical: 2 };
const rest = projects
  .filter(p => p.status !== "live")
  .sort((a, b) => order[a.strength] - order[b.strength]);
document.getElementById("projectList").innerHTML = rest.map(p => `
  <article class="plist-item" data-reveal>
    <div class="plist-main">
      <h3 class="plist-title">${p.title} <span class="badge ${p.status}">${badgeLabel(p)}</span></h3>
      <p class="plist-desc">${p.desc}</p>
      <div class="tags">${tagsHtml(p)}</div>
    </div>
    <div class="plist-side">
      ${strengthChip(p)}
      <div class="card-links">${linksHtml(p)}</div>
    </div>
  </article>`).join("");

/* ---------- theme toggle ---------- */
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

/* ---------- nav border on scroll ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
