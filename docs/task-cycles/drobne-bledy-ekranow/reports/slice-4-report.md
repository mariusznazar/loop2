# Slice 4 report — the unit beside the number field of the rule panel

**Status:** done with concerns

## Commits

- `8a4194c5` fix: :bug: stand the unit of a condition's number beside the number field of the rule panel, taken from the condition's data
  (range `a4bab0a7..8a4194c5`, 2 files, +71 −28 in total)

## Files changed

- `src/browser/view/rule-panel.tsx` (+32 −24; the number field's row is wrapped in `rule-panel-value`, the unit span is added after the number span)
- `tests/view/rule-editor.test.mjs` (+39 −4): new case „the number field of the panel stands with the unit of its condition beside it”; three expectations that read the unit of Slice 3's sentence, plus the acceptance criterion's expectation, updated.

## What changed

- `rule-panel.tsx`: the number field of the rule panel now shows the unit of its condition, read from `CONDITIONS[condition.kind].unit` in `src/browser/sim/data/conditions.ts`, in a `span.rule-panel-unit` beside the number field. The field is wrapped in the existing `span.rule-panel-value` (inline-flex, gap) so the unit sits in the same row. `ReactNumberField` is untouched; the number commit path and the focus/Enter handlers are unchanged.
- `rule-editor.test.mjs`: the new case mounts the panel on the number field for `campfireLeftBelow` (expects „min”), `satietyBelow` („%”) and `temperatureBelow` („°C”) and asserts the unit text and that the unit's parent holds the number input.
- Expectations changed from the Slice 3 sentence without unit to the sentence with unit: `"Sytość poniżej 30"` → `"Sytość poniżej 30 %"` (header test and folded-group test), `"Zapas poniżej 8 · Patyk"` → `"Zapas poniżej 8 szt. · Patyk"` (row test and acceptance test). Reason for the change: the task's line 16/row 16 and point 3 (Slice 3 put the unit into the sentence of a rule); the values are the data's units, not derived from the code under test.

## Checks

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/rule-editor.test.mjs` (baseline, before any edit) | 1 | 3 failing: the header test, the folded-group test, the acceptance test — each „expected "… poniżej …", got "… szt./%…"” |
| 2 | `npm test -- tests/view/rule-editor.test.mjs` (after the new case was added, before the rule panel change and before the expectations were updated) — **the red run** | 1 | new case fails: `campfireLeftBelow: expected "min", got undefined` (the failure is at the assertion, for the expected reason) |
| 3 | `npm test -- tests/view/rule-editor.test.mjs` (after the change) | 0 | 76 tests pass, 0 failing |
| 4 | `npm test -- tests/view/program-panel.test.mjs` (the slice's second check) | 0 | 53 tests, 0 failing |
| 5 | `npx prettier --check src/browser/view/rule-panel.tsx tests/view/rule-editor.test.mjs` | 0 | all files formatted (the test file was re-formatted with `prettier --write` after my edit; the diff was line wrapping only) |
| 6 | `npx eslint src/browser/view/rule-panel.tsx` | 0 | clean |

Not run: the full suite (`npm test` without a file), per the handoff. The screenshot / running-product check of `ui_check.md` was not performed (see the own-work check and the concerns).

The logs of checks 1, 3 and 4 are kept beside this report: `reports/slice-4-baseline-rule-editor.txt`, `reports/slice-4-green-rule-editor.txt`, `reports/slice-4-check-program-panel.txt`; the red run is `reports/slice-4-red-rule-editor.txt`.

## Own-work check

- **Requirement most likely not met:** the unit stands *beside* the number field, in the same row, and not below it (the field is a column: label, then its value). A unit placed below the number, or outside the field's row, would pass the text assertions and still miss the requirement.
- **Check that would catch it:** the new case asserts that the `.rule-panel-unit` span's parent element contains the number input (structural, in jsdom), plus the text „min”, „%”, „°C”.
- **Run and result:** check 2 (red, unit absent: failed on the unit text); check 3 (green, the row structure holds). jsdom does not lay out boxes, so the visual placement was **not** verified in a browser.
- **Mutation in head:** removing the unit span, using a wrong condition's unit (e.g. the time), or placing the unit outside the row are caught by the new case; a wrong unit that comes from another condition of the same kind would be caught by the three-kind table.

## Questions and concerns

1. **Visual role of the unit (for the orchestrator).** The unit span `rule-panel-unit` has no CSS rule of its own. It inherits the panel's text colour `--text` (the `.rule-panel` rule sets `color: var(--text)`), which fits the styleguide's rule for a text on a panel background. The styleguide's roles could also make the unit a `text-secondary` dopisek or a `text-label`; I did not choose a role because `src/browser/program-panel.css` is outside this slice's *Change* list, and `rule-panel-time` (the existing class) carries the name of a time, and the styleguide's `text-label` is for names of fields or dates. Recommendation: accept `text` now; if the human wants a secondary look, a later slice adds one rule in `src/browser/program-panel.css` with a token role. Cost of the alternative now: one CSS rule plus a styleguide check of the new role (small). Cost of accepting as is: the unit is as dark as the number, which is the same as the sentence of the rule.
2. **Screenshot not taken.** `ui_check.md` asks for a screenshot of the running product by the route the foundation settles, for any change that alters what a screen shows. I did not open `.claude/skills/loop2-play/SKILL.md` (the route) and did not run the browser, because the handoff limits checks to the slice's focused ones. The own-work check of the layout is therefore unperformed. The orchestrator should decide whether a browser look is required before the request.
3. **Wrapper class reuse.** The number field's row reuses the existing class `rule-panel-value` (inline-flex, gap) instead of a new one, so no CSS changed. This class is also used by the non-number fields for a value button; the test „the fields of a rule stand in the order …” and the other field tests still pass, so the reuse is safe in jsdom. Not checked in a browser.

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md` itself: not opened; the passages at `:27` and `:211` were taken from the handoff, which carries them word for word.
- `tests/view/rule-editor.test.mjs`: read at lines 1–1131 and 1137–1300 (partly; lines 1132–1136 and 1300–2020 not read). The rest of the file passed in check 3 with exit 0.
- `tests/view/program-panel.test.mjs`: not read (run only, check 4).
- `src/browser/view/program-editor.ts`: read 800–889 (covers 826–862).
- `guidelines/styleguide-browser-view.md`: read whole (three pages). `guidelines/testing.md`: read whole (two pages, to line 487). `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/ui_check.md`, `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/change/slice.md`: read whole.
- Decisions read: D-306 (`foundations/decisions.md:9258-9304`), D-376 (`7760-7778`), D-395 (`4496-4510`), D-44 (`4750-4764`). Invariant `document-test-memory-limit` (`foundations/invariants.md:1188-1197`) read; it does not bind this slice's test (the test file uses the existing page document).
- `.the-way/task-cycle/change/reserved_choices.md`: not read; no reserved choice arose (no language, library or store chosen).
- `.claude/skills/loop2-play/SKILL.md`: not read (see concern 2).

## Searches not found or unclear

- The screenshot route for this product: the foundation's settled route (`ui_check.md` says "by the route its foundation settles") was not located by me; I did not search for it beyond the skill's name in `AGENTS.md`.
- The handoff's *Read* lists `src/browser/view/program-editor.ts:826-862` and `src/browser/sim/data/conditions.ts`; both matched the handoff's description (the unit field `unit` of `CONDITIONS`; `conditionSentence` for Slice 3's sentence). Nothing unclear there.
- None other.

## Reaches beyond the handoff

- `tests/view/rule-editor.test.mjs`: four expectations (three in the handoff's scope of "rows and headers", plus the acceptance test at its sentence assertion) were changed; this is inside the file the slice names.
- Ran `npx prettier --write` on `tests/view/rule-editor.test.mjs`; the file was clean before my edit, and the write changed only the lines I added or changed.
- No other file changed. No CSS changed.

## Working copies

- No worktree, clone, script or screenshot was made by me. Scratch output of the checks went to `.runs/slice-4/` (test logs and two copies of the test file used to compare formatting); the logs were copied to `reports/` beside this report, and the copies and the directory `.runs/slice-4/` were removed. Nothing remains there.
