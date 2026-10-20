"""Complete reviewer acceptance and preserve the invalid first probe."""

import json
from pathlib import Path
import runpy
import sys

REPORTS = Path(__file__).resolve().parent
runner = runpy.run_path(str(REPORTS / "final-review-runner.py"))
runner["RESULTS"].extend(json.loads(
    (REPORTS / "final-review-executions.json").read_text(encoding="utf-8")
))
runner["case"](
    "break-account-server-express-http-request-listener",
    "account-server-express-http",
    "src/server/reviewer-request.ts",
    'import * as https from "node:https";\n'
    'export const server = https.createServer();\n'
    'server.on("request", (_request, response) => { response.end("bypass"); });\n',
    1,
    "reviewer-authored raw request listener; first empty server probe serviced no routes",
)
runner["run"](
    "part-map",
    [sys.executable, "-B", ".the-way/elements/part-map/format_guard.py",
     "foundations/part_map.md", "--base", runner["BASE"]],
    expected=0, source="unmodified final HEAD scratch", invariant="file-part-assignment",
)
runner["run"](
    "restored-one-serving-process",
    runner["command"]("loop2-one-serving-process"),
    expected=0, source="unmodified final HEAD scratch", invariant="loop2-one-serving-process",
)
runner["run"](
    "restored-express-http",
    runner["command"]("account-server-express-http"),
    expected=0, source="unmodified final HEAD scratch", invariant="account-server-express-http",
)
runner["run"](
    "scratch-status",
    ["git", "status", "--porcelain=v1", "--untracked-files=all"],
    expected=0, source="after restoration of every reviewer case",
)
