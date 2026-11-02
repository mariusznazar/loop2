# Report of the one author — task `lokalny-start`

**Status:** done with concerns

The concerns: Concern 1 and Concern 2 at the end of this report. Neither stops the cycle's review.

## Commits

On branch `task/lokalny-start`, base `54b2b7831cfb08c8e2d3eda8bfaf87b9a4205470`:

| Commit | Message |
|---|---|
| b2b7f5b | feat: :sparkles: start the game on this computer over HTTPS with a database of each start |
| 91d0c14 | docs: :memo: tell an agent how to play the running game in a real browser in the skill loop2-play |
| 14fae58 | docs: :memo: make the README true about running the game and remove its section on the screens |

## Files changed

| File | Added | Removed |
|---|---|---|
| `scripts/local-start.mjs` (new) | 299 | 0 |
| `tests/invariants/test_local_start_access.py` (new) | 363 | 0 |
| `tests/agent_workflow/test_loop2_play_skill.py` (new) | 80 | 0 |
| `.claude/skills/loop2-play/SKILL.md` (new) | 113 | 0 |
| `.claude/skills/loop2-play/frames.js` (new) | 13 | 0 |
| `.claude/skills/loop2-play/save-frames.mjs` (new) | 26 | 0 |
| `.agents/skills/loop2-play/` (three byte-identical copies) | 152 | 0 |
| `.playwright/cli.config.json` (new) | 7 | 0 |
| `package.json` | 2 | 0 |
| `.gitignore` | 1 | 0 |
| `AGENTS.md` | 2 | 0 |
| `README.md` | 23 | 18 |
| `foundations/decisions.md` | 122 | 2 |
| `foundations/environment_facts.md` | 18 | 0 |
| `foundations/invariants.md` | 10 | 0 |
| `foundations/part_map.md` | 5 | 2 |
| `guidelines/testing.md` | 5 | 2 |

Totals of `git log --numstat 54b2b78..HEAD`: 1241 added, 24 removed.

No file of `src/server/**` changed. `npm start`, `tests/invariants/test_loop2_one_serving_process.py` and the seven docstrings of To do 3 stayed as they were: README still gives `npm start` and `npm run build` and still places `src/browser` and `src/server`, so each docstring stays true without an edit.

## What the command is

`npm run local` is `npm run build && node scripts/local-start.mjs`. `npm run local:stop` is `node scripts/local-start.mjs --stop`.

One Node.js process holds an HTTPS proxy on `127.0.0.1` at a port the system picks, and, imported into the same process, the built `dist/server/main.js` on a second free port in `loopback-proxy` mode. It prints `Local game: https://127.0.0.1:<port> (...)` when the server answers. Key and certificate come from `openssl` on its standard output and stand in memory only. Each start works in `.runs/local-start/<pid>-<12 hex>/`, which holds `accounts.sqlite` and its side files, `session-keys` and `mail-password`, the last two made fresh at the start.

## Checks run

