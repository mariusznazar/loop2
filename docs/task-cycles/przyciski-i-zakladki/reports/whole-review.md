FAIL 66120c8222fc0710205c3dc3b2cd3a200553c9aa

# Review of the whole change — task `przyciski-i-zakladki`

- Range: `799d1ffc899fe631ddc03381302ede7d94f49df5..66120c8` (six commits: 707738f, 14d07fc, 06923e1, 1975f89, e326fa0, 66120c8). `git rev-parse HEAD` = `66120c8222fc0710205c3dc3b2cd3a200553c9aa`, the head I was given. Pin `f45ca40` matches the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`, pinned `f45ca40`, read whole.
- Counts: blocking 2 (both Important), Minor 5, out of scope 0 (Declined to judge: 4 lines).

## Blocking findings

### B1 — Important — D-276 and the styleguide limit the tab to "switching the states of a form", which no source settles

- **Place:** `foundations/decisions.md:5774` (D-276, first binding sentence: "A tab is a button selected in its group that switches the states of a form and is drawn without a frame"), restated in `guidelines/styleguide-browser-view.md:345-346` ("Zakładka (`kind: "tab"`) to przycisk wybrany w grupie, który przełącza stany formularza").
- **What is wrong:** the clause "that switches the states of a form" makes switching form states part of what a tab is. The sources say only what a tab looks like and how the keyboard works: *Settlements to record* row 3 ("Zakładka jest odmianą przycisku wybranego w grupie: wybór pokazuje linia u dołu, a obsługa klawiatury zostaje jak przy przycisku"), pytania 2, 2a ("„zakładka” w wytycznych znaczy wygląd"; "Zadanie, które będzie potrzebować strzałek, dopisze je samo") and 2c, and *To do* 3 (the card's switch as tabs, the pace buttons unchanged). The task limits where its looks apply in two places only: the secondary action and the main button in pytanie 1b, and the menu bar in pytanie 2b. It sets no such limit for tabs. The *Foundation entries* report says the agent added scope on purpose ("Row 3 names where tabs stand"). That is justified for the sentence "The switch of the login card stands as tabs, and the pace buttons … keep the look", which *To do* 3 gives, but not for the defining clause.
- **Why it matters:** D-276 is a binding decision that the screens of tasks 4, 5 and 6 will read, and they take the login card as their pattern (task, *Need*). A later screen that switches panels, such as a catalogue like the old Loop's `MapCatalog.tsx:194` that the task's *Context* cites, either gets the plain look of a button selected in its group, so the two switches look different, or it has to change D-276 first. So the clause decides something the human never decided, and it reads like a real decision (fidelity to the task's sources, `whole_change.md`).
- **Evidence:** the quotes above. A search of `task.md` for „formularz” finds it at the tabs only through „pole adresu” in 2a and the state of the card in 1b. Pytania 2, 2a and 2c contain no limit to forms.
- **Fix:** drop the clause from D-276's binding sentence, for example "A tab is a button selected in its group drawn without a frame, …", which keeps "The switch of the login card stands as tabs". Drop „który przełącza stany formularza” from the styleguide line in the same change, leaving „— dziś przełącznik „Zaloguj się” i „Załóż konto” karty logowania (D-276)”.
- **Slice:** comes from the plan's *Foundation entries* (707738f), and slice 4 (e326fa0) restates it.

### B2 — Important — the coding guidelines turn D-265's permission for a new section of a DOM screen into a rule that it stays in DOM

- **Place:** `guidelines/coding-browser-module.md:139-140`, in the rule `### Wspólna kontrolka w dwóch postaciach` (Decision D-265): „Ekran, którego żadne zadanie nie przeniosło do Reacta, zostaje przy postaci DOM, także jego nowa sekcja.”
- **What is wrong:** the changed D-265 (`foundations/decisions.md:5430-5434`) reads: "a screen no task has moved to React yet stays in those APIs on the DOM form, where a new section of such a screen **may** be built too". The source, pytanie 5b, also gives a permission: „dokładka do starego ekranu **może** powstać w DOM”. Slice 5's phrase „zostaje …, także jego nowa sekcja” instead says the new section stays in DOM. That makes it an obligation and restates the entry more broadly. The new rule of the same file, `### Nowy ekran i moduły w DOM` (`:158-159`), says the permission correctly („nowa sekcja … może powstać w DOM”), so the file now says both things.
- **Why it matters:** by WAY-263, a guideline that restates the foundation entry it cites differently, or more broadly, is Important. An agent that reads the rule on controls will treat a new section of a DOM screen built in React as forbidden. D-265 does not forbid it, and its *Rejected* turns down only the opposite rule, requiring React for such a section. The two rules of one file then give a reviewer two different answers.
- **Evidence:** the three quotes above.
- **Fix:** reword the phrase as a permission that points to the new rule, for example „… zostaje przy postaci DOM, a jego nową sekcję wolno zbudować w DOM (reguła Nowy ekran i moduły w DOM).”, or delete „także jego nowa sekcja”.
- **Slice:** slice 5 (66120c8).

