# Handoff — Slice 1, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base e38278cd867ef8800a140f45f4119413545ecd7b. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-1.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 1 — The memory limit, its proof and the guard

- **Goal:** `tests/view/memory-limit.mjs` exports `startMemoryLimit({ limitBytes, intervalMs })`, by default 2 GiB read every 100 ms: a worker thread of the calling process that reads `process.memoryUsage.rss()` and above the limit writes one sentence straight to standard error and kills the process with `SIGKILL`; the sentence names the limit, the memory reached, the file by `process.argv[1]`, the likely cause and what to look for, and it says this is no flaky test. `tests/view/memory-limit.test.mjs`, with its child `tests/view/memory-limit-child.mjs`, shows that a growing child is killed, names the limit, the file and the cause and never reaches its own stop; that this reads as a failure through both `node --test` and `scripts/test-node-file.mjs`; and, as the control, that a child under the limit ends well. The proof clears `NODE_TEST_CONTEXT` for its children and asserts the sentence as well as the exit code on both routes, so it cannot pass with nothing run; it bounds its own waiting; its child allocates on a stuck main thread at a low limit and stops itself far below anything that matters. The same test file holds the guard of spec decision 10: it fails where a test file other than `tests/view/page-document.mjs` imports `jsdom` or `happy-dom`, statically or by a dynamic `import(...)`, and where a file that imports that harness imports `assert`, `node:assert` or `node:assert/strict`. The harness does not exist yet: the guard passes on the tree without it, and a control on crafted text shows it refusing each form, without the crafted text tripping the guard on its own file. Its cases cite the invariant of row F22 by a line `invariant: <identifier>`, and the test is seen failing once. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). Until `tests/view/memory-limit.mjs` stands, no test on jsdom in which a comparison on an element can fail runs at all; this slice runs nothing on jsdom, and neither jsdom nor React is installed yet.
- **Change:** `tests/view/memory-limit.mjs` · `tests/view/memory-limit.test.mjs` · `tests/view/memory-limit-child.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/spec.md:30-38` Constraints ·
  `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change ·
  `.runs/task-cycles/logowanie-w-react/spec.md:189-224` Decision 9 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `scripts/test-node-file.mjs` · `scripts/test.py` ·
  `foundations/decisions.md:1462-1476` D-77 · `foundations/decisions.md:1477-1489` D-78 ·
  `foundations/invariants.md:578-587` node-test-selection · `foundations/glossary.md:94-105` unit test, integration test ·
  `foundations/part_map.md:3-27` browser-view · rows F21, F22, F23
- **Model:** same — every later run on jsdom leans on this slice, and a proof that passes empty leaves the human's machine exposed.
- **Risk:** none
- **Checks:** `npm test -- tests/view/memory-limit.test.mjs`, failing first with the kill not yet written; `node --test tests/view/memory-limit.test.mjs`; `npm test -- tests/quality/test_node_test_selection.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** F21 · F22 · F23

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `scripts/test-node-file.mjs`
- `scripts/test.py`
- `foundations/decisions.md:1461-1475` D-77
- `foundations/decisions.md:1476-1488` D-78
- `foundations/invariants.md:579-588` node-test-selection
- `foundations/glossary.md:94-105` unit test, integration test (range as in the plan)
- `foundations/part_map.md:3-27` browser-view
- `foundations/decisions.md:5517-5560` D-268
- `foundations/invariants.md:1189-1198` document-test-memory-limit
- `foundations/environment_facts.md:466-471` node-assert-failure-inspect

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/spec.md:30-38` Constraints

## Constraints

- The task's *To do*, *Acceptance criteria*, eleven answered questions and six rows of *Settlements to record* are settled. Lines it cites moved on the base: `showForms` is at `src/browser/view/app.ts:268`, `root.append(header, main, createFooter());` at `:445`, the title „Loop” at `:134`, the README step of `npm run build` at `README.md:25` and the sentence „sees the forms again” at `.claude/skills/loop2-deploy/SKILL.md:225`. The runner counts 69 cases in `tests/view/account-screen.test.mjs`, where the task says 67.
- D-44 (screens build on the shared controls of `src/browser/view/controls/`), D-45 (nothing `npm run build` writes holds the kitchen-sink page), D-47 (one focus rule), D-43 (no value in place of a token; a width in `px` is a layout dimension and allowed), D-18 and D-96 (the sentence from the game's data), D-04 (the view changes the game state only through the simulation), D-98 and D-99 (the field rules), D-222 and D-225 (the forms' endings), D-97 and D-211 (the ways back to the card).
- D-29: the rule set does not change without a human-accepted change of that decision. D-33: every new package goes through the audit. D-75 and D-88: real events and focus stay a manual check, now joined by an agent's check in a real browser (D-254).
- `src/browser/AGENTS.md`: a value the token file does not hold enters it only with a source settled with the human. Without a human the card uses the tokens that exist, and a missing value is named in the report, never chosen.
- `guidelines/coding.md` and `guidelines/coding-content-data.md` for the new data file, `guidelines/styleguide-browser-view.md` for every file of the part.
- The machine runs other sessions: commit limit 59.8 GB, RAM 31.8 GB, 26 to 27 GB of commit in use while this was measured. No test on jsdom in which a comparison on an element can fail runs before the watchdog of decision 9 stands; after that, a throwaway file on jsdom starts it itself (decision 11).
- The trust boundary `package-lock.json`: the lockfile is written on Windows and the image is built on Linux, so it must carry `@esbuild/linux-x64`. `scripts/kitchen-sink.mjs` is left untouched, and question 7 of the task forbids its serving lines in any case.

### `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change

