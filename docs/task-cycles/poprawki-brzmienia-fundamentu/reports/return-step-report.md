# Return step - poprawki-brzmienia-fundamentu

**Status:** done (one correction made; nothing blocked, no question for the orchestrator).

**Commits:** `949f14db` on `task/poprawki-brzmienia-fundamentu` (from head `d09512b4cb3d25599cc02b33a7da2c4fdb006a3d`; 3 files: `README.md`, `foundations/decisions.md`, `tests/view/icons.test.mjs`).

**Check result in one line:** `foundation_check.py` 0 errors (3 `listed:` lines left, all judged by the reviews); `check_instructions.py` 0 errors, 144 warnings; `npm test -- tests/view/icons.test.mjs` 36 pass; `prettier --check` on the changed test file passes; the product's full gate not run (as instructed); ruff not run (`.runs/quality-venv` missing; no Python file changed by me).

## Entries compared with the code, and what no longer matched

I read the whole word diff of `foundations/decisions.md` for the range (`f66ae6eb..d09512b4`), and the diffs of `glossary.md`, `invariants.md`, `part_map.md`, `environment_facts.md` and `guidelines/`, then compared each claim about code with the code at the head. Line numbers named in the task are from `fc00c406`; I searched by content where they had moved.

Compared and matching:

