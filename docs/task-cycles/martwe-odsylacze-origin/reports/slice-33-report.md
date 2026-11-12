# Slice 33 report

**Status:** done

**Base:** HEAD at start was `58b63d981d7a3d5c25489a8faed784fa4d90c5fd` (as in the handoff); the worktree was clean at start.

**Commit:** `ff93642b` on `task/martwe-odsylacze-origin` (one commit, `git add` by path). Files: `foundations/decisions.md` (+17, the new D-383), `src/browser/view/tile-list.ts`, `src/browser/view/tile-table.tsx`, `src/browser/view/trip-lines.ts`, `src/browser/view/trip-plan.tsx`, `src/browser/view/world-area.tsx`, `src/browser/kitchen-sink/kitchen-sink.ts` (comments only).

No code changed: a comment-stripped comparison (esbuild `transformSync`, `legalComments: none`, `git show HEAD:<file>` against the working file; script `cmpcode33.mjs` in the scratchpad) gives identical output for all six source files (exit 0).

## Decision written

**D-383 — How does the list of revealed tiles show an item that burns on a tile?** (last in the log, after D-382; the highest before was D-382.) Scope browser-view, Based on none, Relations derives from D-18 · D-70 · D-72, Origin `none`, Rejected `unknown`.

- Why: the text of a burning stick in the row of its tile („patyk — płonie, zostało 3 min”, after the campfire's text, only while it burns, no icon on the drawing) was in no decision. D-70 holds the campfire's row text; D-72 holds only in its *Rationale* that "the list of revealed tiles shows its state and the burning stick's". The comment at `tile-list.ts` `fire` pointed to "task, To do 15; spec Decision 5". Searched: `płonie, zostało`, `burning stick`, `burning item`, `burningItems`, `Zapal — patyk`, the glossary, the invariants, the environment facts; only D-70, D-72 (rationale), D-63 (lighting), D-121 (discovery) touch it.
- Source and its gap: the note `ognisko_i_jedzenie_loop2.md` (snapshot) To do 15 and settlement row 15 say "płonący patyk widać tylko w tym wierszu" and give the campfire's text; the exact stick text „patyk — płonie, zostało <n> min", its order after the campfire's and "names from the data (D-18)" are in the spec of that cycle (git history, `273446fb:docs/task-cycles/ognisko-i-jedzenie/spec.md`, Decision 5) and in `tests/view/tile-list.test.mjs:171-177`. The note gives no reason and no rejected way for the stick, so *Rationale* is derived from D-70 (numbers of a tile stand in its row) and D-72; *Rejected* reads `unknown`. "No icon on the drawing" rests on the note's "only in this row" and on `terrain-drawing.tsx` drawing only the campfire's icon (checked by grep).
- Recorded through `the-way-record-decision`: read the project skill, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md`, `elements/decisions/examples.md`. Step 1 read: D-18, D-19 (by the grep hits), D-63, D-70, D-72, D-125, D-344 whole; step 2 searched the whole foundation; step 3 drafted; step 4 the orchestrator's instruction stands in place of asking the human, written at the end of the log, `foundation_check.py` run after writing: exit 0, "0 errors". Step 4.4: nothing follows (no invariant named, nothing moved: D-72's *Rationale* sentence stays as it is, it does not answer the question as a binding sentence).
- If the orchestrator prefers no such decision (the comment says the text itself and the test carries it), the commit can be amended; the `fire` comment would then name D-18 and D-70 only, and the table comment D-70.

## Per changed line: old pointer, outcome, entry

| File:line (old) | Old pointer | Outcome | Entry |
|---|---|---|---|
| tile-list.ts:9 | `(choice C5)` for the „—” in a cell of an absent resource | removed (a choice of a plan; the comment and the constant already say „—”) | none |
| tile-list.ts:25 | `(choice C4)` for the label „(col, row)” | removed (the comment now reads "The tile's label, „(col, row)”.") | none |
| tile-list.ts:32 | `(task, To do 15; spec Decision 5)` for the stick's and the campfire's texts, names from data | written + named | D-383 (burning item), D-70 (campfire), D-18 (names from the data) |
| tile-table.tsx:2-3 | `task ekran-przejscia, To do 3 and 5` | removed (To do 3 is the table in the right area, superseded by D-311's tabs; To do 5 is the line under the drawing, held by D-19, D-311); D-383 added beside D-70 for the burning items in the last cell | D-19, D-70, D-125, D-311, D-383 |
| trip-lines.ts:44 | `(To do 5, item 4)` for the line „Wejdzie: …” | named | D-329 („Wejdzie: …” always, „Wejdzie: nic” included; D-189 and D-180 were already or are in its chain) |
| trip-plan.tsx:2 | `task edytor-programu, Slice 11` | removed (a slice of a plan; D-180, D-181 already cited) | D-180, D-181 |
| world-area.tsx:3-5 | `tasks ekran-przejscia, To do 4, 5 and 6, scena-z-ludzikiem and teraz-i-potem, To do 1, 2 and 4 to 6, kronika-z-filtrami, To do 6, koniec-przejscia, To do 3` | removed (D-311 holds the order of the world area, D-336 the click on „Teraz”/„Potem”, D-337 the body-row cells; D-185, D-216 the lines moved to the window; D-147 the paragraph in the chronicle; all already cited) | D-311, D-19, D-70, D-147, D-185, D-186, D-201, D-215, D-216, D-272, D-314, D-316, D-320 to D-322, D-334, D-335, D-337, D-349 |
| kitchen-sink.ts:342 | `The sentences of the task and of the client in account-api.ts` | named (the refusal and the existing-account sentences are D-100's, the attempts sentence D-102's; „Brak połączenia…” and „Serwer nie mógł…” are the client's in `account-api.ts`) | D-100, D-102, D-44 |

Reflows: where a removed pointer left lines short, the sentences were rewrapped to about 100 columns (`trip-plan.tsx` first paragraph, `tile-table.tsx` first three lines, `world-area.tsx` lines 3-4, `kitchen-sink.ts:342` into a block comment). The words are unchanged apart from the pointers.

Judgments worth a look: (1) "choice C4/C5" in `tile-list.ts` are choices of a plan from the early period (commit `5ded0194`, no `docs/task-cycles` record of it); I treated them as plan pointers and dropped them without a decision, because the comment itself states the label and the dash. No decision holds "label „(col, row)”" or "„—” for a resource the tile lacks"; the tests (`tests/view/tile-list.test.mjs`) pin them. If the orchestrator wants these two as decisions, they are small additions. (2) The reading of "the task" in `kitchen-sink.ts:342` as the author's task (not the game's server) is mine: the commit that wrote it (`be822116`) is a feature commit, and the sentences are the server's in `src/server/account-routes.ts` (D-100, D-102).

## Checks (cwd = worktree root)

| Check | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the six source files>` | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <the six source files>` | exit 0 ("All matched files use Prettier code style!") |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0 ("0 errors"), run after D-383 was written and with the final content |
| `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | exit 0, lists nothing ("checked: 443 files, 0 listed") |
| S1, whole repository (outside `.the-way`) | one line only: `foundations/environment_facts.md:646`, the *Source* of `pixel-crawler-terms` (Slice 34), as expected |
| S2, `src tests guidelines` | 32 lines, none in the files of my Change (see below) |
| S3 on the files of Change (the orchestrator's) | one kind of hit left: the game's "trip plan" ("Plan wyprawy", `plan: TripPlan`, `plan.bring`, `trip-plan` class) in `trip-lines.ts`, `trip-plan.tsx`, `world-area.tsx:7` ("the bring plan"); "spec", "slice N", "round N", "package N", `docs/task-cycles` found nowhere in the six files (before: `tile-list.ts:32` "spec Decision 5" and `trip-plan.tsx:2` "Slice 11", fixed) |
| Wider search on the six files (`Row N`, `Finding`, `binding answer`, `Task item`, `review`, `answer N`, `cause N`, `loop2#`, `executor`, `choice`, `item N`, `slice`, `settlement`, `concept`, `definition`, `note`, `task`, `MVP`, case-insensitive) | no pointer. Hits are code or game words: `RESET_REQUESTED_SENTENCE`, `.slice(0, …)`, "requested equipment", "settlement of a death" (the game's), `note` (a form note) |
| All D-numbers cited in the six files | exist as `### D-nn ` headings (checked by a loop, none missing) |
| Comment-stripped comparison of the six files with `HEAD` | identical (exit 0) |

Not run: the product's gate (`npm test` with no argument), by instruction; no unit test, since nothing but comment text changed in the source files (the stripped comparison shows it) and `decisions.md` is read by `foundation_check.py` only.

## Whole-repository searches (hits outside my Change, for the orchestrator's sweep)

Full outputs are in files beside this report (not committed): `slice-33-S2-src-tests-guidelines.txt` (32 lines), `slice-33-S2-other.txt` (S2 over the rest of the repository, 13 lines), `slice-33-S3-spec-slice-round.txt` (99 lines, `spec`/`slice N`/`round N`/`package N`/`docs/task-cycles`, outside `.the-way`, `.claude`, `.agents`), `slice-33-S3-plan-all.txt` (257 lines of the word `plan`), `slice-33-wide.txt` (47 lines of the wider forms). The pointers among them, per file:

**S1** (whole repository): `foundations/environment_facts.md:646` only (Slice 34).

**S2** (`src tests guidelines`) — all in files of the end-of-run window, none judged by this slice:
- `src/browser/view/end-window-lines.ts:2` "task koniec-przejscia, To do 4 to 8"; `src/browser/view/end-window.tsx:3` "task koniec-przejscia, To do 1, 2, 4 to 9".
- `tests/sim/run-record.test.mjs:1` "task koniec-przejscia, To do 5, 10".
- `tests/view/end-window-lines.test.mjs:1, 5`; `tests/view/end-window.test.mjs:1, 10, 164, 209, 318, 395, 435, 504, 581, 604, 629`; `tests/view/end-window-game.test.mjs:1, 328, 362, 380, 407, 517, 549, 581, 608, 639, 706, 725, 781, 833, 837-838` ("task To do N", "question 10", "binding answer 2", "the task").
- `guidelines/`: no hit.

**S2** over the rest (`foundations/`): `decisions.md:1573, 1581, 1729, 6251, 6289, 6388, 6440, 8623, 8788` use "task" for the process in general (the task author, a task that writes a decision), not a pointer; `decisions.md:1686` and `8837` are D-82 and D-362 as rewritten (they name what is forbidden); `environment_facts.md:496` is "NOTES" in a manual (case-insensitive hit of the pattern is not a pointer). No pointer to a named task or To do item in `foundations/`.

**S3** (`spec`, `slice N`, `round N`, `package N`, `docs/task-cycles`), pointers outside my Change:
- `src/browser/view/account-card.tsx:113` "spec decision 8"; `src/browser/view/app.ts:418` "spec decision 7"; `src/server/account-routes.ts:351` "spec decision 2", `:472` "spec decision 1"; `scripts/measure-passwords.mjs:23` "spec, section 6".
- `tests/view/memory-limit.test.mjs:56`, `tests/view/page-document.mjs:211` "spec decision 10"; `tests/view/end-window-game.test.mjs:433` "Binding answer 2 of slice 4".
- `tests/sim/catch-up.test.mjs:5, 383, 434, 496`; `tests/sim/death.test.mjs:333, 354, 379, 417, 437, 463`; `tests/sim/loop.test.mjs:4, 431, 517, 626, 784, 909` ("the plan's *Goal*"); `tests/sim/random.test.mjs:74`; `tests/sim/rules.test.mjs:1, 200, 237` ("spec rule S1/S2"); `tests/sim/saved-game.test.mjs:40, 719, 1666, 1679, 1815, 1843, 2258, 2264, 2319, 2329, 2340, 2351, 2366`; `tests/password-measurement.test.mjs:22, 82`.
- `tests/agent_workflow/test_loop2_deploy_skill.py:1`; `tests/deploy/test_check_address_workflow.py:1`, `test_deploy_workflow.py:1`, `test_loop2_deploy_build.py:1, 83`, `test_loop2_deploy_commit.py:1`, `test_loop2_deploy_input.py:1`, `test_loop2_deploy_switch.py:1`, `test_loop2_watch.py:1, 51`, `watch_script_support.py:67`; `tests/invariants/test_account_save_backup_failure_notice.py:191`, `test_application_build_kitchen_sink.py:5, 22, 25`, `test_loop2_deploy_trigger_input.py:12, 81`.
- `foundations/decisions.md:1104` *Origin* of the token-name decision names `docs/task-cycles/styleguide-loop2/spec.md at commit b0c4…` (a path in a record that is no longer in the tree); lines 3920 and 8755 are *Based on* URLs (an HTTP spec, a pull request), not pointers.
- Not pointers (other meaning of the word): `spec` as a variable in `scripts/restore-trial.mjs`, `scripts/test.py`, `scripts/test-node-file.mjs`, `tests/deploy/test_account_storage.py:50`, `tests/deploy/test_restore_trial.py:316`, `tests/invariants/test_account_server_*.py`; `.claude/skills/*` and `.agents/skills/*` (the names of the-way skills); `AGENTS.md:24`; `foundations/environment_facts.md:220, 304, 748` (URLs of external specs).

**S3 `plan`**: of 257 lines, every one in the sources is the game's "trip plan" or a variable `plan` (`trip.ts`, `maps-screen.tsx`, `program-editor.ts:600` "a plan that parts what the data sets apart"); the ones that look like a planning document: `tests/sim/loop.test.mjs:909` ("the plan's *Goal*"), `tests/sim/saved-game.test.mjs:48` is the game's plan. `guidelines/styleguide-browser-view.md:805` is a heading "Plan of a user-interface change" (a guideline section, not a pointer).

**Wider forms** (`Row N`, `Finding`, `binding answer`, `Task item`, `answer N`, `cause N`, `loop2#`, `executor`, `orchestrator`, `the spec`, `the plan` …) over `src tests guidelines scripts deploy .github`: pointers are `tests/invariants/test_local_start_access.py:479, 490, 582, 618` ("Task item 7/6/8/18"), `tests/deploy/test_loop2_backup.py:17` ("through the cycle's orchestrator"), `tests/deploy/test_loop2_watch.py:1, 51`, `tests/deploy/watch_script_support.py:67`, `tests/invariants/test_account_save_backup_failure_notice.py:191` ("the spec"), `tests/sim/catch-up.test.mjs:5, 496`, `tests/sim/loop.test.mjs:4, 909`, `tests/password-measurement.test.mjs:82`, `tests/view/end-window-game.test.mjs:433, 517`; the rest of the 47 lines are ordinary uses ("finding", "row 0 col 1", "did not answer 200").

## Own-work check (section 3)

Requirement most likely not met: "a decision named by a comment holds what the comment says, and nothing but comments changed". Checks: (1) the esbuild comment-stripped comparison, identical for all six files; (2) for each decision newly named I read it whole: D-18, D-70, D-72, D-125, D-100, D-102, D-44 (first 40 lines), D-311, D-329, D-189, D-251, D-180, D-181, D-344, D-63; D-329 holds „Wejdzie: …” always with „Wejdzie: nic”; D-311 holds the order of the world area; D-100 and D-102 hold the three sentences; (3) D-383 against the code: `fireOn` returns the campfires' texts first and then the items' (`tile-list.ts`), `burningText` gives „<name> — płonie, zostało <n> min”, the test `tests/view/tile-list.test.mjs:168-178` pins the order and "only while it burns", `terrain-drawing.tsx` draws only the campfire's icon; (4) every cited D-number exists; (5) `foundation_check.py` exit 0 and `tracked_private_paths_check` lists nothing.

## Reach beyond the dispatch

- Read the spec of the cycle `ognisko-i-jedzenie` in git history (`git show 273446fb:docs/task-cycles/ognisko-i-jedzenie/spec.md`, Decision 5) to see what "spec Decision 5" carried. The handoff said the passages the pointers name, in the snapshot; the spec is a record of a loop2 cycle in history, not private.
- Read the note passages in the snapshot: `ognisko_i_jedzenie_loop2.md` (To do 15, Q11, row 15), `ekran_przejscia_loop2.md` To do 1-9, `koniec_przejscia_loop2.md` To do 1-9, `kronika_z_filtrami_loop2.md` To do 1-9, `teraz_i_potem_loop2.md` To do 1-6, `scena_z_ludzikiem_loop2.md` To do 1-6, `karta_i_katalog_map` (`karty_i_katalog_map_loop2.md` lines 58, 95-97, 291) for the "Wejdzie" line, to check that the decisions named already carry what the removed `To do N` carried.
- Read D-63, D-69-D-72, D-100, D-102, D-125, D-180, D-181, D-189, D-251, D-311, D-329, D-344 for the same purpose (not all named in the handoff).
- Looked at `git show 5ded0194` (the first version of `tile-list.ts`) to see what "choice C4/C5" were.

## Unread material

- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole. `src/browser/AGENTS.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`: read whole (the styleguide in two pages).
- The six source files: each read whole before the change (`kitchen-sink.ts` was read by its comment lines and the surroundings of line 342, not whole: 828 lines of code; its comments were all listed by a grep over `//`, `/*`, `*` lines and checked).
- `foundations/part_map.md`: the `browser-view` entry only (lines 1-29). No test file is in my Change, so there is no `invariant:` line to follow; none of the six files cites an invariant (grep).
- `task.md` and the passages copied into the handoff: read as copied. The three *Foundation entries* rows (D-82 as changed, D-362 as changed, the new invariant `tracked-file-private-names`): not read in full; D-82 and D-362 were seen only as hits of the S2 search (lines 1686, 8837), the invariant not at all; the handoff states what D-82 now says, which was enough to judge the comments.
- The files of the `Read` for writing a decision: all read whole except `.the-way/elements/decisions/examples.md` (head only, it names `WAY-03`, a decision of the-way's own log, not read); D-380 to D-382 of the product's log served as the shape.
- `old-loop/` in the snapshot: not read; none of the six files names a file of it.
- D-44 read first 40 lines (binding sentences, *Verification*, *Rationale*), as it is long and is only cited for the shared controls; D-311 read whole; D-19 by its first part.

## Searches not found or unclear

- "choice C4/C5" (`tile-list.ts`): no document found that holds those choices; they are choices of a plan from before the cycle records in `docs/task-cycles` (the first version is the commit `5ded0194`, 13 October). No decision holds "label „(col, row)”" or "„—” in a cell of an absent resource". Treated as described above.
- "the task" in `kitchen-sink.ts:342`: the passage it points to could not be identified in the snapshot (the commit is `be822116`, Oct 27; the note `konta_graczy_i_logowanie_loop2.md` To do 15 is about the waiting state, not about these sentences). I named D-100 and D-102, which hold the three server sentences; the two client sentences stand in `account-api.ts`.
- The note's reasoning for showing a burning stick in the row: only the single sentence "płonący patyk widać tylko w tym wierszu"; no reason and no rejected way; *Rejected* of D-383 is `unknown`.
- Nothing else was looked for and not found.

## Values or wording in the task or plan that did not survive my check

None found. For the orchestrator: the handoff's S3 pattern with `\b[Pp]lan\b` also prints every use of the game's trip plan, so its output on the files of Change is never empty; the hits listed above are all that kind.
