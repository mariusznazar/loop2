PASS 42784cabc5bbe2cd538b632ea85d7f581c085265

# Review — return step, task `petla-zarobkowa`

Range `34417de..42784ca`, one commit, four files: `foundations/decisions.md`,
`foundations/glossary.md`, `foundations/invariants.md`, `guidelines/coding-saved-game.md`. `git rev-parse
HEAD` is the head given. No code and no test changed, so no invariant test is altered.

No finding blocks: none is Critical or Important. Four are Minor. Every correction the step made says
what the code does; what remains is a wording the correction did not reach, one number's framing, one
relation of the same class as those added, and M-2, outside this range.

- **Trust boundary:** `src/browser/sim/saved-game.ts`; the range touches no code, so no hostile input
  reaches anything new. The guideline's sentence about it was checked against the code (below).
- **Irreversible operation:** raising `SAVED_GAME_VERSION`; the range does not touch it.

## Critical

None.

## Important

None.

## Minor

### m-1. D-229 still says "a stop" where M-8 asked for a stop by a death

`foundations/decisions.md:4349` (complies), `:4354-4355` (violates), `:4366-4367` (accepted cost),
`:4371-4373` (*Rejected*).

The return step's table says "a death stopped" went into "the binding sentences, the examples and
*Rationale*", and its *Choices* row names only *Rejected* and the accepted cost as left. The examples
were reached only in part: `:4349` still reads "a stop in the open game on a line that holds minutes
of an earlier return reading with no minutes", and `:4354-4355` read "a stop in the first game minute"
and "stops in the open game". D-228, the entry just above, uses the same words for „Zatrzymaj” (`:4307`,
`:4314`, "a stop is the player's own act"). Read that way, `:4349` says „Zatrzymaj” on a line holding
minutes leaves it with no minutes, which the code does not do: scratch check 2 shows the line
`[5, null]` unchanged by `stopLoop` and `[8, null]` after the next loop's return.

It stays Minor because the binding sentence now scopes the section and the new example at `:4350-4352`
states the opposite of that wide reading one line later, so no agent reading the entry whole is misled.
"a stop by a death" at `:4349` would close it; the report's claim about the examples should not be
repeated in the request as it stands.

### m-2. D-208's new numbers: "at most" holds for one program, and no source gives them

`foundations/decisions.md:3769-3770`.

The numbers reproduce. Measured independently, with the body the browser measures
(`{ version, basedOn, game }`, `src/browser/account-api.ts:363-365`), at game minute 300 and the 17-rule
program: Las 12 loops at 62,274 bytes, 13 at 67,248; Las — głębiej 10 at 60,768, 11 at 66,597. Those are
the report's figures less one byte each, which is the key `basedOn` against `revision`. M-9 is corrected
in the right direction. Three things stay:

1. "at most about 12 … or 10" is no ceiling. It is the count for that one program. The same measurement
   at game minute 300 gives:

   | Rules in the program | Las | Las — głębiej |
   |---|---|---|
   | 17 | 12 | 10 |
   | 6 | 16 | 13 |
   | 1 | 19 | 15 |

   The words "in practice fewer" point the other way from a shorter program. The report's concern 3 calls
   it an estimate at one game minute with one program; the entry does not say so. Game minute hardly
   moves it (12 fit at minutes 1, 60, 300 and 479 for 17 rules on Las).
2. The earlier 10 and 8 were quoted from Q12. These are the entry author's own, and the template says
   author-written *Rationale* "names no file, script or count"
   (`.the-way/elements/decisions/template.md:53-56`, WAY-05). A capacity estimate may fall outside what
   "count" means there, so this is a reading, not a plain breach; but a measured count in prose is the
   very thing that went stale in M-9, since it moves with the shape of the save.
3. *Origin* still names Q12 alone, and "Accepted with it" now holds a number the human did not see
   (`task.md:185` says 10 and 8). WAY-114 lets the human accept it at the merge, and the report's concern 3
   says the request should show the difference. The request has to do that; nothing in the entry does.

Minor because no behaviour rests on the sentence and the accepted cost reads smaller, not larger.

### m-3. D-227 does not link D-147, which is of the class the step linked

`foundations/decisions.md:4277`, D-147 at `:2735`.

D-147's binding sentence says "the map run keeps its last encounter's facts and shows a wrapping
paragraph", a statement of the map-run view in a map run, as D-133, D-186 and D-201 are, which D-227
narrows. An earning loop's map run shows it nowhere. The step's search looked for "during a map run" and
the like, so a sentence of this view that opens otherwise did not come up; its own-work check names that
limit in general terms under *Concerns*, item 4.

