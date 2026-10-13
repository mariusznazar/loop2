# Settlement of the independent assessment — serwer-testowy (author: orchestrator)

| Remark | Settlement | Applied by |
|---|---|---|
| C1 / O1 — workflow reader under account-server-typecheck/1 | **Cut.** The server-side forced command and the script's `git checkout --force` + `git clean -ffdx` before every build already keep shipped files out of the build; the reader locked harmless workflow edits and five correction rounds showed it cannot be closed. The parked finding Q21 becomes moot. The Dockerfile, Compose and script reads stay. | check author |
| C2 / O2 — `RUN npm run typecheck` duplicates the build | **Kept.** spec § 2 mandates the explicit type check; it costs one extra compiler pass of a small project. No change. | — |
| C3 / O3 — isolation check's script half beyond its sentence | **Split.** New invariant `loop2-host-sharing/1`, derived from D-17, carries the script half and the Compose privilege rules; its check takes over those tests and closes the misses (global options before the subcommand such as `--context`/`-H`/`--host`; Compose `privileged`, `cap_add`, `devices`, `pid`/`ipc`/`userns_mode: host`, a Docker socket mount). `part_map.md` failure-mode line naming the detecting invariant is updated. | entries author (sentence, map), check author (check) |
| C4 / O5 — distinct-address checks the probe variable | **Kept.** Projected invariant this task writes whole (WAY-126); its check reads what the repository declares; the Cloudflare record is outside state set by a human action. No change. | — |
| C5 — account-server failure modes | **Kept.** True failure modes the return step found. | — |
| C6 / O6 — reader self-tests cite invariants | **Citations dropped**; the self-tests stay as checks of the reader. | check author |
| O4 — the commit's Dockerfile and compose.yaml run as root | **D-16 and D-17 rationale state it:** code merged into `main`, its Dockerfile and compose.yaml included, runs on the host with root's authority through the deployment — it is trusted code, and whoever can merge to `main` can act on the host. The trust boundary stays `deploy/**` (files that accept data the product does not trust). | entries author |
| O7 — trigger-input does not derive from D-11 | **D-11 added to Derives from.** No separate D-11 invariant (the server-side `main` check is the binding one). | entries author |
| O8 — outside state not recorded as facts | **Declared** in D-10, D-16 and D-17 rationale: the forced-command entry, the installed script, the Cloudflare records and the host's resources are outside state this request does not record; the correction after human action 5 records what the human observes. | entries author |
| O9 — container test docstring claims `init: true` | **Docstring fixed.** | check author |
| O10 — failure modes | **Add** the disk-fill mode (build cache never pruned → the resource gate eventually refuses every deployment until a human reclaims it); **reword** the lock mode (an account without write access to `/run`). | entries author |
| O11 — `server` used for the account server and the host | No change; choice-table line. | — |
| O12 — stale runtime docstring; "Rejected: none considered"; old-game probe; port tie; size | Runtime docstring fixed (check author). D-09's wording is gate-approved, kept. The old-game probe failing the run is intended (acceptance criterion 1). No check ties port 18080 across compose, script and the Cloudflare rule — choice-table line. Size: C1 removes ~565 lines; invariant checks differ from tests/deploy in their authorship (WAY-69: written by agents that wrote neither the code nor the sentence). | check author / — |

A settlement that changes the assessed entries or invariant tests does not reopen the assessment
(WAY-10); the affected checks rerun and a code reviewer writes the deliberate break of the new
invariant.
