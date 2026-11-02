# Report — the plan's *Foundation entries*, task `logowanie-w-react`

**Status:** `done with concerns`. Every row is written; the concerns are the choices 1 to 5 below, each for the orchestrator to weigh and the request to name.

## Files and commits

Commit `e38278cd867ef8800a140f45f4119413545ecd7b` on `task/logowanie-w-react`, `docs: :memo: record the foundation entries of the login card in React`, base 3d366c8.

| File | Added | Removed |
|---|---:|---:|
| `foundations/decisions.md` | 317 | 37 |
| `foundations/environment_facts.md` | 30 | 0 |
| `foundations/invariants.md` | 16 | 5 |

No code, no test, no guideline. Slice 1 has not begun.

## Rows and entries, with the meaning in Polish for the request

| Row | Entry | Znaczenie |
|---|---|---|
| F1 | D-03, changed, whole | Widok jest budowany w React, a ekrany to komponenty `.tsx` rysujące ze stanu gry, bez innej biblioteki widoku. |
| F2 | D-06, changed, whole | Budowanie gry dostaje krok składania kodu przeglądarki, z Reactem, w pliki podawane przez serwer. |
| F3 | D-36, changed, whole | Wzorcem modułu widoku jest `src/browser/view/account-card.tsx`, pierwszy ekran zbudowany w React. |
| F4 | `browser-view-framework`, changed, whole | Widok rysuje Reactem i interfejsami przeglądarki, bez innej biblioteki widoku. |
| F5 | D-96, changed, in part | Niezalogowany gość widzi jedną kartę z nazwą gry, zdaniem o grze, przełącznikiem, formularzem wybranego stanu i zwiniętymi wzmiankami; obrazu gry jeszcze nie ma, reszta zasad wejścia do gry zostaje. |
| F6 | D-27, changed, in part | Na karcie logowania stoi zwinięta sekcja wzmianek o ikonach, a stopka pod grą zostaje do zadania 24. |
| F7 | `icon-credits`, changed, in part | Wzmianka o każdej ikonie stoi i w stopce, i w sekcji wzmianek na karcie. |
| F8 | nothing written | Mapa części bez zmian: nie powstaje żaden plik `src/browser/*.tsx`. |
| S1 | D-259, new | Karta otwiera się na „Zaloguj się”; przełącznik stoi tylko przy „Zaloguj się” i „Załóż konto”, tam bez nagłówka, a „Nie pamiętam hasła” i „Ustaw nowe hasło” mają nagłówek i wychodzi się z nich przez „Wróć do logowania” i „Anuluj”. |
| S2 | D-260, new | Przełącznik czyści pola i komunikaty formularzy i stawia fokus w polu adresu, a zdanie strony zostaje. |
| S3 | D-261, new | Zdanie strony stoi w karcie, nad przełącznikiem, a gdzie go nie ma, nad formularzem; zostaje przy zmianie stanu karty i odchodzi dopiero przy przejściu między kartą a grą. |
| S4 | D-262, new | Na ekranie karty nie ma nic poza kartą, a ekrany oczekiwania stoją poza nią, z nagłówkiem i stopką. |
| S5 | D-76, changed | Odstępstwo kończy tylko zmiana zasady granicy: inny rodzaj pliku, inna droga wejścia, inny odbiorca; zmiana budowania strony wszystkich stanów nią nie jest. |
| S6 | D-263, new | Kod przeglądarki składa esbuild. |
| F15 | D-88, changed | Gotowa imitacja dokumentu, tak jak ręczny model, nie dowodzi prawdziwych zdarzeń, fokusu ani rysowania. |
| F16 | D-264, new | Testy ekranu w React idą na jsdom przez jeden moduł pomocniczy, a swoje zastępniki dokumentu tracą tylko pliki takich ekranów. |
| F17 | D-265, new | Wspólna kontrolka ma formę React i formę DOM o tym samym drzewie elementów, dopóki nie przejdzie jej ostatni ekran w DOM, a test pilnuje, że są takie same. |
| F18 | D-266, new | Wynik kompilacji po modułach stoi w `dist/browser/`, a w `dist/public/` tylko to, co podaje serwer. |
| F19 | D-267, new | Reguł hooków i efektów nie pilnuje żadne narzędzie, tylko przewodnik i przegląd; usterka, która przejdzie testy i przegląd, wraca do człowieka jako sprawa D-29. |
| F20 | `application-build-output`, changed | Budowanie składa też kod przeglądarki w plik ładowany przez stronę. |
| F21 | D-268, new | Plik testowy na imitacji dokumentu działa pod limitem 2 GiB pamięci własnego procesu i bierze `assert` z modułu pomocniczego, a plik poza `tests/` sam uruchamia ten limit. |
| F22 | `document-test-memory-limit`, new, Method `test` | Pod `tests/` tylko moduł pomocniczy ładuje imitację, plik z niego korzystający nie importuje asercji Node, a proces ponad 2 GiB ginie i przebieg oblewa z wyjaśniającym zdaniem. |
| F23 | `node-assert-failure-inspect`, fact, new | Node 24.17.0 wypisuje porównywane wartości nieudanej asercji przez `inspect` z `depth: 1000`, `customInspect: false` i `getters: true`. |
| F19 | `react-hook-call-place`, `react-effect-dependencies`, `react-effect-cleanup`, `react-effect-use`, facts, new | Dokumentacja Reacta mówi, gdzie wolno wołać hooki, że każda wartość reaktywna efektu jest zależnością, że efekt zwraca sprzątanie i do czego efekty służą. |

