# Return step report — "panel właściciela"

**Status:** done with concerns (two judgments for the orchestrator, in *Questions and concerns*; neither blocks).

Worktree `the task's worktree`, branch `task/panel-wlasciciela`, started at head `70c7bb9c`.

## Commits

| Commit | Content |
|---|---|
| `57b0f7e7` | `foundations/decisions.md` (D-109, D-137, D-252, D-400, D-410, D-411) and `foundations/invariants.md` (`owner-panel-authorization`) |
| `a5efc100` | `tests/account-owner.test.mjs`: one word of one comment ("owner's" to "operator's"), line 34 |

Files and lines (`git diff --numstat 70c7bb9c HEAD`): `foundations/decisions.md` +11/-14 (pairs shrunk, one sentence added to D-109), `foundations/invariants.md` +1/-1, `tests/account-owner.test.mjs` +1/-1.

## Check

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (run before the commits on the final tree, and after both commits; the second commit changes a comment only).
- `npm run typecheck` — exit 0 (run because a test file was touched, a comment only).
- No test and not the product's gate were run.

## Foundation compared with code (head `70c7bb9c`)

Compared against `src/server/owner-routes.ts`, `account-role.ts`, the added parts of `database.ts`, `account-routes.ts`, `app.ts`, `src/browser/view/menu-bar.tsx`, `screen-address.ts`, `game-view.ts`, `account-card.tsx`, `programs-entry.ts`, `accounts-screen.tsx` (the loading, list and confirmation parts), the styleguide section "The list of accounts", and the tests' `decision:` lines.

