# Plan report — Uzgodnić z kodem fundament, wytyczne, README i stronę wszystkich stanów loop2

Status: done with concerns

- Plan: `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`
- Final size report: `docs/task-cycles/teksty-rozjechane-z-kodem/plan-size.md`
  (`python -B .the-way/task-cycle/slice_size.py`, exit 0, all 12 slices `fits`; the largest reads about
  122 thousand estimated tokens, the most files changed by a slice is 4)
- Check result: size script exit 0; nothing else could be run at the planning stage. No code, no
  tracked file and no foundation entry changed (`git status` clean).
- Spec: none. Open design choice: none found (section 2 of the method). Reserved choice: none.

## What the plan is

- **Foundation entries (before Slice 1):** 20 rows. Two are the rows of *Settlements to record*
  (row 1 for To do 37, row 2 for To do 29); the other 18 are the corrections of To do 21, 24 to 28,
  30 to 36 and 38 to 42 (decisions, one glossary entry, one changed and one new environment fact).
  They are entries, not slices, because `foundations/decisions.md` is about 790 thousand characters and
  `slice_size.py` counts a file of *Change* whole (about 316 thousand estimated tokens, over the 250
  thousand limit): no slice that lists it in *Change* can fit.
- **Slices (12, in this order):** 1 Node range (README, `package.json`, lockfile root entry, trust
  boundary); 2 README browser check and build point; 3 kitchen-sink tiles use the game's icon
  placement and the "Wyczerpane" note is corrected (test first); 4 the server refuses a mail password
  file that decodes to nothing (`src/server/configuration.ts`, test first, trust boundary); 5 "restore"
  in two tests; 6 docstring of the sprites check; 7 two more reads allowed in the deploy skill and its
  copy; 8 the four host facts with a reading through MCP `mikrus` (after 7); 9 testing guidelines;
  10 coding guidelines and the rule "Recording a failure" (after Settlement row 1); 11 styleguide
  (after 3); 12 `src/browser/AGENTS.md` (after 11).
- Slices 1 and 4 carry `Risk: trust boundary` as the orchestrator asked. Slice 7 (deploy-skill reads)
  carries `Risk: none`, because the part map names no trust boundary for the skill files; the cycle record
  calls that list security-relevant, so the orchestrator may want a review of its own for Slice 7.
- Order against the styleguide's example ("Plan of a user-interface change": fonts, tokens, stylesheet,
  controls, page of all states): the only slice that changes the interface is Slice 3, the page of all
  states, which is the last step of that example; the example asks for nothing before it here (no font,
  token, stylesheet or control changes). Slices 11 and 12 change the styleguide's text and the
  instruction file and come after Slice 3 because they describe what that slice leaves.

## Concerns and questions for the orchestrator

1. **Item 22 needs a tool version that no allowed command prints.** The template's form is
   `reading: <command> on <host>, <tool and its version> — "<output>"; run <date>`. The list "Allowed" of
   the deploy skill has no `--version` query and no read of the operating system's name, and Question 2
   authorized exactly the two commands of item 23. Slice 8 therefore tells its executor to run only
   allowed commands and to return `questions` naming each tool whose version it cannot read, never to
   write a version from memory or from the old entries. Proposed answer: ask Mariusz whether Slice 7
   may also allow the read-only version queries of the tools the four facts name (`docker --version`,
   `free -V`, `stat --version`, `grep --version`, the OS name from `/etc/os-release`); if yes, add
   them to Slice 7's goal; if no, the facts record the command and the output with the tool's name
   only, and the template's version is left out with the reason in the report.
2. **The host's name must stay out of the facts.** The deploy skill forbids the server's name,
   identifier, port and address in repository files, and a test checks the skill copies for it, so
   Slice 8 writes `<host>` as "the test server's host", as the four old facts stand (they name no host).
3. **The foundation step is large for one agent.** Twenty rows, three needing web reads (To do 21:
   14 pages of 3 decisions; 34: a Docker documentation passage; 38: a source for a new fact on the
   browser and a bare import). The rows are independent; the orchestrator may run the foundation step in
   several runs by group without changing the plan. An agent without a web tool returns `blocked`.
