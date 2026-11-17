# Report - executor of slice 11 (Decisions of the scene)

**Status:** done (with two observations, below, none blocking)

**Commit:** `307cc1d4788e03fe9c1f1e7e049af37335c687b1` on `task/poprawki-brzmienia-fundamentu` (base `64f2061e`).

**Files changed:** `foundations/decisions.md` (+16 -11 lines of text, 27 changed lines), `tests/view/scene.test.mjs` (+5 -2). Together 20 insertions, 14 deletions.

## Items of the slice

| Item | Result |
|---|---|
| D-70 *Rationale* (F-36): "The extinguished campfire's icon, like the other icons of the map, holds its colour in its file, and the scene…" -> "Both icons are drawn as masks in `text-strong`, like the other icons of the map (D-43), so the two states differ by shape, and the scene…" | made |
| D-316 new *Rationale* (the 200 ms readings, 312.5 ms at 16x, "…it stands beside the mage instead.") in place of "At 16x the combat is decided 312 ms after the attack, …" | made; binding sentences and *Verification* untouched |
| D-316 *Rejected*: "— it does not meet the scope of the project, which says the wolf runs in;" -> "— the player would not see where the creature came from;" | made |
| D-317 "One whose turn has passed would show something that is no longer so;" -> "An effect whose turn has passed would show …" (in *Rationale*) | made |
| D-317 last *Rejected* item had no full stop -> full stop added after „Teraz” | made |
| D-322 binding sentence split in two: "…shows the last image of the effect at once (D-319). A scene under the system's setting for reduced motion shows the last image at once too (D-317)." | made |
| D-322 *Rationale*: "…would contradict the pause, which loop avoided on purpose." -> "…would contradict the pause, so only the effect of a moment moves, once and for less than three seconds." | made (the other "which loop avoided on purpose" in the *Rejected* of D-322 was not named by the task and stays) |
| D-367 wording before "over at once" (To do 7.13) | made: "the flight of an icon and the cloud of dust, whose animation the browser cancels because the scene is hidden, are over at once, and not played from their start when the scene is drawn again" (the "are" of the task's choice, with commas so that "are over at once" has its subject) |
| D-367 example "violates" that speaks of a scene returning after "✕" instead of a screen (To do 7.13) | **not standing**: D-367 carries no pair of examples; its *Verification* is a `tests:` clause only (the same at base `f66ae6eb`). A "✕" wording stands in other entries (e.g. the decision near `decisions.md:5503-5507`), not in D-367; nothing was changed there. The binding sentence of D-367 already says "the scene is hidden — by leaving the screen of the run or by the end-of-run window (D-370)". |
| `tests/view/scene.test.mjs` comment repeating "312 ms" (To do 7.9) | made: the comment above the case "a death or a completion in the 300 ms of the run in leaves the wolf standing beside the mage, not held on its way" now says the view reads the game every 200 ms, 312.5 ms at 16x, a completion in any earlier minute (the lines moved from 2583-2585 to about 2893-2896) |
| `scene.test.mjs` case "an effect or a return of the tint cut by leaving the screen …" gets a line `decision: D-367` | made: `// decision: D-367 "Any other reading starts none, so that an effect overdue when its turn comes, one at a stop or in a reading that carries several ends, is dropped; an effect already running finishes, standing still while the scene does, unless the map run is left, the scene is hidden"` - a quotation from the start of the second binding sentence to "is hidden", which is the part about a scene hidden by leaving the screen |
| Rule 4: quotations of a reworded binding sentence | no test quotation broke: the only reworded binding sentence is D-322's last one; `git grep` for the tail ("last image of the effect at once") finds no `decision:` line. The foundation check agrees (0 errors). |

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation check after the entries | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | `0 errors` |
| Foundation check, whole | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; 6 lines `listed:` (see below) |
| Scene test file | `npm test -- tests/view/scene.test.mjs` | 0 | 74 tests, 74 pass, 0 fail |
| Prettier | `npx prettier --check tests/view/scene.test.mjs` | 0 | all matched files use Prettier code style |

Lines `listed:` (all in `foundations/invariants.md`, from earlier slices of this change, none from this slice; each says the invariant's sentence is changed while no file citing it changed): `account-server-runtime` (:5), `terrain-drawing-numbers` (:354), `player-opaque-session-cookie` (:668), `trip-plan-progress` (:978), `loop-run-knowledge` (:1158), `sprite-credits` (:1288).

Not run: the product's full gate (`npm test` without a file), as the handoff says. The Python quality environment was not needed.

## Own-work check

Requirement most likely not met: "D-316 … its binding sentences and *Verification* stay", and "no entry binds anything new" (rule 5) - the D-322 split could be read as a new binding sentence. Check: `git diff 64f2061e..HEAD -- foundations/decisions.md` read hunk by hunk. The D-316 binding paragraph and *Verification* are outside every hunk; the D-322 hunk only splits the one sentence and keeps both references, the content of D-322's first half and of D-317/D-319 being already said by them. Result: holds. A second check: the foundation check (whole) ends with 0 errors, and the focused test file passes with the new `decision:` line (the check reads the quotation against the binding sentences of D-367).

## Observations (no action taken)

1. D-322 split: the task gives "(D-319)" for the first sentence (a scene drawn again on the same moment shows the last image at once). The sentence that says it for a scene drawn again stands in D-317 ("a scene drawn again on the same moment shows that image at once"); D-319 holds the mage's place at once after a load, a restart and a start. I wrote it as the task gives; the orchestrator may want to confirm the reference. The binding paragraph of D-322 now has five sentences (the template asks one to three); the foundation check does not report it and the paragraph had four before.
2. The D-316 *Rationale* sentence "the reading that shows a combat decided, 312.5 ms after the attack at 16x, can come 200 ms after the reading that showed the attack" passes my reckoning (5 game minutes at 16x = 312.5 ms; one reading at 16x covers up to 3.2 game minutes, so two readings can span the combat). Also the task's reference `styles.css:2437-2443` for "from 960 ms to about 2.7 s" no longer exists (that file has 690 lines); the figures stand in `src/browser/run-screen.css` (death fall 960 ms; specks 1800 ms plus a delay of up to 900 ms = 2.7 s; plaques 600 ms + 150 ms each), so "less than three seconds" holds for up to 16 plaques.

## Reaches beyond the handoff

- I read the whole `task.md` once (the first read, to find the passages), though `slice.md` says not to open it whole; I took nothing from outside the passages named in *Read* and the Decisions in play rows of D-70, D-316, D-317, D-322, D-367.
- I read `src/browser/run-screen.css:1148-1165` and a grep of its animation durations (to check the "960 ms to about 2.7 s" claim), and `src/browser/view/clock.ts:62-65` and `balance.ts:1-30` (to check 200 ms and 312.5 ms).
- `git show f66ae6eb:foundations/decisions.md` for D-367, to see whether the "violates" example stood at the earlier base.
- `the author's global rules file git.md` before the commit (the user's global rule).

## Unread material

- `guidelines/styleguide-browser-view.md` (93 KB) and `foundations/glossary.md`: not read; no file of this slice's change is a browser-view product file other than the test comment, and no glossary term was used in a new meaning (the word "reading" in the D-316 Rationale is the one the glossary entry of a previous slice defines).
- `guidelines/testing.md`: read whole. `guidelines/coding.md`: read whole.
- `.the-way/elements/decisions/examples.md`: read (names WAY-03 only; WAY-03 itself not opened, the form was taken from the template and from the entries I edited).
- `src/browser/view/scene.tsx:20-40` and `src/browser/run-screen.css:760-780`: not read (named in *Read* but nothing in the edited text depended on them).
- `src/browser/view/clock.ts` and `balance.ts`: read in part (the lines named above).
- Decisions D-43, D-319: read in the ranges the handoff gives (D-43 whole, D-319 whole). D-365, D-366: read whole with D-367.

## Searches not found or unclear

- The "violates" example of D-367 about a scene returning after "✕": not found in D-367 (see the table).
- `styles.css:2437-2443` cited by the task: does not exist (see observation 2).

## Choices

- D-367 *Verification*: chose "are" with commas around "whose animation the browser cancels because the scene is hidden", over the colon the task also allowed; cost if wrong: one word of prose.
- `decision: D-367` quotation: chose the long quotation up to "is hidden" over the short prefix "Any other reading starts none" (already used at other cases), so the line names the part of the sentence this case holds; cost if wrong: a long comment line, which Prettier leaves as it is.

## Working copies

None made under `.runs/executor-11/`. Two output files of the checks were written to the system temporary directory by mistake (`fc11.txt`, `scene11.txt` under `the system's temporary directory`); both were removed. The tool's own task output file under the session's scratch directory belongs to the tool.