### 7. The units of the change

| Unit | Does | Used by, and depends on |
|---|---|---|
| `src/browser/sim/data/about.ts` (new) | The game's name and its one sentence. | Read by the card and by `app.ts`'s header. Imports nothing. A file of kind `content-data`. |
| `src/browser/view/account-rules.ts` (new) | Pure and without React or DOM: `addressProblem`, `passwordProblems`, `registrationProblems`, `RegistrationField`, `RESET_REQUESTED_SENTENCE`. | The card, the kitchen-sink page and tests. |
| `src/browser/view/password-reset.ts` (kept) | Loses `createResetScreen`; keeps `readResetToken`, `ResetEnding`, `ResetOutcome` and `resetOutcome`. | `app.ts`, the card, `tests/view/password-reset.test.mjs`, unchanged. |
| `src/browser/view/account-screen.ts` (deleted) | Goes with `accountForm` and `createAccountScreen`. | In `src/` only `password-reset.ts` and `app.ts` use them, both changed. |
| `src/browser/view/account-card.tsx` (new) | The card and its four states, and `createAccountCard`. The exemplar of D-36. | `app.ts`. Depends on the client, the two units above, the React controls, `credits-section.tsx`. |
| `src/browser/view/credits-section.tsx` (new) | The folded credits, drawn from `footerCredits()` of `footer.ts`, so the content is the footer's. | The card, today. |
| `src/browser/view/controls/react-button.tsx`, `react-text-field.tsx` (new) | Decision 2. | The card. |
| `src/browser/view/app.ts` (changed) | Decision 3; the header reads the name from `about.ts`. | `main.ts`, unchanged, so `src/browser/*.tsx` does not enter the part map (question 10). |
| `src/browser/styles.css` (changed) | Rules of the card's screen and the card, on existing tokens; the rules of the two forms side by side go. | The card and `app.ts`. |
| `tests/view/memory-limit.mjs` (new, first) | Decision 9: `startMemoryLimit({ limitBytes, intervalMs })`, with the limit's value as its default. | `tests/view/page-document.mjs` and its test. Node's `worker_threads` and nothing else. |
| `tests/view/memory-limit.test.mjs`, `memory-limit-child.mjs` (new, second) | Decision 9's proof, and the guard of decision 10. | The gate. |
| `tests/view/page-document.mjs`, `tests/view/react-controls.test.mjs` (new, after those) | Decisions 1, 2 and 10. | `tests/view/account-screen.test.mjs` and the gate. |

The order among these is a requirement: the watchdog and its test stand and pass before the first test on jsdom runs, and the harness's `assert` before the first case is moved onto it.

### `.runs/task-cycles/logowanie-w-react/spec.md:189-224` Decision 9

### 9. A test on jsdom runs under a memory limit inside its own process

`tests/view/page-document.mjs` starts, as its first act, a limit of 2 GiB on the process of the test file. A worker thread of that process reads the process's memory every 100 ms; above the limit it writes one sentence straight to the standard error and kills the process with `SIGKILL`. The thread is the point: a failing comparison blocks the main thread in one synchronous call, so no timer there would run, and the thread's timers are out of reach of the cases' mocked timers.

**The runs it covers.** Every run of a test file under `tests/`, by one means: the limit comes with the harness, and the guard of decision 10 refuses a file that reaches jsdom any other way. A file outside `tests/` is decision 11. So `npm test`, `npm test -- <file>` through `scripts/test-node-file.mjs` and a direct `node --test` are alike, the last of which the guidelines do not name but an agent can type. `scripts/test.py` and `scripts/test-node-file.mjs` do not change.

