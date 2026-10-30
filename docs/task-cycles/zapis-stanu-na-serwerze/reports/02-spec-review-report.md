FAIL

# Report — spec review, task `zapis-stanu-na-serwerze`

Spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md`
Task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`
Method: `.the-way/task-cycle/spec/SKILL.md`, reviewer variant, `.the-way/task-cycle/spec/review.md`

## Findings

### 1. `keepalive` on every save turns a too-large save into a network failure, which breaks answer 18 (task's requirement changed)

Spec, decision 6: "Every save request is sent with `keepalive`"; decision 3: "Fit with
`keepalive`: a body of at most 64 KiB is within the page's keepalive quota while it is the only
keepalive request in flight". The spec's own fact: "If the sum of contentLength and
inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error."

The server's body limit (65 536 bytes, decision 3) and the keepalive quota are the same number. So
every body the server would refuse for its size is refused by the browser before it is sent, as a
network error. The current client (`src/browser/account-api.ts:206`–`211`) turns a thrown `fetch`
into `unreachable`/`network`. The saver of decision 6 reads that as "failed". The player then sees
„Nie udało się zapisać postępu. Gra spróbuje ponownie.” and gets retries without end at 5, 10, 20
and then 30 s. „Wyloguj” takes the "failed → no logout" branch of decision 8 and shows „Nie udało
się zapisać postępu. Spróbuj wylogować się ponownie.”

