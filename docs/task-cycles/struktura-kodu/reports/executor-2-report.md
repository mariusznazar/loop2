# Report — executor of slice 2 (Scene divided under the threshold of a function)

**Status:** done

## Commits and files

- `2fc6b1e0` refactor: :recycle: divide Scene under the threshold of a function, its memory from one reading to the next kept in one object whose advance is the pure functions of the new scene-memory.ts, and the ground, the mage's box and the handlers of an animation's end and cancel as helpers of scene.tsx (author address checked: the private one).
- `src/browser/view/scene-memory.ts` — new, +346 / −0.
- `src/browser/view/scene.tsx` — +185 / −317.

Sizes by the rule's own counting (lines of code without comments and blank lines; measured by a copy of the rule's options with threshold 1, see Working copies):

| | before (`78f081b5`) | after |
|---|---|---|
| `Scene` | 366 | 184 |
| `scene.tsx` (file) | 736 | 631 |
| `scene-memory.ts` (file) | — | 234 |
| largest function of `scene-memory.ts` | — | `effectsAfter` 40 |

What `scene.tsx` exports is unchanged: `SceneProps`, `Sheet`, `Scene`.

## How the function was divided

The verdict's hypothesis held in the code. The seven `useState` slots of `Scene` (shown, seenEvents, lastState, effects, creatureEffects, tint, moment) became one `SceneMemory` object in one `useState`. Its advance from one reading to the next is the pure function `advanceMemory(memory, state, drawing, events)` in `scene-memory.ts`, built of `mageAfter`, `effectsAfter` and `momentAfter` and the existing `tintShown`; it returns the memory it was given where nothing changes, so the component keeps the existing render-phase pattern: `const memory = advanceMemory(kept, …); if (memory !== kept) setKept(memory);`. The ends of animations became pure updaters there too (`walkStarted`, `walkEnded`, `effectEnded`, `creatureEffectEnded`, `tintReturned`, `momentSettled`), called through `setKept((now) => …)`. The types `Facing`, `Shown`, `Effects`, `MomentShown` and the function `placeOf` moved to `scene-memory.ts`; `creatureStands` there gives the creature's place both to the advance (the mage turns toward it) and to the drawing. The `useLayoutEffect` stays in the component with the same dependencies `[pending, shown, frameWidth]` and reads `shown` from the advanced memory, which equals the state value in every committed render.

Where the verdict's cut did not suffice: after it `Scene` stood at 219. Cut further inside `scene.tsx`:
- `Ground` — a new helper component returning a fragment of the forest picture, the props and the fire, the same elements in the same order; no DOM element added.
- `mageBox(drawing, shown)` — the mage's box and `--walk-start`, the same values as before.
- `ownEnd(then)` — the "own animation only" guard the five end handlers repeated.
- `watchCancel(ends)` — the `animationcancel` listener moved to module level, the same selectors in the same order, still created anew each render with the serials of that render, as before.

## Checks

| Command | Exit | Result |
|---|---|---|
| `node tests/quality/eslint-size-rules.mjs` (before the change) | 0 | 9 reports, `scene.tsx:557 Scene 366` among them |
| `node tests/quality/eslint-size-rules.mjs` (after) | 0 | 8 reports, none in `scene.tsx` or `scene-memory.ts` |
| `npm run typecheck` | 0 | |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/scene.tsx src/browser/view/scene-memory.ts` | 0 | |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/scene.tsx src/browser/view/scene-memory.ts` | 0 | |
| `npm test -- tests/view/scene.test.mjs` at the base, before any edit | 0 | 74/74 |
| `npm test -- tests/view/scene.test.mjs` | 0 | 74/74 |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 21/21 |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 | 27/27 |
| `npm test -- tests/view/world-area.test.mjs` | 0 | 23/23 |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 | 28/28 |

The tests ran on rebuilt code: `scripts/test.py` builds before each run, and the built `dist/browser/view/scene.js` imports `./scene-memory.js`.

No test was written: the slice changes no behaviour, and the existing scene tests are the check (slice *Checks*). Not run: the full gate (`npm test` with no argument), which is the cycle's run.

### Manual check of D-88 in a real browser

By `.claude/skills/loop2-play/SKILL.md`: `npm run local`, Playwright CLI 0.1.22 (the CLI worked, so MCP was not used), a made-up account at `example.test`. Motion was read from a `MutationObserver` and `animationend`/`animationcancel` listeners put on the page, which logged each scene element added, each change of the scene's state attributes and each animation's end, with the time in ms and the game minute. Every observation below is as the code before the change does it, and as the styleguide's rule "The scene of a map run" describes it.

- Mage walking: after „Wznów” the walk under way ran to its end (`scene-walk` ended, `data-walking` removed); a new walk to the sticks started on a new element, facing left, `--walk-start` set; at its end it bent at the prop facing right (`data-bending`, `bendFacing: right`). At the end of the gathering it walked back to the clearing, the same way.
- Gathering: the dust of a miss at minute 56 and at 206 and 216, each ended by its own animation after about 310 ms; the flying icon at minutes 66, 76, 166, 176, 187, 197 and 226, each about 310 ms, its two layers' animations ending with it. After each end no `.scene-effect` stood in the scene.
- Return of the tint: a fall of the tint while the scene stood at a discovery started its return on a new element only after „Wznów” (`--tint-start` set), and its end removed `data-returning`.
- Discoveries at minutes 46 and 84: the plaques came out on the master element, `data-moment-playing` set, removed when the master's animation ended; the earlier discovery seen after its effect stood on its last image.
- Pause and „Wznów” (the player's pause, twice, once while gathering, once in a fight): `data-standing="paused"`, the filter `grayscale(1) brightness(0.5)`, the bend sheet, the badge's fill and the wolf's bite sheet with `animation-play-state: paused`, the minute standing; after „Wznów” the filter `none` and the animations running.
- Wolf's attack (a composed state in „Las — głębiej” four game minutes before the wolf's first attack, see Reaches): the wolf added on the right of the mage, facing left, with `data-entering`, ran in for about 314 ms; its run's end removed `data-entering`; the scuffle cloud stood between them. Outcome: the mage died in the fight at minute 295; the wolf stayed beside it without `data-scuffling`, the cloud gone, no effect element.
- Deaths: of cold at minute 243 (Skraj lasu) and 306 (Las — głębiej) the cold layer came in, the death sheet played about 960 ms, `data-moment-playing` was removed at its end and the end-of-run window („Mag zamarzł”) opened after it; in the fight's death no cold layer, the same end. The facing changed to the side of the fall.
- No line of the game's own (`uncaught`, `saved-game-load`) in the console.

