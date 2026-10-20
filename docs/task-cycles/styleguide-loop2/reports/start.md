# Start evidence

Task: task.md, frozen from C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/styleguide_loop2.md, approved 2026-10-20, ready for cycle, source only. Human actions: none.
Target origin/main and base dc1f9cf9e9f3713386b6059d8214e588c69e5ba8 (fetched); clean branch styleguide-browser-view, no upstream, isolated worktree C:/Storage/repos/loop2-styleguide. Process gitlink and checkout d829e3aa6242a9b8901274531dd82fd5c7d87628.
Superpowers 6.4.1 present and manifest verified at C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1; five required skill files found. Native subagents available.
Definition source is approved 2026-10-13; gate fingerprint 9e480247; current foundation matches task's dc1f9cf reading. Source-only: no plan dependency.
Parts: browser-view (all screen styling, controls, fonts, state page), build-tools (build, checks), agent-workflow (guidelines and pointers), product-foundation (22 accepted settlements); deployment conditional on chosen font source path.
Sharpness: conservative high until unknown failure modes resolved; icon/font trust boundaries require adversarial checks; reversible local files only, no server operations or merge.
Spec required: source of font binaries, value-file representation, standalone page and mechanical check contracts remain open and set foundation methods/external context. Execution route to be judged after reviewed spec.
Current Scope inspection expected D-01,02,03,04,05,06,12,13,15,18,19,21,23,26,27,28,29,30,31,32,33,36; whole entries read. Explicit D-07 and D-11 and linked D-08/09/22 extend reading. Review discovery must not reuse task's narrower selection unquestioningly.
Guidelines headers and complete kind index inspected. Selected guidelines/coding.md and guidelines/coding-browser-module.md, whole read; general covers scripts, browser-module covers view including controls. CSS deferral D-28 amendment is accepted in task Q17. Missing styleguide is this task's output, not its prerequisite. No simulation changes planned. Re-evaluate on every return.
Wait mechanism: collaboration.wait_agent with 60000 ms maximum under active instruction not to block over 60s; completion notifications supported.
No baseline check run yet. No product changes yet.
Privacy: no secrets or customer data in records. No reading 10x/* branches or loop2-10x / loop-10x. No loop engine or UI repository reading.

## Baseline execution evidence

Actor: root orchestrator, current inherited model. Worktree base dc1f9cf9e9f3713386b6059d8214e588c69e5ba8. All paths below are in reports/.

| Command | Exit | Complete stdout/stderr | Result |
|---|---|---|---|
| npm ci | 0 | baseline-npm-ci.log | local dependencies installed |
| python -m venv .runs/quality-venv; .runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt | 0 | quality-install.log | local quality tools installed |
| npm test | 0 | baseline-npm-test.log | 173 passed, 0 failed/skipped |
| python -B scripts/check_eslint.py | 0 | baseline-eslint.log | passed |
| python -B scripts/check_ruff.py | 0 | baseline-ruff.log | passed |
| python -B scripts/check_format.py | 0 | baseline-format.log | passed |
| python -B scripts/check_shellcheck.py | 0 | baseline-shellcheck.log | passed |
| python -B .the-way/product-guidelines/form_check.py | 0 | baseline-guidelines.log | passed; merge-reference comparison not requested and not run |

Invariant suite is running; not counted as passed. No product edits exist. Review uses Superpowers requesting-code-review 6.4.1 and its code-reviewer.md, read by orchestrator, with cycle fix-bound override. Code-review playbook and referenced document-review playbook read.

## Routing ruling

Task To do 10 names a product adapter that the installed product skill catalogue lacks. Search found .the-way/.agents/skills/the-way-maintain-instruction-files/SKILL.md, but that adapter explicitly belongs to the-way itself. The installed maintain-instruction-files adapter routes this product to its pinned .the-way/instruction-files/SKILL.md; use that underlying pinned method. This preserves the requested method without introducing or changing a skill. Task authorizes placement; cycle delegation supplies provisional intermediate approval, never human approval.

## Provisional design choices

Root provisionally accepted designer's proposed JSON token source with generated CSS, official vendored font files, standalone state-page source/build/output, and explicit control registry with exercised fixtures; awaiting independent spec review. Reason: one editable value source, no new runtime font package, inspectable state coverage. Alternatives/costs belong to full design report. Unsupported syntax in mechanical checks must not silently shrink the promised scope. No screenshot route is settled in current foundation, so state-code inspection is distinct from rendered proof.

Invariant baseline completed: `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/baseline-invariants.jsonl`, exit 0, 141 tests in 293.889 seconds, OK, full stdout/stderr reports/baseline-invariants.log. No baseline failure established by executed checks.
