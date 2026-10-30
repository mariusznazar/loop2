FAIL 59bf3da3e848c2325b5f7d95331e0379567d84c1

# Slice 9 review — the deploy skill's text about saved game states

Range `11d1fb6..59bf3da` (one commit, `59bf3da`), `git rev-parse HEAD` = `59bf3da3e848c2325b5f7d95331e0379567d84c1`, the head the handoff gave. Pinned `.the-way` = `a8dfe8a`, as the gitlink records. Worktree clean.

Counts: blocking 3 (Important 3, Critical 0) · Minor 3 · out of scope 0.

## Critical

none

## Important

### I-1 — The schema-move sentence now tells the human that H1 leaves existing accounts with an unconfirmed address

Place: `.claude/skills/loop2-deploy/references/troubleshooting.md:113-116` (and its byte-equal copy in `.agents/`).

The slice changed this sentence from version 3 to version 4 and left its tail as it was:

> The first start on an older database moves it to version 4 in one transaction, keeping every account, session and saved game state; accounts that exist stay with an unconfirmed address, and a failure leaves the database as it was and stops the start (exit 8).

Before the change, the sentence described the move *to version 3*, where accounts really do come out unconfirmed: step 3 adds the column `email_confirmed_at`, empty for every account. Now the subject is the move *to version 4*. The test server stands at version 3 today, so the move it is about to make is H1, from 3 to 4. Step 4 (`src/server/database.ts:101-108`) only creates `saved_games` and leaves `email_confirmed_at` as it is. Read literally, the sentence says H1 makes every existing account unconfirmed. That is false, and it contradicts D-112 (`foundations/decisions.md:1984-1995`): "moves an existing older known version forward keeping every account, session, emailed link and saved game state **and their values**".

Why it matters: this is the passage the human reads to learn what the irreversible step does to the data. It misstates that step's effect on the accounts, and an agent asked about it would repeat the error. The fix is a few words, e.g. "accounts from a database before version 3 stay with an unconfirmed address" (the same sentence also drops emailed links, see m-2).

Evidence: `src/server/database.ts:84-95` (step 3 adds `email_confirmed_at`) against `:101-108` (step 4 adds only `saved_games`), and `:239` (only the steps after the stored version run).

### I-2 — § "Accounts, session keys and the database" of SKILL.md is unchanged, although the slice names it; the report claims it changed

Place: `.claude/skills/loop2-deploy/SKILL.md:116-130` (unchanged), and `SKILL.md:177-178` (where the new sentence actually went).

The slice's Goal names three places in SKILL.md: "its opening lines, § „Accounts, session keys and the database” and § „Rollback”". The diff changes the opening lines (`:9-10`), § Rollback (`:218-236`) and the bullet "The first delivery (H4)" at `:175-178`. That bullet belongs to § "Account mail" (`:132`), not to § "Accounts, session keys and the database" (`:116`). The executor's report says "Accounts section line 177", which is not true.

Inside the section that was left alone:
- `:124-127` "Database" says only that container replacement keeps the volume and that "a prune removes the accounts". A prune also removes every saved game state, and the bullet never says the volume holds them.
- `:128-130` "Deploying a request and accepting it" lists "deployment, persistence check, password measurement in the deployed image, public browser journey". It does not mention the new check that saved game states survive (H2).

Why it matters: WAY-139 (via task Context, `task.md:201`) asks that an agent asked about the database or a rollback not answer "only accounts and sessions". This section is the one an agent reads about what the volume holds and what losing it costs. The slice's requirement for this section is unmet, while the report says it is met.

Evidence: `git diff 11d1fb6..59bf3da -- .claude/skills/loop2-deploy/SKILL.md` has no hunk between lines 116 and 131, and `grep -n "^## " SKILL.md` puts line 177 under `## Account mail` (`:132`).

### I-3 — The H2 step can pass without testing anything, and it is the evidence that clears a violated invariant

Place: `.claude/skills/loop2-deploy/references/setup_and_secrets.md:334-336`.

> Saved game state: save the game, run step 3 again for the same commit (H2), reload and see the saved state back; this is the check that saved game states survive container replacement.

The game has no save action. It saves automatically after every change the player makes (task To do 7, `task.md:25`; a "Zapisz" button was rejected, `task.md:45`). Two things follow:
- "save the game" names an action the human cannot find.
- Nothing asks the human to make a change he can recognise before redeploying. In this same journey the account is created a few bullets earlier (`:327`), so it starts as a new game with an empty team. If nothing changed before step 3 runs again, then "see the saved state back" and "the server lost the save, here is a new game" look the same on screen.

Why it matters: To do 14 (`task.md:32`) removes the "violated" mark from `account-save-durable-storage` on the strength of exactly this check (H2). D-17 *Verification* (`foundations/decisions.md:349-372`) says checks that cannot tell saved states from their absence do not clear that invariant. As written, the step can produce a false pass of the very check meant to clear it.

Fix: tell the human to make a visible change first (e.g. create a character, or edit and keep a program), wait a moment for the automatic save, run step 3 again (H2), reload, and see that change back rather than an empty team.

