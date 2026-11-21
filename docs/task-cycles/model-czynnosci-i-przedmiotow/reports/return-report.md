done

# Return report — model-czynnosci-i-przedmiotow

Commit: `606048b4261ce45c14a864efa08471cfadc009e2` on `task/model-czynnosci-i-przedmiotow` (base `3a5548f15fdae665407a6954943d4324bf819fa1`). Files changed: `foundations/decisions.md` (+21 −3), `guidelines/testing.md` (1 line). No code, no test, no instruction file changed. Worktree clean.

## The foundation compared with the code

Method: read the entries whole in `foundations/decisions.md` (D-443, D-145, D-290, D-121, D-318, D-363, D-293, D-380, D-142, D-289, D-441, D-442, and D-128, D-120, D-193, D-18, D-82 whole; D-334, D-340, D-309, D-416, D-306, D-288, D-374, D-348, D-342, D-335, D-367, D-322, D-320 their binding sentences), the invariants `content-identifiers`, `icon-credits`, `judging-cache-reading` whole, and read `git diff aff09e98..3a5548f1` of `src/browser/sim/`, of the view files that carry the change (`item-target-pick.ts`, `rule-panel.tsx`, `rule-list.tsx`, `scene-picture.ts`, `discovery-rule.ts`, `knowledge-lines.ts`, `trip-plan.tsx`, `credit-lines.ts`, `credits.ts`, `judging-cache.ts`) and of the tests that cite the entries (by their `decision:` lines and by the bodies I opened).

Entries the change writes or changes, each with the code:

