# Foundation step — entries (serwer-testowy)

Branch `task/serwer-testowy`, base `170118680abec6760291df5d13f908c58409f867`. Entries only: no
invariant check, no product code, nothing on any server, Cloudflare or GitHub. No server name, SSH
port, SSH user or IPv6 address in any entry (diff scanned).

## Commits

- `ae7acd6` docs(foundation): add deployment part and external context for the test server — `foundations/part_map.md`
- `66be493` docs(foundation): record test-server deployment decisions and Cloudflare Origin Rules fact — `foundations/decisions.md`, `foundations/environment_facts.md`
- `8812fc6` docs(foundation): add loop2 isolation and address invariants, raise one-serving-process — `foundations/invariants.md`

## Entries and their meaning (pl)

| Entry | Fingerprint | Znaczenie |
|---|---|---|
| D-08/1 "Where does the MVP run?" | e4e8a2f4 | Gra MVP i jej serwer kont działają w osobnym kontenerze loop2 na Mikrusie, pod adresem innym niż `kantarion.bieda.it`, a kontener starej gry loop zostaje nietknięty. |
| D-09/1 "How does a change reach the server?" | 20be369f | Push na gałąź wdrożeniową uruchamia automat, który każe serwerowi samemu pobrać kod z GitHuba i zbudować ten commit; klucz automatu może tylko uruchomić przebudowę commitu z tej gałęzi. |
| D-05/3 "What serves the built game and account requests in the container?" | db83484a | Jeden proces Node.js z Express 5 w kontenerze loop2 podaje pliki gry i obsługuje trasy kont i zapisów pod `/api/`; nieznane `/api/` dostaje błąd API, nie stronę gry. |
| D-10/1 "How do players reach loop2 on the server?" (wiersz 1) | — | Gracze wchodzą na `https://loop2.mariusznazar.com/`, który Cloudflare przekazuje na serwer (rekord AAAA z pośrednikiem, Origin Rule na port kontenera); gracze mają HTTPS, a Cloudflare łączy się z serwerem zwykłym HTTP tylko dopóki tą drogą nie idą konta graczy. |
| D-11/1 "Which branch deploys loop2 to the test server?" (wiersz 2) | — | Gałęzią wdrożeniową jest `main`: każdy push na `main`, także scalenie PR-a, uruchamia wdrożenie na serwer testowy. |
| D-12/1 "What access to the server does an agent have?" (wiersz 3) | — | Agent tylko czyta serwer przez serwer MCP `mikrus`, a każdą zmianę na serwerze robi człowiek. |
| D-13/1 "Where do the server's access values and secrets live?" (wiersz 4) | — | Sekrety i adresy dostępu do serwera (nazwa, port SSH, użytkownik, IPv6) są poza repozytorium — w sekretach GitHuba i notatce właściciela — a pliki i PR-y odwołują się do nich po nazwie; katalog, port kontenera i skrypt wdrożenia mogą być w repozytorium. |
| D-14/1 "What kind of container does loop2 run in?" (wiersz 5) | — | Kontener loop2 jest kontenerem Dockera. |
| `cloudflare-origin-rules/1` (wiersz 6) | 6f0ea4e4 | W darmowym planie Cloudflare reguły źródła (Origin Rules) są dostępne, do 10 reguł, i potrafią zmienić port docelowy żądań. |
| `loop2-container-isolation/1` | — | Wdrożenie loop2 działa w kontenerze oddzielnym od wdrożenia starej gry loop. |
| `loop2-distinct-address/1` | — | Publiczny adres loop2 jest inny niż `kantarion.bieda.it`. |
| `loop2-one-serving-process/2` | — | Jeden proces Express 5 w kontenerze loop2 podaje zbudowaną grę i obsługuje żądania kont i zapisów pod `/api/`. |
| `loop2-api-error-route/1` | — | Bez zmiany zdania; *Derives from* przeniesione na `D-05@db83484a`. |
| part `deployment` | — | Nowa część: buduje aplikację w kontener loop2 i wdraża commit na serwer testowy; granica zaufania tylko `deploy/**`. |
| part `agent-workflow` | — | Dostaje `tests/agent_workflow/**` (test zgodności dwóch kopii skilla). |
| External context | — | Nowe wiersze: GitHub Actions (both · untrusted · no), Cloudflare (both · untrusted · no), the Mikrus host (both · trusted · no). |

