"""Invariant local-start-access: the local start listens on this computer alone and hands the server
none of the proxy headers a browser sent.

The file also checks the rest of what `npm run local` promises: a browser reaches accounts through
it, every start has a database of its own, and neither an argument nor an environment value leads
the removal of earlier databases anywhere else (D-255, D-256, D-257, D-258).

Each start runs in a temporary copy of the working tree. Some cases replace the built server by a
stand-in, each for a reason the real server cannot give:
- the case of the headers (class LocalStartBoundary): a stand-in that reports the raw headers it
  receives, since the real server ignores most of them and its answer would show nothing;
- in class LocalStart, the case of a start on its way up: a stand-in that takes its time;
- the case of a stop with no built game: a stand-in that holds no writer of failure lines;
- the cases of a request the server drops, of an answer it breaks off after its headers and of a
  request it holds while the browser leaves: stand-ins that fail on demand.
The other cases run the real built server."""

import json
import os
import re
import socket
import ssl
import subprocess
import tempfile
import time
import unittest

import loop2_invariant_support as support

START_TIMEOUT = 60       # seconds for a start to print its address
STOP_TIMEOUT = 30        # seconds for `npm run local:stop` to end
CONNECT_TIMEOUT = 3      # seconds for one TCP connection
# The mail sender gives up after 10 seconds (src/server/account-mail.ts, defaultDeadline): a
# registration below that did not wait for it.
MAIL_DEADLINE = 10

ADDRESS_LINE = re.compile(r"(?m)^Local game: https://127\.0\.0\.1:(\d+)\b")
SERVER_LINE = re.compile(r"(?m)^Loop: http://127\.0\.0\.1:(\d+)\s*$")

STAND_IN_SERVER = """\
import { createServer } from "node:http";

const host = process.env.LOOP2_LISTEN_HOST;
const port = Number(process.env.LOOP2_LISTEN_PORT);
createServer((request, response) => {
  request.resume();
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify(request.rawHeaders));
}).listen(port, host, () => console.log(`Loop: http://${host}:${port}`));
"""

# A server that drops the connection of a request, as a server that fails does.
DROPPING_SERVER = """\
import { createServer } from "node:http";

const host = process.env.LOOP2_LISTEN_HOST;
const port = Number(process.env.LOOP2_LISTEN_PORT);
createServer((request) => request.socket.destroy())
  .listen(port, host, () => console.log(`Loop: http://${host}:${port}`));
"""

# A server that breaks its answer off after the headers and a first piece of the body.
CUT_OFF_SERVER = """import { createServer } from "node:http";

const host = process.env.LOOP2_LISTEN_HOST;
const port = Number(process.env.LOOP2_LISTEN_PORT);
createServer((request, response) => {
  request.resume();
  response.write("partial", () => request.socket.destroy());
}).listen(port, host, () => console.log(`Loop: http://${host}:${port}`));
"""

# A server that never answers /hold and says when it has the request and when its connection
# ends, and drops the connection of /drop.
HOLDING_SERVER = """import { createServer } from "node:http";

const host = process.env.LOOP2_LISTEN_HOST;
const port = Number(process.env.LOOP2_LISTEN_PORT);
createServer((request) => {
  request.resume();
  if (request.url === "/drop") {
    request.socket.destroy();
    return;
  }
  console.log(`held ${request.url}`);
  request.socket.once("close", () => console.log(`closed ${request.url}`));
}).listen(port, host, () => console.log(`Loop: http://${host}:${port}`));
"""

# A server that holds its whole process, as a start busy on its way up does.
BUSY_SERVER = STAND_IN_SERVER + """
Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 4000);
"""

PASSWORD = "synthetic-local-password"
HOSTILE_HEADERS = (
    ("Forwarded", "for=203.0.113.9;proto=http"),
    ("X-Forwarded-For", "203.0.113.9"),
    ("x-forwarded-for", "203.0.113.10"),
    ("X-Forwarded-Host", "evil.example"),
    ("X-Forwarded-Proto", "http"),
    ("x-FORWARDED-proto", "ftp"),
    ("X-Forwarded-Port", "1"),
    ("X-Real-IP", "203.0.113.9"),
    ("CF-Connecting-IP", "203.0.113.9"),
)


