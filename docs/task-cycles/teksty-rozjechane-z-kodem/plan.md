# Plan — Uzgodnić z kodem fundament, wytyczne, README i stronę wszystkich stanów loop2

- Task: `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`
- Spec: none
- Base: adbec4b025b9b5760bdb41b5d803794cbb062acd (every line range below is read at that commit)

## Foundation entries

Written by the foundation step before Slice 1, each through the project skill of its element
(`the-way-record-decision`, `the-way-record-environment-fact`, `the-way-record-glossary-term`).
The rows are independent of each other except that they share `foundations/decisions.md` and
`foundations/environment_facts.md`; the three rows marked *web* need the agent to open the pages
their sources name and quote them word for word, and a row's writer returns a question rather than
word a *Rejected* or a reason the named source does not hold.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Settlement row 1 — what `account-database-check` and `measure-passwords` print when they fail is no log line but a message to whoever ran the command, so it keeps the error's text and gets no JSON failure line; the code of both stays. The entry is D-252 as item 37 names it, or the entry that already holds the settlement if the writer's search of the foundation (WAY-33) finds one, D-354 being the neighbour to read first | decision | Settlements to record, row 1; To do 37; question 7 | Slice 10 (the rule "Recording a failure" of `guidelines/coding.md` follows it) |
| Settlement row 2 — the server refuses to start when the mail password file decodes to an empty password, a file of only a byte-order mark included (D-111) | decision | Settlements to record, row 2; To do 29; question 3 | Slice 4 |
| D-01, D-02, D-05 — *Based on* quotes at each page a passage word for word with its place and the date it was read, in the decision template's form (*web*) | decision | To do 21 | none |
| D-48 — *Origin* says the names of the tokens other than roles were chosen by the cycle (Decision 1 of its spec), not by question Q18 | decision | To do 24 | none |
| D-54 — *Rejected* no longer names sorting by name as a rejected variant; the *violates* example stays | decision | To do 25 | none |
| D-54, D-56 — "place on the list" in one meaning: the order of the characters does not change, the position number shifts when a character before it leaves | decision | To do 26 | none |
| D-56 — the binding sentence gives the number the first character of a game gets, as the code gives it | decision | To do 27 | none |
| D-67 — the first *complies* example speaks of a tile missing two sticks, the only kind that gets two back | decision | To do 28 | none |
| D-156 — *Rationale* does not call the player's webmail page a "mail service", the term D-111 uses for Outsider's SMTP service | decision | To do 30 | none |
| D-183 — *Rejected* gives the variant of question Q6 of the frozen task `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` instead of "unknown" | decision | To do 31 | none |
| D-04, D-213 — they name the state D-211 calls "the unsaved game state" by that name, not "saved game state" | decision | To do 32 | none |
| D-101 — "restore" where "resurrect" meant bringing back a destroyed session | decision | To do 33; question 4, answer A | Slice 5 (the texts of two tests follow it) |
| `docker-build-cache-invalidation` and D-237 — the fact quotes the passage "Build arguments do result in cache invalidation." and the *Rationale* says the release check returns with a new commit through the build argument `LOOP2_COMMIT`, not through a change of code (*web*) | environment fact and decision | To do 34 | none |
| D-207 — *Rejected* says a tab left open for a day sends about 2880 saves at the 30-second rhythm | decision | To do 35; question 5, answer A | none |
| `catch-up` — the glossary entry says what D-247 says: the computing runs from the save time after each load of a saved game state | glossary term | To do 36; question 6 | none |
| a new environment fact that the browser resolves no bare import, and D-269 — *Based on* names it (*web*) | environment fact and decision | To do 38 | none |
| D-313 — *Rejected* drops the last variant (the group "Program" with the condition "Zawsze" added where the copy has none) that Mariusz did not consider | decision | To do 39 | none |
| D-313 — *Rationale* says why an action the rule panel offers no target for gives way to the next one; the reason stands in the cycle record `git show 2aae30a:docs/task-cycles/ekran-przejscia/cycle.md` (its Q9 row, its line 130, and its line 230) and where it is not there the writer returns the question | decision | To do 40 | none |
| D-147, D-185 — *Rejected* does not justify a rejection by the order "above discovery" that the screen no longer has | decision | To do 41 | none |
| D-312 — "Its further cost" names the third way another group comes before the one the game wrote into: the game's rule moved to a later group | decision | To do 42 | none |

