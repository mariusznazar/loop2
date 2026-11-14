# Fix report — pierwsza-akcja-od-startu (findings-1.md and the addendum)

Worktree `the root of the task's worktree`, branch `task/pierwsza-akcja-od-startu`, reviewed head `17d83018`. One commit: **`d925d5ca`** (`mariusznn@gmail.com`; explicit paths: `foundations/decisions.md`, `foundations/invariants.md`, `tests/sim/new-account-first-pass.test.mjs`). Nothing pushed, no code of `src/` changed, `docs/task-cycles/` untouched.

**Status: done.** M3 is left unfixed, as the handoff says.

## Part 1 — the findings

- **F1 — fixed.** D-312's binding sentence now leaves the sentence out "where the record of the map run holds a minute of exploring, which a rule „Eksploruj” of the player's own has been carried out to give and so the game wrote none (D-123)"; its *Verification* "violates" example reads "the sentence in the band of a discovery in a map run whose record holds a minute of exploring" (it no longer says "at which the game wrote no rule"). The *Rationale* says that a player's own rule not carried out by the first chill (written in the last minutes, or in a group whose condition the Understanding lacks) is still named as the one the game wrote, and that the game's rule goes unnamed where the player deleted every rule „Eksploruj” the character had carried out. D-345 quotes D-312's sentence: its binding sentence now says "followed, where the band of that discovery has it (D-312), by …" and its "violates" example "left out of the entry of a discovery whose band holds it". D-122 (general: the band names the rule the game wrote) and D-313 do not quote the sentence and agree as they stand. Check: the code is unchanged, so entry and code now say the same; `python -B .the-way/elements/common/foundation_check.py` 0 errors.
- **M1 — fixed.** D-403's *Verification* is now `an agent compares a change with the decision:` with its pair of examples; the line `invariants: save-version` is gone.
- **M2 — fixed (first way).** `first-exploration-discovery` derives from D-121 alone; `new-account-first-pass` derives from D-121 · D-404 (see Part 2). D-118, D-397 and D-398 were not edited. D-121's *Verification* names `first-exploration-discovery · new-account-first-pass`; D-404's names `new-account-first-pass`.
- **M3 — left unfixed.** No real-browser check was run, by the handoff: a local start is a heavy run held until the advisor's start signal. The change alters what two screens show (the enabled „+ reguła”, the band of the first exploration with two trees); jsdom tests cover the enabled state and the band text; the appearance in a real browser is unchecked and goes to the request's list.

## Part 2 — the addendum (the human's decision of 2026-11-14, 289 of 300 accepted)

- **New decision D-404**, written through the record-decision skill: "What does the first pass of a new account on Skraj lasu have to reach?" Binding sentence: with the 21-rule program of the test, from the entrance of a game of an account with nothing discovered, Skraj lasu is solved on at least 289 of the 300 seeds the test names; the figure is the measurement the human accepted on 2026-11-14 and is to be revised when the balance is worked on. *Scope* simulation; *Based on* none; *Relations* D-80 · D-121 · D-397 · D-398; *Verification* names `new-account-first-pass`; *Origin* none. No vault note is named (D-362). The number D-404 was free in the log and on `origin/main` (checked: no `D-403`+ there). *Rationale* and *Rejected* as the orchestrator gave them; **the sentence that the new account is one seed behind "since „Sytość poniżej” is revealed only by the first gathered berry (D-121)" is the orchestrator's reason: I did not verify the cause** (I only saw that the two seeds lost die of hunger in minute 274). **Mark: `the cycle's`** — its meaning is the human's decision quoted in the addendum.
  - English: the first pass of a new account on Skraj lasu is accepted at 289 of the 300 seeds for now, and revised when the balance is worked on.
  - Polish: pierwsze przejście nowego konta na Skraju lasu jest na razie przyjęte przy 289 z 300 ziaren i do rewizji przy pracy nad balansem.
- **Invariant `new-account-first-pass`** rewritten: "… solves the map on at least 289 of 300 seeds that its test names"; *Derives from* D-121 · D-404; `Violated: no` kept.
- **Test** `tests/sim/new-account-first-pass.test.mjs`: one constant `ACCEPTED_SEEDS = 289` (the number stands once in the test); it asserts the new account solves at least that many, still plays the account with everything discovered and puts both counts in the failure message (not asserted); comments say the figure comes from D-404 and name no note. Seed scheme, program, map and accounts unchanged. The old threshold "at least as many" stands now only in D-404's *Rejected*; no other entry, test or comment quotes it (`grep`).

## Checks (own, not the gate)

- `npm test tests/sim/new-account-first-pass.test.mjs` exit **0** (3 pass; the new account solves 289, the other account 290, unchanged measurement).
- `npm test tests/sim/discovery.test.mjs` exit 0 (it cites the first-exploration invariant).
- `npx eslint tests/sim/new-account-first-pass.test.mjs` 0; prettier `--write` run on it.
- `python -B .the-way/elements/common/foundation_check.py`: **0 errors** on the tree before the commit (my own check; it is not the gate).
- Not run: the full gate, any mutation analysis, other test files (no code changed), the browser check (M3).

## Unread material

- `.the-way/elements/invariants/skill/` files other than `SKILL.md` (`decide_entry.md`, `draft.md`, `write.md`) and `elements/invariants/examples`: not opened; the two invariant entries were edited in the form of their neighbours. `elements/common/rules.md` not read (`foundation_check.py` passes). The record-decision skill was read again whole with the files read before (`way_of_working.md`, `read.md`, `decide_entry.md`, `projected.md`, the template to line 60).
- `reports/review-whole-report.md`: not read; the findings file carried the evidence.

## Searches not found or unclear

- None for D-312/D-345: the other entries that mention the written rule (D-122, D-123, D-313) were found by `grep "D-312"` and by name and need no change.
- The cause of the one-seed difference (Part 2) is the orchestrator's statement, not something I could confirm.

## Own-work check

The requirement most likely not met is that the entries "say exactly what ships" (F1): I checked each place quoting D-312's sentence (`grep -n "D-312" foundations/*.md`: D-345 only, twice) and the code `chillRuleGroupName` (`minutesByAction.explore > 0`) against the new wording; they agree.