def own_addresses():
    """Addresses of this computer that are no loopback address of 127.0.0.1's own: another address
    of the loopback range, which only a wildcard listener answers on, and the network addresses
    the computer's name resolves to."""
    found = {"127.0.0.2"}
    try:
        for entry in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            found.add(entry[4][0])
    except socket.gaierror:
        pass
    return sorted(found - {"127.0.0.1"})


def accepts_connections(host, port):
    try:
        with socket.create_connection((host, port), timeout=CONNECT_TIMEOUT):
            return True
    except OSError:
        return False


def tls_context():
    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE
    return context


def exchange(port, request, context=None):
    """Send one request of raw bytes over TLS; return (status, lower-cased headers, body)."""
    context = context or tls_context()
    with socket.create_connection(("127.0.0.1", port), timeout=support.HTTP_TIMEOUT) as raw, \
            context.wrap_socket(raw, server_hostname="127.0.0.1") as secure:
        secure.sendall(request)
        answer = b""
        while chunk := secure.recv(65536):
            answer += chunk
    head, _, body = answer.partition(b"\r\n\r\n")
    lines = head.decode("latin-1").split("\r\n")
    headers = {}
    for line in lines[1:]:
        name, _, value = line.partition(":")
        headers.setdefault(name.lower(), []).append(value.strip())
    if "chunked" in headers.get("transfer-encoding", [""])[0]:
        body = decoded_chunks(body)
    return int(lines[0].split()[1]), headers, body


def answer_until_end(port, request):
    """Send one request of raw bytes over TLS; return the bytes the browser got and whether the
    connection ended within HTTP_TIMEOUT, as against a browser left waiting."""
    context = tls_context()
    answer = b""
    with socket.create_connection(("127.0.0.1", port), timeout=support.HTTP_TIMEOUT) as raw,             context.wrap_socket(raw, server_hostname="127.0.0.1") as secure:
        secure.sendall(request)
        try:
            while chunk := secure.recv(65536):
                answer += chunk
        except TimeoutError:
            return answer, False
        except (ssl.SSLError, ConnectionError):
            pass  # the connection was cut without a closing message
    return answer, True


def wait_until(condition):
    deadline = time.monotonic() + support.HTTP_TIMEOUT
    while not condition() and time.monotonic() < deadline:
        time.sleep(0.1)
    return condition()


def proxy_lines(start):
    return [line for line in start.output().splitlines() if "local-proxy" in line]


def decoded_chunks(body):
    plain = b""
    while body:
        size, _, rest = body.partition(b"\r\n")
        length = int(size, 16)
        if length == 0:
            break
        plain += rest[:length]
        body = rest[length + 2:]
    return plain


def request_bytes(port, method, path, headers=(), body=b""):
    lines = [f"{method} {path} HTTP/1.1", f"Host: 127.0.0.1:{port}", "Connection: close"]
    lines += [f"{name}: {value}" for name, value in headers]
    if body:
        lines += ["Content-Type: application/json", f"Content-Length: {len(body)}"]
    return ("\r\n".join(lines) + "\r\n\r\n").encode("latin-1") + body


class Start:
    """One running start in a copy of the tree, its output in a file; `port` is the HTTPS port and
    `server_port` the built server's."""

    def __init__(self, copy, command, env=None, wait=True):
        descriptor, self.log_path = tempfile.mkstemp(dir=copy.path)
        with os.fdopen(descriptor, "wb") as log:
            self.process = support.popen(command, copy.path, env={**os.environ, **(env or {})},
                                         stdout=log, stderr=subprocess.STDOUT)
        if wait:
            self.wait()

    def wait(self):
        deadline = time.monotonic() + START_TIMEOUT
        while True:
            output = self.output()
            address = ADDRESS_LINE.search(output)
            if address:
                server = SERVER_LINE.search(output)
                if server is None:
                    self.close()
                    raise AssertionError("no line `Loop: http://127.0.0.1:<port>` before the "
                                         f"address:\n{output}")
                self.port = int(address.group(1))
                self.server_port = int(server.group(1))
                return
            if self.process.poll() is not None or time.monotonic() > deadline:
                self.close()
                raise AssertionError(f"no address printed:\n{output}")
            time.sleep(0.1)

    def output(self):
        return support.read_text(self.log_path)

    def close(self):
        support.kill_tree(self.process)


def local_stop(copy):
    code, output = support.run([support.npm(), "run", "local:stop"], copy.path,
                               timeout=STOP_TIMEOUT)
    if code != 0:
        raise AssertionError(f"`npm run local:stop` exited {code}:\n{output}")
    return output


