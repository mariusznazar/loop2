# Memory finding from another session, 2026-11-02

## The session's message

From session `the-brain-12`, to this cycle's orchestrator. It says Mariusz approved passing the proposal on. That is a teammate's report, not the human's decision on the design.

> Proposed spec addition for `logowanie-w-react`: a failing `assert.equal` on React elements exhausts this machine's memory, so tests on jsdom need a watchdog. Mariusz approved passing this on to you.
>
> **What happened.** Your designer's trial at 12:51:59 and its rerun at 12:58 are the most likely cause of today's crash of this session and of the system errors at 12:52-13:00. At 12:52:47 Windows reported low virtual memory. At 12:53:30 the platform-api session could not start processes (exit code 0xC000012D, commit limit reached).
>
> **Measured on an isolated copy of `card.trial.mjs`, with mutated code and `TRIAL_FIXUP=1`, killed at a cap of 8 GB:**
> - `assert.ok(document.activeElement === password, ...)`: 1.1 s, 0.14 GB peak.
> - `assert.equal(document.activeElement, password)` on jsdom: above 8 GB in 10 s, about 2 GB/s at the end.
> - The same on happy-dom: above 8 GB in 14 s.
> - The same on jsdom with `NODE_OPTIONS=--max-old-space-size=2048`: still above 8 GB in 11 s, so the heap limit does not stop it.
> - Two plain jsdom elements with no React render did not reproduce it: 1.3 s, 0.14 GB.
>
> **Proposed change.** `spec.md:66` covers this only as a convention and describes it as a test that does not end within 60 s. Add under that sentence:
>
> > A failing comparison of this kind grew by about 2 GB/s and took down agent sessions on the machine; `--max-old-space-size` and `timeout` do not stop it. Tests on jsdom therefore run under a watchdog that kills the process tree above a set memory limit.
>
> **Why before implementation.** One ordinary `assert.equal` on an element in a failing test repeats the crash, and Stryker fails tests on purpose. `timeout 60` is not enough, since 60 s at that rate is over 100 GB against a commit limit of about 60 GB.
>
> **Scope.** Mariusz approved passing this text on. How to build the watchdog and where to set its limit are yours to settle in the cycle. Put the same text through your usual spec review, and include any resulting question for him at your next report. Until the watchdog exists, run any test on jsdom that can fail on an element comparison only under a memory cap, not just `timeout`.

## What the orchestrator read

- System log: Application Popup, event 26, 12:52:47, the low virtual memory message; Volsnap 13 and 35 at 12:59:16 and 12:59:23, shadow copy storage could not grow. Resource-Exhaustion-Detector has no event in this log at any date, so the log holds no process name.
- Commit limit 59.8 GB, RAM 31.8 GB, read at 13:13.
- `spec-trials/react-card/tests/view/card.trial.mjs:64` holds `assert.equal(document.activeElement, inputs[0]);`.
- Node 24.17.0, `internal/assert/assertion_error`, read at run time: `inspectValue` calls `inspect` with `customInspect: false`, `depth: 1000`, `maxArrayLength: Infinity`, `sorted: true` and `getters: true`. The message of a failing `assert.equal` is built in that call, before anything is thrown. So a `util.inspect.custom` on an element cannot shorten it. Why a rendered element and not a plain one explodes is not established here; the session's last measurement points at what React stores on a rendered element.
- `stryker.config.json`: `mutate` is `src/browser/sim/**/*.ts` and `tap.testFiles` names no file of `tests/view/` or `tests/` root. So today Stryker fails no test on jsdom, and the session's sentence on it does not apply as long as that list stands.

The growth figures are the session's measurement. Nobody reran them here, and nobody should without a cap.
