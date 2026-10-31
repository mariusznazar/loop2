FAIL 0fdaffe

# Review of Slice 2, task `reset-hasla` — range `b9efe52..0fdaffe`

Blocking: 1 (Important). Minor: 2. Out of scope: 0.

`git rev-parse HEAD` is `0fdaffe`, the given head. `.the-way` is at `a8dfe8a`, unmoved. The reviewed
worktree is clean and was not changed.

## Findings

### Critical

None.

### Important

**1. A login stores its session under the hash it read after the check, not the hash it checked against, so the comparison in the route is the only thing between an old password and a live session.**

- **Place:** `src/server/account-routes.ts:609` (`signIn(runtime, request, response, account)`, where
  `account` is the re-read of line 579) and `src/server/account-routes.ts:196`
  (`account.passwordHash`). The remembered `checkedHash` (lines 568, 571) is used only at line 596.
- **What is wrong:** The Goal of the slice says `establishSession` names "at a login the one the
  password was checked against", and D-112's *Verification* says "naming, in the write of that
  session, the password hash its password was checked against". The route names the hash of the
  second read. At the head the two values are equal, because line 596 has just proved it. That makes
  the comparison carry the guard, which the design forbids:
  - Spec Decision 7, its own heading: "The comparison in the login route chooses the answer and
    nothing else."
  - Spec Decision 7: "Without this comparison the guard would still leave no session, but the login
    would answer 503 after settling as a success."
  - D-100 *Rejected*, an entry this task changes: "no comparison of the password hash after the
    check — the guard of D-112 still leaves no session, but the login answers with a server error
    after settling as a success."

  All three are false of this code. The comment at `src/server/account-routes.ts:178-182` repeats
  the design, "the one a login checked the password against", over a call that passes something else.
- **Why it matters:** The design has two independent protections and the code has one. The failure
  the foundation describes for a lost comparison is a harmless 503. The real failure is a successful
  sign-in with a replaced password and a session that outlives the reset, which question 5 refused
  and `password-reset-ends-sessions` forbids. A reader of D-100 is told the comparison only picks the
  answer, so it reads as safe to change. The next route change around it rests on a sentence that
  does not hold.
- **Limits of this finding, stated plainly:** no request at the head reaches a wrong answer. Nothing
  awaits between the comparison and the store, and the committed login case fails if the comparison
  is removed (mutation M1). The finding is a missed requirement of the Goal plus code that does not do
  what the entry it rests on says; it is not a live hole.
- **The author's report on this:** `11-slice2-report.md`, Own-work check, saw the same thing and says
  "the comparison is load-bearing, as the spec says". The spec says the opposite. The author found the
  departure and recorded it as agreement.
- **Evidence (scratch worktree of the head, `tests/http.test.mjs`):**
  - M1, comparison disabled, head otherwise: `200 !== 401` on "a password replaced while the old
    password is checked…". The old password signs in.
  - M2, comparison disabled and the login naming `checkedHash`: `503 !== 401`, exactly what the spec
    and D-100 describe.
  - M3, comparison kept and the login naming `checkedHash`: all 42 cases pass, so the change costs no
    behaviour and no test.
- **Fix direction:** `establishSession` and `signIn` take the hash to name, and the login passes
  `checkedHash`; the registration passes the hash it made. Re-run M2 by hand as the own-work check.

### Minor

**2. No committed test holds "before it looks at the block".**

- **Place:** `src/server/account-routes.ts:593-607`; `tests/http.test.mjs` has no case for it.
- **What is wrong:** The Goal says the comparison comes before the block, and D-100 says "whatever the
  account's block". Mutation M4 moves the comparison after the block check: every committed case in
  both files still passes. Such a login would answer 403 `account-blocked` to an old password, which
  the spec says it has not earned.
- **Evidence:** A scratch case (reset and block both committed while the password is checked) passes at
  the head with 401 and fails under M4 with `403 !== 401`. So the head's order is correct and the gap
  is in the tests only. The case fits in about twelve lines beside the login case and reuses
  `resetDirectly`.

**3. The new storage cases accept any rejection.**

- **Place:** `tests/account-storage.test.mjs`, the `assert.rejects` calls in the two cases on a hash
  that no longer holds (`call(store, "set", id, value)`; "held" and "new").
- **What is wrong:** `assert.rejects` names no expected error, so an invalid cookie satisfies it as
  well as the guard does. This is not hypothetical: the author's report records a first false failure
  run of exactly this form. The pattern is inherited from the block case at line 1495, and the row
  assertions beside it hold today (mutations M5 and M6 are caught), so nothing is unprotected now.
  Matching `/Session cannot be replaced/` would close it.

## Declined to judge

- Token forms, reset link kinds, the two new routes' origin and body guards, tokens and links in logs
  at those routes: the routes are not in this range; they come with later slices. This range adds no
  route and no token handling.
- `guidelines/coding-database-access.md`, „Stan konta w instrukcji zapisu”, and the table of
  `guidelines/testing.md`, which do not yet name the password-hash guard or
  `password-reset-ends-sessions`: neither file is in this slice's *Change*.
