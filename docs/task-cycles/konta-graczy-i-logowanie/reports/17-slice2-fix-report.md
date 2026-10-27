# Slice 2 review fix

Status: done; final full gate passed. Stopped before the original reviewer's one re-review.

Worktree: `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`.
Reviewed base: `3cbb129f2ada47c7fd2f8669d603142884b7b4c4`.
Commits:

- `112033e4e61d2ff0f4d5d95c433ae5b69745d0c0` — Validate session cookies with the package serializer and renewal.
- `c85518a544f1a8c695195d6cb6f95235935c4c1a` — Declare the pinned Cookie serializer contract.

The process checkout and gitlink both remain `574a37b9ab9572f876298f4cc10754581222d3f0`. Nothing was pushed. The previous slice report remains unchanged. After the final gate, HEAD was confirmed as c85518a544f1a8c695195d6cb6f95235935c4c1a and git status --short was empty.

## Finding response

Important finding 1, “Reject cookie values that the real package cannot use”: fixed.

The adapter now calls the actual package Cookie.serialize on decoded metadata, then on a cloned cookie renewed with the same maxAge setter that Session.touch uses. The clone leaves the returned cookie's expiry and original lifetime unchanged. It repeats this validation after substituting the authoritative database expiry. Consequently both stored JSON and input to set/touch are checked, and a valid JSON date cannot hide an invalid date read from the database. Library validation failures become the fixed Error “Invalid stored session cookie” and use the existing Store callback/error paths.

This validates the library's accepted values without imposing HTTP policy. No Secure, HttpOnly, host, SameSite or 30-day policy moved into storage. The valid controls deliberately use a valid non-root path and a domain, confirming the adapter checks package compatibility rather than imposing the later host-cookie configuration.

The installed @types/express-session 1.19.0 omits the runtime Cookie.serialize method and describes originalMaxAge as nullable. The fix therefore adds only that exact method signature through declaration merging, backed by the pinned runtime source, and explicitly refuses a null lifetime before the renewal assignment. There is no runtime method replacement, library fork or dependency change.

## Regression and own-work evidence

Added two invariant-citing cases in the existing storage integration file, with seven named child variants. All seven child assertions failed against the reviewed product implementation before the fix. Node reports nine failures because the two parent cases also fail when their children fail.

| Case | Crafted input | Before fix | Fixed expectation |
|---|---|---|---|
| Persisted invalid path | `/;bad` | Missing expected rejection | Store.load rejects before package hydration. |
| Persisted invalid domain | `bad domain` | Missing expected rejection | Store.load rejects before package hydration. |
| Persisted unrepresentable renewal age | originalMaxAge = Number.MAX_SAFE_INTEGER | Missing expected rejection | Store.load rejects before real Session.touch could create an invalid Date. |
| Persisted unrepresentable database expiry | expires_at = Number.MAX_SAFE_INTEGER while JSON date is valid | Missing expected rejection | The final cookie after database expiry substitution is rejected. |
| Input invalid path | `/;bad` | Missing expected rejection from set | Both set and touch reject; no new record and no changed expiry. |
| Input invalid domain | `bad domain` | Missing expected rejection from set | Both set and touch reject; no new record and no changed expiry. |
| Input unrepresentable renewal age | originalMaxAge = Number.MAX_SAFE_INTEGER | Missing expected rejection from set | Both set and touch reject; no new record and no changed expiry. |

Each persisted variant has a valid control before corruption and after restoring the row. The control first renews the record to expiry 5000 while serialized JSON still carries expiry 2000, then verifies the loaded cookie uses 5000 and can be serialized both before and after the actual package Session.touch. Each input variant verifies a subsequent valid touch/load/renewal/serialization succeeds. The existing shape, expiry equality, monotonic touch, deletion, set identity and callback tests remain intact.

Weakest point checked: validating only the JSON date would leave the authoritative database expiry unchecked, and checking only the present cookie would miss overflow during renewal. The dedicated expiry and lifetime variants directly protect both paths. No setup failure is being counted as an assertion failure: the regression run built successfully and reached all seven Missing expected rejection assertions. The first attempted final run's type errors are reported separately below.

