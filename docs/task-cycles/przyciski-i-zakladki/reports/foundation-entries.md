# Report — Foundation entries, task `przyciski-i-zakladki`

**Status:** done with concerns (concerns: the bounding sentence of D-279 and the glossary finding on „tab”, both below; neither blocks slice 1)

## Commits

- `707738f` — docs: :memo: record the main button, the secondary action, the tab, the mark of the menu bar, the login card's top edge and the colour of a frame or bar at a text, and let D-44, D-222, D-40 and D-265 say what the task settles. On `claude/lucid-ptolemy-jl068t`, on base `799d1ff`; not pushed.
- Files: `foundations/decisions.md` +206 −26 (the −26 include rewrapping D-222's and D-265's binding paragraphs at 100 columns after the edit).

## Entries and their meaning (for the request's *What this request settles*)

| Entry | Plan row | Meaning, in Polish |
|---|---|---|
| D-274 — What does the main button of a form look like? (new) | Row 1 | Główny przycisk to przycisk wysyłający formularz, jeden na formularz: tekst w `text-strong`, ramka w kolorze tego tekstu, bez wypełnienia i bez własnej roli koloru; działania poza formularzem zostają przy przycisku z D-44. |
| D-275 — Which actions of the browser view stand as text rather than as buttons? (new) | Row 2 | Akcja, która otwiera albo opuszcza stan formularza i stoi pod nim („Nie pamiętam hasła”, „Wróć do logowania”, „Anuluj”), jest akcją poboczną: podkreślonym tekstem w `text-secondary` bez ramki, w kodzie dalej przyciskiem; reszta gry zostaje przy przyciskach z D-44. |
| D-276 — What is a tab of the browser view? (new) | Row 3 | Zakładka to przycisk wybrany w grupie, który przełącza stany formularza, bez ramki, wybrana z mocnym tekstem i linią w `selected` u dołu; obsługa klawiatury i `aria-pressed` zostają jak przy przycisku, bez strzałek; zakładkami jest przełącznik karty logowania, a przyciski tempa zostają przy dawnym wyglądzie. |
| D-277 — How does the menu bar show where the player is? (new) | Row 4 | Bieżącą pozycję paska menu znaczy to samo co wybraną zakładkę: tekst w `text-strong` i ta sama linia w `selected` u dołu. |
| D-278 — Where does the login card stand in the height of the window? (new) | Row 5 | Górny brzeg karty logowania stoi w 15% wysokości okna, cokolwiek karta zawiera, więc nic nad zmianą się nie przesuwa. |
| D-279 — What colour does a frame or a bar that sets a text apart take? (new) | Row 8 | Ramka albo belka wyróżniająca tekst bierze kolor tego tekstu i jest jego częścią, więc rola tekstu nie zmienia znaczenia; linia znacząca wybór w grupie zostaje w `selected`. |
| D-44 — Which controls do the screens of the browser view build on? (changed) | D-44 changed; Row 6 tied here | Wspólnych kontrolek jest siedem, wśród nich akcja poboczna (D-275); odpowiedź na prośbę o odnośnik do zmiany hasła stoi pod formularzem w `text` z belką po lewej w swoim kolorze, nigdy w `positive`. |
| D-222 — What does a request for a password-reset link answer? (changed) | D-222 changed | Zdanie odpowiedzi stoi pod formularzem „Nie pamiętam hasła” w wyglądzie, który daje mu D-44 — D-222 przestaje mówić o `text-secondary`. |
| D-40 — What do the neutral roles of the browser view mean? (changed, *Verification* and *Origin* only) | D-40 changed | Przykład zgodności dostaje wybraną zakładkę pokazaną linią w `selected` u dołu z tekstem w `text-strong`; zdania wiążące bez zmian. |
| D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM? (changed) | D-265 changed; Row 7 tied here | Nowy ekran nie powstaje na wzór modułu budującego elementy przez API DOM, choć wolno mu importować jego czyste funkcje, a nową sekcję ekranu, który jeszcze jest w DOM, wolno zbudować w DOM — przechodzi do Reacta razem z tym ekranem. |

