# Handoff — Slice 7 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 7**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base = head when you start: `e27ba5f`. Process pin
  `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `cheaper` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/19-slice7-report.md`
- The product's instructions: `AGENTS.md` (read `guidelines/coding.md` before changing product
  code and `guidelines/testing.md` before writing tests). Commit on the task branch by path, English
  messages in the form of the existing commits. Run only your slice's focused checks, each reported
  with its command and exit code; do not run the whole gate (`npm test` with no argument).

## Answers of step 4

- Trust boundary: **yes** for the cycle; your slice changes guideline files only. The kind
  `saved-game`'s guideline describes code on a trust boundary (`src/browser/sim/saved-game.ts`),
  so its rules say what the load must refuse and how.
- Irreversible operation: **yes** for the cycle (schema step 4); the rule „Otwarcie schematu bez
  utraty danych” you change describes it.

## Done before you

- Foundation entries (`fb1ef9d`, D-97 fixed in `59cd18a`): plan row 16 is D-04, row 18 D-112,
  row 20 D-190 (the exemplar for kind `saved-game` is `src/browser/sim/saved-game.ts`), row 25
  `save-version`, row 28 `account-database-schema`.
- Slices 1–6 (`b36292e` … `e27ba5f`) made the code your guidelines describe: Slice 1
  `src/browser/sim/saved-game.ts` (the exemplar), Slice 2 `src/server/database.ts` (schema step
  4), Slice 5 `src/browser/view/game-saver.ts`, Slice 6 `src/browser/view/app.ts`,
  `src/browser/view/game-view.ts`. Read the code before describing it.

## Points the orchestrator hands you

- Slice 6's executor (`reports/18-slice6-report.md`, *Searches not found or unclear*):
  "`guidelines/coding-browser-module.md`, example „Gra na stronie i odpowiedzi serwera”, says
  `createGameView` „zwraca element gry i `dispose()`” and that the page builds the game once the
  server confirms the account; both now say less than the code (the view also returns the save line
  and the save methods; the page waits for the saved game state too)." That passage is yours (spec
  *Decisions* 10).
- The Slice 1 review's Minor finding M3 (`reports/08-slice1-review-report.md`), in the reviewer's
  words — it ends "Slice 7's guideline should carry it":

