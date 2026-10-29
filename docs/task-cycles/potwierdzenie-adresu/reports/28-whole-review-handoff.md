# Handoff — review of the whole change, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh reviewer; you made none of this
change. Read-only: never change the worktree, its index or branch; run checks that need changed
files in a separate worktree of the head commit and remove it when done. Questions go to the
orchestrator, never to the human.

- Worktree: `C:/Storage/repos/loop2-wt/potwierdzenie-adresu`, branch `task/potwierdzenie-adresu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`); read it
  whole, and `whole_change.md` beside it for this review. You select your own foundation and
  guidelines, by the parts the change touches (`account-server`, `browser-view`, `deployment`,
  `build-tools`, `agent-workflow`, `product-foundation`), as the method gives.
- Range: **`7a633a7..28f0686`** (19 commits, 44 files, +4950 −213). Base `7a633a7` is `main`.
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md` — read it whole.
- Reviewed spec: `.runs/task-cycles/potwierdzenie-adresu/spec.md` — whole; the note at the head of
  its *Decisions* (K1 settled after review: the issue spends earlier links in its own transaction)
  prevails over Decisions 3, 4 and 12.
- Plan: `.runs/task-cycles/potwierdzenie-adresu/plan.md` — whole, with its *Foundation entries*
  F1–F33 and *Choices*; `reports/06-foundation-report.md` § "Entries written" maps the rows to
  identifiers.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/28-whole-review-report.md`, first
  line `PASS 28f0686` or `FAIL 28f0686`, or `questions`.
- The full gate is the orchestrator's; do not run `npm test` without a file. Never deploy, touch
  the server (no `mikrus` MCP calls) or connect to `outsider.mikr.us`. Docker answers on this
  machine; the quality tools are in the reviewed worktree's `.runs/quality-venv`.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` (a session-less confirmation route, a session route
  that triggers a send, an outbound SMTP connection with a credential read from a file, new
  startup configuration, a schema step), and keys and the deployment (`compose.yaml` grants the
  SMTP password secret; the deploy skill). Check crafted input at the boundary.
- Irreversible operation: **yes** — schema step 3 of the persistent `loop2_accounts` database on
  the test server, run by the human's deployment (H4) and by the merge (D-11). Check that the
  change only prepares it.

## Settled during the cycle

- **D-151 approved by the human** 2026-10-29 ("przyjmuję A", comment on request #37): no test
  reaches Outsider; mail-sending code is tested against a real SMTP server on loopback, routes
  with a stand-in mailer; a human's delivery checks Outsider. It changes D-73 and D-79.
- K1: the issue spends every earlier unspent link of the account and purpose in its own
  transaction, before the send; no retire step (cycle Q2, revised; D-143 written so).
- F24's second sentence (delivery from the intended container) is not written: H4 has not run;
  the request names it as left.
- The questions table of the cycle record lists the other choices; the ones that bind are in the
  foundation entries.

## Slices, their ranges and their reviews

| Slice | Range | Own review | Executor's report |
|---|---|---|---|
| Foundation entries | `7a633a7..6ec347f` | judged with Slice 1: PASS | `reports/06-foundation-report.md` |
| 1 — schema v3, link store | `6ec347f..589f4d7` | `PASS 589f4d7` (`reports/09-slice1-review-report.md`) | `reports/08-slice1-report.md` |
| 2 — mailer | `589f4d7..426081f` | `FAIL 7b621ce` → fix `426081f` → `PASS 426081f` (`reports/11-…`, `13-…`) | `reports/10-slice2-report.md`, `12-slice2-fix-report.md` |
| 3 — mail-sending guidelines | `426081f..1c335f3` | **none — yours to judge** | `reports/14-slice3-report.md` |
| 4 — startup mail settings | `1c335f3..b4e50b2` | `PASS b4e50b2` (`reports/16-slice4-review-report.md`) | `reports/15-slice4-report.md` |
| 5 — routes and send step | `b4e50b2..5ab1b5a` | `PASS 5ab1b5a` (`reports/18-slice5-review-report.md`) | `reports/17-slice5-report.md` |
| 6 — browser client | `5ab1b5a..cd56819` | **none — yours to judge** | `reports/19-slice6-report.md` |
| 7 — header row, link confirmation | `cd56819..e1f769e` | **none — yours to judge** | `reports/20-slice7-report.md` |
| 8 — kitchen sink, styleguide | `e1f769e..53f2b82` | **none — yours to judge** | `reports/21-slice8-report.md` |
| 9 — compose secret, deploy skill | `53f2b82..fea6091` | `FAIL 37d7bc8` → fix `fea6091` → `PASS fea6091` (`reports/23-…`, `25-…`) | `reports/22-slice9-report.md`, `24-slice9-fix-report.md` |
| O1 fix — deploy test broken by Slice 5 | `fea6091..fab1f2e` | **none — yours to judge** | `reports/26-o1-fix-report.md`, finding `reports/26-o1-fix-findings.md` |
| 10 — testing guidelines | `fab1f2e..28f0686` | **none — yours to judge** | `reports/27-slice10-report.md` |

Mismatches the orchestrator's mechanical checks passed on: Slice 2 installed the dependencies with
the machine's npm 11.13.0, not the pinned npm 12.2.1; Slice 6 left the view tests' fake accounts
without `emailConfirmed` (they passed at `cd56819`; Slice 7 updated them); Slice 9's run of
`tests/deploy/test_account_storage.py` failed (from Slice 5; fixed in `fab1f2e`). Slices 7 and 8
took no screenshot of the running game (no settled route); Slice 8 inspected the kitchen-sink
states in Chromium.

## Minor and out-of-scope findings of the slice reviews — grade each as a finding of yours

- Slice 1 (`reports/09-slice1-review-report.md` § Minor): m1 — "set the confirmation time only if
  still null" has no test; m2 — `guidelines/testing.md:10-11` count of D-73's departures (added to
  Slice 10's goal); m3 — misleading refusal text "Invalid database timing option" for a bad limit.
- Slice 2 (`reports/11-slice2-review-report.md` § Minor): M1 — the part map's `account-server`
  responsibility does not say that the part sends account email (also the executor's C1).
- Slice 4 (`reports/16-slice4-review-report.md` § Minor): M1 — a password file of only a UTF-8
  byte order mark is accepted as empty, a leading one removed without notice; M2 — login and host
  validation looser than D-111's wording.
- Slice 5 (`reports/18-slice5-review-report.md` § Minor): m1 — a block landing during a
  registration's send makes the end-of-response session save fail (stack trace, connection
  destroyed after the 201); m2 — `isLinkToken` has no test that fails when it is removed; m3 —
  the route's sending deadline sits on `AccountPolicy` as a constructor option; m4 — no test that a
  confirmation without a session creates no session and sets no cookie.
- Slice 9 (`reports/23-slice9-review-report.md` § Minor): M1 — the password-file block reads the
  password from the same terminal it is pasted into.

## Return

Write your report as the method gives — for each blocking finding, the slice it comes from by
number and commit, or that it spans slices, or that it comes from none — and return only its first
line and its path.
