FAIL f0f3b0752e035cb1d8ae69a0242cc632f92a0ab1

# Review of the whole change — `karty-i-katalog-map`

- Range: `213670952542816b8dd86117f815c3869cc090d5..f0f3b0752e035cb1d8ae69a0242cc632f92a0ab1` (15 commits; `git rev-parse HEAD` in the worktree is the head given).
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md` at the pinned `294af7f`.
- No slice had a review of its own (step 4 answers: no trust boundary, no irreversible operation), so every slice is judged here, its own-work check included.
- Selection (mine): parts `browser-view` and `simulation` (and `agent-workflow` for the skill `loop2-play`, `README.md`); the decisions of *Decisions in play* and those the changed entries and code name (D-03, D-18, D-36, D-39, D-40, D-44, D-53, D-54, D-55, D-133, D-134, D-142, D-149, D-165, D-170, D-171, D-180, D-187, D-188, D-189, D-217, D-243, D-244, D-245, D-251, D-265, D-269, D-274, D-280, D-281, D-282, D-287, D-323, D-325 to D-332); the invariants `content-identifiers`, `browser-view-framework`, `browser-view-token-values`, `browser-view-focus-outline`, `application-build-kitchen-sink`, `document-test-memory-limit`, `node-test-selection`, `mutation-test-selection`, `simulation-isolation`, `simulation-inputs`, `trip-transfer`, `uncaught-failure-game-state`; the guidelines `guidelines/coding.md`, `coding-browser-module.md`, `coding-simulation-module.md`, `testing.md`, `styleguide-browser-view.md`, and `src/browser/AGENTS.md`.

## Findings

### Critical

none

### Important (blocking)

**I1 — The styleguide puts „Pętla zatrzymana …” at the character in „Kto idzie”, against the task and D-245.**
- Place: `guidelines/styleguide-browser-view.md:517-523`, rule „The screen Mapy”, item „Sekcja „Kto idzie””: „przy postaci w pętli zarobkowej wiersz pętli w `text` z „Zatrzymaj” (D-244), a po zatrzymaniu wiersz „Pętla zatrzymana …” w `text-secondary`”.
- What is wrong: To do 5 (the paragraph on „Zatrzymaj”, question 5) says „„Pętla zatrzymana …” stoi tam, gdzie stawia je D-245 — na karcie i ekranie postaci”, and D-245 (task, *Obecne decyzje, których zadanie dotyka bez zmiany*) keeps it „On the character's card and screen”. The code is right and does not draw it (`src/browser/view/maps-screen.tsx:288-302`; `tests/view/maps-screen.test.mjs` asserts no stopped-loop line). So the styleguide the change writes now says the opposite of the code and of the task.
- Why it matters: the styleguide is what the next author and the review of every later change to `browser-view` compare a screen with (WAY-168). The next change to the screen Mapy, or its review, would add the line or report the screen as missing it — a meaning the task forbade (`.the-way/product-guidelines/styleguide/template.md`, "Writing the file": every meaning from the task's settlements and decisions). The fix is to delete one clause.
- Evidence: the quoted lines; slice 7 reported it (`reports/09-slice-7-report.md:111`); the plan's *Orchestrator's notes* (`plan.md:673`) gave the fix to slice 10, whose *Change* did not hold the file, and `git log` shows only `ce5e865` touching the styleguide.
- Slice: slice 1 (`ce5e865`) wrote it; the plan's correction for slice 10 (`57f9578`, `f0f3b07`) never reached that slice's *Change*. Within the task (To do 9).

**I2 — The projected entries are not written whole as the definition approved them: their *Rationale* and *Rejected* are the writer's, and D-326 says `unknown` where the definition names a rejected way.**
- Place: `foundations/decisions.md`, D-326 (`:7072-7085`), D-325 (`:7057-7070`), D-53 (`:1074-1094`), D-149 (`:2802-2815`), D-170 (`:3114-3127`), D-180 (`:3288-3301`), D-243 (`:4837-4863`).
- What is wrong: the task's *Decisions in play* says „Wpisy projektowane cytuje `definicja_mvp2_loop2.md`, zatwierdzona 2026-11-03, odcisk 9641f804”, and the foundation step writes a projected entry „whole as the readiness gate approved it” (`.the-way/task-cycle/skill/foundation_step.md`, WAY-126). The writer says it did not read the definition (`reports/02-foundation-report.md:80`), so the fields beyond the binding sentences are its own:
  - D-326 *Rejected* reads `unknown`; the definition (`definicja_mvp2_loop2.md:419-432`) has „*Rejected:* a new program bringing everything by default — a less conscious choice of what to bring.” `unknown` says nobody knows what was weighed (`.the-way/elements/decisions/template.md:59`), which is false.
  - D-325 drops from the definition's *Rationale* „and numbers on the card tell that a map takes supplies. Empty places wait for maps the game does not have yet.” and from its *Rejected* „empty places for maps that do not exist yet — they promise content that is not there” (`definicja_mvp2_loop2.md:374-387`).
  - D-53: the definition's *Rejected* „sending from the headquarters beside each character — it needs a long row for each character and the map's demands stand nowhere; two buttons „Wejdź”, as in loop” became „sending from the headquarters — the player would read what a map asks on one screen and send a character from another”, and the rejected „two buttons „Wejdź”” is lost; the *Rationale* is reworded too (`definicja_mvp2_loop2.md:539-552`).
  - D-149: the definition's *Rationale* clause „the end of the map run that opens a map names the way to it” is replaced by the writer's „the player finds the next map on the list when the screen Mapy is next opened”, and *Rejected* keeps „a new-map message on completion — adds another announcement”, which the definition dropped (`:779-792`). The task notes that the clause runs ahead of the game until task 16; it does not authorise a new reason in its place.
  - D-170 *Rejected* keeps „a list for each map — the same pick repeated once for each map”, which the definition dropped; D-180 *Rationale* gains „The card of a map shows what of the plan enters, so the player reads before a send what the map lets in.”, which the definition does not have; D-243 *Rationale* and *Rejected* differ in wording from the definition's (`:824-1062`).
- Why it matters: these entries reach the main branch as the human-approved projection, so a later agent reads the writer's reasons and rejections as the human's, and — through D-326's `unknown` — may propose again „a new program brings everything by default” with nothing telling it that this way was weighed and why it lost (WAY-33). Source fidelity is what this review checks against the task's sources (`whole_change.md`: „nothing the change takes from them altered or invented”). The fix is to copy the definition's *Rationale* and *Rejected* into each entry (with D-149's clause either kept as approved or named in the request as `the cycle's`), keeping only the place words the binding sentences changed.
- Evidence: the definition's passages quoted above against `git diff 2136709..f0f3b07 -- foundations/decisions.md`.
- Slice: the plan's *Foundation entries* (`afe5920`); the plan's handoff quoted only binding sentences, so the gap is partly the plan's. Within the task (To do 11).