Every run below is `C:\Storage\repos\loop2-wt\lokalny-start`, on Node 24.17.0, OpenSSL 3.5.7, Playwright CLI 0.1.22, Chrome 156.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_local_start_access.py` (first run, before the seen-failing edit) | 0 | 11 tests |
| Same command, `scripts/local-start.mjs` broken for a moment: the listener on `0.0.0.0` and `upstreamHeaders` passing every header | 1 | **The invariant's failing run.** `test_both_ports_listen_on_this_computer_alone`: `True is not false : 127.0.0.2:51446`. `test_no_proxy_header_of_a_browser_reaches_the_server`: `'forwarded' unexpectedly found in [...]`. 2 failures of 11, both at their assertion. The script was restored from a byte copy and the restoration checked (`grep -c 0.0.0.0` gives 0). |
| `npm test -- tests/invariants/test_local_start_access.py` (after the restoration and the test's fix for Ruff) | 0 | 11 tests, 77 s. **The invariant's passing run, with the same command.** |
| `npm test -- tests/quality/test_quality_invariants.py` (first) | 1 | ESLint, Prettier, ShellCheck and the audit passed; Ruff failed on SIM115 in my test (`tempfile.TemporaryFile` with no context manager). Fixed in the file, no rule relaxed. |
| `npm test -- tests/quality/test_quality_invariants.py` (again) | 0 | 5 tests: ESLint, Ruff, ShellCheck, Prettier, audit |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 5 tests |
| `npm test -- tests/invariants/test_application_package_layout.py` | 0 | 1 test |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 test |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors, also on the final commit |
| `git -C .the-way rev-parse HEAD` compared with `git ls-files --stage -- .the-way` | 0 | both f45ca40724251a46965aed69f733d0a35c430048 |

`tests/agent_workflow/test_loop2_play_skill.py` was written with its code and not seen failing: it cites no invariant, and the task asks for a failing run only of the invariant's test. A test of that kind is the shape `tests/agent_workflow/test_loop2_deploy_skill.py` set, plus two behaviour cases of `save-frames.mjs`.

**Not run:**

- The full `npm test`: the orchestrator's (WAY-160), as the handoff gives.
- The other tests of the seven docstrings: no code or file they read changed apart from the README's prose.
- Mutation tool: `build-tools` has none; mutations weighed by hand are under *Mutations in the head*.
- Whether Claude Code asks a person about a `.mcp.json`, and `PLAYWRIGHT_MCP_IGNORE_HTTPS_ERRORS`: neither was needed, so neither was tried.

## Own-work check

### The path of the first acceptance criterion

In a real browser (Chrome 156 headless through Playwright CLI 0.1.22), by the words of the skill `loop2-play`, typed in Git Bash, on the committed code but for the Ruff fix in a test:

```text
Local game: https://127.0.0.1:53680 (Ctrl+C or npm run local:stop ends it)
open rc=0
after register: button "Wyloguj"; paragraph: Nie udało się wysłać wiadomości. Spróbuj ponownie później.
minute: "Minuta 1 · Czeka — żadna reguła nie pasuje · Passa 1/480"
minute: "Minuta 4 · Czeka — żadna reguła nie pasuje · Passa 4/480"
minute: "Minuta 6 · Czeka — żadna reguła nie pasuje · Passa 6/480"
after reload: paragraph: Minuta 9 · Czeka — żadna reguła nie pasuje · Passa 9/480 (pauza); button "Wznów"
still: "Minuta 9 · Czeka — żadna reguła nie pasuje · Passa 9/480 (pauza)"     (2 s later)
(click „Wznów”, then the stream)
.playwright-cli\frames\000.jpeg +0 ms
.playwright-cli\frames\001.jpeg +734 ms
.playwright-cli\frames\002.jpeg +1734 ms
.playwright-cli\frames\003.jpeg +2740 ms
frames rc=0 0
running: "Minuta 15 · Czeka — żadna reguła nie pasuje · Passa 15/480"
```

I opened `003.jpeg`: a readable 800×450 image of the game, „Minuta 14” in the status line, „Pauza” where „Wznów” stood, the terrain panel and the program panel. Each frame is about 21 KB.

The account was `own-check@example.test`, a made-up address. Nothing of the check is committed. Afterwards `npm run local:stop` printed `Local starts stopped: 1` and exited 0, `netstat` showed neither port listening, `playwright-cli list` printed `(no browsers)`, and I removed `.playwright-cli/` and `.runs/local-start/`.

### The requirement most likely unmet

**Requirement:** a fresh agent gets there with the repository alone. **Why this one:** my run was typed in Git Bash, and an agent here starts in Windows PowerShell 5.1, where `playwright-cli` is a `.ps1` file and a pipe between two programs goes through PowerShell's text handling.

**Check:** in Windows PowerShell, `playwright-cli --version`, `playwright-cli open <address>`, `playwright-cli eval "document.title"`, the skill's frames command with its pipe, `git status --short -- .playwright-cli`, `playwright-cli close`, `npm run local:stop`.

**Showed:** 0.1.22; the browser opened; `"Loop"`; `.playwright-cli\frames\000.jpeg +0 ms`, pipeline exit 0; no line from `git status`; closed; `Local starts stopped: 1`, exit 0. The one frame fits: the account was new and no map run was going.

### Controls on the questions carried

| Question | What ran | What it showed |
|---|---|---|
| Does `.playwright/cli.config.json` work on 0.1.22? | `playwright-cli open` from the repository's root, then the same from a directory with no such file | Root: the page opened. Elsewhere: `Error: net::ERR_CERT_AUTHORITY_INVALID`. So the file is what takes the certificate. |
| Does `run-code` give a stream of frames? | `page.screencast.start({ onFrame })` through `run-code` | Yes: 3 frames in 2 s at 1×, 4 in 3 s through the skill's files. The code runs in a sandbox with neither `require` nor `import` nor `process`, so frames leave as JSON through `--raw` and `save-frames.mjs` writes the files. |
| How does Playwright MCP take the certificate? | `browser_navigate` first, then `Security.setIgnoreCertificateErrors` through `browser_run_code_unsafe` and `newCDPSession`, then `browser_navigate` | First: `net::ERR_CERT_AUTHORITY_INVALID`. After the setting: the page opened, a plain `browser_navigate` worked, and a registration through the form signed in. No human action and no change of the definition's entry. |
| How fast does mail fail? | `SmtpMailer.send` measured on five addresses | `127.0.0.1:1` 7 ms, `0.0.0.0:1` 1 ms, `127.0.0.1:9` 0 ms, `localhost:1` 28 ms, `mail.invalid:25` 45 ms, each `failed`. |

## Choices, each with the way rejected and its cost if wrong

The questions under *Questions carried to cycle*, in their order.

| Question | Chosen | Rejected | Cost if wrong |
|---|---|---|---|
| Name of the command; does `npm run dev` stay | `npm run local`, with `npm run local:stop`. `npm run dev` stays, and README says it runs the server with no account settings. | Removing `npm run dev`: a change the task does not need. | A command that opens a game nobody can enter stays in the package; one line to remove later. |
| Address and port; two starts side by side | `https://127.0.0.1:<port>`, the port picked by the system at each start and read from the printed line, as `npm run kitchen-sink` does. The server's port comes from a free-port probe. Two starts never meet, and D-49 holds with nothing else. | A fixed default port with a setting for a test: a second way, and two starts collide. | A person retypes an address at each start. A window remains between the probe and the server listening, in which another process may take the port: the start then ends with exit 1 and is run again. |
| Does a start remove the database of a running start | No. The process number stands in the directory's name, and only directories of ended processes go. | One fixed directory with a second start refused: an orphan start would block the next agent. | See Concern 2. |
| Where the secret files come from | The start writes `session-keys` and `mail-password` into its own directory, random at each start, mode 0600. | Keeping them between starts: nothing needs them after the database is gone. | None seen. |
| Which headers the rule covers | `Forwarded`, `X-Real-IP`, `CF-Connecting-IP` and every name beginning `X-Forwarded`, in any spelling or number of copies; `X-Forwarded-Proto: https` set by the proxy. Those are the names D-110 names, and the prefix holds `X-Forwarded-Host`. | The archive's closed list of six: it passes `X-Forwarded-Port` and any later name of that family. | A header outside those names reaches the server, which in `loopback-proxy` mode reads none of them. |
| When the database goes; how an agent ends the command | It stays until the next start, for every way a start ends: one path, no cleanup at closing. An agent runs `npm run local:stop`: it writes a file `stop` in each running start's directory and waits; the start checks for it five times a second and exits. | `process.kill` by number: after a hard kill the number may belong to a foreign process, and `--stop` would kill that. A control route on the proxy: new surface on the trust boundary. | A check at a fixed interval runs while a start lives; negligible. |
| Server as a child process or in the same process | Same process, by import. A start killed from outside leaves no server holding the port and the database, which matters most on Windows, where SIGTERM on a child runs no handler. | A child process, as the archive has it: an orphan server after a hard kill. | The process's environment holds the server's settings; the server's own stop handlers never run, so the database closes by process exit. It is thrown away anyway. |
| Mail address | `127.0.0.1`, port 1: 7 ms to `failed` here. | A name under `.invalid`: 45 ms and a dependence on the name service. `0.0.0.0`: fastest here, and it means different things on Windows and Linux. | On a system where a closed loopback port answers slowly a registration waits longer, bounded by the sender's 10 s. |
| How the certificate is made; its files; does it stay | `openssl` from `PATH`, then beside Git for Windows, as the archive looks for it, writing key and certificate to standard output. Neither ever stands in a file, so no file name meets the guard, and nothing stays between starts. | A certificate assembled in Node.js: about 50 lines of hand-written DER to keep. Files named without an extension: a key on the disk for no gain. | A person clicks through the warning at each start. A computer with no `openssl` and no Git cannot start; the error says so. |
| Does the archive's `.playwright/cli.config.json` work | Yes, unchanged; control above. | — | — |
| Does `run-code` give frames | Yes, with the two helper files of the skill. | Writing frames from `run-code`: the sandbox has no file system. | Two small files in each skill copy, kept identical by a test. |
| Playwright MCP's certificate | `Security.setIgnoreCertificateErrors` through `browser_run_code_unsafe`, in the skill, once per tab. It meets the task's condition, so the question does not go to the human. | `.mcp.json` with a flag: nobody knows whether it asks a person for consent. `PLAYWRIGHT_MCP_IGNORE_HTTPS_ERRORS`: its way to the plugin's server is unknown. | The setting lasts for a tab, so a new tab needs it again; the skill says so. |
| Where the agent gets Playwright CLI | The global installation; `package-lock.json` unchanged, no audit, nothing added to the image's `npm ci`. Where it is missing, the skill tells the agent to stop and tell the human. On this computer it is there, so *Human actions* stays `none`. | `devDependencies`: an alpha of Playwright in the lockfile and in the image's install, for a tool only agents use. | The version is not pinned, so a later release may change what the skill says. |
| Where the repository tells the agent the way | The project skill `loop2-play` in `.claude/skills/` and `.agents/skills/`, a one-line pointer in `AGENTS.md`, and one paragraph of README. | An instruction file alone: its cost falls on every session. Skill alone: an agent whose session started in another directory would not see it. | One always-loaded line. |
| *Based on*, *Relations*, *Verification* of the two entries | D-252: *Based on* three new facts, *Relations* `none`, a pair of examples. D-253: `derives from D-12 · derives from D-110`, `invariants: local-start-access` and a pair of examples. | D-252 `narrows D-75` or `D-88`: its sentence goes against neither, it adds to them. | A reviewer who reads „are not automated” in D-88 as covering an agent's look would want `narrows`. |

