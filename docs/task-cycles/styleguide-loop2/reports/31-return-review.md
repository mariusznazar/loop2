PASS 464187d4b84964850e633c52978de9afb68f8085

# Review 31 — the return step (cycle step 11)

- **Reviewed:** the return step's commits, `b33aa2761e00fef538c569dc5860ecef4dd28e62..464187d4b84964850e633c52978de9afb68f8085`
  (one commit, `464187d`, "docs: bring the styleguide foundation in line with its code in the
  return step"; 8 files, +56/−28). `git rev-parse HEAD` in the worktree = `464187d4…` (given head);
  branch `task/styleguide-loop2`; worktree clean before and after the review.
- **Method:** project skill `the-way-review-change` → `.the-way/task-cycle/review/SKILL.md` at the
  pin `f0b2130` (gitlink = `git -C .the-way rev-parse HEAD`), against step 11 of
  `.the-way/task-cycle/skill/SKILL.md`, read whole. No subagent.
- **Read:** handoff 31; frozen `task.md` whole; `spec.md` Decisions 1 and "Foundation entries";
  `cycle.md` *Events* and the questions table; `reports/30-return-report.md` whole;
  `reports/29-whole-review.md` (counts, findings 1–30, fixed); `AGENTS.md`; guidelines selected by
  `.the-way/product-guidelines/reading.md` for the touched parts (product-foundation,
  agent-workflow, browser-view, build-tools): `guidelines/styleguide-browser-view.md` whole (the
  only guideline the range changes; `guidelines/coding.md` applies to these parts but the range
  changes no code beyond three docstrings); `foundations/part_map.md` whole; D-25, D-38..D-48 whole;
  invariants `browser-view-token-values`, `browser-view-focus-outline`, `design-token-sources`,
  `walk-target`; the changed facts; the-way's glossary term list and the product's glossary term
  list; templates of decisions (*Origin*, WAY-36), invariants (*Method and test*, *The sentence*,
  *Links*), environment facts (*Which facts are written*, *The sentence*, *Source*), part map
  (responsibility sentence), guidelines (*Decision* field), styleguide (rule list).
- **Trust boundary / irreversible operation (step 4):** the range touches no file of
  `assets/icons/**`, `assets/fonts/**` or `scripts/kitchen-sink.mjs` (`git diff --stat`); no
  irreversible operation.

## Counts

blocking 0 · Minor 3 · out of scope 1 (the one line of *Declined to judge*)

## Findings

### Critical

none

### Important

none

### Minor

**M1 — D-46's new binding clause "every other text in Geist" is contradicted by the status line's
activity text.** `foundations/decisions.md`, D-46 binding sentence: "…and sets the chronicle and the
clock of the map run in Geist Mono and every other text in Geist." In code, the one rule setting
Geist Mono is `.status-text` (`src/browser/styles.css:184-189`, its comment "The run's clock: the
minute of the map run and what the character does"), and that element holds
`` `Minuta ${run.minute} · ${activityText(run.current.activity)}…` `` (`src/browser/view/status-row.ts:19-21`):
the character's activity ("what the character does") stands in Geist Mono beside the minute. Read
literally, the activity text is "other text" set in Mono, so the decision this range writes does
not say what the code does (step 11: entries corrected to match the code, WAY-11). Q11 gives only
„Geist Mono dla kroniki i zegara przejścia”; "every other text in Geist" is the author's
completion of it. Effect on the player: none today. Effect on later work: a reviewer applying
D-46 literally flags the status line, or an agent moves the activity out of Mono, with no human
choice behind either. Fix (wording only): name what the code sets — "the chronicle and the status
line of the map run, its minute and the character's activity, in Geist Mono" — or drop the
exclusivity clause and leave "every other text in Geist" to the styleguide's sentence
(`guidelines/styleguide-browser-view.md:105-106`), which says the same and has the same gap.
Evidence: `grep -rn font-family src/browser` → only `styles.css:18` (`--font-family-text`, body)
and `styles.css:188` (`--font-family-mono`, `.status-text`).

**M2 — D-48's *Origin* points to Q18, which carries only its first clause.** `foundations/decisions.md`,
D-48 *Origin*: "…§ Questions to settle, "Q18. Jak nazywają się role w kodzie i czy jakieś
odstępstwa zostają celowo?"". Q18 names the roles in code (`page` … `tile-edge`) and says there
are no deliberate exceptions; it says nothing of how the other tokens are named. The second clause
— "every other value of appearance is a custom property named by what it is for, never by its
colour or by its number alone" — is the cycle's choice in spec Decision 1 (`spec.md:84-89`), not a
human answer; the return report says so itself (*Choices* 1; *Concerns* 4: "D-48 (new, from spec
Decision 1, not from a row)"). The decisions template: "*Origin* points to where the full
reasoning lives … never to anything deleted when its task closes" — so the spec cannot be cited,
and the reasoning of the second clause lives in the entry's own *Rationale*. As written, a reader
who follows *Origin* to change the naming rule finds a human answer that does not contain it and
takes the rule for the human's. Writing the cycle choice as a decision is right (step 11, WAY-36:
it binds after the merge); only the attribution is loose. Fix: *Origin* naming Q18 for the role
names alone (e.g. "… Q18 …, for the names of the roles"), the rest being in the entry. The request
names D-48 as the cycle's choice, as concern 4 of report 30 already plans.

**M3 — carried, outside this range's diff: D-41 as corrected here still departs from the code on
hover over an unrevealed tile (S4-m1 of review 18, finding 7 of review 29).** D-41 (reworded in this
range): "`link-highlight` means that this tile and this row of the list of revealed tiles are the
same place". `src/browser/view/terrain-panel.ts:80-82` keeps the points of every tile, so hovering a
hidden tile draws the `link-highlight` line around a tile that has no row. The return step
compared D-41 with the code, kept the entry (Q7, Q10, D-19 carry no exception — I agree: rewriting
D-41 to allow the line on a hidden tile would invent an exception no human set) and left the code,
since changing it is product behaviour outside the step (report 30, *Concerns* 1). I grade it Minor
by its effect, as review 29 did: transient, nothing is done wrongly, the base did the same. It is
listed here because after this step the decision and the code still disagree and the next
dispatch has to choose: the one-line fix (only revealed tiles in `tilePoints`) with its review
before the request, or the request naming it as a known departure from D-41.

## Checked and found matching (no finding)

- **D-39** — "is not carried out" (present tense, decisions template "Binding sentences") and "a
  wrong value typed into a field" in the binding sentence, *Verification* and *Rejected*; meaning
  as Q3 and Q19 B and row 2; the-way's glossary term *entry* no longer used for a field's value.
- **D-41** — "the target of its current move": the dashed outline is drawn on
  `run.current.stepTo` (`src/browser/view/terrain-picture.ts:78-82`), the neighbouring tile of the
  move D-25 defines ("A move onto a neighbouring tile is an ordinary action"); meaning unchanged.
  The Polish styleguide keeps „cel kroku” (`styleguide-browser-view.md:32`), which carries no
  the-way term — no mismatch.
- **D-43** — `var(--space-s)`: `--space-s` exists (`src/browser/tokens.css:62`).
- **D-46** — Geist Mono placement taken from Q11 and To do 6; the complying example (clock in the
  status row in Mono) matches `styles.css:184-189`; the violating example (panel headings in Mono)
  matches no code. See M1 for the exclusivity clause.
- **D-48** — every one of the 23 roles of the styleguide's Roles table is `--<role>` in
  `tokens.css:11-41`; the 30 other properties (`tokens.css:44-76`) are named by purpose
  (`--font-family-text`, `--font-size-label`, `--space-2xs`…`--space-2xl`, `--frame-width`,
  `--step-target-dash`, `--focus-offset`, …), none by a colour or a number alone; complying
  examples exist, violating ones do not. Not carried by the styleguide template (its *Role* rule
  covers roles only, `.the-way/product-guidelines/styleguide/template.md:79-80`), so a decision of
  its own is warranted; *Relations* "derives from D-38" fits. The styleguide rule "No value in
  place of a design token" may name several decisions (guidelines template: "at least one").
- **`browser-view-focus-outline`** — the new sentence is exactly what
  `tests/invariants/test_browser_view_focus_outline.py:75-88` checks (plain `:focus-visible`
  everywhere; a two-selector list with `:focus-visible` only in `kitchen-sink.css`; each allowed
  rule drawing `outline`/`outline-color` from `var(--focus)`; `styles.css` holding the plain rule),
  and it no longer forbids in its first clause what its last clause allows. It agrees with D-47 and
  row 12. The docstring quotes the sentence word for word.
- **`design-token-sources`** — "with nothing but spaces or tabs between" is the test's reading
  (`test_design_token_sources.py:18-19`); docstring quotes the sentence word for word.
- **`browser-view-token-values`** — *Rests on* now names the two facts holding which identifiers
  of a `font-family` value are keywords, not font names (invariants template, *Links*: a fact
  holding a condition that decides whether a commit makes the sentence true). Test lists
  (`test_browser_view_token_values.py:124-127`) equal the facts' lists (11 generic keywords, 5
  CSS-wide keywords; the `generic()` functions left out by the test as the fact names them).
