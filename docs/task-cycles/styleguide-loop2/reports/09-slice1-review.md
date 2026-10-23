FAIL 5ef77fcae7a368de96ca9a73fb4d20fe46ef84a2

# Review 09 — slice 1 with the foundation entries

- **Reviewed:** planned slice 1 and, as part of the range, the plan's *Foundation entries*.
- **Range:** `00e53aee5bd21692ddd3b2f7c7541625a3114a3f..5ef77fcae7a368de96ca9a73fb4d20fe46ef84a2`
  (two commits: `19d0116` foundation entries, `5ef77fc` slice 1). `git rev-parse HEAD` in the
  worktree is `5ef77fc…`, the head given. Worktree clean before and after; nothing written but this
  report.
- **Method:** `.the-way/task-cycle/review/SKILL.md` at the pin `f0b2130` (gitlink and
  `git -C .the-way rev-parse HEAD` agree).
- **Read whole:** handoff 09; `task.md`; `spec.md` (8a included); `plan.md`; `cycle.md` (questions
  table); reports 07 and 08; `AGENTS.md`; `.the-way/product-guidelines/reading.md`,
  `product-guidelines/template.md`, `product-guidelines/styleguide/template.md`;
  `.the-way/elements/decisions/template.md`, `invariants/template.md`,
  `environment-facts/template.md`; "Reading the foundation" of
  `.the-way/elements/common/way_of_working.md`; the full diff; D-03, D-04, D-19, D-27, D-28, D-32,
  D-36 and D-38..D-47 whole; the part map; the glossary's headings. Guidelines selected by
  `reading.md` for the files of the range (`foundations/**` → product-foundation, `guidelines/**` →
  agent-workflow, content about browser-view): `guidelines/coding.md` (its *Applies to* names
  agent-workflow) and the new `guidelines/styleguide-browser-view.md` itself.
- **Trust boundary (step 4 answers):** the range touches no file of `assets/icons/**`,
  `assets/fonts/**` or `scripts/kitchen-sink.mjs`; it writes the part-map lines naming the last two,
  checked below. No irreversible operation.

## Findings

### Important

**I1 — the styleguide prescribes `highlight` for hover, which the meaning of `highlight` does not
cover (within the task; the task itself mandates both sides).**

