# Report of the merge of origin/main into the task branch (stage merge-1)

**Status:** done with concerns (the concerns are the items under "Where the handoff did not survive my check").

**Commit:** `5dea4e7c` (merge commit, parents `f72e08aa` and `4660e14a`), on `task/martwe-odsylacze-origin`. No second commit: the renumbering is inside the merge commit. Not pushed.

Start state: `git rev-parse HEAD` = `f72e08aaabbc86743700aaf6d72d4ec8d83b2291`, worktree clean; `git fetch origin`; `origin/main` = `4660e14a20977ec54249d6ee900920d7679b5ca0`; merge base `01418389d242cbe5792d8b22291acf4303c4edc3` (all as the handoff gives).

## Where the handoff did not survive my check

1. The handoff names four decisions changed by both sides besides D-362 (D-173, D-185, D-212, D-216). My comparison per decision against the merge base found **fourteen** (list below): D-27, D-40, D-43, D-47, D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216. Main had changed their heads (mostly the renumbering of D-362 to D-368 in references, and D-27/D-40/D-43 by the credits and icon-mask work) and their *Rationale*/*Rejected* as well. I treated all fourteen by rule 3.
2. "Only the renumbered decision and D-362 may differ" from origin/main in the part before *Rationale*: D-82 differs too. This is this branch's own change of D-82 (Foundation-entries commit `ccc03bcf`, main did not touch D-82), kept as the branch has it.
3. Main's change of D-362 is only in the first sentence, in the *Rejected* field (two added alternatives about `task-rules`) and in *Origin*/*Rationale*/complies example going back to base wording (commits `a46e02fc`, `9bbed2f8`, `13988e66`); the *Verification* of main's D-362 is the base one.
4. Conflicts were two files only: `foundations/decisions.md` (18 hunks) and `guidelines/styleguide-browser-view.md` (1 hunk). No code or test file conflicted, so no focused test was run (see Checks).

## Conflicts and how I resolved them

Method for the decision log: a script of my own (outside the repository, in the scratchpad) split base, this branch and origin/main into decisions and, inside each, into head (everything before *Rationale*, *Origin* line excluded), the *Origin* line and the tail (*Rationale* and *Rejected*); it round-trips each of the three files byte for byte. Then per decision: unchanged by main -> this branch's entry; unchanged by this branch -> main's entry; changed by both -> main's entry whole (rule 3), except D-362. The file was never taken whole from either side.

- `foundations/decisions.md`: 190 entries from this branch (changed only here), 7 from main only (D-262, D-271, D-311, D-313, D-324, D-339, D-365), 155 unchanged, 4 new from main (D-368 to D-371, kept as main has them), 14 both-changed taken from main whole, D-362 composed, D-372 added at the end.
- `guidelines/styleguide-browser-view.md` (token-values paragraph, around line 110): main rewrote the sentence about the two ways of drawing icons (an icon is drawn one way, as a mask) and dropped the sentence this branch had changed ("do zadania 24" to "do późniejszej zmiany"). Took main's text; the pointer this branch removed no longer exists there.
- `foundations/invariants.md`: merged without conflict; only the line `Derives from: D-368` of `action-duration-minimum` (line 954) edited to D-372.

### D-362 (composed)
- Title: this branch's ("... outside the repository that its readers cannot reach?").
- First sentence: main's, with the entry `task-rules` ("the folder of its projects in the notes, the list of its tasks and the rules of a task's line ... the entries `projects`, `tasks` and `task-rules`"), unchanged.
- Second sentence: this branch's (forbids naming a note kept outside the repository, its folder, or a file of a repository readers cannot reach).
- *Verification* (`tracked-file-private-paths` and `tracked-file-private-names`, complies/violates examples): this branch's; I checked that the examples agree with the sentence (the complies example for the entry `projects` still holds for a sentence that names three entries; none of the examples allows a note name).
- *Rationale* and *Origin* (`none`): this branch's.
- *Rejected*: this branch's text, plus, appended at the end, the two alternatives main added about `task-rules` ("leaving this decision unchanged ..." and "a separate decision of loop2 that the rules of a task's line come from the author's notes ..."), since rule 1 says nothing of main is lost and neither alternative names a note or a path. This goes slightly beyond rule 2 ("this branch's *Rejected* wins"); if the orchestrator wants it removed, it is the last two clauses of the *Rejected* line of D-362.

