**Status:** done with concerns

# Slice 15 — The card of a solved map counts with the chest and has no mark of a rehearsal

Worktree: `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. Base `16625f50`.

## Commit

- `0f810761` feat: count the take of a solved map from the chest in the line above „Wejdź”, and drop the rehearsal mark (D-189; D-251 withdrawn). Six files, committed by path.

## Files changed (added / removed lines)

- `guidelines/styleguide-browser-view.md`: 5 / 6. D-251 leaves the decision list of "The screen Mapy"; the warning under „Wejdź” leaves its text; the resurrection role speaks of zero uses (D-217); the end-window line speaks of "no use" in `danger` (D-185, D-216). Also fixed the stale prose near line 1050 that slice 14 reported.
- `src/browser/maps-screen.css`: 7 / 15. `.rehearsal-mark` rule and its comment removed; header and section comments rewritten (no D-251; resurrection role at zero uses).
- `src/browser/view/maps-screen.tsx`: 3 / 18. `rehearsalMark` import, computation and `<p className="rehearsal-mark">` removed; `entersLine` now gets `state.team.chest` at every map; header comment without D-251.
- `src/browser/view/trip-lines.ts`: 5 / 30. `REHEARSAL_MARK` and `rehearsalMark` removed; `clippedTake` import dropped; `entersLine` takes `Chest` (no `null`), doc says every map takes from the chest (D-189).
- `tests/view/maps-screen.test.mjs`: 33 / 54. Header without D-251. `withResurrection` (sets the old field `resurrectionReadyAtMs`) replaced by `withUses` (sets `resurrectionUsesSpent` and `resurrectionNextReturnAtMs`). Resurrection cases now read the uses. The solved-map case of „Wejdzie: …” expects the chest cut. The case of the rehearsal mark removed.
- `tests/view/trip.test.mjs`: 30 / 123. `rehearsalMark` import and its case removed (reason: D-251 withdrawn, no successor). Null-chest lines of the enter-line case removed (reason: D-189, a solved map takes from the chest); new case "the enter line of a map already solved is cut by the chest, as at any map". `died(state, usesSpent)` replaces the old-field helper; `BALANCE` imported for the count of uses.

Total: 83 added, 246 removed.

## Checks (command, exit code)

Baseline at `16625f50`, before my edits:
- `npm test -- tests/view/maps-screen.test.mjs`: exit 1, 2 failing (resurrection line text and old field, both in cases I changed).
- `npm test -- tests/view/trip.test.mjs`: exit 1, 2 failing ("six screens" preview expected `Wyniesie: nic` at a marked run; "death not yet settled" expected `progressLost` with uses left). Both pre-existing at base; both fixed in this slice (see Choices).
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0 (4 tests).

Test first (red):
- After editing the solved-map case of `maps-screen.test.mjs` only, before the code change: `npm test -- tests/view/maps-screen.test.mjs` exit 1. The case fails for the expected reason: `expected "Wejdzie: patyk 2", got "Wejdzie: patyk 6, jagoda 4"` (the view passed no chest for a solved map). The two resurrection cases failed there too, for their stale text.
- The new case in `trip.test.mjs` (the pure `entersLine` with a chest at a solved-map-shaped input) passed at once: `entersLine` already took a chest, so the view was the only place wrong. The red for this requirement is therefore the maps-screen case above, not the trip case. I did not invent a failing trip case.

After the change:
- `npm test -- tests/view/maps-screen.test.mjs`: exit 0 (20 pass, 0 fail).
- `npm test -- tests/view/trip.test.mjs`: exit 0 (9 pass, 0 fail).
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0 (4 tests).
- `npm run typecheck`: exit 0.
- `npx eslint src/browser/view/trip-lines.ts src/browser/view/maps-screen.tsx`: exit 0.
- `npx prettier --check` on the four changed JS/TS files: exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 7 errors, none for a file of my Change. Remaining (not mine): `tests/sim/trip.test.mjs:647` (D-251), `tests/view/account-screen.test.mjs:2746`, `:3129`, `:3134` (D-251), and `:3133`, `:3260`, `:5152` (quotations that no binding sentence holds).

Not run: the full `npm test` (the handoff says the gate is the orchestrator's or CI's). The one command's foundation and instruction checks are therefore not run by me here; the foundation check above is the part I ran.

## Own-work check (`SKILL.md` section 3)

- Requirement: at a solved map, "Wejdzie: …" must count what the send takes from the chest (task To do 1; D-189).
- Check: a node script over the built game (`send` on Las, solved map, chest `stick 2, berry 1`, plan take `stick 6, berry 4`), compared the line with the backpack after the send. Exit 0. Result: the line reads `Wejdzie: patyk 2, jagoda 1`; the backpack after the send holds stick 2 and berry 1; the chest holds 0 and 0. Line and send agree.
- Mutation: with the view passing `null` again, the maps-screen case goes red (the first red run above).

## Walkthrough and screenshot (`walkthrough.md`, `ui_check.md`)

- This change alters what a user sees: on the card of a solved map the figure of „Wejdzie: …” changes, and the warning under „Wejdź” disappears. So a walk applies.
- The walk through the running game was deferred by the handoff to a dedicated step after slice 17. I did not run it and did not run its plan of cases. Plan of cases, all unchecked for that reason:
  1. the figure of „Wejdzie: …” at a solved map in the browser, against the chest, unchecked;
  2. no warning under „Wejdź” at a solved map with a short chest, unchecked;
  3. screenshot of the card of a solved map (`ui_check.md`), unchecked;
  4. side observation: see concern 1 below (the solved-run line text).
- The state check of the changed components is the jsdom tests above, as the handoff says.

## Working copies

- `.runs/slice-15-executor/` held my logs, the decision index written by `decision_index.py` and a one-off check script. Removed with `rm -rf` by its full path after the commit. Confirmed gone. No git worktree was made, so no prune was needed. Remainder: none.

## Choices

- `entersLine` parameter changed from `Chest | null` to `Chest`. The view no longer passes `null`; the `null` branch in `sim/trip.ts` (`sendTake`, `takeFromNowhere`) stays for slice 16, as the handoff says. Rejected: keep `| null`, a type admitting a meaning that is gone. Cost if wrong: a caller passing `null` would fail `npm run typecheck`, which passes.
- Kept the `maps-who-enter` wrapper div around „Wejdź” although it now holds only the button, so the DOM kinds that existing cases assert stay as they are. Cost: one unneeded wrapper; removable later.
- Removed the rehearsal case and the null-chest lines (reasons above).
- Two pre-existing reds in `trip.test.mjs` fixed inside this file, which the handoff does not name and which are not strictly this slice's rows:
  - "six screens": `Wyniesie: nic` → `Wyniesie: patyk 3` at a marked run. Reason: D-189 as it stands ("brings its loot out to it as every other map run does") and `tripLoot`, which does not branch on the solved mark.
  - "death not yet settled": a death with the team's uses left settles as `resurrectionUsed`; the progressLost case now spends all uses (`BALANCE.resurrectionUses`) instead of setting the old ready moment. Reason: D-190 and D-217 (uses), task To do 3.
  These are changes to existing tests; the reasons are the sentences above. Flagged so the orchestrator sees them.
- Helpers in the maps test: `withUses(state, usesSpent, nextReturnAtMs)`; the time case reads 0 of 3 uses at 8 h and 1 of 3 at 9 h, next in 3 h (derived by hand: first return at 8 h, next 4 h later, `BALANCE.resurrectionRenewalRealMinutes` = 240).

## Concerns and questions

1. **Stale text on the screen of a manual run of a solved map (not fixed by me).** `SOLVED_RUN_TEXT` in `src/browser/view/trip-lines.ts` still reads "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki." D-215 as it now stands reads "… nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.", and D-189 says the same. So the screen tells the player a solved run takes nothing from the chest, which after this slice is false. The plan's table assigns D-215 to slice 17 ("written by Slice 11; Slice 17"), so I left the text and its pinned test (`SOLVED_LINE` in `tests/view/trip.test.mjs`) to that slice. Question: does slice 17 own this text change? My recommendation: yes, and it should not wait longer than slice 17.
2. **A case outside my list will go red on this commit (not touched).** `tests/view/account-screen.test.mjs:3129-3173`, "the mark of a rehearsal the earning loop cannot repeat stands under „Wejdź” …", mounts the whole screen Mapy and asserts `.rehearsal-mark` one under „Wejdź” (and none elsewhere). It fails now because the view no longer draws the mark. The file is not in slice 15's Change list, and the foundation check also flags its D-251 lines. Question: which slice takes it? My recommendation: the same removal as in `maps-screen.test.mjs` (D-251 withdrawn), in slice 15 or the slice that owns that file. I did not edit it.
3. Other stale references outside my list, not touched: `tests/view/world-area.test.mjs:95` and `tests/view/account-screen.test.mjs:3250` still set `resurrectionReadyAtMs`, the old field; `tests/sim/trip.test.mjs:647` mentions D-251 (the foundation check flags it).
4. The walk and screenshot of the card of a solved map are the dedicated step after slice 17, as the handoff says. Until then the „Wejdzie: …” figure at a solved map is checked only by jsdom and by the own-work check above.

## Unread material

- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md`: not opened; the copied passages in the handoff were used.
- `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md`: not opened; the handoff's copy of slice 15 was used.
- `foundations/decisions.md`, D-188 (line 8527), D-180 and D-311: read only as the output of `decision_index.py` (sentence and Scope), not the Rationale. D-188 was in the handoff's list of entries to read whole.
- `tests/view/maps-screen.test.mjs`: read lines 1-110, 476-625, 710-790 and the grep hits; not read lines 111-475, 626-709, 791-932.
- `tests/view/trip.test.mjs`: read whole.
- `foundations/decisions.md` D-251: only its withdrawn row (line 11712), as the handoff's table gives it.
- `foundations/invariants.md`, `foundations/glossary.md`, `.the-way/elements/decisions/template.md`: not read (not named by the handoff).
- Decisions quoted by the altered cases but not altered (D-190, D-54, D-170, D-243, D-244, D-245, D-287, D-368, D-311's body): not read beyond the index.
- Read as the method and user rules require, though the handoff does not name them: `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, `walkthrough.md`; `a file of the author's private notes` and `git.md`.

## Searches not found or unclear

- "the cases that set the old field": read as `resurrectionReadyAtMs`, the team field that the state no longer holds (replaced by `resurrectionUsesSpent` and `resurrectionNextReturnAtMs`). Unclear whether the orchestrator meant something else; the field name is what the code and tests used.
- Callers of `resurrectionReadyAtMs` outside my list: `tests/view/world-area.test.mjs:95`, `tests/view/account-screen.test.mjs:3250`, `tests/sim/saved-game.test.mjs`, `tests/sim/team.test.mjs`. Found; not changed.
- Callers of `rehearsal-mark` or `REHEARSAL_MARK` in `src/`: none left after the change; in `tests/` only `tests/view/account-screen.test.mjs` (concern 2).
- The product skill for playing the running game (`.claude/skills/loop2-play/SKILL.md`) and the foundation's way to screenshots: not searched, since the walk is deferred.
