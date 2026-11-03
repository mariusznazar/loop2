# Slice 5 — The screen Postać in React

Status: **done with concerns** (the concerns are in "Choices" and "Searches not found or unclear").

## What changed and why

Commit `edb2862` on `task/ekrany-i-menu` (base `240d639`). Five files, 591 insertions, 17 deletions.

| File | Change | Why |
|---|---|---|
| `src/browser/view/character-screen.tsx` | new, +199 | `createCharacterScreen({ onBuy, onStop, props })` with `update(props)` and `dispose()`, built as `createMenuBar` is. `props` = `{ state, nowMs, characterId }`. Draws the name, generation from 2 up (`generationLabel`), archetype name, resurrection line (`resurrectionLine`, `danger` class when not ready), loop line (`loopLine`) with destructive `Zatrzymaj`, or the stopped line (`stoppedLoopLine`), and section „Umiejętności” once a known tree is also a predisposition of the archetype. Each tree row uses `skillText`, each branch `branchText`; „Kup” is disabled while `state.run !== null`, where no rank is affordable, or where the rank is maximal. Under the heading, while a run is set, the sentence „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.” with the map name from `MAPS`. Returns nothing when the character is not in the state. |
| `tests/view/character-screen.test.mjs` | new, +277 | jsdom through `tests/view/page-document.mjs`, imported first. 7 cases (see below). |
| `src/browser/view/headquarters.ts` | `resurrectionLine` wording | D-217: `Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie`; below an hour `Wskrzeszenie za {m} min czasu realnego — …`. Rounding up before the split is unchanged. Ready line unchanged (`Wskrzeszenie gotowe`, no class, which the DOM CSS already draws in `text-secondary`). |
| `tests/view/headquarters.test.mjs` | expectations | Every resurrection expectation now carries „czasu realnego” (the 9 expectations that end in `min${WARNING}`), with a comment naming D-217. |
| `src/browser/styles.css` | +93, appended | `.character-screen*` rules, tokens only; the 1344 px max-width is a layout value (D-280, D-43). |

The DOM form of the Umiejętności case in `tests/view/character-skills.test.mjs` is untouched (the plan removes it in Slice 9). `src/browser/view/character-skills.ts` is untouched; the React screen imports its pure functions only (D-265).

## Checks (command — exit code)

Focused checks named by the handoff, run from the worktree root:

- `npm run typecheck` — 0
- `npm test -- tests/view/character-screen.test.mjs` — 0 (7 pass, 0 fail)
- `npm test -- tests/view/headquarters.test.mjs` — 0 (18 pass, 0 fail)
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0 (4 tests OK)
- `npm test -- tests/invariants/test_browser_view_framework.py` — 0 (9 tests OK)
- `npm test -- tests/invariants/test_content_identifiers.py` — 0 (4 tests OK)
- `npm test -- tests/quality/test_quality_invariants.py` — 0 (5 tests OK)
- Prettier, the repository's flags: `./node_modules/.bin/prettier --check --no-config --no-editorconfig --ignore-path .gitignore <5 files>` — all formatted (two test files first needed `--write`, done before the commit).

Failing runs, written-first evidence:

- Wording (headquarters): with the new expectations on the old source (`git show HEAD:src/browser/view/headquarters.ts` swapped in for the run), `npm test -- tests/view/headquarters.test.mjs` exited 1 with 4 failing cases; with the new source it exited 0. Both logs are in the scratchpad (`hq_old_code.log`, `hq_new_code.log`).
- Purchase rule (own-work mutation): `disabled={run !== null || unaffordable}` changed to `disabled={unaffordable}` in `character-screen.tsx`; `npm test -- tests/view/character-screen.test.mjs` exited 1 with 1 failing case (the „Kup” case beside a waiting and an ended run). The file was restored and the screen test then exited 0.
- **Not done:** the screen component was written before its test file, so no failing run of the screen tests existed before the code. The one failure seen while writing the tests was a setup error (the ended run needed a resume through a discovery) and was fixed in the test, not in the code.

