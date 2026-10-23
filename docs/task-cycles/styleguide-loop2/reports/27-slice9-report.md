# Report 27 — slice 9: the pointer and the rule in the instruction files

- **Status:** done with concerns
- **Branch and commit:** `task/styleguide-loop2`, one commit
  `b33aa2761e00fef538c569dc5860ecef4dd28e62` ("docs: point agents to the browser-view styleguide and
  keep design tokens in src/browser/AGENTS.md") on the base
  `73b0563abee12f3973fcb8084c449c4e8c11ec8e`. Not pushed. Author address `<private address>`.
- **Method:** `.the-way/task-cycle/change/SKILL.md` (executor of a planned slice); To do 10 through
  the pinned `.the-way/instruction-files/SKILL.md` directly, mode *place* (Q-P2), with
  `principles.md` and `tool_loading.md` read whole. Never the personal `maintain-instruction-files`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `AGENTS.md` | 4 | 0 |
| `src/browser/AGENTS.md` (new) | 9 | 0 |

= the slice's *Change*. Nothing inside `<!-- the-way:begin -->` … `<!-- the-way:end -->` changed;
`CLAUDE.md` unchanged.

### What stands now

`AGENTS.md:8` and `:10`, outside the installer block (which now runs from `:14` to `:26`):

> Before changing a file of the part `browser-view`, read `guidelines/styleguide-browser-view.md`; the part's files are listed in `foundations/part_map.md`.
>
> When working in `src/browser/`, read `src/browser/AGENTS.md`.

`src/browser/AGENTS.md`, whole:

> # Browser view
>
> ## Design tokens
>
> In a file of the part `browser-view` other than `src/browser/tokens.css`, write no colour in any notation, and in a style no length in `px`, `rem` or `em`, no font name and no unitless stroke width, dash pattern, opacity or font weight. Read the value instead from its custom property in `src/browser/tokens.css` through `var(--<name>)`, in a stylesheet and in a TypeScript string alike, or give the element a class whose rule in `src/browser/styles.css` reads it. What counts as such a value and what is exempt is D-43 in `foundations/decisions.md`, set out in the rule "No value in place of a design token" of `guidelines/styleguide-browser-view.md`.
>
> The invariant `browser-view-token-values` in `foundations/invariants.md` guards this rule; a value the text of a file does not show, such as a colour a module computes from numbers, is left to review.
>
> This holds with a human present and without one. A value the token file does not hold yet enters it only with its source settled with the human, as the styleguide's rule "Every value with its source" gives; without a human, name the missing value in your report instead of choosing one.

## The *place* procedure, step by step

Read step: governing copy — `git -C .the-way/instruction-files rev-parse --show-superproject-working-tree`
printed `C:/Storage/repos/loop2-wt/styleguide-loop2`, the repository under review, so the pinned copy
governs; pin check `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` =
`f0b21309a837273a1540f9a704c2dfde6083ec00`. Files of the base's `size` lines read whole (`AGENTS.md`,
`CLAUDE.md`, `guidelines/coding.md`), and after the change the two new ones (`foundations/part_map.md`,
`guidelines/styleguide-browser-view.md`, both read whole). Tools in use: Claude Code (`CLAUDE.md` =
`@AGENTS.md`, `.claude/skills/`) and Codex (`.agents/skills/`); no `.cursor/` in the repository —
the layout of principles §4 is the same for all three, so nothing depended on Cursor. Decisions with
*Scope* `agent-workflow` read whole (D-12, D-13, D-15, D-28, D-30, D-31, D-38); none concerns
instruction files, so no verdict contradicts one. Loading settings searched by key only:
`~/.claude/settings.json` — `claudeMdExcludes` excludes only `C:/Storage/AGENTS.md`, no
`instructionFiles` (default `claude-md-or-agents-md`); repository has no `.claude/settings*.json`;
`~/.codex/config.toml` — `project_doc_fallback_filenames = ["CLAUDE.md"]`, `project_doc_max_bytes =
65536`, no `AGENTS.override.md`, `CODEX_HOME` unset; no `CLAUDE.local.md` in the repository. Where
sessions start: not asked (questions go to the orchestrator); the evidence at hand is this session
and the cycle's agents, started at the repository root or the task worktree's root — so Codex
reaches `src/browser/AGENTS.md` only by the main file's pointing line, which is why that line stands.

1. **Mistake or carried decision.** Neither rule is placed for a mistake found in records; both
   carry what the repository records: the token rule carries D-43 and the invariant
   `browser-view-token-values` (task row 6, row 11; To do 10); the styleguide pointer carries D-38
   and the reading step of `.the-way/product-guidelines/reading.md`, whose condition is the
   styleguide's own *When to read* ("Przed zmianą dowolnego pliku części `browser-view`"). No
   session records were searched, as the exception of `SKILL.md` *Place* step 1 needs none.
2. **Trigger and mechanism.** Token rule: trigger "working with files of `browser-view`", every
   time — the mechanism stands first and already exists, the test of `browser-view-token-values`
   in `npm test` (Slice 4); the instruction covers what it cannot — what to write instead, and the
   values the text does not show, left to review. Styleguide pointer: trigger "changing a file of
   `browser-view`", which spans `assets/**` and `tests/view/**` beyond `src/browser/`, so it stays
   in the main file (task To do 10).
3. **Same subject.** `grep -i "token|styleguide|src/browser|browser-view"` over `AGENTS.md`,
   `CLAUDE.md`, `.claude/**`, `.agents/**`: only the skill-list lines naming
   `the-way-maintain-styleguide`; no rule on the same subject, nothing replaced.
