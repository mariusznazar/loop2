# Handoff - reviewer of Slice 7 (7), task `katalog-map`

You review one range of a task cycle of the-way as an agent that did not make it. The person who requested the cycle
has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to
the orchestrator, never to the human. You are read-only on the product: you change no tracked file and make no commit.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; read a file it names only when its step comes.
- Range to review: `6b3d86a8..3e3c38a8` (compute the diff yourself: `git diff 6b3d86a8..3e3c38a8`, `git log 6b3d86a8..3e3c38a8`;
  confirm `git rev-parse HEAD` is `3e3c38a8`). Slice number: 7.
- Author's report (claims to verify, not evidence): `.runs/task-cycles/katalog-map/reports/executor-7-report.md`.
- Trust boundary: yes where the slice's *Risk* below says so - then check crafted/untrusted input at that boundary
  (files from outside, lasting-storage values). No irreversible operation.
- Judge the slice against the passages of the task copied below and the slice's *Goal*, *Change* and *Checks*. Guidelines
  (each whole): the ones the slice's *Read* names. Foundation: the entries the slice's *Read* names, by heading
  (`### D-nnn -`, `## <invariant-id>`; line numbers in the *Read* were counted at the base and moved). New decisions are
  D-448 and D-449. Foundation entries were written in commit `612476a6` (outside this range; part of the foundation you read).
- The full gate is not run by agents; you may run focused checks (a single test file, typecheck, eslint, prettier) and the
  foundation check `python -B .the-way/elements/common/foundation_check.py` (14 known citation errors with owners in
  Slices 8 and 9 stand until those slices; report any other).
