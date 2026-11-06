PASS 21a56f979a286a8bc15870ded3dc989e38003a40

(Saved by the orchestrator from the reviewer's returned text: the harness refused the reviewer's own write.)

# Review of the return step — task cycle `ekran-przejscia`

- Range: `1057f7d..21a56f9` (`226d7d0` foundation, `21a56f9` two code comments). `git rev-parse HEAD` = `21a56f979a286a8bc15870ded3dc989e38003a40`.
- Files: `foundations/decisions.md` (+30 −26), `src/browser/styles.css` (1 line), `src/browser/view/world-area.tsx` (1 line). Nothing under `assets/sprites/**`. No irreversible operation.
- Counts: blocking 0; Minor 3; out of scope 7 (lines of *Declined to judge*). No invariant test changed in this range.

## Findings

### Critical
none

### Important
none

### Minor

**r1 — D-19 now uses different words from the projected entry the task says to write whole. The request must name this.**
- Place: `foundations/decisions.md:402-407` (heading and binding sentence); the same for D-125 (`:2303-2324`) and D-70 (`:1366`), listed by the task under „Obecne decyzje, których zadanie dotyka bez zmiany”.
- What is wrong: the task quotes D-19 from `definicja_mvp2_loop2.md`, „Zadanie zapisuje w całości”: „The terrain panel's drawing of the game map is a picture, not a control: …” (`task.md:163`). The return step rewrote it as „The drawing of the game map is a picture, not a control: …”. The meaning holds and the correction is within the return step's remit (WAY-11): the code has no terrain panel any more (`terrain-panel.ts`, `createTerrainPanel` gone; a grep for „terrain.panel” finds only stale comments). The approved definition still says „the terrain panel's drawing”; later tasks (14, 16) quote it, so foundation and source now differ in words.
- Why it matters: a later task writing from the definition will bring „terrain panel” back, or read two wordings as two meanings; handled only if the request names it and the project's lead brings the definition in line.
- Why it does not block: the meaning matches the task and the code.
- Evidence: hunks at `:399`, `:1363`, `:2300` of `git diff 1057f7d..21a56f9 -- foundations/decisions.md`; `task.md:163`.

**r2 — The styleguide's *Bad* example for the kitchen-sink page still names the terrain panel; D-45's example, rewritten in this range, no longer does.**
- Place: `guidelines/styleguide-browser-view.md:325`, „**Bad:** Strona rysuje panel terenu ze stanu gry złożonego ręcznie.”, against D-45 *violates* at `foundations/decisions.md:938`: „the page drawing the game map from a game state put together by hand”.
- What is wrong: the styleguide rule cites D-45 and mirrors its *violates*; after `226d7d0` they say the same in different words, and the styleguide names a component the code no longer has. Stale since the change before this range; guidelines change only through `the-way-maintain-styleguide`, so the return step was right not to edit it.
- Why it matters (small): a reader looks for a „panel terenu” that does not exist.
- Fix: one line through `the-way-maintain-styleguide`, or name it in the request.
- Evidence: `grep -n -i "panel terenu\|terrain panel" guidelines/*.md` finds only `:325`.

**r3 — D-313's new give-way clause has no reasoning in the entry; its only reasoning is deleted when the task closes.**
- Place: the clause at `foundations/decisions.md:6700-6709`; its *Rationale* at `:6722-6726` reasons only about „z tym” and the target of the discovery.
- What is wrong: the clause answers m5 and rightly binds after the merge (WAY-36), but its reason — why an action with nothing to name gives way to the next one rather than greying the button or writing a rule the panel cannot fill — stands only in the record's Q9 (`.runs/task-cycles/ekran-przejscia/cycle.md:126`), under `.runs/`, which *Origin* may never point to (`.the-way/elements/decisions/template.md:206-210`).
- Why it matters (small): whoever later changes the clause finds no reason in the entry (*Rationale* exists for that reader, template `:89`).
- Why it does not block: the binding sentence says what the code does.
- Fix: one sentence in *Rationale*, e.g. that the button writes only a rule the rule panel can show filled; the orchestrator owns that sentence.
- Evidence: `discovery-rule.ts:39-40`, `:57-76`, `:93-115`; in `tests/view/discovery-rule.test.mjs` the cases „a first action that needs a target nobody can pick yet gives way …” and „a condition that needs a target nobody can pick yet gives way …”.

## The earlier findings this range answers
| Finding | Where | Result |
|---|---|---|
| m3 — `.rule-panel-host` comment cited D-282 for a removed layout | `src/browser/styles.css:1422` | Fixed: „The element of its own that `createRulePanel` builds for the rule panel.” — true (class set only at `rule-panel.tsx:594`). |
| m4 — `world-area.tsx` cited D-314 for „whole multiple” | `src/browser/view/world-area.tsx:21` | Fixed: D-314 cited only for „the forest”; „shown at a whole multiple” holds for `sceneSize` (`:33-35`) and wherever the three areas stand side by side (`styles.css:285-295`); fails only below ~740 px (phone layout, out of scope). |
| m5 — D-313 silent on an action or condition with no target to offer | `decisions.md:6700-6709`, *complies* `:6716-6717` | Fixed: the binding sentence says what `discoveryRule` does; the new *complies* case („Idź” and „Wędruj” with no target for „Idź” giving „Zawsze → Wędruj”) is the test case „a first action that needs a target …” (no item held, `walkTo` takes a resource, `program-editor.ts:425-447`). See r3. |
| M3 — D-312's *complies* drag example not qualified | `decisions.md:6670-6672` | Fixed: „„Głód” holding no rule „Zawsze → Eksploruj””, matching *violates* and the binding sentence. |