## Minor findings

- **M1 — comments cite D-40 for "the frame is part of the text".** `src/browser/styles.css:173` (main look, "so the frame is part of the text (D-40)") and `:309-310` (`.form-note`, "(D-40, D-44)"). D-40 does not say this. D-279 does (and D-274 for the main button). D-40 is the decision that pytanie 3b's rejected way says not to change, so a reader who follows the citation finds nothing behind it. Fix: cite D-274 / D-279 there. Slice 1 (14d07fc).
- **M2 — reasons inside rules.** The new rules put reasons into their text, while the template says "A rule carries no rationale and no rejected options". Examples: `guidelines/coding-browser-module.md:152-157` („bo ekran, którego żadne zadanie nie przeniosło do Reacta, zostaje przy API DOM”, „bo takie funkcje niczego nie rysują”) and `guidelines/styleguide-browser-view.md:342` („Zostaje przyciskiem, bo zmienia stan ekranu i nie ma adresu”). The styleguide already uses „bo” for why a state does not apply, so this is a small drift and has no effect on the code. Slices 4 (e326fa0) and 5 (66120c8).
- **M3 — `ReactButton`'s `kind` described too broadly.** `guidelines/coding-browser-module.md:214-215`: „Rodzaj przycisku ustawia `kind` w obu postaciach”. In the React form `kind` takes only `secondary` and `tab`. The chosen state comes from `selected`, and the React form has no destructive kind (`src/browser/view/controls/react-button.tsx:10`). The second half of the sentence is right, but the first half claims more than the code does. Slice 5 (66120c8).
- **M4 — *To do* 12: the screenshots for the request lack the card while a form waits.** Slice 2 names it as not captured, along with hover and the refusals of the other forms. The four states of D-259 and the focus states are captured, so the item is met in its core, but the waiting state is where the new looks show: the main button at normal weight with a `control-border` frame, and disabled tabs that keep the line. The server answers at once locally, so one way to capture it before the request is to delay the account API's response in Playwright (`page.route` with a delay). This is the orchestrator's step 12, not a commit of the range. Slice 2 (06923e1) or the request step.
- **M5 — "Every value with its source" does not name the new kind of source.** The token comment of `--bar-width` (`src/browser/tokens.css:70`) now names "Mariusz's choice from the preview of the variants of the card … in the task przyciski-i-zakladki". The styleguide's list (`guidelines/styleguide-browser-view.md:271-285`) names only the sources of the task „Styleguide loop2”. The value is unchanged, and its original source, „grubości ramek i belek — ustalenie zadania”, still covers it, so slice 4's choice holds. A reviewer of `tokens.css` would still find one `Source:` kind missing from the list. Slice 4 (e326fa0).

## The whole task, item by item

