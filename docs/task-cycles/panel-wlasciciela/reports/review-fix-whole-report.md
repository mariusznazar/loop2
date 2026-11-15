PASS 70c7bb9c4fdebd8ada712ce2f8d04e3b0a5f41d7

# Review of the fix of the whole-change findings — "panel właściciela", range `e9b68648..70c7bb9c`

`git rev-parse HEAD` is `70c7bb9c4fdebd8ada712ce2f8d04e3b0a5f41d7`. The range holds the seven commits the handoff names (`47dbed20`, `e0f36718`, `6085dd95`, `0da7c45a`, `d4d21c47`, `b44abe5b`, `70c7bb9c`): 20 files, +303 −75. Every hunk of `git diff e9b68648..70c7bb9c` was read.

Result: all 23 findings of `reports/fix-whole-findings.md` are **fixed**; none remains. The fix diff brings no new Critical or Important finding. One new Minor finding (N-1) and two Minor notes (N-2, N-3) follow; they block nothing (WAY-162).

## The 23 findings

| # | Verdict | Evidence on the new head |
|---|---|---|
| I-1 | fixed | `src/browser/view/accounts-screen.tsx`: „Wróć” is a plain `ReactButton` (no `kind`), with a header comment saying D-275 does not apply to a confirmation. `guidelines/styleguide-browser-view.md:1007-1009` now says "zwykły przycisk „Wróć” (D-44), tak jak przy „Zacznij od zera”; potwierdzenie nie jest formularzem, więc „Wróć” nie jest akcją poboczną (D-275)", which agrees with the rule at `:448-453`. The test (`tests/view/accounts-screen.test.mjs`, the case retitled "… a destructive one and a plain one, as in the confirmation of „Zacznij od zera”") asserts the button is neither `secondary` nor `destructive`. My mutation A (`kind="secondary"` put back) fails that case (exit 1). Layout: `margin-right: auto` is gone from `.accounts-confirm-text` (`src/browser/styles.css`). The fix's screenshots `screenshot owner-block-confirmation-wide` and `…screenshot -narrow` show „Tak, zablokuj” and „Wróć” as two framed buttons right after the sentence, as in „Zacznij od zera”. |
| I-2 | fixed | D-109 at all three places: the binding sentence at `foundations/decisions.md:2270` ("checked after the session and before any field of the body is read, with no field of the body read and nothing changed"), *complies* at `:2290` ("before it reads any field of the body") and *Rationale* at `:2294` ("before any field of the body is read"). The extra change of "with nothing read of the body" to "with no field of the body read" is right: the old words stated the same untruth. In `tests/owner-routes.test.mjs` only the two `// decision: D-109` comment lines changed in those two tests (`:428`, `:468`); no assertion or title of them changed (the diff hunks hold those lines alone). `foundation_check.py` exit 0. The code (`owner-routes.ts`: guards, then `ownerOnly`, then `targetAddress`) is what the sentence now says. |
| I-3 | fixed | `guidelines/coding.md:131-132` and `:147-148` list `account-role` in both lists, matching D-253 and D-354. |
| M-1 | fixed | `src/browser/view/accounts-entry.ts:36` and `:38` are one sentence each; the retry button keeps „Spróbuj ponownie”. The two cases assert one sentence. My mutations C and C2 (each old text put back) each fail a case (exit 1). |
| M-2 | fixed | Both `SKILL.md` copies, "The owner role": the `owner` bullet says an open page learns the role only when it loads, so the link stands after a reload; the after-deployment bullet says "reloads the game page". The copies are identical (`cmp` exit 0) and the skill test passes. |
| M-3 | fixed | `guidelines/testing.md`: D-410 and D-411 and the invariant `owner-panel-authorization` in *Trust boundaries*; the `src/server/` row names four cases of `tests/owner-routes.test.mjs` and two of `tests/account-owner.test.mjs` (I checked each title with `grep -F`: all six exist, one each); rows `:199` and `:214` now name `"role":"owner"` for an owner; five new permission rows for the owner routes; both files in *integration test* and *Where in code*. The rows follow the existing form; `foundation_check.py`, which checks the guidelines, exit 0. |
| M-4 | fixed | `guidelines/coding-http-application.md` has a row for `src/server/owner-routes.ts`; `guidelines/coding-browser-module.md` has rows for `accounts-entry.ts` and `accounts-screen.tsx`. All three are `copy`, in the form `.the-way/product-guidelines/coding/template.md:250-261` gives (*Status* one of three words, *Decision* `—`). See note N-3. |
| M-5 | fixed | `src/server/account-role.ts:6` "The operator gives …". In both skill copies "the owner signs in" became "it signs in"; "The owner blocks" and "The owner grants" became "The human …"; and the emergency list says "the account with the owner role … its holder" and "the human's account does not have the owner role yet". Older lines the change did not write (`SKILL.md` 180, 217, 294, 322) stay; they belong to O-1, outside the task. |
| M-6 | fixed | `tests/account-storage.test.mjs`: one case shows the `CHECK` refusing `role` 'admin', '' and 'Owner', `blocked` 2 and `previous_save_allowed` 2. Another shows each of `findAccountByEmail`, `findAccountById` and `listAccounts` refusing a row written with checks switched off. My mutation D (the role check of `accountFromRow` made `false`, with a cast) and mutation E (the `CHECK` widened with 'admin') each fail one case (exit 1, 1 fail). |
| M-7 | fixed | The new case "a step 6 that fails after step 5 has run rolls step 5 back too …" uses a version-4 database with a `role` column, so step 5 runs and step 6 fails. My mutation F (a `COMMIT; BEGIN IMMEDIATE` after each step in `initializeSchema`) fails it (2 fails: the new case and an older step case). The old step-6 case's comment now says it cannot show a rollback. |
| M-8 | fixed | D-410 *Relations* begins `derives from D-12`. |
| M-9 | fixed | D-400 *Verification* lists `owner-panel-authorization`; D-410 *Verification* begins `invariants: owner-panel-authorization.`. |
| M-10 | fixed | One added sentence each in D-137 and D-400 ("The address in the body … is normalized as at login, and an address written as no address is the address of no account"), true of `targetAddress` and `unknownAccount` in `owner-routes.ts`. Their *Verification* lines name it. New `// decision:` lines quote the new sentences at the block, grant and 404 tests; the quoted older sentences are untouched. |
| M-11 | fixed | `operationRoute` takes `run: (address) => PanelResult` and `events: Partial<Record<ChangeOutcome, PanelEvent>>`. My mutation I (`bloked`) fails `npm run typecheck` with TS2561; mutation J (`account-previous-save-revokd`) fails it with TS2820. Dropping the `result.accountId` check is sound: after the `unknown` and `owner` branches every remaining outcome type carries `accountId: string`, and the typecheck passes. |
| M-12 | fixed | `tests/account-owner.test.mjs:80`: a `// decision: D-411 "…"` line that begins its sentence; the foundation check accepts it. |
| M-13 | fixed | `holdWriteLock` (`tests/account-owner.test.mjs:258-283`): a report that came is never rejected; a missing one rejects with the exit code and the word it waited for; the worker's own `error` still rejects first; a no-op `catch` keeps a report nobody awaits yet from being an unhandled rejection, while the returned promise still rejects for the awaiter. Checked by reading; no product code is involved, and the file passes (13). |
| M-14 | fixed | The usage case adds `Owner` (exit 2) and `player @example.test` (exit 4). The fix's correction of my wording is right: the inner space is refused as an unknown address, not as a usage error, because `normalizeEmail` keeps it. My mutation G (role word lower-cased) and mutation H (spaces stripped from the address) each fail the case (exit 1). |
| M-15 | fixed | `accounts-screen.tsx:312` draws `<h2 className="accounts-heading">Panel właściciela</h2>` in every phase. `.accounts-heading` uses the declarations of `.headquarters h2` (`text-strong`, `--font-size-heading`, `--font-weight-emphasis`). The styleguide rule says so at `:978-981`. See the judgement of the wording below. My mutation B (heading removed) fails the new case. |
| M-16 | fixed | The stand-in answers `refused(409, "owner-not-blockable")`. |
| M-17 | fixed | `programs-entry.ts` no longer has the option `owner`, and `game-view.ts` no longer passes it. The one call passes `false` with a comment (`programs-entry.ts:354-355`). The literal is right: that call resolves the address the programs entry shows, a program or the list of programs, never `#/konta`. A default parameter, which the fix rejects, would let a future caller silently deny an owner the screen. `previous-save`, `owner-panel` and `screen-registry` tests pass. |
| M-18 | fixed | `tests/view/screen-registry.test.mjs:462` quotes D-408 only up to "… one entry in the registry of screens". |
| M-19 | fixed | The grant/revoke case checks the reset: 403 before the grant, 204 after it, 403 after the revoke. My mutation K (the privilege check of `resetSavedGame` removed) fails the case at its first reset assertion ("precondition: no privilege, so no reset"), as the fix's report says. The assertion after the revoke exercises the same line of code after the panel's revoke, so it holds the clause of D-400. |
| M-20 | fixed | The `account-role` wrapper's `case` adds `'{"failure":"uncaught"'*'"place":"account-role"}'`. I ran the `case` on five lines in bash: kept were the last-resort line of `account-role` (`JSON.stringify` puts `place` last, `log-line.ts:53-55`), the command's own failure line and an event; dropped were the last-resort line of `account-block` and the sentence. The older wrappers keep their pattern, as the finding allowed. |

