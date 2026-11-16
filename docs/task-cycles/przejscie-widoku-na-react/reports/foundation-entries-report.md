# Report — the agent of the plan's Foundation entries

**Status:** done with concerns (the foundation check stays red until the later slices remove the deleted test's citations; see Checks).

**Commit:** `e3a58f458fd16cb9bc8840d12803bc65f7785d9f` on `task/przejscie-widoku-na-react` (base `d850f76063c1f7a302b89d0b89e1fca72682be6d`). One file changed: `foundations/decisions.md` (83 lines added, 81 removed). Committed with `git add foundations/decisions.md`, no push, no amend.

## The nine entries

Each entry follows `.the-way/elements/decisions/skill/SKILL.md` and the template's "Changing a decision": edited in place, current wording only.

| # | Identifier | Mark | Meaning in English | Znaczenie po polsku |
|---|---|---|---|---|
| 1 | D-269 | `row 1` (its precision, *Based on* weighed, `the cycle's`) | The kitchen-sink page holds React: its build step bundles it as the game's code is bundled, it shows each shared control in its React form, and a change of how it is built never touches the lines that serve files. | Strona wzorcowa kontrolek zawiera Reacta: jej krok budowania składa ją w paczkę tak jak kod gry, pokazuje każdą wspólną kontrolkę w postaci Reacta, a zmiana sposobu budowania nigdy nie rusza linii podających pliki. |
| 2 | D-265 | `row 2` | Each shared control has one form, a React component, and the panel in place of a card React took down is built outside React from one constant of the tag, classes and role that the component of the warning sentence reads too. | Każda wspólna kontrolka ma jedną postać, komponent Reacta, a panel w miejscu karty zdjętej przez React powstaje poza Reactem ze znacznika, klas i roli z jednej stałej, którą czyta też komponent zdania ostrzeżenia. |
| 3 | D-407 | `row 3` for the first paragraph; `the cycle's` for the second paragraph | The page keeps roots of its own for the waiting screen and the rows of sentences besides the screens and the menu bar, none shared and none over the whole view; the rows of sentences are three roots, and the row of the failure holds nothing else, is drawn at the start and shown by the page at the error without a render. | Strona ma osobne korzenie dla ekranu oczekiwania i wierszy zdań obok ekranów i paska menu, żaden wspólny i żaden nad całym widokiem; wiersze zdań to trzy korzenie, a wiersz awarii niczego innego nie niesie, jest rysowany przy starcie strony i pokazywany przez stronę przy błędzie bez renderu. |
| 4 | D-03 | `the cycle's` | The browser view's screens are `.tsx` components with no exception for the waiting screens. | Ekrany widoku to komponenty `.tsx`, bez wyjątku dla ekranów oczekiwania. |
| 5 | D-323 | `the cycle's` | At the waiting screen where a sign-in after the error stays, the sentence of the failure stands alone, with no „Sprawdzanie logowania…” beside it. | Na ekranie oczekiwania, przy którym zostaje logowanie po błędzie, zdanie o awarii stoi samo, bez „Sprawdzanie logowania…” obok. |
| 6 | D-44 | `the cycle's` | The shared button that sends a form is held disabled while it waits in its React form (not "in both its forms"). | Wspólny przycisk wysyłający formularz jest sprawdzany jako wyłączony na czas czekania w swojej postaci Reacta (nie „w obu postaciach”). |
| 7 | D-275 | `the cycle's` | The secondary action is a button of type `button` with class `secondary` in its React form. | Akcja drugorzędna to przycisk typu `button` z klasą `secondary` w postaci Reacta. |
| 8 | D-276 | `the cycle's` | A tab is a button with `aria-pressed` in the React form of the shared button. | Zakładka to przycisk z `aria-pressed` w postaci Reacta wspólnego przycisku. |
| 9 | D-381 | `the cycle's` | The card's rationale now says the card is a root of its own beside the page's other roots, so the page and the card meet at one narrow place; the binding sentences are unchanged. | Uzasadnienie mówi teraz, że karta jest osobnym korzeniem obok innych korzeni strony, więc strona i karta spotykają się w jednym wąskim miejscu; zdania wiążące bez zmian. |

### What I wrote, entry by entry

1. **D-269** (question kept, "Does the kitchen-sink page hold React?"). Binding: "The kitchen-sink page holds React: it shows each shared control in its React form, and `scripts/kitchen-sink.mjs` bundles it in its build step as the game's browser code is bundled, the compiler emitting the page's modules and esbuild joining them into the one file the page loads (D-263, D-266). A change of how the page is built is made in that build step and never in the script's lines that serve files." *Relations* gained `derives from D-263 · derives from D-266` (the sentence names them). *Verification* is a pair (no test holds the sentences). *Rationale* rewritten (the browser resolves no bare import, one way of building the browser's code, the trust boundary stays under review per D-76, development build and its size accepted); *Rejected*: the page kept on DOM forms that live only for it (task, question 1 b). **D-76 is not touched.** `Based on: browser-bare-import-resolution` weighed and **kept**: the fact (a bare specifier throws in a browser) is still true and is now the ground of why the page needs a bundler, as the rationale says.
2. **D-265** (question changed to "What form does a shared control of the browser view have?", since "while other screens stay in DOM" no longer holds). Paragraph 1: "Each shared control in `src/browser/view/controls/` has one form, a React component, and `src/browser/styles.css` stays the one place of the look of the controls. A new screen is never written after the pattern of a module that builds its DOM elements through the DOM APIs, though it may import that module's pure functions." Paragraph 2 (the panel): "The panel that stands in place of a card React took down is built outside React (D-323), and it takes the tag, the classes and the role of its warning sentence from one constant that the React component of that sentence reads too." *Relations*: `derives from D-44 · derives from D-03` (`narrows D-03` removed: D-03 has no exception now). *Verification*: `tests:` names the tests of the React forms in words (the new test file of Slice 11; its `decision:` lines do not stand yet) plus a pair for the part no test holds. *Rejected* from task question 3 (a, c) and question 1 b; the old rejected ways about the two-form arrangement went with it. The sentence about "styles.css" stays as the task's note says the stylesheet task changes it.
3. **D-407**: first paragraph's first sentence now reads "…for each screen, for the menu bar and for each place of the page that shows something besides the game — the waiting screen and the rows of sentences — none shared, and no single root over the whole view." Its second sentence (quoted by tests) is unchanged. New second paragraph: "The rows of sentences are three roots, the row of the failure, the row of saving and the sentences above the game, and the row of the failure holds nothing else, is drawn when the page starts and is shown by the page at the error without a render, so that an error in the drawing of another root cannot take down the sentence of D-323." I put the precision in D-407, not in D-323 (the handoff allowed either): it is about the roots. *Relations* gained `derives from D-323`. *Verification* pair extended; *Rationale* now says the question of one root is answered and gives the reasons of the row drawn once; *Rejected* gained "one root for the skeleton of the page" (task question 2 b); the existing "one root with the game view written as a component" is task question 2 c already.
4. **D-03**: removed ", except the waiting screens of D-262, which `src/browser/view/app.ts` builds,". The test quotation "The browser view is built in TypeScript" still stands.
5. **D-323**: appended to the second binding sentence, after "(D-262)": ", and at the waiting screen where a sign-in after the error stays it stands alone, with no „Sprawdzanie logowania…” beside it." The first sentence and the part tests quote are untouched. *Verification* `tests:` gained "the waiting screen at which a sign-in after the error stays showing no „Sprawdzanie logowania…” beside the sentence" (held by the changed `assertWaitingWithSentence` of Slice 10). *Rationale* gained one sentence giving the reason. *Rejected* unchanged (the task keeps no rejected way for To do 4).
6.–8. **D-44, D-275, D-276**: only the *Verification* words: "in both its forms" -> ", in its React form"; "in both forms" -> "in its React form"; "in both forms of the shared button" -> "in the React form of the shared button".
9. **D-381**: *Rationale* first sentence now "the card is a root of its own beside the roots of the page's other places, so the page and the card meet at one narrow place, …"; the binding sentences and the rest are unchanged.

## Entries the search found that the plan does not list

I did not write these (`foundation_step.md` does not tell the agent to):

- **D-276 *Rejected*** (`foundations/decisions.md`, the sentence "keyboard handling written by hand in both forms of the control (D-265) and its tests"): "both forms" is no longer true; the cost of the rejected real tabs is now "in the React form". The statement of the decision holds.
- **D-264 *Rationale*** ("the cases that walk the page also build the screens still in DOM, so what stands in for the model has to carry those too"): the screens still in DOM will be none; the sentence is a reason given at the time of choosing, and the *Verification* clause "a test of a screen not built with React keeping its own stand-in" still holds for other tests. A reviewer may want it refreshed.
- **D-407 *Rejected*** "one root with portals into the places of today's page ... the page is still built by hand": left; the places are still made by hand, so it stays true.
- Searched and unchanged, as the spec says: D-45, D-47, D-76, D-262, D-261, D-286, D-273, D-263, D-266, D-395, D-408, the invariants `browser-view-framework`, `application-build-kitchen-sink`, `preview-server-access`, `browser-view-focus-outline`, `uncaught-failure-game-state`, the part map entries, the glossary (the term "secondary action" does not mention the forms).

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1, 39 errors: every one is `tests/view/react-controls.test.mjs:<line>: the quotation stands in no binding sentence of D-265` (the 39 `decision: D-265 "Until its last screen in the browser's DOM APIs…"` lines). The sentence they quote is the one the settlement removes, and the file is deleted by Slices 11 and 12; I may not touch tests. No other error. The same command without the switch gives the same 39 errors and nothing else.
- Expected: the foundation check turns green when Slice 12 deletes `tests/view/react-controls.test.mjs`. Nothing else is left unchecked by me; I did not run `npm test` (the orchestrator runs the gate).
- `git status --short` after the commit: clean.

## For the later slices

- The new test file of Slice 11 should carry `decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component, and …"` lines and may also cite D-44/D-275/D-276 as before.
- The case of Slice 10 can cite D-407's second paragraph (starts "The rows of sentences are three roots,") and D-323's second binding sentence up to "no „Sprawdzanie logowania…” beside it". When tests hold them, the return step removes the pairs' matching parts of D-407 (and D-265's).
- D-265's `tests:` clause names tests that exist only after Slice 11.

## Own-work check (`make-change`, section 3)

- Requirement most likely not met: a quotation of a `decision:` line stands in no binding sentence after my edit (the foundation check's own rule), for the decisions whose binding sentences I changed (D-03, D-269, D-323, D-407, D-265). Check: the foundation check run; it shows only the D-265 citations of the file that is deleted later, none for D-03, D-323 and D-407, whose quoted sentences I left word for word.
- Second requirement: the entries carry no word the template bars (*should*, *will*, RFC keywords in capitals) and no file, script or count in *Rationale*/*Rejected* written by me; a search of the changed passages found none.

## Choices and ways rejected

- The precision of the row of the failure went into D-407 (a second paragraph), not D-323: D-323's three sentences are already at the limit and tests quote them; a fourth sentence there would break "one to three". Cost if wrong: a reader of D-323 alone does not find the mechanism; D-407 is linked by `derives from D-323`.
- The D-323 addition sits at the end of the second sentence, after "(D-262)", not in the middle, to keep every test quotation (which end before it) valid.
- D-265's question was changed (the number stays). Cost if wrong: a search of the log by the old question finds the entry by number only.
- D-265 `narrows D-03` removed and `derives from D-03` put; D-269 gained two `derives from`. Cost if wrong: a wrong relation that the reviewer corrects.
- D-265 `tests:` names the future tests of the React forms, with a pair beside it for the rest; `foundation_step.md` and the skill ask for a pair where a later slice's test will hold a sentence, and the plan's row 2 asks for the tests named; I did both.

## Reaches beyond the handoff

- `.the-way/elements/common/foundation_check.py` (the part about `decision:` lines and held decisions) and `.the-way/elements/common/way_of_working.md`, `rules.md`, `elements/decisions/template.md`: read to know the check's rules and the form; the handoff named them as method files. `foundations/glossary.md` ("secondary action") and `foundations/environment_facts.md` (`browser-bare-import-resolution`): read for the *Based on* weighing.
- `tests/view/react-controls.test.mjs` citation lines, `tests/view/uncaught-failure.test.mjs`, `tests/view/state-store.test.mjs` and others (searched by `git grep` for `decision:` lines): to keep the quotations of D-03, D-323, D-407 valid.

## Working copies

None made. Two scratch outputs of the foundation check in `.runs/` were removed.

## Unread material

- D-253 (named in the "read" list only through the plan): not read; D-36, D-96 not read.
- D-276: read from its start to the middle of its *Rejected* (the output was cut at "…collides with the"); the *Verification* and binding sentences I changed were read whole.
- Invariants `browser-view-framework`, `preview-server-access`, `browser-view-focus-outline`: read only the line or the fact the search showed (not the whole entries); `application-build-kitchen-sink` and `uncaught-failure-game-state` read whole.
- The part map entries `browser-view`, `build-tools`, `product-foundation`: searched by `grep` for the terms of this change, not read whole.
- The plan's slices: read only the sections "Foundation entries", slice 10 and the lines the search showed; the task and the spec read whole.

## Searches not found or unclear

- No entry of the glossary, invariants or part map names the forms of the controls or the waiting screens; none to change.
- `foundation_step.md` as read does not say that an entry following from the change with no way left open is the agent's to write; I treated D-276's *Rejected* and D-264's rationale as to be reported, not written.
- The plan's row 2 says "tag, class and role" and the task's settlement row 2 says "tag, classes and role"; I wrote "tag, the classes and the role" (the accepted row's wording).
