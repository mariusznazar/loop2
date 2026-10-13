"""Invariant loop2-one-serving-process/2: One Express 5 process in the loop2 container serves both
the built game and `/api/` account and save requests.

This file checks the server outside any container, as `npm start` starts it: the process the
loop2 container runs is the same built server, started the same way. The container itself — its
image's command, its one Compose service and the processes in the running container — is checked
by `test_loop2_one_serving_process_container.py`.

The product is built by `npm run build` in a temporary copy of the working tree and started there
by `npm start` on 127.0.0.1:3000, as README.md gives them; the real tree is never written. The
server runs with the debug output of Express 5's router switched on (`DEBUG=router`).

Reading of the sentence:
- the built game: every file `npm run build` places in `dist/public` (what the build produces for
  the browser). It is served when a GET of each file's path below `dist/public` returns 200 with
  the file's bytes, and a GET of `/` returns 200 with the bytes of one of its HTML files;
- `/api/` requests: with no account route yet, requests to paths below `/api/` made up so that no
  route can mean them. They are served when the server answers them with an HTTP response; what
  that response must be is loop2-api-error-route's, and is not checked here;
- one process: among the processes `npm start` starts, exactly one listens on TCP port 3000, no
  process of that tree listens on any other TCP port, and the listening process has started no
  process of its own — so no second process can take part of the requests behind it;
- Express 5: the copy's installed `express` is of major version 5, and Express 5's router (the
  `router` package, debug namespace `router`) logs `dispatching <METHOD> <path>` for every
  request above — the game's files and the `/api/` paths alike. Express 4 logs under
  `express:router` instead, which does not count.

Does NOT cover: the loop2 container (the file named above); a second process started later than
the probes, or one outside the tree `npm start` starts that the server talks to over a channel
other than a TCP listener; requests other than the GETs listed; whether the `/api/` responses are
errors (loop2-api-error-route).

Platform: on Windows the processes and listeners are read through PowerShell
(`Get-CimInstance Win32_Process`, `Get-NetTCPConnection`); elsewhere through `ps` and `lsof`.
Another agent may hold port 3000 for a while: the check waits for the port to be free, up to
PORT_WAIT seconds, before it starts the server, and never touches a process it did not start.
"""

import json
import os
import re
import subprocess
import time
import unittest

import loop2_invariant_support as support

EXPECTED_EXPRESS_MAJOR = 5
BUILT_GAME = "dist/public"
UNMATCHED_API_PATHS = (
    "/api/one-serving-process-check-no-such-route",
    "/api/one-serving-process-check-no-such-route/deeper",
)
BROWSER_ACCEPT = {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}
DEBUG_ENV = {"DEBUG": "router", "DEBUG_COLORS": "no"}
DISPATCH_WAIT = 5   # seconds for the debug line of a request to reach the log
PORT_WAIT = 300     # seconds to wait for a port held by a process this check did not start


# --- processes and listeners ---------------------------------------------------------------


def _processes():
    """{pid: (parent pid, creation time in ms or None, name)} of every process on the machine."""
    table = {}
    if os.name == "nt":
        script = ("Get-CimInstance Win32_Process | ForEach-Object { '{0} {1} {2} {3}' -f "
                  "$_.ProcessId, $_.ParentProcessId, "
                  "([DateTimeOffset]$_.CreationDate).ToUnixTimeMilliseconds(), $_.Name }")
        result = subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-Command", script],
                                capture_output=True, timeout=60)
        for line in result.stdout.decode("utf-8", "replace").splitlines():
            parts = line.split(" ", 3)
            if len(parts) == 4 and all(p.lstrip("-").isdigit() for p in parts[:3]):
                table[int(parts[0])] = (int(parts[1]), int(parts[2]), parts[3].strip())
    else:
        result = subprocess.run(["ps", "-A", "-o", "pid=,ppid=,comm="],
                                capture_output=True, timeout=60)
        for line in result.stdout.decode("utf-8", "replace").splitlines():
            parts = line.split(None, 2)
            if len(parts) == 3 and parts[0].isdigit() and parts[1].isdigit():
                table[int(parts[0])] = (int(parts[1]), None, parts[2].strip())
    if not table:
        raise AssertionError("the list of processes could not be read")
    return table


def descendants(table, root_pid, since):
    """Pids below root_pid, created no earlier than `since` (seconds, less a margin) where the
    creation time is known, so that a reused parent id does not pull in an older process."""
    children = {}
    for pid, (parent, created, _name) in table.items():
        if pid != parent and (created is None or created >= (since - 2) * 1000):
            children.setdefault(parent, []).append(pid)
    found, queue = [], [root_pid]
    while queue:
        for child in children.get(queue.pop(), []):
            if child not in found:
                found.append(child)
                queue.append(child)
    return found


def tcp_listeners():
    """[(pid, local address, port)] of every listening TCP socket on the machine."""
    listeners = []
    if os.name == "nt":
        script = ("Get-NetTCPConnection -State Listen | ForEach-Object { '{0} {1} {2}' -f "
                  "$_.OwningProcess, $_.LocalAddress, $_.LocalPort }")
        result = subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-Command", script],
                                capture_output=True, timeout=60)
        if result.returncode != 0:
            raise AssertionError("Get-NetTCPConnection failed: "
                                 + result.stderr.decode("utf-8", "replace"))
        for line in result.stdout.decode("utf-8", "replace").splitlines():
            parts = line.split()
            if len(parts) == 3 and parts[0].isdigit() and parts[2].isdigit():
                listeners.append((int(parts[0]), parts[1], int(parts[2])))
    else:
        try:
            result = subprocess.run(["lsof", "-nP", "-iTCP", "-sTCP:LISTEN", "-F", "pn"],
                                    capture_output=True, timeout=60)
        except FileNotFoundError:
            raise AssertionError("lsof is not on PATH; the listening sockets cannot be read")
        pid = None
        for line in result.stdout.decode("utf-8", "replace").splitlines():
            if line.startswith("p") and line[1:].isdigit():
                pid = int(line[1:])
            elif line.startswith("n") and pid is not None:
                address, _, port = line[1:].rpartition(":")
                if port.isdigit():
                    listeners.append((pid, address, int(port)))
    return listeners


