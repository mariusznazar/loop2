# Report — slice 3 (persisted by the orchestrator from the executor's returned message; the executor could not write the file: its agent rule against report files overrode the path)

**Status: done with concerns.** Slice 3 is committed as `a4bab0a7` on `task/drobne-bledy-ekranow`.

**Commit:** `a4bab0a7` "fix: :bug: write the unit of a condition's number beside the number in the sentence of a rule, before the target". Files: `src/browser/view/program-editor.ts`, `tests/view/program-editor.test.mjs`, `tests/view/chronicle-entries.test.mjs`.

**What changed:** `conditionSentence` now reads the unit from the condition's data (`CONDITIONS[kind].unit`, typed as `ConditionDef`) and writes it after the number. Examples: "Zapas poniżej 8 szt. · Patyk", "Zostało mniej niż — ognisko 20 min", "Temperatura poniżej 35 °C". Expectations changed: four in `program-editor.test.mjs` and one in `chronicle-entries.test.mjs` (satiety "40 %"). Added assertions for "Sytość poniżej 40 %" and "Zdrowie poniżej 8 pkt". No expectation was weakened.

**Checks** (all run from the worktree root):
1. Red run, before the code change: `npm test -- tests/view/program-editor.test.mjs`, exit 1. Two tests fail on the new expectations: "a row reads as a sentence…" and "a group's summary…". 53 of 55 pass. Log: `slice-3-check-1-red-program-editor.log`.
2. `npm test -- tests/view/program-editor.test.mjs`, exit 0, 55 of 55 pass.
3. `npm test -- tests/view/chronicle-entries.test.mjs`, exit 0, 13 of 13 pass.
4. `npm test -- tests/view/end-window-lines.test.mjs`, exit 0, 11 of 11 pass. No change needed.
5. `npm test -- tests/invariants/test_content_identifiers.py`, exit 0, "Ran 4 tests, OK".
- Extra, not in Checks: `npx eslint src/browser/view/program-editor.ts` exit 0; `npx prettier --check` on the three changed files exit 0.
- Not run: `tests/view/rule-editor.test.mjs` (expected to fail on four rows and headers, which Slice 4 covers); `tests/sim/data.test.mjs` (Slice 1's test); the full suite (not the executor's to run).

**Own-work check:** Requirement: every place that writes a rule's sentence writes the unit beside the number. The red run is the mutation check: old code against the new expectations fails. Caller grep: `ruleSentence` and `groupSummary` are the only writers that the player's rule paths use. Their callers are `rule-list.tsx`, `chronicle-entries.ts` and `end-window-lines.ts`, and all of them go through `conditionSentence`. Not met on this head: `src/browser/view/combat-line.ts:13-19` still writes the wolf's number without its unit. That is planned for Slice 5 in `plan.md`, so it is not a miss in this slice.

**Questions and concerns:**
1. Foundation drift. `foundations/decisions.md` still shows the old sentence form in D-288 (lines 8807 and 8839) and D-295 and another decision (lines 9036 and 9200), such as "Zapas poniżej 8 · Patyk". These texts are now stale. The executor did not edit them because foundation entries go only through the-way skills and the plan does not assign them. Recommendation: re-record them in the cycle's foundation step with `the-way-record-decision`.
2. UI check not performed. This change alters what screens show. The executor checked the states in code: the change is text only and no state changed. No screenshot was taken and `.claude/skills/loop2-play/SKILL.md` was not read to see whether it settles a screenshot route, so the screenshot is marked unchecked. Recommendation: take one after Slices 4 and 5, when every sentence carries its unit.
3. Slice 4 dependency. At this head, `rule-editor.test.mjs` fails on its four expectations (current lines 196, 201, 593 and 1142). The executor has not run it to confirm this.

**Unread material:** `task.md` itself was not opened; the executor used the passages that the handoff copies word for word. Everything else the handoff named was read whole (`coding.md`, `testing.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`, `status-row.ts`, `conditions.ts`, and the decision and invariant ranges D-376, D-288, D-292, D-342, D-368, content-identifiers, document-test-memory-limit). `program-editor.ts` and the two test files were read whole before editing.

**Searches not found or unclear:**
- `src/browser/sim/understanding.ts:205` writes `CONDITIONS[condition.kind].label`. I did not check whether it writes a sentence with a number. It is in `sim/`, outside this slice.
- Whether `.claude/skills/loop2-play/SKILL.md` settles a screenshot route: not read.

**Reaches beyond the handoff:** read `plan.md` lines 150–215 to confirm the Slice 4 and 5 split, and `task.md` lines 95–100 to confirm that the chronicle quoting belongs to Slice 11. Read `.the-way/task-cycle/change/ui_check.md` and the git rules (a hook asked for them before the commit). Grepped `foundations/` for stale sentence examples.

**Working copies:** none were made. `.runs/slice-3/` held only the test logs; they were moved to `reports/` (`slice-3-check-1` to `slice-3-check-5`) and the directory removed.
