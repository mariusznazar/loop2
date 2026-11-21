# Return step — task `ocena-programu-na-ziarnach`

**Status:** `done with concerns`

Worktree `.`, branch `task/ocena-programu-na-ziarnach`, from `f5d659f8` to `f21faa83`. `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink. Method: `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md`, `task-cycle/change/SKILL.md`; for the entries `elements/decisions/skill/SKILL.md` (with `read.md`, `decide_entry.md`, `template.md`, `examples.md` → WAY-03 read in `.the-way/foundations/decisions.md`), `elements/glossary/skill/SKILL.md` (with `read.md`, `decide_entry.md`, `write.md`, `template.md`, `examples.md` → `invariant` and `foundation` in the-way's glossary), `elements/common/way_of_working.md`, `elements/common/rules.md`.

## Commits

| Commit | Files (added/removed) |
|---|---|
| `f21faa83` docs: :card_file_box: name in the tests clauses of D-22, D-241, D-246, D-325 and D-329 the parts … the tests of this change hold, in place of the pairs …; call the twelve runs of a judging runs … in D-439's tests clause; … glossary entry judging …; … D-415's example … | `foundations/decisions.md` 41/45 · `foundations/glossary.md` 1/1 |

Added by path (`git add foundations/decisions.md foundations/glossary.md`); author address `mariusznn@gmail.com`. No code and no test changed.

## The foundation compared with the code

| Entry | Compared with | Result |
|---|---|---|
| D-439 | `src/browser/sim/judging.ts` (`judgeOnSeeds`: seeds and cap from `BALANCE`, `sendTake`, one backpack for twelve runs, `programOf`, `stepMinute` only, guards), `src/browser/sim/data/balance.ts:46-55`, tests quoting it | binding sentences hold. *Verification* `tests:` called the run of a seed „the map run of that seed”, against the glossary (`judging`: the runs are „no map run of the character”; `map run` ends only at a completion, a death or the player's stop): corrected to „the run of that seed”. No pair (removed by the fix). |
| D-440 | `src/browser/sim/judging-record.ts` (`rememberedOf`, `judgingMark`, `judgingsAfterSave`, `judgingsAfterDeath`), `programs.ts:387-401, 537-562`, `loop.ts:334`, `game.ts:708`, `saved-game.ts:1267-1290` | holds; no pair. Nothing changed. |
| D-243 | `src/browser/view/maps-screen.tsx` (start path, `asking`), cases of `tests/view/maps-screen.test.mjs` quoting it | holds (as rewritten by the fix); no pair left. Nothing changed. |
| D-329 | `tests/view/maps-screen.test.mjs` cases at 932, 970, 995, 1063, 1134, 1156, 1523 ff.; `tests/view/judging-lines.test.mjs` | the pair's judging part — button beside „Wejdź” on solved and unsolved maps, „Oceniam…”, the result under the character alone, gone at another program — is held by those cases. **Corrected:** that part moved into `tests:` (remembered judging beside „Program:”, the warning of unsolved seeds above „Puść w pętlę”, the button in the row after „Wejdź”, „Oceniam…” and inactive while counting, the result under that character alone, standing through draws and gone at another program, a new judging or leaving the card); the pair keeps only the role of „Wejdzie: …”, as at the base. |
| D-325 | `tests/view/maps-screen.test.mjs:932` | the pair's judging items (button at each character on solved and unsolved maps; violating: a judging only from the screen of a map run) are held by that case. **Corrected:** named in `tests:`; the pair keeps only the layout, word for word as at the base. |
| D-241 | `src/browser/sim/loop.ts` (counts), `saved-game.ts:1159`, `tests/sim/loop-record.test.mjs` (137, 145-197 for the three drivers, 199, 229, 255, 267, 281, 340, 436, 456) | the whole pair is held (three completions, a covered death, two completions → 2 in a row, record 3, open game and catch-up alike; the record gone with the loop). **Corrected:** pair removed, its part named in `tests:` (start at 0 and 0; raise only past the record; a death that does not stop the loop — covered, or of a character with no practice — resets the run and leaves the record, open game and catch-up alike; the next loop after a stop by a death or the player from 0 and 0; both numbers through a save and a load; a load refusing a run above the record or a record above the completions). |
| D-246 | `src/browser/view/away-report.ts`, `headquarters.tsx:121-145` (the record is part of the line's one text, drawn in the line's class), `tests/view/away-report.test.mjs` 241, 263, 288, 297, 308 | the wording, the declension, the place at the end, none at zero, none on a stopped line and the reading at each drawing are held. **Corrected:** that part named in `tests:`; the pair keeps only what no test holds: the role of the line with the record at its end (`text`), and the violating „the loop record in `positive` or beside the record of an earlier earning loop”. |
| D-22 | `judging.ts:76` (seeds from `BALANCE.judgingSeeds`), `tests/sim/judging.test.mjs` 159, 177, 249 | the pair (review-wf M-1) is held whole: one list in the data for every map (159), each run drawing from its own seed on three maps (177), the same lines whatever the game's last seed and map run (249). **Corrected:** pair removed, `tests:` names „a judging on the twelve seeds of the game's data, one list for every map, each of its runs drawing from its own seed, and the same judging giving the same twelve lines whatever the last seed and the map run of the game”. |
| D-190 *Rationale* | the earning loop's seeds (`loop.ts`, a new seed then the fifth generator's draw), `judging.ts` | „a judging … covers its twelve seeds alone, so an earning loop on other seeds may still cost the character all its practice” agrees with the code. Nothing changed. |
| D-165 (second sentence, the fix's, from *Decisions in play* word for word) | `src/browser/sim/types.ts:388-401` (`RememberedJudgings` keyed by `ProgramId`), `judging-record.ts:81-93`, `programs.ts:562` (a deletion erases the program's judgings), `saved-game.ts:1275-1290` (the load refuses a program the list lacks) | agrees. Nothing changed. |
| D-415 *Verification* pair | — (found by the glossary search) | „leaves the judging of both to the human” used the term `judging` in the field's sense, against its entry: **corrected** to „leaves both for the human to judge” (return step: a term used against its entry takes the use corrected). |
| D-04 *Rationale* („the sweep over many seeds know no clock”), D-24 *Rationale* („sweeping over many seeds becomes the only fair measure”), D-429 *Verification* („a sweep …”) | — | still true (the balance instrument's sweep; the judging reads no clock). Nothing changed. |

### Invariants (those whose *Part* names `simulation`, `browser-view` or `every`, 91 listed by a script over `foundations/invariants.md`)

- Deriving from a changed decision: D-22 → `map-run-repeatability`, `simulation-randomness`, `restart-seed`, `map-run-layout`, `instrument-game-agreement`; D-190 → `trip-run-end`, `resurrection-renewal`, `death-settled-once`, `catch-up-state`, `catch-up-death-moment` (only D-190's rationale changed); D-241 and D-246 → `loop-practice-payment`. None from D-243, D-325, D-329, D-439, D-440. None quotes or rests on a sentence the change altered: each speaks of map runs, the generators, a restart, the layout, the instrument's agreement, the practice paid, none of the earning loop's start, the screen Mapy, the report's record or the seeds of a judging.
- Read whole and held against the code: `simulation-randomness` (the judging draws no seed; `judging.ts` takes `BALANCE.judgingSeeds`), `map-run-repeatability`, `simulation-inputs` (`judgeOnSeeds` copies traits, builds its own backpack, and its tests freeze the inputs), `content-identifiers` (`judging-lines.ts` names no map, resource or archetype), `instrument-game-agreement` and `balance-instrument-repeatability` (`balance/engine.mjs:32` `DEFAULT_CAP_MINUTES = BALANCE.judgingCapMinutes`, no clock), `catch-up-state` (judgings are outside its character, chest and resurrection), `save-version` (`SAVED_GAME_VERSION = 9`, `saved-game.ts:85`), `loop-run-knowledge`, `trip-transfer` (its „each map-run start” does not reach a judging's runs, which are no map run by the glossary, and the judging takes nothing from the chest), `loop-practice-payment`, `restart-seed`, `map-run-layout`, `simulation-isolation`. All hold.
- No invariant written: no rule the task, a decision or the human sets asks for one.

## Decisions written or changed

D-22, D-241, D-246, D-325, D-329, D-439 (*Verification* only, no binding sentence), D-415 (*Verification* pair, one word). No binding sentence changed; no decision written.

| Entry | Mark | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-22 *Verification* | row 10 | The tests hold the seeds of a judging, so the pair goes and the clause names them. | Testy trzymają ziarna oceny, więc para przykładów odpada, a klauzula je nazywa. |
| D-241 *Verification* | row 8 | The tests hold the run in a row and the loop record, so the pair goes. | Testy trzymają ciąg i rekord pętli, więc para odpada. |
| D-246 *Verification* | row 9 | The tests hold the record's words, place and reading; the pair keeps only its role and a comparison. | Testy trzymają brzmienie, miejsce i odczyt rekordu; para zostaje tylko dla roli i porównania. |
| D-325 *Verification* | row 7 | The test holds the button of a judging; the pair keeps the layout only. | Test trzyma przycisk oceny; para zostaje tylko dla układu ekranu. |
| D-329 *Verification* | row 6 | The tests hold the button, the result and the mark; the pair keeps the role of „Wejdzie: …”. | Testy trzymają przycisk, wynik i znak przy liście; para zostaje dla roli „Wejdzie: …”. |
| D-439 *Verification* | rows 1–3 | A judging's run is called a run, not a map run. | Przejście oceny nazywa się przejściem oceny, nie przejściem postaci. |
| D-415 *Verification* | the cycle's (a use corrected) | The example says the human judges both, without the term „judging”. | Przykład mówi, że ocenia człowiek, bez słowa „judging” w znaczeniu ogólnym. |

No pair was added. Pairs kept, word for word, for the request: D-246 — complies „the lines of earning loops that went on in `text`, the loop record at their end included, and „Skrzynka jest pełna.” in `warning`; „Zatrzymaj” leaving the character's line open, so the next return of a later earning loop of that character adds to it”; violates „„Skrzynka jest pełna.” in `text` or `danger`; a line of an earning loop that went on in `text-secondary`; a later earning loop after „Zatrzymaj” opening a second line of that character; the loop record in `positive` or beside the record of an earlier earning loop”. D-325 and D-329: their pairs as at the base, `c36e2739`.

## Invariants written or changed

none

## Environment facts

none — the change rests on no source outside the product: 4000, the twelve seeds and the 64 KiB limit are the game's data and the server's own code (`src/server/account-routes.ts`, `savedGameLimit`).

## Glossary terms

- `judging` — changed in wording, not in meaning: „… on the twelve fixed seeds of one game map, which are no map run …” → „A judging is twelve runs of one character's program on one game map, each from one of twelve fixed seeds that are the same on every game map, the runs being no map run of the character and each able to end at a cap of game minutes, neither solved nor in a death.” (row 12). EN: the seeds of a judging are one list for every map. PL: ziarna oceny to jedna lista, ta sama na każdej mapie. D-439's first sentence („twelve fixed seeds of a map, the same seeds each time”), the approved projected text, is left as it is, as the handoff gives. Uses of the word listed with `git grep -i -w`: in English tracked text the noun stands in the meaning of the entry everywhere except D-415's example (corrected above); the uses at `foundations/decisions.md:1624` („an agent judging motion”) and `:4293` (D-401 *Rationale*, „judging whether the game reads clearly”) are forms of the verb in the field's meaning, not the noun of the term, and stay; `tests/password-measurement.test.mjs:408` („judging by its counts”) likewise.
- `loop record` — compared with `loop.ts` (the largest run in a row, from the start, gone with the loop): holds; unchanged.
- No new term.

## Part-map changes

none. `foundation_check.py` at `f21faa83` reports 0 errors, so every file git tracks is claimed: `src/browser/sim/judging.ts`, `judging-record.ts` and `tests/sim/*` by `simulation` (`src/browser/sim/**`, `tests/sim/**`), `src/browser/view/judging-lines.ts`, `judging-result.tsx` and `tests/view/judging-lines.test.mjs` by `browser-view` (`src/browser/view/**`, `tests/view/**`), `tests/invariants/source_lexer.py` by `test-helpers` (listed). The description of `simulation` („computes the game … the passing of game time, from the game's data, and holds the game's data”) covers the judging and its cap and seeds; `browser-view` („draws the game's screens”) covers the button, result and mark; the trust boundary `src/browser/sim/saved-game.ts` holds the load of the remembered judgings.

## Projected entries written whole or in part

none in this step (D-439 was written whole by the foundation step).

## Rows of *Settlements to record* written

none newly; rows 6, 7, 8, 9, 10 and 12 had their entries' *Verification* or wording corrected in place (D-329, D-325, D-241, D-246, D-22, `judging`). No row or projected entry was found missing.

## Code that no longer matches an entry (reported, not changed)

- **Comments and test titles call a judging's run a „map run”**, against the glossary (`judging`: „the runs being no map run of the character”; `map run` ends only at a completion, a death or the player's stop): `src/browser/sim/data/balance.ts:47` („a judging gives up a map run that has neither solved the map nor ended …”), `src/browser/sim/judging.ts:29-34` (docstring: „a map run of that map from each of the data's twelve seeds … Each map run is an earning loop's”), `tests/sim/judging.test.mjs:177` title „each seed's line is the map run of that seed …”, `:238` „a map run that neither solves the map nor dies by the cap is undecided”, `tests/balance/engine.test.mjs:67` „the default cap of a map run …” (the instrument's run there is a map run of the instrument; arguable). No behaviour is wrong; the engine's type is `MapRun`, which explains the wording. For the orchestrator: leave, or a one-commit wording fix of comments and titles (cost nil to the product; titles are quoted nowhere I found).

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` before the edits (at `f5d659f8`) | 0, „0 errors” |
| the same after the edits, before the commit | 0, „0 errors” |
| the same with `--skip-test-citations`, before the commit | 0, „0 errors” |
| `python -B .the-way/elements/common/foundation_check.py` at `f21faa83` | 0, „0 errors” |
| the same with `--skip-test-citations` at `f21faa83` | 0, „0 errors” |

Not run: the full `npm test` (the handoff: no full gate; nothing but the cycle's run or CI checks the whole before the merge); `check_instructions.py` (no instruction file changed); no test changed, so no test run of mine.

## Own-work check

- Requirement most likely missed: „leave a pair only for a part no test holds” — that I cut a pair item no test holds. Check: for each removed item I read the case that holds it (table above, with line numbers); where no case holds a part (D-246's role of the record and a comparison with an earlier loop's record — `tests/view/away-report.test.mjs` checks the entry's text and `danger: false`, not the drawn role, and no state holds an earlier record), the item stays in the pair.
- Second: every `decision:` line still quotes a binding sentence — the foundation check without `--skip-test-citations` gives 0 errors at the head.

## Reaches beyond the dispatch

- `a note in the author's private notes` and `git.md`, which the session's hooks gave before the listing script and the commit.
- `src/browser/view/headquarters.tsx:109-145`, to see how the record is drawn (role of the line).
- `tests/view/away-report.test.mjs:30-330`, `tests/sim/loop-record.test.mjs:1-340`, `tests/view/maps-screen.test.mjs:925-1185`, `tests/sim/judging.test.mjs:1-280`, to tell which pair items the tests hold.

## Working copies

- `.runs/return-step/` (a script listing the invariants of the touched parts and its output, the outputs of the foundation check, the saved diff of the decision log, the commit message file): removed by its full path (`rm -rf`, exit 0). `.runs` holds `local-start`, `quality-venv`, `task-cycles` only; the worktree is clean. No remainder; nothing kept beside this report.

## Unread material

- `foundations/decisions.md`: not read whole, by the method; read whole D-22, D-165, D-190, D-241, D-243, D-246, D-325, D-329, D-439, D-440, D-415 and the neighbouring D-242, D-244, D-245, D-326–D-328, D-330–D-332 (passed through on the way), and the lines a search for „sweep”, „judging”, „twelve seeds”, „fixed seeds”, „loop record”, „acts at once on the click” and „takes a new seed” found. No index of a selection was written: the entries to compare were named by the handoff and the search.
- `foundations/invariants.md`: the 91 entries of the touched parts and `every` listed by *Part*, *Derives from*, *Rests on*; 14 read whole (named above); the rest judged by their *Derives from* alone (none names a decision this change altered).
- `foundations/part_map.md`: the entries `browser-view`, `simulation`, `test-helpers`.
- `.the-way/elements/invariants/skill/SKILL.md`, `part-map/skill/SKILL.md`, `environment-facts/skill/SKILL.md`: not read — no entry of those elements written.
- `.runs/task-cycles/ocena-programu-na-ziarnach/plan.md`: not opened; the foundation report gives what the foundation step wrote.
- `review-whole-report.md`, `review-wf-report.md`, `whole-fix-report.md`, `foundation-report.md`, the frozen task: read whole.

## Searches not found or unclear

- The pair of D-246 for „beside the record of an earlier earning loop”: no test can hold it while the game keeps no earlier record; kept as an example, which may read as unheld forever — left so, since the template gives a pair for that.
- Whether the verb forms „judging motion” (`decisions.md:1624`) and „judging whether” (`:4293`) count as uses of the term: I read the term as the noun („a judging”) and left them; a stricter reading would rephrase them too.