4. **Rows that may come back as questions**, because the decision template forbids the writer to derive a
   *Rejected*: To do 25 leaves D-54 with no rejected variant (its only variant is the one to remove), so
   *Rejected* must become `unknown` or `none considered`; proposed answer `unknown` (no source records
   what was weighed). To do 41 (D-147, D-185) says what *Rejected* must not do, not what it says instead;
   proposed: remove the stale order from the reason and keep only a reason the entry's own sources hold,
   else `unknown`. To do 31, 35 and 39 name their sources and should not need a question; To do 40's
   reason is in the cycle record at `Q9` (line 130 of `docs/task-cycles/ekran-przejscia/cycle.md` at
   `2aae30a`; line 230 only says it stands there).
5. **Decisions read per slice are the topical ones, not every decision whose *Scope* names a part.**
   "Reading the foundation" step 2 would give browser-view 252 entries (about 5600 lines), account-server
   90 (about 1660), build-tools 58, agent-workflow 43: the first alone is more than a slice may read.
   Each slice names the decisions that bear on it (and the ones its entries link to). The orchestrator
   may add; the review of the whole change selects its own.
6. **Task line numbers have drifted** since the commit the task was checked on (`72287c2`; main has
   moved by the merges of #71, #72 and others: `guidelines/coding.md`, `guidelines/testing.md`, the
   deploy skill, `foundations/*` changed). Every premise of the 42 items that I could check in the
   repository text holds at the base (the quoted sentences, files and behaviours exist as the items say),
   but line numbers in the task are approximate; the plan locates things by text. Items whose premise
   rests on outside sources (21, 31, 34, 38, 40) were not verified beyond the repository (and, for 31 and
   40, the two git blobs, which exist and hold the evidence).
7. **To do 29 leaves a byte-order mark followed by characters accepted** (the decoder drops the mark and
   the rest is the password), as it is today, because Settlement row 2 asks only that the decoded password
   not be empty. If Mariusz wants that case refused as well, it is a change of meaning not in the row.
8. **To do 2 may want the running game.** The README sentence describes what the screen shows; Slice 2
   gives the executor the code of the screen, its header, the area with the tabs and the footer. Reading
   code does not show the rendered screen; the slice's check says so and the executor may use `loop2-play`
   if a sentence cannot be settled from the code.
9. **`maintain-*-guidelines` skills lead a refinement with the human.** The task says to write the
   guidelines "through" them. In a cycle they write nothing (their table says the cycle's author writes
   the file). Slices 9, 10, 11 therefore read each skill's `SKILL.md`, the common `template.md` and the
   discipline's `template.md` and write the file as the cycle's author does. Uncertain whether Mariusz
   meant more.
10. **Foundation check at the base** was not run by me (the handoff reports `0 errors` on `adbec4b`).

## Guidelines missing or uncertain

- `guidelines/coding.md` has no kind row for `src/server/configuration.ts`; Slice 4 reads the general file
  only. No testing recipe covers the kitchen-sink page; Slice 3 tests the exported function and leaves
  the look to a screenshot (the "Not tested on purpose" row on whole screens and on rendering).
- `guidelines/testing.md` places `tests/view/*.test.mjs` at the unit level by directory while saying
  "poziomu nie wyznacza katalog" (that is To do 10 itself).
