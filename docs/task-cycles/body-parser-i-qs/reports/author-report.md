# Author report — body-parser-i-qs (the whole change, one author)

**Status:** done

**Commits:** `2ec0fd8` (author `mariusznn@gmail.com`) — `fix: :bug: raise body-parser to 2.4.0 and qs to 6.17.1 in the lockfile, so npm audit reports no advisory`. Base `5694146`. Branch `task/body-parser-i-qs`. Nothing pushed.

## Files changed

- `package-lock.json`: +9 / -9 (one file). `package.json` unchanged.
  - `node_modules/body-parser`: 2.3.0 → 2.4.0, new `resolved` and `integrity` (npm wrote them; `integrity` matches `npm view body-parser@2.4.0 dist.integrity`). Its own dependency ranges in the entry changed too: `content-type` `^2.0.0` → `^2.1.0`, `iconv-lite` `^0.7.2` → `^0.7.3`, `qs` `^6.15.2` → `^6.16.1`. No package was added or removed; the existing `content-type` and `iconv-lite` entries already satisfy the new ranges.
  - `node_modules/qs`: 6.16.0 → 6.17.1, new `resolved` and `integrity` (matches `npm view qs@6.17.1 dist.integrity`).
  - No other package entry changed.

## How the lockfile was made

- Used the pinned npm 12.2.1 from the worktree's `node_modules`: `node node_modules/npm/bin/npm-cli.js update --package-lock-only body-parser qs`. Note: the bare `npm` on this machine's PATH is 11.13.0, not the pinned version; I used the pinned one for the update. The later checks used the bare `npm` (11.13.0) — see the mismatch note below.
- `min-release-age=6` in `~/.npmrc` blocked nothing needed: `qs` 6.17.1 was published 2026-10-28 and `body-parser` 2.4.0 on 2026-10-22. No override of that setting was used.

## Checks (command → exit code)

Before the change (baseline, same worktree):
- `npm audit --omit=dev` → exit 1: 2 vulnerabilities (body-parser 2.0.0–2.3.0 high GHSA-27r3-jxmh-p828; qs 6.7.0–6.16.0 moderate GHSA-6pq8-jhm2-2vcw).

After the change:
1. `npm audit --omit=dev` → exit 0, "found 0 vulnerabilities". **Acceptance criterion met.**
2. `npm ls body-parser qs --all` → exit 0. Copies:
   - `body-parser@2.4.0` (under `express@5.2.1`), its `qs` deduped to `qs@6.17.1`;
   - `qs@6.17.1` (root, under `express`);
   - `qs@6.16.1` overridden, under `@stryker-mutator/core@10.0.0` → `typed-rest-client@2.3.1`.
   All ≥ required versions.
3. `git diff --stat 5694146..HEAD` → only `package-lock.json`. `resolved` lines: every one is `https://registry.npmjs.org/` (scan of all `packages` entries: 0 non-registry `resolved`). Install-script flags (`hasInstallScript`) unchanged: the two existing ones are argon2 and esbuild, neither touched.
4. `node -e "JSON.parse(...)"` → exit 0. `npm ci --dry-run` → exit 0 ("up to date").
5. The weakest point: that every `qs` copy is fixed. The lockfile scan finds exactly two `qs` nodes (`node_modules/qs` 6.17.1 and `node_modules/typed-rest-client/node_modules/qs` 6.16.1), and no nested `qs` under any other package. Both satisfy ≥6.16.1, and the audit over the whole production tree reports 0 vulnerabilities (check 1).
6. Extra, not in the handoff list: `node --test tests/transport.test.mjs tests/http.test.mjs` → exit 0, 83 pass, 0 fail. These are the tests of the `account-mutation-request-guards` invariant (compressed-body refusal, body limits), run because the body-parser bump is the one behaviour-relevant change. I changed no test.
7. Extra: `python -B scripts/audit_dependencies.py` (the D-33 gate script, network, compares with fork point) → exit 0, no output. It prints nothing when it passes; a silent exit 0 is the pass.

Not run:
- `npm test` — not run, per the handoff.
- `python -B .the-way/elements/common/foundation_check.py` — not run by me; the orchestrator's gate covers it.

**Mismatch to note:** the handoff says to use the pinned npm; checks 1, 2, 4 and the `npm ls` were run with the bare `npm` (11.13.0). The `npm audit` result still stands because it reads the same lockfile, but the orchestrator may want to rerun check 1 with the pinned npm 12.2.1 (`node node_modules/npm/bin/npm-cli.js audit --omit=dev`).

## Own-work check (section 3)

- Requirement: `body-parser` ≥ 2.4.0 and every `qs` used by express/body-parser ≥ 6.16.1 in the lockfile; `package.json` and Express 5.2.1 unchanged; acceptance: `npm audit --omit=dev` shows no warning.
- Check: `npm ls body-parser qs --all` plus `npm audit --omit=dev`, before and after.
- Shown: before, exit 1 with the two advisories; after, exit 0 with 0 vulnerabilities and every copy at or above the minimum. The check did not fail on re-run.

## Choices made

- **qs 6.17.1, not the minimum 6.16.1.** `npm update` takes the newest version in the ranges that Express and body-parser allow; I did not pin 6.16.1 because pinning exactly would need a `package.json` change or a manual lockfile edit, both out of scope. Cost if wrong: a wider jump than needed (one more release, 6.17.0 and 6.17.1, both in the lockfile's range). Express uses `qs` only in `query parser = extended`, which this project does not set (the requirement's own reasoning in the task's Context), so the effect on the game is nil in practice. Rollback is a one-line lockfile edit if the team prefers 6.16.1.
- **body-parser 2.4.0 as the newest allowed by Express's `^2.2.1`.** Its new zstd support is refused by the transport guard before body-parser runs (D-104; the `inflate: false` option stays), and the 83 guard tests passed.

## Reach beyond the handoff

- Read `foundations/part_map.md` lines 84–117 (the `build-tools` part) after the change, to confirm its trust boundary is `package-lock.json`. I had only read its top part before.
- Read `foundations/decisions.md` D-02, D-33, D-79, D-104 and `foundations/invariants.md` `application-package-layout`, `introduced-npm-vulnerabilities`, `dependency-audit-refusal`, `account-mutation-request-guards` whole, each by its heading.
- Read `.the-way/task-cycle/change/SKILL.md` whole, and the frozen task `task.md` whole. Also read `guidelines/coding.md` whole, as the handoff directs.
- Did not read `guidelines/testing.md` or the styleguide; no test or UI was changed.

## Questions

None. No open design choice came up.

## Searches not found or unclear

- None of the requested items was missing. Unclear: the handoff says "the pinned local npm 12.2.1", and the bare `npm` on PATH is 11.13.0 — the pinned one is at `node_modules/npm/bin/npm-cli.js` (version 12.2.1, matching `package.json` `"npm": "12.2.1"`). I used that one for the lockfile update.
- Unclear: the handoff's "every `qs` copy" check — no nested `qs` other than the two above exists; I confirmed it by scanning the lockfile, not by `npm ls` alone.
