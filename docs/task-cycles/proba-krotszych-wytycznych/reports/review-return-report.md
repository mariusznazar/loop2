PASS e1ab9c982ff9357614ac175dc75c03632410d43f

# Review of the return step's commit (variant: a later change to the change, range of the return step only)

Range: `406f0af565eb760f084273b4dfa1ddc438d7ccd9..e1ab9c982ff9357614ac175dc75c03632410d43f` (both resolved with `git rev-parse`; `git rev-parse HEAD` in `the worktree of the task` is the head). One commit, one file, `guidelines\coding.md`, +2 lines, 0 removed (`git diff --stat`, `git diff ... | grep -c '^-[^-]'` gave 0). Compared with the return step's report `reports\author-1-return-report.md`, the frozen task `task.md` (item 5, questions 1-3), D-28 to D-33, D-252 and D-253 (each whole), `return_step.md` and the earlier reports `review-whole-report.md` and `review-fix-report.md`.

Result: 0 Critical, 0 Important (no blocking finding), 2 Minor within the task, 1 Minor out of scope. The correction is right and fits the task; the single reading the dispatch asked me to judge (D-28's "retain the stated deferrals") I read as the return step does, with a reservation stated below.

## Judgement on the questions of the dispatch

### 1. Is the sentence one the main change may remove? Was the restoration needed? Is a smaller or different one enough?

The restored text is the sentence S102 at `coding.md:288-289`: "Zasady testowania, wzorce według poziomów i przykład jawnego czasu określa `guidelines/testing.md`." It is word for word the base sentence (a whitespace-joined substring test over `git show df0f125:guidelines/coding.md` and the head file gives one occurrence in each). In the merged classification it is `RD`, both classifiers agree, main column `remove` (`classification-merged.md:78`). So the main change *may* remove it: it repeats D-28's last sentence ("testing rules and exemplars by level stand in `guidelines/testing.md`, together with the explicit-time example from `tests/sim/time.test.mjs`"). A repeat of a decision may leave a file; it need not.

Was the restoration needed? The decision's Verification (`foundations/decisions.md:700`) says the guidelines "direct test authors to the testing guidelines". Without S102, the guidelines pointed there from exactly one place: `guidelines/coding-mail-sending.md:132` ("Zasady testów stoją w `guidelines/testing.md`"; I read it), a kind file that an author reads only before changing a mail-sending file. The pointer for everyone else is `AGENTS.md:9`, which is outside `guidelines/`. The general file `coding.md` says in `## When to read` (line 8) that it is read before any change of code "także skryptów i testów", so its reader writing a test met no pointer to the testing guidelines. Whether the clause demands the pointer in the general file is open (the clause says "general and four kind guidelines ... direct test authors" and can be read of the set), so I would not call the restoration required by the letter; it is the reading that cannot be faulted, and it costs two lines. It is the same kind of choice the cycle made for S003 and S051 (a sentence the table removes, kept where a decision's verification or a reader's trail needs it). Right.

A smaller or different one: a one-line pointer ("Zasady testowania stoją w `guidelines/testing.md`.") would save one line but is new text, not a unit of the classification; the word-for-word restoration is the safer one against the task. A different *place* would serve better: see finding 1.

### 2. Does the commit go against the task?

No. Task item 5 limits what the main change may *remove or change*: only own sentences of three groups (derivable case, state list, repeat of a decision or configuration); own sentences describing a known practice and sentences copied from the template stay unchanged. The commit adds back a sentence classified as a repeat of a decision, so the main change is shorter than the base by less (304 lines, base 361; `wc -l` gives 304 and 361). It changes no template sentence (the diff has no removed line) and alters no kept sentence. It is a deviation from the classification table in the direction of a smaller shortening, as S003, S037/S038 and S051 already were; task item 5 lets Mariusz merge "only what does not change the meaning", so a smaller change is inside it. The deviation is disclosed (`cycle.md:73`, the return report). The request's table should list S102 beside S003, S037/S038 and S051 as "kept against the table" (the earlier reviews' finding 8 says the request must be honest about what is measured and what was reasoned).

### 3. Did the return step miss a mismatch between a decision, an invariant or the part map and the file?

