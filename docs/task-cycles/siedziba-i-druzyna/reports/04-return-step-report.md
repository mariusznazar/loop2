# Return-step report — task cycle `siedziba-i-druzyna`

- **Status:** done
- **Role:** the change's author, resumed for the return step (`the-way-make-change`; step 11 of `.the-way/task-cycle/skill/SKILL.md`, pinned `86b78ad`)
- **Base of this step:** `24bbc2d` (review PASS, gate run)
- **Commit:** `4a0521d` docs: record D-56, the number by which the game state and its map run tell a character apart — `foundations/decisions.md` +27 / −0
- The review's Minor and out-of-scope findings were not acted on.

## What I compared with the code, and what no longer matched

| Entry | Compared against | Matches? |
|---|---|---|
| D-50 (chest, part) | `GameState.team.chest`, `Character` without a chest, `send` refusing ids no team holds | yes |
| D-51 (empty team at a new game) | `newGame()` → `team.characters: []`; headquarters shows „Drużyna nie ma jeszcze postaci.” beside the creation row | yes |
| D-52 (name, trimming, repeats) | `characterName`, `createCharacter`, the field's `warning` message | yes |
| D-53 (send from the headquarters, „Zakończ” back) | `app.ts` swaps the headquarters and the run panel in one place; „Zakończ” → `end` → headquarters | yes |
| D-54 (order of creation) | `createCharacter` appends; headquarters renders in list order | yes |
| D-55 (one manual map run at a time) | `send` throws while `state.run` exists; „Wyślij” disabled during a run | yes |
| invariant `character-team` | `tests/invariants/test_character_team.py`, which passed in the gate | yes |
| glossary `headquarters` | every use of the word in code and tests (`headquarters.ts`, `app.ts`, `program-editor.ts`, invariant-test messages) means the screen outside a map run | yes |
| part map line `tests/invariants/test_character_team.py` in `simulation` | the file exists and is tracked; `foundation_check.py` 0 errors | yes |
| D-03, D-04, D-18, D-21, D-22, D-39, D-44 | DOM only; creation and sending go through simulation functions; created archetype in data (`CREATED_ARCHETYPE`); pace and seeds unchanged (`createCharacter` leaves `lastSeed`); the empty-name message is `warning`; „Wyślij”, „Załóż” and the name field are shared controls | yes |
| `content-identifiers`, `simulation-inputs`, `map-run-repeatability` | their tests pass (author run and gate) | yes |
| glossary `map run` („one attempt of one character at one game map …”) and `map run restart` („a map run of the same character on the same game map …”) | the run now names the team's character by `run.character.id`; `restart` keeps that id | yes, both stay true |
| part map `simulation`, `browser-view`, `product-foundation`, `agent-workflow` | `simulation`'s sentence („the game state, the map run, the character's program …”) covers the team and chest as part of the game state; `browser-view` „draws the game's screens” covers the headquarters; `agent-workflow` holds `guidelines/**`, whose `coding-browser-module.md` row already names `headquarters.ts`; file patterns all match | yes |

Search of the foundation and repository for stale words: `git grep -n -i "send panel\|send-panel\|sendTargets\|panel wysyłania\|sending screen\|archetypeId\|run\.character\|character\.archetype" -- . ':!.the-way'` finds no entry, guideline or instruction that speaks of a send panel or of a character held as an archetype in the map run. What it does find is code and tests, which use `run.character.at` / `run.character.id` correctly, plus `tests/sim/rules.test.mjs`'s check of the content-identifier scanner. **Nothing no longer matched; nothing was corrected.**

## What I weighed for new entries

- **Glossary „team”** — the test in „Which words take an entry” asks whether the product gives the word a meaning other than the one a reader who knows games gives it. In every use (D-50, D-51, D-54, D-55, `character-team`, `headquarters`, the code), a team is the player's group of characters with a shared chest. A games reader gives the word that meaning. No sentence of the foundation relies on a team's characters travelling together, which is the one reading that would differ. **No entry.**
- **Glossary „manual map run”** — used in D-55 for a map run the player starts and follows, as against an earning loop. That is the usual sense of „manual” beside an automatic loop. The bare term `map run` keeps its glossary meaning. **No entry.**
- **The character's identity by a counter, and the map run naming the team's character by it** — this choice binds after the merge (WAY-36): task 16's save stores the counter and the ids, and task 18's character-by-character catch-up finds characters by id. **Written as D-56**, below.
- **Environment facts** — the change rests on no source outside the product. The trimming in D-52 is the product's own rule; no invariant's sentence copies the meaning of white space from a standard. **None written.**
- **Settlement rows and projected entries** — rows 1–6, `character-team/1` and the part of „Whose is the chest?” that task 11 owns were all written in the foundation step. Nothing is missed.
- **Invariants** — none: no rule the task, a decision or the human sets lacks one. D-56 is kept by its example pair, and `character-team` already checks that the run's id names a character of the team.

## Entry written

**D-56 — How does the game state tell one character from another?** (`foundations/decisions.md`, after D-55)

> In the MVP each character carries a number the game gives it when the character is created, one
> more than the number the game state gave last, so the numbers of two characters of one game
> differ. A map run names the team's character it carries by that number.

- *Scope:* simulation, browser-view.
- *Relations:* derives from D-52: names may repeat, so they cannot tell characters apart.
- *Verification:* an example pair (complies / violates), proposed by me; the human accepts it at the merge.
- *Origin:* none.
- *Rejected:*
  - the name;
  - the place on the list;
  - a random number, which D-22 rules out for draws outside a map run's generators.

Meaning (pl): W MVP każda postać dostaje przy założeniu numer o jeden większy od ostatnio nadanego przez stan gry, więc dwie postacie jednej gry mają różne numery, a przejście mapy wskazuje swoją postać drużyny tym numerem.

The binding sentences start „In the MVP” and contain none of „only”, „never”, „always” or „without”.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors (`reports/04-return-foundation-check.log`) |
| `git status --short` after the commit | 0 | clean |

The commit touches `foundations/decisions.md` only, and no test reads its prose, so no other check is affected. Code, tests and the gate's results on `24bbc2d` stand unchanged.

## Reaches

- Step 11 of `.the-way/task-cycle/skill/SKILL.md` (read whole) and `.the-way/elements/decisions/skill/SKILL.md`, `template.md`, `common/way_of_working.md`, `common/rules.md` (already read in the first stage).
- `.the-way/elements/glossary/template.md` „Which words take an entry” (already read), applied to „team” and „manual map run”.
- D-22 read again for D-56's *Rejected*.

## Note for the orchestrator

This step committed `4a0521d`, so by step 11 a fresh reviewer reviews the range `24bbc2d..4a0521d` against the task and D-56.
