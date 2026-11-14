# Return step report

**Status:** done, nothing changed. **Commits:** none (head stays `92ce6ef7`; tree clean).

## Return step (fields of `record_template.md`)

- **Foundation compared with code:** none no longer matched. Compared:
  - D-268, with `tests/view/memory-limit.mjs`: limit `2048 * MIB` (2 GiB), reading every 100 ms (`DEFAULT_INTERVAL_MS = 100`), `process.memoryUsage.rss()`, `SIGKILL` from a worker thread; the comment at line 9 now gives the measurement (24 files, about 2.9 GiB, 1076 MiB, 32 GB). The binding sentence says forty files; no code or guideline holds a file count (`guidelines/testing.md` "Tests on a document imitation" gives the rule without a count; grep for "more than ten", "ten files", "reopen" in `foundations/`, `guidelines/`, `tests/`, `scripts/` finds only D-268).
  - Invariant `document-test-memory-limit` (`foundations/invariants.md:1188`): reads "above 2 GiB", "every 100 ms as `process.memoryUsage.rss()`" and carries no file count; matches the code above.
  - D-04, D-147, D-339, D-347 (chronicle size now measured; only the rarity of a mid-run reload stays unmeasured): consistent with each other (same figures, same conditions, same "leaves out"); D-339 no longer points to the old measurement in D-347. No sentence of `foundations/`, `guidelines/`, `tests/`, `scripts/` or the skills of `.claude`/`.agents` still says the chronicle's size is unmeasured or gives 48/102 entries, 13.4 KB, 9.5 KB, "50 to 60 bytes an entry" or "several hundred entries" (grep over all tracked files except assets and `.the-way`; the remaining hits are the new text, unrelated "unmeasured" in D-29/D-30, hashing and backup decisions, and "eleven times more with a long chronicle" in a *Rejected* about the predecessor game's simulation cost, which is a cost, not a size, and is not replaced by the task).
  - D-208 against `src/server/account-routes.ts:64` (`savedGameLimit = 64 * 1024`) and `src/server/database.ts:127` (`<= 65536`): the 64 KiB limit and the 65 536 bytes used in the entry match. No decision or guideline names the save version (4 or 5) as a number; `guidelines/coding-saved-game.md:100` only names the constant `SAVED_GAME_VERSION` (`src/browser/sim/saved-game.ts:78` = 5), so nothing to correct.
  - D-247: the entry now gives 0.001–0.011 ms and the limit that no measured loop ran 30 days; `src/browser/sim/loop.ts:576`–`:588` still ends the catch-up of a loop at a death that a resurrection does not cover. No other place gives 0.0068 ms.
  - D-03 ("about 218 KB") and D-75: untouched by decision of the human; the *Context* confirms the first (about 217 KiB) and says the second's return condition did not occur; no sentence of either carries a replaced figure.
  - Part map, `product-foundation` (`foundations/**`, depends on none) and `browser-view` (`tests/view/**` includes `tests/view/memory-limit.mjs`): files and dependencies unchanged by the change; the change added no file and moved none.
  - `python -B .the-way/elements/common/foundation_check.py` — `0 errors`, exit 0, at head `92ce6ef7`.
- **Decisions written or changed:** D-268, D-04, D-147, D-208, D-247, D-339, D-347 (by the change in `6e5a2ade` and `92ce6ef7`; none by this step).
- **Invariants written or changed:** none.
- **Environment facts:** none. The measurements are made in the repository's own code on the owner's computer (*Context*), not sources outside the product; the entries state their conditions in the text.
- **Glossary terms:** none. "a game that already knew everything, so that no discovery was made in it" is stated in plain words (see `fix-minor-report.md`); no term is used against its entry.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none (the task is independent, no project definition).
- **Rows of *Settlements to record* written:** row 1 — D-268; row 2 — D-04, D-147, D-339, D-347; row 3 — D-208; row 4 — D-247.

## Carried to the request's list (not fixed)
- The two Minor notes of `reports/review-fix-minor.md`: not read by me and not fixed, as the handoff says; they go to the request's list in the reviewer's words.
- Out of scope, named by the reviewer: D-207 *Rejected*, "16 saves of about 80 KB" (`foundations/decisions.md:4080`), untouched.

## Own-work check
- Requirement most likely unmet: the foundation or guidelines still hold a replaced figure or the sentence "chronicle size unmeasured". Check: `git ls-files | grep -v -E '^(assets|\.the-way|node_modules)' | xargs grep -nIE "13\.4 ?KB|102 (entries|wpis)|50 to 60|50–60|never measured|size of (a|the) chronicle|chronicle'?s? size|0\.0068|lower estimate|2947|6150|7075|1\.68|ten (test )?files|9\.5 KB|several hundred entries|about 10 earning|8 on|218 KB|unmeasured"`, exit 0 (matches). Result: every hit is either the new text of D-04/D-147/D-347, D-03's unchanged "218 KB", or an unrelated word, as listed above. A second grep for chronicle with "estimate|measured|KB|bytes|entries" on `foundations/decisions.md`, and for chronicle with size/measure words in `invariants.md`, `environment_facts.md`, `glossary.md`, `guidelines/` — no stale hit.
- Foundation check as above, exit 0. No test run (nothing changed; the full `npm test` is the orchestrator's).

## Unread material
- `reports/review-fix-minor.md` and `reports/review-whole-change.md`: not read (the handoff names the notes as going to the request's list).
- `.the-way/task-cycle/skill/foundation_step.md` was read in the first run, not again; the skills of the elements (`record-invariant`, `record-glossary-term`, `record-environment-fact`, `update-part-map`) not read, since I wrote nothing through them.
- Part-map entries: read the two touched parts only (`browser-view` lines 3–25 of its entry, `product-foundation` whole); not the rest of `browser-view`'s entry past its *Depends on*.

## Searches not found or unclear
- `grep` found no tracked file besides `foundations/decisions.md` and `tests/view/memory-limit.mjs` carrying any of the old figures.
- Nothing unclear.
