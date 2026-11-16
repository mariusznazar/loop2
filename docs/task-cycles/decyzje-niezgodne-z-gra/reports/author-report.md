# Report of the one author — task `decyzje-niezgodne-z-gra`

**Status:** `done with concerns` (the concerns are the doubtful cases of item 7 and the checks `ruff-source-rules` and `shellcheck-source-rules`, which could not run here; both below).

Branch `task/decyzje-niezgodne-z-gra`, base `5327f55a`. Nothing is left uncommitted (the files under `.runs/` are ignored).

## Commits

| Commit | What |
|---|---|
| `6999c168` | Items 1–5 and the 15 settlements: the lists `invariants:` of D-04, D-108, D-113, D-179, D-190; `Derives from` of `player-argon2-deployment-check` (+D-113) and `nature-energy-range` (+D-377); the sentence of `loop2-container-sprites` and the docstring of its test; the new wording of D-03, D-14, D-17, D-28, D-61, D-189, D-195; the fact `git-path-patterns` (item 8) and `Rests on` of `cross-part-imports`; the `decision:` lines of 12 test files that quote the changed sentences. |
| `dc26dd83` | Item 6: the nineteen comments and names of tests (17 files). |
| `6be2ec6c` | Item 7: `owner` → `operator` for the person who runs the server (23 files). |

Whole change against base: 49 files, +234 −232.

## Entries written (the foundation step), each marked

| Entry | Mark | Meaning in English | Znaczenie po polsku |
|---|---|---|---|
| D-04 `Verification` + `minute-span-split` | row 1 | D-04 names the invariant that derives from it. | D-04 wymienia niezmiennik, który się z niej wywodzi. |
| D-108 + `account-client-requests` | row 2 | same | tak samo |
| D-179 + `trip-run-end` | row 3 | same | tak samo |
| D-190 + `catch-up-state` | row 4 | same | tak samo |
| D-113 drops `player-argon2-password-hash` | row 5 | The library choice stays with D-106; D-113 names only the deployment check. | Wybór biblioteki zostaje przy D-106; D-113 wymienia tylko pomiar na serwerze. |
| `player-argon2-deployment-check` *Derives from* D-106 · D-113 | row 6 | A change of the profile or gate in D-113 points at the deployment measurement. | Zmiana profilu albo bramki w D-113 wskazuje pomiar na serwerze. |
| `nature-energy-range` *Derives from* + D-377 | row 7 | The regeneration “up to its cap” of D-377 is a way the energy could pass the cap. | Odnawianie „up to its cap” z D-377 to droga, którą energia mogłaby przekroczyć limit. |
| `loop2-container-sprites`: “…or the picture behind the login card asks for” | row 8 | The invariant covers the login-card picture D-271 keeps in `assets/sprites/`. | Niezmiennik obejmuje tło karty logowania, które D-271 trzyma w `assets/sprites/`. |
| D-195 example “…Zbieranie małych przedmiotów.” | row 9 | The discovery band names the tree by its full skill name. | Pasek odkrycia podaje drzewo pełną nazwą umiejętności. |
| D-61 “…the cause combat…” | row 10 | The cause of a death in combat is named like the others, without a Polish quotation. | Przyczynę śmierci w walce nazwano jak pozostałe, bez polskiego cudzysłowu. |
| D-17 “…at or above thresholds…” | row 11 | The deployment builds also at a value equal to the threshold. | Wdrożenie buduje także przy wartości równej progowi. |
| D-189 “…the card of the map marks it, under „Wejdź” at the character in „Kto idzie”…” and *Rationale* “the mark on the card of the map” | row 12 | The mark stands on the card of the map, not on the list. | Znacznik stoi na karcie mapy, nie na liście map. |
| D-14 “loop2's containers, the application's and the connector's, are Docker containers.” | row 13 | Both containers are Docker containers. | Oba kontenery są kontenerami Dockera. |
| D-03 “…except the waiting screens of D-262, which `src/browser/view/app.ts` builds…” | row 14 | The exception for the waiting screens is written into the sentence. | Wyjątek dla ekranów oczekiwania wpisano w zdanie. |
| D-28 *Verification*, example “general and kind guidelines follow…” | row 15 | The example names no count of the kind guidelines. | Przykład nie podaje liczby wytycznych rodzajów. |
| Environment fact `git-path-patterns` (new) and `cross-part-imports` *Rests on* `git-path-patterns` | item 8 (found, not a row) | Git matches the path patterns of an attributes file by the rules of `.gitignore`, with two exceptions; the part of a file comes from that matching. | Git dopasowuje wzorce ścieżek pliku atrybutów regułami `.gitignore` z dwoma wyjątkami; część pliku wynika z tego dopasowania. |

