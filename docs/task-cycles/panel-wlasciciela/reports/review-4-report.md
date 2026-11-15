FAIL a3bb2bf6ac21e1a720916a296cd9bf6447c3922a

# Review 4 — slice 4, the owner routes (`276b4289..a3bb2bf6`)

Head confirmed: `git rev-parse HEAD` is `a3bb2bf6ac21e1a720916a296cd9bf6447c3922a`; the range holds the one commit `a3bb2bf6`.

Result in short: the code of the five routes is sound. The order of checks, the role read from the database at each request, the 409 for an owner, the guards, the logs and the answers all held under every crafted request I sent, and every mutation I made failed a test. One blocking finding stands in the foundation the change writes: the invariant `owner-panel-authorization` leaves out the second half of the settlement it records (row 8).

## Findings

### Critical

None.

### Important (blocking, within the task)

**I-1. The invariant `owner-panel-authorization` does not say that the server refuses to block an account with the owner role, which row 8 of the settlements and the plan both require.**

- Place: `foundations/invariants.md:728-736` (the entry), against `.runs/task-cycles/panel-wlasciciela/task-frozen.md` row 8 ("... serwer odmawia blokady konta z rolą właściciela") and `plan.md:30` and `plan.md:165` ("every route of the owner panel refuses a request without a session and a session of an account without the owner role, reads the role at each request, **and the server refuses to block an account with the owner role**").
- What is wrong: the sentence holds three of the four things of row 8: 401 without a session, 403 to a session without the role, the role read from the database and never from the session, and nothing changed when it refuses. It holds nothing of the fourth: the refusal to block an account with the owner role (409 `owner-not-blockable`, the caller's own account included). Row 8 is one accepted settlement of kind "invariant" ("1 a — przyjąć oba wiersze"); the handoff asked for its sentence to be judged word for word against it. The executor's report names its own concern about *Derives from* but not this omission.
- Why it matters: the refusal to block an owner is the part of row 8 that guards against an owner locking the panel out of their own account (D-137's rationale). With no invariant holding it, the one test that checks it (`tests/owner-routes.test.mjs:637-699`) cites no invariant, so a later change that lets the panel block an owner has no invariant to violate. The part of the change that does what the entry forbids or fails to do what the settlement requires is Important by WAY-263. D-137's *Verification* lists the invariant after a *violates* line ("a block of the panel ... that blocks an account with the owner role") that the invariant itself does not hold.
- Evidence: the sentence at `foundations/invariants.md:730` read whole; grep of `foundations/invariants.md` for "owner" finds only this entry; the test at `tests/owner-routes.test.mjs:637-699` has `// decision:` and no `// invariant:`. I tested the behaviour itself and it holds (probe, below), so this is a gap of the entry, not of the code.
- Fix, either way: add the clause to the sentence (or record a second invariant for it, if one sentence may not join them under WAY-56's complying/violating pair; I judge the pair joinable, since both are about who may act through the panel), and cite it from the 409 test with `// invariant: owner-panel-authorization`. Through the project skill `the-way-record-invariant`.

### Minor

**M-1. The invariant's *Derives from* is `D-109 · D-137` but its sentence also rests on D-400 (grant and revoke routes behind the same refusal) and D-410 (the role read per request, the role itself).**
`foundations/invariants.md:733`. The executor's concern 3 names it. The sentence is a clause of the five-route authorization of D-109, which D-400 and D-410 each state in part; D-410's *Violated by* ("a role kept in the session ... and read from it") is exactly what the invariant's test catches, yet D-410's and D-400's *Verification* do not list the invariant (`foundations/decisions.md:10894-10910`, `:10700-10716`). `foundation_check.py` accepts the entry as it is, and no sentence a reader would read wrongly turns on it, so Minor. The handoff said the foundation step left D-400 and D-410 as they are; mention for the whole-change review.

**M-2. `guidelines/coding-http-application.md:13-16`: the table "Files of this kind" lists `app.ts` and `account-routes.ts`, not the new `src/server/owner-routes.ts`.**
I read the guideline whole. Its two rules — handlers registered in Express 5 (D-02) and an unknown API route answered with JSON, not HTML (D-05) — are followed by `owner-routes.ts` (`express.Router()`, handlers through `router.get/post`; the JSON 404 of `app.ts` still catches every other `/api` path: probe below). Its "When to read" sentence ("before adding or changing a file composing an HTTP application in `src/server/`") reaches the new file. The omission is a gap of the list, not a rule broken; `owner-routes.ts` is a copy of the `account-routes.ts` pattern, so a row `src/server/owner-routes.ts | copy | —` would complete it. The slice's *Change* names no guideline file, so the omission is the plan's, not the executor's; fix it in the whole-change review or by the `the-way-maintain-coding-guidelines` skill. It is not blocking.

**M-3. The address of the body is normalized as at login on the route (judgment 2), but no decision says so for the route.**
`src/server/owner-routes.ts:58-61` (`normalizeEmail`). D-137 and D-400 name the normalization for the command only; their paragraphs on the panel say "named by its email address in the body". The choice is right (a padded or upper-case address from a hand-made request gets the account the command would get; the panel itself sends the address from the list) and is held by tests (`tests/owner-routes.test.mjs:713-780` with `" Blocked@Example.Test "`; `:782-852` with `" Other@Example.Test "`), but a reader of D-137 cannot learn it. One clause in each of D-137 and D-400 (or the glossary) would close it. Not blocking: it is the safe reading.

**M-4. D-109's sentence "with nothing read of the body" is not exact for the four POST routes.**
`foundations/decisions.md:2272-2273`. By D-104 and the plan the guards (Origin, `application/json`, 16 KiB and the parse into an object) run before the session, so a body that is no JSON or is over 16 KiB is answered 400/413/415 to a player too, before the role is looked at (probe: a player's request with a foreign Origin gets 403 `Invalid request origin`, not `owner-forbidden`). What the code and the test hold is that the *fields* of the body are not read before the role (`owner-routes.ts:32-47` reads nothing of `request.body`; `tests/owner-routes.test.mjs:423-460` tests five bodies, the wrong-typed one among them). The decision's "complies" line says "before it reads the body", which only the fields satisfy. The code is right; the sentence of D-109 is the foundation step's and could say "before the fields of the body are read". Not blocking; for the review of the foundation.

**M-5. `src/server/owner-routes.ts:66-72`: the type of `run` is `{ outcome: string; accountId?: string }`, which throws away the union types of the database's outcomes.**
`operationRoute` compares `result.outcome` to the strings `"unknown"` and `"owner"` and looks the event up in a `Record<string,string>`; a misspelled outcome or event key compiles. The tests catch a wrong event name (executor's M11, and my own runs), so the cost is low. Structure below the threshold of the rule of size: Minor.

## Judgment of the executor's choices

1. **Address that is no address answered 404 `unknown-account`, not 400:** accepted. The body is exactly `{"email": <string>}`, which the plan answers with the operation; D-137 and D-400 say 404 "where no account has that address", and none has `""` or `no-at-sign`. The database is not asked, nothing changes, no line is written (`tests/owner-routes.test.mjs:854-882`). 400 `invalid-request` stays for every other body (`:884-927`).
2. **Normalization of the body address:** accepted; see M-3.
3. **The invariant:** its sentence is a single sentence, its fields are in the form of `.the-way/elements/invariants/template.md` (*Method* `test`, *Rests on* `none`, *Part* `account-server`, *Violated* `no`), and it is cited by `// invariant: owner-panel-authorization` at three tests (`tests/owner-routes.test.mjs:427`, `:466`, `:532`), each seen failing by my mutations. Against row 8 word for word it is incomplete: I-1. *Derives from*: M-1.
4. **`coding-http-application.md`:** read whole; `owner-routes.ts` follows both rules; the list omits the file: M-2 (a Minor defect, not a thing this change had to fix).
5. **`foundations/decisions.md`:** `git diff --stat` and the diff show two lines changed in the file (`:2275` D-109 and `:3091` D-137 *Verification*), each adding only `owner-panel-authorization` to the invariants list. Nothing else of the file changed. The handoff's two foundation entries D-410 and D-411 are unchanged.

## The foundation entries the change writes, against the code

- `foundations/invariants.md:728-736` — I-1, M-1.
- `foundations/part_map.md:74` — `tests/owner-routes.test.mjs` added to *Files* of `account-server`; the file exists and `foundation_check.py` reports 0 errors. Correct.
- `foundations/decisions.md:2275`, `:3091` — correct as to the invariant named; see M-4 for a sentence of D-109 outside this change.
- No changed invariant test (the existing test files are untouched: `git diff --stat` shows `tests/owner-routes.test.mjs` as the only test file).

## Crafted input, at each place the change reaches the trust boundary

Everything below was sent over real HTTP to the built server of the head commit, with real SQLite, from my probe `reports/review-4-evidence/probe.mjs`; the output is `reports/review-4-evidence/probe-out.txt`. Accounts: one owner, one player, one victim. In addition the executor's 13 tests run and pass (below) and I read the whole test file.

| Request | Answer |
|---|---|
| player session, POST `/api/owner/block` with the good body | 403 `owner-forbidden`, no-store, JSON |
| player session, GET list | 403 `owner-forbidden` |
| player session, foreign Origin | 403 `Invalid request origin` (guards before the session, as D-104 and the plan order) |
| player session, upper-case path `/API/OWNER/BLOCK` | 403 `owner-forbidden` (Express is case-insensitive; the route still gates) |
| player session, trailing slash `/api/owner/accounts/` | 403 `owner-forbidden` |
| player session, HEAD list | 403 |
| player session with an `?email=` query on the POST | 403 |
| two cookies in one header, player first, then owner first | 403, then 200 — the first cookie of the name decides, as the session middleware reads one cookie; no cookie can raise a player's session to an owner's |
| owner, body `{"__proto__":{"email":"..."}}` | 400 `invalid-request` |
| owner, duplicate keys `{"email":"x@y","email":"victim@..."}` | 200 `blocked` (the last key wins, as `JSON.parse` does; one email field remains, so the "exactly the address" rule holds; no other authority comes of it) |
| owner, address `VİCTIM@example.test` (dotless-I upper case) | 404 `unknown-account` (no Unicode folding to another account) |
| owner, `Content-Type: application/json; charset=utf-8` | 200; `application/jsonx` → 415 |
| owner, a 40 KiB body | 413 |
| owner, GET list with a foreign Origin | 200 (a GET is no state change; D-104 guards the state-changing routes) |
| owner, OPTIONS on `/api/owner/block` | 200 `POST` (Express's automatic answer; no information, no change) |
| owner, block of its own account | 409 `owner-not-blockable`; the three accounts' blocked/role/privilege unchanged |
| owner, block of the victim | 200 `blocked`; only the victim's blocked mark changed |
| owner's account blocked by the command, then its session | 401 `unauthenticated` |

The tests of the file (read whole) hold the rest of the list in the handoff: no cookie, forged key, unsigned, unknown, an account identifier as the cookie, removed, expired, blocked-owner sessions on all five routes (`:462-516`); a player on all five routes with five bodies, nothing read of the body, state compared before and after (`:423-460`); the role taken and given by a second connection, with sessions the server's own store wrote, and the stored session holding no role (`:528-635`); the 409 for another owner's account, the caller's own account and an address with padding/upper case, and for a role given by a second connection between the checks and the write, through a hook before `blockForPanel` (`:637-699`); the block ending every session of the target and stopping its links, a bystander untouched, an unblock restoring none, one line per change with the target's number only and no address, nothing for an unchanged state (`:701-780`); the grant and revoke on a player and on owners (`:782-852`); five unknown addresses on four routes (`:854-882`); ten non-conforming JSON bodies and four non-object bodies (`:884-927`); five bad Origins, four bad media types, broken and empty bodies, 16 KiB + 1 byte (413) and exactly 16 KiB passing the guards, with and without a session, and four transport faults on all five routes (`:929-1039`); 503 where accounts are unconfigured, GET/PUT/DELETE/PATCH of the four routes and POST/PUT/DELETE/PATCH of the list answered the JSON 404 and changing nothing (`:1041-1102`); `"role":"owner"` in `GET /api/account` and the login for an owner and no `role` for a player, in the registration too (`:1104-1165`).

The role is read from the database at each request: `sessionAccount` (`src/server/account-routes.ts:84-91`) loads the account by the session's identifier with `findAccountById` at every call and `ownerOnly` (`owner-routes.ts:32-47`) tests `account.role` of that row; no role is written to or read from `request.session`. The store refuses any key but `accountId` and `cookie` (executor's report; see its reach into `session-store.ts`), so a role could not be kept there. An unknown stored role: the schema step has `CHECK (role IN ('player','owner'))` (`src/server/database.ts:181-186`) and `accountFromRow` throws on any other value (`:382`), so the request would fail (500, no owner served); I read this and did not run it.

Order of checks held: transport → Origin/media/size/JSON guards → session → role → body → operation. The player's session gets 403 with nothing changed. The owner blocking its own account gets 409 with the session intact (the same cookie is served 200 on the next request of the probe, the block of the victim). The privilege granted to an owner: tests `:836-838`.

The panel's log events: read the lines the tests capture (`:738-762`, `:831-850`): `{"event":"account-blocked","accountId":<target>}` and the three others, one per change, none for `already-blocked`, `not-blocked`, `already-granted`, `not-granted`, unknown or 409; the log text holds neither the acting owner's number nor any address. Matches D-252.

## Mutations (rebuilt before each, restored after; the checkout of `src` in my worktree was clean at the end)

Script `reports/review-4-evidence/mutate.mjs`, output `reports/review-4-evidence/mut-out.txt`. Each: build exit 0, then `node --test tests/owner-routes.test.mjs` exit 1 (a failing test = killed).

| # | Mutation | Test exit | Failing test(s) |
|---|---|---|---|
| m1 | role check dropped from `GET /api/owner/accounts` | 1 | the player-403 test; the role-per-request test |
| m2 | dropped from `POST /api/owner/block` | 1 | the player-403 test; the role-per-request test |
| m3 | dropped from `POST /api/owner/unblock` | 1 | the player-403 test |
| m4 | dropped from `POST /api/owner/grant-previous-save` | 1 | the player-403 test |
| m5 | dropped from `POST /api/owner/revoke-previous-save` | 1 | the player-403 test |
| m6 | the role read once per account and remembered | 1 | the role-per-request test |
| m7 | the body parsed (fields checked) before the role check | 1 | the player-403 test |
| m8 | the panel blocks an owner (`blockAccount` for `blockForPanel`) | 1 | the 409 test |
| m9 | `account-routes.ts` answers `"role":"owner"` for everyone | 1 | the answers test |
| m10 | a field (`id`) added to each entry of the list | 1 | the list test |

Every mutation fails at least one test. The invariant-citing tests catch m1–m7. (m8 is caught by a test that does not cite the invariant: I-1.)

## Declined to judge

- The browser view (slices 5 and after): nothing of it is in this range.
- The skill `loop2-deploy` and the `account-role` command's text: other slices.
- Rate limiting of the owner routes: the task and D-137's accepted risk (five accounts, all the human's) do not ask for it; considered and set aside as outside the task.
- The gap between the role read in `ownerOnly` and the operation's own transaction (a role taken in between lets one request already past the check finish): D-410 promises "holds from the next request", not within a request; the plan's contract reads the role per request. Set aside as inside the stated contract; the block of an owner is checked in the block's own transaction, which is where it matters.
- The Minor findings of earlier reviews: named as not part of this slice by the handoff.

## Checks run

All from the worktree root `the task's worktree` unless noted.

| Check | Exit |
|---|---|
| `git rev-parse HEAD` → `a3bb2bf6ac21e1a720916a296cd9bf6447c3922a`; `git log 276b4289..a3bb2bf6` one commit | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/http.test.mjs` (95 pass, 0 fail) | 0 |
| `npm test -- tests/transport.test.mjs` (12 pass, 0 fail) | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (`0 errors`) | 0 |
| `node --test tests/owner-routes.test.mjs` in my working copy of the head (13 pass, 0 fail) | 0 |
| `npm run build` in my working copy | 0 |
| my probe `node scripts/probe.mjs` (table above) | 0 |
| ten mutations (table above): build 0, test 1 each | see table |

Not run: `npm test -- tests/owner-routes.test.mjs` through the product's runner `scripts/test.py` in the reviewed worktree — I ran the same file with `node --test` in my copy of the head; and the product's full gate (the cycle's own run, not repeated). `npx prettier` and `npx eslint` on the four files: not run by me (the executor reports exit 0 for both; not a check of the slice's *Checks* list).

## Reach beyond the handoff

- `src/server/account-policy.ts:83-88` (`normalizeEmail`): to know what "written as no address" returns (`null`) and judge choices 1 and 2.
- `src/server/account-routes.ts:70-110, 165-185` and the diff of the whole file: `refuse`, `sessionAccount`, `stringFields`, the prelude; to compare the exports with the unchanged behaviour.
- `src/server/app.ts:20-140` whole: where the session middleware and the error handler stand relative to the new router (the status of a bad body: 400/413/415 JSON).
- `src/server/database.ts:480-560` and `:800-942`: the operations the routes call; read where the handoff gave the file whole, so this is no reach beyond it, but I read `:1-60` and `:175-190` only for the types and the schema step of the role.
- `foundations/invariants.md`: the entries `account-session-authorization`, `account-mutation-request-guards`, `blocked-account-access`, `player-server-session`, `unblock-restores-no-session`, `unblock-restores-no-link`, `player-save-isolation`, each read whole (the executor read some to their *Part* lines only).
- `foundations/decisions.md:2180-2200` D-104, `:2266-2296` D-109, `:3082-3103` D-137, `:6248-6318` D-252, `:10700-10716` D-400, `:10894-10936` D-410 and D-411: read whole.
- `.the-way/elements/invariants/template.md` (first 80 lines: form of an entry, the method and the sentence): to judge the invariant. Not whole (the file continues on what a sentence may join and on the grading; I read to the start of "The sentence" and no further).
- `guidelines/coding.md` whole, `guidelines/coding-http-application.md` whole.
- `.runs/task-cycles/panel-wlasciciela/plan.md:30, 165` (grep of "invariant" in the plan; the lines read): to find row 8's wording as the plan keeps it.
- `the author's own rule file on scripts`: read before writing my scripts (instructions of the user).

## Working copies

- `.runs/review-4/wt` (a worktree of `a3bb2bf6`, with a junction `node_modules` to the reviewed worktree's own): removed. The junction was removed first with `rmdir` (the target's `node_modules` is intact; verified by `ls`), then `git worktree remove --force` and `git worktree prune`. `.runs/review-4/` itself removed. No remainder.
- Kept in `.runs/task-cycles/panel-wlasciciela/reports/review-4-evidence/`: `probe.mjs` and `mutate.mjs` (their import and file paths point to `../wt/` of the removed copy; to rerun, recreate the worktree of `a3bb2bf6` at `.runs/review-4/wt`, build, and run from `.runs/review-4/` with the scripts in `scripts/`), `probe-out.txt`, `mut-out.txt`.
- No screenshot made; the change has no user interface.

## Unread material

- `foundations/decisions.md`: D-202 (`:4381-4410`) not read (the handoff named it in its table; the decision "Who can create and use a player account" matters here only through the new account having the role `player`, which slice 2 and the registration test hold); D-12 and D-280/D-281 (named in "Decisions in play") not read — they bear on the browser slices and the human running the command.
- `.the-way/elements/invariants/template.md`: lines 1-80 of the file read; the rest (the rules of a sentence's joining, of `Rests on` and of the grading) not read.
- `src/server/database.ts`: read `:480-560`, `:800-942`, and `:1-60`, `:175-190`, `:340-400`; the other schema steps and the rest of the file not read.
- `src/server/transport.ts`: `mutationGuards` (`:61-102`) and the callers read; the rest not read (`clientAddress`, `trustProxy`, `singleHeader`), which the tests of `tests/transport.test.mjs` hold (that file ran green).
- `src/server/log-line.ts`: not read; the lines its `writeEvent` writes are read from what the tests capture.
- `tests/http.test.mjs` (5987 lines): not read; the checked-in file is untouched by the range, and I ran it (95 pass).
- `.claude/skills/the-way-record-invariant/SKILL.md` and `.claude/skills/the-way-update-part-map/SKILL.md`: not read; I judged the invariant against `.the-way/elements/invariants/template.md` and the part-map line against `foundation_check.py`'s result (0 errors).
- The executor's evidence files (`red.txt`, `green-final.txt`, `mutations.txt`, `mutate.py`): not read; I made my own runs.
- `guidelines/testing.md`: not read whole by me; I judged the tests on the rule of review-change ("fail when the behaviour breaks and do not compute their own expected value"), which my ten mutations and the explicit expected values in the test file support. This is a gap against the dispatch's *Read* list: the handoff's slice *Read* names `guidelines/testing.md`, and the dispatch of the reviewer asks it read whole; I did not.

## Searches not found or unclear

- The executor's report names the invariant's *Derives from* as "as the handoff gives" (`D-109 · D-137`); I could not find, in the files of the slice (`plan.md:30`, `:165`), where the *Derives from* list was fixed. Unclear whether the foundation step's handoff or the plan settles it (M-1).
- I looked for a mention of `owner-routes.ts` in `guidelines/coding-http-application.md` and in the part map's files of the guideline: found only in `foundations/part_map.md:74` (the test file). The guideline's own table has no row for the source file (M-2).
- I looked for a statement that the panel's routes normalize the body address in D-137, D-400 or D-410: not found (M-3).
- I looked for the clause "the server refuses to block an owner" in any invariant: not found (I-1).
- I could not exercise "an unknown stored value" of the role at run time, because the schema's `CHECK` stops one being stored; read only.
