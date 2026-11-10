# Slice 4 report — The server refuses a mail password file that decodes to an empty password

**Status:** done

## Commits

- `60c799e` fix: :bug: refuse a mail password file that decodes to an empty password, a file of only a byte-order mark included (base `e04ac0e`)

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/configuration.ts` | 4 | 3 |
| `tests/startup.test.mjs` | 9 | 0 |

The change: `readSmtpPassword` now throws (the same `LOOP2_SMTP_PASSWORD_FILE` message, no file content) when the decoded text is `""`, so a file of only EF BB BF is refused as a zero-byte file is. The header comment of the function says so. Nothing else in the function changed.

## Checks

Note: the handoff's form `python -B scripts/test.py tests/startup.test.mjs` was not used; the orchestrator's form `npm test -- <file>` was used for every run of the `.mjs` file.

1. Red run, before the code change, with the new fixtures in the test: `npm test -- tests/startup.test.mjs`, exit 1. 17 pass, 1 fail: the case "the SMTP password file must be a small non-empty UTF-8 regular file …" at `tests/startup.test.mjs:406`, `AssertionError: Missing expected rejection`. The BOM-only fixture (line 400) was the first to be accepted. Log: `a scratch folder outside the repository`.
2. Green run, after the code change: `npm test -- tests/startup.test.mjs`, exit 0. 18 pass, 0 fail. Log: `…/scratchpad/s4-green.log`.
3. `npm run typecheck`, exit 0.
4. Extra, not in the slice's Checks: `npx prettier --check src/server/configuration.ts tests/startup.test.mjs`, exit 0; `npx eslint src/server/configuration.ts tests/startup.test.mjs`, exit 0.

Not run: the full `npm test` (the orchestrator runs it, per the handoff).

## Tests

- The case keeps its name and its `// invariant: account-startup-configuration` marker. No assertion was weakened, skipped or relaxed.
- Added to the case's invalid list, as fixtures in bytes: `Buffer.from([0xef, 0xbb, 0xbf])` (mark alone, line 400) and `Buffer.from([0xef, 0xbb, 0xbf, 0x0a])` (mark and newline, line 401). The zero-byte `""` and the 1025-byte `secret.padEnd(1025, "x")` fixtures were already in the list.
- Added after the existing 1024-byte acceptance check (lines 432-436): a file of the mark followed by the secret text is accepted and its password is the secret, the mark dropped. This case passed before the code change too, as expected: the decoder drops the mark today, and the slice requires that result to stay. It is therefore not a seen-failing test; it guards the acceptance side.
- The mark-and-newline fixture is refused by the existing control-character check (not by the new empty check); it is listed to pin the handoff's requirement.
- The 1024-byte acceptance case was already in the test and was not changed.

## Own-work check

- Requirement (slice Goal): a password file of only EF BB BF is refused at startup with the setting's name and not its content, as a zero-byte file is; every other file keeps its present result.
- Check: the BOM-only fixture in the invalid list (line 400), run before and after the change; the mark+text acceptance case (lines 432-436) and the 1024-byte case, run after the change.
- Result: red run failed at line 406 (missing rejection, BOM-only accepted); green run passed all 18 cases, including the acceptance cases.
- Named break caught: removing `password === ""` from `configuration.ts:133` makes the BOM-only file accepted again. This is a bug, not a decision, so the test is a fair guard.
- Mutation check in head: a wrong branch on the mark (e.g., refusing any file with a mark) would fail the mark+text acceptance case; an empty return would fail the refusal cases.

## Reach beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` (whole) and `.the-way/task-cycle/change/slice.md` (whole): the method, named by the handoff's Method paragraph.
- `a rule file of the author's agent instructions`: read before the commit, as the global instructions require; it is not named by the handoff. Commit message in English, `git add` by path, author address `mariusznn@gmail.com` matches the repo's other commits.
- `package.json` scripts, read with `node -e` (to find the `test` and `typecheck` commands).

## Unread material

- `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`: read lines 1-40 only (header and the Foundation entries table). The Slice 4 section was taken from the handoff's copy, as the handoff states it is copied word for word; I did not open the plan's `## Slices` section.
- `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`: read lines 64-99 and 170-173. Covers item 29, Questions 3 and the settlement row 2; the handoff's ranges are inside these reads.
- Every other item named by the handoff's *Read* was read whole: `.the-way/task-cycle/change/SKILL.md`, `guidelines/coding.md`, `guidelines/testing.md` (in two reads, lines 1-377 and 378-464), `foundations/decisions.md` entries D-111, D-13, D-153 (each whole), `foundations/invariants.md` entry `account-startup-configuration`, `foundations/part_map.md` section `account-server`.

## Searches not found or unclear

- `guidelines/testing.md`, "Trust boundaries" table, row `src/server/`: it lists the refusals of the server's request routes and the email routes, but does not name the startup refusal of the mail password file or `account-startup-configuration`. The existing test in `tests/startup.test.mjs` carries that invariant marker, so the change is covered as written. I did not change the guideline; I note it for the orchestrator's selection, in case the trust-boundary row is meant to name it.

## Choices made

- The check is in `readSmtpPassword` after the decode, as the simplest place: `password === ""` joins the existing control-character refusal. The alternative, a byte-length check that counts the mark, would refuse the mark-plus-text file, which the slice requires to be accepted. Cost of the choice if wrong: none known; the mark-plus-text case pins the behaviour.
- No change to `readSecrets` (the session-secret file), which is outside the slice.

## Questions and concerns

- None blocking. Concern only: the guideline row noted under "Searches not found or unclear".
