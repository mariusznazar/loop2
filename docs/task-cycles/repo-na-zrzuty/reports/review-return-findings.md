# Findings of the review of the return step, for the fix

Reviewer's report: `.runs/task-cycles/repo-na-zrzuty/reports/review-return-report.md` (first line `FAIL 3a8b2b48d20bf6cb14704f023419ce4365506737`). Range reviewed: `95ecb61..3a8b2b4`. The text below is the reviewer's, cut from the report without change. This is the one blocking finding; the reviewer's two Minor findings of this review are not fixed and go to the request's list.

## Blocking finding

### Important

**1. D-359's rationale restates the fact `playwright-mcp-persistent-profile` without its qualification "By default" (WAY-263).** Place: `foundations/decisions.md:8047` (the line this commit edits), and the same wording in the skill, `.claude/skills/loop2-play/SKILL.md:210-212` (and its `.agents` copy).
- The fact (`foundations\environment_facts.md:712-716`) says: "By default Playwright MCP keeps a persistent browser profile for the workspace root of its client, a profile that only one browser instance can use at a time". Its source says the persistent profile is the default and names `--isolated` and `--user-data-dir` as the ways to run clients in parallel.
- D-359's rationale says: "Playwright MCP keeps one persistent profile for the workspace root of its client and one browser instance can use it at a time, so two sessions started from one directory block each other". "By default" is gone, so a client started with `--isolated` or its own `--user-data-dir` is described as blocking, which the source says it does not.
- Why it matters: the rationale is what a later reader checks the rule against when MCP's configuration changes. The restatement is wider than the fact, which WAY-263 grades Important. The earlier whole-change review (Important 2) fixed the same kind of drop on the sentence about the workspace root, but not this one. The return step's report says "no dependant says more than they do"; here the rationale does, so the step should have corrected it, as `return_step.md` asks ("corrects in the same change whatever no longer matches").
- Rule unharmed: the decision's binding sentence (start in the worktree) stays true with the qualification, so the repair is one clause. Evidence: the two quoted passages side by side (above); `grep -n "isolated" foundations/*.md` finds `--isolated` only in the source quotation of the fact (`environment_facts.md:716`), nowhere in D-359 or the skill.
- Repair: "By default Playwright MCP keeps one persistent profile…" in D-359, and the same in the skill's MCP part so the two stay together (the skill is the dependant the step compares).
