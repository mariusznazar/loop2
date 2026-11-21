# Handoff — the executor of slice 6, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `3218a620`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 6 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-6/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-06-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours (known: the D-243 quotations named below, until their slices). Slices 3 and 4 shipped such errors; do not repeat it.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:11840-11866` D-440 (the plan's *Foundation entries* row 2, as the foundation step wrote it)
- `foundations/decisions.md:8661-8719` D-241 (the plan's *Foundation entries* row 6, as the foundation step wrote it)
- `foundations/decisions.md:3889-3933` D-206 (plan: 3889-3933)
- `foundations/decisions.md:659-703` D-213 (plan: 659-703)
- `foundations/decisions.md:4232-4248` D-386 (plan: 4232-4248)
- `foundations/decisions.md:3934-4013` D-207 (plan: 3934-4013)
- `foundations/decisions.md:2707-2729` D-104 (plan: 2707-2729)
- `foundations/invariants.md:1048-1057` save-version
- `guidelines/coding.md`
- `guidelines/coding-saved-game.md`
- `guidelines/testing.md`
- `src/browser/sim/types.ts`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 36-37 (To do)

6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.
7. Rekord pętli: stan pętli zarobkowej liczy od jej startu ciąg kolejnych domkniętych przejść bez śmierci i najdłuższy taki ciąg. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, tak samo jak śmierć postaci bez wprawy, po której pętla też trwa (D-190), a zatrzymanie pętli kończy liczenie; liczba znika razem z pętlą. Wiersz postaci w raporcie „Gdy cię nie było” dostaje na końcu najdłuższy ciąg zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek (pytanie 7). Liczbę wiersz czyta z pętli przy każdym rysowaniu sekcji, jak wprawę do odebrania (D-246); przy zerze jej nie ma, a wiersz pętli zatrzymanej śmiercią jej nie niesie.

### lines 158-159 (Context)

- Każda zmiana kształtu zapisu podnosi wersję zapisu (`src/browser/sim/saved-game.ts`, `SAVED_GAME_VERSION`, dziś 7; `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”), a gra odrzuca wtedy dzisiejsze zapisy (D-206); definicja przyjmuje to dla całego projektu: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”. Pamięć oceny (pytanie 2) i rekord pętli (pytanie 7) zmieniają kształt zapisu.
- Zapis gry mieści się w 64 KiB (`src/server/account-routes.ts`, `savedGameLimit`).

### lines 226-226 (Settlements to record)

| 4 | Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników i to, co ocena wzięła; przy liście „Program:” stoi „szczelny: 12 z 12” w `positive`, gdy ostatnia ocena rozwiązała wszystkie dwanaście ziaren, a inaczej „{n} z 12” w `text`; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; zmiana reguł, grup albo planu wyprawy programu kasuje ocenę, a śmierć, która zabiera postaci wprawę i wykupione stopnie, kasuje wszystkie oceny tej postaci, na każdej mapie. | decision | Pytanie 2; Pytanie 15; Pytanie 8 (wybory Mariusza) | co trafia do zapisu, od ilu ziaren jest odznaka, czy zmiana skrzynki gasi odznakę albo kasuje wynik, czy odznaka zostaje przy postaci, która straciła wprawę, i jak brzmią napisy przy programie |

### lines 230-230 (Settlements to record)

| 8 | Stan pętli zarobkowej trzyma bieżący ciąg domkniętych przejść bez śmierci i najdłuższy taki ciąg od jej startu; śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa. | sentence of D-241 | Pytanie 7 (wybór Mariusza) | czy rekord liczyć z liczby domkniętych przejść, którą stan już ma, i co robi z nim pokryta śmierć |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 6 — the saved document of the new version, and the room the judgings take

- **Goal:** `SAVED_GAME_VERSION` rises by one, once, for both changes of the shape (Slices 4 and
  5), together with the document of `tests/sim/saved-game.test.mjs`
  (`guidelines/coding-saved-game.md`, "Wersja podnoszona razem z kształtem"): the document of the
  current version is rewritten in the new shape and fills each new branch — remembered judgings of
  more than one character, program and map, with a take list and each kind of result, and an
  earning loop whose two counts stand above 0 with the run below the longest — and loads into the
  game state it describes; the document of the version before is kept and refused as another
  version, as the documents before it are; the cases of the trust boundary that file holds
  (`guidelines/testing.md`, "Trust boundaries", the row of `src/browser/sim/saved-game.ts`) reach
  the new places through the document, and a crafted remembered judging and crafted counts are
  refused whole as `shape`. Then the room: with a script in the directory for working copies the
  handoff names (removed before return), measure the length of the saved document of a game state
  with remembered judgings for every triple of 5 characters, 20 programs and 3 maps, and of 5, 20
  and 10 maps, against the limit of 64 KiB (65 536, D-104, D-207); write in the report the bytes of
  one remembered judging, the totals and the share of the limit, for the request. The measure changes
  no code; where it shows the limit within reach, the report says so as a finding.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:36-37` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:158-159` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:226-226` Settlements to record ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:230-230` Settlements to record ·
  Foundation entries row 2 · Foundation entries row 6 · `foundations/decisions.md:3889-3933` D-206
  · `foundations/decisions.md:659-703` D-213 · `foundations/decisions.md:4232-4248` D-386 ·
  `foundations/decisions.md:3934-4013` D-207 · `foundations/decisions.md:2707-2729` D-104 ·
  `foundations/invariants.md:1048-1057` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs`
  · `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `npm test -- tests/sim/loop-record.test.mjs` · the measuring script, by its command in the report.
- **Depends on:** Slice 4 · Slice 5

## Notes of the orchestrator for this slice

- Slices 4 and 5 changed the shape (remembered judgings; the earning loop's two counts) and `tests/sim/saved-game.test.mjs` has failed since (20 of 44 at slice 7: its document has no `judgings` key and no loop counts); the version is `SAVED_GAME_VERSION` = 8 in the code today (the task text says 7: task 24 raised it). Raise it by one once (to 9) with the document of that test file as `guidelines/coding-saved-game.md` ("Wersja podnoszona razem z kształtem") says, and rewrite the document so each new branch is filled; keep the document of the version before as one refused as of another version.
- Trust boundary: `src/browser/sim/saved-game.ts` (the version constant). A reviewer will check that the version, the document and the refusal of the old version stand together and that crafted remembered judgings / counts are refused as `shape`.
- The measure of room (64 KiB, `savedGameLimit` in `src/server/account-routes.ts`): write a script in your directory for working copies (`.runs/executor-6/`) that builds a game state with remembered judgings for every triple of 5 characters, 20 programs and 3 maps, and of 5, 20 and 10 maps, saves it with the game's own save function and prints the byte length; the maps available in the game's data are few — say what you did where the data has fewer maps than 10 (e.g. use the same map data under distinct keys only if the load would accept it; otherwise state the bytes per remembered judging and extrapolate, and say that you extrapolated). Report the bytes of one remembered judging, the totals and the share of 65 536; the script is removed with the directory (copy it to `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-06-measure.mjs` first; it holds no secrets and no absolute paths of the machine other than the repository's).
- Quotations: every `// decision:` comment line you write or change quotes word for word from the beginning of a sentence a binding sentence of the decision (the foundation check stops at the first field line of an entry); run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` and your files must show no error (the 5 known D-243 errors of `tests/view/` files remain).

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