- **`css-font-family-names`, `css-wide-keywords`** — every quoted passage is a substring of the
  page's text (markup dropped, whitespace collapsed) at the cited address, and each cited heading
  exists (§ 2.1, 2.1.1, 2.1.2 of CSS Fonts 4 WD 2026-10-22; § 7.3, 7.3.1–7.3.5 of CSS Cascade 5 CR
  2022-01-13); sentences say no more than the passages; identifiers name the subject, not the
  edition; two documents, two entries (WAY-76). The test's docstring cites CSS Fonts 4 § 2.1.5
  ("Generic font families"), the fact § 2.1.2 (its grammar); both sections exist and list the same
  keywords — no defect.
- **`geist-licence`** — `refs/tags/v1.8.2` → `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4` (GitHub API);
  the readme at that commit holds the heading "Geist Sans, Geist Mono & Geist Pixel" (its second
  heading, line 8) and the licence sentence; it is byte-identical to the readme at `d1d9ce6`
  (`cmp` exit 0), so the sentence stands.
- **Part map** — the widened `browser-view` and `build-tools` sentences match the files each part
  already claims (`src/browser/kitchen-sink/**`; `scripts/**` holding `scripts/kitchen-sink.mjs`,
  `tsconfig.kitchen-sink.json`); one sentence each; *Files*, *Depends on*, *Trust boundary*
  unchanged.
