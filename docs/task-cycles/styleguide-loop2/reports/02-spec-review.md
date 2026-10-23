FAIL

# Report 02 — spec review

- Reviewer: fresh agent (claude-opus-5-5), not the spec's designer
- Method: `.the-way/task-cycle/spec/SKILL.md` at the pin `f0b2130`, section 4 "Review a spec"
- Spec reviewed: `.runs/task-cycles/styleguide-loop2/spec.md`
- Read whole: the handoff `reports/02-spec-review-handoff.md`; the spec skill; the frozen task
  `task.md`; the cycle record `cycle.md` (reconciliation, QA-1..QA-4, QA-r); the designer's report
  `reports/01-spec-report.md`; `AGENTS.md`; `.the-way/product-guidelines/reading.md` and, by it,
  `guidelines/coding.md` and `guidelines/coding-browser-module.md`;
  `.the-way/product-guidelines/styleguide/template.md` ("What each section carries" onward);
  `foundations/part_map.md`; the invariants the spec reaches (`foundations/invariants.md`:
  `browser-view-framework`, `application-build-output`, `application-package-layout`,
  `application-build-layout`, `content-identifiers`, `icon-*`, `loop2-container-icons`,
  `eslint-source-rules`, `prettier-source-format`, `introduced-npm-vulnerabilities`); decisions
  D-03..D-07, D-18, D-19, D-27..D-33. Code: `package.json`, both `tsconfig.*.json`,
  `scripts/build.mjs`, `eslint.config.mjs`, `Dockerfile`, `.dockerignore`, `.gitattributes`,
  `src/server/app.ts`, `src/browser/index.html` (style block, links), the view modules as far as
  colour words and attributes go, `src/browser/sim/data/resources.ts`,
  `tests/invariants/test_application_build_output.py`, `test_browser_view_framework.py`,
  `test_content_identifiers.py` (header), `loop2_invariant_support.py` (`TreeCopy`),
  `tests/quality/test_quality_invariants.py` (Prettier patterns).
- Not read, as the handoff forbids: branches `10x/*`, `styleguide-browser-view`, and the
  directories `C:\Storage\repos\loop2-10x`, `C:\Storage\repos\loop-10x`,
  `C:\Storage\repos\loop2-styleguide`.

## Checks run

No test or check of the product. Read-only probes:

- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` — exit 0; both
  `f0b21309a837273a1540f9a704c2dfde6083ec00`.
- `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig <scratch>.css`
  (Prettier 3.9.10, the D-32 pin), three scratch files in the session scratchpad — exit 0 each.
  Output quoted under F1.
- `git config --get core.autocrlf` — `true`; `git ls-files --eol assets/icons` — `i/none w/none
  attr/` (no attribute applies to `assets/`).
- WCAG contrast of the settled values in a scratch script (orientation only, constants from
  memory, not evidence for the test): lowest text pair 4.53:1 (`text-label` on `highlight`),
  lowest 3:1 pair 3.09:1 (`control-border` on `highlight`), `character` on `tile-revealed`
  3.34:1, `tile-revealed` against `tile-hidden` 3.67:1 — every pair of row 13 passes, as the
  designer found.

## Findings

### F1 — The token file's line form clashes with the pinned Prettier for the font stacks

Decision 1 requires: "Every declaration line of the file — each custom property and each
`@font-face` descriptor — ends on the same line with a comment that opens with `Source:` … Prettier
keeps such a comment on its line (probed with Prettier 3.9.10)." Decision 8, row 14, tests that
"every declaration line ends with a comment opening with `Source:`".

That holds only for short lines or values without a top-level comma. The pinned Prettier 3.9.10
(D-32, `prettier-source-format`) breaks a comma-separated value — which both font stacks are —
after the colon once the line with its trailing comment passes 80 columns, and leaves the
property name alone on its line with no comment. Probe input:

```
  --font-body: Geist, ui-sans-serif, system-ui, sans-serif; /* Source: https://kantarion.bieda.it/ read 2026-10-20, body text */
  --font-mono-b: "Geist Mono", monospace; /* Source: Q11 */
  --text-strong: #f4f4f5; /* Source: https://kantarion.bieda.it/ read 2026-10-20, names and headings of panels */
