PASS 12ff2bcb

# Review of slice 39, range 8809f16e..12ff2bcb

`git rev-parse HEAD` in the worktree: `12ff2bcb142f22bac2148ec8210d9dc2f613b1ee`, the head given. `git log 8809f16e..12ff2bcb`: one commit. `git diff --stat`: one file, `src/server/account-routes.ts`, +3 -2. Everything below was read from commits (`git show`, `git diff`), not from the working tree.

## Verdict on the trust boundary

The file is comment-only changed, and crafted input at the boundary is handled exactly as before.

- Whole diff (5 lines, all inside `//` comments):
  - line 351: `(spec decision 2)` becomes `(D-222)`.
  - lines 472-473: `(spec decision 1).` becomes `(D-104 for the guards, the fields and the size, D-112 and D-210 for the write).`
- Byte comparison (method: `git show` of the file at both commits into scratch files, then `grep -v '^\s*//'` on each, then `cmp`): the two comment-stripped files are byte-identical (753 lines each, `cmp` exit 0). Neither file has a CR byte, a `/* */` block or a trailing `//` comment on a code line (`grep` on the stripped file for `//` printed nothing). So every code token, string and whitespace outside the two comments is unchanged, and the comment lines differ only in their text. TypeScript drops comments, so the compiled behaviour is the same: a request body, a header or a link token reaches the same code as before.
- The guards (`mutationGuards` for the `PUT` of the saved game and for the posts), `saveFields`, `sessionAccount`, the size check and `writeSavedGame` are code outside the comments and did not change.

## Findings

### Critical
none

### Important
none

### Minor (within the task)

1. `src/server/account-routes.ts:472-473` (comment over `router.put(paths.savedGame, ...)`): the comment says the write "checks the block, the version and the revision" and cites D-112 and D-210 for it. The rule for the revision (a save is accepted only when it names the stored revision as its basis, else a 409 `save-conflict`) is D-209, which the comment does not name. D-112 does state that the write reads the stored revision and refuses when "D-209 or D-210 refuses the save", so the citation is true and a reader reaches D-209 through D-112. The citation is just one step more indirect than it needs to be. Evidence: D-209 (`foundations/decisions.md`, `### D-209`) is the decision whose first paragraph defines the basis and the revision. Suggested wording if wanted: `D-112 for the write, D-209 and D-210 for the version and the revision`. Not blocking: nothing the comment claims is false.

### Out of scope (a line the slice did not touch)

2. `src/server/account-routes.ts:355-356` (the same comment as line 351, unchanged by the slice): "a limit leaves no trace beyond the count (D-222)". D-222 says only that the link is sent "within the limits of D-105" and, in its rationale, that a request above a limit gets the same answer. The count is D-105 and D-161. The pointer was there before the slice and is a true decision number, so it points to nothing outside the foundation; it is a loose citation of a neighbouring fact. Minor, and out of scope because the slice was told to change only the two comments' pointers. The slice report says it left the old `(D-222)` on purpose.

## Cited decisions: does each state what the comment claims? (each opened whole)

- **D-222** (line 351: "Runs after the request for a link was answered ... a throw here would end the process, so it never rejects"). Yes. D-222 says the answer "leaves before any work on an account", that "only after the answer does the server record and send a link", and its Verification lists "a failure of the work after the answer that ends the process" under violates. The code below the comment (`try`/`catch` around everything, `writeFailure` in the `catch`) does what the comment says.
- **D-104** (guards, fields, size). Yes. D-104 requires Origin and media-type guards that refuse "before mutation or password work", "an object of expected fields with explicit type checks rather than coercion", and says "the server stores at most 64 KiB of each player's saved game state" and 64 KiB for the save route. The comment cites D-104 for those three things only, not for the order or for the session step, so it claims no more than D-104 says.
- **D-112** (the write). Yes. D-112: "writing a saved game state reads its account's blocked state, its stored version and its stored revision in the transaction that writes it and writes nothing when the account is blocked or D-209 or D-210 refuses the save". This matches "one write that checks the block, the version and the revision".
- **D-210** (the write, version). Yes. D-210: the server refuses a save of a lower version, "comparing that number before the basis of D-209". The code's `outdated` case answers 409 `save-outdated`.

