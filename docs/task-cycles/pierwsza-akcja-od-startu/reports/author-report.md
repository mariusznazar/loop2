# Author report — pierwsza-akcja-od-startu

Worktree `the root of the task's worktree`, branch `task/pierwsza-akcja-od-startu`, base `e6a95a9b`.
Method: `make-change`, the whole change as the one author. No subagent was dispatched. Nothing was pushed.

## Status

**done with concerns.** Everything of the task is made and committed, but the test of item 8 fails on the threshold: the new account solves **289 of 300** seeds, the account with everything discovered **290**. By the handoff the test and the threshold stand as they are (they were not weakened), and the cycle goes back to the human with this measurement (Q6). The second concern is a choice in item 5 that the cycle should confirm (section "Questions for the orchestrator").

## Commits

| Commit | What |
|---|---|
| `831f3c67` | `feat:` code of items 1–6 and 9, with the moved and the new tests |
| `1ee2a9f8` | `test:` the test of item 8, `tests/sim/new-account-first-pass.test.mjs` (fails by one seed, see below) |
| `17d83018` | `docs:` foundation entries (item 7, rows 1–3) |

`git log --format='%h %ae'` shows `mariusznn@gmail.com` on all three. `git add` was by explicit paths. `docs/task-cycles/` was not touched. Working tree clean after the commits (the report lies under the ignored `.runs/`).

## Files changed (added / removed lines, base to head)

Code: `src/browser/sim/data/actions.ts` 5/3, `src/browser/sim/data/skills.ts` 8/0, `src/browser/sim/game.ts` 5/4, `src/browser/sim/saved-game.ts` 10/2, `src/browser/sim/understanding.ts` 47/13, `src/browser/view/program-editor.ts` 0/12, `src/browser/view/rule-list.tsx` 1/4.
Tests: `tests/sim/discovery.test.mjs` 91/33, `tests/sim/data.test.mjs` 20/5, `tests/sim/copy.test.mjs` 5/4, `tests/sim/encounters.test.mjs` 4/3, `tests/sim/loop.test.mjs` 5/3, `tests/sim/repertoire.test.mjs` 10/12, `tests/sim/saved-game.test.mjs` 22/0, `tests/sim/skills.test.mjs` 5/1, `tests/sim/new-account-first-pass.test.mjs` 148/0 (new), `tests/view/chronicle.test.mjs` 28/2, `tests/view/discovery-band.test.mjs` 29/1, `tests/view/discovery-rule.test.mjs` 7/5, `tests/view/program-editor.test.mjs` 14/39, `tests/view/program-panel.test.mjs` 11/7, `tests/view/rule-editor.test.mjs` 21/16, `tests/view/run-screen.test.mjs` 7/3, `tests/view/status-row.test.mjs` 16/4, `tests/invariants/test_minute_span_split.py` 6/5, `tests/invariants/test_player_map_run_pace.py` 4/4 (wording only).
Foundation: `foundations/decisions.md` 125/66, `foundations/glossary.md` 1/1, `foundations/invariants.md` 20/0.

## What was made

1. `ACTIONS.explore` has no `revealedBy` (the field of `ActionDef` is optional, as it is for conditions). `newUnderstanding()` reads from the data what nothing reveals: „Zawsze” and „Eksploruj”. A new game holds both (D-118, D-128).
2. The first chill reveals „Wędruj” and „Temperatura poniżej” only.
3. The tree of Eksploracja is revealed by the first finished exploration: `SKILLS.exploration.revealedBy = { kind: "explored" }`, a field of the entry in the data (`SkillDef.revealedBy?`), read in `newlyRevealed`. The band names it beside what the exploration revealed (D-195).
4. „+ reguła” is never disabled (`rule-list.tsx`). `offeredActionKinds` had no user left and went with its tests (see Choices).
5. `advanceMinutes` writes „Zawsze → Eksploruj” at the first chill only where `holdsRuleWith(copy.program, "explore")` is false. The band and the chronicle entry say „Gra dopisała regułę…” only where the game wrote it (see Choices, the choice D1).
6. `loadSavedGame` refuses a document whose Understanding lacks what `newUnderstanding()` holds, with the reason `shape`; the version stays 6.
7. Foundation entries, below.
8. `tests/sim/new-account-first-pass.test.mjs`.
9. `tests/sim/discovery.test.mjs`, the test "a character of a new game whose program holds Zawsze → Eksploruj from the entrance makes the first discovery by game minute 20, on every map" (`// invariant: first-exploration-discovery`). It takes every map of the data, solves the others so that the map is open, and sends a character with „Zawsze → Eksploruj” from the entrance; the first discovery must fall by minute 20.

