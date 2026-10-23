# Report 07 — foundation entries (before slice 1)

- **Status:** done with concerns
- **Branch and commit:** `task/styleguide-loop2`, one commit `19d0116c7eab158a464503731fed494166e1b69a`
  ("docs: record the styleguide foundation of browser-view") on the base
  `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`. Not pushed. Author address `<private address>`.
- **Method:** `.the-way/task-cycle/change/SKILL.md` (foundation step of
  `.the-way/task-cycle/skill/SKILL.md`, "Execute, verify and review"), each entry through its pinned
  element skill: `.the-way/elements/decisions/skill/`, `invariants/skill/`,
  `environment-facts/skill/`, `part-map/skill/`, with `elements/common/rules.md`,
  `elements/common/way_of_working.md`, each element's `template.md` and examples (the-way WAY-03,
  `fingerprint-definition`, its environment facts). The glossary skill's template was read for the
  search; no term was written (see *Choices*).

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 158 | 4 |
| `foundations/invariants.md` | 50 | 0 |
| `foundations/environment_facts.md` | 36 | 0 |
| `foundations/part_map.md` | 13 | 0 |

No code, test, guideline or instruction file changed. `guidelines/coding.md` still restates D-28
without CSS (its section "Odłożone rodzaje i formatowanie"); `foundation_check.py` does not complain
about it — it checks only that the decisions, invariants and parts the guidelines name exist. Slice 1
brings it in line (plan C10).

## Identifiers written

| Row | Entry | Kind |
|---|---|---|
| 1 | D-38 — Which styleguide discipline does loop2 adopt for the browser view? | decision |
| 2 | D-39 — What do the signal colours of the browser view mean? | decision |
| 3 | D-40 — What do the neutral roles of the browser view mean? | decision |
| 4 | D-41 — What do the roles of the terrain grid and of keyboard focus mean? | decision |
| 5 | D-42 — Which accessibility requirements does the browser view keep? | decision |
| 6 | D-43 — What counts in the browser view as a value written in place of a design token? | decision |
| 7 | D-44 — Which controls do the screens of the browser view build on? | decision |
| 8 | D-45 — Where does the browser view's kitchen-sink page stand? | decision |
| 9 | D-46 — Which fonts does the browser view use, and where do they come from? | decision |
| 10 | D-28 — changed in place: CSS joins the deferred kinds beside HTML | decision (change) |
| 11 | `browser-view-token-values` | invariant, test |
| 12 | `browser-view-focus-outline` | invariant, test |
| 13 | `design-token-contrast` | invariant, test |
| 14 | `design-token-sources` | invariant, test |
| 15 | `application-build-kitchen-sink` | invariant, test |
| 16 | `wcag-text-contrast` | environment fact |
| 17 | `wcag-non-text-contrast` | environment fact |
| 18 | `wcag-focus-visible` | environment fact |
| 19 | `geist-licence` | environment fact |
| 20 | D-47 — Which elements of the browser view are controls, and how does their focus show? | decision |
| QA-4 | `wcag-contrast-ratio` | environment fact |
| search | `css-colour-values` | environment fact (not in the plan — see *Concerns*) |
| part map | lines of `browser-view`, `build-tools`, `agent-workflow`, *External context* | part map |

No row was found already stated by a current entry, so no row is tied to an existing entry; row 10
is the change of D-28 the task commands.

### The five invariant test files

Named `test_<identifier with underscores>.py`, as `tests/invariants/` does for every invariant
(`icon-file-content` → `test_icon_file_content.py`). Three differ from the plan's proposal (C3):

| Invariant | Test file (in the part map) | Plan's proposal | Slice |
|---|---|---|---|
| `browser-view-token-values` | `tests/invariants/test_browser_view_token_values.py` | same | 4 |
| `browser-view-focus-outline` | `tests/invariants/test_browser_view_focus_outline.py` | `test_browser_view_visible_focus.py` | 4 |
| `design-token-contrast` | `tests/invariants/test_design_token_contrast.py` | `test_browser_view_contrast.py` | 3 |
| `design-token-sources` | `tests/invariants/test_design_token_sources.py` | same | 3 |
| `application-build-kitchen-sink` | `tests/invariants/test_application_build_kitchen_sink.py` | `test_kitchen_sink_outside_build.py` | 8 |