**M3. The version constant's comment names less than what makes a saved game of the same version
fail to load** (`saved-game.ts:53-56`). It says to raise the version with a change of `GameState`
or a type it reaches and of the items of the data. The load also checks, against the data, the
paces, each map's width and height (tile count), the identifiers, and the nature-energy cap
(executor's choice 4); changing one of those refuses saves of the same version as damaged, with
the „Zapis był uszkodzony…” sentence. Spec decision 2 accepts that for identifiers; the comment, the
first thing the next maker reads, should say it, and Slice 7's guideline should carry it.

## Your section of the plan (copied word for word from plan.md)

### Slice 7 — The coding guidelines: the kind saved-game and the passages the change makes untrue

- **Goal:** through `the-way-maintain-coding-guidelines`, with no meaning beyond the task and the
  spec (WAY-172): `guidelines/coding-saved-game.md` is written in the form of a kind's file of the
  coding template, its exemplar `src/browser/sim/saved-game.ts` under Foundation entries row 20,
  claiming that file and drawing its boundary with `simulation-module` as `content-data` does, with
  the rules of spec decision 5 — simulation isolation, unchanged arguments, a refusal instead of a
  throw for every crafted input, and the version raised with the shape, the pinned document of the
  test rewritten only together with a raised version (decision 2); `guidelines/coding.md` gains
  the kind's index row, and its sentence „Wzorzec zapisu gry powstanie przy pierwszej
  implementacji” in § „Odłożone rodzaje i formatowanie” changes to say the kind exists;
  `guidelines/coding-simulation-module.md`'s *When to read* excludes the file as it excludes content
  data; `guidelines/coding-browser-module.md` § „Gra na stronie i odpowiedzi serwera” is rewritten
  to the page of Slice 6 (spec decision 10: the game built only after the session and then the
  saved game state are answered; removed when a save gets 401 and when it gets a conflict, then
  built again from the loaded save; conflict, outdated code and too large with their own sentences
  instead of the one warning); `guidelines/coding-database-access.md`'s rule „Otwarcie schematu
  bez utraty danych” names saved game states beside accounts and sessions. A new meaning the human
  must approve stays the question the foundation step names, never this slice's choice.
- **Change:** `guidelines/coding-saved-game.md` · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-database-access.md`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:30-30` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:101-106` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:114-141` 2. Where the version stands and what forces its bump ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game) ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator) ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:476-482` Foundation entries ·
  Foundation entries row 3 · Foundation entries row 9 · Foundation entries row 10 ·
  Foundation entries row 11 · Foundation entries row 12 · Foundation entries row 13 ·
  Foundation entries row 16 · Foundation entries row 18 · Foundation entries row 20 ·
  Foundation entries row 25 · Foundation entries row 28 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:632-645` D-28 ·
  `foundations/decisions.md:718-731` D-34 · `foundations/decisions.md:733-746` D-35 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:1726-1737` D-96 ·
  `foundations/decisions.md:1739-1752` D-97 · `foundations/decisions.md:1963-1974` D-112 ·
  `foundations/decisions.md:1976-1989` D-114 ·
  `foundations/invariants.md:214-224` simulation-isolation ·
  `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `.the-way/foundations/glossary.md:163-167` exemplar ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md:24-46` Where the skill works ·
  `guidelines/coding-content-data.md` ·
  `src/browser/view/app.ts` · `src/browser/view/game-view.ts` · `src/server/database.ts` ·
  src/browser/sim/saved-game.ts and tests/sim/saved-game.test.mjs (made in Slice 1) ·
  src/browser/view/game-saver.ts (made in Slice 5)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 2 · Slice 5 · Slice 6 · Foundation entries rows 20, 25

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 3 → `foundations/decisions.md:3220-3235` D-180 — What happens to unsaved progress when a session expires?
- plan row 9 → `foundations/decisions.md:3396-3438` D-186 — Which browser's save of the game state does the server accept?
- plan row 10 → `foundations/decisions.md:3440-3465` D-187 — What does the server do with a save of the game state of a lower version than the one it holds?
- plan row 11 → `foundations/decisions.md:3467-3498` D-188 — What does the player see when a save of the game state finds no session?
- plan row 12 → `foundations/decisions.md:1760-1773` D-97 — What does the player's logout do?
- plan row 13 → `foundations/decisions.md:1745-1758` D-96 — What does a player see before and after signing in?
- plan row 16 → `foundations/decisions.md:57-103` D-04 — What is the game built with?
- plan row 18 → `foundations/decisions.md:1984-1995` D-112 — How does the account database open and preserve its schema?
- plan row 20 → `foundations/decisions.md:3538-3562` D-190 — Which file is the exemplar for saved-game code?
- plan row 25 → `foundations/invariants.md:988-996` save-version
- plan row 28 → `foundations/invariants.md:768-776` account-database-schema
- `foundations/decisions.md:57-103` D-04 — What is the game built with?
- `foundations/decisions.md:650-663` D-28 — Which coding-guideline discipline does loop2 adopt?
- `foundations/decisions.md:736-749` D-34 — Which file is the exemplar for content data?
- `foundations/decisions.md:751-764` D-35 — Which file is the exemplar for simulation modules?
- `foundations/decisions.md:766-779` D-36 — Which file is the exemplar for browser modules?
- `foundations/decisions.md:1745-1758` D-96 — What does a player see before and after signing in?
- `foundations/decisions.md:1760-1773` D-97 — What does the player's logout do?
- `foundations/decisions.md:1984-1995` D-112 — How does the account database open and preserve its schema?
- `foundations/decisions.md:1997-2010` D-114 — Which file is the exemplar for database access?
- `foundations/invariants.md:214-224` simulation-isolation
- `foundations/invariants.md:226-234` simulation-inputs
- `foundations/invariants.md:768-776` account-database-schema
- `.the-way/foundations/glossary.md:163-167` exemplar

## Other files your *Read* names (each whole unless a range is given)

- `.the-way/product-guidelines/template.md`
- `.the-way/product-guidelines/coding/template.md`
- `.the-way/product-guidelines/coding/SKILL.md:24-46` Where the skill works
- `guidelines/coding-content-data.md`
- `src/browser/view/app.ts`
- `src/browser/view/game-view.ts`
- `src/server/database.ts`
- src/browser/sim/saved-game.ts and tests/sim/saved-game.test.mjs (made in Slice 1)
- src/browser/view/game-saver.ts (made in Slice 5)

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:30-30` To do