I read D-28 to D-33, D-252 and D-253 whole and compared them with the head file. What I checked and found matching:

- D-29: the Linter text names the sets' review duty (`coding.md:37-38`), the human-accepted change (`:44-46`) and the pins by `## Where in code`; the five-line example blocks and the `good`/`bad` fences are unchanged.
- D-30: fourteen example headings stand at `coding.md:224-284` (counted: PLW1510, I001, ISC004, UP031, RUF059, PIE808, RUF007, RUF012, PLR0402, FURB167, RUF100, SIM117, FURB192, SIM102 = 14, as D-30 says).
- D-31: the named-list and directive sentence stands (`:40-42`), which is what its Verification checks.
- D-32: "Nie dodawaj opcji do `prettier.config.mjs`." stands (`:91`), the Verification's one author action.
- D-33: the new sentence (`:108-110`) says what the decision says (compare with `{fork-point}`, fail from low, pass without network when equal), copies no value.
- D-252: the six rules on failures and logs all stand, every rule names D-252 and, for the first, D-253; the scope list (`:199-220`) is intact.
- D-253: the author-facing sentences stand (`:127-134`); the browser's handler and the four named scripts are in the decision and the browser's in `guidelines/coding-browser-module.md:323` (`installLastResort`, grep).
- Invariants: the only mentions of guidelines in `foundations/invariants.md` are the withdrawn `guidelines-form` and `guidelines-reference-current` (lines 1243-1244). Glossary and environment facts: no mention of `coding.md` or "guideline". Part map: `guidelines/**` is in the files of `agent-workflow` (`foundations/part_map.md:130`), and the commit adds no file.
- Cross-references to the file: `AGENTS.md:7`, `guidelines/testing.md:9` and `:400`, by path only (grep over the repository outside `node_modules`, `.runs`, `.git`, `.the-way`); all valid.

What the return step did not catch, or reported inexactly: (a) the report says the table of kinds lists "ten kinds"; it lists eleven (finding 2); (b) the rule `### Dependency audit` names one invariant while D-33's Verification names two (finding 3, out of scope, existing in the base file). I found no mismatch that makes the file say what a decision forbids or fail to say what it requires.

### 4. The reading of "retain the stated deferrals"

The return step reads it as the deferrals D-28's own text states (formatting of Python and Bash; exemplars for building, deployment, entry points, HTML and CSS), retained by adding none, so S104 and S105 may stay removed. I read it the same way, for these reasons: the decision's body states the deferrals and the Verification's "violates" clause ("a stylesheet exemplar ... automatic Python formatting ... introduced without a new decision") is the test that a change keeps them, which a reviewer applies by comparing with the decision (S003 at `coding.md:10` still sends the reviewer to D-28); the verb differs from the next clause, which is active ("direct test authors to ..."), and the deferrals leave a trace in the file's form (the table has no row for a CSS kind; the Formatter rule speaks of Prettier only); and the pinned coding template says nothing about stating deferrals in the general file (read whole, `coding/template.md`). The other reading, "stated in the guidelines", is not excluded by the words: "retain" suggests that the guidelines already held them, and the base file did (S104, S105). Cost of that reading is small (two lines restored, S104 and S105, which the classifiers both marked `RD/own/h`). I recommend keeping the return step's choice and leaving the question visible for Mariusz, which the report and `cycle.md:73` do. This asymmetry (strict for the pointer, lax for the deferrals) is the one weak spot of the argument, and it is defensible only through the difference of the verbs.

### 5. Is anything in the return step's report unsupported by the files?

Checked claim by claim. Supported: the commit, its range and size; the text of D-28's clause; S102's wording and its removal at `406f0af`; `coding-mail-sending.md:132` and `AGENTS.md:9`; the 304 and 361 lines; the readings of D-29 to D-33, D-252, D-253 listed in its table; the decision at `foundations/decisions.md:7113` with the phrase "degraded mode, which the coding guidelines allow only where a task sets it as a decision" and S056 kept (`coding.md:144-146`); the invariants, glossary, facts and part map; `guidelines/testing.md:9` and `:400`; `tests/http.test.mjs:4174`; WAY-30 and WAY-172 as the reason not to edit the decision (WAY-30 lists "brings the change into line" as a way, which is what it did); the `foundation_check.py` exit 0 (I reproduced it); "Not run: any `npm test`" (no test reads the file, grep).
Unsupported: "the table lists ten kinds" (finding 2).