- `guidelines/coding-browser-module.md` statuses (`copy`, `do not copy`, `exemplar`) are not defined in the
  file; Slice 10 tells the executor to take the meaning from the table's other rows and the template and
  to name the choice.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/SKILL.md` and `foundation_step.md` (how entries and slices are handled; the
  reason entries carry the decision-log edits).
- The earlier cycle's plan and size report from git history (`git show 319aa4b:docs/task-cycles/porzadki-z-uwag-pr/plan.md`
  and `plan-size.md`), to see how a plan handled a decision log edit; it listed such edits as *Foundation
  entries*, as this plan does.
- `.the-way/product-guidelines/reading.md`, `.the-way/elements/decisions/template.md`,
  `.the-way/elements/environment-facts/template.md` (form of entries), the discipline `SKILL.md` and
  template sizes, `.the-way/task-cycle/slice_size.py`.
- Product code and tests to cut slices: `src/server/configuration.ts`, `src/server/account-database-check.ts`,
  `src/server/measure-passwords.ts`, `src/server/account-routes.ts` (the release calls), `src/browser/view/terrain-picture.ts`,
  `src/browser/kitchen-sink/kitchen-sink.ts`, `src/browser/view/*.tsx` headers, `tests/startup.test.mjs`,
  `tests/view/terrain-picture.test.mjs`, `tests/invariants/test_account_server_runtime.py` and others,
  `README.md`, `package.json`, `package-lock.json`, `Dockerfile`, `scripts/*`.
- Foundation entries beyond *Decisions in play*: D-12, D-354, D-253 (listing), D-271 (head), the
  environment facts at `environment_facts.md:1-38`, `:460-464`, `:604-608` (ranges), invariants
  `account-startup-configuration`, `design-token-contrast`. The cycle record of the earlier task at
  `2aae30a` and the frozen task at `1b09f80` (existence and the lines the items cite).
- Nothing was written outside `docs/task-cycles/teksty-rozjechane-z-kodem/` of the worktree.

## Unread material

- `guidelines/coding-browser-module.md`: read the head, the table of files and the rules up to line 110
  and the diff since `72287c2`; not the rest (rules after line 110, the example sections). It goes to Slice 3 and
  Slice 10 whole.
- Other kind files of `guidelines/coding-*.md` (mail-sending, account-policy): read the parts the items cite
  and the nearby rules; the rest not read.
- Decisions of *Decisions in play* not read whole: D-04 (heading only; named in Slice 3's *Read*) and D-280
  (the quoted part in the task only; named in Slices 2 and 11).
- Decisions whose *Scope* names a part a slice touches: not read (concern 5). Decisions named in a *Read*
  list that I only located by range: D-13, D-14, D-16, D-17, D-33, D-36, D-39 to D-47, D-70, D-73, D-77,
  D-81, D-83, D-102, D-103, D-116, D-153, D-158, D-226, D-227, D-231, D-253, D-264, D-268, D-271 (head
  only), D-281, D-288, D-291, D-308 to D-311, D-346, D-349.
- Invariants named in *Read*: read `account-startup-configuration` and `design-token-contrast`; the others
  located by range and by the docstrings of their tests (`account-server-runtime`, `terrain-drawing-numbers`
  and `document-test-memory-limit` in part).
- Code: `src/server/measure-passwords.ts`, `src/server/account-policy.ts`, `src/server/account-mail.ts`,
  `src/browser/view/run-screen.tsx` and others were read in part (the passages the items cite), not whole.
  `tests/http.test.mjs` and `tests/startup.test.mjs` were read only at the passages named.
- The ten files of `src/browser/view/controls/` and `src/browser/styles.css`: listed by name and size, not read.
- The cycle record `cycle.md` of the worktree: read the head.

## Searches not found or unclear

- An environment fact that the browser resolves no bare import: searched `environment_facts.md` for
  "bare", "specifier", "import", "module", "esm" in titles and text: not found, so To do 38 is a new fact.
- A reason for D-313's give-way rule in the entry: not found there (To do 40 says so); found in the cycle
  record row `Q9`.
- "Slice 3 of task `scena-z-ludzikiem`" outside the docstring of the sprites check: found only in
  provenance comments of `scene.tsx`, `world-area.tsx`, `scene.test.mjs` and `world-area.test.mjs`, outside
  To do 8; left alone.
- How a cycle executor uses `the-way-maintain-*-guidelines`: unclear (concern 9).
- A way for a read of the test server to give a tool version within the allowed commands: not found
  (concern 1).
- A kind row or exemplar for `src/server/configuration.ts`: not found.
