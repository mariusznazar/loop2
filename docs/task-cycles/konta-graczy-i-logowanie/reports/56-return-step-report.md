# Return step report: player accounts and login

- **Status:** done with concerns (one orchestrator item, the copy row for `account-routes.ts`, and two Minor findings, 13 and 17, judged and left unchanged; one form question about *Review when* left for the orchestrator; four changed meanings the request must name)
- **Base:** 40977266b5d66825c49fcdd0c6982c1872e8a2c5 (clean at start)
- **Head:** 4e915e8dcac1e9cb5fcbbaabcbb4754b374e6f07
- **Commits:** 4e915e8 "Align the foundation and guidelines of player accounts with the code at the return step" (one commit)
- **Pin:** `.the-way` checkout and gitlink both 574a37b9ab9572f876298f4cc10754581222d3f0.
- **Method:** `.claude/skills/the-way-make-change/SKILL.md` → `.the-way/task-cycle/change/SKILL.md`; step 11 of `.the-way/task-cycle/skill/SKILL.md` with the foundation-step paragraph; the element skills record-decision, record-invariant, record-glossary-term, record-environment-fact, update-part-map, with `elements/common/way_of_working.md`, `rules.md`, the templates of decisions, invariants and environment facts and the examples they name; maintain-coding-guidelines and maintain-testing-guidelines with their templates' "Writing the file(s)".

No product code, no test, no server command, no push, reset or rebase. Staging by explicit path; line endings unchanged (all six files `i/lf w/lf`).

## Changed paths

| Path | Added | Removed |
|---|---:|---:|
| `foundations/decisions.md` | 5 | 5 |
| `foundations/environment_facts.md` | 12 | 0 |
| `foundations/invariants.md` | 2 | 2 |
| `guidelines/coding-browser-module.md` | 0 | 6 |
| `guidelines/styleguide-browser-view.md` | 8 | 8 |
| `guidelines/testing.md` | 3 | 1 |

## Checks

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | 4097726 at start; 574a37b… twice |
| 2 | `python -B .the-way/elements/common/foundation_check.py` (before the edits, at 4097726) | 0 | `0 errors` |
| 3 | `python -B .the-way/elements/common/foundation_check.py` (after the edits, before the commit) | 0 | `0 errors` |
| 4 | `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie` | 0 | |
| 5 | `docker run --name loop2-task15-return56-gate --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh 4e915e8dcac1e9cb5fcbbaabcbb4754b374e6f07 7012abcfb55b4ba2b2836b574a2275eb1551df28` (full `npm test`, log `reports/56-return-step-gate.log`) | 0 | Product at 4e915e8, process at 574a37b, Node v24.22.1. Node 429/429 pass, 0 fail, 0 skipped. Python 5 + 66 + 176 + 32 tests OK, with 3 Windows-only skips as in the baseline. Foundation check `0 errors`. `docker_exit=0`; container removed afterwards (`docker rm`, exit 0). |
| 6 | Mechanical check of the two new facts: `curl` of each source address at its commit, and the quoted passages found in the fetched text | 0 | Both addresses open; every passage stands there word for word (markup dropped, whitespace collapsed). Commits: docker/docs 62f6d26 (2026-08-03), whatwg/fetch e9460d1 (2026-10-06), from the GitHub commits API |

Not run: the Windows gate (not asked); any server or Cloudflare command (forbidden). The three Windows-only quality tests are skipped on Linux, as in every earlier Linux run, not passed.

## Entries and guidelines written or corrected

Each with one sentence of its meaning in Polish.

1. **New environment fact `docker-volume-lifecycle`** (`foundations/environment_facts.md`). Source: docker/docs at 62f6d26, `content/manuals/engine/storage/volumes.md` § A volume's lifecycle. Named by D-17 *Based on* and by `account-save-durable-storage` *Rests on*.
   - Meaning: Docker trzyma zawartość wolumenu poza cyklem życia kontenerów, które go używają, więc usunięty kontener zostawia dane swojego wolumenu, a wolumen, którego nie używa żaden działający kontener, nie znika sam.
   - Why: D-17 promises that the database survives replacement of the application container and code rollback, and `account-save-durable-storage` says replacement preserves the database. Both hold only because Docker keeps a named volume when the container goes. The foundation held no fact for this (WAY-11, step 11).
