# Dispatch — foundation step: entries (serwer-testowy)

You are a fresh agent writing this task's foundation entries — sentences and fields only. You write
no invariant check (a different agent writes those from your sentences, WAY-69) and no product
code. The user delegated intermediate choices to the orchestrator; any question goes back to the
orchestrator in your report, never to the human. Worktree `C:/Storage/repos/loop2-serwer-testowy`,
branch `task/serwer-testowy`; commit your work there. Nothing on any server, Cloudflare or GitHub;
never a server name, SSH port, SSH user or IPv6 address.

Use the project skills (each points to the pinned `.the-way` element skill; read it in full):
`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`,
`the-way-update-part-map` under `.claude/skills/`. Search the whole current foundation
(`foundations/*.md`) for collisions first.

Read: the frozen task `docs/task-cycles/serwer-testowy/task-frozen.md` (Polish; § Settlements to
record rows 1–6, § Decisions in play, § Context for row 6's source); the reviewed spec
`docs/task-cycles/serwer-testowy/spec.md` § Foundation entries; the plan
`docs/task-cycles/serwer-testowy/plan.md` § Foundation entries; the approved definition
`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` — projected
"Where does the MVP run?", "How does a change reach the server?", "What serves the built game and
account requests in the container?", invariants loop2-container-isolation/1,
loop2-distinct-address/1, loop2-one-serving-process/1 (container wording), and § Gate record.

Write:
1. Decision "Where does the MVP run?" — whole, in the gate-approved wording, *Approved by*
   transcribed from the gate record (`Mariusz, 2026-10-04`); fill what the projection left TODO
   (Scope, Relations) as the element skill directs.
2. Decision "How does a change reach the server?" — likewise whole, *Approved by* from the gate record.
3. New version of D-05 ("What serves the built game and account requests in the container?") adding
   the part D-05/2 lacks: "in the loop2 container" (and the projected "account and save routes"
   wording); *Approved by* `Mariusz, merge of <request link>` (literal placeholder; never a date).
4. Five decisions from settlement rows 1–5, each keeping its row's meaning, your wording;
   *Approved by* `Mariusz, merge of <request link>`; set every *Review when* yourself (row 1:
   before task 15 puts player accounts behind the route, the origin connection is encrypted —
   reflect that; row 3: "docelowo dostęp trzeba dodatkowo zabezpieczyć").
5. Environment fact from row 6 (Origin Rule changes the destination port; Free plan; up to 10
   rules), source and read date from the task's Context; rests under the row-1 decision's *Based on*.
6. Invariants `loop2-container-isolation/1` and `loop2-distinct-address/1` whole (projected
   sentences), and the new version of `loop2-one-serving-process` with the projected container
   sentence ("One Express 5 process in the loop2 container serves both the built game and `/api/`
   account and save requests."). *Method* for each is the gate command the existing entries use;
   *Derives from* the new decisions. Name in your report, for the check author, what each check
   should read per the plan (plan.md § Foundation entries rows) — but do not write checks.
   `account-server-runtime/1` and `account-server-typecheck/1`: sentences unchanged; touch their
   entries only if the element skill requires it for their checks' extension.
7. Part map: new part `deployment` as plan.md § Foundation entries describes (files, depends on,
   trust boundary `deploy/**` only, failure modes as the skill finds them); `agent-workflow` gains
   `tests/agent_workflow/**`; external-context rows for GitHub Actions, Cloudflare, the Mikrus host.
   Part-map lines may name files that do not exist yet; the guard's report on them is expected.

Then run the format guard of every changed file:
`python -B .the-way/elements/<element>/format_guard.py foundations/<file>` (elements: decisions,
invariants, environment-facts, part-map) and report each exit code and every message verbatim.
Commit with English messages, explicit paths (`git add foundations/<file> ...`, never `-A`).

Report to `docs/task-cycles/serwer-testowy/reports/foundation-entries.md`: each entry's identifier,
one sentence of its meaning **in Polish** (for the request, WAY-114), the commit(s), guard results,
any question. Return a summary under 200 words.
