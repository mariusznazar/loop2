# D-448 — nowe brzmienie dla cyklu zadania 3 (katalog-map), część po części

Dla: doradcy dnia, do przekazania cyklowi zadania 3 jako uwaga przed scaleniem prośby z gałęzi `task/katalog-map`.
Źródło: wpis „(new) — How may a map differ from the map that opens it?” definicji `the project definition in the author's notes`, zatwierdzonej ponownie 2026-11-25 (odcisk 23150d4e; Mariusz, przez doradcę dnia: „1 c, 2 a, 3 tak — zatwierdzam”). Stan D-448 porównany z gałęzią `task/katalog-map` przy 8ae831a9 (`foundations/decisions.md`, nagłówek `### D-448`).
Wpis w fundamencie zmienia cykl swoją drogą (skill `the-way-record-decision`); ten plik mówi tylko, co ma w nim stać.

## 1. Drugi akapit — zastąpić w całości

Dziś na gałęzi:
> A map is harder than the map that opens it: in one map check of the balance instrument, the best reference program solves a smaller share of its map runs than of those of the map that opens it. A wall never refuses to be entered or solved for the lack of the thing it asks for.

Ma być, słowo w słowo:
> A map is harder than the map that opens it: measured with one character on both maps — the one the balance instrument's mode `progression` builds for the map that opens it, from what the maps before that one gave — the best reference program solves a smaller share of its map runs than of those of the map that opens it. A wall never refuses to be entered or solved for the lack of the thing it asks for.

## 2. Scope — bez zmiany

`simulation · balance-tools` (definicja ma to samo).

## 3. Relations — zostają jak na gałęzi

`derives from D-18 · derives from D-136 · derives from D-438` (definicja ma tu `TODO`; nie nadpisywać).

## 4. Verification — przykład „complies” i „violates” do nowej miary

Dziś „complies” porównuje watahę z Lasem — głębiej „a map check of the balance instrument”, a cykl zmierzył watahę trybem `check-map` (46,8%) wobec Lasu — głębiej trybem `progression` (92,4%) — dwiema różnymi miarami. Propozycja brzmienia (cykl może je dopasować, byle mierzyło jedną postacią):
> - complies: Las — wataha added as a row of the game maps' data, opened by Las — głębiej and differing from it by its numbers alone, measured with the character the mode `progression` builds for Las — głębiej, its best reference program solving a smaller share of its map runs than the best program of Las — głębiej does of theirs; a map whose solving condition brings in combat, with the next map after it opened by it
> - violates: a new map whose best reference program, measured with one character on both maps as the second paragraph gives, solves a share of its map runs not smaller than that of the map that opens it, where its solving condition holds no new rule; a wall whose entry or whose solving is refused until the player holds the thing it asks for

## 5. Rationale — zastąpić jedno zdanie

Usunąć (to odrzucona miara):
> The harder map is told by the check of the balance instrument that measures every map with the character built from what the maps before it gave, so the order of the maps is checked at each new map.

W jego miejsce, słowo w słowo z definicji:
> Two maps are compared with one character because a map measured easier than the map that opens it shows a fault of the measure, not of the map: measured with the character built from what the maps before it gave, a map has the practice that the first solving of its opener paid, while its opener is measured without it. In the product's own measurement of 2026-11-25, on the seeds 1 to 500 with every reference program of that day, whose record is not open to a reader of the repository, Las measured so came out easier than Skraj lasu, which opens it — its best program solved 99.4% of its map runs against 97.4% — while measured with the character of Skraj lasu its best program solved 71.8%. The sentence names the mode of the balance instrument with which the tasks measure maps, since another mode, the map check, measures only the maps an overlay adds and builds no character from the maps before a map.

Reszta *Rationale* z gałęzi zostaje.

## 6. Rejected — zastąpić „unknown”

Słowo w słowo z definicji:
> every map asking for another program, by which a map that differs by a number alone is a slider moved into the map's data — about twenty maps would have to be invented so that each asks for another program; the sentence "Only a wall asks for something new" alone, with a map that brings a new rule into its solving condition left to a reading kept outside the entry — a reader of the entry alone takes it that only walls bring anything new; a gate, a wall solved under 10% of its map runs without the thing it asks for — the concept of the game names the passage of a map "from a decision into a gate" a price; each map measured with the character built from what the maps before it gave, as the mode `progression` measures it — Las, a map in the game, comes out easier than Skraj lasu, which opens it, so the sentence would be untrue of it while only a new map is checked, and the cause lies in the measure, not in Las; the map check as the measure — it is not the mode with which the tasks measure maps, it measures only the maps an overlay adds, and it builds no character from the maps before a map; the measure of the mode `progression` kept, named, and the sentence narrowed to maps added from now on — not needed, since measured with one character Las is harder than Skraj lasu; the numbers of Las changed so that it measures harder — the cause lies in the measure, not in Las, and a decision names the numbers of Las as requirements of the game; an exception for Las, as Las — matecznik has one from the rule that a map can be solved with what the maps before it gave — the cause lies in the measure, not in Las.

## 7. D-449 — bez zmiany

Jej *Rationale* mówi o mapie mierzonej postacią z własnej drogi map, czego nowa miara też nie sprawdza (krytyka zmiany definicji, M5).

## 8. Sprawdzenie watahy tą samą postacią, zanim zadanie 4 doda miarę do `progression`

Skrypt (roboczy, nieśledzony przez git): `the day's advisor's measurement script (outside the repository)`. Czyta zbudowaną grę ze ścieżek względnych od swojego katalogu, więc na gałęzi cyklu trzeba go skopiować do drzewa roboczego cyklu i tam zbudować grę:

```sh
cd the task's worktree
mkdir -p .runs/k9-measure
cp the day's advisor's measurement script (outside the repository) .runs/k9-measure/
node scripts/build.mjs
node .runs/k9-measure/same-character.mjs > .runs/k9-measure/result.md
```

Wynik: sekcja mapy otwieranej przez `forestDeep` (Las — głębiej) — „verdict: harder” znaczy, że wataha mierzona postacią Lasu — głębiej wychodzi trudniejsza. Na `main` 97936c24 pomiar trwał około 2 minut dla trzech map; z watahą i matecznikiem dłużej. Matecznik (0% dla każdego programu) wychodzi „harder” trywialnie.
