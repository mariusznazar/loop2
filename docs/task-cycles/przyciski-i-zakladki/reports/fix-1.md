# Fix of the whole-change review's findings — task `przyciski-i-zakladki`

**Status:** `done`

- Variant: the fix of a review's findings (`.the-way/task-cycle/change/SKILL.md` and `fix.md`, pinned `f45ca40`, read whole; `git -C .the-way rev-parse HEAD` = the gitlink `f45ca40724251a46965aed69f733d0a35c430048`).
- Branch `claude/lucid-ptolemy-jl068t`, range `66120c8..d63a3ea`, not pushed.

## Commits and files

| Commit | Message | Files |
|---|---|---|
| `fed063c` | docs: :memo: let D-276 and the styleguide define a tab by its look alone, without limiting it to switching the states of a form | `foundations/decisions.md` +8 −9, `guidelines/styleguide-browser-view.md` +9 −9 |
| `d63a3ea` | docs: :memo: state in the rule on a shared control in two forms that a new section of a DOM screen may be built in DOM, as D-265 permits | `guidelines/coding-browser-module.md` +5 −4 |

Most of the changed lines are re-wrapping of the paragraph around the changed words. No other text in those paragraphs changed.

## Findings

### B1: fixed

- **D-276** (`foundations/decisions.md:5774`), changed through `the-way-record-decision` (`.the-way/elements/decisions/skill/SKILL.md`, its `read.md` and `decide_entry.md`, `template.md`, `elements/common/rules.md`, `elements/common/way_of_working.md`, `examples.md` → WAY-03 of the pinned the-way, each read whole), as `foundation_step.md` gives. The first binding sentence now reads: "A tab is a button selected in its group drawn without a frame, the chosen one with its text in `text-strong` and a line in `selected` at its bottom." The rest of the binding sentences stays as it was, and so do the fields, *Rationale* and *Rejected*. "The switch of the login card stands as tabs, and the pace buttons of D-130 keep the look …" still stands, from *To do* 3. The meaning, in the task's language: *zakładka to przycisk wybrany w grupie narysowany bez ramki, z linią w `selected` u wybranej; dziś jest nią przełącznik karty logowania, a przyciski tempa zostają przy wyglądzie przycisku wybranego.*
- **Step 4.4 of the decision skill** (a change of binding sentences reaches every decision that derives from the entry): D-277 is the only one (`derives from D-276`). Its binding sentence holds as it is. Its *Rationale* said "among the tabs of a form and on the menu bar alike", which repeated the dropped limit. It now says "among tabs and on the menu bar alike" (`foundations/decisions.md:5824`). This is outside the finding's text; it is named here under reaches. No invariant names D-276 in *Derives from*. The glossary has no entry for "tab" (the reviewer's search, repeated).
- **Styleguide** (`guidelines/styleguide-browser-view.md:345-347`), changed as the cycle's author of `the-way-maintain-styleguide` writes the files: „Zakładka (`kind: "tab"`) to przycisk wybrany w grupie narysowany bez ramki — dziś przełącznik „Zaloguj się” i „Załóż konto” karty logowania (D-276).” The rule still names D-276. By "A changed entry brings its rules along" (`product-guidelines/template.md`), I searched every rule naming D-276 (`:157`, `:205`, `:223`, `:295`, `:306`, `:324`, `:347`). None of them other than `:345` held the limit.
- **Check:** `grep -rn -i "tabs\? of a form\|form's tabs\|stany formularza\|states of a form\|zakładk[a-zę]* formularza" foundations guidelines src .claude AGENTS.md` returned no match (exit 1, as expected). Before the fix it matched `foundations/decisions.md:5774` and `guidelines/styleguide-browser-view.md:346`.

### B2: fixed

