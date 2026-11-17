# Report - executor of slice 2 (Environment facts quoted from their sources)

**Status:** done

**Commit:** `d60ad606573cf40e7a309fa89990a4f69d6ddb99` on `task/poprawki-brzmienia-fundamentu` (base `ce9cac004ea37f6c475c1528deac8ded39c16f64`; no earlier slice's commit stood on the branch).

**Files changed:** `foundations/environment_facts.md` (+16 / -16). Nothing else.

**Check result (one line):** `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`, no `listed:` line; nothing failed; the product's full gate was not run (as instructed).

## Method of reading

Every source was opened by me on 2026-11-17 (the date of this run; `date +%F` printed 2026-11-17) with `curl` into `.runs/executor-2/`, all answered HTTP 200. Each passage was compared with the page by a script that collapses whitespace and drops markdown markup (backticks, `*`, link syntax, `>` quote markers) - the way the template reads a passage "as a reader sees it". The Terms of Pixel Crawler is a PDF on Google Drive; I downloaded it (`uc?export=download`) into its own directory `.runs/executor-2/terms-pdf/` and read its text with `pdftotext`.

## Each item

| Item | Result | What now stands |
|---|---|---|
| 5.1 `node-sqlite-database` | made | Sentence opens "Node.js 24, as its 24.21.0 documentation says, exposes SQLite through ...". *Source* untouched (commit `955266bf...`, read 2026-11-17). All 12 passages re-checked in `doc/api/sqlite.md` at that commit: all stand. `gh api` shows the commit `955266bf...` is the commit "2026-09-08, Version 24.21.0 'Krypton' (LTS)". |
| 5.1 `node-uncaught-default-print` | made | "Node.js 24, as its 24.21.0 documentation says, with no handler ...". *Source* untouched (same commit, read 2026-11-02); both passages (process.md `Event: 'uncaughtException'`, errors.md `error.stack`) stand there. |
| 5.1 `node-assert-failure-inspect` | made | "Node.js 24, as its 24.17.0 source says, while it builds ...". I wrote "source", not "documentation", because the page read is code (`assertion_error.js` at tag `v24.17.0`); the task's own example wording says "documentation" for the facts that cite docs. *Source* untouched (read 2026-11-02); all 6 passages stand in the file at that tag. |
| 5.2 `password-hash-work-factor` | made | Address "§ Recommendations" -> "§ Introduction, the summary of recommendations". The page has no heading "Recommendations"; the passage stands in the bullet list after "To sum up our recommendations:" of `## Introduction` ("Use Argon2id with a minimum configuration of ..."). The quoted passage "Use Argon2id" is a word-for-word start of that list item; kept as it was. Read date -> 2026-11-17. |
| 5.3 `compose-file-secret-permissions` | made | Passage now ends: "The uid, gid, and mode attributes are not implemented in Docker Compose when the secret source of the secret is a file, as bind-mount used under the hood doesn't allow uid remapping." Copied from `container_spec.md` § secrets, Long syntax, Note at commit `3a4a6995...` (page has `[`file`](09-secrets.md)`; markup dropped, as the template gives). Read date -> 2026-11-17. |
| 5.4 `cloudflare-tunnel-transport` | made | Both "§ Overview" replaced by one place: "§ introduction, before the heading "How it works"" (the page has no "Overview" heading; the two passages stand in the paragraphs before `## How it works`, and the second passage joined with ` · ` shares the place). Read date -> 2026-11-17. |
| 5.5 `express-session-end-of-request` | made | Sentence: "calls the Store's `touch`, when the Store implements it, for a session ...". Source gains two passages that carry the condition: § session - "var storeImplementsTouch = typeof store.touch === 'function';" and § res.end - "} else if (storeImplementsTouch && shouldTouch(req)) {" (both stand in `index.js` at commit `c10b2a38...`). The 7 old passages still stand. Read date -> 2026-11-17. |
| 5.6 `docker-compose-down-volumes` | made | Third list item "The default network, if one is used." added to *Source* after the networks item, exactly as in `compose_down.md` § Description. The sentence is unchanged (the task gives no change to it; it still says the networks the Compose file defines, which is true but omits the default network - noted below). Read date -> 2026-11-17. |
| 5.7 `nodemailer-require-tls` | made | "sends STARTTLS after EHLO, on a connection not already secure, whether or not the server announces it". *Source* untouched (read 2026-10-29); all 6 passages re-checked in `nodemailer-10.2.1.tgz` and stand; the condition is the passage `if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {`. |
| 5.8 `npm-lock-peer-dependencies` | made | Sentence: "... entry of `package-lock.json` only where the field is not empty." Source gains § metaFromNode - "if (val) {" and § metaFieldFromPkg - "// skip empty objects and falsey values" · "if (typeof val !== 'object' || Object.keys(val).length) {" (all in `shrinkwrap.js` at tag `v12.2.1`). Read date -> 2026-11-17. |
| 5.9 `pixel-crawler-terms` | made | Sentence: "ask for no credit except where the project has a saxophone solo, allow ...". Source: "points 1, 2, 3, 4 and 5", plus the passage of point 5 "If at any point in your project, there is a saxophone solo, the name of the author must be credited", copied from the Terms PDF. The itch.io page still links "Terms" to the same Drive file (checked live). The archived copy of the itch.io page is the one already in the entry; not touched. Read date -> 2026-11-17. |
| 5.10 `playwright-cli-sessions-per-workspace` (withdrawn) | made on its successor `playwright-cli-session-separation` | The withdrawn identifier is a row of the withdrawn table (successor `playwright-cli-session-separation`), the same defect stood there (the cite lacked `clientKey` and `loadEntry`), so I applied the change there. Source gains § clientKey - "return clientInfo.workspaceDir \|\| clientInfo.workspaceDirHash;" and § loadEntry - “const entry = await Registry._loadSessionEntry(clientInfo.daemonProfilesDir, sessionName + ".session");” · "const key = clientKey(clientInfo);" (all in `registry.js` of `playwright-core@1.64.0-alpha-1790635538000`, which `@playwright/cli@0.1.22/package.json` pins - re-read). Both read dates -> 2026-11-17. Sentence unchanged. |
| 5.11 `docker-volume-prune-scope` | made | "lists a volume called `my-named-vol` among those deleted". *Source* untouched (read 2026-11-09); the 4 passages re-checked in `volume_prune.md` at commit `ce122303...`, all stand. |

No item was "already made" or "not standing". No source was unreachable.

## Passages and addresses read (changed Source lines)

The passage, address and date of each changed entry stand verbatim in `foundations/environment_facts.md` (the entries named above); each was compared with the page I opened. The own-work script below checked every quoted passage of the eight entries whose *Source* text changed plus `docker-volume-prune-scope`: 0 missing.

## Own-work check (section 3)

- Requirement most likely not met: "each citation copied from the source page, never from memory" - a passage that differs from the page by a word.
- Check: `python -I .runs/executor-2/check_entries.py` (my script; extracts every quoted passage of nine entries from `foundations/environment_facts.md` and finds it, normalised, in the page I fetched; counts checked per entry: 2, 2, 2, 9, 6, 8, 6, 7, 4). Result: `missing total 0`, exit 0.
- It first reported one MISSING for 5.3 in a looser version of the script (`find.py`) because the quote markers `>` of the Note broke the line; the page as a reader sees it has no `>`, and the final script drops them. Both runs: `python -I find.py container_spec.md ...` printed MISSING (script did not drop `>`), `python -I check_entries.py` printed missing total 0.
- A passage that mutation would not catch: the checker cannot tell a passage that is shorter than the page's run (the quoted "Use Argon2id" is a start of a longer bullet). The template allows a passage of one run; kept as the task did not ask to change it.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` -> `0 errors`, exit 0 (after the entries were written).
- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0. No line `listed:`.
- Not run: `npm test` (the full gate; excluded by the handoff). `.runs/quality-venv` not needed.

## Dependants checked against the new sentences (template "Changing a fact")

Found by `git grep -n -- <identifier> -- foundations ':!foundations/environment_facts.md'`. Read: D-270 (peer dependency declared on `react` - a non-empty field; compatible), D-271 and invariant `sprite-credits` (credit "for every pack whose licence asks for a credit"; Pixel Crawler asks for none unless a saxophone solo, so unchanged), the invariant `password-reset-ends-sessions` and the password-reset decision at `foundations/decisions.md:3505-3530` (first 25 lines; the session is renewed at every request, so the Store there implements `touch`; compatible), the decision on Nodemailer (sending fails when STARTTLS cannot be established; compatible), the invariant on the SQLite volume `docker-compose-down-volumes`/`docker-volume-prune-scope` (no change of meaning), D-237 (read whole, 336-369; unpinned `node:24-slim` is consistent with a sentence about the line 24). Not opened in full (only the *Based on*/*Rests on* line located): the decisions at `foundations/decisions.md:320, 601, 1317, 1577, 1648, 1708, 1902, 2427, 2622, 2683, 2738, 3517` and the invariants at `foundations/invariants.md:683, 703, 773, 783, 873, 1103`; none of their sentences was compared against the new fact sentences beyond those named above. The task's rule 5 says no entry binds anything new; I changed no dependant.

## Choices and adaptations

1. **Sentence of 5.1 for `node-assert-failure-inspect`**: "its 24.17.0 source says" instead of "documentation". Rejected: "documentation" (it is code at a tag, not a documentation page). Cost if wrong: one word to change.
2. **Read date moved to 2026-11-17 where the *Source* text changed** (8 entries), kept where only the sentence changed (5.1 three facts, 5.7, 5.11). I re-read the sources of the latter too and all their passages stand; I kept the older dates because their *Source* did not change and the template treats a re-read that says the same as changing nothing. Rejected: moving every date. Cost if wrong: dates stale by days, passages verified anyway.
3. **5.10 quoting**: the existing straight-quoted passage `"const workspaceDirHash = hash.digest("hex").substring(0, 16);"` is now `“...”` as the template ("a passage that holds `"` stands in “…”") gives, since the new `loadEntry` passage also holds `"`. This is a change of a passage the task did not name. Rejected: leaving it straight next to a curly one in the same entry. Cost if wrong: revert two characters. Other entries with straight-quoted passages holding `"` (e.g. the `package.json` passage of `playwright-cli-workspace-lookup` and `-session-separation`, JSON in a package, not code at a commit) were not changed.
4. **5.5 and 5.8**: the task gave only the sentence's wording; I added the passages that carry the added condition (`storeImplementsTouch`, `metaFieldFromPkg`), because a sentence "says no more than its source", and the old passages did not show the condition.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` (named by the method's table, read whole) and `.the-way/elements/environment-facts/skill/*.md`, `template.md`, `rules.md`, `way_of_working.md` (named in *Read*).
- `foundations/decisions.md` / `foundations/invariants.md` ranges listed above: located by `git grep` and read by `sed` ranges to check the dependants; not in the handoff's ranges, needed by the template's "Changing a fact".
- `the author's global rules file scripts.md` and `git.md` (personal rules read before writing a script and committing).
- `gh api repos/nodejs/node/...` to confirm the commit `955266bf...` is the 24.21.0 release commit and the tag `v24.17.0` exists.

## Unread material

- `foundations/decisions.md:336-370` D-237: read whole.
- `.runs/task-cycles/.../task.md:55-66`, `:192-196`, `plan.md:18-48`: read whole.
- All the-way files named in *Read*: read whole.
- The twelve dependants named under "Not opened in full": only their *Based on*/*Rests on* line.
- `docs` pages themselves: each page was read via a normalised search for the quoted passages and (for `container_spec.md` § secrets, `compose_down.md`, `volume_prune.md`, `registry.js`, `tunnel.mdx`, `session.js` lines 340-375 and 385-395, `shrinkwrap.js` lines 88-142 and 249-275, the OWASP introduction and "Using Work Factors") by reading the relevant ranges; the rest of those large files was not read.

## Searches not found or unclear

- The heading "Recommendations" and the heading "Overview" do not exist on the pages (that is what items 5.2 and 5.4 fix); no other search failed.
- Unclear: `docker-compose-down-volumes` - the sentence says "removes the containers ... and the networks it defines and no volume"; the page's list of "the only things removed" has a third item, the default network. The task (5.6) asks only for the Source line and says "bez skutku dla wolumenów"; I did not change the sentence. If the orchestrator wants the sentence to name the default network, it is a one-clause change and does not touch the dependants (they speak of volumes).
- The archived copy of the Pixel Crawler itch.io page (entry says 2026-10-16) was not re-checked through the archive's CDX index; it was not part of the item.

## Problems observed

None beyond the above.

## Working copies

`.runs/executor-2/` under the worktree (fetched pages, `Terms.pdf` in `terms-pdf/`, extracted `nm/`, `find.py`, `check_entries.py`): removed before returning (see the end of this file for the confirmation).

Removed: `.runs/executor-2/` deleted with `rm -rf` at the end of the run; `ls .runs` no longer lists it. No remainder.
