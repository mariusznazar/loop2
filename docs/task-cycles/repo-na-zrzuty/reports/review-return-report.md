FAIL 3a8b2b48d20bf6cb14704f023419ce4365506737

# Review of the return step — repo-na-zrzuty

Range `95ecb61..3a8b2b4` (one commit). `git rev-parse HEAD` = `3a8b2b48d20bf6cb14704f023419ce4365506737`; worktree clean before and after. Read whole: the handoff, `.the-way/task-cycle/review/SKILL.md`, the frozen task, the return step's report, `.the-way/task-cycle/skill/return_step.md`, D-357, D-358, D-359, the four facts, both copies of the skill (`cmp` identical). Counts: 1 blocking (Important), 2 Minor, 0 out of scope.

## Changed files (`git diff --numstat 95ecb61..3a8b2b4`)

| File | + / - |
|---|---|
| `foundations/decisions.md` | +2 / -2 |

The two lines are the binding sentence of D-357 (line 8007) and the *Rationale* of D-359 (line 8047).

## Findings

### Important

**1. D-359's rationale restates the fact `playwright-mcp-persistent-profile` without its qualification "By default" (WAY-263).** Place: `foundations/decisions.md:8047` (the line this commit edits), and the same wording in the skill, `.claude/skills/loop2-play/SKILL.md:210-212` (and its `.agents` copy).
- The fact (`foundations\environment_facts.md:712-716`) says: "By default Playwright MCP keeps a persistent browser profile for the workspace root of its client, a profile that only one browser instance can use at a time". Its source says the persistent profile is the default and names `--isolated` and `--user-data-dir` as the ways to run clients in parallel.
- D-359's rationale says: "Playwright MCP keeps one persistent profile for the workspace root of its client and one browser instance can use it at a time, so two sessions started from one directory block each other". "By default" is gone, so a client started with `--isolated` or its own `--user-data-dir` is described as blocking, which the source says it does not.
- Why it matters: the rationale is what a later reader checks the rule against when MCP's configuration changes. The restatement is wider than the fact, which WAY-263 grades Important. The earlier whole-change review (Important 2) fixed the same kind of drop on the sentence about the workspace root, but not this one. The return step's report says "no dependant says more than they do"; here the rationale does, so the step should have corrected it, as `return_step.md` asks ("corrects in the same change whatever no longer matches").
- Rule unharmed: the decision's binding sentence (start in the worktree) stays true with the qualification, so the repair is one clause. Evidence: the two quoted passages side by side (above); `grep -n "isolated" foundations/*.md` finds `--isolated` only in the source quotation of the fact (`environment_facts.md:716`), nowhere in D-359 or the skill.
- Repair: "By default Playwright MCP keeps one persistent profile…" in D-359, and the same in the skill's MCP part so the two stay together (the skill is the dependant the step compares).

### Minor

**1. (within the task) D-357 now says "named as the directory of the cycle's own record", and "the cycle's own record" is not defined or used anywhere else in the product's foundation.** `foundations\decisions.md:8007`. The skill (`SKILL.md:164-166`) says it concretely: "the name of the cycle's directory under `.runs/task-cycles/`". The correction is true to the skill and says no more than it, and the term is the one the-way's process uses (`.the-way/task-cycle/skill/SKILL.md:135, 441`: the record directory `<task-slug>`, copied to `docs/task-cycles/<task-slug>/`). A reader of the foundation alone cannot tell what the "record" is. No sentence of D-357 reads wrongly for it today, so Minor (WAY-104 and the grade of glossary matters in section 3). A clause such as "the directory under `.runs/task-cycles/` that holds the cycle's record" would close it; or leave it to the request's list.

**2. (within the task, known) Minor 4 of the whole-change review still stands in the line this commit edits.** The clause "every worktree of loop2 is one [workspace]" in D-359's rationale (`foundations\decisions.md:8047`) rests on the tracked file `.playwright/cli.config.json` (`git ls-files .playwright` lists it) and the fact `playwright-cli-workspace-directory`; the commit changes the clause before it, not this one. Not re-raised as a new finding; for the request's list with Minors 5, A and B. The new wording "keeps the sessions of each workspace apart from those of every other" matches `playwright-cli-sessions-per-workspace` word for word in sense, so Minor A (the fact says more than the three lines it quotes) does not get worse.

## The two corrections against the skill and the facts

