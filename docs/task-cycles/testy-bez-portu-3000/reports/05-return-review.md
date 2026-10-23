PASS b976c8ff657ee6429233b6aa5daa3e164230f7ff

# Review of the return step — testy-bez-portu-3000

- Reviewed: the return step's commits, range `ee6a941350cefec70437f9a57a988c798925d599..b976c8ff657ee6429233b6aa5daa3e164230f7ff`
  (one commit, `b976c8f`); `git rev-parse HEAD` in the worktree is `b976c8ff657ee6429233b6aa5daa3e164230f7ff`,
  the head given.
- Method: `.claude/skills/the-way-review-change/SKILL.md` -> `.the-way/task-cycle/review/SKILL.md`, read
  whole; pinned the-way checked: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`
  both show `86b78ad780aa8e97a9619fb7277cb64da50fb74a`.
- Against: the frozen task `.runs/task-cycles/testy-bez-portu-3000/task.md` (whole); step 11 of
  `.the-way/task-cycle/skill/SKILL.md`; D-49 (`foundations/decisions.md`, whole) and
  `node-listen-port-zero` (`foundations/environment_facts.md`, whole); the element rules
  `.the-way/elements/environment-facts/template.md` and `.the-way/elements/environment-facts/skill/SKILL.md`
  (whole); "Reading the foundation" in `.the-way/elements/common/way_of_working.md`.
- Author's report: `reports/04-return-step-report.md`, taken as claims and verified below.
- Step 4 answers: trust boundary no, irreversible operation no — neither applies to this range.

## What the range changes

- `foundations/environment_facts.md` +6: new entry `node-listen-port-zero`, placed after the last entry
  and before *Withdrawn identifiers*.
- `foundations/decisions.md` +1 −1: D-49 *Based on* `none` -> `node-listen-port-zero`; D-49's binding
  sentences, *Scope*, *Verification*, *Rationale* and *Rejected* unchanged.

## Findings

### Critical

none

### Important

none

### Minor

**M1 — the fact holds the Node.js side of D-49's basis, not the side its Verification names**
(`foundations/environment_facts.md:178-182`, `foundations/decisions.md:939`).
D-49 stands on the system naming a free port at each start. Its *Verification* "complies" example is
"the shared server helper of the invariant tests, which asks the system for a free port", and that
helper is Python: `tests/invariants/loop2_invariant_support.py:230-235` (`free_port`) binds a Python
`socket` to port 0 and reads `getsockname()`. The fact written is about "A Node.js `net` server",
which covers the Node tests (`tests/startup.test.mjs:11-17` `freePort()` and `:23` the blocker on
port 0), not the helper that most server-starting tests go through. The return-step report says so
itself (its "Note"). What the two paths share is the operating system's assignment of an unused port
on a bind to port 0; the Python 3.14 socket documentation holds no passage stating it (checked
below), so a fact covering the helper would cite the operating system's own documentation. Why Minor:
D-49 is not called into question by the gap — the Node fact states, from a cited edition, that the
operating system assigns an arbitrary unused port for port 0, which is the ground the decision's
rationale names — and nothing in the code is wrong; the gap is in how fully *Based on* covers the
mechanism the decision's own example names. Not blocking.

### Out of scope

none

## Verified claims of the return step

- **Source of `node-listen-port-zero`.** `curl https://nodejs.org/download/release/v24.17.0/docs/api/net.html`
  -> HTTP 200, exit 0. The passage stands at raw lines 1103-1105, inside one `<p>`; with markup
  dropped and whitespace collapsed it reads, word for word, "If port is omitted or is 0, the operating
  system will assign an arbitrary unused port, which can be retrieved by using server.address().port
  after the 'listening' event has been emitted." (exact match by script). The nearest heading is the
  h5 `server.listen([port[, host[, backlog]]][, callback])` (line 1091) under the h4 `server.listen()`
  (line 944) — the place the entry names.
- **Edition.** The address is a frozen release path, an edition. The fact's sentence names no edition;
  the product stands on Node.js 24.x (`package.json` `engines.node: "24.x"`, `Dockerfile` `FROM
  node:24-slim`), and `node --version` is v24.17.0, so the cited edition is one the product stands on.
