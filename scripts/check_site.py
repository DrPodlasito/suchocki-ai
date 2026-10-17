"""Validate the generated site without network access or third-party packages."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1] / "dist"
ORIGIN = "https://michalsuchocki.com"


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.refs = []
        self.alternates = {}
        self.headings = self.mains = 0
        self.lang = self.canonical = None
        self.noindex = False
        self.jsonld = []
        self.in_jsonld = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "html":
            self.lang = attrs.get("lang")
        self.headings += tag == "h1"
        self.mains += tag == "main"
        for key in ("href", "src"):
            if key in attrs:
                self.refs.append(attrs[key])
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "link" and attrs.get("hreflang"):
            self.alternates[attrs["hreflang"]] = attrs.get("href")
        if tag == "meta" and attrs.get("property") == "og:image":
            self.refs.append(attrs.get("content", ""))
        if tag == "meta" and attrs.get("name") == "robots":
            self.noindex = "noindex" in attrs.get("content", "")
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_jsonld = True

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_jsonld = False

    def handle_data(self, data):
        if self.in_jsonld:
            self.jsonld.append(data)


def route(path):
    relative = path.relative_to(ROOT).as_posix()
    return "/" + relative.removesuffix("index.html") if relative.endswith("index.html") else "/" + relative


def target_file(path):
    target = ROOT / unquote(path).lstrip("/")
    return target / "index.html" if target.is_dir() else target


def main():
    files = sorted(ROOT.rglob("*.html"))
    if not files:
        raise SystemExit("No HTML output found; run npm run build first.")
    pages = {path: Page(path.read_text()) for path in files}
    errors = []
    references = 0
    for path, page in pages.items():
        url = ORIGIN + route(path)
        prefix = path.relative_to(ROOT).as_posix()
        expected_lang = "pl" if route(path).startswith("/pl/") else "en"
        if page.lang != expected_lang or page.headings != 1 or page.mains != 1:
            errors.append(f"{prefix}: expected correct language, one h1 and one main")
        if "main-content" not in page.ids or len(page.ids) != len(set(page.ids)):
            errors.append(f"{prefix}: missing main-content target or duplicate IDs")
        if not page.noindex and page.canonical != url:
            errors.append(f"{prefix}: unexpected canonical {page.canonical}")
        for payload in page.jsonld:
            try:
                json.loads(payload)
            except json.JSONDecodeError as exc:
                errors.append(f"{prefix}: invalid JSON-LD: {exc}")
        for ref in page.refs:
            if not ref or ref == "#":
                errors.append(f"{prefix}: empty link or asset reference")
                continue
            parsed = urlsplit(urljoin(url, ref))
            if parsed.netloc != "michalsuchocki.com" or parsed.scheme not in ("http", "https"):
                continue
            target = target_file(parsed.path)
            references += 1
            if not target.is_file():
                errors.append(f"{prefix}: missing local target {ref}")
            elif parsed.fragment and target in pages and unquote(parsed.fragment) not in pages[target].ids:
                errors.append(f"{prefix}: missing fragment {ref}")
        text = path.read_text()
        for marker in ("Portrait placeholder", "portrait — same shoot", "No link yet", "Wkrótce", "TODO"):
            if marker in text:
                errors.append(f"{prefix}: public placeholder {marker!r}")
    for path in (ROOT / "index.html", ROOT / "pl/index.html"):
        page = pages.get(path)
        if page is None or page.alternates.get("en") != ORIGIN + "/" or page.alternates.get("pl") != ORIGIN + "/pl/":
            errors.append(f"{path}: missing reciprocal English/Polish alternate links")
    if (ROOT / "writing/signal-in-noise-twice/index.html").exists():
        errors.append("An unfinished draft essay is present in production output")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(pages)} HTML pages, {references} local references, language metadata, JSON-LD and draft exclusion")


if __name__ == "__main__":
    main()
