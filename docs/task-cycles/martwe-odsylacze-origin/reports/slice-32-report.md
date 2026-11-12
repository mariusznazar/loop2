# Slice 32 report

**Status:** done (with one judgment call for the orchestrator, see D-382 below)

**Base:** HEAD at start was `b196f19e07b124c632ef3c900cafde35afb64c9f` (as in the handoff); worktree clean at start.

**Commit:** `58b63d98` on `task/martwe-odsylacze-origin` (one commit, `git add` by path). Files changed (added/removed lines):
`foundations/decisions.md` (+15/-0, the new D-382), `src/browser/view/program-panel.tsx`, `right-area.tsx`, `rule-list.tsx`, `rule-panel.tsx`, `run-header.tsx`, `run-screen.tsx`, `scene.tsx`, `team-lines.ts`, `terrain-drawing.tsx` (comments only; 88 lines changed in the nine view files).

No code changed: a comment-stripped comparison (esbuild `transformSync`, `legalComments: none`) of each of the nine view files against `HEAD` gives identical output for all nine (exit 0; script in the scratchpad, `cmpcode32.mjs`).

## Decision written

**D-382 — Which program does the program panel show when the one it showed is gone?** (last in `foundations/decisions.md`, after D-381; highest before was D-381). Scope browser-view, Based on none, Relations derives from D-166 · D-167 · D-173 · D-281, Origin `none`, Rejected `unknown`.