| Item | Met by | Judgment |
|---|---|---|
| *To do* 1 — the button that sends a form has the main look, both forms, no new parameter | `styles.css` `.button[type="submit"]`, `[type="submit"]:disabled`; both forms already set `type="submit"` | met; computed styles verified (below) |
| *To do* 2 — secondary action, a new shared control, both forms, case in the comparison test | `button.ts` `kind: "secondary"`, `react-button.tsx` `kind`, `account-card.tsx:314, 447, 520`, `tests/view/react-controls.test.mjs` two cases | met |
| *To do* 3 — switch as tabs, same element and `aria-pressed`, both forms; pace buttons unchanged | `kind: "tab"`, `.tabs` container, `account-card.tsx:591-603`; `.button.selected` unchanged | met; a pace-like `.button.selected` computed unchanged |
| *To do* 4 — sentence in `text` with a bar | `.form-note` | met |
| *To do* 5 — fixed top edge, comment | `.account-card-screen` `align-items: flex-start`, `padding-top: 15vh`; comment rewritten | met; slice 2 measured 120 px at 800 in every state |
| *To do* 6 — `createFormNote` comment | `text-field.ts:127-132` | met; the element is unchanged |
| *To do* 7 — `--bar-width` 2 px, widened `Source:` | `tokens.css:70` | met (see M5) |
| *To do* 8 — styleguide | e326fa0 | met, apart from B1 and M2 |
| *To do* 9 — kitchen-sink page in DOM form | 1975f89 | met; screenshot read |
| *To do* 10 — `do not copy` at the 17 files, three notes, no audit | 66120c8 | met; the 17 rows checked against *Context*, `copy` kept at the six files and `controls/`; B2 |
| *To do* 11 — rows 1–8, D-44, D-222, D-40, D-265 | 707738f | met; B1 |
| *To do* 12 — screenshots in the request | the request, not yet made | open, see M4 |
| Rows 1–8 | D-274, D-275, D-276, D-277, D-278, D-44 (row 6), D-265 (row 7), D-279 | each says what its row says, except B1 |

Judged and not a finding:
- **D-279's bounding sentence** („A line that marks the one chosen in its group stays in `selected`”). Read literally, row 8 would contradict pytanie 2c (the tab's line in `selected`) and D-40's example (the selected button framed in `selected`). Pytanie 3b frames the principle around the frame of the main button and the bar of the sentence, and it takes the frame of a field in error as its model. So the bounding reconciles the task's own answers and adds no meaning they lack. The styleguide (`:369-372`) says the same.
- **Slice 5's sentence on a DOM file added after the audit** (`coding-browser-module.md:155-156`). It applies D-265 ("A new screen is never written after the pattern of a module that builds its elements through the DOM APIs") to the case the coding template leaves without a row („a file added after that audit takes no row”, `.the-way/product-guidelines/coding/template.md:228-229`). Without it, the rule would be narrower than D-265. Kept.
- **Q9 („Autorzy grafiki” moves with the form's height between states).** Pytanie 4 and D-278 say that nothing above the change moves. „Autorzy grafiki” stands below the form, so the orchestrator's answer is right.
- **„tab” / „zakładka” and the glossary.** `foundations/glossary.md` has no entry for „tab”. The decision log uses „tab” for a browser tab (D-207 and nearby) and now for a look of a button (D-276), and D-276 says it does not mean the tabs of WAI-ARIA. The task names no glossary term, and the return step takes glossary terms, so this is for the return step, not a finding of this range. I recommend the entry the *Foundation entries* agent proposed.
- **No test on the card pins `kind="tab"`, `kind="secondary"` or the 15vh edge.** `guidelines/testing.md:60` and `:370` (D-73) keep no separate permanent test for code that only passes data on with no rule of its own. D-87 and D-88 leave appearance and layout to inspection in a browser, and slice 2 inspected and measured it. The two forms of the control are protected by the new cases, and my mutation run shows they fail when the kind is lost.
- **Slice executors who did not read their *Read* foundation entries** (slices 1 and 2). I judged their code against the entries myself (D-36…D-48, D-130, D-222, D-259–D-262, D-265, D-269, D-274–D-279). Apart from B1 and B2, I found nothing in it that departs from them.

## Declined to judge

- Whether „Załóż” of character creation in `src/browser/view/headquarters.ts:227` (a field and a button, not a `<form>`) should take the main look. The task's forms are the card's, and pytanie 1b leaves main actions outside forms to their screen's task.
- The trailers of the commits (`Claude Sonnet 5.5` on the slices sonnet made, `Claude Opus 5.5` on the two opus made). They are process records, not product.
- The divergence between the current D-44 and the project definition's projected D-44. Pytanie 6 leaves it in the plan's log and tasks 4, 5 and 24.
- The behaviour of a screen reader on the sentence under the form (task *Out of scope*).

## Checks

All from `/home/user/loop2` at `66120c8`, Node v24.22.1. After them `git status --short` was empty and HEAD unchanged.

| Command | Exit |
|---|---|
| `npm test -- tests/view/react-controls.test.mjs` | 0 (0 fail) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (0 fail) |
| `npm run typecheck` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests) |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (3) |
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 (2) |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 (3) |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 (3; it builds `dist/kitchen-sink/`, which git ignores) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (5; ESLint and Prettier among them) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Mutation, in a scratch worktree of `66120c8` (removed afterwards): the React form's class built without `kind`, then `npm test -- tests/view/react-controls.test.mjs` | 1 (24 pass, 5 fail). The new cases catch a lost kind. |
| Manual: `dist/kitchen-sink/` served by `python3 -m http.server` on 127.0.0.1 and opened in Chromium through the Playwright library (`playwright-cli` is not installed, as in the handoff). On a `panel` host I built a `.account-card-switch.tabs` group, disabled tabs, submit buttons at rest and disabled, secondary actions at rest and disabled, a `.button.selected` and a `.form-note`, then read `getComputedStyle` and the layout of each. | as the task gives: main at rest text-strong, weight 500, 1px frame in the text's colour, no fill; main disabled text-disabled, weight 400, frame control-border; secondary text-secondary, underlined, side frame and padding 0, disabled text-disabled; selected tab text-strong 500, 13px, 2px bottom line in `selected`; unselected tab text-label, transparent line; disabled selected tab text-disabled with the line kept; group line 1px `divider`, the tab's bottom level with the group's bottom (24.19 px both), so the line of the choice lies over it; `.button.selected` unchanged (frame `selected`, weight 400); note text `text` with a 2px left bar in the same colour. |
| Manual: screenshots `01-login.png`, `04-request-answer.png` and `kitchen-sink-full.png` in `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/screenshots/` opened and read | they show what slices 2 and 3 report: tabs with the line, the framed main button, underlined secondary actions level with the fields, the sentence with its bar, and every new row of the page with its reasons |

