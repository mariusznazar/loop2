FAIL 9a778cdbbdb54edcce17e752cc37bbbb8fdc53a5

# Review of the whole change — task `drobne-poprawki-po-pr-92-94`

Range `d8e318c3437f73952b3bd8b1c8284b49d771848e..9a778cdb` (8 commits, 46 files, +721/−363), one author, no spec, no plan, so no slice; every finding below comes from the commit named at it. `git rev-parse HEAD` in the worktree is `9a778cdbbdb54edcce17e752cc37bbbb8fdc53a5`, the head given. `.the-way` stands at the pinned commit `bfb2e109`.

Counts: blocking 1 (Important), Minor within the task 8, out of scope 2.

## Pass A — code and tests (items 4, 5, 6 in code and tests, 8)

No blocking finding.

What holds, checked:

- Item 4 (`42ecf898`). `src/browser/sim/data/conditions.ts:100` writes `defaultItem: "stick"` on the row of „Zapas poniżej”, typed `ItemId` (`:24`); `newCondition` (`src/browser/view/program-editor.ts:347-350`) takes it where the offered items hold it, else `items[0]`. It is the only place that builds a new `itemBelow` condition (searched `newCondition|items\[0\]|itemBelow` over `src/browser/view` and `src/browser/sim`). With Patyk known the player gets Patyk as before (stick is first in the items' data today); without Patyk, the first known item in data order as before — nothing the player sees changes. The new test (`tests/view/program-editor.test.mjs:783-795`) chooses by identifier, with Patyk at the start, the middle and the end of the offered list and two lists without it; the changed expectation `ITEMS_LISTED[0]` → `"stick"` (`:491`) has its source in D-423. Only „Zapas poniżej” changed (answer 5).
- Item 5 (`d847ccfb`). The header of `tests/invariants/test_streak_program_change.py:1-4` equals the invariant at `foundations/invariants.md:830` word for word; no line of logic changed.
- Item 6 (`140f5824`) in code and tests. Word-diff of the commit: every removed word is `loop`/`loops`/`a` and every added word `earning`/`an` (the removed `a` are the articles made to agree). Residual bare „loop” in comments of `src/`, `tests/`, `scripts/` read: the predecessor game (`tokens.css`, `D-416` quotations, `chronicle.test.mjs:219`), the old container (`deploy/`, `test_loop2_*`), the event loop, animation loops (`scene*.ts`), `so it cannot loop` (`body.ts:157`), `the loop above` (`account-storage.test.mjs:2758`), identifiers in backticks or code (`loop.ts:45`, `away-report.test.mjs:30`), and line-wrapped continuations of „earning / loop” (`away-report.ts:93-94`, `saved-game.test.mjs:565-566`). No earning loop left as bare „loop” found; no changed „loop” that is no earning loop found; no „earning loop clock”, „a earning”, „earning earning”. Boundary file touched: only `src/browser/sim/saved-game.ts`, two comments (`:1101`, `:1149`), no code. In `tests/sim/saved-game.test.mjs` only case labels of a table and comments changed, plus Prettier's re-wrap of two lines; the five `save-version` case names that `guidelines/testing.md:175` quotes all stand unchanged. All 87 old test-case strings and the 2 old Python method names are found in no tracked file (no stale quotation).
- Item 8 (`287a6c48`), trust boundary, crafted conditions (method under *Checks*):
  - the install is always `<venv python> -m pip install --require-hashes -r requirements-quality.txt` (`tests/quality/quality_environment.py:121-123`), after `python -m venv --clear`; `requirements-quality.txt` holds `--only-binary=:all:` and a hash for every wheel; no other source is named;
  - complete environment: `pip list --format=json` of pip 25.3 in the real `.runs/quality-venv`, with an empty pip cache and the index pointed at a local logging stand-in, made no request (positive control: `pip index versions pip` against the same stand-in logged two requests);
  - half made (a venv with python only) and another version (pins edited to `ruff==0.17.0` over a copy of the real environment): both were not taken for ready (`problem before: …ruff.exe is missing`, `…ruff is 0.17.1, not the pinned 0.17.0`), both ran `venv --clear` then the hashed install, and with the index dead both ended in `EnvironmentNotMade` with one message naming `.runs/quality-venv`, the failed command, pip's last lines (`No matching distribution found for ruff==0.17.1`) and the README commands; the only index requests were `/simple/ruff/` and `/simple/pip/` of the install;
  - after the install the same `problem` check runs again (`:128-130`), so an install that leaves the environment half made is no success; `test_an_install_that_leaves_the_environment_half_made_is_no_success` fails if that second check is removed.
  - The unit tests would fail for the faults the author lists: always installing (`:80-85`), installing without `--require-hashes` (`:95`), skipping the version comparison (`:103-106`), a message without the directory, the command or the output (`:117-126`).
- Decision 1 of the handoff (no lock): two runs at once in one directory give no silent wrong result — a pass needs both tools to run and pass at the pinned versions; the failures they can give are named in Minor M4.
- Decision 3 (`setUpClass`): the class fails once with `AssertionError(<the one message>)`; `unittest` then runs none of the five checks and reports `ERROR: setUpClass`, which the gate counts as a failure, not a skip.

## Pass B — foundation, documents and skills (items 1–3, 7, 9–12, item 6 in `foundations`)

### Important (blocking, within the task)

**I1 — `foundations/decisions.md:3207` (D-153, *Rationale*), commit `5d6a47ea`, item 11.**

Remark: D-153's *Rationale* still says „The delivery test has been run for the password-reset message only.”, and four sentences later the same paragraph records the operator's test of the confirmation message of 2026-11-14 and the log events of that day; the paragraph contradicts itself on the very point the decision's binding sentence turns on.

Reason: the binding sentence of D-153 says „Public self-service account recovery is enabled only after confirmation and password-reset messages sent from the intended container reach external inboxes in a real delivery test.” The *Rationale* is where a reader learns how far that condition is met. Task item 11 asks that the sentence calling the confirmation message unsettled be replaced by the result of the operator's test of 2026-11-14, as a dated note. The change replaced the last sentence of the paragraph but kept the earlier „has been run for the password-reset message only”. A reader who stops at that sentence — an agent deciding whether recovery may be enabled, or the next review of the foundation — reads that the confirmation message was never tested, which the task and the rest of the paragraph say is false. Under WAY-263 a foundation entry the change writes that restates its point differently in two places is Important. Example: an agent asked „is the delivery test of D-153 done for both messages?” finds „run for the password-reset message only” and answers no, without reaching the operator's report three sentences on. Fix: make the sentence say that the test has been run for both messages, the password-reset message on 2026-11-14 as described and the confirmation message as the operator reported on 2026-11-14, and keep for the confirmation message whatever qualification the human settles under M2.

### Minor (within the task)

**M1 — `foundations/decisions.md:3207` (D-153, *Rationale*), commit `5d6a47ea`, item 11.**

Remark: „The game's log of that day holds, for two accounts created that day, the events `link-issued` and `message-sent` …” says that the accounts were created that day, which neither the named fact nor any line of the task shows.

Reason: the fact `loop2-app-log-confirmation-mail-events` (`foundations/environment_facts.md:169-173`) prints dates, event names and purposes only — no account identifier and no event `account-created` (its command does not search for that event). A confirmation link is issued at registration and also at „Wyślij ponownie” (D-157), and the task's *Context* says the operator did not say whether his message came from the registration or a resend. That the two pairs belong to two accounts can be inferred (after the confirmation at 12:25:28 a resend to that account is refused with 409 `email-already-confirmed`, so the link at 15:09:24 is another account's), but „created that day” cannot: an account made earlier and confirmed by a resend that day leaves the same lines. The over-claim is small, but it is a statement in a foundation entry with no source, and the next reader takes it as read from the log. Fix: „for two accounts” (or „two pairs of events”), without „created that day”, or add the search for `account-created` to a new reading of the fact.

