done with concerns

# Report — executor-23, Slice 23

Status `done with concerns`: both parts of the Goal are made; two observations stand open (the chronicle's wording of the refill, and a 12 px overflow of the scene at 360 px that no slice of this task touched) — see "Problems as observed".

## Commits

- `db955ab0` — `guidelines/styleguide-browser-view.md` (+3 −1): in the rule "The body row of a map run" the passage "Komponent to `src/browser/view/body-row-cells.tsx`" now says the component of the body row with the backpack row is `body-row-cells.tsx`, and the line of gear is drawn by `src/browser/view/world-area.tsx` right after it, with its words made by `src/browser/view/gear-lines.ts`. Nothing else in the file changed. The claim was read against the code first: `world-area.tsx:95-101` renders `BodyRowCells` and then `<p className="backpack-text">{gearLine(run.character.gear)}</p>`; `body-row-cells.tsx:292` draws the backpack row only.

Part (1) changed no file (a check in a real browser); the product's code was not touched.

## Checks

| Check | Command | Exit code / result |
|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` (run after `git add` of the file) | exit 0, `0 errors` (the 14 errors the handoff names are gone: Slices 4, 4b and 18 have made them 0 before this slice) |
| The browser check of Goal (1) | the walk below | done, observations below |

Not run: the product's gate (`npm test`) — outside the boundary. No test was written or changed; the slice changes a guideline paragraph and walks the product.

## Tests failing on the slice's base

None: no test was run that failed, and no product file changed.

## The walk (walkthrough.md)

Where: Windows 11, Chromium of Playwright CLI 0.1.22, `npm run local` from the worktree (`https://127.0.0.1:62949`, a made-up account at `example.test`), at 1280 × 720 (no touch) and at 360 × 740 with touch (`.playwright/cli.phone.config.json`, taps by `page.tap`). Phone width read back: `width 360, height 740, touch 1, phone true`.

How the state was reached (the working scripts are kept in `reports/executor-23-walk/`): a character „Agent” with 15 sticks and 15 berries in the chest, every action and condition in its Understanding, the maps `forestEdge` and `forest` solved, a map run of `forestDeep` (the first map with a wolf) with the program of the reference `forestDeepBest` (take list: 8 sticks, 7 berries) and an empty main hand. The seed was found with the game's own `send` and `advanceMinutes` (the first wolf attack of `forestDeep` falls after minute 180 on the cooldown): the run of `realMs` 1 meets the wolf at minute 334 with health 100; the saved document stands at minute 331, was put in by `PUT /api/saved-game` as the skill gives, and the page was reloaded (it comes back paused). The balance instrument was not used for the search (its modes take the gear since Slice 21, but the game's own functions answered the same question in one step) — a choice, named below.

