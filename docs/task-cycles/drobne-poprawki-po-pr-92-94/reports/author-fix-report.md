# Author fix report — task `drobne-poprawki-po-pr-92-94`

**Status:** `done`. Range from reviewed head `9a778cdb`; branch `task/drobne-poprawki-po-pr-92-94`.

| Finding | Commit | How | Check (command → exit) |
|---|---|---|---|
| I1 | `a8f322c7` | D-153 *Rationale*: "The delivery test has been run for the password-reset message, and the operator has reported a check of the confirmation message." The password-reset result is kept as it was. | `python -B .the-way/elements/common/foundation_check.py` → 0 errors |
| M1 | `a8f322c7` | "for two accounts created that day" removed; the log is described as "two pairs" of `link-issued` + `message-sent` of `email-confirmation`, `email-confirmed` after each pair, no `"failure":"mail"`. The fact `loop2-app-log-confirmation-mail-events` already says the same (no account, no creation), so it needed no change. | same |
| M2 | `a8f322c7` | As the orchestrator chose: the operator's report (he checked, received it, the link worked; the words name no mailbox, hour, sender or route) and the log, stated as result and basis; the narrative "as the report is recorded it adds …" is gone; "external mailbox" is not stated as established; the remaining condition (delivery to an external inbox) is named as established by no entry, and the *Verification* clause is untouched. The human decides at the request whether to say it is met. | same |
| M3 | `a0ff0b67` | Both copies of `loop2-deploy/SKILL.md`: the allowed-reads list now says each `tail -n 50` takes a larger number where the first line printed is later than the failure sought, as "How an agent reads it" gives. | `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` → equal; `python -B .the-way/gate/run_tests.py tests/agent_workflow` → exit 0, 86 tests; `check_instructions.py` → 0 error |
| M4 | `f7966d44` | D-424 *Rationale*: "…or clear it while the other checks, so that one of them fails with an error of a tool rather than with the one message." | `foundation_check.py` → 0 errors |
| M5 | `a203324d` | New case `test_a_tool_at_the_pinned_version_that_does_not_run_is_made_again` (a stand-in answers `shellcheck --version` with exit 1 at the pinned version; expects one `venv` and one `install`, no failure after the install). The Python-version branch stays untested. | `python -B tests/quality/test_quality_environment.py` → exit 0, 7 tests; with the `--version` loop of `quality_environment.py` removed for a moment → FAILED (1 failure), restored; `npm test -- tests/quality/test_quality_environment.py` → exit 0; `ruff check --config ruff.toml --ignore-noqa tests/quality` → exit 0 |
| M6 | `31aeb5a8` | `README.md` paragraph of `npm test`: "…the environment `.runs/quality-venv` described above, which the quality test makes where it is absent (network access to the Python Package Index needed), …". | `foundation_check.py` → 0 errors |
| M7 | `e4cf8e7b` | D-207 *Rejected*: "up to 16 saves of about 9.8 KB each, about 157 KB together, in each half real minute at 16×, which is 480 game minutes, measured as D-208 …"; the numbers are the task's, "of Las" no longer reads as the cost of a whole map run. *Rejected* sentence only. | `foundation_check.py` → 0 errors |
| M8 | none | Changed nothing, as the orchestrator chose: the fact's statement needs no change, and the allowed list of the skill is the operator's agreement, which this cycle does not change. The one-off reach (filtering pipe, `sed`/`gzip` version lines) stays named in `author-report.md` for the request to carry to the human. | — |

O1 and O2 are outside the task and were not touched.

## Own-work check

The requirement most likely missed: I1 — that no sentence of D-153 still says the confirmation message was never tested. Check: searched the *Rationale* of D-153 for "only", "no test", "no observation", "unsettled": none remain (`grep` of the paragraph); the paragraph reads in order: password-reset result, then the confirmation report, then what is not established. M5 mutation check above shows the new case catches the removed `--version` loop.

## Reaches beyond the handoff

None.

## Unread material

`reports/review-whole-report.md`: not read (the findings file held what each finding needed). Everything else the handoff names was read.

## Searches not found or unclear

None.

## Working copies

`.runs/author-fix/` (two scripts, one backup of `quality_environment.py`) stood in the worktree; removed before return. Nothing else made.
