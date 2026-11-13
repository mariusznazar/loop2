# UI check report — screen Postać, combat trees and branches

Status: PASS (the screen shows what the data says; no broken state seen).
Tree: worktree `the worktree's root`, head `7a279745`, `git status` clean before and after; no tracked file changed, no commit, `.the-way` untouched.

## What the screen showed

A new character made through the login card has no combat tree on its screen: the section „Umiejętności” lists only trees the player has discovered (`state.understanding.trees`), and a fresh character has none (screen showed only name, „Mag żywiołów”, „Wskrzeszenie gotowe”). So I took the way the skill `loop2-play` gives, "Compose a game state": a copy of `compose-state.mjs` (kept in `.playwright-cli/`, now deleted) that builds the game's own state with the wolf met, sent by the page's own `PUT /api/saved-game`, no save edited by hand. Account: `uicheck@example.test`, throwaway, character „Agent” (Mag żywiołów).

State 1, practice 0 in every skill (screenshot `postac-start.png`):
- „Walka bronią jednoręczną — poziom 1 · wprawa 0/15 · punkty 0” (expected next point at 15: matches)
- „Mocniejszy cios 0/4 — Większe obrażenia patykiem · teraz 6 obrażeń → po kupnie 8 obrażeń · cena 1” (maximum rank 4: matches)
- „Kopanie — poziom 1 · wprawa 0/10 · punkty 0” (10: matches)
- „Cięższy kop 0/2 — Większe obrażenia kopnięciem · teraz 3 obrażeń → po kupnie 4 obrażeń · cena 1” (maximum rank 2: matches)
- „Unik przed ciosem — poziom 1 · wprawa 0/4 · punkty 0” (4: matches)
- „Zwinny odskok 0/2 … teraz 5 obrażeń → po kupnie 6 obrażeń · cena 1” (branch unchanged by the task)
- All „Kup” buttons present and disabled (dim text), as expected with 0 points.

State 2, practice „Walka bronią jednoręczną” 300, „Kopanie” 30, „Unik przed ciosem” 15 (composed; shows the screen at the last threshold): „Walka bronią jednoręczną — poziom 5 (najwyższy) · wprawa 300 · punkty 4”, „Kopanie — poziom 3 (najwyższy) · wprawa 30 · punkty 2”, „Unik przed ciosem — poziom 3 (najwyższy) · wprawa 15 · punkty 2”. So 300, 30 and 15 each give the last level; four, two and two points.

Buying with the „Kup” buttons (clicks as a player):
- „Mocniejszy cios”: 0/4 → 1/4 (teraz 8) → 2/4 (10) → 3/4 (12) → 4/4 „teraz 14 obrażeń”, no „po kupnie” and no price at the full rank; the button stays and is disabled. Four clicks, four points, +2 each; 14 at the fourth rank as the task says.
- „Cięższy kop”: 0/2 → 1/2 (teraz 4) → 2/2 „teraz 5 obrażeń”, button disabled at the full rank.
- „Zwinny odskok”: 0/2 → 2/2 „teraz 7 obrażeń”, as before.
- Points after purchases: 0 in all three trees.
- Console: `playwright-cli console error` listed 0 messages after the purchases (and no line beginning `uncaught`).

What differs from the expectation: nothing. Layout: no clipped text, no missing button, no overlap at a 1280×1400 viewport; each branch row is one line with its „Kup” button after it. One remark only for the human, not a defect of this change: the tree summary line for a skill at its top level reads „poziom 5 (najwyższy)” and a „Kup” of a fully bought branch stays visible but disabled (what D-199 says: „disabled when … all ranks are bought”).

Not checked here: a character reaching these practice values by playing (state 2 is composed, the skill's own caveat "Late states reached by composing"); layout in a narrow window; the focus and hover states of „Kup” (the styleguide `guidelines/styleguide-browser-view.md` states for the button — disabled seen, resting seen on state 2 before the purchases only through the text read, not a screenshot).

## Screenshots (pushed to `mariusznazar/screenshots`, branch `loop2/progi-drzew-walki`, commit `2e27abeab2137888b8f7a8442460dd9e690b9225`; both show only the made-up account, which does not appear on screen)

- `postac-start.png`, state 1 (ranks 0/4 and 0/2, thresholds 15, 10, 4):
  `![Postać at practice 0: Mocniejszy cios 0/4, Cięższy kop 0/2, next points at 15, 10 and 4](https://github.com/mariusznazar/screenshots/blob/2e27abeab2137888b8f7a8442460dd9e690b9225/loop2/progi-drzew-walki/postac-start.png?raw=true)`
- `postac-bought.png`, after buying every rank (4/4 with teraz 14, 2/2 with teraz 5):
  `![Postać after buying all ranks: Mocniejszy cios 4/4 teraz 14 obrażeń, Cięższy kop 2/2 teraz 5 obrażeń](https://github.com/mariusznazar/screenshots/blob/2e27abeab2137888b8f7a8442460dd9e690b9225/loop2/progi-drzew-walki/postac-bought.png?raw=true)`

No screenshot kept in the repository or the record; local clone `.runs/screenshots/` and `.playwright-cli/` deleted.

## Commands and exit codes

- `playwright-cli --version` — 0 (0.1.22)
- `npm run local` (background) — started; line `Local game: https://127.0.0.1:51125`
- `playwright-cli -s=uicheck open/snapshot/fill/click/eval/reload/resize/screenshot/console` — 0 each (own session `uicheck`)
- `node .playwright-cli/compose.mjs '{}'` and `… '{"oneHandedCombat":300,"kicking":30,"dodging":15}'` — 0 and 0
- `playwright-cli -s=uicheck --raw run-code --filename .playwright-cli/send-a.js` — `200 {"revision":2}`; `send-b.js` — `200 {"revision":3}`
- `gh repo clone mariusznazar/screenshots .runs/screenshots` — 0; `git switch -c loop2/progi-drzew-walki` — 0 (the branch did not exist); `git commit` — 0; `git push -u origin loop2/progi-drzew-walki` — 0 (new branch); `git rev-parse HEAD` — `2e27abeab2137888b8f7a8442460dd9e690b9225`
- `playwright-cli -s=uicheck close` — 0; `npm run local:stop` — 0, „Local starts stopped: 1”

## Unread material

- `guidelines/styleguide-browser-view.md` read by search (Kup, disabled, umiejętności, character-screen), not whole; its section on the shared button states was read only through the lines the search showed (lines 197–290 region), not in full.
- `src/browser/view/character-screen.tsx` and `character-skills.ts` read (the parts that draw the rows); the CSS of the screen not read.
- Reports of the cycle (`author-report.md`, review reports) not read; the check rests on the handoff and the frozen task only.

## Searches not found or unclear

- A styleguide rule naming the required states of a skill-tree row specifically: none found by search for „Kup”, „Umiejętności”, „drzewo”, „gałąź”; only the general button states (resting, disabled, focus) apply, and the disabled one was seen.
