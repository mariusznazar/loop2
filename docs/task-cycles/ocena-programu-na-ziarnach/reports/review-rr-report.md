PASS f21faa83

# Review `rr` — return step of task `ocena-programu-na-ziarnach`

Range `f5d659f8..f21faa83` (one commit, `f21faa83`); `git rev-parse HEAD` in the cycle worktree is `f21faa83c416a4ed9a453f3dd3630a6812f3026b`, equal to the head given. `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink. Method: `.the-way/task-cycle/review/SKILL.md` (review-change), the return step judged by `.the-way/task-cycle/skill/return_step.md`, the decisions template `.the-way/elements/decisions/template.md` (*Verification*, lines 260-300) and the glossary template `.the-way/elements/glossary/template.md` (lines 36-90). The range changes `foundations/decisions.md` (only *Verification* clauses of D-22, D-241, D-246, D-325, D-329, D-439 and the complying example of D-415) and `foundations/glossary.md` (the definition of `judging`). No code, no test.

## Findings

### Critical

none

### Important

none

### Minor

**M-1 — Parts of the `tests:` clauses of D-241 and D-329 are held by tests that carry no `decision:` line of that decision** (in scope).
- Place: `foundations/decisions.md:8687-8688` (D-241: „both numbers going through a save and a load”) and `foundations/decisions.md:9984-9985` (D-329: „the judging remembered for the program the list shows beside „Program:”, the warning of seeds left unsolved above „Puść w pętlę””).
- What: the tests that hold these parts are real and assert them, but they cite other decisions: `tests/sim/loop-record.test.mjs:340` and `:352` carry only `decision: D-386`; `tests/view/maps-screen.test.mjs:1156` (and `:1218`) only `decision: D-440`; `tests/view/maps-screen.test.mjs:1523` only `decision: D-243` and `D-326`. The template (`.the-way/elements/decisions/template.md:278-281`) makes the `decision:` lines the link that finds the tests a `tests:` clause names ("the lines `decision:` find the tests, so the clause is no second copy of the link"). An agent who searches `decision: D-241` or `decision: D-329` to see what protects these parts finds nothing for them.
- Why Minor: a departure from the form of the template where the entry's content agrees with the code (WAY-364); no sentence is read wrongly — the parts are held, and D-329's binding sentence itself points to D-440 and D-243 for them. The return step did right to move the pair items out; only the link is missing.
- Evidence: `grep -n "decision: D-(241|329)"` over those test files (the lines above have none); the assertions read at `loop-record.test.mjs:340-365`, `maps-screen.test.mjs:932-968`, `:995`, `:1063`, `:1134`, `:1156`, `:1523`.
- Remedy, for the request's list: add a `decision: D-241 "Each earning loop also holds, …"` line to `loop-record.test.mjs:340` and `decision: D-329 "At each character in the section „Kto idzie” stand, …"` lines to `maps-screen.test.mjs:1156` and `:1523`, or narrow the two clauses to what the D-241 and D-329 lines reach.

**M-2 — Code comments and test titles of the judging call a judging's run a „map run”, against the glossary** (in scope; the return step's own concern, graded here; not in this range).
- Place: `src/browser/sim/judging.ts:19`, `:29-31` („a map run of that map from each of the data's twelve seeds … Each map run is an earning loop's”), `src/browser/sim/data/balance.ts:47`, `tests/sim/judging.test.mjs:4-5` (header: „the judging of a seed is the map run of that seed”), `:99-100`, `:136`, `:177` (title), `:217`, `:238` (title), `:418`. The return step's list (`return-step-report.md`, *Code that no longer matches an entry*) names `balance.ts:47`, `judging.ts:29-34`, `judging.test.mjs:177`, `:238` and misses `judging.ts:19` and `judging.test.mjs:4-5`, `:99-100`, `:136`, `:217`, `:418`.
- What: the glossary's `map run` ends only at a completion, a death or the player's stop, and `judging` says its runs are „no map run of the character”; a judging's run can end at the cap. `judging.ts:29-34` says in one docstring both „a map run of that map … Each map run is an earning loop's” and „It is no map run of the character”. `tests/balance/engine.test.mjs:67` („the default cap of a map run”) speaks of the instrument's own run and I leave it out.
- Why Minor: no behaviour is wrong, the engine's type is `MapRun`, and each passage says in the same breath that nothing is paid, taken or settled, so no reader is led to wrong behaviour; a glossary-word finding with no sentence read wrongly is Minor (WAY-297). D-439's `tests:` clause, after this range, says „the run of that seed” while the test title at `:177` still says „the map run of that seed” — a wording drift only.
- Evidence: `git grep -n -i "map run" -- src/browser/sim/judging.ts tests/sim/judging.test.mjs`; `foundations/glossary.md:308-310`.
- Remedy: one wording commit of comments and titles („run”, „run of that seed”), cost nil to behaviour; or leave, as the orchestrator decides for the request's list.

## What I judged and found right

1. **Pairs moved into `tests:`** — each removed pair item checked against the test that holds it and its `decision:` line, word for word:
   - D-22: the pair (one list for every map, same twelve lines, no new seed, not from the last map run's seed) is held by `tests/sim/judging.test.mjs:159` (`decision: D-22 "A judging of a program (D-439) runs on the twelve fixed seeds of a judging, the same on every map"`, asserts `BALANCE.judgingSeeds` = 1..12), `:177` (same decision line; each of three maps' twelve lines equal a reference run from seeds 1..12, so one list on every map and each run from its own seed), `:249` (same line; the same lines after a `send` with `lastSeed: 987654321`). Pair removed rightly; the new clause says what they hold.
   - D-241: the pair is held by `tests/sim/loop-record.test.mjs:145` (three drivers: open-game end, real time, catch-up; C,C,C,D,C,C → 2 in a row, record 3), `:176` (death with no practice), `:229` and `:255` (record gone with a loop stopped by death or the player, next loop 0 and 0), `:137`, `:161`, `:199`, `:436`, `:456`, each with a `decision: D-241` line quoting the binding sentence. Pair removed rightly (save/load part: see M-1).
   - D-246: the record's wording, declension, place at the end, none at zero, none on a stopped line and reading at each drawing are held by `tests/view/away-report.test.mjs:241`, `:263`, `:288`, `:297`, `:308`, each with a `decision: D-246` line of the third paragraph. What stays in the pair — the roles (`text` for the line with its record, `warning`, `positive` forbidden) and a record beside an earlier loop's — no test holds: the DOM tests of the report (`tests/view/account-screen.test.mjs:3810-3850`) hold no loop record and no role of it. The pair still describes true cases (`headquarters.tsx` draws the record inside the line's one text).
   - D-325: „Oceń na 12 ziarnach” at each character on solved and unsolved maps — held by `tests/view/maps-screen.test.mjs:932` (`decision: D-325` and `D-329` lines; asserts the button on both maps). The removed violating item (judging only from the screen of a map run) is caught by the same case. The kept pair is word for word the base's layout item.
   - D-329: button after „Wejdź” (`:932`, asserts the row order), „Oceniam…” and disabled (`:995`), result under that character alone (`:995`), standing through draws and gone at another program, a new judging or leaving the card (`:1063`, `:1134`), each with a `decision: D-329` line. The kept pair is only the role of „Wejdzie: …”, which no test holds — right.
2. **No binding sentence or meaning changed.** Every hunk of `git diff f5d659f8..f21faa83 -- foundations/decisions.md` lies in a *Verification* field; D-439's first sentence and every other binding paragraph stand as at `f5d659f8`. Rows 6-10 and 12 of *Settlements to record* in `task-frozen.md` still match the entries (rows 6-10 by unchanged binding sentences).
3. **Glossary `judging`.** Old: „… on the twelve fixed seeds of one game map …”; new: „… on one game map, each from one of twelve fixed seeds that are the same on every game map …”. The meaning is kept and made exact: D-22 as fixed at `f5d659f8` says „the same on every map” (at `a65b8fa4` it said „of its map”), the code takes one list `BALANCE.judgingSeeds` (`src/browser/sim/data/balance.ts:51-55`), and row 12 („na stałych ziarnach mapy”) is true in both wordings. The entry is still one sentence (template line 86). The human accepts the reworded entry at the merge (WAY-114), so the request should show it.
4. **D-415's reword is needed and keeps its meaning.** „leaves the judging of both to the human” used the noun in the field's sense; read in the entry's sense („twelve runs of a program”) the example is false, so the word carried two meanings in English text (glossary template lines 62-67); `return_step.md` gives the correction of a use against its entry. „leaves both for the human to judge” says the same; the line is a complying example, not a binding sentence. The verb forms at `foundations/decisions.md:1624` („an agent judging motion”) and `:4293` („judging whether …”) are no use of the noun and rightly stay.
5. **What the return step left.** D-243 and D-440 carry no pair (only `tests:`); D-190's *Rationale* sentence on the judging („covers its twelve seeds alone …”) and D-22's *Rationale* („A judging takes the same seeds each time …”) agree with the code; D-165's second sentence agrees (`RememberedJudgings` keyed by `ProgramId`). No invariant names or quotes the word „judging”, twelve seeds or D-415 (`grep -i "judging|twelve|fixed seed|D-415"` over `foundations/invariants.md`, `part_map.md`, `environment_facts.md`: one hit, `invariants.md:1360`, about „a decent program of twelve rules”, unrelated); no invariant quotes a *Verification* clause, the only text changed. `foundation_check.py` reports 0 errors, so no tracked file is unclaimed. Environment facts: none needed.
6. **Trust boundary and irreversible operation.** The range does not touch `src/browser/sim/saved-game.ts` or any code; no crafted input to check. No operation that cannot be undone: the commit only edits two foundation files.

## Declined to judge

- `tests/balance/engine.test.mjs:67` „the default cap of a map run” — the balance instrument's run, not a judging's; outside the term `judging`.
- The binding sentence of D-22 as changed at `f5d659f8` („the same on every map”) — outside this range, judged by the earlier review; taken as given when grading the glossary change.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` in the cycle worktree | `f21faa83c416…`, equal to the given head |
| `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | both `19e5774a…` |
| `python -B .the-way/elements/common/foundation_check.py` in a worktree of `f21faa83` | exit 0, „0 errors” |
| the same with `--skip-test-citations` | exit 0, „0 errors” |
| `git diff --check f5d659f8..f21faa83` | exit 0 |
| manual: each removed pair item against its test and `decision:` line (list above) | held, except the linking gaps of M-1 |
| manual: `git grep -i -w judging` outside `.the-way`, uses of the noun outside the term's meaning | none left after D-415's reword |
| focused tests that read the foundation | none exist: no test under `tests/` (including `tests/agent_workflow/`) opens `foundations/decisions.md` or `glossary.md` (only comments name them); so none run |

Not run: `npm test` (the handoff forbids the full gate); `python -B .the-way/instruction-files/check_instructions.py` (no instruction file changed).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-22, D-241, D-246, D-325, D-326 (passed through), D-327–D-328 (passed through), D-329, D-439, D-440 (head), D-165, D-243 *Verification*, D-190 and D-22 *Rationale* sentences — to compare the clauses with the binding sentences.
- `git show a65b8fa4:foundations/decisions.md` (D-22) and `glossary.md` (`judging`) — to compare the glossary's meaning.
- `tests/sim/judging.test.mjs:1-264`, `tests/sim/loop-record.test.mjs:137-376`, `tests/view/away-report.test.mjs` (test list, 241-323), `tests/view/maps-screen.test.mjs` (test list, 932-968 and the decision lines of the cited cases), `tests/view/account-screen.test.mjs:3805-3830` — to verify which pair items tests hold.
- `src/browser/sim/judging.ts:19-40`, `src/browser/sim/data/balance.ts:44-56` — for M-2.
- `.the-way/elements/glossary/template.md:36-90` — for points 3 and 4.
- `task-frozen.md` lines 171-241 (*Decisions in play*, *Settlements to record*) — the handoff's passages section was empty.

## Working copies

- `.runs/review-rr/wt` — a detached worktree of `f21faa83` with `.the-way` initialized, for the foundation checks; removed with `git worktree remove --force` (exit 0) and `git worktree prune` (exit 0), then the empty directory `.runs/review-rr` removed by its full path (exit 0); the cycle worktree's `git status` is clean. No `npm ci` was run. Nothing kept beside this report.

## Unread material

- The handoff's *Passages of the frozen task* and *The plan's sections* were empty; I read `task-frozen.md` lines 171-241 instead, not lines 1-170 (*Description*, *Questions to settle*, *Context*).
- `foundations/decisions.md`, `invariants.md`: not whole; the entries named above, and invariants only by search.

## Searches not found or unclear

- The handoff's passages and plan sections were empty — whether that was meant (return-step review, no slice) or an omission is unclear; I judged against the frozen task's *Settlements to record* and *Decisions in play*.
- Whether the template requires every part of a `tests:` clause to be reachable by a `decision:` line of that same decision, or allows a test linked through a decision the binding sentence references (D-329 → D-440, D-243): the template's wording implies the former; graded Minor either way (M-1).