- Your directory for working copies: `.runs/review-7/`.
- Report path: `.runs/task-cycles/katalog-map/reports/review-7-report.md` (the file is the input of the cycle's
  scripts, the case Claude Code's refusal of files named `report...` leaves open). Its first line is `PASS <sha>` or
  `FAIL <sha>` (or `questions`). It holds checks with commands and exit codes, **Unread material** and
  **Searches not found or unclear** (each `none` or the items). Return the first line, the checks, the report path.
- `cycle.md` and other files of `.runs/task-cycles/katalog-map/` are not yours to read unless named here.
- The slice is a trust-boundary slice: `src/browser/view/judging-cache.ts` reads the browser's lasting storage. Check crafted
  stored values against the new record family (types, negative/non-integer/huge numbers, missing or extra fields, another
  version, another account, truncated strings), that no exception leaves the cache, and that no email address or name is stored.
- The executor raises one question for you to judge against the foundation: D-441 (read it whole) says the record, "on opening
  and at a refusing storage, [is] treated as the judgings are". The executor did NOT remove the stored record when a write is
  refused, because that would let the record fall after a reload, and says the existing judgings' handling at a refusing storage
  is unclear against it. Compare what the cache does for a judging at a refused write with what it now does for the record, and
  decide whether the record's handling is "as the judgings are" and whether it breaks the sentence of D-441 or D-440 ("never falls").
  Grade that as a finding (or not) by the review's rules.
- The executor chose: a stored `damage` above `health` reads as none; reading takes the higher of the storage and the page's memory;
  key `loop2-judging-record-1|<account>|<moment>|<map>`. Judge these against D-440/D-441 and `judging-cache-reading`.

## The slice, copied word for word from the plan

### Slice 7 — The record of the most damage in the browser's lasting storage

- **Goal:** `src/browser/view/judging-cache.ts` keeps, beside the judgings, the record of one account, one game and one
  map: the most health the creature of the map lost in one fight of any judging made in this browser (the number Slice 6
  gives for a seed), as a value under a key of its own with its own version in the key and the account's identifier,
  the game's moment and the map in it, and holding, besides the number, the health and the blow of the creature as the
  game's data give them when the record was made. The cache offers a way to read the record for a map and a creature's
  numbers — it gives the number only where the stored creature numbers equal those given, so a record made at other
  numbers shows nothing — and a way to offer a new number, which replaces the stored one only where it is higher; the
  record never falls after another program or a character's death, and a judging that took less leaves it. As the
  judgings are, the record is read only in the form the cache writes, a value of another form or another version of
  the key is read as none, a key of another version is neither read, written nor removed, a refusing storage leaves
  the record for the open page alone, and no exception of the storage leaves the cache. On opening the cache removes
  the records of the account under the moment of another game and, where the page built the game after a refused save,
  the records of this game, as it does for the judgings; the values of other accounts stay. The value holds nothing
  but the number and the creature's numbers, no email address and no name. The tests are in a new file; the existing
  tests of the cache stay green.
- **Change:** `src/browser/view/judging-cache.ts` · `tests/view/judging-cache-record.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:31-31` To do 4 · `.runs/task-cycles/katalog-map/task.md:91-95` Q7 · `.runs/task-cycles/katalog-map/task.md:175-176` D-440 and D-441 in *Decisions in play* · `foundations/decisions.md:12159-12235` D-440 and D-441 · `foundations/invariants.md:1468-1476` judging-cache-reading · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `tests/view/judging-cache.test.mjs:1-120`
- **Model:** same — storage read at a trust boundary whose rules (forms, versions, refusals, tidying) the executor must keep whole
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts` reads the browser's lasting storage (part map, `browser-view`)
- **Checks:** `npm test -- tests/view/judging-cache-record.test.mjs` · `npm test -- tests/view/judging-cache.test.mjs` · `npm test -- tests/view/judging-cache-page.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/judging-cache.ts` · `npx prettier --check src/browser/view/judging-cache.ts`
- **Depends on:** Slice 6 · Foundation entries (D-440, D-441)

## Passages of the task the slice's Read names (word for word, address given)

### .runs/task-cycles/katalog-map/task.md:175-176
```
- D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?, zdanie: „The game remembers the last judging of each character, program and map in the browser that made it, as D-441 gives: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329).” Zmiana (Q2 b, „liczbą jak w a”, którego koszt nazwał D-439–D-441, i Q7 a): na mapie, której dane każą pokazać tę liczbę, gra pamięta w tej przeglądarce rekord — najwięcej zdrowia stworzenia mapy, jakie zdjęła któraś ocena (w jednym starciu, według ustawienia domyślnego z *To do* 4) — który nie przepada przy zmianie programu ani przy śmierci postaci, rośnie z lepszą oceną i nie pokazuje się po zmianie liczb tego stworzenia; ocena ziarno po ziarnie i zapamiętana ocena każdej trójki postać, program, mapa zostają jak dziś.
- D-441 — Where does the game keep the last judging of each character, program and map?, zdanie: „The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form […]”. Zmiana (Q7 a, którego koszt nazwał D-441): przeglądarka trzyma w trwałej pamięci także rekord z D-440, osobną wartość obok ocen; jeśli cykl zmieni przy tym postać zapamiętanych ocen, nowa wersja klucza sprawia, że dzisiejsze zapamiętane oceny przestają się pokazywać.
```

### .runs/task-cycles/katalog-map/task.md:31-31
```
4. W wierszu Matecznika w katalogu i na jego karcie stoi liczba: najwięcej zdrowia niedźwiedzia, jakie program zdjął w ocenie na 12 ziarnach, na przykład „niedźwiedź: 24 ze 120”. Jest to rekord tej przeglądarki (pytanie Q7): najwięcej, ile kiedykolwiek zdjęła niedźwiedziowi któraś ocena w tej przeglądarce; nie spada po zmianie programu ani po śmierci postaci, a ocena, która zdjęła więcej, podnosi go. Ustawienie domyślne do weta, nie wybór Mariusza: „zdjął” liczy się w jednym starciu z niedźwiedziem, nie jako suma starć jednego przejścia: starcie wygrane daje 120, ziarno bez napaści 0, a starcie, w którym postać zginęła, liczy się tak samo jak inne; z dwunastu ziaren liczy się największe. Przed pierwszą oceną na Mateczniku liczby nie ma wcale — ani „0”, ani miejsca na nią (jak przy D-440, przy którym znaczek stoi tylko przy zapamiętanej ocenie). Rekord jest związany z liczbami niedźwiedzia, przy których powstał: gdy zmiana tych liczb (zadanie 14) je zmieni, dawny rekord się nie pokazuje. Gra trzyma rekord w trwałej pamięci przeglądarki obok ocen (zmiana D-440 i D-441), a to, co ocena pokazuje ziarno po ziarnie, zostaje bez zmiany (pierwszy akapit D-439, wpisany z zatwierdzonej definicji); jeśli liczby nie da się zrobić bez zmiany tego akapitu, cykl zatrzymuje się i pyta Mariusza, bo to zmiana zatwierdzonej definicji. Ustawienie domyślne miejsca: w wierszu Matecznika wśród faktów wiersza i na karcie w części „Czyha” przy niedźwiedziu, w roli `text`, jak liczba „{n} z 12” przy ocenie (D-440); cykl zapisuje to w sekcji „The screen Mapy” styleguide'u. To, przy której mapie stoi taka liczba, mówią dane mapy, nie kod widoku (niezmiennik `content-identifiers`).
```

### .runs/task-cycles/katalog-map/task.md:91-95
```
- Q7. Z których ocen programu gra bierze liczbę przy Mateczniku — najwięcej zdrowia niedźwiedzia, jakie program zdjął w ocenie na 12 ziarnach?
  - Answer: Rekord (wariant a): najwięcej, ile kiedykolwiek program zdjął niedźwiedziowi w ocenie w tej przeglądarce; nie spada po zmianie programu ani po śmierci postaci; zeruje się, gdy zadanie 14 zmieni liczby niedźwiedzia. Koszt podany w pytaniu: osobna wartość w pamięci przeglądarki (zmiana D-441); rekord może pokazywać wynik programu, którego już nie ma; na innym urządzeniu liczby nie ma, dopóki tam się nie oceni. Słaby punkt podany przy wariancie: rekord nie mówi, co umie obecny program — to widać dopiero przy jego ocenie w „Kto idzie”.
  - Not chosen:
    - b) najwięcej spośród ocen, które gra pamięta teraz, przy wszystkich postaciach i programach — liczba spada albo znika, gdy zmienisz program, bo jego ocena przepada, więc przy pracy nad programem skacze w dół, aż ocenisz go znowu (i podlega zasadom wyposażenia z zadania 8).
  - Source: human, 2026-11-25, „pozostałe chyba mogą być zgodnie z rekomendacjami” na czwartą partię pytań, w której pytanie 2 było tym pytaniem z polecanym wariantem a (`.runs/project-refinement/katalog-map.md`, tura 17)
```

## Working copies (the first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