## Rows tied to an entry already stated

- **Row 6 → D-44.** The look of the answer to a request for a password-reset link was stated twice at the base — in D-44 („appears in that place in `text-secondary`”) and in passing in D-222 („in `text-secondary` under the form”). The task commands both changes (*To do* 11, pytanie 3). I put the row's meaning in D-44, the decision that already holds how the messages under a form appear („`text`, with a bar on its left in its own colour (D-279) and never in `positive`”), and removed the colour from D-222, which now says the answer stands „in the look D-44 gives that answer”. That follows the template's rule that a sentence answered in passing moves to one decision. No second entry was written. Row 6's reason against green („zieleń twierdziłaby, że wiadomość wyszła”) and pytanie 3's seven ways not chosen went into D-44's *Rationale* and *Rejected*.
- **Row 7 → D-265.** The task says the rule on a new screen is recorded in D-265 too (pytanie 5: „co zapisuje też D-265”; *To do* 11), and pytanie 5b is anchored in D-265's binding sentence. D-265 now carries row 7 whole in its binding sentences. The way pytanie 5b did not choose went into its *Rejected*, and the costs into its *Rationale*. No second entry was written.
- **Row 8 — not tied.** The search found no entry that states it: D-40 says only that „each of the five stands as text”, and no entry speaks of a frame or bar in a text's colour. Pytanie 3b's rejected way „zmienić D-40” rules out writing it into D-40. Row 8 is therefore the new D-279. D-40 changes only in *Verification* (*To do* 11) and *Origin*.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the six new entries and four edits) | 0 | `0 errors` |
| same, after renaming D-276's heading | 0 | `0 errors` |
| `git diff -U0 foundations/decisions.md \| grep '^+' \| grep -w -i -E 'should\|will\|MUST\|SHALL\|MAY\|today\|now'` (forbidden words) | 0 | only lower-case „may” in D-265 and „active now” quoting D-39's meaning in D-276's *Rationale*; no forbidden word |

Not run: the product's gate (`npm test`), which the handoff excludes. No test exists for these entries; none of them names an invariant.

## Step 4.4 — what follows from the changed decisions

- **Derived from D-44:** D-130, D-180, D-245 and D-265. I read each one's binding sentences. None depends on the number of shared controls or on the answer's colour. D-130's pace buttons stay buttons selected in their group, as D-276 says.
- **Derived from D-222:** D-223, which is about limits and is not affected.
- **Derived from D-265:** D-269, which is about the kitchen-sink page in DOM and is not affected.
- **Invariants whose *Derives from* names D-44, D-222 or D-265:** none.
- **design-token-contrast:** it derives from D-40. D-40's binding sentences did not change, so the invariant is untouched.

## Reaches beyond the handoff

- The element skill selected this reading, as the handoff allows: the files of `.the-way/elements/decisions/` (skill, `read.md`, `decide_entry.md`, `template.md`, `examples.md`), `.the-way/elements/common/way_of_working.md` and `rules.md`, and the-way's WAY-03 (its example). I also read whole D-03, D-36, D-38, D-39, D-41–D-43, D-45, D-47, D-48, D-96, D-130, D-180 (binding only), D-223, D-225, D-245 (Relations only), D-259–D-262, D-264, D-269–D-273, the part map's browser-view, agent-workflow and product-foundation entries, the invariants browser-view-token-values, browser-view-focus-outline, design-token-contrast and design-token-sources, and the glossary entry „copy” together with the-way's „exemplar”, „surface” and „user interface”.
- Product code, read to word the entries: `src/browser/view/controls/button.ts:20-40` and `react-button.tsx:40-55`, for the submit mark (`type="submit"`); `src/browser/styles.css:198-200`, to confirm that a field in error takes a frame in the colour of its message (`border-color: var(--warning)`), the example D-279 and pytanie 3b give; `src/browser/tokens.css`, for `--selected` and `--bar-width`. I also searched for „Wejdź”, which the code does not contain, so it is not used as an example.
- `guidelines/coding-browser-module.md:13-45` (the status column), read to understand row 7. The file is unchanged.

