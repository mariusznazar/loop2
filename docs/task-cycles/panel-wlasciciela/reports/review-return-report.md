PASS a5efc1008dd45484d5bc18c8190c9526efb93d9b

# Review of the return step ("panel właściciela"), range `70c7bb9c..a5efc100`

Head confirmed: `git rev-parse HEAD` = `a5efc1008dd45484d5bc18c8190c9526efb93d9b`. Commits: `57b0f7e7` (`foundations/decisions.md`, `foundations/invariants.md`), `a5efc100` (one word in `tests/account-owner.test.mjs:34`). `git diff --stat` shows exactly those three files, +13/-16 lines. Nothing else changed (handoff item 7).

Findings: Critical 0, Important 0, Minor 2 (both in scope, none blocking), out of scope 0 new.

## Findings

### Minor

**M-1. The added D-109 sentence and the reworded invariant name only the POST guards; the GET route and the 503 case are left to a reader.**
Place: `foundations/decisions.md` (D-109, closing sentence of the owner-panel paragraph); `foundations/invariants.md:730` (`owner-panel-authorization`).
D-109 now says "The four `POST` routes first meet the transport, origin and body guards of D-104, so a request that fails them is refused as D-104 gives, whatever its session." The invariant says each of the five routes answers 401 to a request without a valid session, "a `POST` route doing so for a request that meets the Origin, media-type and body requirements". In the code all five routes first pass `accountPrelude` (`src/server/owner-routes.ts`, `router.all(Object.values(paths), accountPrelude(runtime))`; `src/server/account-routes.ts:392-405`): 503 where accounts are not configured, 403 `Invalid request transport` where the transport is wrong. So `GET /api/owner/accounts` also gets that answer before the session is read. A reader of the invariant could take a GET with a wrong transport to be answered 401. The facts are held elsewhere: D-109's first paragraph ("subject to the transport, origin, input and admission guards"), the invariant `account-request-transport`, and the test `tests/owner-routes.test.mjs:953` ("...and the transport before every route") and `:1065` (503 on the five routes). The sibling invariant `account-session-authorization` has the same shape for its GET routes, so this follows the existing convention. Not a wrong statement; an incomplete qualifier. Grade Minor (the sentence cited is the invariant's "Each of the five routes ... answers JSON 401", whose qualifier is for POST only; no code does what it forbids).
Evidence: code lines above; test titles.

**M-2. Sentences of D-410 and D-202 that tests hold carry no line `decision:`, and one pair removal in D-410 rests on such tests.**
Place: D-410 first sentence (role stored with the account, a new account a `player`) and the end of its third ("no registration, no request and no field of a request gives an account a role"); D-202's added paragraph.
The decisions template (`.the-way/elements/decisions/template.md`, "Verification") says a test that holds a sentence carries a line `decision:`, and the lines are how the tests are found. The tests exist (`tests/account-storage.test.mjs:870-878`: a new account is `player`, also after a reopen, every row `player`; `tests/owner-routes.test.mjs:1157-1186`: a registration makes a player, an owner's login and `/api/account` carry `role`), and the clause `tests:` names the parts in words, so `foundation_check.py` passes and the entries agree with the code. The step removed "a new account created as an owner" from D-410's *violates* on the strength of those unlinked tests. The removal is right on content; only the link the template asks for is missing. This is a departure from the template's form where the content agrees with the code (WAY-364): Minor. It is not a defect of the entries; the fix is a line `decision:` in the tests, an edit the return step does not make (the step's own concern 2 names it). The handoff's question (4) is answered: the entries are in the template's form; the missing lines are a gap of the tests, to be closed by whoever next touches those tests.
Retained D-410 *violates* "an HTTP route or a field of a request that gives or takes the role": no test sends a registration or request carrying a `role` field, so the part is held by none; keeping it is right.

## Judgments the handoff asked for