## Slices

### Slice 1 — The Node.js range in README, package.json and the lockfile

- **Goal:** the requirement is Node.js 24.15.0 or newer within line 24, written `^24.15.0`, in three
  places: the sentence "Wymagania: …" of `README.md` (line 5, kept in Polish and naming the floor
  where it now says "24.x"), `engines.node` of `package.json` and `engines.node` of the root entry
  (`packages[""]`) of `package-lock.json`. The README may give the reason (the pinned npm and jsdom
  declare that floor) only after the lockfile shows it; it states no reason it cannot find there.
  Nothing else of the lockfile changes: no regeneration, no new resolution, one line differs.
- **Change:** `README.md` · `package.json` · `package-lock.json`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:26-26` To do, item 1 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:83-87` Questions to settle, question 1 ·
  `guidelines/coding.md` · `foundations/part_map.md:84-116` build-tools ·
  `foundations/decisions.md:3-15` D-01 · `foundations/decisions.md:765-776` D-33 ·
  `foundations/invariants.md:5-13` account-server-runtime ·
  `foundations/invariants.md:449-457` introduced-npm-vulnerabilities ·
  `foundations/invariants.md:549-557` dependency-audit-refusal ·
  `tests/invariants/test_account_server_runtime.py`
- **Model:** cheaper
- **Risk:** trust boundary — `package-lock.json` (build-tools)
- **Checks:** `python -B scripts/test.py tests/invariants/test_account_server_runtime.py` exits 0 (a
  regression check: the invariant reads the major version 24 from the range and passed before);
  `git diff --stat -- package-lock.json` shows one line changed; `python -B scripts/audit_dependencies.py`
  exits 0 (the lockfile now differs from the fork point, so it asks the npm registry; without
  network report it unchecked, never passed)
- **Depends on:** none

### Slice 2 — README: the browser check and the build point

- **Goal:** two texts of `README.md` say what the code does. (a) The paragraph "W przeglądarce, po
  `npm run local` …" (line 76 at the task's source commit): "z stopką" reads "ze stopką"; the screen
  reached by "Mapy", the row "Las" and "Wejdź" is named as the game names it today, the screen
  Przejście (D-280), not "ekran przebiegu mapy"; the "panel terenu z listą kafelków", which PR #58
  removed, is no longer named, and the sentence says only what the screen shows today, read from the
  code named in *Read*; the sentence has a predicate. (b) The first point of the build list
  ("`npm run build` — …", line 25): the sentence about the graphics of Anokolisa stands once, not
  twice, with the facts the foundation holds about the pack's terms unchanged and none added; the
  three matters it joins — what the build writes, where the sprites come from, and that
  `npm run kitchen-sink` copies no sprites — become separate points of the list. Polish stays.
