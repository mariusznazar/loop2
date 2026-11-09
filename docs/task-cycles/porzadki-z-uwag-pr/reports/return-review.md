PASS dada2f2

# Review of the return step's commits, `60d4047..dada2f2`

Worktree `the root of the repository`, branch `task/porzadki-z-uwag-pr`. `git rev-parse HEAD` is `dada2f258cdbc3fce90bd1f161e28c3e69f9d5d8`; `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`. Diff computed myself: `git diff 60d4047..dada2f2` (two commits, `49b11e5` and `dada2f2`; `foundations/environment_facts.md` +18, `foundations/invariants.md` +1 -1). The agent's report was read as claims.

Counts: blocking 0, Minor 3, out of scope 0.

## Findings

### Blocking

None.

### Minor

1. **`docker-system-prune-volumes` holds a second fact, about images** (`foundations/environment_facts.md`, the sentence of the entry after `## docker-system-prune-volumes`, its clause "and its `--all` option removes all unused images, not just dangling ones"). The entry is named for volumes, and nothing that rests on it (the invariant `account-save-durable-storage`) depends on what `--all` does to images. The template says "two facts from one edition whose sentences are about different things stand as two entries" and WAY-76 says one entry has one reason to change; WAY-73 says a fact stands only while something names it, and nothing needs the images clause. The clause is not false (the source table says "Remove all unused images not just dangling ones", the passage is quoted and found), so the effect is small: a reader looking for the volume behaviour meets an unrelated clause, and a future change to the image behaviour would edit an entry the invariant names. Within the task (the clause was added deliberately in `dada2f2` because the skill text mentions `-a`). Suggested remedy for the human or a later foundation pass: drop the clause (the skill text keeps its own statement of it), not to split into an entry nothing names.
2. **`docker-volume-prune-scope`: "lists a named volume" is an inference from the name `my-named-vol`** (same file, the sentence of that entry). The quoted passage is the output block "Deleted Volumes: 07c7bdf3e34a... my-named-vol"; the page never says that volume is a named one, only that it is called `my-named-vol`. The reading is the obvious one and is the very contradiction the skill text warns about, but the template says the sentence "says no more than its source says". A form that stays inside the passage: "lists a volume called `my-named-vol` among those deleted". Not blocking because the fact is hedged ("The documentation ... says"), the passage is quoted whole beside it, and the reading is not in doubt.
3. **`docker-compose-down-volumes` does not mention the default network** (same file). The source's list of what is removed by default has a third item, "The default network, if one is used." (the agent did not quote it); the sentence says "the networks it defines". The sentence is not false and the omission does not touch volumes, which is all the dependant needs, so this is polish only. Leaving it keeps the sentence short; adding "and the default network" would make the list match the page.

## Answers to the handoff's questions

1. **Does each sentence say only what its passage says, and anything about an Engine version?** I fetched the three pages at the cited commits (`docker/compose` `9c60fe67df07...` `docs/reference/compose_down.md`; `docker/cli` `ce1223035ac3...` `volume_prune.md` and `system_prune.md`; no login, a generic client name, no personal data) and checked the 12 quoted passages in my own script (markup dropped, whitespace collapsed): 12 of 12 found, the text of the entries equal to the pages. Sentence by sentence: `docker-compose-down-volumes` follows "By default, the only things removed are:" with its three items, the `-v, --volumes` table cell, and "Networks and volumes defined as external are never removed." (Minor 3). `docker-volume-prune-scope` follows the Description, the Examples and the `--all` section (Minor 2). `docker-system-prune-volumes` follows the `--volumes` table cell, the Examples paragraph "By default, volumes aren't removed ..." and the `-a, --all` cell (Minor 1). No sentence names a Docker Engine version or edition; the edition appears only in the *Source* addresses (the commits behind the tags `v2.29.7` and `v27.3.1`), as the template and WAY-77 give, and the skill text carries the warning that the server's own version is recorded nowhere. Facts 1 and 3 state the behaviour of the commands as the pinned documentation gives it, which is the form the existing `docker-volume-lifecycle` also takes.
2. **Is each fact one the template allows, is the *Source* in the form, are the names in the naming of the others?** Yes: each is a statement about a tool outside the product, with an edition address (a frozen commit, not a branch), place, passages word for word joined by ` · `, and the date read; the three identifiers name the subject, not a value or an edition, like `docker-volume-lifecycle` and `docker-build-cache-invalidation`. The *Source* of `docker-volume-prune-scope` and `docker-system-prune-volumes` uses `§ <place>` for each passage as the form gives. `python -B .the-way/elements/common/foundation_check.py` ends `0 errors`, exit 0, on the head.
3. **Is the link in the *Rests on* of `account-save-durable-storage` right?** Defensible, not needed by the facts' rules alone. The invariant says "Replacing the application container preserves the SQLite database of player accounts and saved game states" and rested on `docker-volume-lifecycle`. WAY-73: *Rests on* names a fact when, "read otherwise, it would change whether some commit makes the sentence true". A commit that makes the deployment run `docker compose down -v`, `docker volume prune --all` or plain `docker volume prune` would break or not break the sentence depending on exactly these three facts, so they hold a condition under the wording of WAY-73, and a fact left with no dependant would otherwise have to go (the template: "A fact stands only while an invariant's *Rests on* or a decision's *Based on* names it"). No decision cites them (checked: `grep` for the three identifiers in `foundations/` finds only the new entries and this line), so the invariant is the only possible dependant. What weakens the link: `deploy/loop2-deploy:323` replaces the container by `compose up -d --no-build --no-deps --remove-orphans --force-recreate`, and the skill text itself says "None of these is part of any loop2 procedure"; the facts therefore guard against a commit that does not exist, and `--all` of `system prune` (images) is no condition of the sentence (Minor 1). I do not hold the link wrong. The change to `foundations/invariants.md` is the one line of *Rests on* (checked in the diff): the sentence, *Method* (`review`), *Derives from* (`D-17 · D-205`), *Part* and *Violated* are unchanged.
4. **D-253 and the skill row `backup_and_restore.md`.** I do not hold either choice wrong. D-253 (`foundations/decisions.md:5156-5168`) says the four named programs "already have a last-resort handling of their own" and writes "handler" only for the account-touching processes. `src/server/measure-passwords.ts:351` and `:377` hold top-level `catch` blocks, so the clause is true of the container program; the launcher `scripts/measure-passwords.mjs:318-329` catches only the argument parse and calls `measure(request)` bare, so for the launcher the clause is loose, but the same decision's earlier sentence ("A script ... that touches none of those data meets the rule on the last resort through the default print of Node.js") covers it. Rewording an approved decision's clause is a separate `the-way-record-decision` edit, not a mismatch the change made. On the skill row: `src/server/account-backup.ts:119-127` returns `exitDatabaseFailure` for a whole backup whose temporary directory could not be removed, and the exit table of `.claude/skills/loop2-deploy/references/backup_and_restore.md` (row 6) says "`docker` 1: ... or a failed backup" with Docker's own line before it; the sentence stays true, only less precise. The skill is no foundation entry, so the return step is right to leave it (outside the task and the foundation).

