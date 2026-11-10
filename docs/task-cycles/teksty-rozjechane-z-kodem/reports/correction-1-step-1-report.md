# Correction 1, step 1 report — the deploy skill allows the four version queries

**Status:** done
**Commit:** `f33f110` on `task/teksty-rozjechane-z-kodem` (range from head `e9bca2f`)
**Files changed:**
- `.claude/skills/loop2-deploy/SKILL.md`: +3 / -0
- `.agents/skills/loop2-deploy/SKILL.md`: +3 / -0 (byte-identical to the `.claude` copy)

## What changed

A new bullet in the "Allowed" list of the section "Agent or human", placed directly after the Slice 7 bullet and before "Allowed, the failure record":

- "Allowed, for a reading in an environment fact only: `stat --version`, `grep --version`, `docker --version` and `free --version`, each run alone with no pipe or other option. Each prints the tool's version, whose first line is what such a reading quotes; they expect no fixed value."

The prohibitions and all other bullets are unchanged; the diff has no deletions.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Copies identical | `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` | 0 | identical |
| Focused test | `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Diff check | `git diff --check` | 0 | clean |

The foundation check output is at `a scratch folder outside the repository`.

## Own-work check

- **Requirement:** exactly four read-only version commands are added; nothing else is added or widened; the prohibitions stay word for word; no server name, identifier, port or address; the copies stay byte-equal.
- **Check:** `git diff` shows only the three added lines in each copy; `cmp` and the focused test (which checks the copies' identity, no server name and no IPv6 literal) passed.
- **Showed:** all of the above hold. The new bullet names no server, identifier, port or address.

## Choices

- The bullet is its own bullet rather than a clause added to the Slice 7 bullet, so the version reads and the count and stat reads keep their own expected values.
- The bullet's lead, "for a reading in an environment fact only", carries the limit the handoff asks for in one clause.

## Unread material

- `.the-way/task-cycle/change/SKILL.md` was not re-read for this correction; I used the variant as the handoff gives it.
- `.claude/skills/loop2-deploy/SKILL.md` was not re-read whole in this step; I edited it from the Slice 7 read and the list's surrounding lines as they stood.

## Searches not found or unclear

- none

## Concerns

- Nothing blocking. The new commands expect no fixed value, so the readings of Slice 8 will quote their output word for word, as its handoff requires.
