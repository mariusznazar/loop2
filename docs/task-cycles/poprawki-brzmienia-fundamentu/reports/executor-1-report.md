# Report - executor of slice 1 (glossary and part map wording)

**Status:** done with concerns (one concern: the *Not* of `reading`, below)

**Commit:** `ce9cac004ea37f6c475c1528deac8ded39c16f64` on `task/poprawki-brzmienia-fundamentu`
(base `f66ae6eb34de0b68099caf1a19f4ff368b332372`).

**Check result:** `foundation_check.py --skip-test-citations` and the full `foundation_check.py`:
both `0 errors`, exit 0, no `listed:` line. Nothing else was run (no full gate, as the handoff says).

## Files changed

- `foundations\glossary.md` - 12 added, 6 removed
- `foundations\part_map.md` - 5 added, 5 removed

## Items

| Item | Result |
|---|---|
| To do 3.1 `test server` | made: "...and where player accounts are served." |
| To do 3.2 `chronicle` | made: "the record the page keeps of a manual map run for the player to read"; *Not* "which nothing keeps" |
| To do 3.3 `Understanding` | made: "creatures and character skill trees, each with all its branches (D-195), that the player has discovered" |
| To do 3.4 `combat turn` | made: "each side has at most one action, the character none when it finds no feasible combat rule (D-146), ending early when ..." |
| To do 3.5 | needs no edit (as the plan says); nothing changed in `copy`, `beaten attack`, `deployment` |
| To do 3.6 new `reading` | made, word for word from the task, placed after `loop clock` (before `secondary action`) |
| To do 7.14 (a) `at the camp` | made: *Not* no longer holds "the screen Siedziba — headquarters"; the remaining item reads "the picture band at the top of the headquarters with the characters drawn in it, of which it holds only the first that fit — `campDrawing`" (it said "that screen", which would have dangled; see choices) |
| To do 4.1 `deployment` | made: "builds the application into the loop2 container and the image of the Cloudflare tunnel in front of it, deploys ..." (`deploy/cloudflared.Dockerfile` is a `FROM cloudflare/cloudflared` image: checked) |
| To do 4.2 `simulation` | made, task wording: "..., from the game's data, and holds the game's data, the pictures of its scene and the words that name the game included." (`src/browser/sim/data/scene.ts` and `about.ts` exist) |
| To do 4.3 `build-tools` | made: *Trust boundary* `/package-lock.json` (the check reports a pattern matching no file as an error and found none) |
| To do 4.4 owner -> operator | made: "on the operator's computer" (build-tools), "telling the operator" twice (deployment). Remaining "owner" in `part_map.md`: the account-server entry (owner role, owner panel) and two test file names - untouched as the slice says |

## Own-work check

- Requirement most likely not met: "the entry `at the camp` no longer names the screen Siedziba in its *Not*". Check: `grep -n Siedziba foundations/glossary.md` gives only line 89, the definition of `headquarters`. Met.
- Second: the `/package-lock.json` pattern must match a tracked file. Shown by the full `foundation_check.py`, exit 0, `0 errors`.
- Code facts read to confirm the wordings: `src/browser/sim/types.ts:150-170` (`trees: SkillId[]`), `src/browser/sim/combat.ts:80-90` (`characterAction: null` when no rule), `src/browser/view/clock.ts` (`TICK_MS = 200`, "makes a reading").

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` - exit 0, `0 errors` (run after the glossary entries, again after the part map, and once more at the end)
- `python -B .the-way/elements/common/foundation_check.py` - exit 0, `0 errors`
- No test cites a `decision:` span of a sentence I changed; the check reported none (rule 4 did not come into play).

## Choices and concerns

1. **`reading` *Not* holds the term.** The task's *Not* is `a command's output that an environment fact's Source quotes — "reading:"`; the template (`elements/glossary/template.md`, "Form of an entry") says the carrier is "never one holding the term or its forms". The wording is the task's, which the human accepted (rule 2), and `foundation_check.py` does not flag it, so I wrote it as given. Cost if wrong: a rereading of the entry by the reviewer; the fix is a different carrier word chosen by the human. Reported rather than changed.
2. **`at the camp` second *Not* item.** Removing only the first item left "the picture band at the top of that screen", with no screen named. I replaced "that screen" by "the headquarters" (the term of its own entry, which is the screen in question) instead of "the screen Siedziba", so the entry does not name the screen as a meaning. Way rejected: leaving "that screen" (dangling). Cost if wrong: a one-word change. The band's new name ("the picture band") is already the wording of the entry, and the later change of D-389 and the code comments (7.14 b) is not this slice's.
3. **Combat turn sentence** keeps the task's text, so "each side has at most one action, the character none when it finds no feasible combat rule (D-146), ending early when ..." has a comma before "ending early" that could be read to attach to the character; the task's wording was kept.
4. **Placement of `reading`**: the glossary has no alphabetical order; I put it beside `loop clock` and `catch-up`, the time terms.

## Reaches beyond the handoff

None. (I read the whole `task.md` and `slice.md`, more than the ranges asked, as a convenience of one read; no other file beyond the handoff's *Read* except `the author's global rules file git.md`, required before a commit by the user's global instructions.)

## Unread material

- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48`: not opened; its text is copied word for word in the handoff, which I read.
- `.the-way/elements/glossary/examples.md` and `part-map/examples.md`: read; the entries they name (`invariant`, `foundation`, `decisions`, `repository`, `installation-command`) are in the-way's own `foundations/`, not opened - the form is also shown by this product's own entries.
- `foundations/decisions.md` D-339, D-195, D-146, D-389, D-367, D-10, D-354: read whole by the ranges given.
- `src/browser/sim/types.ts`, `src/browser/sim/combat.ts`, `src/browser/view/clock.ts`: read only the passages (lines 155-168, 80-90, 55-65); `deploy/cloudflared.Dockerfile`: first 20 lines (the file has 2); `src/browser/sim/data/about.ts`: only confirmed it exists, not read.

## Searches not found or unclear

- None unclear. One search printed the whole `reading:` lines of `environment_facts.md` into my context (the use that the *Not* of `reading` names); nothing else.

## Working copies

None made. `.runs/f1.txt` and `.runs/f2.txt` (output of the two check runs, directly under the worktree's `.runs/`) were removed.
