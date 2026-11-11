# Author fix report — repo-na-zrzuty (fix of the review of the whole change)

**Status:** done. Fix range `16f6b32..95ecb61` on `task/repo-na-zrzuty`. Nothing pushed; `mariusznazar/screenshots` not written to.

## Commits

| Commit | Content |
|---|---|
| `ca418f1` | foundation: D-357 names the branch; the fact `playwright-cli-workspace-sessions` split into two; D-359's *Based on* follows |
| `95ecb61` | skill `loop2-play`, both copies byte-identical (`cmp` same) |

Files: `foundations/decisions.md` (+5 / -5), `foundations/environment_facts.md` (+9 / -3), `.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md` (+15 / -10 each), all under `the repository's root`. Foundation entries written through `the-way-record-environment-fact` and `the-way-record-decision` (invoked again; I followed their methods, this time including `draft.md`).

## Each finding

**Important 1 — fixed.** Chosen way: a rule for the existing branch. After the clone, the skill runs `git switch loop2/<cycle> || git switch -c loop2/<cycle>`: the first form takes the branch from the repository when an earlier check pushed it (git makes the local branch tracking the remote one), the second makes it where none did. The skill says why (a new branch from `main` would be refused), that a cycle has several checks and the clone is deleted at the end of each, and that for a further screenshot of the same check the clone stays and only the first command is left out. Why this way and not the others: keeping the clone until the cycle ends needs a lifetime that no step of the cycle owns (the reviewer's check and a correction run in other sessions), and a branch name unique to each push puts a branch per screenshot in a shared repository and gives D-357 no single place for a cycle. D-357 stays true: one branch per cycle, a directory per cycle, a link to a commit. Evidence, in a scratch bare repository (`...\scratchpad\fix1`, HEAD set to a branch `base`, nothing pushed to GitHub):
- control, the old steps (`git switch -c loop2/cyc`, commit, `git push -q -u origin loop2/cyc`) from a fresh clone after the branch exists: push exit 1 (`! [rejected] ... (non-fast-forward)`, "use 'git pull' before pushing again") — the reviewer's finding reproduced.
- new steps, check 1, fresh clone: clone exit 0, `switch` exit 0 (made the branch), push exit 0.
- new steps, check 2 of the same cycle, fresh clone: clone exit 0, `switch` exit 0 ("set up to track 'origin/loop2/cyc'"), push exit 0.
- same clone, a further screenshot: `switch` exit 0, push exit 0.
- result on the remote: `git log` of `loop2/cyc` shows the three commits in order on one branch; `ls-tree` lists `loop2/cyc/a.png`, `b.png`, `c.png`.

**Important 2 — fixed.** Both places worded as the entries do: "Playwright MCP keeps one browser profile for the workspace root of its client, which is taken to be the directory the session started in" (fact `playwright-mcp-persistent-profile`, D-359's hypothesis kept visible by "taken to be"), and "with the owner's `gh` account, already signed in on this computer" (D-358).

**Minor 1 — fixed, by D-357.** D-357's binding sentence now says the screenshots lie "on a branch of that repository named `loop2/` and the name of the cycle, never on `main`"; its *Verification* complies example names the branch, its violates example adds "a push of a screenshot to `main` of that repository"; its *Rationale* says the files of a cycle lie on a branch of the cycle so that cycles pushing at once do not meet and no agent pushes to the default branch of a repository that serves several products. *Rejected* is unchanged: the branch is the cycle's own choice, and a way the writer derives never enters it (WAY-134). So D-357 now carries a part no row of the task gave: mark it `the cycle's` for the request's item 6 (the human did not see it at the task document). The decision D-358 is unchanged.

**Minor 2 — fixed.** The skill says: "On Playwright MCP, call `browser_take_screenshot` with the `filename` `.playwright-cli/<name>.png` in its place." Checked against the tool's own schema, which says "Relative file names are resolved against the workspace root" and, with no filename, the output directory.

**Minor 3 — fixed.** `playwright-cli-workspace-sessions` (never on `main`) is replaced in place by two entries of one fact each: `playwright-cli-workspace-directory` (the first directory with a `.playwright` directory among the directory of the call and the nine above it, else the root of the package — the limit of ten is now in the sentence) and `playwright-cli-sessions-per-workspace` (sessions of one workspace are apart from those of every other). The session name `default` is dropped: no entry rests on it. Passages checked against the file (`grep -c` of the three added passages in the installed-identical `registry.js` gave 3). D-359's *Based on* names `playwright-mcp-persistent-profile · playwright-cli-workspace-directory · playwright-cli-sessions-per-workspace`; no other entry named the old identifier.

**Minor 4 — contested as not fixable within the task** (the reviewer himself writes "nothing to fix now; a place to watch"). D-359's rationale rests on the tracked `.playwright/cli.config.json` making every worktree its own workspace. A rationale may name no file, no entry or test can carry the dependency without an invariant the task does not carry, and a fact cannot hold it (it is a state of this repository, not of the world). The new fact `playwright-cli-workspace-directory` now states the mechanism, so a reader sees what the rationale depends on. For the request's list of findings left unfixed.

## Checks (command -> exit code)

- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` -> 0 (8 tests OK; copies byte-identical, description 391 characters).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the entries -> `0 errors`; `python -B .the-way/elements/common/foundation_check.py` at the end -> `0 errors`, exit 0.
- Push steps in the scratch repository: see Important 1.
- `cmp .claude/skills/loop2-play/SKILL.md .agents/skills/loop2-play/SKILL.md` -> same.
- Not run: the full `npm test`; any push to the real repository (so a link to a commit on a non-default branch is still not tested against GitHub, as the first report says).

## Own-work check

Requirement most likely not met by the fix: that the steps work in every check of one cycle, not only the first — the very case the first check missed. Check: the three runs above with exit codes, plus the control that fails with the old steps. A second case I considered and tested: a second screenshot in the same clone (`switch` to the branch already current succeeds). A case I did not test: a clone that stands from an earlier check while another clone has pushed the same branch (no step of a cycle makes two clones of one cycle at once; not tested). Mutation in the head: a skill text without the `||` fallback would fail on the first check (no remote branch) — shown by the old steps' mirror image; no test exists for prose, as the testing guidelines give.

## Reaches beyond the dispatch

- `.the-way/elements/environment-facts/skill/draft.md` (read now; named by the method, missed the first time).
- The schema of the MCP tool `browser_take_screenshot` (through the tool search), to check Minor 2.
- `.runs/task-cycles/repo-na-zrzuty/reports/review-whole-findings.md` and `.the-way/task-cycle/change/fix.md`, as dispatched. `review-whole-report.md` was not read: the findings file holds the reviewer's words as the dispatch said.

## Unread material

- `review-whole-report.md` (the reviewer's full report): not read; the findings file was enough for every finding.
- From the first report, still unread: the `projected.md` files, `first_map.md`, the glossary and invariant element skills, most of the invariants file and the glossary entries, the examples of the elements (WAY-03 and the-way's own facts), and part of the long trust-boundary cells of `guidelines/testing.md` (see `author-report.md`).

## Searches not found or unclear

- A public text that tells what a client of Playwright MCP takes as its workspace root: still not found; the skill and the fact now say "taken to be".
- Whether GitHub serves `blob/<commit>/...?raw=true` for a commit that lies only on a non-default branch of the real repository: not testable without a push; a standard property of a repository's object store, unverified here.

## Choices

1. **Rule for the existing branch** (`switch ... || switch -c ...`) over a clone kept until the cycle ends and over a branch name per push; cost if wrong: the commands change, D-357 does not.
2. **The branch named in D-357, not D-358**, since D-357 answers where the screenshots lie; the cost is that D-357 now holds a part of the cycle's own making (marked `the cycle's` for the request).
3. **Two facts instead of one**, the session name left out; cost if wrong: an entry too many or one to add back.
4. **The old identifier `playwright-cli-workspace-sessions` removed with no withdrawn-identifier row**, because it never reached the main branch (`elements/common/rules.md`, "Withdrawn identifiers").

## Problems observed

None new. The pre-push hook of this computer still refuses `main` pushes (it was why the branch exists); my scratch repositories were seeded through a branch `base`, never through `main`, and no override was used.