That is way B of question 18, which was rejected ("ponawianie bez końca, obietnica „Gra spróbuje
ponownie.”, która się nie spełni, i niedziałające „Wyloguj”; na wspólnym komputerze gracz zostaje
zalogowany"). It contradicts To do 7 ("gra nie ponawia tego samego zapisu … „Nie udało się zapisać
postępu: stan gry jest za duży. Usuń niepotrzebne programy.”"), To do 10 ("Gdy odrzuci zapis jako
za duży (punkt 4), „Wyloguj” wylogowuje mimo tej odmowy") and row 2.

The 413 path stays reachable only for the narrow case of decision 3's stored-text check: a body
of at most 64 KiB whose re-serialized `game` grows past 64 KiB. In practice the too-large outcome
never happens, and its tests can still pass against a server that no real browser reaches with
such a body.

What the builder needs from the spec:
- The client measures the UTF-8 byte length of the body it is about to send. A body over the limit
  becomes the too-large outcome without being sent, or it is sent without `keepalive` (and so
  reaches the server and gets its 413).
- Which of the two, so the hiding moment's behaviour for such a body is settled.
- A test of the saver or client in which a body over 64 KiB ends in the too-large outcome and logout
  goes on.

### 2. A game built from a load has no "last saved" state, so the losing tab can save by itself (the build would have to guess; a wrong guess undoes answer 16)

Spec, decision 6: "A 30-second real-time interval calls the moment when the state has changed since
the last request was sent". A `visibilitychange` to `hidden` "calls the moment too", with no
condition. Decision 7: the conflict path "drops the game … asks the save again and builds from it".
The saver is "created with the game and disposed with it", so after a conflict a fresh saver runs
and it has sent no request yet.

The spec does not say whether a saver built on a loaded state counts that state as already saved at
the revision it got. If a maker treats "no request sent yet" as "changed", or the hiding moment
sends even with no change, the tab that lost the conflict saves by itself. Typically that tab is
hidden in the background, with its state just loaded and paused. It saves within 30 s, or when the
player leaves it. The save succeeds, because it is based on the fresh revision. Then the tab the
player is actually playing in gets `save-conflict` on its next save: it loads, pauses its map run,
shows „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” and loses its last action,
although the player never switched tabs.

That is the harm of way B of question 16 ("także karta, w której gracz właśnie gra … gracz widzi
zdanie i traci ostatnie działanie, choć karty nie zmieniał"). Way A was chosen to avoid it: „karta,
która przegrała, sama nie zapisuje, dopóki gracz czegoś w niej nie zrobi” (answer 16, row 3, To do
8).

What the builder needs: a saver built on a loaded state starts with that state and its revision as
its last saved state. The interval moment and the hiding moment send only when the current state
differs from the last state saved or loaded. The player's own acts, the end of a map run and the
explicit immediate saves (after a refused load; same account after expiry) keep sending as the spec
says. Add a test: after a conflict load with no act, neither the interval nor hiding sends.

### 3. D-109 stays unchanged while the spec widens what a session authorizes and the invariant derived from D-109 (contradiction with the foundation)

D-109 lists, in its binding sentence, what "a valid server-side session alone authorizes":
"reading its own account, asking for a confirmation message to its own account's address or
destroying that browser's session". It also lists the three routes that "without a valid session
return JSON 401".

The spec, *Foundation entries* › Invariants, changes `account-session-authorization` (Derives from:
D-109) so that `GET /api/saved-game` and `PUT /api/saved-game` without a valid session get JSON 401.
Decision 1 makes the session the only authority for reading and replacing the saved game state. Yet
D-109 is in neither the changed decisions nor the Constraints as changed. Only the projected "Who
can create and use a player account?" is named.

After the foundation step, the invariant would claim a derivation from a decision whose closed list
does not include the save routes. A later reader of D-109, such as task 21 adding its own
session-authorized route, would read the list as complete.

What the builder needs: D-109 listed as changed (the session also authorizes reading and replacing
its own account's saved game state; both save routes get JSON 401 without a valid session; no field
of a save request names an account). Or, if the spec means the invariant to derive from the new
decision instead, it should say so and say how D-109's list stays true.

## Checked and found sound

- Trust boundary, server side: oversized (64 KiB body guard plus the stored-text check, decision 3);
  compressed, non-JSON and non-object (unchanged `mutationGuards`); structurally invalid and extra
  fields (400 `invalid-request`, exact fields); another account's identifier (no field names an
  account, extra field refused, row chosen by the stored session); missing or forged session and a
  blocked account (401, with the blocked state re-read in the write transaction); stale or forged
  `basedOn` (any mismatch gives `save-conflict`); a lower version (`save-outdated`, checked before
  the revision); a non-numeric version (400). Prototype keys are stored and returned as data, since
  the server reads nothing inside `game`. Deep nesting at the server at worst ends in the error
  route's 500, which affects only the sender's own row.
- Trust boundary, browser side: the load function never throws and changes nothing passed to it.
  It checks own keys only, `__proto__` included, exact keys, finite numbers and safe integers for
  identities, counts and minutes, closed lists, data identifiers, references and tile counts, and
  refuses as `version`, `archetype` or `shape`. "The maker may refuse more, never less" leaves room
  for the extra-key check that `checkProgram` (`src/browser/sim/programs.ts:196`), which drops
  unknown keys, does not do itself.
- Irreversible operation: the spec only prepares the move from version 3 to version 4. It adds a
  step, tests it on a version-3 database written in the test, and updates the deploy skill text
  about rollback, the merge window and H2. Nothing in it runs the step on the test server.
- The two choices the orchestrator accepted provisionally: the refused-load sentences above the game
  as a one-time notice of the confirmation notice's kind, and the immediate save of the new game.
  Neither contradicts the task. The header slot would be cleared by the next successful save, and
  without the immediate save the sentence would come back at each sign-in, against "jednorazowe".
  In the old-tab case the immediate save gets `save-outdated`, so it cannot overwrite a newer save.
- Version before revision on the server, so an old tab reads „Gra została zaktualizowana. Odśwież
  stronę.” (answers 4 and 17). 200 with `save: null` instead of 404 (D-05). The confirmation notice
  above the whole game element (`src/browser/view/app.ts:96`). Logout outcomes against row 6.
  Expired session and the same account against rows 5 and 6. Entries listed against To do 13.

## Reaches beyond the dispatch

None. The product files read are all of the named set: `src/browser/sim/types.ts`, `game.ts`,
`programs.ts` (lines 150–260), `src/browser/account-api.ts`, `src/browser/view/app.ts`,
`game-view.ts`, `clock.ts`, `src/server/transport.ts`, `account-routes.ts`, `app.ts`, and
`tests/account-storage.test.mjs` (only the lines on the schema version). The Fetch Standard and MDN
were not opened; finding 1 rests on the Fetch quotation the spec itself carries.

## Searches not found or unclear

- Not every guideline file the dispatch names was read whole. Read whole:
  `guidelines/coding-browser-api-client.md`. Read in part: `guidelines/coding-browser-module.md`
  (§ „Gra na stronie i odpowiedzi serwera”), `guidelines/coding.md` (§ „Odłożone rodzaje i
  formatowanie”), and the headings of `coding-database-access.md` and `coding-simulation-module.md`.
  Searched only: `guidelines/styleguide-browser-view.md` (header, notice and `warning`). Not read:
  `testing.md`, `coding-content-data.md`, `coding-http-application.md`. A finding in those files
  would not have been seen.
- The foundation entries read whole: D-04, D-05, D-07, D-28, D-35, D-53, D-96, D-97, D-104, D-109,
  D-112, D-117, D-156, D-157, and the invariants of the dispatch. The other named decisions were
  taken from the task's quotations. The environment facts read: `fetch-origin-header` and
  `fetch-same-origin-credentials`.
- `guidelines/coding-browser-module.md` says a screen "każdą inną porażkę pokazuje jako jedno
  ostrzeżenie". The saver shows its own sentence per refusal code. That reads as still within the
  rule, so it is not reported, but the spec does not say whether that guideline changes.
