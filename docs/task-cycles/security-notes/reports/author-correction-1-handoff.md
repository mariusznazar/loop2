# Handoff to the one author, resumed — a correction for the human's remarks

You are the one author of task `security-notes`, resumed, for correction 1 of its open request (pull request 139). The human answered the request; the remarks bind. The person who requested the cycle has delegated every intermediate choice to the orchestrator.

- Variant of `make-change`: "a correction for the human's remarks" (`.the-way/task-cycle/change/SKILL.md`; read the part of it that this variant names).
- Remarks: `reports/correction-1-remarks.md` (under `.runs/task-cycles/security-notes/`) — the human's comment word for word; read it whole. It is Polish in its header line and English in its items.
- Worktree: the root you worked in; branch `task/security-notes`; head `420f4ed02ab3bf2739e325e26792b6a62cdbfc54` (the request's last head, whose tree is that of `09170e8b`; the two commits after `09170e8b` only added and removed the cycle's record). `origin/main` has not moved (`b88ef2b1`), so nothing was merged. The correction's range starts at `420f4ed0`.
- Working copies: `.runs/author/` (yours; remove it before you return and say so).
- Report: `.runs/task-cycles/security-notes/reports/author-correction-1-report.md`.

## What binds, item by item

- **Remark 1 — fix.** It answers the request's first item, the finding N1 of `reports/review-fix-report.md` (read its text of N1 whole). Change only the first point of the permissions part of `security-notes.md`, "Mode of work": put the process in brackets and say "the operator's own configuration, the operator being the person who owns this repository and runs its agents". The reviewer's wording of both sentences, to use as written unless a word of it breaks a fact or the limits below:
  - "Every agent session in this repository, including the task cycles of the-way (the process this repository pins for its foundation; see `AGENTS.md`), runs …" (the rest of that sentence as it stands, with the link to `AGENTS.md` kept as a link, as the other links of the file are written);
  - "The deny rules and the guard are part of the operator's own configuration — the operator being the person who owns this repository and runs its agents — which lies outside this repository, so no file here shows them."
  The operator is introduced in this point and nowhere before it; keep it so. Make no other change to the page: no new fact, no change of another point, of the trial or of the first sentence. Do not touch `README.md`.
- **Remark 2** (the sentence of the instruction file on CI against the rule of the branch): the human lets it through, with no task. It needs no change; touch neither the instruction file nor any decision.
- **Remarks 3–7**: accepted. On the fourth, the human states that the throwaway repository of the trial was on the owner's account, so the sentence in stage B ("the account of the repository's owner, the operator's own") stays as it is.

## Checks, commit and report

Run the hard edges of the first handoff again on the changed file (no token or host value, no company name, no absolute path on a disk, no link in double square brackets, no name of a private note, nothing about who merges, no quote of a planted instruction) and `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` (one test file; the full gate is the orchestrator's and you never run it). Commit on the task branch with explicit `git add <path>` and an English message in the style of the log. The report holds every check with its command and exit code, your own-work check, what you did for each remark, **Unread material** and **Searches not found or unclear** (each `none` where it is none), and the line on your working copies. Return the status, your commit, a one-line check result and the report's path.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
