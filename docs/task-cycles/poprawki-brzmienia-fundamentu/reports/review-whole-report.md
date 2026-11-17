FAIL bcc35f33f571f890626affedb9d430d5cc6a7a39

# Review of the whole change — poprawki-brzmienia-fundamentu

- Range: `f66ae6eb34de0b68099caf1a19f4ff368b332372..bcc35f33` (18 commits, 49 files, +340 / -317). `git rev-parse HEAD` = `bcc35f33f571f890626affedb9d430d5cc6a7a39`, the head given. `.the-way` at `bfb2e109`, the pinned gitlink.
- Variant: review of the whole change of a plan; no slice had a review of its own, so every slice is judged here.
- Counts: blocking 2 (both Important, within the task) · Minor within the task 9 · out of scope 2.

## Blocking findings

### B1 (Important) — `sprite-credits` now states a clause its test does not check

- Place: `foundations/invariants.md:1288-1297` (`sprite-credits`, *Method:* test), sentence now ending "…the pack of each file being the one the list of the sprite files in `README.md` names."; its citing tests `tests/view/icons.test.mjs:422-457`.
- What is wrong: the citing tests check each PNG of `assets/sprites/` against the table `PACK_OF_SPRITE` the test file holds itself (`tests/view/icons.test.mjs:396-415`) and never read `README.md` (`git grep README -- tests` finds no test that reads the sprite list). The invariant reads `test`, and the-way's invariant template says *Method* reads `test` "where a test of the product's test suite checks the sentence" (`.the-way/elements/invariants/template.md:46`). D-271's *Verification*, reworded in the same slice, now says honestly that the test checks only "an assignment to a pack in the table of its test, which does not judge whether the assignment is right" — so the decision and the invariant now describe two different references for the pack of a file, and only one of them is tested.
- Why it matters: a sprite file listed under the wrong pack in `README.md`, or a file the README forgets, breaks the invariant's sentence while every test passes and the invariant keeps `Violated: no`. Today the two agree (checked by hand: every file of `assets/sprites/` stands in `README.md:34` under the pack `PACK_OF_SPRITE` gives it), so nothing is violated now; the gap is that nothing would notice.
- Evidence: `tests/view/icons.test.mjs:396-433`; `git grep -n README -- tests` (no sprite or pack hit); `foundation_check.py` lists `sprite-credits` as "reads `test` and its sentence is changed by this change, while no file citing it changed".
- Slice: 8 (`c753bc5e`). The wording is the task's (To do 2.13), which makes it a defect the task mandates.
- Fix, recommended: keep the human's wording and make the test hold it — a case in `tests/view/icons.test.mjs` (with `// invariant: sprite-credits`) that reads point 2 of "First run" in `README.md` and fails where the pack it names for a file differs from `PACK_OF_SPRITE`. The other way, rewording the invariant back to the test's table, departs from the task's wording and needs the orchestrator to ask.

### B2 (Important) — "camp" still names the picture band in English files git tracks

- Place: `README.md:34` ("the camp at the top of the "Siedziba" ("Headquarters") screen … the characters and the campfire of the camp"); `src/browser/view/camp-picture.ts:7`, `:14-15`, `:68`; `src/browser/sim/data/scene.ts:39`, `:308`, `:317`; `src/browser/headquarters.css:2`, `:4`, `:12`, `:23`; `src/browser/styles.css:11`, `:662`, `:665`, `:671-672`; `src/browser/run-screen.css:6`, `:1135`; the English heading `guidelines/styleguide-browser-view.md:930` "### The camp of Siedziba".
- What is wrong: To do 7.14 (b) gives the outcome "żeby „camp" znaczyło tylko miejsce postaci (reguła the way o słowie z dwoma znaczeniami)". The rule it invokes, WAY-99 in `.the-way/elements/glossary/template.md:65-70`, renames a meaning across "the English text of the files git tracks", and the uses of the meaning that moves are rewritten. The change renamed the band in the foundation, in `camp.tsx` and in three test files only; the comments listed above still call the band "the camp" (for example `camp-picture.ts:14` "The camp of Siedziba as plain data for drawing (D-389)", `styles.css:672` "the camp's fire has no state"), beside the glossary's `at the camp`, which means where a character is. The word keeps its two meanings, the defect the item was written to remove. Identifiers (`CAMP`, `campDrawing`, `.camp*`) and file names stay, as the task says; the Polish body of the styleguide ("obóz") is outside WAY-99.
- Why it matters: an agent that reads `camp-picture.ts` or the README next to the glossary meets "camp" as the band and "at the camp" as a character's place — the misreading the task names. The handoff asked whether the rename's scope is too wide; it is consistent with the task's reason in the foundation and too narrow outside it.
- Evidence: `git grep -n -i -w camp -- README.md src/browser guidelines` at the head (lines above).
- Slice: the plan's *Choices* (row "The band is called 'the picture band' …", which left these files out), carried by slices 15 (`f173b651`) and 16 (`c37e2d4e`). The task's own list names only `camp.tsx` and the test names; the task's stated outcome and the rule it cites ask for the rest. The orchestrator may want the human to confirm the wider sweep, since the task's list is narrower than its reason.
- Fix, recommended: rewrite those comments, the README sentence and the English heading to "the picture band" (keeping identifiers, class names and file names); the heading change needs a look for references (none found by `git grep "The camp of Siedziba"` outside the comment lines above).

