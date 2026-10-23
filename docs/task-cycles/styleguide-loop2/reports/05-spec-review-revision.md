FAIL

# Report 05 — review of the spec's revision 1

- Reviewer: the agent of `02-spec-review.md` (claude-opus-5-5), not the spec's designer
- Method: `.the-way/task-cycle/spec/SKILL.md` at the pin `f0b2130`, section 4, for a revised spec:
  each earlier finding resolved or not, then only what the revision broke
- Read: `spec.md` whole as revised; `reports/01-spec-report.md`, section "Revision 1"; my
  `reports/02-spec-review.md`; the frozen task `task.md` (Q12, Q15, row 6) for the parts the
  revision touched

## Checks run

No test or check of the product. Read-only probe: Prettier 3.9.10 (`node
node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig`) on one scratch token file in
the session scratchpad — exit 0; output quoted under "Notes". `grep` of `tests/` for
`.gitattributes` readers — the two hits read only the LF patterns, so the new `-text` line touches
no test.

## Earlier findings

- **F1 — resolved.** Decision 1 now defines a declaration as running from its name to the `;`
  that ends it, with the `Source:` comment directly after that `;` on the same line; Decision 8,
  row 14, reads declarations that way. Prettier keeps the comment after the `;` whatever the
  layout (probe below). A residue of wording is under "Notes".
- **F2 — resolved.** Row 11 limits CSS colours, lengths, font names and unitless values to
  declaration values, and TypeScript colours to string and template literals; `field`
  (`program-editor.ts:381-383`) and a `.highlight` selector are named as not reported.
- **F3 — resolved.** Decision 3 adds `assets/fonts/** -text` to `.gitattributes` (part
  `deployment`, which already holds that file) and counts it in its cost.

Notes taken up from `02-spec-review.md` (the Decision 3 cross-reference, `font-display`, the
kitchen-sink configuration's `exclude`, one entry module, row 12 resting on row 18, the
`credits.ts:11` comment): each is in the revised spec.

## Finding the revision introduced

### R1 — Row 11 now reports `transparent` and `currentColor`, which Q15 exempts

The revised row 11 reports, in CSS declaration values, "a colour keyword or system colour as a
whole word in any case", and in TypeScript string literals "a colour keyword or system colour",
and passes "keywords other than colours". `transparent` and `currentColor` are colour keywords:
CSS Color 4 makes both of them a `<color>`. Q15 (frozen task) exempts exactly these: "Nie jest
nią: `0`, procenty, jednostki `fr`, `vw`, `vh` i słowa kluczowe (`transparent`, `currentColor`,
`inherit`, `none`)", and row 6 of *Settlements to record* lists "słowa kluczowe" among the
exemptions. Before the revision, row 11 passed "keywords" without the qualifier.

Kind: a requirement of the task the spec changes, and a contradiction with the task. Why it
changes the build: Q12 says the controls have no background of their own ("kontrolki nie mają
własnego tła — widać tło pod spodem"), so `background: transparent` is the natural declaration for
them, and `currentColor` is the usual way to colour a drawing from its text. A maker who follows
the spec reports both, so either the test fails on code the task allows or the maker works around
an exemption the task grants. Recommended answer: the colour keywords reported are the named
colours and the system colours, never `transparent` or `currentColor`, in CSS values and in
TypeScript literals alike; row 11 passes them with the other keywords of Q15.

## Notes that do not fail the spec

- Decision 1 and row 14 say a declaration runs "on one line or on two". A longer font stack runs
  over three lines in Prettier 3.9.10, the comment still right after the `;`. Probe output:

  ```
  --font-body:
    Geist, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif; /* Source: https://kantarion.bieda.it/ read 2026-10-20, body text */
  ```

  The stack's further keywords are the maker's (*Left to the maker*), so a three-line stack can
  happen. The rule "from its name to its `;`" covers it; "on one line or on two" is narrower than
  the rule and should go, so that the row 14 test does not count lines.
- Decision 4 now says code the page needs beyond its entry "belongs to `src/browser/view/`".
  Everything there is compiled by `tsconfig.browser.json` into `dist/public/`, so a module only the
  kitchen-sink uses would reach what `npm run build` writes and the test server serves. The marker
  test (row 15) does not see it, since only the HTML and the entry carry the marker. A reading that
  avoids this: beyond its entry the page imports only modules the game also uses; code only the page
  needs stays in the entry module.

## Concerns the next dispatch depends on

- R1 goes back to the designer: one change to Decision 8, row 11. The two notes can be fixed in
  the same pass. A further review then checks only R1 and what that change breaks.
- Carried as before: fonts in the container stay unchecked where no Docker daemon answers; ESLint
  coverage of `src/browser/kitchen-sink/` is confirmed by running ESLint.
