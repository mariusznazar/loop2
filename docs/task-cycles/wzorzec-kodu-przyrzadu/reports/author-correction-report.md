# Author correction report — `wzorzec-kodu-przyrzadu`, correction 1 (remarks on request #164)

**Status:** `done`.

Commit (private email `mariusznn@gmail.com`; not pushed): `a44a0fd0` `test: :white_check_mark: read in the scan of the clock and of random numbers Math, Date and performance also after a colon, a bracket, return, an arrow and a question mark, each with a control case, and say in its docstring what the pattern reads and where it is stricter than the invariant`. It changes one file, `tests/invariants/test_balance_instrument_repeatability.py`. No file of `balance/` and no foundation entry changed; `guidelines/coding-balance-instrument.md` needed no change (see remark 1).

## Remark 1, fix in this request: done

- **Control cases first.** Six cases added to the control list before the pattern: the five probe forms of the review of the fix (`const o = { m: Math }; … o.m.random()`, `const [m] = [Math]; … m.random()`, `function g() { return Math; } … g().random()`, `const g = () => Date; … g().now()`, `const m = true ? Math : null; … m.random()`) and a sixth for the other arm of a conditional (`cond ? null : globalThis.Math`). Failing run, before the pattern: `npm test -- tests/invariants/test_balance_instrument_repeatability.py` exit 1, `FAIL: test_control_the_scan_flags_each_forbidden_form`, a subtest failure `the scan does not flag '…'` for each of the six new sources (and no other failure).
- **The pattern.** `CLOCK_OR_DRAW_AS_VALUE` now reads: `Math`, `Date` or `performance`, alone or as a member of a chain, after `=>`, `=`, `,`, `(`, `:`, `[`, `?` or `return` and before `;`, `,`, `)`, `]` or `}`; or after `?` and before `:`. The five left-hand forms of the remarks are in; two things go beyond the remarks' list and are named here: (a) the right side had to grow with `]`, `}` and, for a conditional, `:`, because `[Math]`, `{ m: Math }` and `? Math :` end with them, and the five probe forms cannot be caught otherwise; (b) the conditional is a second alternative (`?` … `:`) and not the plain `:` on the right, because `:` on the right of the plain form would flag `{ …, Date: 1 }`, which is clean. Passing run: the same command exit 0 (2 tests OK); the first test of the file, which scans the real `balance/`, still passes, so no new form flags a line of the instrument and nothing in `balance/` needed handling.
- **Control against false positives.** Four lines added to the clean source (`list.length > 0 ? list[0] : null`, an arrow function with `Math.round`, `return list[0]`, `{ key: 1, other: [Math.PI] }`); the control still passes.
- **Docstring.** It now says exactly what the pattern reads (the sentence of the pattern above), and has a new paragraph "Stricter than the sentence" that names the harmless uses flagged: `new Intl.DateTimeFormat('pl').format(new Date(0))`, `Object.keys(Math)`, `String(row.Date)`, `const { UTC } = Date`, `x === Date`, and a variable, field or function named `uptime`, `timeOrigin` or `hrtime`. "Does NOT cover" gained the places the pattern does not read (after `||`, `&&`, `...` or `{`, as in `{ Math }`). I ran each of these as a probe against `findings()` (`.runs/author-correction/probe.py`): the seven harmless forms are flagged, the four uncovered forms (`b || Math`, `b && Date`, `[...Math]`, `{ Math }`) are not, as the docstring says.
- **The guidelines file.** The rule "Zegar i losowość" says only what the test misses (a generator from scratch, a name built at run time, an object handed in from outside the file, a method that reads the current moment under no named form). The new patterns make none of that wrong and the rule does not say what the test reads, so, as the handoff says (correct where the patterns make it wrong, nothing more), I left it as it is. The places the pattern does not read are in the docstring only; the rule never claimed otherwise.

## Remark 2, let through (the three copies of the lexer): nothing done

Not asked of me; the lexer in `tests/invariants/balance_source_scan.py` and the two simulation tests is unchanged.

## Remark 3, partly fix in this request: the full `check-map` comparison done; the campaign outcome let through

