PASS 60c799efb7722021af3c991efbcd5289c4a14ea8

# Review of Slice 4 — the server refuses a mail password file that decodes to an empty password

Range reviewed: `e04ac0e338c42b31260be7363aee666cbc09e5e8..60c799e` (one commit, `60c799e`). `git rev-parse HEAD` in the worktree showed `60c799efb7722021af3c991efbcd5289c4a14ea8`, so the range is the one given. Two files changed: `src/server/configuration.ts` (+4 -3) and `tests/startup.test.mjs` (+9). No file of `foundations/` or `guidelines/` is in the range, and no screenshot.

## Findings

### Blocking (Critical / Important)

None.

### Minor

None within the task.

### Out of scope (stated in their own words; none blocks)

1. **Out of scope, Minor.** `guidelines/testing.md`, "Trust boundaries" table, row `src/server/`, and the `Decision:` / `Invariant:` lists of that rule name neither D-111 nor `account-startup-configuration` nor the startup refusal of the mail password file. The executor noted the same. The test that guards the boundary carries the invariant marker `// invariant: account-startup-configuration` (`tests/startup.test.mjs:392`), so the boundary is covered as written; the row is a guideline wording matter that no passage of the task names for this slice. Effect on the code: none.
2. **Out of scope, observation (not graded as a defect).** A file of two byte-order marks (`EF BB BF EF BB BF`) decodes to the single character U+FEFF and is accepted (password of one invisible character); two marks and `abc` give U+FEFF + `abc`. This is unchanged from base (I ran both) and D-111 as written ("decodes to a nonempty password with no control character") allows it, because U+FEFF is a format character, not a control character. Whether the rule should also refuse it is a decision for the human; the slice's Goal says every other file keeps its present result.

## Judgement against the task, the foundation and the guidelines

- **Task item 29 / question 3, answer A / settlement row 2.** The code refuses, at startup, a password file whose decoded text is empty. `src/server/configuration.ts:133` now reads `if (password === "" || controlCharacter.test(password)) throw new Error();` after the `fatal: true` decode. The `catch` at `:138-139` still rethrows `invalid("LOOP2_SMTP_PASSWORD_FILE", error)`, so the message names the setting and never the file's content (the cause holds only the original error, as before). Nothing was added that nobody asked for; the one comment change (`:110-112`) states the rule.
- **D-111, current text (commit `0202a50`).** "the password file a regular file of at most 1 KiB of UTF-8 that decodes to a nonempty password with no control character, so an empty file, a file of only a byte-order mark and a trailing newline are refused, read once": the code does what the entry says, for each listed case, and the Rejected line ("refusing a password file only at zero bytes") is the shape the code had before. No restatement difference between the entry and the code found. The decision is not weakened by the choice of check: a byte-length check that counts the mark would have refused "mark + text", which D-111 does not refuse; the post-decode check is the right place.
- **D-13 / D-153.** Read whole; neither states a rule about the content of the password file beyond its path, owner and mode. Not reached by the change.
- **Invariant `account-startup-configuration`.** "exits nonzero before listening or printing readiness" for partial or invalid explicit settings: still met, and now also for a mark-only file. The case that carries it is a changed invariant test: **`tests/startup.test.mjs`, the case "the SMTP password file must be a small non-empty UTF-8 regular file without control characters and is refused without echoing its contents"** — named here as the report form requires. The changes only add: two fixtures to the invalid list (`:400` mark alone, `:401` mark and LF) and an acceptance check for mark + text (`:431-437`). No assertion was weakened, loosened, skipped or removed (guideline "Changing an existing test").
- **Part map, account-server.** The files lie under `src/server/**` and `tests/startup.test.mjs`, both in the part's Files list; the trust boundary is `src/server/**`, checked below.
- **Coding guidelines.** The change reaches no rule with an invariant other than the linter and formatter rules (`eslint-source-rules`, `prettier-source-format`), both met (checks 4 and 5 below). "Recording a failure" / "Secrets and personal data": the refusal throws `StartupFailure` through `invalid()` unchanged; no message or file content is added to it. Code and comments are in English.
- **Testing guidelines.**
  - "Where the expected value comes from": the expected results come from D-111 and the task (a mark alone is refused, a mark and text is accepted with the mark dropped, 1024 bytes is accepted), written as explicit bytes in the test; not from the code's own output.
  - "Test inputs and expected values": the fixtures are explicit byte arrays.
  - "Behaviour, not implementation": the test asserts the refusal message of the setting (an existing assertion) and the accepted password value; it does not pin the order of the checks.
  - "Trust boundaries": the refusal is checked directly with crafted files, marked with the invariant and seen failing first (check 1).
  - "Choosing the level": a smoke test in `tests/startup.test.mjs` on the real file reader and the real decoder; nothing is replaced.
