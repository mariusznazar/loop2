FAIL 3cbb129f2ada47c7fd2f8669d603142884b7b4c4

Independent review of slice 2. Blocking: 1 Important, 0 Critical. Minor: 0. Out of scope: 0.

Reviewed range: `7ef74576ead2668803396403110efe9616e31b51..3cbb129f2ada47c7fd2f8669d603142884b7b4c4`.
Worktree: `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`.
The checkout and gitlink both name process `574a37b9ab9572f876298f4cc10754581222d3f0`.
The tracked tree was clean before and after review. No product file, index, branch, foundation entry or cycle.md was changed. No cycle.md was read.

## Blocking findings

### 1. Important — Reject cookie values that the real package cannot use

**Thread:** new. **Scope:** slice 2, persisted-session trust boundary.

**Kotwica:** [src/server/session-store.ts:51](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/src/server/session-store.ts:51). Related checks: [src/server/session-store.ts:49](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/src/server/session-store.ts:49), [src/server/session-store.ts:100](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/src/server/session-store.ts:100), [src/server/database.ts:178](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/src/server/database.ts:178).

**Do wklejenia:** Magazyn przyjmuje spreparowane metadane ciasteczka, których sama biblioteka nie potrafi użyć: ścieżkę `/;bad`, domenę `bad domain` oraz liczby `Number.MAX_SAFE_INTEGER` w terminie wygaśnięcia rekordu lub `originalMaxAge`. Każdy z tych zapisów przechodzi przez `Store.load`, po czym rzeczywiste `Cookie.serialize` rzuca błąd, w ostatnim przypadku po `Session.touch`. Sprawdź poprawność wartości dla biblioteki, także po zastąpieniu daty terminem z bazy i przy odnawianiu, zanim magazyn zwróci sesję jako poprawną.

**Dlaczego to zgłaszam:** This adapter deliberately establishes a trust boundary between persisted values and express-session hydration. D-113, the new account-session-storage invariant and the kind guideline require valid cookie data before hydration. The current decoder checks that path/domain are strings and originalMaxAge is a positive safe integer; readSession checks only that the database expiry is a safe integer. Those tests do not establish that the values are usable by the selected library.

The installed cookie serializer rejects a semicolon in a path and a space in a domain. A safe JavaScript integer can also exceed the range of a Date: `Number.MAX_SAFE_INTEGER` is 9007199254740991, so converting that database expiry creates Invalid Date. The otherwise valid JSON date does not protect this path because get overwrites it from the row at line 100. The same maximum value in originalMaxAge survives the decoder and creates Invalid Date when the package's real Session.touch resets maxAge. Consequently the Store reports a successfully loaded identity and session whose cookie then fails in the package; the malformed data is not rejected at the boundary claimed by the invariant. This is an Important missed requirement and unreliable adapter contract. It is not a claim that a remote visitor can directly write the database, nor a claimed observed production incident.

Independent execution confirmed all four variants with a real temporary SQLite file, the actual Store.load, Session.touch and Cookie.serialize. All 357 existing Node cases passed in that execution; the four added review assertions failed for the described reason. This is one validation defect with four witnesses, not four separately counted findings. The existing crafted-payload test checks invalid JSON, shape, identity and a malformed JSON date, but does not exercise these values or the authoritative database date.

A fix should reject invalid serializer values and nonrepresentable dates, including a renewal lifetime that cannot produce a valid Date. It can reuse the installed serializer's validation, or validate its actual contract explicitly; it must preserve safe error delivery through the Store callback. The final cookie after applying the row expiry needs validation as well. Add refusal assertions at the existing storage boundary, with valid controls. This does not require moving the application's Secure/HttpOnly/host/lifetime policy into the Store. Leaving the code as it stands keeps the advertised rejection contract false and permits a loaded session to fail during cookie handling; correcting it adds bounded validation and regression cases in the already existing adapter test.

## Minor findings

None.

## Declined to judge

None. No candidate defect was discarded as outside the task. The verification limits below are evidence limits, not waived requirements or out-of-scope findings.

## Checks and evidence

### Commands executed by this reviewer

All commands below ran from the worktree above unless their command explicitly runs inside the disposable Linux container.

