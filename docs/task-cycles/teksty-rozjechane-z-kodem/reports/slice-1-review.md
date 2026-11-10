FAIL fe84d1efea70dad6a51eb488fed2e169bb14aafa

# Review of Slice 1 and of the foundation entries

Range `adbec4b025b9b5760bdb41b5d803794cbb062acd..fe84d1e` (20 foundation commits `6c31f59`..`3fcf546` and the executor's commit `fe84d1e`). `git rev-parse HEAD` shows `fe84d1efea70dad6a51eb488fed2e169bb14aafa`, so the range was reviewed as given. Worktree `the task's worktree`; `git status --short` was empty before and after my checks (I changed nothing tracked).

Summary: 1 blocking (Important), 6 Minor, 0 Critical. The code part of Slice 1 (README, `package.json`, `package-lock.json`) is correct. The one blocking finding is in the glossary entry `catch-up`.

## Findings

### Important (blocking, within the task)

**I1. The glossary entry `catch-up` is narrower than D-247 and than task item 36, and excludes the case that item names last.**
- Place: `foundations/glossary.md:225` (`## catch-up`): "The catch-up is the computing of the game minutes that passed since the save time, which runs after each load of a saved game state."
- What is wrong: task item 36 (`task.md:73`) asks the entry to say that the computing counts from the save time and runs after each load of a saved game state, "also with the tab open, after a save lost to another browser, and after a new sign-in with the state kept in the page's memory". D-247 (`foundations/decisions.md:4989-4994`) lists exactly these occasions, the last as "a sign-in to the same account with the state kept in the page's memory (D-211)". The same range (row 32, commits `6956219`) makes D-04 and D-213 call that state "the unsaved game state", never "saved game state". Read with that vocabulary, the new definition says the catch-up runs after loading a *saved* game state, which excludes the sign-in with the unsaved game state kept in the page's memory. A reader of the glossary alone concludes the catch-up does not run in that case, while D-247's *violates* example ("a state kept in the page's memory going on from the sign-in with its missed game minutes dropped") says it must. This is an entry that restates D-247 without a qualification (WAY-263), so Important.
- Second, smaller defect in the same sentence: "since the save time, which runs after each load" attaches "which runs" to the nearest noun, "the save time", which does not run. The relative clause belongs to "the computing".
- Evidence: `git diff` of `8053821`; `decisions.md:4989-5005` (D-247, binding sentence and *violates*); `decisions.md:62` and `:3974-3978` (D-04, D-213 after the range); the writer's own concern 3 in `reports/foundation-1-report.md` names the same mismatch and leaves it.
- Fix, one line: for example "The catch-up is the computing of the game minutes that passed since the save time, run after each load of a game state, the unsaved game state kept in the page's memory included." (the wording is the author's; it must name the memory case and attach the clause to the computing). Whether D-247 and the invariant text `catch-up-minutes` then also say "unsaved game state" is a separate row (see Declined to judge).

### Minor

**M1. D-252 *violates* example reads, literally, as a description of the unchanged code of `measure-passwords`.**
- Place: `foundations/decisions.md:5152` (the *violates* line "a JSON line of failure written by `account-database-check` or `measure-passwords`") and `:5168` (*Rejected*, "a JSON line of failure in both commands that print to whoever ran them").
- `src/server/measure-passwords.ts:343-345` (`finish`: `console.log(JSON.stringify(result))`) and `:376-388` print, on failure, one line of JSON `{"ok":false,"versions":…,"errors":[message]}`. D-252's own *complies* example calls that output "the error's text in its report for the script that ran it", so the intended meaning is a failure line of the log form of D-252 (`writeFailure`, fixed fields `kind`, `code`, `place`). The word "JSON line" without that qualification lets an agent compare the command's present report with the *violates* example and flag it. Say "a failure line in the form of D-252 (`writeFailure`)" or similar. Minor because the binding sentence and the *complies* example resolve it.
- Also in the binding sentence (`:5129-5131`, "as these two do on a temporary database and made-up passwords". Only `account-database-check` uses a temporary database (`mkdtemp`, line 49); `measure-passwords` opens no database and uses synthetic passwords only (its header comment, lines 14-16). The sentence is true of the pair taken together; the task's answer 7 words it the same way.

**M2. D-252 now answers a question D-354 answers for two other commands (WAY-19).**
- D-354 (`decisions.md:7946`) "Is the sentence by which a service command answers the operator a log line?" covers `account-block` and `account-backup` by name. D-252's binding sentence 2 now answers the same question for the readiness line, `account-database-check` and `measure-passwords`, with the opposite consequence for the JSON line (D-354: JSON line plus sentence; D-252 for these two: sentence only). No contradiction (D-354 names a closed list), and item 37 and the plan name D-252, so I do not call it blocking. Cost if left: D-252's sentence 2 is long and a later reader meets the same question in two entries with different outcomes and no cross-reference. The writer's concern 1 names the alternative (a new entry deriving from D-252). A one-clause pointer is enough.

**M3. D-183 *Rejected* keeps "an exception for tasks 14 and 18".**
- Place: `foundations/decisions.md:3364`. The source (`git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md`, line 59, Q6 answer: "Odrzucone: B — „Zakończ” przed domknięciem oddaje do skrzynki to, co postać wniosła („Zakończ” jako darmowe cofnięcie pobrania ze skrzynki i wyjątek dla zadań 14 i 18)") has the words, so the entry is faithful. But "tasks 14 and 18" are numbers of tasks of a plan that is not in the foundation and that a later reader cannot resolve. Say what the exception was for, or drop the clause; the source names no cost beside it, so there is nothing else to add.

**M4. D-147 and D-185: the weighed way is deleted, not reworded.**
- Place: `foundations/decisions.md:2808` and `:3390`. Item 41 asks that the rejection not be justified by the order "above discovery" the screen no longer has. The writer removed the variant itself (D-147 now five other ways, D-185 two), because no source holds a reason that survives. Defensible: the way cannot be proposed now. Cost: the record no longer shows the human weighed it. The human sees a deleted line at the merge, not a changed reason; the report says so (`foundation-1-report.md`), the entries do not. Left to the human's reading of the diff. Concern 2 of the report (D-185 "below the status") is outside item 41.

**M5. D-01 State of JS citation labels "11,141" as the "total".**
- Place: `foundations/decisions.md:9` ("§ JavaScript Runtimes, All Respondents chart, total — "11,141""). The page text holds "11,141" after the chart rows, followed by "86% 2.4 10"; it does not label the number as a total. Both numbers and the place are on the page (checked, see checks); only the label "total" is an inference, as the writer's concern says. The old wording of the entry already said "respondents to the runtime question". Drop the word "total" or say "figure under the chart".

**M6. D-111 *Rationale* new sentence is hard to read.**
- Place: `foundations/decisions.md:2024` (second paragraph): "The decoding of the file drops a byte-order mark, so the password is empty when what it decodes to is, not only when the file has no byte, and the mistake shows at startup." Fidelity is fine (`src/server/configuration.ts:128-131`: `new TextDecoder("utf-8", {fatal: true})` drops a leading byte-order mark; the check `length === 0` is on bytes). Wording only: "the password is empty when what the file decodes to is empty, not only when the file has no byte".

### Critical

none

## Slice 1 against the task

- Task item 1 and question 1 (`task.md:26`, `:83-87`): `^24.15.0` stands in `README.md:5` ("Node.js 24.15.0 lub nowszy w linii 24 (`^24.15.0`)", Polish kept, floor named), `package.json:7` and `package-lock.json:39` (`packages[""].engines.node`). Met.
- Lockfile: `git diff --numstat adbec4b..fe84d1e -- package-lock.json` is `1 1`; the hunk is the single `engines.node` line of the root entry; no `version`, `resolved` or `integrity` line changed. `package-lock.json:4346` (`node_modules/jsdom` 30.1.3) and `:4846` (`node_modules/npm`, the pinned 12.2.1) both declare `^22.22.2 || ^24.15.0 || >=26.0.0`, so `^24.15.0` is the line-24 floor both declare (the executor's claim holds). The README gives no reason sentence; the plan makes it optional and the lockfile would have supported it. Not a finding.
- No other file names the old range: `git grep` for `24.x`, `engines`, `engine-strict`, `.nvmrc`, `node-version` outside `foundations/`, `.the-way/` and `.runs/` finds nothing (`Dockerfile` uses `node:24-slim`, no CI workflow names a Node version). `foundations/` and `guidelines/` do not mention `engines`.
- Invariant `account-server-runtime`: `tests/invariants/test_account_server_runtime.py` reads the major version through `range_major`, which maps `^24.15.0` to 24 (regex `[\^~=v]*\s*(\d+)(?:\.(?:\d+|x|X|\*)){0,2}…`); it passes. The test does not pin the floor 24.15.0 (the executor's own gap note). Task item 1 does not ask for such a test; see Declined to judge.
- Crafted input at the `build-tools` boundary: the change is a value of a semver range in `engines`, with no new resolution, so there is no new dependency, URL or hash to forge. `npm audit` of the changed lockfile against the lockfile at the fork point `2fe922c` ran (the script did not print "nothing to audit") and found no new advisory.

## Foundation entries against the plan, the task and the templates

Source fidelity was checked against the sources themselves (git objects, code, pages fetched on 2026-11-10), not against the writers' reports.

| Entry (commit) | Result |
|---|---|
| D-252, row 1 (`6c31f59`) | Binding paragraph stays three sentences (counted); no `will`/`should`/capitalised keyword in added lines; code facts true (`account-database-check.ts:80-83` prints one sentence with the error's text, `measure-passwords.ts:343-388` prints the report). *Rejected* A and B equal the "Not chosen" of question 7 with their costs. Findings M1, M2. |
| D-111, row 2 (`0202a50`) | Binding sentence, *Rationale*, *Rejected* match question 3 (B not chosen, its cost). Code decoder behaviour confirmed (`configuration.ts:128-131`). Not yet in code: Slice 4 (see Declined to judge). Finding M6. |
| D-48 (`29447bc`) | `b0c4d44` is an ancestor of HEAD and of `origin/main`; `git show b0c4d44:docs/task-cycles/styleguide-loop2/spec.md` Decision 1 (lines 76-111) names "Every other value … a custom property of its own, named by what it is for, never by a colour or a number alone" and `:342` leaves the names of the non-role properties to the maker within Decision 1. Faithful; the *Origin* is a file at a fixed commit, as the template allows. |
| D-54 *Rejected* (`39760bd`), D-54/D-56 place on the list (`71271ee`) | `unknown` is right where no source offered sorting by name (the writer searched `siedziba-i-druzyna`); *violates* example kept. After the edits no "place on the (team's) list" remains for characters (`grep` of `foundations/decisions.md`); the remaining hits are the list of programs (D-165), outside the row. |
| D-56 first number (`5aa41ec`) | `newGame()` sets `nextCharacterId: 1` (`src/browser/sim/game.ts:342`); `createCharacter` gives `id: state.nextCharacterId` and increments (`:407`, `:422`); team starts empty (`:325-340`). True. |
| D-67 (`e4b08bd`) | The binding sentence renews on whole multiples of the renew time counted from minute zero; a tile missing two sticks since minute 45 gains at 60 and 90. True; the *violates* example still stands unchanged. |
| D-156 (`577ca9d`), D-101 (`c87a9b0`) | Wording as asked; no other "resurrect" for a session or counter in `foundations/` or `guidelines/` (grep). |
| D-183 (`be54119`) | Faithful to `git show 1b09f80:…/task.md:59`. Finding M3. |
| D-04, D-213 (`6956219`) | Match D-211's own name ("the unsaved game state", `decisions.md:3901`). D-213's second change (the state "on the server" and "in the page's memory" listed apart) keeps the meaning. |
| D-207 (`a48f223`) | 24 x 3600 / 30 = 2880; no other "1440" or "overnight" for saves remains. |
| `catch-up` (`8053821`) | Finding I1. Other uses in decisions, invariants, code and tests were not searched again by me beyond a grep for "closed/absence/away" near "catch-up" in `foundations/` and `guidelines/` (one hit, `decisions.md:4858`, unaffected); `decisions.md:181` ("the time the game was closed") is a *violates* example about the server, not the term. |
| D-313 *Rejected* (`937e47e`), *Rationale* (`3112e4d`) | Removed variant is the last in the entry as item 39 says. The new reason is in the cycle record the entry's source cites: `git show 2aae30a:docs/task-cycles/ekran-przejscia/reports/report-slice-3.md` choice 3 ("null would grey the button on a state D-313 gives a rule for, and a rule without a target is not allowed by the types") and `report-review-return.md` finding r3 ("the button writes only a rule the rule panel can show filled"); `cycle.md` lines 130 and 230 point to them. The sentence combines the two faithfully and drops "types". `2aae30a` is on `origin/main`. |
| D-147, D-185 (`db0ceb7`) | Finding M4. |
| D-312 (`2f89dbb`) | Reads as a list of three ways; no change of meaning of the rest. |
| D-01, D-02, D-05 (`146f5bd`) | Every quoted string (28) found on its page: I fetched the 14 pages and the raw Docker file myself and tested each string with markup stripped (a first pass found 12 only because inline markup splits words; a second pass ignoring whitespace found all). Sections (§) named exist on their pages (type stripping, Long Term Support (LTS), Drivers, express.json(), express.Router(), Serving static files in Express, The default error handler, Validation and Serialization, Examples). Go's apostrophe is `&rsquo;` on the page, as written. The Node.js address is a `latest-v24.x` path and now serves v24.22.2, which the entry says; the decision template asks for an address, a place, a passage and a date for a decision's source, and the frozen-address rule is in the environment-fact template, so it does not bind D-02. Finding M5. |
| `docker-build-cache-invalidation`, D-237 (`e50b231`) | "Build arguments do result in cache invalidation." is in `invalidation.md` § Build secrets at the pinned commit `62f6d26c…` (lines 90-100); the four earlier passages still stand there. `Dockerfile:16` `ARG LOOP2_COMMIT` precedes `:30` `RUN node dist/server/account-database-check.js`; `compose.yaml:10` and `deploy/loop2-deploy:319` pass it. The extension of the *complies* example to "a build of the same commit" follows from the row's meaning and is correct. The invariant `account-save-sqlite-upgrade` (*Rests on* the fact) stays true. |
| `browser-bare-import-resolution` and D-269 (`3fcf546`) | The three passages are in § 8.1.5.1 of the WHATWG commit snapshot `a0442320…` (frozen address, fetched 200). One sentence, one source; the identifier is new in the shared space (`foundation_check.py` reports 0 errors); D-269 *Based on* now names it. The repository has no import map (writer's grep; I did not repeat it). |

Template checks done on the whole range: *Rejected* of settlement-row entries (D-252, D-111) holds only ways of the row's source with their costs (WAY-134); *Rationale*/*Rejected* additions name no file or script (the only identifier is the build argument `LOOP2_COMMIT` in D-237, taken from item 34 itself); all entries are English; the fields of every changed entry are all present.

## Declined to judge

- D-111 and the code: D-111 now requires the server to refuse a mail password file that decodes to an empty password (a file of only a byte-order mark); `src/server/configuration.ts:128-131` at `fe84d1e` refuses only zero bytes. That is the cycle's own plan (Slice 4 writes the code and the test); judged by the whole-change review, not here.
- D-247 and the invariant text `catch-up-minutes` still call the page-memory state "saved game state" (the writer's concern 3); item 32 names only D-04 and D-213. Outside the task as written (relates to I1: fixing I1 does not need it).
- D-165 and other entries use "place on the list" for the list of programs; item 26 names D-54 and D-56 only.
- D-185 still says "changes the accepted placement below the status" (concern 2 of the writer); item 41 names only "above discovery".
- A test that pins the floor 24.15.0 (a change from `^24.15.0` to `^24.0.0` passes every current check): the task does not ask for one; the executor named the gap.
- README reason sentence (npm and jsdom declare the floor): optional in the plan.
- D-02's Node.js address moving to newer text: allowed for a decision's source by the decision template.

## Checks run

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `python -B scripts/test.py tests/invariants/test_account_server_runtime.py` | 0 | Ran 5 tests, OK |
| 2 | `git diff --numstat adbec4b025b9b5760bdb41b5d803794cbb062acd..fe84d1e -- package-lock.json` | 0 | `1 1`; hunk is the one `engines.node` line of the root entry |
| 3 | `python -B scripts/audit_dependencies.py` | 0 | no output; lockfile differs from fork point `2fe922c`, so both `npm audit` runs executed against the npm registry (network was available); no advisory new against the fork point |
| 4 | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| 5 | Manual: fetched 14 pages and `invalidation.md` at the pinned commit with `curl` into the scratchpad, tested all quoted strings and § names with `python -I` (`.../scratchpad/verify_quotes.py`) | n/a | all strings found; sections exist; see table |
| 6 | Manual: `git show 1b09f80`, `2aae30a`, `b0c4d44`; `git merge-base --is-ancestor` of the last two against HEAD and `origin/main`; code reads named in the table | n/a | as in the table |
| 7 | `git status --short` before and after | 0 | empty |

Not run: `npm test` (the cycle's own full run), `foundation_check` with test-citation checks beyond the default (the default ran, exit 0).

## Reaches beyond the handoff

- `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/template.md`, `.../environment-facts/template.md`, `.../glossary/template.md`: named by the handoff; read whole.
- `foundations/decisions.md` D-354 (`:7946`), D-253 (`:5170-5190`), D-355 (read to the end of its rationale only because it follows D-354), D-211 (`:3895-3905`), D-247 (`:4989-5016`), D-185 (`:3379-3392`), D-122 and D-311 (opening lines only), D-67 (`:1337-1349`), D-54 (`:1100-1121`), D-313 (changed hunks): to judge the new text of D-252, the glossary entry and the dropped variants against their neighbours. Why: the grading rule for entries that restate another entry (WAY-263) needs the neighbour.
- `foundations/invariants.md` `account-startup-configuration` (`:749-757`) and `account-save-sqlite-upgrade` (`:1109-1117`): dependants of D-111 and of the Docker fact.
- `src/server/account-database-check.ts`, `src/server/measure-passwords.ts`, `src/server/configuration.ts:120-135`, `src/server/log-line.ts` (head), `src/browser/sim/game.ts:325-425`, `Dockerfile`, `compose.yaml`, `deploy/loop2-deploy` (grep), `scripts/audit_dependencies.py`: code facts quoted by the entries.
- `package-lock.json:4317-4350`, `:4688-4850` and a grep of every `engines` line: to confirm the line-24 floor.
- `git show` of `1b09f80`, `2aae30a`, `b0c4d44` (the files the entries cite).
- `a rule file of the author's agent instructions`: read before writing the one check script (the vault's rule).
- `the task's note in the author's backlog`: listed only (`ls`, `grep -n`), to confirm that the file D-252's *Origin* cites exists and has a "Settlements to record" section.

## Unread material

- `foundations/decisions.md:3-15` (D-01) and `:765-776` (D-33), `foundations/invariants.md:5-13`, `:449-457`, `:549-557`, `foundations/part_map.md:84-116`, `guidelines/coding.md`: named in the slice's *Read*. I read the lines of D-01 that the diff changes, and the `account-server-runtime` test whole; I did not read D-33, the three invariant entries (`account-server-runtime`, `introduced-npm-vulnerabilities`, `dependency-audit-refusal`), the `build-tools` part-map entry or `guidelines/coding.md` whole. Why: the slice changes one range value in three files; the checks that these entries direct (the invariant test, the audit script, the one-line lockfile diff) were run, and the code of `scripts/audit_dependencies.py` states D-33 and the audit rule itself. If the orchestrator wants the entries read whole for a stricter reading of the lockfile boundary, say so.
- `plan.md`: read the section *Foundation entries* (lines 1-40) only. `task.md` read whole. `reports/foundation-1-report.md` and `reports/foundation-2-report.md`, `reports/slice-1-report.md` read whole.
- The pages cited by D-01, D-02, D-05 and the HTML Standard snapshot were checked at the quoted passages and section headings, not read end to end.
- `.the-way/elements/decisions/examples.md` and `.the-way/elements/glossary/examples.md`: not opened.

## Searches not found or unclear

- The State of JS page does not label "11,141" (see M5): unclear what the number counts; the entry's label "total" cannot be confirmed from the page.
- `tests/invariants/test_account_startup_configuration.py` (named in the writer's report as not found): I did not look for a test of the empty-password refusal beyond `grep` for "byte-order|BOM" in `tests/*.mjs` and `tests/invariants/*.py`, which found nothing; Slice 4 owns it.
- I did not search for an import map in the repository myself (the writer's grep for `importmap`); the HTML fact's bearing on D-269 rests on that.
- Nothing else looked for and not found.
