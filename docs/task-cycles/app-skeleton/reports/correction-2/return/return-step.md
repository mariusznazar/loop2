# Return step R2 — correction 2 (task/app-skeleton) — one UNAPPROVED proposal

Agent R2 (fresh, Claude Opus 5.5), task-cycle step 11 (WAY-11, WAY-126), correction 2 only.
Read-only except this directory; no gate, no `npm test`, no commit. Nothing here is approved.

- Worktree `C:\Storage\repos\loop2-skeleton`, branch `task/app-skeleton`; the-way checkout and
  gitlink both `96c52488752701ffa321ca69c0c2aa2dd3e46d2d`. Merge-base with main `91ee59e`.
- Range read: `0b96e9e..031b0a6`. Dispatched at `3af85d1`; **HEAD moved to `031b0a6`** during
  this step ("test: require the expected type errors in the build output check", only
  `tests/invariants/test_application_build_output.py`). Not yet in `cycle.md`'s event log.
- Code evidence: `99ed33f` (foundation entries), `aa2c621` (two checks), `3af85d1` (server redo),
  `031b0a6` (tightened build-output check).

Files:

| File | Holds |
|---|---|
| `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-2\return\return-step.md` | this report |
| `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-2\return\UNAPPROVED-proposed-foundation-against-031b0a6.patch` | the one proposed foundation change, UNAPPROVED, against `031b0a6` |
| `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-2\return\proposal-pl.md` | the proposed entry whole with its Polish translation; the questions of this step in Polish |

Read: task-cycle SKILL.md (steps 4–14, correction); WAY-11, 36, 44, 62, 97 (via rules.md), 114,
126; `elements/common/way_of_working.md`, `rules.md`, decisions template (binding sentences),
part-map skill; the-way glossary (*foundation*, *part*, *part map*); all of `foundations/` at
HEAD; `cycle.md`; correction-1 `return-step.md` and `proposal-pl.md` (T5–T7); correction-2
`review-comment.md`, `foundation-step.md`, `check-author.md`, `break-author.md`, `redo.md`;
the definition's projected entries for serving, address, deployment and the related invariants;
`git diff 0b96e9e..HEAD`; both new checks; `tests/http.test.mjs`; Express 5.2.1
`application.js` `listen` and `finalhandler` in `node_modules`.

---

## 1. Projected entries the code makes true (question 1)

**None beyond what `foundations/` holds.** The redo changed only `src/server/app.ts` and
`src/server/main.ts`; browser code, build script, package files are unchanged since correction 1.

| Projected entry | At HEAD | Why |
|---|---|---|
| "What serves the built game and account requests in the container?" | part, already written as D-05/1 | still no container and no account routes |
| `loop2-one-serving-process/1` | part, already written | same: "in the loop2 container", "account and save" not made true |
| `loop2-api-error-route/1` | whole, already written | `app.ts` `app.use('/api', …)` before `express.static` |
| "What public address do the game and account server share?", `loop2-shared-public-origin/1`, `saved-state-http-exchange/1` | no | `src/browser/main.ts` sends no request; no HTTPS origin |
| "Where does the MVP run?", `loop2-container-isolation/1`, `loop2-distinct-address/1`, "How does a change reach the server?" | no | no deployment file, no container |
| every other projected decision, invariant, term, fact | no | as correction 1 §1.4; the redo adds no account, session, store, email or game code |

No task goes back to the foundation step from this range.

## 2. Did the redone server change behaviour? (question 2)

Compared `git diff 0b96e9e..HEAD -- src/` with the old files and Express 5.2.1's code.