- **Change:** `README.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:27-28` To do, items 2 and 3 ·
  `foundations/part_map.md:84-116` build-tools · `foundations/decisions.md:5937-5985` D-280 ·
  `foundations/decisions.md:6713-6784` D-311 · `foundations/decisions.md:7666-7690` D-346 ·
  `foundations/decisions.md:5675-5706` D-271 · `foundations/environment_facts.md:604-608`
  pixel-crawler-terms · `foundations/glossary.md:87-91` headquarters ·
  `src/browser/view/run-screen.tsx` · `src/browser/view/run-header.tsx` ·
  `src/browser/view/right-area.tsx` · `src/browser/view/footer.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** no test reads the README; `git diff --check -- README.md` exits 0; the executor reads
  each claim of the changed paragraph against the file of *Read* that shows it and names that file
  in the report
- **Depends on:** Slice 1

### Slice 3 — The page of all states draws tile icons as the game does

- **Goal:** the tile samples of the kitchen-sink page take the placement of icons on a tile, and the
  tile size, from the code the game draws with, so that they change with the game (To do 4): the
  game's `iconPlaces` of `src/browser/view/terrain-picture.ts` (two icons a row, centred, each half
  the icons' square, a third of it where the icons take three rows) is exported together with the
  default tile size and the size of the icons' square, `terrainPicture` keeps its output unchanged,
  and `drawSample` of `src/browser/kitchen-sink/kitchen-sink.ts` calls them instead of its own
  `TILE_SIZE` and its icon size of 0.7. The page imports nothing that reaches a `.tsx` file (D-269)
  and builds no game state (D-04, D-45). Second, the sample "Wyczerpane" no longer claims that a
  resource's stock does not fall to zero in the game (To do 5): gathering takes stock off the tile
  (`src/browser/sim/run.ts` near the line reading `here.stock`) and the game dims the icon at stock
  zero (`dimmed` in `terrain-picture.ts`); the executor keeps the sample, drops or corrects the note
  to what the code shows, and invents no new claim. The failing test comes first: a case in
  `tests/view/terrain-picture.test.mjs` that imports the exported placement and checks, from the
  rule above and not from the function's output, the side and the place of the icons for two, four
  and five icons on one tile; it fails before the export exists. The look of the samples is checked
  in a browser by the user-interface check of `make-change` through `npm run kitchen-sink`
  (`loop2-play`).
- **Change:** `src/browser/view/terrain-picture.ts` · `src/browser/kitchen-sink/kitchen-sink.ts` ·
  `tests/view/terrain-picture.test.mjs`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:32-33` To do, items 4 and 5 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/part_map.md:3-28` browser-view ·
  `foundations/decisions.md:52-124` D-04 · `foundations/decisions.md:883-896` D-41 ·
  `foundations/decisions.md:913-926` D-43 · `foundations/decisions.md:943-956` D-45 ·
  `foundations/decisions.md:1380-1393` D-70 · `foundations/decisions.md:5620-5644` D-269 ·
  `foundations/invariants.md:499-507` application-build-kitchen-sink ·
  `foundations/invariants.md:355-363` terrain-drawing-numbers ·
  `foundations/invariants.md:459-467` browser-view-token-values ·
  `src/browser/view/terrain-drawing.tsx:1-70` the component that draws the game's picture ·
  `src/browser/sim/run.ts:190-225` the gathering that takes stock off a tile ·
  `tests/invariants/test_application_build_kitchen_sink.py:1-40`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/view/terrain-picture.test.mjs` exits 0, the new case
  seen failing first; `python -B scripts/test.py tests/invariants/test_application_build_kitchen_sink.py`
  exits 0 (it compiles the page once); `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`
  exits 0; `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` exits 0;
  `python -B scripts/test.py tests/invariants/test_terrain_drawing_numbers.py` exits 0;
  `npm run typecheck` exits 0 (it runs `node scripts/build.mjs --check`; the orchestrator corrected the planner's path, which named no compiler); one
  screenshot of the tile samples from `npm run kitchen-sink`, or the reason none was made
- **Depends on:** none

### Slice 4 — The server refuses a mail password file that decodes to an empty password

- **Goal:** `readSmtpPassword` of `src/server/configuration.ts` refuses, at startup and with the
  same message as today (the setting's name, never the file's content), a password file whose
  decoded text is empty, so a file of only a byte-order mark (EF BB BF) is refused as a file of zero
  bytes is. Every other file keeps its present result, among them a file of a byte-order mark and a
  newline (refused as a control character), a byte-order mark followed by other characters (accepted
  with the mark dropped, as the decoder drops it today) and the longest accepted file of 1024
  bytes. The failing test comes first: the byte-order mark alone added to the list of invalid files
  of the existing case "the SMTP password file must be a small non-empty UTF-8 regular file without
  control characters …" in `tests/startup.test.mjs`, seen failing before the change; the case
  stays marked with its invariant. D-111 as the foundation step wrote it is the source of the rule.
  The code of this slice meets crafted files at a trust boundary, so its review is told to try a file
  of only a mark, a mark and a newline, a mark and bytes, zero bytes and 1025 bytes.
- **Change:** `src/server/configuration.ts` · `tests/startup.test.mjs`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:66-66` To do, item 29 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:94-98` Questions to settle, question 3 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:172-172` Settlements to record, row 2 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/part_map.md:62-82` account-server ·
  `foundations/decisions.md:2012-2023` D-111 · `foundations/decisions.md:291-304` D-13 ·
  `foundations/decisions.md:2881-2894` D-153 · `foundations/invariants.md:749-757`
  account-startup-configuration
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (account-server)
- **Checks:** `python -B scripts/test.py tests/startup.test.mjs` exits 0, the new file seen failing
  first; `npm run typecheck` exits 0
- **Depends on:** Settlement row 2 (Foundation entries)

### Slice 5 — The tests say "restore" where a destroyed session or counter comes back

- **Goal:** the comment of `tests/http.test.mjs` that cites D-101 ("a delayed renewal cannot
  resurrect a destroyed session", near line 669) and the name of the case "deleting an active rule
  removes its count; adding its duplicate starts at zero and completion does not resurrect it" in
  `tests/sim/program-counts.test.mjs` say "restore" (question 4, answer A), as D-101 now does. Nothing
  else changes: no assertion, no other word; "resurrect" and "resurrection" stay where they mean the
  resurrection of a character. The executor shows with `grep -rnw` over `tests` and `src` that no
  other use of the word means a restored session or counter.
- **Change:** `tests/http.test.mjs` · `tests/sim/program-counts.test.mjs`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:70-70` To do, item 33 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:99-104` Questions to settle, question 4 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/decisions.md:1874-1885` D-101 ·
  `foundations/glossary.md:205-209` resurrection · `foundations/part_map.md:30-60` simulation ·
  `foundations/part_map.md:62-82` account-server
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/sim/program-counts.test.mjs` exits 0;
  `python -B scripts/test.py tests/http.test.mjs` exits 0; `git diff -U0` shows only the comment and
  the name of the case changed
- **Depends on:** D-101 (Foundation entries)

### Slice 6 — The description of the sprites check names the case that ties the files to the drawing

- **Goal:** the docstring of `tests/invariants/test_loop2_container_sprites.py` (its lines 12 and
  13) points to the case "every file the scene's data names stands directly in assets/sprites/ as a
  .png file" of `tests/view/scene-picture.test.mjs` as the one that ties the files the scene's
  drawing asks for to the files this check reads, instead of "the case of Slice 3 of task
  `scena-z-ludzikiem`", which stands only in the ignored `.runs/`. No code, no other word of the
  docstring changes.
- **Change:** `tests/invariants/test_loop2_container_sprites.py`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:36-36` To do, item 8 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/part_map.md:143-173` deployment ·
  `foundations/invariants.md:1209-1217` loop2-container-sprites ·
  `tests/view/scene-picture.test.mjs:449-470` the case that checks the scene's files
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B -m py_compile tests/invariants/test_loop2_container_sprites.py` exits 0;
  `python -B scripts/test.py tests/quality/test_quality_invariants.py` exits 0 (ruff and prettier see
  the file; it needs `.runs/quality-venv`); the case the docstring names is found in
  `tests/view/scene-picture.test.mjs` under that exact name
- **Depends on:** none

### Slice 7 — The deploy skill lets the agent read two more facts of the server

- **Goal:** the list "Allowed" of the section "Agent or human" of
  `.claude/skills/loop2-deploy/SKILL.md` and of its byte-identical copy
  `.agents/skills/loop2-deploy/SKILL.md` gains exactly two read-only commands (question 2, answer B):
  the number of lines of the `authorized_keys` of the account the MCP runs as that carry the forced
  command `/usr/local/bin/loop2-deploy` — the number only, never the content of a key — and
  `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy`, each with the value it expects as the skill
  states the expected value of its other metadata reads (one entry; `755 root:root`, which the two
  facts of the foundation hold). No other permission is added or widened, and the skill's
  prohibitions stay. Both copies are edited to stay byte for byte equal, and neither names the
  server, its identifier or its address.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:60-60` To do, item 23 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:88-93` Questions to settle, question 2 ·
  `foundations/decisions.md:271-289` D-12 · `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/part_map.md:143-173` deployment · `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` exits 0 (the
  copies are byte-identical; no server name or IPv6 literal); `python -B .the-way/elements/common/foundation_check.py`
  exits 0
- **Depends on:** none

### Slice 8 — The four facts about the test server's state carry a reading

- **Goal:** the *Source* of `loop2-host-forced-command-entry`, `loop2-host-installed-command`,
  `mikrus-host-docker-workloads` and `mikrus-host-swap` in `foundations/environment_facts.md` is each
  a reading in the form of the environment-fact template — `reading: <command> on <host>, <tool and
  version> — "<output word for word>"; run <date>` — made now by this agent through the `mikrus` MCP
  server (the tools `mcp__mikrus__servers` and `mcp__mikrus__exec`, deferred: load them with
  `ToolSearch`; where they are missing return `blocked`). It runs only commands of the list "Allowed"
  of the deploy skill as Slice 7 left it: the two new commands for the first two facts, `docker ps`
  and `free` for the other two, so the fact about swap rests on the `free` output and its sentence
  says no more than that output does. The tool and its version come from a read the list allows; where
  no allowed command prints a version, the executor returns `questions` naming each tool, and writes no
  version from memory or from the entry's earlier wording. `<host>` is written as "the test server's
  host", never the server's name, identifier, port or address, which the deploy skill keeps out of the
  repository. A sentence of a fact changes only where the new reading shows it false or wider than the
  output; the entries that rest on the four facts (D-14, D-16, D-17, D-231) are read to confirm they
  still stand, and the identifiers stay.
- **Change:** `foundations/environment_facts.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:59-59` To do, item 22 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:88-93` Questions to settle, question 2 ·
  `.claude/skills/loop2-deploy/SKILL.md:45-88` Agent or human ·
  `.the-way/elements/environment-facts/template.md` ·
  `foundations/decisions.md:271-289` D-12 · `foundations/decisions.md:307-321` D-14 ·
  `foundations/decisions.md:344-368` D-16 · `foundations/decisions.md:370-393` D-17 ·
  `foundations/decisions.md:4444-4501` D-231 · `foundations/part_map.md:143-173` deployment
- **Model:** same — it records output of a remote host word for word and must stop rather than fill
  a missing version
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`; each
  of the four *Source* lines names the command that was run and carries the output as the host
  returned it, which the executor shows beside the entry in its report
- **Depends on:** Slice 7

### Slice 9 — The testing guidelines: the gate's patterns and the level of the page-document test

- **Goal:** `guidelines/testing.md`, written through the project skill
  `the-way-maintain-testing-guidelines` as the cycle's author writes the file (its `SKILL.md` and
  `template.md` in *Read*), says two things right. (a) The rule "Test files in the gate" says that
  the full run of `scripts/test.py` hands Node patterns, not "files and patterns" (`NODE_TESTS` holds
  patterns only) — To do 9. (b) `tests/view/page-document.test.mjs`, which starts processes
  (`spawnSync`), stands under the level whose rules fit it, the integration test, and not among the
  unit tests that the recipe's *Files* line lists by the directory `tests/view/`; the level follows
  the resources a test uses, not its directory (D-81) — To do 10. The file's other lines stay; the
  executor changes a *Where in code* line only if one of these two edits needs it.
- **Change:** `guidelines/testing.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:40-41` To do, items 9 and 10 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/testing/template.md` ·
  `.the-way/product-guidelines/testing/SKILL.md` · `scripts/test.py` ·
  `tests/view/page-document.test.mjs` · `tests/view/memory-limit.test.mjs` ·
  `foundations/part_map.md:118-133` agent-workflow · `foundations/decisions.md:1425-1436` D-73 ·
  `foundations/decisions.md:1477-1490` D-77 · `foundations/decisions.md:1531-1542` D-81 ·
  `foundations/decisions.md:1557-1568` D-83 · `foundations/decisions.md:5444-5474` D-264 ·
  `foundations/decisions.md:5575-5618` D-268 · `foundations/invariants.md:1189-1197`
  document-test-memory-limit · `foundations/invariants.md:579-587` node-test-selection ·
  `foundations/glossary.md:93-103` unit test, integration test
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`;
  `python -B scripts/test.py tests/quality/test_node_test_selection.py` exits 0 (the gate's file
  selection the edited rule describes); `git diff --check` exits 0
- **Depends on:** none

### Slice 10 — The coding guidelines: sender, account policy, browser modules, recording a failure

- **Goal:** four files of the coding guidelines, written through the project skill
  `the-way-maintain-coding-guidelines` as the cycle's author writes them (its `SKILL.md` and
  `template.md` in *Read*), match the code: (To do 11) `guidelines/coding-mail-sending.md` says the
  sender's address comes from the settings (`from` in `src/server/account-mail.ts`) while the display
  name, the subject and the text are fixed in the sending file; (To do 12) the *Good* example of
  the rule on reserving an attempt in `guidelines/coding-account-policy.md` speaks also of
  the registration, where the password is hashed and not checked; (To do 13) the list of releases
  of an attempt in the same file names every case the code releases, the blocked login and the login a
  reset overtook included (`ticket.release()` in `src/server/account-routes.ts`); (To do 14) the
  statuses of `src/browser/view/email-status.ts` and `src/browser/view/character-skills.ts` in the
  table of `guidelines/coding-browser-module.md` say what the files are today, pure functions that
  build no DOM — the status the table gives its other pure modules, the executor choosing from
  the table and the template and naming the choice; (To do 37) the rule "Recording a failure" of
  `guidelines/coding.md` says, as the entry written for Settlement row 1 says, that what
  `account-database-check` and `measure-passwords` print on failure is no log line but a message to
  whoever ran them, so it keeps the error's text and no JSON line, with the rule's existing sentence
  about the service commands left true. No code and no foundation entry changes in this slice.
- **Change:** `guidelines/coding.md` · `guidelines/coding-mail-sending.md` ·
  `guidelines/coding-account-policy.md` · `guidelines/coding-browser-module.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:42-45` To do, items 11 to 14 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:74-74` To do, item 37 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:114-119` Questions to settle, question 7 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:171-171` Settlements to record, row 1 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` · `src/server/account-mail.ts` ·
  `src/server/account-policy.ts` · `src/server/account-routes.ts:700-830` the registration and the
  login routes · `src/server/account-database-check.ts` · `src/server/measure-passwords.ts:360-389`
  the report written at a failure · `src/browser/view/email-status.ts` ·
  `src/browser/view/character-skills.ts` · `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/decisions.md:2954-2967` D-158 · `foundations/decisions.md:4329-4355` D-227 ·
  `foundations/decisions.md:2083-2096` D-116 · `foundations/decisions.md:1887-1900` D-102 ·
  `foundations/decisions.md:1902-1915` D-103 · `foundations/decisions.md:4287-4327` D-226 ·
  `foundations/decisions.md:808-821` D-36 · `foundations/decisions.md:5120-5154` D-252 ·
  `foundations/decisions.md:5156-5199` D-253 · `foundations/decisions.md:7927-7951` D-354
- **Model:** same — five corrections across four files, each to be judged against code
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`
  (it checks the guidelines' form); `git diff --check` exits 0; the executor names for each of To do
  11 to 14 the line of code it read to confirm the sentence
- **Depends on:** Settlement row 1 (Foundation entries)

### Slice 11 — The styleguide: forms, sources, justification, roles, example, pair

- **Goal:** `guidelines/styleguide-browser-view.md`, written through the project skill
  `the-way-maintain-styleguide` as the cycle's author writes the file (its `SKILL.md` and
  `template.md` in *Read*), says six things right. (To do 15) The list of controls that depart from
  the list of states names also the React forms (`react-button.tsx` and the other four files of
  `src/browser/view/controls/`), not only the DOM files. (To do 16) The rule "Every value with its
  source" knows the kind of source that stands in the token file already: Mariusz's choice from a
  preview of variants (`--bar-width`, `src/browser/tokens.css`), for values beyond the terrain and
  the focus. (To do 17) The justification of the look of the list of programs (the passage citing "D-40,
  D-280") cites only decisions that speak of that list. (To do 18) The section "Program editor" no
  longer says the editor adds no new role, colour or value while it describes `rule-winning`,
  `rule-running` and the bars. (To do 19) The *Bad* example of the rule "The kitchen-sink page" no
  longer describes what the page has today (read from `src/browser/kitchen-sink/kitchen-sink.ts` as
  Slice 3 left it). (To do 20) The rule "Contrast of every pair" lists the pair of the fill of the
  progress bar above the mage's head against its track, for which the scene rule asks 3:1; the
  executor confirms in `tests/invariants/test_design_token_contrast.py` that the invariant's existing
  thresholds already cover it and adds no role, pair or threshold — where the item would add one, it
  returns `questions`. Other lines of the file stay.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:49-54` To do, items 15 to 20 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md` ·
  `.the-way/product-guidelines/styleguide/SKILL.md` · `src/browser/tokens.css` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/number-field.ts` ·
  `src/browser/view/controls/pick-cell.ts` · `src/browser/view/controls/select-list.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/view/controls/react-number-field.tsx` · `src/browser/view/controls/react-pick-cell.tsx` ·
  `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/controls/react-text-field.tsx` ·
  `src/browser/kitchen-sink/kitchen-sink.ts` · `tests/invariants/test_design_token_contrast.py` ·
  `foundations/part_map.md:3-28` browser-view · `foundations/decisions.md:853-866` D-39 ·
  `foundations/decisions.md:868-881` D-40 · `foundations/decisions.md:883-896` D-41 ·
  `foundations/decisions.md:898-911` D-42 · `foundations/decisions.md:928-941` D-44 ·
  `foundations/decisions.md:943-956` D-45 · `foundations/decisions.md:5620-5644` D-269 ·
  `foundations/decisions.md:5937-5985` D-280 · `foundations/decisions.md:5987-6021` D-281 ·
  `foundations/decisions.md:6276-6299` D-291 · `foundations/decisions.md:6599-6657` D-308 ·
  `foundations/decisions.md:6659-6685` D-309 · `foundations/decisions.md:6687-6711` D-310 ·
  `foundations/decisions.md:7766-7794` D-349 · `foundations/invariants.md:479-487`
  design-token-contrast · `foundations/invariants.md:489-497` design-token-sources
- **Model:** same — six rule edits in one file whose rules refer to each other and to code
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`;
  `python -B scripts/test.py tests/invariants/test_design_token_contrast.py` exits 0 (the rule's
  invariant is unchanged); `git diff --check` exits 0
- **Depends on:** Slice 3

### Slice 12 — The instructions for the browser view: the page's class rule and a changed token value

- **Goal:** `src/browser/AGENTS.md` says two things right. (To do 6) The sentence on giving an
  element a class says that the class of an element of the kitchen-sink page has its rule in
  `src/browser/kitchen-sink/kitchen-sink.css`, not in `src/browser/styles.css`, which is copied to
  `dist/public` and reaches the players. (To do 7) The sentence on a value the token file does not
  hold covers a change of an existing value of the token file as well as a new value, as the rule
  "Every value with its source" of the styleguide, in the state Slice 11 left it, does. The file's
  other sentences stay, and it stays in English.
- **Change:** `src/browser/AGENTS.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:34-35` To do, items 6 and 7 ·
  `guidelines/styleguide-browser-view.md` · `src/browser/kitchen-sink/kitchen-sink.css` ·
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/decisions.md:913-926` D-43 · `foundations/decisions.md:943-956` D-45 ·
  `foundations/decisions.md:988-1001` D-48 · `foundations/invariants.md:459-467`
  browser-view-token-values · `foundations/invariants.md:489-497` design-token-sources
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`; `git diff --check`
  exits 0; the executor names the sentence of the styleguide and the file of the page's stylesheet
  that each new sentence rests on
- **Depends on:** Slice 11

## Coverage

| What the task requires | Slices or entries |
|---|---|
| 1 — Node 24.15.0 in README, `engines.node`, lockfile root entry | Slice 1 |
| 2 — README browser check: "ze stopką", Przejście, no terrain panel, predicate | Slice 2 |
| 3 — README build point: no repeated sentence, three matters apart | Slice 2 |
| 4 — page draws icons as the game does | Slice 3 |
| 5 — page does not claim stock never falls to zero | Slice 3 |
| 6, 7 — `src/browser/AGENTS.md` | Slice 12 |
| 8 — test description names the case in `scene-picture.test.mjs` | Slice 6 |
| 9, 10 — `guidelines/testing.md` | Slice 9 |
| 11, 12, 13, 14 — coding guidelines | Slice 10 |
| 15, 16, 17, 18, 19, 20 — styleguide | Slice 11 |
| 21 — D-01, D-02, D-05 *Based on* | Foundation entries (row D-01, D-02, D-05) |
| 22 — four facts with a reading | Slice 8 (after Slice 7) |
| 23 — "Allowed" reads of the deploy skill and its copy | Slice 7 |
| 24, 25, 26, 27, 28 — D-48, D-54, D-56, D-67 | Foundation entries (the rows of those decisions) |
| 29 — empty password after decoding refused; D-111 | Foundation entries (Settlement row 2); Slice 4 |
| 30, 31, 32 — D-156, D-183, D-04 and D-213 | Foundation entries (their rows) |
| 33 — "restore" for "resurrect" | Foundation entries (D-101); Slice 5 |
| 34 — cache-invalidation fact and D-237 | Foundation entries (its row) |
| 35 — D-207 *Rejected* | Foundation entries (its row) |
| 36 — `catch-up` glossary entry | Foundation entries (its row) |
| 37 — failure output of the two commands is no log line | Foundation entries (Settlement row 1); Slice 10; no code changes |
| 38 — fact for the bare import and D-269 | Foundation entries (its row) |
| 39, 40 — D-313 *Rejected* and *Rationale* | Foundation entries (the two D-313 rows) |
| 41 — D-147, D-185 *Rejected* | Foundation entries (its row) |
| 42 — D-312 further cost | Foundation entries (its row) |
| Settlement row 1 (decision) | Foundation entries; Slice 10 |
| Settlement row 2 (decision) | Foundation entries; Slice 4 |
| Questions 1 to 7 | their answers are carried by Slices 1, 7 and 8, 4, 5, and by the rows of D-207, `catch-up` and Settlement row 1 |
| Out of scope: other *Rejected: unknown* of the decision log | untouched |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The corrections of the decision log, the glossary and the new environment fact (To do 21, 24 to 42 without 22 and 23) go into *Foundation entries* and no slice changes `foundations/decisions.md`. | A slice with `foundations/decisions.md` in *Change*: `slice_size.py` counts a file of *Change* whole, and the log is about 790 thousand characters, over the 250 thousand estimated tokens a slice may read, so such a slice cannot fit. | One foundation agent carries about twenty rows, three of them needing the web. The rows are independent, so the orchestrator may run the foundation step in several runs by groups, in the table's order, without changing the plan. |
| The guideline files (To do 9 to 20 and the rule of 37) are slices, not entries. | Writing them in the foundation step as one earlier cycle did for a single rule: three files of guidelines and the styleguide are small, each reviewable alone, and Slice 11 and Slice 12 depend on code (Slice 3) the foundation step does not have. | The three guideline slices run after code slices; a reviewer sees them in the whole-change review, not with the entries. |
| To do 22 is a slice after To do 23 (Slice 8 after Slice 7), not an entry of the foundation step. | Writing the four readings in the foundation step: they would read the host with two commands the deploy skill does not allow yet. | The four facts are written after code slices in the same request. |
| The facts of To do 22 write `<host>` as "the test server's host". | Writing the server's name: the deploy skill forbids the name in repository files and `tests/agent_workflow/test_loop2_deploy_skill.py` checks the two copies of the skill for it; the four facts now stand with no name. | The reading is less exact than the template's `<host>`; the executor of a later check finds the host through the `mikrus` MCP `servers` tool. |
| To do 4 shares the game's code by exporting `iconPlaces`, the default tile size and the icon square from `terrain-picture.ts`, and the page calls them. | A new module for the placement (one file more and a move of code the game uses); calling `terrainPicture` with a game state composed by hand (D-04 and D-45 forbid a drawing of the game from a game state); copying the arithmetic again (the defect itself). | The module's surface widens; moving the three exports to a module of their own later is a mechanical change. |
| The test of To do 4 is a case on the exported placement in `tests/view/terrain-picture.test.mjs`, written first. | A test of the built page in jsdom or a browser: the page builds itself when imported, and the guidelines leave the look of whole screens to a look in the browser ("Not tested on purpose"). | Nothing fails if the page one day holds another copy of the placement; review and the screenshot of the slice catch it. |
| The BOM-only file of To do 29 is one more entry in the list of invalid files of the existing case in `tests/startup.test.mjs`. | A separate new case: it repeats the fixture and the assertion of the list. | None; the case already carries the invariant. |
| To do 29 refuses an empty decoded password only; a byte-order mark followed by characters is left accepted with the mark dropped, as the decoder drops it today. | Refusing every file that starts with a mark: Settlement row 2 asks only that the decoded password not be empty, and the rest is a change of meaning the task does not make. | A rotation mistake with a mark and a password is not caught at startup; the review's crafted-input list names it. |
| The texts of the two tests of To do 33 are a slice of their own, after the entry for D-101. | Leaving them to the foundation step, which writes no test. | One more small slice. |
| Slice 12 comes after Slice 11 and Slice 11 after Slice 3. | The order of the task's list: `src/browser/AGENTS.md` cites the styleguide's rule "Every value with its source", and the styleguide's *Bad* example describes the page that Slice 3 changes. | A wrong order makes the later file cite a text or a page the earlier slice then changes. |
| Slices 1 and 2 are two slices though both change `README.md`. | One README slice: the lockfile edit is a trust-boundary change and gets a review of its own. | One more handoff; Slice 2 waits for Slice 1. |
| The decisions each code slice reads are those that bear on its topic, not every decision whose *Scope* names the part. | "Reading the foundation" step 2 for browser-view (252 entries, about 5600 lines) and account-server (90 entries, about 1660 lines): the first alone is far over the limit of one slice. | A decision outside the list may bear on the change; the review of the whole change selects its own foundation, and the report names the choice. |
