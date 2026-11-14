# Handoff — reviewer of the whole change

You review, as an agent that made none of it, the whole change of one task of the loop2 repository, in a task cycle run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human.

- Worktree (work from its root, read-only: change no tracked file, make no commit): `the task's worktree`, branch `task/programy-ze-starych-zapisow`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`, the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`), variant "the whole change"; read `.the-way/task-cycle/review/whole_change.md` where the variant names it. You select your own foundation entries and guidelines by the parts of the change, as `.the-way/elements/common/way_of_working.md` "Reading the foundation" and `.the-way/product-guidelines/reading.md` give; state in your report how many decisions you read whole and how many by title only.
- Range: from the task's base `6f237fb8ce26450706d8738d3d3a07298e8ec110` to the head `7adcc0bbcd683e7f633cd1f37edbb570fb451251` (38 files changed). Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/whole-change-reviewer-report.md`; the first line `PASS 7adcc0bb` or `FAIL 7adcc0bb`.
- Frozen task, read whole: `docs/task-cycles/programy-ze-starych-zapisow/task.md`. Reviewed spec, read whole: `docs/task-cycles/programy-ze-starych-zapisow/spec.md` (its last section *Decisions (settled by the orchestrator after the review of the spec)* binds; `spec-reviewed.md` beside it is the superseded first attempt: do not use it). Plan, read whole: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`.
- Check in particular: coverage of every item of the task's *To do* 1-6, of each row of *Settlements to record* 1-5 and of each *Decisions in play* entry; source fidelity (nothing added that the task and spec do not carry, no sentence of them dropped); that the decisions and invariants written by the foundation entries (E1-E24 of the plan) match the code; that `D-209` and `D-213` stayed unchanged as the task and spec say; the foundation's part-map entries against the files; the guidelines' rows; the real behaviour of the three user-visible flows (the privileged account's pull button on the screen Programy, the reset control with its confirmation and the new game after it, the operator command) — run the game yourself in a browser if you can (the project skill `loop2-play`, `.claude/skills/loop2-play/SKILL.md`) with a made-up account and the command granting the privilege, and report what you saw; screenshots go only where decision D-357 says, never into the repository.
- Trust boundary: yes — `src/server/**`, `src/browser/sim/saved-game.ts` and the new `src/browser/sim/previous-programs.ts`; check crafted input at them (a document of another shape, an oversized document, a program of a hostile shape, a request of an account without the privilege or with a revoked one, a replayed reset, two cards of one account). Irreversible operation: no — the schema step only adds, the upgrade of an existing database is tested, granting the privilege is a human's command the cycle only prepares; check that the change only prepares it.
- The process pin was not moved by this task; no check carried from a move.
- You do not run the product's gate (`npm test` without a file) and not `foundation_check.py` beyond one run you judge useful; the orchestrator runs the gate at step 10. Focused checks you run carry their command and exit code in your report.

## The slices, their ranges and whether each had a review of its own

| Slice | Range | Review of its own |
|---|---|---|
| Foundation entries (plan's *Foundation entries*) | `6f237fb8..809fbf6b` | covered by slice 1's review (its range started at the base) |
| 1 — database | `809fbf6b..4e1decb2` (executor `896b7509`, fix `4e1decb2`) | yes: `FAIL 896b7509`, fix reviewed `PASS 4e1decb2` — `reports/slice-1-reviewer-report.md`, `reports/slice-1-fix-review-report.md` |
| 2 — routes | `4e1decb2..41d80c2e` | yes: `PASS 41d80c2e` — `reports/slice-2-reviewer-report.md` |
| 3 — operator command | `41d80c2e..d946a58b` | yes: `PASS d946a58b` — `reports/slice-3-reviewer-report.md` |
| 4 — deploy skill text | `d946a58b..b3db0acf` | none: judged by you; executor's report `reports/slice-4-executor-report.md` |
| 5 — browser client | `b3db0acf..19ea8b1c` | none: judged by you; `reports/slice-5-executor-report.md` |
| 6 — reader and append | `19ea8b1c..ea8de2c2` (executor `6a9283c4`, fix `ea8de2c2`) | yes: `FAIL 6a9283c4`, fix reviewed `PASS ea8de2c2` — `reports/slice-6-reviewer-report.md`, `reports/slice-6-fix-review-report.md` |
| 7 — the pull on Programy | `ea8de2c2..72a395c7` | none: judged by you; `reports/slice-7-executor-report.md` |
| 8 — the reset control | `72a395c7..8cac0a43` | none: judged by you; `reports/slice-8-executor-report.md` |
| 9 — the page's reset flow | `8cac0a43..7adcc0bb` | none: judged by you; `reports/slice-9-executor-report.md` |

The report of the agent that wrote the foundation entries: `reports/foundation-entries-report.md`.

## Mismatches the mechanical checks passed on (for the slices with no review of their own)

- Slice 5: `tests/view/account-screen.test.mjs` changed outside the slice's *Change* (two `Account` fixtures gained `previousSaveAllowed: false`; no assertion changed).
- Slice 7: a new file `src/browser/view/previous-save-lines.ts` outside the plan's *Change* (the sentences and the Polish plural); `src/browser/styles.css` unchanged; the plan had avoided a new view file because `guidelines/coding-browser-module.md` may need a row for one — judge it.
- Slice 8: `src/browser/view/previous-save-lines.ts` gained two exported sentences; small test-helper additions the report lists.
- Slice 4: the executor's two questions answered by the orchestrator: `references/setup_and_secrets.md` lines 325-336 hold a "merge nothing else" window for the version 4 deployment and none for version 5 (left as is: judge whether the omission contradicts the skill's text); the skill's frontmatter `description` does not name the new command (the 400-character limit of the test).
- Slice 9 edge cases the executor reports and no test or guard covers: a reset that succeeds while a logout still waits for its save leaves that logout hanging (the player presses „Wyloguj” again); a logout's failed request after a successful reset could reload the new game on a conflict. Judge their grade.
- The orchestrator's choices (autonomous, in the cycle record; not the human's approval): D-209 unchanged with the narrow price (restart at 1); the reader in its own file `src/browser/sim/previous-programs.ts` with strict items; no finishing save before a reset; the older tab after a reset accepted as a price; the reset control on the screen Programy beside the pull control.

## Minor findings of the slice reviews, in the reviewers' words (these are listed, not yet fixed; you grade them again and decide which your report lists as Minor within the task)

### Slice 1 (`reports/slice-1-reviewer-report.md`)

**M1. A comment in the new test claims a coverage the test does not have: the order "block, then privilege" of the reset is not tested.**

- Place: `tests/account-storage.test.mjs`, the case "a reset moves nothing without the privilege, for a blocked account, and with no current save", the comment "The block is read before the privilege: a blocked account without the privilege answers blocked." followed by `database.setPreviousSavePrivilege("player@example.test", true)` and only then the reset.
- What is wrong: the account in that step is blocked and privileged, so it answers `blocked` whatever the order. A blocked account without the privilege never calls the reset.
- Evidence: M4, swapping the two `if`s in `resetSavedGame` so the privilege is read first, leaves the file green (exit 0, 0 failing).
- Why Minor: the plan lists the order of reads ("it reads the block, then the privilege, then the current save") but only a blocked, unprivileged account can tell the orders apart, and for that account nothing moves either way; slice 2 maps the outcomes to 401 and 403, where the order would show, but the session of a blocked account is already deleted by the block. Either test the case (block the account, never grant) or drop the sentence.

**M2. The reset's "nothing to move" is tested only with an empty slot.**

- Place: same case, the account `empty@example.test`.
- What is wrong: it has no previous save either, so a reset with no current save that wrongly emptied or overwrote an existing slot would not show. The spec's decision 3 ("Nothing else moves") and D-396 ("changes nothing when … holds no saved game state") are about exactly that: a slot that already holds a document must survive a reset that moves nothing.
- Why Minor: the code does not do it (`resetSavedGame` returns before touching the slot); only the protection is thin. A cheap addition: reset once, then reset again, and check that the slot still holds the first document (the existing case "a reset replaces the previous save …" has the first half of that sequence).

### Slice 2 (`reports/slice-2-reviewer-report.md`)

**M1. The order "empty-object check before the session" is not pinned by a test.**
`src/server/account-routes.ts:574-583` (the reset handler). The spec's order is guards, empty-object body, session, database write. The code does this. No test sends a field without a session, so a handler that checked the session first would pass every test. I did not run that swap; I reasoned from the test list: the 401 case sends only `{}`, and the 400 cases all carry a valid session. Effect if wrong: an unauthenticated caller with a field would get 401 instead of 400. Both are refusals and nothing leaks or changes, so this is coverage only. Place: `tests/http.test.mjs` cases "no session, a forged..." and "a reset with any field...".

**M2. The executor's report misdescribes what a vanished account does on the reset.**
The report says the `Unknown account` throw of `resetSavedGame` reaches "Express's default error answer". It does not. `src/server/app.ts:93-127` installs an error handler that writes a failure line (`writeFailure("request", "app.errors", ...)`) and answers JSON 500 `{"error":"Account service failed"}` with `Cache-Control: no-store`, the same answer the save route gives for a thrown `writeSavedGame`. So the route answers a JSON failure as the save route does, and the choice not to catch is right. No test drives that path for the reset (nor for the save route); `grep` of `tests/*.mjs` finds `Unknown account` only in `tests/account-storage.test.mjs:1011`. The path is also unreachable in practice: `src/` holds no `DELETE FROM accounts`, and a session row cascades with its account, so a session of a vanished account is found as none and the route answers 401 before the write. Effect: a wrong sentence in a report, no defect in the code.

**M3. The Trust-boundaries row of `src/server/` in `guidelines/testing.md:172` names six of the seven new HTTP-level case titles.**
The case "the reset moves the save to the previous slot and answers 204, a second reset changes nothing, and a card on another revision then gets the conflict" (`tests/http.test.mjs`) is not listed. It carries the `previous-save-slot` marker and tests D-396 and the D-209 conflict after the reset, which the row's invariant text covers only through the other cases. The handoff says the row carries "the case titles written here"; the plan's list was not given to me beyond the handoff's passage, which names that case among the tests. Effect: a reader of the row does not find the test of the move itself. Cheap to add.

**M4. The invariant list and the decision list of the Trust-boundaries section gained identifiers beyond the rows the plan names** (`guidelines/testing.md:152-153`: `D-393 · D-394 · D-395 · D-396` and `previous-save-slot`). The handoff asks me to judge it. I judge it fine: both lists are the section's index of what its rows test, `previous-save-slot` is exercised by the new rows and `D-393..D-396` are the decisions the new rows cite in the who-may table. It adds no rule. Graded Minor only because it goes beyond the plan's named edit; I would keep it.

### Slice 3 (`reports/slice-3-reviewer-report.md`)

1. `guidelines/coding.md:131` and `:146` (not blocking). The two edited lines were extended in place and are now much longer than the paragraphs around them, which are hard-wrapped at about 80 columns (line 131 about 108 characters, line 146 about 110). The content is correct (the command is named beside `account-block` and `account-backup` in both places of *Recording a failure*, and the two events are listed in *Logging scope*, `:233-234`). A reflow would keep the file's shape. No effect on a reader.
2. `src/server/account-previous-save.ts:61-65` (not blocking; equivalent mutant). Removing `database.close()` is not caught by any test (mutant `noclose`: 0 failures). The process exits right after, so the connection closes with it; the block command has the same property. Nothing to fix here.

### Slice 6 (`reports/slice-6-reviewer-report.md`)

**M1. Non-plain objects and `undefined` are not tested although the spec says "plain object".** Survivors / no-coverage at `previous-programs.ts:23:7` (`typeof value !== "object"` dropped), `:26:10` (`return true`), `:26:44` (two no-coverage mutants: the null-prototype path). My probe shows the real code is right for `undefined`, `Object.create(null)`, a `Map`, a class instance as document or item (all handled, none throws). With `typeof ... !== "object"` dropped, `undefined` as an item would throw in `Object.getPrototypeOf`; no test passes `undefined` or a non-plain object. These are not JSON values, so no harm today; a test row each would pin the rule.

**M2. Defence in depth that no test reaches (equivalent for JSON values).** Survivors at `:47:32` (list prototype), `:49:7` (key count of the list), `:53:9` (accessor element), `:62:5` (`typeof value === "number"`), `:87:7` and the no-coverage `:87:24`, `:87:32` (own `program` key missing after the key check). For a JSON document each is either shadowed by another check (a hole is caught by `:49` or by `:53`, whichever stands; `Number.isSafeInteger` refuses a non-number) or unreachable (a getter or a subclassed array is no JSON value). Class: equivalent for documents the page can hand over; I would keep them.

**M3. The sweep of crafted values has no deep or large list.** The handoff asks for "deep or large lists". `HOSTILE_VALUES` has none. I ran both by hand: a 5000-deep object as a program gives a skip, a 200000-item list reads (`probe.mjs`), no throw. The code needs no change; a test would only record it.

**M4. `guidelines/coding-simulation-module.md:25` is a ragged table row.** The new row `| src/browser/sim/previous-programs.ts | copy     | —        |` does not align with the columns of the others. Cosmetic; the file is Markdown and no check reads it.

**M5. The skipped name is shown trimmed, and a name of spaces is named by place.** The spec says "its name where that is a non-empty text, else its place". A name of spaces is a non-empty text in the literal reading; the executor reads "non-empty" as non-empty after trimming, which agrees with D-395 ("its name is not empty after trimming") and gives a readable sentence. Judged acceptable, no finding; the orchestrator may want the spec's word aligned to D-395.

## Report

Write the full report to the report path by the method's form. Return its first line, the changed files with their added and removed line counts, the report path, your questions, the reach beyond this handoff, **Unread material** (what you selected and left unread or read in part) and **Searches not found or unclear** (each `none` where that is the answer), and the checks you ran with commands and exit codes.