## Checks (command and exit code)

Focused, each `npm test <file>`; exit code 0 unless written otherwise:

- sim: `copy` 0, `data` 0, `discovery` 0 (49 pass), `encounters` 0, `loop` 0, `repertoire` 0, `saved-game` 0, `skills` 0, `first-map-balance` 0, **`new-account-first-pass` 1** (2 pass, 1 fail: the threshold).
- view: `chronicle` 0, `discovery-band` 0, `discovery-rule` 0, `program-editor` 0, `program-panel` 0, `rule-editor` 0, `run-screen` 0, `status-row` 0.
- Python invariants: `tests/invariants/test_player_map_run_pace.py` 0 (9 tests), `test_minute_span_split.py` 0 (9), `test_program_closed_lists.py` 0 (3), `test_simulation_inputs.py` 0 (2).
- Before the commits, every file of `tests/sim/*.test.mjs` and `tests/view/*.test.mjs` (except `memory-limit.test.mjs` and `page-document.test.mjs`, which start processes) was run once as `node scripts/test-node-file.mjs <file>` after `npm run build`, to find what the change moves; the failing ones were the files listed above, and they pass now. This is not the gate: no Python, `http`, account and quality tests were run.
- `npm run typecheck` 0; `npx prettier --check` on every changed TypeScript and JavaScript file 0; `npx eslint` on them 0.
- `python -B .the-way/elements/common/foundation_check.py` — my own-work check at the end, not the gate: **0 errors** on the committed head. Before the commit of the test file it reported the one expected error, that `new-account-first-pass` reads `test` and no tracked file cites it yet.

