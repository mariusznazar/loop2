# Findings 03 — spec review FAIL, for the designer's one revision

The blocking findings of `02-spec-review.md`, in the reviewer's words (lines 45–133 of that report). Revise the spec once for them; its review of the revision reads F1–F3 and whatever the revision breaks. The reviewer's non-blocking notes and concerns stand in that report, lines 134–180; read them too.

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

