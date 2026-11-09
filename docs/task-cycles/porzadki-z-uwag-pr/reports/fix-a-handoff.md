# Handoff - the fix of a review's findings, part A (`make-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
A finding you hold wrong, you answer with evidence in the report instead of fixing it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- Head you start from: `c1b371d`. The fix's range runs from `c1b371d`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Class of model: same as the orchestrator's (the findings span the foundation step and Slice 4).

## Your stage and its boundary

- You make: **the fix of a review's findings**. Read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/fix.md` whole. The findings file is
  `.runs/task-cycles/porzadki-z-uwag-pr/reports/findings-fix-a.md` (the reviewer's words, from `reports/whole-change-review.md`); read it whole. It holds one blocking finding (I-1) and one Minor finding (m-1).
- Part B of the fix (tests, scripts, skill text) is made by another agent after you. Do not touch what part B's findings concern.
- You write: `foundations/decisions.md` (D-353 only), `guidelines/coding.md` (the *Decision* field of the rule "Recording a failure" only), and the comments of `src/server/database.ts` and `src/server/app.ts` named below. **No behaviour of the code changes: comments only.**
- Foundation entries are written only through the pinned project skills: read `the-way-record-decision` whole to change D-353 and `the-way-maintain-coding-guidelines` whole to change the guideline field; the skills select the reading they need.
- Do not run the product's gate. Run `python -B .the-way/elements/common/foundation_check.py` after each foundation change, and for the comments `npm run typecheck`, `npx prettier --check` and `npx eslint` on the two code files.
- Commit with explicit paths (never `git add -A`); messages in English in the form of the repository's earlier commits. Never return an uncommitted change.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/fix-a-report.md`.

## The orchestrator's choice for I-1 (autonomous, recorded in the cycle; the human decides at the request)

Take the way the reviewer recommends: rewrite D-353 through `the-way-record-decision` so that it says which write it means - **the session write that ends a response, refused because the account's block was committed while the request was in progress, as while a registration waits on its message** - and keeps the rest of D-353 as it is (a browser breaking off a body; any other reason stays a failure; Rationale and Rejected keep their sense; the *Verification* pair's wording follows the new sentence, including the *violates* line "a line of `failure` for the session write that a block refused", which must name the same write).
Then narrow the comments at `src/server/database.ts` (the comment of `BlockedSessionRefusal`, which now says "the one refusal of a session write that is no failure (D-353)") and at `src/server/app.ts` (the comment above the session callback, "A write that the account's block refused ... leaves no line (D-353)") so that each states D-353's qualification: the write that ends a response, not every session write; the first store in `establishSession` (`src/server/account-routes.ts`) is a different write, and it keeps its line and its 503.
Way rejected: also skipping the line for `BlockedSessionRefusal` in `establishSession` - it changes a route whose answer and line exist today, which To do 10 does not ask for. Do not change `account-routes.ts`.
Say in your report, in one sentence of English and one of Polish, what the rewritten D-353 now means, and that its meaning is broader than row 2 as the human accepted it (any request's end-of-response write, a login included) and narrower in one window (the first store of a registration keeps its line); the request will carry both for the human.

For m-1: the finding says the *Decision* field of the rule "Recording a failure" in `guidelines/coding.md` should not list the narrow decision D-354, which the new paragraph already cites in its body. Fix it as the coding-guidelines template says (`.the-way/product-guidelines/coding/template.md`, the place named in the finding); the paragraph keeps citing D-354.

## What to return

Status (`done`, `done with concerns`, `questions`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report path. The report holds what `make-change` section 6 and `fix.md` give: files changed with line counts, each check as command and exit code, the own-work check (the requirement you most likely fail - for example that D-353 and the two comments still disagree, or that a word of D-353 outside the changed sentence moved - the check, what it showed), reaches beyond the handoff, choices with the way rejected and the cost if wrong, an answer with evidence for any finding you hold wrong, and **Searches not found or unclear** (each thing looked for and not found, or unclear, or `none`).
