# Report — fix of the review of the whole change, part 1 (D-03 to D-149)

**Status:** done with concerns (one finding part not fixable within the assignment, see D-89 below).

- Base: `b1af8dd4fee111444c5157992a53874211645462` (worktree clean at start).
- Commit: `03541eae` on `task/martwe-odsylacze-origin` (not pushed). One file changed: `foundations/decisions.md` (44 insertions, 48 deletions). Only *Rationale* and *Rejected* lines of D-03, D-04, D-07, D-40, D-51, D-52, D-54, D-55, D-62, D-76, D-80, D-83, D-85, D-118, D-120, D-122, D-124, D-132, D-133, D-136, D-138, D-140, D-147.
- Skill: I did the steps of `the-way-record-decision` (reading the template and the rules, deciding that each entry is a change of an existing one, drafting from the source note or the head, writing with the editor tool, the check), with no binding sentence, *Verification*, *Relations* or *Origin* line changed.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0, "0 errors".
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0, "444 files, 0 listed".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'` -> exit 1 (no line at all, not even D-48's).
- Gate not run. No focused test applies (prose only).

## Per finding

**I-1 (pointers by description)**
- D-04 *Rejected*: "so the approved sentence of D-147 that it stands…" -> "so the sentence of D-147 that it stands…". Checked: D-147's binding sentence says exactly that.
- D-40 *Rejected*: "a line at a text is part of that text, and the change would add another departure from the entries approved before it" -> "a line at a text is part of that text". The dropped clause was only the process cost (the note: "D-40 dołącza do rozjazdu z definicją, plan dostaje kolejny wpis").
- D-76 *Rejected*: "a refusal test in tasks that change no principle, against the human's answer that they bring no test files, and a change of the project's plan" -> "a refusal test in tasks that change no principle of the boundary". The note's other two costs were wholly process.
- D-147 *Rejected*: "a limit on the entries makes untrue the sentence on the chronicle" -> "a limit on the entries, the oldest dropped, would make untrue the sentence of D-338 that a manual map run keeps a chronicle of what happened in it". D-338's binding sentence read at the head.

**Minor 8 (D-132, D-147 history).** D-132: "when the choice was made the end had no place of its own, and the player would have read nowhere why the map run ended" -> "while the ended map run stands on the screen, the player reads nowhere why it ended" (the wording `main` had before the branch, which has no history). D-147: "while the end had no place of its own the first left the player nowhere…" -> "the first leaves the player nowhere to read why the map run ended while the ended map run stands on the screen". Also D-147 *Rationale* regains the estimate: "an agent's estimate gives 50 to 60 bytes an entry and several hundred entries in a long map run" (Minor 30, D-147 part; same words as D-04 already has).

**Minor 9 (D-62, D-132 "does not cover the whole screen").** Held right. D-370 at the head says the window "covers the whole screen" and, in its accepted cost, "does not cover the whole page as the end of the old Loop does". D-62 and D-132 now say "whole page". (D-368, which also has the phrase, is in part 3.)

**Minor 12 (D-122 "the game had when the choice was made").** Removed together with the "no cost was kept" narration: the pair of ways now reads "„ (pauza)” after the bar of the solving condition instead of after the clock; no „ (pauza)” at all, the pause shown by „Wznów” alone — the textual mark of the pause would be gone" (the note keeps this cost for the second way only, and `teraz_i_potem_loop2.md` Q5 says p2 keeps a mark after the bar, so I did not give it to both).

**Minor 14 (D-122 lacks a cost).** Added to "Accepted with it": "the real time passed in the same call beyond the game minute of a discovery moves the map run by no game minute". Checked against invariant `player-map-run-pace` at the head and the discovery note Q3 ("reszta czasu realnego … przepada").

