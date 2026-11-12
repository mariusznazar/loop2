PASS b64d3c91

# Review of the second fix of D-03 (finding N-1), range bc7367e8..b64d3c91

Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md` (the-way at the commit the gitlink records, e9a0f926) read whole. Everything read from commits (`git show`, `git diff`, `git archive`); the worktree, the vault and the old Loop clone were not touched. `git rev-parse HEAD` in the worktree showed b64d3c9107ead6bdab2c75bf1ae89bbeb09c161f, equal to the head given.

## Verdict

N-1 is fixed. The fix is the deletion of one clause and nothing else. D-03 now says nothing the note does not give and nothing that contradicts it. No pointer, secret or host address entered the entry.

## Findings of the findings file

- **N-1 (D-03, "so the loss falls mainly on the tests of the game screens"): fixed.** At b64d3c91 `git show b64d3c91:foundations/decisions.md | grep -c "loss falls mainly"` is 0. The "Lacks" sentence now ends: "...and the tests of the screens that the project rewrites anyway, the editor and the layout of the screens, change in every option. A test on an imitation of the document proves focus and dragging in no option; only a browser does." The note (technologia_budowanie_ekranow.md, line 129) says "projekt i tak przepisuje edytor i układ ekranów, więc testy tych ekranów zmieniają się w każdej opcji; dotyczy to głównie około 1130 wierszy ekranów gry". The entry now carries the first half and drops the "mainly" half, which has no explicit antecedent in the note. It gives no count and no conclusion about where the loss falls. The preceding clause in the same sentence ("a library draws no row on it, so such a case needs jsdom or happy-dom, a new package of tooling (jsdom has 20 dependencies), while the cases on pure functions stay in every option") matches note line 129 and was not changed by this commit.
- **N-2 (Minor, the first fix's review): not the subject of this fix; not re-opened.** The sentence about the two checks being widened is unchanged by this commit.

## Findings

### Critical / Important (blocking)

none

### Minor (blocks nothing)

none new

### Out of scope

none

## What the fix itself could have broken

- `git diff --stat bc7367e8..b64d3c91`: 1 file (`foundations/decisions.md`), 1 insertion, 1 deletion. `git diff -U0 | grep '^@@'`: one hunk, line 49 (the D-03 *Rationale*).
- `git diff --word-diff=plain` with a word regex shows exactly one removed fragment: `[-so the loss falls mainly on the tests of the game screens-]`. The `, ` before it became `. ` and nothing is added. So the heading, the binding sentence, *Scope*, *Based on*, *Relations*, *Verification*, *Origin* and *Rejected* of D-03 are byte-for-byte the same as at bc7367e8 (D-03 read whole at b64d3c91, lines 39 to 51).
- Contradiction with the entry's own other sentences: the *Rejected* line of the DOM says "the tests of the screens rewritten anyway change in every option", which agrees with the new ending. The removed clause appears in no other entry (`grep -c` above on the whole file at head is 0).
- Private traces: `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania|[C]:\\|Storage|https?://|[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' b64d3c91 -- foundations/decisions.md`: hits at lines 9, 23, 44 and others; the only hit inside D-03 (lines 39 to 51) is line 44, the *Based on* citation of the public Stack Overflow survey URL, unchanged by this commit. No hit on line 49. The commit adds no text at all.

## Declined to judge

none

## Checks run

- `git rev-parse HEAD` (worktree) - exit 0; b64d3c91, as given.
- `git log --oneline -3 b64d3c91` - exit 0; b64d3c91 is the single commit above bc7367e8.
- `git diff bc7367e8..b64d3c91`, `--stat`, `-U0 | grep '^@@'`, `--word-diff=plain --word-diff-regex='[^ ,.;:]+'` - exit 0; results above.
- `git show b64d3c91:foundations/decisions.md | sed -n '36,51p'` and `| grep -c "loss falls mainly"` - exit 0 / grep count 0; D-03 read whole at head.
- `git grep -nIE '<private-trace pattern>' b64d3c91 -- foundations/decisions.md` - exit 0; result above, no hit on line 49.
- `grep -n -i -E "1130|2850|3980|zmieniają się w każdej|..."` on the snapshot note - exit 0; lines 24, 129, 163 read for the comparison.
- `python -B .the-way/elements/common/foundation_check.py` on a `git archive` copy of b64d3c91 (a fresh `git init`, the pinned `.the-way` archived in beside it) in the scratchpad directory `the session scratchpad\rev-fix2-3-5\head` - exit 1, 464 errors. All lines start with `.the-way/` ("no part claims it", "names no invariant" for the submodule's own tests) except one, `foundations/part_map.md:128: the pattern .the-way ... matches no file git tracks`. These are artefacts of the copy, where the submodule's files are plain tracked files; with them filtered out nothing remains. Same result with `--skip-test-citations`. The fix report's own run (exit 0, 0 errors in the real worktree) was therefore not reproduced exactly; it is consistent with mine.
- Not run: the product's tests and gate (the cycle's own run; the change is one clause of foundation text).

## Reaches beyond the dispatch

none (the findings file, the fix report and the note named by the handoff were enough; the first review report was read as the findings file).

## Unread material

The snapshot note was read in lines 24, 129 and 163 (the passages that bear on the test-cost sentence), not whole. The fix report and the first review report were read whole. The rest of `foundations/decisions.md` was not read; only D-03 whole and the greps above.

## Searches not found or unclear

- The `.the-way/task-cycle/review/` files are not in the superproject tree (the path lies inside the submodule); read from the worktree's checked-out submodule at the gitlink commit e9a0f926 (`git rev-parse` of the gitlink via `git ls-tree b64d3c91 .the-way` equals e9a0f926dc97...). The handoff's "read only from commits" holds for their content, which is the pinned commit.
- The working tree shows ` M .the-way` in the session's git status for the main checkout; not examined, outside this review.