Entries that matched the code, with no change: D-12, D-104, D-112, D-202, D-253, D-280, D-281, D-354, the glossary terms `owner`, `blocked account` and `previous-save privilege`, and the part map (`account-server` holds the two test files and the new sentence; `browser-view`'s globs `src/browser/view/**`, `tests/view/**` take the new screen and test files, and its description needs nothing; `foundation_check.py` reports no unclaimed file).

What no longer matched, and the correction:

1. **A request that fails the guards is not answered 401 or 403 by the owner routes.** In the code the four `POST` routes run `mutationGuards` (Origin, media type, body is a JSON object) before `ownerOnly`, so a request with a wrong Origin, a non-JSON type or an array body gets the guard's 403, 415 or 400, whatever its session. D-109's new paragraph and the invariant `owner-panel-authorization` said every request without a session gets 401 and every session without the role 403, and the invariant's tests send requests that meet the guards. Corrected: D-109 gains a closing sentence in its owner-panel paragraph ("The four `POST` routes first meet the transport, origin and body guards of D-104, so a request that fails them is refused as D-104 gives, whatever its session."), placed after the two sentences that test lines quote, so no quoting line changes; the invariant gets "a `POST` route doing so for a request that meets the Origin, media-type and body requirements", the form `account-session-authorization` already uses. The tests that cite the invariant stay as they are (they send guard-meeting requests; `tests/owner-routes.test.mjs:421-470`).
2. **Pairs the tests now hold** (below, under "Decisions written or changed").
3. **One use of "owner" against the glossary entry** in the change's own test comment (`tests/account-owner.test.mjs:34`, "standing in for the owner's command beside the server" — a person who runs a command): written "operator's". A search of the other lines the change added (src, tests, guidelines, the `loop2-deploy` skill) found no other such use; every other "owner" in them means the role or its holder.

## Decisions written or changed

- **D-109:** the sentence above; the added parts of the pair removed (the owner-panel part of *complies* and of *violates*): held by the tests of `tests/owner-routes.test.mjs` that quote D-109 (lines 364, 428, 468, 912) and by the invariant `owner-panel-authorization`, and already named in the clause `tests:`. The pair is the base's again.
- **D-137:** from the pair removed the panel's *complies* ("an account with the owner role blocking a player by `POST /api/owner/block` with the same one transaction") and the first two items of *violates* (an HTTP route that blocks for a session without the role; a block that reads the role in one transaction and marks in another, or blocks an owner): held by `tests/owner-routes.test.mjs:642`, `:709-710`, `:879-881`, `tests/account-owner.test.mjs:182`, `:211`, `:293`, `:679-680` (lines quoting D-137) and the invariant. The pair keeps what no test holds: the command as the human runs it, the skill instruction through the `mikrus` MCP server, and the base's one-transaction item. Its clause `tests:` already names those tests.
- **D-400:** the same: removed the panel's *complies* and the route item of *violates* (held by `tests/owner-routes.test.mjs:788-790`, `:880`, the invariant); the pair keeps the command run by hand and the skill instruction through the MCP server.
- **D-252:** removed from the *violates* of the pair "a line of the owner panel that holds the number or the address of the account of the acting owner": held by `tests/owner-routes.test.mjs:711`, `:790` (lines quoting D-252; the test asserts the log text holds neither the owner's number nor any address) and `tests/account-owner.test.mjs:652`; named in the clause `tests:` ("with the target's number and nothing of the acting owner").
- **D-410:** the pair shrank to what no test holds. Removed: the route that reads the role per request (complies), the role kept in the session or a cookie, and a new account created as an owner (violates): held by `tests/owner-routes.test.mjs:533` (D-410 line: the role read per request, same session refused after a second connection made it a player), `:1131` (the answers), `tests/account-owner.test.mjs:315/343/452/526` (the command), and the invariant; the new account being a `player` and the 5-to-6 migration by `tests/account-storage.test.mjs` (tests citing D-112's sentence on the accounts' columns, e.g. `:795`, and the version-6 migration tests) and `tests/owner-routes.test.mjs:1163`. Kept in the pair: the command run by the human (complies), and an HTTP route or request field that gives or takes the role, and the role given by an address in the settings (violates) — no test can show that no route exists, and none checks the settings. The clause `tests:` stays as the foundation step wrote it; it is the end state and now every test it names exists.
- **D-411:** the pair removed whole (and the sentence "An agent compares a change with the part no invariant and no test holds:"); *Verification* is the clause `tests:` alone, as the template gives for a decision held whole. Every part of the two pair lines is held: the row of an owner with three buttons, the first click of „Odblokuj”, and no confirmation before a grant or revoke by `tests/view/accounts-screen.test.mjs:181, 280, 341, 453` (lines quoting D-411); a list with no date and no confirmation of the address, and the order by address, by `tests/account-owner.test.mjs:80` and `tests/account-api.test.mjs:1421-1607` (listAccounts takes exactly the four fields); „Zablokuj” asking first by `accounts-screen.test.mjs:341, 453`. `tests/view/owner-panel.test.mjs:146, 223` cite it too.
- D-354 keeps its pair: it is the base's pair extended by `account-role`, and its sentence "a refusal leaves its sentence in the terminal" is not one of the lines the tests quote for it (`tests/account-owner.test.mjs:602` holds the JSON line and its sentence after a failure).
- D-112, D-280, D-281, D-253, D-202: no pair of them was changed by the change; no pair is removed.

## Invariants written or changed

`owner-panel-authorization` (existing in the change): the sentence changed as in the first correction above. The tests citing it are the ones already in the change; none alters, and none was read as failing the new wording.

## Environment facts

None written. Checked: the change rests on no source outside the product that the foundation lacks — no new library, service, standard or outside document (the code uses the Node.js `node:sqlite` and Express the foundation already holds; the invariants and decisions cite none new).

## Glossary terms

None written; `owner` stands (row 9). One use against it corrected (the test comment above). The older uses of "owner" for the human who runs the server (the review's O-1, the skill `loop2-deploy` and about seventy foundation lines) are left, as the handoff says; no entry deferred or proposed.

## Part-map changes

None. Compared `account-server` (the description and *Files* hold the role command, the owner routes and the two test files) and `browser-view` (its description and its globs already take the screen, its entry and its tests).

## Projected entries

None (the task has none).

## Rows of *Settlements to record*

| Row | Went to | Matches the code |
|---|---|---|
| 1 | D-137 (second paragraph and rationale), D-400 (second paragraph), D-109 (paragraph on the owner panel), D-202 (paragraph) | yes |
| 2 | D-410 and D-112 (role column, version 6, the role command) | yes |
| 3 | D-137 and D-400 ("the command stays beside the panel"), *Rejected* of both | yes |
| 4 | D-137 (409 `owner-not-blockable`), D-400 (any account), D-411 (no „Zablokuj” at an owner) | yes |
| 5 | D-280 (paragraph on the link in the menu „Konto”; *Rejected* with the fourth item), D-281 (`#/konta`) | yes |
| 6 | D-411 | yes |
| 7 | D-411 | yes |
| 8 | invariant `owner-panel-authorization` (wording corrected, above) | yes after the correction |
| 9 | glossary term `owner` | yes |

## Choices that bind after the merge (the orchestrator's recorded choices)

- **A1** (the role is the fourth field of the list): binds, and D-411's binding sentence and *Rationale* hold it. Nothing written.
- **A3** (the confirmation of „Zablokuj” built as that of „Zacznij od zera”: the sentence, „Tak, zablokuj”, a plain „Wróć”): a rule of how the screen looks and behaves in a control, which the template's "Where it goes" question 2 puts in the guidelines; the styleguide section "The list of accounts" (`guidelines/styleguide-browser-view.md:1003-1012`) holds it, and D-411's sentence holds that the block asks first. Nothing written.
- **A5** (the screen takes its width from `.app-main`): D-280's paragraph says the screen has "the same content width"; the means is code. Nothing written.
- **The loading line in `text-secondary`** and **the one-sentence failure texts:** look rules, question 2 again; the styleguide holds the failure line (one sentence in `warning`, line 1015-1018) and the empty line, and it does not name the loading line's role; the styleguide is the request's, not a foundation entry, so I wrote nothing and name the gap here as an observation, not a proposal.

## Questions and concerns

1. **D-408 and its "its position on the menu bar".** I judged it and left it. The sentence was true of the screen of a map run, which has no position on the bar (D-280), before this change, and D-408 derives from D-280; the new screen does not make it newly false, the review graded the point as O-2 (not mine, per the handoff), and a one-sentence addition would be a change of D-408 that the handoff allows only where the sentence now states something false. If the orchestrator reads it as now false, the fix is one added sentence, "A screen that is no item of the menu bar has no position on it (D-280)", placed after the two sentences the tests quote (the lines at `tests/view/screen-registry.test.mjs:129, 462` quote a prefix of the first), which I did not write.
2. **Some sentences of D-410 and D-202 are held by tests that carry no `decision:` line for them.** D-410's first sentence (the role stored with the account, a new account a `player`, either role signs in on the same card) and the end of its third ("no registration, no request and no field of a request gives an account a role"), and D-202's added paragraph, are tested (`tests/account-storage.test.mjs:870`, `tests/owner-routes.test.mjs:1163`, the migration tests that cite D-112) but no line quotes them. The clause `tests:` names the tests in words, and the check passes, so I changed nothing; adding the lines would be edits of test files, which the return step does not make (the one comment above is the only exception, as a use against the glossary entry).

## Reach beyond the handoff

- The skill files of the decisions and invariants elements, the invariants template and `write.md`, `way_of_working.md`, `.the-way/elements/decisions/template.md`, `decide_entry.md`, `read.md` — to write by their rules, as the handoff names the element skills.
- `src/server/transport.ts` (`mutationGuards`) and `src/server/account-routes.ts` (`accountPrelude`) — to settle the order of the guards and the role check (first correction).
- A search of the whole foundation for sentences the owner routes or the screen could make false (commands, "no HTTP route", "owner panel", the `/api/` routes): only D-355 (its *violates* names the output of `account-block` and `account-previous-save`, a list that is not exhaustive and not false) surfaced; no change.
- `the author's own rule file on git` — before the commits (a hook asks for it).

## Working copies

`.runs/return-step/` in the worktree held scripts, diffs and result lists (ignored by `.gitignore`); removed before returning. No worktree or clone made.

## Unread material

- `foundations/decisions.md` read as a whole log: no. Read whole: D-109, D-112, D-137, D-202, D-252, D-253, D-280, D-281, D-354, D-400, D-408, D-410, D-411 (through the diff against the base and the final text, D-408/D-410/D-411 as entries); D-12 and D-104 only through the task's quotation of them and the test lines citing them (`tests/owner-routes.test.mjs:957`), not as entries.
- `foundations/invariants.md`: only `owner-panel-authorization`, `account-session-authorization` and their neighbours; the other invariants named in the *Verification* of the changed decisions I did not reread (the foundation step read them).
- `foundations/glossary.md` and `foundations/part_map.md`: read through the change's diff and the entries `account-server` and `browser-view`; not whole.
- `.the-way/elements/glossary/`, `part-map/` and `environment-facts/` skill files: not read, since no entry of those elements was written.
- The reports and reviews of the cycle: the foundation report whole, and by search the lines naming D-408 in the others; `review-whole-report.md` and `review-fix-whole-report.md` not read whole.
- `src/browser/view/accounts-screen.tsx`, `accounts-entry.ts`, `src/browser/account-api.ts`, `styles.css`: read in part (the loading text and the structure of the screen), not whole.
- The tests were read as the lines `decision:` and `invariant:` and the titles of the tests (a list from the diff), and the body of two tests (`tests/owner-routes.test.mjs:421-470`, `:700-780`), not whole.

## Searches not found or unclear

- The handoff's statement that D-410 and D-411 carry a `tests:` clause "in words" matched the files, but the clause already named the tests as the template gives (no path); the work was to shrink the pairs, which I did.
- The handoff says the check "must exit 0 at the end of every commit": run on the tree of the first commit and on the final tree (identical foundation), not separately after each commit by checkout.
- No place was found that states which "decision:" lines the foundation expects for the sentences of D-410 that no test quotes (concern 2).
- No entry of the foundation says in which order the guards and the role check run on the owner routes (it stood only in the code; now in D-109).
