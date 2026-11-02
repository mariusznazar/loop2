FAIL e18c2eaad8a268225d0b1843077b65933d743c14

# Review of the fix of findings 1 and 2 — task `lokalny-start`

Range `d07564a31b8e8193d64482f3ef7e1bff3cc8199a..e18c2ea`, one commit, three files. `git rev-parse HEAD` in the worktree is e18c2eaad8a268225d0b1843077b65933d743c14, the head given. Bounded by `reports\findings-review-return.md` and `reports\fix-2.md`, as `task-cycle/review/fix.md` gives.

Blocking 1, Minor 1, out of scope 3 (the lines of *Declined to judge*).

The code of the fix is sound, and I found no way to lead a removal outside `.runs/local-start/` or to remove a live or starting start. What blocks is one sentence: D-254 still says more than any code can do, and the remedy is a clause, not a change of code.

## Findings of the findings file

### Finding 1: fixed

- **On the new head:** `test_both_ports_listen_on_this_computer_alone` runs on a real `npm run local` in `LocalStart`, with its line `# invariant: local-start-access` (`C:\Storage\repos\loop2-wt\lokalny-start\tests\invariants\test_local_start_access.py:264`–`:271`). This is a changed invariant test, and the report names it.
- **Measured by me:** with `src/server/main.ts:18` changed to `.listen(port)`, the case fails on its own assertion: `AssertionError: True is not false : 127.0.0.2:59075`, exit 1. At the head the file gives 13 tests, OK, twice.
- **The rest of the fix agrees:** the stand-in stays for the header case, where it is needed, and for the busy case. `guidelines/testing.md:172` and the file's docstring say so truly. `foundation_check.py` gives 0 errors.

### Finding 2: remains, in a much narrower form

**Fixed part.** A number another program holds no longer keeps a directory when the port is closed, or answers in any way but with the start's own certificate. `npm run local:stop` no longer reports a failure there. Measured below.

**What remains.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5146`–`:5147`; `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:16`–`:21`, `:216`; also `C:\Storage\repos\loop2-wt\lokalny-start\README.md:19` and `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\SKILL.md:32` with its copy under `.agents`, which repeat the sentence.
- **To paste:** The code is right to keep a directory whose port stays silent, but D-254 still says every ended start's database goes. Bring the sentence to what the code does, in one clause, as an edit proposed on the branch for the human's approval.
- **Why I report it:**
  - **What it protects:** that the foundation says what the command does; WAY-263 exists for exactly this.
  - **The mechanism:** `showsItsCertificate` answers `true` when a port takes the connection and stays silent for 2 s (`:216`). After a hard kill or a reboot, if another program holds the old number and another holds the old port and says nothing at a TLS greeting, an ended start counts as running.
  - **Measured at the head:** the report says no run showed this, so I ran it. A directory `<live number>-<port>-abcdefabcdefabcd` with a listener that accepts and says nothing stayed through two real starts, with its planted `accounts.sqlite`. `--stop` waited, printed `The local start of process 32748 did not stop.`, and exited 1 after 16.8 s, with two such directories. That is the symptom of the original finding on a narrower trigger.
  - **The code cannot close this:** silence does not tell a foreign program from a start with its event loop held. Reading silence as ended removes the database of a live start, the violation D-254's own *Verification* names, and the fix report's third mutation shows it. Any longer timeout only moves the same doubt. I agree with the author's choice, and I do not ask for different code.
  - **Why it still blocks:** "tried is not fixed", and `reports\fix-2.md:34` says "hold to the letter, with one remainder", which cannot both be true. WAY-263 grades failing to do what an entry requires, or standing without a qualification, as Important, and its *Verification* names grading it Minor as the violation. I held the same line against the return step: small harm did not change the grade, and sending it to the request's lists did not lift WAY-11. Rarity is not a different reason. Two coincidences on one throwaway directory make this as small as such a finding gets; the grade says the sentence must change, not that the case is dangerous.
  - **The clause, a proposal:** "each start of the command makes a database of its own and removes the databases of the starts it does not find running; a start whose port takes a connection and stays silent counts as running." The word "ended" stays in the *Rationale* as it is. This narrows To do 2, so by WAY-30 it stands on the branch as a proposed edit and goes to the human with the request, named there. By WAY-263, `README.md:19` and the two copies of the skill then need the same limit, a few words each.
  - **Also on this point:** the file's head comment at `scripts/local-start.mjs:20`–`:21` says a port another program took "proves nothing", while `:205`–`:206` says silence counts as running. One word there, "answering", closes it.
  - **If left as it is:** nothing breaks today. A directory stays, a `--stop` reports a false failure, no check runs on old data. The cost is a foundation sentence known to be false, which task 5 reads first, and the rule of this cycle bent once. If changed: one clause, up to three short repeated lines, one line in the request, no code and no test. The human can still refuse it and accept the sentence as it stands, which is theirs to say and not the cycle's.

## New findings in the fix diff

No Critical or Important finding.

## Minor, outside the fix diff

**A. `--stop` writes through a planted link, and stops at a planted directory.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:325`.
- **To paste:** Writing `stop` follows a link, so a planted directory that counts as running empties a file outside `.runs/local-start/`, and a `stop` that is a directory ends the command before later starts are told.
- **Why I report it:** the coordinator asked about the removal, and this is no removal, but `reports\fix-2.md:62` says `stop` is written only "into directories that passed the proof", and a silent port passes without proving anything.
  - **Measured at the head:** a directory with a live number and a silent port, its `stop` a file symlink to a file outside: the file went from `keep` to empty. With `stop` a directory, sorted before a live start: `EISDIR`, exit 1, and that live start stayed running until the planted one was gone.
  - **Why Minor:** it needs someone already writing under `.runs/` as the same user, who could empty the file directly. `.runs/` is ignored by git, so no clone carries it. The line is unchanged, and the fix narrows it: before, any live number was enough; now it also takes a silent port or a program holding its own certificate.
  - **If wanted:** check with `lstatSync` that an existing `stop` is a plain file, and catch per directory, so one bad directory does not stop the others. Not needed for this request.

