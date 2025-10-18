#!/usr/bin/env python3
import csv, pathlib, html
ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "doc/data" / "leaderboard.csv"
BADGES = ROOT / "assets" / "badges"
CONTRIB = ROOT / "contributors"
BADGES.mkdir(parents=True, exist_ok=True)
def rank_color(rank):
    if rank <= 3: return "#DAA520"
    if rank <= 7: return "#C0C0C0"
    if rank <= 10: return "#CD7F32"
    return "#00B3B8"
def shield_svg(left, right, color):
    left = html.escape(left); right = html.escape(right)
    lw = 6*len(left) + 20; rw = 6*len(right) + 20; total = lw+rw
    return f"<svg xmlns='http://www.w3.org/2000/svg' width='{total}' height='20'><mask id='m'><rect width='{total}' height='20' rx='3' fill='#fff'/></mask><g mask='url(#m)'><rect width='{lw}' height='20' fill='#555'/><rect x='{lw}' width='{rw}' height='20' fill='{color}'/></g><g fill='#fff' text-anchor='start' font-family='DejaVu Sans,Verdana,Geneva,sans-serif' font-size='11'><text x='6' y='14'>{left}</text><text x='{lw+6}' y='14'>{right}</text></g></svg>"
def ensure(username, rank, prs):
    (BADGES / f"{username}.svg").write_text(shield_svg("Top Contributor", f"{prs} PRs", rank_color(rank)), encoding="utf-8")
def inject(username):
    md = CONTRIB / f"{username}.md"
    if not md.exists(): return
    badge = f"![Top Contributor](../assets/badges/{username}.svg)"
    t = md.read_text(encoding="utf-8")
    if badge in t: return
    lines = t.splitlines()
    if lines and lines[0].startswith('#'):
        lines.insert(1,''); lines.insert(2,badge)
    else:
        lines = [badge,''] + lines
    md.write_text('\\n'.join(lines), encoding='utf-8')
rows = list(csv.DictReader(DATA.open(encoding='utf-8')))
for r in rows:
    u = r['github'].strip(); ensure(u,int(r['rank']),int(r['prs'])); inject(u)
