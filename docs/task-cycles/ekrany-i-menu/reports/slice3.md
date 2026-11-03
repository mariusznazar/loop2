# Slice 3 — The addresses of the screens

- **Status:** done
- **Worktree:** `C:\Storage\repos\loop2-wt\ekrany-i-menu`, branch `task/ekrany-i-menu`, base `893d26c`
- **Commit:** `fa6b322` — `feat: :sparkles: add the addresses of the screens, the nearest existing screen and the return entry`
  (2 files added, 364 insertions; the author line is `mariusznn@gmail.com` from the private-repo rule, since the remote is the `mariusznazar` https address)
- **Process pin:** `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048` (checked before work)

## What changed and why

Two new files; nothing else touched.

1. `src/browser/view/screen-address.ts` — a pure module (no DOM, no side effects on import). It holds:
   - the type `Screen` with five kinds: `headquarters` (Siedziba), `character` (Postać {n}), `programs` (Programy), `program` (Programy {n}), `run` (Przejście {n});
   - `readScreenAddress(hash)` — reads `location.hash` (with `#`) into a screen or `null`. Three anchored regexes, each number `[1-9][0-9]*` with a safe-integer check. Nothing is decoded, so `%31` and `POSTAC` name no screen. Emailed-link fragments name no screen, as the page handles them first (D-156, D-224, D-225);
   - `resolveScreen(named | null, state)` — the nearest existing screen (D-281, question 8): Przejście {n} with no manual map run of character {n} gives Postać {n}; Postać or Przejście of a number no character carries gives Siedziba; Programy {n} of no program gives Programy; `null` gives Siedziba;
   - `screenAddress(screen)` — writes `#/`, `#/postac/{n}`, `#/programy`, `#/programy/{n}`, `#/postac/{n}/przejscie`;
   - `markedMenuItem(screen)` — Siedziba for Siedziba and Postać (settlement row 3), Programy for Programy and Programy {n}, `null` for Przejście (D-277 reading);
   - `returnToRunEntry(state)` — `{ text: "Wróć do przejścia · {mapa} · minuta {m}", address }` when `state.run` is set (going on, or ended and waiting for „Restart”/„Zakończ”), otherwise `null`. The map name comes from `MAPS[run.mapId].name` (content-identifiers); `{m}` is `death.minute ?? completion.minute ?? run.minute`, which is the same number, since `run.ts:458` and `run.ts:647` set the end minute from the run's minute in the same step.
2. `tests/view/screen-address.test.mjs` — 39 tests on the built module. It has 18 table rows for the crafted fragments of the slice (each reads as no screen, none throws), round-trip tests for the writer, `resolveScreen` cases on explicit states, the menu marks, and the return entry. The map run comes from the real `send`. The team and the programs are explicit objects set by spread.

Checks of the code: no colour or length values (no style code), no map or resource name outside the data (the module uses `MAPS` for the name).

## Checks (command → exit code)

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/screen-address.test.mjs` (module stub, before implementation) | 1 | 16 of 39 fail on the positive assertions (`AssertionError`, values `null` where a screen was expected); the 17 table rows pass against the stub |
| 2 | same, after implementation | 0 | 39 pass, 0 fail |
| 3 | `npm run typecheck` | 0 | clean |
| 4 | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 4 tests OK |
| 5 | same, with `export const RED_CHECK_NAME = "Las";` planted in the module (red run of the invariant test) | 1 | `test_browser_files_outside_the_data_name_no_content` FAIL; line removed afterwards |
| 6 | `npm test -- tests/quality/test_quality_invariants.py` (first run) | 1 | `test_prettier_source_format` fails: Prettier warns on both new files |
| 7 | `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --write` on both files, then the same quality test | 0 | 5 tests OK |
| 8 | the same quality test on the final file state | 0 | 5 tests OK |
| 9 | `prettier --check` (same flags) on both files | 0 | formatted |

Not run: the full `npm test` (the gate belongs to the orchestrator, per the handoff). `foundation_check.py` was not run (not named in the slice's Checks).

## Own-work check (WAY-164)

- **Requirement most likely missed:** a number reads only as a decimal whole number of 1 or more, with no sign, no leading zero and nothing else (question 8 of the task, slice text). A loose regex `\d+` would pass `#/postac/0` and `#/postac/01`.
- **Check:** I changed the character regex to `/^#\/postac\/(\d+)$/` in the worktree and ran the screen-address test. Result: exit 1, 2 failures — `a fragment with a character number of zero` and `a fragment with a character number with a leading zero`. The table catches the loose form. The regex was restored to `[1-9][0-9]*` before commit. Checks 8 and 9 ran on the restored file; check 3 (typecheck) ran before the mutation, on the same content as the restored file.
- **Invariant test seen failing once:** `content-identifiers` (check 5 above). Failing run exit 1, passing run exit 0 after removing the planted line.
- **Note:** the crafted-fragment table passes on the stub because the stub reads every fragment as no screen. That is expected for a table of "no screen" fragments; its discriminating power is the mutation check above.