Each of S1 to S4 and S6 stands as a new decision and not inside D-96 or D-06: D-96 already holds its three binding sentences, and a new rule next to a decision is a new question (WAY-19). No row was found already stated, so no row is tied to an existing entry.

## Changed invariants, the wording on {fork-point} beside the new one

| Identifier | On {fork-point} | Now | Test that cites it, against the new wording |
|---|---|---|---|
| `browser-view-framework` | The browser view uses TypeScript and browser APIs to render its screens, with no UI framework in its code or runtime dependencies. | The browser view renders its screens with React and browser APIs, with no other UI framework in its code or runtime dependencies. | `tests/invariants/test_browser_view_framework.py` still refuses React; Slice 2 changes it with the packages. |
| `application-build-output` | Building the application compiles both the browser and the server TypeScript configurations. | … and bundles the browser's code into the file the page loads. | `tests/invariants/test_application_build_output.py` does not see the bundle yet; Slices 3 and 7. |
| `icon-credits` | … the game's footer shows a credit that names … | … the game's footer and the login card's section of credits each hold a credit that names … | `tests/invariants/test_icon_credits.py` reads the footer alone; Slice 9. |

So from this commit until those slices these three sentences say more than their tests check. The plan's order brings that; nothing is `Violated: yes`, and the request names each altered test (WAY-03).

## Checks

| Command | Exit code | Result |
|---|---:|---|
| `python -B .the-way/elements/common/foundation_check.py`, run after the first write, after the fixes, and on the commit | 0 | `0 errors` each time |
| Each passage of the five new facts and of D-03's *Based on* compared with its address, by a script in the scratchpad that drops the markup | 0 | 19 passages, 0 missing |

Not run: the product's gate, as the handoff says; `tests/invariants/test_browser_view_framework.py` and the other citing tests, since no code they read changed. The Stack Overflow address of D-03's *Based on* was read by a download and a search of its text, not by that script: its passage is a row of a chart, „React” and „44.7%” (`All RespondentsNode.js48.7%React44.7%…` under *Web frameworks and technologies*).

## Own-work check

- **Requirement most likely unmet:** a *Rejected* of a row holding a way the writer derived (WAY-134), and F19's rules holding a word React's documentation does not back.
- **Check:** each *Rejected* of D-259 to D-263 and the additions to D-76 read against the *Not chosen* of its question and the row's *Source*; each clause of D-267's binding sentence read against the four facts' passages.
- **Result:** no derived way in those *Rejected*. In D-267 the fourth clause goes further than its source: React's page says Effects are not needed for those two cases, and the decision says they serve never. That is the product's own rule resting on the fact; the fact's sentence itself says no more than the page.

## Reaches beyond the dispatch

- `definicja_mvp2_loop2.md` in the vault, *Projected foundation changes*, entries D-03, D-06, D-27, D-36, D-96, D-97, `browser-view-framework`, `icon-credits`: the task quotes only binding sentences, and an entry is written whole, so the fields had to come from there.
- `rozpoznanie_mvp2/technologia_budowanie_ekranow.md` in the vault: D-03's *Based on* reads `TODO` in the definition, and a decision on the main branch takes no `TODO`.
- `plan_mvp2_loop2.md` in the vault, *Projected entries* and *Open questions*: the assignment of entries and the source of S6.
- `.runs/task-cycles/logowanie-w-react/cycle.md`: the questions Q9 and Q12 and the searches left open.
- `src/browser/view/app.ts:185-204`, `:268-278`, `:436-440`: whether „Potwierdzanie adresu…” stands above the forms today (it stands alone).
- `guidelines/styleguide-browser-view.md:162`, `:197-210`, `:277-292`: the handoff's second search.
- Sources outside the product, all read 2026-11-02: react.dev at commit 0821e7d9, the Node.js source at tag v24.17.0, the Stack Overflow survey of 2025.
- Rules of the user's instructions on scripts and git, read before the scripts and the commit.

## The two searches left to me

**„Above the account forms”.** The words of D-97, D-156, D-160, D-211 and D-225 need no change: D-261 names those five and says where that now is, the order of spec decision 8 keeps the sentence above the form, and „account forms” keeps meaning the card's forms. No such word stands in the invariants, the facts or the glossary. One thing the designer and the reviewer did not name: D-156 reads as if „Potwierdzanie adresu…” also stood above the forms, while To do 8 and row S4 put it on a waiting screen, where the code has it today. D-262 therefore carries `narrows D-156` and names that screen; D-156's words stay.

