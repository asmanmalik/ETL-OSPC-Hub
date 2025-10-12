#!/usr/bin/env python3
import json, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
CONTRIB = ROOT / "contributors"; DATA = ROOT / "data"
def parse(md):
    name = re.search(r'^\s*#\s+(.+)$', md, flags=re.M); name = name.group(1).strip() if name else "Unknown"
    u = re.search(r'\*\*University:\*\*\s*([^\n\r]+)', md); uni = u.group(1).strip() if u else ""
    s = re.search(r'\*\*Skills:\*\*\s*([^\n\r]+)', md); line = s.group(1).strip() if s else ""
    skills = [x.strip() for x in re.split(r'[,\|]', line) if x.strip()]
    return name, uni, skills
out=[]; 
for p in sorted(CONTRIB.glob("*.md")):
    t = p.read_text(encoding="utf-8", errors="ignore")
    name, uni, skills = parse(t)
    out.append({"name":name,"github":p.stem,"university":uni,"skills":skills})
(DATA/"people.json").write_text(json.dumps(out, indent=2), encoding="utf-8")
