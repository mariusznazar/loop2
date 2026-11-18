PASS 11a0f28d5f9f23ff320d73cc7146ce31d939ac16

# Review of the return step's commits — cztery-usterki-recenzji

Range `f775999a..11a0f28d`, one commit `11a0f28d` (`docs: :card_file_box: quote in D-431 the page of the Node.js documentation ...`), one line changed: `foundations/decisions.md:1639`, the *Based on* of D-431, from `none` to
`https://nodejs.org/docs/latest-v24.x/api/diagnostics_channel.html § Built-in Channels, NET — "Stability: 1 - Experimental"; read 2026-11-18`.
`git rev-parse HEAD` = `11a0f28d5f9f23ff320d73cc7146ce31d939ac16` (matches). `.the-way` at `bfb2e109`, the pinned gitlink.

## Findings

### Critical

none

### Important

none

### Minor

**M-R1 (within the task) — D-431's citation names the moving page of the Node.js 24 line, not the page of a fixed release; the report's ground for that is false.**
Place: `foundations/decisions.md:1639`.
What is wrong: the address `https://nodejs.org/docs/latest-v24.x/...` always serves the newest Node.js 24 release (on 2026-11-18 it serves "Node.js v24.22.3 documentation"). The risk in D-431's *Rationale* (`foundations/decisions.md:1644`) is exactly that the channel's status or name may change in a later release; when it does, the page at this address changes with it, and a reader who opens the citation then finds a page that no longer holds the quoted passage, or holds it about a different release, with nothing in the entry saying which release was read. Every other Node.js citation of the foundation names a fixed release: D-229 (`foundations/decisions.md:320`, `https://nodejs.org/download/release/v24.21.0/docs/api/documentation.html#stability-index`) and the fact `node-listen-port-zero` (`foundations/environment_facts.md:286`, `https://nodejs.org/download/release/v24.17.0/docs/api/net.html`). The return step report (`reports/return-step-report.md`, D-431 bullet and *Searches not found or unclear*) says "no archived edition was available to me"; that is false — `https://nodejs.org/download/release/v24.22.3/docs/api/diagnostics_channel.html` exists and shows, under `NET`, the same line "Stability: 1 - Experimental" (fetched in this review).
Why Minor: the entry's content agrees with the page and the code today, and the date read narrows which page was meant; the departure is of form (WAY-364), and no sentence of the entry is read wrongly today. Fix, one line: replace the address with `https://nodejs.org/download/release/v24.22.3/docs/api/diagnostics_channel.html` (the release the page served on the date read), keeping the place, passage and date.
Evidence: the two fetches named under *Checks*; `Grep "nodejs\.org/docs/latest"` over `foundations/` finds only line 1639.

### Judgements asked by the handoff

- **Quotation faithful:** yes. The page puts "Stability: 1 - Experimental" directly under the heading `NET` of *Built-in Channels*, before the first event; the event `'net.server.socket'` itself carries no marker and takes the marker of its section. The citation's place, "§ Built-in Channels, NET", names exactly where the line stands — more exactly than the handoff's paraphrase ("its subsection `net.server.socket` states ..."). The module as a whole is "Stability: 2 - Stable"; the citation does not claim otherwise. D-431's *Rationale* ("marked by the documentation of Node.js 24 as Stability 1, experimental") agrees.
- **Quoting in *Based on* rather than an environment fact:** right. The template (`.the-way/elements/decisions/template.md:51-56`, WAY-90) asks for a fact only for a citation that, once untrue, would call the decision into question. D-431's binding sentences (fail as the server fails, announce no address, pass no request, try no other port) do not depend on the channel; the channel carries only the mechanism and the risk stated in *Rationale*. A renamed channel would break the start's readiness proof (every start fails with `SERVER_NOT_READY`, `scripts/local-start.mjs:244`, `:253-281`, `:419`), which calls the code, not the choice, into question. D-229 is the model the handoff names: its *Based on* quotes the Node.js stability index as a source and keeps the risk itself in *Rationale* (WAY-138), as D-431 now does.
- **Was *Based on* `none` a mismatch to correct:** yes. *Rationale* rests a risk on the Node.js documentation, a source outside the product; `none` stated that nothing outside the product was relied on (`.the-way/elements/common/rules.md:19-21`). The correction is within the return step's remit (`.the-way/task-cycle/skill/return_step.md:7-11`).

### The return step's claim that nothing else needed correction

Spot-checked, not re-reviewed (the entries were reviewed in `PASS f775999a`): D-430 (`foundations/decisions.md:2936`) against `src/server/account-block.ts:77,92-93` and `src/server/account-backup.ts:83,129-130` — the busy-only advice and `existingOnly` agree; D-231's added clause (`foundations/decisions.md:2237`) agrees with `existingOnly` in the backup command; D-431's binding sentences and *Rationale* agree with `scripts/local-start.mjs:219-281`. Nothing found against the claim beyond N-1, which the handoff excludes.

## Declined to judge

- Whether D-431's *Based on* should also name the fact `node-listen-port-zero` (the start picks its port by `listen(0)`, `scripts/local-start.mjs:222`): the decision's question, another program taking the port after it was freed, does not stand on how the free port is obtained, so the fact's change would not call D-431 into question; set aside as not a defect of the range.
- N-1 and the earlier findings of the change: excluded by the handoff.

## Checks

- `git rev-parse HEAD` → `11a0f28d5f9f...`, exit 0; `git log f775999a..11a0f28d`, `git diff f775999a..11a0f28d` → one commit, one line, exit 0; `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` → both `bfb2e109...`.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- `git status --short` after the check → empty (the reviewed worktree unchanged).
- Manual: WebFetch of `https://nodejs.org/docs/latest-v24.x/api/diagnostics_channel.html` (2026-11-18) — page "Node.js v24.22.3 documentation"; under `Built-in Channels` › `NET`: "Stability: 1 - Experimental"; event `'net.server.socket'`: "Emitted when a new TCP or pipe connection is received.", no marker of its own; module marker "Stability: 2 - Stable". (The fetch tool renders the page through a model; the quoted lines are its verbatim quotations.)
- Manual: WebFetch of `https://nodejs.org/download/release/v24.22.3/docs/api/diagnostics_channel.html` — exists, "Node.js v24.22.3 documentation", same line under `NET`.
- Not run: `npm test` (full gate, excluded by the handoff); no focused test, since the range changes no code or test.

## Reaches beyond the dispatch

- `foundations/environment_facts.md:282-286` (`node-listen-port-zero`) and `foundations/decisions.md:1104-1117` (D-49, the one entry citing it): to see how the foundation cites Node.js pages and whether D-431 should name that fact.
- `foundations/decisions.md:2228-2243` (D-231 up to *Scope*) and `:2934-2945` (D-430): spot-check of the return step's claim.
- `scripts/local-start.mjs:215-284`, `src/server/account-backup.ts`, `src/server/account-block.ts` (grep lines): to compare the entries with the code.

## Working copies

none made; `.runs/review-return/` was not created.

## Unread material

- D-231 read from its heading to *Scope* only (lines 2228-2243), not to its end; D-112 and D-153 not read whole (spot-check scope; reviewed earlier in `PASS f775999a`, and the range does not touch them).
- Everything the handoff named to read whole was read whole: the method, `return_step.md`, the return step report, the frozen task, D-431, D-229, D-255 to D-258, the decisions template, `rules.md`.

## Searches not found or unclear

- The fetch tool returns a model's reading of the page, not the raw HTML; the quoted lines are its verbatim quotations, consistent across two fetches of two addresses.