- **D-357 (naming of the directory and branch):** the skill says the directory is "named as your cycle (the name of the cycle's directory under `.runs/task-cycles/`)" and the branch `loop2/<cycle>`. The decision now says the directory is named as the directory of the cycle's own record and the branch `loop2/` plus the name of that directory. Same thing; the-way names the record directory `<task-slug>`. The decision no longer leaves the naming to the skill. Verification examples keep `<cycle>`, which now has a meaning in the decision. True, and says no more than it bears (Minor 1 above for the unexplained term).
- **D-359 rationale, CLI sentence:** "it keeps the sessions of each workspace apart from those of every other" now follows `playwright-cli-sessions-per-workspace` ("keeps the sessions of each workspace apart from those of every other workspace"); the old "default session" phrase is gone (`grep -rn "default session" foundations` finds nothing). A correct repair of the mismatch the fix review's split created. The MCP sentence before it is the one of Important 1.

## Whether the return step missed an entry

- Task rows 1 to 5: row 1 D-357, row 2 D-358, row 3 D-359, row 4 `playwright-mcp-persistent-profile`, row 5 `playwright-cli-workspace-directory` and `playwright-cli-sessions-per-workspace`. All present (checked in `decisions.md` and `environment_facts.md`); the return report's table agrees.
- Environment fact for a source outside the product that the foundation does not hold: the sources the entries cite are `screenshots-repository-visibility` and the Playwright ones; the PR #67 description is quoted in D-357's *Based on*. The step's reasoning for writing no fact on how GitHub renders `blob/<commit>/<path>?raw=true` (no page says it; the precedent is cited as an event) is sound; I found no further source the change rests on. D-358 says "Based on: none" while its rationale mentions the earlier request and D-12; D-358 was not touched by this range and passed two reviews, so I set it aside (Declined).
- Glossary term: "screenshot", "worktree", "task cycle", "request" collide with no entry; only the "record" of Minor 1 is new, and it is not a term WAY-95 gives an entry for here (no sentence misread).
- Choice that binds after the merge: the branch and the naming of the directory are in D-357; the commands stay in the skill. No other new binding choice found.
- Mismatch among the known Minors: Minor 4 (above, restated in the edited line); Minor 5 (part-map row) is outside this commit; Minor B (first `git switch` prints `fatal:`) is in the skill, untouched.

## Declined to judge

- Whether D-358 needs a *Based on* for the PR #67 practice its rationale mentions: not touched by this range, passed two reviews.
- Whether GitHub renders the commit-link form for the real repository: needs a push; out of scope, as in the earlier reviews.
- The hypothesis of D-359 (the client's workspace root is the session's starting directory): labelled a hypothesis in the entry, unchanged.
- Minors 5, A and B: known and left to the request's list by the handoff.

## Checks run

| Check | Command / method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | exit 0, `3a8b2b48d20bf6cb14704f023419ce4365506737` |
| Range and files | `git log --stat a401554..3a8b2b4`, `git diff 95ecb61..3a8b2b4`, `git diff --numstat 95ecb61..3a8b2b4` | exit 0; one commit, `foundations/decisions.md` +2/-2 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| Copies of the skill equal | `cmp .claude/skills/loop2-play/SKILL.md .agents/skills/loop2-play/SKILL.md` | exit 0 |
| Line endings | `git ls-files --eol foundations/decisions.md` | `i/lf w/lf` |
| Searches | `grep` of `default session`, `isolated`, `by default`, record wording in `foundations/` and `.the-way/` | as stated above |
| Not run | `npm test` (forbidden by the dispatch); the focused skill test (the return step's claim, exit 0 with 8 tests, is unverified by me; the commit does not touch the skill) | not run |

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/SKILL.md` lines 135 and 441 (found by `grep -rn task-cycles`): to see what the-way calls the record directory, for the judgment of "the cycle's own record" (Minor 1).
- `.runs/task-cycles/repo-na-zrzuty/reports/review-whole-report.md` (lines 56-75) and `review-fix-report.md`: allowed by the handoff, to see what Important 2, Minor 4, A and B said and that "By default" was not among them.
- `foundations/part_map.md` diff `a401554..3a8b2b4`: to confirm the screenshots row is outside this commit.

## Unread material

The decisions of the foundation other than D-357, D-358, D-359 were not read whole (D-254 and D-12 only by search hits for the title and the citation); the invariants, glossary and part map were not read whole, only searched for the words above (the earlier reviews read them whole and this commit changes no invariant, glossary or part-map text). `.the-way/elements/environment-facts/template.md` not re-read. The return step's report and both earlier reports were read whole.

## Searches not found or unclear

- A definition or use of "the cycle's own record" in the product's foundation: not found (Minor 1).
- Any mention of `--isolated` or the default status of the persistent profile in D-359 or the skill: not found (Important 1).
- Whether the focused skill test passes at this head: not run by me.
