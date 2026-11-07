PASS 2ec0fd82125fc534fc60f17ca3198804214a318b

# Review of the whole change — body-parser-i-qs

Range `5694146af4b65fbe506c43eb3638c87fd0ad4783..2ec0fd8`, one commit; `git rev-parse HEAD` = `2ec0fd82125fc534fc60f17ca3198804214a318b` (matches the head given). Worktree clean after my checks.

Counts: blocking 0, Minor 0, out-of-scope 0.

## Findings

### Critical
none

### Important
none

### Minor
none

## Against the task

- Item 1 (`body-parser` >= 2.4.0, every `qs` used by `express` and `body-parser` >= 6.16.1, `package.json` unchanged, Express 5.2.1): met. Lockfile now has `node_modules/body-parser` 2.4.0 and `node_modules/qs` 6.17.1. The only other `qs` node with code is `node_modules/typed-rest-client/node_modules/qs` 6.16.1 (override, untouched by this change, not used by express or body-parser); `@types/qs` is a types package. `git diff 5694146..HEAD --stat -- package.json` is empty; `express` stays 5.2.1.
- `qs` 6.17.1 against "6.16.1 or higher": the task says "or higher", so 6.17.1 meets it. It is the newest version in the ranges that Express (`^6.14.0`) and body-parser 2.4.0 (`^6.16.1`) allow; it is not an addition nobody asked for, since the task's wording allows it and pinning exactly 6.16.1 would need a `package.json` or a hand edit, which the task excludes. Not a finding.
- Acceptance criterion: `node node_modules/npm/bin/npm-cli.js audit --omit=dev` with the pinned npm 12.2.1 prints `found 0 vulnerabilities`, exit 0. Met with the pinned npm (the author had used 11.13.0 for it; the pinned run confirms).
- Nothing added beyond the task: the diff is 9 insertions and 9 deletions in `package-lock.json`, in two package entries.
- Settlements to record: none; the change records none. Out of scope items (Express 5.3.0, dev-dependency warnings) untouched.

## Trust boundary of `package-lock.json` (answer of the cycle's start: yes)

- Every changed `resolved` is `https://registry.npmjs.org/...`. Scan of all `packages` entries of the new lockfile: 0 non-registry `resolved`.
- `integrity` of `body-parser` 2.4.0 equals `npm view body-parser@2.4.0 dist.integrity` (`sha512-Ifk1KcLr...xtXjQ==`), and its `resolved` equals the registry `dist.tarball`. `integrity` of `qs` 6.17.1 equals `npm view qs@6.17.1 dist.integrity` (`sha512-jd3COkaK...UBPQJA==`), `resolved` equals the registry tarball. Both exact, so each integrity belongs to the version it sits under.
- The dependency set recorded in the `body-parser` entry equals `npm view body-parser@2.4.0 dependencies` (qs ^6.16.1, content-type ^2.1.0, iconv-lite ^0.7.3, the rest unchanged); no package, no install script and no non-registry source enters. `hasInstallScript` is still set only on `node_modules/argon2` and `node_modules/esbuild`.
- Other packages untouched: I compared every `packages` entry of the lockfile at `5694146` and at head by JSON equality; only `node_modules/body-parser` and `node_modules/qs` differ, and the top-level non-`packages` fields (`lockfileVersion`, root) are equal.

## Dependency ranges in the `body-parser` entry

- `content-type ^2.1.0`: satisfied by the existing nested `node_modules/body-parser/node_modules/content-type` 2.1.0. The root `node_modules/content-type` is 1.0.5 and is Express's own copy (`npm ls` shows it under `express`); the author's report says "the existing `content-type` entry", which is imprecise but the nested entry is the one that counts and it was already 2.1.0.
- `iconv-lite ^0.7.3`: satisfied by `node_modules/iconv-lite` 0.7.3. `qs ^6.16.1`: satisfied by 6.17.1 (deduped). `npm ls content-type iconv-lite qs body-parser --all --omit=dev` shows the tree resolved with no invalid or missing node, exit 0.
- `npm ci --dry-run --ignore-scripts` exits 0 (lockfile consistent with `package.json`).

## Against the foundation

