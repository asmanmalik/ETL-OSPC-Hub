# 🤝 Contributing to ETL-OSPC Hub

Welcome to **ETL-OSPC Hub** — an open-source portfolio platform by **ETL Online**!  
We’re thrilled you want to contribute. 🌟  
Whether you’re a student adding your first project, a mentor refining content, or a maintainer improving the codebase — you’re part of a growing global learning community.

---

## 📘 How to Contribute

### 1️⃣ Fork and Clone the Repository
```bash
git clone https://github.com/<your-username>/ETL-OSPC-Hub.git
cd ETL-OSPC-Hub
```

### 2️⃣ Create a New Branch
```bash
git checkout -b add-your-profile
```
Keep branches small and descriptive (e.g., `update-mentor-profile`, `fix-ui`, `add-badge-workflow`).

---

## 👩‍🎓 Adding Your Profile (Students)

1. Go to `/contributors/`
2. Copy the template file:
   ```
   contributors/_template.md
   ```
3. Rename it to your GitHub username (e.g., `contributors/jane-doe.md`)
4. Fill in your details:
   ```md
   # 🌟 Jane Doe
   **University:** FAST Lahore  
   **Skills:** Python, React, Git
   ```
5. Commit your changes:
   ```bash
   git add contributors/jane-doe.md
   git commit -m "Add Jane Doe contributor profile"
   git push origin add-your-profile
   ```

6. Submit a **Pull Request (PR)** to the main repo.

✅ Once approved, your profile will appear on the **People Page** automatically after the workflow runs.

---

## 🧑‍🏫 Adding a Mentor Profile

1. Go to `/mentors/`
2. Copy `_template.md`
3. Rename to your GitHub handle (e.g., `mentors/asma-malik.md`)
4. Fill out:
   ```md
   # 🌟 Asma Malik
   **Role:** Chief Mentor — Open Source Strategy  
   **Expertise:** Agile, Leadership, GitHub Ecosystem  
   **Affiliation:** ETL Online  
   **GitHub:** asma-malik  
   **Badges:** 🏅 Community Architect, 🚀 Open Source Evangelist  
   **Bio:** Leads the strategic growth of OSPC by bridging academia and industry.
   ```

5. Commit, push, and submit a PR.

---

## 🧠 Workflow and Automation

The following **GitHub Actions** keep ETL-OSPC Hub alive and automated:

| Workflow | Purpose | Schedule |
|-----------|----------|-----------|
| `generate-people.yml` | Builds student JSON from `/contributors` | Weekly |
| `generate-mentors.yml` | Builds mentor JSON from `/mentors` | Weekly |
| `generate-badges.yml` | Creates SVG badges from leaderboard | Weekly |
| `update-hall-of-fame.yml` | Refreshes Hall of Fame | Monthly |
| `pages.yml` | Deploys website | On push |

💡 No need to run these manually — GitHub does it for you!

---

## 🧩 Code and Design Contributions

- Make sure your HTML, CSS, or JS changes are tested locally (`docs/` folder).
- Keep design aligned with ETL brand colors:
  - Purple: `#5A2D82`
  - Teal: `#00B3B8`
  - Background: `#0E0E12`
- Use consistent markdown and indentation.
- Avoid uploading large files or binaries.

---

## 🧰 Tools and Setup

| Tool | Purpose |
|------|----------|
| VS Code | Recommended editor |
| Python 3.x | For scripts in `/scripts/` |
| GitHub Pages | Hosting |
| GitHub Actions | Automation |
| Markdown | Contributor & Mentor profiles |

---

## 💬 Communication

- For questions or feedback: open a **Discussion** or **Issue**.
- Respect the ETL code of conduct: Be kind, collaborative, and constructive.
- For urgent fixes or repo permissions, contact **@asma-malik** or ETL OSPC admins.

---

## 🪪 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

> 🌍 *“Learn. Build. Share. Repeat.” — ETL OSPC Team*
