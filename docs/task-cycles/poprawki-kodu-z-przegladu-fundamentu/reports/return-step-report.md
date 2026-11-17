# Return step report

**Status:** done. Start head `e384f793`; one commit made, `1d03bdec`; nothing is uncommitted.

## Foundation compared with the code

Compared at head `e384f793` the entries the change writes or changes, the entries the task names, the part map of the touched parts, and the styleguide lines I changed. Corrected only what no longer matched.

| Entry | Result |
|---|---|
| D-208 | Binding paragraph and *Rejected* match `game-saver.ts` (`sendNow`, `notSent`, `answered`). The `tests:` clause said the save that threw is "retried at that rhythm"; the new cases hold the first wait (5 s) only, the 10/20/30 s steps being the older cases'. **Corrected** in `1d03bdec`: "retried after the first wait of that rhythm, 5 real seconds". |
| D-97 | New paragraph and `tests:` clause match `logOut` in `app.ts` (a `failed` report leaves „Wyloguj” idle) and the logout case. No change. |
| D-323 | The precedence sentence, its sentence in *Rationale*, the pair folded into *Verification*, and the phrase of `tests:` (an error of the saving code left unhandled so that this handling takes it) match the code and the two saver cases. No change. |
| D-389 | "the characters at the camp" and the sentence that says who is at the camp match `atCamp` in `camp-picture.ts`; Verification "where none is at the camp" matches. No change. |
| D-122 | The sentence that the end-of-run window takes the place of the pause at a completion or a death in the game minute of a discovery is now what `advanceMinutes` does (`paused: !mapRunEnded(run)`); *Rationale* "a death is treated as a completion is" is true. No decision names a pause at a death. No change. |
| D-207, D-48, D-330 | Unchanged by the task; no sentence of them meets a renamed word or the pause flag (`git grep` of `ember`, `bronze`, `speck-`, `inSiedziba`, `atCamp` in `foundations` and `guidelines` finds no use of a renamed name). No change. |
| invariant `player-map-run-pace` | Sentence "paused unless the map run ends in it" holds for a death now; its test cites it. Entry unchanged, as the task says. |
| glossary `headquarters`, `at the camp` | Match D-389 and the code. No change (see N-1 below). |
| part map, simulation and browser-view | No file was added, moved or removed (`git diff --name-status e7b3d071 HEAD` shows only `M`); their descriptions say nothing the change moves. No change. |
| styleguide lines (`styleguide-browser-view.md` 939, 946) | Say "w obozie"; match D-389. No change. |
| decisions and invariants whose *Verification* quotes a test or a name I renamed | A search of `foundations/` and `guidelines/` for the old test titles, `inSiedziba`, `ember`, `bronze` finds none. No change. |

Search of the whole foundation for entries the change touches that no link joins (`way_of_working.md` section 2): `git grep` of `at the camp`, `the camp`, `camp`, `speck`, `bright`, `faint`, the paused-and-death pairs in `decisions.md` (a script over every sentence holding both), and `player-map-run-pace`. Found only entries above or entries that use the screen sense of „Siedziba” or the band sense of "the camp" correctly (D-271's "the camp at the top of Siedziba", D-54's verification "in the camp of Siedziba", the part of D-322 on specks). Nothing to correct.

## Commits

`1d03bdec` — `foundations/decisions.md`, one line of D-208's `tests:` clause.

## Decisions, invariants, environment facts, glossary terms, part map, projected entries

- Decisions written or changed by the change: D-208, D-97, D-323, D-389 (by the foundation step and the fix), D-208 clause corrected here.
- Invariants: none written; none changed.
- Environment facts: none (no source outside the product the change rests on is missing).
- Glossary terms: `at the camp` (new, from row 2, written in fix 1) and the *Not* of `headquarters`.
- Part-map changes: none.
- Projected entries: none.

## Rows of settlements and the sentence of To do 3

| Item | Went to |
|---|---|
| Row 1 (an exception before the request leaves counts as a failed save) | decisions D-208 (new paragraph, `tests:` clause, *Rejected*) and D-97 (new paragraph, `tests:` clause, *Rejected*) |
| Row 2 (the place of a character is "at the camp" / „w obozie”; „Siedziba” names the screen only) | glossary entry `at the camp` (definition with the qualifier of a manual map run), the *Not* of `headquarters`, and the wording of D-389 |
| To do 3, the sentence of precedence | D-323: one sentence, a sentence in its *Rationale*, a pair in its *Verification* |

No row was left out and no choice was added that binds after the merge.

## For the request (not written, not fixed here)

- N-1 of the fix review: the first item of the *Not* of `at the camp` ("the screen Siedziba — headquarters") records a meaning the term never had; Minor, no reader misled.
- The question for the human: whether the picture band's own word "camp" (D-389's heading and first sentence, `camp.tsx`) must be renamed under the glossary's rule on a word with two meanings (WAY-99, the human chooses).

## Checks (command, exit code)

| Command | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at head `1d03bdec` | exit=0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | exit 0, `0 error, 144 warn, 7 info` |

No test, source or style file changed in this step, so no test, eslint or prettier run was needed. The full gate was not run.

## Reaches beyond the handoff

None.

## Working copies

None made; `.runs/author/` does not exist.

## Unread material

none (the handoff, `return_step.md` and the review report of fix 1 read whole; the decisions and entries named were searched and the ones I changed read at their lines; D-207, D-48 and D-330 were checked by search for the renamed words, not read whole this step).

## Searches not found or unclear

none.