### Minor

Each within the task unless it says otherwise.

- **M1** `src/browser/view/maps-screen.tsx:149-157` — the heading draws the name, „rozwiązana” and „odsłania ją {mapa}” as separate spans with only a gap between them; the task's example is „Las — głębiej · odsłania ją Las” (To do 4), as the old Loop joins them with „ · ”. The player sees the same words without the separator.
- **M2** Stale words that still place sending in Siedziba or misplace a line: `src/browser/styles.css:1302` („under „Wyślij””); `src/browser/view/team-lines.ts:16-17` („why „Wyślij” and „Puść w pętlę” are inactive”); `src/browser/view/trip-lines.ts:44` (`entersLine` is „The line under „Wejdź””, but it stands above the buttons, To do 5 item 4); `tests/view/map-lines.test.mjs:31` (case name „the headquarters hides maps…”).
- **M3** `guidelines/styleguide-browser-view.md:387` — „Wyłączony „Wejdź” wygląda tak samo (D-287)” reads as if the disabled „Wejdź” kept the main look, while the rule States of shared controls (`:238-246`) and `src/browser/styles.css` (`.button.main:disabled`) give it the disabled look; D-287 settles no look. In the same rule, `:517` cites D-330 (the first of three clicks) for the section „Kto idzie”, and `:528-529` says the run sentence stands „jak na Siedzibie”, which after this change no longer holds it (D-287 as rewritten).
- **M4** `guidelines/coding-browser-module.md:18,43,45-46,60` and `guidelines/coding-simulation-module.md:24` — the statuses `copy` of the new rows (`headquarters.tsx`, `map-lines.ts`, `maps-screen.tsx`, `team-lines.ts`, `map-card.ts`) and the change of `away-report.ts` from `do not copy` to `copy` are not settled by the task (To do 10 asks for the rows only); `.the-way/product-guidelines/coding/template.md` ("Writing the files") takes every status from the task's settlements. The request should name them for the human.
- **M5** `guidelines/coding-browser-module.md:281-285` — the example names the kinds `secondary` and `tab` and the props of `ReactButton` but not the new kind `main` of both forms.
- **M6** `src/browser/view/maps-screen.tsx:112,165-176` — the step note is split back off a string of `terrainLines` by a regular expression to draw it in its own role (handoff item 4). A change of the note's words in `map-lines.ts` would leave the note in `text`; the screen case with a made-up step (`tests/view/maps-screen.test.mjs:323`) would catch it, so the cost is a coupling, not a hidden fault. Returning the note apart, as `resourceLines` returns the renewal, removes it.
- **M7** `tests/view/uncaught-failure.test.mjs` — no case drives the screen Mapy after `halt()` (handoff item 2). The invariant `uncaught-failure-game-state` holds by the code path: every act of `mapsControls` goes through `store.apply`, which returns while `halted` (`src/browser/view/game-view.ts:270`), and `enter` reads the run from the store. Broader coverage would be nice.
- **M8** (outside the task) `src/browser/sim/map-card.ts:10-21` — `minutesWithoutFire` steps minute by minute and runs at every draw of the card, the clock's readings included; for an ambient temperature just below 37 °C it could take hundreds of thousands of steps or more per draw (handoff item 3). No map in the data comes near (83 and 33 steps). A closed form or a cap would remove it when such a map comes.
- **M9** (outside the task) `guidelines/coding-browser-module.md` — no row for `src/browser/view/end-question.tsx`, which the plan's notes (`plan.md:668,674`) gave to slice 10; slice 10 left it under WAY-200 (`reports/12-slice-10-report.md:70`). The task's To do 10 asks only for the rows of the new files.

