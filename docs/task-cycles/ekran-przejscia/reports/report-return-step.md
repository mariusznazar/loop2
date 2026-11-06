# Report: the return step, task cycle `ekran-przejscia`

(Saved by the orchestrator from the agent's returned text: the harness refused the agent's own write.)

- **Status:** done with concerns
- **Commits** on top of `1057f7d`, not pushed: `226d7d0` — foundation: D-19, D-45, D-70, D-125, D-121, D-195, D-312, D-313; `21a56f9` — two code comments citing D-314 and D-282.
- **Check:** `python -B .the-way/elements/common/foundation_check.py` exit 0, „0 errors”, after both commits. The full gate not run (the orchestrator's).

## Files changed
| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 30 | 26 |
| `src/browser/styles.css` | 1 | 1 |
| `src/browser/view/world-area.tsx` | 1 | 1 |

## Foundation compared with code
Compared with the code at `1057f7d`: `run-screen.tsx`, `run-header.tsx`, `world-area.tsx`, `discovery-band.tsx`, `discovery-rule.ts`, `tile-list.ts` (`tileLine`), `program-panel.tsx` (`addDiscoveredRule`), `understanding.ts` (`chillRuleGroupName`, `withFirstChillRule`), `game-view.ts`, `kitchen-sink.ts`, `styles.css`, the tests `discovery-rule.test.mjs` and the altered invariant tests.

| Entry | Compared with | Result |
|---|---|---|
| D-311 | `run-screen.tsx:120-147`, `run-header.tsx:51-91`, `world-area.tsx:65-110` | matches |
| D-130, D-133, D-46 | `run-header.tsx`; `statusText` unchanged | matches |
| D-122 | `discovery-band.tsx`, `run-screen.tsx:131-135` | matches |
| D-312 | `chillRuleGroupName` | binding matches; the *complies* drag example held only while „Głód” has no rule „Zawsze → Eksploruj”. Corrected: the example now says that. |
| D-313 | `discoveryRule`, `addDiscoveredRule` | did not match in one state: the code passes over an action or condition that takes a target when the panel offers none and takes the next one (Q9, reviewer's m5). Corrected: the binding sentences say this; *complies* gains the tested case. Disabled with no rule group: matches. |
| D-314, D-315, D-272 | `world-area.tsx:67-73`, Slice 1's PNG | matches; the comment at `world-area.tsx:21` cited D-314 for „whole multiple” (m4). Corrected in the comment. |
| D-19 | `terrain-drawing.tsx`, `tileLine`, `tile-table.tsx` | meaning matches; „terrain panel” names nothing in the code. Corrected: „the drawing of the game map”. |
| D-70, D-125, D-45 | same | same wording; corrected, meaning unchanged (D-125: „the list of revealed tiles and the drawing of the game map”). |
| D-121, D-195 | `discovery-band.tsx`, `discoveryText` | the text stands in a band, not a line. Corrected: „band of a discovery”. |
| D-147, D-185, D-216 | `world-area.tsx:74-84` | binding matches; *Rejected* reasons about the old order left (concern 3) |
| D-282, D-281 | `run-screen.tsx:123-145`, `:190-198` | matches; the comment above `.rule-panel-host` (`styles.css:1422`) cited D-282 for a removed layout (m3). Corrected in the comment. |
| D-62, D-132, D-188, D-186, D-201, D-215, D-21, D-129, D-131, D-123, D-124, D-43, D-44, D-265, D-276, D-279, D-264, D-269, D-273, D-03, D-271 | the files above | match |
| `terrain-drawing-numbers`, `browser-view-token-values`, `streak-program-change`, `rule-state-from-pick`, `sprite-file-content`, `player-map-run-pace`, `browser-view-framework` | invariant tests and code | match |
| Part map: browser-view, simulation, build-tools, product-foundation | new files under `src/browser/view/**`; imports view → sim only | match; no change |

## Entries written or changed
| Identifier | Meaning (EN) | Znaczenie (PL) | Mark |
|---|---|---|---|
| D-313 | „Dodaj regułę z tym” uses the first action, else the first condition, of the discovery that takes no target or one the rule panel offers a target for; an action or condition with no target to offer gives way to the next. | „Dodaj regułę z tym” bierze pierwszą odkrytą czynność, a bez niej pierwszy warunek, który nie potrzebuje celu albo dla którego panel reguły ma cel; czynność albo warunek bez celu do wyboru ustępuje następnemu. | the cycle's (Q9, return step) |
| D-312 | Example only: the drag case in *complies* says „Głód” holds no rule „Zawsze → Eksploruj”. | Tylko przykład: przypadek przeciągnięcia w *complies* zakłada, że „Głód” nie ma reguły „Zawsze → Eksploruj”. | the cycle's (example) |
| D-19 | Wording only: the drawing of the game map, no longer „the terrain panel's drawing” (heading and binding sentence). | Tylko brzmienie: „rysunek mapy gry” zamiast „rysunku panelu terenu”. | the cycle's (wording; projected entry written whole before) |
| D-70 | Wording only: the campfire icon stands on the drawing of the game map. | Tylko brzmienie: ikona ogniska stoi na rysunku mapy gry. | the cycle's (wording) |
| D-125 | Wording only: „terrain panel” replaced by „the list of revealed tiles and the drawing of the game map” in heading, binding, *Rationale*, *Rejected*. | Tylko brzmienie: „panel terenu” zastąpiony „listą odsłoniętych kafelków i rysunkiem mapy gry”. | the cycle's (wording) |
| D-45 | Example only: *violates* names the page drawing the game map. | Tylko przykład: *violates* mówi o stronie rysującej mapę gry. | the cycle's (example) |
| D-121 | Example only: „in one band of a discovery”. | Tylko przykład: „w jednym pasie odkrycia”. | the cycle's (example) |
| D-195 | Wording only: the band of a discovery names the tree; *violates* and *Rationale* to match. | Tylko brzmienie: drzewo nazywa pas odkrycia. | the cycle's (wording) |

- Invariants written or changed: none. Environment facts: none (the Pixel Crawler terms already `pixel-crawler-terms`). Glossary terms: none. Part-map changes: none.
- Projected entries or rows written by this step: none new; D-19's words changed, not its meaning — the request names it.
- WAY-36: Q9 binds after the merge and is now in D-313; Q6, Q7 already in D-312, D-313; Q4 in the guidelines; Q1, Q2, Q3, Q5, Q8, Q10, Q11, Q12, Q13 stay rows of the table.

## Checks
| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before commit) | 0 | 0 errors |
| same (after both commits) | 0 | 0 errors |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css src/browser/view/world-area.tsx` | 0 | clean |
| `npm test -- tests/view/world-area.test.mjs` | 0 | 13 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 OK |
| `npm test -- tests/view/discovery-rule.test.mjs` | 0 | 18 pass |
| `grep -n -i -E "terrain panel\|discovery line\|line of discoveries" foundations/*.md` | 1 | no match |
| `grep -c $'\r'` on the three changed files | — | 0 each, LF kept |

## Own-work check
Most likely missed: an edited entry saying something the code does not do, mainly D-313's new clause. `tests/view/discovery-rule.test.mjs` holds both give-way cases and they pass; `discoveryRule` read against the new wording (`withAction` returns null for an action taking a resource when `offeredResources` is empty; the same for `withConditionKind` with resources and items; with nothing left the button falls back to „+ reguła”'s rule with the panel on the condition).

## Questions and concerns
1. D-19's wording now differs from the projected wording in `definicja_mvp2_loop2.md` (still „the terrain panel's drawing”), same meaning; the definition (in the vault) not edited; the request should name it; the project's lead may bring the definition into line.
2. The styleguide's *Bad* example in „The kitchen-sink page” (`guidelines/styleguide-browser-view.md:325`, „Strona rysuje panel terenu…”) still names the terrain panel; guidelines change only through `the-way-maintain-styleguide`; not changed.
3. *Rejected* of D-147 and D-185 still give reasons about the old order (carried M2); left — ways once weighed; a new reason would have no source.
4. Stale code comments citing no entry, outside this step: `kitchen-sink.ts:642`, `:699`, `:722` („as the terrain panel draws”); `styles.css:1379` („under the status row”); `status-row.ts:118` („the line under the status row”); `tile-list.ts:60` („beside the terrain drawing”); `tests/sim/discovery.test.mjs:406` („one discovery line”).
5. The foundation says both „list of revealed tiles” (D-19, D-70, D-125) and „table of revealed tiles” (D-311) for one thing — two plain words, one meaning; no glossary entry.
6. No critique by a fresh agent (`make-change` forbids dispatching a subagent); the review of the return step reads these edits.

## Reaches beyond the handoff
- `.the-way/task-cycle/skill/SKILL.md:330-345` and `.the-way/task-cycle/record_template.md` *Return step*.
- `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, `elements/common/way_of_working.md`, `rules.md`, `elements/glossary/skill/SKILL.md` (WAY-03 not read).
- Decisions whole: D-19, D-45, D-70, D-121, D-123, D-124, D-125, D-188, D-195, D-201 (head), D-215 (head), D-186 (head), D-178; the rest through the diff.
- Invariants whole: `terrain-drawing-numbers`, `browser-view-token-values`, `browser-view-framework`, `application-build-kitchen-sink`, `sprite-file-content`, `rule-state-from-pick`, `player-map-run-pace`, `streak-program-change`, `document-test-memory-limit`. Part map 1–142. Glossary entries: map run, program rule, rule group, Understanding, manual map run, completion, streak, copy.
- `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md` whole.
- Whole-foundation and guideline searches for „terrain panel”, „discovery line”, „line of discoveries”, „status row”, „column”, „beside the drawing”, „map-run view” and the removed module names.

## Searches not found or unclear
- What D-313 does with a discovery holding neither an action nor a condition while the Understanding holds no action: D-124 keeps „+ reguła” disabled then, yet `discoveryRule` still adds „Zawsze → Eksploruj”; unclear whether reachable (on today's data every discovery before the first action holds one). Not changed.
- „whole multiple” in any entry: not found; the comment no longer cites D-314 for it.
- WAY-03 from `.the-way/foundations/` not read.
- Not every decision whose *Scope* names browser-view or simulation read whole.

## Choices
- Renamed „terrain panel” rather than leave it (one-line revert brings the projected D-19 wording back).
- Q9's give-way rule into D-313's binding sentences rather than a row of the table (it binds after the merge).
- The two code comments (m3, m4) corrected in this step (each cited an entry for something it does not say).
