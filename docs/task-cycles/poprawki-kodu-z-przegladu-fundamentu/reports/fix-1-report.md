# Fix 1 report — findings I-1, I-2, M-1, M-2

**Status:** done. All four findings fixed in one commit on top of `1d8caf17`.

## Commit

One commit by path (`foundations/glossary.md`, `tests/invariants/test_player_map_run_pace.py`, `tests/view/game-saver.test.mjs`): see `git log -1` (message begins `docs: :memo: give the place of a character at the camp its own glossary entry …`).

## What each finding got

- **I-1** — `foundations/glossary.md` gets the entry `## at the camp`, written after `headquarters`, following the skill `record-glossary-term` (read again: `elements/glossary/skill/{SKILL,read,decide_entry,write}.md`, `template.md`, `examples.md`, `common/rules.md`, `common/way_of_working.md`):
  - Definition: "A character is at the camp when it is in no manual map run, going, paused or ended and waiting for „Restart” or „Zakończ”, and in no earning loop." (carries the qualifier of row 2).
  - *Not*: "the screen Siedziba — headquarters · the picture band at the top of that screen with the characters drawn in it, of which it holds only the first that fit — `campDrawing`". The first item is carried by the term of another entry, the second (the other meaning of "camp") by the identifier of the code that draws it, as the template's form allows; neither carrier holds the term or a form of it.
  - Headword: "at the camp", as D-389, the code and the task's row write it; the picture band stays "the camp" (D-389's own title), carried in the *Not*. Rejected headword: `camp` alone (it would hold both meanings in one entry).
  - Meaning, English: a character is at the camp when it stands in neither a manual map run nor an earning loop. Po polsku: postać jest w obozie, gdy nie jest ani w ręcznym przejściu (idącym, w pauzie albo skończonym i czekającym na „Restart” lub „Zakończ”), ani w pętli zarobkowej. Marked `row 2`.
  - The earlier choice (no entry of its own) is withdrawn; I should have shown it to the human or written the entry, as the finding says.
- **I-2** — the *Not* of `headquarters` now reads "the place where a character stands — at the camp": it says what the headquarters is not by the new entry's name and does not restate the place.
- **M-1** — the description of `tests/invariants/test_player_map_run_pace.py` now names the two other recorded fields (`completion` not null, `death` not null) and says that the discovery and death scenarios alone start from `newGame()`.
- **M-2** — the comment in `tests/view/game-saver.test.mjs` (the case of the save before logout, at line 956 in the file as it stands; the finding's lines 616-617 are stale) lost the clause about the retries going on.

## Mismatch search after the new entry

D-389 (the sentence "a character being at the camp where it is neither in a manual map run, going, paused or ended and waiting for „Restart” or „Zakończ”, nor in an earning loop") says what the entry says; the comments at `camp-picture.ts` (members: "The characters at the camp, … no more than the widest band holds") are accurate under the entry (the drawn members are those at the camp, cut to the band's capacity). I changed neither D-389, code nor tests beyond the two finding places.

## Checks (command, exit code)

| Command | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit=0, `0 errors` |
| `npm test -- tests/invariants/test_player_map_run_pace.py` | exit=0 |
| `npm test -- tests/view/game-saver.test.mjs` | exit=0 |
| `npx eslint tests/view/game-saver.test.mjs` | exit=0 |
| `npx prettier --check tests/view/game-saver.test.mjs` | exit=0 |
| `python -B .the-way/instruction-files/check_instructions.py` (once, at the end) | exit=0, `0 error, 144 warn, 7 info` |

Not run: the full gate; `eslint`/`prettier` on the Python file and the glossary (not covered by those tools).

## Own-work check

Requirement most likely unmet: I-2, that no entry of this change restates the place with a weaker qualifier. Check: a search of `foundations/glossary.md` for "manual map run" and "earning loop" shows the qualifier only in the entry `at the camp`; the *Not* of `headquarters` holds neither phrase. `foundation_check.py` passes.

## Reaches beyond the handoff

None.

## Working copies

None made in this round; `.runs/author/` does not exist.

## Unread material

none (the two files named in the handoff, read whole).

## Searches not found or unclear

- The findings file cites `tests/view/game-saver.test.mjs:616-617` and `:582-588`; in the file as it stands the comment is at 956-957 and the first case's retry assertion at about 940. Found by its text.
