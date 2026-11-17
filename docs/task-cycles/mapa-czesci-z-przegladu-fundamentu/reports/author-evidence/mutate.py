"""Applies one mutation at a time to the scratch worktree .runs/author/wt, runs one test file,
lists the tests that fail, restores the file and runs the file again. Output: JSON (ASCII) to
the path given as the first argument."""

import json
import re
import subprocess
import sys

WT = ".runs/author/wt"

NODE_TESTS = {
    "S": "tests/view/screen-address.test.mjs",
    "E": "tests/view/email-confirmation.test.mjs",
    "P": "tests/view/password-reset.test.mjs",
}
PY_TEST = "tests.deploy.test_deploy_workflow"

SA = "src/browser/view/screen-address.ts"
EC = "src/browser/view/email-confirmation.ts"
PR = "src/browser/view/password-reset.ts"
DY = ".github/workflows/deploy.yml"

TOKEN_FORM = "/^[A-Za-z0-9_-]{43}$/"

MUTATIONS = [
    ("S1", SA, "const CHARACTER = /^#\\/postac\\/([1-9][0-9]*)$/;",
     "const CHARACTER = /^#\\/postac\\/([1-9][0-9]*)$/i;"),
    ("S2", SA, "return Object.hasOwn(MAPS, name) ? (name as MapId) : null;",
     "return name as MapId;"),
    ("S3", SA, "export function readScreenAddress(hash: string): Screen | null {\n",
     "export function readScreenAddress(hash: string): Screen | null {\n"
     "  if (hash.startsWith(\"#confirm-email=\")) return { kind: \"headquarters\" };\n"),
    ("S3b", SA, "export function readScreenAddress(hash: string): Screen | null {\n",
     "export function readScreenAddress(hash: string): Screen | null {\n"
     "  if (hash.startsWith(\"#reset-password=\")) return { kind: \"headquarters\" };\n"),
    ("S4", SA, "    case \"character\":\n      return hasCharacter(state, named.characterId)\n"
     "        ? named\n        : { kind: \"headquarters\" };\n    case \"run\":",
     "    case \"character\":\n      return named;\n    case \"run\":"),
    ("S5", SA, "      return owner ? named : { kind: \"headquarters\" };",
     "      return named;"),
    ("S6", SA, "      return canSendMap(state.solvedMaps, named.mapId)\n        ? named\n"
     "        : { kind: \"headquarters\" };",
     "      return named;"),
    ("S7", SA, "      return state.programs.some((program) => program.id === named.programId)\n"
     "        ? named\n        : { kind: \"programs\" };",
     "      return named;"),
    ("S8", SA, "      if (state.run?.character.id === named.characterId) return named;\n"
     "      return hasCharacter(state, named.characterId)\n"
     "        ? { kind: \"character\", characterId: named.characterId }\n"
     "        : { kind: \"headquarters\" };",
     "      return named;"),
    ("S9", SA, "  if (named === null) return { kind: \"headquarters\" };",
     "  if (named === null) return { kind: \"programs\" };"),
    ("S10", SA, "export function readScreenAddress(hash: string): Screen | null {\n",
     "export function readScreenAddress(raw: string): Screen | null {\n"
     "  const hash = decodeURIComponent(raw);\n"),
    ("E1", EC, "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;",
     "  return hash.startsWith(FRAGMENT_PREFIX) &&\n"
     "    " + TOKEN_FORM + ".test(hash.slice(FRAGMENT_PREFIX.length))\n"
     "    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;"),
    ("E2", EC, "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;",
     "  const at = hash.indexOf(\"confirm-email=\");\n"
     "  return at >= 0 ? hash.slice(at + 14) : null;"),
    ("E6", EC, "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;",
     "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? decodeURIComponent(hash.slice(FRAGMENT_PREFIX.length))\n    : null;"),
    ("E3", EC, "    await client.confirmEmail(token),",
     "    await client.confirmEmail(token.toLowerCase()),"),
    ("E4", EC, "  const { notice, definitive } = confirmationOutcome(\n",
     "  await client.confirmEmail(token);\n  const { notice, definitive } = confirmationOutcome(\n"),
    ("E5", EC, "  if (token === null) return null;\n",
     "  if (token === null) return null;\n  address.clearFragment();\n"),
    ("P1", PR, "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;",
     "  return hash.startsWith(FRAGMENT_PREFIX) &&\n"
     "    " + TOKEN_FORM + ".test(hash.slice(FRAGMENT_PREFIX.length))\n"
     "    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;"),
    ("P2", PR, "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;",
     "  const at = hash.indexOf(\"reset-password=\");\n"
     "  return at >= 0 ? hash.slice(at + 15) : null;"),
    ("P3", PR, "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;",
     "  if (hash.startsWith(\"#confirm-email=\")) return hash.slice(15);\n"
     "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;"),
    ("P4", PR, "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? hash.slice(FRAGMENT_PREFIX.length)\n    : null;",
     "  return hash.startsWith(FRAGMENT_PREFIX)\n    ? decodeURIComponent(hash.slice(FRAGMENT_PREFIX.length)).trim()\n    : null;"),
    ("D1", DY, "\"$SSH_USER@$SSH_HOST\" \"$DEPLOY_SHA\"", "\"$SSH_USER@$SSH_HOST\" \"${{ github.sha }}\""),
    ("D2", DY, "ssh -i \"$key_file\" -p \"$SSH_PORT\"", "ssh -i \"$key_file\" -p \"${{ secrets.DEPLOY_PORT }}\""),
    ("D3", DY, "StrictHostKeyChecking=yes", "StrictHostKeyChecking=no"),
    ("D4", DY, "StrictHostKeyChecking=yes", "StrictHostKeyChecking=accept-new"),
    ("D5", DY, " -o BatchMode=yes", ""),
    ("D6", DY, "          SSH_KNOWN_HOSTS: ${{ secrets.DEPLOY_KNOWN_HOSTS }}\n",
     "          SSH_KNOWN_HOSTS: ${{ secrets.DEPLOY_KNOWN_HOSTS }}\n          EXTRA: ${{ secrets.DEPLOY_EXTRA }}\n"),
    ("D7", DY, "          chmod 600 \"$key_file\"\n",
     "          chmod 600 \"$key_file\"\n          echo \"$SSH_KEY_BASE64\"\n"),
    ("D8", DY, "SSH_HOST: ${{ secrets.DEPLOY_HOST }}", "SSH_HOST: ${{ secrets.DEPLOY_HOST }}\n          SSH_HOST_COPY: ${{ secrets.DEPLOY_HOST }}"),
]


