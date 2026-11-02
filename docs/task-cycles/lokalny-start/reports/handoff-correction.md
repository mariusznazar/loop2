# Handoff — correction for the human's remarks on request #50

## The remark, word for word

The human, in the session, 2026-11-02: „zmieńmy to zdanie, zmieńmy też D-254 i może jak i tak się zatrzymaliśmy to uwzględnijmy też uwagi minor”.

The remark binds. It answers the question of the request: the sentence of D-254 changes. It also takes in the Minor findings. It names neither the findings outside the task's scope nor anything else: those stay as they are.

## Stage

You are the author, resumed, in the variant "a correction for the human's remarks" of `make-change`; read what `C:\Storage\repos\loop2-wt\lokalny-start\.the-way\task-cycle\change\SKILL.md` names for it. Work in `C:\Storage\repos\loop2-wt\lokalny-start`, branch `task/lokalny-start`, head 302ea89. Do not run the full `npm test`, do not push and do not touch the request: those are the orchestrator's. Change nothing outside the repository, the vault included.

The return step on `e18c2ea` never ran, so take it inside this correction, as your last stage and last commit, by `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`: compare the entries this cycle wrote with the code as it then stands, and correct in the same change whatever no longer matches. No Minor finding lifts that duty.

## First: the merge of `main`

`main` moved after the request opened: #51 stands at fe25b7d. It took the numbers D-252 and D-253, and it brought rules on failures and logs. The orchestrator tried the merge and aborted it: the branch stands at 302ea89 with a clean tree. The earlier sentence of this handoff, that there is nothing to merge, no longer holds.

1. `git fetch origin main`, then `git merge origin/main`, never a rebase, as your first commit. Git reports conflicts in `foundations/decisions.md` and `foundations/environment_facts.md`. Keep every entry of both sides.
2. Renumber this change's decisions, each +2, as #47 renumbered its own. D-252 "How does an agent operate the game" becomes D-254; D-253 "Where does the data an agent checks the game on come from" becomes D-255; D-254 "Does the local start keep an account" becomes D-256; D-255 "Where does account mail go" becomes D-257; D-256 "What does the game present to a browser" becomes D-258. Change every reference of this change: the entries' own *Relations*, `foundations/invariants.md`, `foundations/environment_facts.md`, `foundations/part_map.md`, `guidelines/testing.md`, `README.md`, the skill's copies, `scripts/local-start.mjs`, `tests/`. Never touch a reference that means `main`'s own D-252 or D-253: mind the order of the replacements, so that a number is not carried twice.
3. `guidelines/testing.md` merged with no conflict and may now hold one number with two meanings in its lists: read each of its lines naming D-252 to D-258 against the decision it means. Git will not say.
4. Read, each whole, as they stand after the merge: `guidelines/coding.md`, and `main`'s D-252 and D-253 with what they link to. Compare `scripts/local-start.mjs` and the skill's `save-frames.mjs` with those rules. `scripts/local-start.mjs` imports the server, and `src/server/main.ts` now installs a last-resort handler and writes its failures through `src/server/log-line.ts`, so check what that does to a start that fails, to the wait on `process.exitCode`, and to the lines your skill and `tests/invariants/test_local_start_access.py` expect. Bring the code to the rules where they apply to it. Where a rule binds the file and the task leaves a way open, name it in your report.

The numbers in the sections below are those of 302ea89, as the review reports use them: read each through the list above.

## What to do

### 1. D-254 and what repeats it

Change the binding sentence of D-254 at `foundations/decisions.md:5146` through `the-way-record-decision`, to the reviewer's clause, word for word:

> each start of the command makes a database of its own and removes the databases of the starts it does not find running; a start whose port takes a connection and stays silent counts as running.

The word "ended" stays in the *Rationale* as it is. Bring `README.md:19`, `.claude/skills/loop2-play/SKILL.md` near `:32` and its copy to the same limit, a few words each. Close the comment at `scripts/local-start.mjs:20`–`:21`, where a port another program took "proves nothing" while `:205`–`:206` says silence counts as running: the reviewer names the word „answering”. See `reports/review-fix-2.md`, finding 2.

This closes `reports/review-whole.md` finding 2.

### 2. Minor findings to fix

Each stands in the reviewer's words in its report; fix what it names.

- `reports/review-whole.md` finding 3: two starts side by side share the session cookie in one browser. Give `README.md:19` and the skill near `:33`, both copies, the limit that two starts stay apart in two browsers or sessions.
- `reports/review-whole.md` finding 5: `SERVER_LINE.search(output).group(1)`, now in `Start.wait`, has no guard, so a start that fails on its server line leaves its process running. Make the cleanup reach it, and let the failure name what was expected.
- `reports/review-fix-1.md` finding A: `save-frames.mjs` gives the wrong reason for a path it cannot read. Both copies; a case in `tests/agent_workflow/test_loop2_play_skill.py`.
- `reports/review-fix-1.md` finding B: one clause in the skill, both copies, that the resize stays on the tab.
- `reports/review-fix-1.md` finding C: the code in the skill and `frames.js` are twins no test joins. Join what can be joined by a small case of `tests/agent_workflow/test_loop2_play_skill.py`; say what stays apart.
- `reports/review-return.md` finding 5: add the key `browser` to the passages of `playwright-cli-context-options`, from the source at its fixed commit, or drop it from the sentence.
- `reports/review-fix-2.md` finding A: `--stop` writes through a planted link and stops at a planted directory. `scripts/local-start.mjs` is a trust boundary: refuse a `stop` that is no plain file, and let one bad directory not keep the others from being told. Add a case citing `local-start-access` only if the case checks that invariant's sentence; otherwise leave it uncited.

### 3. Minor findings that take a decision instead

- `reports/review-return.md` finding 3: change the clause of D-252's *Rejected* through `the-way-record-decision`, the human having taken this finding in. Replace "more tokens and a setting outside the repository" by, word for word: "more tokens and a command sent at each tab where the CLI reads one file of the repository". Change nothing else of D-252. The definition in the vault keeps its text, and the request says so.
- `reports/review-return.md` finding 4: write a fact for `openssl` only where a source of the template's forms says what D-256 rests on, by `the-way-record-environment-fact`. Where you find none, write none and say what you searched. Do not invent a source.
- `reports/review-whole.md` finding 4: do nothing. The sentence stands quoted in the request, and task 5 rewrites it.

## Checks

Run, each with command and exit code: `tests/invariants/test_local_start_access.py`, `tests/agent_workflow/test_loop2_play_skill.py`, `tests/quality/test_quality_invariants.py`, `foundation_check.py`. A changed case that protects a behaviour is seen failing once with that behaviour broken, for the new cases of findings A and 5 at least; report the run. Stop every process you start and remove what your checks leave.

## Limits

Where a finding proves larger than it reads, or needs a choice the task, this handoff and the foundation leave open, leave that one finding unfixed and name it in your report with what it would cost, rather than growing the change.

## Report

Write your report to `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\correction.md`, with one row for each item above and its result, your commits, your checks, *Reaches beyond the dispatch*, *Searches not found or unclear*, and the fields of the record's *Return step*. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path. Commit by naming paths, the return step as its own commit.
