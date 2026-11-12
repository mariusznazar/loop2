PASS a732d90d

# Review of the fix of the review of slices 12–14

Range: `cdf5ee15..a732d90d`, one commit `a732d90d` (`docs: :memo: drop the process reasons from D-247 and the stale button row from D-243`), touching `foundations/decisions.md` only (+4 −8). `git rev-parse HEAD` in the worktree was `a732d90d92d31b8389f43d1be2c986b2fc6d85c9` at the start and the end of the review; every entry was read from the commit (`git show a732d90d:…`), not from the working tree.

## Findings

### Critical

none

### Important

none

### Minor

none

## Findings of the findings file

### I-1 — D-247: pointer to "the approved project definition" and a process condition — **fixed**

- At `a732d90d`, D-247 *Rationale* ends: "A bound can be added later, once the game has matured." *Rejected* reads: "a bound of 7 days, the rest lost; a bound of another number." Both are the reviewer's fix text word for word.
- No word of the entry now points to a definition, a readiness gate, a plan, a task, a question number or a note: a grep of D-243 and D-247 at the head (below) found only "a question for a program or a map before the start" in D-243's *Verification*, an in-game question, untouched by the fix.
- Traceability: "once the game has matured" is the note's „gdy gra dojrzeje” (`petla_zarobkowa_loop2.md`, Q7 answer); "a bound of 7 days, the rest lost" is way A „granica 7 dni, resztę tracimy”; "a bound of another number" is way C „inna liczba”. The note gives no cost of A or C except the process cost, so leaving them without a reason follows the source and the D-187 precedent (D-187's *Rejected* carries ways without a reason too, e.g. "no cap of a map at all").
- No new contradiction: the binding sentence ("sets no upper bound"), *Verification* ("violates: … a bound on the minutes with the rest lost") and the *Rationale* sentence "The predecessor game bounded the catch-up, and this departs from it" all agree with the shortened *Rejected*. Entries linking D-247 — D-323 (`foundations/decisions.md:7675`, "narrows D-247"), invariant at `foundations/invariants.md:1154` ("Derives from: D-242 · D-247"), `guidelines/coding-saved-game.md:179` — rest on the binding sentence, not on the removed text.

### I-2 — D-243: the accepted cost describes a placement the foundation no longer has — **fixed**

- At `a732d90d`, D-243 *Rationale* reads: "Accepted with it: one click more where the predecessor game stopped the earning loop when a character was sent." The clause "one more button in a long row of buttons" is gone; *Rejected* is unchanged, as the finding asked.
- True at the head: `src/browser/view/maps-screen.tsx` at `a732d90d` disables „Wejdź” with `disabled={run !== null || inLoop}` and „Puść w pętlę” with `disabled={run?.character.id === id || inLoop}`, and offers „Zatrzymaj” while the character is in a loop; so starting anew takes the click on „Zatrzymaj” first — one click more.
- Traceability: the cost is the note's Q3 weak point „jedno kliknięcie więcej”, and "where the predecessor game stopped the earning loop when a character was sent" is Q3's way B „jak w loop: „Wyślij” sam zatrzymuje pętlę” (also kept in D-243's own *Rejected*).
- No new contradiction with the binding sentence ("At a character in an earning loop „Wejdź” and „Puść w pętlę” are currently inactive, and the player stops the earning loop first") or with D-329, the placement of both buttons in „Kto idzie”. The fix wrote no new statement about the present layout. The only other "long row" in the foundation, `foundations/decisions.md:1218` (D-53 *Rejected*, sending from the headquarters), is outside the fix diff and untouched.

## Nothing before *Rationale* changed

Both hunks of `git diff cdf5ee15..a732d90d` begin after the line `*Rationale:*` of their entry (D-243 hunk at old line 5161, D-247 hunk at old line 5310) and end at the entry's *Rejected* line; heading, binding sentences, *Scope*, *Based on*, *Relations*, *Verification* and *Origin* (`none`) of both entries are byte-identical to `cdf5ee15`.

## Declined to judge

none

## Checks

- `git rev-parse HEAD` — exit 0, `a732d90d92d31b8389f43d1be2c986b2fc6d85c9` (start and end).
- `git log --oneline cdf5ee15..a732d90d` and `git diff cdf5ee15..a732d90d` — exit 0; one commit, one file.
- `git diff --check cdf5ee15..a732d90d` — exit 0, no whitespace errors.
- `git ls-tree a732d90d .the-way` against `git -C .the-way rev-parse HEAD` — both `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed`; the pinned check script is the recorded one.
- `python -B .the-way/elements/common/foundation_check.py <scratch worktree of a732d90d>` — exit 0, "0 errors". Run in a detached worktree of the head commit in my scratch directory (`git worktree add --detach … a732d90d`, removed afterwards with `git worktree remove`, exit 0), never in the reviewed worktree.
- `git show a732d90d:foundations/decisions.md | sed -n '5142,5169p;5283,5314p' | grep -i -E 'mvp|definition|readiness|\bplan\b|the task|task|question|\bQ[0-9]|\bD[0-9]{2}\b|_loop2|vault|note|concept|koncepcja|http|\.pl|\.com|<IPv4>|secret|token|password'` — exit 0, one hit: D-243 *Verification* "a question for a program or a map before the start" (an in-game question, before *Rationale*, unchanged).
- `git grep -n -i -E 'long row|D-247|D-243|7 days' a732d90d -- foundations/ guidelines/` — exit 0; linked entries listed above, none resting on the removed text.
- Manual: read D-243 and D-247 whole at `cdf5ee15` and at `a732d90d`; read `src/browser/view/maps-screen.tsx:236-345` at `a732d90d`; read the note's Q1, Q3 and Q7 in the snapshot.
- Product tests (`npm test`): not run — the fix changes no code and the full suite is the cycle's own run.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` (lines around *Rejected*, WAY-05/WAY-29/WAY-134) — to judge whether a *Rejected* without a reason is allowed.
- `foundations/decisions.md` D-187 *Rejected* at `a732d90d` — the precedent the finding names.
- `.the-way/elements/common/foundation_check.py` (root handling, lines 642–690) — to run the check on a separate worktree.
- Snapshot `the private snapshot of the notes (not committed)/vault/petla_zarobkowa_loop2.md` Q1, Q3, Q7 — traceability of the fixed sentences.

## Unread material

- `.the-way/elements/decisions/template.md` read in its *Rejected*, *Rationale* and binding-sentence passages, not whole.
- `petla_zarobkowa_loop2.md` read in Q1, Q3, Q7 and the lines a grep found, not whole; `karty_i_katalog_map_loop2.md` (To do 8, named in I-2) not opened — the placement was checked in the code and D-329 instead.
- `reports/review-12-14-report.md` (the first review) not read; the findings file quotes its blocking findings.

## Searches not found or unclear

- Unclear, not a finding: `template.md` WAY-134 asks each rejected way to keep "the cost or the reason kept beside it" from its source, while WAY-05/WAY-29 forbid prose telling how the decision was reached. For D-247 the source's only cost of ways A and C is the process cost, so the two rules cannot both be met; the fix follows the finding and the D-187 precedent and leaves the ways without a reason. A later reader of D-247 cannot weigh the rejected bound beyond the *Rationale*'s accepted cost.
