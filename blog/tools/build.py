#!/usr/bin/env python3
"""Render published posts to static HTML under blog/. Source: TiDB (env TIDB_*) or --from-dir."""
import sys, os, re, json, glob, argparse, datetime, html
from html.parser import HTMLParser
from xml.sax.saxutils import escape as xesc
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import parse_front, parse_date

LANGS = [("all", "All", "en"), ("hi", "हिन्दी", "hi"), ("sa", "संस्कृतम्", "sa"), ("en", "English", "en")]
SITE = "https://paramtatv.github.io"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # blog/

ALLOW = {"p","br","hr","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","pre","code",
         "em","strong","a","img","table","thead","tbody","tr","th","td","del","sup","sub","span","div"}
ATTRS = {"a": {"href","title"}, "img": {"src","alt","title"}, "code": {"class"}, "span": {"class"}, "div": {"class"}}
VOID = {"br","hr","img"}
SAFE_URL = re.compile(r"^(https?:|mailto:|/|#|\.|[A-Za-z0-9_-]+(/|$))", re.I)

class Sanitizer(HTMLParser):
    """Allowlist sanitiser: drops unknown tags (keeps text), script/style content, on* attrs, js: URLs."""
    def __init__(self):
        super().__init__(convert_charrefs=True); self.out = []; self.skip = 0
    def handle_starttag(self, t, attrs):
        if t in ("script", "style", "iframe", "object"): self.skip += 1; return
        if self.skip or t not in ALLOW: return
        a = []
        for k, v in attrs:
            if k not in ATTRS.get(t, ()) or v is None: continue
            if k in ("href", "src") and not SAFE_URL.match(v.strip()): continue
            a.append(f' {k}="{html.escape(v, quote=True)}"')
        self.out.append(f"<{t}{''.join(a)}>")
    def handle_endtag(self, t):
        if t in ("script", "style", "iframe", "object"): self.skip = max(0, self.skip - 1); return
        if not self.skip and t in ALLOW and t not in VOID: self.out.append(f"</{t}>")
    def handle_data(self, d):
        if not self.skip: self.out.append(html.escape(d, quote=False))


def excerpt(h, n=200):
    """Plain-text summary: drop headings, keep block text separated, cut at a word."""
    h = re.sub(r"<h[1-6][^>]*>.*?</h[1-6]>", " ", h, flags=re.S)
    h = re.sub(r"</(p|li|blockquote|pre|tr)>", " ", h)
    t = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", h))).strip()
    return t if len(t) <= n else t[:n].rsplit(" ", 1)[0] + "…"

def render_md(md):
    import markdown
    s = Sanitizer(); s.feed(markdown.markdown(md, extensions=["fenced_code", "tables", "sane_lists"])); s.close()
    return "".join(s.out)

def load_dir(d):
    posts = []
    for f in sorted(glob.glob(os.path.join(d, "*.md"))):
        meta, body = parse_front(open(f, encoding="utf-8").read())
        if meta.get("status", "published") != "published": continue
        slug = meta.get("slug") or os.path.splitext(os.path.basename(f))[0]
        posts.append(dict(slug=slug, title=meta.get("title", slug), body_md=body, author=meta.get("author", ""),
                          tags=meta["tags"], lang=meta.get("lang","en"), translation_of=meta.get("translation_of") or None, published_at=parse_date(meta.get("published_at")) or datetime.datetime.now(),
                          updated_at=None))
    return posts

def load_db():
    from common import connect
    db = connect()
    with db.cursor() as c:
        c.execute("SELECT slug,title,lang,translation_of,body_md,author,tags,published_at,updated_at FROM posts "
                  "WHERE status='published' AND published_at IS NOT NULL AND published_at<=NOW() "
                  "ORDER BY published_at DESC")
        rows = c.fetchall()
    for r in rows:
        t = r["tags"]; r["tags"] = json.loads(t) if isinstance(t, (str, bytes)) else (t or [])
    return rows

def page(title, desc, body, depth, canon, lang="en"):
    up = "../" * (depth - 1)  # depth: 1 = blog/, 2 = blog/<x>/
    e = html.escape
    return f"""<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title><meta name="description" content="{e(desc, quote=True)}">
<link rel="canonical" href="{SITE}{canon}">
<link rel="alternate" type="application/atom+xml" href="{SITE}/blog/feed.xml">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;600&family=Spectral:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Tiro+Devanagari+Sanskrit&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="icon" href="/assets/favicon.ico" sizes="any">
<link rel="stylesheet" href="{up}assets/blog.css">
<script src="/assets/theme.js"></script></head>
<body><header class="bh"><div class="bw"><a class="brand" href="/"><span class="deva">परमतत्त्वम्</span> Paramtatv</a>
<span class="mark" aria-hidden="true">॥</span><a href="{up or './'}">Blog</a><a href="{up}feed.xml">Feed</a></div></header>
<main class="bw" lang="{lang}">{body}</main></body></html>
"""

def fmt(d): return d.strftime("%Y-%m-%d") if d else ""

def lang_nav(active, depth):
    up = "../" * depth
    hrefs = {"all": up or "./", "hi": up + "hi/", "sa": up + "sa/", "en": up + "en/"}
    return '<nav class="langs" aria-label="Language">' + "".join(
        f'<a href="{hrefs[k]}" data-lang="{k}" lang="{lc}"' + (' aria-current="page"' if k == active else "") + f'>{html.escape(n)}</a>'
        for k, n, lc in LANGS) + "</nav>"