Not run: the product's gate `npm test` with no argument (the handoff leaves it to the orchestrator). The card on the running game (`npm run local`) was not started again: slice 2's measurements and screenshots cover it, and my style check ran against the same stylesheet.

## Reaches beyond the dispatch

- Foundation selection (`way_of_working.md`, "Reading the foundation"). Parts touched: browser-view (`src/browser/**`, `tests/view/**`), agent-workflow (`guidelines/**`) and product-foundation (`foundations/decisions.md`, whose entries name browser-view and, in D-222, account-server). A search of *Scope* found 97 decisions for browser-view and agent-workflow. I read the headings of all 97. I read whole the ones this change reaches: D-36 to D-48, D-130, D-222 (changed passage), D-259 to D-262, D-265, D-269, D-274 to D-279, and D-87 and D-88 (appearance and browser checks). The simulation-screen and build decisions I judged unreachable from their headings and did not read whole. That is a departure from "each found decision whole", named here.
- Part map entries browser-view, agent-workflow and product-foundation (`foundations/part_map.md:3-29`, `:118-142`). Glossary searched for „tab”/„zakład” (no entry). Invariant entries were not read whole: their tests ran and passed.
- Guidelines: `guidelines/styleguide-browser-view.md` and `guidelines/coding-browser-module.md` whole, `src/browser/AGENTS.md` whole, `guidelines/testing.md` by search (the level table, `:39-72`, `:370`). `guidelines/coding.md` was not read: the change touches no rule of the whole code beyond what the browser-module file holds.
- Templates: `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md` whole, and `.the-way/product-guidelines/coding/template.md` by search for statuses and audits (`:222-229`).
- Code read to check claims: `src/browser/styles.css:100-330` at head, `src/browser/view/headquarters.ts:215-255` (whether character creation is a form), `src/browser/view/controls/react-text-field.tsx:107-116` (whether `ReactFormNote` also promised to announce the sentence: it does not), and grep of `src/browser` for `submit`, the new kinds and „Wyloguj”.
- Cycle record `cycle.md`, searched for Q3–Q9.

## Searches not found or unclear

- „tab” / „zakładka” in `foundations/glossary.md`: not found. Left to the return step.
- A source in the task for the clause „switches the states of a form” in D-276: not found (B1).
- Whether D-265's "may be built too [in DOM]" also allows React for a new section of a DOM screen: unclear from the entry. B2 asks only that the guideline keep the permission as D-265 words it.
- A form outside the login card with a submit button: none in `src/browser` beyond the card and the kitchen-sink samples.