Plausible faults and catching assertions:

- Remove serializer validation: invalid path/domain are admitted; persisted and input refusal variants fail.
- Remove validation after database expiry replacement: the Number.MAX_SAFE_INTEGER record variant is accepted despite its invalid Date; its load rejection fails.
- Skip the cloned renewal: the large originalMaxAge variant is accepted; its load/set/touch rejection fails.
- Validate by mutating the original cookie: the valid control expecting database expiry exactly 5000 detects the changed returned expiry.
- Reject every domain/path to avoid serialization errors: the valid controls with domain example.test and path /accounts fail.
- Fail to use callbacks for ordinary SQLite errors or change session ordering while fixing validation: existing callback, busy-write, expiry and delayed-renewal integration cases remain part of every final npm test run.

## Commands and exits

All tests, including the deliberately failing regression run, used only npm test. Full logs sit beside this report. Commands ran in the task worktree unless their Docker script changes directory.

Common Docker argument block, abbreviated as COMMON below:

```powershell
--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly'
```

| Command | Exit | Evidence |
|---|---:|---|
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git rev-parse HEAD`; `git status --short` | 0 each | Correct pin, exact reviewed base and clean tracked tree at start. |
| `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie` | 0, each invocation | Rebuilt for reviewed source, first fix and final fixed HEAD. |
| `tar -cf .runs/account-linux-inputs/slice2-fix-red.tar tests/account-storage.test.mjs` | 0 | The new tests alone overlay the exact reviewed source. |
| `docker run --name loop2-task15-slice2-fix-red COMMON loop2-task15-slice2-verifier:latest bash /inputs/verify-slice2-fix-red.sh` | 1 | `17-slice2-fix-red.log`: npm test builds and runs 366 Node cases; 357 pass, seven child assertion failures plus two parent failures. Python/foundation stages were not reached. |
| `git ls-remote https://github.com/jshttp/cookie.git refs/tags/v0.7.2 refs/tags/v0.7.2^{}` | 0 | Cookie tag resolves to source commit d19eaa1a2bb9ca43ac0951edd852ba4e88e410e0. |
| `node node_modules/prettier/bin/prettier.cjs --write --no-config --no-editorconfig src/server/session-store.ts tests/account-storage.test.mjs` | 0 | Formatting only, no selected test route. Also formatted each file while preparing the change. |
| `python -B .the-way/elements/common/foundation_check.py` | 0, after foundation writes and before first fix commit | 0 errors on each execution. |
| `git diff --check`; `git diff --cached --check` | 0 | Checked the source/doc diff and each commit's staged changes. |
| `docker run --name loop2-task15-slice2-fix-final COMMON loop2-task22-verifier:latest bash /inputs/verify.sh 112033e4e61d2ff0f4d5d95c433ae5b69745d0c0 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 1 | `17-slice2-fix-final.log`: build fails because the package declarations omit serialize and allow a null originalMaxAge. No test assertion ran. This failure prompted the exact runtime method declaration and null guard, not any test change. |
| `docker run --name loop2-task15-slice2-fix-final2 COMMON loop2-task22-verifier:latest bash /inputs/verify.sh c85518a544f1a8c695195d6cb6f95235935c4c1a 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 0 | `17-slice2-fix-final2.log`: final exact-commit full gate passed; 366 Node tests passed, 275 Python tests completed with three native Windows skips, foundation check 0 errors. |

The red wrapper is an LF file, not piped PowerShell source. It clones the rebuilt bundle into /fix, checks out the reviewed commit, copies the cached verifier's installed dependencies, overlays only the new test file, logs the archive identity, then invokes npm test. Its exit 1 is npm test's expected assertion failure. The final verifier starts from a fresh clone with npm ci and the pinned quality environment and checks the product/process identities before the full command.

Source identities:

- Red test archive SHA-256: `937e6635074b4b1f36578984b188e4fdad2c039eb7e4ba244c1eaec2d7cb813d`.
- Final product bundle SHA-256: `118c8fae5fec48667fde502cd683ec00860e862f97f28246160432bbfbc59ac7`.
- Cached verifier used for the red run: `sha256:8e72cda25a3761bbea54f7d4d595c9e3dea9ce9e3e2fd567cefc5af5d93a12d2`, identified in the preceding report and review.
- The original LF verify.sh and the local daemon are the established isolated Linux harness; no target image or host Docker socket was substituted.

