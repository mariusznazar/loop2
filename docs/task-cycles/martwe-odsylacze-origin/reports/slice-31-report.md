# Slice 31 report

**Status:** done

**Base:** HEAD at start was `312eda1b8aefc51f83de413a2d60ec7a7cd4e1e4` (as in the handoff); worktree clean at start.

**Commit:** `b196f19e` (one commit, task branch `task/martwe-odsylacze-origin`). Files changed (added/removed lines, comments only):
`src/browser/styles.css` (+50/-54), `src/browser/view/away-report.ts` (1/1), `body-row.ts` (4/4), `chronicle-entries.ts` (10/10), `chronicle.ts` (8/8), `discovery-band.tsx` (8/8), `discovery-rule.ts` (5/5), `end-question.tsx` (6/6), `now-rows.tsx` (6/6). `foundations/decisions.md` unchanged: no new decision was needed (see below), so `the-way-record-decision` was not run.

No code changed: a comment-stripped comparison of every changed file against HEAD gives identical code (`cmpcode.mjs` in the scratchpad, exit 0). The stylesheet's rules and values are byte for byte as before.

## Per changed line: old pointer, outcome, entry

Outcomes: "named" = entry named, "written" = entry written, "removed" = pointer gone.

| File:line (new) | Old pointer | Outcome | Entry |
|---|---|---|---|
| styles.css:232 | `task ekran-przejscia, To do 2; task proporcje-sceny-i-programu, To do 1 and 2` | removed (the comment already says what the code needs; D-311, D-282, D-280, D-349 were already named) | D-311, D-282, D-280, D-349 |
| styles.css:302 | `spec D5, D9` (chronicle filter row and list) | removed (comment says it; D-343, D-46 named) | D-343, D-46 |
| styles.css:321 | `spec D7` (window grows by the scroll) | named | D-380 (holds the window that grows by scroll) |
| styles.css:919 | `task edytor-programu, Slice 11` | removed (no information the code needs) | none |
| styles.css:1010 | `task stan-i-powod-przy-regule` (signs of the copy) | named | D-308, D-309, D-310 (bars, backgrounds, reasons; D-308 read whole) |
| styles.css:1528 | `80vh is the executor's choice` (cycle role, not a document) | reworded to "was chosen and checked in a real browser" | none |
| styles.css:1801 | `task scena-z-ludzikiem` | removed (D-316, D-320, D-322 already named) | D-316, D-320, D-322 |
| styles.css:1862 | `task zbieranie-jako-widowisko` (bend) | named | D-364, D-316 (D-364 read whole) |
| styles.css:1894 | `Scene.tsx at commit cdc7c0d, paused ? 'grayscale(1) brightness(0.5)'` | named; the value now stands in the comment, the file and commit go. Game fact kept: "the value the old Loop gave a paused scene" (verified in the snapshot, `old-loop/cdc7c0d/src/components/probe/Scene.tsx:169`) | D-322 (holds `grayscale(1) brightness(0.5)` and the rationale "the one loop gave a paused scene") |
| styles.css:1903 | `the old Loop's value for both (sprites.tsx line 64 at commit cdc7c0d)` | named; the value `grayscale(1) brightness(0.55)` stands in the comment. The claim "old Loop's value for both" is dropped because `sprites.tsx` is not in the snapshot (see Unclear) | D-322 (dead mage), D-316 (extinguished fire) |
| styles.css:1951 | `task zbieranie-jako-widowisko` (end-of-gathering effects) | named | D-317, D-365, D-366, D-367 (D-365 to D-367 read whole) |
| styles.css:1990 | `task scena-z-ludzikiem, To do 5 and 10` | removed (D-316, D-319, D-320, D-317 already named) | D-316, D-319, D-320, D-317 |
| away-report.ts:34 | `(Q19)` | named | D-246 (holds the title "Pętle, które stanęły" where the section has no line of a return) |
| body-row.ts:24 | `spec Decision 3; task plomyk, To do 6` | named | D-57 (temperature in tenths, `Temperatura 36,8 °C`), D-178 (nature energy cut down to a whole number like satiety and health; D-337 shows 36,9 / 34,9 cases) |
| chronicle-entries.ts:2 | `task kronika-z-filtrami, To do 2–7` | removed (D-338 to D-345 already named) | D-338 to D-345 |
| chronicle-entries.ts:215 | `spec D4` | removed | D-342 |
| chronicle-entries.ts:294 | `spec D4, D5` | removed | D-342 (holds "at the game minute of the end") |
| chronicle-entries.ts:348 | `as D3 of the spec tables it` | removed; the decisions stay as the parenthesis | D-340, D-341, D-344, D-345 |
| chronicle.ts:2 | `task kronika-z-filtrami, To do 1–9; spec D2, D6, D7` | named: the spec's D2 (memory of the page), D6 (paragraph) and D7 (long map run) are held by D-339, D-147 and D-380; added D-380 and D-381 (filter pick) beside D-338, D-339, D-346, D-147 | D-338, D-339, D-346, D-147, D-380, D-381 |
| discovery-band.tsx:2 | `task ekran-przejscia, To do 7` | removed | D-122, D-312, D-313, D-39, D-44, D-279 (already named) |
| discovery-rule.ts:2 | `task ekran-przejscia, To do 7` | removed | D-313 |
| end-question.tsx:2 | `task pytanie-przy-zakoncz, To do 1` | removed | D-173, D-172, D-122, D-44, D-39 |
| end-question.tsx:17 | `task pytanie-przy-zakoncz` | removed | D-172 |
| now-rows.tsx:3 | `task teraz-i-potem, To do 1` | removed | D-334, D-335, D-291, D-292, D-311 |