Why: an identifier names what its sentence constrains, never what it demands, and where another entry
constrains the same thing it adds the aspect it protects (`elements/invariants/template.md`, "Where
entries go"). "visible focus" and "outside build" name demands; the focus invariant constrains the
`outline` declarations; the contrast and sources invariants both constrain the token file
(`design-token-…`); the kitchen-sink invariant constrains the build's output, as
`application-build-output` does, adding the kitchen-sink aspect.

## Meaning of each entry, in Polish (for *What this request settles*)

- **D-38:** Loop2 przyjmuje szablon styleguide'u przypiętego the-way bez odstępstw: styleguide części
  `browser-view` ma każdą wymaganą regułę i przykład szablonu, w jego kolejności, i żadnej nie pomija.
- **D-39:** Kolory sygnałowe znaczą: `positive` — działa, jest w porządku albo aktywne; `warning` —
  uwaga, coś się nie wykona albo nie jest zapisane, także błędny wpis w polu; `danger` — grozi utrata
  postaci, postępu albo danych; `discovery` — odkryto coś nowego; `player-change` — zrobił to gracz;
  każdy jest rolą tekstu i stoi na tle strony, panelu i tle wyróżnionym.
- **D-40:** Role neutralne znaczą: `page` — tu jest gra, `panel` — wydzielony blok, `highlight` — ten
  wiersz albo tor jest zaznaczony, `divider` — koniec sekcji, `control-border` — to da się kliknąć albo
  wpisać, `selected` — to jest wybrane w grupie; tekst mocny, zwykły, pomocniczy, etykiety i wyłączony
  w znaczeniach z Q4, każda z pięciu ról tekstu stoi na trzech tłach, a `text` jest tekstem każdego
  z nich.
- **D-41:** Role siatki i fokusu znaczą: `character` — tu jest postać i tu idzie, cel kroku odróżniony
  kształtem (cienka przerywana linia), nie kolorem; `tile-hidden` — miejsca jeszcze nie znasz;
  `tile-revealed` — to miejsce znasz; `tile-edge` — granica między kafelkami; `link-highlight` — ten
  kafelek i ten wiersz listy to to samo miejsce; `depleted` — tego tu już nie ma; `focus` — tu
  jesteś, obsługując grę klawiaturą.
- **D-42:** Na razie każdy ekran interfejsu przyjmuje z WCAG 2.2 (rekomendacja W3C z 12 grudnia 2024)
  trzy kryteria — 1.4.3, 1.4.11 i 2.4.7 — i nic więcej z WCAG, bez terminu powrotu; każda rola tekstu
  poza wyłączonym ma co najmniej 4,5:1 na trzech tłach, tekst wyłączony nie ma progu, a ramka
  kontrolki, fokus, obrys postaci oraz kafelek odsłonięty wobec nieodsłoniętego — co najmniej 3:1.
- **D-43:** W plikach `browser-view` poza plikiem tokenów wartością wpisaną zamiast tokenu jest każdy
  kolor w dowolnym zapisie (w stylach i w TypeScripcie) oraz w stylach rozmiar albo odstęp w `px`,
  `rem`, `em`, nazwa czcionki i wartość bez jednostki — tylko grubość linii, wzór przerywania, krycie,
  waga czcionki; wyjątki: `0`, procenty, `fr`, `vw`, `vh`, słowa kluczowe, progi `@media`, geometria
  rysunku siatki w TypeScripcie, atrybuty `width`/`height` obrazków, wymiary układu i pliki ikon.
- **D-44:** Ekrany budują każdy przycisk, listę wyboru, pole liczby i pole tekstowe z sześciu
  wspólnych kontrolek z `src/browser/view/controls/`; „Zakończ”, „Usuń” i „Restart” są przyciskami
  niszczącymi; stan ładowania nie dotyczy żadnej kontrolki, dopóki żadna nie czeka na serwer.
- **D-45:** Stronę wszystkich stanów buduje z `src/browser/kitchen-sink/` i otwiera lokalnie osobna
  komenda `npm run kitchen-sink`; nic, co pisze `npm run build` (a to trafia na serwer testowy), jej
  nie zawiera; strona pokazuje kontrolki w stanach, role i próbki kafelków narysowane rolami, nigdy
  rysunek gry ze stanu gry.
- **D-46:** Czcionki interfejsu to Geist i Geist Mono; ich pliki i plik licencji pochodzą z wydania
  github.com/vercel/geist-font, leżą w `assets/fonts/` i są kopiowane przy budowaniu; gra nie pobiera
  czcionek z obcych serwerów.
- **D-47:** Kontrolką jest każdy element HTML, na który przeglądarka pozwala wejść klawiaturą, linki
  też, a kod niczego nie oznacza; fokus rysuje jedna reguła `:focus-visible` arkusza gry z roli
  `focus`, a żaden inny styl ani kod `browser-view` nie ustawia `outline`, poza tą samą regułą z
  drugim selektorem próbki fokusu na stronie wszystkich stanów.
- **D-28 (zmiana):** CSS dołącza do rodzajów kodu odłożonych obok HTML — bez wzorca i bez własnych
  wytycznych rodzaju.
- **`browser-view-token-values`:** Żaden plik części `browser-view` poza `src/browser/tokens.css` nie
  zawiera w swoim tekście wartości wpisanej zamiast tokenu w rozumieniu D-43 — test.
- **`browser-view-focus-outline`:** W arkuszach stylów `browser-view` `outline` i `outline-*` stoją
  tylko w regułach `:focus-visible` z roli `focus`, `styles.css` ma taką regułę, a drugi selektor
  (próbki fokusu) ma tylko reguła `src/browser/kitchen-sink/kitchen-sink.css` — test.
- **`design-token-contrast`:** Wartości z `tokens.css` dają co najmniej 4,5:1 dla dziewięciu ról
  tekstu na trzech tłach, 3:1 dla ramki kontrolki i fokusu na trzech tłach, dla obrysu postaci na obu
  kafelkach i dla kafelka odsłoniętego wobec nieodsłoniętego, liczone wg definicji WCAG 2.2 — test.
- **`design-token-sources`:** `tokens.css` ma tylko regułę `:root` i reguły `@font-face`, a po `;`
  każdej deklaracji, w tej samej linii, stoi komentarz `Source:` z niepustym tekstem — test sprawdza
  obecność wpisu, nie jego prawdziwość.
- **`application-build-kitchen-sink`:** Nic, co pisze `npm run build`, nie zawiera strony wszystkich
  stanów ani kodu skompilowanego z `src/browser/kitchen-sink/` — test.
- **`wcag-text-contrast`:** Kryterium WCAG 2.2 1.4.3 (AA) wymaga kontrastu tekstu co najmniej 4,5:1,
  dużego tekstu 3:1, a tekst nieaktywnego komponentu, dekoracja, tekst niewidoczny, część obrazu
  i logotyp nie mają wymagania.
- **`wcag-non-text-contrast`:** Kryterium WCAG 2.2 1.4.11 (AA) wymaga 3:1 względem sąsiednich kolorów
  dla informacji wizualnej identyfikującej komponenty i ich stany oraz dla części grafiki potrzebnych
  do zrozumienia treści, z wyjątkami komponentów nieaktywnych i niezmienionych przez autora.
- **`wcag-focus-visible`:** Kryterium WCAG 2.2 2.4.7 (AA) wymaga, by interfejs obsługiwany klawiaturą
  miał tryb, w którym widać wskaźnik fokusu.
- **`wcag-contrast-ratio`:** WCAG 2.2 definiuje współczynnik kontrastu jako (L1 + 0,05) / (L2 + 0,05)
  i luminancję względną koloru sRGB jako 0,2126 R + 0,7152 G + 0,0722 B ze składowymi
  linearyzowanymi progiem 0,04045.
- **`geist-licence`:** Repozytorium vercel/geist-font licencjonuje swoje czcionki, w tym Geist Sans
  i Geist Mono, na SIL Open Font License, Version 1.1.
- **`css-colour-values`:** CSS Color 4 zapisuje kolor jako kolor szesnastkowy, funkcję koloru, nazwę
  koloru, `transparent`, `currentColor` albo kolor systemowy; nazwy kolorów (6.1) i kolory systemowe
  (6.2) to słowa kluczowe bez względu na wielkość liter, a przeglądarki obsługują też przestarzałe
  kolory systemowe z Dodatku A.
- **Mapa części:** `browser-view` dostaje pliki `src/browser/*.css`, `src/browser/kitchen-sink/**`,
  `assets/fonts/**` i cztery testy niezmienników, a granicę zaufania `assets/fonts/**`; `build-tools`
  — `tsconfig.kitchen-sink.json`, test `application-build-kitchen-sink` i granicę zaufania
  `scripts/kitchen-sink.mjs`; `agent-workflow` — `src/browser/AGENTS.md`; *External context* —
  wiersz github.com/vercel/geist-font, them → us, untrusted.

## Sources and read dates

Every passage was read from the source in this session, never from memory or from the task's
*Context*. Read date 2026-10-23 (local date; the machine's UTC clock read 2026-10-22 23:20 at the
download).

| Source | Used by | Read |
|---|---|---|
| https://www.w3.org/TR/2024/REC-WCAG22-20241212/ ("W3C Recommendation 12 December 2024") — §§ 1.4.3, 1.4.11, 2.4.7, Glossary "contrast ratio", "relative luminance" | `wcag-text-contrast`, `wcag-non-text-contrast`, `wcag-focus-visible`, `wcag-contrast-ratio` | 2026-10-23 |
| https://raw.githubusercontent.com/vercel/geist-font/d1d9ce6e929a35f0e24b7cd10573f17db58196a0/readme.md (the repository's `main` at that commit; `README.md` in upper case is 404, the file is `readme.md`) — second heading, § License | `geist-licence` | 2026-10-23 |
| https://www.w3.org/TR/2026/CRD-css-color-4-20261022/ ("W3C Candidate Recommendation Draft, 22 October 2026") — § 4.1, § 6.1, § 6.2, Appendix A | `css-colour-values` | 2026-10-23 |
| https://registry.npmjs.org/geist/1.8.2 — `"peerDependencies":{"next":">=13.2.0"}` (`latest` dist-tag is 1.8.2) | D-46 *Based on* | 2026-10-23 |

The three WCAG criteria stand on the page as the task's *Context* gives them, word for word; the
task joins the runs of 1.4.3 and 1.4.11 with their labels ("Large Text: …"), while the entries quote
each run as its own passage, as the facts template's "Source" requires.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` on the base `00e53ae`, before any edit | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` after the entries, at `19d0116` | 1 | `12 errors`, exactly the pattern errors of the plan's pattern table under this report's test names (full list below); no other error |
| passage check: a scratch script (`…\scratchpad\verify.py`) that downloads nothing, reads the saved pages and tests every quoted passage of the six new facts and of D-46's *Based on* as a substring of the page's text with markup dropped and whitespace ignored | 0 | 32 passages (31 in the facts, 1 in D-46), 0 missing. Its first run, comparing with whitespace kept, reported 8 passages missing — all from spaces my tag stripping put inside inline markup — which shows the check can fail |
| own-work check: a scratch script testing that every enumerated item of rows 2–9, 13 and 20 stands in its entry (e.g. each exemption of row 6, each pair of row 13), with a control that `text-disabled` is absent from `design-token-contrast` | 0 | 0 missing; control: absent |
| `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py` (the one test that reads `foundations/part_map.md`) | 0 | 1 test, OK |
| probe: `src/browser/AGENTS.md` created and staged for a moment, `foundation_check.py` run, then unstaged and deleted | 1 | `11 errors` — the `src/browser/AGENTS.md` pattern error goes and no "claimed by" error comes, so Slice 9's file is claimed cleanly. Worktree clean afterwards |

`foundation_check.py` errors at `19d0116`:

```
foundations/part_map.md:8: the pattern `src/browser/*.css` in the *Files* of `browser-view` matches no file git tracks
foundations/part_map.md:11: the pattern `src/browser/kitchen-sink/**` in the *Files* of `browser-view` matches no file git tracks
foundations/part_map.md:13: the pattern `assets/fonts/**` in the *Files* of `browser-view` matches no file git tracks
foundations/part_map.md:19: the pattern `tests/invariants/test_browser_view_token_values.py` in the *Files* of `browser-view` matches no file git tracks
foundations/part_map.md:20: the pattern `tests/invariants/test_browser_view_focus_outline.py` in the *Files* of `browser-view` matches no file git tracks
foundations/part_map.md:21: the pattern `tests/invariants/test_design_token_contrast.py` in the *Files* of `browser-view` matches no file git tracks
foundations/part_map.md:22: the pattern `tests/invariants/test_design_token_sources.py` in the *Files* of `browser-view` matches no file git tracks
foundations/part_map.md:25: the pattern `assets/fonts/**` in the *Trust boundary* of `browser-view` matches no file git tracks
foundations/part_map.md:75: the pattern `tsconfig.kitchen-sink.json` in the *Files* of `build-tools` matches no file git tracks
foundations/part_map.md:90: the pattern `tests/invariants/test_application_build_kitchen_sink.py` in the *Files* of `build-tools` matches no file git tracks
foundations/part_map.md:94: the pattern `scripts/kitchen-sink.mjs` in the *Trust boundary* of `build-tools` matches no file git tracks
foundations/part_map.md:108: the pattern `src/browser/AGENTS.md` in the *Files* of `agent-workflow` matches no file git tracks
12 errors
```

Not run, with reason:

- `npm test` — the cycle runs the full suite before the request (`make-change` §3); this stage changed
  only Markdown of `foundations/`.
- The five invariant tests — none exists yet; each is written and seen failing once in the slice
  that brings it (3, 4, 8).
- `check_instructions.py` — no instruction file changed.

## Own-work check (section 3)

- Requirement most likely missed: "each row whole … its meaning the row's" — an enumeration of a row
  (the exemptions of row 6, the pairs of row 13, the roles of rows 2–4) shortened in the English
  wording.
- Check: the own-work script above, term by term against each entry.
- Result: nothing missing. Read by hand as well: rows 1, 7, 8, 9, 10, 14, 15 hold every clause.

## Choices, with the way rejected and the cost if wrong

1. **Test file names from identifiers** (above). Rejected: the plan's names. Cost: Slices 3, 4 and 8
   and the plan's pattern table take the new names — three names, no other change.
2. **One fact for both WCAG definitions** (`wcag-contrast-ratio`), as QA-4 and the plan name one.
   Rejected: two entries, contrast ratio and relative luminance; the template allows two facts of one
   edition only as two entries "about different things", and the invariant uses them only together.
   Cost: a split later, one new identifier and a *Rests on* edit.
3. **An extra fact, `css-colour-values`**, which the plan does not list. The search found that
   `browser-view-token-values` takes its condition from D-43, which counts "a named colour or a
   system colour" — a list that CSS Color, not the product, holds; the invariants template's "Links"
   puts such a fact in *Rests on*, and `TODO` there is no longer allowed once facts exist
   (`rules.md`). Rejected: *Rests on* `none`, leaving Slice 4's test to write the list of named and
   system colours from memory. Cost: one fact to keep; the edition is a Candidate Recommendation
   Draft that W3C republishes often, so the passage needs re-reading when a later task touches it.
4. **Kinds and hues out of the binding sentences.** The decisions carry meanings and pairs; the
   kinds of Q18 stand in the styleguide's table, the hues (green, orange…) only in D-39's rationale,
   since Q3 lets values change freely. Rejected: kinds and hues in the binding sentences. Cost: none
   to code; a reviewer reads kinds from the styleguide.
5. **No glossary term.** "role", "control", "design token", "kitchen-sink page" keep meanings a
   reader of UI design gives them (D-47 states which HTML elements the focus rule treats as controls);
   "element", which the-way's glossary holds as a division of the foundation, is written "HTML
   element" (WAY-104); the-way's "entry" is avoided ("a comment opening with `Source:`"). Rejected:
   entries for "role" (ARIA's `role` is the nearest other reading) and "control". Cost: a reader
   taking "role" as ARIA's — the backticked role names make the meaning plain.
6. **D-47 writes row 12's exception into its binding sentence** — the kitchen-sink page's stylesheet
   repeats the rule with one more selector — so D-47 and `browser-view-focus-outline` do not collide
   (template "Binding sentences": an exception foreseen is written in).
7. **D-44 lists no states and D-46 no use of Geist Mono.** Both stand in Q12 and Q11, not in rows 7
   and 9; the styleguide (Slice 1) carries them. Rejected: widening the decisions beyond their rows.
8. **Relations:** D-43, D-44, D-45 derive from D-38 (each serves a rule the adopted template names);
   D-47 derives from D-42. D-39–D-42 and D-46 have none.
9. **Origin** of D-38–D-47 points to the task note in the vault,
   `styleguide_loop2.md (Notes/Projects/(P) Loop/_zadania)`, its question headings, as D-10 and D-19
   do for their task notes; never to `.runs/`, which is ignored.
10. **D-28:** the binding sentence adds "and CSS" to the deferred exemplars; the *violates* example
    gains "a stylesheet exemplar or guidelines of their own for stylesheets"; *Rationale* and
    *Rejected* gain Q17's reason and the rejected way. An earlier draft also wrote "none of these
    kinds having an exemplar or guidelines of its own" into the binding sentence; I took it out,
    since it would have bound the other deferred kinds beyond what row 10 carries (WAY-30).
11. **D-46 *Based on*** cites the npm registry's document of `geist` 1.8.2 for the rejected way, as
    the spec asks; the claim that npm installs peer dependencies by default (spec Decision 3) is not
    written, since no source was read for it.

## Concerns the next dispatch depends on

1. **Three renamed test files** — Slices 3, 4 and 8 create `test_design_token_contrast.py`,
   `test_browser_view_focus_outline.py` and `test_application_build_kitchen_sink.py`; the plan's
   pattern table and each slice's *Checks* read those names. Each test cites `# invariant: <id>`
   with the identifiers above.
2. **`css-colour-values` is new** — Slice 4's maker takes the named colours (§ 6.1 table) and system
   colours (§ 6.2, and the deprecated ones of Appendix A) from
   https://www.w3.org/TR/2026/CRD-css-color-4-20261022/, never from memory. The deprecated system
   colours include common words (`Background`, `Menu`, `Window`, …) that whole-word matching in
   TypeScript string literals may hit; whether D-43's "system colour" takes them in is a reading for
   the spec's Decision 8 and Slice 4. My recommendation: count them, as CSS does, and let the test's
   probes show the cost.
3. **`Method: test` before the tests exist.** The five invariants read `test` on this commit, while
   their tests come in Slices 3, 4 and 8; the invariants template says an invariant whose test is not
   written reads `review` (WAY-61), and the invariant skill says the test is written "in the change
   that brings the entry". I read "the change" as the whole request, so the merged state holds both.
   `foundation_check.py` does not report it. If the orchestrator reads WAY-61 per commit, the five
   should read `review` here and each slice turns its own to `test`.
4. **`src/browser/AGENTS.md` is redundant in the map** — the pattern `AGENTS.md` without a slash
   already matches it at any depth, as git matches attribute patterns. Written as the plan's C9
   asks; the probe shows it claims cleanly once the file exists.
5. **Q12 leaves one state open** — "błąd — pola przyjmujące wpis" does not say whether the select
   list has the error state; "pusty — listy i pola" names lists explicitly. D-44 does not settle
   states, so Slice 1 (styleguide) and Slice 6 (controls) meet this; I recommend error for the number
   and text fields only, with "not applying" and the reason for the select list.
6. **D-42 names the edition** "WCAG 2.2, the W3C Recommendation of 12 December 2024", as the facts
   template's "Catalogues and obligations" asks of an adopting decision.
