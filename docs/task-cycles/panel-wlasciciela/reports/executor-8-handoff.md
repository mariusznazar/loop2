# Handoff — executor of slice 8 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `861b6c9c` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: none
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-8/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-8-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `861b6c9c`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-280 | `foundations/decisions.md:7296-7365` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- **Checks beyond your slice's *Checks* (a finding of slice 1's review found the plan's list lacks them):** before each commit run `npx prettier --check <every .ts, .tsx, .mjs and .css file you changed>` and `npx eslint <every .ts, .tsx and .mjs file you changed>`; the gate's tests `test_prettier_source_format` and the ESLint test fail otherwise (`guidelines/coding.md`, rule *Formatter*). Format with `npx prettier --write <file>`, no option added, and check the diff changed only your lines. Give each command and exit code in the report.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).

## Notes for this slice

- Slices 1–7 are done (head `861b6c9c`). The classes of the screen are named in the header comment of `src/browser/view/accounts-screen.tsx` and listed with what each styles in `.runs/task-cycles/panel-wlasciciela/reports/executor-7-report.md`, section "Classes for slice 8"; read both. Roles come from the styleguide's rule "The list of accounts" (read the styleguide whole): blocked state in `warning`, address in `text-strong`, labels in `text-label`, the other values in `text`, the confirmation sentence in `warning`, the empty-list sentence in `text-secondary`.
- Decisions of the orchestrator (recorded): the line while the list is read (`accounts-loading`) takes `text-secondary`, like the empty-list line; `.screen.accounts-screen` joins the rule of the content width at `src/browser/styles.css:210-211`; the confirmation block `accounts-confirm` takes a rule beside `.program-reset-confirm` and in its manner (read it); the two senseless buttons of a row are disabled by the screen, so their look is the shared disabled look and needs no rule of yours. Rules for the link „Panel właściciela” in the open menu „Konto” stand beside the rules of the menu's other items under a class name you choose and **name in your report**, since slice 10 reads it from the stylesheet.
- This slice has no code to test beyond the checks the plan names: run them, and run prettier on `src/browser/styles.css` (`npx prettier --check src/browser/styles.css`; if prettier does not check CSS here, say so with the output); eslint does not apply. No screenshot is required of you.

## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 8 — The styles of the screen of accounts

- **Goal:** `src/browser/styles.css` has the rules of the classes that `src/browser/view/accounts-screen.tsx` (made by Slice 7; read it for the class names) and the link of Slice 10 use, in the existing roles and tokens only, with no colour, length, font name, stroke width, dash pattern, opacity or font weight written out (`src/browser/AGENTS.md`; the value is read through `var(--<name>)` from `src/browser/tokens.css`), a content width as the other screens have it, rows as the list of programs and the list of maps look, the destructive button's look from the existing rules of the shared button. No new token and no new role. The rule for the link „Panel właściciela” in the open menu „Konto” stands beside the rules of the menu's other items, under a class name this slice chooses, which Slice 10 reads from the stylesheet and uses.
- **Change:** `src/browser/styles.css`
- **Read:** `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/tokens.css` · `foundations/decisions.md:7278-7340` D-280 · the new decision on the screen of the list
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_design_token_sources.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py`
- **Depends on:** Slice 7

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
