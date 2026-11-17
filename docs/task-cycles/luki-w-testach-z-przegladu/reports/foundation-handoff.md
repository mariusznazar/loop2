# Handoff — the agent of the plan's *Foundation entries*

You make part of one task's change for the cycle `implement-task`: the foundation entries the plan lists, before any slice is made. You are a fresh agent; another agent reviews your work with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval; by merging the request the human accepts the entries you write that were not accepted with the task. Ask no human; a question for the human goes to the orchestrator in your report with the status `blocked` or `questions` as `task-cycle/skill/foundation_step.md` gives.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`, base of your range `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1` (HEAD now). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, matching the gitlink.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is *the whole change as the one author* **narrowed to the plan's *Foundation entries* only** (no slice, no test, no code). Read its `SKILL.md` whole and `.the-way/task-cycle/skill/foundation_step.md` whole (it also governs your report: for each entry one sentence of its meaning in English and one in the task document's language, marked `row <n>` or `the cycle's`). You have no skill tool: the `SKILL.md` of an element is read as a file at the path `foundation_step.md` gives, when you write an entry of that element.
- Stage and boundary: you write the entries below and commit them; you write no test, no code, no guideline file other than where the table says so (it says none for you); you do not run the product's gate. You may run the foundation check and the check of the instruction files.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/foundation-report.md`. Your directory for working copies: `.runs/foundation/`.
- Commits: git rules of the repository — messages in English in the form of the existing commits (`git log -10 --format=%s`), `git add` by path, never `-A` or `.`. Check the author address of your first commit with `git log --format='%h %ae' -1` (it must be the account's noreply address).

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return and state in the report where each stood and that it was removed.)

## The task and the plan's rows

The frozen task is `.runs/task-cycles/luki-w-testach-z-przegladu/task.md` (read it whole). Its three rows of *Settlements to record*, word for word:

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Test strażnika `destroy` po skończonej odpowiedzi sprawdza wywołanie, nie skutek, bo urwania odpowiedzi nie widać na Windowsie, na którym biegnie bramka; to odstępstwo od szablonu testowania stoi w D-73 i w wytycznych. | decision | pytanie 2 (wybór człowieka) | czy wyjątek zapisać tylko w wytycznych, czy jako odstępstwo D-73, i jak szeroko go sformułować |
| 2 | Każdy plik PNG pod `assets/sprites/` ma w teście przypisaną paczkę, a nowy plik bez przypisania wywraca test; `sprite-credits` jest sprawdzany testem. | invariant | pytanie 3 (wybór człowieka) | czy test kompletności ma łapać nowy plik, czy tylko nową paczkę, i czy metoda niezmiennika zostaje „review” |
| 3 | To, jak `express-session` tworzy identyfikator sesji, stoi jako fakt środowiska z cytatem źródła, na którym opiera się `player-opaque-session-cookie`. | environment fact | pytanie 9 (wybór człowieka) | czy wynik odczytu zapisać jako fakt, test losowości, czy tylko w zapisie cyklu |

The plan is `.runs/task-cycles/luki-w-testach-z-przegladu/plan.md` (the section below is copied from it word for word; the slices are not yours, and `plan.md` is not to be opened by you). The spec `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md` settles item 16 (read its *Foundation entries* and Decisions 1 and 2 for D-29).

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| A decision of the departure: the case „a failed renewal after an answer that has ended writes one line of the session and calls no destroy on the response” of `tests/http.test.mjs` checks the call of `destroy` and not its effect, because the cut of an answer cannot be seen on Windows, where the gate runs; it narrows D-73, as D-74 … D-273 do | decision (new) | Settlements row 1 · To do 6 · question 2 | Slice 5 names it in `guidelines/testing.md`; held by its own pair of examples, since no test needs to change |
| D-73 — the binding sentence's list of departures names the new decision | decision (changed) | Settlements row 1 · To do 6 | Slice 5 |
| An environment fact: how `express-session` 1.19.0, the version `package-lock.json` pins, makes the session identifier (its generator and the source of its randomness, through `uid-safe` 2.1.5 as the lockfile pins it), with the source quoted | environment fact (new) | Settlements row 3 · To do 14 · question 9 | none of the slices |
| player-opaque-session-cookie — *Rests on* gains the fact above | invariant (changed, *Rests on* only) | Settlements row 3 · To do 14 | none; its check stays the two cases of `tests/transport.test.mjs` that cite it, unchanged |
| sprite-credits — *Method* `review` → `test` | invariant (changed) | Settlements row 2 · To do 5 · question 3 | Slice 4 writes the test that cites it |
| player-express-session-sqlite-store — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 sees its two citing cases of `tests/transport.test.mjs` fail once |
| player-self-registration — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 writes its citation |
| player-password-login — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 writes its citation |
| email-verification-nonblocking — *Method* → `test` | invariant (changed) | To do 11 | Slice 3 writes its citation |
| account-save-durable-storage — *Method* → `test` | invariant (changed) | To do 11 | Slice 1 moves the citation of `test_replaced_container_keeps_accounts_and_sessions` to it |
| loop2-shared-public-origin — *Method* → `test` | invariant (changed) | To do 11 | Slice 4 writes its citation |
| D-112 — *Verification* without `account-schema-lifecycle` | decision (changed) | To do 12 | Slice 2 withdraws that invariant |
| D-29 — binding sentence, *Scope*, *Rationale* and *Rejected*, as the spec's *Foundation entries* gives; *Verification* and the sentence on changing the rule set unchanged | decision (changed) | spec · To do 16 | Slice 15 |
| account-schema-lifecycle — withdrawn into *Withdrawn identifiers* | invariant (withdrawn) | To do 12 | written by Slice 2 with the citations it moves (WAY-69), not by the agent of these entries |
| account-database-schema — its sentence also says "before readiness" and keeps the emailed links | invariant (changed) | To do 12 | written by Slice 2 with the citations of `tests/account-storage.test.mjs` (WAY-69), after Slice 1 moved that of `tests/startup.test.mjs`; check: the cases of `tests/account-storage.test.mjs` and `tests/startup.test.mjs` that cite it |
| eslint-source-rules — sentence names the three directories beside the five parts, *Part* gains agent-workflow | invariant (changed) | spec | written by Slice 15 with its test (WAY-69); check: `tests/quality/test_source_tool_scope.py` and `tests/quality/test_quality_invariants.py` |
| `guidelines/coding.md`, rule *Linter*, the paragraph on the patterns of `eslint.config.mjs` | guideline (coding) | spec | written by Slice 15 |
| `guidelines/testing.md`: the departure named with D-73's others and their count, the *Doubles* of the recipe `integration test` (To do 6), the row of `.github/workflows/deploy.yml` (To do 17) | guideline (testing) | Settlements row 1 · To do 6 · To do 17 | written by Slice 5 |

The agent of these entries writes every row whose last column does not say "written by Slice N";
the rows written by a slice are listed here so that the whole foundation work of the task stands in
one table. It writes D-29 in a commit of its own, apart from its other entries (spec, Decision 6).
It runs `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, since the
six invariants it turns to `test` are cited only once Slices 1 to 4 are made; the run without the
switch reports exactly those six until then, and no slice before Slice 4 counts that report as a
failure of its own.

For the return step, not for the agent of these entries: where Slice 6 reports its test written,
D-382's *Verification* names that test under `tests:` and drops the clause on the rows already drawn
from the pair of examples, as `task-cycle/skill/return_step.md` gives; where Slice 6 writes no test,
D-382 stays as it is.

**Added by the orchestrator, binding:** the agent of these entries writes every row whose last column does not say "written by Slice N" — that is the first 13 rows of the table, D-29 the last of them (rows 14 to 18 are written by slices). Where the table says "A decision of the departure", it is a new decision whose binding sentence says what the row's sentence says and that it narrows D-73; give it the next free number and the shape of the ten departures D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235, D-273 (read two of them whole). D-73's binding sentence names it in its list. The fact of `express-session` needs the source read from the installed package: `node_modules/express-session/index.js` and `node_modules/uid-safe/index.js` (the worktree has `node_modules`, installed from the lockfile) at the versions `package-lock.json` pins; quote the lines that make the identifier, give the versions, and follow the element's rule for the source's citation; if the source cannot show where the randomness comes from, say so in the report rather than write a fact the source does not support.

## What to read

Read whole: the frozen task; `.the-way/task-cycle/change/SKILL.md`; `.the-way/task-cycle/skill/foundation_step.md`; for each element you write, its `SKILL.md`, `template.md`, `elements/common/rules.md` and `examples.md` as that `SKILL.md` and `elements/common/way_of_working.md` give; `AGENTS.md` of the worktree; `foundations/part_map.md`; `foundations/glossary.md`. Decisions to read whole by heading `### D-NN`: D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235, D-273 (the departures: read D-74, D-163 and the one nearest in meaning whole; the others by their binding sentence and *Scope*), D-112, D-29, D-32, D-28. Invariants by identifier in `foundations/invariants.md`, each whole: `sprite-credits`, `player-express-session-sqlite-store`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `account-save-durable-storage`, `loop2-shared-public-origin`, `player-opaque-session-cookie`, `account-schema-lifecycle`, `account-database-schema`, `eslint-source-rules`. Environment facts: `express-session-store-contract` and the facts those invariants rest on, found by search in `foundations/environment_facts.md`; the test cases that cite each invariant (search `invariant: <id>` in `tests/`) to see what a *Method* `test` will rest on. `guidelines/testing.md` is read by the slice that writes into it; you read its *When to read* and the list of departures only to word the new decision's *Verification*.

## What is checked and what stays red on purpose

`python -B .the-way/elements/common/foundation_check.py --skip-test-citations` must exit 0 on your last commit. The run without the switch reports exactly the six invariants you turn to `test` whose citing tests the slices write (Slices 1 to 4) — the invariants `player-express-session-sqlite-store`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `account-save-durable-storage` and `loop2-shared-public-origin`, and `sprite-credits`, as far as they do not yet have a test that cites them; name each in your report. `account-schema-lifecycle`, `account-database-schema` and `eslint-source-rules` are NOT yours: slices write them with their citations. Run `python -B .the-way/instruction-files/check_instructions.py` as well (errors stop; warnings are no failure).

D-29 goes in a commit of its own, apart from every other entry (spec Decision 6), so that reverting it is one commit. The other entries may share commits by element.

## Return

As `make-change`'s section on returning gives, with the foundation step's additions: status, commits, a one-line check result with commands and exit codes, the report path. The report ends with **Unread material:** and **Searches not found or unclear:** (each `none` where so), lists each reach beyond this handoff, the own-work check as the method gives it, and each working copy.
