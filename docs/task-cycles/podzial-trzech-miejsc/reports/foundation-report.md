# Report - agent of the plan's *Foundation entries* (rows 3 and 4), task `podzial-trzech-miejsc`

Status: **done with concerns** (the concerns are under *Concerns*; none stops Slice 1 or Slice 6).

- Worktree: `the worktree's root`, branch `task/podzial-trzech-miejsc` (no upstream set).
- `.the-way` pin checked: `git -C .the-way rev-parse HEAD` = `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the gitlink records the same commit.
- Commit: `8ca21555` - `docs: :card_file_box: record in D-323 that whether the end-of-run window is open stays a memory of the page after an error no code of the game handled, ...`. It changes `foundations/decisions.md` only (7 insertions, 5 deletions). `foundations/invariants.md` is unchanged, so there is no second commit.
- Method followed: `.the-way/task-cycle/skill/foundation_step.md`; `.the-way/elements/decisions/skill/SKILL.md` with `read.md` and `decide_entry.md`; `.the-way/elements/invariants/skill/SKILL.md` with `decide_entry.md`, `draft.md` and `write.md`; `elements/common/way_of_working.md`, `elements/common/rules.md`, both templates, both `examples.md` and the example entries they name in `.the-way/foundations/` (WAY-03, and the invariants `return-step-record`, `script-imports`, `fingerprint-definition`, `gate-exit-code`, `instruction-file-imports` and `cross-part-imports`).

## Check

| Command (from the worktree root) | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (step 4.3, right after the entry) | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (full, on the working tree before the commit, which matches `8ca21555`) | 0 | `0 errors` |

I ran no other check. Following the handoff, `npm test` did not run.

## Entry 1 - D-323 (plan *Foundation entries* row 3) - **the cycle's**

- Meaning (English): after an error that no code of the game handled, the end-of-run window still opens. It opens on its own once the scene's effect of a death or a completion has played, at every entry to the screen of an ended map run, and at „Koniec przejścia”, because whether it is open is a memory of the page and not the game state. „✕” and Escape close nothing after the error. The question „Zapisać, odrzucić, wrócić?” is neither asked nor closed after the error. So a window, once open, stays open until the page is reloaded.
- Meaning (Polish): po błędzie, którego nie obsłużył żaden kod gry, okno końca przejścia dalej się otwiera — samo po efekcie sceny śmierci albo ukończenia, przy każdym wejściu na ekran zakończonego przejścia i przyciskiem „Koniec przejścia” — bo to, czy jest otwarte, jest pamięcią strony, a nie stanem gry; „✕” i Escape po błędzie niczego nie zamykają, a pytanie „Zapisać, odrzucić, wrócić?” po błędzie ani nie pada, ani się nie zamyka, więc raz otwarte okno stoi do przeładowania strony.
- Mark: **the cycle's**. No row of *Settlements to record* and no projected entry carries it. It comes from the task's *To do* 8 and from the orchestrator's ruling Q4 on the window's reach (written in the handoff).

What changed in the entry (`foundations/decisions.md`, D-323; paragraphs 1 and 2 are unchanged, so every `decision: D-323` quotation in the tests still matches):

1. **New third binding paragraph** (a part of another question, D-371's question, answered for the time after the error):

   > After an error that no code of the game handled, whether the end-of-run window is open stays a memory of the page as D-371 gives it: the window opens of itself once the scene's effect of a death or a completion has played (D-311), at every entering of the screen of an ended map run, and at „Koniec przejścia”. „✕” and Escape of the window close nothing after the error, and the question „Zapisać, odrzucić, wrócić?” is neither asked nor closed after it, „Koniec przejścia” included, so a window once open stays open until the page is reloaded, standing while the player is on the screen of the map run and no question stands.

2. **Relations:** `· narrows D-311 · narrows D-368 · narrows D-371` appended. All three bind „✕” and Escape to close the window. After the error the new paragraph prevails over that sentence. Their own relations give no reverse `narrows`, so no two decisions narrow each other.
3. **Verification:** the `invariants:` and `tests:` clauses are unchanged. The pair of examples got new parts for the new paragraph, because a test of a later slice (Slice 6) will hold it (`elements/decisions/skill/SKILL.md`, step 3, second bullet). These parts are the complies and violates examples below. The return step removes them once Slice 6's guard case holds the paragraph with a `decision: D-323` line.
   - complies: "after an error at the game minute of a death, the window opening once the scene's effect has played, and „Koniec przejścia” opening a window that „✕” closed before the error; „✕” and Escape after the error leaving the window standing"
   - violates: "after the error the end of the scene's effect or „Koniec przejścia” leaving the window closed; „✕” or Escape after the error closing the window; „Koniec przejścia” after the error closing a standing question"
4. **Rationale:** sentences added before *Accepted with it*: the window is a page memory (D-371), so opening it changes nothing the error stops. Without the change, „Koniec przejścia” would be a button that hangs, which the decision exists to avoid. The question pauses and ends the map run, so it belongs to the game that goes on. A window that cannot be closed costs nothing that the reload does not end. Two items were added to *Accepted with it*: the window, once open, stands until the reload; „Koniec przejścia” with a question standing leaves the window not shown behind the question.
5. **Rejected:** the rejected way named in the ruling was appended: "„✕” and Escape closing the end-of-run window after the error too, as the memory of the page it is — a second change of what the page does after the error, for a gain the reload the sentence asks for already gives". The prose names no file or test, as the template asks (WAY-05, WAY-29). So the plan's cost "would change the expectation of `tests/view/end-window-game.test.mjs` ..." stands here in product terms only.

### Precedence recorded (WAY-25), with the passages of what the human accepted that give the outcome

The precedence over D-311, D-368 and D-371 is recorded in D-323, the decision that prevails. I mark it **the cycle's**. The request has to put it before the human. The passages that give the outcome, quoted from `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`:

- *To do* 8: „okno końca przejścia otwiera się samo i przyciskiem „Koniec przejścia” także po błędzie, którego nie obsłużył żaden kod gry — dziś po takim błędzie w chwili śmierci postaci okno się nie otwiera, a przycisk nic nie robi. To, czy okno jest otwarte, jest pamięcią strony, nie stanem gry” and „`src/browser/view/run-screen-state.ts` (ignoruje „Koniec przejścia”, ok. 225, i koniec animacji śmierci, ok. 241)”. Only those two guards are named.
- Acceptance criterion 1: „Testy w `tests/view/` przechodzą bez zmiany swoich oczekiwań, poza przypadkiem strażnika okna końca w `tests/view/run-screen-state.test.mjs` (punkt 8).” This keeps `tests/view/end-window-game.test.mjs:1220-1229` "after halt() the window's buttons change nothing" („✕” leaves the window) and `tests/view/end-question.test.mjs:920-949` ("„Zakończ” asks nothing" after halt) as they are.
- Acceptance criterion 2: „Po błędzie, którego nie obsłużył żaden kod gry, w chwili śmierci postaci okno końca otwiera się samo, a „Koniec przejścia” je otwiera (punkt 8).”

I added no `narrows` for D-173 and D-324, which bind the question („Wróć” closes it; leaving the screen, „Wznów”, „Restart” and „Koniec przejścia” close it). The question pauses and ends the map run, so these are decisions "about the game that goes on". D-323's existing second paragraph already makes them give way after the error, and `tests/view/end-question.test.mjs:918-949` holds that under D-323 today. The new paragraph's words on the question repeat that outcome and widen nothing.

D-311 and D-371 themselves are not edited. No word of them contradicts the changed D-323 once the precedence is recorded: their sentences hold before the error, and D-323 states the area after the error in which it prevails.

## Entry 2 - `uncaught-failure-game-state` (plan *Foundation entries* row 4) - **the cycle's**, unchanged

- Meaning (English): after an error that no code of the game handled, the game state held in the page changes no more until a reload, and every save the page sends carries the game state from before the error.
- Meaning (Polish): po błędzie, którego nie obsłużył żaden kod gry, stan gry trzymany na stronie nie zmienia się już do przeładowania, a każdy zapis wysyłany przez stronę niesie stan gry sprzed błędu.
- Mark: **the cycle's**, for the check against the changed D-323. *To do* 8 carries it.
- Words changed: **none**. The sentence speaks of the game state and of saves only. Whether the window is open is no part of the game state or the save (D-371, D-407), so the window's opening after the error leaves the sentence true. *Method* `test`, *Rests on* `none`, *Derives from* `D-323`, *Part* `browser-view` and *Violated* `no` all stay true. Step 4.4 of `record-decision`: D-323's *Verification* still names this invariant, so no decision gains, loses or renames it.
- Check, as the files show it: the tests that cite this invariant are `tests/view/state-store.test.mjs:356` and `tests/view/uncaught-failure.test.mjs:353`, `:441` and `:800`. `tests/view/run-screen-state.test.mjs` cites no invariant. Its guard case at `:219` holds the screen state after halt, not the game state. So it is no test of this invariant, though the plan's row and the handoff name it as part of the check (see *Concerns*). I changed no test.

## Search of the foundation (step 2)

- `D-323` in `foundations/*.md` and `guidelines/*.md`: D-347, D-402, D-407 and the entries around lines 2985-3186, 3925-3940, 4205, 4270-4305, 5614-5634, 10133/10181 (D-311), 10476-10477 (D-368) and 10525-10526 (D-370). They name D-323 for the sentence of the failure or for the menu bar standing above the window. None of them binds the window after the error, so none changes.
- `foundations/invariants.md`: only `uncaught-failure-game-state` names D-323 or the error. No invariant of `browser-view` speaks of the window after an error.
- The decision index of the sections "Screen of a map run and the end-of-run window" and "Browser view: screens, navigation and their code", with `--part browser-view` (`decision_index.py`, written to `.runs/foundation/index.md`): I read the question headings outside those sections, and none bears on the window after an error.
- Glossary: `map run`, `completion` and `manual map run` are used in the meaning of their entries. "end-of-run window" and "memory of the page" are not in the glossary. Both are used throughout D-368, D-371 and D-407 already. I added no new term.
- Guidelines: `guidelines/coding-browser-module.md:385-402` and `guidelines/styleguide-browser-view.md` (rule "The end-of-run window", line 992 on) say nothing about the window after the error. No guideline waits on this change.

## Concerns

1. **The check named for row 4 does not match the citations.** The plan and the handoff name `tests/view/run-screen-state.test.mjs` (guard case) as the check of `uncaught-failure-game-state`. That test does not cite the invariant, and the case holds the screen state, not the game state. The invariant's tests are `tests/view/state-store.test.mjs` and `tests/view/uncaught-failure.test.mjs`. Nothing breaks because of this. But the reviewer of Slice 6 should not count the guard case as an invariant test of this entry.
2. **Comments that Slice 6 will make false.** These are not my files, so I name them for Slice 6:
   - `tests/view/end-window-game.test.mjs:1219`: "D-323. Catches a window that still opens and closes after an error nothing handled". After Slice 6 the window does open after the error, so the "opens" half of the comment no longer holds. The expectation (`„✕” leaves the window`) stays true.
   - `src/browser/view/run-screen-state.ts:77-85`: the interface comments "nothing after halt" on `openWindow` and `effectEnded`. The plan already names these.
3. **Pair of examples to trim later.** The new complies and violates parts in D-323's *Verification* are meant to be removed by the return step once Slice 6's changed guard case carries a `decision: D-323` line quoting the third paragraph. Slice 6 should add that line, quoting from the start of the paragraph ("After an error that no code of the game handled, whether the end-of-run window is open stays a memory of the page"), so that the `tests:` clause can take the part over.
4. **Precedence recorded by the cycle.** `narrows D-311 · narrows D-368 · narrows D-371` is a recorded precedence (WAY-25) that the human accepts at the merge. The draft request should name it with the passages quoted above. D-368 is not named in the task's *To do* 8. I included it because its binding sentence "„✕” in the window and the key Escape pressed in it (D-370) close it" collides with the new paragraph in exactly the same way as D-311's and D-371's sentences do.

## Unread material

- `src/browser/view/state-store.ts`: read in part (the `halt`/`halted` lines found by search: 64-65, 99, 111-119, 172, 202-203), not whole.
- `src/browser/view/app.ts`: only line 316 (`state.view.halt()`), found by search, not the surrounding handler.
- `.runs/orchestrator/index.md`: not read. I wrote my own index of the touched sections instead (`.runs/foundation/index.md`, since removed).
- `foundations/decisions.md` D-311's *Rejected*: read whole. D-368's *Rationale* and *Rejected*: read whole.
- D-370: read whole, although the handoff did not name it. Its focus move after „✕” is moot after the error, since „✕” closes nothing. I added no relation for it.
- `the-way-record-glossary-term` and `the-way-update-part-map`: not read, because no glossary term or part changes.
- Everything else the handoff names was read whole.

## Searches not found or unclear

- `decision_index.py --decision 323` was refused ("no decision 323"). The switch needs the number with its prefix (`--decision D-323`). Run again that way, it succeeded.
- No test cites `uncaught-failure-game-state` in `tests/view/run-screen-state.test.mjs` (`grep "invariant: uncaught-failure-game-state"` over the repository, `.runs/` excluded). This is the mismatch in *Concerns* 1.
- No glossary entry exists for "end-of-run window" or "memory of the page". This is unclear only in that the terms stand undefined in the glossary, while the log uses them consistently.

## Working copies

- `.runs/foundation/` under the worktree held `index.md` (the decision index, output of `decision_index.py`) and `commit-msg.txt` (the commit message, passed with `git commit -F`). Both are removed, and the directory `.runs/foundation/` is removed as well. Nothing is kept in `reports/` beside this report. No worktree or clone was made.
