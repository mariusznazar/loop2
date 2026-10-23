# Report 30 — return step (cycle step 11)

- **Status:** done with concerns
- **Branch and commit:** `task/styleguide-loop2`, one commit
  `464187d4b84964850e633c52978de9afb68f8085` ("docs: bring the styleguide foundation in line with
  its code in the return step") on the base `b33aa2761e00fef538c569dc5860ecef4dd28e62`. Not pushed.
  Author address `<private address>`. Worktree clean after the commit.
- **Method:** project skill `the-way-make-change` → `.the-way/task-cycle/change/SKILL.md` at the pin
  `f0b2130` (gitlink and `git -C .the-way rev-parse HEAD` agree); step 11 and "The foundation step
  writes the entries the task carries" of `.the-way/task-cycle/skill/SKILL.md`; each entry through
  its pinned element skill (`elements/decisions/skill/`, `invariants/skill/`,
  `environment-facts/skill/`, `part-map/skill/`, `glossary/skill/`) with `elements/common/rules.md`,
  `elements/common/way_of_working.md` and each element's `template.md`. No subagent.

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 28 | 13 |
| `foundations/environment_facts.md` | 13 | 1 |
| `foundations/invariants.md` | 3 | 3 |
| `foundations/part_map.md` | 2 | 2 |
| `guidelines/styleguide-browser-view.md` | 2 | 2 |
| `tests/invariants/test_browser_view_focus_outline.py` | 4 | 4 |
| `tests/invariants/test_browser_view_token_values.py` | 2 | 1 |
| `tests/invariants/test_design_token_sources.py` | 2 | 2 |

No product behaviour changed: no file under `src/`, `scripts/`, `assets/` or a configuration file.
The three test files changed in their docstrings only (invariant tests altered — the request names
them, WAY-03).

## Return step (for the record's section)

- **Foundation compared with code:** D-28, D-38..D-47, the five invariants, the six facts and the
  part-map lines of `browser-view`, `build-tools`, `deployment`, `agent-workflow` and
  `product-foundation`, each read against the code at `b33aa27`, plus the candidates of review 29.
  What no longer matched, and its correction:
  - D-39 — binding sentence held *will* (decisions template, "Binding sentences") and the bare
    word *entry*, a word of the-way's glossary, for a value typed into a field (WAY-104): reworded
    to "is not carried out" and "a wrong value typed into a field", in *Verification* and
    *Rejected* too (S1-M1). Meaning unchanged.
  - D-41 — "the target of its step" used *step*, the last word of the-way's "return step" and
    "foundation step", where the product's own word is *move* (D-25, `walk-target`): reworded to
    "the target of its current move" in the binding sentence, *Verification*, *Rationale* and
    *Rejected*. Meaning unchanged.
  - D-43 — complying example `var(--space-8)` names no token (`src/browser/tokens.css:60-66` holds
    `--space-2xs` … `--space-2xl`): now `var(--space-s)` (S1-M7).
  - D-46 — the placement of Geist Mono (chronicle and clock of the map run) stood only in the
    styleguide (`guidelines/styleguide-browser-view.md:105-106`) and `src/browser/styles.css:184-189`,
    carried by no decision (S1-M3); Q11 and To do 6 carry it, so D-46 gains it in its binding
    sentence and a complying and violating example.
  - The naming of design tokens — roles as `--<role>`, every other value named by what it is for,
    never by colour or number alone (spec Decision 1; styleguide `:82-87`) — binds after the merge
    and no decision carried it (S1-M3): new decision D-48; the styleguide rule "No value in place
    of a design token" now names D-43 · D-46 · D-48 and cites D-48 at that sentence.
  - `browser-view-focus-outline` — read literally, its first clause forbade the kitchen-sink rule
    its last clause allows (S1-M2): reworded to the reading its test makes (spec Decision 8,
    row 12); the test's docstring quotes the new sentence.
  - `design-token-sources` — said "on the line of the `;`" where the test requires the comment
    directly after the `;`, only spaces or tabs between (S1-M6): the sentence now says so; the
    test's docstring quotes it.
  - `browser-view-token-values` — its test decides what a font name is by CSS Fonts 4's generic
    family keywords and CSS Cascade 5's CSS-wide keywords, which no fact held (S4-m6): two facts
    written, named in *Rests on*; the test's docstring names them.
  - `geist-licence` — cited the readme at `d1d9ce6` (the repository's `main`), while the fonts come
    from release `v1.8.2`, commit `1d6dfdb` (S2-3): the source now cites the readme at
    `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`; the GitHub API gives `refs/tags/v1.8.2` →
    `1d6dfdb…`, and the readme is byte-identical at both commits, so the sentence stands.
  - Part map, `browser-view` and `build-tools` — their sentences named the game's screens and the
    application only, while the part's files now draw, and the part's scripts build and serve, the
    kitchen-sink page: both sentences name it. Every decision whose *Scope* and every invariant whose
    *Part* names either part was read against the wider sentence; none changes.
  - Compared and matching, no change: D-28 (CSS among the deferred kinds; `guidelines/coding.md`
    follows it), D-38, D-40, D-42, D-44, D-45, D-47, `design-token-contrast`,
    `application-build-kitchen-sink`, `wcag-text-contrast`, `wcag-non-text-contrast`,
    `wcag-focus-visible`, `wcag-contrast-ratio`, `css-colour-values`; the *Files*, *Trust boundary*
    and *Depends on* of every touched part (`foundation_check.py` 0 errors; the new code's imports:
    `kitchen-sink.ts` → `sim/` and `view/controls/`, within browser-view's `simulation`; scripts →
    `scripts/static-files.mjs`; the new browser-view invariant tests import `loop2_invariant_support`
    and `test_application_package_layout` of build-tools, as browser-view's and simulation's tests
    on the base already import the first — the product treats shared test support as no part
    dependency), the *External context* row of github.com/vercel/geist-font.
  - Compared and not corrected here — see *Concerns* 1 and 2: D-41 against the hover line on an
    unrevealed tile (S4-m1), and D-40's `control-border` on a disabled control (S6-m3).
- **Decisions written or changed:** D-39, D-41, D-43, D-46 changed in place; D-48 new.
- **Invariants written or changed:** `browser-view-focus-outline` (rule set by D-42, D-47 and the
  task's row 12), `design-token-sources` (D-38 and row 14), `browser-view-token-values` (D-43 and
  row 11; *Rests on* only) — wording only, meaning unchanged.
- **Environment facts:** `css-font-family-names`, `css-wide-keywords` new; `geist-licence` source
  changed.
- **Glossary terms:** none written. Uses of the-way's terms *entry* (D-39) and *step* (D-41)
  rewritten in their decisions (WAY-104). "control" was weighed: its uses (D-19, D-21, D-36, D-40,
  D-44, D-47, `program-editor.ts`, `status-row.ts`, test docstrings' positive "controls") all carry
  the meaning a reader of user interfaces gives it, D-47 states in its binding sentence which HTML
  elements the focus rule takes in, and the testing sense is a reader's meaning too — no entry, as
  the foundation step judged. "role" carries one meaning: no ARIA `role` attribute stands in `src/`.
- **Part-map changes:** `browser-view` and `build-tools` sentences.
- **Projected entries written whole or in part:** none (the task is "source only"; its *Context*
  found no projected entry its code makes true).
- **Rows of *Settlements to record* written:** none new — all 20 were written by the foundation
  step. Changed in this step: row 2 (D-39), row 4 (D-41), row 6 (D-43, its example), row 9 (D-46),
  row 11 (`browser-view-token-values`), row 12 (`browser-view-focus-outline`), row 14
  (`design-token-sources`), row 19 (`geist-licence`).

## Meaning of each entry written or changed, in Polish

- **D-39:** Kolory sygnałowe znaczą: `positive` — działa, jest w porządku albo aktywne; `warning` —
  uwaga, coś się nie wykona albo nie jest zapisane, także błędna wartość wpisana w pole; `danger` —
  grozi utrata postaci, postępu albo danych; `discovery` — odkryto coś nowego; `player-change` —
  zrobił to gracz; każdy jest rolą tekstu i stoi na tle strony, panelu i tle wyróżnionym.
- **D-41:** Role siatki i fokusu znaczą: `character` — tu jest postać i tu idzie, cel jej bieżącego
  ruchu odróżniony kształtem (cienka przerywana linia), nie kolorem; `tile-hidden` — miejsca jeszcze
  nie znasz; `tile-revealed` — to miejsce znasz; `tile-edge` — granica między kafelkami;
  `link-highlight` — ten kafelek i ten wiersz listy to to samo miejsce; `depleted` — tego tu już nie
  ma; `focus` — tu jesteś, obsługując grę klawiaturą.
- **D-43:** bez zmiany znaczenia; przykład zgodnej zmiany to odstęp zapisany jako `var(--space-s)`.
- **D-46:** Czcionki interfejsu to Geist i Geist Mono; ich pliki i plik licencji pochodzą z wydania
  github.com/vercel/geist-font, leżą w `assets/fonts/` i są kopiowane przy budowaniu; gra nie
  pobiera czcionek z obcych serwerów, a kronikę i zegar przejścia pisze Geist Mono, każdy inny tekst
  — Geist.
- **D-48 (nowa):** W pliku tokenów projektowych każda rola z tabeli ról styleguide'u jest własnością
  `--<rola>` pod własną nazwą, a każda inna wartość wyglądu — własnością nazwaną po tym, do czego
  służy, nigdy po kolorze ani po samej liczbie.
- **`browser-view-focus-outline`:** W arkuszach stylów `browser-view` `outline` i `outline-*` stoją
  tylko w regułach o selektorze `:focus-visible` — a w `kitchen-sink.css` także `:focus-visible`
  z drugim selektorem próbki fokusu — każda rysuje obwódkę z roli `focus`, a `styles.css` ma taką
  regułę z samym `:focus-visible` — test.
- **`design-token-sources`:** `tokens.css` ma tylko regułę `:root` i reguły `@font-face`, a zaraz po
  `;` każdej deklaracji, w tej samej linii, z samymi spacjami lub tabulatorami pomiędzy, stoi
  komentarz `Source:` z niepustym tekstem — test sprawdza obecność wpisu, nie jego prawdziwość.
- **`browser-view-token-values`:** bez zmiany zdania; test opiera się dodatkowo na faktach o nazwach
  rodzin czcionek i słowach kluczowych CSS.
- **`css-font-family-names` (nowy):** CSS Fonts 4 przyjmuje we własności `font-family` nazwy rodzin
  czcionek i nazwy rodzin ogólnych (`serif`, `sans-serif`, `system-ui`, `cursive`, `fantasy`,
  `math`, `monospace`, `ui-serif`, `ui-sans-serif`, `ui-monospace`, `ui-rounded` i funkcje
  `generic(…)`), a nazwę rodziny równą takiemu słowu albo słowu kluczowemu całego CSS każe brać
  w cudzysłów, bo przeglądarka nie bierze tych słów za nazwę rodziny.
- **`css-wide-keywords` (nowy):** CSS Cascade 5 określa pięć wartości wspólnych dla wszystkich
  własności CSS: `initial`, `inherit`, `unset`, `revert` i `revert-layer`.
- **`geist-licence`:** bez zmiany zdania; źródłem jest README repozytorium w commicie wydania
  `v1.8.2` (`1d6dfdb`).
- **Mapa części, `browser-view`:** część rysuje ekrany gry w przeglądarce oraz stronę wszystkich
  stanów z ich wspólnymi kontrolkami, rolami i kafelkami.
- **Mapa części, `build-tools`:** część dodatkowo buduje i podaje na komputerze dewelopera stronę
  wszystkich stanów.

## Sources read

Every passage was read from its source in this session, never from memory. Read 2026-10-23.

| Source | Used by |
|---|---|
| https://www.w3.org/TR/2026/WD-css-fonts-4-20261022/ ("W3C Working Draft, 22 October 2026") § 2.1, § 2.1.1, § 2.1.2, § 2.1.5 | `css-font-family-names` |
| https://www.w3.org/TR/2022/CR-css-cascade-5-20220113/ ("W3C Candidate Recommendation Snapshot, 13 January 2022") § 7.3, § 7.3.1–7.3.5 | `css-wide-keywords` |
| https://raw.githubusercontent.com/vercel/geist-font/1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4/readme.md § second heading, § License | `geist-licence` |
| https://api.github.com/repos/vercel/geist-font/git/ref/tags/v1.8.2 → `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`; `…/commits/main` → `d1d9ce6e…` | that `1d6dfdb` is the release commit |

Both CSS editions are the ones `tests/invariants/test_browser_view_token_values.py` copied its
lists from. Sources outside the product that the change rests on and that stay without a fact:
https://kantarion.bieda.it/ — the task binds the values as Q9–Q11 wrote them, not the running game,
which changes by itself, and no decision or invariant would be called into question by it;
https://openfontlicense.org — named inside the licence file; the SVG namespace URL of the icons.

## Checks

Logs in `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\1d1a68d6-a4ef-4c40-a07f-c510f1f4e29e\scratchpad\r30\`.

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `python -B .the-way/elements/common/foundation_check.py` (worktree, before the commit and again at `464187d`) | 0; 0 | `0 errors` |
| 2 | Passage check, `python -I tools/verify_return.py foundations/environment_facts.md css-font-family-names css-wide-keywords geist-licence` (scratchpad; each quoted passage a substring of the saved page's text, markup dropped, whitespace collapsed) | 0 | 11 passages, 0 missing. Positive control: a copy with two passages altered by one word — 2 missing |
| 3 | `python -B -m unittest discover -s tests/invariants -p test_browser_view_token_values.py` | 0 | OK |
| 4 | `python -B -m unittest discover -s tests/invariants -p test_browser_view_focus_outline.py` | 0 | OK |
| 5 | `python -B -m unittest discover -s tests/invariants -p test_design_token_sources.py` | 0 | OK |
| 6 | `python -B -m unittest discover -s tests/invariants -p test_design_token_contrast.py` | 0 | OK |
| 7 | `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py` (reads `part_map.md`) | 0 | OK |
| 8 | `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK (Ruff over the changed tests included) |
| 9 | `python -B .the-way/gate/run_tests.py tests/agent_workflow` | 0 | 5 tests OK |
| 10 | `python -B .the-way/instruction-files/check_instructions.py .` (reads `part_map.md`) | 0 | `0 error, 14 warn, 6 info` (the base's 14) |
| 11 | `git grep` for the old wordings (`target of its step`, `wrong entry`, `space-8` outside D-48's violating example, `will not be carried`, the old sentences of the two invariants) and for bare `step`/`steps` in `foundations/` | 1 / — | none left; `step` only in the base's "manual step" |
| 12 | `git ls-files --eol` of the changed files; `git diff --numstat HEAD~1` | 0 | line endings kept (CRLF working copies of `foundations/`, LF elsewhere); counts as in *Files changed* |

Not run, with reason:

- `npm test` as a whole — the cycle's run before the request (`make-change` §3); this commit changes
  Markdown of `foundations/` and `guidelines/` and three test docstrings, and the cycle's gate on
  `b33aa27` predates it.
- A failing run of an invariant test — no invariant's condition changed (wording, *Rests on* and a
  source only), and no test's code changed.

## Own-work check (section 3)

- Requirement most likely missed: "writes … each source outside the product that the change rests
  on and the foundation does not hold, as an environment fact" — a URL cited in the change's code or
  tests with no fact behind it.
- Check: every `http(s)://` address added by `git diff 00e53ae -- . ':!foundations' ':!.runs'`,
  against the addresses of `foundations/environment_facts.md` and the *Based on* of the decisions.
- Result: the three W3C editions the tests cite (CSS Color 4, CSS Fonts 4, CSS Cascade 5) and
  github.com/vercel/geist-font now each have a fact; https://kantarion.bieda.it/ (28 uses in
  `tokens.css` and the styleguide), https://openfontlicense.org and the SVG namespace stay without
  one, for the reasons under *Sources read*.

## Choices, with the way rejected and the cost if wrong

1. **D-48 as a new decision** rather than a sentence in D-43 (another question: what counts as a
   value in place of a token) or the styleguide sentence dropped (it binds later tokens). Cost if
   wrong: one decision withdrawn at the merge and two citations in the styleguide.
2. **Geist Mono's place in D-46** rather than a decision of its own: the same question, which fonts
   and where, from the same source Q11. Cost: a split later.
3. **Two facts, not one, for the font-name lists** — the facts template allows one source per entry
   (WAY-76), and CSS Fonts 4 and CSS Cascade 5 are two documents; the reviewer proposed one.
4. **Fact identifiers** `css-font-family-names` (what `font-family` takes as a family name and what
   as a keyword) and `css-wide-keywords`, named by what they are about, never by edition.
5. **D-41 takes "current move"**, the product's word in D-25, rather than a qualified "walking step";
   the design tokens `--step-target-width` and `--step-target-dash` stay, as code keeps the domain
   word unchanged (WAY-104).
6. **Part-map sentences widened** rather than left: the kitchen-sink page is no game screen and no
   application, so an agent reading the sentences for a new page file would not find its part.

## Concerns the next dispatch depends on

1. **D-41 against the code — not corrected (S4-m1).** On the terrain panel, hovering an unrevealed
   tile draws the white `link-highlight` line around it, though that tile has no row in the list of
   revealed tiles; D-41 gives `link-highlight` the one meaning "this tile and this row are the same
   place". In code: `src/browser/view/terrain-panel.ts:80-82` keeps the points of every tile. The
   entry is right (Q7, Q10 carry no exception); the code is what no longer matches, and changing it
   is a change of product behaviour, outside this step's boundary. My recommendation: a one-line fix
   (only revealed tiles in `tilePoints`) with its review before the request; otherwise the request
   names it as a known departure from D-41.
2. **D-40's `control-border` on a disabled control (S6-m3) — kept by a reading, not changed.** A
   disabled shared control keeps its `control-border` frame with its text in `text-disabled`. D-40:
   `control-border` "that something can be clicked or typed into", `text-disabled` "that this cannot
   be used now". I read the frame as saying what kind of thing it is and `text-disabled` as its
   present state, as Q4's „teraz” and Q12's disabled state („tekst wyłączony”, nothing else) give
   it, so code and decision agree and no entry changes. Were the human to read the frame as "usable
   now", that is a question for the human (a row's meaning not holding), not an entry to write; the
   request should name this reading.
3. **The return step committed**, so by step 11 a fresh reviewer reviews `b33aa27..464187d` with
   `the-way-review-change`, against the task and the entries written or corrected here.
4. **The request names** D-48 (new, from spec Decision 1, not from a row), D-46's added sentence
   (from Q11), the two new facts, the two part-map sentences, and the three invariant test files
   altered (docstrings only): `tests/invariants/test_browser_view_focus_outline.py`,
   `tests/invariants/test_design_token_sources.py`, `tests/invariants/test_browser_view_token_values.py`.
5. **The gate predates this commit**: `npm test` (with `foundation_check.py`) runs again on
   `464187d` or the head after any fix, before the request.
6. **CSS Cascade 5 edition**: the fact cites the 2022 Candidate Recommendation Snapshot the test
   copied from; whether a later snapshot lists another keyword was not checked.