## Choices made, with the way rejected and the cost if wrong

- **D-279's second sentence, „A line that marks the one chosen in its group stays in `selected`”.** Read literally, row 8 („linia przy tekście bierze kolor tego tekstu”) would collide with two things: the chosen tab's line in `selected` (pytanie 2c, D-276) and the frame of the button selected in its group (D-40's example). Pytanie 3b frames the rule around the main button's frame and the sentence's bar, so the row means a frame or bar that *sets a text apart*. I bounded it that way and named the selection mark as staying in `selected`, which D-40 and 2c already give. I did not take the literal reading: it would turn the tab's line into a violation the moment the entry is written. If the bounding is wrong, the reviewer or human strikes one sentence.
- **Where the rejected ways of pytanie 1 went.** The row 1 and row 2 sources both name pytania 1, 1a and 1b. I gave each decision the ways that concern its own question. D-274 got: leaving all; main unchanged with secondary as text; A; B; frame in `selected` (from the source note of 1a). D-275 got: leaving all; secondary left as plain buttons; text wherever an action is secondary (1b). „Leaving all” stands in both. No way was derived; every one is from the source with its cost.
- **Row 3 names where tabs stand.** D-276 says the switch of the login card stands as tabs and the pace buttons keep the look of the button selected in its group (*To do* 3). Without that, „a variant of the button selected in its group” cannot be checked against a change. Without the pace clause, D-130's buttons might be redrawn as tabs.
- **States and sizes stay out of the binding sentences.** Hover, waiting, `--font-weight-emphasis`, the `text-label` text of unchosen tabs, the `divider` line and 2 px are left to the styleguide (slice 4). The decisions carry only what the rows settle and what the cycle would otherwise guess: the colour roles, no fill, no role of its own, `selected` for the line, and the keyboard.
- **`Based on: none` throughout.** GOV.UK, NN/g, W3C and Carbon appear in the source only as the costs of a way or as known costs. The task gives no address, passage or date for them, and no decision rests on them. They stand as prose in *Rationale* and *Rejected*.
- **The headings of D-265 and D-44 are unchanged.** D-265's question („…while other screens stay in DOM?”) now also carries the rule on a new screen. The task commands that, but the question reads a little narrower than its sentences. The other way — a new question and number — would leave row 7 in two places.

## Findings for the return step

- **Glossary, „tab”.** D-276 uses „tab” for a look of the button selected in its group (pytanie 2a: „„zakładka” w wytycznych znaczy wygląd”). A reader who knows the field takes „tab” for the tabs pattern of WAI-ARIA (`role="tab"`, arrow keys). The decision log already uses „tab” in a second meaning, a browser tab, in D-207, D-209, D-210 and others (`foundations/decisions.md` around lines 3698–3851). By `way_of_working.md` step 2 this word goes through `the-way-record-glossary-term`. Writing it is outside my boundary. I recommend a glossary entry „tab” in the product's meaning, with *Not:* a browser tab, and the tabs of WAI-ARIA.
- **Glossary, smaller.** „Secondary action” and „main button” are defined in D-275 and D-274. A reader of the field takes a secondary action for a lesser button, not text. The definitions in the entries hold the meaning, so I see no need for glossary entries, but the return step may weigh them.
- **Projected D-44.** After this change the current D-44 has seven controls, the secondary action among them, while the definition's projected D-44 has seven with the pick cell. Task 24 will need eight. That is pytanie 6's recorded divergence and was not mine to change.
- **The word „copy”.** The status `copy` / `do not copy` in `guidelines/coding-browser-module.md` shares a word with the glossary term „copy” (a map run's program copy). It is in the guidelines, not the foundation, and it predates this task. I avoided the word in every entry.

## Searches not found or unclear

- „Wejdź” (pytanie 1b's example of a main action outside a form) does not occur in `src/browser`, so it appears in no entry.
- No decision states that the login card stands in the middle of the window. The search for middle, centre and center in the foundation found no such entry, which confirms the task's note under pytanie 4.
- Whether a form may have two submit buttons was not searched in the code. D-274 takes „one to a form” from the row as a rule.
