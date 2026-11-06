# Slice 5 report: the scene moves

**Status:** done with concerns (see *Concerns*: a layout effect reads the walk's position from the browser; a scene hidden and shown again within 640 ms of a walk's start replays that walk). The orchestrator's two follow-ups — a re-trace at the committed head `d2851be` and a completion — are done (*Re-trace at the committed head*); they found no defect, so no code commit was added.

## Commits

Branch `task/scena-z-ludzikiem` in `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`, on top of `5d12eea` (the slice's base). Pinned the-way unchanged: `git -C .the-way rev-parse HEAD` = `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`, equal to the gitlink. Worktree clean after the commits.

- `3046a37` feat: :sparkles: move the scene by CSS alone: frames every 160 ms, the mage's 640 ms walk from where it stands, held at every stop, still under reduced motion
- `d2851be` test: :white_check_mark: check where the mage stands at once and where it walks, the place it keeps, the stops that hold every animation, a new action's bar and the elements a redraw keeps

## Files changed (`git diff --numstat 5d12eea..HEAD`)

| File | Added | Removed |
|---|---|---|
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/view/scene.tsx` | 174 | 25 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/styles.css` | 111 | 1 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/view/world-area.tsx` | 13 | 4 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/view/run-screen.tsx` | 17 | 6 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/tests/view/scene.test.mjs` | 328 | 13 |

Exactly the five files of the slice's *Change*. No file of `foundations/`, `guidelines/`, `src/browser/sim/` or `src/browser/view/scene-picture.ts` was touched.

## What was built

**CSS (all motion; `styles.css`).** Every animation stands inside `@media (prefers-reduced-motion: no-preference)` and is written in longhands, so none resets the play state:

- Frames: `.scene-mage-sprite img` and `.scene-fire[data-burning="true"] img` run `scene-frames` (`to { translate: -100% }`) over `calc(var(--frames) * 160ms)` with `steps(var(--frames))`, infinite: one frame every 160 ms for any sheet (idle 4, run 6, fire 4). Props and an extinguished fire have no animation.
- Walk: `.scene-mage[data-walking]` runs `scene-walk` (`from { translate: var(--walk-start) }`, the end is the element's own place) over 640 ms, linear. For the same 640 ms the run sheet is shown (`scene-shown`) and the idle sheet hidden (`scene-hidden`); outside a walk the run sheet is `visibility: hidden`.
- Facing: `.scene-mage[data-facing="left"] .scene-mage-sprite { transform: scaleX(-1) }` — the figure only, not the badge. The sheets face right (checked on the PNG).
- Bar: `.scene[data-standing="going"] .scene-badge-fill { transition: width 200ms linear }` (200 ms = `TICK_MS` of `clock.ts`, named in the comment) and `@starting-style { … width: 0 }`, so a new bar grows from empty over the first reading.
- Stops: outside the media rule, `.scene:not([data-standing="going"]) * { animation-play-state: paused; }` holds the frames, the fire, the walk and the sheet switch where they are at the pause, a discovery, a death and a completion. No transition on any filter: the pause's grey comes at once.

**`scene.tsx`.** Keeps in React state only what CSS cannot know (D-04: previous reading and events, nothing in the game state): `{ x, from, facing, walk }`.
- First draw (a load included) and an update whose events hold `mapRunStarted` (start, „Restart”): the mage is placed at its goal at once (the clearing where the goal is "stays" with no previous place); the events are compared by identity to the last ones seen, adjusted during render.
- A new goal place: a `useLayoutEffect` reads the offset the current walk has reached from the browser (`getComputedStyle(mage).translate`, `%` or `px`), then sets the new walk from that point, facing the way to the new place, with `walk + 1` as the mage element's key, so its animations start afresh. This runs before paint. Where no walk runs (or in jsdom) the offset reads as none and the walk starts from the last place.
- "Stays" (eat, light a stick, combat, death, completion, flax): the place of the previous reading is kept; a walk under way continues to its place.
- `onAnimationEnd` on the mage element itself clears `from` when the walk has finished, so a scene hidden and shown again (which restarts CSS animations) does not walk the mage again.
- The mage's figure (`.scene-mage-sprite`) now holds two sheets, `.scene-mage-idle` and `.scene-mage-run`. The badge is keyed by `run.current.startMinute`, so one action keeps one bar from reading to reading (the transition flows) and a new action, the same action at the same place included, gets a new, empty one.

**Wiring.** `run-screen.tsx` passes the `events` of `update` into `RunScreenView` → `WorldArea` (`events` required in `WorldAreaProps`) → `Scene` (`events?`, default a module constant so a redraw with no events sees nothing new).

## Checks (command, exit code)

Each `npm test -- <file>` builds first (the typecheck stands in the build).

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/scene.test.mjs` with the new cases, before any code | 1 | 8 failed, 11 passed. Each failure an assertion: the mage's sheets (`exactly one .scene-mage-idle: expected 1, got 0`), no walk at a change (`walking:false`), the clearing where the place should be kept (`expected 66.6667%, got 42.8571%`), no new bar element, the screen's wiring. The first-draw case passed already (the still scene stands at once); it is seen failing under mutation M1 below. |
| 2 | `npm test -- tests/view/scene.test.mjs` with the code | 0 | 19 of 19 |
| 3 | `npm test -- tests/invariants/test_browser_view_framework.py` (code touched) | 1 | `test_built_page_loads_only_its_own_code_and_no_framework`: its import regex `\bfrom\s*["']…` read the minified key `"--walk-from":…` as an import. A false match of the name, not an import; I renamed the custom property to `--walk-start` (no change to the check). |
| 4 | Mutations, each `npm test -- tests/view/scene.test.mjs`, then restored (`diff -q` against copies: identical) | 1 each | M1 first draw starts in the clearing and walks: 3 cases fail (first draw, redraw, kept place). M2 `mapRunStarted` ignored: „Restart” case and wiring case fail. M3 stop rule only for `paused`: the stops case fails. M5 mage keyed by the minute (rebuilt each reading): the redraw case fails. M6 facing reversed: the walk case fails. |
| 5 | M4, badge keyed without the map-run number | 0 | Survived: the walk key already replaces the mage, badge included, at „Restart”. I removed the redundant map-run number from the state and the key. The bar case then also passed for the wrong reason (its new action walked); I changed it to the same action again at the same place (precondition: no walk). |
| 6 | M4b, badge with no key, `npm test -- tests/view/scene.test.mjs` | 1 | The bar case fails; restored. |
| 7 | Final: `npm test -- tests/view/scene.test.mjs` | 0 | 19 of 19 |
| 8 | `npm test -- tests/view/run-screen.test.mjs` | 0 | pass |
| 9 | `npm test -- tests/view/world-area.test.mjs` | 0 | pass |
| 10 | `npm test -- tests/view/scene-picture.test.mjs` (module the scene draws from) | 0 | pass |
| 11 | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | pass (`160ms`, `640ms`, `200ms`, `steps(var(--frames))`, `-100%`, `scaleX(-1)`, `width: 0` are no token values under D-43) |
| 12 | `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | pass after the rename |
| 13 | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | pass |
| 14 | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | pass |
| 15 | `npm test -- tests/quality/test_quality_invariants.py` | 0 | pass (ESLint, Prettier, Ruff) |
| 16 | `npm run typecheck` | 0 | pass |
| 17 | The stream of frames (below) | — | see *Motion read from frames* |

**Not run:** `npm test` without arguments and `python -B .the-way/elements/common/foundation_check.py` (the orchestrator's gate; the slice changes no foundation file); `tests/invariants/test_loop2_container_sprites.py` (Docker; no sprite file added); Stryker (not adopted for browser-view).

## Motion read from frames

`npm run local` (a throwaway `example.test` account), Playwright CLI 0.1.22, states composed with the game's own functions and sent by the save request as `loop2-play` gives (scratch scripts in `.playwright-cli/`, not committed). Each trace records the screencast and, every animation frame, the mage's left edge in scene pixels (from its bounding box, which includes the walk's `translate`), the element's identity, `data-walking`, facing, which sheet is visible, the frame index of each sheet and of the fire, the play state and the bar's fill. Each folder below in `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/docs/task-cycles/scena-z-ludzikiem/frames/` holds the JPEG frames (named `<index>-<ms>ms.jpeg`), `samples.json`, `summary.txt` and, where named, a contact sheet of the scene I looked at.

| Folder | What it shows |
|---|---|
| `load-paused/` | Reload on the screen of the map run: the mage stands at the right edge (275) from the first sample, no walk, `paused`, one frame only. |
| `pace-1x/` (`sheet-walk.png`) | 25 s at 1×. Frames change every 157–164 ms; the mage element stays the same for 20 s (about 100 readings). One walk 275 → 42 in 643 ms, linear (x drops about 20 px every 54 ms), facing left on the run sheet (frames 0–3), idle sheet at its end; the new „Zbierz” bar starts empty. Bar: 1466 changes, none backward. |
| `pace-4x/` | 8 s at 4×: frame gaps 157–164 ms; three repeated gathers at the sticks, each a new bar, none running back; no walk (same place). |
| `pace-16x/` (`sheet-walk-death.png`) | 16×: walk 42 → 144 in 643 ms, frames at the same beat; then a death of cold: mage grey, no badge, x, frames and play state frozen for 5 s, the screencast gives no further frame. |
| `restart-16x/` | „Restart”: the mage goes from 144 to 275 within one animation frame (8 ms, a new element), then a 643 ms walk to the sticks; frame gaps 157–164 ms. |
| `discovery-during-walk-16x/` | The first chill stops the run 182 ms into a walk 42 → 144: the mage holds at x 71 on its run sheet, in colour, for the rest of the 3 s; the same reading changed the target, and the new walk was mounted already held. |
| `discovery-resume-16x/` | „Wznów”: the held walk goes on from 71 to 275 (643 ms), then a walk 275 → 224. |
| `pause-during-walk-16x/` (`sheet-pause.png`) | „Pauza” 250 ms into a walk 275 → 224: the mage holds at x 255.2, run sheet, frame 1, facing left, grey, badge not mirrored, for the remaining 10.5 s; no further frame. |
| `turn-on-the-way-16x/` (`sheet-turn.png`) | Target changed on the way: walking left to the fire, at x 219.6 the bush becomes the target; the next sample is still 219.6, now facing right, and the mage walks on to 224. The burning fire's frames change every 157–164 ms. |
| `reduced-motion-turn-16x/` (`sheet-reduced.png`) | `prefers-reduced-motion: reduce` emulated (`page.emulateMedia`, `matchMedia` true): each new place within one frame (275 → 80 in 8 ms, 80 → 224 in 6 ms), idle sheet throughout, no frame of the mage or the fire changes, the bar changed 12 times in 2.5 s (at the readings). |
| `reduced-motion-pause-16x/` (`sheet-pause-grey.png`) | Reduced motion, „Pauza” at 303 ms: the grey frame at 310 ms, nothing between. |
| `reduced-motion-pause-restart-16x/` | Reduced motion, „Restart” of an ended run: placed at once (12 ms). |

**Redraws restart nothing (D-03's risk):** in `pace-1x`, `pace-4x` and `restart-16x`, outside the 200 ms after the mage's element is replaced (a walk start, „Restart”), every gap between frame changes is 157–164 ms (152, 49 and 45 gaps): no reading of the clock restarted a frame animation, and the element was replaced only at walks and „Restart”.

The traces in this table were taken one revision before the last change of the badge's key (`${run}-${startMinute}` → `startMinute`); the re-trace below repeats the bar and redraw checks on the committed head.

### Re-trace at the committed head (`d2851be`)

`npm run local` built from the clean worktree at `d2851be` (`git log -1` = `d2851be`, `git status` empty), a new throwaway `example.test` account, states composed and sent as before. New folders only, suffix `-head`; no earlier folder was touched. Bar figures come from `.playwright-cli/bar-check.mjs` (scratch): per bar element, its first fill, its changes, steps backward and the largest step between two animation frames.

| Folder | What it shows |
|---|---|
| `pace-1x-head/` | 4 s at 1× after „Wznów”, about 19 readings of the clock: the mage element never replaced; every gap between frame changes 157–164 ms (23 gaps); one bar from 0 to 0.184 in 184 changes, 0 backward, largest step between frames 0.001 (a reading adds about 0.01 at 1× for a 20-minute action), so the bar flows between readings rather than stepping at them. |
| `pace-16x-head/` (`sheet-bars-head.png`, `sheet-bars-head-zoom.png`) | 4 s at 16× across seven bars: the end of an exploration, a walk 275 → 42 in 643 ms, then five gathers at the sticks with no walk. Each new action's bar is a new element and its first fill is 0; none steps backward; the largest step between frames is 0.011 (0.028 on the first frame of one bar), where a reading adds about 0.32 at 16× for a 10-minute action. The mage element is replaced only at the walk's start (695 ms); outside the 200 ms after it, all 23 frame gaps are 157–164 ms. |
| `pace-8x-head/` | 3 s after the mage had frozen to death at 16× between traces: one frame, `dead`, x, frames and play state frozen (the 8× click found no pace buttons). |
| `restart-8x-head/` | „Restart” (144 → 275 in 8 ms, a new element), then 8×: a walk 275 → 42 in 643 ms; three bars each from 0, 0 backward, largest step 0.006; outside the two element replacements all 21 frame gaps are 157–164 ms. |
| `completion-1x-head/` (`sheet-completion.png`) | A save composed at minute 476 of Las, gathering sticks (`.playwright-cli/compose-complete.mjs`, checked with the game's own functions: completed at minute 480), loaded paused, „Wznów” at 1×. At 4112 ms the status reads „Minuta 480 · Las rozwiązany” and `data-standing="completed"`; from then on x 42, the idle and run frames, `paused` play state and the mage element stay the same for 477 samples, the badge is gone (`.scene-badge` count 0), and the screencast gives no frame after 4138 ms. `getComputedStyle` gives `filter: none` on the scene and on the mage's figure: the mage in colour, as the frame shows. |

**Result:** no redraw restarted an animation at the head; a new action's bar starts empty, also for the same action again at the same place, and never runs back; the bar fills smoothly between readings at 1×, 8× and 16×; a completion holds all motion, removes the badge and leaves the mage in colour. No defect, so no new code commit and no rerun of the focused checks was needed.

**Not shown or unchecked:** a death during a walk was seen once (the mage held at x 51.7 on its run sheet, frame 3, grey, `dead`, from its first sample), but my next trace reused the folder name and replaced those frames: that observation stands on the sample quoted here only. 2× was not traced. As D-254 notes, frames sampled by an agent can miss a jerk a person sees at 16×: **the human's own viewing at 1×, 4× and 16× before the merge stays** (Acceptance criteria; D-254).

## Own-work check

- **Requirement most likely not met:** "every stop stops all motion where it is … the mage on its way" together with "a target changed on the way turns it from where it is" — a CSS transition cannot be paused and a CSS animation does not start from where another left off. **Check:** the frame traces of a pause and a discovery 182–250 ms into a walk and of a turn on the way, reading the mage's position every animation frame. **Result:** held at 255.2 and 71, resumed from 71, and turned at 219.6 with no jump (above).
- **UI check (`ui_check.md`):** the scene is no shared control, so the styleguide's control states do not apply; the running screen was inspected by the settled route (`loop2-play`, D-254) — the contact sheets listed above.

## Choices (with the way rejected and the cost if wrong)

1. **The walk is a CSS animation of `translate`, started on a new element from an offset the browser reports.** *Rejected:* a CSS transition on `left` (turns from where it is by itself, but no CSS can pause it, so the mage would slide on at a pause); a walk from the previous target as the old Loop did (`Scene.tsx:139-142`, facing from the last target) — wrong start and facing whenever the target changes on the way. Cost: one `useLayoutEffect` that reads computed style (see *Concerns*).
2. **The run → idle switch is a 640 ms visibility animation on each sheet, and `onAnimationEnd` clears the walk afterwards.** *Rejected:* switching sheets from the event alone (the switch would depend on JS, not CSS); never clearing (a scene shown again replays every last walk). Cost: an event handler in the scene, though no timer.
3. **Linear walk timing.** *Rejected:* the old Loop's `cubic-bezier(.4,0,.3,1)` — the run frames slide at the ends. Cost: a feel question for the human's viewing.
4. **"Stays" during a walk lets the walk finish to its place** (the place of the previous reading). *Rejected:* stopping at the reached point. Cost: at 16× an eating mage may finish a walk it started for the previous action.
5. **The bar starts empty by `@starting-style` and fills by a 200 ms linear transition, both only while the scene goes on.** *Rejected:* no starting style (the first reading of a new action would show up to 64 % at once at 16×); the transition at a stop too (the bar would move at a pause and grow from zero when the screen is shown again). Cost: a browser without `@starting-style` shows the first reading's fill at once.
6. **Facing kept at „Restart” and right at a first draw.** No source names it. Cost: none seen.
7. **Custom property `--walk-start`, not `--walk-from`** (check 3).

## Concerns

- **D-267 reading:** the layout effect does not connect to an outside system; it measures one (the walk's offset the browser has reached) and sets state from it before paint. I read that as synchronising with the browser, not transforming render data, but a reviewer may read it otherwise. No dependency is left out (`pending`, `shown`, `frameWidth`).
- **Hidden and shown within a walk:** `display: none` on the screen cancels a running walk without `animationend`; shown again, the walk replays from its start. Leaving the screen pauses the run, so the mage reappears held at the walk's start and walks its 640 ms on „Wznów”. Only within 640 ms of a walk's start. React has no `onAnimationCancel` handler.
- **Reduced motion switched off while a walk is pending clear** (no `animationend` under reduce) would play that last walk once. Edge only.

## Reaches beyond the handoff

- `C:/Storage/repos/loop/src/components/probe/Scene.tsx` whole (the task's *Context* names it; the handoff did not): how the old Loop walked and faced.
- `src/browser/sim/understanding.ts` (`discover`, `happened`), `src/browser/sim/data/balance.ts` (`chilledBelow`), `src/browser/sim/game.ts:180-251` (`startRun`), `tests/sim/understanding-fixture.mjs`: to compose a discovery landing during a walk. Slice 4's `compose-scene.mjs` (minute and streak near 480) for the completion of the re-trace.
- `tests/invariants/test_browser_view_framework.py` (its `IMPORT_SPECIFIER` regex, check 3) and the head of `tests/invariants/test_browser_view_token_values.py` (what it scans).
- The slice-4 scratch scripts in `.playwright-cli/` (`compose-scene.mjs`, `put.sh`) as the base of mine.
- `tests/invariants/test_browser_view_framework.py`, `test_browser_view_focus_outline.py`, `test_content_identifiers.py`, `scene-picture.test.mjs` and `npm run typecheck` run beyond the slice's *Checks*, as code they cover was touched.
- `C:/Storage/The Brain/The Brain/.ai/rules/git.md` and `scripts.md` (before the commits and the scripts).

## Searches not found or unclear

- Unclear: the handoff says read `ui_check.md` "only if the slice changes a user interface and its step names it"; the slice's section does not name it, `make-change` section 3 does. I read it after the work (it adds nothing the slice had not done).
- Not found: a CSS-only way to hold a walk at a stop and also turn it from the reached point; hence choice 1 and the first concern.
- Not found: a source for the walk's timing curve, for the facing at „Restart”, or for whether a walk under way finishes when the next activity "stays" (choices 3, 4, 6).
- Mismatch: the slice's *Checks* do not name `test_browser_view_framework.py`, which this change's code made fail (check 3).

## Personal data

None. The local account used an `example.test` address and a throwaway password on the database `npm run local` makes for its start; neither is in this report.