D-185 (`:3309`) and D-216 (`:3983`) are of the screens after an end, not "during a map run", so D-227's
stated area does not cover them word for word, and D-233 already reads those screens as the manual map
run's. I do not count them.

Minor because D-227's binding sentence already states the area where it prevails, "what the map-run view
and the program panel show during a map run stands for a manual map run", so no reader gets a wrong
rule; the missing link costs a later search of *Relations*, not a behaviour.

### m-4. `catch-up` stays narrower than D-230 (M-2, outside this range)

`foundations/glossary.md:226`, `foundations/decisions.md:4379-4381`. Not in this range, and the report
carries it as concern 1, so nothing new. Confirmed: the entry and the approved definition
(`definicja_mvp_loop2.md:2300`) read word for word alike, and D-230 runs the catch-up after a save lost
to another browser's, with the tab open.

Weighed against the step's duty on "a term used against its entry" (`return_step.md`) and against WAY-263:
this range neither writes nor restates the entry, D-230 names the wider set in its binding sentence, and
WAY-126 holds the wording to what the gate approved, so the fix is the human's. Leaving it for the
request is right, and "a later change of the definition can take it" must not stand as the end of it:
the request has to put it to the human.

## Declined to judge

- `guidelines/coding-saved-game.md:31-32`, „żaden czas rzeczywisty … nie wchodzi do wczytanego stanu
  gry”, read beside the new „chwilę zapisu bierze z dokumentu”: older wording, not in the range; in its
  place it speaks of time passed since the save.
- D-207's "about 1440 saves a day" (M-1): outside the range, a number of the human's answer, carried by
  the report's concern 2.
- `spec.md` section 11, "a line closes when its loop stops": the spec is a file of the cycle, not an
  entry; D-229 now says what binds.
- D-21, D-122 and `player-map-run-pace`, "a map run the player starts": the task keeps D-21 and D-122 as
  they stand.
- M-3 to M-7: findings of the whole review on the code, none in this range.

## Each correction, as verified

| Correction | Verdict | Evidence |
|---|---|---|
| D-229, a death stopped | True of the code, one wording left (m-1) | `loop.ts:176-202` writes nothing to the report, `:476-483` closes; scratch checks 2 and 3 |
| D-229, new complying example | True | Check 2: minutes 5, untouched by `stopLoop`, 8 after the later loop's return, one open line |
| D-229, a later loop opens its own line after a death | True | Check 3: a closed line of 486 minutes, generation 2, and a new open line of 3 |
| D-208, 12 and 10 | Figures reproduced; framing is m-2 | `capacity.mjs` |
| D-232, narrows D-121, D-143, D-198 | True; the binding sentence states the area | Each entry read whole; `advanceLoopRun` takes `stepMinute(...).run` alone, `loop.ts:240` |
| D-227, narrows D-166, D-174 | True; the binding sentence states the area | Each entry read whole; a further one of the class at m-3 |
| `coding-saved-game.md`, *Przebieg mapy po wczytaniu* | True | Below |
| Glossary `loop clock` | True, and it takes an entry | Below |
| `catch-up-minutes`, one name | No change of meaning | D-225's sentence "sets it to that reading"; `loop.ts:381`; citing tests stay true at `tests/sim/catch-up.test.mjs:217`, `:240` |

**The guideline's sentence.** Each clause holds. The manual run: D-212. „nie ma pauzy ani tempa”: `paused`
and `pace` are keys of the game state, `saved-game.ts:1141-1143`, and D-224 names them a breach for a
loop. „wraca trwający, bo dokument z zakończonym przebiegiem pętli to `shape`”: `saved-game.ts:1024-1029`,
D-224, `tests/sim/saved-game.test.mjs:1592-1594`, scratch check 1 (`{"ok":false,"reason":"shape"}`). „chwilę
zapisu bierze z dokumentu”: `saved-game.ts:1241`. „dolicza osobny krok po wczytaniu”: D-230.

**The guidelines' route for a changed meaning.** None is needed. WAY-172: "Using a meaning that a decision
of the product's log already carries takes no approval", and each clause uses a meaning D-212, D-224 or
D-230 carries. The sentence stands under `## Examples`, where nothing binds (WAY-168, coding template), and
`spec.md`, *Left to the maker*, left this sentence open. It repeats no entry more broadly and drops no
qualification (WAY-263): „Ręczny” is what D-212 says. The report's reading of the template on rows of
*Files of this kind* (`.the-way/product-guidelines/coding/template.md:166-169`) is right.