Not seen live: a wolf defeated or departing (the composed character, with no rules, died in its first fight), a completion and the cancel of an animation by leaving the screen. These paths have cases in `tests/view/scene.test.mjs`, which pass; D-88 keeps the real-browser part of them unchecked here. No screenshot kept; the frames of the stream were not used, the event log above is the evidence of motion.

## Own-work check

The requirement this work most likely misses: "no change of what the player sees" on the paths the new code takes — the memory's advance must return the same memory on a second render of the same reading (else React loops or redraws), and the rewritten cancel routing must send each cancelled animation to its own end. Check: three mutations made in the worktree one at a time, each run with `npm test -- tests/view/scene.test.mjs` and reverted with `git checkout --` (status clean after):

| Mutation | Exit | Result |
|---|---|---|
| M1 `advanceMemory` never returns the memory it was given | 1 | 73 of 74 fail |
| M2 in `watchCancel`, `.scene-effect` tested before `.scene-creature-effect` | 1 | 1 fails: "an effect or a return of the tint cut by leaving the screen is over as its animation's end makes it…" |
| M3 a map run started no longer drops the effects | 1 | 1 fails: "a map run started drops an effect still standing" |

So the passing suite does run through the new advance, its idempotence and the cancel routing. Mutated in thought and not run: a wrong serial captured for `effectEnded` (caught by the test of overdue effects), `momentSettled` not resetting `playing` (the end-window tests wait for it).

## Choices

- One `useState` holding the memory, advanced in render, over `useReducer`: a reducer would need the DOM reading of `reachedX` or a dispatch during render; the render-phase set keeps React's behaviour the old code had. Cost if wrong: none for the player; a reviewer may prefer a reducer.
- The end handlers as updaters `setKept((now) => …)`, also where the old code set one slot with a value (`setMoment({...held, playing: false})`, `setShown(value)` in the layout effect): with one object an updater that replaces only its field keeps the other fields current, as separate slots did.
- `Ground` as a new helper component in `scene.tsx`, over moving the mage or the moment layers out: the ground holds no key, ref or handler, so its move cannot touch an animation's restart. Way rejected: a `Mage` component, which would need a ref passed down.
- `scene.tsx` keeps the drawing and the reading of the DOM (`reachedX`, the layout effect); `scene-memory.ts` imports nothing of React or the DOM.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` and `.the-way/task-cycle/change/ui_check.md` (named by the method).
- `foundations/part_map.md`, searched for `src/browser/view` — `src/browser/view/**` claims the new file for browser-view.
- `tests/view/scene.test.mjs`, searched for its imports and for `animationcancel` — it imports only `Scene` from the built `scene.js`.
- `src/browser/sim/data/maps.ts:25-114`, `src/browser/sim/saved-game.ts:617-1010` (selectively), `src/browser/sim/game.ts` (its exported functions), `src/browser/sim/types.ts` (`solvedMaps`) — to compose a state in which the wolf attacks: wolves attack only in „Las — głębiej”, which opens after two maps solved.
- `.claude/skills/loop2-play/compose-state.mjs`, copied and changed as the skill says.
- `tests/quality/eslint-size-rules.mjs`, read to copy its options for the measuring copy.

## Working copies

All in `.runs/executor-2/`, removed before returning: `measure.mjs` (the size rules at threshold 1 for per-function sizes), `scene-base.tsx` (the base file to measure), `compose-deep.mjs`, `state.json`, `send-state.js`, `send-state2.js` (the composed state and its sending), `observe.js` (the scene's event log), `log1.json`–`log5.json`, `baseline-scene.txt`, `checks.txt`, `mutations.txt`, `last.txt`, `local.txt`. The directory `.playwright-cli/` that Playwright CLI wrote by itself in the worktree root was deleted too, as the skill's "End the check" gives. The browser was closed (`playwright-cli close`) and the start stopped (`npm run local:stop`: 1 stopped); its database under `.runs/local-start/` stays until the next start, as the skill says. Nothing remains.

## Unread material

none — the frozen task file was read whole, beyond the ranges the *Read* names. The slice's line ranges of decisions after `## Testing discipline` were found by their headings (D-88 at 1055, D-267 at 4268), as the handoff says.

## Searches not found or unclear

- The handoff's `.runs/executor-2/` did not exist at start; created.
- First baseline test run failed (exit 1) only because its output file's directory did not exist yet; rerun after creating it, exit 0.

## Problems observed

- During the composing of a state, a run minute set by hand was refused by `loadSavedGame` ("shape"); the composed state instead passes the minutes with the simulation's `advanceMinutes`, the body kept warm. Only the working copy was affected.