**M2 — `foundations/decisions.md:3207` (D-153, *Rationale*), commit `5d6a47ea`, item 11 — for the human.**

Remark: the change does not record the confirmation message as having reached an external mailbox, though task item 11 records the result as „wiadomość potwierdzająca nowe konto dotarła do zewnętrznej skrzynki, odnośnik z niej potwierdził adres”; instead it says „as the report is recorded it adds that the message of a new account reached an external mailbox, but the words kept of it do not say so”, and ends „the delivery of the confirmation message to an external inbox stays an observation whose mailbox is not confirmed by any entry”.

Reason: the author's reading follows the operator's own quoted words in the task's *Context* („sprawdziłem i odebrałem teraz - odnośnik zadziałał”), which name no mailbox; the task's *To do* states the external mailbox as the result. The two readings lead to different states of D-153's condition: with the task's wording both message types have reached external inboxes and the condition of the binding sentence is met by observation; with the change's wording it is not. That is a judgment on a decision's condition that belongs to the human, and the author flagged it. The sentence about how the report „is recorded” also tells the history of the source rather than the state, which the decisions template keeps out of *Rationale* („does not tell how the decision was reached”, `.the-way/elements/decisions/template.md:74-78`). Leaving it as it is: D-153 keeps saying the condition is unmet, and recovery stays off until someone records a delivery whose mailbox is named; taking the task's wording: the condition reads as met, resting on the advisor's summary of the operator's words. Fix: the human chooses; whichever, the sentence states the result and its basis without the narrative of the record.

