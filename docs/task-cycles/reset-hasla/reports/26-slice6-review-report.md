PASS 5fcea3b418d1fb835c9772de680b38248de4631d

# Review — Slice 6, task `reset-hasla` (setting the password by a link)

Range `8fe869d..5fcea3b`, commits `7c8228f` and `5fcea3b`. `git rev-parse HEAD` in the worktree is the
head given. `.the-way` is at `a8dfe8a`, as the gitlink records. The reviewed worktree, its index and its
branch were not changed; every run that needed a build or a changed file ran in an export of the head
commit (see *Checks*).

## Findings

Blocking: none. The route does what Decision 4, 5, 8 and 9, D-218, `password-reset-link`,
`password-reset-ends-sessions` and `account-session-authorization` say. Five Minor findings follow, all
in comments or in the strength of tests.

### Critical

None.

### Important

None.

### Minor

**M1. A comment still counts six small routes.** `src/server/account-routes.ts:52`: "The body limit of
the six small routes and of the save route". The list at `src/server/account-routes.ts:367-375` now holds
seven, and this slice corrected the same count in `tests/transport.test.mjs:862` and `:977` but not here.
It misleads only a reader; nothing depends on it.

**M2. The comment of `invalidLink` still speaks of confirming alone.**
`src/server/account-routes.ts:122-124`: "One answer for every token that confirms nothing", with the list
"malformed, unknown, used, expired, of another kind or of a blocked account (D-156, D-160)". The function
is now also the refusal of the set-password route, whose reasons include a superseded link and a link
stopped during the hashing (D-218). The behaviour is right; the comment describes less than the code does.

**M3. No test pins the code `invalid-request` on the new route.** Decision 1 and Decision 4 step 2 give
400 `invalid-request` for a body that is not exactly the three string fields. The cases in
`tests/transport.test.mjs:625-635` (`unexpected field`, `missing`, `numeric`, `array`) assert the status
400 only, and `tests/http.test.mjs` has no such case for this route, though `assertInvalidRequest`
(`tests/http.test.mjs:1995`) exists and slice 5 used the code for its own route.
Evidence: replacing `invalidRequest(response)` in this route by `invalidLink(response)` passes
`tests/http.test.mjs` 66 of 66 and `tests/transport.test.mjs` 10 of 10. The head itself is correct: seven
crafted bodies sent in a scratch case, `__proto__` in two forms and `constructor` among them, all got 400
`invalid-request` and changed nothing. Minor because only a crafted request meets this refusal, the status
stays 400 and nothing is written.

**M4. An existing check was made narrower without a stated reason.**
`tests/transport.test.mjs:261`, in "transport refuses all four link routes before the session, the link
or the mail service", now counts `emailed_links WHERE spent = 0` where it counted every row. A recording
stops the earlier link of its kind and inserts one (`src/server/database.ts:445-467`), so the unspent count
does not move, and the assertion at `tests/transport.test.mjs:302` can no longer see a link recorded during
a refused request. `guidelines/testing.md`, *Changing an existing test*, asks for a reason for a weakened
check; the author's report states the change and gives none. The gain is small too: the same query now
reads `password_hash`, which already shows a password set through the route.
Evidence: a link recorded inside the refused loop passes every `state()` comparison of the loop. The case
still fails, but only later, on `400 !== 204` at the control at `tests/transport.test.mjs:334`, because the
recording stopped `resetToken`. So no fault of this kind goes unseen, which is why this is Minor; what is
lost is the direct check. Counting both, all rows and unspent rows, keeps it.

**M5. The case that sends another account's session never checks whose password changed.**
`tests/http.test.mjs:3419-3422`, tagged `invariant: account-session-authorization`, sends a session of
`f.second` with a link of `third` and asserts 204 and that the session survives. It asserts neither that
`third`'s password changed nor that `f.second`'s did not. The invariant says a link "authorizes setting a
new password of its own account and nothing else", and the confirmation route's case names the matching
fault ("confirming the session's account instead of the link's", `tests/http.test.mjs:2298`). Decision 8's
*Proved by* is met as written, and `resetPassword` takes no account argument, so the fault has no short
form in the route today; two lines of `hashOf` would close it.

