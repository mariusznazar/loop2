# Report — Return step, task `przyciski-i-zakladki`

**Status:** done with concerns. One concern: I wrote no glossary entry „tab”, against the recommendation of three agents, because the form they recommend cannot be written (see *„tab”* below). It does not block the request; it needs one line in the request for the human.

## Commits

- `9f4e5bb` — docs: :memo: write the HTML and DOM elements of D-265, D-276 and D-278 with their qualifier, apart from the word of the process. On `claude/lucid-ptolemy-jl068t`, on `88d341b`; not pushed.
- Files: `foundations/decisions.md` +11 −11. By words the commit adds „DOM” twice and „HTML” twice and turns „in DOM” into „DOM elements” in one *Rationale*; the rest is rewrapping at 100 columns. No binding meaning moves.
- Range for the reviewer: `88d341b..9f4e5bb`.

## For the record's *Return step*

- **Foundation compared with code:** nothing no longer matched the code. One thing did not match a rule of the foundation: the change used „element” bare for an HTML element in five places, corrected in `9f4e5bb` (below). The comparison, entry by entry, is in *Comparison*.
- **Decisions written or changed:** D-265, D-276 and D-278, wording only, through `the-way-record-decision`.
- **Invariants written or changed:** none.
- **Environment facts:** none.
- **Glossary terms:** none. „tab”, „main button” and „secondary action” judged, each takes no entry (below).
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none, as expected.
- **Rows of *Settlements to record* written:** none by this step; none was missed. Rows 1–5 and 8 stand as D-274, D-275, D-276, D-277, D-278 and D-279, row 6 is tied to D-44, row 7 to D-265.

## Meaning of the entries touched, in Polish

The meaning of each is unchanged. For the request:

- **D-265:** Nowy ekran nie powstaje na wzór modułu budującego elementy DOM przez API DOM, choć wolno mu importować jego czyste funkcje, a nową sekcję ekranu, który jeszcze jest w DOM, wolno zbudować w DOM — przechodzi do Reacta razem z tym ekranem.
- **D-276:** Zakładka to przycisk wybrany w grupie narysowany bez ramki, wybrana z mocnym tekstem i linią w `selected` u dołu; element HTML, `aria-pressed` i klawiatura zostają jak przy przycisku wybranym w grupie, bez strzałek.
- **D-278:** Górny brzeg karty logowania stoi w 15% wysokości okna, cokolwiek karta zawiera; nowy element HTML z własnym tłem pozostaje odrzuconym sposobem na rozwijanie wzmianek.

## The correction: „element”

The glossary of the-way holds „element” (a division of a foundation). WAY-104 says a word of the product's domain that this glossary holds is written in the product's `foundations/` with a qualifier, and the bare word keeps the meaning of the process. The return step corrects a term used against its entry.

The change wrote the bare word for an HTML element in D-265 (binding sentence, *Verification*, *Rationale*), in D-276's binding sentence and in D-278's *Rejected*. Those five are now „DOM elements” or „HTML element”, as D-47 and D-265 already say elsewhere.

Left, because the change does not use them: bare „element” in D-36 (line 794), D-47 (heading and *Rationale*, lines 957 and 969) and D-268 (line 5550). They predate this task.

Also looked at and left: the last words of the-way's terms in new text — „action”, „sentence”, „part of it”, „test”, „check”. Each stands in plain English or in a phrase that bounds it, and the log uses them so throughout. I did not read WAY-104's „last word” limb as reaching them.

## „tab”

**Result:** no entry. The three agents recommended an entry whose *Not:* names a browser tab and WAI-ARIA tabs. That form is not open:

1. *Not* never names a meaning a reader who knows the field gives the word (`.the-way/elements/glossary/template.md:70-73`, skill step 3, WAY-94's *Rejected*: „a reader's meaning in *Not* — the reader brings it along”). A browser tab and the tabs of WAI-ARIA are both such meanings.
2. A *Not* of `none` does not rescue the entry. The test for an entry (WAY-95) and the test for a renaming (WAY-99) are one predicate: a meaning a reader of the field would not give. Writing the entry states that the look is such a meaning. Then the word carries two meanings in the files git tracks, and WAY-99 and the template require one of them renamed, the human choosing the word, „a note beside the word … is no renaming”.

So two coherent outcomes exist: no entry, or an entry with a renaming.

