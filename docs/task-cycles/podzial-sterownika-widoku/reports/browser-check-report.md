# Browser check of correction 1 (the four steps), head against base

Status: done. All four steps were reached, played by hand in a real browser (Playwright CLI 0.1.22, session without window, 1280-wide default viewport), and the head shows no difference from the base in any step.

- Head: worktree `the root of the task's worktree`, started with `npm run local` while its head was `527d13b614ae54917e03b6f1f3efd5f616bf6458`. While I was working the branch moved to `85d51b70` (commit "mark the store's test ... with decision: D-409 ... drop "alone" from D-408"); `git diff --stat 527d13b6 HEAD` shows only `foundations/decisions.md` and `tests/view/state-store.test.mjs`, so the product code I played is the code of the head as it stands now.
- Base: `9e13af95af4fa77445eccfe3e50a28e00c2adaf0`, a worktree of its own, started with `npm run local` from there, afterwards (never side by side).
- "Focus" below is `document.activeElement` read with `playwright-cli eval`, named by tag, role and text.
- Accounts were made through the login card (`agent1@example.test` on the head, `agent2@example.test` on the base).

## Step 1 — send a character on a map until the trip ends or it dies

Head: new account, character "Bohater" with the empty program, Mapy, row "Skraj lasu", "Wejdź: Bohater, mapa Skraj lasu". Minute 1 appeared and grew. At 16× the run stopped by itself at minute 84 ("(pauza)", a discovery of the game; "Wznów" resumed it), again at 104, then went on until minute 243 where the window of the end of the trip opened on its own: "Koniec przejścia", "Mag zamarzł", "najdłuższa passa 83/480", "Restart", "Zakończ", "✕" ("Zamknij okno"). Death by cold. Focus: `section[role=dialog]` "Koniec przejścia / Mag zamarzł / ✕ ..." (the window itself, in the window).

Base: the same course (pauses at 84 and 104, death at 243), the same window, the same focus. Matches.

## Step 2 — reload; window opens on its own with the keyboard inside; Escape; "Koniec przejścia"

Head:
- After `reload` the window "Koniec przejścia / Mag zamarzł" stood open at once, with no click. Focus: `section[role=dialog]` of the window (`tabindex=-1`), in the window.
- Tab x4 from there: "Zamknij okno" button, the scrolling body of the window (div "najdłuższa passa 83/480 ..."), "Restart", "Zakończ" — every stop inside the window.
- Escape: the window closed (no `[role=dialog]`), the screen of the map run stood uncovered, and its header held the button "Koniec przejścia" next to "Restart" and "Zakończ". Focus: button "Koniec przejścia" (outside the window).
- Click "Koniec przejścia": the window opened again, focus on the window section. Escape again: closed, focus on the button "Koniec przejścia". Matches the step.

Base: the same sequence gave the same results at each point (window open after reload, focus on the window section, the same four Tab stops, Escape leaves focus on "Koniec przejścia", the button opens the window again). Matches, no difference.

## Step 3 — unsaved changes to the copy; "Zakończ" asks "Zapisać, odrzucić, wrócić?"; "Wróć" closes it

Head: after "Restart" in the header the run started over (minute 54), I pressed "Pauza", then "+ dodaj grupę" (the copy got "Grupa 2", "Zapisz w programie" and "Porzuć zmiany" became enabled, "Niezapisane zmiany w kopii." shown), minute 113 (pauza). "Zakończ": the question "Zapisać, odrzucić, wrócić?" with "Zapisz", "Odrzuć", "Wróć" appeared; focus on button "Zapisz". State read before and after "Wróć": same address `#/postac/1/przejscie`, same "Minuta 113 (pauza)", the same two groups, the unsaved note still there, no window. "Wróć" removed the question and left the trip as it was (three seconds later still unchanged). Focus after "Wróć": `section` of the map run screen ("Bohater / Skraj lasu / Minuta 113 (pauza) ... Wznów"). Matches the step.

