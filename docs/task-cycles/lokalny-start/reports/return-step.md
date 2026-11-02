# Return step — task `lokalny-start`

**Status:** done

Compared at 3602801. One commit: d07564a docs: :memo: record the sources of the Playwright MCP and CLI ways and name account-server at local-start-access (`foundations/decisions.md` +1 −1, `foundations/environment_facts.md` +12 −0, `foundations/invariants.md` +1 −1). A commit needs the review of its range, by step 11 of `implement-task`.

D-252's sentence and *Rationale* are unchanged: only its *Based on* gained two facts, a field the task leaves to the cycle.

## Return step

### Foundation compared with code

| Entry | Compared with | Result |
|---|---|---|
| D-252 | `.claude/skills/loop2-play/SKILL.md`, `.playwright/cli.config.json`, the measurements of `reports\fix-1.md` | Matches. **Corrected:** its *Based on* cited neither the certificate setting's two sources; two facts written |
| D-253 | `scripts/local-start.mjs`, `package.json`, the skill | Matches. Review-whole finding 4 on its *Rationale* goes to the request's lists, as ordered |
| D-254 | `removeEndedStarts`, `startDirectories`, `isRunning` | Matches, with one exception: review-whole finding 2, a directory whose process number was taken over. The row's meaning holds, since no account is kept for a person and each start gets a fresh database. The sentence is left as it stands, as that finding goes to the request's lists |
| D-255 | `unanswered` in `scripts/local-start.mjs`; no change in `src/server/**` | Matches |
| D-256 | `makeCertificate` | Matches |
| D-234 | *Rejected* against `Dockerfile:18`, `src/server/configuration.ts:181` | Matches |
| D-110 | *Verification* against the invariant | Matches |
| `local-start-access` | `scripts/local-start.mjs`, `src/server/main.ts` | Sentence matches. **Corrected:** *Part* read `build-tools` alone, and a change in `src/server/main.ts` that stopped honouring `LOOP2_LISTEN_HOST` could make the sentence false at the server's port; it now reads `build-tools · account-server` |
| `playwright-cli-config-path`, `playwright-cli-token-use`, `playwright-screencast-frames` | their sources at fixed commits | Match |
| D-05, `loop2-one-serving-process`, D-45, `preview-server-access`, D-49, D-111, D-163 (found by the search) | The command | No collision: they speak of the container, the kitchen-sink page, tests' ports, the server's settings and mail in tests. D-49 holds by the system's picked ports |
| `guidelines/testing.md`, table row and lists | `tests/invariants/test_local_start_access.py` | Matches |

### Decisions written or changed

- Written by this cycle: D-252, D-253, D-254, D-255, D-256.
- Changed by this cycle: D-234 (*Rejected*), D-110 (*Verification*).
- Changed in this step: D-252 (*Based on* only).

### Invariants written or changed

- `local-start-access`, set by the task's row 4 of *Settlements to record*. Changed in this step: *Part* only. No new invariant.

### Environment facts

Written in this step, each passage checked at its address (HTTP 200, the passage found):

- `playwright-cli-context-options`: D-252's *Rationale* says the setting for a certificate stands in a file of the repository. `playwright-cli-config-path` holds where the file is, not that it takes context options.
- `chrome-devtools-ignore-certificate-errors`: Playwright MCP reaches the game only through this command, with no setting outside the repository. Were it gone, the fallback of D-252 would need the setting its *Rejected* counts against MCP, so the citation would call the decision into question.

Written earlier by this cycle: `playwright-cli-token-use`, `playwright-cli-config-path`, `playwright-screencast-frames`.

**Weighed and not written:**

| Candidate | Why no fact |
|---|---|
| `page.screencast` gives no frames on a page with no viewport (`reports\fix-1.md`) | It has no source of the three forms the template allows: no page says it (the nearest, `class-screencast.md`, says only "If not specified the size will be equal to page viewport scaled down to fit into 800×800."), and a reading is only for a state of a host, while this is a tool's behaviour. It also has no dependant: D-252 stays true whichever way Playwright goes, since the skill's code sets a viewport either way, and a fact stands only while an entry names it (WAY-73). It stays in the skill and in `reports\fix-1.md`. |
| Playwright MCP's file access limited to its workspace roots (its README, `--allow-unrestricted-file-access`) | Only a sentence of the skill rests on it. No decision would be called into question. |
| `openssl` writing key and certificate to standard output, and coming with Git for Windows | D-256 says the command makes a certificate, not with what. A failure shows at once. |
| Windows and SIGTERM (D-254's *Rationale*) | Were it no longer true, the removal at the next start would stay right. |

### Glossary terms

None. „Local start” and „stream of frames” read as a reader of the field takes them. D-252 is the route the-way's term "agent's way to the running product" asks a foundation to settle, and `task-cycle/change/ui_check.md` now finds it there.

### Part-map changes

None in this step. Compared with the code at 3602801:

- `build-tools`: its sentence holds, and `.gitignore` staying in it after gaining `.playwright-mcp/` changes nothing it answers for, since one file cannot be split between two parts. `scripts/local-start.mjs` stands in *Trust boundary*.
- `agent-workflow`: its sentence holds. `frames.js` and `save-frames.mjs` are files of a skill under `.claude/**` and `.agents/**`. `save-frames.mjs` takes in only frames the agent's own browser gave, so *Trust boundary* stays `none`. *Depends on* with `build-tools` still says what is true.
- External context: browsers fall under „HTTP clients”. No new exchange.

Changed by this cycle earlier: `build-tools` (sentence, *Files*, *Trust boundary*), `agent-workflow` (*Files*, *Depends on*).

### Projected entries written whole or in part

- Whole: D-252, „How does an agent operate the game as a player does?”.
- In part: D-253, „Where does the data an agent checks the game on come from?”; the rest stands with task 5.

### Rows of *Settlements to record* written

| Row | Identifier |
|---|---|
| 1 | D-254 |
| 2 | D-255 |
| 3 | D-256 |
| 4 | `local-start-access` |

## Choices that stay rows of the questions table

None of these binds later work, so none became an entry:

- The global Playwright CLI: one `npm install` turns it back, and nothing later rests on it.
- The server in the start's own process, the system-picked port, the stop file, the key in memory, mail at `127.0.0.1:1`: how this command is made.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors, on the working tree and on d07564a |

**Not run:** the full `npm test`, by the dispatch. No focused test: the commit touches three Markdown files of the foundation and no code, test or guideline; `foundation_check.py` is the check that reads them.

## Noticed, not changed

- `local-start-access`'s boundary cases use a stand-in server, so the test proves that the command gives the server `127.0.0.1`, not that the real server listens there. The new *Part* puts the invariant in front of a change to that server. This is no finding of the reviews and no entry; it is for the review of this range to weigh.
- `reports\author.md`, Concern 1 stays overtaken by `reports\fix-1.md`.
- `cycle.md` *Return step* still reads `Pending`: the section above is written to go there, and that file is the orchestrator's.
