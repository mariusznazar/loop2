"""Serve the ignored preview and the product's root-relative static assets locally."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class PreviewHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith(("/icons/", "/fonts/")):
            self.path = "/dist/public" + self.path
        super().do_GET()


ThreadingHTTPServer(("127.0.0.1", 8765), PreviewHandler).serve_forever()
