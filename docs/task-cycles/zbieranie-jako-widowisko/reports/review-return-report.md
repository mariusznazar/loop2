PASS d457d2384990d4562491904732ea6811c80ce34e

# Review of the return step's commit — task "Zbieranie jako widowisko"

Range 8531d93d3c5cdc5b9572bce17c534d4bdadd228d..d457d238 (one commit, `git rev-parse HEAD` = d457d2384990d4562491904732ea6811c80ce34e).
Changed files: `foundations/decisions.md` +21/-6, `guidelines/styleguide-browser-view.md` +4/-3. No file under `assets/sprites/**` or anywhere in `assets/` is in the range (`git diff --name-only | grep assets` found none): the trust boundary is untouched.

## Blocking findings

none

## Minor findings inside the task

1. `foundations/decisions.md`, D-365 (*Rejected:* `none considered`). The decisions template (`.the-way/elements/decisions/template.md:59`) says `none considered` records that the human weighed no other way; `unknown` records that nobody knows. D-365 is the cycle's own entry, with no row and no human statement, so the field claims something nobody said. `unknown` is the accurate value. Evidence: template lines 59 and 62-65; the return step's report lists it as "the cycle's" with no source. `foundation_check.py` does not catch it.
2. D-365 binding sentence, "Any other reading shows none". Read literally this contradicts the code: `scene.tsx` keeps a running effect through later readings (the clock redraws every 200 ms and an effect lives 300 ms, so it must survive them) and leaves it frozen at a stop (D-322; `styles.css` `.scene:not([data-standing="going"]) * { animation-play-state: paused }`). What the code does is that any other reading *starts* no effect. The second clause of the same sentence ("an effect that comes while another still runs takes its place") implies the running one persists, so a careful reader resolves it, but an agent could implement "clear at the next reading". Suggested wording: "Any other reading starts none".
3. D-365 binding sentence, "places the effect at the mage as it stood at the previous reading". The code passes `current.x` (`scene.tsx`, the call of `sceneEffect`), which is `Shown.x`, documented as "where it stands or walks to". At 16x a gathering (625 ms) can end while the 640 ms walk is still running, and the effect then lands at the walk's destination, not where the mage is drawn. The difference is at most about 200 ms of walk, so it is small, but the entry says "as it stood".
4. D-362 *Rationale* (added sentence): "The mage reaches the sticks and the moss walking left and the bush walking right". The places are sticks 42, moss 32, bush 224, clearing 144, right edge 275 (`src/browser/sim/data/scene.ts`). After "Eksploruj" or "Idź" the mage comes from 275 and reaches the bush walking left, and from the moss to the sticks it walks right. The statement holds only for the usual walk from the clearing. The conclusion (the prop's side from the data, not the walk's direction) holds even more strongly, so the wording should say "usually" or drop the directions.
5. Report form (WAY-134, `foundation_step.md`): for the changed D-362 the return step's report gives the added sentence in English and a mark, but no one-sentence meaning in Polish. D-365 has both. The mark "the cycle's" for the facing is reasonable (no row carries it).

## Minor findings outside the task

1. `foundations/glossary.md`: "reading" (the game state one simulation call gives, with its events) is used by D-04, D-339, D-317 and now D-365 in a product sense with no glossary entry. No sentence a field reader would clearly misread, so Minor (WAY-95, WAY-297); the use predates this commit.
2. D-27 left unchanged: I agree with the return step, so this is not a finding against the commit. D-27's binding text says the footer and the section "each credit each icon with its title … its author … its page on game-icons.net and its licence", and that stays true of every icon; it does not say they hold nothing else. Its *Verification* complies example (campfire icon credited in the footer and the folded section) is still true. The pack's row is governed by D-271 ("the game credits each pack whose licence asks for a credit") and `sprite-credits`. D-27's projected rewrite belongs to task 24. At most a Minor outside the task (the footer now holds a non-icon row), not Important.

## What I checked against the code at 8531d93d

