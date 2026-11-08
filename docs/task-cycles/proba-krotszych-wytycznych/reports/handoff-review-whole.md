# Handoff — review of the whole change (main change, with the trial's material as context)

The person who requested this cycle (Mariusz) delegated intermediate choices to the cycle's
orchestrator. You review; you change nothing and run no test of the product's full gate (the
orchestrator runs it).

Method: `.the-way\task-cycle\review\SKILL.md`
(the pinned the-way; read it whole, and a file it names when the step that names it comes).
Variant: **the whole change**. It was made by one author without a plan; no slice had a review of
its own.

Worktree and range to review: `the worktree of the task`, base
`df0f1256fe7ff85bca7c77f938900d8932168719` to head `aa03c0102c1b3b4a83ecbc70cc887652def540b8`
(branch `task/proba-krotszych-wytycznych`; one commit, `guidelines/coding.md`).

Read: the frozen task
`docs/task-cycles/proba-krotszych-wytycznych/task.md`
(whole: it is the requirement; items of *To do*, questions 1–8 with their answers, *Out of scope*);
the author's report `…\reports\author-1-report.md`; the merged classification
`…\reports\classification-merged.md` (the two classifiers' own reports are
`classification-A.md`, `classification-B.md` in the same directory; the units are in
`inputs-sentences.md`); the author's handoff `…\reports\handoff-author-1.md`.

## What this change is, and what to judge

The task asks for a measurement and a small change. The change that can reach `main` is the
shortening of loop2's own sentences of `guidelines/coding.md` in groups *przypadek wyprowadzalny z
celu* (when its origin is no agent's mistake), *spis stanu* and *powtórzenie decyzji albo
konfiguracji*; sentences describing a known practice and sentences copied from the-way's template
stay (task *To do* 5, questions 1 and 2). The rest of the task's outcome is the trial branch and the
numbers; they are context for you and you also judge their fidelity to the task (below).

1. **Source fidelity of the main change.** For every sentence removed or reworded in
   `df0f125..aa03c01`: is it a loop2 sentence of one of the three groups by the merged
   classification (both classifiers agreeing; a disagreement stays), not a sentence copied from the
   template (`.the-way/product-guidelines/coding/template.md`), not a known-practice sentence? The
   author kept S003, S037/S038 against the table and reworded S020 and S034b: judge each.
2. **Meaning.** The classification claims that removing a repeated-decision or listing sentence
   changes no meaning because the decision, the config or another file carries it (WAY-172: a changed
   meaning of a product's guidelines is a decision of the product's log). For each removed sentence
   read the decision or file the author names (`foundations/decisions.md`: D-28 … D-33, D-252, D-253;
   `guidelines/coding-browser-module.md`) and say where the claim is false or doubtful: a fact an
   agent that reads only `guidelines/coding.md` loses. The author lists S024, S019, S053 as the
   weakest; judge them and look for others.
3. **Form and references.** Does the file still meet the form (`foundation_check.py` is the author's
   check; the form block of `.the-way/product-guidelines/template.md` and WAY-168/171 give the rest),
   do the kept sentences still read (dangling references), does anything in the repository refer to
   a removed sentence or to a heading whose body went (grep over the whole repository)?
4. **The rest of the task, as context, judged for fidelity.** The trial file is commit
   `7f38c445f015865f084fc65d7a5a7291716ab2cf` on branch `trial/shorter-coding`, worktree
   `the worktree of the trial file branch` (`git diff df0f125..7f38c44`): does it apply the
   classification (known practices replaced by name, derivable cases and listings removed), and keep
   what the task says stays? The trial tasks are on branch `trial/tasks` (worktree
   `the worktree of the trial tasks branch`, head `543b6f64de85f6768fe20e409a5ff01eaaba1354`,
   already reviewed: `…\reports\review-tasks-report.md`, PASS with 8 Minor). The measurement ran 5
   agents per task per file: results in `…\reports\results-tests.jsonl` (30 of 30 pass; 5/5 for the old
   file and 5/5 for the shortened one on each of T1, T2, T3), the agents' sources in
   `…\reports\runs\<run>\`. Judge whether the measurement was run as the task's questions 6 and 7
   say and whether anything in how it was run (run directories made with `git archive` of `df0f125`
   and of `7f38c44`, junction to `node_modules`, prompts as in `trial-tasks/T<n>/prompt.md`) could
   have spoiled the counts; say what the counts can and cannot show (do not recompute them).
5. Anything else the method has you check (a trust boundary and an irreversible operation are
   answered `no` for this change).

Do not judge the-way's own process, the user's agent instructions or another repository; put such a
remark in **Searches not found or unclear** or in a short "remarks on the process" at the end.

## Report

`docs/task-cycles/proba-krotszych-wytycznych/reports\review-whole-report.md`
(first line `PASS <sha>` or `FAIL <sha>` by the method; findings graded; every finding names the
slice it comes from or `none`, and the file and line; the checks you ran with command and exit
code), with **Searches not found or unclear**. Return its first line, its path and the count of
findings per grade.
