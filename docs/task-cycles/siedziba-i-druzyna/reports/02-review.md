PASS 24bbc2d5e1126db971e9135991e894fe1024a183

# Review of the whole change — task cycle `siedziba-i-druzyna`

- **Reviewer:** an agent that made none of the change; method `the-way-review-change` (pinned `.the-way` at `86b78ad`, `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both `86b78ad780aa8e97a9619fb7277cb64da50fb74a`).
- **Range:** `a945cf1d4c62e8cdac222a7de47277c08a77b2c5..24bbc2d` — `53b30d0` (code and tests), `24bbc2d` (foundation entries); 45 files, 1029 insertions, 235 deletions. Route: one author, no spec, no plan.
- **Head confirmed:** `git rev-parse HEAD` in the worktree = `24bbc2d5e1126db971e9135991e894fe1024a183`; `git status --short` empty.
- **Trust boundary:** no changed file is a trust-boundary file of `foundations/part_map.md` (`assets/icons/**`, `assets/fonts/**` untouched; `simulation`, `product-foundation`, `agent-workflow` have none in the touched files).
- **Irreversible operation:** none in the range.

## Findings

### Critical

none

### Important

none

### Minor

**M1. D-54's *Rejected* names an alternative no source offers** — `foundations/decisions.md:1052`
(`*Rejected:* the list sorted by name — two characters may bear one name, and a new character would move the others.`).
The task's source for row 4 is question 4 and its answer; neither quotes a rejected ordering, and
no other source the task carries names sorting by name. The field is read "by the agent, before
proposing an option already rejected" (decision template, *Fields and their readers*), so a later
agent may take sorting by name as something the human weighed and turned down. The reason given is
true and nothing binds through it, hence Minor. The other *Rejected* fields trace back to sources:
D-51 to question 1's option (a), D-52 to question 10's cost, D-53 to the send panel the answer to
question 4 replaces, D-55 to question 5. Recommendation: `none considered` for D-54, or keep it if
the orchestrator wants the reasoning shown to the human at merge (author's concern 1).

**M2. A display for a non-empty chest that nobody asked for** — `src/browser/view/headquarters.ts:28`
(`chestLines`) and `:155`–`:162`. The task says the chest is always empty in this task (*To do* 4)
and that items in the chest come in tasks 13 and 14 (*Out of scope*). The change still adds a
format `<resource name>: <count>`, one line per resource. Nothing can reach it today. But it is a
screen decision nobody settled, and task 13 inherits it, along with `tests/view/headquarters.test.mjs`
that pins it (`"patyk: 5"`, `"mech: 2"`). The author's reason ("the screen draws from the state")
holds without a format: drawing "empty" from `Object.keys(pieces).length` would do. Minor, because it
has no effect on the user now.

**M3. A long name with no spaces can overflow the team row** — `src/browser/styles.css:200`
(`.team-member, .character-creation { display: flex; flex-wrap: wrap; … }`) and `:209`
(`.team-member-name`). The stylesheet has no `overflow-wrap`, `word-break` or `min-width: 0` (Grep for
`overflow|word-break|min-width` in `styles.css`: no hit). A flex item does not shrink below its
min-content width, so a long unbroken name pushes past the panel. D-52 sets no length limit, so a
player can type such a name. The author's 390 px check used short names. I found this by reading
the CSS and did not run it in a browser. It is cosmetic and caused by the player, with no loss.

**M4. D-52 and the code trim all white space, where the source says spaces** — `foundations/decisions.md:993`
("also once the white space at its start and end is trimmed") and `src/browser/sim/game.ts`
`characterName` (`text.trim()`). Questions 10 and 2 and row 2 say "spacje" (spaces).
`String.prototype.trim` also removes tabs, line breaks and no-break spaces, and
`tests/sim/team.test.mjs` asserts this (`"\tOla\n"` → `"Ola"`, `"\t\n "` empty). The broader
reading serves the rationale the human accepted ("a name that looks empty does not tell characters
apart"), and the entry and the code agree with each other. So the effect is nil, but it is a small
widening of the source's word. Flagged for the orchestrator to show or accept.

**M5. The headquarters' screen behaviour has no automated check** — `src/browser/view/headquarters.ts:105`–`:120`
(empty name → `setError`, field cleared, Enter) and `:173` (`Wyślij` disabled while a map run goes
on). `tests/view/headquarters.test.mjs` checks only `chestLines` and the import. The repository's
view tests run without a DOM, so this follows the existing convention. The author's Playwright
inspection (screenshots `01-author-ui-01`…`06`) is the only evidence, and I checked it against
screenshots 02 and 03. The simulation's side of each rule is tested: an empty name is refused,
and a second send during a map run is refused. Minor.

## The whole task, item by item

| Item | Met by | Verdict |
|---|---|---|
| *To do* 1 — new game with an empty team, opens in the headquarters in the send panel's place, program panel beside | `game.ts` `newGame` (`team: { characters: [], chest: { pieces: {} } }`); `app.ts` puts `headquarters.element` where `sendPanel` stood; `flow.test.mjs` "a new game has … a team with no character" | met |
| *To do* 2 — „Drużyna” list in creation order, name, archetype name from data, „Wyślij” to Las; „Skrzynka” marked empty, no cap; creation | `headquarters.ts` `renderTeam`, `ARCHETYPES[character.archetypeId].name`, `MAPS[mapId].name`, „Skrzynka jest pusta.”; screenshot 03 | met |
| *To do* 3 — shared text field, always an elemental mage, appended; trim; empty → no character, message in `warning`; repeated names | `characterName`, `createCharacter` (`CREATED_ARCHETYPE`), `createTextField` + `setError` (`styles.css:133`–`141`, `--warning`); `team.test.mjs` four tests; screenshot 02 | met |
| *To do* 4 — state holds the one team with its chest (empty); each character in exactly one team; no own chest | `types.ts` `Team`, `Chest`, `Character` (no chest field); invariant `character-team` and its test | met |
| *To do* 5 — send by „Wyślij” beside the character; map-run screen in the same place; „Zakończ” back; one manual map run at a time | `send` throws while `state.run`; `app.ts` hides/shows in place; `headquarters.update` disables buttons; `team.test.mjs` "while one character's map run goes on…" | met |
| *To do* 6 — carrying capacity only if task 4 is merged | `git log origin/main` holds no task-4 merge (`task/ognisko-i-jedzenie` is a separate branch); no capacity added | met |
| Row 1 → D-51 | binding sentence matches the row | met |
| Row 2 → D-52 | matches; see M4 | met |
| Row 3 → D-53 | matches | met |
| Row 4 → D-54 | binding sentence matches; see M1 for *Rejected* | met |
| Row 5 → D-55 | matches the row in the wording question 12 kept | met |
| Row 6 → glossary `headquarters` | matches; `Not: none` is right by the glossary template (a reader's meaning from the field is not listed) | met |
| Projected `character-team/1` | `foundations/invariants.md` `character-team`, `Method: test`, `Derives from: D-50`, `Part: every`; *Correction* → *Violated* per the current template | met |
| Projected „Whose is the chest?” (part for task 11) | D-50 holds the part question 9 assigns: no cap, no "uses its chest", no "chest capped per kind" example, no capacity sentence in *Rationale*; *Origin* points to the full approved entry | met |
| Wording principle for MVP entries | D-51…D-55 begin „In the MVP”; Grep for `only|never|always|without` in D-51 onward: no hit in a binding sentence | met |
| „Who owns a program?” not broken | the program stays in `state.program`, not in `Character` | met |
| `content-identifiers` | `CREATED_ARCHETYPE` lives in `src/browser/sim/data/archetypes.ts`; no archetype or map named in `src/browser/` outside data; its test passes | met |

Fidelity to sources: the binding sentences of D-50…D-55 and the glossary entry hold nothing that
was altered or made up beyond M1 (in *Rejected*, not binding) and M4 (white space vs spaces).
*Rationale* of D-53 takes from the concept §5 the line the task quotes („Nad ekranem postaci
i ekranem mapy stoi siedziba … na którym gra się otwiera”). The other rationales restate the
answers and costs the task quotes.

## The author's report, checked

- **Concern 1** (*Rationale*/*Rejected* written by the author): the decision template allows prose
  written by the entry's author for a decision that was not recovered from code. D-53's *Rejected*
  is the replaced send panel and traces to the answer to question 4. D-54's does not trace to any
  source, see M1.
