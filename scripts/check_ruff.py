"""Check the Python source and blocking rule set adopted by D-30."""

import argparse
import io
import json
import os
from pathlib import Path
import re
import shlex
import sys
import tokenize

from quality_support import QualityError, discover_files, run_check, run_tool

PARTS = ("browser-view", "simulation", "account-server", "build-tools", "deployment",
         "agent-workflow")

# Frozen membership from ruff-default-rules/1 less D-30's fourteen example rules.
BLOCKING = """
ASYNC100 ASYNC105 ASYNC115 ASYNC116 ASYNC210 ASYNC220 ASYNC221 ASYNC222 ASYNC230 ASYNC251 B002
B003 B004 B005 B006 B008 B009 B010 B012 B013 B014 B015 B016 B017 B018 B019 B020 B021 B022 B023
B025 B026 B029 B030 B031 B032 B033 B035 B039 BLE001 C400 C401 C402 C403 C404 C405 C406 C408
C409 C410 C411 C413 C414 C415 C417 C418 C419 D419 DTZ002 DTZ003 DTZ004 E722 E902 EXE001 EXE002
EXE004 EXE005 F401 F402 F404 F406 F407 F501 F502 F503 F504 F505 F506 F507 F508 F509 F521 F522
F523 F524 F525 F541 F601 F602 F621 F622 F631 F632 F633 F634 F701 F702 F704 F706 F707 F811 F821
F822 F823 F841 F842 F901 FA100 FA102 FLY002 FURB105 FURB122 FURB129 FURB132 FURB136 FURB157
FURB161 FURB162 FURB163 FURB166 FURB168 FURB169 FURB177 FURB181 FURB188 G010 G101 G201 G202
INT001 INT002 INT003 LOG001 LOG002 LOG009 LOG014 LOG015 N999 PERF101 PERF102 PERF402 PGH005
PIE790 PIE794 PIE796 PIE800 PIE804 PIE807 PIE810 PLC0105 PLC0131 PLC0132 PLC0205 PLC0206
PLC0208 PLC0414 PLC3002 PLE0100 PLE0101 PLE0115 PLE0116 PLE0117 PLE0118 PLE0303 PLE0304
PLE0305 PLE0307 PLE0308 PLE0309 PLE0604 PLE0605 PLE0643 PLE0704 PLE1132 PLE1142 PLE1205
PLE1206 PLE1300 PLE1307 PLE1310 PLE1507 PLE1519 PLE1520 PLE1700 PLE2502 PLE2510 PLE2512
PLE2513 PLE2514 PLE2515 PLR0124 PLR0133 PLR0206 PLR1704 PLR1708 PLR1711 PLR1716 PLR1722
PLR1730 PLR1733 PLR1736 PLR2044 PLW0120 PLW0127 PLW0128 PLW0129 PLW0131 PLW0133 PLW0177
PLW0211 PLW0245 PLW0406 PLW0602 PLW0604 PLW0642 PLW0711 PLW1501 PLW1507 PLW1508 PLW1509
PLW2101 PT010 PT014 PT020 PT025 PT026 PT031 PTH124 PTH210 PYI001 PYI002 PYI003 PYI004 PYI005
PYI006 PYI007 PYI008 PYI009 PYI010 PYI012 PYI013 PYI015 PYI016 PYI017 PYI018 PYI019 PYI020
PYI025 PYI026 PYI029 PYI030 PYI032 PYI033 PYI034 PYI035 PYI036 PYI041 PYI042 PYI043 PYI044
PYI045 PYI046 PYI047 PYI048 PYI049 PYI050 PYI052 PYI055 PYI057 PYI058 PYI059 PYI061 PYI062
PYI063 PYI064 PYI066 RET501 RUF008 RUF009 RUF010 RUF013 RUF015 RUF016 RUF017 RUF018 RUF019
RUF020 RUF022 RUF023 RUF024 RUF026 RUF028 RUF030 RUF032 RUF033 RUF034 RUF040 RUF041 RUF046
RUF048 RUF049 RUF051 RUF053 RUF057 RUF058 RUF063 RUF068 RUF101 RUF200 S102 S110 S112 SIM101
SIM103 SIM107 SIM113 SIM114 SIM115 SIM118 SIM201 SIM202 SIM208 SIM210 SIM211 SIM220 SIM221
SIM222 SIM223 SIM401 SIM905 SIM911 T100 TC004 TC005 TC007 TC010 TRY002 TRY004 TRY201 TRY203
TRY401 UP001 UP003 UP004 UP005 UP006 UP007 UP008 UP009 UP010 UP011 UP012 UP014 UP017 UP018
UP019 UP020 UP021 UP022 UP023 UP024 UP025 UP026 UP028 UP029 UP030 UP032 UP033 UP034 UP035
UP036 UP037 UP039 UP040 UP041 UP043 UP044 UP045 UP046 UP047 UP049 UP050 W605 YTT101 YTT102
YTT103 YTT201 YTT202 YTT203 YTT204 YTT301 YTT302 YTT303
""".split()

# Pinned rule_redirects.rs entries whose exact target is in BLOCKING. Deprecated
# spellings suppress the target in both noqa.rs and suppression.rs.
BLOCKING_REDIRECTS = {
    "R501": "RET501", "U001": "UP001", "U003": "UP003", "U004": "UP004",
    "U005": "UP005", "U006": "UP006", "U007": "UP007", "U008": "UP008",
    "U009": "UP009", "U010": "UP010", "U011": "UP011", "U012": "UP012",
    "U014": "UP014", "U017": "UP017", "U019": "UP019", "RUF004": "B026",
    "PIE802": "C419", "PLW0130": "B033", "RUF011": "B035", "PGH002": "G010",
    "TRIO100": "ASYNC100", "TRIO105": "ASYNC105", "TRIO115": "ASYNC115",
    "PLR1701": "SIM101", "PLW0117": "PLW0177", "TRY302": "TRY203",
    "TCH004": "TC004", "TCH005": "TC005", "TCH006": "TC010", "TCH010": "TC010",
}