Programs used (their groups are the reference program's, with the group „Walka” changed):
- A: „Walka” = „Uderz — patyk”, „Kopnij”; no rule of „Załóż”.
- B3: a first group „Wyposazenie” with „Puste — Ręka główna → Załóż — patyk”, then the reference groups with „Walka” as in A; the saved state had the hand emptied (the stick back in the backpack), since the plain run of B equips at minute 1.
- C: „Walka” = „Przeciwnik ma poniżej 99 pkt → Załóż — patyk” (a rule of „Załóż” among the combat rules, reached only in a fight), „Uderz — patyk”, „Kopnij”.
- B (at minute 0) for „Teraz” out of combat; and a rule added in the editor of the running copy (A with „Puste — Ręka główna → Załóż — Patyk” added to the group „Jedzenie” through the rule window: the window offers „Puste” among the conditions after „Energia natury poniżej”, its target pick „Ręka główna”/„Kieszeń”, and „Załóż” at the end of „Żywność i walka” with „1 min”).

| Case | By what | Verdict |
|---|---|---|
| 1. A strike at an empty main hand with a stick in the backpack: the combat line reads „Mag bierze patyk z plecaka do ręki” as an element of its own, before the strike's | the screen at 1280 and at 360, text of the chronicle paragraph and of the page read by `innerText` | passed. The paragraph reads `Napada wilk (24/24). … Wilk gryzie: −7 · Mag bierze patyk z plecaka do ręki · Mag uderza patykiem: wilk 18/24 · Wilk gryzie: −7 · Mag uderza patykiem: wilk 12/24 · …`, the refill its own element between the wolf's bite and the strike (`reports/executor-23-walk/poll-A.txt`) |
| 2. The chronicle reads „Bierze patyk z plecaka do ręki” | same | the words stand in the chronicle as „Mag bierze patyk z plecaka do ręki” inside the encounter's paragraph; no entry reads „Bierze patyk z plecaka do ręki” without the actor, and no code makes one (the only place of the words is `GEAR_PLACES.mainHand.refill`, used by `combat-line.ts` with the prefix „Mag ”). Read with *To do* 3 of the task (the line of combat names the actor on every element), the chronicle's text of a fight IS that line, so I take the case as met; the plan's literal is looser than the task's — see "Problems" |
| 3. The line of gear turns from „Wyposażenie: nic” to „Wyposażenie: patyk w ręku” | page text before and after, at 1280 and 360 | passed: „nic” at minute 331 and through the fight (minutes 334–338, „Walczy z wilkiem”), „patyk w ręku” at minute 339 when the encounter resolves; the backpack row goes `10/15: patyk 7` → `9/15: patyk 6`, one stick into the hand |
| 4. „Puste — Ręka główna → Załóż — patyk” out of combat: the rule stands in its colour, „Teraz” reads „Zakłada patyk”, the hand fills | screen at 1280; page text; the colour of each part of the row read with `getComputedStyle` | passed. At minute 0 (paused): „Teraz” `Zakłada patyk · reguła 1.1 · zostało 1 z 1 min`, „Potem” `Załóż — Patyk`; the row `1.1 Puste — Ręka główna → Załóż — Patyk · 1 min` holds no `rule-reason` part, so no amber; after one minute „Wyposażenie: patyk w ręku”, backpack `14/15: patyk 7` |
| 5. The same rule in the turn of a fight, and the encounter's paragraph shows the equip turn | program B3 at 1280; page text; row colours | passed. During the fight the row of „Załóż” has no `rule-reason` (no „trwa walka”, no „tylko w walce”); the combat rules lose their „tylko w walce” in the fight and have it out of it, as D-309 gives; the ordinary rule „Zjedz — jagoda” shows „trwa walka” in amber (as D-309 gives for an ordinary action). The paragraph reads `Wilk gryzie: −7 · Mag zakłada patyk · Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 …`: the equip took one turn, the strike did not refill; after it the line of gear reads „patyk w ręku”, backpack `9/15: patyk 7` |
| 6. „Załóż” among the combat rules (program C) | screen at 1280, row colours | passed. Out of combat the row `2.1 Przeciwnik ma poniżej 99 pkt → Załóż — Patyk · 1 min` stands with no reason (not „tylko w walce”); in the fight it is the rule picked (green current row), with no reason; the paragraph again `Wilk gryzie: −7 · Mag zakłada patyk · Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 · …`; the hand ends with the stick (backpack `9/15: patyk 6`) |
| 7. The rule added in the editor of a running copy (window of the rule) | screen at 1280, snapshot | passed: the pick lists „Puste” after „Energia natury poniżej”, then its target „Ręka główna”/„Kieszeń” with „Ręka główna” chosen, and „Załóż” last in „Żywność i walka” with „1 min”, its target pick „Patyk”/„Opatrunek” with „Patyk” chosen; the changes appear in „Moje zmiany”; the rule then fired in the fight of the same walk (the paragraph shows `Mag zakłada patyk`) |
| 8. The same at 360 px with touch (A and B3) | screen at 360, taps (`Wznów` by `page.tap`), the measurement of the skill | passed for what was checked: the combat line, the chronicle paragraph and the line of gear read as at 1280; the measurement says `scrollsToTheSide: false`, `controlsSmallerThan48: []`; the finding of the measurement is in "Problems" |
| 9. Side observation | — | the rows of the program panel are drawn twice at 360 px (one list hidden), so a script that reads rows finds each rule twice; no fault. The screen of the run shows no error in the console (`console error`: 0) |

What I did not check: „Teraz” reading „Zakłada patyk” at 360 px, program C at 360 px, the rule window at 360 px, and the equip rule's chronicle entry out of a fight (a loaded save carries no events, so the entry of an equip made out of combat before the reload is not in the chronicle, as the skill says; the one equip made after the reload happened in the fight); a „Kieszeń” rule (nothing in this slice puts a bandage into a pocket); the refusals „już założone”, „brakuje 1 × …” and „kieszenie pełne” on the screen (not named by the slice). The walk was made on a composed state, so it checks that the game agrees with itself, not that a player reaches the state by playing.

## Screenshots (public repository `mariusznazar/screenshots`, branch `loop2/wyposazenie-postaci`, commit `1fe6bc181d5119eee039443930bc77924eb25dfa`, directory `loop2/wyposazenie-postaci/slice-23/`)

I looked at each before it was pushed: only the made-up account name „Agent” stands in them.

- ![At the start of the fight (minute 334): the hand empty, „Wyposażenie: nic”, the combat rules with no „tylko w walce”](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/A-1280-fight-start.png?raw=true) — 1280 × 720, program A
- ![The fight resolved (minute 339): „Wyposażenie: patyk w ręku”, backpack 9/15](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/A-1280-fight-end.png?raw=true) — 1280 × 720, program A
- ![„Teraz”: „Zakłada patyk”, the rule „Puste — Ręka główna → Załóż — Patyk” in its colour](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/B-1280-before-equip.png?raw=true) — 1280 × 720, minute 0
- ![The rule of „Załóż” in a fight: no reason beside it, the current rule](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/B3-1280-fight.png?raw=true) — 1280 × 720, program B3
- ![„Załóż” among the combat rules, picked in the fight](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/C-1280-fight.png?raw=true) — 1280 × 720, program C
- ![360 px: the fight resolved, the top of the screen](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/A-360-fight-end.png?raw=true) — 360 × 740 with touch, program A
- ![360 px: the line of gear „Wyposażenie: patyk w ręku” under the backpack row](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/A-360-gear-line.png?raw=true)
- ![360 px: the chronicle's paragraph of the encounter with „Mag bierze patyk z plecaka do ręki”](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/A-360-chronicle.png?raw=true)
- ![360 px: the rule of „Załóż” in the fight, program B3](https://github.com/mariusznazar/screenshots/blob/1fe6bc181d5119eee039443930bc77924eb25dfa/loop2/wyposazenie-postaci/slice-23/B3-360-fight-rule.png?raw=true)

## Own-work check (SKILL.md section 3)

- The requirement most likely not met: *To do* 5 (the rule of „Załóż” never amber with „trwa walka” or „tylko w walce”, in a fight and out of it) and *To do* 3 (the chronicle's text of the refill). The check: read the colour and the reason part of the rule's row in all three states (out of combat before the first equip, in the fight, after it) by `getComputedStyle` and the row's text, for B3 and C, and the chronicle text for A, B3, C. It showed no reason beside „Załóż” in any state; for *To do* 3 it showed the mismatch of wording named below.
- The styleguide edit: read the claim against `world-area.tsx` and `body-row-cells.tsx` before writing, and the foundation check after `git add` (exit 0, 0 errors).

## Problems as observed

1. **The chronicle's wording of the refill.** The plan's Goal and *To do* 3 give the chronicle's text as „Bierze patyk z plecaka do ręki”; the game's chronicle shows the refill only as an element of the encounter's paragraph, „Mag bierze patyk z plecaka do ręki”, and I found no code or test that writes „Bierze patyk z plecaka do ręki” (grep over `src/` and `tests/`: only `GEAR_PLACES.mainHand.refill` = „bierze patyk z plecaka do ręki”, used with the prefix „Mag ” in `src/browser/view/combat-line.ts:54`). I did not change code: the task's own sentence says the line of combat names the actor on each element, and the chronicle's text of a fight is that line, so I read the two wordings as the same text said at two points of the task. If the human wants a separate chronicle entry without the actor, that is a change of the chronicle that no slice of the plan holds.
2. **A 12 px overflow at 360 px, not caused by this task.** The measurement of the skill (at minute 339, programs A and B3) says: `contentWiderThanItsBox`: `div.world-area` content 330 > box 318, and the `scene-sheet` sprites 128 > 32, 256 > 64; `outsideTheWindow`: one scene `img`. Read by the elements: `.scene-place` is 342 px wide and `.scene` 336 px inside a `.world-area` box of 318 px. The page does not scroll to the side. The stylesheet of the run screen (`src/browser/run-screen.css`) and the scene layout were not changed by any slice (`git diff main...HEAD --stat` lists only `styles.css`, +41 lines of gear tiles, and no `run-screen.css`), and the gear line and the tiles are not among the elements listed. I did not measure the base commit, so "pre-existing" is an inference from the diff, not a measurement. Outside the task's scope; I did not correct it.
3. No fault was found in a file an earlier slice changed, so nothing was fixed outside the slice's *Change*.

## Choices

- The seed search used the game's own `send` and `advanceMinutes` instead of the balance instrument: the question is "which seed of the game meets a wolf with health left", the functions are what the instrument calls, and it saves the build and the program files; cost if wrong: none, the screen of the real game was the check.
- Program C's condition „Przeciwnik ma poniżej 99 pkt” (the condition that holds only in a fight) makes „Załóż” a rule of the combat rules reached only in a fight; the alternative, `always → Załóż` at the top of „Walka”, equips at the first free minute out of combat and the fight has no equip turn to show. Cost if wrong: C shows a contrived program; B3 and the editor case show the same equip turn with the natural rule.
- The hand of B3 was emptied in the composed document (stick back in the backpack) because the program's own rule equips at minute 1; the loader accepted the document, which is the game's own check.

## Reach beyond the dispatch

- Read for the walk: `src/browser/sim/types.ts` (the shapes of `Action`, `Condition`, `Character`), `src/browser/sim/data/gear.ts`, `src/browser/sim/run.ts:780-840` (the attack cooldown), `src/browser/sim/game.ts` (`send`, `advanceMinutes`, `setProgram`), `src/browser/sim/understanding.ts`, `foundations/decisions.md` D-457 (to see whether it holds the chronicle's wording: it does not), `.claude/skills/loop2-play/compose-state.mjs`, and `src/browser/view/world-area.tsx`; and `tests/sim/reference-programs.mjs` and the files written by `npm run --silent balance -- programs --out` for the shape of a program. Reason: the handoff names no seed, no program and no state; the walk needed them.

## Working copies

- `.runs/executor-23/` (scripts, states, programs, screenshots, the local start's log), `.runs/screenshots/` (the clone of the public repository) and `.playwright-cli/` stood in the worktree and were removed with `rm -rf` by their full paths; the local start was stopped (`npm run local:stop`: `Local starts stopped: 1`) and the browser closed. The database of the start under `.runs/local-start/` stays for the next start to remove, as the skill gives. Kept in `reports/executor-23-walk/` beside this report: `compose.mjs` (builds the saved document: `node .runs/executor-23/compose.mjs <A|B|C> [searchFrom] [empty|start]` after `npm run build`; it read `.runs/executor-23/programs/forestDeepBest.json`, written by `npm run --silent balance -- programs --out .runs/executor-23/programs`), `send.sh`, `until.sh`, `poll.js`, `rowinfo.js`, `phone-measure.js` and `poll-A.txt` (the poll of program A's fight).

## Unread material

- `guidelines/coding.md` and `guidelines/testing.md`: not read; no code or test was changed, the one file changed is a guideline paragraph. (Had a fault been found in a product file I would have read them first.)
- `foundations/decisions.md` D-311 (10821-10982 now): not read; the edit changes no sentence of it, and I read the passage of the styleguide that quotes it. D-380: read whole (8367-8384).
- `task_frozen.md`: read lines 1-141 (the *To do* items 1-15 and the questions to line 141), which holds the passages named (30-39 and 55); the rest (lines 142-294) not read.
- `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `.claude/skills/loop2-balance/SKILL.md`, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `walkthrough.md`, `ui_check.md`: read whole.

## Searches not found or unclear

- „Bierze patyk z plecaka do ręki” as a text of the chronicle without the actor: not found in `src/`, `tests/` or `foundations/` (only in the task and the plan); see problem 1.
- The handoff's table "The foundation entries the slice names as F-numbers" is empty: nothing of it is needed by this slice.
- The handoff names the balance instrument for finding the seed; its documentation has no mode that reports the minute of the first wolf attack of a map run of a given program (`trace` writes the whole run), so I used the game's functions.
