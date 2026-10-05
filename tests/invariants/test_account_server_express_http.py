"""Invariant account-server-express-http/1: The account and save server handles its HTTP routes
and responses through Express 5.

Covers, on the commit being checked:
- package.json depends at run time on Express of major version 5, the lockfile and the installed
  copy are of major version 5, and no other HTTP server framework is a runtime dependency;
- the server's TypeScript source (`src/server`, as README.md places it) imports `express`,
  imports no other HTTP server framework, and hands Node's HTTP server no request handler of its
  own (a function passed to `createServer`, or a `request` listener);
- at run time, the built server started by `npm start` passes every probed request — a page, an
  unknown page, an unknown `/api/` path — through Express 5's router: Express 5 routes through
  the `router` package, whose debug output (namespace `router`, switched on by the `DEBUG`
  environment variable) logs `dispatching <METHOD> <path>` for each request it receives.

Does NOT cover: routes the probes do not reach; a handler that writes to Node's raw response
object after Express dispatches to it; HTTP served by a second process. The source scan reads
text, not a syntax tree, so a handler hidden behind indirection escapes it.
"""

import json
import os
import re
import time
import unittest

import loop2_invariant_support as support

EXPECTED_EXPRESS_MAJOR = 5

# HTTP server frameworks other than Express, as npm package names.
OTHER_HTTP_FRAMEWORKS = (
    "fastify", "koa", "@koa/router", "koa-router", "@hapi/hapi", "hapi", "restify", "polka",
    "hono", "@hono/node-server", "@nestjs/core", "micro", "h3", "sails", "@feathersjs/feathers",
    "connect", "@tinyhttp/app", "elysia", "itty-router", "@adonisjs/core", "loopback",
    "@loopback/core", "total.js", "derby", "meteor",
)

# Requests the running server is probed with: (method, path).
PROBES = (
    ("GET", "/"),
    ("GET", "/invariant-check-no-such-page"),
    ("GET", "/api/invariant-check-no-such-route"),
)
DEBUG_ENV = {"DEBUG": "router", "DEBUG_COLORS": "no"}
DISPATCH_WAIT = 5  # seconds for the debug line of a request to reach the log


def load_json(relative):
    with open(os.path.join(support.ROOT, relative), encoding="utf-8") as handle:
        return json.load(handle)


def major_of(version):
    found = re.match(r"[\^~=v]*\s*(\d+)", version.strip())
    return int(found.group(1)) if found else None


class ExpressFiveDeclared(unittest.TestCase):

    def test_runtime_dependency_on_express_5(self):
        # invariant: account-server-express-http/1
        dependencies = load_json("package.json").get("dependencies", {})
        self.assertIn("express", dependencies, "express is not a runtime dependency")
        spec = dependencies["express"]
        self.assertRegex(spec, r"^[\^~=]?\s*5(\.(\d+|x|\*)){0,2}$",
                         f"package.json pins express {spec!r}, not one admitting only major 5")
        locked = load_json("package-lock.json").get("packages", {}).get(
            "node_modules/express", {}).get("version", "")
        self.assertEqual(major_of(locked), EXPECTED_EXPRESS_MAJOR,
                         f"package-lock.json locks express {locked!r}")

    def test_installed_express_is_5(self):
        # invariant: account-server-express-http/1
        with open(os.path.join(support.ROOT, "node_modules", "express", "package.json"),
                  encoding="utf-8") as handle:
            installed = json.load(handle).get("version", "")
        self.assertEqual(major_of(installed), EXPECTED_EXPRESS_MAJOR,
                         f"node_modules holds express {installed!r}")

    def test_no_other_http_framework_dependency(self):
        # invariant: account-server-express-http/1
        dependencies = load_json("package.json").get("dependencies", {})
        self.assertEqual(sorted(set(dependencies) & set(OTHER_HTTP_FRAMEWORKS)), [])


IMPORT_SPECIFIER = re.compile(
    r"""(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)["']([^"']+)["']""")
RAW_HANDLER = re.compile(
    r"""createServer\s*\(\s*(?:\{[^)]*?\}\s*,\s*)?(?:async\s+)?(?:function\b|\([^()]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)""")
REQUEST_LISTENER = re.compile(r"""\.\s*on\s*\(\s*["']request["']""")


def package_name(specifier):
    if specifier.startswith("@"):
        return "/".join(specifier.split("/")[:2])
    return specifier.split("/")[0]


class ExpressInServerSource(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.sources = {}
        for relative in support.files_under("src/server", support.ROOT):
            if relative.endswith((".ts", ".mts", ".cts")):
                cls.sources[relative] = support.read_text(
                    os.path.join(support.ROOT, *relative.split("/")))

    def test_server_source_imports_express(self):
        # invariant: account-server-express-http/1
        self.assertTrue(self.sources, "src/server holds no TypeScript file")
        importing = [p for p, text in self.sources.items()
                     if "express" in IMPORT_SPECIFIER.findall(text)]
        self.assertTrue(importing, "no file of src/server imports express")

    def test_server_source_uses_no_other_http_framework(self):
        # invariant: account-server-express-http/1
        found = sorted({(p, package_name(s)) for p, text in self.sources.items()
                        for s in IMPORT_SPECIFIER.findall(text)
                        if package_name(s) in OTHER_HTTP_FRAMEWORKS})
        self.assertEqual(found, [])

    def test_server_source_gives_node_http_no_handler_of_its_own(self):
        # invariant: account-server-express-http/1
        found = sorted(p for p, text in self.sources.items()
                       if RAW_HANDLER.search(text) or REQUEST_LISTENER.search(text))
        self.assertEqual(found, [], "these files hand Node's HTTP server a request handler "
                                    "other than an Express application")


class ExpressRoutesRunningServer(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        copy = support.built_copy()
        cls.server = support.Server(copy, extra_env=DEBUG_ENV)
        cls.addClassCleanup(cls.server.stop)

    def test_every_probe_is_dispatched_by_express_router(self):
        # invariant: account-server-express-http/1
        for method, path in PROBES:
            with self.subTest(method=method, path=path):
                status, _headers, _body = support.request(method, path)
                self.assertGreaterEqual(status, 100)
                line = re.compile(r"(?:^|\s)router dispatching " + re.escape(method) + " "
                                  + re.escape(path) + r"(?:\s|$)", re.MULTILINE)
                deadline = time.monotonic() + DISPATCH_WAIT
                while not line.search(self.server.stderr()) and time.monotonic() < deadline:
                    time.sleep(0.1)
                self.assertRegex(self.server.stderr(), line,
                                 f"Express 5's router logged no dispatch of {method} {path}; "
                                 f"server output:\n{self.server.output()}")


if __name__ == "__main__":
    unittest.main()
