"""Write the variants of deploy.yml under .runs/author/variants/. Argument: the repository root."""

import os
import sys

root = sys.argv[1]
out = os.path.join(root, ".runs", "author", "variants")
with open(os.path.join(root, ".github", "workflows", "deploy.yml"), encoding="utf-8", newline="") as f:
    base = f.read()

PROBE = "      - name: Probe the public addresses\n        run: |\n"
assert base.count(PROBE) == 1


def deploy_step_run_first(text, first_line):
    head, rest = text.split("      - name: Deploy the commit on the server\n", 1)
    step, tail = rest.split("\n      - name: Probe the public addresses\n", 1)
    env_part, script = step.split("        run: |\n", 1)
    script = first_line + script
    new_step = ("      - run: |\n" + script + "\n"
                "        name: Deploy the commit on the server\n" + env_part.rstrip("\n") + "\n")
    return head + new_step + "\n      - name: Probe the public addresses\n" + tail


variants = {
    "honest-as-it-stands": base,
    "honest-run-first-no-expression": deploy_step_run_first(base, ""),
    "deploy-step-run-first-event-expression": deploy_step_run_first(
        base, "          echo ${{ github.event.head_commit.message }}\n"),
    "new-step-run-first-secret": base.replace(
        PROBE, "      - run: |\n          echo ${{ secrets.DEPLOY_HOST }}\n" + PROBE),
    "inline-run-secret": base.replace(
        PROBE, "      - name: Echo\n        run: echo ${{ secrets.DEPLOY_HOST }}\n" + PROBE),
    "inline-run-first-key-secret": base.replace(
        PROBE, "      - run: echo ${{ secrets.DEPLOY_HOST }}\n" + PROBE),
    "folded-block-secret": base.replace(
        PROBE, "      - name: Probe the public addresses\n        run: >\n          echo ${{ secrets.DEPLOY_HOST }}\n"),
    "strip-block-secret": base.replace(
        PROBE, "      - name: Probe the public addresses\n        run: |-\n          echo ${{ secrets.DEPLOY_HOST }}\n"),
    "folded-strip-block-run-first-secret": base.replace(
        PROBE, "      - run: >-\n          echo ${{ secrets.DEPLOY_HOST }}\n" + PROBE),
    "plain-scalar-continuation-secret": base.replace(
        PROBE, "      - name: Echo\n        run: echo one\n          ${{ secrets.DEPLOY_HOST }}\n" + PROBE),
}
for name, text in variants.items():
    assert name.startswith("honest") or text != base, name
    with open(os.path.join(out, name + ".yml"), "w", encoding="utf-8", newline="") as f:
        f.write(text)
print(len(variants))
