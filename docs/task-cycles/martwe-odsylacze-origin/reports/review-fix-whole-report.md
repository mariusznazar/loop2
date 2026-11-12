FAIL 31c65bfa

# Review of the fix of the review of the whole change (`review-change`, a fix)

- Range: `b1af8dd4..31c65bfa`, 7 commits (`03541eae`, `58600416`, `e6816817`, `76069f00`, `2997d338`, `06e6556e`, `31c65bfa`); `git rev-parse HEAD` = `31c65bfa388d0eeb3ad4d4becfed56069fed0ae0`, worktree clean. Read from commits (`git show`, `git diff`); the decision log of the base and the head exported to a scratch directory.
- Bounded by `reports/findings-whole.md` (I-1, I-2, I-3, Minor 1–35), as `fix.md` gives. Read: `task-cycle/review/SKILL.md` and `fix.md` whole, the findings file whole, the five part handoffs and the five part reports whole (as claims), `review-whole-handoff.md`, the task's question 1a and *Settlements to record* rows 1–3, the testing template's rule "Where the expected value comes from", the decision template's *Based on* rule.
- Result: the three blocking findings are fixed; one new Important finding lies in the fix diff (D-317, below), so the review fails.

## Findings

### Important (blocking, within the task)

**N-1 — D-317: the fix's rewritten *Rationale* and its new *Based on* state the WCAG flash threshold four times too large, and the passage quoted does not say what the sentence claims.**

- Place: `foundations/decisions.md`, D-317 *Rationale* and *Based on* (commit `58600416`, part 2, the fix of Minor 25).
- Text at the head: *Rationale* "the criterion 2.3.1 of WCAG 2.2 forbids more than three flashes a second unless the flash stays below the general flash threshold, which it estimates for a screen of 1024 × 768 pixels as a rectangle of 341 × 256, 87,296 pixels"; *Based on* quotes § General flash and red flash thresholds: "using a 341 x 256 pixel rectangle … will provide a good estimate of a 10 degree visual field".
- What is wrong: in WCAG 2.2 the 341 × 256 rectangle estimates the 10-degree visual field, not the threshold. The glossary entry (the same page, fetched for this review on 2026-11-12) puts the area condition at "the combined area of flashes occurring concurrently occupies no more than a total of .006 steradians within any 10 degree visual field … (25% of any 10 degree visual field on the screen)". So the allowed flashing area is about 21,824 px at 1024 × 768, not 87,296. The sentence now presents the larger figure as WCAG's own estimate, beside a quote that appears to back it.
- Why it matters: this is the foundation's statement of a seizure-safety criterion. An agent adding a scene effect reads D-317 for the limit. An effect of 22,000–87,000 px flashing more than three times a second would pass by this *Rationale* and fail WCAG 2.3.1. The binding sentence ("shows no flash of its whole area") and its conclusion (the scene at 204,288 px is over the threshold) stand either way.
- Origin of the defect: the figure comes from the source note (`rozpoznanie_frajda.md:199`, "chyba że błyska mniej niż 87 296 pikseli"). The base and `main` already had "unless less than 87,296 pixels flash". The fix rewrote that sentence, named WCAG as its source and quoted it, and the source contradicts it. So the citation the fix added does not say what the sentence claims; I grade it inside the fix diff.
- Fix: state the threshold as WCAG gives it, 25 % of any 10-degree field, about 21,824 px by the 341 × 256 estimate, and quote that passage of the glossary in *Based on*. Whether "no flash of its whole area" is a sufficient binding rule is a product question outside this task; it goes before the human at the request.

### Minor (new in the fix diff; do not block)