**`loop clock`.** The definition comes from D-225's first sentence. Every use agrees: 24 multi-line matches
of `loop\s+clock` and `clock\s+of\s+the\s+earning` over the tracked files, the only "clock of the earning
loops" gone from `catch-up-minutes`. The-way's glossary has no term ending in that word or in "loop"
(WAY-104). `- **Not:** none` is right: no other meaning stands in the tracked files.

**The author's own-work check.** It names the fair weak point, a sentence no link joins, and its limit
stands under concern 4. It caught D-166, D-174, D-121, D-143 and D-198. It would not catch a sentence of
another opening, which is m-3.

## Checks run

| Command or method | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `git diff 34417de..42784ca`, `git diff --word-diff=porcelain` on the decisions | 0 | One commit, four files; the word changes are those the report lists; every quoted Polish text in D-229 is unchanged, only re-wrapped |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | 0 | Both `a8dfe8a`; the pin stands |
| `node C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\0d8ce07c-d55f-4297-bde4-232d255aed44\scratchpad\rr17\capacity.mjs` | 0 | 24 rows: both maps, 17, 6 and 1 rules, minutes 1, 60, 300, 479; figures in m-2 |
| `node C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\0d8ce07c-d55f-4297-bde4-232d255aed44\scratchpad\rr17\ended.mjs` | 0 | Checks 1, 2, 3 as cited |
| `git status --short` after the checks | 0 | Empty; head unchanged |

Both scripts read the ignored build in `dist/`, which the author took at 11:52, after the last code
commit; the range holds no code and the worktree is clean, so it is the head's code. They write nothing
into the worktree.

An earlier form of `capacity.mjs` did not run (`node -I` is no option of Node); it was run again unchanged
without the flag, and nothing was read from the failed attempt.

**Not run:** the product's gate, `npm test` with no file, as the handoff gives; it is the orchestrator's.
No focused test file: none changed, and `npm test <file>` rebuilds `dist/` in the reviewed worktree. The
saved-game test's lines were read, not run; check 1 runs that refusal.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| The return step's duty | `.the-way/task-cycle/skill/return_step.md` | What the range is to have corrected |
| WAY-05, WAY-11, WAY-29, WAY-30, WAY-99, WAY-114, WAY-126, WAY-172, WAY-263 | `.the-way/foundations/decisions.md` | Prose in an entry, changing an approved number, a projected wording, a guideline's route, grading |
| Decision and glossary templates; `decide_entry.md`, `write.md` of the glossary skill | `.the-way/elements/` | The form of a relation and of a new term |
| `reading.md`; route and *Files of this kind* in the coding skill and template | `.the-way/product-guidelines/` | The handoff's check of the guideline |
| D-208, D-224, D-225, D-227 to D-233, whole | `foundations/decisions.md` | The entries corrected or that the guideline cites |
| D-121, D-143, D-166, D-174, D-198, whole | `foundations/decisions.md` | The entries the new relations narrow |
| The opening paragraphs of D-01 to D-221, filtered by `discover`, `understanding`, `map-run view`, `shows` and the phrases of the report's search, no whole-file reading | `foundations/decisions.md` | Whether a link was missed; found D-147 |
| `coding-saved-game.md` whole; header and index of `guidelines/coding.md` | `guidelines/` | The rule the sentence sits under |
| `away-report.ts:1-80`, `account-api.ts:355-380`, `saved-game.ts:100`, `:1141-1149`, `:1241`, `clock.ts` uses | `src/browser/` | Claims of the corrected entries; the body the limit measures |
| `tests/sim/catch-up.test.mjs:212-244`, `tests/sim/saved-game.test.mjs:1592-1594`, `tests/sim/acceptance.test.mjs:1-110` | `tests/` | Citing tests; the 17-rule program |
| `spec.md`, section 11 and *Left to the maker* | `.runs/task-cycles/petla-zarobkowa/` | Where the guideline's sentence came from |
| `definicja_mvp_loop2.md:2298-2300` | the vault | `catch-up` as approved |
| The author's `size.mjs`, read for its method only | session scratchpad | The measurement was then written apart, with the browser's own body |
| `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` | the owner's rules | The handoff's condition before a script |

## Searches not found or unclear

- Whether "count" in WAY-05 takes in a measured capacity estimate: unclear, see m-2.
- The human's conditions behind Q12's 10 and 8 (which program, which minute): not found in the task; the
  whole review says only that they were measured with a copy in the save.