2. **New environment fact `fetch-origin-header`** (`foundations/environment_facts.md`). Source: whatwg/fetch at e9460d1, `fetch.bs` § HTTP-network-or-cache fetch, § `Origin` header, § Request class. Named by D-102 *Based on*.
   - Meaning: według standardu Fetch przeglądarka dokłada do żądania o metodzie innej niż `GET` i `HEAD`, w trybie `cors` — domyślnym dla `fetch()` z adresem — nagłówek `Origin` z pochodzeniem strony.
   - Why: D-102 refuses every state-changing request without the exact Origin. The game's own `POST` requests pass only because browsers send that header on same-origin `fetch` (`src/browser/account-api.ts:147`, default mode). Were that no longer true, D-102 would lock players out, so the decision rests on it.
3. **D-17 *Based on*** gains `docker-volume-lifecycle`. Binding sentences unchanged.
   - Meaning: bez zmiany treści decyzji; decyzja o współdzieleniu hosta opiera się teraz jawnie także na tym, że Docker zachowuje wolumen po usunięciu kontenera.
4. **D-102 *Based on*** reads `fetch-origin-header` instead of `none`. Binding sentences unchanged.
   - Meaning: bez zmiany treści decyzji; wymóg dokładnego nagłówka `Origin` opiera się jawnie na tym, że przeglądarka wysyła go przy żądaniach zmieniających stan.
5. **D-44, second and third binding sentence** (Minor finding 5). Old: "A control awaiting a server response is disabled with text in `text-disabled`, its button reads „Logowanie…” or „Zakładanie konta…” for the corresponding form, and that form's fields are disabled. Server refusal and loss of connection appear as one sentence below the form in `warning`, …". New: "A control awaiting a server response is disabled with text in `text-disabled`; the button that sends a form then reads „Logowanie…” or „Zakładanie konta…” for the corresponding form, and that form's fields are disabled. A form's server refusal and loss of connection appear as one sentence below the form in `warning`, …".
   - Meaning: kontrolka czekająca na serwer jest wyłączona, z tekstem w `text-disabled`; napis „Logowanie…” albo „Zakładanie konta…” i zablokowane pola dotyczą przycisku wysyłającego formularz, a odmowa i brak połączenia przy formularzu stoją jednym zdaniem pod nim w `warning`.
   - The request must name this as a changed meaning of D-44.
6. **Styleguide, rule "States of shared controls"**: the `loading` item, and the `button.ts` exception (`guidelines/styleguide-browser-view.md:176-183`, `:197-199`), say the same as D-44. Loading now applies to the plain button that awaits the server, not only to the one that sends a form; the form labels and disabled fields stay tied to the form.
   - Meaning: stan oczekiwania ma każdy zwykły przycisk czekający na serwer — wyłączony, z tekstem w `text-disabled` — a napisy logowania i zakładania konta oraz zablokowane pola dotyczą formularzy.
7. **D-114, second binding sentence** (orchestrator item 3). Old: "…each admitted attempt is settled once, when its password work has completed." New: "…each admitted attempt is settled once, only after the password work it started has completed."
   - Meaning: każdą dopuszczoną próbę rozlicza się raz i dopiero po zakończeniu pracy hasła, którą ta próba rozpoczęła.
   - This matches `account-attempt-limits` as slice 8 reworded it. Code check: a duplicate registration is released by the pre-check, and a gate refusal when the gate throws; neither started password work (`src/server/account-routes.ts`, `reports/43-evidence-report.md:100-102`).
8. **D-111 *Origin*** reads `none` instead of "task konta-graczy-i-logowanie, accepted cycle plan, Slice 1."
   - Meaning: bez zmiany treści decyzji; pole Origin nie wskazuje już planu cyklu, który znika po zamknięciu zadania.
   - Why: the decision template forbids both. *Origin* never points "to anything deleted when its task closes", and "The task a decision was made in is not recorded". The cycle plan lives under the git-ignored `.runs/`.