- `reading` (glossary): `src/browser/view/clock.ts:62-90` - `TICK_MS = 200`, "every 200 ms it makes a reading, of `performance.now()` for the real milliseconds elapsed since its previous reading", passes real time to the simulation, then `onReading`. The definition and the 200 ms in D-316 *Rationale* match.
- D-44 (seven kinds of the shared button): `src/browser/view/controls/react-button.tsx:15-16` has `destructive`, `secondary`, `tab`, `main`, `positive`, plus the plain button and the selected one given by `selected`; seven.
- D-70 (both campfire icons masks in `text-strong`): `src/browser/styles.css:462-468`, `:560` (an icon of the drawing is a mask in `text-strong`); `src/browser/sim/data/campfire.ts` gives each state its own icon file.
- D-170 (list beside the label "Program:"): `src/browser/view/maps-screen.tsx:316-318`.
- D-17 (`logs`): `deploy/loop2-deploy:38-39` (`LOG_FILE`, `DUMP_FILE`). D-253 (`src/server/measure-passwords.ts`, `deploy/loop2-watch`): both files exist.
- D-83 and `guidelines/testing.md` (runner of the gate): `.the-way/gate/run_tests.py:7`, `:85-87` - every directory holding a `test_*.py` file git tracks.
- D-322 (effect of a moment less than three seconds): the specks run 1800 ms from a delay up to 900 ms (`src/browser/run-screen.css:1158-1159`, `:1305-1308`), 2.7 s; the fall of the mage 960 ms. Holds for them; see "Observation" below for the discovery plaques.
- `player-argon2-deployment-check` ("512 MiB memory limit `compose.yaml` gives the application container"): `compose.yaml` `mem_limit: 512m` for the application, `256m` for the tunnel.
- `account-message-limits`, D-105, D-161: `src/server/account-policy.ts:21` `perAccount: 3`, `src/server/database.ts:538-560` counts `own` per account.
- Part map: `deploy/cloudflared.Dockerfile` is in the `deployment` files (`part_map.md:188`) and exists; `simulation` now says it holds the data of the scene and the words that name the game - `src/browser/sim/data/scene.ts` and `src/browser/sim/data/about.ts` (`ABOUT`, read by `account-card.tsx` and `menu-bar.tsx`) exist; `build-tools` *Trust boundary* `/package-lock.json` as in *Files* (`part_map.md:95`, `:121`). No file was added or removed by the change, so no *Files* list needed a change.
- Environment facts: sentences agree with their *Source*; the Node-line sentences ("Node.js 24, as its 24.21.0 documentation says") match what the decisions that rest on them say (D-236 keeps its own 24.17.0 / 24.22.1 clause, which is a decision's statement and not those facts).
- Guidelines: the styleguide's second login-card sentence is the `FAILURE_SENTENCE` of `src/browser/view/last-resort.ts:13`; the "three later kinds" list in the styleguide has the three items it counts; `testing.md` matches D-82 and D-83.
- Glossary use: `git grep -i -w camp` over the foundation leaves only `at the camp` (a character's place); no foundation entry calls the band "the camp". "picture band" is a plain compound a reader of the field reads right, so it takes no glossary entry (WAY-95).

What no longer matched, corrected in `949f14db`:

1. The environment fact `pixel-crawler-terms` (changed by this change) now says the Pixel Crawler terms "ask for no credit except where the project has a saxophone solo". Three sentences that rest on it still said the pack asks for no credit or that its terms do not require a mention, which is no longer the whole of the fact (the game has no saxophone solo, so the credits are unchanged):
   - `foundations/decisions.md` D-271 *Rationale*: "the pack asks for no credit, so the game's credits stay as they are" -> "the pack asks for no credit of a game with no saxophone solo, so the game's credits stay as they are". Nothing D-271 binds changes.
   - `README.md` point 2 of "First run": "whose terms do not require a mention:" -> "whose terms ask for a mention only of a project with a saxophone solo, which this game has not:". The case in `tests/view/icons.test.mjs` that reads this sentence still passes (it names no second pack in that sentence).
   - `tests/view/icons.test.mjs:381-385` comment over `SPRITE_PACKS`: now says Pixel Crawler asks for none but of a project with a saxophone solo, which the game has not. The `asksForCredit: false` value is unchanged and true for this game.

## Written or changed

- Decisions: D-271 *Rationale* (one clause, above). The decisions the rest of the change wrote or changed were compared as listed above and left as they stand.
- Invariants: none. Environment facts: none. Glossary terms: none. Part-map changes: none.
- Settlements to record: none (the task's row list is `none`); choices that bind after the merge: none beyond what the change already carries (the name "picture band" stands in D-389, D-271, D-272, D-421 and D-54, and in the glossary `at the camp` *Not*). No entry was deferred or proposed for later.
- Where each settlement went: no row, so no place of the questions table was needed.

## Not changed on purpose (the orchestrator's three wordings)

The *Not* `"reading:"` of the term `reading`, the ordinary senses of "reading" in other entries, and "narrowed by D-265" in D-03 *Relations*: untouched.

## Observations outside the change (not corrected, for the orchestrator)

1. `.claude/skills/loop2-scene-art/SKILL.md:9` and `.agents/skills/loop2-scene-art/SKILL.md:9` still call the band "the camp" (already recorded).
2. `.claude/skills/loop2-deploy/references/setup_and_secrets.md:425` and its twin under `.agents/skills/` say "the deployment's memory limit" (`--memory 512m`) - the use of "deployment" as a thing that `player-argon2-deployment-check` and `scripts/measure-passwords.mjs` were corrected away from. Agent skill files, outside the change.
3. `tests/password-measurement.test.mjs:382` has the case label "the deployment's limit instead of 80% of it", beside the identifier `deploymentLimit` (`:21`); same use, outside the task's list (the task keeps the constant `DEPLOYMENT_MEMORY_LIMIT` of the script only).
4. D-322 *Rationale* says "once and for less than three seconds". For a discovery, `src/browser/run-screen.css:1196-1198` gives the moment `600 ms + (count - 1) * 150 ms` and `scene.tsx:254` sets `--count` to the number of plaques with no cap I found, so the sentence holds for up to 16 plaques; I did not measure the largest discovery the data can give. The wording is the task's; not changed.
5. `src/browser/sim/game.ts:369` "defeated-attack count" and the test titles with "defeated attack" (`tests/sim/*.test.mjs`) - known / outside the task.

## Unread material

- Decisions: not read whole, per the handoff. I read the word diff of every decision the change touched (49 K characters of diff) and, whole or in a range, D-70 and D-271 (binding sentence, *Verification*, *Rationale* head). The unchanged *Rationale* and *Rejected* paragraphs of the other decisions were not read.
- Invariants: read only the changed sentences and `sprite-credits` whole.
- The executors' reports (`executor-1..17-report.md`) and the plan were not read; I took the plan's *Foundation entries* `none` and the task's *Settlements to record* `none` from the handoff and the task. I read the task whole, the handoff, both review reports and the fix report whole.
- Environment-fact sources outside the repository (Node.js, nodemailer, the Pixel Crawler Terms document, Cloudflare, OWASP, compose-spec, express-session, npm, Playwright) were not fetched; I compared the facts' sentences with their quoted *Source* text and with the reviews' report that they fetched most of them. The Pixel Crawler point 5 quotation and the nodemailer passage are, as the review says, not checked against their pages by anyone but the executor.
- `guidelines/coding.md`, `src/browser/AGENTS.md`, the testing and styleguide templates: not read.
- Skill files read: `.the-way/elements/decisions/skill/SKILL.md` whole (for one Rationale sentence); `.the-way/elements/glossary/template.md` lines 1-100.

## Searches not found or unclear

- `button.ts:2-4` (named in the task for D-44): not found; the kinds are now in `src/browser/view/controls/react-button.tsx`.
- `src/browser/clock.ts` / `src/browser/sim/clock.ts` (task's `clock.ts:60`): not found at those paths; the clock is `src/browser/view/clock.ts`.
- `src/server/database.ts:162-163` (D-236 page count): the lines moved; the sentence stands at `database.ts:220-221`.
- Line numbers of `compose.yaml` and others named in the task are from `fc00c406`; I searched by content.
- `git grep` for "defeated attack" in `tests/` finds test titles (see observation 5); no positive control needed, the hits are the control.

## Reaches beyond this handoff

- Read `.the-way/gate/run_tests.py` (head) to compare D-83.
- Read `src/browser/view/clock.ts`, `controls/react-button.tsx`, `maps-screen.tsx`, `scene.tsx`, `run-screen.css`, `compose.yaml`, `deploy/loop2-deploy`, `src/server/{database,account-policy}.ts`, `src/browser/sim/data/{about,campfire}.ts` in ranges.
- Edited `README.md` and `tests/view/icons.test.mjs`, which the handoff does not name; both carry the sentence the environment fact moved.

## Working copies

- `.runs/return-step/` held two diff extracts (`fnd-small.diff`, `dec.diff`); removed (`rm -rf`) before returning. No worktree or clone was made. The two commands that the session hook for script rules refused once each ran unchanged on the repeat.

## Fix after the review

**Commit:** `4e82fc274ee3e95ac49bcca0b1eac59f5c7c0ed7` (one file, `foundations/decisions.md`). The Minor finding (line length) is not changed.

**Corrected:** D-271 *Rationale*, "The pack's terms ask for no credit and allow its arts to be altered" -> "...ask for no credit of a game with no saxophone solo and allow its arts to be altered". Binds nothing new. My first search had missed this sentence because its words ran over a line break.

**Searches run** (`git grep -n -i -F` over every tracked file outside `.runs`, then a Grep with `multiline`, over the worktree outside `.runs`, `.the-way`, `node_modules`):
- phrases: "no credit", "ask for a credit", "asks for a credit", "does not require a mention", "do not require a mention", "asks for no credit", "ask for no credit", "pixel crawler", "pack's terms", "terms of the pack", "not necessary to credit", "need(s) no credit", "require(s) no credit", "no mention";
- a multiline pattern for terms/licence near credit/mention/attribution and the Polish "bez / brak / nie wymaga" near "zasług / uznania / wzmianki / autora".
- Result: the only sentence restating the Pixel Crawler terms without the exception was the one fixed above. Every other hit is the fact itself (`environment_facts.md:656-658`, which carries the exception), the README sentence and the test comment already corrected in `949f14db`, or a generic use that does not state those terms: "whose licence asks for a credit" in D-271, `sprite-credits`, the test titles and the scene-art skill pair; `credits.ts:48` ("the packs ... that ask for a credit" names the dust and wolf packs); D-271 `:4921` ("known terms"); `part_map.md:215`; the styleguide and `tokens.css` mentions of Pixel Crawler as a source of pixels.

**Checks:**
- `python -B .the-way/elements/common/foundation_check.py` - exit 0, `0 errors` (3 `listed:` lines as before).
- `npm test -- tests/view/icons.test.mjs` - not rerun, no test file touched in this fix (36 pass after `949f14db`).

**Working copies:** none made in this fix; `.runs/return-step/` was removed earlier.

## Repeat for correction 1

**Commits:** none. Nothing that correction 1 touched, or that names what it touched, no longer matches. Head `bc058447`; the tree is clean.

**Compared** (diff `4e82fc27..bc058447`, word diff; the remarks file read whole):
- Glossary `reading`, *Not*: now "a command's output that an environment fact's Source quotes - the third form of `Source` in `.the-way/elements/environment-facts/template.md`". The pinned template's "A source takes one of three forms" has as its third a reading (`environment-facts/template.md:104-122`), the form that quotes a command's output. The *Not* line holds no form of the term `reading`, and the pinned the-way glossary holds no entry `reading`, so there is no second meaning to qualify. The definition is unchanged and still matches `src/browser/view/clock.ts:62-90`.
- D-03 *Relations* now `derives from D-04`; D-265 *Relations* now `derives from D-44 · narrows D-03`. Both forms are in the template's closed list (`decisions/template.md:211-216`), and the relation stands in the entry that depends on the other. D-03's binding sentence still carries the exception "except a screen D-265 leaves in the browser's DOM APIs". The foundation check reports no error on either entry.
- Search of the foundation for entries that name them: `git grep -E "narrowed by|narrows D-|derives from D-03"` finds no other use of "narrowed by"; the one other entry that derives from D-03 (`decisions.md:557`) is unaffected; the nine tests with `decision: D-265` (`tests/view/shared-controls.test.mjs` and others) quote D-265's first sentence, which did not change; no invariant, glossary, part-map or guideline entry names the old relation line of D-03 or D-265 (the guidelines cite D-265 only for its rule).
- Skill copies: `loop2-scene-art/SKILL.md:9` says "the picture band" in both copies and `diff` shows the two copies equal; `loop2-deploy/references/setup_and_secrets.md:425` says "the container's memory limit" in both copies, equal; `git grep` for "the deployment's limit/memory limit" and "camp at the top" finds none left outside `.runs`.
- Test row label `tests/password-measurement.test.mjs:382-384`: "the container's memory limit instead of 80% of it"; the constant `deploymentLimit` is kept (`:21`, a `compose.yaml` `mem_limit` of 512 MiB, which is the limit the label names); `src/browser/sim/game.ts:369-371`: "the streak and count of beaten attacks of a map run not ended" matches the invariant `trip-plan-progress` ("count of beaten attacks") and the glossary `beaten attack`.

**What no longer matched:** nothing. Left as the orchestrator decided: D-265 gets no binding sentence for the area where it prevails over D-03, although `decisions/template.md:217-219` says the decision that `narrows` states its area in its binding sentences. D-265's sentence "A new screen is never written after the pattern of a module that builds its DOM elements through the DOM APIs" does not name that area; this is the point the request names for the human.

**Checks:**
- `python -B .the-way/elements/common/foundation_check.py` - exit 0, `0 errors` (3 `listed:` lines as before).
- `python -B .the-way/instruction-files/check_instructions.py` - exit 0, 0 errors, 144 warnings.
- `npm test -- tests/password-measurement.test.mjs` - exit 0, 12 pass.
- `npx prettier --check tests/password-measurement.test.mjs src/browser/sim/game.ts` - exit 0.
- Not run: the full gate; `tests/invariants` Python tests (comment and wording only).

**Unread material:** `correction-1-report.md` and `review-correction-1-report.md` were not read (the remarks and the diff were enough); decisions D-03 and D-265 were read at their relation lines and D-265 whole, D-03 only at its binding sentence and *Relations*; the pinned the-way `foundations/glossary.md` was searched by `grep`, not read.

**Searches not found or unclear:** `grep -i reading .the-way/foundations/glossary.md` finds nothing (a negative with no positive control; the file exists and lists its own entries, so the term `reading` is taken as absent there); no other entry names the old D-03/D-265 relation line.

**Working copies:** none made.