- D-443: both sentences stand. First: `ACTIONS.craft` and `ACTIONS.tend` name `itemTargets: { property }` (`src/browser/sim/data/actions.ts`), `itemTargets(kind)` in `src/browser/sim/action-targets.ts` filters `ITEMS` at each call, the check (`checkTarget` in `programs.ts`), the repertoire, the pick (`item-target-pick.ts`) and the instrument (`balance/describe.mjs`, `balance/trace.mjs`) ask it. Second: no kind of today changed (the diff adds `tend` and `craft` to `Action` and nothing else). Nothing no longer matched.
- D-145: `landUse` case `tend` uses one piece, gives `healing.health` through `tendedBody` capped at `BALANCE.body.startHealth`, and returns the state unchanged where health is full or no piece is held; `worldRefusal` gives „zdrowie pełne” before `lacking(...)`. Matches the second paragraph; the stick sentence untouched.
- D-290: five groups; `ACTION_GROUPS.crafting` is the fifth, after `foodAndCombat`; `tend` stands after `eat` in `foodAndCombat`, `craft` alone in `crafting`. Matches.
- D-121: `bandage.revealedBy = gathered moss`, `craft.revealedBy = gathered moss`, `tend.revealedBy = crafted bandage`; `happened` in `understanding.ts` gives `crafted` only where the piece count rises. Matches (no „Zdrowie poniżej”).
- D-318: `goalOf` lists `craft` and `tend` with `eat`; `USES_BACKPACK` holds both. Matches.
- D-363, D-293: `itemTargetPick` builds `Name (price)`, `itemTargetTime` gives the time only for `{ fromTarget }` minutes (recipe), `cellTimes` and `actionFieldValue`/`actionTime(state, kind, item)` carry the rest; the cell of „Wytwórz” has no time (minutes object, no item), the cell of „Opatrz” its own. Matches.
- D-380: `worldRefusal` cases `craft` (first missing piece in the recipe's order) and `tend` (full health before lacking). Matches.
- D-142: `landUse` pays at the end together with the effect; the attack path is untouched. Matches.
- D-289: the lists of what lies on tiles stay built from `RESOURCES` and the maps, `offeredItems` from `ITEMS`; `checkTarget` refuses moss. Matches.
- D-441, D-442: `contentFingerprint` (sixteen hex digits), `isContentFingerprint`, key prefix `loop2-judging-2|`, five fields, `markOfRecord` compares fingerprints; `isAboveLoaded`'s comment now says what it does. D-441's „at most one in 2^52” is met (the code's own bound is about 2^62). Matches; D-442's content revision unchanged.
- `content-identifiers`: names the item; `tests/invariants/test_content_identifiers.py` reads items. `icon-credits`: *Rests on* holds the two new facts, `credits.ts` holds both credits. `judging-cache-reading`: its sentence („the form the cache writes”) covers the fingerprint.
- Environment facts `game-icons-bandage-roll-title` and `game-icons-first-aid-kit-title`: I read both pages again (`curl` of `https://game-icons.net/1x1/lorc/bandage-roll.html` and `.../delapouite/first-aid-kit.html`): the headings read „Bandage roll icon” and „First aid kit icon”. The authors in `credits.ts` are Lorc and Delapouite as the facts say.

Entries the task names that the change leans on: compared D-18, D-23, D-26, D-60, D-63, D-71, D-82, D-120, D-126, D-128, D-140, D-142, D-143, D-193, D-206, D-401, D-309, D-291, D-306, D-310, D-334, D-340, D-387, D-416, D-27, D-427–D-429, D-437, D-439, D-440 and the invariants named, as far as their sentences meet the code (see Unread material for how far each was read). Two entries no longer matched in their *Verification*:

1. D-128, *Verification* `tests:` listed the revealing events the data hold as „the first gathered stick or berry … the first crafted campfire, the first finished „Zapal”, an attack of the wolf”. The data now also hold moss (the bandage and „Wytwórz”) and the first crafted piece of an item („Opatrz”). Corrected: „the first gathered stick, berry or moss, the first crafted campfire, the first piece of an item crafted, …”. The binding sentence is untouched, so no `decision:` quotation moves. The tests that hold it: `tests/sim/data.test.mjs` (the `ROWS` of the first gathered moss and the first crafted bandage), `tests/sim/craft-and-tend.test.mjs` (the case citing D-128).
2. D-120, *Verification* `tests:` listed „the actions no character skill grows, the walks and „Wędruj”, staying open”. „Wytwórz” and „Opatrz” grow no skill until task 6. Corrected: „the walks, „Wędruj”, „Wytwórz” and „Opatrz” with an item as the target”. Held by `tests/sim/action-targets.test.mjs` (case „neither verb is grown by a character skill …”, cites D-120).

No other mismatch found. Decisions checked and found true as written: D-23, D-26, D-60, D-63, D-71, D-126, D-140, D-143, D-193, D-387 (the code never writes the bandage's numbers into it), D-416 (icon from `ITEMS` in `knowledge-lines.ts`), D-291, D-306, D-334, D-340, D-309, D-374 (the two verbs go through `actionMinutes`).

Part map: the new files `src/browser/sim/action-targets.ts`, `src/browser/view/item-target-pick.ts`, `assets/icons/bandage-roll.svg`, `assets/icons/first-aid-kit.svg`, `tests/sim/action-targets.test.mjs`, `tests/sim/craft-and-tend.test.mjs`, `tests/view/item-verb-panel.test.mjs` are claimed by the globs `src/browser/sim/**`, `src/browser/view/**`, `assets/icons/**`, `tests/sim/**`, `tests/view/**`; `foundation_check.py` reports no unclaimed file. No change to the map.

Search of the foundation (words: item, resource, „zasób”, „przedmiot”, recipe, healing, „Opatrz”, „Wytwórz”, fingerprint, `ItemId`, `ResourceId`, `ACTIONS`, version 9/10): every use of „resource” in `decisions.md`, `invariants.md`, `part_map.md`, `environment_facts.md`, `glossary.md` read as a line; those that name what lies on maps stand (the map's data, the tiles, the card of a map, the scene, „Obchód”); none equates a resource with a thing of the backpack, except D-18's and D-120's „items”, which are items. The saved game's version: no foundation entry and no guideline states the numeral of the current version (D-206 and `save-version` speak of „the game's current version”; `guidelines/coding-saved-game.md` states none; „version 9 or above” in the invariant `previous-save-programs-reader` and in D-401 is the version that carried the content revision and stays true; `tests/sim/previous-programs.test.mjs` already reads version 10). Nothing to correct.

## Decisions written or changed

- D-444, new — „How do the game's data tell an item from a resource?” (the log's next number; the highest was D-443 and no withdrawn number stands above D-361). Placed at the end of the section „Gathering, campfire and backpack”. This is the choice that binds after the merge (WAY-36) and no entry held: *Questions carried to cycle* of the task and the spec's Decision 1 (widened items' table, resources the subset that lies on maps, the same identifier, no field naming the item gathering gives). Plan test: the rule binds later work (every item made after the bandage), so it is no row of a plan; of the five questions, none sends it elsewhere (it is no agent instruction, no code-style rule, no single value, no lack of a feature) and no entry answers it (D-443 speaks of verbs and targets, D-18 of data files). Neither the task nor the spec excludes an entry for it (the task's „Nowa decyzja nie dostaje własnego niezmiennika” is about D-443). Spec Decisions 2 (recipe and healing in the item's row — D-443's first sentence, and the single values go to data with the data tests), 3 and 4 (D-443's two sentences) and 5 (D-441, D-442) are already sentences of entries or are one value in data; I wrote nothing for them.
- D-128 and D-120: *Verification* only (above). D-145, D-290, D-121, D-318, D-363, D-293, D-380, D-142, D-289, D-441, D-442: unchanged in this step.

## Invariants, environment facts, glossary, part map

- Invariants written or changed: none in this step (the foundation step changed `content-identifiers` and `icon-credits`).
- Environment facts: none written; the two of the foundation step verified (above). No other source outside the product that the change rests on lacks a fact.
- Glossary: none. „Resource” and „item” are used in the meaning a reader who knows the field gives them (a thing gathered from the world; a thing carried), so WAY-95 gives neither an entry; „fingerprint” is a plain word the decision defines by what it equals. No glossary entry says something other than the code.
- Part map: no change.

## Projected entries written whole or in part; rows of *Settlements to record*

- Projected: D-443 (foundation step). Its sentences, *Scope*, *Based on*, *Origin*, *Rationale* and *Rejected* are the approved definition's; its *Relations* and its *Verification* `tests:` clause were `TODO` in the projected entry and the cycle filled them. I read the rule („a field the projected entry left `TODO` … makes the entry `the cycle's`, … a link written into its *Relations* does not”) as applying to the clause `tests:` too, which the foundation step reported as doubtful; I keep the mark `projected` for the entry as the foundation step gave it, because the clause names what tests hold and adds no meaning to the approved sentences, and I name the doubt here so the request can put the filled *Verification* before the human if it reads the rule the other way. Fix A removed the pair the step had carried (the tests hold the sentences).
- Rows of *Settlements to record* written: row 1 → D-289 (sentence); rows 2, 3, 14 → D-145; row 5 → D-121; row 6 → D-290; row 8 → D-363; rows 9, 13 → D-293; rows 10, 15 → D-380; row 11 → D-318; row 12 → D-142. Rows 4 and 7 go to data and icons (`src/browser/sim/data/items.ts`: 2 moss, 10 minutes, 25 health; `src/browser/sim/data/actions.ts`: „Opatrz” 10 minutes, icons `claw-hammer`, `bandage-roll`; `assets/icons/`), checked against the code and not entries.

## Meaning of each entry of this step (one sentence in English, one in Polish; mark)

- D-444 (`the cycle's`). EN: A resource is an item that some game map holds on its tiles, so an item no map holds, such as the bandage, has a row among the items and none among the resources. PL: Zasób to przedmiot, który jakaś mapa trzyma na kafelkach, więc przedmiot, którego żadna mapa nie ma, jak opatrunek, ma wiersz wśród przedmiotów, a wśród zasobów nie ma go wcale.
  - The pair carried (word for word; for the request to quote under the entry, since a pair kept for the part no test names by a `decision:` line makes the entry `the cycle's`; three data cases in `tests/sim/data.test.mjs` — the items' table, „the bandage is no resource and lies on no map”, „every item of a resource takes its words from the resource …” — hold it in fact, but they cite D-443 and carry no line `decision: D-444`, and this step writes no test):
    - complies: an item no game map holds, such as the bandage, standing as a row of the items' data with words of its own and with no row among the resources; the item of a resource taking its name, plural forms, icon and icon title from the resource's row
    - violates: an item no game map holds written among the resources of the data; the words of an item that is a resource written again in its item row; a resource whose gathering gives pieces of an item of another identifier
  - *Rejected* holds the two ways the task keeps (*Questions carried to cycle*): items with identifiers of their own and a field on the resource row naming the item gathering gives (cost kept: a one-time change everywhere the code takes the two for one thing), and the bandage written among the resources as a resource no map has (cost kept: every list of what lies on tiles must filter it out, for each item made after it too). The spec's further costs of these ways (the load admitting a tile that holds bandages) are the designer's and stay out, as the template gives.
- D-128 (*Verification* only, `the cycle's` as a correction of a field, no sentence changed). EN: The data's list of what reveals each thing now includes the first gathered moss and the first piece of an item crafted. PL: Lista tego, co odsłania daną rzecz w danych, obejmuje teraz pierwszy zebrany mech i pierwszą wytworzoną sztukę przedmiotu.
- D-120 (*Verification* only, `the cycle's` as a correction of a field, no sentence changed). EN: „Wytwórz” and „Opatrz” with an item as the target are among the actions no character skill grows and stay open with no predisposition. PL: „Wytwórz” i „Opatrz” z przedmiotem jako celem należą do czynności, których nie rozwija żadna umiejętność, i są otwarte bez predyspozycji.
- The entries of the foundation step and of fix A keep their marks and meaning sentences as `foundation-report.md` gives them (D-443 `projected`; D-145 rows 2, 3, 14; D-290 row 6; D-121 row 5; D-318 row 11; D-363 row 8; D-293 rows 9, 13; D-380 rows 10, 15; D-142 row 12; D-289 row 1 and `the cycle's`; D-441, D-442, `content-identifiers`, `icon-credits` and the two facts `the cycle's`).

## Guidelines

- `guidelines/testing.md` line 178: „z piętnastoma, siedemnastoma i tysiącem cyfr” became „z piętnastoma, siedemnastoma i dziewięciuset cyframi”, as the case in `tests/view/judging-cache.test.mjs` (`"0".repeat(900)`, under the stored value's 1 024 characters) holds. The other cases of the sentence (five fields, version 1 value, the fingerprint forms) match the test.
- `guidelines/coding-simulation-module.md`: the row of `src/browser/sim/action-targets.ts` (`copy`) stands since slice 7; checked, nothing to change.
- `guidelines/coding-browser-module.md`, table „Files of this kind”: `src/browser/view/item-target-pick.ts` has no row, and I added none: the guideline's own text (line 219–222 of the file) says a file added after the last audit of the table has no row and is no exemplar, and the table already lacks nine such view files (`judging-cache.ts` among them).
- `guidelines/coding-content-data.md`: no file of data was added; the table keeps its rows; its example (`resources.ts`, a catalogue checked by `satisfies` with the identifier from the keys) still holds.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` (from the worktree root) on the committed tree after my edits — exit 0, „0 errors”. (Run once on the base before editing — exit 0; the tests that cite the entries stand.)
- Not run: `python -B .the-way/instruction-files/check_instructions.py` (no instruction file changed); `npm test` and any test file (the handoff forbids the gate; I wrote no code and no test). `npx --no-install prettier --check guidelines/testing.md` fails, and fails the same on the base file (the file is not in Prettier's patterns; its tables are in another style), so my one-line change is no cause.

## Reaches beyond this handoff

- `.the-way/elements/decisions/template.md`, `elements\decisions\skill\read.md`, `decide_entry.md`, `elements\glossary\skill\read.md`, `decide_entry.md`, `write.md`, `elements\glossary\template.md`, `elements\common\rules.md`, `elements\common\way_of_working.md`, `elements\decisions\examples.md`: read for D-444 and the glossary decision, as the handoff names the `SKILL.md` and says to read what it names.
- `foundations/part_map.md` (first sixty lines, the globs of `browser-view` and `simulation`) to assign the new files.
- `guidelines/coding-content-data.md`, `guidelines/coding-simulation-module.md` (head), `guidelines/coding-browser-module.md` (table), `README.md` not read; `git grep` of `foundations`, `guidelines` and `.claude/skills` for `ItemId|ResourceId|RESOURCES|ITEMS|ACTIONS|resources.ts|items.ts` and of the version numerals.
- `curl` of two game-icons.net pages, to verify the two environment facts.
- `the author's global rules for git` (read before the commit).

## Unread material

- The task: read whole. The spec: read whole. `foundation-report.md` and `fix-a-report.md`: read whole.
- Decisions I read by their binding sentences only, from the task's quotations and a grep, not whole: D-23, D-26, D-60, D-63, D-71, D-64, D-50, D-126, D-140, D-143, D-179, D-181, D-206, D-401, D-310, D-387, D-27 (read to its *Rationale* start), D-291, D-306, D-288, D-374, D-348, D-342, D-335, D-367, D-322, D-320 (first lines), D-427–D-429, D-437, D-439, D-440, D-82 (to its first *Rationale* lines). Whole: D-443, D-145, D-290, D-121 (binding sentence and *Verification*; not its *Rationale* tail), D-318, D-363, D-293, D-380, D-142, D-289, D-441 (to the end of its *Verification*; the tail of its *Rationale* not read), D-442, D-128 (to *Rationale* start), D-120, D-193, D-18.
- Invariants read whole: `content-identifiers`, `icon-credits` (*Rests on* cut at 400 characters), `judging-cache-reading`; the others of the handoff (`program-closed-lists`, `program-world-reference`, `save-version`, `instrument-game-agreement`, `balance-instrument-file-writes`, `balance-instrument-repeatability`, `previous-save-programs-reader`) read as the sentences the task quotes, and `previous-save-programs-reader` as its line in `invariants.md`.
- Code: the `git diff` of the sim and the named view files read whole; `balance/describe.mjs`, `balance/trace.mjs` and the tests were not read whole (test bodies opened at the cases cited above only).
- `foundations/part_map.md`: the first sixty lines only; the verdict on the new files rests on its globs and on the foundation check's silence about unclaimed files.
- `guidelines/coding-saved-game.md`: grepped for numerals only.

## Searches not found or unclear

- A glossary entry that the change would move: none found (no entry for item, resource, backpack, recipe).
- `Scope` of D-443 is `simulation · browser-view` as the approved definition gives it; the instrument (`balance-tools`) is also bound by it and its tests, but I left the approved wording; unclear whether a later reading would want `balance-tools` there (nothing reads *Scope* but the part search).
- No `decision: D-444` line stands in any test; the pair of D-444 stands for that reason (above).

## Working copies

None made under `.runs/return/`. Two scratch files I wrote directly under `.runs/` for the foundation check's output and a Prettier trial (`.runs/return-check.txt`, `.runs/return-testing-base.md`, `.runs/return-testing-pretty.md`) were removed before the commit; the worktree is clean.
