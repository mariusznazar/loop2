# Prompt — foundation-step agent F2 (correction 2)

You are a fresh agent in the-way's autonomous task cycle for the loop2 application skeleton (PR https://github.com/mariusznazar/loop2/pull/3). The orchestrator (Claude Opus 5.5) runs the cycle under the task owner's delegation. Questions return to the orchestrator in your reply; never ask the human; you approve nothing for the human — the human's approvals are given below.

- Worktree: C:\Storage\repos\loop2-skeleton, branch task/app-skeleton, HEAD 0b96e9e. the-way pinned at 96c52488752701ffa321ca69c0c2aa2dd3e46d2d as `.the-way` (run its scripts from the repository root as `python -B .the-way/...`). You are the only agent writing in this worktree.
- Write boundary: foundations/decisions.md, foundations/invariants.md, foundations/part_map.md (glossary or environment facts only if a rule below forces it — then ask first), and your report files under .runs/task-cycles/app-skeleton/reports/correction-2/. No code, no tests, no package files, nothing in .the-way; no commits.
- Stage boundary: entries written through the skills, guards run; return.
- Use the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-update-part-map` (and read `.the-way/elements/common/way_of_working.md`, `rules.md`, each element's template and examples) — never an unprefixed personal skill. These skills normally show the human the wording first (WAY-114); here the human already saw every entry whole with a Polish translation and accepted it in PR comment 6002054885, so you write without asking. Wherever a field differs from the accepted text below, stop and ask instead of writing.
- Source of the accepted wording (read in full): `.runs/task-cycles/app-skeleton/reports/correction-1/return/UNAPPROVED-proposed-foundation-against-ab34d90.patch` (the current proposal version, against ab34d90; foundations/ has not changed since) and `.runs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md` (Polish beside each entry, questions T1–T12). Human answers: `.runs/task-cycles/app-skeleton/reports/correction-2/review-comment.md`.

## Rulings (from the human's answers)

1. Part map (T1a, T1b, T1c): write the five parts browser-view, account-server, build-tools, agent-workflow, product-foundation exactly as in the patch (responsibility sentence, Files, Depends on — the draft with the mutual account-server ↔ build-tools dependency, accepted as an open point — Trust boundary, External context rows), with **Failure modes: none** in all five and the criticality scale left empty. Add two invariant test files that a separate agent is writing now: `tests/invariants/test_loop2_one_serving_process.py` to account-server and `tests/invariants/test_application_build_output.py` to build-tools. Every tracked file must belong to exactly one part.
2. D-01, D-02, D-03: Scope and Relations as in the patch (D-01 derives from D-07@8ab1f8bc; D-03 derives from D-04@b703ab2a). These fields are outside the binding sentences; the entries keep version 1 and Approved by `Mariusz, 2026-10-04`. D-02 keeps `invariants:` (T10).
3. New decisions, wording from the patch, **Approved by `Mariusz, 2026-10-05`** (the acceptance date, never the gate date):
   - D-04/1 "What is the game built with?" (T2) as in the patch.
   - D-05/1 "What serves the built game and account requests in the container?" (T3) with Relations `derives from D-02@06e6d3d8`, Verification `level 1 — invariants: loop2-one-serving-process · loop2-api-error-route`.
   - D-06/1 "How are the browser and server built together?" (T6) as in the patch, except **Verification: `level 1 — invariants: application-build-output`** — application-build-layout is deferred by the human (T6), so D-06 cannot name it.
   - D-07/1 "How is the work of the game split between the server and the browser?" (T4) as in the patch.
4. Invariants, Approved-by-free form per the template:
   - loop2-api-error-route/1: Derives from `D-05@<fingerprint>`; nothing else changes.
   - loop2-one-serving-process/1 (T5): sentence, Derives from, Part `every` as in the patch; **Method** = `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` (its check is being written now).
   - application-build-output/1 (T6): sentence, Derives from, Part as in the patch; Method = the same gate command.
   - Do NOT write application-build-layout, public-file-boundary, account-server-occupied-address (deferred) or missing-page-response (T6.2: not recorded). Withdrawn-identifier lists change only if a rule requires it — ask first.
5. Fingerprints: compute with the-way's own code (guard/shared), confirm D-04 b703ab2a, D-05 e11aec4d, D-06 094e6fa7, D-07 8ab1f8bc, loop2-one-serving-process 1e0b09c2; any mismatch is a question, not an edit.
6. Search the whole foundation for collisions (way_of_working step on search) and report what you found.

## Checks you run (report command, exit code, error and warning lines)

- Each changed file's format guard with `--base 91ee59e295b8e0b024c4af1d4d1318738ab8f29e`, then with `--base 91ee59e295b8e0b024c4af1d4d1318738ab8f29e --merge-onto 91ee59e295b8e0b024c4af1d4d1318738ab8f29e` (the part map's guard takes no `--merge-onto`). Also run the glossary and environment-facts guards both ways (unchanged files; references may move).
- Expected: the two new test files do not exist yet in this worktree; the part-map guard may report them or the invariants guard / gate may report the missing checks — list such lines separately as "expected until checks land", do not work around them.

## Report

Full report: `.runs/task-cycles/app-skeleton/reports/correction-2/foundation-step.md` (what was written, fingerprints, search result, guard outputs, questions). Write Polish text only to files, never to stdout. Reply to the orchestrator in at most 25 lines, questions first.
