# Correction 1 — foundation agent report

- Agent: foundation agent of correction 1 (general-purpose subagent, claude-opus-5-5)
- Skills read and followed: the-way-record-decision, the-way-record-invariant, the-way-record-glossary-term, the-way-update-part-map, the-way-record-environment-fact (each read `.the-way/elements/<element>/skill/SKILL.md`, its `template.md`, `elements/common/rules.md` and `way_of_working.md`)
- Pin verified: `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` = d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b
- Worktree `C:\Storage\repos\loop2-mag-w-lesie`, branch `task/mag-w-lesie`, not pushed

## Commits

| Commit | What |
|---|---|
| `1e57e304be1b86457f8a8a3e7e736d59811abcee` | Merge of `origin/main` (d2b4687) — the five conflicts resolved, this branch's decisions renumbered D-08…D-17 → D-18…D-27, citations in tests renumbered. Parents: 18304b7, d2b4687. |
| `c785a6913342d9e8bd2f25fcee7f4c385e527000` | WAY-104 qualifiers in this request's entries, with the fingerprint consequences. |

Working tree clean after both.

## 1. Merge — how the conflicts were resolved

All five files: main's side first, exactly as on main, then this branch's side. The decision log has to start with main's lines (guard check `log-existing-lines`), and the same order everywhere keeps the PR's diff against main a pure addition.