`account-server-runtime/1` and `account-server-typecheck/1`: untouched — sentences unchanged, and
their *Method* already runs the whole `tests/invariants` directory, so extending their checks needs
no entry change.

## For the check author (WAY-69; per plan.md § Foundation entries)

All methods: `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`.

- `loop2-container-isolation/1` → `tests/invariants/test_loop2_container_isolation.py`: reads `compose.yaml`, `Dockerfile`, `deploy/loop2-deploy` — own Compose project, service and container; no shared network or volume, no Docker socket mount; no command naming another project or container except the read-only state of `loop`; no `down`; no host-wide prune and no image prune without the loop2 label filter. Runs without Docker.
- `loop2-distinct-address/1` → `tests/invariants/test_loop2_distinct_address.py`: reads the public address declared once in `.github/workflows/deploy.yml`; its host differs from `kantarion.bieda.it`.
- `loop2-one-serving-process/2` → citations in `tests/invariants/test_loop2_one_serving_process.py` move from `/1` to `/2` (lines 178, 195, 202, 219, 229 today); container part in `tests/invariants/test_loop2_one_serving_process_container.py` — static: exec-form `CMD` running `node`, one Compose service; with a Docker daemon: build the image, run with `--init`, count listening processes and their children (health probe and init are not serving processes); without a daemon that part is skipped and unchecked.
- `account-server-typecheck/1` → replace the tripwire `test_no_deployment_route_left_unread` in `tests/invariants/test_account_server_typecheck.py` (shared reader in `tests/invariants/loop2_invariant_support.py` if needed) with a check reading `Dockerfile`, `compose.yaml`, `.github/workflows/deploy.yml`, `deploy/loop2-deploy` that shows the serving image exists only after `npm run typecheck` succeeded; still fails on any other deployment file.
- `account-server-runtime/1` → confirm `tests/invariants/test_account_server_runtime.py` reads the spec's forms (multi-stage `FROM node:24-slim`, no `image:` in Compose, no Node.js setup in the workflow); change only where it does not.

## Format guards (run from the repository root, `--base 1701186…`, `--merge-onto 1701186…` except the part map)

- `decisions/format_guard.py foundations/decisions.md` — exit 1:
  - `foundations/decisions.md:253: error: D-05/3: *Approved by* is the placeholder `merge of <request link>`, which a merge onto the main branch does not take` — same error at :277 (D-10/1), :302 (D-11/1), :323 (D-12/1), :349 (D-13/1), :369 (D-14/1)
  - `foundations/decisions.md:253: warning: *Approved by* is the placeholder `merge of <request link>`` — same warning at :277, :302, :323, :349, :369
  - `note: who approves a version is checked only in the-way's own log`
  - `6 error(s), 6 warning(s), 0 unchecked`
  - Without `--merge-onto`: `0 error(s), 6 warning(s), 0 unchecked`, exit 0. The six errors go once the placeholder becomes the request URL.
- `invariants/format_guard.py foundations/invariants.md` — exit 1:
  - `foundations/invariants.md:0: error: tests/invariants/test_loop2_one_serving_process.py:178: cites `loop2-one-serving-process/1`, whose current version is 2` — same at :195, :202, :219, :229
  - `note: there is no violated_invariants.md; the list of violated invariants is read as empty`
  - `note: there is no human_verdicts.md; no human verdict is given`
  - `5 error(s), 0 warning(s), 0 unchecked`
  - Expected: the check author moves the citations to `/2`.
- `environment-facts/format_guard.py foundations/environment_facts.md` — exit 0:
  - `note: there is no human_verdicts.md; no human verdict is given`
  - `0 error(s), 0 warning(s), 0 unchecked`
