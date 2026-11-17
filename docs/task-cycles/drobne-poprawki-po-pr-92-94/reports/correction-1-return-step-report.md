# Return step report after correction 1 — task `drobne-poprawki-po-pr-92-94`

**Status:** `done`. Head `13d3f2d0`. **No commit: nothing no longer matches.** Check: `python -B .the-way/elements/common/foundation_check.py` → 0 errors (at the head; `git status --short` clean).

## Foundation compared with code and data

| Entry | Against | Result |
|---|---|---|
| D-21 *Rationale* | `balance.ts`: `gameMinutesPerRealSecond: 1`, `paces: [1, 2, 4, 8, 16]`; `maps.ts`: Las (`forest`) `solving: { streak: 480 }` | matches: 480 game minutes take 8 real minutes at 1× and 30 real seconds at 16×; 480 is the streak that solves Las, so "the whole of the shortest map run that solves it" is true, and a hidden tab's time counts at the clock (unchanged sentence) |
| D-129 *Rationale* | same data | matches (480 game minutes in half a real minute at 16×, the shortest solving run) |
| D-130 *Rationale* | same data | matches (arithmetic kept; "the whole of the shortest one that solves it") |
| D-355 *Verification* `complies` | `.claude/skills/loop2-deploy/SKILL.md` and `.agents/…` (equal): `grep -F -- '…' <files> \| tail -n 50`, `zgrep … \| tail -n 50`, a larger number where the first line printed is later than the failure sought | matches: bounded output keeping the newest lines |
| D-355 binding sentence ("…the file and its generations with a bounded `tail`, `grep` or `zgrep`…") | the same commands | **still true**: each read is bounded, by `tail -n 50` (or `tail -n 200`/`-n 100` where the skill lists them), the `grep` and `zgrep` through a pipe to `tail`; the *violates* example ("reads it whole with no bound") holds too. It quotes no limit on matches. |

Entries that link to them (found by *Relations* in the log): D-21 is derived from by D-129, D-130, D-122, D-250, D-283, D-284, D-324; D-130 by D-343; D-355 by D-360. D-129 is derived from by none. I searched D-122, D-250, D-283, D-284, D-324, D-343 and D-360 for "hidden tab", "480", "whole … Las", `-m 50`, "limits its matches" and "real minute": none holds such a sentence. D-360 (the restore's reading of the log) and step 8 of `references/backup_and_restore.md` already use `| tail -n` with the oldest file first, as the skill does.

## Written or changed

Decisions: none. Invariants: none. Environment facts: none. Glossary: none. Part map: none. Rows of *Settlements to record*: none new (the six rows went as `return-step-report.md` says; the correction wrote no row). Projected entries: none.

## Unread material

D-122, D-250, D-283, D-284, D-324, D-343 and D-360 were searched by words, not read whole; the changed passages of D-21, D-129, D-130 and D-355 were read at the head.

## Searches not found or unclear

None.

## Working copies

None made (`.runs/author-correction-1-return/` was not needed).