- `foundations/decisions.md`: main's D-08/1, D-09/1, D-05/3, D-10/1 … D-17/1 untouched; then this branch's entries in their order: D-04/3, D-03/2, D-18/1 … D-26/1, D-06/3, D-27/1.
- `foundations/environment_facts.md`: main's seven facts, then `game-icons-licence/1`, `cc-by-3-adaptation-credit/1`. The shared `- **Method:** TODO` line was given to both sides.
- `foundations/glossary.md`: main's `deployment`, `test server`, `public address` after `program`, then this branch's `program rule`, `restart`. (`character skill`, `game minute`, `map run` had already merged automatically before `program`.)
- `foundations/invariants.md`: main's five new invariants, then this branch's fifteen. The shared `- **Correction:** none` line was given to both sides.
- `foundations/part_map.md`: account-server takes *Depends on* `browser-view · simulation · build-tools` (this branch) and *Failure modes* (main's two rows). External context: main's five rows, then `game-icons.net`.

### Renumbering (identifier changes; fingerprints unchanged — the fingerprint covers binding sentences only)

| Old (this branch) | New | Question |
|---|---|---|
| D-08/1 | D-18/1 | Where does the game's content live? |
| D-09/1 | D-19/1 | How does the player interact with the terrain panel's drawing of the game map? |
| D-10/1 | D-20/1 | What interrupts the character's action in progress? |
| D-11/1 | D-21/1 | How does time pass in a map run the player starts? |
| D-12/1 | D-22/1 | Where does the simulation's randomness come from? |
| D-13/1 | D-23/1 | How does a character act by its program? |
| D-14/1 | D-24/1 | What is a map made of? (reworded in commit 2) |
| D-15/1 | D-25/1 | How does a character move? |
| D-16/1 | D-26/1 | How does a program point at things of the world? |
| D-17/1 | D-27/1 | Where do the game's icons come from? |

D-04/3, D-03/2 and D-06/3 kept their identifiers.

### References rewritten in the merge commit (line numbers on 1e57e30)

- Decision relations: `foundations/decisions.md:683` (D-24 derives from D-12@4e289de6 → D-22@4e289de6), `foundations/decisions.md:711` (D-25 derives from D-13@70d1cb2d → D-23@70d1cb2d).
- *Derives from*: `foundations/invariants.md:162` map-run-repeatability, `:173` simulation-randomness, `:299` restart-seed (D-12 → D-22); `:184` action-in-progress (D-10@a03f8b53 → D-20); `:196` player-map-run-pace (D-11@6032a520 → D-21); `:230` content-identifiers (D-08@1f532d10 → D-18); `:242` program-rule-pick (D-13 → D-23); `:253` exploring-reveal, `:264` move-reach (D-15@6e8b0be3 → D-25); `:277` walk-target (D-16@35aef078 → D-26); `:289` map-run-tiles (D-14@a9cf9825 → D-24); `:311` icon-file-content, `:323` icon-credits (D-17@69da55dd → D-27).
- Comments in tests (they cite entries; what the tests check is unchanged):
  - `tests/invariants/test_action_in_progress.py:13` D-13, D-15 → D-23, D-25
  - `tests/invariants/test_action_in_progress.py:24` D-08, D-14 → D-18, D-24
  - `tests/invariants/test_action_in_progress.py:60` D-14 → D-24
  - `tests/invariants/test_map_run_repeatability.py:46` D-08 → D-18
  - `tests/invariants/test_simulation_randomness.py:217` D-13, D-15, D-16 → D-23, D-25, D-26
  - `tests/sim/data.test.mjs:142` D-08 → D-18
  - `tests/sim/layout.test.mjs:78` D-12/1 → D-22/1
- No glossary entry, environment fact, part map entry, `src/**` comment or README.md line cited a renumbered decision.

### Classification of `git grep -n "D-0[89]\|D-1[0-7]"` after the edits

Every hit is main's own (pull request #11) and unchanged from `origin/main`:
`foundations/decisions.md` headings D-08/1 (196), D-09/1 (218), D-10/1 (261), D-11/1 (289), D-12/1 (312), D-13/1 (337), D-14/1 (360), D-15/1 (379), D-16/1 (407), D-17/1 (436); relations at 249 (D-05/3 → D-08), 271, 298, 367, 390, 417, 447 (all of #11's own entries, naming #11's D-08, D-09, D-12); `foundations/invariants.md` 111, 121 (D-08), 131 (D-09, D-11), 141 (D-15), 151 (D-17) — #11's invariants. No hit lies in tests, src, README.md or any of this branch's entries.

### D-03/2, D-04/3, D-06/3 beside main's D-05/3

- None of #11's entries names D-03, D-04 or D-06, and D-05/3 names only D-02@06e6d3d8 and main's D-08@e4e8a2f4, so the merged log raises no stale-relation error.
- D-03/2 → D-04: its relation fingerprint held after the merge (ecd038e3). Commit 2 changes it (below).
- D-06/3 has *Relations* `none`. Its *Scope* (build-tools, browser-view, simulation, account-server) and D-05/3's *Scope* (account-server, build-tools, deployment) overlap but don't conflict. D-05/3's binding part does not touch how the two sides are compiled.
- Main's invariants `loop2-one-serving-process/2` and `loop2-api-error-route/1` carry D-05@db83484a. The guard confirms that is D-05/3's current fingerprint (#11's change kept the binding part's fingerprint, or set it — the guard accepts it).

## 2. Qualifiers (commit c785a69) — WAY-104

Rule applied: the human's patterns "game map", "the character's action" (and its equivalent "action of the character"), "the player's … choices". I also covered "element" and the verb "test", which WAY-104 covers as well (the-way terms `element` and `invariant test`). The meaning is unchanged in every case. *Approved by* already read `Mariusz, merge of https://github.com/mariusznazar/loop2/pull/12` in every entry touched, so it stays as is. *Change* stays `new decision` for the D-18…D-25 entries, which are new on this branch and edited in place, and `new wording` for D-04/3.

### Every qualified word (entry, field: old → new)

- D-04/3 binding: "the player's choices" → "the player's in-game choices"
- D-18/1 binding: "maps, items, creatures" → "game maps, items, creatures"; "A map, an item or a creature" → "A game map, an item or a creature"
- D-18/1 *Rationale*: "a new item, map or creature" → "a new item, game map or creature"
- D-22/1 binding: "the map's layout" → "the game map's layout"; "its map's layout" → "its game map's layout"
- D-22/1 *Verification*: "the generator of the map's layout" → "the generator of the game map's layout"
- D-23/1 binding: "whose action can be carried out then" → "whose action of the character can be carried out then"; "carry out an action by hand" → "carry out a character's action by hand"
- D-23/1 *Verification*: "carrying out an action by hand" → "carrying out a character's action by hand"
- D-23/1 *Rationale*: "carrying out an action by hand" → "carrying out a character's action by hand"; "end a map identically" → "end a game map identically"; "the order of actions" → "the order of the character's actions"
- D-24/1 heading (question): "What is a map made of?" → "What is a game map made of?"
- D-24/1 binding: "A map is a grid" → "A game map is a grid"; "the map's data" → "the game map's data"; "the map's list of resources" → "the game map's list of resources"; "the bounds the map sets" → "the bounds the game map sets"
- D-24/1 *Verification*: "the map's data" → "the game map's data"; "a new map added as a row of the maps' data" → "a new game map added as a row of the game maps' data"; "a map with a hand-placed layout; a map of square tiles" → "a game map with a hand-placed layout; a game map of square tiles"
- D-24/1 *Rationale*: "the map's settings" → "the game map's settings"; "The first map has a fixed entrance" → "The first game map has a fixed entrance"
- D-24/1 *Rejected*: "a fixed layout per map" → "a fixed layout per game map"; "but tests nothing" → "but tests nothing in the game" (source in Polish: "nie testuje mechaniki, o którą chodzi", definicja_mvp_loop2.md, koncepcja_projektowa.md:976)
- D-25/1 binding: "an ordinary action" → "an ordinary action of the character"; "as after any action" → "as after any action of the character"
- glossary `map run` definition: "at one map" → "at one game map"
- glossary `program rule` definition: "an action that a program holds" → "an action of a character that a program holds"
- invariant `icon-file-content/1` sentence: "a `script` or `foreignObject` element" → "a `script` or `foreignObject` SVG element"

Already qualified, left as they were: D-19/1 ("game map"), D-20/1 ("the character's action"), D-26/1 *Rationale* ("a game map"), `restart` ("game map"), `content-identifiers/1` and `map-run-tiles/1` ("game map"), `action-in-progress/1` ("the character's action"). The term "map run" holds the word "map" inside a term of the product, so it was not counted.

Left unchanged on purpose:
- D-24/1 *Origin* quotes the definition's section title "What is a map made of?". It is a transcribed name of a source, and changing it would break the pointer.
- D-27/1 *Rationale* "it is the product's own choice" is a design choice of the product, which is the process meaning, not the game's.
- "tests of the simulation" in D-22/1 *Rationale* means tests of the code, which is the process meaning.
- "data files", "SVG file" and "icon file" are files of the repository, the same meaning as the process uses.

### Fingerprint changes and the references that carry them

| Entry | Old fp | New fp | References updated |
|---|---|---|---|
| D-04/3 | ecd038e3 | e64edf9c | `foundations/decisions.md:510` D-03/2 Relations; `foundations/invariants.md:208` simulation-isolation, `:218` simulation-inputs |
| D-18/1 | 1f532d10 | 9cf9e4c8 | `foundations/invariants.md:230` content-identifiers |
| D-22/1 | 4e289de6 | a6fd62b1 | `foundations/decisions.md:683` D-24/1 Relations; `foundations/invariants.md:162` map-run-repeatability, `:173` simulation-randomness, `:299` restart-seed |
| D-23/1 | 70d1cb2d | 2a80871f | `foundations/decisions.md:711` D-25/1 Relations; `foundations/invariants.md:242` program-rule-pick |
| D-24/1 | a9cf9825 | 4a978d6e | `foundations/invariants.md:289` map-run-tiles |
| D-25/1 | 6e8b0be3 | 52da4747 | `foundations/invariants.md:253` exploring-reveal, `:264` move-reach |
| icon-file-content/1 (sentence) | b7b3db59 | 3b77f724 | nothing carries an invariant's fingerprint. The version stays /1: the entry is not on d2b4687, so the guard computes /1 and the checks citing `icon-file-content/1` stay valid |

D-19/1, D-20/1, D-21/1, D-26/1 and D-27/1 have unchanged binding parts.

## 3. Collision search (merged foundation, this branch × #11)

### A. The Docker image and the icons — what binds the later slice

What #11's files do today (code, not foundation): the build stage of `Dockerfile` copies only `package.json`, `package-lock.json`, `tsconfig.*.json`, `scripts/` and `src/`, then runs `npm run typecheck`, `npm run build` and `npm prune`. The last stage copies `package.json`, `node_modules`, `dist`. `.dockerignore` admits only those five paths (`*` then `!package.json`, `!package-lock.json`, `!tsconfig.*.json`, `!scripts/`, `!src/`).

**Finding (verified in code, not run):** after this merge, `scripts/build.mjs` reads `assets/icons/` unconditionally (`readdir(new URL('assets/icons/', root))`). The Docker build stage has no `assets/`: it is not copied, and `.dockerignore` would exclude it anyway. So `npm run build` inside the image ends with ENOENT, and the image does not build. The consequences:
- Once PR #12 is merged as it stands, every deployment from `main` stops at the build. `loop2-deploy-keeps-running/1` keeps the old container running, and the part map's deployment failure mode "… or the build fails — the push is not deployed …" (low) covers it.
- Where a Docker daemon answers, the container test of `loop2-one-serving-process/2` (`tests/invariants/test_loop2_one_serving_process_container.py`, which runs `docker build` on the working tree) fails. Where none answers, it is skipped and stays unchecked.

Entries that bind the later slice:
- Decisions: D-27/1 (this branch) — the icons are kept in `assets/icons/` outside the served directory and are "copied into that directory when the application is built". The image build is a build of the application, so the image has to carry them. D-05/3 (#11) — one Express process in the loop2 container serves "the built game's static files". D-06/3 — building the application compiles both configurations. D-14/1 (#11) — the loop2 container is a Docker container built from a Compose file and a Dockerfile. D-16/1 and D-17/1 (#11) *Rationale* — the container build is trusted code merged to `main`, and the trust boundary stays with the files that take in untrusted data. That matches browser-view's trust boundary `assets/icons/**`. D-17/1's binding part (build cache, thresholds, memory limit) is unaffected by copying more files.
- Invariants: `loop2-one-serving-process/2` (the container test builds the image and asks for `/` → 200 HTML). `account-server-typecheck/1` (reads the Dockerfile: a stage the runtime stage needs runs `npm run typecheck` as a command of its own, and the runtime stage takes `dist/` with `COPY --from` of such a stage — a COPY of `assets/` into the build stage keeps that shape). `loop2-container-isolation/1` (reads the Dockerfile for anything that shares with or names the old instance — a COPY of `assets/icons/` does neither). `icon-file-content/1` and `icon-credits/1` (they read `assets/icons/`, not the image). `loop2-host-sharing/1` reads only `compose.yaml` and the deploy script.
- Part map: `deployment` claims `Dockerfile`, `.dockerignore`, `compose.yaml` ("builds the application into the loop2 container"), with *Depends on* `account-server · build-tools`. `browser-view` claims `assets/icons/**`, with *Trust boundary* `assets/icons/**`. `build-tools` claims `scripts/build.mjs`. A Dockerfile that copies `assets/icons/` makes the deployment part reach directly into a browser-view file, which its *Depends on* does not list (the reach goes only through build-tools). This is a question for the slice (Q3).
- Environment facts of #11: none states what the image holds.

### B. Glossary collision: `restart` (this branch) × #11's uses of "restart"

This branch's term `restart` ("a map run of the same character on the same game map, which the player starts in place of the map run in progress") now stands in one foundation with #11's verb "restart" in another meaning:
- `foundations/decisions.md:323`, D-12/1 *Verification*: "restarts a container through the `mikrus` MCP server"
- `foundations/decisions.md:393`, D-15/1 *Verification*: "a rollback that restarts a kept image"
- `foundations/part_map.md:127`, the deployment failure mode: "gone after the host restarts"

Under the glossary template (WAY-99; a noun and its verb carry one meaning), this is one word with two meanings, and one of them — a restart of a map run — is not what a reader of the field gives it. The guard does not see it (0 errors). D-12/1 and D-15/1 are on main and append-only. The cheap side to rename is this branch's term, which is new. That is a question (Q1).

### C. Other overlaps checked — none colliding

- Part map: the account-server *Depends on* merges cleanly. #11's failure modes and this branch's added dependency on `simulation` are independent. No file is claimed twice (the part map guard reports 0 errors). #11's two warnings (build-tools → account-server and deployment → account-server, no separation recorded) are on main as they are here.
- Glossary: #11's `deployment`, `test server` and `public address` are used by no entry of this branch. This branch's terms are used by none of #11's entries.
- Decisions: no #11 decision touches the simulation, the browser view's content, randomness, programs or icons, and no branch decision touches deployment. D-04/3 *Review when* and D-07/1 are unaffected.
- Environment facts: no shared subject.
- External context: `game-icons.net` (untrusted, them → us) sits beside #11's `npm registry`, `the container image registry` and the GitHub repository. No conflict.

### D. Bare WAY-104 words in #11's entries (reported, not changed)

- "step" in a domain sense, bare: D-11/1 *Rationale* "with no manual step"; D-11/1 *Rejected* "a manual step at every deployment". (D-11/1 *Review when* "a separate deployment step" is qualified.)
- "entry" in a domain sense (a line of authorized_keys), bare: the environment fact `loop2-host-forced-command-entry/1` sentence "contains exactly one entry beginning with …". Its identifier also holds "entry". (D-16/1 *Verification* "an `authorized_keys` entry" is qualified.)
- "test" as a modifier: the term `test server` and its uses, D-11/1 *Review when* "a separate test environment", D-11/1 *Verification* and *Rejected* "a separate `test` branch" (a branch name in backticks). Each is a phrase holding the word, so I read them as qualified. Borderline.
- "part" in the deployment part's sentence is the process meaning. "GitHub Actions" is a proper name.

## 4. Guard runs (from the worktree root, on c785a69; the same results on 1e57e30)

`B=d2b4687320e7b0e89306e9e5530bfc824a90627f`

| Guard | Command | Exit | Summary |
|---|---|---|---|
| decisions | `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base $B --merge-onto $B` | 0 | 0 errors, 0 warnings, 0 unchecked; note: who approves a version is checked only in the-way's own log |
| environment facts | `python -B .the-way/elements/environment-facts/format_guard.py foundations/environment_facts.md --base $B --merge-onto $B` | 0 | 0/0/0; note: no human_verdicts.md |
| glossary | `python -B .the-way/elements/glossary/format_guard.py foundations/glossary.md --base $B --merge-onto $B` | 0 | 0/0/0 |
| invariants | `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base $B --merge-onto $B` | 0 | 0/0/0; notes: no violated_invariants.md, no human_verdicts.md |
| part map | `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base $B` (it takes no `--merge-onto`) | 0 | 0 errors, 2 warnings (build-tools → account-server at :75, deployment → account-server at :121, no separation recorded; the same two on main at d2b4687), 1 unchecked: "the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph" |

Before the merge commit, with the index still unmerged, the glossary guard and the part map guard reported errors that came from the merge in progress. The glossary guard could not merge HEAD's decisions.md onto d2b4687, and the part map guard read every file three times from the unmerged index. Both were clean once the resolution was staged and committed.

Not run: invariant tests and `npm test`. Commit 1 changes only comments in tests; commit 2 changes only foundation text. A check that did not run is no pass.

## 5. Choices I made

1. **Main's side first in every conflicted file.** The other way, this branch first, fails `log-existing-lines` for the decision log, so there is no real alternative there. For the other four files, ordering is free; if wrong, it is a cosmetic reorder.
2. **"the player's choices" in D-04/3 was qualified to "the player's in-game choices"**, although the human's list seems to accept "the player's choices" as a qualified form. A more qualified wording complies under both readings. Its cost is a new D-04 fingerprint (e64edf9c) and three references updated. If the possessive was meant as enough, revert that phrase and the three fingerprints (ecd038e3).
3. **"action of the character" in D-23/1 and D-25/1**, where "the character's action" does not fit the grammar ("whose action of the character", "an ordinary action of the character"). It is a phrase of the same meaning. If wrong, it is rewording only.
4. **"tests nothing in the game"** for D-24/1 *Rejected*. The alternative was to leave it and ask. The qualifier follows the Polish source's meaning ("does not test the mechanic in question"). It is not binding, so no fingerprint moves.
5. **"SVG element" in `icon-file-content/1`.** The alternative was to leave "element", but the-way's term `element` would otherwise read as a kind of foundation entry. The sentence's fingerprint changes and its version stays /1. The test's docstring (`tests/invariants/test_icon_file_content.py:1-3`) still quotes the old sentence without "SVG". I left it, since code keeps plain words and it is no identifier citation.
6. **D-24/1's question is reworded** ("What is a game map made of?"). The alternative, keeping the bare question, would leave a bare word in the heading.
7. **I did not rename identifiers holding a bare word** (`action-in-progress`, and #11's `loop2-host-forced-command-entry`). Renaming withdraws the identifier and rewrites its test citations and part map file names, which is beyond a qualifier change.

## 6. Hand-offs the skills require (to the orchestrator)

- Glossary (record-glossary-term, step "before 4.2"): the definitions of `map run` and `program rule` changed, so another agent should review their uses. Both entries are new on this branch, so there are no main-branch uses to preserve. The old definitions are on 1e57e30 and the new ones on c785a69.
- Invariant (record-invariant, after 4.4): `icon-file-content/1`'s sentence changed in wording only, with the method unchanged (`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`). The check that cites it is `tests/invariants/test_icon_file_content.py`. No version was raised and no identifier retired, so the expected values are unchanged.
- Critique of the full set (way_of_working) was not run.

## 7. Questions for the orchestrator

- **Q1 (`restart` collision, §3B).** Options: (a) rename this branch's term to "map run restart" and rewrite its uses — D-04/3 *Rationale for change*, D-20/1 *Rejected*, D-22/1 binding and *Verification*, `restart-seed/1`'s sentence. The D-22 fingerprint moves again, with 4 references. The identifier `restart-seed` and its test file may stay. (b) Leave it and let the merge's reviewer accept two meanings, which conflicts with WAY-99. (c) New versions of #11's D-12 and D-15 plus a part map edit to avoid the verb — this costs entries on main for a word they used first. My recommendation is (a).
- **Q2 (image build, §3A).** After this request merges, the image does not build until the later slice lands. Should the later slice go into PR #12 before it merges, so that `main` never holds a commit whose deployment fails at the build?
- **Q3 (part map, §3A).** When the Dockerfile copies `assets/icons/`, should `deployment` add `browser-view` to *Depends on*, or should the copy stay inside the build tools' route only? The second needs no part map change, but it needs the Docker build stage to carry `assets/`.
- **Q4.** Should D-04/3 keep "the player's in-game choices" (choice 2), or go back to "the player's choices"?
- **Q5.** Should #11's bare "step" (D-11/1) and "entry" (`loop2-host-forced-command-entry/1`) be qualified in a later change? D-11/1 needs a new version on main. The fact is not append-only, so it can be edited, but its version rises.
- **Q6.** Should the docstring of `tests/invariants/test_icon_file_content.py` follow the reworded sentence ("SVG element")?

## Rulings applied

Commit: `29066692d043ac20a54b7913ce1e6e7183c01f59` on `task/mag-w-lesie` (one commit, not pushed; parent c785a69). Files: `foundations/decisions.md`, `foundations/glossary.md`, `foundations/invariants.md`, `tests/invariants/test_icon_file_content.py`. Working tree clean after it.

### Ruling 1 — the term `restart` renamed to `map run restart` (meaning unchanged)

- Glossary: the entry `## restart` became `## map run restart` (`foundations/glossary.md:67`). The definition reads "A map run restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress." *Avoid* stays `none`: the old word "restart" keeps another meaning in #11's entries (restarting a container, the host), so under the template's "Where entries go" it may not stand in *Avoid*. No entry carries that other meaning, so no *Not* names the new term. *Not* stays `none`.
- Uses rewritten:
  - `foundations/decisions.md:494`, D-04/3 *Rationale for change*: "sending a character, a restart" → "sending a character, a map run restart"
  - `foundations/decisions.md:593`, D-20/1 *Rejected*: "taking effect only from a restart" → "taking effect only from a map run restart"
  - `foundations/decisions.md:622`, D-22/1 binding: "A restart of a map run keeps its seed" → "A map run restart keeps its seed"
  - `foundations/decisions.md:629`, D-22/1 *Verification*: "a map run other than a restart" → "a map run other than a map run restart"
  - `foundations/invariants.md:295`, `restart-seed/1` sentence: "A restart has the seed of the map run it replaces." → "A map run restart has the seed of the map run it replaces." The identifier `restart-seed` and version /1 stay: the entry is new on this branch, so the guard computes /1, and the check's citation `restart-seed/1` stays valid.
- Left as they are (ruling): #11's "restarts a container" (`foundations/decisions.md:323`), "restarts a kept image" (`:393`), "the host restarts" (`foundations/part_map.md:127`). Product code and the UI label also stay.
- Not changed, outside the write boundary of this ruling: the docstring of `tests/invariants/test_restart_seed.py:1` still quotes the old sentence "A restart has the seed of the map run it replaces."

### Ruling 4 — D-04/3 reads "the player's choices" again

- `foundations/decisions.md:473`: "the player's in-game choices" → "the player's choices". D-04's fingerprint returns to `ecd038e3`, its value on 1e57e30.
- References: `foundations/decisions.md:510` (D-03/2 Relations), `foundations/invariants.md:208` (simulation-isolation), `foundations/invariants.md:218` (simulation-inputs): `D-04@e64edf9c` → `D-04@ecd038e3`. `foundations/decisions.md:52` (D-03/1, `D-04@b703ab2a`) is a historical version on main and stays untouched.

### Fingerprint consequence of ruling 1

- D-22/1: `a6fd62b1` → `c9937b43`. References: `foundations/decisions.md:683` (D-24/1 Relations), `foundations/invariants.md:162` (map-run-repeatability), `:173` (simulation-randomness), `:299` (restart-seed): `D-22@a6fd62b1` → `D-22@c9937b43`.
- `restart-seed/1`'s own sentence fingerprint changes too. Nothing carries an invariant's fingerprint.

### Ruling 6 — `tests/invariants/test_icon_file_content.py` in the "SVG element" wording (docstring only; what the test checks is unchanged)

- `:1-3` (the quoted sentence): "`foreignObject` element" → "`foreignObject` SVG element"
- `:9-10`: "a `script` or `foreignObject` element: an element of that local name, in any namespace" → "a `script` or `foreignObject` SVG element: an element of the file with that local name, in any namespace"
- `:14`: "a `style` element's" → "a `style` SVG element's"
- `:23`: "a `style` element" → "a `style` SVG element"
- Not changed: code identifiers and the failure message string at `:77` ("holds a {tag} element"), which is product code and keeps the plain word.

### Guards after the commit (from the worktree root, `B=d2b4687320e7b0e89306e9e5530bfc824a90627f`)

| Guard | Exit | Summary |
|---|---|---|
| decisions (`--base $B --merge-onto $B`) | 0 | 0 errors, 0 warnings, 0 unchecked |
| environment facts (`--base $B --merge-onto $B`) | 0 | 0/0/0 |
| glossary (`--base $B --merge-onto $B`) | 0 | 0/0/0 |
| invariants (`--base $B --merge-onto $B`) | 0 | 0/0/0 |
| part map (`--base $B`) | 0 | 0 errors, 2 warnings (`:75` build-tools → account-server, `:121` deployment → account-server; the same two on main), 1 unchecked (no command reports the dependency graph) |

Invariant tests were not run.

### Uses of the changed definitions (WAY-97), for the review of uses

Listed with `python -B .the-way/elements/glossary/format_guard.py foundations/glossary.md --uses "<term>"` on 2906669, and cross-checked with a multiline search (`map\s+runs?`, `program\s+rules?`). The guard leaves out occurrences inside the longer term "map run restart" from the uses of "map run", and in the glossary it counts only the definitions of other entries. Line numbers are on 2906669.

`map run` (old definition on 1e57e30: "… at one map …"; new: "… at one game map …"), 34 uses:
- D-20/1 (`foundations/decisions.md:572`): `:587`, `:592`, `:593`
- D-21/1 (`foundations/decisions.md:596`): `:596` (heading), `:598`, `:606`, `:607`, `:608`, `:614`
- D-22/1 (`foundations/decisions.md:617`): `:619`, `:621`, `:622`, `:629`, `:631` (×2), `:632` (×2), `:638` (×2, one split across lines 638–639)
- D-24/1 (`foundations/decisions.md:673`): `:678`, `:695`, `:698`
- D-26/1 (`foundations/decisions.md:727`): `:746`, `:747`
- `map-run-repeatability/1` (`foundations/invariants.md:155`): `:157`
- `simulation-randomness/1` (`foundations/invariants.md:166`): `:169`
- `player-map-run-pace/1` (`foundations/invariants.md:188`): `:190` (×2)
- `program-rule-pick/1` (`foundations/invariants.md:234`): `:236`
- `map-run-tiles/1` (`foundations/invariants.md:281`): `:283`
- `restart-seed/1` (`foundations/invariants.md:293`): `:295`
- part `simulation` (`foundations/part_map.md:19`): `:21`
- glossary `map run restart` definition (`foundations/glossary.md:67`): `:69`, `:70`

`program rule` (old definition on 1e57e30: "… a condition and an action that a program holds"; new: "… a condition and an action of a character that a program holds"), 15 uses:
- D-04/3 (`foundations/decisions.md:467`): `:485`
- D-20/1 (`foundations/decisions.md:572`): `:574`, `:575`, `:589`, `:590`
- D-23/1 (`foundations/decisions.md:646`): `:648` (split across 648–649)
- D-25/1 (`foundations/decisions.md:702`): `:705`
- D-26/1 (`foundations/decisions.md:727`): `:740`, `:747` ("program rules")
- `action-in-progress/1` (`foundations/invariants.md:177`): `:180`
- `program-rule-pick/1` (`foundations/invariants.md:234`): `:236`, `:237`
- `exploring-reveal/1` (`foundations/invariants.md:246`): `:248`
- `walk-target/1` (`foundations/invariants.md:268`): `:270`
- glossary `program` definition (`foundations/glossary.md:28`): `:30`

`map run restart` (renamed from `restart`; definition on 1e57e30 under `## restart`: "A restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress."), 5 uses:
- D-04/3 (`foundations/decisions.md:467`): `:494`
- D-20/1 (`foundations/decisions.md:572`): `:593`
- D-22/1 (`foundations/decisions.md:617`): `:622`, `:629`
- `restart-seed/1` (`foundations/invariants.md:293`): `:295`

All three terms are new on this branch, so none has a use on main to preserve. #11's entries use none of them.

### Docstring follow-up

Commit: `6354c125a2a56626d5e1ba20b2aa561bcfa5cb98` on `task/mag-w-lesie` (not pushed; parent 2906669), one file, docstring wording only.

- `tests/invariants/test_restart_seed.py:1`: "A restart has the seed of the map run it replaces." → "A map run restart has the seed of the map run it replaces." This now matches `restart-seed/1`.
- Search of `tests/invariants/`:
  - I compared every `Invariant <id>/<n>: <sentence>` docstring with its current sentence in `foundations/invariants.md`. I also grepped for the old wording of every sentence and definition this correction changed: D-18, D-22, D-23, D-24, D-25, `map run`, `program rule`, `restart-seed/1`, `icon-file-content/1`.
  - No other quote of a changed sentence remains. `icon-file-content` was already fixed in 2906669.
  - Left as they are:
    - `tests/invariants/test_account_server_occupied_address.py:1` — a paraphrase of an invariant this correction did not change.
    - `tests/invariants/test_action_in_progress.py:17` — the test's own reading, not a quote.
    - `tests/invariants/test_map_run_tiles.py:200` — a failure-message string in code.

## Part map for Slice 11

Skill: the-way-update-part-map. I read `.the-way/elements/part-map/skill/SKILL.md` and the template's sections on *Depends on*, criticality and known violations, and `.runs/task-cycles/mag-w-lesie/plan-correction-1.md` § Foundation entries.

Commit: `e3a6ac659692ba5a43839ec6da350994a6a72233` on `task/mag-w-lesie` (not pushed; parent 6354c12). One file: `foundations/part_map.md`.

- `foundations/part_map.md:121`, part `deployment`, *Depends on*: `account-server · build-tools` → `browser-view · account-server · build-tools`. Reason: the Docker build stage (Slice 11) will copy `assets/icons/`, and `.dockerignore` will admit it. Those files are `browser-view`'s, and `assets/icons/**` is its trust boundary.
- `simulation` was not added (ruling Q67). The Dockerfile and `.dockerignore` were not touched.
- No separation recorded: under the template, a human writes separations.
- The part's binding sentence, *Files*, *Failure modes* and *Trust boundary* are unchanged, so no reference is flagged. No decision's *Scope* or invariant's *Part* names change.

Guards (from the worktree root, `B=d2b4687320e7b0e89306e9e5530bfc824a90627f`):

| Guard | Exit | Summary |
|---|---|---|
| part map (`--base $B`) | 0 | 0 errors, 2 warnings, 1 unchecked. The warnings are the two from Base: `:75` build-tools → account-server and `:121` deployment → account-server, no separation recorded. The unchecked line: no command of the product reports the dependency graph. |
| decisions (`--base $B --merge-onto $B`) | 0 | 0 errors, 0 warnings, 0 unchecked |
| invariants (`--base $B --merge-onto $B`) | 0 | 0 errors, 0 warnings, 0 unchecked |

New warning: none. `browser-view` records *Failure modes* `none`, so the guard already counts it at the highest degree (`high`). The new dependency without a separation therefore raises nothing above its own failure modes, and nothing needed doing. The code's dependency against this *Depends on* stays unchecked, as at Base.

## Part map for the container-icons check

Skill: the-way-update-part-map (ruling Q81). Commit: `ced77241f079eb835d70222ebb6a15a68f7eec80` on `task/mag-w-lesie` (not pushed; parent a44c9c3). One file: `foundations/part_map.md`.

- `foundations/part_map.md:118`, part `deployment`, *Files*: added `tests/invariants/test_loop2_container_icons.py`, right after `tests/invariants/test_loop2_one_serving_process_container.py`.
- Nothing else changed: the binding sentence, *Depends on*, *Failure modes* and *Trust boundary* are the same, and no other part claims the file.

Guards (from the worktree root, `B=d2b4687320e7b0e89306e9e5530bfc824a90627f`):

| Guard | Exit | Summary |
|---|---|---|
| part map (`--base $B`) | 0 | 0 errors, 2 warnings, 1 unchecked — all three as at Base. The warnings are `:75` build-tools → account-server and `:122` deployment → account-server, no separation recorded. The unchecked line: no command of the product reports the dependency graph. |
| invariants (`--base $B --merge-onto $B`) | 0 | 0 errors, 0 warnings, 0 unchecked |

No new warning.
