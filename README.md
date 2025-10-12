# 🚀 ETL-OSPC Hub — Open Source Portfolio Showcase

![Deploy Status](https://github.com/asmanmalik/ETL-OSPC-Hub/actions/workflows/pages.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/asmanmalik/ETL-OSPC-Hub)
![Contributors](https://img.shields.io/github/contributors/asmanmalik/ETL-OSPC-Hub)

---

<p align="center">
  <img src="assets/brand/banner-hero.svg" width="720" alt="ETL OSPC — Student Showcase" />
</p>

**ETL-OSPC Hub (Open Source Project Contributions Hub)** is a student-first, automation-powered portfolio site for the ETL OSPC community.  
It runs 100% on **GitHub Pages** (hosting) and **GitHub Actions** (automation).

> 🌐 Live site (after you push & enable Pages):  
> **https://asmanmalik.github.io/ETL-OSPC-Hub/**

---

## 🌟 Highlights

- 🧑‍💻 **People Directory** — students searchable by name, university, skills  
- 🧠 **Mentors Directory** — curated mentors with badges, expertise & affiliations  
- 🏅 **Hall of Fame** — reads `leaderboard.csv`, publishes monthly awards  
- 🤖 **Automations** — weekly JSON generation & badges, monthly Hall of Fame  
- 🎨 **ETL Brand** — colors, logo, smooth UI with gradient counters

---

## 🏗️ Architecture (How it Works)

```
Contributors / Mentors (Markdown)
        │
        ▼
Python scripts (GitHub Actions)
        │
        ▼
  data/*.json (people, mentors)
        │
        ▼
  docs/*.html + JS (dynamic UI on GitHub Pages)
```

- `/contributors/*.md` → parsed to `data/people.json`
- `/mentors/*.md` → parsed to `data/mentors.json`
- `/data/leaderboard.csv` → SVG badges + Hall of Fame HTML

---

## 📂 Folder Structure

```
ETL-OSPC-Hub/
├─ .github/workflows/      # GitHub Actions (deploy + weekly automations)
├─ assets/
│  ├─ brand/               # ETL logo + banner
│  └─ badges/              # Auto-generated SVG badges
├─ contributors/           # Student markdown profiles
├─ mentors/                # Mentor markdown profiles
├─ data/                   # JSON data + leaderboard.csv
├─ docs/                   # Website (served by GitHub Pages)
│  └─ assets/              # site CSS + JS
├─ scripts/                # Python generators
└─ README.md
```

---

## 🤖 Automations

| Workflow | Schedule | Purpose |
|---|---|---|
| `pages.yml` | on push | Deploys `/docs` to GitHub Pages |
| `generate-people.yml` | weekly | Builds `data/people.json` from `/contributors` |
| `generate-mentors.yml` | weekly | Builds `data/mentors.json` from `/mentors` |
| `generate-badges.yml` | weekly | Creates rank-colored SVG badges |
| `update-hall-of-fame.yml` | monthly | Rebuilds `docs/hall-of-fame.html` |

> Optional secret: set **METRICS_TOKEN** (PAT with `public_repo`, `workflow`) for metrics/badges.

---

## 🚀 Quick Start

1) **Create the repo**: `ETL-OSPC-Hub` on GitHub (public).  
2) **Upload** these files (or push via git).  
3) **Enable Pages** → Settings → Pages → Branch: `main` / Folder: `/docs`.  
4) Visit **https://asmanmalik.github.io/ETL-OSPC-Hub/** 🎉

---

## 🧑‍🎓 Add Your Profile (Students)

Create `/contributors/<your-github>.md`:

```md
# 🌟 Your Name
**University:** Your University  
**Skills:** Python, React, Git
```

Commit & push. The **Generate People Page** action will refresh `people.json` and your card will appear on `/people.html`.

---

## 🧑‍🏫 Add a Mentor

Create `/mentors/<mentor-handle>.md`:

```md
# 🌟 Mentor Name
**Role:** Role Title  
**Expertise:** Topic A, Topic B, Topic C  
**Affiliation:** Organization  
**GitHub:** handle
**Badges:** 🏅 Mentor Badge, 💬 Reviewer
**Bio:** Short one-paragraph bio.
```

Run the **Generate Mentors Page** action (or wait for the weekly run).

---

## 🏅 Hall of Fame

Update `data/leaderboard.csv` with ranks and PR counts.  
The **Update Hall of Fame** action rebuilds the HTML page monthly.

---

## 🧠 Tech Stack

- GitHub Pages (hosting)  
- GitHub Actions (automation)  
- Python 3.x (generators)  
- HTML + CSS + Vanilla JS (UI)  

---

## 🪪 License

MIT © ETL-Online — Empowering students through open-source collaboration.