- Why: the first-of-the-list fallback (after „Usuń” of the program shown; at „Zakończ” when the copy's program was deleted; `#/programy/{n}` naming no program) lived only in "decision 7" of the spec of the cycle `programy-gracza` (git history, commit `b24d2fc8`, `docs/task-cycles/programy-gracza/spec.md`) and in the comments of `nextShown`, `savedShown` and `showProgram`. I searched the foundation (`first program of the list`, `first of the list`, `gives way`, `gone from the list`, `nearest screen`, `deleted program`): only D-170 (a different list, the character's pick) and D-281 (the address falls back to `#/programy`, not saying which program Programy then shows) touch it. No decision held it.
- Source and the gap in it: the passage of the note (`programy_gracza_loop2.md`, To do 10, Q9) holds only "After „Zakończ” the panel shows the program the copy was taken from" (held by D-173). The first-of-the-list rule is the spec's own reading (its "Which program the panel shows" list), and neither the note nor the spec gives a reason or a rejected way for it. So *Rationale* is derived from D-167 (the list never holds fewer than one program, so a first always exists) and D-170 (the same first place ends that decision's fallbacks); *Rejected* reads `unknown`, as the template allows. Nothing from the note beyond the behaviour was added.
- Recorded through `the-way-record-decision`: I read the project skill, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md`; step 1 (read: D-165 to D-174, D-93, D-281 whole, the glossary entry `copy`), step 2 (decide the entry and search the whole foundation), step 3 (draft), step 4 (the orchestrator's instruction takes the place of asking the human; write at the end of the log, `foundation_check.py` run: exit 0, "0 errors"). Step 4.4: nothing follows (no invariant named in *Verification*, no decision moved or narrowed; no sentence of D-166/D-167/D-173/D-281 answered the question).
- If the orchestrator prefers not to have this decision (the code comments say the rule themselves, and `tests/view/program-panel.test.mjs` and `tests/view/account-screen.test.mjs` carry it in titles), the commit can be amended; the comment of `nextShown` names D-382 and would then name D-166 and D-173 only. Tests that currently cite D-167 for "„Usuń” shows the first program" (`tests/view/program-panel.test.mjs:625`) would now be better served by D-382; those files are outside this slice.

## Per changed line: old pointer, outcome, entry

Outcomes: "named" = entry named, "written" = entry written, "removed" = pointer gone. Old line numbers are those at the base.

| File:line (old) | Old pointer | Outcome | Entry |
|---|---|---|---|
| program-panel.tsx:2-3 | `task edytor-programu, To do 1, 8 and 11; task ekran-przejscia, To do 7` | removed (the decisions it relies on were already named: D-166, D-174, D-288, D-302, D-180 for the plan, D-313) | D-36, D-166 to D-174, D-180, D-282, D-288, D-295, D-302, D-313 |
| program-panel.tsx:93 | `settlement row 6` (after D-295) | removed (D-295 stays) | D-295 |
| program-panel.tsx:179 | `spec decision 7` (name refusals) | named | D-169 (refusal with the message under the name field in `warning`; the two sentences themselves are literals of the code) |
| program-panel.tsx:201 | `spec decision 7` (`nextShown`) | named + written | D-166, D-173, D-382 (D-212 was already there) |
| program-panel.tsx:232 | `spec decision 6` (`shownContent`) | named | D-93 (counts of the copy; after „Zakończ” beside the copy's program; none beside other programs) |
| program-panel.tsx:254 | `spec decision 7` (`canSwitchTo`) | named | D-174 (button beside a saved program other than the copy's; its *violates* names the button after a death) |
| right-area.tsx:3-4 | `task kronika-z-filtrami, To do 6, 8 and 9; spec D5, D6, D7, D9; task proporcje-sceny-i-programu, To do 2` | named D-380 and D-381 beside the decisions already cited; the rest removed (spec D5, D9 are the filter row and list: D-343, D-46; D6 the paragraph: D-147; the tabs: D-311, D-276) | D-311, D-338, D-343, D-344, D-346, D-147, D-276, D-130, D-46, D-380, D-381 |
| right-area.tsx:13 | `spec D7` (window, rows not drawn again) | named | D-380 |
| right-area.tsx:16 | (none) D-346 for the pick that outlives the area | D-381 added (filter pick holds) | D-346, D-381 |
| right-area.tsx:55 | `spec D7` (`NEAR_END`) | named | D-380 (holds the window grown by a scroll near its end; the pixel value is the code's, as D-380 says) |
| right-area.tsx:101 | `spec D7` (window restarts) | named | D-380 |
| rule-list.tsx:2-3 | `task edytor-programu, To do 1, 2, 6 to 10` | removed (D-288, D-292, D-293, D-295, D-297 already named) | D-288, D-292, D-293, D-295, D-297 |
| rule-list.tsx:21 | `task stan-i-powod-przy-regule` | named | D-308, D-309, D-310 (background `rule-winning`/`rule-running`, the bar, the reason; D-308 to D-310 read whole) |
| rule-panel.tsx:3 | `task edytor-programu, To do 3 to 5 and 8` | removed (D-288, D-289, D-290, D-293, D-296, D-299, D-300, D-302, D-306 already named) | same list |
| rule-panel.tsx:98 | `as the task names the fields` | named | D-306 (the fields condition, number, target of the condition, action, target of the action, and their order; the label words „Warunek”, „Liczba”, „Cel warunku”, „Czynność”, „Cel czynności” are literals of the code and no decision holds them) |
| run-header.tsx:3-4 | `task ekran-przejscia, To do 1 and 8; task teraz-i-potem, To do 3; task koniec-przejscia, To do 2` | removed (D-311 holds the header's content and order; D-368 the „Koniec przejścia”; D-334 the clock without the action, already in the text) | D-311, D-130, D-132, D-62, D-188, D-122, D-44, D-46, D-133, D-368 |
| run-screen.tsx:3-4 | `task ekran-przejscia, To do 1 to 8; D-173, task pytanie-przy-zakoncz, To do 1; task proporcje-sceny-i-programu, To do 1 and 2; task koniec-przejscia, To do 1, 2, 8 and 9` | removed; D-173 kept as a plain citation | D-311, D-280, D-281, D-282, D-19, D-122, D-313, D-368, D-173 |
| scene.tsx:2-3 | `task scena-z-ludzikiem, To do 1 to 11` | removed (D-316 to D-322, D-272, D-43, D-04 already named) | D-316 to D-322, D-272, D-43, D-04 |
| scene.tsx:22 | `task zbieranie-jako-widowisko` (bending) | named | D-364 |
| scene.tsx:23-27 | (D-317 only, for the effects at the end of a gathering) | D-365, D-366, D-367 added (what flies, the dust, which readings show an effect); read whole | D-317, D-365, D-366, D-367 |
| team-lines.ts:16-17 | `To do 8, question 3` | named | D-287 (the sentence, word for word, and the inactive „Wejdź” and „Puść w pętlę”) |
| terrain-drawing.tsx:2 | `task ekran-przejscia, To do 5` | removed (D-19, D-70, D-41, D-125 and the invariant `terrain-drawing-numbers` already named; the line under the drawing is described in the comment itself) | D-19, D-70, D-41, D-125, `terrain-drawing-numbers` |

Reflows: where a removed pointer left a line short or long, the sentences of that comment were rewrapped to about 100 columns; the words are unchanged apart from the pointers.

## Checks (cwd = worktree root)

| Check | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the nine view files>` | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <the nine view files>` | exit 0 ("All matched files use Prettier code style!") |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0 ("0 errors"), run after D-382 and after the commit content was final |
| S1 `git grep` (as in the slice) | no line, exit 1 (before my change it printed nothing for these nine files either) |
| S2 `git grep` (as in the slice) | no line, exit 1 (before: 16 lines in nine files; each was a pointer, fixed above) |
| S3 `git grep` (the orchestrator's) | 5 hits left, all for the game's "trip plan" (see below); before my change it also printed 8 lines with `spec D5…D9`, `spec decision 6/7` (all fixed above) |
| Wider search (`Row N`, `Finding`, `binding answer`, `Task item`, `review`, `answer N`, `cause N`, `loop2#`, `executor`, `the definition`, `the concept`, `note`, `vault`, `task`, `the spec`, `orchestrator`, `reconnaissance`, `scouting`, `mockup`, `predecessor`, `old loop`, `loop`, case-insensitive) | no pointer. Hits are code (`runNoteText`, `COPY_NOTE`, `application/x-loop-rule`) and the game's "earning loop" / "bends in a loop" |
| All D-numbers cited in the nine files | exist as `### D-nn ` headings in `decisions.md` (checked by a loop; none missing) |
| Comment-stripped comparison of the nine files with `HEAD` | identical (exit 0) |