4. **Wording (principles §5).** Trace: `var(--<name>)`, a class of `src/browser/styles.css`, a
   value in `src/browser/tokens.css`; the prohibition says what to do instead; it says it applies
   with a human and without; no event, no emphasis; no command of its own (To do 10).
5. **Approval.** The accepted To do 10 stands for it (handoff, Q-P2); the human accepts the wording
   at the merge.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/instruction-files/check_instructions.py .` on the base `73b0563` | 0 | 0 error, 14 warn, 3 info |
| same, after the change (staged, and again on `b33aa27`) | 0 | 0 error, 14 warn, 6 info. Diff to the base: the one base warning moved from `AGENTS.md:19` to `AGENTS.md:23` (`foundation_check.py`, same text, four lines added above it); new `size` info lines for `foundations/part_map.md`, `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md`. No new warning anywhere, none at `src/browser/AGENTS.md` |
| positive control 1: the pointing line removed from `AGENTS.md` for a moment | 0 | 15 warn: `WARN nested-pointer src/browser/AGENTS.md:0 no line of the root AGENTS.md points to src/browser/AGENTS.md; …` — the check sees the nested file and its pointer. Restored from a copy |
| positive control 2: a line naming `src/browser/no-such-file.css` appended to `src/browser/AGENTS.md` for a moment | 0 | `WARN dead-path src/browser/AGENTS.md:10 …` — the check reads paths in the new file. Restored from a copy |
| `python -B .the-way/elements/common/foundation_check.py` before `git add` | 1 | the one expected error, `src/browser/AGENTS.md` matches no file git tracks (the check counts tracked files) |
| same, after `git add` and on `b33aa27` | 0 | `0 errors` |
| `npm test` (log `reports/slice9-npm-test.log`), on the staged tree identical to `b33aa27` | 0 | build; node tests 173 pass, 0 fail, 0 skipped; gate 252 tests in 4 directories pass (`tests/agent_workflow` 5, `tests/deploy` 64 — Docker answered, nothing skipped, `tests/invariants` 156, `tests/quality` 27); `foundation_check.py` inside the command: `0 errors` |
| `grep -nE "npm\|python\|node \|unittest\|run_tests\|\.py\b" src/browser/AGENTS.md` | 1 | no command in the rule (To do 10: "bez własnej komendy") |

No test was written: the change is prose that instructs agents. The-way's own test for such text is
what an agent does with it (make-change §2; principles §6 "In operation"), and that was **not run**
— no fresh session was started to see whether an agent loads `src/browser/AGENTS.md` and follows the
rule. Unchecked, with that reason. What must hold every time is kept by the invariant's test, which
passed in `npm test`.

## Own-work check (WAY-164)

- **Requirement most likely missed:** To do 10's "wskaźnik … poza blokiem instalatora the-way" and
  "bez własnej komendy". **Check:** `grep -n` of the two pointer lines and the block markers in
  `AGENTS.md` — pointers at `:8` and `:10`, block `:14`–`:26`; the command grep above on
  `src/browser/AGENTS.md`, exit 1. **Showed:** both hold.
- Second reading: the rule's list against D-43's binding sentence — colour in any notation in styles
  and TypeScript; in styles only, `px`/`rem`/`em`, font name, the four unitless kinds. The rule says
  the same split ("in a style" for the second group), so TypeScript geometry stays exempt as D-43
  gives; the exemptions are referred to D-43 and the styleguide, not repeated.
- No user interface changed; the screenshot check of make-change §3 does not apply.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Wording in English, unwrapped paragraphs, like the lines of `AGENTS.md` outside the block | Polish, like `guidelines/` | a reword of 13 lines |
| The styleguide pointer names the part and points to `foundations/part_map.md` for its files | listing the part's paths in `AGENTS.md` | none now; a listed copy would drift from the map as the part grows (principles §2, content that changes often) |
| The pointer to `src/browser/AGENTS.md` uses the principles' form "When working in `x/`, read `x/AGENTS.md`" | a pointer conditioned on the part | none; the nested file states its own scope (the part's files) |
| The rule names the invariant and the files of its trace, no command; `npm test` is not repeated (the main file says it) | naming the invariant's test file or `npm test` | an agent not knowing which test guards it — the invariant entry names its method `test` |
| The rule adds what to do instead (`var(--<name>)` or a class of `styles.css`) and a sentence on human presence, with "without a human, name the missing value in your report" | the bare prohibition To do 10 words | principles §5 requires both; the last clause restates the styleguide's "never from memory" for unattended agents — if the human finds it beyond To do 10, one sentence goes |
| Heading `# Browser view` / `## Design tokens`, so a later rule of the part has its place | one heading only | none |

No adaptation of section 4 was needed; the plan's *Change*, *Read* and *Checks* matched the code.

## Concerns for the next dispatch

1. **Behaviour of the rule untested in a session.** Unchecked as above; whether the cycle wants one
   fresh-session probe (principles §6) is the orchestrator's call. My recommendation: none — the
   invariant's test keeps the rule every time, and the request's human reads the wording.
2. **`AGENTS.md` now makes `check_instructions.py` follow `foundations/part_map.md`** (a new `size`
   line): it adds no warning today, but any future path in backticks in the part map will be checked
   as an instruction-file path. A side effect of naming the map, not a defect.
3. **`src/browser/AGENTS.md` loads for work in `src/browser/sim/`** (part `simulation`), as plan
   choice C9 accepted; the rule's first words limit it to files of `browser-view`.
4. **Whole-change review inputs carried from earlier slices** are untouched here (README
   „bursztynowy”, the Minor findings listed in `cycle.md`).
5. Working file left: `reports/slice9-npm-test.log` (under ignored `.runs/`).
