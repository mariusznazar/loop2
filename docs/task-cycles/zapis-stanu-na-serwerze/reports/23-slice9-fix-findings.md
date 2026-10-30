# Findings to fix — Slice 9 review (`FAIL 59bf3da`), task `zapis-stanu-na-serwerze`

Copied word for word from `reports/22-slice9-review-report.md`, § Important. The review's Minor findings are not fixed (they go to the whole-change review).

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