- Place: `guidelines/styleguide-browser-view.md:167` ("hover — tło `highlight`, ramka bez zmiany"),
  against `guidelines/styleguide-browser-view.md:18` (`highlight` — "Ten wiersz albo tor jest
  zaznaczony.") and rule *Each role in its meaning* (`:45-56`); `foundations/decisions.md:801`
  (D-40: "`highlight` that this row or track is marked").
- What is wrong: rule *States of shared controls* tells Slice 6 to give every hovered control the
  background `highlight`. D-40, the Roles table and rule 1 allow `highlight` only in the meaning
  "this row or track is marked"; a button, select list or field under the pointer is neither a row
  nor a track. The merged styleguide thus contradicts itself: Slice 6 either builds the hover state
  as rule 6 says and every review under rule 1 finds a role used outside its decision, or it departs
  from rule 6. D-40's own *violates* example ("the button chosen in a group shown by the background
  `highlight` alone") shows the decision already reads `highlight` on a button as a wrong use.
- Why it matters: rule 1 is the styleguide's first required rule and the one review keeps
  (*Invariant* `none`); a contradiction between it and rule 6 leaves Slices 6 and 7 (controls and
  the kitchen-sink's hover samples) without a way to comply with both, and the next interface task
  inherits it.
- Source of the defect: the task's own settlements — Q12 ("pod kursorem — tło wyróżnione, bez
  zmiany ramki") against Q4 / row 3 ("tło wyróżnione — ten wiersz albo tor jest zaznaczony"). D-40
  is faithful to row 3; the styleguide is faithful to Q12. The slice cannot settle this alone.
- Evidence: reading of the three places above; no check compares meanings (template "Translated
  meanings").
- Way out, for the orchestrator: either D-40's meaning of `highlight` takes in the control under the
  pointer, with Q12 added to its *Origin* and the Roles row and rule 6 brought in line (a change of
  D-40 beyond row 3's wording, which the task document carries in Q12 — a WAY-30 question for the
  foundation step), or the conflict goes to the human as a question of the task. Rule 2's wording
  (M4) changes with whichever is chosen.

### Minor

**M1 — D-39's binding sentence holds "will".** `foundations/decisions.md:786`: "`warning` means
caution, that something will not be carried out". The decisions template, "Binding sentences":
"The words *should* and *will* … do not appear (WAY-05)". Present tense instead, e.g. "that
something is not carried out or is not saved".

**M2 — `browser-view-focus-outline` contradicts itself when read literally.**
`foundations/invariants.md:452`: outline is declared "only in rules whose selector is
`:focus-visible`", and then "only the rule of `src/browser/kitchen-sink/kitchen-sink.css` has one
more selector beside `:focus-visible`". A rule with the selector list `:focus-visible, <sample>` has
no selector that *is* `:focus-visible`, so the first clause forbids what the last presupposes. Spec
Decision 8 row 12 has the clean form ("only in a rule whose selector is `:focus-visible` — or, in
the kitchen-sink's stylesheet alone, `:focus-visible` with one more selector"). Slice 4's test
writer resolves it from the spec; the binding sentence should say the same.

**M3 — rule *No value in place of a design token* carries two choices no decision carries.**
`guidelines/styleguide-browser-view.md:102-103` (game text in the Geist stack, chronicle and clock in
the Geist Mono stack) and `:80-84` (each role is `--<rola>`; every other value a property named by
what it is for, never by a colour or a number alone). D-43, the rule's *Decision*, holds neither;
D-46, named inline, names the fonts but not where each is used (report 07, choice 7; report 08,
choice 4). `product-guidelines/template.md`: guidelines "hold no rule of their own: each binding rule
names … the decision … that carries its choice". Consequence: a later screen that puts Geist Mono
elsewhere, or a token named by its number, breaks a sentence of the styleguide with no decision to
compare it with or to change. Either text moves under `## Examples`, or the Geist Mono use joins
D-46 (Q11 carries it) — the orchestrator's call. Also, "krycie" in the list of non-role values at
`:83` has no member: the only opacity is the role `--depleted` (spec Decision 1).

**M4 — rule *Every background with its text* reads as overriding a button's text role on hover.**
`guidelines/styleguide-browser-view.md:65-69`: "element, któremu styl nadaje tło `page`, `panel`
albo `highlight`, dostaje kolor tekstu `text`". Under rule 6 a hovered destructive button gets
`highlight` while its text stays `danger`, and a hovered selected button keeps `text-strong`; the
sentence "Jego części o innym znaczeniu biorą swoją rolę tekstu" covers parts, not the element's own
text. Slice 6 writing `:hover { background: var(--highlight); color: var(--text) }` by this rule
would turn the destructive button's red off on hover. Reword so that an element whose role is
another text role keeps it on any of the three backgrounds (D-39, D-40 allow every text role on
all three). Changes together with I1.

**M5 — five invariants read `Method: test` with no test (WAY-61).** `foundations/invariants.md:444`,
`:454`, `:464`, `:474`, `:484`; the styleguide's *Invariant* fields name the same five
(`:75`, `:112`, `:133`, `:210`, `:246`). Invariants template, "Method and test": "An invariant whose
test is not written yet reads `review` (WAY-61)". The cycle read "the change" as the whole request
(FE-3), so the merged state is consistent provided Slices 3, 4 and 8 each bring their test; on every
intermediate commit a run gives these invariants no result (WAY-63). Not blocking under that
reading; it binds the later slices (see concerns).

**M6 — `design-token-sources` drops "directly".** `foundations/invariants.md:472`: each declaration
"is followed, on the line of the `;` that ends it, by a comment opening with `Source:`". Spec
Decisions 1 and 8 say *directly* after the `;`; as worded, `--a: 1; --b: 2; /* Source: … */` passes
for `--a`. Prettier puts one declaration per line, so no present risk; the sentence is looser than
the test the spec describes.

**M7 — D-43's *complies* example names a token not yet settled.** `foundations/decisions.md:852`:
`var(--space-8)`. Non-role token names are left to the maker of Slice 3 (spec *Left to the maker*);
the example either steers that naming or goes stale. A name-free wording ("a gap written through the
spacing scale's token") avoids it.

### Checked and found sound

- Roles table: 23 roles, names and kinds exactly Q18 with Q19 C; *Text on it* `text` for `page`,
  `panel`, `highlight` and `—` elsewhere; each *Decision* the right one of D-39/D-40/D-41; every
  meaning a faithful translation of its decision (read pair by pair).
- The nine required rules and two examples in the template's order, each rule with *Decision*,
  *Invariant*, *Good*, *Bad* in order; *Decision* fields as the template proposes (adopting decision
  D-38; WCAG D-42 and controls D-47 for visible focus; role decisions and D-42 for contrast);
  *Invariant* names for rules 3, 4, 5, 8, 9 and `none` for 1, 2, 6, 7; no token value, no fenced
  code, no test cases of rules; `## Where in code` the plan's three paths.
- Rule 6's states against Q12, Q19 B/C and FE-5; the departing controls named by the plan's module
  paths (C5).
- Rule 8's sources against To do 2 and spec Decision 1.
- Foundation entries against rows 1–20 and QA-4: every enumerated item present (exemptions of row 6,
  pairs of row 13 = Q22's list, nine text roles without `text-disabled`); *Verification* /
  *Derives from* links agree both ways (D-38 ↔ `design-token-sources`, D-39..D-42 ↔
  `design-token-contrast`, D-42 · D-47 ↔ `browser-view-focus-outline`, D-43 ↔
  `browser-view-token-values`, D-45 ↔ `application-build-kitchen-sink`); D-28's change carries
  row 10 only, and `guidelines/coding.md` follows it (the only other file naming D-28 is
  `coding.md:10`, unaffected).
- Environment facts: every quoted passage present in the sources (check 3 below).
- Part map: lines as the plan's *Foundation entries*; `assets/fonts/**` trust boundary at
  browser-view beside `assets/icons/**`; `scripts/kitchen-sink.mjs` boundary of build-tools (QA-3);
  External context row for github.com/vercel/geist-font, untrusted.
- Orchestrator's mechanical-check notes: confirmed. `check_instructions.py .` shows no styleguide
  warning because the root `AGENTS.md` does not name the file yet (executor's concern 1); the
  styleguide names seven distinct paths later slices create — the plan's three (`tokens.css`,
  `controls/`, `kitchen-sink/index.html`) and `styles.css`, `controls/button.ts`,
  `controls/select-list.ts`, `kitchen-sink/` — and
  `foundation_check.py` exits 1 with exactly the twelve pattern errors of the plan's table.

## Declined to judge

- The plan's order C2 (part-map lines before their files, twelve expected errors through Slice 8) —
  a process choice the orchestrator settled (Q-P1), not a property of this range's content.
- FE-4, the line `src/browser/AGENTS.md` beside the pattern `AGENTS.md` in agent-workflow — settled
  by the orchestrator; redundant at worst, no effect on any check.
- `browser-view-focus-outline` *Rests on* `wcag-focus-visible`: the styleguide template asks for it,
  while the invariants template (WAY-73) keeps a fact that is only a reason in the decision's
  *Based on* — a tension inside the-way's own templates, outside this task.
- The truth of the contrast pairs and of the token values — Slice 3's test and token file.
- The plan's dead-path expectation (warnings expected until Slice 7) — a plan text, already reported
  by the executor and the orchestrator; no effect on this range.

## Checks

| # | Command or manual check | Exit | Result |
|---|---|---|---|
| 1 | `python -B .the-way/elements/common/foundation_check.py` at `5ef77fc` | 1 | `12 errors`, line for line the plan's pattern table (report 07's list); no error at `guidelines/**` or in decisions, invariants, facts |
| 2 | `python -B .the-way/instruction-files/check_instructions.py .` | 0 | `0 error, 14 warn, 3 info` — the base's 14 warnings, none at the styleguide |
| 2b | `python -B .the-way/instruction-files/check_instructions.py . --file guidelines/styleguide-browser-view.md` | 0 | `0 error, 25 warn, 4 info`: the 14 plus 11 dead paths at `:80`, `:119`, `:159`, `:179`, `:185`, `:214`, `:250`, `:259`, `:285`, `:286`, `:287`, all files of Slices 3, 4, 6, 7; no at-import warning |
| 3 | Passage check: scratch script `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\1d1a68d6-a4ef-4c40-a07f-c510f1f4e29e\scratchpad\passages.py` over the *Source* passages of `wcag-text-contrast`, `wcag-non-text-contrast`, `wcag-focus-visible`, `wcag-contrast-ratio`, `geist-licence`, `css-colour-values`, against freshly downloaded https://www.w3.org/TR/2024/REC-WCAG22-20241212/, https://raw.githubusercontent.com/vercel/geist-font/d1d9ce6e929a35f0e24b7cd10573f17db58196a0/readme.md and https://www.w3.org/TR/2026/CRD-css-color-4-20261022/ (each HTTP 200), markup dropped, whitespace removed | 0 | 31 passages, 0 missing; control: the WCAG 2.0 constant `0.03928` in the luminance formula is absent from the page, so the check can say "absent" |
| 4 | Manual: role-by-role comparison of `## Roles` with Q18, Q19 C and D-39..D-41; rule order and fields against the styleguide template's *Required form*; entries against task rows 1–20 | — | as *Checked and found sound*; I1, M3, M4 found here |
| 5 | Grep of the added foundation lines for `should`, `will`, RFC 2119 capitals, `latest`, `newest` | 0 | one hit in a binding sentence: M1 |
| 6 | Grep of `tests/` for readers of the foundation or guidelines | 0 | only `test_application_package_layout.py` reads `foundations/part_map.md`; it passed in report 07 and the map's patterns did not change since |

Not run, with reason:

- `npm test` and the gate — the cycle's own run before the request; this range changes Markdown
  only, and `npm test` ends with `foundation_check.py`, which exits 1 by plan C2 until Slice 9.
- The five invariant tests — none exists yet (Slices 3, 4, 8).
- Screenshot evidence (WAY-219) — the range changes no user interface.
