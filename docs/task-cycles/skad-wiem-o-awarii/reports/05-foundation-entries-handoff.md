# Handoff 05 — the agent of the plan's *Foundation entries*

You write the foundation entries of the task cycle `skad-wiem-o-awarii` before any slice's code is made. You are a fresh agent with no stage row of `make-change`'s table: your stage is "the plan's *Foundation entries*".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator; a question for the human only as `task-cycle/skill/foundation_step.md` allows, returned as `blocked`.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`). Base of your range: `00aa818e59ab484358970f98af1f4ab61e969e4c` (also slice 1's base). Pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. You are the only agent writing in this worktree now.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/skill/foundation_step.md`, read whole. Each entry is written through the pinned project skill of its element: `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact` (and `the-way-record-glossary-term` or `the-way-update-part-map` only where a step of those skills sends you there); read each skill whole when you write an entry of its element. Run `python -B .the-way/elements/common/foundation_check.py` from the worktree root after each entry, as the element skills give.
- Full report to `.runs/task-cycles/skad-wiem-o-awarii/reports/05-foundation-entries-report.md`.

## What you write

The eight accepted rows of the task's *Settlements to record*, whole, each as an entry of its kind, with the wording yours and the meaning the row's:

1. decision — where the running game's log lies, how long it lives, how an agent reads it;
2. decision — how the owner learns the running game failed (three ways);
3. change of decision D-347 (via `the-way-record-decision`: its text, its *Rejected* and its *Verification* as the row says);
4. invariant — a deployment through `loop2-deploy` that dumps leaves the replaced containers' log in `/var/log/loop2-app.log`, and one that cannot dump says so in the deploy log and goes on (as the reviewed spec words it);
5. invariant — the watcher's message has a fixed subject and text, nothing of a player and nothing of a tool's output;
6. invariant — the server writes a browser report only as a kind, code and place of the allowed form, `accountId` from the session and never from the body;
7. environment fact — Docker removes a container's log with the container (moby v28.1.1, `daemon/delete.go`);
8. environment fact — on a public repository GitHub disables scheduled workflows after 60 days with no repository activity, and the repository is public.

Where the entries come from: the frozen task `.runs/task-cycles/skad-wiem-o-awarii/task.md` (rows with their *Source*, *Answer*, *Not chosen*, *Based on*, *Lacks*, *Risks taken*), the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md` (its section *Foundation entries* says where each row takes its content; its section *Settlements after the spec's review* binds), and the plan section `Foundation entries` of `.runs/task-cycles/skad-wiem-o-awarii/plan.md`. A citation or value comes from its source, never from memory: for the facts of rows 7 and 8 take the source and sentence from the task's *Based on* and read it again where the skill requires it; the "repository is public" half of row 8 is read from the repository's settings or its page (`gh repo view` or the remote), and if it cannot be read, say so in your report and in the entry as the skill gives (a TODO, not a guess).

The invariants of rows 4, 5 and 6 are method `test`; the checks are written by slices 2, 5 and 3 after your commit. Give each a name (the tests will carry `# invariant: <name>`). Follow the invariants skill on how an invariant whose test does not exist yet stands; if `foundation_check.py` cannot pass until the test exists, report exactly which check fails and why, change nothing to hide it, and return `done with concerns` (or `questions`) so the orchestrator can decide. The part-map edits (files and sentences) are **not** yours: slices 3, 4 and 6 make them inside the slices, because `foundation_check.py` fails for a pattern matching no tracked file.

## Inputs by identifier (the orchestrator's selection)

- Decisions whole: D-252, D-253, D-347, D-233, D-104, D-102, D-105, D-12, D-13, D-16, D-17, D-09, D-15, D-137, D-110, D-235, D-323; invariants `loop2-host-sharing`, `account-mutation-request-guards`, `account-request-transport`, `account-client-requests`, `loop2-api-error-route`, `account-save-backup-failure-notice`, `loop2-deploy-keeps-running`, `loop2-deploy-trigger-input`, `loop2-distinct-address`; environment facts `mikrus-pusher-mail`, `mikrus-host-docker-workloads`, `cron-d-file-rules`; `foundations/part_map.md`; the glossary entries of the terms you use. Then the search of the whole foundation that `elements/common/way_of_working.md` ("Search the foundation") asks, once the entries are settled.
- The technology reports (sources for *Based on*, outside the repository): `the technology report `skad-wlasciciel-dowiaduje-sie-ze-gra-padla` (kept outside the repository)` and `the technology report `dokad-trafia-zapis-gry-i-jak-dlugo-zyje` (kept outside the repository)`. The task document governs where they differ.
- Guideline files, each whole, since decisions bear on code guidelines: `guidelines/coding.md`, `guidelines/testing.md`. This step changes no guideline file; where a guideline or test cites an entry you change (for example D-347 in a guideline's *Decision* line or a test that quotes its sentence), search the repository for the identifier and name each hit in your report; fix only what the task's rows require and report the rest.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.

## Answers of step 4

Trust boundary: yes (`src/server/**`, `deploy/**`); irreversible operation: none performed by the cycle. Your entries must not claim a human action as done.

## Commits and report

- Commit on the task branch, in the product's style (English, `type: :emoji: summary`, as `git log` shows, e.g. `docs: :memo: …`), adding files explicitly by path, never `git add -A`; check `git log --format='%h %ae'` shows the private address after the first commit. Never force-push or push at all; the cycle pushes.
- Report: for each entry, one sentence of its meaning in English and one in Polish (the task document's language), marked `row <n>`; the commits; the checks you ran, each with command and exit code (`foundation_check.py` at least); a self-check of your work as `make-change` gives for its own-work check; the reaches beyond this handoff; and **Searches not found or unclear** (`none` is an answer).
- Return: status (`done`, `done with concerns`, `questions`, `blocked`), your commits, a one-line check result, the report path.