Further choices of mine:

- **Part map:** `agent-workflow` gained `build-tools` in *Depends on*, because its skill drives `npm run local`, as it names `deployment` for the skill `loop2-deploy`. The `build-tools` sentence gained the local start. `scripts/local-start.mjs` is in that part's *Trust boundary*.
- **Test shape:** the invariant's cases replace `dist/server/main.js` in a temporary copy by a stand-in that reports raw headers, because the real server ignores most of those headers and its answer would show nothing. The script needs no exported seam. The real server is run by the other eight cases; one of them sends `X-Forwarded-Proto: http` and gets 200.
- **Listening check:** a connection to `127.0.0.2` is refused where a wildcard listener would answer, and that address exists wherever the test runs; the computer's network addresses are tried too, when its name resolves.
- **`guidelines/testing.md`:** the lists gained D-253 and D-256 (D-110 was already there) and `local-start-access`; the table gained the row of `scripts/local-start.mjs`.

## Foundation entries

Each row of *Settlements to record*, the projected entries and To do 5 to 8. For the request, one sentence of each in the task's language:

| Entry | Znaczenie |
|---|---|
| D-252 (cały wpis rzutowany) | Agent obsługuje działającą grę w prawdziwej przeglądarce przez Playwright CLI, a gdzie CLI zawiedzie, przez Playwright MCP, czyta ruch ze strumienia klatek i niczego w ręcznym sprawdzeniu nie zastępuje. |
| D-253 (część rzutowana) | Agent dochodzi do wczesnych stanów, grając na lokalnym serwerze z bazą założoną na to sprawdzenie, jedno polecenie uruchamia grę przez HTTPS, a sprawdzenie nie dotyka serwera testowego ani zapisu gracza. |
| D-254 (wiersz 1) | Polecenie nie trzyma dla człowieka konta między startami, bo człowiek gra na serwerze testowym. |
| D-255 (wiersz 2) | Przy lokalnym starcie poczta wskazuje adres, pod którym nic nie odpowiada, a całą drogę z pocztą przechodzi człowiek na serwerze testowym. |
| D-256 (wiersz 3) | Polecenie robi własny certyfikat, a człowiek klika w przeglądarce przejście dalej. |
| `local-start-access` (wiersz 4) | Polecenie słucha tylko na tym komputerze i nie przepuszcza nagłówków pośrednika przysłanych przez przeglądarkę. |
| D-234 (*Rejected*) | Lokalny obraz produkcyjny dalej nie przyjmie logowania, a lokalny start loguje przez HTTPS, ale uruchamia build, nie obraz, który ma sprawdzić próba. |
| D-110 (*Verification*) | Decyzja wymienia nowy niezmiennik, który z niej wynika. |
| `playwright-cli-token-use`, `playwright-cli-config-path`, `playwright-screencast-frames` | Trzy fakty środowiska pod *Based on* decyzji D-252. |

