FAIL 0fba2b31a20e60004ae27de85c428d89b3dea58d

# Review of the whole change — teksty-rozjechane-z-kodem

Range `2fe922c..0fba2b3`. `git rev-parse HEAD` shows `0fba2b31a20e60004ae27de85c428d89b3dea58d`. `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` both show `e3825a82386a61930a86f8517fc0c5f422fc2833`. I changed no tracked file and made no commit; the worktree stayed clean (`git status --short` empty). Focused checks ran in a scratch copy of `HEAD` outside the worktree.

Summary: 1 blocking (Important), 0 Critical, 17 Minor (14 within the task, 3 outside it). Item 22 is open on purpose and judged below, not graded as a defect.

## Blocking findings

### I1. D-252 and the rule "Recording a failure" say the failure of `measure-passwords` "gets no JSON line", while the unchanged code prints a one-line JSON object on failure. Important, within the task (item 37, settlement row 1).

Comes from two slices: the foundation entries, group 1 (commit `6c31f59`, D-252), and Slice 10 (commit `4e4ac09`, `guidelines/coding.md`). It spans both; the fix is one phrase in each.

- Place, D-252 binding paragraph (`foundations/decisions.md:5125-5133`): "… is no log line, and where the command works on no value of a player's … its failure keeps the error's text there and gets no JSON line."
- Place, D-252 *Verification* (`:5152`): *violates* "a JSON line of failure written by `account-database-check` or `measure-passwords`"; and `guidelines/coding.md:132-136`: "awaria zostaje z treścią błędu i bez wiersza JSON".
- What is wrong. `src/server/measure-passwords.ts:343-345` (`finish`: `console.log(JSON.stringify(result))`) and `:376-388` print, on failure, `{"ok":false,"versions":…,"errors":[message]}`: one JSON object on one line. The code stays, as item 37 says ("kod obu poleceń się nie zmienia"). So the binding sentence, read as written, says the unchanged command does what it must not. The entry's own *complies* line calls that output "the error's text in its report for the script that ran it", so the intended meaning is "no failure line in the log form of D-252" (the `writeFailure` form with `kind`, `code` and `place`, `src/server/log-line.ts`). Answer 7 of the task keeps that qualifier ("bez wiersza awarii JSON"); the binding sentence, the guideline and the *violates* example dropped or blurred it.
- Why it matters. This task exists to remove text that disagrees with code. An agent that changes `measure-passwords.ts` and compares the change with the *violates* example, or a reviewer who reads "gets no JSON line", has a literal reason to flag the command's present, intended output. WAY-263 grades an entry that restates its source more broadly or without a qualification, and a file doing what the entry forbids, as Important.
- Evidence: the two code places above; `git diff 2fe922c..0fba2b3 -- foundations/decisions.md` hunks at `@@ -5125` and `@@ -5139`; `guidelines/coding.md` diff hunk at `@@ -129`.
- Fix (author's wording): say "no failure line in the form of the other lines of the log" (or "no `writeFailure` line") in the three places, so that the report of `measure-passwords` is plainly not it.

Note on grading: the Slice 1 reviewer graded the D-252 half of this as Minor M1 because the *complies* example resolves it. I grade it by what the sentence says, since the binding sentence is what an agent compares first.

## Minor findings

Marked "within" when the place is a text this change wrote or changed and the finding bears on an item of the task; "outside" when it bears on something the task does not name. The cycle can cut the "within" ones into the fix.

Slice-review findings I was asked to grade:

1. (within) Slice 1 M1, second half. D-252 binding sentence and `guidelines/coding.md:134-135`: "as these two do on a temporary database and made-up passwords" / "Oba działają na tymczasowej bazie i sztucznych hasłach". `account-database-check.ts:49` opens a temporary database and uses a made-up password hash (`:22` `"release-check-hash"`); `measure-passwords.ts` opens no database and uses synthetic passwords (`:68`, `:252`). True of the pair together, false of each. The sentence is from the task's own answer 7, so the cause is the task's wording, but the guideline states it as a fact about each command. Suggest: "neither works on a value of a player's: one on a temporary database, the other on made-up passwords".
2. (within) Slice 1 M2. D-252 now answers for the readiness line, `account-database-check` and `measure-passwords` the question D-354 answers for `account-block` and `account-backup`, with the opposite consequence for the JSON line, and neither names the other (WAY-19). No contradiction (D-354 names a closed list). A one-clause pointer in D-252 would stop a later reader from merging them.
3. (within) Slice 1 M3. D-183 *Rejected* (`foundations/decisions.md:3364`): "an exception for tasks 14 and 18". Faithful to `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` line 59 (I read it: "wyjątek dla zadań 14 i 18"), but the task numbers belong to a plan the foundation does not hold, so a later reader cannot resolve them. Say what the exception was for or drop the clause.
4. (within) Slice 1 M4. D-147 and D-185 *Rejected*: the way "above discovery" was deleted, not reworded. Defensible, because no source keeps a reason that survives; the cost is that the record no longer shows the human weighed it, and the human sees a deleted line at the merge. Nothing to fix unless the human wants the way kept with a reason.
5. (within) Slice 1 M5. D-01 *Based on*: "… All Respondents chart, total — "11,141"". The page holds "11,141" after the chart rows without a label (the Slice 1 reviewer's finding; I did not re-fetch this page). "Total" is an inference. Say "the figure under the chart".
6. (within) Slice 1 M6. D-111 *Rationale* (`:2024`): "so the password is empty when what it decodes to is, not only when the file has no byte". Fidelity holds (`configuration.ts:130-133`); wording only: "when what the file decodes to is empty".
7. (within) Slice 1 fix review, the `catch-up` glossary sentence (`foundations/glossary.md:225`): "the computing, after each load of a saved game state and after a sign-in to the same account with the unsaved game state kept in the page's memory, of the game minutes that passed since the save time". It says what D-247 says (checked against D-247 and D-211); the verb is a long way from its subject. Reads heavily, no wrong reading found.
8. (outside) Slice 4 review: the trust-boundary row for `src/server/` in `guidelines/testing.md` does not name the startup refusal of the mail password file. The case that guards it carries `invariant: account-startup-configuration` (`tests/startup.test.mjs:392`), so the boundary is covered; the row is a wording matter no item names.
9. (outside) Slice 4 review: a file of two byte-order marks decodes to the single character U+FEFF and is accepted. I ran it: `bom+bom` is accepted, `bom+x` accepted with the mark dropped, `bom` and `bom+newline` refused. This is unchanged from the base and D-111 ("decodes to a nonempty password with no control character") allows it, because U+FEFF is a format character. Whether to refuse it is the human's decision.

Findings of my own:

10. (within) `README.md:23-28`. The line before the list still says "Sam serwer uruchamiają dwa polecenia", while the list now has four points, two of which (the source of the sprites, `kitchen-sink` copies no sprites) are not commands. The split is what item 3 asked for; the lead-in sentence now fits it badly. All eight sprite files of `assets/sprites/` are named in point 2, so "Grafiki z `assets/sprites/` pochodzą z paczki" is true.
11. (within) `guidelines/testing.md:338` and `:350`. The unit recipe now says "bez `tests/view/page-document.test.mjs`, który uruchamia procesy (integration test)", but `tests/view/memory-limit.test.mjs` also runs child processes, is already in the integration *Files* line, and stays covered by the unit line's directory `tests/view/`. Slice 9 saw this and left it because item 10 names only page-document. The ambiguity that item 10 removes for one file now stands out for the other. Partly outside item 10 as written.
12. (within) `guidelines/coding-browser-module.md`, example "Ekran w Reactcie: Postać": "`branchText` z `character-skills.ts` … są czystymi funkcjami; nic nie rysują, więc ekran może je importować (D-265)". The file is now `copy`; the sentence is still true, but D-265 is cited for the case of a `do not copy` file. Slice 10 saw this and left it. Cite the purity, not the status.
13. (within) `guidelines/coding-account-policy.md`: the *Bad* line of the rule still says "po haszowaniu" while the new *Good* says the work of the password is checking at login and hashing at registration. True at registration and loosely at login; left by Slice 10 on purpose.
14. (within) `guidelines/coding-mail-sending.md` and `guidelines/coding.md`: the new `coding.md` paragraph repeats "tymczasowej bazie i sztucznych hasłach" in a second place (see 1); one fix there covers both.
15. (within) `foundations/decisions.md` D-02 *Based on*: the Node.js page is cited at `nodejs.org/docs/latest-v24.x/api/http.html`, "as served for Node.js v24.22.2". I fetched both addresses: the quoted passage is present at the moving address (it names v24.22.2) and at the frozen `nodejs.org/download/release/v24.21.0/docs/api/http.html`. The decision template does not require an edition address for a decision's source (that rule is in the environment-fact template), so this is only a weakness: the moving address will say something else one day. The frozen address already carries the passage.
16. (within) `foundations/decisions.md` D-237 *complies*: "a build of the same commit that takes the step from its cache" is wider than the row's wording (item 34 asks for the *Rationale* sentence only). It follows from the row and is correct against `Dockerfile` (`ARG LOOP2_COMMIT` at line 16 comes before `RUN node dist/server/account-database-check.js` at line 30, as the Slice 1 reviewer found). The writer should have said so in the report; no change needed.
17. (outside) D-247 and the invariant `catch-up-minutes` still speak of "a load of a saved game state" for the case of the state kept in the page's memory; item 32 names only D-04 and D-213. D-247 does distinguish the case ("with the state kept in the page's memory (D-211)"), so the effect is small.

(Counting: 1 to 7 and 10 to 16 are within the task, 8, 9 and 17 are outside it: 14 within, 3 outside.)

## Declined to judge

- Item 22 (the four host facts) has no change in the range, on purpose; judged below as a stop, not as a defect.
- A test that pins the floor `24.15.0` (a change of the range to `^24.0.0` passes every current check): the task does not ask for one.
- A sentence in the README that gives the reason for the floor (the pinned npm and jsdom declare it): optional in the plan. I confirmed in `package-lock.json` that `node_modules/jsdom` and `node_modules/npm` declare `^22.22.2 || ^24.15.0 || >=26.0.0` through the Slice 1 reviewer's lines; I did not repeat the read.
- D-165 and other entries use "place on the list" for the list of programs; item 26 names D-54 and D-56 only.
- D-185 "changes the accepted placement below the status": item 41 names only "above discovery".
- `docs/task-cycles/**` and the vault files that D-252 and D-48 cite as *Origin* were not checked for existence by me beyond `git show` of the commits named below.

## The task, item by item (42 items, 7 questions, 2 settlement rows)

Met, with the evidence I checked myself:

- 1 (Q1): `README.md:5`, `package.json:7`, `package-lock.json:39` are `^24.15.0`; the lockfile diff is one line. `scripts/test.py` of the invariant `account-server-runtime` passes (scratch run, see Checks).
- 2: `README.md:78` says "ze stopką", "ekran Przejście", names no tile panel, has a predicate. Checked against `run-screen.tsx:1-12`, `run-header.tsx:1-12` and `right-area.tsx:1-5, 34-35` (tabs "Kronika" and "Teren" under the drawing, the program on the right).
- 3: `README.md:25-28`: the Anokolisa sentence stands once, three matters in three points (see Minor 10).
- 4, 5: `kitchen-sink.ts` takes `iconPlaces`, `ICON_SQUARE` and `TILE_SIZE` from `terrain-picture.ts`; the old arithmetic is gone. `ICON_SQUARE = 1.4` times the tile size gives the 33.6 the game's `iconBox` had (`size * 1.4`) and the page's old `0.7 * 24 * 2`, so the game's output is unchanged (the existing 12 cases pass, and a game case would fail otherwise). The new case "two, four and five icons on a tile are placed as the rule says" has numbers written from the rule (I recomputed them: box 12 at 100,50; two icons side 6 at x 94 and 100, y 47; four icons rows y 44 and 50; five icons side 4, rows y 44, 48, 52, the fifth at x 98) and passes. The note under "Wyczerpane" now matches `finishGathering` and `dimmed` (Slice 3 report; `run.ts` read there). `terrain-picture.ts` imports only `.ts` modules (D-269); the build invariant of the page passes.
- 6, 7: `src/browser/AGENTS.md:5, 9`. The class sentence is narrowed to "a class that an element of the kitchen-sink page needs for its own samples". I judge the narrowing right: the page also uses `.button` and `.select-list`, whose base rules are in `styles.css`, and `kitchen-sink.css` is read after `styles.css`. Literal item 6 would have been wrong for those. The sentence on token values now covers a changed value, as the styleguide rule "Every value with its source" ("Nowa albo zmieniona wartość dostaje wpis swojego źródła") does.
- 8: the docstring names the case; it exists under exactly that name at `tests/view/scene-picture.test.mjs:451` and carries `invariant: loop2-container-sprites`. The case checks that the names the scene's data holds stand in `assets/sprites/` as `.png`; the docstring says it "ties the files the drawing asks for to these files". Close enough; the executor's concern (data names against files) is fair but not a defect.
- 9, 10: `scripts/test.py:11` holds `NODE_TESTS` patterns only; `page-document.test.mjs` calls `spawnSync` at `:4` and `:88`. Edits at `testing.md:316, 338, 350` (see Minor 11).
- 11, 12, 13: checked against `account-mail.ts` (Slice 10 report lines 184, 186), and `account-routes.ts:732, 740, 802, 818, 825` (five releases; `:810` is `fail()`, not a release). The list in `coding-account-policy.md` names exactly the five cases.
- 14: both files are pure (`email-status.ts` imports only a type; `character-skills.ts` imports `sim` modules, no `document.` or `createElement`). The status `copy` is the one the table gives other pure modules; the template allows `exemplar`, `copy` or `do not copy`.
- 15 to 20: the five React forms are named, the text field is said not to depart; `--bar-width` source matches the comment at `src/browser/tokens.css:73` word for word in substance (date 2026-11-02, task "przyciski-i-zakladki", To do 7); "(D-40, D-331)" with D-331 added to the *Decision* line (D-331 is the only decision that names how the picked program looks on the list; D-280 speaks of screens); the editor paragraph names `rule-winning`, `rule-running` and the bar; the *Bad* line no longer describes the page; the pair of the bar fill and its track is named. D-39 asks 3:1 for the fill on a track in `highlight` (read whole), `positive` has 4.5:1 on `highlight` by the first bullet of the same rule, and the Slice 11 report computed 6.02 from the token values. No role, pair or threshold is added.
- 21: 28 quoted passages in D-01, D-02 and D-05. The Slice 1 reviewer fetched them. I re-checked the D-02 Node.js passage (present, see Minor 15), the WHATWG passages and the Docker passage myself.
- 22: not done; see below.
- 23: both copies of the skill are byte-identical (`cmp`), gain the same two commands, and `tests/agent_workflow/test_loop2_deploy_skill.py` passes in the scratch copy.
- 24 to 28: D-48 *Origin* names the spec at `b0c4d44` (the Slice 1 reviewer confirmed Decision 1 there); D-54 *Rejected* is `unknown` with the *violates* example kept; "place on the list" no longer stands for characters in D-54 or D-56; D-56 gives 1 to the first character (`game.ts` sets `nextCharacterId: 1`, checked by the Slice 1 reviewer); D-67 *complies* says "missing two sticks of its starting stock since game minute 45", consistent with the binding sentence (renewal at multiples of 30 from minute 0: 60 and 90).
- 29 (Q3, row 2): `configuration.ts:133` adds `password === ""`. My crafted-input run, below, shows every case behaves as D-111 now says. D-111 binding sentence, *Rationale* and *Rejected* match Q3 (B is the text-only way; the entry words it as "refusing a password file only at zero bytes", which is the shape of the old code and what B would have left in force; acceptable).
- 30, 31, 32, 33, 35: wording as asked. D-183 is faithful to `git show 1b09f80:…/task.md:59` (Minor 3). D-04 and D-213 use D-211's own name ("the unsaved game state"). No `resurrect` for a session or counter is left in `tests`, `src`, `foundations` or `guidelines` (`grep -w`). D-207: 24 × 3600 / 30 = 2880.
- 34, 38: the Docker passage "Build arguments do result in cache invalidation." is in `invalidation.md` under "Build secrets" at the pinned commit (I fetched it; line 97). The three WHATWG passages are in § 8.1.5.1 at the frozen snapshot `a0442320…` (I fetched it, status 200, all three found). The repository holds no import map (`grep -rIl importmap src scripts` is empty). D-269 *Based on* now names the new fact.
- 36: the glossary sentence says what D-247 says; the Slice 1 fix is in (Minor 7).
- 37, row 1: see I1. The settlement is recorded; the wording has the defect above. `coding.md` says what D-252 says, with the same defect.
- 39, 40, 41, 42: D-313 *Rejected* lost its last variant; the *Rationale* reason is the combination of `report-slice-3.md` choice 3 and `report-review-return.md` r3 of the cycle record at `2aae30a` (the Slice 1 reviewer checked; I confirmed `2aae30a` is a commit and that `cycle.md` lines 130 and 228-232 carry the Q7 and Q9 rows that point to those reports). D-147 and D-185 lost the "above discovery" way (Minor 4). D-312 lists the third way.
- Questions 1 to 7: carried as follows: Q1 in item 1; Q2 in Slice 7 (item 23), with item 22 stopped; Q3 in D-111 and Slice 4; Q4 in D-101 and Slice 5; Q5 in D-207; Q6 in `catch-up` (the answer holds: the glossary entry was written by the earning-loop task, not by the approved MVP2 definition); Q7 in D-252 and `coding.md`.
- Settlement row 1: D-252 (I1). Settlement row 2: D-111.
- Out of scope: other `Rejected: unknown` untouched except D-183 (D-54 became `unknown` by item 25, as the task asks).

Coverage table of the plan: every row of the table matches a commit of the range, except item 22 (Slice 8, no commit). No row names a file the change did not touch. The plan's *Choices* hold: the foundation corrections went through entries, not a slice with `decisions.md` in *Change*.

## Item 22 and the added commands of Slice 7

The stop of Slice 8 is right. The environment-fact template (`.the-way/elements/environment-facts/template.md`, "Source") requires for a reading "the command run, the host it ran on and the tool with its version". `slice-8-report.md` shows that none of the allowed commands prints a version (`stat`, `grep`, `docker ps`, `free`), and the earlier versions (`GNU coreutils 8.32`, `Docker 28.1.1`, …) are from the 2026-10-13 run and would be from memory. Writing the facts without versions breaks the template; adding `--version` reads widens what the human settled in Q2 (the human's answer added two commands, not four). The four facts stay in the old `observed:` form, which `foundation_check.py` accepts (0 errors). The cycle's route (open the request blocked for the human's decision) is the right one. One thing for that decision: the new count command names the account only as "the account's own", while the fact `loop2-host-forced-command-entry` says "the test server's authorized_keys"; Slice 8's draft notes the same gap (no `whoami` is allowed). Resolve it together with the version question.

The two added commands are safe. `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` prints metadata of one fixed path. `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys` prints one integer and no line, so it cannot show a key; the skill adds "the count only, never a line or a key". Neither writes, so D-12 (reads only, changes nothing; *violates* "edits `authorized_keys`") holds. Slice 8 ran both once: `755 root:root` and `1`. The allowance is by agreement and not tied to the pattern, which D-12's rationale already says of the whole list.

## Trust boundaries (step 4 answers)

`src/server/configuration.ts` (account-server) and `package-lock.json` (build-tools).

Crafted password files, run against the real code in the scratch copy (`node --test tests/startup.test.mjs`, 42 tests passing together with two other files) and, for the decoding, against the same `TextDecoder` and `\p{Cc}` test the code uses:

| File | Result |
|---|---|
| zero bytes | refused (existing `length === 0`) |
| only EF BB BF | refused (new; in the invalid list of the case at `tests/startup.test.mjs:400`) |
| EF BB BF 0A | refused (control character; `:401`) |
| EF BB BF and text | accepted, mark dropped; asserted at `:431-437` |
| 1024 bytes | accepted (`:426-429`) |
| 1025 bytes | refused (`:399`) |
| EF BB BF EF BB BF | accepted as one U+FEFF (unchanged from base; Minor 9) |

The refusal still goes through `invalid("LOOP2_SMTP_PASSWORD_FILE", error)`, which names the setting and not the file's content; the existing assertion that stderr does not echo the secret still passes. The test fails without the change: the Slice 4 reviewer ran the head test against the base `configuration.ts` and got 1 failure at "Missing expected rejection"; I did not repeat that run. `package-lock.json`: the diff is one `engines.node` line of the root entry, no `resolved`, `integrity` or version line.

Changed invariant tests named: `tests/startup.test.mjs`, the case "the SMTP password file must be a small non-empty UTF-8 regular file without control characters and is refused without echoing its contents" (invariant `account-startup-configuration`; fixtures and one acceptance check added); `tests/invariants/test_loop2_container_sprites.py` (invariant `loop2-container-sprites`; docstring only, no code). `tests/http.test.mjs:669` (a comment of the D-101 case) and `tests/sim/program-counts.test.mjs:258` (a test name) changed by one word each.

Irreversible operation: none in the range. Reserved choices: none settled (the range for Node is a version floor inside the settled line 24; no language, framework, library, store, login or place to run is chosen).

## Slices that had no review of their own

Judged as a slice, each report's own-work check included:

- Slice 2 (README): every claim is mapped to a file in the report and I re-read the screen files; the own-work check (predicate caught and fixed before return) is sound. Minor 10 only.
- Slice 3: see 4 and 5 above; test first, red then green recorded; the screenshot lives in the ignored `.runs/` (no screenshot file in the range: `git diff --stat` lists none). Own-work check admits that no test catches a return of `0.7`; the existing rule "Not tested on purpose" covers the look of whole screens, and the new case pins the shared function.
- Slice 5: only a comment and a test name change; my `grep -w` finds no other use.
- Slice 6: docstring only; compiles (the Python file imports; the quality test needs `.runs/quality-venv`, which I did not run).
- Slice 7: see above.
- Slice 8: stop judged right.
- Slice 9: Minor 11. The executor's checks (`foundation_check`, `test_node_test_selection.py`, `git diff --check`) do not test prose; I read the lines against `scripts/test.py` and the test file.
- Slice 10: the five corrections checked against code as in the table above; I1 and Minors 12 to 14. Its "reset" wording for the overtaking login (`account-routes.ts:814-816`, "set-by-link") is the code comment's; fine.
- Slice 11: own-work check is sound (it ran the token values through the invariant's own function). The `--bar-width` source line reproduces the comment of the token file and invents nothing.
- Slice 12: the narrowing of item 6 is justified (above); each new sentence rests on the named styleguide sentence.

Concerns of the executors passed on to me, one by one:

- Slice 6, "the files the drawing asks for": judged above, not a defect.
- Slice 10, the example citing D-265: Minor 12. "Po haszowaniu" in *Bad*: Minor 13. The repeated "tymczasowej bazie": Minor 14 and 1.
- Slice 12, the narrowed class sentence: right.
- Slice 9, `memory-limit.test.mjs`: Minor 11.
- Slice 3, `ICON_SQUARE` as 1.4 times the tile size: right; a pixel constant would not follow a caller's `size`, and the game's `terrainPicture` takes one.
- Foundation group 1: D-313 *Rationale* worded from `report-slice-3.md` and r3, checked by the Slice 1 reviewer and consistent with the `cycle.md` rows I read; D-147 and D-185 dropped, not `unknown` (Minor 4); D-185 "below the status" is outside item 41; D-247 and the invariant still say "saved" (Minor 17).
- Foundation group 2: D-02 address (Minor 15); D-237 *complies* (Minor 16).

## Checks run

| Command or method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | `0fba2b31…`; `e3825a82…` twice |
| `python -B .the-way/elements/common/foundation_check.py` (worktree) | 0 | `0 errors` |
| `git diff --check 2fe922c..0fba2b3` | 0 | no output |
| `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` | 0 | identical |
| Scratch copy of `HEAD` (`git archive` plus `.the-way` and `node_modules`, a `git init` there): `node scripts/build.mjs` | 0 | built |
| Scratch: `node --test tests/startup.test.mjs tests/view/terrain-picture.test.mjs tests/sim/program-counts.test.mjs` | 0 | 42 tests, 42 pass, including the BOM fixtures and the new placement case |
| Scratch: `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| Scratch: `python -B scripts/test.py tests/invariants/test_application_build_kitchen_sink.py` | 0 | 3 tests OK |
| Scratch: `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` | 0 | 10 tests OK |
| Scratch: `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `node -e` with the code's own `TextDecoder("utf-8", {fatal: true})` and `/\p{Cc}/u` on five files | 0 | refused/accepted as in the table above |
| `curl` of `invalidation.md` at the pinned commit; search for the quoted sentence | 0 | line 97, under "Build secrets" |
| `curl` of the WHATWG snapshot `a0442320…`; three passages tested with markup stripped | 0 | all three found |
| `curl` of the Node.js `latest-v24.x` and `v24.21.0` http pages; D-02 passage tested | 0 | found in both; the first names v24.22.2 |
| `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` (line 59); `git show 2aae30a:docs/task-cycles/ekran-przejscia/cycle.md` (lines 128-132, 228-232) | 0 | as described above |
| `grep` for `resurrect`, `importmap`, `authorized_keys`, `byte-order`, `cache`, `saved game state` over the repository | 0 | as described above |

Not run, with the reason: `npm test` (the orchestrator's gate); `python -B scripts/audit_dependencies.py` (needs the npm registry; I rely on the Slice 1 reviewer's run, exit 0, and on the one-line lockfile diff, which I checked); `tests/quality/test_quality_invariants.py` and `tests/invariants/test_design_token_contrast.py` (I rely on the reports); the Docker-based invariant `test_loop2_container_sprites.py` (no Docker; the change is a docstring); a browser look at the kitchen-sink page (Slice 3's screenshot is in the ignored `.runs/screenshots/`; I did not take one); the base-versus-head red run of the BOM case (the Slice 4 reviewer ran it).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, `.the-way/elements/environment-facts/template.md`, `.the-way/product-guidelines/coding/template.md` (the *Status* column): to judge the entries and guideline rows the change writes against their templates (SKILL section 2).
- `foundations/decisions.md` D-12, D-39, D-40, D-55 (only what follows D-54), D-211, D-247, D-280, D-281, D-312, D-330, D-331, D-354: neighbours or citations of the entries changed; read to judge restatement (WAY-263), the citation of D-331 in the styleguide and the access limit for the new skill commands.
- `src/server/account-routes.ts:710-835`, `src/server/measure-passwords.ts:336-395`, `src/server/account-database-check.ts:20-100`, `src/server/log-line.ts` (head), `src/browser/view/run-screen.tsx`, `run-header.tsx`, `right-area.tsx`, `src/browser/view/controls/react-button.tsx` (head): code facts that the entries and guidelines quote.
- `docs/task-cycles/teksty-rozjechane-z-kodem/reports/` — the slice reports, `slice-1-review.md`, `slice-1-fix-review.md`, `slice-4-review.md` (named by the handoff).
- `assets/sprites/`, `src/browser/tokens.css:60-90`, `package.json`, `scripts/test.py`, `tests/view/scene-picture.test.mjs:445-470`, `tests/startup.test.mjs:380-440`: facts the README, the styleguide and the tests quote.

## Unread material

Decisions of my own selection. The parts touched are browser-view, simulation (D-54, D-56, D-67, D-207, D-183), account-server, build-tools, deployment, agent-workflow and the foundation files. The log is far larger than one review can read whole; I did not run through the titles of the whole selection and I say so.

- Read whole: 20 decisions: D-12, D-39, D-40, D-54, D-56, D-67, D-111, D-183, D-211, D-237, D-247, D-252, D-269, D-280, D-281, D-312, D-313, D-330, D-331, D-354.
- Read by title only: 0 as a screening; instead, 12 decisions read by the hunks the change touches and the lines around them, not whole: D-01, D-02, D-04, D-05, D-48, D-101, D-147, D-156, D-185, D-207, D-213, and D-253 (heading only).
- Decisions that bear on the change and stayed unread whole: D-14, D-16, D-17 and D-231 (rest on the four host facts of item 22, which are unchanged); D-33 (the lockfile and audit rule); D-13 and D-153 (read by the Slice 4 reviewer); D-36, D-102, D-103, D-116, D-158, D-226, D-227 (the rules behind the coding guidelines of Slice 10; I read the guideline text and the code, not these entries); D-81, D-83, D-264, D-268 (levels of the testing guidelines); D-265, D-308, D-309, D-349 (styleguide, browser module). I did not find in the hunks any sentence that contradicts them.
- Invariants read whole: `account-startup-configuration`, `catch-up-minutes`. Not read whole: `account-server-runtime`, `introduced-npm-vulnerabilities`, `dependency-audit-refusal`, `document-test-memory-limit`, `design-token-contrast`, `design-token-sources`, `application-build-kitchen-sink`, `loop2-container-sprites`, `node-selection`/`node-test-selection`. I ran the tests of three of them.
- Part-map entries read whole: browser-view, account-server, build-tools, agent-workflow, deployment (the long description lines of account-server and build-tools read whole; the lists of files read whole). `simulation` and `product-foundation` entries not read.
- Glossary: `catch-up` and `save time` (heading only for `save time`) read; `resurrection`, `unit test`, `integration test` not opened.
- Guideline files read whole: `guidelines/coding-browser-module.md` (the table and rules; the examples after line 200 read to the end of the kitchen-sink example). Read through the diff and its surrounding lines only: `guidelines/coding.md` (the rule "Recording a failure"), `guidelines/coding-account-policy.md`, `guidelines/coding-mail-sending.md`, `guidelines/testing.md` (lines 305-355), `guidelines/styleguide-browser-view.md` (hunks and the lines around them, including the contrast rule and the lists of controls). I did not read these four whole, as `reading.md` asks of a guideline file; the findings on them rest on the hunks and the code they quote.
- Task and plan: both read whole. Slice reports: 2, 3, 8, 9, 10, 11, 12 read; 5, 6, 7 read only as far as needed (their changes are one word each and I checked the diff); `foundation-1-report.md` and `foundation-2-report.md` not read (the Slice 1 reviewer's table covers them and I checked the entries against sources).
- Sources I did not open: the State of JS, Go, Bun, Deno, Express, Caddy, Fastify and Docker-docs pages of D-01, D-02 and D-05 (the Slice 1 reviewer fetched all 14 pages and found 28 strings; I re-checked three sources).

## Searches not found or unclear

- A command in the list "Allowed" of the deploy skill that prints a tool version: none exists (item 22).
- Which task document is "przyciski-i-zakladki" (To do 7): not in the repository; the styleguide takes the name from the comment at `--bar-width`, which is what the source gives (Slice 11 report).
- The unlabelled "11,141" of the State of JS page (Minor 5): unclear what it counts.
- Whether `measure-passwords` and the readiness line are named in an invariant test that would flag a JSON failure line: not searched beyond `grep` of D-252 and the guideline; I1 does not depend on it.
- Nothing else looked for and not found.
