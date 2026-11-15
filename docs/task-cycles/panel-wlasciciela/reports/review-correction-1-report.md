PASS 300f8186246ad0717cabdb7cb9f6c6bd6385f82c

# Review of correction 1 ("panel właściciela"), range `2a28eb57..300f8186`

Head confirmed: `git rev-parse HEAD` = `300f8186246ad0717cabdb7cb9f6c6bd6385f82c`. Commits `7203773c` (foundation, test comment lines) and `300f8186` (styleguide). `git diff --stat`: `foundations/decisions.md` (+6/-4), `foundations/invariants.md` (+1/-1), `guidelines/styleguide-browser-view.md` (+4/-2), `tests/account-storage.test.mjs` (+2), `tests/owner-routes.test.mjs` (+8). No code file changed.

Findings: Critical 0, Important 0, Minor 1 (non-blocking; goes to the request's list).

## The remark (item 6, "fix all three here"): made or not

1. **Styleguide line on the narrow window: made.** The line now says the sentence and the two buttons stand in one wrapping row, the buttons right after the sentence in a wide window and under it in a narrow one when the sentence leaves no room, and that the sentence has no margin pushing the buttons to the end of a wide row. `src/browser/styles.css:897-910`: `.accounts-confirm { display: flex; flex-wrap: wrap; align-items: center; gap: ... }`, `.accounts-confirm-text { margin: 0; padding-left; border-left; color }` with no `margin-right: auto`; `accounts-screen.tsx:228-248` puts the sentence and the two buttons as the three children of that one element. A flex row that wraps keeps the buttons beside a sentence that fits and moves them below one whose width fills the row; the new text says this and nothing the stylesheet does not. The correction also did not copy "as in „Zacznij od zera”" for layout (that sentence has `margin-right: auto`, `styles.css` near `.program-reset-text`), which would have been wrong. The styleguide is Polish and the line is in the language of its section; the passage keeps the form of the neighbouring rules (one rule, then what the click does). I did not view the screenshots of the earlier fix; the judgment rests on the code and the stylesheet.
2. **The decision sentence in the order of checks: made.** Checked against all five routes:
   - `ownerRoutes` registers `router.all(Object.values(paths), accountPrelude(runtime))` first: where `runtime` is null the prelude answers 503 and the router has nothing else; otherwise a request with no `accountClientAddress` (the transport check of `clientAddress`, D-110) is answered 403 `Invalid request transport`. That holds for the GET list route and the four POST routes alike.
   - Then, for the four POST routes only, `mutationGuards` (Origin 403, media type or encoding 415, JSON-object body 400, body limit 413), registered before `operationRoute` adds `ownerOnly`.
   - Then `ownerOnly`: session (401), role from the database (403 `owner-forbidden`), then `targetAddress` reads the body.
   The new D-109 sentence ("Each of the five routes answers JSON 503 where accounts are not configured and otherwise first meets the transport check of D-110, and the four `POST` routes then meet the origin and body guards of D-104, so a request that fails one of them is refused as that decision gives, whatever its session") and the invariant ("each doing so for a request that meets the transport check of the account routes and, on a `POST` route, the Origin, media-type and body requirements") say exactly that; the order transport, then (POST) origin/media type/body, then session, then role, then body fields, is what the code does. The tests hold it: `tests/owner-routes.test.mjs:953` (every POST path with and without a session, each guard answer, 413 over 16 KiB, then the transport refusals on the list and the four POST routes with and without a session) and `:1068` (503 on GET and POST of all five paths with `no-store`). The remark's words "also checks the request's origin before the session" for the list route are not what the code does (the list route has no Origin check, only the transport check); the correction wrote what the code does, which is what the remark asks for ("say what the code does").
   - `derives from D-110` in D-109's *Relations*: right, not beyond the remark. The new sentence cites D-110, and D-109 already derives from D-104 for the same reason. D-110's *Relations* are D-10 and D-102, so no cycle.
   - The sentence added at the previous step was quoted by no test, so its change alters no quoted sentence; the other sentences of D-109, D-410 and D-202 are unchanged in the diff (only the closing sentence, *Relations* and the clause `tests:` of D-109 and the clause of D-410 changed). Only comment lines changed in the two test files (diff shows `+` comment lines and nothing removed or altered: no assertion, title or value).
3. **The marking lines: made.** Each new line quotes a sentence that begins at the start of a paragraph or of a sentence in the binding text and holds at least three words; `foundation_check.py` accepts all of them (exit 0). By the bodies of the tests:
   - D-410 first sentence at `account-storage.test.mjs:795` (a version-5 database opens as 6, a new account has the role `player`, also after a reopen, every row `player`), at `owner-routes.test.mjs:1133` (a registration answers with no `role`, an owner's login and `/api/account` carry it) and at `:1202` ("an owner plays like a player", its own saved game state). Each holds the part of the long sentence it is placed at (role stored, new account player; either role signs in; plays and keeps its own state), as the other lines of the log do for long sentences.
   - D-410 third sentence at `:1133` (a registration makes a player; the role comes only from the database) and at the 400 test `:909` (the body `{ email, role: "owner" }` is answered 400 `invalid-request` on each of the four panel routes, state unchanged).
   - D-202 prefix at `account-storage.test.mjs:795` and `owner-routes.test.mjs:1133`; the whole sentence at the panel's block test `:710` (an owner blocks a player through the panel, with the effects). That test holds the panel half of the sentence, the other two the "new account is a player" half; acceptable as for the other long quotes.
   - D-109 new sentence at `:953` and `:1068`, as above.

## Pairs and the clause `tests:` (handoff item 4)

- **D-410 pair rightly left.** `violates:` "an HTTP route or a field of a request that gives or takes the role; the owner role given by an address in the settings" stays: the only test that sends a field `role` is the panel's 400 case (`:909`); none sends it to the registration, the login or another account route (grep of `tests/` for `role:` in request bodies, and reading `owner-routes.test.mjs`), and none proves that no route gives a role. `complies:` the command by hand: no test does that through `docker exec`. So no part is held and none can go.
- **D-410 clause `tests:` extension** ("a registration making a player, an account of the role `owner` signing in and keeping its own saved game state, and a field `role` beside the address refused as an invalid request by the four routes of the owner panel with nothing changed"): each is held, at `owner-routes.test.mjs:1133` (registration, owner sign-in), `:1202` (own saved game state) and `:909` (the field `role`, 400, `assert.deepEqual(state(f), before)`).
- **D-202** has no pair and its clause already named the new account and the panel's block.
- **D-109's clause `tests:`** gains the transport and 503 parts, held at `:953`, `:1068`.

## Findings

### Minor

**M-1. "as that decision gives" in the new D-109 sentence names no decision.** The sentence cites D-110 (transport) and D-104 (origin and body guards) and then says a failing request is "refused as that decision gives". A reader must choose which of the two is meant; "as the decision of that check gives" or "as D-110 and D-104 give" is plain. The sentence's content is right and the code and tests agree; grade Minor (a wording point of the sentence the correction itself wrote).

## Declined to judge

- The older uses of "owner" for the person who runs the server: the remarks put them in the queued Loop task.
- Item 1 of the remarks (owner role after deployment) and the let-through items 2 to 4: not part of the correction.
- Whether the earlier fix's screenshots show the narrow window: not viewed; the styleguide line is judged against the stylesheet and the markup.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (on head `300f8186`).
- `git rev-parse HEAD`, `git log --format='%h %s' 2a28eb57..300f8186`, `git diff --stat` and the whole `git diff 2a28eb57..300f8186` — read.
- Manual: the code of `ownerRoutes`, `accountPrelude`, `mutationGuards`, `createApp`'s transport layer, `styles.css:890-910`, `accounts-screen.tsx:210-250`; the bodies of the tests at the lines cited.
- Not run: any test or lint (the diff holds comment lines of tests only and no code; the correction reports its own focused runs of the two test files, 13 and 87 passing, exit 0, which I did not repeat).

## Reach beyond the handoff

- `src/server/app.ts:20-60` (the session layer's use of `clientAddress`) and D-110 (its *Relations* and first paragraph): to confirm the transport check's decision and rule out a cycle in *Relations*.
- `src/browser/styles.css` around `.accounts-confirm` and `.program-reset-text`: to compare the two confirmations' layout.

## Working copies

None made. `.runs/review-correction/` was never created, so nothing to remove.

## Unread material

- `correction-1-handoff.md` (the correction's own handoff): not read; the remarks and the handoff of this review were read whole.
- `review-fix-whole-report.md` (N-1) and the `fix-whole-evidence/` screenshots: not read.
- `foundations/decisions.md`: D-109, D-410, D-202 changes through the diff and D-110 in part; D-202 as an entry not read whole.
- `foundations/invariants.md`: `owner-panel-authorization` through the diff only.
- `guidelines/styleguide-browser-view.md`: the section "The list of accounts" around lines 995-1020 read, not the whole file; `.the-way/product-guidelines/template.md` not reread (the change is one rule's sentence inside an existing section).
- Tests: the bodies read at `owner-routes.test.mjs:903-1125, 1128-1160` and `account-storage.test.mjs:860-880`; the others by their `decision:` lines.

## Searches not found or unclear

- No test sends a field `role` to the registration, the login or any account route other than the panel's four (searched by reading `owner-routes.test.mjs` and a grep of `role` in the request bodies of `tests/`); so D-410's pair stays.
- The remark says the list route "also checks the request's origin before the session"; the code has no Origin check on `GET /api/owner/accounts`, only the transport check; I read the remark as meant for that transport check.
- I did not find a place in the foundation that says in which language or form a styleguide line about layout at two widths must be written beyond the template of guidelines (not reread).
