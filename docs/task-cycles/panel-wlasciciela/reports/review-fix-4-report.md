PASS 8be524ab00151da724011bbda12d22c402ee7773

# Review of the fix of slice 4 (`a3bb2bf6..8be524ab`)

Head confirmed: `git rev-parse HEAD` and `git rev-parse 8be524ab` both give `8be524ab00151da724011bbda12d22c402ee7773`. The range holds one commit, `8be524ab`. `git diff --name-only a3bb2bf6..8be524ab` lists exactly two files, `foundations/invariants.md` (2 lines changed) and `tests/owner-routes.test.mjs` (+1 comment line). Nothing else changed.

## Findings of the findings file

**I-1 — fixed.**

- The sentence of `owner-panel-authorization` (`foundations/invariants.md:730`) now reads: "... that role read from the database at the request and never from the session, and the block route answers JSON 409 to a block of an account with the owner role, the caller's own included, and each route changes nothing of any account, session or link when it refuses."
- Against row 8 of *Settlements to record* in `task-frozen.md:136-150` word for word. Row 8 has four things, and the sentence holds each:
  1. "Każda trasa panelu właściciela odmawia sesji konta bez roli właściciela" is held as 401 without a session and 403 to a session without the role, on each of the five routes.
  2. "rolę czyta przy każdym żądaniu, nie z chwili logowania" is held as "read from the database at the request and never from the session".
  3. "serwer odmawia blokady konta z rolą właściciela" is the new clause: the block route answers 409 to a block of an account with the owner role. The caller's own account is included, as D-137 and `plan.md:30` say.
  4. "nothing changed when it refuses" was already there. It now also covers the 409.
- The test of the refusal now carries `// invariant: owner-panel-authorization` (`tests/owner-routes.test.mjs:641`). The file holds four citations of the invariant (`grep -c`). `foundation_check.py` resolves the citations and reports 0 errors.
- The invariant's block-owner half has a test seen failing. I replaced `database.blockForPanel(address)` with `database.blockAccount(address)` in `owner-routes.ts` in a working copy of the head, rebuilt, and ran `node --test tests/owner-routes.test.mjs`. It exited 1 with 12 pass and 1 fail. The one failure is "a block of an account with the owner role, the caller's own included, is answered 409 owner-not-blockable ...", which is the cited test. Restored with `git checkout -- src`, and the working copy was removed. Output: `reports/review-4-evidence/fix-mutant.log`.
- The *Verification* lines of D-109 (`foundations/decisions.md:2275`) and D-137 (`:3091`) still name the invariant, and `decisions.md` is untouched by the fix. D-137's *violates* line ("a block of the panel ... that blocks an account with the owner role") is now held by the invariant itself.

**M-1 (not part of this fix) — closed as a side effect.** *Derives from* is now `D-109 · D-137 · D-400 · D-410`, which names the four decisions the sentence rests on, and `foundation_check.py` accepts it. D-400's and D-410's own *Verification* still do not list the invariant. That is a Minor item for the review of the whole change and does not block.

M-2 to M-5 were not part of the fix, as the handoff says. They stay for the review of the whole change.

## The fix's own diff: anything it broke

- The sentence is one sentence, and *Method*, *Rests on*, *Part* and *Violated* are unchanged. It names no branch, no `{fork-point}` and no tilde bound, so none of the template's rules on the sentence is touched.
- Template rule WAY-56 ("one entry states one invariant in one sentence"; its violating example is two separate rules joined, "binding sentences number one to three and contain no *should*"). The sentence now joins the authorization of five routes with the refusal to block an owner. I judge them joinable, as I said in the review: both are about who may act through the panel, and row 8 is one accepted settlement of kind "invariant" with both clauses. The sentence is long, but a reader finds each of the four conditions in it. Minor at most, and it blocks nothing. I did not find a sentence that a reader would read wrongly.
- The fix changes the wording of an invariant that reads `test`. `foundation_check.py` lists such a change when no file citing it changed. A citing file did change (the added comment line), and the check reports 0 errors.
- No assertion of the test changed, so the new comment line is the only change to the test file.

## Declined to judge

- Minor findings M-2 to M-5 of the slice review: not part of this fix.
- The Minor point on D-400's and D-410's *Verification* not listing the invariant: outside the fix diff; for the whole-change review.

## Checks run

| Check | Exit |
|---|---|
| `git rev-parse HEAD`, `git rev-parse 8be524ab`; `git log a3bb2bf6..8be524ab`; `git diff --name-only a3bb2bf6..8be524ab` (two files) | 0 |
| `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree (`0 errors`) | 0 |
| `node scripts/build.mjs` in my working copy of the head | 0 |
| `node --test tests/owner-routes.test.mjs` in my working copy of the head (13 pass, 0 fail) | 0 |
| the same test with `blockForPanel` replaced by `blockAccount` (rebuilt first, build 0): 12 pass, 1 fail, the cited 409 test | 1 |

Not run: `npm test -- tests/owner-routes.test.mjs` through the product's runner (I used `node --test` in my copy), prettier and eslint, `npm run typecheck`, and the full gate. The fix changes no code file, and the executor reports prettier and eslint exit 0 on the one comment line of the test file.

## Reach beyond the handoff

- `.the-way/foundations/decisions.md`, entry WAY-56 (grep for its heading, read whole): to judge whether one sentence may join the added clause.
- `.runs/task-cycles/panel-wlasciciela/task-frozen.md:136-150` (row 8, word for word): named by the handoff, read again for this review.

## Working copies

`.runs/review-4/wt` (a worktree of `8be524ab` with a junction `node_modules` to the reviewed worktree's own) is removed. I removed the junction first with `rmdir`; the target's `node_modules` is intact (`ls` shows it). Then `git worktree remove --force` and `git worktree prune`; `.runs/review-4/` is removed. No remainder. The evidence `fix-green.log` and `fix-mutant.log` is kept in `.runs/task-cycles/panel-wlasciciela/reports/review-4-evidence/`.

## Unread material

- `.runs/task-cycles/panel-wlasciciela/plan.md:30` and `:165`: not reread; they are quoted in the findings file, and I read them in the first review.
- `.the-way/elements/invariants/rules.md` (the element's `rules.md` that the handoff names where the template names it) and `elements/common/rules.md`: not read. I read the template whole and judged the fix against it; the fix touches no field form that those files govern beyond what `foundation_check.py` checks (0 errors).
- The fix's evidence files (`fix-4-evidence/`): not read; I made my own runs.
- `foundations/invariants.md` outside the entry `owner-panel-authorization` and `foundations/decisions.md` D-109 and D-137: only the diff and the *Verification* lines were checked, not reread whole.

## Searches not found or unclear

None. Everything I looked for was found.
