# Return step report — teksty-rozjechane-z-kodem

**Status:** done
**Head compared:** `f5c760119a593bb04a646ecb4088564f9a25a01e` (branch `task/teksty-rozjechane-z-kodem`), range `2fe922c..f5c7601`
**Commits of the return step:** none (nothing in the foundation, code, tests or guidelines no longer matched the code; the worktree is clean)

## Foundation compared with code

I compared (1) every foundation entry the change wrote or changed (`git diff 2fe922c..f5c7601 -- foundations`), (2) every entry of the task's *Decisions in play*, (3) the entries a search of the whole foundation finds for the touched names, and (4) the part map of the six touched parts. What no longer matched: **none**. Each comparison, with the code it was read against:

| Entry | Read against | Result |
|---|---|---|
| D-111 (binding sentence, *Rationale*, *Rejected*) | `src/server/configuration.ts:110-141` (`readSmtpPassword`: `length === 0 \|\| length > passwordFileLimit`, then `password === "" \|\| controlCharacter.test(password)`; `controlCharacter = /\p{Cc}/u`, line 47); `tests/startup.test.mjs` (BOM alone, BOM and newline, BOM and text accepted with mark dropped, 1024 bytes accepted, 1025 refused). I also ran the decoder and the regex on four made-up byte strings with `node -e`: BOM alone decodes to the empty string (refused); BOM and newline decodes to one control character (refused); BOM and `a` decodes to `a` (accepted); two BOMs decode to one U+FEFF, a format character and no control character (accepted). | Matches. The binding sentence ("decodes to a nonempty password with no control character, so an empty file, a file of only a byte-order mark and a trailing newline are refused") says what the code does. A file of two marks is accepted by the code and by the sentence's rule (it decodes to a nonempty password); the sentence names no such file. |
| D-252 (binding paragraph, *Verification*, *Rationale*, *Rejected*) and `guidelines/coding.md` rule "Recording a failure" | `src/server/account-database-check.ts:80-86` (`console.error` of one sentence with `error.message`, exit code), `:49-52` (success sentence); `src/server/measure-passwords.ts:343-345` (`finish` prints one JSON object `{ok, versions, errors}`), `:368-392`; `Dockerfile:30` (`RUN node dist/server/account-database-check.js`, so its sentence lands in the log of the image build); D-354 (read whole). | Matches: neither command writes a line with `failure`, `kind`, `code`, `place`; the JSON object of `measure-passwords` is its report, not a log-form line; the pointer to D-354 agrees with D-354's own scope (`account-block`, `account-backup`). |
| D-237 (*Verification*, *Rationale*) and fact `docker-build-cache-invalidation` | `Dockerfile:16` (`ARG LOOP2_COMMIT=unknown` before the `RUN` at line 30), `compose.yaml:10`, `deploy/loop2-deploy:319,367` (`LOOP2_COMMIT=$REQUESTED docker compose ... build`). | Matches: the argument precedes the release check, so each new commit reruns it. |
| D-56 (first character gets 1; "one more than the number the game state gave last") | `src/browser/sim/game.ts:342` (`nextCharacterId: 1`), `:407`, `:422` (`nextCharacterId + 1`). | Matches. |
| D-67 *complies* (tile missing two sticks, +1 at minute 60, +1 at minute 90) | `src/browser/sim/data/maps.ts:69,87` (`stick ... renewMinutes: 30`); renewal at whole multiples of the time to renew, counted from game minute 0 (D-67 binding sentence). | Matches. |
| D-101 and the two tests ("restore") | `grep -rniE "resurrect(s\|ed\|ing)?\b"` over `src tests foundations guidelines scripts deploy`: no use of the bare verb is left; "resurrection" remains where it means a character's resurrection (glossary `resurrection`). | Matches. |
| D-313 *Rationale* (an action or condition whose target the panel offers none for gives way to the next; the button disabled only where the rule cannot be built) | `src/browser/view/discovery-rule.ts:1-60` (doc comment and loop over `discovery.actions` with `withAction(...)`, `return null` where no group), `src/browser/view/discovery-band.tsx:25-31`. | Matches. |
| D-04, D-213, D-211, D-247, glossary `catch-up`, invariant `catch-up-minutes` | D-247 reads "the state kept in the page's memory (D-211)", it never says "saved" for that state; D-04, D-213 and the glossary entry say "the unsaved game state ... (D-211)". `catch-up-minutes` says nothing of the state. The cycle record's note that D-247 and `catch-up-minutes` call that state "saved" does not hold on the text. | No mismatch. |
| D-48 *Origin*, D-183 *Rejected* | `git show b0c4d44:docs/task-cycles/styleguide-loop2/spec.md` holds "Decision 1" (lines 266, 342, 351); `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` Q6 (line 58) and item 5 (line 24) give the variant D-183 now names. | Matches. |
| D-269 *Based on* `browser-bare-import-resolution`; D-45; `application-build-kitchen-sink`; styleguide rule "The kitchen-sink page" | `src/browser/kitchen-sink/kitchen-sink.ts:36` imports `ICON_SQUARE, iconPlaces, TILE_SIZE` from `../view/terrain-picture.js`; `terrain-picture.ts:1-6` imports only `.ts` modules of `sim/` (no `.tsx`, no bare specifier), so D-269 holds; the page draws tile samples with the roles and builds no game state (D-45); `tsconfig.kitchen-sink.json` includes only the page's own files and follows imports, as before. | Matches. The "Wyczerpane" note of the page (`kitchen-sink.ts:776`) now says what `run.ts` and `terrain-picture.ts:121` do (`dimmed: tile.stock[resource] === 0`). |
| D-01 / `account-server-runtime`, `node-24-support-schedule`, any "24.x" in the foundation | `package.json:7`, `package-lock.json:39` (`^24.15.0`); the lockfile's `node_modules/jsdom` and `node_modules/npm` entries declare `^22.22.2 \|\| ^24.15.0 \|\| >=26.0.0` (lines 4346, 4846). `grep` of the foundation for `24.x`, `engines`, `24.15`: only `node-24-support-schedule` ("24.x end of life", a schedule row, still true). The invariant admits the range because it reads major 24. | Matches. |
| Deploy skill reads (D-12, facts `loop2-host-forced-command-entry`, `loop2-host-installed-command`, `setup_and_secrets.md`, `troubleshooting.md`) | `.claude/skills/loop2-deploy/SKILL.md:60-67` (the two added read-only commands with their expected values `755 root:root` and `1`); the prefix is the one the fact `loop2-host-forced-command-entry` observes (quote, then a space); `.agents` copy byte-identical (test `test_loop2_deploy_skill.py`, per slice 7). The skill still forbids reading the SMTP-password file; `troubleshooting.md:24` says "non-empty", which the refusal makes truer. | Matches; D-12 (agent reads only) is kept. |
| README, `src/browser/AGENTS.md`, guidelines | Read in the diff against the code the slices cite (footer, screen Przejście, build list; `kitchen-sink.css` exists and `styles.css` is copied to `dist/public`). `foundation_check.py` passes the guidelines. | Matches. |
| Part map: `browser-view`, `account-server`, `build-tools`, `agent-workflow`, `product-foundation`, `deployment` | Every changed file is claimed by the part the plan named (`src/browser/view/**` and `src/browser/kitchen-sink/**` by `browser-view`, so the page's new import crosses no part; `src/server/**` and `tests/startup.test.mjs` by `account-server`; `/package.json`, `/package-lock.json`, `README.md` by `build-tools`; `.claude/**`, `.agents/**`, `guidelines/**`, `src/browser/AGENTS.md` by `agent-workflow`; `foundations/**` by `product-foundation`; `tests/invariants/test_loop2_container_sprites.py` by `deployment`). The part descriptions (the kitchen-sink page "shows the shared controls, roles and tiles in every state"; account-server "sends account email through the mail service") stay true. | No change. |

## Decisions written or changed (by me)

None. (Written or changed earlier in the cycle, not by this step: D-01, D-02, D-04, D-05, D-48, D-54, D-56, D-67, D-101, D-111, D-147, D-156, D-183, D-185, D-207, D-213, D-237, D-252, D-269, D-312, D-313.)

## Invariants written or changed

None. `account-startup-configuration` ("every startup with partial or invalid explicit account settings exits nonzero before listening", derives from D-111) already covers the empty-after-decoding refusal: D-111 defines what is invalid, and the case of `tests/startup.test.mjs` that carries the invariant now includes the BOM-only and BOM-and-newline files. No task row, decision or human sets a further rule (WAY: an invariant is written only for a rule the task, a decision or the human sets).

## Environment facts

None written by me. (Earlier in the cycle: `browser-bare-import-resolution` new; `docker-build-cache-invalidation` extended.) The Node floor needs no fact: it rests on the engines of `npm` 12.2.1 and `jsdom` 30.1.3 as the product's own `package-lock.json` records them (lines 4346 and 4846), a product file, not a source outside the product. The four host facts of item 22 are untouched.

## Glossary terms

None. "unsaved game state" is D-211's name; D-04, D-213 and the `catch-up` entry now use it with `(D-211)` beside it or in the sentence, and a reader who takes the field's meaning (a state not yet saved) reads those sentences rightly (WAY-95 gives it no entry). No term is used against its entry.

## Part-map changes

None.

## Projected entries written

None (the task is independent; no project definition projects entries).

## Rows of *Settlements to record* written

None by me; both rows are written and tied: row 1 is in D-252 (edited in place, as the foundation step recorded, with the pointer to D-354); row 2 is in D-111. The code makes row 2 true (`configuration.ts:133`) and leaves row 1's code unchanged, as the row says.

## Choices of the cycle, weighed for an entry that binds after the merge

| Choice | Binds after the merge and not in an entry yet? | What I did |
|---|---|---|
| The refusal of the mail password file refuses only a password that decodes to empty (a mark followed by characters accepted with the mark dropped; a file of two marks accepted) | No. D-111's binding sentence already carries the rule ("decodes to a nonempty password with no control character"), its *Rationale* says the decoding drops a mark, and its *Rejected* holds the refused alternative; the accepted cases follow from the sentence and are held by the test. | Row of the plan's *Choices* table stays; no entry, no invariant. |
| The page shares the game's placement of tile icons by an export from `terrain-picture.ts` (no new module, no game state by hand) | No. "No game state by hand" is D-45 and the styleguide's *Bad* example already; the export is a surface of one module that moving to a module of its own later changes mechanically (the plan's cost-if-wrong). Item 4 of the task states the requirement (samples change with the game); the way is a choice of code. | Row of the table stays. |
| Item 22 stays open (the version of the tool a reading names is printed by no read the deploy skill allows; the cycle did not widen the list) | No. It is the state of this cycle's work, ending when the request is merged or Mariusz decides; a rule that ends with a piece of work stays in the choices of the cycle record (WAY-36). The four facts keep a valid form. | Rows Q-P1 and Q-P8 stay; the request carries it. |
| Foundation entries edited in place (D-252 instead of a new entry beside D-354) | No. It is how the entry was written (a row tied to the entry that already states it), not a rule for the product. | Nothing to record. |
| The Node floor `^24.15.0` as a requirement in README, `package.json`, lockfile root (question 1, answer B) | No. It follows the pins of the tools; it changes when a tool's declared floor changes, and `account-server-runtime` already guards the declaration of major 24. The task also lists 7 candidates for settlements and accepts 2 (rows 1 and 2), so entries for questions 1, 2, 4, 5 and 6 were not accepted; that count matches the 7 questions but the task does not say which candidates they were, so I did not rest on it. | Row stays; no entry. |

## Own-work check

- **Requirement most likely not met:** a foundation entry the change wrote says something the head's code contradicts (the sentence was written from the task or from a record, not from the code). The likeliest places: D-252's claim about what the two commands print, D-111's list of refused files, D-237's mechanism (`LOOP2_COMMIT`), D-56's first number, D-313's reason.
- **Check:** I read each against the code named in the table above and ran the decoder and the control-character regex of `configuration.ts` on four byte strings with `node -e`.
- **Showed:** every claim stands; the four byte strings give refused-empty, refused-control, accepted and accepted, as D-111 says. No correction made.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git status --short` (at start and at end) | 0 | empty |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `node -e` (decoder and `\p{Cc}` regex on BOM alone, BOM and newline, BOM and `a`, two BOMs) | 0 | refused-empty, refused-control, accepted, accepted |
| `grep -rniE "resurrect(s\|ed\|ing)?\b"` over `src tests foundations guidelines scripts deploy` | 1 (no match) | no use of the bare verb |

Not run: `npm test` and any other test (the handoff forbids it; the cycle runs the gate). No web page was fetched: the quoted passages of D-01, D-02, D-05, the Docker fact and the bare-import fact are source fidelity, not agreement with code, and the whole-change review and its fix review fetched them.

## Concerns and observations (not corrected; none is a mismatch with the code)

1. D-01 *Based on* still labels the State of JS figures "Node.js 10,062 of 11,141 respondents to the runtime question" in the words before the address, while the passage the entry now quotes labels neither number as such (finding N1 of `whole-fix-review.md`, inside item 21). A reader who compares the page with the entry meets the same unlabelled figure. I did not change it: it is a source-fidelity matter the return step does not compare, and I would have had to fetch the page to word it.
2. The trust-boundary row of `guidelines/testing.md` for `src/server/` lists no test for the startup refusal of a crafted password file. It is an omission from before the change (outside the task, found by the slice 4 and whole reviews), not a text the change made false. Left for the request's list.
3. A file of exactly two byte-order marks is still accepted at startup. D-111's sentence and the code agree on it (the second mark is a format character, not a control character); the entry names no such file. Recorded here only because the handoff asked to weigh it.

## Unread material

- The quoted web passages of the entries listed above (not compared; see Checks).
- `foundations/decisions.md`: I read whole D-12, D-45, D-111 (binding sentence and fields), D-237 (edited lines), D-247, D-252, D-269, D-313, D-354; the others of the foundation diff (D-01, D-02, D-04, D-05, D-48, D-54, D-56, D-67, D-101, D-147, D-156, D-183, D-185, D-207, D-213, D-312) I read as the diff hunks with their surrounding fields, not whole. WAY-36 and WAY-95 of the-way read whole.
- `README.md`: the changed hunks, not the whole file. `guidelines/*.md`: the changed hunks, `testing.md` "Trust boundaries" and `coding.md` "Recording a failure" read around their lines.
- `docs/task-cycles/teksty-rozjechane-z-kodem/reports/*`: `slice-1-report.md`, `whole-fix-review.md`, `whole-findings.md` (head), `plan.md`, `cycle.md` and `task.md` read; the other reports not opened.

## Searches not found or unclear

- None unclear. Not found, as expected: any use of the bare verb "resurrect" for a session or counter; any "24.x" requirement outside `node-24-support-schedule`; any foundation or guideline text that names `iconPlaces`, `TILE_SIZE`, `ICON_SQUARE` or `readSmtpPassword` (only the code and the plan name them).
- The task does not say which seven candidates its "Candidates: 7 shown, 2 accepted" counts, so I could not tell whether an exclusion rule applies to any of the choices above.