Not run: the product's gate (`npm test` with no argument), by instruction; no unit test was run, because nothing but comment text changed in the view files (the stripped comparison shows it).

### S2 / S3 lines listed

S2 prints no line after the change.

S3 hits, all uses of the word "plan" for the game's trip plan (plan wyprawy), not a planning document: `program-panel.tsx:51` (`import { TripPlanView } …`), `:86` and `:88` (the doc of `ProgramPanelMode`: "no trip plan", "its trip plan"), `:335` (`ProgramPanelView` doc: "its trip plan"); `run-header.tsx:5` ("the warning of a cut trip plan"). No "spec", "slice N", "round N", "package N" or `docs/task-cycles` remains.

## Own-work check (section 3)

Requirement most likely not met: "a pointer is gone in every form, and nothing but comments changes", and "a decision named by the comment holds what the comment says". Checks: (1) the esbuild comment-stripped comparison, identical for all nine files; (2) S1, S2 clean, S3 and the wider search read through; (3) for each decision I newly named I read it (D-93, D-166 to D-174 whole; D-169, D-171, D-173, D-174, D-281, D-287, D-306, D-308 to D-310, D-311, D-364 to D-367, D-380, D-381 whole or by its binding sentences and *Verification*), and checked that what the comment says is in it. Two statements were not wholly in a named decision and are left standing in the comment itself, being the code's own: the first-of-the-list fallback (now D-382) and the label words of the rule panel's fields.

## Reach beyond the dispatch