**Not run:** `npm test` with no argument and any other full run (forbidden by the handoff); the rest of the Python tests, `tests/http.test.mjs` and the other account tests; the mutation tool (StrykerJS; the reviewer of the change runs it for `simulation`); the manual check in a browser (optional, not made: the change draws no new component and no style, and the button's enabled state is covered by `rule-editor.test.mjs` on jsdom; a real-browser check of the enabled button and the band is left unchecked).

### Tests seen failing

- `first-exploration-discovery`: with `ACTIONS.explore.minutes` changed from 20 to 25 for a moment, `npm run build` then `node scripts/test-node-file.mjs tests/sim/discovery.test.mjs` gave 6 failing tests, among them "a character of a new game whose program holds Zawsze → Eksploruj … by game minute 20, on every map"; the value was restored from a copy and `npm test tests/sim/discovery.test.mjs` then gave exit 0.
- the refusal of item 6: with the check of `known.actions` taken out of `saved-game.ts` for a moment, "a crafted document of the current version is refused whole as shape" failed on "the Understanding without „Eksploruj”"; restored, the file's 38 tests pass (exit 0).
- `new-account-first-pass`: fails as written (exit 1), with the message "the new account solved 289 of 300 seeds, the account with everything discovered 290". It was never seen passing.

## The measurement of item 8 (for the cycle to take to the human)

- Program: the 21 rules in 5 groups of the handoff, an empty take list, written as a fixture in the test. Test: `tests/sim/new-account-first-pass.test.mjs` (precondition tests pin 21 rules in groups of 1, 2, 2, 7, 9 rules and the two „Eksploruj” rules).
- Seeds: map runs of Skraj lasu (`forestEdge`) sent from the entrance at the real moments `1760000000000 + index`, `index` 0 to 299, the same scheme as `tests/sim/first-map-balance.test.mjs`. Both accounts start from the game of a new account: `newGame()` for the account with nothing discovered, `newKnowingGame()` for the one with everything. The map run goes on, past each stop at a discovery, until a completion, a death or minute 5000.
- Result: account with everything discovered **290**, new account **289**.
- The seeds on which the two differ (index): **116** and **297** solved with everything discovered, not solved by the new account (death by hunger in game minute 274, both); **254** solved by the new account, not by the other account (it died of cold in game minute 342). The new account is behind by one seed. The same program solves 97 % of the seeds on the first map in the foundation (D-398), which agrees with 290 of 300.
- The measuring script was a throw-away in the scratchpad; the test itself gives both counts in its failure message.

## Own-work check (section 3)

- Requirement most likely not met: item 5, "the band and the chronicle say „Gra dopisała regułę…” only where the game wrote the rule". The state keeps no note of it (the choice D1 below), so the band is exact only where the player's own rule has been carried out or where there is none.
- Checks: `tests/view/discovery-band.test.mjs` and `tests/view/chronicle.test.mjs` have cases for a copy that holds the player's own rule (no sentence) and for the empty program (the sentence). A throw-away script (not kept) tried the case I expected to fail: a copy whose only rule „Zawsze → Eksploruj” stands in a group whose condition the Understanding lacks ("Temperatura poniżej 30"), so the character never explored and the game wrote nothing. Result: at the first chill the copy still holds one rule, and `chillRuleGroupName` gives `"Zimno"`, so the band **would say** the game wrote the rule. That case is not covered by a test (a test would pin the flaw); it is named in D-312's *Rationale* as an accepted cost.
- Requirement of the trust boundary (handoff, step 4): `saved-game.ts` against crafted Understandings. `tests/sim/saved-game.test.mjs` now refuses, as `shape`: no „Eksploruj”, no action at all, „Eksploruj” named twice, `actions` as the number 0 in place of the name, `actions` a text, `actions` missing, „Eksploruj” without „Zawsze”, a key added beside the lists. Every case is refused whole. The two that only the new check refuses (no „Eksploruj”, no action at all) are the ones that fail when it is taken out; the run stopped at the first of them, so the second was not seen failing on its own. The others were already refused by `uniqueOf` and `fields`.

## Reaches beyond the dispatch (section 1)

- `.the-way/elements/common/way_of_working.md` whole, `.the-way/elements/decisions/skill/{SKILL,read,decide_entry,projected}.md`, `.the-way/elements/decisions/template.md` lines 1–60, `.the-way/elements/invariants/template.md` lines 1–150 and `.the-way/task-cycle/change/ui_check.md` — the method of writing entries and the UI check; the handoff named the skills of the elements but not these files.
- `foundations/decisions.md`: D-96, D-206, D-213 (whole, to place row 2 and to see where the refusal of a state without „Zawsze” is recorded: nowhere as a decision, only in the guidelines), D-122, D-378, D-398 (whole), the tail of the log for numbering; `foundations/invariants.md`: `player-map-run-pace`, `first-map-stock`, `first-map-balance`, the end of the file, to place two entries.
- `guidelines/styleguide-browser-view.md` by search only (see Unread material).
- Source files outside the named places that the change reaches: `src/browser/sim/run.ts` (no change), `src/browser/view/{program-editor,discovery-rule,status-row,chronicle-entries,discovery-band-text}.ts*` and the tests above, to find what the change moves; `tests/invariants/program_fixture.py` for `newBareGame`.
- The vault definition: read only the sections of D-96..D-124, D-128, D-195 and the glossary entry at the lines named in the handoff; nothing was written there and no tracked file names it.

## Unread material

- `guidelines/styleguide-browser-view.md` (80 KB): **not read whole**. Read by search for „+ reguła”, disabled states, `discovery` and „Dodaj regułę z tym” (lines 29, 33, 156–180, 197–226, 261–311, 403–440, 519–587, 776, 830, 902–931). Nothing in the lines found makes „+ reguła” disabled until the first chill. The change draws no new component and sets no style.
- `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/examples.md`, `.the-way/elements/common/projected_mode.md`, `.the-way/elements/glossary/…` and the `SKILL.md` of `the-way-record-glossary-term` and `the-way-record-invariant` (the latter only its header): not read; `foundation_check.py` passes and the glossary and invariants entries copy the form of their neighbours. `.the-way/elements/invariants/template.md` was read to line 150 of its length.
- D-80, D-249 and D-362 were read only as they stand quoted in the task; their entries were not opened. D-362 was kept: no tracked file names the vault note or the instrument.
- Invariant entry `minute-span-split` in `foundations/invariants.md`: read through the docstring of its test only.
- The glossary file: only the entry „Understanding” and its neighbours.

## Searches not found or unclear

- Where the foundation records that the load refuses a state without „Zawsze”: not found as a decision (`grep` of the log for „Zawsze” near load, save, document); only `saved-game.ts` and the test. Row 2 became the new decision D-403.
- The task's *Context* lines for item 5 (`understanding.ts:469-482`, `discovery-band-text.ts:16-22`, `game.ts:746-770`) and the other cited lines had moved in the base; found by name.
- How the band can tell that the game wrote the rule without a new field in the saved state: not found. The saved state keeps no note of it, adding one changes the shape and so raises the version (guideline of the saved game, D-206), and the handoff and Q1 say the version stays. See D1.
- Task *Context* names `tests/invariants/test_player_map_run_pace.py:37, :166` and `test_minute_span_split.py:37`: the numbers in them (84, 104) still hold; only the wording "knows nothing" changed.

## Foundation entries (meaning in English and Polish; mark)

| Entry | English | Polish | Mark |
|---|---|---|---|
| D-118 | A new game's Understanding holds „Zawsze” and „Eksploruj”, and everything else is discovered in play. | Zrozumienie nowej gry zawiera „Zawsze” i „Eksploruj”, a resztę odkrywa się w grze. | projected |
| D-121 | A new game holds „Eksploruj”; the first chill brings „Wędruj” and „Temperatura poniżej”; the rest of the chain of discoveries is as it was; its *Verification* names the two new invariants and its example of the first chill is corrected. | Nowa gra zna „Eksploruj”; pierwsze wychłodzenie odsłania „Wędruj” i „Temperatura poniżej”; reszta łańcucha odkryć bez zmian; sprawdzenie nazywa dwa nowe niezmienniki, a przykład pierwszego wychłodzenia jest poprawiony. | projected |
| D-123 | The game writes „Zawsze → Eksploruj” at the first chill only where the copy holds no rule „Eksploruj”. | Gra dopisuje „Zawsze → Eksploruj” przy pierwszym wychłodzeniu tylko wtedy, gdy kopia nie ma reguły „Eksploruj”. | projected |
| D-124 | „+ reguła” adds a rule and opens its panel on the condition, and is never disabled; the example of the disabled button is corrected. | „+ reguła” dodaje regułę i otwiera jej panel na warunku, a nigdy nie jest wyłączone; przykład wyłączonego przycisku poprawiony. | projected |
| D-128 | What the Understanding holds from the start, an action as well as a condition, has no revealing event in the data; its example of a list naming what the chill reveals is corrected. | To, co Zrozumienie ma od startu, czynność tak samo jak warunek, nie ma w danych zdarzenia odsłaniającego; przykład listy w kodzie poprawiony. | projected |
| D-195 | A tree whose first action is known from the start enters with the first finished action of that skill. | Drzewo, którego pierwszą czynność gra zna od startu, wchodzi z pierwszą skończoną czynnością tej umiejętności. | projected |
| glossary „Understanding” | The Understanding holds „Zawsze” and „Eksploruj” from the start of a new game. | Zrozumienie od startu obejmuje „Zawsze” i „Eksploruj”. | projected |
| D-71 | The example of the first chill that discovers „Eksploruj” is corrected: the chill discovers „Wędruj” and „Temperatura poniżej”, and the game writes the rule where the copy has none. | Przykład pierwszego wychłodzenia poprawiony: odsłania „Wędruj” i „Temperatura poniżej”, a regułę gra dopisuje, gdy kopia jej nie ma. | the cycle's |
| D-313 | The example of „Dodaj regułę z tym” at the first chill is corrected: it adds „Zawsze → Wędruj”. | Przykład „Dodaj regułę z tym” przy pierwszym wychłodzeniu poprawiony: dodaje „Zawsze → Wędruj”. | the cycle's |
| D-312 | The band leaves the sentence out also where the game wrote no rule; the entry says how the band tells it and what that costs, and names the rejected note in the saved state. D-345 needed no change: it already says „where the game wrote a program rule”. | Pas pomija zdanie także wtedy, gdy gra nie dopisała reguły; wpis mówi, po czym pas to poznaje, ile to kosztuje, i nazywa odrzuconą notatkę w zapisie. D-345 bez zmiany: już mówi „gdy gra dopisała regułę”. | the cycle's |
| D-403 (new) | The load refuses a saved game state whose Understanding lacks „Zawsze” or „Eksploruj” as a shape the game does not admit, and the version of the saved game stays. | Wczytanie odmawia zapisu gry, którego Zrozumienie nie ma „Zawsze” albo „Eksploruj”, jako zapisu o niedopuszczalnym kształcie, a wersja zapisu się nie zmienia. | row 2 |
| `first-exploration-discovery` (new invariant) | A character of a new game whose program holds „Zawsze → Eksploruj” from the entrance makes its first discovery by game minute 20, on every map. | Postać nowej gry, której program ma „Zawsze → Eksploruj” od wejścia na mapę, daje pierwsze odkrycie najpóźniej w 20. minucie gry, na każdej mapie. | row 1 |
| `new-account-first-pass` (new invariant) | On Skraj lasu, the 21-rule program solves the map on at least as many of 300 seeds from an account with nothing discovered as from one with everything discovered. | Na Skraju lasu program z 21 regułami rozwiązuje mapę na co najmniej tylu z 300 ziaren z konta bez odkryć, co z konta ze wszystkim odkrytym. | row 3 |

Notes on the entries:

- The *Rationale* and *Rejected* of D-118, D-121, D-123, D-124, D-128 and D-195 are copied from the definition approved 2026-11-13 (e6c61098); *Verification* of D-123 stays as the foundation holds it (Q4), and *Origin* of D-121, D-123 and D-124 stays `none`.
- D-121's *Verification* header now reads `invariants: first-exploration-discovery · new-account-first-pass`. The definition leaves that field as `TODO`; I added the two names because the skill asks a decision to name the invariants that derive from it, and both derive from D-121. If the cycle holds that Q4 forbids it, the line goes back to `an agent compares a change with the decision:` and the two invariants keep `Derives from`.
- `new-account-first-pass` is written `Violated: no`, although its test fails today by one seed. Marking it `yes` is a decision to put before the human with the measurement; the entry says what the product is meant to keep.
- Both invariants derive from decisions of the log (D-118 · D-121, and D-397 · D-398 for the second); no source outside the log is named, and none of the vault notes or the instrument is named anywhere (D-362).
- No entry for the part map; the new test file is in `tests/sim/**`, which the part `simulation` claims.

## Choices (with the way rejected and its cost if wrong)

- **D1 — how the band knows the game wrote the rule (item 5).** The state keeps no note, and `chillRuleGroupName` tells the game's rule from the player's by the record of the map run: `run.minutesByAction.explore > 0` means a rule the player wrote has been carried out, so the game wrote none. *Rejected:* a note in the game state (a key beside `discovery`, or a flag on it). It changes the shape of the saved state, so the guideline of the saved game (`coding-saved-game.md`, "Wersja podnoszona razem z kształtem") calls for raising the version; that discards every saved game of the players (D-206) and contradicts the handoff and Q1 (the version stays), for one sentence of the band. Without the version raised the load would refuse every document of version 6 as a damaged one, which is the cost of raising it without the sentence about another version. *Rejected also:* deriving it from the copy alone (the band would say the game wrote a rule the player wrote, in the commonest case: the player added „Eksploruj” and explored) and from `ruleCounts`. *Cost if wrong:* the band names as the game's a rule „Zawsze → Eksploruj” of the player's own that the character has not carried out by the first chill (added in the last minutes of the game, or standing in a group with a condition the Understanding lacks — reproduced above), and says nothing where the player deleted every rule „Eksploruj” the character had carried out before the first chill. Both are written in D-312's *Rationale* as accepted. If the cycle holds the exact way to be worth a raised version, D1 is replaced by a flag and `SAVED_GAME_VERSION` 7, which moves `saved-game.test.mjs`, `previous-programs.ts` (it reads versions up to `SAVED_GAME_VERSION`) and its tests.
- **The tree revealed by a field in the data of the skills** (`SkillDef.revealedBy`), read as D-128 asks. *Rejected:* a rule in the code naming the exploration tree. *Cost if wrong:* a second skill with an action known from the start needs its own field; D-195 words it as a general rule and the field serves it.
- **`newUnderstanding()` and the load read what a new game holds from the data** (an action or a condition with no `revealedBy`). *Rejected:* literals `"always"` and `"explore"` in `saved-game.ts` (the existing check used the literal `"always"`). *Cost if wrong:* a later action or condition with no revealing event is required of every saved document at once, which is the meaning of "what a new game holds".
- **`offeredActionKinds` removed with its tests.** Only the disabled state of „+ reguła” used it; the picks of the action select are `actionPick`, which `tests/view/program-editor.test.mjs` already pins for what the removed cases pinned (`the actions of the pick stand in four named groups…`, `„Idź”, „Zbierz”, „Obchód”… with no target stand greyed`). Cause, by *Changing an existing test*: the function has no user and D-124 says the button is never disabled. *Rejected:* keeping a function only a test calls. *Cost if wrong:* a later change that wants the list of action kinds writes it again.
- **The test of item 8 keeps its own `FIRST_REAL_MS`** (one constant) instead of a shared fixture; no helper both tests needed (C1). The program is a local fixture in the test, named in no note (C2, D-362).
- **`Violated: no`** for `new-account-first-pass`, see above.
- **D-403 as a new decision** (row 2): the log holds none that answers "what does the load do with a state whose Understanding lacks…", D-206 being about the version and D-96 about the sentence. *Rejected:* an edit of D-206. *Cost if wrong:* one more entry.
- `tests/view/rule-editor.test.mjs`: the old test "„+ reguła” is disabled while the Understanding holds no action" became "…is never disabled…", for a new game and for a game with no action; cause: D-124 as approved.

## Problems as observed

- The test of item 8 fails by one seed (above). Cause not guessed: the two seeds lost by the new account end in death by hunger in minute 274; I did not look further.
- A run of the Python invariants through a backgrounded shell loop stopped after its first file (the shell ended); the four files were then run one by one in the foreground, all exit 0.

## Questions for the orchestrator

1. D1 or a note in the saved state with version 7? Recommended: **D1**, as made. The exact way costs every saved game of the players for a sentence of the band, which Q1 refused for „Eksploruj” itself; D1's two wrong cases are written in D-312.
2. Does the cycle take the failing test to the human as it stands, or mark `new-account-first-pass` `Violated: yes`? Recommended: take the measurement (289 against 290, seeds above) to the human first; the entry says what is meant to hold.
3. Is the line "invariants: first-exploration-discovery · new-account-first-pass" in D-121's *Verification* within Q4? Recommended: yes (the skill asks for it); if not, remove that line.