## Minor findings within the task

1. `foundations/glossary.md:253-258` (`reading`, slice 1, `ce9cac00`) — the *Not* carrier `"reading:"` holds the term itself, while the glossary template says a carrier is "never one holding the term or its forms" (`.the-way/elements/glossary/template.md:88-92`); it is also a value of the-way's environment-fact template written in quotation marks, where the template asks backticks for a closed-list value. The wording is the task's (To do 3.6); a reader is not misled, so Minor. Options for the orchestrator to put to the human: keep it as the task gives it, or write *Not* `none` (a command's reading is a meaning a reader of the field gives the word, which *Not* does not list).
2. `foundations/glossary.md:253-258` with `foundations/decisions.md` (slice 1) — the new term gives "reading" a product meaning (one pass of the browser view) while the foundation keeps using the word in its ordinary senses: D-04 *Verification* "the clock's current reading written into the game state on each reading" (both senses in one clause), D-03 "a reading of the code, not a run", D-356 "in the reading of 2026-11-14", D-347 "a reading of two files of its code". WAY-99 (`.the-way/elements/glossary/template.md:62-70`) has one of two such meanings renamed, the human choosing the word. No sentence I found is likely to be misread in context, so Minor; it is a question for the human, not something a fixer can settle alone.
3. `foundations/decisions.md:11237` (D-322, slice 11, `307cc1d4`) — the first new sentence, "a scene drawn again on the same moment, after a return to the screen, a reload or a load, shows the last image of the effect at once (D-319)", cites D-319, whose binding sentence speaks only of the mage's walk; the sentence about a scene drawn again on the same moment stands in D-317 ("a scene drawn again on the same moment shows that image at once"). A reader who follows the reference does not find the rule. The citation is the task's wording; recommended "(D-317, D-319)" or "(D-317)", which the orchestrator may need to check with the human as a departure from the given wording.
4. `foundations/decisions.md:50` (D-03 *Relations*, slice 12, `578d13d2`) — "narrowed by D-265" is not in the closed list of relation types (`derives from` / `narrows`, `.the-way/elements/decisions/template.md`, "Relations and precedence"), and the relation is written in the wrong entry: the template has the dependent entry carry it, while D-265 reads "derives from D-44 · derives from D-03". Since D-03's own sentence now carries the exception, no precedence needs recording. The task words it this way; recommended: drop "narrowed by D-265" from D-03, after the orchestrator asks.
5. `tests/invariants/test_account_save_backup_encrypted.py:130` (slice 6, `36d4292e`) — the `decision: D-232` line now quotes the whole new sentence, including "a run whose command cannot remove its temporary copy, or that a signal kills, leaves that plain copy in the container's `/tmp` until the next deployment replaces the container, one copy for each such run", which this test does not exercise (it checks that `age` gets the plain database uncompressed and that nothing is left in the host's temporary root). The line claims a coverage the test does not give. Recommended: two lines quoting "Outside the container's writable layer of D-231, the plain database exists on the host only in that pipe" and "and the backup is not compressed", as `tests/deploy/test_loop2_backup.py:249` already quotes only the first span.
6. `tests/invariants/test_account_server_runtime.py:1-2` and `tests/invariants/test_terrain_drawing_numbers.py:1-2` (slice 4, `173c4f3f`; the plan's slice 4 *Change* did not list them) — the docstrings still open with the old sentences of the invariants this change reworded ("TypeScript source and deployment use Node.js major version 24"; "The drawing of the game map shows no number…" without "(the terrain drawing, not the scene)"). To do 7.3 treats exactly this — a docstring quoting a superseded invariant sentence — as a defect to fix, and slice 15 updated `test_loop2_container_sprites.py` the same way. `foundation_check.py` lists both invariants.
7. `foundations/decisions.md` D-355 *Rationale* (slice 6) — left unchanged because the quoted wording no longer stands; but part of the task's change still applies: the sentence says the copy "depends on nothing about the server that this repository does not carry, except two things read once on the server on 2026-11-14", while the same entry's lacks say "a human … creates the file with the owner of the deployment account". The file and its owner, which the task names ("except the file and its owner, which a human creates"), are missing from that list. Recommended: add them to the exception, keeping the 2026-11-14 readings.
8. `foundations/decisions.md` D-218 *Verification* (slice 14, `ee68e190`) — the binding sentence now covers the screen Postać, while *Verification* still lists only „pokolenie {n}" on Siedziba; the case exists (`tests/view/character-screen.test.mjs:108-111`, `.character-screen-generation` reading „pokolenie 2"), so *Verification* can name it.
9. `foundations/environment_facts.md:744-749` (`docker-compose-down-volumes`, slice 2, `d60ad606`) — the *Source* now quotes "The default network, if one is used.", while the sentence still says `docker compose down` removes "the networks it defines"; the sentence is not false (no "only"), but it says less than its quotation. Optional: "…the networks it defines and the default network…". The task notes the item has no effect on volumes, so the dependants (`invariants.md:693`) are untouched.

## Out-of-scope findings

1. `src/browser/sim/game.ts:369` — the comment still says "defeated-attack count", the wording To do 2.14 replaced in `trip-plan-progress` by "count of beaten attacks"; the task changes only the invariant. Minor, outside the task.
2. `foundations/glossary.md:93-98` (`at the camp`) — the *Not* carrier `` `campDrawing` `` holds a form of the term ("camp"), against the same template rule as Minor 1. The item stood before this change (slice 1 only removed the first item and changed "that screen"). Minor, outside the task.

## Declined to judge

- The quality of the human's chosen wordings for D-231, D-232 and D-380 beyond their agreement with the code: the task settles them.
- Whether the Python test files pass ruff: not runnable here (see checks).
- `the old Loop` and the "currently/today/for now" words in binding sentences: the task assigns them to other tasks.

## The slices and the task

Each item of *To do*, *Decisions in play* (Zmieniane) and the task's other sections was checked against the head, by the diff and by `git grep`:

- Made as given: To do 2.7-2.12, 2.14, 2.15, 3.1-3.4, 3.6, 4.1-4.4, 5.1-5.11 (5.10 on the successor `playwright-cli-session-separation`), 6.1-6.4, 7.3, 7.4, 7.7, 7.9, 7.10, 7.11, 7.13, 7.14 (a), (c), (d), 7.15 (a)-(f), 8.1; D-03, D-04, D-17, D-28, D-44, D-46, D-70, D-83, D-84, D-85, D-103, D-104, D-105, D-111, D-119, D-161, D-170, D-185, D-189, D-207, D-218, D-220, D-231, D-232, D-236, D-253, D-255, D-262, D-271, D-278, D-280, D-310, D-311, D-316, D-317, D-322, D-342, D-347, D-356, D-363, D-368, D-373, D-380, D-384, D-419 (for the withdrawn D-358), plus D-57, D-367, D-389, D-421, D-272, D-54 of To do 7.13/7.14.
- Already made at the base, verified at the head: To do 2.1-2.6 (D-04, D-103, D-108, D-113, D-179 *Verification*; *Derives from* of `password-operation-gate`, `player-argon2-deployment-check`, `nature-energy-range`), 7.1 (no `*.md:<line>` reference left in `tests/`), 7.6 (`COMPARES_QUANTITY` holds `itemBelow`), 7.8 (the docstring opens with the invariant's present sentence), 7.12; D-28's "complies" already read "general and kind guidelines"; D-335's quoted „Ognisko" stands nowhere (`actions.ts:148` reads „Zasil — ognisko").
- Partly made: To do 2.13 (B1), 7.14 (b) (B2), D-355 (Minor 7).
- Wordings the executors chose, checked: D-105 keeps "per email address per hour" and adds the parenthesis (the reading that keeps "per hour"); D-310 matches `program.ts:283-297`; D-57's decimal comma matches `body-row.ts:16-22`; D-04's previous-save privilege matches D-400 ("the page shows no control for the privilege … where the flag is false"); D-104's clause matches `tests/transport.test.mjs:1372-1409` (both directions of the route list are asserted); D-232's leftover matches `src/server/account-backup.ts:9-30`, `:118-127`; the comment over `.copy-line` matches `program-panel.tsx:624-659`; D-311's order matches `run-header.tsx:1-5`; D-342's group entries match `chronicle-entries.ts:237-251`; `security-notes.md` matches the rulesets read from GitHub (below).
- Executors' own-work checks: each slice's check fits the slice's weakest requirement except slice 8, whose check did not reach the new clause of `sprite-credits` (B1), and slices 4 and 15-16, whose checks did not search the test docstrings (Minor 6) or the English comments outside the plan's list (B2).
- No reserved choice is taken; no trust boundary or irreversible operation is touched (the handoff's answers of step 4); no behaviour changes (comments, docstrings, one test name, one CSS comment); no `invariant:` line added or changed; `DEPLOYMENT_MEMORY_LIMIT` keeps its name. No screenshot file is in the range.
- Structure: only comments and wording change; `change_file_sizes.py` shows no file growing by more than 6 lines (`glossary.md` +6, `test_program_rule_pick.py` +6, `program-panel.css` +3). `guidelines/coding.md` holds no rule of size, so there is no size test to run in base and head worktrees; no finding of structure.

## Checks run

| Command or method | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; 6 `listed:` lines: `account-server-runtime`, `terrain-drawing-numbers`, `player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge`, `sprite-credits` (sentence changed, citing test unchanged). I read the citing tests of each: `player-opaque-session-cookie` is held (`transport.test.mjs:866-868` asserts `__Host-loop2.sid`); `account-server-runtime` and `terrain-drawing-numbers` are held but their docstrings are stale (Minor 6); `sprite-credits` is not held (B1); `trip-plan-progress` and `loop-run-knowledge` change wording only. |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 errors, 144 warnings, 7 info |
| `python -B .the-way/task-cycle/change_file_sizes.py f66ae6eb bcc35f33` | 0 | 49 files, +23 lines in all |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 | 28 pass |
| `npm test -- tests/view/camp-picture.test.mjs` | 0 | 7 pass |
| `npm test -- tests/view/icons.test.mjs` | 0 | 36 pass |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0 | 8 OK |
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | 0 | 2 OK |
| `npx prettier --check` on the 29 changed `.mjs`, `.tsx`, `.css` files | 0 | all formatted |
| `gh api repos/mariusznazar/loop2/rulesets` and each ruleset (read only) | 0 | `main`: deletion, non-fast-forward, pull request with `merge`, no bypass actor; `main_tests`: required check `tests`, bypass `RepositoryRole` 5 (admin) `always` — as `security-notes.md` now says |
| Source pages of the changed environment facts, downloaded with `curl` and searched with `grep -F` | 0 | quotations found as rendered text: compose-spec secrets note (`container_spec.md:1290-1291`), `compose_down.md:9-10`, express-session `index.js:174`, `:359`, npm `shrinkwrap.js:123-129`, `:261-262`, Cloudflare `tunnel/index.mdx:32`, `:34`, the first heading after them being `## How it works` (`:42`), OWASP `## Introduction` with "To sum up our recommendations" and "Use Argon2id", playwright `registry.js:44-45`, `:52`, `:62-66`, `volume_prune.md:31` |
| Manual: `assets/sprites/` against `README.md:34` | — | every file listed, each under the pack `PACK_OF_SPRITE` gives |
| Manual: docstrings of `test_action_in_progress.py` and `test_program_rule_pick.py` against `invariants.md` | — | word for word |

Not run: the product's full gate (the cycle's own run); ruff on the changed Python files (`.runs/quality-venv` is missing); `tests/deploy/test_account_storage.py` and `tests/invariants/test_loop2_container_sprites.py` (Docker; only a test name and docstring changed); the size invariant in base and head worktrees (no such rule, see above). The Pixel Crawler terms (Google Drive), the nodemailer tarball and the Node.js docs were not fetched, so `pixel-crawler-terms` (its new point 5), `nodemailer-require-tls` and the three Node.js facts are unverified against their sources.

## Reaches beyond my selection

- `src/server/account-backup.ts:1-30`, `:105-135` — to check D-232's new leftover clause.
- `src/browser/sim/program.ts:255-304` — D-310's order.
- `src/browser/view/program-panel.tsx:620-664` — the comment over `.copy-line`.
- `src/browser/view/run-header.tsx:1-12`, `src/browser/view/chronicle-entries.ts` (grep), `src/browser/view/body-row.ts` (grep), `compose.yaml` (grep) — D-311, D-342, D-57, `player-argon2-deployment-check`.
- `tests/transport.test.mjs:1370-1410`, `:795-868` (grep) — D-104's clause and `player-opaque-session-cookie`.
- `tests/view/icons.test.mjs:340-474` — `sprite-credits` (B1).
- `tests/invariants/test_account_save_backup_encrypted.py:120-150` — Minor 5.
- `tests/view/character-screen.test.mjs` (grep) — Minor 8.
- `.the-way/elements/glossary/template.md` whole, `.the-way/elements/invariants/template.md:44-63`, `.the-way/elements/decisions/template.md` "Relations and precedence" — for findings B1, Minor 1, 2, 4.
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/executor-1-report.md`, `executor-3-report.md`, `executor-5-report.md` whole — the slices whose items were "already made".

## Working copies

- `.runs/review-whole/` — diffs, the extracted entries, the indexes, three small Python scripts, the check outputs and the downloaded source pages (`src/`). Removed before returning; no worktree was made.

## Unread material

- Decisions of my selection read whole: 8 (D-03, D-04, D-28, D-83, D-84, D-85, D-49, D-355). The other 45 decisions the change edits were read as their binding sentences, *Relations*, *Verification*, every changed passage with a word diff, and the continuation lines of their *Rationale* and *Rejected* where these span several lines; the unchanged one-line *Rationale* and *Rejected* paragraphs of those 45 were not read. I did not write the index of the whole selection by section and part: the change touches every part and nearly every section, so that index is the whole log; I wrote the list of sections and indexes of D-82, D-154, D-208, D-226, D-251, D-265, D-270, D-319, D-323, D-400 and read their binding sentences. The decisions named "read, without change" in the task (D-43, D-106, D-146, D-159, D-164, D-195, D-237, D-249, D-272, D-274, D-276, D-309, D-339, D-370, D-371, D-377, D-379, D-382) were not opened beyond what the diff of their neighbours shows.
- Changed invariants, glossary entries, part-map entries and environment facts: read whole.
- `guidelines/testing.md`: lines 1-30 and the changed hunk at 341-350 only. `guidelines/styleguide-browser-view.md`: the changed hunks (193-200, 237-243, 390-418, 532-550) and grep. `guidelines/coding.md`: searched for the rule of size only. `guidelines/coding-browser-module.md`: not read. `.the-way/product-guidelines/template.md` and the testing and styleguide templates: not read, so the guideline edits were not compared with them beyond the task's own wording.
- Executor reports 2, 4, 6-17 and the planner's report: not read; their points came through the handoff.

## Searches not found or unclear

- `COMPARES_STOCK`: not in the repository (the constant is `COMPARES_QUANTITY`), as slice 3 reported.
- A test that reads the sprite list of `README.md`: none (B1).
- The quoted D-355 wording "two things nobody has checked": not at the head; replaced before the base by the readings of 2026-11-14.
- D-319 holding the sentence on a scene drawn again on the same moment: not found; it is in D-317 (Minor 3).
- A relation `narrows D-03` in D-265: not found (Minor 4).
- `decision_index.py --decision 270` failed ("no decision 270"); it takes `D-270`.
