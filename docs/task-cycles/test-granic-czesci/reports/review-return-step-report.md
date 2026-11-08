PASS fff50e95bc59c635833f2742acca8c81b08fdd79

# Review of the return step (review-change)

Range `842beb729dff9e465dda99c3a1e0250350d074b6..fff50e9` (one commit, `fff50e9`, "name the part test-helpers where the Python rules of D-28 and
D-30 and the invariant ruff-source-rules applied to the file it took from build-tools"). `git rev-parse HEAD` is
`fff50e95bc59c635833f2742acca8c81b08fdd79`. Read: the return step report whole, the frozen task, `.the-way/task-cycle/skill/return_step.md`, the diff.
Counts: blocking 0, Minor 2, out-of-scope 0.

## The corrections the return step made

The diff is four lines in two files, entries only, no code:

- D-28 *Scope* (`foundations/decisions.md:696`) gains `test-helpers`.
- D-30 binding sentence (`foundations/decisions.md:724`) now reads "... deployment, agent-workflow and test-helpers passes ..." and its *Scope* (`:726`) gains `test-helpers`.
- `ruff-source-rules` *Part* (`foundations/invariants.md:426`) gains `test-helpers`.

Judgement:

- **D-30 and `ruff-source-rules`: right and needed.** `tests/invariants/loop2_invariant_support.py` is a Python file that Ruff checks
  (`tests scripts`, which passes at this head). Before the move the sentence of D-30 covered it through `build-tools`; after the move the sentence,
  which names parts one by one, no longer named the part that holds the file. The edit adds the part and leaves everything else unchanged: the rule set,
  the Ruff version, the 393/14 counts, the ban on suppression comments and *Verification* are byte-identical in the diff. It does not touch "Changing that
  set takes a human-accepted change": the set of rules is the same, only the list of parts that holds the file grows, which is the correction WAY-11 asks
  for when the change itself moved the file. The *Based on* and *Derives from* links are unchanged and still right.
- **D-28 *Scope*: acceptable, not strictly needed.** D-28 adopts the coding guidelines, and `guidelines/coding.md:4` already lists `test-helpers` in
  *Applies to* (done in the change under review), so the *Scope* now agrees with the guideline it adopts. The sentence of D-28 names no parts, so nothing
  was false before. Harmless.
- **`foundation_check.py`**: 0 errors at this head (see Checks).

## Was it right to leave the other entries uncorrected

- **`shellcheck-source-rules` / D-31 (`invariants.md:436`)**: right to leave. Bash scripts only, listed by name in `tests/quality/test_quality_invariants.py`; the
  helper is Python.
- **`node-test-selection` (`:586`, D-83)**: right to leave. It is about `*.test.mjs` files; the helper is a `.py` file and no test file.
- **`document-test-memory-limit` (`:1196`)**: right to leave. It is about jsdom in `.mjs` files.
- **The testing-decision family (D-73, D-77, D-83, D-84 and the rest with the six-part *Scope*)**: right to leave, with a reason the report does not give. The
  decisions found by *Scope* are not the only road: the agent that changes the helper reads `guidelines/testing.md` by its *Applies to*
  (`guidelines/testing.md:4`, which now names `test-helpers`), and that guideline cites those decisions by identifier (`Decision: D-73 · D-74 ...`, recipes citing D-77,
  D-83, D-84, D-49). No sentence of them is made false by the move. Widening about 35 *Scope* lines for one file would add noise without changing what is read.
  The report is honest in saying that this is a choice for the human and not decided by the return step; there is no rule of the return step that forces the sweep.
  I agree with the not-widening, and I note it leaves D-28 widened while the family is not; that is a small inconsistency, not a defect (see Minor 2).

## Findings

### Critical

none

### Important

none

### Minor

1. **D-49 (`foundations/decisions.md:1003-1016`) was not looked at, though its *Verification* names the helper.** *Scope* is `account-server, build-tools, deployment`. Its *complies*
   example is "a new test that starts the built server through the shared server helper of the invariant tests, which asks the system for a free port at each start" - that is
   `free_port` and the server class of `tests/invariants/loop2_invariant_support.py:273-332`, which now belongs to `test-helpers`. A search by *Scope* from the part of that file does not
   find D-49 any more. The return step searched the foundation by the file's name, `file_owners`, "import" and "part map" and so did not see an entry that describes the file without naming
   it, and its closing claim "the corrections above are the only rules that stopped covering the file" is therefore stronger than its search. Why it does not block: the sentence of D-49 stays true,
   and the road through the testing guideline (`guidelines/testing.md:352` and `:364` cite D-49; *Applies to* has `test-helpers`) still brings D-49 to an agent that edits the helper's server start.
   Fix, if wanted: add `test-helpers` to D-49's *Scope* by the same rule the return step applied to D-28/D-30. Within the return step's duty (WAY-11), low effect.
2. **D-28 widened but the decisions its siblings cite not.** See above: D-28's *Scope* now names `test-helpers` while D-73, D-77, D-83, D-84 do not. Both choices are defensible; the pair is
   inconsistent only in how the same road (guideline *Applies to*) was treated. Polish.

## Declined to judge

- Whether to sweep every six-part *Scope* to add `test-helpers` (the human's choice, as the report says).
- The `Rests on: TODO` of `cross-part-imports` (decided in the fix at `842beb7`; no change here).
- Other `build-tools`-scoped decisions beyond D-49 (about 30 exist; I read their *Scope* lines and the text of those that mention the helper's behaviour - free port, shared server helper - and did not find another naming it; I did not read all of them whole).

## Checks I ran

| Command | Exit |
|---|---|
| `git rev-parse HEAD` | 0, `fff50e95bc59c635833f2742acca8c81b08fdd79` |
| `git log --oneline 842beb7..fff50e9`; `git diff 842beb7..fff50e9`; `git diff --stat 842beb7..fff50e9` | 0 (2 files, 4 insertions, 4 deletions) |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| `git grep -n "ruff-source-rules\|D-30\|agent-workflow" -- tests scripts` (does any test read the edited entries) | 0; only the marker `# invariant: ruff-source-rules` in `tests/quality/test_quality_invariants.py:52`, no parsing of *Part* or the sentence |
| searches of `foundations/decisions.md` for the helper's behaviour (`free port`, `temporary copy`, `working tree`, `helper`) | 0; found D-49 only |
| `git status --short` | empty |

Not run: the whole `npm test` (the orchestrator's, green at `842beb7`; this commit touches only the two foundation files), Ruff (no code changed).

## Reaches beyond the dispatch

- `tests/invariants/loop2_invariant_support.py:270-335` (`free_port`, server start) to see that D-49's example is this file.
- `foundations/decisions.md:1003-1016` (D-49) and `:1477-1491` (D-77) and the *Scope* lines of D-73, D-77, D-83, D-84.
- `.the-way/elements/common/way_of_working.md:52-90` ("Reading the foundation") for the roads by which an agent reaches a decision.
- `guidelines/testing.md:352`, `:364` (citations of D-49).

## Searches not found or unclear

- I found no rule in `return_step.md` or in the part-map skill that says whether a part's new *Scope* membership must be swept across decisions that merely describe a moved file; the report's "no rule of the return step requires it" matches what I read.
- Not found: any other entry beyond D-49 that describes the helper without naming its file. The search was by phrases of its behaviour, not a full read of the log.
