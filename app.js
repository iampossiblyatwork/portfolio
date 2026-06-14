/* =========================================================
   James Costello — Portfolio
   Project data + interactions
   =========================================================

   EDIT YOUR PROJECTS HERE.
   - status:  "live" | "public" | "private"
   - links:   array of { label, url }.  Omit/empty for none.
   - For private repos, leave the GitHub link out (visitors get a 404).
*/

const projects = [
  {
    title: "Gate Time",
    status: "live",
    desc: "A free web tool that tells you exactly when to leave for the airport — working backward from boarding time through drive, parking, check-in, security, and a personal buffer. Real road routing via OpenRouteService, calendar (.ics) export, and shareable links. No signup, runs in-browser.",
    tags: ["JavaScript", "OpenRouteService", "Geolocation", ".ics Export"],
    links: [
      { label: "Visit gate-time.net", url: "https://gate-time.net", cold: false }
    ]
  },
  {
    title: "Real-Estate Market Analyzer",
    status: "public",
    desc: "A Flask web app powered by the RentCast API. Runs market analysis, geofence-based property search, rent/price heat maps, and SMS alerts when a listing matches your criteria.",
    tags: ["Python", "Flask", "RentCast API", "Geospatial", "Twilio"],
    links: [
      { label: "GitHub", url: "https://github.com/iampossiblyatwork/housing-analyzer" }
      // { label: "Live", url: "https://your-app.onrender.com" }  // add when deployed
    ]
  },
  {
    title: "EMBA ROI Calculator",
    status: "public",
    desc: "An interactive calculator that models the return on investment of the Michigan State Executive MBA — tuition, opportunity cost, and projected salary lift over time.",
    tags: ["JavaScript", "Finance", "Modeling"],
    links: [
      { label: "GitHub", url: "https://github.com/iampossiblyatwork/EMBA_ROI" }
    ]
  },
  {
    title: "Dividend Optimizer",
    status: "private",
    desc: "A portfolio tool that optimizes a dividend-income strategy — balancing yield, growth, and concentration risk across holdings to maximize sustainable cash flow.",
    tags: ["Python", "pandas", "Optimization"],
    links: [] // private repo — add a Live link if/when deployed
  },
  {
    title: "RentCast Analyzer",
    status: "private",
    desc: "An analysis toolkit built on RentCast data — the data-crunching companion to the Market Analyzer, for deeper offline modeling of rental markets.",
    tags: ["Python", "RentCast API", "Analytics"],
    links: []
  },
];

/* ---------- render cards ---------- */
const grid = document.getElementById("projectGrid");

grid.innerHTML = projects.map((p, i) => {
  const num = String(i + 1).padStart(2, "0");
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  // A link is "cold" (free-tier, may need ~1 min to wake) UNLESS it's a GitHub
  // repo link or explicitly marked always-on with `cold: false` (e.g. gate-time.net).
  const isGitHub = (l) => /github\.com/i.test(l.url || "") || /github/i.test(l.label || "");
  const isCold = (l) => l.cold !== false && !isGitHub(l);
  const links = (p.links && p.links.length)
    ? p.links.map(l => {
        const tip = isCold(l) ? ' title="Hosted on Render&rsquo;s free tier — first load can take ~1 min to wake up."' : "";
        return `<a class="card-link" href="${l.url}" target="_blank" rel="noopener"${tip}>${l.label}<span class="arrow">↗</span></a>`;
      }).join("")
    : `<span class="card-link muted">Private repository</span>`;
  const hasCold = (p.links || []).some(isCold);
  const coldNote = hasCold
    ? `<p class="cold-note">↻ Free hosting — the live app may take ~1&nbsp;min to wake on first load.</p>`
    : "";
  const badgeLabel = { live: "Live", public: "Public", private: "Private" }[p.status] || p.status;

  return `
    <article class="card" data-reveal style="transition-delay:${(i % 2) * 80}ms">
      <div class="card-top">
        <span class="card-num">${num}</span>
        <span class="badge ${p.status}">${badgeLabel}</span>
      </div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="tags">${tags}</div>
      <div class="card-links">${links}</div>
      ${coldNote}
    </article>`;
}).join("");

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
