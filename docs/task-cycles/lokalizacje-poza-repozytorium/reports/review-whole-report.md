FAIL a4b91978ede3f6393661e4674dba6e35bad92526

# Review of the whole change — lokalizacje-poza-repozytorium

Range `211a4ea..a4b9197` (four commits `a71321b`, `e11b8da`, `f6d19ce`, `a4b9197`); `git rev-parse HEAD` in the worktree is `a4b91978ede3f6393661e4674dba6e35bad92526`. Route: one author without a plan, no spec, no earlier review. The author's report was read as claims to verify.

## Summary

The work the task asks for in items 1-6 and in both settlements is done and faithful: the nine paths are gone, no other absolute path or note link remains beyond the 12 hits below, the sense of D-82 and of `action-duration-minimum` is unchanged, D-362 and the invariant meet the foundation's form, and the test follows the installation README. Item 7 ("after items 1-6 the new test passes") is not met: the test is red on 12 hits that are false hits of the pinned check. I confirmed that these 12 are the only hits (a scratch worktree with only those three files' text changed gives exit 0, see Checks). Because the red test is a missed requirement of the task and the invariant entry says `Violated: no` while its test fails, the verdict is FAIL. The cause lies outside what the task allows the author to change (no exception of loop2's own, no pin move), so the fix is a choice for the human; the options are listed under F1.

## Findings

### Blocking (Critical / Important)

**F1 — Important, within the task — item 7 and Settlement 2 are not met; `tests/agent_workflow/test_tracked_file_private_paths.py` fails.**
Place: the test file `tests/agent_workflow/test_tracked_file_private_paths.py:16-19`, and the three files that hold the hits: `.claude/skills/loop2-deploy/references/backup_and_restore.md:211,224`, its copy `.agents/skills/loop2-deploy/references/backup_and_restore.md:211,224`, `foundations/environment_facts.md:39,52`.
What is wrong: the pinned command (`e3825a8`) reads the class `[:space:]` between double brackets, the POSIX class inside `grep -E` patterns of a documented shell command, as a note link in a Markdown file. It lists 12 hits (6 lines, each printed twice), exit 1. Task item 7 requires that after items 1-6 the test passes; `npm test` will fail on this test.
Why it matters: the repository cannot merge with a red test in its one command, and the invariant `tracked-file-private-paths` has no way to be true while the pinned command reads that text as a link. The lines mirror a block of `deploy/loop2-backup` / the deployed script, and `foundations/environment_facts.md` quotes it word for word, so changing the text is not free either.
Evidence: `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` exit 1, 12 listed, 435 files checked; `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` `FAILED (failures=1)`. In a scratch worktree of the head with the class `[:space:]` between double brackets replaced by `[ ]` in exactly those three files the same command gives exit 0, 0 listed: the 12 are the only remaining hits, and the change itself leaves no other path or link (my own `git grep` for drive paths, `/c/`, `The Brain`, `Storage\`, `[[` in tracked files gives nothing else).
Cause and the author's behaviour: the author did not hide the failure, added no exception and did not move the pin, as the task's answers to questions 3 and 4 and the orchestrator's answer require. That is correct conduct, and it is why the finding is a defect of the task's premise (the task rests on a trial of 2026-11-09 that predates the lines), not of the author's code. It is still a blocking finding: the requirement is unmet. I did not verify the commit dates of `76120d8` and `08f7a06`; the orchestrator's account is taken as given.
Ways out (all need a decision outside the author's reach; none is a change of this range): (a) a version of the-way whose check does not read the class `[:space:]` between double brackets as a link — a pin move, which question 4 forbids for this task; (b) a change of the text of the three files so the check does not list them — touches words that mirror the deployed script and a fact that quotes it word for word, so it needs a decision of its own and the copies kept equal; (c) a loop2 exception — the invariant sentence would name the files in backticks, which question 3 forbids and which would let a real path through in those lines. Do nothing and the test stays red.

**F2 — Important, within the task — `foundations/invariants.md` `tracked-file-private-paths` says `Violated: no` while its own test fails.**
Place: `foundations/invariants.md`, entry `tracked-file-private-paths`, field `Violated` (the entry that starts at the heading `## tracked-file-private-paths`, just above `## Withdrawn identifiers`).
What is wrong: the sentence says no tracked file contains a note link "as the check of tracked files in the pinned the-way reads them"; the pinned check reads 12 lines as note links, so on this commit the sentence is not met, yet the entry states `no`. The invariant template says an invariant the product does not meet today is marked violated (the `Violated` field takes `no | yes`).
Why it matters: a later agent reading the log is told the rule holds when its test is red. This is the foundation entry the change itself writes and it disagrees with what the files do (WAY-263).
Evidence: F1 output above; the field value in the diff of `a71321b`.
Resolves with F1: if the red test is fixed by (a) or (b), `no` is true; if the cycle ends with the test red, the entry should read `yes`, written through `the-way-record-invariant`, until the choice is made.

### Minor

**M1 — Minor, within the task — the invariant is broader than the decision it derives from.**
Place: `foundations/invariants.md`, sentence of `tracked-file-private-paths` ("an absolute path on a disk or, in a Markdown file, a link to a note") against the binding sentence of D-362 in `foundations/decisions.md:8083`, which forbids only "an absolute path on that disk" (the author's disk) and says nothing of note links.
What is wrong: the invariant's *Derives from* is D-362, but D-362 does not bind the note-link part nor the "any disk" breadth. A reader who follows *Derives from* finds no source for the link clause (the task's Settlement 2 and the README's wording cover it, but D-362's row 1 does not).
Why it matters: low; the restatement is broader and unqualified (WAY-263 reads such a restatement as Important when the files do what the entry forbids; here the files do not, so I grade Minor). A clause in D-362 that no tracked file holds a link to a private note, or a *Derives from* with the README's source, would close it.

**M2 — Minor, within the task — the test's subprocess has no time limit.**
Place: `tests/agent_workflow/test_tracked_file_private_paths.py:17-18`.
What is wrong: `subprocess.run(...)` without `timeout`. The testing guideline (the `Time limit` rows of the recipes: "testy procesów także przy swoich wywołaniach") and the neighbouring tests in `tests/agent_workflow/test_loop2_play_skill.py:37,77,88` pass `timeout=30`. The command only runs `git ls-files` and reads files (1.3 s here), so a hang is unlikely; the installation README's pattern has no timeout either.
Why it matters: a stuck `git` would hang the whole run without a message.

### Out of scope

none (every finding above lies within the task).

## Declined to judge

- Moving the pin of `.the-way` to a version whose check does not list the class `[:space:]` between double brackets: question 4 of the task forbids it; named only as a way out in F1.
- Names of private notes and the fragment `Notes/Projects/(P) Loop/_zadania` left in about 310 lines (`foundations/decisions.md`, tests, guidelines): question 2 of the task settles that they stay; the check does not list them.
- The failing `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality/test_quality_invariants.py` (tools not installed): fail on the base, not touched.
- The full gate `npm test`: the orchestrator's run, not repeated.
- The truth of the commit dates of `76120d8` and `08f7a06` (orchestrator's account).

## Checks I ran (command, exit code)

- `git rev-parse HEAD` -> `a4b91978ede3f6393661e4674dba6e35bad92526`, matches the dispatch.
- `git diff 211a4ea..HEAD` and `git log 211a4ea..HEAD` read whole (7 files, 59 insertions, 12 deletions).
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` (worktree root) -> exit 1; 12 listed, all `note link: the class `[:space:]` between double brackets`, in the five places of F1; `checked: 435 files, 12 listed, 12 binary files not read`.
- Same command in a scratch detached worktree of `a4b9197` after `sed 's/\[\[:space:\]\]/[ ]/g'` on the three files of F1 -> exit 0, `0 listed`. The scratch worktree was removed afterwards (`git worktree remove --force`); the reviewed worktree was not changed.
- `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> `FAILED (failures=1)` (the 12 hits). The pipeline's exit code (0) was that of `tail`, not of the test; the verdict is read from the output.
- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`.
- `git grep -n -I -E "a pattern for a drive path below the folders Storage and Users"` at `211a4ea` (excluding `.the-way`) -> the nine paths of the task at the nine places the task names (`AGENTS.md:3-5`, `foundations/decisions.md:1548`, `foundations/invariants.md:955`, `guidelines/testing.md:91,93,94`, `tests/view/scene-picture.test.mjs:34`); the same pattern and `/c/` at `a4b9197` -> no match.
- `git grep` for `_tasks_active`, `obsidian_rulebook`, `(P) Loop`, `Notes/` outside `foundations/decisions.md` at the head -> only the note-name fragments that question 2 leaves in place.
- `ls` of the vault folder `_zadania`: `zadanie_loop2_lokalizacje_poza_repozytorium.md` exists, so the *Origin* of D-362 names a real note (the cycle record had the same name).
- Not run: `npm test`; the mutation of the test (a mistyped invariant identifier gives exit 2 and the test asserts 0, read from `tracked_private_paths_check.py` `main`); ruff and shellcheck (not installed).

## Against the task, by item

1. `AGENTS.md:3-4`: two lines, each "the entry `projects` / `tasks` under `loop2` in the ... file `~/.the-way/locations.json`" with the clause for a missing file or entry; compared with `.the-way/project-level/backlog_place.md` and the Backlog of the-way's `AGENTS.md` at the pin: the form matches. Met.
2. `AGENTS.md:5`: the command kept, the rulebook named in words ("the author's rules for agent tasks in his notes"), as the-way's `AGENTS.md` word-for-word. Met.
3. D-82 (`foundations/decisions.md:1548`): "the folder that the entry `projects` under `loop2` in the locations file names, and in its `_zadania/` directory ..., and the approved `definicja_mvp_loop2.md` there". Same three sources, same state conditions, same rule on the draft and on the test comment; sense unchanged. Met.
4. `guidelines/testing.md:90-95`: same pointing as D-82, in Polish like the file; the sense and D-82 reference kept. Met.
5. `foundations/invariants.md:955` *Derives from* of `action-duration-minimum`: `wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania) § Settlements to record, row 7 — "..."; read 2026-10-29`; the passage, the row and the date are unchanged; the form matches the *Origin* fields. Met.
6. `tests/view/scene-picture.test.mjs:34`: "src/components/probe/Scene.tsx of the old Loop repository, lines 44-58 at cdc7c0d"; no behaviour change, only a comment. Met.
7. The test exists and cites the invariant; it fails. NOT met (F1).

Settlement row 1 (decision): D-362 holds a question that could be answered otherwise, 1-3 binding sentences (two), all fields of the template (*Scope* eight parts of the part map, *Based on* none, *Relations* none, *Verification* with `complies` and `violates`, *Origin* a real note with the question and row numbers), *Rationale* without a file name or count of its own, *Rejected* holds the three ways of questions 1 and 2 (the counts "about 310 / 298" come from the task's *Not chosen*, as the template's rule on rows allows). It sits at the end of the log, number following D-361. The decision names the entries `projects` and `tasks` and allows a note and its folder in the notes, as the row says.
Settlement row 2 (invariant): present, method `test`, *Part* `every`, *Derives from* D-362, sentence without backticked text, so the check skips no file and loop2 has no exception of its own (as questions 3 settles). Met in form; see F2 for `Violated` and M1 for its breadth.

The test against the installation README (`.the-way/installation/README.md`, the pattern at about line 98): same command path, same argument, `# invariant: tracked-file-private-paths` at the test, exit 0 expected, `ROOT = ...parents[2]` right for `tests/agent_workflow/` (the README uses `parent.parent` for a file one level deep), plus `check=False` that the README omits and the docstring. Equivalent; the test runs the command and imports none of its functions, as the README requires. Placement under `tests/agent_workflow/` matches `agent-workflow` in `foundations/part_map.md` (`foundation_check` finds the citation, 0 errors) and the gate picks it up (`scripts/test.py` ran it).

The fourth commit (`a4b9197`, docstring of `shell_path` in `tests/deploy/deploy_script_support.py`) removes the Git Bash form of a drive path that the check had listed at that line; no behaviour change (`git diff` shows only the docstring), and the author reports `tests/deploy/test_loop2_backup.py` OK (26 tests) — I did not rerun it, the change is a docstring.

The author's own-work check names item 7 as the weakest point and its check shows it unmet; it fits.

## Reaches beyond the dispatch

- `.the-way/task-cycle/tracked_private_paths_check.py` whole: to see what the command reads as a link, how the invariant's sentence is parsed and the exit codes (the dispatch names the command only).
- `.the-way/project-level/backlog_place.md` whole and the `## Backlog` section of `.the-way/AGENTS.md`: the form the `AGENTS.md` lines must take (the task item 1 names the file).
- `.the-way/installation/README.md` lines 70-127: the pattern of the test and of the invariant (the handoff names it).
- `.the-way/elements/decisions/template.md` and `.the-way/elements/invariants/template.md` (first parts): the form of D-362 and the invariant.
- `foundations/decisions.md` D-360 (as a neighbour entry) and D-361 heading; `.runs/task-cycles/.../cycle.md` line 3 and the vault folder `_zadania` listing, for the name of the *Origin* note.

## Unread material

Decisions of my selection: 2 read whole (D-82, D-362), plus D-360 read to the head of its *Rationale* as a model neighbour. I did not screen the other decisions of `agent-workflow`, `product-foundation` and the touched parts by title, nor open D-13, D-73 or D-83 although the testing guideline cites them. I did not search the log for a decision that would bear on where a public-repository rule stands beyond a `git grep` for `Notes/` and `(P) Loop` (which found only the note-name fragments). The invariants and the part-map entries of `agent-workflow` and `product-foundation` were not read whole: I read the entry I was asked to check, `action-duration-minimum`'s fields and grepped `foundations/part_map.md` headings; the glossary was not read. Guideline files: `guidelines/coding.md` read whole; `guidelines/testing.md` read whole except the long cells of the two big tables (cut to the first 500 characters per line in my output) and lines 1-150 of the Trust boundaries table; the per-kind coding files and the styleguide were not read (no kind matches a Python test, and the change touches no user interface). `.the-way/product-guidelines/reading.md` read to its section "Select and read". Beyond that: none. The author's report states its own unread material; I took it into account (the private-paths script I read whole).

## Searches not found or unclear

- I found no rule saying whether a test of an invariant in `tests/agent_workflow/` needs an entry in the Trust boundaries table or elsewhere in `guidelines/testing.md`; I took it that it does not (the invariant is not a trust boundary).
- The dates of commits `76120d8` and `08f7a06` were not looked up by me.
- Unclear: whether D-362 is meant to cover note links (M1); the task's row 1 does not say, the README's wording for *Derives from* suggests it.
