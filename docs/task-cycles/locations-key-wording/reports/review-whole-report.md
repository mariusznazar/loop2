PASS 02526a59518c26eb60e5ed91f26a91040b523618

# Review of the whole change — locations-key-wording

Range: base `ba67f04503afc56dc965bd197897b0a8f2adbeae` to head `02526a59518c26eb60e5ed91f26a91040b523618`, branch `task/locations-key-wording`. `git rev-parse HEAD` in the worktree is the given head. Commits (`git log base..head`): `aacbbf16` AGENTS.md, `68745036` D-362 in `foundations/decisions.md`, `02526a59` invariant `tracked-file-private-names` in `foundations/invariants.md`. One author, no plan, no slices: every blocking finding would come from none of the slices; there are none.

## Findings

### Critical

none

### Important

none

### Minor

none

## What I checked and found right

- **To do 1 (`AGENTS.md` lines 3-5).** The word diff shows 10 swaps `entry` → `key` and nothing else: in each of "the entry `projects`/`tasks`/`task-rules`", "The folder the entry names", "The list of tasks the entry names", "Where the file or the entry is missing" (twice), "offers to add the entry to the file" (twice) and "A missing entry or file". Every phrase the item lists changed; the rest of the wording is unchanged. Met.
- **To do 2 (D-362, `foundations/decisions.md:753-766`).** Binding sentence: "by the key that stands for it", "which are the keys `projects`, `tasks` and `task-rules`" (2). *Rationale*: "The name of a key carries the pointer without the path, and the value of the key lies in the user's own file of places" — word for word the target sentence the task gives (2). *Rejected*: "points by a key", "listing only the keys `projects` and `tasks`", "for a key outside the rules of loop2" (3). Kept, as the item and *Out of scope* require: *Rationale* "finds the reasoning where it stands in the entry" (line 765) and *Verification* "a comment, an entry or a guideline" and "an entry or a comment that leaves out…" (line 762) — each of those means an entry of the foundation (the-way's glossary, `.the-way/foundations/glossary.md:49-51`). Articles `an` → `a` only where the noun changed. No sentence rebuilt. Met.
- **To do 3 (invariant, `foundations/invariants.md:1298-1306`).** "by naming the key `projects`, `tasks` or `task-rules` under `loop2`" — the one swap; *Method* `review`, *Derives from* `D-362 · D-13`, *Part* `every`, identifier unchanged. Met.
- **Meaning unchanged.** Each changed sentence names the same thing — the name under `loop2` in `~/.the-way/locations.json` — and now uses the word the pinned the-way uses for it: WAY decision at `.the-way/foundations/decisions.md:8350-8377` ("a JSON object whose keys are repository names, each holding keys by name, such as `tasks`, `projects` and `task-rules`, whose values are paths"; complies: a tracked file "says 'the key `tasks` under `the-way`'"). The new *Rationale* sentence "the value of the key lies in the user's own file of places" agrees with "whose values are paths on the user's disk". No binding sentence gained or lost a qualification (WAY-263): the scope, the three names, the file and the prohibitions are as before.
- **Completeness of the rename.** `git grep` over the tracked files outside `.the-way` for "entry/entries" within 40 characters before `projects|tasks|task-rules|locations`, and for "locations.json / locations file" followed within 80 characters by "entry/entries": no hit (exit 1). The only places that name these names are the three changed. Positive control: `git grep` for "the (key|entry) `(projects|tasks|task-rules)`" finds the three lines of `AGENTS.md` and the invariant, all with "key".
- **Settlements and marks.** *Settlements to record* row 1 ("sentence of D-362") is met by commit `68745036`; D-362 marked `row 1` is right — the row carries the whole of D-362's change (which "entry" changes and which stays). The invariant marked `the cycle's` is right by `.the-way/task-cycle/skill/foundation_step.md:30-33` ("the last for an entry no row and no projected entry carries whole"): its change comes from question 2 and *To do* 3, which no row carries. The consequence of the mark is only that the request shows the invariant to the human again, which is harmless. Both meaning sentences of the author's report (English and Polish) agree with the entries as changed; the invariant's sentence restates it whole; D-362's sentence states its first binding sentence plus the settled use of "entry", which is what row 1 settles.
- **Answers of the task.** Question 1 (definitions outside the repository) — nothing of it is in the range, correctly. Question 2 (D-362 and the invariant included, *Verification* "entry" kept) — followed exactly. *Decisions in play* — both entries changed as their lines say, meaning unchanged.
- **Against the foundation of the touched parts.** The change itself names no note, no folder of notes, no absolute path and no file of the private repository of the old loop game (`tracked-file-private-names`, `tracked-file-private-paths`); `foundation_check.py`, which runs the check of tracked files, reports 0 errors. No other invariant of `agent-workflow`, `product-foundation` or `every` is reached by a change of wording in Markdown. No invariant test changed.
- **Trust boundary and irreversible operations.** The part map gives `agent-workflow` the one trust boundary `.github/workflows/tests.yml` and `product-foundation` none (`foundations/part_map.md:136-162`); the range does not touch it. Nothing in the range cannot be undone. Agrees with the handoff's two answers.
- **Reserved choice.** None taken: no language, framework, library, store, login or place to run.
- **Tests.** The range writes and changes no test. No test cites D-362 by a `decision:` line and the invariant's *Method* is `review`, as the task's *Context* says; the `git grep` above found no test text holding the old wording.
- **Structure of the code.** No code changed. `change_file_sizes.py`: `AGENTS.md` 37 → 37, `foundations/decisions.md` 11697 → 11697, `foundations/invariants.md` 1456 → 1456 lines. The size rule of `guidelines/coding.md` covers code files only; no function or file grew. No run of the size test needed.
- **Author's own-work check.** It names the requirement where this change is weakest — every "entry" of the locations-file meaning changes, every "entry" of the foundation meaning stays — and its word diff would catch either miss; my own word diff and the `git grep` confirm it.
- **Author's walk.** None reported and none needed: no behaviour a user sees changes; instruction and foundation wording only.
- **Author's unread items (handoff).** I read each myself and none bears on the change: the-way's glossary entry "entry" (`.the-way/foundations/glossary.md:49-53`) confirms the kept uses mean an entry of the foundation; D-13 (`foundations/decisions.md:1810-1823`) is about the server's secrets and the private note, which the invariant refers to unchanged; the part map entries of the two parts give the parts and the trust boundary above. The `examples.md` of the decisions and invariants elements teach the form of a new entry; the change writes no new entry and alters no field or form, and `foundation_check.py` passes, so they cannot bear on it. The missing glossary entry for "key": none in the-way's glossary at the pin and none in loop2's (`foundations/glossary.md`, headings read); the term rests on the pinned WAY decision quoted above, and every changed sentence qualifies "key" by its backticked name and "under `loop2` in the locations file", so no sentence the files hold would be read wrongly — under section 3 that would be at most Minor, and I find no sentence to cite, so no finding.

## Declined to judge

- The two approved definitions outside the repository (`## Gate record` → `## Approval record`, question 1): outside the repository and the range, done before the cycle by the task's answer.
- Other meanings of "entry" in loop2 (chronicle entries in `src/browser/view/chronicle.ts`, entries of a lock file in `tests/invariants/test_browser_view_framework.py`): *Out of scope* of the task.
- The 149 warnings of `check_instructions.py` on the head: none comes from the range (see Checks); their cleanup is outside the task.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` (worktree root): exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py` (worktree root, head): exit 0, `0 error, 149 warn, 7 info`.
- `python -B .the-way/instruction-files/check_instructions.py .runs/review-whole/base` (a detached worktree of the base, run with the head's pinned script): exit 0, `0 error, 249 warn, 7 info`. `Compare-Object` of the two outputs: every warning line of the head stands in the base output too; the 100 extra lines of the base are dead paths into `.the-way/` and `.runs/`, which that worktree lacks (no submodule, no `.runs`). So the change adds no warning — this settles what the author left resting on the warning texts.
- `python -B .the-way/task-cycle/change_file_sizes.py ba67f04503afc56dc965bd197897b0a8f2adbeae 02526a59`: exit 0, numbers above.
- `python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/sections.md --sections`: exit 0. Then `--output .runs/review-whole/index.md --section "Code rules, exemplars and static checks" --part agent-workflow --part product-foundation --decision D-362 --decision D-13`: exit 0 (a first call with `--decision 362` ended exit 2, `no decision 362`; repeated with the `D-` prefix).
- Manual: `git diff` and `git diff --word-diff` of the range, read whole — 18 swaps, nothing else; `git grep` searches above; `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` both `19e5774aed6d1d628042e23deccc110ed9f112c0`, the pin unchanged; `git status --short` clean.
- Not run: `npm test` — the handoff excludes the full gate (no `node_modules` in the worktree); CI is the cycle's final gate. Unverified here: every check of the one command other than the two run above.

## Reach beyond the dispatch and my selection

- the-way's decision on the locations file, `.the-way/foundations/decisions.md:8350-8378`, found by `git -C .the-way grep` for "the key `": to confirm that the pinned the-way names these names "keys" and gives the key a value, which the new *Rationale* sentence relies on.
- `.the-way/task-cycle/skill/foundation_step.md:28-49`, found by search for `` `the cycle's` ``: to judge the marks, as the handoff asks.
- `.the-way/product-guidelines/reading.md`, whole: to select guidelines.

## Working copies

All in `.runs/review-whole/`: a detached worktree of the base at `.runs/review-whole/base` (removed with `git worktree remove --force`, exit 0; `git worktree list` no longer shows it), and the files `sections.md`, `index.md`, `invariants-selected.md`, `foundation_check.txt`, `check_instructions_head.txt`, `check_instructions_base.txt`, removed with the directory after this report was written.

## Unread material

- Decisions read whole: 2 of the 27 listed in full in the index of my selection (D-362, which the change changes; D-13, which the task names through the invariant). The other 25 listed in full were read in the index (binding sentences and *Scope*); none is changed, gone against or answered otherwise, and none leaves open what this change has to do. The 47 decisions listed by heading alone were run through by their questions; none points to a bearing on the wording of the backlog section or of D-362 (the nearest, D-82 on documents supplying test expectations and D-414 on the start warning of `.the-way`, do not touch the locations file). No decision that bears on the change stayed unread.
- Guideline files: `guidelines/coding.md` and `guidelines/testing.md` name `agent-workflow` in *Applies to* but were not read — by `.the-way/product-guidelines/reading.md` the reading is for work that changes a user interface, writes code or writes or changes a test, and this change does none of these (Markdown wording of an instruction file and two foundation entries). `guidelines/styleguide-browser-view.md` applies to `browser-view` only, which the change does not touch.
- The `examples.md` of the decisions and invariants elements: not read, for the reason given under the author's unread items above.
- The invariants of my selection (*Part* `agent-workflow`, `product-foundation` or `every`, 25 entries), the part-map entries `agent-workflow` and `product-foundation`, and the glossary entry "entry" of the-way were read whole; loop2's glossary by headings (no entry for "entry", "key" or the locations file).

## Searches not found or unclear

- A glossary entry for "key": none in `.the-way/foundations/glossary.md` (headings 7-223) and none in `foundations/glossary.md`. The meaning rests on the-way's decision at `.the-way/foundations/decisions.md:8350-8378`.
- `decision_index.py --decision 362` found no decision: the switch takes the identifier with its prefix, `D-362`.
- `git grep` for "entry" near the three names or the locations file outside `.the-way`: nothing found, as expected after the change (positive control above).