1. **D-387 *Rationale*:** "The numbers of nature energy are D-377's". D-377 holds only the regain (0.5 a game minute at satiety 60 or more). The cap and the full start of 100 are in D-176, and the price of 10 is in D-177, which the test comments of the same commit cite ("from D-387 and D-177"). This cites a decision that does not hold what is claimed. Fix: "D-176, D-177 and D-377's".
2. **D-388 *Rationale*:** "its air of 7 °C, which chills a body in 33 game minutes against 83 on Las". Its own *Verification* says "first chilled in game minute 34, against 84 on Las". 33 and 83 are the minutes the body lasts before the minute of chill (D-327's „bez ognia 33 min”), so "chills … in 33" reads off by one. Word it "lasts 33 game minutes before it is chilled, against 83". Also, the 7 °C is the old game's number too: `ognisko_i_jedzenie_loop2.md:141` has "Las — głębiej z innym zimnem (w danych loop 7 °C)". Part 4's "Searches not found" says no note gives it. D-388 claims nothing false there; it just leaves the source unused.
3. **D-387 and D-388 *Rationale*:** "tuning them later is a change of data and tests (D-18)". Now that the numbers stand in binding sentences, and the *Verification* lists other numbers as violations ("a campfire made from 5 sticks"), tuning is also a change of this decision. The accepted cost is understated against the human's reservation behind these numbers (`ognisko_i_jedzenie_loop2.md` Q9: "chciałbym uniknąć sytuacji w której decyzje będą kategorycznie zabraniać alternatyw"). D-379 has the same wording; the fix copied the pattern.
4. **Test comments cite D-387 alone for Las's cooling:** `tests/sim/acceptance.test.mjs:19`, `tests/sim/body.test.mjs:22` and `tests/sim/campfire.test.mjs:22-27` each say "from the numbers of D-387: on Las the body cools by 0.002 × (37 − 25)". The 25 °C of Las is D-388's. `tests/sim/world.test.mjs:14` and `body.test.mjs:436` cite both correctly.
5. **`guidelines/testing.md`:**
   - `:13-14`: "D-82 jest odstępstwem tylko w sprawie komentarza, który nazywa źródło wartości; pozostałe źródła oczekiwania zostają takie, jak daje je szablon". Not quite: D-82 also narrows the template's "a human's judgement", which a dated comment documents, to a judgement "once a decision of the foundation holds it".
   - `:99-100`: "Recenzent pyta przy każdym sprawdzeniu: „skąd ta wartość?”; odpowiedzią jest wpis fundamentu" sits beside `:87-88`, which admit a relation the code does not compute and a crash, whose answer is no entry. D-82's *Rationale* says it correctly: "Where a value needs a source".
   - The phrase "a human's judgement is a source once a decision of the foundation holds it" is the executor's reading, not the human's words. I hold it consistent with the human's answer to question 1a ("jeśli komentarz … ma przekazywać jakąś informację ważną dla kodu to powinien być w fundamencie"; "2+2=4"). It should still be named to the human at the request as the cycle's reading.
6. **D-132 *Rejected*:** "no „Teraz” after the end of a map run — while the ended map run stands on the screen, the player reads nowhere why it ended". D-147 has the same clause. D-132's own binding sentence titles the window with the completion text, so "nowhere" holds only once „✕” has closed the window. Wording like "on the screen, once the window is closed, nowhere" would be true. (Fix of Minor 8.)
7. **D-51, D-52, D-54, D-55:** the sentence "a choice for the needs of the MVP, open to a change" was dropped whole instead of reworded. The human's reservation that these choices are expected to change ("docelowo się zmienią", `siedziba_i_druzyna_loop2.md:25-26`) no longer stands anywhere in the entries. The binding sentences keep the agreed wording rule, so the loss is small. (Fix of Minor 32.)

### Minor findings of the findings file that remain

- **Minor 30, part:** D-298 *Rejected* ("the button standing beside every program — no cost was kept beside it") and D-306 *Rejected* ("greyed cells out of the keyboard's reach — no cost was kept beside it") still tell how the decision was reached. The finding names both. No part was assigned them: handoff 1 lists only D-122 and D-133 for this item, and parts 2 and 3 do not list them.
- **Minor 3 and 7:** not fixed in the foundation by design. Part 5's report holds a plain paragraph for each, for the request.

### Notes outside the fix diff (do not reopen the review; for the request's list)

- D-220 *Rejected*: "about ten points get a question of their own, and the success test of the first scope treats …". These are a process step and a project stage given as reasons.
- D-362 *Rejected*: "the human refused the split of the work into separate tasks". D-363 *Rationale*: "was put to the owner … and he took this way". D-368 *Rejected*: "perhaps a new question". Each tells how the decision was reached. Part 3 saw the first two and left them.
- D-10 *Rejected*: "breaks the approved separation", `main`'s text. It means D-08's separate address and could cite D-08.
- Part 2 reports unassigned "task" wording in D-208, D-265, D-267, D-268 and D-270. I did not open those entries.

## Declined to judge

- Whether D-317's binding sentence ("no flash of its whole area") meets WCAG 2.3.1 once the threshold is stated correctly. That is a product choice outside this task; the finding above only puts it before the human.
- Whether the old game's `maps.ts`, `activities.ts`, `items.ts` and `recipes.ts` hold exactly the campfire, eating and Las numbers. They are not in the snapshot; I compared against the notes that quote them and against the code.

## The blocking findings

| Finding | Result | Evidence |
|---|---|---|
| I-1 | fixed | My own scan of every *Rationale*, *Rejected* and *Origin* line of the log at `31c65bfa` (regex over definition, plan, report, reconnaissance, owner's/author's notes, approved, design review, task, MVP, preview, concept, cycle, question, project, the change, the work, "when this was", "was put to", 327 hits, every hit read). No sentence points by description to a document kept in the author's notes. D-48's *Origin* (spec at `b0c4d44`) is the one allowed pointer. Each sentence the fix wrote, judged: D-04, D-40, D-76, D-147 (D-338's binding sentence read: "A manual map run keeps a chronicle of what happened in it"), D-154 (D-13: `/etc/loop2/smtp-password` outside the checkout), D-176, D-177, D-232, D-249, D-273, D-274, D-276, D-277, D-279, D-359, D-364 (`rozpoznanie_frajda.md`, finding 3, the 10 s gap at 1×) and D-365 each read as the game has it. The remaining process narrations are listed above as notes; they name no document. |
| I-2 | fixed (with Minor 1–4 above) | D-387 and D-388 are in the template's shape: question title, binding sentences, *Scope*, *Based on* `none`, *Relations*, *Verification* with complies/violates, *Origin* `none`, *Rationale*, *Rejected*. Every number checked against `src/browser/sim/data/balance.ts`, `maps.ts`, `campfire.ts`, `items.ts` and `actions.ts` at the head (body 37.0/100/100, 0.002, 0.6, 35.0, 30, 0.35+0.35, 0.05; gather 10 min and 0.7; campfire 20 min and 6 sticks, lighting 5 min and 2 sticks, 60 min of burning, feeding 5 min and +20, warmth 0.5; stick 5 min, burns 3, 0.15; eating 5 min, one berry, 25; Las 4×4, (1,1), 25 °C, step 5, streak 480; Las — głębiej 5×5, drawn entrance, 7 °C, step 5, streak 540 and 2 attacks, opens after Las; resources 0.7/12/30, 0.5/8/40, 0.4/6/60, 0.4/6/60). "Outside combat" matches `run.ts:516-523` (combat minutes skip the body). The *Verification* arithmetic matches `body.ts` (`minutesUntilChilled`: 83 and 33). The body numbers and the gather chance match the old game's `old-loop/cdc7c0d/src/sim/data/balance.ts`. Las matches `mag_w_lesie_loop2.md:15` and `:52` ("Liczby Lasu … pochodzą z danych loop"). Campfire, eating and gathering match `ognisko_i_jedzenie_loop2.md` To do 5–11 and Q8/Q9 ("liczby loop", "przyjmuję wszystkie rekomendacje"). Las — głębiej's 5×5/540/two attacks are in the approved scope (`definicja_mvp_loop2.md:52`) and its 7 °C in `ognisko_i_jedzenie_loop2.md:141`. D-388's *Rationale* claims the old game's data for Las only, and for Las — głębiej says only what sets it apart (D-136, D-142): it claims no more than the sources give. The three titles (`tests/sim/data.test.mjs:16`, `:31`, `:247`) and the comments now name D-387 and D-388. |
| I-3 | fixed (with Minor 5 above) | D-73's binding sentence and `guidelines/testing.md:10-11` list the same ten departures. These are exactly the decisions whose *Relations* read `narrows D-73` (my own script: D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235, D-273). D-82's binding sentence, *Relations* (`narrows D-73`), *Verification* and `guidelines/testing.md:86-100` give one rule: sources are the foundation, a relation, a crash, and a human's judgement through a decision; no comment is required to name a source. The template's other parts of the rule — never today's output, the reviewer's question — are kept. The template allows the product to name its source documents ("the product's decision naming those of its documents that are sources"), so "the foundation" in place of "documents" is no departure. The comment rule is the one departure, now recorded. |

## Minor findings 1–35

| # | Result | Evidence |
|---|---|---|
| 1 | fixed | D-374 and D-379 *Rejected*: the way with no reason, with a closing period. |
| 2 | fixed | D-310 and D-380 *Rejected*: two ways with no reason ("the reasons written by the author of the work itself and judged only when the work is merged; a table with corrections of chosen rows."). |
| 3 | remains (by design) | Not changed in D-381; part 5's report holds the paragraph for the request. |
| 4 | fixed | `guidelines/styleguide-browser-view.md:333-335` names two kinds and their dates, as the list items below give them. |
| 5 | fixed | `src/browser/styles.css:1900`, `tests/view/scene.test.mjs:350`. D-322 gives `brightness(0.5)` and D-316 `brightness(0.55)` (log lines 7850, 7611). |
| 6 | fixed | D-82 *Verification*: "with a line or without one". |
| 7 | remains (by design) | For the request; part 5's paragraph. |
| 8 | fixed (Minor 6 above on the wording) | D-132 and D-147: the history is gone. |
| 9 | fixed | D-62, D-132, D-311 and D-368 say "whole page", as D-370. |
| 10 | fixed | D-369: "which discards a saved game state of the older version, the player's programs in it included (D-206)". |
| 11 | fixed | D-368: "the stretch from the fifth to the thirtieth minute of play" (`rozpoznanie_weteran.md:192`, "w minutach 5–30"). |
| 12 | fixed | D-122, D-216, D-368, D-369: the narrations are gone; D-369's present-tense claim rests on D-93. |
| 13 | fixed | D-173: "it hides the screen, the copy included" and "one sentence more in the question …". |
| 14 | fixed | D-122 cost matches invariant `player-map-run-pace` ("the real time passed in the same call beyond that game minute moving it on by no game minute"). |
| 15 | fixed | D-368: "The end holds much to read, and a window gives it room …". |
| 16 | fixed | D-185: "the line standing first, ahead of the other lines of the end" (the reason kept). D-216: "the same in the header". |
| 17 | fixed | D-324: „Wznów” and „Restart” close the question, as the band goes at „Wznów” (D-122). |
| 18 | fixed | D-325: the review is named once, with its content. |
| 19 | fixed | D-326: "on Las and with programs tuned by the person measuring". |
| 20 | fixed | D-338: "where the chronicle lives had to be settled, which D-339 did". |
| 21 | fixed | D-363: "In a trial of 2026-10-31"; "does not grow"; the circular clause is gone. |
| 22 | fixed | D-347: "a map run with such changes or losses … By that measurement …". |
| 23 | fixed | D-280 (190 px, Postać and Wiedza), D-282 ("of the sketched screens"), D-284 (cites D-283 and D-122; D-283 read). |
| 24 | fixed | D-288, D-299, D-309; D-316 also, though handoff 2 did not list it. |
| 25 | fixed in form; see N-1 | D-317 *Based on* filled. The passage cited does not support the figure. |
| 26 | fixed | D-311 (way C, way A 1074 px, second term 526/622 px, "(D-370, D-371)", 150 px, sourced in `rozpoznanie_projektant.md:67`), D-317 (the trial caveat), D-320 (0.06 s at 16×). |
| 27 | fixed | D-222, D-227 (D-111, D-13 read), D-241, D-246, D-251, D-254, D-255, D-264 ("most": 54 of 67 by the old counts), D-269. |
| 28 | fixed | D-152, D-153, D-154: *Review when* carried as conditions (D-152's text matches `definicja_mvp_loop2.md:252`). D-166, D-180, D-186, D-194. |
| 29 | fixed | D-189: "Measured in the predecessor game" (`koncepcja_projektowa.md:949`, `rozwiazanie_lasu_loop2.md:87`: "w loop"); "(D-239, D-21)" (D-21 holds the pace 16×). D-179, D-190, D-191. |
| 30 | partly remains | Fixed: D-80, D-83, D-85, D-89 (`guidelines/testing.md:371` now "(D-73, D-89)"), D-118, D-120 (D-196), D-122, D-124, D-133, D-136, D-138 (`definicja_mvp_loop2.md:398`), D-140, D-147. Remains: D-298 and D-306 "no cost was kept beside it". |
| 31 | fixed | D-03: numbers spot-checked against `technologia_budowanie_ekranow.md` (10.4 vs 4.9–7.2 KB at :147; 231 KB at :50; Preact 29 KB at :53; Mithril 29 packages and `3.0.0-next.102` at :155); the React-over-Preact reason from `definicja_mvp2_loop2.md:147`; one check, dated. D-04: "the sweep over many seeds know no clock"; way B1 restored. |
| 32 | fixed (Minor 7 above on what was dropped) | D-07, D-51, D-52, D-54, D-55. |
| 33 | fixed | D-48 *Origin* keeps only the pointer. |
| 34 | fixed | D-362 *Rejected*: the two ways are now ways of the product. |
| 35 | fixed | `src/server/account-routes.ts:472-473`: D-209 holds the revision basis ("accepts a save only when it names as its basis the revision"). |

## Comment-only check of the code (trust boundary included)

- `src/server/account-routes.ts`: `git diff -U0` shows exactly two lines changed, both comment lines 472-473. The esbuild output of base and head is identical, so the code is unchanged outside the comment. D-209 states the revision rule the comment now names, and D-112 names D-209 and D-210 for the write.
- `src/browser/styles.css`, `tests/sim/acceptance|body|campfire|map-card|world.test.mjs`, `tests/view/program-editor.test.mjs` and `tests/view/scene.test.mjs`: the esbuild output (comments stripped) is identical between base and head.
- `tests/sim/data.test.mjs`: the esbuild output differs only in the three test titles at 16, 31 and 247 (and the two added comments, which are stripped).

## Checks

- `git rev-parse HEAD` → `31c65bfa…`; `git status --short` → empty.
- `python -B .the-way/elements/common/foundation_check.py` (worktree, clean, `.the-way` at `55afa8e5`, equal to the recorded gitlink) → exit 0, "0 errors".
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` → exit 0, "checked: 444 files, 0 listed, 15 binary files not read".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' 31c65bfa -- . ':(exclude).the-way'` → exit 1 (no line).
- `npm test -- tests/sim/data.test.mjs` → exit 0, 34 pass, 0 fail (the only file whose code-level strings changed). Other test files were not run: their stripped code is byte-identical (above).
- esbuild comment-stripped comparison of the 10 changed code and test files (`node_modules/.bin/esbuild --loader=ts|js|css --legal-comments=none`, base against head) → exit 0 for each; differences as above.
- Script over the decision log at the head: `narrows D-73` set equals D-73's list.
- My own regex scan of *Rationale*, *Rejected* and *Origin* lines for pointers (327 hits) → each read; result in the I-1 row.
- Manual: WCAG 2.2 Recommendation (https://www.w3.org/TR/2024/REC-WCAG22-20241212/), glossary "general flash and red flash thresholds", read 2026-11-12 → area limit .006 sr = 25 % of a 10-degree field; 341 × 256 estimates the field (N-1).

## Reaches beyond the dispatch

- The WCAG 2.2 page: to check the passage D-317's new *Based on* quotes.
- `src/browser/sim/body.ts` and `src/browser/sim/run.ts:500-530`: to check "outside combat" and the minute arithmetic of D-387/D-388.
- `foundations/invariants.md` `player-map-run-pace`: the cost added to D-122.
- Decisions read whole beyond the edits: D-08, D-10, D-13, D-18, D-21, D-24, D-58, D-60, D-63, D-93 (head), D-111 (head), D-112, D-132, D-136, D-142, D-176, D-177, D-206 (head), D-209, D-210, D-220 (tail), D-239 (head), D-283, D-338 (head), D-377, D-379.
- Snapshot notes, read in the passages named: `ognisko_i_jedzenie_loop2.md:1-60` and `:141`, `mag_w_lesie_loop2.md:15` and `:40-60`, `definicja_mvp_loop2.md` (głębiej and *Review when* lines), `rozwiazanie_lasu_loop2.md` (lines 12, 29, 35, 87), `rozpoznanie_frajda.md:195-202`, `rozpoznanie_weteran.md:191-192`, `rozpoznanie_projektant.md:67`, `siedziba_i_druzyna_loop2.md:25-26` and `:70`, `technologia_budowanie_ekranow.md` (table lines), `definicja_mvp2_loop2.md:147`, `koncepcja_projektowa.md:396-402` and `:949`, and `old-loop/cdc7c0d/src/sim/data/balance.ts` whole.

## Unread material

- The full diff of the decision log was read in its word-diff form (all 962 lines). Of the edited decisions, I compared against the sources only those named in the tables (more than 40). The others were judged against the finding's words and the head.
- `guidelines/styleguide-browser-view.md`: lines 322-352 only (the fix touched 333-335).
- `guidelines/testing.md`: lines 1-20, 70-105 and the diff hunk at 365-375. The rest of the file was not changed by the fix.
- `.the-way/task-cycle/review/whole_change.md`: not read (this is the review of a fix).
- The part reports' cited passages in `stan_i_powod_przy_regule_loop2.md`, `koniec_przejscia_loop2.md`, `pytanie_przy_zakoncz_loop2.md`, `kronika_z_filtrami_loop2.md` and the technology notes for D-254/D-255: not opened. Those fixes were judged against the findings' words and the head.
- D-208, D-265, D-267, D-268 and D-270 (part 2's unassigned "task" wording): not opened.

## Searches not found or unclear

- The old game's `maps.ts`, `activities.ts`, `items.ts` and `recipes.ts` are not in the snapshot. The campfire, eating, gathering and Las numbers were checked against the notes that quote them and the code, not against those files.
- Part 4 reports that no note gives the source of Las — głębiej's 7 °C. Found: `ognisko_i_jedzenie_loop2.md:141` ("w danych loop 7 °C").
- D-185 *Rejected*'s new wording ("the line standing first") is part 2's reading of "directly under the status row". The source wording was not opened; the reason kept is the source's.
- D-368's "minute of play" (5–30): the source (`rozpoznanie_weteran.md:192`, "w minutach 5–30") does not say whether game or real minutes. The decision's wording does not settle it either.
