# Report — correction 1 for the human's remarks ("panel właściciela"), item 6

**Status: done.** Commits (on `2a28eb57`): `7203773c` (foundation and test marking lines), `300f8186` (styleguide).

## The three gaps

1. **Styleguide line** (`guidelines/styleguide-browser-view.md`, rule *The list of accounts*, about lines 1008-1011; commit `300f8186`). The sentence "Przyciski stoją obok zdania, w oknie szerokim tak samo jak w oknie wąskim…" now reads: "Zdanie i dwa przyciski stoją w jednym rzędzie, który się zawija: w oknie szerokim przyciski stoją zaraz po zdaniu, w wąskim, gdy zdanie nie zostawia im miejsca, pod nim; zdanie nie ma marginesu, który spychałby przyciski na koniec szerokiego wiersza." This is what `.accounts-confirm` (`display: flex; flex-wrap: wrap`) and `.accounts-confirm-text` (no `margin-right: auto`) do, and what the two screenshots of the fix showed (1500 px and 600 px). I did not say "as in „Zacznij od zera”" for the layout: that confirmation still has `margin-right: auto` on its sentence.
2. **Order of checks** (commit `7203773c`).
   - `foundations/decisions.md` D-109, the closing sentence of the owner-panel paragraph (a sentence added by this change, quoted by no test, so it could change): "Each of the five routes answers JSON 503 where accounts are not configured and otherwise first meets the transport check of D-110, and the four `POST` routes then meet the origin and body guards of D-104, so a request that fails one of them is refused as that decision gives, whatever its session." This is `accountPrelude` (503, then 403 on a bad transport) before `ownerOnly` for all five routes, then `mutationGuards` on the four POST routes. D-109 *Relations* gains `derives from D-110` (the sentence cites it); its *Verification* `tests:` clause names the new part.
   - `foundations/invariants.md` `owner-panel-authorization`: "a `POST` route doing so for a request that meets the Origin, media-type and body requirements" became "each doing so for a request that meets the transport check of the account routes and, on a `POST` route, the Origin, media-type and body requirements". I checked its four citing tests (`tests/owner-routes.test.mjs`, the cases at `:421`, `:466`, `:533`, `:642` before this edit): all send requests with the proxy headers and the Origin of the fixture, so they meet the new condition and need no change.
   - Two quoting lines of the new D-109 sentence stand at the tests that hold it: the case "a foreign Origin, a body that is no JSON … the transport before every route" and the case "where accounts are not configured the five routes answer 503 JSON …". No assertion, title or value changed.
3. **Marking lines** (comment lines only, `tests/owner-routes.test.mjs` and `tests/account-storage.test.mjs`).
   - D-410 first sentence: at "a version-5 database opens as version 6…" (`account-storage`; the role stored with the account, a new account a player), at "the answers that carry the account hold the role of an owner…" (`owner-routes`; an owner signs in and `/api/account` answers) and at "an owner plays like a player…" (`owner-routes`; keeps its own saved game state).
   - D-410 third sentence (whole sentence, ending "no registration, no request and no field of a request gives an account a role"): at "the answers that carry the account…" (a registration makes a player, a role only by the database) and at "a body of anything but exactly the address is answered 400…" (the body with a `role` field beside the address is refused 400 on each of the four panel routes, nothing changes).
   - D-202's added paragraph: the prefix "A new account has the role `player` (D-410), and no registration and no request gives an account the owner role" at "the answers that carry the account…" and at the version-5 case of `account-storage`; the whole sentence (with "; an account with the owner role can also block … from the owner panel (D-137).") at "a block ends the target's sessions in every browser and stops its links…" (`owner-routes`).
   - Not invented: no test sends a registration or a request to an account route (other than the panel's four) that carries a `role` field, so the part "no request … gives an account a role" outside the panel is held by no test; it stays in D-410's pair (below).

## The pairs (the return step, for D-410 and D-202 only)

- **D-202** has no pair; nothing to remove. Its *Verification* clause already names a new account with the role `player` and the panel's block ending the target's sessions, which the new lines now point at.
- **D-410**: the pair is `complies:` the command run by hand with `docker exec`; `violates:` an HTTP route or a field of a request that gives or takes the role, and the owner role given by an address in the settings. No part is held by a test after this correction: the panel's routes ignore a field `role` (held now, and named in the clause `tests:`), but no test sends one to the registration, the login or another account route, nor proves that no route gives the role, so "an HTTP route or a field of a request that gives or takes the role" stays; the command by hand and the settings address have no test. I added to the clause `tests:` a registration making a player, an account of the role `owner` signing in and keeping its own saved game state, and a field `role` refused as an invalid request by the four panel routes. The earlier return step had removed the parts a test held; nothing more is removable.

## Checks (each in the foreground, with a time limit)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the foundation and test edits) | 0 (`0 errors`) |
| `timeout 280 npm test -- tests/owner-routes.test.mjs` (13 pass) | 0 |
| `timeout 280 npm test -- tests/account-storage.test.mjs` (87 pass) | 0 |
| `npx prettier --check tests/owner-routes.test.mjs tests/account-storage.test.mjs` | 0 |
| `timeout 280 npx eslint tests/owner-routes.test.mjs tests/account-storage.test.mjs` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (final tree, after both commits) | 0 (`0 errors`) |

The product's gate (bare `npm test`) was not run. Only comment lines changed in the two test files; the two runs show they still parse and pass. No code file changed.

## Reach beyond the handoff

- `.the-way/elements/invariants/skill/SKILL.md`, `decide_entry.md`, `draft.md`, `write.md` and `.the-way/elements/invariants/template.md` (lines 1-80): the invariants method, for the invariant's sentence.
- `src/server/account-routes.ts` (`accountPrelude`) and `tests/owner-routes.test.mjs` around `:893-945`, `:950-960`, `:1060-1075`, `:1128-1235`: to place the lines and to find that the 400 case sends a `role` field.
- `foundations/decisions.md`: D-110 (its *Relations* only, to avoid a cycle), D-202 and D-410 whole.

## Working copies

`.runs/fix-whole/` (one script, a test output file): removed. No worktree or clone made. Remainder: none.

## Unread material

- `.runs/task-cycles/panel-wlasciciela/reports/review-fix-whole-report.md`: read the finding N-1 and the lines around it, not the whole report.
- `.runs/task-cycles/panel-wlasciciela/reports/review-return-report.md`: read M-1, M-2 and the judgments 1 to 4, not the checks and the declined parts in full.
- `.the-way/elements/invariants/template.md`: read to line 80 only.
- `tests/http.test.mjs`: not read; I grepped it for `role` and found none.

## Searches not found or unclear

- No test sends a registration or a request to an account route with a field `role` (grep for `role` in `tests/http.test.mjs`; reading `owner-routes.test.mjs`); the review of the return step said the same. The one test that sends a `role` field is the panel's 400 case.
- The handoff names "the tests near `:953` and `:1065`": the lines are the same cases (the transport before every route; 503 on the five routes), at those lines on this tree.
- The handoff said D-410's third sentence is held by the registration and sign-in answers; they hold the registration part only, as written above.
