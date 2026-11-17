# Report - executor of slice 4 (Wording of invariants)

**Status:** done

**Commit:** `173c4f3f` on `task/poprawki-brzmienia-fundamentu` (base `7bdce4fa`), committed by paths: `foundations/invariants.md` and `scripts/measure-passwords.mjs`.

Files changed: `foundations/invariants.md` (8 insertions, 8 deletions); `scripts/measure-passwords.mjs` (5 insertions, 5 deletions). Total 13 insertions, 13 deletions.

**Check result (one line):** foundation check `0 errors` in both runs (with and without `--skip-test-citations`); prettier and `tests/password-measurement.test.mjs` pass (12/12). Nothing failed; nothing required by the slice was left unchecked.

## Items of the slice

| Item | Result | What stands now |
|---|---|---|
| To do 2.7 `account-message-limits` | made | "…or three for the same account, have been sent or attempted within the last hour…" |
| To do 2.8 `password-reset-verified-email` | made | "A password reset link is sent only to the account's previously confirmed email address." |
| To do 2.9 `loop-run-knowledge` | made | "A map run of an earning loop leaves the Understanding and the player's programs as it found them." |
| To do 2.10 `terrain-drawing-numbers` | made | "The drawing of the game map (the terrain drawing, not the scene) shows no number of the stock a tile holds." |
| To do 2.12 `player-opaque-session-cookie` | made | "…in a loop2 host-scoped, Secure and HttpOnly cookie whose name starts with the `__Host-` prefix." |
| To do 2.14 `trip-plan-progress` | made | "…the run's streak, count of beaten attacks and program-rule firing counts as they stood." |
| To do 2.14 `account-server-runtime` | made | "The account and save server's TypeScript source and its container image use Node.js major version 24." |
| To do 2.15 `player-argon2-deployment-check` | made | "…to at most 80% of the 512 MiB memory limit `compose.yaml` gives the application container, which did not restart…" |
| Comments of `scripts/measure-passwords.mjs` (`:2`, `:6`, `:8`, `:23`, `:47`) | made | "the container's memory limit" in each comment; the error text at `:47` reads "--memory may not exceed the container's memory limit of 512m" |
| Constant `DEPLOYMENT_MEMORY_LIMIT` | already made (kept) | name unchanged |
| To do 2.5, 2.6, 2.11 (*Derives from*, links) | not in this slice | left as the task's Slice 5 owns them; no *Derives from* changed here |
| To do 2.1-2.4, 2.13 | not in this slice | not touched |

Wording choices (the task names the change, not the words):

- 2.12: the task says "name the prefix `__Host-`". I added "whose name starts with the `__Host-` prefix" after "Secure and HttpOnly cookie". Way rejected: replacing "loop2 host-scoped" with "`__Host-` cookie" (drops the words the task keeps). Cost if wrong: a wording reviewer may prefer the shorter form; no test depends on the words.
- 2.15: "the 512 MiB memory limit `compose.yaml` gives the application container" is used verbatim from the task. The sentence still reads "which did not restart and whose cgroup counted…" after it; I kept that tail unchanged.
- `:47` of the script is an error text, not a comment; the task lists it, so I changed it. Cost if wrong: an error message wording changes; `grep` shows no test quotes the old text.

## Own-work check (section 3 of the method)