## What the change meets (checked)

- To do 1: „Mapy” between „Siedziba” and „Programy”, `#/mapy`, marked under both addresses (`menu-bar.tsx`, `screen-address.ts`, `tests/view/menu-bar.test.mjs`); no button at a character in Siedziba (`tests/view/headquarters-screen.test.mjs:468`).
- To do 2: `#/mapy`, `#/mapy/{map}` with the data's identifier read undecoded and by own key; reload stays; a map off the list or absent opens Siedziba (`resolveScreen`, `tests/view/screen-address.test.mjs`, the crafted-address cases of `account-screen.test.mjs`).
- To do 3, 4: two areas as the columns of Programy; the list in the data's order filtered by `canSendMap`; the card's parts and numbers (83/33 minutes, ≈ 11 z 16, ≈ 280 min) from the data through `map-card.ts`, parts the map lacks absent, the five departures, no write to the Understanding (D-328 case).
- To do 5–7: the order of the lines at each character, „Wejdzie: …” from `sendTake`, the one function the send takes through (so line and send cannot differ), the two warnings, the run sentence under the buttons of every character, the resurrection and loop lines, the empty team; „Wejdź” of kind `main` opening Przejście with a new entry; „Puść w pętlę” plain, leaving the player on Mapy; the focus after „Puść w pętlę” and „Zatrzymaj”.
- To do 8: Siedziba in React, nothing that sends, the report, „Drużyna” with its heading, the chest, the field and „Załóż” keeping focus.
- To do 10: rows of the new files; the example „Kontrolki w DOM i ich aktualizacja” now stands on `app.ts`, whose claims I checked against `src/browser/view/app.ts:176-300`.
- Acceptance criterion: three clicks, in `account-screen.test.mjs` and in slice 8's real-browser check.
- Settlements 1–6 → D-327 to D-332, faithful to their rows; D-327's last sentence (the usual step) is the plan's Choice, marked `the cycle's` by the writer for the request. D-217, D-244, D-274, D-287, D-55, D-171, D-280, D-281, D-282, D-133, D-134, D-165, D-188, D-251 binding sentences match *Decisions in play*; D-03 tied unchanged.
- Carried questions: numbers in the simulation; widths of Programy; pure functions in `team-lines.ts`/`map-lines.ts`; no field of the game state changes (only comments in `types.ts`), so no version bump.
- No reserved choice taken (no new library, store, login or place to run).
- Slice 9's change to `tests/view/account-screen.test.mjs` (handoff mismatch): both cases keep their requirement — Siedziba's rows still must hold no list and no sending button (the hidden „Zatrzymaj” of a character in no loop simply no longer exists), and the tick case still fails on a rewrite of an unchanged line and on a replaced element (it counts DOM mutations of the same element and reads its text).
- Pin move `58d4849`: changes only the gitlink to `294af7f` (`git show --stat`).