- Read the spec of the cycle `programy-gracza` in git history (`git show b24d2fc8:docs/task-cycles/programy-gracza/spec.md`, decisions 6 and 7 and the list of foundation entries) to judge what "spec decision 6/7" carried. Read the note passages in the snapshot (`programy_gracza_loop2.md` To do 3, 8, 9, 10 and the settlement rows; `edytor_programu_loop2.md` To do and rows 1 to 19; `ekran_przejscia_loop2.md`, `teraz_i_potem_loop2.md`, `koniec_przejscia_loop2.md`, `kronika_z_filtrami_loop2.md`, `zadanie_proporcje_sceny_i_programu_loop2.md` To do items) to check that the decisions named already carry what the removed `To do N` carried. The handoff did not name these; the slice's *Read* said "the passages the pointers name".
- Read the report of slice 31 for the convention (named decisions in place of task pointers; precedent for D-380 and D-381).
- Read the tests `tests/view/program-panel.test.mjs:625-627, 815-822` and `tests/view/account-screen.test.mjs:4481, 4565-4572` by grep only, to see where the first-of-the-list rule is tested (outside the slice).

## Unread material

- `.the-way/task-cycle/change/SKILL.md`: read whole (first 150 lines held everything of sections 1 to 6); `slice.md`: read whole. `src/browser/AGENTS.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`: read whole.
- The nine view files: each read whole before changing it.
- `foundations/part_map.md`: the `browser-view` entry and the section list; read the `browser-view` entry (lines 1-29) only. No test file is in the *Change*, so there is no `invariant:` line to follow; the invariant `terrain-drawing-numbers` (cited by `terrain-drawing.tsx`) read whole.
- `task.md` and the passages copied into the handoff: read as copied. The three *Foundation entries* rows (D-82 as changed, D-362 as changed, the new invariant): not read; D-82 and D-362 were not needed to judge a comment's pointer (D-82 as rewritten is stated in the handoff).
- Old-Loop files in the snapshot: not read; none of these nine files names one.
- Decisions read by passage, not whole: D-93 (read whole), D-166 to D-174 (whole); D-288 (first 25 lines: binding sentence, verification), D-295 (not read, only its number was kept), D-297 to D-307 (D-306 whole, D-307 whole; the rest not read), D-311 (binding sentences only), D-364 to D-367 (binding sentence and *Scope* only), D-380 and D-381 (whole).
- Skills/guides for writing the decision: all named files read whole (see above). `elements/decisions/examples.md` was not read (the way-of-working file asks for it; the product's own D-380, D-381 and D-167 served as the shape, read whole).

## Searches not found or unclear

- The spec of `programy-gracza` gives the first-of-the-list rule without a reason or a rejected way; the note gives only "After „Zakończ” the panel shows the program the copy was taken from" (To do 10). D-382's *Rationale* is therefore derived from D-167 and D-170 and its *Rejected* is `unknown`. The orchestrator may prefer a human's answer on the rationale.
- The label words of the rule panel (`FIELD_LABELS`: „Warunek”, „Liczba”, „Cel warunku”, „Czynność”, „Cel czynności”): no decision holds them (grep over `foundations/` for „Cel warunku”, „Cel czynności” finds nothing); D-306 holds the fields and their order in English. The note (`edytor_programu_loop2.md` To do 4) names them in the same words. They are the code's own text and tests carry them; I did not write a decision for them, and the comment now says "the fields and their order are D-306's". The orchestrator may decide whether the words deserve an entry.
- The spec of the cycle `kronika-z-filtrami` (D5, D6, D9) was not re-read (slice 31 read it and mapped D5/D9 to D-343, D-46 and D6 to D-147); I relied on that mapping.
- Nothing else was looked for and not found.

## Values or wording in the task or plan that did not survive my check

None found. One thing for the orchestrator: `tests/view/program-panel.test.mjs:625` and a nearby comment attribute "„Usuń” of the shown program shows the first of the list" to D-167, which D-167 does not state; D-382 now does.
