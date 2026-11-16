# Fix 1 report — task `ekran-wiedzy`

**Status:** `done`. One commit: `b67568aa` (`mariusznn@gmail.com`), on the reviewed head `caa13ffd`. No push, no full gate. m2 is answered with evidence, not changed (below).

## Findings

**I1 — fixed.** `foundations/decisions.md`, D-416 *Verification*: under `tests:` the trees are „opened by a click” only. The keyboard moved to the part an agent compares, in the form of D-285, together with the layout pair: „For the keyboard in a real browser, which the tests on a document imitation do not show, and for the layout, an agent compares a change with the part no test holds:”
- complies: „Enter and Space on the row of a tree opening it in the browser, as the browser's own click of a native button; in a window narrower than 720 px the two areas of the screen standing one under the other, each an area of its own”;
- violates: „a key handler on the row of a tree that stops Enter or Space, or a row that is no native button; the two areas drawn as one block that a narrower layout cannot set apart”.

**I2 — fixed.** *Rationale* of D-416, the first sentence.
- Old: „the Understanding is the one gain a death never takes, and the player sees it nowhere today, so after losing a character the player sees only what was lost and not what stayed.”
- New: „the Understanding is the one gain a death never takes, and before this screen the player saw it nowhere, so after losing a character the player saw only what was lost and not what stayed.”
- Departure from the approved wording of the definition; the request shows it to the human.

