# Prompt — deliberate break author B2 (correction 2)

You are a fresh agent in the-way's autonomous task cycle for the loop2 application skeleton. The orchestrator (Claude Opus 5.5) runs the cycle under the task owner's delegation. Questions return to the orchestrator in your reply; never ask the human.

- Worktree: C:\Storage\repos\loop2-b2 (detached at 0b96e9e, yours alone). You may read all product code (src/, scripts/, package.json, tsconfig*.json, README.md, tests/*.mjs).
- Isolation (WAY-69: the break is written from the sentence alone): do NOT read, list or grep `tests/invariants/`, `.runs/` of any other worktree, or `C:\Storage\repos\loop2-c2`. You do not see the checks.
- Write boundary: inside loop2-b2 only. Craft each break in the working tree, verify it, save it as a unified diff against 0b96e9e in `C:\Storage\repos\loop2-b2\.runs\breaks\<identifier>.patch` (`.runs/` is git-ignored), then restore the working tree (`git checkout -- .` / `git clean` of what you added outside .runs) so that each patch is independent. No commits. `npm ci` in this worktree is allowed.
- Stage boundary: patches exist, each passes `git apply --check` on a clean 0b96e9e tree; return.

## Invariants (version 1)

1. **loop2-one-serving-process** — "One Express 5 process serves both the built game and `/api/` requests."
2. **application-build-output** — "Building the application compiles both the browser and the server TypeScript configurations."

## A break

The smallest realistic change a future developer could make that renders the sentence false, while the product otherwise still builds, starts and keeps its other behaviour where possible (a break that only crashes everything proves little). One patch per invariant; where the sentence can be falsified in two clearly different ways, a second patch `<identifier>-2.patch`. Avoid falsifying other rules of the product as a side effect (Node 24, TypeScript, Express 5 handling the API routes, no UI framework in the browser view, unmatched `/api/` gets an API error and not the HTML page) — note any you could not avoid.

For each break verify: `npm run build` and, where the break leaves a server, `npm start` plus a request to `/` and to `/api/x`; say what the sentence's falsity looks like when the product runs.

## Report

Full report: `C:\Storage\repos\loop2-b2\.runs\break-author-b2.md` (each change, the clause it falsifies, verification commands and results, apply check). Reply in at most 15 lines, questions first.

## Shared port

Another agent in a separate worktree may start the product on 127.0.0.1:3000 at the same time. If the port is occupied by a process you did not start, wait and retry (up to ~5 minutes) instead of treating it as a result; never kill a process you did not start. Stop every server you start as soon as its check is done.