- **Concern 2** (example pairs proposed by the author): acceptable, since a merge accepts them.
  D-52's `violates: … a map run or a saved game that names its character by its name` goes beyond
  the row's words. It answers the row's own "What the cycle would otherwise guess" column (can a
  name be a character's key?) the only way the settlement allows, since two characters may share a
  name. I keep it as no finding.
- **Concern 3** (no glossary entry for "team" or "manual map run"): I agree, since the human rejected
  rows 7–11.
- **Concern 4**: Declined to judge (below).
- **Own-work check:** the requirement named (*To do* 5, disabled „Wyślij” and the return through
  „Zakończ”) is a fair pick for the screen, and the check would catch it unmet. On the simulation
  side the weakest point named (character identity through `nextCharacterId`) is the right one.
  The author's two mutations and the failing runs of `test_character_team.py` show that a
  duplicate id and an unknown id are caught. My own mutations (below) confirm that `team.test.mjs`
  catches a restart that changes character and a new game that holds a ready-made mage (D-51).
- **Altered invariant tests (WAY-03)** — named here as the method asks: `test_action_in_progress.py`,
  `test_exploring_reveal.py`, `test_map_run_layout.py`, `test_map_run_repeatability.py`,
  `test_map_run_tiles.py`, `test_move_reach.py`, `test_player_map_run_pace.py`,
  `test_program_closed_lists.py`, `test_program_rule_pick.py`, `test_program_world_reference.py`,
  `test_restart_seed.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py`,
  `test_simulation_randomness.py`, `test_terrain_drawing_numbers.py`, `test_walk_feasibility.py`,
  `test_walk_target.py`; new `test_character_team.py`. I read the removed lines of every one. The
  changes are only to setup: `SENT` uses `characterId`, a `createCharacter` step follows
  `newGame`, and wording in messages and docstrings. `test_restart_seed.py` moves its indexes by one
  for the inserted step (`main[3]`/`main[16]`). `test_simulation_inputs.py` and
  `test_simulation_isolation.py` gain `characterName`/`createCharacter`, a stronger check. No
  assertion was removed or loosened. `tests/sim/data.test.mjs` drops the archetype-id refusals of
  `send` along with the argument and adds refusals of character ids `2`, `0`, `"1"`, `undefined`
  and a send from an empty team.
- **Line endings:** the two files rewritten with `sed -i` are `i/lf w/lf` (`git ls-files --eol`),
  so the commit carries no line-ending change.
- **Author address:** both commits `mariusznn@gmail.com` (`git log --format='%h %ae'`).

## Declined to judge

- The map-run screen does not name which character is in the map run (author's concern 4). The task
  says the map-run screen stands "as today", so this is outside the task (out of scope).
- Whether the headquarters should restore keyboard focus after „Zakończ” (focus falls to the page
  when „Wyślij” hides the headquarters). D-42 keeps only 2.4.7 Focus Visible, which holds because
  each control shows its focus through the one shared rule. Where focus goes after a screen swap is
  not asked by the task or the foundation (out of scope).

## Checks run

Code checks ran in a separate detached worktree of `24bbc2d` in the scratchpad
(`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\92ab7b73-9c8b-4ce6-b2f0-17266804ff17\scratchpad\review-head`,
`node_modules` linked to the reviewed worktree's). The foundation check ran in the reviewed worktree,
which only reads. `git status --short` in the reviewed worktree stayed empty.

| Command | Exit | Result |
|---|---|---|
| `npm run typecheck` | 0 | no errors |
| `npm run build` | 0 | — |
| `node --test tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 | 183 tests, 183 pass |
| `python -B -m unittest test_character_team test_action_in_progress test_exploring_reveal test_map_run_layout test_map_run_repeatability test_map_run_tiles test_move_reach test_player_map_run_pace test_program_closed_lists test_program_rule_pick test_program_world_reference test_restart_seed test_simulation_inputs test_simulation_isolation test_simulation_randomness test_terrain_drawing_numbers test_walk_feasibility test_walk_target test_content_identifiers test_browser_view_framework test_browser_view_token_values test_browser_view_focus_outline` (from `tests/invariants`) | 0 | 69 tests OK |
| `npx eslint --max-warnings 0 src/browser tests/sim tests/view` | 0 | no output |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/sim tests/view` | 1 | only `src/browser/AGENTS.md` (Markdown, outside `prettier-source-format`, not changed by the range); every code file passes |
| `ruff.exe check --no-cache --config ruff.toml --ignore-noqa tests/invariants` (the reviewed worktree's `.runs/quality-venv`) | 0 | All checks passed |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0 | 0 errors |
| Mutation A: `restart` starts with `run.character.id + 1`; `npm run build`; `node --test tests/sim/team.test.mjs` | 1 | "the send sends the chosen character of the team, and a restart keeps it" fails; restored |
| Mutation B: `newGame` holds a ready-made mage (`id 1`, `nextCharacterId 2`); build; `node --test tests/sim/team.test.mjs` | 1 | four tests fail (order, shared name, trim, empty name); restored, rebuilt (exit 0) |
| Manual: screenshots `01-author-ui-02-empty-name-warning.png`, `01-author-ui-03-team-with-characters.png` | — | the empty-name message under the field and the field border in the warning colour; team rows with name, archetype in secondary text, „Mapa: Las”, „Wyślij”; „Skrzynka jest pusta.” |
| Manual: tokens used in the new CSS rules exist in `src/browser/tokens.css` (Grep for each `--name:`) | — | all nine present |

Not run:

- `npm test` whole, and `python -B .the-way/gate/run_tests.py tests/quality`: the cycle's full
  run follows this review (dispatch). I ran ESLint, Prettier and Ruff directly instead.
- Invariant tests outside the reach of the change (deploy, account server, icons, token contrast
  and sources, kitchen-sink build): the code they cover is unchanged.
- M3 in a real browser: judged by reading the CSS.

## Reaches beyond the dispatch

- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md:1508`–`1537` and `:2118`–`2128`: the projected entries the dispatch names, compared with D-50 and `character-team`.
- Decisions selected by *Scope* (simulation, browser-view, product-foundation, agent-workflow) and read whole: D-04 (head and rationale, `foundations/decisions.md:75`–`92`), D-21, D-23, D-26, D-36, D-40, D-42; D-49 for the established form of *Origin*. The others in *Scope* were listed by their heading and *Scope* line and set aside as unreached (build, deployment, tokens, fonts, kitchen-sink).
- `.the-way/elements/decisions/template.md` whole, and `.the-way/elements/glossary/template.md` (*Not*): the form of the new entries, for M1 and row 6.
- Guidelines read whole: `guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md`, `coding-simulation-module.md`, `styleguide-browser-view.md`; `src/browser/AGENTS.md` (repository instruction for `src/browser/`).
- `src/browser/view/controls/text-field.ts`, `src/browser/view/controls/button.ts`, `src/browser/styles.css:128`–`141`: the error state and the accessible name the headquarters relies on.
- `tests/invariants/loop2_invariant_support.py:212`–`224` (`built_copy`): to confirm that the invariant tests build in a temporary copy and do not write to the tree.
- `git log origin/main` in `C:\Storage\repos\loop2`: whether task 4 is merged (*To do* 6).
- The vault folder `Notes/Projects/(P) Loop/_zadania`: the *Origin* file `siedziba_i_druzyna_loop2.md` of D-51…D-55 exists there, like D-49's.
