# Return step report — task `drobne-poprawki-po-pr-92-94`

**Status:** `done`. Head before the step `a203324d`; one commit, `c4a9aaf5`. Checks: `python -B .the-way/elements/common/foundation_check.py` → 0 errors (run after the change); `check_instructions.py` not run again (neither `AGENTS.md` nor a skill changed in this step; its last run, after the fix, was 0 error).

## Foundation compared with code

| Entry | Against | Result |
|---|---|---|
| D-207 (*Rationale*, *Rejected*) | no code; binding sentences untouched; quotations of it in tests are of binding sentences | matches |
| D-376 | `conditions.ts` (`defaultValue` 8 and 1, ranges), `newCondition` | matches: it states the numbers a condition starts with and says nothing of the item; the item is D-423's (derives from D-376). No sentence of D-376 changes. |
| D-423 (new) | `conditions.ts` (`defaultItem: "stick"`), `program-editor.ts` (`newCondition`, used by the editor and by the rule a discovery adds), the test in `program-editor.test.mjs` | matches: Patyk where offered, else the first offered item; *Verification* `tests:` names what the test holds |
| D-424 (new) | `tests/quality/quality_environment.py`, `test_quality_invariants.py` (`setUpClass`), `test_quality_environment.py` (7 cases), README, AGENTS.md | one mismatch: *Verification* did not name the tool that is at the pinned version but does not run, which the code handles (`--version` exit) and the case added in the fix holds. **Corrected:** the clause now reads "…at another version than the pinned one, or with a tool that does not run, made again…". Rest matches (readiness, `venv --clear` and install with hashes, one message, no skip; costs in *Rationale*, M4 included). |
| D-396 | environment fact `playwright-firefox-webkit-releases`; no code | matches |
| D-153 | environment facts `loop2-app-log-password-reset-mail-events` and `loop2-app-log-confirmation-mail-events` | matches the fix: the delivery test run for the password-reset message, the operator's report for the confirmation message, the log's two pairs, external inbox established by no entry |
| `playwright-firefox-webkit-releases` | reading of 2026-11-17, same output as at the head (no code involved) | matches |
| `loop2-app-log-confirmation-mail-events` | the sentence and the output quoted (no "created", no account) | matches |

## Decisions of the touched parts whose sentences the code now makes false

None found. D-30 and D-31 say "local pinned" tools, true (the environment is local). `guidelines/coding.md:51-53` ("testy uruchamiają lokalne kopie, bez pobierania narzędzia przy kontroli") stays true, as the review judged: the download is before the first check, only where the environment is absent. `guidelines/testing.md` has no sentence about the environment of the tools. The "Where in code" list of `coding.md` names `tests/quality/test_quality_invariants.py` but not the new helper; that is no false sentence and an edit of a guideline belongs to the skill that maintains the coding guidelines, so I left it.

## Written

- Decisions written or changed in the step: D-424 *Verification* (above). Written earlier in the change: D-423, D-424, D-207, D-396, D-153.
- Invariants: none (no rule the task, a decision or the human sets that needs one; D-424 is held by tests with `decision:` lines).
- Environment facts: none new in this step. Written in the change: `playwright-firefox-webkit-releases`, `loop2-app-log-confirmation-mail-events`. Sources outside the product that nothing holds: none (the Python Package Index stands in the part map's external context, `foundations/part_map.md` "External context").
- Glossary: no new term. WAY-97 for `loop`, `earning loop`, `loop clock`: the definitions are unchanged and the use of "loop" for the earning loop was rewritten in item 6; 0 prose uses left by the scan of the author's report. No term is used against its entry that I found at the head.
- Part map: no change. `tests/quality/quality_environment.py` and `tests/quality/test_quality_environment.py` are claimed by `build-tools` through `tests/quality/**`; `foundation_check.py` → 0 errors (it reports a file claimed by no part).
- Projected entries: none.
- A choice that binds after the merge: none beyond the rows below; the questions table of the record keeps Q1 and Q2 and I add none. The choice to repair with `venv --clear` and the absence of a lock between two runs are in D-424's *Rationale* (the latter as an accepted cost).

## Rows of *Settlements to record*

| Row | Went to |
|---|---|
| 1 (D-207 keeps the rejection, measured cost) | D-207 *Rejected* |
| 2 (D-207 does not call 480 game minutes the whole map run of Las) | D-207 *Rationale* and *Rejected* |
| 3 (Patyk explicit default of „Zapas poniżej”) | D-423 (new), with the data row `defaultItem` |
| 4 (installed Firefox and WebKit releases older than the CLI expects) | environment fact `playwright-firefox-webkit-releases` |
| 5 (D-396 rejects Firefox on that ground, *Based on* names the fact) | D-396 *Based on* and *Rejected* |
| 6 (the quality test makes `.runs/quality-venv`, one message on failure, no skip) | D-424 (new) |

Nothing was missing; no row needed a new entry in this step.

## Unread material

None beyond what the earlier reports name; for this step I read `return_step.md`, the handoff, D-424, D-423, D-376, the tests and code named above, and `part_map.md` "External context" by search.

## Searches not found or unclear

None.

## Working copies

`.runs/author-return/` (one script) stood in the worktree; removed before return.