Check of the new D-313 wording against the code: `withAction` returns null only where the action takes a resource and `offeredResources` is empty; `withConditionKind` returns null only where `newCondition` has no resource or item (`program-editor.ts:347-362`), or where the kind is already the rule's (handled at `discoveryRule:64`); with nothing left, the rule „+ reguła” adds, panel on the condition — „where it holds neither” in the new wording.

## Other entries this range writes or corrects
| Entry | Compared with | Result |
|---|---|---|
| D-19 | `terrain-drawing.tsx`, `tile-table.tsx`, `tileLine`, `world-area.tsx:105-110` | meaning matches; wording is r1 |
| D-45 | its *violates*; `kitchen-sink.ts` draws tile samples from roles, not a map from a game state | matches; styleguide twin r2 |
| D-70 | campfire icon on `TerrainDrawing`, its state in the table row | matches (wording only) |
| D-121 | „in one band of a discovery”; `discovery-band.tsx:55` joins one minute's discoveries in one band | matches |
| D-125 | „the list of revealed tiles and the drawing of the game map” | matches; *Rejected* faithful to its *Origin* (question 6 names „listę odsłoniętych kafelków, rysunek mapy”) |
| D-195 | `status-row.ts:127` (`discoveryText`), used by `discovery-band.tsx:55` | matches |
| D-312, D-313 | above | match |

`grep -n -i -E "terrain panel|discovery line|line of discover" foundations/*.md` finds nothing.

## Declined to judge
- Stale code comments citing no entry (the step's concern 4): `kitchen-sink.ts:642`, `:699`, `:722`, `styles.css:1379`, `status-row.ts:118`, `tile-list.ts:60`, `tests/sim/discovery.test.mjs:406` — outside the range.
- D-313's fallback while the Understanding holds no action (D-124 keeps „+ reguła” disabled then): predates the range; unreachable today.
- D-312's „further cost” listing two of three ways (carried M4): not answered by this range.
- D-147 and D-185 *Rejected* reasons about the old order (carried M2): not in this range.
- D-19's „its row in the list of revealed tiles” without allowing for the rule panel hiding the table: the projected entry's wording.
- „map-run view” in D-200, D-201, D-262: a plain phrase, outside the entries edited.
- The long unwrapped line in D-312 *complies* (`decisions.md:6671`): 1140 lines over 100 characters, no rule on wrapping.

## Checks
| Command / method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `21a56f9…` |
| `git log --oneline 1057f7d..21a56f9`; `git diff --stat`; `git diff 1057f7d..21a56f9` | 0 | two commits, three files |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | „0 errors” |
| `npm test -- tests/view/discovery-rule.test.mjs` | 0 | 18 pass |
| `npm test -- tests/view/world-area.test.mjs` | 0 | 13 pass |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css src/browser/view/world-area.tsx` | 0 | clean |
| `grep -n -i -E "terrain panel\|discovery line\|line of discover" foundations/*.md` | 1 | no match |
| `grep -rn -i "terrain.panel\|terrainPanel\|terrain-panel"` over src, tests, foundations, guidelines, scripts | 0 | three comments in `kitchen-sink.ts`, one at `tests/view/run-screen.test.mjs:288`; no module |
| `grep -rn "rule-panel-host" src tests` | 0 | only `styles.css:1423`, `rule-panel.tsx:594` |
| manual: `discoveryRule` against D-313's new binding sentence | — | matches |
| `git status --short` after the checks | 0 | empty |

Not run: the full suite (the cycle's).

## Reaches beyond the dispatch
- `.the-way/elements/decisions/template.md` whole (*Origin*, *Rationale*, *Rejected*).
- D-124, D-147, D-185, D-216, D-314 (headings and binding sentences), D-121 whole.
- Code: `discovery-rule.ts`; `program-editor.ts:125-131`, `:167-184`, `:236-250`, `:347-447`; `sim/program.ts:55-68`; `rule-panel.tsx:592-607`; `world-area.tsx:15-115`; `styles.css:194-295`, `:1400-1435`; `discovery-band.tsx`; `status-row.ts:127`.
- `guidelines/styleguide-browser-view.md:320-330`; `cycle.md` rows Q6, Q7, Q9; `report-review-whole.md` *Findings*.

## Searches not found or unclear
- A reason for D-313's give-way rule in any place the entry may point to: not found; only in the cycle record (r3).
- Whether `definicja_mvp2_loop2.md` should be brought in line with D-19's new words, and by whom: unclear; the definition lives in the vault (r1).