- **S6-m3 (report 30, *Concerns* 2)** — I agree with the author's reading: Q4 („ramka kontrolki —
  to da się kliknąć albo wpisać”) and Q12 („wyłączony (tekst wyłączony)”) are both the human's, and
  Q12 changes only the text of a disabled control; D-40 and the code agree with both. No entry is
  owed; whether the human reads the frame otherwise is a question for the request.
- **S1-M3's sub-point "krycie" (`styleguide-browser-view.md:86`)** — the sentence lists opacity
  among the kinds of non-role tokens though today the only opacity is the role `depleted`; a rule
  naming a kind with no member yet binds the next one and is not wrong. No finding.
- **Step 11's limits** — no invariant written for behaviour merely uncovered; the three invariant
  changes are wording and *Rests on* of rules set by D-42/D-47/row 12, D-38/row 14 and D-43/row 11.
  No review finding turned into an entry for being a finding: each change answers an entry–code
  or entry–source mismatch. No glossary entry owed: *entry* and *step* rewritten out of the
  decisions; "control", "role", "move" carry the meaning a reader of the field gives them; no
  product glossary term used against its entry in the changed text.
- **Line endings and author** — `git ls-files --eol`: `foundations/*` `i/lf w/crlf`, the others
  `i/lf w/lf`; numstat counts are the small diffs above, no whole-file churn. Author
  `<private address>`.