9. **`account-save-sqlite-access` *Violated*** turns from `yes` to `no` (Minor finding 4).
   - Meaning: serwer kont i zapisów sięga do swojej bazy SQLite przez wbudowany moduł `node:sqlite`, bez zewnętrznego sterownika — i tak jest dziś.
   - Evidence: `src/server/database.ts:2` imports `DatabaseSync` from `node:sqlite`, and no other file under `src/` reaches SQLite. `package.json` and `package-lock.json` hold no SQLite package (`grep sqlite` empty). `tests/deploy/test_account_storage.py` opens the database in the built image. The save server is the same process (D-05) and has no other driver.
   - Under WAY-51 the request must name the clearing.
10. **`account-save-durable-storage` *Rests on*** reads `docker-volume-lifecycle` instead of `none`. Sentence, method and the `Violated: yes` mark unchanged.
    - Meaning: bez zmiany treści niezmiennika (nadal naruszony, bo zapisów gry jeszcze nie ma); warunek zachowania bazy przy wymianie kontenera opiera się jawnie na zachowaniu wolumenu przez Dockera.
11. **`guidelines/testing.md`, recipe `integration test`, *Files*, and `## Where in code`** gain `tests/account-api.test.mjs` and `tests/password-measurement.test.mjs` (orchestrator item 2).
    - Meaning: testy klienta kont (prawdziwy lokalny serwer HTTP) i pomiaru haseł (prawdziwy proces i pliki tymczasowe) są testami integracyjnymi i stoją na liście plików tego poziomu.
    - Level by D-81: real local HTTP (`tests/account-api.test.mjs:1-3`, `node:http` `createServer`), and a spawned process with temporary files (`tests/password-measurement.test.mjs`, `spawnSync`, `mkdtemp`). Both are already in `npm test` through `tests/*.test.mjs`.
12. **`guidelines/coding-browser-module.md`, `## Files of this kind`**: the six `copy` rows this task added are removed (Minor finding 6). They were `account-screen.ts`, `controls/button.ts`, `controls/number-field.ts`, `controls/select-list.ts`, `controls/text-field.ts` and `game-view.ts`. The table is again the one of the base.
    - Meaning: nowe i dotąd nieocenione pliki modułów widoku nie mają statusu „copy”, dopóki audyt wytycznych go nie nada.
    - Why: `.the-way/product-guidelines/coding/template.md:166-169` says that "a file added after that audit takes no row until the guidelines are refreshed or extended", and under WAY-200 a status comes from a comparison of the kind's files. No comparison of browser-module files ran in this task. The task did not settle these statuses (To do 17 names no browser-module status), and the cycle's author "never writes a meaning the task did not settle" (WAY-172). The plan's slice 10 Goal ("update existing browser-module copy listings") is no settlement of the human. The prose examples the task added to the same file stay; they are examples and bind nothing.

## The orchestrator's items

1. **Copy row for `src/server/account-routes.ts` in `guidelines/coding-http-application.md`: verified missing, and not written.** It is a file of kind `http-application` added after that file's audit. The template rule quoted under entry 12 gives it no row until the http-application guidelines are refreshed or extended by `maintain-coding-guidelines`, which this task does not do. To do 17 settles only its kind ("Trasy kont należą do rodzaju `http-application`, który ma już wzorzec `src/server/app.ts`"), not a status. Writing the row would put in the same unearned `copy` that Minor finding 6 objects to. Cost of leaving it out: an author adding a route finds only the exemplar `app.ts`, which is the guideline's design.
2. **`tests/account-api.test.mjs` and `tests/password-measurement.test.mjs` in the integration test list: written** (entry 11).
3. **D-114's wording: corrected** (entry 7).

## The Minor findings of `reports/52-whole-review.md`

- **4 — `account-save-sqlite-access` stays `Violated: yes`: corrected.** The mark is cleared (entry 9). The sentence is true of the code and of the image today.
- **5 — D-44 and the styleguide against the waiting „Wyloguj” and „Spróbuj ponownie”: corrected** (entries 5 and 6).
  - K12 and To do 15 settle the waiting state for the forms: disabled, `text-disabled`, the two labels, fields locked, warning below the form. To do 15 opens with the general "Kontrolka, która czeka na odpowiedź serwera, ma stan oczekiwania".
  - The old D-44 bound every waiting control to a login label. The code (`src/browser/view/app.ts:80`, `:108`) shows two plain buttons that wait with other labels, and both are disabled through `setButtonWaiting` (`controls/button.ts:60-78`).
  - The new wording keeps every part of K12 for forms and drops the false claim. It adds no new rule for the label of a non-form button: that label stays the maker's text (spec, "Left to the maker").
  - Way rejected: a sentence binding every other button to "a label of the operation it awaits". It is a new rule the task does not settle. Its cost if wanted: task 16 has to settle the label of its save buttons itself.