Base: the same: after "Zakończ" the question with focus on "Zapisz", after "Wróć" the question gone, address, minute (204, pauza), groups and unsaved note unchanged; focus on `section` of the map run screen. Matches, no difference.

## Step 4 — focus after "Odbierz" on Siedziba and "Wejdź" on Mapy

"Wejdź" on Mapy:
- Head: after "Wejdź: Bohater, mapa Skraj lasu" focus on `section` "Bohater / Skraj lasu / Minuta 1 / Passa 1/480 / Pauza / 1× ..." (the screen of the map run itself).
- Base: the same element, the same text.

"Odbierz" on Siedziba (state composed as the skill's "Compose a game state" says, with a copy of `compose-state.mjs` that also marks "Skraj lasu" solved, writes a program "explore, gather stick", starts the earning loop of "Agent", passes 30 minutes of its map run and stamps the save 3 minutes in the past, sent by the ordinary `PUT /api/saved-game`, answer `200`):
- Head: Siedziba showed "Gdy cię nie było", the line "Agent: 3 min · wprawa do odebrania: Eksploracja +1, Zbieranie małych przedmiotów +1" and the button "Odbierz: Agent". Focus before: `body`. After the click the line lost its practice part and the focus stood on the button "Zamknij" of that report section (its remaining control).
- Base: the same screen and the same line; after "Odbierz: Agent" focus on the button "Zamknij" of the report section.

Both focus targets are the same on head and base. Note: this state was reached by composing, not by playing 480 minutes of a loop; the skill names that limit.

## Observation not part of a step

On the base, the first click on "Restart" in the header, sent right after closing the window with Escape and without a snapshot in between, left the run at the minute of death (243); a second click on "Restart" a moment later started the run again (minute 55). On the head the same click, sent after a snapshot, worked at once. I did not reproduce it again and I do not know whether it is a timing artefact of my click (the reference was resolved by the role "Restart" while the window was just closing) or something real; it happened on the base, not on the head, so it is no difference caused by the change.

## Console

Head: the console held only the two ordinary entries of a page opened before signing in: `Failed to load resource ... 401 (Unauthorized)` for `/api/account` and `... 404 (Not Found)` for `/favicon.ico`; after every later reload and at the end `playwright-cli console` showed 0 messages, no line beginning `uncaught` or `saved-game-load`. Base: the same two entries, nothing else. The local start also printed the expected `"failure":"mail","code":"ESOCKET"` lines.

## What this check could not show

- Real keyboard events from a person's keyboard: Tab and Escape were sent by Playwright to the page, which is the page's own key handling but no physical device and no assistive technology (a screen reader reading the window was not checked).
- Mail, the tunnel in front of the test server, and a late state reached by playing: the state of step 4 "Odbierz" was composed (the skill's "What this start cannot check"), so that a loop reaches it by playing was not checked.
- Motion and the look of the screen: no frames or screenshots were taken or shown; only text and focus.
- The window of a completed trip (a map run that ends by reaching 480) was not played, only the window of a death.

## Unread material

none.

## Searches not found or unclear

none.

## Working copies

- `.runs/browser-check/base` — worktree of `9e13af95`, with a junction `node_modules` to the head's `node_modules`: the junction was removed first (`rmdir`, the real `node_modules` intact, checked), then `git worktree remove --force` and `git worktree prune`; `git worktree list` no longer lists it. Removed.
- `npm run local:stop`: ended 1 start for the head, then 1 for the base. `playwright-cli close`: done for both sessions.
- `.playwright-cli/` of the head root and of the base: deleted (the base's with its worktree).
- The files in `.runs/browser-check/` (`compose-loop.mjs`, `state.json`, `send-state.js`, `send-state2.js`, `focus.txt`, `state.txt`, `head-local.log`, `base-local.log`): deleted just after this report; the directory was removed with them.
- No tracked file was changed, no commit made, no screenshot taken. The databases of the starts stay under `.runs/local-start/` until the next start by design of the skill.