- D-33 / `introduced-npm-vulnerabilities` / `dependency-audit-refusal`: `python -B scripts/audit_dependencies.py` (the D-33 gate script, compares with the fork point, network) exit 0, no output. The change reduces the advisories; it introduces none. The change does not alter the script or its tests, so the refusal behaviour is unchanged. The change writes no foundation entry.
- D-02 (Express 5 on Node.js 24): Express stays 5.2.1, `package.json` unchanged; true.
- D-104 / `account-mutation-request-guards`: I read `src/server/transport.ts:60-100`. The guard handler runs before `express.json({ limit, inflate: false, ... })` and answers 415 for any `Content-Encoding` header whose single value is not `identity` (and for a non-JSON type), so the new zstd decoding of body-parser 2.4.0 is never reached; and `inflate: false` stays on the parser as a second line. The task's Context claim holds. `node --test tests/transport.test.mjs tests/http.test.mjs` exit 0, 83 pass, 0 fail. These tests exercise gzip and duplicate `identity` (lines 607, 610, 921, 924 of `tests/transport.test.mjs`), not zstd by name; the guard compares against `identity` alone, so the coverage follows from the code and no test is needed for this task. I changed and saw no change of any test, invariant text or invariant test.
- No reserved choice (language, framework, library, store, login, place to run) is settled by the change: the same two libraries, new versions inside the ranges Express allows.
- Not pushed, merged or deployed: `git log 5694146..HEAD` is the one local commit; `git status --short` clean; `git ls-remote --heads origin task/body-parser-i-qs` printed nothing (no remote branch). Irreversible operation: none.

## Own-work check of the author

Requirement named: body-parser >= 2.4.0, every `qs` of express/body-parser >= 6.16.1, audit clean. Weakest point named: that every `qs` copy is fixed. The check (lockfile scan for `qs` nodes plus audit over the whole production tree) would fail if a vulnerable copy remained; I reproduced the scan (3 nodes matching `qs`: the types package, the fixed root copy, the override copy at 6.16.1). Fits.

## Declined to judge

- Adding a zstd-named case to `tests/transport.test.mjs`: not asked by the task; the guard is encoding-agnostic.
- `qs` release content between 6.16.1 and 6.17.1 and `body-parser` 2.4.0 behaviour changes beyond zstd and the advisory fix: not read from source; judged only by the 83 guard tests and the ranges Express allows.
- Dev-dependency warnings of the whole-tree audit: out of scope in the task.

## Checks run

1. `git rev-parse HEAD`, `git log 5694146..HEAD`, `git diff 5694146..HEAD` — head matches, one commit, lockfile only.
2. `node node_modules/npm/bin/npm-cli.js --version` -> 12.2.1.
3. `node node_modules/npm/bin/npm-cli.js audit --omit=dev` -> `found 0 vulnerabilities`, exit 0.
4. `node node_modules/npm/bin/npm-cli.js view body-parser@2.4.0 dist.integrity dist.tarball`, same for `qs@6.17.1` -> exit 0, both match the lockfile.
5. `npm view body-parser@2.4.0 dependencies` and `npm view express@5.2.1 dependencies.body-parser dependencies.qs` (`^2.2.1`, `^6.14.0`) -> exit 0.
6. Node script (scratchpad) comparing all `packages` entries at `5694146` and head, scanning `resolved`, `hasInstallScript`, `qs`/`body-parser`/`content-type`/`iconv-lite` nodes -> as stated above.
7. `node node_modules/npm/bin/npm-cli.js ls content-type iconv-lite qs body-parser --all --omit=dev` -> exit 0 (pipe to `head`, tree printed whole).
8. `node node_modules/npm/bin/npm-cli.js ci --dry-run --ignore-scripts` -> exit 0.
9. `python -B scripts/audit_dependencies.py` -> exit 0.
10. `node --test tests/transport.test.mjs tests/http.test.mjs` -> 83 pass, 0 fail, exit 0.

Not run: `npm test` (the orchestrator's gate, per the handoff); `python -B .the-way/elements/common/foundation_check.py` (not in my scope, the change touches no foundation file or part-map claim; left to the gate). The exit codes of checks 7 and 8 were taken from the shell after a pipe, so they are the pipe's exit status, not npm's own; the printed trees and "up to date"-style tail show no error.

## Reach beyond the handoff

- `foundations/part_map.md` lines 84-117 (part `build-tools`) to confirm `package-lock.json` is a file and trust boundary of the part; `foundations/invariants.md` entries `introduced-npm-vulnerabilities`, `dependency-audit-refusal`, `account-mutation-request-guards` whole, by heading, to check them against the change. Decisions D-33, D-02, D-104 I read from the frozen task's *Decisions in play* (verbatim there), not from `foundations/decisions.md`.
- `src/server/transport.ts:60-100` and the `Content-Encoding` cases in `tests/transport.test.mjs`, to check the zstd claim.
- I did not read `guidelines/coding.md` or `guidelines/testing.md` in full: the change is a lockfile edit with no product code, script or test.

## Searches not found or unclear

- none that blocks; the one unclear point is the author's wording "existing `content-type` entry" (it is the nested copy under `body-parser`, see above), which does not change the result.
- I did not read the `body-parser` 2.4.0 or `qs` 6.17.1 release sources; the code-level behaviour of those releases is unverified beyond the guard tests and the audit.
