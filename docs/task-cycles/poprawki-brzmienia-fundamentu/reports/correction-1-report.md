# Correction 1 report - `poprawki-brzmienia-fundamentu`

**Status:** `questions` (point a, second half, is returned and changed nothing; points a first half, b, e, f are made)

**Commit:** `7edef2d00135e09b6490ed992a94254a64b715f1` (one commit, on top of `01ee74c8`). Files: `foundations/glossary.md`, the two copies of `loop2-scene-art/SKILL.md`, the two copies of `loop2-deploy/references/setup_and_secrets.md`, `tests/password-measurement.test.mjs`, `src/browser/sim/game.ts`.

## Points

### a, first point - made
The *Not* line of `reading` in `foundations/glossary.md` is now `a command's output that an environment fact's Source quotes — the third form of `Source` in `.the-way/elements/environment-facts/template.md``: it holds neither the term nor its forms and keeps its meaning (the third alternative of the template's *Source* line, at `.the-way/elements/environment-facts/template.md:35`, is the one that begins with the label). The definition is unchanged. The glossary skill's `write.md` and the template's "Form of an entry" were read. Choice: a path in backticks as the carrier (an identifier in backticks); rejected: another quoted word (would be a label the term's meaning still shows), cost if wrong: the carrier is a path into the-way's submodule, which moves if the-way's template is reworked.

### a, second point - returned (questions), nothing changed
D-03's relation line `derives from D-04 · narrowed by D-265` and D-265's `derives from D-44 · derives from D-03` stand as they are. Reason: the decisions template ("Relations and precedence") asks that the entry that narrows state in its binding sentences the area where it prevails. D-265's binding sentences are:

> "Each shared control in `src/browser/view/controls/` has one form, a React component, and `src/browser/styles.css` stays the one place of the look of the controls. A new screen is never written after the pattern of a module that builds its DOM elements through the DOM APIs, though it may import that module's pure functions."
> "The panel that stands in place of a card React took down is built outside React (D-323), and it takes the tag, the classes and the role of its warning sentence from one constant that the React component of that sentence reads too."