12. Pierwszy plik kodu zapisu gry — plik symulacji, który zamienia zapis pobrany z serwera na stan gry albo odmowę (punkt 11) — zostaje wzorcem nowego rodzaju kodu, z wytycznymi rodzaju i wierszem w indeksie `guidelines/coding.md`, przez skill `the-way-maintain-coding-guidelines` (D-28: “session, saved-game and mail exemplars are selected with their first implementations”; WAY-216). Plik leży w symulacji, więc granicę nowego rodzaju wobec `simulation-module` („Przed dodaniem lub zmianą modułu symulacji w `src/browser/sim/`, poza danymi treści gry”) ustala jego wytyczna, jak przy rodzaju `content-data`; nowe znaczenie wytycznych zatwierdza człowiek (WAY-172). Zdanie „Wzorzec zapisu gry powstanie przy pierwszej implementacji” w `guidelines/coding.md` (§ „Odłożone rodzaje i formatowanie”) zmienia się w tej samej zmianie.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:101-106` Questions to settle

- 10. Czy wczytanie zapisanego stanu gry po zalogowaniu, które zastępuje bieżący stan gry, mieści się w decyzji o tym, z czego gra jest zbudowana, a jeśli nie, jak je zapisać? (Q10; pytanie otwarte planu przypisane temu zadaniu, postawione wobec obecnego brzmienia D-04)
  - Answer: droga A: wczytanie przechodzi przez funkcję symulacji, która dostaje zapis z serwera i oddaje stan gry albo odmowę (inna wersja, archetyp spoza danych, zły kształt); zdanie wiążące D-04 dostaje obok wyborów gracza i upływu czasu „zapis stanu gry, który przeglądarka pobrała z serwera”. Przyjęty koszt: D-04 zmienia się w cyklu; symulacja dostaje funkcję czytającą niezaufane dane bez sięgania poza siebie (niezmiennik `simulation-isolation`).
  - Not chosen:
    - B — D-04 bez zmian, a wczytanie uznajemy za wybór gracza (zalogowanie) — naciągnięte czytanie: następny czytelnik może wziąć wczytanie za złamanie D-04.
    - C — widok zastępuje stan gry wczytanym zapisem sam, a D-04 dostaje wyjątek — stan gry zmienia się w dwóch miejscach; wbrew przykładowi złamania D-04.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q10, w pakiecie jako D10 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:114-141` 2. Where the version stands and what forces its bump

### 2. Where the version stands and what forces its bump

- The simulation file `src/browser/sim/saved-game.ts` holds the constant of the current version of
  the shape, starting at 1. The browser sends it as `version` beside `game`; the server stores it in
  its own column and compares only that integer (D-07, row 4).
- The load function (decision 5) builds the game state field by field as a value of the
  `GameState` type, so a field added to or removed from `GameState` or a type it reaches fails the
  type check until the load function changes; it refuses every missing or extra key.
- A test of the new kind holds, written out in the test, one saved document of the current version
  that fills every optional branch (a map run with a campfire, a burning item, a combat record, a
  copy whose program was deleted, a discovery held, counts beside a program; its map run written
  paused, so the load's pause changes nothing in it) and asserts that it loads into the state it
  describes and that the constant equals the version written beside it. A
  shape change makes the strict load refuse that document, so the test turns red; the kind's
  guideline rule says the document is rewritten only together with a raised version, and review
  checks the pair. The documents of earlier versions stay in the test, each refused as another
  version.
- Content data whose identifiers a type enumerates in full belong to the shape: today only
  `Backpack` (`Record<ItemId, number>`) does, so a new item of the data raises the version. An
  identifier that a type holds as a member of a list (map, resource, creature, action and condition
  kinds) is checked against the data at load.

Rejected: review alone — a missed bump is found only when a player's save fails to load or, worse,
loads into a state the rules do not describe; a digest of the source text of `types.ts` pinned in a
test — every comment edit trips it, and data-derived key types escape it; a declarative schema whose
digest is pinned per version — mechanical end to end, but a schema interpreter with typed unions is
a larger piece of code than the rest of the change. Cost if wrong: a bump is still a human act at
review; the red test makes the shape change visible, not the bump automatic.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game)

### 5. The simulation's load function and its counterpart (new kind `saved-game`)

Unit `src/browser/sim/saved-game.ts`, the first file and exemplar of kind `saved-game`:

- The version constant (decision 2).
- A function from a game state to the saved document `{ version, game }`, pure, sharing nothing it
  could later change with the state passed.
- A function from an unknown value (the `save` object the client hands over, or the document kept
  in page memory) to either a game state or a refusal with one of three reasons, `version`,
  `archetype`, `shape`. It never throws and changes nothing passed to it. In order: not an object
  with an integer `version` → `shape`; a version other than the current one → `version`; a team
  whose characters list is readable and names an archetype absent from the data → `archetype`;
  anything else that the state's types, closed lists and data do not admit → `shape`.