1. **D-109 sentence and invariant against the code.** True for the four POST routes: `router.post([block, unblock, grantPreviousSave, revokePreviousSave], ...mutationGuards(publicOrigin, accountBodyLimit))` is registered before `operationRoute` adds `ownerOnly` (`owner-routes.ts`), and `mutationGuards` (`transport.ts:61-102`) refuses a wrong Origin 403, a wrong media type or encoding 415, a body that is no JSON object 400, all before the role check. `ownerOnly` reads the session account and its role at the request, answering 401 or 403 before `targetAddress` reads the body. The GET route has `ownerOnly` after `accountPrelude` only (see M-1). The invariant's tests (`tests/owner-routes.test.mjs:421, 466, 533, 642`) send requests that meet the guards, so the narrowed wording does not make any of them test less than it claims; no test was changed. Changed invariant: `owner-panel-authorization`; its tests are those cited above plus the ones the review of the whole change named.
2. **Pairs.** Each part removed is held by a test the entry's clause `tests:` names:
   - D-109 (role read per request before any body field; role not from session or request; anything but 403 `owner-forbidden`): `owner-routes.test.mjs:428-455` (403 with a wrong-typed, empty, identifier and unknown-address body, so the role is checked before the body; Faults list says so), `:533` (D-410 line: the same session refused after a second connection made it a player, served after it was made an owner).
   - D-137 (route that blocks for a session without the role; role read in one transaction, block in another; block of an owner): `owner-routes.test.mjs:642-700` (409 for every owner form, a role given by a second connection between the check and the block, via `hooks.beforeBlock`, still 409 with only the role differing), `account-owner.test.mjs:182, 211, 293`. Kept: the command as run by hand, the skill instruction through the `mikrus` MCP server, and the base's one-transaction item (the base's own pair, which `account-storage.test.mjs:2313` also touches; harmless to keep, not this step's to remove).
   - D-400: held by `owner-routes.test.mjs:788-790, 880` and the invariant; the pair keeps the command by hand and the MCP-server item. Compared with the base pair, the base's "an HTTP route ... that grants or revokes the privilege" is gone because the panel makes it obsolete, and the tests hold the 403 for a session without the role.
   - D-252 ("a line of the owner panel that holds the number or the address of the acting owner"): `owner-routes.test.mjs:766-780` asserts the log text holds neither the owner's number nor any address; `:711, :790` quote D-252; `account-owner.test.mjs:652`.
   - D-410: see M-2; kept parts are exactly those no test holds (the command by hand; a route or a field that gives the role; the settings address).
   - D-411: pair removed whole. Each of its parts is held: the owner row without „Zablokuj” and the first click of „Odblokuj” (`tests/view/accounts-screen.test.mjs:181, 280`), no confirmation before a grant or revoke (`:280`), „Zablokuj” asking first (`:341, :453`), list order and exactly four fields (`tests/account-api.test.mjs:1421-1607`, `account-owner.test.mjs:80`). *Verification* is the clause `tests:` alone, the template's form for a decision held whole.
   - D-354: its pair stays. Its sentence "a refusal leaves its sentence in the terminal" is not one of the lines the tests quote (`account-backup.test.mjs:412, 462`, `account-owner.test.mjs:602, 3168, 3446` quote other parts), so the pair is right to stay; I found no test line that holds it.
   - The *Rationale* and *Rejected* of every changed entry are whole, as the template asks; the base's pairs were not widened.
3. **D-408 ("its position on the menu bar").** Not false for the list screen. D-280's added paragraph says the screen "is no item of the bar" and that the menu „Konto” holds the link; D-280 also says Postać marks Siedziba and the screen of a map run marks no item, so "its position on the menu bar" already covers a screen whose position is "no item" or "another item's". The sentence is general and was equally loose before this change; the accounts entry (`src/browser/view/accounts-entry.ts`) is one registry entry with its address in `screen-address.ts` as D-408 requires. I would not add the sentence the step offered; that is O-2's matter and I do not re-grade it. No finding.
4. **D-410 / D-202 without lines `decision:`.** See M-2: not a defect of the entries' form; a gap in the tests' links, Minor.
5. **Test comment.** `tests/account-owner.test.mjs:34` "standing in for the operator's command beside the server": a person who runs a command on the server is the operator, as `f.operator()` in the same fixture and the other tests say; the change is a comment word only. A search of the added lines of `src`, `tests`, `guidelines` and `.claude` over `b1904c5b..HEAD` for "owner's" found only uses for the role or its holder ("an owner's bar", "the owner's save", "the role is an owner's", and the like). Note: `tests/account-storage.test.mjs:1986` ("standing in for the owner's command beside the server") has the same wording, but it is in the base and not part of this change (not in `git diff b1904c5b..HEAD` as an added line by this change); left, as the handoff says older uses stay.
6. **No entry for A3, A5, the loading line or the failure texts.** Right. A3 (confirmation of „Zablokuj” built as „Zacznij od zera”) and the loading line and failure texts are rules of how a control looks, which the decisions template's question 2 sends to the guidelines; the styleguide section "The list of accounts" holds them, and D-411's sentence holds that the block asks first and what the confirmation says. A5 (screen width from `.app-main`) is a means; D-280 already says "of the same content width". No selected template question places any of them in the log, and the step wrote none.
7. **Nothing else changed.** Confirmed by `git diff --stat 70c7bb9c..a5efc100` (three files) and by reading the whole diff.

