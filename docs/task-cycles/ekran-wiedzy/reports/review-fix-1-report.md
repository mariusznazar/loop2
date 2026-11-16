PASS b67568aa07c51a60bdee8b47fc06329893630510

# Review of the fix, round 1 — task `ekran-wiedzy`

Fix range `caa13ffd5061e2cc60c7406203a6b5cf2045240b..b67568aa07c51a60bdee8b47fc06329893630510`: one commit, `b67568aa`. `git rev-parse HEAD` printed `b67568aa07c51a60bdee8b47fc06329893630510`, and the tree is clean. The findings file `reports/review-whole-findings.md` bounds this review (`.the-way/task-cycle/review/fix.md`).

The three blocking findings are fixed. Two of the Minor findings are fixed, and m2 remains as a Minor finding that blocks nothing. The fix itself adds one Minor finding and no Critical or Important one, so the review passes.

## Each finding

**I1 — fixed.** D-416's *Verification* no longer claims a test of the keyboard. Under "tests:" it now says "known trees in the order of the data as folded rows with their numbers of branches, opened by a click, …". The keyboard moved into the part an agent compares, in the form D-285 uses: "For the keyboard in a real browser, which the tests on a document imitation do not show, and for the layout, an agent compares a change with the part no test holds:".
- complies: "Enter and Space on the row of a tree opening it in the browser, as the browser's own click of a native button; …"
- violates: "a key handler on the row of a tree that stops Enter or Space, or a row that is no native button; …"

What the entry says now matches the tests: `tests/view/knowledge-screen.test.mjs` opens trees only through `press`, which is a click.

**I2 — fixed.** The first sentence of D-416's *Rationale* now reads: "the Understanding is the one gain a death never takes, and before this screen the player saw it nowhere, so after losing a character the player saw only what was lost and not what stayed." It stays true after the merge, and the rest of the *Rationale* is word for word as before. This departs from the wording the human approved in the definition. The author's report says the request shows it to the human, as question 6 of the task gives; the orchestrator has to carry that into the request.

**I3 — fixed.** D-416's first paragraph gains a binding sentence after the sentence about the left area: "Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop."

Against the task's own words, nothing is invented. Row 1 says: "Każda rzecz Zrozumienia na ekranie Wiedza stoi z ikoną z danych gry, więc stworzenie też ma w danych ikonę z game-icons.net — wilk `wolf-head`, jak w starym Loop". *To do* 4 says: "każda rzecz stoi z ikoną z danych gry i nazwą". The other clause of row 1 stays in D-291 as before, so row 1 is now recorded whole.

The sentence is held by three new `decision:` lines, and `foundation_check.py` matched each against the binding sentences (exit 0, 0 errors):
- `tests/view/knowledge-screen.test.mjs`, the left-area case, which checks the icons and names from the data;
- `tests/sim/data.test.mjs`, the wolf's fields `icon` and `iconTitle`;
- `tests/view/icons.test.mjs`, the wolf's data naming its file, and the file existing.

This sentence goes beyond *Decisions in play*, so the human has to see it in the request (WAY-30), as my finding said. The author marks it as the cycle's own wording.

**m1 — fixed.** `countedName` now stands in `src/browser/view/counted-name.ts`, a module of its own whose comment names it the game's one rule of declension. Its code is unchanged from what `program-editor.ts` held.
- Both importers resolve: `src/browser/view/program-editor.ts:39` and `src/browser/view/knowledge-lines.ts:19` import it from the new module, and `npm run typecheck` exits 0.
- `program-editor.ts` no longer exports it. A search for `countedName` over `src` and `tests` finds no importer of the old place, and only the new module exports it.
- The two moved tests are word for word the same, names, `decision: D-363` lines and assertions included. Only the file is new, `tests/view/counted-name.test.mjs`, and only its header comment is new text.
- Its place fits the part map: `src/browser/view/**` and `tests/view/**` belong to `browser-view` (`foundations/part_map.md`). `guidelines/coding-browser-module.md:207`–`:208` gives a file added after the last audit no row, so the table needs no change.

**m2 — remains, Minor; I keep it, and the author's evidence holds.** D-280's *Verification* still lists five screens opened at their addresses (`foundations/decisions.md:4156`–`:4157`). The author cites task line 131: *Relations* and *Verification* stay as they are in the foundation, apart from the four-item example. That is the reason my finding already gave for why the fix needs the human's agreement. The sentence is not false, so the definition's line 163 does not let the author change it alone. A Minor finding that remains blocks nothing (WAY-162). The author's smallest wording, should the human want it, is "Siedziba, Postać, Mapy, Programy, Wiedza and Przejście".

**m3 — fixed.** The registry test that ran on the test's own stand-in table is gone, together with its constant `KNOWLEDGE`. The stand-in table keeps its `knowledge` entry and the `slice(0, 6)` of the test of the list of accounts. That is needed: the registry refuses a table that leaves out the kind `knowledge`, which the type `Screen` now holds.

