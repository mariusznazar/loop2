# Planner report — martwe-odsylacze-origin

- Status: **questions** — the plan is complete and written for the proposed answers below; Q1 and Q2 must be settled before Slice 3 is dispatched, Q3 before the reviews are planned, Q4 only if Slice 34 blocks.
- Plan: `docs/task-cycles/martwe-odsylacze-origin/plan.md`
- Size report: `docs/task-cycles/martwe-odsylacze-origin/plan-size.md` — verdict: Slices 1, 2 and 34 fit; Slices 3–33 are `too large`, each solely because `foundations/decisions.md` (810,805 characters, about 324,000 estimated tokens) is in their *Change* and the script counts a changed file whole. No split can remove that file from a slice that changes it. Measured with that file left out of *Change*, every slice fits (largest: Slice 25, about 214,000 tokens; decision slices 28,000–56,000) — the measurement is in the session scratchpad, `plan-size-without-log.md`, and its numbers are copied under "Size" below.
- Checks I ran: `python -B .the-way/elements/common/foundation_check.py` at the base → exit 0, 0 errors; `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` at the base → 0 listed; `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/martwe-odsylacze-origin/plan.md` → 0 listed; `slice_size.py` → exit 1 (above). Not run: the product's gate (not mine to run), any test.

## Shape of the plan

- **Foundation entries** (one agent before Slice 1): D-82 changed (row 1), D-362 changed (row 2), the new invariant of row 3, the new decision of To do 8 and the change of `action-duration-minimum`'s *Derives from*. That agent also moves D-82's and D-362's own reasoning out of their notes (D-82: the test guide's note, question Q5p; D-362: the note of the locations task, questions 1–2 and row 1; To do 8: the skills-and-trees note, row 7), so no decision slice touches them.
- **Slice 1** — `guidelines/testing.md` paragraph (To do 6). **Slice 2** — styleguide list of source kinds and `src/browser/tokens.css` comments (To do 7).
- **Slices 3–20** — the other 300 decisions, in the order of the log, 18 contiguous blocks of 9–26 decisions; each decision rewritten once with every note its *Origin* names (To do 1–2).
- **Slices 21–33** — comments, docstrings and test titles in 107 files of `src/` and `tests/` (To do 5), ≤9 code files each plus `foundations/decisions.md` for any requirement that only a note held; Slice 33 runs the whole-repository searches.
- **Slice 34** — `pixel-crawler-terms` *Source* (To do 9), last, so a block for Mariusz's answer comes after all other work.
- Every slice runs one after another; decision and comment slices chain because they share `foundations/decisions.md`.

### Who extracts the deleted notes, and what it hands on

The plan proposes (Choices, row 1) that **the orchestrator**, before the agent of *Foundation entries*, writes a snapshot at `the private snapshot of the notes (not committed)/`: `vault/` with all 54 notes (16 copied as they stand, 38 by `git -C "<projects folder>" show <commit>^:<path>` from the commit that deleted them), `old-loop/` with the old Loop files the pointers name at `cdc7c0d` and `Terms.txt` at `8072ce6`, and a `MANIFEST.md` (name, exists/deleted, commit, path). It cannot be a slice: a slice must commit, and this writes nothing tracked. It must not sit inside `docs/task-cycles/martwe-odsylacze-origin/`, because step 12 copies that directory whole into the public repository's history (`.the-way/task-cycle/skill/SKILL.md`, "The record before it is committed", step 2); its cleaning rewrites paths and titles, not the content of notes. I verified read-only that all 38 deleted notes resolve to a deletion commit with non-empty content (commits `7c692492`, `0cceb37c`, `b9c0e931`, `45795b19`; 2.64 MB for all 54 notes together). The old Loop's repository has a local clone with `cdc7c0d`, but its location is not in the locations file; the orchestrator gives it.

### Where the check for row 3 sits