**How it reads memory.** `process.memoryUsage.rss()`, the working set on Windows and the resident set on Linux. One call, the same on both, with no branch by system, no new package and so nothing for `reserved_choices.md`. The trial ran on Windows only; the permanent test runs wherever the gate does, and `README.md` gives the Linux install.

**The process tree of the ruling.** The tree such a file kills is one process: a test on jsdom is a unit test, which by the glossary starts no process. Above it the runner stays alive, so the other files finish and the run reports. Nothing here sums a tree, so nothing measures the whole stage.

**The limit and its source.** Measured on a clean copy of the base, under a cap: the full Node stage of 1167 tests took 63.5 s, with a peak of 1.17 GB private and 1.68 GB of working set over a tree of up to 25 processes, and 0.21 GB in the largest single process. A process on jsdom walking the page 80 times, a fresh window each time and no assertion, peaked at 0.39 GB. So 2 GiB stands above the whole stage's peak, five times above a file on jsdom, and at a thirtieth of the commit limit. With a reading every 100 ms the real growth passed the limit by 0.32 GB, and it moves in steps, one reading of 586 MB in 128 ms, so count about 0.5 GB past the limit. Files on jsdom run side by side, so several going wrong at once add up, at about 2.5 GB each: 2 files today, and the 33 GB of commit free while this was measured holds 13 of them. That sum is why the limit stands low rather than at the free commit.

**What a person reads.** The sentence names the limit, the memory reached, the file by `process.argv[1]`, the likely cause and what to look for. Measured at a limit of 1 GiB and about 2 GB/s, on a main thread stuck in one synchronous stretch under mocked timers, in a script that stops itself at 3.5 GB:

| Run | Result |
|---|---|
| Direct, 3 times | Killed at a reading of 1027 to 1044 MB, in 0.6 s, exit 1 |
| `node --test` with a second, quiet file | The sentence, `✖` on the killed file, the second file passes, exit 1 |
| `scripts/test-node-file.mjs` | The sentence, `✖` on the file, exit 1, with „No test executed in the selected file.” after it |
| A real failing `assert.equal` on a rendered element on jsdom, once, limit 1 GiB, under `node --test`, with an outer cap of 3 GB proved first | Killed at a reading of 1345 MB, about 2.1 s after the comparison began; peak tree 1.295 GB; outer cap never fired; the runner stayed at 21 MB; `✖`, exit 1 |

So a kill reads as a failed file and a failed run, never as a pass, and the sentence says it was no flaky test. In a full gate that sentence stands far above the closing lines, which say only `'test failed'` at `:1:1`, so its wording tells a reader to look for it. What it cannot give is the case: the file's report dies with it, which is the reason for decision 10. The one run says nothing of the growth above 1.3 GB or at the limit of 2 GiB.

**The proof.** `tests/view/memory-limit.test.mjs` is an integration test, since it starts processes, and its child `memory-limit-child.mjs` allocates on a stuck main thread at a low limit, stopping itself far below anything that matters. It shows that a growing child is killed, reports the limit, the file and the cause and never reaches its own stop; that this reads as a failure through both `node --test` and `scripts/test-node-file.mjs`; and, as the control, that a child under the limit ends well. The proof runs inside `node --test`, so it clears `NODE_TEST_CONTEXT` for its children, and on both routes it asserts the sentence as well as the exit code: with that variable inherited, the second route exits 1 with no child started and nothing killed, and the first exits 0 with nothing run (measured from inside a test). It can fail in a second, with no failing comparison on an element.

**Stryker.** `tap.testFiles` holds no file of `tests/view/` today and `mutate` is `src/browser/sim/**/*.ts`, so it needs nothing now, and it fails no test on jsdom. A later task that adds a file on jsdom gets the limit with the harness, and has to do three things: read a kill apart from a killed mutant, since a process killed by the limit reads to Stryker as a failed test; count `concurrency: 4` in the sum above; and keep `tap.testFiles`'s selection guard (`mutation-test-selection`) true.

Ways weighed:

- **A supervisor over the stage** reading the tree from outside, which is what the ruling's words first suggest. It counts private bytes, sees every test file and can kill all of a tree. It needs a reader per system (`Get-CimInstance Win32_Process` here, `/proc` on Linux), at about 0.25 s a reading in a PowerShell kept open, so well past the limit, against about 0.5 GB for the thread; a wrapper in `scripts/test.py` and in `scripts/test-node-file.mjs`, with a direct `node --test` still bare; and a sum of the tree it cannot pin on one file. It lost on those, though it stays the way to go if tests other than those on jsdom ever need this.
- **A limit from the system:** a Windows job object needs native code or a new package, and `ulimit` and cgroups hold only on Linux.
- **`--max-old-space-size`:** measured by the session, it did not stop the growth.
- **`timeout`:** it reads time, and 60 s at that rate is over 100 GB.
- **The same thread preloaded into every test process by `NODE_OPTIONS`:** it covers tests the requirement does not name and misses a direct run. It is the way to widen this one.