**Minor 30**
- D-80: "The price is named:" -> "Accepted with it:"; "no settled place where it is written" replaced by "an agreed expectation stands in the foundation (D-82). The decision rests on the intended balance having had no settled source when it was decided" (the note's "nie wiem, nie myślałem o tym" is dated 2026-10-25; D-82 at the head says the foundation holds the expectation).
- D-83: "names some test files one by one and otherwise selects only some of the test directories" -> "selects only some of the test directories". Checked: `scripts/test.py:11` has three patterns, `package.json` runs `python -B scripts/test.py`.
- D-85: "more tests to the task" -> "more tests to adopting the guidelines" (the wording D-74 and D-75 use); "Existing cases were chosen after comparing the existing tests and their helpers" -> "The selection takes existing cases".
- D-89: **not changed.** The finding is that `guidelines/testing.md` (the "Not tested on purpose" list, first bullet) cites the pass-through category as (D-73) while its reasoning stands in D-89. D-89 is where the reasoning belongs and already holds it; the fix is the citation in the guideline file, which is part 5's file. Recommend part 5 changes that bullet's "(D-73)" to "(D-73, D-89)".
- D-120: the editor's offer now cites its rule: "… and outside a map run does not (D-196)". D-196 read whole.
- D-122, D-133: "no cost was kept" removed (see Minor 12). D-133's *Rejected* now reads "the mark of the pause after the bar of the condition; no mark, the pause shown by „Wznów” alone — the textual mark of the pause would be gone".
- D-124: "through the first game minutes of a new game" -> "…, 84 of them on Las, which take 84 seconds at 1×, …". Checked: D-121/D-124 *Verification* put the first chill of Las at game minute 84, the code comment in `tests/sim` agrees, 1 game minute is 1 second at 1×.
- D-136: added "A solved map can be a place of work, and the chain of maps branches rather than running in one line." (the concept passage D17 extended by D27, D28; D-136's own text, "the map its data names as its opener", does not contradict it).
- D-138: added to *Rationale* "the choice rests on one account server serving the game and on the session checks in SQLite being no measured bottleneck" (the "Review when" of the projected entry in the definition).
- D-140: "Rozbłysk" and "Iskra" are loop's (the concept; `Iskra` is in the old game's balance data, neither is in `src/` or in the foundation) -> "the mage's Rozbłysk of loop"; "it skirted" -> "it would skirt … and leave it whole to the hunter"; the eleven-fold cost of a minute with a long chronicle -> "as measured in loop"; "Accepted with it: in loop, the game this one follows, the creature striking first made every map with an attack harder, and a deeper forest was solved markedly less often".
- D-118: "putting out a fire saves a forest" -> "putting out a forest fire, which the game does not have today, would save a forest". Checked: no forest fire in `src/` or the foundation (only campfires).
- D-147: see Minor 8.

**Minor 31 (D-03, D-04)**
- D-03 *Rationale*: "the two checks … read only the file types they list" -> "the check that guards against values written in place of tokens read, when this was chosen, only the file types it listed, so it had to be widened to the file type of the new screens, or a colour written in a component would pass unseen". Checked at the head: `tests/invariants/test_content_identifiers.py:46` and `tests/invariants/test_browser_view_token_values.py:80` both list `.tsx` now; the note says only the token check lacked it.
- D-03 *Rationale*: the reason for React over Preact added: "Preact, the lighter option, which loads without a bundler through an import map, was passed over for React although React adds the bundler: the choice was not to tinker with a less-trodden way of loading." (the definition's Technology line; no person or document named).
- D-03 *Rationale*: "the screens that the project rewrites anyway" -> "the screens that are rewritten anyway".
- D-03 *Rejected*: numbers of the note's tables carried: DOM (source 10.4 KB against 4.9–7.2 KB, page 12 KB against React's 231 KB), Preact (page 28 to 29 KB), lit-html (one package to lift, last released 14 May 2026, Lit 3 almost without breaking changes, page 21 KB, moving away rewrites the screens), Svelte (compiler, plugin and checker lifted together, `.svelte` works only here, formatter unchecked), Vue (build step can be skipped without `.vue` and `<script setup>`, not measured; 3.6 beta in the registry), Angular (repository holds 6.0.2 for its tools and the trial built so; it covers layout, build and tests), Mithril (one package, 29 with esbuild and types, bundler in its examples, `3.0.0-next.102` on 2026-11-01), Inferno (one package with three dependencies), idiomorph (the text templates would have to be rewritten on a move). All are dated readings or trial measurements from the technology note (reading of 2026-11-01), not claims about the head.
- D-04 *Rationale*: "the sweep of the clock know neither" -> "the sweep over many seeds know no clock" (the note: "`tick` i przemiatanie zegara nie znają"; "przemiatanie" is the sweep over seeds, as D-24 says).
- D-04 *Rejected*: way B1 restored: "the whole chronicle in the save capped at a number of entries, the oldest dropped — the sentence of D-338 that a manual map run keeps a chronicle of what happened in it would stop being true".

**Minor 32 (D-07, D-51, D-52, D-54, D-55)**
- D-07: "The MVP accepts that cost" -> "The game accepts that cost".
- D-51, D-52, D-54, D-55: the sentence "It is a choice for the needs of the MVP, open to a change" (and D-51's longer form) dropped. The notes record the reservation as a rule of wording for the binding sentences, which they already keep; a decision binds until a change replaces it anyway.
- D-55: "The rule holds for the whole MVP … until the map runs are rebuilt around the character" -> "The rule holds also beside the earning loops, and the cost is that characters do not walk side by side in manual map runs; …" (the note's Q12 settles that the rule stays beside the earning loops, so the cost does not end).

## Own-work check
Requirement most likely not met: no sentence I wrote states something about today's product that I did not verify. Check: for each added present-tense claim I read the head (the three code facts: `scripts/test.py` patterns, the two `.tsx` lists, no forest fire/Rozbłysk in `src/`; the foundation facts: D-196, D-338, D-370, D-82, invariant `player-map-run-pace`), and dated the rest as readings of 2026-11-01 or as the premise of the choice. Result: the claims hold; `foundation_check.py` 0 errors; the private-name sweep finds nothing.

## Choices and their cost if wrong
- D-132/D-147 first way: I used the wording `main` had (no history) instead of leaving it without a reason. If the end-of-run window is held to give the player the cause anyway, the reason "reads nowhere why it ended" is weak and part 3 or the orchestrator may prefer to leave the way with no reason (D-187 precedent).
- D-03: I carried the note's secondary numbers rather than the decisive ones only; the entry is longer. If the orchestrator wants it shorter, the DOM/Preact/lit-html size figures are the first to cut.
- D-03 "what the project is judged by" (first *Rationale* sentence) not touched: not in my assignment (the finding lists it under D-288 in another part) though it reads as a project-level authority. Also not touched, outside the assigned list: D-05 "the loop2 container where the MVP runs" and D-38 "each screen of the MVP … the look of the game drifts with every task" (both in my numeric range, neither named by a finding I hold). For the orchestrator to assign or decline.

## Reaches beyond the dispatch
- `tests/invariants/test_content_identifiers.py`, `tests/invariants/test_browser_view_token_values.py`, `scripts/test.py`, `package.json`, grep of `src/` and `foundations/` for Rozbłysk/Iskra/forest fire, and `foundations/invariants.md` `player-map-run-pace`: to verify added present-tense statements at the head.
- `/tmp/main_decisions.md` (`git show origin/main:foundations/decisions.md`): to read what `main` had in D-132's "Teraz" way.
- The previous reports `review-3-5-report.md`, `review-6-8-report.md`, `review-35-report.md`, `review-merge-2-report.md`, `review-fix-3-5-report.md`, `findings-3-5.md`, `findings-35.md`: for the reviewers' exact quotes behind the Minor items.
- Snapshot notes read: `technologia_budowanie_ekranow.md` (whole), `definicja_mvp2_loop2.md` (Technology section lines), `siedziba_i_druzyna_loop2.md` (Q5, Q12, reservation lines), `koncepcja_projektowa.md` (D17, D18, D53 passages), `odkrywanie_loop2.md` (Q3 lines), `kronika_z_filtrami_loop2.md` (B1 line), `zadanie_hierarchia_przyciskow_i_karta_logowania.md` (3b), `logowanie_w_react_loop2.md` and `ekran_przejscia_loop2.md` (D-76 lines), `definicja_mvp_loop2.md` (D-138 *Review when*).

## Unread material
- `.the-way/elements/common/way_of_working.md` steps 4.2 onward (after "Show the whole entry") and `elements/common/rules.md` after line 40 were not read; `elements/decisions/examples.md` not read; the glossary and part map not read (no term or part changed).
- Decisions D-03 to D-149 other than those I changed were not read whole; the sweep for process words over the range was by grep.
- Notes read in part only, as listed above; `rozpoznanie_*`, `scena_z_ludzikiem_loop2.md` (D-40's note beyond what the review quotes) not opened.
- The two companion invariants and the full old-loop snapshot not read (only grep for Iskra/Rozbłysk).

## Searches not found or unclear
- The decisive reason for React over Preact exists only as the short line in the definition's Technology section ("zamiast kombinować"); I carried it without the person's words.
- The note's table gives lit-html "2 pakiety" in one column and "Jeden pakiet" in another (upkeep); I carried both as "two packages" and "one package is lifted".
- Whether the end-of-run window leaves a place where the cause of the end is unread is not stated by any source (see the D-132/D-147 choice above).
- `guidelines/testing.md` citing (D-73) for D-89's category: not changed (part 5's file).
