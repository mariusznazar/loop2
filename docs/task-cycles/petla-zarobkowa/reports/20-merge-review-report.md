PASS b890c1655fd142fc9db82f37d5bfe16a474249c3

# Review of the reconciliation with the target branch, task `petla-zarobkowa`

Range `cd650de..b890c16`: `8f275f9`, the renumbering, and `b890c16`, the merge of `origin/main` at
`dc0fc69`. `git rev-parse HEAD` is the head given. The tree of `cd650de` equals that of `42784ca`
(`9e27a23`). `git ls-remote` shows main still at `dc0fc69`, so nothing newer stands to reconcile.

No blocking finding. One Minor, one Minor that goes beyond the task.

## Findings

### Critical

None.

### Important

None.

### Minor

**M-1. The body of request #47 still carries this change's old numbers.**
Place: the description of PR #47 on GitHub, outside the reviewed range; the request's head is still
`cd650de`, because `b890c16` is not pushed.
What is wrong: it holds 22 mentions of D-222 to D-234, all but one this change's own old numbers, for
example
"D-230 runs it with a tab open" (now D-247), "Read beside D-228" (now D-245) and "**D-232** also
narrows" (now D-249). Its section *Before you merge* also still says the request collides with the
two open requests #45 and #46, which have merged; that note is the one mention that is no citation
of this change.
Why it matters: the human reviews the request. Once `b890c16` is pushed, each of those numbers names
a password-reset or backup decision of main, so a reader who follows one lands on the wrong entry.
This is the one place where a citation of this change points at main's D-222 to D-238 after the
merge; the tracked tree holds none.
Evidence: `gh pr view 47 --json body`, counted with a search for `D-2(2[2-9]|3[0-9]|4[0-9]|5[01])`.
Each number shifts by +17, as in the tree. It does not block, as it lies in the request's text and
not in the change; the push is the moment to correct it.

### Minor, beyond the task