| Behaviour | Before (`0b96e9e`) | After (`3af85d1`) | Bound by | Route |
|---|---|---|---|---|
| `/api`, `/api/`, `/api/...`, any method | 404 JSON `{"error":"Not found"}` | same | `loop2-api-error-route`, `tests/http.test.mjs:65-75` | none |
| static files from `dist/public`, found from the module, any cwd | same | same (`publicDirectory` moved to module level) | `loop2-one-serving-process` check (serves every file); `tests/http.test.mjs` | none |
| **non-API path that matches no file** (also traversal/malformed paths that `serve-static` falls through) | 404 `text/plain` `Not found` (explicit handler) | 404 from Express's `finalhandler`: `text/html; charset=utf-8`, body `Cannot GET <encoded path>`, headers `Content-Security-Policy: default-src 'none'`, `X-Content-Type-Options: nosniff` | only `tests/http.test.mjs:77-99` (404, not JSON, not the home page); README "zwykłe 404" still true | **left free by the human (T6.2 "nie utrwalamy zwykłego 404 poza `/api/`")** — no proposal |
| occupied address at start | stderr `Failed to start Loop at http://127.0.0.1:3000: <message>`, exit code 1, no readiness line | stderr `Loop could not start on 127.0.0.1:3000: <code> <message>`, exit code 1, no readiness line | only `tests/startup.test.mjs:29-31` (exit code, regex for address and `EADDRINUSE`) | deferred `account-server-occupied-address` (§4); no proposal |
| server `error` event after a successful listen (e.g. an accept failure) | swallowed: Express 5 wraps the callback in `once` (`application.js:601-604`), the second call is a no-op | prints the "could not start" line and sets exit code 1 while the process keeps serving | nothing | within the request; a misleading message, no rule. Note for the code reviewer, not the foundation |
| readiness line | `Loop: http://127.0.0.1:3000` | same | `startup.test.mjs`, checks' helper | none |

Unchanged, not introduced by the redo: no error handler, so with `NODE_ENV` unset a 5xx error
that reaches `finalhandler` returns `err.stack` to the client (`finalhandler/index.js:160`). True
at `0b96e9e` too. Belongs to the deployment task (D-02's rationale leaves error responses to the
API design); no proposal here.

- **New rule or decision:** none. The redo is a different expression of the same rules.
- **Behaviour with no invariant:** the non-API 404 shape (left free by T6.2); the startup
  message and exit (deferred, §4).
- **Environment fact:** none. `main.ts` now relies on Node's `listening`/`error` events instead of
  Express's callback wiring — how the code reaches a behaviour, not a condition any entry rests
  on. The tightened check (`031b0a6`) relies on TypeScript's message text
  `Cannot find name '<name>'`: a fact about what runs a method, which no entry rests on
  (environment-facts template) — routed as a check assumption (R2-4).
- **Term:** none. "the built game" is used in one meaning in D-05, `loop2-one-serving-process`
  and `loop2-api-error-route` (what the build produces for the browser). The new check adds
  "every such file is served", which is a rule, not a meaning — a definition holding it would carry
  a rule (WAY-96) → check assumption R2-4(a).
- **Part-map change:** none beyond the two check files already placed (R2-5).

## 3. Choices K1–K9 (question 3)

Step 11: a choice whose cost reaches beyond the request becomes a foundation proposal when it
still binds after the merge (WAY-36), otherwise a question under *To decide*.

| ID | Reaches beyond the request? | Binds after the merge? | Route | Exact question / note | Cost if wrong |
|---|---|---|---|---|---|
| K1 | no | it is a transcription, not a choice | within the request | none. Record fix: invariants have no *Approved by* field, so K1 applies to D-04..D-07 only, not to the two invariants it names | — |
| K2 | yes | yes — D-06's *Verification* on main | **To decide R2-2** (field already written; the human accepted D-06 with *Verification* `application-build-layout · application-build-output`, the written field names only the second) | "D-06's first sentence (one npm package and lockfile; separate compilation configurations and output directories) is verified by no invariant until application-build-layout is written. Accept D-06's *Verification* as written, or add a level-2 example pair now?" | a second `package.json` or lockfile passes every check; only a reviewer reading D-06 catches it. The build-output check covers the other half by accident of its literals (§5) |
| K3 | yes — the runtime check stays read-only after the merge | yes, as an invariant test | **To decide R2-3** | "Your T7 answer accepted the assumptions in the checks; it did not answer panel question 4. We kept the ~120 unexercised deployment-parsing lines of `test_account_server_runtime.py`, against the recommendation to cut them. Keep or cut?" (Q5, no fact, matches the recommendation — no question.) | keep when cut was meant: dead code with a known false-pass hole on main, reached only after the deployment task relaxes the tripwire; cut later = invariant-test change with a new break |
| K4 | no | no | within the request | limitation in the request: history of `src/server` stays readable in the repository | — |
| K5 | no | no | within the request | `application-build-output` is new (accepted T6), not projected; WAY-126 asks the redo for projected invariants only. Build code predates its check; the breaks show the check bites | — |
| K6 | no | no | within the request | — | — |
| K7 (D-05 *Rationale* "must") | no | the wording binds nothing: rationale is prose, and the template's "normative words only in binding sentences" is itself `TODO — decision pending` | within the request; **no question needed** | Recommendation: drop from *To decide*; the text is the gate's approved wording (WAY-126) | — |
| K7 (product-foundation sentence) | yes | yes — a part's binding sentence on main | **foundation proposal R2-1** (patch) | WAY-97 (rules.md "Terms of the glossary") requires the term, never a paraphrase; "the product rules and the map of its responsibilities" paraphrases the-way's *foundation* and *part map* | leaving it: the uses of *foundation* miss this sentence, and the first accepted part sentence breaks a the-way rule no guard catches |
| K8 | yes | yes, read-only check | **To decide R2-4(a)** | see R2-4 | a later build output not meant to be served (source map, build-info file) fails the check; that task must return to the foundation step |
| K9 port wait | no | no | within the request | T7 accepted the fixed port; a parallel run fails loudly | — |
| K9 POSIX branch | yes | yes, read-only check | **To decide R2-4(e)** | see R2-4 | first Linux run (e.g. a CI workflow) may fail on `ps`/`lsof` output never seen; fixing it is an invariant-test change. It fails, never passes falsely (`lsof` missing raises, `test_loop2_one_serving_process.py:118-119`) |

