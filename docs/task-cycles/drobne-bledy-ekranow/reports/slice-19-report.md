# Report — slice 19, cycle `drobne-bledy-ekranow`

**Status:** done with concerns (the concerns are observations beyond the slice, see below; nothing blocks).

## Commits

- `cf068a01` fix: :bug: a walk of the mage cut by leaving the screen ends where the browser cancelled it, so it plays no second time on the return
  (base `4c256a99`; range `4c256a99..cf068a01`)

## Files changed

- `src/browser/view/scene.tsx` (+13 / -6): the walk's end is now one function, `walkEnded`, called by the walk's `animationend` as before and by a native `animationcancel` listener of the scene (the one that already watched the cancel of a moment's effect) when the target is `.scene-mage[data-walking]`. Header comment of the module gets two sentences on it.
- `tests/view/run-screen.test.mjs` (+79): one new case, with a helper to make the run, one to fire the cancels and one to read how the mage and the badge's carrier stand.
- `src/browser/view/run-screen.tsx`: **not changed**; the cause lay in the scene alone.

## Cause (verified in the running game)

The screen of a map run is built once (`lives: "always"`) and the registry only sets `hidden` on its element when another screen shows. `hidden` makes the browser cancel every CSS animation in it and fire `animationcancel` (it bubbles) on each animated element. The scene cleared the walk (`from: null`) only on the mage's `animationend`, so a walk cut inside its 640 ms kept `data-walking` and `--walk-start`; when the screen was shown again the browser started the animation anew from the walk's start, and the mage walked the whole 640 ms again. Evidence: `reports/slice-19-browser-before-fix.txt` — a walk cut at 85 ms, `anims=` empty while hidden, after the return `walking=true`, `scene-walk` running from 0 and the translate going from -204.688% to -3.1% again over 630 ms; the same file lists the seven `animationcancel` events that Chrome fired (target `scene-mage` among them, `bubbles=true`). A first run of that kind with a walk cut at 255 ms showed the same (not kept).

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| New case seen failing, before the fix | `npm test -- tests/view/run-screen.test.mjs` | 1 (the case fails on the final assertion: expected the mage and its badge standing at 42.8571% with no walk, got `walking:true, from:"204.6875%"`; its preconditions hold) — log `reports/slice-19-run-screen-red.log` |
| Same after the fix | `npm test -- tests/view/run-screen.test.mjs` | 0 (21 of 21) — `reports/slice-19-run-screen-green.log` |
| Scene tests | `npm test -- tests/view/scene.test.mjs` | 0 (72 of 72) — `reports/slice-19-scene-green.log` |
| ESLint | `npx eslint src/browser/view/scene.tsx` (and `tests/view/run-screen.test.mjs`) | 0 and 0 — `reports/slice-19-eslint.log` |
| Prettier | `npx prettier --check src/browser/view/scene.tsx tests/view/run-screen.test.mjs` | 0 — `reports/slice-19-prettier.log` |
| Real browser, the return | `.claude/skills/loop2-play/SKILL.md` way, Playwright CLI, scripts of mine | see below |

The full suite was not run (the orchestrator's). The handoff and plan name no full-suite check, so there is no mismatch to report. The `foundation_check`/instruction-file checks were not run: not in this slice's checks.

## Own-work check

Requirement most likely not met: the task's "the mage stands where D-319 puts it" **in the running game**, not in jsdom — jsdom runs no animations and cancels none, so the new case fires the `animationcancel` events by hand (the seven the browser fired in the baseline), which proves the scene's reaction and not that the browser sends them.
Check: the same walk cut in the real game, before and after the fix (a state composed with the sim — one rule „Zawsze → Eksploruj”, the walk from the edge (275) to the clearing (144) at game minute 20 — loaded into the local game; 1× pace; left the screen through „Mapy" 108 ms into the walk, came back by „Wróć do przejścia" 1.5 s later, pressed „Wznów").
Result after the fix (`reports/slice-19-browser-after-fix.txt`): while hidden `anims=` empty; at the return `walking=false`, `left=42.8571%` (the clearing), `translate=none`, no animation, and it stays so while the game goes on (minutes 20 and 21 sampled for 1 s). Before the fix: replayed (above).
The first state I tried (a program that gathers) never gave a mid-walk cut because the discovery paused the game at each walk's start; I switched to the composed explore state. The cut at 108 ms and 85 ms are both inside the 640 ms.

## Slice 18's stop, checked in the running game (orchestrator's note)

State composed with the sim: program „Sytość poniżej 88 % → Zjedz” then „Zawsze → Eksploruj”, 3 berries in the pack, so that at minute 20 the mage starts to walk to the clearing and at minute 21 the action „Zjedz — jagoda" starts; pace 4×, a reading every 200 ms. `reports/slice-19-browser-eat-stop.txt`:

- minute 20: walk from the edge (translate 197% → 159.7% in 110 ms), `left` 42.8571% (the clearing), facing left;
- minute 21 (eating): `walking=false`, `left=70.9579%`, `translate=none`, and it stays so through minutes 21 to 25. 70.9579% is 238.4 of 336 px: between the edge (81.85%) and the clearing (42.86%), at the offset the walk had reached (about 148%), facing left. It did not run on to 144 and did not return to 275. So slice 18's stop holds in the running game.

## What a mage that dies in mid-walk does (for the whole-change review against D-316 to D-319)

State composed as above with health 7.2 and the run on „Zawsze → Eksploruj" only, so that cold kills it at minute 21, one game minute after the walk to the clearing began; pace 4×. `reports/slice-19-browser-death-in-walk.txt`:

- last walking sample: translate 90.68%, 42 ms before the death reading;
- death reading (minute 21): `data-standing="dead"`, `data-moment="death"`, `walking=false`, `left=57.9181%` (194.6 of 336 px, a place the walk had reached, not the clearing at 42.86% and not the edge at 81.85%), `translate=none`, facing left (the fall faces the middle of the frame); it stays at 57.9181% a second later. So the dead mage freezes where the walk has brought it and falls there, as the code of slice 18 gives (`placeOf` reads the reached place where the goal is to stay). I did not look at the fall frames themselves, nor take a screenshot of this moment.

## Choices

- Fix in the scene, not in `run-screen.tsx`, as the plan allowed either: the scene already owns the walk's end and already listens natively to `animationcancel` (React has no handler for it). Rejected: having the screen of the map run (or the registry) tell the scene at `hidden`; it would need a new channel and a state in the screen, while the cancel is the browser's own signal for exactly this, and it covers every way the scene can be hidden, not only the registry's.
- The cancel is taken from the mage's own element only (`.scene-mage[data-walking]`); the cancels of its sheets and of the badge's carrier are ignored (the carrier's walk ends with the mage's, since both read `from`). Cost if wrong: if some path cancelled the sheets alone the walk would stay set; the browser cancels all of an element's subtree together, so I saw none.
- The new test fires the cancels on the mage, its sheets and the carrier, as the browser did in the baseline; it does not fire on the mage only, to keep the case near what was seen.
- Test place: `tests/view/run-screen.test.mjs` as the plan names; it uses the real simulation (`advanceMinutes` to minute 20) for the walk, and the hiding is the one the registry does (`element.hidden`).
- No `// decision:` marker on the new test: no sentence of D-319 or D-283 states this behaviour (D-319 speaks of an entry on the screen, start, Restart, load and reduced motion). Cost if the cycle wants markers: one line.

## Name of the break the test catches

A scene that does not tell the end of a walk the browser cancelled (the cause above): the case fails at the final assertion (red run). A mutation that ends the walk on any `animationcancel` in the scene would also pass the case; the browser cancels all animations of the hidden screen together, so this is no observable difference, and I added no case for it.

## Concerns (observations, not changed, not verified in the browser unless said)

1. The same pattern may hold for other animations the scene ends only on `animationend`: the return of the tint (`tintReturned`, 2 s), the flight of an icon, the cloud of dust and the wolf's run-in/run-off effects (`effectEnded`, `creatureEnded`, at most 300 ms). A screen hidden while one runs and shown again would, by my reading of the code, play it again from its start (for the effects, "a return" is where D-317 says an overdue effect is dropped). This is a guess from the code; I did not look. Not in task item 10.
2. When the game is paused at the start of a walk (as at a discovery), the walk is still "set" at animation time 0; leaving and returning then showed the same replay (first baseline run), which the fix also ends.

## Reaches beyond the handoff

- `tests/sim/program-fixture.mjs` and `tests/sim/understanding-fixture.mjs`: only to compose the test's state (the first is imported by `run-screen.test.mjs` already; read what I needed).
- `src/browser/view/screen-registry.ts`, `src/browser/view/run-entry.ts`, `src/browser/view/world-area.tsx`, `src/browser/view/scene-picture.ts` (lines 120-230), `src/browser/run-screen.css` (lines 1115-1185 and a search for `scene-mage`, `walk`), `src/browser/sim/data/scene.ts` (a grep for the places), `src/browser/sim/types.ts` (grep for the condition and action kinds), `src/browser/sim/data/conditions.ts` (satiety), `tests/view/scene.test.mjs` (parts around walks, cancel and ends), `.the-way/task-cycle/change/ui_check.md`: to find the cause, to build the states, and the UI check. None of these was named by the handoff; the selection was missing nothing that changed the meaning of the work.

## Working copies

- `.runs/slice-19/` (my directory: logs, scripts, composed states, one inspected screenshot) — removed whole before this report was written.
- `.playwright-cli/` in the worktree root (Playwright CLI session files) — removed; the CLI session closed (`playwright-cli close`) and the local start stopped (`npm run local:stop`, "Local starts stopped: 1").
- No worktree, clone or screenshot of mine remains. One screenshot of the scene after the return was looked at (the mage standing in the clearing, nothing else wrong) and deleted; none is shown to the human, so none was pushed to the screenshots repository.
- Kept beside this report in `reports/`: `slice-19-run-screen-red.log`, `slice-19-run-screen-green.log`, `slice-19-scene-green.log`, `slice-19-eslint.log`, `slice-19-prettier.log`, `slice-19-browser-before-fix.txt`, `slice-19-browser-after-fix.txt`, `slice-19-browser-eat-stop.txt`, `slice-19-browser-death-in-walk.txt`.

## Unread material

- `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`: read whole.
- `foundations/decisions.md`: D-319, D-317, D-283, D-284, D-417 and D-420 read whole; I read the file from line 1455 to 1566 in one read, so D-418 and D-419 (not named by the handoff) were read too. `foundations/invariants.md:1188-1197`: read.
- `task.md:34-34`: not opened; the handoff carries the passage word for word and I used that.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.
- Source and test files I changed: `scene.tsx` read whole, `run-screen.test.mjs` read lines 1-330, 440-480, 560-740, 840-900, 1000-1054 (not whole); the new case stands after the last line, and the file's helpers I use were all in the read parts. (The method asks to read a changed file whole: for this test file I did not.)

## Searches not found or unclear

- None that came up empty. One unclear item: the handoff's range for D-420 (`foundations/decisions.md:1551-1565`) starts at D-420 as the handoff says, whereas the plan's range `1540-1554` would have started inside D-419; I used the handoff's.
