# Report of the correction — the human's remarks on request #50

**Status:** done

The remark, as made: „zmieńmy to zdanie, zmieńmy też D-254 i może jak i tak się zatrzymaliśmy to uwzględnijmy też uwagi minor”. How it was carried out: each row of *Items* below; the sentence is changed, and every Minor finding the handoff lists is fixed or settled, with no finding left unfixed.

Numbers below are those after the merge: this change's decisions stand at D-254 to D-258, and D-252 and D-253 are `main`'s. „Old” marks a number of 302ea89, as the review reports use it.

## Commits

| Commit | Message |
|---|---|
| 42ed270 | merge: :twisted_rightwards_arrows: merge main's rules on failures and logs and move this change's decisions to D-254 to D-258 |
| 5f403c9 | fix: :bug: write the local start's failures through the log line, refuse a planted stop file and bring the skill and README to what a start finds running |
| 0c8b97c | docs: :memo: limit D-256 to the starts a start finds running, reword D-254's rejected clause and record that Git for Windows comes with OpenSSL |

The handoff names the return step as the last commit. It found nothing to correct, so it made none: see *Return step*.

## Items

| Item | Result |
|---|---|
| Merge of `origin/main` at fe25b7d | Merged, no rebase. Conflicts in `foundations/decisions.md` and `foundations/environment_facts.md`; both sides kept, `main`'s entries first in each |
| Renumbering +2 | Done in one pass, so no number moved twice. Old D-252 to D-256 are D-254 to D-258, with their *Relations*, `foundations/invariants.md:1184` and the docstring of the test. `README.md`, `foundations/part_map.md`, `foundations/environment_facts.md`, the skill and `scripts/local-start.mjs` hold no such number. `main`'s D-252 and D-253 are untouched: `grep` of `guidelines/coding.md` and `src/server/log-line.ts` shows them unchanged, and `foundation_check.py` passes |
| `guidelines/testing.md`, one number with two meanings | Read line by line. Line 149 ended in `D-253 · D-256`, both this change's, and now reads `D-255 · D-258`. Line 168's `D-252` is `main`'s and stays |
| Compare with `main`'s D-252, D-253 and `guidelines/coding.md` | Done; see *Rules on failures and logs* |
| 1. D-254 (old), now D-256: the sentence | Changed to the reviewer's clause, word for word. „Ended” stays in the *Rationale* |
| 1. `README.md:19`, the skill near `:32`, both copies | Brought to the same limit |
| 1. Comment at `scripts/local-start.mjs:20`–`:21` | Closed: a port taken over "and answers on" proves nothing, and silence proves nothing either way |
| `review-whole.md` finding 2 | Closed by these three rows |
| `review-whole.md` finding 3 | Fixed in `README.md:19` and the skill, both copies: two starts stay apart in two browsers or sessions, and in one they share the session cookie |
| `review-whole.md` finding 5 | Fixed: `Start.wait` closes the process and names the line it expected. Seen on the mutation, below |
| `review-fix-1.md` finding A | Fixed in both copies. A file that cannot be read ends on the runtime's print, which names the cause. New case |
| `review-fix-1.md` finding B | Fixed: one sentence in the skill, both copies, that the viewport stays on that tab |
| `review-fix-1.md` finding C | Fixed as far as it can be: a case checks that the lines from `const frames = [];` to `screencast.stop()` of `frames.js` stand word for word in the skill. **What stays apart:** MCP sets a viewport first and keeps the frames in the page, and the CLI returns them. So `setViewportSize` in the skill is still guarded by no test |
| `review-return.md` finding 5 | Fixed: `"browser?: {"` added to the passages of `playwright-cli-context-options`, from line 428 of the source at its fixed commit |
| `review-fix-2.md` finding A | Fixed: `stop` is made with `wx`, so a link or a directory under that name is refused and nothing is written through it. One bad directory no longer keeps the others from being told. Two new cases, not citing `local-start-access`, whose sentence says nothing of stopping |
| `review-return.md` finding 3 | Done through the decision's own wording: the clause of D-254 (old D-252) *Rejected* reads, word for word, "more tokens and a command sent at each tab where the CLI reads one file of the repository". **Nothing else of it changed. The definition in the vault keeps its text, and the request has to say so** |
| `review-return.md` finding 4 | Fact written: `git-for-windows-openssl`, named in D-258's *Based on*. See below |
| `review-whole.md` finding 4 | Left as ordered |

### The `openssl` fact (`review-return.md` finding 4)