- **Sentence.** One fact, present tense, no date-moving word, says no more than the passage ("gets from
  the operating system an arbitrary unused port" for "the operating system will assign an arbitrary
  unused port"). Identifier names the subject, not the value or the edition; held by no other entry
  and not among the withdrawn identifiers (`foundation_check.py` 0 errors).
- **D-49 *Based on*.** Form matches other decisions that name facts (e.g. `foundations/decisions.md:288`);
  the fact now has a dependant, as the template requires for a fact to stand.
- **D-49 against the code** (the return step's "matches"). No test of `tests/` gives the server a fixed
  port: the remaining `3000`s are the default-address test (the one exception), timestamps and the
  observation fixtures of `tests/quality/test_process_observation.py`; `tests/startup.test.mjs:92`
  `"3000x"` is a rejected value (the third sentence's exception). Server starts go through
  `support.Server` (`loop2_invariant_support.py:282-289`, free port per start) or `freePort()`;
  `tests/http.test.mjs:28` listens on 0 in-process; `tests/deploy/test_loop2_image_icons.py` sets the
  port inside a container (the third sentence's exception).
- **account-server-occupied-address *Derives from*** quotes "exits with an error instead of reporting
  ready when its listening port is occupied", the title at `tests/startup.test.mjs:19`, word for word.
- **account-server-default-address** (`foundations/invariants.md:490-498`) matches the test's
  expectations (`tests/invariants/test_account_server_default_address.py:31,33`).
- **Glossary.** No product glossary term about ports or readiness; nothing the range writes uses a word
  against an entry.
- **Settlements to record.** Both accepted rows of the task (decision, invariant) stand in the
  foundation (D-49, account-server-default-address); the range needs to add none.

## Declined to judge

- D-49's *Scope* and its binding sentences — written in the foundation step (`db3253c..ee6a941`) and
  reviewed `PASS` in `reports/02-review.md`; this range does not change them.
- The `npm test` failure at `ee6a941` (`test_loop2_one_serving_process` at its listener query, as on the
  base) — outside this range, which changes no code or test; it is the cycle's gate result to report.

## Checks

| Check | Command / method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `b976c8ff657ee6429233b6aa5daa3e164230f7ff`, the head given |
| Pin | `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | both `86b78ad780aa8e97a9619fb7277cb64da50fb74a` |
| Diff | `git diff ee6a941..b976c8f`; `git log ee6a941..b976c8f` | 2 files, +7 −1, one commit |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| Agent-workflow tests (read the foundation files) | `python -B .the-way/gate/run_tests.py tests/agent_workflow` | exit 0, 5 tests OK |
| Fact's source opens | `curl -sS https://nodejs.org/download/release/v24.17.0/docs/api/net.html` | exit 0, HTTP 200 |
| Passage word for word | Python script: strip markup, collapse whitespace, exact substring match | exact match, one paragraph |
| Python socket docs for a port-0 passage (for M1) | `curl https://docs.python.org/3.14/library/socket.html` (HTTP 200), search of the stripped text for "port 0", "ephemeral", "unused port", "free port", "any port" | no hit |
| Worktree untouched | `git status --short` after the checks | clean |

Not run: the full `npm test` — the cycle's own run before the request, not repeated by a review; the
range changes no code or test.

## Reaches beyond the dispatch

- `tests/invariants/loop2_invariant_support.py:230-289` and `tests/startup.test.mjs:11-34` — to see what
  the decision's free port rests on in code (M1).
- `package.json`, `Dockerfile`, `node --version` — which Node.js edition the product stands on.
- `foundations/invariants.md` entries `account-server-occupied-address` and
  `account-server-default-address` — to check the return step's "matches" claims.
- `foundations/glossary.md` headings — glossary claim.
- `docs.python.org/3.14/library/socket.html` — whether a Python source exists for the helper's port 0 (M1).
- Downloaded pages kept in the scratchpad:
  `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\80b89b91-ee87-4d2e-9dc8-c394d3af8d4a\scratchpad\rr05\`.

Counts: blocking 0, Minor 1, out of scope 0.