| Command / check | Exit or result | What it established |
|---|---|---|
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 each | Both identify the pinned process SHA above. |
| `git rev-parse HEAD`; `git status --short` | 0 each | Exact dispatched head; clean tracked tree. |
| `git log --oneline 7ef74576ead2668803396403110efe9616e31b51..3cbb129f2ada47c7fd2f8669d603142884b7b4c4` | 0 | One commit, Add SQLite account database and session store. |
| `git diff --stat`, `git diff --numstat` on that exact range | 0 each | Ten planned files, +981/-7, no extra path. |
| `git diff 7ef74576ead2668803396403110efe9616e31b51..3cbb129f2ada47c7fd2f8669d603142884b7b4c4 -- foundations guidelines` and full reads of all three new code/test files | 0 | Independent inspection of every changed line; the new files are entirely additions. Documentation was assessed separately from source and tests. |
| `git diff --check 7ef74576ead2668803396403110efe9616e31b51..3cbb129f2ada47c7fd2f8669d603142884b7b4c4` | 0 | No whitespace errors. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors. Does not establish semantic correctness of the new session invariant. |
| `Get-FileHash -LiteralPath '.runs/account-linux-inputs/product.bundle' -Algorithm SHA256` | 0 | Bundle hash `4d4f87dc79809ba1c1f97d2d91bb7ed261ec2a5165535b0818f7cf4bde9ed80a`, matching the supplied final source bundle. |
| `docker image inspect loop2-task15-slice2-verifier:latest --format '{{.Id}}'` | 0 | Image `sha256:8e72cda25a3761bbea54f7d4d595c9e3dea9ce9e3e2fd567cefc5af5d93a12d2`. |
| Disposable Docker command below, invoking only `npm test` for tests | npm test failed with four assertion failures; wrapper command returned 1 and container exit was 2 | Build succeeded. 361 Node cases ran: 357 pass, 4 fail, 0 skipped. Python and the npm-command foundation stage were not reached because Node failed. See the distinct wrapper error below. |
| `docker inspect loop2-task15-slice2-review-probe --format '{{.State.ExitCode}}'` | command 0; container state 2 | Confirmed the wrapper's final exit separately. |
| `docker rm loop2-task15-slice2-review-probe` | 0 | Removed only the review-owned stopped container and its disposable source. The task daemon and supplied verifier images were untouched. |
| Final `git status --short` | 0 | No product changes. |

The actual runner command was:

```powershell
$probe | docker run -i --name loop2-task15-slice2-review-probe --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' --entrypoint bash loop2-task15-slice2-verifier:latest
```

The supplied shell input cloned the supplied product.bundle to `/review`, checked out the exact review SHA, copied the cached verifier's `/workspace/node_modules` to that disposable checkout, appended the cases below to its existing account-storage test, and ran `npm test > /review-check.log 2>&1`. It then printed the build header, relevant failures and the Node summary. The Node build and test stage use the real locked dependencies, SQLite and the unchanged product source. The reviewer did not run a single file or case separately and did not rerun the author's baseline full gate.

The PowerShell pipeline supplied a trailing carriage return in the wrapper's final `exit "$result"`. After npm had completed and the assertion evidence had been printed, Bash reported `exit: 1\r: numeric argument required`; Docker inspection showed wrapper exit 2. This wrapper failure is separate from the four demonstrated AssertionErrors. No claim of a successful full gate is based on that exit. No repetition was needed to establish the four already observed product failures.

Observed evidence:

```text
REVIEW EVIDENCE: invalid cookie path: hydrated, then option path is invalid
REVIEW EVIDENCE: invalid cookie domain: hydrated, then option domain is invalid
REVIEW EVIDENCE: unrepresentable database expiry: hydrated, then option expires is invalid
REVIEW EVIDENCE: unrepresentable renewal age: hydrated, then option expires is invalid
tests 361
pass 357
fail 4
skipped 0
AssertionError [ERR_ASSERTION]: Store accepted cookie data that fails in the actual package
true !== false
```

Complete appended reproduction, using the existing fixture/data/call helpers from the exact reviewed test file:

```javascript
for (const [label, change] of [
  ["invalid cookie path", (raw, payload) => { payload.cookie.path = "/;bad"; raw.prepare("UPDATE sessions SET data = ? WHERE id = 'one'").run(JSON.stringify(payload)); }],
  ["invalid cookie domain", (raw, payload) => { payload.cookie.domain = "bad domain"; raw.prepare("UPDATE sessions SET data = ? WHERE id = 'one'").run(JSON.stringify(payload)); }],
  ["unrepresentable database expiry", (raw) => { raw.prepare("UPDATE sessions SET expires_at = ? WHERE id = 'one'").run(Number.MAX_SAFE_INTEGER); }],
  ["unrepresentable renewal age", (raw, payload) => { payload.cookie.originalMaxAge = Number.MAX_SAFE_INTEGER; raw.prepare("UPDATE sessions SET data = ? WHERE id = 'one'").run(JSON.stringify(payload)); }],
]) {
  test(`review: malformed persisted ${label} is rejected before hydration`, async (t) => {
    const { store, raw, account } = await fixture(t);
    await call(store, "set", "one", data(account.id));
    change(raw, JSON.parse(JSON.stringify(data(account.id))));
    let accepted;
    try { accepted = await call(store, "load", "one"); } catch { return; }
    let invalid = false;
    try {
      if (label === "unrepresentable renewal age") accepted.touch();
      accepted.cookie.serialize("sid", "synthetic");
    } catch (error) { invalid = true; console.log(`REVIEW EVIDENCE: ${label}: hydrated, then ${error.message}`); }
    assert.equal(invalid, false, "Store accepted cookie data that fails in the actual package");
  });
}
```