- **Found and written:** Git for Windows' own release notes at a fixed commit, § Changes since Git for Windows v2.56.0 (September 28th 2026), New Features: "Comes with OpenSSL v3.5.9." D-258's "needs no new program" rests on that on Windows.
- **Found and not written:** a fact that `openssl` writes the key to standard output. `doc/man1/openssl-req.pod.in` at tag openssl-3.5.0 says "If a new key is generated and no filename is specified the key is written to standard output", but the code gives `-keyout -` on purpose, since a `default_keyfile` of a configuration would otherwise take over. I found no passage saying what `-` means: `openssl-req.pod.in` and `openssl.pod`, by `grep` for "standard output" and "stdout". Nothing of D-258's binding part rests on it. It stands in the code's comment.

## Rules on failures and logs

Read whole: `guidelines/coding.md`, `main`'s D-252 and D-253, `src/server/log-line.ts`, `src/server/main.ts`, `src/server/configuration.ts`'s `StartupFailure`.

**What the server does to a start in the same process.** `installLastResort("main")` runs at the import, so from then on this process has the last-resort handler D-253 asks of the server. Before the import it touches no account data, and the runtime's print meets the rule. The wait on `process.exitCode` still works: `main.ts` still sets it on every failure of a start. `Loop: http://…` is unchanged and plain, so `SERVER_LINE` holds. Account events now stand in the start's output as JSON lines; nothing in the test reads them.

**Brought to the rules in `scripts/local-start.mjs`:**

| Rule | Before | Now |
|---|---|---|
| Secrets and personal data: never `message` or `stack` | `console.error(... error.message)` | Only a sentence of the code's own stands in the line; any other error gives its kind and code |
| Recording a failure: through `writeFailure`, with the cause | Plain text; `catch {}` on a removal dropped its cause | `writeFailure` and `ReasonedFailure` of `dist/server/log-line.js`, by a dynamic import. The script keeps one writer and needs `dist` only when something fails |
| Recording a failure: once | A server that failed wrote its line and the start wrote a second | The start exits with the server's code and adds none. A case counts one line |
| Hiding a failure | A proxy error became a bare 502 with no line | One line, `"failure":"local-proxy"`, with kind and code. A browser that left is no failure and writes none |

A new line of `npm run local:stop`, `START_STILL_RUNNING`, replaces the plain sentence and names the directory.

**Lines left plain, each by a rule:** `Local game: …` and `Local starts stopped: …` are announcements like the readiness line D-252's *Verification* lets stand. `USAGE` is a refusal, not a failure.

**One way the rules leave open, named as the handoff asks: `save-frames.mjs`.** It writes two failures as plain text („No frames came”, „The input is no JSON of frames”). D-252 says a log line of loop2's Node.js code is JSON and its *Scope* holds `agent-workflow`. I left them plain: the file is a skill's helper, which cannot count on `dist`, and it speaks to the agent that ran it. `scripts/kitchen-sink.mjs` and `scripts/restore-trial.mjs` print plain text the same way and #51 left them so. Its unreadable file meets D-253 through the runtime's print. Cost if wrong: two lines to change.

**Also left:** a start tests only that `stop` exists, by `existsSync`, so a planted directory under that name ends it. That needs someone already writing under `.runs/` as the same user, and it only stops a throwaway start.

## Checks

On head 0c8b97c, code unchanged since these runs but for the entries:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_local_start_access.py` | 0 | 16 tests, 147 s, the link case ran and was not skipped |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 8 tests |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests: ESLint, Ruff, ShellCheck, Prettier, audit |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors, after the merge and on the head |

**Seen failing,** each with the same `npm test` command, each break made in the working tree and restored from a byte copy:

| Break | Exit | Result |
|---|---|---|
| `local-start.mjs`: `stop` written with no `wx`, the telling loop back to stopping at one error, no line for a proxy error, no exit after the server's own line | 1 | 16 tests, 3 failures, 1 error: `test_stop_writes_through_no_planted_link`, `'' != 'kept'`; `test_a_planted_directory_keeps_stop_from_telling_no_other_start`, `'START_STILL_RUNNING' not found`, the command having ended on the `stop` directory; `test_a_server_that_cannot_start_ends_the_start_with_no_address`, `2 != 1 : the server's own line, and no second`; `test_a_request_the_server_drops_...`, an error from a generator with no line. I then changed that case to fail at its assertion instead, and did not rerun this break |
| Finding 5: `LOOP2_LISTEN_HOST: "0.0.0.0"` | 1 | 14 tests, 13 × ``AssertionError: no line `Loop: http://127.0.0.1:<port>` before the address``. The set of `node` process numbers was the same before and after the run, so no start stayed behind |
| Finding A of `review-fix-1.md`: `save-frames.mjs` of the commit before | 1 | 8 tests, 2 failures: the new case, `b'ENOENT' not found in b'No frames came: ...'`, and the byte-identity case, as only one copy held the old file |

**Real start:** `npm run local`, `POST /api/accounts` through the proxy gave 201 with `"confirmationMessage":"failed"`, the output held the line `{"failure":"mail",…,"code":"ESOCKET",…}` the skill now names, `npm run local:stop` printed `Local starts stopped: 1` and exited 0, and the port stopped listening.