- **Report 30's own-work check** — it named the requirement most likely missed (sources as facts)
  and checked the URLs the change added; that check would catch a missing fact. It did not compare
  the new binding clauses' wording with the exact code (where M1 lies).

## Declined to judge

- The code and test findings of review 29 that no entry of this range carries (S4-m2..S4-m5,
  S5-m1, S6-m1, S6-m2, S6-m4, S7-m1..S7-m3, S8-M1, S8-M2, S9-m1..S9-m3, README „bursztynowy”,
  finding 24 „Menu”) — outside this range's commits; they reach the request's lists from review 29.

## Checks

Logs in `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\1d1a68d6-a4ef-4c40-a07f-c510f1f4e29e\scratchpad\r31\`.

| # | Command or method | Exit | Result |
|---|---|---|---|
| 1 | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | `464187d4…` = given head; pin `f0b2130` = gitlink |
| 2 | `git log` / `git diff b33aa27..464187d` (and `--stat`, `--numstat`) | 0 | one commit, 8 files as report 30 lists |
| 3 | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| 4 | `python -B -m unittest discover -s tests/invariants -p test_browser_view_token_values.py` | 0 | 4 tests OK |
| 5 | `… -p test_browser_view_focus_outline.py` | 0 | 3 tests OK |
| 6 | `… -p test_design_token_sources.py` | 0 | 2 tests OK |
| 7 | `… -p test_design_token_contrast.py` | 0 | 3 tests OK |
| 8 | `… -p test_application_package_layout.py` (reads `part_map.md`) | 0 | 1 test OK |
| 9 | `python -B .the-way/instruction-files/check_instructions.py .` | 0 | `0 error, 14 warn, 6 info` (the base's) |
| 10 | `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK |
| 11 | `python -B .the-way/gate/run_tests.py tests/agent_workflow` | 0 | 5 tests OK |
| 12 | `curl` of the CSS Fonts 4 WD, CSS Cascade 5 CR, readme at `1d6dfdb`, GitHub ref of `v1.8.2` (each 200), then `python -I check.py` (scratchpad): each quoted passage and heading a substring of the page's text, markup dropped, whitespace collapsed; positive control: a made-up passage | 0 | 17 of 17 present; the control reported MISSING |
| 13 | `curl` readme at `d1d9ce6` (200); `cmp` with the readme at `1d6dfdb` | 0 | identical |
| 14 | `git grep` for the old wordings (`target of its step`, `wrong entry`, `space-8`, `only the rule of`, `will not be carried`, `d1d9ce6`) outside `.the-way` | 0 | only D-48's violating example `--space-8` |
| 15 | `git grep` for `D-48`, `css-font-family-names`, `css-wide-keywords` | 0 | cited where report 30 says (styleguide `:77`, `:87`; *Rests on*; test docstring) |
| 16 | Manual: `grep -rn font-family src/browser` and reading `styles.css:175-190`, `status-row.ts:19-21` | — | M1 |
| 17 | Manual: `tokens.css` custom properties against the Roles table and D-48 | — | 23 roles, 30 purpose-named values |
| 18 | `git ls-files --eol` of the changed files; `git status --short` after all checks | 0 | endings as above; worktree clean |

Not run, with reason:

- `npm test` as a whole — the cycle's own run before the request (`review-change` §2); the gate on
  `b33aa27` predates `464187d`.
- A failing run of the three invariant tests — no test code changed in the range (docstrings
  only), so no new condition to see fail.
- Whether a later snapshot of CSS Cascade 5 than the 2022 CR lists another CSS-wide keyword
  (report 30, *Concerns* 6) — the fact states what the cited edition says, which I verified; the
  currency of the edition is unverified here too.