Cost if wrong: the reading is a working set, which a machine short of RAM can trim below the commit, so under heavy pressure the kill can come late; at 2 GiB against 31.8 GB of RAM that takes a machine already in trouble. Stand-ins of other files have no limit: nobody has measured a failing comparison on them, and they hold no React. A file that truly needs more than 2 GiB fails loudly and raises the constant in a change that measures it. Return condition: more than about ten files on jsdom, or memory running away in a test that is not on jsdom, reopens the sum and the supervisor.

### `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10

### 10. Tests on jsdom take `assert` from the harness; a guard refuses `node:assert` there

The harness exports an `assert` with the seven methods `tests/view/account-screen.test.mjs` uses: `equal`, `notEqual`, `deepEqual`, `ok`, `match`, `doesNotMatch` and `fail`, each taking a message as Node's does, since about 200 calls pass one. None builds Node's message and none puts a value on the error: each compares, then throws a plain error with a short description, an element by its tag and class. A guard in `tests/view/memory-limit.test.mjs` reads the test files and fails where a file other than `page-document.mjs` imports `jsdom` or `happy-dom`, statically or by a dynamic `import(...)`, and where a file that imports the harness imports `assert`, `node:assert` or `node:assert/strict`. `t.assert` of a test's context and a helper module that holds its own `node:assert` go round the guard: `guidelines/testing.md` says a helper on jsdom takes `assert` from the harness, and the thread answers the rest, at the cost of a killed file with no case named.

- `equal` and `notEqual` are `Object.is`, so a comparison on elements is safe and fails with its case's name. The 291 `assert.equal` of that file can stay as written where their expectation stands, which also keeps the port's diff small.
- `deepEqual` takes plain data alone, and refuses an element anywhere in either value, found by a walk of arrays and plain objects that enters nothing else. `util.isDeepStrictEqual` is safe behind that door and not without it: read in Node's source, its record of cycles is also kept along the path (`internal/util/comparisons`, `handleCycles`), so it can walk the same graph as `inspect`. Not run. A case with elements in a `deepEqual` compares names or identities instead: `assert.deepEqual(forms(root), {})` passes as it stands while no form is shown, and `assert.deepEqual(order, [logout, line, row])` at `tests/view/account-screen.test.mjs:2982` becomes one `equal` for each place, which keeps its identity.
- `assert.equal(a, b, message)` of Node was not trusted either: a message spares the building only in the loose `equal`, since `node:assert/strict` builds the diff even with a message (read in Node 24.17.0, not run), and the error still carries `actual` and `expected` to the runner, and what the runner does with them was not run.

This takes the place of the convention the trial began with, a helper remembered at each comparison, which the first lapse breaks. It joins the watchdog and replaces none of it: this keeps a failure small and names its case, and the watchdog answers everything this does not foresee. With the watchdog alone, a lapse costs a killed file with no case named out of 69, and the 19 focus comparisons alone are 19 chances of it. With this alone, something unforeseen repeats the crash.

Rejected: the watchdog with the rule as a convention — safe, but a failing focus case then reports only that its file died. Rejected: Node's `assert` with a message at each call — a rule to remember, and unproved. Cost: about forty lines of an assertion module with a worse printed diff than Node's, for plain data too, and a guard. Its own failing cases, on rendered elements, run only under the watchdog.

### `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11

### 11. Settled by the orchestrator after the review of the revision

The review of the revision returned `FAIL` with two findings, in `reports/spec-revision-review.md`, and found the design sound. A revision gets one review, so these stand here as the orchestrator's settlement, unreviewed, and the review of the whole change judges them with the code.

- **A throwaway file on jsdom.** The run named as the most likely cause of the crash was a file under `.runs/` with a harness of its own, which the limit and the guard do not reach, and no way weighed reaches it. So it takes a rule, written in `guidelines/testing.md`: a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation, and before that module stands no such file runs a comparison on an element that can fail. Rejected: leaving it to memory — that is how the crash came. Rejected: a preload by `NODE_OPTIONS` — it reaches only a run that sets it. Cost if wrong: an agent that skips the rule can repeat the crash; its handoff repeats the rule throughout this cycle. The two trial files holding such a comparison on a rendered element were deleted.
- **The proof cannot pass empty.** Decision 9's proof clears `NODE_TEST_CONTEXT` for its children and asserts the sentence on both routes.
- **The review's corrections of fact** stand in place: decision 1 on what the capped run confirms, decision 4's Stryker row, decision 9's figures, decision 10's guard and its methods' message.