**Not run:** the full `npm test`, by the handoff; the path of the first acceptance criterion in a browser, since no screen changed. The twin case's own failure was not seen: it was written to pass on the text as it stands.

**Left behind:** nothing. No start runs, `.runs/local-start/` and the byte copies are removed, and `git status --short` prints nothing. Nothing was pushed, and the main checkout and the vault were not touched.

## Return step

Compared at 0c8b97c.

- **Foundation compared with code:**

| Entry | Compared with | Result |
|---|---|---|
| D-254 | Skill, `.playwright/cli.config.json`, its five facts | Matches |
| D-255 | `scripts/local-start.mjs`, `package.json`, skill | Matches |
| D-256 | `isRunning`, `showsItsCertificate`, `removeEndedStarts` | Matches: the sentence now says what the code does |
| D-257 | `unanswered`; no change of this cycle in `src/server/**`, the merge's changes being `main`'s | Matches |
| D-258 | `makeCertificate`, `findOpenssl`, `git-for-windows-openssl` | Matches |
| D-234, D-110 | Auto-merged lines, against `Dockerfile`, `configuration.ts` and the invariant | Match |
| `main`'s D-252, D-253 | The script, after this correction | Matches, with the way named above. D-253's list names no local start: this process is the server once imported, and touches no account data before |
| `local-start-access` | Script, `src/server/main.ts:18`, both citing cases | Matches; its test now reaches the real server |
| The six facts of this change | Their sources at fixed commits | Match |
| `guidelines/testing.md` row and lists; part map of `build-tools` and `agent-workflow` | Test file, script, `.gitignore`, skill | Match. `build-tools` may depend on `account-server`, which the new import of `log-line.js` needs |

  Nothing else no longer matched, so nothing was corrected.

- **Decisions written or changed:** in this correction D-256 (binding sentence, the human's remark), D-254 (*Rejected*, the human's remark), D-258 (*Based on*). Over the cycle: D-254 to D-258 written; D-234 (*Rejected*), D-110 (*Verification*) changed.
- **Invariants written or changed:** `local-start-access`, set by row 4 of *Settlements to record*; in this correction its *Derives from* follows the renumbering, to D-255 · D-110.
- **Environment facts:** in this correction `git-for-windows-openssl`, and `playwright-cli-context-options` gained a passage. Over the cycle also `playwright-cli-token-use`, `playwright-cli-config-path`, `playwright-screencast-frames`, `chrome-devtools-ignore-certificate-errors`.
- **Glossary terms:** none.
- **Part-map changes:** none in this correction. Over the cycle `build-tools` and `agent-workflow`.
- **Projected entries written whole or in part:** whole, D-254, with the clause of *Rejected* the human changed; in part, D-255.
- **Rows of *Settlements to record* written:** 1 D-256; 2 D-257; 3 D-258; 4 `local-start-access`.

A choice binding after the merge: none new. Failure lines of this script follow `main`'s D-252; the rest stays rows of the questions table.

## For the request

- D-256's sentence changed by the human's remark; To do 2 reads wider than the sentence now does.
- D-254's *Rejected* departs from the definition in the vault in one clause, and the definition keeps its text.
- `review-whole.md` finding 4 stands quoted in the request, as ordered.
- Invariant tests altered: `tests/invariants/test_local_start_access.py`.

## Reaches beyond the dispatch

- `src/server/account-mail.ts`: the line the skill names.
- `https://raw.githubusercontent.com/git-for-windows/build-extra/2f63027cca82e0bd0d6aa9d79d52f5a0d7dea8cc/ReleaseNotes.md` and `doc/man1/openssl-req.pod.in`, `doc/man1/openssl.pod` at tag openssl-3.5.0: finding 4.

## Searches not found or unclear

- A published passage saying what `-keyout -` means: not found, as above.
- Whether a Node.js script of `scripts/` or a skill falls under „a log line of its Node.js code”: unclear. #51 changed no file of `scripts/`. I read it as binding this script, which holds the server, and named the other case above.

## Note of 2026-11-02, after the review of the correction

Three claims above were wrong as written. The rows stand as they were; these sentences correct them.

- **The row of D-256 under *Return step*:** "Matches: the sentence now says what the code does" did not hold. The sentence said a start whose port stays silent counts as running, while the code counts it so only while its process number is in use, and removes the directory otherwise. I compared the clause with `showsItsCertificate` and not with `isRunning`, which holds the condition. `reports/fix-3.md` corrects the clause; the code did not change.
- **The line *Decisions written or changed*:** "D-254 (*Rejected*, the human's remark)" credits the human with those words. They are the orchestrator's; the human took the finding in.
- **The line *Projected entries written whole or in part*:** "the clause of *Rejected* the human changed" says the same and is corrected the same way.