**The uses** (`git grep -i -w -E 'tabs?'`, every use read):

| Meaning | Where | Lines |
|---|---|---|
| A button of a group drawn as a tab | D-276, D-277, D-40 *Verification*; styleguide; `styles.css`, `button.ts`, `react-button.tsx`, `account-card.tsx`, `kitchen-sink.ts`, `react-controls.test.mjs`, `tokens.css:70` | 20 of the 72 lines of `decisions.md` |
| A browser tab | the other 52 lines of `decisions.md` (lines 469-470, D-97, D-207–D-211 and nearby), `environment_facts.md`, code comments, tests | 52 of 72 |
| The key Tab | D-276, styleguide | inside the look's lines |
| A tab character | `invariants.md:491`, three files of `tests/invariants/` | none in the log |
| The tabs of WAI-ARIA | D-276 („the roles of tabs”, *Rationale*, *Rejected* „real tabs”), styleguide (`role="tab"`) | inside the look's lines |

**Why no entry.** After fix B1 the definition in D-276 is a look: a row of buttons, the chosen one marked by a line at its bottom. A reader of the field calls that a tab; the task's own research separates the look from the semantics in those words („The role says "toggle" while the look would say "tab"”, `.runs/styleguide/browser-view/tabs-semantics-and-look.md:81`). What differs from a reader's expectation is how the thing is built, and D-276's binding sentence says that outright („with neither arrow keys nor the roles of tabs”). That is the work of a decision, not of a glossary. Template: „A word whose every meaning is one such a reader gives takes none, however many meanings it has”.

The evidence against stands in the foundation and I weigh it as real: D-276's *Rationale* („A tab here names a look, not the tabs of WAI-ARIA”; „a reader who knows the tabs of WAI-ARIA finds pressed buttons under that name”) and pytanie 2a („„zakładka” w wytycznych znaczy wygląd”). This is a judgement, not a reading off.

**The reckoning**

| Way | What happens | Cost |
|---|---|---|
| No entry (taken) | No file changes. D-276's binding sentence stays the one place that says what a tab is. | A reader who starts from D-277 or the styleguide without D-276 may expect `role="tab"`; D-277 cites D-276 and the styleguide repeats the rule. |
| Entry and a renaming, browser tab moves | A new word for a browser tab in 52 lines of the log, in D-97 and D-207–D-211 among them, each through `the-way-record-decision`, plus code comments and tests. | The largest; no use of it was misread; the word is the human's, so the request waits, since `TODO` in *Not* may not reach the main branch. |
| Entry and a renaming, the look moves | A new word in place of the human's „zakładka”, in reviewed code (`kind: "tab"`, `.tabs`), tests, styleguide, D-276, D-277, D-40. | Rewrites reviewed work and needs the human's word; the same wait. |
| Entry with *Not: none* and no renaming | Three lines in the glossary. | Breaks WAY-99 as written. The glossary term „copy” already lives so beside the status `copy` of the coding guidelines, a precedent but not a permission. |

If the word turns out to be misread in later work, an entry and a renaming stay open then at the same price.

**For the request.** The skill says of a word that takes no entry: show the human why, with the uses. I recommend one line under *What the foundation puts in front of the human at the merge*, for example: „Słowo „tab” nie dostaje wpisu w słowniku: w D-276 znaczy wygląd zakładki, który czytelnik z branży tak nazywa, a różnicę wobec zakładek WAI-ARIA mówi samo zdanie wiążące; wpis wymagałby przemianowania jednego z dwóch znaczeń, czyli 52 linii o karcie przeglądarki albo przeglądniętego kodu”.

## „secondary action” and „main button”

Both take no entry.

