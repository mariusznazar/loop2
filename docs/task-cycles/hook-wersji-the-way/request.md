**State: ready** — four items in *Fix or let through* ask for your answer, none of them blocks the merge; three more are only accepted by merging.

## What you will see

When a Claude Code session starts at the top folder of the repository, it now checks which version of the process (the-way) the repository has checked out against the version it pins. Where they agree, nothing is shown. Where they differ, or the process folder is not set up at all, the person sees a short message on the screen with both versions and the command that repairs it, and the agent gets the same text in its context, so it can tell you before it works. Where the check itself cannot run (a damaged git index, git refusing to read the repository, a fault in the script), the message says that the check could not run and why, and is never silent, because silence is how it shows that all is well. Nothing is blocked in any case: the session starts and goes on exactly as before.

Two limits are stated in the repository's rules, not hidden. A session started in a subfolder of the repository did not run the hook in the one real test made (Windows, Claude Code 2.1.325): Claude Code did not read the repository's settings there. Sessions of Codex get no warning at all, as the task decided; they stay with the agent's own memory of the rule.

### Underneath

A small Node script, started by a start-of-session hook in the repository's Claude Code settings, reads two things from git (the commit the repository records for the process folder and the commit that folder stands on) and prints one message in the form Claude Code gives to the screen and to the agent. It runs only read-only git commands without a shell.

## For you to decide

### Needed from you

none

### Fix or let through

