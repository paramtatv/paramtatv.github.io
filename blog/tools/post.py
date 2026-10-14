#!/usr/bin/env python3
"""post.py new FILE.md [--publish] | publish SLUG | unpublish SLUG. Env: TIDB_*."""
import sys, json, argparse, datetime
sys.path.insert(0, __import__("os").path.dirname(__file__))
from common import connect, parse_front, parse_date

SLUG_OK = __import__("re").compile(r"^[a-z0-9][a-z0-9-]{0,118}$")

RESERVED = {"hi", "sa", "en", "assets", "tools"}

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    n = sub.add_parser("new"); n.add_argument("file"); n.add_argument("--publish", action="store_true")
    for c in ("publish", "unpublish"):
        sub.add_parser(c).add_argument("slug")
    a = ap.parse_args()
    db = connect()
    with db.cursor() as cur:
        if a.cmd == "new":
            meta, body = parse_front(open(a.file, encoding="utf-8").read())
            slug, title = meta.get("slug", ""), meta.get("title", "")
            lang = meta.get("lang", "")
            if lang not in ("hi", "sa", "en"):
                sys.exit("front matter needs lang: hi|sa|en")
            if slug in RESERVED:
                sys.exit("reserved slug")
            if not SLUG_OK.match(slug) or not title:
                sys.exit("front matter needs title and slug [a-z0-9-]")
            pub = a.publish or meta.get("status") == "published"
            when = (parse_date(meta.get("published_at")) or datetime.datetime.utcnow()) if pub else None
            cur.execute(
                "INSERT INTO posts (slug,title,body_md,author,tags,status,published_at,lang,translation_of) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) "
                "ON DUPLICATE KEY UPDATE title=VALUES(title), body_md=VALUES(body_md), "
                "author=VALUES(author), tags=VALUES(tags), lang=VALUES(lang), translation_of=VALUES(translation_of)",
                (slug, title, body, meta.get("author", ""), json.dumps(meta["tags"]),
                 "published" if pub else "draft", when, lang, meta.get("translation_of") or None))
        elif a.cmd == "publish":
            cur.execute("UPDATE posts SET status='published', published_at=COALESCE(published_at,NOW()) WHERE slug=%s", (a.slug,))
        else:
            cur.execute("UPDATE posts SET status='draft' WHERE slug=%s", (a.slug,))
        print("rows:", cur.rowcount)
    db.commit()

if __name__ == "__main__":
    main()
