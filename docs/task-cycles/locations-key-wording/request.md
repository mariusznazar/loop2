**State: ready** — nothing waits for your answer; merging only accepts the one item below, and the final check is the test run on this request.

## What you will see

Nothing changes in the game. Three texts that tell agents and readers how the repository points to the author's private notes now call the name in the author's file of places a "key", the word the pinned process (the-way) uses for it, instead of an "entry". The three texts are the Backlog section of the agent instructions, the decision that says how the repository points to places outside it, and the rule that limits how tracked files may name such places. Everywhere the word "entry" meant a text of the foundation, it stays. No sentence changes its meaning.

### Underneath

Before this, one word meant two things in the same decision (a name in the file of places, and a text of the foundation), and the agent instructions said "key" where the foundation said "entry" about the same thing.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. The rule that limits how tracked files may name private places now says that a file may point to such a place only by naming a key (`projects`, `tasks` or `task-rules`) under the repository's name in the file of places, where it said "entry". The cycle changed it because your answer to question 2 of the task asked for the decision and this rule to follow the agent instructions, but no row of the task's list of settlements carried it, so it stands here for you to accept. Its meaning, its checking method and the decisions it derives from are unchanged; the other way, leaving it with "entry", would have kept the contradiction with the agent instructions that the task wanted removed.

## Cost

About 9 minutes of working time in one session: one author turn, one review of the whole change and one short return step, in a single review round with no fix. About 9.0 million tokens in all, 6.6 million on Claude Sonnet 5.5 (the orchestrator and the author) and 2.4 million on Claude Opus 5.5 (the review). The table of stages is in the committed record, `stages.md`.

## How to merge

Merge with a merge commit, which keeps the commits, since the link to the record in this description survives only then; the repository's earlier requests were merged that way.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — nic nie czeka na Twoją odpowiedź; scalenie akceptuje tylko jeden punkt poniżej, a końcową kontrolą jest przebieg testów na tej prośbie.

## Co zobaczysz

W grze nic się nie zmienia. Trzy teksty, które mówią agentom i czytelnikom, jak repozytorium wskazuje prywatne notatki autora, nazywają teraz nazwę w pliku miejsc autora „kluczem” (key), słowem, którego używa przypięty proces (the-way), zamiast „wpisu” (entry). Te teksty to sekcja Backlog w instrukcjach dla agentów, decyzja o tym, jak repozytorium wskazuje miejsca poza nim, i reguła ograniczająca, jak pliki śledzone mogą nazywać takie miejsca. Wszędzie, gdzie „entry” znaczyło wpis fundamentu, zostaje. Żadne zdanie nie zmienia sensu.

### Pod spodem

Wcześniej jedno słowo znaczyło dwie rzeczy w tej samej decyzji (nazwę w pliku miejsc i wpis fundamentu), a instrukcje dla agentów mówiły „key” tam, gdzie fundament mówił „entry” o tej samej rzeczy.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

brak

### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

1. Reguła ograniczająca, jak pliki śledzone mogą nazywać prywatne miejsca, mówi teraz, że plik może wskazać takie miejsce tylko przez nazwanie klucza (`projects`, `tasks` albo `task-rules`) pod nazwą repozytorium w pliku miejsc, tam gdzie mówiła „wpis” (entry). Cykl ją zmienił, bo Twoja odpowiedź na pytanie 2 zadania prosiła, żeby decyzja i ta reguła szły za instrukcjami dla agentów, ale żaden wiersz listy ustaleń zadania jej nie obejmował, więc stoi tu do Twojej akceptacji. Jej sens, sposób sprawdzania i decyzje, z których wynika, są bez zmian; druga droga, czyli zostawienie „entry”, utrzymałaby sprzeczność z instrukcjami dla agentów, którą zadanie chciało usunąć.

## Koszt

Około 9 minut czasu pracy w jednej sesji: jedna tura autora, jedna recenzja całej zmiany i krótki krok zwrotny, w jednej rundzie recenzji bez poprawki. Około 9,0 mln tokenów łącznie, 6,6 mln na Claude Sonnet 5.5 (orkiestrator i autor) i 2,4 mln na Claude Opus 5.5 (recenzja). Tabela etapów jest w zatwierdzonym zapisie cyklu, `stages.md`.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu cyklu w tym opisie przetrwa tylko wtedy; wcześniejsze prośby tego repozytorium były scalane w ten sposób.

</details>

## Technical changes

The change is a swap of one word, with its article where needed, in three tracked files; 18 swaps in all, three commits, 7 added and 7 removed lines, no code and no test.