**The styleguide.** No foundation entry, so named here only. `guidelines/styleguide-browser-view.md` stays true with D-265: `:162` says shared controls stand in `src/browser/view/controls/`, and the line „Nowa wspólna kontrolka … trafia na stronę” at `:286`–`:287` does not catch a React form, which D-265 makes a second form of the same control, shown on the page through its DOM form. What it lacks: its list of deviations at `:196`–`:210` names `src/browser/view/controls/button.ts` by path, so a reader of `react-button.tsx` is not led there. Leaving it costs one reader's search and nothing breaks; naming the second form takes one sentence through `the-way-maintain-styleguide`, a route no slice of the plan holds. My recommendation: leave it to the first task that adds a React form of another control, unless the orchestrator is already opening that route.

## Choices, each with the way rejected and its cost if wrong

1. **`narrows D-03` in D-265.** D-03 says the screens are written as `.tsx`, while To do 9 leaves the other screens in DOM until their tasks. D-03 stands word for word as the gate approved it, and D-265's first sentence states the area where it prevails. Rejected: writing the exception into D-03, which departs from the approved wording, or leaving it unsaid, which makes every later DOM screen read as a breach. Cost if wrong: one relation and one clause to take back.
2. **D-36's *Rationale* changed by its subject.** The definition keeps „An existing small control shows…”, untrue of a card; a change describes the decision as it then stands (WAY-07). It now reads „The first screen built with React shows…”. This departs from „whole as the gate approved it” in *Rationale* alone. Rejected: keeping the stale sentence. Cost if wrong: one sentence.
3. **`document-test-memory-limit` reads Method `test` before its test stands.** The plan's row says so and Slice 1 writes the test; the template says an invariant whose test is not written reads `review`. Rejected: `review` here and a second edit in Slice 1. Cost if wrong: for the slices' span the entry promises a test no commit holds. If Slice 1 is reset, this must go back too.
4. **„More than ten test files” in D-268.** The spec says „more than about ten”; a binding sentence takes a number. Cost if wrong: none in practice, the condition reopens a question.
5. **Rules in D-268 and D-264's binding sentences.** The spec names the harness's rules and the rule for a throwaway file as content of the decision and of `guidelines/testing.md`; what forces later work stands in a binding sentence (WAY-05). So both decisions are long, within three sentences. The version of jsdom stands out of D-264: the lockfile holds it, and a version in the sentence would make each upgrade a decision.
6. **Scope of D-268 and *Part* of `document-test-memory-limit` name six parts**, since a file under `tests/` of any of them can load an imitation. Rejected: `browser-view` alone, which leaves the invariant unread by a change that can break it.
7. **The React sources stand at a commit of `reactjs/react.dev`**, the publisher's own frozen address, as the foundation's other facts on Playwright do. The page `react.dev` moves with its text, and 19.3 has no address of its own under `x.react.dev`.
8. **Four facts for F19 and not one:** they are about different things, each with its own reason to change (WAY-76). *Rests on* of `document-test-memory-limit` is `none`: `node-assert-failure-inspect` is a reason for D-268 and decides no commit's truth of that sentence (WAY-73).
9. **Origin of D-264 to D-267** points to the task's *Questions carried to cycle* in the vault, since `.runs/` leaves when the cycle closes; the reasoning stands in the entries. D-268 reads `none`: the task does not hold that question.
10. **D-96's *Rejected* and *Rationale*** take from the projection only what the card makes true; the word on a picture stays for task 3. D-27 does not yet take the projection's *Rejected* on a footer of every screen, which is task 24's. D-27's and D-96's *Verification*, `TODO` in the projection, keep their pairs, D-96 gaining one complying and one violating example of the card.

## Searches not found or unclear

- D-96's rationale in the definition says what the first screen shows of a picture; the task's *Out of scope* leaves it out, and I left it out. Clear, named so that task 3 finds it.
- The task's row S4 is narrower than its source: the row speaks of waiting screens, and question 4 also says nothing stands beside the card. I wrote the source's answer, since the row's *Source* names it and To do 8 repeats it. Question 11 (the card in the middle of the window) has no row and got no entry.
- `D-264`'s word „hidden”: the spec's table says happy-dom's `getComputedStyle` does not honour `hidden`, and I carried it into *Rejected* as measured there, not re-run.
- `Origin` for a decision from a spec: no earlier entry of the log cites a spec, and the template does not say what to do when the reasoning lives in a cycle's record that leaves the tree. See choice 9.
- Spec decision 10 says of `assert.equal(a, b, message)` of Node that „a message spares the building”. In Node 24.17.0 that holds for the loose `equal` and not for `strictEqual`, `deepStrictEqual` and `partialDeepStrictEqual`: `assertion_error.js:46-49` and `:269-271` build the diff there even with a message. The decision does not rest on it, since it trusts neither, but a reader of `node:assert/strict` should not take the sentence as general. Read, not run.
- Why the memory grows stays unproved, as the spec says; D-268's *Rationale* says so in place.

## Problems

None observed in the check. `foundation_check.py` does not compare *Method* with citing tests and does not open a path in a binding sentence, so `src/browser/view/account-card.tsx`, `tests/view/page-document.mjs` and `tests/view/memory-limit.mjs`, which stand in entries before they exist, pass unseen; Slices 1, 5 and 10 bring them.