**M-2. The backup procedure does not say what a raise of the save version does to an older backup.**
This goes beyond the task: the file is main's, and neither the task nor this change touches it. It
counts as out of scope, and it arises only where the two sides meet.
Place: `.claude/skills/loop2-deploy/references/backup_and_restore.md:194-199` and `:277-278`, and its
twin under `.agents/skills/`.
What is wrong: the section *Restoring* speaks only of the database schema ("A backup newer than the
running code's schema is refused"), and *Not proven by this trial* names only "backups of later
schema versions". After this change deploys, the nightly files from before that deployment hold
saved games of version 2 for as long as they stay among the seven weekday files. Restored under
version 3, each such save comes back through the server and the page refuses it
(`src/browser/sim/saved-game.ts:1302`) and replaces it at once (`src/browser/view/app.ts:225`).
`scripts/restore-trial.mjs` only searches the game of `GET /api/saved-game` for the marker, without
the game's load, so it reports PASS on a marker in a save the game would refuse. Likewise the marker of the installation's step 8 lies in the test
account's save: once that account opens the game under version 3, the save becomes a new game and a
later trial with that marker fails.
Why it matters: little today. The owner alone has accounts, the discard is accepted, and the window
closes a week after the deployment. If nothing changes, the first restore or trial in that window
surprises the owner; a sentence in that file would remove the surprise, at the cost of one more edit
in a file with a twin.

## What was checked, by the handoff's points

**1. The renumbering is whole and exact.** A word-level diff of `cd650de..8f275f9` gives 94 changes in
23 files, each exactly `D-n` to `D-(n+17)`, and no other change in any file, so no code changed. No
mention of D-222 to D-238 stands at `8f275f9`, and at `cd650de` none above D-234 stood. The 13 titles
of `cd650de`'s D-222 to D-234 equal those of `b890c16`'s D-239 to D-251 in order, so each citation
still names the right decision. No lower-case or spaced variant of those numbers exists.

At `b890c16`, every line holding D-222 to D-251 comes word for word from one of the two sides, apart
from D-44, and no line of main was lost. Lines of this change hold only D-239 and up, those of main
only up to D-238, so no citation crosses. Citations in the same file on both sides, as in
`tests/view/account-screen.test.mjs`, are each that side's own.

**2. The resolved conflicts are correct.** The tree of `git merge-tree 8f275f9 dc0fc69` differs from
`b890c16` only in `foundations/decisions.md` and `foundations/invariants.md`, the two conflicted
files, so nothing was slipped in elsewhere.

- D-44: the word-level differences of main to `b890c16` are exactly the six of the merge base to
  `8f275f9` (`check-d44`), so main's text stands with „Zatrzymaj” in the sentence and in the
  *violates* line, this change's Origin and "stops an earning loop" in *Rationale*.
- Tails: entry by entry across base, side, main and head, every entry changed by one side equals that
  side's text in the head, the 30 new entries of `decisions.md` and the 11 of `invariants.md` among
  them.
  D-238 differs only by the blank line that now separates it from D-239, and D-221 only by the same
  blank line, which both sides added. Order: main's D-222 to D-238, then D-239 to D-251; in
  `invariants.md` main's seven, then this change's four, then *Withdrawn identifiers*.

**3. What auto-merged is sound.**

- `guidelines/styleguide-browser-view.md`: main's hunks and this change's „Zatrzymaj” stand side by
  side, in different lines.
- `src/browser/styles.css`: main adds `.form-note`, `.account-form:only-child` and
  `.account-form-switch`; this change adds `.away-report-*`, `.team-member-loop`,
  `.team-member-stopped` and `.rehearsal-mark`. No selector is shared.
- `tests/view/account-screen.test.mjs`: the only hunk needing both sides is the imports, and both are
  kept.
- The rest: no file in `AGENTS.md`, `.gitmodules`, `package.json`, the lock file, `Dockerfile`,
  `deploy/`, `scripts/` or `src/server/` differs from main. The gitlink of `.the-way` is `a8dfe8a` on
  both, and the checkout matches it. `src/browser/sim`, `clock.ts`, `game-view.ts`, `game-saver.ts`,
  `headquarters.ts` and `away-report.ts` are unchanged by the merge.

**4. The meeting of the two sides.**

- *Decisions.* I read this change's D-239 to D-251 whole, word-level diffs of all 17 older entries
  main changed and all 14 this change changed, and main's D-225, D-228 and D-234 whole; I searched
  main's D-222 to D-238 for citations of the 14. Only D-44 is changed by both. None of main's new
  entries cites any entry this change altered. D-208's "limits of a save" rest on D-104 and D-207,
  which main left as they were. Main's D-138 and D-211 add a password reset as a way a session ends; the path is
  `expire()`, the one `expired-session-unsaved-progress` already covers, and `keep()` stamps the save
  time.
- *Guidelines.* Main's changes reach the account, mail, session, database and backup rules. In the
  browser they add `createFormNote`, for a calm sentence under a form, which does not reach this
  change's lines in the headquarters, since these are no forms. `guidelines/testing.md`'s row for
  `saved-game.ts` is unchanged, and its four case names each stand once in
  `tests/sim/saved-game.test.mjs`.
- *`src/browser/view/app.ts` and D-247.* The orchestrator's reading holds. `createGameView` has one
  caller, `showGame` at `app.ts:203`, and `clock.catchUp()` is the last step of building
  (`game-view.ts:285`). The reset form builds no game. Main's three endings go on by `showForms` or
  `checkSession`, so into the ordinary paths. Three scratch tests prove it (`check-reset-paths`) and
  fail when the catch-up is removed.
- *D-247's list of four.* It reads "after each load": the sign-in, the reload, the lost save and the
  kept state. A page opened by a reset link and left by „Anuluj” or a refused link is a load none of
  the four names word for word, though a page opening stands under "reload" as the confirmation link
  already did before this change. The code does what the entry's rule requires, so this is no
  finding.
- *Main's tests in `tests/view/account-screen.test.mjs`.* None depends on the save's shape or version:
  main's added lines hold no `saveOf`, `VERSION`, `version`, `awayReport`, `saveTimeMs` or `loops`, and
  their two game cases load `NO_SAVE`, whose value is `null`. Their `intervals.size === 0` still means
  something: this change left `GAME_INTERVALS` at 2 and the tests that assert it pass.
- *The kitchen-sink page.* Main rewrote `src/browser/kitchen-sink/kitchen-sink.ts`, which
  `tsconfig.browser.json` leaves out. It compiles against this change's code (`check-kitchen`), and
  `tests/invariants/test_application_build_kitchen_sink.py` builds it in the gate as well.
- *The server and the backup.* The server checks only that `version` is a whole number of at least 1,
  so version 3 needs nothing from main's routes. Neither the restore trial nor
  `account-database-check.ts` runs the game's load. See M-2 for the one consequence.

**Trust boundary.** `src/browser/sim/saved-game.ts`: main did not change `src/browser/sim`, and the
file's one change in the range is a number in a comment. No hostile-input path moved.

**Irreversible operation.** Raising `SAVED_GAME_VERSION` to 3 stays prepared only: the merge adds no
deployment and no change to `deploy/`. Main's backups and password reset are the merged requests' own.

**Invariant tests altered in the range:** none of this change's beyond the numbers of decisions in
test names and comments. Those main brought are its merged requests' own, reviewed there.

## Declined to judge

- The behaviour of main's password reset and database backup on their own: reviewed in requests #45
  and #46, and outside this task.
- A reset link opened in a tab already showing the game, where only the fragment of the address
  changes: `src/browser` has no listener for `hashchange`, so the page may not start anew. It is main's
  behaviour, and it does not depend on this change.
- The wording of D-211 "its time stops" beside this change's catch-up of a kept state: it predates the
  merge, and the whole-change review saw it.

## Checks run

- `check-renumber`, a script over `git diff --word-diff=porcelain cd650de 8f275f9`: exit 0, 94 shifted,
  0 odd.
- `git grep` for D-222 to D-238 at `8f275f9`: no match; for D-235 and up at `cd650de`: no match.
- A script comparing every line with those numbers across `8f275f9`, `dc0fc69` and `b890c16`: exit 0,
  one line new and one lost, both D-44's main sentence.
- A script comparing every entry of `foundations/` across the four commits: exit 0.
- `check-d44`, a script of word-level differences on D-44: exit 0, 6 and 6, identical.
- `git merge-tree --write-tree --name-only 8f275f9 dc0fc69`, with `git diff` of its tree against
  `b890c16`: the two conflicted files only.
- `git show --cc b890c16`: combined hunks in three files, the two above and the test file's imports.
- `python -B .the-way/elements/common/foundation_check.py` in the worktree: exit 0, 0 errors.
- `git status --short` in the worktree after it: empty. `git -C .the-way rev-parse HEAD` equals the
  gitlink.
- In a scratch export of `b890c16`, removed afterwards, with dependencies linked from the worktree:
  - `node scripts/build.mjs`: exit 0.
  - `check-kitchen`: `node node_modules/typescript-compiler/bin/tsc -p tsconfig.kitchen-sink.json
    --noEmit`, exit 0.
  - `node scripts/test-node-file.mjs tests/view/password-reset.test.mjs`: exit 0.
  - `check-reset-paths`: `node scripts/test-node-file.mjs tests/view/account-screen.test.mjs`, with
    three scratch tests added, exit 0, 70 of 70. The three load a save with an earning loop after
    „Anuluj”, after a refused link and after a sign-in following a changed password, and each sees
    the catch-up, its report and the saved moment.
  - Control: the same run with `clock.catchUp()` removed from `game-view.ts`, exit 1, 5 failed, the
    three scratch tests among them.
- The gate's log `reports/19-gate-merge.log`, read: ends in 377 Python tests passed and 0 errors. I did
  not run the gate, as the handoff asks.

Could not run: nothing the review needed. No browser run was made; the merge changes nothing on any
screen of this change.

## Reaches beyond the dispatch

- `.claude/skills/loop2-deploy/references/backup_and_restore.md:186-281`: how a restore treats a save.
- `foundations/decisions.md` D-225, D-228 and D-234, each whole: the reset form's endings and what a
  restore promises.
- `scripts/test.py`, `scripts/build.mjs`, `scripts/test-node-file.mjs`, `tsconfig.kitchen-sink.json`
  and `scripts/restore-trial.mjs:296-310`: how to run one file, what the gate compiles and how the
  trial reads a save.
- The body of PR #47, by `gh pr view`: whether the old numbers live on outside the tree.
- A search of `petla_zarobkowa_loop2.md` in the vault and of the frozen `task.md` for the old numbers:
  no match.

## Searches not found or unclear

- The review skill says to return the counts of findings; the dispatch says to return the first line,
  a one-line check result and the path. I followed the dispatch.
- The first export for the scratch run had no dependencies linked, because the link command failed, so
  its runs failed on the missing compiler. All results above come from the rerun after the link
  stood, on a copy of `game-view.ts` confirmed equal to `b890c16`'s.
- Nothing else unclear.