- `aacbbf16` — `AGENTS.md`, section `## Backlog`, lines 3–5: ten `entry` → `key` (the three names `projects`, `tasks`, `task-rules`, "the key names", "the file or the key is missing", "add the key to the file", "A missing key or file"); the rest of the wording is unchanged.
- `68745036` — D-362 in `foundations/decisions.md`: the binding sentence ("by the key that stands for it", "which are the keys `projects`, `tasks` and `task-rules`"), the *Rationale* ("The name of a key … the value of the key") and the *Rejected* ("points by a key", "listing only the keys `projects` and `tasks`", "for a key outside the rules of loop2"). The uses of "entry" for an entry of the foundation stay: *Rationale* "stands in the entry" and *Verification* "a comment, an entry or a guideline" and "an entry or a comment that leaves out…".
- `02526a59` — invariant `tracked-file-private-names` in `foundations/invariants.md`: "by naming the key `projects`, `tasks` or `task-rules` under `loop2`".

The review found no other place in the tracked files that says "entry" for a name in the locations file; other meanings of "entry" (the chronicle of the game, a lock file in a test) are out of scope.

## Checks

- Final gate: the CI run of the `tests` check on the last head of this request; its result is written here once it ends. The cycle ran no gate on its own system, so it has no local time of one.
- Failing on the base: none. The base `ba67f045` is a merge whose tree equals the tree of its merged branch `ae6291b8`, that branch holds no cycle record, and the request it merged (#162) shows its CI run `tests` as passed (`https://github.com/mariusznazar/loop2/actions/runs/44755500041/job/136354036107`); no gate was run on the base.
- `python -B .the-way/elements/common/foundation_check.py`, without `--skip-test-citations`, on the head `02526a59`: exit 0, `0 errors`, no `listed:` line.
- `python -B .the-way/instruction-files/check_instructions.py` on the head: exit 0, `0 error, 149 warn, 7 info`; the reviewer's run of it on a worktree of the base shows every warning of the head on the base too, so the change adds none.
- `python -B .the-way/task-cycle/change_file_sizes.py ba67f045 02526a59`: exit 0, no file changed size.
- Own-work checks: the author's word diff of the range showed 18 swaps and nothing else; the reviewer's word diff and `git grep` for a remaining "entry" meaning a name in the locations file agree.
- The review of the whole change read 2 of the decisions of its selection whole (D-362 and D-13), the index of the rest of its selection, and named none unread that bears on the change.
- Not run: `npm test` on the cycle's own system (CI is the final gate); every check of the one command other than the two above and the CI run.
- Form check, private-paths check on this description, the three checks on the copy of the record, working copies left, directories of earlier tasks kept: filled in when the record's commit exists.

## Foundation entries

- D-362 — loop2 points to a place outside the repository by the key that stands for it under `loop2` in the locations file (`projects`, `tasks`, `task-rules`), and "entry" in D-362 means only an entry of the foundation. Marked `row 1`.
- `tracked-file-private-names` — a tracked file points to a place the author keeps outside the repository only by naming the key `projects`, `tasks` or `task-rules` under `loop2` in the locations file, or by referring to the operator's private note of secrets without that note's name and path, and names no note, folder of notes, path on the author's disk or file of the private repository of the old loop game; the meaning is unchanged. Marked `the cycle's` (the change comes from question 2 of the task and *To do* item 3, which no row of *Settlements to record* carries).

No invariant test changed, no *Violated* mark set or cleared, no surface altered; the foundation check lists no invariant for a corrected sentence.

## Minor findings

none

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the task changes the word for a name in the locations file from "entry" to "key" in the agent instructions, D-362 and one invariant after the pin of the-way moved to `19e5774a`; independent task, no project plan; source: the task document as accepted on 2026-11-20, the foundation of this repository at `ba67f045`.
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, unchanged by this task.
- **Spec:** none — no open design choice: the task's question 2 and settlement row 1 settle which words change and which stay.
- **Route:** one author without a plan (three files, a word swap with a rule for which occurrence changes), on the class of the orchestrator's model because it writes a decision and an invariant through the record skills; whole-change review on Opus as the user delegated; return step by the same author, no commit, so no review of it.
- **Plan:** none.
- **Choices:** 3 other choices (which model class runs the reviewers, no local gate because CI is the final gate, the empty list of checks failing on the base), in the questions table of the record.
- **Blocking findings left:** none.
- **Record:** the link is added once the record's commit exists.
