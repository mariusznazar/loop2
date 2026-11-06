FAIL c6dd7c39ff7bdbb41771fab8ccb518f1361654eb

# Review of the whole change — task `scena-z-ludzikiem`

- Range: `8f9e713..c6dd7c3` (base to head); `git rev-parse HEAD` = `c6dd7c39ff7bdbb41771fab8ccb518f1361654eb`, as given. Pinned the-way `61c72fb` (gitlink and checkout agree). Worktree clean before and after the review.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`. Read-only; no tracked file changed, no commit.
- Counts: blocking 1 (Important) · Minor 11 · out of scope 1.

## Changed files (`git diff --stat 8f9e713..c6dd7c3`)

| File | Lines |
|---|---|
| `README.md` | +1 −1 |
| `assets/sprites/berry-bush.png`, `fire.png`, `mage-idle.png`, `mage-run.png`, `moss.png`, `sticks.png` | 6 new binaries (654, 1056, 1564, 2294, 203, 306 bytes) |
| `foundations/decisions.md` | 286 (+ / −) |
| `foundations/invariants.md` | +10 |
| `foundations/part_map.md` | +1 |
| `guidelines/coding-browser-module.md` | +2 |
| `guidelines/coding-content-data.md` | +1 |
| `guidelines/styleguide-browser-view.md` | 79 (+ / −) |
| `src/browser/sim/data/scene.ts` | +77 (new) |
| `src/browser/styles.css` | 219 (+ / −) |
| `src/browser/view/run-screen.tsx` | 23 (+ / −) |
| `src/browser/view/scene-picture.ts` | +169 (new) |
| `src/browser/view/scene.tsx` | +281 (new) |
| `src/browser/view/world-area.tsx` | 44 (+ / −) |
| `tests/invariants/test_loop2_container_sprites.py` | +181 (new) |
| `tests/view/scene-picture.test.mjs` | +470 (new) |
| `tests/view/scene.test.mjs` | +759 (new) |
| `tests/view/world-area.test.mjs` | 38 (+ / −) |

23 files, 2555 insertions, 87 deletions.

## Findings

### Critical

none

### Important

**I1. D-43's new example says sprite positions in `px` in the stylesheet comply, and the guard of D-43, `browser-view-token-values`, refuses exactly that** — blocking; comes from the plan's *Foundation entries* (E6), commit `0d11c97`; spans Slice 6 (`c6dd7c3`), whose styleguide text states the narrower, true behaviour.

- *Place:* `C:\Storage\repos\loop2-wt\scena-z-ludzikiem\foundations\decisions.md:914` (D-43 *Verification*, complies): "the frames and positions of the mage's sprite written in `px` in the stylesheet of the scene".
- *What is wrong:* the invariant `browser-view-token-values` (`foundations/invariants.md:459-467`) holds "No file of the part browser-view other than `src/browser/tokens.css` holds in its text a value written in place of a design token, as D-43 defines it", and its test reads every `px` length in a stylesheet outside the layout properties `width`, `height`, `min-*`, `max-*`, `grid-template*` (`tests/invariants/test_browser_view_token_values.py:31-34`, `LAYOUT_PROPERTIES` at :138). A sprite's position in `px` in `src/browser/styles.css` — `left: 42px`, `translate: -64px`, `background-position: -64px 0` — is flagged. The change's own code avoids this by giving every place and frame as a percentage from TypeScript (plan *Choices*: "the stylesheet holds no `px` of a sprite and the guard `browser-view-token-values` stays as it is"), and the styleguide says so: "Wyjątki ze sceny przepuszcza test `browser-view-token-values`, bo … geometria i położenia obrazków stoją w TypeScripcie … jako procenty kadru" (`guidelines/styleguide-browser-view.md:122-126`). D-43's example says the opposite.
- *Why it matters:* the next task that draws in the scene (17: the bending mage, the flying icon, the dust; 20: the wolf) reads D-43's example as permission, writes a sprite position in `px` into the stylesheet and gets a red gate on an invariant that claims to read "as D-43 defines it" — or a reviewer reading D-43 accepts what the guard refuses. To do 14 asks that "jego reguła „No value in place of a design token” i strażnik `browser-view-token-values` przepuszczają klatki i pozycje obrazka"; the guard does so only for the TypeScript form, and D-43's example now promises a form it does not let through. Graded by WAY-263: the entry this change writes restates more broadly than the change's files do.
- *Evidence:* a probe of the guard's own function, `python -B -c "import test_browser_view_token_values as t; print(t.value_findings('left',' 42px')); print(t.value_findings('translate',' -64px')); print(t.value_findings('height',' 32px'))"` run in `tests/invariants/`, exit 0: `['the length 42px']`, `['the length -64px']`, `[]`.
- *Recommended fix (one line, return step):* replace the example with one the guard and the code agree with, e.g. "the frames and positions of the mage's sprite given from TypeScript as percentages of the scene's frame". The binding phrase "the frames and positions of a sprite" is the approved definition's wording (task, *Decisions in play*, D-43) and is still wider than the guard for a stylesheet; that gap is the cost the plan's *Choices* accepted ("a later task that needs a `px` of a sprite in the stylesheet changes the guard then") and should be named in the request for the human rather than settled here.

### Minor

**M1. D-317's title promises durations its body does not state** (`foundations/decisions.md`, D-317, heading "How long do the scene's effects last?"; body: only reduced motion and no flash). Graded from `slice-1-review.md` Minor 1. The partial entry is the task's assignment (*Decisions in play*: "Część tego zadania: ostatnie zdanie"); task 20 completes the body. In scope, Minor, nothing to fix now.

**M2. README sentence repeats „autorstwa Anokolisy, których warunki nie wymagają wzmianki”** (`README.md:25`). Graded from `slice-1-review.md` Minor 3. Correct and complete (it names all six files, as plan Slice 1 asks); one long list item. Polish only.

**M3. `berry-bush.png` holds a bush with no berries** (`assets/sprites/berry-bush.png`). Graded from `slice-1-review.md` Minor 4. The name is the game's name for the thing ("krzak jagód", D-316, D-318); the pack has no bush with berries and D-271 forbids another pack. No action.

**M4. D-318 names the fibre "the flax"** (`foundations/decisions.md`, D-318: "Where its action leads nowhere — the flax, „Zapal — patyk”, …"). The game's resource is `fiber`, named „włókno” (`src/browser/sim/data/resources.ts:19`); "flax" is only its icon's file. The task says „przy włóknie”. A reader of D-318 looks for a resource the data does not call so. Word change.

**M5. The case "a loaded map run comes back paused, so it stands as at a pause" tests nothing of a load** (`tests/view/scene-picture.test.mjs:416-423`). Its input is the same `{ paused: true, discovery: null }` state as the pause case above it (`:407-414`); nothing of `loadSavedGame` or of D-212 is exercised, so the title claims coverage it does not give. The load is covered in fact by the scene's first-draw case (`tests/view/scene.test.mjs:525-533`), since a load builds a new game view (`src/browser/view/app.ts:433-446` → `showGame`), and by the frame stream `frames/load-paused/`. Rename the case or drop it.

**M6. A walk replays after the screen of the map run is hidden and shown again within 640 ms of the walk's start** (`src/browser/view/scene.tsx:221-230`, `onAnimationEnd`). `display: none` cancels the running animation with no `animationend`, so `from` stays set; shown again, the mage stands at the walk's start, held (leaving the screen pauses the run), and walks the 640 ms again on „Wznów”. At 16× actions of 5 game minutes last about 312 ms, so the mage walks most of the time and leaving mid-walk is common; the visible effect is a jump back to where the last walk began. Named by the executor (`slice-5-report.md`, *Concerns*). Small and self-correcting; Minor.

**M7. Where the next action "stays", a walk under way finishes at its old target** (`scene.tsx:122-126`, `placeOf` keeps `current.x`, the walk's target). D-318 says the mage "stays where it stands"; at 16× a mage that starts „Zjedz” while running to the sticks keeps running to them. The plan's Slice 3 ("the place is left to the scene's previous reading") and D-04's complies example allow this reading, and the executor chose it openly (`slice-5-report.md`, choice 4). Worth the human's eye at 16×; Minor.

**M8. The container test's docstring cites a cycle artefact** (`tests/invariants/test_loop2_container_sprites.py:12-13`: "the case of Slice 3 of task `scena-z-ludzikiem` ties the files the drawing asks for to these files"). "Slice 3" exists only in `.runs/`, which git ignores; after the merge the pointer leads nowhere. Name the case instead: `tests/view/scene-picture.test.mjs`, "every file the scene's data names stands directly in assets/sprites/ as a .png file".

**M9. The invariant `loop2-container-sprites` departs from the approved definition's projected entry** (`foundations/invariants.md:1209-1217`). The definition (`definicja_mvp2_loop2.md:1374-1382` in the vault) reads "The image of the application holds in the directory the account and save server serves every file the scene's drawing asks for", *Method* `review`, *Part* `build-tools, deployment`, *Derives from* D-271. The written entry rewords the sentence (served at `/sprites/<file name>`, same bytes), sets *Method* `test`, widens *Part* to five parts and adds D-316. The method change is the plan's explicit choice and the foundation report names it (concern 1); the entry is stricter, not looser, and its test runs and passes. Task 20, which writes the entry, will find it changed; Minor.

**M10. The grey `grayscale(1) brightness(0.55)` stands in two decisions as binding, though no human chose it** (D-316 and D-322). The task's source says only „bez koloru” for the extinguished fire and „mag jest szary” for the dead mage; the value is the orchestrator's autonomous choice, traced to the old Loop (`sprites.tsx:64`, which the task's own citation of `Scene.tsx:210` implements). Changing it after the human's viewing now takes a decision change rather than one value in `styles.css`. Name it in the request as a value for the human to confirm.

**M11. The styleguide's rule "Contrast of every pair" does not mention the progress fill** (`guidelines/styleguide-browser-view.md:170-172`: "pasek w `positive` i w `warning` nie dokłada pary, bo te role mają już próg 4,5:1"), while the new rule "The scene of a map run" states 3:1 for the fill against what it stands on. No check is missing — `positive` on `highlight` is already a text pair at 4,5:1 (6,02:1 at today's values) — but the two rules now word the threshold differently. Named by the slice-6 executor. One clause.

### Out of scope

**O1. D-122 now contradicts itself** (`foundations/decisions.md:2247`: "Accepted with it: a stop at a discovery cannot be told apart in the game state from the player's pause", beside the new clause that the scene keeps its colours at a stop at a discovery). Graded from `slice-1-review.md` Minor 2. The task assigns the correction to task 16 (*Context*: „zdanie poprawia zadanie 16, które zapisuje D-122”). Minor, out of scope; named so that task 16 does not miss it.

## Against the task

- **To do 1** — met: the scene replaces task 6's `img` in the world area (`world-area.tsx`), the forest of D-314 as background, `SCENE_SCALE` 2 kept (672 × 304); full light (no layer).
- **To do 2** — met: `mage-idle.png` (4 × 64×64) and `mage-run.png` (6 × 64×64), the pack's Wizzard; D-271 part written.
- **To do 3** — met: `goalOf` in `scene-picture.ts` gives each line of the table; a case per line in `scene-picture.test.mjs:92-161`; fibre stays (M4 on the wording of D-318).
- **To do 4** — met: three props always, the fire only on the character's tile, extinguished as the same sheet without colour and without the frames animation (`styles.css`, `.scene-fire[data-burning="false"]`); screenshots `scale2-at-the-fire-burning.png`, `scale2-at-the-fire-extinguished.png`.
- **To do 5** — met by CSS alone: frames `calc(var(--frames) * 160ms)` in `steps`, walk 640 ms, a turn from the reached offset, at once at a first draw and at `mapRunStarted`. Frame streams: frame gaps 157–164 ms, mean 160 (`pace-1x-head`, `completion-1x-head`); a walk of 643 ms at 16× (`pace-16x-head`, 695 → 1338 ms); a turn at x 219.6 with no jump (`turn-on-the-way-16x`); „Restart” placing at once (`restart-16x`, `reduced-motion-pause-restart-16x`). No interval, timer or animation frame in the scene's code.
- **To do 6** — met: badge on `panel`, icon as the `.action-icon` mask in `text-strong` (`color` of `.scene-badge`), fill `positive` on track `highlight`; no badge while waiting or in combat. Icon 32 px at scale 2 by viewing.
- **To do 7** — met: files, sizes and places in `src/browser/sim/data/scene.ts`; the view names no resource, map or archetype (`content-identifiers` passes).
- **To do 8** — met: `data-standing="paused"` greys the scene with `grayscale(1) brightness(0.5)`; every non-going standing pauses every animation (`.scene:not([data-standing="going"]) *`); discovery stays in colour. Streams `pause-during-walk-16x` (held at 255.2) and `discovery-during-walk-16x` (held at 71, resumed from 71).
- **To do 9** — met: after a death the mage's figure takes the grey and the badge goes; after a completion in colour, badge gone (`completion-1x-head`).
- **To do 10** — met: all motion inside `@media (prefers-reduced-motion: no-preference)`, so under reduce frames stand, the mage is placed at once, the bar jumps (streams `reduced-motion-*`); no effect lights or darkens the whole scene (the pause's grey is a single step on the player's act, no animation).
- **To do 11** — met: `aria-hidden`, empty `alt`, `draggable={false}`, no handler but `onAnimationEnd`, no focusable element; click case through the real `createRunScreen` (`scene.test.mjs:415-447`).
- **To do 12** — met: six PNGs directly in `assets/sprites/`, chunks `IHDR`, `IDAT`, `IEND` only; `dist/public/sprites` equal to `assets/sprites`; the container serves each with the same bytes (Docker answered; test ran, not skipped).
- **To do 13** — met, with I1 and M9/M10: E1–E10 and rows 1–9 are written (D-316–D-322, parts of D-04, D-39, D-40, D-43, D-122, D-271; the invariant). Each checked against the task's sentences and, where the foundation agent reached it, the definition (`definicja_mvp2_loop2.md:299-340, 1374-1382`); the D-271 rationale "The mage matches the game's only archetype and its frames are ready" is the definition's (line 339). Nothing else invented.
- **To do 14** — met in the styleguide; the guard half is I1.
- **To do 15** — met: rows `scene-picture.ts`, `scene.tsx` (status `copy`) and `src/browser/sim/data/scene.ts` (`copy`).
- **Acceptance criterion** — the human's viewing of the task's branch with `npm run local` at 1×, 4× and 16× stays unchecked; the agent's screenshots and streams replace no part of it (D-254). The 8× stream `pace-8x-head` caught no change (its button press failed, 1 frame), which matters to nothing the task requires.
- **Settlements to record, rows 1–9** — each met in an entry and in the code: row 1 D-322/D-122; row 2 D-318; row 3 D-316; row 4 D-319; row 5 and 6 D-320; row 7 D-321; row 8 D-322; row 9 D-320, D-40, D-43.

## Against the foundation

- **D-03 / D-03's accepted risk** — a redraw rebuilds no element that runs an animation: the badge is keyed by the action's start minute and the mage by the walk's number, both stable between readings (`scene.test.mjs:693-726`); streams show no restart.
- **D-04** — what the scene keeps between readings is its own shown place, facing and walk number, never the game state; nothing enters the save. The start of a walk is read from the browser's computed `translate` of the mage's element. I judged this within D-04 as written here: it is the state of the CSS motion D-316 makes the scene's source of motion, not a further source of the game's picture, and without it the turn of D-319 cannot be made while a stop holds the walk (a transition cannot be paused; the plan's own choice would also have had to read the reached place to pin it).
- **D-267** — the `useLayoutEffect` (`scene.tsx:190-204`) is called at the top level before the early return, lists every reactive value it reads (`pending`, `shown`, `frameWidth`; the ref and the setter are stable), and measures the DOM before paint to set state, which is the documented use of a layout effect: it synchronises with the browser's running animation, it does not transform props for drawing. It connects to nothing, so it needs no cleanup. The two render-phase state adjustments (`setSeenEvents`, `setShown` at a first draw or `mapRunStarted`) are React's pattern for state from the previous render and converge in one extra render. Complies.
- **D-18, `content-identifiers`** — complies (test passes; `scene-picture.ts` names action kinds, no resource, map or archetype).
- **D-39, D-40, D-43, `browser-view-token-values`** — the code reads tokens alone (`--panel`, `--highlight`, `--positive`, `--text-strong`, `--space-xs`, `--bar-width`); `16px`/`32px` stand on `height`, a layout dimension; durations and filters are no value D-43 counts. Test passes. I1 on D-43's example.
- **D-44, D-47, D-272, D-321** — no control, nothing the keyboard reaches, no text on or over the scene.
- **D-45, D-269** — the kitchen-sink page draws no game and imports no `.tsx`; untouched.
- **D-271, `sprite-file-content`, trust boundary `assets/sprites/**`** — each new file is a PNG whose chunks are `IHDR` (8-bit RGBA), `IDAT`, `IEND`, CRCs valid, no bytes after `IEND`; no text, time, gamma, profile or size chunk; only the build copies them (`copySpriteFiles`), and they reach the image unchanged (container test). Crafted input at the boundary: nothing in these files can act in the page.
- **D-316–D-322** — the code does what each says (see To do 3–11), with M7 on a reading of D-318.
- **Changed invariant test:** none changed. **New invariant test:** `tests/invariants/test_loop2_container_sprites.py` (`loop2-container-sprites`), claimed by `deployment` in the part map; the companion case `tests/view/scene-picture.test.mjs:450-470` carries `// invariant: loop2-container-sprites`.

## Against the guidelines

- `guidelines/coding-browser-module.md` — *Hooki*, *Efekty* (see D-267 above), *Nazwy treści z danych* (met); `scene.tsx` and `scene-picture.ts` follow the shape of `terrain-drawing.tsx`/`terrain-picture.ts`.
- `guidelines/coding-content-data.md` — `scene.ts` imports simulation files alone, `satisfies` against `Record<ArchetypeId, …>` and `Partial<Record<ResourceId, …>>`.
- `guidelines/testing.md` — *Tests on a document imitation*: both React test files import `tests/view/page-document.mjs` first and take its `assert`; expected places written out as numbers; M5 on one case's title.
- `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` — no new token, colour or role; the new rule *The scene of a map run* has *Decision*, *Invariant*, *Good*, *Bad* and prose, as `.the-way/product-guidelines/template.md` gives; it points to values rather than writing them, as the styleguide template asks. M11.

## Slices with no review of their own (2–6), executors' own-work checks

- **Slice 2** (`d3a04f3..bd7216b`) — the requirement it named (each PNG served with its bytes, an empty set failing) is where it is weakest; its check (a real image plus a wrong expectation seen failing) would catch it. I re-ran the test with Docker: passes. M8.
- **Slice 3** (`bd7216b..73564b5`) — its own-work check found the figure one column outside the frame at the right edge (292); slice 4's `5d12eea` moved the places (right edge 275, figure ends at 319). The check fitted the weakest point. M5.
- **Slice 4** (`73564b5..5d12eea`) — its check (click case through the real screen, the greys read from the real stylesheet, the right edge by screenshot) fits; I viewed `scale2-gathering-stick-badge.png`, `scale2-after-death.png`, `scale2-at-the-fire-extinguished.png`, `scale1-gathering-stick-badge-page.png`: badge over the head, dead mage grey with the scene in colour, extinguished fire grey and still.
- **Slice 5** (`5d12eea..d2851be`) — its check (frame traces of a pause and a discovery during a walk and of a turn) fits the weakest requirement and shows it met. Its departure from the plan's *Choices* (an animation started from a measured offset instead of a transition) is named with its reason; I accept the reason. The `--walk-from` rename that once failed `test_browser_view_framework.py`: that test passes at the head. M6, M7.
- **Slice 6** (`d2851be..c6dd7c3`) — its check (no value written into the styleguide) fits the template's rule. Its four uncertainties: the effect rule — settled above (complies); the contrast pair — M11; values pointed to rather than written — correct by the template; the track's text role — see *Declined to judge*.

## Declined to judge

- The contrast of the track (`highlight` #27272a) against the badge (`panel` #18181b), about 1,2:1: no requirement of the task or the foundation sets a threshold for a track; the human's viewing decides whether the empty part of the bar reads.
- The walk's linear timing and the slow crawl of a short walk after a turn (4,4 px in 640 ms, `turn-on-the-way-16x`): D-319 fixes 640 ms whatever the distance and rejects a time by distance; the feel is the human's at the viewing.
- The badge's position (`bottom: 56%`) and size at scale 1: chosen by viewing, as the task leaves to the cycle; the human judges it at 1×, 4× and 16×.

## Checks run

| Command (from the worktree root unless named) | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 | head and pin as given |
| `git diff --stat 8f9e713..c6dd7c3`; `git log --oneline 8f9e713..c6dd7c3`; `git diff 8f9e713..c6dd7c3` (all files) | 0 | 15 commits, 23 files |
| `npm test -- tests/view/scene.test.mjs` (builds first) | 0 | 19 pass |
| `node scripts/test-node-file.mjs tests/view/scene-picture.test.mjs` | 0 | 30 pass |
| `node scripts/test-node-file.mjs tests/view/world-area.test.mjs` | 0 | 13 pass |
| `node scripts/test-node-file.mjs tests/view/run-screen.test.mjs` | 0 | 7 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 4 tests OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 9 tests OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | 5 tests OK |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_loop2_container_sprites.py` | 0 | 1 test OK in 88,8 s — Docker answered, image built, not skipped |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |
| `python -I -c …` reading the chunks, IHDR and CRCs of the six new PNGs | 0 | `IHDR`, `IDAT`, `IEND` only; 8-bit RGBA; CRC valid; no trailing bytes; sizes 256×64, 384×64, 128×32, 22×13, 29×27, 12×9, matching `scene.ts` |
| `git diff --no-index --stat assets/sprites dist/public/sprites` (after the build above) | 0 | identical |
| `python -B -c` probe of `value_findings` in `tests/invariants/` (I1) | 0 | `left: 42px` and `translate: -64px` flagged, `height: 32px` not |
| `git status --short` after all runs | 0 | empty |
| Manual: four screenshots viewed; `summary.txt` of all 17 frame streams read | — | as cited above |

Not run: the full gate (`npm test` with no argument) — the cycle's own run; a mutation run — not needed beyond the slices' reported mutations, since the cases read computed style from the real stylesheet and fail visibly on a missing rule (the pause case asserts `paused`, which jsdom returns only from the rule).

## Reaches beyond the handoff

- Vault `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md`, lines 299-313, 331-340, 1374-1382: the approved projected wording of D-316, D-271 and `loop2-container-sprites`, for fidelity (M9, D-271 rationale).
- `tests/invariants/test_browser_view_token_values.py` (header and `value_findings`): to test I1.
- `src/browser/view/app.ts:425-446` and `src/browser/view/game-view.ts:500-600`: whether a load remounts the scene (it builds a new game view) and how the run screen is hidden and updated (M5, M6).
- `src/browser/sim/game.ts` (`startRun` events, `realMsCarry` at :602-611) and `src/browser/sim/types.ts:51-60, 119-123`: `mapRunStarted` on send and restart, the carry being pace-scaled (the progress is right), the combat actions.
- `src/browser/sim/data/resources.ts:19`: the fibre's name (M4).
- `src/browser/styles.css:470-477` (`.action-icon`) and `src/browser/tokens.css` (`--space-xs`, `--bar-width`).
- `foundations/decisions.md` D-03, D-44, D-47, D-267, D-272 whole; `foundations/invariants.md` `browser-view-token-values`, `sprite-file-content`, `loop2-container-icons`, `content-identifiers`.
- `scripts/test.py`: what a single-file run builds and writes (only the ignored `dist/`).
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`: the user's rule before the one-off Python probes.

## Searches not found or unclear

- My foundation selection was narrower than "Reading the foundation" step 2 gives (every decision whose *Scope* names a touched part — here browser-view, simulation, build-tools, deployment, product-foundation and agent-workflow, several hundred entries): I read whole every entry the change writes or changes, the entries of the task's *Decisions in play* that the code reaches (D-03, D-04, D-39, D-40, D-43, D-44, D-47, D-122, D-267, D-271, D-272) and the invariants the code and tests reach. A decision of those scopes that none of these links to was not read.
- Whether the binding phrase of D-43 "the frames and positions of a sprite" is meant for any file or only for TypeScript: unclear from the task; the plan read it as TypeScript-only for this task (I1).
- A rule saying which threshold a progress fill keeps in "Contrast of every pair": not found (M11).
- Whether the human expects a badge size at scale 1 other than 16 px: not found; left to the viewing.