## Declined to judge

- D-408 wording ("its position on the menu bar") against the list screen: graded outside the task in the review of the whole change (O-2); not re-graded.
- Older uses of "owner" for the human who runs the server (O-1, `loop2-deploy`, about seventy foundation lines, `account-storage.test.mjs:1986`): outside this step.
- The product's code and tests beyond the ones the entries are compared with: the earlier reviews cover them.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (run on the head `a5efc100`).
- `git rev-parse HEAD`, `git log --format='%h %s' 70c7bb9c..a5efc100`, `git diff --stat` and `git diff 70c7bb9c..a5efc100` — read whole.
- Manual: read the code of the guards and the order of the handlers (`owner-routes.ts`, `transport.ts:61-102`, `account-routes.ts:392-429`, `app.ts:84`), the tests named above by their bodies at the lines given, and the template's section "Verification".
- Not run: any test (the handoff bars the full gate and the changes of the range touch no code; the test file change is a comment). The step's own claim that `npm run typecheck` exits 0 I did not repeat.

## Reach beyond the handoff

- `.the-way/elements/decisions/template.md` (sections "Verification", "Where it goes" and the table of readers): to judge the pairs, the clause `tests:` and the lines `decision:` as the template gives them.
- `src/server/transport.ts` (`mutationGuards`), `src/server/account-routes.ts` (`accountPrelude`, the guard registration), `src/browser/view/accounts-entry.ts`, `src/browser/view/menu-bar.tsx` (grep for the link): to settle the order of the guards and the position of the list screen.
- `foundations/invariants.md` (`account-session-authorization`, `account-request-transport`, `owner-panel-authorization` whole): to compare the wording with the sibling.
- D-280's paragraph on the list screen and D-408 whole (as entries), D-410 and D-411 whole; the base text of the pairs of D-109, D-137, D-400 at the merge base `b1904c5b`.
- `.the-way/task-cycle/skill/return_step.md` and `return-step-report.md`, as the handoff names.

## Working copies

None made. `.runs/review-return/` was never created, so nothing to remove.

## Unread material

- `.runs/task-cycles/panel-wlasciciela/task-frozen.md`, `plan.md`, `review-whole-report.md` and `review-fix-whole-report.md`: not read (the handoff names them, but the judgments asked for rest on the entries, the code and the tests; O-1 to O-4 are not to be re-graded). The task's requirements were taken from the entries the step writes.
- `foundations/decisions.md`: only D-109 (whole), D-137, D-252 (the paragraph and pair), D-400, D-408, D-410, D-411, D-280 (the opening paragraphs) read; D-12, D-104, D-112, D-202 not read as entries; D-202's added paragraph was not opened (M-2 rests on the step's report and on the absence of a `decision:` line that quotes it, found by grep on `tests`).
- `foundations/glossary.md` and `foundations/part_map.md`: not read; the change of the range touches neither.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`: not read; the range changes no code and the comment change is one word.
- Tests: read by the bodies at `tests/owner-routes.test.mjs:415-475, 530-560, 640-780, 1155-1215` and `tests/account-storage.test.mjs:860-900, 1975-1990, 2310-2325`; the rest by their `decision:` lines and titles only.

## Searches not found or unclear

- No test line `decision:` quotes D-410's first sentence, the end of its third sentence, or D-202's added paragraph (grep over `tests/` for `decision: D-410` and `D-202`).
- No test holds the sentence of D-354 "a refusal leaves its sentence in the terminal" by a line `decision:`.
- No test sends a registration or other request that carries a field naming a role (searched `owner-routes.test.mjs` and `account-api.test.mjs`).
- The handoff's "the order of the guards ... on the GET route": the GET route has no body guards; only `accountPrelude` runs before `ownerOnly` (found in the code; no entry states it, see M-1).