The order in the comment (guards, fields, session, size, write) is not stated by any of the four decisions. It is the order of the code below the comment (middleware `mutationGuards`, then `saveFields`, then `sessionAccount`, then `Buffer.byteLength`, then `writeSavedGame`), and the comment states it as a fact about that code, not as a guarantee from a decision. The parenthetical cites decisions only for the individual checks, so the comment does not claim a guarantee the code does not give. Nothing in the comment claims that the session check or any order protects against something.

## The comments point to nothing outside the foundation

- All four identifiers exist in `foundations/decisions.md` at the head (D-104 at line 2055, D-112 at 2176, D-210 at 4129, D-222 at 4447).
- S1 (`git grep` of the plan's private-name pattern) on the file at the head: no line, exit 1.
- S3 (`git grep` for spec, plan, slice, round, package, task item, review finding, `docs/task-cycles`) on the file: no hit, exit 1. The two words that sat there (`spec decision`) are gone.
- `git grep -nE 'D-[0-9]+'` on the file shows only foundation decision numbers.

## Against the task (To do 5, Pytanie 1a)

The slice's goal ("the comment names the decision by its identifier, verifying that the decision states what the comment claims; no new decision unless the requirement is only in the pointed document") is met. The slice report says no new decision was needed because the four existing decisions hold the requirements; I confirmed that the four decisions state what the two comments claim. The change adds nothing nobody asked for and touches no other file. No test file, screenshot or foundation entry was changed by the commit.

## Reserved choice, guidelines, tests

- No language, framework, library, store, login or place to run is settled by the change.
- A comment-only change reaches no coding-guideline rule beyond the comment rule, which a decision number satisfies.
- No test was added or changed, which is right for a comment-only change; the existing tests protect the behaviour, and the byte comparison above is the check that the comment-only claim holds.

## Declined to judge

- The wording quality of the rest of the file's comments (they are not in the slice).
- Whether the S1/S3 searches on the other files of the task come out clean (other slices).

## Checks run

A scratch clone of the repository at `12ff2bcb` (`git clone --no-checkout` into the scratchpad, then `git checkout 12ff2bcb`), with the worktree's `node_modules` junctioned in and the junction removed afterwards; the reviewed worktree, its index and its branch were not touched.

- `git show 8809f16e:src/server/account-routes.ts` and `git show 12ff2bcb:src/server/account-routes.ts` to scratch files, `grep -v '^\s*//'` on each, `cmp` of the two results: exit 0 (identical, 753 lines each). Before stripping, `cmp` of the full files shows a difference at line 351 only as the first one, and the diff shows exactly 5 lines.
- `grep -n '//'` on the stripped head file: no output (no trailing comments); `grep -c '/\*'` on the head file: 0; `grep -c $'\r'` on both: 0.
- `npm test -- tests/account-api.test.mjs` in the scratch clone at the head: exit 0, 25 pass, 0 fail.
- `npm test -- tests/http.test.mjs` in the scratch clone at the head: exit 0, 89 pass, 0 fail.
- S1 and S3 `git grep` on the file at the head: exit 1 each (no line).
- Not run: eslint, prettier, `foundation_check.py` (the executor's report claims exit 0 for each; for a comment-only change confirmed byte-identical they cannot differ in code, but I did not repeat them: unverified by me). The full `npm test` is the cycle's run, not repeated.

## Reach beyond the dispatch

- `foundations/decisions.md` at `12ff2bcb` (via `git show`), D-104, D-112, D-210, D-222 each read whole as the handoff asked; D-209 whole (to judge finding 1); D-105 the first paragraph, Relations and Verification (to judge finding 2). Reason: the comments cite the first four, and D-209 and D-105 are the decisions the findings point at.
- The code of the `PUT /api/saved-game` handler and `sendResetMessage` (from `git show` of the file at the head), to judge whether each comment's claims about order and about "never rejects" hold.

## Unread material

none of the handoff's list: the handoff, `.the-way/task-cycle/review/SKILL.md` (whole), the plan's `### Slice 39` section, the slice report, and the four named decisions (whole) were read. Not read: `task.md` lines for To do 5 and Pytanie 1a beyond the slice's own quotation of them in the plan (the plan's Goal restates them); I judged the slice against that restatement and the handoff.

## Searches not found or unclear

none
