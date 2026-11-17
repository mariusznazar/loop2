"""Break one behaviour of a built view module in the scratch worktree, run the test file that marks
page-address-fragment, restore, run it again. Results go to a UTF-8 JSON file; stdout keeps ASCII."""

import json
import re
import subprocess
import sys

WT = sys.argv[1]
OUT = sys.argv[2]
VIEW = WT + "/dist/browser/view/"

MUTATIONS = [
    (
        "V1 confirmation token percent-decoded",
        "email-confirmation.js",
        "hash.slice(FRAGMENT_PREFIX.length)",
        "decodeURIComponent(hash.slice(FRAGMENT_PREFIX.length))",
        "tests/view/email-confirmation.test.mjs",
    ),
    (
        "V2 reset token trimmed",
        "password-reset.js",
        "hash.slice(FRAGMENT_PREFIX.length)",
        "hash.slice(FRAGMENT_PREFIX.length).trim()",
        "tests/view/password-reset.test.mjs",
    ),
    (
        "V3 confirmation token lower-cased before sending",
        "email-confirmation.js",
        "await client.confirmEmail(token)",
        "await client.confirmEmail(token.toLowerCase())",
        "tests/view/email-confirmation.test.mjs",
    ),
    (
        "V4 list of accounts opened for any account",
        "screen-address.js",
        "return owner ? named : { kind: \"headquarters\" };",
        "return named;",
        "tests/view/screen-address.test.mjs",
    ),
    (
        "V5 map off the list of open maps kept",
        "screen-address.js",
        "return canSendMap(state.solvedMaps, named.mapId)",
        "return true || canSendMap(state.solvedMaps, named.mapId)",
        "tests/view/screen-address.test.mjs",
    ),
]


def run(test_file):
    result = subprocess.run(
        ["node", "--test", test_file],
        cwd=WT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    failed = re.findall(r"^not ok \d+ - (.*)$", result.stdout, re.MULTILINE)
    failed += re.findall(r"^✖ (.*?) \(", result.stdout, re.MULTILINE)
    return result.returncode, sorted(set(failed))


def main():
    results = {}
    for name, module, old, new, test_file in MUTATIONS:
        path = VIEW + module
        with open(path, encoding="utf-8", newline="") as handle:
            original = handle.read()
        assert old in original, name
        with open(path, "w", encoding="utf-8", newline="") as handle:
            handle.write(original.replace(old, new, 1))
        broken = run(test_file)
        with open(path, "w", encoding="utf-8", newline="") as handle:
            handle.write(original)
        restored = run(test_file)
        results[name] = {
            "broken_exit": broken[0],
            "failed_tests": broken[1],
            "restored_exit": restored[0],
        }
        print(name.split(" ")[0], broken[0], len(broken[1]), restored[0])
    with open(OUT, "w", encoding="utf-8") as handle:
        json.dump(results, handle, indent=2, ensure_ascii=False)


main()