# JS only enhances: remembers the choice and, on the All index, redirects to it once.
FILTER_JS = """<script>(function(){var K='blog-lang',s;try{
document.querySelectorAll('.langs a').forEach(function(a){a.addEventListener('click',function(){try{localStorage.setItem(K,a.dataset.lang)}catch(e){}})});
var cur=document.querySelector('.langs a[aria-current]');
if(cur&&cur.dataset.lang==='all'&&document.body.dataset.index){try{s=localStorage.getItem(K)}catch(e){}
var t=s&&s!=='all'&&document.querySelector('.langs a[data-lang="'+s+'"]');if(t)location.replace(t.href)}}catch(e){}})();</script>"""

def build(posts, out):
    os.makedirs(out, exist_ok=True)
    groups = {}
    for p in posts:
        groups.setdefault(p["translation_of"] or p["slug"], []).append(p)
    LN = {k: n for k, n, _ in LANGS}
    cards = {}
    for p in posts:
        p["html"] = render_md(p["body_md"])
        tags = "".join(f'<span class="tag">{html.escape(t)}</span>' for t in p["tags"])
        meta = f'<p class="meta"><time datetime="{fmt(p["published_at"])}">{fmt(p["published_at"])}</time>' + \
               (f' · {html.escape(p["author"])}' if p["author"] else "") + f' {tags}</p>'
        others = [q for q in groups[p["translation_of"] or p["slug"]] if q is not p]
        tr = ""
        if others:
            tr = '<p class="trans">' + " ".join(
                f'<a href="../{html.escape(q["slug"])}/" hreflang="{q["lang"]}" lang="{q["lang"]}">{html.escape(LN[q["lang"]])}</a>'
                for q in others) + "</p>"
        body = f'<article><h1>{html.escape(p["title"])}</h1>{meta}{tr}<div class="post">{p["html"]}</div></article>'
        d = os.path.join(out, p["slug"]); os.makedirs(d, exist_ok=True)
        p["summary"] = excerpt(p["html"])
        open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(
            page(p["title"] + " — Paramtatv", p["summary"], body, 2, f"/blog/{p['slug']}/", p["lang"]))
        cards[p["slug"]] = (f'<li lang="{p["lang"]}"><a href="{{R}}{html.escape(p["slug"])}/">{html.escape(p["title"])}</a>'
                            f'<time>{fmt(p["published_at"])}</time><p>{html.escape(p["summary"])}</p></li>')
    # four index pages: blog/ (all) and blog/{hi,sa,en}/ (static; JS only enhances the filter)
    for key, label, _ in LANGS:
        sel = [p for p in posts if key == "all" or p["lang"] == key]
        depth = 1 if key == "all" else 2
        items = "".join(cards[p["slug"]].replace("{R}", "" if key == "all" else "../") for p in sel)
        lst = "<h1>Blog</h1>" + lang_nav(key, depth - 1) + (f'<ul class="list">{items}</ul>' if items else "<p>No posts yet.</p>")
        lst = lst.replace("<h1>", "<h1>", 1)
        d = out if key == "all" else os.path.join(out, key)
        os.makedirs(d, exist_ok=True)
        pg = page("Blog — Paramtatv", "Notes from Paramtatva", lst, depth, "/blog/" + ("" if key == "all" else key + "/"),
                  "en" if key == "all" else key)
        pg = pg.replace("<body>", "<body data-index=\"1\">" if key == "all" else "<body>").replace("</main>", "</main>" + FILTER_JS)
        open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(pg)
    now = max([p["published_at"] for p in posts], default=datetime.datetime.now()).strftime("%Y-%m-%dT%H:%M:%SZ")
    ent = "".join(
        f'<entry><title>{xesc(p["title"])}</title><link href="{SITE}/blog/{xesc(p["slug"])}/"/>'
        f'<id>{SITE}/blog/{xesc(p["slug"])}/</id><updated>{p["published_at"].strftime("%Y-%m-%dT%H:%M:%SZ")}</updated>'
        f'<summary xml:lang="{p["lang"]}">{xesc(p["summary"])}</summary></entry>' for p in posts)
    open(os.path.join(out, "feed.xml"), "w", encoding="utf-8").write(
        f'<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom"><title>Paramtatv Blog</title>'
        f'<link href="{SITE}/blog/feed.xml" rel="self"/><link href="{SITE}/blog/"/><id>{SITE}/blog/</id>'
        f'<updated>{now}</updated>{ent}</feed>\n')

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--from-dir", help="offline: render *.md from this dir instead of the DB")
    ap.add_argument("--out", default=ROOT)
    a = ap.parse_args()
    posts = load_dir(a.from_dir) if a.from_dir else load_db()
    bad = [p["slug"] for p in posts if p["slug"] in ("hi", "sa", "en", "assets", "tools") or p.get("lang") not in ("hi", "sa", "en")]
    if bad:
        sys.exit("reserved slug or bad lang: " + ", ".join(bad))
    posts.sort(key=lambda p: p["published_at"], reverse=True)
    build(posts, a.out)
    print(f"built {len(posts)} post(s) -> {a.out}")

if __name__ == "__main__":
    main()
