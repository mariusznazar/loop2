PASS 72817471ba8e077bac426840e0515e02c4b8da03

# Review of the whole change — pomiary-z-przegladu-fundamentu

Range `aa0ecd09a1037e3aff0ac2bcfc786f2707352929..72817471ba8e077bac426840e0515e02c4b8da03` (two commits, `6e5a2ade` and `72817471`). `git rev-parse HEAD` gives `72817471ba8e077bac426840e0515e02c4b8da03`, as dispatched. Pinned the-way `git -C .the-way rev-parse HEAD` gives `55afa8e57aa1b83c77108576a36642722e0dda15`, as dispatched. Route: one author, no plan, no slices, so the whole change is the only review it gets. Worktree not changed (`git status --short` empty before and after my checks).

Blocking findings: 0. Minor within the task: 4. Out of scope: 1.

## What the change does, against the task

| Row of *Settlements to record* / item of *To do* | Met? | Where |
|---|---|---|
| 1 / item 1 — D-268: threshold forty, limit stays 2 GiB, reason from the measurement, comment in `memory-limit.mjs` | Yes | `foundations/decisions.md` D-268 (binding sentence: "More than forty test files…", only that sentence changed in the binding part; Rationale gives 24 files, about 2.9 GiB without the one case that grows to the limit, 21 to 25 Node processes, 1076 MiB largest file, 20 cores / 32 GB, two other gates running; *Rejected* gains the 1.5 GiB limit); `tests/view/memory-limit.mjs:9-12` (comment only, no code line) |
| 2 / item 2 — D-04, D-147, D-339, D-347: measured chronicle size with what it leaves out; choice stays; only the reload rarity stays unmeasured | Yes | the four decisions; each ends with "one unmeasured assumption / one hypothesis" about the refresh in the middle of a map run |
| 3 / item 3 — D-208: 3 202, 9 838, 12 402 B; 12 and 9 loops, with assumptions | Yes | D-208 *Rationale* |
| 4 / item 4 — D-247: range 0.001 to 0.011 ms, no "lower estimate" | Yes | D-247 *Rationale* |

*Out of scope* kept: D-03 and D-75 untouched (no hunk in the diff), no change to the chronicle in the save, no measurement of the reload rarity. No invariant, glossary or part-map entry changed; the invariant `document-test-memory-limit` (`foundations/invariants.md:1188`) names 2 GiB and no file count, so it still holds. No test changed; no changed invariant test.

## Source fidelity (every figure against the frozen task's *Context*)

I compared each figure in the seven decisions and in the comment with the *Context* of `.runs/task-cycles/pomiary-z-przegladu-fundamentu/task.md`.