def wait_for_free_port():
    deadline = time.monotonic() + PORT_WAIT
    while support.port_in_use() and time.monotonic() < deadline:
        time.sleep(2)


# --- the check -------------------------------------------------------------------------------


def built_game_files(copy):
    files = {}
    for relative in support.files_under(BUILT_GAME, copy.path):
        with open(copy.file(relative), "rb") as handle:
            files[relative] = handle.read()
    return files


def url_path(relative):
    return "/" + relative[len(BUILT_GAME) + 1:]


class OneExpressProcessServesGameAndApi(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.copy = support.built_copy()
        cls.game = built_game_files(cls.copy)
        wait_for_free_port()
        cls.server = support.Server(cls.copy, extra_env=DEBUG_ENV)
        cls.addClassCleanup(cls.server.stop)
        # Every request the check makes, answered before the processes are read.
        cls.answers = {}
        for relative in cls.game:
            cls.answers[url_path(relative)] = support.request("GET", url_path(relative),
                                                              BROWSER_ACCEPT)
        cls.answers["/"] = support.request("GET", "/", BROWSER_ACCEPT)
        for path in UNMATCHED_API_PATHS:
            cls.answers[path] = support.request("GET", path, BROWSER_ACCEPT)
        cls.table = _processes()
        cls.tree = descendants(cls.table, cls.server.process.pid, cls.server.process.loop2_started)
        cls.tree_and_root = [cls.server.process.pid] + cls.tree
        cls.listeners = tcp_listeners()

    def describe(self, pids):
        return [f"{pid} {self.table.get(pid, (None, None, '?'))[2]}" for pid in pids]

    def test_the_built_game_is_served(self):
        # invariant: loop2-one-serving-process/2
        html = {p: data for p, data in self.game.items() if p.lower().endswith((".html", ".htm"))}
        scripts = [p for p in self.game if p.lower().endswith((".js", ".mjs"))]
        self.assertTrue(html, f"`npm run build` places no HTML file in {BUILT_GAME}")
        self.assertTrue(scripts, f"`npm run build` places no JavaScript file in {BUILT_GAME}")
        status, _headers, body = self.answers["/"]
        self.assertEqual(status, 200, "GET / does not return 200")
        self.assertIn(body, list(html.values()),
                      f"GET / returns none of the HTML files {sorted(html)}")
        for relative, data in sorted(self.game.items()):
            with self.subTest(file=relative):
                status, _headers, body = self.answers[url_path(relative)]
                self.assertEqual(status, 200, f"GET {url_path(relative)} returns {status}")
                self.assertEqual(body, data, f"GET {url_path(relative)} does not return the "
                                             f"bytes of {relative}")

    def test_api_requests_are_answered(self):
        # invariant: loop2-one-serving-process/2
        for path in UNMATCHED_API_PATHS:
            with self.subTest(path=path):
                status, _headers, _body = self.answers[path]
                self.assertTrue(100 <= status <= 599, f"GET {path} returns status {status}")

    def test_one_process_of_the_started_tree_listens_and_starts_nothing(self):
        # invariant: loop2-one-serving-process/2
        tree = set(self.tree_and_root)
        on_port = sorted({pid for pid, _address, port in self.listeners
                          if pid in tree and port == support.PORT})
        self.assertEqual(len(on_port), 1,
                         f"processes of the tree `npm start` started that listen on port "
                         f"{support.PORT}: {self.describe(on_port)}")
        elsewhere = sorted({(pid, address, port) for pid, address, port in self.listeners
                            if pid in tree and port != support.PORT})
        self.assertEqual(elsewhere, [], "processes of the started tree listen on other ports, "
                                        "where a second serving process could stand")
        listener = on_port[0]
        below = descendants(self.table, listener, self.server.process.loop2_started)
        self.assertEqual(below, [], f"the listening process {self.describe([listener])} has "
                                    f"started processes of its own: {self.describe(below)}")

    def test_installed_express_is_major_5(self):
        # invariant: loop2-one-serving-process/2
        manifest = self.copy.file("node_modules/express/package.json")
        with open(manifest, encoding="utf-8") as handle:
            version = json.load(handle).get("version", "")
        found = re.match(r"v?(\d+)", version)
        self.assertIsNotNone(found, f"node_modules/express/package.json version {version!r}")
        self.assertEqual(int(found.group(1)), EXPECTED_EXPRESS_MAJOR,
                         f"the started copy runs express {version!r}")

    def test_express_5_router_dispatches_game_and_api_requests(self):
        # invariant: loop2-one-serving-process/2
        for path in sorted(self.answers):
            with self.subTest(path=path):
                line = re.compile(r"(?:^|\s)router dispatching GET " + re.escape(path)
                                  + r"(?:\s|$)", re.MULTILINE)
                deadline = time.monotonic() + DISPATCH_WAIT
                while not line.search(self.server.stderr()) and time.monotonic() < deadline:
                    time.sleep(0.1)
                self.assertRegex(self.server.stderr(), line,
                                 f"Express 5's router logged no dispatch of GET {path}; server "
                                 f"output:\n{self.server.output()}")


if __name__ == "__main__":
    unittest.main()
