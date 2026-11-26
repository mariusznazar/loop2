# Planner report — task `paski-parametrow`

## Status

done with concerns

- Plan: `.runs/task-cycles/paski-parametrow/plan.md`
- Size report: `.runs/task-cycles/paski-parametrow/plan-size.md` — `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/paski-parametrow/plan.md`, exit 0: every slice fits (Slices 2, 6 and 8 "fits by ranges of" a file they change by search).
- Check result: the size check passed; nothing else was run (the gate is the orchestrator's); the sizes do not count files earlier slices create (see Concern 4).

## Open design choice and reserved choice

None found. The choices the task leaves to the agent (values of the own roles and their sources, the
time of the fill's transition, the amber outline's role, the explanations' words, the form of the
extended button) and the choices of how (the marker's role, the new kind of D-44, where the rules
stand, the move of the body row, the numbers of the look) are taken in the plan's *Choices* or left to
the slice that holds them. No language, library, store or place to run is needed.

## Slices in short

Foundation entries (D-337, D-311, D-178, D-39, D-40, D-42, design-token-contrast, D-04, D-44) →
1 roles, values and contrast pairs (tokens, contrast test, styleguide table and contrast rule) →
2 the shared button of a cell (react-button, styles.css, shared-controls test) →
3 kitchen-sink samples → 4 the body row moved into its own component and test file (no behaviour
change) → 5 pure values (body-row.ts, new body-blow.ts, tests) → 6 cells, bars, scale, outline, both
layouts → 7 explanation under the cells → 8 alarm pulse and blow marker → 9 the styleguide's rule of
the body row and the side-by-side screenshots for the request.

Screenshots (handoff point 6): taken by the executor of Slice 9, from the finished UI. Slice 8 is the
last slice that changes a screen; Slice 9 changes only the styleguide and reads little code, so it has
room for `.claude/skills/loop2-play/SKILL.md` whole. The request template gives screenshots to "the
author or the reviewer who shows them", and D-419 to the agent that shows them, so not the
orchestrator; Slice 8 would pass the reading limit with them. A fix after review that changes the row
must retake them — the orchestrator says so in that fix's handoff.

Foundation entries: one agent of the plan's *Foundation entries*, before Slice 1, as the cycle gives.
The styleguide is written in Slices 1 and 9 by `.the-way/product-guidelines/styleguide/template.md`,
"Writing the file" — `maintain-styleguide` (`.the-way/product-guidelines/styleguide/SKILL.md`) leads a
styleguide task's refinement and is not the cycle's method; the template's section is what the pinned
the-way names for the cycle's author.

## Relation to the styleguide's example of the order of work

Followed: values in their source (Slice 1), the shared control in its states and the kitchen-sink page
(Slices 2–3), the screen (Slices 4–7), its states of motion (Slice 8). The one departure: the
styleguide's new rule comes last (Slice 9), because it describes what the slices make, and the
table of roles and the contrast rule move with the values in Slice 1.

## Guidelines found missing or uncertain

1. `src/browser/AGENTS.md`, "Design tokens", last paragraph: "without a human, name the missing or
   changed value in your report instead of choosing one". The styleguide's rule "Every value with its
   source" lists only sources settled with Mariusz, and `.the-way/product-guidelines/styleguide/template.md`
   ("Writing the file") takes every value from the task's *To do* "as the human settled them". The
   task's *To do* 3 says instead: "Wartość każdej roli własnej wybiera agent i zapisuje ją ze źródłem
   w pliku tokenów". Proposed reading: the task document is the human's settlement, so the value
   enters with a source settled with the human — the delegation, bounded by the thresholds of D-42 —
   and Slice 1 names that kind of source in "Every value with its source"; the request puts each value
   before Mariusz, as the scene's cold layer was ("cykl je zaproponował, a Mariusz wybrał je przy
   prośbie o scalenie"). Slice 1's *Goal* is written so. If the orchestrator reads AGENTS.md as
   binding here, Slice 1 cannot choose values and the cycle needs the values from the human first.
2. The styleguide holds the look of a shared control only in `src/browser/styles.css` (D-265) and the
   rules of one screen only in its own sheet (D-421). The health cell is no control but must stand in
   the same parts as the button of a cell. The plan keeps its rule beside the kind's in `styles.css`
   with a comment (*Choices*); the styleguide does not say this case outright.
3. `guidelines/testing.md` (86 kB) and `guidelines/styleguide-browser-view.md` (134 kB) together take
   about 88 000 of the 150 000 tokens of every slice that writes a test of `browser-view`; no finding
   against them, but this is why the row's tests are split into three files.

## Questions and concerns, with proposed answers

1. **D-337 within the limits of WAY-05.** `foundation_check.py` holds a changed decision to ≤ 3
   sentences and ≤ 300 words a paragraph and ≤ 600 words in all, as errors. D-337 has 138 words now;
   rows 1, 2, 4, 5, 6, 7, 9, 10 and 11 add about 400. Proposed: the Foundation entries agent writes
   tersely and puts the look's values in D-39, D-40, D-42 and the styleguide; if it still cannot fit,
   it returns a question, and the proposed answer is a new decision deriving from D-337 holding the
   explanation and the blow marker, marked `the cycle's`. D-04's second paragraph stands at 299 words
   and D-42's paragraph at 3 sentences, so their additions go in new paragraphs — the plan says so.
2. **Test citations.** Tests quote D-337 34 times (`tests/sim/body.test.mjs` among them, which no slice
   touches), D-311 40, D-44 39, and D-04, D-39, D-40, D-178 a few times each; the check requires each
   quotation to begin a binding sentence. The plan has the Foundation entries agent keep quoted
   sentences beginning as they do and, where one must be reworded, update the quotation lines in the
   same commit. That puts test files outside `foundations/**` into that agent's commit; the
   mechanical check will see them — expected, not a mismatch to return.
3. **A killing blow while time stands.** *To do* 4 says the marker shows at a killing blow before the
   end window opens, and that while game time stands the shake and the text stand where they reached.
   At a death time stands from that reading. Proposed reading for Slice 8: the marker appears and
   stands at its first frame through the death effect and on the screen after the end; the other
   reading (it plays once, like the effect of the moment) is cheap to turn to, a CSS rule, so it is no
   open design choice. The orchestrator may settle it in Slice 8's handoff.
4. **Sizes do not count created files.** The script counts no file that does not exist at the base:
   `src/browser/view/body-row-cells.tsx` and `tests/view/body-row-cells.test.mjs` (Slice 4),
   `src/browser/view/body-blow.ts` (Slice 5), and the growth of `body-row.ts`. Estimated real reading:
   Slice 6 about 149 000 tokens (the nearest to the limit), Slice 7 about 133 000 with
   `run-screen.css` by ranges, Slice 8 about 142 000. In the handoffs the orchestrator adds
   `src/browser/view/body-blow.ts` whole to Slice 8 (named in its *Goal*, not in *Read*, since it does
   not exist yet), and the range of the helpers at the head of `tests/view/body-row-cells.test.mjs` to
   Slices 7 and 8, and current ranges of `styles.css` (the kind Slice 2 adds) and `run-screen.css`.
5. **Role names.** The five new roles are named by the Foundation entries agent (D-48: by meaning);
   later slices take them from the entries.
6. **Dependencies.** `node_modules` is absent in the worktree; every `npm test -- <file>.mjs`,
   `npm run typecheck` and `npx tsc` check needs the product's install first (`npm ci`), and
   `tests/quality/test_quality_invariants.py` needs `.runs/quality-venv`, which `npm test` makes.
7. **Kitchen-sink typecheck.** `npm run typecheck` excludes `src/browser/kitchen-sink/**`
   (`tsconfig.browser.json`), so Slice 3 checks with `npx tsc -p tsconfig.kitchen-sink.json --noEmit`.
8. **Function and file size.** The invariant function-and-file-size reads `Violated: no`; every file the
   slices add to is far under 800 lines (`world-area.tsx` 138, `body-row.ts` 111, `react-button.tsx` 79,
   `control-samples.tsx` 374), so no move for size is needed; Slice 4's move is for the reading limit.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/foundation_step.md` (whole), `.the-way/task-cycle/skill/planning.md`
  (whole), `.the-way/task-cycle/skill/SKILL.md:440-519` and grep of "Foundation entries" — who writes
  the plan's entries and when.
- `.the-way/task-cycle/change/ui_check.md` (whole), `.the-way/task-cycle/skill/request_template.md:180-193`
  and a grep of "screenshot" in `.the-way/task-cycle/` — who shows screenshots.
- `.the-way/product-guidelines/reading.md` (whole) — whether `testing.md` is read by a slice that
  writes no test.
- `.the-way/product-guidelines/styleguide/SKILL.md:1-30`, `.the-way/product-guidelines/styleguide/template.md:150-190`
  and its headings — what the-way names for writing a styleguide rule in a cycle.
- `.the-way/elements/common/foundation_check.py:1-110, 996-1014` — test citations and the WAY-05 limits;
  run once on the base: 0 errors.
- `.the-way/task-cycle/slice_size.py:1-80` — the limits.
- `foundations/decisions.md` D-337, D-425, D-39, D-40, D-41, D-42 whole; a grep of headings for
  ranges; word counts of the binding paragraphs of D-04, D-337, D-311, D-178, D-39, D-40, D-42, D-44.
- `foundations/invariants.md:476-528, 1428-1437` — the part's token, focus, contrast, sources,
  kitchen-sink and size invariants.
- `git grep -n "decision: D-<n> \""` for the decisions the entries change — the citation counts above.
- Code to cut slices: `src/browser/sim/body.ts:130-221`, `src/browser/sim/types.ts` (combat types,
  by grep), `src/browser/sim/run.ts:60-110, 720-820`, `src/browser/view/scene-picture.ts:195-224`,
  `src/browser/view/run-screen.tsx:150-224`, `src/browser/run-screen.css:245-289, 600-679` and greps,
  `src/browser/styles.css` (greps), `src/browser/kitchen-sink/control-samples.tsx:1-108, 240-374`,
  headings of `tests/view/world-area.test.mjs` and `tests/view/shared-controls.test.mjs`, the
  `tsconfig*.json` files, the scripts of `package.json`, `tests/quality/eslint-size-rules.mjs:1-40`,
  `.claude/skills/loop2-play/SKILL.md:1-22, 364-393` and its headings.

## Working copies

- `.runs/planner/slices-6-9.md` — a block of
  the plan spliced into it by a short Python run; the directory `.runs/planner/` was removed.
- `/tmp/d.txt` and `/tmp/fc.txt` in the Git Bash temporary directory — scratch output of a word count
  and of the base run of `foundation_check.py`, written there against the rule of working copies;
  both removed.
- No worktree, clone or screenshot was made.

## Unread material

- `foundations/decisions.md`: of the decisions the dispatch names, read whole (all fields) only D-337,
  D-39, D-40, D-42, D-425; D-04, D-311, D-178, D-125, D-57, D-133, D-396, D-44, D-45, D-322, D-317,
  D-418, D-419, D-38, D-265, D-395, D-407, D-421, D-274, D-275, D-279, D-47, D-48, D-43, D-58, D-59,
  D-60, D-175, D-176, D-177, D-377, D-387, D-201, D-324, D-334, D-335, D-336, D-368, D-369, D-370,
  D-371, D-385 were read from `.runs/task-cycles/paski-parametrow/foundation-index.md` — their binding
  sentences and *Scope* only, not *Verification*, *Rationale* or *Rejected*.
- `.runs/task-cycles/paski-parametrow/foundation-index.md`: lines 1–766 read; 766–969 ("Listed by
  heading alone") not read.
- `foundations/invariants.md`: read whole browser-view-token-values, browser-view-focus-outline,
  design-token-contrast, design-token-sources, application-build-kitchen-sink, function-and-file-size;
  located by line only, not read: browser-view-framework, content-identifiers, cross-part-imports,
  node-test-selection, document-test-memory-limit, tracked-file-private-paths,
  tracked-file-private-names, eslint-source-rules, prettier-source-format, ruff-source-rules,
  ruff-source-format.
- Code the dispatch names: read whole `src/browser/view/body-row.ts`, `src/browser/view/world-area.tsx`,
  `src/browser/view/controls/react-button.tsx`, `src/browser/tokens.css`,
  `src/browser/kitchen-sink/role-samples.tsx`, `tests/invariants/test_design_token_contrast.py`; in
  part `src/browser/run-screen.css` (245–289, 600–679, greps), `src/browser/styles.css` (greps),
  `src/browser/sim/run.ts` (60–110, 720–820), `src/browser/kitchen-sink/control-samples.tsx` (1–108,
  240–374), `tests/view/world-area.test.mjs` (test headings); not read: `src/browser/character-screen.css`,
  `src/browser/sim/data/balance.ts`, `tests/view/body-row.test.mjs`,
  `tests/invariants/test_design_token_sources.py`, `src/browser/kitchen-sink/account-samples.tsx`,
  `kitchen-sink.tsx`, `sample-parts.tsx`, `tile-samples.tsx`, `kitchen-sink.css`, `index.html`.
- `foundations/part_map.md`: sections `browser-view` and `product-foundation` read; the rest not.
- Read whole: the task, the handoff, the method, `guidelines/coding.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`, `src/browser/AGENTS.md`.

## Searches not found or unclear

- A test that holds the kitchen-sink page's list of roles to the styleguide's table: none found
  (`tests/` searched for `role-samples`, `ROLES`, `kitchen-sink`).
- The role of a cell's name at rest: the task settles only the open and hovered name (`text-strong`);
  the old Loop has "small grey text"; left to the Foundation entries and Slice 2 within D-40.
- Whether the body row can reuse the scene's reading of "time stands": `standingOf` in
  `src/browser/view/scene-picture.ts` is not exported; left to Slice 8.
- `node_modules` in the worktree: absent, so no focused check was tried on the base.
- `npm run typecheck` and the kitchen-sink page: excluded by `tsconfig.browser.json`; found
  `tsconfig.kitchen-sink.json` instead.
