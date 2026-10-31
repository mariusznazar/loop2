# Report — Slice 11, task `reset-hasla`

**Status:** done (with two notes below)

## Commits
- `2e5d694` docs: add the password reset to the trust-boundary table, the coding guidelines and the deploy skill

## Files changed (added/removed lines)
`git diff --stat` of the commit: 7 files, 32 insertions, 18 deletions: `guidelines/testing.md` (+11/-6), `guidelines/coding-session-store.md`, `guidelines/coding-database-access.md`, `guidelines/coding-mail-sending.md`, `guidelines/coding-browser-module.md`, `.claude/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/SKILL.md` (the two skill copies are identical, diff found no difference).

## What changed
- `guidelines/testing.md`, rule "Trust boundaries": *Decision* gains D-214 · D-217 · D-218; *Invariant* gains password-reset-verified-email · password-reset-link · password-reset-ends-sessions. Five new rows in the permissions table (request for a link 204 / refusals; set password 204; password rules before the link; every dead token one `invalid-link`, 429 / other failure leaves the link). Both new routes added to the Origin row and the JSON row. Counts from the code (`paths` in `src/server/account-routes.ts:40`, mutationGuards list at lines 368-374): state-changing account routes "pięciu" to "siedmiu", save route "szóstej" to "ósmej", "siedmiu trasach" to "dziewięciu" (nine paths). `src/server/` cell: renamed case "transport refuses all four link routes before the session, the link or the mail service" (four routes counted from the test, `tests/transport.test.mjs:245-275`), plus the cases of the three new invariants and the invalid-email case marked `account-mutation-request-guards`; the password-hash guard on the session write is named by its three storage cases.
- Coding guidelines: session-store (`expectPasswordHash`, D-112), database-access (password hash in the same statement as the block, D-112), mail-sending (`composePasswordResetMessage` beside `composeConfirmationMessage`; D-219 added to the rule's *Decision*), browser-module (`createFormNote` beside `createFormWarning`).
- Deploy skill, *Account mail*: both messages are sent by the application; "Wyślij odnośnik" added beside "Wyślij ponownie" in the never-by-an-agent line. Both copies hold the same passage and got the same words.

## Checks
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- Case-name search: a script took every quoted case name in the `src/server/` row of `guidelines/testing.md` and searched the three test files by exact text: 43 names, 41 found. The 2 not found ("a message is submitted only after STARTTLS…", "a server that offers no STARTTLS…") are existing cases of `tests/account-mail.test.mjs`, a file outside this slice and not in the three searched; not changed by me.
- Identifier search: `expectPasswordHash`, `composeConfirmationMessage`, `composePasswordResetMessage`, `createFormNote` found in `src/`; D-98, D-112, D-214, D-217, D-218, D-219 and the three invariants found once each in `foundations/`.
- Not run: `npm test` (the orchestrator's gate), no test files changed.

## Own-work check
Requirement most likely missed: "route counts that changed" and the case names. Check: counted the paths and the guard list in the code, and searched every case name in the test files (above). Showed the counts match (7 + save route = 8 guarded routes, 9 paths) and all names exist except the two pre-existing mail cases.

## Reaches beyond the dispatch
- `src/server/account-routes.ts:40-55, 352-380` and `tests/transport.test.mjs:244-280, 555-575`: to count routes.
- `src/server/session-store.ts:108-114`, `src/server/database.ts` diff, `src/server/account-mail.ts:59-75`, `src/browser/view/controls/text-field.ts:126-150`: to name the identifiers.
- `foundations/decisions.md:1985-1996` D-112 and `:4071-` D-219: the meaning for the session-store, database and mail edits.
- `tests/*.mjs` marker comments: to map invariants to case names.

## Searches not found or unclear
- `guidelines/coding-browser-module.md` *Files of this kind*: no wording says it lists all view modules (it already omits `account-screen.ts`, `game-view.ts`, `controls/`), so per the plan I added no screen modules.
- Stale comment, not mine to change: `src/server/account-routes.ts` near line 53 still says "the six small routes" (now seven). Product code, outside this slice.
- Which of D-215, D-216 should be cited in the table was not in my reading; I cited only D-214, D-217, D-218 (plus D-98, D-103, D-104, D-109, D-112, D-155 already in entries read). D-98 and D-112 are cited in new rows but not added to the rule's *Decision* header (the existing header omits them too; foundation_check passes).

## Choices
- Row for the Origin/JSON requirement lists the routes in the existing style; the table's *Decision* column uses D-214/D-218 for the new rows. Cost if wrong: a reviewer may want the rows split differently.
- New rows' wording of the 204 / refusals follows D-214 and D-218 only; no new meaning introduced.
