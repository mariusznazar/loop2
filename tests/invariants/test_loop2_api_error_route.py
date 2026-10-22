"""Invariant loop2-api-error-route: An unmatched `/api/` request receives an API error response,
never the built game's HTML page.

The product is built by `npm run build` in a temporary copy of the working tree and started there
by `npm start` on 127.0.0.1:3000, as README.md gives them; the real tree is never written.

Reading of the sentence:
- an unmatched `/api/` request: a request whose path begins with `/api/` and names no route — the
  paths below, made up so that no route of the product can mean them, sent with each method and
  each Accept header below (a browser's navigation, a JSON client, none);
- an API error response: status 400–599, a JSON media type (`application/json` or `+json`), and a
  body that parses as JSON;
- the built game's HTML page: each HTML file `npm run build` places in `dist/public`; a response
  must neither carry the bytes of any of them, nor declare HTML, nor begin like an HTML document.
  A control request for `/` must return one of those files, so that the comparison is made
  against the page the server really serves.

Does NOT cover: `/api` without the trailing slash; paths with dot segments or encoded slashes;
methods and headers not listed; a page served under another name than an HTML file of
`dist/public`.
"""

import json
import unittest

import loop2_invariant_support as support

UNMATCHED_API_PATHS = (
    "/api/",
    "/api/invariant-check-no-such-route",
    "/api/invariant-check-no-such-route/deeper/still",
    "/api/invariant-check-no-such-route?page=1",
    "/api/index.html",
    "/api/main.js",
)
METHODS = ("GET", "POST", "DELETE")
ACCEPT_HEADERS = (
    {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},
    {"Accept": "application/json"},
    {},
)
POST_BODY = b"{}"
BUILT_PAGE = "dist/public"


def html_pages(copy):
    pages = {}
    for relative in support.files_under(BUILT_PAGE, copy.path):
        if relative.lower().endswith((".html", ".htm")):
            with open(copy.file(relative), "rb") as handle:
                pages[relative] = handle.read()
    return pages


def media_type(headers):
    return headers.get("content-type", "").split(";")[0].strip().lower()


class UnmatchedApiRequests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.copy = support.built_copy()
        cls.pages = html_pages(cls.copy)
        cls.server = support.Server(cls.copy)
        cls.addClassCleanup(cls.server.stop)

    def test_root_serves_the_built_page(self):
        # invariant: loop2-api-error-route
        self.assertTrue(self.pages, f"`npm run build` places no HTML file in {BUILT_PAGE}")
        status, _headers, body = support.request("GET", "/", {"Accept": "text/html"})
        self.assertEqual(status, 200)
        self.assertIn(body, list(self.pages.values()),
                      f"GET / does not return any of {sorted(self.pages)}, so the comparison "
                      "below would not be made against the page the server serves")

    def test_unmatched_api_requests_receive_json_errors_not_the_page(self):
        # invariant: loop2-api-error-route
        for path in UNMATCHED_API_PATHS:
            for method in METHODS:
                for accept in ACCEPT_HEADERS:
                    with self.subTest(method=method, path=path, accept=accept.get("Accept")):
                        headers = dict(accept)
                        body = None
                        if method == "POST":
                            headers["Content-Type"] = "application/json"
                            body = POST_BODY
                        status, response_headers, data = support.request(
                            method, path, headers, body)
                        kind = media_type(response_headers)
                        start = data.lstrip()[:64].lower()
                        self.assertNotIn(data, list(self.pages.values()),
                                         "the response is the built game's HTML page")
                        self.assertFalse(start.startswith((b"<!doctype", b"<html")),
                                         f"the response is an HTML document: {data[:200]!r}")
                        self.assertNotIn(kind, ("text/html", "application/xhtml+xml"))
                        self.assertTrue(400 <= status <= 599, f"status {status}")
                        self.assertTrue(kind == "application/json" or kind.endswith("+json"),
                                        f"Content-Type {response_headers.get('content-type')!r}")
                        try:
                            json.loads(data.decode("utf-8"))
                        except (UnicodeDecodeError, ValueError) as error:
                            self.fail(f"the body is not JSON ({error}): {data[:200]!r}")


if __name__ == "__main__":
    unittest.main()