## Crafted input at the boundary

All at e18c2ea, in a scratch worktree, on a real start. A listener's program ran in a process that stayed responsive; a first pass with a blocking call made every listener silent, so I threw that part away and ran it again.

| Crafted | Result |
|---|---|
| Live number, closed port (12 runs) | `stopped: 0`, exit 0, 62 to 84 ms. The refusal takes 0 to 4 ms here, so the 2 s timer is no race on this computer |
| Live number, port that closes at once; sends text; HTTP server; TLS with another certificate | removed by the next start |
| TLS program with no certificate (`openssl s_server -nocert`) | the client's handshake fails, ended, `stopped: 0`, no crash at `getPeerCertificate` |
| Live number, silent port; port that answers after 3 s | stays, finding 2 |
| A program holding its own certificate, its mark planted in the name | stays, and counts as running. It takes a key the planter holds, so it is no ended start of this command. First pass, kept: the classification came from the non-blocking start |
| Names with dead numbers: 0, 9999999999, 4294967297, port 0 and 65536 | fit the pattern, removed inside the directory; no throw at `process.kill` |
| Names outside the pattern: 11-digit number, 6-digit port, 15 or 17 hex, upper-case mark, a prefix, a suffix ` copy`, the old `<number>-<12 hex>`, a file with the form of a name | all stay untouched |
| A junction, and a directory symlink, with the form of a name, pointing outside | both stay, the target file stays |
| A directory to remove, holding a junction, and one holding a symlink, to a directory outside | removed; the file outside stays |
| Four starts at once, then a fifth | all up, five directories, `--stop` counts 5 in 290 ms, so each proof was a real handshake and not silence |
| A start busy for 4 s while a second comes up | kept, by the test `test_a_start_on_its_way_up_is_not_taken_for_ended` |

