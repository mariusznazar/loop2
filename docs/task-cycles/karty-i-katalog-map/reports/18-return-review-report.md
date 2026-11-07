PASS 23d42ab5fed247d0f214f5abfd1ffec3d00c61c1

# Review of the return step - `karty-i-katalog-map`

Range: `c2a7853e72ce464fc8b34dbbb4517de729836d0d..23d42ab5fed247d0f214f5abfd1ffec3d00c61c1` (one commit, `23d42ab`, `foundations/decisions.md` only, +19 -4). `git rev-parse HEAD` = the head given. The-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (`git -C .the-way rev-parse HEAD`), the only copy used. Method: `.the-way/task-cycle/review/SKILL.md`, the return-step form of section 2.

## Findings

Blocking: none. Important: none.

### Minor (1; out of scope of this range's author)

1. `src/browser/sim/map-card.ts:9`, `:26`, `:38`, `:46` (and the header comments of `src/browser/view/map-lines.ts`) cite D-327 for the definitions of the minutes without fire, the tiles that hold a resource, the mean gap between attacks and the usual step. After this range those definitions stand in D-333; D-327 only points to D-333. The citation stays true (D-327 is still the entry of the card) but is not the nearest one. Code is outside the range and the handoff names it as known; a later change of those files can cite D-333. Evidence: `grep` of `D-327` in `src/browser/sim/map-card.ts`; the text of D-327 and D-333 in the diff.

## Checks against the dispatch

### D-333 against `src/browser/sim/map-card.ts` and its use

- Minutes without fire: the entry says "the game minutes that a body, from its starting temperature and with no warmth, goes through on that map before the game minute in which it is first chilled". Code `minutesWithoutFire` starts at `startingBody()`, applies `bodyMinute(body, 0, map)` and returns the count of minutes at or above `BALANCE.body.chilledBelow` before the first step below it; so 83 means the 84th minute chills, as the entry's example says (84 and 34). The test comment of `tests/sim/map-card.test.mjs:19-29` agrees (the 83rd minute ends at 35.008 degrees). The statement "the item stands only where the map cools the body below the threshold" is true: `minutesWithoutFire` returns `null` where the body stops cooling, and `terrainLines` (`src/browser/view/map-lines.ts:84-91`) leaves the item out on `null`.
- Tiles: `Math.round(resource.density * map.width * map.height)`; the example "patyk - ≈ 11 z 16" is 0.7 x 16 = 11.2 -> 11 (data `src/browser/sim/data/maps.ts`: width 4, height 4, density 0.7). True.
- Mean gap: `Math.round(cooldownMinutes + 1 / chancePerMinute)`; the example 180 + 100 = 280 is true (wolf: chance 0.01, cooldown 180 in the data). D-142 is cited for the chance and cooldown and gives both; the rounding is the entry's own.
- Usual step: `usualStep` counts the step of each map and takes the most frequent, the first of the data's order on a tie; `terrainLines` calls it with `Object.values(MAPS)`. Both maps give 5, so no note stands. True.
- Binding sentences: three; present tense; no "should", "will" or capitalised keyword. The first sentence ("computed by functions of the simulation ... and the view only writes them out") matches the code: `terrainLines`, `resourceLines` and the attack line call `map-card.ts` and only format text; the note against the usual step is a comparison in the view, not a number of a rule. The entry does not bind more than the cycle's choices in `plan.md` (*Choices* rows 1 to 3 of the card's counting) and the task text (To do 4, line 160 numbers, carried question 1 at `task.md:184`); it is marked as `the cycle's` choice in the report, so the human sees it at the request.
- Examples: all four numbers (83, 33, 11 of 16, 280) are the ones the tests pin; `npm test -- tests/sim/map-card.test.mjs` -> 11 pass.
- Form by the template: heading is a question; Scope parts exist in the part map (`foundation_check.py` passes); Based on `none`; Relations only `derives from` D-04, D-142, D-327 (no `narrows`, no cycle of `narrows`); Verification has complies and violates; Origin `none` (the reasoning is in the entry); Rationale and Rejected name no file, script or count and state accepted costs; the number D-333 is the next free number (333 entries; no withdrawn list in the log).

