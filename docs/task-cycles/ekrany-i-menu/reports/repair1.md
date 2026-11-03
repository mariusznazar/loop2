# Repair 1 of the task `ekrany-i-menu` — report

**Status:** done

**Start:** branch `task/ekrany-i-menu` at `f9eff8c`. Worktree `C:/Storage/repos/loop2-wt/ekrany-i-menu`.

## Commits

- `0aa9ce5` docs: :memo: restore the footer and the map run's status row in the README browser check, and keep the resurrection invariant marker on its own line

One commit covers both findings. The tree is clean after it; nothing was pushed.

## Findings

### F1 — `tests/view/character-screen.test.mjs:120`

Fixed. The explanation now sits on its own comment line above the marker, and the marker line reads exactly `// invariant: resurrection-renewal`:

```
// The readiness boundary is the simulation's; the wording is D-217.
// invariant: resurrection-renewal
```

The explanation line does not contain `invariant:`. Nothing else in the file changed: the file's diff is one line removed and two added (`git show 0aa9ce5 --stat`: 3 lines changed in this file, 1 line in README.md).

Checks that show it fixed:
- `python -B .the-way/elements/common/foundation_check.py` — exit 0 (`0 errors`).
- `npm test -- tests/view/character-screen.test.mjs` — exit 0 (7 tests, 7 pass, 0 fail).

### F2 — `README.md:76`

Fixed. The sentence now reads (the only changed line in the file):

> W przeglądarce, po `npm run local` i założeniu konta, sprawdź, że `/main.js` ładuje się bez błędu, konsola nie zawiera błędów wykonania, a strona pokazuje ekran Siedziba z stopką z podpisami autorów ikon, a w menu „Konto” stoi „Wyloguj”; po założeniu postaci i „Wyślij” strona prowadzi na ekran przebiegu mapy, gdzie wiersz stanu z minutą rosnącą co sekundę i panel terenu z listą kafelków.

The `/main.js` and console-errors parts are unchanged. The line is Polish, LF line endings kept (checked: no CR in the diff).

Wording notes:
- The old phrase „ekran przejścia” is replaced by „ekran przebiegu mapy”. The code names this screen only as "the screen of the map run" (`src/browser/view/game-view.ts:114`); it has no Polish title in the code, so „ekran przebiegu mapy” is my wording, not a quoted name. The findings do not give a Polish name.
- The footer is described as „stopka z podpisami autorów ikon”, matching what `src/browser/view/footer.ts` builds (per-icon credits: author, game-icons.net, CC BY 3.0, changes).

Checks that show it fixed:
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0 (5 tests OK).

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npm test -- tests/view/character-screen.test.mjs` | 0 | 7 pass, 0 fail |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |
| `node_modules/.bin/prettier --no-config --no-editorconfig --check tests/view/character-screen.test.mjs` | 0 | All matched files use Prettier code style |

Not run: `npm test` without a file argument (the gate is the orchestrator's, per the handoff). No test was written or changed as an invariant test, so no failing-first run applies.

## Process notes

- A first `git commit` attempt in my shell used a message file that did not exist; the error was hidden by my own `2>/dev/null` redirect, and that command made no commit. I checked with `git log` and `git status`, which showed the two files staged and HEAD still at `f9eff8c`. I wrote the message file and committed again. The final history has one commit, `0aa9ce5`, on top of `f9eff8c`.

## Reaches beyond the handoff

- Read `guidelines/coding.md` and `guidelines/testing.md` whole, as the handoff requires.
- Read `src/browser/view/footer.ts` (its credit lines, for the footer wording in F2) and grepped `src/browser/view/game-view.ts`, `run-screen.ts`, `status-row.ts` and `app.ts` for the screen and status-row names (for the wording in F2).
- Read `tests/view/headquarters.test.mjs:141` and `tests/view/clock.test.mjs:249` to confirm the marker form, as the findings name them.

## Searches not found or unclear

- Polish title of the map-run screen: no title found in code for "the screen of the map run" (`game-view.ts:114`). Used „ekran przebiegu mapy” as a plain description. The orchestrator may want to confirm this term against the glossary or the decision log; I did not search `foundations/` for it.
