PASS f9d0a327e940730f0b243de518a2d3ec97d2e2dd

# Review of the fix of correction 2, task kopia-bazy

Range `ea94d22..f9d0a32`, one commit, two files: `references/backup_and_restore.md` in both skill copies, byte-identical. "The reference" means the copy in `.claude/skills/loop2-deploy/`.

Both findings are fixed. Steps 4 to 8, walked in order in Windows PowerShell 5.1, ran from a real image build to a removal that ended with `False`. No blocking finding. Two Minor notes, and the first narrows part of R2's wording, which I state openly below.

## Each finding

| Finding | Result |
|---|---|
| R1 — step 8 does not remove the folder | **fixed** |
| R2 — the block of step 5 does not run after step 4 | **fixed**; one clause of its wording goes on as Minor M1 |

Neither was contested.

### R1 — fixed

`Set-Location ..` stands after the `icacls` line and before `Remove-Item`, with the reason and a line for `True`. Run as written from inside the private folder, with both keys given their rights back: `Remove-Item` passed, `Test-Path` printed `False`, the location was the parent, and `Remove-Variable secure, credential` left none.

A reader who gives `.` for the folder after `Set-Location ..` would aim at the parent folder. Tried in a scratch parent: PowerShell refused, and a sentinel file there stayed. So the new line does not open that danger.

### R2 — fixed

Step 4 now names the checkout by path and stays in the private folder. Run for real, not on stand-ins: `docker build --build-arg LOOP2_COMMIT=<sha> -t <image> <path>`, from the private folder, on the head's files extracted to a scratch folder, exit 0. `.dockerignore` and `Dockerfile` are found through that path. The location did not move.

Step 5's second block, from there, reached a verdict: `image revision: f9d0a327e940730f0b243de518a2d3ec97d2e2dd`, the sha given, which is what step 4 demands, then login status 401 and exit 1, as a scratch database and password should give.

**The clause that was not made.** R2 also said that steps 1 and 4 give no command for entering either place. Step 4 needs none now. Step 1 still reads "Make a private folder and work in it", and the bound answer did not touch it. I keep the fact and narrow its grade: it is not the defect R2 named, a block failing after step 4, and alone I would not block on it. See M1.

## New in the fix diff

Nothing Critical or Important. One Minor, M2. The change holds no agent instruction and no Mikrus host, and the fingerprint and the other steps are untouched.

## Minor

**M1 — Step 1 gives no command for entering the folder.** The reference, line 208. Every relative path of the procedure, `.\strych-key` and `.\accounts.sqlite`, rests on it. A reader who does not enter the folder gets a visible "cannot find" at the first block, before any data is at stake. One line closes it: `Set-Location <the private folder>`. `Set-Location` now also appears in step 8, so the reader meets it only at the end.

**M2 — The line for `True` does not reach its likeliest cause.** The reference, lines 263–275. The block shows one `icacls <key file>` line under "for both key files", where the finding spoke of two. Pasted as shown with one key named:

| Action | Result |
|---|---|
| The block, with one key's rights given back | `Test-Path` gives `True`; the folder holds only `backup-key` |
| The `True` line followed, removed again | still `True` |
| `icacls` of that key by its whole path, from outside, then removal | `False` |

The sentence above the block says both keys, and the error names the file, so a reader can get there; the plain database was gone in this case, though the `True` line says the folder still holds it. Two fixes, either enough: two `icacls` lines in the block, and in the `True` line, "give the key its rights back if the error says access is denied".

**M3 — Two lines lost their wrap.** The reference, lines 233–234 and 275, run far past the file's width. Polish only.

C1 of the last review, the zip's `age`, stays open as reported.

## Declined to judge

- Minor findings of earlier reviews: not in the findings, not fixed, not reopened.
- How the owner makes a "clean checkout": unchanged text, outside R1 and R2.
- An unquoted `<path of the clean checkout>` holding a space: the owner's paths hold none here; a quoting note would be polish.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `f9d0a327…`, the head given |
| `git diff --stat ea94d22..f9d0a32` | two files, the two skill copies |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0, 5 tests |
| Scratch walk, steps 4 to 8, Windows PowerShell 5.1, console 852, `-NoProfile`, with scratch keys, a scratch database and a scratch password | above |
| `docker build` of the head's files, from `git archive f9d0a32` | exit 0; label reads the sha |
| `node …\restore-trial.mjs` on that image through the block | exit 1, as expected; no container or volume left |
| Step 8 with one key, and with `.`, in scratch folders | tables and text above |
| Removal of my image `loop2-c2f-review` and the scratch folder; `git status --short` | done; empty |

**Not run:**

- `scp`, the fingerprint prompt and anything on the server or Strych: outside the boundary.
- `age`: not on this computer; a scratch SQLite file stood in for step 3's result.
- `Read-Host`: this tool has no console for a prompt, so a scratch value stood in. The block's split into two rests on H3.
- A real clean `git clone`: `git archive` of the head stood in, because a new worktree would touch the repository's records.
- The full `npm test`: the cycle's own run.

The walk used this computer's build cache, and the build added to it; I removed the image I tagged, not the cache.

## Reaches beyond the dispatch

None. `.the-way/task-cycle/review/fix.md` and `reports/correction-2-review-report.md`, for the findings, were read as the method gives.

## Searches not found or unclear

None.
