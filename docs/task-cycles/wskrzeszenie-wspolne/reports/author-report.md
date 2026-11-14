# Author report — `wskrzeszenie-wspolne`, the whole change as the one author

**Status:** done with concerns (the concerns are the choices below that go beyond the handoff's hints, and two checks not made).

Worktree `the task's worktree`, branch `task/wskrzeszenie-wspolne`, base `2a8645d4`.

## Commits

| Commit | What |
|---|---|
| `94b465e9` | feat: the code — shared resurrection, death of a character with no practice, renewal at the first completion, save version 7, the new texts |
| `043960ff` | test: the tests taken to the team's resurrection, plus new tests |
| `37a76a26` | docs: the foundation entries |
| `e291e8d2` | test: a wrong invariant citation corrected |
| `4f0781c3` | fix: the order of one clock reading (found by me after the first commit, see choice 6) |
| `77dd1194` | test: the test of that order |

Files changed against base (35 files, +1692 / −431 including tests): `src/browser/sim/{game,loop,saved-game,skills,types}.ts`, `src/browser/view/{character-screen.tsx,clock.ts,end-window-lines.ts,end-window.tsx,headquarters.tsx,maps-screen.tsx,team-lines.ts}`, `foundations/{decisions,glossary,invariants}.md`, 20 test files under `tests/sim/` and `tests/view/`.

## Choices that were mine (for the orchestrator's questions table)

1. **Where the shared moment lives.** `Team.resurrectionReadyAtMs` (in `src/browser/sim/types.ts`), not on `GameState` and no longer on `Character`. Why: the type `Team` is "the player's one team" and the player-facing texts say „drużyny”; the character-level field is removed. A new game: `0`. Rejected: a top-level `GameState` field (then it is far from the characters it is shared by, and `catch-up-state` talks about "the team's chest"). Cost if wrong: a rename of one field and the version already raised.
2. **How the first completion marks the resurrection ready — this departs from the handoff's hint ("without a clock").** The function that passes game time (`advanceMinutes`) renews nothing. A new function `settleCompletion(state, nowMs)` in `game.ts`, called by `clock.ts` at every reading beside `settleDeath`, makes a used-up resurrection ready at the reading's moment `nowMs` and leaves a ready one as it was. Why: the window's line "Wskrzeszenie odnowione" must be shown only where the resurrection was used up at the solving, and only a clock tells that; a clock-free marker (`readyAt` set to 0 or below) cannot tell "was used up" from "was ready", and a flag computed later from the clock would flip after eight hours, so it could not survive a load. Rejected: (a) clock-free `min(readyAt, 0)` plus a flag — shows the line wrongly or not at all; (b) a `Math.min`-less sentinel at `MIN_SAFE_INTEGER` — same problem and a strange moment in the document. Cost if wrong: one function and one field more than the minimum; D-386 got a sentence for it (see the foundation).
3. **How the window learns of the renewal, and its shape in the saved state.** New field `GameMapRun.completionSettlement: CompletionSettlement | null`, `CompletionSettlement = {kind:"resurrectionRenewed"} | {kind:"resurrectionReady"}` (types.ts). `null` until `settleCompletion` settles the first completion of an unsolved map (`!run.solvedMapRun` and `run.completion`), and `null` on every other run. `endRenewalLine(state)` in `end-window-lines.ts` reads it; `end-window.tsx` draws it after the cost line. The load (`saved-game.ts`) reads the key strictly: `null` on a run without such a completion, and on a first completion `null` (not yet settled — admitted, since `advanceMinutes` makes such a state and D-386 says the load admits what the game's own functions make; the clock's next reading settles it) or one of the two kinds. This differs from a death, whose unsettled state the load refuses (D-221). Rejected: a boolean `resurrectionRenewed` (cannot tell "settled, nothing to renew" from "not yet settled", so a tick would resettle it after a later death on another character used the resurrection up). Cost if wrong: one saved key more (version 7 covers it).
4. **A new kind of death settlement.** `DeathSettlement` gains `{kind:"noPractice"}`; `teamAfterDeath(team, died, gathered, nowMs)` replaces `characterAfterDeath` as the one rule of both the manual run (`settleDeath`) and the loop (`takeEnd`), and `hasNoPractice(skills, gathered)` is in `skills.ts`. The practice gathered at the loop is passed by `takeEnd` itself: `waitingPractice(loop)`, which already leaves out the run that died (D-189), so `endLoopRun` and `catchUp` need no new argument and the report line (`resurrectionUsed`) marks only a death that used the resurrection (internal kind `noPractice` in `loop.ts`). Rejected: reading `loop.run.practice` too — a run that died pays nothing. The load does not check that a character with a `noPractice` settlement has no practice (the document cannot be told from a later state; no own function makes the other).
5. **Where the renewal line is written in the foundation.** In D-216, whose question I widened to "Where does the player read what a death took and what a completion renewed?" (the line stands below the D-185 line in the same section). Rejected: D-185 (its question is the deposit) and D-368 (one very long sentence about the whole window). Cost: D-216's question changed, its number and references did not.
6. **Order inside one clock reading (a defect I found in my own first commit and fixed in `4f0781c3`).** The reading now passes the manual run, then the loops (which end at their minutes' own moments, none after the reading), and only then settles the manual run's death and first completion at the reading. Before, the manual death at the reading's moment was settled first and took the resurrection from a loop death that was earlier in real time. D-242's text needed no change.
7. **The word "account" or "team".** The foundation entries say "the account's resurrection" (as the task's change texts do); the code and the player-facing texts say team / „drużyny”.

## Checks

| Command | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0 |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` (after build, after the last commit) | exit 0 by summary: 2146 tests, 2146 pass, 0 fail |
| `npx eslint <all changed .ts/.tsx/.mjs files>` | exit 0 (it first found two errors in my tests, `characterAfterDeath` undefined in a purity test whose helper swallowed the error, and an unused import; both fixed) |
| `npx prettier --check <changed files>` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | `0 errors`, exit 0 (also with `--skip-test-citations` after the entries were written) |
| `python -m pytest -q tests/quality/test_source_tool_scope.py` | 4 passed |

Not run: `npm test` (the cycle's gate, by instruction); the tests under `tests/*.test.mjs`, the Python gate and the mutation tool (Stryker), because they were not asked for and no file of theirs was touched. The two pull-side tests (`tests/view/previous-save.test.mjs`, `tests/sim/previous-programs.test.mjs`) were changed only for the number of the version.

## Invariant tests: failing runs

I wrote the code before the tests (the change is a wide change of a shape; no single first failing test). To see each changed invariant test fail, I broke the code for a moment and restored it, rebuilding each time (commands: edit `src/browser/sim/game.ts`, `npm run build`, `node --test <files>`):

- `resurrection-renewal`, branch for a character with no practice removed from `teamAfterDeath`: 11 tests failed (death, loop, catch-up, clock, end-window-game files); restored, pass.
- `resurrection-renewal`, `settleCompletion` with `renewed = false`: 4 failed (completion.test and clock.test); restored, pass.
- `resurrection-renewal`, readiness boundary `<` in place of `<=`: 8 failed (death, completion, team-lines tests); restored, pass.
- `resurrection-renewal`, the old order in `clock.ts` (manual death settled before the loops): 1 failed (the new test of `77dd1194`); restored, pass.
- **Not seen failing again:** `catch-up-state` (I changed its fixture and narrowed the claim, the relation itself was not broken), `save-version`, `death-settled-once` — their changed tests pass, but I did not break code for them.

Invariant tests I altered (WAY-03), by identifier: `resurrection-renewal` — `tests/sim/death.test.mjs`, `tests/sim/loop.test.mjs`, `tests/sim/catch-up.test.mjs`, `tests/sim/completion.test.mjs`, `tests/view/clock.test.mjs`, `tests/view/team-lines.test.mjs`, `tests/view/character-screen.test.mjs`, `tests/view/headquarters-screen.test.mjs`, `tests/view/maps-screen.test.mjs`; `catch-up-state` and `catch-up-death-moment` — `tests/sim/catch-up.test.mjs` (the relation test now runs a single looping character, because `catch-up-state` is narrowed to a character whose resurrection no other loop reaches); `death-settled-once` — `tests/sim/death.test.mjs`, `tests/sim/loop.test.mjs`; `save-version` — `tests/sim/saved-game.test.mjs` (current document is version 7, the old one stays as `DOCUMENT_V6` and is refused as another version) and `tests/sim/previous-programs.test.mjs` (version 8 is the one above the game's, 7 is read). The reason for each change of an expectation is a changed decision (D-190, D-216, D-217, D-220, D-240, D-386), not a failing test.

## Own-work check

- **Requirement most likely not met:** To do 4 and 6 in the catch-up — "the death of each character finds the resurrection as the characters higher on the list left it, even when they died later in real time", and "a death of a character with no practice leaves it as it found it for those lower".
- **Check:** `tests/sim/catch-up.test.mjs`, three tests: Ola's loop dies in minute 1 and Ala's in minute 243 — Ala keeps the resurrection and Ola loses everything though she died first; the open game over the same span gives the opposite; Ala with no practice dies on and on and Ola, with practice, finds the resurrection ready and takes it; the open game gives the same team state. **Showed:** all pass (including a mutation run where the no-practice branch was removed — they failed).
- **UI check (`ui_check.md`):** the change is texts of existing lines and one more `p` with the existing class `end-window-cost`; the roles stay `text-secondary` and `danger` as the styleguide (`guidelines/styleguide-browser-view.md:579`, `:913`) says; the tests check the role of each new text. I ran the game by the route `loop2-play` (`npm run local`, `playwright-cli`, a made-up account at `example.test`, closed the browser and `npm run local:stop` afterwards) and inspected two screenshots: Siedziba with „Wskrzeszenie drużyny gotowe”, and the end window after the death of a new character with „Postać nie miała jeszcze wprawy, więc śmierć nie zużyła wskrzeszenia drużyny.” in `text-secondary`. They lie in the public repository `mariusznazar/screenshots`, branch `loop2/wskrzeszenie-wspolne`, commit `0891c43591dda3c5716e98815a6ec80d7d3b94ed`: `loop2/wskrzeszenie-wspolne/siedziba-wskrzeszenie-druzyny.png` and `loop2/wskrzeszenie-wspolne/okno-konca-smierc-bez-wprawy.png`. **Unperformed in a real browser:** the line „Wskrzeszenie odnowione: …” after a first solving, and the countdown line „Wskrzeszenie drużyny za …” (a first solving by hand takes about 480 game minutes, and the countdown needs a used-up resurrection); both are checked in code and in the jsdom tests only, which do not prove layout.

## Foundation entries (step: `foundation_step.md`)

All are `the cycle's`-marked from the task's *Decisions in play* (no row of *Settlements to record* exists; none projected). The search of the foundation, made once, covered the 38 lines of `decisions.md` and the 3 of `glossary.md` and 2 of `invariants.md` that mention a resurrection; D-04, D-212, D-241, D-246, D-248, D-311 still hold word for word and were not changed.

| Entry | English | Polish |
|---|---|---|
| D-190 | The account has one resurrection shared by its characters, renewed by time or by the first completion of each map, and a death of a character with no practice uses none up, leaves the generation number and does not stop its loop. | Konto ma jedno wskrzeszenie wspólne dla postaci, odnawiane czasem albo pierwszym rozwiązaniem każdej mapy, a śmierć postaci bez wprawy go nie zużywa, nie podnosi pokolenia i nie zatrzymuje pętli. |
| D-216 (question widened) | The window's lines after a death (used up, not ready, no practice yet) and the renewal line after a first completion. | Linie okna po śmierci (zużyte, niegotowe, bez wprawy) i linia odnowienia po pierwszym rozwiązaniu. |
| D-217 | The lines at the characters read „Wskrzeszenie drużyny …”. | Wiersze przy postaciach brzmią „Wskrzeszenie drużyny …”. |
| D-220 | A new character brings no resurrection of its own, a new game's is ready. | Nowa postać nie przynosi własnego wskrzeszenia, nowa gra zaczyna z gotowym. |
| D-240 | Characters also meet at the resurrection, and the earlier on the list takes it in the catch-up (`Rejected` gains the first-in-time variant). | Postacie spotykają się też przy wskrzeszeniu, a w doliczaniu bierze je wyższa na liście. |
| D-329 | The example reads „Wskrzeszenie drużyny gotowe”. | Przykład brzmi „Wskrzeszenie drużyny gotowe”. |
| D-386 | The moment is the account's resurrection's, and the function that settles the first completion refuses an unsafe moment and reads none where there is nothing to settle. | Chwila dotyczy wskrzeszenia konta, a funkcja rozliczająca pierwsze rozwiązanie odrzuca chwilę niebezpieczną i niczego nie czyta, gdy nie ma co rozliczać. |
| D-242 (one sentence), D-247 (one clause) | Their statements that are made untrue are corrected: the open game differs from the catch-up also at the resurrection; a loop's catch-up ends at a death that takes the practice. | Poprawione zdania, które przestały być prawdziwe. |
| `resurrection-renewal` | The account's resurrection renews by the death's moment plus the span, by the first completion of each map, and a death of a character with no practice leaves the moment. | Wskrzeszenie konta odnawia się chwilą śmierci plus czasem, pierwszym rozwiązaniem każdej mapy, a śmierć postaci bez wprawy zostawia chwilę. |
| `catch-up-state` | Narrowed to a character whose chest and resurrection no other loop reaches (now also derives from D-190). | Zawężony do postaci, której skrzynki i wskrzeszenia nie sięga inna pętla. |
| glossary `resurrection`, `generation number` | The resurrection is the account's, and a death with no practice uses it up for none; the generation number grows only at a death that takes practice. | Wskrzeszenie jest konta, a śmierć bez wprawy go nie zużywa; numer pokolenia rośnie tylko przy śmierci zabierającej wprawę. |

D-219 and D-206 are unchanged as the task says. D-190's *Based on* is `none`; D-190's *Rejected* holds the ways of the task's *Not chosen* and the backpack item (Zarzewie) as "not made".

## Reaches beyond the handoff

- `src/browser/sim/skills.ts` (new `hasNoPractice`) and `src/browser/view/clock.ts` — the handoff did not list them; the first holds the one rule of "no practice", the second is the only caller that knows the clock.
- `tests/view/previous-save.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/sim/flow.test.mjs`, `tests/sim/team.test.mjs`, `tests/sim/previous-programs.test.mjs`, `tests/view/end-window.test.mjs`, `tests/view/end-window-game.test.mjs`, `tests/view/trip.test.mjs`, `tests/view/world-area.test.mjs` — found by running the tests; changed for the new shape, the new version and the new texts.
- `.the-way/task-cycle/change/ui_check.md`, `.claude/skills/loop2-play/SKILL.md` (UI check), `.the-way/elements/common/{rules,way_of_working}.md`, the `decisions`, `invariants` and `glossary` elements' `SKILL.md`, `template.md` and the files they name — read for the foundation step.
- Read in part by search: `foundations/decisions.md` D-04, D-212, D-241, D-243, D-246, D-247, D-248, D-311, D-368 (D-368 whole).

## Unread material

- `foundations/part_map.md` — **not read**, though the handoff names it; no new file was added and no part changed, so no entry of it was reached.
- `guidelines/styleguide-browser-view.md` — read lines 1–608 whole; lines 609–987 only by search for „wskrzeszeni” (two hits, lines 579 and 913, read in place).
- `guidelines/coding-content-data.md` — not read (no file of `src/browser/sim/data/` touched).
- Decisions D-04, D-212, D-241, D-243, D-246, D-247, D-248, D-311 — read the passages that mention a resurrection and their neighbouring sentences, not each whole; D-189, D-190, D-206 (D-206 only through its quoted binding sentence in the task), D-216, D-217, D-219, D-220, D-221, D-240, D-242, D-329, D-368, D-386 read whole.
- Glossary: `resurrection`, `generation number`, `earning loop`, `catch-up`, `save time`, `loop clock` read; `solved map` and `map run` not read.

## Searches not found or unclear

- None not found.
- Unclear: the task allows the renewal line "in D-216 or the decision of the window the search finds fitting", and no decision's question fits it exactly; I widened D-216's question (choice 5).
- Unclear: "D-219 unchanged" — I changed no word of it, though the renewal at a first solving takes the clock's reading through D-386's functions; if the orchestrator wants that stated in D-219, it is one clause.
- The handoff says the function that passes game time "does not know the clock" and hints at a clock-free mark; this is why choice 2 differs.

## Questions and concerns

1. Choice 2/3: a new function and a new saved key that the task does not name. The task's text of the line (To do 10) cannot be shown without them, to my reckoning. If you want the clock-free variant, the line has to be shown for every first solving (including with a ready resurrection) — that contradicts To do 10, so I did not take it.
2. The load admits a first completion not yet settled, but refuses a death not yet settled (D-221). If the cycle prefers one rule, the other way is a one-line change in `saved-game.ts` (`completionSettlement`) and in D-386.
3. All saved games of version 6 are discarded at the first load after the merge (D-206); an account with the previous-save privilege can pull the programs (D-399–D-401). The task's note to check the human's account privilege before deployment stands.
4. The first death of a new character now shows the new line and leaves the resurrection; several existing tests used a fresh character as "a character that dies and loses things"; they now give the character one practice (helpers `practised` / `withPractice`) — this is a test fixture choice, not a rule of the game.
5. Still open for review: the text of the player-facing line is longer („Wskrzeszenie drużyny za 7 godz. 59 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie”); I saw only the „gotowe” form in the browser.