```

Prettier's output (exit 0):

```
  --font-body:
    Geist, ui-sans-serif, system-ui, sans-serif; /* Source: https://kantarion.bieda.it/ read 2026-10-20, body text */
  --font-mono-b: "Geist Mono", monospace; /* Source: Q11 */
  --text-strong: #f4f4f5; /* Source: https://kantarion.bieda.it/ read 2026-10-20, names and headings of panels */
```

The colours, lengths and the single-`url()` `src` descriptor stay on one line; the font stacks do
not. A Source text naming the loop page and its element, which Decision 1 asks for, is long enough
to pass 80 columns on any font-stack line.

Kind: a contradiction between the spec and the foundation (D-32), and a place the builder must
guess. Question: what is a "declaration line" when Prettier puts one declaration on two lines —
does the `Source:` comment belong after the `;` of the declaration, wherever that line falls, or
must the form change (for example a `Source:` comment on the line above each declaration)?
Why it changes the build: the row 14 test as written fails on the formatted file, or the maker
shortens the source text below what Decision 1 requires, or picks a reading of their own for the
test the invariant's sentence rests on. Recommended answer: one declaration runs from its
property or descriptor name to its `;`, and its `Source:` comment stands after that `;` on the
same line; row 14 reads declarations that way, still as text. This is a change to Decisions 1
and 8, so it goes back to the designer.

### F2 — Where a colour name counts in TypeScript and in CSS text is left open, and the literal reading fails on the present code

Decision 8, row 11, reports "a colour in any notation — hexadecimal, functional, named or system
colour — in CSS text (stylesheet files, and `<style>` and `style` in HTML) and in TypeScript
outside comments", and exempts only "Custom property names and `var()` references … nor are role
names used as text in TypeScript."

CSS colour keywords and system colours are case-insensitive words, and several are ordinary
identifiers. `src/browser/view/program-editor.ts:381-383` holds code outside comments with the
variable `field` (`const field = readNumberField(...)`, `field.value`, `field.commit`); `Field` is
a CSS system colour. A whole-word search over TypeScript outside comments flags that file today,
and To do 4 and 5 bring more such words (`highlight`, `mark`, `canvas` are system colours too). In
CSS text the same question stands for selectors: a class named after a role such as `.highlight`
is not a custom property name and not a `var()`, so the exemption as written does not reach it.

Kind: a place the builder must guess where a wrong guess matters. Question: in TypeScript, does a
colour name count only inside string and template literals, or in all code outside comments; and
in CSS text, only in declaration values, or also in selectors? Why it changes the build: the wide
reading fails on the real files, so the maker either renames product variables to satisfy the
test (and every later task meets the same false failures on new identifiers) or narrows the test
on the fly to a reading that neither the spec nor the review knows. Recommended answer: in
TypeScript, colour names and system colours count inside string and template literals only,
whole word, any case, with the role names of Q18 as text exempt; in CSS text, in declaration
values only (the value of a custom property or a `var()` name is never a colour name).

### F3 — "Byte for byte" for the licence file is not kept on a checkout with `core.autocrlf=true`

Decision 3 keeps in `assets/fonts/` "the release's OFL 1.1 licence file, each byte for byte as
the release publishes it", and makes review check "that the files are the release's published
binaries with its licence". On this machine `git config --get core.autocrlf` is `true`, and
`.gitattributes` has no rule for `assets/` (`git ls-files --eol assets/icons` shows `attr/` empty).
Git then stores a text licence file with LF in the index and checks it out with CRLF on Windows,
so the file in the working tree, the copy in `dist/public/fonts/` and the bytes the review compares
differ from the release (if the release file has CRLF, the repository itself no longer holds it
byte for byte). The woff2 files are safe: their header holds NUL bytes, so git treats them as
binary.

Kind: a place the builder must guess where a wrong guess matters. Question: does the change add
`assets/fonts/** -text` (or `binary`) to `.gitattributes` (part `deployment`, which the spec
already touches through `Dockerfile` and `.dockerignore`), or does "byte for byte" give way for the
licence text? Why it changes the build: without the attribute the trust-boundary review of
`assets/fonts/**` on Windows finds a licence file that does not match the release, which costs a
review round or a silent waiver of the check the spec itself requires. Recommended answer: add
the `-text` line to `.gitattributes` and name it in Decision 3 beside the two `deployment` lines.

## Notes that do not fail the spec

- Decision 1 says the fonts' source is "the release of Decision 4"; the release is in Decision 3.
  The builder will find it; the designer can correct it with F1.
- Decision 1 asks every `@font-face` descriptor for a `Source:` that "names the source To do 2
  gives that value", while *Left to the maker* holds `font-display` and the fallback generic family
  of each font stack, for which To do 2 gives no source. The maker may leave `font-display` out;
  if it is written, its `Source:` text has nothing in To do 2 to name. Worth one sentence when the
  designer revises Decision 1.
- `tsconfig.kitchen-sink.json`: if it `extends` `tsconfig.browser.json`, it inherits that file's
  new `exclude` of `src/browser/kitchen-sink/` unless it sets its own, and then finds no input. The
  maker sees this at the first compile; no spec change needed.
- D-28 defers exemplars for entry points and HTML; the kitchen-sink's one entry module, its HTML
  and its stylesheet fall under those deferrals and row 10. Decision 4 reads as one entry module
  only; a second module in `src/browser/kitchen-sink/` would be a module of `browser-view` outside
  `src/browser/view/`, a kind with no index row (`.the-way/product-guidelines/reading.md`,
  "Distinguish the gaps"). The plan should keep the page to one module.

## What the spec gets right (checked, no finding)

- The three open choices are settled with ways weighed and costs; nothing the task asks for is
  dropped; the additions (`--build-only`, the marker, loopback serving, the third configuration)
  each serve a task requirement (Q13, Q16, row 15).
- Code facts in *Constraints* hold: `src/browser/index.html:8-175` style block; `scripts/build.mjs`
  copies only `index.html` and `assets/icons/*.svg`; `Dockerfile` and `.dockerignore` pass only
  `assets/icons/`; `src/server/app.ts:18` serves all of `dist/public`;
  `test_application_build_output.py:38` takes `src/browser` whole; ESLint's browser program takes
  its root names from `src/browser/**/*` independently of the tsconfig's `exclude`;
  `.gitattributes` and the Prettier patterns already cover `src/browser/**/*.css` and `*.html`.
- `content-identifiers` and `browser-view-framework` reach `src/browser/kitchen-sink/` unchanged;
  the page brings no `.js` file into `src/browser`; icons come through `RESOURCES[...].icon`.
- D-06, D-27, D-29, D-32, D-33 and the reconciliation in `cycle.md` are respected; npm `geist`'s
  peer dependency on `next` is a sound ground for rejecting it.

## Concerns the next dispatch depends on

- F1–F3 go back to the designer; F1 changes Decisions 1 and 8 (row 14), F2 changes Decision 8
  (row 11), F3 adds one `.gitattributes` line to Decision 3. A review of the revised spec checks
  only these and what the revision breaks.
- Foundation step: the styleguide template has the visible-focus invariant (row 12) rest on the
  environment fact of WCAG 2.4.7 (row 18). The spec states the contrast invariant's *Rests on*
  (rows 16, 17 and the QA-4 fact) but is silent on row 12; the foundation step should not leave it
  out.
- Carried from the designer, still open: fonts in the container are unchecked where no Docker
  daemon answers; the old icon wording at `README.md:53`, `README.md:59`,
  `tests/view/icons.test.mjs:87`, `:116` and the comment `src/browser/view/credits.ts:11` changes
  with To do 5; ESLint coverage of `src/browser/kitchen-sink/` is to be confirmed by running ESLint.