and D-03's exception sentence says "except a screen D-265 leaves in the browser's DOM APIs until a task moves it". D-265 gives the area of the panel outside React, but it does not say that a screen already built through the DOM APIs stays so until a task moves it, which is the area D-03 hands to it. So the area D-03 names is not stated by D-265, and writing it would bind something new in D-265. Question and recommended answer:
1. Which way? (a) Add to D-265's binding sentences one sentence for that area (for example, that a screen already built through the DOM APIs stays so until a task moves it) and then change `derives from D-03` to `narrows D-03` and drop `narrowed by D-265` from D-03 - recommended if the human wants D-265 to narrow D-03, since the template then holds, but the new sentence is a new binding and needs the human's wording. (b) Drop `narrowed by D-265` from D-03 only and keep `derives from D-03` in D-265 (the earlier reviewer's option for Minor 4): no new binding, but D-265 is then said to derive from a decision whose exception it limits. Not both silently.
D-03 and D-265 do not narrow each other (D-265 has no `narrows`); that check holds.

### b - made
`.claude/skills/loop2-scene-art/SKILL.md:9` and `.agents/skills/loop2-scene-art/SKILL.md:9`: "the camp at the top of Siedziba" is now "the picture band at the top of Siedziba". Nothing else changed in them; `cmp` of the two copies: equal. `python -B .the-way/instruction-files/check_instructions.py` before: exit 0, `0 error, 144 warn, 7 info`; after: exit 0, `0 error, 144 warn, 7 info`; the lines other than INFO are identical (`diff` empty), so no new warning or error.

### e - made, with one quoted wording that does not stand
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md:425` and `.agents/...:425`: "the deployment's memory limit" is now "the container's memory limit"; the two copies `cmp` equal; nothing else changed in them.
- `tests/password-measurement.test.mjs:382`: the handoff quotes "the deployment's memory limit", but the line is a row label of a table of cases, `"the deployment's limit instead of 80% of it"` (no "memory"). Reported as not as quoted; made the change the point asks: the label is now `"the container's memory limit instead of 80% of it"` (prettier wrapped the row over three lines). `git grep "instead of 80% of it"` finds no other file or `decision:` / `invariant:` line naming it. The test's local constant `deploymentLimit` (line 21 and uses) was left, as it is an identifier and not the point's text; it is not a `DEPLOYMENT_MEMORY_LIMIT` name. `npm test -- tests/password-measurement.test.mjs`: exit 0, 12 pass; `npx prettier --check` on the file: exit 0.

### f - made
`src/browser/sim/game.ts` (the comment over `setProgram`, line 369): "the streak and defeated-attack count of a map run" is now "the streak and count of beaten attacks of a map run". `git grep -i defeated-attack` finds no other use. `npx prettier --check src/browser/sim/game.ts`: exit 0. `npm run typecheck` (`node scripts/build.mjs --check`): exit 0. `npm test -- tests/sim/body.test.mjs` (a test that imports `setProgram`'s module): exit 0, 36 pass.

## Checks
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors` (listed lines unchanged: three, not from this correction).
- `python -B .the-way/instruction-files/check_instructions.py`: before and after, see b.
- Prettier on the two test/code files: exit 0 each. Type check: exit 0.
- Not run: the full gate; `ruff` (no Python changed).

## Own-work check
Requirement most likely missed: that the *Not* line of `reading` holds no form of the term and no carrier the template forbids. Check: the new line read against the template's "Form of an entry" ("never one holding the term or its forms"); `foundation_check.py` exit 0 with the new line. A script cannot decide the template's wording, so this is a reading, not a pass of a tool.

## Reaches beyond the handoff
- `foundations/decisions.md`: D-03 (lines 44-52, whole entry body read) and D-265 (lines 4171-4220, whole entry) by range; `.the-way/elements/decisions/template.md` "Relations and precedence" (lines 209-225); `.the-way/elements/decisions/skill/{SKILL,read,decide_entry}.md` read; `.the-way/elements/glossary/skill/{SKILL,write,read}.md` and the glossary template's "Form of an entry" read; `.the-way/elements/environment-facts/template.md` grep of "reading" (for the carrier).
- `git show 578d13d2 -- foundations/decisions.md` (to see D-03's old and new wording).

## Unread material
- `.the-way/elements/decisions/skill/write.md` does not exist (the `cat` printed only the files that exist: `read.md`, `decide_entry.md`); nothing written for point 2.
- The plan and the frozen task were not read beyond what the handoff quotes; the earlier review reports were not read.
- `tests/password-measurement.test.mjs` and `src/browser/sim/game.ts` read in ranges around the lines changed, not whole.

## Searches not found or unclear
- The wording quoted for point e's test title ("the deployment's memory limit") does not stand at `tests/password-measurement.test.mjs:382` (see e).
- The area where D-265 prevails over D-03, stated in D-265's binding sentences: not found (see the question above).

## Working copies
`.runs/correction-1/` held the before and after output of `check_instructions.py`; removed (`rm -rf .runs/correction-1`) before the commit. No worktree or clone.

## After the orchestrator's answer

The orchestrator answered the question of point a (second half): make the relation change as the remark gives it and add no binding sentence. Made, as a second commit.

**Commit:** see the line below this section's list, `git log -1` of the branch after `7edef2d0`: message "docs: :memo: let D-265 narrow D-03 in its relations in place of deriving from it, and drop the line narrowed by D-265 from the relations of D-03".

- `foundations/decisions.md`, D-03 *Relations*: `derives from D-04 · narrowed by D-265` is now `derives from D-04`.
- `foundations/decisions.md`, D-265 *Relations*: `derives from D-44 · derives from D-03` is now `derives from D-44 · narrows D-03`.
- Nothing else changed: D-03's exception sentence, D-265's binding sentences and every other field stand; no binding sentence was added. D-265 does not state the area where it prevails in the template's words (as the orchestrator records); D-03 and D-265 do not narrow each other (D-03 has no `narrows`).
- Written through the decisions skill's route as the first answer described (`SKILL.md`, `read.md`, `decide_entry.md` read; step 4.4 asks for the decisions that derive from or narrow an entry whose binding sentences change - none changed here, so nothing follows; no invariant's *Derives from* names a changed relation).
- Checks: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 0, `0 errors`. `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors` (the three listed lines unchanged). Not run: the full gate.
- Status after this section: `done` for the points of correction 1; the area of D-265 is for the request to name for the human.
