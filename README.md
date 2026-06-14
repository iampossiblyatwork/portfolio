# James Costello — Portfolio

A static showcase site for selected projects. Plain HTML/CSS/JS — no build step.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | All styling (light/dark themes via CSS variables) |
| `app.js` | **Project data** + interactions (theme toggle, scroll reveal) |
| `render.yaml` | Render static-site blueprint |

## Editing projects
All project content lives in the `projects` array at the top of **`app.js`**.
Each entry:

```js
{
  title:  "Project Name",
  status: "live" | "public" | "private",
  desc:   "One or two sentences.",
  tags:   ["Python", "Flask"],
  links:  [{ label: "GitHub", url: "https://..." }]  // omit for private repos
}
```

## Run locally
```bash
cd ~/portfolio
python3 -m http.server 4173
# open http://localhost:4173
```

## Deploy to Render
1. Push this folder to a GitHub repo.
2. In Render: **New → Static Site** → connect the repo.
   - Build command: *(leave empty)*
   - Publish directory: `.`
   - (Or use the included `render.yaml` via **New → Blueprint**.)
3. Render gives you a free `*.onrender.com` URL; add a custom domain anytime.

## To verify
- [ ] Confirm/replace descriptions for private projects (Dividend Optimizer, RentCast Analyzer).
- [ ] Decide how to attribute **Career-Ops** (self-hosted / fork) or remove it.
- [ ] Add **Live** links as more apps go online. Mark always-on links with `cold: false`
      (like gate-time.net) so they skip the free-tier wake-up warning.
- [ ] After deploy, set `portfolio_url` in career-ops `config/profile.yml` to this site.