## 4. Deferred by the human (question 4)

Comment 6002054885, T6: "application-build-layout, public-file-boundary i
account-server-occupied-address później". Confirmed:

- none of the three is in `foundations/` at HEAD (`invariants.md` holds seven entries, these are
  not among them), and none is in this step's patch;
- they never reached main, so no withdrawn-identifier row is due (rules.md);
- they are **later work, not proposals of this request**: the request should list them under
  later work with a link to their last text (correction-1 `proposal-pl.md`, Part C, in record
  commit `5928e7b`), not under *To decide*;
- **gap:** no backlog entry holds them (searched `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\`
  for the identifiers: nothing). The cycle may write only its own task entry in the backlog, so
  the request should ask the human to add one task, or they live only in a record commit.

What guards each behaviour meanwhile:

| Deferred entry | Guard today | Shown weak by |
|---|---|---|
| application-build-layout (one package and lockfile; separate configurations and output directories) | D-06's first binding sentence, with no check and no level-2 pair (R2-2). Incidental: `test_application_build_output.py` names `tsconfig.browser.json` → `dist/public` and `tsconfig.server.json` → `dist/server` as literals and requires each configuration to reject the other's source, so merged configurations or one output directory fail it. Nothing checks "one package and lockfile" | — |
| public-file-boundary (static files only from the built public directory, any working directory) | ordinary `tests/http.test.mjs:17-28, 86-99` (other cwd, traversal); account-server's *Trust boundary* `src/server/**` sends changes there through adversarial review (WAY-48). The one-serving check proves the converse only (every built file is served) | — |
| account-server-occupied-address (non-zero exit, no readiness line) | ordinary `tests/startup.test.mjs:29-31` only | the redo reworded the message freely and only the ordinary test's regex held it: exactly the cost the human accepted |
| (T6.2) plain 404 outside `/api/` | ordinary `tests/http.test.mjs:77-84` (404, not JSON, not the home page) | the redo changed it from `text/plain` to Express's HTML 404 — allowed |

## 5. Foundation compared with the code (question 5)

| Entry or field | Code at HEAD | Verdict |
|---|---|---|
| D-05/1 binding sentences | `main.ts` one `listen` in one process; `app.ts` `/api` JSON 404 before `express.static` | match |
| D-05 *Rationale* "must set static-file and fallback rules carefully, including cache policy" | redo removed the explicit fallback (Express default 404 now); `express.static` defaults, no cache policy | prose, binds nothing; non-API fallback left free by T6.2; cache policy noted for the deployment task (as correction 1 §3.6) |
| D-05, D-06, D-07 *Scope* | D-05 in `src/server` + `start` script; D-06 in tsconfigs, `package.json`, `scripts/build.mjs` and both source trees; D-07 server only | match |
| D-06/1 | one `package.json`/`package-lock.json`; `tsconfig.browser.json`, `tsconfig.server.json`; `dist/public`, `dist/server`; `scripts/build.mjs` compiles both | true; first sentence unverified (R2-2) |
| D-07/1 "computes nothing of the game" | server serves files and a JSON 404 | true (only by absence of a game, as the human accepted at T4) |
| `loop2-one-serving-process/1` *Part* `every` | a second process could come from a deployment file no part holds | match |
| `application-build-output/1` *Part* `build-tools · browser-view · account-server` | breaks touch `scripts/build.mjs`, `package.json`, server sources; nothing in agent-workflow or product-foundation can make it false | match |
| part account-server: *Files*, *Depends on* `browser-view · build-tools`, *Trust boundary* `src/server/**` | `app.ts` serves browser-view's built output; its tests run `npm run build`/`npm start`; `app.ts` takes untrusted HTTP | match |
| part build-tools: *Files* incl. `test_application_build_output.py`, *Depends on* `browser-view · account-server` | the check tests the build script and configurations (WAY-44) and writes probes into both source trees in a copy | match |
| part product-foundation sentence | `foundations/**` | true, but paraphrases two the-way terms → R2-1 |
| two check files' placement (account-server, build-tools) | WAY-44: tests belong to the part they test | correct; written without being shown to the human → R2-5 |

Guards (read-only, from the repository root, at `031b0a6`): part map `--base 91ee59e…` exit 0,
0 errors, 1 unchecked (no dependency-graph command). On a scratch clone at `031b0a6` with the
patch applied: part map exit 0, 0 errors, same 1 unchecked. Other guards not run by this step
(files unchanged since the foundation step's runs at `99ed33f`). Gate and `npm test` not run
(instruction). A check that did not run is not a pass.

## 6. Proposal (one current version)

`UNAPPROVED-proposed-foundation-against-031b0a6.patch` — `git apply --check` exit 0 at
`031b0a6`:

- **R2-1** part `product-foundation`, binding sentence
  "The part holds the product rules and the map of its responsibilities." →
  "The part holds the product's foundation."
  (*foundation* already covers the part map, which is an element of it.) No entry references the
  sentence; no other field changes.

Under step 11 this proposal goes to the panel as a foundation change (WAY-11), and it is a set
for the human, so a critique first (way_of_working). Nothing else is proposed.

## To decide (from this step; Polish in `proposal-pl.md`)

- **R2-1** Accept the product-foundation sentence "The part holds the product's foundation."?
  Recommendation: accept (cheap, before the merge).
- **R2-2** (K2) Accept D-06's *Verification* as written (only `application-build-output`), leaving
  "one npm package and lockfile" unchecked until application-build-layout is written?
  Recommendation: accept; the layout invariant is the human's later work anyway.
- **R2-3** (K3) Panel question 4, unanswered: keep or cut the unexercised deployment parsing of the
  runtime check? Recommendation: unchanged from correction 1 — cut, with the tripwire kept; or
  accept "keep" explicitly. Not blocking.
- **R2-4** Accept the assumptions written into the two new checks?
  (a) "serves the built game" = every file the build puts in `dist/public` is served byte-identical
  at its path, and `/` returns one of its HTML files (K8);
  (b) "one process" = in the tree `npm start` starts, exactly one process listens on port 3000, no
  process of that tree listens on another TCP port, and the listener starts no process of its own
  — so a later server that spawns a helper process (a backup, a migration) fails it;
  (c) the build check names `tsconfig.browser.json`/`src/browser`/`dist/public` and
  `tsconfig.server.json`/`src/server`/`dist/server` as literals: renaming any fails it;
  (d) since `031b0a6`, the failed cross builds must print TypeScript's `Cannot find name '<name>'`
  (relevant to the TypeScript 7.x trial, T8);
  (e) the POSIX branch (`ps`, `lsof`) of the one-process check has never run (K9).
  Recommendation: accept all; each fails loudly, never passes falsely.
- **R2-5** Confirm the placement written without being shown: `test_loop2_one_serving_process.py`
  in account-server, `test_application_build_output.py` in build-tools (WAY-44; your T5 answer was
  told only that the file must go to some part). Recommendation: confirm.

## Notes for the orchestrator

- `031b0a6` changes an accepted invariant check after its break runs (`break-runs-1/` ran the
  `aa2c621` checks). The two application-build-output breaks against the tightened check are
  unchecked until rerun; record the commit and who reviewed it in `cycle.md`.
- Deferred items: give them a home (request "later work" + a backlog task the human adds), §4.
- K7 (D-05 "must"): suggest dropping it from *To decide* (§3).