- `part-map/format_guard.py foundations/part_map.md` — exit 1 (expected: files not written yet):
  - `foundations/part_map.md:52: error: pattern `tests/agent_workflow/**` of `agent-workflow` matches no file git tracks`
  - `foundations/part_map.md:77: error: pattern `<p>` of `deployment` matches no file git tracks` for each of `Dockerfile`, `.dockerignore`, `compose.yaml`, `.gitattributes`, `.github/workflows/deploy.yml`, `deploy/**`, `tests/deploy/**`, `tests/invariants/test_loop2_container_isolation.py`, `tests/invariants/test_loop2_distinct_address.py`, `tests/invariants/test_loop2_one_serving_process_container.py`
  - `foundations/part_map.md:89: error: trust boundary `deploy/**` of `deployment` matches no file git tracks`
  - `unchecked: the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph`
  - `12 error(s), 0 warning(s), 1 unchecked`

## Choices made and questions for the orchestrator

1. **Fact read date.** The passages were copied word for word from the page on 2026-10-13 (and checked in the existing archived copy of 2026-10-12), so the *Source* says `read 2026-10-13`, not the Context's 2026-10-12. The dispatch asked for the Context's date. Same for the network-ports citation in D-10's *Based on*.
2. **D-05/3 Relations.** The projection said `TODO — narrows` D-02 and the shared-origin decision. The log's D-05/1–2 already use `derives from D-02`, so D-05/3 keeps that and adds `derives from D-08@e4e8a2f4` (the container). It does not link the shared-origin decision because task 15 writes that one.
3. **Level 2 for D-10…D-14.** The template allows level 2 only while no invariant can be derived. A level-1 invariant could be stated for D-10 (the declared address is `loop2.mariusznazar.com`), D-11 (the workflow runs only on a push to `main`) and D-14 (the container is built by Docker Compose from a Dockerfile). These are outside plan.md, so they were not added. Add them in this foundation step?
4. **D-14 Rationale and Rejected.** The human said only "tak". The rationale (the host already runs Docker and loop runs in Docker) is the agent's own wording, taken from the spec's observed state. `none considered` stands for the human's statement and is unconfirmed. Both need the human's word at the merge.
5. **`deployment` failure modes `none`.** The criticality scale is empty, and failure modes come from the human, so this matches the other parts: it counts as the highest criticality.
6. **External context.** GitHub Actions is `untrusted`, because the commit name reaches `deploy/**` over SSH and is validated there. The Mikrus host is `trusted`.
7. **Review dates are the agent's own.** D-10 and D-12: 2027-01-13. D-11: 2027-04-13.
8. **No critique yet.** `way_of_working.md` § "Critique before collective review" asks for one fresh critique of the whole set before the human sees it. This step did not run one.

## Return step

Dispatch: `reports/return-entries-prompt.md`. Every entry here belongs to this cycle and was edited in place.

The gate record now reads `Approved by: Mariusz, 2026-10-13`, fingerprint 9e480247. The projected entries this task writes read the same as before: "Where does the MVP run?", "How does a change reach the server?", "What serves the built game…" and the three loop2 invariants.

### Commits

- `f6ff9b5` docs(foundation): record return-step decisions and facts for the test server — `foundations/decisions.md`, `foundations/environment_facts.md`
- `f6f5635` docs(foundation): add deploy trigger-input and keeps-running invariants — `foundations/invariants.md`
- `38c56c4` docs(foundation): define deployment, test server and public address — `foundations/glossary.md`
- `cd0126e` docs(foundation): record deployment and account-server failure modes and new partners — `foundations/part_map.md`

### New or changed entries (pl)

| Entry | Fingerprint | Znaczenie |
|---|---|---|
| D-08/1 (C8, G1) | e4e8a2f4 (bez zmian) | Zdania bez zmian. *Approved by* to teraz `Mariusz, 2026-10-13`. W weryfikacji i uzasadnieniu „loop deployment” zmienione na „loop instance”, bo termin `deployment` oznacza czynność. |
| D-09/1 (C8, F7) | 20be369f (bez zmian) | Zdania bez zmian. *Approved by* to teraz `Mariusz, 2026-10-13`. Weryfikacja przechodzi na poziom 1 przez `loop2-deploy-trigger-input`, reszta zostaje na poziomie 2. |
| D-05/3 (C8) | db83484a (bez zmian) | Zdania bez zmian. *Approved by* to teraz `Mariusz, 2026-10-13`. |
| D-10/1 (C3, E4) | bez zmian | Zdania bez zmian. Uzasadnienie mówi teraz, że oba publiczne porty usługowe IPv4 hosta zajmują inne obciążenia (stara gra loop i jeszcze jedno), a tryb szyfrowania dla samej tej nazwy ustawia reguła konfiguracji (Configuration Rule). *Based on* dostaje `cloudflare-configuration-rules@939e4e91`. |
| D-11/1 (C2) | zmieniony | Gałęzią wdrożeniową jest `main`. Push na `main`, także scalenie PR-a, trafia na serwer testowy bez ręcznego uruchamiania: wdrożony sam albo w późniejszym commicie `main`, który go zawiera. |
| D-12/1 (C1) | d5196ed7 | Agent tylko czyta serwer przez serwer MCP `mikrus` i niczego na nim nie zmienia. Każdą zmianę na serwerze, poza wdrożeniem uruchomionym przez automat, robi człowiek. |
| D-15/1 (F1) | e3aa8f94 | Wdrożenie, które zatrzyma się przed uruchomieniem nowego kontenera, zostawia działający kontener loop2. Cofnięcie to wdrożenie wcześniejszego commitu: revert scalony do `main` albo uruchomienie zainstalowanego skryptu przez człowieka. Człowiek może wskazać commit z dowolnej gałęzi, a klucz automatu tylko z `main`. Starych obrazów się nie trzyma, więc cofnięcie przywraca kod, nigdy dane. |
| D-16/1 (F2) | nowy | Klucz automatu uruchamia tylko zainstalowaną kopię skryptu wdrożenia, należącą do roota i leżącą poza checkoutem. Każde wdrożenie porównuje ją ze źródłem w danym commicie i przy różnicy tylko ostrzega. Ponowna instalacja to zmiana, którą robi człowiek. Przegląd przed kontami graczy (zadanie 15), bo skradziony klucz może cofnąć loop2 do dowolnego wcześniejszego commitu `main`. |
| D-17/1 (F4) | fe4c7624 | Wdrożenie loop2 zmienia na hoście tylko własny checkout, obraz, kontener, log i blokadę loop2 i nie czyści niczego na całym hoście. Buduje tylko wtedy, gdy dostępna pamięć i wolne miejsce na dysku są powyżej progów zapisanych w repozytorium. Kontener loop2 działa z limitem pamięci. |
| `openssh-authorized-keys-options/1` (E1) | 3aa1860c | W `authorized_keys` opcja `command=` każe sshd uruchamiać swoje polecenie przy każdym użyciu klucza (dla powłoki, polecenia i podsystemu). Polecenie klienta jest ignorowane i trafia do zmiennej `SSH_ORIGINAL_COMMAND`. Opcja `restrict` wyłącza przekierowanie portów, agenta i X11, przydział PTY i uruchamianie `~/.ssh/rc`. |
| `cloudflare-configuration-rules/1` (E4) | 939e4e91 | W darmowym planie Cloudflare są reguły konfiguracji (do 10). Każda działa na żądania pasujące do jej wyrażenia, np. po nazwie hosta, a jej ustawienie SSL wybiera tryb szyfrowania SSL/TLS dla tych żądań. |
| `loop2-container-isolation/1` (G1, F4) | zmienione zdanie, ta sama treść | Instancja loop2 działa w kontenerze oddzielnym od istniejącej instancji loop. *Derives from* dostaje `D-17@fe4c7624`. Wersja zostaje 1, bo wpis jest nowy na tej gałęzi. |
| `loop2-deploy-trigger-input/1` (F7) | nowy | Polecenie wdrożenia, które uruchamia klucz automatu, odrzuca każde wejście poza jedną nazwą commitu z 40 małych znaków szesnastkowych, zanim cokolwiek pobierze, zbuduje albo zmieni kontener. Wdraża tylko commit należący do świeżo pobranego `main`. |
| `loop2-deploy-keeps-running/1` (F8) | nowy | Wdrożenie, które zatrzyma się przed uruchomieniem nowego kontenera (na wejściu, commicie, blokadzie, odczycie pamięci i dysku, pobraniu, checkoucie, sprawdzeniu typów albo budowaniu), zostawia działający kontener loop2. |
| glossary `deployment` (G1) | — | Wdrożenie to czynność: zbudowanie jednego commitu gry na jej serwerze i uruchomienie go jako działającej instancji. Zainstalowaną, działającą grę nazywa słowo „instance”. |
| glossary `test server` (G2) | — | Serwer testowy to serwer na Mikrusie, na którym loop2 działa dla swoich graczy, także z kontami, dopóki gra powstaje. |
| glossary `public address` (G3) | — | Publiczny adres to adres HTTPS (origin), pod którym gracze otwierają grę, a nie adres IP ani port, pod którym osiąga się jej serwer. |
| part map: criticality scale | — | Dwa stopnie. `low`: awaria zatrzymuje wdrożenie albo start, nie rusza tego, co działa, i kosztuje ponowienie albo poprawkę na `main`. `high`: loop2 leży, działa zły kod albo ucierpiało inne obciążenie hosta, dopóki człowiek nie zareaguje. |
| part `deployment` failure modes (P2) | — | Dziewięć trybów awarii, wziętych z tabeli błędów i z P2. Dwa wykrywają nowe niezmienniki, jeden `loop2-container-isolation`, reszta nie jest wykrywana. |
| part `account-server` failure modes (P3) | — | Zły port nasłuchu i zajęty adres: proces kończy się kodem niezerowym bez linii gotowości. Oba `low`; zajęty adres wykrywa `account-server-occupied-address`. |
| part `agent-workflow` (P4) | — | Zależy też od `deployment`. |
| External context (P5) | — | Dwa nowe wiersze: rejestr obrazów kontenerów (them → us · untrusted · no) i repozytorium GitHub, które serwer pobiera kluczem tylko do odczytu (them → us · trusted · yes). |

### For the check author

Both new invariants use the method `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`.

- **`loop2-deploy-trigger-input/1`:** read `deploy/loop2-deploy` on the forced-command path. The seam in `tests/deploy/deploy_script_support.py` can be reused. Without bash the check reports unchecked, never pass.
- **`loop2-deploy-keeps-running/1`:** each stop before the switch (input, commit, lock, memory and disk reading, fetch, checkout, type check, build) calls no `up` and changes no container.
- **Part map:** no part claims these check files yet. Add them to the *Files* of `deployment` when they land.
- **`loop2-container-isolation/1`:** the sentence was reworded with the same meaning and stays at version 1, so the check's citation stays as it is.

### Format guards

Run with `--base 1701186 --merge-onto 1701186`; the part map takes `--base 1701186` only.

- **decisions:** exit 1, `8 error(s), 8 warning(s), 0 unchecked`. Every error and every warning is the `merge of <request link>` placeholder, at D-10/1 :277, D-11/1 :304, D-12/1 :326, D-13/1 :353, D-14/1 :373, D-15/1 :396, D-16/1 :423 and D-17/1 :448. Also `note: who approves a version is checked only in the-way's own log`.
- **invariants:** exit 0, `0 error(s), 0 warning(s), 0 unchecked`. Notes: there is no violated_invariants.md and no human_verdicts.md.
- **environment-facts:** exit 0, `0 error(s), 0 warning(s), 0 unchecked`. Note: there is no human_verdicts.md.
- **glossary:** exit 0, 1 warning:
  - `foundations/glossary.md:13: warning: term `deployment` and identifier `deployment` read alike, and did not on 1701186: where they name the same thing the entry stays, where not, one side is renamed`
- **part-map:** exit 0, 2 warnings, 1 unchecked:
  - `foundations/part_map.md:46: warning: build-tools depends on account-server with no separation recorded, so account-server is computed as `high`, above its own failure modes`
  - `foundations/part_map.md:89: warning: deployment depends on account-server with no separation recorded, so account-server is computed as `high`, above its own failure modes`
  - `unchecked: the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph`

### Choices made and questions for the orchestrator

1. **Glossary clash.** The term `deployment` means the act, and the part `deployment` is a piece of the product: they name different things. The template says one side is then renamed. I recommend renaming the part, for example to `deploy-tools`. That also means updating the *Scope* of D-05/3 and D-08…D-17, the *Part* of the two new invariants and the cycle documents. Not done yet. Should I rename it?
2. **The running game is now called "instance".** The meaning "the game installed and running on a host" moved from "deployment" to the word "instance". "Installation" could not take it, because D-06 already uses that word for npm installation. Three places changed:
   - the sentence of `loop2-container-isolation/1` (the projected wording changed, the meaning did not);
   - D-08's level-2 examples;
   - D-08's rationale.
3. **The keep-running rule went into D-15.** `loop2-deploy-keeps-running/1` (F8) needs a decision to derive from. F1 alone does not state the rule, so D-15 now carries it as its first sentence. Its question became "How is loop2 recovered when a deployment goes wrong?"
4. **D-09 moved to level 1.** The template moves a decision to level 1 once an invariant is derived from it, so D-09 now names `loop2-deploy-trigger-input`. This edits a field of the gate-approved wording, and the entry still carries `Mariusz, 2026-10-13`.
5. **OpenSSH fact:**
   - The sshd(8) manual does not say that `SSH_ORIGINAL_COMMAND` is unset when the client sends no command. The fact therefore does not state it; that part needs an observation.
   - *Holds for* names release 8.9p1, because git 2.34.1 on the host suggests Ubuntu 22.04. I did not read the host's sshd release. The quoted passages are identical in 9.6p1.
6. **Two Cloudflare pages in one fact.** `cloudflare-configuration-rules/1` cites two pages of the Configuration Rules documentation (overview and settings) as one source, each with its archived copy of 2026-10-05. The guard accepts this form.
7. **The criticality scale and severities are my proposals.** Failure modes and severities normally come from the human; I wrote the two degrees (`low`, `high`) and every severity myself. The lock failure mode names no server account, as return-step F6/Q20 asks. The GitHub repository row is `trusted · yes` on my own judgment.
8. **D-17's rejected option.** "A host-wide prune" comes from the spec's line that reclaiming cache is a human decision.
9. **Not written, because not ruled:** X1, F10 and the E2 fact (the host's sshd environment). As a result, `loop2-deploy-trigger-input/1` rests on the OpenSSH fact (E1) alone.

**Fix after the orchestrator's ruling — `eaf28b5`.** The *Holds for* of `openssh-authorized-keys-options/1` now names the host's release. It is openssh-server 1:8.9p1-3ubuntu0.11 (OpenSSH_8.9p1 Ubuntu-3ubuntu0.11), which the orchestrator observed through the `mikrus` MCP server with `ssh -V` and dpkg on 2026-10-13. The new fingerprint is 3fd0389d, and it is updated in D-16's *Based on* and in `loop2-deploy-trigger-input/1`'s *Rests on*. The fact states nothing its source does not say; it never claimed that `SSH_ORIGINAL_COMMAND` is unset when the client sends no command. The invariant does not need that claim either: it is about which inputs are refused. Guards: environment-facts exit 0 (0/0/0), invariants exit 0 (0/0/0), decisions exit 1 with only the 8 `merge of <request link>` placeholder errors. (pl) Fakt mówi teraz, że host ma OpenSSH 8.9p1 w pakiecie Ubuntu 1:8.9p1-3ubuntu0.11, odczytane przez MCP `mikrus` 2026-10-13.

**Part map — `7e82813`.** The `deployment` part's *Files* now include `tests/invariants/test_loop2_deploy_trigger_input.py` and `tests/invariants/test_loop2_deploy_keeps_running.py`, the checks added in `d82996c`. The part-map guard (`--base 1701186`) exits 0 with 0 errors. It still shows the 2 warnings about account-server being computed as `high` and the 1 unchecked line about the dependency graph. (pl) Część `deployment` obejmuje teraz oba nowe pliki sprawdzeń niezmienników.

**Review fixes — `5e85eb0`.**

- **D-17/1:** the sentence now counts the build cache and the base image that a build adds to the Docker store the host's workloads share. The deployment never prunes them, and it removes or replaces nothing of another workload. The *Rejected* option now says that reclaiming that cache and those layers is a human's decision. The fingerprint changed from fe4c7624 to c332eebd, and `loop2-container-isolation/1`'s *Derives from* carries the new one.
- **`test server`:** the definition no longer says accounts are served there now. It reads "where player accounts are served once the game has them".
- **Guards:** decisions exit 1 with only the 8 placeholder errors; glossary exit 0 with the one ruled `deployment` warning; invariants exit 0, clean.
- **(pl):** Wdrożenie zmienia na hoście tylko rzeczy loop2 oraz dokłada do wspólnego magazynu Dockera pamięć podręczną budowania i obraz bazowy, których nigdy nie czyści, i nie usuwa ani nie podmienia niczego z innych obciążeń. Serwer testowy to serwer, na którym loop2 działa dla graczy, a konta będą na nim działać, gdy gra je dostanie.

**Assessment settlement — `4fcfc65`.**

- **C3, new invariant `loop2-host-sharing/1`:** derived from `D-17@c332eebd`, part `deployment`, method the gate command. The part-map failure mode "a deployment changes or removes something of another workload" is now detected by it, and `tests/invariants/test_loop2_host_sharing.py` is claimed in `deployment`.
  - Consequences of the split:
    - D-17's level 1 now names `loop2-host-sharing` instead of `loop2-container-isolation`.
    - `loop2-container-isolation/1` derives from D-08 alone.
  - (pl) Wdrożenie loop2 nie zatrzymuje, nie usuwa, nie podmienia ani nie przestawia na hoście żadnego kontenera, obrazu, sieci ani wolumenu poza własnymi loop2, a usługa Compose loop2 nie prosi hosta o żadne uprawnienie, którego nie ma zwykły kontener.
- **O7:** `loop2-deploy-trigger-input/1` also derives from `D-11@8ab607c7`, and D-11's verification moved to level 1 through it (template rule), with level 2 for the rest.
- **O4 and O8:** rationale added. D-16 and D-17 state that code merged into `main`, its container build and service definitions included, runs on the host with root's authority and is trusted code. D-10, D-16 and D-17 state that outside state no entry records is recorded after the first deployment.
- **O10:** failure modes of `deployment`. New: the build cache, never pruned, fills the disk until the memory and disk reading refuses every deployment. Reworded: the account that runs deployments lacks write access to `/run`, so the lock cannot be recreated after a restart.
- **Guards:**
  - decisions: exit 1, only the 8 placeholder errors.
  - invariants and environment-facts: exit 0, clean.
  - glossary: exit 0, the ruled `deployment` warning.
  - part-map: exit 1, with 1 error `foundations/part_map.md:79: error: pattern `tests/invariants/test_loop2_host_sharing.py` of `deployment` matches no file git tracks`. The check file does not exist until the check author adds it. Plus the 2 known account-server warnings and 1 unchecked line.
- **For the check author:** the docstring of `tests/invariants/test_loop2_container_isolation.py` still quotes the old isolation sentence ("The loop2 deployment runs…").
