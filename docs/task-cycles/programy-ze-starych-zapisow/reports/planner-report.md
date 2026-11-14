# Planner report — programy-ze-starych-zapisow

Status: **done with concerns**

- Plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md` (9 slices, 23 foundation-entry rows, coverage, choices)
- Size report: `docs/task-cycles/programy-ze-starych-zapisow/plan-size.md`
- Check: `python -B .the-way/task-cycle/slice_size.py docs/task-cycles/programy-ze-starych-zapisow/plan.md`, exit 0, every slice `fits` (largest: slice 7 at about 178k estimated tokens, slice 2 at about 165k; the most files to change in a slice is 7). Nothing else was run; no tracked file, test or foundation entry was changed; the working tree is clean (`.runs/` is ignored).
- No open design choice was found (section 2 of the method) and no reserved choice. The plan covers the spec as written; where it adds to it, the addition is listed under *Concerns*.

## The plan in short

Entries E1 to E23 are written before slice 1 (the spec's *Foundation entries*; the plan names them and words none). Slices, in the order the code needs:

1. The database: schema step 5, the privilege, the previous save, its two moves, the reset write, the privilege write, and the tests that read version 4 (account-server trust boundary).
2. The routes `GET /api/previous-saved-game`, `POST /api/saved-game-reset` and the field in the account body, with the tests of HTTP and transport and the first guideline rows (trust boundary).
3. The operator command `account-previous-save` with its tests and the guideline lines (trust boundary).
4. The deploy skill and its `.agents` twin (SKILL.md and troubleshooting.md).
5. The browser client and the account card's copy of the new field.
6. The reader of programs `previous-programs.ts` and the append in `programs.ts`, with their tests, `stryker.config.json` and two guideline files (trust boundary).
7. The pull on the screen Programy (program list, game view, one line of the page, styles, tests).
8. The reset control with its confirmation in the game.
9. The page's reset flow (held saver outcomes, new game) and „Wyloguj” disabled while it waits.

Slices 1, 2, 3 and 6 carry a *Risk* of trust boundary, so each gets a review of its own; none carries "cannot be undone" (the orchestrator's answer). Models: `cheaper`, except slices 7 and 9 (`same`, with a reason).

## Guidelines found missing or uncertain

- `guidelines/coding-browser-module.md` and the styleguide say nothing of a confirmation for a destructive act on the game (the only existing question, „Zapisać, odrzucić, wrócić?”, belongs to the copy of a map run). The maker has to build the reset confirmation from the shared controls of D-44 alone; the styleguide gives no wording or layout to follow. Uncertain, not missing for the plan.
- D-44 and the rule *States of shared controls* name the destructive buttons one by one („Zakończ”, „Usuń”, „Restart”, …). „Zacznij od zera” is not on the list, though D-44's rationale ("a button that … resets progress … is destructive, in every place it stands") covers it. The plan makes it a destructive button (slice 8). See concern 2.
- `guidelines/coding.md` *Logging scope* says an entry that points at a person needs the human's agreement; the three new events carry only `accountId`, which is already on the list, so the plan adds them as the rule allows. Not missing.
- `guidelines/coding-saved-game.md` and `guidelines/coding-simulation-module.md` do not say where a reader that reads a document less than the load (the new file) belongs; the spec settled it (simulation-module kind, the saved-game wording met). Slice 6 adds the file to the kind's table as a copy.
- `guidelines/testing.md` lists the trust boundaries with case titles. The plan has slices 2 and 6 write the rows for the new cases; the exact titles are the slices'.
- The guidelines name no check for the markers of a new invariant (`// invariant: <id>`). I saw the convention in the existing tests but did not read the checker that enforces it (see *Searches not found or unclear*).

## The chosen order and the styleguide's example