## Against the task, the foundation and the guidelines

- Task item 28 ("the skill lists as removing the account volume only those Docker commands that really remove it") is met by the skill text of the earlier commits; the return step's duty here (WAY-11) is the sources outside the product that the change rests on and the foundation does not hold. Three entries cover the three commands; the form is right apart from the Minors. No code written, no test altered.
- No decision or invariant was added or changed beyond the single *Rests on* line; no glossary term; no part-map change. I did not rerun the return step's comparison of D-352, D-353, D-354 and the rest with the code; it is outside the diff I was given and nothing in these two commits touches it.
- A changed invariant test: none (the only test mentioning the invariant is a comment at `tests/deploy/test_account_storage.py:21`, unchanged).
- Trust boundary: not touched by these commits. Irreversible operation: none.
- Reserved choice: none settled.

## Declined to judge

- The comparison of D-352/D-353/D-354 and other decisions with the code (the return step's main table): not in the diff of these commits; the whole-change review covers the code.
- Whether the three commands behave as the pinned documentation says on the Docker Engine of the test server: the version is recorded nowhere in the repository and I ran nothing on the server.
- The list of invariant tests altered by `00aa818..60d4047` that the report gives "for the request (WAY-03)": outside the range.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `dada2f258cdbc3fce90bd1f161e28c3e69f9d5d8`, matches the handoff |
| `git -C .the-way rev-parse HEAD` | `294af7fde45323ac1851c014a03071a97fc38d96`, matches |
| `git diff 60d4047..dada2f2`, `git log --oneline 60d4047..dada2f2` | exit 0; two commits, two files |
| `python -B .the-way/elements/common/foundation_check.py` (from the worktree root) | exit 0, `0 errors` |
| `curl -sSf -A "Mozilla/5.0"` of the three cited addresses at their commits | exit 0, all three open |
| `python -I chk.py` (my own script in `/tmp/rv`, outside the repository: the 12 quoted passages normalized against the fetched files) | 12 of 12 found, 0 bad |
| `grep` of the repository (without `.git`, `.the-way`, `.runs`, `node_modules`) for `compose down`, `volume prune`, `system prune`, `down -v`, `--volumes` | only the skill text in both copies, and `scripts/restore-trial.mjs:503` (`docker rm --force --volumes` of a trial container, unrelated); no procedure runs the three commands |
| `git status --short` after the review | clean, no tracked file touched |

Not run: `npm test` and the rest of the suite (the cycle's own run, per section 2 of the skill; the commits touch two foundation files only).

## Reaches beyond the handoff

- `.the-way/foundations/decisions.md` WAY-73, WAY-11, WAY-76, WAY-80, WAY-90 (what *Rests on* names, what the return step writes, how much one fact holds, what a source is): to judge the link and the form.
- `foundations/decisions.md:5156-5168` (D-253), `src/server/measure-passwords.ts`, `scripts/measure-passwords.mjs`: to answer question 4.
- `src/server/account-backup.ts:95-135`, `.claude/skills/loop2-deploy/references/backup_and_restore.md` (exit table): the same.
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md:295-320`, `.claude/skills/loop2-deploy/SKILL.md:135-145`, `deploy/loop2-deploy:309-327`: what the skill text says the facts support and which compose commands the deployment actually runs.
- `.the-way/elements/invariants/template.md` (the *Rests on* rule).

## Searches not found or unclear

- A decision that cites any of the three facts in *Based on*: not found (none exists), so the invariant is the only dependant.
- The Docker Engine version on the test server: not found anywhere in the repository (as the skill text and the agent's report say); so whether the facts hold on the server is unverified.
- The template's rule for the identifier of an environment fact is itself a pending `TODO` ("which decision sets how an environment fact's identifier is named"); I judged the three names by the naming of the existing facts only.
