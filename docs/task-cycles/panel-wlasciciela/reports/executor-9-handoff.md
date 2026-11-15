# Handoff — executor of slice 9 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `757f4a90` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: none
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-9/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-9-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `757f4a90`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-280 | `foundations/decisions.md:7296-7365` |
| D-281 | `foundations/decisions.md:7366-7411` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- **Checks beyond your slice's *Checks* (a finding of slice 1's review found the plan's list lacks them):** before each commit run `npx prettier --check <every .ts, .tsx, .mjs and .css file you changed>` and `npx eslint <every .ts, .tsx and .mjs file you changed>`; the gate's tests `test_prettier_source_format` and the ESLint test fail otherwise (`guidelines/coding.md`, rule *Formatter*). Format with `npx prettier --write <file>`, no option added, and check the diff changed only your lines. Give each command and exit code in the report.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).

## Notes for this slice

- Slices 1–8 are done (head `757f4a90`). The entry of the screen is `src/browser/view/accounts-entry.ts` (slice 7): read it and `src/browser/view/accounts-screen.tsx` from the worktree, and the end of the executor's report `.runs/task-cycles/panel-wlasciciela/reports/executor-7-report.md`.
- **Amendment A4 (orchestrator's, recorded): this slice's *Change* also includes `src/browser/view/accounts-entry.ts`.** Slice 7 typed the entry's kind with a cast, because `Screen["kind"]` had no `accounts` until this slice (`const KIND: string = "accounts"` and `kinds: [KIND as Screen["kind"]]`); once `Screen` has the kind `accounts`, replace that with `kinds: ["accounts"]` and drop the cast and the constant, changing nothing else of the file; the typecheck must stay clean and `npm test -- tests/view/accounts-screen.test.mjs` pass.
- **Plan step to repair:** the role the page gives `createGameView` does not exist yet (slice 10 gives it from `app.ts`): this slice makes `createGameView` take it as an option, as the plan's Goal says; every existing caller and test that builds the game view without the option must keep working, so the option defaults so that an account without the role is a player (the screen `accounts` then opens Siedziba). Make sure `tests/view` files that call `createGameView` (see the plan's Checks) stay green.
- Check D-408 (read it whole): it says a new screen adds "its position on the menu bar"; the list screen has none by D-280/D-281 (as the map-run screen has none). Report in your report, as a concern, whether D-408 or the tests it cites collide with the new screen; do not change D-408.

## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 9 — The address `#/konta` and the screen in the registry

- **Goal:** the address names the screen. `Screen` of `src/browser/view/screen-address.ts` has the kind `accounts`, `readScreenAddress("#/konta")` reads it, `screenAddress` writes it, `markedMenuItem` marks no item of the bar for it, and `resolveScreen` takes whether the account has the owner role (a parameter the callers in `game-view.ts` and `programs-entry.ts` give) and gives for the screen `accounts` Siedziba where it has not (D-281). `createGameView` in `game-view.ts` takes the role and the client methods of the screen as options, as it takes `previousSaveAllowed` and `onReset`, registers the entry of Slice 7 in the table of screens for every account, since the registry refuses a kind no entry holds, and passes the role to every `resolveScreen`; the entry builds only for a screen that `resolveScreen` leaves. Tests written first: in `tests/view/screen-address.test.mjs` the eighth address read, written and opened at a reload, a player's `#/konta` opening Siedziba, an owner's opening the screen, the bar marking no item; in `tests/view/screen-registry.test.mjs` the registry holding the new kind and refusing a table without it. The quotation lines `// decision: D-281 …` that are in these files stay valid.
- **Change:** `src/browser/view/screen-address.ts` · `src/browser/view/game-view.ts` · `src/browser/view/programs-entry.ts` · `tests/view/screen-address.test.mjs` · `tests/view/screen-registry.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · the file accounts-entry.ts made by Slice 7, read from the worktree · `foundations/decisions.md:7342-7382` D-281 · `foundations/decisions.md:7278-7340` D-280 · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · the new decision on the screen of the list
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/view/screen-address.test.mjs` · `npm test -- tests/view/screen-registry.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 7 · the foundation entries D-281 · D-280

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
