# Paramtatv blog — design (draft for owner OK; nothing executed, no DB touched)

## Schema (`blog/schema.sql`, table `posts`)
id, slug UNIQUE, title, body_md, lang ENUM('hi','sa','en') NOT NULL, translation_of (slug of source post, NULL if original),
author, tags JSON, status ENUM(draft,published), published_at, created_at, updated_at.
- tags as JSON, not a join table: only ever rendered per post, no tag queries needed; a join can be added later.
- translation_of is a plain slug (no FK): versions group by `translation_of or slug`; each post page links the other languages.
- slugs `hi sa en assets tools` are reserved (they are index directories); post.py and build.py both refuse them.

## Build (static; the page never touches the DB)
`blog/tools/build.py` reads `status='published' AND published_at<=NOW()`, renders Markdown, writes into `blog/`.
- Path A only (owner 2026-10-14): local build on the owner's machine; no CI, no repo secrets.
  Credentials are read from the owner's gitignored creds file into the build process's env only (never printed);
  review the diff, then commit + push gh-pages.
- Offline test: `build.py --from-dir blog/tools/sample-posts` (front matter only, no DB).
- Deps: `blog/tools/requirements.txt` (pymysql, markdown).

## Authoring
`blog/tools/post.py new file.md [--publish]` upserts by slug from front matter
(title, slug, lang, translation_of, author, tags, published_at, status); `publish SLUG` / `unpublish SLUG` flip status. All SQL parameterised.

## Rendered layout (URLs under https://paramtatv.github.io/blog/)
- `blog/index.html` all posts; `blog/hi/`, `blog/sa/`, `blog/en/` per-language indexes (static). Filter bar =
  plain links to these four pages; JS only remembers the last choice in localStorage (try/catch) and, from the All index,
  forwards once to it. No JS: links still work.
- `blog/<slug>/index.html`: `<html lang>` = post lang; hi/sa use Noto Serif Devanagari -> Tiro Devanagari -> system fallbacks;
  links to other-language versions of the same post.
- `blog/feed.xml` Atom. `blog/assets/blog.css` reuses site palette (ground #FBF8F3, madder #A8351C), Spectral, Tiro Devanagari, IBM Plex Mono; dark via the site's `data-theme` (`/assets/theme.js`).

## Security
- No credentials in repo, browser, or logs: env/secrets only; the generated HTML contains no DB info; `.env*` and `blog/.env.local` gitignored.
- TLS required, cert + hostname verified (system CAs, or TIDB_CA). Build and authoring run only on the owner's machine.
- Parameterised SQL everywhere; no string-built queries.
- Markdown output passes an allowlist sanitiser (no script/style/iframe, no on* attributes, only http(s)/mailto/relative URLs); titles/tags/slugs HTML-escaped.

## Owner rulings 2026-10-14
Schema approved; path A only; Blog link in main nav; excerpts drop headings.

## Real-DB step 2026-10-14: BLOCKED
CREATE TABLE posts was refused (error 1142, CREATE denied). The creds file's DATABASE is a system schema, and the user lacks ALL PRIVILEGES.
Owner action: create a database for the blog (e.g. `paramtatv_blog`), grant this user CREATE/SELECT/INSERT/UPDATE on it, and set DATABASE in tidbcloud.md. Nothing has been written to the DB.