**I3 — fixed.** A binding sentence in D-416, right after the sentence about the left area (first paragraph, now four sentences; `foundation_check.py` accepts it).
- English: „Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop.”
- Polish (the words of *To do* 4 and row 1): „Każda rzecz Zrozumienia na ekranie stoi z ikoną z danych gry i z nazwą, a stworzenie ma w danych ikonę z game-icons.net — wilk `wolf-head`, jak w loop.”
- Mark of the entry: D-416 stays `projected`; **this one sentence is `the cycle's`** (it goes beyond *Decisions in play*, from row 1 and *To do* 4 only; nothing invented). D-291's change is kept as it was. Test citations of the new sentence (`decision: D-416 "Each thing of the Understanding on the screen stands with its icon …"`): `knowledge-screen.test.mjs` (the groups with icons and names from the data), `sim/data.test.mjs` (the wolf's fields), `icons.test.mjs` (the wolf's data names its file and title). The *Verification* clause already named „each thing with its icon and its name from the data”.

**m1 — fixed.** `countedName` moved, with its doc line and unchanged behaviour, to the new `src/browser/view/counted-name.ts`; `program-editor.ts` and `knowledge-lines.ts` import it from there; `program-editor.ts` no longer exports it. Its two tests (the forms for 0 to 122 and the nature-energy forms, both citing D-363) moved word for word from `program-editor.test.mjs` to the new `tests/view/counted-name.test.mjs` (its header names D-363); nothing weakened. I looked for a guideline or decision against the move and found none: D-265 and `coding-browser-module.md` allow importing pure functions, the new file has no row in that guideline's table (a file added after the last audit has none), and `test_content_identifiers.py`, `test_node_test_selection.py` pass. Not done, as beyond the finding: `rule-list.tsx` keeps its private `ruleCountText` (a second copy of the same rule for „reguła”); a later change may use `countedName` there.

**m2 — answered with evidence, not changed.** The task's *Decisions in play* (task line 131) says „Pola *Relations* i *Verification* … zostają takie, jak w fundamencie, poza przykładem zgodnym „the menu bar holding Siedziba, Mapy and Programy in that order””. D-280 *Verification* lists the screens opened at their addresses; the list is not made false by the changed binding sentence (the reviewer agrees: „not false, only short”), and the rule of line 163 of the definition lets the writer correct a field only where the changed sentence makes it untrue. So the field stays. If the human wants Wiedza in the list, the smallest wording is „Siedziba, Postać, Mapy, Programy, Wiedza and Przejście” in that one phrase; the test of it already stands (`account-screen.test.mjs`, „a reload at each of the eight addresses …”).

**m3 — fixed.** The new test in `screen-registry.test.mjs` (a table without the entry for Wiedza refused; built on entering and taken down on leaving) is removed, with the constant `KNOWLEDGE` that only it used; the stand-in table keeps its `knowledge` entry and the `slice(0, 6)` of the accounts test, which the registry needs because `Screen` now has the kind (without them every registry test fails). The reviewer is right that the registry behaviour is generic and held by the neighbours. The one thing the removed test did not show and the real entry needs, its `lives: "while-shown"` and `key`, is now tested on the real entry through the game: the case in `account-screen.test.mjs` („the item Wiedza of the bar opens the screen Wiedza …”) opens a game with one known tree, opens the tree, leaves to Siedziba, comes back, and finds the tree folded. I saw it fail: `knowledge-entry.ts` changed to `lives: "always"` (no key) — `npm test -- tests/view/account-screen.test.mjs` exit 1; restored — exit 0.

## Checks (command, exit code)

- `npm run typecheck` — 0; `npx eslint` and `npx prettier --check` on the 10 changed or new ts and mjs files — 0, 0.
- `python -B .the-way/elements/common/foundation_check.py` — 0 (0 errors, test citations on); `python -B .the-way/instruction-files/check_instructions.py` — 0 (0 errors, 139 warnings).
- `npm test -- <file>`, each — 0: `tests/view/account-screen.test.mjs`, `screen-registry.test.mjs`, `counted-name.test.mjs`, `program-editor.test.mjs`, `knowledge-lines.test.mjs`, `knowledge-screen.test.mjs`, `rule-editor.test.mjs`, `icons.test.mjs`, `tests/sim/data.test.mjs`, `tests/quality/test_node_test_selection.py`, `test_quality_invariants.py`, `test_source_tool_scope.py`, `tests/invariants/test_content_identifiers.py`.
- Mutation: `countedName` with the 12 to 14 exception narrowed to 12 to 13 — `tests/view/counted-name.test.mjs` exit 1, restored. Not run: the full gate.

## Own-work check

The requirement most likely not met after this fix: „każde wejście na ekran zaczyna ze zwiniętymi drzewami” on the real entry (m3 took away the only test that touched the entry's life). Check and result: the account-screen case above, failing for the mutant and passing for the code. The change to the foundation: `foundation_check.py` 0 errors; the D-416 text read back after the edit. No user interface changed in this round, so no new screenshot.

## Reaches beyond the handoff

`tests/view/program-editor.test.mjs` imports (to take out `countedName` and the now unused `NATURE_ENERGY_NAME`); `rule-list.tsx` (`ruleCountText`, read only to say it stays). Nothing else.

## Unread material

Findings file and handoff read whole. `reports/review-whole-report.md` **not read** (the handoff says to read it only when a finding needs it; none did). `.the-way/task-cycle/change/SKILL.md` and `fix.md` were not read again: I read the SKILL earlier in this session and the handoff gave the rows; I did not open `fix.md`, which the table names for a fix, so the report may lack something it asks (for example a separate section on what is not mine to fix; nothing was left unfixed except m2, with the evidence above).

## Searches not found or unclear

1. `fix.md` (named by `make-change` for a fix) not opened, as above.
2. Whether the line of D-416's first paragraph may hold four binding sentences: the template says one to three, but `foundation_check.py` accepts it and the handoff asked for the sentence in that place. If the orchestrator wants the paragraph kept to three, the right-area sentence can move to a paragraph of its own.

## Working copies

`.runs/author-fix-1/` (the edit script, the moved tests, two `.keep` copies for the mutations) — removed with `rm -rf` before returning; `ls .runs` shows `local-start`, `orchestrator`, `quality-venv`, `task-cycles`. No browser, no clone this round.