- **6 — `copy` rows without the WAY-200 audit: corrected** (entry 12).
- **13 — `player-argon2-deployment-check` no longer carries the gate-approved wording: kept as is, and the request must name both wordings.**
  - The approved sentence is: "The deployed loop2 container image has passed concurrent password hash and verify checks using the configured Argon2id cost settings within its memory budget."
  - The sentence at head: "The deployed loop2 container image has passed, under its 512 MiB memory limit and after warmup, at least 20 hashes and 20 verifications with the configured Argon2id cost settings two at a time, a correct and a wrong password check and the refusal of a third concurrent operation, with no out-of-memory kill or restart and with the peak memory of its container's cgroup below 80% of that limit."
  - Two rules of the pinned the-way pull apart here. WAY-126 asks for the wording the readiness gate approved. WAY-60 says "A sentence bounding or equating a quantity measured while the product runs names its bound or tolerance, statistic and population", and "within its memory budget" names none.
  - WAY-60 also allows the condition to stand in a decision instead. No decision holds the 80% margin or the 20 + 20 population. They stand only in this sentence and in `scripts/measure-passwords.mjs:14-17` / `src/server/measure-passwords.ts:18-20`, which the sentence matches.
  - Restoring the approved wording would leave the invariant undecidable. Moving the numbers into D-111 would add binding sentences to a decision for an engineering choice that the spec (§6) calls reversible.
  - The current wording is the part of the approved meaning made checkable, and WAY-126 has the human accept such a meaning at the merge. So: no edit, and the request names the old and the new wording side by side with one Polish meaning: wdrożony obraz przeszedł pomiar haseł w limicie 512 MiB — po rozgrzewce co najmniej 20 haszowań i 20 sprawdzeń po dwa naraz, poprawne i błędne hasło, odmowa trzeciej operacji, bez zabicia z braku pamięci i restartu, ze szczytem pamięci poniżej 80% limitu.
- **17 — the launcher among build-tools' trust boundaries: kept as is.**
  - `scripts/measure-passwords.mjs` takes the human's arguments and the answers of the Docker daemon the human points it at. On the target that daemon is the Mikrus host's, which the map's External context marks `trusted`. The part-map template's trust boundary covers what "the product does not control".
  - Listing the launcher would also, by `guidelines/testing.md` "Trust boundaries", call for an invariant-tagged refusal test. Only a test change could add one, and this step may not change tests.
  - Should the orchestrator prefer to list it: add `scripts/measure-passwords.mjs` to build-tools' *Trust boundary* through `update-part-map`, give the existing "label names another commit" case of `tests/password-measurement.test.mjs:263-277` an invariant of its own, and add a row to the boundary table. That is a code-and-test change for an author, not for this step.

## Compared and found matching (no edit)

- The entries the change writes or changes, read against the code:
  - D-12, D-13, D-16, D-17, D-94–D-115 (with D-44);
  - the 22 new and 2 changed invariants;
  - the 14 new environment facts;
  - the part-map entries of browser-view, account-server, build-tools, deployment and agent-workflow.
- How they were checked: by the values and claims each entry names, against the code below. The slice reviews and the whole review had already compared their behaviour clauses with the tests, and I did not repeat that line by line. What was checked: `compose.yaml` (volume `loop2_accounts`, secret grants, environment, 512m), `Dockerfile:22-23`, `src/server/{app,transport,passwords,database,account-routes}.ts`, `src/browser/view/app.ts`, `src/browser/account-api.ts:147-155` and `scripts/measure-passwords.mjs:13-17`, with the cookie scope, `trust proxy` hop 0, the gate of two, WAL / FULL / busy timeout, the prune timer, `ON CONFLICT`, `node:sqlite` and the labels.
- *Depends on* of the touched parts against the code: no import crosses a part that its *Depends on* does not allow; browser-view's dependency on account-server is the HTTP contract.
- Glossary: no word of the change takes an entry. "unsettled" and "settle" in `account-attempt-limits` and D-114 carry their plain meaning, which the sentences spell out. The spec's own judgment, "Ordinary account/session vocabulary needs no new glossary entry", holds.
- Settlements K1–K13 and the projected entries the task assigns are all written: K1→D-94, K2→D-95, K3→D-96, K4→D-97, K5→D-98, K6→D-99, K7→D-100, K8→D-101, K9→D-102, K10→D-103, K11→D-13, K12→D-44, K13→D-12/D-16; projected D-104–D-106 and the ten invariants. The return step found none missing.