No entry is `the cycle's` or `projected`. No question for the human arose in the foundation step.

Wording and cost of the choices: where a settlement gave the sentence in quotes it was written as quoted. The `decision:` lines of the tests that quote D-14, D-17, D-61, D-189, D-195 (and later D-13, D-233, D-234, D-356) were changed to the new wording, which the check demanded; no assertion changed there.

## Acceptance criterion

`python -B .runs/task-cycles/decyzje-niezgodne-z-gra/reports/inv-names-check.py .runs/author/inv-final.txt` → exit 0, “0 mismatches” (base: exit 0, “6 mismatches”: D-04, D-108, D-113, D-179, D-190, D-377; the output of the base is in `.runs/author/inv-base.txt`).

## Item 8 (`cross-part-imports`)

Searched: `foundations/environment_facts.md`, D-351, the invariant's *Rests on*, the pinned `.the-way` (`foundations/invariants.md`, `foundations/environment_facts.md`, `elements/invariants/examples.md`, `elements/part-map/template.md`, `elements/invariants/skill/draft.md`) and `tests/invariants/test_cross_part_imports.py` with `tests/invariants/loop2_invariant_support.py` (`file_owners`).

Found: the-way's own invariant of the same name rests on its fact `git-path-patterns` (source: the gitattributes page of Git 2.55.0, three passages), the part map of the-way gives the matching of the *Files* patterns to git (`elements/part-map/template.md`, WAY-44), `elements/invariants/skill/draft.md` names “the part map hands the matching of a pattern to git” as the case of a *Rests on* fact, and loop2's own test does exactly that (`git check-attr` with an attributes file made from the part map). I opened `https://git-scm.com/docs/gitattributes/2.55.0` with WebFetch on 2026-11-16 and the three passages stand there word for word (markup dropped), so the fact is written with that date read. It is the one fact of the-way copied into loop2's file under the same identifier (the two products do not share an identifier space).

Decision for the human to accept at the merge: I took this fact to be the one the `TODO` waited for. If the human meant another fact, the entry is easy to replace.

## Item 6 — the nineteen places, how each was fixed

