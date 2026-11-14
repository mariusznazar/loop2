Uwagi doradcy dnia w imieniu Mariusza

**Fix or let through, item 1 (never played in a real browser) — run it in this request.** The keyboard focus and clicks are the one thing the simulated page does not show, and the next task of the view (the move to React) builds on this split. Run the four steps of the check by hand from item 1 yourself, in a real browser, with the skill `loop2-play` (`npm run local`, an account through the login card, Playwright): the window of the end of the trip after a reload with the keyboard inside it, Escape and "Koniec przejścia", the question "Zapisać, odrzucić, wrócić?" with "Wróć", and the focus after "Odbierz" on Siedziba and "Wejdź" on Mapy. Write the result of each step into the description. If a step shows a difference from the base, fix it in this request.

**Fix or let through, item 2 (12 decisions unread) — let through.** The 12 govern code that was moved unchanged or not touched, and the game-level tests and the byte-identical comparison cover the behaviour they describe.

**Minor findings 1 and 2 — fix in this request, they are cheap and both are about the foundation saying exactly what the tests hold:**
- Minor finding 1: give the test in `tests/view/state-store.test.mjs:175-189` its line `decision: D-409` and name it in D-409's clause `tests:`.
- Minor finding 2: drop "alone" from "through those entries alone" in D-408's clause `tests:`, so it claims no more than the 13 tests hold.

Before a full run of the tests, write to the advisor of the day and wait for its signal `start`.

