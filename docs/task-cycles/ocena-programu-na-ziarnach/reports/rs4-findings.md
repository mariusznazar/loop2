# Findings of review rs4 (slice 4, range `93dd78b3..bae893e2`) — blocking, in the reviewer's words

From `reports/review-rs4-report.md`, first line `FAIL bae893e2`.

### Important

**I-1. The new test file adds eight errors to the foundation check, so the one command `npm test` fails at this head.**

- Place: `tests/sim/saved-game-judgings.test.mjs:115`, `:136`, `:228`, `:261`, `:308`, `:351`, `:472`, `:500`
  (the `// decision: D-… "…"` markers).
- What is wrong: `python -B .the-way/elements/common/foundation_check.py` reads the quotation of each
  `decision:` marker against the decision it names. Six markers quote words from the middle of a sentence
  ("the quotation does not begin a sentence of"), and two quote a sentence that is not binding
  ("the quotation stands in no binding sentence of"). Head output, lines for this file:
  ```
  tests/sim/saved-game-judgings.test.mjs:115: the quotation does not begin a sentence of `D-440`
  tests/sim/saved-game-judgings.test.mjs:136: the quotation does not begin a sentence of `D-213`
  tests/sim/saved-game-judgings.test.mjs:228: the quotation does not begin a sentence of `D-165`
  tests/sim/saved-game-judgings.test.mjs:261: the quotation does not begin a sentence of `D-440`
  tests/sim/saved-game-judgings.test.mjs:308: the quotation does not begin a sentence of `D-440`
  tests/sim/saved-game-judgings.test.mjs:351: the quotation stands in no binding sentence of `D-213`
  tests/sim/saved-game-judgings.test.mjs:472: the quotation does not begin a sentence of `D-213`
  tests/sim/saved-game-judgings.test.mjs:500: the quotation stands in no binding sentence of `D-213`
  ```
  For example, `:115` quotes "the twelve results of its seeds — solved, a death or undecided — and the
  equipment it took from what the chest held", which is the middle of the first sentence of D-440, and
  `:351`/`:500` quote "a crafted document of the current version refused whole", which comes from the
  *Verification* line of D-213, not its binding text.
- Why it matters: `AGENTS.md` makes the foundation check part of the one command run before a merge, so this
  file makes the gate fail by itself. The base `93dd78b3` has 13 foundation-check errors and the head has
  21. The 8 new errors are exactly the lines above (diff of the two outputs, kept beside this report).
  The executor's report lists no run of the foundation check, so the slice's own checks could not catch it.
- Evidence: `review-rs4-foundation-check-head.txt` and `review-rs4-foundation-check-base.txt` in this
  directory. The fix is to quote each decision from the start of a binding sentence (for example D-440
  "The saved game state holds the last judging of each character, program and map: …", D-213 "Saved-game
  code turns a game state into …"), or to drop the marker where no binding sentence fits.
- Contradiction: no
- Slice: 4
