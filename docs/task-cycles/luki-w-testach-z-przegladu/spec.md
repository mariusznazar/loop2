# Spec — loop2: luki w testach, testy padające losowo i znaczniki niezmienników z przeglądu fundamentu

- Task: `.runs/task-cycles/luki-w-testach-z-przegladu/task.md`
- Open choice: how To do 16 — the JavaScript lint rules of D-29 cover the session-start hook script
  in `.claude/hooks/` and the older scripts of the play skill — is met in the foundation and in the
  code, given that D-29 limits ESLint to five parts and its *Rejected* names the whole repository
  for the play skill's scripts. Every other item of the task (1–15, 17) carries no open choice and
  is not settled here.

## Intent

The hook `.claude/hooks/the-way-pin-check.mjs` runs on the machine of everyone who starts a Claude
Code session in the repository root, and the three scripts of the skill `loop2-play` are run by
agents; ESLint gives all of them an empty rule set today (`eslint --print-config` gives
`"rules": {}`), so a defect such as an unused binding or an undefined name passes the gate with no
signal. The change puts exactly these files under the rules D-29 already applies, keeps that reach
by the test that keeps D-29's scope, and changes nothing else about what the linter or the
formatter does.

## Goals and non-goals

Goals:

- G1. ESLint gives `@eslint/js` `recommended`, with `noInlineConfig` and the globals of Node.js, to
  every JavaScript file under `.claude/hooks/`, `.claude/skills/loop2-play/` and
  `.agents/skills/loop2-play/`, as it gives them to the files of the five parts; the one ESLint run
  of the gate reports nothing on them.
- G2. The scope test of D-29 fails, naming the files, when one of those files receives no rule set,
  and fails when one of the three directories holds no script file.
- G3. The one report ESLint gives on those files today is repaired in both copies of the skill, and
  the two copies stay byte for byte the same.
- G4. D-29, the invariant `eslint-source-rules` and the *Linter* rule of `guidelines/coding.md` say
  the new scope; the request's description puts the change of D-29 before the human as a changed
  decision, its *Rejected* included.

Non-goals:

- N1. No change of the rule set: no rule added, removed or reconfigured; no new dependency; no new
  version of ESLint, `@eslint/js`, typescript-eslint or globals.
- N2. No change of D-32, of `prettier-source-format`, of `PRETTIER_PATTERNS`, of `.gitattributes` or
  of the Prettier and LF cases of the scope test: To do 16 names the linter alone, and widening the
  formatter to the play skill would rewrite `frames.js` (see Decision 2).