1. The full run of the tests on the final code ended red: one of 617 tests failed, a test that builds the game's image to see that its icons are served, which this change does not touch. Docker refused to start the build because its own settings file was in use by another process; the run counted one other run of the project's tests at the same time. Run alone, the same test passes (3.6 seconds, exit code 0). The two checks that the full run executes after the tests (the check of the foundation and the check of the instruction files) did not run in it, because the run stops at the failed stage; each was run on its own on the final code and reports no error. Left as it is, the next full run that overlaps another can fail the same way, whoever runs it. Running the whole gate again in this request costs about 15 to 20 minutes with no other run going and would not change the first result, which stays the result of the gate; making a task of the random failure fixes it for everyone and leaves this request as it is; letting it through accepts the red run, with the same command passing on the Linux machine of CI (its result is in *Checks*). I recommend letting it through and making a task of it if one does not already cover it, since the failure is in Docker's settings file, not in anything this change touched. Run the gate again in this request, make a task of it, or let it through? (Checks, 1; Findings outside the task's scope, 1)
2. Two small leftovers of the reviews are open. First, the new script is checked by no code-quality rule: the repository's rules for JavaScript name other parts of the project, so a mistake in this script, which runs on every reader's machine at every session start, would get no warning from the linter; the same already holds for the older scripts of the game-playing skill. Second, one sentence of the new decision says "both commits" where, for a folder that is not set up, there is only one commit to show. The cost of leaving the first is a possible unnoticed mistake in a later edit of the script; fixing it means changing the rules for JavaScript, which only a human may decide. The second only makes a reader expect more than the warning shows. I recommend making a task of the first and letting the second through. Fix them in this request, make a task of them, or let them through? (Minor findings, 2 and 3; Findings outside the task's scope, 2)
3. The review of the whole change read 10 of the 49 selected decisions whole and read one that concerns the change, how failures are written to logs, only in part; the author read that one whole afterwards, but no reviewer did. If it holds a rule the hook breaks, nobody who judged the change would have seen it. Having a fresh reviewer read it costs one more review; letting it through costs nothing today. I recommend letting it through, since the hook writes no log line and the author found that this decision supports its behaviour. Have it read in this request, make a task of it, or let it through? (Course of the cycle, Choices)
4. One older gap stands in the foundation and this change does not touch it: the rule that no part of the project imports from another rests on a fact the foundation does not name (marked open since 2026-11-08). Closing it in this request costs a human naming the fact; leaving it costs nothing for the hook. I recommend making a task of it, because it is not connected to this change. Write the fact in this request, make a task of it, or let it through? (Foundation entries)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. The cycle chose, where the task left it open: the script is in Node (every machine that runs the project's tests already has it, and the command is the same on Windows, Linux and macOS, unlike Bash, PowerShell or Python); the hook runs also after `/clear` and when the conversation is compacted, so you see the warning again then; where the check cannot run it warns instead of staying silent; and the script drops the git variables of the calling environment, because with one of them set the first version read another repository's commit. Windows was tried with a real Claude Code session; Linux is covered by CI; macOS was never run.
6. Entries of the project's foundation you did not see at the task: the part of the new decision on what the hook does where its check cannot run (it warns with the reason and the repair command, and ends with exit code 0, and the new wording says where it stays silent), and two facts about Claude Code, how a start-of-session hook shows a message to the person and to the agent, and how Claude Code starts a hook command with no shell. The two facts quote the documentation word for word and were checked against the live page and an archived copy.
7. A new test file checks the sentences of the new decision (the hook prints nothing where the commits agree, warns where they differ or the folder is not set up, says the check could not run where git fails, and always ends with exit code 0). No existing test of an invariant was changed, and the foundation check lists no corrected sentence.

## Cost

About 45 minutes of working time of the agents (from the table of stages), plus about 18 minutes for the one full run of the tests; 47.5 million tokens in all, of which 35.8 million on Sonnet (orchestrator and author) and 11.7 million on Opus (the four reviews, which the strongest class available here asked for); mostly cached input. Two rounds of review with a fix: the whole change failed once (one blocking finding, that a failed check was shown as silence, and seven Minor ones, all fixed) and passed after its fix; the return step failed once (two blocking findings in the wording of the decision and in a test) and passed after its fix. The table of stages stands in the committed record. Two directories of earlier tasks still stand because the script could not tell they were no longer needed; nothing in this request waits for them, and you may remove them by hand (their names stand in *Checks*).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then. The foundation has not waited for a review for long (the count is far below the limit), so no reminder.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — cztery punkty w sekcji *Popraw albo przepuść* czekają na Twoją odpowiedź, żaden nie blokuje scalenia; trzy kolejne przyjmujesz samym scaleniem.

## Co zobaczysz

Gdy sesja Claude Code startuje w głównym katalogu repozytorium, sprawdza teraz, na której wersji procesu (the-way) stoi kopia w repozytorium i którą wersję repozytorium przypina. Gdy się zgadzają, nic nie widać. Gdy się różnią albo katalog procesu w ogóle nie jest przygotowany, człowiek widzi krótki komunikat na ekranie z obiema wersjami i poleceniem naprawy, a agent dostaje ten sam tekst do kontekstu, więc może Ci o tym powiedzieć, zanim zacznie pracę. Gdy samo sprawdzenie nie może się wykonać (uszkodzony indeks gita, git odmawia odczytu repozytorium, błąd w skrypcie), komunikat mówi, że sprawdzenie się nie wykonało i dlaczego, i nigdy nie milczy, bo milczenie oznacza, że wszystko jest w porządku. Niczego nie blokuje: sesja startuje i działa tak jak dotąd.

Dwa ograniczenia są zapisane w regułach repozytorium, nie ukryte. Sesja uruchomiona w podkatalogu repozytorium nie uruchomiła hooka w jedynej prawdziwej próbie (Windows, Claude Code 2.1.325): Claude Code nie czytał tam ustawień repozytorium. Sesje Codexa w ogóle nie dostają ostrzeżenia, tak jak postanowiło zadanie; zostają przy pamięci agenta o regule.

### Pod spodem

Mały skrypt w Node, uruchamiany przez hook startu sesji w ustawieniach Claude Code repozytorium, czyta z gita dwie rzeczy (commit, który repozytorium zapisuje dla katalogu procesu, i commit, na którym ten katalog stoi) i wypisuje jeden komunikat w formie, jaką Claude Code pokazuje na ekranie i agentowi. Uruchamia tylko polecenia gita tylko do odczytu, bez powłoki.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Popraw albo przepuść

1. Pełny przebieg testów na końcowym kodzie skończył się czerwono: padł jeden z 617 testów, test budujący obraz gry, żeby sprawdzić, że ikony są serwowane, którego ta zmiana nie dotyka. Docker odmówił startu budowania, bo jego własny plik ustawień był zajęty przez inny proces; w przebiegu naliczono jeden inny przebieg testów projektu w tym samym czasie. Uruchomiony osobno ten sam test przechodzi (3,6 sekundy, kod wyjścia 0). Dwie kontrole, które pełny przebieg wykonuje po testach (kontrola fundamentu i kontrola plików instrukcji), nie zadziałały w nim, bo przebieg zatrzymuje się na nieudanym etapie; każdą uruchomiono osobno na końcowym kodzie i żadna nie zgłasza błędu. Zostawione tak jak jest, kolejny pełny przebieg, który nakłada się na inny, może paść tak samo, niezależnie od tego, kto go uruchomi. Ponowny pełny przebieg w tym PR kosztuje około 15–20 minut bez żadnego innego przebiegu i nie zmieni pierwszego wyniku, który zostaje wynikiem bramki; zadanie na losową porażkę naprawia ją dla wszystkich i zostawia ten PR bez zmian; przepuszczenie akceptuje czerwony przebieg, przy tej samej komendzie przechodzącej na maszynie Linux w CI (jej wynik jest w *Checks*). Rekomenduję przepuścić i założyć zadanie, jeśli żadne jeszcze tego nie obejmuje, bo porażka jest w pliku ustawień Dockera, nie w niczym, czego ta zmiana dotyka. Ponowić bramkę w tym PR, założyć zadanie czy przepuścić? (Checks, 1; Findings outside the task's scope, 1)
2. Dwie drobne pozostałości po przeglądach są otwarte. Po pierwsze, nowy skrypt nie jest sprawdzany żadną regułą jakości kodu: reguły repozytorium dla JavaScriptu wymieniają inne części projektu, więc błąd w tym skrypcie, który działa na komputerze każdego czytelnika przy każdym starcie sesji, nie dostałby ostrzeżenia od lintera; to samo dotyczy już starszych skryptów umiejętności do grania. Po drugie, jedno zdanie nowej decyzji mówi „oba commity", gdzie dla niezainicjowanego katalogu jest do pokazania tylko jeden. Koszt zostawienia pierwszej to możliwy niezauważony błąd przy późniejszej edycji skryptu; naprawa oznacza zmianę reguł dla JavaScriptu, które może rozstrzygnąć tylko człowiek. Druga tylko każe czytelnikowi oczekiwać więcej, niż ostrzeżenie pokazuje. Rekomenduję założyć zadanie na pierwszą i przepuścić drugą. Naprawić w tym PR, założyć zadanie czy przepuścić? (Minor findings, 2 i 3; Findings outside the task's scope, 2)
3. Przegląd całej zmiany przeczytał w całości 10 z 49 wybranych decyzji, a jedną dotyczącą zmiany, o zapisie błędów do logów, przeczytał tylko w części; autor przeczytał ją potem w całości, ale żaden recenzent nie. Gdyby zawierała regułę, którą hook łamie, nikt, kto oceniał zmianę, by tego nie zobaczył. Przeczytanie jej przez nowego recenzenta kosztuje jeszcze jeden przegląd; przepuszczenie nic dziś nie kosztuje. Rekomenduję przepuścić, bo hook nie zapisuje żadnej linii logu, a autor ustalił, że ta decyzja wspiera jego zachowanie. Przeczytać w tym PR, założyć zadanie czy przepuścić? (Course of the cycle, Choices)
4. W fundamencie stoi starsza luka, której ta zmiana nie dotyka: reguła, że żadna część projektu nie importuje z innej, opiera się na fakcie, którego fundament nie nazywa (otwarta od 2026-11-08). Zamknięcie jej w tym PR kosztuje nazwanie faktu przez człowieka; zostawienie nic nie kosztuje hooka. Rekomenduję założyć zadanie, bo nie wiąże się z tą zmianą. Zapisać fakt w tym PR, założyć zadanie czy przepuścić? (Foundation entries)

### Przyjmujesz scaleniem

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

5. Cykl wybrał tam, gdzie zadanie zostawiło wolną rękę: skrypt jest w Node (każdy komputer, na którym działają testy projektu, już go ma, a polecenie jest takie samo w Windows, Linuksie i macOS, inaczej niż w Bashu, PowerShellu czy Pythonie); hook działa też po `/clear` i przy kompaktowaniu rozmowy, więc wtedy ostrzeżenie zobaczysz ponownie; gdy sprawdzenie nie może się wykonać, ostrzega zamiast milczeć; a skrypt usuwa zmienne gita środowiska wywołującego, bo przy ustawionej jednej z nich pierwsza wersja czytała commit innego repozytorium. Windows sprawdzono prawdziwą sesją Claude Code; Linux pokrywa CI; macOS nigdy nie uruchomiono.
6. Wpisy fundamentu projektu, których nie widziałeś przy zadaniu: część nowej decyzji o tym, co robi hook, gdy jego sprawdzenie nie może się wykonać (ostrzega z powodem i poleceniem naprawy i kończy się kodem 0, a nowe sformułowanie mówi, gdzie milczy), oraz dwa fakty o Claude Code: jak hook startu sesji pokazuje komunikat człowiekowi i agentowi oraz jak Claude Code uruchamia polecenie hooka bez powłoki. Oba fakty cytują dokumentację słowo w słowo i sprawdzono je na żywej stronie i w kopii archiwalnej.
7. Nowy plik testów sprawdza zdania nowej decyzji (hook nic nie wypisuje, gdy commity się zgadzają, ostrzega, gdy się różnią albo katalog nie jest przygotowany, mówi, że sprawdzenie się nie wykonało, gdy git zawodzi, i zawsze kończy się kodem 0). Żaden istniejący test niezmiennika nie został zmieniony, a kontrola fundamentu nie wymienia żadnego poprawionego zdania.

## Koszt

Około 45 minut czasu pracy agentów (z tabeli etapów) plus około 18 minut jednego pełnego przebiegu testów; łącznie 47,5 mln tokenów, z czego 35,8 mln na Sonnecie (orkiestrator i autor) i 11,7 mln na Opusie (cztery przeglądy, na najmocniejszej dostępnej tu klasie, o którą prosiłeś); w większości wejście z pamięci podręcznej. Dwie rundy przeglądu z poprawką: przegląd całej zmiany raz nie przeszedł (jedna uwaga blokująca, że nieudane sprawdzenie było pokazywane jako milczenie, i siedem drobnych, wszystkie poprawione) i przeszedł po poprawce; krok powrotny raz nie przeszedł (dwie uwagi blokujące w sformułowaniu decyzji i w teście) i przeszedł po poprawce. Tabela etapów stoi w zatwierdzonym zapisie cyklu. Dwa katalogi wcześniejszych zadań nadal stoją, bo skrypt nie potrafił stwierdzić, że nie są już potrzebne; nic w tym PR na nie nie czeka, a możesz je usunąć ręcznie (ich nazwy stoją w *Checks*).

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo tylko wtedy zostaje link do zapisu cyklu. Od ostatniego przeglądu fundamentu minęło niewiele scaleń (liczba jest daleko poniżej progu), więc bez przypomnienia.

</details>

## Technical changes

- **Hook and settings (commit `6c528d80`, reworked in `9e28dc99`).** A `SessionStart` hook with no matcher in the new `.claude/settings.json` runs `node` on `.claude/hooks/the-way-pin-check.mjs` in exec form (`args`, with `${CLAUDE_PROJECT_DIR}`), so no shell is involved on any of the three systems. The script finds the repository root from its own place, reads the pin with `git -C <root> ls-files --stage -- .the-way` and the checkout with `git -C <root>/.the-way rev-parse HEAD`, counting a checkout only where `.the-way/.git` exists (in an uninitialized submodule `rev-parse` answers with the parent's commit). Output on a mismatch is one JSON object with `systemMessage` and `hookSpecificOutput.additionalContext`. After the fix: a failing `git` inside a repository and an exception of the script give a "could not run" warning with git's first line (at most 200 characters); the git variables of the caller (`GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE`, `GIT_COMMON_DIR`) are removed from the child's environment; exit code 0 on every path.
- **Test (`tests/agent_workflow/test_the_way_pin_hook.py`, 10 cases).** Runs the script with `node` in temporary repositories (agreement, mismatch, uninitialized, a checkout git cannot read, no repository, no gitlink, a damaged index, an injected fault, a `GIT_DIR` of the caller, a hook run from a subdirectory), with the folder cleaned by `addClassCleanup`. The three new cases of the fix fail on the old script; the strengthened case for an unreadable checkout fails when the agent's message or the repair command is dropped.
- **`AGENTS.md`:** one sentence, outside the the-way block (`AGENTS.md:19`), saying that Claude Code sessions started in the repository root get the warning and that the rule to stop on a mismatch stays in force.
- **Foundation (`6c528d80`, `9e28dc99`, `e684b22a`, `83b12300`):** D-414 and two environment facts; the part map was left as it was (`.claude/**` and `tests/agent_workflow/**` already belong to `agent-workflow`).
- **Fixes of the reviews:** the fix for the whole-change review (`9e28dc99`) covers the blocking finding and the seven Minor ones; the return step (`e684b22a`) corrected one sentence of D-414; its review's two blocking findings are fixed by `83b12300`.

## Checks

1. **The gate.** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/hook-wersji-the-way/gate_times.md -- npm.cmd test` on `83b12300`, started on the day's advisor's signal `start`: **exit code 1**, 1093 s; 617 tests in 4 directories, 3 passed (`tests/agent_workflow` 24, `tests/quality` 79, `tests/invariants` 261), `tests/deploy` failed with one failure, `test_built_image_serves_every_icon_and_the_page` (`tests/deploy/test_loop2_image_icons.py:103`): `docker build` exit 1, "failed to read metadata: open … \.docker\contexts\meta\….json: The process cannot access the file because it is being used by another process"; the script counted 1 other gate run at the same time. Rerun alone for diagnosis: `python -B scripts/test.py tests/deploy/test_loop2_image_icons.py`, exit 0, `Ran 1 test … OK` (serves only to diagnose; the red first run stays the result). Failed in 1 cycle run and passed in 1. Not run in that gate (it stops at the failed stage): the foundation check and the check of the instruction files; run on their own on the same tree: `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`; `python -B .the-way/instruction-files/check_instructions.py` exit 0, `0 error, 140 warn, 7 info` (140 is the count on the base). Failing on the base: none (the list was taken from the final gate of the earlier cycle `ci-przy-pr`, commit `ddf2004f`, file `docs/task-cycles/ci-przy-pr/cycle.md`, run 3, exit 0).
2. **Own-work checks.** The author ran the real Claude Code (`claude -p … --include-hook-events`) on a fixture repository: from its root the hook ran with exit 0 and the JSON was read; from a subfolder no hook event appeared; with a damaged `.git/index` the new warning appeared with exit 0. Mutation checks of the first round and the fix (the tests failed on each broken branch).
3. **CI** on the request's last head: (filled in after the push).
4. **The checks on the record's copy and on this description:** (filled in after the commit of the record).
5. **Remarks check** on the original: run 1 exit 1 (13 items from 7 reports), run 2 exit 0 after the 13 items were written word for word into the process remarks.
6. **Not run:** Linux and macOS locally; the dependency audit of `tests/quality` needs the network (not part of this review's checks, run in the gate).
7. **Working copies left:** none. **Directories of earlier tasks kept:** `przewodnik-testow` (task/przewodnik-testow; holds fail-node and fail-python, which stay: uncommitted changes) and `coding-guidelines` (task/coding-guidelines; uncommitted changes).

## Foundation entries

- **D-414** (`row 1`): At the start of a Claude Code session started in the repository root, the hook warns the agent and the human with both commits and the repair command where `.the-way` stands on another commit than the pinned one or is not initialized, prints nothing where they agree, blocks nothing, is a Node.js script started by one command on the three systems, and covers no Codex session. Its second paragraph (where the check cannot run it warns with the reason and the repair command and ends with exit code 0; where it prints nothing otherwise) is **the cycle's**.
- `claude-code-session-start-hook-output` (**the cycle's**): A `SessionStart` command hook shows a message to the person through `systemMessage` and adds text to the agent's context through `additionalContext`.
- `claude-code-hook-exec-form` (**the cycle's**): A command hook given `args` starts `command` directly, with no shell, and substitutes `${CLAUDE_PROJECT_DIR}` into each element.
- No invariant test altered, no surface, no *Violated* mark; no topical section of the decision log opened; one old descriptive `TODO` stands in the invariant `cross-part-imports` (*Rests on*, since 2026-11-08; item 4 above). The test file `tests/agent_workflow/test_the_way_pin_hook.py` holds D-414's sentences by `decision:` lines (two at lines 201 and 212 and the others of its cases).

## Minor findings

- **Round 1 (the whole change), left by the fix:** none; all seven Minor findings (M-1 to M-7) were fixed in `9e28dc99`.
- **Review of the fix of the whole change, N-1** — fixed by the return step (`e684b22a`).
- **Review of the return step, M-1** (`foundations/decisions.md`, the *Rationale* of D-414, "silence stays only where there is nothing to compare, git missing or no submodule pinned"): "the binding sentence now names three cases, including a root that is no repository. 'No submodule pinned' can be stretched to cover a folder with no repository, so this is no contradiction. But it is the same 'only' list the return step corrected in the binding text, and the step left it narrower here. Not binding text, so Minor." Fix proposed by the reviewer: "git missing, no repository, or no submodule pinned".
- **Review of the fix of the return step, N-1** (`foundations/decisions.md`, D-414): "the folder the hook is installed in" could be read as `.claude/hooks/`; read that way the sentence would mean the hook is never heard from, so a reader will land on the project folder. No fix needed, by the reviewer.
- **Review of the fix of the return step, N-2** (`foundations/decisions.md`, the *Verification* clause of D-414): when `.the-way` is not initialized or git cannot read it there is only one commit to show, so "both commits" says too much; the reviewer's wording: "with the pinned commit, what `.the-way` stands on, and the repair command".

## Findings outside the task's scope

- **O-1 (Minor, out of scope), `.claude/hooks/the-way-pin-check.mjs`:** "The new JavaScript file gets no ESLint rule, and nothing in the gate formats or lints it. `eslint --print-config` gives it `"rules": {}`. D-29 and D-32 name only browser-view, simulation, account-server, build-tools and deployment. `tests/quality/test_source_tool_scope.py` takes the same parts. So the change complies with D-29. But D-28 (Scope includes agent-workflow) says 'The general coding quality checks cover all code, tests included', and every new script of agent-workflow now passes the gate with no check. The gap is older than this change; D-29's *Rejected* names the play skill's scripts." Run with `@eslint/js` `recommended` through a temporary config the reviewer found no report; Prettier passes. A decision on JS of agent-workflow, or an extension of D-29 and D-32 to `.claude/hooks/**`, is a task of its own.
- **The red check of the gate:** `tests/deploy/test_loop2_image_icons.py` `test_built_image_serves_every_icon_and_the_page` (part `deployment`), failed in 1 cycle run and passed in 1 when run alone; rerun result exit 0, 1 test OK. The nearest open task in the project's backlog is the one on tests that fail at random and the gaps found in the foundation review ("loop2: luki w testach, testy padające losowo i znaczniki niezmienników z przeglądu fundamentu", in progress); whether it covers a failure caused by two runs of the tests overlapping on one Docker is not settled by what the cycle read, so a task is proposed if it does not.

## Course of the cycle

- **Task and sources:** the independent task "loop2: hook Claude Code w repo ostrzega na starcie sesji, gdy the way stoi na innym commicie niż przypięty", frozen from the author's note dated 2026-11-14; base `3b48f89f` (`origin/main`, merge of #135).
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the gitlink of the base; the session that started the cycle stood on a copy of `main` 17 commits behind, with the older pin `ec7929d`, and the cycle moved to the base's pin and read the process again from the worktree. The task did not move the pin; no gate run on it.
- **Spec:** none; no open design choice (the one question carried to the cycle, the language of the script, is no reserved choice and was settled as an autonomous choice).
- **Route:** one author without a plan (`the-way-author`, class `same` as the orchestrator, Sonnet), because the change is one hook, one settings file, one test file, one sentence and a few foundation entries; reviews by `the-way-stage` agents on Opus, never on the disabled model.
- **Plan:** none.
- **Choices:** 3 autonomous choices in the questions table (the language of the script, who runs the full gate and when, the class of the reviewers); the decisions the reviewers read are counted in item 3.
- **Blocking findings left:** none.
- **Record:** (the link by the SHA of the commit that adds it follows in the next edit).
