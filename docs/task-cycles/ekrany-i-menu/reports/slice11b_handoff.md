# Handoff — slice 11b of the task `ekrany-i-menu`

You make **slice 11b** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `d034bbf`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice11b.md`.

## Your stage

- You make: **a slice, or the retry of a slice** (the row of the `make-change` table). Read
  `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for how to
  read the plan and the task; read `ui_check.md` of the same directory where your slice changes what
  a screen shows (the screenshot of the running product has a settled route in `.claude/skills/loop2-play/SKILL.md`;
  where the component is not reachable on the page yet, state the check in code and mark the
  screenshot unchecked with that reason — the orchestrator's walk through the real browser covers
  the finished screens). Use no personal or global skill; project skills carry the `the-way-` prefix.
- Boundary: make only this slice; change only the files its *Change* names (a path pattern covers
  every file it matches). Commit on the task branch in English, in the style of the repository's
  recent commits (`git log --oneline`), `git add <paths>` explicitly (never `git add -A`, `git add .`
  or `git commit -a`), messages with several lines through `git commit -F <file>` placed outside the
  repository. Do not push. Leave no uncommitted tracked change.
- Run the focused checks your slice's *Checks* names, each as command and exit code. Do **not** run
  `npm test` without a file argument (the full gate) and do not run `foundation_check.py` unless the
  slice's *Checks* names it; the gate is the orchestrator's.
- If the plan and the code disagree structurally, or you meet an open design choice the task and the
  foundation leave open, return without code (`returned`) as the method gives.

## The answers of step 4

- Trust boundary: no (the part map names none of these files). The address fragment is player input:
  where your slice reads or writes it, test crafted fragments as your section says.
- Irreversible operation: no. Open design choice: none, no spec. Route: planned slices.

## Foundation entries the foundation step has written

The plan names its foundation rows by row number (`E…`); the foundation step wrote them under these
identifiers. Read each entry named in your *Read*, whole (an entry runs from its heading to the
next heading), and cite identifiers as they stand in `foundations/`. The line ranges in your section
below were recomputed at the head `f694d86` of the foundation step.

(this slice names no foundation row)

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:30-39`

```
  30	1. Na każdym ekranie zalogowanego gracza stoi u góry jeden pasek menu, a treść pod nim ma jedną szerokość: najwyżej 1344 px, a w węższym oknie całą szerokość okna (pytanie 11).
  31	   - Po lewej stronie paska stoi nazwa gry; na ekranach oczekiwania (D-262) nazwa stoi sama, bez pozycji (pytanie 11).
  32	   - Pozycje paska to Siedziba, Programy i menu „Konto”, bez ikon; Mapy i Wiedzę dopisują zadania 13 i 22 (pytanie 7).
  33	   - Pasek znaczy pozycję miejsca, w którym jest gracz, tekstem w `text-strong` i linią w `selected` u dołu (D-277); na ekranie Postać znaczy Siedzibę (pytanie 7), a na ekranie przejścia nie znaczy żadnej pozycji (D-277, odczyt pod *Decisions in play*).
  34	2. Ekrany mają adresy po `#`: `#/` to Siedziba, `#/postac/{n}` to Postać, `#/programy` i `#/programy/{n}` to Programy, `#/postac/{n}/przejscie` to ekran przejścia; {n} to numer postaci (D-56) albo programu (D-165).
  35	   - Odświeżenie pod adresem ekranu zostaje na tym ekranie; pod adresem bez fragmentu i po zalogowaniu formularzem gra prowadzi do Siedziby albo, gdy zapis gry trzyma ręczne przejście, do tego przejścia (pytanie 1).
  36	   - Przyciski wstecz i naprzód przeglądarki prowadzą po tych adresach.
  37	   - Adres, który nie prowadzi do istniejącego ekranu, po cichu otwiera najbliższy: `#/postac/{n}/przejscie` bez przejścia ekran Postać tej postaci, `#/programy/{n}` bez takiego programu `#/programy`, a każdy inny Siedzibę (pytanie 8).
  38	   - Fragmenty `#confirm-email=` i `#reset-password=` działają jak dotąd (D-156, D-225); gdy po nich gra buduje się dla zalogowanego gracza, otwiera Siedzibę (D-96).
  39	   - „Anuluj” formularza „Ustaw nowe hasło” otwiera zalogowanemu graczowi Siedzibę, a niezalogowany widzi formularze konta, jak dziś (pytanie 16).