In D-253 the *Rationale* holds only what this task's part makes true. The sentences on building a state with the simulation go with task 5, as the task gives. The *Rejected* stands whole, since each way stays refused. D-253's *Lacks* says what the part does not reach; task 5 rewrites it.

Facts were checked against the addresses at fixed commits (`curl`, HTTP 200, the passage found with `grep`), read 2026-11-02.

The whole-foundation search (WAY-33) for the terms of these entries found no collision. D-45 and `preview-server-access` hold the kitchen-sink page and do not touch this command. D-163 keeps tests away from Outsider and this command reaches no mail service. D-05 and `loop2-one-serving-process` speak of the container. No new glossary term: „local start” reads as a reader of the field takes it.

## Reaches beyond the dispatch

- `src/browser/view/clock.ts`: to tell why a minute read 2 in the MCP browser. It ticks by `setInterval`, so game time does not lean on animation frames.
- `src/server/account-mail.ts`, `src/server/app.ts`: named by the task's lines; read whole enough to choose the mail address and to see that the server finds `dist/public` from its own file.
- `tests/invariants/loop2_invariant_support.py`, `tests/quality/test_quality_invariants.py`, `eslint.config.mjs`, `scripts/restore-trial.mjs`, `scripts/kitchen-sink.mjs`, `tests/startup.test.mjs`: comparison files and the helpers my test uses.
- `.the-way/product-guidelines/testing/template.md`: only the lines on *Trust boundaries*, by `grep`. The change to `guidelines/testing.md` is a row and two lists the task words.
- `.the-way/task-cycle/change/ui_check.md`: opened to confirm it does not apply; no screen changed.
- Playwright CLI's own typings and skill files under the global install, for the screencast's options.

