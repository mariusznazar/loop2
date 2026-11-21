PASS 3a5548f15fdae665407a6954943d4324bf819fa1

# Review of the fix of the whole change's findings

Range `f9a9d24f2acd6aa99d9aad32d05085be1a468490..3a5548f15fdae665407a6954943d4324bf819fa1`: fix A `109b2417`, fix B
`3a5548f1`; 14 files, +239/−128. `git rev-parse HEAD` gave `3a5548f15fdae665407a6954943d4324bf819fa1`. The findings
file `reports/whole-findings.md` holds Important 1, Important 2 and Minor 1–13 of `review-whole-report.md`.

Counts: fixed 14 (Important 1, Important 2, Minor 1–7 and 9–13); contested and not kept 1 (Minor 8); remaining 0. New
findings in the fix: 0 Critical, 0 Important, 2 Minor.

## Each finding

- **Important 1 — fixed.** The literals are gone: `tests/view/item-verb-panel.test.mjs` builds the price of the recipe
  by shape from `ITEMS.bandage.recipe` (`MAKING_PRICE`, `CRAFT_FIELD`, `CRAFT_CELL`) and the times from
  `RECIPE.minutes` and `ACTIONS.tend.minutes`; `tests/view/program-editor.test.mjs:1427-1431` and
  `tests/view/rule-editor.test.mjs:1578` take `ACTIONS.tend.minutes`; the comment at `rule-editor.test.mjs:1575` no
  longer names „Opatrz”. The fix also took the 2 moss out of `tests/sim/action-targets.test.mjs` (`sentWithMoss`) and
  the gathering thresholds of `tests/balance/agreement.test.mjs` and `tests/balance/trace.test.mjs`. A search of every
  test line the whole change adds (`git diff aff09e98..3a5548f1 -U0 -- tests`) for `2 mchy`, `"10 min"`, `25`, the moss
  count 2 and `2 × mech`, `decision:` lines aside, finds only „zostało 10 z 10 min” in `tests/view/now-lines.test.mjs`
  (input handed to the formatter by the test itself) and `actionTime(outside, "gather", "bandage")` „10 min” (the
  gathering's minutes of D-387). Shown by data alone: in a worktree of the head I set the recipe to 3 moss in 7 minutes,
  the healing to 30 and „Opatrz” to 12 minutes, and 12 files —
  `item-verb-panel`, `program-editor`, `rule-editor`, `craft-and-tend`, `action-targets`, `data`, `agreement`, `trace`,
  `cli`, `now-lines`, `chronicle-entries`, `scene-picture` — all passed (exit 0 each).
- **Important 2 — fixed.** D-441 now reads „… and another for every change it counts, but for a chance of a collision of
  at most one in 2^52.” and „… so two different contents share a judging only through such a collision …”
  (`foundations/decisions.md:12018`, `:12020`), with the same bound in its accepted cost. It agrees with the spec's
  Decision 5 and with `contentFingerprint` (64 bits; its comment now says about one in 2^62, inside the bound). The six
  `decision:` quotations of the changed sentences follow them, and the foundation check finds each.
- **Minor 1 — fixed.** In the ten entries the pairs kept "until tests stand" are gone, and each `tests:` clause names what
  the tests hold; I compared each clause with the cases its `decision:` lines stand at (D-142, D-145, D-121, D-380,
  D-443, D-293, D-289, D-363, D-318 and D-441, the last against `tests/sim/judging-record.test.mjs` and
  `tests/view/judging-cache.test.mjs`). A pair stays only where no test holds the part: the stick after an encounter
  (D-145), „Obchód” with a full backpack and „Zapal — ognisko” short of energy (D-380), what stays at „Wyloguj” (D-441).
  Each binding sentence is unchanged except D-441's two, so the entries still match their rows of *Settlements to
  record* (rows 1–15) and the code as my first review found.
- **Minor 2 — fixed.** `src/browser/sim/judging-record.ts:72` says about one in 2^62.
- **Minor 3 — fixed.** Two tests in `tests/sim/judging-record.test.mjs`: group names that read as one text without their
  quotes, and every fingerprint 16 digits with a zero at the start of each word. Seen: with the zero padding removed the
  second fails (exit 1, the named case), restored.
- **Minor 4 — fixed.** `tests/view/judging-cache.test.mjs:445` has 900 digits; the value stays under the 1 024 cap.
- **Minor 5 — fixed.** The case at `:882` is named for what it checks.
- **Minor 6 — fixed.** The case at `:464` is named for what it holds. It is the same value as the generated case „a value
  without fingerprint”; a duplicate, which the rename leaves visible — no finding.
- **Minor 7 — fixed.** `named` is gone; the message is asserted to name the value only where it is a non-empty text or a
  number (`tests/sim/action-targets.test.mjs:98-99`, `:267`), and the refusal of every value by `instanceof
  ProgramCheckError`.
- **Minor 8 — contested; I do not keep it.** The author is right, and my finding already said it: `record` reads every
  count through `count` (an integer) and the counts must sum to the integer minute, so a document with only „Opatrz”
  fractional is refused by the sum too, and no document isolates the fraction. The case shows what it can.
- **Minor 9 — fixed.** `src/browser/view/credit-lines.ts:51-53` names the items.
- **Minor 10 — fixed.** `README.md:78` names `src/browser/sim/data/items.ts` for the bandage's title, which stands there.
- **Minor 11 — fixed.** `guidelines/coding-browser-module.md:131` names items.
- **Minor 12 — fixed.** Two tests in `tests/sim/craft-and-tend.test.mjs`: a two-piece recipe with either piece gone at
  the end, and „Opatrz” ending with no piece. Seen: `some` → `every` at `src/browser/sim/run.ts:338` fails the first
  (exit 1, the named case), restored.
- **Minor 13 — fixed.** The case at `tests/sim/craft-and-tend.test.mjs:563` also cites the start of D-363's first
  sentence.

## New findings in the fix (Minor; they block nothing)

1. `guidelines/testing.md:178`: the row of `src/browser/view/judging-cache.ts` still lists a fingerprint „z … tysiącem
   cyfr”; the case now has nine hundred digits (fix B, Minor 4). Fix B names this in its report and left it as outside its
   boundary. Reword to „dziewięciuset cyframi” — the return step can do it.
2. `tests/view/item-verb-panel.test.mjs:340-343`: the names of the recipe's items go into a regular expression unescaped.
   Polish names of today hold no special character, but a later item whose name or plural held one, such as a bracket or
   a dot, would make the shape wrong or the regular expression invalid. Escaping the names keeps the test from depending
   on its data.

## Checks run

| Check | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, head) | 0, „0 errors” |
| `npx eslint` on the changed `.ts` and `.mjs` files (worktree of the head) | 0 |
| `npx prettier --check` on the changed `.ts`, `.mjs` and `.md` files outside `foundations/` | 0 |
| `npm run typecheck` | 0 |
| `npm test -- <file>` for `tests/sim/craft-and-tend`, `action-targets`, `judging-record`, `saved-game`; `tests/view/judging-cache`, `item-verb-panel`, `program-editor`, `rule-editor`, `icons`; `tests/balance/agreement`, `trace` | 0 each |
| The same kind of run with the bandage's numbers changed in the data (12 files listed under Important 1) | 0 each |
| Mutation `some` → `every` at `run.ts:338`, `npm test -- tests/sim/craft-and-tend.test.mjs` | 1 (the new case), restored |
| Mutation: zero padding removed at `judging-record.ts:64`, `npm test -- tests/sim/judging-record.test.mjs` | 1 (the new case), restored |
| `grep` of the added test lines of the whole change for the bandage's numbers | only the two acceptable lines above |

Not run: the full gate, reserved for the orchestrator.

## Reaches beyond the dispatch

- `src/browser/sim/saved-game.ts`, the reading of the record's counts, as quoted in fix B's report: to judge Minor 8; I
  relied on my first review's reading of `record` and `count`.

## Working copies

`.runs/review-whole-fix/` held the fix's test diff,
the logs of the data and mutation runs, and a detached worktree of `3a5548f1` at `…\.runs\review-whole-fix\head` with a
junction `node_modules` to the reviewed worktree's. The data and code edits were made only in that worktree and reverted.
Removed: the junction alone (the reviewed worktree's `node_modules` checked present after), the worktree with `git
worktree remove --force` (exit 0) and `git worktree prune` (exit 0), then the directory by its full path; `git status
--short` of the reviewed worktree is empty. Nothing remains.

## Unread material

- `foundations/decisions.md`: of the ten entries fix A changed, I read the changed hunks and their binding sentences, not
  every *Rationale* again; the binding sentences besides D-441's are unchanged since my first review read them whole.
- The test files changed by fix B: read in the fix diff and run; not read whole.
- `guidelines/testing.md`: only line 178 re-read; the file was read whole in the first review.

## Searches not found or unclear

none
