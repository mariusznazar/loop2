PASS 3e5018a83f709aade1302360b992996ad2984da0

# Review of the whole change — skrocic-wpisy-ponad-limit

Range: base `77a612cb81a6a5a23e622f62060c5531f48a66cc` .. head `3e5018a83f709aade1302360b992996ad2984da0`
(`git rev-parse HEAD` in the worktree gives the head; `.the-way` stands at the pinned
`bfb2e109735b5fff98802b8be0ff3c43c799262a`). Three commits: `ede71b5f` (point 1), `84a819c8`
(points 2, 3, 5, 6), `3e5018a8` (point 4). No plan, no slices: no blocking finding to attribute.

## Findings

### Critical

none

### Important

none

### Minor

1. **`foundations/decisions.md:619` — D-115 *Relations* lose D-112 instead of naming both
   (within the task).** The change replaces `derives from D-112` by `derives from D-435` in D-115.
   D-115's binding sentence says the Store "validates stored session identity and cookie metadata
   before library hydration"; the stored session row it validates — "identifier, account foreign
   key, serialized library data and absolute expiry" — is defined by the second paragraph of D-112,
   which stays in D-112, while the touch and expiry rules it adapts moved to D-435. Point 6 of the
   task gives two outcomes for such a reference: a general reference stays at D-112, one that rests
   on sentences of two entries names both. Replacing does neither, and is inconsistent with the
   author's own handling of D-410 (`foundations/decisions.md:2977`, D-112 kept and D-435 added).
   Consequence: a reader or agent following D-115's *Relations* (the template's readers: collision
   between decisions, the search of the foundation) no longer reaches the decision that defines the
   session row. Defensible reading on the other side: the task itself moved the invariant
   `account-session-storage` (derived from D-115) from D-112 to D-435, so the author followed that
   analogy. Fix: `derives from D-28 · derives from D-107 · derives from D-112 · derives from D-435`.
   Evidence: `git diff ede71b5f..84a819c8 -- foundations/decisions.md`, hunk `@@ -619 +619 @@`.
2. **`tests/view/away-report.test.mjs:99-100`, `:111-112`, `:124-125`, `tests/sim/loop.test.mjs:1134-1135`
   and others — a rewritten quotation now repeats its neighbour (outside the task).** Where an old
   comment quoted only the tail `Teraz to pokolenie {n}.”` (or another tail after an inner full
   stop) next to a comment that already quoted the start of the same sentence, the rewritten line
   now quotes that same start and runs further, so the shorter neighbour says nothing the new line
   does not. My script over the 55 changed hunks of `3e5018a8` found 29 changed lines whose
   quotation extends an adjacent `decision:` line of the same decision. Consequence: redundant,
   very long comment lines in the tests; no check fails. The task's point 4 asks to rewrite those
   63 lines and keep each one line, and says nothing of the neighbours, so removing the shorter
   neighbours is beyond this task; noted for a later cleanup.
3. **`src/server/account-backup.ts:21` — a comment line of 85 columns (within the task).** The
   reference became `(D-112, D-436)` and the line was not rewrapped, while the comment around it
   wraps at 80. Prettier does not wrap comments and its check passes; polish only.
4. **Author's meaning sentence of D-435 (author report, "Foundation entries written") is narrower
   than the entry (within the task; not in the files).** "each write to the account database reads
   the block, version, revision, role or link state it depends on inside its own transaction, and
   expired sessions and emailed links are pruned in bounded batches" covers what the writes read,
   but the entry's question is "read *and change*": blocking and a password reset delete the
   account's sessions and mark its links in that transaction, a session write for a blocked account
   or for a replaced password hash stores nothing, the privilege and role writes report three
   outcomes and the role write ends no session, and blocking keeps the saves. If the sentence goes
   to the human in the request as the meaning of D-435, it under-describes what the human reads
   before the merge. A wording that matches: "Each write to the account database reads what it
   depends on — the block, the save's version and revision, the privilege, the role, whether a link
   still works — in the transaction that writes, and blocking, a password reset and the reset of the
   game change the account's sessions, links and saves in that same transaction; expired sessions
   and links are pruned at startup and periodically, and blocking keeps the saves." The D-436
   sentence matches the entry (it leaves out only the sentence of refusal and the two openings not
   bound, acceptable for a summary).