def python_source(path, data):
    if path.suffix.lower() in {".py", ".pyi", ".pyw"}:
        return True
    first = data.splitlines()[0] if data else b""
    if not first.startswith(b"#!"):
        return False
    try:
        words = shlex.split(first[2:].decode("utf-8"))
    except (ValueError, UnicodeError) as problem:
        raise QualityError(f"unreadable shebang: {path}") from problem
    return any(re.fullmatch(r"python(?:[0-9]+(?:\.[0-9]+)*)?(?:\.exe)?",
                            word.rsplit("/", 1)[-1]) for word in words)


def suppresses_blocking(data):
    try:
        for token in tokenize.tokenize(io.BytesIO(data).readline):
            if token.type != tokenize.COMMENT:
                continue
            # Pinned Ruff's bracket syntax uses exact codes (not noqa prefixes).
            # Scan every sub-comment: an earlier neutral directive cannot hide one.
            for suppression in re.finditer(
                    r"#\s*ruff\s*:\s*(?:file-ignore|disable|ignore)\s*\[([^\]#]*)\]",
                    token.string):
                codes = [code.strip() for code in suppression[1].split(",")]
                if codes[-1] == "":
                    codes.pop()  # The pinned parser permits a trailing comma.
                if codes and all(code and code[0].isalpha() and all(
                        char.isalnum() or char in "_-:" for char in code) for code in codes):
                    if any(BLOCKING_REDIRECTS.get(code, code) in BLOCKING for code in codes):
                        return True
            directive = re.search(r"#\s*(?:(?:ruff|flake8)\s*:\s*)?noqa\b(.*)",
                                  token.string, re.IGNORECASE)
            if directive is None:
                continue
            tail = directive.group(1).lstrip()
            if not tail.startswith(":"):
                return True
            codes = re.match(r"\s*([A-Z]+[0-9]*(?:[\s,]+[A-Z]+[0-9]*)*)", tail[1:])
            if codes is None:
                return True
            if any(rule.startswith(BLOCKING_REDIRECTS.get(code, code))
                   for code in re.findall(r"[A-Z]+[0-9]*", codes[1])
                   for rule in BLOCKING):
                return True
    except (tokenize.TokenError, SyntaxError, UnicodeError):
        # The tool reports invalid source; do not invent a suppression verdict from it.
        pass
    return False


def _diagnostics(result, path):
    if result.stderr.strip():
        raise QualityError(f"Ruff reported stderr: {result.stderr}", result)
    reports = json.loads(result.stdout)
    if not isinstance(reports, list):
        raise QualityError("Ruff output is not a diagnostic list", result)
    for item in reports:
        if not isinstance(item, dict):
            raise QualityError("invalid Ruff diagnostic", result)
        if ("code" not in item or item["code"] not in {*BLOCKING, "invalid-syntax", None}
                or not isinstance(item.get("message"), str) or not item["message"]
                or not isinstance(item.get("filename"), str)
                or Path(item["filename"]).resolve() != path.resolve()):
            raise QualityError("unexpected Ruff diagnostic", result)
        for field in ("location", "end_location"):
            point = item.get(field)
            if not isinstance(point, dict) or any(
                    type(point.get(key)) is not int or point[key] < 1
                    for key in ("row", "column")):
                raise QualityError("invalid Ruff diagnostic location", result)
    if result.returncode != int(bool(reports)):
        raise QualityError("Ruff exit code disagrees with diagnostics", result)
    return reports


def check(root):
    root = Path(root).resolve()
    folder, suffix = ("Scripts", ".exe") if os.name == "nt" else ("bin", "")
    executable = root / ".runs/quality-venv" / folder / ("ruff" + suffix)
    if not executable.is_file():
        raise QualityError(f"local Ruff is unavailable: {executable}")
    environment = {key: value for key, value in os.environ.items()
                   if not key.upper().startswith("RUFF_")}
    version = run_tool([executable, "--version"], cwd=root, env=environment)
    if version.stdout.strip() != "ruff 0.17.1" or version.stderr.strip():
        raise QualityError("Ruff 0.17.1 is required", version)
    valid = True
    for relative in discover_files(root, PARTS):
        path = root / relative
        data = path.read_bytes()
        if not python_source(path, data):
            continue
        result = run_tool([executable, "check", "--isolated", "--no-preview", "--no-fix",
                           "--no-cache", "--ignore-noqa", "--output-format=json", "--select",
                           ",".join(BLOCKING), "--", path], cwd=root, env=environment,
                          accepted_codes=(0, 1))
        reports = _diagnostics(result, path)
        suppression = suppresses_blocking(data)
        if reports or suppression:
            print(json.dumps({"file": relative, "diagnostics": reports,
                              "blocking_suppression": suppression}, ensure_ascii=True),
                  file=sys.stderr)
            valid = False
    return valid


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--record", type=Path)
    args = parser.parse_args()
    return run_check("scripts/check_ruff.py", "ruff-source-rules/1",
                     lambda: check(Path(__file__).resolve().parents[1]), record=args.record)


if __name__ == "__main__":
    sys.exit(main())
