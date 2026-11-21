# Handoff — review `rc15`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 5. **Range to review: `614c7559..d84a5958`** (base exclusive, head inclusive; head `d84a5958`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-c1-05-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rc15/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `d84a5958` there (`git worktree add --detach .runs/review-rc15/wt d84a5958`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rc15-report.md`; its first line is `PASS d84a5958` or `FAIL d84a5958` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task


## The plan's sections for what you review (word for word)

### Slice 5 — the judging cache, a module of the view at a trust boundary

- **Goal:** a new module `src/browser/view/judging-cache.ts`, the one file that knows the stored form
  of a cached judging (spec Decisions 4, 5, 6 V1, 7, 8, 11.2 and 11.3). It is opened for one
  account's id (`Account.id`, never the email), one game's moment (Slice 1's field), the game state it
  is opened with, whether the game was built after a refused save (D-209), and a storage given to it
  or none — it reaches no `window` itself. It offers reading the record of a triple (the record or
  none) and remembering the record of a triple; the record is the type of Slice 4. One entry of the
  storage per triple: the key a fixed prefix naming the cache of loop2 and the version 1 of its stored
  form, then the account's id, the game's moment, the character's number, the program's number and
  the map's identifier, in that order, with a separator none of them holds; the value a JSON object of
  exactly four fields — the twelve results as one text of one letter per seed, in the order of the
  data's seeds; the equipment as item and count pairs; the content revision; the generation. Reading
  ignores, never throwing and leaving the value where it is: a value longer than a fixed bound,
  unparsed; one that is no JSON, has another field or misses one, has results of another length or
  letter, an item the data lack or named twice, a count that is no safe integer from 1, a revision
  that is no safe integer from 0, a generation that is no safe integer from 1; it builds new values
  and never gives an object the parse made, a `__proto__` or `constructor` key included. Keys of
  another version of the form are neither read, written nor removed. A storage refused at opening
  makes the cache live in the page's memory; a refused write keeps the triple in the page's memory and
  removes the triple's stored value where it can; a triple held in the page's memory is read from it,
  any other from the storage, so a later write that succeeds takes it out of memory; every exception
  of the storage is caught inside. At opening, best effort, it removes this account's entries under
  another game's moment and, after a refused save, this game's entries too; it leaves other accounts'
  entries; and for the game it is opened with it drops this game's entries whose revision or
  generation stands above that state's own (spec Decision 11.3). No comment, case title or sentence
  claims that the refused-save path closes more than the page that builds a game after another
  browser saved first (spec Decision 11.2). The failing tests come first, in a new file
  `tests/view/judging-cache.test.mjs` marked with the new invariant (Foundation entries row 10), its
  refusal seen failing once: the cases of spec Decision 10, fifth item, with stand-in storages — a
  map-backed one, one whose writes throw, one whose every call throws, and none — and the cases of
  Decision 11.3 (an entry above by revision dropped, above by generation dropped, equal or below
  kept). The part map follows through the project skill `the-way-update-part-map`, read as the file
  named in *Read*: the module under *Trust boundary* of `browser-view`. `guidelines/testing.md`, rule
  „Trust boundaries”, gets a row for the module naming its invariant and its refusal cases, and the
  rule's *Decision* and *Invariant* lists the new decision and the new invariant, written as
  `.the-way/product-guidelines/testing/template.md` gives the rule. Read
  `src/browser/sim/judging-record.ts` as Slice 4 left it.
- **Change:** `src/browser/view/judging-cache.ts` · `tests/view/judging-cache.test.mjs` ·
  `foundations/part_map.md` · `guidelines/testing.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:7-47` Intent, Goals and non-goals,
  Constraints · `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-124` Decisions 3, 4 and 5 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-140` Decision 6 (V1) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-160` Decisions 7 and 8 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:174-177` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-185` Decision 11 · Foundation entries
  row 1 · Foundation entries row 10 · Foundation entries row 11 · `foundations/decisions.md:4128-4168`
  D-211 · `foundations/decisions.md:4046-4091` D-209 · `foundations/decisions.md:644-657` D-117 ·
  `foundations/invariants.md:1248-1256` cross-part-imports · `foundations/invariants.md:1198-1206`
  document-test-memory-limit · `foundations/part_map.md:3-31` browser-view ·
  `.the-way/elements/part-map/skill/SKILL.md` · `.the-way/product-guidelines/testing/template.md:180-200`
  · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/account-api.ts:1-20`
  · `src/browser/sim/types.ts:360-400`
- **Model:** same — a new trust boundary that reads values anyone with the browser can write.
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts` (the part map names it in this slice)
- **Checks:** `npm test -- tests/view/judging-cache.test.mjs` (written first, failing; the refusal
  seen failing once) · `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (the module claimed as a trust boundary of
  `browser-view`, the new invariant cited by its test, no fault of `guidelines/testing.md`)
- **Depends on:** Slice 3 · Slice 4 · Foundation entries row 1 · row 10

## Notes of the orchestrator

- A review in **correction 1** of the open request (the human's remarks `reports/correction-1-remarks.md`; the reviewed spec `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md` — read it whole, *Decisions* 1, 3–5, 7–9, 11; the foundation entries of the correction at `4d813606`: D-441 (new — read whole), D-442, D-440, D-04, D-386, D-211, D-07, the invariant `judging-cache-reading` (new), the part map and the trust-boundary table of `guidelines/testing.md`).
- Slice 5 of the correction's plan (risk: **a new trust boundary**, `src/browser/view/judging-cache.ts`, a view module that reads values from the browser's `localStorage`, which anyone with the browser can write): attack it with your own probes (in your directory, in the page's test document): wrong types, a stored form with 11 or 13 results, unknown letters, a negative / float / unsafe / string revision or generation, extra keys, `__proto__` / `constructor` / `toString` keys and values, a huge string (megabytes), JSON that is not an object, a value for another account or another game or another version of the cache's shape placed under a key; the key built from the account's id and the game's moment — check an account id or character/program/map text with separators cannot collide keys across accounts or games; no value read from the storage throws out of the cache (also a storage whose `getItem` throws, a refused `setItem`, a disabled storage, `localStorage` absent); a value the cache did not write never gives a judging. Judge the module against D-441 and the invariant `judging-cache-reading`, and that **no file of the simulation touches storage** and the module imports only what the part's rules allow (`cross-part-imports`).
- The executor reports a gap that Decision 11.3 leaves open: an entry for a program number the loaded game lacks stays in the storage, so a later new program with that number at revision 0 can show it. D-165: a program's number is one more than the number the game state gave last, never reused in one game; judge whether this makes the finished design wrong (a stale badge for a new program in the same game) or is a rare accepted cost beside the repeated-revision gap the spec names, and say how it should be closed if it should (drop entries whose program number is above the game's last given number at opening — does the game state hold that number?). A Minor or a blocking finding, by what a player would see.
- The executor also added `lastingStorageOf` (a function giving `null` where reaching `localStorage` throws), the part-map entry (`src/browser/view/judging-cache.ts` under *Trust boundary* of `browser-view`) and the rule and table row in `guidelines/testing.md`: judge them against the part-map element's rules and the testing guideline's own rules for the trust-boundary table.
- The invariant's test is `tests/view/judging-cache.test.mjs` (comment line `invariant: judging-cache-reading`); check the foundation check without `--skip-test-citations` finds it. The foundation check shows five errors in `tests/sim/saved-game-judgings.test.mjs`, a first-run file that Slice 9 removes: not a finding.