## Searches not found or unclear

- `git show archive/10x-m3l4` needed nothing beyond the handoff's note.
- The handoff names `guidelines/styleguide-browser-view.md` for `tests/invariants/test_browser_view_framework.py`. No file of that part changed, so I did not read it.
- `/tmp/x` exists as a directory on this computer, not mine; I wrote nothing into it, and it answered one mistaken redirect with an error.
- Whether a session of Playwright CLI closes after an hour: taken from the definition's *Rationale* into the skill, not measured.
- `tests/invariants/test_application_package_layout.py` was the one test I could find that reads `package.json` for a reason near this change. A wider test may read it too; the full gate decides.

## Mutations in the head

| Mutation | Caught by |
|---|---|
| Listener on `0.0.0.0` | `test_both_ports_listen_on_this_computer_alone` (seen) |
| A header passed, or the prefix narrowed to a closed list without `x-forwarded-port` | `test_no_proxy_header_of_a_browser_reaches_the_server` (seen for all) |
| `X-Forwarded-Proto: https` not set | `test_the_proxy_says_https_also_when_no_browser_header_came` and the real sign-up |
| `LOOP2_LISTEN_HOST` not set to 127.0.0.1 | stand-in binds to an undefined host, which Node treats as every address: the listening case |
| No removal of ended starts | `test_a_start_removes_the_database_of_a_start_that_ended` |
| Removal of running starts | `test_the_game_stands_at_a_port_of_its_own_at_each_of_two_starts_side_by_side` |
| Removal follows the environment, or takes any directory | `test_no_environment_value_and_no_argument_leads_the_removal_elsewhere` |
| Stop does nothing | `test_stop_ends_every_running_start_and_their_ports` |
| `process.exitCode` ignored while waiting | **Slower, not caught as a defect:** the start fails after 30 s with the same exit code and no address |
| The SAN missing from the certificate | `test_the_certificate_holds_for_the_address_the_game_stands_at` |
| `npm run local` without the build | The real cases run it in a copy with no `dist`, so they fail |