## Trust boundary, step by step

Checked by reading `src/server/account-routes.ts:559-605`, `src/server/transport.ts`,
`src/server/database.ts:513-572` and by the runs below; no finding except those above.

- **Token forms:** `isLinkToken` before the digest; 14 forms and states in the every-token case. Dropping
  `isLinkToken` changes nothing a request can see, as the author says, since another spelling has another
  digest.
- **Origin and body guards:** the path is in `paths` and in the `mutationGuards` list; a fault taking it out
  of the transport gate fails `transport refuses all four link routes ...`.
- **Enumeration:** the route takes no address, so content tells nothing of an account. A bad password
  answers the same for a good, an unknown and a malformed link, headers included (`shapeOf`). Timing
  separates only a working link, which an attacker cannot hold.
- **Tokens and links in logs:** the route writes no log line, and the error handler in `src/server/app.ts`
  logs nothing and answers without detail.
- **Link of another kind, blocked account, later link, expiry:** the second read in the transaction
  decides, and its `invalid` reaches the one refusal. A fault ignoring the outcome fails the during-hashing
  case.
- **Session sent along:** `request.session` is not touched. Both faults that touch it are caught; see
  *Checks*.
- **Login in progress:** see the scratch case under *Checks*. A clear keeps the entry object, so a ticket
  settles on it (`src/server/account-policy.ts:243-250`).
- **Failures:** `resetLinkWorks` and `resetPassword` stand outside the `try`, so a database fault reaches
  the handler of Express 5 and answers 500, and only `PasswordCapacityError` becomes 429.
- **Concurrency:** two requests with one link, sent together: statuses `[204, 400]`, and the stored hash
  verifies the winner's password.

## Changed invariant tests

- `tests/transport.test.mjs`, "transport refuses all four link routes before the session, the link or the
  mail service" (`account-request-transport`): renamed from "all three", new route and control, the state
  query changed (M4). The name is cited in an older form by `guidelines/testing.md`; see *Declined to judge*.
- `tests/transport.test.mjs`, "refused state-changing requests change no account or session and do no
  password work" (`account-mutation-request-guards`): new route, its control, `resetState`. The expected
  link count went from 1 to 2 because the case's own data gained a link, which is a reason on the data's side.
- `tests/transport.test.mjs`, "refused requests to the save route change no saved game state, and its body
  limit is 64 KiB where the others keep 16 KiB" (`account-mutation-request-guards`): one more path in the
  list, two comments.
- `tests/http.test.mjs:201`, "unconfigured accounts answer the canonical account routes as unavailable
  JSON": one more route in the list.

## Declined to judge

- The rows and route counts of `guidelines/testing.md` that do not yet name `POST /api/password-reset`:
  Slice 11 changes that file by the plan; outside this slice.
- The browser client of the route: Slices 7 to 9 by the plan; outside this slice.
- express-session renewing the expiry of another account's session as the request ends, against D-218's
  "stays as it was": the library's renewal of every request under D-101, not the route's act, and the case
  rightly compares the stored data alone.
- A lone surrogate in a password, which `argon2` sees after UTF-8 replacement: the same at registration and
  login at the base; outside the task.
- Why `Session cannot be replaced` is printed three times in `tests/http.test.mjs`: three occurrences at the
  head, and the author saw three before the route; outside this slice.

## Checks

