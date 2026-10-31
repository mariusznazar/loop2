PASS eb4ece0

# Review of the fix — whole change, kopia-bazy

Range `d8b1482..eb4ece0`, `git rev-parse HEAD` = `eb4ece0c89729b4092e40f2205bcf8b0347a8318`. Four findings fixed, none remains, none contested. No new blocking finding in the fix diff. Four Minor notes, one of them outside the fix diff's lines; 0 further out-of-scope lines.

## Findings

### I1 — fixed

`cleanup()` at `scripts/restore-trial.mjs:495-540` now counts a removal or listing that did not exit 0 as unknown, and only an attempt with every status 0 and none of the made names listed shows them gone.

- My own run from the first review, a shell `docker` on `PATH` in `node:24-slim` that fails every removal and listing, gave `PASS`, exit 0 at `d8b1482`. At `eb4ece0` it gives `not shown to be gone, check and remove by hand:` with all four names, `FAIL: a container or a volume could not be removed or shown to be gone`, `launcher exit 4`.
- The real daemon still gives PASS, 1, 130 and no leftovers: `tests/deploy/test_restore_trial.py`, so `docker rm --force` of the self-removed setup container does not make a false exit 4 on the owner's Docker, 29.7.2.
- The test holds it. Six mutants in a scratch export, each caught by `EndOfAPassingTrial`, with the control green: no listing check, no removal check, the app container not recorded, `unknown` not reset between attempts, one attempt, no exit 4.
- Step 6 of the skill's trial says what exit 4 means and to remove the named volume by hand.

### I2 — fixed

`backup_and_restore.md:212-215`, both copies: the commit is named as the one step 2 of "Installing and reinstalling" deployed, the command carries `--build-arg LOOP2_COMMIT=<sha>`, and "The launcher's report must read `image revision: <sha>`".

The sentence is true end to end: in a scratch export I added an assertion on `image revision: restore-trial-check` to the real run, whose build passes that argument. Exit 0, on a real image, with the launcher reading the label.

Naming "step 2 of Installing and reinstalling" rather than H5 is right: `H1-H5` in `setup_and_secrets.md` is another list, and H5.2 is that step.

### I3 — fixed

- `:31-32` now reads "exists on this host only inside the pipe (in the container it lies in `/tmp` for the seconds of the run, and a killed run can leave it there until the container is replaced)". That agrees with D-218, D-217 and the signal run of the first review. A search of the skill and `deploy/loop2-backup` finds no other form of the sentence.
- `:23` now reads "The key is a secret (D-13); the known-hosts file holds none", which agrees with `:117` and no longer cites D-13 for that file.
- `cmp` of both copies: identical.

### I4 — fixed

- D-217 now holds the fixed word, the refusal before the database opens, who runs the command, and D-137's *violates* line. A search finds it.
- `guidelines/testing.md:168` cites D-217 alone, which now holds both of the row's cases.
- `src/server/account-backup.ts:13-21` cites D-217 for the word only, and says what the code does: "also after a failure and after a reader that goes away; a signal that kills the process leaves it". That matches `:85-88` and the signal run.
- D-222 leaving the *Decision* field at `:149` is right: only that row brought it.

**The two points the handoff asks me to judge.**

- *"Opens only an existing database file".* It stands. It is spec decision 2's "it opens the existing file of `LOOP2_DATABASE_PATH` with `AccountDatabase`, never creating one", the code's `existingFile`, and the row's second case, which otherwise would have stayed uncited. It goes past the fix's handoff but not past the spec, and it says nothing the code does not do. A zero-byte file still opens and initializes, as declined in the first review; that file exists, so the clause stays true.
- *The merged sentences.* The meaning stands. "The script holds the lock … and releases it before sending, and each deployment compares … only warns when they differ, installing or reinstalling them being a human's change" drops no condition of the two sentences it joins. Settlement row 2 lives in the first sentence, which did not change. The template's limit is "1–3 binding sentences". The sentence is long but one reader can follow it.

The *Rejected* way, a refusal for a terminal, is spec decision 2's. *Origin* rightly stays as it was: the new reasoning stands in the entry, and `.runs` may not be cited there.

## What the fix itself broke

Nothing blocking. I walked `cleanup()` for what its new shape could lose: nothing made (`kinds` empty, exit 3 stands, `test_valid_input_without_docker…`); a command cut short (names recorded before it); an interruption during the setup container; a volume still in use (the retry); names held in both lists. An exit 4 replaces 1, 3 or 130 while the printed verdict stays FAIL, which the first version did too and the skill describes.

## Minor notes

1. **D-217's new *Rationale* says "Running the command changes nothing on the server".** Opening `AccountDatabase` prunes expired sessions and links, `src/server/database.ts:176-177`. In the fix diff. The server does the same every minute and no binding sentence rests on it, so nothing depends on the claim, but the return step can say "changes nothing a player can see".
2. **`backup_and_restore.md:39`, "never run it by hand", beside D-217's "run only by a human or the installed backup script".** Outside the fix's lines; the fix report names it. The skill narrows how and the entry says who, so neither does what the other forbids. It stays Minor.
3. **No test asserts the `image revision` line.** My assertion above passes, so nothing is wrong today; one line in the real run would hold I2's sentence.
4. **Choice 1 ties exit 4 to `docker rm --force` of an absent name exiting 0.** True on 29.7.2, which is the owner's. On an older client every run would end in a false exit 4, loudly, so the failure is safe.

The Minor and out-of-scope findings of the first review stand as graded there, apart from Minor 1's comment, now true, and the return step's list is unchanged: decisions 6 and 9, the two ways of D-222, D-217's 58 MiB, cron's rule on a dot.

## Declined to judge

- The known-hosts file on the skill's "Never" list, now that it holds no secret: stricter than needed, harmless, outside the fix diff.
- A hung daemon can take 3 attempts of four commands of 120 s: the same order as before the fix.

## Checks

| Command or method | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| `npm test -- tests/deploy/test_restore_trial.py` | exit 0, 19 tests, no skip |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0 |
| `npm test -- tests/account-backup.test.mjs` | exit 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | exit 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0 |
| The launcher with a shell `docker` whose cleanup fails, `node:24-slim` | exit 4, all four named, FAIL |
| Six mutants of `cleanup()` and `run()`, scratch export, `EndOfAPassingTrial` | each exit 1, control exit 0 |
| The real run with an added assertion on `image revision`, scratch export | exit 0 |
| `cmp` of the four skill files in both copies | identical |
| `git status --short`, `docker ps -a`, `docker volume ls` afterwards | clean, nothing left |

Could not run, or not run: the full `npm test` at this head, the orchestrator's. H5, H2, H3 and anything on the server or Strych: not allowed here. The PowerShell form of the trial was not repeated: the fix does not touch it. The scratch export is removed.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, the lines on binding sentences and *Origin*, to judge the two points above.
- `src/server/database.ts:163-196`, to judge the *Rationale*'s claim and the clause on an existing file.

## Searches not found or unclear

- Which Docker client releases exit non-zero on `rm --force` of an absent name: not read, only 29.7.2 is shown.
- The test's run took 43 s here, 28 s in the first review and 137 s for the author. It reports no skip; the spread follows the build cache, unverified.
