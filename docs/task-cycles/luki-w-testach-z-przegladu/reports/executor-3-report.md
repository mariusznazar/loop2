# Report of executor 3 — slice 3: account-server citations

**Status:** done (the concern about `email-verification-nonblocking` was answered by the orchestrator; see "Concern" below).

## Commits and files

- `d42e46aa0b6e39ba53279773127c924bdf369fca` — `tests/http.test.mjs`, +3 −0 (base `c90b3211289a5ef32493329c64dc7afe19d76139`).
- `f2a723faa7ab46051657330cc251cd6af16bd347` — `tests/http.test.mjs`, +1 −0: second citation of `email-verification-nonblocking`, on the case "each account's session reads and replaces only its own saved game state" (second commit, no amend). Whole range: +4 −0.
- `tests/transport.test.mjs`: not changed (as the slice says). `src/server/` unchanged at the end (`git diff --stat -- src` empty after every break; `git status --short` empty after the commit).

## What was cited, and on which case

| Invariant | Case (in `tests/http.test.mjs`) | Why this case |
|---|---|---|
| `player-self-registration` | "registration stores an Argon2id hash of the exact password and signs this browser in at once" | A visitor with no session and no approval creates the account (201, stored under the normalized address, `emailConfirmed: false`) and is signed in at once (session stored for it, the session reads the account). |
| `player-password-login` | the same case | After registering, the address (in another spelling) with the exact password signs in (200 with the account's body); the trimmed password is refused. |
| `email-verification-nonblocking` (second, commit `f2a723fa`) | "each account's session reads and replaces only its own saved game state" | Its two accounts are made with `createAccount` and never confirmed (`emailConfirmed: false`); their sessions read `null`, save, replace and read the game state. So the game state is served and saved for an unconfirmed account. |
| `email-verification-nonblocking` | "registration answers 201 with its message's outcome in every case and the player stays signed in" | For a message `sent`, `failed`, rejected, never answered, link not recorded or limited, registration answers 201 with `emailConfirmed: false` and the stored session of the new account. |

The first two share one case, so two lines `// invariant:` stand in it, after the existing `player-argon2-password-hash`; the registration-201 line stands beside the existing `account-message-limits`; the save-routes line stands after the existing `player-save-isolation`.

### Deviation from the plan's example (a choice)

The plan's example for `player-password-login` was "a known address with a wrong password and an unknown address fail login identically". I did not cite it: it never shows a sign-in succeeding, and I did not see it fail for the break "no password is ever accepted" (it expects both logins refused). In the break B2 below it is not among the failing cases. The case I cited fails for both "any password accepted" (B1) and "the right password refused" (B2). Way rejected: the plan's example case, which would carry the citation of a sentence it does not check. Cost if wrong: one line `// invariant:` to move.

### Concern, answered: "begin playing" for `email-verification-nonblocking`

The orchestrator chose (message to the executor) to keep the registration-201 citation and add a second on an existing case showing the game state served to an unconfirmed account, with no new case; I did that (commit `f2a723fa`, break E below). The two cases together carry the sentence. The original concern, kept for the record:

No case of `tests/http.test.mjs` registers an account and then loads or saves its game state. What the cited case proves is that registration leaves the browser signed in with an unconfirmed address, whatever the message did. That the game-state routes serve an unconfirmed account is proven only by cases that use seeded accounts (`emailConfirmed: false`), for example "each account's session reads and replaces only its own saved game state". I judged the cited case to be the account server's side of the sentence (the session that lets the page start the game) and added no case, as the slice says. If the orchestrator reads "whole sentence" as needing registration followed by a save, the answer is a new case, not a citation; I did not add one and return no `questions` for it. Recommended answer if asked: keep as is.

## Breaks seen failing, each restored byte for byte

Each break was a change to `src/server/` for one run of `npm.cmd test -- tests/http.test.mjs` (or `transport`), then `git checkout -- <file>`; `git diff --stat -- src` was empty after each. Output files: `.runs/executor-3/break*.txt`.

| Break | Command | Exit | Newly citing case seen failing |
|---|---|---|---|
| A. `src/server/account-routes.ts`, registration route answers 403 `approval-required` at its start (as if approval were needed) | `npm.cmd test -- tests/http.test.mjs` | 1 (26 failed) | "registration stores an Argon2id hash…" failed |
| B1. same file, login: `verified = true` after the password check (any password accepted) | same | 1 (12 failed) | "registration stores an Argon2id hash…" failed |
| B2. same file, login: `verified = false` after the check (the right password refused) | same | 1 (18 failed) | "registration stores an Argon2id hash…" failed |
| C1. same file, registration does not sign the browser in (the `signIn` call skipped) | same | 1 (14 failed) | "registration answers 201 with its message's outcome…" failed (and "registration stores…") |
| C2. same file, registration answers 502 when the message outcome is `failed` | same | 1 (1 failed) | "registration answers 201 with its message's outcome…" the only failure |
| D. `src/server/app.ts`, the line `store: runtime.store,` removed (library's default `MemoryStore`) | `npm.cmd test -- tests/transport.test.mjs` | 1 (7 failed of 12) | both cases citing `player-express-session-sqlite-store` failed: "rolling static responses use the newest signing key and touch real SQLite without rewriting identity" and "new opaque sessions persist in SQLite while anonymous and invalid cookies create nothing" |
| E. `src/server/account-routes.ts`, `GET` and `PUT /api/saved-game` answer 401 for an account with `emailConfirmed: false` | same, `tests/http.test.mjs` | 1 (13 failed) | "each account's session reads and replaces only its own saved game state" failed (with the other save-route cases that use unconfirmed accounts) |

A first attempt at break A put code after a `return`, which broke the TypeScript build (exit 1, no test ran); I replaced it with a conditional return, and that is the run in the table.

## Checks

- Before the change (baseline): `npm.cmd test -- tests/http.test.mjs` — exit 0, 95 passed, 0 failed.
- After the first commit: `npm.cmd test -- tests/http.test.mjs` — exit 0, 95 passed, 0 failed.
- After the second commit (rerun): `npm.cmd test -- tests/http.test.mjs` — exit 0, 95 passed, 0 failed; `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — "0 errors" (the exit code was lost in a pipe to `tail`; the earlier unpiped run of the same command gave exit 0); prettier on the file passes.
- `npm.cmd test -- tests/transport.test.mjs` — exit 0, 12 passed, 0 failed.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 0, "0 errors".
- `python -B .the-way/elements/common/foundation_check.py` (without the switch) — exit 1, 2 errors: `foundations/invariants.md:712` `loop2-shared-public-origin` and `foundations/invariants.md:1292` `sprite-credits`, both not cited by a test yet. The slice says the run without the switch reports "only the invariants Slice 4 cites"; I assume these two are slice 4's, as the handoff does not name them. None of the three invariants of this slice, nor `player-express-session-sqlite-store`, is reported.
- `npx.cmd prettier --check tests/http.test.mjs` — exit 0.
- Not run: the full gate (`npm.cmd test` with no file, `gate_times.py`), by rule — the orchestrator's alone.

## Own-work check

- Requirement most likely not met: "each newly citing case is seen failing against `src/server/` broken for a moment" and "the right case for each sentence", not just a plausible name. Check: break the server in the way that violates exactly each sentence (approval needed, password not checked or always refused, no sign-in before confirmation, failure of the message failing the registration) and see the cited case fail; and break the store and see the two transport cases fail. Showed: every cited case failed for its break (table above). It also showed the plan's example for password login would not have, which is the deviation above.
- Mutation in my head: citations alone, no behaviour changed; nothing else to mutate.

## Reaches beyond the handoff

- `tests/http.test.mjs:1180-1197` and `:2230-2353` (the cases the plan named by example) and `:3934-4049` (the saved-game case with seeded accounts) — to judge the right case for each sentence.
- `src/server/account-routes.ts:740-917` (registration and login routes) and `src/server/app.ts:1-75` — to choose the breaks.
- `.the-way/elements/common/foundation_check.py:1-110` — to see what a citation line requires.
- `.the-way/task-cycle/change/slice.md` — as `SKILL.md` names it for a slice.

## Working copies

None made. `.runs/executor-3/` holds only the logs of the runs named above (ignored by git); it can be deleted.

## Unread material

- `guidelines/testing.md` read whole (in three pages); `guidelines/coding.md` read whole.
- `foundations/invariants.md` read at `608-686` as the handoff gives (the four invariants whole); D-96, D-152, D-202, D-107, and `express-session-store-contract` read whole at their ranges.
- `tests/transport.test.mjs:773-907` read whole at that range; `foundations/part_map.md:66-88` and `task.md:43` (the latter is copied in the handoff): not opened separately.

## Searches not found or unclear

- A case of `tests/http.test.mjs` that registers an account and then loads or saves its game state: not found (see the concern above).
- The 2 errors of the run without the switch: the handoff does not say which invariants are slice 4's; I read them as `loop2-shared-public-origin` and `sprite-credits` from the task's line 43 (which names `loop2-shared-public-origin` for slice 4's tests) — `sprite-credits` is my assumption.