```

## Your section of the plan (word for word; file `docs/task-cycles/ekrany-i-menu/plan.md`)

### Slice 11b — Documents that describe the old page

> Added in the plan review (the foundation step's concern 3 and the plan reviewer's search of `README.md` and the skills).

- **Goal:** the texts that describe the page before this change say what D-96, D-97 and D-280 now give. `README.md:76` (the browser check after `npm run local`: „strona pokazuje panel „Program”, siedzibę i stopkę z wzmiankami; po założeniu postaci i „Wyślij” — wiersz stanu z minutą …”) and the lines 329–334 of `.claude/skills/loop2-deploy/references/setup_and_secrets.md` with its identical copy `.agents/skills/loop2-deploy/references/setup_and_secrets.md` („the headquarters appears at once and the header shows the logout”, „Reload: the headquarters appears straight away; when the saved game holds a manual map run …”) are rewritten from those decisions only: after an account is created Siedziba appears and „Wyloguj” stands in the menu „Konto”; a reload with no fragment opens Siedziba, or the manual map run's screen where the saved game state holds one; a send leads to the screen of the map run. The two copies of the skill file stay identical, and every other line of the three files stays as it is. One more rewrite, found by the executor of Slice 11a and outside its files: the comment at `tests/sim/death.test.mjs:263` („Nothing it carried comes back: at the headquarters the chest stands as the death left it.”) uses „headquarters” for the state after „Zakończ” with no map run; rewrite that comment only, so that it is true under the glossary entry `headquarters` (the screen Siedziba), changing no code, assertion or title. A fact the decisions do not give goes to the report as a question, never into the text.
- **Change:** `README.md` · `.claude/skills/loop2-deploy/references/setup_and_secrets.md` · `.agents/skills/loop2-deploy/references/setup_and_secrets.md` · `tests/sim/death.test.mjs`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:30-39` To do
  `guidelines/coding.md` · `guidelines/testing.md`
  `foundations/part_map.md:84-133` build-tools · agent-workflow
  Foundation entries: D-96, D-97, D-280, D-157, D-53 (as written by the foundation step; find them by identifier)
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; `npm test -- tests/sim/death.test.mjs`; `npm test -- tests/quality/test_quality_invariants.py`; `python -B .the-way/elements/common/foundation_check.py` reports nothing the change caused; the two copies byte-identical (`cmp`)
- **Depends on:** Slice 11a

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slices 1–11a are made (head `d034bbf`). The page now has one menu bar in its header (the game's name,
  „Siedziba”, „Programy”, „Wróć do przejścia · …” while a manual map run waits, and the menu „Konto” with
  the address and „Wyloguj”), and the screens Siedziba, Postać, Programy and the screen of a map run
  stand under addresses after `#`. Take facts for the documents **only** from the decisions named in
  your section (D-96, D-97, D-280, D-157, D-53 as the foundation step wrote them) and from the
  task passage; if a sentence needs a fact they do not give, report it as a question instead of
  writing it.
- `README.md:76` is the sentence of the browser check after `npm run local`; the two files
  `setup_and_secrets.md` are twin copies (`.claude` and `.agents`) that must stay byte-identical; the
  test `tests/agent_workflow/test_loop2_deploy_skill.py` reads the skill.

## Orchestrator's rulings that bind this slice

- Change only the lines your section names. Keep each file's language (the README is Polish, the
  skill file is English), its line endings and its formatting.
- Name every choice beyond the plan in your report under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice11b.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