## Changed files and foundation consequences

| File | Added | Removed |
|---|---:|---:|
| src/server/session-store.ts | 21 | 0 |
| tests/account-storage.test.mjs | 124 | 0 |
| guidelines/coding-session-store.md | 8 | 0 |
| foundations/environment_facts.md | 12 | 0 |
| foundations/decisions.md | 1 | 1 |
| foundations/invariants.md | 1 | 1 |

Total: six files, +167/-2. The database implementation, manifests and all existing assertions are unchanged.

Applied the pinned element methods already read in the original execution. Added two versioned facts for the newly used runtime contracts; D-113's Based on and account-session-storage's Rests on now name them. Their binding statements, methods and violation state are unchanged. The kind guideline explains validation of the final and renewed cookie, with the real serializer/clone as its implementation example. No new invariant, part or product policy was introduced.

Polish meanings:

- express-session-cookie-lifecycle: Biblioteka odnawia ciasteczko przez originalMaxAge i bieżący czas, a jego zapis przekazuje pakietowi cookie.
- cookie-serialization-validation: Pakiet cookie odrzuca niedozwoloną domenę, ścieżkę i nieprawidłową datę ważności.
- D-113, zmienione Based on: Wzorzec magazynu opiera walidację również na faktycznym sposobie odnawiania i zapisywania ciasteczka przez biblioteki.
- account-session-storage, zmienione Rests on: Poprawność danych ciasteczka obejmuje ich przydatność dla bibliotek, także po odnowieniu i podmianie daty z bazy.
- coding-session-store: Kontrola danych obejmuje wartości przyjmowane przez bibliotekę, bez przejmowania zasad HTTP aplikacji.

Violation states set or cleared: none. The broad deployed Store, SQLite/startup, durable account-and-saved-game and other deployment obligations remain as recorded before the fix. No storage-only check is promoted to their full evidence.

## Reads, reaches and choices

Read both full fix dispatch/finding files and the full independent review. Reused the previously read make-change/element/template rules and original coding/testing selection. Read both new kind guidelines whole and the entire Store and existing storage test before editing. No cycle.md was read.

New/renewed source reaches:

- Installed node_modules/cookie/index.js:65–86 and :200–238 for path/domain restrictions and expiry rejection, and cookie/package.json for version 0.7.2.
- Installed express-session/session/cookie.js and session/session.js in full for serialize, maxAge and Session.touch/resetMaxAge.
- Installed @types/express-session/index.d.ts:180–335 after the first fixed-head build failure, confirming the missing serialize declaration and nullable lifetime.
- The exact versioned primary sources quoted in the two new entries in foundations/environment_facts.md, opened during this fix. The tag-to-commit lookup selects the immutable Cookie source; it is not a new dependency version.
- Current D-113, account-session-storage and source-fact neighbours plus whole-foundation identifier search to find affected references. Existing part ownership already covers every changed path.

Implementation choice: use the selected library's serializer and setter instead of copying its domain/path expressions or hard-coding Date limits. This adds bounded local calls and a clone, but avoids a second validation contract that can diverge at package upgrades. Failure text remains fixed; the synthetic name/value used for validation is neither a real session ID nor an emitted cookie. No consequential design question or structural plan mismatch was found.

## Limits

The Linux full gate does not execute native Windows checks. The three skipped cases remain `test_native_windows_readers_reject_nonterminating_cim_errors`, `test_native_windows_readers_keep_owned_child_in_healthy_observation`, and `test_failed_descendant_query_still_terminates_known_main_process`; they are not claimed as passed here. The old Windows listener-enumeration baseline was not rerun.

No target server, secret, deployment, target-image measurement, public registration, browser journey, named-volume replacement or saved-game work was performed. This changes no UI. The known testing-guideline computational mutation-tool gap is unchanged. The earlier slice report and review remain historical evidence; this report does not rewrite their results.