def directories(copy):
    base = copy.file(".runs/local-start")
    return sorted(os.listdir(base)) if os.path.isdir(base) else []


def write_stand_in(copy, server):
    os.makedirs(copy.file("dist/server"), exist_ok=True)
    with open(copy.file("dist/server/main.js"), "w", encoding="utf-8") as handle:
        handle.write(server)


class Accounts:
    """Account requests through a start's proxy, as a browser at its address sends them."""

    def __init__(self, port):
        self.port = port

    def post(self, path, fields):
        body = json.dumps(fields).encode()
        return exchange(self.port, request_bytes(
            self.port, "POST", path,
            [("Origin", f"https://127.0.0.1:{self.port}")], body))

    def register(self, email):
        return self.post("/api/accounts", {"email": email, "password": PASSWORD,
                                           "passwordConfirmation": PASSWORD})

    def log_in(self, email):
        return self.post("/api/session", {"email": email, "password": PASSWORD})


class LocalStartBoundary(unittest.TestCase):
    """The stand-in server replaces only what stands behind the proxy."""

    @classmethod
    def setUpClass(cls):
        cls.copy = support.TreeCopy()
        cls.addClassCleanup(cls.copy.remove)
        write_stand_in(cls.copy, STAND_IN_SERVER)
        cls.start = Start(cls.copy, ["node", "scripts/local-start.mjs"])
        cls.addClassCleanup(cls.start.close)

    def received_headers(self, headers):
        status, _, body = exchange(self.start.port, request_bytes(
            self.start.port, "GET", "/probe", headers))
        self.assertEqual(status, 200)
        raw = json.loads(body)
        return [(raw[index].lower(), raw[index + 1]) for index in range(0, len(raw), 2)]

    def test_no_proxy_header_of_a_browser_reaches_the_server(self):
        # invariant: local-start-access
        received = self.received_headers((*HOSTILE_HEADERS, ("Cookie", "kept=1")))
        names = [name for name, _ in received]
        self.assertIn(("cookie", "kept=1"), received, "precondition: other headers are forwarded")
        self.assertEqual(
            [pair for pair in received if pair[0] == "x-forwarded-proto"],
            [("x-forwarded-proto", "https")])
        for name in ("forwarded", "x-forwarded-for", "x-forwarded-host", "x-forwarded-port",
                     "x-real-ip", "cf-connecting-ip"):
            self.assertNotIn(name, names)

    def test_the_proxy_says_https_also_when_no_browser_header_came(self):
        self.assertIn(("x-forwarded-proto", "https"), self.received_headers(()))