**M3 — `.claude/skills/loop2-deploy/SKILL.md:81-84` against `:296-301`, the same lines in `.agents/skills/loop2-deploy/SKILL.md`, commit `9a778cdb`, item 12.**

Remark: the list of allowed reads now fixes the bound as `| tail -n 50`, while „How an agent reads it” tells the agent, where the first printed line is later than the failure sought, to „run the command again with a larger number after `tail -n`”; the skill gives two different bounds for the same read of a file that holds `accountId` values.

Reason: the list under „Allowed, the failure record” is the agreement that limits an MCP server with full rights („the following limits are an agreement”); the method section, copied from step 8 of `references/backup_and_restore.md`, allows a larger number with no ceiling. An agent that keeps the agreement stops at 50 lines and cannot reach an older failure, which is what the method section was written for; one that follows the method section reads more than the agreement lists. Example: a failure from three weeks ago in `.log.1` lies 400 matching lines back; the method says `tail -n 500`, the allowed list says 50. D-355's binding sentence („a bounded `tail`, `grep` or `zgrep`”) holds either way, so this is a contradiction inside the skill, not a breach of the decision. Fix: in the allowed list say „`| tail -n 50`, or a larger number where the first line printed is later than the failure sought, as "How an agent reads it" gives”, or give a ceiling in both places; the two copies stay equal (they are equal now: `diff -r` → no difference).

**M4 — `foundations/decisions.md:819` (D-424, *Rationale*, „Accepted with it”), commit `287a6c48`, item 8.**

Remark: the accepted cost of two runs in one directory is named as „a run beside another run in the same directory may find the environment half made by the other”, but the larger effect is the other way round: a run that finds the environment half made clears it with `venv --clear` while the first run may already be checking with it, and that first run's Ruff or ShellCheck check then fails with a missing-file error, not with the one message.

Reason: `ensure_quality_environment` (`tests/quality/quality_environment.py:119-124`) takes any state other than ready as a reason to run `venv --clear`. Run A finishes its install and starts `test_ruff_source_rules`; run B, started a second earlier and having seen the environment half made, now clears it; A's `subprocess.run` of `ruff.exe` raises `FileNotFoundError` and A reports an error of the Ruff check — exactly the kind of failure that is no error of the code, which the task removes for a fresh directory. On Windows the clear may instead fail on a locked `ruff.exe`, and B ends with the one message. Neither gives a silent pass, so the decision not to lock stands; only the named cost is incomplete, and a reader who meets the Ruff error after two parallel runs finds nothing in D-424 that explains it. Fix: name it in the *Rationale*: „and a run beside another run in the same directory may find the environment half made by the other, or clear it while the other checks, so that one of them fails with an error of a tool rather than with the one message”.

**M5 — `tests/quality/test_quality_environment.py:56` (stand-in), `tests/quality/quality_environment.py:90-92` and `:116-118`, commit `287a6c48`, item 8.**

Remark: two branches of the readiness logic have no test: a tool that is present at the pinned version but does not run (`--version` exits other than 0) and the refusal for a Python older than 3.9; the stand-in answers every `--version` with exit 0.

Reason: D-424's *Rationale* says a half-made environment is judged „by the versions it holds and by whether each tool runs”; the second half has no test, so removing the `--version` loop (`:90-92`) leaves every test green, and an environment whose `ruff.exe` is a truncated file but whose dist-info lists 0.17.1 would be taken for ready and fail later as a Ruff error. Fix: a case whose scenario answers `--version` of `shellcheck` with exit 1 and expects one `venv` and one `install`; the Python-version branch can stay untested (the gate needs Python 3.14), or get a case with a patched `sys.version_info`.

