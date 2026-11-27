# Return step report — task rana-i-opatrunek

**Status:** done

**Commits** (range base `be4e9c09`, head before the step `55c7d624`, branch `task/rana-i-opatrunek`, not pushed; author address `the author's private address`):

- `85a623e4` — docs: `foundations/decisions.md` only (the *Verification* of D-144, D-145, D-150, D-199, D-363, D-387, D-379, D-120, D-443, D-195, D-193, D-380, D-340, D-147, and the *Rejected* of D-416).

No code and no test citation was changed. The whole change is the one commit; no binding sentence of any decision was touched.

## The foundation compared with the code

Compared: the ten entries the foundation step wrote (D-379, D-144, D-150, D-145, D-387, D-290, D-199, D-363, D-380, D-120) against `src/browser/sim/` and `src/browser/view/` as they stand at `55c7d624` (after the fixes of slices 4 and 7, the whole-change fix, the stricter reader of a saved fight); the entries the task names unchanged; my own search; the part map; the glossary.

**What no longer matched, and its correction**

1. The *Verification* of seven entries still said „which no test holds yet” for parts that tests hold now (m-7 of the whole-change review). Each pair of examples was checked clause by clause against the tests that carry the `decision:` line or the behaviour; a part a test holds left the pair and went into the clause `tests:`; a pair stays only for a part no test holds:
   - D-144: pair for „Ucisk” removed whole (`tests/sim/pressure.test.mjs`: first pocket that holds the item, refill through the first empty pocket in the same turn, an item that fits no pocket refused, health of the turn, never above full, passed over at full health, opened to the buyer alone; `tests/sim/craft-and-tend.test.mjs`: „Opatrz” out of combat). The older pair for a creature's dodge and the end of an encounter stays as it stood.
   - D-145: pair removed (`tests/sim/craft-and-tend.test.mjs`: +5 for each bought rank, never above full with ranks bought).
   - D-150: pair removed (`tests/sim/pressure.test.mjs`, `tests/sim/tending.test.mjs`: the pair of „Ucisk” grows the tree, the tree among the mage's predispositions).
   - D-387: pair removed (`tests/sim/body.test.mjs`: 0.05 for each rank, stop at full health, combat standing still).
   - D-199: pair for „Ucisk” removed (`tests/view/character-skills.test.mjs`: price alone, no before-and-after value, decimal comma); the older pair for the heading, the keyboard and the price alone of „Obchód” and „Czysty płomień” stays.
   - D-379: pair for the ninth skill removed, `tests:` now says „the thresholds of the nine character skills” and names the four branches, their prices and effects (`tests/sim/tending.test.mjs`, `tests/sim/pressure.test.mjs`); the older pair stays.
   - D-363: the three parts for „Ucisk” that `tests/view/pressure-pick.test.mjs` and `tests/sim/pressure.test.mjs` hold moved to `tests:`; **one part no test holds, so a pair stays**: the row of a rule with „Ucisk — Opatrunek” standing with no price (`tests/view/rule-editor.test.mjs` checks that row for „Wytwórz — ognisko” only). This is the only pair left that the change wrote.
2. D-416's *Rejected* said „about 22 rows at eight trees and fourteen branches”; now „about 27 rows at nine trees and eighteen branches”, as D-199's copy of the same arithmetic.
3. Clauses `tests:` that the change's tests now hold and that no entry named, added: D-443 (the targets of „Ucisk” follow the healing property; a second item laid in a test; the check of a program refuses another item or none), D-195 (a tree enters with the pair whose verb and item the Understanding holds after the minute, one of them new in it, by neither alone — `tests/sim/tree-entry.test.mjs`), D-193 (a crafting and a tending of the bandage and a turn of „Ucisk” add one practice of „Opatrywanie małych ran”, a crafting of another item none), D-380 (the refusals of „Ucisk”), D-340 (the entry „Bierze opatrunek z plecaka do kieszeni” and none for a turn of „Ucisk” with no refill), D-147 (the outcome of a turn of „Ucisk” is the mage's own health, cut down to a whole number as the body row cuts it, with no creature's health). D-120's clause only re-wrapped (its text already matched `tests/sim/action-targets.test.mjs`, `tests/sim/repertoire.test.mjs`).
4. Binding sentences: every one of the ten entries and of the entries the task names agrees with the code (checked against `combat.ts`, `program.ts`, `skills.ts`, `body.ts`, `run.ts`, `understanding.ts`, `saved-game.ts`, `data/*.ts`, `view/character-skills.ts`, `view/combat-line.ts`, `view/chronicle-entries.ts`); none changed.
   - D-145: the text „increased by the bought ranks of „Mocniejszy zwój”” = `healingOf` (`skills.ts`) used by `run.ts` and `combat.ts`.
   - D-144: pockets in their order, the first slot that holds the item else the first empty slot the item fits, health of the turn, `tendedBody` for the cap.
   - D-387 / D-60: `bodyMinute(..., healthRegain)` with `BALANCE.body.healthRegain + skillBonus(..., "healthRegain")` outside combat only.
   - D-290: `ACTIONS` order puts „Ucisk” before „Załóż”.
   - D-380: `combatRefusal` gives „zdrowie pełne” before „brakuje 1 × …”.
   - D-120: `repertoireOf` keeps an action kind while one of its pairs is open.

## Decisions written or changed

Changed in place, binding sentences untouched: D-144, D-145, D-150, D-199, D-363, D-387, D-379, D-120, D-443, D-195, D-193, D-380, D-340, D-147 (*Verification*), D-416 (*Rejected*). Written new: none. No number was assigned.

## Invariants, environment facts, glossary terms, part map, projected entries

- Invariants: none written or changed. The four the task names (`instrument-game-agreement`, `program-closed-lists`, `action-duration-minimum`, `save-version`) agree with the code; no rule was set by the task, a decision or the human that one lacks.
- Environment facts: none written. The icon `bandage-roll` already has `game-icons-bandage-roll-title`, and „Ucisk” reuses it; the numbers of the old game stand, as for every other skill, in the decisions' *Rationale* (D-379, D-387), the foundation's practice.
- Glossary terms: none written, none changed. `gear` is used as its entry gives it (a pocket is gear); `combat turn` agrees with „Ucisk” as a turn action; `practice` agrees with the practice of a pair; `wall` stays at its old wording, as the task says task 3 writes the new one. The word „branch” of a skill tree stands in the foundation in its tree sense in hundreds of places, long before this change, and no sentence reads it in the other meaning; no entry.
- Part map: no change. The new files stand under `src/browser/sim/**`, `tests/sim/**` (`pressure.test.mjs`, `tending.test.mjs`, `tree-entry.test.mjs`), `tests/view/**`, `stryker.config.json` (build-tools), the two copies of the balance skill (agent-workflow); the full foundation check claims every tracked file.
- Projected entries: none (the plan gives this task none).

## Rows of *Settlements to record*, against the code

| Row | Place | Checked |
|---|---|---|
| 1 | D-144, third paragraph, first sentence (`9c89f880`) | true: `ACTIONS.pressure.combat`, `BRANCHES.pressure`; „Opatrz” has no combat effect |
| 2 | D-144, same paragraph, second sentence | true: `pieceSlots`, `combatPiece` (pockets, first holder, else first empty fitting slot with a piece in the backpack) |
| 3 | D-144, same paragraph, third sentence | true: `healed` → `tendedBody(body, healingOf(skills, item))`, cap by `tendedBody` |
| 4 | D-150 | true: `SKILLS.tending.grownBy` has `{ action: "pressure" }`; „tending” last among the mage's predispositions |
| 5 | code: `src/browser/sim/data/skills.ts`, `archetypes.ts` | true; held by `tests/sim/tending.test.mjs:105,120,127,147` |
| 6 | D-379, second paragraph | true: curve 10·28·60·110; costs 1·1·2, 1·1·2, 2·3, 3; effects 5, −2 min of „tend”, 0.05 |
| 7 | D-145 | true |
| 8 | D-387 | true |
| 9 | D-290 | true (`gear-editor`, `rule-editor`, `program-editor`, `pressure-pick` tests) |
| 10 | code: `src/browser/sim/data/actions.ts` (`icon: "bandage-roll"`) | true; `tests/sim/pressure.test.mjs:106`, `tests/view/icons.test.mjs` |

## The choices that bind after the merge (WAY-36), one by one

By the questions of the decisions template, in order; the first „yes” names the place.

1. **Words of the pocket's refill „bierze opatrunek z plecaka do kieszeni”** (paragraph „Mag bierze …”, chronicle „Bierze …” with no actor) — no entry. Question 3: a single text, in the data (`GEAR_PLACES.pocket.refill`, `src/browser/sim/data/gear.ts`), held by `tests/view/combat-line.test.mjs` and `tests/view/gear-words.test.mjs`. D-340 and D-457 already cover the refill of a slot generally, with the main hand's words as the example, so the pocket's words follow the pattern. D-340's *Verification* now names the pocket's entry. The review's m-8 (the words name the bandage) is the same text, kept by the orchestrator's last commit.
2. **„Uciska ranę” and the element „Mag uciska ranę: zdrowie {h}/{pełne}”, {h} cut down as the body row cuts it** — no entry. Question 3: a text and a number format, in the data (`ACTIONS.pressure.status`) and in one function (`whole` in `src/browser/view/body-row.ts`, used by the body row and the paragraph), held by `tests/view/combat-line.test.mjs:52,84`. No decision words the elements of the paragraph (none says „Mag odskakuje”); D-147 says the paragraph gives each action and its outcome, and its *Verification* now names this outcome. The cut-down of health is the body row's rule (the decision of the row of the body, with satiety and health cut down); the fix of I-1 applies it.
3. **Units of the previews and the decimal comma** — no entry. Question 3 for the units (`BranchDef.preview.unit` in `skills.ts`), question 2 for the comma (the styleguide's sentence „Liczba z ułamkiem w zdaniu reguły stoi z przecinkiem dziesiętnym”, which names the sentence of a rule; the previews follow by the same reason and `previewNumber` in `view/character-skills.ts` holds it, with `tests/view/character-skills.test.mjs:170,233`).
4. **The strike keeps its row and the main hand; an action whose data name a place reads it; the form `{ heals: "target"; place: "pocket" }`** — no entry. Question 3 (shape of data, `CombatEffect` in `data/actions.ts`, `pieceSlots` in `program.ts`) and question 5 for the strike (D-456: „Uderz — patyk” takes its stick from the main hand and from no other slot, held by `tests/sim/pressure.test.mjs:278`).
5. **Refill of an empty pocket only into an empty pocket the item fits** (review of slice 4, I-2) — no new sentence. Question 5: D-456 („An item whose data name no place fits no slot”) and D-457 („takes a fitting piece … into the slot”) already say it, held by `tests/sim/pressure.test.mjs:316`; D-144's *Verification* now names it.
6. **The reader of a saved game refuses a combat record with a turn of an action of a branch the run's character has not bought** (m-3; version 12) — no entry. Question 2: the guideline `guidelines/coding-saved-game.md` already says „Wolno odmówić więcej, niewolno mniej”, and D-386 (the load admits every game state the game's functions make) is no bar to refusing one they never make; held by `tests/sim/saved-game.test.mjs`. The raise of the version is a choice of the change, whose reason stands in the comment over `SAVED_GAME_VERSION`; D-206 and the invariant `save-version` hold the rule of a version.
7. **Limitation: `actionInRepertoire` does not judge an item action by its pair** — no entry (a lack, question 4, not a choice; the entries say nothing against it today). Kept as a question below.

## Questions for the orchestrator, with the evidence

1. **Gap in the code against the wording of D-120** (not fixed, as the handoff says; kept from review m-1). D-120 says an action is open when the skill its *pair of verb and target* grows is among the predispositions. `repertoireOf` (`src/browser/sim/understanding.ts`) keeps an action kind while *one* of its pairs is open, and `actionInRepertoire` (same file, `default:` branch) checks the item against the repertoire's items alone. With the bandage as the only target of „Wytwórz”, „Opatrz” and „Ucisk” the result equals D-120's; with a second recipe item or a second archetype, a rule whose item lies outside the archetype's pair would stay in the repertoire. Not a decision to change now.
2. `guidelines/coding-saved-game.md`, section „Wersja podnoszona razem z kształtem”: names the raises by shape and by ordinary actions and says a change of skills and branches „nie podnosi wersji sama”; it does not name the raise for an old document that describes a game the rules no longer make (the comment over `SAVED_GAME_VERSION` says it; review m-9, outside the task). Left as it is.
3. The styleguide's sentence on the decimal comma names the sentence of a rule; the previews of the branches follow it by analogy. Left as it is.
4. Where a `tests:` clause names a part, the sentence of D-144's third paragraph, first sentence („an action of combat that the bought branch Ucisk opens and that the player writes as a combat rule with a health threshold of its own, while „Opatrz” stays out of combat”) has no test with its own line `decision:`; tests hold its behaviour by the lines of D-379, D-120, D-140, D-309, D-145. I took the behaviour as held and left no pair; a line `decision:` for it would be a test change.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` before the edits: exit 0, `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the first batch of edits (D-387, D-144, D-145, D-150, D-199, D-363, D-379, D-120, D-443, D-195, D-193, D-416): exit 0, `0 errors`. I did not run it after each single entry; it ran after the batch, after the last three (D-380, D-147, D-340) as well: exit 0, `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py` (no switch) at the end: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 0 warn, 114 info`.
- The whole suite was not run (as the handoff says); nothing unchecked beyond that.

## Unread material

`foundations/decisions.md` is read in the entries named (D-387, D-144–D-147, D-150, D-191–D-197, D-199, D-120, D-121, D-140, D-195, D-206, D-290 (diff), D-340, D-363 (diff), D-379, D-380 (clause), D-386, D-416 (the lines that hold the counts), D-427, D-428, D-443, D-451–D-460), not the whole file (1.5 MB). Not opened whole: D-60, D-126, D-136, D-24, D-289, D-293, D-309, D-374, D-429, D-438 (their binding sentences are quoted in the task, and the code was compared against those quotations and the tests that cite them). `foundations/invariants.md` read for the four named invariants only. `.runs/task-cycles/rana-i-opatrunek/cycle.md` read in part (the return-step rows). The reports of the slices, reviews and fixes were searched for „return step”, not read whole.

## Searches not found or unclear

none. The searches by `pressure`, `Ucisk`, `tending`, `Opatrywanie małych ran`, `strongerRoll`, `deftHand`, `quickHealing`, `healthRegain`, `grownBy`, `healsInCombat`, `forestBandages` over the `.md` files of the repository (outside `.runs/`, `.the-way/`): only `foundations/decisions.md` holds them (all in entries compared above; the stray hits „under pressure” of D-360 and „tending to” of D-60 are the English words); `guidelines/` and the skills hold none except the count 24 in the balance skill's two copies, which is right.

## Working copies

None made. The output of the checks went to the session's scratch directory (files `dl.txt`, `fc0.txt` … `fc3.txt`, `ci.txt`, a list of the `decision:` lines of tests and the outputs of the checks above); the handoff names `.runs/return-step/` for working copies, which I did not create, and I removed those scratch files before returning, so nothing remains of mine.