| Place | Fix |
|---|---|
| `test_loop2_log_storage.py` “A2”, “A3” comments (4) and the name `…_of_a3` | The four comments removed (each repeated the test name or the constants' comment); the case renamed `test_the_stanza_holds_exactly_its_directives`. |
| `react-controls.test.mjs` “(pytania 2 and 2c)” | The comment removed; the two `decision:` lines already hold the sentences. |
| `encounters.test.mjs` “Sources: …decisions.md:2008…” | The line removed; D-118, D-119 and D-143 stand in the `decision:` lines. |
| `program-counts.test.mjs` “(foundations/decisions.md:1619,1641)” | Numbers of lines removed, “D-92 and D-93” stays. |
| `status-row.test.mjs` “D-135” | “D-133” (verified: D-133 gives the bar with the streak as it stands; D-135 gives the longest streak). |
| `end-window-lines.test.mjs` “(D-93 gives the percentages whole)” | “(D-368 gives the shares of time in percentages)”. |
| `flow.test.mjs` “D-173: „Zakończ” drops the copy…” | Comment removed (D-173 states only that „Zakończ” without unsaved changes ends the map run at once; the case checks more, and the name says it). |
| `tile-list.test.mjs` “D-70: …alone” | “The line holds the stock of the tile alone; the campfire's minutes left stand in the row of the list of revealed tiles (D-70).” |
| `camp-picture.test.mjs` first comment | “(D-272)” → “(D-389)”. |
| `headquarters-screen.test.mjs` “(D-272, D-321)” | “(D-389)” (the text of D-389: “a picture, not a control, taking no click and no key, hidden from readers”). |
| `headquarters-screen.test.mjs` “(D-36)”, `program-panel.test.mjs` “D-03, D-36” and “D-36” | Citations removed; the “Catches …” sentences stay. |
| `account-screen.test.mjs` “D-261: the sentence stands in the card.” (~3587) | Removed (the case reads `noticeTexts`, texts alone; verified in the code). |
| `account-screen.test.mjs` “D-262, D-280.” (~5299) | “D-280.” and the same in the docstring of `assertNameAloneOnBar` (the helper, not in the task's list: D-262 does not say the name stands alone on the bar, D-280 does). |
| `account-screen.test.mjs` “D-251, D-329. … wrong place or role” | “D-251. … wrong place” (the case does not read the role `warning`; checked in the code). |
| `map-lines.test.mjs` “…and a minutes-without-fire line where the map does not cool the body” | The clause replaced by “wrong minutes without fire” (the first case checks the numbers 83 and 33; the second checks the missing line). |
| `trip.test.mjs` “The restart follows the completion…(D-214)” | The sentence removed; the case sends to `forestDeep`, there is no restart. |
| `loop.test.mjs` name | “every state a loop makes over 520 minutes of a map run loads back, with the save time it was stamped with”. |
| `rule-signs.test.mjs` name | “the reason of the world comes before the nature energy, which is the reason where the world and the backpack allow” (the second assertion carries a stick and gets the energy reason; the claim “backpack before energy” is not checked: no case gives the backpack a refusal against an empty energy). |
| `rule-editor.test.mjs` name | **Assertion added** (the one assertion change of the task): the case now gives group 1 the condition `satietyBelow 30` and reads `.rule-list-condition` = “Sytość poniżej 30” in the folded section, so the name's “condition” and D-295 are checked. Mutation: with “…poniżej 31” the case fails (`npm test -- tests/view/rule-editor.test.mjs` exit 1, 74 pass, 1 fail), restored → exit 0. |

Not changed, seen: `tests/sim/encounters.test.mjs:872` has a second pointer of the same kind, “Sources: foundations/invariants.md:165, :309; decisions.md:450 (D-22)”; it is not in the task's list, so it stays (see “Needed from you”).

## Item 7 — the word `owner`

Table: `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/author-owner-classification.md` (copy of `.runs/author/owner-classification.md`).

- Word occurrences before 870, after 694 (script `.runs/author/list_owner2.py`, which counts `owner` as a separate word and not as part of an identifier, a path or a compound).
- Changed (a): 176 occurrences on 151 lines — `foundations/decisions.md` 53 lines (73 occurrences; the estimate in the task was about 70 lines), the deploy skill: `SKILL.md` 4 lines, `references/backup_and_restore.md` 18, `references/setup_and_secrets.md` 6, each in `.claude/` and `.agents/` (blobs equal: checked by `git ls-files -s`); `.github/workflows/check-address.yml` 1, `deploy/loop2-watch` 2, `scripts/restore-trial.mjs` 3, four files of `src/server/` 1 each, six titles of `tests/account-storage.test.mjs` (“the owner's command …” → “the operator's command …”), and 26 `decision:` lines of tests that quote changed decisions.
- Kept (b): the role (the word with `role`, `panel`, `"owner"`, `made owner`, `blocked owner`, `the acting owner` in D-252 lines 6266, 6283, 6309 second one), identifiers (`const owner`, `asOwner`, `file_owners`, `owner@example.test`), the owner of a file in the Unix sense, the repository's owner on GitHub (`AGENTS.md:32`, D-358's row, `loop2-play/SKILL.md:186`), quotations.
- Doubtful, kept unchanged, with the reason, in the table (12 cases; the main ones): D-07 line 256 “its owner's game”, D-210 “real for its owner”, D-213 “leaving the owner no trace”, D-222 “the account's owner”, `loop2-play/SKILL.md:172` “The owner accepts a request” (and the twin), `backup_and_restore.md:268` “has the owner of such an account reset it again”, `check-address.yml:13` (the `description` of a workflow input, shown by GitHub, not a comment), `foundations/part_map.md:89` and `:156` (“the owner's computer”, “telling the owner”; a part description, outside the places the task names), about 40 comments of tests that use the word for the person (the task names the titles of tests, not their comments), `skills.test.mjs:637` (“its owner's run”, the character).

### The files of the trust boundary touched, and that only comments changed

| File | Lines changed | What |
|---|---|---|
| `deploy/loop2-watch` | 2, 181 | two comment lines (`# …`), “owner” → “operator” |
| `src/server/account-backup.ts` | 9 | a `//` comment |
| `src/server/account-block.ts` | 10 | a `//` comment |
| `src/server/account-previous-save.ts` | 9 | a `//` comment |
| `src/server/database.ts` | 530 | a `//` comment |

`src/browser/sim/saved-game.ts` was not touched. `git diff -U0 deploy src scripts .github` shows only those lines: each changed line starts with `#` or `//` and only the word differs. No executable line, identifier, string, role value or file name changed.

## Checks run (no check is the gate)

| Command | Exit | Result |
|---|---|---|
| `python -B .runs/task-cycles/decyzje-niezgodne-z-gra/reports/inv-names-check.py .runs/author/inv-final.txt` | 0 | 0 mismatches |
| `python -B .the-way/elements/common/foundation_check.py` (after the last edit) | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 140 warn, 7 info`; all warnings are `dead-path` for server paths (`/srv/loop2`, `/etc/loop2/…`) of the deploy skill and its twin, which the change does not add |
| `npm ci` in the worktree (no `node_modules` stood there) | 0 | 383 packages; ignored by git |
| `npm test -- tests/deploy/test_loop2_log_storage.py` | 0 | 4 tests OK |
| `npm test -- tests/invariants/test_loop2_container_sprites.py` | 0 | 1 test OK (builds the image, Docker answered) |
| `npm test -- tests/deploy/test_loop2_deploy_build.py` / `…test_loop2_deploy_switch.py` / `tests/invariants/test_loop2_deploy_keeps_running.py` | 0 / 0 / 0 | 14 / 10 / 13 tests OK |
| `npm test -- tests/sim/{encounters,flow,program-counts,trip,loop,rule-signs}.test.mjs` | 0 each | 29 of trip, 46 of loop, 40 of rule-signs, 11 of program-counts pass, 0 fail (encounters and flow exit 0) |
| `npm test -- tests/view/{react-controls,status-row,end-window-lines,tile-list,camp-picture,headquarters-screen,program-panel,map-lines,rule-editor,account-screen,uncaught-failure}.test.mjs` | 0 each | 56, 20, 11, 15, 7, 26, 53, 11, 75, 131, 17 pass, 0 fail |
| `npm test -- tests/view/rule-editor.test.mjs` with the expected text mutated to “…31” | 1 | 74 pass, 1 fail (the new assertion catches the break); restored → exit 0 |
| `npm test -- tests/account-storage.test.mjs` / `tests/account-api.test.mjs` / `tests/http.test.mjs` | 0 / 0 / 0 | 87 / 39 / 95 pass, 0 fail |
| `npm test -- tests/deploy/test_restore_trial.py` / `test_check_address_workflow.py` / `test_loop2_watch.py` / `test_loop2_backup.py` | 0 each | 19 / 17 / 99 / 26 tests OK |
| `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` / `test_loop2_host_sharing.py` | 0 / 0 | 8 / 18 tests OK |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` / `test_tracked_file_private_paths.py` | 0 / 0 | 5 / 1 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` | **1** | 5 tests, **2 errors**: `test_ruff_source_rules` and `test_shellcheck_source_rules` stop on `FileNotFoundError` (WinError 2): the tools `ruff` and `shellcheck` are not installed on this computer. The three other cases (ESLint, Prettier and the rest) pass, so the formatting of the touched files is checked; `ruff-source-rules` and `shellcheck-source-rules` stay **unchecked** here. I did not run this file on the base, so “not caused by the change” rests on the error being a missing program, not on a comparison. |
| The gate (`npm test` with no argument) | not run | the orchestrator's |

No invariant test was written or changed; the invariant tests I touched changed only in comments and docstring (`test_loop2_container_sprites.py` docstring, `decision:` quotations in `test_loop2_deploy_keeps_running.py` and `test_loop2_host_sharing.py`), so none had to be seen failing. The changed docstring of `test_loop2_container_sprites.py` says that no case ties the login-card picture to the files the drawings ask for: the case in `scene-picture.test.mjs` still names only the scene's and the camp's data. The invariant's test reads the whole directory, so the picture (`assets/sprites/login-backdrop.png`, `src/browser/styles.css:682`) is covered by it.

## Own-work check

Requirement the work most likely does not meet: “the comparison of all decisions with all invariants finds no mismatch” together with “comments and names say only what their case checks”, i.e. that a changed sentence leaves no entry or test that still holds the old one. Checks: the comparison script (0 mismatches), the foundation check after each of the three commits (first run after the sentences: 25 errors for quotations of D-14, D-17, D-61, D-189, D-195 in tests, fixed; after item 7: 26 errors for D-13, D-233, D-234, D-356, fixed; final: `0 errors`), a search of the foundation and guidelines for the old wordings (“list of maps”, “cause „walka””, “Zbieranie.” — no other entry holds the old wording), and the verification of each “the case does not check X” claim of item 6 against the code of the case (all 19 held; the one that did not hold as stated is the `rule-editor` case, where the name promises more than the case checked, so an assertion was added). A claim of the task that I could not tell from the code: none.

## Reaches beyond the dispatch

- Decisions D-13 (quoted by tests), D-22, D-36, D-70, D-92, D-93, D-99, D-118, D-119, D-133, D-135, D-143, D-173, D-210, D-213, D-214, D-222, D-233, D-234, D-251, D-272, D-280, D-295, D-321, D-329, D-351, D-355, D-356, D-368, D-389: read in part (the sentence the test cites or the line the word stands in), to decide which decision states what a comment claims. Where: `foundations/decisions.md`. Why: items 6 and 7.
- `.the-way/foundations/invariants.md` (`cross-part-imports`), `.the-way/foundations/environment_facts.md` (`git-path-patterns`), `.the-way/elements/part-map/template.md`, `.the-way/elements/invariants/examples.md`: item 8.
- `https://git-scm.com/docs/gitattributes/2.55.0` (WebFetch): to check the passages of the fact word for word.
- `foundations/glossary.md` (entries `owner`, `blocked account`, `previous-save privilege`, read by search, whole each).
- `tests/invariants/loop2_invariant_support.py` (`file_owners`), `tests/view/scene-picture.test.mjs`, `src/browser/styles.css:682`, `src/browser/view/app.ts:172-190`: items 4 and 8, and D-03.

## Working copies

None of the kind the rule names (no worktree, clone or screenshot). The scripts and lists I made stand in `.runs/author/` (ignored, kept: `edit1.py` … `edit9.py`, `list_owner.py`, `list_owner2.py`, `owner-all.txt`, `owner-w.txt`, `owner-w-after.txt`, `edit8-log.json`, `owner-classification.md`, the outputs of the checks). `npm ci` made `node_modules/` and the builds made `dist/` in the worktree: both are ignored by git and are made by the product's own tools, so they are no working copy; they stay (`node_modules`, `…\dist`). The orchestrator may remove them with the worktree.

## Choices (with the way rejected and the cost if wrong)

1. Item 8 written as the fact `git-path-patterns` from the-way's own source, re-read on 2026-11-16. Rejected: leaving the `TODO` (the process does hold the source). Cost if wrong: the human names another fact; one entry and one *Rests on* change.
2. `rule-editor.test.mjs`: an assertion added rather than the word “condition” dropped from the name; D-295 and the name both promise it, and the page marks the condition in the folded header. Cost if wrong: a test that breaks on a change of the rendering of the condition text of a folded header (the same text the case at line 177 already checks).
3. For the log-storage comments: removed, not reworded, since each repeated the test name, the constants' comment or a `decision:` line (D-82). Rejected: a new comment citing D-355. Cost: none.
4. `operator` for the person, because the glossary's `owner` entry names it as “Not: … ‘operator’” and the glossary uses it already in `blocked account` and `previous-save privilege`. The glossary has no entry named `operator`; I wrote none (not asked).
5. Titles of tests changed in one file only (six of `account-storage.test.mjs`); comments of tests left (see above).
6. The `decision:` lines that quote D-189 were changed in 5 test files (12 lines) to the new sentence, though the sim cases cite the whole sentence and check only the part about the chest; not narrowed because that is the settled citation.

## Unread material

- `guidelines/styleguide-browser-view.md` (1045 lines): not read. I changed no style, no TSX and no CSS of the part `browser-view`; the files of that part I changed are tests (`tests/view/**`, comments, names and one assertion).
- `foundations/part_map.md`: read lines 1–40 and the lines found by search (`owner`, `git`), not whole.
- D-04 (read to its *Rationale*, up to line 119 of the file), D-262 (read to its first *Verification* example), D-271 (read to its *Verification* start), D-02 and D-29 (read as neighbours): not whole; their changed fields were read whole.
- Invariants `account-client-requests`, `trip-run-end`, `catch-up-state`, `first-map-stock`, `first-map-balance`: not read; I changed only the lists of the decisions that name the first three, and the comparison script confirms that each of them names those decisions in *Derives from*. `first-map-stock` and `first-map-balance` were not touched (answer 6.2 of the task).
- `.the-way/elements/invariants/examples.md` and `.the-way/elements/decisions/examples.md`: not read (the entries I wrote follow the forms of the neighbours in the file).

## Searches not found or unclear

- “a place of the-way saying which fact `cross-part-imports` of loop2 rests on”: not found as a statement; the source was found through the-way's own invariant of the same name (above), not through a line naming loop2.
- The task says “about 70 lines of older decisions”; I changed 53 lines (73 occurrences) there and listed in the table the others that stay (role or Unix owner, doubtful).
- The task says “the nineteen comments and test names”: the list holds 17 files and 20 places; every one was found by its text.

## Needed from you

1. Item 8: confirm that `git-path-patterns` is the fact `cross-part-imports` waited for.
2. Item 7 doubtful cases (the table, “Doubtful”): decide whether the human wants `operator` also in `loop2-play/SKILL.md:172`, `foundations/part_map.md:89` and `:156`, the `description` in `.github/workflows/check-address.yml:13` and the comments of tests; they are outside what the task names or are not the person who runs the server for certain.
3. `tests/sim/encounters.test.mjs:872` (“Sources: foundations/invariants.md:165, :309; decisions.md:450 (D-22)”) has the same line-number fault as the one fixed at 481; not in the task's list, left.
4. `ruff-source-rules` and `shellcheck-source-rules` have not run on this computer (tools missing); the orchestrator's gate run will say.