- D-362 facing: `mageFaces` is in `SCENE_PROPS` (sticks right, bush right, moss left, no prop for fibre); `bendFacingOf` returns that side or null; `styles.css` mirrors the bend sheet only where `data-facing` and `data-bend-facing` differ. The Verification examples ("at the moss ... facing left", "back to the prop") match. Test `the bending mage faces its prop` passes.
- D-365 against `sceneEffect` and `Scene`: exactly one gathering end (`ends.length !== 1`), a backpack-spending action ends the effect (`USES_BACKPACK`: craftCampfire, lightCampfire, lightItem, feedCampfire, eat, which are all the actions `landUse` handles), no previous run or another character, `mapRunStarted`, standing other than "going", effect at `current.x`, a newer effect replaces by serial. All match except findings 2 and 3. The Verification examples match (the "Zjedz" case, the discovery stop, the first reading, no state field). "Obchód" with no gain shows nothing: consistent with D-363/D-364.
- D-317: Rationale wording only ("within a second" removed); the binding text is unchanged and equals the first sentence the task assigns. No "catch-up" misuse remains in the changed lines.
- The entries do not write what the task says it does not write: no rule of question 6 (lasting occupation / state of the whole scene) in D-317, no whole reduced-motion rule (the styleguide states it only for the mage, flight and dust; D-317's reduced-motion sentence is unchanged), no rule D with its condition, no scuffle cloud, no wolf, D-316 and D-27 not rewritten. D-362's "no effect of an ordinary event" is row 1's own wording.
- Styleguide section "The scene of a map run": the added D-365 reference and the third dropped-effect case match the code; "raz przez wszystkie swoje klatki" matches `SCENE_DUST` (8 frames, played once in 300 ms).
- No environment fact, glossary term, invariant or part-map change is required beyond what exists: `smoke-fire-particle-licence` and the part-map row (the pack in External context) are present; the choices left as table rows (timings, frame order, dust ramp, effect life outside the `no-preference` block, landing point, facing at fibre now in D-362) do not bind in a way that needs an entry (WAY-36) or are excluded by the task (whole reduced-motion rule). The return step lists no deferred entry.

## Declined to judge

- Whether the dust ramp and the bend frames look right (the human judges at the request).
- The code of the earlier range (reviewed PASS at 8531d93d).
- The projected rewrites of D-316 and D-27 (tasks 20 and 24).

## Checks

- `git rev-parse HEAD` -> d457d2384990d4562491904732ea6811c80ce34e; `git diff --stat` / `--numstat` 8531d93d..d457d238, exit 0.
- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0.
- `npm test -- tests/view/scene-picture.test.mjs` -> 40 pass, 0 fail, exit 0.
- Not run: the full `npm test` (forbidden by the handoff). No scene test file other than `scene-picture.test.mjs` was run.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md` (lines 50-75) and `.the-way/foundations/decisions.md` WAY-36, WAY-95, WAY-134 and the *Rejected* passage near line 805: to judge the `none considered` value and the entry-needed question.
- `foundations/invariants.md` `sprite-credits` (lines 1279-1287): to confirm the entry the return step says it left as the foundation step wrote it.
- `src/browser/styles.css` lines 1700-1950, `src/browser/sim/run.ts` `finishGathering` / `landUse`, `src/browser/sim/data/scene.ts`: to check the entries against what the code does.

## Foundation entries read whole

D-362, D-363, D-364, D-365, D-317, D-271, D-27, D-316 (whole), `foundations/glossary.md`, `foundations/part_map.md`; the styleguide section "The scene of a map run" and the `panel` Roles row (line 17), plus the exceptions paragraph near lines 115-135.

## Unread material

D-271 *Based on* facts (`smoke-fire-particle-licence`, `cc-by-3-adaptation-credit`) were not reopened in `environment_facts.md`; `foundation_check.py` passes and the task did not put them in doubt. D-318 to D-322 and the other decisions of *Decisions in play* were read by title and the quoted passages of the task, not whole. `guidelines/coding.md` and `guidelines/testing.md` not read (no code in the range).

## Searches not found or unclear

- No rule says what the *Rejected* field of a cycle's own entry (no row, no human statement) takes; the template covers only rows ("`none considered` where the human said so, or `unknown`"). I read `unknown` as the fit (finding 1).
- The handoff's "Roles row" has no separate return-step change in this range (the `panel` row text at styleguide line 17 is unchanged by this commit).