- What "admit" covers: every key present and no other (own keys only, `__proto__` included);
  numbers finite and safe integers where the type is an identity, a count or a minute; enumerated
  values on their closed lists (pace on the data's paces, condition and action kinds, death causes);
  identifiers of maps, resources, items, creatures and the campfire present in the data; programs
  through the existing program check; the references the simulation follows existing — the map
  run's character in the team, the copy's program on the list or null with its deleted name,
  identities below their next counters and unique, picks and programs used last naming listed
  programs; the map run's tiles of the number its map's layout gives. The maker may refuse more,
  never less.
- A map run that goes on (no death, no completion) comes back paused, at the game minute, pace and
  carried real time of the document; an ended one comes back as it ended, so the view shows its
  screen after the end with „Restart” and „Zakończ” and its copy open to editing (D-62, D-132,
  D-173 unchanged). Nothing advances it: no real time and no time away enters the load (answer 8,
  answer 15 B).
- The boundary with `simulation-module`: the new kind's guideline claims `src/browser/sim/saved-game.ts`
  (the file that turns a downloaded document into a game state or a refusal, and back); the
  `simulation-module` guideline's *When to read* excludes it as it excludes content data, and the
  index row in `guidelines/coding.md` names the new kind. The sentence „Wzorzec zapisu gry powstanie
  przy pierwszej implementacji” changes in the same change. The guideline's rules: simulation
  isolation, unchanged arguments, a refusal instead of a throw for every crafted input, and the
  version bump with the shape (decision 2). The new meaning goes to the human through
  `the-way-maintain-coding-guidelines` (WAY-172).

Rejected: load in the view, which replaces the state itself — the violation example of D-04; a
lenient load that fills missing keys — a migration by another name, against "discarded in full";
the load putting a running map run on pause in the view — the pause is a rule of the game state.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator)

### 10. Guideline passages the change makes untrue (settled by the orchestrator)

Finding 4 of the spec's re-review (`reports/04-spec-rereview-report.md`) remained after the one
revision and is settled here by the orchestrator (step 7 of `implement-task`), on the smallest
reading that fulfils the task: guidelines the change makes false are corrected in the same change
(WAY-172, WAY-199), each through the skill the spec already uses for its discipline, with no new
meaning beyond what this spec's decisions and the task's settlements carry. The change also does,
beyond the guideline changes named above:

- `guidelines/coding-browser-module.md`, § „Gra na stronie i odpowiedzi serwera”, rewritten to the
  page of decisions 7 and 8: the game is built only after the session and then the saved game state
  are answered; the game is removed when a save gets 401 and when a save gets a conflict (then built
  again from the loaded save); conflict, outdated code and too-large have their own sentences
  instead of the one warning — through `the-way-maintain-coding-guidelines`.
- `guidelines/testing.md`, § Trust boundaries, permissions table: the D-109 row, the D-137 row and
  the row of an account identifier supplied in a request extended to `GET /api/saved-game` and
  `PUT /api/saved-game`, together with the D-104 rows already named (the save route's body limit of
  64 KiB); the transport row's count of paths changed from six to seven — through
  `the-way-maintain-testing-guidelines`.
- Direct refusal tests of both save routes — no session, a forged or removed session, and a session
  of a blocked account each get JSON 401 and leave the stored saved game state unchanged — marked
  with `invariant: account-session-authorization` and `invariant: blocked-account-access`, on real
  HTTP and SQLite like the existing cases of `tests/http.test.mjs`.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:476-482` Foundation entries

Part map: `account-server`'s responsibility gains the persistence of saved game states;
`simulation`'s *Trust boundary* gains `src/browser/sim/saved-game.ts`, the file that reads data from
outside the simulation. With it the testing guideline's *Trust boundaries* table gains the
simulation row (`save-version`: crafted documents refused whole) and its `src/server/` and D-104
rows the save routes (`player-save-isolation`, the sixth guarded route), through
`the-way-maintain-testing-guidelines`; the rule „Otwarcie schematu bez utraty danych” of
`guidelines/coding-database-access.md` gains saved game states beside accounts and sessions.

## On the human's approval (WAY-172)

Where `the-way-maintain-coding-guidelines` reserves the approval of a new meaning of the
guidelines to the human, do not ask the human and do not decide it yourself: write what the task,
the spec and the foundation already carry, commit it, and name in your report each meaning that
needs the human's approval, with the passage it stands in, its options and your recommendation.
Return `blocked` only if your method forbids committing the text before that approval; the
orchestrator then takes the question to the request, which opens as a blocked draft in any case
(the human actions H1 and H2 wait there).
