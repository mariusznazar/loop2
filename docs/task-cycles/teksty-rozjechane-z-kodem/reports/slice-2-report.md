# Slice 2 report — README: the browser check and the build point

**Status:** done

**Commit:** `1a79cc2` on `task/teksty-rozjechane-z-kodem` (range from slice base `2a85b42`). Amended once, before return, to fix the predicate of the browser paragraph; the amended commit is the only one.

**Files changed:** `README.md`, +5 / -3.

## What changed

(a) Browser paragraph (README line 76 at `2a85b42`, now line 78):
- "ze stopką" instead of "z stopką".
- "ekran przebiegu mapy" replaced by "ekran Przejście".
- "wiersz stanu z minutą … i panel terenu z listą kafelków" replaced by a sentence with a predicate: the header shows the character's name, the map's name and the game minute rising each second; under the drawing of the map stand the tabs „Kronika” and „Teren”; on the right stands the program.

(b) Build list (README lines 25-26 at `2a85b42`, now 25-28):
- Point 1 keeps only what the build writes.
- Point 2 (new) holds the Anokolisa sentence once: where the sprites come from, the pack's terms, and which sprite files are composed and which are cut out. "których warunki nie wymagają wzmianki" appears once. The foundation facts are unchanged; none added.
- Point 3 (new) is "`npm run kitchen-sink` nie kopiuje plików z `assets/sprites/`."
- Point 4 is the former point 2, `npm start`.
- Polish is kept.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `git diff --check -- README.md` (run before the amend and again after the predicate edit) | 0 | clean |
| `grep -rln "README" tests scripts .the-way/gate` | 0 | Only docstring mentions in 8 files, e.g. `tests/invariants/test_loop2_one_serving_process.py:10`. No test opens README.md or reads its text, so the one-command gate is not affected by this change. |
| Read check against sources (below) | n/a | All claims of the changed paragraph were checked against the files named below. |

Focused tests: none exist for the README (the grep above). The full `npm test` was not run, as the handoff requires.

## Own-work check (section 3)

- **Requirement:** the browser paragraph must say only what the screen shows today, and its new sentence must have a predicate.
- **Check:** read each claim of the new sentence against the code, and read the sentence for a predicate. The first draft ended "a po prawej program" with no verb. That was caught and fixed ("a po prawej stoi program") before return.
- **Result:** every claim of the changed paragraph matches the code (see the mapping below). The sentence has a predicate.

## Claim-to-source mapping (changed paragraph)

- "ze stopką" / the footer: `src/browser/view/footer.ts:92-93` (`createFooter` builds a `footer` element with the icon credits).
- "ekran Siedziba": `foundations/glossary.md:89` (headquarters = screen Siedziba).
- "ekran Przejście": `foundations/decisions.md:5957` (D-280, screen list) and `src/browser/view/run-screen.tsx:2` (the screen of a manual map run, Przejście).
- "nagłówek pokazuje nazwę postaci i nazwę mapy": `src/browser/view/run-header.tsx:61-64`.
- "minutę gry rosnącą co sekundę": `src/browser/view/run-header.tsx:65` (`clockText`). Reach beyond *Read*: `src/browser/view/status-row.ts:20-24` (`clockText` text is `Minuta N`) and `src/browser/sim/data/balance.ts:5` (`gameMinutesPerRealSecond: 1`, so one game minute per real second at pace 1; higher paces go faster, the sentence does not say so, as before).
- "pod rysunkiem mapy stoją zakładki „Kronika” i „Teren”": `src/browser/view/right-area.tsx:1-3` (area under the drawing) and `right-area.tsx:33-36` (`TABS`), placed in `run-screen.tsx:134-143`.
- "a po prawej stoi program": `src/browser/view/run-screen.tsx:9-10` (program in the right column) and `run-screen.tsx:124` (`run-program` section).
- "Mapy", "Las", "Wejdź": `src/browser/view/menu-bar.tsx:78` ("Mapy"), `src/browser/sim/data/maps.ts:62` ("Las"), `src/browser/view/maps-screen.tsx:316` ("Wejdź", reach beyond *Read*).
- Removed "panel terenu z listą kafelków": no such panel in the four files of *Read*; the tile table now sits under the tab „Teren" (`right-area.tsx:219-220`).
- Not re-verified this slice (unchanged text, not in *Read*): "Konto" / "Wyloguj" in the menu (`menu-bar.tsx:210`, `app.ts:127` confirm both words exist), and `/main.js` loading.

