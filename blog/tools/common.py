"""Shared helpers: env-based DB connection, front matter, markdown."""
import os, re, json, datetime

def connect():
    import pymysql
    need = ["TIDB_HOST", "TIDB_USER", "TIDB_PASSWORD", "TIDB_DATABASE"]
    miss = [k for k in need if not os.environ.get(k)]
    if miss:
        raise SystemExit("missing env: " + ", ".join(miss))
    ca = os.environ.get("TIDB_CA")
    # TLS required; certificate and hostname verified (system CAs unless TIDB_CA given).
    ssl = {"ca": ca} if ca else {"ca": _system_ca()}
    return pymysql.connect(
        host=os.environ["TIDB_HOST"], port=int(os.environ.get("TIDB_PORT", "4000")),
        user=os.environ["TIDB_USER"], password=os.environ["TIDB_PASSWORD"],
        database=os.environ["TIDB_DATABASE"], charset="utf8mb4",
        ssl=ssl, ssl_verify_cert=True, ssl_verify_identity=True,
        cursorclass=pymysql.cursors.DictCursor)

def _system_ca():
    import ssl
    p = ssl.get_default_verify_paths()
    for c in (p.cafile, p.openssl_cafile, "/etc/ssl/certs/ca-certificates.crt", "/etc/ssl/cert.pem"):
        if c and os.path.exists(c):
            return c
    raise SystemExit("no system CA bundle found; set TIDB_CA")

def parse_front(text):
    """'---' key: value block, then body. tags: [a, b] or a, b."""
    meta, body = {}, text
    m = re.match(r"\A---\s*\n(.*?)\n---\s*\n?(.*)\Z", text, re.S)
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip().lower()] = v.strip()
        body = m.group(2)
    t = meta.get("tags", "").strip("[]")
    meta["tags"] = [x.strip() for x in t.split(",") if x.strip()]
    return meta, body

def parse_date(s):
    if not s:
        return None
    if isinstance(s, (datetime.datetime, datetime.date)):
        return s
    return datetime.datetime.fromisoformat(s)
