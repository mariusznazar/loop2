# Report 05 — foundation entries of the task cycle `skad-wiem-o-awarii`

**Status: done with concerns** (concerns 1 to 4 below; nothing blocks the slices).

Worktree `the root of the repository`, branch `task/skad-wiem-o-awarii`, base `00aa818`. `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (the gitlink and `git -C .the-way rev-parse HEAD` agree).

## Commits

| Commit | Files | Lines |
|---|---|---|
| `9b91774` docs: :memo: add the environment facts that the removal of a container's log and the disabling of scheduled workflows stand on | `foundations/environment_facts.md` | +18 |
| `bbefd44` docs: :memo: record where the running game's log lies and how the owner learns of a failure, narrow D-347 to the browser and add the invariants of the dump, the watcher's message and the browser report | `foundations/decisions.md`, `foundations/invariants.md` | `decisions.md` +43 −15 (D-352 and D-353 added, D-347 edited), `invariants.md` +30 |

`git log --format='%h %ae'` shows `mariusznn@gmail.com` (the private address) on both. Nothing pushed. Two commits, not three, because the decisions name the invariants and the invariants derive from the decisions: `foundation_check.py` fails on either file alone.

## Entries

Each entry: one sentence of its meaning in English, then in Polish (the task document's language).

| Row | Entry | Meaning |
|---|---|---|
| row 1 | decision D-352 (new) | EN: Just before a deployment replaces the containers, it appends the whole log of the application and the tunnel connector to `/var/log/loop2-app.log`, rotated weekly with four generations kept, the `local` driver bounds the running container, the JSON lines of `account-block` (only those) go to the same file, and an agent reads it through `mikrus`. |
| | | PL: Przed każdym odtworzeniem kontenerów wdrożenie dopisuje ich log do `/var/log/loop2-app.log`, rotowanego przez `logrotate` (tydzień, cztery pokolenia), sterownik `local` ogranicza log bieżący, same wiersze JSON `account-block` trafiają do tego samego pliku, a agent czyta go przez `mikrus`. |
| row 2 | decision D-353 (new) | EN: The owner learns that the running game failed in three ways: a watcher script on the server that calls `pusher` with fixed text, a scheduled GitHub Actions check of the public address, and a report from the browser to a route of the server that the watcher counts. |
| | | PL: O awarii działającej gry właściciel dowiaduje się trzema drogami: strażnik na serwerze wołający `pusher` ze stałym tekstem, zaplanowane sprawdzanie adresu w GitHub Actions i raport z przeglądarki na trasę serwera, zgłaszany przez strażnika. |
| row 3 | decision D-347 (changed in place) | EN: D-347 now answers only for the game running in the browser (question reworded), and its *Verification* and *Rejected* no longer forbid a server route for browser reports or a look in the server's output. |
| | | PL: D-347 odpowiada teraz tylko za grę działającą w przeglądarce (pytanie przeformułowane), a jego *Verification* i *Rejected* nie zakazują już trasy serwera na raporty z przeglądarki ani szukania w wyjściu serwera. |
| row 4 | invariant `loop2-deploy-log-dump` | EN: A deployment through `loop2-deploy` appends the replaced containers' log to the file before starting the new ones, and when the append fails it says so in the deploy log and goes on. |
| | | PL: Wdrożenie przez `loop2-deploy` dopisuje log zastępowanych kontenerów do pliku przed startem nowych, a gdy dopisanie się nie uda, mówi o tym w logu wdrożenia i idzie dalej. |
| row 5 | invariant `failure-watcher-message` | EN: Every message the watcher sends through `pusher` has a fixed subject and text, nothing of a player and nothing of a tool's output. |
| | | PL: Każda wiadomość strażnika przez `pusher` ma stały temat i tekst, bez danych gracza i bez wyjścia narzędzi. |
| row 6 | invariant `browser-failure-report` | EN: The server writes a browser's failure report only as a kind, a code and a place of the allowed form, with `accountId` from the session and never from the body. |
| | | PL: Serwer zapisuje raport z przeglądarki tylko jako rodzaj, kod i miejsce zgodne ze wzorcem, z `accountId` wziętym z sesji, nigdy z treści żądania. |
| row 7 | environment fact `docker-container-log-removal` | EN: In Moby v28.1.1, removing a container deletes its root directory, where the `json-file` and `local` drivers keep its log. |
| | | PL: W Moby v28.1.1 usunięcie kontenera kasuje jego katalog główny, w którym sterowniki `json-file` i `local` trzymają log, więc log ginie z kontenerem. |
| row 8 (half) | environment fact `github-scheduled-workflow-disabling` | EN: GitHub disables the scheduled workflows of a public repository after 60 days with no repository activity. |
| | | PL: GitHub wyłącza zaplanowane workflow repozytorium publicznego po 60 dniach bez aktywności w repozytorium. |
| row 8 (half) | environment fact `loop2-repository-visibility` | EN: The GitHub repository `mariusznazar/loop2` is public. |
| | | PL: Repozytorium GitHub `mariusznazar/loop2` jest publiczne. |

Wording choices that carry a risk if wrong:

- D-352 binding sentences state "weekly" and "four rotated generations" and "about four weeks" but not the 100 MiB size trigger or the 300-second bound of the dump; the spec calls these this design's parameters, and slice 1's test pins the rotation file. Cost if wrong: the log-lifetime sentence of the decision and the rotation file drift apart. D-352 *Rationale* says the numbers are chosen bounds.
- D-353 binding sentences give no numbers (30 reports an hour, 6 hours per kind, 6 a day, 24 hours, 6 attempts) for the same reason; they stay in the spec and in the slices' tests.
- Scope: D-352 `deployment, agent-workflow, account-server` (the last for the `account-block` lines); D-353 `deployment, agent-workflow, account-server, browser-view`.
- Relations: D-352 derives from D-252 · D-17 · D-12 (the spec's). D-353 derives from D-233 · D-12 · D-13 (the spec's) and D-253 (mine: the browser's report is its last-resort line; if the orchestrator does not want it, delete it with no other change).
- Invariant names are mine: `loop2-deploy-log-dump` (row 4, slice 2), `failure-watcher-message` (row 5, slice 5), `browser-failure-report` (row 6, slice 3). Tests carry `# invariant: <name>`.
- `failure-watcher-message` *Rests on* `mikrus-pusher-mail`, the same fact `account-save-backup-failure-notice` rests on; the other two rest on nothing.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` before my first edit | 0 ("0 errors") |
| same, after the facts | 0 |
| same, after the two decisions (before the invariants existed) | 1 — 3 errors: `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report` named by *Verification* and not yet in the file; expected, cleared by the invariants |
| same, after the invariants and before each commit; again after the second commit | 0 ("0 errors") |
| `git diff --check` | 0 |

Not run: any test of the repository (nothing in this step changes code; the full suite is the cycle's run), the-way's own tests.

## Concerns

1. **`Method: test` before the test exists.** The three invariants read `test`, as the handoff and the spec say, and the checks come with slices 2, 3 and 5. The invariants template says "an invariant whose test is not written yet reads `review` (WAY-61)", and its *Write* step says the test is written in the change that brings the entry. `foundation_check.py` does not look for the citing test, so it passes. If the review of the change reads the template strictly, the alternative is `review` now and a change to `test` inside each slice. Cost if wrong: either way one word per entry; but a request that merges with `test` and a slice that left out its test would claim a check that does not run. The reviewers of slices 2, 3, 5 should confirm the `# invariant:` line stands.
2. **Row 8 became two entries.** The template says one entry states one fact from one source; the 60-day rule (a documentation page) and "the repository is public" (a reading of the repository's visibility) are two sources. `loop2-repository-visibility` has no archived copy to cite: the Internet Archive's CDX index returned nothing for `api.github.com/repos/mariusznazar/loop2` or `github.com/mariusznazar/loop2` (checked 2026-11-08), and the template forbids making one for the entry. The entry says that in its *Source* and quotes the JSON field `"visibility": "public"` read from the unauthenticated API; the template's "source of a setting read ... on a service they do not run" has a pending decision, so this form is my reading of "a page without editions". Cost if wrong: the form of the *Source* is questioned; the fact is true today (also read with `gh repo view --json visibility`: `PUBLIC`).
3. **Tool behaviours quoted in *Based on* and not written as facts.** The task's *Based on* quotes, for D-353, the GitHub schedule's 5-minute shortest interval, its possible delay and its notification recipient, the Docker events buffer, and for D-352 the `local` driver's 100 MB, `json-file`'s unlimited default and the `daemon.json` rule. The decision template says a citation whose change would call the decision into question is written as a fact. Only rows 7 and 8 were accepted, so I copied the others as quoted citations, as the task's *Based on* gives them. If the human wants them as facts, they are further entries ("the cycle's" kind) and the two *Based on* fields change to name them.
4. **Quoted citations copied, not re-opened.** The passages of the task's *Based on* other than rows 7 and 8 are copied unchanged from the task (read 2026-11-08 there); I did not open them again. The three facts of rows 7 and 8 I did open: `delete.go` (line 160) and `container.go` (lines 431-463 and `GetRootResourcePath`) at tag `v28.1.1`; the documentation passage in the live page and in the archived capture `20261031092549`; the visibility field from the API and `gh repo view`.
5. **One clause of a *Rejected* dropped.** The task's *Not chosen* for Grafana Cloud ends with "probable collision with D-347". D-347 no longer forbids that, so D-352 *Rejected* keeps the other costs (new secret, agent token, plugin, root rights) and drops the clause. The task's *Not chosen* A (and the others) are in D-353 *Rejected* in my wording, each with its cost; "F" (the chosen way) and its costs went to *Rationale* as *Lacks* and *Risks taken*.
6. **Word choice.** I avoided "dump" in the decisions and the invariants' sentences (the code and the deploy-log line `dump:` use it). "Watcher" has no glossary entry; I judged it an ordinary word. If the orchestrator wants the term fixed, it goes through `the-way-record-glossary-term`.

## Own-work check

The requirement most likely unmet: each of D-352 and D-353 *Rejected* holds only ways that the task's *Questions to settle* keeps, with the cost beside each, and *Rationale* names no file path or script. I compared the two *Rejected* fields line by line with the task's *Not chosen* lists (D-352: options 1, 2, 4, 5, 6, 7, 8, 9; D-353: A, A2, B, C, D, E1, E2, G, H, I, J): all present; the tool names in *Rationale* (`logrotate`, `docker exec`, `pusher`) are the binding sentences' own words; the only file path in the decisions is `/var/log/loop2-app.log` in D-352's binding sentence. The check that caught a real fault: the first `foundation_check.py` run after the decisions (exit 1, the three missing invariants) — then 0 once they existed. A second check: `grep` of the whole repository (outside `node_modules`, `.git`, `dist`) for `D-347`, `D-352`, `D-353` and the old D-347 question: the only files holding them are the entry itself and run records under `.runs/`, so no guideline, test or skill quotes D-347's sentence and nothing needs fixing.

## Reaches beyond the handoff

- `.the-way/elements/decisions/skill/*.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md` and `way_of_working.md`; the same for invariants and environment facts (read as the element skills say).
- `foundations/part_map.md` (grep for the four parts' lines only; the part-map edits are slices 3, 4 and 6) and `foundations/glossary.md` headings plus the entries `deployment`, `test server`, `public address`.
- `foundations/environment_facts.md` entries `mikrus-pusher-mail`, `mikrus-host-docker-workloads`, `cron-d-file-rules` (read), plus the tail of the file.
- The vault task file `a note in the author's notes vault`, only to check that it is identical to the frozen task (it is) and to name it in *Origin*; the vault is outside the cycle's forbidden list.
- `a note in the author's notes vault` (before committing).
- Web: `raw.githubusercontent.com/moby/moby/v28.1.1/{daemon/delete.go,container/container.go}`, the GitHub documentation page and its Internet Archive capture, `api.github.com/repos/mariusznazar/loop2`, the Internet Archive CDX index.

Inputs of the handoff I did not read whole: the technology reports (the task governs and carries their conclusions), `guidelines/coding.md` and `guidelines/testing.md` (this step changes no guideline; I searched the repository for the identifiers instead, no hit), and the invariants `account-mutation-request-guards`, `account-request-transport`, `account-client-requests`, `loop2-api-error-route`, `account-save-backup-failure-notice` (partly), `loop2-deploy-keeps-running` and `loop2-host-sharing` (read) were consulted for form and non-collision, not each whole. The decisions D-09, D-12, D-13, D-15, D-16, D-17, D-102, D-104, D-105, D-110, D-137, D-233, D-235 (opening), D-252, D-253, D-323 and D-347 were read whole.

## Searches not found or unclear

- No archived copy of the repository's visibility (concern 2).
- The template's *Source* form for a setting read on a service the product's people do not run is a pending decision (`TODO — decision pending`), so the form of `loop2-repository-visibility` is judged, not given.
- The foundation holds no environment fact for the `local` log driver's size bound or for Docker Compose's recreate; they are quoted in D-352 *Based on* (concern 3).
- The search of the whole foundation found no entry that already states any of the eight rows' settlements, no second answer to either question, and no collision between the new decisions and D-12, D-13, D-16, D-17, D-102, D-104, D-105, D-110, D-137, D-233, D-252, D-253. Observation, not a change: D-233 says a host that is down sends no message and leaves a review before the public launch; D-353's scheduled check now catches a host that is down, so that review may cite it (the spec says the same). `guidelines/testing.md` rows for the new route and the stale counts are scheduled (spec S2), not edited here.
- No entry waits for something this change brings except the part map (slices 3, 4, 6) and the two testing-guideline rows (S2).

## Questions

none.