**M6 — `README.md:86`, commit `287a6c48`, item 10.**

Remark: the paragraph on `npm test` still lists among what the gate „needs” „the environment `.runs/quality-venv` described above”, while `README.md:68`, added by the change, says a directory without it gets it by itself.

Reason: a reader who reads the paragraph of the one command first takes the environment as a precondition and makes it by hand, which item 10 sets out to make unnecessary; it is the kind of sentence item 10 asks to stop contradicting (there for „download nothing while checking”). Fix: „…, the environment `.runs/quality-venv` described above, which the quality test makes where it is absent (network access to the Python Package Index needed), …”.

**M7 — `foundations/decisions.md:3839-3840` (D-207, *Rejected*), commit `2c59fe44`, item 1 — the wording is mandated by the task.**

Remark: „up to 16 saves of about 9.8 KB each, about 157 KB together, in the half minute of Las” still calls 480 game minutes at 16× „the half minute of Las”, the same reading of 480 game minutes as the length of Las that items 2 and 3 remove two sentences above.

Reason: the task's item 1 prescribes „w półminucie Lasu przy 16×”, so the change follows it; but a map run of Las lasts 480 game minutes only where it solves Las at its shortest (the task's *Context*: the chronicle measurement of 13.11 had a median of 1670), and a longer one at 16× sends more than 16 saves. The number per half minute is right; „of Las” makes it read as the whole cost of a map run of Las. Fix: „in the half real minute of the first 480 game minutes of a map run of Las at 16×” or „in each half real minute at 16×”.

**M8 — `foundations/environment_facts.md:173` (fact `loop2-app-log-confirmation-mail-events`, *Source*), commit `5d6a47ea`, item 11 — for the human.**

Remark: the reading recorded as the fact's source went beyond the reads the `loop2-deploy` skill allowed at the time: it piped `zgrep`/`grep` through `grep -F` and `sed` with no `-m` or `tail` bound, and ran `sed --version` and `zgrep --version`, which the list „Allowed, for a reading in an environment fact only” (`.claude/skills/loop2-deploy/SKILL.md:71-75`: `stat`, `bash`, `grep`, `docker`, `docker compose`, `free`; „no other pipe or option”) does not name. The author named this reach in the author's report.

Reason: the reads were read-only and the pipe printed fewer data than an allowed `grep -F -m 50` would (dates, event names and purposes, no `accountId`); I found no address and no account identifier in any file, report or commit of the range. But the skill's list is the operator's agreement for an MCP server with full rights, and the fact now holds, as its source, a command an agent repeating the reading may not run. Leaving it: the next agent that re-reads the fact either breaks the agreement again or cannot reproduce the source. Fix, for the human: either add the filtering pipe and the two version reads to the allowed list (a change of the agreement), or accept the one-off reach knowingly; no change of the fact's statement is needed.

### What holds in pass B, checked