- `guidelines/coding-browser-module.md:139-141`, rule `### Wspólna kontrolka w dwóch postaciach`. The text now reads „Ekran, którego żadne zadanie nie przeniosło do Reacta, zostaje przy postaci DOM, a jego nową sekcję wolno zbudować w DOM (reguła *Nowy ekran i moduły w DOM*).” This is the reviewer's first wording. It gives the permission D-265 gives ("may be built too") and adds no reason (`product-guidelines/template.md`: "A rule carries no rationale").
- **Check:** `grep -rn -i "nowa sekcja\|nową sekcję\|new section" foundations/decisions.md guidelines src` now finds only permissions or compliant examples: D-265 `:5433`, `:5445`, `:5456`, and the guideline `:140`, `:150` (*Good*: a new section built in DOM, matching D-265's *complies*), `:160`. Nothing reads as an obligation.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, and again after both commits) | 0 (`0 errors`) |
| `python -B .the-way/instruction-files/check_instructions.py .`, on the edits and on `66120c8` with the edits stashed | 0 both. The only difference in output is the styleguide's word count, 3443 → 3439. |
| the two greps above | 1 and 0 (outputs as described) |

Not run:
- the product's gate `npm test` with no argument: the handoff and `SKILL.md` §3 leave it to the cycle;
- the code's tests, typecheck, ESLint and Prettier: no code or test file changed, only Markdown of the foundation and the guidelines, and no fenced block of the coding guidelines (the blocks invariant tests read) was touched.

## Own-work check

- Requirement most likely unmet: no other place in the foundation, the guidelines or the code still limits a tab to forms, or makes a new section of a DOM screen an obligation to stay in DOM. That is the same mismatch in a place the findings did not name.
- Check: the two greps above, over `foundations`, `guidelines`, `src`, `.claude` and `AGENTS.md`.
- Result: the only remaining trace was D-277's *Rationale* ("the tabs of a form"), fixed in `fed063c`. No other hit.

## Reaches beyond the dispatch

- D-277 (`foundations/decisions.md:5810-5829`), read whole and its *Rationale* edited. Why: step 4.4 of `the-way-record-decision` sends a change of D-276's binding sentences to every decision that derives from it.
- `.the-way/product-guidelines/template.md`, read whole, and `.the-way/product-guidelines/coding/SKILL.md`, read whole. Why: to know what the cycle's author's column requires when writing a guideline line ("no rationale in a rule", "A changed entry brings its rules along"). The discipline templates `product-guidelines/coding/template.md` and `product-guidelines/styleguide/template.md` were not read whole. The fix only removes a clause and rewords one phrase, and changes no section, field or required rule they govern.
- `git show 799d1ff:guidelines/coding-browser-module.md`. Why: to see the rule before slice 5. The phrase „także jego nowa sekcja” was added by slice 5.
- `.the-way/instruction-files/check_instructions.py`. Why: the guidelines are named by the root `AGENTS.md` and read as instruction files.

## Searches not found or unclear

- `foundations/glossary.md` has no entry for "tab"/„zakładka”. Left to the return step, as the review gives.
- `src/browser/view/game-saver.ts` stands as `do not copy` in the coding guidelines' table, but it is not one of the 17 files of the task's *Context*. It already had that status at `799d1ff`, so this range did not set it. This is not a finding of mine; I note it because the count in *To do* 10 is 17 while the table holds 18 `do not copy` rows.
- D-276's and D-277's *Origin* name `zadanie_hierarchia_przyciskow_i_karta_logowania.md`, while the frozen task is titled „Ustalić wygląd przycisków głównych i zakładek …”. I did not check whether the vault file carries that name: the vault is outside this container. Not changed.

## Choices

- Two commits, one per finding, rather than one. If wrong, the cost is none beyond history granularity.
- B2 takes the reviewer's first wording, a permission that points to the new rule, not the deletion of „także jego nowa sekcja”. Deleting the phrase alone would leave the rule on controls silent on new sections, and a reader would only find the permission in the next rule. The rejected way costs nothing to switch to later.
- D-277's *Rationale* edit is the narrowest wording that drops "of a form". If the orchestrator holds rationale prose outside the finding, it can be reverted with no effect on any binding part.
