# Author fix report — the review of the return step

**Status:** done. Fix range `3a8b2b4..6e1a93a` on `task/repo-na-zrzuty`. Nothing pushed.

## Commits

| Commit | Content |
|---|---|
| `cc65061` | `foundations/decisions.md` (D-359 rationale), +1 / -1, written through `the-way-record-decision` |
| `6e1a93a` | skill `loop2-play`, MCP part, both copies (`.claude` and `.agents`), +2 / -2 each, byte-identical (`cmp` same) |

## The finding

**Important 1 — fixed as the reviewer names it, not contested.** The fact `playwright-mcp-persistent-profile` says "By default Playwright MCP keeps a persistent browser profile ...", and its source names `--isolated` and `--user-data-dir` as the ways to run clients in parallel. D-359's rationale and the skill's MCP part both dropped "By default". Now:
- D-359 rationale: "By default Playwright MCP keeps one persistent profile for the workspace root of its client and one browser instance can use it at a time, so two sessions started from one directory block each other ...".
- Skill: "Playwright MCP by default keeps one browser profile for the workspace root of its client, which is taken to be the directory the session started in, and a profile serves one browser at a time, so two sessions started from one directory block each other."
The binding sentence of D-359 is unchanged (the rule to start in the worktree stays true with the qualification). Evidence that the finding was right: `grep -n "isolated"` on `foundations/decisions.md` and the skill found nothing before and after; the two quoted passages differed as the reviewer says. I reread the other dependants of the fact for the same drop: the skill's sentence on the workspace root already carries "taken to be", and the fact's other citer, D-359 *Based on*, is a list of identifiers; no other sentence restates the fact.

The two Minor findings of the review of the return step were not touched.

## Checks (command -> exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0.
- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` -> exit 0 (8 tests OK; copies byte-identical, description still 391 characters, the frontmatter untouched).
- `cmp .claude/skills/loop2-play/SKILL.md .agents/skills/loop2-play/SKILL.md` -> same.
- Not run: the full `npm test`.

## Own-work check

Requirement most likely missed by the fix: that the qualification reaches every place that restates the fact, not just the two named. Check: `grep -n "persistent profile\|browser profile\|Playwright MCP keeps"` in `foundations/` and the skill — the fact, D-359's rationale and the skill's MCP part are the only restatements; all three now carry "by default" (the fact as its first words). The tests protect the equality of the copies, not the wording; the wording is prose, so a mutation (dropping the clause again) is caught only by a review.

## Unread material

- `review-return-report.md` (the reviewer's full report): not read; the findings file holds the finding in the reviewer's words, as the dispatch said, so the two Minor findings are unknown to me.
- `.the-way/task-cycle/change/SKILL.md` and `fix.md`: read in the earlier fix; not read again, as the variant is the same.

## Searches not found or unclear

none

## Choices

1. Two commits (the decision, then the skill) as in the earlier fix, so that the foundation entry and its dependant can be reverted separately. Cost if wrong: none.
2. In the skill the clause stands as "Playwright MCP by default keeps ..." (not "By default Playwright MCP keeps ...") to keep the sentence after "Use this way only from a session ..." readable; the meaning is the fact's.