## Problems as observed

**Concern 1 — no frames through Playwright MCP.** `page.screencast` with `onFrame` through `browser_run_code_unsafe` gave 0 frames in each of three tries (800 ms, 3 s, and 3 s after `page.bringToFront()`), on a headed Chrome 156, with `document.visibilityState` `visible`, 248 animation frames in 1.5 s, and the game going on: the line later read „Minuta 15”. The same call through Playwright CLI on headless Chrome gave frames. In two of the tries the line read „Minuta 2” right after 3 s where about 5 was due; I did not explain that. **Cause not verified.** A guess: a headed window that does not paint, at night on an unattended computer. D-252 stands true through the CLI, and the skill sends an agent on MCP to `browser_take_screenshot`. So where the CLI fails, an agent gets screenshots, not a stream. Whether that needs a line in D-252 is the orchestrator's to weigh; I recommend none, since a fallback that loses one ability is what a fallback is, and I recorded the entry whole as the task commands.

**Concern 2 — a number reused after a hard kill.** A start's directory is taken as running while its process number is alive. If a start was killed from outside and the system later gave that number to another process, that directory stays until the other process ends, and `npm run local:stop` waits 10 s, reports the number and exits 1. It never touches the foreign process. The new start still gets its own database. To do 2 says each start removes the database of the previous one; this is the one exception I can see. No run showed it; it follows from the code. Rejected fix: writing the process's start time beside the number, which adds a read per platform.

**Observed, no action.** After `Rejestracja` the console of the page holds a 401 on `/api/account` and a 404 on `/favicon.ico`: task 8's, out of scope. `Account mail failed: ESOCKET` stands in the start's output at each registration; the skill says it is expected.

**Reckoning of a value.** The task's Context gives `playwright-cli` as 0.1.22 here with a report on 0.1.23; this run used 0.1.22 and the skill is written against it.

**Left in the main checkout:** my MCP tries made four files in the ignored `C:\Storage\repos\loop2\.playwright-mcp\`. I removed those four by name; `git status` there printed nothing.

## For the orchestrator

- The fresh agent of the first acceptance criterion must work in `C:\Storage\repos\loop2-wt\lokalny-start`. The skill's commands assume that directory as their root, and a skill list loaded from another directory will not show `loop2-play`; `AGENTS.md` points at it either way.
- The invariant test to name in the request: `tests/invariants/test_local_start_access.py`, new. No existing invariant test was changed.
