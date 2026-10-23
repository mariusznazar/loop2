# Return step report — testy-bez-portu-3000

**Status:** done

Method: step 11 of `.the-way/task-cycle/skill/SKILL.md` read whole, under `the-way-make-change`;
the environment-fact element read whole (`elements/environment-facts/skill/SKILL.md`,
`template.md`) for the one entry written. The review's Minor findings M1–M3 were not fixed, as the
handoff gives; they go to the request's lists.

## Compared with the code (head `ee6a941` before this step)

| Entry | Compared with | Finding |
|---|---|---|
| D-49 | `tests/invariants/loop2_invariant_support.py` (`free_port`, `Server._start`), `tests/startup.test.mjs` (both tests that let the server listen take a system-named port; the five invalid-value tests and the container tests fall under the third sentence), the new default-address test as the one exception | matches. Its *Based on* read `none` although the decision stands on the system assigning an unused port for port 0, an outside source the foundation did not hold — **corrected** (below) |
| account-server-default-address | `src/server/main.ts:3-4` (defaults `127.0.0.1`, `"3000"`), the `listening` line and the `error` handler (`process.exitCode = 1`, message with `host:port`); its test | matches |
| account-server-occupied-address, *Derives from* | title of the first test of `tests/startup.test.mjs` | matches word for word |
| Part map line `tests/invariants/test_account_server_default_address.py` | `git ls-files` | the file is tracked; `foundation_check.py` 0 errors |
| D-05 | sentences unchanged; *Verification* names loop2-one-serving-process and loop2-api-error-route, both still held and tested | matches |
| loop2-one-serving-process, loop2-api-error-route | their tests now start the server on a free port; what they assert is unchanged | match |
| Entries the foundation search found: D-37, D-45, loop2-distinct-address, account-server-express-http | D-37's example of separating creation from listening is untouched; D-45 only a form precedent; loop2-distinct-address is about the public address; account-server-express-http's test changed one call | match |
| Part map: `account-server` | its files include the new test; it may depend on build-tools, which the test reaches through the shared helper | matches |
| Part map: `build-tools` | "builds and launches the application" covers the helper starting the server; README and `tests/quality/**` stay its files | matches |
| Part map: `agent-workflow` | `.the-way` gitlink moved; the installer's entry points read the same | matches |
| Part map: `product-foundation` | `foundations/**` | matches |

## Written beyond the foundation step

- **Glossary:** none. No word of the change is used in a meaning other than the usual one ("free
  port", "readiness line" as in the existing entries), and no term is used against its entry.
- **Settlements to record:** both rows were written in the foundation step; none missed.
- **Choices that bind after the merge:** none beyond D-49. The single retry, the readiness line as
  the readiness signal and the place of the default-address test are how the helper works, not rules
  that later work keeps; they stay choices of the cycle (author report § 6).
- **Invariants:** none new; no rule of the task, a decision or the human is left without one.
- **Environment fact — written:**

| Entry | Meaning (pl) |
|---|---|
| `node-listen-port-zero` (`foundations/environment_facts.md`, last entry): "A Node.js `net` server told to listen on port 0 gets from the operating system an arbitrary unused port." Source: https://nodejs.org/download/release/v24.17.0/docs/api/net.html § Class: net.Server, server.listen([port[, host[, backlog]]][, callback]) — "If port is omitted or is 0, the operating system will assign an arbitrary unused port, which can be retrieved by using server.address().port after the 'listening' event has been emitted."; read 2026-10-23 | Serwer `net` w Node.js, któremu kazano nasłuchiwać na porcie 0, dostaje od systemu operacyjnego dowolny nieużywany port. |
| D-49, *Based on*: `none` → `node-listen-port-zero` (binding sentences unchanged) | Decyzja o wolnym porcie dla testów opiera się na tym, że system przydziela nieużywany port przy nasłuchu na porcie 0. |

Mechanical check of the source (skill step 4): the page of the edition matching the local Node.js
(`node --version` → v24.17.0) opened (`curl` exit 0); the paragraph, with markup dropped and
whitespace collapsed, reads word for word as quoted; the nearest headings are `Class: net.Server`
(h3), `server.listen()` (h4), `server.listen([port[, host[, backlog]]][, callback])` (h5). The
identifier is held by no other entry of the three identifier files (`grep`).

Note: the Python helper binds port 0 through Python's `socket`, not Node's `net`; the fact quotes
Node's documentation, which states that the operating system assigns the port. The Node tests
(`freePort()`, the blocker on port 0) rest on it directly.

## Commit

| Commit | Subject |
|---|---|
| `b976c8f` | docs: rest D-49 on the Node.js fact that listening on port 0 takes an unused port the system assigns |

Files: `foundations/environment_facts.md` +6, `foundations/decisions.md` +1 −1. The commit touches
only the foundation, so under step 11 a fresh reviewer has to review the range `ee6a941..b976c8f`.

## Checks

| Check | Command | Exit | Evidence |
|---|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | `reports/04-foundation-check.log`: 0 errors |
| Tests of the agent-workflow part (read the foundation files) | `python -B .the-way/gate/run_tests.py tests/agent_workflow` | 0 | `reports/04-agent-workflow.log`: OK |

Not run again: the full `npm test` — the commit changes no code or test, only two foundation
files, which `foundation_check.py` covers. The `npm test` result at `ee6a941` stands (exit 1, only
`test_loop2_one_serving_process` at its listener query, as on the base).

## Reaches beyond the handoff

- `reports/02-review.md` read (for the Minor findings, which are not fixed).
- `https://nodejs.org/download/release/v24.17.0/docs/api/net.html` fetched into the scratchpad for
  the fact's source.