The styleguide's *Plan of a user-interface change* (environment and library, values in their source, one screen, its states) is an example, not a rule. This change adds no token, no font and no shared control: the view slices (7, 8, 9) come last and go from the screen's content (the pull), to the control and its confirmation (the reset's states), to the page's flow, which is the example's "one screen, then its states" without the steps it has no use for.

## Reach beyond the handoff

- `foundations/decisions.md` D-117 (2237-2251), D-97 (1953-1967) and D-44 (1036-1050): the browser-API-client guideline names D-117; the reset's held outcomes rest on D-97's logout; D-44 settles the kind of the new button. D-203 (3905-3921) was seen as the neighbour of D-202.
- Git history of `src/browser/sim/saved-game.ts` (commits 2923c3c8, 16f8bee8, bc8eaecd, 41abf1fc, a9a9b257): checked that the list of programs was read as `id`, `name`, `program` in every version 1 to 5 (the spec's claim for the reader holds; version 1 existed at the file's creation).
- `src/browser/view/account-card.tsx` (grep `accountOf`): found that the card copies only `id`, `email`, `emailConfirmed`, so a new field of `Account` would be dropped there; slice 5 changes the file. This is outside the spec's list of units.
- `src/browser/view/menu-bar.tsx` (the logout props): the spec says „Wyloguj” is "not pressable" during the reset; the bar has only a waiting text for the logout, so slice 9 changes the file and its test. Outside the spec's list of units.
- `stryker.config.json` and `tests/quality/test_mutation_test_selection.py`: a new `tests/sim/*.test.mjs` must be listed; slice 6 changes the config.
- `package.json` (scripts), `Dockerfile` (only the `account-database-check` line), `src/server/log-line.ts`, `src/server/transport.ts`, `src/server/account-block.ts`, the tests of the block command in `tests/account-storage.test.mjs`, the fixtures and helpers of `tests/http.test.mjs` (203-260, 395-470, 3790-3900), `tests/transport.test.mjs` (880-930), `tests/view/account-screen.test.mjs` (1-130, 230-430), `tests/view/end-question.test.mjs` (1-200), the `.claude/skills/loop2-deploy` files named for the skill slice (parts), and `tests/agent_workflow/test_loop2_deploy_skill.py` (by search): read to name each slice's files and what its agent reads.

## Concerns and questions, with proposed answers

1. **Where the reset control stands.** The spec leaves it to the maker ("in the game, not outside it"); *Change* needs a file, so the plan fixes it on the screen Programy beside the pull control (choice in the plan; slice 8 tells the maker to stop if the styleguide forces another place). Alternative: the menu „Konto” (`menu-bar.tsx`). Cost of the plan's way if wrong: one control moves, and slice 9's callback with it. Proposed answer: keep the plan's way; no question for the human.
2. **The list of destructive buttons in D-44 and the styleguide.** The plan makes „Zacznij od zera” a destructive button (reads D-44's rationale). The two lists would then be incomplete, and the spec's *Foundation entries* do not include D-44. Left alone: a stale list that a review may flag, no behaviour at stake. Added: a row "D-44 changed" in E-rows, written with `the-way-record-decision`, and a line in the styleguide rule (guidelines). Proposed answer: add D-44 as one more changed decision before slice 8 if the orchestrator wants the lists whole; otherwise accept the stale lists as a known departure. I did not add a row, since the plan names only the entries the spec names.
3. **Guideline edits as plain edits.** The spec lists `coding.md`, `testing.md` and `coding-simulation-module.md` as edited by the change; `AGENTS.md` sends guideline maintenance to the-way's `maintain-*-guidelines` skills "for their named work", which are task-refinement skills. The plan has the slices that add the behaviour edit the rows themselves. Proposed answer: accept; the review of the whole change reads the rows.
4. **Additions to the spec's list of units** (all above): `account-card.tsx`, `menu-bar.tsx` with its test, `stryker.config.json`, `tests/transport.test.mjs`, and `tests/view/previous-save.test.mjs` (new). None changes a decision of the spec.
5. **Messages not fixed by the spec.** The Polish text of the refusals of the two new routes (`error` strings) and of every sentence of the view is the maker's. The client requires a known code and a non-empty `error`, so slice 2 must send both.
6. **Deployment.** The first deployment moves the test server's database to version 5, after which `main` (without this change) fails health with exit 8; the spec leaves that to the human at deployment. Slice 4 writes the warning into the skill. The block "Deploying a request head and accepting it" in `references/setup_and_secrets.md` (about saved game states and version 4) and the paragraph on restoring in `references/backup_and_restore.md` (about `SAVED_GAME_VERSION`) were left unchanged: neither is made false by this change.
7. **Checks.** Slice 1 names `npm test -- tests/deploy/test_account_backup_stream.py`, which needs a Docker daemon (the gate's helper starts it, D-390; I did not run it). No slice runs the gate or `foundation_check.py`; a missing marker of a new invariant test (E19, E20) shows only at the gate. The review of slice 6 runs the mutation tool on the two changed simulation files, as `testing.md` asks.
8. **Size.** The script does not see files that earlier slices make (they cannot be named in backticks before they exist); slices 4 and 7 name them in plain text, so their sizes are a little low (the files are small).
9. **Human action.** Granting the privilege to the account of the owner on the test server is the human's step "in the cycle"; no slice does it.

## Unread material

- `foundations/decisions.md`: D-02 read to its rationale only (lines 17-30 of 17-38); D-01 whole. Every other decision the handoff names was read whole (D-07, D-96, D-104, D-109, D-112, D-114, D-137, D-164, D-165, D-166, D-167, D-169, D-202, D-204 to D-213, D-229, D-353 to D-355, D-386).
- `foundations/invariants.md`: all sixteen named invariants read whole. `foundations/part_map.md` and `foundations/glossary.md` read whole.
- Guidelines: all nine named files read whole (`testing.md` and `styleguide-browser-view.md` in several reads); `src/browser/AGENTS.md` whole.
- Code and tests, read in part: `src/server/transport.ts` (lines 60-102 only); `src/browser/view/game-saver.ts` (lines 1-60); `src/browser/view/game-view.ts` (lines 1-480 and 740-1032; 480-740 unread); `src/browser/sim/saved-game.ts` (lines 60-110, 250-290, 475-500 and searches); `src/browser/sim/programs.ts` (lines 1-60, 225-304, 318-460 and searches); `tests/account-storage.test.mjs` (lines 1-136, 172-320, 520-735 and searches); `tests/http.test.mjs` and `tests/transport.test.mjs` (the ranges listed under *Reach* and searches); `tests/account-backup.test.mjs`, `tests/deploy/test_account_backup_stream.py`, `tests/startup.test.mjs` and `tests/agent_workflow/test_loop2_deploy_skill.py` (searches only, which confirmed the lines the spec names: 281, 90, 99 and the identity test of the two skill copies); `.claude/skills/loop2-deploy/SKILL.md` (lines 160-200, 240-290, 340-463) and `references/troubleshooting.md` (108-145), `references/setup_and_secrets.md` (328-342), `references/backup_and_restore.md` (250-280); the `.agents` copies only by `diff -q`.
- Not read: `tests/sim/program-list.test.mjs` beyond its first 40 lines, `tests/view/program-list.test.mjs` beyond its first 60, `src/browser/view/program-panel.tsx`, `src/browser/view/program-editor.ts`, and the spec's two reviews (`reports/spec-reviewer-report.md`, `reports/spec-revision-review-report.md`; the superseded `spec-reviewed.md` was not used, as the handoff says). The cycle record `cycle.md` was not read, as the handoff says.

## Searches not found or unclear

- How the foundation check enforces the markers `// invariant: <id>` of tests (the convention is visible in the tests; the checker was not read), so whether a new invariant of method `test` whose marker is missing fails the gate or only the foundation check is not confirmed.
- Whether the three view tests that carry an `Account` fixture without `previousSaveAllowed` (`account-screen.test.mjs`, `menu-bar.test.mjs`, `uncaught-failure.test.mjs`) need an edit: I found no deep comparison of the account there and left them out of *Change*; slice 5 runs them as a check, and the slice would have to add a file to its *Change* if one fails.
- The spec's `"in the game (not outside it)"` for the reset control has two readings (the screen Programy or any part of the page's game area); the plan took the first (concern 1).
- Whether `tests/invariants/test_simulation_isolation.py` and `test_simulation_inputs.py` scan the new simulation file by pattern (I named them as checks of slice 6 without reading them).
- Nothing was found missing in the task or the spec that stops the plan.