All runs below ran in an export of the head commit (`git archive 5fcea3b`) at
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\s6`,
with `node_modules` joined to the worktree's by a junction, removed afterwards. Node ran directly, because
`npm test -- <file>` only adds the build, which ran as `node scripts/build.mjs`.

| Check | Command | Exit / result |
|---|---|---|
| HTTP cases at the head | `node --test tests/http.test.mjs` | 0; 66 pass, 0 fail |
| Transport cases at the head | `node --test tests/transport.test.mjs` | 0; 10 pass, 0 fail |
| Types | `npm run typecheck` | 0 |
| Format | `npx prettier --no-config --no-editorconfig --check` on the three changed files | 0 |
| Lint | `npx eslint --max-warnings 0` on the three changed files | 0 |
| Head tests, base route (`8fe869d:src/server/account-routes.ts`) | `node --test tests/http.test.mjs` | 1; 10 fail: the nine new cases and the list case, as the author reports |
| Head tests, base route | `node --test tests/transport.test.mjs` | 1; 3 fail, as the author reports |
| Scratch cases appended to a copy of `tests/http.test.mjs` | `node --test --test-name-pattern="^scratch:" tests/http.test.mjs` | 1; 3 pass, 1 fail by my own assertion, explained below |
| Worktree untouched | `git status --short`, `git rev-parse HEAD` | no lines; head as given |

Scratch cases:

- Two concurrent requests with one link: statuses `[204, 400]`, hash of the winner.
- Seven crafted bodies: 400 `invalid-request`, nothing changed, the link still worked.
- Code-point boundaries: 128 and 12 supplementary characters 204, 129 and 11 are 400; the old password set
  again 204, so it is never compared (D-98).
- A login started with a reset, both in flight: the one failure was mine. I asserted the login would not
  answer 200; it answered 200 and the reset 204, with no session left. The login finished before the commit
  and the reset then deleted its session, which is what `password-reset-ends-sessions` asks. No defect.

Faults, each applied alone to the scratch copy with `mutate.py`, built, run, restored:

| Fault | File run | Result |
|---|---|---|
| `request.session.destroy(() => {})` in the route (the author did not re-run it after adding the assertion) | http | 1; sessions case, "the session of another account remains" |
| `request.session.save(() => {})` in the route | http | 1; sessions case, "the one sent along" |
| `invalidLink` instead of `invalidRequest` for the fields | http | 0; 66 pass: survives (M3) |
| The same | transport | 0; 10 pass: survives (M3) |
| The read `resetLinkWorks` dropped | http | 1; rules-before-link case and every-token case |
| Outcome of `resetPassword` ignored | http | 1; during-hashing case and locked-address case |
| Path filtered out of the transport gate | transport | 1; link-routes case, `/api/password-reset {}` |
| A link recorded inside the refused loop (a change to the test) | transport | 1; only at the later control, `400 !== 204` (M4) |

Not run:

- The product's gate and `foundation_check.py`: the handoff keeps them for the cycle.
- `npm test -- tests/quality/test_quality_invariants.py`: not tried, because the export has no `.git` and
  no `.the-way`, and the reviewed worktree stays unchanged. ESLint and Prettier ran directly on the changed
  files, so the other checks of that file remain the author's claim (exit 0).
- The author's remaining faults were not repeated; a sample of the riskiest was, above.

The own-work check names the order of the route, which is where the change is weakest, and its faults
would catch it unmet; the runs above agree.

## Reaches beyond the dispatch

- `src/server/database.ts:295-572`: `saveSession`, `renewSession`, `blockAccount`, `issueLink`,
  `resetLinkWorks`, `resetPassword`, because the *Read* names only lines 150-221 and the route's outcome
  rests on these.
- `src/server/session-store.ts`: what `touch` does at the end of the reset request.
- `src/server/transport.ts`: the guards the route stands behind.
- `tests/http.test.mjs` and `tests/transport.test.mjs` beyond the diff: fixtures and helpers the new cases
  use.
- `.runs/task-cycles/reset-hasla/plan.md:515-553` and its slice headings: whether Slice 11 owns the
  guideline rows.
- `foundations/part_map.md`, by search: whether it lists routes. It does not; a search for `src/server`
  found lines 64 and 77, which confirms the search works on that file.
- `node_modules/express-session`: version 1.19.0 and the place of `shouldTouch`.

## Searches not found or unclear

- `tests/http.test.mjs` holds no case with the code `invalid-request` for `POST /api/password-reset` (M3).
- The author's report says the every-token case has 15 full-gate windows; the case lists 14 candidates. It
  changes nothing in the code.
- The dispatch's *Return* gives the first line and the path; the method adds the counts of findings. The
  orchestrator's dispatch asks for the first line and the path alone, so the counts stand here: blocking 0,
  Minor 5, out of scope 5.
- My `Write` of
  `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\mutate.py`
  replaced a file of that name another agent of this session had left in the shared scratchpad; I did not
  know it was there and its content is gone. No report I read names it, and `mutate.mjs` beside it is
  untouched. Anyone who needs the old script has to write it again.
