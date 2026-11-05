# Report — the return step, task `edytor-programu`

Saved by the orchestrator from the agent's returned text (its tool refused the file). The words are the agent's.

**Status:** blocked (two questions for the human: D-289 and D-304).
**Commits:** `c9e5eb0` on `task/edytor-programu` (base `a504688`), `foundations/decisions.md` only, nothing pushed.
**Check:** `python -B .the-way/elements/common/foundation_check.py` printed "0 errors" after the edit (piped through `tail`, so the shell's exit code shown was tail's, not the script's; the orchestrator re-ran it on the final head). The `.the-way` commit matches the gitlink (f45ca40). The full gate, tests and typecheck were not run, as instructed.

## Compared and corrected
Compared the entries against the code at a504688 and the diff 6fec0ea..a504688.
- Corrected: D-288, D-291, D-293, D-300, D-306 (examples only, rules unchanged): the examples wrote the target as „patyk”; the rows and the pick show „Patyk” (`tests/view/rule-editor.test.mjs:188-189, 1001-1021`); 6 lines changed; action names such as „Zapal — patyk” in D-290 are lower case in the code and stay.
- D-297: no mismatch — the entry says the arrows are disabled "only" on the first and last rule; the code disables them only where there is no group to move to, so an empty group at the edge takes a rule and the arrow stays active; that keeps the "only".
- D-306: matches — the number commits on Enter and on leaving the field and moves to the next field only on Enter; the entry does not say leaving the field moves on.
- D-294: no mismatch — the folding memory is keyed by saved program number or "copy" (`program-panel.tsx`); the entry says nothing about the key.
- D-282 and the part map: match — Programy has three areas (list, editor, rule panel); the breakpoints at 1100 px and 720 px are in `src/browser/styles.css:224-240`; D-282 already says so; the part-map text for browser-view is generic and needs no change.
- D-44, D-265, D-181, D-180: match — the shared React number field carries the trip count rule; all the trip-plan controls D-180 names are in `trip-plan.tsx`.
- D-291, "over the mage's head": left as is — no code draws an action icon over the mage in this change; the task assigns that icon to task 7.
- D-293, D-292, D-295 to D-303, D-305, D-307: match — each rule found in the code or tests.
- Environment facts: the 11 `game-icons-*-title` facts equal `iconTitle` in `src/browser/sim/data/actions.ts` and the 16 files in `assets/icons/`.
- Search for removed names (`createProgramEditor`, `createTripEditor`, group arrows, „Dodaj regułę”, „Dodaj grupę”): nothing stale remains; the only hits are a source title in D-124's Origin, a "violates" example in D-304, and `guidelines/coding-browser-module.md:46`, already current.

## Return step block
- Decisions written or changed: the examples of D-288, D-291, D-293, D-300 and D-306 (wording only). Invariants, environment facts, glossary terms, part-map changes: none. Settlement rows: none missed; the foundation step wrote them all.
- Meaning of each changed entry, for the request:
  - D-288: Jeden edytor programu stoi na ekranach Programy i przejścia; wiersz reguły czyta się jak zdanie, a panel obok go zmienia (przykład pisze teraz „Patyk”, jak wiersz).
  - D-291: Każda czynność ma jedną ikonę, taką samą w wierszu, w komórce i nad głową maga (przykład: „Zbierz — Patyk”).
  - D-293: Przy czynności stoi czas jej wykonania, w wierszu i w panelu (przykład: „Zbierz — Patyk”).
  - D-300: Edytor nie pokazuje bieżącej wartości warunku (przykład: „Zapas poniżej 8 · Patyk”).
  - D-306: Klik wiersza otwiera panel, każdy wybór zmienia regułę od razu i przechodzi do następnego pola (przykład sześciu aktów z „Patyk”).

Reach beyond the handoff: none; no code, test or guideline file changed. **Searches not found or unclear:** none.

## Questions for the human, left unwritten
1. **D-289: what shows for a held value that no listed reason fits?** Code today: the cell is chosen and greyed with no reason text (cycle choice Q7). Entry today: "picked and greyed, with its reason", and its Verification calls "a greyed cell with no reason" a violation — entry and code disagree for this case. Options: (a) keep the code and change the entry to "with its reason where one of those above fits, and with none otherwise", dropping that "violates" example for this case; (b) change the code to give a reason, which needs wording the task does not give. Recommendation: (a): a reason sentence would be wording the human has not set, and the case is rare. If both stay as they are, the product contradicts the entry and a later review will fail the code.
2. **D-304: where does „+ dodaj grupę” stand?** Code today: in the list footer under the last group (`src/browser/view/rule-list.tsx:640`); „+ reguła” is at the end of each group (`rule-list.tsx:595`); when the last group is folded its „+ reguła” is hidden. Entry today: "stands beside „+ reguła”", and the task says "obok „+ reguła”". Options: (a) keep the code and word the entry "stands under the rule groups, in the notation of „+ reguła”"; (b) change the code so the two buttons share a line (one wrapper, per the whole-change review) — still nothing beside it when the last group is folded. Recommendation: (a): the entry's own reason and its Rejected option speak of one notation, not of position, and the predecessor game puts the button there; it changes the human's word "obok", so it is the human's call. If it stays as is, the entry says "beside" while the product shows "below".