Not run, by design: the full `npm test` gate and `python -B .the-way/elements/common/foundation_check.py` (neither is in this slice's *Checks*; both belong to the orchestrator).

## Own-work check

- Requirement most likely missed: that „Kup” is inactive for a waiting or ended manual map run even when the points suffice, and that the sentence stands beside it (D-287, D-200). Check: the case „„Kup” is inactive with the sentence under the heading beside a waiting map run and beside an ended one”. The waiting run is `send` then `setPaused(true)`; the ended run is a real run resumed through its discovery until death at minute 243 (`run.death !== null`); the points are at least 3 (Zwiad at 3 is enabled before the run starts), so only the run can refuse it. Result: the sentence reads exactly as D-287 gives it in both states and the button is disabled. Mutation check above confirms the case fails when the run guard is removed.
- Second requirement: resurrection wording of D-217 and its moment: check the case of the resurrection line with `update` at 30 minutes before readiness and at the readiness moment. Result: `za 30 min czasu realnego`, then `Wskrzeszenie gotowe` without `danger`.

## Reaches beyond the handoff

- `tests/view/menu-bar.test.mjs` (head) and `src/browser/view/menu-bar.tsx` — the boundary pattern and the test shape of a React part, which the handoff names as the model in general terms.
- `tests/view/headquarters.test.mjs` — read where it had to change (it is in *Change*, not in *Read*).
- `src/browser/sim/game.ts` (exports `send`, `setPaused`, `advanceMinutes`, `end`) and `src/browser/sim/data/skills.ts` (branch ids: `practicedStep`, `scout`) — needed to build the test states.
- `tests/sim/acceptance.test.mjs` (death at minute 243) — how a run is driven to its death in a test.
- `src/browser/styles.css` (headquarters and skill rules) and `src/browser/tokens.css` — the look; `styles.css` is in *Change*.
- `src/browser/view/account-card.tsx` — only its header and `createAccountCard`, to confirm the boundary shape.
- `guidelines/styleguide-browser-view.md` — read whole (the roles and the Kup/Zatrzymaj rules).
- `.the-way/project-level/technology/reserved_choices.md` — read as `make-change` section 5 requires. No choice of this slice is reserved.
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` — read before the commit, as the user's instructions require.
- Not read: `.claude/skills/loop2-play/SKILL.md` (the screenshot route). Not needed: the screen is not placed on the page in this slice (Slice 8), so the screenshot is unchecked (below).

## Mismatches of plan and code

- None structural. The plan says the purchase case of `character-skills.test.mjs` is "written for this screen": I wrote the React equivalent in the new file and kept the DOM case where it is.
- The plan's *Read* names D-217 with the wording "za {m} min czasu realnego (below an hour)". Done as written.
- Plan item 12 asks the time to be rewritten "also while a manual map run waits". The screen takes `nowMs` on every `update` regardless of run state, and the test moves the moment with the run unset; the waiting-run case does not check the line moving. This is covered by construction, not by a case.

## Choices made (with the way rejected and its cost if wrong)

1. **Role of the sentence beside a waiting or ended run** (under the heading „Umiejętności”): `text-secondary`, as an explanation (D-40). Rejected: `warning` (D-39 gives it to "something is not carried out"; the sentence explains a state, it does not report a failure). Cost if wrong: one class name in `styles.css` and a styleguide decision for the Siedziba sentence in Slice 6 should follow the same choice. **D-287 does not give a role; this is the agent's choice — flagged for the orchestrator.**
2. **Headings**: the name is `h2`, „Umiejętności” is `h3` (the headquarters uses `h2` for its title and `h3` for its sections). Cost if wrong: a heading-level change.
3. **Missing character**: the component returns nothing (no error). Rejected: throwing, which would crash the page on a team change. Cost if wrong: a silent empty screen that a test would not notice unless it asks for the content.
4. **Max-width 1344 px** is set on `.character-screen` itself, not on the page. Rejected: leaving it to Slice 8 (the page could then place the screen without the cap). Cost if wrong: a double cap, harmless.
5. **Loop fixture in the test** is a partial `EarningLoop` (only `runNumber`, `completed` and `run.mapId`/`run.minute`, which `loopLine` reads), not a full loop built by the simulation. Rejected: building a loop through the simulation, which needs a solved map and more set-up. Cost if wrong: if `loopLine` later reads another field, the case would not notice it missing.
6. **Purchase focus case**: jsdom only shows that the same node keeps focus while it stays enabled; a purchase that disables its button loses focus in the browser (the harness moves focus away). That behaviour is not covered by a case here (browser check, D-88).

## Screenshot

Unchecked: the screen is not placed on the page in this slice (Slice 8 does it), so no running-product route applies (`ui_check.md`). Its states are checked in code by the 7 cases above.

## Commits

- `edb2862` feat: :sparkles: add the screen Postać in React with its skills, its loop line and its resurrection line

## Searches not found or unclear

- D-287 gives no role for the sentence beside a waiting or ended run (see Choices 1). Not found in the foundation.
- Whether the sentence under the heading is shown while the section is absent: the plan's wording puts it "under the section's heading", so it is shown only with the section. Not stated for the case where no tree is known; the section is absent there, so no sentence either. Unclear, flagged.
- The handoff names `ui_check.md` for screenshots; its route is in `.claude/skills/loop2-play/SKILL.md`, which I did not read (not needed while the screen is unplaced).
- `grep` for `Wskrzeszenie za|czasu realnego` in `src/` found only the new wording in `headquarters.ts`; no other place draws the old wording.