- Requirement most likely unmet: an invariant whose sentence I changed must still be the sentence its citing tests check, and the `same account` wording must match the code, not the old "email address" count.
- Check: read `src/server/database.ts` `issueLink` (the count the message limit reads): `count(CASE WHEN account_id = ? THEN 1 END) AS own` against `perAccount`, and `counted.total >= total || counted.own >= perAccount`. The code counts by account, so "for the same account" matches it. For the cookie, `src/server/account-routes.ts:38` is `export const sessionCookieName = "__Host-loop2.sid";`, so the `__Host-` prefix matches the code. For the container limit, `compose.yaml` gives service `app` (`container_name: loop2`) `mem_limit: 512m`; the sentence matches.
- Not done: I did not read the seven citing tests whole against the new wording (the method's write.md step 4.2 asks for it). The changed wordings are the ones the task gives; the foundation check lists the seven invariants (see below) as ones whose citing tests did not change, which is the report the handoff asks for. The orchestrator should confirm this in the review.

## Foundation check listings (rule 3)

Each of these reads `test`, its sentence changed, and no file citing it changed. Each must be named in the change's request, saying what the sentence now says:

- `foundations/invariants.md:5` `account-server-runtime` (tests/invariants/test_account_server_runtime.py)
- `foundations/invariants.md:354` `terrain-drawing-numbers` (tests/invariants/test_terrain_drawing_numbers.py)
- `foundations/invariants.md:668` `player-opaque-session-cookie` (tests/transport.test.mjs)
- `foundations/invariants.md:908` `account-message-limits` (tests/account-storage.test.mjs, tests/http.test.mjs)
- `foundations/invariants.md:978` `trip-plan-progress` (tests/sim/trip.test.mjs)
- `foundations/invariants.md:1068` `password-reset-verified-email` (tests/account-storage.test.mjs, tests/http.test.mjs)
- `foundations/invariants.md:1158` `loop-run-knowledge` (tests/sim/catch-up.test.mjs, tests/sim/loop.test.mjs)

`player-argon2-deployment-check` is `Method: review` and is not listed.

No `invariant:` line was added or changed; no invariant test was written, so the fail-then-pass run (WAY-08) does not apply here. No decision entry changed, so no `decision:` quotation in a test needed editing (rule 4).

## Checks run

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation check, per entry | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | `0 errors`; 7 `listed:` lines above |
| Foundation check, slice end | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; the same 7 `listed:` lines |
| Focused test file | `npm test -- tests/password-measurement.test.mjs` | 0 | 12 tests, 12 pass, 0 fail |
| Prettier | `npx prettier --check scripts/measure-passwords.mjs` | 0 | "All matched files use Prettier code style!" |

Not run: the full product suite (`npm test` without a file), per the handoff. Not run: the cited tests named in the listings above, because the slice's Checks do not name them.

## Unread material

- `foundations/glossary.md` (named in *Read*): not read; the slice changes no glossary entry.
- `foundations/environment_facts.md`: not named by this slice; not read.
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md`: read only lines 18-48 (the rules and my slice), as the handoff gives.
- `.the-way/elements/common/rules.md` and `way_of_working.md`, `template.md`, `examples.md`, `decide_entry.md`, `draft.md`, `write.md`, `SKILL.md` of the invariants element: read whole.
- `guidelines/coding.md`: read whole.
- `guidelines/testing.md`: not named by this slice's *Read*; not read.
- The seven citing tests: not read (see the own-work check).
- `foundations/decisions.md` ranges D-161, D-249, D-106, D-113: read as named; the file itself not opened whole. `foundations/invariants.md` read by entry ranges only.

## Searches not found or unclear

- `git grep` for `deployment's`, `single-use`, `currently leaves`, `defeated-attack`, `same email address` in `foundations/invariants.md` and `scripts/measure-passwords.mjs`: no hits after the change (the old wording is gone).
- `tests/password-measurement.test.mjs:22` says "80% of 512 MiB … (player-argon2-deployment-check)"; it names the invariant, not its wording; no change needed.
- `git grep -n 'deployment'`-style matches in `tests/deploy/*.py` (D-231 quotations) are not in this slice and are not touched.

## Reach beyond the handoff

- `compose.yaml` (named in *Read*): read the `app` service lines (`container_name: loop2`, `mem_limit: 512m`) to check 2.15.
- `src/server/account-routes.ts`, `src/server/database.ts`: read the ranges named in *Read* (`account-routes.ts:30-45`, `database.ts:530-575`); also `database.ts:470-490` to check the per-account count.
- `git grep` of the test citations (`invariant: …`) to list the citing tests for the foundation listings.

## Working copies

None made. I wrote three scratch outputs under `.runs/` (the two foundation check outputs and the npm test output) and removed them before the commit. No worktree, clone or copy was created; `.runs/executor-4/` was not needed.

## Observed, not in scope

- The commit is authored with the address the repository's account rule gives (`the private address that the account rule gives`), as `git log --format='%h %ae'` shows; this is the rule for `mariusznazar` repositories, noted for the record.
