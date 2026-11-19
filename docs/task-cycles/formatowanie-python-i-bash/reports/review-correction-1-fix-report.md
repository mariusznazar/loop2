PASS 767c9c7fb4fdd4293c8b159fb1ba2519921e5fea

# Review of the fix of correction 1's finding (formatowanie-python-i-bash)

Fix range `57c25292e98c36a556142cf86924233e5b8ac24d..767c9c7fb4fdd4293c8b159fb1ba2519921e5fea`.
`git rev-parse 767c9c7f` and `git rev-parse HEAD` both give `767c9c7f…`. The range is one commit,
`foundations/decisions.md` +1/-1. The review is bounded by `.the-way/task-cycle/review/fix.md` and the
findings file `reports/correction-1-fix-findings.md`.

Counts: blocking 0, Minor 0, out of scope 0.

## Findings of the findings file

### Remark 3 (a), not made in `57c25292` — fixed

D-434's binding sentence now reads "…`-i 2 -bn -ci -ln bash`: two spaces of indent, `&&` and `||` of a
command list at the start of a continued line and, inside `[[ … ]]`, at the end of the line before it,
indented `case` branches and Bash as the language." So one sentence of D-434 now says where the
operators stand inside `[[ … ]]`, as the human's remark asks. The words are the ones I proposed.

The sentence is true of shfmt 3.14.1. I ran `.runs/quality-venv/Scripts/shfmt.exe -i 2 -bn -ci -ln bash
p.sh` (exit 0) in `.runs/review-correction-1-fix/` on four cases:

- Inside `[[ ]]`, `&&` at the start of the continued line → moved to the end of the line before.
- Inside `[[ ]]`, `\` with `||` at the start of the continued line → moved to the end of the line
  before, backslash dropped.
- A command list `first arg &&` / `second arg` → `first arg \` / `  && second arg`, operator at the start.
- A command list `first arg \` / `  || second arg` → unchanged.

### m-1 (commit message of `57c25292`) — no fix asked; the message is now true of the pair

## The fix diff

- One line, D-434's binding sentence. Nothing else changed: `git diff --stat`, one file, +1/-1.
- The `decision:` quotation of D-434 (`tests/quality/test_quality_invariants.py:149`) ends at
  "`-ln bash`", before the changed words, and still stands: `foundation_check.py` → 0 errors.
- No other file repeats the gloss. The search of the previous round found only flag lists without a
  gloss; the fix touches none of them.

No new finding.

## Declined to judge

none

## Checks

- `git rev-parse 767c9c7f` and `git rev-parse HEAD` → `767c9c7fb4fd…` (exit 0).
- `git diff 57c25292..767c9c7f` and `--stat` → one line of `foundations/decisions.md`.
- `.runs/quality-venv/Scripts/shfmt.exe -i 2 -bn -ci -ln bash .runs/review-correction-1-fix/p.sh` → exit 0,
  output as above.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- Not run: the product's whole gate (as the handoff says), and the quality tests. No binding text that
  a test quotes changed, and the author ran `test_shfmt_source_format` → OK.

## Reaches beyond the dispatch

None.

## Working copies

`.runs/review-correction-1-fix/` (the probe `p.sh`): made in the worktree and removed with `rm -rf`
before returning. No remainder.

## Unread material

none (the handoff, the fix report, the diff and `fix.md` read whole; the findings file holds my own
words of the previous report, which I wrote).

## Searches not found or unclear

none