## Findings

### Blocking (Critical, Important)

none

### Minor (within the task)

1. **`coding.md:286-291`, place of the restored sentence.** The sentence stands under `### Odłożone rodzaje i formatowanie` in `## Examples`. After the earlier removals that heading, which says "deferred kinds and formatting", holds no deferral: now two pointers (to `guidelines/testing.md` and to the `saved-game`/`mail-sending` rows). This deepens the heading flaw that finding 7 of the whole-change review left as Minor. The coding template says `## Examples` carries "the rest of the exemplar" and the linter rules kept for their reports (`coding/template.md`, "What each section carries"), so a pointer is not what that section is for, and an agent writing a test looks first at `## When to read` (`coding.md:6-10`) or at the headings, neither of which leads to line 288 of 304. Effect on the user: the pointer exists and satisfies the letter of D-28, but is the hardest place in the file to find; the cost is a missed pointer, which `AGENTS.md:9` still covers, so Minor. Evidence: reading of the head file; the heading list. Remedy the cycle may choose: place the same sentence in `## When to read`, or rename the heading; either is a change to a text the classification keeps, and neither is needed to merge.

2. **Return report, section "What I compared", row D-28: "the table lists ten kinds".** The table `## Kinds of code` has eleven rows (`coding.md:16-26`; `grep -c '^| [a-z-]* | `guidelines/coding-'` gives 11). The report's point (the clause "general and four kind guidelines" is old and was not made false by this change) holds; its count does not. No effect on the file. Evidence: the grep.

### Out of scope (finding goes beyond the task; Minor)

3. **`coding.md:101-110`, the Invariant field of `### Dependency audit`, found in a different file part than the task changes.** D-33's Verification names two invariants, `introduced-npm-vulnerabilities` and `dependency-audit-refusal` (`foundations/decisions.md:772`; the second at `foundations/invariants.md:549`, derived from D-33, not violated); the rule names only the first (`coding.md:104`, as in the base file). The coding template says the rule of a standing check names "the invariants of that check" and its example of an invariant is the first only, so the field may be right as it stands or incomplete; I cannot settle it from the template. It is not caused by this change or by the return step (the field is unchanged since the base), and changing a field is not shortening a text, so it is outside the task. Raised because the task names D-33 and the return step's table of compared entries calls D-33 "matches" without mentioning the second invariant. Cost of leaving: a reviewer comparing a change with the rule does not see the refusal test named there.

## Declined to judge

- Whether D-28's Verification should be reworded to say "general and eleven kind guidelines" or to say where the deferrals are stated: a change to an approved decision (WAY-30), for the human who accepts decisions.
- The sentences removed or reworded in `aa03c01` and `406f0af`: reviewed in `review-whole-report.md` and `review-fix-report.md`, outside this range.
- The kept sentence on `deploy/loop2-deploy` (`coding.md:132-134`, "nie zostawia wiersza końcowego, gdy zostanie zabity"): no decision of the log states it (grep for `loop2-deploy` in `foundations/decisions.md` finds only the deployment decisions at lines 223, 259, 334, 2637 and 4454); `deploy/loop2-deploy` has no `trap` or signal handling (`grep -n`), which agrees with the sentence. It is a kept sentence outside this range and outside the table's `remove` set.
- The trial file and the measurement (findings 8-10 of the whole-change review): the request's business.
- The full `npm test`: the cycle's own run (`reports\change-npm-test.log`), not repeated.

## Checks run

| Check | Command or method | Result |
|---|---|---|
| Range resolved | `git rev-parse 406f0af e1ab9c9` | `406f0af565eb760f084273b4dfa1ddc438d7ccd9`, `e1ab9c982ff9357614ac175dc75c03632410d43f`, exit 0 |
| Head confirmed, tree clean | `git rev-parse HEAD`; `git status --short` (worktree) | `e1ab9c9...`, no output, exit 0 |
| Diff read whole | `git diff 406f0af..e1ab9c9`; `git diff ... --stat`; count of removed lines | +2 lines in `guidelines/coding.md`; 0 removed |
| Whitespace | `git diff --check 406f0af..e1ab9c9` | exit 0 |
| Foundation and guidelines check | `python -B .the-way/elements/common/foundation_check.py` | "0 errors", exit 0 |
| Instruction-file check | `python -B .the-way/instruction-files/check_instructions.py .` | exit 0; the only line on the file is `INFO size guidelines/coding.md:0 304 lines, 1451 words` |
| Restored sentence against the base | short Python script (`python -`) joined whitespace of `git show df0f125:guidelines/coding.md` and of the head file and counted the S102 sentence | 1 occurrence in each |
| Line counts | `wc -l guidelines/coding.md`; `git show df0f125:guidelines/coding.md \| wc -l` | 304; 361 |
| Count of kinds | `grep -c '^| [a-z-]* | `guidelines/coding-' guidelines/coding.md` | 11 |
| Pointers named by the report | `sed` of `guidelines/coding-mail-sending.md:128-136`, `AGENTS.md:1-14`, `tests/http.test.mjs:4170-4178`, `foundations/decisions.md:7108-7118`; `grep -n coding.md guidelines/testing.md` | as the report says (`:132`, `AGENTS.md:9`, `:4174`, `:7113`, `testing.md:9` and `:400`) |
| References to the file | `grep -rIn 'coding\.md'` outside `node_modules`, `.runs`, `.git`, `.the-way` | only `AGENTS.md:7`, `guidelines/testing.md:9` and `:400` |
| Invariants, glossary, facts, part map | `grep -n -i guideline` in `foundations/invariants.md`, `glossary.md`, `environment_facts.md`; `grep -n 'guidelines/\*\*' foundations/part_map.md` | invariants lines 1243-1244 (withdrawn); none in the others; part map line 130 |
| Names the rules point to | `grep installLastResort guidelines/coding-browser-module.md src/server/*.ts`; `grep` of `writeFailure`, `writeEvent`, `ReasonedFailure` in `src/server/log-line.ts` | present (`coding-browser-module.md:323`; `log-line.ts:22,47,58`) |
| D-33's invariants | `grep -n` and `sed` in `foundations/invariants.md` | both exist, not violated (finding 3) |

Not run: the full `npm test` (the cycle's own run; no test reads `guidelines/coding.md`), a focused test (none applies).

## Reaches beyond the dispatch

- `.the-way\product-guidelines\template.md` and `...\coding\template.md`, both whole: to judge the place of the restored sentence and the form of the Examples section.
- `.the-way\foundations\decisions.md` WAY-11, WAY-30 (read), WAY-172 and WAY-263 (existence and grading rule, WAY-263 read through `review/SKILL.md`): to judge the return step's argument against editing the decision.
- `guidelines/coding-mail-sending.md:128-136`, `guidelines/coding-browser-module.md:323`, `AGENTS.md:1-14`, `guidelines/testing.md:9` and `:400`, `tests/http.test.mjs:4170-4178`: the claims of the report.
- `foundations/invariants.md:449-460, 549-558` and `deploy/loop2-deploy` (grep for `trap`, `kill`): findings 3 and the declined line.
- `reports\classification-merged.md`, `reports\author-1-report.md`, `reports\findings-minor-1.md`, `cycle.md`: the table's treatment of S102, the earlier acceptance of its removal, the disclosure.

## Searches not found or unclear

- Whether D-28's "retain the stated deferrals" means stated in the decision or in the guidelines: unclear in the decision and in the pinned template (searched both); I read it as the return step does (section 4).
- Whether D-28's "direct test authors to the testing guidelines" binds the general file or the set of guidelines: unclear (section 1); the restoration is safe under either reading.
- Whether the rule `### Dependency audit` should name `dependency-audit-refusal`: the coding template does not say (finding 3).
- I did not look for the original wording of D-28's verification at the time the guidelines were first written (history of `foundations/decisions.md`), which might settle both readings above; not needed for the verdict.
- Nothing else looked for was missing: every file, line and phrase the report names was found.