## ui_check

Not applicable as a screen change: the module draws nothing and no screen calls it yet. No screenshot taken; the screen check belongs to the cycle's walk through the browser, when the menu bar and the routing use it. I read `guidelines/styleguide-browser-view.md` whole (named by `src/browser/AGENTS.md`), since the file lies in the `browser-view` part; it asks for no change here.

## Choices made (with the way rejected and its cost if wrong)

1. **Reader returns `null` for fragments that name no screen; the caller opens Siedziba through `resolveScreen(null, …)`.** Rejected: the reader returning Siedziba directly, because the Przejście and Postać fallbacks need the named screen before the state is known. Cost if wrong: none found; the table covers it.
2. **Percent-encoded and upper-case addresses read as no screen (no decoding).** Rejected: decoding `%31` to `1`. Cost if wrong: an emailed-style encoded link would open Siedziba rather than Postać 1. D-281 does not settle encoding; I took the literal form. **Flagged for the orchestrator to confirm.**
3. **A number beyond the safe-integer range reads as no screen.** Rejected: accepting it as a screen. Cost if wrong: none visible, since no character or program carries such a number and the fallback is the same screen.
4. **Programy {n} marks the item Programy.** The handoff named "Programy for Programy" only; D-281 says `#/programy/{n}` opens Programy with the program picked, so it is the same screen. **Flagged** as a reading.
5. **`returnToRunEntry` takes no screen.** The menu's caller hides the entry on the Przejście screen (D-280). Rejected: passing the screen in, because the slice says "for a game state … and nothing otherwise". Cost if wrong: the caller must remember the rule; the report of the menu slice should say so.

## Reaches beyond the handoff (what, where, why)

- `guidelines/testing.md`, whole (read through the two `Read` calls) — the handoff named it; read to apply the test rules (unit-test recipe, mutation rule, change of an invariant test).
- `guidelines/coding.md`, whole — named by the handoff.
- `src/browser/sim/game.ts` lines 311–330 (`send`) and 371–418 (`restart`, `end`) and `mapRunEnded` at 397 — to see what a manual map run in `state.run` looks like and how the test builds one.
- `src/browser/sim/run.ts` lines 446–460 and 634–648 — to confirm where death and completion minutes come from.
- `src/browser/sim/data/maps.ts` lines 60–62 — to confirm the forest's name `Las` and its key `forest` for the test.
- `tests/invariants/test_content_identifiers.py` head — to read what the invariant scans for.
- `tests/view/status-row.test.mjs` lines 1–60 — the pattern of the existing view test.
- `scripts/test.py` head — to see the single-file test path.
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` — the user's global rule for commits; read before commit (private-repo address, explicit path add, `git commit -F`).
- `foundations/decisions.md`: whole entries of D-18, D-55, D-56, D-156, D-165, D-224, D-225, D-270, D-277, D-280, D-281; invariant `content-identifiers`; glossary `game minute`, `map run`, `manual map run`. The handoff's ranges were shorter for D-18 (383–400 vs 383–401) and D-56 (1125–1150 vs 1125–1151); I read the whole entries as the rule requires.

Not read: D-21 (named in D-280's origin via the vault only) and any other D-numbers beyond the list.

## Mismatches of plan and code

- None structural. The module's shape matches the slice.
- Small: the handoff's line ranges for D-18 and D-56 end one line early (whole entries are read).
- The plan says the test works "on explicit game states"; the map run is taken from the real `send`, the rest set explicitly. Reading: this meets "explicit".

## Searches not found or unclear

- Percent-encoding of the address (`#/postac/%31`): no decision in the foundation says whether addresses are decoded. Read literally; see choice 2.
- Whether Programy {n} marks the menu item Programy: not stated in words; read from D-281's example (`#/programy/3` opens Programy). See choice 4.
- Whether `#` alone and the empty fragment name Siedziba or no screen: the slice says "no screen" for the reader; the page's handling of a fragment-less address (Siedziba or a waiting map run) belongs to a later slice of the cycle.
- The foundation entries D-280 and D-281 were read as written; the foundation step's identifiers (D-280 for E26/E27, D-281 for E13) were used as the handoff named.
