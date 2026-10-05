# Prompt — deliberate break author B (correction 1)

Dispatched by the orchestrator (Claude Opus 5.5), fresh general-purpose agent, model Claude Sonnet 5.5.

- Delegation: questions return to the orchestrator; never ask the human.
- Isolation (WAY-69): must not read, list or grep tests/invariants/ or other files in reports/correction-1/; breaks written from each sentence alone; may read all product code.
- Write boundary: no tracked-file edits; each break a unified diff `.runs/task-cycles/app-skeleton/breaks/<identifier>.patch` against HEAD, crafted in a throwaway detached worktree (loop2-break-scratch) removed afterwards; no commits; no npm install in the main worktree.
- Stage boundary: five patches exist, each passes `git apply --check` on HEAD.
- Invariants (version 1): the same five sentences as given to the check author (account-server-runtime, account-server-typecheck, account-server-express-http, browser-view-framework, loop2-api-error-route).
- A break: the smallest realistic change that makes the sentence false while the product otherwise builds and runs where possible; one patch per invariant, avoid breaking the other four; up to two distinct patches per invariant (`<identifier>-2.patch`).
- Report: reports/correction-1/break-author.md (change, clause it falsifies, build/run verification, apply check); reply ≤15 lines.
