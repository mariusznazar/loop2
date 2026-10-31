FAIL

# Report — spec reviewer, revision, task `rozliczenie-przejsc`

Reviewed: the revised `.runs/task-cycles/rozliczenie-przejsc/spec.md`, against my report
`reports/02-spec-review-report.md` and the designer's `reports/03-spec-revision-report.md`. Read-only:
this report is the one file written. No gate run. Worktree head `95de83b`, clean, `.the-way` at
`a8dfe8a`. `python -B .the-way/elements/common/foundation_check.py`: 0 errors, on the foundation as
it stands; the spec's entries are not written yet.

All five earlier findings are resolved. The revision adds one new contradiction, in the row of
D-190.

## Earlier findings

| # | Finding | State | What settles it |
|---|---|---|---|
| 1 | The D-04 row marked stored moments as a violation | resolved | `spec.md:288` names the violation as the clock's current reading written into the game state on each reading, and says a stored moment of an event complies, a save's moment in task 18 included. Decisions 4 and 7 use the same words (`spec.md:130`, `:161`, `:174`–`177`) |
| 2 | D-03 repeats D-04's sentence | resolved | Row at `spec.md:289`. The sentence stands in D-03, D-04 and the comment `src/browser/view/game-view.ts:81`, which *Left to the maker* now names (`spec.md:322`) |
| 3 | The D-194 row left the sentence on a death | resolved | `spec.md:293`: the sentence loses the death, which D-190 carries, and the part on a run cut short stays |
| 4 | The D-189 row left its *Rationale* | resolved | `spec.md:291`: the old *Rationale* goes, and the approved one takes its place less two clauses. What is left (`definicja_mvp_loop2.md:1479`–`1485`) is true of the game after this task |
| 5 | D-179 listed as still true | resolved | Row at `spec.md:290`, and D-179 is gone from the list at `spec.md:302` |

The *Origin* the revision adds holds: `_zadania\rozliczenie_przejsc_loop2.md` exists in the vault,
and the form matches earlier entries.

## New finding

### 1. The D-190 row takes a *Rationale* sentence that the D-194 row, and the task, say is false

Kind: contradiction with the task and within the spec. New in this revision.

`spec.md:292`: “*Rationale* and *Rejected* gain the approved ones, in place of `unknown`”.

The approved *Rationale* holds, at `definicja_mvp_loop2.md:1527`–`1528`: “Rebuilding goes through
work: a new character sent to a solved map grows practice as a side effect, and better programs and
a fuller chest shorten it each time.”

- After this task a manual run of a solved map adds no practice to any skill (To do 2,
  `solved-map-manual-run`), and the earning loop does not exist yet, so a new character sent to a
  solved map grows nothing.
- Q4 and row 2 name that as the accepted cost: „nowa postać nie ma skąd wziąć wprawy”. The D-194 row,
  one line below (`spec.md:293`), carries it into the same commit.
- To do 22 gives the foundation step only the parts of the entry this task's code makes true, and
  the task's *Decisions in play* says the same of D-190. This sentence is made true by task 18.

The designer's report says the earning-loop wording “reads as a reason, not a claim about today's
game”. That fits „dying in the earning loop becomes the norm” and „a night can be lost”. It does not
fit this sentence, which says what a character does on a solved map.

Why it changes the build: D-190 and D-194 would state opposites side by side, and it is the case
finding 4 fixed in D-189: the row at `spec.md:291` cuts clauses „not true before task 18”, by the
designer's own test, and this row keeps one. The row should take the approved *Rationale* less this
sentence, leaving it to task 18, as it does for D-189.

## Checked in the revision, no finding

- D-189's enumerated body leaves out „a run that ends in death pays neither loot nor practice”,
  while its *Verification* gains the example „a run ending in death paying loot or practice”. D-190
  carries the rule („pays nothing of its map run”), and the task's passage on D-189 names the same
  three sentences, so nothing is left unstated.
- „Written once, at the event” (`spec.md:175`) fits a save's moment in task 18: each save is its own
  event, and the violation stays a reading rewritten on each tick.
- The design, decisions 1–6 and 8–10, did not change beyond `tests/sim/trip.test.mjs:361` joining the
  list of tests, so my first reading of them stands.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `definicja_mvp_loop2.md`, lines 1450–1541 | vault | the approved *Rationale*, *Rejected* and *Verification* the rows of D-189 and D-190 now take |
| Search for `*rozliczenie*` | `Notes/Projects/(P) Loop`, vault | the file the new *Origin* cites |
| `src/browser/view/game-view.ts:80`–`82` | worktree | the comment *Left to the maker* now names |

**Searches not found or unclear:**

- The earlier text of `spec.md` is not kept: the file is ignored by git and was revised in place, so
  no diff exists. I compared it with my reading of the first version and the designer's report.
- The D-190 row says *Rationale* gains the approved one „in place of `unknown`”, but only *Rejected*
  reads `unknown` today; its *Rationale* is „Items carried are at risk on the attempt; items left
  with the team survive it.”, which stays true. Whether the approved text replaces or joins it is
  unclear. Either fits the foundation, so this is no finding.