- **Does the test fail when the behaviour breaks?** Yes. Base `configuration.ts` with the head test file: exit 1, 17 pass / 1 fail, `AssertionError: Missing expected rejection` in this case (check 1). Removing `password === ""` is exactly that base behaviour. A mutation that refuses any file with a mark would fail the added mark + text acceptance check at `:431-437`; a mutation that makes the check `length <= 3` would also refuse mark + text and fail the same check. The mark + LF fixture is refused by the existing control-character check, not by the new check; it pins the case the task names and passes both before and after, as the executor says.
- **Executor's report.** Its claims hold: red run before the change at the new fixture, green after, typecheck, prettier and eslint exit 0; the test case keeps its name and invariant marker; the mark + text acceptance check is a guard and not a seen-failing test; the `npm test -- <file>` form was used for `.mjs`.
- **A reserved choice** (language, framework, library, store, login, place to run): none settled by the change.
- **Own-work check.** The executor's check (mark-only fixture, red then green, plus the two acceptance checks) would catch the requirement unmet where it is weakest (the mark-only file being accepted), as the red run shows.

## Crafted input at the trust boundary (`src/server/**`)

Run against the built head (`dist/server/configuration.js` of a copy of `60c799e`) and, for comparison, against the same tree with the base `configuration.ts` (`e04ac0e`), through `readAccountConfiguration` with a full valid production environment and a different password file per row. The script is `a scratch folder outside the repository`. Every refusal message was `Invalid or unavailable account configuration: LOOP2_SMTP_PASSWORD_FILE` — the setting's name, nothing of the file's content.

| Password file | Base `e04ac0e` | Head `60c799e` |
|---|---|---|
| zero bytes | refused | refused |
| EF BB BF only | **accepted, empty password** | **refused** |
| EF BB BF + LF | refused | refused |
| EF BB BF + CRLF | refused | refused |
| EF BB BF + `abc` | accepted, `abc` | accepted, `abc` |
| EF BB BF + 1021 x (1024 bytes) | accepted | accepted |
| EF BB BF + 1022 x (1025 bytes) | refused | refused |
| 1024 bytes of `p` | accepted | accepted |
| 1025 bytes of `p` | refused | refused |
| invalid UTF-8 (`73 FF FE 73`) | refused | refused |
| EF BB BF + invalid byte | refused | refused |
| FF FE (UTF-16 mark) alone | refused | refused |
| one NUL byte | refused | refused |
| a single space | accepted | accepted |
| two marks (U+FEFF kept) / two marks + `abc` | accepted | accepted (unchanged; see Out of scope 2) |
| a directory | refused | refused |
| a missing path | refused | refused |

The only row that differs between base and head is the mark-only file, as the slice's Goal states. A FIFO or device file (non-regular, not a directory) could not be tried on this Windows host; the `isFile()` check at `:117` is untouched by the change, so the behaviour there is unchanged and unverified here. The test list already covers a directory.

## Declined to judge

- Whether a file of two or more byte-order marks, or of a space, should be refused: the task and D-111 do not ask for it (see Out of scope 2); the slice requires every other file to keep its result.
- The wording of the `guidelines/testing.md` Trust-boundaries row for `src/server/`: outside the passages of the task given for this slice (Out of scope 1).
- The foundation text of D-111 itself and the other slices of the plan: written and reviewed by the foundation step; I read D-111 as the source of the rule, not as a thing to review.
- `readSecrets` (the session-secret file): not touched by the slice.

## Checks run

