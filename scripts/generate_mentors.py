#!/usr/bin/env python3
import json, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
MENTORS = ROOT / "mentors"; DATA = ROOT / "data"
def parse(md):
    name = re.search(r'^\s*#\s+(.+)$', md, flags=re.M); name = name.group(1).strip() if name else "Unknown"
    role = re.search(r'\*\*Role:\*\*\s*([^\n\r]+)', md); role = role.group(1).strip() if role else ""
    ex = re.search(r'\*\*Expertise:\*\*\s*([^\n\r]+)', md); line = ex.group(1).strip() if ex else ""
    skills = [x.strip() for x in re.split(r'[,\|]', line) if x.strip()]
    aff = re.search(r'\*\*Affiliation:\*\*\s*([^\n\r]+)', md); aff = aff.group(1).strip() if aff else ""
    gh = re.search(r'\*\*GitHub:\*\*\s*([^\n\r]+)', md); gh = gh.group(1).strip() if gh else ""
    badges = re.search(r'\*\*Badges:\*\*\s*([^\n\r]+)', md); bline = badges.group(1).strip() if badges else ""
    blist = [x.strip() for x in bline.split(',') if x.strip()]
    bio = re.search(r'\*\*Bio:\*\*\s*([^\n\r]+)', md); bio = bio.group(1).strip() if bio else ""
    return name, role, skills, aff, gh, blist, bio
out=[]; 
for p in sorted(MENTORS.glob("*.md")):
    t = p.read_text(encoding="utf-8", errors="ignore")
    name, role, skills, aff, gh, badges, bio = parse(t)
    out.append({"name":name,"github":gh or p.stem,"role":role,"expertise":skills,"affiliation":aff,"badges":badges,"bio":bio})
(DATA/"mentors.json").write_text(json.dumps(out, indent=2), encoding="utf-8")
