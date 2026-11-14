# Author report — pierwsze-porzadki-dziennika

**Status:** done with concerns (two choices beyond the handoff's list, named below; nothing blocked).

Worktree `<worktree root>`, branch `task/pierwsze-porzadki-dziennika`, base `a62ad91f`. Author address of all three commits: the owner's address (the owner's).

## Commits

| Commit | What |
|---|---|
| `65d858b9` | `docs: :memo:` the reasons the skills lacked (both copies of each skill) |
| `1a56e519` | `docs: :card_file_box:` six entries leave the log, the list of withdrawn numbers, every reference rewired, the facts that only the withdrawn entries were based on withdrawn, the testing guideline, the comment of `scene.test.mjs` |
| `25d909ae` | `docs: :card_file_box:` the words `currently`, `today`, `for now` out of the binding sentences of the 23 entries |

Files changed (against the base, 8 files, +96 / −243):
`foundations/decisions.md` (+48 −216 net of both commits: six entries removed, list added, references rewired, 23 entries edited), `foundations/environment_facts.md` (−9 entries, +9 rows of the withdrawn list), `guidelines/testing.md` (2 lines), `tests/view/scene.test.mjs` (1 comment line), `.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md` (+16 −6 each, identical), `.claude/skills/loop2-deploy/references/backup_and_restore.md` and the `.agents/` copy (+4 −1 each, identical).

## What was done, by item of the task

**Item 1 and 2 — entries leave the log.** D-80, D-254, D-357, D-358, D-359, D-361 removed whole (text, fields, rationale, rejected). `## Withdrawn identifiers` created at the end of `foundations/decisions.md` in the template's form, one row for each of the six, successors `none`, *Why* naming where the rule now stands. No stub or "see" line. No identifier renumbered.