## Minor

- m-1 — `setup_and_secrets.md:307` uses "H1" and `:334` uses "(H2)" for this task's two deployments. The same file's `:35-48` already uses H1–H5 for the tunnel transition, where H1 is creating the Cloudflare tunnel and H2 is the token. The new rule defines its H1 inline ("the first deployment of its branch (H1)"), so it can be read correctly, but an agent searching the file for "H1"/"H2" will find two meanings. The labels come from the plan's wording.
- m-2 — `troubleshooting.md:114` "keeping every account, session and saved game state" leaves out the emailed links that D-112 also keeps. This passage restates D-112 and is narrower than it.
- m-3 — `SKILL.md:177-178` "The first deployment of the commit with saved game states moves it on to version 4." sits in § "Account mail" under the bullet about the address-confirmation delivery (H4), where it has nothing to do with mail. It is harmless where it is, but it belongs in § Rollback (which already carries it, `:230-236`) or in the database bullet of I-2.

## What holds (checked, no finding)

- **Byte equality:** `cmp` of each of the three files and `diff -rq` of the two directories show no difference.
- **D-12 split:** § "Agent or human" is untouched. The new text gives every server action to the human ("The human does everything here (D-12)" kept at `setup_and_secrets.md:305`; "only the human repairs the database"; "the human who merges keeps it"). No agent is told to deploy, redeploy, repair or merge. The text only prepares H1; nothing in the range performs it.
- **No secret or server value:** the diff has no address, hostname, key, token or password. The test's IPv6 and Mikrus-name checks pass.
- **Schema facts against Slice 2 code:** current version 4 = `schemaSteps.length` (`database.ts:111`); step 4 adds `saved_games` (`:101-108`); a newer stored version is refused (`:231-235`). `main` (`dce2970`, the merge base) has three steps and no `saved_games`, so "`main` before this change knows only version 3" is true. Exit 8 is the health/probe failure (`SKILL.md:109`). There is no step back and no copy (D-112 *Rejected*). D-15's "a rollback restores code, never data" is reflected at `SKILL.md:218-221` and `troubleshooting.md:129-133`.
- **Merge window (D-11):** stated where the human meets it, before step 1 of "Deploying a request head and accepting it" (`setup_and_secrets.md:307-311`), and repeated in SKILL.md § Rollback (`:234-236`) and troubleshooting (`:120-125`). It includes review and corrections and names the human as its keeper, as the task's Human actions require.
- **Reload sentence:** `setup_and_secrets.md:329-330` matches D-96 and task questions 20/23: it lands on the manual map run, paused while it goes on, and on its end screen after it has ended.
- **"saved game states are not checked here"** is removed and replaced by a step (see I-3 for its content).

## Declined to judge

none

## Checks run

- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` (runs `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py`) → exit 0, 5 tests OK.
- Mutation in a scratch copy outside the reviewed worktree (`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\57822f85-5994-4aa0-ab30-2463555a5fde\scratchpad\mut9`): the test file and both skill copies were copied there, and `schema version 4` was changed to `schema version 3` in the `.agents` copy of `troubleshooting.md`. `python -B -m unittest tests/agent_workflow/test_loop2_deploy_skill.py` → OK before, `FAILED (failures=1)` after. The byte-equality test catches a drift between the copies.
- `cmp` / `diff -rq .claude/skills/loop2-deploy .agents/skills/loop2-deploy` → no difference (exit 0).
- Manual: read the diff and the surrounding sections of all three files against D-11, D-12, D-15, D-17, D-96, D-112, D-182, `account-save-durable-storage`, `account-schema-lifecycle`, and the glossary entries deployment, test server and human action.
- Not run: the whole gate (`npm test` with no argument). Excluded by the handoff; it is the cycle's own run. No test covers what the text says (only byte equality, frontmatter and server names), so I-1 to I-3 can only be caught by reading. No check exists for them and none was run.

## Reaches beyond the dispatch

- `src/server/database.ts:55-111, 223-242` — the schema steps and the version check, to verify the version claims (handoff step 4 asks for agreement with Slice 2's code).
- `git show main:src/server/database.ts` — to confirm that `main` knows only version 3.
- `task.md:19-32, 37, 41-46` (To do 1, 5-14; the acceptance criterion; question 1) — to learn how the game saves (automatically, no button), for I-3, and what To do 14 builds on H2.
- `.claude/skills/loop2-deploy/SKILL.md:98-130, 171-178` and `references/setup_and_secrets.md:25-48, 270-345`, `references/troubleshooting.md:93-140` — the surroundings of the hunks, to place them in their sections (I-2) and find the H1–H5 label clash (m-1).
- `scripts/test.py` via `package.json:15` — to make sure the focused command runs only the named file.

## Searches not found or unclear

- The executor's report puts the SKILL.md line 177 change in the "Accounts section". It is in § "Account mail" (I-2).
- No product text names a manual save action. The game saves automatically (task To do 7), so what "save the game" in the H2 step means is unclear (I-3).