## What was checked against the task

- **Point 1 (commit `ede71b5f`, `foundations/decisions.md` only).** Script `count.py` split base and
  commit-1 text on whitespace: the token lists are identical (455 315 items each) and exactly 26
  separators changed, 25 from a space and one (D-252) from a line break to a blank line, each before
  the opening the task's table gives, in the 19 entries and no other. Every binding paragraph of
  the 19 entries was read (index of my selection); each break stands at a part of the entry's
  question or of another question, as the table's third column says, and none is mechanical (D-39
  keeps a three-sentence paragraph on `positive` together; D-317's last paragraph is one sentence;
  D-04's second is one 264-word sentence). Accepted on the basis of the human's answer that a
  paragraph may carry a part of the entry's own question (task, *Questions to settle*, fifth).
- **Counts by the task's definition (own script, not the-way's).** Base: 428 entries, 453
  paragraphs, the 20 entries of the task over the limit, with the same sentence-word series as the
  task's table (e.g. D-112 132, 220, 402, 50; D-316 eight sentences, 447 words). Head: 430 entries,
  487 paragraphs, **no paragraph over 3 sentences or 300 words and no entry over 600 words**;
  largest paragraph D-13 with 299 words (unchanged since base, outside the tables); largest entry
  D-109 with 514 words. D-112 437 words in four one-sentence paragraphs (132, 220, 50, 35); D-435 401
  words in six paragraphs (49; 72; 61; 72+54; 27+27+28; 11); D-436 162 words (119+43). All equal to
  the task's figures and the author's.
- **D-112 split (points 2, 3, 5).** Word multiset of base D-112 against head D-112 + D-435 + D-436:
  the only differences are the ones the task names — binding: eight `;` to `.` with capitals, one
  `and` gone, `above` to `of D-112`; *Rationale*: three seams `, and` / `;` to `.`, pronouns
  `their purpose` → `The purpose of emailed links`, `writes it` → `writes a saved game state`,
  `its move` → `The move of the previous save`; *Verification*: the role item split as the task
  gives, the closing items ending with full stops, the duplicated sentence "An agent compares a
  change with the part no invariant and no test holds:" and the pair moved to D-436; plus the new
  structural fields. Read side by side: D-112 keeps exactly the first and second sentences of the
  first paragraph (broken before "Accounts have…" and "The version is read…"), the restore
  paragraph, *Based on* without `express-session-regenerated-session-saved-again`, unchanged
  *Relations* and *Scope*, *Verification* `invariants: account-database-schema` and the tests
  items the task leaves; D-435 has the nine sentences in the six paragraphs of the task's table,
  the question, *Scope* `account-server`, *Based on*, *Relations* (D-101, D-107, D-112, D-138, D-155,
  D-161, D-399, D-400), the three invariants and items 4–9 plus the two role items, no pair, the
  *Rationale* pieces and *Rejected* items the task lists, in base order; D-436 has the paragraph with
  "Beyond the rules of D-112,", *Scope* `account-server, deployment`, *Based on* `none`, *Relations*
  `derives from D-112`, no `invariants:`, the last tests item, the sentence and the pair, two
  *Rationale* sentences and three *Rejected* items. Both stand at the end of the section "Account
  server: access, security and blocked accounts"; D-435 and D-436 were the next free numbers (no
  entry, not in the withdrawn list).
- **Invariants.** `account-session-storage`, `password-reset-link`, `password-reset-ends-sessions`
  derive from D-435 in place of D-112 (`foundations/invariants.md:804`, `:1104`, `:1114`);
  `account-database-schema` stays on D-112 (`:794`); each read whole and agrees with the entry that
  names it.