- N3. The scripts of the skill `loop2-scene-art` (11 `.mjs` files in each of
  `.claude/skills/loop2-scene-art/` and `.agents/skills/loop2-scene-art/`), the files under `.claude/agents/`, and every other file of `agent-workflow`
  stay outside D-29. The source of To do 16 (loop2#136, *Fix or let through* 2) speaks of "the new
  script" and "the older scripts of the game-playing skill", which is `loop2-play`.
- N4. No change of the behaviour of the hook, of `frames.js` or of `save-frames.mjs`; no change of
  `.claude/settings.json`, of D-414 or of its test `tests/agent_workflow/test_the_way_pin_hook.py`.
- N5. No test that the two copies of the play skill agree; no change of the part map.
- N6. No type-aware lint for these directories: none holds a TypeScript file.

## Constraints

- The task: To do 16 asks for the rules of D-29 on the session-start hook and on the older scripts
  of the play skill. It names neither D-32 nor the scene-art skill. Its *Decisions in play* do not
  name D-29, so the change of D-29 is one the cycle adds; the human accepts it at the merge, where
  the description puts it before them.
- D-29 (`foundations/decisions.md`, `### D-29`): its binding sentence and *Scope* name the five
  parts browser-view, simulation, account-server, build-tools and deployment; "a test keeps its file
  patterns to that scope"; "Changing the rule set takes a human-accepted change of this decision";
  its *Rejected* holds "the whole repository — the scripts of the play skill would need fixes in two
  copies, an exception, or a change of the shape of one of them and a check of the skill in a real
  browser, a risk and work with no gain for the game". The description of the request that brought
  that sentence (loop2#91, commit `8d211cbe`, "say in D-29, D-32 and their invariants that a test
  keeps the TS/JS scope of ESLint, Prettier and LF, with deployment in the scope") gives no reason
  beyond the sentence itself.
- D-32 carries the same five parts and the same rejected option word for word; D-28 ("The general
  coding quality checks cover all code, tests included", *Scope* including agent-workflow) is not
  changed and is not contradicted by a wider D-29.
- The code as it stands, verified in this worktree at `0b23580b` with the pinned ESLint 10.12.0,
  `@eslint/js` 10.0.1 and Prettier 3.9.10 of the main checkout's `node_modules`, through a temporary
  configuration in `.runs/designer/` since removed:
  - with `recommended`, `noInlineConfig` and `globals.node` on the hook and the play scripts of both
    copies: exactly two reports, `compose-state.mjs:18:7 'POINTS' is assigned a value but never
    used (no-unused-vars)`, one in each copy; the hook, `frames.js` and `save-frames.mjs` report
    nothing;
  - without the globals of Node.js: twelve further `no-undef` reports on `process`, `console` and
    `Buffer` in the hook, `compose-state.mjs` and `save-frames.mjs`, so the globals of Node.js are
    part of what the files need, as `scripts/**` and `tests/**` get them;
  - Prettier with the flags of D-32 passes the hook, `compose-state.mjs` and `save-frames.mjs`, and
    fails `frames.js`, whose only difference from Prettier's output is a semicolon after its closing
    brace: the file is a bare function expression given to `playwright-cli run-code` as the body of
    the code to run;
  - the three play scripts and `SKILL.md` are byte for byte the same in `.claude/skills/loop2-play/`
    and `.agents/skills/loop2-play/`; all those files and the hook are stored with LF.
- `tests/quality/test_quality_invariants.py` already runs ESLint on `.` with an empty suppressions
  file, so once the configuration gives these files rules, that one run reports on them; it needs
  no change.
- `tests/quality/test_source_tool_scope.py` drives its three cases from one list of parts
  (`SCOPE_PARTS`) and reproduces no pattern syntax of a tool (its docstring, after D-83).
- No new dependency; the rule set does not change.

## Decisions

### Decision 1 — the scope is named by directory, beside the five parts

D-29's scope becomes: every application, script and test TypeScript and JavaScript file of the
five parts, as today, and every JavaScript file under three directories of `agent-workflow` —
`.claude/hooks/`, `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/`. A file added later
to one of these directories is covered with no change of the configuration; a script added
elsewhere in `agent-workflow` is not.

Ways weighed:

| Way | Cost | Why it lost or won |
|---|---|---|
| a. the whole part `agent-workflow` | brings in the 22 scene-art scripts and `.claude/agents/`, beyond To do 16; their reports are unknown; the play and scene-art skills each need fixes in two copies | widens the task |
| b1. the seven files by name | the narrowest; a second hook script added next to the first passes the gate unchecked, the gap loop2#136 named | the hook directory is where the risk To do 16 names lives |
| **b2. the three directories (chosen)** | covers exactly today's seven files and every later file in the same directories; the scene-art scripts stay out | the smallest reading that does not reopen the gap for the next hook or play script |
| c. the hook alone | narrows To do 16 against its wording | excluded by the task's wording |
| d. no change | To do 16 unmet | excluded by the task |

Cost if wrong: if the scope proves too narrow (a scene-art script breaks in a way the linter would
have caught), a later task adds a directory to the same list in the configuration, the test and
D-29, the same edit as this one. If it proves too wide (a later hook or play script cannot pass
`recommended`), its author repairs the file or moves it, as for any file of the five parts.

### Decision 2 — D-29 changes, D-32 does not

Only the linter widens. D-32 and `prettier-source-format` stay word for word, and the Prettier and LF
cases of the scope test stay on the five parts.

Ways weighed:

- D-32 widened by the same directories — `frames.js` fails Prettier, which wants a semicolon after
  the function expression the skill hands to `playwright-cli run-code` as a file. That is exactly the "change of the shape of one of them and a check of the
  skill in a real browser" that D-29 and D-32 rejected, and To do 16 does not ask for formatting.
  Lost.
- D-32 widened by the hook directory alone — the hook passes Prettier and is stored with LF, so it
  would cost one more pattern and one LF line; but it goes beyond To do 16, which names the lint
  rules, and splits the formatter's scope in a way no source asked for. Lost; a later task may add
  it.
- **D-32 unchanged (chosen)** — the smallest reading; the scope test gets a list of its own for
  ESLint (Decision 4).

Cost if wrong: the hook and the play scripts may drift from Prettier's layout or gain CRLF on a
Windows checkout with no signal; neither changes what the scripts do, and a later task widening
D-32 meets the same `frames.js` question with this spec's finding in hand.

### Decision 3 — the configuration unit: `eslint.config.mjs`

What it does: gives the three directories' JavaScript files (the extensions of `extensions`) the
`recommended` set it gives the five parts, and the globals of Node.js. How it is used: unchanged —
the one ESLint run of the gate and the scope test's helper `tests/quality/eslint-rule-sets.mjs` both
read it. What it depends on: nothing new. These directories join neither the TypeScript patterns
nor the TypeScript programs (N6); a TypeScript file added there later would make the scope test fail
on the typed rules, which is the signal that the configuration needs it.

`frames.js` gets the globals of Node.js with the rest: it runs in the Node.js process of
`playwright-cli`, it reads no global today, and the probe found no report with or without them.

### Decision 4 — the test unit: the ESLint case of `tests/quality/test_source_tool_scope.py`

What it does: the case `test_eslint_gives_every_scope_file_the_rule_sets` checks a list of its own —
the files of the five parts, as today, and every tracked or would-be-tracked JavaScript or TypeScript
file whose path lies under one of the three directories — and names each file that does not receive
the published sets. It also fails when one of the three directories yields no script file, so that a
rename of the skill or of the hook directory does not empty the list in silence. How it is used: as
today, by the gate. What it depends on: the part map through `file_owners`, the same listing of files
the test already uses, and a constant of the three directories written as plain path prefixes, never
as a pattern of a tool (the docstring's rule after D-83).

The Prettier case and the LF case keep `scope_files()` of the five parts unchanged (Decision 2).

The case must first be seen red on the configuration as it stands, naming the seven files, before the
configuration changes; and `test_quality_invariants.py`'s ESLint case must be seen red on the two
`POINTS` reports once the configuration reaches the files and before the repair.

### Decision 5 — the repair: the unused constant of `compose-state.mjs`, in both copies

The constant `POINTS` (`compose-state.mjs:18`) is read by no expression; it is removed in
`.claude/skills/loop2-play/compose-state.mjs` and `.agents/skills/loop2-play/compose-state.mjs`
alike, and the two copies stay byte for byte the same. No other covered file needs a change.

How it is shown that the play skill still works, with no real browser:

- `frames.js` and `save-frames.mjs` and the hook keep their bytes;
- the removed binding is one ESLint's `no-unused-vars` itself reports as read nowhere, so the
  document `compose-state.mjs` prints cannot change;
- after `npm run build`, `node .claude/skills/loop2-play/compose-state.mjs` and the same command on
  the `.agents/` copy end with code 0 and print one JSON document, which `loadSavedGame` of the
  built `saved-game.js` loads without refusal, as `SKILL.md` asks of a composed state; the cycle
  records that run;
- the comparison of the copies (for example `cmp`) is recorded.

The check in a real browser D-29's *Rejected* feared belonged to a change of `frames.js`'s shape, the
Prettier side, which Decision 2 leaves out.

### Decision 6 — reversibility

The change of To do 16 stands in commits of its own, apart from the other items of the task, so that
the human can refuse it at the merge by reverting them: the configuration, the test and the
foundation and guideline entries return to the five parts, and the removal of `POINTS` may stay, since
it changes no behaviour. If the request's description is accepted with the rest and only D-29's
change is refused, nothing else in the task depends on it.

## Foundation entries

- **D-29** (decision, changed): its binding sentence and *Scope* say that the rules also reach every
  JavaScript file under the directory of Claude Code's hooks and under both copies of the play skill,
  of `agent-workflow`, and that the test keeps the patterns to that wider scope; its *Rationale* says
  why these directories — the hook runs at every session start on every reader's machine, the play
  skill's scripts are run by agents — and why a later file there is covered; its *Rejected* reworded
  so that "the whole repository" no longer rests on the play skill's scripts for the linter, with the
  ways rejected here named: the whole part `agent-workflow` (beyond the task, the scene-art scripts
  with it), the files by name (the next hook passes unchecked), and the formatter widened with it
  (`frames.js` would change shape). The request's description names this as a change of a decision,
  the reversal of a rejected option included, for the human to accept at the merge. Its *Verification*
  and the sentence on changing the rule set stay.
- **eslint-source-rules** (invariant, changed): its sentence names the same three directories beside
  the five parts, and its *Part* gains `agent-workflow`.
- **D-32**, **prettier-source-format**, **D-28**, **D-414** and the part map: unchanged.

The foundation step words these entries through `the-way-record-decision` and
`the-way-record-invariant`.

Guideline file: `guidelines/coding.md`, rule *Linter*, the paragraph on the patterns of
`eslint.config.mjs`: it says the patterns cover every TS/JS file of the parts in D-29's scope and of
the three directories of `agent-workflow` it names, that a new file in those directories is covered
with no change, and that a new script elsewhere in `agent-workflow` is not. Changed by the method of
`the-way-maintain-coding-guidelines`. Its *Formatter* rule is unchanged.

## Left to the maker

- The exact form of the new patterns in `eslint.config.mjs` (one list beside `directories` or entries
  pushed into `sourceFiles`), within Decision 3.
- The name of the test's constant of directories and how the docstring of `test_source_tool_scope.py`
  says that ESLint's scope is the five parts plus three directories while Prettier's and LF's stay the
  five parts.
- Whether the explanatory note on `POINTS` ("practice of its skill that pays the branch's cost") moves
  to the line that pays the practice, as a comment, or goes with the constant — with no change of what
  the script prints.
- Which `decision:` line, if any, the ESLint case of the scope test gains for D-29's new sentence.
- Where in the plan this item's slice stands among the task's other slices, within Decision 6.