What replaced it in `tests/view/account-screen.test.mjs` runs on the real entry, through the game. The case „the item Wiedza of the bar opens the screen Wiedza, which the bar marks and which is gone when the player leaves it” now:
1. opens a game with one known tree;
2. opens the tree (`aria-expanded` `true`);
3. leaves to Siedziba;
4. follows the item again and finds the tree folded.

That is the one thing about the real entry the stand-in test never showed: `lives: "while-shown"` with its key. My own mutation confirms it: `lives: "always"` makes the case fail (N1 below).

## New findings in the fix diff

### Critical

none

### Important

none

### Minor

**n1. Within the task. D-416's first paragraph now holds four binding sentences, where the template gives one to three.** `foundations/decisions.md:4410`. `.the-way/elements/decisions/template.md:117`–`:119` says "One to three sentences answer the question of the heading, in the first paragraph under it. A part of another question … has its own paragraph after that one, also of one to three sentences". The paragraph now holds four: the definition's sentence, the left area, the icons and the right area.

What the entry says agrees with the code, and no sentence would be misread because of the departure, so by WAY-364 this is Minor. `foundation_check.py` does not count the sentences, which is why it passes. A fix that keeps every word:
- move the right-area sentence into a paragraph of its own; that paragraph would answer a part of the question, as the counters' paragraph already does;
- or move the icon sentence into the counters' paragraph, which holds two sentences.

## What `fix.md` asks of the author's report

`fix.md` asks the reviewer to say, for each finding, whether it is fixed or remains, and whether a contested one is kept. It asks nothing of the author's report beyond what the report holds. The report gives each finding as fixed, with its change and check, or as contested with its evidence (m2), and it names its own checks with exit codes. That the author did not open `fix.md` left nothing out that the review needed.

## Trust boundary

The fix touches no file under `assets/icons/**` (`git diff --stat caa13ffd..HEAD` lists none). `test_icon_file_content.py` and `test_icon_credits.py` still exit 0.

## Checks run

All from the worktree root `the root of the task's worktree` unless named.

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (test citations included).
- `npm run typecheck` — exit 0.
- `npx eslint` on `counted-name.ts`, `program-editor.ts`, `knowledge-lines.ts` and the seven changed or new test files — exit 0.
- `npx prettier --check` on `counted-name.ts`, `program-editor.ts`, `knowledge-lines.ts`, `counted-name.test.mjs`, `program-editor.test.mjs`, `account-screen.test.mjs` and `screen-registry.test.mjs` — exit 0.
- `npm test -- <file>`, each exit 0:
  - `tests/view/counted-name.test.mjs`, `program-editor.test.mjs`, `knowledge-lines.test.mjs`, `knowledge-screen.test.mjs`, `account-screen.test.mjs`, `screen-registry.test.mjs`, `icons.test.mjs`, `rule-editor.test.mjs`;
  - `tests/sim/data.test.mjs`;
  - `tests/quality/test_node_test_selection.py`;
  - `tests/invariants/test_content_identifiers.py`, `test_icon_file_content.py`, `test_icon_credits.py`.
- A search for `countedName` in the imports of `src` and `tests`: the only importers are `knowledge-lines.ts:19`, `program-editor.ts:39` and `tests/view/counted-name.test.mjs:6`, and the only export is `counted-name.ts:7`.
- Mutations of my own, in a worktree of `b67568aa` under my directory. Each source was restored after its run, and `git status --short` was empty at the end.
  - N1, `knowledge-entry.ts` set to `lives: "always"` with no key: `npm test -- tests/view/account-screen.test.mjs` exit 1 (caught).
  - N2, the exception 12–14 in `countedName` narrowed to 12–13: `counted-name.test.mjs` exit 1 and `knowledge-lines.test.mjs` exit 1 (caught).
  - Control on the unmutated worktree: `account-screen.test.mjs` exit 0.
- Not run:
  - the full gate `npm test` with no file, which is the orchestrator's;
  - `check_instructions.py`, since the fix touches no instruction file;
  - the game in a browser, since the fix changes no user interface.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md:113`–`:131`, the rule of binding sentences, to judge n1.
- `.the-way/task-cycle/review/fix.md`, read whole, as the method of this review.

## Working copies

- `.runs/review-fix-1/head` was a detached worktree of `b67568aa`, used for the mutations. Its `node_modules` was a junction to the reviewed worktree's. I removed the junction first with `rmdir`; the reviewed worktree's `node_modules` still holds 268 entries. Then I removed the worktree with `git worktree remove --force` and ran `git worktree prune`.
- `.runs/review-fix-1/` held the fix diff, logs and the mutation script. Removed with `rm -rf`. Nothing was kept in `reports/` besides this report.

## Unread material

none — I read the findings file, the fix report, the handoff, `fix.md` and the whole fix diff whole.

## Searches not found or unclear

none