**Can a name or value lead the removal outside?** No. The pattern is anchored, JavaScript's `\d` and `$` take no Unicode digit and no trailing newline, the path is `join(startsDirectory, entry.name)` of a name read from that directory, and `isDirectory()` is false for links on Windows, as measured. The port goes only to the constant `127.0.0.1`, after the range check, and only a TLS greeting goes there.

**Can a live or starting start be removed?** Not by any path I found. The proxy listens before `mkdir` (`:296`, `:299`, `:305`), so a directory never stands without its proof. The check runs for each entry right before its removal, and a start's own directory does not exist yet at its own removal. A refused or failed handshake needs the proxy gone, which means the process is gone. The order is checked by reading and by the runs above. As the report says, no test would catch `mkdir` moved first, and the window is too short for one.

**Cost of a silent directory:** 2 s each, in turn, at a start and at each round of `--stop`, so N planted ones cost 2N s and no more. Not a finding.

## Where the fix changes earlier findings

- **Minor 3, 4 and 5 of `review-return.md`:** unchanged. The fix touches neither D-252, `openssl`'s weighing, nor `playwright-cli-context-options`.
- **Minor 2 of `review-whole.md`:** closed by this fix except for finding 2 above. Its `--stop` false failure now arises only in that case.
- **Minor 5 of `review-whole.md`:** unchanged. `SERVER_LINE.search(output).group(1)` still has no guard, now in `Start.wait`, and the moved listening case reaches it.
- **Minor 3 and 4 of `review-whole.md`, A to C of `review-fix-1.md`:** unchanged.

## Declined to judge

- `.runs/local-start` itself being a link: nothing in the command guards it, and no change here touches it. It takes the same write access as finding A. Not run.
- Directories of the old form `<number>-<12 hex>` now stay for good: they exist only in checkouts that ran this branch before e18c2ea, and nothing was merged. Outside the task.
- How often a real program stays silent at a TLS greeting: I did not greet this computer's real services to find out, since that touches programs outside this task. Finding 2 does not rest on the number.

## Checks run

| Command or method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`, `git status --short` in the reviewed worktree | 0 | the head given, clean |
| `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | 0 | 0 errors |
| `python -B -m unittest test_local_start_access`, scratch worktree of the head, twice | 0, 0 | 13 tests, OK, 95 s and 96 s |
| Mutation `.listen(port)`: `python -B -m unittest test_local_start_access.LocalStart.test_both_ports_listen_on_this_computer_alone` | 1 | failed at the assertion, finding 1 |
| Scratch script, closed port: timing and `--stop`, 12 runs each | 0 | as in the table |
| Scratch script, names, links, parallel starts, `stop` as a directory and a link | 0 | as in the table, finding A |
| Scratch script, programs on a port, without blocking them | 0 | as in the table, finding 2 |

**Not run:**

- The full `npm test`, the orchestrator's (WAY-160), so ESLint, Prettier, Ruff, ShellCheck, the audit and every other test stayed unchecked by me at this head. The author reports the quality tests exit 0.
- Any run on Linux or macOS: not available here. The moved case should catch the mutation there too, since it no longer rests on a platform's accident, but that is reasoned.
- The mutation with `mkdir` before the proxy listens: no test could show it, as the report says.

**Left behind:** nothing of mine. The scratch worktree is removed, its link to `node_modules` removed first and the real directory intact (235 entries). The one-off scripts and their outputs are deleted, no node process of the checks runs, and `git status --short` in the reviewed worktree prints nothing. The main checkout was not touched. The five `%TEMP%\loop2-invariant-*` directories are the same five as before.

## Reaches beyond the dispatch

- `guidelines/coding.md` whole: the rules a change of a script meets. No kind file applies.
- `foundations/decisions.md`, D-254: to compare the sentence.
- `README.md:19` and `.claude/skills/loop2-play/SKILL.md:32`: where the sentence is repeated.
- `.the-way/task-cycle/review/fix.md`: the method of this variant.

## Searches not found or unclear

- Whether a test should hold the order of proxy and `mkdir`: unclear how, as the report says.
- Whether the human accepts a clause in D-254 or the sentence as it stands: theirs, and not settled here.
