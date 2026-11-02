# Report of the fix — review of the return step, findings 1 and 2

**Status:** done

Range: reviewed head d07564a31b8e8193d64482f3ef7e1bff3cc8199a to e18c2ea.

| Commit | Message |
|---|---|
| e18c2ea | fix: :bug: tell a running local start by its certificate and test the listening addresses on the real server |

| File | Added | Removed |
|---|---|---|
| `scripts/local-start.mjs` | 74 | 24 |
| `tests/invariants/test_local_start_access.py` | 67 | 15 |
| `guidelines/testing.md` | 1 | 1 |

No foundation entry changed: D-254's sentence stands as it was. README and the skill stay as they were, since no sentence of theirs stopped being true.

## Finding 1: fixed

`test_both_ports_listen_on_this_computer_alone` moved from the class with the stand-in server to `LocalStart`, on a real start of `npm run local`, keeping its name and its line `# invariant: local-start-access`. The stand-in stays for the header case alone.

`guidelines/testing.md:172`: the case keeps its name, but the sentence "Za pośrednikiem stoi tam podstawiony serwer" no longer held for it, so it now says the stand-in stands behind the header case and the address case runs on the real server. The test file's docstring says the same.

**This alters an invariant's test.** Seen failing once, then passing, with one command, `npm test -- tests/invariants/test_local_start_access.py`:

| Code | Exit | Result |
|---|---|---|
| `src/server/main.ts:18` changed to `.listen(port)`, by an edit restored with `git checkout` | 1 | 1 failure of 13: `test_both_ports_listen_on_this_computer_alone`, `AssertionError: True is not false : 127.0.0.2:57064` |
| Restored, final code of e18c2ea | 0 | 13 tests, 98 s |

## Finding 2: fixed, by way (a)

A directory now counts as a running start only while its process number exists **and** its HTTPS port shows its own certificate. `npm run local:stop` no longer reports a failure for a directory that is no running start, and the next start removes that directory, so D-254 and To do 2 hold to the letter, with one remainder below.

### How it works

The reviewer proposed a port written into a file, with "accepts a connection" as the proof. I took a stronger form of that way, for three reasons named by your binding:

- **No file is read.** The directory's name is `<process number>-<HTTPS port>-<16 hex of the certificate's fingerprint>`. `mkdir` makes name and proof appear at one moment, so there is no gap in which a directory stands without its proof.
- **The proof cannot be taken over.** A port another program took after a hard kill accepts connections too. A TLS handshake shows a certificate only that running start holds; its key lives in that process's memory alone.
- **No new listening port.** The proof uses the existing proxy, so the sentence of `local-start-access`, which names two ports, stays true.

### The window between a directory appearing and its proof of life

`start()` now runs in this order: certificate, proxy listening, removal of ended starts, then `mkdir`. The proxy listens before the directory exists, so a directory never stands before its proof can be given.

A start can still be busy, its event loop held while the server loads: the kernel takes the connection and no TLS answer comes. So a port that takes the connection and stays silent for `PROOF_TIMEOUT_MS` (2 s) counts as **running**. Only a refused connection, a failed handshake, a closed connection or a certificate of another mark counts as ended. When in doubt, a start is kept.

### Trust boundary

The directory's name is untrusted: anyone able to write under `.runs/` can plant one.

| Value | What limits it |
|---|---|
| The whole name | `^(\d{1,10})-(\d{1,5})-([0-9a-f]{16})$`, and `entry.isDirectory()`, so a link is not followed. A name of any other form stays untouched. |
| The port | Range 1 to 65535, checked before use; 99999 and 0 are in the test. The host is the constant `127.0.0.1`, so a planted name reaches only this computer. |
| What goes to that port | A TLS greeting and nothing else. No data is sent and nothing it answers is used but the certificate's fingerprint. |
| `rejectUnauthorized: false` | Needed for a self-signed certificate. The fingerprint comparison stands in its place, and the connection carries nothing. |
| The removal | Still `join(startsDirectory, entry.name)` of a checked name. A planted name can only have its own directory removed, inside `.runs/local-start/`. |

The planted-file route is closed, since no file's content is read. The `stop` file is only written, into directories that passed the proof, and only tested for existence by the start itself.

### The cases added

`test_a_number_another_program_holds_keeps_no_directory_of_an_ended_start`: the number is the test's own process, alive and foreign. It plants three directories (a closed port, port 99999, port 0), and `npm run local:stop` must exit 0 with `stopped: 0`. The next start must remove all three. It then plants a fourth under a running start's real port with a wrong mark: stop must count 1, and the next start must remove it.

`test_a_start_on_its_way_up_is_not_taken_for_ended`: a stand-in server holds its whole process for 4 s with `Atomics.wait`. A second start runs in that window, and the first start's directory must stand afterwards.

The existing `test_the_game_stands_at_a_port_of_its_own_at_each_of_two_starts_side_by_side` passes unchanged.

### Seen failing

All with `npm test -- tests/invariants/test_local_start_access.py`:

| Code | Exit | Result |
|---|---|---|
| The old rule in the new code: `isRunning` asks only for the process number | 1 | 1 failure of 13: the new number case, ``AssertionError: `npm run local:stop` exited 1:`` with `The local start of process 13032 did not stop.` three times, which is the review's false failure |
| The literal old script, `git show d07564a:scripts/local-start.mjs` | 1 | 1 failure of 13: the same case, `AssertionError: 4 != 1 : the next start removes all three`. Its names do not match the old pattern, so this run shows the directories staying, not the false failure; the row above shows that. |
| A silent port taken for ended: `answer(false)` at the timer | 1 | 1 failure of 13: the way-up case, `AssertionError: '39340-49382-4ed35e2d5cb2133c' not found in ['33140-49390-9b3becd4332635bc']`. A live start's directory was removed, which is the mistake your binding names. |
| Restored, final code of e18c2ea | 0 | 13 tests, 98 s |

Each break was made in the working tree and restored from a byte copy. `git diff` before the commit shows none of them.

## Checks on the final code

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_local_start_access.py` | 0 | 13 tests |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests: ESLint, Ruff, ShellCheck, Prettier, audit |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

**Not run:** the full `npm test`, by your order.

## The path on a real start

`npm run local` on the fixed code, then, with the start running:

1. I planted `11732-<its real port>-abcdefabcdefabcd` and `11732-1-abcdefabcdefabcd`, 11732 being the running `explorer`, the review's own case.
2. `POST /api/accounts` through the proxy with `fix2@example.test`: `register 201`.
3. `npm run local:stop`: `Local starts stopped: 1`, exit 0. `explorer` was not touched, and `netstat` showed the port no longer listening.
4. `npm run local` again: `.runs/local-start/` then held one directory, `27844-51295-184906015ee08a14`. The two planted ones and the ended start's were gone.
5. `npm run local:stop`: `Local starts stopped: 1`, exit 0. Run again: `Local starts stopped: 0`, exit 0.

## Left behind

Nothing. No start runs, none of the ports listens, `.runs/local-start/` and the byte copy are removed, and `git status --short` prints nothing.

One of my shell commands hung: its wait loop was reading its own output file. I stopped it with `TaskStop` before it had started anything. The checks it held were run separately, and those are the results above.

## Remainder

**A directory can still stand for one reason.** After a hard kill, the old number must be taken by another process **and** the old port by a program that takes the connection and stays silent at a TLS greeting. Then the directory counts as running: it stays, and `npm run local:stop` waits 10 s and exits 1.

That needs two coincidences on one directory. A server that answers anything at all, even an error, ends the doubt. I left it because the other choice, reading silence as ended, removes the database of a live busy start, and the third row above shows that happening. No run showed the remainder; it follows from the code.

Mutations in the head with no test: `mkdir` moved before the proxy listens leaves a directory without proof for a moment, and that window is too short for a test to hold open. It stands in the comment at the head of the file, and order is what the review of this fix is set to test.

## Searches not found or unclear

None. `new X509Certificate(pair)` takes the text that holds both key and certificate: every run above used it and the marks matched.

## Reaches beyond the dispatch

None beyond the files the findings name.