class LocalStart(unittest.TestCase):
    """The real command. Its cases run the real built server except the five the module's description
    lists as using a stand-in."""

    def setUp(self):
        self.copy = support.TreeCopy()
        self.addCleanup(self.copy.remove)
        self.starts = []
        self.addCleanup(self.close_starts)

    def close_starts(self):
        for start in self.starts:
            start.close()

    def local(self, env=None):
        start = Start(self.copy, [support.npm(), "run", "local"], env)
        self.starts.append(start)
        return start

    def plant_directory(self, name):
        path = self.copy.file(f".runs/local-start/{name}/accounts.sqlite")
        os.makedirs(os.path.dirname(path))
        with open(path, "w", encoding="utf-8") as handle:
            handle.write("planted")

    def test_both_ports_listen_on_this_computer_alone(self):
        # invariant: local-start-access
        start = self.local()
        for port in (start.port, start.server_port):
            self.assertTrue(accepts_connections("127.0.0.1", port),
                            "precondition: the port answers on 127.0.0.1")
            for address in own_addresses():
                self.assertFalse(accepts_connections(address, port), f"{address}:{port}")

    def test_a_browser_signs_up_over_https_though_no_mail_can_leave(self):
        start = self.local()
        began = time.monotonic()
        status, headers, body = Accounts(start.port).register("first@example.test")
        took = time.monotonic() - began
        account = json.loads(body)
        self.assertEqual(status, 201)
        self.assertEqual(account["confirmationMessage"], "failed")
        self.assertIs(account["emailConfirmed"], False)
        self.assertLess(took, MAIL_DEADLINE)

        cookie = headers["set-cookie"][0].split(";")[0]
        self.assertTrue(cookie.startswith("__Host-"), cookie)
        status, _, body = exchange(start.port, request_bytes(
            start.port, "GET", "/api/account",
            [("Cookie", cookie), ("X-Forwarded-Proto", "http")]))
        self.assertEqual(status, 200, "a browser's own header changes nothing on the real server")
        self.assertEqual(json.loads(body)["email"], "first@example.test")

    def test_the_certificate_holds_for_the_address_the_game_stands_at(self):
        start = self.local()
        certificate = ssl.get_server_certificate(("127.0.0.1", start.port))
        context = ssl.create_default_context(cadata=certificate)
        status, _, body = exchange(start.port, request_bytes(start.port, "GET", "/"), context)
        self.assertEqual(status, 200)
        self.assertIn(b"<html", body.lower())

    def test_the_game_stands_at_a_port_of_its_own_at_each_of_two_starts_side_by_side(self):
        first = self.local()
        second = self.local()
        self.assertNotEqual(first.port, second.port)
        self.assertEqual(Accounts(first.port).register("side@example.test")[0], 201)
        self.assertEqual(Accounts(second.port).register("side@example.test")[0], 201,
                         "a start's accounts are its own")
        self.assertEqual(Accounts(first.port).log_in("side@example.test")[0], 200,
                         "the later start left the earlier one's database alone")
        self.assertEqual(len(directories(self.copy)), 2)

    def test_a_start_removes_the_database_of_a_start_that_ended(self):
        first = self.local()
        self.assertEqual(Accounts(first.port).register("gone@example.test")[0], 201)
        earlier = directories(self.copy)
        self.assertIn("accounts.sqlite-wal", os.listdir(
            self.copy.file(f".runs/local-start/{earlier[0]}")),
            "precondition: the database has its side files")
        local_stop(self.copy)
        self.assertEqual(directories(self.copy), earlier, "ending a start removes nothing")

        second = self.local()
        self.assertEqual(Accounts(second.port).log_in("gone@example.test")[0], 401)
        self.assertEqual(Accounts(second.port).register("gone@example.test")[0], 201)
        self.assertEqual(len(directories(self.copy)), 1)
        self.assertNotEqual(directories(self.copy), earlier)

    def test_a_start_killed_from_outside_leaves_nothing_running_and_goes_at_the_next_start(self):
        first = self.local()
        earlier = directories(self.copy)
        support.kill_tree(first.process)
        deadline = time.monotonic() + 15
        while accepts_connections("127.0.0.1", first.server_port) and \
                time.monotonic() < deadline:
            time.sleep(0.2)
        self.assertFalse(accepts_connections("127.0.0.1", first.server_port))
        self.local()
        self.assertEqual(len(directories(self.copy)), 1)
        self.assertNotEqual(directories(self.copy), earlier)

    def test_a_number_another_program_holds_keeps_no_directory_of_an_ended_start(self):
        foreign = os.getpid()
        mark = "abcdefabcdefabcd"
        for port in (support.free_port(), 99999, 0):
            self.plant_directory(f"{foreign}-{port}-{mark}")
        self.assertIn("stopped: 0", local_stop(self.copy), "a directory is no running start")
        start = self.local()
        self.assertEqual(len(directories(self.copy)), 1, "the next start removes all three")

        # A running start's port under a certificate that is not its own.
        self.plant_directory(f"{foreign}-{start.port}-{mark}")
        self.assertIn("stopped: 1", local_stop(self.copy))
        self.local()
        self.assertEqual(len(directories(self.copy)), 1)

    def test_a_start_on_its_way_up_is_not_taken_for_ended(self):
        write_stand_in(self.copy, BUSY_SERVER)
        command = ["node", "scripts/local-start.mjs"]
        first = Start(self.copy, command, wait=False)
        self.starts.append(first)
        deadline = time.monotonic() + START_TIMEOUT
        while not directories(self.copy) and time.monotonic() < deadline:
            time.sleep(0.02)
        early = directories(self.copy)
        self.assertEqual(len(early), 1, "precondition: the first start's directory stands")

        self.starts.append(Start(self.copy, command))
        first.wait()
        self.assertIn(early[0], directories(self.copy))
        self.assertEqual(len(directories(self.copy)), 2)

    def silent_port(self):
        """A port of this computer that takes a connection and says nothing."""
        listener = socket.create_server(("127.0.0.1", 0))
        self.addCleanup(listener.close)
        return listener.getsockname()[1]

    def stop_with_a_silent_directory(self):
        """`npm run local:stop` with a planted directory that passes for a running start, its
        name sorted first by the zeros before a live number, the order in which the script
        takes the directories; its stop file is the case's."""
        return support.run([support.npm(), "run", "local:stop"], self.copy.path,
                           timeout=STOP_TIMEOUT)

    def planted_name(self):
        return f"0000{os.getpid()}-{self.silent_port()}-abcdefabcdefabcd"

    def test_a_planted_directory_keeps_stop_from_telling_no_other_start(self):
        start = self.local()
        os.makedirs(self.copy.file(f".runs/local-start/{self.planted_name()}/stop"))
        code, output = self.stop_with_a_silent_directory()
        self.assertEqual(code, 1, output)
        self.assertFalse(accepts_connections("127.0.0.1", start.port), output)

    def test_a_directory_stop_cannot_be_told_to_leaves_one_failure_line_with_its_cause(self):
        # Task item 7: the line of the failed telling and the line of the start that did not stop
        # are one failure, so the run leaves one line, the one that carries the original error.
        self.local()
        os.makedirs(self.copy.file(f".runs/local-start/{self.planted_name()}/stop"))
        code, output = self.stop_with_a_silent_directory()
        self.assertEqual(code, 1, "the start that did not stop still fails the command")
        lines = [line for line in output.splitlines() if '"failure":' in line]
        self.assertEqual(len(lines), 1, output)
        self.assertEqual(json.loads(lines[0])["code"], "EEXIST")

    def test_stop_with_no_built_game_still_tells_every_start_and_leaves_the_missing_writer_once(self):
        # Task item 6: a copy that holds no dist/server/log-line.js, with a start of the stand-in
        # server that holds no writer either, and a directory whose stop file cannot be written
        # listed before it.
        write_stand_in(self.copy, STAND_IN_SERVER)
        start = Start(self.copy, ["node", "scripts/local-start.mjs"])
        self.starts.append(start)
        os.makedirs(self.copy.file(f".runs/local-start/{self.planted_name()}/stop"))
        self.assertFalse(os.path.exists(self.copy.file("dist/server/log-line.js")),
                         "precondition: no writer of failure lines is built")
        code, output = self.stop_with_a_silent_directory()
        self.assertEqual(code, 1, "the planted start did not stop: " + output)
        self.assertIn("stopped: 1", output)
        self.assertFalse(accepts_connections("127.0.0.1", start.port), output)
        self.assertEqual(output.count("Cannot find module"), 1, output)

    def test_stop_writes_through_no_planted_link(self):
        outside = self.copy.file("outside.txt")
        with open(outside, "w", encoding="utf-8") as handle:
            handle.write("kept")
        folder = self.copy.file(f".runs/local-start/{self.planted_name()}")
        os.makedirs(folder)
        try:
            os.symlink(outside, os.path.join(folder, "stop"))
        except OSError as error:
            self.skipTest(f"this computer makes no link: {error}")
        code, output = self.stop_with_a_silent_directory()
        self.assertEqual(code, 1, output)
        with open(outside, encoding="utf-8") as handle:
            self.assertEqual(handle.read(), "kept")

    def test_stop_ends_every_running_start_and_their_ports(self):
        first = self.local()
        second = self.local()
        self.assertIn("stopped: 2", local_stop(self.copy))
        for port in (first.port, first.server_port, second.port, second.server_port):
            self.assertFalse(accepts_connections("127.0.0.1", port), str(port))
        self.assertIn("stopped: 0", local_stop(self.copy))

    def test_no_environment_value_and_no_argument_leads_the_removal_elsewhere(self):
        outside = self.copy.file("outside.sqlite")
        foreign = self.copy.file(".runs/local-start/not-a-start/accounts.sqlite")
        os.makedirs(os.path.dirname(foreign))
        for path in (outside, foreign):
            with open(path, "w", encoding="utf-8") as handle:
                handle.write("kept")

        self.local({"LOOP2_DATABASE_PATH": outside})
        local_stop(self.copy)
        self.local({"LOOP2_DATABASE_PATH": outside})
        local_stop(self.copy)
        ended = directories(self.copy)

        code, output = support.run(["node", "scripts/local-start.mjs", "--database", outside],
                                   self.copy.path, timeout=STOP_TIMEOUT)
        self.assertEqual(code, 2, output)
        self.assertEqual(directories(self.copy), ended, "a refused start removes nothing")
        for path in (outside, foreign):
            with open(path, encoding="utf-8") as handle:
                self.assertEqual(handle.read(), "kept")

    def test_a_server_that_cannot_start_ends_the_start_with_no_address(self):
        code, output = self.copy.npm("run", "build")
        self.assertEqual(code, 0, output)
        process = support.popen(["node", "scripts/local-start.mjs"], self.copy.path,
                                env={**os.environ, "NODE_ENV": "production"})
        try:
            output, _ = process.communicate(timeout=START_TIMEOUT)
        finally:
            support.kill_tree(process)
        self.assertEqual(process.returncode, 1, output)
        self.assertNotIn(b"Local game:", output)
        self.assertEqual(output.count(b'"failure":'), 1, "the server's own line, and no second")

    def test_a_request_the_server_drops_gets_502_and_leaves_one_line_with_its_cause(self):
        code, output = self.copy.npm("run", "build")
        self.assertEqual(code, 0, output)
        write_stand_in(self.copy, DROPPING_SERVER)
        start = Start(self.copy, ["node", "scripts/local-start.mjs"])
        self.starts.append(start)
        status, _, _ = exchange(start.port, request_bytes(start.port, "GET", "/"))
        self.assertEqual(status, 502)
        deadline = time.monotonic() + support.HTTP_TIMEOUT
        while '"failure":"local-proxy"' not in start.output() and time.monotonic() < deadline:
            time.sleep(0.1)
        lines = [line for line in start.output().splitlines() if "local-proxy" in line]
        self.assertEqual(len(lines), 1, start.output())
        self.assertEqual(json.loads(lines[0])["code"], "ECONNRESET")

    def test_an_answer_the_server_breaks_off_after_its_headers_ends_the_browsers_connection(self):
        # Task item 8: the browser is not left waiting for the rest of a cut-off answer, which
        # does not end as a whole one, and the cut leaves one line with its cause.
        code, output = self.copy.npm("run", "build")
        self.assertEqual(code, 0, output)
        write_stand_in(self.copy, CUT_OFF_SERVER)
        start = Start(self.copy, ["node", "scripts/local-start.mjs"])
        self.starts.append(start)
        answer, ended = answer_until_end(start.port, request_bytes(start.port, "GET", "/"))
        self.assertTrue(ended, "the browser was left waiting: " + repr(answer))
        self.assertTrue(answer.startswith(b"HTTP/1.1 200"), answer)
        self.assertIn(b"partial", answer)
        self.assertFalse(answer.endswith(b"0\r\n\r\n"), "the cut answer ends as a whole one")
        self.assertTrue(wait_until(lambda: proxy_lines(start)), start.output())
        lines = proxy_lines(start)
        self.assertEqual(len(lines), 1, start.output())
        self.assertEqual(json.loads(lines[0])["code"], "ECONNRESET")

    def test_a_browser_that_leaves_in_the_middle_of_a_request_leaves_no_failure_line(self):
        # Task item 18: the line that follows is the one of the dropped request alone, and it
        # comes after the held request's connection has ended on the server's side.
        code, output = self.copy.npm("run", "build")
        self.assertEqual(code, 0, output)
        write_stand_in(self.copy, HOLDING_SERVER)
        start = Start(self.copy, ["node", "scripts/local-start.mjs"])
        self.starts.append(start)
        context = tls_context()
        with socket.create_connection(("127.0.0.1", start.port), timeout=support.HTTP_TIMEOUT) as raw,                 context.wrap_socket(raw, server_hostname="127.0.0.1") as secure:
            secure.sendall(request_bytes(start.port, "GET", "/hold"))
            self.assertTrue(wait_until(lambda: "held /hold" in start.output()), start.output())
        self.assertTrue(wait_until(lambda: "closed /hold" in start.output()), start.output())

        status, _, _ = exchange(start.port, request_bytes(start.port, "GET", "/drop"))
        self.assertEqual(status, 502, "precondition: a dropped request leaves a line")
        self.assertTrue(wait_until(lambda: proxy_lines(start)), start.output())
        self.assertEqual(len(proxy_lines(start)), 1, start.output())


if __name__ == "__main__":
    unittest.main()
