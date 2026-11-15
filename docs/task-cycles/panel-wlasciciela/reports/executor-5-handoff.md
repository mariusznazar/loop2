# Handoff — executor of slice 5 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `8be524ab` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: none
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-5/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-5-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `8be524ab`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-117 | `foundations/decisions.md:2425-2439` |
| D-400 | `foundations/decisions.md:10700-10716` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- **Checks beyond your slice's *Checks* (a finding of slice 1's review found the plan's list lacks them):** before each commit run `npx prettier --check <every .ts, .tsx, .mjs and .css file you changed>` and `npx eslint <every .ts, .tsx and .mjs file you changed>`; the gate's tests `test_prettier_source_format` and the ESLint test fail otherwise (`guidelines/coding.md`, rule *Formatter*). Format with `npx prettier --write <file>`, no option added, and check the diff changed only your lines. Give each command and exit code in the report.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).

## Notes for this slice

- Slices 1–4 are done and reviewed (head `8be524ab`). The server contract your client talks to is **written in the Goal of slice 4 in `.runs/task-cycles/panel-wlasciciela/plan.md` (section "Slice 4")** and realized in `src/server/owner-routes.ts` and `src/server/account-routes.ts` (the field `"role":"owner"` in the account answer; the five routes). Read those two server files to see what the real server answers; your client and its tests are the browser's side, and `tests/account-api.test.mjs` runs the client against a local server with the answers each case gives, as the file does today.
- The list's entries carry four fields (A1): `email`, `role`, `blocked`, `previousSaveAllowed`.
- This slice has no review of its own (its *Risk* is none); the review of the whole change judges it, so write the tests as if a reviewer will mutate the client (an answer with an unknown outcome word, an entry with an extra or a missing field, `role` of a value other than `player`/`owner`) and each must fail one.

## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 5 — The browser's client: role, list and four operations

- **Goal:** `src/browser/account-api.ts` and `tests/account-api.test.mjs` (the real local server with the answers the case gives, as the file does) hold, written first: `Account` has `role`, `"player"` or `"owner"`, read from the answer so that only the exact word `owner` makes an owner and an answer without `role` or with another value is a player's, never a refusal of the answer (the invariant `account-client-outcomes` stays true as written); the client has `listAccounts()` (`GET /api/owner/accounts`, success only for 200 and a body `{"accounts":[…]}` whose every entry holds exactly a non-empty string `email`, `role` `player` or `owner`, and the booleans `blocked` and `previousSaveAllowed`, anything else an unexpected answer) and four operations by an address, `blockAccount(email)`, `unblockAccount(email)`, `grantPreviousSave(email)` and `revokePreviousSave(email)` (the POST routes named in Slice 4, a body of the one field `email`, success only for 200 and a body whose `outcome` is one of the eight words of Slice 4, which the call returns). `refusalCodes` gets `owner-forbidden`, `owner-not-blockable` and `unknown-account`. The client keeps no state and reads no cookie or DOM. The existing assertions that compare a whole `Account` change for the field `role` where they must.
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `foundations/decisions.md:2417-2430` D-117 · `foundations/decisions.md:10672-10685` D-400 · `foundations/invariants.md:818-826` account-client-outcomes · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · the new decision on the screen of the list · the glossary term "owner"
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/account-api.test.mjs`
- **Depends on:** Slice 4 · the new decision on the screen of the list

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
