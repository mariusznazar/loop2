PASS dd0e6cb6e8380d42066276c2fb19e8ae5dbbc9c4

# Review of the fix — findings-1 (review FAIL 3767fd3d)

Range `3767fd3d..dd0e6cb6` (one commit, `dd0e6cb6`), worktree the task's worktree, the repository's root. `git rev-parse HEAD` = `dd0e6cb6e8380d42066276c2fb19e8ae5dbbc9c4`. The diff touches `foundations/decisions.md` (D-120, D-393) and `guidelines/coding-saved-game.md` only; no code, test, D-280, D-282, D-311 or D-389 text. Counts: blocking 0; Minor new in the fix 1; out of scope 0 new. I changed nothing in the worktree.

## Findings of the file, one by one

**Blocking 1 (D-393 against D-280 and D-389) — fixed.** D-393 (`foundations/decisions.md:9641-9654`) now carries in its binding part a third sentence: "A decision that defines how the game looks in a narrower or a lower window — D-280, D-282, D-311 and D-389 — keeps its meaning there; a fault of the look in a window below the smallest, where no decision defines it, is not fixed." Checked against what the finding asked:
- precedence is recorded and settles the collision: D-280's "the full width of a narrower window" (and its 1000 px example) and D-389's 400 px crop stay binding; what D-393 sets aside is only the look where no decision defines it. An agent comparing a change with either decision reaches the same verdict now.
- the consequence left *Rationale* and *Verification* prose: the clause "a window below the smallest … is no fault to fix" is deleted from *Accepted with it*; *Rationale* gained one explanatory clause ("the decisions that already define the look … bind what the game does there, so what is left unfixed is only what no decision defines") that states no new rule.
- *Verification* no longer treats a 1000 px window as set aside: `complies` has "a change that keeps the content of Siedziba as wide as a window 1000 px wide, as D-280 gives it"; `violates` has "a change that drops the 1000 px width of D-280 as outside the set" and "a change made only to fix a look in a window below the smallest where no decision defines it".
- *Relations* `none` is sound under the template's two kinds: D-393 goes against no binding sentence (it leaves the four in place), so `narrows` would say the opposite of the orchestrator's choice; the named decisions do not need a relation back (WAY-18, a relation is written in the entry that depends on the other). D-311's clause and D-282 stay consistent (D-311 says the narrow layout is an accepted cost below D-393's smallest window; D-393 now names D-311 and D-282 as keeping their meaning). Binding part is three sentences (limit 1-3), no normative words.
- one new Minor in the same sentence, below.

**Minor 1 (guideline second paragraph) — fixed.** `guidelines/coding-saved-game.md:121`: "Zmiana którejś z tych rzeczy nie podnosi wersji sama (poza dodaniem albo usunięciem zwykłej czynności, które ją podnosi), ale …". The paragraph that lists "rodzajów działań" now carries the exception, matching the sentence in the first paragraph (`:102-105`) and D-369. Reads correctly in context.

**Minor 2 (D-120 *Rationale*) — fixed.** `foundations/decisions.md:2339`: "makes a campfire and, in later data, an archetype's goods". Matches the data (`craftCampfire` is the one "Wytwórz" target in `src/browser/sim/data/actions.ts`).

**Minor 3 (D-393 *Verification*) — fixed.** Each side of the pair is now a change or a check of a change; the "remark set aside" `complies` is gone.

## Author's open question — is D-370 (and D-288, D-349, D-310, D-368) to be named in D-393?

I read D-370, D-368, D-288, D-349 and D-310 whole (as the fix report did) and judge:
- **D-310, D-288, D-368: not named, agreed.** D-310 has no window; D-288's binding sentence says the rule panel opens in place on both screens and names no window (the narrow window is in *Rationale*/*Rejected*); D-368's windows ("low window", "one column") are in *Rejected* only, and its binding part is the content and opening of the end-of-run window.
- **D-370: belongs in the list, as a Minor.** Its binding sentence defines the end-of-run window "as wide as the content column of the screens (D-280) and as tall as its content up to a part of the height of the browser window" — a look in a narrower and a lower window — and its *Verification* tests the height. Its width follows D-280, but the height cap is its own.
- **D-349: also belongs, as a Minor.** Its binding sentence says the scene has one size and the game keeps no second scale; its *violates* names "a second size … chosen by … the width of the window". That defines the look in a narrower window (no shrinking), and a change that "fixes" a narrow window by scaling the scene would be a change "to fix a look below the smallest" that D-349 forbids.
- Neither omission leaves a collision: the clause "where no decision defines it" already excludes whatever a decision defines, so D-370 and D-349 are protected without a name. The risk is that the list "— D-280, D-282, D-311 and D-389 —" reads as exhaustive. Recommended wording if the orchestrator fixes it: add D-349 and D-370 to the list, or write "such as D-280, D-282, D-311 and D-389". This blocks nothing.

## New findings in the fix diff

**Minor (new, in the fix diff, blocks nothing): the named list in D-393's third sentence (`foundations/decisions.md:9643`) reads as exhaustive but omits D-349 and D-370, which also define a look in a narrower or lower window.** Evidence: D-349 binding sentence and *Verification*; D-370 binding sentence "as tall as its content up to a part of the height of the browser window". Not Critical or Important because the generic clause "where no decision defines it" keeps their meaning (above). Within the task (author-written text); the fix is one clause.

No new Critical or Important finding in the diff. The `violates` entry "a check of a change at a screen resolution of 1280 × 720 px" is a check, not a change, but the first `complies` entry has the same form and the template's own example forms allow it; not a finding.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `dd0e6cb6e8380d42066276c2fb19e8ae5dbbc9c4` |
| `git diff --check 3767fd3d..dd0e6cb6` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` (worktree root) | exit 0, `0 errors` |
| `git diff -U0 3767fd3d..dd0e6cb6` read whole | only the hunks above; D-280, D-282, D-311, D-389, invariants, glossary and code untouched |
| `git status --short` | empty |

Not run: `npm test` (the orchestrator's); no code or test changed in the range.

## Unread material

- Read whole for this review: the findings file, the fix report, the fix handoff, `.the-way/task-cycle/review/fix.md`, the fix diff, D-370, D-368, D-288, D-349, D-310 (whole), and from the earlier review D-280, D-282, D-311, D-389, D-393 (whole).
- Not re-read: the rest of the foundation selection of the first review (its **Unread material** section stands: 38 decisions whole and 355 by title of 393; the invariants, glossary, part-map and guideline files listed there). The fix touches none of them.
- The fix is judged against the findings file and its own diff, not the whole change again (`fix.md`); an issue outside the fix diff would be a Minor or out-of-scope note, and I found none.

## Searches not found or unclear

- A search of the decisions for other binding sentences that define a narrower or lower window, beyond D-280, D-282, D-311, D-389, D-349 and D-370, was not repeated; from the first review, D-278 (login card at 1280 × 800, above the line) and D-316/D-322 (no window) were skimmed, not read whole. None unclear otherwise.