- **Point 6, references.** `git grep -n "D-112"` outside `.the-way` at head, each read in context:
  every remaining reference rests on a sentence, a *Rationale* sentence, a *Rejected* item or a
  `tests:` item that stays in D-112 (schema version refusal — D-15 `decisions.md:1850`, `:1865`;
  busy timeout — D-236 `:2556`, D-430, `database.ts:319`, `account-storage.test.mjs:3187`; "no
  transaction spans asynchronous hashing" — D-226 *Rejected* `:3720`; saved game state out of the
  login row — D-399 *Rejected* `:4244`; the role column and version 6 — `account-storage.test.mjs:198`,
  `:1207`; the owner list `tests:` item — `database.ts:900`; opening before readiness and the
  backup's connection — `account_container_support.py:175`, `test_account_storage.py:2`,
  `account-backup.test.mjs:19`) or names both where it rests on both (`account-backup.ts:21`,
  `coding-database-access.md:21`, `testing.md:159`, D-410). The references moved to D-435 (D-100,
  D-226 binding and *Relations*, guidelines, `account-routes.ts`, `database.ts:193`, `:202`,
  `session-store.ts:109`) and to D-436 (D-430 three times, `testing.md:183`, the three operator
  commands, `database.ts:213`, the four fault headers) each rest on a sentence now in that entry.
  The one exception is Minor finding 1. D-114 *Relations* (author's concern 3) stays on D-112
  correctly: D-114's binding sentence rests on the connection and the schema initialization of
  D-112, and the cleanup timer in its own *Verification* is its "connection disposal"; a relation
  to D-435 would be optional, not required by point 6.
- **The 39 `decision: D-112` lines.** 16 stay on D-112 (9 + 1 "Accounts have an opaque random
  primary identifier…", 4 "The account server opens…", 2 "The version is read…"); 5 became
  `D-436 "Beyond the rules of D-112, …"`; 18 went to D-435, with one more line for the test that
  holds two sentences. I read the title (and for the http cases the fault comment) of each of the
  18 tests: the author's assignment is right in every case — `account-storage.test.mjs` 1354, 1571,
  1616, 1638 (saves) → "Writing a saved game state…"; 1429 → that and "Blocking keeps…"; 1662, 1687,
  1713 (reset of the game) → "The reset of the game…"; 1774 (blocking, unblocking, granting and
  revoking leave the previous save) → "Blocking keeps…"; 1804 (privilege write outcomes) →
  "Granting and revoking…"; 2148, 2200, 2533, 3608 (block and link stopping, recording a link) →
  "Blocking an account sets its state"; 2460, 3068 (cleanup) → "Expired sessions…";
  `http.test.mjs:4152` ("a block committed between the session check and the write") → "Writing…";
  `:4516` ("… and the reset") → "The reset of the game…". No test of the 18 holds sentences 3, 7
  or 8.
- **Point 4, 63 comments (commit `3e5018a8`, tests only).** Script `quotes.py`: 63 removed and 63
  added `decision:` lines, D-96 7, D-157 14, D-222 2, D-225 5, D-246 34, D-287 1, eleven distinct
  old quotations — as the task's table. Each new quotation is a prefix of a sentence of the entry
  (begins at the true start) and ends with the old quotation (ends where it ended); each stays one
  line. The four D-246 lines whose old quotation stood in two sentences: `away-report.test.mjs:100`
  (a stop in a catch-up, "po 7 min") → "After being away the player reads a report…";
  `away-report.test.mjs:112`, `:125` and `loop.test.mjs:1135` (stops in the open game) → "An earning
  loop a death stops in the open game…" — each matches its test's asserted text.
- **Acceptance: no `decision:` line begins after a full stop inside quotation marks.** Over all
  4 041 `decision:` lines of tracked files not ending in `.md`, with a sentence start computed by the
  task's rule (a full stop inside `"…"`, `“…”`, `„…”` ends no sentence): 0 quotations that do not
  begin a sentence, 0 that run past the end of their sentence.
- **Trust boundary `src/server/**` (account-server).** Every changed line of `src/`, and of
  `tests/`, is a `//` comment (count of changed non-comment lines: 0); the word diff of `src/`
  changes only decision numbers: `D-112` → `D-436` four times (`account-block.ts:23`,
  `account-previous-save.ts:22`, `account-role.ts:22`, `database.ts:213`), → `D-435` five times
  (`account-routes.ts:217`, `:498`, `database.ts:193`, `:202`, `session-store.ts:109`), → `D-112,
  D-436` once (`account-backup.ts:21`). No code, literal, import or behaviour changed.
- **Commit structure.** Point 1 alone in `ede71b5f` (only `foundations/decisions.md`), points 2, 3,
  5, 6 in `84a819c8`, point 4 alone in `3e5018a8` (only the 11 test files), as the acceptance
  criterion asks. Author address `mariusznn@gmail.com` on all three.
- **Not checkable in the commits:** the request's text (full old and new wording of D-112, D-435,
  D-436; the statement that no measurement by the-way's script was made) — the cycle's later step.

## Changed invariant tests

No test code changed. Tests whose `decision:` comment lines changed and that carry `invariant:`
lines (found by a script around each changed hunk): in `tests/account-storage.test.mjs`
`account-message-limits`, `account-save-sqlite-store`, `email-confirmation-link`,
`previous-save-slot`, `unblock-restores-no-link`, `unblock-restores-no-session`; in
`tests/http.test.mjs` `blocked-account-access`, `password-reset-link`, `previous-save-slot`,
`unblock-restores-no-link`; in `tests/sim/catch-up.test.mjs` `catch-up-death-moment`,
`catch-up-minutes`, `trip-run-end`, `trip-transfer`. Only the comment lines changed.

## Structure of the code the change leaves

`python -B .the-way/task-cycle/change_file_sizes.py 77a612cb… 3e5018a8` (exit 0): 27 files, +92
lines, of which +91 in `foundations/decisions.md`, +1 in `tests/account-storage.test.mjs` (the
second comment line of the test at 1429); every code file +0. The size rule's script
`node tests/quality/eslint-size-rules.mjs` in worktrees of the base and of the head: both exit 0,
the same output, "0 functions and files over a threshold in 323 files". The rule counts no
comments (`skipComments: true`), and only comments changed. No growth, no orphaned code, no name
made false.

## Declined to judge

- D-13 at 299 words in one paragraph, one word under the limit — unchanged since the base and not in
  the task's tables; the task's acceptance criterion reports only entries over the limit, so nothing
  to do here (outside the task).
- Whether D-435's *Scope* should also name `deployment` (its sentences on the privilege and role
  writes concern the operator's commands) — the task gives `account-server` and the entry follows it
  (outside the task).
- The order of *Relations* of D-410 (`… D-112 · D-435 · D-137 …`, not by number) — no rule of the
  template orders them (outside the task).
- The lower-case first item of *Rejected* in D-435 and D-436 — the log has other entries whose
  *Rejected* begins in lower case (D-226, D-410); no reader is misled.

## Checks run

| Check | Command | Exit / result |
|---|---|---|
| foundation check, test citations included | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` (no `listed:` lines of error) |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0: 0 error, 146 warn, 7 info; the same run in a base worktree: 0 error, 163 warn; no warning of the head is missing from the base (the extra base warnings are dead paths to ignored `.runs/` and `dist/` that the fresh worktree lacks) |
| Prettier on the changed `.ts` and `.mjs` files | `node node_modules/prettier/bin/prettier.cjs --check $(git diff --name-only 77a612cb..HEAD -- '*.ts' '*.mjs')` | 0, all formatted (this also parses each file, so no comment edit broke the syntax) |
| sizes of changed files | `python -B .the-way/task-cycle/change_file_sizes.py 77a612cb81a6a5a23e622f62060c5531f48a66cc 3e5018a8` | 0 |
| size rule, base and head | `node tests/quality/eslint-size-rules.mjs` in each worktree | 0 and 0, identical output |
| counting by the task's definition | own script `.runs/review-whole/count.py` (removed) | as above |
| quotations of `decision:` lines and the 63 pairs | own script `.runs/review-whole/quotes.py` (removed) | 4 041 lines, 0 bad; 63 pairs all correct |
| comment-only change of `src/` and `tests/` | `git diff -U0 77a612cb..3e5018a8 -- src tests` filtered for non-`//` changed lines; `git diff --word-diff=porcelain` | 0 non-comment lines; only decision numbers changed |

Not run: the full gate `npm test` (the orchestrator's, per handoff); no node test of a changed file
was run singly — only comment lines changed, Prettier parsed every changed file, and the
foundation check reads every changed `decision:` line.

## Reach beyond the dispatch

- `.the-way/elements/decisions/template.md`, whole — to judge D-435 and D-436 against the entry form
  (named in the task's *Context*).
- `.the-way/elements/common/foundation_check.py`, lines 150–175 and 790–860 — how the pinned check
  parses `decision:` lines and where a quotation may begin, to build my own check by the task's rule.
- `tests/quality/eslint-size-rules.mjs` (search) and `tests/quality/test_function_and_file_size.py`
  lines 1–40 — what the size rule counts.
- `src/server/database.ts` prune functions (search) — whether sessions are pruned in bounded batches,
  for the author's meaning sentence.
- Titles and comments of the 18 tests of point 6 and of the four D-246 tests — to confirm the
  sentence each holds.

## Working copies

All under `.runs/review-whole/` of the task's worktree:
- a worktree of the base `77a612cb` at `.runs/review-whole/base-wt` and one of the head `3e5018a8`
  at `.runs/review-whole/head-wt`, each with `.the-way` initialized at the pinned commit and a
  directory junction `node_modules` pointing at the task worktree's `node_modules`; the junctions
  were removed first, then each worktree with `git worktree remove --force`, then `git worktree
  prune`;
- scripts `count.py`, `count_lib.py`, `quotes.py`, `dups.py`, `inv.py`, the decision index
  `index.md` and `sections.md`, copies of the decision log at base, commit 1 and head, diffs and
  outputs — all removed with the directory.

Where a removal failed, it is named under "Remainder" below.

Remainder: none.

## Unread material

**Decisions of the index of my selection read whole: 9** — D-112 (at the base and at the head),
D-435, D-436, D-137 (at the base), D-114, D-115, D-226, D-410, D-430. The index
(`--section "Account server: access, security and blocked accounts"`, `--part account-server`,
`--part deployment`, `--part product-foundation`, and `--decision` for the 20 changed entries,
D-157, D-222, D-225, D-287, D-101, D-107, D-138, D-155, D-161, D-399, D-400, D-100, D-15, D-236,
D-114, D-115, D-226, D-410, D-430, D-435, D-436) listed 54 in full and 87 by heading; I read the
binding sentences of all 54 in it and ran through the 87 questions, none of which bears on a change
of paragraphing, of a split by sentences, or of decision numbers in comments.

Read in part:
- The 19 entries of point 1 (D-04, D-39, D-40, D-44, D-96, D-147, D-173, D-246, D-252, D-271, D-280,
  D-311, D-313, D-316, D-317, D-322, D-356, D-368, D-416): binding sentences whole, at base, commit 1
  and head; *Scope*, *Relations*, the start of *Verification* and of *Rationale*; *Rejected* and
  the pairs not read. The commit changes no token outside the 26 breaks, shown by script, so nothing
  in the unread fields changed.
- D-157, D-222, D-225, D-287, D-101, D-107, D-138, D-155, D-161, D-399, D-400, D-100, D-15, D-236:
  binding sentences (index) and, for D-15, D-236, D-399, D-100, the passages that name D-112 or
  D-435; fields, *Rationale* and *Rejected* not read.
- Invariants: read whole `account-database-schema`, `account-session-storage`,
  `password-reset-link`, `password-reset-ends-sessions`, `function-and-file-size`; the other
  invariants whose *Part* names a touched part (account-server, browser-view, simulation,
  agent-workflow, product-foundation, deployment) not read — the change alters no behaviour any of
  them states and no test code they cite.
- Part map: read whole, so the entries of `product-foundation`, `account-server`, `deployment`,
  `browser-view`, `simulation` and `agent-workflow` are read.
- Glossary of the product and of the-way: not read; the change adds no term.
- Guidelines read whole: `guidelines/coding.md`, `guidelines/testing.md`,
  `guidelines/coding-database-access.md`, `guidelines/coding-session-store.md`,
  `guidelines/coding-http-application.md`. Not read: `guidelines/styleguide-browser-view.md`,
  `coding-browser-module.md`, `coding-browser-api-client.md`, `coding-simulation-module.md`,
  `coding-saved-game.md`, `coding-content-data.md`, `coding-account-policy.md`,
  `coding-mail-sending.md`, `coding-password-hashing.md` — the change touches no user interface and
  no code of those kinds, only comment lines in tests of `browser-view` and `simulation` and
  comments in `src/server` files of the kinds read.
- `.the-way/project-level/technology/reserved_choices.md`: not read; the change settles no
  technology.

## Searches not found or unclear

- The task's point 6 rule for a *Relations* reference (general → stays; resting on two → both) does
  not say how to read a `derives from` relation, which never points to a sentence; the author read
  it by the sentences the deriving entry rests on, and I judged by that reading (Minor finding 1).
- The author reports `src/server/account-backup.ts:21` as 83 columns; it measures 85.