## The heading „Panel właściciela” (M-15)

The styleguide has no rule for the heading of a screen. Siedziba is the one screen with a heading of its own; Mapy and Programy are named by their marked bar item, which `#/konta` has none of (D-281). The new heading takes Siedziba's look, rule for rule, so it adds no role or value, and the styleguide rule *The list of accounts* now states it. The words are those of the link the owner followed (D-280's „Panel właściciela”), so the owner sees where the click led. „Konta”, the list's name for assistive technology, would also fit. Either is the human's to prefer; the one chosen is consistent with D-280 and the task's To do 3, which names the link. No finding.

## New in the fix diff

- **N-1 (Minor, new).** `guidelines/styleguide-browser-view.md:1009-1010` says "Przyciski stoją obok zdania, w oknie szerokim tak samo jak w oknie wąskim". The fix's own narrow screenshot (`fix-whole-evidence/screenshot owner-block-confirmation-narrow`, 600 px) shows the sentence wrapping and the two buttons standing under it, which is the right behaviour and that of „Zacznij od zera”. The sentence says more than the layout does. Better wording: "zaraz po zdaniu, a w wąskim oknie pod nim, nigdy na końcu szerokiego wiersza".
- **N-2 (note).** The two quoted lines of D-109 in `tests/owner-routes.test.mjs` change with the binding sentence. This is the one place where the A2 rule (add a sentence, leave the quoted ones) could not hold: the sentence itself was untrue. The handoff limited the fix to those comment lines, and they are the only lines changed in those two tests.
- **N-3 (note on M-4).** The three `copy` statuses are the fix author's judgement, not an audit's. `.the-way/product-guidelines/coding/template.md:259-261` says a file added after the audit takes a row when the guidelines are refreshed or extended; this is such an extension. The judgement is reasonable: `accounts-entry.ts` says "A new screen copies this entry", and the sibling `account-routes.ts` is `copy`. The human may change a word.

