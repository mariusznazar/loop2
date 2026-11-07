# Handoff — the return step (the one author, resumed)

Stage: the return step (step 11 of the cycle). You are the same author, resumed. Your first change is reviewed (`PASS 2ec0fd82125fc534fc60f17ca3198804214a318b`, report `reports/review-whole.md`, 0 findings) and the orchestrator's gate on it passed (exit 0). Work from the worktree root `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs`, branch `task/body-parser-i-qs`. Do not run the product's gate (`npm test`); the orchestrator runs it again if you commit anything.

## What to read

- `.the-way/task-cycle/skill/return_step.md` whole, and `.the-way/task-cycle/skill/foundation_step.md` whole (the return step writes as the foundation step writes). Read the skill of an element (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`, project skills with the `the-way-` prefix) only when you write an entry of that element.
- The frozen task, whole: `.runs/task-cycles/body-parser-i-qs/task.md` (its *Decisions in play*: D-33, D-02, D-104; *Settlements to record*: none; no projected entries).

## What to do

Compare with the code the entries the change touches and the part map of the touched part (`build-tools`): D-33, D-79, D-02, D-104, the invariants `introduced-npm-vulnerabilities`, `dependency-audit-refusal`, `application-package-layout`, `account-mutation-request-guards`, and any entry that names `body-parser`, `qs` or the lockfile versions, found by one search of the whole foundation (`foundations/decisions.md`, `invariants.md`, `glossary.md`, `environment_facts.md`, `part_map.md`). Correct in this change whatever no longer matches. Write an environment fact only for a source outside the product that the change rests on and the foundation does not hold (the change rests on the npm registry's versions and on advisories GHSA-27r3-jxmh-p828 and GHSA-6pq8-jhm2-2vcw — judge whether the foundation already holds a fact about the advisory database D-33 relies on, and whether a fact for these versions would be anything but a record of a transient state); a glossary term only for a word used in another meaning than the usual one; no invariant unless the task, a decision or the human sets the rule. No entry is deferred: what you do not write you neither propose nor list for later. Writing nothing is a valid result — say so with the reason for each kind.

If you commit anything, commit by path with an English message (`git add <path>`, never `-A`/`.`), and write the commit range in the report.

## Report

Write the full report to `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs\.runs\task-cycles\body-parser-i-qs\reports\return-step-report.md`, as the cycle record's *Return step* section gives: foundation compared with code (what no longer matched and its correction, or none); decisions, invariants, environment facts, glossary terms, part-map changes, projected entries and rows of *Settlements to record* written (identifiers or none). Include each check with its command and exit code, each reach beyond this handoff, and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`). Return status, commits (or none), a one-line check result and the report path.