- **„main button”:** every use stands with its form („the main button of a form”, „a form's main button”) or inside D-274, and a reader gives that the button that sends the form.
- **„secondary action”:** a reader's secondary action is any lesser action; D-275 bounds it to an action that opens or leaves a state of a form and stands under it. That is a narrowing of the reader's meaning, stated in the sentence that uses the word, and D-44 cites D-275 at the word. WAY-95 rejects moving a definition out of the sentence that says it. An entry would also meet the same two-meanings rule as „tab”: D-275's *Rejected* („wherever an action is secondary”) and the styleguide (`:343`, „choćby poboczne”) use the reader's meaning.

The status `copy` / `do not copy` predates this task, stands in the guidelines and comes from the-way's template; left, as the handoff notes.

## Comparison

| Entry | Compared with | Result |
|---|---|---|
| D-274 | `styles.css:177-181`, `:248-251`, `.button:hover`; `button.ts`; `react-button.tsx`; every `submit` in `src/browser` | matches; only the card's forms and the kitchen-sink samples have one, one to a form |
| D-275 | `styles.css` `.button.secondary`; `account-card.tsx:314, 447, 520`; `kind` in both forms | matches; a button, no address |
| D-276 | `styles.css:212-233`, `:254`; both forms; `account-card.tsx:591-610`; `status-row.ts:227` | matches; the pace buttons stay on `setButtonSelected` without `kind: "tab"` |
| D-277 | the code holds no menu bar; `guidelines/styleguide-browser-view.md:354` | no code to compare; the entry is one no code makes true yet, as row 4 allows |
| D-278 | `styles.css` `.account-card-screen`, comment at `:333-336`; slice 2's measurement | matches |
| D-279 | every `border*` declaration of `styles.css` | matches, see below |
| D-40 | `.button.selected`, `.button.tab.selected` | matches; binding sentences unchanged |
| D-44 | list of controls; `.form-note`; kitchen-sink | matches; no text in the foundation, guidelines or stylesheet still says six controls |
| D-222 | `.form-note`, `account-card.tsx:258` | matches |
| D-265 | both forms, `tests/view/react-controls.test.mjs` | matches; wording corrected for „element” |
| D-39, D-42, D-43, D-45, D-47, D-48, D-96, D-259, D-260, D-269, D-272 | the code of the change; invariants browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources | match; `15vh` and `calc` hold under D-43, no new token, no `outline`, no `positive` at the answer |
| Part map: `browser-view`, `agent-workflow`, `product-foundation` | `git diff --name-status 799d1ff d63a3ea` | every path is `M`, no file added, no dependency added; no change |

**D-279 and two lines in other colours.** A literal reader might take these against D-279; I judge neither a collision. The hovered row's line in `link-highlight` (`styles.css:874-876`) marks a place, has its role and meaning from D-41, and sets no text apart. The destructive button (`styles.css:160-162`) changes only its text's colour and keeps the frame in `control-border`, which says that it can be clicked. D-279 covers a frame or bar drawn to set a text apart, so neither falls under it.

**Environment facts.** None written. W3C, Carbon, GOV.UK and NN/g stand in *Rejected* or among accepted costs of D-44, D-274, D-276 and D-277. Each decision rests on the task's choice and on D-42, so none of those sources, if it stopped saying so, would call a decision into question. *Based on* stays `none` (`elements/environment-facts/template.md`, „Which facts are written”).

**Choices that bind after the merge.** The rows Q1–Q9 and P1–P8 of `cycle.md` end with the work or stand in the styleguide. None takes a decision.

**Invariants.** None written: the task, the decisions and the human set no new rule that takes one.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at `88d341b`, before any change | 0 | `0 errors` |
| same, after the edit, same tree as `9f4e5bb` | 0 | `0 errors` |
| `git diff 799d1ff -- foundations/decisions.md \| grep -E '^\+.*\belements?\b'` | 0 | six added lines hit, each now qualified; line 5455 continues „DOM” from the line above |
| `git diff --word-diff=porcelain 88d341b 9f4e5bb -- foundations/decisions.md` | 0 | only „DOM”, „HTML” and the one *Rationale* phrase changed |

Not run: the product's gate (`npm test`), which the handoff excludes. The commit touches only `foundations/decisions.md`; the code tree is that of `d63a3ea`, whose gate ended with exit 0 (`reports/gate-1.log`).

## Own-work check

- **Requirement most likely not met:** the return step's „whatever no longer matches” for a text the agents before me did not look for. They compared with the code and with the product's glossary; none read the new text against the-way's glossary.
- **Check:** the headings of `.the-way/foundations/glossary.md` searched in the added lines of the change: `gate`, `slice`, `surface`, `debt`, `step`, `flow`, `exemplar`, `orchestrator`, `interface`, then `element`, `foundation`, `guideline`, `invariant`, `entry`, `part`, in each form. A first run of the second search returned nothing because `-o` with `-w` could not match; with a positive control (39 added lines hold „text”) and without `-w` it returned eight hits.
- **Showed:** „element” used against its entry (corrected); „exemplar” in its own meaning; „part” three times in plain English („on part of a screen”, „a dark part of a light page”, „is part of it”); „entry” in the process's meaning, or qualified as „colour entries”. No other hit in a domain meaning.

## Reaches beyond the handoff

- `.the-way/task-cycle/skill/SKILL.md:176-205`, `:333-340`, `:405-425`: how a status and a question return, and what the request holds.
- `.the-way/foundations/decisions.md`: WAY-94, WAY-95, WAY-99, WAY-104, and `.the-way/foundations/glossary.md`: the template cites them and the case turned on their exact words.
- `.the-way/elements/decisions/template.md`, `read.md`, `decide_entry.md`, and `.claude/skills/the-way-record-decision/SKILL.md`: the edit of three decisions. I first read the decision skill from the main checkout `C:\Storage\repos\loop2\.the-way`; `git rev-parse HEAD` there shows the same commit `f45ca40`, and I read the rest from the worktree.
- `.the-way/elements/environment-facts/template.md:45-75`, `skill/decide_entry.md`: whether a source takes a fact.
- `C:\Storage\repos\loop2\.runs\styleguide\browser-view\tabs-semantics-and-look.md:1-90`, in the main checkout, ignored by git: what the field's sources call a tab.
- D-41 (found through the hovered row's line), D-130 (first lines), the four invariants above, `guidelines/styleguide-browser-view.md:318-373`, and the code named in *Comparison*.
- `reports/planner.md`, `reports/foundation-entries.md`, `reports/whole-review.md`, `cycle.md`.

## Searches not found or unclear

- What „a reader who knows the product's field” takes „tab” to mean: unclear. The field's sources use it for the look and for the WAI-ARIA pattern alike. My answer is a judgement.
- The rule of when two uses carry two meanings stands in the glossary template with `TODO — decision pending`; its sentence is all there is.
- WAY-99 read literally also reaches words the glossary already holds beside a plain meaning („copy”, „practice”, as in „in practice” in D-273). No entry or decision says how those stand. A note for the-way's owner rather than this request.
- How far WAY-104's „last word of a term” reaches in plain English use: unclear, see *The correction*.
- A menu bar in the code: none, as the task says it comes with task 4.

## Choices, with the way rejected and the cost if wrong

- **No entry „tab”.** Rejected and costs: *„tab”* above. If wrong, the human says so at the merge and a renaming follows in a correction.
- **No entry „secondary action”.** Rejected: an entry from D-275's binding sentence — three lines, but it brings the two-meanings question and rewording of D-275's *Rejected* and the styleguide. If wrong: an agent draws a lesser action on a later screen as underlined text; D-275's *Verification* names the case and review catches it.
- **„DOM elements” in D-265, „HTML element” in D-276 and D-278.** Each takes the qualifier its neighbours use (D-265's „DOM elements”, D-47's „HTML element”). Rejected: reading „builds its elements through the DOM APIs” as qualified by its phrase — it leaves „keeps the element” and two more uses bare, for a fix of one word each. If wrong: a commit that one review reads for nothing.
- **Older bare „element” left.** Rejected: correcting D-36, D-47 and D-268 too — the change does not use those sentences.

## Questions

None for the human by `foundation_step.md`: I have a recommendation and no entry changes an approved meaning. For the orchestrator: whether to carry the line on „tab” into the request, which I recommend.

## Problems observed

None.

## Fix 2

The review of `9f4e5bb` returned `FAIL` with one blocking finding: „secondary action” takes a glossary entry. I accept the finding. This section stands above what is written above on that word.

- **Commit:** `ebd96c2`, `foundations/glossary.md` +7 −0.
- **Glossary terms:** `secondary action`, new, *Not* `none`.
- **Meaning, in Polish, for the request:** Akcja poboczna to wyłącznie działanie widoku w przeglądarce, które otwiera albo opuszcza stan formularza i stoi pod tym formularzem — przycisk narysowany jako podkreślony tekst bez ramki, a nie każde mniej ważne działanie.
- **Unchanged judgements:** „tab” and „main button” take no entry; the review holds both.
- **Report of the fix:** `C:\Storage\repos\loop2\.runs\worktrees\przyciski-i-zakladki\.runs\task-cycles\przyciski-i-zakladki\reports\fix-2.md`.
