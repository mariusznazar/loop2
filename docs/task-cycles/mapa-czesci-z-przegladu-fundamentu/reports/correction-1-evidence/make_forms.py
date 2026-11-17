"""Write variants of deploy.yml for the forms the row of the table names as unread.
Usage: python -B make_forms.py <repository root>."""

import os
import sys

root = sys.argv[1]
out = os.path.join(root, ".runs", "author", "variants")
os.makedirs(out, exist_ok=True)
with open(os.path.join(root, ".github", "workflows", "deploy.yml"), encoding="utf-8", newline="") as f:
    base = f.read()

CALL = '          ssh -i "$key_file" -p "$SSH_PORT" \\\n'
STRICT = "-o StrictHostKeyChecking=yes"
PROBE = "      - name: Probe the public addresses\n        run: |\n"
for part in (CALL, STRICT, PROBE):
    assert base.count(part) == 1, part

broken = base.replace(STRICT, '-o "StrictHostKeyChecking no" ' + STRICT)
E = "${{ github.event.head_commit.message }}"
variants = {
    "D1-decoy-echo-ssh-before-call": broken.replace(
        CALL, "          echo ssh -o StrictHostKeyChecking=yes -o BatchMode=yes\n" + CALL),
    "D2-bundled-4o-before-the-yes": base.replace(
        'ssh -i "$key_file"', 'ssh -4o "StrictHostKeyChecking no" -i "$key_file"'),
    "D3-line-starting-with-ssh-before-call": broken.replace(
        CALL, "          ssh -V -o StrictHostKeyChecking=yes -o BatchMode=yes\n" + CALL),
    "D4-script-line-starting-with-run-then-expression": base.replace(
        "          umask 077\n", "          umask 077\n          run: note\n          echo " + E + "\n"),
    "D5-inline-mapping-step": base.replace(
        PROBE, "      - { name: Echo, run: 'echo " + E + "' }\n" + PROBE),
    "D6-quoted-key": base.replace(PROBE, "      - name: Echo\n        \"run\": echo " + E + "\n" + PROBE),
}
for name, text in variants.items():
    assert text != base, name
    with open(os.path.join(out, name + ".yml"), "w", encoding="utf-8", newline="") as f:
        f.write(text)
print(len(variants))
