# Return step report: mapa-czesci-z-przegladu-fundamentu

**Status:** done. One commit, `404f7d00` (range `d5932fc5..404f7d00`), so the return step has a range to review.

## Return step (fields of the record)

- **Foundation compared with code:**
  - The invariant `page-address-fragment` against `src/browser/view/screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`, `app.ts` (`start`, `showReset`), `game-view.ts` (the `onChange` handler), `account-card.tsx` (the form's `client.setPassword(reset.token, ...)`) and `account-api.ts` (`confirmEmail` and `setPassword` put the token in the JSON body of their one route): the token is read by the two readers as it stands and goes only to those two calls; a fragment of an emailed link names no screen and reloads the page. It matches; nothing corrected.
  - The invariant `deploy-workflow-input` against `.github/workflows/deploy.yml`: the values from outside (five secrets, `github.sha`) stand in the `env:` of the one step and `ssh` carries `StrictHostKeyChecking=yes` on its command line. It matches; nothing corrected.
  - The part-map entries of `browser-view`, `deployment`, `agent-workflow`, `account-server`, `build-tools` against the files: the three view files and the four deployment files exist and git matches them; `compose-state.mjs` (and its copy in `.agents/`) composes the game state from `dist/browser/sim`, as the sentence of `agent-workflow` says; no file of `account-server` names the simulation; `.gitattributes` and `account_container_support.py` each belong to one part (foundation check `0 errors`). It matches; nothing corrected.
  - The decisions the task names: D-281 (the addresses and the nearest screen, `#/konta` included) matches `screen-address.ts`; D-09, D-10, D-11 match `deploy.yml`, `compose.yaml` and `deploy/cloudflared.Dockerfile` (push to `main`, connector pinned by version and digest, `http2`, IPv4); D-351 matches the docstring of `test_cross_part_imports.py` (the gap of `import()` with a computed path is its stated "Does NOT cover"); D-32, D-46 and D-210 describe code the change does not touch. Nothing corrected.
  - What no longer matched, and its correction, in the table of `guidelines/testing.md`: the row of `.github/workflows/deploy.yml` said more than its two cases read. Corrected to what they read. (a) `test_ssh_is_strict_and_batch` reads `-o K=V`, `-o "K V"` and `-oK=V`; the row said "every form `ssh` accepts", but the case does not read an option bundled behind another short flag (`-4o`, N-1 of the review of the fix); the row now says the three forms and that `-4o` is not read. (b) The case takes the first line of the file holding `ssh` and a space, not "the one call"; the row now says so and names `test_one_ssh_call` as what keeps the call single. (c) The `sha` case reads `github.sha` only on a line `NAME: ${{ github.sha }}` and expressions only inside a script written as a `run: |` block; the row said "in the `env:` mapping" and "in the step's script", and now says what is read. The test was not changed (N-1, N-2, N-3 are review findings of the request, not entries, and are not fixed here).
  - A link that was missing: the invariant `page-address-fragment` derives from D-281, D-156 and D-224, but none of the three named it in its *Verification*; the template says *Verification* names the invariants derived from the decision. Corrected (see below).
- **Decisions written or changed:** D-281, D-156, D-224, *Verification* only, through the rules of `record-decision` (read: `SKILL.md`, `read.md`, `decide_entry.md`, `template.md`): `invariants: page-address-fragment` added (D-156: `invariants: email-confirmation-link · page-address-fragment`). No binding sentence, *Based on*, *Relations*, *Rationale* or *Rejected* changed. `deploy-workflow-input` derives from no decision (`recovered from code`), so no decision named it.
- **Invariants written or changed:** none in this step. Written earlier in the change: `page-address-fragment` (rule set by the task, row 1, with D-281 · D-156 · D-224) and `deploy-workflow-input` (rule set by the task, row 2; no decision carries it).
- **Environment facts:** none. After the fix `deploy-workflow-input` has `Rests on: none`, `page-address-fragment` has `none`, and the part-map entries rest on no outside source. No entry now rests on a source the foundation lacks: the substitution of `${{ }}` in a workflow and the runner's SSH are not conditions of either sentence (the sentences are about what the workflow's text holds), so no fact is written for them. The two OpenSSH facts stay used by the decision at `foundations/decisions.md:2453` (its *Based on*).
- **Glossary terms:** none. The words the entries use, "fragment", "token", "emailed link", "refusal", "environment variable", "host-key checking", are used as a reader who knows the field takes them (a URL fragment, a token in a link, a refusal of a request), so WAY-95 gives them no entry; "trust boundary" is used as the template gives it.
- **Part-map changes:** none in this step (the change's own, written earlier: `browser-view`, `deployment`, `agent-workflow`, `account-server`, `build-tools`).
- **Projected entries written whole or in part:** none.
- **Rows of *Settlements to record* written:** row 1 as the invariant `page-address-fragment`; row 2 as the invariant `deploy-workflow-input` (both in `foundations/invariants.md`).

## Points of the handoff

1. **D-09 and D-281 *Verification*.** The rule is the template's "Verification": a decision's *Verification* names the invariants derived from it, and the invariant names the decision in *Derives from*. By it: D-281, D-156 and D-224 are named by `page-address-fragment` in its *Derives from*, so their *Verification* had to name it, or the link would stand one way only; that is changed (above). D-09 is not named by `deploy-workflow-input` (its *Derives from* is `recovered from code`), so the rule does not require a change; it is no entry this request writes, and none is proposed or deferred. My earlier note ("could name the new invariants") is corrected: for D-281 it was required, for D-09 it is not.
2. **Environment facts:** none (above).
3. **Glossary:** none (above).
4. **Rows:** stated in the field above.
5. **Recorded choices (M-4 not split; wording of M-1, M-2, M-3, M-7):** not reopened.
6. **N-1, N-2, N-3:** the test is unchanged. What I changed for them is the row's words only (a), (b) and the `sha` row words (c) above, since the row must not say more than the test reads.

## Checks (command, exit)

- `python -B .the-way/elements/common/foundation_check.py` after the commit, no switch: exit 0, output `0 errors` (no `listed:` line).
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 147 warn, 7 info` (unchanged).
- No test file touched; no test run. `npm test` not run, as ordered.

## Reaches, working copies, unread, searches

- Reaches beyond the handoff: `src/browser/view/app.ts`, `game-view.ts`, `account-card.tsx` and `account-api.ts` (the path of the token); `elements/decisions/template.md`, `skill/SKILL.md`, `read.md`, `decide_entry.md` and WAY-95 in the-way's decisions.
- Working copies: none made in this step.
- **Unread material:** the reviews' reports (`review-whole-report.md` and the review of the fix); I took N-1, N-2, N-3 from the handoff. `elements/glossary/skill/SKILL.md` (no glossary entry written). `elements/decisions/examples.md` names WAY-03 of the-way's log: not opened.
- **Searches not found or unclear:** none.