Reflows: where a pointer left a short or over-long line, the surrounding sentences of that comment were rewrapped to about 100 columns; words are unchanged.

No new decision was written: for every pointer the foundation already holds what the code needs (I checked the cited decisions in `foundations/decisions.md`, and for the spec pointers I also read the spec of the cycle `kronika-z-filtrami` and the spec of `ognisko-i-jedzenie` in git history, for D2 to D7 and Decision 3).

## Checks (cwd = worktree root)

| Check | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the eight view files>` | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig src/browser/styles.css <the eight view files>` | exit 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0 (4 tests OK) |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0 ("0 errors") |
| S1 `git grep` (as in the slice) | prints no line, exit 1 (before my change it printed 3 lines in `styles.css`) |
| S2 `git grep` (as in the slice) | prints no line, exit 1 (before: 19 lines) |
| S3 `git grep` (orchestrator's) | 13 hits left, all for the game term "trip plan" ("plan wyprawy"); listed below |
| Wider search (`Row N`, `Finding`, `binding answer`, `Task item`, `review`, `answer N`, `cause N`, `loop2#`, `the definition`, `the concept`, `vault`, `note N`, `item N`, `executor`, `D<n>`, `Q<n>`, `T<n>`, also `definition|reconnaissance|scouting|preview|brief|approved|mockup|screenshot|predecessor|Loop`) | no pointer left. The only hit was `executor` in `styles.css` (fixed, above); the other "loop" hits are the game's "earning loop". |

Not run: the product's gate (`npm test` with no argument), by instruction.

### S2 / S3 lines listed

S2 printed no line after the change. S3 hits, all uses of the word "plan" for the game's trip plan, not a planning document:
`styles.css:809, 819, 919, 923, 929, 937, 944, 949, 955, 959, 1379, 2455, 2468` (the "trip plan" of a program, its classes `.trip-plan*`, "clipped-plan line") and `chronicle-entries.ts:217` (`a changed trip plan`), `:278` (the entry text `"Zmieniono plan wyprawy"`). No "spec", "slice N", "round N", "package N" or `docs/task-cycles` remains.

## Own-work check (section 3)

Requirement most likely not met: "nothing but comments changes" and "no pointer remains in a changed comment as a different form". Checks: (1) comment-stripped comparison with HEAD for all nine files, identical (exit 0); (2) S1, S2 clean; S3 and the wider search read through; (3) typecheck, eslint, prettier, the token-values test and the foundation check all exit 0.

A second risk: a named decision that does not hold what the removed pointer pointed to. I read the cited decisions (D-57, D-178, D-246, D-308, D-316, D-322, D-338 to D-346, D-364 to D-367, D-380, D-381) and the specs for the spec pointers; each statement the comments make is held by the decision named (see the table).

## Reach beyond the dispatch

- Read `foundations/decisions.md` by heading for D-57, D-178, D-246, D-308, D-311, D-316, D-322, D-338 to D-346, D-364 to D-367, D-374, D-380, D-381, D-337, D-362 (whole entries) to decide what each pointer maps to; named gaps of the orchestrator's selection: none except that the handoff did not name D-364 to D-367, D-380, D-381, D-246, D-57 and D-178.
- Read in git history the specs of the cycles `kronika-z-filtrami` (commit `b6f9c544`, headings D1 to D11) and `ognisko-i-jedzenie` (commit `273446fb`, Decision 3) to judge what "spec D2/D6/D7" and "spec Decision 3" carried. The spec cited by `body-row.ts` as "task plomyk" has no own spec in the tree history; its content (cut down, not rounded) is in the `ognisko-i-jedzenie` spec, and the foundation holds the numbers D-57 and D-178 and `tests/view/body-row.test.mjs` carries the cut-down reason in its test titles.

## Unread material

- `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md`: not read, because no decision was written (nothing to record).
- `task.md` (the passages listed in the handoff were copied in it; I read those, not the file whole), `plan.md` (not read; the handoff copies the slice and the orchestrator's notes), the three *Foundation entries* rows (D-82 and D-362 as changed, the new invariant): read D-362 whole and the invariant `tracked-file-private-names` whole; D-82 not read.
- `guidelines/coding-browser-module.md`: read whole; `guidelines/styleguide-browser-view.md` and `guidelines/coding.md`: read whole. `src/browser/AGENTS.md`: read whole. `.the-way/task-cycle/change/SKILL.md`: read whole; `slice.md` (named by its table row): not read.
- `foundations/part_map.md`: the `browser-view` entry read; no test file is in the Change, so no `invariant:` line to read.
- The snapshot's vault notes and the project concept: not read (none of the removed pointers needed a note's text, because the code needed nothing the foundation lacked). The old-Loop file `Scene.tsx` was read at line 169 only.

## Searches not found or unclear

- `sprites.tsx` (line 64 at `cdc7c0d`), named by the old comment as the source of "the old Loop's value" for the dead mage and the extinguished fire, is not in the snapshot (`MANIFEST.md` lists `Scene.tsx` and other files, not `sprites.tsx`). I could not verify that the old Loop used `grayscale(1) brightness(0.55)` for both, so the comment no longer says it; the value itself is in D-322 and D-316. The styleguide (`guidelines/styleguide-browser-view.md:650-652`, out of this slice's Change) still says the dead mage and the extinguished fire have "a value of the old Loop"; the orchestrator may want the same check there. If the old Loop's value must stay said, ask for `sprites.tsx` to be added to the snapshot.
- The "spec Decision 3 / task plomyk, To do 6" of `body-row.ts` named a spec I could not match to a spec file of the plomyk cycle (the cycle record has none in git history); the text it pointed to matches Decision 3 of the `ognisko-i-jedzenie` spec (cut down, not rounded). The "cut down, not rounded, so a shown value is below a threshold exactly when the body's is" reasoning is kept in the `bodyValues` comment itself and the cut-down is in D-178's text for the energy; for the temperature, D-57 and D-337 give the shown cases (36,9; 34,9) but no decision states "cut down, never rounded" as a rule. It is held by the test titles of `tests/view/body-row.test.mjs` (`temperature is cut down to tenths, never rounded up`). I did not write a decision for it, since the code comment already says it; the orchestrator may decide whether it deserves one.
- Nothing else was looked for and not found.

## Values or wording in the task or plan that did not survive my check

None found.