Two `git grep` commands, written out in every comment slice's *Checks* (an agent sees only its own section):
- **S1** — names of notes and of old Loop files (`_loop2.md`, `koncepcja_…`, `rozpoznanie_…`, `technologia_…`, `zadanie_…`, `in the vault`, `Notes/Projects`, `_zadania`, `mariusznazar/loop/`, `cdc7c0d`, `8072ce6`, paths under `src/sim/` or `src/components/`, `*.test.ts`). Expected after a slice: no line in its files. At the base it finds 395 lines in 34 files (312 in the decision log).
- **S2** — pointers to task documents (task names and slugs, "the task", To do N, Q N, question N, settlement rows, Acceptance criteria, concept line, handoff or carried question). It has false positives, so each hit is listed and judged in the report. At the base: 593 lines in 106 files of `src/` and `tests/`.
Decision slices use a narrower S1 on the decision log; Slice 20 expects no hit in the whole log; Slice 33 runs both on the whole repository (expected: only `pixel-crawler-terms`' *Source*); Slice 34 runs S1 on the whole repository and expects nothing. The reviewer of the whole change runs the same two commands; they are the agent check row 3's invariant names.

## Counts in the task that do not hold, from my recount

| Task says | Recount | Effect on the plan |
|---|---|---|
| 362 decisions, 301 with a vault *Origin*, 61 `none` (at `952fbd0`) | true at `952fbd0`; at the base `83ba52b2`: **367 decisions, 302 vault, 65 none**. The extra one is D-363 (added by PR #77, cites the campfire-costs note) — not, as the handoff guessed, a decision that also names a file at a fixed commit | Slice 20 includes D-363 |
| 54 distinct notes | 53 at `952fbd0`, **54 at the base** | none |
| 38 deleted, 365 of the pointers dead | **confirmed** (38; 365) | none |
| 508 pointers | **not reproduced**: 504 mentions in *Origin* fields at the base, 501 at `952fbd0`. Three *Origin* fields span several lines, so a line-based count of `in the vault` gives 302 lines but misses wrapped mentions | none |
| 15 non-task documents that still exist, including "research edytora programu" | **13** (the two MVP definitions, the concept, the MVP2 scope and plan, 2 research notes, 4 technology notes, the mage note, the test-server note). No *Origin* names the program-editor research note; the program editor note in the *Origins* is a deleted task note. Besides those, 3 task notes still exist (campfire costs, database restore, locations) | none |
| "~45 lines in 26 files" of comments name vault notes | holds only for lines that name a note's **file**. Pointers to the same notes by **task name or numbered item** ("task ekrany-i-menu, To do 2", "Q11", "the task") are about **593 lines in 106 files** | the main question (Q1); Slices 21–33 are written for the broad reading |
| old Loop files in `styles.css`, `scene-picture.test.mjs`, `scene.test.mjs` and the fact | old Loop **files** are named in 12 files: also `src/browser/sim/data/balance.ts`, `src/browser/tokens.css` (3 lines), and the tests `catch-up`, `data`, `death`, `loop`, `skills`, `trip`. `scene.test.mjs` names no old Loop file (it mentions only the old Loop's behaviour) | covered by Slices 2, 22–24, 28, 31 |
| 55 of 63 `Source:` comments end with "(the task, Q…)" | 55 name the task, but only **31** end that way; 24 read "settled in the task, Q…" or "the weight … settled in the task" | Slice 2 covers all 55 |
| the pin of `.the-way` is `52f8164` | now `e9a0f92` (first commit of the branch). The *Origin* rule quoted in the task's Context reads the same in `.the-way/elements/decisions/template.md:219-226` at `e9a0f92` | none |

## Questions for the orchestrator, with proposed answers

**Q1. Which pointers count as "pointing to a vault note" (To do 5)?**
What the reader sees: a test comment such as "Task logowanie-w-react, To do 3, D-261" sends the reader to a task document in the author's notes that they cannot open, just as `odkrywanie_loop2.md:21` does — only without the file name.
- Broad (proposed, and what the plan does): a note's file name, a task by name or slug, a numbered item of a task document, a line of the project concept, a file of the old Loop's repository. About 600 lines in 107 files; 13 comment slices.
- Narrow (the task's count): only lines naming a note's file. About 44 lines in 26 files plus old Loop files; Slices 21–33 would shrink to the 31 files S1 lists, about 4 slices.
- Cost if left narrow: about 550 lines that point to task documents stay, the changed D-362 (row 2: "no file refers to a place the reader cannot reach") is broken at merge, and the new invariant (row 3) is broken as soon as it is written. Cost of broad: about ten times the comment work the task estimated, all in one request (Pytanie 4 answered "one request").
- Pointers to a loop2 cycle record alone ("spec decision 7", "Slice 6") — 59 lines — stay out in both readings, since that history is public; the plan brings one in only when removing the task's name leaves it unfindable. If you put them in scope, `src/server/account-routes.ts` joins, and that file is a trust boundary (`src/server/**`), so its slice would need its own review.

**Q2. Slices 3–33 are measured `too large` only because of the decision log.** The method says to split until every slice fits; no split can, because each of these slices must change `foundations/decisions.md`, and the script counts a changed file whole (810,805 characters). The-way's own reading rule forbids an agent to read a foundation file whole ("a foundation entry whole, never a whole file of the foundation"), so the measure and the rule disagree.
- Proposed: accept these slices as sized by the measurement without the log (all fit), and record a process remark for the-way: `slice_size.py` counts a changed foundation file whole, and in a product whose decision log is larger than the read limit no slice that writes a decision can fit.
- If not accepted: no plan for this task can pass the size check; the cycle stops at the plan.

**Q3. Who checks that 300 rewritten entries say what their notes say?** No slice touches a trust boundary, so by the method only the review of the whole change judges Slices 3–20. One reviewer cannot compare 300 entries with passages from 54 notes. Proposed: a review per decision slice, or per two or three adjacent slices, against the same snapshot passages, chosen by you even though *Risk* is `none`. Cost: about 9–18 extra reviews. If left as it is: a confabulated or lost reason passes into the foundation unread, which is the very failure this task exists to remove.

**Q4. If Slice 34 finds no reachable place for the Pixel Crawler terms.** The slice returns `blocked` with each place searched (the pack's public page and an archived copy) and changes nothing. Proposed question for Mariusz, with these ways:
- (a) Commit a copy of the pack's terms file into loop2 and point the *Source* at it at a fixed commit. This needs a part-map line for the new file and its own review, because the pack is untrusted external content. Recommended if the pack's page does not show the terms.
- (b) Make the terms reachable outside loop2, for example by publishing the old Loop's file. That work is outside the cycle.
- (c) Rest the fact only on what the pack's page says. This may weaken *Based on* in D-271 and *Rests on* in the invariant `sprite-credits`.
- If nothing is done, the fact keeps pointing to a private repository, against D-362 as changed and against WAY-27.
- Asking Mariusz now, in parallel with the slices, would save one round at the request. Choosing (a) adds a slice and a part-map entry to the plan.

**Q5. The snapshot.** Proposed: you write it before the agent of *Foundation entries*, by the commands in Choices row 1, read-only in the vault (nothing committed, stashed or checked out there) and in the old Loop's local clone. Confirm that you can, and give that clone's path in the handoffs of Slices 22–24, 28 and 31.

## Choices

As in the plan's *Choices* table; the ones that cost most if wrong: the broad reading of pointers (Q1); comment slices that write their own decisions, so the decision log is in their *Change* (Q2); reading notes by cited passage, not whole (per slice the notes total 65 KB to 1.3 MB if read whole).

## Size (with the decision log left out of *Change*)

Tokens: Slice 1 26.6k · 2 48.0k · 3 45.3k · 4 39.4k · 5 34.1k · 6 29.2k · 7 56.2k · 8 39.7k · 9 44.4k · 10 37.7k · 11 38.3k · 12 43.3k · 13 39.3k · 14 39.7k · 15 32.7k · 16 28.4k · 17 37.6k · 18 31.6k · 19 38.2k · 20 40.0k · 21 125.7k · 22 142.0k · 23 111.9k · 24 93.6k · 25 214.0k · 26 189.8k · 27 188.2k · 28 148.2k · 29 136.6k · 30 116.8k · 31 95.3k · 32 100.9k · 33 74.5k · 34 71.2k. The note passages are not measured. The whole notes per decision slice would add (upper bound): S3 923 KB, S4 1.17 MB, S5 519 KB, S6 123 KB, S7 1.29 MB, S8 1.15 MB, S9 851 KB, S10 924 KB, S11 870 KB, S12 437 KB, S13 662 KB, S14 651 KB, S15 480 KB, S16 65 KB, S17 563 KB, S18 292 KB, S19 367 KB, S20 267 KB.

## Guidelines found missing or uncertain

- `guidelines/testing.md:90-102` says the opposite of the changed D-82: it allows task documents as sources and asks for a file-and-line comment. Slice 1 fixes this.
- `guidelines/styleguide-browser-view.md:112` ("do zadania 24") and `:333-352` point to tasks. Slice 2 fixes both.
- No guideline says how a test comment names the source of an expectation once D-82 changes, beyond "the foundation". Slice 1 writes that.
- `the quality environment of the worktree (not committed)` (ruff, shellcheck) does not exist in this worktree, so Ruff cannot run on the Python comment edits in Slices 24–26 as a focused check. It is left to the gate, which needs that environment.

## The styleguide's order of work

The styleguide's example order (environment and library, then values and their sources, then one screen, then its states — `guidelines/styleguide-browser-view.md:704-709`) is followed as far as it applies: token sources (Slice 2) come before the stylesheet and view comments (Slices 31–33). No screen or state changes.

## Reaches beyond the dispatch

- `foundations/decisions.md` — parsed by a scratch script for every *Origin* field, multi-line ones included, at the base and at `952fbd0` (`git show 952fbd0:foundations/decisions.md`), to recount the task's numbers. I also read passages of the log: D-82, D-362, D-48's *Origin*, and the heading lines of D-360–D-367.
- The vault, read-only: a listing of the project folder, `git log --all --diff-filter=D` and `git show <commit>^:<path> | wc -c` for each deleted note — to confirm the 38 deleted notes and size the reading. I read no note content.
- `~/.the-way/locations.json` — the `projects` entry, used in the snapshot commands.
- The old Loop's local clone: `git cat-file -t cdc7c0d` and `git remote -v` only — to confirm the files the comments name are reachable for the snapshot.
- `.the-way/task-cycle/slice_size.py` (whole); `.the-way/task-cycle/skill/SKILL.md` (lines 276–345, 516–546), to learn who writes plan entries and what the record copy publishes; `.the-way/task-cycle/skill/foundation_step.md`; `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `examples.md`; `.the-way/elements/common/way_of_working.md`; `.the-way/elements/decisions/template.md:216-232`; `.the-way/foundations/decisions.md` (WAY-27 head); `.the-way/product-guidelines/reading.md`; the usage text of `private_paths_check.py` and `tracked_private_paths_check.py`; the *Method* values in `.the-way/elements/invariants/template.md`. All to write *Read*, *Checks* and the snapshot choice.
- Product files: `scripts/test.py`, the scripts in `package.json` and `tests/quality/test_quality_invariants.py` (focused check commands); the header and index of every `guidelines/*.md`; the trust-boundary lines of `foundations/part_map.md`; `src/browser/AGENTS.md`; the passages of `guidelines/testing.md` and `guidelines/styleguide-browser-view.md` named above; `src/browser/tokens.css` lines 1–79; the entries `action-duration-minimum`, `tracked-file-private-paths`, `pixel-crawler-terms` and `sprite-credits`, plus the *Source* of `smoke-fire-particle-licence` and `cc-by-3-licence-copy` (precedent for a licence source).
- loop2 history: the `plan-size.md` files of earlier cycles, to see whether a slice had ever changed the decision log. None had.

## Unread material

- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` — read in part (headers, the passages named above), not whole; *Read* names them whole for the executors.
- The comments themselves: 593 S2 lines and 83 S1 lines found by search; I read about 150 of them as samples and every S1 line outside the decision log. They were not judged one by one; that is the slices' work.
- Vault notes: none read in content. Only existence, deletion commit and size.
- The task document: read whole. The method: read whole. The handoff: read whole.

## Searches not found or unclear

- The task's 508 pointers — not reproduced (504 at the base, 501 at `952fbd0`).
- "research edytora programu" as an *Origin* — no *Origin* names the program-editor research note.
- An old Loop file in `tests/view/scene.test.mjs` — none; only the old Loop's values and behaviour are mentioned.
- The note of the task "przyciski-i-zakladki" cited in the styleguide — not among the 54 *Origin* notes. Not looked up in the vault; the `--bar-width` source already carries its date.
- A public place for the Pixel Crawler terms — not searched (Slice 34's work).
- The result of the base gate the orchestrator started (`cycle.md`: running) — unknown to me.
- `the quality environment of the worktree (not committed)` in the worktree — not found.
