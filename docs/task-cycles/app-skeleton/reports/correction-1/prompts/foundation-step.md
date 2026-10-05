# Prompt — foundation-step agent F (correction 1)

Dispatched by the orchestrator (Claude Opus 5.5), fresh general-purpose agent, inherited model.

- Delegation: orchestrator runs the cycle under the task owner's delegation; questions return to the orchestrator; agent approves nothing for the human.
- Worktree: C:\Storage\repos\loop2-skeleton, branch task/app-skeleton; the-way pinned at 96c52488752701ffa321ca69c0c2aa2dd3e46d2d.
- Write boundary: foundations/decisions.md, foundations/invariants.md, foundations/environment_facts.md (glossary only if R5 requires), and its report files under docs/task-cycles/app-skeleton/reports/correction-1/. No code, tests, package files, .the-way; no commits; no checks (WAY-69).
- Stage boundary: entries written, guards run, partial-proposal file drafted.
- Read first: way_of_working.md, rules.md; decisions, invariants, environment-facts skills, templates, examples and the example entries they name; WAY-126, WAY-114, WAY-19, WAY-17, WAY-71, WAY-73, WAY-90; product foundations/; definition `definicja_mvp_loop2.md` sections "Projected foundation changes" and "Gate record"; both glossaries and the projected glossary.
- Rulings:
  - R1 whole, verbatim from the definition, Approved by `Mariusz, 2026-10-04`: fact node-24-support-schedule/1; D-01/1 "What runs the account and save server?"; D-02/1 "How does the account and save server handle HTTP requests?"; D-03/1 "How is the browser view built?"; invariants account-server-runtime/1, account-server-typecheck/1, account-server-express-http/1, browser-view-framework/1, loop2-api-error-route/1. Prefix D from the human, numbered in this order.
  - R2 deferred fields: Scope TODO (no parts); Relations D-02 derives from D-01@fp, D-01 and D-03 TODO naming the projected parent; invariants Derives from D-01/D-02/D-03@fp, loop2-api-error-route TODO naming "What serves the built game and account requests in the container?"; Part every; Method `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`; Rests on as gate (none) — a template-driven different value is a question, not an edit; any other deviation reported, not made.
  - R3 parts of entries as UNAPPROVED proposals in partial-proposals.md with whole entries and Polish translations: (a) "What is the game built with?" first sentence only; (b) "What serves…" limited to what the one process and the /api error do today; numbered D-04, D-05 as proposed; effect on D-03 Relations and loop2-api-error-route Derives from.
  - R4 every other projected entry not written (named list).
  - R5 projected glossary terms used by written entries are written whole; otherwise "none, after search".
- Obligations: way_of_working steps 1–4 without asking the human; whole-foundation search; fingerprints read off guard/shared code, confirm node-24-support-schedule@6096d00e; each changed file's guard with `--base 91ee59e…` and with `--base 91ee59e… --merge-onto 91ee59e…` (TODO errors expected and listed); part-map guard counts only; Polish text to files, not stdout.
- Report: reports/correction-1/foundation-step.md; reply ≤25 lines with questions.