def read(path):
    with open(WT + "/" + path, encoding="utf-8", newline="") as handle:
        return handle.read()


def write(path, text):
    with open(WT + "/" + path, "w", encoding="utf-8", newline="") as handle:
        handle.write(text)


def run_tests(mutation_id, build):
    if build:
        built = subprocess.run(["node", "scripts/build.mjs"], cwd=WT, capture_output=True, text=True)
        if built.returncode != 0:
            return {"exit": "build-failed", "failed": [], "detail": built.stdout[-300:] + built.stderr[-300:]}
    if mutation_id[0] in NODE_TESTS:
        cmd = ["node", "--test", "--test-reporter=tap", NODE_TESTS[mutation_id[0]]]
        done = subprocess.run(cmd, cwd=WT, capture_output=True, text=True, encoding="utf-8")
        failed = re.findall(r"(?m)^not ok \d+ - (.*)$", done.stdout)
        return {"exit": done.returncode, "failed": failed}
    cmd = ["python", "-B", "-m", "unittest", PY_TEST]
    done = subprocess.run(cmd, cwd=WT, capture_output=True, text=True, encoding="utf-8")
    failed = re.findall(r"(?m)^(?:FAIL|ERROR): (\S+)", done.stderr)
    return {"exit": done.returncode, "failed": failed}


def main(out_path, only):
    results = {}
    for mutation_id, path, old, new in MUTATIONS:
        if only and mutation_id not in only:
            continue
        original = read(path)
        if original.count(old) != 1:
            results[mutation_id] = {"error": "old text found %d times" % original.count(old)}
            continue
        build = path.endswith(".ts")
        try:
            write(path, original.replace(old, new))
            broken = run_tests(mutation_id, build)
        finally:
            write(path, original)
        restored = run_tests(mutation_id, build)
        results[mutation_id] = {"file": path, "broken": broken, "restored": restored}
    with open(out_path, "w", encoding="utf-8") as handle:
        json.dump(results, handle, indent=1, ensure_ascii=True)
    for key, value in results.items():
        if "error" in value:
            print(key, value["error"])
            continue
        print(key, "broken exit", value["broken"]["exit"], "n failed", len(value["broken"]["failed"]),
              "restored exit", value["restored"]["exit"])


main(sys.argv[1], sys.argv[2:])