Reasons added to the skills (one sentence each, taken from the withdrawn entry's rationale; where the skill already said why, nothing was added):
- D-254, in `loop2-play`: why the inspection replaces no check of a person and nothing of it stays in the repository (a changed journey, real events and focus stay with a person, D-75 and D-88; a kept Playwright test would be the permanent test those decisions defer); why the CLI is the first way (its maker recommends it to agents for the tokens it saves, and it holds the same engine as the MCP server).
- D-357, in `loop2-play`: the repository "holds only the screenshots of public products", and the sentence that the owner accepts by seeing the screen, that the repository may be cleared after a long time and old images then stop showing, and that a repository of its own keeps the images out of loop2's history. This also carries the clause that stood in the binding sentence and the skill lacked ("may be cleared").
- D-358, in `loop2-play`: a hand-over to the human would put a step of the human into every cycle that shows a screen.
- D-359: no change; the skill already gives the reason (one profile for the workspace root, one browser at a time).
- D-361, in `loop2-deploy/references/backup_and_restore.md`, after the paragraph of the counting command: root's SSH configuration holds the login to Strych, a number shows none of it, and the count lets an agent confirm the condition D-238 rests on.

**Item 3 — references.** Rewired or lifted: D-347 *Relations* (`derives from D-254` gone); D-378, D-387, D-388, D-398 *Relations* (`derives from D-80` gone); "(D-80, D-82)" to "(D-82)" in the rationales of D-387 and D-388; `guidelines/testing.md` *Decision* of "Where the expected value comes from" is `D-73 · D-82` and its text "(D-80)" is "(D-73)"; the comment of `tests/view/scene.test.mjs` keeps D-88 and loses D-254.

Places found that the task did not list (searched by `git grep -nw` of each of the six numbers over every tracked file, `.runs/` excluded):
1. D-264 rationale, "(D-88, D-254)" (handoff named it): now "(D-88)".
2. **D-404** *Relations*, `derives from D-80` (a new entry, from the commits ahead of the task's base; neither the task nor the handoff names it): lifted, `derives from D-121 · derives from D-397 · derives from D-398` remain.
3. Invariants file, glossary, part map: none of the six numbers stand there (searched).
4. The environment facts that rested only on the withdrawn entries (see Choices).

**Item 4 — 23 entries.** In the first paragraph (the binding sentences) of each, `currently` / `today` / `for now` removed, with the syntax around it; nothing else of the sentences changed. The 24 changed lines: D-42, D-64, D-123, D-143, D-144, D-145, D-167, D-169, D-181, D-187, D-188, D-194, D-196, D-199, D-200, D-201, D-208, D-243, D-244, D-246, D-247, D-249, D-385. Two entries needed more than deleting the word:
- D-123: "Today the game writes one such rule, „Zawsze → Eksploruj”, at the first chill, …" became "The game writes one such rule, …" (word only).
- D-385: "An item burning on a revealed tile, a lit stick today, stands in …" became "…, such as a lit stick, stands in …": with "today" simply dropped, the apposition would have narrowed the rule to sticks; "such as" keeps it general.

**Entries where the word stays: none.** I judged that in every one of the 23 the sentence says what holds now, and a binding sentence holds until a change replaces it, so the sentence binds the same with and without the word (the cases I weighed hardest: D-64's number 15, D-187's "map cap leaves unchanged", D-194's "pays all of it once", D-145's and D-249's statements of an absence). The reviewer may disagree on one of these; the orchestrator's list for the request is empty.

Words left in the 23 entries outside their binding sentences, deliberately untouched (a rationale or title is no binding sentence): the **title of D-145** ("… work today?"), D-42 rationale lines 1036–1037 ("for now" twice), D-208 rationale line 4117 ("currently").

## Choices (with the way rejected and the cost if wrong)

1. **Nine environment facts withdrawn.** `foundations/environment_facts.md` states that a fact whose last dependant goes is withdrawn in the same change (`.the-way/elements/environment-facts/template.md`, "Withdrawn identifiers", and `skill/SKILL.md`, "A withdrawal"). After the six entries left, nothing named: `playwright-cli-token-use`, `playwright-cli-config-path`, `playwright-cli-context-options`, `playwright-screencast-frames`, `chrome-devtools-ignore-certificate-errors` (only D-254), `screenshots-repository-visibility` (only D-357), `playwright-mcp-persistent-profile`, `playwright-cli-workspace-directory`, `playwright-cli-sessions-per-workspace` (only D-359). Each entry removed and its identifier put on the file's list with the *Why* the file already uses ("withdrawn: no decision is based on it and no invariant rests on it", successor `none`), as three earlier ones were. `loop2-repository-visibility` stays (D-357 was one of several dependants) and `playwright-cli-console-messages` stays (D-347). Neither the task nor the handoff names this; I took it from the process's own rule. Rejected: leaving the nine facts as unreferenced entries (the check does not report them, but the rule says same change). Cost if wrong: the orchestrator drops commit-1a56e519's `environment_facts.md` part; a fact can come back under a new identifier when something rests on it. Also read as a reach beyond the task's "Out of scope: other kinds of entries".
2. **D-404 lifted from D-80** (above), not rewired to D-73 or D-82: the task rewires D-378/387/388/398 the same way (lift), and D-404's rationale rests on a measurement, not on the parameter rule.
3. **Three commits instead of one**: skills first (reasons), then the withdrawal with every reference in one commit (the check passes there), then the time words. The time-word commit is separable.
4. D-254's reason is two sentences in the skill (one for "adds to a person's checks", one for "CLI first"), because the handoff's "one sentence of reason" met two separate rules of the entry that the skill gave no reason for.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (final tree) | 0 | `0 errors` |
| same, with `D-80` put back into `guidelines/testing.md:93` for a moment (control, then restored) | 1 | `guidelines/testing.md:93: \`D-80\` is withdrawn; name its successor` — the check does see a reference to a withdrawn number |
| `node --check tests/view/scene.test.mjs` | 0 | syntax check only (comment-only edit); the test file itself was not run |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 8 tests OK (checks both copies byte-identical) |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| `diff -r .claude/skills/loop2-play .agents/skills/loop2-play` and the same for `loop2-deploy` | 0 | identical |
| `git grep -nwE 'D-(254\|357\|358\|359\|361\|80)'` over tracked files | 0 | only the six rows of the new list (lines 9814–9819 of `foundations/decisions.md`) |

Not run: the full `npm test` (the orchestrator's, WAY-160); the focused run of `tests/view/scene.test.mjs` (comment-only; node's syntax check stands for it).

## Own-work check

Requirement most likely not met: a reference to a withdrawn number left anywhere (the acceptance criterion), or a time-word edit that changes what a sentence binds. Checks: the `git grep -nw` above (only the list rows), `foundation_check.py` with its control run (fails when a withdrawn number is referenced, passes on the final tree), and a reading of the 23 first paragraphs after the edit, with a scripted search that no `currently`/`today`/`for now` is left in the binding paragraph of any of them (three left outside binding sentences, listed above). Not caught by any check: whether the removal changes the meaning of a sentence; this is a judgement and rests on the reading above.

## Reaches beyond the dispatch (section 1)

- `.the-way/elements/environment-facts/template.md` ("Withdrawn identifiers", "Changing a fact"), `.the-way/elements/environment-facts/skill/SKILL.md` ("A withdrawal"), `.../skill/decide_entry.md` and `.../skill/write.md`: to decide what happens to the facts of the withdrawn entries (Choice 1).
- `.the-way/elements/common/rules.md` and `.the-way/elements/common/way_of_working.md`, `.the-way/elements/decisions/skill/*.md` and `template.md`: part of the handoff's own list (record-decision), listed for completeness.
- `foundations/environment_facts.md` entries and `foundations/decisions.md` D-75 (whole): to check that the facts had no other dependants and that the skill's reason sentence about D-75 and D-88 is faithful.
- `foundations/decisions.md` D-404 (partly: the entry head to its rationale): the unlisted reference to D-80.
- `foundations/decisions.md` D-264 (whole), D-12/D-234/D-255 (not read whole, see Unread).
- the author's global rules for scripts and for git: the user's global instruction files named for scripts and commits.

## Unread material

- `guidelines/coding.md`: read lines 1–120 and the headings of the rest (grep for the rule on comments found nothing about comments); the change writes no code of a kind.
- `guidelines/styleguide-browser-view.md` (986 lines): **not read**; the only browser-view file touched is a comment line of a test, and the styleguide is about screens. Named in the handoff as read whole.
- `foundations/glossary.md`: not read; searched for the six numbers with no result; the change writes no glossary term and uses no term in a new meaning.
- `foundations/part_map.md`: read whole (cut to 400 characters per line, the long responsibility lines of two parts shortened).
- `foundations/invariants.md`: searched for each of the six numbers (none found); no entry read whole, as the handoff allows.
- D-12, D-234, D-255, D-347 (beyond the head), D-378 (beyond the head and rationale lead), D-387, D-388, D-398: read only the parts the change touches (binding sentence and *Relations* and the rationale sentence "(D-80, D-82)"); not whole.
- The 23 entries of item 4: read the heading and binding paragraph whole (to the *Scope* line); the fields, rationale and rejected were searched for the three words only.
- D-73, D-82, D-88, D-80, D-254, D-357, D-358, D-359, D-361: read whole. D-264: read whole. D-75: read whole.
- `loop2-play/compose-state.mjs`, `frames.js`, `save-frames.mjs`, and `loop2-deploy/SKILL.md` lines 1–49 and 110–563, `references/setup_and_secrets.md`, `references/troubleshooting.md`: not read; searched for the six numbers and for `KnownHostsCommand`, `VerifyHostKeyDNS` and the SSH configuration (the passages found were read).
- `.the-way/elements/common/foundation_check.py`: docstring and the withdrawn-number handling read; the rest not.

## Searches not found or unclear

- Not found: no entry kept "withdrawn" form for a decision in the log before this change, so the table form was taken from the template and from `.the-way/foundations/decisions.md` (a row is `| WAY-06 | <why> | WAY-01 |`); the *Why* wording for the six rows is mine (starting with "withdrawn:", as the facts file's rows do).
- Unclear: the handoff's "other kinds of entries" in the out-of-scope line could be read to forbid Choice 1 (the facts); I read it as meaning other kinds of decision-log entries to be tidied later (the 31 single labels, the 7 absences).
- Unclear: whether the title of D-145 ("… work today?") counts toward item 4; I read item 4 as the binding sentences only and left it.
- Stale pointers that this change moves further: test comments that give line numbers of `foundations/decisions.md` (for example `tests/sim/combat.test.mjs:185`, `tests/sim/encounters.test.mjs:415`, `tests/sim/encounters.test.mjs:728`, `tests/sim/program-counts.test.mjs:16`) already pointed at wrong lines before this change and point further off now; they cite no withdrawn number, so the check does not see them. Not touched.

## Questions and concerns

Questions: none (status is not `questions`).

Concerns for the orchestrator's request description:
- Choice 1 (nine facts withdrawn) is the one thing the human did not name; the request should show it.
- D-404 was not in the task's list of references and is rewired.
- The skills now cite D-75, D-88 and D-238 by number in the added sentences (the skills already cite D-238 elsewhere; foundation_check accepts them).
