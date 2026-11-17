# Correction 1 report — task `drobne-poprawki-po-pr-92-94`

**Status:** `done`. Head at start `911bb057`; three commits. Only *Rationale* and *Verification* text changed; no binding sentence, no code, no test.

| Change | Commit | Check |
|---|---|---|
| O1: D-129 *Rationale* now "a mage sent then passes 480 game minutes of a map run of Las, the whole of the shortest one that solves it, unseen in half a real minute"; D-130 *Rationale* now "lets 480 game minutes of a map run of Las, the whole of the shortest one that solves it, pass unseen" (its arithmetic "At 1× the 480 game minutes of Las take 8 real minutes and at 16× 30 real seconds" kept) | `70850590` | `python -B .the-way/elements/common/foundation_check.py` → 0 errors |
| Same kind, same way, found by the search: D-21 *Rationale* ("each attempt at the 480 game minutes of Las takes eight real minutes" → "the 480 game minutes of Las, the whole of the shortest map run that solves it, take eight real minutes"; "passes the whole of Las unseen, its end included" → "passes 480 game minutes of Las unseen in half a real minute, the whole of the shortest map run that solves it") | `5263915e` | same → 0 errors |
| O2: D-355 *Verification*, `complies`: "with a `grep` of the file whose output is bounded, keeping the newest lines, through the `mikrus` MCP server" | `13d3f2d0` | same → 0 errors |

Quotations in tests: `git grep -n -E "decision: D-(129|130|355)" -- tests` hits quote binding sentences only (checked by `foundation_check.py`, 0 errors, which compares every `decision:` quotation); the D-21 quotations in `tests/sim/data.test.mjs` and `flow.test.mjs` are of its binding sentence. No test file was touched, so no test was run.

Items 1, 2 and 4 of the remarks: nothing changed, as the handoff says (D-153 and the fact `loop2-app-log-confirmation-mail-events` untouched; the log reading, the skill's allowed list and the unread guidelines untouched).

## Search result

Searched `foundations/`, `guidelines/`, `README.md`, `AGENTS.md`, `.claude`, `.agents`, `src` and `tests/*.mjs` for "480 game minutes", "480 minutes", "eight/8 real minutes", "whole of Las", "whole map run of Las", "half a real minute", "half minute", "30 real seconds", "30 seconds lets". Found, beyond D-129 and D-130: **D-21** (two sentences, corrected, above). Left as they are: D-207 (already corrected in the change), D-136 and the map decisions that give the streak of 480 game minutes as the solving condition, and the balance and simulation decisions that name 480 game minutes as a streak or a survival target (they do not name it as the length of every map run); 30-second-rhythm sentences of D-207, D-208 and the logout decision (a rhythm, not a map run). `src/browser/view/game-saver.ts:5` says "a check every 30 real seconds" (a rhythm). No other sentence takes 480 game minutes, or half a real minute at 16×, for the whole map run of Las.

## Own-work check

The requirement most likely missed: a sentence of the same kind left in the foundation. Check: the search above over the foundation and the text files of the product, with every hit read; a second grep for "whole of Las" and "whole map run of Las" after the commits finds no remaining use as the length of every run (`git grep -n -E "whole of Las|whole map run of Las" -- foundations` finds nothing in `foundations`). Not checked: wording of the same idea in other words (for example "a whole attempt at Las"); I read the hits of "attempt" near "Las" in D-21 only.

## Unread material

`reports/review-whole-report.md`: read only O1 and O2 and the lines around them. Decisions D-21, D-129, D-130, D-355 read at the changed paragraphs and their *Verification* (D-355 whole). The decisions SKILL.md was not re-read (read in the first stage; the change is wording in *Rationale* and *Verification* only).

## Searches not found or unclear

None.

## Working copies

`.runs/author-correction-1/` (one script) stood in the worktree; removed before return.