- The 201 of a registration whose second store is refused ending in a deferred `next(err)` and a logged
  stack: the same path a block takes at the base, which the spec accepts by name.

## Checked and found sound

- The statement's bound values are in order, and `blocked = 1` still refuses when an expectation is
  given. `password_hash` is `TEXT NOT NULL` with binary comparison.
- `establishSession` is the only product caller of `save` or `regenerate`; `saveSession` has one caller.
  The store passed to `express-session` is the same instance as `runtime.store` (`src/server/app.ts:29`),
  so the `WeakMap` is shared.
- Every path of the login route settles its ticket once; the new branch uses `release`.
- The new branch answers through `invalidCredentials`, the same answer as a wrong password, and adds no
  work, so it gives no signal in content or time. It adds nothing to a log: the store's refusal logs
  the fixed message and a stack, and the run's log holds no `$argon2` text.
- `gate capacity` is 2 and the registration case's concurrent `hashPassword` fits within it, so that case
  is not racing the gate.
- The login case does discriminate the ticket settlement: M7 (`fail`) and M8 (`succeed`) both fail it.
- `raw` in the storage fixture is a real second `DatabaseSync` connection, as the case's name claims.

## Checks run

All runs below in a scratch detached worktree of `0fdaffe`, removed afterwards, with `node_modules`
linked from the reviewed worktree. The product's gate was not run, as the handoff gives.

| Check | Result |
|---|---|
| `git diff b9efe52..0fdaffe`, `git log`, `git rev-parse HEAD` | head matches |
| `node scripts/build.mjs --check` (the `typecheck` script) | exit 0 |
| `node scripts/test-node-file.mjs tests/http.test.mjs` at head, with one added scratch case | exit 0, 42 pass (the author's 41 plus the scratch case) |
| `node scripts/test-node-file.mjs tests/account-storage.test.mjs` at head | exit 0, 59 pass |
| M1 comparison disabled | http exit 1: login case `200 !== 401`; scratch case `403 !== 401`; storage exit 0 |
| M2 comparison disabled, login names `checkedHash` | http exit 1: login case `503 !== 401`; scratch case `403 !== 401`; storage exit 0 |
| M3 login names `checkedHash`, comparison kept | http exit 0, 42 pass; storage exit 0 |
| M4 comparison after the block check | http exit 1 on the scratch case only, `403 !== 401`; storage exit 0 |
| M5 hash comparison removed from the SQL | http exit 1: registration case `1 !== 0`; storage exit 1: two new cases, "Missing expected rejection" |
| M6 `set` passes no expectation | same failures as M5 |
| M7 `release` to `fail` in the new branch | http exit 1: login case `429 !== 401`; storage exit 0 |
| M8 `release` to `succeed` in the new branch | http exit 1: login case `401 !== 429`; storage exit 0 |
| ESLint `--max-warnings 0` on the five changed files | exit 0 |
| Prettier `--check` with the guideline's flags on the five changed files | exit 0 |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py` | exit 1: 5 tests, 3 pass, 2 errors `FileNotFoundError` in the Ruff and ShellCheck cases, whose tools live in `.runs/quality-venv`, which a fresh worktree does not have. Not a finding: the slice changes no Python or shell. |

**Could not run:** the Ruff and ShellCheck cases, for the reason above. The author's exit-0 run of that
file is unverified by me for those two cases. The author's failing-first runs are their own record; I
did not repeat the stub, but M5 and M6 produce the same failure messages.

No invariant test was changed by this range. New cases carry `password-reset-ends-sessions`; the two
route cases do not also carry `account-session-storage` as the plan's Checks line lists, which is right
for what they prove, so I raise no finding.

## Reaches beyond the dispatch

- `src/server/account-routes.ts`, `session-store.ts`, `app.ts`, `configuration.ts`, `passwords.ts`,
  `src/server/account-policy.ts:150-262` and parts of `database.ts`: callers and contracts of the
  change, to find every way a session is stored and how tickets settle.
- `node_modules/express-session/index.js`, the `res.end` save branch: what a refused second store does.
- `tests/http.test.mjs` fixtures and helpers, `tests/account-storage.test.mjs` fixture: what the new
  cases rest on.
- `foundations/decisions.md`, headings of D-214 to D-219, and `plan.md:37`: the author's label question.
- `scripts/test.py`, `scripts/test-node-file.mjs`, `scripts/build.mjs`: to run focused checks in a
  scratch worktree.

## Searches not found or unclear

- The author's flag on the labels is a false alarm: `plan.md:37` gives N3 as "the form of a reset link",
  and D-216 is "What form does a password-reset link take?". The handoff's mapping is right, and the
  code's citations of D-112 for this guard are right too.
- D-100's main sentence and its *complies* line read as covering every login during whose password work
  a reset commits, while its *violates* line and *Rationale* limit this to a password "right when
  checked". The code counts a wrong password as a failure then, which agrees with the spec and is the
  right behaviour: a wrong guess stays a wrong guess. The entry lacks the qualification in two places.
  It is not in this range, so I raise no finding here; the return step may want to tighten it.
