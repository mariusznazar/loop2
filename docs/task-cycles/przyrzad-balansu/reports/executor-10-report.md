# Report - executor of slice 10 (the skill `loop2-balance` and the line that leads to it)

**Status:** done

**Commits:** `4caa290f` on `task/przyrzad-balansu` (base `c2ead6ec`), one commit by path: `feat: :sparkles: add the skill loop2-balance, which tells an agent how to run the balance instrument, its overlays and the map check, with a test that both copies match and the description's shape, and a line in AGENTS.md that leads to it`. Author address `mariusznn@gmail.com`, as in the earlier commits of the branch.

## Files changed

| File | Added / removed lines |
|---|---|
| `.claude/skills/loop2-balance/SKILL.md` (new) | +127 / 0 |
| `.agents/skills/loop2-balance/SKILL.md` (new, byte-identical copy) | +127 / 0 |
| `tests/agent_workflow/test_loop2_balance_skill.py` (new) | +52 / 0 |
| `AGENTS.md` | +2 / 0 (one line and its blank line, beside the line of `loop2-play`) |

## What was made

- The skill has the frontmatter `name: loop2-balance` and a one-line description with no `: ` and no ` #`, under 400 characters.
- Its body covers: the one npm command (`npm run --silent balance -- <command> [flags]`, with `--silent` named because npm's banner lines otherwise reach standard output); the commands `sweep`, `trace`, `loop`, `campaign`, `programs`, `check-map` and `help` with what each prints; every flag, as `balance/cli.mjs` lists it; the overlay (what it changes, its keys, the refusal rules, the example `balance/overlays/forest-pack.json`, and its limit: data only, not the game's code, and a value a module reads once at loading escapes it); the map check step by step (the overlay file under `.runs/`, the `check-map` command, the columns, the table with no program contents, the agent's own attempt programs written under `.runs/` and measured by `sweep --overlay ... --program <path>`); where results go (standard output, or `--out` to a path outside the tracked files, under `.runs/`); and the timings measured here (`check-map` about 55 s for one overlay; two narrowed rows about 6 s).
- The test checks that both copies hold the same file set, that the two copies are byte-identical, and the description's shape (non-empty, under 400 characters, starts with a letter, no `: `, no ` #`, no tab). It follows the layout of `tests/agent_workflow/test_loop2_play_skill.py`, with three tests; it has no test of the skill's text beyond these checks, as the slice names.
- `AGENTS.md` gained: "To measure the game's balance, check a map before a package is defined, or run the balance instrument, read `.claude/skills/loop2-balance/SKILL.md`." beside the `loop2-play` line.
- No file the instrument writes is in the commit.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| The skill test | `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` | 0 | 3 tests OK (log `reports/executor-10-skill.log`) |
| Mutant of the test: one byte appended to the `.agents` copy | the same command after `printf '\n' >>` | 1 | fails, as it should; the copy was then restored and `cmp` showed it equal to `.claude`. The log of this run was lost with my working directory (see *Working copies*); the result is from the run itself |
| The instruction check | `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 errors, 144 warnings, 7 info (log `reports/executor-10-instructions.log`). The first draft of the skill gave four dead-path warnings for `programs.md`; I reworded them, so the count fell from 148 to 144. The warning `dead-path AGENTS.md:34 foundation_check.py` comes from text already at line 34 of the base commit |
| The private-path check | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 | 1 test OK (log `reports/executor-10-private-paths.log`) |
| The quality check (Ruff on the new test is run by this file) | `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK (log `reports/executor-10-quality.log`). I did not separately confirm that Ruff reported on the new file |
| Each command the skill names, run once as written | see below | 0 each | all exit 0 |

The commands the skill names, each run as written (all from the worktree root; stderr empty unless noted):

- `npm run --silent balance -- help`: exit 0.
- `... -- sweep --map forest --program forestBest --seeds 1-20`: exit 0, standard output is the header and summary as JSON.
- `... -- trace --map forest --program forestBest --seeds 1`: exit 0; last line `end: solved at minute 790`.
- `... -- loop --map forest --program forestBest --seeds 1-5 --hours 8,24`: exit 0.
- `... -- campaign --player edge-daily-best --seeds 1-2`: exit 0.
- `... -- programs`: exit 0, the programs in the game's words on standard output.
- `... -- programs --out .runs/executor-10/programs`: exit 0; 24 files written (the 23 programs as JSON and the Markdown file); one line on standard error.
- `... -- sweep --map forest --program .runs/executor-10/programs/forestBest.json --seeds 1-20`: exit 0, a program file passed by path is read.
- `... -- sweep --overlay balance/overlays/forest-pack.json --map forestPack --program forestBest --seeds 1-20`: exit 0.
- `... -- sweep --overlay .runs/executor-10/forest-pack.json --map forestPack --program .runs/executor-10/programs/forestBest.json --seeds 1-500`: exit 0 (the attempt form in the skill).
- `... -- check-map --overlay balance/overlays/forest-pack.json`: exit 0, 25 lines (header, separator, 23 rows), about 53 s. Saved as `reports/executor-10-check-map-forest-pack.md`.
- `... -- check-map --overlay balance/overlays/forest-pack.json --maps forestPack --programs forestBest,forestDeepBest`: exit 0, 4 lines (two rows).
- `... -- check-map --overlay balance/overlays/forest-pack.json --maps forestPack --programs forestBest --out <file under .runs/>`: exit 0; standard output empty, one file written, one line on standard error.
- `... -- sweep --map forest --program forestBest --seeds 1-20 --out <file under .runs/>`: exit 0; standard output empty, one file written.
- Refusals: `... -- check-map --overlay balance/overlays/forest-pack.json --programs noSuchProgram`: exit 1, one sentence on standard error, no measurement. `... -- check-map` without `--overlay`: exit 1, the sentence "--overlay is needed". Both as the skill says.

After every command `git status --porcelain` showed nothing, so no command wrote into the tracked files.

## Own-work check

- The skill and its copy: `cmp` equal before the commit and after the mutant. The test runs and passes.
- Every command the skill names was run once as written (above). The two commands that take placeholders (`--out <file>`, `<attempt>`) were run with concrete paths under `.runs/`.
- The new files contain no name of the author's notes, no folder of them, no path on the author's disk and no D-80. I searched them for "analiz", "Notes", "(P)", "symulator", "krytyk", "przyrz", "zakres", "D-80", "a drive letter and a slash ", "mariusz" and ".the-way/": no match. The only Polish words are the game's own (map names, the program description texts the game shows).
- The skill's frontmatter is plain text with no quoting: "description: How an agent ... " — I did not run a YAML parser; the test checks the shape rules named above, not YAML itself.
- The description check of the test was not mutated; only the byte check was.

## Unread material

- `foundations/glossary.md`: read only the entry `overlay` (lines 290-292); the rest not read.
- `guidelines/coding.md`: read lines 1-80 of 360; the rest not read.
- `guidelines/testing.md`: read lines 1-30 of 496 and the lines that name `balance-tools` (38, 363, 451); the rest not read.
- `balance/check-map.mjs`: read lines 1-80; the table rendering (`renderTable` and below) not read.
- `balance/overlays/dead-zone.json` and `balance/overlays/wasteland.json`: not read; the skill names only `forest-pack.json`.
- `task-frozen.md`: read 15-40 and 72-77 as the handoff names; the other sections not read.
- Everything else the handoff names was read whole: `plan.md`, `foundations/decisions.md` D-362 and D-417, `foundations/invariants.md` 1268-1286, `.claude/skills/loop2-play/SKILL.md`, `tests/agent_workflow/test_loop2_play_skill.py`, `balance/cli.mjs`, and the Foundation entries of the plan.

## Searches not found or unclear

- The plan's *Read* names `foundations/glossary.md` and the two guidelines; I did not search them for further terms, since the skill needs only the overlay term.
- Unclear: the plan says the agent's attempts run "a fixed number of attempts" (`ustaloną liczbę prób`), but the number is not in the repository or the plan's text I read. The skill says the package's definition fixes it, with no number.
- Unclear: the handoff asks that results go "to a file outside the repository". The skill says the file goes under `.runs/`, which lies inside this worktree and which git ignores, and that a path inside the tracked files must be kept out. If the orchestrator wants a path wholly outside the worktree, the sentence in the skill's "Where results go" section needs that change.
- Unclear: the plan's wording "a value a module of the game reads once at its loading escapes it" is the plan's own claim (Choice 6). I did not verify it in the game's modules; the skill states it as the plan does.

## Reaches beyond the handoff

- Read `balance/overlay.mjs` (lines 1-140, whole) to state the refusal rules and the restore behaviour accurately.
- Read the foundation entries D-427, D-428 and D-429 (`foundations/decisions.md` 11477-11520) and the glossary term `overlay`, so the skill agrees with them.
- Read `balance/players/` names, the map names in `src/browser/sim/data/maps.ts` (names "Skraj lasu", "Las", "Las — głębiej"), the program identifiers in `tests/sim/reference-programs.mjs`, `scripts/test.py` (to see how `npm test` picks up the file), `.gitignore` (`.runs/` is ignored) and the executor-8 and executor-9 reports for the flags and timings.
- Read the rules file the global instructions name before commit (`.ai/rules/git.md`); the hook stopped one commit call once, and the repeated call was made as the rules say.
- Ran the `check-map` form with `--maps` and `--programs` narrowed; the skill names those flags, so it is in the checks above and not beyond the slice.

## Working copies

- `.runs/executor-10/` under the worktree root held the command outputs, the programs written by `programs --out`, and a copy of `forest-pack.json`. No git worktree or clone was made, so no `git worktree remove` applied.
- Removal: I ran `rm -rf .runs/executor-10` with the literal path; `ls` then reported it absent. Before that removal I had tried to copy the evidence into `reports/`, but the copy command was blocked by a hook and did not run, so the first copies of the logs were lost with the directory. I regenerated the evidence into `reports/`: `executor-10-check-map-forest-pack.md` (the full table, rerun), `executor-10-instructions.log`, `executor-10-private-paths.log`, `executor-10-quality.log` and `executor-10-skill.log`. The skill's mutant log (`executor-10-skill-mutant-bytes.log`) was not regenerated; its result is in *Checks*.
- The build output `dist/` is the product's ignored build output, not a working copy of mine.
