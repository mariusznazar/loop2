# Return step report — body-parser-i-qs

**Status:** done
**Commits:** none. The return step wrote nothing, so there is no commit. The request's commit remains `2ec0fd8`.

## Foundation compared with code

Compared the entries the change touches with the lockfile as committed in `2ec0fd8` (`package-lock.json`: body-parser 2.4.0, qs 6.17.1 at root, qs 6.16.1 under typed-rest-client):

- **D-33** (dependency audit, pinned npm 12.2.1, `--audit-level=low`, include dev/optional/peer, registry npm): matches. `scripts/audit_dependencies.py` runs the same command with `node_modules/npm/bin/npm-cli.js` (version 12.2.1). No correction.
- **D-02** (Express 5 on Node.js 24): unchanged; Express stays 5.2.1 and `package.json` is unchanged. No correction.
- **D-104** (compressed inflation rejected; origin and JSON guards): still true. The 2.4.0 zstd support is refused by the transport guard before body-parser runs, and `inflate: false` is kept. The guard tests in `tests/transport.test.mjs` and `tests/http.test.mjs` pass (83 of 83). No correction.
- **Invariants** `introduced-npm-vulnerabilities`, `dependency-audit-refusal` (both D-33), `application-package-layout` (one shared npm package and lockfile) and `account-mutation-request-guards` (D-104): all still true for this tree. No correction.
- **Part map**, `build-tools`: responsibility, files (`/package-lock.json` already listed) and trust boundary (`package-lock.json`) unchanged. No correction.
- **One search of the whole foundation** (`decisions.md`, `invariants.md`, `glossary.md`, `environment_facts.md`, `part_map.md`), case-insensitive, for `body-parser`, `qs`, `GHSA`, `advisor`, `2.3.0`, `6.16`, `lockfile`, `package-lock`, `typed-rest-client`, `npm audit`: no entry names the body-parser or qs versions, or the advisories. Hits were only the generic lockfile mentions in D-33, the invariants above, and the lockfile wording in D-02 and D-29 context, none of which pin a version. Nothing no longer matched.

## Entries written, per kind

- **Decisions:** none. The change settles no new choice that binds later work. Its one choice (qs 6.17.1 rather than the minimum 6.16.1) is a version pick inside the existing D-33 process, not a decision.
- **Invariants:** none. The rules the change must keep are already invariants (`introduced-npm-vulnerabilities`, `dependency-audit-refusal`). The task sets no new rule.
- **Environment facts:** none. The change rests on the npm registry's versions and on the advisories GHSA-27r3-jxmh-p828 and GHSA-6pq8-jhm2-2vcw. The foundation holds no fact about the advisory database except D-33's rule to read it when the check runs. A fact recording "the advisory range is `>= 2.0.0, < 2.4.0`" or "qs 6.17.1 is published on 2026-10-28" would be a snapshot of a transient state, not a durable source; the durable check is the D-33 audit that runs with each change.
- **Glossary terms:** none. No word in the change is used in a meaning other than the usual one.
- **Part-map changes:** none (see above).
- **Projected entries:** none. The task's *Settlements to record* reads `none`, and the task carries no projected entry.
- **Rows of *Settlements to record*:** none.
- **The cycle's entries:** none.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, output `0 errors`.
- `git status --short` → clean, no uncommitted change.
- The foundation search (grep, case-insensitive, over the five foundation files) → matches listed above, none needing correction.

Not run: `npm test` (not run, per the handoff).

## Reach beyond the handoff

- Read `foundations/decisions.md` line 702 and `foundations/decisions.md` line 5390 with a narrow match, only to see which term the search had hit. Neither is about body-parser or qs.

## Searches not found or unclear

- Looked for an environment fact on the advisory database (what it is, when it is read). Not found beyond D-33's own rule.
- Looked for any foundation entry naming `body-parser`, `qs` or their versions. Not found.
- Unclear: whether the foundation should hold the minimum safe versions as a fact for a future reader. Judged no, for the transient-state reason above; the D-33 audit re-checks them on every change. If the human wants them recorded, that is a separate decision, not part of this request.
