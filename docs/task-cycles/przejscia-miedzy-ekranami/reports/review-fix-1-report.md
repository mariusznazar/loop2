PASS caf7a814dc81247476085b1bfd5b0cbd579a8ea3

# Review of fix 1 — the five Minor findings (task `przejscia-miedzy-ekranami`)

Range `328562acde41050216e5c67414478ccd2e24c84e..caf7a814dc81247476085b1bfd5b0cbd579a8ea3`
(`1370d75a`, `caf7a814`; 8 files, +16 −14). `git rev-parse HEAD` in the reviewed worktree gave the
head given; the worktree was clean before and after. Bounded by
`.runs/task-cycles/przejscia-miedzy-ekranami/reports/review-whole-findings.md` (five Minor findings,
no blocking one), read with the fix report `author-fix-1-report.md`.

Counts: 0 Critical, 0 Important; 5 findings fixed, 0 remain; no new finding.

## Each finding

1. **D-196's binding sentence — fixed.** `foundations/decisions.md:7475` now ends "use the repertoire
   of the map run's character, including the branches it had bought at the start of that map run".
   That is the code's reading (`programOf(…, run.character.skills)`, the run's start snapshot), and
   it agrees with the rationale this change wrote. It also holds after „Restart”, whose map run starts
   with the skills of the one it replaces (D-200), and after a death that took everything, where the
   map run on the screen keeps its start skills (D-190). The meaning is the same as before the task:
   until this task no purchase could happen while a map run stood, so "its bought branches" and "the
   branches it had bought at the start" named the same set. The author marks the edit as the cycle's,
   since no settlement row carries it; it goes to the human at the request. The five `decision:`
   quotations of the old words were updated, and no other text was changed
   (`tests/sim/rule-signs.test.mjs:626`, `tests/sim/skills.test.mjs:713`,
   `tests/view/program-editor.test.mjs:1191` and `:1679`, `tests/view/program-panel.test.mjs:1819`).
   The tests still hold what the new words say: `withBought` in `program-editor.test.mjs:1016` writes
   the rank into `state.run.character.skills`, the map run's own skills, and the other cases buy before
   the send. A search of the tracked `.md`, `.mjs` and `.ts` files outside `.runs/` finds "including
   its bought branches" nowhere. `foundation_check.py` → 0 errors.
2. **Styleguide copy of D-287's sentence — fixed.** `guidelines/styleguide-browser-view.md:1271-1274`
   now names „zdanie D-287 o tym, od kiedy kupiony stopień działa (D-200)” without its words, and keeps
   the rule that no other character gets the sentence. The older quotation under „Wyposażenie” was not
   part of the finding (I cited it only as precedent) and is left as it was.
3. **Comment of the `(hover: none)` block — fixed.** `src/browser/run-screen.css:255` gives the block
   of `.run-header-back` a comment of its own naming D-396. The hover clause was moved out of the
   comment of the block above, so nothing is said twice. The CSS rules themselves are unchanged.
4. **Second copy of the end test — fixed, by the author's choice.** The doc comment of `mapRunEnded`
   (`src/browser/sim/run.ts:468-472`) now says that `purchaseOpen` in `skills.ts` writes the same
   test out, and that a new kind of end goes into both. The comment of `purchaseOpen` already points
   back to `mapRunEnded`. My finding offered this comment as one of its two fixes. With it, whoever
   adds a kind of end in either place is sent to the other, which was the risk the finding named. The
   duplication itself stays, as the finding allowed. I accept the author's reason for not moving the
   test to a shared module (a new file and changed imports, more than a Minor finding asks).
5. **Identity assertion — fixed.** `tests/sim/skills.test.mjs:248` is now `assert.deepEqual(bought.run,
   waiting.run, …)`. The test now compares the map run by content, so a correct implementation that
   rebuilt the run would pass. A purchase that wrote the rank into the run would still fail, since the
   comparison reaches `run.character.skills`.

## The fix diff

The fix changes no behaviour. It changes:
- one binding sentence, which only clarifies the meaning;
- the five quotations of that sentence;
- one guideline sentence;
- two comments;
- one assertion, made correct-by-content.

No branch or value was made for a test, no invariant is reached in a way that breaks it, and no
guideline rule is broken. The CSS edits are comments only, which the focus-outline and token-value
invariant tests confirm.

## Declined to judge

none

## Checks run

- `git rev-parse HEAD` → `caf7a814dc81247476085b1bfd5b0cbd579a8ea3`; `git log`/`git diff 328562ac..caf7a814` read.
- `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) → exit 0, 0 errors: every `decision:` quotation, the five changed ones among them, stands in its decision.
- `python -B .the-way/instruction-files/check_instructions.py` (reviewed worktree) → exit 0, "0 error, 0 warn, 122 info".
- In a detached worktree of `caf7a814`, each `npm test -- <file>` → exit 0: `tests/sim/skills.test.mjs` (21 pass), `tests/sim/rule-signs.test.mjs` (40), `tests/view/program-editor.test.mjs` (63), `tests/view/program-panel.test.mjs` (60), `tests/view/run-header.test.mjs` (24), `tests/invariants/test_browser_view_focus_outline.py` (3 OK), `tests/invariants/test_browser_view_token_values.py` (4 OK).
- Search for "including its bought branches" in tracked `.md`/`.mjs`/`.ts` outside `.runs/` → no match.
- Not run: the full `npm test` (the cycle's or CI's gate, as the handoff gives). StrykerJS was not run because the fix changes no code of the simulation, only a comment in `run.ts`. eslint and prettier were not run: the author reports both at exit 0, and the fix changes only comments, one assertion call and quotation strings.

## Reaches beyond the dispatch

- `tests/view/program-editor.test.mjs:1016` (`withBought`): checked that the tests quoting D-196 hold a repertoire the map run's character already had.

## Working copies

- `.runs/review-fix-1/head` held a detached worktree of `caf7a814` with a junction `node_modules` to the reviewed worktree's. I removed the junction with `rmdir`, then the worktree with `git worktree remove --force`.
- `.runs/review-fix-1/` held the test outputs. I removed it whole with `rm -rf` and ran `git worktree prune`. The reviewed worktree's `node_modules` is intact.
- No process is left running.

## Unread material

none — the findings file, the fix report and the whole fix diff were read. The fix adds no decision to
my selection beyond D-196, which I re-read at the changed binding sentence; the rest of D-196 is unchanged
from my review of the whole change.

## Searches not found or unclear

none