- Chronicle (D-04, D-147, D-339, D-347): 227.5 / 255 entries, 16 990 / 18 892 B, about 75 B an entry; "Las — głębiej" 118 / 186 entries, 8 822 / 13 853 B; readings every 200 ms at pace 16, 30 seeds for each variant, one character, a game that knows everything; leaves out the changes to the copy, discoveries and the paragraph of the last encounter; every run ended in a death. All match the *Context*. Game minute 1670 (341 to 1816) appears in D-347 only.
- D-208: 3 202, 9 838, 12 402 B; 12 loops (13 = 67 272 B), 9 loops (10 = 66 675 B); UTF-8 bytes sent to the server; one shared program, no manual map run, empty report of absence. All match.
- D-247: 0.001 ms (short runs ended by death) to 0.011 ms ("Las — głębiej" with wolf fights), one character in an earning loop, window of 30 days, median of 5 repeats; no loop ran all 30 days. Match the *Context* (0.00105 and 0.01080 rounded as the task's row 4 rounds them).
- D-268 and the comment: 24 files, about 2.9 GiB, 1076 MiB, 20 cores / 32 GB, two other gates, 21 to 25 Node processes, 1.5 GiB giving 1.4 times room (1536/1076 = 1.43). Match. "About twice the 1076 MiB" in the comment is 2048/1076 = 1.9, the author's rounding of the task's "about half of the limit".
- No figure outside the *Context* was found in the edited text. The old figures (13.4 KB, 102 entries, 48 median, 9.5 KB, 50 to 60 bytes, 2947, 6150, 7075, 0.0068, "ten", 1.68 GB) are gone from the whole repository outside `.runs`, `.the-way`, `node_modules`, `dist`.

## Judgment of the author's choices that go beyond replacing a figure

1. Dropping "so the game would stop saving" from D-04 and D-147 and replacing it with "would add the size measured above to a save that is not sent above 64 KiB" — acceptable. The old consequence followed from the old estimate; the measured chronicle alone (at most 18 892 B) is far below 64 KiB, so keeping the sentence would state something the measurement does not support. The new clause is true and weaker; the decision still has the version rise (D-206) as its other reason, and the binding choice is untouched. It does not contradict any remaining sentence (D-04, D-147 and D-339 now agree). Not a finding.
2. D-347 losing "By that measurement the chronicle of one map run fits the limit of 64 KiB" — acceptable. The *Context* gives no sum of chronicle and save, so the old conclusion cannot be restated; "the chronicle stays in the memory of the page (D-339), so it adds nothing to a save" follows from D-339's binding sentence. Residual effect: the measured figures now stand in the list of "Lacks" with no conclusion drawn from them (see Minor 4; low weight).
3. The comment in `memory-limit.mjs` saying "about twice" — acceptable (see above).
4. D-268 "forty files stands against that measurement" — see Minor 2.
5. Four copies of the same measurement in D-04, D-147, D-339 and D-347 — acceptable, the row asks each sentence to give it; maintenance cost is the author's own note (a later change of the figures goes to four places).
6. The sentence added to D-247 (no loop ran all 30 days; the seconds hold for a loop that does not die) — the content is in the *Context* (`loop.ts:576`–`:588` line); the wording is Minor 1.
7. *Rejected* of D-268 gaining the 1.5 GiB limit — required by WAY-134 (the row's answer names it under "Not chosen b"); it carries the cost the source keeps (1.4 times room for the largest file). The "Not chosen c" (supervisor) already stood in *Rejected*. Fine.

## Findings

### Critical
none

### Important
none

### Minor (within the task)

1. `foundations/decisions.md:5371-5373` (D-247 *Rationale*): "so the seconds after many months hold for a loop that does not die". The *Context* says the "sekundy po wielu miesiącach" *concern* a loop that does not die (a loop the measurement never reached). "Hold for" reads as a claim that the measurement supports the seconds for such a loop; it does not, since no measured loop lived 30 days. Why it matters: a reader takes an extrapolation for a measured result, which is the exact thing row 4 removes with "lower estimate". Evidence: *Context* line "pętla kończy liczenie przy śmierci … w pomiarze żadna pętla nie przeszła całych 30 dni; „sekundy po wielu miesiącach” z D-247 dotyczą pętli, która nie pada". Suggested wording: say that the seconds are for a loop that does not die, which no measured loop was.
2. `foundations/decisions.md:6099-6100` (D-268 *Rationale*): "forty files stands against that measurement". No source gives a derivation of forty; the measurement is 24 files giving about 2.9 GiB for the stage, and the sentence suggests the measurement supports forty. Why it matters: a later agent reopening the threshold will look for the reasoning and find none; the author's report says the same (Choices 4). Either say plainly that the threshold counts files and is set at forty, or drop the clause; the binding sentence already carries forty.
3. `foundations/decisions.md:127-130` (D-04), `3058` (D-147), `8428-8435` (D-339): the three copies omit the game minute the Las runs reached (median 1670, range 341 to 1816), which only D-347 (`:8699`) gives. The row asks every sentence to give the measurement "with what it does not cover"; the omitted figure is a condition of the Las variant (it tells how long a run the 227.5 entries cover). Low effect, since D-347 holds it.
4. `foundations/decisions.md:8697-8707` (D-347 *Rationale*): the measured size now stands in the list of "Lacks" and no sentence says what it shows about the lack "a state loaded from a save holds a chronicle only if the chronicle enters the save". The text stays true; the reader is left to draw the conclusion. Also the phrase "a game that knows everything" (in D-04, D-147, D-208, D-339, D-347) is the *Context*'s own wording and no glossary entry holds it; graded Minor under the rule for words without an entry, no sentence a reader would read wrongly was found.

### Out of scope (counted as such, grade Minor)

1. `foundations/decisions.md:4079-4080` (D-207 *Rejected*): "16 saves of about 80 KB together in the half minute of Las", about 5 KB a save, rests on a save size of the same age as the figures D-208 had (6 150 B at minute 300) which the *Context* says were understated by 60 to 75 percent (9 838 B now). It is not among the rows or *Decisions in play* of the task, so the change did not have to touch it; I name it because the cycle may want the same measurement carried there as a separate task.

## Declined to judge

- Whether forty is the right threshold, or whether 2 GiB is the right limit: settled by the human in question 1 of the task.
- Whether the chronicle should enter the save (variant 2b) and the rarity of a reload in the middle of a map run: *Out of scope* of the task.
- D-03 ("about 218 KB") and D-75 (return condition): *Out of scope*, untouched.
- That the comment in `tests/view/memory-limit.mjs` repeats figures that also stand in D-268 and will go stale: the task's item 1 requires them in the comment (`guidelines/testing.md` says a comment carrying information for the code moves it to the foundation; the figures stand in D-268 too).
- The commit author address (`mariusznn@gmail.com` against the noreply address of the merge commit): not part of the change under review.
- The full `npm test`: the orchestrator's run after this review.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `72817471ba8e077bac426840e0515e02c4b8da03` (as dispatched) |
| `git -C .the-way rev-parse HEAD` | `55afa8e57aa1b83c77108576a36642722e0dda15` (as dispatched) |
| `git diff aa0ecd09..HEAD`, `git log aa0ecd09..HEAD`, `git diff --stat` | read whole; two files changed (`foundations/decisions.md`, `tests/view/memory-limit.mjs`) |
| `python -B .the-way/elements/common/foundation_check.py` | `0 errors`, exit 0 |
| `npx prettier --check tests/view/memory-limit.mjs` | exit 0 |
| `npm test -- tests/view/memory-limit.test.mjs` | 37 pass, 0 fail, exit 0 |
| `grep -rnIE` over the whole repository (excluding `.runs`, `.the-way`, `node_modules`, `dist`, `.git`) for the old figures (13.4 KB, 102 entries, 50 to 60, never/nobody measured, unmeasured, 0.0068, lower estimate, 2947, 6150, 7075, 1.68, ten test files, 9.5 KB, several hundred entries, 48 entries, "stop saving", "more than ten") | the only chronicle-related matches left are the three "nobody measured / one unmeasured" clauses on the reload rarity (`decisions.md:136`, `3058`, `8436`); the other matches are unrelated decisions (formatter, hashing gate, backup) and SVG path data |
| `grep -rnI "D-268"` over the repository | no file other than `decisions.md`, `invariants.md:1194`, `guidelines/testing.md:293` and comments in `tests/view/*` cites it; none cites the count of files |
| `git status --short` before and after | empty, worktree unchanged |

Not run: the full `npm test` (the cycle's own run). No scratch run needed: the change is prose of the foundation and one comment.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md`: the decision template and the form rules, to judge the form of the seven entries (read whole).
- `foundations/part_map.md` and `foundations/glossary.md`: read whole (the handoff named the gaps of the author).
- `foundations/decisions.md` D-206, D-207, D-338 (whole), D-75 (binding sentence and start of *Rationale* only; untouched by the change), to check what the references in the edited text mean.
- `foundations/invariants.md:1185-1196` (`document-test-memory-limit`), to confirm it carries no count.
- `.the-way/product-guidelines/reading.md`, to select the guidelines.
- `guidelines/coding.md` and `guidelines/testing.md`, each read whole.

## Unread material

Decisions of my own selection: I read whole 11 decisions (D-03, D-04, D-147, D-206, D-207, D-208, D-247, D-268, D-338, D-339, D-347) and D-75 in part (binding sentence and the start of *Rationale*; it is untouched and out of scope). I did not run the *Scope* search across the whole log (389 decisions) and did not skim it by title: the change edits seven decisions and no code, so I selected the edited decisions, the ones they reference for the sentences changed, and repository-wide searches for the old figures. Decisions that bear on the change and stayed unopened: D-104 (limit of 64 KiB, opened by title only), D-209, D-211, D-212, D-240 (references of D-247 and D-208), D-264 and D-77 (referenced by D-268, only their pointers read). Guideline files: `guidelines/coding.md` and `guidelines/testing.md` read whole; the kind guidelines `coding-*.md` and `styleguide-browser-view.md` not read (their *When to read* does not match: the change is a comment in a test helper and prose of the foundation). The author's report and the frozen task read whole; the vault notes the task cites (`foundation_review_2026-11-13`, `luki_w_testach_z_przegladu_loop2`) not read, since the task's *Context* is the source of the figures.

## Searches not found or unclear

- I could not check the measurements themselves (the scripts and raw results are in the author's session scratchpad that the task says may be gone); the figures are verified only against the frozen task's *Context*, which the task names as their only durable record.
- No source gives the derivation of "forty" (Minor 2).
- The *Context* does not say what the omitted lower values of the D-247 measurement (0.00519 and 0.00759 ms) stand for beyond row 4; they are rightly not in the entry.
- `python -B scripts/test.py <file>` fails outside npm (`KeyError: 'npm_execpath'`), as the author reported; `npm test -- <file>` works and is the form `guidelines/testing.md` gives. I did not run the former.