### Manual code and document checks

- Traced initialization through BEGIN IMMEDIATE, schema creation/version update, COMMIT and rollback on failure. Existing version 1 is not reset. Unknown versions fail before pruning. Connection close on initialization failure is present. The uniqueness race uses separate actual worker connections and synchronized starts; SQL values are bound.
- Traced read expiry (`>`), touch expiry (`>`), monotonic MAX, account equality and update-only renewal. Deletion removes only the supplied ID. Delayed touch cannot create a row. Startup and periodic deletion use indexed expiry and a limit of 1000. The cleanup timer is unreferenced and cleared on close.
- Traced callback success/failure branches. Operation failures propagate; callback exceptions are outside the operation catch. No callback means an error event. Cleanup failures are observable without exposing row data.
- Checked actual express-session get/load/createSession, Cookie serialization and setters, Session.touch/save/destroy, and middleware shouldSave/shouldTouch. Under the specified resave=false and unchanged identity, ordinary requests use touch; fresh authenticated creation uses set. Set is intentionally an upsert and can insert after deletion, so the later HTTP assembly must preserve the documented distinction. No present defect was inferred merely from the existence of set.
- Assessed the new database-access and session-store exemplars and both guideline files against the pinned general/coding templates. Required fields, first-file designation, kind index rows, linked decisions and tests are present. The session exemplar has the validation defect above; no separate form/style blocker was found.
- Checked D-110/D-112/D-113, changed versioned facts, the two new invariants and the part-map ownership. The broad deployment/schema/SQLite and accounts-plus-saved-games obligations remain marked violated; the slice does not falsely clear them. The new account-session-storage claim is not fully supported because of finding 1.
- Reviewed all twelve storage integration cases and the author's plausible-fault analysis. They use actual persistence and package behavior and protect the principal races/failures; existing crafted-data cases miss the witnesses above. New invariant-citing tests are the two account-database-schema cases and the four account-session-storage cases, all in the new account-storage test file. No existing test was weakened by this slice.

### Supplied evidence inspected, not reviewer executions

Read the full author report. Inspected the exact-head identity and final summary in `15-slice2-final.log`: supplied full gate has 357 Node cases, 275 Python cases with three Windows skips, and foundation 0 errors. Inspected the mutation log's six AssertionError failures and the author report's exact six substitutions and restoration identity. This supports the reported fail-once/restoration history but was not independently reexecuted. The author's earlier development failures and constructor-type diagnostic remain author evidence; no claim that all historical commands passed is made.

### Unchecked / evidence limits

The reviewer did not rerun the unmodified full gate; the review's additional-case run stopped at Node failures. Python checks and the foundation stage inside that npm run were therefore unchecked, although the standalone foundation check was executed and passed. The supplied full Linux result is separately identified above.

The native Windows cases were not executed by this reviewer: `test_native_windows_readers_reject_nonterminating_cim_errors`, `test_native_windows_readers_keep_owned_child_in_healthy_observation`, and `test_failed_descendant_query_still_terminates_known_main_process`. The supplied Linux gate skipped them. The earlier Windows listener-enumeration baseline issue was not rerun.

No target image/server deployment, secret operation, named-volume replacement, password measurement, public-cookie journey, browser UI or saved-game persistence was exercised. These remain obligations of the task or its expressly retained future work; the local database checks do not establish them. This slice changes no UI, so no changed UI exclusion-return condition was triggered.

## Reads and reaches

Read both dispatches, the complete selected task/spec/plan passages in `15-slice2-selection.md`, and the author report. Read selected foundation entries whole, the complete coding/testing/http-application/database-access/session-store guidelines, the package and TypeScript configuration, installed express-session/typing package declarations and the materialized Store/Cookie/Session/middleware ranges. Searched only the named foundation-row identifiers in plan.md; did not read the whole task, whole plan or cycle.md.

Additional reaches:

- `node_modules/cookie/index.js:65-86` and `:200-238`: actual serializer restrictions for path/domain and Date, needed to test whether decoded metadata is valid for its consumer.
- `.the-way/product-guidelines/coding/SKILL.md`, `product-guidelines/template.md` and `product-guidelines/coding/template.md`: first-kind exemplar and required guideline form review, not a new guideline-refinement operation.
- `15-slice2-final.log` identity/summary and `15-slice2-mutation.log` AssertionError cases: verify author claims against recorded execution.
- `reports/linux-verification.md` and `.runs/account-linux-inputs/verify.sh`: existing isolated-runner ownership and command contract; no host socket or public daemon was introduced.
- Exact recorded primary sources: [express-session pinned README](https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/README.md) and [Node pinned SQLite API](https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/sqlite.md). They support the changed server-side Store/upsert/touch and synchronous SQLite/timeout/binding/close facts; the live installed runtime supplies the serializer evidence for finding 1.

The user review playbook and vault rulebook were read. The review changes only this report and returns to the orchestrator before fixes or any later stage.
