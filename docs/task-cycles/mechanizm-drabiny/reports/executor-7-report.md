done
# Report of executor 7 — slice 7 (the icons of the attacking creatures in the lines of the card's heading)

- **Status:** done
- **Base:** c27e6e53 · **Commits:** 733f8c42 (feat, code, test and styleguide), 8951b363 (docs, a comment fix in `map-lines.ts`, one line)
- **Check result in one line:** all three slice checks pass (exit 0); the full product gate was not run (out of this slice's boundary).

## Files changed

- `src/browser/view/map-lines.ts`: +6 −1 (the `CardHeading` type gains `icons: string[]`; `cardHeading` fills it from the map's attackers through `CREATURES[attacker.id].icon`); the second commit changes one comment line (+1 −1).
- `tests/view/map-lines.test.mjs`: +15 (a new case, `the heading gives the icon of each creature that attacks on the map, and none on a map without an attacker`; the existing heading test's expected values gain `icons`).
- `guidelines/styleguide-browser-view.md`: +2 −2 (two lines: the rule „The screen Mapy”, the card's heading in the item „Karta mapy (D-327)” and its *Good* example).

Totals of the slice's first commit: 23 insertions, 3 deletions across the three files; the second commit adds 1 and removes 1.

## Test first

The new case was written first. Its run, with the command and exit code:

- Command: `npm test -- tests/view/map-lines.test.mjs`, exit code 1. Before the change, the case fails on its assertion: `AssertionError … actual: undefined, expected: [ 'wolf-head' ]` at `tests/view/map-lines.test.mjs:171`. The failing run's log is kept as `.runs/task-cycles/mechanizm-drabiny/reports/executor-7-red-run.log`.

The existing heading test (`the heading names the map, with the tag of its state and the opener's name from the data`) was changed in the same commit: its four `deepEqual` expected values gain `icons` (`[]` for Skraj lasu, Las and Las with the opener; `["wolf-head"]` for Las — głębiej). It passed before the change and would have failed with the field missing. This is a change the slice asks for, caused by the requirement of D-327 (the heading holds the icon of each attacker); no assertion was weakened.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| The new case, before the code | `npm test -- tests/view/map-lines.test.mjs` | 1 | fails on the assertion (see above) |
| The map-lines test, after the code | `npm test -- tests/view/map-lines.test.mjs` | 0 | 14 tests, 14 pass, 0 fail (run twice: after the feat commit and after the comment fix) |
| Identifiers invariant | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | Ran 5 tests, OK |
| Typecheck | `npm run typecheck` | 0 | clean (run twice) |

Tests that fail after the change on the base: none. Each focused check passes on the slice's commit; no test that passes on the base fails after the change.

Not run: the full `npm test` (out of the slice's boundary; the gate is the orchestrator's or CI's); `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` (not among the slice's *Checks*; the styleguide edit touches no foundation entry, but I did not run those two checks, so they are left unchecked by me).

## Own-work check

- Requirement: `cardHeading` gives, beside the name, the tag and the opener, the icon of each creature that attacks on the map, and none for a map without an attacker (D-327, To do 8).
- Check: the new case (icons of Las — głębiej `wolf-head`, Las — matecznik `bear-head`, Las and Skraj lasu `[]`) and the heading test with its icon values; both pass.
- Mutation in my head: an empty icon list, the icon of the wrong creature, or the icon taken from the opener's map would each fail one of the four assertions of the new case. A map without `attackers` gives `[]` through `map.attackers ?? []`.

## Choices

- The styleguide's text. The item of the card's heading says the icon stands beside the name and the tag, is drawn as a mask in the colour of the text beside it, and that the name's `text-strong` is that colour; a map without an attacker has none. Rejected: giving the icon the colour of the tag (`text-secondary`) or of the `positive` mark of a solved map; the cost, if wrong, is that a reviewer reads the icon's colour against the nearer text, which D-43 leaves open. Named in the styleguide's words, so the reviewer can see the choice.
- The *Good* example names the wolf's head beside the name of Las — głębiej, as D-327's *Verification* does. I did not add a *Bad* example; the slice asked for the *Good* one only.
- Where the new case sits: between the heading test and the „Żąda” test, with the decision line `decision: D-327 …` as the other cases carry it. Nothing in it is an invariant test; none was changed.
- The icon value is the name the data give (`wolf-head`, `bear-head`), not a file path; the file path is the job of the next slice's drawing. The first commit's comment said "icon file"; the second commit corrects it.

## Scope and reach beyond the handoff

- No reach outside the *Change* list. `src/browser/view/map-card.tsx` and the stylesheets are untouched, as the handoff requires; the card does not draw the icons yet (Slice 8).
- No foundation entry is written; D-327 and D-43 are read as they stand (ranges `foundations/decisions.md:10487-10533` and `:5102-5116`). The text I wrote into the styleguide follows D-327's current words: "Beside the name and the tag of its state the heading holds the small icon of each creature that attacks on the map, and a map without an attacker has none there."
- The rung entries (D-464, D-465, D-466) are not touched: this slice does not touch rungs, the order of maps or a rung's name. The test file's existing rung cases (the map list) are not changed.
- Foundation entries where my code makes one untrue: none.

## Trust boundary and operations

- The change touches no trust boundary and holds no operation that cannot be undone (answer of step 4 of the cycle: confirmed by the slice's nature — a pure function and its test, a styleguide sentence).

## User-visible behaviour (walkthrough)

- The slice alters no behaviour a user sees: `cardHeading` gains a field, and the card does not read it yet, so no screen changes. `walkthrough.md` and `ui_check.md` were not needed for this slice.

## Working copies

- No git worktree was made. The logs of my checks were in `.runs/executor-7/`; that directory was removed by its full path, and its failing-run log was kept beside this report as `.runs/task-cycles/mechanizm-drabiny/reports/executor-7-red-run.log`.

## Unread material

- none. Read whole: `guidelines/styleguide-browser-view.md` (1979 lines, in four chunks), `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md` (510 lines, in three chunks), `src/browser/AGENTS.md`, `src/browser/view/map-lines.ts`, `tests/view/map-lines.test.mjs`, `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/change/slice.md`, `foundations/part_map.md` lines 3-32 (the browser-view part), the D-327 range `10487-10533`, the D-43 range `5102-5116`, and `task_frozen.md` line 35 (To do 8). `ui_check.md` and `walkthrough.md` were not read because the slice alters no screen (the method sends to them only where the change alters what a screen shows).

## Searches not found or unclear

- none. One point noted, not a search: the handoff's *Read* names `guidelines/coding-browser-module.md` and `foundations/part_map.md`; the part map's browser-view files include `src/browser/view/**`, so `map-lines.ts` is in the part, and the styleguide is the one of that part, as the slice assumed.