- **Base code of `balance/`:** the tree of `4ee41c5f1d54172f646172da9b3f248dcaf5755e`, made as a detached worktree of that commit at `.runs/author-correction/base/` of this worktree (`git worktree add --detach`); its `balance/` file list equals the head's. Junctions `node_modules` and `dist` in it, made with `mklink /J`, to this worktree's `node_modules/` and built `dist/` (the sources of the game are the same at both commits; no file of `src/` differs, so one build serves both).
- **Head:** this worktree after `a44a0fd0`, whose `balance/` is `59081e9f`'s (`git diff --stat 4ee41c5f HEAD -- balance`: 4 files, 50 insertions, 40 deletions).
- **Command, each tree, run from the tree's root:** `node balance/cli.mjs check-map --overlay balance/overlays/<overlay>.json` for `<overlay>` = `dead-zone`, `forest-pack`, `wasteland`, with the flags the skill `.claude/skills/loop2-balance/SKILL.md` gives for `check-map` (only `--overlay`), no `--maps`, no `--programs`, so all 500 seeds and all 23 reference programs: each output has the header and 23 rows. Standard output and standard error of each, and the exit codes (all 0), were compared with `cmp`.
- **Result:** `dead-zone`, `forest-pack` and `wasteland`: standard output byte for byte identical, standard error identical (empty), base against head. Time: about 3.5 minutes for the three overlays on each tree (about 70 seconds each).
- The outputs stayed in `.runs/author-correction/out/` and were removed with that directory; nothing entered the repository (D-429).
- **The campaign outcome at the limit** (nothing prints it): let through without a task; I did nothing for it, as the remarks say.

## Checks (command, exit code), at head `a44a0fd0`

| Check | Command | Exit |
|---|---|---|
| New test, repeatability (failing run before the pattern) | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 1 |
| New test, repeatability (after the pattern) | same | 0 (2 tests OK) |
| New test, writes | `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | 0 (3 OK) |
| Ruff format | `.runs/quality-venv/Scripts/ruff.exe format --config ruff.toml --check tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| Ruff lint | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`, as before) |
| `check-map` base against head, 3 overlays | commands above, `cmp` | 0, 0, 0 (identical) |

Not run: `tests/balance/` (no file of `balance/` changed), ESLint and Prettier (no `.mjs` file changed), the full `npm test`.

## Own-work check

The requirement most likely not met: "each new left-hand form must not flag the clean source or the real `balance/` files". The check: the first test of the file scans the real `balance/` with the new pattern and passes (exit 0), and the control's clean source, extended with four more harmless lines, passes. The weak point is the right-hand set I had to extend (`]`, `}`, `:` after `?`): it is stricter than the remarks' list and flags `Object.keys(Math)` and `const { UTC } = Date`, which the docstring now says. Mutation in my head: dropping `return` or `=>` from `VALUE_LEFT` fails the `return Math;` and `() => Date;` cases; dropping the second alternative fails `true ? Math : null`; dropping `:` from the left fails `{ m: Math }` and `cond ? null : globalThis.Math`; dropping `[` fails `[Math]`.

## Unread material

None. I read the remarks file, the handoff and the test file whole, and the review-of-the-fix report only at its section "New findings in the fix diff" (the handoff allows it). `.the-way/task-cycle/change/SKILL.md` I did not re-read whole: I re-used the reading from the first round (the variant's row says the human's remarks bind and the report holds each remark as made); not read again this round.

## Searches not found or unclear

None. One point of reading: remark 3 says "partly fix"; I took the full `check-map` comparison as what is asked and the campaign outcome as let through, as the handoff says.

## Working copies

All under `.runs/author-correction/` of the worktree (`.runs/author-correction/`): the base worktree `base/` (of `4ee41c5f`) with the two junctions `base\node_modules` and `base\dist`; `out/` (the outputs of the six runs and `exits.txt`), `measure-checkmap.sh`, `probe.py`, `before-patterns.txt`, `fc.txt`, `ci.txt`. Junction handling: both junctions removed first with `cmd /c rmdir` (not `rm -r`), after which `node_modules/` (268 entries) and `dist/browser/sim/` (21 entries) of this worktree were checked intact; then `git worktree remove --force` of `base/` and `git worktree prune` (`git worktree list` no longer names it). The directory `.runs/author-correction/` itself was then removed with `rm -r` by its full path (see below). `node_modules/`, `dist/` and `.runs/quality-venv/` of the product's own tools stay, ignored by git.