## Returned to the orchestrator

1. ***Review when* in D-12, D-16, D-104, D-105 and D-106 (question of form; no edit).**
   - WAY-24 of the pinned the-way says: "A decision names no date or condition for its review". Its violating example is "an entry carries a check-by date". WAY-119 is withdrawn because "no decision carries *Review when*", and the decision template has no such field.
   - The foundation check does not report extra fields, so these pass the check.
   - D-104–D-106 carry the field because the approved definition's projected entries do (without their "check by" dates). D-12/D-16 carry it because K13 and the spec asked that the access review "before closing the phase" stand in "a binding review/return field".
   - Removing it from D-12/D-16 would drop the only place in the foundation that holds K13's second half. That half ends with a phase of the project plan, which by WAY-36 belongs to the plan, outside this repository.
   - Recommendation: leave the entries as they are in this task and put the question to the human in the request: keep *Review when* against WAY-24, or move K13's review into the project plan (`plan_mvp_loop2.md`, phase "Konta na serwerze testowym") and drop the five fields.
2. **The request must name these meaning changes for the human's acceptance at the merge** (WAY-114, WAY-51): the D-44 sentences (entry 5), the D-114 sentence (entry 7), the cleared mark of `account-save-sqlite-access` (entry 9), and the two wordings of `player-argon2-deployment-check` (finding 13).
3. **A fresh review of this range** (`4097726..4e915e8`) with `review-change`, against the task and the entries written or corrected here, as step 11 gives.
4. **Observations, not changed:**
   - `account-schema-lifecycle` and `account-database-schema` state nearly the same rule. One is cited by `tests/startup.test.mjs:324` and `tests/deploy/test_account_storage.py:107`, the other by `tests/account-storage.test.mjs:167`, `:192`. Merging them takes a new identifier and edits of the tests that cite them, so it is outside this step.
   - D-111 stands before D-110 in the log; the renumbering after PR 31 can put them in order.
   - `tests/invariants/account_container_support.py` sits in build-tools, while all four files that import it are deployment's. Slice 3 chose this and its review accepted it, so it stays.

## Reading and reaches

Read whole:

- the handoff;
- `task.md`, `spec.md`;
- the make-change skill;
- step 11 and the foundation-step paragraph;
- the element skills named in the handoff;
- `way_of_working.md`, `rules.md`, the decisions and environment-facts templates, the invariants template §§ The sentence – Violated;
- the coding template;
- `reports/52-whole-review.md`;
- the diff `7012abc..4097726` of `foundations/` and `guidelines/`.

Reaches beyond the handoff, each with its reason:

- `.the-way/foundations/decisions.md` WAY-126, WAY-11, WAY-51, WAY-200, WAY-36, WAY-60, WAY-24 — to judge findings 4, 6 and 13 and the *Review when* fields.
- `.the-way/product-guidelines/styleguide/SKILL.md:1-50` and its template's "Writing the file" — the styleguide edit of finding 5.
- `.the-way/product-guidelines/testing/SKILL.md:1-60` and its template's "Writing the file" and "Where in code" — the testing.md edit.
- `reports/43-evidence-report.md:95-110`, `47-measure-report.md` (grep), `48-measure-review.md` (grep) and `19-slice3-report.md:33` — the history of the items.
- The product files named under "Compared".
- The two outside sources fetched with `curl`: `raw.githubusercontent.com/docker/docs/62f6d26…/content/manuals/engine/storage/volumes.md` and `raw.githubusercontent.com/whatwg/fetch/e9460d1…/fetch.bs`, with `api.github.com` for their commit SHAs. Copies are in the session scratchpad.

Not read: `cycle.md` (as instructed); the unchanged older decisions of the touched parts beyond those the task names.
