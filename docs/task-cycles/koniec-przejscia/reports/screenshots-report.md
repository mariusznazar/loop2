# Screenshots of the end-of-run window (task koniec-przejscia) — report

Tree: worktree ``, HEAD `8ac37c6d`, `git status` clean after the work. Status: done, all five screenshots pushed.

## Screenshots

Commit holding the files (read after the push): `e68d605de2232ea5ff76a2a658242e862def5e8b`, branch `loop2/koniec-przejscia`, directory `loop2/koniec-przejscia/`. Each link answered HTTP 200 with the file's bytes.

1. `koniec-smierc.png` (1280 × 720) — the window after a death: title „Mag zamarzł”, line „najdłuższa passa 83/480” with its bar, the line of the cost of the death („Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie po 8 godzinach czasu realnego.”), the sections „Na co poszedł czas” (Czeka 100%) and „Wyprawa i teren”, the buttons „Restart” and „Zakończ”, the menu bar above.
   State: composed by `.runs/s4check/compose.mjs dead` (the simulation's own functions: a character with no rules waits 243 minutes until it freezes, then `settleDeath`), sent by `PUT /api/saved-game`, reload, click „Wróć do przejścia · Las · minuta 243” in the menu bar.
   ![Koniec przejścia po śmierci: Mag zamarzł, najdłuższa passa 83/480, koszt śmierci, sekcje i przyciski Restart oraz Zakończ](https://github.com/mariusznazar/screenshots/blob/e68d605de2232ea5ff76a2a658242e862def5e8b/loop2/koniec-przejscia/koniec-smierc.png?raw=true)

2. `koniec-ukonczenie.png` (1280 × 720) — the window after a completion of Las: title „Las rozwiązany” in the positive (green) role, the streak line 480/480 in green, „Do skrzynki nic nie trafiło.”, the two sections, the buttons „Restart”, „Zakończ”, „Otwarte: Las — głębiej →”.
   State: composed by `.runs/s4check/compose.mjs oneshort` (a character with the rule „Zawsze → Eksploruj” at minute 479 of 480, healthy body, paused), sent the same way, reload, „Wznów”; the game itself played the last minute and opened the window.
   ![Koniec przejścia po ukończeniu: Las rozwiązany, Do skrzynki nic nie trafiło, przyciski Restart, Zakończ i Otwarte: Las — głębiej](https://github.com/mariusznazar/screenshots/blob/e68d605de2232ea5ff76a2a658242e862def5e8b/loop2/koniec-przejscia/koniec-ukonczenie.png?raw=true)

3. `koniec-po-zamknieciu-smierc.png` (1280 × 720) — the run screen after „✕” on the death window: scene, program panel, header „Ala Las Minuta 243 Passa 0/480” with „Koniec przejścia”, „Restart”, „Zakończ”; the world area starts from the top and shows no line of what the death took (the status line under the scene reads „Mag zamarzł”, the ordinary status of the scene, not the cost line).
   State: the death state of picture 1, then click „Zamknij okno”.
   ![Ekran przejścia po zamknięciu okna śmierci: scena, program, nagłówek z Koniec przejścia, Restart i Zakończ](https://github.com/mariusznazar/screenshots/blob/e68d605de2232ea5ff76a2a658242e862def5e8b/loop2/koniec-przejscia/koniec-po-zamknieciu-smierc.png?raw=true)

4. `koniec-po-zamknieciu-ukonczenie.png` (1280 × 720) — the same screen after „✕” on the completion window: header „Minuta 480 Passa 480/480” in green with its bar, scene with the line „Las rozwiązany”, the program with „Wykonano 1×”, the same three buttons, no line of the cost/take of the completion.
   State: the completion state of picture 2, then click „Zamknij okno”.
   ![Ekran przejścia po zamknięciu okna ukończenia: nagłówek Minuta 480 Passa 480/480, scena, program, Koniec przejścia, Restart i Zakończ](https://github.com/mariusznazar/screenshots/blob/e68d605de2232ea5ff76a2a658242e862def5e8b/loop2/koniec-przejscia/koniec-po-zamknieciu-ukonczenie.png?raw=true)

5. `koniec-ukonczenie-800.png` (800 × 720) — the completion window of picture 2 at 800 px wide (the window is the same single block; the area above it is a little taller, about 56 px against 40 px).
   State: as picture 2, viewport resized to 800 × 720.
   ![Okno końca przejścia po ukończeniu przy szerokości 800 px](https://github.com/mariusznazar/screenshots/blob/e68d605de2232ea5ff76a2a658242e862def5e8b/loop2/koniec-przejscia/koniec-ukonczenie-800.png?raw=true)

Looked at and not shown: none. Every screenshot was looked at before the push: each shows only the made-up account of this start (the menu „Konto” stays closed; the address `shots@example.test` and the password never appear on screen) and no real address, password or token.

## Push

```
gh repo clone mariusznazar/screenshots .runs/screenshots
git -C .runs/screenshots switch loop2/koniec-przejscia   # not there -> switch -c
git -C .runs/screenshots add loop2/koniec-przejscia/<5 files>
git -C .runs/screenshots commit -m "loop2: screenshots of the end-of-run window of koniec-przejscia"
git -C .runs/screenshots push -u origin loop2/koniec-przejscia   # [new branch], ok
```
Result: pushed to the new branch `loop2/koniec-przejscia` (never `main`); `rev-parse HEAD` = `e68d605de2232ea5ff76a2a658242e862def5e8b`. No credentials set up; the owner's signed-in `gh` account was used.

## Method

- `npm run build`, `npm run local` (HTTPS `127.0.0.1:51788`), Playwright CLI only (MCP not needed), viewport 1280 × 720, 800 × 720 for picture 5. Account made through the login card (made-up address at `example.test`).
- The helpers of `.runs/s4check/` were read whole (`compose.mjs`, `send.sh`, `check-load.mjs`) before use. They were not stale: they import the built simulation and the fixtures of `tests/sim/`; `check-load.mjs` showed that `dead`, `oneshort` and `freezing` still load with `loadSavedGame` on this tree. I regenerated the documents with the same script (`dead.new.json`, `oneshort.new.json`, differing from the old files only by save time) and sent copies from `.playwright-cli/`; nothing of `.runs/s4check/` was changed.
- Difference from the real game: both states are composed. The death state is reached by the simulation's own advancing (a real course, with a program of no rules, so the time bar reads „Czeka 100%”). The completion state is composed by hand at minute 479 (full body, streak 479, explore minutes 479) and the last minute is played by the game; a real player would reach 480 by a different history (more varied time bar, a real trip with items, so „Do skrzynki: …” with content is not shown — only the empty case „Do skrzynki nic nie trafiło.”). The composed run was never reached by playing, which the skill states cannot be checked here.
- Cleanup: `playwright-cli close`, `npm run local:stop` (one start stopped), `.playwright-cli/` and `.runs/screenshots/` deleted. `.runs/s4check/` (another agent's scratch, git-ignored) left as found.

## Observations that look like defects (none certain)

1. The window sits lower than the menu bar suggests: in picture 1 and 2 the window's top edge is at y = 80 while the menu bar ends at about y = 40; between them stands an empty strip. Evidence: DOM measure at 1280 × 720 — `section.run-screen` starts at 40, its `.run-screen-areas` has height 16 (all areas inside have height 0 and are hidden), the window `section.end-window` starts at 80. At 800 px the strip is about 56 px (window top at y = 96). It is blank space, not a clipped element; whether the 40 + 16 px is intended is for the human.
2. The „Passa 0/480” header after a death (picture 3) shows no bar, while after a completion (picture 4) the bar is green; consistent with the streak, not a defect — noted only because the handoff asks for the header.
3. Attribution list of icons stands under the window on every shot (part of the page footer); it is not a defect, only noise in the screenshot.

Nothing else looked wrong: the title roles (negative/positive), the buttons set and the absence of the cost line after „✕” match the list of the handoff.

**Unread material:** none
**Searches not found or unclear:** none
