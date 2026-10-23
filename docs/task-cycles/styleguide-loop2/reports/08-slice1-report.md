# Report 08 — slice 1, the styleguide of browser-view

- **Status:** done with concerns
- **Branch and commit:** `task/styleguide-loop2`, one commit
  `5ef77fcae7a368de96ca9a73fb4d20fe46ef84a2` ("docs: write the styleguide of browser-view and defer
  CSS beside HTML in the coding guidelines") on `19d0116`; slice base
  `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`. Not pushed. Author address `<private address>`.
- **Method:** `.the-way/task-cycle/change/SKILL.md` (pinned `f0b2130`), executor of planned slice 1.
- **Read whole:** handoff 08; `task.md`; `spec.md` (8a included); `plan.md` (slice 1, *Foundation
  entries*, pattern table, *Choices*); `cycle.md` (questions table: QA-1..QA-4, R1, Q-P1..Q-P4,
  FE-1..FE-5); `reports/07-foundation-report.md`; `.the-way/product-guidelines/styleguide/template.md`,
  `.the-way/product-guidelines/template.md`, `.the-way/product-guidelines/reading.md`,
  `.the-way/product-guidelines/styleguide/SKILL.md`; "Reading the foundation" of
  `.the-way/elements/common/way_of_working.md`; `foundations/decisions.md` (all, D-38..D-47 and D-28
  among them), the five new invariants of `foundations/invariants.md`, `foundations/part_map.md`;
  `guidelines/coding.md`, `guidelines/coding-browser-module.md` (for the product's language and form
  of guidelines). Guidelines selected by `reading.md` for the files changed (`guidelines/**`, part
  `agent-workflow`; content about `browser-view`): `guidelines/coding.md`; no styleguide existed
  (this slice writes it, WAY-215).

## Files changed

| File | Added | Removed |
|---|---|---|
| `guidelines/styleguide-browser-view.md` (new) | 287 | 0 |
| `guidelines/coding.md` | 4 | 1 |

What they hold:

- `guidelines/styleguide-browser-view.md` — the merged required form: title, *Discipline*
  `styleguide`, *Applies to* `browser-view`; `## When to read` (before changing any file of
  `browser-view`); `## Roles` with the 23 roles of Q18 and Q19 C, kinds `background` / `text` /
  `other` as Q18 gives them, *Meaning for the user* translated from D-39, D-40, D-41, *Text on it*
  `text` for `page`, `panel`, `highlight` and `—` elsewhere, *Decision* D-39/D-40/D-41; the nine
  required rules in the template's order, each with *Decision*, *Invariant*, *Good*, *Bad* and how to
  apply it — *Invariant* `browser-view-token-values`, `browser-view-focus-outline`,
  `design-token-contrast`, `design-token-sources`, `application-build-kitchen-sink` for rules 3, 4,
  5, 8, 9 and `none` for rules 1, 2, 6, 7; the examples *Mockups* and *Plan of a user-interface
  change*; `## Where in code` with `src/browser/tokens.css`, `src/browser/view/controls/`,
  `src/browser/kitchen-sink/index.html`. No value of a token, no fenced code, no test cases of rules
  (Q20). Text in Polish like the product's other guidelines; required headings, header lines, field
  names, closed-list values in English (`product-guidelines/template.md`, "Language").
- `guidelines/coding.md`, "Odłożone rodzaje i formatowanie" — CSS joins HTML among the deferred
  exemplars, as D-28 now says, with one sentence that CSS has no exemplar or kind guidelines and that
  the stylesheet rules a test keeps stand in `guidelines/styleguide-browser-view.md` (D-28's
  rationale).

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at `19d0116`, before any edit | 1 | 12 errors, the plan's pattern table |
| `python -B .the-way/elements/common/foundation_check.py` with both files staged, and again at `5ef77fc` | 1 | the same 12 errors, line for line (`diff` of the outputs empty); no error at either changed file, no other error |
| positive control: `foundation_check.py` with the staged styleguide mutated (`Applies to: browser-viewz`, *Invariant* `browser-view-token-valuez`, `D-46` → `D-99`), then restored | 1 | 16 errors — the four extra ones at `guidelines/styleguide-browser-view.md:4`, `:75`, `:102`, `:236` — so the check reads the new file's references; after restoring, 12 |
| `python -B .the-way/instruction-files/check_instructions.py .` at `19d0116` and at `5ef77fc` | 0 | `0 error, 14 warn, 3 info` both times; the only difference is the size line of `guidelines/coding.md` (243 → 246 lines) |
| probe: `python -B .the-way/instruction-files/check_instructions.py . --file guidelines/styleguide-browser-view.md` | 0 | `0 error, 25 warn, 4 info`: the 14 base warnings plus 11 dead-path warnings in the styleguide, all for paths later slices create (see *Concerns* 1) |
| own-work check: scratch script `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\1d1a68d6-a4ef-4c40-a07f-c510f1f4e29e\scratchpad\check_form.py guidelines/styleguide-browser-view.md` | 0 | `0 problems` |
| the same script on a mutant (role `focus` given kind `text`, rule 8's *Invariant* set to `none`, a hex colour and a length written into a line) | 1 | `6 problems`, each mutation caught — the check can fail |

Not run, with reason:

- `npm test` and the gate — the cycle runs the full suite before the request (`make-change` §3);
  this slice changes only Markdown of `guidelines/`, which no test of the repository reads (searched:
  no file under `tests/` names `guidelines`).
- Form against the template's *Required form* — the reviewer's, as the plan's *Checks* say; my own
  script above checks the structural part only.
- Screenshot of the running product (`make-change` §3, WAY-219) — the slice changes no user
  interface: no style, module or page.

## Own-work check (section 3)

- Requirement most likely missed: the slice's "the merged form of the pinned styleguide template …
  with no value copied" — a role, kind, *Text on it* or *Decision* of `## Roles` wrong against Q18 /
  D-39–D-41, a required rule out of order or with a wrong *Invariant*, or a token value (a colour, a
  length, an opacity) slipped into the text.
- Check: `check_form.py` — title and header lines; the five `##` sections in order; the nine rules
  and two examples in order; each rule's four fields in order with *Invariant* as the plan gives;
  examples carry no *Decision*; the 23 roles with Q18's kinds, `text` on the three backgrounds and
  `—` elsewhere, the decision of each role; no hex colour, length, percentage, decimal opacity or
  colour function on any line; no fenced code; `## Where in code` exactly the plan's three paths.
- Showed: 0 problems; the mutant run shows each kind of mistake is caught.

## Choices, with the way rejected and the cost if wrong

1. **The states of the shared controls and the looks of the three buttons stand in rule 6**, from Q12
   and Q19 B/C (default: no own background, text `text`, frame `control-border`; hover `highlight`
   with the frame unchanged; disabled `text-disabled`; error on the fields a `warning` frame and
   message; empty with the hint in `text-label`; loading not applying, D-44). D-44 lists no states
   (report 07, choice 7), so the styleguide is their only home. Rejected: leaving the looks to
   Slice 6. Cost if wrong: Slice 6 and the page of Slice 7 would have no written look to build to.
2. **Departing controls named by the plan's module paths** — `src/browser/view/controls/button.ts`
   (error and empty not applying to the three buttons) and `src/browser/view/controls/select-list.ts`
   (error not applying, FE-5), as the template says ("names a component by its path only where that
   component departs"); plan C5 fixes these names. Rejected: naming the controls by word only. Cost
   if wrong: two more dead paths until Slice 6, and a rename in Slice 6 changes two lines here.
3. **Reasons of "not applying".** Error for buttons: "przycisk nie ma niepoprawnej wartości" (Q12);
   error for the select list: "lista podaje tylko poprawne pozycje" (FE-5); empty for buttons: Q12
   says only that it does not apply, so the reason "przycisk nie ma pozycji ani wpisu" is my
   wording of why. Cost if wrong: one reason reworded.
4. **Geist Mono's use** (kronika i zegar przejścia, Q11, To do 6) stands in rule 3's text beside
   D-46, which names the fonts but not where each is used (report 07, choice 7). Rejected: a further
   product rule `### Czcionki` — beyond the plan's slice goal and a rule whose choice no decision's
   binding sentence carries. Cost if wrong: the reviewer may want it moved or a decision for it.
5. **Rule 8 names the sources** settled with Mariusz (To do 2): the rendered page of
   https://kantarion.bieda.it/ read 2026-10-20 with its element; the Q8 threshold (D-42) for the two
   changed values; Mariusz's choice from the preview for the values loop did not show; the task's
   settlement for the spacing scale, frame and bar widths, font stacks, weights and grid line widths
   (Q11, Q19, spec Decision 1); the geist-font release with tag and commit for `@font-face`
   (D-46, spec Decision 3). It points to the task by the vault note, as the decisions' *Origin* do,
   never to `.runs/`. The "24 px" step of To do 2 is not written (a value).
6. **Rule 9 carries spec 8a's import limit** (beyond its entry the page imports only modules the game
   uses), as the way to keep `application-build-kitchen-sink`. Rejected: leaving it to the spec alone,
   which no later agent reads after the request merges.
7. **Role property names** `--<rola>` and `var(--panel)` / `var(--text)` / `var(--highlight)` in
   *Good*/*Bad* follow spec Decision 1 (`--<role>`, names exactly as Q18). Non-role token names are
   left to Slice 3, so the styleguide names none (rule 3's *Good* says "z tokenu skali odstępów", not
   a name).
8. **`guidelines/coding.md`**: beyond "HTML i CSS", one sentence pointing to the styleguide for the
   stylesheet rules a test keeps (D-28's rationale). Rejected: the bare word "CSS" alone. Cost if
   wrong: one sentence to drop.

## Adaptations (section 4)

- The plan expects `check_instructions.py .` to warn of dead paths in `## Where in code` until
  Slice 7. It does not: the script follows only Markdown files the root `AGENTS.md` or `CLAUDE.md`
  names, and `AGENTS.md` names the styleguide only from Slice 9. So `check_instructions.py .` shows the
  base's 14 warnings; I ran the `--file` probe to see the styleguide checked as an instruction file.

## Concerns the next dispatch depends on

1. **Dead paths until later slices.** With the styleguide checked as an instruction file (the probe,
   and for real from Slice 9), it warns of 11 dead paths: `src/browser/tokens.css` (lines 80, 214,
   285; Slice 3), `src/browser/styles.css` (119; Slice 4), `src/browser/view/controls/` (159, 286),
   `src/browser/view/controls/button.ts` (179), `src/browser/view/controls/select-list.ts` (185)
   (Slice 6), `src/browser/kitchen-sink/index.html` (250, 287), `src/browser/kitchen-sink/` (259)
   (Slice 7). Beyond the plan's three *Where in code* paths, the body names `styles.css`, `button.ts`
   and `select-list.ts`. Slice 9's check (`no warning … at src/browser/AGENTS.md` and `AGENTS.md:`)
   is unaffected, but Slice 9 will see warnings at `guidelines/styleguide-browser-view.md` if any of
   those files is missing by then; Slice 6 must create `button.ts` and `select-list.ts` under those
   names (plan C5) or bring rule 6 in line.
2. **Slice 6 builds to rule 6.** The control looks there (no own background, `control-border` frame,
   hover `highlight` without a frame change, `warning` frame and message for field errors, hint in
   `text-label`) are the styleguide's statement of Q12/Q19; Slices 6 and 7 should read rule 6, not
   only the task.
3. **Rule 4 says the focus rule lives in `src/browser/styles.css`** (spec Decision 2, D-47 "the game's
   stylesheet") and that no code sets `outline` from TypeScript; Slice 4's test must hold to the
   same file.
4. **No meaning was added.** Every meaning in `## Roles` restates D-39–D-41; the only wording of my
   own is the reason of choice 3. The review of the translation against the decisions is the
   reviewer's (template "Translated meanings": no check compares them).
