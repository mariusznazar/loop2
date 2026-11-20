PASS a44a0fd08f0392d0f984ac9353a4c6d5684f47d3

# Review of correction 1 — `wzorzec-kodu-przyrzadu`

Range: `8c7bbae1` to `a44a0fd0` (`git rev-parse HEAD` = `a44a0fd08f0392d0f984ac9353a4c6d5684f47d3`, the head given). One commit, one file: `tests/invariants/test_balance_instrument_repeatability.py`. The tree of `8c7bbae1` equals the tree of `001349f5`, the head of my last review (`git diff --quiet 001349f5 8c7bbae1` exit 0). `.the-way` at `19e5774a`, equal to the gitlink. The human's remarks, `reports/correction-1-remarks.md`, take the place of a findings file (`.the-way/task-cycle/review/fix.md`, last paragraph).

Counts: 0 blocking; 2 new Minor findings, within the task; 0 out of scope.

## Each remark

### Remark 1 — fix in this request: made

- **Left-hand forms.** `VALUE_LEFT` (`:69`) now holds `:`, `[`, `return`, `=>` and `?`, beside `=`, `,` and `(`. Each has a control case in `FLAGGED_SOURCES` (`:156-161`): `{ m: Math }`, `[Math]`, `return Math;`, `() => Date;`, `true ? Math : null`, and `cond ? null : globalThis.Math` for the other arm. My probes: all five forms of my Minor 1 of the last round are flagged now, and the earlier pattern flagged none of them.
- **Right-hand side widened beyond the remark.** It now also takes `]` and `}`, and a second alternative `?` … `:` for the value of a conditional. I accept it. `[Math]`, `{ m: Math }` and `? Math :` end with those characters, so the five forms the remark names cannot be caught without them. The plain `:` stays off the right of the first alternative, so `{ Date: 1, performance: 2 }` is not flagged. The widening serves the remark and says so in the docstring, so it is no addition nobody asked for.
- **No form lost.** The old pattern `[=,(]\s*NAME\s*[;,)]` is contained in the new one: its left characters and right characters are all in the new sets, and the name part is the same. My probes confirm it: every form the old pattern flagged is still flagged (`const D = Date;`, `[1].map(Date)`, destructuring from `globalThis.Date` and from `performance`, `const { random } = Math`, `const { now } = Date`).
- **No false finding on the real code or the control.** On the eight real files of `balance/`, the new pattern matches 0 times and the old one 0 times, and `findings()` gives nothing for any file. The clean control source, with its four new lines (`? list[0] : null`, an arrow with `Math.round`, `return list[0]`, `[Math.PI]`), gives nothing either.
- **Docstring.** The reading (`:13-17`) now says exactly what `CLOCK_OR_DRAW_AS_VALUE` reads; the comment at `:65-68` says the same. The new paragraph "Stricter than the sentence" (`:29-35`) names the harmless uses it flags. My probes found each of them flagged: `new Intl.DateTimeFormat('pl').format(new Date(0))`, `Object.keys(Math)`, `String(row.Date)`, `const { UTC } = Date`, and a local named `uptime`. "Does NOT cover" (`:37-43`) names what the pattern does not read; my probes confirm `b || Math`, `b && Date` and `{ ...Math }` are not flagged.
- **The guidelines rule left as it was** (`guidelines/coding-balance-instrument.md:114-118`): see Minor 2 below. It blocks nothing.

### Remark 2 — let through: no finding

The lexer is unchanged, as the remark lets it through.

### Remark 3 — partly fix in this request: made; the campaign outcome let through, as the remark says

The author's report gives the full `check-map` for the three overlays, base against head, as identical. I repeated one of the three on my own. On a worktree of the base `4ee41c5f`, with the built `dist/` of this worktree (no file of `src/` differs), and on the head, I ran `node balance/cli.mjs check-map --overlay balance/overlays/forest-pack.json` with no other flag: 500 seeds and all 23 reference programs. Both exited 0, and standard output (25 lines, 23 program rows) and standard error (empty) are byte for byte the same.