## Decisions where I took main's Rationale / Rejected / Origin whole (rule 3)

All fourteen: D-27, D-40, D-43, D-47, D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216. This branch's slice work (Slices 3 to 13) on their *Rationale*/*Rejected*/*Origin* is therefore undone for these; a later slice or the fix of slices 9-11 has to rewrite them against main's text. Their *Origin* names vault notes again (see the table below). Also main-only changes (this branch had not touched them, so main's entry was taken): D-262, D-271, D-311, D-313, D-324, D-339, D-365.

## Renumbering

This branch's own decision (floor of one game minute for an action shortened by bought branches) was D-368; it is now **D-372** (highest in the merged log was D-371), placed after D-371 at the end of the log. Changed: its heading; `foundations/invariants.md:954` (`action-duration-minimum`, *Derives from*). Its *Verification* line (`invariants: action-duration-minimum.`) names no number. `grep -rn 'D-368'` over the tracked files outside `.the-way` after the merge: every remaining hit means main's end-of-run window decision (decision log, `guidelines/styleguide-browser-view.md`, `src/browser/**`, `tests/**`); `tests/sim/skills.test.mjs:192` names the invariant by its name only. D-368 to D-371 are as main has them.

## Decisions of the merged log whose Origin still names something other than `none`: 116

All name vault notes except **D-48**, whose *Origin* names `docs/task-cycles/styleguide-loop2/spec.md` at commit b0c4d44 (a file of this repository's history, no vault note; it is the same in base and main, left as is). The vault notes by decision (for the snapshot):

- D-27: koncepcja_projektowa.md; mag_w_lesie_loop2.md; definicja_mvp2_loop2.md
- D-40: styleguide_loop2.md; zadanie_hierarchia_przyciskow_i_karta_logowania.md
- D-43: styleguide_loop2.md; edytor_programu_loop2.md
- D-47: styleguide_loop2.md
- D-48: spec.md
- D-53: siedziba_i_druzyna_loop2.md; koncepcja_projektowa.md; definicja_mvp2_loop2.md
- D-62: ognisko_i_jedzenie_loop2.md; rozwiazanie_lasu_loop2.md
- D-122: odkrywanie_loop2.md; rozwiazanie_lasu_loop2.md; definicja_mvp2_loop2.md
- D-132: rozwiazanie_lasu_loop2.md; petla_zarobkowa_loop2.md; teraz_i_potem_loop2.md
- D-135: rozwiazanie_lasu_loop2.md; definicja_mvp2_loop2.md; koniec_przejscia_loop2.md
- D-147: ekran_przejscia_loop2.md; definicja_mvp2_loop2.md; teraz_i_potem_loop2.md
- D-173: programy_gracza_loop2.md; definicja_mvp2_loop2.md
- D-185: plan_wyprawy_loop2.md; ekran_przejscia_loop2.md; kronika_z_filtrami_loop2.md; koniec_przejscia_loop2.md
- D-212: zapis_stanu_na_serwerze_loop2.md; definicja_mvp2_loop2.md; koniec_przejscia_loop2.md
- D-216: rozliczenie_przejsc_loop2.md; ekran_przejscia_loop2.md; koniec_przejscia_loop2.md
- D-259: logowanie_w_react_loop2.md
- D-260: logowanie_w_react_loop2.md
- D-261: logowanie_w_react_loop2.md
- D-262: logowanie_w_react_loop2.md; napis_o_awarii_loop2.md
- D-263: logowanie_w_react_loop2.md; plan_mvp2_loop2.md
- D-264: logowanie_w_react_loop2.md
- D-265: logowanie_w_react_loop2.md; zadanie_hierarchia_przyciskow_i_karta_logowania.md
- D-266: logowanie_w_react_loop2.md
- D-267: logowanie_w_react_loop2.md
- D-269: logowanie_w_react_loop2.md
- D-271: zakres_mvp2_loop2.md; rozpoznanie_frajda.md; definicja_mvp2_loop2.md; scena_z_ludzikiem_loop2.md
- D-272: rozpoznanie_projektant.md; rozpoznanie_frajda.md; definicja_mvp2_loop2.md
- D-273: logowanie_na_tle_gry_loop2.md; plan_mvp2_loop2.md
- D-274: zadanie_hierarchia_przyciskow_i_karta_logowania.md; karty_i_katalog_map_loop2.md
- D-275: zadanie_hierarchia_przyciskow_i_karta_logowania.md
- D-276: zadanie_hierarchia_przyciskow_i_karta_logowania.md
- D-277: zadanie_hierarchia_przyciskow_i_karta_logowania.md
- D-278: zadanie_hierarchia_przyciskow_i_karta_logowania.md
- D-279: zadanie_hierarchia_przyciskow_i_karta_logowania.md
- D-280: zakres_mvp2_loop2.md; rozpoznanie_projektant.md; ekrany_i_menu_loop2.md; definicja_mvp2_loop2.md
- D-281: zakres_mvp2_loop2.md; rozpoznanie_projektant.md; ekrany_i_menu_loop2.md; definicja_mvp2_loop2.md
- D-282: zakres_mvp2_loop2.md; rozpoznanie_projektant.md; definicja_mvp2_loop2.md; zadanie_proporcje_sceny_i_programu_loop2.md
- D-283: rozpoznanie_projektant.md
- D-284: ekrany_i_menu_loop2.md
- D-285: ekrany_i_menu_loop2.md
- D-286: ekrany_i_menu_loop2.md
- D-287: ekrany_i_menu_loop2.md; karty_i_katalog_map_loop2.md
- D-288: zakres_mvp2_loop2.md; rozpoznanie_projektant.md; research_edytor_programu_wow.md; definicja_mvp2_loop2.md; edytor_programu_loop2.md
- D-289: edytor_programu_loop2.md
- D-290: edytor_programu_loop2.md
- D-291: edytor_programu_loop2.md; teraz_i_potem_loop2.md
- D-292: edytor_programu_loop2.md
- D-293: edytor_programu_loop2.md
- D-294: edytor_programu_loop2.md
- D-295: edytor_programu_loop2.md
- D-296: edytor_programu_loop2.md
- D-297: edytor_programu_loop2.md
- D-298: edytor_programu_loop2.md
- D-299: edytor_programu_loop2.md
- D-300: edytor_programu_loop2.md
- D-301: edytor_programu_loop2.md
- D-302: edytor_programu_loop2.md
- D-303: edytor_programu_loop2.md
- D-304: edytor_programu_loop2.md
- D-305: edytor_programu_loop2.md
- D-306: edytor_programu_loop2.md
- D-307: edytor_programu_loop2.md
- D-308: stan_i_powod_przy_regule_loop2.md; definicja_mvp2_loop2.md
- D-309: stan_i_powod_przy_regule_loop2.md
- D-310: stan_i_powod_przy_regule_loop2.md
- D-311: zakres_mvp2_loop2.md; rozpoznanie_projektant.md; definicja_mvp2_loop2.md; ekran_przejscia_loop2.md
- D-312: ekran_przejscia_loop2.md
- D-313: ekran_przejscia_loop2.md; koniec_przejscia_loop2.md
- D-314: ekran_przejscia_loop2.md
- D-315: ekran_przejscia_loop2.md
- D-316: scena_z_ludzikiem_loop2.md; zakres_mvp2_loop2.md; rozpoznanie_frajda.md; koncepcja_projektowa.md
- D-317: scena_z_ludzikiem_loop2.md; zakres_mvp2_loop2.md; rozpoznanie_frajda.md
- D-318: scena_z_ludzikiem_loop2.md
- D-319: scena_z_ludzikiem_loop2.md
- D-320: scena_z_ludzikiem_loop2.md
- D-321: scena_z_ludzikiem_loop2.md
- D-322: scena_z_ludzikiem_loop2.md
- D-323: napis_o_awarii_loop2.md
- D-324: pytanie_przy_zakoncz_loop2.md
- D-325: definicja_mvp2_loop2.md; karty_i_katalog_map_loop2.md
- D-326: definicja_mvp2_loop2.md; karty_i_katalog_map_loop2.md
- D-327: karty_i_katalog_map_loop2.md
- D-328: karty_i_katalog_map_loop2.md
- D-329: karty_i_katalog_map_loop2.md
- D-330: karty_i_katalog_map_loop2.md
- D-331: karty_i_katalog_map_loop2.md
- D-332: karty_i_katalog_map_loop2.md
- D-334: teraz_i_potem_loop2.md; zadanie_proporcje_sceny_i_programu_loop2.md
- D-335: teraz_i_potem_loop2.md
- D-336: teraz_i_potem_loop2.md
- D-337: teraz_i_potem_loop2.md
- D-338: zakres_mvp2_loop2.md; rozpoznanie_projektant.md; definicja_mvp2_loop2.md; kronika_z_filtrami_loop2.md
- D-339: kronika_z_filtrami_loop2.md
- D-340: kronika_z_filtrami_loop2.md
- D-341: kronika_z_filtrami_loop2.md
- D-342: kronika_z_filtrami_loop2.md
- D-343: kronika_z_filtrami_loop2.md; zadanie_proporcje_sceny_i_programu_loop2.md
- D-344: kronika_z_filtrami_loop2.md
- D-345: kronika_z_filtrami_loop2.md; zadanie_proporcje_sceny_i_programu_loop2.md
- D-346: kronika_z_filtrami_loop2.md; zadanie_proporcje_sceny_i_programu_loop2.md
- D-347: technologia_zapis_dzialania_gry.md; definicja_mvp2_loop2.md; kronika_z_filtrami_loop2.md; zadanie_skad_wiem_o_awarii_loop2.md
- D-348: kronika_z_filtrami_loop2.md
- D-349: zadanie_proporcje_sceny_i_programu_loop2.md
- D-351: zadanie_loop2_test_granic_czesci.md
- D-352: zadanie_loop2_porzadki_z_uwag_pr.md
- D-353: zadanie_loop2_porzadki_z_uwag_pr.md
- D-354: zadanie_loop2_porzadki_z_uwag_pr.md
- D-355: zadanie_skad_wiem_o_awarii_loop2.md
- D-356: zadanie_skad_wiem_o_awarii_loop2.md
- D-360: zadanie_odtwarzanie_bazy_z_kopii_loop2.md
- D-361: zadanie_odtwarzanie_bazy_z_kopii_loop2.md
- D-363: koszty_i_stan_ogniska_loop2.md; definicja_mvp2_loop2.md
- D-368: zakres_mvp2_loop2.md; rozpoznanie_projektant.md; koniec_przejscia_loop2.md
- D-369: koniec_przejscia_loop2.md
- D-370: koniec_przejscia_loop2.md
- D-371: koniec_przejscia_loop2.md

The same by note file (40 files, `spec.md` of D-48 included):

- definicja_mvp2_loop2.md: D-27, D-53, D-122, D-135, D-147, D-173, D-212, D-271, D-272, D-280, D-281, D-282, D-288, D-308, D-311, D-325, D-326, D-338, D-347, D-363
- edytor_programu_loop2.md: D-43, D-288, D-289, D-290, D-291, D-292, D-293, D-294, D-295, D-296, D-297, D-298, D-299, D-300, D-301, D-302, D-303, D-304, D-305, D-306, D-307
- ekran_przejscia_loop2.md: D-147, D-185, D-216, D-311, D-312, D-313, D-314, D-315
- ekrany_i_menu_loop2.md: D-280, D-281, D-284, D-285, D-286, D-287
- karty_i_katalog_map_loop2.md: D-274, D-287, D-325, D-326, D-327, D-328, D-329, D-330, D-331, D-332
- koncepcja_projektowa.md: D-27, D-53, D-316
- koniec_przejscia_loop2.md: D-135, D-185, D-212, D-216, D-313, D-368, D-369, D-370, D-371
- koszty_i_stan_ogniska_loop2.md: D-363
- kronika_z_filtrami_loop2.md: D-185, D-338, D-339, D-340, D-341, D-342, D-343, D-344, D-345, D-346, D-347, D-348
- logowanie_na_tle_gry_loop2.md: D-273
- logowanie_w_react_loop2.md: D-259, D-260, D-261, D-262, D-263, D-264, D-265, D-266, D-267, D-269
- mag_w_lesie_loop2.md: D-27
- napis_o_awarii_loop2.md: D-262, D-323
- odkrywanie_loop2.md: D-122
- ognisko_i_jedzenie_loop2.md: D-62
- petla_zarobkowa_loop2.md: D-132
- plan_mvp2_loop2.md: D-263, D-273
- plan_wyprawy_loop2.md: D-185
- programy_gracza_loop2.md: D-173
- pytanie_przy_zakoncz_loop2.md: D-324
- research_edytor_programu_wow.md: D-288
- rozliczenie_przejsc_loop2.md: D-216
- rozpoznanie_frajda.md: D-271, D-272, D-316, D-317
- rozpoznanie_projektant.md: D-272, D-280, D-281, D-282, D-283, D-288, D-311, D-338, D-368
- rozwiazanie_lasu_loop2.md: D-62, D-122, D-132, D-135
- scena_z_ludzikiem_loop2.md: D-271, D-316, D-317, D-318, D-319, D-320, D-321, D-322
- siedziba_i_druzyna_loop2.md: D-53
- spec.md: D-48
- stan_i_powod_przy_regule_loop2.md: D-308, D-309, D-310
- styleguide_loop2.md: D-40, D-43, D-47
- technologia_zapis_dzialania_gry.md: D-347
- teraz_i_potem_loop2.md: D-132, D-147, D-291, D-334, D-335, D-336, D-337
- zadanie_hierarchia_przyciskow_i_karta_logowania.md: D-40, D-265, D-274, D-275, D-276, D-277, D-278, D-279
- zadanie_loop2_porzadki_z_uwag_pr.md: D-352, D-353, D-354
- zadanie_loop2_test_granic_czesci.md: D-351
- zadanie_odtwarzanie_bazy_z_kopii_loop2.md: D-360, D-361
- zadanie_proporcje_sceny_i_programu_loop2.md: D-282, D-334, D-343, D-345, D-346, D-349
- zadanie_skad_wiem_o_awarii_loop2.md: D-347, D-355, D-356
- zakres_mvp2_loop2.md: D-271, D-280, D-281, D-282, D-288, D-311, D-316, D-317, D-338, D-368
- zapis_stanu_na_serwerze_loop2.md: D-212

Of these, D-27 to D-216 listed in the first block above (the fourteen) are the ones this merge sent back from "done" to "to do"; D-259 and later are the still-pending slices 14-20 (D-363, D-368 to D-371 came with main).

## New pointers main brought in (not fixed, rule 5)

Whole-repository S1 (pattern of the plan's Slice 34): 20 lines are new compared with the branch before the merge, all in `foundations/decisions.md`, all the *Origin* lines of entries taken from main (line numbers in the merged file): 769, 982, 1027, 1087, 1211, 1384, 2403, 2705, 2792, 3008, 3395, 3602, 4184, 4301, 7171, 7291, 8610, 8625, 8640, 8655. No new S1 hit in any other file; the other S1 hits outside the decision log are this branch's own pending ones (tests, `src/browser/styles.css`, `src/browser/sim/data/balance.ts`, `foundations/environment_facts.md`: 75 lines, all present before the merge).

S2 (pattern of the plan's Slice 34 over `src tests guidelines`), pointers to tasks and "To do" items that main brought in, {len(s2)} lines (file:line), for slices 21-34:

- src/browser/view/end-window-lines.ts:2
- src/browser/view/end-window.tsx:3
- src/browser/view/run-header.tsx:3
- src/browser/view/run-header.tsx:4
- src/browser/view/run-screen.tsx:3
- src/browser/view/run-screen.tsx:4
- src/browser/view/world-area.tsx:4
- src/browser/view/world-area.tsx:5
- tests/sim/run-record.test.mjs:1
- tests/sim/saved-game.test.mjs:40
- tests/sim/saved-game.test.mjs:45
- tests/sim/saved-game.test.mjs:728
- tests/sim/saved-game.test.mjs:906
- tests/sim/saved-game.test.mjs:950
- tests/sim/saved-game.test.mjs:1451
- tests/sim/saved-game.test.mjs:1959
- tests/view/account-screen.test.mjs:1733
- tests/view/account-screen.test.mjs:3154
- tests/view/account-screen.test.mjs:3295
- tests/view/account-screen.test.mjs:4930
- tests/view/account-screen.test.mjs:4931
- tests/view/end-window-game.test.mjs:1
- tests/view/end-window-game.test.mjs:328
- tests/view/end-window-game.test.mjs:362
- tests/view/end-window-game.test.mjs:380
- tests/view/end-window-game.test.mjs:407
- tests/view/end-window-game.test.mjs:517
- tests/view/end-window-game.test.mjs:549
- tests/view/end-window-game.test.mjs:581
- tests/view/end-window-game.test.mjs:608
- tests/view/end-window-game.test.mjs:639
- tests/view/end-window-game.test.mjs:706
- tests/view/end-window-game.test.mjs:725
- tests/view/end-window-game.test.mjs:781
- tests/view/end-window-game.test.mjs:833
- tests/view/end-window-game.test.mjs:837
- tests/view/end-window-game.test.mjs:838
- tests/view/end-window-lines.test.mjs:1
- tests/view/end-window-lines.test.mjs:5
- tests/view/end-window.test.mjs:1
- tests/view/end-window.test.mjs:10
- tests/view/end-window.test.mjs:164
- tests/view/end-window.test.mjs:209
- tests/view/end-window.test.mjs:318
- tests/view/end-window.test.mjs:395
- tests/view/end-window.test.mjs:435
- tests/view/end-window.test.mjs:504
- tests/view/end-window.test.mjs:581
- tests/view/end-window.test.mjs:604
- tests/view/end-window.test.mjs:629
- tests/view/headquarters-screen.test.mjs:147
- tests/view/run-header.test.mjs:273
- tests/view/run-screen.test.mjs:876
- tests/view/run-screen.test.mjs:897
- tests/view/run-screen.test.mjs:924
- tests/view/world-area.test.mjs:179
- tests/view/world-area.test.mjs:181

No new pointer to a file of the private repository of the old game was found by S1. The styleguide text that main added mentions the old Loop's main screen in `foundations/decisions.md` D-27 *Rationale* ("where the old Loop, from whose views the product starts, stands its credits on the main screen") and in its *Rejected*: a mention of the old game by name, not a file pointer; left to the slice of D-27.

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0 ("0 errors").
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0 ("checked: 443 files, 0 listed, 14 binary files not read").
- `git grep -n '^<<<<<<<\|^>>>>>>>' -- . ':(exclude).the-way'` -> exit 1, nothing printed.
- `python -X utf8 -I cmp.py` (my own, comparing every decision's head, *Origin* line excluded, with origin/main): heads differ from origin/main in D-82 (this branch's change), D-362 (composed) and D-372 (new) only; entry order is main's plus D-372 at the end.
- Whole-repository S1: ran, 197 lines (122 in `foundations/decisions.md`), results above; the plan expects it to print only the `pixel-crawler-terms` line at the end of the task, so it is not yet clean (expected before slices 14-34).
- Focused tests: none run, because no code or test file had a conflict (the only files both sides changed are `.the-way`, `foundations/decisions.md`, `foundations/invariants.md`, `guidelines/styleguide-browser-view.md`, and no test reads the decision log or the styleguide). The whole gate was not run, as the handoff says.
- `.the-way` gitlink is `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed` on both sides, equal to `git -C .the-way rev-parse HEAD`.

## Own-work check

Requirement most likely not met: "nothing of main is lost outside *Rationale*/*Rejected*/*Origin*". Check: my script's comparison of heads with origin/main (above) found no difference but the three expected; the 18 hunks of conflict plus the auto-merged hunks of the log are all inside decisions of the categories listed. A second risk is a stale reference to the renumbered decision: the `grep D-368` listing shows only main's window decision plus the invariant fixed to D-372. A third: the files were written with unchanged line ends (the log is `i/lf`, `w/lf`; the script wrote with `newline=''`).

## Unread material
- `.the-way/task-cycle/change/SKILL.md` read whole; its variant files (`slice.md`, `fix.md`) not read, since the stage is a merge. `guidelines/coding.md`, `guidelines/testing.md` and `guidelines/styleguide-browser-view.md` were not read whole (the styleguide I read only around the one conflict hunk and its diff against base); I changed no product code and no test. The frozen task `docs/task-cycles/martwe-odsylacze-origin/task.md`, the plan (read only its Slice 34 and the S1/S2 patterns) and commit `ccc03bcf` were not read whole; the three main commits on D-362 I read through the three entries (base, this branch, main), not through `git show`.

## Searches not found or unclear
- none besides the point 2 above (the handoff's list of both-changed decisions).