Scratch copies of the two commits were made with `git archive` outside the worktree (`...\scratchpad\head` and `...\scratchpad\base`, with `node_modules` joined from the worktree by a junction); the reviewed worktree, its index and its branch were not touched. The slice's own form `python -B scripts/test.py <file>` was not used (the orchestrator said it fails for `.mjs`; the `.the-way` submodule is also not in a `git archive`). `scripts/test-node-file.mjs` is the script `npm test -- <file>` runs for a `.mjs` file after the build, and I ran it directly.

1. `node scripts/build.mjs` in the head copy: exit 0. Same in the base copy: exit 0.
2. `node scripts/test-node-file.mjs tests/startup.test.mjs` in the base copy (base `configuration.ts` with the head test file, to see it fail first): exit 1; 17 pass, 1 fail; `AssertionError [ERR_ASSERTION]: Missing expected rejection.` in the SMTP password case.
3. `node scripts/test-node-file.mjs tests/startup.test.mjs` in the head copy: exit 0; 18 pass, 0 fail.
4. `npx prettier --check src/server/configuration.ts tests/startup.test.mjs` in the head copy: exit 0.
5. `npx eslint src/server/configuration.ts tests/startup.test.mjs` in the head copy: exit 0.
6. `node scripts/build.mjs --check` (the body of `npm run typecheck`) in the head copy: exit 0.
7. `node ...\s4-crafted.mjs <head copy>` and `<base copy>`: exit 0 each; the table above.
8. `git diff` and `git log` of the range, computed by me; `grep` of the repository (without `node_modules`, `dist`, `.runs`, `.the-way`) for other statements of the password-file rule: only `foundations/decisions.md` (D-111, current), `.claude/skills/loop2-deploy/references/setup_and_secrets.md:222-224` ("A missing, unreadable, empty or malformed file stops the application before it listens"; still true, now for a mark-only file too) and the code; none contradicts the change.

Not run, and why: the full `npm test` and `python -B .the-way/elements/common/foundation_check.py` (the cycle's own run before the request; the slice's Checks do not include them). The FIFO case (no FIFO on this host). The repository's own `npm run typecheck` in the worktree itself was not run, to keep the worktree untouched; the same command body ran on a copy of the head commit (check 6).

## Reach beyond the handoff

- `scripts/test-node-file.mjs` (whole) and `package.json` scripts: to find what `npm test -- <file>` does for a `.mjs` file, so that I could run it in a scratch copy without `scripts/test.py`.
- `tests/startup.test.mjs:60-100` (the `configurationFixture` and `refusedStart` helpers): to build the crafted-input script with the same environment as the test.
- `src/server/configuration.ts:1-60` and `:160-210`: the `controlCharacter` pattern, `invalid()` and the caller of `readSmtpPassword`, to judge the refusal message and the call order.
- A repository-wide search for other statements of the password-file rule, and `.claude/skills/loop2-deploy/references/setup_and_secrets.md:222-224` (read in part): to see whether any other document contradicts the new refusal.
- `foundations/invariants.md` near line 749 (read as the handoff's range): the entry `account-startup-configuration` read whole.

## Unread material

- `task.md`: read only the lines named in the slice's *Read* (`:66`, `:94-98`, `:172`), not the rest of the file.
- `plan.md`: not opened; the slice section was taken from the handoff, which copies it word for word.
- `foundations/part_map.md:62-82` (the account-server entry): read whole, as the entry.
- `guidelines/coding.md` and `guidelines/testing.md`: read whole. The kind guidelines they list (`guidelines/coding-*.md`) were not read: none of their kinds (http-application, mail-sending, password-hashing and the others) covers `src/server/configuration.ts` as the handoff selects it.
- D-111, D-13, D-153 and the invariant `account-startup-configuration`: each read whole.
- The executor's report: read whole, as claims.

## Searches not found or unclear

- I found no entry for the startup refusal of the mail password file in the "Trust boundaries" table of `guidelines/testing.md` (Out of scope 1); the case is carried by the invariant marker in the test.
- The handoff's *Checks* form `python -B scripts/test.py tests/startup.test.mjs` is not usable for `.mjs`; the handoff itself says so. Unclear only in the slice text, not in the change.
- Whether a FIFO file is refused by this code: not tried (no FIFO on this host).
