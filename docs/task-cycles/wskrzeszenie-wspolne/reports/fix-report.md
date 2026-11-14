# Fix report — the fix of the whole-change review's findings

**Status:** done. Reviewed head `77dd1194`; fix range `77dd1194..49ca4387`.

## Commits

| Commit | What |
|---|---|
| `5e37eab6` | test: I-1 — one practice for the character of both `sent` fixtures, preconditions on the settlement kinds, the world-area guard widened, a `noPractice` case |
| `d88b362f` | test: M-2, M-3, M-4 |
| `49ca4387` | docs: M-1 |

## Findings

- **I-1 — fixed.** `tests/view/world-area.test.mjs` and `tests/view/trip.test.mjs`: the character of `sent` now holds one practice in each skill (as in the other files), so `readyAtMs` again selects the settlement. Both tests now assert the precondition: `died(sent(), 0)` gives `resurrectionUsed` and `died(sent(), 9_000_000)` gives `progressLost` (and in the trip test `died(solvedSent(), 0)` gives `resurrectionUsed`). The world-area guard no longer looks for the capitalised word only: it tests `/skrzeszeni/i`, which matches „Wskrzeszenie” and „wskrzeszenia”. Added the optional case: `sent(PLAN, false)` (a character with no practice) dying with the resurrection ready or not gives `noPractice`, and the world area holds neither `/skrzeszeni|wprawy/i` text. Check: `node --test` of both files, 31 pass.
- **M-1 — fixed.** `foundations/decisions.md`, D-190 third sentence now reads „a death of a character with practice with none ready stops its earning loop”.
- **M-2 — fixed.** `tests/view/clock.test.mjs`: `jump(LOOP_MINUTE_MS - 1000 + 1)`, so the loop's minute (T0 + 60 s) lies a millisecond before the reading; comment and test name say „earlier than the reading”. Shown to still fail under the old order: with `clock.ts` of `e291e8d2` (manual death settled first) rebuilt, `node --test tests/view/clock.test.mjs` gave 1 failed (this test), 26 passed; restored and rebuilt, 27 pass.
- **M-3 — fixed.** The assertion on the `line` helper is removed from `tests/sim/catch-up.test.mjs`.
- **M-4 — fixed.** `// invariant: resurrection-renewal` added at „the completion of a map the account had solved before renews nothing, whatever the resurrection” in `tests/sim/completion.test.mjs`. (The restart test below it is covered by the same marker block only through that test; I marked one, as the finding allows.)
- **M-5 — performed, nothing wrong seen.** By the route of `loop2-play` (`npm run local`, `playwright-cli`, a made-up account at `example.test`, browser closed and `npm run local:stop` run afterwards), with two documents of version 7 built by the game's own functions (`createCharacter`, `send`, `savedGame`, `withSaveTime`; checked with `loadSavedGame`) and put by the ordinary save request — no product code changed. For the window the completed run was composed as the existing test does (minute 480, record whole, `completionSettlement` set to `resurrectionRenewed`), so that state is not one the clock produced.
  - Countdown line at 1280 px, card of Las, „Kto idzie”: „Wskrzeszenie drużyny za 7 godz. 59 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` (red) stands on one line above „Program:”, „Wejdzie: nic” and „Wejdź”.
  - The same at 600 px width: it wraps to two lines, still `danger`, with no overlap and no clipping of „Program:” and „Wejdź”.
  - End window after a first completion that renewed: „Do skrzynki nic nie trafiło.” and below it „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.” in `text-secondary`, same spacing as other lines of the section, before „Na co poszedł czas”; the buttons stay at the bottom.
  - Screenshots (public repo `mariusznazar/screenshots`, branch `loop2/wskrzeszenie-wspolne`, commit `7f459bb98de2bc005baa5ae106990b8b0e343e87`): `loop2/wskrzeszenie-wspolne/kto-idzie-odliczanie.png`, `loop2/wskrzeszenie-wspolne/kto-idzie-odliczanie-waski-ekran.png`, `loop2/wskrzeszenie-wspolne/okno-konca-odnowienie.png`. Each shows only the made-up account's game.
  - Not reached: a renewal produced by the real clock in a real play (it takes about 480 game minutes by hand); the jsdom test of `clock.test.mjs` covers that step.

## Checks (after the last commit)

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npx eslint tests/view/trip.test.mjs tests/view/world-area.test.mjs tests/view/clock.test.mjs tests/sim/catch-up.test.mjs tests/sim/completion.test.mjs` | 0 |
| `npx prettier --check` of the same files | 0 |
| `node --test` of the same five files | 0, 118 pass, 0 fail |
| `python -B .the-way/elements/common/foundation_check.py` | `0 errors`, 0 |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 |

Not run: `npm test`, as instructed.

## Own-work check

Requirement most likely to be missed again: that the two repaired fixtures really give the deaths their names claim. Check: the new preconditions in both tests assert the settlement kinds. I did not run them against the fixtures without practice (the reviewer's scratch run showed `noPractice` for both). Result: pass now with `resurrectionUsed` / `progressLost` / `noPractice` as expected.

## Unread material

none beyond the earlier report (`foundations/part_map.md` and the other items listed in `author-report.md` stay as stated there); for this round I read `fix.md`, the findings file and the code the findings name whole.

## Searches not found or unclear

none