## Declined to judge

- D-169 *Rationale*, D-265 *Verification* and D-189's „the list of maps marks it” become untrue by this change; the cycle's return step corrects them in this request (`plan.md:667`), not these commits.
- D-245 and D-246 — task 25 writes their changes (task, *Obecne decyzje, których zadanie dotyka bez zmiany*).
- The width of the gap between „Wejdź” and „Puść w pętlę” at 1280 px (slice 8 concern 3) — the task settles no layout of the actions row beyond „obok”; an appearance for the human at the request.

## Checks run

All from the worktree root at `f0f3b07`; the worktree stayed clean (`git status --short` empty after all runs).

| Command | Exit |
|---|---|
| `npm test -- tests/view/maps-screen.test.mjs` | 0 (20 pass) |
| `npm test -- tests/view/map-lines.test.mjs` | 0 (11) |
| `npm test -- tests/sim/map-card.test.mjs` | 0 (11) |
| `npm test -- tests/sim/trip.test.mjs` | 0 |
| `npm test -- tests/view/trip.test.mjs` | 0 (9) |
| `npm test -- tests/view/screen-address.test.mjs` | 0 (57) |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 (28) |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 (17) |
| `npm test -- tests/view/away-report.test.mjs` | 0 (14) |
| `npm test -- tests/view/team-lines.test.mjs` | 0 (16) |
| `npm test -- tests/view/react-controls.test.mjs` | 0 (55) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (128) |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 (13) |
| `npm test -- tests/view/character-screen.test.mjs` | 0 (7) |
| `npm test -- tests/view/end-question.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 |
| `npm run typecheck` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/map-card.ts,src/browser/sim/trip.ts:36-55"` (testing.md, Mutation testing) | 0 — 30 killed, 7 timed out (loop mutants of `minutesWithoutFire`, detected), 0 survived, 0 without coverage |

Manual checks: `diff` of `.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md` — identical; the guideline example's claims against `app.ts`; the old `headquarters.ts` at the base against `team-lines.ts`/`map-lines.ts` — the moved functions are the same.

Not run: the full `npm test` (the cycle's gate, not this review's); the real browser (slices 3, 8 and 9 hold real-browser checks in their reports; I did not repeat them); the checks at the pin commit `58d4849` against the base (I confirmed only that it changes the gitlink alone).

## Reaches beyond the dispatch

- `the approved project definition (a private note):374-435, 539-552, 719-735, 779-795, 824-870, 1019-1080, 1290-1305` — the projected entries, to check the source fidelity of the entries written (I2).
- `old-loop-repo` at `cdc7c0d`, `src/components/probe/MapPage.tsx:100-112` — how the old card joins the heading's marks (M1).
- `.the-way/elements/decisions/template.md`, `.the-way/task-cycle/skill/foundation_step.md` — what a projected entry and `unknown` must be (I2).
- `.the-way/product-guidelines/styleguide/template.md`, `.the-way/product-guidelines/coding/template.md` (lines 215-315), `.the-way/product-guidelines/coding/SKILL.md` (lines 30-79) — the templates of the guidelines the change edits (WAY-170) (I1, M4).
- `src/browser/view/app.ts:176-305`, `src/browser/view/game-view.ts:195-290`, `src/browser/sim/body.ts:17-95` — to verify the guideline example, the halt path and the cooling loop.
- `reports/02-foundation-report.md`, `03-`, `04-`, `07-`, `09-`, `10-`, `11-`, `12-` slice reports — the executors' claims and own-work checks.

## Searches not found or unclear

- Not found: a case of the foundation or the task for the page's `halt()` with the screen Mapy (M7).
- Unclear: whether `docs/task-cycles/karty-i-katalog-map/task.md`, which quotes only the binding sentences of the projected entries, was meant to stand for the definition's other fields; the task names the definition as the source of the projected entries, so I read it (I2).
