PASS b33aa2761e00fef538c569dc5860ecef4dd28e62

# Review 28 — slice 9: the pointer and the rule in the instruction files

- **Reviewed:** slice 9, range `73b0563abee12f3973fcb8084c449c4e8c11ec8e..b33aa2761e00fef538c569dc5860ecef4dd28e62`
  (one commit, `b33aa27` "docs: point agents to the browser-view styleguide and keep design tokens in
  src/browser/AGENTS.md", author `<private address>`). `git rev-parse HEAD` = the given head.
- **Method:** `.the-way/task-cycle/review/SKILL.md` of the pinned the-way `f0b2130` (gitlink and
  `git -C .the-way rev-parse HEAD` agree). Placement and wording judged by the pinned
  `.the-way/instruction-files/SKILL.md` (mode *place*), `principles.md` and `tool_loading.md`, read
  whole (Q-P2).
- **Read:** frozen `task.md` (To do 10, rows 1, 6, 11), `plan.md` (Foundation entries, Slice 9,
  Coverage, C9), `cycle.md` (questions table, Q-P2, FE-4, R-n2), `reports/27-slice9-report.md`;
  `AGENTS.md`, `CLAUDE.md`, `src/browser/AGENTS.md`; `.the-way/product-guidelines/reading.md`;
  D-38, D-43, invariant `browser-view-token-values`, part map (`browser-view`, `simulation`,
  `build-tools`, `agent-workflow`); `guidelines/styleguide-browser-view.md` (header, *When to read*,
  "No value in place of a design token", "Every value with its source", "The kitchen-sink page",
  *Where in code*); the docstring of `tests/invariants/test_browser_view_token_values.py` (its
  population); `src/browser/kitchen-sink/kitchen-sink.css` head.
- **Trust boundary:** the range touches none of `assets/icons/**`, `assets/fonts/**`,
  `scripts/kitchen-sink.mjs`. Irreversible operation: none.

## Findings

### Critical

none

### Important

none

### Minor

**m1 — the rule names only the game's stylesheet as the place for a class
(`src/browser/AGENTS.md:5`).** "or give the element a class whose rule in `src/browser/styles.css`
reads it" holds for the game's screens, but the kitchen-sink page, a file of `browser-view` the rule
covers, has its own stylesheet `src/browser/kitchen-sink/kitchen-sink.css` (it already holds classes
reading tokens, such as `.sample-hover`, `.sample-section`). The styleguide's rule "The kitchen-sink
page" and cycle choice R-n2 keep code needed only by the page out of what `npm run build` ships. An
agent changing the page that follows this rule literally puts a page-only class into
`src/browser/styles.css`, which goes to the test server; the test of `application-build-kitchen-sink`
looks for the page's marker and would not see a stray class. Effect: dead CSS on the test server,
no wrong look. Fix if wanted: "a class whose rule in `src/browser/styles.css`, or for the kitchen-sink
page in `src/browser/kitchen-sink/kitchen-sink.css`, reads it".

**m2 — the rule restates D-43's list of value kinds (`src/browser/AGENTS.md:5`).** The first
sentence repeats the kinds D-43 counts (colour in any notation; in styles `px`/`rem`/`em`, font name,
the four unitless kinds), which the styleguide's rule "No value in place of a design token" also
states. Principles §5: "A rule has one place." The wording is faithful to D-43 today (checked
sentence by sentence, including "in a style" limiting the second group, so TypeScript geometry stays
exempt), and To do 10 requires a rule to stand there, so some restating is mandated by the task. The
cost is drift: when D-43 changes (a fifth unitless kind, say), three texts change, and no check
compares them. Noted for the whole-change review; no change needed in this slice.

**m3 — the third paragraph covers new values only (`src/browser/AGENTS.md:9`).** "A value the token
file does not hold yet enters it only with its source settled with the human" — the styleguide's
rule "Every value with its source" binds a new *or changed* value ("nowa albo zmieniona wartość
dostaje wpis swojego źródła"). An agent without a human changing an existing token's value is not
told by this file to stop and report; it is told so only by the styleguide, which the main
`AGENTS.md` pointer sends it to. Small gap, since the styleguide pointer applies to the same files.
The sentence itself ("without a human, name the missing value in your report instead of choosing
one") is not beyond the task: principles §5 requires a rule to say whether it applies with a human
present or without one and what to do instead, and its content follows the styleguide's "nigdy
z pamięci".

### Out of scope

none

## Judgement against the task, the plan and the method

- **To do 10, pointer:** `AGENTS.md:8` names `guidelines/styleguide-browser-view.md` with the
  condition "Before changing a file of the part `browser-view`", outside the installer block
  (`<!-- the-way:begin -->` now at `:14`, `:end` at `:26`; block bytes unchanged in the diff). The
  condition matches the styleguide's own *When to read*; pointing to `foundations/part_map.md` for
  the part's files instead of listing them keeps the main file free of content that changes often
  (principles §2). It stays in the main file because the part spans `assets/**` and `tests/view/**`
  beyond `src/browser/` — correct by principles §3.
- **To do 10, rule:** stands in `src/browser/AGENTS.md`, with the pointing line `AGENTS.md:10` in the
  form principles §4 gives ("When working in `x/`, read `x/AGENTS.md`"), which Codex needs for
  sessions started at the root (`tool_loading.md`, Codex measurement 0 of 4). It names the invariant
  `browser-view-token-values` as its guard and carries no command (grep for commands: none). Plan C9
  placement is right: the invariant's population (`.css`, `.html`, `.ts`, `.mts`, `.cts` files of
  `browser-view`) lies entirely under `src/browser/` — `git ls-files tests/view assets` holds no file
  of those extensions — so the place where the rule loads covers every file the rule applies to;
  `src/browser/view/AGENTS.md` would miss `tokens.css`, `styles.css`, `index.html` and the
  kitchen-sink. No `CLAUDE.md` stands in `src/browser/`, so Claude Code reads the nested `AGENTS.md`
  on access (`tool_loading.md`).
- **Place, steps 1–5:** ground is a carried decision (D-43, invariant of row 11, To do 10), so no
  repeated mistake is needed (principles §7); mechanism first — the invariant's test in `npm test`
  — and the instruction only for what it cannot see ("a colour a module computes from numbers, is
  left to review", as D-43's *Verification* says); no rule on the same subject in `AGENTS.md`,
  `CLAUDE.md`, `.claude/**`, `.agents/**` (my grep for "design token", `tokens.css`,
  `styleguide-browser`: only the new line); wording traceable (`var(--<name>)`, `tokens.css`,
  `styles.css`), prohibition with its "instead", human presence stated, no emphasis, no history;
  approval by Q-P2 (accepted To do 10; the human reads the wording at merge).
- **Foundation:** `src/browser/AGENTS.md` is claimed by `agent-workflow` (part map line from the
  foundation step; FE-4 notes the root pattern `AGENTS.md` matches it too); `foundation_check.py`
  0 errors, so the last expected pattern error of the plan's table is cleared. No decision or
  invariant changed in this range.
- **Executor's concerns:** (1) no fresh-session probe — confirmed unchecked; the plan's *Checks*
  do not ask for one and principles §6 makes it a separate, costly question; the invariant's test
  holds what must hold every time. (2) `check_instructions.py` now follows `foundations/part_map.md`
  and `guidelines/styleguide-browser-view.md` — confirmed (two new `size` lines), no new warning; a
  side effect, not a defect. (3) the rule loads for `src/browser/sim/` — accepted by C9; its first
  words limit it to files of `browser-view`.
- **Own-work check (WAY-164):** it named "outside the installer block" and "no command"; the change
  is weakest at fidelity of the rule to D-43, which its second reading covered; I repeated that
  reading and found it faithful (m2 is about duplication, not about a wrong word).
- **Tests:** none written; the change is prose. No user interface changed (no screenshots due).

## Declined to judge

none

## Checks

| Check | Exit | Result |
|---|---|---|
| `git status --short` in the reviewed worktree, before and after | 0 | empty both times; HEAD `b33aa27` |
| `python -B .the-way/instruction-files/check_instructions.py .` (reviewed worktree) | 0 | 0 error, 14 warn, 6 info; the only warning at `AGENTS.md` is the base's `foundation_check.py` one, now `:23` (was `:19`); none at `src/browser/AGENTS.md` |
| same script against temporary worktrees of base `73b0563` and head `b33aa27`, outputs diffed | 0, 0 | 91 warn each (uninitialised `.the-way` and absent `.runs/` in a bare worktree); the diff is only two line numbers moved by four and three new `size` lines (`foundations/part_map.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`) |
| positive control: the line `When working in \`src/browser/\`…` deleted in the head's temporary worktree, script run again | 0 | adds `WARN nested-pointer src/browser/AGENTS.md:0 no line of the root AGENTS.md points to src/browser/AGENTS.md…` — the check sees the nested file and its pointer; restored, worktree removed |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0 | `0 errors` |
| `git ls-files --eol AGENTS.md src/browser/AGENTS.md CLAUDE.md` | 0 | `i/lf` for all three, as the base's files; new file ends in one newline |
| `git ls-files tests/view assets \| grep -E "\.(css\|html\|ts\|mts\|cts)$"` | 1 | no file of the invariant's population outside `src/browser/` (placement check) |
| executor's `reports/slice9-npm-test.log`, read | — | build; gate 252 tests in 4 directories pass (5, 64, 156, 27); `foundation_check.py` `0 errors` — claim consistent |
| `npm test` | not run | the full suite is the cycle's own run before the request (review method §2) |
| an agent loading and following `src/browser/AGENTS.md` in a fresh session | not run | needs fresh headless sessions per tool (principles §6); outside this review's checks and the plan's |

Temporary worktrees `wt-base` and `wt-head` were made in the session's scratchpad and removed with
`git worktree remove`.