### D-327: removal of the third binding sentence

- Row 1 of *Settlements to record* in `task.md:289` holds the card's parts and the five departures; it contains the words "przy kroku innym niż zwykły" and "minutami bez ognia" but gives no definition of the usual step. D-327 now reads as that row (same parts, same five departures). The removed sentence ("The usual step is the step most maps' data give, the first of the data's order on a tie") is carried word for word by D-333's third sentence, so nothing it held is lost, and D-327 keeps both the "usual one" clause and the minutes without fire pointing to D-333 (two `(D-333)` pointers).
- Links: D-327 does not list D-333 in *Relations* (the relation is written in the entry that depends, D-333 `derives from D-327`, as the template gives); D-333 holds D-327 in *Relations*; no reference to a withdrawn number. D-327's *Origin*, *Verification* and *Rationale* are unchanged and stay true (the *Rationale* sentence about numbers the game computes is consistent with D-333).

### D-169 and D-265

- D-169 *Rationale*: "select lists of the program panel and of the card of a map". True: `src/browser/view/maps-screen.tsx:300-305` draws the list "Program:" at a character in the card of a map, and `src/browser/view/program-panel.tsx` holds the panel's list; Siedziba (`src/browser/view/headquarters.tsx`) holds no select list. Only the one phrase changed.
- D-265 *Verification*, `complies`: "a new section of the waiting screen of the sign-in check built in DOM". True: `src/browser/view/app.ts:163-183` builds that screen with `document.createElement` and `createButton` (the one user of `createButton` in `src/browser/view` outside `controls/`; `footer.ts` also builds DOM elements). Siedziba is React (`headquarters.tsx`), so the old example named a thing the code no longer does. The binding sentence of D-265 and the other fields are unchanged; wording of the rest kept. The example stays a DOM screen that exists, as the return report says.

### Form and hygiene

- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0.
- The added lines hold no private path, no vault note title (`Origin: none` for D-333; the other changed entries keep the origins they had) - checked with a grep of the diff for drive paths, `Notes/` and user paths: none.
- The commit message ends with the `Claude-Session` line; the worktree is clean (`git status --short` empty).
- The part map: the commit adds no file and changes no part; no change needed.

## Declined to judge

- The comments in `src/browser/sim/map-card.ts` citing D-327 (code, outside the range; graded as Minor 1 above for the task).
- D-189, D-245 and D-246: left to task 25 by the task and the handoff; not this range.
- The concerns 3 to 6 of the return report (the widths of Mapy in the styleguide, D-149 wording that runs ahead of the game, the fix report's items): not changed by this range.
- The full gate: the cycle's own run.

## Checks I ran

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git log --oneline c2a7853..HEAD`; `git diff --stat c2a7853..HEAD`; `git -C .the-way rev-parse HEAD` | 0 | head `23d42ab5fed247d0f214f5abfd1ffec3d00c61c1`, one commit, one file; the-way `294af7fd...` |
| `git diff c2a7853..HEAD` | 0 | read whole |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npm test -- tests/sim/map-card.test.mjs` | 0 | 11 pass, 0 fail |
| `npm test -- tests/view/map-lines.test.mjs` | 0 | 11 pass, 0 fail |
| grep of the added diff lines for private paths and note titles | 0 | none found |

Not run: the full `npm test` (the cycle's gate); a real browser (the entries were compared with code and tests, not with the page).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` - the form of the entry D-333 (what it must hold, the form of Rationale and Rejected, Relations).
- `foundations/decisions.md`: D-04, D-142, D-265 and D-169 read whole, D-327 whole - to judge the Relations of D-333, the examples and the corrected entries.
- `docs/task-cycles/karty-i-katalog-map/task.md` (lines 160, 184, 289) and `plan.md` (*Choices* rows at lines 645-647) - the accepted row 1 and the plan's choices that D-333 records.
- `src/browser/view/map-lines.ts`, `maps-screen.tsx`, `app.ts`, `footer.ts`, `src/browser/sim/data/maps.ts`, `tests/sim/map-card.test.mjs` - to check each definition and example against the code.

## Searches not found or unclear

none