- Items 1–3: D-207 *Rationale* and *Rejected* (`foundations/decisions.md:3807-3842`) say what the task's answers 1–3 give; 9.8 KB and 157 KB agree with the measurement of the task's *Context* (9 669–9 949 B, medians 9 739–9 871 B; 156 195–158 668 B, median 157 230 B); the template's rule for a measurement of the product's own (`.the-way/elements/decisions/template.md:57-62`) is followed; „8 real minutes at 1× and half a real minute at 16×” is now tied to 480 game minutes, „and more for a longer one”.
- Item 6 in `foundations`: five sentences, none binding (`:6026` D-190 *Rationale*, `:6722` a `violates` clause, `:8327`, `:8440`, `:8758` *Verification*); no `decision:` quotation reaches them. No bare „loop” meaning the earning loop is left in `decisions.md`, `invariants.md`, `glossary.md`, `part_map.md` or other tracked Markdown (searched; the hits are the predecessor game, „loop2”, a programming loop, a crash loop, the scene's animation).
- Item 7: the fact `playwright-firefox-webkit-releases` (`foundations/environment_facts.md:182-187`) states what its reading prints (1532/2311 against 1553/2368), the same as the task's reading of 2026-11-14; D-396 *Based on* names it and *Rejected* says what answer 7 a and settlement row 5 give.
- Item 9: one sentence added to `AGENTS.md:19`. Item 10: `README.md:42`, `:68`, `:70` (see M6).
- Item 12: no `-m` log read is left in either copy; the copies are equal; the table rows hold no pipe in a cell.
- D-423 (`:9173-9185`) and D-424 (`:809-820`): fields in the template's order; *Rejected* of D-423 holds answer 4 b and c with their costs, answer 5 a stands as an accepted cost; *Rejected* of D-424 holds answer 8 b and c and answer 9 b. *Relations* derive from D-18 and D-376, and from D-30 and D-31. The code does what each binding sentence says (pass A).
- The glossary (`loop`, `earning loop`, `loop clock`) says nothing the change made untrue (WAY-97).

## Out of scope (beyond the task)

**O1 — `foundations/decisions.md:5422-5424` (D-129, *Rationale*) and `:5449-5453` (D-130, *Rationale*) — handoff point 8. Outside the task: the task lists only D-207.**

Remark: D-129 says „with the browser tab hidden, a mage sent then passes the whole of Las unseen in half a real minute”, and D-130 says „at 16× a player who leaves the tab for 30 seconds lets a whole map run of Las, to its completion or its death, pass unseen”; both take 480 game minutes for the whole of a map run of Las, the fault items 2 and 3 removed from D-207. D-130's „At 1× the 480 game minutes of Las take 8 real minutes and at 16× 30 real seconds” is correct arithmetic but carries the same suggestion.

Reason: a map run of Las completes after at least 480 game minutes and often far more (the task's *Context*: median 1670 in the chronicle measurement of 13.11); at 16× half a real minute shows 480 game minutes, not a whole map run to its completion. A reader judging how much a hidden tab costs at 16× gets the same wrong bound items 2–3 were made to remove. Grade if it were in scope: Minor (*Rationale* only, no binding sentence). Fix (another task): „lets 480 game minutes of a map run of Las, the whole of the shortest one that solves it, pass unseen”.

**O2 — `foundations/decisions.md:2079` (D-355, *Verification*, `complies`). Outside the task: D-355 is not among the entries the task changes.**

Remark: the `complies` example still reads „an agent looking for a failure from before the last deployment with a `grep` of the file that limits its matches”, while the skill (item 12) now bounds the output with `tail` and leaves the matches of `grep` unlimited.

Reason: the binding sentence („a bounded `tail`, `grep` or `zgrep`”) and the `violates` example („reads it whole with no bound”) hold for `grep … | tail -n 50`; only the example's words describe the old method, so an agent comparing the skill with D-355 may call the new commands non-compliant. Grade: Minor. Fix (another task, through the decision's skill): „with a `grep` of the file whose output is bounded, keeping the newest lines”.

## Declined to judge

- The order in which the editor lists offered items (`offeredItems`, the case near `tests/view/program-editor.test.mjs:1208`) — still the items' data order; answer 5 and *Out of scope* keep it, and it is no default.
- The default resource of „Tu leży mniej niż”, „Idź” and „Zbierz” — *Out of scope* (answer 5).
- Whether `guidelines/coding.md:51-53` („testy uruchamiają lokalne kopie, bez pobierania narzędzia przy kontroli”) needs a sentence — still true (the download is before the first check) and a change goes through the skill that maintains the coding guidelines; outside the task's *To do*.
- The structure of the code: `guidelines/coding.md` has no `### Size of a function and a file`, so no size test exists; the two new files have 130 lines each and `program-editor.ts` grew by 3; no structural finding.

## Checks

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `9a778cdbbdb54edcce17e752cc37bbbb8fdc53a5`, exit 0 |
| Pinned the-way | `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` | both `bfb2e109…`, exit 0 |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py d8e318c3… 9a778cdb` | exit 0; +358 lines over 46 files |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, `0 error, 144 warn, 7 info`; the warnings on the changed skill lines are dead server paths, the kind the files held before; the count was not compared with the base |
| Logic of item 8 | `python -B test_quality_environment.py` in `tests/quality/` | 6 tests OK, exit 0 |
| Editor, item 4 | `npm test -- tests/view/program-editor.test.mjs` | exit 0 |
| Rule editor, item 4 | `npm test -- tests/view/rule-editor.test.mjs` | exit 0 |
| Mutation, simulation data | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/conditions.ts:100" --incrementalFile <my dir>` | exit 0; no mutant made on that line (the other changed simulation files changed in comments only) |
| No network when complete | stand-in index logging requests on 127.0.0.1, empty `PIP_CACHE_DIR`, `.runs/quality-venv/Scripts/python.exe -m pip list --format=json` | exit 0, no request; positive control `pip index versions pip` → 2 requests logged |
| Half made / other version | a script calling `ensure_quality_environment` on two scratch roots (a venv with python only; a copy of the real environment with the pin edited to `ruff==0.17.0`), index dead | both: not ready before, `venv --clear` then `pip install --require-hashes -r requirements-quality.txt`, `EnvironmentNotMade` with the one message; only `/simple/ruff/` and `/simple/pip/` requested, by the install |
| Skill copies | `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | no difference |
| Stale test-name quotations | each of the 87 old `test("…")` strings and 2 old Python method names searched with `git grep -F` | no hit |
| Personal data | search of the added lines, the commit messages and the cycle's reports for e-mail addresses, `accountId` values, host names and IP addresses | none, besides the committer's own git address in the author's report, as the git log holds it |
| Invariant header | `foundations/invariants.md:830` against `tests/invariants/test_streak_program_change.py:1-4` | equal |
| Full gate | not run | the orchestrator's (`npm test`) |
| The game's log on the server | not read | not asked; the handoff says so |

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md:40-84` — the rules for *Rationale*, *Rejected* and a measurement of the product's own, to judge D-207, D-423, D-424.
- D-129 and D-130 (`foundations/decisions.md:5403-5454`) — handoff point 8.
- D-355 (`foundations/decisions.md:2071-2084`) — item 12 changes how an agent reads the log D-355 governs.
- `foundations/invariants.md:828-830` — item 5.
- `foundations/glossary.md:223-251` — item 6 and WAY-97.
- `.claude/skills/loop2-deploy/references/backup_and_restore.md`, search for `tail -n`/`newest` (lines 526-557) — the method item 12 copies.
- `.claude/skills/loop2-deploy/SKILL.md:51-95` — the allowed reads, for M3 and M8.

## Working copies

- `.runs/review-whole/` held the saved diff, the decision index, a request-logging stand-in index script, the crafted-conditions script, two scratch roots each with a `.runs/quality-venv`, two pip cache directories and the logs of the runs. Removed (`rm -rf`), confirmed by listing `.runs/`; `git status` of the worktree is clean.
- StrykerJS, the product's own tool, wrote its report to `.runs/stryker/mutation.json` in the worktree (ignored by `.gitignore`); it stays as a file of the product's tool. Its `.stryker-tmp/` is gone.

## Unread material

Decisions of the index read whole: 6 of 111 listed in full (D-130, D-153, D-207, D-355, D-423, D-424); the 292 listed by heading were run through and D-129, D-130 and D-355 opened from them.

Decisions that bear on the change and stayed unread whole:

- D-396 — binding sentence (index) and the changed *Based on*, *Rationale* and *Rejected* (diff); its *Verification* not read.
- D-376, D-18, D-208, D-30, D-31, D-189, D-242, D-249 — index lines, and for D-189, D-249 and D-190 the changed *Verification*/*Rationale* lines in the diff.
- D-129 — its *Rationale* end and *Rejected* only (`:5420-5426`).
- D-406 — heading only (whether the gate runs Python test directories at the same time; only `tests/quality` uses the environment).

Guideline files not read whole:

- `guidelines/styleguide-browser-view.md` — not read. The browser-view changes are comments in CSS, TSX and TS files and the logic of `newCondition`, which changes nothing the player sees.
- `guidelines/coding-saved-game.md` — not read; the change of `src/browser/sim/saved-game.ts` is two comments.

Read whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-content-data.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`. The-way's glossary not read; the part-map entries not read (the foundation check passes and assigns the two new files).

## Searches not found or unclear

- „created that day” of D-153: no source in the fact or the task (M1).
- The number of `check_instructions.py` warnings on the base: not measured, so whether the change added warnings is not known (all seen are dead server paths).
- Whether `.runs/stryker/` existed in the worktree before my StrykerJS run: not known.
- The handoff calls the README sections Polish in the orchestrator's earlier handoff; the README is English there, as the author found.