## New findings

### Minor 1 (within the task) — a TypeScript type annotation `: Date` would be flagged, a harmless use the docstring does not name

`tests/invariants/test_balance_instrument_repeatability.py:69-72`: the `:` on the left matches a type annotation. `export function f(d: Date): number { … }` is flagged ("takes Math, Date or performance as a value"). The scan reads `.ts`, `.mts`, `.cts` and `.tsx` files under `balance/` (`tests/invariants/balance_source_scan.py:21`), but "Stricter than the sentence" lists no such case. No file of the kind is TypeScript today, and the kind's files are `.mjs`, so it would only matter if a typed file came in. Name it in that paragraph.

### Minor 2 (within the task) — the guidelines rule does not name the new class of forms the test leaves to the reviewer

`guidelines/coding-balance-instrument.md:114-118` lists what the test misses: a generator from scratch, a name built at run time, an object handed in from outside, a method no form names. It ends "te przypadki pilnuje recenzent". The docstring now adds a fifth class, `Math`, `Date` or `performance` taken as a value in a place the pattern does not read (`b || Math`, `b && Date`, `{ ...Math }`, `{ Math }`). The rule does not have it, so a reviewer who reads the rule and not the test is not told to look there. Minor: the forms are unusual, and nothing in the instrument suggests them. One clause in the rule would close it.

## Declined to judge

none

## Checks run

| Check | Command | Exit / result |
|---|---|---|
| Head, pin, range | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git log 001349f5..a44a0fd0`; `git diff 8c7bbae1..a44a0fd0` | `a44a0fd0…`; `19e5774a`; diff read whole |
| Tree before the range | `git diff --quiet 001349f5 8c7bbae1` | 0 (equal) |
| Whitespace | `git diff --check 8c7bbae1..a44a0fd0` | 0 |
| Test, repeatability | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 (2 OK) |
| Ruff format | `.runs/quality-venv/Scripts/ruff.exe format --config ruff.toml --check tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| Ruff lint | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`, as before) |
| Scan probes | `python -B .runs/review-correction/probe_clock.py` (`findings()` and the old pattern on the 7 forms of the first Important 2, the 5 forms of my last Minor 1, 4 forms the earlier pattern flagged, the 5 harmless forms of my last Minor 2, 4 forms the docstring lists as uncovered, 5 other clean forms, the control's clean source, and the 8 real files of `balance/`) | 0; result kept as `reports/review-correction-probe-result.txt` |
| Full `check-map`, one overlay | `node balance/cli.mjs check-map --overlay balance/overlays/forest-pack.json` on a worktree of `4ee41c5f` and on the head; `cmp` | 0 and 0; output and error output identical |

Not run:
- the other two overlays of `check-map` (`dead-zone`, `wasteland`): the author's report holds them, and one repeat was enough to test its claim;
- the author's failing run before the pattern: my probe's old-pattern column shows the five forms unflagged before;
- ESLint, Prettier and `tests/balance/`: no `.mjs` file and no file of `balance/` changed;
- the full `npm test`: the cycle's run.

## Reaches beyond the dispatch

- `tests/invariants/balance_source_scan.py:21`, the file extensions the scan reads: for Minor 1.
- `guidelines/coding-balance-instrument.md:114-118` at the head: for Minor 2.

## Working copies

- `.runs/review-correction/base/`: a worktree of `4ee41c5f`, with junctions `node_modules` and `dist` to this worktree's. The junctions were removed first with `rmdir` and the targets checked intact; then `git worktree remove --force` (exit 0) and `git worktree prune`. Removed.
- `.runs/review-correction/`: the probe script and its result, the two `check-map` outputs and their error outputs, the outputs of the checks. The probe result is kept beside this report as `reports/review-correction-probe-result.txt`; the directory was then removed.

## Unread material

none

## Searches not found or unclear

none
