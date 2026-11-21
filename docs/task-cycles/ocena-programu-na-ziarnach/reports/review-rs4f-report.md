PASS f93df2f6

# Review rs4f — fix of review rs4's findings, range `23e0fa01..f93df2f6`

Head confirmed: `git rev-parse HEAD` in the cycle's worktree = `f93df2f65c7c56f718a7e3ddc0d6cd0407ade54e`; `.the-way` at the pinned `19e5774aed6d1d628042e23deccc110ed9f112c0`. One commit in the range, `f93df2f6`; files `tests/sim/judging.test.mjs` (6 lines) and `tests/sim/saved-game-judgings.test.mjs` (8 lines), 14 insertions, 14 deletions.

## Findings

### Critical

none

### Important

none

### Minor

none

## Findings of the findings file (`reports/rs4-findings.md`)

**I-1 — fixed.** The eight `decision:` lines of `tests/sim/saved-game-judgings.test.mjs` (`:115`, `:136`, `:228`, `:261`, `:308`, `:351`, `:472`, `:500`) now each quote one whole binding sentence from its start, and the foundation check at the head reports no error in that file (check 1 below). Each quotation still belongs to the case it marks — read against `foundations/decisions.md` at the head:

- `:115` (round-trip of a state with judgings), `:261` (twelve results of three kinds, no cause or minute kept), `:308` (equipment of the judging) — D-440's first sentence (`foundations/decisions.md:11842`): it names the twelve results, their three kinds, the equipment taken and that cause and minute stand only in the result shown. It is what each of the three cases checks.
- `:136` (load builds from new values, save shares none), `:351` (record of another shape refused), `:472` (no value throws), `:500` (every leaf refuses a value of another kind) — D-213's second sentence (`foundations/decisions.md:662-666`), "Saved-game code turns a game state into … a game state or a refusal naming why, … no value a document can hold making it throw, and changing nothing passed to it": refusal, no throw and nothing passed changed are the three things these cases check. The former quotations of `:351`/`:500` stood in *Verification*, which is no binding text.
- `:228` (judging of a deleted program refused) — D-165's first sentence (`foundations/decisions.md:8123`), ending "a deleted program's number included": what the case rests on.

No quotation was picked only to pass the check: each is the one binding sentence of its decision that carries the case's requirement, and the shorter openings of those sentences would drop the words the cases rest on.

The fix also repairs six lines of `tests/sim/judging.test.mjs` (slice 3, out of scope in review rs4); checked the same way and they fit: `:154`, `:199`, `:233` — D-439's first sentence (cap in the game's data, 4000, undecided where neither solved nor died "within a cap"); `:244` — D-22's second paragraph (twelve fixed seeds, no new seed); `:258` — D-179's sentence ending "as many go in from the top of the list as fit"; `:315` — D-439 "A judging discovers nothing: …", beside the unchanged marker for "takes nothing from the chest, pays nothing and settles no death". The inclusive edge at minute 4000 that `:199` tests is spelled out only in D-439's *Verification*; the binding sentence's "within a cap" carries it, which is the most the binding text holds.

What the fix itself broke: nothing found. No line other than a `// decision:` comment changed (check 2).

## Declined to judge

- Minor findings M-1 and M-2 of review rs4 — the dispatch puts them outside this fix, and `fix.md` bounds the review to the findings file.
- The seven D-243 errors of the foundation check (`tests/sim/loop.test.mjs:237,304`, `tests/view/account-screen.test.mjs:2683,2807,2975`, `tests/view/maps-screen.test.mjs:494,700`) — outside the fix diff; the orchestrator gives them to slices 5, 10 and 12.

## Checks run

All in a detached worktree of `f93df2f6` (see Working copies), after `git submodule update --init -- .the-way` (checked out `19e5774a…`, the pin).

1. `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1, `7 errors`, all of them "the quotation stands in no binding sentence of `D-243`" at the seven lines named under Declined to judge; none in `tests/sim/judging.test.mjs` or `tests/sim/saved-game-judgings.test.mjs`. Output kept as `reports/review-rs4f-foundation-check-head.txt`.
2. `git diff -U0 23e0fa01..f93df2f6`, every added or removed line filtered against `^[+-]  // decision: D-[0-9]+ "` — 0 lines outside that form: no assertion, expected value, test title or code changed. Also read the full diff by eye.
3. `npm ci` — exit 0.
4. `npm test -- tests/sim/judging.test.mjs` — exit 0, 13 tests, 13 pass.
5. `npm test -- tests/sim/saved-game-judgings.test.mjs` — exit 0, 11 tests, 11 pass.

Not run: the full gate `npm test` (the dispatch forbids it; it is the cycle's own run). Trust boundary: the range does not touch `src/browser/sim/saved-game.ts` or any code — it changes only comment lines of two tests, so no crafted-input check at the boundary applies to this range. Irreversible operation: none in the range.

## Reaches beyond the dispatch

- `foundations/decisions.md` — D-439 (`:11814-11838`), D-440 (`:11840-11865`), D-213 (`:659-683`), D-165 (`:8121-8136`), D-22 (`:5469-5493`), D-179 (`:8378-8392`): to check that each new quotation stands in the binding text and fits its case. D-22, D-179, D-439 are named by the fix's lines in `tests/sim/judging.test.mjs`, outside the slice-4 selection.
- `.the-way/elements/decisions/template.md:268-277` — the rule of the line `decision:` (begins a sentence of the binding sentences, at least three words), to judge whether long whole-sentence quotations comply; they do.
- `guidelines/testing.md` — searched for `decision:`, "quot", "marker", "cite": no rule on the line there.

## Working copies

- `.runs/review-rs4f/wt` — detached worktree of `f93df2f6`, with `.the-way` initialized and `node_modules` from `npm ci`; removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-rs4f/` (outputs of the check and the tests) — removed; the foundation-check output kept as `reports/review-rs4f-foundation-check-head.txt`.

## Unread material

- `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md`, and the foundation entries of slice 4 other than D-213 and D-165 (D-206, D-386, D-56, D-425, invariants save-version and simulation-inputs, part map simulation), and `tests/sim/saved-game.test.mjs:1-120`: not read whole. The fix changes only comment lines `decision:`, which those files do not govern beyond the decisions template; `guidelines/testing.md` searched only (see Reaches).
- D-213 read to `:683` (into its *Verification*), not to its end; D-22 read to `:5493`, not to its end.

## Searches not found or unclear

- A rule for the line `decision:` in `guidelines/testing.md`: not found; it stands in `.the-way/elements/decisions/template.md:268-277`.