## Build-point claims (point 2 and 3)

- Point 3, `npm run kitchen-sink` copies no sprites: `scripts/kitchen-sink.mjs:27-29` copies only `index.html` and `kitchen-sink.css`. Reach beyond *Read*.
- Point 2, sprites from the pack, terms ask no credit: `foundations/environment_facts.md:606-608` (`pixel-crawler-terms`) and `foundations/decisions.md:5695-5697, 5720-5722` (D-271). Reach beyond the Read list only in that I read D-271 and the fact, both of which *Read* names as the decision and fact of the build point's sprites; the composed/cut-out split comes from the existing README text, which I did not change in fact.
- Point 1, what the build writes: `scripts/static-files.mjs:32-42` copies only `.png` files from `assets/sprites/` into `sprites/`. Reach beyond *Read*.

## Unread material

- `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:27-28` (To do, items 2 and 3): read in full earlier in the session.
- `foundations/part_map.md:84-116` (build-tools): read at `84-116`.
- `foundations/decisions.md:5937-5985` (D-280): read at `5955-5994`; the entry's whole text runs to the next heading, which I read through line 5994. The D-280 entry in the plan's range starts at 5937 in `adbec4b`; the identifier heading now sits at 5955.
- `foundations/decisions.md:6713-6784` (D-311): read in full at `6731-6785`.
- `foundations/decisions.md:7666-7690` (D-346): read at `7685-7709`; the entry runs to the next heading, D-347 at `7711`.
- `foundations/decisions.md:5675-5706` (D-271): read at `5693-5722`.
- `foundations/environment_facts.md:604-608` (pixel-crawler-terms): read in full.
- `foundations/glossary.md:87-91` (headquarters): read in full.
- Four source files (`run-screen.tsx`, `run-header.tsx`, `right-area.tsx`, `footer.ts`): read in full.
- Guideline files: none named by *Read*, none read.

## Searches not found or unclear

- The phrase "panel terenu z listą kafelków" has no match in the current code. The task and the plan say PR #58 removed it; I did not check the PR diff. The replacement describes the current code.
- "Kronika" and "Teren" are the tab names in `right-area.tsx`; the README did not name them before. No conflict found.
- The decision identifier D-313 and its neighbours were not needed for this slice.

## Reach beyond the handoff

- `src/browser/view/status-row.ts:20-24`: why: confirm the clock text.
- `src/browser/sim/data/balance.ts:5`: why: confirm the clock rises each real second at pace 1.
- `src/browser/view/maps-screen.tsx:316`, `src/browser/view/menu-bar.tsx:78,210`, `src/browser/sim/data/maps.ts:62`, `src/browser/view/app.ts:127`: why: confirm the names "Wejdź", "Mapy", "Konto", "Wyloguj", "Las" that the paragraph keeps.
- `scripts/kitchen-sink.mjs:27-29`, `scripts/static-files.mjs:32-42`: why: confirm the build-list points 1 and 3.
- `foundations/environment_facts.md:606-608` and `foundations/decisions.md:5695-5722` were read in full for point 2.
- Search over `tests` and `scripts` for README mentions: why: decide whether a test reads the README.

## Choices made

- **Order of the build list:** the sprite-source point comes before `npm run kitchen-sink` and `npm start`. Alternative: put the source point after `npm start`. Cost if wrong: none for the reader; only ordering.
- **Predicate fix:** "a po prawej stoi program" rather than dropping the clause. Cost if wrong: one extra clause; can be removed if the program on the right is not wanted.
- **Amend:** the slice's one commit was amended before return to fix the predicate, not a second commit. Nothing was pushed. Cost if wrong: none for the history; the commit is `1a79cc2`.

## Concerns for the orchestrator

1. **Intro sentence contradicts the new list.** The line above the list still reads "Sam serwer uruchamiają dwa polecenia, a `npm run typecheck` sprawdza ...". After the split, the list has four points, and only points 1 and 4 are commands. I did not change this, as it is outside the slice's stated scope. Recommend a small follow-up edit: e.g. "Sam serwer uruchamiają dwa polecenia z tej listy" or a rewording of the intro.
2. **Clock wording depends on pace.** "minutę gry rosnącą co sekundę" is true at pace 1 only. The paragraph is kept as the task says, not changed.
3. **Not in scope:** the rest of the README paragraph (Konto, Wyloguj, /main.js) was not re-verified this slice.