## Minor findings that remain from the 23

None.

## Checks run

From the worktree root unless noted, each in the foreground with `timeout 280`. Evidence kept in `reports/review-fix-whole-evidence/` (`summary.txt`, `mut-out.txt`, `mutK.txt`).

| Check | Command | Exit |
|---|---|---|
| Head | `git rev-parse HEAD` | `70c7bb9c4fdebd8ada712ce2f8d04e3b0a5f41d7` |
| Range | `git log --oneline e9b68648..70c7bb9c`; `git diff --stat e9b68648..70c7bb9c` | 7 commits, 20 files |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Typecheck | `npm run typecheck` | 0 |
| Prettier, the 12 changed code, test and CSS files | `npx prettier --check …` | 0 |
| ESLint, the 11 changed code and test files | `npx eslint …` | 0 |
| Skill copies | `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` | 0 |
| Tests | `npm test -- tests/view/accounts-screen.test.mjs` | 0 (22) |
| | `npm test -- tests/account-storage.test.mjs` | 0 (87) |
| | `npm test -- tests/account-owner.test.mjs` | 0 (13) |
| | `npm test -- tests/owner-routes.test.mjs` | 0 (13) |
| | `npm test -- tests/view/screen-registry.test.mjs` | 0 (15) |
| | `npm test -- tests/view/previous-save.test.mjs` | 0 (44) |
| | `npm test -- tests/view/owner-panel.test.mjs` | 0 (4) |
| | `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 |
| Test titles quoted in `testing.md` | `grep -cF` of the six titles in `tests/owner-routes.test.mjs` and `tests/account-owner.test.mjs` | 1 each |
| Wrapper pattern | the `case` of `SKILL.md:429` run in bash on five sample lines | as M-20 above |
| Mutations A-J | `.runs/review-whole/mutate.py` in a worktree of `70c7bb9c`, each restored after its run; tests by `npm test -- <file>`, M-11 by `npm run typecheck` | each 1 (killed) |
| Mutation K | the reset's privilege check removed; `npm test -- tests/owner-routes.test.mjs` | 1 (killed) |
| Manual | the fix's two screenshots viewed | as I-1, M-15, N-1 |

Not run: the product's full gate (the orchestrator's); the other view tests that build the game view (`chronicle-game`, `end-question`, `end-window-game`, `uncaught-failure`, `account-screen`). The fix removes only one option from the programs entry, and `previous-save` and `owner-panel`, which build the game view, pass.

## Reach beyond the handoff

- `.the-way/product-guidelines/coding/template.md:246-265`: the form of *Files of this kind*, as the handoff asks (M-4, N-3).
- `src/server/database.ts:795-802` in my worktree: to place mutation K.
- `scripts/build.mjs`, `tsconfig.browser.json` and `tsconfig.server.json` (grep for `noEmitOnError`): to make each mutation compile, so that a failure is the test's and not the build's.

## Working copies

- `.runs/review-whole/` in the worktree held the per-area diffs, a git worktree of `70c7bb9c` at `.runs/review-whole/wt` with a junction `node_modules` pointing to the reviewed worktree's own `node_modules`, my mutation script and its outputs.
- The junction was removed first, through `.Delete()` on the link; the target is intact (`node_modules\react` present after). Then `git worktree remove --force` and `git worktree prune`, then the directory removed (`Test-Path` false). `git status --short` of the reviewed worktree is clean, and `git worktree list` no longer lists my copy. No remainder.
- Kept: `reports/review-fix-whole-evidence/summary.txt`, `mut-out.txt` and `mutK.txt`.

## Unread material

- **Read whole:** `.the-way/task-cycle/review/fix.md`, the handoff, the findings file, the fix's report, every hunk of the fix diff, and the fix's two screenshots.
- **Not read, or read only in part:**
  - `.the-way/product-guidelines/template.md` and `testing/template.md`: not read; the new rows of `testing.md` follow the file's existing form, and the foundation check passes.
  - `.the-way/product-guidelines/styleguide/template.md`: not read.
  - The unchanged rest of the changed test files: not read; the hunks were read, and the files pass.
  - `.claude/skills/the-way-record-decision/SKILL.md`: not read; I judged the decision edits against the code and the foundation check.
  - The guidelines: no file read whole again in this review; I read them whole in the review of the whole change, and here only the fix's hunks.

## Searches not found or unclear

- A styleguide rule on the heading of a screen: none found (M-15 judged against Siedziba and D-280).
- A mutation that fails only the reset assertion after the revoke, not the one before the grant: not found without adding product code. Both assertions exercise the same check, so I kept M-19 as fixed.
